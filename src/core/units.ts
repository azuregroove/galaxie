export const LY_PER_PC = 3.261563777;

const nf0 = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });

export const fmt = (n: number): string => nf0.format(Math.round(n));

export function fmtNum(n: number, maxFrac = 2): string {
  return n.toLocaleString("cs-CZ", { maximumFractionDigits: maxFrac });
}

/** Počet platných číslic podle velikosti, ať blízké objekty nemají „0 ly“. */
function smart(n: number): string {
  const a = Math.abs(n);
  if (a >= 100) return fmt(n);
  if (a >= 10) return fmtNum(n, 1);
  return fmtNum(n, 2);
}

export function fmtLy(ly: number): string {
  return `${smart(ly)} ly`;
}

export function fmtPcFromLy(ly: number): string {
  const pc = ly / LY_PER_PC;
  return Math.abs(pc) >= 1000 ? `${fmtNum(pc / 1000, 2)} kpc` : `${smart(pc)} pc`;
}

export function fmtPc(pc: number): string {
  return fmtPcFromLy(pc * LY_PER_PC);
}

export const signed = (n: number, s: string): string => `${n >= 0 ? "+" : "−"}${s}`;

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Vzdálenost pro čtečku obrazovky: „ly“ by přečetla jako dvě písmena. */
export function spokenLy(ly: number): string {
  const s = smart(ly);
  if (/,/.test(s)) return `${s} světelného roku`;
  const n = Math.round(ly);
  return `${s} ${n === 1 ? "světelný rok" : n >= 2 && n <= 4 ? "světelné roky" : "světelných let"}`;
}
