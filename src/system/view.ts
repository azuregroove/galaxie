import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  LineLoop,
  Mesh,
  RingGeometry,
  DoubleSide,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
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
import { fillImage } from "../ui/images";
import { planeXY } from "./kepler";
import { SMALL_COLORS, smallBody, type SmallData } from "./small";
import type { OrbitBody, SystemSpec } from "./types";

const AU_KM = 149597870.7;
const R_SUN_AU = 695700 / AU_KM;
const R_EARTH_AU = 6371 / AU_KM;
const FOV = 45;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const DEG = Math.PI / 180;
const MAX_LABELS = 45;
/** měsíc se kreslí, až je jeho dráha na obrazovce aspoň takhle velká (px) */
const CHILD_MIN_PX = 6;

/**
 * Srovnávací dráhy: velké poloosy z JPL, Keplerovské elementy pro přibližné polohy planet, tab. 1
 * (ověřeno 30. 9. 2026), zaokrouhleno na 2 desetinná místa.
 */
const SOLAR_REF: [string, number][] = [["Merkur", 0.39], ["Venuše", 0.72], ["Země", 1.0], ["Mars", 1.52], ["Jupiter", 5.2]];

/** Barva exoplanety podle poloměru (hrubé skupiny, jen pro orientaci). */
function planetColor(r: number | null): string {
  if (r == null) return "#8a93a6";
  if (r < 1.6) return "#c9a27e";
  if (r < 4) return "#7fd0d8";
  if (r < 10) return "#6f98ea";
  return "#e3bb82";
}

/** Velikost tečky v pixelech v režimu „zvětšeno“: roste s poloměrem, ale ne lineárně. */
const bodyPx = (b: OrbitBody) => (b.r == null ? (b.kind === "moon" ? 2 : 3) : Math.max(2, 3 + 2.4 * Math.log2(1 + b.r)));

interface BodyView {
  b: OrbitBody;
  parent: BodyView | null;
  mesh: Mesh;
  /** LineLoop u elipsy, otevřená Line u hyperboly */
  orbit: Line;
  /** skupina s měsíci, posouvá se s tělesem */
  sats: Group | null;
  children: BodyView[];
  label: HTMLDivElement;
  phase: number;
  realR: number;
  /** elementy, pro které je nakreslená dráha (překreslí se, když se změní) */
  drawn: { node: number; w: number; inc: number };
  world: Vector3;
  visible: boolean;
  prio: number;
}

interface Flight {
  t0: number;
  fromT: Vector3;
  dir: Vector3;
  fromD: number;
  toD: number;
}

