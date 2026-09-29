# Zdroje dat a licence

Evidence katalogů, ze kterých mapa čerpá. Aktualizovat s každým novým katalogem.

## Konstanty

| Veličina | Hodnota | Zdroj |
|---|---|---|
| Vzdálenost Slunce od centra R₀ | 8,15 ± 0,15 kpc (≈ 26 580 ly) | Reid et al. 2019, ApJ 885, 131 ([arXiv:1910.03357](https://arxiv.org/abs/1910.03357)) |
| Severní pól ekliptiky | l = 96,385°, b = 29,806° | přepočet astropy (prototyp) |
| Průměr disku, tloušťka disku | 87 400 ly; 700–1 500 ly (tenký), ~8 500 ly (tlustý) | převzato z prototypu, **k ověření v etapě 5** |

## Katalogy

### Exoplanety – NASA Exoplanet Archive, PSCompPars
- Web: https://exoplanetarchive.ipac.caltech.edu/ (TAP, tabulka `pscomppars`)
- Stav 29. 9. 2026: 6 372 planet, 6 344 se vzdáleností, 4 779 hostitelských systémů, nejvzdálenější 8 500 pc (ověřeno dotazem TAP).
- Licence: veřejná data NASA/Caltech-IPAC. Archiv žádá citaci:
  > This research has made use of the NASA Exoplanet Archive, which is operated by the California Institute of Technology, under contract with the National Aeronautics and Space Administration under the Exoplanet Exploration Program.
- Pozor: PSCompPars skládá parametry z více publikací, nemusí být vzájemně konzistentní. Hvězdné parametry
  bereme z první vyplněné planety systému (abecedně).
- Poloha: RA/Dec → l, b přes astropy (kontrola proti `glon/glat` archivu, tolerance 0,01°), vzdálenost `sy_dist`.

### Černé díry – ruční výběr z prototypu
- Souřadnice, vzdálenosti a hmotnosti z Wikipedie (CC BY-SA 4.0), část poloh odvozena z katalogových označení.
- Známé nejistoty: HD 130298 (souřadnice neověřené), 11 objektů s polohou z označení, 2 bez vzdálenosti.
- Sgr A* a 1E 1740.7-2942 umístěny do vzdálenosti R₀.
- V etapě 3 nahradit/doplnit katalogem BlackCAT a Gaia BH.
