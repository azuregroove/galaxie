"""Černé díry z prototypu -> public/data/cerne-diry.json

Ruční seznam (Wikipedie, polohy ověřené SIMBADem, viz sloupec possrc) doplněný o kandidáty
z BlackCAT (Corral-Santana et al. 2016, CDS J/A+A/587/A61), kteří v seznamu nejsou.
Vzdálenosti jsou ve zdrojích v ly/kpc, do výstupu jdou v pc (d) a popisek (dl) v ly.
Použití:  python cerne_diry.py
"""
from __future__ import annotations

import astropy.units as u
from astropy.coordinates import FK4, SkyCoord

from common import DATA_DIR, LY_PER_PC, R0_PC, now_iso, write_json, update_manifest
from katalog import cds_table, val

R0_LY = R0_PC * LY_PER_PC
# name, cz, radec, frame, dist_ly (None=unknown), dist_label, mass_label, massnum, method, status, note, possrc
# possrc: 'wiki' = RA/Dec from Wikipedia; 'simbad' = SIMBAD via Sesame (overit_simbad.py, 2026-09-30); 'kupa' = centre of the host cluster
D=[
("Gaia BH1","17 28 41.09 -00 34 51.93","icrs",1560,"1 560","9,6–9,8",9.7,"spici","potvrzená","Nejbližší známá černá díra. Obíhá ji hvězda podobná Slunci s periodou 186 dní.","wiki"),
("Gaia BH3","19 39 18.72 +14 55 54.2","icrs",1880,"1 840–1 930","32,7",32.7,"spici","potvrzená","Nejhmotnější hvězdná černá díra v Galaxii. Průvodce je stará hvězda chudá na kovy, periodu má 11,6 roku.","wiki"),
("Gaia BH2","13 50 16.728 -59 14 20.42","icrs",3800,"3 800","8,9",8.9,"spici","potvrzená","Obíhá ji červený obr s periodou 3,5 roku.","wiki"),
("Gaia18ajz","18 30 14.460 -08 13 12.756","icrs",3800,"~3 800 (nejistá)","~12",12,"cocka","kandidát","Osamělá, prozradila ji mikročočka. Vzdálenost i hmotnost mají velké chyby.","wiki"),
("A0620-00 (V616 Mon)","06 22 44.503 -00 20 44.72","icrs",4100,"3 500–4 700","11",11,"rtg","potvrzená","Rentgenová nova z roku 1975. Nejbližší známá rentgenová dvojhvězda s černou dírou.","wiki"),
("OGLE-2011-BLG-0462","17 51 40.2082 -29 53 26.50","icrs",5150,"5 150","7,1",7.1,"cocka","potvrzená","První potvrzená úplně osamělá černá díra (Hubble + mikročočka, 2022).","wiki"),
("GRS 1124-683 (Nova Muscae 1991)","11 26 26.60 -68 40 32.3","icrs",5400,"5 400–17 000","7",7,"rtg","potvrzená","Zdroje uvádějí velmi rozdílné vzdálenosti. Na mapě je bližší hodnota.","wiki"),
("XTE J1118+480","11 18 11 +48 02 13","icrs",5900,"5 700–6 200","6–7",6.5,"rtg","potvrzená","Leží vysoko nad galaktickou rovinou, v halu.","wiki"),
("Cygnus X-1","19 58 21.676 +35 12 05.78","icrs",7300,"6 000–8 000","15–21",21,"rtg","potvrzená","Historicky první objevená černá díra. Průvodce je modrý veleobr.","wiki"),
("V404 Cygni","20 24 03.83 +33 52 02.2","icrs",7800,"7 800","9–12",10,"rtg","potvrzená","Vzdálenost změřená radiovou paralaxou. Mohutné vzplanutí v roce 2015.","wiki"),
("HD 130298","14 49 33.77 -56 25 38.5","icrs",7910,"7 900","> 7,7",7.7,"spici","potvrzená","Spící černá díra u hmotné hvězdy typu O.","simbad"),
("GRO J0422+32","04 21 42.723 +32 54 26.94","icrs",8300,"8 100–8 500","~4",4,"rtg","potvrzená","Jedna z nejlehčích známých černých děr.","wiki"),
("MACHO-96-BLG-5","18 05 02.50 -27 42 17","icrs",8150,"8 150","5,3",5.3,"cocka","silný kandidát","Osamělá, zjištěná mikročočkou ve směru k výduti.","wiki"),
("GRO J1719-24","17 19 36.92 -25 01 04.1","icrs",8500,"8 500","≥ 4,9",4.9,"rtg","kandidát","Optický protějšek je proměnná hvězda V2293 Oph.","simbad"),
("GS 2000+25","20 02 49.52 +25 14 10.6","icrs",8800,"8 800","7,5",7.5,"rtg","potvrzená","Rentgenová nova z roku 1988.","simbad"),
("Gaia18cbf","16 04 38.862 -41 06 17.32","icrs",9260,"~9 300 (velmi nejistá)","~2,7",2.7,"cocka","kandidát","Hmotnost padá do mezery mezi neutronovými hvězdami a černými dírami.","wiki"),
("MAXI J1820+070","18 20 21.942 +07 11 07.28","icrs",9800,"9 800","6,8",6.8,"rtg","potvrzená","Velmi jasné vzplanutí v roce 2018, radiová paralaxa.","wiki"),
("XTE J1650-500","16 50 00.98 -49 57 43.6","icrs",10763,"10 800","9,7",9.7,"rtg","potvrzená","Rentgenový tranzient objevený družicí RXTE.","simbad"),
("Swift J1727.8-1613","17 27 43.31 -16 12 19.1","icrs",11000,"11 000","3,1",3.1,"rtg","potvrzená","Objevena v roce 2023, velmi lehká černá díra.","simbad"),
("Cygnus X-3","20 32 25.766 +40 57 28.26","icrs",11100,"11 100","~2,4 (nejistá)",2.4,"rtg","nejistá","Kompaktní objekt u Wolf-Rayetovy hvězdy. Nemusí jít o černou díru, hmotnost je na hraně neutronové hvězdy.","wiki"),
("MACHO-98-BLG-6","17 57 32.80 -28 42 45","icrs",11400,"11 400","3,2",3.2,"cocka","silný kandidát","Osamělá, zjištěná mikročočkou, hmotnostní mezera.","wiki"),
("GRO J1655-40","16 54 00.137 -39 50 44.90","icrs",8500,"5 000–11 900","5,3–6,3",6,"rtg","potvrzená","Mikrokvasar s relativistickými výtrysky.","wiki"),
("GX 339-4","17 02 49.39 -48 47 23.1","icrs",15000,"15 000","5,8",5.8,"rtg","potvrzená","Optický protějšek je proměnná hvězda V821 Ara.","simbad"),
("LB-1","06 11 49.0763 +22 49 32.686","icrs",15000,"15 000","~7 (sporné)",7,"spici","zpochybněná","Původně ohlášena jako ~70 Sluncí, pozdější analýzy černou díru spíš vylučují.","wiki"),
("MACHO-99-BLG-22","18 05 05.28 -28 34 41.70","icrs",15700,"15 700","7,5",7.5,"cocka","silný kandidát","Osamělá, zjištěná mikročočkou.","wiki"),
("NGC 3201 #21859","10 17 36.82 -46 24 44.9","icrs",15700,"15 700","7,7",7.7,"spici","potvrzená","V kulové hvězdokupě NGC 3201.","kupa"),
("NGC 3201 #12560","10 17 36.82 -46 24 44.9","icrs",15700,"15 700","4,5",4.5,"spici","potvrzená","V kulové hvězdokupě NGC 3201.","kupa"),
("XTE J1550-564","15 50 58.66 -56 28 35.3","icrs",17000,"17 000","9,6",9.6,"rtg","potvrzená","Optický protějšek je proměnná hvězda V381 Nor.","simbad"),
("GRS 1009-45 (MM Vel)","10 13 36.34 -45 04 31.1","icrs",17200,"17 200","4,3",4.3,"rtg","potvrzená","Optický protějšek je proměnná hvězda MM Vel.","simbad"),
("4U 1543-475","15 47 08.277 -47 40 10.28","icrs",26800,"24 000–29 700","9,4",9.4,"rtg","potvrzená","Rentgenová nova. Průvodce je hvězda typu A.","wiki"),
("MAXI J1305-704","13 06 55.30 -70 27 05.1","icrs",24500,"24 500","8,9",8.9,"rtg","potvrzená","Rentgenový tranzient objevený přístrojem MAXI na ISS.","simbad"),
("V4641 Sgr","18 19 21.63427 -25 24 25.8493","icrs",29000,"24 000–40 000","7,1",7.1,"rtg","potvrzená","Jeden z nejrychlejších superluminálních výtrysků v Galaxii.","wiki"),
("1E 1740.7-2942 (Velký anihilátor)","17 43 54.72 -29 44 44.2","icrs",R0_LY,"≈ jako centrum Galaxie (~390 ly od Sgr A* v průmětu)","?",8,"rtg","kandidát","Leží v průmětu blízko centra Galaxie.","simbad"),
("GRS 1915+105","19 15 11.6 +10 56 44","icrs",40000,"40 000","14",14,"rtg","potvrzená","První objevený mikrokvasar v Galaxii, výtrysky zdánlivě rychlejší než světlo.","wiki"),
("GS 1354-64 (BW Cir)","13 58 09.72 -64 44 05.3","icrs",81500,"> 81 500 (minimum)","7,9",7.9,"rtg","potvrzená","Uvedená vzdálenost je jen spodní mez. Na mapě leží na okraji disku a dál.","simbad"),
("XTE J1859+226","18 58 41.49 +22 39 29.8","icrs",40770,"36 000–45 700","7,8",7.8,"rtg","potvrzená","Vzdálenost 12,5 ± 1,5 kpc podle katalogu BlackCAT.","simbad"),
("H 1705-25 (V2107 Oph)","17 08 14.51 -25 05 30.2","icrs",28050,"21 200–34 900","~7",7,"rtg","potvrzená","Rentgenová nova z roku 1977. Vzdálenost 8,6 ± 2,1 kpc podle katalogu BlackCAT.","simbad"),
("Omega Centauri (IMBH)","13 26 47.28 -47 28 46.1","icrs",15800,"15 800","≥ 8 200",8200,"imbh","kandidát","Kandidát na černou díru střední hmotnosti ve středu největší kulové hvězdokupy (2024). Výsledek je dál zpochybňován.","wiki"),
("Sagittarius A*","17 45 40.0409 -29 00 28.118","icrs",R0_LY,"≈ 26 600 (R₀ = 8,15 kpc, Reid 2019)","4,15 milionu",4.154e6,"smbh","potvrzená","Centrální supermasivní černá díra. Jen orientační bod, do počtu se nepočítá.","wiki"),
]


