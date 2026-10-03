"""Hvězdy 100–500 pc z Gaia DR3 → octree dlaždice pro samostatné datové repo (galaxie-data). Spouštět na PC.

Vstup: pipeline/raw/gaia500/hp1-NN.csv.gz z gaia500_stahni.py (parallax > 2 mas, parallax_over_error > 10).
Hvězdy z GCNS (vrstva Gaia 100 pc, čte se z public/data/gaia100-info-*.bin.gz) a vše s paralaxou nad 10 mas
se vyřadí – uvnitř 100 pc kreslí GCNS, která má lepší vzdálenosti (posteriorní medián).
Vzdálenost = 1000 / paralaxa (při chybě pod 10 % je zkreslení malé, v kartě to stojí).

Octree v krychli ±512 pc kolem Slunce (osy jako gaia100: x k centru, y ke l = 90°, z k severu). Každý uzel nese
nejvýš NODE_MAX hvězd s nejvyšší absolutní jasností G, zbytek jde do 8 potomků. Zdálky se tak načte jen kořen
s nejsvítivějšími hvězdami, při přiblížení se přidávají uzly se slabšími (aditivní LOD jako Potree).

Výstup (výchozí public/data/gaia500/, v .gitignore – do hlavního repa NE):
  index.json        – metadata a seznam uzlů [klíč, počet]; klíč „r“ = kořen, každá další číslice 0–7 = oktant
                      (bit 0: x ≥ střed, bit 1: y ≥ střed, bit 2: z ≥ střed)
  b/<klíč>.bin.gz   – grafika, sloupce: int16 x, y, z (pc od středu uzlu × 32767 / polovina hrany),
                      uint8 G × 10, uint8 (BP−RP + 1) × 40; chybějící uint8 = 255; řazeno od nejsvítivější
  i/<klíč>.bin.gz   – karta (stahuje se po kliknutí): uint32 id_lo, id_hi (Gaia DR3 source_id), stejné pořadí

Syntetický test bez stažených dat: py gaia500.py --test  (vygeneruje náhodné hvězdy do pipeline/raw/gaia500-test/)
"""
from __future__ import annotations

import argparse
import gzip
import shutil
import time
from pathlib import Path

import numpy as np
import pandas as pd

from common import DATA_DIR, RAW_DIR, icrs_to_galactic, now_iso, update_manifest, write_json

HALF_PC = 512.0
NODE_MAX = 16384
MAX_DEPTH = 14          # polovina hrany 512 / 2^14 ≈ 0,03 pc; hlouběji se už nedělí
PLX_INNER = 10.0        # mas → 100 pc; bližší kreslí GCNS
COLS = ["source_id", "ra", "dec", "parallax", "phot_g_mean_mag", "bp_rp"]


def gcns_ids() -> np.ndarray:
    """source_id všech hvězd vrstvy gaia100 (stejná čísla v EDR3 i DR3)."""
    meta = __import__("json").loads((DATA_DIR / "gaia100.json").read_text(encoding="utf-8"))
    n, per = meta["pocet"], meta["soubory"]["info_po"]
    out = []
    for k, i in enumerate(range(0, n, per)):
        m = min(per, n - i)
        raw = gzip.decompress((DATA_DIR / meta["soubory"]["info"].replace("{NN}", f"{k:02d}")).read_bytes())
        lo = np.frombuffer(raw, "<u4", m, 0).astype(np.uint64)
        hi = np.frombuffer(raw, "<u4", m, 4 * m).astype(np.uint64)
        out.append(lo | (hi << np.uint64(32)))
    return np.concatenate(out)


def load(raw_dir: Path, skip_ids: np.ndarray) -> dict[str, np.ndarray]:
    parts: list[dict[str, np.ndarray]] = []
    files = sorted(raw_dir.glob("hp1-*.csv.gz"))
    if not files:
        raise SystemExit(f"v {raw_dir} nejsou soubory hp1-*.csv.gz – nejdřív gaia500_stahni.py")
    total = dropped_gcns = dropped_inner = 0
    for f in files:
        df = pd.read_csv(f, usecols=COLS, dtype={"source_id": np.uint64, "ra": np.float64, "dec": np.float64,
                                                 "parallax": np.float64, "phot_g_mean_mag": np.float32,
                                                 "bp_rp": np.float32})
        total += len(df)
        ids = df["source_id"].to_numpy()
        in_gcns = np.isin(ids, skip_ids)
        inner = df["parallax"].to_numpy() > PLX_INNER
        dropped_gcns += int(in_gcns.sum())
        dropped_inner += int((inner & ~in_gcns).sum())
        df = df[~(in_gcns | inner)]
        plx = df["parallax"].to_numpy()
        dist = 1000.0 / plx
        l, b = icrs_to_galactic(df["ra"].to_numpy(), df["dec"].to_numpy())
        L, B = np.radians(l), np.radians(b)
        parts.append({
            "id": df["source_id"].to_numpy(),
            "x": (dist * np.cos(B) * np.cos(L)).astype(np.float32),
            "y": (dist * np.cos(B) * np.sin(L)).astype(np.float32),
            "z": (dist * np.sin(B)).astype(np.float32),
            "g": df["phot_g_mean_mag"].to_numpy(),
            "bprp": df["bp_rp"].to_numpy(),
            "absg": (df["phot_g_mean_mag"].to_numpy() + 5 * np.log10(plx) - 10).astype(np.float32),
        })
        print(f"  {f.name}: {len(df)} hvězd", flush=True)
    d = {k: np.concatenate([p[k] for p in parts]) for k in parts[0]}
    print(f"načteno {total}, vyřazeno z GCNS {dropped_gcns}, další s paralaxou nad {PLX_INNER} mas {dropped_inner}, "
          f"zbývá {len(d['id'])}")
    dup = len(d["id"]) - len(np.unique(d["id"]))
    assert dup == 0, f"{dup} duplicitních source_id (překrývají se díly stažení?)"
    return d


