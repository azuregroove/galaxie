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
