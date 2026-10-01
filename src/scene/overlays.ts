import {
  AdditiveBlending,
  BufferGeometry,
  CircleGeometry,
  DoubleSide,
  Group,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  Mesh,
  MeshBasicMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
  type ColorRepresentation,
} from "three";
import { Frame } from "../core/coords";
import { fmtLy, fmtPcFromLy } from "../core/units";
import type { Label, Labels } from "../ui/labels";
import { DISK_R } from "./backdrop";
import type { Stage } from "./stage";

const UP = new Vector3(0, 1, 0);

export function circle(center: Vector3, radius: number, normal: Vector3, color: ColorRepresentation,
  opacity: number, seg = 160, dashed = false): Line {
  const pts: Vector3[] = [];
  const n = normal.clone().normalize();
  const a = Math.abs(n.y) < 0.99 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0);
  const u = new Vector3().crossVectors(n, a).normalize();
  const v = new Vector3().crossVectors(n, u);
  for (let i = 0; i <= seg; i++) {
    const t = (i / seg) * Math.PI * 2;
    pts.push(center.clone().addScaledVector(u, Math.cos(t) * radius).addScaledVector(v, Math.sin(t) * radius));
  }
  const g = new BufferGeometry().setFromPoints(pts);
  const m = dashed
    ? new LineDashedMaterial({ color, transparent: true, opacity, dashSize: radius * 0.03, gapSize: radius * 0.02, depthWrite: false })
    : new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
  const l = new Line(g, m);
  if (dashed) l.computeLineDistances();
  return l;
}

export function seg(a: Vector3, b: Vector3, color: ColorRepresentation, opacity: number, dashed = false): Line {
  const g = new BufferGeometry().setFromPoints([a, b]);
  const len = a.distanceTo(b);
  const m = dashed
    ? new LineDashedMaterial({ color, transparent: true, opacity, dashSize: len * 0.01, gapSize: len * 0.0075, depthWrite: false })
    : new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
  const l = new Line(g, m);
  if (dashed) l.computeLineDistances();
  return l;
}

export function glowSprite(stage: Stage, color: ColorRepresentation, size: number): Sprite {
  const s = new Sprite(new SpriteMaterial({ map: stage.glow, color, transparent: true, depthWrite: false, blending: AdditiveBlending }));
  s.scale.set(size, size, 1);
  return s;
}

export type OverlayKey = "rings" | "ecl" | "dims" | "grid";

/** Kruhy vzdáleností, rovina ekliptiky, rozměry Galaxie, galaktocentrická mřížka, Slunce. */
export class Overlays {
  readonly groups: Record<OverlayKey, Group> = { rings: new Group(), ecl: new Group(), dims: new Group(), grid: new Group() };
  readonly show: Record<OverlayKey, boolean> = { rings: true, ecl: true, dims: true, grid: true };
  readonly sunLabel: Label;

  constructor(stage: Stage, frame: Frame, labels: Labels, css: (n: string) => string) {
    const { scene } = stage;
    const SUN = frame.sun;
    Object.values(this.groups).forEach((g) => scene.add(g));

    // galaktocentrická mřížka
    for (let r = 10000; r <= 50000; r += 10000) this.groups.grid.add(circle(new Vector3(), r, UP, 0x3b4a70, 0.35, 200));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      this.groups.grid.add(seg(new Vector3(Math.cos(a) * 2000, 0, Math.sin(a) * 2000),
        new Vector3(Math.cos(a) * 50000, 0, Math.sin(a) * 50000), 0x3b4a70, 0.18));
    }

    // kruhy kolem Slunce v galaktické rovině; popisek jen když má kruh na obrazovce rozumnou velikost
    [10, 50, 100, 500, 1000, 5000, 10000, 20000, 40000].forEach((r) => {
      this.groups.rings.add(circle(SUN, r, UP, 0x8fb4ff, 0.35, 180, true));
      labels.add(`${fmtLy(r)} · ${fmtPcFromLy(r)}`, SUN.clone().add(new Vector3(0, 0, r)), "ring", () => {
        const vd = stage.viewDistance;
        return this.show.rings && r > vd * 0.08 && r < vd * 1.6;
      }, 100);
    });
    [0, 90, 180, 270].forEach((l) => {
      const d = Frame.dir(l, 0);
      this.groups.rings.add(seg(SUN.clone().addScaledVector(d, 300), SUN.clone().addScaledVector(d, 5200), 0x8fb4ff, 0.3));
      labels.add(`l = ${l}°`, SUN.clone().addScaledVector(d, 5800), "anno", () => this.show.rings && stage.viewDistance > 6000);
    });

