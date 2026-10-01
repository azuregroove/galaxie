import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Line,
  Points,
  ShaderMaterial,
  Vector3,
  type Texture,
} from "three";
import { Frame } from "../core/coords";
import { PointOctree } from "../core/spatial";
import type { CatalogEntry, MapObject } from "../core/types";
import { LY_PER_PC, escapeHtml, fmtLy, fmtNum, fmtPcFromLy } from "../core/units";
import { seg } from "../scene/overlays";
import type { Stage } from "../scene/stage";
import { positionRows } from "./common";
import { NO_FILTER, passDist, type Facet, type FilterState, type Layer, type SkyPos, type LayerFilter } from "./layer";

type N = number | null;

/** Obecný katalog z pipeline (schema 2), viz pipeline/katalog.py. */
export interface CatalogData {
  schema: 2;
  katalog: string;
  stazeno: string;
  typy: { id: string; nazev: string; barva: string }[];
  metody: string[];
  zdroje: string[];
  pole: { k: string; nazev: string; jednotka?: string; des?: number }[];
  fasety: { id: string; nazev: string; k: string; moznosti: string[] }[];
  objekty: {
    jmeno: string[]; typ: number[]; l: number[]; b: number[]; d: N[]; dm: N[]; dp: N[];
    dmet: N[]; zdroj: N[]; alias: (string | null)[]; vyzn: number[];
    x: Record<string, (number | string | null)[]>;
  };
}

interface Obj extends MapObject {
  typ: number;
  point: number;
}

const LABEL_BUDGET = 24;
// Objekty bez vzdálenosti: kotva na paprsku ze Slunce, ať má přelet a značka kam mířit.
const RAY_ANCHOR_LY = 3000;
const RAY_LEN_LY = 40000;

export class CatalogLayer implements Layer {
  readonly id: string;
  readonly name: string;
  readonly group = new Group();
  readonly objects: Obj[] = [];
  readonly filters: LayerFilter[];
  readonly facets: Facet[];

  private filter = NO_FILTER;
  private vis: BufferAttribute;
  private tree: PointOctree<Obj>;
  private majors: Obj[];
  private nearby: Obj[] = [];
  private frameNo = 0;
  private tmp = new Vector3();
  private ray: Line | null = null;

  private data: CatalogData;
  private meta: CatalogEntry;
  private frame: Frame;
  private css: (n: string) => string;

