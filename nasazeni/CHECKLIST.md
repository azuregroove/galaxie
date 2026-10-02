# Etapa 6 – nasazení na GitHub Pages: checklist

Stav k 2. 10. 2026. ✅ = ověřeno, ⛔ = z cloudu nešlo ověřit (blokovaná stránka), 👤 = rozhoduje/ověřuje Ráďa.

## Technika
- ✅ Repozitář `azuregroove/galaxie` je veřejný, Pages jsou v něm zapnuté (`has_pages`); co teď servírují a z jakého
  zdroje, z cloudu nevidím (API Pages i github.io blokované).
- ✅ Workflow `.github/workflows/pages.yml`: build Vite → `dist/` → GitHub Pages. Akce checkout@v7, setup-node@v7 (Node 22),
  configure-pages@v6, upload-pages-artifact@v5, deploy-pages@v5 – tagy ověřené na GitHubu. Spouští se pushem do `main`
  nebo ručně. Build z čistého klonu (`npm ci && npm run build`) prošel.
- ✅ `vite.config.ts` má `base: "./"` → funguje i v podsložce `/galaxie/`.
- ✅ Velikost webu 6,4 MB (limit Pages 1 GB); největší soubor prach-detail.bin.gz 1,2 MB.
- ✅ Settings → Pages → Source je „GitHub Actions“ (Ráďa ověřil 2. 10.).
- 👤 Sloučit pracovní větev do `main` = první veřejné nasazení (adresa https://azuregroove.github.io/galaxie/).
- ✅ Licence kódu MIT (`LICENSE`, Ráďa 2. 10.); data mají licence svých zdrojů (ZDROJE.md).

## Licence a svolení dat
| Zdroj | Stav | Co zbývá |
|---|---|---|
| NASA Exoplanet Archive | ✅ text poděkování ověřen (acknowledge.html), doplněna citace Christiansen et al. 2025 | – |
| JPL SSD (planety, měsíce, planetky, Horizons) | ✅ FAQ: k převzetí je potřeba svolení; kontakt contact-ssd@jpl.nasa.gov | e-mail odeslán 2. 10. 2026 → čeká se na odpověď |
| JPL copyright (jpl.nasa.gov/copyrights.cfm) | ⛔ 403 z cloudu | 👤 přečíst v prohlížeči |
| CDS/VizieR (kupy, mlhoviny, pulsary 2016, BlackCAT, Hipparcos, prach…) | ⛔ rights_uri https://cds.unistra.fr/vizier-org/licences_vizier.html | 👤 přečíst v prohlížeči; citace článků v aplikaci jsou |
| DSS přes hips2fits (výřezy oblohy) | ⛔ http://archive.stsci.edu/dss/copyright.html | 👤 přečíst; při problému výřezy vypnout |
| Ramena z Gaia (SpiralMap) | ✅ balík vč. dat pod MIT, citace doplněna | ⛔ licence dat Gaia (ESA, cosmos.esa.int) |
| Wikimedia Commons / Wikipedie | ✅ autor a licence každého obrázku z Commons API, text CC BY-SA 4.0 s odkazem na autory | – |
| Wikidata | ✅ CC0 | – |
| ATNF Pulsar Catalogue | ✅ volně s citací | data jsou verze 2016 → 👤 na PC `py pipeline\neutronove_hvezdy.py` |
| McGill magnetary, Baumgardt kulové kupy | volně s citací (bez výslovné licence) | – |
| Google Fonts | OFL, načítá se z Google | pro offline (etapa 7) přibalit |

## Aktualizace dat (podle CLAUDE.md před nasazením)
- ✅ exoplanety 1. 10. 2026 (6 375 planet)
- ✅ planetky: opravené zdvojení 10 těles (3 177)
- 👤 na PC: ATNF (aktuální pulsary), případně HASH (planetární mlhoviny)
- ostatní katalogy CDS jsou uzavřené publikace, aktualizace nemá smysl

## Rozhodnutí před prvním nasazením (👤)
Svolení JPL zatím není. Možnosti:
1. **Počkat na odpověď JPL** a nasadit vše najednou – **zvoleno 2. 10.**
2. Nasadit hned bez dat JPL (pohled Sluneční soustava by zmizel do odpovědi; exoplanety, kupy, mlhoviny… zůstanou).
3. Nasadit hned vše – v rozporu s FAQ JPL, nedoporučuji.
