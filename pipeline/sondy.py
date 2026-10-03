"""Sondy na cestě ze Sluneční soustavy → public/data/sondy.json (+ záznam „sondy“ v obrazky.json a manifestu).

Sondy: Pioneer 10, Pioneer 11, Voyager 1, Voyager 2, New Horizons – všech pět, které míří ze Sluneční soustavy
a mají trajektorii v JPL Horizons.

Zdroje:
  dráhy     – JPL Horizons API, heliocentrické vektory (střed 500@10), ekliptika J2000, krok STEP dní, od začátku
              trajektorie v Horizons do jejího konce (Pioneery a New Horizons 2050, Voyagery 2100 – předpověď)
  události  – časové osy ze záhlaví objektů v Horizons (stažené 3. 10. 2026), přeložené; nic dalšího se nepřidává
  obrázky   – Wikidata (P18 + české štítky a články) přes odkaz na anglickou Wikipedii; jen odkazy, ne soubory

Dráha se zjednoduší (Ramer–Douglas–Peucker, odchylka do TOL au, nejvýš MAX_GAP dní mezi body), aby šla kreslit
a poloha k datu se dala lineárně dopočítat. Za koncem efemeridy aplikace dráhu jen prodlužuje přímkou podle poslední
rychlosti (bez gravitace Slunce a hvězd) – to je orientační, v kartě to stojí.

Použití:  python sondy.py        (~5 dotazů Horizons + 1 SPARQL, pod minutu; cache v raw/jpl a raw/wikidata)
"""
from __future__ import annotations

import json
import math
import time
import urllib.error
import urllib.parse
import urllib.request

import numpy as np
from astropy import units as u
from astropy.coordinates import SkyCoord

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json

HORIZONS = "https://ssd.jpl.nasa.gov/api/horizons.api"
SPARQL = "https://query.wikidata.org/sparql"
UA = "GalaxieMapa/0.1 (https://github.com/azuregroove/galaxie)"
AU_KM = 149597870.7
LY_AU = 63241.077
OBLIQUITY_DEG = 23.4392911  # sklon ekliptiky J2000 (IAU 1976), stejný jako v Horizons
STEP = 5
TOL = 0.01
MAX_GAP = 365
TODAY = "2026-10-03"

