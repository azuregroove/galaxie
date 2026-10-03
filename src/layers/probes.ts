import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Points,
  PointsMaterial,
  type Texture,
  Vector3,
} from "three";
import { Frame } from "../core/coords";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtNum } from "../core/units";
import type { Stage } from "../scene/stage";
import { fmtEventDate, type Probe, type ProbeData } from "../system/probes";
import type { Labels } from "../ui/labels";
import type { Facet, Layer, LayerFilter } from "./layer";

const AU_KM = 149597870.7;
const LY_AU = 63241.077;
const AU_PER_YEAR = (kms: number) => (kms * 86400 * 365.25) / AU_KM;
/** Jak daleko do budoucnosti se kreslí přímka směru letu, a po kolika letech tečky. */
const AHEAD_YEARS = 20000;
const TICK_YEARS = 5000;
/** Dál od Slunce (ly) jsou přímky kratší než pixel – vrstva se schová. */
const VIS_LY = 60;

type ProbeObj = MapObject & { probe: Probe; tip: Vector3 };

/**
 * Sondy mířící ze Sluneční soustavy v mapě Galaxie. Skutečné dráhy (do ~170 au) jsou v tomhle měřítku pod pixel,
 * proto se kreslí směr letu: přímka z dnešní polohy podle rychlosti na konci efemeridy JPL na 20 000 let dopředu.
 * Podrobná dráha s průlety kolem planet je v pohledu Sluneční soustava.
 */
export class ProbeLayer implements Layer {
  readonly id = "sondy";
  readonly name = "Sondy";
  readonly group = new Group();
  readonly objects: ProbeObj[];
  readonly filters: LayerFilter[] = [];
  readonly facets: Facet[] = [];

  private on = true;
  private near = false;
  private readonly button: HTMLButtonElement;
  private readonly openSolar: (probe: string) => void;
  private readonly data: ProbeData;

  constructor(d: ProbeData, frame: Frame, labels: Labels, glow: Texture, button: HTMLButtonElement,
    openSolar: (probe: string) => void) {
    this.data = d;
    this.button = button;
    this.openSolar = openSolar;
    this.group.position.copy(frame.sun);
    button.onclick = () => this.toggle();
    this.objects = d.sondy.map((p, i) => {
      // galaktické x, y, z (au) → scéna v ly vůči Slunci (x, z, −y)
      const [gx, gy, gz] = p.dnes.xyz_gal_au;
      const now = new Vector3(gx, gz, -gy).divideScalar(LY_AU);
      const dir = Frame.dir(p.smer_gal.l, p.smer_gal.b);
      const perYearLy = AU_PER_YEAR(p.smer_gal.v_kms) / LY_AU;
      const pts: number[] = [];
      const ticks: number[] = [];
      for (let y = 0; y <= AHEAD_YEARS; y += TICK_YEARS / 10) {
        const v = now.clone().addScaledVector(dir, y * perYearLy);
        pts.push(v.x, v.y, v.z);
        if (y > 0 && y % TICK_YEARS === 0) ticks.push(v.x, v.y, v.z);
      }
      const geo = new BufferGeometry();
      geo.setAttribute("position", new Float32BufferAttribute(pts, 3));
      this.group.add(new Line(geo, new LineBasicMaterial({ color: p.barva, transparent: true, opacity: 0.8 })));
      const tg = new BufferGeometry();
      tg.setAttribute("position", new Float32BufferAttribute(ticks, 3));
      this.group.add(new Points(tg, new PointsMaterial({ color: p.barva, size: 5, sizeAttenuation: false, map: glow,
        transparent: true, depthWrite: false })));
      const tip = now.clone().addScaledVector(dir, AHEAD_YEARS * perYearLy).add(frame.sun);
      const year = Number(p.dnes.datum.slice(0, 4)) + AHEAD_YEARS;
      labels.add(`${p.jmeno} · r. ${year.toLocaleString("cs-CZ")}`, tip, "anno", () => this.on && this.near, 180);
      const pos = now.clone().add(frame.sun);
      return {
        layer: this.id, index: i, name: p.jmeno, pos, anchor: pos, distLy: now.length(), color: p.barva,
        aliases: ["sonda", "sondy"], probe: p, tip,
      };
    });
  }