    // rovina ekliptiky: jen orientace, velikost se přizpůsobuje přiblížení (sev. pól ekliptiky l=96,385°, b=29,806°)
    const NEP = Frame.dir(96.385, 29.806);
    const ecl = this.groups.ecl;
    ecl.position.copy(SUN);
    const R = 1;
    const disk = new Mesh(new CircleGeometry(R, 96),
      new MeshBasicMaterial({ color: css("--ecl"), transparent: true, opacity: 0.07, side: DoubleSide, depthWrite: false }));
    disk.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), NEP);
    ecl.add(disk, circle(new Vector3(), R, NEP, css("--ecl"), 0.8), seg(new Vector3(), NEP.clone().multiplyScalar(0.9), css("--ecl"), 0.7));
    const eclNear = () => this.show.ecl && stage.camera.position.distanceTo(SUN) < 30000;
    const eclLbl = labels.add("Rovina ekliptiky · sklon 60,2° ke galaktické rovině", new Vector3(), "ecl", eclNear);
    const nepLbl = labels.add("sev. pól ekliptiky", new Vector3(), "ecl", eclNear);
    stage.onFrame(() => {
      const s = Math.min(2000, Math.max(0.05, stage.camera.position.distanceTo(SUN) * 0.12));
      ecl.scale.setScalar(s);
      eclLbl.pos.copy(SUN).addScaledVector(NEP, -0.3 * s).add(new Vector3(0, -0.55 * s, 0));
      nepLbl.pos.copy(SUN).addScaledVector(NEP, 1.0 * s);
    });

    // rozměry Galaxie
    const dims = this.groups.dims;
    const c = 0x9aa8c8;
    const zOff = -DISK_R - 3000;
    dims.add(seg(new Vector3(-DISK_R, 0, zOff), new Vector3(DISK_R, 0, zOff), c, 0.7));
    dims.add(seg(new Vector3(-DISK_R, 0, zOff - 1200), new Vector3(-DISK_R, 0, zOff + 1200), c, 0.7));
    dims.add(seg(new Vector3(DISK_R, 0, zOff - 1200), new Vector3(DISK_R, 0, zOff + 1200), c, 0.7));
    const far = () => this.show.dims && stage.viewDistance > 20000;
    labels.add("průměr disku ≈ 87 400 ly · 26,8 kpc", new Vector3(0, 0, zOff - 2500), "anno", far);
    const x = DISK_R + 4000, thin = 1100 / 2, thick = 8500 / 2;
    dims.add(seg(new Vector3(x, -thin, 0), new Vector3(x, thin, 0), 0xcfd8ff, 0.9));
    [-thin, thin].forEach((y) => dims.add(seg(new Vector3(x - 600, y, 0), new Vector3(x + 600, y, 0), 0xcfd8ff, 0.9)));
    dims.add(seg(new Vector3(x + 2500, -thick, 0), new Vector3(x + 2500, thick, 0), c, 0.5, true));
    [-thick, thick].forEach((y) => dims.add(seg(new Vector3(x + 1900, y, 0), new Vector3(x + 3100, y, 0), c, 0.5)));
    // tloušťka disku je čitelná jen při pohledu z boku
    const edgeOn = () => far() && Math.abs(stage.camera.position.clone().sub(stage.controls.target).normalize().y) < 0.5;
    labels.add("tenký disk ≈ 700–1 500 ly · 220–450 pc", new Vector3(x, thin + 900, 0), "anno", edgeOn);
    labels.add("tlustý disk ≈ 8 500 ly · 2,6 kpc", new Vector3(x + 2500, thick + 900, 0), "anno", edgeOn);
    labels.add("ramena: model Reid et al. 2019", new Vector3(DISK_R * 0.55, 0, DISK_R * 0.62), "anno", far);

    // Slunce: velikost záře konstantní na obrazovce
    const sun = glowSprite(stage, css("--sun"), 1);
    sun.position.copy(SUN);
    scene.add(sun);
    this.sunLabel = labels.add("Slunce", SUN, "sun", () => true, 900);
    stage.onFrame(() => sun.scale.setScalar(stage.camera.position.distanceTo(SUN) * 0.02));
  }

  toggle(k: OverlayKey): boolean {
    this.show[k] = !this.show[k];
    this.groups[k].visible = this.show[k];
    return this.show[k];
  }
}