# id v Horizons, konec efemeridy (z chybové hlášky Horizons 3. 10. 2026), anglický článek pro Wikidata
SONDY = [
    {"id": "-23", "jmeno": "Pioneer 10", "konec": "2049-12-31", "enwiki": "Pioneer 10", "barva": "#e6b35a",
     "start": "1972-03-03 01:49 UTC", "hmotnost_kg": 258,
     "udalosti": [
         ["1972-03-03", "start"],
         ["1973-12-04", "největší přiblížení k Jupiteru, asi 2,8 poloměru Jupiteru (≈ 200 000 km) – první sonda u Jupiteru"],
         ["2002-03-03", "poslední plně úspěšný příjem signálu"],
     ],
     "pozn": "První sonda vyslaná k vnějším planetám. Trajektorie je podle JPL vhodná pro historické účely, ne pro přesné výpočty."},
    {"id": "-24", "jmeno": "Pioneer 11", "konec": "2049-12-31", "enwiki": "Pioneer 11", "barva": "#d98a4e",
     "start": "1973-04-06 02:11 UTC", "hmotnost_kg": 259,
     "udalosti": [
         ["1973-04-06", "start"],
         ["1974-12-03", "Jupiter, 42 000 km nad oblačností"],
         ["1979-09-01", "Saturn, 21 000 km nad oblačností – první sonda u Saturnu"],
         ["1995-09-30", "konec vědeckého provozu a denní telemetrie (radioizotopové zdroje už nedávaly dost energie)"],
     ],
     "pozn": "Trajektorie je podle JPL vhodná pro historické účely, ne pro přesné výpočty."},
    {"id": "-31", "jmeno": "Voyager 1", "konec": "2099-12-31", "enwiki": "Voyager 1", "barva": "#7fc8ff",
     "start": "1977-09-05", "hmotnost_kg": None,
     "udalosti": [
         ["1977-09-05", "start z Kennedyho vesmírného střediska (záhlaví Horizons uvádí 6. 9. ve 12:56 UTC, "
                        "efemerida ale začíná už 5. 9.)"],
         ["1979-03-05", "největší přiblížení k Jupiteru, snímky Io"],
         ["1980-11-12", "Saturn a Titan"],
         ["1990-01-01", "začátek mezihvězdné mise"],
         ["1990-02-14", "poslední snímky z Voyageru"],
         ["1992-04-24", "poslední obousměrná měření dráhy (od té doby je poloha předpověď)"],
         ["1998-02-17", "předstihl Pioneer 10 – nejvzdálenější předmět vyrobený člověkem"],
         ["2004-12-15", "prošel rázovou vlnou na hranici sluneční soustavy (v Horizons „bow shock“)"],
         ["2012-08-25", "prošel heliopauzou"],
     ],
     "pozn": "Dráha do roku 2100 je předpověď JPL z roku 2022 (R. Jacobson, DE440) z měření z let 1981–1992."},
    {"id": "-32", "jmeno": "Voyager 2", "konec": "2099-12-31", "enwiki": "Voyager 2", "barva": "#9be0b0",
     "start": "1977-08-20 14:29 UTC", "hmotnost_kg": None,
     "udalosti": [
         ["1977-08-20", "start z Kennedyho vesmírného střediska"],
         ["1978-06", "selhal hlavní přijímač, zbytek mise na záložním"],
         ["1979-07-09", "největší přiblížení k Jupiteru"],
         ["1981-08-25", "Saturn"],
         ["1986-01-24", "Uran – jediný průlet kolem Uranu"],
         ["1987", "pozoruje supernovu SN 1987A"],
         ["1989-08-25", "Neptun – jediný průlet kolem Neptunu; pak míří pod rovinu ekliptiky"],
         ["1992-07-17", "poslední měření dráhy transpondérem"],
         ["2007-09-05", "prošel rázovou vlnou na hranici sluneční soustavy (v Horizons „bow shock“)"],
         ["2012-08-13", "nejdéle fungující sonda"],
         ["2018-11-15", "prošel heliopauzou, vstoupil do mezihvězdného prostoru (datum podle Horizons)"],
     ],
     "pozn": "Dráha do roku 2100 je předpověď JPL z roku 2022 (R. Jacobson, DE440) z měření z let 1989–1992."},
    {"id": "-98", "jmeno": "New Horizons", "konec": "2049-12-31", "enwiki": "New Horizons", "barva": "#c9a2ff",
     "start": "2006-01-19", "hmotnost_kg": 465,
     "udalosti": [
         ["2006-01-19", "start (Atlas V 551)"],
         ["2006-06-13", "planetka 2002 JF56 na 102 000 km"],
         ["2007-02-28", "gravitační manévr u Jupiteru (2,3 mil. km)"],
         ["2015-07-14", "Pluto a Charon – první průlet kolem Pluta"],
         ["2019-01-01", "Arrokoth (2014 MU69), 3 500 km od středu"],
     ],
     "pozn": "Dráha z navigace mise (KinetX), měření do 20. 7. 2026; dál předpověď."},
]


def get(url: str, cache: str, data: bytes | None = None) -> str:
    p = RAW_DIR / cache
    if p.exists() and p.stat().st_size > 0:
        return p.read_text(encoding="utf-8")
    print(f"  stahuji {url[:100]}")
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                text = r.read().decode("utf-8")
            break
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == 5:
                raise
            print("  limit dotazů (429), čekám 70 s")
            time.sleep(70)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    return text


def vectors(cmd: str, start: str, stop: str, step: str) -> np.ndarray:
    """Řádky [JD TDB, x, y, z (au), vx, vy, vz (au/den)] – heliocentrická ekliptika J2000."""
    q = urllib.parse.urlencode({
        "format": "text", "COMMAND": f"'{cmd}'", "OBJ_DATA": "NO", "MAKE_EPHEM": "YES", "EPHEM_TYPE": "VECTORS",
        "CENTER": "'500@10'", "REF_PLANE": "ECLIPTIC", "REF_SYSTEM": "ICRF", "OUT_UNITS": "AU-D",
        "VEC_TABLE": "2", "CSV_FORMAT": "YES", "VEC_LABELS": "NO",
        "START_TIME": f"'{start}'", "STOP_TIME": f"'{stop}'", "STEP_SIZE": f"'{step}'",
    })
    t = get(f"{HORIZONS}?{q}", f"jpl/sonda_{cmd}_{start}_{stop}_{step}.txt".replace(":", ""))
    if "$$SOE" not in t:
        raise SystemExit(f"Horizons {cmd}: {t[:600]}")
    body = t.split("$$SOE")[1].split("$$EOE")[0]
    rows = []
    for ln in body.strip().splitlines():
        c = [x.strip() for x in ln.split(",")]
        rows.append([float(c[0])] + [float(x) for x in c[2:8]])
    return np.array(rows)


