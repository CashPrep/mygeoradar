// Real brand logos as inline SVGs — self-contained, never breaks, no external deps

function ChatGPTIcon() {
  // Official OpenAI / ChatGPT logomark
  return (
    <svg width="20" height="20" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.75-3.012 10.079 10.079 0 0 0-9.617 6.977 9.967 9.967 0 0 0-6.63 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.75 3.012 10.078 10.078 0 0 0 9.617-6.976 9.967 9.967 0 0 0 6.63-4.835 10.079 10.079 0 0 0-1.24-11.816zm-14.71 20.556a7.474 7.474 0 0 1-4.8-1.735c.061-.033.169-.091.238-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496v.031zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L16.55 33.9a7.504 7.504 0 0 1-10.158-2.893zm-2.495-17.9a7.473 7.473 0 0 1 3.903-3.282c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L5.942 23.91a7.504 7.504 0 0 1-2.046-10.804zm27.658 6.437-9.724-5.615a1.297 1.297 0 0 0-1.308 0L10.8 19.542v-3.888a.12.12 0 0 1 .048-.103l8.051-4.648a7.498 7.498 0 0 1 11.158 7.763v.877zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756c-.061.033-.168.091-.237.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.005 11.225zm1.829-3.943 4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V22.53z"
        fill="#10a37f"
      />
    </svg>
  )
}

function PerplexityIcon() {
  // Perplexity AI official logomark
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.5 3.75 6.75v10.5L12 22.5l8.25-5.25V6.75L12 1.5z" stroke="#20B8CD" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <path d="M12 1.5v21M3.75 6.75 12 12l8.25-5.25M12 12v10.5" stroke="#20B8CD" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function GeminiIcon() {
  // Google Gemini star logomark
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gem-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4285F4" />
          <stop offset="50%"  stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#EA4335" />
        </linearGradient>
      </defs>
      {/* 4-pointed star — Gemini's actual icon shape */}
      <path
        d="M12 2 C12 2 13.5 8.5 18 12 C13.5 15.5 12 22 12 22 C12 22 10.5 15.5 6 12 C10.5 8.5 12 2 12 2Z"
        fill="url(#gem-g)"
      />
    </svg>
  )
}

function ClaudeIcon() {
  // Anthropic Claude official logomark — the asterisk / radial lines
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#D4A574" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="2"  x2="12" y2="8"  />
        <line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2"  y1="12" x2="8"  y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
        <line x1="4.93"  y1="4.93"  x2="9.17"  y2="9.17"  />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="19.07" y1="4.93"  x2="14.83" y2="9.17"  />
        <line x1="9.17"  y1="14.83" x2="4.93"  y2="19.07" />
      </g>
    </svg>
  )
}

const engines = [
  { label: 'ChatGPT',    Icon: ChatGPTIcon,    bg: '#10a37f1a', border: '#10a37f40' },
  { label: 'Perplexity', Icon: PerplexityIcon, bg: '#20B8CD1a', border: '#20B8CD40' },
  { label: 'Gemini',     Icon: GeminiIcon,     bg: '#9B72CB1a', border: '#9B72CB40' },
  { label: 'Claude',     Icon: ClaudeIcon,     bg: '#D4A5741a', border: '#D4A57440' },
]

export function EngineBar() {
  return (
    <div className="border-y border-border bg-surface/50 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
        <p className="text-sm text-muted whitespace-nowrap">We scan your visibility across</p>
        <div className="flex items-center gap-6">
          {engines.map(({ label, Icon, bg, border }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: bg, border: `1px solid ${border}` }}
              >
                <Icon />
              </div>
              <span className="text-sm font-medium text-foreground-dim hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted whitespace-nowrap">in one scan</p>
      </div>
    </div>
  )
}