  private toggle(): void {
    this.on = !this.on;
    this.button.setAttribute("aria-pressed", String(this.on));
    this.button.textContent = `Sondy: ${this.on ? "zap" : "vyp"}`;
  }

  update(stage: Stage): void {
    this.near = stage.camera.position.distanceTo(this.group.position) < VIS_LY;
    this.group.visible = this.on && this.near;
  }

  setFilter(): void {}
  applyFilter(): void {}
  labelCandidates(): MapObject[] { return []; }
  kindName(): string { return "vesmírná sonda"; }
  /** z dálky, aby byl vidět celý směr letu (přímky jsou dlouhé zhruba 1 ly) */
  flyDistance(): number { return 1.6; }

  detailLabel(): string {
    return "Dráha ve Sluneční soustavě ▸";
  }

  openDetail(o: MapObject): void {
    this.openSolar(o.name);
  }

  cardHtml(mo: MapObject): string {
    const o = mo as ProbeObj, p = o.probe;
    const r = p.dnes.r_au;
    const lightH = (r * AU_KM) / 299792.458 / 3600;
    const auYear = AU_PER_YEAR(p.smer_gal.v_kms);
    const aheadLy = (auYear * AHEAD_YEARS) / LY_AU;
    const today = fmtEventDate(p.dnes.datum);
    const events = p.udalosti.map(([d, t]) => `<li><b>${escapeHtml(fmtEventDate(d))}</b> – ${escapeHtml(t)}</li>`).join("");
    return `<div class="kind" style="color:${escapeHtml(p.barva)}">Vesmírná sonda</div>
      <h3>${escapeHtml(p.jmeno)}</h3>
      <dl>
        <dt>Od Slunce</dt><dd>${fmtNum(r, 1)} au <span class="dim">(k ${today})</span> · ${fmtNum(r / LY_AU, 4)} ly<br>
          <span class="dim">signál ke Slunci letí ${fmtNum(lightH, 1)} h</span></dd>
        <dt>Rychlost vůči Slunci</dt><dd>${fmtNum(p.dnes.v_kms, 1)} km/s <span class="dim">(k ${today})</span><br>
          <span class="dim">na konci efemeridy JPL ${fmtNum(p.smer_gal.v_kms, 1)} km/s = ${fmtNum(auYear, 2)} au za rok</span></dd>
        <dt>Míří</dt><dd>gal. l ${fmtNum(p.smer_gal.l, 1)}° · b ${p.smer_gal.b >= 0 ? "+" : ""}${fmtNum(p.smer_gal.b, 1)}°<br>
          <span class="dim">za ${AHEAD_YEARS.toLocaleString("cs-CZ")} let urazí asi ${fmtNum(aheadLy, 2)} ly (přímka v mapě, tečky po ${TICK_YEARS.toLocaleString("cs-CZ")} letech)</span></dd>
        <dt>Start</dt><dd>${escapeHtml(p.start)}</dd>
        ${p.hmotnost_kg != null ? `<dt>Hmotnost</dt><dd>${p.hmotnost_kg} kg</dd>` : ""}
      </dl>
      <h4>Z historie mise</h4>
      <ul class="events">${events}</ul>
      <p class="dim">${escapeHtml(p.pozn)} Přímka za koncem efemeridy je jen prodloužení podle poslední rychlosti – bez gravitace Slunce
        a okolních hvězd, takže je orientační.</p>
      <div class="src">Dráha, poloha a časová osa: NASA/JPL Horizons (objekt ${escapeHtml(p.horizons)}, staženo ${escapeHtml(this.data.stazeno.slice(0, 10))}).</div>`;
  }
}