def first_epoch(cmd: str) -> str:
    """Začátek efemeridy z chybové hlášky Horizons („No ephemeris … prior to A.D. 1977-SEP-05 13:59:24.3830 TDB“)."""
    q = urllib.parse.urlencode({"format": "text", "COMMAND": f"'{cmd}'", "OBJ_DATA": "NO", "MAKE_EPHEM": "YES",
                                "EPHEM_TYPE": "VECTORS", "CENTER": "'500@10'", "START_TIME": "'1950-01-01'",
                                "STOP_TIME": "'2200-01-01'", "STEP_SIZE": "'10y'"})
    t = get(f"{HORIZONS}?{q}", f"jpl/sonda_{cmd}_rozsah.txt")
    import re
    m = re.search(r"prior to A\.D\. (\d{4}-[A-Z]{3}-\d{2} \d{2}:\d{2})", t)
    if not m:
        raise SystemExit(f"Horizons {cmd}: začátek efemeridy nenalezen: {t[:400]}")
    # o hodinu později, ať první krok spolehlivě leží v rozsahu
    from datetime import datetime, timedelta
    d = datetime.strptime(m.group(1).title(), "%Y-%b-%d %H:%M") + timedelta(hours=1)
    return d.strftime("%Y-%m-%d %H:%M")


