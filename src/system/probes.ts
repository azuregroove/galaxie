import { Vector3 } from "three";

/** Sonda z pipeline/sondy.py: dráha z JPL Horizons v heliocentrické ekliptice J2000 (au, JD TDB). */
export interface Probe {
  jmeno: string;
  horizons: string;
  barva: string;
  start: string;
  hmotnost_kg: number | null;
  pozn: string;
  /** [datum (RRRR, RRRR-MM nebo RRRR-MM-DD), text] – časová osa ze záhlaví objektu v Horizons */
  udalosti: [string, string][];
  drah: { jd: number[]; xyz: [number, number, number][] };
  konec_jd: number;
  /** rychlost na konci efemeridy (au/den) – za koncem se dráha prodlužuje přímkou */
  v_konec: [number, number, number];
  dnes: { datum: string; r_au: number; v_kms: number; xyz_gal_au: [number, number, number] };
  smer_gal: { l: number; b: number; v_kms: number };
}

export interface ProbeData {
  stazeno: string;
  sondy: Probe[];
}

/**
 * Poloha sondy k datu v ekliptice J2000 (au): lineárně mezi body zjednodušené dráhy, za koncem efemeridy přímkou
 * podle poslední rychlosti. Před začátkem trajektorie null.
 */
export function probeEcl(p: Probe, jd: number, out: [number, number, number]): boolean {
  const t = p.drah.jd, x = p.drah.xyz;
  if (jd < t[0]) return false;
  const n = t.length;
  if (jd >= t[n - 1]) {
    const dt = jd - t[n - 1];
    for (let k = 0; k < 3; k++) out[k] = x[n - 1][k] + p.v_konec[k] * dt;
    return true;
  }
  let lo = 0, hi = n - 1;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (t[m] <= jd) lo = m; else hi = m;
  }
  const f = (jd - t[lo]) / (t[hi] - t[lo]);
  for (let k = 0; k < 3; k++) out[k] = x[lo][k] + (x[hi][k] - x[lo][k]) * f;
  return true;
}

/** Ekliptika (x, y, z) → scéna pohledu Soustava (y = sever ekliptiky), stejně jako SystemView.toScene. */
export const eclToScene = (e: readonly number[], out: Vector3) => out.set(e[0], e[2], -e[1]);

/** Datum z časové osy („1987“, „1978-06“, „2015-07-14“) česky. */
export function fmtEventDate(d: string): string {
  const [y, m, day] = d.split("-").map(Number);
  if (day) return `${day}. ${m}. ${y}`;
  if (m) return `${m}/${y}`;
  return String(y);
}
