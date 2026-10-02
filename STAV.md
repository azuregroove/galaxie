# STAV projektu Galaxie

Aktualizovat na konci každého sezení.

## Hotovo
- 2026-09-29: prototyp mapy černých děr (prototyp/cerne-diry-mapa.html)
  - 37 hvězdných černých děr + Sgr A* + Omega Centauri (IMBH kandidát)
  - data: prototyp/cerne-diry.json, skript data-pipeline/cerne_diry_souradnice.py
- Založena složka projektu, CLAUDE.md, tento soubor
- 2026-09-29 (večer): **Etapa 1 – kostra hotová, build prochází**
  - Vite 8 + TypeScript 6 + three 0.186 (Context7: OrbitControls z `three/addons/…`), `base: "./"`
  - prototyp převeden do modulů: core/ (Frame, jednotky), scene/ (Stage, backdrop, overlays), layers/ (rozhraní Layer,
    černé díry, exoplanety), ui/ (HUD, popisky)
  - nové: hledání (i podle jména planety, bez diakritiky), seznam 150 nejbližších z výsledků, karta systému
    s tabulkou planet, pohled „Okolí Slunce“, přepínač mřížky, panel „Zdroje“ z manifestu,
    dynamické near/far kamery (přiblížení až na desetiny ly), ekliptika a Slunce škálované podle přiblížení,
    kompaktní mobilní lišta
  - pipeline/: common.py, exoplanety.py (TAP PSCompPars → systémy, kontrola l,b astropy vs. archiv),
    cerne_diry.py (výstup v pc), requirements.txt; manifest.json s licencí a citací
  - ověřeno: build bez chyb, Playwright screenshoty desktop 1400×860 + mobil 390×844, žádné JS chyby
    (jediná chyba v testu = Google Fonts blokované v cloudovém sandboxu)
  - README.md (instalace, spuštění), ZDROJE.md (licence, citace, konstanty)

- 2026-09-29 (noc, PC): **plná data exoplanet ověřena v aplikaci**
  - `py pipeline\exoplanety.py` proběhl: 6 372 planet, 4 779 systémů (4 751 se vzdáleností), max 8 500 pc, JSON 747 kB
  - build OK; v prohlížeči bez JS chyb, hledání „trappist-1 e“ → karta TRAPPIST-1 (40,5 ly / 12,4 pc, 7 planet)
  - výkon: renderer.render ≈ 0,6 ms/snímek (GTX 1050 Ti), 191 draw calls, 65 k bodů vč. pozadí
  - lokální git repo založeno, commit Etapy 1, remote origin = github.com/azuregroove/galaxie