def rdp(pts: np.ndarray, tol: float) -> list[int]:
    """Indexy bodů polylinie, které zůstanou (Ramer–Douglas–Peucker, iterativně)."""
    keep = np.zeros(len(pts), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        a, b = pts[i], pts[j]
        ab = b - a
        L = np.linalg.norm(ab)
        seg = pts[i + 1:j] - a
        if L == 0:
            d = np.linalg.norm(seg, axis=1)
        else:
            d = np.linalg.norm(np.cross(seg, ab / L), axis=1)
        k = int(np.argmax(d))
        if d[k] > tol:
            m = i + 1 + k
            keep[m] = True
            stack += [(i, m), (m, j)]
    return list(np.nonzero(keep)[0])


def ecl_to_gal(v: np.ndarray) -> np.ndarray:
    """Vektory v ekliptice J2000 → galaktické (x k centru, y ke l = 90°, z k severnímu pólu)."""
    e = math.radians(OBLIQUITY_DEG)
    rx = np.array([[1, 0, 0], [0, math.cos(e), -math.sin(e)], [0, math.sin(e), math.cos(e)]])
    eq = v @ rx.T
    # sloupce matice = obrazy os ICRS (RA/Dec 0/0, 90/0, pól) v galaktických souřadnicích
    g = SkyCoord(ra=[0, 90, 0] * u.deg, dec=[0, 0, 90] * u.deg, frame="icrs").galactic.cartesian
    m = np.stack([g.x.value, g.y.value, g.z.value], axis=0)
    return eq @ m.T


def wikidata() -> dict[str, list]:
    titles = " ".join(f'"{s["enwiki"]}"@en' for s in SONDY)
    q = f"""SELECT ?t ?item ?img ?cs ?csw WHERE {{
      VALUES ?t {{ {titles} }}
      ?a schema:about ?item; schema:isPartOf <https://en.wikipedia.org/>; schema:name ?t.
      OPTIONAL {{ ?item wdt:P18 ?img }}
      OPTIONAL {{ ?item rdfs:label ?cs FILTER(lang(?cs) = "cs") }}
      OPTIONAL {{ ?c schema:about ?item; schema:isPartOf <https://cs.wikipedia.org/>; schema:name ?csw }}
    }}"""
    d = json.loads(get(f"{SPARQL}?{urllib.parse.urlencode({'query': q, 'format': 'json'})}", "wikidata/sondy.json"))
    out: dict[str, list] = {}
    for b in d["results"]["bindings"]:
        t = b["t"]["value"]
        if t in out:
            continue
        img = b.get("img", {}).get("value")
        file = urllib.parse.unquote(img.rsplit("/", 1)[1]).replace("_", " ") if img else None
        out[t] = [b["item"]["value"].rsplit("/", 1)[1], file, b.get("cs", {}).get("value"),
                  b.get("csw", {}).get("value"), t]
    return out


def main() -> None:
    out = []
    for s in SONDY:
        t0 = first_epoch(s["id"])
        v = vectors(s["id"], t0, s["konec"], f"{STEP} d")
        now = vectors(s["id"], TODAY, f"{TODAY} 00:01", "1 d")[0]
        last = v[-1]
        pos = v[:, 1:4]
        idx = rdp(pos, TOL)
        # body i po časové ose, ať jde polohu k datu dopočítat lineárně
        full = []
        for a, b in zip(idx, idx[1:]):
            full.append(a)
            gap = v[b, 0] - v[a, 0]
            if gap > MAX_GAP:
                n = int(gap // MAX_GAP)
                full += [a + (b - a) * k // (n + 1) for k in range(1, n + 1)]
        full.append(idx[-1])
        full = sorted(set(full))
        r_now = float(np.linalg.norm(now[1:4]))
        v_now = float(np.linalg.norm(now[4:7])) * AU_KM / 86400
        v_end = last[4:7]
        g_now, g_dir = ecl_to_gal(np.array([now[1:4], v_end / np.linalg.norm(v_end)]))
        lgal = math.degrees(math.atan2(g_dir[1], g_dir[0])) % 360
        bgal = math.degrees(math.asin(g_dir[2]))
        print(f"{s['jmeno']}: {len(v)} bodů → {len(full)}, dnes {r_now:.1f} au, {v_now:.2f} km/s, "
              f"směr l {lgal:.1f}°, b {bgal:+.1f}°")
        out.append({
            "jmeno": s["jmeno"], "horizons": s["id"], "barva": s["barva"], "start": s["start"],
            "hmotnost_kg": s["hmotnost_kg"], "pozn": s["pozn"],
            "udalosti": [e for e in s["udalosti"]],
            "drah": {"jd": [round(float(v[i, 0]), 2) for i in full],
                     "xyz": [[round(float(c), 4) for c in v[i, 1:4]] for i in full]},
            "konec_jd": round(float(last[0]), 2),
            # rychlost na konci efemeridy pro prodloužení přímkou (au/den, ekliptika J2000)
            "v_konec": [float(c) for c in last[4:7]],
            "dnes": {"datum": TODAY, "r_au": round(r_now, 3), "v_kms": round(v_now, 3),
                     "xyz_gal_au": [round(float(c), 3) for c in g_now]},
            "smer_gal": {"l": round(lgal, 2), "b": round(bgal, 2), "v_kms": round(float(np.linalg.norm(v_end)) * AU_KM / 86400, 3)},
        })
    size = write_json(DATA_DIR / "sondy.json", {"schema": 1, "stazeno": now_iso(), "sondy": out})
    print(f"sondy.json {size / 1e3:.0f} kB")

    wd = wikidata()
    for s in SONDY:
        print(f"  Wikidata {s['jmeno']}: {wd.get(s['enwiki'])}")
    p = DATA_DIR / "obrazky.json"
    img = json.loads(p.read_text(encoding="utf-8"))
    img["vrstvy"]["sondy"] = {s["jmeno"]: wd[s["enwiki"]] for s in SONDY if s["enwiki"] in wd}
    p.write_text(json.dumps(img, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    update_manifest({
        "id": "sondy", "soubor": "sondy.json", "nazev": "Sondy mířící ze Sluneční soustavy",
        "zdroj": "NASA/JPL Horizons (trajektorie a časové osy misí)", "url": "https://ssd.jpl.nasa.gov/horizons/",
        "licence": "Data JPL SSD jsou podle JPL bez omezení (J. Giorgini, JPL SSD, e-mail 2. 10. 2026); dodržovat fair-use API",
        "stazeno": now_iso(), "objektu": len(out),
        "poznamka": "Za koncem efemeridy (2050, u Voyagerů 2100) je dráha jen přímka podle poslední rychlosti – orientačně.",
        "vyrez": False,
    })


if __name__ == "__main__":
    main()
