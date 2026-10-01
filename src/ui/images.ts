import { galToIcrs } from "../core/coords";
import { escapeHtml, fmtNum } from "../core/units";
import type { SkyPos } from "../layers/layer";

/**
 * Obrázky k objektům jako odkazy: pipeline/obrazky.py spáruje objekty s Wikidata (P18), tady se až při otevření
 * karty načte z Wikimedia Commons náhled, autor a licence. Bez autora a licence se obrázek neukáže, jen odkaz.
 */

/** [QID, soubor na Commons (u jasných hvězd může chybět), český štítek, článek cs Wikipedie, článek en Wikipedie] */
type Entry = [string, string | null, string | null, string | null, string | null];

interface ImageData {
  vrstvy: Record<string, Record<string, Entry>>;
}

interface CommonsInfo {
  thumb: string;
  page: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  desc: string;
}

// standardní šířka náhledu – Wikimedia jiné šířky odmítá (ověřeno 30. 9. 2026: 320 px → HTTP 400, 330 px → 200)
const THUMB_W = 330;
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

let data: Promise<ImageData | null> | null = null;
let url = "";
const cache = new Map<string, Promise<CommonsInfo | null>>();

export function initImages(dataUrl: string): void {
  url = dataUrl;
}

function load(): Promise<ImageData | null> {
  data ??= url
    ? fetch(url).then((r) => (r.ok ? (r.json() as Promise<ImageData>) : null)).catch(() => null)
    : Promise.resolve(null);
  return data;
}

/** HTML z metadat Commons → čistý text (nic z cizího HTML se nevkládá do stránky). */
function text(html: string | undefined): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

function commons(file: string): Promise<CommonsInfo | null> {
  let p = cache.get(file);
  if (!p) {
    const q = new URLSearchParams({
      action: "query", titles: `File:${file}`, prop: "imageinfo", iiprop: "url|extmetadata",
      iiurlwidth: String(THUMB_W), iiextmetadatalanguage: "cs", format: "json", origin: "*",
    });
    p = fetch(`${COMMONS_API}?${q}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const page = j && Object.values(j.query?.pages ?? {})[0] as { imageinfo?: Record<string, any>[] } | undefined;
        const ii = page?.imageinfo?.[0];
        if (!ii?.thumburl) return null;
        const m = ii.extmetadata ?? {};
        const author = text(m.Artist?.value) || text(m.Credit?.value);
        const license = text(m.LicenseShortName?.value) || text(m.UsageTerms?.value);
        if (!author || !license) return null;
        return {
          thumb: ii.thumburl, page: ii.descriptionurl, author, license,
          licenseUrl: m.LicenseUrl?.value ?? null, desc: text(m.ImageDescription?.value),
        };
      })
      .catch(() => null);
    cache.set(file, p);
  }
  return p;
}

/** Co na obrázku je, podle názvu souboru a popisu z Commons (Wikidata dává i kresby, mapy a grafy). */
function imageKind(file: string, desc: string): string | null {
  const t = `${file} ${desc}`;
  if (/artist|concept|impression|illustration|rendering|umělecká|představa/i.test(t)) return "umělecká představa, ne fotografie";
  if (/light ?curve/i.test(t)) return "světelná křivka (graf jasnosti)";
  if (/constellation|IAU\.svg|star ?chart|\bmap\b|location of/i.test(t)) return "mapa – poloha na obloze";
  if (/diagram|comparison|compare|sizes/i.test(t)) return "schéma nebo srovnání";
  return null;
}

// Přehlídka pro výřezy: DSS2 pokrývá celou oblohu. Údaje o autorství z popisu HiPS
// (https://alasky.cds.unistra.fr/DSS/DSSColor/properties, 30. 9. 2026); podmínky užití DSS (STScI) z cloudu neověřené.
const SKY_HIPS = "CDS/P/DSS2/color";
const SKY_CREDIT = "Digitized Sky Survey – STScI/NASA, obarveno CDS";
const HIPS2FITS = "https://alasky.cds.unistra.fr/hips-image-services/hips2fits";
// hips2fits má dva nezávislé servery (dokumentace služby); při chybě zkusit záložní, pak se vzdát
const SKY_ONERROR = "if(!this.dataset.bis){this.dataset.bis='1';this.src=this.src.replace('//alasky.','//alaskybis.')}"
  + "else{this.closest('figure').outerHTML='<span class=dim>Výřez oblohy se nepodařilo načíst.</span>'}";

/** Výřez oblohy z hips2fits (CDS) pro objekty bez fotky. Sever nahoře, východ vlevo. */
function skyCutout(sky: SkyPos): string {
  const [ra, dec] = galToIcrs(sky.l, sky.b);
  const fov = sky.fovDeg;
  const q = new URLSearchParams({
    hips: SKY_HIPS, ra: ra.toFixed(5), dec: dec.toFixed(5), fov: fov.toFixed(4),
    width: String(THUMB_W), height: String(THUMB_W), projection: "TAN", format: "jpg",
  });
  const aladin = `https://aladin.cds.unistra.fr/AladinLite/?${new URLSearchParams({
    target: `${ra.toFixed(5)} ${dec >= 0 ? "+" : ""}${dec.toFixed(5)}`, fov: fov.toFixed(3), survey: SKY_HIPS,
  })}`;
  const fovTxt = fov >= 1 ? `${fmtNum(fov, 1)}°` : `${fmtNum(fov * 60, 0)}′`;
  return `<div class="imgBox"><figure class="sky">
      <a href="${escapeHtml(aladin)}" target="_blank" rel="noopener"><img src="${escapeHtml(`${HIPS2FITS}?${q}`)}" alt="Výřez oblohy kolem objektu" loading="lazy"
        onerror="${SKY_ONERROR}"></a>
      <figcaption><span class="imgKind">výřez z přehlídky oblohy (fotka tohoto objektu není)</span><br>
        Pole ${fovTxt}, střed = poloha objektu, sever nahoře. Snímek: ${escapeHtml(SKY_CREDIT)} ·
        služba <a href="https://alasky.cds.unistra.fr/hips-image-services/hips2fits" target="_blank" rel="noopener">hips2fits (CDS)</a> ·
        <a href="${escapeHtml(aladin)}" target="_blank" rel="noopener">otevřít v Aladin Lite</a></figcaption>
    </figure></div>`;
}

const short = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

const wikiLink = (lang: string, title: string) =>
  `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;