def galactic(rd: str, fr: str):
    if fr == "galname":
        return SkyCoord(l=339 * u.deg, b=-4 * u.deg, frame="galactic")
    if fr == "b1950name":
        return SkyCoord(rd, unit=(u.hourangle, u.deg), frame=FK4(equinox="B1950")).galactic
    return SkyCoord(rd, unit=(u.hourangle, u.deg), frame="icrs").galactic


BLACKCAT = "J/A+A/587/A61"
# BlackCAT a ruční seznam vedou tytéž objekty pod různými jmény; za shodu bereme polohu do 15".
# Víc ne: SWIFT J174540.2-290005 je samostatný tranzient 22" od Sgr A*.
MATCH_ARCSEC = 15


def ly_label(ly: float) -> str:
    step = 100 if ly < 20000 else 1000
    return f"{round(ly / step) * step:,.0f}".replace(",", " ")


def blackcat_rows(known):
    """Kandidáti z BlackCAT, kteří nejsou v ručním seznamu. known = SkyCoord ručních objektů."""
    t = cds_table(BLACKCAT, "tablea1.dat")
    rows, matched = [], []
    for r in t:
        name = val(r["Name"])
        ra = f"{val(r['RAh'])} {val(r['RAm'])} {val(r['RAs'])}"
        dec = f"{val(r['DE-'])}{val(r['DEd'])} {val(r['DEm'])} {val(r['DEs'])}"
        c = SkyCoord(ra, dec, unit=(u.hourangle, u.deg), frame="fk5")
        sep = c.separation(known).arcsec
        if sep.min() < MATCH_ARCSEC:
            matched.append((name, D[int(sep.argmin())][0], sep.min()))
            continue
        lim, dist, err = val(r["l_Dist"]), val(r["Dist"]), val(r["e_Dist"])
        year, ctp = val(r["Year"]), val(r["Ctp"])
        no = f"Rentgenový tranzient objevený v roce {year}, kandidát na černou díru (hmotnost změřená není)."
        if ctp:
            no += f" Jiné označení: {ctp.strip('()').replace('=', ', ')}."
        d_ly = dl = None
        if dist is not None and lim in (None, "~"):
            d_ly = dist * 1000 * LY_PER_PC
            if err is not None:
                dl = f"{ly_label(d_ly)} ± {ly_label(err * 1000 * LY_PER_PC)}"
            else:
                dl = ("~ " if lim == "~" else "") + ly_label(d_ly) + " (bez udané chyby)"
            if val(r["u_Dist"]) == ":":
                dl += " (nejistá)"
        elif dist is not None:
            no += f" Vzdálenost známe jen jako mez ({lim} {ly_label(dist * 1000 * LY_PER_PC)} ly), na mapě je jen směr."
        rows.append((name, c.icrs, d_ly, dl or "neznámá", "neurčena", 0, "kandidat", "kandidát", no, "blackcat"))
    return rows, matched


