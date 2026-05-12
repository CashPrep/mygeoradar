import Image from 'next/image'

const engines = [
  {
    label: 'ChatGPT',
    src:   'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png',
    bg:    '#10a37f1a',
    border:'#10a37f40',
  },
  {
    label: 'Perplexity',
    src:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Perplexity_AI_logo.svg/240px-Perplexity_AI_logo.svg.png',
    bg:    '#4f8ef71a',
    border:'#4f8ef740',
  },
  {
    label: 'Gemini',
    src:   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/240px-Google_Gemini_logo.svg.png',
    bg:    '#8b5cf61a',
    border:'#8b5cf640',
  },
  {
    label: 'Claude',
    src:   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/240px-Claude_AI_logo.svg.png',
    bg:    '#f59e0b1a',
    border:'#f59e0b40',
  },
]

export function EngineBar() {
  return (
    <div className="border-y border-border bg-surface/50 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
        <p className="text-sm text-muted whitespace-nowrap">We scan your visibility across</p>
        <div className="flex items-center gap-6">
          {engines.map((e) => (
            <div key={e.label} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: e.bg, border: `1px solid ${e.border}` }}
              >
                <Image
                  src={e.src}
                  alt={e.label}
                  width={20}
                  height={20}
                  className="object-contain"
                  unoptimized
                />
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
