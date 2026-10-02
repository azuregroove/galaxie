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
| Ramena z dat Gaia (přepínač „Gaia“) | mřížky nadhustoty mladých hvězd ±6 kpc kolem Slunce, krok 0,1 kpc | Poggio et al. 2021, A&A 651, A104 (Gaia EDR3, horní hlavní posloupnost); Gaia Collaboration, Drimmel et al. 2023, A&A 674, A37 (Gaia DR3, OB) – mřížky z balíku SpiralMap 0.27, `pipeline/gaia_ramena.py`. Licence: balík včetně datových souborů pod MIT (LICENSE.md v balíku, copyright Prusty & Khanna 2025, ověřeno 2. 10. 2026); autoři žádají citovat arXiv:2506.11383 a jednotlivé modely. Licence dat Gaia (ESA) z cloudu neověřena. Orientace os ověřena: vzájemná korelace map 0,68 jen bez převrácení (převrácené 0,06–0,22), nadhustota kladná podél ramen Reid 2019 |
| Příčka | úhel ~27°, blízký konec v 1. kvadrantu (l > 0) | schematické, převzato z prototypu (opravena strana) – k ověření |
| Průměr disku, tloušťka disku | 87 400 ly; 700–1 500 ly (tenký), ~8 500 ly (tlustý) | převzato z prototypu, **k ověření v etapě 5** |

## Katalogy

### Exoplanety – NASA Exoplanet Archive, PSCompPars
- Web: https://exoplanetarchive.ipac.caltech.edu/ (TAP, tabulka `pscomppars`)
- Stav 29. 9. 2026: 6 372 planet, 6 344 se vzdáleností, 4 779 hostitelských systémů, nejvzdálenější 8 500 pc (ověřeno dotazem TAP).
- Stav 1. 10. 2026 (staženo 17:41 UTC z cloudu): 6 375 planet, 6 347 se vzdáleností, 4 780 systémů, nejvzdálenější 8 500 pc.
- Licence: veřejná data NASA/Caltech-IPAC. Archiv žádá citaci:
  > This research has made use of the NASA Exoplanet Archive, which is operated by the California Institute of Technology, under contract with the National Aeronautics and Space Administration under the Exoplanet Exploration Program.
- Znění ověřeno 2. 10. 2026 na https://exoplanetarchive.ipac.caltech.edu/docs/acknowledge.html; archiv navíc žádá citovat Christiansen et al. (2025), PSJ (nahrazuje Akeson et al. 2013).
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

### Popisy z české Wikipedie (karta objektu)
- Úvod článku z REST API cs Wikipedie (`/api/rest_v1/page/summary/`), načtený v prohlížeči až při otevření karty; nic se neukládá.
- Licence textu CC BY-SA 4.0; karta uvádí článek, odkaz na autory (historie stránky), licenci a že text může být zkrácený.
- Které objekty mají článek: odkazy na cs Wikipedii z Wikidata v `obrazky.json` (obrazky.py, u jasných hvězd obrazky_hvezdy.py podle HIP).

### 3D mapa prachu – Vergely, Lallement & Cox 2022 (`pipeline/prach.py` → `prach.json`, `prach-*.bin.gz`)
- Vergely J.-L., Lallement R., Cox N.L.J. 2022, A&A 664, A174 – CDS `J/A+A/664/A174`, adresář `fits/`
  (staženo 2. 10. 2026): kostky hustoty extinkce A0 (550 nm, mag/pc), X k centru, Y ve směru rotace, Z k severu.
  - `explore_cube_density_values_025pc_v2.fits` (601 × 601 × 81, krok 10 pc, rozlišení 25 pc, 6 × 6 × 0,8 kpc) → „Prach: 6 kpc“
  - `explore_cube_density_values_010pc_v2.fits` (601 × 601 × 161, krok 5 pc, rozlišení 10 pc, 3 × 3 × 0,8 kpc) → „Prach: 3 kpc“
- Zpracování: průměr bloků 2 × 2 × 2, log10 mezi −3,6 a −1,8 (mag/pc) do 6 bitů, gzip; pod −3,6 průhledné.
- Ověření orientace: 8 známých mračen (Taurus, Ophiuchus, Orion A, Perseus, Cepheus, Chamaeleon, Lupus, Aquila Rift)
  má bez prohození os 30–140× vyšší hustotu než medián kostky, s prohozením nebo převrácením os jen 1–13×.
