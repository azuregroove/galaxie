"""Exoplanety z NASA Exoplanet Archive (tabulka PSCompPars) -> public/data/exoplanety.json

Použití:
    python exoplanety.py                 # stáhne aktuální data (~2–4 MB CSV, obvykle do 1 min)
    python exoplanety.py --vstup X.csv   # zpracuje už stažené CSV (offline, testy)

Výstup je sloupcový JSON: jeden záznam = jeden planetární systém (hvězda),
planety jsou v samostatné tabulce s odkazem na index systému.
"""
from __future__ import annotations

import argparse
import io
import sys
import urllib.parse
import urllib.request
from pathlib import Path

import numpy as np
import pandas as pd

from common import DATA_DIR, LY_PER_PC, RAW_DIR, icrs_to_galactic, now_iso, rnd, txt, update_manifest, write_json

TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"
COLUMNS = [
    "pl_name", "hostname", "ra", "dec", "glon", "glat",
    "sy_dist", "sy_disterr1", "sy_disterr2", "sy_pnum",
    "st_spectype", "st_teff", "st_rad", "st_mass", "sy_vmag",
    "pl_rade", "pl_bmasse", "pl_orbper", "pl_orbsmax", "pl_eqt",
    "disc_year", "discoverymethod", "disc_facility", "pl_controv_flag",
]
STAR_COLS = ["st_spectype", "st_teff", "st_rad", "st_mass", "sy_vmag"]

METODY_CZ = {
    "Transit": "tranzit",
    "Radial Velocity": "radiální rychlosti",
    "Microlensing": "mikročočka",
    "Imaging": "přímé zobrazení",
    "Transit Timing Variations": "změny časů tranzitu",
    "Eclipse Timing Variations": "změny časů zákrytů",
    "Orbital Brightness Modulation": "modulace jasnosti na oběžné dráze",
    "Pulsar Timing": "časování pulsaru",
    "Pulsation Timing Variations": "změny časování pulzací",
    "Astrometry": "astrometrie",
    "Disk Kinematics": "kinematika disku",
}


def download() -> str:
    query = f"select {','.join(COLUMNS)} from pscomppars"
    url = f"{TAP_URL}?{urllib.parse.urlencode({'query': query, 'format': 'csv'})}"
    print("Stahuji PSCompPars z NASA Exoplanet Archive …", flush=True)
    with urllib.request.urlopen(url, timeout=180) as r:
        text = r.read().decode("utf-8")
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    raw = RAW_DIR / "pscomppars.csv"
    raw.write_text(text, encoding="utf-8")
    print(f"  uloženo {raw} ({len(text) / 1e6:.1f} MB)")
    return text


def first_valid(s: pd.Series):
    v = s.dropna()
    return v.iloc[0] if len(v) else None


