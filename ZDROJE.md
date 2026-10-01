# Zdroje dat a licence

Evidence katalogů, ze kterých mapa čerpá. Aktualizovat s každým novým katalogem.

## Konstanty

| Veličina | Hodnota | Zdroj |
|---|---|---|
| Vzdálenost Slunce od centra R₀ | 8,15 ± 0,15 kpc (≈ 26 580 ly) | Reid et al. 2019, ApJ 885, 131 ([arXiv:1910.03357](https://arxiv.org/abs/1910.03357)) |
| Severní pól ekliptiky | l = 96,385°, b = 29,806° | přepočet astropy (prototyp) |
| Spirální ramena | 7 ramen, logaritmické spirály se zlomem (β_kink, R_kink, ψ<, ψ>, šířka, rozsah β) | Reid et al. 2019, tab. 2 – **převzato z knihovny SpiralMap 0.27** (Prusty & Khanna 2025, MIT, https://github.com/Abhaypru/SpiralMap), článek z cloudu nedostupný; ověřeno proti maserům z tab. 1 (CDS J/ApJ/885/131, `pipeline/overit_ramena.py`), Perseus navíc shodně citován v práci o rameni Persea (2026, ApJ, doi:10.3847/1538-4357/ae64f5). **Ověřit přímo v článku na PC.** |
| Obyvatelná zóna | S_eff(Teff) – polynom 4. stupně, konzervativní (runaway – maximum greenhouse) a optimistická (recent Venus – early Mars); L = R² (Teff / 5772 K)⁴ | Kopparapu et al. 2014, ApJ 787, L29 – koeficienty z původního kódu autorů, CDS J/ApJ/787/L29 (`HZs.f90`); kontrola: Slunce 0,95–1,68 au. Platí 2 600–7 200 K, do ±200 K extrapolováno s označením |
| Velikostní třídy planet | Země < 1,25 R⊕ ≤ super-Země < 2 ≤ Neptun < 6 ≤ Jupiter < 15 ≤ větší | Borucki et al. 2011, ApJ 736, 19 (abstrakt, ADS 2011ApJ...736...19B) |
| Rychlost Voyageru 1 (doba cesty v kartě) | 16,92 km/s vůči Slunci | JPL Horizons, cíl −31, vektory vůči Slunci (500@10) k 1. 10. 2026; auto 100 km/h a letadlo 900 km/h jsou zvolené ilustrační hodnoty |
| Světelný rok | 9 460 730 472 580,8 km | IAU (juliánský rok × c) |
| Ramena z dat Gaia (přepínač „Gaia“) | mřížky nadhustoty mladých hvězd ±6 kpc kolem Slunce, krok 0,1 kpc | Poggio et al. 2021, A&A 651, A104 (Gaia EDR3, horní hlavní posloupnost); Gaia Collaboration, Drimmel et al. 2023, A&A 674, A37 (Gaia DR3, OB) – mřížky z balíku SpiralMap 0.27 (MIT), `pipeline/gaia_ramena.py`; **licence samotných map neověřena**. Orientace os ověřena: vzájemná korelace map 0,68 jen bez převrácení (převrácené 0,06–0,22), nadhustota kladná podél ramen Reid 2019 |
| Příčka | úhel ~27°, blízký konec v 1. kvadrantu (l > 0) | schematické, převzato z prototypu (opravena strana) – k ověření |
| Průměr disku, tloušťka disku | 87 400 ly; 700–1 500 ly (tenký), ~8 500 ly (tlustý) | převzato z prototypu, **k ověření v etapě 5** |

## Katalogy

### Exoplanety – NASA Exoplanet Archive, PSCompPars
- Web: https://exoplanetarchive.ipac.caltech.edu/ (TAP, tabulka `pscomppars`)
- Stav 29. 9. 2026: 6 372 planet, 6 344 se vzdáleností, 4 779 hostitelských systémů, nejvzdálenější 8 500 pc (ověřeno dotazem TAP).
- Licence: veřejná data NASA/Caltech-IPAC. Archiv žádá citaci:
  > This research has made use of the NASA Exoplanet Archive, which is operated by the California Institute of Technology, under contract with the National Aeronautics and Space Administration under the Exoplanet Exploration Program.
- Pozor: PSCompPars skládá parametry z více publikací, nemusí být vzájemně konzistentní. Hvězdné parametry
  bereme z první vyplněné planety systému (abecedně).
- Poloha: RA/Dec → l, b přes astropy (kontrola proti `glon/glat` archivu, tolerance 0,01°), vzdálenost `sy_dist`.

### Černé díry – ruční výběr z prototypu + BlackCAT
- Ruční seznam (39 objektů): vzdálenosti a hmotnosti z Wikipedie (CC BY-SA 4.0).
- Polohy ověřené proti SIMBADu přes CDS Sesame (zrcadlo `vizier.cds.unistra.fr`, 30. 9. 2026, `pipeline/overit_simbad.py`):
  položky z Wikipedie sedí do ~2″; 13 poloh (dřív odvozených z označení nebo nepřesných) převzato přímo ze SIMBADu
  (possrc `simbad`); dvě hvězdy v NGC 3201 mají polohu středu kupy (possrc `kupa`).
- Kandidáti: BlackCAT – Corral-Santana J. M. et al. 2016, A&A 587, A61 (bibcode 2016A&A...587A..61C),
  CDS `J/A+A/587/A61`, tabulka `tablea1.dat` (57 rentgenových tranzientů, VizieR doi:10.26093/cds/vizier.35870061).
  18 se shoduje s ručním seznamem (poloha do 15″), 39 nových je v mapě jako „Kandidát“, 14 z nich se vzdáleností.
  Vzdálenost bereme jen bez meze nebo s „~“; meze („<“, „>“) jsou jen v textu karty.
  Z BlackCATu jsou i vzdálenosti XTE J1859+226 (12,5 ± 1,5 kpc) a H 1705-25 (8,6 ± 2,1 kpc).
- Pozor: verze ve VizieR je stav 2016; web BlackCAT s novějšími objekty je z cloudu nedostupný.
- Licence VizieR: metadata odkazují na https://cds.unistra.fr/vizier-org/licences_vizier.html – **text neověřen** (stránka z cloudu nedostupná).
- Sgr A* a 1E 1740.7-2942 umístěny do vzdálenosti R₀.

### Sluneční soustava – NASA/JPL Solar System Dynamics
- Planety: Keplerovské elementy pro přibližné polohy planet, tabulka 1 (1800–2050, E. M. Standish),
  https://ssd.jpl.nasa.gov/planets/approx_pos.html. Proti JPL Horizons k 30. 9. 2026: odchylka směru 0,06′ (Merkur) až 4,4′ (Saturn).
- Poloměry planet: https://ssd.jpl.nasa.gov/planets/phys_par.html (střední poloměr); Slunce a Pluto z Horizons.
- Trpasličí planety (Ceres, Pluto, Eris, Haumea, Makemake): SBDB API, oskulační elementy v plné přesnosti; průměr jen Ceres.
- Měsíce (459): seznam, periody a poloměry (46) ze https://ssd.jpl.nasa.gov/sats/elem/ a /sats/phys_par/;
  dráhy z Horizons (oskulační elementy k 2026-01-01, 2026-01-11, 2027-01-01 vůči ekliptice J2000 → střední pohyb
  a stáčení uzlu). Tabulkové střední elementy samotné nesedí u Saturnových měsíců ani k epoše (Titan ~157°),
  proto jen záloha (1 měsíc: Daphnis). Kontrola 25 náhodných měsíců: dnes do 6,4°, za 5 let malé nepravidelné až desítky stupňů.
- **Licence: FAQ JPL SSD na otázku „chci zveřejnit informace z vašeho webu na svém, potřebuji svolení?“ odpovídá
  „The short answer is yes“** a odkazuje na copyright JPL (https://www.jpl.nasa.gov/copyrights.cfm – z cloudu nedostupné).
  **Před zveřejněním (etapa 6) napsat JPL SSD** a popsat použití; do té doby jen lokální vývoj.
- Planetky a komety (vzorek 3 187 těles, `pipeline/mala_telesa.py`): SBDB Query API
  (https://ssd-api.jpl.nasa.gov/doc/sbdb_query.html), oskulační heliocentrické elementy vůči ekliptice J2000, plná přesnost.
  Výběr po skupinách (podle samotného H by vyšla skoro jen TNO): hlavní pás a okolí H ≤ 11 (1 185, bez Ceres),
  NEO H ≤ 17,75 (883), trojáni H ≤ 11 (214), kentauři H ≤ 10 (154), TNO H ≤ 5,5 (232, bez trpasličích planet),
  všechny číslované komety bez úlomků (516), 38 ručně vybraných (cíle sond, slavné komety), z toho 3 mezihvězdná tělesa.
  Třídy drah podle https://ssd-api.jpl.nasa.gov/doc/sbdb_filter.html.
  540 těles se starou epochou (hlavně komety, dráha k poslednímu průchodu přísluním) má elementy z Horizons k 2026-01-01.
  Kontrola 14 těles proti Horizons (`--overit`): k 30. 9. 2026 do 0,3′; roky 2016/2036 obvykle do jednotek až desítek ′,
  1990/2050 až stupně; Apophis po průletu u Země 2029 a 67P mimo o desítky stupňů (dvoučásticový model bez poruch).
  ʻOumuamua: Horizons elementy nevrátil, použita dráha ze SBDB. MPC (minorplanetcenter.net) je z cloudu blokované.
  Licence: stejná jako u ostatních dat JPL SSD (viz výše – svolení před zveřejněním).

### Spektrální třídy hvězd – Pecaut & Mamajek 2013
- Pecaut M. J., Mamajek E. E. 2013, ApJS 208, 9 – CDS `J/ApJS/208/9`, tabulka 5 (Teff trpaslíků O9V–M9V).
- Použití: odhad třídy hostitelské hvězdy exoplanet z Teff, když archiv nemá spektrální typ (`src/core/starClass.ts`).
  Hranice = střed mezi posledním podtypem třídy a prvním podtypem další. Platí pro hlavní posloupnost, u obrů jen přibližně.
- Barvy tříd v mapě jsou orientační konvence, ne výpočet.

### Hvězdokupy – Hunt & Reffert 2023; Baumgardt & Vasiliev 2021
- Otevřené kupy a pohybové skupiny: Hunt E.L., Reffert S. 2023, A&A 673, A114 – CDS `J/A+A/673/A114`, tabulka `clusters.dat`
  (7 167 řádků, stav 29. 9. 2026). Vzdálenost = medián (dist50), meze 16. a 84. percentil. Kulové kupy (typ g, 121)
  vynechány ve prospěch Baumgardta. Filtr „spolehlivá“ = CST ≥ 5 a CMD ≥ 0,5: dává 4 105 kup na celém katalogu,
  abstrakt uvádí 4 114 vysoce spolehlivých – **přesná kritéria autorů neověřena**.
- Kulové kupy: Baumgardt H., Vasiliev E. 2021, MNRAS 505, 5957 – tabulky `orbits_table.txt` a `combined_table.txt`
  z https://people.smp.uq.edu.au/HolgerBaumgardt/globular/ (165 kup se vzdáleností).
- Licence: CDS – **podmínky použití z cloudu neověřeny** (stránka cds.unistra.fr nedostupná, metadata katalogu licenci neuvádí);
  Baumgardt – data volně zveřejněná bez výslovné licence, citovat publikace.

### Mlhoviny a mračna (vše přes CDS/VizieR)
- Oblasti H II: Anderson L.D. et al. 2014, ApJS 212, 1 – `J/ApJS/212/1` (8 399 objektů, vzdálenost u 1 413;
  většinou kinematická). Bez vzdálenosti bereme jen třídu K (známé oblasti).
- Sharpless S. 1959, ApJS 4, 257 – `VII/20` (313). Párování s WISE podle jména (S184) a polohy (střed Sh2 uvnitř poloměru WISE).
- Lynds B.T. 1965 (světlé, `VII/9`, 1 125) a 1962 (temné, `VII/7A`, 1 791) – bez vzdáleností, jen v seznamu.
- Molekulová mračna: Zucker C. et al. 2020, A&A 633, A51 – `J/A+A/633/A51` (94 mračen, 326 směrů; vzdálenost = medián d50 směrů).
- Planetární mlhoviny: González-Santamaría I. et al. 2021, A&A 656, A51 – `J/A+A/656/A51` (2 035 centrálních hvězd,
  vzdálenost z paralaxy u 405). HASH (Parker et al. 2016) z cloudu nedostupný (přesměrování na IP adresu).
- Pozůstatky supernov: Green D.A. 2025 – `VII/297` (310), vzdálenosti katalog neobsahuje.

### Neutronové hvězdy
- Pulsary: ATNF Pulsar Catalogue (Manchester R.N. et al. 2005, AJ 129, 1993). Pipeline zkouší aktuální verzi přes psrqpy;
  z cloudu ATNF nedostupný, proto **v datech je kopie 2016-May z CDS (`B/psr`, 2 536 pulsarů)** – na PC přegenerovat.
  Dělení na milisekundové podle P < 30 ms je zjednodušení.
- Magnetary: McGill Online Magnetar Catalog, Olausen S.A., Kaspi V.M. 2014, ApJS 212, 6 – `TabO1.csv`
  (31 objektů, poslední úprava 17. 11. 2020). Autoři: volné použití s citací článku a odkazem na
  http://www.physics.mcgill.ca/~pulsar/magnetar/main.html.

### Obrázky – Wikidata + Wikimedia Commons
- `pipeline/obrazky.py`: Wikidata Query Service, vlastnost P18 (obrázek), P528 (katalogové kódy), P6257/P6258 (RA/Dec), P397 (rodičovské těleso).
  Data Wikidata jsou CC0. Ukládá se jen QID a název souboru, obrázky se nestahují.
- Každý soubor na Commons má vlastní licenci a autora; aplikace je čte z Commons API (extmetadata) a bez nich obrázek nezobrazí.
- Typy (P31) ověřené 30. 9. 2026 na známých objektech; párování s kontrolou polohy. Vyřazeno: Q16839981 (obrázek jiného objektu).

### Výřezy oblohy – CDS hips2fits + DSS2
- Služba: https://alasky.cds.unistra.fr/hips-image-services/hips2fits (záloha alaskybis). CDS žádá citaci:
  „This research made use of hips2fits, a service provided by CDS.“
- Přehlídka: `CDS/P/DSS2/color`. Z popisu HiPS (https://alasky.cds.unistra.fr/DSS/DSSColor/properties, 30. 9. 2026):
  obs_copyright „Digitized Sky Survey - STScI/NASA, Colored & Healpixed by CDS“, obs_copyright_url http://archive.stsci.edu/dss/copyright.html.
  Poděkování (obs_ack): „The Digitized Sky Surveys were produced at the Space Telescope Science Institute under U.S. Government grant NAG W-2166. …“
- **Podmínky užití DSS neověřené** – stránka STScI je z cloudu blokovaná. Ověřit před zveřejněním (etapa 6).

### Vlastní jména – Wikidata (`pipeline/jmena.py` → `jmena.json`)
- Jména hvězd a exoplanet schválená IAU: Wikidata, P2561 (jméno) s kvalifikátorem P3938 (pojmenoval) = IAU (Q6867),
  dotaz WDQS 1. 10. 2026: 281 jmen; napárováno 114 hvězd a 133 planet ve 128 systémech (katalogová označení P528,
  záložně poloha do 0,02°). Většina nenapárovaných jsou jasné hvězdy bez exoplanet v PSCompPars.
- **Neúplné:** na Wikidata chybí u části jmen kvalifikátor „pojmenoval IAU“ (např. Ran a Ægir u ε Eri, Draugr u PSR B1257+12 b).
  Oficiální seznam WGSN (iau.org, exopla.net) je z cloudu nedostupný – na PC stáhnout a doplnit.
- Česká jména (Plejády, Mlhovina Srdce…) a „M45“: české štítky a názvy cs Wikipedie z `obrazky.json` (125 objektů);
  jména obsahující „pulsar“ se u jiných vrstev nepřebírají (Krabí mlhovina měla položku pulsaru).
- Licence: Wikidata CC0.

### Jasné hvězdy – Hipparcos + Yale BSC5 (`pipeline/hvezdy.py` → `hvezdy.json`)
- Výběr V ≤ 4,5 mag z Hipparcos (ESA 1997, CDS I/239/hip_main): 909 hvězd; paralaxy z nové redukce (van Leeuwen 2007,
  A&A 474, 653, CDS I/311), 907 s kladnou paralaxou; dotazy VizieR ASU 1. 10. 2026.
- Spektrální typ a Bayerovo/Flamsteedovo označení, číslo HR: Yale Bright Star Catalogue 5. vyd. (Hoffleit & Warren 1991, CDS V/50),
  párování přes HD; u Capelly dává Hipparcos chybný typ „M1: comp“, BSC5 „G5IIIe+G0III“.
- Jména: české/anglické štítky Wikidata podle P528 „HIP n“ (190 s českým jménem); jinak Bayer, Flamsteed, HR.
- Kontrola: Sirius 8,5 ly, Vega 25,1 ly, Deneb 1 412 ly, Polárka 433 ly (Hipparcos; jiné metody dávají Polárce ~320–430 ly).
- Licence: data CDS s citací (podmínky CDS neověřené), Wikidata CC0.


### Výlety s komentářem (`public/data/vylety.json`, kontrola `pipeline/overit_vylety.py`)
- Texty napsané pro tuto mapu (Klouí, 1. 10. 2026), zdroj uvedený u každé zastávky. Vzdálenosti a doba cesty Voyagerem
  se doplňují z dat objektu ({d}, {pc}, {voyager}); ostatní čísla převzatá z našich datových souborů (PSCompPars, Hipparcos/BSC5,
  seznam černých děr) a ručně přepsaná do textu – po aktualizaci dat zkontrolovat.
- Navíc ověřeno 1. 10. 2026: vlastní pohyb Barnardovy hvězdy 10 359 mas/rok = největší v Hipparcos (van Leeuwen 2007, VizieR I/311,
  dotaz na |pm| > 3 000 mas/rok); Sirius B = bílý trpaslík, spektrální typ DA1.9 (SIMBAD přes Sesame).
  Teplota Slunce 5 772 K (IAU 2015 B3), Merkur a = 0,387 au (Standish, viz Sluneční soustava).
- Výlety 3–5: ramena – vzdálenosti Místního ramene (střed 0,38 kpc vně), Střelce–Kýlu (1,35 kpc dovnitř, β = 2°) a Persea
  (1,92 kpc vně) spočtené ze vzorce a parametrů v src/scene/arms.ts; počty kulových hvězdokup a planet v obyvatelné zóně
  spočtené z našich dat 1. 10. 2026; hustota LHS 1140 b = m/r³ z PSCompPars.
- Wikipedie z cloudu nedostupná – texty z ní nepřebírané.
