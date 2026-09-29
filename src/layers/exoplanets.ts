import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Points,
  ShaderMaterial,
  Vector3,
  type Texture,
} from "three";
import type { Frame } from "../core/coords";
import { PointOctree } from "../core/spatial";
import type { MapObject } from "../core/types";
import { LY_PER_PC, escapeHtml, fmtLy, fmtNum, fmtPcFromLy } from "../core/units";
import type { Stage } from "../scene/stage";
import { positionRows } from "./common";
import { NO_FILTER, passDist, type Facet, type FilterState, type Layer, type LayerFilter } from "./layer";

type N = number | null;
export interface ExoData {
  stazeno: string;
  ciselniky: { metoda: string[]; metoda_cz: string[]; zarizeni: string[] };
  systemy: {
    jmeno: string[]; l: number[]; b: number[]; d: N[]; dp: N[]; dm: N[]; sp: (string | null)[];
    teff: N[]; rs: N[]; ms: N[]; vmag: N[]; np: number[];
  };
  planety: {
    sys: number[]; jmeno: string[]; r: N[]; m: N[]; p: N[]; a: N[]; teq: N[]; rok: N[];
    metoda: N[]; zarizeni: N[]; sporna: number[];
  };
}

const MAJOR = new Set(["TRAPPIST-1", "51 Peg", "Proxima Cen", "TOI-700", "Kepler-186", "Kepler-452",
  "HD 209458", "eps Eri", "tau Cet", "Kepler-90", "55 Cnc", "GJ 1214", "WASP-12", "KELT-9"]);
const LABEL_BUDGET = 40;

interface Sys extends MapObject {
  planets: number[];
  /** index bodu v geometrii, −1 = bez vzdálenosti */
  point: number;
}

export class ExoplanetLayer implements Layer {
  readonly id = "exoplanety";
  readonly name = "Exoplanety";
  readonly group = new Group();
  readonly objects: Sys[] = [];
  readonly filters: LayerFilter[] = [{ key: "all", name: "Exoplanety", color: "--exo", on: true }];
  readonly facets: Facet[];
  private filter = NO_FILTER;
  private vis: BufferAttribute;
  private nearby: Sys[] = [];
  private majors: Sys[] = [];
  private tree: PointOctree<Sys>;
  private frameNo = 0;
  private tmp = new Vector3();

  private data: ExoData;

