import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../../lib/theme'

// Keep in sync with .cursor-ring in index.css (40px diameter).
const CURSOR_RING_RADIUS_PX = 20

// Shared cursor-light uniforms, referenced by BOTH the particle material and
// the volumetric light-cone overlay so they stay perfectly in sync.
type LightUniforms = {
  uMouse: { value: THREE.Vector2 } // cursor in NDC [-1,1]
  uMouseDir: { value: THREE.Vector2 } // travel direction (aspect-corrected)
  uMouseSpeed: { value: number }
  uAspect: { value: number }
  uResolution: { value: THREE.Vector2 } // canvas CSS px, for circular bulb
  uBulbRadiusPx: { value: number }
}

const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uMouseDir;
  uniform float uMouseSpeed;
  uniform float uAspect;
  attribute float aScale;
  attribute float aRandom;
  varying float vAlpha;
  varying float vHeat;

  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
                       dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                   mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
                       dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
               mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
                       dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                   mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
                       dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
  }

  void main() {
    vec3 pos = position;

    // flowing wave field (ambient drift)
    float n = noise(vec3(pos.x * 0.25, pos.y * 0.25, uTime * 0.12 + aRandom));
    float n2 = noise(vec3(pos.x * 0.08 + uTime * 0.05, pos.y * 0.08, uTime * 0.08));
    pos.z += n * 1.6 + n2 * 2.4;
    pos.y += sin(uTime * 0.3 + pos.x * 0.4 + aRandom * 6.28) * 0.18;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip = projectionMatrix * mv;

    // ---- Spotlight repulsion ----
    // Instead of lighting up the dust caught in the beam, we shove it OUT of the
    // cone so the spotlight carves a clean, empty channel through the field.
    // All maths is in aspect-corrected screen space so it matches the visible
    // cone overlay exactly. The apex sits just behind the cursor.
    vec2 ndc = clip.xy / clip.w;
    vec2 P = vec2(ndc.x * uAspect, ndc.y);
    vec2 M = vec2(uMouse.x * uAspect, uMouse.y);
    vec2 axis = uMouseDir;
    vec2 apex = M - axis * 0.1;
    vec2 rel = P - apex;

    float along = dot(rel, axis);              // distance forward along the beam
    vec2 perp = vec2(-axis.y, axis.x);
    float side = dot(rel, perp);               // signed lateral offset from the axis

    float halfAngle = mix(0.30, 0.42, uMouseSpeed);
    float beamLen   = mix(0.9, 1.5, uMouseSpeed);

    // The visible beam fades out before the geometric cone edge, so narrow the
    // repulsion cone to hug the actual light instead of the wider geometry.
    float pushAngle = halfAngle * 0.72;
    float halfW = max(along, 0.0) * tan(pushAngle); // beam half-width at this depth

    // Gate the push to the cone body only: in front of the cursor, within the
    // beam length, and not spilling behind the cursor.
    float forward   = smoothstep(0.0, 0.05, along);
    float withinLen = 1.0 - smoothstep(beamLen * 0.8, beamLen, along);
    float front     = smoothstep(-0.04, 0.02, dot(P - M, axis));
    float gate = forward * withinLen * front;

    // Divergent shove: scale each particle's offset from the axis OUTWARD so the
    // beam spreads the dust apart and thins it, rather than collapsing everything
    // onto a single edge line (which streaks when the cone moves). The fade then
    // dissolves what's left, so the cone clears with no pile-up or trailing line.
    float inside = 1.0 - smoothstep(halfW * 0.9, halfW, abs(side));
    float removed = inside * gate;            // 1 = fully inside the beam
    float spread = removed * 0.85;
    vec2 push = perp * side * spread;         // proportional to offset -> divergent
    vec2 ndcPush = vec2(push.x / uAspect, push.y);

    gl_Position = vec4(clip.xy + ndcPush * clip.w, clip.z, clip.w);
    gl_PointSize = aScale * (26.0 / -mv.z);

    float baseAlpha = smoothstep(18.0, 6.0, -mv.z) * (0.32 + 0.68 * (n * 0.5 + 0.5));
    vAlpha = baseAlpha * (1.0 - removed * 0.95);
    vHeat = smoothstep(0.4, 1.0, n * 0.5 + 0.5) * 0.3;
  }
