import { AdditiveBlending, Sprite, SpriteMaterial, Vector3 } from "three";
import type { Frame } from "../core/coords";
import type { Manifest, MapObject } from "../core/types";
import { shadowed } from "../core/twins";
import { escapeHtml, fmt, fmtLy, fmtPcFromLy, spokenLy } from "../core/units";
import type { Layer } from "../layers/layer";
import type { OverlayKey, Overlays } from "../scene/overlays";
import { Stage } from "../scene/stage";
import { FilterPanel } from "./filters";
import { fillDescription, fillImage } from "./images";
import { togglable, trackHeight } from "./panels";
import type { DynLabel, Labels } from "./labels";

const LIST_LIMIT = 150;
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const objWord = (n: number) => (n === 1 ? "objekt" : n >= 2 && n <= 4 ? "objekty" : "objektů");
const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/** Ovládací panely: legenda, seznam s hledáním, karta objektu, pohledy, měřítko, výběr kliknutím. */
export class Hud {
  private selected: MapObject | null = null;
  private showLabels = true;
  private query = "";
  private all: MapObject[] = [];
  private index = new Map<MapObject, string>();
  private marker: Sprite;
  readonly filters: FilterPanel;
  private toastTimer = 0;
  private rows = new Map<HTMLElement, MapObject>();
  /** Doplní do každé karty vlastní blok (výlet); volá se po sestavení karty. */
  cardExtra: ((card: HTMLElement) => void) | null = null;
  private legendSync = new Map<string, () => void>();
  /** Výběr z vrstvy mimo seznam (hvězdy Gaia), když klik netrefil žádný běžný objekt; true = klik převzala. */
  extraPick: ((px: number, py: number, radius: number, rect: DOMRect) => boolean) | null = null;
  /** Karta se zavřela (křížkem, Esc, filtrem) nebo ji převzal jiný panel. */
  readonly cardCloseHandlers: (() => void)[] = [];
  readonly views: Record<string, () => void>;

  private stage: Stage;
  private frame: Frame;
  private layers: Layer[];
  private overlays: Overlays;
  private manifest: Manifest;
  private labels: Labels;

  constructor(stage: Stage, frame: Frame, layers: Layer[], overlays: Overlays, labels: Labels, manifest: Manifest) {
    this.stage = stage;
    this.frame = frame;
    this.layers = layers;
    this.overlays = overlays;
    this.manifest = manifest;
    this.labels = labels;
    for (const L of layers) for (const o of L.objects) {
      this.all.push(o);
      this.index.set(o, norm([o.name, ...(o.aliases ?? []), ...(o.searchNames ?? [])].join(" ")));
    }
    this.all.sort((a, b) => (a.distLy ?? 1e12) - (b.distLy ?? 1e12));
    labels.setProvider(() => this.labelList());
    overlays.sunLabel.pick = this.all.find((o) => o.layer === "slunecni-soustava");

    this.marker = new Sprite(new SpriteMaterial({ map: stage.glow, color: 0xffffff, transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.9 }));
    this.marker.visible = false;
    stage.scene.add(this.marker);
    const SUN = frame.sun;
    this.views = {
      near: () => stage.flyTo(SUN, 250, new Vector3(-0.35, 0.75, 0.55)),
      sun: () => stage.flyTo(SUN, 14000, new Vector3(-0.35, 0.75, 0.55)),
      top: () => stage.flyTo(new Vector3(), 125000, new Vector3(0.0001, 1, 0.02)),
      edge: () => stage.flyTo(new Vector3(), 95000, new Vector3(0.02, 0.04, 1)),
      gc: () => stage.flyTo(new Vector3(), 20000, new Vector3(-0.6, 0.5, 0.6)),
    };

    this.filters = new FilterPanel(layers, (f) => {
      layers.forEach((L) => L.applyFilter(f));
      this.afterVisibilityChange();
    });
    this.buildLegend();
    this.buildBar();
    this.buildSearch();
    this.buildPicking();
    this.buildMobile();
    this.buildKeys();
    this.renderList();
    stage.onFrame(() => {
      layers.forEach((L) => L.update?.(stage));
      this.updateScale();
      if (this.selected && this.marker.visible) {
        const pulse = reducedMotion() ? 0 : 0.15 * Math.sin(performance.now() / 300);
        const s = stage.camera.position.distanceTo(this.selected.anchor) * 0.035 * (1 + pulse);
        this.marker.scale.set(s, s, 1);
      }
    });
    this.updateSubtitle();
  }

