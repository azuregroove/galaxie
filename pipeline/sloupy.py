"""Sloupy stvoření (M16) jako 3D mračno bodů → public/data/sloupy.json + sloupy.bin.gz.

Rekonstrukce, ne měření tvaru. Co je z dat a co odhad:
  - obrys na obloze: tmavé (prachové) pixely ze snímku Pan-STARRS DR1 (HiPS CDS/P/PanSTARRS/DR1/color-z-zg-g,
    výřez hips2fits 900 × 900 px, 0,36″/px, projekce TAN, sever nahoře) – maska prahem, rozdělení na sloupy podle
    ručně zadaných os (souřadnice os jsou v pixelech výřezu níže)
  - označení P1a, P1b, P2, P3: Pound 1998 / McLeod et al. 2015 (MNRAS, doi:10.1093/mnras/stv680); hlava P1 (West I) souhlasí
    s tabulkou 1 v Sofue 2020 (MNRAS 492, 5966) na ~30″
  - kdo je před a za hvězdami NGC 6611: McLeod et al. 2015, odd. 4.2; Karim et al. 2023 (SOFIA, AJ, doi:10.3847/1538-3881/acff6c)
  - vzdálenost hrotu od roviny hvězdokupy podél zorného paprsku: Sofue 2020 (z = D cos i: 1,8 / 2,5 / 2,8 pc při 2,0 kpc),
    přepočteno na vzdálenost NGC 6611 v mapě (Hunt & Reffert 2023)
  - sklon os sloupů vůči rovině oblohy: velikost NEZNÁMÁ (Karim et al. 2023: „determine the sign … but not its magnitude“),
    zde zvoleno 30°, znaménko podle McLeod et al. 2015
  - tloušťka podél paprsku: předpoklad válcové souměrnosti (jako Karim et al. 2023), poloměr = místní polovina šířky
  - P1b nemá v literatuře číselnou hloubku: dán k hloubce základny P2 (Karim et al. 2023: P1b a P2 spojuje „Shared Base“)
Ionizující hvězda HD 168076 (O5V, Sofue 2020) – poloha ze SIMBADu přes Sesame.
"""
from __future__ import annotations

import gzip
import json
import math
import urllib.parse

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

from common import DATA_DIR, LY_PER_PC, RAW_DIR, icrs_to_galactic, now_iso, update_manifest, write_json
from katalog import fetch

HIPS = "CDS/P/PanSTARRS/DR1/color-z-zg-g"
RA0, DEC0, FOV, NPX = 274.712, -13.835, 0.09, 900
STAR = ("HD 168076", 274.65175212, -13.80067248)  # Sesame/SIMBAD 2. 10. 2026
SOFUE_D_KPC = 2.0
# (vzdálenost hrotu od roviny hvězdokupy podél paprsku v pc při 2,0 kpc; kladně = dál od nás)
# znaménka: P1a za hvězdami, P2 a P3 před nimi (McLeod 2015, Karim 2023)
TIP_LOS = {"P1a": +1.8, "P2": -2.5, "P3": -2.8}
TILT_DEG = 30.0
# Osy sloupů: lomené čáry od hrotu k základně v pixelech výřezu; znaménko = zda se hloubka od hrotu
# k základně zvětšuje (+1, ocas dál od nás) nebo zmenšuje (−1, ocas k nám) – McLeod 2015, odd. 4.2
AXES = {
    "P1a": ([(420, 245), (330, 320), (240, 430)], +1),
    "P1b": ([(240, 440), (200, 600), (170, 890)], -1),
    "P2": ([(515, 415), (400, 560), (300, 720), (280, 890)], -1),
    "P3": ([(525, 545), (470, 640), (440, 670)], +1),
}
NAMES = {"P1a": "P1 – horní část", "P1b": "P1 – dolní část", "P2": "P2", "P3": "P3"}


def cutout() -> np.ndarray:
    q = urllib.parse.urlencode({"hips": HIPS, "width": NPX, "height": NPX, "fov": FOV, "projection": "TAN",
                                "coordsys": "icrs", "ra": RA0, "dec": DEC0, "format": "jpg"})
    p = fetch(f"https://alasky.cds.unistra.fr/hips-image-services/hips2fits?{q}", RAW_DIR / "sloupy" / "ps1.jpg")
    return np.asarray(Image.open(p).convert("RGB")).astype(float)


def poly_mask(pts) -> np.ndarray:
    m = Image.new("L", (NPX, NPX), 0)
    ImageDraw.Draw(m).polygon(pts, fill=1)
    return np.asarray(m).astype(bool)