def main():
    cols = {k: [] for k in ["jmeno", "l", "b", "d", "dl", "ml", "m", "t", "s", "no", "src"]}
    known = [galactic(rd, fr) for _n, rd, fr, *_ in D]
    for (n, rd, fr, d_ly, dl, ml, mn, me, st, no, src), g in zip(D, known):
        for k, v in zip(cols, [n, round(g.l.deg, 3), round(g.b.deg, 3),
                               round(d_ly / LY_PER_PC, 1) if d_ly else None, dl, ml, mn, me, st, no, src]):
            cols[k].append(v)
    extra, matched = blackcat_rows(SkyCoord(known).icrs)
    for name, bc, ruc_sep in [(a, b, c) for a, b, c in matched]:
        print(f"  BlackCAT {name:<24} = {bc} ({ruc_sep:.1f}\")")
    for n, c, d_ly, dl, ml, mn, me, st, no, src in extra:
        g = c.galactic
        for k, v in zip(cols, [n, round(g.l.deg, 3), round(g.b.deg, 3),
                               round(d_ly / LY_PER_PC, 1) if d_ly else None, dl, ml, mn, me, st, no, src]):
            cols[k].append(v)
    print(f"BlackCAT: {len(matched)} už v seznamu, {len(extra)} nových kandidátů "
          f"({sum(1 for e in extra if e[2])} se vzdáleností)")
    stazeno = now_iso()
    out = {"schema": 1, "katalog": "cerne-diry", "jednotky": {"d": "pc", "dl": "ly", "m": "M_Slunce"},
           "stazeno": stazeno, "objekty": cols}
    path = DATA_DIR / "cerne-diry.json"
    size = write_json(path, out)
    n_all = len(cols["jmeno"])
    print(f"Hotovo: {n_all} objektů -> {path} ({size / 1024:.0f} kB)")
    update_manifest({
        "id": "cerne-diry", "soubor": path.name, "nazev": "Černé díry (ruční výběr + BlackCAT)",
        "zdroj": "Wikipedie (vzdálenosti, hmotnosti), SIMBAD (polohy), BlackCAT – Corral-Santana et al. 2016 (kandidáti)",
        "url": "https://cdsarc.cds.unistra.fr/viz-bin/cat/J/A+A/587/A61",
        "licence": "Fakta z Wikipedie (CC BY-SA 4.0); BlackCAT přes CDS/VizieR (podmínky CDS, citovat článek); texty poznámek vlastní",
        "citace": "Corral-Santana J. M. et al. 2016, A&A 587, A61 (bibcode 2016A&A...587A..61C, VizieR doi:10.26093/cds/vizier.35870061)",
        "poznamka": "Polohy ověřené proti SIMBADu (30. 9. 2026); 13 převzato přímo ze SIMBADu, 2 hvězdy v NGC 3201 mají polohu středu kupy.",
        "objektu": n_all, "stazeno": stazeno,
    })


if __name__ == "__main__":
    main()
