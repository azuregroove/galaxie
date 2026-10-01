"""Kontrola parametrů ramen (src/scene/arms.ts) proti maserům z Reid et al. 2019, tabulka 1 (CDS J/ApJ/885/131).

Pro každý maser s přiřazeným ramenem spočítá galaktocentrický azimut β a odchylku poloměru od středu ramene.
Bez astropy (stačí standardní knihovna), ať jde spustit i v cloudu. Spuštění: py pipeline\\overit_ramena.py
"""
from __future__ import annotations

import math
import urllib.request
from collections import defaultdict
from pathlib import Path

URL = "https://cdsarc.cds.unistra.fr/ftp/J/ApJ/885/131/table1.dat"
RAW = Path(__file__).resolve().parent / "raw" / "reid2019_table1.dat"
R0 = 8.15

# musí odpovídat src/scene/arms.ts: β_kink, ψ<, ψ>, R_kink, β_min, β_max, šířka
ARMS = {
    "3-kpc": (15, -4.2, -4.2, 3.52, 15, 18, 0.18),
    "Norma": (18, -1.0, 19.5, 4.46, 5, 54, 0.14),
    "Sct-Cen": (23, 14.1, 12.1, 4.91, 0, 104, 0.23),
    "Sgr-Car": (24, 17.1, 1.0, 6.04, 2, 97, 0.27),
    "Local": (9, 11.4, 11.4, 8.26, -8, 34, 0.31),
    "Perseus": (40, 10.3, 8.7, 8.87, -23, 115, 0.35),
    "Outer": (18, 3.0, 9.4, 12.24, -16, 71, 0.65),
}
# označení ramen v tabulce 1 (ReadMe, pozn. 4) → rameno modelu
CODES = {"Nor": "Norma", "Out": "Outer", "ScN": "Sct-Cen", "ScF": "Sct-Cen", "CtN": "Sct-Cen", "OSC": "Sct-Cen",
         "SgN": "Sgr-Car", "SgF": "Sgr-Car", "CrN": "Sgr-Car", "Loc": "Local", "Per": "Perseus",
         "3kN": "3-kpc", "3kF": "3-kpc"}
# ICRS → galaktické: transpozice matice z src/core/coords.ts (Hipparcos A_G)
G2E = [[-0.0548755604162154, 0.4941094278755837, -0.8676661490190047],
       [-0.8734370902348850, -0.4448296299600112, -0.1980763734312015],
       [-0.4838350155487132, 0.7469822444972189, 0.4559837761750669]]


def arm_radius(arm: str, beta: float) -> float:
    bk, pl, ph, rk, *_ = ARMS[arm]
    psi = pl if beta < bk else ph
    return rk * math.exp(-math.radians(beta - bk) * math.tan(math.radians(psi)))


def main() -> None:
    if not RAW.exists():
        RAW.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(URL, RAW)
    res: dict[str, list[tuple[float, float, float]]] = defaultdict(list)
    for ln in RAW.read_text().splitlines():
        code = ln[113:116].strip()
        if code not in CODES:
            continue
        ra = 15 * (int(ln[31:33]) + int(ln[34:36]) / 60 + float(ln[37:44]) / 3600)
        de = (int(ln[47:49]) + int(ln[50:52]) / 60 + float(ln[53:59]) / 3600) * (-1 if ln[46] == "-" else 1)
        plx = float(ln[62:67])
        a, d = math.radians(ra), math.radians(de)
        e = [math.cos(d) * math.cos(a), math.cos(d) * math.sin(a), math.sin(d)]
        g = [sum(G2E[j][i] * e[j] for j in range(3)) for i in range(3)]
        l, b = math.atan2(g[1], g[0]), math.asin(g[2])
        dist = 1 / plx
        x = -R0 + dist * math.cos(b) * math.cos(l)
        y = dist * math.cos(b) * math.sin(l)
        beta = math.degrees(math.atan2(y, -x))
        arm = CODES[code]
        res[arm].append((math.hypot(x, y) - arm_radius(arm, beta), beta, plx))
    for arm, v in res.items():
        dr = sorted(abs(t[0]) for t in v)
        good = sorted(abs(t[0]) for t in v if t[2] > 0.2)
        print(f"{arm:8s} n={len(v):2d}  medián |ΔR| {dr[len(dr) // 2]:.2f} kpc"
              f" (plx > 0,2 mas: n={len(good)}, {good[len(good) // 2] if good else float('nan'):.2f})"
              f"  šířka {ARMS[arm][6]}  β masery {min(t[1] for t in v):.0f}…{max(t[1] for t in v):.0f}"
              f"  model {ARMS[arm][4]}…{ARMS[arm][5]}")


if __name__ == "__main__":
    main()
