import { escapeHtml, fmt } from "../core/units";
import type { ExoData } from "../layers/exoplanets";
import type { FilterPanel } from "./filters";
import type { Hud } from "./hud";

/*
 * Časová osa objevů exoplanet: posuvník „do roku X“ řídí filtr rok objevu (stejný jako v panelu Filtry),
 * graf ukazuje počty objevů po letech podle metody. Po zavření panelu se vrátí dřívější filtr roku.
 */

// Barvy: kategorická paleta skillu dataviz (tmavý režim), ověřená validate_palette.js proti #0b0f19.
const SERIES: { name: string; color: string; methods: string[] | null }[] = [
  { name: "tranzit", color: "#3987e5", methods: ["tranzit"] },
  { name: "radiální rychlosti", color: "#d95926", methods: ["radiální rychlosti"] },
  { name: "mikročočka", color: "#199e70", methods: ["mikročočka"] },
  { name: "přímé zobrazení", color: "#c98500", methods: ["přímé zobrazení"] },
  { name: "ostatní", color: "#7d8699", methods: null },
];
const STEP_MS = 700;

export class Timeline {
  private years: number[] = [];
  /** counts[rok][série] */
  private counts: number[][] = [];
  /** kumulativně do roku včetně: [planet, systémů] */
  private cum: [number, number][] = [];
  private year = 0;
  private timer = 0;
  private savedRange: [number, number] | null = null;
  private open = false;
  private box: HTMLElement | null = null;

  private hud: Hud;
  private filters: FilterPanel;

  constructor(data: ExoData, hud: Hud, filters: FilterPanel) {
    this.hud = hud;
    this.filters = filters;
    const P = data.planety;
    const methodSeries = data.ciselniky.metoda_cz.map((m) => {
      const k = SERIES.findIndex((s) => s.methods?.includes(m));
      return k < 0 ? SERIES.length - 1 : k;
    });
    const yrs = P.rok.filter((r): r is number => r != null);
    const y0 = Math.min(...yrs), y1 = Math.max(...yrs);
    for (let y = y0; y <= y1; y++) this.years.push(y);
    this.counts = this.years.map(() => SERIES.map(() => 0));
    const firstYear = new Map<number, number>();
    P.rok.forEach((r, p) => {
      if (r == null) return;
      this.counts[r - y0][P.metoda[p] != null ? methodSeries[P.metoda[p]!] : SERIES.length - 1]++;
      const s = P.sys[p];
      firstYear.set(s, Math.min(firstYear.get(s) ?? Infinity, r));
    });
    const sysPerYear = this.years.map(() => 0);
    for (const y of firstYear.values()) sysPerYear[y - y0]++;
    let np = 0, ns = 0;
    this.years.forEach((_, i) => {
      np += this.counts[i].reduce((a, b) => a + b, 0);
      ns += sysPerYear[i];
      this.cum.push([np, ns]);
    });
    this.year = y1;
    hud.cardCloseHandlers.push(() => this.closed());
  }

  show(): void {
    if (!this.open) {
      this.savedRange = this.filters.current.ranges.rok ?? null;
      const r = this.savedRange;
      if (r && r[1] >= this.years[0] && r[1] <= this.years[this.years.length - 1]) this.year = r[1];
    }
    this.hud.showPanel((card) => this.render(card));
    this.open = true;
    this.hud.views.sun();
    this.apply();
    this.box?.querySelector<HTMLInputElement>(".tlRange")?.focus();
  }

  private closed(): void {
    if (!this.open) return;
    this.open = false;
    this.stop();
    const f = structuredClone(this.filters.current);
    f.ranges.rok = this.savedRange;
    this.filters.set(f);
    this.box = null;
  }

  private render(card: HTMLElement): void {
    const box = document.createElement("div");
    box.className = "timeline";
    const y0 = this.years[0], y1 = this.years[this.years.length - 1];
    box.innerHTML = `<div class="kind">Časová osa</div><h3 id="cardTitle">Objevy exoplanet</h3>
      <p class="tlHead" aria-live="polite"></p>
      <div class="tlCtl">
        <button class="btn" data-a="play">▶ Přehrát</button>
        <input class="tlRange" type="range" min="${y0}" max="${y1}" step="1" value="${this.year}" aria-label="Zobrazit objevy do roku">
      </div>
      ${this.chart()}
      <div class="tlLegend">${SERIES.map((s) => `<span><i style="background:${s.color}"></i>${escapeHtml(s.name)}</span>`).join("")}</div>
      <p class="dim">Na mapě jsou systémy, u kterých byla do zvoleného roku objevena aspoň jedna planeta (filtr Rok objevu).
        Planety bez vzdálenosti se počítají, ale na mapě nejsou.</p>
      <details><summary>Tabulka</summary>${this.table()}</details>
      <div class="src">Data: NASA Exoplanet Archive (PSCompPars), rok a metoda objevu.</div>`;
    card.querySelector(".close")!.after(box);
    this.box = box;
    const range = box.querySelector<HTMLInputElement>(".tlRange")!;
    range.oninput = () => {
      this.stop();
      this.year = Number(range.value);
      this.apply();
    };
    box.querySelector<HTMLButtonElement>('[data-a="play"]')!.onclick = () => (this.timer ? this.stop() : this.play());
    const tip = box.querySelector<HTMLElement>(".tlTip")!;
    box.querySelectorAll<SVGGElement>(".tlCol").forEach((g) => {
      const i = Number(g.dataset.i);
      g.addEventListener("pointerenter", () => {
        const c = this.counts[i];
        tip.innerHTML = `<b>${this.years[i]}</b>: ${fmt(c.reduce((a, b) => a + b, 0))} planet<br>${SERIES.map((s, k) => c[k] ? `<span><i style="background:${s.color}"></i>${escapeHtml(s.name)} ${fmt(c[k])}</span>` : "").filter(Boolean).join("<br>")}`;
        tip.hidden = false;
        // vedle sloupce na tu stranu, kde je víc místa; vysoké sloupce jsou vpravo, tooltip je nesmí zakrýt
        const bb = g.getBoundingClientRect(), cb = tip.parentElement!.getBoundingClientRect();
        const x = bb.left - cb.left;
        tip.style.left = x > cb.width / 2 ? "" : `${x + bb.width + 4}px`;
        tip.style.right = x > cb.width / 2 ? `${cb.width - x + 4}px` : "";
      });
      g.addEventListener("pointerleave", () => (tip.hidden = true));
      g.addEventListener("click", () => {
        this.stop();
        this.year = this.years[i];
        this.apply();
      });
    });
  }

