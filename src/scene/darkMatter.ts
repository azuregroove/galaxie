import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtNum, LY_PER_PC } from "../core/units";
import type { Layer } from "../layers/layer";
import type { Labels } from "../ui/labels";
import type { Stage } from "./stage";

// McMillan 2017, MNRAS, doi:10.1093/mnras/stw2759, tab. 3 (hlavní model, halo NFW): ρ0,h = 0,00854 M☉/pc³, rh = 19,6 kpc,
// ρh,⊙ = 0,0101 M☉/pc³ (= 0,38 GeV/cm³), Mv = 1,37 × 10¹² M☉, R0 = 8,21 kpc. Ověřeno z arXiv:1608.00971.
const RHO0 = 0.00854; // M☉/pc³
const RH_KPC = 19.6;
const RHO_SUN = 0.0101;
const MV = 1.37e12;
const R0_MCM = 8.21;
// Viriální poloměr: koule s průměrnou hustotou 200 × kritické, H = 70,4 km/s/Mpc (tamtéž, odd. 2.4) → přepočet zde
const RHO_CRIT = 137.5; // M☉/kpc³ = 3H²/(8πG)
const RV_KPC = Math.cbrt(MV / ((4 / 3) * Math.PI * 200 * RHO_CRIT));

const rho = (rKpc: number) => { const x = rKpc / RH_KPC; return RHO0 / (x * (1 + x) ** 2); };
/** hmotnost halo uvnitř koule o poloměru r (M☉) */
const mass = (rKpc: number) => {
  const x = rKpc / RH_KPC;
  return 4 * Math.PI * RHO0 * 1e9 * RH_KPC ** 3 * (Math.log(1 + x) - x / (1 + x));
};

const SHELLS: [number, string][] = [
  [R0_MCM, "ve vzdálenosti Slunce"],
  [RH_KPC, "škálový poloměr halo"],
  [50, "50 kpc"],
];

const fmtMass = (m: number) => {
  const e = Math.floor(Math.log10(m));
  return `${fmtNum(m / 10 ** e, 1)} × 10${String(e).replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+d])} M☉`;
};

/**
 * Halo temné hmoty podle modelu McMillan 2017: průsvitné koule stejné hustoty kolem centra Galaxie.
 * Model z gravitace (rotace Galaxie, pohyby hvězd a maserů), ne pozorované shluky; tvar je předpoklad (koule).
 */
export class DarkMatterLayer implements Layer {
  readonly id = "temna-hmota";
  readonly name = "Temná hmota (model)";
  readonly group = new Group();
  readonly objects: MapObject[];
  readonly filters = [];
  readonly facets = [];

  private on = false;
  private readonly obj: MapObject;
  private readonly button: HTMLButtonElement;

  constructor(sun: Vector3, labels: Labels, button: HTMLButtonElement) {
    this.button = button;
    this.group.visible = false;
    const kly = 1000 * LY_PER_PC;
    const dir = new Vector3(-0.55, 0.45, 0.7).normalize();
    for (const [r, what] of SHELLS) {
      const m = new ShaderMaterial({
        uniforms: { a: { value: 0.05 + 0.1 * Math.min(1, Math.log10(rho(R0_MCM) / rho(r) + 1)) } },
        vertexShader: /* glsl */ `
          varying float vRim;
          void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.);
            vec3 n = normalize(normalMatrix * normal);
            vRim = 1. - abs(dot(n, normalize(-mv.xyz)));
            gl_Position = projectionMatrix * mv; }`,
        fragmentShader: /* glsl */ `
          uniform float a; varying float vRim;
          void main(){ gl_FragColor = vec4(0.55, 0.45, 1.0, (0.12 + pow(vRim, 3.) * 0.9) * a); }`,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        blending: AdditiveBlending,
      });
      const s = new Mesh(new SphereGeometry(r * kly, 96, 48), m);
      s.renderOrder = -2;
      this.group.add(s);
      labels.add(`${fmtNum(rho(r) * 1000, rho(r) < 0.001 ? 2 : 1)} M☉ na 1000 pc³ · uvnitř ${fmtMass(mass(r))} (${what})`,
        dir.clone().multiplyScalar(r * kly), "anno", () => this.on, 120);
    }
    const anchor = new Vector3(0, RH_KPC * kly, 0);
    this.obj = {
      layer: this.id, index: 0, name: "Halo temné hmoty (model)", pos: anchor, anchor, distLy: anchor.distanceTo(sun),
      color: "#8c73ff", major: true, aliases: ["temná hmota", "temna hmota", "dark matter", "halo"],
    };
    this.objects = [this.obj];
    button.onclick = () => this.set(!this.on);
  }