  // ---------- popisky ----------
  private labelList(): DynLabel[] {
    if (!this.showLabels) return [];
    const out: DynLabel[] = [];
    const text = (o: MapObject) => (o.pos ? o.label ?? o.name : `${o.label ?? o.name} (jen směr)`);
    if (this.selected) out.push({ key: this.selected, text: text(this.selected), pos: this.selected.anchor, priority: 1000 });
    for (const L of this.layers) {
      L.labelCandidates(this.stage).forEach((o, i) => {
        if (o === this.selected || o.twin === this.selected || shadowed(o)) return;
        // významné objekty přednostně, jinak pořadí, které vrstva vrátila
        out.push({ key: o, text: text(o), pos: o.anchor, priority: (o.major ? 600 : 300) - i * 0.01 });
      });
    }
    return out;
  }

  // ---------- legenda ----------
  private buildLegend(): void {
    const legend = $("legend");
    for (const L of this.layers) {
      if (!L.filters.length) continue;
      const row = document.createElement("div");
      row.className = "legRow";
      // skupina s víc typy dostane nadpis, ať je vidět, co k čemu patří
      const chips: [HTMLButtonElement, typeof L.filters[number]][] = [];
      if (L.filters.length > 1) {
        const h = document.createElement("button");
        h.className = "legName";
        h.textContent = L.name;
        h.title = "Zapnout / vypnout celou skupinu";
        h.setAttribute("aria-pressed", String(L.filters.some((f) => f.on)));
        h.setAttribute("aria-label", `${L.name}: celá skupina`);
        h.onclick = () => {
          const on = !L.filters.some((f) => f.on);
          for (const [b, f] of chips) {
            L.setFilter(f.key, on);
            b.setAttribute("aria-pressed", String(on));
          }
          h.setAttribute("aria-pressed", String(on));
          this.afterVisibilityChange();
        };
        row.appendChild(h);
      }
      for (const f of L.filters) {
        const b = document.createElement("button");
        b.className = "chip";
        b.setAttribute("aria-pressed", String(f.on));
        b.innerHTML = `<i style="background:var(${f.color})"></i>${escapeHtml(f.name)}`;
        b.onclick = () => {
          L.setFilter(f.key, !f.on);
          b.setAttribute("aria-pressed", String(f.on));
          row.querySelector(".legName")?.setAttribute("aria-pressed", String(L.filters.some((x) => x.on)));
          this.afterVisibilityChange();
        };
        row.appendChild(b);
        chips.push([b, f]);
      }
      const extra = L.legendExtra?.();
      if (extra) row.appendChild(extra);
      legend.appendChild(row);
      this.legendSync.set(L.id, () => {
        for (const [b, f] of chips) b.setAttribute("aria-pressed", String(f.on));
        row.querySelector(".legName")?.setAttribute("aria-pressed", String(L.filters.some((x) => x.on)));
      });
    }
    // panel seznamu začíná pod hlavičkou, jejíž výška závisí na legendě
    const header = document.querySelector<HTMLElement>("header.hud")!;
    const setH = () => document.documentElement.style.setProperty("--header-h", `${header.getBoundingClientRect().bottom}px`);
    new ResizeObserver(setH).observe(header);
    setH();
  }

  /** Vrstva změnila své přepínače zvenku (tlačítko v liště) – srovnat legendu, seznam a kartu. */
  syncLayer(id: string): void {
    this.legendSync.get(id)?.();
    this.afterVisibilityChange();
  }

  private afterVisibilityChange(): void {
    if (this.selected?.hidden) this.closeCard();
    else if (this.selected) this.select(this.selected, false);
    this.renderList();
    this.updateSubtitle();
  }

