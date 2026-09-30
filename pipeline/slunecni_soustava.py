"""Sluneční soustava pro pohled Soustava -> public/data/slunecni-soustava.json

Zdroje (vše JPL Solar System Dynamics, https://ssd.jpl.nasa.gov/):
  planety      – Keplerovské elementy a jejich změny, tabulka 1 (1800–2050), Standish:
                 https://ssd.jpl.nasa.gov/planets/approx_pos.html
  poloměry     – https://ssd.jpl.nasa.gov/planets/phys_par.html (střední poloměr),
                 Slunce a Pluto z Horizons (fyzikální data těles 10 a 999)
  trpasl. pl.  – SBDB API (oskulační elementy, plná přesnost), průměr Ceres ze SBDB
  měsíce       – střední elementy https://ssd.jpl.nasa.gov/sats/elem/ a poloměry https://ssd.jpl.nasa.gov/sats/phys_par/;
                 dráhy a polohy měsíců: Horizons, oskulační elementy ke dvěma epochám (2026 a 2027) vůči ekliptice J2000,
                 z rozdílu střední pohyb a stáčení uzlu; tabulka slouží jen jako záloha a pro periodu

Vše se převádí do heliocentrické ekliptiky J2000. U měsíců se ukládá matice z jejich referenční roviny do ekliptiky.
Použití:  python slunecni_soustava.py        (~1 MB stahování, pod minutu)
"""
from __future__ import annotations

import html
import json
import math
import re
import time
import urllib.parse
import urllib.request

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json

SSD = "https://ssd.jpl.nasa.gov"
SBDB = "https://ssd-api.jpl.nasa.gov/sbdb.api"
HORIZONS = "https://ssd.jpl.nasa.gov/api/horizons.api"
JD_J2000 = 2451545.0
# sklon ekliptiky J2000 (IAU 1976), stejný jako v Horizons pro převod ICRF -> ekliptika
OBLIQUITY_DEG = 23.4392911

PLANETY_CZ = {"Mercury": "Merkur", "Venus": "Venuše", "EM Bary": "Země", "Mars": "Mars", "Jupiter": "Jupiter",
              "Saturn": "Saturn", "Uranus": "Uran", "Neptune": "Neptun"}
PHYS_NAME = {"EM Bary": "Earth"}
TRPASLICI = [("1", "Ceres"), ("134340", "Pluto"), ("136199", "Eris"), ("136108", "Haumea"), ("136472", "Makemake")]
PLANET_OF_MOONS = {"Earth": "Země", "Mars": "Mars", "Jupiter": "Jupiter", "Saturn": "Saturn", "Uranus": "Uran",
                   "Neptune": "Neptun", "Pluto": "Pluto"}
HORIZONS_CENTER = {"Uranus": "500@799", "Pluto": "500@999", "Neptune": "500@899", "Saturn": "500@699",
                   "Jupiter": "500@599", "Mars": "500@499", "Earth": "500@399"}
# Česká jména jen tam, kde se v češtině ustálila; ostatní měsíce mají mezinárodní jméno.
MESICE_CZ = {"Moon": "Měsíc", "Ganymede": "Ganymed", "Callisto": "Kallisto", "Nereid": "Nereida"}


def get(url: str, cache: str | None = None) -> str:
    if cache:
        p = RAW_DIR / "jpl" / cache
        if p.exists() and p.stat().st_size > 0:
            return p.read_text(encoding="utf-8")
    print(f"  stahuji {url[:110]}")
    with urllib.request.urlopen(url, timeout=120) as r:
        text = r.read().decode("utf-8")
    if cache:
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(text, encoding="utf-8")
    return text


def table_rows(page: str) -> list[list[str]]:
    rows = []
    for r in re.findall(r"<tr[^>]*>(.*?)</tr>", page, re.S):
        cells = [re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", c))).strip()
                 for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", r, re.S)]
        rows.append(cells)
    return rows


def num(s: str) -> float | None:
    """První číslo z buňky („2439.4 [D] ±0.1“ -> 2439.4); '-' a prázdné -> None."""
    m = re.match(r"\s*([-+]?\d+(?:\.\d*)?(?:[eE][-+]?\d+)?)", s or "")
    return float(m.group(1)) if m else None


def jd_from_iso(s: str) -> float:
    """'2000-01-01.5' nebo '2020-01-01.0' -> JD (TDB)."""
    y, mo, d = s.split("-")
    y, mo, day = int(y), int(mo), float(d)
    if mo <= 2:
        y, mo = y - 1, mo + 12
    a = y // 100
    b = 2 - a + a // 4
    return math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (mo + 1)) + day + b - 1524.5