  private chart(): string {
    const W = 320, H = 130, PAD_B = 16, PAD_T = 6;
    const n = this.years.length;
    const max = Math.max(...this.counts.map((c) => c.reduce((a, b) => a + b, 0)));
    const slot = W / n;
    const bw = Math.min(24, slot - 2);
    const sy = (v: number) => (v / max) * (H - PAD_B - PAD_T);
    const cols = this.counts.map((c, i) => {
      const x = i * slot + (slot - bw) / 2;
      let y = H - PAD_B;
      const segs = c.map((v, k) => {
        if (!v) return "";
        const h = sy(v);
        y -= h;
        // 2px mezera mezi segmenty, aspoň 1px výšky, ať je vidět i jediný objev
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, h - 1).toFixed(1)}" fill="${SERIES[k].color}"/>`;
      }).join("");
      return `<g class="tlCol" data-i="${i}"><rect class="hit" x="${(i * slot).toFixed(1)}" y="0" width="${slot.toFixed(1)}" height="${H}"/>${segs}</g>`;
    }).join("");
    const ticks = this.years.filter((y) => y % 5 === 0).map((y) => {
      const x = (y - this.years[0]) * slot + slot / 2;
      return `<text x="${x.toFixed(1)}" y="${H - 3}" text-anchor="middle">${y}</text>`;
    }).join("");
    const top = `<text x="0" y="${PAD_T + 8}" class="tlMax">${fmt(max)}</text><line x1="0" x2="${W}" y1="${PAD_T}" y2="${PAD_T}" class="grid"/>`;
    return `<div class="tlChart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Počty objevených planet po letech ${this.years[0]}–${this.years[n - 1]}, rozdělené podle metody; podrobnosti v tabulce">
      ${top}<line x1="0" x2="${W}" y1="${H - PAD_B}" y2="${H - PAD_B}" class="base"/>${cols}${ticks}</svg><div class="tlTip" hidden></div></div>`;
  }

  private table(): string {
    const rows = this.years.map((y, i) => `<tr><th scope="row">${y}</th>${this.counts[i].map((v) => `<td>${v ? fmt(v) : ""}</td>`).join("")}<td>${fmt(this.cum[i][0])}</td></tr>`).join("");
    return `<div class="tablewrap"><table class="planets"><thead><tr><th>Rok</th>${SERIES.map((s) => `<th>${escapeHtml(s.name)}</th>`).join("")}<th>celkem</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  private apply(): void {
    const i = this.year - this.years[0];
    const f = structuredClone(this.filters.current);
    f.ranges.rok = [this.years[0], this.year];
    // poslední rok = bez omezení, ať zůstane vidět všechno včetně případných planet bez roku
    if (this.year === this.years[this.years.length - 1]) f.ranges.rok = null;
    this.filters.set(f);
    const b = this.box;
    if (!b) return;
    const [np, ns] = this.cum[i];
    b.querySelector(".tlHead")!.innerHTML = `Do roku <b>${this.year}</b>: ${fmt(np)} ${planets(np)} v ${fmt(ns)} ${systems(ns)}`;
    b.querySelector<HTMLInputElement>(".tlRange")!.value = String(this.year);
    b.querySelectorAll<SVGGElement>(".tlCol").forEach((g) => g.classList.toggle("future", Number(g.dataset.i) > i));
  }

  private play(): void {
    if (this.year >= this.years[this.years.length - 1]) this.year = this.years[0];
    else this.year++;
    this.apply();
    this.setPlayLabel(true);
    this.timer = window.setInterval(() => {
      // panel převzal jiný obsah karty (výběr objektu): přehrávání skončí, filtr zůstane
      if (!this.box?.isConnected) return this.stop();
      if (this.year >= this.years[this.years.length - 1]) return this.stop();
      this.year++;
      this.apply();
    }, STEP_MS);
  }

  private stop(): void {
    clearInterval(this.timer);
    this.timer = 0;
    this.setPlayLabel(false);
  }

  private setPlayLabel(playing: boolean): void {
    const b = this.box?.querySelector<HTMLButtonElement>('[data-a="play"]');
    if (b) b.textContent = playing ? "❚❚ Pauza" : "▶ Přehrát";
  }
}

const planets = (n: number) => (n === 1 ? "planeta" : n >= 2 && n <= 4 ? "planety" : "planet");
const systems = (n: number) => (n === 1 ? "systému" : "systémech");
