import { useEffect, useRef } from 'react'
import type { Theme } from '../lib/theme'

type Vec = { x: number; y: number }

type Tentacle = {
  spread: number
  points: Vec[]
  segLen: number
}

type Sentinel = {
  x: number
  y: number
  vx: number
  vy: number
  svx: number
  svy: number
  angle: number
  phase: number
  size: number
  glow: number
  arms: Tentacle[]
}

type Pulse = { from: number; to: number; t: number; speed: number }

type MatrixCol = {
  x: number
  y: number
  speed: number
  len: number
  tick: number
  chars: string[]
}

type Palette = {
  fade: string
  body: string
  edge: string
  arm: string
  eye: string
  link: string
  pulse: string
  bloom: string
  matrixHead: string
  matrixRgb: string
  matrixLine: string
  matrixGrid: string
}

const MATRIX_CHARS = '01アイウエオカキ01010<>{}|/\\'

const PALETTE: Record<Theme, Palette> = {
  dark: {
    fade: 'rgba(0, 0, 0, 0.13)',
    body: '#071007',
    edge: 'rgba(0, 255, 65, 0.28)',
    arm: '#0a180c',
    eye: '#00ff41',
    link: 'rgba(0, 255, 65, 0.18)',
    pulse: '#7fff9a',
    bloom: '#00cc33',
    matrixHead: '#00ff41',
    matrixRgb: '0, 255, 65',
    matrixLine: 'rgba(0, 255, 65, 0.14)',
    matrixGrid: 'rgba(0, 255, 65, 0.045)',
  },
  light: {
    fade: 'rgba(237, 247, 239, 0.16)',
    body: '#b8d4bc',
    edge: 'rgba(0, 143, 40, 0.32)',
    arm: '#98b89c',
    eye: '#008f28',
    link: 'rgba(0, 143, 40, 0.16)',
    pulse: '#008f28',
    bloom: '#00aa33',
    matrixHead: '#008f28',
    matrixRgb: '0, 143, 40',
    matrixLine: 'rgba(0, 143, 40, 0.12)',
    matrixGrid: 'rgba(0, 143, 40, 0.04)',
  },
}

const TAU = Math.PI * 2

function clamp(v: number, l: number, h: number) {
  return Math.max(l, Math.min(h, v))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function matrixChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
}

function createNoise2D() {
  const perm = new Uint8Array(512)
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const grad = (h: number, x: number, y: number) => {
    const hh = h & 3
    const u = hh < 2 ? x : y
    const v = hh < 2 ? y : x
    return ((hh & 1) ? -u : u) + ((hh & 2) ? -2 * v : 2 * v)
  }
  return (x: number, y: number) => {
    const xi = Math.floor(x) & 255
    const yi = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const u = fade(xf)
    const v = fade(yf)
    const aa = perm[xi] + yi
    const ab = perm[xi + 1] + yi
    const ba = perm[xi] + yi + 1
    const bb = perm[xi + 1] + yi + 1
    return (1 - v) * ((1 - u) * grad(perm[aa], xf, yf) + u * grad(perm[ab], xf - 1, yf)) +
      v * ((1 - u) * grad(perm[ba], xf, yf - 1) + u * grad(perm[bb], xf - 1, yf - 1))
  }
}

function curlField(
  noise: (x: number, y: number) => number,
  x: number,
  y: number,
  t: number,
  scale: number,
) {
  const e = 0.75
  const nx = x * scale + t * 0.00008
  const ny = y * scale + t * 0.00006
  const n1 = noise(nx, ny + e)
  const n2 = noise(nx, ny - e)
  const n3 = noise(nx + e, ny)
  const n4 = noise(nx - e, ny)
  return { x: (n1 - n2) / (2 * e), y: -(n3 - n4) / (2 * e) }
}

function relaxArm(points: Vec[], segLen: number, base: Vec, iters: number) {
  for (let k = 0; k < iters; k++) {
    points[0].x = base.x
    points[0].y = base.y
    for (let i = points.length - 1; i > 0; i--) {
      const a = points[i]
      const b = points[i - 1]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy) || 0.0001
      const diff = (segLen - dist) / dist
      const ox = dx * diff
      const oy = dy * diff
      if (i === points.length - 1) {
        a.x += ox
        a.y += oy
      } else {
        a.x += ox * 0.5
        a.y += oy * 0.5
        if (i > 1) {
          b.x -= ox * 0.5
          b.y -= oy * 0.5
        }
      }
    }
    points[0].x = base.x
    points[0].y = base.y
  }
}

