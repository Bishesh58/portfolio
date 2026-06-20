import { forwardRef, type ReactNode } from 'react'

interface MatrixSectionProps {
  children: ReactNode
  id?: string
  program: string
  index?: string
  className?: string
}

const MatrixSection = forwardRef<HTMLElement, MatrixSectionProps>(function MatrixSection(
  { children, id, program, index, className = '' },
  ref,
) {
  return (
    <section ref={ref} id={id} className={`matrix-section relative px-4 py-24 sm:px-6 sm:py-28 md:px-12 md:py-40 ${className}`}>
      <div className="matrix-section-rail" aria-hidden>
        <span className="matrix-section-index">{index ?? 'SYS'}</span>
        <span className="matrix-section-line" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="matrix-section-header">
          <span className="matrix-section-program">// {program}</span>
          <span className="matrix-section-tag matrix-section-pulse">[ STREAM ]</span>
        </div>
        {children}
      </div>
    </section>
  )
})

export default MatrixSection
