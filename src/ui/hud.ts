import { AdditiveBlending, Sprite, SpriteMaterial, Vector3 } from "three";
import type { Frame } from "../core/coords";
import type { Manifest, MapObject } from "../core/types";
import { escapeHtml, fmt, fmtLy, fmtPcFromLy } from "../core/units";
import type { Layer } from "../layers/layer";
import type { OverlayKey, Overlays } from "../scene/overlays";
import { Stage } from "../scene/stage";
import { FilterPanel } from "./filters";
import { fillImage } from "./images";
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
      this.index.set(o, norm([o.name, ...(o.aliases ?? [])].join(" ")));
    }
    this.all.sort((a, b) => (a.distLy ?? 1e12) - (b.distLy ?? 1e12));
    labels.setProvider(() => this.labelList());
    overlays.sunLabel.pick = this.all.find((o) => o.layer === "slunecni-soustava");

    this.marker = new Sprite(new SpriteMaterial({ map: stage.glow, color: 0xffffff, transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.9 }));
    this.marker.visible = false;
    stage.scene.add(this.marker);

    this.filters = new FilterPanel(layers, (f) => {
      layers.forEach((L) => L.applyFilter(f));
      this.afterVisibilityChange();
    });
    this.buildLegend();
    this.buildBar();
    this.buildSearch();
    this.buildPicking();
    this.buildMobile();
    this.renderList();
    stage.onFrame(() => {
      layers.forEach((L) => L.update?.(stage));
      this.updateScale();
      if (this.selected && this.marker.visible) {
        const s = stage.camera.position.distanceTo(this.selected.anchor) * 0.035 * (1 + 0.15 * Math.sin(performance.now() / 300));
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
        if (o === this.selected) return;
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
        h.onclick = () => {
          const on = !L.filters.some((f) => f.on);
          for (const [b, f] of chips) {
            L.setFilter(f.key, on);
            b.setAttribute("aria-pressed", String(on));
          }
          this.afterVisibilityChange();
        };
        row.appendChild(h);
      }
      for (const f of L.filters) {
        const b = document.createElement("button");
        b.className = "chip";
        b.setAttribute("aria-pressed", "true");
        b.innerHTML = `<i style="background:var(${f.color})"></i>${escapeHtml(f.name)}`;
        b.onclick = () => {
          L.setFilter(f.key, !f.on);
          b.setAttribute("aria-pressed", String(f.on));
          this.afterVisibilityChange();
        };
        row.appendChild(b);
        chips.push([b, f]);
      }
      legend.appendChild(row);
    }
    // panel seznamu začíná pod hlavičkou, jejíž výška závisí na legendě
    const header = document.querySelector<HTMLElement>("header.hud")!;
    const setH = () => document.documentElement.style.setProperty("--header-h", `${header.getBoundingClientRect().bottom}px`);
    new ResizeObserver(setH).observe(header);
    setH();
  }

  private afterVisibilityChange(): void {
    if (this.selected?.hidden) this.closeCard();
    else if (this.selected) this.select(this.selected, false);
    this.renderList();
    this.updateSubtitle();
  }

  private updateSubtitle(): void {
    const parts = this.layers.filter((L) => L.filters.length).map((L) => {
      const n = L.objects.filter((o) => !o.hidden).length;
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
      if (e.key === "Escape") {
        input.value = "";
        this.query = "";
        this.renderList();
        input.blur();
      }
    });
    togglable($("listToggle"), $("listPanel"), "seznam");
  }

  private renderList(): void {
    const list = $("list");
    list.textContent = "";
    const q = this.query;
    const matches = this.all.filter((o) => !o.hidden && (!q || this.index.get(o)!.includes(q)));
    if (q) {
      // přesná shoda jména (nebo aliasu) dopředu, jinak by „Kepler-186“ předběhl bližší „Kepler-1869“
      const rank = (o: MapObject) => (norm(o.name) === q ? 0 : o.aliases?.some((a) => norm(a) === q) ? 1 : 2);
      matches.sort((a, b) => rank(a) - rank(b));
    }
    const frag = document.createDocumentFragment();
    for (const o of matches.slice(0, LIST_LIMIT)) {
      const r = document.createElement("button");
      r.className = "row" + (o === this.selected ? " on" : "");
      // při hledání podle planety ukaž, která planeta odpovídá
      const hit = q && !norm(o.name).includes(q) ? o.aliases?.find((a) => norm(a).includes(q)) : undefined;
      const extra = hit && hit !== o.nick ? hit : o.nick;
      r.innerHTML = `<i style="background:${o.color}"></i><span class="nm">${escapeHtml(o.name)}${extra ? ` <span class="dim">· ${escapeHtml(extra)}</span>` : ""}</span><span class="ds">${o.distLy != null ? fmtLy(o.distLy) : "?"}</span>`;
      r.onclick = () => this.select(o, true);
      frag.appendChild(r);
    }
    list.appendChild(frag);
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
    card.innerHTML = `<button class="close" aria-label="Zavřít">×</button>${L.cardHtml(o)}`;
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
    const img = document.createElement("div");
    img.className = "imgs";
    card.appendChild(img);
    void fillImage(img, L.id, o.name, () => this.selected === o && !card.hidden, L.skyPos?.(o) ?? null);
    this.marker.position.copy(o.anchor);
    this.marker.visible = true;
    this.fitCenter();
    this.renderList();
    if (fly) this.stage.flyTo(o.anchor, L.flyDistance(o));
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
    $("card").hidden = true;
    this.layers.forEach((L) => L.onSelect?.(null));
    this.stage.setCenterShift(0);
    this.selected = null;
    this.marker.visible = false;
    this.renderList();
  }

  private showAbout(): void {
    this.selected = null;
    this.marker.visible = false;
    const card = $("card");
    const m = this.manifest;
    const cats = m.katalogy.map((k) => `<h4>${escapeHtml(k.nazev)}</h4>
      <p>${escapeHtml(k.zdroj)}${k.url ? ` · <a href="${escapeHtml(k.url)}" target="_blank" rel="noopener">web</a>` : ""}<br>
      <span class="dim">Licence: ${escapeHtml(k.licence)} · staženo ${escapeHtml(k.stazeno.slice(0, 10))}${k.vyrez ? " · <b>jen testovací výřez</b>" : ""}</span></p>
      ${k.poznamka ? `<p class="dim">${escapeHtml(k.poznamka)}</p>` : ""}
      ${k.citace ? `<p class="cite">${escapeHtml(k.citace)}</p>` : ""}`).join("");
    card.innerHTML = `<button class="close" aria-label="Zavřít">×</button>
      <div class="kind">O mapě</div><h3>Zdroje dat</h3>
      <p>Poloha objektů je vůči Slunci. Vzdálenost Slunce od centra Galaxie R₀ = ${(m.r0_pc / 1000).toLocaleString("cs-CZ")} kpc
      (${escapeHtml(m.r0_zdroj)}). Spirální ramena podle Reid et al. 2019 (ApJ 885, 131, tab. 2; parametry
      přes knihovnu SpiralMap, MIT); ztlumené úseky jsou mimo rozsah modelu, doložené jen masery. Příčka a výplň disku
      jsou schematické.</p>${cats}`;
    card.hidden = false;
    card.querySelector<HTMLButtonElement>(".close")!.onclick = () => this.closeCard();
    this.fitCenter();
  }

  // ---------- spodní lišta ----------
  private buildBar(): void {
    const SUN = this.frame.sun;
    const views: Record<string, () => void> = {
      near: () => this.stage.flyTo(SUN, 250, new Vector3(-0.35, 0.75, 0.55)),
      sun: () => this.stage.flyTo(SUN, 14000, new Vector3(-0.35, 0.75, 0.55)),
      top: () => this.stage.flyTo(new Vector3(), 125000, new Vector3(0.0001, 1, 0.02)),
      edge: () => this.stage.flyTo(new Vector3(), 95000, new Vector3(0.02, 0.04, 1)),
      gc: () => this.stage.flyTo(new Vector3(), 20000, new Vector3(-0.6, 0.5, 0.6)),
    };
    document.querySelectorAll<HTMLButtonElement>("[data-view]").forEach((b) => (b.onclick = () => views[b.dataset.view!]()));
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
        if (o.hidden || o.listOnly) continue;
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
        }, 300);
      } else {
        const best = byLabel(e) ?? pick(px, py, 20, rect);
        if (best) {
          this.select(best, true);
          lastTap = null;
        }
      }
    });
  }

}
