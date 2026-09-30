import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
  type Texture,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { escapeHtml, fmtNum } from "../core/units";
import type { Stage } from "../scene/stage";
import { eccentricAnomaly, orbitPoint } from "./kepler";
import type { OrbitBody, SystemSpec } from "./types";

const AU_KM = 149597870.7;
const R_SUN_AU = 695700 / AU_KM;
const R_EARTH_AU = 6371 / AU_KM;
const FOV = 45;
const ORBIT_SEGMENTS = 360;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/**
 * Srovnávací dráhy Sluneční soustavy: velké poloosy v au na 2 desetinná místa
 * (NASA Planetary Fact Sheet i JPL Standish se na této přesnosti shodují). Zatím zapsané zpaměti,
 * nahradí je data plné Sluneční soustavy.
 */
const SOLAR_REF: [string, number][] = [["Merkur", 0.39], ["Venuše", 0.72], ["Země", 1.0], ["Mars", 1.52], ["Jupiter", 5.2]];

/** Barva planety podle poloměru (hrubé skupiny, jen pro orientaci). */
function planetColor(r: number | null): string {
  if (r == null) return "#8a93a6";
  if (r < 1.6) return "#c9a27e";
  if (r < 4) return "#7fd0d8";
  if (r < 10) return "#6f98ea";
  return "#e3bb82";
}

/** Velikost tečky v pixelech v režimu „zvětšeno“: roste s poloměrem, ale ne lineárně. */
const planetPx = (r: number | null) => (r == null ? 3 : 3 + 2.4 * Math.log2(1 + r));

interface BodyView {
  b: OrbitBody;
  mesh: Mesh;
  label: HTMLDivElement;
  phase: number;
  realR: number;
}

interface RefLabel {
  label: HTMLDivElement;
  pos: Vector3;
}

export class SystemView {
  private root: HTMLElement;
  private renderer: WebGLRenderer | null = null;
  private scene = new Scene();
  private camera = new PerspectiveCamera(FOV, 1, 0.001, 1e5);
  private controls: OrbitControls | null = null;
  private bodies: BodyView[] = [];
  private refs: RefLabel[] = [];
  private refGroup: Line[] = [];
  private star: Mesh | null = null;
  private starGlow: Sprite | null = null;
  private starReal = R_SUN_AU;
  private raf = 0;
  private last = 0;
  private t = 0;
  private daysPerSec = 1;
  private playing = true;
  private realSize = false;
  private showRef = false;
  private spec: SystemSpec | null = null;
  private tmp = new Vector3();

  private stage: Stage;
  private glow: Texture;

  constructor(stage: Stage, glow: Texture) {
    this.stage = stage;
    this.glow = glow;
    this.root = document.createElement("section");
    this.root.id = "system";
    this.root.hidden = true;
    this.root.setAttribute("aria-label", "Pohled na planetární soustavu");
    this.root.innerHTML = `
      <div class="sysCanvas"></div>
      <div class="sysLabels"></div>
      <header class="hud sysHead">
        <button class="close" aria-label="Zavřít soustavu">×</button>
        <div class="kind">Soustava</div>
        <h3 class="sysName"></h3>
        <div class="sysStar dim"></div>
      </header>
      <nav class="hud sysBar">
        <button class="btn" data-a="play" aria-pressed="true">Pauza</button>
        <button class="btn" data-a="slower" aria-label="Zpomalit">«</button>
        <span class="sysSpeed"></span>
        <button class="btn" data-a="faster" aria-label="Zrychlit">»</button>
        <button class="btn" data-a="size" aria-pressed="false">Skutečné velikosti</button>
        <button class="btn" data-a="ref" aria-pressed="false">Sluneční soustava</button>
        <button class="btn" data-a="notes" aria-pressed="false">Poznámky</button>
      </nav>
      <div class="hud sysNotes" hidden></div>`;
    document.body.appendChild(this.root);
    this.q(".close").onclick = () => this.close();
    this.root.querySelectorAll<HTMLButtonElement>(".sysBar [data-a]").forEach((b) => (b.onclick = () => this.action(b)));
    addEventListener("keydown", (e) => {
      if (!this.root.hidden && e.key === "Escape") this.close();
    });
    addEventListener("resize", () => this.resize());
    const bar = this.q(".sysBar");
    new ResizeObserver(() => this.root.style.setProperty("--sysbar-h", `${bar.getBoundingClientRect().height}px`)).observe(bar);
  }

  get isOpen(): boolean {
    return !this.root.hidden;
  }

