import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function scrollToSection(target: string, offset = -80) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 })
  } else {
    const el = document.querySelector(target)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
