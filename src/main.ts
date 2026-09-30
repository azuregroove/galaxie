import "./styles.css";
import { Vector3 } from "three";
import { Frame } from "./core/coords";
import type { Manifest } from "./core/types";
import { BlackHoleLayer, type BlackHoleData } from "./layers/blackHoles";
import { CatalogLayer, type CatalogData } from "./layers/catalog";
import { ExoplanetLayer, type ExoData } from "./layers/exoplanets";
import type { Layer } from "./layers/layer";
import { buildBackdrop } from "./scene/backdrop";
import { Overlays } from "./scene/overlays";
import { Stage } from "./scene/stage";
import { SystemView } from "./system/view";
import { Anchor } from "./ui/anchor";
import { Hud } from "./ui/hud";
import { Labels } from "./ui/labels";

const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const DATA = `${import.meta.env.BASE_URL}data/`;

async function getJson<T>(file: string): Promise<T> {
  const r = await fetch(DATA + file);
  if (!r.ok) throw new Error(`${file}: HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

async function main() {
  const status = document.getElementById("status")!;
  try {
    const manifest = await getJson<Manifest>("manifest.json");
    const file = (id: string) => manifest.katalogy.find((k) => k.id === id)?.soubor;
    // katalogy etapy 3 mají společný formát (pipeline/katalog.py); pořadí určuje pořadí v legendě
    const generic = ["hvezdokupy", "mlhoviny", "neutronove-hvezdy"].filter(file);
    const [bh, exo, ...cats] = await Promise.all([
      file("cerne-diry") ? getJson<BlackHoleData>(file("cerne-diry")!) : null,
      file("exoplanety") ? getJson<ExoData>(file("exoplanety")!) : null,
      ...generic.map((id) => getJson<CatalogData>(file(id)!)),
    ]);

    const frame = new Frame(manifest.r0_pc);
    const stage = new Stage(document.getElementById("stage")!, css("--void"));
    stage.scene.add(buildBackdrop(stage.glow, frame.sun));
    const labels = new Labels(document.getElementById("labels")!, stage);
    const overlays = new Overlays(stage, frame, labels, css);

    const layers: Layer[] = [];
    if (exo) {
      const L = new ExoplanetLayer(exo, frame, stage.glow, css);
      L.systemView = new SystemView(stage, stage.glow);
      layers.push(L);
    }
    if (bh) layers.push(new BlackHoleLayer(bh, frame, stage, css));
    cats.forEach((c, i) => layers.push(new CatalogLayer(c as CatalogData, manifest.katalogy.find((k) => k.id === generic[i])!, frame, stage.glow, css)));
    layers.forEach((L) => stage.scene.add(L.group));

    const hud = new Hud(stage, frame, layers, overlays, labels, manifest);
    stage.jumpTo(frame.sun.clone().add(new Vector3(9000, 0, 0)), new Vector3(-23000, 52000, 42000));
    const anchor = new Anchor(stage, hud, layers);
    anchor.apply(location.hash);
    stage.start();
    status.remove();
    (window as unknown as { galaxie: unknown }).galaxie = { stage, hud, layers, frame, anchor };
  } catch (err) {
    console.error(err);
    status.textContent = `Nepodařilo se načíst data: ${(err as Error).message}`;
    status.classList.add("error");
  }
}

main();
