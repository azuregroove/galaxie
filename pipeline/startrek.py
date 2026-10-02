"""Fanouškovská vrstva Star Trek → public/data/startrek.json. FIKCE, jasně označená v aplikaci.

Vstup: wikitext z Memory Alpha (kánon, CC BY-NC) a Memory Beta (licencovaná fikce vč. Star Charts, CC BY-SA),
stažený skriptem startrek_stahni.py (+ stránky mocností). Bere se jen fakta: jméno, příslušnost, vzdálenosti.

Postup:
 1. infoboxy hvězd, soustav a planet → příslušnost (preferuje se 24. století), kvadrant, „~N ly od Slunce“,
    souhvězdí; z textu „N light years from X“ (vzájemné vzdálenosti)
 2. soustavy pojmenované po skutečných hvězdách → SIMBAD (Sesame); přijato jen když sedí uvedená vzdálenost
    (±30 % nebo 5 ly) nebo souhvězdí → skutečná poloha
 3. fiktivní soustavy v kvadrantech Alfa/Beta → poloha výpočtem (nejmenší čtverce) z omezení: vzdálenosti od Slunce
    a od jiných soustav, strana kvadrantu (hranice Alfa/Beta = spojnice Slunce–centrum; Beta je na l 180–360°,
    ověřeno na 40 Eridani, Wolf 359, Procyonu, Altairu…), slabé přitažení k těžišti vlastní mocnosti a k rovině
 4. Gamma a Delta: schematické oblasti podle vzdáleností z Memory Alpha/Beta (cesta Voyageru, Idran, Dominion)
Výsledek je extrapolace, ne kánon. U každé soustavy se ukládá, jak k poloze došlo.
"""
from __future__ import annotations

import json
import math
import re
import time
import urllib.parse
import urllib.request
import zlib
from collections import defaultdict

import numpy as np
from astropy.coordinates import SkyCoord, get_constellation
import astropy.units as u

from common import DATA_DIR, LY_PER_PC, R0_PC, RAW_DIR, now_iso, update_manifest, write_json

RAW = RAW_DIR / "startrek"
SESAME = "https://vizier.cds.unistra.fr/viz-bin/nph-sesame/-oxp/SNV?"
R0_LY = R0_PC * LY_PER_PC

# ---------------------------------------------------------------- mocnosti
# (id, česky, barva, kvadrant, aliasy v infoboxech); ostatní příslušnosti se doplní automaticky
POWERS = [
    ("federace", "Spojená federace planet", "#5b8cff", "AB", ["Federation", "United Federation of Planets", "United Earth", "Starfleet",
     "Coalition of Planets", "Unted Federation of Planets", "United Planets", "Earth", "Human", "Vulcan", "Bolian",
     # zakládající a členské světy – v 24. století součást Federace
     "Andorian Empire", "Vulcan High Command", "Tellarite", "Tellar"]),
    ("klingoni", "Klingonská říše", "#e0453a", "B", ["Klingon Empire", "Klingon", "Klingon diaspora", "Klingon Zone"]),
    ("romulani", "Romulanské hvězdné impérium", "#3fbf6a", "B", ["Romulan Star Empire", "Romulan", "Romulan Free State", "Romulan Empire"]),
    ("cardassiani", "Cardassijská unie", "#c9a227", "A", ["Cardassian Union", "Cardassian", "Cardassian Liberation Front", "cardassian Union"]),
    ("ferengove", "Ferengská aliance", "#e88f2e", "A", ["Ferengi Alliance", "Ferengi"]),
    ("bajor", "Bajor", "#d7c4a0", "A", ["Bajoran Republic", "Bajor", "Bajoran"]),
    ("dominion", "Dominion", "#a35bd6", "G", ["Dominion", "Breen-Dominion Alliance", "Dominion Alliance"]),
    ("breenove", "Breenská konfederace", "#7fc8c8", "A", ["Breen Confederacy", "Breen", "Breen Imperium"]),
    ("tholiane", "Tholianské společenství", "#ff7ad1", "AB", ["Tholian Assembly", "Tholian", "Tholian Republic"]),
    ("gornove", "Gornská hegemonie", "#7a9e3a", "B", ["Gorn Hegemony", "Gorn"]),
    ("tzenkethi", "Tzenkethská koalice", "#b0b0ff", "A", ["Tzenkethi Coalition", "Tzenkethi"]),
    ("talariani", "Talarianská republika", "#c27c5a", "A", ["Talarian Republic", "Talarian"]),
    ("sheliak", "Sheliakská korporace", "#8fa0b5", "AB", ["Sheliak Corporate", "Sheliak"]),
    ("orioni", "Orionský syndikát", "#4fd18f", "B", ["Orion Syndicate", "Orion Union", "Orion", "Orion Colonies", "Emerald Chain"]),
    ("sona", "Son'a", "#d9b3ff", "B", ["Son'a", "Son'a Empire"]),
    ("tamariani", "Tamariané", "#c9c96b", "AB", ["Tamarian", "Children of Tama"]),
    ("xindi", "Xindi", "#b98a5a", "B", ["Xindi", "Xindi Council"]),
    ("kzinti", "Kzinti", "#ffb347", "AB", ["Kzinti", "Kzinti Patriarchy", "The Patriarchy"]),
    ("borg", "Borgský kolektiv", "#46e05a", "D", ["Borg Collective", "Borg"]),
    ("kazoni", "Kazoni", "#c8743c", "D", ["Kazon", "Kazon Collective", "Kazon-Ogla", "Kazon-Nistrim", "Kazon Order"]),
    ("vidiiane", "Vidiianská sodalita", "#b8b25a", "D", ["Vidiian Sodality", "Vidiian"]),
    ("talaxiane", "Talaxiané", "#e3a86b", "D", ["Talaxian", "Talax"]),
    ("hirogeni", "Hirogeni", "#8a6a4a", "D", ["Hirogen"]),
    ("krenimove", "Krenimské impérium", "#d06060", "D", ["Krenim Imperium", "Krenim"]),
    ("malonove", "Malonové", "#9a8a40", "D", ["Malon"]),
    ("devore", "Devorské impérium", "#9fb0d0", "D", ["Devore Imperium", "Devore"]),
]
ALIAS = {a.lower(): p[0] for p in POWERS for a in p[4]}
# dočasné okupace a spojenectví ustupují stálé příslušnosti
TEMPORARY = {"Dominion", "Breen-Dominion Alliance", "Klingon diaspora", "Klingon-Cardassian Alliance", "Dominion Alliance",
             "Romulan Free State", "Emerald Chain"}