  open(spec: SystemSpec): void {
    this.spec = spec;
    this.ensureRenderer();
    this.build(spec);
    this.root.hidden = false;
    this.stage.paused = true;
    this.resize();
    this.fit(true);
    this.last = performance.now();
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame((n) => this.loop(n));
  }

  close(): void {
    if (this.root.hidden) return;
    this.root.hidden = true;
    cancelAnimationFrame(this.raf);
    this.stage.paused = false;
    this.clear();
  }

  private q<T extends HTMLElement>(sel: string): T {
    return this.root.querySelector(sel) as T;
  }

  private ensureRenderer(): void {
    if (this.renderer) return;
    this.renderer = new WebGLRenderer({ antialias: devicePixelRatio < 2 });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.q(".sysCanvas").appendChild(this.renderer.domElement);
    this.scene.background = new Color(getComputedStyle(document.documentElement).getPropertyValue("--void").trim());
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.zoomToCursor = true;
    this.controls.screenSpacePanning = true;
  }

  private clear(): void {
    for (const o of [...this.scene.children]) {
      this.scene.remove(o);
      o.traverse((x) => {
        const m = x as Mesh;
        m.geometry?.dispose();
        const mat = m.material as { dispose?: () => void } | undefined;
        mat?.dispose?.();
      });
    }
    this.q(".sysLabels").innerHTML = "";
    this.bodies = [];
    this.refs = [];
    this.refGroup = [];
    this.star = null;
    this.starGlow = null;
  }

  private build(spec: SystemSpec): void {
    this.clear();
    const labels = this.q(".sysLabels");
    const cls = spec.star.cls.info;
    const starCol = new Color(getComputedStyle(document.documentElement).getPropertyValue(cls.color).trim());

    this.starReal = (spec.star.rs ?? 1) * R_SUN_AU;
    this.star = new Mesh(new SphereGeometry(1, 32, 16), new MeshBasicMaterial({ color: starCol }));
    this.scene.add(this.star);
    this.starGlow = new Sprite(new SpriteMaterial({ map: this.glow, color: starCol, transparent: true, depthWrite: false, blending: AdditiveBlending }));
    this.scene.add(this.starGlow);

    spec.bodies.forEach((b, i) => {
      const col = planetColor(b.r);
      const pts: Vector3[] = [];
      for (let k = 0; k < ORBIT_SEGMENTS; k++) {
        const [x, y] = orbitPoint(b.a, b.e, b.w, (k / ORBIT_SEGMENTS) * Math.PI * 2);
        pts.push(new Vector3(x, 0, -y));
      }
      const orbit = new LineLoop(new BufferGeometry().setFromPoints(pts),
        new LineBasicMaterial({ color: col, transparent: true, opacity: b.eUnknown ? 0.35 : 0.6 }));
      this.scene.add(orbit);
      const mesh = new Mesh(new SphereGeometry(1, 20, 10), new MeshBasicMaterial({ color: col }));
      this.scene.add(mesh);
      const label = document.createElement("div");
      label.className = "sysLabel";
      label.textContent = shortName(b.name, spec.name);
      label.title = b.name;
      labels.appendChild(label);
      this.bodies.push({ b, mesh, label, phase: i * GOLDEN * 2, realR: (b.r ?? 1) * R_EARTH_AU });
    });

    for (const [name, a] of SOLAR_REF) {
      const pts: Vector3[] = [];
      for (let k = 0; k <= 180; k++) {
        const f = (k / 180) * Math.PI * 2;
        pts.push(new Vector3(a * Math.cos(f), 0, a * Math.sin(f)));
      }
      const ring = new Line(new BufferGeometry().setFromPoints(pts),
        new LineDashedMaterial({ color: 0x8391ad, dashSize: a * 0.03, gapSize: a * 0.03, transparent: true, opacity: 0.55 }));
      ring.computeLineDistances();
      ring.visible = this.showRef;
      this.scene.add(ring);
      this.refGroup.push(ring);
      const label = document.createElement("div");
      label.className = "sysLabel ref";
      label.textContent = `${name} ${fmtNum(a, 2)} au`;
      labels.appendChild(label);
      this.refs.push({ label, pos: new Vector3(a * Math.SQRT1_2, 0, a * Math.SQRT1_2) });
    }

    // výchozí rychlost: nejvnitřnější planeta oběhne za ~6 s
    const pMin = Math.min(...spec.bodies.map((b) => b.p));
    this.daysPerSec = Number.isFinite(pMin) ? pMin / 6 : 1;
    this.t = 0;
    this.playing = true;
    this.syncButtons();

    this.q(".sysName").textContent = spec.name;
    const s = spec.star;
    this.q(".sysStar").innerHTML = `<i class="dot" style="background:var(${cls.color})"></i>třída ${escapeHtml(cls.name)}${s.cls.estimated ? " (odhad z teploty)" : ""}`
      + `${s.teff != null ? ` · ${fmtNum(s.teff, 0)} K` : ""}${s.rs != null ? ` · ${fmtNum(s.rs, 2)} R☉` : ""}`
      + ` · ${spec.bodies.length} ${spec.bodies.length === 1 ? "planeta" : spec.bodies.length <= 4 ? "planety" : "planet"}`;
    this.q(".sysNotes").innerHTML = this.notesHtml(spec);
  }

