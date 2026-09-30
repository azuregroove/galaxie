import { Vector3 } from "three";
import { LY_PER_PC } from "./units";

/**
 * Scéna je v ly. Centrum Galaxie v počátku, Slunce v (−R0, 0, 0).
 * +X míří od Slunce k centru, +Y k severnímu galaktickému pólu, −Z ke směru l = 90°.
 * Slunce leží v rovině (skutečných ~20 pc nad rovinou zatím zanedbáváme).
 */
export class Frame {
  readonly r0Ly: number;
  readonly sun: Vector3;

  constructor(r0Pc: number) {
    this.r0Ly = r0Pc * LY_PER_PC;
    this.sun = new Vector3(-this.r0Ly, 0, 0);
  }

  static dir(lDeg: number, bDeg: number): Vector3 {
    const L = (lDeg * Math.PI) / 180;
    const B = (bDeg * Math.PI) / 180;
    return new Vector3(Math.cos(B) * Math.cos(L), Math.sin(B), -Math.cos(B) * Math.sin(L));
  }

  /** Heliocentrické (l, b, d v pc) -> bod scény v ly. */
  toScene(lDeg: number, bDeg: number, dPc: number, out = new Vector3()): Vector3 {
    return out.copy(this.sun).addScaledVector(Frame.dir(lDeg, bDeg), dPc * LY_PER_PC);
  }
}

// Matice z galaktických do ICRS (transpozice A_G, Hipparcos 1997); proti astropy ověřeno na 0,02″.
const G2E = [
  [-0.0548755604162154, 0.4941094278755837, -0.8676661490190047],
  [-0.8734370902348850, -0.4448296299600112, -0.1980763734312015],
  [-0.4838350155487132, 0.7469822444972189, 0.4559837761750669],
];

/** Galaktické (l, b) → rovníkové ICRS (RA, Dec), vše ve stupních. */
export function galToIcrs(lDeg: number, bDeg: number): [number, number] {
  const L = (lDeg * Math.PI) / 180, B = (bDeg * Math.PI) / 180;
  const g = [Math.cos(B) * Math.cos(L), Math.cos(B) * Math.sin(L), Math.sin(B)];
  const e = G2E.map((r) => r[0] * g[0] + r[1] * g[1] + r[2] * g[2]);
  const ra = ((Math.atan2(e[1], e[0]) * 180) / Math.PI + 360) % 360;
  return [ra, (Math.asin(Math.max(-1, Math.min(1, e[2]))) * 180) / Math.PI];
}
