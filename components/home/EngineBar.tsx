// Inline SVG brand logos — no external deps, no CDN, no broken images

function ChatGPTLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.75-3.012 10.079 10.079 0 0 0-9.617 6.977 9.967 9.967 0 0 0-6.63 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.75 3.012 10.078 10.078 0 0 0 9.617-6.976 9.967 9.967 0 0 0 6.63-4.835 10.079 10.079 0 0 0-1.24-11.816zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L16.552 33.9a7.504 7.504 0 0 1-10.16-2.894zm-2.recent-2.678A7.473 7.473 0 0 1 5.3 23.548l.232.134 7.964 4.6a1.298 1.298 0 0 0 1.308 0L24.528 22.67v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.244-2.882zM26.987 20.43l-9.724-5.615a1.297 1.297 0 0 0-1.308 0l-9.724 5.615v-3.888a.121.121 0 0 1 .048-.103l8.051-4.648a7.498 7.498 0 0 1 11.158 7.763v.877zm-21.QQ-2.258 9.7a7.472 7.472 0 0 1 4.8-1.735c-.062.033-.168.091-.237.134l-7.964 4.6a1.294 1.294 0 0 0-.655 1.134v9.19a7.505 7.505 0 0 1 7.49-7.497zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L16.552 33.9a7.504 7.504 0 0 1-10.16-2.894z" fill="#10a37f"/>
    </svg>
  )
}

function PerplexityLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#4f8ef7" strokeWidth="1.5" fill="none"/>
      <path d="M12 2v20M2 7l10 5 10-5" stroke="#4f8ef7" strokeWidth="1.5"/>
    </svg>
  )
}

function GeminiLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 22C12 22 4 16.5 4 9.5a8 8 0 0 1 16 0C20 16.5 12 22 12 22z"
        fill="none" stroke="url(#gemini-grad)" strokeWidth="1.5"
      />
      <path
        d="M12 2C12 2 12 12 12 22M4 9.5C4 9.5 12 12 20 9.5"
        stroke="url(#gemini-grad)" strokeWidth="1.5" fill="none"
      />
    </svg>
  )
}

function ClaudeLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#d97706" strokeWidth="1.5" fill="none" />
      <path d="M8 15.5c0-2.5 1.5-5 4-6.5M12 9c1.5 1.5 3 4 3 6.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill="#d97706" />
    </svg>
  )
}

export function EngineBar() {
  const engines = [
    { label: 'ChatGPT',    Logo: ChatGPTLogo },
    { label: 'Perplexity', Logo: PerplexityLogo },
    { label: 'Gemini',     Logo: GeminiLogo },
    { label: 'Claude',     Logo: ClaudeLogo },
  ]

  return (
    <div className="border-y border-border bg-surface/50 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
        <p className="text-sm text-muted whitespace-nowrap">We scan your visibility across</p>
        <div className="flex items-center gap-6">
          {engines.map(({ label, Logo }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-7 h-7 flex items-center justify-center">
                <Logo size={26} />
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
