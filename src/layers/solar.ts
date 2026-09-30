import { Group } from "three";
import type { Frame } from "../core/coords";
import type { CatalogEntry, MapObject } from "../core/types";
import { escapeHtml } from "../core/units";
import { solarSpec, type SolarData } from "../system/solar";
import type { SystemView } from "../system/view";
import { NO_FILTER, type Facet, type FilterState, type Layer, type LayerFilter } from "./layer";

// Hledání najde Sluneční soustavu i podle planet a velkých měsíců; data se stáhnou až při otevření.
const ALIASES = ["Slunce", "Merkur", "Venuše", "Země", "Mars", "Jupiter", "Saturn", "Uran", "Neptun",
  "Pluto", "Ceres", "Eris", "Haumea", "Makemake", "Měsíc", "Io", "Europa", "Ganymed", "Kallisto", "Titan",
  "Enceladus", "Triton", "Charon", "Phobos", "Deimos", "Titania", "Oberon", "Miranda"];

/** Jediný objekt: Slunce s tlačítkem do pohledu Sluneční soustava. Bez legendy a filtrů. */
export class SolarLayer implements Layer {
  readonly id = "slunecni-soustava";
  readonly name = "Sluneční soustava";
  readonly group = new Group();
  readonly objects: MapObject[];
  readonly filters: LayerFilter[] = [];
  readonly facets: Facet[] = [];
  private data: Promise<SolarData> | null = null;
  private meta: CatalogEntry;
  private url: string;
  private view: SystemView;

  constructor(frame: Frame, meta: CatalogEntry, url: string, view: SystemView) {
    this.meta = meta;
    this.url = url;
    this.view = view;
    this.objects = [{
      layer: this.id, index: 0, name: "Sluneční soustava", pos: frame.sun.clone(), anchor: frame.sun.clone(),
      distLy: 0, color: "var(--sun)", aliases: ALIASES,
    }];
  }

  setFilter(): void {}
  applyFilter(_f: FilterState = NO_FILTER): void {}
  labelCandidates(): MapObject[] {
    return [];
  }
  flyDistance(): number {
    return 40;
  }

  detailLabel(): string {
    return "Otevřít Sluneční soustavu ▸";
  }

  openDetail(): void {
    this.data ??= fetch(this.url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json() as Promise<SolarData>;
    });
    this.data.then((d) => this.view.open(solarSpec(d))).catch((e) => {
      this.data = null;
      alert(`Data Sluneční soustavy se nepodařilo načíst: ${(e as Error).message}`);
    });
  }

  cardHtml(): string {
    return `<div class="kind" style="color:var(--sun)">Naše planetární soustava</div>
      <h3>Sluneční soustava</h3>
      <p>Slunce (hvězda třídy G2 V), 8 planet, 5 trpasličích planet a jejich měsíce – celkem ${escapeHtml(String(this.meta.objektu ?? "?"))} těles
      s drahami a polohou k libovolnému datu ${escapeHtml(((this.meta.platnost as number[] | undefined) ?? [1800, 2050]).join("–"))}.</p>
      <div class="src">Data: ${escapeHtml(this.meta.zdroj)} (stav ${escapeHtml(this.meta.stazeno.slice(0, 10))}).</div>`;
  }
}