  constructor(data: ExoData, frame: Frame, glow: Texture, css: (n: string) => string) {
    this.data = data;
    const S = data.systemy;
    const planetsOf: number[][] = S.jmeno.map(() => []);
    data.planety.sys.forEach((s, i) => planetsOf[s].push(i));

    const pts: number[] = [];
    for (let i = 0; i < S.jmeno.length; i++) {
      const d = S.d[i];
      const pos = d != null ? frame.toScene(S.l[i], S.b[i], d) : null;
      const point = pos ? pts.length / 3 : -1;
      if (pos) pts.push(pos.x, pos.y, pos.z);
      this.objects.push({
        layer: this.id, index: i, name: S.jmeno[i], pos,
        anchor: pos ?? frame.sun.clone(),
        distLy: d != null ? d * LY_PER_PC : null,
        color: "var(--exo)",
        aliases: planetsOf[i].map((p) => data.planety.jmeno[p]),
        major: MAJOR.has(S.jmeno[i]),
        planets: planetsOf[i],
        point,
      });
    }

    this.tree = new PointOctree(this.objects.filter((o) => o.pos), (o) => o.pos!);
    this.majors = this.objects.filter((o) => o.major);

    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
    this.vis = new BufferAttribute(new Float32Array(pts.length / 3).fill(1), 1);
    g.setAttribute("vis", this.vis);

    const P = data.planety;
    const count = (arr: N[], n: number) => {
      const c = new Array(n).fill(0);
      arr.forEach((x) => x != null && c[x]++);
      return c;
    };
    const mc = count(P.metoda, data.ciselniky.metoda_cz.length);
    const years = P.rok.filter((x): x is number => x != null);
    this.facets = [
      { kind: "checks", id: "metoda", name: "Metoda objevu",
        options: data.ciselniky.metoda_cz.map((label, value) => ({ value, label, count: mc[value] }))
          .filter((o) => o.count > 0).sort((a, b) => b.count - a.count) },
      { kind: "range", id: "rok", name: "Rok objevu", min: Math.min(...years), max: Math.max(...years) },
    ];
    const m = new ShaderMaterial({
      uniforms: {
        map: { value: glow },
        color: { value: new Color(css("--exo")) },
        pr: { value: Math.min(devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        uniform float pr; attribute float vis;
        void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = vis > .5 ? clamp(2000. / -mv.z, 4., 12.) * pr : 0.;
          gl_Position = vis > .5 ? projectionMatrix * mv : vec4(2., 2., 2., 1.); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D map; uniform vec3 color;
        void main(){
          float r = length(gl_PointCoord - .5);
          float core = 1. - smoothstep(.14, .26, r);
          float a = max(texture2D(map, gl_PointCoord).a * .85, core);
          gl_FragColor = vec4(mix(color, vec3(1.), core * .5), a); }`,
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

  /** Systém je vidět, když projde vzdáleností a aspoň jedna jeho planeta ostatními filtry. */
  private planetPasses(p: number): boolean {
    const f = this.filter;
    const met = f.checks.metoda;
    const yr = f.ranges.rok;
    const P = this.data.planety;
    if (met && (P.metoda[p] == null || !met.includes(P.metoda[p]!))) return false;
    if (yr && (P.rok[p] == null || P.rok[p]! < yr[0] || P.rok[p]! > yr[1])) return false;
    return true;
  }

  private get planetFilterOn(): boolean {
    return !!(this.filter.checks.metoda || this.filter.ranges.rok);
  }

  private refresh(): void {
    const on = this.filters[0].on;
    const pf = this.planetFilterOn;
    const arr = this.vis.array as Float32Array;
    for (const o of this.objects) {
      const v = on && passDist(o, this.filter) && (!pf || o.planets.some((p) => this.planetPasses(p)));
      o.hidden = !v;
      if (o.point >= 0) arr[o.point] = v ? 1 : 0;
    }
    this.vis.needsUpdate = true;
    this.group.visible = on;
  }

  update(stage: Stage): void {
    // Výběr nejbližších systémů pro popisky stačí přepočítat jednou za pár snímků.
    if (this.frameNo++ % 8) return;
    this.nearby = [];
    const vd = stage.viewDistance;
    if (vd > 4000 || !this.group.visible) return;
    const cam = stage.camera.position;
    const cand: [number, Sys][] = [];
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
    if (!this.group.visible) return [];
    const majors = stage.viewDistance < 3000 ? this.majors.filter((o) => !o.hidden) : [];
    return [...majors, ...this.nearby];
  }

  flyDistance(o: MapObject): number {
    return Math.max(40, Math.min(500, (o.distLy ?? 100) * 0.6));
  }

  cardHtml(mo: MapObject): string {
    const o = mo as Sys;
    const S = this.data.systemy;
    const P = this.data.planety;
    const C = this.data.ciselniky;
    const i = o.index;
    const v = (x: N, frac = 2, unit = "") => (x == null ? "–" : `${fmtNum(x, frac)}${unit}`);

    let dist = "neznámá";
    if (o.distLy != null) {
      const ep = S.dp[i], em = S.dm[i];
      const err = ep != null && em != null
        ? (Math.abs(ep - em) < 0.01 * Math.max(ep, em, 1e-9) ? ` ± ${fmtLy(ep * LY_PER_PC)}` : ` (+${fmtLy(ep * LY_PER_PC)} / −${fmtLy(em * LY_PER_PC)})`)
        : "";
      dist = `${fmtLy(o.distLy)}${err}<br>${fmtPcFromLy(o.distLy)}`;
    }

    const rows = o.planets.map((p) => {
      const met = P.metoda[p] != null ? C.metoda_cz[P.metoda[p]!] : "–";
      const faci = P.zarizeni[p] != null ? C.zarizeni[P.zarizeni[p]!] : "";
      const cls = [P.sporna[p] ? "disputed" : "", this.planetFilterOn && !this.planetPasses(p) ? "filtered" : ""].filter(Boolean).join(" ");
      return `<tr${cls ? ` class="${cls}"` : ""}${P.sporna[p] ? ' title="Existence planety je sporná (pl_controv_flag)"' : ""}>
        <th scope="row">${escapeHtml(P.jmeno[p])}${P.sporna[p] ? " ⚠" : ""}</th>
        <td>${v(P.r[p], 2)}</td><td>${v(P.m[p], 1)}</td><td>${v(P.p[p], 2)}</td><td>${v(P.a[p], 3)}</td>
        <td>${v(P.teq[p], 0)}</td><td title="${escapeHtml(faci)}">${P.rok[p] ?? "–"}<br><span class="dim">${met}</span></td></tr>`;
    }).join("");

    const star = [S.sp[i] ? `typ ${escapeHtml(S.sp[i]!)}` : null,
      S.teff[i] != null ? `${fmtNum(S.teff[i]!, 0)} K` : null,
      S.rs[i] != null ? `${fmtNum(S.rs[i]!, 2)} R☉` : null,
      S.ms[i] != null ? `${fmtNum(S.ms[i]!, 2)} M☉` : null].filter(Boolean).join(" · ") || "–";

    return `<div class="kind" style="color:var(--exo)">Planetární systém · ${o.planets.length} ${plural(o.planets.length)}</div>
      <h3>${escapeHtml(o.name)}</h3>
      <dl>
        <dt>Od Slunce</dt><dd>${dist}</dd>
        <dt>Hvězda</dt><dd>${star}</dd>
        ${S.vmag[i] != null ? `<dt>Jasnost V</dt><dd>${fmtNum(S.vmag[i]!, 2)} mag</dd>` : ""}
        ${positionRows(o.pos, S.l[i], S.b[i])}
      </dl>
      <div class="tablewrap"><table class="planets">
        <thead><tr><th>Planeta</th><th title="poloměr v poloměrech Země">R⊕</th><th title="hmotnost v hmotnostech Země (nebo M·sin i)">M⊕</th>
        <th title="oběžná doba ve dnech">P [d]</th><th title="velká poloosa">a [au]</th><th title="rovnovážná teplota">T [K]</th><th>Objev</th></tr></thead>
        <tbody>${rows}</tbody></table></div>
      <div class="src">Data: NASA Exoplanet Archive, PSCompPars (stav ${this.data.stazeno.slice(0, 10)}). Parametry mohou pocházet z různých publikací.
      Poloha: RA/Dec → l, b (astropy), vzdálenost sy_dist.</div>`;
  }
}

function plural(n: number): string {
  return n === 1 ? "planeta" : n >= 2 && n <= 4 ? "planety" : "planet";
}