function createSentinel(x: number, y: number): Sentinel {
  const size = 0.75 + Math.random() * 0.55
  const armCount = 3 + Math.floor(Math.random() * 2)
  const segCount = 5 + Math.floor(Math.random() * 2)
  const reach = 10 + size * 8
  const segLen = reach / segCount
  const facing = Math.random() * TAU
  const back = facing + Math.PI

  const arms: Tentacle[] = Array.from({ length: armCount }, (_, i) => {
    const spread = (i / (armCount - 1 || 1) - 0.5) * 1.05 + (Math.random() - 0.5) * 0.12
    const armAngle = back + spread
    return {
      spread,
      segLen,
      points: Array.from({ length: segCount + 1 }, (_, j) => ({
        x: x - Math.cos(armAngle) * segLen * j * 0.15,
        y: y - Math.sin(armAngle) * segLen * j * 0.15,
      })),
    }
  })

  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    svx: 0,
    svy: 0,
    angle: facing,
    phase: Math.random() * TAU,
    size,
    glow: Math.random(),
    arms,
  }
}

function createMatrixCols(w: number, mobile: boolean): MatrixCol[] {
  const gap = mobile ? 34 : 26
  const count = Math.ceil(w / gap) + 2
  return Array.from({ length: count }, (_, i) => ({
    x: i * gap + (Math.random() - 0.5) * 6,
    y: Math.random() * 800 - 200,
    speed: 0.35 + Math.random() * 0.85,
    len: 10 + Math.floor(Math.random() * 14),
    tick: Math.floor(Math.random() * 24),
    chars: Array.from({ length: 28 }, matrixChar),
  }))
}

