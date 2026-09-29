import { escapeHtml, fmt, fmtLy } from "../core/units";
import { NO_FILTER, type Facet, type FilterState, type Layer } from "../layers/layer";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// Posuvník vzdálenosti je logaritmický: 0 = bez dolní meze, 1…STEPS = 1 ly … 100 000 ly, STEPS = bez horní meze.
const STEPS = 100;
const DECADES = 5;
const toLy = (v: number) => Math.pow(10, (v / STEPS) * DECADES);
const fromLy = (ly: number) => Math.round((Math.log10(Math.max(1, ly)) / DECADES) * STEPS);

/** Panel filtrů v seznamu: vzdálenost pro všechny vrstvy + fasety jednotlivých vrstev. */
export class FilterPanel {
  private state: FilterState = structuredClone(NO_FILTER);
  private refresh: (() => void)[] = [];

  private onChange: (f: FilterState) => void;

  constructor(layers: Layer[], onChange: (f: FilterState) => void) {
    this.onChange = onChange;
    const root = $("filters");
    root.appendChild(this.distBlock());
    for (const L of layers) for (const f of L.facets) root.appendChild(this.facetBlock(L, f));
    const reset = document.createElement("button");
    reset.className = "btn small";
    reset.textContent = "Zrušit filtry";
    reset.onclick = () => this.set(structuredClone(NO_FILTER));
    root.appendChild(reset);

    const toggle = $("filtersToggle");
    toggle.onclick = () => {
      root.hidden = !root.hidden;
      toggle.setAttribute("aria-expanded", String(!root.hidden));
    };
    this.updateBadge();
  }

  get current(): FilterState {
    return this.state;
  }

  get active(): boolean {
    const s = this.state;
    return !!s.dist || Object.values(s.checks).some(Boolean) || Object.values(s.ranges).some(Boolean);
  }

  set(f: FilterState): void {
    this.state = f;
    this.refresh.forEach((r) => r());
    this.emit();
  }

  private emit(): void {
    this.updateBadge();
    this.onChange(this.state);
  }

  private updateBadge(): void {
    $("filtersToggle").classList.toggle("on", this.active);
  }

  private distBlock(): HTMLElement {
    const box = block("Vzdálenost od Slunce", "Objekty bez známé vzdálenosti se při omezení skryjí.");
    const lo = slider(0, STEPS, "Nejmenší vzdálenost");
    const hi = slider(0, STEPS, "Největší vzdálenost");
    const out = document.createElement("div");
    out.className = "fval";
    const show = () => {
      const a = +lo.value, b = +hi.value;
      out.textContent = `${a === 0 ? "0" : fmtLy(toLy(a))} – ${b === STEPS ? "∞" : fmtLy(toLy(b))}`;
    };
    const read = () => {
      if (+lo.value > +hi.value) lo.value = hi.value;
      const a = +lo.value, b = +hi.value;
      this.state.dist = a === 0 && b === STEPS ? null : [a === 0 ? 0 : toLy(a), b === STEPS ? Infinity : toLy(b)];
      show();
      this.emit();
    };
    lo.oninput = hi.oninput = read;
    this.refresh.push(() => {
      const d = this.state.dist;
      lo.value = String(d && d[0] > 0 ? fromLy(d[0]) : 0);
      hi.value = String(d && Number.isFinite(d[1]) ? fromLy(d[1]) : STEPS);
      show();
    });
    this.refresh.at(-1)!();
    box.append(out, labelled("od", lo), labelled("do", hi));
    return box;
  }

  private facetBlock(L: Layer, f: Facet): HTMLElement {
    const box = block(`${f.name} · ${L.name.toLowerCase()}`, f.kind === "checks" ? "Čísla udávají počet planet. Systém se ukáže, když vyhoví aspoň jedna jeho planeta." : "");
    if (f.kind === "checks") {
      const all = f.options.map((o) => o.value);
      const inputs = f.options.map((o) => {
        const lab = document.createElement("label");
        lab.className = "fcheck";
        lab.innerHTML = `<input type="checkbox" checked value="${o.value}"><span>${escapeHtml(o.label)}</span><span class="dim">${fmt(o.count)}</span>`;
        box.appendChild(lab);
        return lab.querySelector("input")!;
      });
      const read = () => {
        const on = inputs.filter((i) => i.checked).map((i) => +i.value);
        this.state.checks[f.id] = on.length === all.length ? null : on;
        this.emit();
      };
      inputs.forEach((i) => (i.onchange = read));
      this.refresh.push(() => {
        const sel = this.state.checks[f.id];
        inputs.forEach((i) => (i.checked = !sel || sel.includes(+i.value)));
      });
    } else {
      const lo = slider(f.min, f.max, `${f.name} od`);
      const hi = slider(f.min, f.max, `${f.name} do`);
      const out = document.createElement("div");
      out.className = "fval";
      const show = () => (out.textContent = `${lo.value} – ${hi.value}`);
      lo.oninput = hi.oninput = () => {
        if (+lo.value > +hi.value) lo.value = hi.value;
        const a = +lo.value, b = +hi.value;
        this.state.ranges[f.id] = a === f.min && b === f.max ? null : [a, b];
        show();
        this.emit();
      };
      this.refresh.push(() => {
        const r = this.state.ranges[f.id];
        lo.value = String(r ? r[0] : f.min);
        hi.value = String(r ? r[1] : f.max);
        show();
      });
      this.refresh.at(-1)!();
      box.append(out, labelled("od", lo), labelled("do", hi));
    }
    return box;
  }
}

function block(title: string, hint: string): HTMLElement {
  const box = document.createElement("fieldset");
  box.className = "fblock";
  box.innerHTML = `<legend>${escapeHtml(title)}</legend>${hint ? `<p class="dim">${escapeHtml(hint)}</p>` : ""}`;
  return box;
}

function slider(min: number, max: number, aria: string): HTMLInputElement {
  const i = document.createElement("input");
  i.type = "range";
  i.min = String(min);
  i.max = String(max);
  i.step = "1";
  i.setAttribute("aria-label", aria);
  return i;
}

function labelled(text: string, input: HTMLInputElement): HTMLElement {
  const l = document.createElement("label");
  l.className = "frange";
  l.append(Object.assign(document.createElement("span"), { textContent: text }), input);
  return l;
}
