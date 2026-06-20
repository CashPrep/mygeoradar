'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/guides',   label: 'Guides' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/login',    label: 'Login' },
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]) && href !== '/#pricing'

  return (
    <>
      <header
        className={[
          'sticky top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-xs'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-[15px] tracking-tight hover:opacity-80 transition-opacity"
          >
            <Image
              src="/icon-512.png"
              alt="MyGeoRadar logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span>My<span className="text-accent">Geo</span>Radar</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  'text-sm font-medium transition-colors',
                  isActive(l.href)
                    ? 'text-accent'
                    : 'text-foreground/70 hover:text-foreground',
                ].join(' ')}
              >
                {l.label}
              </Link>
            ))}

            {/* Scan CTA — primary accent button */}
            <Link
              href="/scan"
              className="ml-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent/90 active:scale-[0.97] transition-all shadow-sm ring-2 ring-accent/20"
            >
              Free Scan →
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-surface transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 pb-6 pt-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  'px-2 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive(l.href)
                    ? 'text-accent bg-accent/6'
                    : 'text-foreground/80 hover:text-foreground hover:bg-surface',
                ].join(' ')}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/scan"
              className="mt-3 px-4 py-3 rounded-xl bg-accent text-white text-sm font-bold text-center hover:bg-accent/90 transition-colors shadow-sm"
            >
              Free Scan →
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