NOT_POWER = {"civilization", "space", "being", "mirror universe", "protectorate", "ally", "independent", "none", "neutral",
             "unknown", "uninhabited", "inhabited", "colony", "terran empire", "kelvin timeline", "mixtus inhabitant",
             "glisten cluster", "altair quadrant"}

# Gamma a Delta: schematické oblasti. (id, vzdálenost od Země ly, vzdálenost od centra ly nebo None, poloměr ly, zdroj)
FAR = [
    ("kazoni", 70000, None, 3000, "Memory Beta „Kazon“ – Ochránce přenesl Voyager 70 000 ly (VOY Caretaker)"),
    ("talaxiane", 69000, None, 2500, "Talaxiané se k Voyageru přidali u Ocampy (VOY Caretaker) – odhad blízko 70 000 ly"),
    ("vidiiane", 67000, None, 3000, "Vidiiané potkáni v 1.–2. sezóně VOY – odhad podle pořadí cesty"),
    ("krenimove", 62500, None, 2500, "Memory Alpha: přes 60 000 ly od Země; Memory Beta: 65 000 ly"),
    ("borg", 55000, None, 9000, "Borgský prostor v 3.–5. sezóně VOY; po skoku Kes o 9 500 ly (VOY The Gift) – odhad"),
    ("hirogeni", 50000, None, 6000, "Hirogeni ve 4. sezóně VOY – odhad podle pořadí cesty"),
    ("malonove", 40000, None, 2500, "Malonové v 5. sezóně VOY, po transwarpu o 20 000 ly (VOY Dark Frontier) – odhad"),
    ("devore", 37000, None, 2500, "Devore v 5. sezóně VOY – odhad podle pořadí cesty"),
    ("dominion", None, 45000, 5000, "Memory Alpha: Dominion 40–50 tis. ly od centra; Memory Beta: 10 000 × 5 000 ly (24. stol.)"),
]
IDRAN = (40000, 70000)

# ruční opravy příslušnosti (domovské světy, kde wiki uvádí jen stav z 32. století)
OVERRIDE = {"tzenketh": "tzenkethi"}
# měkké vazby z textu wiki: (soustava, cíl, ly, zdroj)
SOFT_REL = [("qo'nos", "Omega Leonis", 15, "Memory Alpha: Qo'noS v sektorovém bloku Omega Leonis (Star Trek Into Darkness)")]
# hlavní světy
CAPITAL = {"federace": "sol", "klingoni": "qo'nos", "romulani": "romulus", "cardassiani": "cardassian", "ferengove": "ferenginar",
           "bajor": "bajoran", "breenove": "breen", "tholiane": "tholia", "talariani": "talar", "tzenkethi": "tzenketh",
           "sheliak": "tau cygna"}
# mocnosti bez kotev: sousedé podle Memory Beta (vychází ze Star Charts) – (mocnost, sousedé, kvadrant, zdroj)
NEIGHBORS = [
    ("tholiane", ["federace", "klingoni", "breenove"], "Alpha", "Memory Beta: Tholian Assembly, Klingon Empire, Breen Confederacy"),
    ("breenove", ["cardassiani", "ferengove", "tholiane", "klingoni"], "Alpha", "Memory Beta: Cardassian Union, Ferengi Alliance, Breen Confederacy"),
    ("tzenkethi", ["cardassiani", "ferengove"], "Alpha", "Memory Beta: Tzenkethi Coalition"),
    ("talariani", ["cardassiani", "federace"], "Alpha", "Memory Beta: Cardassian Union, Talarian Republic"),
    ("sheliak", ["breenove"], "Alpha", "Memory Beta: Breen Confederacy, Sheliak Corporate"),
    ("gornove", ["federace", "klingoni"], "Beta", "Memory Beta: Gorn Hegemony – mezi Federací a Klingony, směrem k centru Galaxie"),
    ("orioni", ["klingoni"], "Beta", "Memory Beta: Orion Syndicate, Klingon Empire (Borderland)"),
    ("sona", ["cardassiani", "bajor"], "Alpha", "Memory Alpha: Son'a – kolonie u Cardassie a bajorské červí díry"),
    ("kzinti", ["klingoni", "romulani"], "Beta", "Memory Alpha: Kzinti – poblíž Klingonů a Romulanů (TAS)"),
]  # ly od centra, ly od Bajoru (Memory Alpha „Idran system“)

NUM = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
       "eleven": 11, "twelve": 12, "fifteen": 15, "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50, "sixty": 60,
       "seventy": 70, "eighty": 80, "ninety": 90, "a hundred": 100, "one hundred": 100, "two hundred": 200}

GREEK = {"alpha": "alf", "beta": "bet", "gamma": "gam", "delta": "del", "epsilon": "eps", "zeta": "zet", "eta": "eta",
         "theta": "tet", "iota": "iot", "kappa": "kap", "lambda": "lam", "mu": "mu.", "nu": "nu.", "xi": "ksi",
         "omicron": "omi", "pi": "pi.", "rho": "rho", "sigma": "sig", "tau": "tau", "upsilon": "ups", "phi": "phi",
         "chi": "chi", "psi": "psi", "omega": "ome"}
