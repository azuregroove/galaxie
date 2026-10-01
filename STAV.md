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
- Fonty z Google Fonts – pro PWA/offline je bude třeba přibalit
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
  - `pipeline/mala_telesa.py` → `mala-telesa.json` (442 kB, sloupcový): vzorek 3 187 těles z JPL SBDB Query API po skupinách
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
  - známé: hvězdy s exoplanetami (ε Eri, τ Cet…) jsou v seznamu dvakrát (jasná hvězda + systém)

## Rozdělané
- nic

## Další krok
**Aktuální větev: `claude/confident-lovelace-1lqe2y`** (vše commitnuté a pushnuté 1. 10. 2026, poslední 8e83310+).
Nový chat: přečíst CLAUDE.md (sekce Etapy – zbývající body jsou rozepsané tam) + tento soubor z téhle větve.
Na PC: `git fetch origin`, `git switch claude/confident-lovelace-1lqe2y`, `git pull`, `npm install`, `npm run dev`.
Mapa jako soukromý artefakt: https://claude.ai/artifact/C7E2DwT3ir8g85U8s3ThkW (aktualizovat publikací dist/).
Pravidlo z 1. 10.: po každém dokončeném bodu se zastavit, říct co je hotovo; commit + push předchozího bodu až po Ráďově souhlasu.

**Další na řadě (navrženo Ráďovi):** etapa 4 – přístupnost (bod 11), pak výlety (bod 13); body 7 a 8 až po povolení domén
(arxiv.org, export.arxiv.org, dataverse.harvard.edu, zenodo.org, www.nature.com).

**Dlouhodobě (z 30. 9.):**
- Než bude projekt „hotový“: aktualizovat všechna data a čísla z ověřených zdrojů
- Přepínač „Star Trek“: 3D bubliny teritorií (Federace, Klingoni, Romulané, Cardassiané…) z dostupných zdrojů.
  Pozor: fikce – jasně označit jako fanouškovskou vrstvu, u každé polohy zdroj a míru nejistoty; nepřebírat
  chráněné mapy (např. oficiální Star Charts) doslova, jen fakta a vlastní odvození; ochranné známky Paramount – ověřit
- Úplně nakonec: e-mail JPL SSD kvůli svolení k datům (před etapou 6 – nasazení)

- Ráďa: změřit výkon na PC/GPU a na telefonu (hlavně Soustava s 3 187 planetkami); na PC už vyzkoušeno 30. 9. („boží“)
- Na PC: `py -m pip install psrqpy` a `py pipeline\neutronove_hvezdy.py` (aktuální ATNF místo verze 2016)
- Případně HASH (planetární mlhoviny) na PC
- 2026-09-30: Ráďa odsouhlasil commit + push 3c do claude/sharp-cerf-bzaom6
- Git: 2026-09-29 Ráďa odsouhlasil commit + push a přesun sezení do cloudu (cloudové kredity);
  další push/PR/Actions dál jen s jeho souhlasem
