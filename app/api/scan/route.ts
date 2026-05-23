import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 15

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; MyGeoRadar-Scanner/1.0)',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
}

function normaliseUrl(raw: string): string {
  let u = raw.trim()
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try { return new URL(u).href } catch { return u }
}

function extractText(html: string, regex: RegExp): string {
  return html.match(regex)?.[1]?.trim() ?? ''
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rawUrl: string = body.url ?? ''
    const businessName: string = (body.businessName ?? '').trim()

    if (!rawUrl) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    const url = normaliseUrl(rawUrl)
    let parsedUrl: URL
    try { parsedUrl = new URL(url) } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const origin = parsedUrl.origin  // e.g. https://example.com
    const isHttps = parsedUrl.protocol === 'https:'

    // ── Fetch the page HTML ──────────────────────────────────────
    let html = ''
    let reachable = false
    let finalUrl = url
    try {
      const res = await fetch(url, {
        headers: HEADERS,
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
      })
      reachable = res.ok
      finalUrl = res.url
      html = reachable ? await res.text() : ''
    } catch {
      reachable = false
    }

    // ── Fetch robots.txt ─────────────────────────────────────────
    let robotsTxt = ''
    try {
      const r = await fetch(`${origin}/robots.txt`, {
        headers: HEADERS,
        signal: AbortSignal.timeout(4000),
      })
      if (r.ok) robotsTxt = await r.text()
    } catch { /* ignore */ }

    // ── Parse signals ────────────────────────────────────────────
    const lcHtml = html.toLowerCase()

    // Robots checks
    const robotsBlocksAll     = /user-agent:\s*\*[\s\S]*?disallow:\s*\//i.test(robotsTxt)
    const robotsBlocksGptBot  = /user-agent:\s*gptbot[\s\S]*?disallow:\s*\//i.test(robotsTxt)
    const robotsBlocksClaudeBot = /user-agent:\s*claudebot[\s\S]*?disallow:\s*\//i.test(robotsTxt)
    const robotsBlocksAny     = robotsBlocksAll || robotsBlocksGptBot || robotsBlocksClaudeBot

    // Schema.org
    const hasSchemaOrg        = lcHtml.includes('schema.org')
    const hasOrganizationSchema = lcHtml.includes('"organization"') || lcHtml.includes("'organization'")
    const hasLocalBizSchema   = lcHtml.includes('"localbusiness"') || lcHtml.includes("'localbusiness'")
    const hasProductSchema    = lcHtml.includes('"product"') || lcHtml.includes("'product'")
    const hasFaqSchema        = lcHtml.includes('"faqpage"') || lcHtml.includes("'faqpage'")
    const schemaCount         = [hasOrganizationSchema, hasLocalBizSchema, hasProductSchema, hasFaqSchema].filter(Boolean).length

    // Meta tags
    const metaTitle           = extractText(html, /<title[^>]*>([^<]{1,200})<\/title>/i)
    const metaDesc            = extractText(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,500})["']/i)
                             || extractText(html, /<meta[^>]+content=["']([^"']{1,500})["'][^>]+name=["']description["']/i)
    const ogTitle             = extractText(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,200})["']/i)
    const ogDesc              = extractText(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{1,500})["']/i)
    const ogImage             = extractText(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    const hasViewport         = /<meta[^>]+name=["']viewport["']/i.test(html)
    const hasCanonical        = /<link[^>]+rel=["']canonical["']/i.test(html)

    // Business name on page
    const nameOnPage = businessName
      ? lcHtml.includes(businessName.toLowerCase())
      : null

    // H1
    const h1Match   = html.match(/<h1[^>]*>([\s\S]{1,200}?)<\/h1>/i)
    const h1Text    = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ''
    const hasH1     = !!h1Text

    // ── Build checks array ───────────────────────────────────────
    type Status = 'pass' | 'warn' | 'fail'
    interface Check {
      id: string
      label: string
      status: Status
      impact: 'High' | 'Medium'
      detail: string
      fix: string
    }

    const checks: Check[] = []

    // 1. HTTPS
    checks.push({
      id: 'https',
      label: 'Secure connection (HTTPS)',
      status: isHttps ? 'pass' : 'fail',
      impact: 'High',
      detail: isHttps
        ? 'Your site uses HTTPS — a baseline trust signal AI crawlers require.'
        : 'Your site is on HTTP. AI crawlers heavily deprioritise or skip non-HTTPS pages entirely.',
      fix: 'Enable HTTPS via your hosting provider or Cloudflare. This is free on most platforms.',
    })

    // 2. Site reachable
    checks.push({
      id: 'reachable',
      label: 'Site is publicly accessible',
      status: reachable ? 'pass' : 'fail',
      impact: 'High',
      detail: reachable
        ? 'Your site loaded successfully — AI crawlers can access the page.'
        : 'Your site returned an error or timed out. AI crawlers cannot index what they cannot reach.',
      fix: 'Check that your site is live, not behind a login wall, and loading in under 5 seconds.',
    })

    // 3. Robots.txt
    checks.push({
      id: 'robots',
      label: 'AI crawlers not blocked (robots.txt)',
      status: robotsBlocksAny ? 'fail' : robotsTxt ? 'pass' : 'warn',
      impact: 'High',
      detail: robotsBlocksAny
        ? `Your robots.txt is explicitly blocking AI crawlers${robotsBlocksGptBot ? ' (GPTBot detected)' : ''}${robotsBlocksClaudeBot ? ' (ClaudeBot detected)' : ''}. They will not index your site.`
        : robotsTxt
        ? 'Your robots.txt does not block AI crawlers — they are free to crawl your site.'
        : 'No robots.txt found. AI crawlers will assume they are allowed, but adding one signals professionalism.',
      fix: 'Check your robots.txt at yourdomain.com/robots.txt. Remove any Disallow rules targeting GPTBot, ClaudeBot, or * with Disallow: /.',
    })

    // 4. Meta title
    checks.push({
      id: 'meta-title',
      label: 'Page title (meta title)',
      status: metaTitle && metaTitle.length >= 20 && metaTitle.length <= 70 ? 'pass'
            : metaTitle ? 'warn' : 'fail',
      impact: 'High',
      detail: metaTitle
        ? `Found: "${metaTitle.slice(0, 80)}${metaTitle.length > 80 ? '…' : ''}" (${metaTitle.length} chars). ${metaTitle.length < 20 ? 'Too short — add your business name and primary service.' : metaTitle.length > 70 ? 'Too long — AI tools may truncate this.' : 'Good length.'}`
        : 'No meta title found. This is one of the first signals AI uses to understand what your business does.',
      fix: 'Write a title in the format: [Business Name] — [Primary Service] | [City or Niche]. Keep it 30–65 characters.',
    })

    // 5. Meta description
    checks.push({
      id: 'meta-desc',
      label: 'Meta description',
      status: metaDesc && metaDesc.length >= 80 && metaDesc.length <= 165 ? 'pass'
            : metaDesc ? 'warn' : 'fail',
      impact: 'High',
      detail: metaDesc
        ? `Found (${metaDesc.length} chars): "${metaDesc.slice(0, 100)}${metaDesc.length > 100 ? '…' : ''}" ${metaDesc.length < 80 ? '— Too short. Add more context about what you do and who you serve.' : metaDesc.length > 165 ? '— Too long, may be truncated by AI.' : '— Good.'}`
        : 'No meta description found. AI uses this to understand your business at a glance.',
      fix: 'Write a 120–155 character description covering what you do, who you serve, and where. Use plain language.',
    })

    // 6. Open Graph tags
    const ogScore = [ogTitle, ogDesc, ogImage].filter(Boolean).length
    checks.push({
      id: 'og-tags',
      label: 'Open Graph tags (og:title, og:description, og:image)',
      status: ogScore === 3 ? 'pass' : ogScore >= 1 ? 'warn' : 'fail',
      impact: 'Medium',
      detail: ogScore === 3
        ? 'All three core Open Graph tags found. AI and social crawlers can accurately represent your business.'
        : ogScore === 0
        ? 'No Open Graph tags found. AI citation tools and link previews will guess at your business identity.'
        : `Only ${ogScore}/3 OG tags found (${[ogTitle && 'og:title', ogDesc && 'og:description', ogImage && 'og:image'].filter(Boolean).join(', ')}). Add the missing ones.`,
      fix: 'Add og:title, og:description, and og:image to your page <head>. These are used by Perplexity and other AI tools to build citations.',
    })

    // 7. Schema.org structured data
    checks.push({
      id: 'schema',
      label: 'Structured data (Schema.org)',
      status: schemaCount >= 2 ? 'pass' : hasSchemaOrg ? 'warn' : 'fail',
      impact: 'High',
      detail: schemaCount >= 2
        ? `Found ${schemaCount} schema type(s) — AI can parse structured facts about your business directly.`
        : hasSchemaOrg
        ? `Found schema markup but only ${schemaCount} specific type(s). Add Organization or LocalBusiness schema for stronger AI signals.`
        : 'No Schema.org structured data found. This is one of the most powerful signals for AI to understand and cite your business.',
      fix: 'Add JSON-LD structured data to your page for Organization (or LocalBusiness) including name, url, description, address, and sameAs links.',
    })

    // 8. H1 heading
    checks.push({
      id: 'h1',
      label: 'Clear H1 heading on page',
      status: hasH1 ? 'pass' : 'fail',
      impact: 'Medium',
      detail: hasH1
        ? `H1 found: "${h1Text.slice(0, 80)}${h1Text.length > 80 ? '…' : ''}"`
        : 'No H1 heading found. AI reads the H1 to determine the main topic of the page.',
      fix: 'Add a single H1 tag that clearly states what your business does. Keep it specific and keyword-rich.',
    })

    // 9. Business name on page
    if (businessName) {
      checks.push({
        id: 'business-name',
        label: 'Business name appears on page',
        status: nameOnPage ? 'pass' : 'fail',
        impact: 'High',
        detail: nameOnPage
          ? `"${businessName}" was found on the page — AI can associate the content with your brand.`
          : `"${businessName}" was NOT found on the page. AI cannot connect this page to your business if the name isn't present.`,
        fix: 'Make sure your exact business name appears in the page text, ideally in the header, H1, and at least once in the body copy.',
      })
    }

    // 10. Mobile viewport
    checks.push({
      id: 'viewport',
      label: 'Mobile-friendly viewport tag',
      status: hasViewport ? 'pass' : 'warn',
      impact: 'Medium',
      detail: hasViewport
        ? 'Viewport meta tag found — your site signals mobile compatibility.'
        : 'No viewport meta tag. AI crawlers favour mobile-responsive pages.',
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your HTML <head>.',
    })

    // 11. Canonical URL
    checks.push({
      id: 'canonical',
      label: 'Canonical URL defined',
      status: hasCanonical ? 'pass' : 'warn',
      impact: 'Medium',
      detail: hasCanonical
        ? 'Canonical tag found — AI crawlers know which URL is the authoritative version.'
        : 'No canonical URL tag. Without it, AI may index duplicate versions of your pages and dilute your signals.',
      fix: 'Add <link rel="canonical" href="https://yourdomain.com/"> to your page <head>.',
    })

    // ── Score ────────────────────────────────────────────────────
    const weights: Record<string, number> = {
      https: 10, reachable: 15, robots: 12, 'meta-title': 12, 'meta-desc': 10,
      'og-tags': 8, schema: 13, h1: 8, 'business-name': 8, viewport: 2, canonical: 2,
    }
    let score = 0
    let maxScore = 0
    for (const c of checks) {
      const w = weights[c.id] ?? 5
      maxScore += w
      if (c.status === 'pass') score += w
      else if (c.status === 'warn') score += w * 0.4
    }
    const finalScore = Math.round((score / maxScore) * 100)

    return NextResponse.json({
      score: finalScore,
      url: finalUrl,
      checks,
      meta: { title: metaTitle, description: metaDesc },
      scannedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Scan error:', err)
    return NextResponse.json({ error: 'Scan failed. Please try again.' }, { status: 500 })
  }
}
