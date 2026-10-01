# Projekt: Mapa Mléčné dráhy (pracovní název „Galaxie“)

## Cíl
Interaktivní 3D mapa naší Galaxie, veřejně dostupná na webu a později jako mobilní aplikace.
Uživatel v ní volně létá, zoomuje, vyhledává a proklikává se k objektům: exoplanety a jejich
hvězdy, otevřené a kulové hvězdokupy, mlhoviny (emisní, reflexní, planetární, pozůstatky
supernov), černé díry, neutronové hvězdy a pulsary, významné hvězdy.
U každého objektu: poloha vůči Slunci, vzdálenost (ly i pc), výška nad galaktickou rovinou,
klíčové parametry, zdroj dat, u významných objektů popis a obrázek. Vše česky.

## Výchozí bod
Prototyp: C:\Klouí\galaxie\prototyp\cerne-diry-mapa.html
(Three.js r128, 37 hvězdných černých děr + Sgr A* + Omega Centauri, souřadnice převedené
přes astropy, Slunce 25 600 ly od centra, rovina ekliptiky se sklonem 60,2°, ramena
schematicky, měřítko ly/pc, přelety na objekty, WASD, karty objektů se zdrojem polohy.)
Na tomhle vizuálním jazyku a konvencích stavíme dál.

## Technologie (návrh, měnit jen s mým souhlasem)
- Frontend: Vite + TypeScript + Three.js (aktuální verze, API vždy ověřuj přes Context7)
- Architektura od začátku mobile-first: dotykové ovládání, výkon na slabších telefonech,
  data v menších dávkách
- Vykreslování: instancované body / shadery, LOD podle vzdálenosti kamery,
  data po vrstvách a dlaždicích (octree), načítání na vyžádání
- Data pipeline: Python (astropy, astroquery, pandas), výstup do komprimovaných
  binárních/JSON souborů + metadata; skripty běží na mém PC
- Hosting: statický web, veřejně na GitHub Pages (účet azuregroove);
  limity GitHub Pages ověřit v dokumentaci a data jim přizpůsobit
- Připravenost na PWA (instalace na plochu, offline) a pozdější zabalení
  přes Capacitor do aplikace pro Android a iOS
- Pracovní složka: C:\Klouí\galaxie\

## Zdroje dat (každou položku ověř a zapiš licenci)
- Exoplanety: NASA Exoplanet Archive (tabulka PSCompPars)
- Hvězdokupy: Hunt & Reffert 2023 (Gaia DR3), Harris (kulové hvězdokupy)
- Mlhoviny: Sharpless, Lynds, HASH (planetární mlhoviny), Green (pozůstatky supernov)
- Černé díry: BlackCAT, Gaia BH, seznam z prototypu
- Pulsary: ATNF Pulsar Catalogue
- Hvězdy: Gaia DR3 (jen vybraný vzorek, např. do 100 pc + jasné hvězdy)
- Stavba Galaxie: modely ramen z literatury (např. Reid et al. 2019), ne vymyšlená
- Popisy a obrázky: Wikipedie (CC BY-SA), NASA (public domain), ESA/Webb (CC BY 4.0);
  vždy uvádět autora a licenci
- Počty objektů v katalozích a všechna čísla v tomto promptu jsou orientační,
  na začátku je ověř

## Funkce
Základ: vrstvy zapínatelné podle typu, vyhledávání, filtry (vzdálenost, typ, hmotnost,
rok objevu), karta objektu, přelet, měřítko ly/pc, pohledy (Slunce / shora / z boku /
centrum), rovina ekliptiky, galaktická mřížka.
Později: prohlídky s komentářem („výlety“), porovnávání objektů, časová osa objevů,
obrázky a odkazy, sdílení pohledu přes #kotvu.

