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
        background:       '#ffffff',
        surface:          '#f9f9fb',
        'surface-2':      '#f3f3f7',
        'surface-3':      '#ececf2',
        border:           '#e4e4e7',
        'border-bright':  '#c4c4cc',
        accent:           '#6d28d9',
        'accent-dim':     '#6d28d915',
        'accent-bright':  '#7c3aed',
        'accent-hover':   '#5b21b6',
        muted:            '#71717a',
        subtle:           '#52525b',
        foreground:       '#09090b',
        'foreground-dim': '#52525b',
        success:          '#16a34a',
        warning:          '#d97706',
        danger:           '#dc2626',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-xs':    '0 0 8px #6d28d918',
        'glow-sm':    '0 0 20px #6d28d918',
        'glow-md':    '0 0 40px #6d28d928',
        'glow-lg':    '0 0 80px #6d28d922',
        'card-hover': '0 0 0 1px #c4c4cc, 0 8px 32px rgba(0,0,0,0.08)',
        'card-accent': '0 0 0 1px #6d28d930, 0 8px 32px rgba(109,40,217,0.08)',
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
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up':      'fadeUp 0.5s ease forwards',
        'fade-in':      'fadeIn 0.4s ease forwards',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':      'shimmer 1.5s infinite',
        'scan-pulse':   'scanPulse 2s ease-in-out infinite',
        'slide-down':   'slideDown 0.2s ease forwards',
        'bounce-slow':  'bounceSlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
