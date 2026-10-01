import type { Vector3 } from "three";

export interface CatalogEntry {
  id: string;
  soubor: string;
  nazev: string;
  zdroj: string;
  url?: string;
  licence: string;
  citace?: string;
  poznamka?: string;
  vyrez?: boolean;
  stazeno: string;
  [k: string]: unknown;
}

export interface Manifest {
  schema: number;
  r0_pc: number;
  r0_zdroj: string;
  katalogy: CatalogEntry[];
}

/** Jeden klikatelný/vyhledatelný objekt na mapě, bez ohledu na vrstvu. */
export interface MapObject {
  layer: string;
  index: number;
  name: string;
  /** Pozice ve scéně (ly); null = známý jen směr. */
  pos: Vector3 | null;
  /** Kam kamera letí a kde je popisek (u objektů bez vzdálenosti bod na paprsku). */
  anchor: Vector3;
  distLy: number | null;
  /** CSS proměnná nebo barva pro seznam. */
  color: string;
  /** Další jména pro vyhledávání (např. planety systému). */
  aliases?: string[];
  /** vlastní jméno: u hvězd s exoplanetami jméno IAU, jinak české jméno (jmena.json) */
  nick?: string;
  /** text popisku na mapě, když se liší od name */
  label?: string;
  /** jména planet schválená IAU: planeta → jméno */
  planetNames?: Record<string, string>;
  major?: boolean;
  hidden?: boolean;
  /** Bez vzdálenosti: jen v seznamu a hledání, na mapě se ukáže směr až po výběru. */
  listOnly?: boolean;
}
