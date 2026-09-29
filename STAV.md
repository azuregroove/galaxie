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

## Rozhodnutí
- Web veřejně na GitHub Pages (účet azuregroove), později PWA a mobilní aplikace přes Capacitor
- Stavba v Claude Code, plánování a rešerše v projektu v aplikaci Claude
- Model: Opus na architekturu a pipeline, Sonnet na rutinní práci
- 2026-09-29: **R₀ = 8,15 kpc (Reid et al. 2019)** místo 25 600 ly z prototypu; sedí s modelem ramen pro etapu 5
- 2026-09-29: **exoplanety jako bod = planetární systém** (planety v kartě, hledání najde i planetu)
- 2026-09-29: struktura repa – Vite v kořeni, `src/`, `public/data/`, `pipeline/`, `prototyp/`
- 2026-09-29: data v etapě 1 jako sloupcový JSON + manifest; binární dlaždice/octree až v etapě 2
- 2026-09-29: **binární dlaždice/octree dat odloženy do Etapy 5** (Gaia vzorek); teď jen prostorový index v paměti
- 2026-09-29: filtr metoda/rok: systém se zobrazí, když vyhoví aspoň jedna planeta
- 2026-09-29: TypeScript ~6.0 podle šablony create-vite (TS 7 je venku, ale šablona ho zatím nepoužívá)

## Ověřená čísla (29. 9. 2026)
- PSCompPars: 6 372 planet, 6 344 se vzdáleností, 4 779 systémů, max 8 500 pc
- GitHub Pages: web ≤ 1 GB, repo doporučeně ≤ 1 GB, měkký limit 100 GB přenosu/měsíc, deploy ≤ 10 min,
  10 buildů/h (neplatí pro vlastní Actions workflow)

## Známé nedostatky
- Z cloudu jsou NASA archiv i CDS/SIMBAD blokované – stahování a kontroly dat jen na PC
- 11 černých děr má polohu z katalogového označení (odchylka až 1°) – **zatím neopraveno** v cerne_diry.py,
  správné polohy vypíše `py pipeline\overit_simbad.py` (běží jen na PC, cloud k CDS nemá přístup)
- HD 130298 má v datech ještě possrc „memory“ – přepsat na ověřenou (SIMBAD); paralaxa SIMBAD 0,392 mas
  (≈ 8 300 ly) vs. použitých 7 900 ly – o vzdálenosti rozhodnout
- NGC 3201 #21859/#12560: poloha = střed kupy, v kartě to tak označit
- XTE J1859+226 a H 1705-25 bez vzdálenosti (jen směr)
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
- Ráďa: vyzkoušet Etapu 2 na PC a telefonu (`npm run dev -- --host`), změřit výkon; commit/push jen s jeho souhlasem
- Na PC: přepsat polohy „z označení“ v pipeline/cerne_diry.py podle overit_simbad.py (possrc → „simbad“),
  doplnit text do SRC v src/layers/blackHoles.ts, znovu `py pipeline\cerne_diry.py`
- Pak Etapa 3 (hvězdokupy, mlhoviny, pulsary): nejdřív ověřit zdroje, licence a velikosti katalogů, stahování ohlásit
- Git: 2026-09-29 Ráďa odsouhlasil commit + push a přesun sezení do cloudu (cloudové kredity);
  další push/PR/Actions dál jen s jeho souhlasem