def u8(a: np.ndarray, scale: float, offset: float = 0.0) -> np.ndarray:
    q = np.round((a.astype(np.float64) + offset) * scale)
    return np.where(np.isfinite(q), np.clip(q, 0, 254), 255).astype(np.uint8)


def center_of(key: str) -> tuple[np.ndarray, float]:
    c, h = np.zeros(3), HALF_PC
    for ch in key[1:]:
        o = int(ch)
        h /= 2
        c = c + h * np.array([1 if o & 1 else -1, 1 if o & 2 else -1, 1 if o & 4 else -1])
    return c, h


def build(d: dict[str, np.ndarray]) -> list[tuple[str, np.ndarray]]:
    """[(klíč, indexy hvězd uzlu od nejsvítivější)]; rodič je vždy před potomky."""
    order = np.argsort(np.where(np.isfinite(d["absg"]), d["absg"], 99.0), kind="stable")
    xyz = np.stack([d["x"], d["y"], d["z"]], axis=1)
    assert np.abs(xyz).max() < HALF_PC, "hvězda mimo krychli octree"
    nodes: list[tuple[str, np.ndarray]] = []
    stack = [("r", order)]
    while stack:
        key, idx = stack.pop()
        depth = len(key) - 1
        if len(idx) <= NODE_MAX or depth >= MAX_DEPTH:
            if len(idx) > NODE_MAX:
                print(f"  pozor: uzel {key} má {len(idx)} hvězd (max. hloubka)")
            nodes.append((key, idx))
            continue
        nodes.append((key, idx[:NODE_MAX]))
        rest = idx[NODE_MAX:]
        c, _ = center_of(key)
        p = xyz[rest]
        octant = (p[:, 0] >= c[0]).astype(np.int8) | ((p[:, 1] >= c[1]) << 1) | ((p[:, 2] >= c[2]) << 2)
        for o in range(7, -1, -1):
            sub = rest[octant == o]  # boolean výběr zachová pořadí podle jasnosti
            if len(sub):
                stack.append((key + str(o), sub))
    nodes.sort(key=lambda t: (len(t[0]), t[0]))
    return nodes


def write(d: dict[str, np.ndarray], nodes: list[tuple[str, np.ndarray]], out: Path) -> dict:
    if out.exists():
        shutil.rmtree(out)
    (out / "b").mkdir(parents=True)
    (out / "i").mkdir()
    xyz = np.stack([d["x"], d["y"], d["z"]], axis=1).astype(np.float64)
    gq, cq = u8(d["g"], 10), u8(d["bprp"], 40, 1.0)
    sizes = {"b": 0, "i": 0}
    biggest = 0
    for key, idx in nodes:
        c, h = center_of(key)
        rel = np.round((xyz[idx] - c) * (32767 / h))
        assert np.abs(rel).max() <= 32767, key
        q = rel.astype("<i2")
        body = q[:, 0].tobytes() + q[:, 1].tobytes() + q[:, 2].tobytes() + gq[idx].tobytes() + cq[idx].tobytes()
        ids = d["id"][idx]
        info = (ids & np.uint64(0xFFFFFFFF)).astype("<u4").tobytes() + (ids >> np.uint64(32)).astype("<u4").tobytes()
        for sub, raw in (("b", body), ("i", info)):
            gz = gzip.compress(raw, 9, mtime=0)
            (out / sub / f"{key}.bin.gz").write_bytes(gz)
            sizes[sub] += len(gz)
            if sub == "b":
                biggest = max(biggest, len(gz))
    return {"bajtu_body": sizes["b"], "bajtu_karty": sizes["i"], "nejvetsi_body": biggest}


