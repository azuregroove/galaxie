import { Vector3 } from "three";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtPcFromLy } from "../core/units";
import { fmtYears, travelYears, VOYAGER1_KMS } from "../layers/common";
import type { Layer } from "../layers/layer";
import type { Stage } from "../scene/stage";
import type { Hud } from "./hud";

/*
 * Výlety s komentářem: posloupnost zastávek z public/data/vylety.json.
 * Zastávka odkazuje na objekt jménem („vrstva:jméno“, jako #kotva), ne souřadnicemi kamery,
 * aby přežila aktualizaci dat. Čísla v textu ({d}, {pc}, {voyager}) se doplní z dat.
 */
export interface TourStop {
  o?: string;
  /** předvolený pohled z lišty (near, sun, top, edge, gc) */
  pohled?: string;
  /** vzdálenost kamery od objektu v ly (jinak podle vrstvy) */
  vzdalenost?: number;
  /** směr od cíle ke kameře ve scéně (x, y, z) */
  smer?: [number, number, number];
  nadpis: string;
  text: string;
  zdroj: string;
}

export interface Tour {
  id: string;
  nazev: string;
  popis: string;
  zastavky: TourStop[];
}

interface ToursData {
  schema: number;
  vylety: Tour[];
}

type State = { mode: "menu" } | { mode: "tour"; tour: Tour; step: number } | null;

export class Tours {
  private data: Promise<Tour[]> | null = null;
  private tours: Tour[] = [];
  private state: State = null;
  /** true, když kartu právě skládá výlet sám (jinak jde o výběr uživatelem) */
  private own = false;

  private url: string;
  private hud: Hud;
  private stage: Stage;
  private layers: Layer[];

  constructor(url: string, hud: Hud, stage: Stage, layers: Layer[]) {
    this.url = url;
    this.hud = hud;
    this.stage = stage;
    this.layers = layers;
    hud.cardExtra = (card) => this.render(card);
    hud.onCardClose = () => (this.state = null);
    addEventListener("keydown", (e) => {
      if (this.state?.mode !== "tour" || e.defaultPrevented || this.stage.paused || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") this.go(this.state.step + 1);
      else if (e.key === "ArrowLeft") this.go(this.state.step - 1);
      else return;
      e.preventDefault();
    });
  }

  /** Aktivní výlet a krok (od 0) pro #kotvu. */
  get current(): { id: string; step: number } | null {
    return this.state?.mode === "tour" ? { id: this.state.tour.id, step: this.state.step } : null;
  }

  private load(): Promise<Tour[]> {
    this.data ??= fetch(this.url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<ToursData>;
      })
      .then((d) => (this.tours = d.vylety.map((t) => ({ ...t, zastavky: t.zastavky.filter((z) => this.checkStop(t, z)) }))))
      .catch((e) => {
        this.data = null;
        throw e;
      });
    return this.data;
  }

  /** Zastávka s neexistujícím objektem (třeba po aktualizaci katalogu) se vynechá, výlet jede dál. */
  private checkStop(t: Tour, z: TourStop): boolean {
    if (z.o && !this.find(z.o)) {
      console.warn(`výlet ${t.id}: objekt ${z.o} v datech není, zastávku vynechávám`);
      return false;
    }
    if (z.pohled && !this.hud.views[z.pohled]) {
      console.warn(`výlet ${t.id}: neznámý pohled ${z.pohled}`);
      return false;
    }
    return true;
  }

  private find(ref: string): MapObject | undefined {
    const i = ref.indexOf(":");
    const L = this.layers.find((x) => x.id === ref.slice(0, i));
    return L?.objects.find((o) => o.name === ref.slice(i + 1));
  }

  async menu(): Promise<void> {
    try {
      await this.load();
    } catch (e) {
      alert(`Výlety se nepodařilo načíst: ${(e as Error).message}`);
      return;
    }
    this.state = { mode: "menu" };
    this.own = true;
    const card = this.hud.showPanel();
    this.own = false;
    card.querySelector<HTMLElement>(".tourMenu button")?.focus();
  }

  async start(id: string, step = 0): Promise<boolean> {
    const tour = (await this.load().catch(() => [])).find((t) => t.id === id);
    if (!tour || !tour.zastavky.length) return false;
    this.state = { mode: "tour", tour, step: 0 };
    this.go(Math.max(0, Math.min(step, tour.zastavky.length - 1)));
    return true;
  }

