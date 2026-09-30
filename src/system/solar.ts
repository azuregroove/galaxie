import { STAR_CLASS } from "../core/starClass";
import { smallNotes, type SmallData } from "./small";
import type { OrbitBody, SystemSpec } from "./types";

const AU_KM = 149597870.7;
const R_EARTH_KM = 6371;

interface Elements {
  jmeno: string;
  en: string;
  epocha: number;
  a: number;
  e: number;
  i: number;
  om: number;
  w: number;
  m0: number;
  n: number;
  r_km: number | null;
  zdroj: string;
  da?: number; de?: number; di?: number; dom?: number; dw?: number;
}

interface Moon extends Elements {
  planeta: string;
  presnost: "horizons" | "tabulka";
}

export interface SolarData {
  stazeno: string;
  platnost: [number, number];
  epocha_mesicu: number;
  slunce: { r_km: number };
  planety: Elements[];
  trpaslici: Elements[];
  mesice: Moon[];
}

// Barvy jen pro rozlišení na mapě, přibližně podle vzhledu na fotografiích.
const COLORS: Record<string, string> = {
  Merkur: "#a9a39b", "Venuše": "#e8d3a0", "Země": "#5b9bff", Mars: "#e0714b", Jupiter: "#d9b38c",
  Saturn: "#e6cf8b", Uran: "#8fe3e8", Neptun: "#5a7dff", Pluto: "#d8c2a8",
};

/** JD pro 1. 1. daného roku (gregoriánský kalendář, 0 h). */
function jdOfYear(y: number): number {
  const Y = y - 1, M = 13;
  const A = Math.floor(Y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + 1 + B - 1524.5;
}

/** Předběžné označení měsíce v zápisu JPL „S2020_S_15“ → obvyklé „S/2020 S 15“. */
const designation = (s: string) => s.replace(/^S(\d{4})_([A-Z])_(\d+)$/, "S/$1 $2 $3");

function body(el: Elements, kind: OrbitBody["kind"], aKm = false): OrbitBody {
  const a = aKm ? el.a / AU_KM : el.a;
  const cz = designation(el.jmeno);
  return {
    name: el.en === el.jmeno || kind !== "moon" ? cz : `${cz} (${el.en})`,
    label: cz,
    kind, imgKey: el.en, a, e: el.e, inc: el.i, node: el.om, w: el.w, epoch: el.epocha, m0: el.m0, n: el.n,
    p: 360 / Math.abs(el.n),
    r: el.r_km != null ? el.r_km / R_EARTH_KM : null,
    color: COLORS[el.jmeno] ?? (kind === "moon" ? "#b9b3a8" : kind === "dwarf" ? "#c8b6a0" : undefined),
    rates: { a: aKm ? undefined : el.da, e: el.de, inc: el.di, node: el.dom, w: el.dw },
  };
}

export function solarSpec(d: SolarData, small: SmallData | null = null): SystemSpec {
  const planets = d.planety.map((p) => body(p, "planet"));
  const dwarfs = d.trpaslici.map((p) => body(p, "dwarf"));
  const all = [...planets, ...dwarfs];
  const byName = new Map(all.map((b) => [b.label!, b]));
  for (const m of d.mesice) {
    const parent = byName.get(m.planeta);
    if (!parent) continue;
    const b = body(m, "moon", true);
    if (m.presnost === "tabulka") b.note = "poloha méně přesná (Horizons těleso nezná)";
    (parent.children ??= []).push(b);
  }
  for (const b of all) b.children?.sort((x, y) => x.a - y.a);
  const [y0, y1] = d.platnost;
  const moons = d.mesice.length;
  return {
    name: "Sluneční soustava",
    star: { cls: { info: STAR_CLASS.G, estimated: false }, rs: d.slunce.r_km / 695700, teff: null, label: "Slunce", spType: "G2 V" },
    bodies: all,
    skipped: [],
    dated: { min: jdOfYear(y0), max: jdOfYear(y1 + 1) - 1 },
    notes: [
      `Polohy jsou k vybranému datu a spočítané z drah (Keplerovy rovnice), ne z přesných efemerid.`,
      `Planety: elementy JPL (Standish) platné ${y0}–${y1}; oproti přesné efemeridě JPL Horizons se k 30. 9. 2026 liší nejvýš o ~4′ (Saturn), ostatní pod 2′.`,
      `Měsíce (${moons}): dráhy z JPL Horizons k 1. 1. 2026 a 2027. Kolem roku 2026 sedí poloha na dráze obvykle do několika stupňů; malé vnější (nepravidelné) měsíce, které silně ruší Slunce, se s odstupem let rozcházejí i o desítky stupňů.`,
      `Trpasličí planety: oskulační elementy z JPL SBDB. Poloměr Eris, Haumey a Makemake JPL neuvádí, kreslí se odhadem.`,
      `Měsíce se ukážou po přiblížení k planetě; klepnutím na jméno se na těleso přeletí a kamera ho sleduje.`,
      `„Skutečné velikosti“ kreslí tělesa v měřítku drah (většinou jen jako tečky). Jinak jsou zvětšená.`,
      `Planeta „Země“ je ve skutečnosti těžiště soustavy Země–Měsíc (liší se o ~4 700 km).`,
      ...(small ? smallNotes(small) : []),
    ],
    small: small ?? undefined,
    source: `Data: NASA/JPL Solar System Dynamics – přibližné polohy planet, SBDB, Horizons, parametry měsíců (stav ${d.stazeno.slice(0, 10)}).`,
  };
}
