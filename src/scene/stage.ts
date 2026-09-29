import { CanvasTexture, Color, PerspectiveCamera, Plane, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type FrameHook = (dt: number) => void;

interface Flight {
  t0: number;
  dur: number;
  fromP: Vector3;
  fromT: Vector3;
  toP: Vector3;
  toT: Vector3;
}

const UP = new Vector3(0, 1, 0);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Renderer, kamera, ovládání, přelety a smyčka vykreslování. */
export class Stage {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  static readonly FOV = 50;
  readonly camera = new PerspectiveCamera(Stage.FOV, 1, 0.1, 1e6);
  readonly controls: OrbitControls;
  readonly glow: CanvasTexture;
  width = 1;
  height = 1;

  private hooks: FrameHook[] = [];
  private flight: Flight | null = null;
  private keys: Record<string, boolean> = {};
  private last = performance.now();
  private shift = 0;
  private shiftGoal = 0;

  constructor(container: HTMLElement, background: string) {
    // Na hustých displejích je MSAA skoro neviditelné, ale na slabých telefonech stojí nejvíc výkonu.
    this.renderer = new WebGLRenderer({ antialias: devicePixelRatio < 2, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
    this.scene.background = new Color(background);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 300000;
    this.controls.screenSpacePanning = true;
    this.controls.zoomToCursor = true;

    this.glow = makeGlowTexture();

    addEventListener("resize", () => this.resize());
    addEventListener("keydown", (e) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
      this.keys[e.key.toLowerCase()] = true;
    });
    addEventListener("keyup", (e) => (this.keys[e.key.toLowerCase()] = false));
    addEventListener("blur", () => (this.keys = {}));
    this.resize();
  }

  onFrame(h: FrameHook): void {
    this.hooks.push(h);
  }

  /** Posune střed pohledu o `px` nahoru, aby cíl nebyl schovaný pod panelem (mobilní karta). */
  setCenterShift(px: number): void {
    this.shiftGoal = px;
  }

  get viewDistance(): number {
    return this.camera.position.distanceTo(this.controls.target);
  }

  resize(): void {
    this.width = innerWidth;
    this.height = innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  flyTo(target: Vector3, dist: number, dir?: Vector3): void {
    const d = dir ? dir.clone().normalize() : this.camera.position.clone().sub(this.controls.target).normalize();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.flight = {
      t0: performance.now(),
      dur: reduced ? 1 : 1300,
      fromP: this.camera.position.clone(),
      fromT: this.controls.target.clone(),
      toT: target.clone(),
      toP: target.clone().addScaledVector(d, dist),
    };
  }

  /** Přiblíží pohled k bodu obrazovky (px): nový cíl leží v rovině kolmé k pohledu skrz dosavadní cíl. */
  zoomAt(px: number, py: number, factor = 0.4): void {
    const ndc = new Vector2((px / this.width) * 2 - 1, -(py / this.height) * 2 + 1);
    const ray = new Raycaster();
    ray.setFromCamera(ndc, this.camera);
    const dir = this.camera.getWorldDirection(new Vector3());
    const hit = ray.ray.intersectPlane(new Plane().setFromNormalAndCoplanarPoint(dir, this.controls.target), new Vector3());
    this.flyTo(hit ?? this.controls.target, Math.max(this.controls.minDistance, this.viewDistance * factor));
  }

  jumpTo(target: Vector3, offset: Vector3): void {
    this.controls.target.copy(target);
    this.camera.position.copy(target).add(offset);
    this.controls.update();
  }

  start(): void {
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      if (this.flight) {
        const f = this.flight;
        const t = Math.min(1, (now - f.t0) / f.dur);
        const k = ease(t);
        this.controls.target.lerpVectors(f.fromT, f.toT, k);
        this.camera.position.lerpVectors(f.fromP, f.toP, k);
        if (t >= 1) this.flight = null;
      }
      this.keyMove(dt);
      this.controls.update();
      // Rozsah od desetin ly po stovky tisíc ly se do jedné hloubkové mapy nevejde, proto near/far podle vzdálenosti.
      const vd = this.viewDistance;
      this.camera.near = Math.max(0.01, vd * 0.002);
      this.camera.far = Math.max(4e5, vd * 50);
      this.applyShift(dt);
      this.camera.updateProjectionMatrix();
      for (const h of this.hooks) h(dt);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private applyShift(dt: number): void {
    this.shift += (this.shiftGoal - this.shift) * Math.min(1, dt * 10);
    if (Math.abs(this.shift - this.shiftGoal) < 0.5) this.shift = this.shiftGoal;
    const d = Math.round(this.shift);
    const { camera, width: w, height: h } = this;
    if (!d) {
      if (camera.view?.enabled) camera.clearViewOffset();
      camera.fov = Stage.FOV;
      camera.aspect = w / h;
      return;
    }
    // Výřez z vyššího virtuálního snímku; fov a aspect jsou pro celý snímek, aby měřítko zůstalo stejné.
    const full = h + 2 * Math.abs(d);
    camera.fov = (2 * Math.atan(Math.tan((Stage.FOV * Math.PI) / 360) * (full / h)) * 180) / Math.PI;
    camera.aspect = w / full;
    camera.setViewOffset(w, full, 0, d > 0 ? 2 * d : 0, w, h);
  }

  private keyMove(dt: number): void {
    const k = this.keys;
    const f = new Vector3();
    this.camera.getWorldDirection(f);
    f.y = 0;
    if (f.lengthSq() < 1e-6) f.set(0, 0, -1);
    f.normalize();
    const r = new Vector3().crossVectors(f, UP).normalize();
    const m = new Vector3();
    if (k.w || k.arrowup) m.add(f);
    if (k.s || k.arrowdown) m.sub(f);
    if (k.d || k.arrowright) m.add(r);
    if (k.a || k.arrowleft) m.sub(r);
    if (k.e) m.y += 1;
    if (k.q) m.y -= 1;
    if (m.lengthSq() === 0) return;
    m.normalize().multiplyScalar(this.viewDistance * 0.9 * dt);
    this.camera.position.add(m);
    this.controls.target.add(m);
    this.flight = null;
  }
}

function makeGlowTexture(): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.25, "rgba(255,255,255,.55)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}
