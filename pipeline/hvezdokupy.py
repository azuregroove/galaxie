"""Hvězdokupy -> public/data/hvezdokupy.json

Otevřené hvězdokupy a pohybové skupiny: Hunt & Reffert 2023, A&A 673, A114 (CDS J/A+A/673/A114).
Kulové hvězdokupy: Baumgardt & Vasiliev 2021, MNRAS 505, 5957 (web H. Baumgardta).
Kulové kupy z Hunt & Reffert (typ 'g') vynecháváme, pokrývá je Baumgardt.
Použití:  python hvezdokupy.py
"""
from __future__ import annotations

import re

from common import RAW_DIR
from katalog import Vrstva, cds_table, fetch, val

BV = "https://people.smp.uq.edu.au/HolgerBaumgardt/globular"
MESSIER = re.compile(r"^M_?\d+$")

TYPY = [
    {"id": "otevrena", "nazev": "Otevřená hvězdokupa", "barva": "--ocl"},
    {"id": "pohybova", "nazev": "Pohybová skupina", "barva": "--mgr"},
    {"id": "kulova", "nazev": "Kulová hvězdokupa", "barva": "--gcl"},
]
POLE = [
    {"k": "n", "nazev": "Členů (Gaia)"},
    {"k": "vek", "nazev": "Stáří", "jednotka": "mil. let", "des": 0},
    {"k": "r", "nazev": "Poloměr (r50)", "jednotka": "pc", "des": 1},
    {"k": "m", "nazev": "Hmotnost", "jednotka": "M☉", "des": 0},
    {"k": "cst", "nazev": "Astrometrický S/N (CST)", "des": 1},
    {"k": "cmd", "nazev": "Třída CMD", "des": 2},
]
# Přiblížení „přísného řezu“ z Hunt & Reffert 2023: abstrakt uvádí 4 114 vysoce spolehlivých kup,
# CST ≥ 5 a CMD ≥ 0,5 dává na celém katalogu 4 105. Přesná kritéria z článku zatím neověřena.
FASETY = [{"id": "hk-kvalita", "nazev": "Kvalita (otevřené kupy)", "k": "q",
           "moznosti": ["spolehlivá (CST ≥ 5, CMD ≥ 0,5; přibližně řez autorů)", "méně jistá", "kulová (Baumgardt)"]}]

ZDROJ_HR = "Poloha a vzdálenost: Hunt & Reffert 2023 (Gaia DR3), vzdálenost = medián, meze 16.–84. percentil."
ZDROJ_BV = "Poloha a vzdálenost: Baumgardt & Vasiliev 2021 (Gaia EDR3 + literatura), chyba 1σ."


def hunt(v: Vrstva) -> None:
    t = cds_table("J/A+A/673/A114", "clusters.dat")
    for r in t:
        typ = val(r["Type"])
        if typ == "g":
            continue
        names = [n.replace("_", " ") for n in (val(r["AllNames"]) or "").split(",") if n]
        name = val(r["Name"]).replace("_", " ")
        messier = any(MESSIER.match(n.replace(" ", "_")) for n in names)
        cst, cmd, d = val(r["CST"]), val(r["CMDCl50"]), val(r["dist50"])
        la, n = val(r["logAge50"]), val(r["N"])
        ok = cst is not None and cmd is not None and cst >= 5 and cmd >= 0.5
        v.add(name, "otevrena" if typ == "o" else "pohybova", val(r["GLON"]), val(r["GLAT"]),
              d, val(r["dist16"]), val(r["dist84"]), "paralaxa Gaia DR3 (členové kupy)", ZDROJ_HR, names,
              vyzn=messier or (d is not None and d < 250 and (n or 0) >= 300),
              n=n, vek=10 ** la / 1e6 if la is not None else None, r=val(r["r50pc"]), cst=cst, cmd=cmd,
              q=0 if ok else 1)


def baumgardt(v: Vrstva) -> None:
    orb = fetch(f"{BV}/orbits_table.txt", RAW_DIR / "baumgardt" / "orbits_table.txt")
    com = fetch(f"{BV}/combined_table.txt", RAW_DIR / "baumgardt" / "combined_table.txt")
    mass = {}
    for line in com.read_text().splitlines():
        if line.startswith("#") or not line.strip():
            continue
        p = line.split()
        mass[p[0]] = float(p[9])
    n = 0
    for line in orb.read_text().splitlines():
        if line.startswith("#") or not line.strip():
            continue
        # sloupce: Cluster RA DEC l b Rsun Delta_R ...  (vzdálenosti v kpc)
        p = line.split()
        d, e = float(p[5]) * 1000, float(p[6]) * 1000
        m = mass.get(p[0])
        v.add(p[0].replace("_", " "), "kulova", float(p[3]), float(p[4]), d, d - e, d + e,
              "Baumgardt & Vasiliev 2021 (průměr metod)", ZDROJ_BV, [],
              vyzn=m is not None and m >= 5e5, m=m, q=2)
        n += 1
    print(f"  Baumgardt: {n} kulových hvězdokup, hmotnost u {len(mass)}")


def main():
    v = Vrstva("hvezdokupy", TYPY, POLE, FASETY)
    hunt(v)
    baumgardt(v)
    v.uloz({
        "nazev": "Hvězdokupy",
        "zdroj": "Hunt & Reffert 2023, A&A 673, A114 (CDS J/A+A/673/A114); Baumgardt & Vasiliev 2021, MNRAS 505, 5957",
        "url": "https://cdsarc.cds.unistra.fr/viz-bin/cat/J/A+A/673/A114",
        "licence": "Katalog CDS/VizieR – volně s citací; Baumgardt: veřejně zveřejněná data bez výslovné licence, citovat publikace",
        "citace": "Hunt E.L., Reffert S. 2023, A&A 673, A114; Baumgardt H., Vasiliev E. 2021, MNRAS 505, 5957",
        "poznamka": "Kulové kupy z Hunt & Reffert vynechány (pokrývá je Baumgardt). Hunt & Reffert obsahuje i nespolehlivé kandidáty – viz filtr kvality.",
    })


if __name__ == "__main__":
    main()