`

const particleFragmentShader = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorHeat;
  uniform float uAlpha;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float disc = smoothstep(0.5, 0.1, d);
    vec3 col = mix(uColorBase, uColorHeat, clamp(vHeat, 0.0, 1.0));
    // hottest particles in the beam tip toward white, like lit dust
    col = mix(col, vec3(1.0), clamp(vHeat - 0.8, 0.0, 1.0) * 0.6);
    gl_FragColor = vec4(col, disc * vAlpha * uAlpha);
  }
`

// Full-screen overlay that draws the actual volumetric light cone.
const coneVertexShader = /* glsl */ `
  varying vec2 vNdc;
  void main() {
    vNdc = position.xy;            // plane spans -1..1 -> NDC
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const coneFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vNdc;
  uniform vec2 uMouse;
  uniform vec2 uMouseDir;
  uniform float uMouseSpeed;
  uniform float uAspect;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uOriginBoost;
  uniform float uOriginGlow;
  uniform float uOriginHot;
  uniform vec2 uResolution;
  uniform float uBulbRadiusPx;
  uniform float uBulbGain;
  uniform float uBulbHot;

  vec2 ndcToPx(vec2 ndc) {
    return vec2(
      (ndc.x * 0.5 + 0.5) * uResolution.x,
      (1.0 - (ndc.y * 0.5 + 0.5)) * uResolution.y
    );
  }

  void main() {
    // Work in aspect-corrected space so the cone stays symmetric.
    vec2 P = vec2(vNdc.x * uAspect, vNdc.y);
    vec2 M = vec2(uMouse.x * uAspect, uMouse.y);

    // Virtual apex sits just behind the cursor, so the beam is already a little
    // wide where it leaves the cursor (a real spotlight opens up immediately).
    vec2 apex = M - uMouseDir * 0.1;
    vec2 relA = P - apex;
    vec2 dirA = relA / max(length(relA), 0.0001);
    float aim = dot(dirA, uMouseDir);             // 1 = straight ahead
    float ang = acos(clamp(aim, -1.0, 1.0));

    // Hard cut so NO light spills behind the cursor along the beam direction.
    float front = smoothstep(-0.04, 0.02, dot(P - M, uMouseDir));

    // Contained cone: moderate width, moderate reach.
    float halfAngle = mix(0.30, 0.42, uMouseSpeed);
    float across = 1.0 - smoothstep(halfAngle * 0.1, halfAngle, ang);
    float beamLen = mix(0.9, 1.5, uMouseSpeed);
    float inFront = smoothstep(-0.05, 0.25, aim);
    float alongBeam = max(dot(P - M, uMouseDir), 0.0);

    // Single cone mask — outer fade uses the same axial coordinate as the hot
    // falloff so there is no second shape with its own visible end cap.
    float alongFade = 1.0 - smoothstep(beamLen * 0.02, beamLen, alongBeam);
    alongFade *= alongFade;
    float beam = across * alongFade * inFront * front;

    // Hot brightness — purely 1D along the beam axis, no lateral inner envelope
    float hotFalloff = exp(-alongBeam / (beamLen * 1.45));

    float base = 0.42 + 0.38 * uMouseSpeed;
    float intensity = beam * base * (1.0 + hotFalloff * uOriginBoost);
    intensity += beam * hotFalloff * hotFalloff * uOriginGlow;

    // Filled white circle at cursor — pixel-perfect round, matches .cursor-ring (40px)
    float distPx = length(ndcToPx(vNdc) - ndcToPx(uMouse));
    float fadeW = uBulbRadiusPx * 0.62;
    float bulb = 1.0 - smoothstep(uBulbRadiusPx - fadeW, uBulbRadiusPx + 2.5, distPx);
    bulb = bulb * bulb * bulb;
    intensity += bulb * uBulbGain;

    intensity = clamp(intensity, 0.0, 2.8);

    float hot = clamp(hotFalloff * uOriginHot, 0.0, 1.0);
    vec3 col = mix(uColor, vec3(1.0), max(hot, bulb * uBulbHot));

    gl_FragColor = vec4(col, intensity * uOpacity);
  }
`

