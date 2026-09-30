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

### Černé díry – ruční výběr z prototypu + BlackCAT
- Ruční seznam (39 objektů): vzdálenosti a hmotnosti z Wikipedie (CC BY-SA 4.0).
- Polohy ověřené proti SIMBADu přes CDS Sesame (zrcadlo `vizier.cds.unistra.fr`, 30. 9. 2026, `pipeline/overit_simbad.py`):
  položky z Wikipedie sedí do ~2″; 13 poloh (dřív odvozených z označení nebo nepřesných) převzato přímo ze SIMBADu
  (possrc `simbad`); dvě hvězdy v NGC 3201 mají polohu středu kupy (possrc `kupa`).
- Kandidáti: BlackCAT – Corral-Santana J. M. et al. 2016, A&A 587, A61 (bibcode 2016A&A...587A..61C),
  CDS `J/A+A/587/A61`, tabulka `tablea1.dat` (57 rentgenových tranzientů, VizieR doi:10.26093/cds/vizier.35870061).
  18 se shoduje s ručním seznamem (poloha do 15″), 39 nových je v mapě jako „Kandidát“, 14 z nich se vzdáleností.
  Vzdálenost bereme jen bez meze nebo s „~“; meze („<“, „>“) jsou jen v textu karty.
  Z BlackCATu jsou i vzdálenosti XTE J1859+226 (12,5 ± 1,5 kpc) a H 1705-25 (8,6 ± 2,1 kpc).
- Pozor: verze ve VizieR je stav 2016; web BlackCAT s novějšími objekty je z cloudu nedostupný.
- Licence VizieR: metadata odkazují na https://cds.unistra.fr/vizier-org/licences_vizier.html – **text neověřen** (stránka z cloudu nedostupná).
- Sgr A* a 1E 1740.7-2942 umístěny do vzdálenosti R₀.

### Hvězdokupy – Hunt & Reffert 2023; Baumgardt & Vasiliev 2021
- Otevřené kupy a pohybové skupiny: Hunt E.L., Reffert S. 2023, A&A 673, A114 – CDS `J/A+A/673/A114`, tabulka `clusters.dat`
  (7 167 řádků, stav 29. 9. 2026). Vzdálenost = medián (dist50), meze 16. a 84. percentil. Kulové kupy (typ g, 121)
  vynechány ve prospěch Baumgardta. Filtr „spolehlivá“ = CST ≥ 5 a CMD ≥ 0,5: dává 4 105 kup na celém katalogu,
  abstrakt uvádí 4 114 vysoce spolehlivých – **přesná kritéria autorů neověřena**.
- Kulové kupy: Baumgardt H., Vasiliev E. 2021, MNRAS 505, 5957 – tabulky `orbits_table.txt` a `combined_table.txt`
  z https://people.smp.uq.edu.au/HolgerBaumgardt/globular/ (165 kup se vzdáleností).
- Licence: CDS – **podmínky použití z cloudu neověřeny** (stránka cds.unistra.fr nedostupná, metadata katalogu licenci neuvádí);
  Baumgardt – data volně zveřejněná bez výslovné licence, citovat publikace.

### Mlhoviny a mračna (vše přes CDS/VizieR)
- Oblasti H II: Anderson L.D. et al. 2014, ApJS 212, 1 – `J/ApJS/212/1` (8 399 objektů, vzdálenost u 1 413;
  většinou kinematická). Bez vzdálenosti bereme jen třídu K (známé oblasti).
- Sharpless S. 1959, ApJS 4, 257 – `VII/20` (313). Párování s WISE podle jména (S184) a polohy (střed Sh2 uvnitř poloměru WISE).
- Lynds B.T. 1965 (světlé, `VII/9`, 1 125) a 1962 (temné, `VII/7A`, 1 791) – bez vzdáleností, jen v seznamu.
- Molekulová mračna: Zucker C. et al. 2020, A&A 633, A51 – `J/A+A/633/A51` (94 mračen, 326 směrů; vzdálenost = medián d50 směrů).
- Planetární mlhoviny: González-Santamaría I. et al. 2021, A&A 656, A51 – `J/A+A/656/A51` (2 035 centrálních hvězd,
  vzdálenost z paralaxy u 405). HASH (Parker et al. 2016) z cloudu nedostupný (přesměrování na IP adresu).
- Pozůstatky supernov: Green D.A. 2025 – `VII/297` (310), vzdálenosti katalog neobsahuje.

### Neutronové hvězdy
- Pulsary: ATNF Pulsar Catalogue (Manchester R.N. et al. 2005, AJ 129, 1993). Pipeline zkouší aktuální verzi přes psrqpy;
  z cloudu ATNF nedostupný, proto **v datech je kopie 2016-May z CDS (`B/psr`, 2 536 pulsarů)** – na PC přegenerovat.
  Dělení na milisekundové podle P < 30 ms je zjednodušení.
- Magnetary: McGill Online Magnetar Catalog, Olausen S.A., Kaspi V.M. 2014, ApJS 212, 6 – `TabO1.csv`
  (31 objektů, poslední úprava 17. 11. 2020). Autoři: volné použití s citací článku a odkazem na
  http://www.physics.mcgill.ca/~pulsar/magnetar/main.html.
