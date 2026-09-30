import { escapeHtml } from "../core/units";

/**
 * Obrázky k objektům jako odkazy: pipeline/obrazky.py spáruje objekty s Wikidata (P18), tady se až při otevření
 * karty načte z Wikimedia Commons náhled, autor a licence. Bez autora a licence se obrázek neukáže, jen odkaz.
 */

/** [QID, soubor na Commons, český štítek, článek cs Wikipedie, článek en Wikipedie] */
type Entry = [string, string, string | null, string | null, string | null];

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

const short = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

const wikiLink = (lang: string, title: string) =>
  `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;

/**
 * Doplní do prvku obrázek a odkazy k objektu (vrstva + jméno). Když obrázek k objektu není, prvek zůstane prázdný.
 * `isCurrent` hlídá, jestli je karta pořád otevřená pro stejný objekt (odpověď může přijít pozdě).
 */
export async function fillImage(el: HTMLElement, layer: string, name: string, isCurrent: () => boolean = () => true): Promise<void> {
  const d = await load();
  const e = d?.vrstvy[layer]?.[name];
  if (!e || !isCurrent()) return;
  const [qid, file, cs, csWiki, enWiki] = e;
  const links = [
    csWiki ? `<a href="${wikiLink("cs", csWiki)}" target="_blank" rel="noopener">Wikipedie (česky)</a>` : null,
    !csWiki && enWiki ? `<a href="${wikiLink("en", enWiki)}" target="_blank" rel="noopener">Wikipedie (anglicky)</a>` : null,
    `<a href="https://www.wikidata.org/wiki/${qid}" target="_blank" rel="noopener">Wikidata</a>`,
  ].filter(Boolean).join(" · ");
  const csName = cs && cs.toLowerCase() !== name.toLowerCase() ? `<div class="imgName">česky: <b>${escapeHtml(cs)}</b></div>` : "";
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