# ---------- planety ----------
def planets() -> list[dict]:
    page = get(f"{SSD}/planets/approx_pos.html", "approx_pos.html")
    text = html.unescape(re.sub(r"<[^>]+>", " ", page))
    t1 = text[text.find("Table 1"):text.find("Table 2")]
    names = list(PLANETY_CZ)
    out = []
    for name in names:
        m = re.search(re.escape(name) + r"\s+" + r"\s+".join([r"([-+]?\d+\.\d+)"] * 12), t1)
        if not m:
            raise SystemExit(f"Tabulka 1: nenalezena planeta {name}")
        v = [float(x) for x in m.groups()]
        a, e, i, L, varpi, om = v[:6]
        da, de, di, dL, dvarpi, dom = v[6:]
        cy = 36525.0
        out.append({
            "jmeno": PLANETY_CZ[name], "en": "Earth" if name == "EM Bary" else name, "druh": "planeta",
            "epocha": JD_J2000,
            "a": a, "e": e, "i": i, "om": om, "w": varpi - om, "m0": L - varpi,
            # změny za den; střední pohyb = dL - dϖ
            "da": da / cy, "de": de / cy, "di": di / cy, "dom": dom / cy, "dw": (dvarpi - dom) / cy,
            "n": (dL - dvarpi) / cy,
            "zdroj": "JPL, Keplerovské elementy pro přibližné polohy planet, tab. 1 (1800–2050)",
        })
    phys = table_rows(get(f"{SSD}/planets/phys_par.html", "planets_phys_par.html"))
    radius = {r[0]: num(r[2]) for r in phys if len(r) > 3}
    for p in out:
        p["r_km"] = radius.get(PHYS_NAME.get(p["en"], p["en"]), radius.get(p["en"]))
        if p["r_km"] is None:
            raise SystemExit(f"phys_par: chybí poloměr {p['en']}")
    return out


def horizons_radius(cmd: str) -> float | None:
    q = urllib.parse.urlencode({"format": "text", "COMMAND": f"'{cmd}'", "OBJ_DATA": "YES", "MAKE_EPHEM": "NO"})
    t = get(f"{HORIZONS}?{q}", f"horizons_obj_{cmd}.txt")
    m = re.search(r"Vol\.? [Mm]ean [Rr]adius[^=]*=\s*([\d.]+)", t)
    return float(m.group(1)) if m else None


# ---------- trpasličí planety ----------
def dwarfs() -> list[dict]:
    out = []
    for sstr, cz in TRPASLICI:
        d = json.loads(get(f"{SBDB}?{urllib.parse.urlencode({'sstr': sstr, 'phys-par': 1, 'full-prec': 1})}", f"sbdb_{sstr}.json"))
        o = d["orbit"]
        el = {e["name"]: float(e["value"]) for e in o["elements"] if e.get("value") not in (None, "")}
        if o.get("equinox") != "J2000":
            raise SystemExit(f"{cz}: neočekávaný rámec {o.get('equinox')}")
        diam = next((float(p["value"]) for p in d.get("phys_par", []) if p["name"] == "diameter"), None)
        r_km = diam / 2 if diam else None
        rsrc = "SBDB" if diam else None
        if r_km is None and cz == "Pluto":
            r_km = horizons_radius("999")
            rsrc = "Horizons" if r_km else None
        out.append({
            "jmeno": cz, "en": d["object"]["fullname"], "druh": "trpaslici",
            "epocha": float(o["epoch"]), "a": el["a"], "e": el["e"], "i": el["i"], "om": el["om"], "w": el["w"],
            "m0": el["ma"], "n": el["n"], "r_km": r_km,
            "zdroj": f"JPL SBDB, oskulační elementy (řešení {o.get('orbit_id', '?')})"
                     + (f"; poloměr {rsrc}" if rsrc else "; poloměr v JPL neuveden"),
        })
        time.sleep(0.3)
    return out