  private set(on: boolean): void {
    this.on = on;
    this.group.visible = on;
    this.button.setAttribute("aria-pressed", String(on));
    this.button.textContent = on ? "Temná hmota: zap" : "Temná hmota: vyp";
  }

  onSelect(o: MapObject | null): void {
    if (o === this.obj && !this.on) this.set(true);
  }

  setFilter(): void { /* jeden objekt */ }
  applyFilter(): void { /* do filtrů nepatří */ }
  labelCandidates(): MapObject[] { return []; }
  kindName(): string { return "model rozložení temné hmoty"; }
  flyDistance(): number { return 260000; }
  update(_: Stage): void { /* statické */ }

  cardHtml(o: MapObject): string {
    const sunMass = mass(R0_MCM);
    // 0,0101 M☉/pc³ → kg/m³ a krát objem Země (1,083 × 10²¹ m³)
    const kgM3 = (RHO_SUN * 1.989e30) / 2.938e49;
    return `<div class="kind" style="color:#8c73ff">Model z gravitace, ne pozorované shluky</div>
      <h3>${escapeHtml(o.name)}</h3>
      <p>Hvězdy a plyn v Galaxii obíhají rychleji, než by dovolila jen viditelná hmota. Tu „chybějící“ hmotu
        nikdo neviděl, víme o ní jen z gravitace. Model ji popisuje jako kulové halo, nejhustší u centra a řídnoucí ven.
        Slupky ukazují místa stejné hustoty.</p>
      <dl>
        <dt>Hustota u Slunce</dt><dd>${fmtNum(RHO_SUN, 4)} M☉/pc³ <span class="dim">(0,38 GeV/cm³; v objemu celé Země ≈ ${fmtNum(kgM3 * 1.083e21, 1)} kg – přepočet)</span></dd>
        <dt>Uvnitř dráhy Slunce</dt><dd>${fmtMass(sunMass)}</dd>
        <dt>Celkem (viriální)</dt><dd>${fmtMass(MV)} do ~${fmtNum(RV_KPC, 0)} kpc (${fmtLy(RV_KPC * 1000 * LY_PER_PC)}) – asi 25× víc než všechny hvězdy</dd>
        <dt>Profil</dt><dd>NFW, škálový poloměr ${fmtNum(RH_KPC, 1)} kpc</dd>
      </dl>
      <p class="dim">Tvar halo (koule) a průběh hustoty u centra jsou předpoklady modelu. Místní hustota má podle autora
        statistickou nejistotu ±0,04 GeV/cm³, systematická může být větší. Model počítá se Sluncem 8,21 kpc od centra, mapa s 8,15 kpc (Reid et al. 2019).
        Jednotlivé shluky (subhala) zatím pozorované nejsou.</p>
      <div class="src">McMillan P.J. 2017, MNRAS, doi:10.1093/mnras/stw2759 (arXiv:1608.00971), tab. 3 – hlavní model (nejlepší fit; střední hodnota
        viriální hmotnosti v abstraktu (1,30 ± 0,30) × 10¹² M☉). Viriální poloměr přepočten
        z Mv pro 200 × kritickou hustotu (H = 70,4 km/s/Mpc, jako v článku).</div>`;
  }
}
