"""Doplní jasné hvězdy (hvezdy.json) do obrazky.json: položka Wikidata podle označení HIP (P528), obrázek P18
a články na cs/en Wikipedii. Obrázek je nepovinný – kvůli popisu z Wikipedie stačí článek.

Samostatně, aby nebylo nutné znovu pouštět dlouhé dotazy obrazky.py. Po každém běhu obrazky.py (ten soubor přepíše)
spustit znovu: py pipeline\\obrazky_hvezdy.py
"""
from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request

from common import DATA_DIR, MANIFEST, RAW_DIR, now_iso, update_manifest, write_json
from obrazky import SPARQL, UA, VYRADIT, file_of


def query(codes: list[str]) -> list[dict]:
    cache = RAW_DIR / "wikidata" / "hvezdy_obrazky.json"
    if cache.exists() and cache.stat().st_size > 0:
        return json.loads(cache.read_text(encoding="utf-8"))
    out = []
    for k in range(0, len(codes), 150):
        vals = " ".join(f'"{c}"' for c in codes[k:k + 150])
        # jedna položka může mít víc obrázků i štítků; SAMPLE vybere jeden, GROUP BY drží řádek na označení
        q = f"""SELECT ?c ?i (SAMPLE(?img) AS ?obr) (SAMPLE(?lc) AS ?cs) (SAMPLE(?csw) AS ?cswiki) (SAMPLE(?enw) AS ?enwiki) WHERE {{
          VALUES ?c {{ {vals} }} ?i wdt:P528 ?c .
          OPTIONAL {{ ?i wdt:P18 ?img }}
          OPTIONAL {{ ?i rdfs:label ?lc FILTER(lang(?lc)="cs") }}
          OPTIONAL {{ ?a1 schema:about ?i ; schema:isPartOf <https://cs.wikipedia.org/> ; schema:name ?csw }}
          OPTIONAL {{ ?a2 schema:about ?i ; schema:isPartOf <https://en.wikipedia.org/> ; schema:name ?enw }}
        }} GROUP BY ?c ?i"""
        for attempt in range(6):
            try:
                req = urllib.request.Request(SPARQL, data=urllib.parse.urlencode({"query": q}).encode(),
                                             headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
                with urllib.request.urlopen(req, timeout=120) as r:
                    rows = json.load(r)["results"]["bindings"]
                break
            except Exception as ex:
                print(f"  WDQS chyba {ex}, čekám a zkouším znovu")
                time.sleep(30 * (attempt + 1))
        else:
            raise SystemExit("WDQS opakovaně selhal")
        out += [{key: v["value"] for key, v in r.items()} for r in rows]
        print(f"  dávka {k // 150 + 1}: {len(rows)} řádků")
        time.sleep(3)
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    return out


def main() -> None:
    stars = json.loads((DATA_DIR / "hvezdy.json").read_text(encoding="utf-8"))["objekty"]
    hip = stars["x"]["hip"]
    codes = sorted({h for h in hip if h})
    rows = query(codes)
    by_code: dict[str, list[dict]] = {}
    for r in rows:
        by_code.setdefault(r["c"], []).append(r)
    layer: dict[str, list] = {}
    ambiguous = 0
    for name, h in zip(stars["jmeno"], hip):
        cand = [r for r in by_code.get(h, []) if r["i"].rsplit("/", 1)[-1] not in VYRADIT]
        if len(cand) != 1:
            # dvě položky se stejným HIP (hvězda a soustava) – radši nic než špatný článek
            ambiguous += len(cand) > 1
            continue
        r = cand[0]
        if not (r.get("obr") or r.get("cswiki") or r.get("enwiki")):
            continue
        layer[name] = [r["i"].rsplit("/", 1)[-1], file_of(r["obr"]) if r.get("obr") else None,
                       r.get("cs"), r.get("cswiki"), r.get("enwiki")]
    path = DATA_DIR / "obrazky.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["vrstvy"]["hvezdy"] = layer
    size = write_json(path, data)
    man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    entry = next(k for k in man["katalogy"] if k["id"] == "obrazky")
    entry["objektu"] = sum(len(v) for v in data["vrstvy"].values())
    entry["hvezdy_stazeno"] = now_iso()
    entry["poznamka"] = ("Jasné hvězdy doplněné podle označení HIP (P528, obrazky_hvezdy.py). Popis v kartě = úvod článku "
                         "české Wikipedie, načtený až při otevření karty; text CC BY-SA 4.0, autoři v historii článku.")
    update_manifest(entry)
    print(f"jasné hvězdy: {len(layer)} z {len(stars['jmeno'])} (obrázek {sum(1 for e in layer.values() if e[1])}, "
          f"cs Wikipedie {sum(1 for e in layer.values() if e[3])}), nejednoznačné HIP {ambiguous}; {path.name} {size / 1024:.0f} kB")


if __name__ == "__main__":
    main()
