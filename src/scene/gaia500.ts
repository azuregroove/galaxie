import {
  BufferAttribute,
  BufferGeometry,
  Frustum,
  Group,
  Matrix4,
  Points,
  type ShaderMaterial,
  Sphere,
  type Texture,
  Vector3,
} from "three";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtNum, fmtPcFromLy, LY_PER_PC } from "../core/units";
import { positionRows } from "../layers/common";
import type { Layer, SkyPos } from "../layers/layer";
import { loadBytes } from "./dust";
import { bprpColor, starMaterial } from "./gaia100";
import type { Stage } from "./stage";

interface Index {
  pocet: number;
  stazeno: string;
  test?: boolean;
  polovina_pc: number;
  soubory: { body: string; karta: string };
  uzly: [string, number][];
}

interface Node {
  key: string;
  n: number;
  children: Node[];
  /** střed a polovina hrany ve scéně (ly, vůči Slunci) */
  center: Vector3;
  half: number;
  points: Points<BufferGeometry, ShaderMaterial> | null;
  /** polohy vůči Slunci v ly (souřadnice scény) – pro výběr kliknutím */
  local: Float32Array | null;
  gmag: Uint8Array | null;
  bprp: Uint8Array | null;
  loading: boolean;
  failed: boolean;
  lastUsed: number;
  info: Promise<DataView> | null;
}

type Star = MapObject & { l: number; b: number; g: number | null; bprp: number | null; id: string };

/** Uzel se načte, jen když jeho polovina hrany zabere na obrazovce aspoň tolik pixelů. */
const MIN_PX = 150;
const MAX_LOADS = 4;
/** Dál od Slunce (ly) je celá koule 500 pc jen pár desítek pixelů. */
const HIDE_LY = 40000;
const coarse = matchMedia("(pointer: coarse)").matches;
/** Rozpočet bodů: telefon zvládne řádově statisíce, desktop miliony. */
const BUDGET = coarse ? 600_000 : 2_000_000;

/**
 * Hvězdy 100–500 pc z Gaia DR3 v dlaždicích octree (pipeline/gaia500.py), načítané podle kamery. Data leží
 * v samostatném repu galaxie-data kvůli velikosti (~190 MB); uvnitř 100 pc kreslí vrstva Gaia 100 pc (GCNS).
 * Každý uzel nese nejsvítivější hvězdy své krychle, potomci slabší – kreslí se rodič i potomci (aditivně).
 */
export class Gaia500 implements Layer {
  readonly id = "gaia500";
  readonly name = "Hvězdy do 500 pc (Gaia)";
  readonly group = new Group();
  readonly objects: MapObject[] = [];
  readonly filters = [];
  readonly facets = [];

  private on = false;
  private loaded: Promise<void> | null = null;
  private index: Index | null = null;
  private root: Node | null = null;
  private nodes: Node[] = [];
  private shown: Node[] = [];
  private loads = 0;
  private frame = 0;
  private material: ShaderMaterial;
  private selected: Star | null = null;

  private readonly base: string;
  private readonly sun: Vector3;
  private readonly button: HTMLButtonElement;
  private readonly onEnable: () => void;

  constructor(base: string, sun: Vector3, glow: Texture, button: HTMLButtonElement, onEnable: () => void) {
    this.base = base;
    this.sun = sun;
    this.button = button;
    this.onEnable = onEnable;
    this.material = starMaterial(glow);
    this.group.position.copy(sun);
    this.group.visible = false;
    button.onclick = () => void this.toggle();
  }

  private label(state: string): string {
    return `Gaia 500 pc${this.index?.test ? " (TEST)" : ""}: ${state}`;
  }

  async toggle(): Promise<void> {
    this.on = !this.on;
    this.button.setAttribute("aria-pressed", String(this.on));
    this.button.textContent = this.label(this.on ? "načítám…" : "vyp");
    if (this.on) this.onEnable();
    try {
      this.loaded ??= this.load();
      await this.loaded;
      if (this.on) this.button.textContent = this.label("zap");
      this.group.visible = this.on;
    } catch (e) {
      console.error(e);
      this.loaded = null;
      this.on = false;
      this.button.setAttribute("aria-pressed", "false");
      this.button.textContent = this.label("nedostupné");
    }
  }

