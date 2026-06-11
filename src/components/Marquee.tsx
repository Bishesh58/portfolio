const items = ['Full Stack', 'ERP Integration', 'Dashboards', 'SaaS', 'Vue & React', 'Node.js', 'Laravel', '.NET', 'Cloud']

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-5" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl font-bold tracking-tight text-bone/70 uppercase md:text-4xl">
              {item}
            </span>
            <span className="font-serif text-2xl text-ember italic md:text-4xl">✺</span>
          </span>
        ))}
      </div>
    </div>
  )
}
