const items = ['Full Stack', 'AI-Native', 'ERP Integration', 'Dashboards', 'Agentic Workflows', 'SaaS', 'Vue & React', 'Node.js', 'Laravel', '.NET', 'Cloud']

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="matrix-marquee relative overflow-hidden py-5" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl font-bold tracking-[0.08em] text-bone/70 uppercase md:text-4xl">
              {item}
            </span>
            <span className="font-mono text-2xl text-ember md:text-4xl">⟨⟩</span>
          </span>
        ))}
      </div>
    </div>
  )
}
