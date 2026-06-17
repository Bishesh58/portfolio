import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function scrollToSection(target: string) {
  if (instance) {
    instance.scrollTo(target, { offset: 0, duration: 1.4 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
