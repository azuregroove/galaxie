/** Keplerova úloha pro vykreslení drah: poloha v rovině dráhy, ohnisko (hvězda) v počátku. */

const TAU = Math.PI * 2;

/** Excentrická anomálie E z střední anomálie M (Newtonova metoda). */
export function eccentricAnomaly(M: number, e: number): number {
  M = ((M % TAU) + TAU) % TAU;
  // u výstředných drah startovat z π, jinak Newton u periastra osciluje
  let E = e < 0.8 ? M : Math.PI;
  for (let k = 0; k < 30; k++) {
    const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= d;
    if (Math.abs(d) < 1e-10) break;
  }
  return E;
}

/**
 * Poloha na elipse [x, y] v rovině dráhy; osa x míří k periastru otočenému o ω.
 * a v libovolných jednotkách, ω ve stupních.
 */
export function orbitPoint(a: number, e: number, wDeg: number, E: number): [number, number] {
  const x = a * (Math.cos(E) - e);
  const y = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const w = (wDeg * Math.PI) / 180;
  const c = Math.cos(w), s = Math.sin(w);
  return [x * c - y * s, x * s + y * c];
}

/** Třetí Keplerův zákon: a [au] z periody [dny] a hmotnosti hvězdy [M☉] (hmotnost planety zanedbána). */
export const aFromPeriod = (pDays: number, mStar: number): number => Math.cbrt(mStar * (pDays / 365.25) ** 2);
export const periodFromA = (aAu: number, mStar: number): number => Math.sqrt(aAu ** 3 / mStar) * 365.25;

/**
 * Poloha v rovině dráhy před otočením o ω (osa x k periheliu) pro elipsu i hyperbolu.
 * M v radiánech; u hyperboly je a záporné a M = n (t − T).
 */
export function planeXY(a: number, e: number, M: number): [number, number] {
  if (e < 1) {
    const E = eccentricAnomaly(M, e);
    return [a * (Math.cos(E) - e), a * Math.sqrt(1 - e * e) * Math.sin(E)];
  }
  const H = hyperbolicAnomaly(M, e);
  return [a * (Math.cosh(H) - e), -a * Math.sqrt(e * e - 1) * Math.sinh(H)];
}

/** Hyperbolická anomálie z e·sinh H − H = M (Newton, start z asinh). */
export function hyperbolicAnomaly(M: number, e: number): number {
  let H = Math.asinh(M / e);
  for (let k = 0; k < 60; k++) {
    const d = (e * Math.sinh(H) - H - M) / (e * Math.cosh(H) - 1);
    H -= d;
    if (Math.abs(d) < 1e-12) break;
  }
  return H;
}
