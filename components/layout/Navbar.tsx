'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Radar, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { clsx } from 'clsx'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing',      label: 'Pricing' },
  { href: '/blog',          label: 'Blog' },
  { href: '/about',         label: 'About' },
]

export function Navbar() {
  const router                  = useRouter()
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser]         = useState<SupabaseUser | null>(null)

  const supabase = createSupabaseBrowser()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'border-b border-border/60 bg-background/90 backdrop-blur-md' : 'bg-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="MyGeoRadar home">
          <div className="relative">
            <Radar className="w-5 h-5 text-accent" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          </div>
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
          {user ? (
            <>
              <Link
                href="/account"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2 transition-all"
              >
                <User className="w-4 h-4" />
                My scans
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2 transition-all"
            >
              Sign in
            </Link>
          )}
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
          {user ? (
            <>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> My scans
              </Link>
              <button
                onClick={() => { setOpen(false); handleSignOut() }}
                className="px-4 py-2.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2 flex items-center gap-2 text-left"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-sm text-foreground-dim hover:text-foreground rounded-lg hover:bg-surface-2"
            >
              Sign in
            </Link>
          )}
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
