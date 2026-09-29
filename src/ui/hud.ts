import { AdditiveBlending, Sprite, SpriteMaterial, Vector3 } from "three";
import type { Frame } from "../core/coords";
import type { Manifest, MapObject } from "../core/types";
import { escapeHtml, fmt, fmtLy, fmtPcFromLy } from "../core/units";
import type { Layer } from "../layers/layer";
import type { OverlayKey, Overlays } from "../scene/overlays";
import type { Stage } from "../scene/stage";
import type { Labels } from "./labels";

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

  private stage: Stage;
  private frame: Frame;
  private layers: Layer[];
  private overlays: Overlays;
  private manifest: Manifest;

  constructor(stage: Stage, frame: Frame, layers: Layer[], overlays: Overlays, labels: Labels, manifest: Manifest) {
    this.stage = stage;
    this.frame = frame;
    this.layers = layers;
    this.overlays = overlays;
    this.manifest = manifest;
    for (const L of layers) for (const o of L.objects) {
      this.all.push(o);
      this.index.set(o, norm([o.name, ...(o.aliases ?? [])].join(" ")));
      labels.add(o.pos ? o.name : `${o.name} (jen směr)`, o.anchor, "obj",
        () => this.showLabels && !o.hidden && (o === this.selected || L.labelVisible(o, stage)));
    }
    this.all.sort((a, b) => (a.distLy ?? 1e12) - (b.distLy ?? 1e12));

    this.marker = new Sprite(new SpriteMaterial({ map: stage.glow, color: 0xffffff, transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.9 }));
    this.marker.visible = false;
    stage.scene.add(this.marker);

    this.buildLegend();
    this.buildBar();
    this.buildSearch();
    this.buildPicking();
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

  // ---------- legenda ----------
  private buildLegend(): void {
    const legend = $("legend");
    for (const L of this.layers) for (const f of L.filters) {
      const b = document.createElement("button");
      b.className = "chip";
      b.setAttribute("aria-pressed", "true");
      b.innerHTML = `<i style="background:var(${f.color})"></i>${escapeHtml(f.name)}`;
      b.onclick = () => {
        L.setFilter(f.key, !f.on);
        b.setAttribute("aria-pressed", String(f.on));
        if (this.selected?.hidden) this.closeCard();
        this.renderList();
        this.updateSubtitle();
      };
      legend.appendChild(b);
    }
  }

  private updateSubtitle(): void {
    const parts = this.layers.map((L) => {
      const n = L.objects.filter((o) => !o.hidden).length;
      return `${L.name}: ${fmt(n)}`;
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
    const panel = $("listPanel");
    const toggle = $("listToggle");
    if (matchMedia("(max-width:760px)").matches) panel.classList.add("closed");
    toggle.onclick = () => {
      const c = panel.classList.toggle("closed");
      toggle.setAttribute("aria-pressed", String(!c));
    };
  }

  private renderList(): void {
    const list = $("list");
    list.textContent = "";
    const q = this.query;
    const matches = this.all.filter((o) => !o.hidden && (!q || this.index.get(o)!.includes(q)));
    const frag = document.createDocumentFragment();
    for (const o of matches.slice(0, LIST_LIMIT)) {
      const r = document.createElement("button");
      r.className = "row" + (o === this.selected ? " on" : "");
      // při hledání podle planety ukaž, která planeta odpovídá
      const hit = q && !norm(o.name).includes(q) ? o.aliases?.find((a) => norm(a).includes(q)) : undefined;
      r.innerHTML = `<i style="background:${o.color}"></i><span class="nm">${escapeHtml(o.name)}${hit ? ` <span class="dim">· ${escapeHtml(hit)}</span>` : ""}</span><span class="ds">${o.distLy != null ? fmtLy(o.distLy) : "?"}</span>`;
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
    const L = this.layers.find((x) => x.id === o.layer)!;
    const card = $("card");
    card.innerHTML = `<button class="close" aria-label="Zavřít">×</button>${L.cardHtml(o)}`;
    card.hidden = false;
    card.scrollTop = 0;
    card.querySelector<HTMLButtonElement>(".close")!.onclick = () => this.closeCard();
    this.marker.position.copy(o.anchor);
    this.marker.visible = true;
    this.renderList();
    if (fly) this.stage.flyTo(o.anchor, L.flyDistance(o));
  }

  private closeCard(): void {
    $("card").hidden = true;
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
      (${escapeHtml(m.r0_zdroj)}). Spirální ramena na pozadí jsou zatím jen schematická.</p>${cats}`;
    card.hidden = false;
    card.querySelector<HTMLButtonElement>(".close")!.onclick = () => this.closeCard();
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
  }

  private updateScale(): void {
    const { camera, height } = this.stage;
    const worldH = 2 * this.stage.viewDistance * Math.tan((camera.fov * Math.PI) / 360);
    const lyPx = worldH / height;
    const raw = lyPx * 130;
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    const nice = [5, 2, 1].map((x) => x * p).find((x) => x <= raw) ?? p;
    $("scaleLine").style.width = `${(nice / lyPx).toFixed(0)}px`;
    $("scaleTxt").textContent = `${fmtLy(nice)} · ${fmtPcFromLy(nice)}`;
    $("readout").textContent = `střed pohledu: ${fmtLy(this.stage.controls.target.distanceTo(this.frame.sun))} od Slunce`;
  }

  // ---------- klik do scény ----------
  private buildPicking(): void {
    const el = this.stage.renderer.domElement;
    let downAt: [number, number] | null = null;
    const tmp = new Vector3();
    el.addEventListener("pointerdown", (e) => (downAt = [e.clientX, e.clientY]));
    el.addEventListener("pointerup", (e) => {
      if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      // prst je méně přesný než myš
      let best: MapObject | null = null;
      let bd = e.pointerType === "touch" ? 32 : 20;
      for (const o of this.all) {
        if (o.hidden) continue;
        tmp.copy(o.anchor).project(this.stage.camera);
        if (tmp.z > 1) continue;
        const d = Math.hypot(((tmp.x + 1) / 2) * rect.width - px, ((1 - tmp.y) / 2) * rect.height - py);
        if (d < bd) { bd = d; best = o; }
      }
      if (best) this.select(best, true);
    });
  }
}
