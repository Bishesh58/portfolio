import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import Preloader from './components/Preloader'
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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  // Keep default lag smoothing while the preloader runs so heavy startup work
  // (three.js parse, shader compile) pauses the intro timeline instead of
  // skipping it. Disable it afterwards for tight Lenis/ScrollTrigger sync.
  useEffect(() => {
    if (ready) gsap.ticker.lagSmoothing(0)
  }, [ready])

  return (
    <div className="grain">
      <Cursor />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
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
