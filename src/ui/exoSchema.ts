import { sizeClass } from "../core/planetSize";
import { escapeHtml, fmtNum } from "../core/units";
import type { SystemSpec } from "../system/types";

// Nominální rovníkové poloměry IAU 2015 (rezoluce B3): Slunce 695 700 km, Země 6 378,1 km, Jupiter 71 492 km.
const SUN_RE = 695700 / 6378.1;
const JUP_RE = 71492 / 6378.1;
const REF_A: [string, number][] = [["Merkur", 0.387], ["Země", 1], ["Jupiter", 5.2], ["Neptun", 30.1]];

const W = 328;

/**
 * Generované schéma planetární soustavy do karty: velikosti planet v jednom měřítku se Zemí a Jupiterem
 * a vzdálenosti od hvězdy na logaritmické ose. Kreslí se jen z čísel v datech, nic se nedomýšlí.
 */
export function exoSchemaHtml(spec: SystemSpec, starColor: string, rs: number | null): string {
  const bodies = spec.bodies;
  if (!bodies.length && !spec.skipped.length) return "";
  return `<figure class="schema">
    <div class="schemaHead">Schéma soustavy <span class="dim">· generované z dat</span></div>
    ${sizesSvg(spec, starColor, rs)}
    ${bodies.length ? orbitsSvg(spec, starColor) : ""}
    <figcaption>Barva planety = velikostní třída (Borucki et al. 2011), viz tečky v tabulce. Nahoře velikosti ve skutečném poměru (velká hvězda jen jako výsek okraje); poloměr může být
    v archivu dopočtený z hmotnosti, hlavně u planet objevených měřením radiálních rychlostí. Dole vzdálenosti od hvězdy,
    <b>logaritmická</b> osa; čárka = rozsah od periastra k apoastru podle výstřednosti.
    ${bodies.some((b) => b.aEst) ? "* vzdálenost dopočtená z oběžné doby (3. Keplerův zákon)." : ""}
    ${hzNote(spec)}</figcaption>
  </figure>`;
}

function short(spec: SystemSpec, name: string): string {
  return name.startsWith(spec.name + " ") ? name.slice(spec.name.length + 1) : name;
}

function sizesSvg(spec: SystemSpec, starColor: string, rs: number | null): string {
  // planety bez poloměru v datech se nekreslí jako kruh, jen se vypíšou
  const known = spec.bodies.filter((b) => b.r != null && b.r > 0);
  const unknown = [...spec.bodies.filter((b) => b.r == null || b.r <= 0).map((b) => b.name), ...spec.skipped];
  const items: { label: string; r: number; ref?: boolean; disputed?: boolean }[] = [
    ...known.map((b) => ({ label: short(spec, b.name), r: b.r!, disputed: b.disputed })),
    { label: "Země", r: 1, ref: true },
    { label: "Jupiter", r: JUP_RE, ref: true },
  ];
  const maxR = Math.max(...items.map((i) => i.r));
  const H = 92;
  const k = 30 / maxR;
  const starW = 34;
  let x = starW + 10;
  const cy = 44;
  const parts: string[] = [];
  for (const it of items) {
    const r = Math.max(it.r * k, 1.2);
    // místo podle širšího z kruhu a popisku (písmo 9,5 px mono ≈ 5,8 px na znak)
    const half = Math.max(r, it.label.length * 2.9 + 2);
    x += half;
    parts.push(`<circle cx="${x.toFixed(1)}" cy="${cy}" r="${r.toFixed(2)}" class="${it.ref ? "ref" : "pl"}${it.disputed ? " disputed" : ""}"${it.ref || it.disputed ? "" : ` style="fill:${sizeClass(it.r).color}"`}/>`);
    parts.push(`<text x="${x.toFixed(1)}" y="${cy + 30 + 12}" class="${it.ref ? "refT" : "plT"}">${escapeHtml(it.label)}</text>`);
    x += half + 6;
  }
  // Vejde se, jen když je planet málo; jinak se SVG zúží přes viewBox (text se zmenší úměrně).
  const width = Math.max(W, x);
  const starR = rs != null ? rs * SUN_RE * k : null;
  const star = starR != null && starR > starW
    ? `<circle cx="${(starW - starR).toFixed(1)}" cy="${cy}" r="${starR.toFixed(1)}" fill="${starColor}" class="star"/>`
    : starR != null
      ? `<circle cx="${(starW / 2).toFixed(1)}" cy="${cy}" r="${Math.max(starR, 1.5).toFixed(1)}" fill="${starColor}" class="star"/>`
      : `<rect x="0" y="0" width="${starW - 6}" height="${H - 20}" fill="${starColor}" class="star unknown"/>`;
  const note = rs == null ? `<text x="2" y="${H - 6}" class="refT start">poloměr hvězdy neznámý</text>` : "";
  return `<svg class="schemaSvg" viewBox="0 0 ${width.toFixed(0)} ${H}" role="img"
      aria-label="Velikosti planet ve srovnání se Zemí a Jupiterem">${star}${parts.join("")}${note}</svg>
    ${unknown.length ? `<div class="schemaNote">Bez poloměru v datech: ${unknown.map((n) => escapeHtml(short(spec, n))).join(", ")}</div>` : ""}`;
}

