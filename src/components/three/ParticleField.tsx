import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../../lib/theme'

// Shared cursor-light uniforms, referenced by BOTH the particle material and
// the volumetric light-cone overlay so they stay perfectly in sync.
type LightUniforms = {
  uMouse: { value: THREE.Vector2 } // cursor in NDC [-1,1]
  uMouseDir: { value: THREE.Vector2 } // travel direction (aspect-corrected)
  uMouseSpeed: { value: number }
  uAspect: { value: number }
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

    // Dust-in-the-beam: brighten particles ONLY where they fall inside the
    // spotlight cone. Computed in screen space so it tracks the cursor exactly.
    // The cone apex sits slightly behind the cursor so the beam starts wide.
    vec2 ndc = clip.xy / clip.w;
    vec2 P = vec2(ndc.x * uAspect, ndc.y);
    vec2 M = vec2(uMouse.x * uAspect, uMouse.y);
    vec2 apex = M - uMouseDir * 0.1;
    vec2 relA = P - apex;
    vec2 dirA = relA / max(length(relA), 0.0001);
    float aim = dot(dirA, uMouseDir);
    float ang = acos(clamp(aim, -1.0, 1.0));
    float distC = length(P - M);
    // hard cut: nothing behind the cursor along the beam direction
    float front = smoothstep(-0.04, 0.02, dot(P - M, uMouseDir));
    float halfAngle = mix(0.30, 0.42, uMouseSpeed);
    float across = 1.0 - smoothstep(halfAngle * 0.1, halfAngle, ang);
    float beamLen = mix(0.9, 1.5, uMouseSpeed);
    float reach = smoothstep(beamLen, 0.0, distC);
    float inFront = smoothstep(-0.05, 0.25, aim);
    float beam = across * reach * inFront * front;
    float light = clamp(beam * (0.6 + 0.5 * uMouseSpeed), 0.0, 1.6);

    gl_Position = clip;
    gl_PointSize = aScale * (26.0 / -mv.z) * (1.0 + light * 1.8);

    float baseAlpha = smoothstep(18.0, 6.0, -mv.z) * (0.32 + 0.68 * (n * 0.5 + 0.5));
    vAlpha = baseAlpha + light * 1.0;
    vHeat = light + smoothstep(0.4, 1.0, n * 0.5 + 0.5) * 0.3;
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

    float distC = length(P - M);                  // distance from the cursor

    // Hard cut so NO light spills behind the cursor along the beam direction.
    float front = smoothstep(-0.04, 0.02, dot(P - M, uMouseDir));

    // Contained cone: moderate width, moderate reach.
    float halfAngle = mix(0.30, 0.42, uMouseSpeed);
    float across = 1.0 - smoothstep(halfAngle * 0.1, halfAngle, ang);
    float beamLen = mix(0.9, 1.5, uMouseSpeed);
    float along = smoothstep(beamLen, 0.0, distC);
    float inFront = smoothstep(-0.05, 0.25, aim);

    // tiny hot origin point (masks the centre singularity, not a big circle)
    float source = smoothstep(0.05, 0.0, distC);
    // concentrated white core down the centre of the beam
    float core = pow(max(across, 0.0), 1.5);
    // keep the white bright for most of the length, fade only near the far end
    float lenFade = 1.0 - smoothstep(beamLen * 0.6, beamLen, distC);

    float fill = across * along * inFront * front;   // soft coloured cone body
    float bright = core * lenFade * inFront * front;  // white-hot core down length
    float intensity = fill * (0.5 + 0.4 * uMouseSpeed)
                    + bright * (0.8 + 0.3 * uMouseSpeed)
                    + source * 0.5;
    intensity = clamp(intensity, 0.0, 1.8);

    // white-hot down the axis (full length), themed tint toward the cone edges
    float hot = clamp(bright + source, 0.0, 1.0);
    vec3 col = mix(uColor, vec3(1.0), hot * 0.85);

    gl_FragColor = vec4(col, intensity * uOpacity);
  }
`

// Dark mode: light/ember particles glow additively against the ink backdrop.
// Light mode: ink-toned particles painted normally so they read on a pale page.
const THEME_PARTICLES: Record<
  Theme,
  { base: THREE.Vector3; heat: THREE.Vector3; alpha: number; blending: THREE.Blending; cone: THREE.Vector3; coneOpacity: number }
> = {
  dark: {
    base: new THREE.Vector3(0.55, 0.54, 0.52),
    heat: new THREE.Vector3(1.0, 0.3, 0.0),
    alpha: 1.0,
    blending: THREE.AdditiveBlending,
    cone: new THREE.Vector3(1.0, 0.42, 0.12),
    coneOpacity: 0.55,
  },
  light: {
    base: new THREE.Vector3(0.08, 0.09, 0.12),
    heat: new THREE.Vector3(0.78, 0.22, 0.0),
    alpha: 0.9,
    blending: THREE.NormalBlending,
    cone: new THREE.Vector3(0.95, 0.4, 0.1),
    coneOpacity: 0.22,
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
  const uniforms = useMemo(
    () => ({
      ...light,
      uColor: { value: THEME_PARTICLES.dark.cone.clone() },
      uOpacity: { value: THEME_PARTICLES.dark.coneOpacity },
    }),
    [light],
  )

  useEffect(() => {
    const t = THEME_PARTICLES[theme]
    uniforms.uColor.value.copy(t.cone)
    uniforms.uOpacity.value = t.coneOpacity
  }, [theme, uniforms])

  // Drawn after the particles, on top, as additive glow. Frustum culling off so
  // the screen-filling quad is never dropped.
  return (
    <mesh renderOrder={10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={coneVertexShader}
        fragmentShader={coneFragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
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
    }),
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.max(delta, 0.001)
    const p = state.pointer // NDC [-1,1], screen-aligned
    const aspect = size.width / Math.max(size.height, 1)
    light.uAspect.value = aspect

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
