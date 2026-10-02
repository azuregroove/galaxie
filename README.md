# Mapa Mléčné dráhy („Galaxie“)

Interaktivní 3D mapa naší Galaxie: exoplanety, černé díry, hvězdokupy, mlhoviny, pulsary a magnetary; později hvězdy z Gaia.
Vite + TypeScript + Three.js, statický web (GitHub Pages), později PWA a Capacitor.

## Struktura

```
index.html, package.json, vite.config.ts, tsconfig.json
src/
  core/      souřadnice (Frame: l, b, d -> scéna v ly), jednotky a formátování, typy
  scene/     Stage (renderer, kamera, přelety, WASD), backdrop (schematická Galaxie), overlays (kruhy, ekliptika, mřížka, rozměry)
  layers/    katalogové vrstvy se společným rozhraním Layer (exoplanety, černé díry, obecná CatalogLayer pro katalogy etapy 3)
  ui/        HUD (legenda, seznam + hledání, karta, lišta, měřítko, výběr kliknutím), HTML popisky
public/data/ manifest.json + JSON katalogů (generuje pipeline)
pipeline/    Python skripty, které data stahují a převádějí
prototyp/    původní jednosouborový prototyp (archiv)
data-pipeline/  skript prototypu (nahrazený pipeline/cerne_diry.py, ponechán kvůli historii)
```

## Instalace na Windows (jednorázově)

1. **Node.js** 22.12+ (LTS): https://nodejs.org → „LTS“, instalovat s výchozími volbami.
2. **Python** 3.11+: https://www.python.org/downloads/ → při instalaci zaškrtnout „Add python.exe to PATH“.
3. V PowerShellu ve složce projektu:
   ```powershell
   cd C:\Klouí\galaxie
   npm install
   py -m pip install -r pipeline\requirements.txt
   ```

## Data

V repu jsou vygenerovaná data všech katalogů. Obnova (každý skript pod minutu, dohromady ~15 MB stahování):

```powershell
cd C:\Klouí\galaxie\pipeline
py exoplanety.py          # NASA Exoplanet Archive (PSCompPars, vč. výstředností drah) -> public/data/exoplanety.json
py cerne_diry.py          # černé díry: ruční seznam + kandidáti z BlackCAT (CDS) -> cerne-diry.json
py hvezdokupy.py          # Hunt & Reffert 2023 (CDS) + Baumgardt & Vasiliev 2021 -> hvezdokupy.json
py mlhoviny.py            # WISE H II, Sharpless, Lynds, Zucker, planetární mlhoviny, Green (vše CDS) -> mlhoviny.json
py slunecni_soustava.py   # JPL: planety, trpasličí planety, 459 měsíců (Horizons, ~6 min) -> slunecni-soustava.json
py mala_telesa.py         # JPL SBDB: vzorek 3 187 planetek a komet (+ ~540 dotazů Horizons, ~5 min) -> mala-telesa.json
                          #   --overit = porovnání poloh 14 těles s Horizons
py neutronove_hvezdy.py   # ATNF přes psrqpy (jinak kopie 2016 v CDS) + magnetary McGill -> neutronove-hvezdy.json
py gaia100.py             # Gaia Catalogue of Nearby Stars (CDS, 63 MB TSV, ~1–2 min) -> gaia100.json + gaia100-*.bin.gz
py sloupy.py              # Sloupy stvoření: obrys z Pan-STARRS (hips2fits) + geometrie z literatury -> sloupy.json + .bin.gz
py startrek_stahni.py     # Star Trek: wikitext z Memory Alpha a Memory Beta (~15 tis. stránek, ~25 MB, 5–10 min)
py startrek.py            # Star Trek (fikce): příslušnost, skutečné hvězdy (SIMBAD), výpočet poloh -> startrek.json
py startrek_uzemi.py      # Star Trek: souvislá území mocností (3D mřížka) -> startrek-uzemi.bin.gz
py startrek_katalog.py    # Star Trek: katalog všech hvězd, soustav a planet -> startrek-katalog.json
```

Katalogy etapy 3 sdílí formát (schema 2, popis v `pipeline/katalog.py`) a v aplikaci je čte jedna obecná vrstva.

Syrové CSV se ukládá do `pipeline/raw/` (není v gitu). Test na výřezu: `py exoplanety.py --vstup testdata/pscomppars_vzorek.csv`.

## Vývoj

```powershell
npm run dev       # vývojový server, otevři adresu z výpisu (obvykle http://localhost:5173)
npm run build     # typová kontrola + produkční build do dist/
npm run preview   # náhled buildu (včetně service workeru a offline režimu)
```

PWA: `vite-plugin-pwa` (konfigurace ve `vite.config.ts`, registrace a nabídka nové verze v `src/pwa.ts`).
Service worker vzniká jen při `npm run build`; v `npm run dev` není. Offline je aplikace + všechny JSON katalogy,
prach, hvězdy Gaia do 100 pc a obrázky/popisy z Wikimedie se ukládají až při použití. Ikony v `public/icons/` (zdroj `icon.svg`).

## Konvence

- Scéna je v **světelných letech**, centrum Galaxie v počátku, Slunce v (−R₀, 0, 0), +Y = severní galaktický pól.
- **R₀ = 8,15 kpc** (Reid et al. 2019), hodnota je v `manifest.json` a pipeline (`pipeline/common.py`).
- Data katalogů mají vzdálenosti v **pc**, souřadnice galaktické l, b ve stupních (přepočet z RA/Dec přes astropy).
- U každého objektu evidujeme zdroj polohy; nejistoty se ukazují v kartě.
- Zdroje a licence dat: [ZDROJE.md](ZDROJE.md).
- Licence kódu: MIT ([LICENSE](LICENSE)); data v `public/data/` mají licence svých zdrojů.
