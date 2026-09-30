import type { StarClassResult } from "../core/starClass";

/** Oběžné těleso pro pohled Soustava. Délky v au, periody ve dnech, úhly ve stupních. */
export interface OrbitBody {
  name: string;
  a: number;
  e: number;
  w: number;
  p: number;
  /** poloměr v poloměrech Země; null = neznámý */
  r: number | null;
  /** a dopočtené z periody (3. Keplerův zákon) */
  aEst?: boolean;
  /** perioda dopočtená z a */
  pEst?: boolean;
  /** výstřednost v datech není, kreslí se kruh */
  eUnknown?: boolean;
  /** existence planety je sporná */
  disputed?: boolean;
}

export interface SystemSpec {
  name: string;
  star: {
    cls: StarClassResult;
    /** poloměr v poloměrech Slunce; null = neznámý */
    rs: number | null;
    teff: number | null;
  };
  bodies: OrbitBody[];
  /** planety, které nešlo vykreslit (chybí a i perioda) */
  skipped: string[];
  /** hmotnost hvězdy chyběla a pro dopočet a/P se použila 1 M☉ */
  massAssumed?: boolean;
  /** data vůbec neobsahují výstřednosti (pipeline před 30. 9. 2026) */
  noOrbitData?: boolean;
  source: string;
}
