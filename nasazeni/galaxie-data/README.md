# galaxie-data

Datové dlaždice pro interaktivní 3D mapu Mléčné dráhy **Galaxie**:
https://azuregroove.github.io/galaxie/ (kód: https://github.com/azuregroove/galaxie).

Repo obsahuje jen vygenerovaná data, servírovaná přes GitHub Pages. Historie se při každé aktualizaci přepíše
jedním commitem, takže repo drží vždy jen aktuální verzi. Data nejsou určena k ruční úpravě, generuje je skript
`pipeline/gaia500.py` v hlavním repu.

## `gaia500/` – hvězdy 100–500 pc z Gaia DR3

- **Zdroj:** ESA, mise Gaia, Gaia DR3, tabulka `gaiadr3.gaia_source`; staženo 3. 10. 2026 ze zrcadla archivu Gaia
  v Astronomisches Rechen-Institut, Heidelberg (https://gaia.ari.uni-heidelberg.de/).
- **Výběr:** `parallax > 2 mas` a `parallax_over_error > 10`; vyřazeny hvězdy z Gaia Catalogue of Nearby Stars
  a hvězdy s paralaxou nad 10 mas (do 100 pc je mapa kreslí z GCNS). Vzdálenost = 1 / paralaxa.
- **Rozsah:** 15 196 236 hvězd, octree o 2 480 uzlech (hloubka 5), celkem ~205 MB.

### Formát

| Soubor | Obsah |
|---|---|
| `index.json` | metadata a seznam uzlů `[klíč, počet]`; klíč `r` = kořen, každá další číslice 0–7 = oktant (bit 0: x ≥ střed, bit 1: y ≥ střed, bit 2: z ≥ střed) |
| `b/<klíč>.bin.gz` | grafika, po sloupcích: `int16` x, y, z (pc od středu uzlu × 32767 / polovina hrany), `uint8` G × 10, `uint8` (BP−RP + 1) × 40; chybějící hodnota `uint8` = 255; řazeno od nejsvítivější |
| `i/<klíč>.bin.gz` | údaje karty ve stejném pořadí: `uint32` id_lo, id_hi (Gaia DR3 `source_id`) |

Souřadnice jsou galaktické kartézské kolem Slunce v krychli ±512 pc: x ke galaktickému centru, y ke l = 90°,
z k severnímu galaktickému pólu.

## Licence a citace

Data jsou odvozená z katalogu Gaia a šíří se pod stejnou licencí:
**© ESA/Gaia/DPAC, [CC BY-SA 3.0 IGO](https://creativecommons.org/licenses/by-sa/3.0/igo/).**
Úpravy (výběr, převod souřadnic, kvantizace a rozdělení do dlaždic): azuregroove, 2026.

Při použití citujte:

- Gaia Collaboration, Prusti T. et al. 2016, *The Gaia mission*, A&A 595, A1
- Gaia Collaboration, Vallenari A. et al. 2023, *Gaia Data Release 3: Summary of the content and survey properties*,
  A&A 674, A1

> This work has made use of data from the European Space Agency (ESA) mission Gaia
> (https://www.cosmos.esa.int/gaia), processed by the Gaia Data Processing and Analysis Consortium
> (DPAC, https://www.cosmos.esa.int/web/gaia/dpac/consortium). Funding for the DPAC has been provided by national
> institutions, in particular the institutions participating in the Gaia Multilateral Agreement.

Licence MIT z hlavního repa se vztahuje jen na kód aplikace, ne na tato data.

---

*English:* Derived tiles of Gaia DR3 stars at 100–500 pc for the Galaxie 3D Milky Way map. Data © ESA/Gaia/DPAC,
CC BY-SA 3.0 IGO; derived by azuregroove (selection, coordinate transform, quantisation, octree tiling).
Please cite Gaia Collaboration 2016 (A&A 595, A1) and 2023 (A&A 674, A1).
