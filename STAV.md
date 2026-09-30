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

## Rozhodnutí
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
- Galaktické souřadnice v kartě mají desetinnou tečku (l 13.95°), jinde čárku – sjednotit
- Spirální ramena schematická; rozměry disku (87 400 ly, tloušťky) převzaté z prototypu, neověřené
- Slunce leží v rovině (skutečných ~20 pc nad rovinou zanedbáno)
- Výkon Etapy 2 v cloudu měřit nejde (WebGL běží softwarově na CPU) – ověřit na PC a na skutečném telefonu
- Mobilní ovládání testované jen emulací dotyku v Playwrightu, ne na fyzickém telefonu
- Posuvníky filtrů jsou dva samostatné (od/do), ne jeden se dvěma jezdci
- Fonty z Google Fonts – pro PWA/offline je bude třeba přibalit
- JS bundle 585 kB (gzip 148 kB), většina je three.js
- data-pipeline/ je nahrazená složkou pipeline/, ponechaná kvůli historii

## Rozdělané
- nic

## Další krok
- Ráďa: vyzkoušet Etapy 2 a 3 na PC a telefonu (`npm run dev -- --host`), změřit výkon s ~22 000 objekty
- Na PC: `py -m pip install psrqpy` a `py pipeline\neutronove_hvezdy.py` (aktuální ATNF místo verze 2016)
- Případně HASH (planetární mlhoviny) na PC
- Etapa 4: karty s popisy a obrázky, česká jména (Plejády, Jesličky…), licence
- Git: 2026-09-29 Ráďa odsouhlasil commit + push a přesun sezení do cloudu (cloudové kredity);
  další push/PR/Actions dál jen s jeho souhlasem
