# Datové repo `galaxie-data` (dlaždice Gaia 500 pc)

Rozhodnutí 3. 10. 2026: dlaždice (~190 MB) nejsou v hlavním repu, aby každé přegenerování nenafouklo historii gitu.
Leží v samostatném repu `azuregroove/galaxie-data` s vlastními GitHub Pages:
`https://azuregroove.github.io/galaxie-data/gaia500/` – stejná doména jako mapa, takže prohlížeč je bere
jako stejný původ (bez CORS) a service worker PWA je ukládá do vlastní cache `galaxie-gaia500`.
Historie repa se při každé aktualizaci přepíše jedním commitem (orphan), takže repo drží jen aktuální data.

## Postup na PC (vše až s Ráďovým souhlasem – zápis do GitHubu)

1. Stáhnout: `cd pipeline`, `py gaia500_stahni.py` → `pipeline/raw/gaia500/hp1-NN.csv.gz`
2. Dlaždice: `py gaia500.py` → `public/data/gaia500/` (v .gitignore) + záznam `gaia500` v manifest.json
   (ten se commituje do hlavního repa – bez něj se tlačítko „Gaia 500 pc“ v produkci neukáže)
3. Vyzkoušet lokálně: `npm run dev` (při vývoji se dlaždice berou z `public/data/gaia500/`)
4. Jednou: na GitHubu založit veřejné repo `galaxie-data`, Settings → Pages → Deploy from a branch → `main` / root
5. Publikovat (PowerShell, ze složky `C:\Klouí\galaxie`):
   ```
   $d = "$env:TEMP\galaxie-data"; Remove-Item -Recurse -Force $d -ErrorAction SilentlyContinue
   New-Item -ItemType Directory $d | Out-Null
   Copy-Item -Recurse public\data\gaia500 "$d\gaia500"
   Copy-Item nasazeni\galaxie-data\README.md "$d\README.md"
   New-Item "$d\.nojekyll" -ItemType File | Out-Null
   cd $d; git init -b main; git add -A; git commit -m "Gaia 500 pc: dlaždice"
   git remote add origin https://github.com/azuregroove/galaxie-data.git
   git push --force origin main
   ```
   `--force` je tu záměrně: repo má jen data a stará verze se zahazuje. README (licence a citace dat Gaia) je
   v `nasazeni/galaxie-data/README.md` – kopíruje se při každém publikování, jinak by ho orphan commit smazal.
6. Ověřit: `https://azuregroove.github.io/galaxie-data/gaia500/index.json` vrací JSON a `"test": false`.

## Limity (GitHub, ověřeno 29. 9.)
- web na Pages ≤ 1 GB, repo doporučeně ≤ 1 GB, soubor < 100 MB (největší dlaždice ~0,1–0,2 MB), 100 GB přenosu/měsíc
- syntetická testovací data (`py gaia500.py --test`) nikdy nepublikovat – aplikace je značí „(TEST)“
