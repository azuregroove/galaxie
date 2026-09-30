"""Planetky a komety – vzorek pro pohled Sluneční soustava -> public/data/mala-telesa.json

Zdroj: NASA/JPL Small-Body Database, SBDB Query API (https://ssd-api.jpl.nasa.gov/doc/sbdb_query.html),
oskulační heliocentrické elementy vůči ekliptice J2000 v plné přesnosti.

Vzorek („nejjasnější“ po skupinách – podle samotné absolutní magnitudy H by vyšla skoro jen transneptunická tělesa):
  hlavní pás a okolí (MBA, IMB, OMB, MCA, AST)   H <= 11
  trojáni Jupiteru (TJN)                         H <= 11
  blízkozemní (NEO)                              H <= 17,75 (zhruba průměr nad 1 km)
  kentauři (CEN)                                 H <= 10
  transneptunická tělesa (TNO)                   H <= 5,5
  komety                                         všechny číslované (bez úlomků) + vybrané slavné
  navíc cíle sond a známá tělesa (EXTRA)
Trpasličí planety (Ceres, Pluto, Eris, Haumea, Makemake) jsou už v slunecni-soustava.json.

Tělesa s epochou dráhy starší než rok (hlavně komety) dostanou elementy z JPL Horizons k 1. 1. 2026.

Použití:  python mala_telesa.py            (~1 MB z SBDB + ~550 dotazů Horizons, ~5 min; cache v raw/jpl)
          python mala_telesa.py --overit   + porovnání poloh s JPL Horizons (~15 dotazů)
"""
from __future__ import annotations

import json
import math
import sys
import time
import urllib.parse
import urllib.request

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json

QUERY = "https://ssd-api.jpl.nasa.gov/sbdb_query.api"
SBDB = "https://ssd-api.jpl.nasa.gov/sbdb.api"
HORIZONS = "https://ssd.jpl.nasa.gov/api/horizons.api"
# Gaussova gravitační konstanta [rad/den] – střední pohyb, když ho SBDB neuvádí (hyperbolické dráhy)
K_GAUSS = 0.01720209895

FIELDS = ["spkid", "full_name", "pdes", "name", "prefix", "kind", "class", "neo", "pha", "epoch", "equinox",
          "e", "a", "q", "i", "om", "w", "ma", "tp", "n", "H", "M1", "diameter", "condition_code"]

SKUPINY = {
    "pas": "Hlavní pás a okolí",
    "neo": "Blízkozemní planetky",
    "trojan": "Trojáni Jupiteru",
    "kentaur": "Kentauři",
    "tno": "Transneptunická tělesa",
    "kometa": "Komety",
    "mezihvezdne": "Mezihvězdná tělesa",
}
PAS = ["MBA", "IMB", "OMB", "MCA", "AST"]
NEO = ["ATE", "APO", "AMO", "IEO"]

# (název výběru, parametry dotazu)
VYBERY = [
    ("pas", {"sb-kind": "a", "sb-class": ",".join(PAS), "sb-cdata": {"AND": ["H|LE|11"]}}),
    ("trojan", {"sb-kind": "a", "sb-class": "TJN", "sb-cdata": {"AND": ["H|LE|11"]}}),
    ("neo", {"sb-kind": "a", "sb-group": "neo", "sb-cdata": {"AND": ["H|LE|17.75"]}}),
    ("kentaur", {"sb-kind": "a", "sb-class": "CEN", "sb-cdata": {"AND": ["H|LE|10"]}}),
    ("tno", {"sb-kind": "a", "sb-class": "TNO", "sb-cdata": {"AND": ["H|LE|5.5"]}}),
    ("kometa", {"sb-kind": "c", "sb-ns": "n", "sb-xfrag": "1"}),
]
# Cíle sond a tělesa, na která se lidé ptají. Hledá se přes SBDB API (jednoznačné označení, ne jméno).
EXTRA = [
    "99942", "101955", "162173", "25143", "65803", "486958", "52246", "152830", "21", "2867", "951", "243", "253",
    "5535", "9969", "4179", "2024 YR4", "3200", "469219", "16", "3548", "15094", "11351", "21900", "617",
    "C/1995 O1", "C/2020 F3", "C/1996 B2", "C/2006 P1", "C/2023 A3", "C/2013 A1", "C/2011 L4", "C/1965 S1-A",
    "C/2012 S1", "C/1997 J2", "1I", "2I", "3I",
]
# Trpasličí planety jsou v datech Sluneční soustavy (pdes)
BEZ = {"1", "134340", "136199", "136108", "136472"}
# Běžně užívaná česká jména. Jen ustálená, ostatní mají mezinárodní jméno.
CZ = {"1P/Halley": "1P/Halley (Halleyova kometa)"}
# SBDB je vede pod označením komety nebo planetky; IAU jim dala označení „nI“
MEZIHVEZDNE = {"1I": "1I/ʻOumuamua", "2I": "2I/Borisov", "3I": "3I/ATLAS"}


