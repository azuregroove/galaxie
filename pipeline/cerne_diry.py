"""Černé díry z prototypu -> public/data/cerne-diry.json

Seznam je ručně sestavený (Wikipedie, katalogová označení), viz sloupec possrc.
Vzdálenosti jsou ve zdrojích v ly, do výstupu jdou v pc (d) a původní popisek (dl) zůstává v ly.
Použití:  python cerne_diry.py
"""
from __future__ import annotations

import astropy.units as u
from astropy.coordinates import FK4, SkyCoord

from common import DATA_DIR, LY_PER_PC, R0_PC, now_iso, write_json, update_manifest

R0_LY = R0_PC * LY_PER_PC
# name, cz, radec, frame, dist_ly (None=unknown), dist_label, mass_label, massnum, method, status, note, possrc
# possrc: 'wiki' = RA/Dec from Wikipedia; 'j2000name' = from J2000 designation; 'b1950name' = from B1950 designation; 'galname' = GX galactic designation; 'memory' = unverified
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
("HD 130298","14 49 33.7 -56 25 38","icrs",7910,"7 900","> 7,7",7.7,"spici","potvrzená","Spící černá díra u hmotné hvězdy typu O. Souřadnice z paměti, neověřené.","memory"),
("GRO J0422+32","04 21 42.723 +32 54 26.94","icrs",8300,"8 100–8 500","~4",4,"rtg","potvrzená","Jedna z nejlehčích známých černých děr.","wiki"),
("MACHO-96-BLG-5","18 05 02.50 -27 42 17","icrs",8150,"8 150","5,3",5.3,"cocka","silný kandidát","Osamělá, zjištěná mikročočkou ve směru k výduti.","wiki"),
("GRO J1719-24","17 19 00 -24 00 00","j2000name",8500,"8 500","≥ 4,9",4.9,"rtg","kandidát","Poloha odvozená z katalogového označení (přesnost zhruba 1°).","j2000name"),
("GS 2000+25","20 02 50 +25 14 11","icrs",8800,"8 800","7,5",7.5,"rtg","potvrzená","Rentgenová nova z roku 1988.","wiki"),
("Gaia18cbf","16 04 38.862 -41 06 17.32","icrs",9260,"~9 300 (velmi nejistá)","~2,7",2.7,"cocka","kandidát","Hmotnost padá do mezery mezi neutronovými hvězdami a černými dírami.","wiki"),
("MAXI J1820+070","18 20 21.942 +07 11 07.28","icrs",9800,"9 800","6,8",6.8,"rtg","potvrzená","Velmi jasné vzplanutí v roce 2018, radiová paralaxa.","wiki"),
("XTE J1650-500","16 50 00 -50 00 00","j2000name",10763,"10 800","9,7",9.7,"rtg","potvrzená","Poloha odvozená z katalogového označení.","j2000name"),
("Swift J1727.8-1613","17 27 46.0 -16 12 05.3","icrs",11000,"11 000","3,1",3.1,"rtg","potvrzená","Objevena v roce 2023, velmi lehká černá díra.","wiki"),
("Cygnus X-3","20 32 25.766 +40 57 28.26","icrs",11100,"11 100","~2,4 (nejistá)",2.4,"rtg","nejistá","Kompaktní objekt u Wolf-Rayetovy hvězdy. Nemusí jít o černou díru, hmotnost je na hraně neutronové hvězdy.","wiki"),
("MACHO-98-BLG-6","17 57 32.80 -28 42 45","icrs",11400,"11 400","3,2",3.2,"cocka","silný kandidát","Osamělá, zjištěná mikročočkou, hmotnostní mezera.","wiki"),
("GRO J1655-40","16 54 00.137 -39 50 44.90","icrs",8500,"5 000–11 900","5,3–6,3",6,"rtg","potvrzená","Mikrokvasar s relativistickými výtrysky.","wiki"),
("GX 339-4","","galname",15000,"15 000","5,8",5.8,"rtg","potvrzená","Poloha odvozená z galaktického označení (l=339°, b=−4°).","galname"),
("LB-1","06 11 49.0763 +22 49 32.686","icrs",15000,"15 000","~7 (sporné)",7,"spici","zpochybněná","Původně ohlášena jako ~70 Sluncí, pozdější analýzy černou díru spíš vylučují.","wiki"),
("MACHO-99-BLG-22","18 05 05.28 -28 34 41.70","icrs",15700,"15 700","7,5",7.5,"cocka","silný kandidát","Osamělá, zjištěná mikročočkou.","wiki"),
("NGC 3201 #21859","10 17 36.82 -46 24 44.9","icrs",15700,"15 700","7,7",7.7,"spici","potvrzená","V kulové hvězdokupě NGC 3201. Poloha je střed hvězdokupy.","wiki"),
("NGC 3201 #12560","10 17 36.82 -46 24 44.9","icrs",15700,"15 700","4,5",4.5,"spici","potvrzená","V kulové hvězdokupě NGC 3201. Poloha je střed hvězdokupy.","wiki"),
("XTE J1550-564","15 50 00 -56 40 00","j2000name",17000,"17 000","9,6",9.6,"rtg","potvrzená","Poloha odvozená z katalogového označení.","j2000name"),
("GRS 1009-45 (MM Vel)","10 09 00 -45 00 00","b1950name",17200,"17 200","4,3",4.3,"rtg","potvrzená","Poloha odvozená z katalogového označení (B1950).","b1950name"),
("4U 1543-475","15 47 08.277 -47 40 10.28","icrs",26800,"24 000–29 700","9,4",9.4,"rtg","potvrzená","Rentgenová nova. Průvodce je hvězda typu A.","wiki"),
("MAXI J1305-704","13 05 00 -70 24 00","j2000name",24500,"24 500","8,9",8.9,"rtg","potvrzená","Poloha odvozená z katalogového označení.","j2000name"),
("V4641 Sgr","18 19 21.63427 -25 24 25.8493","icrs",29000,"24 000–40 000","7,1",7.1,"rtg","potvrzená","Jeden z nejrychlejších superluminálních výtrysků v Galaxii.","wiki"),
("1E 1740.7-2942 (Velký anihilátor)","17 40 42 -29 42 00","b1950name",R0_LY,"≈ jako centrum Galaxie (~340 ly od Sgr A* v průmětu)","?",8,"rtg","kandidát","Leží blízko centra Galaxie. Poloha odvozená z katalogového označení.","b1950name"),
("GRS 1915+105","19 15 11.6 +10 56 44","icrs",40000,"40 000","14",14,"rtg","potvrzená","První objevený mikrokvasar v Galaxii, výtrysky zdánlivě rychlejší než světlo.","wiki"),
("GS 1354-64 (BW Cir)","13 54 00 -64 00 00","b1950name",81500,"> 81 500 (minimum)","7,9",7.9,"rtg","potvrzená","Uvedená vzdálenost je jen spodní mez. Na mapě leží na okraji disku a dál.","b1950name"),
("XTE J1859+226","18 59 00 +22 36 00","j2000name",None,"neznámá","7,8",7.8,"rtg","potvrzená","Vzdálenost není spolehlivě známá. Na mapě je jen směr pohledu.","j2000name"),
("H 1705-25 (V2107 Oph)","17 05 00 -25 00 00","b1950name",None,"neznámá","~7",7,"rtg","potvrzená","Vzdálenost není spolehlivě známá. Na mapě je jen směr pohledu.","b1950name"),
("Omega Centauri (IMBH)","13 26 47.28 -47 28 46.1","icrs",15800,"15 800","≥ 8 200",8200,"imbh","kandidát","Kandidát na černou díru střední hmotnosti ve středu největší kulové hvězdokupy (2024). Výsledek je dál zpochybňován.","wiki"),
("Sagittarius A*","17 45 40.0409 -29 00 28.118","icrs",R0_LY,"≈ 26 600 (R₀ = 8,15 kpc, Reid 2019)","4,15 milionu",4.154e6,"smbh","potvrzená","Centrální supermasivní černá díra. Jen orientační bod, do počtu se nepočítá.","wiki"),
]


