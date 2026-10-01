"""Vlastní jména objektů: jména hvězd a exoplanet schválená IAU (NameExoWorlds) a česká jména z Wikidata.

Výstup public/data/jmena.json:
  exoplanety: {systém: {"iau": jméno hvězdy, "planety": {planeta: jméno}, "od": datum schválení}}
  cs: {vrstva: {objekt: [česká jména]}} – z českých štítků Wikidata v obrazky.json (Plejády, Mlhovina Srdce…)

Jména IAU: Wikidata, vlastnost P2561 (jméno) s kvalifikátorem P3938 (pojmenoval) = IAU (Q6867).
Párování na naše systémy: katalogová označení (P528) hvězdy, její mateřské hvězdy nebo planety (bez písmene)
proti hostname z NASA archivu; když nic, poloha do 0,02°. Planeta podle písmene na konci označení.
Weby IAU (iau.org, WGSN) jsou z cloudu nedostupné, proto Wikidata.
"""
from __future__ import annotations

import json
import math
import re
import sys

from common import DATA_DIR, icrs_to_galactic, now_iso, update_manifest, write_json
from obrazky import sparql

Q_IAU = """
SELECT ?i ?name ?en ?parent ?ra ?dec ?start (GROUP_CONCAT(DISTINCT ?code; separator="|") AS ?codes)
       (GROUP_CONCAT(DISTINCT ?pcode; separator="|") AS ?pcodes) (GROUP_CONCAT(DISTINCT ?inst; separator="|") AS ?insts) WHERE {
  ?i p:P2561 ?st . ?st ps:P2561 ?name ; pq:P3938 wd:Q6867 .
  OPTIONAL { ?st pq:P580 ?start }
  OPTIONAL { ?i rdfs:label ?en FILTER(lang(?en)="en") }
  OPTIONAL { ?i wdt:P31 ?inst }
  OPTIONAL { ?i wdt:P528 ?code }
  OPTIONAL { ?i wdt:P6257 ?ra . ?i wdt:P6258 ?dec }
  OPTIONAL { ?i wdt:P397 ?parent . OPTIONAL { ?parent wdt:P528 ?pcode } }
} GROUP BY ?i ?name ?en ?parent ?ra ?dec ?start
"""
EXOPLANET = "http://www.wikidata.org/entity/Q44559"
MAX_SEP = 0.02


def key(s: str) -> str:
    return re.sub(r"[\s\-_]", "", s).lower()