  private notesHtml(spec: SystemSpec): string {
    const rows = spec.bodies.map((b) => `<tr${b.disputed ? ' class="disputed"' : ""}>
      <th scope="row">${escapeHtml(shortName(b.name, spec.name))}${b.disputed ? " ⚠" : ""}</th>
      <td>${fmtNum(b.a, b.a < 0.1 ? 4 : 3)}${b.aEst ? "*" : ""}</td>
      <td>${b.eUnknown ? "?" : fmtNum(b.e, 3)}</td>
      <td>${fmtNum(b.p, b.p < 10 ? 3 : 1)}${b.pEst ? "*" : ""}</td>
      <td>${b.r != null ? fmtNum(b.r, 2) : "?"}</td></tr>`).join("");
    const notes = [
      "Tvar drah podle výstřednosti e a natočení podle argumentu periastra ω.",
      "Všechny dráhy leží v jedné rovině: skutečný sklon drah vůči nám je u většiny planet neznámý (u tranzitů víme jen, že dráhu vidíme skoro z boku).",
      "Poloha planet na drahách je ilustrativní (okamžik průchodu periastrem nemáme), poměry rychlostí odpovídají skutečným periodám.",
      "Režim „zvětšeno“ zvětšuje hvězdu i planety, aby byly vidět; „Skutečné velikosti“ je kreslí v měřítku drah.",
    ];
    if (spec.noOrbitData) notes.unshift("<b>Data zatím neobsahují výstřednosti drah</b>, všechny dráhy jsou proto kruhové. Doplní je nové spuštění pipeline/exoplanety.py.");
    else if (spec.bodies.some((b) => b.eUnknown)) notes.unshift("Planety s „?“ ve sloupci e nemají v archivu výstřednost, kreslí se kruh (slabší čára).");
    if (spec.bodies.some((b) => b.aEst || b.pEst)) notes.push(`* dopočteno 3. Keplerovým zákonem z hmotnosti hvězdy${spec.massAssumed ? " (hmotnost neznámá, použita 1 M☉)" : ""}.`);
    if (spec.star.rs == null) notes.push("Poloměr hvězdy není známý, kreslí se jako 1 R☉.");
    if (spec.skipped.length) notes.push(`Bez dráhy (chybí a i perioda): ${escapeHtml(spec.skipped.join(", "))}.`);
    notes.push(`Barva planety podle poloměru: hnědá < 1,6 R⊕ (spíš kamenná), tyrkysová < 4 R⊕, modrá < 10 R⊕, béžová ≥ 10 R⊕ (plynný obr), šedá = neznámý.`);
    return `<table class="planets"><thead><tr><th>Planeta</th><th>a [au]</th><th>e</th><th>P [d]</th><th>R⊕</th></tr></thead><tbody>${rows}</tbody></table>
      <ul>${notes.map((n) => `<li>${n}</li>`).join("")}</ul><p class="src">${escapeHtml(spec.source)}</p>`;
  }

  private action(b: HTMLButtonElement): void {
    switch (b.dataset.a) {
      case "play": this.playing = !this.playing; break;
      case "slower": this.daysPerSec /= 4; break;
      case "faster": this.daysPerSec *= 4; break;
      case "size": this.realSize = !this.realSize; break;
      case "ref":
        this.showRef = !this.showRef;
        this.refGroup.forEach((r) => (r.visible = this.showRef));
        this.fit();
        break;
      case "notes": {
        const n = this.q(".sysNotes");
        n.hidden = !n.hidden;
        break;
      }
    }
    this.syncButtons();
  }

