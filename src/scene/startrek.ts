import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Points,
  ShaderMaterial,
  SphereGeometry,
  type Texture,
  Vector3,
} from "three";
import type { MapObject } from "../core/types";
import { escapeHtml, fmtLy, fmtPcFromLy, LY_PER_PC } from "../core/units";
import type { Layer, LayerFilter } from "../layers/layer";
import type { Stage } from "./stage";

interface Power { id: string; nazev: string; en: string; barva: string; kvadrant: string; bez_polohy?: number }
interface System {
  jmeno: string; mocnost: string | null; jak: "hvezda" | "vypocet"; proc: string; simbad: string | null;
  kvadrant: string | null; era: string | null; xyz: [number, number, number]; zdroje: string[];
}
interface Far { mocnost: string; xyz: [number, number, number]; polomer_ly: number; zdroj: string }
export interface StarTrekData {
  stazeno: string; upozorneni: string; mocnosti: Power[]; soustavy: System[]; vzdalene: Far[];
  statistika: { stranek: number; soustav: number; skutecne_hvezdy: number; vypocet: number };
}

type Obj = MapObject & { power: Power | null; sys?: System; far?: Far; inst: number };

/** Bublina kolem soustavy (ly): Star Charts kreslí území jako souvislé oblasti kolem obydlených soustav. */
const BUBBLE_LY = 14;
// hlavní světy – popisky i z dálky
const CAPITALS = new Set(["Sol", "Vulcan", "Qo'noS", "Romulus", "Cardassian", "Ferenginar", "Bajoran", "Breen", "Tholia",
  "Andorian", "Tellar", "Gorn", "Talar", "Risa", "Betazed", "Trill", "Wolf 359", "Khitomer", "Deep Space 9"]);

const wikiUrl = (src: string) => {
  const [wiki, ...t] = src.split(":");
  return `https://${wiki}.fandom.com/wiki/${encodeURIComponent(t.join(":").replace(/ /g, "_"))}`;
};

/**
 * Fanouškovská vrstva Star Trek (pipeline/startrek.py): soustavy mocností z Memory Alpha a Memory Beta,
 * skutečné hvězdy na skutečných místech, fiktivní soustavy vypočtené z uvedených vzdáleností, vzdálené mocnosti
 * jako schematické oblasti. Celé je to FIKCE a v kartě to tak stojí.
 */
export class StarTrekLayer implements Layer {
  readonly id = "startrek";
  readonly name = "Star Trek (fikce)";
  readonly group = new Group();
  readonly objects: Obj[] = [];
  readonly filters: LayerFilter[];
  readonly facets = [];

  private readonly data: StarTrekData;
  private readonly powers = new Map<string, Power>();
  private readonly bubbles: InstancedMesh;
  private readonly radii: number[] = [];
  private readonly centers: Vector3[] = [];
  private readonly vis: BufferAttribute;
  private readonly points: Points;