GENITIVE = {
    "Andromedae": "And", "Antliae": "Ant", "Apodis": "Aps", "Aquarii": "Aqr", "Aquilae": "Aql", "Arae": "Ara", "Arietis": "Ari",
    "Aurigae": "Aur", "Bootis": "Boo", "Caeli": "Cae", "Camelopardalis": "Cam", "Cancri": "Cnc", "Canum Venaticorum": "CVn",
    "Canis Majoris": "CMa", "Canis Minoris": "CMi", "Capricorni": "Cap", "Carinae": "Car", "Cassiopeiae": "Cas",
    "Centauri": "Cen", "Cephei": "Cep", "Ceti": "Cet", "Chamaeleontis": "Cha", "Circini": "Cir", "Columbae": "Col",
    "Comae Berenices": "Com", "Coronae Australis": "CrA", "Coronae Borealis": "CrB", "Corvi": "Crv", "Crateris": "Crt",
    "Crucis": "Cru", "Cygni": "Cyg", "Delphini": "Del", "Doradus": "Dor", "Draconis": "Dra", "Equulei": "Equ",
    "Eridani": "Eri", "Fornacis": "For", "Geminorum": "Gem", "Gruis": "Gru", "Herculis": "Her", "Horologii": "Hor",
    "Hydrae": "Hya", "Hydri": "Hyi", "Indi": "Ind", "Lacertae": "Lac", "Leonis": "Leo", "Leonis Minoris": "LMi",
    "Leporis": "Lep", "Librae": "Lib", "Lupi": "Lup", "Lyncis": "Lyn", "Lyrae": "Lyr", "Mensae": "Men",
    "Microscopii": "Mic", "Monocerotis": "Mon", "Muscae": "Mus", "Normae": "Nor", "Octantis": "Oct", "Ophiuchi": "Oph",
    "Orionis": "Ori", "Pavonis": "Pav", "Pegasi": "Peg", "Persei": "Per", "Phoenicis": "Phe", "Pictoris": "Pic",
    "Piscium": "Psc", "Piscis Austrini": "PsA", "Puppis": "Pup", "Pyxidis": "Pyx", "Reticuli": "Ret", "Sagittae": "Sge",
    "Sagittarii": "Sgr", "Scorpii": "Sco", "Sculptoris": "Scl", "Scuti": "Sct", "Serpentis": "Ser", "Sextantis": "Sex",
    "Tauri": "Tau", "Telescopii": "Tel", "Trianguli": "Tri", "Trianguli Australis": "TrA", "Tucanae": "Tuc",
    "Ursae Majoris": "UMa", "Ursae Minoris": "UMi", "Velorum": "Vel", "Virginis": "Vir", "Volantis": "Vol",
    "Vulpeculae": "Vul",
}
CONST_NOM = {"Ursa Major": "UMa", "Ursa Minor": "UMi", "Canis Major": "CMa", "Canis Minor": "CMi", "Leo Minor": "LMi"}


# ---------------------------------------------------------------- wikitext
def clean(s: str) -> str:
    s = re.sub(r"<ref[^>]*/>|<ref[^>]*>.*?</ref>", "", s, flags=re.S)
    s = re.sub(r"\{\{[Ss]mall\|(.*?)\}\}", r"\1", s)
    s = re.sub(r"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", r"\1", s)
    return re.sub(r"\s+", " ", s).strip()


IB_START = re.compile(r"\{\{\s*(sidebar[^|\n}]*|star|planet|system|star system|planetary system|location)\s*[\n|]", re.I)


def infobox(text: str) -> dict[str, str]:
    m = IB_START.search(text[:6000])
    if not m:
        return {}
    i = m.start()
    depth, j = 0, i
    while j < len(text) - 1:
        if text.startswith("{{", j):
            depth += 1
            j += 2
            continue
        if text.startswith("}}", j):
            depth -= 1
            j += 2
            if depth == 0:
                break
            continue
        j += 1
    body = text[i:j]
    out = {}
    for m in re.finditer(r"^\s*\|\s*(\w+)\s*=\s*(.*?)(?=^\s*\||\Z)", body, re.M | re.S):
        out[m.group(1).lower()] = m.group(2).strip().rstrip("}").strip()
    return out


def number(s: str) -> float | None:
    s = s.strip().lower().replace(",", "")
    m = re.match(r"^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[- ](one|two|three|four|five|six|seven|eight|nine)$", s)
    if m:
        return NUM[m.group(1)] + NUM[m.group(2)]
    try:
        return float(s)
    except ValueError:
        return NUM.get(s)


def key(name: str) -> str:
    n = re.sub(r"\s*\((star|star system|system|planet)\)$", "", name.strip(), flags=re.I)
    n = re.sub(r"\s+(star system|system)$", "", n, flags=re.I)
    return n.lower()


def affiliation(raw: str) -> tuple[str | None, str | None, str]:
    """(mocnost, éra, text) – preferuje 24. století, pak bez data, pak cokoli."""
    if not raw:
        return None, None, ""
    segs = re.split(r"<br\s*/?>|\n|;", raw)
    cand = []
    for s in segs:
        t = re.sub(r"\{\{(\w[\w ]*)\}\}", r"[[\1]]", s)  # {{Federation}} → [[Federation]]
        names = [n for n in re.findall(r"\[\[([^\]|#]+)", t) if not re.match(r"^\d|century|AD$", n)]
        if not names:
            continue
        years = [int(y) for y in re.findall(r"\b(2[1-9]\d\d|3[01]\d\d)\b", t)]
        cent = re.findall(r"(\d\d)(?:st|nd|rd|th) century", t)
        era = years[0] if years else (int(cent[0]) * 100 - 50 if cent else None)
        cand.append((names[0], era))
    if not cand:
        return None, None, clean(raw)

    name, era = sorted(cand, key=era_score)[0]
    return name, (str(era) if era else None), clean(raw)


