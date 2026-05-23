import { clsx } from 'clsx'
import React from 'react'

interface BadgeProps {
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'neutral'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', size = 'md', children, className }: BadgeProps) {
  const variants = {
    accent:  'bg-accent/10 text-accent border border-accent/20 shadow-glow-xs',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    danger:  'bg-danger/10 text-danger border border-danger/20',
    neutral: 'bg-surface-2 text-foreground-dim border border-border',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  }

  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  )
}
