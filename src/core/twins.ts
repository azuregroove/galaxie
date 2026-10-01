import type { Vector3 } from "three";
import type { MapObject } from "./types";

// Hipparcos má polohy k epoše 1991,25, PSCompPars ke 2000/2016; blízké hvězdy s velkým vlastním pohybem
// se za tu dobu posunou o desítky úhlových vteřin (ε Eri 24″, HD 20794 76″).
const MAX_SEP = (120 / 3600) * (Math.PI / 180);
const MAX_SEP_NO_DIST = (5 / 3600) * (Math.PI / 180);
const MAX_DIST_DIFF = 0.25;

/**
 * Propojí jasné hvězdy s hostitelskými hvězdami exoplanet (táž hvězda ve dvou katalozích).
 * Hlavní je systém s planetami; hvězda z druhého katalogu dostane `secondary` a v seznamu, popiscích
 * a při klikání se schová, dokud je systém vidět. Hledání najde systém i podle jmen hvězdy.
 */
export function linkTwins(stars: MapObject[], systems: MapObject[], dir: (o: MapObject) => Vector3 | null): number {
  const sys = systems.flatMap((o) => {
    const d = dir(o);
    return d ? [{ o, d }] : [];
  });
  let n = 0;
  for (const s of stars) {
    const ds = dir(s);
    if (!ds) continue;
    let best: MapObject | null = null;
    let bestSep = Infinity;
    for (const c of sys) {
      const sep = ds.angleTo(c.d);
      if (sep >= bestSep || sep > MAX_SEP) continue;
      const a = s.distLy, b = c.o.distLy;
      const ok = a != null && b != null ? Math.abs(a - b) / Math.max(a, b) <= MAX_DIST_DIFF : sep <= MAX_SEP_NO_DIST;
      if (ok && !c.o.twin) {
        best = c.o;
        bestSep = sep;
      }
    }
    if (!best) continue;
    s.twin = best;
    s.secondary = true;
    best.twin = s;
    // kdo z dvojice je zrovna vidět, toho musí najít obě sady jmen
    best.searchNames = [s.name, ...(s.aliases ?? [])];
    s.searchNames = [best.name, ...(best.aliases ?? [])];
    // na mapě radši jméno jasné hvězdy (Aldebaran) než katalogové označení systému (alf Tau)
    if (!best.nick && !best.label) best.label = s.label ?? s.name;
    n++;
  }
  return n;
}

/**
 * Objekt je schovaný za svým viditelným dvojčetem z jiného katalogu. Ukazuje se hlavní objekt,
 * jen když nemá vzdálenost a dvojče ano (μ² Sco), ustoupí on.
 */
export function shadowed(o: MapObject): boolean {
  const t = o.twin;
  if (!t || t.hidden || !t.pos) return false;
  return !!o.secondary || !o.pos;
}
