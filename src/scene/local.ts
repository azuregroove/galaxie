import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  Points,
  PointsMaterial,
  LineBasicMaterial,
  LineSegments,
  Vector3,
} from "three";
import { Frame } from "../core/coords";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtNum, fmtPcFromLy, LY_PER_PC } from "../core/units";
import type { Layer } from "../layers/layer";
import type { Labels } from "../ui/labels";
import type { Stage } from "./stage";

export interface LocalData {
  vlna: { data: [number, number, number, number][] };
  bublina: { krok_deg: number; d: (number | null)[][] };
}

/** Body heliocentricky v pc (x k centru, y ke l = 90°, z k severu) → scéna v ly. */
const toScene = (sun: Vector3, x: number, y: number, z: number) =>
  new Vector3(sun.x + x * LY_PER_PC, sun.y + z * LY_PER_PC, sun.z - y * LY_PER_PC);

/**
 * Radcliffeova vlna (model Konietzka et al. 2024) a obálka Místní bubliny (O'Neill et al. 2024) – pipeline/okoli.py.
 * Vlna je čára barvená svislou rychlostí (modrá dolů, červená nahoru), bublina řídká síť poledníků a rovnoběžek.
 * Obě jsou objekty s kartou (hledání „Radcliffe“, „bublina“); výběr vrstvu zapne.
 */
export class LocalStructures implements Layer {
  readonly id = "okoli";
  readonly name = "Okolí Slunce (struktury)";
  readonly group = new Group();
  readonly objects: MapObject[];
  readonly filters = [];
  readonly facets = [];

  private on = false;
  private readonly wavePts: [number, number, number, number][];
  private readonly bubbleD: number[];
  private readonly button: HTMLButtonElement;

  constructor(d: LocalData, sun: Vector3, labels: Labels, button: HTMLButtonElement) {
    this.button = button;
    this.group.visible = false;
    this.wavePts = d.vlna.data;
    this.group.add(this.wave(sun, d.vlna.data), this.bubble(sun, d.bublina.krok_deg, d.bublina.d));
    // kotvy na skutečných bodech: střed vlny, obálka nad Sluncem ve směru l = 90°, b ≈ +30°
    const [x, y, z] = d.vlna.data[Math.floor(d.vlna.data.length / 2)];
    const wavePos = toScene(sun, x, y, z);
    labels.add("Radcliffeova vlna", wavePos, "anno", () => this.on, 150);
    const step = d.bublina.krok_deg, j = Math.floor((90 + 30) / step), i = Math.floor(90 / step);
    const rb = d.bublina.d[j][i] ?? 175;
    const bubblePos = Frame.dir((i + 0.5) * step, -90 + (j + 0.5) * step).multiplyScalar(rb * LY_PER_PC).add(sun);
    labels.add("Místní bublina", bubblePos, "anno", () => this.on, 150);
    this.bubbleD = d.bublina.d.flat().filter((v): v is number => v != null).sort((p, q) => p - q);
    this.objects = [
      { layer: this.id, index: 0, name: "Radcliffeova vlna", pos: wavePos, anchor: wavePos, distLy: wavePos.distanceTo(sun),
        color: "#ff6a8a", major: true, aliases: ["Radcliffe Wave", "radcliffova vlna", "vlna"] },
      { layer: this.id, index: 1, name: "Místní bublina", pos: bubblePos, anchor: bubblePos, distLy: bubblePos.distanceTo(sun),
        color: "#4fd1c5", major: true, aliases: ["Local Bubble", "Local Chimney", "místní komín", "bublina"] },
    ];
    button.onclick = () => this.set(!this.on);
  }

  private set(on: boolean): void {
    this.on = on;
    this.group.visible = on;
    this.button.setAttribute("aria-pressed", String(on));
    this.button.textContent = on ? "Okolí: zap" : "Okolí: vyp";
  }

  onSelect(o: MapObject | null): void {
    if (o && o.layer === this.id && !this.on) this.set(true);
  }

