import type { HabitableZone } from "../core/hz";
import type { StarClassResult } from "../core/starClass";
import type { SmallData } from "./small";

/** Oběžné těleso pro pohled Soustava. Délky v au, periody a čas ve dnech, úhly ve stupních. */
export interface OrbitBody {
  name: string;
  /** krátký popisek na mapě (např. „e“ místo „TRAPPIST-1 e“) */
  label?: string;
  a: number;
  e: number;
  w: number;
  p: number;
  /** poloměr v poloměrech Země; null = neznámý */
  r: number | null;
  /** sklon a délka výstupného uzlu vůči ekliptice; bez nich leží dráha v základní rovině */
  inc?: number;
  node?: number;
  /** poloha k datu: střední anomálie m0 v epoše (JD), střední pohyb n [°/den] */
  epoch?: number;
  m0?: number;
  n?: number;
  /** lineární změny elementů za den (planety podle Standishe, stáčení uzlu u měsíců) */
  rates?: { a?: number; e?: number; inc?: number; node?: number; w?: number };
  color?: string;
  kind?: "planet" | "dwarf" | "moon" | "small";
  /** klíč do obrazky.json (vrstva slunecni-soustava): anglické jméno nebo označení z JPL */
  imgKey?: string;
  /** text do řádku vybraného tělesa místo výchozího (planetky a komety) */
  info?: string;
  /** odkaz na zdroj údajů (např. stránka tělesa v JPL SBDB) */
  link?: { href: string; text: string };
  children?: OrbitBody[];
  /** poznámka k přesnosti do tabulky */
  note?: string;
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
    label?: string;
    /** přesný spektrální typ, když ho chceme ukázat místo třídy */
    spType?: string;
  };
  bodies: OrbitBody[];
  /** obyvatelná zóna hvězdy (jen u exoplanet se známou Teff a poloměrem) */
  hz?: HabitableZone | null;
  /** planety, které nešlo vykreslit (chybí a i perioda) */
  skipped: string[];
  /** hmotnost hvězdy chyběla a pro dopočet a/P se použila 1 M☉ */
  massAssumed?: boolean;
  /** data vůbec neobsahují výstřednosti (pipeline před 30. 9. 2026) */
  noOrbitData?: boolean;
  /** skutečné polohy k datu (JD TDB); jinak jen ilustrativní fáze */
  dated?: { min: number; max: number };
  /** vlastní poznámky místo výchozích pro exoplanety */
  notes?: string[];
  /** ukázat srovnání s drahami Sluneční soustavy */
  solarRef?: boolean;
  /** planetky a komety jako body (jen Sluneční soustava) */
  small?: SmallData;
  source: string;
}