## Etapy (každá končí funkčním buildem)
Stav 1. 10. 2026: etapy 1–3 hotové, 4 hotová (kromě porovnání objektů – odloženo); z 5 hotová ramena (Reid 2019 + Gaia) a jasné hvězdy. Podrobnosti v STAV.md a NAVRHY.md.
1. ~~Kostra aplikace + převod prototypu + datová pipeline pro 1 katalog (exoplanety)~~
2. ~~Výkon: tisíce objektů, LOD, vyhledávání, filtry, mobilní ovládání~~
3. ~~Hvězdokupy, mlhoviny, pulsary, černé díry~~
4. Karty objektů s popisy a obrázky, licence – hotovo: obrázky Commons, výřezy DSS, schéma soustavy, obyvatelná
   zóna, velikostní třídy planet, jména IAU a česká jména, doba cesty, pohled z objektu. Zbývá:
   - ~~české popisy významných objektů~~ (1. 10., úvod článku cs Wikipedie načtený v kartě, CC BY-SA)
   - jména IAU z WGSN – vynecháno (Ráďa 1. 10.; seznam na iau.org nedostupný)
   - ~~propojit jasné hvězdy s hvězdami s exoplanetami~~ (1. 10., 36 dvojic)
   - ~~přístupnost: textové popisy pro čtečky, ovládání seznamu a karty klávesnicí (NAVRHY.md bod 11)~~ (1. 10.)
   - ~~„výlety“ s komentářem (NAVRHY.md bod 13)~~ – 5 výletů hotových 1. 10. (další podle chuti)
   - ~~časová osa objevů~~ (1. 10.); porovnání objektů – zatím ne (Ráďa)
5. Stavba Galaxie podle modelů, vzorek hvězd z Gaia, doladění vzhledu – hotovo: ramena Reid 2019, ramena z Gaia,
   jasné hvězdy V ≤ 4,5. Zbývá (data na arXiv, Harvard Dataverse, Zenodo – nejdřív povolit domény):
   - Radcliffeova vlna, Místní bublina, Gouldův pás (NAVRHY.md bod 7)
   - 3D prachová mapa Edenhofer et al. 2024 do 1,25 kpc (NAVRHY.md bod 8)
   - vzorek Gaia do 100 pc v dlaždicích/octree; ověřit rozměry disku a tab. 2 Reid 2019 přímo v článku
   - galaxie Místní skupiny – rozšíření rozsahu, jen pokud Ráďa schválí (NAVRHY.md bod 12)
   - planetky a komety: plný katalog na vyžádání (dlaždice podle skupin), MPC
6. Nasazení na GitHub Pages – předtím: svolení JPL SSD, podmínky DSS, licence map Gaia ramen, podmínky CDS;
   aktualizace všech dat (NASA archiv je teď z cloudu dostupný, ATNF a HASH na PC)
   - potom automatická aktualizace exoplanet přes GitHub Actions – jen s Ráďovým souhlasem (NAVRHY.md bod 10)
7. PWA (instalace na plochu, offline režim) – přibalit fonty, malá offline sada obrázků
8. Mobilní aplikace přes Capacitor (Android, případně iOS)
- Mimo etapy (přání Ráďi): přepínač „Star Trek“ – fanouškovská vrstva teritorií, jasně označená fikce (viz STAV.md)

## Pravidla práce
- Na začátku každého sezení si přečti C:\Klouí\galaxie\STAV.md (hotovo, rozdělané,
  rozhodnutí, další krok) a na konci ho aktualizuj.
- Čísla a fakta jen z ověřených zdrojů. U každého objektu evidovat, odkud je poloha,
  a nejistoty poctivě označit (odvozené, zpaměti, sporné).
- Kód spusť a otestuj, než řekneš „hotovo“: build + test/screenshot, výsledek nahlas.
- Nevymýšlej data. Když něco nevíš nebo nejde stáhnout, řekni to.
- Do GitHubu nic nezapisuj (commit, push, Actions, PR) bez mého výslovného souhlasu.
- Rozhodnutí o architektuře nebo rozsahu nejdřív navrhni a nech na mně.
- Víc agentů najednou jen po mém souhlasu.
- Stahování velkých katalogů předem ohlas (odhad velikosti a času).
