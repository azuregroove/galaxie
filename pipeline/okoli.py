"""Struktury v okolí Slunce → public/data/okoli.json

- Radcliffeova vlna: nejlepší model Konietzka et al. 2024, Nature, doi:10.1038/s41586-024-07127-3 („The Radcliffe Wave is oscillating“),
  Harvard Dataverse doi:10.7910/DVN/F98QHY (CC0): x, y, z (pc, heliocentricky galakticky), vz (km/s).
  Vlnu objevili Alves et al. 2020, Nature, doi:10.1038/s41586-019-1874-z (jejich model doi:10.7910/DVN/OE51SZ se stahuje jen pro srovnání).
- Místní bublina: obálka podle O'Neill et al. 2024, ApJ 973, 136 („The Local Bubble is a Local Chimney“),
  doi:10.7910/DVN/INB1RB (CC0), tabulka ShellProperties_A0.5 (HEALPix nside 256, 786 432 směrů): d = vzdálenost
  vrcholu hustoty obálky (pc). Zprůměrováno (medián) do mřížky l × b po 4°.
Stažení ~139 MB do pipeline/raw/okoli (Dataverse).

Gouldův pás vynechán: Perrot & Grenier 2003 udávají střed, poloosy a sklon, natočení hlavní osy elipsy ale jen v obrázku.
"""
from __future__ import annotations

import urllib.request

import numpy as np
from astropy.io import fits

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json

DV = "https://dataverse.harvard.edu/api/access/datafile/"
FILES = {
    "Radcliffe_Wave_best_fit_model_Konietzka2024.tab": DV + "8954305?format=original",
    "Radcliffe_Wave_Best_Fit_Alves2020.tab": DV + "5258284?format=original",
    "ONeill2024_LocalBubble_ShellProperties_A0.5.fits": DV + "8943783",
}
STEP = 4  # stupně mřížky bubliny


def fetch(name: str):
    p = RAW_DIR / "okoli" / name
    if not p.exists():
        p.parent.mkdir(parents=True, exist_ok=True)
        print(f"Stahuji {name} …", flush=True)
        urllib.request.urlretrieve(FILES[name], p)
    return p


def main() -> None:
    w = np.genfromtxt(fetch("Radcliffe_Wave_best_fit_model_Konietzka2024.tab"), delimiter=",", names=True)
    a = np.genfromtxt(fetch("Radcliffe_Wave_Best_Fit_Alves2020.tab"), delimiter=",", names=True)
    k = slice(None, None, 5)  # 1 500 → 300 bodů, rozestup ~9 pc
    wave = [[round(float(x), 1), round(float(y), 1), round(float(z), 1), round(float(v), 2)]
            for x, y, z, v in zip(w["x"][k], w["y"][k], w["z"][k], w["vz"][k])]
    print(f"vlna: {len(wave)} bodů, délka {np.sum(np.linalg.norm(np.diff(np.c_[w['x'], w['y'], w['z']], axis=0), axis=1)):.0f} pc, "
          f"z {w['z'].min():.0f}…{w['z'].max():.0f} pc (Alves 2020: {a['z'].min():.0f}…{a['z'].max():.0f})")

    t = fits.getdata(fetch("ONeill2024_LocalBubble_ShellProperties_A0.5.fits"), 1)
    nl, nb = 360 // STEP, 180 // STEP
    il = np.clip((t["l"] // STEP).astype(int), 0, nl - 1)
    ib = np.clip(((t["b"] + 90) // STEP).astype(int), 0, nb - 1)
    grid = np.full((nb, nl), np.nan)
    for j in range(nb):
        for i in range(nl):
            m = (ib == j) & (il == i)
            if m.any():
                grid[j, i] = np.median(t["d"][m])
    print(f"bublina: {nb}×{nl}, d {np.nanmin(grid):.0f}…{np.nanmax(grid):.0f} pc, medián {np.nanmedian(grid):.0f}, prázdných {np.isnan(grid).sum()}")

    out = {"schema": 1, "katalog": "okoli", "stazeno": now_iso(),
           "vlna": {"nazev": "Radcliffeova vlna", "zdroj": "Konietzka et al. 2024 (model), Alves et al. 2020 (objev)",
                    "body": "x, y, z (pc od Slunce: x k centru, y ke l = 90°, z k severu), vz (km/s)", "data": wave},
           "bublina": {"nazev": "Místní bublina", "zdroj": "O'Neill et al. 2024", "krok_deg": STEP,
                       "mrizka": "d[j][i] v pc: j = b od −90° po kroku, i = l od 0°; střed buňky",
                       "d": [[None if np.isnan(v) else int(round(v)) for v in row] for row in grid]}}
    size = write_json(DATA_DIR / "okoli.json", out)
    update_manifest({
        "id": "okoli", "soubor": "okoli.json", "nazev": "Struktury okolí Slunce (Radcliffeova vlna, Místní bublina)",
        "zdroj": "Konietzka et al. 2024, Nature (doi:10.7910/DVN/F98QHY); Alves et al. 2020, Nature; "
                 "O'Neill et al. 2024, ApJ 973, 136 (doi:10.7910/DVN/INB1RB) – Harvard Dataverse",
        "url": "https://dataverse.harvard.edu/dataverse/radwavemotion",
        "licence": "CC0 1.0 (Harvard Dataverse)",
        "citace": "Konietzka R. et al. 2024, Nature, doi:10.1038/s41586-024-07127-3; Alves J. et al. 2020, Nature, doi:10.1038/s41586-019-1874-z; O'Neill T. J. et al. 2024, ApJ 973, 136",
        "poznamka": "Vlna = nejlepší model (ne jednotlivá mračna); bublina = vrchol hustoty obálky z 3D mapy prachu Edenhofer et al. 2024, "
                    "medián v buňkách 4° × 4°.",
        "objektu": 2, "stazeno": out["stazeno"], "vyrez": False,
    })
    print(f"okoli.json {size / 1024:.0f} kB")


if __name__ == "__main__":
    main()
