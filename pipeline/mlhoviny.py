"""Mlhoviny -> public/data/mlhoviny.json

- Oblasti H II: WISE katalog (Anderson et al. 2014, CDS J/ApJS/212/1) – vzdálenosti většinou kinematické;
  bez vzdálenosti bereme jen známé oblasti (třída K), kandidáti (C, G, Q) bez vzdálenosti vynecháni.
  Sharpless (1959, CDS VII/20) se k WISE připojí přes označení S<n>; zbytek jen do seznamu.
- Světlé mlhoviny: Lynds 1965 (CDS VII/9) – jen do seznamu; odkazy na Sharpless se přidají jako alias.
- Temné mlhoviny: Lynds 1962 (CDS VII/7A) – jen do seznamu.
- Molekulová mračna: Zucker et al. 2020 (CDS J/A+A/633/A51) – vzdálenost = medián přes zaměřené směry.
- Planetární mlhoviny: González-Santamaría et al. 2021 (CDS J/A+A/656/A51), centrální hvězdy v Gaia EDR3;
  vzdálenost jen pro vzorek s kvalitní paralaxou (tabulka A2).
- Pozůstatky supernov: Green 2025 (CDS VII/297) – katalog vzdálenosti neobsahuje, jen do seznamu.
Použití:  python mlhoviny.py
"""
from __future__ import annotations

import math
import re
from collections import defaultdict
from statistics import median

import astropy.units as u
from astropy.coordinates import SkyCoord

from katalog import Vrstva, cds_table, val

TYPY = [
    {"id": "hii", "nazev": "Oblast H II (emisní)", "barva": "--hii"},
    {"id": "svetla", "nazev": "Světlá mlhovina (LBN)", "barva": "--lbn"},
    {"id": "temna", "nazev": "Temná mlhovina", "barva": "--dark"},
    {"id": "mracno", "nazev": "Molekulové mračno", "barva": "--cloud"},
    {"id": "planetarni", "nazev": "Planetární mlhovina", "barva": "--pn"},
    {"id": "snr", "nazev": "Pozůstatek supernovy", "barva": "--snr"},
]
POLE = [
    {"k": "prumer", "nazev": "Úhlová velikost", "jednotka": "′", "des": 1},
    {"k": "velikost", "nazev": "Skutečná velikost", "jednotka": "pc", "des": 1},
    {"k": "trida", "nazev": "Třída / typ"},
    {"k": "pozn", "nazev": "Poznámka"},
]
DVZ = ["přímá (paralaxa)", "kinematická (nejistá)", "3D mapa prachu", "bez vzdálenosti"]
FASETY = [{"id": "mlh-dvz", "nazev": "Původ vzdálenosti (mlhoviny)", "k": "dvz", "moznosti": DVZ}]

WISE_TRIDA = {"K": "známá oblast H II", "G": "skupina kolem známé oblasti", "C": "kandidát",
              "Q": "radiově tichý kandidát", "?": "nejistý objekt"}
SNR_TYP = {"S": "slupka", "S?": "slupka (nejistá)", "C": "složený", "C?": "složený (nejistý)",
           "F": "vyplněný (plerion)", "?": "nejistý typ"}


def norm(s: str | None) -> str | None:
    return re.sub(r"\s+", " ", s).strip() if s else None


def sh_num(name: str | None) -> int | None:
    m = re.fullmatch(r"S ?(\d+)", name or "")
    return int(m.group(1)) if m else None


def gal(ra, dec):
    c = SkyCoord(ra=ra * u.deg, dec=dec * u.deg, frame="icrs").galactic
    return c.l.deg, c.b.deg


def phys(ang_arcmin, d_pc):
    if ang_arcmin is None or d_pc is None:
        return None
    return 2 * d_pc * math.tan(math.radians(ang_arcmin / 60) / 2)