def get_json(url: str, cache: str) -> dict:
    p = RAW_DIR / "jpl" / cache
    if p.exists() and p.stat().st_size > 0:
        return json.loads(p.read_text(encoding="utf-8"))
    print(f"  stahuji {url[:120]}")
    with urllib.request.urlopen(url, timeout=180) as r:
        text = r.read().decode("utf-8")
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    return json.loads(text)


def query(name: str, params: dict) -> list[dict]:
    q = {k: (json.dumps(v) if isinstance(v, dict) else v) for k, v in params.items()}
    q.update({"fields": ",".join(FIELDS), "full-prec": "1"})
    d = get_json(f"{QUERY}?{urllib.parse.urlencode(q)}", f"sbq_{name}.json")
    rows = [dict(zip(d["fields"], r)) for r in d["data"]]
    if len(rows) != int(d["count"]):
        raise SystemExit(f"{name}: vráceno {len(rows)} z {d['count']}")
    return rows


def extra(sstr: str) -> dict:
    """Jedno těleso přes SBDB API převedené na řádek ve tvaru Query API."""
    safe = sstr.replace("/", "_").replace(" ", "_")
    d = get_json(f"{SBDB}?{urllib.parse.urlencode({'sstr': sstr, 'phys-par': 1, 'full-prec': 1})}", f"sbdb_x_{safe}.json")
    if "object" not in d:
        raise SystemExit(f"SBDB nenašla jednoznačně {sstr}: {str(d)[:200]}")
    o, orb = d["object"], d["orbit"]
    el = {e["name"]: e["value"] for e in orb["elements"]}
    phys = {p["name"]: p["value"] for p in d.get("phys_par", [])}
    time.sleep(0.2)
    return {
        "spkid": o["spkid"], "full_name": o["fullname"], "pdes": o["des"], "name": o.get("shortname"),
        "prefix": o.get("prefix"), "kind": o["kind"], "class": o["orbit_class"]["code"],
        "neo": "Y" if o.get("neo") else "N", "pha": "Y" if o.get("pha") else "N",
        "epoch": orb["epoch"], "equinox": orb["equinox"],
        "e": el.get("e"), "a": el.get("a"), "q": el.get("q"), "i": el.get("i"), "om": el.get("om"), "w": el.get("w"),
        "ma": el.get("ma"), "tp": el.get("tp"), "n": el.get("n"),
        "H": phys.get("H"), "M1": phys.get("M1"), "diameter": phys.get("diameter"),
        "condition_code": orb.get("condition_code"), "iau": MEZIHVEZDNE.get(sstr),
    }


def f(x) -> float | None:
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


def group_of(r: dict) -> str:
    cls = r["class"]
    if r.get("iau"):
        return "mezihvezdne"
    if r["kind"].startswith("c"):
        return "kometa"
    if cls in NEO:
        return "neo"
    return {"TJN": "trojan", "CEN": "kentaur", "TNO": "tno"}.get(cls, "pas")


def display_name(r: dict) -> str:
    n = r["full_name"].strip()
    return r.get("iau") or CZ.get(n, n)


def elements(r: dict) -> dict | None:
    e, q, i, om, w, ep = (f(r[k]) for k in ("e", "q", "i", "om", "w", "epoch"))
    if None in (e, q, i, om, w, ep):
        return None
    a = f(r["a"])
    if a is None:
        if abs(1 - e) < 1e-9:
            return None  # parabola – v modelu neumíme
        a = q / (1 - e)
    n = f(r["n"])
    if n is None or e >= 1:
        n = math.degrees(K_GAUSS / abs(a) ** 1.5)
    ma = f(r["ma"])
    tp = f(r["tp"])
    if ma is None or e >= 1:
        if tp is None:
            return None
        ma = n * (ep - tp)  # u hyperboly „střední anomálie“ M = n (t − T)
    return {"a": a, "e": e, "i": i, "om": om, "w": w, "ep": ep, "m0": ma, "n": n}


