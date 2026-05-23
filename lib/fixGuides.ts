// ─────────────────────────────────────────────────────────────────────────────
// Fix Guides — one detailed guide per scan check ID
// Each guide is shown in the paid /report/[token] page
// ─────────────────────────────────────────────────────────────────────────────

export interface FixGuide {
  id: string
  title: string
  why: string
  steps: string[]
  validate: string
  timeEstimate: string
}

export const FIX_GUIDES: Record<string, FixGuide> = {

  https: {
    id: 'https',
    title: 'Switch Your Site to HTTPS',
    why: 'HTTPS is the single most basic trust signal on the web. AI crawlers like GPTBot and ClaudeBot treat HTTP sites the same way browsers do — they flag them as insecure and heavily deprioritise them. If your site is still on HTTP, AI assistants may skip it entirely when building their answers. This is the first thing to fix because everything else builds on top of it.',
    steps: [
      'Log in to your hosting control panel (cPanel, Cloudflare, Vercel, Netlify, etc.).',
      'Find the SSL/TLS section. Most modern hosts offer a free Let\'s Encrypt certificate — look for a button that says "Enable SSL", "Force HTTPS", or "Install Certificate".',
      'Enable the certificate and turn on the "Force HTTPS" or "Redirect HTTP to HTTPS" option. This ensures anyone visiting http:// gets bounced to https:// automatically.',
      'If your host does not offer free SSL, add your domain to Cloudflare (free plan). In Cloudflare, go to SSL/TLS → set mode to "Full". Enable "Always Use HTTPS" under Edge Certificates.',
      'After enabling, visit your site at https://yourdomain.com and confirm the padlock icon appears in the browser address bar.',
      'Check for mixed content: open Chrome DevTools (F12) → Console tab. If you see warnings about insecure resources, those images or scripts are still loading over HTTP. Update their URLs to https://.',
      'Update any hardcoded http:// links in your site\'s code, CMS, or page builder to use https://.',
    ],
    validate: 'Go to https://www.ssllabs.com/ssltest/ and enter your domain. You should get an A or A+ rating. Then re-run this scan — the HTTPS check should turn green.',
    timeEstimate: '15–30 minutes',
  },

  reachable: {
    id: 'reachable',
    title: 'Make Your Site Publicly Accessible',
    why: 'If AI crawlers cannot load your page, they cannot learn anything about your business. A site that times out, returns a 4xx/5xx error, or hides behind a login wall is invisible to every AI assistant — no matter how good your content is. This is the most critical check of all.',
    steps: [
      'Open a fresh incognito/private browser window (so you\'re not logged in) and visit your site URL. If it loads normally, the issue may be intermittent — check your hosting uptime monitor.',
      'Test your site with an external tool: go to https://downforeveryoneorjustme.com and enter your URL. This confirms whether the problem is your connection or your server.',
      'If your site is down, log in to your hosting dashboard and check for server errors, suspended accounts, or expired domains.',
      'If your site requires a login to view (behind authentication), add an exception for the homepage and key pages. In WordPress: Settings → Reading → uncheck "Discourage search engines". In other CMSs, look for a "Maintenance Mode" or "Coming Soon" plugin — disable it.',
      'Check your server response time. If pages take over 5 seconds to load, AI crawlers will time out. Contact your host about upgrading your plan or use Cloudflare to add caching.',
      'Make sure your domain is not expired. Go to https://who.is and check the expiration date. Renew immediately if it\'s within 30 days.',
      'If you have Cloudflare, check that your "Under Attack Mode" is turned OFF — this blocks crawlers with a JavaScript challenge they cannot pass.',
    ],
    validate: 'Run curl -I https://yourdomain.com in a terminal (or use https://reqbin.com). You should see HTTP/2 200. Re-run this scan and the reachable check should be green.',
    timeEstimate: '10–60 minutes depending on the issue',
  },

  robots: {
    id: 'robots',
    title: 'Stop Blocking AI Crawlers in robots.txt',
    why: 'Your robots.txt file tells crawlers what they\'re allowed to access. If it blocks GPTBot (ChatGPT), ClaudeBot (Claude), or all bots with a wildcard rule, AI assistants cannot read your site at all. Many business owners added these blocks years ago for privacy reasons without realising they were shutting out AI entirely. This fix takes under 5 minutes.',
    steps: [
      'Visit https://yourdomain.com/robots.txt in your browser. You\'ll see a plain text file.',
      'Look for any of these lines: "Disallow: /" under "User-agent: *", "User-agent: GPTBot", "User-agent: ClaudeBot", "User-agent: Google-Extended", "User-agent: CCBot". These are the rules blocking AI crawlers.',
      'To edit your robots.txt: in WordPress, use the Yoast SEO plugin (SEO → Tools → File Editor) or install the "Robots.txt Editor" plugin. On other platforms, find the file in your root directory via FTP or your host\'s file manager.',
      'Remove or modify the blocking rules. The safest approach: remove the specific AI bot User-agent blocks entirely. If you want to keep blocking old scrapers, keep other rules but add explicit Allow rules for AI crawlers.',
      'A good, AI-friendly robots.txt looks like this:\n\nUser-agent: *\nAllow: /\n\nSitemap: https://yourdomain.com/sitemap.xml',
      'Save the file and verify by visiting https://yourdomain.com/robots.txt again — confirm the blocking rules are gone.',
      'Optionally, submit your sitemap to Google Search Console while you\'re here — it helps AI systems find your content faster.',
    ],
    validate: 'Visit your robots.txt and confirm no Disallow: / rules exist for * or AI bot user agents. Re-run this scan — the robots.txt check should turn green.',
    timeEstimate: '5–10 minutes',
  },

  'meta-title': {
    id: 'meta-title',
    title: 'Write a Strong Meta Title',
    why: 'The meta title is the first thing AI crawlers read to understand what your page is about. It\'s also what appears in Google search results. A title that\'s too short, too generic, or missing entirely means AI cannot confidently categorise your business — so it won\'t mention you when someone asks about your industry. A well-written title takes 10 minutes to fix and has an immediate impact.',
    steps: [
      'Decide on your ideal title format. The most effective pattern is: [Business Name] — [Primary Service] | [City or Niche]. Example: "Riverside HVAC — Heating & Cooling Repair | Austin, TX".',
      'Keep it between 30 and 65 characters. Shorter than 30 is too vague. Longer than 65 gets cut off in search results and AI summaries.',
      'Include your most important keyword naturally — what would a customer type into ChatGPT to find you? That phrase should be in your title.',
      'To update in WordPress: install or open Yoast SEO or RankMath. Edit the page, scroll to the SEO section at the bottom, and update the "SEO Title" field.',
      'In Squarespace: Pages → click your page → gear icon → SEO → "SEO Title".',
      'In Shopify: Online Store → Preferences → Homepage title. For other pages: edit the page → scroll to "Search engine listing preview" → Edit.',
      'In custom HTML: find the <title> tag in your <head> section and update the text between the tags. It should be unique for every page on your site.',
    ],
    validate: 'Open your site, right-click → View Page Source, and search for "<title>". Confirm your new title appears. Re-run this scan — the meta title check should be green.',
    timeEstimate: '10–15 minutes',
  },

  'meta-desc': {
    id: 'meta-desc',
    title: 'Write a Clear Meta Description',
    why: 'The meta description is a 1–2 sentence summary of your page that AI crawlers use to understand what your business does and who it serves. It\'s also the snippet that appears under your title in Google. A missing or weak meta description means AI has to guess what your business is about — and it will often get it wrong or skip you in favour of a competitor who explains themselves clearly.',
    steps: [
      'Write a 120–155 character description that answers three questions in one or two sentences: What do you do? Who do you serve? Where are you located (if local)?',
      'Example for a local business: "Riverside HVAC provides heating, cooling, and air quality services to homeowners in Austin, TX. Licensed, same-day service available." (152 characters)',
      'Example for an online business: "PromptBase is a marketplace where you can buy and sell high-quality AI prompts for ChatGPT, Midjourney, DALL-E, and Stable Diffusion." (143 characters)',
      'Avoid keyword stuffing — write it as if you\'re explaining your business to a smart friend. Natural language gets pulled by AI better than a list of keywords.',
      'To update in WordPress: open Yoast SEO or RankMath on the page, find the "Meta Description" field, and paste your description.',
      'In Squarespace: Pages → gear icon → SEO → "SEO Description".',
      'In custom HTML: add this inside your <head> tag: <meta name="description" content="Your description here.">',
    ],
    validate: 'View your page source and search for "meta name=\\"description\\"". Confirm your text appears in the content attribute. Re-run this scan — the meta description check should turn green.',
    timeEstimate: '10–20 minutes',
  },

  'og-tags': {
    id: 'og-tags',
    title: 'Add Open Graph Tags',
    why: 'Open Graph tags (og:title, og:description, og:image) were created for social media sharing, but AI crawlers also use them as a secondary layer of context about your page. When all three are present, AI has multiple consistent signals confirming what your business is and what it looks like. Missing OG tags is a small but fast fix that improves your trustworthiness score with AI systems.',
    steps: [
      'You need three OG tags: og:title (same as or similar to your meta title), og:description (same as or similar to your meta description), og:image (a 1200×630px image representing your brand).',
      'Create your og:image if you don\'t have one. Use Canva (free) — search for "Facebook Link Preview" which is 1200×630px. Add your logo, business name, and a clean background. Export as PNG.',
      'Upload your og:image to your website and copy the full URL (e.g. https://yourdomain.com/og-image.png).',
      'In WordPress with Yoast SEO: the OG tags are set automatically from your SEO title and description. Go to Yoast → Social → Facebook and upload your og:image there.',
      'In Next.js: add to your page metadata export:\nexport const metadata = {\n  openGraph: {\n    title: \'Your Title\',\n    description: \'Your description.\',\n    images: [{ url: \'https://yourdomain.com/og-image.png\', width: 1200, height: 630 }],\n  }\n}',
      'In custom HTML, add these three lines inside your <head>:\n<meta property="og:title" content="Your Business Name — Service">\n<meta property="og:description" content="What you do, who you serve.">\n<meta property="og:image" content="https://yourdomain.com/og-image.png">',
      'Test your OG tags at https://www.opengraph.xyz — paste your URL and confirm all three preview correctly.',
    ],
    validate: 'View page source and search for "og:title", "og:description", "og:image" — all three should appear. Re-run this scan to confirm the check turns green.',
    timeEstimate: '20–30 minutes',
  },

  schema: {
    id: 'schema',
    title: 'Add Schema.org Structured Data',
    why: 'Schema.org structured data is JSON code you add to your page that explicitly tells AI crawlers: this is what my business is, this is where it is, this is what it does. Without it, AI has to infer everything from your text — which leads to vague or incorrect descriptions. With it, AI gets a machine-readable fact sheet about your business. This is one of the highest-impact fixes you can make for AI visibility.',
    steps: [
      'Decide which schema type fits your business: Organization (any business), LocalBusiness (if you serve a geographic area), Product (if you sell a product), or Service (if you sell a service). You can use more than one.',
      'Go to https://technicalseo.com/tools/schema-markup-generator/ and select your type. Fill in your business name, URL, description, address, phone, logo URL, and social media links.',
      'The tool generates a JSON-LD code block that looks like: <script type="application/ld+json">{ "@context": "https://schema.org", ... }</script>',
      'Copy that entire block.',
      'In WordPress: install the "Schema & Structured Data for WP" plugin (free). Or paste the code directly into your theme\'s header.php file inside the <head> tag.',
      'In Next.js / React: add a <Script> component to your page with type="application/ld+json" and dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}.',
      'In Squarespace or Wix: go to Settings → Advanced → Code Injection → Header, and paste the full <script> block.',
      'Validate your schema at https://search.google.com/test/rich-results — paste your URL. It should show your schema type detected with no errors.',
    ],
    validate: 'Run your URL through https://search.google.com/test/rich-results. Confirm your schema type appears with no critical errors. Re-run this scan — the structured data check should turn green.',
    timeEstimate: '30–45 minutes',
  },

  h1: {
    id: 'h1',
    title: 'Add a Clear H1 Heading to Your Page',
    why: 'The H1 is the main headline of your page — it\'s the first human-readable signal AI uses to understand what the page is about. A missing H1 means AI has to guess your page\'s purpose from context alone. A strong H1 that includes your business name and what you do gives AI a clear, immediate answer. This is one of the fastest fixes with one of the most direct impacts on how AI describes you.',
    steps: [
      'Your H1 should follow this formula: [What you do] for [who you serve] in [where, if local]. It does not need to be clever — it needs to be clear. Example: "Trusted HVAC Repair for Austin Homeowners".',
      'You should have exactly one H1 per page. Multiple H1s confuse crawlers — they don\'t know which one is the primary topic.',
      'In WordPress: edit the page in Gutenberg. Click the title block at the top and confirm it is set to H1 in the block settings. Or in the text editor, ensure one line is wrapped in <h1> tags.',
      'In Squarespace: click the main text block on your homepage. Highlight the top line and set it to "Heading 1" using the text formatting toolbar.',
      'In custom HTML: find your main headline and change the tag from <h2> or <p> to <h1>. Make sure only this one heading uses <h1>.',
      'Make the H1 visible — it should be the first thing visitors read on your page. Do not hide it with CSS (display:none or visibility:hidden). Hidden H1s are flagged as deceptive by AI crawlers.',
      'Check your whole page has logical heading hierarchy: one H1, then H2 for major sections, H3 for subsections. AI reads this hierarchy to understand your content structure.',
    ],
    validate: 'View page source and search for "<h1". Confirm exactly one H1 tag exists with descriptive text. Re-run this scan — the H1 check should turn green.',
    timeEstimate: '10–15 minutes',
  },

  'business-name': {
    id: 'business-name',
    title: 'Make Sure Your Business Name Appears on the Page',
    why: 'AI assistants learn your business name by reading it repeatedly in consistent contexts across the web. If your own homepage doesn\'t mention your business name clearly and consistently, AI cannot build a confident association between your URL and your brand. This leads to vague or missing mentions in AI responses. The fix is simple: make sure your exact business name appears in your header, H1, and body text.',
    steps: [
      'Check your page for your exact business name — the same name you use on Google Business Profile, Yelp, LinkedIn, and other directories. Inconsistent names confuse AI.',
      'Your business name should appear in at least three places on your homepage: (1) your logo alt text, (2) your H1 or a prominent headline, and (3) your "About" or introduction paragraph.',
      'Update your logo image: in HTML, find your <img> tag for the logo and add alt="[Your Business Name] logo". In WordPress, go to Media Library, click the logo image, and update the Alt Text field.',
      'Update your header or navigation: make sure your business name appears as text in the site header, not just as an image with no alt tag.',
      'Add your business name to your homepage body text naturally — in the first paragraph, introduce yourself: "At [Business Name], we...". This gives AI a clear entity-to-URL mapping.',
      'Check that the name is exactly consistent everywhere — same capitalisation, same spelling, no abbreviations. "River HVAC", "River H.V.A.C.", and "RiverHVAC" are treated as three different entities by AI.',
      'Add your business name to your page\'s <title> tag and meta description if it isn\'t already there.',
    ],
    validate: 'Use Ctrl+F on your homepage to search for your business name. It should appear at least 3 times. Re-run this scan with your business name in the optional field — the check should turn green.',
    timeEstimate: '15–20 minutes',
  },

  viewport: {
    id: 'viewport',
    title: 'Add a Mobile Viewport Tag',
    why: 'The viewport meta tag tells browsers (and crawlers) that your site is designed to work on mobile devices. AI crawlers use mobile-friendliness as a proxy for site quality and maintenance. A missing viewport tag doesn\'t just hurt mobile users — it signals to AI systems that your site may be outdated or poorly maintained. This is a one-line fix.',
    steps: [
      'Open your site\'s HTML source or template file.',
      'Find the <head> section.',
      'Add this line anywhere inside the <head> block: <meta name="viewport" content="width=device-width, initial-scale=1">',
      'In WordPress: this is usually handled by your theme. Go to Appearance → Theme File Editor → header.php and look for an existing viewport tag. If it\'s missing, add the line above just after the <head> opening tag.',
      'In Squarespace, Wix, or Shopify: this is handled automatically by the platform — if this check failed, contact their support, as it may indicate a theme customisation that removed it.',
      'In Next.js: add viewport to your metadata export:\nexport const metadata = {\n  viewport: \'width=device-width, initial-scale=1\',\n}',
      'Save and publish your changes.',
    ],
    validate: 'View page source and search for "viewport". Confirm the tag appears in the <head>. Re-run this scan — the viewport check should turn green.',
    timeEstimate: '5 minutes',
  },

  canonical: {
    id: 'canonical',
    title: 'Add a Canonical URL Tag',
    why: 'A canonical tag tells search engines and AI crawlers: "This is the definitive version of this page." Without it, if your site is accessible at multiple URLs (with/without www, with/without trailing slash, HTTP and HTTPS), AI crawlers may split their attention between them — weakening your authority signal. A canonical tag consolidates everything to one URL. This is a one-line fix that takes 5 minutes.',
    steps: [
      'Decide on your canonical URL — the single "true" version of your homepage. Best practice: https://yourdomain.com/ (with HTTPS, without www, with trailing slash). Use this format consistently everywhere.',
      'Add this tag inside the <head> of your page: <link rel="canonical" href="https://yourdomain.com/">',
      'In WordPress with Yoast SEO: this is set automatically from your site URL. Go to Settings → General → WordPress Address (URL) and confirm it matches your canonical URL.',
      'In Next.js: add to your metadata export:\nexport const metadata = {\n  alternates: { canonical: \'https://yourdomain.com/\' }\n}',
      'In custom HTML: paste the <link rel="canonical"> tag directly inside your <head> block.',
      'Make sure every page on your site has its own canonical tag pointing to itself — not just the homepage.',
      'If you have duplicate pages (e.g. products accessible from multiple category paths in Shopify), use canonical tags on the duplicates to point to the primary version.',
    ],
    validate: 'View page source and search for "canonical". Confirm the tag appears pointing to your primary URL. Re-run this scan — the canonical check should turn green.',
    timeEstimate: '5–10 minutes',
  },

}
