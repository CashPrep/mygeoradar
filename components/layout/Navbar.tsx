'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GeoRadarLogo } from '@/components/ui/GeoRadarLogo'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing',      label: 'Pricing' },
  { href: '/blog',          label: 'Blog' },
  { href: '/about',         label: 'About' },
]

export function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'border-b border-border/60 bg-background/90 backdrop-blur-md' : 'bg-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <GeoRadarLogo size={22} color="#7c3aed" />
          <span className="font-bold text-base tracking-tight">
            my<span className="text-accent">geo</span>radar
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => window.location.href = '/scan'}>
            Run a scan
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground-dim hover:text-foreground rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="primary" size="sm" className="mt-2"
            onClick={() => { setOpen(false); window.location.href = '/scan' }}
          >
            Run a scan
          </Button>
        </div>
      )}
    </header>
  )
}

export default Navbar
