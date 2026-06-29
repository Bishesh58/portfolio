type Scroller = { scrollTo: (target: string, opts: { offset: number; duration: number }) => void }

let instance: Scroller | null = null

export function setLenis(l: Scroller | null) {
  instance = l
}

export function scrollToSection(target: string, offset = -80) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 })
    return
  }
  const el = document.querySelector(target)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}