def main() -> None:
    exo = json.loads((DATA_DIR / "exoplanety.json").read_text(encoding="utf-8"))
    S, P = exo["systemy"], exo["planety"]
    by_key = {key(n): i for i, n in enumerate(S["jmeno"])}
    planets_of: dict[int, list[int]] = {}
    for k, s in enumerate(P["sys"]):
        planets_of.setdefault(s, []).append(k)

    rows = sparql(Q_IAU, "iau_jmena.json")
    out: dict[str, dict] = {}
    unmatched = []

    def find_sys(codes: list[str], ra: str | None, dec: str | None) -> int | None:
        for c in codes:
            if key(c) in by_key:
                return by_key[key(c)]
        if ra and dec:
            l, b = icrs_to_galactic(float(ra), float(dec))
            best = None
            for i, (sl, sb) in enumerate(zip(S["l"], S["b"])):
                dl = (sl - l + 180) % 360 - 180
                if abs(sb - b) < MAX_SEP and abs(dl) * math.cos(math.radians(b)) < MAX_SEP:
                    best = i
                    break
            return best
        return None

    for r in rows:
        # anglický štítek jako záložní označení (planety PSR B1257+12 nemají P528)
        codes = [c for c in r.get("codes", "").split("|") if c] + ([r["en"]] if r.get("en") else [])
        pcodes = [c for c in r.get("pcodes", "").split("|") if c]
        is_planet = EXOPLANET in r.get("insts", "")
        name, od = r["name"], r.get("start", "")[:10] or None
        if is_planet:
            # označení planety bez písmene = hostitel (HD 95128b → HD 95128)
            hosts = pcodes + [re.sub(r"\s?[a-z]$", "", c) for c in codes]
            si = find_sys(hosts, r.get("ra"), r.get("dec"))
            letter = next((m.group(1) for c in codes if (m := re.search(r"[0-9\s]([b-z])$", c))), None)
            pk = None
            if si is not None and letter:
                pk = next((k for k in planets_of.get(si, []) if P["jmeno"][k].endswith(" " + letter)), None)
            if pk is None:
                unmatched.append(f"planeta {name} ({r.get('en')}; {', '.join(codes[:3])})")
                continue
            e = out.setdefault(S["jmeno"][si], {})
            e.setdefault("planety", {})[P["jmeno"][pk]] = name
            if od:
                e["od"] = min(e.get("od", od), od)
        else:
            si = find_sys(codes, r.get("ra"), r.get("dec"))
            if si is None:
                unmatched.append(f"hvězda {name} ({r.get('en')}; {', '.join(codes[:3])})")
                continue
            e = out.setdefault(S["jmeno"][si], {})
            e["iau"] = name
            if od:
                e["od"] = min(e.get("od", od), od)

    # česká jména z obrazky.json; jen když se liší od katalogového jména
    img = json.loads((DATA_DIR / "obrazky.json").read_text(encoding="utf-8"))
    cs: dict[str, dict[str, list[str]]] = {}
    for vrstva, objs in img["vrstvy"].items():
        if vrstva == "slunecni-soustava":
            continue
        for obj, rec in objs.items():
            names = []
            for n in (rec[2], rec[3]):
                # Wikidata občas přiřadí k pozůstatku supernovy položku jeho pulsaru (Krab) – takové jméno nepřebírat
                if n and "pulsar" in n.lower() and vrstva != "neutronove-hvezdy":
                    continue
                if n and key(n) != key(obj) and n not in names and not n.endswith(")"):
                    names.append(n)
            # „Messier 45“ → i „M45“, jak se běžně hledá
            for n in list(names):
                if m := re.fullmatch(r"Messier (\d+)", n):
                    names.append(f"M{m.group(1)}")
            if names:
                cs.setdefault(vrstva, {})[obj] = names

    n_star = sum(1 for v in out.values() if "iau" in v)
    n_pl = sum(len(v.get("planety", {})) for v in out.values())
    res = {"schema": 1, "katalog": "jmena", "stazeno": now_iso(),
           "zdroj": "Wikidata (P2561 + P3938 = IAU), obrazky.json (české štítky Wikidata)",
           "exoplanety": out, "cs": cs}
    size = write_json(DATA_DIR / "jmena.json", res)
    update_manifest({"id": "jmena", "soubor": "jmena.json", "nazev": "Vlastní jména (IAU, česká)",
                     "zdroj": "Wikidata: jména hvězd a exoplanet schválená IAU (P2561, pojmenoval = IAU) a české štítky",
                     "url": "https://www.wikidata.org/", "licence": "Wikidata CC0",
                     "poznamka": "Jména IAU na Wikidata nejsou úplná (chybí např. Ran, Ægir, Draugr); oficiální seznam WGSN z cloudu nedostupný.",
                     "objektu": len(out) + sum(len(v) for v in cs.values()), "stazeno": res["stazeno"]})
    print(f"jména IAU: {len(rows)} z Wikidata, napárováno hvězd {n_star}, planet {n_pl}, systémů {len(out)}")
    print(f"česká jména: {sum(len(v) for v in cs.values())} objektů; jmena.json {size / 1024:.0f} kB")
    print(f"nenapárováno {len(unmatched)}:")
    for u in unmatched:
        print("  ", u)


if __name__ == "__main__":
    sys.exit(main())