# ---------- měsíce ----------
def laplace_matrix(ra_deg: float, dec_deg: float) -> list[float]:
    """Z roviny s pólem (RA, Dec) v ICRF do ekliptiky J2000. Osa x = uzel roviny na rovníku ICRF."""
    a, d = math.radians(ra_deg), math.radians(dec_deg)
    p = (math.cos(d) * math.cos(a), math.cos(d) * math.sin(a), math.sin(d))
    n = (-math.sin(a), math.cos(a), 0.0)
    q = (p[1] * n[2] - p[2] * n[1], p[2] * n[0] - p[0] * n[2], p[0] * n[1] - p[1] * n[0])
    eps = math.radians(OBLIQUITY_DEG)
    ce, se = math.cos(eps), math.sin(eps)
    rows = []
    for v in (n, q, p):  # sloupce v ICRF -> do ekliptiky
        rows.append((v[0], ce * v[1] + se * v[2], -se * v[1] + ce * v[2]))
    # uložené po řádcích (M[r][c]), sloupce = obrazy os x, y, z
    return [round(rows[c][r], 9) for r in range(3) for c in range(3)]


IDENT = [1, 0, 0, 0, 1, 0, 0, 0, 1]


# Elementy měsíců: oskulační z Horizons ke dvěma epochám rok od sebe. Z rozdílu se určí skutečný střední pohyb
# a stáčení uzlu. Samotné tabulkové elementy JPL jsme proti Horizons ověřili jen zčásti (Saturnovy měsíce nesedí ani
# k epoše) a sloupec periody je u některých měsíců siderický, u jiných anomalistický.
EP_MOONS = 2461041.5  # 2026-01-01.0 TDB
DT_MOONS = 365.0
# krátký interval: z něj je počet oběhů jednoznačný i u měsíců s periodou pod den
DT_SHORT = 10.0


def horizons_three(code: str, planet: str) -> list[dict] | None:
    q = urllib.parse.urlencode({
        "format": "text", "COMMAND": f"'{code}'", "EPHEM_TYPE": "ELEMENTS", "CENTER": f"'{HORIZONS_CENTER[planet]}'",
        "TLIST": f"'{EP_MOONS}' '{EP_MOONS + DT_SHORT}' '{EP_MOONS + DT_MOONS}'", "REF_PLANE": "'ECLIPTIC'", "REF_SYSTEM": "'J2000'",
        "OUT_UNITS": "'KM-D'", "CSV_FORMAT": "'YES'", "TIME_TYPE": "'TDB'", "OBJ_DATA": "'NO'",
    })
    t = get(f"{HORIZONS}?{q}", f"horizons_el3_{code}.txt")
    if "$$SOE" not in t:
        return None
    out = []
    for ln in t[t.find("$$SOE") + 5:t.find("$$EOE")].strip().splitlines():
        f = [x.strip() for x in ln.split(",")]
        # JDTDB, Calendar, EC, QR, IN, OM, W, Tp, N, MA, TA, A, AD, PR
        out.append({"epocha": float(f[0]), "e": float(f[2]), "i": float(f[4]), "om": float(f[5]), "w": float(f[6]),
                    "m0": float(f[9]), "a": float(f[11])})
    return out if len(out) == 3 else None


def fit_three(rs: list[dict], p_approx: float) -> dict:
    a, s, b = rs
    wrap = lambda x: (x + 180) % 360 - 180
    du_s = wrap((s["w"] + s["m0"]) - (a["w"] + a["m0"])) % 360
    du = wrap((b["w"] + b["m0"]) - (a["w"] + a["m0"])) % 360
    # počet oběhů za 10 dní z přibližné periody (tabulka), z toho rychlost, z ní počet oběhů za rok
    rate = (360 * round((DT_SHORT * 360 / p_approx - du_s) / 360) + du_s) / DT_SHORT
    turns = round((DT_MOONS * rate - du) / 360)
    el = dict(a)
    el["n"] = (360 * turns + du) / DT_MOONS
    el["dom"] = wrap(b["om"] - a["om"]) / DT_MOONS
    el["dw"] = 0.0
    return el


