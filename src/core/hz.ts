/**
 * Obyvatelná zóna podle Kopparapu et al. 2014, ApJ 787, L29. Koeficienty z původního kódu autorů
 * (CDS J/ApJ/787/L29, HZs.f90): S_eff = S☉ + a·T + b·T² + c·T³ + d·T⁴, T = Teff − 5780 K; platí pro 2600–7200 K.
 * Konzervativní zóna = runaway greenhouse … maximum greenhouse, optimistická = recent Venus … early Mars.
 */
const K = {
  recentVenus: [1.776, 2.136e-4, 2.533e-8, -1.332e-11, -3.097e-15],
  runaway: [1.107, 1.332e-4, 1.58e-8, -8.308e-12, -1.931e-15],
  maxGreenhouse: [0.356, 6.171e-5, 1.698e-9, -3.198e-12, -5.575e-16],
  earlyMars: [0.32, 5.547e-5, 1.526e-9, -2.874e-12, -5.011e-16],
};
/** Nominální efektivní teplota Slunce (IAU 2015 B3) pro výpočet zářivého výkonu z R a Teff. */
const TEFF_SUN = 5772;

export interface HabitableZone {
  /** au */
  cons: [number, number];
  opt: [number, number];
  /** zářivý výkon hvězdy v L☉ (z poloměru a teploty) */
  lum: number;
  /** Teff mimo 2600–7200 K (nejvýš o 200 K) – polynom použitý za hranicí platnosti */
  extrapolated: boolean;
}

const T_MIN = 2600, T_MAX = 7200, T_SLACK = 200;

export function habitableZone(teff: number | null, rs: number | null): HabitableZone | null {
  if (teff == null || rs == null || rs <= 0 || teff < T_MIN - T_SLACK || teff > T_MAX + T_SLACK) return null;
  const lum = rs * rs * (teff / TEFF_SUN) ** 4;
  const t = teff - 5780;
  const dist = (c: number[]) => Math.sqrt(lum / (c[0] + c[1] * t + c[2] * t ** 2 + c[3] * t ** 3 + c[4] * t ** 4));
  return { cons: [dist(K.runaway), dist(K.maxGreenhouse)], opt: [dist(K.recentVenus), dist(K.earlyMars)], lum,
    extrapolated: teff < T_MIN || teff > T_MAX };
}
