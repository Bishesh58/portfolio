import { useEffect, useState } from 'react'

export default function MatrixScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="matrix-scroll-progress pointer-events-none fixed inset-y-0 right-0 z-[95] hidden w-8 md:block" aria-hidden>
      <div className="absolute top-24 bottom-24 right-3 w-px bg-ember/10">
        <div
          className="matrix-scroll-progress-fill absolute top-0 right-0 w-px bg-ember"
          style={{ height: `${progress}%` }}
        />
        <div
          className="matrix-scroll-progress-node absolute right-1/2 h-1.5 w-1.5 bg-ember shadow-[0_0_8px_rgba(0,255,65,0.6)]"
          style={{ top: `${progress}%`, transform: 'translate(50%, -50%)' }}
        />
      </div>
      <span className="absolute right-1 top-24 origin-top-right rotate-90 font-mono text-[9px] tracking-[0.35em] text-bone-dim">
        DEPTH
      </span>
    </div>
  )
}
