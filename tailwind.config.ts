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
        background:       '#09090b',
        surface:          '#111113',
        'surface-2':      '#18181b',
        border:           '#27272a',
        'border-bright':  '#3f3f46',
        accent:           '#7c3aed',
        'accent-dim':     '#7c3aed20',
        'accent-hover':   '#9333ea',
        muted:            '#71717a',
        subtle:           '#a1a1aa',
        foreground:       '#fafafa',
        'foreground-dim': '#a1a1aa',
        success:          '#22c55e',
        warning:          '#f59e0b',
        danger:           '#ef4444',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm':    '0 0 20px #7c3aed18',
        'glow-md':    '0 0 40px #7c3aed25',
        'glow-lg':    '0 0 80px #7c3aed15',
        'card-hover': '0 0 0 1px #3f3f46, 0 8px 32px rgba(0,0,0,0.4)',
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
        'fade-up':    'fadeUp 0.5s ease forwards',
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