def masks(im: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    S = np.stack([ndi.median_filter(im[..., c], 9) for c in range(3)], -1)  # hvězdy pryč
    L = S.mean(2)
    bg = ndi.gaussian_filter(L, 40)
    body = (L < 0.6 * bg) & (S[..., 0] >= S[..., 2] * 0.9) & poly_mask(
        [(90, 400), (570, 380), (570, 700), (380, 900), (60, 900), (60, 560)])
    body = ndi.binary_fill_holes(ndi.binary_closing(ndi.binary_opening(body, iterations=2), iterations=3))
    # horní část P1 je slabší a modravější → mírnější práh ve vlastní oblasti
    top = (L < 0.75 * bg) & poly_mask([(200, 430), (240, 330), (380, 230), (460, 220), (470, 300), (330, 400), (280, 440)])
    top = ndi.binary_closing(ndi.binary_opening(top, iterations=1), iterations=2)
    m = body | top
    lab, n = ndi.label(m)
    sizes = ndi.sum(m, lab, range(1, n + 1))
    return np.isin(lab, 1 + np.where(sizes > 150)[0]), S


def seg_dist(px, py, a, b):
    ax, ay = a
    bx, by = b
    vx, vy = bx - ax, by - ay
    t = np.clip(((px - ax) * vx + (py - ay) * vy) / (vx * vx + vy * vy), 0, 1)
    return np.hypot(px - ax - t * vx, py - ay - t * vy), t


def along(px, py, line):
    """Vzdálenost bodu od lomené čáry a délka podél ní od hrotu (px)."""
    best = np.full(px.shape, np.inf)
    s = np.zeros(px.shape)
    acc = 0.0
    for a, b in zip(line, line[1:]):
        d, t = seg_dist(px, py, a, b)
        L = math.dist(a, b)
        upd = d < best
        best = np.where(upd, d, best)
        s = np.where(upd, acc + t * L, s)
        acc += L
    return best, s


def main() -> None:
    im = cutout()
    m, smooth = masks(im)
    ys, xs = np.nonzero(m)
    print(f"maska: {len(xs)} px")
    arcsec_px = FOV * 3600 / NPX

    hr = json.loads((DATA_DIR / "hvezdokupy.json").read_text(encoding="utf-8"))
    i6611 = hr["objekty"]["jmeno"].index("NGC 6611")
    d_pc = float(hr["objekty"]["d"][i6611])
    pc_px = d_pc * arcsec_px / 206264.806
    k = d_pc / (SOFUE_D_KPC * 1000)
    print(f"NGC 6611 v mapě: {d_pc} pc → {pc_px * 1000:.2f} mpc/px, Sofue × {k:.3f}")

    # rozdělení pixelů podle nejbližší osy
    dist = {}
    for key, (line, _) in AXES.items():
        dist[key] = along(xs.astype(float), ys.astype(float), line)
    keys = list(AXES)
    D = np.stack([dist[kk][0] for kk in keys])
    owner = D.argmin(0)

    edt = ndi.distance_transform_edt(m)
    R = ndi.maximum_filter(edt, 25)  # místní poloměr sloupu

    # poloha hvězdy v pixelech výřezu (TAN, malé pole → lineárně stačí)
    cosd = math.cos(math.radians(DEC0))
    sx = NPX / 2 - (STAR[1] - RA0) * cosd / (FOV / NPX)
    sy = NPX / 2 - (STAR[2] - DEC0) / (FOV / NPX)
    print(f"{STAR[0]} v pixelech výřezu: ({sx:.0f}, {sy:.0f})")

    tip_los = {kk: v * k for kk, v in TIP_LOS.items()}
    # P1b k hloubce základny P2 (viz docstring)
    p2_line = AXES["P2"][0]
    p2_len = sum(math.dist(a, b) for a, b in zip(p2_line, p2_line[1:]))
    s_join = along(np.array([240.0]), np.array([440.0]), p2_line)[1][0]
    tip_los["P1b"] = tip_los["P2"] + AXES["P2"][1] * math.tan(math.radians(TILT_DEG)) * s_join * pc_px
    print("hloubka hrotů (pc, + = dál):", {kk: round(v, 2) for kk, v in tip_los.items()}, f"P2 délka {p2_len * pc_px:.2f} pc")

    rng = np.random.default_rng(16)
    step = 2
    sel = (xs % step == 0) & (ys % step == 0)
    pts, cols = [], []
    tilt = math.tan(math.radians(TILT_DEG))
    for j in np.nonzero(sel)[0]:
        x, y = xs[j], ys[j]
        key = keys[owner[j]]
        s = dist[key][1][j]
        r = max(R[y, x], 1.0)
        e = edt[y, x]
        half = math.sqrt(max(e * (2 * r - e), 1.0))  # tětiva válce poloměru r ve vzdálenosti e od okraje
        los0 = tip_los[key] + AXES[key][1] * tilt * s * pc_px
        n = 1 + int(half / 6)
        # barva: jas prachu ze snímku (bez hvězd) v teplé paletě, okraj = ionizační fronta
        lum = float(smooth[y, x].mean()) / 255.0
        rim = math.exp(-e / 3.0)
        base = 0.35 + 1.6 * lum
        for _ in range(n):
            w = los0 + rng.uniform(-half, half) * pc_px
            east = -(x - sx + rng.uniform(-1, 1)) * pc_px  # vlevo = východ
            north = -(y - sy + rng.uniform(-1, 1)) * pc_px
            pts.append((east, north, w))
            cols.append((min(1, 0.62 * base + 0.45 * rim), min(1, 0.36 * base + 0.42 * rim), min(1, 0.2 * base + 0.38 * rim)))
    P = np.array(pts)
    C = np.array(cols)
    print(f"bodů: {len(P)}; rozsah východ {P[:, 0].min():.2f}…{P[:, 0].max():.2f}, sever {P[:, 1].min():.2f}…"
          f"{P[:, 1].max():.2f}, paprsek {P[:, 2].min():.2f}…{P[:, 2].max():.2f} pc")

    # lokální (východ, sever, dál od nás) → heliocentrické galaktické x, y, z (pc) kolem hvězdy
    ra, dec = math.radians(STAR[1]), math.radians(STAR[2])
    e_hat = np.array([-math.sin(ra), math.cos(ra), 0.0])
    n_hat = np.array([-math.sin(dec) * math.cos(ra), -math.sin(dec) * math.sin(ra), math.cos(dec)])
    r_hat = np.array([math.cos(dec) * math.cos(ra), math.cos(dec) * math.sin(ra), math.sin(dec)])
    l, b = icrs_to_galactic(np.array([STAR[1]]), np.array([STAR[2]]))
    l, b = math.radians(float(l[0])), math.radians(float(b[0]))
    # matice ICRS → galaktické (sloupce = směry os x k centru, y ke l = 90°, z k pólu) z astropy
    g = icrs_to_galactic(np.array([0.0, 90.0, 0.0]), np.array([0.0, 0.0, 90.0]))
    gal = np.array([[math.cos(math.radians(bb)) * math.cos(math.radians(ll)), math.cos(math.radians(bb)) * math.sin(math.radians(ll)),
                     math.sin(math.radians(bb))] for ll, bb in zip(*g)])  # řádky = obrazy os ICRS v galaktických
    to_gal = lambda v: v @ gal
    E, N, Rr = to_gal(e_hat), to_gal(n_hat), to_gal(r_hat)
    xyz = P[:, :1] * E + P[:, 1:2] * N + P[:, 2:3] * Rr  # vůči hvězdě, pc
    center = Rr * d_pc

    span = np.abs(xyz).max()
    scale = 32767 / span
    q = np.round(xyz * scale).astype("<i2")
    rgb = np.round(C * 255).astype(np.uint8)
    raw = q.T.tobytes() + rgb.T.tobytes()
    gz = gzip.compress(raw, 9, mtime=0)
    (DATA_DIR / "sloupy.bin.gz").write_bytes(gz)
    head = {kk: (np.array(AXES[kk][0][0]) - (sx, sy)) * pc_px for kk in AXES}
    tips = {kk: (-hx * E - hy * N + tip_los[kk] * Rr).round(3).tolist() for kk, (hx, hy) in head.items()}
    out = {
        "schema": 1, "katalog": "sloupy", "stazeno": now_iso(), "pocet": int(len(P)),
        "soubor": "sloupy.bin.gz", "bajtu": len(gz),
        "kodovani": {"poradi": "int16 x[], y[], z[] (vůči hvězdě), pak uint8 r[], g[], b[]", "pc_krat": scale,
                     "osy": "x k centru, y ke l = 90°, z k severnímu pólu"},
        "stred_pc": center.round(3).tolist(), "vzdalenost_pc": d_pc,
        "hvezda": {"jmeno": STAR[0], "l": round(math.degrees(l), 5), "b": round(math.degrees(b), 5)},
        "hroty": {NAMES[kk]: v for kk, v in tips.items()},
        "naklon_os_deg": TILT_DEG,
        "teziste_pc": xyz.mean(0).round(3).tolist(),
    }
    size = write_json(DATA_DIR / "sloupy.json", out)
    print(f"sloupy.bin.gz {len(gz) / 1e3:.0f} kB, sloupy.json {size} B; střed {center.round(1)} pc")
    update_manifest({
        "id": "sloupy", "soubor": "sloupy.json", "nazev": "Sloupy stvoření – 3D rekonstrukce",
        "zdroj": "Obrys: Pan-STARRS DR1 (CDS HiPS); geometrie: McLeod et al. 2015, Sofue 2020, Karim et al. 2023; "
                 "vzdálenost: NGC 6611 z Hunt & Reffert 2023",
        "url": "https://arxiv.org/abs/2309.14637",
        "licence": "Odvozený model; snímek Pan-STARRS (podmínky použití ověřit), články s citací",
        "citace": "McLeod A.F. et al. 2015, MNRAS, doi:10.1093/mnras/stv680; Sofue Y. 2020, MNRAS 492, 5966; "
                  "Karim R.L. et al. 2023, AJ, doi:10.3847/1538-3881/acff6c",
        "poznamka": "Rekonstrukce: obrys ze snímku, hloubka hrotů z literatury, sklon os (30°) a tloušťka jsou předpoklady.",
        "vyrez": False,
    })


if __name__ == "__main__":
    main()
