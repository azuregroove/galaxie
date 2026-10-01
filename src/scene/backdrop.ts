import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
  type Texture,
} from "three";
import { LY_PER_PC } from "../core/units";
import { ARMS, armRadius, armXZ, type Arm } from "./arms";

/** Poloměr disku D25 (87 400 ly / 2), stejně jako v prototypu. */
export const DISK_R = 43700;

/** Výchozí zesílení jasu ramen; s modelem Reid 2019 jsou body hustší, 1,5 stačí. */
export const ARM_GAIN_DEFAULT = 1.5;

/**
 * Oblak hvězd Galaxie jako kulisa. Ramena podle modelu Reid et al. 2019 (arms.ts), ztlumeně i tam, kde je
 * rameno doložené jen masery mimo rozsah modelu. Příčka a výplň disku jsou dál schematické.
 */
export function buildBackdrop(glow: Texture): Points<BufferGeometry, ShaderMaterial> {
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
  const warm = new Color("#ffd9a0");
  const blue = new Color("#a9c4ff");
  const white = new Color("#e8ecff");
  const pink = new Color("#ff9fc8");
  // blízký konec příčky míří do 1. kvadrantu (l > 0), úhel ~27° ke spojnici Slunce–centrum
  const barAng = (27 * Math.PI) / 180;
  const c = new Color();
  const lyPerKpc = LY_PER_PC * 1000;

  // body po délce ramen rovnoměrně: kumulativní délka po krocích 1°
  const steps: { arm: Arm; beta: number; cum: number }[] = [];
  let total = 0;
  for (const arm of ARMS) {
    for (let beta = arm.extMin; beta < arm.extMax; beta++) {
      total += armRadius(arm, beta + 0.5) * (Math.PI / 180);
      steps.push({ arm, beta, cum: total });
    }
  }
  const pickStep = (u: number) => {
    let lo = 0, hi = steps.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (steps[mid].cum < u) lo = mid + 1; else hi = mid;
    }
    return steps[lo];
  };

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
    } else if (t < 0.74) {
      const st = pickStep(rnd() * total);
      const beta = st.beta + rnd();
      const R = armRadius(st.arm, beta);
      // šířka ramene roste úměrně poloměru (stejně jako v SpiralMap); šířku bereme jako ±1σ
      const sigma = (st.arm.width / 2) * (R / st.arm.rKink);
      [x, z] = armXZ(R + gauss() * sigma, beta, lyPerKpc);
      const along = gauss() * sigma * lyPerKpc * 0.5;
      x += along * Math.sin((beta * Math.PI) / 180);
      z -= along * Math.cos((beta * Math.PI) / 180);
      y = gauss() * (150 + R * lyPerKpc * 0.003);
      c.copy(blue).lerp(white, rnd() * 0.6);
      if (rnd() < 0.05) c.copy(pink);
      if (beta < st.arm.betaMin || beta > st.arm.betaMax) c.multiplyScalar(0.45);
      s = 0.9;
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