def build(df: pd.DataFrame, source_note: str) -> tuple[dict, dict]:
    missing = [c for c in COLUMNS if c not in df.columns]
    if missing:
        raise SystemExit(f"Ve vstupu chybí sloupce: {missing}")

    df = df.sort_values(["hostname", "pl_name"]).reset_index(drop=True)

    # astropy převod kvůli konzistenci s ostatními katalogy; archivní glon/glat slouží jako kontrola
    l, b = icrs_to_galactic(df["ra"].to_numpy(float), df["dec"].to_numpy(float))
    dl = np.abs(((l - df["glon"].to_numpy(float)) + 180) % 360 - 180)
    db = np.abs(b - df["glat"].to_numpy(float))
    maxdiff = float(np.nanmax(np.maximum(dl, db)))
    if maxdiff > 0.01:
        raise SystemExit(f"Nesoulad galaktických souřadnic astropy vs. archiv: {maxdiff:.4f}°")
    df["l"], df["b"] = l, b

    sys_rows = []
    host_index = {}
    for i, (host, g) in enumerate(df.groupby("hostname", sort=True)):
        host_index[host] = i
        r0 = g.iloc[0]
        # hvězdné parametry v PSCompPars se mezi řádky jednoho systému mohou lišit (různé reference);
        # bereme první vyplněnou hodnotu podle abecedy planet
        star = {c: first_valid(g[c]) for c in STAR_COLS}
        sys_rows.append({
            "jmeno": host,
            "l": rnd(r0["l"], 4), "b": rnd(r0["b"], 4),
            "d": rnd(r0["sy_dist"], 2),
            "dp": rnd(r0["sy_disterr1"], 2), "dm": rnd(abs(r0["sy_disterr2"]) if pd.notna(r0["sy_disterr2"]) else None, 2),
            "sp": txt(star["st_spectype"]),
            "teff": rnd(star["st_teff"], 0),
            "rs": rnd(star["st_rad"], 3), "ms": rnd(star["st_mass"], 3),
            "vmag": rnd(star["sy_vmag"], 2),
            "np": int(r0["sy_pnum"]) if pd.notna(r0["sy_pnum"]) else len(g),
        })

    metody = sorted(df["discoverymethod"].dropna().unique().tolist())
    zarizeni = sorted(df["disc_facility"].dropna().unique().tolist())
    mi = {m: i for i, m in enumerate(metody)}
    zi = {z: i for i, z in enumerate(zarizeni)}

    pl = {k: [] for k in ["sys", "jmeno", "r", "m", "p", "a", "teq", "rok", "metoda", "zarizeni", "sporna"]}
    for _, r in df.iterrows():
        pl["sys"].append(host_index[r["hostname"]])
        pl["jmeno"].append(r["pl_name"])
        pl["r"].append(rnd(r["pl_rade"], 3))
        pl["m"].append(rnd(r["pl_bmasse"], 3))
        pl["p"].append(rnd(r["pl_orbper"], 4))
        pl["a"].append(rnd(r["pl_orbsmax"], 5))
        pl["teq"].append(rnd(r["pl_eqt"], 0))
        pl["rok"].append(rnd(r["disc_year"], 0))
        pl["metoda"].append(mi.get(r["discoverymethod"]))
        pl["zarizeni"].append(zi.get(r["disc_facility"]))
        pl["sporna"].append(1 if r["pl_controv_flag"] == 1 else 0)

    systemy = {k: [row[k] for row in sys_rows] for k in sys_rows[0]}
    stazeno = now_iso()
    out = {
        "schema": 1,
        "katalog": "exoplanety",
        "jednotky": {"d": "pc", "l": "deg", "b": "deg", "r": "R_Zeme", "m": "M_Zeme", "p": "dny", "a": "au",
                     "teq": "K", "teff": "K", "rs": "R_Slunce", "ms": "M_Slunce"},
        "stazeno": stazeno,
        "zdroj_dat": source_note,
        "ciselniky": {
            "metoda": metody,
            "metoda_cz": [METODY_CZ.get(m, m) for m in metody],
            "zarizeni": zarizeni,
        },
        "systemy": systemy,
        "planety": pl,
    }
    n_dist = sum(1 for d in systemy["d"] if d is not None)
    stats = {"planet": len(df), "systemu": len(sys_rows), "systemu_se_vzdalenosti": n_dist,
             "max_d_pc": max(d for d in systemy["d"] if d is not None), "stazeno": stazeno}
    return out, stats


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--vstup", type=Path, help="lokální CSV místo stahování")
    ap.add_argument("--vystup", type=Path, default=DATA_DIR / "exoplanety.json")
    ap.add_argument("--bez-manifestu", action="store_true", help="neaktualizovat manifest.json")
    a = ap.parse_args(argv)

    if a.vstup:
        text = a.vstup.read_text(encoding="utf-8")
        note = f"lokální soubor {a.vstup.name} (výřez PSCompPars)"
    else:
        text = download()
        note = "NASA Exoplanet Archive, TAP, tabulka pscomppars (kompletní)"
    df = pd.read_csv(io.StringIO(text))

    out, st = build(df, note)
    size = write_json(a.vystup, out)
    print(f"Hotovo: {st['planet']} planet v {st['systemu']} systémech "
          f"({st['systemu_se_vzdalenosti']} se vzdáleností, nejdál {st['max_d_pc']:.0f} pc "
          f"= {st['max_d_pc'] * LY_PER_PC:,.0f} ly) -> {a.vystup} ({size / 1024:.0f} kB)")

    if not a.bez_manifestu:
        update_manifest({
            "id": "exoplanety",
            "soubor": a.vystup.name,
            "nazev": "Exoplanety (planetární systémy)",
            "zdroj": "NASA Exoplanet Archive – Planetary Systems Composite Parameters (PSCompPars)",
            "url": "https://exoplanetarchive.ipac.caltech.edu/",
            "licence": "Veřejná data NASA/Caltech-IPAC; archiv žádá uvedení citace",
            "citace": "This research has made use of the NASA Exoplanet Archive, which is operated by the "
                      "California Institute of Technology, under contract with the National Aeronautics and "
                      "Space Administration under the Exoplanet Exploration Program.",
            "poznamka": "PSCompPars skládá parametry z více publikací, nemusí být vzájemně konzistentní.",
            "vyrez": bool(a.vstup),
            **st,
        })
    return 0


if __name__ == "__main__":
    sys.exit(main())