def synth(raw_dir: Path, n: int) -> None:
    """Náhodné hvězdy jen na test formátu a aplikace – nejsou to data, nikdy nepublikovat."""
    rng = np.random.default_rng(1)
    raw_dir.mkdir(parents=True, exist_ok=True)
    # hustota klesá s výškou nad rovinou (škála 300 pc), objem do 500 pc
    pts = []
    while sum(len(p) for p in pts) < n:
        p = rng.uniform(-500, 500, (n, 3))
        keep = (np.linalg.norm(p, axis=1) < 500) & (np.linalg.norm(p, axis=1) > 50) \
            & (rng.random(n) < np.exp(-np.abs(p[:, 2]) / 300))
        pts.append(p[keep])
    p = np.concatenate(pts)[:n]
    dist = np.linalg.norm(p, axis=1)
    from astropy import units as u
    from astropy.coordinates import SkyCoord
    c = SkyCoord(l=np.degrees(np.arctan2(p[:, 1], p[:, 0])) * u.deg,
                 b=np.degrees(np.arcsin(p[:, 2] / dist)) * u.deg, frame="galactic").icrs
    absg = rng.normal(8, 3, n)
    g = absg + 5 * np.log10(dist) - 5
    df = pd.DataFrame({
        "source_id": rng.choice(2 ** 62, n, replace=False).astype(np.uint64), "ra": c.ra.deg, "dec": c.dec.deg,
        "parallax": 1000 / dist, "parallax_error": 1000 / dist * 0.05, "phot_g_mean_mag": g,
        "bp_rp": np.where(rng.random(n) < 0.02, np.nan, np.clip(0.12 * absg, -0.3, 4)),
        "ruwe": 1.0, "radial_velocity": np.nan,
    })
    for k, rows in enumerate(np.array_split(np.arange(n), 4)):
        df.iloc[rows].to_csv(raw_dir / f"hp1-{k:02d}.csv.gz", index=False)
    print(f"syntetická data: {n} hvězd → {raw_dir}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--raw", type=Path, default=RAW_DIR / "gaia500")
    ap.add_argument("--out", type=Path, default=DATA_DIR / "gaia500")
    ap.add_argument("--test", type=int, nargs="?", const=600_000, help="syntetická data (počet hvězd)")
    a = ap.parse_args()
    if a.test:
        a.raw = RAW_DIR / "gaia500-test"
        synth(a.raw, a.test)
    t0 = time.time()
    d = load(a.raw, gcns_ids())
    nodes = build(d)
    depth = max(len(k) for k, _ in nodes) - 1
    print(f"octree: {len(nodes)} uzlů, hloubka {depth}, {time.time() - t0:.0f} s")
    sizes = write(d, nodes, a.out)
    n = len(d["id"])
    g = d["g"]
    index = {
        "schema": 1, "katalog": "gaia500", "stazeno": now_iso(), "pocet": int(n), "test": bool(a.test),
        "polovina_pc": HALF_PC, "uzel_max": NODE_MAX,
        "soubory": {"body": "b/{KEY}.bin.gz", "karta": "i/{KEY}.bin.gz"},
        "kodovani": {
            "body": ["x:i16", "y:i16", "z:i16", "g10:u8", "bprp40+1:u8"], "karta": ["id_lo:u32", "id_hi:u32"],
            "pozice": "pc od středu uzlu × 32767 / polovina hrany uzlu", "chybi": {"u8": 255},
            "osy": "x k centru, y ke l = 90°, z k severnímu pólu; pc od Slunce",
            "klic": "r = kořen, další číslice oktant: bit 0 x ≥ střed, bit 1 y ≥ střed, bit 2 z ≥ střed",
            "razeni": "v uzlu podle absolutní G vzestupně (nejsvítivější první)",
        },
        "vyber": "Gaia DR3 gaia_source: parallax > 2 mas, parallax_over_error > 10; bez hvězd GCNS a paralaxy nad 10 mas",
        "statistika": {**sizes, "g_min": float(np.nanmin(g)), "g_max": float(np.nanmax(g)),
                       "bez_bprp": int((~np.isfinite(d["bprp"])).sum()), "hloubka": depth},
        "uzly": [[k, int(len(i))] for k, i in nodes],
    }
    size = write_json(a.out / "index.json", index)
    if not a.test:
        update_manifest({
            "id": "gaia500", "soubor": "gaia500/index.json", "nazev": "Hvězdy 100–500 pc (Gaia)",
            "zdroj": "Gaia DR3 (gaiadr3.gaia_source), staženo ze zrcadla ARI Heidelberg (gaia.ari.uni-heidelberg.de, TAP); "
                     "dlaždice v repu galaxie-data",
            "url": "https://gaia.ari.uni-heidelberg.de/",
            "licence": "Data Gaia: ESA/Gaia/DPAC (podmínky ověřit, viz nasazeni/CHECKLIST.md)",
            "citace": "Gaia Collaboration, Vallenari A. et al. 2023, A&A 674, A1",
            "poznamka": "Výběr paralaxa nad 2 mas a s relativní chybou pod 10 %; vzdálenost = 1 / paralaxa. "
                        "Hvězdy z GCNS a bližší než 100 pc kreslí vrstva Gaia 100 pc.",
            "vyrez": False,
        })
    print(f"index.json {size / 1e3:.0f} kB; body {sizes['bajtu_body'] / 1e6:.1f} MB "
          f"({sizes['bajtu_body'] / n:.2f} B/hvězdu, největší uzel {sizes['nejvetsi_body'] / 1e3:.0f} kB), "
          f"karty {sizes['bajtu_karty'] / 1e6:.1f} MB; celkem {time.time() - t0:.0f} s → {a.out}")


if __name__ == "__main__":
    main()
