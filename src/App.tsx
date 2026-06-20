import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import { setLenis } from './lib/scroll'
import Cursor from './components/Cursor'
import CommandPalette from './components/CommandPalette'
import MatrixScrollProgress from './components/matrix/MatrixScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import ExperienceSection from './components/ExperienceSection'
import Skills from './components/Skills'
import AIWorkflow from './components/AIWorkflow'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touchLike = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches

    if (reduced || touchLike) {
      setLenis(null)
      return
    }

    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="grain">
      <Nav onOpenCommandPalette={() => setPaletteOpen(true)} />
      <MatrixScrollProgress />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Cursor />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <ExperienceSection />
        <Skills />
        <AIWorkflow />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