  constructor(data: StarTrekData, sun: Vector3, glow: Texture) {
    this.data = data;
    const root = document.documentElement.style;
    data.mocnosti.forEach((p, i) => {
      this.powers.set(p.id, p);
      root.setProperty(`--trek-${i}`, p.barva);
    });
    // soustavy bez příslušnosti (často skutečné hvězdy zmíněné v seriálech) – vlastní šedý přepínač
    if (data.soustavy.some((s) => !s.mocnost)) {
      const none: Power = { id: "_bez", nazev: "Bez příslušnosti", en: "unaffiliated", barva: "#8a8f99", kvadrant: "AB" };
      data.mocnosti.push(none);
      this.powers.set(none.id, none);
      root.setProperty(`--trek-${data.mocnosti.length - 1}`, none.barva);
      for (const s of data.soustavy) s.mocnost ??= none.id;
    }
    const placed = new Set([...data.soustavy.map((s) => s.mocnost), ...data.vzdalene.map((f) => f.mocnost)]);
    this.filters = data.mocnosti.filter((p) => placed.has(p.id))
      .map((p) => ({ key: p.id, name: p.nazev, color: `--trek-${data.mocnosti.indexOf(p)}`, on: false }));

    const toScene = ([x, y, z]: number[]) => new Vector3(sun.x + x * LY_PER_PC, sun.y + z * LY_PER_PC, sun.z - y * LY_PER_PC);
    const items: { pos: Vector3; r: number; color: Color; obj: Obj }[] = [];
    for (const s of data.soustavy) {
      const pos = toScene(s.xyz);
      const power = s.mocnost ? this.powers.get(s.mocnost) ?? null : null;
      const obj: Obj = {
        layer: this.id, index: this.objects.length, name: s.jmeno, pos, anchor: pos, distLy: pos.distanceTo(sun),
        color: power ? `var(--trek-${data.mocnosti.indexOf(power)})` : "var(--dim)", hidden: true,
        major: CAPITALS.has(s.jmeno), aliases: [power?.en ?? "", "Star Trek"], power, sys: s, inst: items.length,
      };
      this.objects.push(obj);
      items.push({ pos, r: BUBBLE_LY, color: new Color(power?.barva ?? "#888"), obj });
    }
    for (const f of data.vzdalene) {
      const pos = toScene(f.xyz);
      const power = this.powers.get(f.mocnost) ?? null;
      const obj: Obj = {
        layer: this.id, index: this.objects.length, name: `Oblast: ${power?.nazev ?? f.mocnost}`, pos, anchor: pos,
        distLy: pos.distanceTo(sun), color: power ? `var(--trek-${data.mocnosti.indexOf(power)})` : "var(--dim)",
        hidden: true, major: true, aliases: [power?.en ?? "", "Star Trek"], power, far: f, inst: items.length,
      };
      this.objects.push(obj);
      items.push({ pos, r: f.polomer_ly, color: new Color(power?.barva ?? "#888"), obj });
    }

    // bubliny: instancované koule s průsvitným okrajem; skrytá mocnost = nulová velikost instance
    const geo = new SphereGeometry(1, 24, 16);
    const mat = new ShaderMaterial({
      vertexShader: /* glsl */ `
        attribute vec3 tint; varying vec3 vCol; varying float vRim;
        void main(){ vCol = tint;
          vec4 mv = modelViewMatrix * instanceMatrix * vec4(position, 1.);
          vec3 n = normalize(normalMatrix * mat3(instanceMatrix) * normal);
          vRim = 1. - abs(dot(n, normalize(-mv.xyz)));
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: /* glsl */ `
        varying vec3 vCol; varying float vRim;
        void main(){ gl_FragColor = vec4(vCol, 0.05 + pow(vRim, 2.5) * 0.25); }`,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    this.bubbles = new InstancedMesh(geo, mat, items.length);
    const tint = new Float32Array(items.length * 3);
    items.forEach((it, i) => {
      this.radii.push(it.r);
      this.centers.push(it.pos);
      tint.set([it.color.r, it.color.g, it.color.b], i * 3);
    });
    geo.setAttribute("tint", new InstancedBufferAttribute(tint, 3));
    this.bubbles.frustumCulled = false;
    this.bubbles.renderOrder = -1;
    this.group.add(this.bubbles);

    // body soustav
    const pg = new BufferGeometry();
    pg.setAttribute("position", new BufferAttribute(new Float32Array(items.flatMap((it) => it.pos.toArray())), 3));
    pg.setAttribute("color", new BufferAttribute(tint.slice(), 3));
    this.vis = new BufferAttribute(new Float32Array(items.length), 1);
    pg.setAttribute("vis", this.vis);
    this.points = new Points(pg, new ShaderMaterial({
      uniforms: { map: { value: glow }, pr: { value: Math.min(devicePixelRatio, 2) } },
      vertexShader: /* glsl */ `
        uniform float pr; attribute float vis; attribute vec3 color; varying vec3 vCol;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = vis > .5 ? clamp(900. / -mv.z, 2.5, 8.) * pr : 0.;
          gl_Position = vis > .5 ? projectionMatrix * mv : vec4(2., 2., 2., 1.); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D map; varying vec3 vCol;
        void main(){ float a = texture2D(map, gl_PointCoord).a; gl_FragColor = vec4(mix(vCol, vec3(1.), .35), a); }`,
      transparent: true, depthWrite: false, blending: AdditiveBlending,
    }));
    this.points.frustumCulled = false;
    this.group.add(this.points);
    this.refresh();
  }

  setFilter(key: string, on: boolean): void {
    const f = this.filters.find((x) => x.key === key);
    if (f) f.on = on;
    this.refresh();
  }

  setAll(on: boolean): void {
    for (const f of this.filters) f.on = on;
    this.refresh();
  }

  get anyOn(): boolean {
    return this.filters.some((f) => f.on);
  }

  applyFilter(): void { /* vzdálenostní filtr seznamu se na fikci nevztahuje */ }

  private refresh(): void {
    const on = new Set(this.filters.filter((f) => f.on).map((f) => f.key));
    const m = new Matrix4();
    const arr = this.vis.array as Float32Array;
    for (const o of this.objects) {
      const v = !!o.power && on.has(o.power.id);
      o.hidden = !v;
      const r = v ? this.radii[o.inst] : 0;
      m.makeScale(r, r, r).setPosition(this.centers[o.inst]);
      this.bubbles.setMatrixAt(o.inst, m);
      arr[o.inst] = v ? 1 : 0;
    }
    this.bubbles.instanceMatrix.needsUpdate = true;
    this.vis.needsUpdate = true;
    this.group.visible = on.size > 0;
  }

  labelCandidates(stage: Stage): MapObject[] {
    if (!this.group.visible) return [];
    const near = stage.viewDistance < 250;
    return this.objects.filter((o) => !o.hidden && (o.far || o.major || near));
  }

  kindName(o: MapObject): string {
    return `Star Trek (fikce) – ${(o as Obj).power?.nazev ?? "bez příslušnosti"}`;
  }

  flyDistance(o: MapObject): number {
    const x = o as Obj;
    return x.far ? x.far.polomer_ly * 3 : 90;
  }

  cardHtml(mo: MapObject): string {
    const o = mo as Obj;
    const p = o.power;
    const src = (o.sys?.zdroje ?? []).map((s) =>
      `<a href="${wikiUrl(s)}" target="_blank" rel="noopener">${escapeHtml(s.replace("memory-alpha:", "Memory Alpha: ").replace("memory-beta:", "Memory Beta: "))} ↗</a>`).join("<br>");
    let how = "";
    if (o.far) how = `Schematická oblast (poloměr ${fmtLy(o.far.polomer_ly)}). ${escapeHtml(o.far.zdroj)}.`;
    else if (o.sys?.jak === "hvezda") how = `Skutečná hvězda – poloha z reálného katalogu (${escapeHtml(o.sys.simbad ?? "")}); ${escapeHtml(o.sys.proc)}.`;
    else if (o.sys) how = `Fiktivní soustava – poloha <b>vypočtená</b> z údajů na wiki (${escapeHtml(o.sys.proc)}). Směr je odhad.`;
    const dist = o.distLy != null ? `${fmtLy(o.distLy)} · ${fmtPcFromLy(o.distLy)}` : "–";
    return `<div class="kind" style="color:${escapeHtml(p?.barva ?? "#aaa")}">Star Trek · fikce · ${escapeHtml(p?.nazev ?? "bez příslušnosti")}</div>
      <h3>${escapeHtml(o.name)}</h3>
      <p class="warn">Fanouškovská vrstva – neoficiální extrapolace, ne kánon ani oficiální mapa.</p>
      <dl>
        <dt>Mocnost</dt><dd>${escapeHtml(p?.nazev ?? "–")}${p?.en && p.en !== p.nazev ? ` <span class="dim">(${escapeHtml(p.en)})</span>` : ""}</dd>
        <dt>Od Slunce</dt><dd>${dist}</dd>
        ${o.sys?.kvadrant ? `<dt>Kvadrant</dt><dd>${escapeHtml(o.sys.kvadrant)}</dd>` : ""}
        ${o.sys?.era ? `<dt>Příslušnost k roku</dt><dd>${escapeHtml(o.sys.era)}</dd>` : ""}
        <dt>Poloha</dt><dd>${how}</dd>
        ${p?.bez_polohy ? `<dt>Bez polohy</dt><dd>dalších ${p.bez_polohy} soustav této mocnosti na wiki nemá žádný údaj o vzdálenosti</dd>` : ""}
      </dl>
      ${src ? `<p>${src}</p>` : ""}
      <div class="src">${escapeHtml(this.data.upozorneni)} Zdroje: Memory Alpha (CC BY-NC) a Memory Beta (CC BY-SA), staženo
        ${escapeHtml(this.data.stazeno.slice(0, 10))}; ${this.data.statistika.stranek} stránek, ${this.data.statistika.skutecne_hvezdy}
        skutečných hvězd, ${this.data.statistika.vypocet} vypočtených poloh. Star Trek je ochranná známka Paramount; tahle vrstva s ním není spojená.</div>`;
  }
}
