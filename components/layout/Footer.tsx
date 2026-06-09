import Link from 'next/link'
import Image from 'next/image'

const productLinks = [
  { href: '/',         label: 'Free AI Scan' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/playbook', label: 'GEO Playbook ($27)' },
]
const resourceLinks = [
  { href: '/blog',    label: 'Blog' },
  { href: '/about',   label: 'About' },
  { href: '/reviews', label: 'Reviews' },
]
const locationLinks = [
  { href: '/locations/new-york-ny',    label: 'New York' },
  { href: '/locations/los-angeles-ca', label: 'Los Angeles' },
  { href: '/locations/chicago-il',     label: 'Chicago' },
  { href: '/locations/houston-tx',     label: 'Houston' },
  { href: '/locations/miami-fl',       label: 'Miami' },
]
const industryLinks = [
  { href: '/industries/restaurants',        label: 'Restaurants' },
  { href: '/industries/real-estate-agents', label: 'Real Estate' },
  { href: '/industries/lawyers',            label: 'Law Firms' },
  { href: '/industries/dental-practices',   label: 'Dental' },
  { href: '/industries/ecommerce-stores',   label: 'E-commerce' },
]
const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms' },
  { href: '/refund',  label: 'Refund Policy' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/50">
      {/* Pre-footer CTA strip */}
      <div className="bg-accent/5 border-b border-accent/20 py-5 md:py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-foreground">Not showing up in AI search results?</p>
            <p className="text-sm text-muted">Run a free scan and get your GEO score in 30 seconds.</p>
          </div>
          <Link
            href="/"
            className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors text-center"
          >
            Run Free Scan
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-10 mb-8 md:mb-10">
          <div className="max-w-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[15px] tracking-tight mb-3 hover:opacity-80 transition-opacity"
            >
              <Image src="/icon-512.png" alt="MyGeoRadar logo" width={28} height={28} className="rounded-lg" />
              <span>My<span className="text-accent">Geo</span>Radar</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              The AI visibility platform that shows you exactly how ChatGPT,
              Perplexity, Gemini and Claude talk about your business and how to rank higher.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">Product</p>
              <ul className="flex flex-col gap-2">
                {productLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">Resources</p>
              <ul className="flex flex-col gap-2">
                {resourceLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">Top Cities</p>
              <ul className="flex flex-col gap-2">
                {locationLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">Industries</p>
              <ul className="flex flex-col gap-2">
                {industryLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5 md:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>&copy; {year} MyGeoRadar. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