def era_score(c) -> float:
    """Nižší = lepší: 24. století, bez data, 32. století (dlouhodobé členství), 23. století a dřív; okupace naposled."""
    name, e = c[0], c[1]
    if name in TEMPORARY:
        return 2.5
    if e is None:
        return 1
    e = int(e)
    if 2300 <= e < 2400:
        return 0
    return 1.5 if e >= 2400 else 2


def power_of(name: str | None) -> str | None:
    if not name:
        return None
    n = name.strip()
    if n.lower() in ALIAS:
        return ALIAS[n.lower()]
    if n.lower() in NOT_POWER or len(n) < 3:
        return None
    return "x:" + n  # zatím neznámá mocnost – rozhodne se podle počtu soustav


def load(wiki: str, cat: str) -> list[dict]:
    p = RAW / f"{wiki}-{cat}.jsonl"
    return [json.loads(line) for line in open(p, encoding="utf-8")] if p.exists() else []


# ---------------------------------------------------------------- SIMBAD
def sesame_cache() -> dict:
    p = RAW / "sesame.json"
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}


def sesame(names: list[str], cache: dict) -> dict | None:
    for n in names:
        if n not in cache and not DESIGNATION.match(n):
            continue  # fiktivní jména by Sesame hledal ~10 s, než vrátí nic
        if n in cache:
            if cache[n]:
                return cache[n] | {"dotaz": n}
            continue
        try:
            with urllib.request.urlopen(SESAME + urllib.parse.quote(n), timeout=15) as r:
                x = r.read().decode("utf-8", "replace")
        except Exception:  # noqa: BLE001
            x = ""
        ra = re.search(r"<jradeg>([-\d.]+)", x)
        de = re.search(r"<jdedeg>([-\d.]+)", x)
        plx = re.search(r"<plx><v>([-\d.]+)", x)
        on = re.search(r"<oname>(.*?)</oname>", x)
        cache[n] = {"ra": float(ra.group(1)), "dec": float(de.group(1)), "plx": float(plx.group(1)) if plx else None,
                    "simbad": on.group(1) if on else n} if ra and de else None
        time.sleep(0.15)
        if cache[n]:
            return cache[n] | {"dotaz": n}
    return None


GREEK_SYM = dict(zip("αβγδεζηθικλμνξοπρστυφχψω", ["alf", "bet", "gam", "del", "eps", "zet", "eta", "tet", "iot", "kap",
                  "lam", "mu.", "nu.", "ksi", "omi", "pi.", "rho", "sig", "tau", "ups", "phi", "chi", "psi", "ome"]))
DESIGNATION = re.compile(r"^((alf|bet|gam|del|eps|zet|eta|tet|iot|kap|lam|mu\.|nu\.|ksi|omi|pi\.|rho|sig|tau|ups|phi|chi|psi|ome)\d? "
                         r"[A-Z][A-Za-z]{2}( [A-C])?|\d+ [A-Z][A-Za-z]{2}|(HD|HR|HIP|GJ|Gliese|Gl|Wolf|Ross|Lalande|LHS|LTT|BD|"
                         r"Kepler|Luyten|Groombridge|Struve|Kapteyn|Lacaille|Teegarden|Van Maanen|Barnard|SS|NGC|IC|Messier|M)\b.*"
                         r"|[VR]\d{2,4} [A-Z][A-Za-z]{2}|[A-Z]{1,2} [A-Z][A-Za-z]{2}|\d+ [A-Z][A-Za-z]{2} [A-C])$")


def norm_star(n: str) -> str:
    n = n.strip()
    if n and n[0] in GREEK_SYM:
        n = GREEK_SYM[n[0]] + n[1:]
    return re.sub(r"\s+", " ", n).lower()


def local_stars() -> dict:
    """Jasné hvězdy mapy (hvezdy.json: vlastní jména, Bayer, HD, HIP) → (l, b, d pc, zdroj)."""
    d = json.loads((DATA_DIR / "hvezdy.json").read_text(encoding="utf-8"))["objekty"]
    out = {}
    for i, name in enumerate(d["jmeno"]):
        if d["d"][i] is None:
            continue
        for n in [name, *((d["alias"][i] or "").split("; "))]:
            if n:
                out.setdefault(norm_star(n), (d["l"][i], d["b"][i], d["d"][i], name))
    return out


def star_names(e: dict) -> list[str]:
    out = []
    base = re.sub(r"\s+(system|star system)$", "", e["name"], flags=re.I)
    for n in [base, *e["aka"]]:
        n = re.sub(r"<[^>]+>", "", n)
        n = re.sub(r"\s+(system|star system)$", "", re.sub(r"\s*\(.*?\)", "", n).strip(), flags=re.I)
        if not n or len(n) > 40:
            continue
        m = re.match(r"^(\w+)(\d?)\s+(.+?)(?:\s+([A-C]))?$", n)
        if m and m.group(1).lower() in GREEK and m.group(3) in GENITIVE:
            g = GREEK[m.group(1).lower()] + (m.group(2) or "")
            out.append(f"{g} {GENITIVE[m.group(3)]}" + (f" {m.group(4)}" if m.group(4) else ""))
        m = re.match(r"^(\S+)\s+(.+)$", n)
        if m and m.group(2) in GENITIVE and m.group(1).lower() not in GREEK:
            out.append(f"{m.group(1)} {GENITIVE[m.group(2)]}")
        out.append(n)
    return list(dict.fromkeys(out))


