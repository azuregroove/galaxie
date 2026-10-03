import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  Matrix4,
  Points,
  ShaderMaterial,
  type Texture,
  Vector3,
} from "three";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtNum, fmtPcFromLy, LY_PER_PC } from "../core/units";
import { positionRows } from "../layers/common";
import type { Layer, SkyPos } from "../layers/layer";
import { loadBytes } from "./dust";
import type { Stage } from "./stage";

interface GaiaMeta {
  pocet: number;
  stazeno: string;
  soubory: { body: string; info: string; info_po: number };
  kodovani: { pozice_pc_krat: number; vzdalenost_pc_krat: number };
}

interface Info {
  id: string;
  plx: number | null;
  ePlx: number | null;
  d16: number | null;
  d50: number | null;
  d84: number | null;
  ruwe: number | null;
  gcns: number | null;
  rv: number | null;
}

type Star = MapObject & { l: number; b: number; g: number | null; bprp: number | null; wd: number | null; info: Info };

/** Pod touhle vzdáleností kamery od Slunce (ly) se kreslí všechny hvězdy, dál jen nejjasnější (soubor je řazený podle G). */
const NEAR_LY = 900;
const FAR_COUNT = 40000;
/** Dál než tohle už je celá vrstva menší než pár pixelů kolem Slunce. */
const HIDE_LY = 9000;

// Barva podle BP−RP: jen orientační přechod modrá → bílá → žlutá → oranžová → červená,
// ne kalibrace na spektrální třídy.
const STOPS: [number, number, number, number][] = [
  [-0.4, 0.62, 0.71, 1.0], [0.3, 0.92, 0.94, 1.0], [0.8, 1.0, 0.95, 0.8], [1.3, 1.0, 0.8, 0.55],
  [2.2, 1.0, 0.6, 0.4], [3.5, 1.0, 0.42, 0.32],
];
export function bprpColor(c: number | null, out: number[]): void {
  if (c == null) { out.push(0.75, 0.75, 0.78); return; }
  if (c <= STOPS[0][0]) { out.push(STOPS[0][1], STOPS[0][2], STOPS[0][3]); return; }
  for (let i = 1; i < STOPS.length; i++) {
    if (c <= STOPS[i][0]) {
      const a = STOPS[i - 1], b = STOPS[i], t = (c - a[0]) / (b[0] - a[0]);
      out.push(a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t);
      return;
    }
  }
  const z = STOPS[STOPS.length - 1];
  out.push(z[1], z[2], z[3]);
}