def galactic(rd: str, fr: str):
    if fr == "galname":
        return SkyCoord(l=339 * u.deg, b=-4 * u.deg, frame="galactic")
    if fr == "b1950name":
        return SkyCoord(rd, unit=(u.hourangle, u.deg), frame=FK4(equinox="B1950")).galactic
    return SkyCoord(rd, unit=(u.hourangle, u.deg), frame="icrs").galactic


def main():
    cols = {k: [] for k in ["jmeno", "l", "b", "d", "dl", "ml", "m", "t", "s", "no", "src"]}
    for n, rd, fr, d_ly, dl, ml, mn, me, st, no, src in D:
        g = galactic(rd, fr)
        for k, v in zip(cols, [n, round(g.l.deg, 3), round(g.b.deg, 3),
                               round(d_ly / LY_PER_PC, 1) if d_ly else None, dl, ml, mn, me, st, no, src]):
            cols[k].append(v)
    stazeno = now_iso()
    out = {"schema": 1, "katalog": "cerne-diry", "jednotky": {"d": "pc", "dl": "ly", "m": "M_Slunce"},
           "stazeno": stazeno, "objekty": cols}
    path = DATA_DIR / "cerne-diry.json"
    size = write_json(path, out)
    print(f"Hotovo: {len(D)} objektů -> {path} ({size / 1024:.0f} kB)")
    update_manifest({
        "id": "cerne-diry", "soubor": path.name, "nazev": "Černé díry (ruční výběr z prototypu)",
        "zdroj": "Wikipedie (souřadnice RA/Dec, vzdálenosti, hmotnosti), katalogová označení",
        "licence": "Fakta z Wikipedie (CC BY-SA 4.0); texty poznámek vlastní",
        "poznamka": "HD 130298 má souřadnice neověřené; 11 objektů má polohu odvozenou z označení.",
        "objektu": len(D), "stazeno": stazeno,
    })


if __name__ == "__main__":
    main()