- 2026-09-29 (noc): **kontrola souřadnic černých děr proti SIMBADu** – `pipeline/overit_simbad.py`
  (CDS Sesame přes zrcadlo CfA; server CDS má neúplný řetězec certifikátů pro Python na Windows)
  - položky „wiki“ sedí do ~1″ (GS 2000+25 6,5″, Swift J1727.8-1613 41″ – pro mapu zanedbatelné)
  - **HD 130298 ověřena: odchylka 0,7″** (SIMBAD 14 49 33,77 −56 25 38,5)
  - polohy z katalogových označení se liší o 0,02–1,03° (nejvíc GRO J1719-24 = V2293 Oph 1,03°,
    GS 1354-64 0,49°, GRS 1009-45 0,48°, GX 339-4 0,33°, XTE J1550-564 0,23°, MAXI J1305-704 0,17°)
  - SIMBAD nenajde OGLE-2011-BLG-0462 a hvězdy NGC 3201 (#21859, #12560 – obě mají souřadnice středu kupy)
  - Gaia BH1–3 SIMBAD zná jen pod čísly Gaia DR3 průvodců (v mapování skriptu)

- 2026-09-29 (cloud): **Etapa 2 – výkon, popisky, filtry, #kotva, mobil** (build OK, testy Playwright desktop 1400×860 + mobil 390×844 s dotykem)
  - `core/spatial.ts`: statický octree nad objekty; exoplanety z něj berou kandidáty na popisky místo průchodu všemi
  - `ui/labels.ts` přepsán: pool max. 60 DOM popisků pro objekty (dřív ~4 800 divů) + statické popisky;
    rozmisťování podle priority (vybraný > Slunce > významné > anotace > blízké > kruhy), 4 pozice u tečky,
    vyhýbá se panelům HUD a okrajům; ověřeno 0 překryvů a 0 duplicit ve všech pohledech (vč. V404 Cyg / Cyg X-1)
  - rozhraní vrstvy: `labelVisible` → `labelCandidates`, nové `facets` + `applyFilter`
  - `ui/filters.ts`: panel Filtry v seznamu – vzdálenost (log posuvník 1–100 000 ly), metoda objevu, rok objevu;
    systém se ukáže, když **tatáž planeta** splní metodu i rok; v kartě se nevyhovující planety ztlumí;
    viditelnost bodů přes atribut `vis` v shaderu (Context7: `needsUpdate`)
  - ověřené počty proti výpočtu v Pythonu: přímé zobrazení 87 systémů, rok 2020–22 1 000, tranzit+2020–22 714, 10–100 ly 320
  - `ui/anchor.ts`: #kotva `#o=vrstva:jméno&c=kamera,cíl&d=…&rok=…&metoda=…` (replaceState 2×/s, hashchange);
    nesmyslné hodnoty se ignorují; tlačítko Sdílet (mobil: systémové sdílení, desktop: schránka + toast)
  - mobil: legenda sbalená pod „Vrstvy“ (hlavička 70 px), dotykové plochy ≥ 40 px, dvojklep do prázdna = přiblížit,
    kartu zavře tah dolů, jednorázová nápověda gest (localStorage), střed pohledu se posune nad kartu
    (`setViewOffset` s přepočtem fov/aspect, měřítko beze změny), MSAA jen při DPR < 2
  - JS bundle 601 kB (gzip 154 kB)

- 2026-09-29 (cloud): Etapa 2 commitnuta a pushnuta (fc06b15, Claude GitHub App nainstalována)
- 2026-09-29 (cloud): **Etapa 3 – hvězdokupy, mlhoviny, neutronové hvězdy** (build OK, Playwright desktop + mobil)
  - pipeline: `katalog.py` (CDS stahování + obecný formát schema 2), `hvezdokupy.py`, `mlhoviny.py`, `neutronove_hvezdy.py`
  - data: hvězdokupy 7 211 (všechny se vzdáleností, 761 kB), mlhoviny 7 358 (1 869 se vzdáleností, 819 kB),
    neutronové hvězdy 2 567 (2 506, 338 kB); kontrolní hodnoty sedí: Plejády 135 pc, Helix 199 pc, Orion A 400 pc
    (maser), Krabí pulsar 2 kpc, Vela 280 pc
  - aplikace: `layers/catalog.ts` (obecná vrstva: barvy typů, filtry typů + faset z dat, popisky, karta,
    objekty bez vzdálenosti jen v seznamu + směrový paprsek po výběru), legenda po skupinách s přepínačem celé skupiny,
    výška hlavičky řídí panel seznamu, nové filtry „Kvalita“ (kupy) a „Původ vzdálenosti“ (mlhoviny), kotva je nese
  - dotyk: výběr čeká 300 ms na případný dvojklep (v hustém přehledu byl dvojklep jinak nepoužitelný);
    ověřeno syntetickými událostmi, Playwright neumí klepat dost rychle při softwarovém WebGL
  - JS bundle 607 kB (gzip 156 kB); data celkem ~2,7 MB JSON
- 2026-09-30 (cloud): **Etapa 3 dokončena – černé díry** (build OK, Playwright desktop 1400×860 + mobil 390×844, bez JS chyb)
  - z cloudu je dostupný Sesame přes `vizier.cds.unistra.fr` → `overit_simbad.py` bere adresu z `SESAME_URL`
  - 13 poloh přepsáno na SIMBAD (11 „z označení“ + GS 2000+25 6,5″ + Swift J1727.8-1613 41″) a HD 130298 („memory“ → simbad);
    nová kontrola: odchylka 0,0–0,1″ u všech; NGC 3201 #21859/#12560 mají possrc „kupa“ (karta to říká)
  - 1E 1740.7-2942: po opravě polohy ~390 ly od Sgr A* v průmětu (dřív ~340)
  - BlackCAT 2016 (CDS J/A+A/587/A61): 57 tranzientů, 18 shod s ručním seznamem (do 15″; 1′ by spletl
    SWIFT J174540.2-290005 se Sgr A*), **39 nových „kandidátů“**, 14 se vzdáleností; vrstva má 78 objektů
  - XTE J1859+226 a H 1705-25 mají vzdálenost z BlackCAT → už nejsou „jen směr“
  - aplikace: typ „Kandidát (rentgenový tranzient)“ (barva `--bhkand`), objekty bez vzdálenosti jen v seznamu
    + paprsek po výběru (jako CatalogLayer), hmotnost „neurčena“, texty zdroje polohy `simbad`/`kupa`/`blackcat`
- 2026-09-30 (cloud): commit 44c3a20 pushnut (Ráďa odsouhlasil); Ráďa vyzkoušel na PC – „good“
- 2026-09-30 (cloud): **Etapa 4 začátek – třída hvězdy + pohled Soustava** (build OK, Playwright desktop + mobil, bez JS chyb)
  - `src/core/starClass.ts`: třída ze spektrálního typu (vč. WD/DA…, sd…, „m3 V“), jinak **odhad z Teff** podle
    Pecaut & Mamajek 2013 tab. 5 (ověřeno z VizieR J/ApJS/208/9); spektrální typ má 1 687 ze 4 779 systémů, Teff 4 483
  - exoplanety: barva bodu podle třídy hvězdy, legenda = přepínače tříd (O/B … M, hnědý a bílý trpaslík, neznámá),
    karta ukazuje třídu, „odhad z teploty“ a český popis
  - `src/system/`: pohled **Soustava** (tlačítko v kartě systému) – vlastní renderer, hlavní scéna se mezitím
    nevykresluje (`Stage.paused`); elipsy podle e a ω (Keplerova rovnice), periody skutečné a zrychlené (« »),
    přepínač skutečných velikostí, srovnávací dráhy Merkur–Jupiter (kamera se oddálí aspoň na 1 au), tabulka a poznámky
  - chybějící a nebo P dopočteno 3. Keplerovým zákonem (označeno *); rovina drah schematická, fáze ilustrativní
  - pipeline/exoplanety.py stahuje navíc `pl_orbeccen`, `pl_orblper`, `pl_orbincl` → e, w, inc (nepovinné pro starší CSV)
  - elipsy ověřeny jen testovací hodnotou vloženou do stránky (e = 0,9); **skutečná data e zatím nejsou**

## Rozhodnutí
- 2026-09-30: Ráďa chce třídu hvězdy s barvou i pohled Soustava s elipsami (ne jen kruhy)
- 2026-09-30: **Sluneční soustava schválena v krocích 3a → 3b → 3c**: (a) planety, trpasličí planety, velké měsíce se
  skutečnými sklony a polohou k datu + časový posuvník; (b) všechny známé měsíce; (c) planetky a komety – vzorek
  nejjasnějších, plný katalog až na vyžádání. Zdroje JPL + MPC (licence ověřit), z cloudu blokované
- 2026-09-30: **obrázky schváleny jako „odkazy místo souborů“**: (1) Wikidata → Wikimedia Commons náhled + autor/licence
  načtené až v kartě, (2) výřez oblohy CDS hips2fits pro objekty bez fotky (licence přehlídek ověřit),
  (3) exoplanety generované schéma, umělecké představy jen označené; offline jen malá kurátorovaná sada
- 2026-09-30: pohled Soustava jako samostatná scéna v au (v mapě Galaxie jsou dráhy pod přesností float32 a pod pixel)
- 2026-09-30: HD 130298 zůstává 7 900 ly (hodnota z článku), ne 8 300 ly z paralaxy Gaia (Ráďa)
- 2026-09-30: kandidáti z BlackCAT jako samostatný typ ve vrstvě černých děr; shoda s ručním seznamem = poloha do 15″
- Web veřejně na GitHub Pages (účet azuregroove), později PWA a mobilní aplikace přes Capacitor
- Stavba v Claude Code, plánování a rešerše v projektu v aplikaci Claude
- Model: Opus na architekturu a pipeline, Sonnet na rutinní práci
- 2026-09-29: **R₀ = 8,15 kpc (Reid et al. 2019)** místo 25 600 ly z prototypu; sedí s modelem ramen pro etapu 5
- 2026-09-29: **exoplanety jako bod = planetární systém** (planety v kartě, hledání najde i planetu)
- 2026-09-29: struktura repa – Vite v kořeni, `src/`, `public/data/`, `pipeline/`, `prototyp/`
- 2026-09-29: data v etapě 1 jako sloupcový JSON + manifest; binární dlaždice/octree až v etapě 2
- 2026-09-29: **binární dlaždice/octree dat odloženy do Etapy 5** (Gaia vzorek); teď jen prostorový index v paměti
- 2026-09-29: filtr metoda/rok: systém se zobrazí, když vyhoví aspoň jedna planeta
- 2026-09-29: objekty bez vzdálenosti jen v seznamu (směr po výběru); pulsary přes ATNF se zálohou CDS 2016;
  HII oblasti s kinematickou vzdáleností ve 3D s označením; kulové kupy z Baumgardt & Vasiliev 2021
- 2026-09-29: TypeScript ~6.0 podle šablony create-vite (TS 7 je venku, ale šablona ho zatím nepoužívá)

## Ověřená čísla (29. 9. 2026)
- PSCompPars: 6 372 planet, 6 344 se vzdáleností, 4 779 systémů, max 8 500 pc
- GitHub Pages: web ≤ 1 GB, repo doporučeně ≤ 1 GB, měkký limit 100 GB přenosu/měsíc, deploy ≤ 10 min,
  10 buildů/h (neplatí pro vlastní Actions workflow)

## Známé nedostatky
- Z cloudu: CDS/VizieR, Baumgardt, McGill a Cambridge povolené (Custom network access); NASA archiv, ATNF,
  cds.unistra.fr (licenční stránka) a HASH nedostupné
- **Pulsary jsou verze 2016** (CDS kopie) – na PC `py -m pip install psrqpy` a `py pipeline\neutronove_hvezdy.py`
- Licenční podmínky CDS neověřené (viz ZDROJE.md); Hunt & Reffert „spolehlivý“ řez je jen přiblížení (4 105 vs. 4 114)
- Planetární mlhoviny jen z Gaia katalogu (2 035), HASH nedostupný; vzdálenost jen u 405
- Otevřená legenda na mobilu zabere ~600 px (sbalitelná tlačítkem Vrstvy)
- BlackCAT jen ve verzi 2016 (VizieR); aktuální web BlackCAT (novější tranzienty) z cloudu nedostupný
- Gaia BH (plán etapy 3): BH1–3 v ručním seznamu jsou; jiný katalog kandidátů z Gaia zatím ne
- **JPL SSD: k převzetí dat na veřejný web chtějí svolení (FAQ) – napsat jim před etapou 6**
- Sluneční soustava: poloměr Eris, Haumea, Makemake chybí (JPL neuvádí); Saturn bez prstenců
- Planetky a komety: dvoučásticové dráhy – daleko od roku 2026 jen orientační (stupně), po blízkých průletech (Apophis 2029) úplně mimo;
  hledání funguje jen uvnitř pohledu Soustava (hlavní hledání najde jen „Sluneční soustava“ podle aliasů);
  popisek jen u vybraného tělesa; na mobilu může Slunce po přeletu skončit pod spodní lištou
- Jupiter 115 a Saturn 291 měsíců = počet řádků tabulky JPL (vč. předběžných označení) – oficiální počty neověřeny
- Nepravidelné měsíce: dráhy dlouhé přímky přes obraz (ztlumeno), polohy za roky orientační
- Legenda exoplanet má teď 9 přepínačů – na mobilu delší
- Schéma exoplanet: poloměry z PSCompPars mohou být dopočtené z hmotnosti (archiv to v našich datech neoznačuje)
- Parametry ramen převzaté ze SpiralMap, ne přímo z článku – ověřit tab. 2 na PC; rozměry disku (87 400 ly, tloušťky) převzaté z prototypu, neověřené
- Slunce leží v rovině (skutečných ~20 pc nad rovinou zanedbáno)
- Výkon Etapy 2 v cloudu měřit nejde (WebGL běží softwarově na CPU) – ověřit na PC a na skutečném telefonu
- Mobilní ovládání testované jen emulací dotyku v Playwrightu, ne na fyzickém telefonu
- Posuvníky filtrů jsou dva samostatné (od/do), ne jeden se dvěma jezdci
- JS bundle 585 kB (gzip 148 kB), většina je three.js
- data-pipeline/ je nahrazená složkou pipeline/, ponechaná kvůli historii

- 2026-09-30 (cloud): commit c251221 pushnut (třída hvězdy + Soustava); Ráďa povolil v cloudu domény JPL, MPC, CDS alasky, Wikidata, Commons
- 2026-09-30 (cloud): **3a+3b Sluneční soustava** (build OK, Playwright desktop + mobil, bez JS chyb, exoplanety beze změny)
  - `pipeline/slunecni_soustava.py` → `slunecni-soustava.json` (213 kB): 8 planet (Standish tab. 1), 5 trpasličích planet (SBDB),
    459 měsíců (Horizons, 3 epochy; ~6 min stahování, cache v pipeline/raw/jpl)
  - ověření proti Horizons: planety do 4,4′, trpasličí do 2′, měsíce dnes do ~6° (vzorek 25 + 12 velkých)
  - slepé uličky: tabulkové střední elementy JPL (Saturn nesedí ani k epoše; perioda jednou siderická, jindy anomalistická);
    oskulační elementy jedné epochy (rychlé měsíce ujíždějí) → řešení: 3 epochy z Horizons
  - aplikace: `src/system/view.ts` zobecněn (3D sklony a uzly, polohy k datu, posuvník 1800–2050, „Dnes“, měsíce ve skupině planety,
    ukážou se po přiblížení, klepnutí na jméno = přelet + sledování, popisky bez překryvu, max 45), `src/system/solar.ts`,
    `src/layers/solar.ts` (objekt „Sluneční soustava“ v seznamu a hledání, data až po otevření)
  - předběžná označení měsíců zobrazena jako „S/2020 S 15“

- 2026-09-30 (cloud, nové sezení): **3c – planetky a komety** (build OK, Playwright desktop 1400×860 + mobil 390×844, bez JS chyb)
  - `pipeline/mala_telesa.py` → `mala-telesa.json` (442 kB, sloupcový): vzorek 3 187 (po opravě 2. 10. 3 177) těles z JPL SBDB Query API po skupinách
    (pas H ≤ 11: 1 185, NEO H ≤ 17,75: 883, trojáni H ≤ 11: 214, kentauři H ≤ 10: 154, TNO H ≤ 5,5: 232, číslované komety: 516,
    mezihvězdná 3 + ruční výběr cílů sond a slavných komet); podle samotného H by vyšla skoro jen TNO
  - 540 těles se starou epochou (komety) → elementy z Horizons k 1. 1. 2026; kontrola 14 těles proti Horizons k dnešku do 0,3′
  - hyperbolické dráhy (3I/ATLAS, 2I/Borisov, ʻOumuamua, C/2023 A3) – Kepler pro hyperbolu v `kepler.ts`, ověřeno proti Horizons
  - aplikace: body počítané na CPU (jeden `Points`), panel „Planetky a komety“ (hledání bez diakritiky, přepínače skupin),
    klepnutí na bod / výběr z hledání = dráha + údaje (třída dráhy česky, q, a, e, oběh, H/M1, průměr, zdroj a epocha dráhy)
  - MPC z cloudu blokované (403) → jen JPL; licence stejná jako u JPL (svolení před etapou 6)
  - v softwarovém WebGL ~30 ms/snímek desktop (dřív se neměřilo), na skutečném GPU ověřit na PC

- 2026-09-30 (cloud): **bod 4.1 – obrázky z Wikidata/Commons** (build OK, Playwright bez JS chyb)
  - `pipeline/obrazky.py` → `obrazky.json` (152 kB, jen odkazy): 1 739 objektů – hvězdokupy 458, mlhoviny 302, pulsary 19,
    černé díry 12, hostitelé exoplanet 186, Sluneční soustava 762; párování jmény/aliasy/P528 + kontrola polohy (1°/0,2°/0,1°)
  - ruční kontrola vzorku: identita sedí; vyřazen obrázek Velkého anihilátoru (na Wikidata je tam umělecká představa SS 433)
  - karta: náhled + autor + licence z Commons API až při otevření; bez autora/licence jen odkaz; štítek „umělecká představa /
    mapa / světelná křivka / schéma“; české jméno z Wikidata; odkaz na cs (jinak en) Wikipedii a Wikidata
  - **z cloudu Commons API nedostupné** → skutečné náhledy neověřené, jen náhradní cesta a vykreslení s podvrženou odpovědí
  - WDQS při výpadku omezuje na 1 dotaz/min → 3 sloučené dotazy
- 2026-09-30 (cloud): panely vypínací (Vrstvy, Seznam, lišta), legenda s posuvníkem, --bar-h (seznam byl u Ráďi vmáčknutý)

- 2026-09-30 (PC, Ráďa): `exoplanety.py` znovu staženo (b150aa5): výstřednost má 5 305 z 6 372 planet, ω 2 107, sklon 4 842;
  názvy sloupců pl_orbeccen/pl_orblper/pl_orbincl ověřené; HD 80606 b e = 0,932 → elipsa v Soustavě ověřena (Playwright)
- 2026-09-30: Ráďa vyzkoušel mapu na PC – „boží“; náhledy z Commons s autorem a licencí na PC fungují (Ráďa); výkon na GPU nenahlášen
- 2026-09-30 (cloud): **bod 4.2 – výřezy oblohy** (build OK, Playwright bez JS chyb)
  - objekty bez obrázku z Wikidata (kupy, mlhoviny, pulsary, černé díry, hostitelé exoplanet) mají v kartě výřez DSS2 barevný
    z hips2fits (CDS), 330×330 px, pole podle velikosti objektu (mlhoviny úhlová velikost, kupy r50, jinak 9–30′), kroužek = poloha,
    odkaz do Aladin Lite; převod l,b → RA/Dec v prohlížeči ověřen proti astropy (0,02″)
  - při chybě záložní server alaskybis (z cloudu blokovaný), pak text „nepodařilo se načíst“
  - **podmínky užití DSS neověřené** (archive.stsci.edu z cloudu blokované) – ověřit před etapou 6

- 2026-10-01 (cloud): **opravy + schéma exoplanet** (build OK, Playwright desktop 1400×860 + mobil 390×844 s dotykem, bez JS chyb)
  - klik na popisek (jméno exoplanety, Slunce) vybere objekt: popisky dál nechytají události (táhnutí scény funguje),
    `Labels.hitTest` vrací objekt podle obdélníků z posledního snímku; dřív klik na text o ~28 px vedle tečky trefil jinou
    hvězdu (51 Peg → Gl 49) nebo nic (Slunce). Kurzor ruky nad popiskem
  - posuvník „Ramena“ v liště (0 = vyp … 750 %, výchozí 250 %, localStorage `galaxie.armGain`): uniform `armGain`
    v shaderu kulisy zesiluje jas i velikost bodů ramen a místního ramene; ramena dál schematická
  - **bod 2 – schéma soustavy v kartě exoplanet** (`src/ui/exoSchema.ts`, SVG): velikosti planet ve skutečném poměru se
    Zemí a Jupiterem (nominální poloměry IAU 2015 B3) a výsek hvězdy; vzdálenosti na log. ose s Merkurem/Zemí/Jupiterem/Neptunem,
    čárka periastron–apoastron podle e, * = a z 3. Keplerova zákona; planety bez poloměru jen vypsané
  - mapa zveřejněna jako soukromý artefakt: https://claude.ai/artifact/C7E2DwT3ir8g85U8s3ThkW (verze z dist/, 4,2 MB);
    načtení v prostředí artefaktu neověřené, náhledy Commons a hips2fits tam nejspíš blokuje CSP

- 2026-10-01 (cloud): **ramena podle Reid et al. 2019** (build OK, Playwright bez JS chyb)
  - `src/scene/arms.ts`: 7 ramen (3 kpc, Pravítko/Norma, Štít–Kentaur, Střelec–Kýl, Místní, Perseus, Vnější), parametry
    tab. 2 převzaté ze SpiralMap 0.27 (MIT) – arXiv/IOP z cloudu blokované
  - ověření `pipeline/overit_ramena.py` proti 199 maserům (CDS J/ApJ/885/131 tab. 1): rozsahy β modelu = rozsahy maserů
    (Místní −8…34°, Vnější −16…71°, Perseus −23…115°), medián odchylky 0,1–0,3 kpc (≈ šířka ramene);
    slabé místo: rameno 3 kpc (model jen β 15–18°, masery 5–119°, odchylka velká)
  - kulisa: body rovnoměrně po délce ramen, šířka ±1σ = šířka/2 úměrně R; úseky jen s masery mimo model (Štít–Kentaur
    −29…168°, 3 kpc 5…119°) ztlumené; popisky jmen ramen (od vzdálenosti 12 000 ly, schované při jasu 0)
  - ramena pokrývají jen známou část (hlavně 1. a 2. kvadrant) – druhá strana Galaxie v modelu není
  - příčka otočena: blízký konec teď v 1. kvadrantu (dřív omylem ve 4.) – úhel ~27° dál neověřený
  - posuvník Ramena do 750 %, výchozí 150 %

- 2026-10-01 (cloud): **NAVRHY.md** – přehled podobných projektů (NASA Eyes on Exoplanets, Gaia Sky, OpenSpace, Galaxy Map,
  SpaceMap, Universe Map, GalacticResource, Milky Way Explorer) a 13 návrhů vylepšení; weby z cloudu blokované,
  funkce jen z výsledků vyhledávání

- 2026-10-01 (cloud): **návrh 1 – obyvatelná zóna** (build OK, Playwright bez JS chyb): `src/core/hz.ts` (Kopparapu 2014,
  koeficienty z HZs.f90 na CDS), pás ve schématu karty, zelené mezikruží v pohledu Soustava + poznámka; TRAPPIST-1
  (2 566 K) extrapolace označená, e/f/g v konzervativní zóně; hledání řadí přesnou shodu jména dopředu
  - zjištěno: NASA Exoplanet Archive je teď z cloudu dostupný (HTTP 200)

- 2026-10-01 (cloud): **návrh 2 – velikostní třídy planet** (Borucki et al. 2011): `src/core/planetSize.ts`, filtr
  „Velikost planety“ (v kotvě `velikost=`), barevné tečky v tabulce karty, barvy ve schématu i v pohledu Soustava
  (dřívější neozdrojované hranice 1,6/4/10 R⊕ nahrazeny); počty: Země 576, super-Země 1 198, Neptun 2 394,
  Jupiter 1 912, větší 242, neznámý 50; filtr „jen Země“ → 475 systémů (ověřeno proti Pythonu)
  - jen 50 planet bez poloměru → PSCompPars zjevně poloměry dopočítává (pozn. ve schématu platí)

- 2026-10-01 (cloud): **návrh 3 – vlastní jména** (build OK, Playwright bez JS chyb): `pipeline/jmena.py` → `jmena.json` (14 kB),
  `src/core/names.ts`; hledání najde „plejady“, „M45“, „Helvetios“, „Dimidium“, „mlhovina srdce“; v seznamu jméno vedle
  katalogového, v kartě „Česky: …“ / „Jméno hvězdy schválené IAU: …“, jména planet v tabulce, česká jména jako popisky na mapě;
  jména IAU z Wikidata neúplná (viz ZDROJE.md)

- 2026-10-01 (cloud): **návrh 4 – doba cesty** v kartě všech objektů se vzdáleností (světlo, Voyager 1 16,92 km/s z Horizons,
  letadlo 900 km/h, auto 100 km/h), ověřeno proti Pythonu (Proxima: 75 tis. let Voyagerem); galaktické souřadnice
  s desetinnou čárkou (známý nedostatek vyřešen); karta černé díry: jednotka „ly“ před závorku

- 2026-10-01 (cloud): **návrh 5 – pohled z objektu ke Slunci**: tlačítko v kartě (objekty se vzdáleností), kamera do objektu,
  cíl Slunce, otáčení krouží kolem Slunce; na mobilu se karta zavře; popisky ošetřené proti NaN (bod v kameře);
  ověřeno Playwright desktop + mobil (Plejády: kamera 440 ly od Slunce)

- 2026-10-01 (cloud): **návrh 6 – ramena z dat Gaia**: `pipeline/gaia_ramena.py` → `gaia-ramena.json` (145 kB, načítá se až po zapnutí),
  `src/scene/gaiaArms.ts` (jantarová průsvitná textura v rovině Galaxie), tlačítko „Gaia: vyp / Poggio 2021 / DR3 (OB)“;
  vykreslení porovnáno s grafem z Pythonu (matplotlib) – tvary sedí; paprskovité protažení od Slunce je v datech
  (chyby vzdáleností, prach), kolem Slunce díra (nadhustota vůči místnímu průměru)

- 2026-10-01 (cloud): body 7 a 8 (Radcliffeova vlna, Místní bublina, prachová mapa) **odloženy** – data na arXiv, Harvard
  Dataverse, Zenodo, nature.com jsou z cloudu blokovaná; Ráďa povolí domény později
- 2026-10-01 (cloud): **návrh 9 – jasné hvězdy**: `pipeline/hvezdy.py` → `hvezdy.json` (909 hvězd V ≤ 4,5, 134 kB), nová vrstva
  „Jasné hvězdy“ (typy O/B…M barvami tříd), hledání i „alfa Ori“, „beta Cen“; ověřeno Playwright
  - ~~známé: hvězdy s exoplanetami (ε Eri, τ Cet…) jsou v seznamu dvakrát~~ vyřešeno 1. 10. (twins.ts)

- 2026-10-01 (cloud, nové sezení): **návrh 11 – přístupnost** (build OK, Playwright desktop 1400×860 klávesnicí + mobil 390×844, bez JS chyb)
  - seznam: šipky ↑↓, PageUp/PageDown, Home/End, ↓ z hledání do seznamu, ↑ z prvního řádku zpět; Tab vede jen na aktuální řádek
    (roving tabindex, ne přes 150 řádků); po výběru zůstane fokus na stejném objektu i po překreslení seznamu
  - klávesy: „/“ = hledat (otevře seznam), Esc = zavřít kartu a vrátit fokus do seznamu; tlačítko „Přejít na hledání“ jako první Tab
  - čtečky: každý řádek má popis „jméno (české jméno), typ, 40,5 světelného roku od Slunce“ (`spokenLy`, „ly“ by četla jako písmena),
    výběr ohlásí živá oblast `#announce`, karta je oblast pojmenovaná nadpisem (dřív `aria-live` četlo celou kartu), mapa má
    `role="img"` s popisem a odkazem na nápovědu kláves; popisky na mapě a v Soustavě `aria-hidden` (duplikát seznamu)
  - nové `Layer.kindName()` (typ objektu slovy) ve všech vrstvách
  - legenda: tlačítko skupiny má `aria-pressed`; Soustava: fokus na nadpis, mapa pod ní `inert`, po zavření fokus zpět na tlačítko,
    vybrané těleso se ohlásí (`aria-live`); `prefers-reduced-motion` vypne i pulzování značky a CSS přechody
  - **netestováno se skutečnou čtečkou** (NVDA/TalkBack) – jen strom vlastností a fokus v Playwrightu

- 2026-10-01 (cloud): bod 11 commitnut a pushnut (33927c4, Ráďa odsouhlasil) do `claude/jolly-thompson-pyvslt`
- 2026-10-01 (cloud): **návrh 13 – výlety s komentářem** (build OK, Playwright desktop 1400×860 šipkami + mobil 390×844 tlačítky, bez JS chyb)
  - Ráďa schválil: ruční přepínání (bez automatického přehrávání), nejdřív výlety 1 a 2, komentáře 2–4 věty
  - `src/ui/tours.ts`, data `public/data/vylety.json`: zastávka = objekt „vrstva:jméno“ a/nebo předvolený pohled, nadpis, text, zdroj;
    {d}/{pc}/{voyager} doplní aplikace z dat; zastávka s chybějícím objektem se vynechá (varování v konzoli)
  - tlačítko „Výlety ▸“ první v liště → nabídka v kartě; blok výletu nahoře v kartě objektu (‹ Zpět · n/N · Další › · Ukončit),
    šipky ← →, Esc/× ukončí; kotva `#vylet=sousedstvi&krok=3`; zastávky se ohlásí čtečce
  - výlet „Naše sousedství“ (8 zastávek: Slunce, α Cen, Proxima, Barnardova, Sirius, ε Eri, TRAPPIST-1, zpět) a
    „Černé díry Galaxie“ (7: přehled, Gaia BH1, Gaia BH3, Cyg X-1, V404 Cyg, Omega Cen, Sgr A*)
  - `pipeline/overit_vylety.py` – kontrola odkazů po aktualizaci dat (teď v pořádku)
  - Hud: `views`, `cardExtra`, `onCardClose`, `showPanel()`, `announce()` veřejné
  - **oprava staré chyby:** na mobilu se lišta nástrojů neposouvala (šířka 1 204 px) → tlačítka za „Centrum“ (Popisky…Zdroje) byla
    nedosažitelná; teď se posouvá vodorovně (posuvník je skrytý, není vidět, že jde posouvat)
  - Wikipedie z cloudu blokovaná → fakta jen z našich dat + ověřené dotazy (ZDROJE.md)

- 2026-10-01 (cloud): commit f30cb0f (výlety 1+2) pushnut s Ráďovým souhlasem
- 2026-10-01 (cloud): **výlety 3–5 + pomalejší přelety** (build OK, Playwright: všech 5 výletů krok po kroku, žádná nevyplněná značka, bez JS chyb)
  - Ráďa: přelety „jednou tak pomalejší“ → mapa 1,3 → 2,6 s, Soustava 1,1 → 2,2 s (prefers-reduced-motion dál okamžitě)
  - „Zrození a smrt hvězd“ (8): Orion A, NGC 6611 (Orlí mlhovina), Plejády, Hyády, Betelgeuze, Helix, Krabí pulsar, pulsar Vela
  - „Stavba Galaxie“ (6): shora, Slunce v Místním rameni (vzdálenosti ramen spočtené z parametrů Reid 2019), z boku + halo
    (103 ze 165 kulových hvězdokup dál než 1 kpc od roviny), M13, centrum, ramena z Gaia
  - „Obyvatelné světy“ (8): úvod (24 planet < 2 R⊕ v konzervativní zóně, 20 u červených trpaslíků – stejný výpočet jako hz.ts),
    Proxima b, Teegarden c, TRAPPIST-1 e/f/g, LHS 1140 b, TOI-700 d, Kepler-442 b, Země
  - nová značka {z} (výška nad rovinou); overit_vylety.py hlásí i nejednoznačná jména (M16 je v mlhovinách dvakrát)
  - čísla v textech přepsaná ručně z dat → po aktualizaci katalogů projít (hlavně počty v úvodu „Obyvatelných světů“)

- 2026-10-01 (cloud): výlety 3–5 + zpomalení pushnuté (cb6f45f); Ráďa: „je to good“
- 2026-10-01 (cloud): **etapa 4 – propojení jasných hvězd s hostiteli exoplanet** (build OK, Playwright bez JS chyb)
  - `src/core/twins.ts`: shoda do 2′ a rozdíl vzdáleností ≤ 25 % (bez vzdálenosti do 5″) → 36 dvojic (Aldebaran–alf Tau, ε Eri, τ Cet,
    Pollux–HD 62509, μ² Sco…); rozdíly poloh 0,3–76″ = vlastní pohyb mezi epochami Hipparcos a Gaia/PSCompPars
  - hlavní je systém s planetami, jasná hvězda se v seznamu, popiscích a při klikání schová, dokud je systém vidět
    (vypnuté exoplanety → hvězda se vrátí); systém bez vzdálenosti (μ² Sco) ustoupí hvězdě, která ji má
  - hledání najde objekt podle jmen obou (`searchNames`, v kartě se nezobrazují), systém dostane na mapě jméno hvězdy (Aldebaran),
    v kartě odkaz „Táž hvězda ve vrstvě …“ oběma směry
  - z cloudu teď nedostupné i Wikidata a WDQS (dřív šly), dál iau.org, exopla.net, Wikipedie → WGSN a popisy jen na PC

- 2026-10-01 (cloud): propojení pushnuté (2d20dc7); Ráďa: časová osa ano, porovnání objektů zatím ne
- 2026-10-01 (cloud): **etapa 4 – časová osa objevů** (build OK, Playwright desktop + mobil bez JS chyb)
  - `src/ui/timeline.ts`, tlačítko „Objevy“ v liště → panel v kartě: posuvník „do roku X“ (1992–2026) řídí filtr Rok objevu,
    ▶ Přehrát (0,7 s/rok), sloupcový graf objevů po letech podle metody (tranzit, RV, mikročočka, přímé zobrazení, ostatní),
    tooltip a klik na sloupec, tabulka pod „Tabulka“, budoucí roky ztlumené; pohled se přesune na „Slunce“
  - barvy z palety skillu dataviz (tmavý režim), ověřené validate_palette.js proti #0b0f19 (všechny kontroly PASS)
  - počty ověřené proti Pythonu: do 1995 4 planety/2 systémy, 2000 46/39, 2010 498/418, 2016 3 442/2 555, 2026 6 372/4 779
  - po zavření panelu se vrátí dřívější filtr roku; když kartu převezme výběr objektu, přehrávání se zastaví a filtr zůstane do zavření karty
  - Hud: `cardCloseHandlers` (místo jednoho onCardClose), `showPanel(fill)`

- 2026-10-01 (cloud): časová osa pushnutá (6d155a1); Ráďa povolil domény cs.wikipedia.org, www.wikidata.org, query.wikidata.org, www.iau.org
- 2026-10-01 (cloud): **WGSN (oficiální jména IAU) – Ráďa: vynechat.** Důvod: seznam na iau.org po přestavbě webu nedostupný
  (stará i nová adresa 404, FAQ IAU odkazuje na mrtvý odkaz); pas.rochester.edu, exopla.net, en.wikipedia z cloudu blokované
- 2026-10-01 (cloud): **etapa 4 – české popisy z Wikipedie (varianta 2a: načítání v kartě)** (build OK, Playwright s podvrženou odpovědí)
  - `fillDescription` v `src/ui/images.ts`: úvod článku cs Wikipedie z REST API (`/api/rest_v1/page/summary/`) až při otevření karty,
    zkrácený na celé věty (≤ 900 znaků), jen text (escapovaný), rozcestník/chyba/404 → nic; uvedeno: článek, odkaz „autoři“
    (historie), CC BY-SA 4.0, „může být zkrácený“; CORS ověřen s Origin azuregroove.github.io
  - `pipeline/obrazky_hvezdy.py`: jasné hvězdy do obrazky.json podle HIP (P528) – 870 z 909, obrázek 355, cs článek 172
    (WDQS z cloudu prošel); obrázek nepovinný (Entry.file může být null → jen odkazy + výřez oblohy); po obrazky.py spustit znovu
  - objektů s cs článkem celkem 566 + 172 hvězd; Aldebaran bez článku (položka s HIP na Wikidata nemá odkazy – chyba Wikidata)
  - **z cloudu Wikimedia REST vrací 429 (sdílená IP) → skutečné popisy neověřené; ověřit na PC** (jako náhledy Commons)

- 2026-10-01 (cloud, nové sezení, větev `claude/vigilant-clarke-yii046` = jolly-thompson + změny níž):
  - **popisy z Wikipedie poprvé ověřené naostro** (Wikimedia REST z cloudu chvíli prošel): Betelgeuze na mobilu – úvod 491 znaků
    + CC BY-SA 4.0 + odkazy; náhled Plejád z Commons načten; ostatní dotazy 429 (sdílená IP) → karta správně bez popisu
  - oprava: REST API po vypuštěné výslovnosti vrací „Betelgeuze ,\nα Orionis…“ → v kartě byl samostatný odstavec „Betelgeuze ,“;
    `cleanExtract` v `src/ui/images.ts` maže prázdné závorky, mezeru před interpunkcí a zalomení za čárkou (otestováno na skutečném
    úvodu + vzorech, čísla 1.5 a 10:30 nedotčena); build OK
  - Chromium v cloudu nevěří certifikátu proxy → testy s externími zdroji jen s `ignoreHTTPSErrors` (vlastnost sandboxu, ne aplikace)
  - z cloudu dál blokované: arxiv, export.arxiv, dataverse.harvard.edu, zenodo, nature.com, gea.esac.esa.int (Gaia archiv), archive.stsci.edu;
    dostupné: NASA Exoplanet Archive, JPL SSD, CDS VizieR, cs.wikipedia (s limitem)

- 2026-10-01 (cloud): oprava popisů pushnutá (33ecf17, Ráďa odsouhlasil)
- 2026-10-01 (cloud): **aktualizace exoplanet z cloudu** (`exoplanety.py`, 6 s): 6 375 planet / 4 780 systémů (4 752 se vzdáleností),
  dřív 6 372 / 4 779; nové HD 148797 b, c (F6, 172 pc) a TOI-2427 c; změněné hmotnosti HIP 67522 b (71,4 → 13,8 M⊕), c (48,3 → 22,0)
  a parametry TOI-2427 b. `overit_vylety.py` v pořádku; úvod „Obyvatelných světů“ přepočten (24 planet, 20 u M) – beze změny, stejný seznam.
  Build OK, Playwright desktop + mobil: karta HD 148797 se schématem, hlavička 4 780, bez JS chyb. ZDROJE.md doplněn.
  - pro Python v cloudu: `pip install --ignore-installed packaging astropy pandas numpy psrqpy` (debianí packaging jinak blokuje instalaci)

- 2026-10-02 (cloud): **bod 8 – 3D mapa prachu** (build OK, Playwright desktop 1400×860 + mobil 390×844, bez JS chyb)
  - Edenhofer 2024 (Zenodo) z cloudu blokovaný → **Vergely et al. 2022 z CDS** (J/A+A/664/A174): `pipeline/prach.py` → `prach.json`
    + `prach-prehled.bin.gz` (6 × 6 × 0,8 kpc, voxel 20 pc, 639 kB) a `prach-detail.bin.gz` (3 × 3 × 0,8 kpc, voxel 10 pc, 1,24 MB)
  - orientace os ověřená na 8 mračnech; `src/scene/dust.ts` – raymarching v Data3DTexture (API ověřeno Context7), tlačítko
    „Prach: vyp / 6 kpc / 3 kpc“ (načítá se až po zapnutí), prach ztmaví kulisu Galaxie, objekty zůstanou nad ním; kulisa má renderOrder −3
  - viditelné: Místní bublina (prázdná dutina kolem Slunce), mračna k Orionu, Taurus, Cepheus
  - SW WebGL v cloudu: desktop ~2 s/snímek uvnitř krychle (mobil 0,45 s) → **na skutečné GPU a telefonu změřit** (mobil 96 kroků paprsku, desktop 192)
- 2026-10-02 (cloud): **bod 7 (Radcliffeova vlna, Místní bublina, Gouldův pás) blokovaný** – data Alves 2020 a Zucker 2022 jsou na arXiv/
  Dataverse/nature.com; proxy je 2. 10. stále odmítá (politika sítě), VizieR ani PyPI je nemají
- 2026-10-02 (cloud): etapa 6 – koncept e-mailu pro JPL `nasazeni/email-jpl.md` (adresa contact-ssd@jpl.nasa.gov z kontaktní stránky)
- 2026-10-02 (cloud): **etapa 6 – odkazy na JPL SBDB + oprava duplicit** (build OK, Playwright bez JS chyb)
  - vybraná planetka/kometa má odkaz „JPL SBDB“ (`#/?sstr=` podle kódu stránky SBDB; hledá se označení: 433, 1P, C/2023 A3, 2024 YR4)
  - **chyba v datech:** 10 cílů sond (Psyche, Lutetia, Ida, Mathilde, Phaethon, Toutatis, Patroclus, Eurybates, Orus, Leucus) bylo
    dvakrát – Query API vrací spkid jako číslo, SBDB API jako text; `mala_telesa.py` opraven (str), JSON deduplikován bez nového
    stahování → 3 177 těles (pás 1 181, NEO 881, trojáni 210), manifest a e-mail opraveny
  - hledání planetek řadí shodu na začátku slova dopředu („eros“ → 433 Eros, dřív 947 Monterosa)
- 2026-10-02 (cloud): **etapa 6 – příprava nasazení** (`nasazeni/CHECKLIST.md`): workflow `.github/workflows/pages.yml`
  (verze akcí ověřené z tagů, build z čistého klonu OK), licence SpiralMap ověřena (MIT vč. dat, citace arXiv:2506.11383),
  poděkování NASA archivu ověřeno + citace Christiansen et al. 2025; CDS, DSS, JPL copyright a licence Gaia z cloudu blokované
  → Ráďa ověří v prohlížeči. Repo nemá LICENSE (návrh MIT). **Nenasazeno** – čeká na rozhodnutí (svolení JPL, viz checklist)

- 2026-10-02 (cloud): **e-mail JPL odeslán** z Gmailu (Ráďa schválil), podpis Radek Friš; Ráďa: **nasadit až po odpovědi JPL**;
  licence kódu MIT (LICENSE, package.json, README); u Voyageru v kartě doplněno „podle JPL Horizons“
  - přepnutí Pages na „GitHub Actions“ z cloudu nejde (API Pages přes proxy 403) → Ráďa ručně
- 2026-10-02 (cloud): **bod 7 – Radcliffeova vlna a Místní bublina** (build OK, Playwright bez JS chyb) – domény povoleny
  - Harvard Dataverse (vše CC0): vlna Konietzka 2024 (model, 300 bodů, barva = vz), bublina O'Neill 2024 (obálka, mřížka 4°)
  - `pipeline/okoli.py` → `okoli.json` (24 kB), `src/scene/local.ts`, tlačítko „Okolí: vyp/zap“; popisky na bodech z dat
  - ověřeno: vlna prochází 22–131 pc od 7 známých mračen, délka 2 963 pc; bublina 75–550 pc, nahoru otevřená („komín“)
  - **Gouldův pás vynechán** – natočení elipsy v Perrot & Grenier 2003 jen v obrázku (viz ZDROJE.md)
  - bibliografie: O'Neill = ApJ 973, 136 (ADS), Nature články jen DOI (svazek/strana neověřené)
- 2026-10-02 (cloud, večer): **etapa 7 – PWA** (build OK, Playwright desktop 1400×860 + mobil 390×844, bez JS chyb).
  Od JPL zatím odpověď nepřišla (Gmail: jen odeslaný e-mail). Ráďa zvolil PWA a `vite-plugin-pwa` (1.3.0, Workbox 7.4).
  - fonty přibalené z Fontsource (OFL 1.1, jen latin + latin-ext a používané řezy) → žádné požadavky na Google
  - manifest (`manifest.webmanifest`: název, `standalone`, barvy, ikony 192/512/maskable/SVG), ikona `public/icons/icon.svg`
    (dekorativní spirála, ne model Galaxie) → PNG přes Chromium; apple-touch-icon
  - precache 38 souborů / 4,9 MB: aplikace, fonty, ikony, **všechny JSON katalogy**; prach (`.bin.gz`) až po zapnutí
    (CacheFirst), náhledy Commons + hips2fits CacheFirst max 60 / 30 dní, Wikipedie + Commons API NetworkFirst (5 s)
  - `registerType: "prompt"`: nová verze se nenačte sama uprostřed letu, nahoře lišta „Je k dispozici nová verze mapy“
    (Načíst / Později); po prvním uložení hláška „Mapa je uložená a funguje i bez internetu“
  - ověřeno v Playwrightu: první načtení → offline → reload: mapa, 6 vrstev, hledání „trappist“ fungují, 0 požadavků mimo
    localhost; prach po zapnutí uložen a offline se zapne; nový build → lišta s novou verzí → Načíst
  - pozn.: při úplně první návštěvě stránku SW ještě neřídí (prompt režim bez clientsClaim) → prach a obrázky
    se ukládají až od druhého načtení; katalogy jsou offline hned
  - neověřeno: instalace na plochu na skutečném telefonu (Android/iOS) a chování na GitHub Pages (až po nasazení)
- 2026-10-02 (cloud, noc): commit bad936c (PWA) pushnut s Ráďovým souhlasem do `claude/busy-hypatia-fvo0mb`
- 2026-10-02 (cloud, noc): **etapa 5 – hvězdy do 100 pc z Gaia** (build OK, Playwright desktop 1400×860 + mobil 390×844, bez JS chyb)
  - Ráďa zvolil: všech 331 312 hvězd GCNS (Gaia Collaboration 2021, CDS J/A+A/649/A6) + karty s údaji v extra souborech
  - `pipeline/gaia100.py`: stažení 63 MB TSV (víc než ohlášený odhad 35–45 MB), 1 min 18 s; kontrola polohy proti GCNS
    medián 0,0025 pc; 30 745 hvězd má medián vzdálenosti 100–119 pc (výběr podle paralaxy) – ponecháno, karta to říká
  - výstup: `gaia100-body.bin.gz` 2,35 MB (int16 polohy, G, BP−RP, WD_prob; řazeno podle G), `gaia100-info-00…10.bin.gz`
    celkem 5,7 MB (Gaia ID, paralaxa, Dist16/50/84, RUWE, GCNS_prob, RV) – původně jeden soubor 6,45 MB, rozdělen,
    aby klik stáhl jen ~0,55 MB
  - `src/scene/gaia100.ts`: tlačítko „Gaia 100 pc: vyp/zap“, body v lokálních souřadnicích kolem Slunce, velikost a jas
    podle hvězdné velikosti z místa kamery (při průletu blízké hvězdy zjasní), barva podle BP−RP (orientační);
    do 900 ly od Slunce všechny body, dál 40 000 nejjasnějších, nad 9 000 ly skryto
  - výběr: když klik netrefí běžný objekt, hledá se nejbližší hvězda Gaia (`Hud.extraPick`); karta: Gaia DR3 ID,
    vzdálenost s 16.–84. percentilem, paralaxa, G, absolutní G, BP−RP, bílý trpaslík, RV, RUWE, GCNS_prob, odkaz SIMBAD,
    výřez oblohy; „Pohled odtud ke Slunci“ funguje
  - ověřeno: hodnoty v kartě proti TSV (Gaia DR3 2626879586818300416: plx 10,914, Dist50 91,67 pc, G 15,50, z −67 pc) ✓
  - PWA: `.bin.gz` v runtime cache `galaxie-binarni` (max 20 souborů) až po použití; `gaia100.json` v precache
  - omezení: hvězdy Gaia nejsou v seznamu ani hledání (331 tis. řádků); sdílení přes #kotvu vybranou hvězdu Gaia neobnoví;
    v okolí Slunce se hvězda z GCNS a táž jasná hvězda / hostitel exoplanet kreslí dvakrát (bez párování)
- 2026-10-02 (cloud): commit 6c12481 (Gaia 100 pc) pushnut s Ráďovým souhlasem; Ráďa: „mapa je boží“
- 2026-10-02 (cloud): **Sloupy stvoření – 3D rekonstrukce** (pushnuto s Ráďovým souhlasem; build OK, Playwright desktop, bez JS chyb)
  - Ráďa je nemohl najít → nová vrstva `src/scene/pillars.ts`, objekt „Sloupy stvoření“ v hledání (i „pillars“, „M16 sloupy“)
  - `pipeline/sloupy.py`: obrys z Pan-STARRS (maska prachu), rozdělení P1a/P1b/P2/P3, hloubky hrotů ze Sofue 2020 (přepočet
    na 1 698 pc), pořadí před/za hvězdami z McLeod 2015 a Karim 2023; sklon os 30° a válcová tloušťka = předpoklady
  - kontrola geometrie: promítnuté vzdálenosti hrotů od HD 168076 sedí se Sofue × 0,85 (poměr vzdáleností 1,7/2,0 kpc)
  - karta: popis, co je z dat a co odhad, Webbův snímek z Commons, tlačítko „Pohled ze Země“ (obraz je pootočený –
    v mapě je nahoře galaktický sever)
  - body (469 kB) se stahují až při přiblížení pod 600 ly nebo po výběru
- 2026-10-02 (cloud): **Temná hmota – halo podle McMillan 2017** (build OK, Playwright, bez JS chyb)
  - Ráďa vybral bod 2 (halo jako model); tlačítko „Temná hmota“, 3 slupky (8,21 / 19,6 / 50 kpc) s popisky hustoty
    a hmotnosti uvnitř; objekt „Halo temné hmoty (model)“ v hledání s kartou (čísla z tab. 3, ověřeno z arXiv PDF)
  - opraveno během práce: citace „MNRAS 465, 76“ a rozsah „0,3–0,6 GeV/cm³“ byly zpaměti → nahrazeno DOI a nejistotou z článku
- 2026-10-02 (cloud, noc): **Star Trek – fanouškovská vrstva hotová** (pushnuto s Ráďovým souhlasem; build OK, Playwright desktop + mobil, bez JS chyb)
  - Ráďa povolil domény; Memory Alpha + Memory Beta přes MediaWiki API (ditl.org a en.wikipedia proxy dál odmítá – nevadí)
  - `pipeline/startrek_stahni.py` (14 686 stránek, raw ~25 MB, není v gitu) + `pipeline/startrek.py` → `startrek.json` 128 kB
  - 473 soustav: 406 skutečných hvězd (Vulkán = 40 Eri, Andorie = Prokyon…), 56 vypočtených z údajů o vzdálenostech,
    hlavní světy a mocnosti bez kotev odhadem (Romulus podle těžiště; Tholiané, Breenové, Gornové… podle sousedů z Memory Beta)
  - kontrola: kvadrant uvedený na wiki souhlasí se skutečnou polohou u 370/377 hvězd
  - Gamma/Delta: 9 schematických oblastí (Dominion, Borg, Kazoni, Talaxiané, Vidiiané, Krenim, Hirogeni, Malon, Devore)
  - aplikace `src/scene/startrek.ts`: tlačítko „Star Trek“ (výchozí vyp), legenda s 25 mocnostmi + „Bez příslušnosti“,
    bubliny 14 ly kolem soustav, karta s varováním „fikce“, způsobem umístění a odkazy na wiki; hledání (Qo'noS, Vulcan…)
  - známé slabiny: Memory Beta míchá zdroje (např. romulanské kotvy Chara 27 ly, Cor Caroli) – ponecháno, jak wiki uvádí;
    přes 1 000 soustav bez vzdálenosti na mapě není; Delta oblasti leží schematicky na jedné přímce (pořadí cesty Voyageru)
- 2026-10-02 (cloud): **Star Trek – zablokované** (Ráďa chce hranice ze Star Charts a fanouškovských map, „na nikoho
  nezapomenout“): z cloudu blokované memory-alpha.fandom.com, memory-beta.fandom.com, ditl.org, en.wikipedia.org
  (curl i WebFetch). Star Charts (Mandel 2002) je placená kniha, online legálně není. Čeká na povolení domén nebo
  na Ráďův zdroj; podle STAV: nekopírovat mapy doslova, jen fakta (které hvězdy komu patří) a vlastní odvození

- 2026-10-02 (cloud, pozdě v noci, větev `claude/happy-albattani-vecsdh` = busy-hypatia + tohle): **Star Trek – souvislá území
  a katalog** (build OK, Playwright desktop 1400×860 + mobil 390×844 s dotykem, bez JS chyb)
  - raw data znovu stažena (`startrek_stahni.py`, 14 686 stránek, 24 MB, ~5 min; v gitu nejsou)
  - `pipeline/startrek_uzemi.py` → `startrek-uzemi.bin.gz` 104 kB: mřížka 128×128×80 po 5 ly, měkké sjednocení (soft-min
    8 nejbližších, 6 ly) do 30 ly, hranice mezi mocnostmi uprostřed; `src/scene/startrek.ts` raymarching (štítek bez
    interpolace + interpolovaná vzdálenost k hranici → hladký okraj a jasná slupka), stahuje se až při zapnutí, přepínače
    v legendě přes paletu; bubliny jen u soustav mimo mřížku, bez příslušnosti a u oblastí Gama/Delta
  - Bajor má jen 12 buněk (jediná soustava, obklopená Federací a Cardassií) – tak dopadne pravidlo „nejbližší mocnost“
  - `pipeline/startrek_katalog.py` → `startrek-katalog.json` 923 kB (gzip 87 kB): 12 739 položek (2 379 hvězd, 5 308 soustav,
    5 052 planet), na mapě 768; obecný parser infoboxů (Memory Beta `planetInfobox` původní skript vůbec nečetl),
    zrcadlový vesmír jako samostatné položky, příslušnost i z kategorií („Klingon worlds“) a zkratek MB (`type = fed`)
  - `src/ui/trekCatalog.ts`: tlačítko „Katalog ST“, hledání bez diakritiky, filtry druh / mocnost / kvadrant / jen na mapě,
    detail s planetami soustavy, odkazy na obě wiki, „Ukázat na mapě“ (zapne mocnost a přeletí); v kartě soustavy na mapě
    tlačítko „Hvězdy a planety v katalogu“
  - PWA precache teď 6,0 MB (katalog je JSON → offline hned)
  - pushnuto s Ráďovým souhlasem (2. 10.) do `claude/happy-albattani-vecsdh`

- 2026-10-02 (cloud): **`startrek.py` čte `planetInfobox` z Memory Beta** (build OK, Playwright desktop, bez JS chyb)
  - obecný parser infoboxů a `system_of` přesunuty z katalogu do `startrek.py` (katalog je importuje); MB vzor
    „[[X]] [[star]] [[system]]“; odmítnuty obecné pojmy (dřív vznikla „soustava“ `Star` z desítek planet s odchylkou ±55 %)
  - výsledek (srovnáno se stejnými raw daty bez opravy): soustav s příslušností Federace 883 → 1 280, Klingoni 245 → 320,
    Romulané 206 → 245; na mapě 473 → 484 soustav, skutečných hvězd 396 → 410, vypočtených 66 → 64;
    medián odchylky výpočtu 1,7 % → 0,6 %, 90 % pod 4,1 % (dřív 94,5 % – kvůli smetí `Star`)
  - změny: Gemma Federace → Romulané, Pi Canis Majoris Romulané → Klingoni (podle nově čtených planet MB);
    Epsilon Draconis bez příslušnosti (MB „Dominion“ zahozeno – skutečná hvězda v Alfa/Beta); P'Jem patří k Luyten's Star
    (podle MA); „Území: Kzinti“ (odhad podle sousedů) nahrazeno skutečnou hvězdou Zeta Sagittarii; nová drobná mocnost
    „Miaplacidan Alliance“ (Beta Carinae) v legendě
  - území: jádro 10 ly (Bajor jinak zmizel úplně), soustavy u okraje mřížky z území vyřazeny (useknuté tvary) → 111 kB
  - katalog: 12 954 položek (soustav 5 523), na mapě 991; ubylo smetí (G-type star, trinary star, Star Trek Online…)

- 2026-10-02 (cloud): **Star Trek – vyhlazená území** (Ráďa: „takhle sem si to představoval“, jen koule uvnitř Federace;
  build OK, Playwright desktop, bez JS chyb)
  - ostré kruhy uvnitř = bubliny 196 soustav „bez příslušnosti“ → teď jen body (území nemají)
  - měkké oblouky = okraj Federace poskládaný z koulí 30 ly → pole rozmazané Gaussem σ 8 ly + zaplnění dutin a zálivů
    (`ndimage.binary_closing` 15 ly, `binary_fill_holes`); hluboko uvnitř rozhoduje EDT, takže tam slupka nesvítí → 100 kB
  - posuvník „Hranice“ v legendě u Star Treku (0–200 %, pamatuje se v localStorage): 0 = jen mlha (výplň zhuštěná),
    100 % = dosavadní vzhled; nová volitelná metoda vrstvy `legendExtra()`
  - pushnuto s Ráďovým souhlasem (2. 10.) spolu s opravou `planetInfobox` do `claude/happy-albattani-vecsdh`

## Rozdělané
- Star Trek – možná vylepšení: (1) ~~MB `planetInfobox` v `startrek.py`~~ (hotovo 2. 10.); (2) výkon raymarchingu území na telefonu neověřen (max. 160 kroků);
  (3) třídy planet z MB někdy jako text („habitable“, „gas giant“) – sjednotit
- etapa 6: čeká na odpověď JPL (e-mail 2. 10.);
  po odpovědi sloučit větev do main = první nasazení (viz `nasazeni/CHECKLIST.md`)
- Gouldův pás: jen pokud se najde zdroj s číselným natočením elipsy (např. tabulka v novější práci) – jinak nechat
- možné vylepšení: mapa prachu Edenhofer 2024 (Zenodo už povolené) místo / vedle Vergely 2022

## Další krok
**Aktuální větev: `claude/happy-albattani-vecsdh`** (= busy-hypatia + Star Trek území a katalog, 2. 10.); předtím `claude/busy-hypatia-fvo0mb` (= vigilant-clarke + etapa 7 PWA, pushnuto 2. 10. s Ráďovým souhlasem). `main` je stále na etapě 3.
Nový chat: přečíst CLAUDE.md + tento soubor z téhle větve.
Na PC: `git fetch origin`, `git switch claude/happy-albattani-vecsdh`, `git pull`, `npm install`, `npm run dev`.
Ráďa smí: commity a push do pracovní větve (2. 10.); do `main` (= veřejné nasazení) až po odpovědi JPL.

1. **Čeká se na odpověď JPL** (e-mail z Gmailu 2. 10., vlákno „Permission request: JPL SSD data…“). Po kladné odpovědi:
   upravit znění poděkování podle JPL, sloučit větev do `main` → workflow nasadí na https://azuregroove.github.io/galaxie/
2. Pages Source = „GitHub Actions“ už je (Ráďa ověřil 2. 10.); Ráďa: přečíst podmínky CDS, DSS, JPL copyright,
   licence dat Gaia (odkazy v `nasazeni/CHECKLIST.md`)
3. Ráďa na PC: vyzkoušet Prach (6 kpc / 3 kpc) a Okolí – výkon na GPU a telefonu; ATNF pulsary (`py pipeline\neutronove_hvezdy.py`)
4. Etapa 7 (PWA) hotová v kódu – Ráďa na PC: `npm install`, `npm run build`, `npm run preview`, v Chrome zkusit
   „Nainstalovat“ a offline (DevTools → Network → Offline); po nasazení zkusit instalaci na telefonu.
   Ráďa na PC: zapnout „Gaia 100 pc“ v pohledu Okolí Slunce – plynulost na GPU a hlavně na telefonu (331 tis. bodů);
   případně snížit FAR_COUNT / NEAR_LY v `src/scene/gaia100.ts`.
   Další: Ráďa zkontroluje Star Trek (správnost mocností), hledání hvězd Gaia podle ID, spárování s Jasnými hvězdami, etapa 8 (Capacitor)
5. Cloudové kredity: 2. 10. zbývalo 11 $ ze 100 – šetřit

**Dlouhodobě (z 30. 9.):**
- Než bude projekt „hotový“: aktualizovat všechna data a čísla z ověřených zdrojů
- Přepínač „Star Trek“: 3D bubliny teritorií (Federace, Klingoni, Romulané, Cardassiané…) z dostupných zdrojů.
  Pozor: fikce – jasně označit jako fanouškovskou vrstvu, u každé polohy zdroj a míru nejistoty; nepřebírat
  chráněné mapy (např. oficiální Star Charts) doslova, jen fakta a vlastní odvození; ochranné známky Paramount – ověřit
- Úplně nakonec: e-mail JPL SSD kvůli svolení k datům (před etapou 6 – nasazení)

- Ráďa: změřit výkon na PC/GPU a na telefonu (hlavně Soustava s 3 177 planetkami); na PC už vyzkoušeno 30. 9. („boží“)
- Na PC: `py -m pip install psrqpy` a `py pipeline\neutronove_hvezdy.py` (aktuální ATNF místo verze 2016)
- Případně HASH (planetární mlhoviny) na PC
- 2026-09-30: Ráďa odsouhlasil commit + push 3c do claude/sharp-cerf-bzaom6
- Git: 2026-09-29 Ráďa odsouhlasil commit + push a přesun sezení do cloudu (cloudové kredity);
  další push/PR/Actions dál jen s jeho souhlasem
