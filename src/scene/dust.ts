import {
  BackSide,
  BoxGeometry,
  Color,
  Data3DTexture,
  GLSL3,
  LinearFilter,
  Matrix4,
  Mesh,
  RedFormat,
  type Scene,
  ShaderMaterial,
  Vector3,
} from "three";
import { LY_PER_PC } from "../core/units";

interface DustLod {
  id: string;
  nazev: string;
  soubor: string;
  nx: number;
  ny: number;
  nz: number;
  krok_pc: number;
  rozliseni_pc: number;
  x0: number;
  y0: number;
  z0: number;
}
interface DustMeta {
  kodovani: { lo: number; hi: number };
  lody: DustLod[];
}

const MODES = [
  { lod: null, label: "Prach: vyp" },
  { lod: "prehled", label: "Prach: 6 kpc" },
  { lod: "detail", label: "Prach: 3 kpc" },
] as const;

const vertexShader = /* glsl */ `
uniform vec3 camLocal;
out vec3 vOrigin;
out vec3 vDirection;
void main() {
  vOrigin = camLocal;
  vDirection = position - camLocal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Paprsek v lokálních souřadnicích krychle −0,5…0,5; hustota z logaritmického kódu zpět na mag/pc,
// průhlednost 1 − exp(−gain · A0), kde A0 je extinkce na úseku paprsku (mag). Krok podle velikosti voxelu,
// náhodný posun začátku proti pruhům.
const fragmentShader = /* glsl */ `
precision highp float;
precision highp sampler3D;
uniform sampler3D map;
uniform vec3 sizePc;
uniform vec3 voxels;
uniform float lo;
uniform float hi;
uniform float gain;
uniform vec3 tint;
uniform int maxSteps;
in vec3 vOrigin;
in vec3 vDirection;
out vec4 color;

