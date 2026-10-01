/**
 * Velikostní třídy planet podle Borucki et al. 2011, ApJ 736, 19 (mise Kepler):
 * Země < 1,25 R⊕ ≤ super-Země < 2 ≤ Neptun < 6 ≤ Jupiter < 15 ≤ větší.
 */
export interface SizeClass {
  value: number;
  name: string;
  range: string;
  color: string;
}

export const SIZE_CLASSES: SizeClass[] = [
  { value: 0, name: "velikost Země", range: "< 1,25 R⊕", color: "#c9a27e" },
  { value: 1, name: "super-Země", range: "1,25–2 R⊕", color: "#7fd0d8" },
  { value: 2, name: "velikost Neptunu", range: "2–6 R⊕", color: "#6f98ea" },
  { value: 3, name: "velikost Jupiteru", range: "6–15 R⊕", color: "#e3bb82" },
  { value: 4, name: "větší než Jupiter", range: "≥ 15 R⊕", color: "#e58a6a" },
  { value: 5, name: "poloměr neznámý", range: "", color: "#8a93a6" },
];

const LIMITS = [1.25, 2, 6, 15];

export function sizeClass(r: number | null | undefined): SizeClass {
  if (r == null || !(r > 0)) return SIZE_CLASSES[5];
  const i = LIMITS.findIndex((l) => r < l);
  return SIZE_CLASSES[i < 0 ? 4 : i];
}