  constructor(data: CatalogData, meta: CatalogEntry, frame: Frame, glow: Texture, css: (n: string) => string) {
    this.data = data;
    this.meta = meta;
    this.frame = frame;
    this.css = css;
    this.id = data.katalog;
    this.name = meta.nazev.split(" (")[0];
    this.filters = data.typy.map((t) => ({ key: t.id, name: t.nazev, color: t.barva, on: true }));
    const O = data.objekty;
    this.facets = data.fasety.map((f) => {
      const counts = new Array(f.moznosti.length).fill(0);
      O.x[f.k].forEach((v) => typeof v === "number" && counts[v]++);
      return { kind: "checks" as const, id: f.id, name: f.nazev,
        options: f.moznosti.map((label, value) => ({ value, label, count: counts[value] })).filter((o) => o.count > 0) };
    });

    const pts: number[] = [];
    const cols: number[] = [];
    const size: number[] = [];
    const typeCol = data.typy.map((t) => new Color(css(t.barva)));
    for (let i = 0; i < O.jmeno.length; i++) {
      const d = O.d[i];
      const pos = d != null ? frame.toScene(O.l[i], O.b[i], d) : null;
      const point = pos ? pts.length / 3 : -1;
      if (pos) {
        pts.push(pos.x, pos.y, pos.z);
        const c = typeCol[O.typ[i]];
        cols.push(c.r, c.g, c.b);
        size.push(O.vyzn[i] ? 1.4 : 1);
      }
      const t = data.typy[O.typ[i]];
      this.objects.push({
        layer: this.id, index: i, name: O.jmeno[i], pos,
        anchor: pos ?? frame.sun.clone().addScaledVector(Frame.dir(O.l[i], O.b[i]), RAY_ANCHOR_LY),
        distLy: d != null ? d * LY_PER_PC : null,
        color: `var(${t.barva})`,
        aliases: O.alias[i]?.split("; "),
        major: !!O.vyzn[i],
        listOnly: !pos,
        typ: O.typ[i],
        point,
      });
    }
    this.tree = new PointOctree(this.objects.filter((o) => o.pos), (o) => o.pos!);
    this.majors = this.objects.filter((o) => o.major && o.pos);

    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
    g.setAttribute("color", new BufferAttribute(new Float32Array(cols), 3));
    g.setAttribute("size", new BufferAttribute(new Float32Array(size), 1));
    this.vis = new BufferAttribute(new Float32Array(pts.length / 3).fill(1), 1);
    g.setAttribute("vis", this.vis);
    const m = new ShaderMaterial({
      uniforms: { map: { value: glow }, pr: { value: Math.min(devicePixelRatio, 2) } },
      vertexShader: /* glsl */ `
        uniform float pr; attribute float vis; attribute float size; attribute vec3 color; varying vec3 vCol;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = vis > .5 ? clamp(2000. / -mv.z, 3.5, 11.) * size * pr : 0.;
          gl_Position = vis > .5 ? projectionMatrix * mv : vec4(2., 2., 2., 1.); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D map; varying vec3 vCol;
        void main(){
          float r = length(gl_PointCoord - .5);
          float core = 1. - smoothstep(.12, .24, r);
          float a = max(texture2D(map, gl_PointCoord).a * .7, core);
          gl_FragColor = vec4(mix(vCol, vec3(1.), core * .4), a); }`,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const p = new Points(g, m);
    p.frustumCulled = false;
    this.group.add(p);
  }

  setFilter(key: string, on: boolean): void {
    const f = this.filters.find((x) => x.key === key);
    if (f) f.on = on;
    this.refresh();
  }

  applyFilter(f: FilterState): void {
    this.filter = f;
    this.refresh();
  }

  private refresh(): void {
    const X = this.data.objekty.x;
    const active = this.data.fasety.map((f) => [f.k, this.filter.checks[f.id]] as const).filter(([, sel]) => sel);
    const arr = this.vis.array as Float32Array;
    for (const o of this.objects) {
      let v = this.filters[o.typ].on && passDist(o, this.filter);
      for (const [k, sel] of active) {
        const x = X[k][o.index];
        if (typeof x !== "number" || !sel!.includes(x)) v = false;
      }
      o.hidden = !v;
      if (o.point >= 0) arr[o.point] = v ? 1 : 0;
    }
    this.vis.needsUpdate = true;
  }

  update(stage: Stage): void {
    if (this.frameNo++ % 8) return;
    this.nearby = [];
    const vd = stage.viewDistance;
    if (vd > 8000) return;
    const cam = stage.camera.position;
    const cand: [number, Obj][] = [];
    for (const o of this.tree.queryRadius(cam, vd * 1.3)) {
      if (o.hidden) continue;
      this.tmp.copy(o.pos!).project(stage.camera);
      if (this.tmp.z > 1 || Math.abs(this.tmp.x) > 1 || Math.abs(this.tmp.y) > 1) continue;
      cand.push([cam.distanceTo(o.pos!), o]);
    }
    cand.sort((a, b) => a[0] - b[0]);
    this.nearby = cand.slice(0, LABEL_BUDGET).map(([, o]) => o);
  }

  labelCandidates(stage: Stage): MapObject[] {
    const vd = stage.viewDistance;
    const cam = stage.camera.position;
    // Z přehledu celé Galaxie by i jen „významné“ objekty zaplavily obraz; ukazuj je až při bližším pohledu.
    const majors = vd > 25000 ? [] : this.majors.filter((o) => !o.hidden && cam.distanceTo(o.pos!) < vd * 1.2);
    return [...majors, ...this.nearby];
  }

  onSelect(o: MapObject | null): void {
    if (this.ray) {
      this.group.remove(this.ray);
      this.ray.geometry.dispose();
      this.ray = null;
    }
    if (!o || o.layer !== this.id || o.pos) return;
    const O = this.data.objekty;
    const dir = Frame.dir(O.l[o.index], O.b[o.index]);
    const col = this.css(this.data.typy[(o as Obj).typ].barva);
    this.ray = seg(this.frame.sun, this.frame.sun.clone().addScaledVector(dir, RAY_LEN_LY), col, 0.6, true);
    this.group.add(this.ray);
  }

  flyDistance(o: MapObject): number {
    if (!o.pos) return 9000;
    return Math.max(30, Math.min(4000, (o.distLy ?? 100) * 0.35));
  }

  skyPos(mo: MapObject): SkyPos {
    const O = this.data.objekty;
    const i = mo.index;
    const x = O.x;
    const clamp = (v: number) => Math.max(0.08, Math.min(3, v));
    // úhlová velikost (′) u mlhovin, poloměr r50 (pc) u hvězdokup; výřez ~1,6× větší než objekt
    const prumer = x.prumer?.[i];
    if (typeof prumer === "number" && prumer > 0) return { l: O.l[i], b: O.b[i], fovDeg: clamp((prumer / 60) * 1.6) };
    const r = x.r?.[i], d = O.d[i];
    if (typeof r === "number" && d) return { l: O.l[i], b: O.b[i], fovDeg: clamp(((2 * Math.atan(r / d) * 180) / Math.PI) * 4) };
    return { l: O.l[i], b: O.b[i], fovDeg: this.id === "neutronove-hvezdy" ? 0.2 : 0.5 };
  }

  cardHtml(mo: MapObject): string {
    const o = mo as Obj;
    const D = this.data;
    const O = D.objekty;
    const i = o.index;
    const t = D.typy[o.typ];

    let dist = "neznámá (na mapě jen směr)";
    if (o.distLy != null) {
      const lo = O.dm[i], hi = O.dp[i];
      const [a, b] = lo != null && hi != null ? [fmtLy(lo * LY_PER_PC), fmtLy(hi * LY_PER_PC)] : [null, null];
      // nejistota menší než zaokrouhlení by dala „440 ly – 440 ly“
      const range = a && a !== b ? `<br><span class="dim">rozsah ${a} – ${b}</span>` : "";
      dist = `${fmtLy(o.distLy)} · ${fmtPcFromLy(o.distLy)}${range}`;
    }
    const met = O.dmet[i] != null ? D.metody[O.dmet[i]!] : null;
    const rows = D.pole.map((p) => {
      const x = O.x[p.k]?.[i];
      if (x == null || x === "") return "";
      const v = typeof x === "number"
        ? (Math.abs(x) >= 1e6 || (Math.abs(x) < 1e-3 && x !== 0) ? x.toExponential(2).replace(".", ",") : fmtNum(x, p.des ?? 2))
        : escapeHtml(x);
      return `<dt>${escapeHtml(p.nazev)}</dt><dd>${v}${p.jednotka ? ` ${escapeHtml(p.jednotka)}` : ""}</dd>`;
    }).join("");
    const aliases = o.aliases?.length ? `<p class="dim">Též: ${escapeHtml(o.aliases.slice(0, 8).join(", "))}${o.aliases.length > 8 ? " …" : ""}</p>` : "";

    return `<div class="kind" style="color:var(${t.barva})">${escapeHtml(t.nazev)}</div>
      <h3>${escapeHtml(o.name)}</h3>
      ${aliases}
      <dl>
        <dt>Od Slunce</dt><dd>${dist}</dd>
        ${met ? `<dt>Vzdálenost z</dt><dd>${escapeHtml(met)}</dd>` : ""}
        ${positionRows(o.pos, O.l[i], O.b[i], o.distLy)}
        ${rows}
      </dl>
      <div class="src">${O.zdroj[i] != null ? escapeHtml(D.zdroje[O.zdroj[i]!]) : ""}<br>Katalog: ${escapeHtml(this.meta.zdroj)} (stav ${D.stazeno.slice(0, 10)}).</div>`;
  }
}
