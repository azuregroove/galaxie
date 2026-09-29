"""Stahování katalogů z CDS/VizieR a zápis obecného formátu katalogové vrstvy (etapa 3).

Formát výstupu (sloupcový JSON, schema 2):
  typy      – [{id, nazev, barva}]  barva = CSS proměnná aplikace
  metody    – názvy metod určení vzdálenosti (index v objekty.dmet)
  zdroje    – texty o původu polohy/vzdálenosti (index v objekty.zdroj)
  pole      – řádky karty: [{k, nazev, jednotka?, des?}] – hodnoty v objekty.x[k]
  fasety    – filtry: [{id, nazev, k, moznosti}] – objekty.x[k] je index do moznosti
  objekty   – jmeno, typ, l, b, d (pc | null), dm/dp (pc, spodní/horní mez | null),
              dmet, zdroj, alias ("; "-oddělené | null), vyzn (0/1), x {k: [...]}
"""
from __future__ import annotations

import gzip
import shutil
import tempfile
import urllib.request
import warnings
from pathlib import Path

from astropy.io import ascii

from common import DATA_DIR, RAW_DIR, now_iso, rnd, update_manifest, write_json

CDS = "https://cdsarc.cds.unistra.fr/ftp/cats"


def fetch(url: str, dest: Path) -> Path:
    """Stáhne soubor do pipeline/raw (cache); už stažený znovu nestahuje."""
    if dest.exists() and dest.stat().st_size > 0:
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"  stahuji {url}")
    with urllib.request.urlopen(url, timeout=300) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)
    return dest


def cds_table(cat: str, table: str):
    """Tabulka z CDS ve formátu 'cds' (ReadMe + data, případně .gz) jako astropy Table."""
    base = RAW_DIR / cat.replace("/", "_").replace("+", "_")
    readme = fetch(f"{CDS}/{cat}/ReadMe", base / "ReadMe")
    data = base / table
    if not data.exists():
        try:
            fetch(f"{CDS}/{cat}/{table}", data)
        except urllib.error.HTTPError:
            gz = fetch(f"{CDS}/{cat}/{table}.gz", base / (table + ".gz"))
            with gzip.open(gz, "rb") as fi, open(data, "wb") as fo:
                shutil.copyfileobj(fi, fo)
    # čtečka CDS páruje data s ReadMe podle jména souboru, proto kopie do dočasné složky
    tmp = Path(tempfile.mkdtemp())
    shutil.copy(data, tmp / table)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        return ascii.read(str(tmp / table), readme=str(readme), format="cds")


def val(x):
    """Hodnota z astropy sloupce -> Python (maskované a NaN -> None)."""
    if x is None or getattr(x, "mask", False) is True:
        return None
    try:
        import numpy as np
        if np.ma.is_masked(x):
            return None
    except ImportError:
        pass
    if hasattr(x, "item"):
        x = x.item()
    if isinstance(x, float) and x != x:
        return None
    if isinstance(x, bytes):
        x = x.decode()
    if isinstance(x, str):
        x = x.strip()
        return x or None
    return x


class Vrstva:
    """Sběrač objektů jedné katalogové vrstvy."""

    def __init__(self, katalog: str, typy: list[dict], pole: list[dict], fasety: list[dict] | None = None):
        self.katalog = katalog
        self.typy = typy
        self.pole = pole
        self.fasety = fasety or []
        self.metody: list[str] = []
        self.zdroje: list[str] = []
        self.o: dict[str, list] = {k: [] for k in ["jmeno", "typ", "l", "b", "d", "dm", "dp", "dmet", "zdroj", "alias", "vyzn"]}
        self.x: dict[str, list] = {p["k"]: [] for p in pole}
        for f in self.fasety:
            self.x.setdefault(f["k"], [])

    def _idx(self, arr: list[str], s: str | None):
        if s is None:
            return None
        if s not in arr:
            arr.append(s)
        return arr.index(s)

    def add(self, jmeno: str, typ: str, l: float, b: float, d_pc=None, dm=None, dp=None, metoda=None,
            zdroj=None, alias=None, vyzn=False, **x):
        t = [t["id"] for t in self.typy].index(typ)
        d = rnd(d_pc, 1)
        if d is not None and d <= 0:
            d = None
        o = self.o
        o["jmeno"].append(jmeno)
        o["typ"].append(t)
        o["l"].append(rnd(l % 360.0, 4))
        o["b"].append(rnd(b, 4))
        o["d"].append(d)
        o["dm"].append(rnd(dm, 1) if d is not None else None)
        o["dp"].append(rnd(dp, 1) if d is not None else None)
        o["dmet"].append(self._idx(self.metody, metoda) if d is not None else None)
        o["zdroj"].append(self._idx(self.zdroje, zdroj))
        al = [a for a in dict.fromkeys(alias or []) if a and a != jmeno]
        o["alias"].append("; ".join(al) or None)
        o["vyzn"].append(1 if vyzn else 0)
        for k in self.x:
            v = x.get(k)
            self.x[k].append(round(v, 4) if isinstance(v, float) else v)

    def __len__(self):
        return len(self.o["jmeno"])

    def uloz(self, manifest: dict) -> None:
        n = len(self)
        s_d = sum(1 for d in self.o["d"] if d is not None)
        per_typ = {t["id"]: [0, 0] for t in self.typy}
        for ti, d in zip(self.o["typ"], self.o["d"]):
            per_typ[self.typy[ti]["id"]][0] += 1
            per_typ[self.typy[ti]["id"]][1] += d is not None
        out = {"schema": 2, "katalog": self.katalog, "jednotky": {"d": "pc", "l": "deg", "b": "deg"},
               "stazeno": now_iso(), "typy": self.typy, "metody": self.metody, "zdroje": self.zdroje,
               "pole": self.pole, "fasety": self.fasety, "objekty": {**self.o, "x": self.x}}
        path = DATA_DIR / f"{self.katalog}.json"
        size = write_json(path, out)
        update_manifest({**manifest, "id": self.katalog, "soubor": path.name, "objektu": n,
                         "se_vzdalenosti": s_d, "stazeno": out["stazeno"]})
        print(f"Hotovo: {n} objektů ({s_d} se vzdáleností) -> {path} ({size / 1024:.0f} kB)")
        for tid, (c, cd) in per_typ.items():
            print(f"  {tid:14s} {c:6d} objektů, {cd:6d} se vzdáleností")