# ---------- obnova starých drah přes Horizons ----------
# SBDB dává u komet dráhu k poslednímu průchodu přísluním (i desítky let zpět) a u některých planetek starou epochu.
# Dvoučásticová dráha se od epochy rozchází (Jupiter), proto u nich bereme oskulační elementy z Horizons k EP_NEW,
# kde je integrace s poruchami planet (a u komet s negravitačními silami, pokud je JPL má).
EP_NEW = 2461041.5  # 2026-01-01.0 TDB, stejně jako u měsíců
MAX_AGE = 365.0


def horizons_cmd(o: dict) -> str:
    # komety mají víc řešení (návraty) – CAP = poslední před dneškem, NOFRAG = hlavní jádro
    return f"DES={o['pdes']};CAP;NOFRAG;" if o["sk"] in ("kometa", "mezihvezdne") else f"DES={o['spk']};"


def horizons_get(cmd: str, params: dict, cache: str) -> str:
    p = RAW_DIR / "jpl" / cache
    if p.exists() and p.stat().st_size > 0:
        return p.read_text(encoding="utf-8")
    q = urllib.parse.urlencode({"format": "text", "COMMAND": f"'{cmd}'", "OBJ_DATA": "'NO'", "CSV_FORMAT": "'YES'",
                                "REF_PLANE": "'ECLIPTIC'", "REF_SYSTEM": "'J2000'", "CENTER": "'500@10'", **params})
    with urllib.request.urlopen(f"{HORIZONS}?{q}", timeout=120) as r:
        t = r.read().decode("utf-8")
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(t, encoding="utf-8")
    time.sleep(0.15)
    return t


def safe_name(cmd: str) -> str:
    return cmd.replace("/", "_").replace(" ", "_").replace(";", "").replace("=", "")


def refresh(o: dict) -> bool:
    cmd = horizons_cmd(o)
    t = horizons_get(cmd, {"EPHEM_TYPE": "'ELEMENTS'", "TLIST": f"'{EP_NEW}'", "OUT_UNITS": "'AU-D'",
                           "TIME_TYPE": "'TDB'"}, f"horizons_el_{safe_name(cmd)}.txt")
    if "$$SOE" not in t:
        return False
    c = [x.strip() for x in t[t.find("$$SOE") + 5:t.find("$$EOE")].strip().splitlines()[0].split(",")]
    # JDTDB, Calendar, EC, QR, IN, OM, W, Tp, N, MA, TA, A, AD, PR
    e, q, i, om, w, tp, n, ma, a = (float(c[k]) for k in (2, 3, 4, 5, 6, 7, 8, 9, 11))
    el = {"a": a, "e": e, "i": i, "om": om, "w": w, "ep": float(c[0]), "m0": ma, "n": n}
    if e >= 1:
        el["n"] = math.degrees(K_GAUSS / abs(a) ** 1.5)
        el["m0"] = el["n"] * (el["ep"] - tp)
    o["el"] = el
    return True


# ---------- kontrola proti Horizons ----------
def kepler_pos(el: dict, jd: float) -> tuple[float, float, float]:
    """Heliocentrická poloha v ekliptice J2000 [au] z dvoučásticových elementů (stejně jako aplikace)."""
    a, e = el["a"], el["e"]
    M = math.radians(el["m0"] + el["n"] * (jd - el["ep"]))
    if e < 1:
        M = math.remainder(M, 2 * math.pi)
        E = M if e < 0.8 else math.pi
        for _ in range(60):
            d = (E - e * math.sin(E) - M) / (1 - e * math.cos(E))
            E -= d
            if abs(d) < 1e-13:
                break
        x, y = a * (math.cos(E) - e), a * math.sqrt(1 - e * e) * math.sin(E)
    else:
        H = math.asinh(M / e)
        for _ in range(100):
            d = (e * math.sinh(H) - H - M) / (e * math.cosh(H) - 1)
            H -= d
            if abs(d) < 1e-13:
                break
        x, y = -a * (e - math.cosh(H)), -a * math.sqrt(e * e - 1) * math.sinh(H)
    w, om, inc = (math.radians(el[k]) for k in ("w", "om", "i"))
    xp, yp = x * math.cos(w) - y * math.sin(w), x * math.sin(w) + y * math.cos(w)
    return (xp * math.cos(om) - yp * math.cos(inc) * math.sin(om),
            xp * math.sin(om) + yp * math.cos(inc) * math.cos(om),
            yp * math.sin(inc))


