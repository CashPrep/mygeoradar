'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',        label: 'Free Scan' },
  { href: '/blog',    label: 'Blog' },
  { href: '/about',   label: 'About' },
  { href: '/reviews', label: 'Reviews' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-xs'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[15px] tracking-tight hover:opacity-80 transition-opacity"
        >
          <Image
            src="/icon-512.png"
            alt="MyGeoRadar logo"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span>
            My<span className="text-accent">Geo</span>Radar
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                'px-3 py-1.5 rounded-md text-sm transition-all duration-150',
                pathname === href
                  || (href === '/blog' && pathname.startsWith('/blog'))
                  || (href === '/reviews' && pathname.startsWith('/reviews'))
                  || (href === '/about' && pathname.startsWith('/about'))
                  ? 'text-foreground bg-surface-2 font-medium'
                  : 'text-muted hover:text-foreground hover:bg-surface-2',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/playbook"
            className={[
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150',
              pathname === '/playbook'
                ? 'bg-accent text-white shadow-glow-xs'
                : 'bg-accent text-white hover:bg-accent-hover shadow-glow-xs hover:shadow-glow-sm',
            ].join(' ')}
          >
            Get the Playbook — $27
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-surface-2 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md animate-slide-down">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-surface-2 transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2">
              <Link
                href="/playbook"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors shadow-glow-xs"
              >
                Get the Playbook — $27
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
