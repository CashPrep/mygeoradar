import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background:       '#080810',
        surface:          '#0e0e1a',
        'surface-2':      '#14142a',
        border:           '#1e1e3a',
        'border-bright':  '#2a2a4a',
        accent:           '#4f8ef7',
        'accent-dim':     '#4f8ef720',
        'accent-hover':   '#6ba3ff',
        muted:            '#6b7280',
        subtle:           '#9ca3af',
        foreground:       '#e8e8f0',
        'foreground-dim': '#a0a0b8',
        success:          '#22c55e',
        warning:          '#f59e0b',
        danger:           '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm':    '0 0 20px #4f8ef725',
        'glow-md':    '0 0 40px #4f8ef730',
        'glow-lg':    '0 0 80px #4f8ef720',
        'card-hover': '0 0 0 1px #2a2a4a, 0 0 24px #4f8ef715',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        scanPulse: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%':      { opacity: '0.6', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':    'shimmer 1.5s infinite',
        'scan-pulse': 'scanPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
