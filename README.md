# Mapa Mléčné dráhy („Galaxie“)

Interaktivní 3D mapa naší Galaxie: exoplanety, černé díry a později hvězdokupy, mlhoviny, pulsary a hvězdy.
Vite + TypeScript + Three.js, statický web (GitHub Pages), později PWA a Capacitor.

## Struktura

```
index.html, package.json, vite.config.ts, tsconfig.json
src/
  core/      souřadnice (Frame: l, b, d -> scéna v ly), jednotky a formátování, typy
  scene/     Stage (renderer, kamera, přelety, WASD), backdrop (schematická Galaxie), overlays (kruhy, ekliptika, mřížka, rozměry)
  layers/    katalogové vrstvy se společným rozhraním Layer (exoplanety, černé díry)
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

V repu je zatím jen **testovací výřez** exoplanet (82 planet v 67 systémech, stažený 29. 9. 2026 přímo z archivu),
aplikace ho označuje štítkem „výřez dat“. Plná data (~6 400 planet, ~4 800 systémů, pár MB, pod minutu):

```powershell
cd C:\Klouí\galaxie\pipeline
py exoplanety.py        # stáhne PSCompPars z NASA Exoplanet Archive -> public/data/exoplanety.json
py cerne_diry.py        # přepočítá černé díry (offline, stačí po úpravě seznamu)
```

Syrové CSV se ukládá do `pipeline/raw/` (není v gitu). Test na výřezu: `py exoplanety.py --vstup testdata/pscomppars_vzorek.csv`.

## Vývoj

```powershell
npm run dev       # vývojový server, otevři adresu z výpisu (obvykle http://localhost:5173)
npm run build     # typová kontrola + produkční build do dist/
npm run preview   # náhled buildu
```

## Konvence

- Scéna je v **světelných letech**, centrum Galaxie v počátku, Slunce v (−R₀, 0, 0), +Y = severní galaktický pól.
- **R₀ = 8,15 kpc** (Reid et al. 2019), hodnota je v `manifest.json` a pipeline (`pipeline/common.py`).
- Data katalogů mají vzdálenosti v **pc**, souřadnice galaktické l, b ve stupních (přepočet z RA/Dec přes astropy).
- U každého objektu evidujeme zdroj polohy; nejistoty se ukazují v kartě.
- Zdroje a licence: [ZDROJE.md](ZDROJE.md).
