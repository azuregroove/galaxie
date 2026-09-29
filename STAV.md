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

## Rozhodnutí
- Web veřejně na GitHub Pages (účet azuregroove), později PWA a mobilní aplikace přes Capacitor
- Stavba v Claude Code, plánování a rešerše v projektu v aplikaci Claude
- Model: Opus na architekturu a pipeline, Sonnet na rutinní práci
- 2026-09-29: **R₀ = 8,15 kpc (Reid et al. 2019)** místo 25 600 ly z prototypu; sedí s modelem ramen pro etapu 5
- 2026-09-29: **exoplanety jako bod = planetární systém** (planety v kartě, hledání najde i planetu)
- 2026-09-29: struktura repa – Vite v kořeni, `src/`, `public/data/`, `pipeline/`, `prototyp/`
- 2026-09-29: data v etapě 1 jako sloupcový JSON + manifest; binární dlaždice/octree až v etapě 2
- 2026-09-29: TypeScript ~6.0 podle šablony create-vite (TS 7 je venku, ale šablona ho zatím nepoužívá)

## Ověřená čísla (29. 9. 2026)
- PSCompPars: 6 372 planet, 6 344 se vzdáleností, 4 779 systémů, max 8 500 pc
- GitHub Pages: web ≤ 1 GB, repo doporučeně ≤ 1 GB, měkký limit 100 GB přenosu/měsíc, deploy ≤ 10 min,
  10 buildů/h (neplatí pro vlastní Actions workflow)

## Známé nedostatky
- **V public/data je jen testovací výřez exoplanet (67 systémů)** – plná data stáhne `py pipeline\exoplanety.py`
  na PC (z cloudu je NASA archiv blokovaný); aplikace ukazuje štítek „výřez dat“
- HD 130298: souřadnice zpaměti, neověřené; 11 černých děr má polohu z katalogového označení
- XTE J1859+226 a H 1705-25 bez vzdálenosti (jen směr)
- Spirální ramena schematická; rozměry disku (87 400 ly, tloušťky) převzaté z prototypu, neověřené
- Slunce leží v rovině (skutečných ~20 pc nad rovinou zanedbáno)
- Popisky se překrývají (V404 Cyg / Cyg X-1, Gaia BH1/BH3) – chybí kolize popisků
- Fonty z Google Fonts – pro PWA/offline je bude třeba přibalit
- JS bundle 585 kB (gzip 148 kB), většina je three.js
- CLAUDE.md odkazuje na prototyp v `C:\Klouí\Claude outputs\`, ten je teď v `prototyp/`
- data-pipeline/ je nahrazená složkou pipeline/, ponechaná kvůli historii

## Rozdělané
- nic

## Další krok
- Ráďa: nainstalovat Node.js + Python (README), `npm install`, `py pipeline\exoplanety.py`, `npm run dev`
  a zkontrolovat plná data (výkon s ~4 800 body, popisky)
- Ověřit souřadnice z prototypu přes SIMBAD (lokálně), hlavně HD 130298
- Etapa 2: výkon (LOD, dlaždice), kolize popisků, filtry (vzdálenost, metoda, rok objevu), mobilní ovládání,
  sdílení pohledu přes #kotvu
- Git: repo zatím nezaložené – založit a první commit až s Ráďovým souhlasem
