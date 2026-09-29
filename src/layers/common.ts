import type { Vector3 } from "three";
import { fmtLy, fmtPcFromLy, signed } from "../core/units";

/** Řádky karty společné všem objektům s polohou: výška nad rovinou, vzdálenost od centra. */
export function positionRows(pos: Vector3 | null, l: number, b: number): string {
  let html = `<dt>Gal. souřadnice</dt><dd>l ${l.toFixed(2)}° · b ${b >= 0 ? "+" : "−"}${Math.abs(b).toFixed(2)}°</dd>`;
  if (pos) {
    const h = pos.y;
    const dGC = pos.length();
    html += `<dt>Výška nad rovinou</dt><dd>${signed(h, fmtLy(Math.abs(h)))} · ${signed(h, fmtPcFromLy(Math.abs(h)))}</dd>
      <dt>Od centra Galaxie</dt><dd>${fmtLy(dGC)} · ${fmtPcFromLy(dGC)}</dd>`;
  }
  return html;
}
