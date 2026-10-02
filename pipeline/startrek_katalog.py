"""Katalog všech hvězd, soustav a planet Star Treku → public/data/startrek-katalog.json. FIKCE.

Vstup: stránky kategorií Stars, Star_systems a Planets z Memory Alpha (kánon) a Memory Beta (licencovaná fikce),
stažené skriptem startrek_stahni.py, a startrek.json (které soustavy mají polohu na mapě).
Bere se jen fakta z infoboxů a kategorií: jméno, druh, třída, soustava, příslušnost, kvadrant. Žádné texty článků.
Stejné jméno na obou wiki = jeden záznam (Memory Alpha má přednost, chybějící údaje doplní Memory Beta).
"""
from __future__ import annotations

import json
import re
from collections import Counter

from common import DATA_DIR, RAW_DIR, now_iso, update_manifest, write_json
from startrek import ALIAS, POWERS, affiliation, clean, first, infobox, key, power_of, system_of

RAW = RAW_DIR / "startrek"
TYPES = ["hvězda", "soustava", "planeta"]
CAT_TYPE = {"Stars": 0, "Star_systems": 1, "Planets": 2}
QUADS = {"Alpha": "A", "Beta": "B", "Gamma": "G", "Delta": "D"}
# zkratky šablon Memory Beta ({{quadrantAB}}, type = fed…) → kvadrant / mocnost
MB_TYPE = {"fed": "federace", "kling": "klingoni", "rom": "romulani", "card": "cardassiani", "ori": "orioni",
           "tho": "tholiane", "gorn": "gornove", "dom": "dominion", "borg": "borg", "fer": "ferengove", "breen": "breenove",
           "baj": "bajor", "kaz": "kazoni", "vid": "vidiiane", "hir": "hirogeni", "tal": "talariani", "xin": "xindi"}
BODY = {"moon": "měsíc", "planetoid": "planetka", "dwarf planet": "trpasličí planeta", "asteroid": "planetka",
        "rogue planet": "toulavá planeta", "gas giant": "plynný obr", "artificial planet": "umělá planeta",
        "comet": "kometa", "planet": "planeta"}


def quadrant(loc: str, cats: list[str]) -> str | None:
    t = loc + " " + " ".join(cats)
    if re.search(r"quadrantAB|Alpha (?:and|or) (?:the )?\[*Beta|alpha and beta quadrant", t, re.I):
        return "AB"
    for q, c in QUADS.items():
        if re.search(rf"\b{q}\s*Quadrant|\{{\{{quadrant{c}\}}\}}", t, re.I):
            return c
    return None


def short(s: str, n: int = 70) -> str:
    s = re.sub(r"\{\{[^{}]*\}\}", "", clean(re.sub(r"<br\s*/?>", ", ", s)))
    s = re.sub(r"'''?|<[^>]+>", "", s).strip(" ,;")
    return s if len(s) <= n else s[:n - 1].rstrip() + "…"


def star_class(v: str) -> str:
    v = re.sub(r"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", r"\1", v)
    v = re.sub(r"^type\s+", "", short(v, 40), flags=re.I)
    return "" if v.startswith("|") or "=" in v else v


def planet_class(v: str) -> str:
    v = short(v, 40)
    if v.startswith("|") or "=" in v:
        return ""
    m = re.search(r"\bclass[ -]([A-Z]|[A-Z]-?\d?)\b", v, re.I) or re.match(r"^([A-Z])\b", v)
    if m:
        return m.group(1).upper()
    return v


def body_kind(ib: dict, cats: list[str]) -> str:
    t = clean(first(ib, "bodytype", "type")).lower()
    for en, cz in BODY.items():
        if en in t:
            return cz
    if any("moons" in c or c.startswith("moon") for c in cats):
        return "měsíc"
    return "planeta"


