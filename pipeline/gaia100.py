"""Hvězdy do 100 pc z Gaia Catalogue of Nearby Stars → public/data/gaia100*.{json,bin.gz}.

Zdroj: Gaia Collaboration, Smart et al. 2021, A&A 649, A6 (GCNS), CDS J/A+A/649/A6, tabulka table1c
(331 312 objektů, astrometrie Gaia EDR3 = DR3, čísla source_id jsou v DR3 stejná).
Vzdálenost = Dist50 (medián posteriorního rozdělení z GCNS), nejistota Dist16–Dist84.
Poloha (x, y, z) se počítá z RA/Dec a Dist50 přes astropy, stejně jako ostatní katalogy;
s xcoord50… z GCNS se jen porovná.

Dva soubory, oba little-endian, pole po sloupcích (všechna x, pak všechna y…), hvězdy seřazené
od nejjasnější (G), aby šlo při oddálení kreslit jen začátek:
  gaia100-body.bin.gz  – grafika: int16 x, y, z (pc × 250), uint8 G × 10, uint8 (BP−RP + 1) × 40, uint8 WD_prob × 200
  gaia100-info-NN.bin.gz – karta, po CHUNK hvězdách (kliknutí stáhne jen jeden kus): uint32 id_lo, id_hi,
                         uint16 plx × 50, e_plx × 10 000 (mas), d16, d50, d84 (pc × 500), RUWE × 100,
                         uint8 GCNS_prob × 250, int16 RV × 10 (km/s)
Chybějící hodnota: 255 (uint8), 65535 (uint16), −32768 (int16).
"""
from __future__ import annotations

import gzip

import numpy as np

from common import DATA_DIR, RAW_DIR, icrs_to_galactic, now_iso, update_manifest, write_json
from katalog import fetch

ASU = "https://vizier.cds.unistra.fr/viz-bin/asu-tsv"
COLS = ["GaiaEDR3", "RA_ICRS", "DE_ICRS", "Plx", "e_Plx", "Gmag", "BPmag", "RPmag", "RUWE", "GCNSprob", "WDprob",
        "Dist16", "Dist50", "Dist84", "xcoord50", "ycoord50", "zcoord50", "RV"]
URL = f"{ASU}?-source=J/A%2BA/649/A6/table1c&-out={','.join(COLS)}&-out.max=unlimited"

POS_SCALE = 250   # pc → int16: ±131 pc, krok 0,004 pc (≈ 800 au)
D_SCALE = 500     # pc → uint16: do 131 pc, krok 0,002 pc
CHUNK = 32768


def load() -> dict[str, np.ndarray]:
    path = fetch(URL, RAW_DIR / "gaia100" / "gcns.tsv")
    lines = [ln for ln in path.read_text(encoding="utf-8").splitlines() if ln and not ln.startswith("#")]
    head = lines[0].split("\t")
    assert head == COLS, head
    rows = [ln.split("\t") for ln in lines[3:]]  # hlavička, jednotky, oddělovač
    cols = list(zip(*rows))

    def num(c: str) -> np.ndarray:
        return np.array([float(v) if v.strip() else np.nan for v in cols[COLS.index(c)]])

    out = {c: num(c) for c in COLS[1:]}
    out["GaiaEDR3"] = np.array([int(v) for v in cols[0]], dtype=np.uint64)
    return out


def u8(a: np.ndarray, scale: float, offset: float = 0.0) -> np.ndarray:
    q = np.round((a + offset) * scale)
    return np.where(np.isfinite(q), np.clip(q, 0, 254), 255).astype(np.uint8)


def u16(a: np.ndarray, scale: float) -> np.ndarray:
    q = np.round(a * scale)
    return np.where(np.isfinite(q), np.clip(q, 0, 65534), 65535).astype(np.uint16)


