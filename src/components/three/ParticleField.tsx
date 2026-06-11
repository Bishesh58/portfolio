import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uScroll;
  attribute float aScale;
  attribute float aRandom;
  varying float vAlpha;
  varying float vHeat;

  // simplex-ish cheap noise
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

    // flowing wave field
    float n = noise(vec3(pos.x * 0.25, pos.y * 0.25, uTime * 0.12 + aRandom));
    float n2 = noise(vec3(pos.x * 0.08 + uTime * 0.05, pos.y * 0.08, uTime * 0.08));
    pos.z += n * 1.6 + n2 * 2.4;
    pos.y += sin(uTime * 0.3 + pos.x * 0.4 + aRandom * 6.28) * 0.18;

    // mouse repulsion
    float d = distance(pos.xy, uMouse.xy);
    float force = smoothstep(2.6, 0.0, d);
    vec2 dir = normalize(pos.xy - uMouse.xy + 0.0001);
    pos.xy += dir * force * 1.4;
    pos.z += force * 1.8;

    vHeat = force + smoothstep(0.4, 1.0, n * 0.5 + 0.5) * 0.35;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * (26.0 / -mv.z) * (1.0 + force * 2.0);
    vAlpha = smoothstep(18.0, 6.0, -mv.z) * (0.35 + 0.65 * (n * 0.5 + 0.5));
  }
`

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float disc = smoothstep(0.5, 0.1, d);
    vec3 bone = vec3(0.55, 0.54, 0.52);
    vec3 ember = vec3(1.0, 0.3, 0.0);
    vec3 col = mix(bone, ember, clamp(vHeat, 0.0, 1.0));
    gl_FragColor = vec4(col, disc * vAlpha);
  }
`

function Particles() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()
  const mouse = useRef(new THREE.Vector3(99, 99, 0))
  const target = useRef(new THREE.Vector3(99, 99, 0))

  const { positions, scales, randoms } = useMemo(() => {
    const count = 26000
    const cols = 220
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
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uScroll: { value: 0 },
    }),
    [],
  )

  useFrame((state, delta) => {
    uniforms.uTime.value += delta
    const p = state.pointer
    target.current.set((p.x * viewport.width) / 2, (p.y * viewport.height) / 2, 0)
    mouse.current.lerp(target.current, 0.08)
    uniforms.uMouse.value.copy(mouse.current)
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
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <Particles />
    </Canvas>
  )
}
