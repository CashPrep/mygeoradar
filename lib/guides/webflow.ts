import type { PlatformGuide } from './types';

export const webflowGuide: PlatformGuide = {
  platform: 'Webflow',
  slug: 'webflow',
  tagline: 'The most GEO-capable no-code platform — full schema control, clean code output, zero lock-in.',
  description:
    'Webflow is the outlier in the no-code world: it generates clean, semantic HTML, gives you full control over every meta tag and JSON-LD block, and allows code injection at every level (site, page, collection item). For GEO optimization, Webflow is the closest a no-code platform gets to a custom-coded site. The main limitation is that Webflow CMS has a record limit on lower plans, and truly dynamic schema generation requires either Webflow Logic or an external integration.',
  geoScore: 9,
  sections: [
    {
      id: 'meta-title-description',
      title: 'Meta Title & Description',
      tier: 'green',
      items: [
        {
          label: 'Static pages',
          detail: 'In the Webflow Designer, select any page → Pages panel (left sidebar) → gear icon next to page name → SEO Settings tab. Set Title Tag and Meta Description here.',
        },
        {
          label: 'CMS Collection pages',
          detail: 'Open the Collection template page → Pages panel → gear icon → SEO Settings. Use field bindings (e.g., {Name}, {SEO Description field}) to auto-populate meta from your CMS data.',
        },
        {
          label: 'Dynamic field binding',
          detail: 'This is Webflow\'s superpower: every CMS collection item automatically gets a unique, content-accurate meta title and description. No manual editing per item.',
        },
        {
          label: 'Homepage',
          detail: 'Pages panel → Home page → gear icon → SEO Settings. Same interface as other static pages.',
        },
        {
          label: 'GEO tip',
          detail: 'Create a dedicated "SEO Description" field in each CMS collection. Write these as direct answers to customer questions, not marketing copy.',
        },
      ],
    },
    {
      id: 'json-ld-schema',
      title: 'JSON-LD / Structured Data',
      tier: 'green',
      items: [
        {
          label: 'Site-wide schema injection',
          detail: 'Project Settings → Custom Code tab → "Head Code" section. Paste your JSON-LD block here to apply to all pages. Use for Organization, WebSite, and sitewide LocalBusiness schema.',
        },
        {
          label: 'Per-page schema injection',
          detail: 'Page Settings → Custom Code tab → "Inside <head> tag" section. Add page-specific JSON-LD here.',
        },
        {
          label: 'Dynamic schema for CMS pages',
          detail: 'On a Collection template page, use an Embed element inside the page body (or in Custom Code) with a JSON-LD script containing CMS field bindings like {{wf {"path":"name"}}}. This generates unique schema for every item automatically.',
        },
        {
          label: 'Supported schema types',
          detail: 'Webflow supports any schema type — FAQPage, LocalBusiness, Product, Article, HowTo, BreadcrumbList, Event, Service, Person. You are not limited to platform-approved types.',
        },
        {
          label: 'Verification',
          detail: 'After publishing, test with Google Rich Results Test and Schema.org Validator. Webflow\'s clean HTML output means schema almost always validates without errors.',
        },
      ],
      codeSnippet: `<!-- Dynamic schema for a Webflow CMS Blog Collection template page -->
<!-- Add via Page Settings > Custom Code > Inside <head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{wf {\"path\":\"name\"}}}",
  "description": "{{wf {\"path\":\"seo-description\"}}}",
  "datePublished": "{{wf {\"path\":\"published-on\",\"type\":\"Date\",\"format\":\"iso\"}}}",
  "author": {
    "@type": "Person",
    "name": "{{wf {\"path\":\"author-name\"}}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Brand",
    "url": "https://yourdomain.com"
  }
}
</script>`,
      codeLanguage: 'html',
    },
    {
      id: 'open-graph',
      title: 'Open Graph Tags',
      tier: 'green',
      items: [
        {
          label: 'Static pages',
          detail: 'Page Settings → SEO Settings tab → "Open Graph" section. Set og:title, og:description, and upload an og:image directly.',
        },
        {
          label: 'CMS Collection pages',
          detail: 'Same as meta: bind og:title, og:description, and og:image to CMS fields. The OG image field accepts an Image field binding.',
        },
        {
          label: 'Twitter/X cards',
          detail: 'Webflow also outputs twitter:card, twitter:title, and twitter:description — these are in the same Open Graph section of Page Settings.',
        },
        {
          label: 'Verification',
          detail: 'After publishing, test with opengraph.xyz or LinkedIn Post Inspector. Webflow\'s OG implementation is reliable and rarely has issues.',
        },
      ],
    },
    {
      id: 'robots-txt',
      title: 'robots.txt',
      tier: 'green',
      items: [
        {
          label: 'Where to edit',
          detail: 'Project Settings → SEO tab → scroll to "robots.txt" section. Full text editor — edit directly and save.',
        },
        {
          label: 'GEO-critical rule',
          detail: 'Ensure you are NOT blocking GPTBot, ClaudeBot, PerplexityBot, GoogleOther, or anthropic-ai. Webflow\'s default robots.txt is open to all crawlers.',
        },
        {
          label: 'Recommended additions',
          detail: 'Add a Sitemap directive: Sitemap: https://yourdomain.com/sitemap.xml — Webflow auto-generates your sitemap at this path.',
        },
        {
          label: 'Webflow-hosted vs. custom domain',
          detail: 'robots.txt changes only take effect on your published custom domain, not on the .webflow.io staging URL.',
        },
      ],
    },
    {
      id: 'h1-content',
      title: 'H1 & Content Headings',
      tier: 'green',
      items: [
        {
          label: 'Setting heading tags',
          detail: 'In the Designer, select any text element → Style panel or Element Settings (right sidebar) → change the HTML tag to H1, H2, or H3. Webflow outputs semantic heading tags directly — no wrapper divs.',
        },
        {
          label: 'CMS headings',
          detail: 'On Collection pages, bind a Heading element to the item Name or a custom Text field. The heading tag is set in the Designer and remains consistent across all items.',
        },
        {
          label: 'Heading hierarchy',
          detail: 'Webflow allows you to visually inspect heading hierarchy. Right-click any element → "View page source" to verify your H1/H2/H3 structure before publishing.',
        },
        {
          label: 'GEO tip',
          detail: 'Use H2s to ask and answer questions directly in your page copy. Webflow\'s clean output means AI crawlers can parse the Q&A structure reliably — better than platforms that add extra divs and classes around every heading.',
        },
      ],
    },
  ],
  cannotDo: [
    'Run server-side Node.js, Python, or other backend code natively — Webflow is a static site generator. Use Webflow Integrations or an external API for dynamic functionality.',
    'Deploy edge functions or middleware on the Webflow CDN — requires moving to a custom hosting setup with a headless approach.',
    'Implement real-time personalization or A/B testing natively (requires third-party scripts like Google Optimize or Optimizely).',
    'Build a complex multi-user application natively — Webflow Memberships is limited vs. a full auth system.',
    'Exceed CMS collection limits on Starter/Basic plans (up to 10,000 items on Business plan).',
    'Run programmatic bulk content generation — CMS imports via CSV help, but you can\'t script it.',
  ],
  recommendedApps: [
    {
      name: 'Webflow Optimize (built-in)',
      url: 'https://webflow.com/optimize',
      description: "Webflow's A/B testing and personalization tool. Use to test GEO-optimized page variants.",
      free: false,
    },
    {
      name: 'Whalesync',
      url: 'https://whalesync.com',
      description: 'Sync Airtable, Notion, or Google Sheets to Webflow CMS. Enables programmatic content generation with schema fields.',
      free: false,
    },
    {
      name: 'Finsweet CMS Library',
      url: 'https://finsweet.com/attributes',
      description: 'Free JS library that adds filtering, sorting, and load-more to Webflow CMS — improves content UX signals.',
      free: true,
    },
    {
      name: 'Semrush',
      url: 'https://semrush.com',
      description: 'Connect your Webflow domain for full SEO/GEO audit, keyword tracking, and AI visibility monitoring.',
      free: false,
    },
  ],
  migrationFramework: [
    {
      situation: 'Design-focused business that wants GEO control without coding',
      verdict: 'Stay',
      reason: 'Webflow is the best non-code platform for GEO. Clean HTML, full schema control, and CMS dynamic binding are genuinely powerful.',
    },
    {
      situation: 'SaaS or web app needing user auth, payments, or real-time data',
      verdict: 'Migrate',
      reason: 'Webflow is a marketing site platform. Move the app layer to Next.js and keep Webflow for the marketing site, or go fully custom.',
    },
    {
      situation: 'Content-heavy SEO site with 10,000+ pages',
      verdict: 'Consider migrating',
      reason: 'Webflow CMS has item limits. At scale, Next.js + headless CMS (Contentful, Sanity) gives more programmatic control.',
    },
    {
      situation: 'Agency building client sites that need GEO optimization',
      verdict: 'Stay',
      reason: "Webflow's Editor mode lets clients maintain content without breaking the schema structure you've built.",
    },
    {
      situation: 'Developer who wants full code control',
      verdict: 'Consider migrating',
      reason: 'Next.js or Astro will always give you more control. But Webflow gets you 90% there with 20% of the build time.',
    },
  ],
};
