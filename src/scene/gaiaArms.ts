import {
  AdditiveBlending,
  DataTexture,
  DoubleSide,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  RGBAFormat,
  type Scene,
  type Vector3,
} from "three";
import { LY_PER_PC } from "../core/units";

interface GaiaArmsData {
  mapy: Record<string, { nazev: string; n: number; min: number; max: number; data: number[] }>;
}

const MODES = [
  { key: null, label: "Gaia: vyp" },
  { key: "poggio2021", label: "Gaia: Poggio 2021" },
  { key: "drimmel2023", label: "Gaia: DR3 (OB)" },
] as const;

/**
 * Nadhustota mladých hvězd z Gaia (pipeline/gaia_ramena.py) jako průsvitná vrstva v rovině Galaxie kolem Slunce.
 * Ukazuje ramena tak, jak je vidí data, pro srovnání s modelem Reid 2019. Kreslí se jen kladná nadhustota.
 */
export class GaiaArms {
  private mesh: Mesh<PlaneGeometry, MeshBasicMaterial> | null = null;
  private data: Promise<GaiaArmsData> | null = null;
  private mode = 0;
  private textures = new Map<string, DataTexture>();
  private url: string;
  private scene: Scene;
  private sun: Vector3;

  constructor(url: string, scene: Scene, sun: Vector3, button: HTMLButtonElement) {
    this.url = url;
    this.scene = scene;
    this.sun = sun;
    button.textContent = MODES[0].label;
    button.onclick = async () => {
      this.mode = (this.mode + 1) % MODES.length;
      button.textContent = MODES[this.mode].label;
      button.setAttribute("aria-pressed", String(this.mode > 0));
      try {
        await this.show(MODES[this.mode].key);
      } catch {
        button.textContent = "Gaia: chyba načtení";
      }
    };
  }

  private async show(key: string | null): Promise<void> {
    if (!key) {
      if (this.mesh) this.mesh.visible = false;
      return;
    }
    this.data ??= fetch(this.url).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json() as Promise<GaiaArmsData>;
    });
    const d = await this.data;
    const m = d.mapy[key];
    let tex = this.textures.get(key);
    if (!tex) {
      tex = texture(m.n, m.data);
      this.textures.set(key, tex);
    }
    if (!this.mesh) {
      const size = (m.max - m.min) * 1000 * LY_PER_PC;
      this.mesh = new Mesh(new PlaneGeometry(size, size),
        new MeshBasicMaterial({ transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide }));
      // rovina XY → rovina Galaxie; lokální +Y míří na −Z scény, tedy ke l = 90° (osa j mřížky)
      this.mesh.rotation.x = -Math.PI / 2;
      const c = ((m.min + m.max) / 2) * 1000 * LY_PER_PC;
      this.mesh.position.set(this.sun.x + c, this.sun.y, this.sun.z - c);
      this.mesh.renderOrder = -1;
      this.scene.add(this.mesh);
    }
    this.mesh.material.map = tex;
    this.mesh.material.needsUpdate = true;
    this.mesh.visible = true;
  }
}

/** Mřížka data[i * n + j] (i = X k centru, j = Y ke l = 90°) → textura: u podél X, v podél Y. */
function texture(n: number, data: number[]): DataTexture {
  const px = new Uint8Array(n * n * 4);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // stupnice jako v SpiralMap (vrstevnice 0–1,5); ztlumeno, aby pod tím byly vidět objekty
      const v = Math.max(0, Math.min(1, data[i * n + j] / 1.5)) * 0.6;
      const k = (j * n + i) * 4;
      // jantarová, ať se neplete s modrobílými body ramen modelu
      px[k] = 255 * v; px[k + 1] = 170 * v; px[k + 2] = 60 * v; px[k + 3] = 255;
    }
  }
  const t = new DataTexture(px, n, n, RGBAFormat);
  t.magFilter = LinearFilter;
  t.minFilter = LinearFilter;
  t.needsUpdate = true;
  return t;
}
