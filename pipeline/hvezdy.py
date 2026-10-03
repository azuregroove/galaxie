"""Jasné hvězdy (V ≤ 4,5 mag) jako orientační body → public/data/hvezdy.json (obecný formát schema 2).

Zdroje (VizieR, jen vybrané řádky):
  - Hipparcos, ESA 1997 (I/239/hip_main): V, spektrální typ, B−V, HD, poloha ICRS
  - Hipparcos, nová redukce, van Leeuwen 2007 (I/311/hip2): paralaxa a její chyba
  - Yale Bright Star Catalogue, 5. vyd. (V/50): Bayerovo/Flamsteedovo označení, číslo HR a spektrální typ (párování přes HD)
  - Wikidata: české a anglické jméno podle označení HIP (P528)
Vzdálenost = 1000 / paralaxa; bez kladné paralaxy jen směr. Rozsah 16.–84. percentilu z ±1σ paralaxy.
"""
from __future__ import annotations

import csv
import io
import json
import re
import time
import urllib.parse
import urllib.request

from common import RAW_DIR, icrs_to_galactic
from katalog import Vrstva, fetch
from obrazky import SPARQL, UA

ASU = "https://vizier.cds.unistra.fr/viz-bin/asu-tsv"
V_MAX = 4.5

TYPY = [
    {"id": "OB", "nazev": "Hvězda O/B (modrá)", "barva": "--st-ob"},
    {"id": "A", "nazev": "Hvězda A (bílá)", "barva": "--st-a"},
    {"id": "F", "nazev": "Hvězda F (žlutobílá)", "barva": "--st-f"},
    {"id": "G", "nazev": "Hvězda G (žlutá)", "barva": "--st-g"},
    {"id": "K", "nazev": "Hvězda K (oranžová)", "barva": "--st-k"},
    {"id": "M", "nazev": "Hvězda M (červená)", "barva": "--st-m"},
    {"id": "X", "nazev": "Hvězda jiného typu", "barva": "--st-x"},
]
POLE = [
    {"k": "vmag", "nazev": "Jasnost V", "jednotka": "mag", "des": 2},
    {"k": "sp", "nazev": "Spektrální typ"},
    {"k": "plx", "nazev": "Paralaxa", "jednotka": "mas", "des": 2},
    {"k": "hip", "nazev": "Hipparcos"},
    {"k": "hd", "nazev": "HD"},
]
GREEK = {"Alp": "α", "Bet": "β", "Gam": "γ", "Del": "δ", "Eps": "ε", "Zet": "ζ", "Eta": "η", "The": "θ", "Iot": "ι",
         "Kap": "κ", "Lam": "λ", "Mu": "μ", "Nu": "ν", "Xi": "ξ", "Omi": "ο", "Pi": "π", "Rho": "ρ", "Sig": "σ",
         "Tau": "τ", "Ups": "υ", "Phi": "φ", "Chi": "χ", "Psi": "ψ", "Ome": "ω"}
GREEK_EN = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu",
            "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"]
# české názvy písmen, ať jde hledat „alfa Ori“ i bez řecké klávesnice
GREEK_CS = dict(zip("αβγδεζηθικλμνξοπρστυφχψω", ["alfa", "beta", "gama", "delta", "epsilon", "zéta", "éta", "théta",
    "ióta", "kappa", "lambda", "mí", "ný", "ksí", "omikron", "pí", "ró", "sigma", "tau", "ypsilon", "fí", "chí", "psí", "omega"]))
SUP = str.maketrans("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹")


def asu(source: str, cond: str, cols: str, cache: str) -> list[dict]:
    q = f"{ASU}?-source={source}&{cond}&-out={cols}&-out.max=unlimited"
    path = fetch(q, RAW_DIR / "hvezdy" / cache)
    lines = [ln for ln in path.read_text(encoding="utf-8").splitlines() if ln and not ln.startswith("#")]
    # hlavička, jednotky, oddělovač
    rows = csv.reader(io.StringIO("\n".join([lines[0]] + lines[3:])), delimiter="\t")
    head = next(rows)
    return [{h: v.strip() for h, v in zip(head, r)} for r in rows]


def bsc_names(name: str) -> tuple[str | None, str | None]:
    """„21Alp And“ → („α And“, „21 And“); „ 9Alp2CMa“ apod. s horním indexem."""
    m = re.fullmatch(r"\s*(\d+)?\s*([A-Z][a-z]{1,2})?(\d)?\s*([A-Z][a-z]{2})\s*", name or "")
    if not m:
        return None, None
    fl, gr, idx, con = m.groups()
    bayer = f"{GREEK[gr]}{(idx or '').translate(SUP)} {con}" if gr in GREEK else None
    return bayer, (f"{fl} {con}" if fl else None)


