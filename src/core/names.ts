import type { MapObject } from "./types";

/** Obsah jmena.json (pipeline/jmena.py). */
export interface NamesData {
  stazeno: string;
  exoplanety: Record<string, { iau?: string; planety?: Record<string, string>; od?: string }>;
  cs: Record<string, Record<string, string[]>>;
}

/**
 * Doplní objektům vlastní jména: u exoplanet jména IAU (hvězda a planety), u ostatních vrstev česká jména.
 * Musí proběhnout před stavbou indexu hledání (Hud).
 */
export function applyNames(objects: MapObject[], n: NamesData): void {
  for (const o of objects) {
    if (o.layer === "exoplanety") {
      const e = n.exoplanety[o.name];
      if (!e) continue;
      if (e.iau) o.nick = e.iau;
      o.planetNames = e.planety;
      o.aliases = [...(o.aliases ?? []), ...(e.iau ? [e.iau] : []), ...Object.values(e.planety ?? {})];
    } else {
      const cs = n.cs[o.layer]?.[o.name];
      if (!cs) continue;
      // „M45“ není jméno pro kartu, jen pro hledání
      const nice = cs.find((x) => !/^M\d+$/.test(x));
      if (nice) {
        o.nick = nice;
        o.label = nice;
      }
      o.aliases = [...(o.aliases ?? []), ...cs];
    }
  }
}
