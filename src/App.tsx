import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import { setLenis } from './lib/scroll'
import Cursor from './components/Cursor'
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
  useEffect(() => {
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

  return (
    <div className="grain">
      <Cursor />
      <Nav />
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