vec2 hitBox(vec3 o, vec3 d) {
  vec3 inv = 1.0 / d;
  vec3 t0 = (vec3(-0.5) - o) * inv;
  vec3 t1 = (vec3(0.5) - o) * inv;
  vec3 tmin = min(t0, t1), tmax = max(t0, t1);
  return vec2(max(max(tmin.x, tmin.y), tmin.z), min(min(tmax.x, tmax.y), tmax.z));
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec3 dir = normalize(vDirection);
  vec2 b = hitBox(vOrigin, dir);
  if (b.x >= b.y) discard;
  b.x = max(b.x, 0.0);
  float len = b.y - b.x;
  // počet kroků ~ počet protnutých voxelů
  int n = int(clamp(length(dir * len * voxels) * 1.2, 4.0, float(maxSteps)));
  float dt = len / float(n);
  float dsPc = length(dir * dt * sizePc);
  vec3 p = vOrigin + dir * (b.x + dt * hash(gl_FragCoord.xy));
  vec3 acc = vec3(0.0);
  float a = 0.0;
  for (int i = 0; i < 512; i++) {
    if (i >= n) break;
    float v = texture(map, p + 0.5).r;
    if (v > 0.0) {
      // u okrajů krychle (data tam jsou nejméně spolehlivá) prach plynule vyzní, ať nejsou vidět hrany
      vec3 e = 0.5 - abs(p);
      float fade = smoothstep(0.0, 0.06, min(e.x, e.y)) * smoothstep(0.0, 0.12, e.z);
      float rho = pow(10.0, lo + v * (hi - lo));
      float s = (1.0 - exp(-gain * rho * dsPc)) * fade;
      acc += (1.0 - a) * s * tint * (0.25 + 0.75 * v * v);
      a += (1.0 - a) * s;
      if (a > 0.97) break;
    }
    p += dir * dt;
  }
  if (a < 0.002) discard;
  color = vec4(acc, a);
}`;

/**
 * 3D mapa prachu Vergely et al. 2022 (pipeline/prach.py) vykreslená raymarchingem v krychli kolem Slunce.
 * Prach ztmaví kulisu Galaxie za sebou a slabě se rozsvítí; objekty se kreslí až po něm, takže zůstanou vidět.
 */
export class Dust {
  private meta: Promise<DustMeta> | null = null;
  private meshes = new Map<string, Mesh<BoxGeometry, ShaderMaterial>>();
  private mode = 0;
  private readonly inv = new Matrix4();
  private readonly cam = new Vector3();
  /** mobil: méně kroků paprsku */
  private readonly maxSteps = matchMedia("(pointer: coarse)").matches ? 96 : 192;

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
      const m = MODES[this.mode];
      button.textContent = m.lod ? `${m.label} …` : m.label;
      button.setAttribute("aria-pressed", String(this.mode > 0));
      try {
        await this.show(m.lod);
        if (MODES[this.mode] === m) button.textContent = m.label;
      } catch (e) {
        console.error(e);
        button.textContent = "Prach: chyba načtení";
      }
    };
  }

  private async show(lod: string | null): Promise<void> {
    for (const [id, mesh] of this.meshes) mesh.visible = id === lod;
    if (!lod || this.meshes.has(lod)) return;
    this.meta ??= fetch(this.url).then((r) => {
      if (!r.ok) throw new Error(`prach.json: HTTP ${r.status}`);
      return r.json() as Promise<DustMeta>;
    });
    const meta = await this.meta;
    const L = meta.lody.find((x) => x.id === lod);
    if (!L) throw new Error(`prach: chybí ${lod}`);
    const base = this.url.slice(0, this.url.lastIndexOf("/") + 1);
    const data = await loadBytes(base + L.soubor);
    if (data.length !== L.nx * L.ny * L.nz) throw new Error(`prach ${lod}: ${data.length} B místo ${L.nx * L.ny * L.nz}`);
    const mesh = this.build(L, data, meta.kodovani);
    this.meshes.set(lod, mesh);
    mesh.visible = MODES[this.mode].lod === lod;
    this.scene.add(mesh);
  }

  private build(L: DustLod, data: Uint8Array, k: { lo: number; hi: number }): Mesh<BoxGeometry, ShaderMaterial> {
    const tex = new Data3DTexture(data, L.nx, L.ny, L.nz);
    tex.format = RedFormat;
    tex.minFilter = tex.magFilter = LinearFilter;
    tex.unpackAlignment = 1;
    tex.needsUpdate = true;
    const sizePc = new Vector3(L.nx, L.ny, L.nz).multiplyScalar(L.krok_pc);
    const mat = new ShaderMaterial({
      glslVersion: GLSL3,
      vertexShader,
      fragmentShader,
      uniforms: {
        map: { value: tex },
        camLocal: { value: new Vector3() },
        sizePc: { value: sizePc },
        voxels: { value: new Vector3(L.nx, L.ny, L.nz) },
        lo: { value: k.lo },
        hi: { value: k.hi },
        gain: { value: 2.5 },
        tint: { value: new Color(0.62, 0.42, 0.3) },
        maxSteps: { value: this.maxSteps },
      },
      side: BackSide,
      transparent: true,
      premultipliedAlpha: true,
      depthWrite: false,
      depthTest: false,
    });
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), mat);
    // lokální x → X (k centru), y → Y (l = 90°, ve scéně −Z), z → Z (sever, ve scéně +Y)
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.copy(sizePc).multiplyScalar(LY_PER_PC);
    const c = (n: number, x0: number) => (x0 + ((n - 1) * L.krok_pc) / 2) * LY_PER_PC;
    mesh.position.set(this.sun.x + c(L.nx, L.x0), this.sun.y + c(L.nz, L.z0), this.sun.z - c(L.ny, L.y0));
    mesh.frustumCulled = false;
    // po kulise Galaxie (−3), před objekty (0)
    mesh.renderOrder = -2;
    mesh.onBeforeRender = (_r, _s, camera) => {
      mesh.updateMatrixWorld();
      this.inv.copy(mesh.matrixWorld).invert();
      mat.uniforms.camLocal.value.copy(this.cam.copy(camera.position).applyMatrix4(this.inv));
    };
    return mesh;
  }
}

/** Soubor .bin.gz – rozbalí ho prohlížeč (DecompressionStream); když ho už rozbalil server, vezme se, jak je. */
async function loadBytes(url: string): Promise<Uint8Array> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  const buf = new Uint8Array(await r.arrayBuffer());
  if (buf[0] !== 0x1f || buf[1] !== 0x8b) return buf;
  const s = new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Uint8Array(await new Response(s).arrayBuffer());
}
