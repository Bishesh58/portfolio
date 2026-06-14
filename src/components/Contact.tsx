import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import MagneticButton from './MagneticButton'
import { profile } from '../data/resume'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create('.contact-title', { type: 'chars' })
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.025,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
      gsap.from('.contact-cta', {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: ref.current, start: 'top 60%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden px-6 pt-32 pb-12 md:px-12 md:pt-48">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 translate-y-1/2 rounded-full bg-ember/12 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl text-center">
        <p className="kicker mb-8 justify-center">Got a project? Let's talk</p>
        <h2 className="contact-title font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] font-black tracking-tighter uppercase">
          Let's build
          <br />
          <span className="font-serif font-normal text-ember normal-case italic">something great</span>
        </h2>

        <div className="contact-cta mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="group rounded-full border border-ember bg-ember/10 px-10 py-5 font-mono text-sm tracking-[0.2em] text-bone uppercase transition-colors duration-300 hover:bg-ember hover:text-ink glow-ember"
          >
            {profile.email}
          </MagneticButton>
          <MagneticButton
            href="/Bishesh-Sunam-CV.pdf"
            download
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-bone/25 px-10 py-5 font-mono text-sm tracking-[0.2em] text-bone-dim uppercase transition-colors duration-300 hover:border-bone hover:text-bone"
          >
            Download CV ↓
          </MagneticButton>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ember">
            LinkedIn ↗
          </a>
          <span className="h-1 w-1 rounded-full bg-bone/30" />
          <a href={`tel:${profile.phone.replace(/-/g, '')}`} className="transition-colors hover:text-ember">
            {profile.phone}
          </a>
        </div>
      </div>

      <footer className="relative mx-auto mt-28 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-bone/10 pt-8 md:flex-row">
        <p className="font-mono text-[11px] text-bone-dim">
          © {new Date().getFullYear()} {profile.name}. Designed & built from scratch.
        </p>
        <a href="#" className="font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:text-ember">
          Back to top ↑
        </a>
      </footer>
    </section>
  )
}
