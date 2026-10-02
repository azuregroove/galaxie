import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  NormalBlending,
  Points,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  type Texture,
  Vector3,
} from "three";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtNum, fmtPcFromLy, LY_PER_PC } from "../core/units";
import { positionRows } from "../layers/common";
import type { Layer, SkyPos } from "../layers/layer";
import { loadBytes } from "./dust";
import type { Stage } from "./stage";

export interface PillarsMeta {
  pocet: number;
  soubor: string;
  stazeno: string;
  kodovani: { pc_krat: number };
  stred_pc: [number, number, number];
  vzdalenost_pc: number;
  hvezda: { jmeno: string; l: number; b: number };
  hroty: Record<string, [number, number, number]>;
  naklon_os_deg: number;
  /** těžiště bodů vůči hvězdě (pc) – cíl přeletu a popisku */
  teziste_pc: [number, number, number];
}

/** pc heliocentricky (x k centru, y ke l = 90°, z k severu) → osy scény (ly) */
const toLocal = (x: number, y: number, z: number, out = new Vector3()) =>
  out.set(x * LY_PER_PC, z * LY_PER_PC, -y * LY_PER_PC);

const LOAD_LY = 600;
const SHOW_LY = 1500;
const LABEL_LY = 4000;

/**
 * Sloupy stvoření v M16 jako mračno bodů (pipeline/sloupy.py). Jeden vyhledatelný objekt; body se stáhnou
 * (~0,5 MB) až při přiblížení nebo výběru. Rekonstrukce: obrys ze snímku, hloubky z literatury, zbytek předpoklady.
 */
export class PillarsLayer implements Layer {
  readonly id = "sloupy";
  readonly name = "Sloupy stvoření";
  readonly group = new Group();
  readonly objects: MapObject[];
  readonly filters = [];
  readonly facets = [];

  private readonly obj: MapObject;
  private readonly meta: PillarsMeta;
  private readonly url: string;
  private readonly glowTex: Texture;
  private loaded: Promise<void> | null = null;
  private points: Points<BufferGeometry, ShaderMaterial> | null = null;
  private readonly glow: Sprite;
  private readonly stage: Stage;
  private readonly sun: Vector3;

  constructor(meta: PillarsMeta, dataDir: string, sun: Vector3, glow: Texture, stage: Stage) {
    this.stage = stage;
    this.sun = sun;
    this.meta = meta;
    this.url = dataDir + meta.soubor;
    this.glowTex = glow;
    const [cx, cy, cz] = meta.stred_pc;
    this.group.position.copy(toLocal(cx, cy, cz).add(sun));
    const pos = toLocal(...meta.teziste_pc).add(this.group.position);
    this.obj = {
      layer: this.id, index: 0, name: "Sloupy stvoření", pos, anchor: pos,
      distLy: pos.distanceTo(sun), color: "#d9a066", major: true,
      aliases: ["Pillars of Creation", "Sloupy stvoreni", "M16 sloupy", "Orlí mlhovina – sloupy", "Eagle Nebula pillars"],
    };
    this.objects = [this.obj];
    // ionizující hvězdokupa NGC 6611: jen naznačená záře kolem HD 168076 (střed modelu), ne model oblasti H II
    this.glow = new Sprite(new SpriteMaterial({ map: glow, color: new Color(0x9fc4ff), transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.35 }));
    this.glow.scale.set(5, 5, 1);
    this.glow.visible = false;
    this.group.add(this.glow);
  }