export default function FluxField({ theme }: { theme: Theme }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const noise = createNoise2D()
    const ripple = { x: -9999, y: -9999, active: false, r: 0 }

    let raf = 0
    let visible = true
    let width = 0
    let height = 0
    let time = 0
    let swarm: Sentinel[] = []
    let pulses: Pulse[] = []
    let matrixCols: MatrixCol[] = []

    const spawn = (count: number) => {
      swarm = Array.from({ length: count }, () =>
        createSentinel(Math.random() * width, Math.random() * height),
      )
      pulses = []
    }

    const layout = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const mobile = width < 640
      const count = mobile ? 70 : width < 1024 ? 130 : 190
      spawn(count)
      matrixCols = createMatrixCols(width, mobile)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      ripple.x = e.clientX - rect.left
      ripple.y = e.clientY - rect.top
      ripple.active = true
      ripple.r = 0
    }

    const onLeave = () => {
      ripple.active = false
    }

    const drawMatrixLayer = (palette: Palette) => {
      const rowH = 13
      ctx.font = '11px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.strokeStyle = palette.matrixGrid
      ctx.lineWidth = 0.5
      const gridStep = width < 768 ? 34 : 26
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (const col of matrixCols) {
        col.y += col.speed
        if (col.y - col.len * rowH > height + 40) {
          col.y = -col.len * rowH - Math.random() * 120
          col.speed = 0.35 + Math.random() * 0.85
        }

        for (let t = 0; t < col.len; t++) {
          const y = col.y - t * rowH
          if (y < -rowH || y > height + rowH) continue
          const ch = col.chars[(col.tick + col.len - t) % col.chars.length]
          if (t === 0) {
            ctx.fillStyle = palette.matrixHead
            ctx.shadowColor = palette.matrixHead
            ctx.shadowBlur = 6
          } else {
            const alpha = 0.03 + (1 - t / col.len) * 0.11
            ctx.fillStyle = `rgba(${palette.matrixRgb}, ${alpha})`
            ctx.shadowBlur = 0
          }
          ctx.fillText(ch, col.x, y)
        }
        ctx.shadowBlur = 0

        if (Math.random() > 0.94) {
          col.tick = (col.tick + 1) % col.chars.length
          col.chars[col.tick] = matrixChar()
        }
      }
    }

    const updateSentinel = (s: Sentinel, i: number) => {
      const curlA = curlField(noise, s.x, s.y, time + s.phase * 600, 0.0032)
      const curlB = curlField(noise, s.x + 80, s.y - 40, time * 1.2 + s.phase * 400, 0.0065)
      const orbit = time * 0.0007 + s.phase

      s.vx += curlA.x * 0.22 + curlB.x * 0.11 + Math.cos(orbit) * 0.012
      s.vy += curlA.y * 0.22 + curlB.y * 0.11 + Math.sin(orbit * 1.07) * 0.012

      if (ripple.active) {
        const dx = s.x - ripple.x
        const dy = s.y - ripple.y
        const dist = Math.hypot(dx, dy)
        if (dist < 140 && dist > 0.001) {
          const force = (1 - dist / 140) * 0.045
          s.vx += (dx / dist) * force
          s.vy += (dy / dist) * force
        }
      }

      s.vx *= 0.94
      s.vy *= 0.94

      const rawSp = Math.hypot(s.vx, s.vy)
      if (rawSp > 2.2) {
        s.vx = (s.vx / rawSp) * 2.2
        s.vy = (s.vy / rawSp) * 2.2
      }

      s.svx = lerp(s.svx, s.vx, 0.06)
      s.svy = lerp(s.svy, s.vy, 0.06)
      s.x += s.svx
      s.y += s.svy

      if (s.x < -30) s.x = width + 30
      if (s.x > width + 30) s.x = -30
      if (s.y < -30) s.y = height + 30
      if (s.y > height + 30) s.y = -30

      const speed = Math.hypot(s.svx, s.svy)
      s.angle = lerp(s.angle, Math.atan2(s.svy, s.svx), 0.035 + speed * 0.015)
      s.glow = clamp(s.glow + (Math.random() - 0.48) * 0.04, 0, 1)

      const bodyR = 2.2 + s.size * 1.6
      const whip = 1 + speed * 0.45
      const backDir = s.angle + Math.PI

      for (const arm of s.arms) {
        const baseAngle = backDir + arm.spread + Math.sin(time * 0.0012 + s.phase) * 0.1
        const base = {
          x: s.x + Math.cos(baseAngle) * bodyR * 0.72,
          y: s.y + Math.sin(baseAngle) * bodyR * 0.62,
        }

        const reach = arm.segLen * arm.points.length * whip
        const perpX = -Math.sin(baseAngle)
        const perpY = Math.cos(baseAngle)

        for (let si = 1; si < arm.points.length; si++) {
          const t = si / (arm.points.length - 1)
          const wave =
            Math.sin(time * 0.0025 + s.phase + si * 0.75 + i * 0.04) * (1.5 + speed * 0.6) * t
          const along = reach * t
          const target = {
            x:
              base.x +
              Math.cos(baseAngle) * along +
              perpX * wave -
              s.svx * (1.6 + t * 1.2),
            y:
              base.y +
              Math.sin(baseAngle) * along * 0.92 +
              perpY * wave -
              s.svy * (1.6 + t * 1.2),
          }
          const pt = arm.points[si]
          pt.x = lerp(pt.x, target.x, 0.14 + t * 0.06)
          pt.y = lerp(pt.y, target.y, 0.14 + t * 0.06)
        }

        relaxArm(arm.points, arm.segLen, base, 5)
      }
    }

    const drawMatrixTethers = (s: Sentinel, palette: Palette, speed: number, index: number) => {
      if (index % 4 !== 0) return
      const upLen = 22 + speed * 6 + s.size * 4
      const downLen = 32 + speed * 9 + s.size * 5

      ctx.strokeStyle = palette.matrixLine
      ctx.lineWidth = 0.55
      ctx.setLineDash([1, 5])
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x, s.y - upLen)
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x, s.y + downLen)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.font = '9px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(${palette.matrixRgb}, ${0.12 + speed * 0.04})`
      ctx.fillText(matrixChar(), s.x, s.y - upLen * 0.45)
      ctx.fillText(matrixChar(), s.x, s.y + downLen * 0.55)
    }

    const drawSentinel = (s: Sentinel, palette: Palette, index: number) => {
      const bodyR = 2.2 + s.size * 1.6
      const speed = Math.hypot(s.svx, s.svy)

      drawMatrixTethers(s, palette, speed, index)

      for (const arm of s.arms) {
        const pts = arm.points
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y)
        ctx.strokeStyle = palette.arm
        ctx.globalAlpha = 0.55 + speed * 0.08
        ctx.lineWidth = Math.max(0.55, 1.6 + speed * 0.06)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
        ctx.globalAlpha = 1

        const tip = pts[pts.length - 1]
        ctx.fillStyle = palette.bloom
        ctx.globalAlpha = 0.35 + speed * 0.15
        ctx.beginPath()
        ctx.arc(tip.x, tip.y, 0.7 + speed * 0.05, 0, TAU)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      ctx.fillStyle = palette.body
      ctx.strokeStyle = palette.edge
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.ellipse(s.x, s.y, bodyR * 1.15, bodyR * 0.85, s.angle, 0, TAU)
      ctx.fill()
      ctx.stroke()

      if (s.glow > 0.5 || speed > 0.8) {
        ctx.shadowColor = palette.bloom
        ctx.shadowBlur = 5 + speed * 1.5
      }
      ctx.fillStyle = palette.eye
      ctx.beginPath()
      ctx.arc(s.x - bodyR * 0.28, s.y - bodyR * 0.08, 0.55 + s.size * 0.15, 0, TAU)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(s.x + bodyR * 0.22, s.y + bodyR * 0.05, 0.45 + s.size * 0.12, 0, TAU)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const draw = () => {
      const palette = PALETTE[theme]
      time += 16
      if (ripple.active) ripple.r = Math.min(ripple.r + 2.2, 140)

      ctx.fillStyle = palette.fade
      ctx.fillRect(0, 0, width, height)

      drawMatrixLayer(palette)

      if (ripple.active && ripple.r > 0) {
        const g = ctx.createRadialGradient(ripple.x, ripple.y, 0, ripple.x, ripple.y, ripple.r)
        g.addColorStop(0, palette.link.replace(/[\d.]+\)$/, '0.07)'))
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height)
      }

      for (let i = 0; i < swarm.length; i++) updateSentinel(swarm[i], i)

      const linkDist = width < 768 ? 52 : 64
      const grid = new Map<string, number[]>()
      for (let i = 0; i < swarm.length; i++) {
        const s = swarm[i]
        const gx = Math.floor(s.x / linkDist)
        const gy = Math.floor(s.y / linkDist)
        const key = `${gx},${gy}`
        const cell = grid.get(key)
        if (cell) cell.push(i)
        else grid.set(key, [i])
      }

      ctx.lineWidth = 0.5
      for (let i = 0; i < swarm.length; i++) {
        const a = swarm[i]
        const gx = Math.floor(a.x / linkDist)
        const gy = Math.floor(a.y / linkDist)
        let links = 0
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const cell = grid.get(`${gx + ox},${gy + oy}`)
            if (!cell) continue
            for (const j of cell) {
              if (j <= i || links >= 2) continue
              const b = swarm[j]
              const dx = a.x - b.x
              const dy = a.y - b.y
              const d2 = dx * dx + dy * dy
              const maxD = linkDist * linkDist
              if (d2 > maxD) continue
              const alpha = (1 - Math.sqrt(d2) / linkDist) * (0.07 + a.glow * 0.24)
              ctx.strokeStyle = palette.link.replace(/[\d.]+\)$/, `${alpha})`)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
              links++
              if (Math.random() > 0.9985 && pulses.length < 36) {
                pulses.push({ from: i, to: j, t: 0, speed: 0.012 + Math.random() * 0.018 })
              }
            }
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += p.speed
        if (p.t >= 1) {
          pulses.splice(i, 1)
          continue
        }
        const a = swarm[p.from]
        const b = swarm[p.to]
        const px = a.x + (b.x - a.x) * p.t
        const py = a.y + (b.y - a.y) * p.t
        ctx.fillStyle = palette.pulse
        ctx.shadowColor = palette.bloom
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(px, py, 1.2, 0, TAU)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      const order = swarm.map((s, i) => ({ s, i })).sort((a, b) => a.s.size - b.s.size)
      for (const { s, i } of order) drawSentinel(s, palette, i)
    }

    const drawStatic = () => {
      const palette = PALETTE[theme]
      ctx.clearRect(0, 0, width, height)
      drawMatrixLayer(palette)
      swarm.forEach((s, i) => drawSentinel(s, palette, i))
    }

    const loop = () => {
      if (visible && !reduced) draw()
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(wrap)

    const onResize = () => {
      layout()
      if (reduced) drawStatic()
    }

    layout()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)

    if (reduced) drawStatic()
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      io.disconnect()
    }
  }, [theme])

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.72]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />
    </div>
  )
}
