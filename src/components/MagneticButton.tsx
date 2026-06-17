import { useRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes } from 'react'
import { gsap } from '../lib/gsap'

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode
  href?: string
  className?: string
  strength?: number
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function MagneticButton({ children, href, className = '', strength = 0.2, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const onMove = (e: MouseEvent) => {
    if (reducedMotion()) return
    const el = ref.current!
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' })
    gsap.to(textRef.current, { x: x * strength * 0.35, y: y * strength * 0.35, duration: 0.5, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to([ref.current, textRef.current], { x: 0, y: 0, duration: 0.6, ease: 'power4.out' })
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative inline-block isolate overflow-hidden ${className}`}
      {...rest}
    >
      <span ref={textRef} className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </a>
  )
}
