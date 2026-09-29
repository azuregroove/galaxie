"""Neutronové hvězdy -> public/data/neutronove-hvezdy.json

- Pulsary: ATNF Pulsar Catalogue (Manchester et al. 2005) přes psrqpy – aktuální verze.
  Když ATNF není dostupný (např. z cloudu), použije se kopie v CDS (B/psr, verze 2016-May) a verze
  se zapíše do manifestu i karty. Vynutit zálohu: python neutronove_hvezdy.py --vizier
- Magnetary: McGill Online Magnetar Catalog (Olausen & Kaspi 2014), tabulka TabO1.
Použití:  python neutronove_hvezdy.py [--vizier]
"""
from __future__ import annotations

import argparse
import csv
import re

import astropy.units as u
from astropy.coordinates import SkyCoord

from common import RAW_DIR
from katalog import Vrstva, cds_table, fetch, val

MAGNETAR = "https://www.physics.mcgill.ca/~pulsar/magnetar/TabO1.csv"

TYPY = [
    {"id": "pulsar", "nazev": "Pulsar", "barva": "--psr"},
    {"id": "msp", "nazev": "Milisekundový pulsar", "barva": "--msp"},
    {"id": "magnetar", "nazev": "Magnetar", "barva": "--mag"},
]
POLE = [
    {"k": "p", "nazev": "Perioda rotace", "jednotka": "s", "des": 6},
    {"k": "disp", "nazev": "Disperzní míra", "jednotka": "pc cm⁻³", "des": 1},
    {"k": "vek", "nazev": "Charakteristické stáří", "jednotka": "let", "des": 0},
    {"k": "bpole", "nazev": "Magnetické pole na povrchu", "jednotka": "G", "des": 0},
    {"k": "assoc", "nazev": "Spojené objekty"},
    {"k": "verze", "nazev": "Verze katalogu"},
]
MSP_P = 0.03  # s; zjednodušené dělení podle periody (P < 30 ms), ne podle vývojové historie


def pulsary_atnf(v: Vrstva) -> str:
    from psrqpy import QueryATNF

    q = QueryATNF(params=["JNAME", "RAJD", "DECJD", "DIST", "DIST_DM", "P0", "DM", "ASSOC", "AGE", "BSURF"])
    ver = str(q.get_version)
    df = q.pandas
    c = SkyCoord(ra=df["RAJD"].values * u.deg, dec=df["DECJD"].values * u.deg, frame="icrs").galactic
    for i, r in df.iterrows():
        d = r.get("DIST")
        d = d * 1000 if d == d and d is not None else None
        p0 = r.get("P0")
        add_psr(v, r["JNAME"], c.l.deg[i], c.b.deg[i], d, p0, r.get("DM"), r.get("AGE"), r.get("BSURF"),
                r.get("ASSOC"), f"ATNF {ver}", "psrcat DIST (nejlepší odhad; často z disperzní míry, YMW16)")
    return ver


def pulsary_vizier(v: Vrstva) -> str:
    ver = "2016-May (kopie v CDS B/psr)"
    for r in cds_table("B/psr", "psr.dat"):
        d = val(r["Dist"])
        add_psr(v, val(r["PSRJ"]), val(r["GLON"]), val(r["GLAT"]), d * 1000 if d is not None else None,
                val(r["P0"]), val(r["DM"]), val(r["Age"]), val(r["Bsurf"]), val(r["Assoc"]),
                f"ATNF {ver}", "psrcat Dist (nejlepší odhad; často z disperzní míry, model TC93)")
    return ver


def add_psr(v, name, l, b, d, p0, dm, age, bs, assoc, verze, metoda):
    def num(x):
        x = val(x) if not isinstance(x, (int, float)) else x
        return None if x is None or x != x else float(x)
    p0 = num(p0)
    v.add(name, "msp" if p0 is not None and p0 < MSP_P else "pulsar", float(l), float(b), d, None, None,
          metoda, f"Poloha a vzdálenost: {verze}. Vzdálenost z disperzní míry může mít chybu desítek procent.",
          [], p=p0, disp=num(dm), vek=num(age), bpole=num(bs), assoc=clean_assoc(assoc),
          verze=verze)