def wikidata_names(codes: list[str]) -> list[dict]:
    """České a anglické štítky položek s daným označením P528; POST po dávkách (dlouhé GET URL WDQS odmítá)."""
    cache = RAW_DIR / "wikidata" / "hvezdy_hip.json"
    if cache.exists():
        return json.loads(cache.read_text(encoding="utf-8"))
    out = []
    for k in range(0, len(codes), 150):
        vals = " ".join(f'"{c}"' for c in codes[k:k + 150])
        q = f"""SELECT ?c (SAMPLE(?lc) AS ?cs) (SAMPLE(?le) AS ?en) WHERE {{ VALUES ?c {{ {vals} }} ?i wdt:P528 ?c .
          OPTIONAL {{ ?i rdfs:label ?lc FILTER(lang(?lc)="cs") }} OPTIONAL {{ ?i rdfs:label ?le FILTER(lang(?le)="en") }} }} GROUP BY ?c"""
        for attempt in range(5):
            try:
                req = urllib.request.Request(SPARQL, data=urllib.parse.urlencode({"query": q}).encode(),
                                             headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
                with urllib.request.urlopen(req, timeout=120) as r:
                    rows = json.load(r)["results"]["bindings"]
                break
            except Exception as ex:
                print(f"  WDQS chyba {ex}, znovu")
                time.sleep(20)
        else:
            raise SystemExit("WDQS opakovaně selhal")
        out += [{key: v["value"] for key, v in r.items()} for r in rows]
        time.sleep(2)
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    return out


def num(s: str):
    try:
        return float(s)
    except ValueError:
        return None


def main() -> None:
    main_rows = asu("I/239/hip_main", f"Vmag=%3C{V_MAX}", "HIP,HD,Vmag,SpType,B-V,RAICRS,DEICRS,RAhms,DEdms", "hip_main2.tsv")
    # Hp bývá u červených hvězd jasnější než V, rezerva 1 mag
    plx = {r["HIP"]: r for r in asu("I/311/hip2", f"Hpmag=%3C{V_MAX + 1}", "HIP,Plx,e_Plx", "hip2.tsv")}
    bsc = {r["HD"]: r for r in asu("V/50/catalog", f"Vmag=%3C{V_MAX + 0.3}", "HR,Name,HD,Vmag,SpType", "bsc2.tsv") if r["HD"]}

    wd = wikidata_names([f"HIP {r['HIP']}" for r in main_rows])
    names = {r["c"]: r for r in wd}

    v = Vrstva("hvezdy", TYPY, POLE)
    no_plx = 0
    for r in sorted(main_rows, key=lambda r: float(r["Vmag"])):
        hip, hd = r["HIP"], r["HD"] or None
        # pár hvězd (ξ UMa, ξ Sco) nemá polohu ICRS – sexagesimální poloha katalogu stačí na mapu
        if r["RAICRS"]:
            ra, dec = float(r["RAICRS"]), float(r["DEICRS"])
        else:
            h, m_, s_ = map(float, r["RAhms"].split())
            dd, dmn, dsec = r["DEdms"].split()
            ra = 15 * (h + m_ / 60 + s_ / 3600)
            dec = (abs(float(dd)) + float(dmn) / 60 + float(dsec) / 3600) * (-1 if dd.startswith("-") else 1)
        l, b = icrs_to_galactic(ra, dec)
        # BSC5 má u jasných hvězd pečlivější spektrální typ (Hipparcos dává např. Capelle „M1: comp“)
        sp = (bsc.get(hd, {}).get("SpType") if hd else None) or r["SpType"] or None
        t = (sp or "X")[0]
        typ = "OB" if t in "OB" else t if t in "AFGKM" else "X"
        p = plx.get(hip)
        pv, pe = (num(p["Plx"]), num(p["e_Plx"])) if p else (None, None)
        d = dm = dp = None
        if pv and pv > 0:
            d = 1000 / pv
            dm = 1000 / (pv + pe) if pe else None
            dp = 1000 / (pv - pe) if pe and pv > pe else None
        else:
            no_plx += 1
        w = names.get(f"HIP {hip}", {})
        bayer, flam = bsc_names(bsc.get(hd, {}).get("Name", "")) if hd else (None, None)
        cs, en = w.get("cs"), w.get("en")
        # jméno: české (Betelgeuze), jinak vlastní anglické (Sirius A), jinak Bayer (α Cen), jinak HIP;
        # anglické štítky typu „Alpha Andromedae“ nebo „HD 1234“ jsou jen označení, ta má Bayer česky čitelněji
        def proper(n: str | None) -> bool:
            return bool(n) and not re.match(r"(HD|HIP|HR|BD|Gliese|GJ|\d)|(" + "|".join(GREEK_EN) + r")\b", n)
        hr = bsc.get(hd, {}).get("HR") if hd else None
        jmeno = cs if proper(cs) else en if proper(en) else bayer or flam or (f"HR {hr}" if hr else f"HIP {hip}")
        bayer_cs = f"{GREEK_CS[bayer[0]]}{bayer[1:]}" if bayer else None
        plain = bayer_cs.translate(str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")) if bayer_cs else None
        alias = [bayer, bayer_cs, plain, flam, en, cs, f"HIP {hip}", f"HD {hd}" if hd else None, f"HR {hr}" if hr else None]
        v.add(jmeno, typ, l, b, d, dm, dp, metoda="paralaxa Hipparcos (van Leeuwen 2007)" if d else None,
              zdroj="Hipparcos (ESA 1997; van Leeuwen 2007), jméno Wikidata / Yale BSC5", alias=alias,
              vyzn=float(r["Vmag"]) < 1.5, vmag=num(r["Vmag"]), sp=sp, plx=pv, hip=f"HIP {hip}", hd=f"HD {hd}" if hd else None)
    print(f"bez kladné paralaxy: {no_plx}, s českým jménem z Wikidata: {sum(1 for x in wd if x.get('cs'))}")
    v.uloz({
        "nazev": f"Jasné hvězdy (V ≤ {V_MAX} mag)",
        "zdroj": "Hipparcos (ESA 1997, I/239), nová redukce paralax (van Leeuwen 2007, I/311), Yale BSC5 (V/50), jména Wikidata",
        "url": "https://cdsarc.cds.unistra.fr/viz-bin/cat/I/311",
        "licence": "data CDS/VizieR s citací; Wikidata CC0",
        "citace": "ESA 1997, ESA SP-1200; van Leeuwen F. 2007, A&A 474, 653; Hoffleit D., Warren W.H. 1991, Yale BSC5",
    })


if __name__ == "__main__":
    main()
