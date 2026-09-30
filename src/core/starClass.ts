/** Spektrální třída hostitelské hvězdy: ze zapsaného spektrálního typu, jinak odhad z efektivní teploty. */

export type StarClassKey = "OB" | "A" | "F" | "G" | "K" | "M" | "LTY" | "D" | "X";

export interface StarClassInfo {
  key: StarClassKey;
  name: string;
  /** CSS proměnná barvy */
  color: string;
  desc: string;
}

// Barvy jsou orientační (konvence map a atlasů), ne kolorimetrický výpočet.
export const STAR_CLASSES: StarClassInfo[] = [
  { key: "OB", name: "O a B", color: "--st-ob", desc: "horká modrá až modrobílá hvězda, o hodně hmotnější než Slunce" },
  { key: "A", name: "A", color: "--st-a", desc: "bílá hvězda, teplejší a hmotnější než Slunce" },
  { key: "F", name: "F", color: "--st-f", desc: "žlutobílá hvězda, o něco teplejší než Slunce" },
  { key: "G", name: "G", color: "--st-g", desc: "žlutá hvězda podobná Slunci (Slunce je G2 V)" },
  { key: "K", name: "K", color: "--st-k", desc: "oranžová hvězda, chladnější a menší než Slunce" },
  { key: "M", name: "M", color: "--st-m", desc: "červený trpaslík, nejběžnější typ hvězdy v Galaxii" },
  { key: "LTY", name: "L, T, Y", color: "--st-lty", desc: "hnědý trpaslík, těleso mezi hvězdou a planetou" },
  { key: "D", name: "Bílý trpaslík", color: "--st-d", desc: "bílý trpaslík, vyhaslé jádro hvězdy" },
  { key: "X", name: "Neznámá", color: "--st-x", desc: "typ ani teplota hvězdy nejsou v archivu uvedené" },
];

export const STAR_CLASS = Object.fromEntries(STAR_CLASSES.map((c) => [c.key, c])) as Record<StarClassKey, StarClassInfo>;

/**
 * Hranice tříd podle teplot trpaslíků hlavní posloupnosti z Pecaut & Mamajek 2013, ApJS 208, 9, tabulka 5
 * (CDS J/ApJS/208/9): hranice = střed mezi posledním podtypem třídy a prvním podtypem následující
 * (O9.5V 32 000 / B0V 31 500, B9.5V 10 400 / A0V 9 700, A9V 7 440 / F0V 7 200, F9V 6 040 / G0V 5 920,
 * G9V 5 340 / K0V 5 280, K9V 3 880 / M0V 3 850). Tabulka končí u M9V = 2 450 K.
 */
const TEFF_EDGES: [number, StarClassKey][] = [
  [31750, "OB"], [10050, "A"], [7320, "F"], [5980, "G"], [5310, "K"], [3865, "M"], [2450, "M"],
];

export interface StarClassResult {
  info: StarClassInfo;
  /** true = odhad z teploty, ne zapsaný spektrální typ */
  estimated: boolean;
  /** true = teplota pod M9V, kde tabulka končí */
  belowTable?: boolean;
}

export function classFromSpectralType(sp: string | null): StarClassKey | null {
  if (!sp) return null;
  const s = sp.trim();
  // bílí trpaslíci se zapisují WD nebo DA, DB, DC, DQ…; podtrpaslíci mají „sd“ před třídou;
  // v archivu se vyskytuje i malé písmeno („m3 V“)
  if (/^(WD|D[ABCOQZX])/.test(s)) return "D";
  const m = /^(?:sd|esd|usd)?\s*([OBAFGKMLTYobafgkm])/.exec(s);
  if (!m) return null;
  const c = m[1].toUpperCase();
  if (c === "O" || c === "B") return "OB";
  if (c === "L" || c === "T" || c === "Y") return "LTY";
  return c as StarClassKey;
}

export function classFromTeff(teff: number): { key: StarClassKey; belowTable: boolean } {
  for (const [edge, key] of TEFF_EDGES) if (teff >= edge) return { key, belowTable: false };
  return { key: "M", belowTable: true };
}

export function starClass(sp: string | null, teff: number | null): StarClassResult {
  const fromSp = classFromSpectralType(sp);
  if (fromSp) return { info: STAR_CLASS[fromSp], estimated: false };
  if (teff != null && teff > 0) {
    const { key, belowTable } = classFromTeff(teff);
    return { info: STAR_CLASS[key], estimated: true, belowTable };
  }
  return { info: STAR_CLASS.X, estimated: false };
}
