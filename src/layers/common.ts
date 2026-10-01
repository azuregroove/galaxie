import type { Vector3 } from "three";
import { fmtLy, fmtNum, fmtPcFromLy, signed } from "../core/units";

// Světelný rok = juliánský rok × c (IAU), přesně 9 460 730 472 580,8 km.
const KM_PER_LY = 9460730472580.8;
const SEC_PER_YEAR = 365.25 * 86400;
// Voyager 1 vůči Slunci 16,92 km/s – JPL Horizons, vektory k 1. 10. 2026 (pipeline: ruční dotaz, viz ZDROJE.md).
const TRIP: [string, number][] = [["světlo", 0], ["sonda Voyager 1 (16,9 km/s)", 16.92], ["letadlo (900 km/h)", 900 / 3600], ["auto (100 km/h)", 100 / 3600]];

/** Doba v letech česky a čitelně: „4,2 roku“, „73 tis. let“, „1,2 mil. let“. */
export function fmtYears(y: number): string {
  if (y < 1 / 12) return `${fmtNum(y * 365.25, 0)} dní`;
  if (y < 1) return `${fmtNum(y * 12, 0)} měsíců`;
  const big = (v: number, u: string) => `${fmtNum(v, v < 10 ? 1 : 0)} ${u} let`;
  if (y >= 1e9) return big(y / 1e9, "mld.");
  if (y >= 1e6) return big(y / 1e6, "mil.");
  if (y >= 1e4) return big(y / 1e3, "tis.");
  const n = y < 10 ? Math.round(y * 10) / 10 : Math.round(y);
  const word = n === 1 ? "rok" : n >= 2 && n <= 4 && Number.isInteger(n) ? "roky" : Number.isInteger(n) ? "let" : "roku";
  return `${fmtNum(n, 1)} ${word}`;
}

/** Řádek karty: jak dlouho by trvala cesta od Slunce světlem, sondou, letadlem a autem. */
function tripRow(distLy: number): string {
  const rows = TRIP.map(([what, kms]) => {
    const y = kms === 0 ? distLy : (distLy * KM_PER_LY) / kms / SEC_PER_YEAR;
    return `${what}: ${fmtYears(y)}`;
  });
  return `<dt>Cesta od nás</dt><dd class="trip">${rows.join("<br>")}</dd>`;
}

/** Řádky karty společné všem objektům s polohou: výška nad rovinou, vzdálenost od centra. */
export function positionRows(pos: Vector3 | null, l: number, b: number, distLy: number | null = null): string {
  const deg = (v: number) => v.toLocaleString("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let html = `<dt>Gal. souřadnice</dt><dd>l ${deg(l)}° · b ${b >= 0 ? "+" : "−"}${deg(Math.abs(b))}°</dd>`;
  if (pos) {
    const h = pos.y;
    const dGC = pos.length();
    html += `<dt>Výška nad rovinou</dt><dd>${signed(h, fmtLy(Math.abs(h)))} · ${signed(h, fmtPcFromLy(Math.abs(h)))}</dd>
      <dt>Od centra Galaxie</dt><dd>${fmtLy(dGC)} · ${fmtPcFromLy(dGC)}</dd>`;
  }
  if (distLy != null && distLy > 0) html += tripRow(distLy);
  return html;
}