def moons() -> list[dict]:
    rows = [r for r in table_rows(get(f"{SSD}/sats/elem/", "sats_elem.html")) if len(r) >= 18 and r[0].isdigit()]
    phys = table_rows(get(f"{SSD}/sats/phys_par/", "sats_phys_par.html"))
    radius = {}
    for r in phys:
        if len(r) >= 5 and r[0] in PLANET_OF_MOONS and num(r[4]) is not None:
            radius[(r[0], r[1])] = num(r[4])
    # Rovníkové měsíce Uranu: tabulka pól neuvádí; sklony ~0° odpovídají pólu Laplaceovy roviny vnitřních měsíců.
    eq_pole = {}
    for r in rows:
        if r[5] == "Laplace" and r[1] not in eq_pole and num(r[16]) is not None:
            eq_pole[r[1]] = (num(r[16]), num(r[17]))
    seen, out = set(), []
    for k, r in enumerate(rows):
        (_, planet, name, code, eph, frame, epoch, a_km, e, w, M, i, node, P, _pap, _pno, ra, dec, *_rest) = r
        if (planet, name) in seen:  # tabulka má některé měsíce dvakrát (Puck), bereme první řádek
            continue
        seen.add((planet, name))
        per = num(P)
        if not per:
            print(f"  přeskakuji {name}: chybí perioda")
            continue
        if k % 50 == 0:
            print(f"  měsíce {k}/{len(rows)}", flush=True)
        m = {"jmeno": MESICE_CZ.get(name, name), "en": name, "druh": "mesic", "planeta": PLANET_OF_MOONS[planet],
             "kod": code, "r_km": radius.get((planet, name)), "M": IDENT}
        rs = None
        try:
            rs = horizons_three(code, planet)
        except Exception as ex:  # síť nebo neznámé těleso
            print(f"  {name}: Horizons selhal ({ex})")
        if rs:
            m.update(fit_three(rs, per))
            m["zdroj"] = "JPL Horizons, oskulační elementy 2026-01-01, 2026-01-11 a 2027-01-01 (vůči ekliptice J2000)"
            m["presnost"] = "horizons"
            time.sleep(0.15)
        else:
            m.update({"epocha": jd_from_iso(epoch), "a": num(a_km), "e": num(e), "w": num(w), "m0": num(M),
                      "i": num(i), "om": num(node), "n": 360.0 / per, "dom": 0.0, "dw": 0.0})
            m["zdroj"] = f"JPL, střední elementy měsíců ({eph}, rámec {frame}) – Horizons těleso nezná, poloha méně přesná"
            m["presnost"] = "tabulka"
            # rovina dráhy z pólu referenční roviny sedí s Horizons do ~0,3°, fáze na dráze ne (viz výše)
            if frame == "Laplace" and num(ra) is not None:
                m["M"] = laplace_matrix(num(ra), num(dec))
            elif frame == "equatorial" and planet in eq_pole:
                m["M"] = laplace_matrix(*eq_pole[planet])
            elif frame != "ecliptic":
                m["zdroj"] += ", rovina dráhy neznámá (kreslena v ekliptice)"
        out.append(m)
    return out


def main():
    print("Planety …")
    pl = planets()
    print("Trpasličí planety …")
    dw = dwarfs()
    print("Měsíce …")
    mo = moons()
    sun_r = horizons_radius("10")
    stazeno = now_iso()
    out = {
        "schema": 1, "katalog": "slunecni-soustava", "stazeno": stazeno,
        "epocha_mesicu": EP_MOONS,
        "jednotky": {"a_planety": "au", "a_mesice": "km", "uhly": "deg", "n": "deg/den", "zmeny": "za den",
                     "epocha": "JD TDB", "r_km": "km"},
        "platnost": [1800, 2050],
        "slunce": {"jmeno": "Slunce", "r_km": sun_r},
        "planety": pl, "trpaslici": dw, "mesice": mo,
    }
    path = DATA_DIR / "slunecni-soustava.json"
    size = write_json(path, out)
    n_r = sum(1 for m in mo if m["r_km"])
    print(f"Hotovo: {len(pl)} planet, {len(dw)} trpasličích planet, {len(mo)} měsíců ({n_r} s poloměrem) "
          f"-> {path} ({size / 1024:.0f} kB)")
    update_manifest({
        "id": "slunecni-soustava", "soubor": path.name, "nazev": "Sluneční soustava (planety, trpasličí planety, měsíce)",
        "zdroj": "NASA/JPL Solar System Dynamics: přibližné polohy planet (Standish), SBDB, střední elementy "
                 "a fyzikální parametry měsíců, Horizons",
        "url": "https://ssd.jpl.nasa.gov/",
        "licence": "Obsah JPL SSD – podle FAQ webu je k převzetí potřeba svolení JPL (vyřídit před zveřejněním)",
        "poznamka": "Polohy přibližné: planety podle Standishe (1800–2050), měsíce ze středních elementů.",
        "objektu": len(pl) + len(dw) + len(mo), "platnost": [1800, 2050], "stazeno": stazeno,
    })


if __name__ == "__main__":
    main()
