# E-mail pro JPL Solar System Dynamics – KONCEPT (neodesláno)

Proč: FAQ JPL SSD (https://ssd.jpl.nasa.gov/faq.html, ověřeno 2. 10. 2026) na otázku
„I'd like to publish information from your site on my site. Do I need permission?“ odpovídá
„The short answer is yes. At the very least, we'd be interested in knowing what information you intend
to use and how you intend to use it. Ideally, we'd prefer you link from your site directly to the
information on our site…“

Komu: **contact-ssd@jpl.nasa.gov** (na stránce https://ssd.jpl.nasa.gov/contact/ zapsáno pozpátku
proti spamu: „vog.asan.lpj@dss-tcatnoc“), nebo formulář na téže stránce (předmět 8–80 znaků).
Stránka upozorňuje, že odpověď může trvat několik dní a že neodpovídají na všechno.

Před odesláním doplň: **[jméno a příjmení]**. Adresu webu jsem napsala tak, jak bude po nasazení
(GitHub Pages, repozitář `galaxie` na účtu `azuregroove`) – po nasazení ověřit, že funguje.

---

**Subject:** Permission request: JPL SSD data in a free educational Milky Way map

Dear Solar System Dynamics team,

I am building a free, non-commercial educational web application: an interactive 3D map of the
Milky Way in Czech (exoplanets, star clusters, nebulae, black holes, pulsars, bright stars). It will be
published as a static website at https://azuregroove.github.io/galaxie/ and later possibly as a free
installable app (PWA, and Android/iOS packaging of the same site). The source code is public on GitHub.

Following your FAQ, I would like to ask for permission to use some data from your site, and to tell you
exactly what we use and how:

1. Keplerian elements for approximate positions of the major planets (Standish, Table 1,
   https://ssd.jpl.nasa.gov/planets/approx_pos.html) and the planets' mean radii
   (https://ssd.jpl.nasa.gov/planets/phys_par.html).
2. Planetary satellites: the list of satellites, their physical parameters
   (https://ssd.jpl.nasa.gov/sats/phys_par/) and osculating orbital elements of 459 moons from Horizons
   at three epochs in 2026–2027.
3. Small-Body Database: osculating elements of the five dwarf planets, and a sample of 3,187
   asteroids and comets selected by orbit class and absolute magnitude (SBDB Query API: elements, H,
   diameter, orbit class); for 539 bodies with old epochs, elements from Horizons at 2026-01-01.
4. Horizons: a single value, the heliocentric speed of Voyager 1 (used to illustrate travel times).

How the data are used: a script downloads the values once, and they are stored in static JSON files
(about 670 kB in total) that ship with the website. Positions are computed in the browser with
two-body Keplerian orbits, and the app states that they are approximate. Every view that uses these
data credits "NASA/JPL Solar System Dynamics" and names the specific service (approximate planet
positions, SBDB, Horizons). We will add direct links to your pages (e.g. the SBDB page of each small
body) as you recommend, and we refresh the data periodically. We do not imply any endorsement by
JPL or NASA.

Could you please let me know:
- whether this use is acceptable to you,
- what acknowledgment wording you prefer, and
- whether there are any conditions for the later free mobile app version?

If you prefer that we do not redistribute some of these values, we will remove them or replace them
with links to your site.

Thank you very much for your work and for the excellent tools.

Kind regards,
[jméno a příjmení]
Pilsen, Czech Republic

---

## Český překlad (pro kontrolu, neposílá se)

**Předmět:** Žádost o svolení: data JPL SSD v bezplatné vzdělávací mapě Mléčné dráhy

Vážený týme Solar System Dynamics,

vytvářím bezplatnou nekomerční vzdělávací webovou aplikaci: interaktivní 3D mapu Mléčné dráhy v češtině
(exoplanety, hvězdokupy, mlhoviny, černé díry, pulsary, jasné hvězdy). Bude zveřejněná jako statický web
na https://azuregroove.github.io/galaxie/ a později možná jako bezplatná instalovatelná aplikace (PWA
a zabalení téhož webu pro Android/iOS). Zdrojový kód je veřejný na GitHubu.

Podle vašich FAQ bych rád požádal o svolení k použití některých dat z vašeho webu a přesně popsal, co
a jak používáme:

1. Keplerovské elementy pro přibližné polohy velkých planet (Standish, tab. 1) a střední poloměry planet.
2. Měsíce planet: seznam, fyzikální parametry a oskulační elementy 459 měsíců z Horizons ke třem epochám 2026–2027.
3. Small-Body Database: oskulační elementy pěti trpasličích planet a vzorek 3 187 planetek a komet
   vybraný podle třídy dráhy a absolutní magnitudy (SBDB Query API: elementy, H, průměr, třída dráhy);
   u 539 těles se starou epochou elementy z Horizons k 1. 1. 2026.
4. Horizons: jediná hodnota, heliocentrická rychlost Voyageru 1 (ilustrace doby cesty).

Jak data používáme: skript hodnoty jednou stáhne a uloží do statických JSON souborů (celkem asi 670 kB),
které jsou součástí webu. Polohy počítá prohlížeč z dvoučásticových drah a aplikace uvádí, že jsou přibližné.
Každý pohled s těmito daty uvádí „NASA/JPL Solar System Dynamics“ a konkrétní službu. Přidáme přímé odkazy
na vaše stránky (např. stránku SBDB u každého tělesa), jak doporučujete, a data budeme pravidelně
obnovovat. Netvrdíme, že by nás JPL nebo NASA podporovaly.

Mohli byste mi prosím sdělit:
- zda je pro vás takové použití přijatelné,
- jaké znění poděkování/uvedení zdroje preferujete,
- zda pro pozdější bezplatnou mobilní verzi platí nějaké podmínky?

Pokud byste si nepřáli, abychom některé hodnoty šířili, odstraníme je nebo nahradíme odkazy na váš web.

Děkuji za vaši práci a za skvělé nástroje.

S pozdravem
[jméno a příjmení]
Plzeň, Česko

## Co zkontrolovat před odesláním
- [ ] jméno a podpis
- [ ] adresa webu – nasazení na GitHub Pages proběhne až po tvém souhlasu; e-mail lze poslat i před ním
- [ ] „source code is public on GitHub“ – platí, jen pokud je repozitář veřejný (GitHub Pages zdarma
      vyžaduje veřejný repozitář, pokud nemáš placený plán)
- [ ] slib „přímé odkazy na stránku SBDB u každého tělesa“ – zatím v aplikaci **nejsou**, dodělám před nasazením
- [ ] počty (459 měsíců, 3 187 těles, 539 z Horizons, ~670 kB) = stav dat k 30. 9. 2026
