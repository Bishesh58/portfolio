import { gsap } from './gsap'

const GLYPHS = '01アイウエオカキ01010<>{}|/\\'

type Options = {
  stagger?: number
  onComplete?: () => void
}

export function matrixTypeChars(chars: HTMLElement[], { stagger = 0.042, onComplete }: Options = {}) {
  if (!chars.length) {
    onComplete?.()
    return
  }

  const originals = chars.map((el) => el.textContent ?? '')

  chars.forEach((el, i) => {
    const final = originals[i]
    const isSpace = final.trim() === '' && final.length > 0

    gsap.delayedCall(i * stagger, () => {
      if (!final) {
        gsap.set(el, { opacity: 1 })
        if (i === chars.length - 1) onComplete?.()
        return
      }

      if (isSpace) {
        el.textContent = final
        gsap.set(el, { opacity: 1 })
        if (i === chars.length - 1) onComplete?.()
        return
      }

      let frame = 0
      const frames = 2 + Math.floor(Math.random() * 3)

      const tick = () => {
        if (frame < frames) {
          el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          gsap.set(el, { opacity: 0.75, color: '#00cc33' })
          frame++
          gsap.delayedCall(0.03, tick)
        } else {
          el.textContent = final
          gsap.fromTo(
            el,
            { opacity: 0.35, color: '#00ff41' },
            {
              opacity: 1,
              color: '',
              duration: 0.14,
              clearProps: 'color',
              onComplete: i === chars.length - 1 ? onComplete : undefined,
            },
          )
        }
      }

      tick()
    })
  })
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
