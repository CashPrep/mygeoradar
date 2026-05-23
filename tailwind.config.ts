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
        'surface-3':      '#ededf2',
        border:           '#e4e4e7',
        'border-bright':  '#c4c4cc',
        accent:           '#6d28d9',
        'accent-dim':     '#6d28d915',
        'accent-hover':   '#5b21b6',
        'accent-bright':  '#7c3aed',
        'accent-light':   '#ede9fe',
        muted:            '#71717a',
        subtle:           '#52525b',
        foreground:       '#09090b',
        'foreground-dim': '#52525b',
        success:          '#16a34a',
        'success-dim':    '#16a34a15',
        warning:          '#d97706',
        'warning-dim':    '#d9770615',
        danger:           '#dc2626',
        'danger-dim':     '#dc262615',
        info:             '#0ea5e9',
        'info-dim':       '#0ea5e915',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'xs':          '0 1px 2px rgba(0,0,0,0.05)',
        'glow-sm':     '0 0 20px #6d28d912',
        'glow-md':     '0 0 40px #6d28d920',
        'glow-lg':     '0 0 80px #6d28d918',
        'glow-xl':     '0 0 120px #6d28d922',
        'card-hover':  '0 0 0 1px #c4c4cc, 0 8px 32px rgba(0,0,0,0.08)',
        'card-accent': '0 0 0 1px #6d28d930, 0 8px 32px rgba(109,40,217,0.10)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%':      { transform: 'translateY(-4px)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        'fade-up':      'fadeUp 0.5s ease forwards',
        'fade-in':      'fadeIn 0.4s ease forwards',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':      'shimmer 1.5s infinite',
        'scan-pulse':   'scanPulse 2s ease-in-out infinite',
        'slide-down':   'slideDown 0.25s ease forwards',
        'float':        'float 3s ease-in-out infinite',
        'bounce-light': 'bounceLight 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
