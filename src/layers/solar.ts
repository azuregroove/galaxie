import { Group } from "three";
import type { Frame } from "../core/coords";
import type { CatalogEntry, MapObject } from "../core/types";
import { escapeHtml } from "../core/units";
import type { ProbeData } from "../system/probes";
import type { SmallData } from "../system/small";
import { solarSpec, type SolarData } from "../system/solar";
import type { SystemView } from "../system/view";
import { NO_FILTER, type Facet, type FilterState, type Layer, type LayerFilter } from "./layer";

// Hledání najde Sluneční soustavu i podle planet a velkých měsíců; data se stáhnou až při otevření.
const ALIASES = ["Slunce", "Merkur", "Venuše", "Země", "Mars", "Jupiter", "Saturn", "Uran", "Neptun",
  "Pluto", "Ceres", "Eris", "Haumea", "Makemake", "Měsíc", "Io", "Europa", "Ganymed", "Kallisto", "Titan",
  "Enceladus", "Triton", "Charon", "Phobos", "Deimos", "Titania", "Oberon", "Miranda",
  "planetky", "komety", "sondy", "Halleyova kometa", "Vesta", "Pallas", "Apophis", "Bennu", "Ryugu", "Eros", "Arrokoth", "Hale-Bopp", "3I/ATLAS"];

/** Jediný objekt: Slunce s tlačítkem do pohledu Sluneční soustava. Bez legendy a filtrů. */
export class SolarLayer implements Layer {
  readonly id = "slunecni-soustava";
  readonly name = "Sluneční soustava";
  readonly group = new Group();
  readonly objects: MapObject[];
  readonly filters: LayerFilter[] = [];
  readonly facets: Facet[] = [];
  private data: Promise<[SolarData, SmallData | null, ProbeData | null]> | null = null;
  /** sondy.json; nepovinné jako planetky */
  probesUrl: string | null = null;
  private smallUrl: string | null;
  private smallMeta: CatalogEntry | null;
  private meta: CatalogEntry;
  private url: string;
  private view: SystemView;

  constructor(frame: Frame, meta: CatalogEntry, url: string, view: SystemView, small: { meta: CatalogEntry; url: string } | null = null) {
    this.meta = meta;
    this.smallMeta = small?.meta ?? null;
    this.smallUrl = small?.url ?? null;
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

  openDetail(_o?: MapObject, probe?: string): void {
    const get = <T>(url: string) => fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json() as Promise<T>;
    });
    // planetky jsou nepovinné: bez nich se soustava otevře taky
    this.data ??= Promise.all([get<SolarData>(this.url),
      this.smallUrl ? get<SmallData>(this.smallUrl).catch((e) => (console.warn("planetky a komety:", e), null)) : Promise.resolve(null),
      this.probesUrl ? get<ProbeData>(this.probesUrl).catch((e) => (console.warn("sondy:", e), null)) : Promise.resolve(null)]);
    this.data.then(([d, s, p]) => {
      this.view.open(solarSpec(d, s, p));
      if (probe) this.view.focusProbe(probe);
    }).catch((e) => {
      this.data = null;
      alert(`Data Sluneční soustavy se nepodařilo načíst: ${(e as Error).message}`);
    });
  }

  kindName(): string {
    return "Naše planetární soustava";
  }

  cardHtml(): string {
    return `<div class="kind" style="color:var(--sun)">Naše planetární soustava</div>
      <h3>Sluneční soustava</h3>
      <p>Slunce (hvězda třídy G2 V), 8 planet, 5 trpasličích planet a jejich měsíce – celkem ${escapeHtml(String(this.meta.objektu ?? "?"))} těles
      s drahami a polohou k libovolnému datu ${escapeHtml(((this.meta.platnost as number[] | undefined) ?? [1800, 2050]).join("–"))}${this.smallMeta ? `,
      k tomu vzorek ${escapeHtml(String(this.smallMeta.objektu ?? "?"))} planetek a komet` : ""}.</p>
      <div class="src">Data: ${escapeHtml(this.meta.zdroj)} (stav ${escapeHtml((this.meta.stazeno ?? "").slice(0, 10))}).</div>`;
  }
}
