"""Stáhne wikitext hvězd, soustav a planet z Memory Alpha a Memory Beta (MediaWiki API Fandomu)
do pipeline/raw/startrek/<wiki>-<kategorie>.jsonl. Už stažené kategorie přeskočí.

Memory Alpha: obsah ze seriálů a filmů (kánon) + poznámky „background information“ (mj. Star Charts).
Memory Beta: licencovaná fikce (knihy, hry, Star Charts). Obojí CC BY-NC – jen pro nekomerční fanouškovskou vrstvu.
"""
from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request

from common import RAW_DIR

UA = "GalaxieMap/0.1 (radekfris@gmail.com; non-commercial fan map)"
CATS = {"memory-alpha": ["Stars", "Star_systems", "Planets"], "memory-beta": ["Stars", "Star_systems", "Planets"]}
OUT = RAW_DIR / "startrek"


def api(wiki: str, **q) -> dict:
    q |= {"format": "json"}
    url = f"https://{wiki}.fandom.com/api.php?" + urllib.parse.urlencode(q)
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=90) as r:
                return json.load(r)
        except Exception as e:  # noqa: BLE001 – síť, zkusit znovu
            print(f"  chyba {e}, znovu za {2 ** attempt} s")
            time.sleep(2 ** attempt)
    raise RuntimeError(url)


def members(wiki: str, cat: str) -> list[str]:
    out, cont = [], {}
    while True:
        d = api(wiki, action="query", list="categorymembers", cmtitle=f"Category:{cat}", cmlimit=500, cmtype="page", **cont)
        out += [m["title"] for m in d["query"]["categorymembers"]]
        if "continue" not in d:
            return out
        cont = d["continue"]
        time.sleep(0.3)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for wiki, cats in CATS.items():
        for cat in cats:
            path = OUT / f"{wiki}-{cat}.jsonl"
            if path.exists() and path.stat().st_size:
                continue
            titles = members(wiki, cat)
            print(f"{wiki} {cat}: {len(titles)} stránek")
            tmp = path.with_suffix(".part")
            with open(tmp, "w", encoding="utf-8") as f:
                for i in range(0, len(titles), 50):
                    d = api(wiki, action="query", prop="revisions", rvprop="content", rvslots="main",
                            titles="|".join(titles[i:i + 50]), redirects=1)
                    for p in d["query"]["pages"].values():
                        rev = p.get("revisions")
                        if rev:
                            f.write(json.dumps({"title": p["title"], "text": rev[0]["slots"]["main"]["*"]}, ensure_ascii=False) + "\n")
                    time.sleep(0.5)
            tmp.rename(path)
            print(f"  → {path.name} {path.stat().st_size / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