// REST API Wikipedie posílá CORS hlavičku pro libovolný původ (ověřeno 1. 10. 2026 s Origin azuregroove.github.io)
const WIKI_SUMMARY = "https://cs.wikipedia.org/api/rest_v1/page/summary/";
const DESC_MAX = 900;

interface WikiSummary {
  title: string;
  extract: string;
  page: string;
}

const summaries = new Map<string, Promise<WikiSummary | null>>();

function summary(title: string): Promise<WikiSummary | null> {
  let p = summaries.get(title);
  if (!p) {
    p = fetch(WIKI_SUMMARY + encodeURIComponent(title.replace(/ /g, "_")))
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        // rozcestník nebo prázdný úvod nemá smysl ukazovat jako popis objektu
        if (!j || j.type !== "standard" || typeof j.extract !== "string" || !j.extract.trim()) return null;
        return { title: j.title ?? title, extract: j.extract.trim(), page: j.content_urls?.desktop?.page ?? wikiLink("cs", title) };
      })
      .catch(() => null);
    summaries.set(title, p);
  }
  return p;
}

/** Úvod článku zkrácený na celé věty. */
function trimSentences(t: string, max: number): string {
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(".\n"));
  return end > max / 3 ? cut.slice(0, end + 1) : `${cut.trimEnd()}…`;
}

/**
 * Popis z české Wikipedie (úvod článku) – načte se až při otevření karty, nic se neukládá do dat mapy.
 * Licence textu CC BY-SA 4.0: uvádíme článek, odkaz na autory (historie stránky) a licenci.
 */