  setFilter(): void { /* dva objekty */ }
  applyFilter(): void { /* do filtrů nepatří */ }
  labelCandidates(): MapObject[] { return []; }
  kindName(o: MapObject): string { return o.index === 0 ? "vlna plynu a prachu (model)" : "dutina po supernovách (model)"; }
  flyDistance(o: MapObject): number { return o.index === 0 ? 9000 : 1500; }
  update(_: Stage): void { /* statické */ }

  cardHtml(o: MapObject): string {
    return o.index === 0 ? this.waveCard(o) : this.bubbleCard(o);
  }

  private waveCard(o: MapObject): string {
    const w = this.wavePts;
    const z = w.map((p) => p[2]), vz = w.map((p) => p[3]);
    const near = Math.min(...w.map((p) => Math.hypot(p[0], p[1], p[2])));
    let len = 0;
    for (let i = 1; i < w.length; i++) len += Math.hypot(w[i][0] - w[i - 1][0], w[i][1] - w[i - 1][1], w[i][2] - w[i - 1][2]);
    const pc = (v: number) => `${fmtNum(v, 0)} pc (${fmtLy(v * LY_PER_PC)})`;
    return `<div class="kind" style="color:#ff6a8a">Struktura v okolí Slunce · model z 3D map prachu</div>
      <h3>${escapeHtml(o.name)}</h3>
      <p>Úzký, zvlněný řetěz hustých mračen plynu a prachu, na kterém leží většina blízkých oblastí, kde vznikají
        hvězdy – mimo jiné Orion, Cefeus, mlhovina Severní Amerika a Cygnus X. Objevili ji v roce 2020 díky 3D mapám prachu
        z dat Gaia; dřív se tatáž mračna připisovala Gouldovu pásu. Podle novějšího výzkumu vlna kmitá napříč
        rovinou Galaxie, jak ji táhne gravitace disku, a zároveň se pomalu vzdaluje od centra.</p>
      <dl>
        <dt>Délka</dt><dd>asi 2,7 kpc (${fmtLy(2700 * LY_PER_PC)}) podle objevitelů; čára modelu ${pc(len)}</dd>
        <dt>Plyn</dt><dd>asi 3 miliony hmotností Slunce</dd>
        <dt>Tvar</dt><dd>tlumená sinusovka, průměrná perioda asi 2 kpc, největší výchylka asi 160 pc (objevitelé)</dd>
        <dt>Výška nad rovinou</dt><dd>v modelu od ${fmtNum(Math.min(...z), 0)} do +${fmtNum(Math.max(...z), 0)} pc</dd>
        <dt>Svislá rychlost</dt><dd>v modelu ${fmtNum(Math.min(...vz), 1)} až +${fmtNum(Math.max(...vz), 1)} km/s
          (barva čáry: modrá dolů, červená nahoru)</dd>
        <dt>Nejblíž Slunci</dt><dd>${pc(near)} (body modelu; Slunce leží do 300 pc od vlny)</dd>
      </dl>
      <p class="dim">Poloha je model proložený mračny, ne ostrá hranice. Kmitání zjistili z pohybů plynu (CO) a mladých
        hvězdokup; podle autorů se ve vlně mohla zrodit i hvězdokupa, jejíž supernovy vyfoukly Místní bublinu.</p>
      <div class="src">Model: Konietzka R. et al. 2024, Nature, „The Radcliffe Wave is oscillating“, doi:10.1038/s41586-024-07127-3
        (arXiv:2402.12596), data Harvard Dataverse doi:10.7910/DVN/F98QHY (CC0). Objev: Alves J. et al. 2020, Nature,
        doi:10.1038/s41586-019-1874-z (arXiv:2001.08748) – délka, hmotnost, perioda a výchylka z abstraktu.
        Výšky, rychlosti a vzdálenost spočítané z bodů modelu.</div>`;
  }