// Dark mode: light/ember particles glow additively against the ink backdrop.
// Light mode: ink-toned particles painted normally so they read on a pale page.
const THEME_PARTICLES: Record<
  Theme,
  {
    base: THREE.Vector3
    heat: THREE.Vector3
    alpha: number
    blending: THREE.Blending
    cone: THREE.Vector3
    coneOpacity: number
    coneBlending: THREE.Blending
    originBoost: number
    originGlow: number
    originHot: number
    bulbGain: number
    bulbHot: number
  }
> = {
  dark: {
    base: new THREE.Vector3(0.55, 0.54, 0.52),
    heat: new THREE.Vector3(1.0, 0.3, 0.0),
    alpha: 1.0,
    blending: THREE.AdditiveBlending,
    // pure white beam, brightened additively against the ink backdrop
    cone: new THREE.Vector3(1.0, 1.0, 1.0),
    coneOpacity: 0.5,
    coneBlending: THREE.AdditiveBlending,
    originBoost: 1.05,
    originGlow: 0.55,
    originHot: 0.98,
    bulbGain: 0.82,
    bulbHot: 0.72,
  },
  light: {
    base: new THREE.Vector3(0.08, 0.09, 0.12),
    heat: new THREE.Vector3(0.78, 0.22, 0.0),
    alpha: 0.9,
    blending: THREE.NormalBlending,
    // branded ember beam on the pale page
    cone: new THREE.Vector3(0.95, 0.4, 0.1),
    coneOpacity: 0.24,
    coneBlending: THREE.AdditiveBlending,
    originBoost: 1.25,
    originGlow: 0.22,
    originHot: 0.82,
    bulbGain: 1.3,
    bulbHot: 1.0,
  },
}

