"""Obrázky k objektům: párování s Wikidata -> public/data/obrazky.json

Ukládá se jen odkaz (položka Wikidata + název souboru na Wikimedia Commons), žádné obrázky. Náhled, autora
a licenci načte aplikace z Commons až při otevření karty (rozhodnutí 30. 9. 2026: „odkazy místo souborů“).

Zdroj: Wikidata Query Service (https://query.wikidata.org/), data Wikidata jsou CC0.
Obrázek = vlastnost P18. Soubory na Commons mají každý svou licenci – ta se ukazuje v kartě.

Párování:
  - klíče: jméno objektu, jeho aliasy a část v závorce  x  štítky (en, cs), alternativní štítky (en)
    a katalogová označení (P528) položky Wikidata; porovnává se bez mezer, diakritiky a úvodních nul
  - kontrola polohy: RA/Dec z Wikidata (P6257, P6258) musí ležet do MAX_SEP od naší polohy;
    položky bez souřadnic se berou jen při shodě s hlavním jménem objektu (počet se vypíše)
  - tělesa Sluneční soustavy: podle rodičovského tělesa (P397 = Slunce nebo planeta) a jména

Po něm spustit obrazky_hvezdy.py (doplní jasné hvězdy, tento skript je přepíše).
Použití:  python obrazky.py        (3 dotazy SPARQL, při limitu WDQS i desítky minut; cache v raw/wikidata)
"""
from __future__ import annotations

import json
import re
import time
import unicodedata
import urllib.parse
import urllib.request

import numpy as np

from common import DATA_DIR, RAW_DIR, icrs_to_galactic, now_iso, update_manifest, write_json

SPARQL = "https://query.wikidata.org/sparql"
# Obrázky, které na Wikidata patří jinému objektu (ruční kontrola 30. 9. 2026)
VYRADIT = {"Q16839981": "Velký anihilátor má jako obrázek uměleckou představu SS 433"}
UA = "GalaxieMapa/0.1 (https://github.com/azuregroove/galaxie)"

# Typy (P31) ověřené na známých objektech 30. 9. 2026 (Orion, Plejády, Krab, Cyg X-1, Sgr A* …)
TRIDY = {
    "Q11387": "otevřená hvězdokupa", "Q11276": "kulová hvězdokupa", "Q168845": "hvězdokupa",
    "Q13632": "planetární mlhovina", "Q207436": "pozůstatek supernovy", "Q202265": "emisní mlhovina",
    "Q204194": "temná mlhovina", "Q11282": "oblast H II", "Q203958": "reflexní mlhovina", "Q854857": "difúzní mlhovina",
    "Q1054444": "mlhovina", "Q272447": "molekulové mračno", "Q4360": "pulsar", "Q845169": "rentgenová dvojhvězda (HMXB)",
    "Q2154519": "rentgenový zdroj", "Q40392": "supermasivní černá díra", "Q589": "černá díra",
}
# Rozlehlé objekty mají střed nejistý a Wikidata někdy uvádí jinou část (např. hvězdokupu v mlhovině)
MAX_SEP = {"hvezdokupy": 1.0, "mlhoviny": 1.0, "neutronove-hvezdy": 0.2, "cerne-diry": 0.2, "exoplanety": 0.1}
# Solární tělesa: Slunce, Země, Mars, Jupiter, Saturn, Uran, Neptun, Pluto (ověřeno štítky)
RODICE = {"Q525": "Slunce", "Q2": "Země", "Q111": "Mars", "Q319": "Jupiter", "Q193": "Saturn", "Q324": "Uran",
          "Q332": "Neptun", "Q339": "Pluto"}


