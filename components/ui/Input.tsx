'use client'

import { clsx } from 'clsx'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

export function Input({ label, error, hint, icon, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground-dim">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={clsx(
            'w-full bg-surface-2 border rounded-lg px-4 py-3',
            'text-foreground placeholder:text-muted text-sm',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent',
            'transition-all duration-150 hover:border-border-bright',
            icon ? 'pl-10' : '',
            error ? 'border-danger focus:ring-danger/30' : 'border-border',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  )
}