  private updateSubtitle(): void {
    // vrstva s úplně vypnutými přepínači (např. fanouškovská Star Trek) do podtitulku nepatří
    const parts = this.layers.filter((L) => L.filters.some((f) => f.on)).map((L) => {
      const vis = L.objects.filter((o) => !o.hidden);
      if (L.countText) return `${L.name}: ${L.countText(vis, this.filters.active)}`;
      const n = vis.length;
      return this.filters.active ? `${L.name}: ${fmt(n)} z ${fmt(L.objects.length)}` : `${L.name}: ${fmt(n)}`;
    });
    const vyrez = this.manifest.katalogy.some((k) => k.vyrez);
    $("sub").innerHTML = escapeHtml(parts.join(" · ")) + (vyrez ? ' <span class="warn" title="Data jsou jen testovací výřez katalogu. Spusť pipeline/exoplanety.py.">výřez dat</span>' : "");
  }

  // ---------- seznam a hledání ----------
  private buildSearch(): void {
    const input = $<HTMLInputElement>("search");
    input.addEventListener("input", () => {
      this.query = norm(input.value.trim());
      this.renderList();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const first = $("list").querySelector<HTMLButtonElement>(".row");
        first?.click();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        $("list").querySelector<HTMLButtonElement>(".row")?.focus();
      }
      if (e.key === "Escape") {
        input.value = "";
        this.query = "";
        this.renderList();
        input.blur();
      }
    });
    togglable($("listToggle"), $("listPanel"), "seznam");

