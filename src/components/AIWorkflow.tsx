import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { aiIntro, aiPractices, aiToolkit } from '../data/resume'

export default function AIWorkflow() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create('.ai-intro', { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.035,
          ease: 'none',
          scrollTrigger: { trigger: '.ai-intro', start: 'top 78%', end: 'bottom 50%', scrub: 0.6 },
        },
      )

      gsap.from('.ai-tool', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-toolkit', start: 'top 82%' },
      })

      gsap.from('.ai-practice', {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-practices', start: 'top 82%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="ai" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-ember/8 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading kicker="AI-Native Engineering" title="Building With AI" />

        <p className="ai-intro max-w-4xl font-display text-[clamp(1.35rem,3vw,2.4rem)] leading-[1.3] font-medium tracking-tight">
          {aiIntro}
        </p>

        <div className="ai-toolkit mt-20 grid gap-px overflow-hidden rounded-2xl bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {aiToolkit.map((t) => (
            <div key={t.name} className="ai-tool group flex flex-col bg-ink-2 p-8 transition-colors duration-300 hover:bg-ink-3">
              <h3 className="font-display text-2xl font-bold tracking-tight uppercase transition-colors duration-300 group-hover:text-ember">
                {t.name}
              </h3>
              <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-ember-soft uppercase">{t.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{t.detail}</p>
            </div>
          ))}
        </div>

        <div className="ai-practices mt-6 grid gap-6 md:grid-cols-2">
          {aiPractices.map((p) => (
            <div
              key={p.index}
              className="ai-practice flex gap-5 rounded-2xl border border-bone/10 bg-ink-2 p-8 transition-colors duration-300 hover:border-ember/40"
            >
              <span className="font-mono text-sm text-ember">/{p.index}</span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
