/**
 * Spirální ramena podle Reid et al. 2019, ApJ 885, 131, tab. 2 (logaritmické spirály se zlomem).
 * Parametry převzaté z knihovny SpiralMap 0.27 (Prusty & Khanna 2025, MIT) – článek je z cloudu nedostupný.
 * Kontrola: pipeline/overit_ramena.py proti 199 maserům z tabulky 1 (CDS J/ApJ/885/131): rozsahy β sedí
 * s masery přiřazenými k ramenům, mediány odchylek od středu ramene 0,1–0,3 kpc.
 *
 * ln(R / R_kink) = −(β − β_kink) · tan ψ, ψ = ψ< pro β < β_kink, jinak ψ>.
 * β je galaktocentrický azimut: 0 směrem ke Slunci, kladný na stranu l = 90°.
 */
export interface Arm {
  id: string;
  name: string;
  betaKink: number;
  psiLow: number;
  psiHigh: number;
  /** kpc */
  rKink: number;
  /** rozsah modelu (°) */
  betaMin: number;
  betaMax: number;
  /** rozsah maserů přiřazených k ramenu, pokud přesahuje model; mimo model se kreslí ztlumeně */
  extMin: number;
  extMax: number;
  /** šířka ramene v R_kink (kpc) */
  width: number;
}

export const ARMS: Arm[] = [
  { id: "3kpc", name: "Rameno 3 kpc", betaKink: 15, psiLow: -4.2, psiHigh: -4.2, rKink: 3.52, betaMin: 15, betaMax: 18, extMin: 5, extMax: 119, width: 0.18 },
  { id: "nor", name: "Rameno Pravítka (Norma)", betaKink: 18, psiLow: -1, psiHigh: 19.5, rKink: 4.46, betaMin: 5, betaMax: 54, extMin: 2, extMax: 54, width: 0.14 },
  { id: "sct", name: "Rameno Štítu–Kentaura", betaKink: 23, psiLow: 14.1, psiHigh: 12.1, rKink: 4.91, betaMin: 0, betaMax: 104, extMin: -29, extMax: 168, width: 0.23 },
  { id: "sgr", name: "Rameno Střelce–Kýlu", betaKink: 24, psiLow: 17.1, psiHigh: 1, rKink: 6.04, betaMin: 2, betaMax: 97, extMin: -2, extMax: 97, width: 0.27 },
  { id: "loc", name: "Místní rameno (Orionu)", betaKink: 9, psiLow: 11.4, psiHigh: 11.4, rKink: 8.26, betaMin: -8, betaMax: 34, extMin: -8, extMax: 34, width: 0.31 },
  { id: "per", name: "Rameno Persea", betaKink: 40, psiLow: 10.3, psiHigh: 8.7, rKink: 8.87, betaMin: -23, betaMax: 115, extMin: -23, extMax: 115, width: 0.35 },
  { id: "out", name: "Vnější rameno", betaKink: 18, psiLow: 3, psiHigh: 9.4, rKink: 12.24, betaMin: -16, betaMax: 71, extMin: -16, extMax: 71, width: 0.65 },
];

const RAD = Math.PI / 180;

/** Galaktocentrický poloměr středu ramene (kpc) v azimutu β (°). */
export function armRadius(a: Arm, beta: number): number {
  const psi = beta < a.betaKink ? a.psiLow : a.psiHigh;
  return a.rKink * Math.exp(-(beta - a.betaKink) * RAD * Math.tan(psi * RAD));
}

/** Bod scény (x, z v ly) pro poloměr R (kpc) a azimut β; Slunce leží na −X, l = 90° na −Z (viz Frame). */
export function armXZ(rKpc: number, beta: number, lyPerKpc: number): [number, number] {
  return [-rKpc * Math.cos(beta * RAD) * lyPerKpc, -rKpc * Math.sin(beta * RAD) * lyPerKpc];
}
