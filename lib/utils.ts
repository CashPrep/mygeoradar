import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScore(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Weak'
  return 'Poor'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-success'
  if (score >= 60) return 'text-accent'
  if (score >= 40) return 'text-warning'
  return 'text-danger'
}

export function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-success'
  if (score >= 60) return 'bg-accent'
  if (score >= 40) return 'bg-warning'
  return 'bg-danger'
}

export function getScoreHex(score: number): string {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#4f8ef7'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

export function truncate(str: string, length: number): string {
  return str.length <= length ? str : str.slice(0, length) + '...'
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}
