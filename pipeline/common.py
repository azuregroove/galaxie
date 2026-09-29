"""Společné konstanty a pomocné funkce datové pipeline projektu Galaxie."""
from __future__ import annotations

import json
import math
from datetime import datetime, timezone
from pathlib import Path

import astropy.units as u
from astropy.coordinates import SkyCoord

# Reid et al. 2019, ApJ 885, 131: R0 = 8,15 ± 0,15 kpc. Stejný model použijeme v etapě 5 pro ramena.
R0_PC = 8150.0
LY_PER_PC = 3.261563777

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "public" / "data"
RAW_DIR = Path(__file__).resolve().parent / "raw"
MANIFEST = DATA_DIR / "manifest.json"


def icrs_to_galactic(ra_deg, dec_deg):
    """RA/Dec (ICRS, stupně) -> galaktické (l, b) ve stupních. Přijímá skaláry i pole."""
    c = SkyCoord(ra=ra_deg * u.deg, dec=dec_deg * u.deg, frame="icrs").galactic
    return c.l.deg, c.b.deg


def rnd(x, nd: int):
    """Zaokrouhlení s převodem NaN/None na None (v JSON null)."""
    if x is None:
        return None
    try:
        f = float(x)
    except (TypeError, ValueError):
        return None
    if math.isnan(f):
        return None
    r = round(f, nd)
    return int(r) if nd == 0 else r


def txt(x):
    if x is None:
        return None
    if isinstance(x, float) and math.isnan(x):
        return None
    s = str(x).strip()
    return s or None


def write_json(path: Path, obj) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    data = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
    path.write_text(data, encoding="utf-8")
    return len(data.encode("utf-8"))


def update_manifest(entry: dict) -> None:
    """Zapíše/aktualizuje záznam katalogu v manifest.json (klíč = entry['id'])."""
    if MANIFEST.exists():
        man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    else:
        man = {"schema": 1, "r0_pc": R0_PC, "r0_zdroj": "Reid et al. 2019, ApJ 885, 131", "katalogy": []}
    man["r0_pc"] = R0_PC
    man["katalogy"] = [k for k in man["katalogy"] if k["id"] != entry["id"]] + [entry]
    man["katalogy"].sort(key=lambda k: k["id"])
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(man, ensure_ascii=False, indent=2), encoding="utf-8")


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
