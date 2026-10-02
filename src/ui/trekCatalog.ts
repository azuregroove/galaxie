import { escapeHtml, fmt } from "../core/units";
import type { Hud } from "./hud";

/*
 * Katalog všech hvězd, soustav a planet Star Treku (pipeline/startrek_katalog.py) v panelu karty.
 * Stahuje se až při otevření. Polohu má jen část soustav (ty, které fanouškovská vrstva umí umístit);
 * u nich tlačítko „Ukázat na mapě“ zapne příslušnou mocnost a přeletí na soustavu.
 */

interface TrekCatalogData {
  stazeno: string;
  upozorneni: string;
  druhy: string[];
  mocnosti: { id: string; nazev: string }[];
  polozky: {
    n: string[]; t: number[]; d: (string | null)[]; c: (string | null)[]; s: (string | null)[]; p: (number | null)[];
    a: (string | null)[]; q: (string | null)[]; ly: (number | null)[]; k: (number | null)[]; w: number[];
    ma: (string | null)[]; mb: (string | null)[]; x: (string | null)[];
  };
  statistika: { stranek: number; polozek: number; hvezd: number; soustav: number; planet: number; na_mape: number };
}

const LIMIT = 200;
const QUAD: Record<string, string> = { A: "Alfa", B: "Beta", AB: "Alfa nebo Beta", G: "Gama", D: "Delta" };
const KIND_ICON = ["✦", "◎", "●"];
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, "").toLowerCase();
const wikiUrl = (wiki: "memory-alpha" | "memory-beta", title: string) =>
  `https://${wiki}.fandom.com/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;

export class TrekCatalog {
  private data: Promise<TrekCatalogData> | null = null;
  private keys: string[] = [];
  private bySystem = new Map<string, number[]>();
  private state = { q: "", t: -1, p: -2, quad: "", map: false };
  private box: HTMLElement | null = null;

  private url: string;
  private hud: Hud;
  /** přelet na soustavu fanouškovské vrstvy (index v startrek.json) se zapnutím její mocnosti */
  private showOnMap: (k: number) => void;
  private powerColor: (id: string) => string | null;

  constructor(url: string, hud: Hud, showOnMap: (k: number) => void, powerColor: (id: string) => string | null) {
    this.url = url;
    this.hud = hud;
    this.showOnMap = showOnMap;
    this.powerColor = powerColor;
  }

  private load(): Promise<TrekCatalogData> {
    this.data ??= fetch(this.url).then(async (r) => {
      if (!r.ok) throw new Error(`startrek-katalog: HTTP ${r.status}`);
      const d = (await r.json()) as TrekCatalogData;
      const P = d.polozky;
      this.keys = P.n.map((n, i) => norm(`${n} ${P.s[i] ?? ""} ${P.ma[i] ?? ""} ${P.mb[i] ?? ""}`));
      P.s.forEach((s, i) => {
        if (!s) return;
        const k = norm(s);
        const a = this.bySystem.get(k);
        if (a) a.push(i);
        else this.bySystem.set(k, [i]);
      });
      return d;
    });
    this.data.catch(() => (this.data = null));
    return this.data;
  }

  async show(query = ""): Promise<void> {
    if (query) this.state.q = query;
    const card = this.hud.showPanel((c) => {
      const box = document.createElement("div");
      box.className = "trekCat";
      box.innerHTML = `<div class="kind">Star Trek · fikce</div><h3 id="cardTitle">Katalog hvězd a planet</h3><p class="dim">Načítám…</p>`;
      c.querySelector(".close")!.after(box);
      this.box = box;
    });
    try {
      const d = await this.load();
      if (this.box && card.contains(this.box)) this.renderList(d);
    } catch (e) {
      console.error(e);
      if (this.box) this.box.querySelector("p")!.textContent = `Katalog se nepodařilo načíst: ${(e as Error).message}`;
    }
  }

  private renderList(d: TrekCatalogData): void {
    const box = this.box!;
    const st = d.statistika;
    const opts = d.mocnosti.map((p, i) => ({ i, p })).sort((a, b) => a.p.nazev.localeCompare(b.p.nazev, "cs"));
    box.innerHTML = `<div class="kind">Star Trek · fikce</div><h3 id="cardTitle">Katalog hvězd a planet</h3>
      <p class="dim">${fmt(st.polozek)} položek z Memory Alpha a Memory Beta: ${fmt(st.hvezd)} hvězd, ${fmt(st.soustav)} soustav,
        ${fmt(st.planet)} planet. Na mapě je ${fmt(st.na_mape)} z nich (přes soustavu).</p>
      <input class="tcQ" type="search" placeholder="Hledat (Vulcan, Bajor, Rigel…)" aria-label="Hledat v katalogu Star Treku" value="${escapeHtml(this.state.q)}">
      <div class="tcF">
        <select class="tcT" aria-label="Druh"><option value="-1">vše</option>${d.druhy.map((x, i) => `<option value="${i}">${escapeHtml(x)}</option>`).join("")}</select>
        <select class="tcP" aria-label="Mocnost"><option value="-2">všechny mocnosti</option><option value="-1">bez příslušnosti</option>
          ${opts.map(({ i, p }) => `<option value="${i}">${escapeHtml(p.nazev)}</option>`).join("")}</select>
        <select class="tcQd" aria-label="Kvadrant"><option value="">kvadrant</option>${Object.entries(QUAD).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
        <label class="fcheck"><input type="checkbox" class="tcM"> jen na mapě</label>
      </div>
      <p class="tcCount dim" aria-live="polite"></p>
      <ul class="tcList"></ul>
      <div class="src">${escapeHtml(d.upozorneni)} Memory Alpha (CC BY-NC), Memory Beta (CC BY-SA), staženo ${escapeHtml(d.stazeno.slice(0, 10))}.
        Star Trek je ochranná známka Paramount; katalog s ním není spojený.</div>`;
    const $ = <T extends HTMLElement>(s: string) => box.querySelector<T>(s)!;
    $<HTMLSelectElement>(".tcT").value = String(this.state.t);
    $<HTMLSelectElement>(".tcP").value = String(this.state.p);
    $<HTMLSelectElement>(".tcQd").value = this.state.quad;
    $<HTMLInputElement>(".tcM").checked = this.state.map;
    const update = () => {
      this.state = {
        q: $<HTMLInputElement>(".tcQ").value, t: Number($<HTMLSelectElement>(".tcT").value),
        p: Number($<HTMLSelectElement>(".tcP").value), quad: $<HTMLSelectElement>(".tcQd").value,
        map: $<HTMLInputElement>(".tcM").checked,
      };
      this.fill(d);
    };
    box.querySelectorAll("input, select").forEach((el) => el.addEventListener("input", update));
    this.fill(d);
    // na dotykovém displeji by fokus vysunul klávesnici přes celý panel
    if (!matchMedia("(pointer: coarse)").matches) $<HTMLInputElement>(".tcQ").focus();
  }

  private fill(d: TrekCatalogData): void {
    const box = this.box!;
    const P = d.polozky;
    const { q, t, p, quad, map } = this.state;
    const words = norm(q).split(/\s+/).filter(Boolean);
    const hits: number[] = [];
    for (let i = 0; i < P.n.length; i++) {
      if (t >= 0 && P.t[i] !== t) continue;
      if (p === -1 ? P.p[i] != null : p >= 0 && P.p[i] !== p) continue;
      if (quad && P.q[i] !== quad) continue;
      if (map && P.k[i] == null) continue;
      if (words.length && !words.every((w) => this.keys[i].includes(w))) continue;
      hits.push(i);
    }
    // přesná shoda jména nahoru
    if (words.length) {
      const qn = norm(q).trim();
      hits.sort((a, b) => Number(norm(P.n[b]) === qn) - Number(norm(P.n[a]) === qn) || Number(norm(P.n[b]).startsWith(qn)) - Number(norm(P.n[a]).startsWith(qn)));
    }
    box.querySelector(".tcCount")!.textContent = hits.length > LIMIT
      ? `Prvních ${LIMIT} z ${fmt(hits.length)} – upřesni hledání`
      : `${fmt(hits.length)} položek`;
    const ul = box.querySelector<HTMLUListElement>(".tcList")!;
    ul.innerHTML = hits.slice(0, LIMIT).map((i) => this.row(d, i)).join("");
    ul.querySelectorAll<HTMLElement>("li").forEach((li) => {
      li.onclick = () => this.detail(d, Number(li.dataset.i));
      li.onkeydown = (e) => { if (e.key === "Enter") this.detail(d, Number(li.dataset.i)); };
    });
  }

  private row(d: TrekCatalogData, i: number): string {
    const P = d.polozky;
    const pw = P.p[i] != null ? d.mocnosti[P.p[i]!] : null;
    const col = pw ? this.powerColor(pw.id) ?? "var(--dim)" : "var(--dim)";
    const sub = [d.druhy[P.t[i]] + (P.d[i] ? ` (${P.d[i]})` : ""), P.c[i] ? `třída ${P.c[i]}` : "", P.s[i] && P.t[i] !== 1 ? `soustava ${P.s[i]}` : ""]
      .filter(Boolean).join(" · ");
    return `<li tabindex="0" data-i="${i}"><span class="tcI" style="color:${escapeHtml(col)}" aria-hidden="true">${KIND_ICON[P.t[i]]}</span>
      <span class="tcN">${escapeHtml(P.n[i])}<small>${escapeHtml(sub)}</small></span>${P.k[i] != null ? `<span class="tcMap" title="Je na mapě">mapa</span>` : ""}</li>`;
  }

  private detail(d: TrekCatalogData, i: number): void {
    const box = this.box!;
    const P = d.polozky;
    const pw = P.p[i] != null ? d.mocnosti[P.p[i]!] : null;
    const col = pw ? this.powerColor(pw.id) ?? "#aaa" : "#aaa";
    const links = [
      P.w[i] & 1 ? `<a href="${wikiUrl("memory-alpha", P.ma[i] ?? P.n[i])}" target="_blank" rel="noopener">Memory Alpha ↗</a>` : "",
      P.w[i] & 2 ? `<a href="${wikiUrl("memory-beta", P.mb[i] ?? P.n[i])}" target="_blank" rel="noopener">Memory Beta ↗</a>` : "",
    ].filter(Boolean).join(" · ");
    // soustava: její hvězdy a planety; planeta/hvězda: odkaz na soustavu a sourozence
    const sys = P.t[i] === 1 ? P.n[i] : P.s[i];
    const members = sys ? (this.bySystem.get(norm(sys)) ?? []).filter((j) => j !== i) : [];
    const sysIdx = sys && P.t[i] !== 1 ? P.n.findIndex((n, j) => P.t[j] === 1 && norm(n) === norm(sys)) : -1;
    const ref = (j: number) => `<button class="linkish" data-j="${j}">${escapeHtml(P.n[j])}</button>`;
    box.innerHTML = `<div class="kind" style="color:${escapeHtml(col)}">Star Trek · fikce · ${escapeHtml(d.druhy[P.t[i]])}</div>
      <h3 id="cardTitle">${escapeHtml(P.n[i])}</h3>
      <dl>
        <dt>Druh</dt><dd>${escapeHtml(d.druhy[P.t[i]] + (P.d[i] ? ` – ${P.d[i]}` : ""))}</dd>
        ${P.c[i] ? `<dt>Třída</dt><dd>${escapeHtml(P.c[i]!)}</dd>` : ""}
        ${sys && P.t[i] !== 1 ? `<dt>Soustava</dt><dd>${sysIdx >= 0 ? ref(sysIdx) : escapeHtml(sys)}</dd>` : ""}
        <dt>Mocnost</dt><dd>${pw ? escapeHtml(pw.nazev) : P.a[i] ? `<span class="dim">${escapeHtml(P.a[i]!)}</span>` : "–"}</dd>
        ${P.q[i] ? `<dt>Kvadrant</dt><dd>${escapeHtml(QUAD[P.q[i]!] ?? P.q[i]!)}</dd>` : ""}
        ${P.ly[i] != null ? `<dt>Od Slunce</dt><dd>${fmt(P.ly[i]!)} ly (podle wiki)</dd>` : ""}
        ${P.x[i] ? `<dt>Realita</dt><dd>${escapeHtml(P.x[i]!)}</dd>` : ""}
        <dt>Na mapě</dt><dd>${P.k[i] != null ? "ano – poloha soustavy ve fanouškovské vrstvě" : "ne – wiki neuvádí nic, z čeho by šla poloha odvodit"}</dd>
      </dl>
      ${members.length ? `<h4>${P.t[i] === 1 ? "V soustavě" : "Dál v soustavě"} (${members.length})</h4><p class="tcMembers">${members.map(ref).join(", ")}</p>` : ""}
      <div class="tcBtns">
        <button class="btn small" data-a="back">◂ Zpět na seznam</button>
        ${P.k[i] != null ? `<button class="btn small" data-a="map">Ukázat na mapě</button>` : ""}
      </div>
      <p>${links}</p>
      <p class="warn">Fikce – údaje z infoboxů fanouškovských wiki, ne kánon ani oficiální mapa.</p>`;
    box.querySelector<HTMLButtonElement>('[data-a="back"]')!.onclick = () => this.renderList(d);
    box.querySelector<HTMLButtonElement>('[data-a="map"]')?.addEventListener("click", () => this.showOnMap(P.k[i]!));
    box.querySelectorAll<HTMLButtonElement>("[data-j]").forEach((b) => (b.onclick = () => this.detail(d, Number(b.dataset.j))));
    box.closest("#card")?.scrollTo(0, 0);
  }
}