  private go(step: number): void {
    const s = this.state;
    if (s?.mode !== "tour" || step < 0 || step >= s.tour.zastavky.length) return;
    const card = document.getElementById("card")!;
    // fokus na ovládání výletu po překreslení karty vrátit, jinak spadne na <body>
    const refocus = (document.activeElement as HTMLElement | null)?.closest(".tour")
      ? (document.activeElement as HTMLElement).dataset.t ?? "next" : null;
    s.step = step;
    const z = s.tour.zastavky[step];
    const o = z.o ? this.find(z.o)! : null;
    this.own = true;
    if (o) this.hud.select(o, false);
    else this.hud.showPanel();
    this.own = false;

    if (z.pohled) this.hud.views[z.pohled]();
    else if (o) {
      const L = this.layers.find((x) => x.id === o.layer)!;
      const dir = z.smer ? new Vector3(...z.smer) : undefined;
      this.stage.flyTo(o.anchor, z.vzdalenost ?? L.flyDistance(o), dir);
    }
    this.hud.announce(`Zastávka ${step + 1} z ${s.tour.zastavky.length}: ${z.nadpis}. ${fill(z.text, o)}`);
    if (refocus) {
      const b = card.querySelector<HTMLButtonElement>(`.tour [data-t="${refocus}"]:not(:disabled)`)
        ?? card.querySelector<HTMLButtonElement>('.tour [data-t="next"]:not(:disabled), .tour [data-t="end"]');
      b?.focus();
    }
  }

  private render(card: HTMLElement): void {
    const s = this.state;
    if (s?.mode === "menu" && !this.own) {
      // uživatel vybral jiný objekt, nabídka výletů už nemá co dělat
      this.state = null;
      return;
    }
    if (!s) return;
    const box = document.createElement("div");
    box.className = "tour";
    if (s.mode === "menu") {
      box.innerHTML = `<div class="kind">Výlety s komentářem</div><h3 id="cardTitle">Kam se vydáme?</h3>
          <div class="tourMenu">${this.tours.map((t) => `<button class="btn" data-id="${escapeHtml(t.id)}">
            <b>${escapeHtml(t.nazev)}</b><span class="dim">${t.zastavky.length} zastávek · ${escapeHtml(t.popis)}</span></button>`).join("")}</div>
          <p class="dim">Mezi zastávkami přepínáš tlačítky nebo šipkami ← →, kamerou můžeš na každé zastávce volně otáčet.</p>`;
      box.querySelectorAll<HTMLButtonElement>("[data-id]").forEach((b) => (b.onclick = () => void this.start(b.dataset.id!)));
      card.querySelector(".close")!.after(box);
      return;
    }

    const { tour, step } = s;
    const z = tour.zastavky[step];
    const o = z.o ? this.find(z.o) ?? null : null;
    const n = tour.zastavky.length;
    const title = o ? `<h4>${escapeHtml(z.nadpis)}</h4>` : `<h3 id="cardTitle">${escapeHtml(z.nadpis)}</h3>`;
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", `Výlet ${tour.nazev}, zastávka ${step + 1} z ${n}`);
    box.innerHTML = `<div class="tourHead"><span class="kind">Výlet · ${escapeHtml(tour.nazev)}</span><span class="tourStep">${step + 1}/${n}</span></div>
      ${title}
      <div class="tourText">${paragraphs(fill(z.text, o))}</div>
      <div class="src">Zdroj: ${escapeHtml(z.zdroj)}</div>
      <div class="tourNav">
        <button class="btn" data-t="prev"${step === 0 ? " disabled" : ""}>‹ Zpět</button>
        <button class="btn" data-t="next"${step === n - 1 ? " disabled" : ""}>Další ›</button>
        <button class="btn" data-t="end">${step === n - 1 ? "Dokončit" : "Ukončit"}</button>
      </div>`;
    box.querySelector<HTMLButtonElement>('[data-t="prev"]')!.onclick = () => this.go(step - 1);
    box.querySelector<HTMLButtonElement>('[data-t="next"]')!.onclick = () => this.go(step + 1);
    box.querySelector<HTMLButtonElement>('[data-t="end"]')!.onclick = () => this.end();
    // výlet nad kartou objektu, ať je komentář vidět bez rolování
    card.querySelector(".close")!.after(box);
  }

  private end(): void {
    this.state = null;
    (document.getElementById("card")!.querySelector(".close") as HTMLButtonElement | null)?.click();
  }
}

/** Doplní čísla z dat objektu; bez objektu nebo vzdálenosti nechá zástupný text, ať chyba nezůstane skrytá. */
export function fill(text: string, o: MapObject | null): string {
  const d = o?.distLy;
  if (d == null || !(d > 0)) return text;
  return text
    .replaceAll("{d}", fmtLy(d))
    .replaceAll("{pc}", fmtPcFromLy(d))
    .replaceAll("{voyager}", fmtYears(travelYears(d, VOYAGER1_KMS)));
}

function paragraphs(text: string): string {
  return text.split(/\n\s*\n/).map((p) => `<p>${escapeHtml(p.trim())}</p>`).join("");
}
