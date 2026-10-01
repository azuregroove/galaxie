import { Vector3 } from "three";
import type { Stage } from "../scene/stage";

export type LabelKind = "obj" | "anno" | "ring" | "ecl" | "sun";

export interface Label {
  el: HTMLDivElement;
  pos: Vector3;
  kind: LabelKind;
  priority: number;
  /** Vrací, zda má být popisek v tomto snímku vidět (před kontrolou, že je na obrazovce). */
  visible: () => boolean;
  /** Co vybrat kliknutím na popisek; bez toho popisek kliknout nejde. */
  pick?: unknown;
}

/** Popisek objektu dodaný vrstvami; DOM prvek dostane z poolu. */
export interface DynLabel {
  key: unknown;
  text: string;
  pos: Vector3;
  priority: number;
}

type Rect = [number, number, number, number];
type Place = (x: number, y: number, w: number, h: number) => Rect;

const GAP = 8;
// Pořadí pokusů o umístění; první je výchozí, zbytek jen při kolizi.
const PLACES: Record<LabelKind, Place[]> = {
  obj: [
    (x, y, w, h) => [x + GAP, y - h / 2, w, h],
    (x, y, w, h) => [x - GAP - w, y - h / 2, w, h],
    (x, y, w, h) => [x - w / 2, y - h - 4, w, h],
    (x, y, w, h) => [x - w / 2, y + 4, w, h],
  ],
  sun: [(x, y, w, h) => [x + GAP, y - h / 2, w, h], (x, y, w, h) => [x - GAP - w, y - h / 2, w, h]],
  anno: [(x, y, w, h) => [x - w / 2, y - h / 2, w, h]],
  ecl: [(x, y, w, h) => [x - w / 2, y - h / 2, w, h]],
  ring: [(x, y, w, h) => [x + 4, y - h, w, h]],
};
const POOL = 80;
const DOT = 5;

interface Slot {
  el: HTMLDivElement;
  text: string;
  key: unknown;
}

interface Cand {
  pos: Vector3;
  kind: LabelKind;
  priority: number;
  text: string;
  key: unknown;
  stat?: Label;
}

/** HTML popisky promítané do scény s rozmisťováním bez překryvů. Levnější a čitelnější než text ve WebGL. */
export class Labels {
  private items: Label[] = [];
  private slots: Slot[] = [];
  private widths = new Map<string, number>();
  private lastPlace = new Map<unknown, number>();
  private provider: () => DynLabel[] = () => [];
  private tmp = new Vector3();
  private obstacles: Rect[] = [];
  private frameNo = 0;
  /** Počet popisků umístěných v posledním snímku (pro ladění a testy). */
  shown = 0;
  hiddenByCollision = 0;
  /** Obdélníky klikatelných popisků z posledního snímku (popisky samy události nechytají, ať jde táhnout scénu). */
  private hitRects: [Rect, unknown][] = [];

  private root: HTMLElement;
  private stage: Stage;

  constructor(root: HTMLElement, stage: Stage) {
    this.root = root;
    this.stage = stage;
    stage.onFrame(() => this.update());
    // šířky změřené záložním fontem by po načtení webfontu nesedly
    document.fonts?.ready.then(() => this.widths.clear());
  }

  add(text: string, pos: Vector3, kind: LabelKind, visible: () => boolean = () => true, priority = 400): Label {
    const el = this.makeEl(kind);
    el.textContent = text;
    const l = { el, pos, kind, priority, visible };
    this.items.push(l);
    return l;
  }

  setProvider(p: () => DynLabel[]): void {
    this.provider = p;
  }

  private makeEl(kind: LabelKind): HTMLDivElement {
    const el = document.createElement("div");
    el.className = `lbl ${kind}`;
    el.style.display = "none";
    this.root.appendChild(el);
    return el;
  }

  private width(el: HTMLDivElement, text: string, kind: LabelKind, slot?: Slot): number {
    const k = kind + "|" + text;
    let w = this.widths.get(k);
    if (w === undefined) {
      const was = el.style.display;
      el.style.display = "";
      if (slot && slot.text !== text) {
        el.textContent = text;
        slot.text = text;
      }
      w = el.offsetWidth;
      el.style.display = was;
      if (w > 0) this.widths.set(k, w);
    }
    return w;
  }