  private syncButtons(): void {
    const set = (a: string, on: boolean, text?: string) => {
      const b = this.q<HTMLButtonElement>(`[data-a="${a}"]`);
      b.setAttribute("aria-pressed", String(on));
      if (text) b.textContent = text;
    };
    set("play", this.playing, this.playing ? "Pauza" : "Spustit");
    set("size", this.realSize);
    set("ref", this.showRef);
    set("notes", !this.q(".sysNotes").hidden);
    this.q(".sysSpeed").textContent = `1 s = ${fmtDays(this.daysPerSec)}`;
  }

  private resize(): void {
    if (!this.renderer || this.root.hidden) return;
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private fit(resetDir = false): void {
    const spec = this.spec!;
    // se srovnáním aspoň po dráhu Země, jinak by kompaktní soustavy (TRAPPIST-1) srovnání neukázaly
    const apo = Math.max(...spec.bodies.map((b) => b.a * (1 + b.e)), this.starReal * 20, this.showRef ? 1.05 : 0);
    const dist = apo / Math.tan((FOV * Math.PI) / 360) * 1.25;
    const dir = !resetDir
      ? this.camera.position.clone().sub(this.controls!.target).normalize()
      : new Vector3(0, 0.62, 0.78).normalize();
    this.camera.position.copy(dir.multiplyScalar(dist));
    this.controls!.target.set(0, 0, 0);
    this.controls!.minDistance = this.starReal * 1.5;
    this.controls!.maxDistance = Math.max(dist * 40, 60);
    this.controls!.update();
  }

  private loop(now: number): void {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    if (this.playing) this.t += dt * this.daysPerSec;
    this.controls!.update();
    const cam = this.camera;
    const vd = cam.position.distanceTo(this.controls!.target);
    cam.near = Math.max(1e-7, vd * 0.0005);
    cam.far = vd * 2000;
    cam.updateProjectionMatrix();
    const pxWorld = (p: Vector3) => (2 * cam.position.distanceTo(p) * Math.tan((FOV * Math.PI) / 360)) / innerHeight;

    const star = this.star!;
    const sPx = pxWorld(star.position);
    const sr = this.realSize ? Math.max(this.starReal, 1 * sPx) : Math.max(this.starReal, 9 * sPx);
    star.scale.setScalar(sr);
    this.starGlow!.scale.setScalar(this.realSize ? Math.max(this.starReal * 6, 6 * sPx) : sr * 6);

    for (const bv of this.bodies) {
      const { b } = bv;
      const M = bv.phase + (2 * Math.PI * this.t) / b.p;
      const [x, y] = orbitPoint(b.a, b.e, b.w, eccentricAnomaly(M, b.e));
      bv.mesh.position.set(x, 0, -y);
      const px = pxWorld(bv.mesh.position);
      // ve skutečném měřítku aspoň 1 px, jinak by planeta úplně zmizela
      bv.mesh.scale.setScalar(this.realSize ? Math.max(bv.realR, px) : Math.max(bv.realR, planetPx(b.r) * px));
      this.place(bv.label, bv.mesh.position, 8);
    }
    for (const r of this.refs) {
      if (this.showRef) this.place(r.label, r.pos, 0);
      else r.label.style.display = "none";
    }
    this.renderer!.render(this.scene, cam);
    this.raf = requestAnimationFrame((n) => this.loop(n));
  }

  private place(el: HTMLDivElement, p: Vector3, dx: number): void {
    this.tmp.copy(p).project(this.camera);
    if (this.tmp.z > 1 || Math.abs(this.tmp.x) > 1.05 || Math.abs(this.tmp.y) > 1.05) {
      el.style.display = "none";
      return;
    }
    el.style.display = "";
    el.style.transform = `translate(${((this.tmp.x + 1) / 2) * innerWidth + dx}px, ${((1 - this.tmp.y) / 2) * innerHeight - 7}px)`;
  }
}

/** „TRAPPIST-1 e“ → „e“, ať popisky v malé soustavě nepřekrývají všechno. */
function shortName(planet: string, host: string): string {
  return planet.startsWith(host + " ") ? planet.slice(host.length + 1) : planet;
}

function fmtDays(d: number): string {
  const y = d / 365.25;
  if (y >= 2) return `${fmtNum(y, 1)} ${y < 5 ? "roku" : "let"}`;
  if (d >= 1) return `${fmtNum(d, d < 10 ? 1 : 0)} ${d < 2 ? "den" : d < 5 ? "dny" : "dní"}`;
  const h = d * 24;
  if (h >= 1) return `${fmtNum(h, 1)} h`;
  return `${fmtNum(h * 60, 1)} min`;
}