  private async load(): Promise<void> {
    const r = await fetch(this.base + "index.json");
    if (!r.ok) throw new Error(`gaia500 index.json: HTTP ${r.status}`);
    const ix = (this.index = (await r.json()) as Index);
    const byKey = new Map<string, Node>();
    for (const [key, n] of ix.uzly) {
      // klíč → střed krychle v pc (x k centru, y ke l = 90°, z k severu), pak do os scény (x, z, −y)
      let h = ix.polovina_pc, x = 0, y = 0, z = 0;
      for (const ch of key.slice(1)) {
        const o = Number(ch);
        h /= 2;
        x += o & 1 ? h : -h; y += o & 2 ? h : -h; z += o & 4 ? h : -h;
      }
      const node: Node = {
        key, n, children: [], center: new Vector3(x, z, -y).multiplyScalar(LY_PER_PC), half: h * LY_PER_PC,
        points: null, local: null, gmag: null, bprp: null, loading: false, failed: false, lastUsed: 0, info: null,
      };
      byKey.set(key, node);
      byKey.get(key.slice(0, -1))?.children.push(node);
    }
    this.nodes = [...byKey.values()];
    this.root = byKey.get("r") ?? null;
    if (!this.root) throw new Error("gaia500: index bez kořene");
  }

  private async loadNode(node: Node): Promise<void> {
    const ix = this.index!;
    node.loading = true;
    this.loads++;
    try {
      const buf = await loadBytes(this.base + ix.soubory.body.replace("{KEY}", node.key));
      const n = node.n;
      if (buf.byteLength !== 8 * n) throw new Error(`gaia500 ${node.key}: čekáno ${8 * n} B, je ${buf.byteLength} B`);
      const q = new Int16Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + 6 * n));
      const gmag = buf.subarray(6 * n, 7 * n), bprp = buf.subarray(7 * n, 8 * n);
      const k = node.half / 32767, c = node.center;
      const pos = new Float32Array(3 * n), absMag = new Float32Array(n), col: number[] = [];
      for (let i = 0; i < n; i++) {
        // pc (x, y, z) → scéna (x, z, −y); posun a měřítko uzlu už jsou v ly
        const x = q[i] * k, y = q[n + i] * k, z = q[2 * n + i] * k;
        pos[3 * i] = c.x + x; pos[3 * i + 1] = c.y + z; pos[3 * i + 2] = c.z - y;
        const dPc = Math.hypot(pos[3 * i], pos[3 * i + 1], pos[3 * i + 2]) / LY_PER_PC;
        absMag[i] = gmag[i] === 255 ? 15 : gmag[i] / 10 + 5 - 5 * Math.log10(Math.max(dPc, 0.1));
        bprpColor(bprp[i] === 255 ? null : bprp[i] / 40 - 1, col);
      }
      const geo = new BufferGeometry();
      geo.setAttribute("position", new BufferAttribute(pos, 3));
      geo.setAttribute("absMag", new BufferAttribute(absMag, 1));
      geo.setAttribute("color", new BufferAttribute(new Float32Array(col), 3));
      const p = new Points(geo, this.material);
      p.frustumCulled = false;
      p.visible = false;
      node.points = p;
      node.local = pos;
      node.gmag = gmag;
      node.bprp = bprp;
      this.group.add(p);
    } catch (e) {
      console.error(e);
      node.failed = true;
    } finally {
      node.loading = false;
      this.loads--;
    }
  }

  private unload(node: Node): void {
    if (!node.points) return;
    this.group.remove(node.points);
    node.points.geometry.dispose();
    node.points = null;
    node.local = node.gmag = node.bprp = null;
  }

  update(stage: Stage): void {
    if (!this.on || !this.root) return;
    const cam = stage.camera;
    const d = cam.position.distanceTo(this.sun);
    this.material.uniforms.fade.value = Math.min(1, Math.max(0, (HIDE_LY - d) / (HIDE_LY * 0.6)));
    if (d > HIDE_LY) {
      for (const n of this.shown) n.points!.visible = false;
      this.shown = [];
      return;
    }
    if (this.frame++ % 6) return;

    const camLocal = cam.position.clone().sub(this.sun);
    const frustum = new Frustum().setFromProjectionMatrix(
      new Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse).multiply(this.group.matrixWorld));
    const pxPerRad = stage.height / (2 * Math.tan((cam.fov * Math.PI) / 360));
    const sphere = new Sphere();
    const size = (n: Node) => {
      const r = n.half * Math.sqrt(3); // poloměr opsané koule krychle
      const dist = Math.max(camLocal.distanceTo(n.center) - r, n.half * 0.05);
      return (n.half / dist) * pxPerRad;
    };

    // uzly od největšího na obrazovce; potomci přijdou na řadu až po rodiči
    const want: Node[] = [];
    const heap: [number, Node][] = [[Infinity, this.root]];
    let points = 0;
    while (heap.length) {
      heap.sort((a, b) => b[0] - a[0]);
      const [s, n] = heap.shift()!;
      if (n !== this.root && s < MIN_PX) break;
      if (!frustum.intersectsSphere(sphere.set(n.center, n.half * Math.sqrt(3)))) continue;
      if (points + n.n > BUDGET) break;
      points += n.n;
      want.push(n);
      for (const c of n.children) heap.push([size(c), c]);
    }

    const now = performance.now();
    for (const n of this.shown) n.points!.visible = false;
    this.shown = [];
    for (const n of want) {
      n.lastUsed = now;
      if (n.points) { n.points.visible = true; this.shown.push(n); }
      else if (!n.loading && !n.failed && this.loads < MAX_LOADS) void this.loadNode(n);
    }

    // uvolnit dávno nepoužité uzly, ať paměť nepřeroste dvojnásobek rozpočtu
    let resident = this.nodes.reduce((a, n) => a + (n.points ? n.n : 0), 0);
    if (resident > 2 * BUDGET) {
      const old = this.nodes.filter((n) => n.points && n.lastUsed < now).sort((a, b) => a.lastUsed - b.lastUsed);
      for (const n of old) {
        if (resident <= 1.5 * BUDGET) break;
        resident -= n.n;
        this.unload(n);
      }
    }
  }

  /** Nejbližší vykreslená hvězda v okruhu `radius` px. */
  pickAt(px: number, py: number, radius: number, rect: DOMRect, stage: Stage): { node: Node; i: number } | null {
    if (!this.on || !this.group.visible || !this.shown.length) return null;
    const m = new Matrix4().multiplyMatrices(stage.camera.projectionMatrix, stage.camera.matrixWorldInverse)
      .multiply(this.group.matrixWorld);
    const e = m.elements;
    let best: { node: Node; i: number } | null = null, bd = radius * radius;
    for (const node of this.shown) {
      const p = node.local!;
      for (let i = 0; i < node.n; i++) {
        const x = p[3 * i], y = p[3 * i + 1], z = p[3 * i + 2];
        const w = e[3] * x + e[7] * y + e[11] * z + e[15];
        if (w <= 0) continue;
        const sx = ((e[0] * x + e[4] * y + e[8] * z + e[12]) / w + 1) / 2 * rect.width - px;
        const sy = (1 - (e[1] * x + e[5] * y + e[9] * z + e[13]) / w) / 2 * rect.height - py;
        const d2 = sx * sx + sy * sy;
        if (d2 < bd) { bd = d2; best = { node, i }; }
      }
    }
    return best;
  }

  /** Sestaví objekt hvězdy (dotáhne soubor s Gaia ID uzlu). */
  async star(hit: { node: Node; i: number }): Promise<MapObject> {
    const { node, i } = hit;
    const lp = node.local!, gmag = node.gmag!, bprp = node.bprp!;
    const rel = new Vector3(lp[3 * i], lp[3 * i + 1], lp[3 * i + 2]);
    const g = gmag[i] === 255 ? null : gmag[i] / 10, c = bprp[i] === 255 ? null : bprp[i] / 40 - 1;
    if (!node.info) {
      node.info = loadBytes(this.base + this.index!.soubory.karta.replace("{KEY}", node.key))
        .then((b) => new DataView(b.buffer, b.byteOffset, b.byteLength));
      node.info.catch(() => { node.info = null; });
    }
    const v = await node.info;
    const id = ((BigInt(v.getUint32(4 * node.n + 4 * i, true)) << 32n) | BigInt(v.getUint32(4 * i, true))).toString();
    const distLy = rel.length();
    const pos = rel.clone().add(this.sun);
    const star: Star = {
      layer: this.id, index: i, name: `Gaia DR3 ${id}`, pos, anchor: pos, distLy, color: "var(--fg)",
      l: ((Math.atan2(-rel.z, rel.x) * 180) / Math.PI + 360) % 360,
      b: (Math.asin(rel.y / Math.max(distLy, 1e-9)) * 180) / Math.PI,
      g, bprp: c, id,
    };
    return star;
  }

  setFilter(): void { /* vrstva nemá typy */ }
  applyFilter(): void { /* do filtrů seznamu nepatří */ }
  labelCandidates(): MapObject[] { return []; }
  kindName(): string { return "hvězda do 500 pc (Gaia)"; }
  flyDistance(): number { return 5; }
  onSelect(o: MapObject | null): void { this.selected = o?.layer === this.id ? (o as Star) : null; }
  get selection(): MapObject | null { return this.selected; }

  skyPos(o: MapObject): SkyPos | null {
    const s = o as Star;
    return { l: s.l, b: s.b, fovDeg: 0.05 };
  }

  cardHtml(mo: MapObject): string {
    const s = mo as Star;
    const dPc = (s.distLy ?? 0) / LY_PER_PC;
    const absG = s.g != null ? s.g + 5 - 5 * Math.log10(dPc) : null;
    const row = (t: string, v: string | null) => (v == null ? "" : `<dt>${t}</dt><dd>${v}</dd>`);
    const q = encodeURIComponent(`Gaia DR3 ${s.id}`);
    const test = this.index?.test ? '<p class="warn"><b>Syntetická testovací data – hvězda neexistuje.</b></p>' : "";
    return `<div class="kind">Hvězda do 500 pc (Gaia)</div>
      <h3>${escapeHtml(s.name)}</h3>
      ${test}
      <dl>
        <dt>Od Slunce</dt><dd>${fmtLy(s.distLy ?? 0)} · ${fmtPcFromLy(s.distLy ?? 0)}
          <br><span class="dim">1 / paralaxa; chyba paralaxy pod 10 %, takže zhruba ± ${fmtLy((s.distLy ?? 0) * 0.1)}</span></dd>
        ${positionRows(s.pos, s.l, s.b, s.distLy)}
        ${row("Jasnost G", s.g != null ? `${fmtNum(s.g, 1)} mag` : null)}
        ${row("Absolutní G", absG != null ? `${fmtNum(absG, 1)} mag <span class="dim">(Slunce ≈ 4,7; bez opravy na extinkci)</span>` : null)}
        ${row("Barva BP−RP", s.bprp != null ? `${fmtNum(s.bprp, 2)} mag <span class="dim">(Slunce ≈ 0,8; víc = červenější, prach barvu zčervená)</span>` : null)}
      </dl>
      <p><a href="https://simbad.cds.unistra.fr/simbad/sim-id?Ident=${q}" target="_blank" rel="noopener">SIMBAD ↗</a> ·
        <a href="https://vizier.cds.unistra.fr/viz-bin/VizieR-4?-source=I/355/gaiadr3&amp;Source=${s.id}" target="_blank" rel="noopener">Gaia DR3 ve VizieR (paralaxa, RUWE, RV…) ↗</a></p>
      <div class="src">Poloha: Gaia DR3 (Gaia Collaboration, Vallenari et al. 2023, A&amp;A 674, A1), výběr paralaxa nad 2 mas
        a s chybou pod 10 %; vzdálenost = 1 / paralaxa. Barva bodu podle BP−RP je jen orientační.
        Data stažena ${escapeHtml(this.index?.stazeno.slice(0, 10) ?? "")}.</div>`;
  }
}