def horizons_vec(cmd: str, jds: list[float]) -> list[tuple[float, float, float]] | None:
    t = horizons_get(cmd, {"EPHEM_TYPE": "'VECTORS'", "TLIST": " ".join(f"'{j}'" for j in jds), "OUT_UNITS": "'AU-D'",
                           "VEC_TABLE": "'1'"}, f"horizons_vec_{safe_name(cmd)}.txt")
    if "$$SOE" not in t:
        print(f"    Horizons {cmd}: nic nevrátil")
        return None
    out = []
    for ln in t[t.find("$$SOE") + 5:t.find("$$EOE")].strip().splitlines():
        c = [x.strip() for x in ln.split(",")]
        out.append((float(c[2]), float(c[3]), float(c[4])))
    return out


def overit(objs: list[dict]) -> None:
    # 1990, 2016, 30. 9. 2026, 2036, 2050 (JD TDB 0 h)
    jds = [2447892.5, 2457388.5, 2461313.5, 2464693.5, 2469807.5]
    names = ["433 Eros", "4 Vesta", "99942 Apophis", "101955 Bennu", "624 Hektor", "2060 Chiron",
             "486958 Arrokoth", "50000 Quaoar", "1P/Halley", "2P/Encke", "67P/Churyumov-Gerasimenko",
             "C/1995 O1 (Hale-Bopp)", "C/2025 N1 (ATLAS)", "C/2020 F3 (NEOWISE)"]
    print("Kontrola proti Horizons (heliocentrický směr ′ / vzdálenost ‰) pro roky 1990, 2016, 2026, 2036, 2050:")
    by = {o["full"]: o for o in objs}
    for nm in names:
        o = by.get(nm) or next((x for x in objs if x["full"].startswith(nm)), None)
        if not o:
            print(f"  {nm}: není ve vzorku")
            continue
        hv = horizons_vec(horizons_cmd(o), jds)
        if not hv:
            continue
        parts = []
        for jd, h in zip(jds, hv):
            k = kepler_pos(o["el"], jd)
            rk, rh = math.dist(k, (0, 0, 0)), math.dist(h, (0, 0, 0))
            cosang = sum(x * y for x, y in zip(k, h)) / (rk * rh)
            ang = math.degrees(math.acos(max(-1, min(1, cosang)))) * 60
            parts.append(f"{ang:7.1f}′/{abs(rk - rh) / rh * 1000:5.1f}‰")
        print(f"  {o['full'][:34]:34s} " + "  ".join(parts))