def clean_assoc(a) -> str | None:
    """„SNR:Vela,GRS:2FGL_J0835.3-4510[naa+12]“ -> „SNR:Vela, GRS:2FGL J0835.3-4510“ (bez kódů referencí)."""
    a = val(a) if not isinstance(a, str) else a.strip()
    if not a or a == "*":
        return None
    return ", ".join(p.strip().replace("_", " ") for p in re.sub(r"\[[^\]]*\]", "", a).split(",") if p.strip())


def magnetary(v: Vrstva) -> None:
    path = fetch(MAGNETAR, RAW_DIR / "magnetar" / "TabO1.csv")
    n = 0
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            c = SkyCoord(r["RA"], r["Decl"], unit=(u.hourangle, u.deg), frame="icrs").galactic
            d = float(r["Dist"]) * 1000 if r["Dist"] else None
            up = float(r["Dist_EUp"]) * 1000 if r["Dist_EUp"] and d else None
            dn = float(r["Dist_EDn"]) * 1000 if r["Dist_EDn"] and d else None
            assoc = r["Assoc"] or None
            v.add(r["Name"], "magnetar", c.l.deg, c.b.deg, d, d - dn if dn else None, d + up if up else None,
                  "podle literatury v katalogu McGill",
                  "Poloha a vzdálenost: McGill Online Magnetar Catalog (Olausen & Kaspi 2014, aktualizace 2020).",
                  [], p=float(r["Period"]) if r["Period"] else None,
                  bpole=float(r["B"]) if r["B"] else None, vek=float(r["Age"]) if r["Age"] else None,
                  assoc=f"{assoc} (mimo Galaxii)" if assoc in ("SMC", "LMC") else assoc,
                  verze="McGill, poslední úprava 17. 11. 2020")
            n += 1
    print(f"  magnetary: {n}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--vizier", action="store_true", help="nezkoušet ATNF, rovnou kopii v CDS (2016)")
    args = ap.parse_args()
    v = Vrstva("neutronove-hvezdy", TYPY, POLE)
    ver = None
    if not args.vizier:
        try:
            ver = pulsary_atnf(v)
            print(f"  pulsary z ATNF, verze {ver}")
        except Exception as e:  # síť, chybějící psrqpy, změna formátu – všechno řeší záloha
            print(f"  ATNF nedostupný ({type(e).__name__}: {e}); použiji kopii v CDS")
            v = Vrstva("neutronove-hvezdy", TYPY, POLE)
    if ver is None:
        ver = pulsary_vizier(v)
        print(f"  pulsary z CDS, verze {ver}")
    magnetary(v)
    stara = "2016" in ver
    v.uloz({
        "nazev": "Neutronové hvězdy (pulsary, magnetary)",
        "zdroj": f"ATNF Pulsar Catalogue, verze {ver}; McGill Online Magnetar Catalog",
        "url": "https://www.atnf.csiro.au/research/pulsar/psrcat/",
        "licence": "ATNF: volně s citací Manchester et al. 2005; McGill: volně s citací Olausen & Kaspi 2014 a odkazem na web",
        "citace": "Manchester R.N. et al. 2005, AJ 129, 1993; Olausen S.A., Kaspi V.M. 2014, ApJS 212, 6",
        "poznamka": ("Pulsary jsou ze staré verze katalogu (2016), aktuální ATNF nebyl dostupný – spustit na PC. " if stara else "")
                    + "Vzdálenosti pulsarů jsou většinou z disperzní míry a mohou mít velkou chybu. Magnetary v Magellanových mračnech leží mimo Galaxii.",
    })


if __name__ == "__main__":
    main()
