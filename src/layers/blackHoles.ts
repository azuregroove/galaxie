import { Color, Group, Mesh, MeshBasicMaterial, SphereGeometry, Sprite, Vector3, type Object3D } from "three";
import { Frame } from "../core/coords";
import type { MapObject } from "../core/types";
import { LY_PER_PC, escapeHtml, fmtPcFromLy } from "../core/units";
import { circle, glowSprite, seg } from "../scene/overlays";
import type { Stage } from "../scene/stage";
import { positionRows } from "./common";
import { NO_FILTER, passDist, type Facet, type FilterState, type Layer, type LayerFilter } from "./layer";

export interface BlackHoleData {
  objekty: {
    jmeno: string[]; l: number[]; b: number[]; d: (number | null)[]; dl: string[]; ml: string[];
    m: number[]; t: string[]; s: string[]; no: string[]; src: string[];
  };
}

const TYPES: Record<string, { name: string; c: string }> = {
  rtg: { name: "Rentgenová dvojhvězda", c: "--rtg" },
  spici: { name: "Spící (průvodce)", c: "--spici" },
  cocka: { name: "Mikročočka, osamělá", c: "--cocka" },
  imbh: { name: "Střední hmotnosti", c: "--imbh" },
  smbh: { name: "Supermasivní (centrum)", c: "--smbh" },
};

const SRC: Record<string, string> = {
  wiki: "Poloha: souřadnice RA/Dec z Wikipedie.",
  j2000name: "Poloha: odvozena z označení J2000 (přesnost cca 0,1–1°).",
  b1950name: "Poloha: odvozena z označení B1950, přepočtena na J2000.",
  galname: "Poloha: z galaktického označení GX.",
  memory: "Poloha: z paměti, neověřeno.",
};

const MAJOR = new Set(["Gaia BH1", "Gaia BH3", "Cygnus X-1", "GRS 1915+105", "Sagittarius A*",
  "Omega Centauri (IMBH)", "A0620-00 (V616 Mon)", "V404 Cygni"]);
const UP = new Vector3(0, 1, 0);

interface BH extends MapObject {
  t: string; l: number; b: number; dl: string; ml: string; m: number; s: string; no: string; src: string;
  parts: Object3D[]; spr?: Sprite; base: number;
}

export class BlackHoleLayer implements Layer {
  readonly id = "cerne-diry";
  readonly name = "Černé díry";
  readonly group = new Group();
  readonly objects: BH[] = [];
  readonly filters: LayerFilter[] = Object.entries(TYPES).map(([key, t]) => ({ key, name: t.name, color: t.c, on: true }));
  readonly facets: Facet[] = [];
  private filter = NO_FILTER;

  constructor(data: BlackHoleData, frame: Frame, stage: Stage, css: (n: string) => string) {
    const o = data.objekty;
    for (let i = 0; i < o.jmeno.length; i++) {
      const t = o.t[i];
      const col = new Color(css(TYPES[t].c));
      const dPc = o.d[i];
      const dir = Frame.dir(o.l[i], o.b[i]);
      const pos = dPc != null ? frame.toScene(o.l[i], o.b[i], dPc) : null;
      const anchor = pos ?? frame.sun.clone().addScaledVector(dir, 12000);
      const parts: Object3D[] = [];
      const base = t === "smbh" ? 900 : t === "imbh" ? 520 : 160 + Math.log10(o.m[i] + 1) * 170;
      let spr: Sprite | undefined;
      if (pos) {
        spr = glowSprite(stage, col, base);
        spr.position.copy(pos);
        const core = new Mesh(new SphereGeometry(base * 0.09, 12, 12), new MeshBasicMaterial({ color: 0x000000 }));
        core.position.copy(pos);
        const foot = new Vector3(pos.x, 0, pos.z);
        parts.push(spr, core, seg(pos, foot, col, 0.45), circle(foot, 90, UP, col, 0.6, 24));
      } else {
        parts.push(seg(frame.sun, frame.sun.clone().addScaledVector(dir, 40000), col, 0.55, true));
      }
      parts.forEach((p) => this.group.add(p));
      this.objects.push({
        layer: this.id, index: i, name: o.jmeno[i], pos, anchor,
        distLy: dPc != null ? dPc * LY_PER_PC : null, color: `var(${TYPES[t].c})`,
        major: MAJOR.has(o.jmeno[i]),
        t, l: o.l[i], b: o.b[i], dl: o.dl[i], ml: o.ml[i], m: o.m[i], s: o.s[i], no: o.no[i], src: o.src[i],
        parts, spr, base,
      });
    }
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
    for (const o of this.objects) {
      const v = this.filters.find((x) => x.key === o.t)!.on && passDist(o, this.filter);
      o.hidden = !v;
      o.parts.forEach((p) => (p.visible = v));
    }
  }

  labelCandidates(stage: Stage): MapObject[] {
    const vd = stage.viewDistance;
    const cam = stage.camera.position;
    const near = (o: BH) => vd < 30000 && cam.distanceTo(o.anchor) < vd * 1.1;
    return this.objects.filter((o) => !o.hidden && (o.major || near(o)))
      .sort((a, b) => Number(!!b.major) - Number(!!a.major) || cam.distanceTo(a.anchor) - cam.distanceTo(b.anchor));
  }

  flyDistance(o: MapObject): number {
    return (o as BH).t === "smbh" ? 9000 : 3500;
  }

  update(stage: Stage): void {
    for (const o of this.objects) {
      if (!o.spr || !o.pos) continue;
      const d = stage.camera.position.distanceTo(o.pos);
      const s = Math.max(o.base, d * 0.012 * (o.t === "smbh" ? 2 : 1));
      o.spr.scale.set(s, s, 1);
    }
  }

  cardHtml(mo: MapObject): string {
    const o = mo as BH;
    const T = TYPES[o.t];
    return `<div class="kind" style="color:var(${T.c})">Černá díra · ${T.name}</div>
      <h3>${escapeHtml(o.name)}</h3>
      <dl>
        <dt>Od Slunce</dt><dd>${o.distLy ? `${o.dl} ly<br>${fmtPcFromLy(o.distLy)}` : "neznámá"}</dd>
        <dt>Hmotnost</dt><dd>${o.ml} M☉</dd>
        <dt>Status</dt><dd>${o.s}</dd>
        ${positionRows(o.pos, o.l, o.b)}
      </dl>
      <p>${escapeHtml(o.no)}</p>
      <div class="src">${SRC[o.src] ?? ""}</div>`;
  }
}
