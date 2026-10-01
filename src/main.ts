import "./styles.css";
import { Vector3 } from "three";
import { Frame } from "./core/coords";
import type { Manifest } from "./core/types";
import { BlackHoleLayer, type BlackHoleData } from "./layers/blackHoles";
import { CatalogLayer, type CatalogData } from "./layers/catalog";
import { ExoplanetLayer, type ExoData } from "./layers/exoplanets";
import { SolarLayer } from "./layers/solar";
import type { Layer } from "./layers/layer";
import { ARMS, armRadius, armXZ } from "./scene/arms";
import { GaiaArms } from "./scene/gaiaArms";
import { ARM_GAIN_DEFAULT, buildBackdrop } from "./scene/backdrop";
import { LY_PER_PC } from "./core/units";
import { Overlays } from "./scene/overlays";
import { Stage } from "./scene/stage";
import { SystemView } from "./system/view";
import { initImages } from "./ui/images";
import { applyNames, type NamesData } from "./core/names";
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

    if (file("obrazky")) initImages(DATA + file("obrazky"));
    // jména jsou jen doplněk – když se nenačtou, mapa jede dál bez nich
    const names = file("jmena") ? await getJson<NamesData>(file("jmena")!).catch(() => null) : null;
    const frame = new Frame(manifest.r0_pc);
    const stage = new Stage(document.getElementById("stage")!, css("--void"));
    const backdrop = buildBackdrop(stage.glow);
    stage.scene.add(backdrop);
    armSlider(backdrop.material.uniforms.armGain);
    const labels = new Labels(document.getElementById("labels")!, stage);
    const overlays = new Overlays(stage, frame, labels, css);
    const armGain = backdrop.material.uniforms.armGain;
    const gaiaBtn = document.getElementById("gaiaArms") as HTMLButtonElement | null;
    if (gaiaBtn && file("gaia-ramena")) new GaiaArms(DATA + file("gaia-ramena"), stage.scene, frame.sun, gaiaBtn);
    else gaiaBtn?.remove();
    for (const a of ARMS) {
      // popisek doprostřed rozsahu modelu, kousek nad rovinu, ať nesplývá s body ramene
      const beta = (a.betaMin + a.betaMax) / 2;
      const [x, z] = armXZ(armRadius(a, beta), beta, LY_PER_PC * 1000);
      labels.add(a.name, new Vector3(x, 400, z), "anno", () => armGain.value > 0 && stage.viewDistance > 12000, 200);
    }

    const layers: Layer[] = [];
    const systemView = new SystemView(stage, stage.glow);
    const solar = manifest.katalogy.find((k) => k.id === "slunecni-soustava");
    const small = manifest.katalogy.find((k) => k.id === "mala-telesa");
    if (solar) layers.push(new SolarLayer(frame, solar, DATA + solar.soubor, systemView, small ? { meta: small, url: DATA + small.soubor } : null));
    if (exo) {
      const L = new ExoplanetLayer(exo, frame, stage.glow, css);
      L.systemView = systemView;
      layers.push(L);
    }
    if (bh) layers.push(new BlackHoleLayer(bh, frame, stage, css));
    cats.forEach((c, i) => layers.push(new CatalogLayer(c as CatalogData, manifest.katalogy.find((k) => k.id === generic[i])!, frame, stage.glow, css)));
    layers.forEach((L) => stage.scene.add(L.group));
    if (names) applyNames(layers.flatMap((L) => L.objects), names);

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

function armSlider(u: { value: number }): void {
  const input = document.getElementById("armGain") as HTMLInputElement | null;
  const out = document.getElementById("armGainVal");
  if (!input) return;
  let v = ARM_GAIN_DEFAULT;
  try {
    const saved = parseFloat(localStorage.getItem("galaxie.armGain") ?? "");
    if (saved >= 0 && saved <= 7.5) v = saved;
  } catch { /* soukromé okno */ }
  const set = (x: number) => {
    u.value = x;
    input.value = String(x);
    if (out) out.textContent = x === 0 ? "vyp" : `${Math.round(x * 100)} %`;
  };
  set(v);
  input.addEventListener("input", () => {
    const x = parseFloat(input.value);
    set(x);
    try { localStorage.setItem("galaxie.armGain", String(x)); } catch { /* nevadí */ }
  });
}

main();