def sep_arcsec(l1, b1, l2, b2) -> float:
    l1, b1, l2, b2 = map(math.radians, (l1, b1, l2, b2))
    h = math.sin((b2 - b1) / 2) ** 2 + math.cos(b1) * math.cos(b2) * math.sin((l2 - l1) / 2) ** 2
    return math.degrees(2 * math.asin(min(1, math.sqrt(h)))) * 3600


def hii(v: Vrstva) -> None:
    t2 = cds_table("J/ApJS/212/1", "table2.dat")
    dist = {val(r["WISE"]): r for r in cds_table("J/ApJS/212/1", "table6.dat")}
    lbn_aliases = lbn_to_sharpless()
    sh = {int(val(r["Sh2"])): r for r in cds_table("VII/20", "catalog.dat")}

    def dkpc(r):
        d6 = dist.get(val(r["WISE"]))
        return (val(d6["Dist"]), val(d6["e_Dist"]), val(d6["Meth"])) if d6 is not None else (None, None, None)

    # HIIName je seznam jmen oddělených „;“ (např. „G209.010-19.380; Orion A“). Víc WISE oblastí nese stejné
    # vlastní jméno (W51 má 13 dílčích oblastí): ponecháme jednu – se vzdáleností, jinak největší.
    groups: dict[str, list] = defaultdict(list)
    reps = []
    for r in t2:
        names = [n.strip() for n in (norm(val(r["HIIName"])) or "").split(";") if n.strip()]
        own = next((n for n in names if not n.startswith("G")), None)
        if own:
            groups[own].append((r, names))
        else:
            reps.append({"r": r, "names": names, "own": None})
    merged = 0
    for own, rs in groups.items():
        rs.sort(key=lambda x: (dkpc(x[0])[0] is None, -(val(x[0]["Rad"]) or 0)))
        merged += len(rs) - 1
        names = list(dict.fromkeys(n for _, ns in rs for n in ns))
        reps.append({"r": rs[0][0], "names": names, "own": own})
    reps = [x for x in reps if dkpc(x["r"])[0] is not None or val(x["r"]["Cl"]) == "K"]

    # Sharpless: nejdřív podle jména (S184), pak podle polohy – střed oblasti Sh2 uvnitř poloměru známé
    # oblasti WISE (tak se Orion A spáruje se Sh2-281, který WISE jako S281 nevede).
    for x in reps:
        x["sh"] = next((sh_num(n) for n in x["names"] if sh_num(n) in sh), None)
    used = {x["sh"] for x in reps if x["sh"] is not None}
    by_pos = 0
    for num, r in sh.items():
        if num in used:
            continue
        l, b = val(r["GLon"]) / 10, val(r["GLat"]) / 10
        best = None
        for x in reps:
            if x["sh"] is not None or val(x["r"]["Cl"]) != "K" or abs(val(x["r"]["GLAT"]) - b) > 1:
                continue
            s = sep_arcsec(l, b, val(x["r"]["GLON"]), val(x["r"]["GLAT"]))
            if s < (val(x["r"]["Rad"]) or 0) and (best is None or s < best[0]):
                best = (s, x)
        if best:
            best[1]["sh"] = num
            used.add(num)
            by_pos += 1

    for x in reps:
        emit_wise(v, x, dkpc(x["r"]), lbn_aliases)

    n_sh = 0
    for num, r in sh.items():
        if num in used:
            continue
        v.add(f"Sh2-{num}", "hii", val(r["GLon"]) / 10, val(r["GLat"]) / 10, zdroj=Z_SH,
              alias=[f"S {num}"] + lbn_aliases.get(num, []), prumer=val(r["Diam"]), dvz=3,
              pozn="vzdálenost v katalogu Sharpless není")
        n_sh += 1
    print(f"  H II: sloučeno {merged} dílčích oblastí WISE; Sharpless spárováno podle polohy {by_pos}, bez WISE {n_sh}")


Z_WISE = "Poloha: WISE katalog oblastí H II (Anderson et al. 2014); vzdálenost z tabulky 6 téhož katalogu."
Z_SH = "Poloha: katalog Sharpless 1959 (CDS VII/20), vzdálenost neznámá."