/** Body hvězd Gaia: atribut absMag (absolutní G) a color; sdílí je vrstvy gaia100 a gaia500. */
export function starMaterial(glow: Texture): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: { map: { value: glow }, pr: { value: Math.min(devicePixelRatio, 2) }, fade: { value: 1 } },
    // Velikost a jas podle hvězdné velikosti, jakou by hvězda měla z místa kamery (absolutní G + modul
    // vzdálenosti), takže při průletu blízké hvězdy zjasní. Konstanty jsou vzhledové, ne fotometrické.
    vertexShader: /* glsl */ `
      uniform float pr; uniform float fade; attribute float absMag; attribute vec3 color; varying vec3 vCol; varying float vA;
      void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
        float rPc = max(-mv.z, 0.02) / ${LY_PER_PC.toFixed(6)};
        float m = absMag + 5. * log(rPc / 10.) / log(10.);
        gl_PointSize = clamp(7.2 - 0.5 * m, 1.6, 12.) * pr;
        vA = clamp(1.25 - 0.075 * m, 0.12, 1.) * fade;
        gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D map; varying vec3 vCol; varying float vA;
      void main(){
        float r = length(gl_PointCoord - .5);
        float core = 1. - smoothstep(.1, .22, r);
        float a = max(texture2D(map, gl_PointCoord).a * .6, core) * vA;
        gl_FragColor = vec4(mix(vCol, vec3(1.), core * .3), a); }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}

/**
 * Hvězdy do ~100 pc z Gaia Catalogue of Nearby Stars (pipeline/gaia100.py). Body se načtou až po zapnutí,
 * údaje pro kartu po kouscích až po kliknutí. Do seznamu a hledání nepatří (331 tisíc řádků), proto má vrstva
 * prázdné `objects` a vybírá se přes `pickAt`.
 */
export class Gaia100 implements Layer {
  readonly id = "gaia100";
  readonly name = "Hvězdy do 100 pc (Gaia)";
  readonly group = new Group();
  readonly objects: MapObject[] = [];
  readonly filters = [];
  readonly facets = [];

  private on = false;
  private loaded: Promise<void> | null = null;
  private points: Points<BufferGeometry, ShaderMaterial> | null = null;
  private n = 0;
  /** lokální polohy v ly vůči Slunci (scéna má Slunce v −R0, takže by float32 ztratil přesnost) */
  private local = new Float32Array(0);
  private gmag: Uint8Array = new Uint8Array(0);
  private bprp: Uint8Array = new Uint8Array(0);
  private wd: Uint8Array = new Uint8Array(0);
  private chunks = new Map<number, Promise<DataView>>();
  private meta: GaiaMeta | null = null;
  private selected: Star | null = null;

  private readonly url: string;
  private readonly base: string;
  private readonly sun: Vector3;
  private readonly glow: Texture;
  private readonly button: HTMLButtonElement;

  constructor(url: string, sun: Vector3, glow: Texture, button: HTMLButtonElement) {
    this.url = url;
    this.base = url.slice(0, url.lastIndexOf("/") + 1);
    this.sun = sun;
    this.glow = glow;
    this.button = button;
    this.group.position.copy(sun);
    this.group.visible = false;
    button.onclick = () => void this.toggle();
  }

  get active(): boolean {
    return this.on && !!this.points;
  }

  async toggle(): Promise<void> {
    this.on = !this.on;
    this.button.setAttribute("aria-pressed", String(this.on));
    this.button.textContent = this.on ? "Gaia 100 pc: načítám…" : "Gaia 100 pc: vyp";
    try {
      this.loaded ??= this.load();
      await this.loaded;
      if (this.on) this.button.textContent = "Gaia 100 pc: zap";
      this.group.visible = this.on;
    } catch (e) {
      console.error(e);
      this.loaded = null;
      this.on = false;
      this.button.setAttribute("aria-pressed", "false");
      this.button.textContent = "Gaia 100 pc: chyba načtení";
    }
  }

  private async load(): Promise<void> {
    const r = await fetch(this.url);
    if (!r.ok) throw new Error(`gaia100.json: HTTP ${r.status}`);
    const meta = (this.meta = (await r.json()) as GaiaMeta);
    const buf = await loadBytes(this.base + meta.soubory.body);
    const n = (this.n = meta.pocet);
    if (buf.byteLength !== n * 9) throw new Error(`gaia100: čekáno ${n * 9} B, je ${buf.byteLength} B`);
    const xyz = new Int16Array(buf.buffer, buf.byteOffset, 3 * n);
    this.gmag = buf.subarray(6 * n, 7 * n);
    this.bprp = buf.subarray(7 * n, 8 * n);
    this.wd = buf.subarray(8 * n, 9 * n);
    const k = LY_PER_PC / meta.kodovani.pozice_pc_krat;
    const pos = (this.local = new Float32Array(3 * n));
    const absMag = new Float32Array(n);
    const col: number[] = [];
    for (let i = 0; i < n; i++) {
      // pc (x k centru, y ke l = 90°, z k severu) → scéna (x, y nahoru, −z ke l = 90°)
      const x = xyz[i] * k, y = xyz[n + i] * k, z = xyz[2 * n + i] * k;
      pos[3 * i] = x; pos[3 * i + 1] = z; pos[3 * i + 2] = -y;
      const dPc = Math.hypot(x, y, z) / LY_PER_PC;
      const g = this.gmag[i] === 255 ? null : this.gmag[i] / 10;
      absMag[i] = g == null ? 15 : g + 5 - 5 * Math.log10(Math.max(dPc, 0.1));
      bprpColor(this.bprp[i] === 255 ? null : this.bprp[i] / 40 - 1, col);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("absMag", new BufferAttribute(absMag, 1));
    geo.setAttribute("color", new BufferAttribute(new Float32Array(col), 3));
    const mat = starMaterial(this.glow);
    this.points = new Points(geo, mat);
    this.points.frustumCulled = false;
    this.group.add(this.points);
  }

  update(stage: Stage): void {
    if (!this.points || !this.on) return;
    const d = stage.camera.position.distanceTo(this.sun);
    this.points.visible = d < HIDE_LY;
    this.points.material.uniforms.fade.value = Math.min(1, Math.max(0, (HIDE_LY - d) / (HIDE_LY * 0.6)));
    this.points.geometry.setDrawRange(0, d < NEAR_LY ? this.n : Math.min(this.n, FAR_COUNT));
  }

  /** Nejbližší vykreslená hvězda v okruhu `radius` px; null = žádná. Výběr pak doběhne asynchronně (načtení karty). */
  pickAt(px: number, py: number, radius: number, rect: DOMRect, stage: Stage): number | null {
    if (!this.points?.visible || !this.group.visible) return null;
    const count = Math.min(this.n, this.points.geometry.drawRange.count);
    const m = new Matrix4().multiplyMatrices(stage.camera.projectionMatrix, stage.camera.matrixWorldInverse)
      .multiply(this.group.matrixWorld);
    const e = m.elements, p = this.local;
    let best = -1, bd = radius * radius;
    for (let i = 0; i < count; i++) {
      const x = p[3 * i], y = p[3 * i + 1], z = p[3 * i + 2];
      const w = e[3] * x + e[7] * y + e[11] * z + e[15];
      if (w <= 0) continue;
      const sx = ((e[0] * x + e[4] * y + e[8] * z + e[12]) / w + 1) / 2 * rect.width - px;
      const sy = (1 - (e[1] * x + e[5] * y + e[9] * z + e[13]) / w) / 2 * rect.height - py;
      const d2 = sx * sx + sy * sy;
      if (d2 < bd) { bd = d2; best = i; }
    }
    return best >= 0 ? best : null;
  }

  /** Sestaví objekt hvězdy (dotáhne kousek s údaji pro kartu). */
  async star(i: number): Promise<MapObject> {
    const meta = this.meta!;
    const per = meta.soubory.info_po;
    const c = Math.floor(i / per);
    let p = this.chunks.get(c);
    if (!p) {
      p = loadBytes(this.base + meta.soubory.info.replace("{NN}", String(c).padStart(2, "0")))
        .then((b) => new DataView(b.buffer, b.byteOffset, b.byteLength));
      this.chunks.set(c, p);
      p.catch(() => this.chunks.delete(c));
    }
    const v = await p;
    const m = Math.min(per, this.n - c * per), j = i - c * per;
    const u32 = (col: number) => v.getUint32(col * 4 * m + 4 * j, true);
    // za dvěma sloupci uint32 následují sloupce uint16, pak uint8 a int16
    const u16 = (col: number) => { const x = v.getUint16(8 * m + col * 2 * m + 2 * j, true); return x === 65535 ? null : x; };
    const gcns = v.getUint8(8 * m + 12 * m + j);
    const rv = v.getInt16(8 * m + 13 * m + 2 * j, true);
    const ds = meta.kodovani.vzdalenost_pc_krat;
    const sc = (x: number | null, k: number) => (x == null ? null : x / k);
    const info: Info = {
      id: ((BigInt(u32(1)) << 32n) | BigInt(u32(0))).toString(),
      plx: sc(u16(0), 50), ePlx: sc(u16(1), 1e4),
      d16: sc(u16(2), ds), d50: sc(u16(3), ds), d84: sc(u16(4), ds),
      ruwe: sc(u16(5), 100), gcns: gcns === 255 ? null : gcns / 250, rv: rv === -32768 ? null : rv / 10,
    };
    const lp = this.local;
    const pos = new Vector3(lp[3 * i], lp[3 * i + 1], lp[3 * i + 2]).add(this.sun);
    const rel = pos.clone().sub(this.sun);
    const distLy = rel.length();
    const l = ((Math.atan2(-rel.z, rel.x) * 180) / Math.PI + 360) % 360;
    const b = (Math.asin(rel.y / Math.max(distLy, 1e-9)) * 180) / Math.PI;
    const star: Star = {
      layer: this.id, index: i, name: `Gaia DR3 ${info.id}`, pos, anchor: pos, distLy, color: "var(--fg)",
      l, b, info,
      g: this.gmag[i] === 255 ? null : this.gmag[i] / 10,
      bprp: this.bprp[i] === 255 ? null : this.bprp[i] / 40 - 1,
      wd: this.wd[i] === 255 ? null : this.wd[i] / 200,
    };
    return star;
  }

  setFilter(): void { /* vrstva nemá typy */ }
  applyFilter(): void { /* do filtrů seznamu nepatří */ }
  labelCandidates(): MapObject[] { return []; }
  kindName(): string { return "hvězda do 100 pc (Gaia)"; }
  flyDistance(): number { return 3; }
  onSelect(o: MapObject | null): void { this.selected = o?.layer === this.id ? (o as Star) : null; }
  get selection(): MapObject | null { return this.selected; }

  skyPos(o: MapObject): SkyPos | null {
    const s = o as Star;
    return { l: s.l, b: s.b, fovDeg: 0.05 };
  }

  cardHtml(mo: MapObject): string {
    const s = mo as Star, I = s.info;
    const ly = (pc: number) => fmtLy(pc * LY_PER_PC);
    const range = I.d16 != null && I.d84 != null && ly(I.d16) !== ly(I.d84)
      ? `<br><span class="dim">16.–84. percentil ${ly(I.d16)} – ${ly(I.d84)}</span>` : "";
    const absG = s.g != null && I.d50 != null ? s.g + 5 - 5 * Math.log10(I.d50) : null;
    const row = (t: string, v: string | null) => (v == null ? "" : `<dt>${t}</dt><dd>${v}</dd>`);
    const pct = (x: number) => (x < 0.01 ? "pod 1 %" : `${fmtNum(x * 100, 0)} %`);
    const wd = s.wd == null ? null : s.wd > 0.5 ? `${pct(s.wd)} – <b>pravděpodobně bílý trpaslík</b>` : pct(s.wd);
    const ruwe = I.ruwe == null ? null
      : `${fmtNum(I.ruwe, 2)}${I.ruwe > 1.4 ? ' <span class="dim">(nad obvyklou hranicí 1,4 – astrometrie může být zkreslená, často dvojhvězda)</span>' : ""}`;
    const simbad = `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=${encodeURIComponent(`Gaia DR3 ${I.id}`)}`;
    const far = I.d50 != null && I.d50 > 100 ? '<p class="dim">Medián vzdálenosti je přes 100 pc: katalog bral hvězdy podle paralaxy, takže okraj výběru je neostrý.</p>' : "";
    return `<div class="kind">Hvězda do 100 pc (Gaia)</div>
      <h3>${escapeHtml(s.name)}</h3>
      ${far}
      <dl>
        <dt>Od Slunce</dt><dd>${I.d50 != null ? `${ly(I.d50)} · ${fmtPcFromLy(I.d50 * LY_PER_PC)}${range}` : "–"}</dd>
        ${row("Paralaxa", I.plx != null ? `${fmtNum(I.plx, 2)}${I.ePlx != null ? ` ± ${fmtNum(I.ePlx, 3)}` : ""} mas` : null)}
        ${positionRows(s.pos, s.l, s.b, s.distLy)}
        ${row("Jasnost G", s.g != null ? `${fmtNum(s.g, 1)} mag` : null)}
        ${row("Absolutní G", absG != null ? `${fmtNum(absG, 1)} mag <span class="dim">(Slunce ≈ 4,7)</span>` : null)}
        ${row("Barva BP−RP", s.bprp != null ? `${fmtNum(s.bprp, 2)} mag <span class="dim">(Slunce ≈ 0,8; víc = červenější)</span>` : null)}
        ${row("Bílý trpaslík", wd)}
        ${row("Radiální rychlost", I.rv != null ? `${fmtNum(I.rv, 1)} km/s` : null)}
        ${row("RUWE", ruwe)}
        ${row("Spolehlivost (GCNS)", I.gcns != null ? `${fmtNum(I.gcns * 100, 0)} %` : null)}
      </dl>
      <p><a href="${simbad}" target="_blank" rel="noopener">Hledat v SIMBADu ↗</a></p>
      <div class="src">Poloha a vzdálenost: Gaia Catalogue of Nearby Stars (Gaia Collaboration, Smart et al. 2021, A&amp;A 649, A6),
        astrometrie Gaia EDR3; vzdálenost = medián posteriorního rozdělení z katalogu. Barva bodu na mapě podle BP−RP je jen orientační.
        Katalog stažen ${escapeHtml(this.meta?.stazeno.slice(0, 10) ?? "")}.</div>`;
  }
}
