import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/resume'

const words = ['Kia ora', 'Namaste', 'Hello', 'Bonjour', profile.name]

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doneRef.current()
      return
    }

    const counter = { v: 0 }
    const tl = gsap.timeline()

    words.forEach((w, i) => {
      tl.set(wordRef.current, { textContent: w }, i * 0.45)
      tl.fromTo(
        wordRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power3.out' },
        i * 0.45,
      )
    })

    tl.to(
      counter,
      {
        v: 100,
        duration: words.length * 0.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`
        },
      },
      0,
    )

    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.15,
      onComplete: () => doneRef.current(),
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink">
      <div className="line-mask">
        <span ref={wordRef} className="font-serif text-5xl italic text-bone md:text-7xl" />
      </div>
      <span ref={countRef} className="absolute right-6 bottom-6 font-mono text-sm text-bone-dim md:right-12 md:bottom-10">
        000
      </span>
      <div className="absolute bottom-0 left-0 h-px w-full origin-left bg-ember" ref={barRef} style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
