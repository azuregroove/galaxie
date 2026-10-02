import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  Points,
  PointsMaterial,
  LineBasicMaterial,
  LineSegments,
  type Scene,
  Vector3,
} from "three";
import { Frame } from "../core/coords";
import { LY_PER_PC } from "../core/units";
import type { Labels } from "../ui/labels";

interface LocalData {
  vlna: { data: [number, number, number, number][] };
  bublina: { krok_deg: number; d: (number | null)[][] };
}

/** Body heliocentricky v pc (x k centru, y ke l = 90°, z k severu) → scéna v ly. */
const toScene = (sun: Vector3, x: number, y: number, z: number) =>
  new Vector3(sun.x + x * LY_PER_PC, sun.y + z * LY_PER_PC, sun.z - y * LY_PER_PC);

/**
 * Radcliffeova vlna (model Konietzka et al. 2024) a obálka Místní bubliny (O'Neill et al. 2024) – pipeline/okoli.py.
 * Vlna je čára barvená svislou rychlostí (modrá dolů, červená nahoru), bublina řídká síť poledníků a rovnoběžek.
 */
export class LocalStructures {
  private group = new Group();
  private on = false;
  private loaded: Promise<void> | null = null;

  private readonly url: string;
  private readonly sun: Vector3;
  private readonly labels: Labels;

  constructor(url: string, scene: Scene, sun: Vector3, labels: Labels, button: HTMLButtonElement) {
    this.url = url;
    this.sun = sun;
    this.labels = labels;
    this.group.visible = false;
    scene.add(this.group);
    button.onclick = async () => {
      this.on = !this.on;
      button.setAttribute("aria-pressed", String(this.on));
      button.textContent = this.on ? "Okolí: zap" : "Okolí: vyp";
      try {
        this.loaded ??= this.load();
        await this.loaded;
        this.group.visible = this.on;
      } catch (e) {
        console.error(e);
        this.loaded = null;
        button.textContent = "Okolí: chyba načtení";
      }
    };
  }

  private async load(): Promise<void> {
    const r = await fetch(this.url);
    if (!r.ok) throw new Error(`okoli.json: HTTP ${r.status}`);
    const d = (await r.json()) as LocalData;
    this.group.add(this.wave(d.vlna.data), this.bubble(d.bublina.krok_deg, d.bublina.d));
    // popisky na skutečných bodech: střed vlny, obálka nad Sluncem ve směru l = 90°, b ≈ +30°
    const [x, y, z] = d.vlna.data[Math.floor(d.vlna.data.length / 2)];
    this.labels.add("Radcliffeova vlna", toScene(this.sun, x, y, z), "anno", () => this.on, 150);
    const step = d.bublina.krok_deg, j = Math.floor((90 + 30) / step), i = Math.floor(90 / step), rb = d.bublina.d[j][i];
    if (rb != null) this.labels.add("Místní bublina", Frame.dir((i + 0.5) * step, -90 + (j + 0.5) * step)
      .multiplyScalar(rb * LY_PER_PC).add(this.sun), "anno", () => this.on, 150);
  }

  private wave(pts: [number, number, number, number][]): Group {
    const pos: number[] = [], col: number[] = [];
    const down = new Color(0x5aa0ff), up = new Color(0xff6a8a), c = new Color();
    for (const [x, y, z, vz] of pts) {
      const p = toScene(this.sun, x, y, z);
      pos.push(p.x, p.y, p.z);
      c.lerpColors(down, up, Math.min(1, Math.max(0, (vz + 15) / 30)));
      col.push(c.r, c.g, c.b);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("color", new Float32BufferAttribute(col, 3));
    // čára 1 px se v hustém okolí Slunce ztrácí – podél ní ještě body pevné velikosti
    const w = new Group();
    w.add(new Line(g, new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false })),
      new Points(g, new PointsMaterial({ vertexColors: true, size: 4, sizeAttenuation: false, transparent: true, opacity: 0.8,
        blending: AdditiveBlending, depthWrite: false })));
    return w;
  }

  private bubble(step: number, d: (number | null)[][]): LineSegments {
    const nb = d.length, nl = d[0].length;
    const at = (j: number, i: number) => {
      const r = d[j][(i + nl) % nl];
      return r == null ? null : Frame.dir((((i + nl) % nl) + 0.5) * step, -90 + (j + 0.5) * step)
        .multiplyScalar(r * LY_PER_PC).add(this.sun);
    };
    const pos: number[] = [];
    const seg = (a: Vector3 | null, b: Vector3 | null) => {
      if (a && b) pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    };
    // rovnoběžky po 12°, poledníky po 24° (každá 3., resp. 6. buňka)
    for (let j = 1; j < nb - 1; j += 3) for (let i = 0; i < nl; i++) seg(at(j, i), at(j, i + 1));
    for (let i = 0; i < nl; i += 6) for (let j = 0; j < nb - 1; j++) seg(at(j, i), at(j + 1, i));
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    return new LineSegments(g, new LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.35,
      blending: AdditiveBlending, depthWrite: false }));
  }
}
