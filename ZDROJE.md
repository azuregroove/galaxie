# Zdroje dat a licence

Evidence katalogů, ze kterých mapa čerpá. Aktualizovat s každým novým katalogem.

## Konstanty

| Veličina | Hodnota | Zdroj |
|---|---|---|
| Vzdálenost Slunce od centra R₀ | 8,15 ± 0,15 kpc (≈ 26 580 ly) | Reid et al. 2019, ApJ 885, 131 ([arXiv:1910.03357](https://arxiv.org/abs/1910.03357)) |
| Severní pól ekliptiky | l = 96,385°, b = 29,806° | přepočet astropy (prototyp) |
| Spirální ramena | 7 ramen, logaritmické spirály se zlomem (β_kink, R_kink, ψ<, ψ>, šířka, rozsah β) | Reid et al. 2019, tab. 2 – **převzato z knihovny SpiralMap 0.27** (Prusty & Khanna 2025, MIT, https://github.com/Abhaypru/SpiralMap), **10. 10. 2026 ověřeno přímo v článku** (arXiv:1910.03357, tab. 2 na s. 44 – všech 7 ramen souhlasí ve všech sloupcích, model předpokládá R0 = 8,15 kpc); ověřeno i proti maserům z tab. 1 (CDS J/ApJ/885/131, `pipeline/overit_ramena.py`), Perseus navíc shodně citován v práci o rameni Persea (2026, ApJ, doi:10.3847/1538-4357/ae64f5). |
| Obyvatelná zóna | S_eff(Teff) – polynom 4. stupně, konzervativní (runaway – maximum greenhouse) a optimistická (recent Venus – early Mars); L = R² (Teff / 5772 K)⁴ | Kopparapu et al. 2014, ApJ 787, L29 – koeficienty z původního kódu autorů, CDS J/ApJ/787/L29 (`HZs.f90`); kontrola: Slunce 0,95–1,68 au. Platí 2 600–7 200 K, do ±200 K extrapolováno s označením |
| Velikostní třídy planet | Země < 1,25 R⊕ ≤ super-Země < 2 ≤ Neptun < 6 ≤ Jupiter < 15 ≤ větší | Borucki et al. 2011, ApJ 736, 19 (abstrakt, ADS 2011ApJ...736...19B) |
| Rychlost Voyageru 1 (doba cesty v kartě) | 16,92 km/s vůči Slunci | JPL Horizons, cíl −31, vektory vůči Slunci (500@10) k 1. 10. 2026 (auto a letadlo z karty odebrány 3. 10. – Ráďa) |
| Světelný rok | 9 460 730 472 580,8 km | IAU (juliánský rok × c) |
| Ramena z dat Gaia (přepínač „Gaia“) | mřížky nadhustoty mladých hvězd ±6 kpc kolem Slunce, krok 0,1 kpc | Poggio et al. 2021, A&A 651, A104 (Gaia EDR3, horní hlavní posloupnost); Gaia Collaboration, Drimmel et al. 2023, A&A 674, A37 (Gaia DR3, OB) – mřížky z balíku SpiralMap 0.27, `pipeline/gaia_ramena.py`. Licence: balík včetně datových souborů pod MIT (LICENSE.md v balíku, copyright Prusty & Khanna 2025, ověřeno 2. 10. 2026); autoři žádají citovat arXiv:2506.11383 a jednotlivé modely. Licence dat Gaia (ESA) z cloudu neověřena. Orientace os ověřena: vzájemná korelace map 0,68 jen bez převrácení (převrácené 0,06–0,22), nadhustota kladná podél ramen Reid 2019 |
| Výška Slunce nad rovinou disku | 20,8 ± 0,3 pc; centrum v poloze Sgr A* (l = 359,94416°, b = −0,04617°) | Bennett & Bovy 2019, MNRAS 482, 1417 (arXiv:1809.03507) – **ověřeno v abstraktu 10. 10. 2026**; poloha Sgr A* jako v astropy Galactocentric (Reid & Brunthaler 2004). Heliocentrické vrstvy zůstávají v galaktických osách, kulisa, ramena, střed, mřížka a rozměry se natočí o ~0,15° (`src/core/coords.ts`, `galactic`); karty počítají výšku a vzdálenost od centra v rovině disku |
| Gouldův pás (vrstva Okolí) | kružnice r = 337 pc (průměr poloos 358 a 316 pc) kolem (−82, 39, −25) pc, sklon 21,4 ± 0,9°, výstupní uzel ℓ = 319,4 ± 2,3° | Dzib et al. 2018, ApJ 867, 151 (arXiv:1810.01917, odd. 4) – **ověřeno v textu 10. 10. 2026**; směr delší poloosy v rovině pásu článek neudává → kružnice. Kontrola: prstenec prochází u Orionu (ℓ 215°, b −23°, 379 pc). Existence pásu sporná: Pantaleoni González et al. 2026, arXiv:2604.13225 (v recenzi A&A) – „3D asterismus“; uvedeno v kartě |
| Příčka (kulisa Galaxie) | úhel 27° ke spojnici Slunce–centrum, blízký konec v 1. kvadrantu (l > 0); rozložení bodů schematické | úhel = boule/příčka 27 ± 2° (Wegg & Gerhard 2013, MNRAS 435, 1874, arXiv:1308.0593 – **ověřeno v abstraktu 10. 10. 2026**); dlouhá příčka 28–33°, poloviční délka 5,0 ± 0,2 kpc (Wegg, Gerhard & Portail 2015, MNRAS 450, 4050, arXiv:1504.01401 – **ověřeno v abstraktu 10. 10. 2026**) kreslí vrstva Střed (30°). Tvar oblaku bodů v kulise zůstává ilustrativní |
| Průměr disku | izofota D25 (25 B-mag/arcsec²) = 26,8 ± 1,1 kpc = 87 400 ly | Goodwin, Gribbin & Hendry 1998 (The Observatory 118, 201; arXiv:astro-ph/9704216, odd. 3: exponenciální disk μ₀ = 22,1 B-mag/arcsec², h = 5,0 kpc podle van der Kruita 1987, 1990) – **ověřeno v článku 10. 10. 2026**. Je to fotometrický okraj, ne konec disku: hvězdy disku sahají dál |
| Tloušťka disku (úsečky v Rozměrech) | ± škálová výška u Slunce: tenký 300 ± 50 pc, tlustý 900 ± 180 pc (hustota klesne na 1/e); radiální škálová délka 2,6 ± 0,5 kpc a 2,0 ± 0,2 kpc | Bland-Hawthorn & Gerhard 2016, ARA&A 54, 529 (arXiv:1602.07702, odd. 5.1.3 a 5.2.2) – **ověřeno v článku 10. 10. 2026**. Dřívější hodnoty z prototypu (700–1 500 ly tenký, ~8 500 ly tlustý) nahrazeny |

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
- Prstence Saturnu (pohled Soustava, 9. 10. 2026): **rovina** = rovník Saturnu; pól Laplaceovy roviny vnitřních měsíců
  (sklon k rovníku 0,0°) RA 40,6°, Dec 83,5° (ICRF) z https://ssd.jpl.nasa.gov/sats/elem/ (Jacobson 2022, AJ 164, 199).
  Kontrola přes vektory Horizons (Saturn z Země): úhel otevření prstenců 23. 3. 2025 vychází 0,02° (průchod rovinou
  prstenců), 16. 10. 2017 27,0°. **Poloměry** hlavních prstenců C 74 658–91 975 km, B 91 975–117 507 km,
  A 122 340–136 780 km podle NASA Saturnian Rings Fact Sheet
  (https://nssdc.gsfc.nasa.gov/planetary/factsheet/satringfact.html, ověřeno z PC 9. 10. 2026; dřívější hodnoty zpaměti
  se lišily o 25–170 km).
  Od 9. 10. 2026 (krok b) se prstence kreslí texturou Solar System Scope „2k saturn ring alpha“ (CC BY 4.0, Commons,
  SHA-1 ověřené): radiální řez RGBA, alfa = neprůhlednost. Převod na km je odvozený: vnitřní okraj B (91 975 km) a vnější
  okraj A (136 780 km) najité v profilu alfy → řez pokrývá 69 432–141 120 km; nezávislá kontrola: Cassiniho dělení
  (117 507–122 340 km) pak vychází na pixely 1373–1511, v textuře je propad na 1372–1508. Stín planety na prstencích a prstenců na planetě je geometrický (paprsek ke Slunci).
- **Textury planet** (pohled Soustava, 9. 10. 2026, `pipeline/textury.py`): Solar System Scope
  (https://www.solarsystemscope.com/textures/), **CC BY 4.0**, soubory převzaté z Wikimedia Commons
  („Solarsystemscope texture 2k …“; licence, autor a SHA-1 ověřené přes Commons API). Popis autora: „based on NASA
  elevation and imagery data with colours slightly more saturated and gaps filled with similar fictional terrain“ –
  v aplikaci uvedeno u planety a v poznámkách. Úprava: verze 1024 × 512 pro dotyková zařízení. Venuše = oblačná
  atmosféra, Země = povrch + mraky + noční světla („2k earth nightmap“, SHA-1 ověřené). Trpasličí planety mají na Commons
  jen „fictional“ textury → nepoužité.
- **Mapy měsíců, Pluta a Charonu** (9. 10. 2026, `pipeline/textury.py`, krok b) – volné dílo NASA/USGS, u tělesa uvedený autor:
  - Měsíc: Solar System Scope „2k moon“ (CC BY 4.0, Commons)
  - Io, Ganymed, Kallisto: USGS Astrogeology, globální mozaiky Galileo SSI + Voyager 1 km/px, GeoTIFF z
    https://planetarymaps.usgs.gov/mosaic/ (Io_GalileoSSI-Voyager_Global_Mosaic_1km.tif,
    Ganymede_/Callisto_Voyager_GalileoSSI_global_mosaic_1km.tif; SHA-1 připnuté v pipeline); střed mapy z GeoTIFF klíče
    ProjCenterLong: Io 0°, Ganymed a Kallisto 180°
  - Europa: Commons „Europa Voyager GalileoSSI global mosaic.jpg“ (USGS, jen 1024 × 512)
  - Enceladus: Commons „Enceladus Color Map.jpg“ (PIA18435, NASA/JPL-Caltech/SSI/LPI, barvy rozšířené do UV a IR)
  - Titan: Commons „Titan map April 2011 full.png“ (PIA14908, Cassini ISS 938 nm; podle popisu střed 180° z. d.)
  - Triton: Commons „Triton map no grid.jpg“ (Voyager 2, P. Schenk/LPI)
  - Pluto: Commons „Pluto color mapmosaic.jpg“ (New Horizons; podle popisu Sputnik Planitia uprostřed → střed 180°)
  - Charon: Commons „Charon map iau1803c.jpg“ (New Horizons, NASA/JHU APL/SwRI)
  - Kontrola středu a orientace: polohy útvarů z gazetteeru IAU/USGS (shapefily *_nomenclature_center_pts z
    asc-planetarynames-data) zakreslené do hotových map – sedí Loki, Pwyll, Conamara, Galileo Regio, Osiris, Tros,
    Valhalla, Asgard, Xanadu, Shangri-La, Kubrick Mons, Argo Chasma, Dorothy, Tombaugh Regio, Damascus Sulcus.
    Úpravy: zmenšení, pootočení o 180° délky (aby měly všechny mapy uprostřed nultý poledník), nesnímkované (černé)
    oblasti vyplněné průměrnou barvou mapy. Ceres bez mapy (na Commons jen barevná topografie Dawn, ne vzhled).
- **Rotace těles k datu** (9. 10. 2026, `pipeline/rotace.py` → `rotace.json`): NAIF generic PCK pck00011.tpc
  (https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc, SHA-1 připnuté) = konstanty zprávy IAU WGCCRE
  2015 (Archinal et al. 2018, Celest. Mech. Dyn. Astr. 130:22): pól α0, δ0 a poledník W0, Ẇ vč. periodických členů
  (Měsíc, Mars, Jupiter a jeho měsíce, Neptun, Triton). Kontrola výpočtem z `src/system/rotation.ts`: 9. 10. 2026 12:00 UTC
  je Slunce nad 2,5° z. d., 6,5° j. š. (rovnice času ≈ +12,7 min → ~3° z. d., deklinace ≈ −6°); 21. 6. nad 23,4° s. š.;
  Měsíc míří k Zemi bodem do ±7° (librace). U obřích planet je W rotace vnitřku (System III) – oblaka jen orientačně.
- **Osy planet**: Země pól ICRF; Mars, Jupiter, Saturn, Uran, Neptun = pól Laplaceovy roviny vnitřních měsíců
  z https://ssd.jpl.nasa.gov/sats/elem/ (sklon roviny k rovníku 0,0° Phobos, Io, Mimas; 0,4° Naiad; u Urana sloupec
  Tilt 180° = pól ve směru rotace, opačný než pól IAU); Merkur a Venuše kolmo k dráze podle sklonu osy z JPL Horizons
  (2,11′, 177,3°). Od 9. 10. 2026 (krok b) se místo toho používá pól a poledník IAU z rotace.json (viz výše);
  tyhle osy zůstávají jen jako záloha, když se rotace.json nenačte.
- **3D tvary planetek, komet a malých měsíců** (9. 10. 2026, krok c, `pipeline/tvary.py` → `tvary.json` + `public/models/tvary/*.bin`,
  47 těles, 3,1 MB; 10. 10. doplněno 15): NASA PDS Small Bodies Node, přehled https://sbn.psi.edu/pds/shape-models/ (odkazy na OBJ převzaté
  z jeho app.Data.js; SHA-1 každého souboru zapsané v tvary.json). Modely v souřadnicích tělesa (x = nultý poledník,
  z = pól), km (Wild 2 v m). Měřítko zkontrolované proti katalogu: Eros, Vesta, Lutetia, Phobos, Phoebe, Saturnovy
  malé měsíce do ±2 %; Toutatis a Hartley 2 se liší, protože katalogové průměry jsou starší odhady (rozměry Toutatise
  z modelu 4,6 × 2,3 × 1,9 km sedí s SBDB „extent“ 4,26 × 2,03 × 1,70 km).
  - **NASA 3D Resources** (github.com/nasa/NASA-3D-Resources) původně zvažované: má jen STL pro 3D tisk – Eros a Itokawa
    rozřezané na dvě poloviny, ostatní v libovolných jednotkách bez souřadnic tělesa → nepoužito, bere se PDS přímo.
  - Licence: data NASA (PDS) volné dílo. **67P, Lutetia, Steins jsou z ESA Rosetta** – **ověřeno 10. 10. 2026** v podmínkách
    vědeckých archivů ESA (https://cosmos.esa.int/web/esdc/terms-and-conditions): data jsou pod **CC BY-NC 3.0 IGO**
    s kreditem mise, pro kameru OSIRIS „Credit: ESA, H. Sierks“. Nekomerční web je v pořádku; **před případnou placenou
    nebo reklamní mobilní aplikací (Capacitor) požádat ESA o svolení** (data.licences@esa.int), nebo tyto 3 tvary vynechat.
    PDS navíc žádá citovat produkt podle CITATION_DESC v jeho štítku.
  - Mise/autoři: NEAR (Eros, Gaskell), Hayabusa (Itokawa, Gaskell), OSIRIS-REx (Bennu), Dawn (Vesta), Rosetta (67P,
    Lutetia, Steins), Deep Impact/Stardust-NExT (Tempel 1), EPOXI (Hartley 2), Stardust (Wild 2), New Horizons
    (Arrokoth, Porter et al. 2024), Cassini (Phoebe, Gaskell; Hyperion, Janus, Epimetheus, Prometheus, Pandora, Pan,
    Atlas, Daphnis, Helene, Telesto, Calypso – Thomas et al.), Phobos (Gaskell), radar Arecibo/Goldstone (Apophis
    Brozović 2018, Toutatis Hudson 2003, Geographos, Castalia, Bacchus, 1998 ML14, 1996 HW1, 2001 SN263).
  - Vynecháno: Ryugu (JAXA, licence neověřená), Ceres/Mimas/Tethys/Dione/Rhea (téměř kulové, mají kouli), tělesa,
    která nejsou ve vzorku planetek.
  - Rotace: IAU z pck00011 u 20 těles (Eros, Itokawa, Vesta, Lutetia, Steins, 67P, Tempel 1 – poledník k epoše
    JED 2455607,69 přepočten na J2000 –, Phobos, Phoebe a Saturnovy malé měsíce kromě Hyperionu a Daphnise). Jinak JPL SBDB
    (sbdb.api, phys-par): Bennu pól 85,45°/−60,37° (Daly et al. 2020) a perioda 4,296 h; ostatní jen perioda z LCDB,
    osa kreslená kolmo k dráze (orientačně). Apophis, Toutatis, Hyperion, Hartley 2 se převalují – označeno.
  - Doplněno 10. 10.: **mřížky poloměrů** (šířka × délka × r) – Thomas, Small Body Shape Models V2.1 (Ida, Gaspra – Galileo;
    Deimos – Viking) a Stooke, Small Body Shape Models V2.0 (Halley – Giotto/Vega; Mathilde – NEAR; Amalthea, Thebe,
    Larissa, Proteus – Voyager/Galileo). Směr délky: Thomas měsíce západní (výslovně neuvedeno – **ověřeno porovnáním
    Phobosu z téže sady s modelem Gaskell**: korelace poloměrů 0,99 při západní, 0,81 při východní), Ida východní, Gaspra
    západní (.lbl); Stooke podle dataset.cat měsíce západní, planetky a komety východní. Thomasova Mathilda má skoky
    7–10 km mezi sousedními body (zuby) → použit Stooke. **Radar**: Kleopatra (Ostro 2000), Mithra, Ra-Shalom, 1992 SK,
    1950 DA (prográdní varianta), Moshup (jen hlavní těleso) – sady Hudson a Lawrence (JPL). Pól Kleopatry v SBDB
    („69, 42“, Shepard 2018) bez uvedené soustavy → nepoužit. Halley, Hyperion, Apophis, Toutatis, Hartley 2 se převalují.
  - Úpravy: zjednodušení sítě (fast-simplification 0.2.0) na 3–16 tis. trojúhelníků, kvantování int16.
- **Plný katalog planetek a komet** (10. 10. 2026, `pipeline/planetky_vse.py` → `planetky.json` + `public/data/planetky/*.bin.gz`):
  NASA/JPL SBDB Query API (https://ssd-api.jpl.nasa.gov/doc/sbdb_query.html), sb-kind=a (1 571 698 planetek) a sb-kind=c
  (4 080 komet), `full-prec=true`; data JPL SSD se svolením (e-mail 2. 10. 2026). Jen eliptické dráhy; přepočet dvěma
  tělesy na společnou epochu JD 2461041,5 (1. 1. 2026), kvantování úhlů na uint16 (0,0055°).
  - **MPC (MPCORB.DAT, 94 MB) nepoužito**: podle zásad CBAT/MPC (https://tamkin3.eps.harvard.edu/CatalogueDistPolicy.html,
    starší zrcadlo) jsou katalogy jen pro osobní použití a nesmějí se dál šířit; aktuální znění na minorplanetcenter.net nenalezeno.
  - JPL API neposílá hlavičku CORS → z prohlížeče se dotazovat nedá; jména těles jsou proto v datech (`*-jmena.txt.gz`).
- **Ohony komet** (`src/system/comets.ts`): ILUSTRACE, žádný zdroj dat. Směr fyzikálně správně (iontový ohon od Slunce,
  prachový zahnutý proti směru pohybu), délka a jas jen odhad z heliocentrické vzdálenosti (aktivita od 5 au) a M1 z JPL.

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
- Pozůstatky supernov: Green D.A. 2025 – `VII/297` (310, poloha). **Vzdálenosti** (od 10. 10. 2026): Ranasinghe S. & Leahy D.
  2023, ApJS 265, 53 – CDS `J/ApJS/265/53`, `table1.dat` (kompilace publikovaných měření; metoda u jednotlivých objektů
  v tabulce není, proto facet „kompilace různých metod“). Párování podle jména G…: 191 z 310 Greenových má vzdálenost;
  29 dalších z RL23 (SNRcat, nové identifikace) se vzdáleností přidáno s polohou ze jména (0,1°) → celkem 336, 220 ve 3D.
  f_X = R → rozsah místo chyb; meze (<, >) a „?“ v poznámce. RL23 bere R0 = 8,34 kpc (Sgr A East 8,34 kpc), my 8,15 –
  objekty u centra mohou být ~0,2 kpc za ním. Krabí mlhovina: RL23 3,37 kpc (2,4–7,4), SIMBAD 2,0 kpc (Trimble 1973) – v poznámce.

### Molekulová mračna z celé Galaxie – Miville-Deschênes et al. 2017 (`pipeline/mracna.py` → `mracna.json`, vrstva „Molekulová mračna“)
- Miville-Deschênes M.-A., Murray N., Lee E.J. 2017, ApJ 834, 57 (arXiv:1610.05918) – CDS `J/ApJ/834/57`, `table1.dat`:
  **8 107 mračen** z přehlídky ¹²CO (1–0) Dame T.M., Hartmann D., Thaddeus P. 2001, ApJ 547, 792 (pás |b| ≤ 5°).
  Licence: katalogy CDS/VizieR – volně s citací (stejně jako ostatní katalogy CDS v projektu).
- **Vzdálenosti jsou kinematické a nejisté** (čl. 3.4 článku, ověřeno v textu 10. 10. 2026): z radiální rychlosti a rotační
  křivky Brand & Blitz 1993 s R0 = 8,5 kpc a V0 = 220 km/s. Ve vnitřní Galaxii (Rgal < R0) dvě řešení – autoři volí
  podle vztahu σv–ΣR (příznak `INF`); podle Lee et al. 2016 souhlasí volba u 90 % mračen s přiřazeným hvězdotvorným
  komplexem s absorpčními měřeními. V kartě je i „druhé řešení“, filtr „Kinematická vzdálenost“ (jediné 3 258 / blízké
  3 065 / vzdálené 1 784).
- Kreslíme heliocentricky (l, b, D), takže jiné R0 naší mapy (8,15 kpc) polohu vůči Slunci nemění; „vzdálenost od centra“
  v kartě je jednou z našeho R0, jednou podle článku (8,5 kpc). Hmotnost, poloměr a výška nad rovinou podle zvoleného řešení.
- Poznámky v kartě (naše volba, ne z článku): směr do 10° od centra nebo anticentra (kinematická metoda tam selhává),
  vzdálenost nad 30 kpc (24 mračen, nejdál 88 kpc – nejspíš zkreslení nekruhovým pohybem; data neměníme).
- **Blízká mračna (doplněno 10. 10.):** kinematická vzdálenost pod 100 pc (59 mračen) → jen směr v seznamu (do ~70–100 pc
  leží Místní bublina téměř bez hustého plynu, O'Neill 2024); pod 500 pc poznámka – autoři v příloze C píšou, že data
  Dame et al. blízká mračna (D < 500 pc) spolehlivě nerozliší. Obě hranice jsou naše volba.
- Označení „MD17 č.“ je naše zkratka (číslo mračna v katalogu), ne oficiální jméno.
- Přesné vzdálenosti (3D prach + Gaia) má jen 94 mračen Zucker et al. 2020 ve vrstvě Mlhoviny.

### Masery s paralaxou – Reid et al. 2019, tab. 1 (`pipeline/masery.py` → `masery.json`, vrstva „Masery s paralaxou“)
- Reid M.J. et al. 2019, ApJ 885, 131 – CDS `J/ApJ/885/131` (`table1.dat` 199 zdrojů, `refs.dat` 78 odkazů). Licence CDS –
  volně s citací. Paralaxy a vlastní pohyby maserů u mladých hmotných hvězd z VLBA (BeSSeL), VERA, EVN a LBA.
- Vzdálenost = 1/paralaxa, rozsah z ±1σ (u paralaxy menší než její chyba bez horní meze). Rameno podle autorů (ReadMe
  pozn. 4), sloučené do 7 ramen modelu jako v `overit_ramena.py` + skupina ostruhy/centrum/nezařazené (15).
  Počty: Perseus 41, Místní 28, Střelec–Kýl 39, Štít–Kentaur 47, Pravítko 12, Vnější 11, 3 kpc 6.
- V kartě i „původní měření“ (první autor + bibcode z `refs.dat`). Pozn. 3 ReadMe: některé hodnoty jsou předběžné.

### Hnědí trpaslíci do 20 pc – Kirkpatrick et al. 2021 (`pipeline/trpaslici.py` → `trpaslici.json`, vrstva „Hnědí trpaslíci do 20 pc“)
- Kirkpatrick J.D. et al. 2021, ApJS 253, 7 – CDS `J/ApJS/253/7`, `table11.dat` (sčítání L, T a Y trpaslíků do 20 pc,
  stav 2020-10). Licence CDS – volně s citací. Vynecháni objekty s příznakem „e“ (podle autorů spíš pozdní M) a 2 bez
  typu/paralaxy → 523 (L 169, T 305, Y 49). Úplné kromě ≥ T8 a Teff < 600 K (abstrakt).
- Poloha z označení J2000 (tabulka nemá RA/Dec, přesnost ~1″); 6 zkrácených označení (např. DENIS J0205.4−1159) bere
  polohu CatWISE z `tablea1.dat`. Vzdálenost = 1/paralaxa. Kontrola: Luhman 16 2,0 pc, WISE 0855−0714 2,3 pc.
- Aliasy pro hledání (naše doplnění): Luhman 16, WISE 0855-0714, ε Indi B.
- Bílí trpaslíci se samostatně nepřidávali – jsou ve vrstvě Gaia 100 pc (pravděpodobnost WD z GCNS).

### Klasické cefeidy – Skowron et al. 2019 (`pipeline/cefeidy.py` → `cefeidy.json`, vrstva „Cefeidy“)
- Skowron D.M. et al. 2019, Acta Astron. 69, 305 – CDS `J/AcA/69/305`, `table1.dat` (2 631 cefeid; původ dat OGLE
  ftp://ogle.astrouw.edu.pl/ogle4/MILKY_WAY_3D_MAY). Navazuje na Skowron et al. 2019, Science 365, 478. Licence CDS – volně s citací.
- Vzdálenost z periody a infračervené jasnosti (Spitzer, WISE, extinkce AKs), chyba z katalogu; stáří z periody.
  244 cefeid bez vzdálenosti jen v seznamu. Jména GCVS převedena („X_____Sgr“ → „X Sgr“), u řeckých písmen alias („δ Cep“).
- Typ = výška nad rovinou z = d · sin b (Slunce v rovině jako v celé mapě); hranice ±250 pc je naše volba pro barvy
  (nad 254, u roviny 1 548, pod 585). Kontrola: δ Cep 266 ± 12 pc.

### Souhvězdí (`pipeline/souhvezdi.py` → `souhvezdi.json`, přepínač „Souhvězdí“)
- Obrazce a hranice IAU: **Stellarium**, kultura „modern“ (`skycultures/modern/index.json` z github.com/Stellarium/stellarium),
  licence textu a dat **CC BY-SA 4.0** (description.md, ověřeno 10. 10. 2026). 88 souhvězdí, 710 hvězd (čísla HIP).
  Hranice: 781 hran podle https://pbarbier.com/constellations/edges_18.txt (B1875), převedeno do ICRS astropy FK4(B1875);
  rovnoběžky vzorkované po ≤ 1°. Obrazce nejsou oficiální (IAU určila jen hranice, Delporte 1930)
- Polohy hvězd obrazců: Hipparcos (van Leeuwen 2007, I/311/hip2), RV Yale BSC5 (V/50) u 709 z 710; 7 hvězd s paralaxou
  < 1 mas jen směrem (1 000 pc). Obrazce se hýbou s posuvníkem času
- Česká jména souhvězdí: Wikidata (CC0), 88/88; jména hvězd z vrstvy Jasné hvězdy
- Hranice a jména na „obloze“ (koule 6 000 ly kolem Slunce) jsou vidět jen do 1 500 ly od Slunce

### Čas – pohyb hvězd a blízké průlety (`src/core/time.ts`, posuvník „Čas“, vrstva „Průlety“)
- **Průlety:** Bailer-Jones C.A.L. 2022, ApJL 935, L9 – CDS `J/ApJ/935/L9`, table12 (61 hvězd Gaia DR3, medián perihelia
  < 1 pc; příznaky d = pochybný, b = široká dvojhvězda) a Bailer-Jones C.A.L. et al. 2018, A&A 616, A37 – CDS
  `J/A+A/616/A37`, table23 (3 379 hvězd Gaia DR2, < 10 pc). 22 hvězd DR2 vynecháno, jsou i v DR3
  (`gaiadr3.dr2_neighbourhood`) → 3 418. Tabulky mají jen celkový pohyb → složky pmra/pmdec a RA/Dec z archivu Gaia
  (TAP gea.esac.esa.int: gaiadr3/gaiadr2.gaia_source); paralaxa a RV z tabulek článků. Jména a další označení SIMBAD
  (TAP). Kontrola: přímočaré perihelium z našich vektorů proti článkům – |Δt| medián 9 tis. let, |Δd| medián 0,38 pc,
  u 10 % přes 28 pc (velké nejistoty, vzdálené průlety; články počítají z rozdělení nejistot) → karta ukazuje čísla
  z článků a rozdíl přímky označí. Gliese 710: 1,29 mil. let, 0,064 pc (DR3).
- **Pohyb Gaia 100 pc:** GCNS (J/A+A/649/A6) pmRA, pmDE, RV (adoptedRV) → `gaia100-pohyb.bin.gz` (1,8 MB, stahuje se až
  při posunu času). RV má jen 82 tis. z 331 tis. hvězd – u ostatních jen tečná rychlost (RV = 0), pohyb podhodnocený.
  132 složek nad ±327 pc/mil. let oříznuto.
- **Pohyb jasných hvězd:** Hipparcos (van Leeuwen 2007, I/311/hip2) pmRA, pmDE + RV z Yale BSC5 (V/50 RadVel) –
  `pipeline/hvezdy_pohyb.py` doplní x.vx/vy/vz do `hvezdy.json` (907 z 909).
- **Model:** přímočarý pohyb vůči Slunci (Slunce stojí, ostatní vrstvy se nehýbou), rozsah ±5 mil. let. Zakřivení drah
  v Galaxii zanedbáno – na mil. let jen orientační.

### Hvězdné proudy v halu – galstreams (`pipeline/proudy.py` → `proudy.json`, přepínač „Proudy“)
- Mateu C. 2023, MNRAS 520, 5225 (doi:10.1093/mnras/stad321) – knihovna **galstreams v1.2**, https://github.com/cmateu/galstreams,
  licence **BSD 3-Clause** (© 2017 Cecilia Mateu, soubor LICENSE v repu, ověřeno přes GitHub API 10. 10. 2026)
- 141 proudů, u každého výchozí dráha (`On = 1` v `lib/master_log.txt`) z původního článku (citace v kartě); převzorkováno po
  0,5° (9 506 bodů, 177 kB). Rok a články objevu z `master_log.discovery_refs.txt`; mateřská kulová hvězdokupa = sloupec
  Notes „GC“ (21 proudů) a poznámky z `master_log.comments.txt` (přeložené)
- Nejistoty: 55 proudů nemá průběh vzdálenosti (jen průměr) → čárkovaně v konstantní vzdálenosti; 23 drah je jen hlavní
  kružnice mezi koncovými body; 41 „New-“/„C-“ jsou nepotvrzení kandidáti Ibata et al. 2024. Šířky proudů vynechány
  (master_log a summary se liší). Sagittarius je jen úsek z Gaia (Antoja et al. 2020), ne celé ohony
- Vzdálenost od centra v kartě: astropy Galactocentric (R0 8,122 kpc), ne náš R0 8,15 – rozdíl pod 0,1 kpc
- Krátké popisy 6 nejznámějších proudů ověřené 10. 10. 2026 v abstraktech (arXiv API): GD-1 – Price-Whelan & Bonaca 2018
  (arXiv:1805.00425: mezery, hvězdy mimo proud, stopy podstruktury temné hmoty), Fimbulthul – Ibata et al. 2019
  (arXiv:1902.09544: proud ω Cen, ω Cen možná jádro pohlcené trpasličí galaxie), Orphan-Chenab – Koposov et al. 2019
  (arXiv:1812.08172: ~210°, ~150 kpc, hmotný rušitel; dřívější „zbytek trpasličí galaxie“ vypuštěn – v abstraktu není),
  Monoceros – Xu et al. 2015 (arXiv:1503.00257: prstenec jako vlnění disku; původ sporný). Sagittarius a Pal 5 jen obecně
  známé (ohony kolem mateřského objektu) – bez konkrétních čísel; překlep „Yangtze2023a“ v galstreams opraven na Yang 2023a

### Střed Galaxie – stavba (`src/scene/center.ts`, přepínač „Střed“)
Čísla ověřená 10. 10. 2026 v abstraktech a textu článků (svazky a strany přes Crossref):
- **Dlouhá příčka:** Wegg C., Gerhard O., Portail M. 2015, MNRAS 450, 4050 (arXiv:1504.01401) – poloviční délka
  5,0 ± 0,2 kpc (podle definice 4,7–5,2 kpc, tab. 2), úhel ke spojnici Slunce–centrum 28–33° (nejlepší model 29–30°,
  kreslíme 30°), škálové výšky ~180 pc a ~45 pc. Šířku příčky v rovině jako jedno číslo neuvádějí → kreslíme jen osu
  a rozptyl úhlu.
- **Boule (box/peanut):** Wegg C., Gerhard O. 2013, MNRAS 435, 1874 (arXiv:1308.0593) – úhel 27 ± 2°, exponenciální
  škálové délky 0,70 : 0,44 : 0,18 kpc; body generované z této hustoty a oříznuté na změřenou oblast 2,2 × 1,4 × 1,1 kpc.
- **Jaderný hvězdný disk:** Launhardt R., Zylka R., Mezger P.G. 2002, A&A 384, 112 (astro-ph/0201294) – poloměr
  230 ± 20 pc, škálová výška 45 ± 5 pc.
- **Fermiho bubliny:** Su M., Slatyer T.R., Finkbeiner D.P. 2010, ApJ 724, 1044 (arXiv:1005.5480) – 50° nad a pod centrem,
  šířka ~40° v délce. **Rozměry v kpc jsou náš přepočet** z úhlů (bubliny nad centrem, R0 = 8,15 kpc): výška ~9,7 kpc,
  šířka ~5,9 kpc; tvar = dva rotační elipsoidy.
- **eROSITA bubliny:** Predehl P. et al. 2020, Nature 588, 227 (arXiv:2012.05840) – model tlustých slupek z Extended Data
  Fig. 2: severní koule s vnějším poloměrem 7 kpc (vnitřní 5), jižní elipsoid 7 × 4,9 kpc; ~14 kpc nad a pod rovinou.
  Autoři čísla označují za nejistá. Severní slupka je ve skutečnosti mírně posunutá od svislice – zanedbáno.

### Oortův oblak – ILUSTRACE, nikdy nepozorován (`src/scene/oort.ts`, mapa Galaxie + tlačítko v pohledu Soustava)
- Rozsahy (ověřeno 10. 10. 2026):
  - Morbidelli A. 2005, *Origin and dynamical evolution of comets and their reservoirs*, arXiv:astro-ph/0512256, kap. 4
    (podle simulací Dones L. et al. 2004/2005 a Hills J.G. 1981, AJ 86, 1730): oblak s a < 20 000 au = **vnitřní neboli
    Hillsův**; tělesa s perihelem nad 100 au mají a už od ~3 000 au; retrográdní dráhy až za 6 000–7 000 au (uvnitř zploštělý),
    za 20 000 au izotropní sklony; vnitřní a vnější část mají zhruba stejný počet těles, radiální rozdělení ∝ 1/r³.
    Dlouhoperiodické komety vnitřní oblak nevzorkují (Jupiterova bariéra), informace o něm jsou jen z modelů.
  - NASA Science, *Oort Cloud – Facts* (science.nasa.gov/solar-system/oort-cloud/facts/): vnitřní okraj 2 000–5 000 au,
    vnější okraj 10 000–100 000 au.
- Kreslíme vnitřní oblak 3 000–20 000 au a vnější 20 000–100 000 au (do 1,58 ly; 1 ly = 63 241,077 au). **Tvar je
  schematický**: hustota ∝ r⁻³ (stejně bodů na každý řád vzdálenosti), zploštění vnitřní části do 7 000 au na ±30° od
  ekliptiky a pak plynule k izotropii – konkrétní úhly jsou naše ilustrace, ne čísla z literatury. Bez protažení slapy Galaxie.
- Skutečná data k tomu: dráhy komet s aféliem Q = a(1 + e) ≥ 1 000 au z plného katalogu JPL SBDB (dlaždice komet,
  1 797 eliptických drah, z nich 372 s Q ≥ 1 000 au a 65 s Q ≥ 20 000 au; záloha vzorek `mala-telesa.json`).
  **Elementy jsou oskulační heliocentrické** k 1. 1. 2026 – o původu komety v Oortově oblaku rozhoduje původní barycentrická
  dráha před vstupem mezi planety, výběr podle Q je proto jen orientační. Hyperbolické a parabolické dráhy v katalogu nejsou.

### Neutronové hvězdy
- Pulsary: ATNF Pulsar Catalogue (Manchester R.N. et al. 2005, AJ 129, 1993). Pipeline zkouší aktuální verzi přes psrqpy
  (záloha z cloudu: kopie 2016-May z CDS `B/psr`). **V datech je verze 2.8.1** (staženo na PC 6. 10. 2026, 4 393 pulsarů).
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
- Gaia DR3 ID (pole `gaia`, 10. 10. 2026): oficiální křížové párování `gaiadr3.hipparcos2_best_neighbour` (Gaia DR3,
  postup Marrese et al. 2019), dotaz ARI Heidelberg, cache `raw/hvezdy/hip2_gaiadr3.csv`; protějšek má 573 z 909 hvězd
  (nejjasnější Gaia DR3 nemá – Sirius, Canopus…). Slouží k propojení karet s vrstvami Gaia. Kontrola: ε Crv
  (HIP 59316 → Gaia DR3 3490234568129160704) Hipparcos 97,5 pc, GCNS 94,5 pc.
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
- Podrobný stupeň „Prach: 1,25 kpc (podrobný)“ = Edenhofer et al. 2024, viz níže.

### 3D mapa prachu – Edenhofer et al. 2024 (`pipeline/prach_edenhofer.py` → `prach-edenhofer.bin.gz`)
- Edenhofer G., Zucker C., Frank P., Saydjari A.K., Speagle J.S., Finkbeiner D., Enßlin T. 2024, A&A 685, A82;
  Zenodo 10.5281/zenodo.10658339, licence CC BY 4.0. Soubor `mean_and_std_healpix.fits` (3 252 715 200 B, MD5
  10c823a5fcf81b47b6e15530bcdf54dc ověřené proti Zenodo API, staženo 10. 10. 2026): HEALPix Nside 256 (nested),
  516 slupek 68,8–1 244,6 pc, jednotka extinkce ZGR23 na pc; A_V = 2,8 × ZGR23 (článek).
- Převod: bilineárně mezi pixely HEALPix (astropy-healpix) a lineárně mezi slupkami v logaritmu hustoty, krychle
  500 × 500 × 160 po 5 pc (±1,25 kpc, ±0,4 kpc od roviny), průměr 2 × 2 × 2 bodů, stejné kódování jako Vergely.
  Výsledek 6,7 MB gzip (s třídami nejistoty; bez nich 4,6 MB), nenulových voxelů 17,2 %, nad horní mezí stupnice
  0,061 %, max A0 0,30 mag/pc.
- Nejistota (stav přepínače „Prach: 1,25 kpc – nejistota“): σ ze STD. HDU téhož souboru, interpolovaná jako střed,
  průměrovaná přes voxel; σ / střed viditelných voxelů má medián 0,47 a je dost rovnoměrná (pevné hranice 40/55/70 %
  daly 77 % voxelů do jedné třídy), proto třídy podle 33., 67. a 90. percentilu: < 45 %, 45–50 %, 50–56 %, ≥ 56 %
  (podíly 35 / 31 / 23 / 11 %). Uložené ve spodních 2 bitech bajtu (kód hustoty je násobek 4), hranice v `prach.json`.
  Je to nejistota hustoty v buňce, ne celé extinkce podél paprsku; průměr σ přes voxel ji spíš nadhodnocuje.
  Pozor: astropy-healpix vrací pro zápornou délku nesmyslné váhy (±inf) – délka se proto bere v 0–2π.
- Ověření orientace: korelace s krychlí Vergely „3 kpc“ (zprůměrovanou na 10 pc) 0,58; se zrcadlením os x / y / z
  nebo prohozením x ↔ y jen −0,16 až 0,07.
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

### Hvězdy 100–500 pc – Gaia DR3 (`pipeline/gaia500_stahni.py`, `pipeline/gaia500.py` → dlaždice v repu `galaxie-data`)
- Gaia Collaboration, Vallenari A. et al. 2023, A&A 674, A1 (Gaia DR3); tabulka `gaiadr3.gaia_source`.
- Staženo 3. 10. 2026 ze **zrcadla Gaia v ARI Heidelberg** (https://gaia.ari.uni-heidelberg.de/tap, asynchronní TAP),
  protože archiv ESA neodpovídal. Způsob poděkování zrcadlu ARI (pokud nějaký žádají) z cloudu neověřen – stránka
  blokovaná; podle výsledků vyhledávání odkazuje web ARI na návod ESA k citaci jednotlivých vydání Gaia.
- Výběr: parallax > 2 mas a parallax_over_error > 10; vzdálenost = 1 / paralaxa; bez hvězd GCNS a paralaxy nad 10 mas
  (ty kreslí vrstva Gaia 100 pc). 15 196 236 hvězd, 2 480 uzlů octree, celkem 205 MB.
- Licence dat Gaia: © ESA/Gaia/DPAC, CC BY-SA 3.0 IGO (ověřil Ráďa na cosmos.esa.int 3. 10. 2026); odvozené dlaždice
  v repu `galaxie-data` pod stejnou licencí s README.

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

### Star Trek – fanouškovská vrstva, FIKCE (`pipeline/startrek_stahni.py`, `pipeline/startrek.py` → `startrek.json`)
- **Neoficiální extrapolace**, ne kánon ani oficiální mapa. Star Trek je ochranná známka Paramount; vrstva s ním není spojená.
- Zdroje (2. 10. 2026, MediaWiki API): Memory Alpha (kánon, licence **CC BY-NC**) a Memory Beta (licencovaná fikce vč.
  *Star Charts*, **CC BY-SA**) – kategorie Stars, Star systems, Planets: 14 686 stránek + stránky mocností. Bere se jen fakta
  (jméno, příslušnost, vzdálenosti, kvadrant); u každé soustavy odkaz na stránky wiki.
- Infoboxy: obecný parser (klíče s mezerami, prázdné hodnoty, víc řádků) – čte i `planetInfobox` z Memory Beta
  (~3 400 planet) a jejich soustavy ve tvaru „[[X]] [[star]] [[system]]“; obecné pojmy (G-type star, trinary star…)
  se jako soustavy neberou. Skutečná hvězda v Alfa/Beta nedostane mocnost z Gama/Delta (Epsilon Draconis „Dominion“ = okupace).
- *Star Trek: Star Charts* (Mandel 2002) sama použitá není (placená kniha); její údaje se dostávají přes Memory Alpha/Beta.
- Kvadranty: hranice Alfa/Beta = spojnice Slunce–centrum (Memory Alpha „Quadrant“); Beta je na galaktické délce 180–360°
  – ověřeno na skutečných hvězdách s uvedeným kvadrantem: **370/377 souhlasí**.
- Skutečné hvězdy (410; stav po opravě čtení Memory Beta 2. 10.): jméno z wiki → jasné hvězdy mapy (hvezdy.json) nebo SIMBAD (Sesame); přijato při shodě vzdálenosti
  (±30 % / 5 ly) nebo souhvězdí; jasná hvězda podle jména vždy (rozpor vzdáleností se v kartě uvede). Např. Vulkán = 40 (ο²) Eridani,
  Andorie = Prokyon, Wolf 359, Risa = ε Ceti, Omega Leonis.
- Fiktivní soustavy (64): poloha vypočtená relaxací z údajů „~N ly od Slunce“ a „N ly od X“ + strana kvadrantu + slabě k těžišti
  mocnosti a k rovině; medián odchylky od údajů 3 %, některé údaje si na wiki odporují (90 % pod ~98 %).
- Hlavní svět bez údajů (Romulus): směr těžiště soustav mocnosti, strana kvadrantu z wiki, vzdálenost = medián – **odhad**.
- Mocnosti bez jediné kotvy (Tholiané, Breenové, Gornové, Tzenkethiové, Talariani, Sheliakové, Son'a, Kzinti, Orioni): podle sousedů
  z Memory Beta / Memory Alpha (tabulka `NEIGHBORS` v pipeline, u každé citovaná stránka) – **odhad**.
- Gamma a Delta: schematické oblasti (`FAR`): Kazoni 70 000 ly (VOY Caretaker), Krenim 60–65 tis. ly, ostatní podle pořadí cesty
  Voyageru (skoky 9 500 / 20 000 ly z Memory Alpha „USS Voyager“) – **odhad**; Dominion 45 000 ly od centra (Memory Alpha:
  40–50 tis.), kánonických „70 000 ly od Bajoru“ s R0 mapy nejde splnit přesně (vychází ~66 500 ly).
- Ruční opravy: Tzenketh → Tzenkethi (wiki uvádí jen stav z roku 3196); Qo'noS ~15 ly od Omega Leonis (sektorový blok Omega Leonis,
  Memory Alpha); příslušnost se volí pro 24. století, stav z 32. století má přednost před 23. stoletím a okupacemi.
- Soustav jen s příslušností a bez jakéhokoli údaje o vzdálenosti je přes 1 000 – na mapu se nedávají (karta mocnosti je počítá).

- **Souvislá území** (`pipeline/startrek_uzemi.py` → `startrek-uzemi.bin.gz`, 100 kB): vlastní odvození z umístěných soustav,
  ne převzatá mapa. Mřížka 128 × 128 × 80 buněk po 5 ly kolem Slunce (±320 / ±320 / ±200 ly); buňka patří mocnosti
  s nejmenší „měkkou“ vzdáleností (soft-min přes 8 nejbližších soustav, šířka 6 ly), pokud je pod 30 ly; mezi mocnostmi hranice
  uprostřed; do 10 ly od soustavy patří buňka vždy její mocnosti (jinak Federace pohltí osamělý Bajor); pole měkké vzdálenosti rozmazané Gaussem σ = 8 ly a dutiny / zálivy do ~30 ly zaplněné (morfologické uzavření), ať okraj není poskládaný z koulí. Soustavy u okraje mřížky se do území nepočítají. Soustavy mimo mřížku (Rigel, β Lyr…) a vzdálené oblasti Gama/Delta zůstávají jako koule.
- **Katalog hvězd a planet** (`pipeline/startrek_katalog.py` → `startrek-katalog.json`, 950 kB, gzip 97 kB): všechny stránky
  kategorií Stars, Star systems, Planets z obou wiki (14 686 stránek) → 12 954 položek (2 379 hvězd, 5 523 soustav,
  5 052 planet; stejné jméno na obou wiki = jedna položka, přehledové stránky „Unnamed…“ vynechány, zrcadlový vesmír
  samostatně). Jen údaje z infoboxů a kategorií: druh, třída, soustava, příslušnost, kvadrant, vzdálenost od Slunce, pokud ji
  wiki uvádí. Žádné texty článků. Polohu na mapě má 991 položek (přes soustavu ve fanouškovské vrstvě).

### Let hvězdnou lodí – Star Trek, FIKCE (`src/trek/voyage.ts`, `ships.ts`, `warp.ts`)
- Polohy zastávek a vzdálenosti jsou skutečné z mapy; rychlosti a warp jsou fikce podle **Memory Alpha** (CC BY-NC),
  staženo 4. 10. 2026.
- Warp škála (stránka „Warp factor“): TOS v = w³ · c; TNG v = w^(10/3) · c do warpu 9, nad 9 exponenty Michaela Okudy
  9,2^3,338 · 9,6^3,34 · 9,9^3,5 · 9,99^3,9 · 9,9999^5,3 – mezi nimi lineární interpolace exponentu (vlastní odvození).
  Kontrola: warp 9 = 1 516 c, warp 6 = 392 c (shoda s tabulkou Memory Alpha).
- Lodě (stránky tříd na Memory Alpha): Galaxy – cestovní warp 6, max. 9,6 (TNG „Encounter at Farpoint“, „The Best of
  Both Worlds“); Constitution – cestovní warp 6, nouzový 8, stará škála (TOS „Amok Time“, „Obsession“; Memory Alpha u nich
  uvádí 384 c, což vzorci w³ = 216 c neodpovídá – aplikace počítá vzorcem); Intrepid – max. 9,975 (VOY „Caretaker“),
  běžně warp 6 (VOY „Dragon's Teeth“, „Pathfinder“); Defiant – warp 9,5 (DS9 „The Sound of Her Voice“), cestovní neuvedena;
  Bird-of-Prey třídy 5 – cestovní 8, max. 9,8 (PRO „Mindwalk“, „Terror Firma“, „Supernova“).
- Voyager: Memory Alpha uvádí podle technického manuálu pro warp 9,975 rychlost 3 053 c; interpolace Okudových exponentů
  dává víc (~6 700 c). Zdroje si tu odporují, aplikace používá interpolaci.
- Modely lodí jsou vlastní zjednodušené tvary z primitiv Three.js (ne převzaté 3D modely), jen připomínají siluetu.
  Názvy lodí a ras jsou ochranné známky Paramountu – nekomerční fanouškovská vrstva.

### Písma (přibalená v aplikaci, `src/fonts.ts`)
- Chakra Petch, IBM Plex Sans, IBM Plex Mono – balíčky Fontsource (`@fontsource/*` 5.3), licence **SIL Open Font License 1.1**
  (pole `license` v package.json balíčků + soubor LICENSE v balíčku). Jen podmnožiny latin a latin-ext.
- Dřív se načítala z Google Fonts; přibalení kvůli offline režimu (etapa 7) a bez požadavků na Google.

### Nespolehlivé vzdálenosti → jen směr (10. 10. 2026, Ráďa: „jen směr hromadně“)
Pravidla v `pipeline/katalog.py` (`Vrstva.nespolehliva`), platí pro všechny katalogové vrstvy při každém přegenerování.
Objekt zůstane v seznamu a hledání se směrem, v kartě „neznámá (na mapě jen směr)“ a důvod v řádku zdroje.
- **Nejistota přes 100 %** (polovina intervalu dm–dp větší než vzdálenost) **nebo bez horní meze** (paralaxa menší než
  její chyba): 43 hvězdokup Hunt & Reffert (dříve 64–544 kpc), 5 jasných hvězd Hipparcos (β Phe, μ Sgr, ο¹ CMa, σ Ori,
  Almaaz), 3 masery u centra, 1 pozůstatek supernovy
- **Mimo disk** (jen typy, které do disku patří; R0 = 8,15 kpc): cefeidy a mračna MD17 nad 30 kpc od středu
  (14 cefeid – mají pak typ „bez vzdálenosti“ –, 31 mračen s kinematickou vzdáleností až 60 kpc); pulsary nad 80 kpc
  (J0048-7317 100 kpc, J0518-6939 – Magellanova mračna jsou ~50–60 kpc). Hvězdokupy ne – kulové v halu jsou přes 100 kpc.
- **Hvězdokupy:** Hunt & Reffert pod jménem kulové hvězdokupy z Baumgardta – vzdálenost do 25 % → duplicita, vynecháno
  (IC 1276 = Palomar 7); jinak přejmenováno „… (Hunt & Reffert)“ (Lynga 7: HR23 945 pc × Baumgardt 7 900 pc)

### Duplicitní jména (10. 10. 2026, bod 7 kontroly)
- Masery Reid 2019: dva masery „G123.06-06.30“ → jméno doplněné o OName: „G123.06-06.30 (NGC281)“ a „(NGC281W)“
- WISE H II (Anderson 2014): G021.596-00.161 a G039.388-00.143 jsou v katalogu dvakrát (poloha o 0,001° jinde) → jen jednou
- Sharpless: Sh2-42, 71, 78, 123, 176, 188, 200, 216 jsou ve skutečnosti planetární mlhoviny (González-Santamaría 2021
  je vede pod stejným jménem) → jen planetární mlhovina, „S N“ a LBN přešly do jejích aliasů
- Mračna Zucker 2020 se jménem oblasti H II (M16, M17, W3, W4, Mon R2, RCW38, Sh2-231, Sh2-232) → „… (mračno)“
- Lynds VII/7A: 4 temné mlhoviny bez čísla LDN (podle ReadMe) → „Lynds bez čísla LDN (Seq N)“ místo „LDN None“

### Aktualizace katalogů 10. 10. 2026 (PC)
- **Exoplanety:** NASA Exoplanet Archive PSCompPars znovu staženo – 6 445 planet ve 4 842 soustavách (dříve 6 375 / 4 780)
- **Hvězdokupy → Hunt & Reffert 2024** (A&A 686, A42; CDS J/A+A/686/A42, katalog CDS volně s citací): stejných 7 167 kup
  jako HR23 (polohy a vzdálenosti se nemění), nově zařazení podle Jacobiho poloměru – otevřená (vázaná) 5 647, pohybová
  skupina 1 309, „příliš daleko k zařazení“ 62 (nový typ „Vzdálená kupa“), kulové 132 (vynechány, kreslí Baumgardt),
  **vyřazené 17 vynechány** (cizí galaxie NGC 7793, NGC 247, M 81, Sextans A, Ant 2, Crt 2, Boo I, kupy v LMC/SMC
  a mostu mezi nimi, 2 chyby shlukování). Hmotnost: MassJ (uvnitř Jacobiho poloměru), jinak MassTot. Filtr kvality =
  vysoce kvalitní výběr autorů: CST ≥ 5 a CMD ≥ 0,5 u typu „o“ dává přesně 3 530 jako abstrakt (ověřeno)
- **Planetární mlhoviny – vzdálenosti z extinkce:** Deng, Wang & Jiang 2026, A&A 708 (Zenodo 10.5281/zenodo.23201969,
  verze 3 ze 7. 10. 2026, **CC BY 4.0**): 1 066 PN. Párování napřed podle jména, pak podle označení PN G (označení se
  v katalozích liší: GS21 „PN G069.4+-3.8“; „PN G158.3-05.6a“ je v GS21 Pa167, v Deng Sh 2-215). Kde je paralaxa
  (GS21), zůstává – obě metody se shodují (medián poměru 1,00, 251 PN). Nově vzdálenost u 701 PN z GS21 + 113 PN navíc
  (poloha SIMBAD/Sesame „PN jméno“ u 95, z označení PN G ±0,1° u 18). Planetárních se vzdáleností 405 → 1 220.
  HASH (hashpn.space) vyžaduje registraci účtu – nepoužito
- **BlackCAT – aktuální web** (https://www.astro.puc.cl/BlackCAT/transients.php, HTML tabulka 73 tranzientů, staženo
  10. 10. 2026 do raw/blackcat): 13 kandidátů navíc proti verzi 2016 (VizieR). Vzdálenost čtená jen z jednoznačných
  zápisů (x±y, x +a −b, a–b, ~x); meze a víc hodnot jen v poznámce („6 0.73±0.03“ u MAXI J1810-222 nejasné → jen směr);
  MAXI J1744-294 „1 pc of Sgr A*“ → vzdálenost R0
- **Kandidáti na spící černé díry z Gaia:** Müller-Horn et al. 2026, A&A 709, A62 (arXiv:2510.05982; Zenodo 19181131,
  **CC BY 4.0**): 389 červených obrů s fit_companion_mass > 3 M☉ a flag_quality (výběr podle popisu na Zenodu = počet
  v abstraktu). Nový typ „Kandidát z Gaia (spící, nepotvrzený)“; vzdálenost 1/paralaxa (všech 389 má chybu pod 100 %)