def main():
    print("Planetky a komety (JPL SBDB) …")
    rows: dict[str, tuple[str, dict]] = {}
    for name, params in VYBERY:
        rs = query(name, params)
        print(f"  {name}: {len(rs)}")
        for r in rs:
            rows.setdefault(r["spkid"], (name, r))
    n_extra = 0
    for s in EXTRA:
        r = extra(s)
        if r["spkid"] not in rows:
            rows[r["spkid"]] = ("extra", r)
            n_extra += 1
    print(f"  navíc (cíle sond, slavné komety): {n_extra} z {len(EXTRA)}")

    objs, skipped = [], []
    for spk, (vyber, r) in rows.items():
        if r["pdes"] in BEZ:
            continue
        if r.get("equinox") not in (None, "J2000"):
            raise SystemExit(f"{r['full_name']}: rámec {r['equinox']}")
        el = elements(r)
        if el is None:
            skipped.append(r["full_name"].strip())
            continue
        objs.append({"spk": spk, "full": r["full_name"].strip(), "jmeno": display_name(r), "pdes": r["pdes"], "sk": group_of(r), "cls": r["class"], "el": el,
                     "H": f(r["H"]), "M1": f(r["M1"]), "d": f(r["diameter"]), "pha": r["pha"] == "Y",
                     "u": r.get("condition_code"), "vyber": vyber})
    if skipped:
        print(f"  bez použitelných elementů: {len(skipped)} ({', '.join(skipped[:8])}…)")
    objs.sort(key=lambda o: (list(SKUPINY).index(o["sk"]), o["H"] if o["H"] is not None else (o["M1"] or 99)))

    old = [o for o in objs if abs(o["el"]["ep"] - EP_NEW) > MAX_AGE]
    print(f"  obnova drah se starou epochou přes Horizons: {len(old)} těles …")
    failed = []
    for k, o in enumerate(old):
        if k % 100 == 0:
            print(f"    {k}/{len(old)}", flush=True)
        try:
            ok = refresh(o)
        except Exception as ex:  # síť, neznámé těleso
            print(f"    {o['full']}: {ex}")
            ok = False
        o["zdroj"] = "horizons" if ok else "sbdb"
        if not ok:
            failed.append(o["full"])
    if failed:
        print(f"    Horizons nevrátil elementy u {len(failed)}: {', '.join(failed[:10])}")

    if "--overit" in sys.argv:
        overit(objs)

    rnd = lambda x, nd: None if x is None else round(x, nd)
    # Sloupcový formát: úhly na 1e-5° (~0,04″) a střední pohyb na 1e-10 °/den (chyba < 1e-5° za 250 let) stačí.
    cols = {
        "jmeno": [o["jmeno"] for o in objs],
        "skupina": [o["sk"] for o in objs],
        "trida": [o["cls"] for o in objs],
        "epocha": [o["el"]["ep"] for o in objs],
        "a": [rnd(o["el"]["a"], 8) for o in objs],
        "e": [rnd(o["el"]["e"], 8) for o in objs],
        "i": [rnd(o["el"]["i"], 5) for o in objs],
        "om": [rnd(o["el"]["om"], 5) for o in objs],
        "w": [rnd(o["el"]["w"], 5) for o in objs],
        "m0": [rnd(o["el"]["m0"], 5) for o in objs],
        "n": [rnd(o["el"]["n"], 10) for o in objs],
        "H": [rnd(o["H"], 2) for o in objs],
        "M1": [rnd(o["M1"], 1) for o in objs],
        "d_km": [rnd(o["d"], 1) for o in objs],
        "pha": [1 if o["pha"] else 0 for o in objs],
        "u": [o["u"] for o in objs],
        # h = elementy z Horizons k 1. 1. 2026 (SBDB měla starou epochu), jinak SBDB
        "zdroj": ["h" if o.get("zdroj") == "horizons" else "s" for o in objs],
    }
    stazeno = now_iso()
    counts = {k: sum(1 for o in objs if o["sk"] == k) for k in SKUPINY}
    out = {
        "schema": 1, "katalog": "mala-telesa", "stazeno": stazeno, "skupiny": SKUPINY, "pocty": counts,
        "vyber": {"pas": "H ≤ 11", "trojan": "H ≤ 11", "neo": "H ≤ 17,75 (průměr zhruba nad 1 km)",
                  "kentaur": "H ≤ 10", "tno": "H ≤ 5,5", "kometa": "všechny číslované bez úlomků",
                  "extra": "vybrané cíle sond a známé komety"},
        "jednotky": {"a": "au (u hyperbol záporné)", "uhly": "deg", "n": "deg/den", "epocha": "JD TDB",
                     "m0": "střední anomálie v epoše (u hyperbol n·(t−T))", "d_km": "km",
                     "zdroj": "s = SBDB, h = Horizons k 2026-01-01"},
        "sloupce": cols,
    }
    path = DATA_DIR / "mala-telesa.json"
    size = write_json(path, out)
    print("Hotovo: " + ", ".join(f"{SKUPINY[k]} {v}" for k, v in counts.items())
          + f" = {len(objs)} těles -> {path} ({size / 1024:.0f} kB)")
    update_manifest({
        "id": "mala-telesa", "soubor": path.name, "nazev": "Planetky a komety (vzorek)",
        "zdroj": "NASA/JPL Small-Body Database (SBDB Query API), oskulační elementy",
        "url": "https://ssd.jpl.nasa.gov/tools/sbdb_query.html",
        "licence": "Obsah JPL SSD – podle FAQ webu je k převzetí potřeba svolení JPL (vyřídit před zveřejněním)",
        "poznamka": "Vzorek po skupinách podle H; polohy z dvoučásticových drah k epoše oskulace (orientační, "
                    "chyba roste s odstupem od epochy).",
        "objektu": len(objs), "pocty": counts, "stazeno": stazeno,
    })


if __name__ == "__main__":
    main()