  private bubbleCard(o: MapObject): string {
    const d = this.bubbleD;
    const q = (f: number) => d[Math.min(d.length - 1, Math.floor(f * d.length))];
    return `<div class="kind" style="color:#4fd1c5">Struktura v okolí Slunce · model z 3D map prachu</div>
      <h3>${escapeHtml(o.name)}</h3>
      <p>Slunce leží uvnitř řídké dutiny v mezihvězdném prostředí, kterou vyfoukly výbuchy supernov. Její stěnu tvoří zhuštěný prach a plyn, na kterém leží řada známých mračen.
        Dutina je hodně nepravidelná a směrem na galaktický sever se otevírá jako „komín“, kterým látka unikla
        nad disk Galaxie. Síť na mapě ukazuje místo, kde je stěna nejhustší.</p>
      <dl>
        <dt>Vzdálenost stěny</dt><dd>v průměru asi 170 pc (${fmtLy(170 * LY_PER_PC)}), podle směru od 70 do přes 600 pc (autoři);
          v mřížce mapy ${fmtNum(q(0), 0)}–${fmtNum(q(1), 0)} pc, medián ${fmtNum(q(0.5), 0)} pc</dd>
        <dt>Tloušťka stěny</dt><dd>typicky 35 pc</dd>
        <dt>Prach a plyn ve stěně</dt><dd>(6,0 ± 0,7) × 10⁵ hmotností Slunce</dd>
        <dt>Od nás</dt><dd>uvnitř – Slunce je v dutině, kotva karty je na stěně nad námi (${fmtLy(o.distLy ?? 0)} · ${fmtPcFromLy(o.distLy ?? 0)})</dd>
      </dl>
      <p class="dim">Stěna je vrchol hustoty prachu v daném směru; síť je zjednodušená do buněk 4° × 4° (medián).
        Kde data stěnu nenacházejí (hlavně kolem galaktického severního pólu, ve směru „komína“), síť chybí.</p>
      <div class="src">O'Neill T. J. et al. 2024, ApJ 973, 136, „The Local Bubble is a Local Chimney“ (arXiv:2403.04961) –
        čísla z abstraktu; data Harvard Dataverse doi:10.7910/DVN/INB1RB (CC0), z 3D mapy prachu Edenhofer et al. 2024.</div>`;
  }

  private wave(sun: Vector3, pts: [number, number, number, number][]): Group {
    const pos: number[] = [], col: number[] = [];
    const down = new Color(0x5aa0ff), up = new Color(0xff6a8a), c = new Color();
    for (const [x, y, z, vz] of pts) {
      const p = toScene(sun, x, y, z);
      pos.push(p.x, p.y, p.z);
      c.lerpColors(down, up, Math.min(1, Math.max(0, (vz + 15) / 30)));
      col.push(c.r, c.g, c.b);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("color", new Float32BufferAttribute(col, 3));
    // čára 1 px se v hustém okolí Slunce ztrácí – podél ní ještě body pevné velikosti
    const w = new Group();
    w.add(new Line(g, new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false })),
      new Points(g, new PointsMaterial({ vertexColors: true, size: 4, sizeAttenuation: false, transparent: true, opacity: 0.8,
        blending: AdditiveBlending, depthWrite: false })));
    return w;
  }

  private bubble(sun: Vector3, step: number, d: (number | null)[][]): LineSegments {
    const nb = d.length, nl = d[0].length;
    const at = (j: number, i: number) => {
      const r = d[j][(i + nl) % nl];
      return r == null ? null : Frame.dir((((i + nl) % nl) + 0.5) * step, -90 + (j + 0.5) * step)
        .multiplyScalar(r * LY_PER_PC).add(sun);
    };
    const pos: number[] = [];
    const seg = (a: Vector3 | null, b: Vector3 | null) => {
      if (a && b) pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    };
    // rovnoběžky po 12°, poledníky po 24° (každá 3., resp. 6. buňka)
    for (let j = 1; j < nb - 1; j += 3) for (let i = 0; i < nl; i++) seg(at(j, i), at(j, i + 1));
    for (let i = 0; i < nl; i += 6) for (let j = 0; j < nb - 1; j++) seg(at(j, i), at(j + 1, i));
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    return new LineSegments(g, new LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.35,
      blending: AdditiveBlending, depthWrite: false }));
  }
}