def emit_wise(v, x, d, lbn_aliases):
    r = x["r"]
    cl = val(r["Cl"])
    d_kpc, e_kpc, meth = d
    alias = [val(r["WISE"])] + x["names"]
    name = x["own"] or val(r["WISE"])
    num = x["sh"]
    if num is not None:
        # vlastní jméno (Orion A) nech jako hlavní, souřadnicové nahraď označením Sharpless
        if not x["own"] or sh_num(x["own"]) is not None:
            name = f"Sh2-{num}"
        alias += [f"Sh2-{num}", f"S {num}"] + lbn_aliases.get(num, [])
    d_pc = d_kpc * 1000 if d_kpc is not None else None
    e_pc = e_kpc * 1000 if e_kpc is not None else None
    if meth and "Parallax" in meth:
        dvz, metoda = 0, "paralaxa maseru"
    elif meth:
        dvz, metoda = 1, f"kinematická ({meth})"
    else:
        dvz, metoda = 3, None
    ang = 2 * val(r["Rad"]) / 60 if val(r["Rad"]) else None
    v.add(name, "hii", val(r["GLON"]), val(r["GLAT"]), d_pc,
          d_pc - e_pc if d_pc and e_pc else None, d_pc + e_pc if d_pc and e_pc else None,
          metoda, Z_WISE, alias, vyzn=d_pc is not None and name != val(r["WISE"]) and cl == "K",
          prumer=ang, velikost=phys(ang, d_pc), trida=WISE_TRIDA.get(cl, cl), dvz=dvz)


def lbn_to_sharpless() -> dict[int, list[str]]:
    out: dict[int, list[str]] = defaultdict(list)
    for r in cds_table("VII/9", "catalog.dat"):
        num = sh_num(norm(val(r["Name"])))
        if num is not None:
            out[num].append(f"LBN {val(r['Seq'])}")
    return out


def svetle(v: Vrstva) -> None:
    n = 0
    for r in cds_table("VII/9", "catalog.dat"):
        nm = norm(val(r["Name"]))
        if sh_num(nm) is not None:
            continue  # je už jako alias u Sharplessovy oblasti
        d1, d2 = val(r["Diam1"]), val(r["Diam2"])
        v.add(f"LBN {val(r['Seq'])}", "svetla", val(r["GLON"]), val(r["GLAT"]),
              zdroj="Poloha: Lynds 1965 (CDS VII/9), vzdálenost neznámá.", alias=[nm] if nm else [],
              prumer=float(d1) if d1 else None, dvz=3,
              trida=f"jasnost {val(r['Bright'])} (1 = nejjasnější, 6 = nejslabší)" if val(r["Bright"]) else None)
        n += 1
    print(f"  LBN samostatně: {n}")


def temne(v: Vrstva) -> None:
    for r in cds_table("VII/7A", "ldn"):
        barn = val(r["Barn"])
        area = val(r["Area"])
        v.add(f"LDN {val(r['LDN'])}", "temna", val(r["GLON"]), val(r["GLAT"]),
              zdroj="Poloha: Lynds 1962 (CDS VII/7A), vzdálenost neznámá.",
              alias=[f"Barnard {barn}", f"B {barn}"] if barn else [],
              prumer=2 * math.sqrt(area / math.pi) * 60 if area else None, dvz=3,
              trida=f"neprůhlednost {val(r['Opacity'])} (1–6)" if val(r["Opacity"]) else None)