# ---------------------------------------------------------------- hlavní
def main() -> None:
    ents: dict[str, dict] = {}
    planet_sys: list[tuple[str, str, dict]] = []

    def ent(name: str) -> dict:
        k = key(name)
        if k not in ents:
            nm = re.sub(r"\s*\((star|planet|star system|system)\)$", "", name.strip(), flags=re.I)
            ents[k] = {"name": re.sub(r"\s+(star system|system)$", "", nm, flags=re.I), "aka": [], "aff": [], "quad": None,
                       "dsol": [], "rel": [], "const": None, "src": set(), "real_hint": False}
        return ents[k]

    pages = [("memory-alpha", c, r) for c in ("Stars", "Star_systems", "Planets") for r in load("memory-alpha", c)] + \
            [("memory-beta", c, r) for c in ("Stars", "Star_systems", "Planets") for r in load("memory-beta", c)]
    print(f"stránek: {len(pages)}")
    for wiki, cat, r in pages:
        title, text = r["title"], r["text"]
        ib = infobox(text)
        if cat == "Planets":
            sysname = None
            for f in ("system", "location"):
                m = re.search(r"\[\[([^\]|]+?(?: system| star system))(?:\|[^\]]*)?\]\]", ib.get(f, ""))
                if m:
                    sysname = m.group(1)
                    break
            planet_sys.append((title, sysname, {"wiki": wiki, "ib": ib, "text": text}))
            continue
        e = ent(title)
        e["src"].add(f"{wiki}:{title}")
        for f in ("aka",):
            if ib.get(f):
                e["aka"] += [clean(a) for a in re.split(r"<br\s*/?>|,|\n", ib[f]) if clean(a)]
        if ib.get("affiliation"):
            e["aff"].append((wiki,) + affiliation(ib["affiliation"]))
        loc = ib.get("location", "")
        for q in ("Alpha", "Beta", "Gamma", "Delta"):
            if f"{q} Quadrant" in loc and "or [[Beta" not in loc and "Alpha or" not in loc:
                e["quad"] = e["quad"] or q
        for m in re.finditer(r"~?\s*([\d.,]+)\s*\[\[light[ -]year\]\]s? from (?:the )?\[\[(?:Sol|Earth|Sol system)(?:\|[^\]]*)?\]\]", loc):
            e["dsol"].append((float(m.group(1).replace(",", "")), f"{wiki}:{title}"))
        if ib.get("soldist"):
            m = re.match(r"\s*~?([\d.,]+)\s*(?:\[\[)?light", ib["soldist"])
            if m:
                e["dsol"].append((float(m.group(1).replace(",", "")), f"{wiki}:{title}"))
        if ib.get("constellation"):
            e["const"] = clean(ib["constellation"])
        m = re.search(r"also known as (.{0,300}?)[,.(]\s", text[:8000])
        if m:
            e["aka"] += [clean(a) for a in re.findall(r"'''([^']+)'''", m.group(1))]
        if re.search(r"visible from \[\[Earth\]\]", text) or ib.get("bayer") or ib.get("flamsteed"):
            e["real_hint"] = True
        for b in (ib.get("bayer"),):
            if b and e["const"]:
                e["aka"].append(f"{clean(b)} {e['const']}")
        # vzájemné vzdálenosti z textu: „approximately five light years from the [[Bajoran system]]“
        for m in re.finditer(r"(?:approximately|about|some|roughly|~)?\s*([\d.,]+|[a-z]+(?:[- ][a-z]+)?)\s*(?:\[\[)?light[ -]year(?:\]\])?s?"
                             r" (?:away )?from (?:the )?\[\[([^\]|#]+)", text + loc):
            d = number(m.group(1))
            tgt = m.group(2)
            # cíl musí být místo, ne mocnost („50,3 ly od hranice Federace“ není vzdálenost k bodu)
            if (d and d < 2000 and not re.match(r"(Sol|Earth|Sol system|galactic core)$", tgt) and tgt[:1].isupper()
                    and tgt.lower() not in ALIAS):
                e["rel"].append((d, tgt, f"{wiki}:{title}"))

    # planety → příslušnost jejich soustavy (nebo planeta jako samostatný bod, když soustava chybí)
    for title, sysname, d in planet_sys:
        ib = d["ib"]
        if not ib.get("affiliation") and not sysname:
            continue
        e = ent(sysname) if sysname else ent(title)
        e["src"].add(f"{d['wiki']}:{title}")
        if ib.get("affiliation"):
            e["aff"].append((d["wiki"],) + affiliation(ib["affiliation"]))
        loc = ib.get("location", "")
        for q in ("Alpha", "Beta", "Gamma", "Delta"):
            if f"{q} Quadrant" in loc and "Alpha or" not in loc:
                e["quad"] = e["quad"] or q
        for m in re.finditer(r"~?\s*([\d.,]+)\s*\[\[light[ -]year\]\]s? from (?:the )?\[\[(?:Sol|Earth|Sol system)(?:\|[^\]]*)?\]\]", loc):
            e["dsol"].append((float(m.group(1).replace(",", "")), f"{d['wiki']}:{title}"))
        if ib.get("soldist"):
            m = re.match(r"\s*~?([\d.,]+)\s*(?:\[\[)?light", ib["soldist"])
            if m:
                e["dsol"].append((float(m.group(1).replace(",", "")), f"{d['wiki']}:{title}"))
    # Slunce je počátek – ne výpočet
    sol = ents.get("sol")
    if sol:
        sol.update(xyz=[0.0, 0.0, 0.0], how="hvezda", simbad="Slunce", why="počátek souřadnic", dsol=[], rel=[], power="federace")
    print(f"soustav a samostatných planet: {len(ents)}")

    # příslušnost entity: MA má přednost před MB (kánon), jinak nejčastější
    counts = defaultdict(int)
    for e in ents.values():
        cands = [a for a in e["aff"] if power_of(a[1])]
        best = min(cands, key=lambda a: (era_score((a[1], a[2])), a[0] != "memory-alpha")) if cands else None
        if best and POWER_Q.get(power_of(best[1]) or "", "AB") in ("G", "D") and e["quad"] in ("Alpha", "Beta"):
            rest = [a for a in cands if POWER_Q.get(power_of(a[1]) or "", "AB") not in ("G", "D")]
            best = min(rest, key=lambda a: (era_score((a[1], a[2])), a[0] != "memory-alpha")) if rest else None
        e["power"] = power_of(best[1]) if best else None
        e["era"] = best[2] if best else None
        e["aff_text"] = best[3] if best else ""
        e["aff_src"] = best[0] if best else None
        if e["power"]:
            counts[e["power"]] += 1
    for k, pw in OVERRIDE.items():
        if k in ents:
            ents[k]["power"] = pw
    for k, tgt, d, src in SOFT_REL:
        if k in ents:
            ents[k]["rel"].append((d, tgt, src))
    # neznámé příslušnosti: mocnost jen když má aspoň 2 soustavy (jinak jde spíš o jednu planetu)
    extra = {p: n for p, n in counts.items() if p.startswith("x:") and n >= 2}
    for e in ents.values():
        if e["power"] and e["power"].startswith("x:") and e["power"] not in extra:
            e["power"] = None
    print("mocnosti:", sorted(((n, p) for p, n in counts.items() if not p.startswith("x:") or p in extra), reverse=True))

    # ------------------------------------------------ skutečné hvězdy
    cache = sesame_cache()
    real = 0
    cands = [e for e in ents.values() if not e.get("xyz") and (e["real_hint"] or e["dsol"] or e["const"] or e["aka"])
             and (e["power"] or e["dsol"] or e["rel"])]
    print(f"kandidáti na skutečnou hvězdu: {len(cands)}")
    bright = local_stars()
    for i, e in enumerate(cands):
        names = star_names(e)
        hit = next((bright[norm_star(n)] for n in names if norm_star(n) in bright), None)
        if hit:
            # jasná hvězda z mapy → přímo galaktické souřadnice
            l, b, dpc, nm = hit
            cg = SkyCoord(l=l * u.deg, b=b * u.deg, frame="galactic").icrs
            s = {"ra": cg.ra.deg, "dec": cg.dec.deg, "plx": 1000 / dpc, "simbad": nm + " (jasné hvězdy mapy)"}
        else:
            s = sesame(names, cache)
        if i % 100 == 0:
            (RAW / "sesame.json").write_text(json.dumps(cache), encoding="utf-8")
        if not s:
            continue
        stated = [d for d, _ in e["dsol"]]
        c = SkyCoord(ra=s["ra"] * u.deg, dec=s["dec"] * u.deg)
        if not s.get("plx") or s["plx"] <= 0.3:
            if not stated:
                continue
            s["plx"] = 1000 / (float(np.median(stated)) / LY_PER_PC)
            s["simbad"] += " (směr; vzdálenost z wiki)"
        d_ly = 1000 / s["plx"] * LY_PER_PC
        ok, why = False, ""
        if hit:
            ok = True  # jméno jasné hvězdy je jednoznačné; rozpor vzdáleností se jen poznamená
            why = (f"jasná hvězda mapy; wiki uvádí {float(np.median(stated)):g} ly, katalog {d_ly:.0f} ly"
                   if stated else "jasná hvězda mapy")
        elif stated:
            ds = float(np.median(stated))
            ok = abs(d_ly - ds) <= max(0.3 * ds, 5)
            why = f"vzdálenost {ds:g} ly (wiki) × {d_ly:.0f} ly (SIMBAD)"
        elif e["const"]:
            con = get_constellation(c, short_name=True)
            want = GENITIVE.get(e["const"]) or CONST_NOM.get(e["const"]) or e["const"][:3]
            ok = con.lower() == want.lower() or get_constellation(c).lower() == e["const"].lower()
            why = f"souhvězdí {e['const']}"
        if ok:
            g = c.galactic
            dpc = d_ly / LY_PER_PC
            L, B = math.radians(g.l.deg), math.radians(g.b.deg)
            e["xyz"] = [dpc * math.cos(B) * math.cos(L), dpc * math.cos(B) * math.sin(L), dpc * math.sin(B)]
            e["how"] = "hvezda"
            e["simbad"] = s["simbad"]
            e["why"] = why
            real += 1
    (RAW / "sesame.json").write_text(json.dumps(cache), encoding="utf-8")
    print(f"skutečné hvězdy přijaté: {real}")

    # kontrola konvence kvadrantů na skutečných hvězdách (Beta = l 180–360° → y < 0)
    agree = [((e["xyz"][1] < 0) == (e["quad"] == "Beta")) for e in ents.values() if e.get("xyz") and e["quad"] in ("Alpha", "Beta")]
    print(f"kvadrant vs. skutečná poloha: {sum(agree)}/{len(agree)} souhlasí")

    (RAW / "entity.json").write_text(json.dumps({k: {kk: (sorted(v) if isinstance(v, set) else v) for kk, v in e.items()}
                                                  for k, e in ents.items()}, ensure_ascii=False, default=str), encoding="utf-8")

    # ------------------------------------------------ výpočet poloh fiktivních soustav (Alfa/Beta)
    by_name = {key(k): v for k, v in ents.items()}

    def far_power(e):
        return POWER_Q.get(e["power"] or "", "AB") in ("D", "G") or e["quad"] in ("Gamma", "Delta")

    # jen soustavy s aspoň jedním vzdálenostním údajem; bez něj by poloha byla vymyšlená
    local = [e for e in ents.values() if not e.get("xyz") and not far_power(e)
             and (e["dsol"] or any(key(t) in by_name for _, t, _ in e["rel"]))]
    # vazby mohou ukazovat i na soustavy bez vlastních údajů → přidat je (poloha jen z vazeb)
    in_local = {id(e) for e in local}
    for e in list(local):
        for _, t, _ in e["rel"]:
            o = by_name.get(key(t))
            if o is not None and not o.get("xyz") and id(o) not in in_local and not far_power(o):
                local.append(o)
                in_local.add(id(o))
    idx = {id(e): i for i, e in enumerate(local)}
    n = len(local)
    anchors = defaultdict(list)
    for e in ents.values():
        if e.get("xyz") and e["power"]:
            anchors[e["power"]].append(np.array(e["xyz"]) * LY_PER_PC)
    cent = {p: np.mean(v, 0) for p, v in anchors.items()}
    print(f"fiktivních soustav k výpočtu: {n}; kotvy: {sorted(((len(v), p) for p, v in anchors.items()), reverse=True)[:12]}")

    # vazby: (i, j nebo −1 = pevný bod, cíl v ly, pevný bod xyz)
    I, J, D, FX = [], [], [], []
    for e in local:
        i = idx[id(e)]
        for d, _ in e["dsol"]:
            I.append(i); J.append(-1); D.append(d); FX.append((0.0, 0.0, 0.0))
        for d, t, _ in e["rel"]:
            o = by_name.get(key(t))
            if o is None:
                continue
            if o.get("xyz"):
                I.append(i); J.append(-1); D.append(d); FX.append(tuple(np.array(o["xyz"]) * LY_PER_PC))
            elif id(o) in idx:
                I.append(i); J.append(idx[id(o)]); D.append(d); FX.append((0.0, 0.0, 0.0))
    I, J, D, FX = np.array(I, int), np.array(J, int), np.array(D, float), np.array(FX, float).reshape(-1, 3)
    quad = np.array([1 if e["quad"] == "Beta" else (-1 if e["quad"] == "Alpha" else 0) for e in local])
    C = np.array([cent.get(e["power"], np.full(3, np.nan)) for e in local]).reshape(-1, 3)
    hasC = ~np.isnan(C[:, 0])

    rng = np.random.default_rng(1701)
    P = np.zeros((n, 3))
    for e in local:
        i = idx[id(e)]
        d = float(np.median([d for d, _ in e["dsol"]])) if e["dsol"] else 60.0
        c = C[i] if hasC[i] else np.array([0.0, -d if quad[i] == 1 else d, 0.0])
        v = c + rng.normal(0, 20, 3)
        v[2] *= 0.3
        P[i] = v / max(np.linalg.norm(v), 1e-6) * d
    # relaxace: vazby vzdáleností, strana kvadrantu, slabě k těžišti vlastní mocnosti a k rovině Galaxie
    free_j = J >= 0
    for it in range(1500):
        a = 0.5 if it < 1000 else 0.2
        other = np.where(free_j[:, None], P[np.maximum(J, 0)], FX)
        v = P[I] - other
        r = np.linalg.norm(v, axis=1) + 1e-9
        w = 1.0 / (0.1 * D + 2)  # bližší (přesnější) údaje váží víc
        corr = ((D - r) / r * w)[:, None] * v
        acc = np.zeros_like(P)
        cnt = np.zeros(n)
        np.add.at(acc, I, corr)
        np.add.at(cnt, I, w)
        np.add.at(acc, J[free_j], -corr[free_j])
        np.add.at(cnt, J[free_j], w[free_j])
        P += a * acc / np.maximum(cnt, 1e-9)[:, None]
        # Beta: y < 0, Alfa: y > 0 (galaktická osa y míří ke l = 90°)
        bad = ((quad == 1) & (P[:, 1] > 0)) | ((quad == -1) & (P[:, 1] < 0))
        P[bad, 1] *= 0.5
        P[hasC] += 0.002 * (C[hasC] - P[hasC])
        P[:, 2] *= 0.995
    other = np.where(free_j[:, None], P[np.maximum(J, 0)], FX)
    err = np.abs(np.linalg.norm(P[I] - other, axis=1) - D) / D
    print(f"výpočet: vazeb {len(D)}, medián odchylky {np.median(err) * 100:.1f} %, 90 % pod {np.percentile(err, 90) * 100:.1f} %")
    for e in local:
        i = idx[id(e)]
        e["xyz"] = list(P[i] / LY_PER_PC)
        e["how"] = "vypocet"
        m = (I == i) | (J == i)
        parts = [f"{d:g} ly od Slunce" for d, _ in e["dsol"][:2]] + [f"{d:g} ly od {t}" for d, t, _ in e["rel"][:3]]
        parts += [f"{D[k]:g} ly od {local[I[k]]['name']}" for k in np.nonzero(J == i)[0][:3]]
        e["why"] = (f"{'; '.join(parts)} – odchylka výsledku ±{np.median(err[m]) * 100:.0f} %" if m.any() else "jen z vazeb jiných soustav")
    # hlavní svět bez polohy: těžiště umístěných soustav jeho mocnosti
    placed = defaultdict(list)
    for e in ents.values():
        if e.get("xyz") and e["power"]:
            placed[e["power"]].append(np.array(e["xyz"]))
    for pw, k in CAPITAL.items():
        e = ents.get(k)
        if e is not None and not e.get("xyz") and placed.get(pw):
            # směr těžiště, strana kvadrantu podle wiki, vzdálenost = medián vzdáleností soustav mocnosti
            c = np.mean(placed[pw], 0)
            if (e["quad"] == "Beta" and c[1] > 0) or (e["quad"] == "Alpha" and c[1] < 0):
                c[1] = -c[1]
            dist = float(np.median([np.linalg.norm(x) for x in placed[pw]]))
            e.update(xyz=list(c / max(np.linalg.norm(c), 1e-9) * dist), how="odhad", power=pw,
                     why=f"hlavní svět bez údajů o vzdálenosti – směr těžiště {len(placed[pw])} soustav mocnosti, "
                         f"strana kvadrantu {e['quad'] or '?'}, vzdálenost = medián ({dist * LY_PER_PC:.0f} ly)")
            placed[pw].append(np.array(e["xyz"]))
    # mocnosti bez jediné umístěné soustavy: podle sousedů (dvě kola kvůli vzájemným sousedům)
    for _ in range(2):
        for pw, nb, q, src in NEIGHBORS:
            if placed.get(pw) and min(np.linalg.norm(x) for x in placed[pw]) * LY_PER_PC < 600:
                continue
            cs = [np.mean(placed[x], 0) for x in nb if placed.get(x)]
            if not cs:
                continue
            c = np.mean(cs, 0)
            reach = max(np.linalg.norm(x) for x in cs) + 40 / LY_PER_PC
            v = c if np.linalg.norm(c) > 1e-3 else np.array([0.0, 1.0, 0.0])
            if pw == "gornove":
                v = v + np.array([np.linalg.norm(v), 0.0, 0.0])  # „směrem k centru Galaxie“
            if (q == "Beta") != (v[1] < 0):
                v[1] = -v[1]
            v[2] = 0.0
            pos = v / np.linalg.norm(v) * reach
            k = CAPITAL.get(pw)
            e = ents.get(k) if k else None
            if e is None:
                e = ents.setdefault(f"území {pw}", {"name": f"Území: {POWER_NAME.get(pw, pw)}", "aka": [], "aff": [],
                                                     "quad": q, "dsol": [], "rel": [], "const": None, "src": set(), "real_hint": False})
            e.update(xyz=list(pos), how="soused", power=pw, quad=e.get("quad") or q,
                     why=f"odhad podle sousedů ({', '.join(POWER_NAME.get(x, x) for x in nb)}) – {src}")
            placed[pw].append(pos)
    unplaced = defaultdict(int)
    for e in ents.values():
        if e["power"] and not e.get("xyz"):
            unplaced[e["power"]] += 1

    # ------------------------------------------------ výstup
    used = {e["power"] for e in ents.values() if e.get("xyz") and e["power"]}
    powers = []
    for pid, cs, color, quad, aliases in POWERS:
        if pid in used or any(f[0] == pid for f in FAR):
            powers.append({"id": pid, "nazev": cs, "en": aliases[0], "barva": color, "kvadrant": quad,
                           "bez_polohy": unplaced.get(pid, 0)})
    for pid in sorted(p for p in used if p.startswith("x:")):
        h = zlib.crc32(pid.encode()) % 360
        powers.append({"id": pid, "nazev": pid[2:], "en": pid[2:], "barva": f"hsl({h},55%,62%)", "kvadrant": "AB",
                       "bez_polohy": unplaced.get(pid, 0)})
    systems = []
    for e in sorted(ents.values(), key=lambda e: e["name"]):
        if not e.get("xyz"):
            continue
        systems.append({
            "jmeno": e["name"], "mocnost": e["power"], "jak": e["how"], "proc": e.get("why", ""),
            "simbad": e.get("simbad"), "kvadrant": e["quad"], "era": e.get("era"),
            "xyz": [round(v, 2) for v in e["xyz"]],
            "zdroje": sorted(e["src"])[:4],
        })
    far = []
    sun = np.array([-R0_LY, 0.0])
    for pid, d_earth, d_core, rad, src in FAR:
        # galaktocentrická rovina: Slunce v (−R0, 0), kvadranty kolem centra; Gamma y > 0, Delta y < 0 (za centrem x > 0).
        # Bod klademe doprostřed kvadrantu (45° od osy Slunce–centrum), nejvýš 48 000 ly od centra (okraj disku);
        # když to vzdálenost od Země nedovolí, úhel se zmenší.
        sign = 1.0 if pid == "dominion" else -1.0
        p = None
        for phi in np.linspace(45, 1, 89):
            ux, uy = math.cos(math.radians(phi)), sign * math.sin(math.radians(phi))
            if d_core is not None:
                rr = d_core
            else:
                # |r·u − sun| = d_earth → r² − 2 r (u·sun) + |sun|² − d² = 0
                bq = -2 * (ux * sun[0] + uy * sun[1])
                cq = sun @ sun - d_earth ** 2
                rr = (-bq + math.sqrt(bq * bq - 4 * cq)) / 2
            if rr <= 48000:
                p = np.array([rr * ux, rr * uy])
                break
        if p is None:
            p = np.array([48000.0, 0.0])
        # galaktocentrické (x ke Slunci záporně…) → heliocentrické pc
        hx, hy = (p[0] - sun[0]) / LY_PER_PC, p[1] / LY_PER_PC
        far.append({"mocnost": pid, "xyz": [round(hx, 1), round(hy, 1), 0.0], "polomer_ly": rad, "zdroj": src})

    out = {
        "schema": 1, "katalog": "startrek", "stazeno": now_iso(),
        "upozorneni": "Fikce. Fanouškovská extrapolace z Memory Alpha a Memory Beta, ne oficiální mapa ani kánon.",
        "mocnosti": powers, "soustavy": systems, "vzdalene": far,
        "statistika": {"stranek": len(pages), "soustav": len(systems), "skutecne_hvezdy": real,
                       "vypocet": sum(1 for s in systems if s["jak"] == "vypocet")},
    }
    size = write_json(DATA_DIR / "startrek.json", out)
    print(f"startrek.json {size / 1e3:.0f} kB; soustav {len(systems)} (skutečné hvězdy {real}), mocností {len(powers)}")
    update_manifest({
        "id": "startrek", "soubor": "startrek.json", "nazev": "Star Trek – fanouškovská vrstva (fikce)",
        "zdroj": "Memory Alpha (memory-alpha.fandom.com) a Memory Beta (memory-beta.fandom.com); polohy skutečných hvězd SIMBAD",
        "url": "https://memory-alpha.fandom.com/",
        "licence": "Fakta z wiki: Memory Alpha CC BY-NC, Memory Beta CC BY-SA (uvedeno, nekomerční). Star Trek © Paramount; "
                   "neoficiální fanouškovská vrstva",
        "poznamka": "Polohy fiktivních soustav jsou vypočtené z uvedených vzdáleností a kvadrantů, vzdálené mocnosti schematicky.",
        "vyrez": False,
    })


POWER_Q = {p[0]: p[3] for p in POWERS}
POWER_NAME = {p[0]: p[1] for p in POWERS}

if __name__ == "__main__":
    main()
