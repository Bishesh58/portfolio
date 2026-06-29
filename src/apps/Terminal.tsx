// Phase 1 placeholder. Phase 2 ports the full interactive terminal here.
export default function Terminal() {
  const lines: Array<[string, string]> = [
    ['➜ ~ ', 'whoami'],
    ['', 'Bishesh Sunam · Full Stack Developer'],
    ['➜ ~ ', 'ls'],
    ['', 'about/  projects/  skills/  contact/'],
  ]
  return (
    <div className="p-4 font-mono text-[13px] leading-relaxed text-bone">
      {lines.map(([prompt, text], i) => (
        <p key={i} className="whitespace-pre-wrap">
          <span className="text-ember">{prompt}</span>
          {text}
        </p>
      ))}
      <p>
        <span className="text-ember">{'➜ ~ '}</span>
        <span className="inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-ember" />
      </p>
      <p className="mt-3 text-xs text-bone-dim">// full interactive terminal — phase 2</p>
    </div>
  )
}
