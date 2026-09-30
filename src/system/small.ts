import { fmtNum } from "../core/units";
import type { OrbitBody } from "./types";

/** Sloupcová data z pipeline/mala_telesa.py (planetky a komety, vzorek). */
export interface SmallData {
  stazeno: string;
  skupiny: Record<string, string>;
  pocty: Record<string, number>;
  vyber: Record<string, string>;
  sloupce: {
    jmeno: string[];
    skupina: string[];
    trida: string[];
    epocha: number[];
    a: number[];
    e: number[];
    i: number[];
    om: number[];
    w: number[];
    m0: number[];
    n: number[];
    H: (number | null)[];
    M1: (number | null)[];
    d_km: (number | null)[];
    pha: number[];
    u: (string | null)[];
    zdroj: string[];
  };
}

/** Barvy skupin – jen pro rozlišení na mapě. */
export const SMALL_COLORS: Record<string, string> = {
  pas: "#a89a82", neo: "#ff7a59", trojan: "#8fd46a", kentaur: "#d99be0", tno: "#6fa8ff",
  kometa: "#7fe7ff", mezihvezdne: "#ffd84a",
};

/** Třídy drah JPL SBDB (https://ssd-api.jpl.nasa.gov/doc/sbdb_filter.html, ověřeno 30. 9. 2026). */
const CLASS_CZ: Record<string, string> = {
  IEO: "Atira – dráha celá uvnitř dráhy Země", ATE: "Aten – blízkozemní, a < 1 au", APO: "Apollo – kříží dráhu Země",
  AMO: "Amor – přibližuje se k dráze Země zvenku", MCA: "kříží dráhu Marsu", IMB: "vnitřní hlavní pás",
  MBA: "hlavní pás", OMB: "vnější hlavní pás", TJN: "trojan Jupiteru (body L4/L5)", AST: "planetka (bez třídy)",
  CEN: "kentaur – mezi Jupiterem a Neptunem", TNO: "transneptunické těleso", HYA: "hyperbolická dráha",
  PAA: "parabolická dráha", ETc: "kometa Enckeho typu", JFc: "kometa Jupiterovy rodiny", JFC: "kometa Jupiterovy rodiny",
  CTc: "kometa Chironova typu", HTC: "kometa Halleyova typu", PAR: "parabolická kometa", HYP: "hyperbolická kometa",
  COM: "kometa (dlouhoperiodická)",
};

const plural = (n: number, one: string, few: string, many: string) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);

/** Těleso pro pohled Soustava (vybrané, s dráhou a popiskem). */
export function smallBody(d: SmallData, k: number): OrbitBody {
  const c = d.sloupce;
  const a = c.a[k], e = c.e[k];
  const name = c.jmeno[k];
  const q = a * (1 - e);
  const parts = [d.skupiny[c.skupina[k]], CLASS_CZ[c.trida[k]] ?? c.trida[k]];
  if (c.pha[k]) parts.push("potenciálně nebezpečná planetka (PHA)");
  parts.push(`q ${fmtNum(q, 3)} au`);
  if (e < 1) {
    const p = 360 / c.n[k];
    parts.push(`a ${fmtNum(a, 3)} au`, `e ${fmtNum(e, 3)}`, `oběh ${p > 3650 ? `${fmtNum(p / 365.25, 0)} let` : `${fmtNum(p / 365.25, 2)} ${plural(Math.round(p / 365.25), "rok", "roky", "let")}`}`);
  } else {
    parts.push(`e ${fmtNum(e, 3)} (neuzavřená dráha)`);
  }
  parts.push(`sklon ${fmtNum(c.i[k], 1)}°`);
  if (c.H[k] != null) parts.push(`H ${fmtNum(c.H[k]!, 1)} mag`);
  else if (c.M1[k] != null) parts.push(`M1 ${fmtNum(c.M1[k]!, 1)} mag`);
  if (c.d_km[k] != null) parts.push(`průměr ${fmtNum(c.d_km[k]!, 1)} km`);
  const ep = new Date((c.epocha[k] - 2440587.5) * 86400000).toLocaleDateString("cs-CZ");
  parts.push(c.zdroj[k] === "h" ? `dráha: JPL Horizons k ${ep}` : `dráha: JPL SBDB k ${ep}`);
  return {
    name, label: shortName(name), kind: "small", a, e, inc: c.i[k], node: c.om[k], w: c.w[k],
    epoch: c.epocha[k], m0: c.m0[k], n: c.n[k], p: e < 1 ? 360 / c.n[k] : Infinity,
    r: c.d_km[k] != null ? c.d_km[k]! / 2 / 6371 : null,
    color: SMALL_COLORS[c.skupina[k]], info: parts.join(" · "),
  };
}

/** „433 Eros (A898 PA)“ → „433 Eros“, „(2024 YR4)“ → „2024 YR4“. */
function shortName(s: string): string {
  const m = s.match(/^(\d+ \S.*?) \([^)]*\)$/);
  if (m) return m[1];
  return s.replace(/^\((.*)\)$/, "$1");
}

export const smallNotes = (d: SmallData): string[] => {
  const p = d.pocty;
  const total = Object.values(p).reduce((x, y) => x + y, 0);
  return [
    `Planetky a komety (${fmtNum(total, 0)}): <b>jen vzorek</b> z JPL SBDB – hlavní pás a trojáni ${d.vyber.pas}, blízkozemní ${d.vyber.neo},
     kentauři ${d.vyber.kentaur}, transneptunická tělesa ${d.vyber.tno}, komety ${d.vyber.kometa}, navíc cíle sond a slavné komety.
     Známých malých těles je přes 1,5 milionu.`,
    `Jejich polohy jsou z dráhy k jediné epoše (dvě tělesa, bez poruch). Kolem roku 2026 sedí s JPL Horizons do několika minut
     (ověřeno na 14 tělesech). O desítky let dál se rozcházejí o stupně a u těles po blízkém průletu kolem planety úplně
     (Apophis po roce 2029, kometa 67P). Na posuvníku daleko od dneška je ber jako ilustraci.`,
    `Klepnutím na bod nebo hledáním se těleso vybere: ukáže se jeho dráha a údaje.`,
  ];
};
