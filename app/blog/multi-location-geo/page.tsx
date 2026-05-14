import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility',
  description: 'Single-location GEO is straightforward. Managing AI visibility across 10, 50, or 500 locations is a different challenge entirely. Here\'s the right architecture.',
}

export default function MultiLocationGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Local GEO</Badge>
            <span className="text-xs text-muted">May 13, 2026 &middot; 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            Single-location GEO is straightforward. Managing AI visibility across 10, 50, or 500 locations is a different challenge entirely. Here&apos;s the right architecture.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The multi-location paradox</h2>
          <p>
            A national chain with 200 locations has an inherent brand advantage: AI engines are far more likely to have encountered the brand name in their training data. That&apos;s real. But that advantage often backfires in local queries.
          </p>
          <p>
            When someone asks ChatGPT for &ldquo;the best tire shop in Raleigh,&rdquo; the AI doesn&apos;t just know about the brand &mdash; it needs to know about the <em className="text-foreground">Raleigh location specifically</em>: its address, hours, services, reviews, and local reputation. If that location-level data is thin, the AI may confidently recommend a smaller local competitor instead of the national chain.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">Brand-level vs location-level GEO</h2>
          <p>
            Multi-location businesses need to manage two distinct layers of AI visibility simultaneously:
          </p>
          {[
            {
              title: 'Brand-level GEO',
              body: 'This covers the parent entity: what the brand is, what it stands for, what it offers. It lives on your main domain, in press coverage, in Wikipedia/Wikidata if applicable, and in national directories. Brand-level GEO determines whether AI engines mention you in category-level queries like "what are the biggest fast casual chains in the US."',
            },
            {
              title: 'Location-level GEO',
              body: 'This covers each individual location as its own entity: its specific address, the local market it serves, its unique reviews, and its local citations. Location-level GEO determines whether AI engines recommend your Houston location when a Houston user asks for a recommendation.',
            },
          ].map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">The schema architecture for multi-location</h2>
          <p>
            Structured data needs to reflect the hierarchy of your business. Here&apos;s the recommended JSON-LD architecture:
          </p>
          <div className="p-4 bg-surface-2 border border-border rounded-xl">
            <p className="text-sm font-semibold text-foreground mb-3">Recommended schema hierarchy</p>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                'Main domain: Organization schema with name, logo, founding date, description, and sameAs links to all location pages',
                'Each location page: LocalBusiness schema (subtype of your category) with its own address, phone, geo coordinates, hours, and review aggregate',
                'On location pages: parentOrganization property pointing back to the main brand entity',
                'Breadcrumb schema on every location page showing Brand → City → Location',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">&#8250;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-4">Location pages: the biggest multi-location mistake</h2>
          <p>
            The most common multi-location GEO failure is thin, templated location pages. A page that says &ldquo;[Brand Name] in [City]. We offer [service]. Call us at [number].&rdquo; creates a weak entity signal. AI engines see it as boilerplate and deprioritize it.
          </p>
          <p>
            Every location page needs to be genuinely distinct. Include:
          </p>
          <ul className="flex flex-col gap-2 list-none">
            {[
              'The specific neighborhood or district the location serves, not just the city',
              'Location-specific staff highlights or ownership info (especially for franchises)',
              'Any location-specific awards, certifications, or press coverage',
              'Local content: nearby landmarks, local events, community involvement',
              'Aggregated review schema pulling from that location\'s Google/Yelp reviews specifically',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-1 shrink-0">&#8250;</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-4">Managing consistency at scale</h2>
          <p>
            NAP consistency across hundreds of locations is where multi-location GEO gets operationally challenging. A franchise that allows franchisees to self-manage their directory listings will inevitably accumulate inconsistencies: slightly different business names, outdated addresses, disconnected phone numbers. Each inconsistency is a signal to AI engines that the entity is unreliable.
          </p>
          <p>
            The solution is centralized citation management. A single source of truth for every location&apos;s NAP data, synced to Google Business Profile, Bing Places, Apple Maps, Yelp, and the top 20 directories. Tools like Yext, Uberall, or Synup can manage this at scale. The cost is typically less than one week of an AI-lost customer per location per month.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">Auditing multi-location visibility</h2>
          <p>
            Single-location businesses need one scan. Multi-location businesses need a systematic sampling strategy: scan your highest-revenue locations monthly, mid-tier locations quarterly, and do a full sweep semi-annually. Pay special attention to locations in competitive markets where a missed optimization costs the most.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">Scan any of your locations for free</p>
          <p className="text-sm text-foreground-dim">See exactly how AI engines describe each location — and get a prioritized action plan to improve it.</p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
          >
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  )
}
