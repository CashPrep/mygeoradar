export function EngineBar() {
  const engines = [
    { label: 'ChatGPT',    color: '#10a37f', initial: 'C' },
    { label: 'Perplexity', color: '#4f8ef7', initial: 'P' },
    { label: 'Gemini',     color: '#8b5cf6', initial: 'G' },
    { label: 'Claude',     color: '#f59e0b', initial: 'A' },
  ]

  return (
    <div className="border-y border-border bg-surface/50 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
        <p className="text-sm text-muted whitespace-nowrap">We scan your visibility across</p>
        <div className="flex items-center gap-6">
          {engines.map((e) => (
            <div key={e.label} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: e.color + '25', border: `1px solid ${e.color}40`, color: e.color }}
              >
                {e.initial}
              </div>
              <span className="text-sm font-medium text-foreground-dim hidden sm:block">{e.label}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted whitespace-nowrap">in one scan</p>
      </div>
    </div>
  )
}
