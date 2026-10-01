import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
  type Texture,
  type Vector3,
} from "three";

/** Poloměr disku D25 (87 400 ly / 2), stejně jako v prototypu. */
export const DISK_R = 43700;

/** Výchozí zesílení jasu ramen; původní 1 bylo přes vrstvy objektů skoro neviditelné. */
export const ARM_GAIN_DEFAULT = 2.5;

/**
 * Schematický oblak hvězd Galaxie převzatý z prototypu.
 * Ramena NEJSOU podle modelu z literatury – nahradí je etapa 5 (Reid et al. 2019).
 */
export function buildBackdrop(glow: Texture, sun: Vector3): Points<BufferGeometry, ShaderMaterial> {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const gauss = () => {
    let u = 0;
    while (!u) u = rnd();
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  // Na telefonech stačí menší oblak, je to jen kulisa.
  const N = matchMedia("(max-width:760px)").matches ? 60000 : 110000;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const siz = new Float32Array(N);
  const armMask = new Float32Array(N);
  const k = Math.tan((12 * Math.PI) / 180);
  const r0 = 22500;
  const phases = [Math.PI, Math.PI / 2, 0, -Math.PI / 2];
  const warm = new Color("#ffd9a0");
  const blue = new Color("#a9c4ff");
  const white = new Color("#e8ecff");
  const pink = new Color("#ff9fc8");
  const barAng = (-27 * Math.PI) / 180;
  const c = new Color();

  for (let i = 0; i < N; i++) {
    let x: number, y: number, z: number, s: number;
    const t = rnd();
    if (t < 0.18) {
      const a = gauss() * 9000, b = gauss() * 3500, h = gauss() * 2200;
      x = a * Math.cos(barAng) - b * Math.sin(barAng);
      z = a * Math.sin(barAng) + b * Math.cos(barAng);
      y = h;
      c.copy(warm).lerp(white, rnd() * 0.3);
      s = 1.2;
    } else if (t < 0.72) {
      const arm = Math.floor(rnd() * 4);
      const r = 3500 + Math.pow(rnd(), 0.8) * (DISK_R + 4000 - 3500);
      const phi = phases[arm] - Math.log(r / r0) / k;
      const spread = 700 + r * 0.045;
      x = Math.cos(phi) * r + gauss() * spread;
      z = Math.sin(phi) * r + gauss() * spread;
      y = gauss() * (260 + r * 0.004);
      c.copy(blue).lerp(white, rnd() * 0.6);
      if (rnd() < 0.05) c.copy(pink);
      s = 0.9;
      armMask[i] = 1;
    } else if (t < 0.76) {
      const u = rnd() * 9000 - 4500;
      const ang = Math.PI + 0.2;
      x = sun.x + Math.cos(ang) * u * 0.4 + gauss() * 700;
      z = sun.z + u + gauss() * 700;
      y = gauss() * 250;
      c.copy(blue).lerp(white, 0.5);
      s = 0.8;
      armMask[i] = 1;
    } else {
      const r = Math.sqrt(rnd()) * (DISK_R + 6000);
      const phi = rnd() * Math.PI * 2;
      x = Math.cos(phi) * r;
      z = Math.sin(phi) * r;
      y = gauss() * 350;
      c.copy(white).lerp(warm, rnd() * 0.4).multiplyScalar(0.55);
      s = 0.7;
    }
    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    siz[i] = s;
  }

  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(pos, 3));
  g.setAttribute("color", new BufferAttribute(col, 3));
  g.setAttribute("sz", new BufferAttribute(siz, 1));
  g.setAttribute("arm", new BufferAttribute(armMask, 1));
  const m = new ShaderMaterial({
    uniforms: { map: { value: glow }, armGain: { value: 1 } },
    // Zesílení ramen jde i do velikosti bodu: z dálky má bod 1 px a samotná barva by se rychle saturovala.
    vertexShader: /* glsl */ `
      attribute float sz; attribute float arm; uniform float armGain; varying vec3 vC;
      void main(){ float g = mix(1., armGain, arm); vC = color * g;
        vec4 mv = modelViewMatrix * vec4(position, 1.);
        float ps = clamp(sz * 260. / -mv.z, 1., 5.) * mix(1., clamp(.75 + .25 * armGain, .75, 2.4), arm);
        gl_PointSize = g <= 0. ? 0. : ps; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D map; varying vec3 vC;
      void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC * .55, t.a * .8); }`,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const p = new Points(g, m);
  p.frustumCulled = false;
  return p;
}