function orbitsSvg(spec: SystemSpec, starColor: string): string {
  const B = spec.bodies;
  const hz = spec.hz;
  const lo = Math.min(...B.map((b) => b.a * (1 - b.e)), hz ? hz.opt[0] : Infinity);
  const hi = Math.max(...B.map((b) => b.a * (1 + b.e)), hz ? hz.opt[1] : 0);
  // osa aspoň přes jeden řád, ať se referenční dráhy dají přečíst
  let l0 = Math.floor(Math.log10(lo) * 2) / 2;
  let l1 = Math.ceil(Math.log10(hi) * 2) / 2;
  if (l1 - l0 < 1) { const m = (l0 + l1) / 2; l0 = m - 0.5; l1 = m + 0.5; }
  const x0 = 26, x1 = W - 12;
  const X = (a: number) => x0 + ((Math.log10(a) - l0) / (l1 - l0)) * (x1 - x0);
  const H = 90, axisY = 60;
  const out: string[] = [];
  out.push(`<circle cx="8" cy="${axisY}" r="6" fill="${starColor}" class="star"/>`);
  if (hz) {
    const band = (r: [number, number], cls: string) =>
      `<rect x="${X(r[0]).toFixed(1)}" y="4" width="${(X(r[1]) - X(r[0])).toFixed(1)}" height="${axisY - 4}" class="${cls}"/>`;
    out.push(band(hz.opt, "hzOpt"), band(hz.cons, "hzCons"));
    out.push(`<text x="${((X(hz.cons[0]) + X(hz.cons[1])) / 2).toFixed(1)}" y="13" class="hzT">obyvatelná zóna${hz.extrapolated ? "*" : ""}</text>`);
  }
  out.push(`<line x1="${x0}" y1="${axisY}" x2="${x1}" y2="${axisY}" class="axis"/>`);
  for (let p = Math.ceil(l0); p <= Math.floor(l1); p++) {
    const v = 10 ** p;
    const x = X(v);
    out.push(`<line x1="${x.toFixed(1)}" y1="${axisY - 3}" x2="${x.toFixed(1)}" y2="${axisY + 3}" class="axis"/>`);
    const t = `${fmtNum(v, v < 1 ? -p : 0)} au`;
    out.push(`<text x="${Math.max(Math.min(x, x1 - t.length * 2.9), x0 + t.length * 2.9).toFixed(1)}" y="${axisY + 14}" class="refT">${t}</text>`);
  }
  for (const [n, a] of REF_A) {
    if (Math.log10(a) < l0 || Math.log10(a) > l1) continue;
    const x = X(a);
    out.push(`<line x1="${x.toFixed(1)}" y1="4" x2="${x.toFixed(1)}" y2="${axisY}" class="refL"/>`);
    out.push(`<text x="${Math.min(x, x1 - n.length * 2.9).toFixed(1)}" y="${axisY + 26}" class="refT">${n}</text>`);
  }
  // popisky planet ve dvou řadách, ať se u těsných soustav (TRAPPIST-1) nepřekrývají
  let lastX = [-1e9, -1e9];
  B.forEach((b) => {
    const x = X(b.a);
    if (b.e > 0) {
      out.push(`<line x1="${X(b.a * (1 - b.e)).toFixed(1)}" y1="${axisY - 10}" x2="${X(b.a * (1 + b.e)).toFixed(1)}" y2="${axisY - 10}" class="ecc"/>`);
    }
    out.push(`<circle cx="${x.toFixed(1)}" cy="${axisY - 10}" r="3" class="pl${b.disputed ? " disputed" : ""}"${b.disputed ? "" : ` style="fill:${sizeClass(b.r).color}"`}/>`);
    const label = short(spec, b.name) + (b.aEst ? "*" : "");
    const w = label.length * 6 + 4;
    const row = x - lastX[0] >= w ? 0 : x - lastX[1] >= w ? 1 : 0;
    lastX[row] = x;
    const y = row ? axisY - 36 : axisY - 20;
    if (row) out.push(`<line x1="${x.toFixed(1)}" y1="${y + 3}" x2="${x.toFixed(1)}" y2="${axisY - 14}" class="tick"/>`);
    out.push(`<text x="${x.toFixed(1)}" y="${y}" class="plT">${escapeHtml(label)}</text>`);
  });
  return `<svg class="schemaSvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Vzdálenosti planet od hvězdy">${out.join("")}</svg>`;
}

function hzNote(spec: SystemSpec): string {
  const hz = spec.hz;
  if (!hz) return spec.star.teff == null || spec.star.rs == null
    ? "Obyvatelná zóna chybí: hvězda nemá v datech teplotu nebo poloměr."
    : "Obyvatelná zóna chybí: model platí jen pro hvězdy 2 600–7 200 K.";
  return `Zelená = obyvatelná zóna podle Kopparapu et al. 2014 (tmavší konzervativní ${fmtNum(hz.cons[0], 3)}–${fmtNum(hz.cons[1], 3)} au,
    světlejší optimistická), z teploty a poloměru hvězdy${hz.extrapolated ? "; <b>* teplota hvězdy je mimo rozsah modelu, zóna je extrapolovaná</b>" : ""}.`;
}
