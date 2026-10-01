"""Kontrola výletů (public/data/vylety.json): každá zastávka musí odkazovat na objekt, který v datech je.

Po každé aktualizaci katalogů spustit: py pipeline\\overit_vylety.py
Jména se porovnávají přesně jako v aplikaci (vrstva:jméno). Bez závislostí, jen standardní knihovna.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "public" / "data"
VIEWS = {"near", "sun", "top", "edge", "gc"}
MARKS = ("{d}", "{pc}", "{voyager}")


def names() -> dict[str, set[str]]:
    manifest = json.loads((DATA / "manifest.json").read_text(encoding="utf-8"))
    out: dict[str, set[str]] = {"slunecni-soustava": {"Sluneční soustava"}}
    for k in manifest["katalogy"]:
        path = DATA / k["soubor"]
        if not path.exists():
            continue
        d = json.loads(path.read_text(encoding="utf-8"))
        if k["id"] == "exoplanety":
            out[k["id"]] = set(d["systemy"]["jmeno"])
        elif isinstance(d.get("objekty"), dict) and "jmeno" in d["objekty"]:
            out[k["id"]] = set(d["objekty"]["jmeno"])
    return out


def main() -> int:
    known = names()
    tours = json.loads((DATA / "vylety.json").read_text(encoding="utf-8"))["vylety"]
    bad = 0
    for t in tours:
        for i, z in enumerate(t["zastavky"], 1):
            where = f"{t['id']} #{i} ({z.get('nadpis', '?')})"
            ref = z.get("o")
            if ref:
                layer, _, name = ref.partition(":")
                if name not in known.get(layer, set()):
                    print(f"CHYBA {where}: objekt {ref} v datech není")
                    bad += 1
            elif any(m in z["text"] for m in MARKS):
                print(f"CHYBA {where}: zástupná značka bez objektu")
                bad += 1
            if z.get("pohled") and z["pohled"] not in VIEWS:
                print(f"CHYBA {where}: neznámý pohled {z['pohled']}")
                bad += 1
            if not ref and not z.get("pohled"):
                print(f"CHYBA {where}: zastávka nemá objekt ani pohled")
                bad += 1
            if not z.get("zdroj"):
                print(f"CHYBA {where}: chybí zdroj")
                bad += 1
        print(f"{t['id']}: {len(t['zastavky'])} zastávek")
    print("v pořádku" if not bad else f"{bad} chyb")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
