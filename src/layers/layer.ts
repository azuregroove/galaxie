import type { Group } from "three";
import type { MapObject } from "../core/types";
import type { Stage } from "../scene/stage";

export interface LayerFilter {
  key: string;
  name: string;
  /** CSS proměnná, např. "--rtg" */
  color: string;
  on: boolean;
}

export interface FacetOption {
  value: number;
  label: string;
  count: number;
}

/** Filtr specifický pro vrstvu; vzdálenost je společná a řeší ji panel sám. */
export type Facet =
  | { kind: "checks"; id: string; name: string; options: FacetOption[] }
  | { kind: "range"; id: string; name: string; min: number; max: number };

/** Stav filtrů; null = bez omezení. Musí jít serializovat do #kotvy. */
export interface FilterState {
  /** vzdálenost od Slunce v ly */
  dist: [number, number] | null;
  checks: Record<string, number[] | null>;
  ranges: Record<string, [number, number] | null>;
}

export const NO_FILTER: FilterState = { dist: null, checks: {}, ranges: {} };

export function passDist(o: MapObject, f: FilterState): boolean {
  if (!f.dist) return true;
  return o.distLy != null && o.distLy >= f.dist[0] && o.distLy <= f.dist[1];
}

/** Společné rozhraní katalogové vrstvy (černé díry, exoplanety, později hvězdokupy, mlhoviny…). */
export interface Layer {
  readonly id: string;
  readonly name: string;
  readonly group: Group;
  readonly objects: MapObject[];
  readonly filters: LayerFilter[];
  setFilter(key: string, on: boolean): void;
  readonly facets: Facet[];
  applyFilter(f: FilterState): void;
  /** Objekty, které chtějí popisek při daném přiblížení, od nejdůležitějšího. O umístění rozhodnou Labels. */
  labelCandidates(stage: Stage): MapObject[];
  /** volitelný text počtu do hlavičky místo pouhého počtu bodů (exoplanety: planety i soustavy) */
  countText?(visible: MapObject[], filtered: boolean): string;
  /** volitelný ovládací prvek na konec řádku legendy (např. síla hranic území) */
  legendExtra?(): HTMLElement | null;
  cardHtml(o: MapObject): string;
  /** Typ objektu jedním slovním spojením (pro seznam a čtečky obrazovky); bez něj se použije jméno vrstvy. */
  kindName?(o: MapObject): string;
  /** Poloha na obloze a velikost výřezu pro obrázek z přehlídky (když objekt nemá fotku). */
  skyPos?(o: MapObject): SkyPos | null;
  /** Vzdálenost kamery po přeletu na objekt (ly). */
  flyDistance(o: MapObject): number;
  update?(stage: Stage): void;
  /** Podrobný pohled na objekt (např. planetární soustava); tlačítko v kartě se ukáže, když vrátí popisek. */
  detailLabel?(o: MapObject): string | null;
  openDetail?(o: MapObject): void;
  /** Volá se při každé změně výběru (null = nic vybraného). */
  onSelect?(o: MapObject | null): void;
}

export interface SkyPos {
  l: number;
  b: number;
  /** zorné pole výřezu ve stupních */
  fovDeg: number;
}
