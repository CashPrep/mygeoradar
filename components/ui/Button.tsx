'use client'

import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variants = {
    primary:   'bg-accent hover:bg-accent-hover text-white shadow-glow-sm hover:shadow-glow-md focus-visible:ring-accent',
    secondary: 'bg-surface-2 hover:bg-surface-3 text-foreground border border-border hover:border-accent/40 focus-visible:ring-accent/50',
    ghost:     'hover:bg-surface-2 text-foreground-dim hover:text-foreground focus-visible:ring-accent/40',
    danger:    'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 focus-visible:ring-danger/50',
  }

  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
    xl: 'px-9 py-4 text-lg',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  )
}