  private async load(): Promise<void> {
    const buf = await loadBytes(this.url);
    const n = this.meta.pocet;
    if (buf.byteLength !== n * 9) throw new Error(`sloupy: čekáno ${n * 9} B, je ${buf.byteLength} B`);
    const q = new Int16Array(buf.buffer, buf.byteOffset, 3 * n);
    const c = buf.subarray(6 * n, 9 * n);
    const k = 1 / this.meta.kodovani.pc_krat;
    const pos = new Float32Array(3 * n), col = new Float32Array(3 * n), v = new Vector3();
    for (let i = 0; i < n; i++) {
      toLocal(q[i] * k, q[n + i] * k, q[2 * n + i] * k, v);
      pos[3 * i] = v.x; pos[3 * i + 1] = v.y; pos[3 * i + 2] = v.z;
      col[3 * i] = c[i] / 255; col[3 * i + 1] = c[n + i] / 255; col[3 * i + 2] = c[2 * n + i] / 255;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("color", new BufferAttribute(col, 3));
    const mat = new ShaderMaterial({
      // rozteč bodů ~0,02 ly; velikost bodu tomu odpovídá, aby plochy splynuly a zdálky nezmizely
      uniforms: { map: { value: this.glowTex }, k: { value: 1 }, fade: { value: 1 } },
      vertexShader: /* glsl */ `
        uniform float k; uniform float fade; attribute vec3 color; varying vec3 vCol; varying float vA;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = clamp(k / -mv.z, 1.2, 9.);
          vA = 0.5 * fade;
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D map; varying vec3 vCol; varying float vA;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vA; if (a < 0.02) discard; gl_FragColor = vec4(vCol, a); }`,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
    });
    this.points = new Points(geo, mat);
    this.points.frustumCulled = false;
    this.group.add(this.points);
  }

  update(stage: Stage): void {
    const d = stage.camera.position.distanceTo(this.obj.anchor);
    if (d < LOAD_LY && !this.loaded) this.loaded = this.load().catch((e) => { console.error(e); this.loaded = null; });
    const show = d < SHOW_LY;
    this.glow.visible = show;
    if (!this.points) return;
    this.points.visible = show;
    const u = this.points.material.uniforms;
    u.k.value = 0.06 * stage.height * Math.min(devicePixelRatio, 2) / (2 * Math.tan((Math.PI / 180) * 25));
    u.fade.value = Math.min(1, Math.max(0, (SHOW_LY - d) / (SHOW_LY * 0.5)));
  }

  onSelect(o: MapObject | null): void {
    if (o === this.obj) this.loaded ??= this.load().catch((e) => { console.error(e); this.loaded = null; });
  }

  setFilter(): void { /* jeden objekt */ }
  applyFilter(): void { /* do filtrů nepatří */ }
  labelCandidates(stage: Stage): MapObject[] {
    return stage.camera.position.distanceTo(this.obj.anchor) < LABEL_LY ? [this.obj] : [];
  }
  kindName(): string { return "struktura v Orlí mlhovině (3D rekonstrukce)"; }
  flyDistance(): number { return 16; }
  detailLabel(): string { return "Pohled ze Země (jako na fotkách) ▸"; }
  openDetail(): void {
    this.stage.flyTo(this.obj.anchor, 16, this.sun.clone().sub(this.obj.anchor).normalize());
  }
  skyPos(): SkyPos { return { l: this.meta.hvezda.l, b: this.meta.hvezda.b, fovDeg: 0.09 }; }

  cardHtml(o: MapObject): string {
    const m = this.meta;
    const tips = Object.entries(m.hroty)
      .map(([k, [x, y, z]]) => `${escapeHtml(k)}: ${fmtNum(Math.hypot(x, y, z), 1)} pc`).join(" · ");
    return `<div class="kind" style="color:#d9a066">Struktura v Orlí mlhovině M16 · 3D rekonstrukce</div>
      <h3>${escapeHtml(o.name)}</h3>
      <p>Prachové sloupy chladného plynu, které z boku „ohlodává“ záření horkých hvězd hvězdokupy NGC 6611.
        Na hrotech se rodí nové hvězdy. Slavné jsou ze snímků Hubbleova (1995, 2014) a Webbova dalekohledu (2022).</p>
      <dl>
        <dt>Od Slunce</dt><dd>${fmtLy(o.distLy!)} · ${fmtPcFromLy(o.distLy!)} <span class="dim">(vzdálenost NGC 6611 v mapě, Hunt &amp; Reffert 2023)</span></dd>
        ${positionRows(o.pos, m.hvezda.l, m.hvezda.b, o.distLy)}
        <dt>Hroty sloupů</dt><dd>${tips}<br><span class="dim">vůči ${escapeHtml(m.hvezda.jmeno)} (O5 V, hlavní zdroj záření)</span></dd>
      </dl>
      <p class="dim"><b>Co je z dat a co odhad:</b> obrys na obloze je vyříznutý ze snímku Pan-STARRS DR1. Pořadí sloupů podél
        zorného paprsku (P1 horní část za hvězdami, ostatní před nimi) je z McLeod et al. 2015 a Karim et al. 2023,
        vzdálenosti hrotů od roviny hvězdokupy ze Sofue 2020. Sklon sloupů (${fmtNum(m.naklon_os_deg, 0)}°) a jejich tloušťka
        (válec) jsou předpoklady, protože skutečné hodnoty měření neurčují. Barvy jsou ilustrativní.</p>
      <div class="src">McLeod A.F. et al. 2015, MNRAS (doi:10.1093/mnras/stv680); Sofue Y. 2020, MNRAS 492, 5966;
        Karim R.L. et al. 2023, AJ (doi:10.3847/1538-3881/acff6c); snímek Pan-STARRS DR1 přes CDS hips2fits.
        Model sestaven ${escapeHtml(m.stazeno.slice(0, 10))}.</div>`;
  }
}