  private update(): void {
    const { camera, width: W, height: H } = this.stage;
    const cands: Cand[] = [];
    for (const a of this.items) if (a.visible()) cands.push({ pos: a.pos, kind: a.kind, priority: a.priority, text: "", key: a, stat: a });
    const seen = new Set<unknown>();
    // vrstva může tentýž objekt vrátit víckrát (významný a zároveň blízký); popisek má mít jen jeden
    for (const d of this.provider()) {
      if (seen.has(d.key)) continue;
      seen.add(d.key);
      cands.push({ pos: d.pos, kind: "obj", priority: d.priority, text: d.text, key: d.key });
    }
    cands.sort((a, b) => b.priority - a.priority);

    // panely se otevírají a zavírají zřídka, stačí je přeměřit jednou za čas
    if (this.frameNo++ % 30 === 0) this.measureObstacles();
    const placed: Rect[] = [...this.obstacles];
    const hits = (r: Rect) => {
      if (r[0] < 2 || r[1] < 2 || r[0] + r[2] > W - 2 || r[1] + r[3] > H - 2) return true;
      for (const p of placed) if (r[0] < p[0] + p[2] && r[0] + r[2] > p[0] && r[1] < p[1] + p[3] && r[1] + r[3] > p[1]) return true;
      return false;
    };
    const used = new Set<Slot>();
    const want = new Map<Cand, [Rect, number]>();
    this.hiddenByCollision = 0;

    // tečky popsaných objektů nesmí zakrýt cizí popisek
    const screen: ([number, number] | null)[] = cands.map((c) => {
      this.tmp.copy(c.pos).project(camera);
      if (this.tmp.z > 1 || Math.abs(this.tmp.x) > 1.2 || Math.abs(this.tmp.y) > 1.2) return null;
      return [((this.tmp.x + 1) / 2) * W, ((1 - this.tmp.y) / 2) * H];
    });

    const slotFor = new Map<Cand, Slot>();
    // sloty, které už nesou objekt z kandidátů, zůstanou jemu, ať se text zbytečně nepřepisuje
    const byKey = new Map<unknown, Slot>();
    for (const s of this.slots) byKey.set(s.key, s);
    const candKeys = new Set(cands.map((c) => c.key));

    cands.forEach((c, i) => {
      const s = screen[i];
      if (!s) return;
      let el: HTMLDivElement;
      let text = c.text;
      let slot: Slot | undefined;
      if (c.stat) {
        el = c.stat.el;
        text = el.textContent ?? "";
      } else {
        if (used.size >= POOL) return;
        slot = byKey.get(c.key);
        if (!slot || used.has(slot)) slot = this.freeSlot(used, candKeys);
        el = slot.el;
      }
      const w = this.width(el, text, c.kind, slot);
      const h = c.kind === "ring" ? 12 : 14;
      const places = PLACES[c.kind];
      const prev = this.lastPlace.get(c.key) ?? 0;
      const order = [prev, ...places.keys()].filter((v, j, arr) => arr.indexOf(v) === j && v < places.length);
      for (const pi of order) {
        const r = places[pi](s[0], s[1], w, h);
        if (hits(r)) continue;
        placed.push(r);
        if (c.kind === "obj" || c.kind === "sun") placed.push([s[0] - DOT, s[1] - DOT, DOT * 2, DOT * 2]);
        want.set(c, [r, pi]);
        if (slot) {
          slot.key = c.key;
          used.add(slot);
          slotFor.set(c, slot);
        }
        return;
      }
      this.hiddenByCollision++;
    });

    const show = new Map<HTMLDivElement, string>();
    this.lastPlace.clear();
    this.hitRects = [];
    for (const [c, [r, pi]] of want) {
      const pick = c.stat ? c.stat.pick : c.key;
      if (pick !== undefined && (c.kind === "obj" || c.kind === "sun")) this.hitRects.push([r, pick]);
      const slot = slotFor.get(c);
      if (slot && slot.text !== c.text) {
        slot.el.textContent = c.text;
        slot.text = c.text;
      }
      show.set(slot ? slot.el : c.stat!.el, `translate(${r[0].toFixed(1)}px,${r[1].toFixed(1)}px)`);
      this.lastPlace.set(c.key, pi);
    }
    for (const el of [...this.items.map((a) => a.el), ...this.slots.map((s) => s.el)]) {
      const t = show.get(el);
      if (t === undefined) hide(el);
      else {
        if (el.style.display === "none") el.style.display = "";
        el.style.transform = t;
      }
    }
    this.shown = want.size;
  }

  /** Objekt, na jehož popisek ukazuje bod (souřadnice v okně); s malou rezervou kolem textu. */
  hitTest(x: number, y: number, pad = 4): unknown {
    for (let i = this.hitRects.length - 1; i >= 0; i--) {
      const [r, key] = this.hitRects[i];
      if (x >= r[0] - pad && x <= r[0] + r[2] + pad && y >= r[1] - pad && y <= r[1] + r[3] + pad) return key;
    }
    return undefined;
  }

  private measureObstacles(): void {
    this.obstacles = [];
    document.querySelectorAll<HTMLElement>(".hud").forEach((e) => {
      if (e.hidden) return;
      const r = e.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) this.obstacles.push([r.left, r.top, r.width, r.height]);
    });
  }

  private freeSlot(used: Set<Slot>, candKeys: Set<unknown>): Slot {
    let fallback: Slot | undefined;
    for (const s of this.slots) {
      if (used.has(s)) continue;
      if (!candKeys.has(s.key)) return s;
      fallback ??= s;
    }
    if (fallback && this.slots.length >= POOL) return fallback;
    const s: Slot = { el: this.makeEl("obj"), text: "", key: null };
    this.slots.push(s);
    return s;
  }
}

function hide(el: HTMLDivElement): void {
  if (el.style.display !== "none") el.style.display = "none";
}