def main() -> None:
    trek = json.loads((DATA_DIR / "startrek.json").read_text(encoding="utf-8"))
    on_map = {key(s["jmeno"]): i for i, s in enumerate(trek["soustavy"])}
    pidx = {p["id"]: i for i, p in enumerate(trek["mocnosti"])}

    recs: dict[tuple[str, int], dict] = {}
    pages = 0
    for wiki in ("memory-alpha", "memory-beta"):
        for cat, t in CAT_TYPE.items():
            p = RAW / f"{wiki}-{cat}.jsonl"
            for line in open(p, encoding="utf-8"):
                r = json.loads(line)
                pages += 1
                title, text = r["title"], r["text"]
                # přehledové stránky („Unnamed planets“, „List of…“) nejsou objekty
                if re.match(r"#redirect", text, re.I) or re.match(r"(Unnamed|List of) ", title):
                    continue
                ib = infobox(text)
                cats = [c.strip().lower() for c in re.findall(r"\[\[[Cc]ategory:([^\]|]+)", text)]
                name = re.sub(r"\s*\((star|planet|star system|system|moon|planetoid)\)$", "", title, flags=re.I)
                # jiná realita zůstane samostatnou položkou, ať se nemíchá se skutečným světem
                name = re.sub(r"\s*\((mirror|mirror universe)\)$", " (zrcadlový vesmír)", name, flags=re.I)
                name = re.sub(r"\s*\((alternate|alternate timeline|Kelvin timeline|Kelvin)\)$", " (alternativní linie)", name, flags=re.I)
                if t == 1:
                    name = re.sub(r"\s+(star system|system)$", "", name, flags=re.I)
                k = (key(name), t)
                rec = recs.setdefault(k, {"n": name, "t": t, "ma": None, "mb": None})
                rec["ma" if wiki == "memory-alpha" else "mb"] = rec.get("ma" if wiki == "memory-alpha" else "mb") or title

                def put(f: str, v):
                    if v and not rec.get(f):
                        rec[f] = v

                put("q", quadrant(first(ib, "location") + " " + first(ib, "type"), cats))
                aff = first(ib, "affiliation", "affilitation")
                pw = None
                if aff:
                    nm, era, txt = affiliation(aff)
                    pw = power_of(nm)
                    if not pw or pw.startswith("x:"):
                        # první známá mocnost mimo zrcadlový vesmír (affiliation() dává přednost segmentu bez data)
                        for seg in re.split(r"<br\s*/?>|\n", aff):
                            if "mirror" in seg.lower():
                                continue
                            hit = next((ALIAS[n.strip().lower()] for n in re.findall(r"(?:\[\[|\{\{)([^\]|}#]+)", seg)
                                        if n.strip().lower() in ALIAS), None)
                            if hit:
                                pw = hit
                                break
                    put("a", short(txt))
                if not pw and wiki == "memory-beta":
                    pw = MB_TYPE.get(first(ib, "type").strip().lower())
                if not pw:
                    for c in cats:
                        m = re.match(r"(.+?) (?:worlds|colonies|systems|stars)$", c)
                        if m and m.group(1) in ALIAS:
                            pw = ALIAS[m.group(1)]
                            break
                if pw and not pw.startswith("x:"):
                    put("p", pw)
                if t == 2:
                    put("c", planet_class(first(ib, "class", "classification")))
                    put("d", body_kind(ib, cats))
                else:
                    c = star_class(first(ib, "class"))
                    det = star_class(first(ib, "classdetail"))
                    put("c", c + det if len(c) == 1 and re.match(r"^[\dIV.]+$", det) else c or det)
                if t != 1:
                    s = system_of(ib, cat)
                    if s:
                        put("s", re.sub(r"\s+(star system|system)$", "", re.sub(r"\s*\((star|star system|system)\)$", "", s, flags=re.I), flags=re.I))
                m = (re.search(r"~?\s*([\d.,]+)\s*(?:\[\[)?light[ -]years?(?:\]\])?\s*from (?:the )?\[\[(?:Sol|Earth|Sol system)",
                               first(ib, "location")) or re.match(r"\s*~?([\d.,]+)\s*(?:\[\[)?light", first(ib, "soldist")))
                if m:
                    try:
                        put("ly", float(m.group(1).replace(",", "")))
                    except ValueError:
                        pass
                # jiná realita jen podle titulku – kategorie „mirror universe planets“ mají i stránky o skutečném světě
                if re.search(r"\((mirror|mirror universe)\)$", title, re.I):
                    put("x", "zrcadlový vesmír")
                elif re.search(r"\((alternate|alternate timeline|Kelvin timeline|Kelvin)\)$", title, re.I):
                    put("x", "alternativní časová linie")

    # soustava podle planety: chybí-li stránka soustavy, vznikne z planet, které na ni odkazují
    for r in list(recs.values()):
        if r["t"] == 2 and r.get("s"):
            sk = (key(r["s"]), 1)
            if sk not in recs and (key(r["s"]), 0) not in recs:
                recs[sk] = {"n": r["s"], "t": 1, "ma": None, "mb": None, "odvozeno": True}

    # poloha na mapě: soustava sama, nebo soustava planety/hvězdy
    for r in recs.values():
        i = on_map.get(key(r["n"])) if r["t"] != 2 else None
        if i is None and r.get("s"):
            i = on_map.get(key(r["s"]))
        if i is None and r["t"] == 2:
            i = on_map.get(key(r["n"]))  # samostatná planeta umístěná jako bod
        if i is not None:
            r["k"] = i

    items = sorted(recs.values(), key=lambda r: (r["n"].lower(), r["t"]))
    powers = [p["id"] for p in trek["mocnosti"]]
    extra = sorted({r["p"] for r in items if r.get("p") and r["p"] not in pidx})
    powers += extra
    pid = {p: i for i, p in enumerate(powers)}
    names = {p[0]: p[1] for p in POWERS}
    cols: dict[str, list] = {c: [] for c in ("n", "t", "d", "c", "s", "p", "a", "q", "ly", "k", "w", "ma", "mb", "x")}
    for r in items:
        cols["n"].append(r["n"])
        cols["t"].append(r["t"])
        cols["d"].append(r.get("d") if r.get("d") != "planeta" else None)
        cols["c"].append(r.get("c") or None)
        cols["s"].append(r.get("s"))
        cols["p"].append(pid[r["p"]] if r.get("p") else None)
        # text příslušnosti jen když neříká totéž co mocnost
        cols["a"].append(r.get("a") if r.get("a") and not r.get("p") else None)
        cols["q"].append(r.get("q"))
        cols["ly"].append(r.get("ly"))
        cols["k"].append(r.get("k"))
        cols["w"].append((1 if r["ma"] else 0) | (2 if r["mb"] else 0))
        # titulek wiki jen když se liší od jména
        cols["ma"].append(r["ma"] if r["ma"] and r["ma"] != r["n"] else None)
        cols["mb"].append(r["mb"] if r["mb"] and r["mb"] != r["n"] else None)
        cols["x"].append(r.get("x"))
    cnt = Counter(r["t"] for r in items)
    out = {
        "schema": 1, "katalog": "startrek-katalog", "stazeno": now_iso(),
        "upozorneni": "Fikce. Výpis z Memory Alpha a Memory Beta (jen fakta z infoboxů), ne oficiální seznam.",
        "druhy": TYPES,
        "mocnosti": [{"id": p, "nazev": names.get(p, p)} for p in powers],
        "pole": {"n": "jméno", "t": "druh (index do druhy)", "d": "upřesnění tělesa", "c": "třída", "s": "soustava",
                 "p": "mocnost (index)", "a": "příslušnost (text wiki, když není mezi mocnostmi)", "q": "kvadrant A/B/AB/G/D",
                 "ly": "vzdálenost od Slunce podle wiki (ly)", "k": "index soustavy v startrek.json (je na mapě)",
                 "w": "wiki: 1 Memory Alpha, 2 Memory Beta", "ma": "titulek na MA (liší-li se)", "mb": "titulek na MB",
                 "x": "jiná realita"},
        "polozky": cols,
        "statistika": {"stranek": pages, "polozek": len(items), "hvezd": cnt[0], "soustav": cnt[1], "planet": cnt[2],
                       "na_mape": sum(1 for r in items if r.get("k") is not None)},
    }
    size = write_json(DATA_DIR / "startrek-katalog.json", out)
    print(f"startrek-katalog.json {size / 1e3:.0f} kB; {out['statistika']}")
    print("mocnosti:", Counter(names.get(r.get("p"), r.get("p")) for r in items).most_common(15))
    print("třídy planet:", Counter(r.get("c") for r in items if r["t"] == 2).most_common(15))
    print("druhy těles:", Counter(r.get("d") for r in items if r["t"] == 2).most_common(10))
    print("kvadranty:", Counter(r.get("q") for r in items).most_common())
    update_manifest({
        "id": "startrek-katalog", "soubor": "startrek-katalog.json", "nazev": "Star Trek – katalog hvězd a planet (fikce)",
        "zdroj": "Memory Alpha (memory-alpha.fandom.com) a Memory Beta (memory-beta.fandom.com), kategorie Stars, "
                 "Star systems, Planets",
        "url": "https://memory-alpha.fandom.com/wiki/Category:Planets",
        "licence": "Fakta z wiki: Memory Alpha CC BY-NC, Memory Beta CC BY-SA (uvedeno, nekomerční). Star Trek © Paramount; "
                   "neoficiální fanouškovská vrstva",
        "poznamka": "Jen jména a údaje z infoboxů, žádné texty článků. Poloha jen u soustav, které má fanouškovská vrstva na mapě.",
        "vyrez": False,
    })


if __name__ == "__main__":
    main()