- Poloha Slunce v hlavičce SUN_POS = 300,5 (resp. 40,5) – bráno jako střed pixelu 300 (mřížka souměrná); jiný výklad
  by znamenal posun o půl kroku (5 / 2,5 pc), pod rozlišením.
- Plánovaná mapa Edenhofer et al. 2024 (vyšší rozlišení do 1,25 kpc) je na Zenodo – z cloudu blokované; lze doplnit na PC.
- Vykreslení: raymarching v krychli (`src/scene/dust.ts`), průhlednost 1 − exp(−2,5 · A0 na úseku); barva a zesílení
  jsou ilustrační, nejde o simulaci skutečného zčervenání.
- Licence: CDS/VizieR (rights_uri https://cds.unistra.fr/vizier-org/licences_vizier.html – **text neověřen**, z cloudu blokované);
  citovat článek.

### Struktury okolí Slunce (`pipeline/okoli.py` → `okoli.json`, přepínač „Okolí“)
- Radcliffeova vlna: nejlepší model Konietzka R. et al. 2024, Nature, doi:10.1038/s41586-024-07127-3 – Harvard Dataverse
  doi:10.7910/DVN/F98QHY (CC0), 1 500 bodů → 300; barva čáry = svislá rychlost vz. Objev: Alves J. et al. 2020, Nature,
  doi:10.1038/s41586-019-1874-z (model doi:10.7910/DVN/OE51SZ, CC0, jen pro srovnání). Kontrola: model prochází 22–131 pc
  od North America, Cepheus, Cygnus X, CMa OB1, Orion A, Perseus, Taurus; délka 2 963 pc.
- Místní bublina: O'Neill T. J. et al. 2024, ApJ 973, 136 („The Local Bubble is a Local Chimney“), doi:10.7910/DVN/INB1RB (CC0),
  `ONeill2024_LocalBubble_ShellProperties_A0.5.fits` (HEALPix nside 256), sloupec d (vrchol hustoty obálky), medián v buňkách 4° × 4°
  → 75–550 pc, medián 175 pc. Vykreslená jako síť rovnoběžek po 12° a poledníků po 24°.
- Svazky a strany článků v Nature z cloudu neověřené (nature.com přesměrovává) → uvedeno DOI.
- **Gouldův pás vynechán:** Perrot & Grenier 2003 (A&A, astro-ph/0303516) udávají střed 104 pc směrem l = 180,4°, poloosy
  373 × 233 pc (v textu 354 × 232), sklon 17,2°, uzel l = 296,1°, ale natočení hlavní osy elipsy jen v obr. 5 – bez něj by elipsa byla odhad.

### Hvězdy do 100 pc – Gaia Catalogue of Nearby Stars (`pipeline/gaia100.py` → `gaia100.json`, `gaia100-*.bin.gz`)
- Gaia Collaboration, Smart R.L. et al. 2021, A&A 649, A6; CDS J/A+A/649/A6, tabulka `table1c` (331 312 objektů, ověřeno
  z metadat VizieR 2. 10. 2026). Astrometrie Gaia EDR3; čísla source_id jsou v DR3 stejná, proto v aplikaci „Gaia DR3 …“.
- Licence: katalog CDS/VizieR (podmínky CDS ověřit, viz checklist); data Gaia ESA/Gaia/DPAC – licenci dat Gaia ověřit
  (cosmos.esa.int z cloudu nedostupné).
- Vzdálenost = `Dist50` (medián posteriorního rozdělení z GCNS), nejistota `Dist16`–`Dist84`. Poloha x, y, z
  přepočtená z RA/Dec a Dist50 přes astropy; proti `xcoord50…` z katalogu medián odchylky 0,0025 pc, max 0,01 pc.
- **30 745 objektů má Dist50 nad 100 pc** (max 119,3 pc): katalog vybíral podle paralaxy, okraj je neostrý. Ponecháno
  celé, karta to u takových hvězd říká.
- Barva bodu podle BP−RP je orientační přechod; na spektrální třídy se nepřevádí (tabulka Pecaut & Mamajek ve VizieR
  sloupec BP−RP nemá, novější verze na webu autora je z cloudu nedostupná).
- „Pravděpodobně bílý trpaslík“ = WD_prob > 0,5 (hranice zvolená pro aplikaci, ne z článku): 21 848 objektů.
- RUWE nad 1,4 – v kartě poznámka; hranice 1,4 je běžně používaná v dokumentaci Gaia, článek zde neověřen.
- Velikost: grafika 2,35 MB (.bin.gz, načte se po zapnutí vrstvy), údaje karet 11 kousků po ~0,55 MB (načtou se po kliknutí).

### Sloupy stvoření – 3D rekonstrukce (`pipeline/sloupy.py` → `sloupy.json`, `sloupy.bin.gz`)
- **Rekonstrukce, ne měřený tvar.** 83 192 bodů, 469 kB.
- Obrys: tmavé pixely výřezu Pan-STARRS DR1 (HiPS `CDS/P/PanSTARRS/DR1/color-z-zg-g`, hips2fits 900 × 900 px, 0,36″/px,
  střed 274,712° / −13,835°). Podmínky použití Pan-STARRS ověřit (z cloudu nedostupné). Ze snímku se bere jen maska a jas.
- Označení P1a/P1b/P2/P3 a kdo je před a za hvězdami: McLeod et al. 2015 (MNRAS, doi:10.1093/mnras/stv680, odd. 4.2),
  Karim et al. 2023 (AJ, doi:10.3847/1538-3881/acff6c, arXiv:2309.14637). Hlava P1 (West I) ze Sofue 2020 tab. 1 leží ~30″
  od P1a v masce (rozlišení rádia 2,6′).
- Hloubky hrotů: Sofue 2020 (MNRAS 492, 5966; arXiv:2001.05623): vzdálenosti hrotů od HD 168076 2,6 / 3,2 / 3,6 pc, sklon
  spojnice k paprsku 47° / 40° / 40° při 2,0 kpc → přepočteno na 1 698 pc. Kontrola: promítnuté vzdálenosti hrotů od hvězdy
  v našem výřezu 1,87 / 1,80 / 2,0 pc ≈ Sofue × 0,85 ✓.
- **Předpoklady:** sklon os sloupů 30° (velikost neznámá, Karim 2023 určují jen znaménko); válcová tloušťka; hloubka P1b =
  hloubka základny P2 („Shared Base“, Karim 2023); barvy ilustrativní.
- Vzdálenost: NGC 6611 z mapy (Hunt & Reffert 2023, 1 698 pc); Stoop et al. 2023 (A&A 670, A108) dávají 1 706 ± 7 pc.
- HD 168076: poloha ze SIMBADu (Sesame); O5 V podle Sofue 2020.
- Obrázek v kartě: Webb NIRCam „Pillars of Creation (NIRCam Image).jpg“ z Commons (autor a licence se načítají z Commons API);
  Wikidata Q573260. Ručně doplněno v `pipeline/obrazky.py`.

### Halo temné hmoty (`src/scene/darkMatter.ts`, bez datového souboru)
- McMillan P.J. 2017, MNRAS, doi:10.1093/mnras/stw2759 (arXiv:1608.00971), tab. 3, hlavní model: NFW, ρ0,h = 0,00854 M☉/pc³,
  rh = 19,6 kpc, ρh,⊙ = 0,0101 M☉/pc³ (0,38 ± 0,04 GeV/cm³), Mv = 1,37 × 10¹² M☉, M∗ = 5,43 × 10¹⁰ M☉, R0 = 8,21 kpc
  (ověřeno z PDF na arXiv 2. 10. 2026).
- Přepočty v aplikaci: hmotnost uvnitř poloměru (vzorec NFW), viriální poloměr 228 kpc z Mv a 200 × ρcrit
  (H = 70,4 km/s/Mpc jako v článku, ρcrit = 137,5 M☉/kpc³), „0,7 kg v objemu Země“.
- Slupky v 8,21 / 19,6 / 50 kpc kolem centra mapy; model má R0 = 8,21 kpc, mapa 8,15 kpc.

### Písma (přibalená v aplikaci, `src/fonts.ts`)
- Chakra Petch, IBM Plex Sans, IBM Plex Mono – balíčky Fontsource (`@fontsource/*` 5.3), licence **SIL Open Font License 1.1**
  (pole `license` v package.json balíčků + soubor LICENSE v balíčku). Jen podmnožiny latin a latin-ext.
- Dřív se načítala z Google Fonts; přibalení kvůli offline režimu (etapa 7) a bez požadavků na Google.
