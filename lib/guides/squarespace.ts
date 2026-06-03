import type { PlatformGuide } from './types';

export const squarespaceGuide: PlatformGuide = {
  platform: 'Squarespace',
  slug: 'squarespace',
  tagline: 'Clean aesthetics, limited GEO depth — you can do the basics but hit walls fast.',
  description:
    'Squarespace produces beautiful websites and handles fundamental SEO competently, but it was designed as a design-first platform, not a GEO optimization platform. Meta tags, OG, and basic schema are accessible. But structured data is largely auto-generated and not customizable per page without injecting raw code in the header — which requires a Business plan or higher. If you\'re on a Personal plan, your GEO options are severely limited.',
  geoScore: 4,
  sections: [
    {
      id: 'meta-title-description',
      title: 'Meta Title & Description',
      tier: 'green',
      items: [
        {
          label: 'Per-page meta title',
          detail: 'Pages panel → hover over a page → gear icon → SEO tab → "SEO Title" and "SEO Description" fields.',
        },
        {
          label: 'Homepage meta',
          detail: 'Marketing → SEO → Site Title & SEO Description. This sets the site-wide fallback and the homepage meta.',
        },
        {
          label: 'Blog posts',
          detail: 'Edit any blog post → Options tab (top right) → SEO section. Each post gets its own meta title and description.',
        },
        {
          label: 'Products (Commerce)',
          detail: 'Products section → edit product → SEO tab. Same fields as pages.',
        },
        {
          label: 'GEO tip',
          detail: 'Squarespace uses the page title as a meta title fallback. Always set explicit SEO titles — the page title is usually too short and brand-only.',
        },
      ],
    },
    {
      id: 'json-ld-schema',
      title: 'JSON-LD / Structured Data',
      tier: 'yellow',
      items: [
        {
          label: 'What Squarespace adds automatically',
          detail: 'Product schema on Commerce pages, Article schema on blog posts, and basic Organization/WebSite schema sitewide. No FAQPage, LocalBusiness, or HowTo schema is injected.',
        },
        {
          label: 'How to add custom schema (Business plan required)',
          detail: 'Website → Pages → select a page → gear icon → Advanced tab → "Page Header Code Injection" field. Paste your <script type="application/ld+json"> block here.',
        },
        {
          label: 'Sitewide schema injection',
          detail: 'Settings → Advanced → Code Injection → Header section. Add JSON-LD here to appear on every page — useful for Organization, LocalBusiness, or WebSite schema.',
        },
        {
          label: 'Plan requirement',
          detail: 'Code Injection is only available on Business, Commerce Basic, and Commerce Advanced plans. Personal plan users cannot inject custom schema — this is a hard ceiling.',
        },
        {
          label: 'No bulk automation',
          detail: 'Every page\'s schema must be added manually. There is no way to programmatically inject schema across hundreds of pages.',
        },
      ],
      codeSnippet: `<!-- Paste in: Page Settings > Advanced > Page Header Code Injection -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  "description": "One sentence describing what you do and who you serve.",
  "url": "https://yourdomain.com",
  "telephone": "+1-555-000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Your City",
    "addressRegion": "MA",
    "postalCode": "02021",
    "addressCountry": "US"
  },
  "openingHours": "Mo-Fr 09:00-17:00"
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
          label: 'Default behavior',
          detail: 'Squarespace auto-generates og:title, og:description, and og:image based on your page SEO settings and featured images.',
        },
        {
          label: 'Custom social image per page',
          detail: 'Pages → gear icon → SEO tab → scroll to "Social Image" and upload a custom image. 1200x628px recommended.',
        },
        {
          label: 'Blog post social images',
          detail: 'Post editor → Options tab → Thumbnail Image. This image is used for both the blog index and OG tags.',
        },
      ],
    },
    {
      id: 'robots-txt',
      title: 'robots.txt',
      tier: 'red',
      items: [
        {
          label: 'Native editing',
          detail: 'Squarespace does NOT provide a robots.txt editor in the UI. The file is auto-generated and you cannot edit it directly.',
        },
        {
          label: 'Current default',
          detail: 'Squarespace\'s default robots.txt allows all crawlers on all pages except /config/, /cart/, /checkout/, and a few admin paths. This is acceptable for most sites.',
        },
        {
          label: 'GEO check',
          detail: 'Visit yourdomain.com/robots.txt and verify that GPTBot, ClaudeBot, PerplexityBot, and GoogleOther are not being blocked. By default they are not.',
        },
        {
          label: 'Custom rules workaround',
          detail: 'There is no supported workaround for editing robots.txt on Squarespace without migrating to a headless setup.',
        },
      ],
    },
    {
      id: 'h1-content',
      title: 'H1 & Content Headings',
      tier: 'green',
      items: [
        {
          label: 'Setting H1',
          detail: 'In the Squarespace editor, click any text block → text toolbar → Heading 1. Only use H1 once per page, for the main page title.',
        },
        {
          label: 'Page title behavior',
          detail: 'If you use a Page Title block from Squarespace\'s block library, it auto-renders as H1. Don\'t add a second H1 manually.',
        },
        {
          label: 'Blog post headings',
          detail: 'The blog post title is the H1. In the body, use Heading 2 and Heading 3 to structure content. AI models look for Q&A patterns in subheadings.',
        },
        {
          label: 'GEO tip',
          detail: 'Structure your service or product pages with H2s that answer real questions. "How does X work?" → short paragraph answer. This exact format is what AI models excerpt.',
        },
      ],
    },
  ],
  cannotDo: [
    'Edit robots.txt — it is auto-generated and locked on all Squarespace plans.',
    'Add custom schema on Personal plan — Code Injection requires Business plan or higher.',
    'Programmatically generate schema across multiple pages — every page is manual.',
    'Use custom server-side code, edge functions, or middleware.',
    'Access the server or CDN configuration.',
    'Install third-party SEO plugins (unlike WordPress — Squarespace has no plugin marketplace).',
    'Create complex URL hierarchies — Squarespace URLs are flat or one level deep only.',
    'Implement hreflang tags for multilingual SEO without manual code injection per page.',
  ],
  recommendedApps: [
    {
      name: 'Squarespace SEO Checklist (built-in)',
      url: 'https://support.squarespace.com/hc/en-us/articles/205814308',
      description: "Squarespace's own guided SEO checklist. Start here before any third-party tools.",
      free: true,
    },
    {
      name: 'Google Search Console',
      url: 'https://search.google.com/search-console',
      description: 'Connect via Marketing > SEO > Connect to Google. Essential for monitoring how Googlebot (and Google AI) sees your site.',
      free: true,
    },
    {
      name: 'Semrush',
      url: 'https://semrush.com',
      description: 'External audit tool. Use for keyword tracking, schema validation, and GEO visibility monitoring outside the Squarespace dashboard.',
      free: false,
    },
    {
      name: 'Schema Markup Generator (Merkle)',
      url: 'https://technicalseo.com/tools/schema-markup-generator/',
      description: 'Free tool to generate correctly formatted JSON-LD for manual injection via Squarespace Code Injection.',
      free: true,
    },
  ],
  migrationFramework: [
    {
      situation: 'Portfolio, photographer, or visual-first business',
      verdict: 'Stay',
      reason: "Squarespace's design quality is genuinely best-in-class. GEO gains from migrating rarely outweigh the cost for visual-first sites.",
    },
    {
      situation: 'Local service business needing LocalBusiness schema',
      verdict: 'Consider migrating',
      reason: 'You can add LocalBusiness schema via code injection on Business plan, but WordPress + Yoast handles it far more cleanly.',
    },
    {
      situation: 'Blogger or content creator on Personal plan',
      verdict: 'Migrate',
      reason: 'No schema injection on Personal plan is a significant GEO handicap. WordPress is free and gives full control.',
    },
    {
      situation: 'E-commerce store needing product SEO at scale',
      verdict: 'Migrate',
      reason: 'Shopify or WooCommerce have far better product schema, app ecosystems, and bulk SEO tools.',
    },
    {
      situation: 'Small business, happy with the site, low GEO ambitions',
      verdict: 'Stay',
      reason: 'Content quality and meta tag optimization alone can achieve strong GEO results — you don\'t always need advanced schema.',
    },
  ],
};