export async function fillDescription(el: HTMLElement, layer: string, name: string, isCurrent: () => boolean = () => true): Promise<void> {
  const d = await load();
  const title = d?.vrstvy[layer]?.[name]?.[3];
  if (!title || !isCurrent()) return;
  el.innerHTML = `<p class="dim">Načítám popis z Wikipedie…</p>`;
  const s = await summary(title);
  if (!isCurrent()) return;
  if (!s) {
    el.innerHTML = "";
    return;
  }
  const hist = `https://cs.wikipedia.org/w/index.php?${new URLSearchParams({ title: s.title, action: "history" })}`;
  const paras = trimSentences(s.extract, DESC_MAX).split(/\n+/).map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  el.innerHTML = `<h4>Z Wikipedie</h4>${paras}
    <div class="src">Text: článek <a href="${escapeHtml(s.page)}" target="_blank" rel="noopener">${escapeHtml(s.title)}</a> z české Wikipedie
      (<a href="${escapeHtml(hist)}" target="_blank" rel="noopener">autoři</a>), licence
      <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.cs" target="_blank" rel="noopener">CC BY-SA 4.0</a>; může být zkrácený.</div>`;
}

/**
 * Doplní do prvku obrázek a odkazy k objektu (vrstva + jméno). Když obrázek k objektu není, prvek zůstane prázdný.
 * `isCurrent` hlídá, jestli je karta pořád otevřená pro stejný objekt (odpověď může přijít pozdě).
 */
export async function fillImage(el: HTMLElement, layer: string, name: string, isCurrent: () => boolean = () => true,
  sky: SkyPos | null = null): Promise<void> {
  const d = await load();
  const e = d?.vrstvy[layer]?.[name];
  if (!isCurrent()) return;
  if (!e) {
    if (sky) el.innerHTML = skyCutout(sky);
    return;
  }
  const [qid, file, cs, csWiki, enWiki] = e;
  const links = [
    csWiki ? `<a href="${wikiLink("cs", csWiki)}" target="_blank" rel="noopener">Wikipedie (česky)</a>` : null,
    !csWiki && enWiki ? `<a href="${wikiLink("en", enWiki)}" target="_blank" rel="noopener">Wikipedie (anglicky)</a>` : null,
    `<a href="https://www.wikidata.org/wiki/${qid}" target="_blank" rel="noopener">Wikidata</a>`,
  ].filter(Boolean).join(" · ");
  const csName = cs && cs.toLowerCase() !== name.toLowerCase() ? `<div class="imgName">česky: <b>${escapeHtml(cs)}</b></div>` : "";
  if (!file) {
    el.innerHTML = `${csName}${sky ? skyCutout(sky) : ""}<div class="imgLinks">${links}</div>`;
    return;
  }
  el.innerHTML = `${csName}<div class="imgBox dim">Načítám obrázek…</div><div class="imgLinks">${links}</div>`;
  const info = await commons(file);
  if (!isCurrent()) return;
  const box = el.querySelector<HTMLElement>(".imgBox")!;
  if (!info) {
    // bez autora a licence obrázek neukazujeme
    const page = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
    box.innerHTML = `<a href="${page}" target="_blank" rel="noopener">Obrázek na Wikimedia Commons</a> (náhled se nepodařilo načíst)`;
    return;
  }
  const lic = info.licenseUrl
    ? `<a href="${escapeHtml(info.licenseUrl)}" target="_blank" rel="noopener">${escapeHtml(info.license)}</a>`
    : escapeHtml(info.license);
  const kind = imageKind(file, info.desc);
  box.className = "imgBox";
  box.innerHTML = `<figure>
      <a href="${escapeHtml(info.page)}" target="_blank" rel="noopener"><img src="${escapeHtml(info.thumb)}" alt="${escapeHtml(short(info.desc || name, 120))}" loading="lazy"></a>
      <figcaption>${kind ? `<span class="imgKind">${escapeHtml(kind)}</span><br>` : ""}${info.desc ? `<span class="imgDesc">${escapeHtml(short(info.desc, 160))}<br></span>` : ""}Autor: ${escapeHtml(short(info.author, 120))} · Licence: ${lic} ·
        <a href="${escapeHtml(info.page)}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption>
    </figure>`;
}