function Particles({ theme, light }: { theme: Theme; light: LightUniforms }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, scales, randoms } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 10000 : 26000
    const cols = isMobile ? 140 : 220
    const rows = Math.ceil(count / cols)
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randoms = new Float32Array(count)
    const w = 22
    const h = 12
    for (let i = 0; i < count; i++) {
      const cx = (i % cols) / cols
      const cy = Math.floor(i / cols) / rows
      positions[i * 3] = (cx - 0.5) * w + (Math.random() - 0.5) * 0.06
      positions[i * 3 + 1] = (cy - 0.5) * h + (Math.random() - 0.5) * 0.06
      positions[i * 3 + 2] = 0
      scales[i] = 0.6 + Math.random() * 1.2
      randoms[i] = Math.random()
    }
    return { positions, scales, randoms }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      ...light,
      uColorBase: { value: THEME_PARTICLES.dark.base.clone() },
      uColorHeat: { value: THEME_PARTICLES.dark.heat.clone() },
      uAlpha: { value: THEME_PARTICLES.dark.alpha },
    }),
    [light],
  )

  useEffect(() => {
    const t = THEME_PARTICLES[theme]
    uniforms.uColorBase.value.copy(t.base)
    uniforms.uColorHeat.value.copy(t.heat)
    uniforms.uAlpha.value = t.alpha
    if (matRef.current) {
      matRef.current.blending = t.blending
      matRef.current.needsUpdate = true
    }
  }, [theme, uniforms])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
  })

  return (
    <points rotation={[-0.35, 0, 0]} position={[0, -1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function LightCone({ theme, light }: { theme: Theme; light: LightUniforms }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      ...light,
      uColor: { value: THEME_PARTICLES.dark.cone.clone() },
      uOpacity: { value: THEME_PARTICLES.dark.coneOpacity },
      uOriginBoost: { value: THEME_PARTICLES.dark.originBoost },
      uOriginGlow: { value: THEME_PARTICLES.dark.originGlow },
      uOriginHot: { value: THEME_PARTICLES.dark.originHot },
      uBulbGain: { value: THEME_PARTICLES.dark.bulbGain },
      uBulbHot: { value: THEME_PARTICLES.dark.bulbHot },
    }),
    [light],
  )

  useEffect(() => {
    const t = THEME_PARTICLES[theme]
    uniforms.uColor.value.copy(t.cone)
    uniforms.uOpacity.value = t.coneOpacity
    uniforms.uOriginBoost.value = t.originBoost
    uniforms.uOriginGlow.value = t.originGlow
    uniforms.uOriginHot.value = t.originHot
    uniforms.uBulbGain.value = t.bulbGain
    uniforms.uBulbHot.value = t.bulbHot
    if (matRef.current) {
      matRef.current.blending = t.coneBlending
      matRef.current.needsUpdate = true
    }
  }, [theme, uniforms])

  // Drawn after the particles, on top. Blending is theme-dependent: additive so
  // the white beam glows on dark, normal so the black beam darkens on light.
  // Frustum culling off so the screen-filling quad is never dropped.
  return (
    <mesh renderOrder={10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={coneVertexShader}
        fragmentShader={coneFragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THEME_PARTICLES[theme].coneBlending}
      />
    </mesh>
  )
}

function Scene({ theme }: { theme: Theme }) {
  const { size } = useThree()
  const mouseNdc = useRef(new THREE.Vector2(0, 0))
  const prevNdc = useRef(new THREE.Vector2(0, 0))
  const mouseDir = useRef(new THREE.Vector2(1, 0))
  const mouseSpeed = useRef(0)
  const tmp = useRef(new THREE.Vector2())

  const light = useMemo<LightUniforms>(
    () => ({
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseDir: { value: new THREE.Vector2(1, 0) },
      uMouseSpeed: { value: 0 },
      uAspect: { value: 1 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBulbRadiusPx: { value: CURSOR_RING_RADIUS_PX },
    }),
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.max(delta, 0.001)
    const p = state.pointer // NDC [-1,1], screen-aligned
    const aspect = size.width / Math.max(size.height, 1)
    light.uAspect.value = aspect

    const canvas = state.gl.domElement
    light.uResolution.value.set(canvas.clientWidth, canvas.clientHeight)
    light.uBulbRadiusPx.value = CURSOR_RING_RADIUS_PX

    // Light smoothing so the source sits on the cursor without jitter.
    mouseNdc.current.lerp(tmp.current.set(p.x, p.y), 0.35)
    light.uMouse.value.copy(mouseNdc.current)

    // Direction + speed from the raw pointer delta (aspect-corrected so the
    // beam points exactly where the mouse moves on screen).
    const dx = (p.x - prevNdc.current.x) * aspect
    const dy = p.y - prevNdc.current.y
    prevNdc.current.set(p.x, p.y)
    const moved = Math.sqrt(dx * dx + dy * dy)

    if (moved > 0.0008) {
      mouseDir.current.lerp(tmp.current.set(dx / moved, dy / moved), 0.25)
      if (mouseDir.current.lengthSq() > 1e-6) mouseDir.current.normalize()
    }

    // Normalise speed to 0..1; rise fast, fall slow so the beam lingers a
    // moment when the cursor pauses, then fades.
    const targetSpeed = Math.min(moved / dt / 10, 1)
    const rate = targetSpeed > mouseSpeed.current ? 0.3 : 0.05
    mouseSpeed.current += (targetSpeed - mouseSpeed.current) * rate

    light.uMouseDir.value.copy(mouseDir.current)
    light.uMouseSpeed.value = mouseSpeed.current
  })

  return (
    <>
      <Particles theme={theme} light={light} />
      <LightCone theme={theme} light={light} />
    </>
  )
}

export default function ParticleField({ theme }: { theme: Theme }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // Pause GPU rendering while the hero is scrolled out of view to save battery.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.75]}
        frameloop={reduced || !active ? 'demand' : 'always'}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        className="absolute! inset-0"
      >
        <Scene theme={theme} />
      </Canvas>
    </div>
  )
}