    // šipky mezi řádky; Tab z hledání vede rovnou na aktuální řádek, ne přes všech 150
    $("list").addEventListener("keydown", (e) => {
      const rows = [...this.rows.keys()];
      const i = rows.indexOf(document.activeElement as HTMLElement);
      if (i < 0) return;
      const to = { ArrowDown: i + 1, ArrowUp: i - 1, PageDown: i + 10, PageUp: i - 10, Home: 0, End: rows.length - 1 }[e.key];
      if (to == null) return;
      e.preventDefault();
      if (to < 0) input.focus();
      else this.focusRow(rows[Math.min(to, rows.length - 1)]);
    });
  }

  private focusRow(r: HTMLElement): void {
    for (const x of this.rows.keys()) x.tabIndex = x === r ? 0 : -1;
    r.focus();
  }

  /** Jedna věta o objektu pro čtečku obrazovky: jméno, typ, vzdálenost. */
  private describe(o: MapObject, extra?: string): string {
    const L = this.layers.find((x) => x.id === o.layer);
    const kind = L?.kindName?.(o) ?? L?.name ?? "";
    const dist = o.distLy != null && o.distLy > 0 ? `${spokenLy(o.distLy)} od Slunce`
      : o.layer === "slunecni-soustava" ? "" : "vzdálenost neznámá, na mapě jen směr";
    return [o.name + (o.nick && o.nick !== extra ? ` (${o.nick})` : ""), extra, kind, dist].filter(Boolean).join(", ");
  }

  announce(text: string): void {
    // vyprázdnit a znovu naplnit, jinak čtečka stejný text podruhé nepřečte
    const a = $("announce");
    a.textContent = "";
    requestAnimationFrame(() => (a.textContent = text));
  }

  private renderList(): void {
    const list = $("list");
    const hadFocus = this.rows.get(document.activeElement as HTMLElement);
    list.textContent = "";
    this.rows.clear();
    const q = this.query;
    const matches = this.all.filter((o) => !o.hidden && !shadowed(o) && (!q || this.index.get(o)!.includes(q)));
    if (q) {
      // přesná shoda jména (nebo aliasu) dopředu, jinak by „Kepler-186“ předběhl bližší „Kepler-1869“
      const rank = (o: MapObject) => (norm(o.name) === q ? 0 : [...(o.aliases ?? []), ...(o.searchNames ?? [])].some((a) => norm(a) === q) ? 1 : 2);
      matches.sort((a, b) => rank(a) - rank(b));
    }
    const frag = document.createDocumentFragment();
    for (const o of matches.slice(0, LIST_LIMIT)) {
      const r = document.createElement("button");
      r.className = "row" + (o === this.selected ? " on" : "");
      // při hledání podle planety ukaž, která planeta odpovídá
      const hit = q && !norm(o.name).includes(q) ? [...(o.aliases ?? []), ...(o.searchNames ?? [])].find((a) => norm(a).includes(q)) : undefined;
      const own = o.nick ?? (o.label && o.label !== o.name ? o.label : undefined);
      const extra = hit && hit !== own ? hit : own;
      r.innerHTML = `<i style="background:${o.color}"></i><span class="nm">${escapeHtml(o.name)}${extra ? ` <span class="dim">· ${escapeHtml(extra)}</span>` : ""}</span><span class="ds">${o.distLy != null ? fmtLy(o.distLy) : "?"}</span>`;
      r.setAttribute("aria-label", this.describe(o, extra));
      if (o === this.selected) r.setAttribute("aria-current", "true");
      r.tabIndex = -1;
      r.onclick = () => this.select(o, true);
      frag.appendChild(r);
      this.rows.set(r, o);
    }
    list.appendChild(frag);
    const rows = [...this.rows.keys()];
    const current = rows.find((r) => this.rows.get(r) === (hadFocus ?? this.selected)) ?? rows[0];
    if (current) current.tabIndex = 0;
    // seznam se po výběru překreslí; fokus musí zůstat na stejném objektu, jinak by spadl na <body>
    if (hadFocus) {
      if (current && this.rows.get(current) === hadFocus) current.focus({ preventScroll: false });
      else $("search").focus();
    }
    $("listCount").textContent = matches.length > LIST_LIMIT
      ? `${fmt(LIST_LIMIT)} nejbližších z ${fmt(matches.length)}`
      : `${fmt(matches.length)} ${objWord(matches.length)}`;
  }

  // ---------- karta ----------
  select(o: MapObject, fly: boolean): void {
    this.selected = o;
    this.layers.forEach((L) => L.onSelect?.(o));
    const L = this.layers.find((x) => x.id === o.layer)!;
    const card = $("card");
    card.innerHTML = `<button class="close" aria-label="Zavřít kartu">×</button>${L.cardHtml(o)}`;
    card.querySelector("h3")?.setAttribute("id", "cardTitle");
    if (o.nick) {
      const n = document.createElement("div");
      n.className = "nick";
      n.innerHTML = o.layer === "exoplanety"
        ? `Jméno hvězdy schválené IAU: <b>${escapeHtml(o.nick)}</b>`
        : `Česky: <b>${escapeHtml(o.nick)}</b>`;
      card.querySelector("h3")?.after(n);
    }
    card.hidden = false;
    card.scrollTop = 0;
    card.querySelector<HTMLButtonElement>(".close")!.onclick = () => this.closeCard();
    const detail = L.detailLabel?.(o);
    if (detail && L.openDetail) {
      const b = document.createElement("button");
      b.className = "btn detail";
      b.textContent = detail;
      b.onclick = () => L.openDetail!(o);
      card.querySelector("h3")?.after(b);
    }
    if (o.twin) {
      const t = o.twin;
      const TL = this.layers.find((x) => x.id === t.layer);
      const p = document.createElement("p");
      p.className = "twin";
      p.innerHTML = `Táž hvězda ve vrstvě ${escapeHtml(TL?.name ?? t.layer)}: <button class="linkish">${escapeHtml(t.name)}</button>`;
      p.querySelector("button")!.onclick = () => this.select(t, false);
      card.querySelector(".nick, h3")?.after(p);
    }
    if (o.pos && (o.distLy ?? 0) > 0) {
      const b = document.createElement("button");
      b.className = "btn detail";
      b.textContent = "Pohled odtud ke Slunci ▸";
      b.title = "Kamera se přesune do objektu a podívá se k nám";
      b.onclick = () => this.lookFrom(o);
      card.querySelector(".btn.detail, h3")?.after(b);
    }
    this.cardExtra?.(card);
    const desc = document.createElement("div");
    desc.className = "desc";
    card.appendChild(desc);
    void fillDescription(desc, L.id, o.name, () => this.selected === o && !card.hidden);
    const img = document.createElement("div");
    img.className = "imgs";
    card.appendChild(img);
    void fillImage(img, L.id, o.name, () => this.selected === o && !card.hidden, L.skyPos?.(o) ?? null);
    this.marker.position.copy(o.anchor);
    this.marker.visible = true;
    this.fitCenter();
    this.renderList();
    if (fly) this.announce(`Vybráno: ${this.describe(o)}. Podrobnosti jsou v kartě objektu.`);
    if (fly) this.stage.flyTo(o.anchor, L.flyDistance(o));
  }

  /** Kamera do objektu, cíl pohledu Slunce; otáčení pak krouží kolem Slunce ve stejné vzdálenosti. */
  private lookFrom(o: MapObject): void {
    const sun = this.frame.sun;
    const dir = o.anchor.clone().sub(sun);
    this.marker.visible = false;
    // na telefonu by karta zakryla půlku výhledu
    if (matchMedia("(max-width:760px)").matches) this.closeCard();
    this.stage.flyTo(sun, dir.length(), dir);
    this.toast(`Pohled z ${o.label ?? o.name} ke Slunci (${fmtLy(o.distLy ?? dir.length())})`);
  }

  get selection(): MapObject | null {
    return this.selected;
  }

  deselect(): void {
    if (this.selected) this.closeCard();
  }

  /** Na úzkém displeji zakrývá karta spodek obrazovky; střed pohledu posuň do volného místa nad ní. */
  private fitCenter(): void {
    const card = $("card");
    if (card.hidden || !matchMedia("(max-width:760px)").matches) {
      this.stage.setCenterShift(0);
      return;
    }
    const top = document.querySelector("header.hud")!.getBoundingClientRect().bottom;
    const free = (top + card.getBoundingClientRect().top) / 2;
    this.stage.setCenterShift(Math.max(0, this.stage.height / 2 - free));
  }

  private closeCard(): void {
    const card = $("card");
    const was = this.selected;
    const focusInside = card.contains(document.activeElement);
    const wasOpen = !card.hidden;
    card.hidden = true;
    this.layers.forEach((L) => L.onSelect?.(null));
    this.stage.setCenterShift(0);
    this.selected = null;
    this.marker.visible = false;
    this.renderList();
    if (focusInside) {
      // fokus ze zavřené karty vrátit tam, odkud uživatel přišel
      const row = [...this.rows].find(([, o]) => o === was)?.[0];
      if (row) this.focusRow(row);
      else $("search").focus();
    }
    if (wasOpen) this.cardCloseHandlers.forEach((h) => h());
  }

  /**
   * Karta bez objektu: zastávka výletu (fill chybí, obsah doplní cardExtra), nebo vlastní panel (fill),
   * který kartu převezme a dosavadnímu obsahu oznámí zavření.
   */
  showPanel(fill?: (card: HTMLElement) => void): HTMLElement {
    if (fill && !$("card").hidden) this.cardCloseHandlers.forEach((h) => h());
    this.selected = null;
    this.layers.forEach((L) => L.onSelect?.(null));
    this.marker.visible = false;
    const card = $("card");
    card.innerHTML = `<button class="close" aria-label="Zavřít kartu">×</button>`;
    card.querySelector<HTMLButtonElement>(".close")!.onclick = () => this.closeCard();
    card.hidden = false;
    card.scrollTop = 0;
    if (fill) fill(card);
    else this.cardExtra?.(card);
    this.fitCenter();
    this.renderList();
    return card;
  }

  private showAbout(): void {
    if (!$("card").hidden) this.cardCloseHandlers.forEach((h) => h());
    this.selected = null;
    this.marker.visible = false;
    const card = $("card");
    const m = this.manifest;
    const cats = m.katalogy.map((k) => `<h4>${escapeHtml(k.nazev)}</h4>
      <p>${escapeHtml(k.zdroj)}${k.url ? ` · <a href="${escapeHtml(k.url)}" target="_blank" rel="noopener">web</a>` : ""}<br>
      <span class="dim">Licence: ${escapeHtml(k.licence)} · staženo ${escapeHtml(k.stazeno.slice(0, 10))}${k.vyrez ? " · <b>jen testovací výřez</b>" : ""}</span></p>
      ${k.poznamka ? `<p class="dim">${escapeHtml(k.poznamka)}</p>` : ""}
      ${k.citace ? `<p class="cite">${escapeHtml(k.citace)}</p>` : ""}`).join("");
    card.innerHTML = `<button class="close" aria-label="Zavřít kartu">×</button>
      <div class="kind">O mapě</div><h3 id="cardTitle" tabindex="-1">Zdroje dat</h3>
      <p>Poloha objektů je vůči Slunci. Vzdálenost Slunce od centra Galaxie R₀ = ${(m.r0_pc / 1000).toLocaleString("cs-CZ")} kpc
      (${escapeHtml(m.r0_zdroj)}). Spirální ramena podle Reid et al. 2019 (ApJ 885, 131, tab. 2; parametry
      přes knihovnu SpiralMap, MIT); ztlumené úseky jsou mimo rozsah modelu, doložené jen masery. Příčka a výplň disku
      jsou schematické.</p>${cats}`;
    card.hidden = false;
    card.querySelector<HTMLButtonElement>(".close")!.onclick = () => this.closeCard();
    this.fitCenter();
    card.querySelector<HTMLElement>("h3")!.focus();
  }

  // ---------- spodní lišta ----------
  private buildBar(): void {
    document.querySelectorAll<HTMLButtonElement>("[data-view]").forEach((b) => (b.onclick = () => this.views[b.dataset.view!]()));
    document.querySelectorAll<HTMLButtonElement>("[data-tog]").forEach((b) => (b.onclick = () => {
      const k = b.dataset.tog!;
      const on = k === "labels" ? (this.showLabels = !this.showLabels) : this.overlays.toggle(k as OverlayKey);
      b.setAttribute("aria-pressed", String(on));
    }));
    $("about").onclick = () => this.showAbout();
    $("share").onclick = () => this.share();
  }

  private async share(): Promise<void> {
    const url = location.href;
    const title = this.selected ? `${this.selected.name} · Mapa Mléčné dráhy` : "Mapa Mléčné dráhy";
    // systémový dialog sdílení dává smysl hlavně na telefonu; na desktopu stačí schránka
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      this.toast("Odkaz na tento pohled je ve schránce");
    } catch {
      prompt("Zkopíruj odkaz:", url);
    }
  }

  toastPublic(text: string): void {
    this.toast(text);
  }

  private toast(text: string): void {
    const t = $("toast");
    t.textContent = text;
    t.hidden = false;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (t.hidden = true), 2500);
  }

  private updateScale(): void {
    const { height } = this.stage;
    const worldH = 2 * this.stage.viewDistance * Math.tan((Stage.FOV * Math.PI) / 360);
    const lyPx = worldH / height;
    const raw = lyPx * 130;
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    const nice = [5, 2, 1].map((x) => x * p).find((x) => x <= raw) ?? p;
    $("scaleLine").style.width = `${(nice / lyPx).toFixed(0)}px`;
    $("scaleTxt").textContent = `${fmtLy(nice)} · ${fmtPcFromLy(nice)}`;
    $("readout").textContent = `střed pohledu: ${fmtLy(this.stage.controls.target.distanceTo(this.frame.sun))} od Slunce`;
  }

  // ---------- mobil ----------
  private buildMobile(): void {
    const card = $("card");
    let y0: number | null = null;
    card.addEventListener("touchstart", (e) => {
      // tah dolů jen když je karta odrolovaná nahoru, jinak by kolidoval se scrollem obsahu
      y0 = card.scrollTop <= 0 ? e.touches[0].clientY : null;
    }, { passive: true });
    card.addEventListener("touchmove", (e) => {
      if (y0 == null) return;
      const dy = Math.max(0, e.touches[0].clientY - y0);
      card.style.transition = "none";
      card.style.transform = dy ? `translateY(${dy}px)` : "";
    }, { passive: true });
    card.addEventListener("touchend", (e) => {
      if (y0 == null) return;
      const dy = e.changedTouches[0].clientY - y0;
      card.style.transition = "";
      card.style.transform = "";
      y0 = null;
      if (dy > 80) this.closeCard();
    });

    addEventListener("resize", () => this.fitCenter());

    togglable($("legendToggle"), $("legend"), "vrstvy");
    togglable($("barToggle"), $("bar"), "lista", "min", false);
    trackHeight($("bar"), "--bar-h");

    const hint = $("touchHint");
    let seen = false;
    try {
      seen = localStorage.getItem("galaxie.touchHint") === "1";
    } catch { /* bez úložiště nápovědu prostě ukážeme */ }
    if (matchMedia("(pointer: coarse)").matches && !seen) {
      hint.hidden = false;
      hint.querySelector("button")!.onclick = () => {
        hint.hidden = true;
        try {
          localStorage.setItem("galaxie.touchHint", "1");
        } catch { /* nevadí */ }
      };
    }
  }

  // ---------- klávesnice ----------
  private buildKeys(): void {
    const typing = (t: EventTarget | null) => t instanceof HTMLElement && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    addEventListener("keydown", (e) => {
      // pohled Soustava má vlastní ovládání a mapa pod ním stojí
      if (e.defaultPrevented || this.stage.paused || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "/" && !typing(e.target)) {
        e.preventDefault();
        if ($("listPanel").classList.contains("closed")) $("listToggle").click();
        $<HTMLInputElement>("search").focus();
        $<HTMLInputElement>("search").select();
      } else if (e.key === "Escape" && !$("card").hidden && !typing(e.target)) {
        e.preventDefault();
        this.closeCard();
      }
    });
    $("skip").onclick = () => {
      if ($("listPanel").classList.contains("closed")) $("listToggle").click();
      $("search").focus();
    };
  }

  // ---------- klik do scény ----------
  private buildPicking(): void {
    const el = this.stage.renderer.domElement;
    let downAt: [number, number] | null = null;
    let lastTap: [number, number, number] | null = null;
    let pending = 0;
    const tmp = new Vector3();
    const pick = (px: number, py: number, radius: number, rect: DOMRect): MapObject | null => {
      let best: MapObject | null = null;
      let bd = radius;
      for (const o of this.all) {
        if (o.hidden || o.listOnly || shadowed(o)) continue;
        tmp.copy(o.anchor).project(this.stage.camera);
        if (tmp.z > 1) continue;
        const d = Math.hypot(((tmp.x + 1) / 2) * rect.width - px, ((1 - tmp.y) / 2) * rect.height - py);
        if (d < bd) { bd = d; best = o; }
      }
      return best;
    };
    const byLabel = (e: PointerEvent): MapObject | null => {
      const k = this.labels.hitTest(e.clientX, e.clientY);
      return k && this.all.includes(k as MapObject) ? (k as MapObject) : null;
    };
    el.addEventListener("pointerdown", (e) => (downAt = [e.clientX, e.clientY]));
    el.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || e.buttons) return;
      el.style.cursor = byLabel(e) ? "pointer" : "";
    });
    el.addEventListener("pointerup", (e) => {
      if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      const now = performance.now();
      if (lastTap && now - lastTap[0] < 350 && Math.hypot(px - lastTap[1], py - lastTap[2]) < 40) {
        clearTimeout(pending);
        lastTap = null;
        this.stage.zoomAt(px, py);
        return;
      }
      lastTap = [now, px, py];
      if (e.pointerType === "touch") {
        // V hustém přehledu je v dosahu prstu skoro vždy nějaký objekt, takže dvojklep by nikdy
        // nepřiblížil. Výběr proto chvíli počká, jestli nepřijde druhý klep.
        clearTimeout(pending);
        const hit = byLabel(e);
        pending = window.setTimeout(() => {
          const best = hit ?? pick(px, py, 32, rect);
          if (best) this.select(best, true);
          else this.extraPick?.(px, py, 24, rect);
        }, 300);
      } else {
        const best = byLabel(e) ?? pick(px, py, 20, rect);
        if (best || this.extraPick?.(px, py, 12, rect)) {
          if (best) this.select(best, true);
          lastTap = null;
        }
      }
    });
  }

}

const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
const reducedMotion = () => motionQuery.matches;
