import { clsx } from 'clsx'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  accent?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, glow = false, accent = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-surface border border-border rounded-xl',
        hover && 'transition-all duration-200 hover:border-accent/40 hover:shadow-card-hover cursor-pointer',
        glow && 'shadow-glow-sm',
        accent && 'border-l-4 border-l-accent/40',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('px-5 py-4 border-b border-border bg-surface/80', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('px-5 py-4', className)}>
      {children}
    </div>
  )
}
