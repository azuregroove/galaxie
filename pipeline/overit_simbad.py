"""Kontrola souřadnic černých děr z cerne_diry.py proti SIMBADu (přes CDS Sesame).

Nic nepřepisuje, jen vypíše úhlovou odchylku zapsané polohy od polohy v SIMBADu.
Použití:  python overit_simbad.py
"""
from __future__ import annotations

import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

import astropy.units as u
from astropy.coordinates import SkyCoord

from cerne_diry import D, galactic

# Jméno v prototypu -> identifikátor, který SIMBAD zná (proměnné hvězdy, NAME …).
SIMBAD_ID = {
    # Gaia BH1–3 SIMBAD pod jménem nenajde, jen pod číslem hvězdy-průvodce v Gaia DR3.
    "Gaia BH1": "Gaia DR3 4373465352415301632",
    "Gaia BH2": "Gaia DR3 5870569352746779008",
    "Gaia BH3": "Gaia DR3 4318465066420528000",
    "MACHO-96-BLG-5": "MACHO 96-BLG-5",
    "MACHO-98-BLG-6": "MACHO 98-BLG-6",
    "MACHO-99-BLG-22": "MACHO 99-BLG-22",
    "GRO J1719-24": "V2293 Oph",
    "A0620-00 (V616 Mon)": "V616 Mon",
    "GRS 1124-683 (Nova Muscae 1991)": "GU Mus",
    "XTE J1118+480": "KV UMa",
    "Cygnus X-1": "Cyg X-1",
    "GRO J0422+32": "V518 Per",
    "GS 2000+25": "QZ Vul",
    "Cygnus X-3": "Cyg X-3",
    "GRO J1655-40": "V1033 Sco",
    "GX 339-4": "V821 Ara",
    "LB-1": "LS V +22 25",
    "NGC 3201 #21859": None,  # hvězdy z MUSE (Giesers+ 2018/2019), SIMBAD je pod tímto číslem nevede
    "NGC 3201 #12560": None,
    "XTE J1550-564": "V381 Nor",
    "GRS 1009-45 (MM Vel)": "MM Vel",
    "4U 1543-475": "IL Lup",
    "1E 1740.7-2942 (Velký anihilátor)": "1E 1740.7-2942",
    "GRS 1915+105": "V1487 Aql",
    "GS 1354-64 (BW Cir)": "BW Cir",
    "XTE J1859+226": "V406 Vul",
    "H 1705-25 (V2107 Oph)": "V2107 Oph",
    "Omega Centauri (IMBH)": "NGC 5139",
    "Sagittarius A*": "Sgr A*",
}

# Zrcadlo CfA: server CDS neposílá celý řetězec certifikátů a Python na Windows ho pak neověří.
SESAME = "https://vizier.cfa.harvard.edu/viz-bin/nph-sesame/-ox/S?"


def resolve(name: str):
    url = SESAME + urllib.parse.quote(name)
    with urllib.request.urlopen(url, timeout=30) as r:
        root = ET.fromstring(r.read())
    res = root.find(".//Resolver")
    if res is None or res.find("jradeg") is None:
        return None
    oname = res.findtext("oname") or name
    plx = res.find("plx")
    plx_mas = (float(plx.findtext("v")), float(plx.findtext("e") or "nan")) if plx is not None else None
    return float(res.findtext("jradeg")), float(res.findtext("jdedeg")), oname, plx_mas


def plx_txt(plx) -> str:
    """Paralaxa ze SIMBADu jen pro orientaci; u vzdáleností kpc je zatížená velkou relativní chybou."""
    if not plx or plx[0] <= 0:
        return ""
    v, e = plx
    return f"  plx {v:.3f}±{e:.3f} mas (1/plx ≈ {1000 / v * 3.261563777:,.0f} ly)".replace(",", " ")


def main():
    rows = []
    for n, rd, fr, *_rest in D:
        possrc = _rest[-1]
        sid = SIMBAD_ID.get(n, n)
        if sid is None:
            rows.append((n, possrc, "—", None, "SIMBAD objekt pod tímto číslem nevede"))
            continue
        try:
            got = resolve(sid)
        except Exception as e:  # síť, timeout
            rows.append((n, possrc, sid, None, f"chyba: {e}"))
            continue
        time.sleep(0.2)
        if got is None:
            rows.append((n, possrc, sid, None, "nenalezeno"))
            continue
        ra, dec, oname, plx = got
        ref = SkyCoord(ra=ra * u.deg, dec=dec * u.deg, frame="icrs")
        ours = galactic(rd, fr) if (rd or fr == "galname") else None
        sep = ours.separation(ref.galactic).arcsec if ours is not None else None
        rows.append((n, possrc, oname, sep, f"RA {ref.ra.to_string(u.hour, sep=' ', precision=2)}  Dec {ref.dec.to_string(sep=' ', precision=1, alwayssign=True)}{plx_txt(plx)}"))

    w = max(len(r[0]) for r in rows)
    for n, src, oname, sep, info in rows:
        s = "      ?" if sep is None else (f"{sep:7.1f}\"" if sep < 60 else f"{sep / 3600:6.2f}°")
        flag = "" if sep is None or sep < 5 else "  <-- ODCHYLKA"
        print(f"{n:<{w}}  {src:<10} {s}  {oname:<22} {info}{flag}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