def mracna(v: Vrstva) -> None:
    by: dict[str, list] = defaultdict(list)
    for r in cds_table("J/A+A/633/A51", "handbook.dat"):
        by[val(r["Name"])].append(r)
    for name, rs in by.items():
        # průměr délky přes jednotkové vektory, ať mračno přes l = 0° neskončí na opačné straně oblohy
        sx = sum(math.cos(math.radians(val(r["GLON"]))) for r in rs)
        sy = sum(math.sin(math.radians(val(r["GLON"]))) for r in rs)
        v.add(name.replace("_", " "), "mracno", math.degrees(math.atan2(sy, sx)),
              median(val(r["GLAT"]) for r in rs),
              median(val(r["d50"]) for r in rs), median(val(r["d16"]) for r in rs), median(val(r["d84"]) for r in rs),
              "3D mapa prachu + Gaia DR2 (Zucker 2020)",
              "Poloha: medián zaměřených směrů, vzdálenost: medián jejich d50 (Zucker et al. 2020).", [],
              vyzn=True, dvz=2, pozn=f"{len(rs)} zaměřených směrů")


def planetarni(v: Vrstva) -> None:
    a1 = cds_table("J/A+A/656/A51", "tablea1.dat")
    a2 = {val(r["PNG"]): r for r in cds_table("J/A+A/656/A51", "tablea2.dat")}
    for r in a1:
        png = val(r["PNG"])
        l, b = gal(val(r["RAdeg"]), val(r["DEdeg"]))
        q = a2.get(png)
        d = val(q["Dist"]) if q is not None else None
        rad = val(q["Radphys"]) if q is not None else None
        v.add(val(r["OName"]) or png, "planetarni", l, b, d,
              val(q["b_Dist"]) if q is not None else None, val(q["B_Dist"]) if q is not None else None,
              "paralaxa centrální hvězdy (Gaia EDR3)",
              "Poloha: centrální hvězda v Gaia EDR3, vzdálenost z paralaxy (González-Santamaría et al. 2021).",
              [png], velikost=2 * rad if rad else None,
              trida=f"spolehlivost identifikace {val(r['Group'])}" + (f", morfologie {val(q['Morph'])}" if q is not None and val(q["Morph"]) else ""),
              dvz=0 if d is not None else 3)


def snr(v: Vrstva) -> None:
    for r in cds_table("VII/297", "snrs.dat"):
        ra = 15 * (val(r["RAh"]) + val(r["RAm"]) / 60 + val(r["RAs"]) / 3600)
        dec = (val(r["DEd"]) + val(r["DEm"]) / 60) * (-1 if val(r["DE-"]) == "-" else 1)
        l, b = gal(ra, dec)
        names = [n.strip() for n in (val(r["Names"]) or "").split(",") if n.strip()]
        v.add(f"SNR {val(r['SNR'])}", "snr", l, b,
              zdroj="Poloha: Green 2025 (CDS VII/297), vzdálenost v katalogu není.", alias=names,
              prumer=val(r["MajDiam"]), trida=SNR_TYP.get(val(r["type"]), val(r["type"])), dvz=3)


def main():
    v = Vrstva("mlhoviny", TYPY, POLE, FASETY)
    hii(v)
    svetle(v)
    temne(v)
    mracna(v)
    planetarni(v)
    snr(v)
    v.uloz({
        "nazev": "Mlhoviny a mezihvězdná mračna",
        "zdroj": "Anderson+ 2014 (WISE H II), Sharpless 1959, Lynds 1962 a 1965, Zucker+ 2020, González-Santamaría+ 2021, Green 2025 – vše přes CDS/VizieR",
        "url": "https://vizier.cds.unistra.fr/",
        "licence": "Katalogy CDS/VizieR – volně s citací (podmínky CDS ověřit)",
        "citace": "Anderson L.D. et al. 2014, ApJS 212, 1; Sharpless S. 1959, ApJS 4, 257; Lynds B.T. 1962, ApJS 7, 1; Lynds B.T. 1965, ApJS 12, 163; Zucker C. et al. 2020, A&A 633, A51; González-Santamaría I. et al. 2021, A&A 656, A51; Green D.A. 2025 (CDS VII/297)",
        "poznamka": "Vzdálenosti oblastí H II jsou většinou kinematické (nejisté). Světlé, temné mlhoviny, pozůstatky supernov a většina Sharplessových oblastí vzdálenost nemají – jen v seznamu.",
    })


if __name__ == "__main__":
    main()
