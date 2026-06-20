import { useRef } from 'react'

import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'

import { matrixTypeChars, prefersReducedMotion } from '../lib/matrixTypewriter'

import MagneticButton from './MagneticButton'

import MatrixFrame from './matrix/MatrixFrame'

import MatrixSection from './matrix/MatrixSection'

import { profile } from '../data/resume'



export default function Contact() {

  const ref = useRef<HTMLElement>(null)



  useGSAP(

    () => {

      const split = SplitText.create('.contact-title', { type: 'chars' })

      const caret = ref.current?.querySelector<HTMLElement>('.contact-type-caret')

      const chars = split.chars as HTMLElement[]



      gsap.set(chars, { opacity: 0 })

      if (caret) gsap.set(caret, { autoAlpha: 0 })



      ScrollTrigger.create({

        trigger: ref.current,

        start: 'top 70%',

        once: true,

        onEnter: () => {

          if (prefersReducedMotion()) {

            gsap.set(chars, { opacity: 1 })

            if (caret) gsap.set(caret, { autoAlpha: 1 })

          } else {

            matrixTypeChars(chars, {

              onComplete: () => {

                if (caret) gsap.to(caret, { autoAlpha: 1, duration: 0.2 })

              },

            })

          }

        },

      })



      gsap.from('.contact-cta', {

        scale: 0.92,

        y: 24,

        opacity: 0,

        duration: 0.9,

        ease: 'power3.out',

        scrollTrigger: { trigger: ref.current, start: 'top 60%' },

      })

    },

    { scope: ref },

  )



  return (

    <MatrixSection

      ref={ref}

      id="contact"

      program="UPLINK.OPEN"

      index="0xFF"

      className="overflow-hidden pt-32 md:pt-48"

    >

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 translate-y-1/2 rounded-full bg-ember/12 blur-[140px]" />



      <div className="relative text-center">

        <p className="kicker mb-8 justify-center">Got a project? Let's talk</p>

        <h2 className="inline-flex items-center justify-center text-section-title font-display font-black tracking-[0.06em] uppercase">

          <span className="contact-title">

            Let&apos;s build

            <br />

            <span className="font-mono font-normal text-ember normal-case italic">something great</span>

          </span>

          <span className="contact-type-caret title-caret opacity-0" aria-hidden />

        </h2>



        <MatrixFrame

          variant="panel"

          path="~/comms/establish.link"

          label="UPLINK"

          status="LISTENING"

          className="contact-cta mx-auto mt-14 max-w-2xl text-left"

        >

          <p className="matrix-log-prefix mb-6 text-center md:text-left">

            [ UPLINK ] awaiting incoming transmission…

          </p>



          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">

            <MagneticButton

              href={`mailto:${profile.email}`}

              className="glow-ember rounded-full border border-ember bg-ember/10 px-9 py-5 font-mono text-sm tracking-[0.2em] text-bone uppercase transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-ember before:transition-transform before:duration-[450ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-ink hover:before:scale-y-100"

            >

              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>

                <rect x="2" y="4" width="20" height="16" rx="2" />

                <path d="m22 7-10 6L2 7" />

              </svg>

              {profile.email}

            </MagneticButton>

            <MagneticButton

              href="/Bishesh-Sunam-CV.pdf"

              download

              className="rounded-full border border-bone/25 px-9 py-5 font-mono text-sm tracking-[0.2em] text-bone-dim uppercase transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-bone before:transition-transform before:duration-[450ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-bone hover:text-ink hover:before:scale-y-100"

            >

              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>

                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                <path d="M7 10l5 5 5-5" />

                <path d="M12 15V3" />

              </svg>

              Download CV

            </MagneticButton>

          </div>



          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-ember/10 pt-8 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase">

            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ember">

              LinkedIn ↗

            </a>

            {profile.github && (

              <>

                <span className="h-1 w-1 rounded-full bg-bone/30" />

                <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-ember">

                  GitHub ↗

                </a>

              </>

            )}

            <span className="h-1 w-1 rounded-full bg-bone/30" />

            <a href={`tel:${profile.phone.replace(/-/g, '')}`} className="transition-colors hover:text-ember">

              {profile.phone}

            </a>

          </div>

        </MatrixFrame>

      </div>



      <footer className="relative mx-auto mt-28 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-dashed border-ember/15 pt-8 md:flex-row">

        <p className="font-mono text-[11px] text-bone-dim">

          <span className="text-ember-soft">[ SYS ]</span> © {new Date().getFullYear()} {profile.name} — designed & built from scratch

        </p>

        <a href="#" className="font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:text-ember">

          exit() ↑

        </a>

      </footer>

    </MatrixSection>

  )

}