def main() -> None:
    d = load()
    n = len(d["GaiaEDR3"])
    print(f"GCNS: {n} objektů")
    assert np.isfinite(d["Dist50"]).all(), "objekt bez Dist50"

    dist = d["Dist50"] * 1000.0  # kpc → pc
    l, b = icrs_to_galactic(d["RA_ICRS"], d["DE_ICRS"])
    L, B = np.radians(l), np.radians(b)
    x, y, z = dist * np.cos(B) * np.cos(L), dist * np.cos(B) * np.sin(L), dist * np.sin(B)

    dev = np.sqrt((x - d["xcoord50"]) ** 2 + (y - d["ycoord50"]) ** 2 + (z - d["zcoord50"]) ** 2)
    print(f"kontrola proti xyz z GCNS: medián {np.median(dev):.4f} pc, 99 % pod {np.percentile(dev, 99):.3f} pc, "
          f"max {dev.max():.2f} pc")
    print(f"vzdálenost {dist.min():.2f}–{dist.max():.1f} pc; nad 100 pc: {(dist > 100).sum()}")
    assert np.abs([x, y, z]).max() * POS_SCALE < 32767

    g = d["Gmag"]
    order = np.argsort(np.where(np.isfinite(g), g, 99.0), kind="stable")
    for k in d:
        d[k] = d[k][order]
    x, y, z, dist = x[order], y[order], z[order], dist[order]
    g = d["Gmag"]
    bprp = d["BPmag"] - d["RPmag"]

    pos = [np.round(a * POS_SCALE).astype("<i2") for a in (x, y, z)]
    body = b"".join(a.tobytes() for a in pos) + u8(g, 10).tobytes() + u8(bprp, 40, 1.0).tobytes() \
        + u8(d["WDprob"], 200).tobytes()
    ids = d["GaiaEDR3"]
    rv = np.round(d["RV"] * 10)
    assert np.nanmax(d["Plx"]) * 50 < 65535 and np.nanmax(d["e_Plx"]) * 1e4 < 65535
    cols = [
        (ids & 0xFFFFFFFF).astype("<u4"), (ids >> np.uint64(32)).astype("<u4"),
        u16(d["Plx"], 50).astype("<u2"), u16(d["e_Plx"], 1e4).astype("<u2"),
        *(u16(d[k] * 1000.0, D_SCALE).astype("<u2") for k in ("Dist16", "Dist50", "Dist84")),
        u16(d["RUWE"], 100).astype("<u2"), u8(d["GCNSprob"], 250),
        np.where(np.isfinite(rv), np.clip(rv, -32767, 32767), -32768).astype("<i2"),
    ]
    parts = [("gaia100-body.bin.gz", body)]
    for k, i in enumerate(range(0, n, CHUNK)):
        parts.append((f"gaia100-info-{k:02d}.bin.gz", b"".join(c[i:i + CHUNK].tobytes() for c in cols)))
    for old in DATA_DIR.glob("gaia100-info*.bin.gz"):
        old.unlink()
    files = {}
    for name, raw in parts:
        gz = gzip.compress(raw, 9, mtime=0)
        (DATA_DIR / name).write_bytes(gz)
        files[name] = len(gz)
    print(f"body: {len(body) / 1e6:.2f} MB → gzip {files['gaia100-body.bin.gz'] / 1e6:.2f} MB; "
          f"info: {len(parts) - 1} kusů, gzip celkem {sum(files.values()) / 1e6 - files['gaia100-body.bin.gz'] / 1e6:.2f} MB, "
          f"největší {max(v for k, v in files.items() if 'info' in k) / 1e3:.0f} kB")

    wd = np.nan_to_num(d["WDprob"]) > 0.5
    out = {
        "schema": 1, "katalog": "gaia100", "stazeno": now_iso(), "pocet": int(n),
        "soubory": {"body": "gaia100-body.bin.gz", "info": "gaia100-info-{NN}.bin.gz", "info_po": CHUNK},
        "bajtu": files,
        "kodovani": {
            "pozice_pc_krat": POS_SCALE, "vzdalenost_pc_krat": D_SCALE,
            "body": ["x:i16", "y:i16", "z:i16", "g10:u8", "bprp40+1:u8", "wd200:u8"],
            "info": ["id_lo:u32", "id_hi:u32", "plx50:u16", "eplx1e4:u16", "d16:u16", "d50:u16", "d84:u16",
                     "ruwe100:u16", "gcns250:u8", "rv10:i16"],
            "chybi": {"u8": 255, "u16": 65535, "i16": -32768},
            "osy": "x k centru, y ke l = 90°, z k severnímu pólu; pc od Slunce",
            "razeni": "podle G vzestupně (nejjasnější první), bez G na konci",
        },
        "statistika": {
            "g_min": float(np.nanmin(g)), "g_max": float(np.nanmax(g)), "bez_g": int((~np.isfinite(g)).sum()),
            "bez_bprp": int((~np.isfinite(bprp)).sum()), "bily_trpaslik_p_nad_0_5": int(wd.sum()),
            "s_rv": int(np.isfinite(d["RV"]).sum()),
            "g_pod": {str(m): int((g < m).sum()) for m in (8, 10, 12, 14, 16, 18)},
        },
    }
    size = write_json(DATA_DIR / "gaia100.json", out)
    print(f"gaia100.json {size} B; bílí trpaslíci (WD_prob > 0,5): {wd.sum()}; G pod: {out['statistika']['g_pod']}")
    update_manifest({
        "id": "gaia100", "soubor": "gaia100.json", "nazev": "Hvězdy do 100 pc (Gaia)",
        "zdroj": "Gaia Catalogue of Nearby Stars (GCNS) – Gaia EDR3, CDS J/A+A/649/A6",
        "url": "https://cdsarc.cds.unistra.fr/viz-bin/cat/J/A+A/649/A6",
        "licence": "Katalog CDS/VizieR – volně s citací; data Gaia: © ESA/Gaia/DPAC, CC BY-SA 3.0 IGO",
        "citace": "Gaia Collaboration, Smart R.L. et al. 2021, A&A 649, A6",
        "poznamka": "Vzdálenost = medián posteriorního rozdělení (Dist50) z GCNS, nejistota 16.–84. percentil. "
                    "Barva bodu podle BP−RP je orientační, spektrální třída se z ní neodvozuje.",
        "vyrez": False,
    })


if __name__ == "__main__":
    main()