def sparql(q: str, cache: str) -> list[dict]:
    p = RAW_DIR / "wikidata" / cache
    if p.exists() and p.stat().st_size > 0:
        return json.loads(p.read_text(encoding="utf-8"))
    print(f"  SPARQL {cache}")
    for attempt in range(10):
        try:
            req = urllib.request.Request(f"{SPARQL}?{urllib.parse.urlencode({'query': q, 'format': 'json'})}",
                                         headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
            with urllib.request.urlopen(req, timeout=180) as r:
                rows = json.load(r)["results"]["bindings"]
            break
        except Exception as ex:  # 429/504 – služba je sdílená, počkat a zkusit znovu
            print(f"    chyba {ex}, zkouším znovu")
            # při výpadku WDQS platí limit 1 dotaz/min – na IP adresu, kterou v cloudu sdílíme s jinými
            time.sleep(90)
    else:
        raise SystemExit(f"SPARQL {cache} opakovaně selhal")
    out = [{k: v["value"] for k, v in r.items()} for r in rows]
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    time.sleep(62)
    return out


FIELDS = """(SAMPLE(?img) AS ?obr) (SAMPLE(?ra) AS ?ra_) (SAMPLE(?dec) AS ?dec_) (SAMPLE(?len) AS ?en) (SAMPLE(?lcs) AS ?cs)
  (GROUP_CONCAT(DISTINCT ?code; separator="|") AS ?kody) (GROUP_CONCAT(DISTINCT ?alt; separator="|") AS ?alt_)
  (SAMPLE(?csw) AS ?cswiki) (SAMPLE(?enw) AS ?enwiki)"""
OPTS = """OPTIONAL { ?i wdt:P6257 ?ra } OPTIONAL { ?i wdt:P6258 ?dec }
  OPTIONAL { ?i rdfs:label ?len FILTER(lang(?len) = "en") } OPTIONAL { ?i rdfs:label ?lcs FILTER(lang(?lcs) = "cs") }
  OPTIONAL { ?i wdt:P528 ?code } OPTIONAL { ?i skos:altLabel ?alt FILTER(lang(?alt) = "en") }
  OPTIONAL { ?a1 schema:about ?i ; schema:isPartOf <https://cs.wikipedia.org/> ; schema:name ?csw }
  OPTIONAL { ?a2 schema:about ?i ; schema:isPartOf <https://en.wikipedia.org/> ; schema:name ?enw }"""


def items_of_classes() -> list[dict]:
    """Všechny třídy jedním dotazem (kvůli limitu WDQS); položka s víc třídami se vrátí jednou."""
    vals = " ".join(f"wd:{q}" for q in TRIDY)
    return sparql(f"SELECT ?i {FIELDS} WHERE {{ VALUES ?c {{ {vals} }} ?i wdt:P31 ?c ; wdt:P18 ?img . {OPTS} }} GROUP BY ?i",
                  "tridy.json")


def exo_hosts() -> list[dict]:
    return sparql(f"""SELECT ?i {FIELDS} WHERE {{ ?pl wdt:P31 wd:Q44559 ; wdt:P397 ?i . ?i wdt:P18 ?img . {OPTS} }} GROUP BY ?i""",
                  "hostitele.json")


def solar_items() -> list[dict]:
    vals = " ".join(f"wd:{q}" for q in RODICE)
    return sparql(f"""SELECT ?i ?rodic {FIELDS} WHERE {{ VALUES ?rodic {{ {vals} }} ?i wdt:P397 ?rodic ; wdt:P18 ?img . {OPTS} }}
                      GROUP BY ?i ?rodic""", "slunecni.json")


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = s.replace("−", "-").replace("–", "-")
    s = re.sub(r"^psr\s*", "", s)
    s = re.sub(r"[\s_]+", "", s)
    s = re.sub(r"(?<=[a-z])0+(?=\d)", "", s)  # „NGC 0104“ = „NGC 104“
    return s


def keys_of_name(name: str, aliases: str | None = None) -> tuple[set[str], set[str]]:
    """(klíče hlavního jména, klíče aliasů). Část v závorce je samostatné jméno („A0620-00 (V616 Mon)“)."""
    main = {norm(name)}
    m = re.match(r"^(.*?)\s*\((.+)\)$", name)
    if m:
        main.add(norm(m.group(1)))
        main.add(norm(m.group(2)))
    alt = {norm(a) for a in (aliases or "").split(";") if a.strip()}
    return {k for k in main if len(k) >= 3}, {k for k in alt if len(k) >= 3} - main


def wd_keys(it: dict) -> set[str]:
    ks = set()
    for f in ("en", "cs"):
        if it.get(f):
            ks.add(norm(it[f]))
    for f in ("kody", "alt_"):
        for x in (it.get(f) or "").split("|"):
            if x.strip():
                ks.add(norm(x))
    return {k for k in ks if len(k) >= 3}


def file_of(url: str) -> str:
    return urllib.parse.unquote(url.rsplit("/", 1)[-1])


def entry(it: dict) -> list:
    """[QID, soubor, český štítek, cs Wikipedie, en Wikipedie] – pozice pevné, chybějící = null."""
    return [it["i"].rsplit("/", 1)[-1], file_of(it["obr"]), it.get("cs"), it.get("cswiki"), it.get("enwiki")]


def ang_sep(l1, b1, l2, b2) -> np.ndarray:
    l1, b1, l2, b2 = map(np.radians, (l1, b1, l2, b2))
    c = np.sin(b1) * np.sin(b2) + np.cos(b1) * np.cos(b2) * np.cos(l1 - l2)
    return np.degrees(np.arccos(np.clip(c, -1, 1)))


def match_layer(layer: str, names: list[str], aliases: list[str | None], l: list[float], b: list[float],
                items: list[dict]) -> dict:
    # index klíčů Wikidata
    index: dict[str, list[int]] = {}
    for k, it in enumerate(items):
        for key in wd_keys(it):
            index.setdefault(key, []).append(k)
    ra = np.array([float(it["ra_"]) if it.get("ra_") else np.nan for it in items])
    dec = np.array([float(it["dec_"]) if it.get("dec_") else np.nan for it in items])
    ok = ~np.isnan(ra) & ~np.isnan(dec)
    gl = np.full(len(items), np.nan)
    gb = np.full(len(items), np.nan)
    if ok.any():
        gl[ok], gb[ok] = icrs_to_galactic(ra[ok], dec[ok])
    out, used = {}, {}
    n_nocoord = n_far = 0
    for j, name in enumerate(names):
        main, alt = keys_of_name(name, aliases[j] if aliases else None)
        cand = {k: "main" for key in main for k in index.get(key, [])}
        for key in alt:
            for k in index.get(key, []):
                cand.setdefault(k, "alt")
        best, best_sep = None, None
        for k, how in cand.items():
            if np.isnan(gl[k]):
                if how == "main" and best is None:
                    best, best_sep = k, None
                continue
            sep = float(ang_sep(l[j], b[j], gl[k], gb[k]))
            if sep > MAX_SEP[layer]:
                n_far += 1
                continue
            if best_sep is None or sep < best_sep:
                best, best_sep = k, sep
        if best is None or items[best]["i"].rsplit("/", 1)[-1] in VYRADIT:
            continue
        if best_sep is None:
            n_nocoord += 1
        # jedna položka Wikidata = jeden objekt vrstvy (ten nejbližší)
        prev = used.get(best)
        if prev is not None:
            if best_sep is None or (prev[1] is not None and prev[1] <= best_sep):
                continue
            del out[prev[0]]
        used[best] = (name, best_sep)
        out[name] = entry(items[best])
    print(f"  {layer}: {len(out)} obrázků (bez kontroly polohy {n_nocoord}; kandidátů zamítnutých kvůli poloze {n_far})")
    return out


def solar(items: list[dict]) -> dict:
    ss = json.loads((DATA_DIR / "slunecni-soustava.json").read_text(encoding="utf-8"))
    small = json.loads((DATA_DIR / "mala-telesa.json").read_text(encoding="utf-8"))
    by_parent: dict[str, dict[str, int]] = {}
    for k, it in enumerate(items):
        par = RODICE[it["rodic"].rsplit("/", 1)[-1]]
        for key in wd_keys(it):
            by_parent.setdefault(par, {}).setdefault(key, k)
    out = {}

    def take(key_name: str, variants: list[str], parent: str):
        idx = by_parent.get(parent, {})
        for v in variants:
            k = idx.get(norm(v))
            if k is not None:
                out[key_name] = entry(items[k])
                return

    for p in ss["planety"]:
        take(p["en"], [p["en"]], "Slunce")
    for p in ss["trpaslici"]:  # „134340 Pluto (…)“ -> „Pluto“, „134340 Pluto“
        m = re.match(r"^(\d+)\s+(\S+)", p["en"])
        take(p["en"], [m.group(2), f"{m.group(1)} {m.group(2)}"] if m else [p["en"]], "Slunce")
    for m in ss["mesice"]:
        take(m["en"], [m["en"], f"{m['en']} (moon)"], m["planeta"])
    for name in small["sloupce"]["jmeno"]:
        v = [name, re.sub(r"\s*\([^)]*\)$", "", name)]
        m = re.match(r"^\d+\s+(\S.*?)(\s*\(|$)", name)
        if m:
            v.append(f"{m.group(1)} (asteroid)")
        mc = re.match(r"^(\d+[PD])/(.+?)(\s*\(|$)", name)
        if mc:
            v += [f"{mc.group(1)}/{mc.group(2)}", f"Comet {mc.group(2)}"]
        take(name, v, "Slunce")
    print(f"  slunecni-soustava: {len(out)} obrázků")
    return out


def main():
    print("Wikidata: položky s obrázkem …")
    deep = items_of_classes()
    print(f"  hvězdokupy, mlhoviny, pulsary, rentgenové zdroje, černé díry: {len(deep)}")
    hosts = exo_hosts()
    print(f"  hostitelské hvězdy exoplanet: {len(hosts)}")
    sol = solar_items()
    print(f"  tělesa Sluneční soustavy: {len(sol)}")

    print("Párování …")
    res = {}
    for layer in ("hvezdokupy", "mlhoviny", "neutronove-hvezdy"):
        o = json.loads((DATA_DIR / f"{layer}.json").read_text(encoding="utf-8"))["objekty"]
        res[layer] = match_layer(layer, o["jmeno"], o["alias"], o["l"], o["b"], deep)
    bh = json.loads((DATA_DIR / "cerne-diry.json").read_text(encoding="utf-8"))["objekty"]
    res["cerne-diry"] = match_layer("cerne-diry", bh["jmeno"], None, bh["l"], bh["b"], deep + hosts)
    ex = json.loads((DATA_DIR / "exoplanety.json").read_text(encoding="utf-8"))["systemy"]
    res["exoplanety"] = match_layer("exoplanety", ex["jmeno"], None, ex["l"], ex["b"], hosts)
    res["slunecni-soustava"] = solar(sol)

    stazeno = now_iso()
    out = {"schema": 1, "katalog": "obrazky", "stazeno": stazeno,
           "pole": ["wikidata", "soubor_commons", "stitek_cs", "wiki_cs", "wiki_en"], "vrstvy": res}
    path = DATA_DIR / "obrazky.json"
    size = write_json(path, out)
    total = sum(len(v) for v in res.values())
    print(f"Hotovo: {total} odkazů na obrázky -> {path} ({size / 1024:.0f} kB)")
    update_manifest({
        "id": "obrazky", "soubor": path.name, "nazev": "Obrázky (odkazy na Wikimedia Commons)",
        "zdroj": "Wikidata (vlastnost P18), soubory Wikimedia Commons",
        "url": "https://www.wikidata.org/",
        "licence": "Wikidata CC0; každý obrázek má vlastní licenci a autora na Commons (zobrazeno v kartě)",
        "objektu": total, "stazeno": stazeno,
    })


if __name__ == "__main__":
    main()
