# Návrhy vylepšení podle podobných projektů

Sepsáno 1. 10. 2026. Weby projektů byly z cloudu blokované, takže popisy funkcí pochází
**z výsledků vyhledávání a jejich úryvků, ne z vlastního vyzkoušení**. Než podle nich něco postavíme, ověřit na PC.

## Podobné projekty

| Projekt | Co dělá dobře | Poučení pro nás |
|---|---|---|
| [NASA Eyes on Exoplanets](https://science.nasa.gov/tutorials/eyes-on-exoplanets-tutorial/) | web i mobil, každá potvrzená exoplaneta, **obyvatelná zóna**, filtry „velikost Země / velká kamenná / plynný obr“, vzdálenost jako doba cesty autem či letadlem, „pohled ze Země“, textové popisy pro přístupnost, data denně aktualizovaná | nejbližší konkurent u exoplanet; chybí mu ostatní typy objektů a čeština |
| [Gaia Sky](https://gaiasky.space/) (ARI Heidelberg, MPL) | desktop/VR, miliardy hvězd z Gaia po dlaždicích (LOD), správce datových sad, skriptované prohlídky, planetárium a 360° režim | vzor pro dlaždice Gaia (etapa 5) a pro „výlety“ |
| [OpenSpace](https://github.com/OpenSpace/OpenSpace) (AMNH + Linköping) | Digital Universe atlas, exoplanetární systémy s barvou podle velikostní kategorie (kamenná, super-Země, neptunovská, plynný obr) | kategorie velikosti planet jako barva/filtr |
| [Galaxy Map](http://galaxymap.org/drupal/) (Kevin Jardine) | mapa okolí do ~3–6 kpc z dat Gaia: hustota horkých hvězd O/B/A, ionizující hvězdy, prach, oblasti H II | ramena **z dat** (mladé hvězdy) místo jen modelu |
| [SpaceMap](https://spacemap.online/) | podle popisu 400 milionů hvězd z Gaia DR3 v prohlížeči | důkaz, že dlaždice Gaia ve webu jdou; zjistit, jak je stahují |
| [Universe Map](https://universemap.net/) | Sluneční soustava → okolní hvězdy → Galaxie → Místní skupina → kosmická síť (Cosmicflows-4); 6 333 exoplanet ve 4 747 systémech z NASA archivu | plynulé měřítko až za Galaxii |
| [GalacticResource](https://www.galacticresource.com/) | procedurální Galaxie, 4 563 systémů s exoplanetami, Yale Bright Star Catalog, mlhoviny, kupy, galaxie Místní skupiny | jasné hvězdy z Yale BSC jako orientační body |
| [Milky Way Explorer](https://github.com/sunvonog/milky-way-explorer) | Gaia, jména hvězd IAU, SIMBAD, NASA exoplanety | **oficiální jména hvězd IAU** (WGSN) |

Čím už teď vyčníváme: všechny typy objektů v jedné mapě, čeština, u každé polohy zdroj a míra nejistoty,
pohled Soustava s elipsami a Sluneční soustava k datu.

## Návrhy (seřazené podle poměru užitek/práce)

1. **Obyvatelná zóna ve schématu a v pohledu Soustava.** Hranice podle Kopparapu et al. 2013/2014 z Teff a zářivého výkonu
   hvězdy. Koeficienty ověřit v článku. Práce: malá. Pozor, u hvězd bez Teff nebo poloměru zónu nekreslit.
2. **Kategorie velikosti planet** (kamenná / super-Země / neptunovská / plynný obr) jako barva v tabulce a filtr. Hranice
   převzít z jednoho citovaného zdroje (NASA je používá v Eyes). Práce: malá.
3. **Oficiální jména hvězd IAU (WGSN)** a české názvy (Plejády, Jesličky…) do hledání a karet. Práce: malá až střední.
4. **Vzdálenost v čase cesty** v kartě: světlem, sondou rychlostí Voyageru 1 (rychlost ověřit u JPL). Práce: malá.
5. **Pohled z vybraného objektu**: kamera do objektu, otočená ke Slunci („jak vypadá naše okolí odtud“). Práce: malá.
6. **Ramena z dat**: vedle modelu Reid 2019 ještě nadhustoty mladých hvězd z Gaia (Poggio et al. 2021). Jejich kontury jsou
   v knihovně SpiralMap (MIT); licenci dat Poggio 2021 ověřit. Práce: střední.
7. **Struktury okolí Slunce**: Radcliffeova vlna, Místní bublina, Gouldův pás jako anotace. Zdroje: Alves et al. 2020,
   Zucker et al. 2022 (ověřit). Práce: střední.
8. **3D prachová mapa** do 1,25 kpc (Edenhofer et al. 2024, rozlišení až 0,4 pc, HEALPix, balík `dustmaps`). Objemové
   vykreslení je náročné, na mobilu jen hrubá verze. Práce: velká, patří do etapy 5.
9. **Jasné hvězdy (Yale BSC nebo Hipparcos)** jako orientační body v okolí Slunce, ještě před vzorkem Gaia. Práce: malá až střední.
10. **Automatická aktualizace exoplanet** (třeba týdně přes GitHub Actions). Až po etapě 6 a jen s Ráďovým souhlasem s Actions.
11. **Přístupnost**: textové popisy objektů pro čtečky, ovládání klávesnicí v seznamu (NASA na tohle dbá). Práce: střední.
12. **Galaxie Místní skupiny** (Magellanova mračna, trpasličí galaxie): rozšíření měřítka za disk. Práce: střední,
    ale je to rozšíření rozsahu, rozhodne Ráďa.
13. **Výlety s komentářem** (už v plánu) podle vzoru skriptů Gaia Sky: posloupnost kotev `#o=…` s textem.

Doporučení: nejdřív 1, 2, 4, 5 (malé a viditelné), potom 3 a 9, větší věci (6–8) do etapy 5.

**Stav 1. 10. 2026:** hotovo 1, 2, 3, 4, 5, 6, 9, 11, 13 (první dva výlety). Zbývající body (7, 8, 10, 12) jsou zařazené do etap v CLAUDE.md.
