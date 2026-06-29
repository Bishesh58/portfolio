import { useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap'
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
    <div className="grain w-full max-w-full overflow-x-clip">
      <Nav onOpenCommandPalette={() => setPaletteOpen(true)} />
      <MatrixScrollProgress />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Cursor />
      <main className="w-full max-w-full overflow-x-clip">
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
