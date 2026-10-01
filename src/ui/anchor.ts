import { Vector3 } from "three";
import type { MapObject } from "../core/types";
import { NO_FILTER, type FilterState, type Layer } from "../layers/layer";
import type { Stage } from "../scene/stage";
import type { Hud } from "./hud";
import type { Tours } from "./tours";

/*
 * Sdílení pohledu přes #kotvu, např.
 *   #o=exoplanety:TRAPPIST-1&c=-26581.2,-33.9,-12.4,-26600.3,-30.1,5.2&d=10-100&rok=2020-2022&metoda=3.9
 * c = kamera (x,y,z) a cíl pohledu (x,y,z) ve scéně v ly; o = vybraný objekt; vylet + krok (od 1); zbytek filtry.
 */
const round = (v: number) => (Math.abs(v) >= 100 ? v.toFixed(1) : v.toFixed(3)).replace(/\.?0+$/, "");
const sig = (v: number) => String(+v.toPrecision(4));

export function encodeFilters(f: FilterState, q: URLSearchParams): void {
  if (f.dist) q.set("d", `${sig(f.dist[0])}-${Number.isFinite(f.dist[1]) ? sig(f.dist[1]) : ""}`);
  for (const [k, v] of Object.entries(f.ranges)) if (v) q.set(k, `${v[0]}-${v[1]}`);
  for (const [k, v] of Object.entries(f.checks)) if (v) q.set(k, v.join("."));
}

export function decodeFilters(q: URLSearchParams, layers: Layer[]): FilterState {
  const f: FilterState = structuredClone(NO_FILTER);
  const range = (s: string | null): [number, number] | null => {
    const m = s?.match(/^([\d.]*)-([\d.]*)$/);
    if (!m) return null;
    const a = m[1] ? +m[1] : 0, b = m[2] ? +m[2] : Infinity;
    return Number.isNaN(a) || Number.isNaN(b) ? null : [a, b];
  };
  const d = range(q.get("d"));
  f.dist = d && d[0] <= d[1] && (d[0] > 0 || Number.isFinite(d[1])) ? d : null;
  for (const L of layers) for (const fc of L.facets) {
    if (fc.kind === "range") {
      const r = range(q.get(fc.id));
      const a = r ? Math.max(fc.min, r[0]) : fc.min, b = r ? Math.min(fc.max, r[1]) : fc.max;
      f.ranges[fc.id] = a <= b && (a > fc.min || b < fc.max) ? [a, b] : null;
    } else {
      const known = new Set(fc.options.map((o) => o.value));
      const sel = (q.get(fc.id) ?? "").split(".").filter(Boolean).map(Number).filter((n) => known.has(n));
      // prázdný nebo úplný výběr = bez filtru; kotva nesmí omylem skrýt všechno
      f.checks[fc.id] = sel.length && sel.length < known.size ? sel : null;
    }
  }
  return f;
}

/** Drží #kotvu v adrese v souladu s pohledem a umí pohled z kotvy obnovit. */
export class Anchor {
  private last = "";

  private stage: Stage;
  private hud: Hud;
  private layers: Layer[];
  private tours: Tours | null;

  constructor(stage: Stage, hud: Hud, layers: Layer[], tours: Tours | null = null) {
    this.stage = stage;
    this.hud = hud;
    this.layers = layers;
    this.tours = tours;
    addEventListener("hashchange", () => this.apply(location.hash, true));
    // dvakrát za sekundu stačí; replaceState nezanáší historii prohlížeče
    setInterval(() => this.write(), 500);
  }

  current(): string {
    const q = new URLSearchParams();
    const o = this.hud.selection;
    if (o) q.set("o", `${o.layer}:${o.name}`);
    const { camera, controls } = this.stage;
    q.set("c", [...camera.position.toArray(), ...controls.target.toArray()].map(round).join(","));
    encodeFilters(this.hud.filters.current, q);
    const t = this.tours?.current;
    if (t) {
      q.set("vylet", t.id);
      q.set("krok", String(t.step + 1));
    }
    return "#" + q.toString().replace(/%2C/g, ",").replace(/%3A/g, ":");
  }

  private write(): void {
    const h = this.current();
    if (h === this.last) return;
    this.last = h;
    history.replaceState(null, "", h);
  }

  /** Vrací false, když kotva nic použitelného neobsahuje. */
  apply(hash: string, fly = false): boolean {
    if (!hash || hash === "#" || hash === this.last) return false;
    const q = new URLSearchParams(hash.slice(1));
    this.hud.filters.set(decodeFilters(q, this.layers));

    const c = q.get("c")?.split(",").map(Number);
    const cam = c && c.length === 6 && c.every(Number.isFinite) ? c : null;
    if (cam) {
      const target = new Vector3(cam[3], cam[4], cam[5]);
      const pos = new Vector3(cam[0], cam[1], cam[2]);
      if (fly) this.stage.flyTo(target, pos.distanceTo(target), pos.clone().sub(target));
      else this.stage.jumpTo(target, pos.sub(target));
    }

    const tour = q.get("vylet");
    if (tour && this.tours) {
      // výlet si objekt i pohled nastaví sám; data výletů se teprve načítají
      const step = Math.max(1, parseInt(q.get("krok") ?? "1", 10) || 1) - 1;
      void this.tours.start(tour, step);
      this.last = hash;
      return true;
    }
    const ref = q.get("o");
    let obj: MapObject | undefined;
    if (ref) {
      const i = ref.indexOf(":");
      const L = this.layers.find((x) => x.id === ref.slice(0, i));
      obj = L?.objects.find((x) => x.name === ref.slice(i + 1));
    }
    if (obj) this.hud.select(obj, !cam);
    else this.hud.deselect();
    this.last = this.current();
    return !!(cam || obj);
  }
}