export class SystemView {
  private root: HTMLElement;
  private renderer: WebGLRenderer | null = null;
  private scene = new Scene();
  private camera = new PerspectiveCamera(FOV, 1, 0.001, 1e5);
  private controls: OrbitControls | null = null;
  private bodies: BodyView[] = [];
  private all: BodyView[] = [];
  private refs: { label: HTMLDivElement; pos: Vector3 }[] = [];
  private refGroup: Line[] = [];
  private star: Mesh | null = null;
  private starGlow: Sprite | null = null;
  private starLabel: HTMLDivElement | null = null;
  private starReal = R_SUN_AU;
  private raf = 0;
  private last = 0;
  private t = 0;
  private daysPerSec = 1;
  private playing = true;
  private realSize = false;
  private showRef = false;
  private spec: SystemSpec | null = null;
  private focus: BodyView | null = null;
  private focusPos = new Vector3();
  private flight: Flight | null = null;
  private tmp = new Vector3();
  private tmp2 = new Vector3();
  private dateTick = 0;
  // planetky a komety: body počítané na CPU, vybrané těleso dostane plnou BodyView
  private small: SmallData | null = null;
  private smallPts: Points | null = null;
  private smallIdx: number[] = [];
  private smallOn = new Set<string>();
  private smallSel: BodyView | null = null;
  private smallTex: Texture | null = null;
  private down: { x: number; y: number } | null = null;

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
        <div class="sysFocus dim"></div>
      </header>
      <nav class="hud sysBar">
        <button class="btn" data-a="play" aria-pressed="true">Pauza</button>
        <button class="btn" data-a="slower" aria-label="Zpomalit">«</button>
        <span class="sysSpeed"></span>
        <button class="btn" data-a="faster" aria-label="Zrychlit">»</button>
        <span class="sysDateBox"><input type="range" class="sysDate" aria-label="Datum" step="1"><span class="sysDateTxt"></span>
          <button class="btn" data-a="today">Dnes</button></span>
        <button class="btn" data-a="home">Celá soustava</button>
        <button class="btn" data-a="size" aria-pressed="false">Skutečné velikosti</button>
        <button class="btn" data-a="ref" aria-pressed="false">Sluneční soustava</button>
        <button class="btn" data-a="small" aria-pressed="false">Planetky a komety</button>
        <button class="btn" data-a="notes" aria-pressed="false">Poznámky</button>
      </nav>
      <div class="hud sysNotes" hidden></div>
      <div class="hud sysSmall" hidden>
        <input type="search" class="sysFind" placeholder="Najít planetku nebo kometu…" aria-label="Najít planetku nebo kometu" autocomplete="off">
        <div class="sysHits"></div>
        <div class="sysGroups"></div>
      </div>`;
    document.body.appendChild(this.root);
    this.q(".close").onclick = () => this.close();
    this.root.querySelectorAll<HTMLButtonElement>(".sysBar [data-a]").forEach((b) => (b.onclick = () => this.action(b)));
    const date = this.q<HTMLInputElement>(".sysDate");
    date.oninput = () => {
      this.t = Number(date.value);
      this.syncDate();
    };
    addEventListener("keydown", (e) => {
      if (!this.root.hidden && e.key === "Escape") this.close();
    });
    addEventListener("resize", () => this.resize());
    const bar = this.q(".sysBar");
    new ResizeObserver(() => this.root.style.setProperty("--sysbar-h", `${bar.getBoundingClientRect().height}px`)).observe(bar);
    const find = this.q<HTMLInputElement>(".sysFind");
    find.oninput = () => this.findSmall(find.value);
    this.q(".sysHits").addEventListener("click", (e) => {
      const k = (e.target as HTMLElement).closest<HTMLElement>("[data-k]")?.dataset.k;
      if (k != null) this.selectSmall(Number(k));
    });
    this.q(".sysGroups").addEventListener("change", (e) => {
      const el = e.target as HTMLInputElement;
      if (el.checked) this.smallOn.add(el.value);
      else this.smallOn.delete(el.value);
      this.rebuildSmall();
    });
    this.q(".sysNotes").addEventListener("click", (e) => {
      const name = (e.target as HTMLElement).closest<HTMLElement>("[data-body]")?.dataset.body;
      const bv = name && this.all.find((x) => x.b.name === name);
      if (bv) this.focusOn(bv);
    });
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
    const cv = this.renderer.domElement;
    cv.addEventListener("pointerdown", (e) => (this.down = { x: e.clientX, y: e.clientY }));
    cv.addEventListener("pointerup", (e) => {
      // klepnutí, ne tah kamerou
      if (this.down && Math.hypot(e.clientX - this.down.x, e.clientY - this.down.y) < 6) this.pickSmall(e.clientX, e.clientY, e.pointerType === "touch" ? 18 : 9);
      this.down = null;
    });
    // posun myší ruší sledování tělesa, jinak by kamera „utíkala“ zpátky
    this.controls.addEventListener("start", () => {
      this.flight = null;
    });
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
    this.all = [];
    this.refs = [];
    this.refGroup = [];
    this.star = null;
    this.starGlow = null;
    this.starLabel = null;
    this.focus = null;
    this.flight = null;
    this.smallPts = null;
    this.smallSel = null;
    this.small = null;
  }

  // ---------- stavba scény ----------
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
    if (spec.star.label) {
      this.starLabel = document.createElement("div");
      this.starLabel.className = "sysLabel star";
      this.starLabel.textContent = spec.star.label;
      this.starLabel.onclick = () => this.home();
      labels.appendChild(this.starLabel);
    }

    const make = (b: OrbitBody, i: number, parent: BodyView | null, into: Group | Scene): BodyView => {
      const col = b.color ?? planetColor(b.r);
      const orbit = new (b.e < 1 ? LineLoop : Line)(new BufferGeometry(),
        // malé (většinou nepravidelné) měsíce mají obří protáhlé dráhy, které by přehlušily ty velké
        new LineBasicMaterial({ color: col, transparent: true, opacity: b.eUnknown ? 0.35 : b.kind === "moon" ? (b.r != null ? 0.45 : 0.14) : 0.6 }));
      into.add(orbit);
      const mesh = new Mesh(new SphereGeometry(1, 20, 10), new MeshBasicMaterial({ color: col }));
      into.add(mesh);
      const label = document.createElement("div");
      label.className = "sysLabel";
      label.textContent = b.label ?? b.name;
      label.title = b.name;
      labels.appendChild(label);
      const bv: BodyView = {
        b, parent, mesh, orbit, sats: null, children: [], label, phase: i * GOLDEN * 2,
        realR: (b.r ?? 1) * R_EARTH_AU, drawn: { node: NaN, w: NaN, inc: NaN }, world: new Vector3(), visible: true,
        prio: b.kind === "moon" ? (b.r ?? 0) : b.kind === "dwarf" || b.kind === "small" ? 5000 : 10000 + (b.r ?? 0),
      };
      label.onclick = () => this.focusOn(bv);
      if (b.children?.length) {
        bv.sats = new Group();
        into.add(bv.sats);
        b.children.forEach((c, k) => bv.children.push(make(c, k, bv, bv.sats!)));
      }
      this.all.push(bv);
      return bv;
    };
    spec.bodies.forEach((b, i) => this.bodies.push(make(b, i, null, this.scene)));
    this.makeBody = (b) => make(b, 0, null, this.scene);
    this.buildSmall(spec.small ?? null);

    if (spec.hz) {
      // mezikruží v rovině drah; optimistická zóna slabší
      for (const [r, op] of [[spec.hz.opt, 0.08], [spec.hz.cons, 0.16]] as const) {
        const ring = new Mesh(new RingGeometry(r[0], r[1], 128),
          new MeshBasicMaterial({ color: 0x5ad278, transparent: true, opacity: op, side: DoubleSide, depthWrite: false }));
        ring.rotation.x = -Math.PI / 2;
        this.scene.add(ring);
      }
    }

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

    this.playing = true;
    if (spec.dated) {
      this.t = Math.min(spec.dated.max, Math.max(spec.dated.min, jdNow()));
      this.daysPerSec = 1;
      const d = this.q<HTMLInputElement>(".sysDate");
      d.min = String(spec.dated.min);
      d.max = String(spec.dated.max);
    } else {
      // výchozí rychlost: nejvnitřnější planeta oběhne za ~6 s
      const pMin = Math.min(...spec.bodies.map((b) => b.p));
      this.daysPerSec = Number.isFinite(pMin) ? pMin / 6 : 1;
      this.t = 0;
    }
    this.q(".sysDateBox").hidden = !spec.dated;
    this.q<HTMLButtonElement>('[data-a="ref"]').hidden = !spec.solarRef;
    this.q<HTMLButtonElement>('[data-a="small"]').hidden = !spec.small;
    if (!spec.small) this.q(".sysSmall").hidden = true;
    this.q<HTMLButtonElement>('[data-a="home"]').hidden = !spec.bodies.some((b) => b.children?.length);
    if (!spec.solarRef) this.showRef = false;
    this.syncButtons();
    this.syncDate();

    this.q(".sysName").textContent = spec.name;
    const s = spec.star;
    const n = spec.bodies.length;
    this.q(".sysStar").innerHTML = `<i class="dot" style="background:var(${cls.color})"></i>${s.spType ? `${escapeHtml(s.label ?? "hvězda")} · spektrální typ ${escapeHtml(s.spType)}` : `třída ${escapeHtml(cls.name)}`}${s.cls.estimated ? " (odhad z teploty)" : ""}`
      + `${s.teff != null ? ` · ${fmtNum(s.teff, 0)} K` : ""}${s.rs != null ? ` · ${fmtNum(s.rs, 2)} R☉` : ""}`
      + (spec.dated ? "" : ` · ${n} ${n === 1 ? "planeta" : n <= 4 ? "planety" : "planet"}`);
    this.q(".sysFocus").textContent = "";
    this.q(".sysNotes").innerHTML = this.notesHtml(spec);
  }

  private notesHtml(spec: SystemSpec): string {
    const rowName = (b: OrbitBody) => `<th scope="row"><button class="linkish" data-body="${escapeHtml(b.name)}">${escapeHtml(b.label ?? b.name)}</button>${b.disputed ? " ⚠" : ""}</th>`;
    let table: string;
    if (spec.dated) {
      const rows = spec.bodies.map((b) => `<tr>${rowName(b)}
        <td>${fmtNum(b.a, 2)}</td><td>${fmtNum(b.e, 3)}</td><td>${fmtNum(Math.round((b.inc ?? 0) * 10) / 10 || 0, 1)}</td>
        <td>${b.p > 3650 ? `${fmtNum(b.p / 365.25, 0)} let` : `${fmtNum(b.p, 0)} d`}</td>
        <td>${b.r != null ? fmtNum(b.r * 6371, 0) : "?"}</td><td>${b.children?.length ?? 0}</td></tr>`).join("");
      table = `<table class="planets"><thead><tr><th>Těleso</th><th>a [au]</th><th>e</th><th>i [°]</th><th>oběh</th><th>R [km]</th><th>měsíce</th></tr></thead><tbody>${rows}</tbody></table>`;
    } else {
      const rows = spec.bodies.map((b) => `<tr${b.disputed ? ' class="disputed"' : ""}>${rowName(b)}
        <td>${fmtNum(b.a, b.a < 0.1 ? 4 : 3)}${b.aEst ? "*" : ""}</td>
        <td>${b.eUnknown ? "?" : fmtNum(b.e, 3)}</td>
        <td>${fmtNum(b.p, b.p < 10 ? 3 : 1)}${b.pEst ? "*" : ""}</td>
        <td>${b.r != null ? fmtNum(b.r, 2) : "?"}</td></tr>`).join("");
      table = `<table class="planets"><thead><tr><th>Planeta</th><th>a [au]</th><th>e</th><th>P [d]</th><th>R⊕</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
    let notes = spec.notes;
    if (!notes) {
      notes = [
        "Tvar drah podle výstřednosti e a natočení podle argumentu periastra ω.",
        "Všechny dráhy leží v jedné rovině: skutečný sklon drah vůči nám je u většiny planet neznámý (u tranzitů víme jen, že dráhu vidíme skoro z boku).",
        "Poloha planet na drahách je ilustrativní (okamžik průchodu periastrem nemáme), poměry rychlostí odpovídají skutečným periodám.",
        "Režim „zvětšeno“ zvětšuje hvězdu i planety, aby byly vidět; „Skutečné velikosti“ je kreslí v měřítku drah.",
      ];
      if (spec.noOrbitData) notes.unshift("<b>Data zatím neobsahují výstřednosti drah</b>, všechny dráhy jsou proto kruhové. Doplní je nové spuštění pipeline/exoplanety.py.");
      else if (spec.bodies.some((b) => b.eUnknown)) notes.unshift("Planety s „?“ ve sloupci e nemají v archivu výstřednost, kreslí se kruh (slabší čára).");
      if (spec.bodies.some((b) => b.aEst || b.pEst)) notes.push(`* dopočteno 3. Keplerovým zákonem z hmotnosti hvězdy${spec.massAssumed ? " (hmotnost neznámá, použita 1 M☉)" : ""}.`);
      if (spec.star.rs == null) notes.push("Poloměr hvězdy není známý, kreslí se jako 1 R☉.");
      if (spec.hz) notes.push(`Zelené mezikruží = obyvatelná zóna (Kopparapu et al. 2014): konzervativní ${fmtNum(spec.hz.cons[0], 3)}–${fmtNum(spec.hz.cons[1], 3)} au, slabší optimistická ${fmtNum(spec.hz.opt[0], 3)}–${fmtNum(spec.hz.opt[1], 3)} au; z teploty a poloměru hvězdy${spec.hz.extrapolated ? ", <b>teplota mimo rozsah modelu 2 600–7 200 K – extrapolace</b>" : ""}.`);
      if (spec.skipped.length) notes.push(`Bez dráhy (chybí a i perioda): ${escapeHtml(spec.skipped.join(", "))}.`);
      notes.push("Barva planety podle poloměru: hnědá < 1,6 R⊕ (spíš kamenná), tyrkysová < 4 R⊕, modrá < 10 R⊕, béžová ≥ 10 R⊕ (plynný obr), šedá = neznámý.");
    }
    return `${table}<ul>${notes.map((n) => `<li>${n}</li>`).join("")}</ul><p class="src">${escapeHtml(spec.source)}</p>`;
  }

  // ---------- ovládání ----------
  private action(b: HTMLButtonElement): void {
    switch (b.dataset.a) {
      case "play": this.playing = !this.playing; break;
      case "slower": this.daysPerSec /= 4; break;
      case "faster": this.daysPerSec *= 4; break;
      case "size": this.realSize = !this.realSize; break;
      case "today":
        this.t = Math.min(this.spec!.dated!.max, Math.max(this.spec!.dated!.min, jdNow()));
        break;
      case "home": this.home(); break;
      case "ref":
        this.showRef = !this.showRef;
        this.refGroup.forEach((r) => (r.visible = this.showRef));
        this.fit();
        break;
      case "small": {
        const p = this.q(".sysSmall");
        p.hidden = !p.hidden;
        // oba panely jsou vpravo nahoře, na sebe by se překryly
        if (!p.hidden) this.q(".sysNotes").hidden = true;
        break;
      }
      case "notes": {
        const n = this.q(".sysNotes");
        n.hidden = !n.hidden;
        if (!n.hidden) this.q(".sysSmall").hidden = true;
        break;
      }
    }
    this.syncButtons();
    this.syncDate();
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
    set("small", !this.q(".sysSmall").hidden);
    this.q(".sysSpeed").textContent = `1 s = ${fmtDays(this.daysPerSec)}`;
  }

  private syncDate(): void {
    if (!this.spec?.dated) return;
    this.q<HTMLInputElement>(".sysDate").value = String(Math.round(this.t));
    this.q(".sysDateTxt").textContent = fmtJd(this.t);
  }

  private home(): void {
    this.focus = null;
    this.q(".sysFocus").textContent = "";
    this.startFlight(this.systemExtent() / Math.tan((FOV * DEG) / 2) * 1.25);
  }

  private focusOn(bv: BodyView): void {
    this.focus = bv;
    this.focusPos.copy(bv.world);
    const kids = bv.children.map((c) => c.b.a * (1 + c.b.e));
    // měsíce: ukázat dráhy velkých měsíců (poloměr ≥ 200 km), ne vzdálené nepravidelné (u Jupiteru desítky milionů km)
    const major = bv.children.filter((c) => (c.b.r ?? 0) * 6371 >= 200).map((c) => c.b.a * (1 + c.b.e));
    const extent = major.length ? Math.max(...major) : kids.length ? Math.min(...kids) * 3 : bv.realR * 40;
    this.startFlight(Math.max(extent, bv.realR * 6) / Math.tan((FOV * DEG) / 2) * 1.3);
    this.showInfo(bv);
  }

  private showInfo(bv: BodyView): void {
    this.infoFor = bv;
    this.renderInfo(bv);
    if (bv.b.imgKey) {
      const img = document.createElement("div");
      img.className = "imgs";
      this.q(".sysFocus").appendChild(img);
      void fillImage(img, "slunecni-soustava", bv.b.imgKey, () => this.infoFor === bv && !this.root.hidden);
    }
  }

  private infoFor: BodyView | null = null;

  private renderInfo(bv: BodyView): void {
    const b = bv.b;
    if (b.info) {
      this.q(".sysFocus").innerHTML = `<b>${escapeHtml(b.name)}</b> · ${escapeHtml(b.info)}`;
      return;
    }
    const parts = [b.name !== (b.label ?? b.name) ? b.name : null,
      b.r != null ? `poloměr ${fmtNum(b.r * 6371, 0)} km` : "poloměr neznámý",
      b.kind === "moon" ? `oběh ${fmtDays(b.p)}` : null,
      bv.children.length ? `${bv.children.length} ${bv.children.length === 1 ? "měsíc" : bv.children.length <= 4 ? "měsíce" : "měsíců"}` : null,
      b.note ?? null].filter(Boolean);
    this.q(".sysFocus").innerHTML = `<b>${escapeHtml(b.label ?? b.name)}</b> · ${escapeHtml(parts.join(" · "))}`;
  }

  /** Cíl letu je sledované těleso (nebo hvězda), proto se tu nepředává – těleso se mezitím pohybuje. */
  private startFlight(dist: number): void {
    const dir = this.camera.position.clone().sub(this.controls!.target);
    const fromD = dir.length();
    this.flight = { t0: performance.now(), fromT: this.controls!.target.clone(), dir: dir.normalize(), fromD, toD: dist };
  }

  private resize(): void {
    if (!this.renderer || this.root.hidden) return;
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private systemExtent(): number {
    const spec = this.spec!;
    // se srovnáním aspoň po dráhu Země, jinak by kompaktní soustavy (TRAPPIST-1) srovnání neukázaly
    return Math.max(...spec.bodies.filter((b) => b.kind !== "dwarf" || !spec.dated).map((b) => b.a * (1 + b.e)),
      this.starReal * 20, this.showRef ? 1.05 : 0);
  }

  private fit(resetDir = false): void {
    const dist = this.systemExtent() / Math.tan((FOV * DEG) / 2) * 1.25;
    const dir = !resetDir
      ? this.camera.position.clone().sub(this.controls!.target).normalize()
      : new Vector3(0, 0.62, 0.78).normalize();
    this.focus = null;
    this.flight = null;
    this.camera.position.copy(dir.multiplyScalar(dist));
    this.controls!.target.set(0, 0, 0);
    this.controls!.minDistance = 1e-6;
    this.controls!.maxDistance = Math.max(dist * 40, 60);
    this.controls!.update();
  }

  // ---------- poloha ----------
  /** Poloha tělesa v rovině ekliptiky převedená do scény (y = sever ekliptiky), v au, vůči rodiči. */
  private place3(bv: BodyView, out: Vector3): Vector3 {
    const b = bv.b;
    const dated = !!this.spec!.dated && b.epoch != null;
    const dt = dated ? this.t - b.epoch! : this.t;
    const r = b.rates;
    const a = b.a + (dated && r?.a ? r.a * dt : 0);
    const e = b.e >= 1 ? b.e : Math.min(0.99, Math.max(0, b.e + (dated && r?.e ? r.e * dt : 0)));
    const inc = (b.inc ?? 0) + (dated && r?.inc ? r.inc * dt : 0);
    const node = (b.node ?? 0) + (dated && r?.node ? r.node * dt : 0);
    const w = b.w + (dated && r?.w ? r.w * dt : 0);
    const M = dated ? (b.m0! + b.n! * dt) * DEG : bv.phase + (2 * Math.PI * this.t) / b.p;
    const [x, y] = planeXY(a, e, M);
    this.toScene(x, y, w, inc, node, out);
    const d = bv.drawn;
    if (Number.isNaN(d.node) || Math.abs(node - d.node) > 0.5 || Math.abs(w - d.w) > 0.5 || Math.abs(inc - d.inc) > 0.2) {
      this.drawOrbit(bv, a, e, w, inc, node);
    }
    return out;
  }

  private toScene(x: number, y: number, w: number, inc: number, node: number, out: Vector3): Vector3 {
    const cw = Math.cos(w * DEG), sw = Math.sin(w * DEG);
    const xp = x * cw - y * sw, yp = x * sw + y * cw;
    const ci = Math.cos(inc * DEG), si = Math.sin(inc * DEG), co = Math.cos(node * DEG), so = Math.sin(node * DEG);
    const X = xp * co - yp * ci * so, Y = xp * so + yp * ci * co, Z = yp * si;
    return out.set(X, Z, -Y);
  }

  private drawOrbit(bv: BodyView, a: number, e: number, w: number, inc: number, node: number): void {
    const seg = bv.b.kind === "moon" ? 128 : 360;
    const pts = new Float32Array(seg * 3);
    const v = this.tmp2;
    // hyperbola: jen úsek do vzdálenosti rMax od Slunce (r = a(1 − e·cosh H), a < 0)
    const hMax = e >= 1 ? Math.acosh((1 - Math.max(60, 4 * a * (1 - e)) / a) / e) : 0;
    for (let k = 0; k < seg; k++) {
      let x: number, y: number;
      if (e < 1) {
        const E = (k / seg) * Math.PI * 2;
        x = a * (Math.cos(E) - e);
        y = a * Math.sqrt(1 - e * e) * Math.sin(E);
      } else {
        const H = -hMax + (2 * hMax * k) / (seg - 1);
        x = a * (Math.cosh(H) - e);
        y = -a * Math.sqrt(e * e - 1) * Math.sinh(H);
      }
      this.toScene(x, y, w, inc, node, v);
      pts.set([v.x, v.y, v.z], k * 3);
    }
    bv.orbit.geometry.dispose();
    bv.orbit.geometry = new BufferGeometry();
    bv.orbit.geometry.setAttribute("position", new Float32BufferAttribute(pts, 3));
    bv.drawn = { node, w, inc };
  }

  // ---------- smyčka ----------
  private loop(now: number): void {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const spec = this.spec!;
    if (this.playing) {
      this.t += dt * this.daysPerSec;
      if (spec.dated && (this.t > spec.dated.max || this.t < spec.dated.min)) {
        this.t = Math.min(spec.dated.max, Math.max(spec.dated.min, this.t));
        this.playing = false;
        this.syncButtons();
      }
      if (spec.dated && now - this.dateTick > 250) {
        this.dateTick = now;
        this.syncDate();
      }
    }
    const cam = this.camera;
    const pxWorld = (p: Vector3) => (2 * cam.position.distanceTo(p) * Math.tan((FOV * DEG) / 2)) / innerHeight;

    // polohy (rodiče před dětmi)
    for (const bv of this.bodies) {
      this.place3(bv, bv.mesh.position);
      bv.world.copy(bv.mesh.position);
      if (bv.sats) bv.sats.position.copy(bv.world);
    }

    // sledování tělesa: posun o jeho pohyb, případně dolet
    if (this.focus) {
      const f = this.focus;
      if (f.parent) {
        this.place3(f, f.mesh.position);
        f.world.copy(f.mesh.position).add(f.parent.world);
      }
      if (!this.flight) {
        const d = this.tmp.copy(f.world).sub(this.focusPos);
        cam.position.add(d);
        this.controls!.target.add(d);
      }
      this.focusPos.copy(f.world);
    }
    if (this.flight) {
      const fl = this.flight;
      const k = ease(Math.min(1, (now - fl.t0) / 1100));
      const goal = this.focus ? this.focus.world : this.tmp.set(0, 0, 0);
      this.controls!.target.lerpVectors(fl.fromT, goal, k);
      const d = Math.exp(Math.log(fl.fromD) + (Math.log(fl.toD) - Math.log(fl.fromD)) * k);
      cam.position.copy(this.controls!.target).addScaledVector(fl.dir, d);
      if (k >= 1) this.flight = null;
    }
    this.controls!.update();
    const vd = cam.position.distanceTo(this.controls!.target);
    cam.near = Math.max(1e-9, vd * 0.0005);
    cam.far = vd * 5000;
    cam.updateProjectionMatrix();

    // hvězda: ve zvětšeném režimu nesmí přerůst dráhu nejbližšího tělesa
    const star = this.star!;
    const sPx = pxWorld(star.position);
    const innermost = Math.min(...this.bodies.filter((b) => b.b.kind !== "small").map((b) => b.b.a * (1 - b.b.e)));
    const sr = this.realSize ? Math.max(this.starReal, sPx) : Math.max(this.starReal, Math.min(9 * sPx, innermost * 0.4));
    star.scale.setScalar(sr);
    this.starGlow!.scale.setScalar(Math.max(sr * 6, 6 * sPx));

    this.updateSmall();
    const labelled: BodyView[] = [];
    for (const bv of this.bodies) {
      const px = pxWorld(bv.world);
      let rad = this.realSize ? Math.max(bv.realR, px) : Math.max(bv.realR, bodyPx(bv.b) * px);
      // měsíce: u planety se ukážou, když je jejich dráha na obrazovce dost velká
      let minKid = Infinity;
      for (const c of bv.children) {
        const orbitPx = c.b.a / px;
        c.visible = orbitPx > CHILD_MIN_PX;
        c.mesh.visible = c.orbit.visible = c.visible;
        if (!c.visible) {
          c.label.style.display = "none";
          continue;
        }
        this.place3(c, c.mesh.position);
        c.world.copy(c.mesh.position).add(bv.world);
        const cpx = pxWorld(c.world);
        c.mesh.scale.setScalar(this.realSize ? Math.max(c.realR, cpx) : Math.max(c.realR, Math.min(bodyPx(c.b) * cpx, c.b.a * 0.1)));
        minKid = Math.min(minKid, c.b.a * (1 - c.b.e));
        if (orbitPx > 40) labelled.push(c);
        else c.label.style.display = "none";
      }
      // planeta nesmí ve zvětšení překrýt dráhy svých viditelných měsíců
      if (!this.realSize && Number.isFinite(minKid)) rad = Math.max(bv.realR, Math.min(rad, minKid * 0.45));
      bv.mesh.scale.setScalar(rad);
      labelled.push(bv);
    }
    this.placeLabels(labelled);
    if (this.starLabel) this.place(this.starLabel, star.position, 10);
    for (const r of this.refs) {
      if (this.showRef) this.place(r.label, r.pos, 0);
      else r.label.style.display = "none";
    }
    this.renderer!.render(this.scene, cam);
    this.raf = requestAnimationFrame((n) => this.loop(n));
  }

  // ---------- planetky a komety ----------
  private makeBody: ((b: OrbitBody) => BodyView) | null = null;

  private buildSmall(d: SmallData | null): void {
    this.small = d;
    const groups = this.q(".sysGroups");
    this.q<HTMLInputElement>(".sysFind").value = "";
    this.q(".sysHits").innerHTML = "";
    if (!d) {
      groups.innerHTML = "";
      return;
    }
    if (!this.smallOn.size) Object.keys(d.skupiny).forEach((k) => this.smallOn.add(k));
    groups.innerHTML = Object.entries(d.skupiny).map(([k, name]) => `<label class="fcheck"><input type="checkbox" value="${k}"${this.smallOn.has(k) ? " checked" : ""}>
      <span><i class="dot" style="background:${SMALL_COLORS[k]}"></i>${escapeHtml(name)}</span><span class="dim">${fmtNum(d.pocty[k] ?? 0, 0)}</span></label>`).join("")
      + `<p class="src">JPL SBDB, vzorek (stav ${escapeHtml(d.stazeno.slice(0, 10))}). Podrobnosti v Poznámkách.</p>`;
    if (!this.smallTex) {
      const c = document.createElement("canvas");
      c.width = c.height = 32;
      const g = c.getContext("2d")!;
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(16, 16, 14, 0, Math.PI * 2);
      g.fill();
      this.smallTex = new CanvasTexture(c);
    }
    const n = d.sloupce.jmeno.length;
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("color", new Float32BufferAttribute(new Float32Array(n * 3), 3));
    this.smallPts = new Points(geo, new PointsMaterial({
      size: 4, sizeAttenuation: false, vertexColors: true, map: this.smallTex, transparent: true, alphaTest: 0.3, depthWrite: false,
    }));
    // polohy se mění každý snímek, ohraničující koule by byla stará
    this.smallPts.frustumCulled = false;
    this.scene.add(this.smallPts);
    this.rebuildSmall();
  }

  private rebuildSmall(): void {
    const d = this.small;
    if (!d || !this.smallPts) return;
    this.smallIdx = [];
    const col = this.smallPts.geometry.getAttribute("color") as Float32BufferAttribute;
    const c = new Color();
    d.sloupce.skupina.forEach((g, k) => {
      if (!this.smallOn.has(g)) return;
      c.set(SMALL_COLORS[g]);
      col.setXYZ(this.smallIdx.length, c.r, c.g, c.b);
      this.smallIdx.push(k);
    });
    col.needsUpdate = true;
    this.smallPts.geometry.setDrawRange(0, this.smallIdx.length);
  }

  private updateSmall(): void {
    const d = this.small, pts = this.smallPts;
    if (!d || !pts) return;
    const c = d.sloupce;
    const pos = pts.geometry.getAttribute("position") as Float32BufferAttribute;
    const v = this.tmp2;
    for (let j = 0; j < this.smallIdx.length; j++) {
      const k = this.smallIdx[j];
      const M = (c.m0[k] + c.n[k] * (this.t - c.epocha[k])) * DEG;
      const [x, y] = planeXY(c.a[k], c.e[k], M);
      this.toScene(x, y, c.w[k], c.i[k], c.om[k], v);
      pos.setXYZ(j, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
  }

  private pickSmall(cx: number, cy: number, radius: number): void {
    if (!this.smallPts || !this.smallIdx.length) return;
    const pos = this.smallPts.geometry.getAttribute("position") as Float32BufferAttribute;
    let best = -1, bestD = radius;
    for (let j = 0; j < this.smallIdx.length; j++) {
      this.tmp.fromBufferAttribute(pos, j).project(this.camera);
      if (this.tmp.z > 1) continue;
      const d = Math.hypot(((this.tmp.x + 1) / 2) * innerWidth - cx, ((1 - this.tmp.y) / 2) * innerHeight - cy);
      if (d < bestD) {
        bestD = d;
        best = this.smallIdx[j];
      }
    }
    if (best >= 0) this.selectSmall(best, false);
  }

  /** Vybere planetku/kometu: dráha, popisek, údaje; při fly=true na ni přeletí. */
  selectSmall(k: number, fly = true): void {
    if (!this.small || !this.makeBody) return;
    if (this.smallSel) {
      const old = this.smallSel;
      this.scene.remove(old.mesh, old.orbit);
      old.mesh.geometry.dispose();
      old.orbit.geometry.dispose();
      old.label.remove();
      this.bodies = this.bodies.filter((b) => b !== old);
      this.all = this.all.filter((b) => b !== old);
    }
    const bv = this.makeBody(smallBody(this.small, k));
    this.bodies.push(bv);
    this.smallSel = bv;
    this.place3(bv, bv.mesh.position);
    bv.world.copy(bv.mesh.position);
    if (fly) {
      this.focusOn(bv);
      // odstup tak, aby bylo vidět i Slunce – samotná tečka v prázdnu nic neřekne
      this.startFlight(Math.max(bv.world.length(), 0.3) / Math.tan((FOV * DEG) / 2) * 1.3);
      if (innerWidth < 700) {
        this.q(".sysSmall").hidden = true;
        this.syncButtons();
      }
    } else {
      // klepnutí na bod: jen dráha a údaje, kamera zůstane
      this.showInfo(bv);
    }
  }

  private findSmall(text: string): void {
    const box = this.q(".sysHits");
    const d = this.small;
    const q = norm(text.trim());
    if (!d || q.length < 2) {
      box.innerHTML = "";
      return;
    }
    const hits: number[] = [];
    const names = d.sloupce.jmeno;
    for (let k = 0; k < names.length && hits.length < 8; k++) if (norm(names[k]).includes(q)) hits.push(k);
    box.innerHTML = hits.length
      ? hits.map((k) => `<button class="linkish" data-k="${k}"><i class="dot" style="background:${SMALL_COLORS[d.sloupce.skupina[k]]}"></i>${escapeHtml(names[k])}</button>`).join("")
      : `<span class="dim">Ve vzorku není.</span>`;
  }

  /** Popisky od nejdůležitějších, bez překryvu (hrubý obdélník kolem textu). */
  private placeLabels(list: BodyView[]): void {
    list.sort((a, b) => (b === this.focus ? 1 : 0) - (a === this.focus ? 1 : 0) || b.prio - a.prio);
    const boxes: [number, number, number, number][] = [];
    let n = 0;
    for (const bv of list) {
      const el = bv.label;
      this.tmp.copy(bv.world).project(this.camera);
      if (n >= MAX_LABELS || this.tmp.z > 1 || Math.abs(this.tmp.x) > 1.05 || Math.abs(this.tmp.y) > 1.05) {
        el.style.display = "none";
        continue;
      }
      const x = ((this.tmp.x + 1) / 2) * innerWidth + 8, y = ((1 - this.tmp.y) / 2) * innerHeight - 7;
      const w = (bv.b.label ?? bv.b.name).length * 6.6 + 4, h = 14;
      if (boxes.some(([bx, by, bw, bh]) => x < bx + bw && x + w > bx && y < by + bh && y + h > by)) {
        el.style.display = "none";
        continue;
      }
      boxes.push([x, y, w, h]);
      n++;
      el.style.display = "";
      el.classList.toggle("focus", bv === this.focus);
      el.style.transform = `translate(${x}px, ${y}px)`;
    }
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

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const jdNow = () => Date.now() / 86400000 + 2440587.5;

function fmtJd(jd: number): string {
  return new Date((jd - 2440587.5) * 86400000).toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" });
}

function fmtDays(d: number): string {
  const y = d / 365.25;
  if (y >= 2) return `${fmtNum(y, 1)} ${y < 5 ? "roku" : "let"}`;
  if (d >= 1) return `${fmtNum(d, d < 10 ? 1 : 0)} ${d < 2 ? "den" : d < 5 ? "dny" : "dní"}`;
  const h = d * 24;
  if (h >= 1) return `${fmtNum(h, 1)} h`;
  return `${fmtNum(h * 60, 1)} min`;
}
