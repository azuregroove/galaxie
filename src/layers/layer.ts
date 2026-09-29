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

/** Společné rozhraní katalogové vrstvy (černé díry, exoplanety, později hvězdokupy, mlhoviny…). */
export interface Layer {
  readonly id: string;
  readonly name: string;
  readonly group: Group;
  readonly objects: MapObject[];
  readonly filters: LayerFilter[];
  setFilter(key: string, on: boolean): void;
  /** Kolik objektů popsat při daném přiblížení, a které. */
  labelVisible(o: MapObject, stage: Stage): boolean;
  cardHtml(o: MapObject): string;
  /** Vzdálenost kamery po přeletu na objekt (ly). */
  flyDistance(o: MapObject): number;
  update?(stage: Stage): void;
}
