import type { PlatformGuide } from './types';

export const shopifyGuide: PlatformGuide = {
  platform: 'Shopify',
  slug: 'shopify',
  tagline: 'Solid native SEO controls but limited schema flexibility without apps.',
  description:
    'Shopify gives merchants a strong foundation for technical SEO and GEO — meta tags, sitemaps, and canonical URLs are handled automatically. The real gap is structured data: Shopify only injects basic Product and BreadcrumbList schema by default, and getting custom JSON-LD onto every page type requires either theme code edits or a dedicated app. This guide walks you through every GEO action, whether you can do it yourself or need help.',
  geoScore: 6,
  sections: [
    {
      id: 'meta-title-description',
      title: 'Meta Title & Description',
      tier: 'green',
      items: [
        {
          label: 'Where to find it',
          detail: 'Online Store → Pages / Products / Collections → scroll to the bottom of any edit screen → "Search engine listing preview" → click "Edit website SEO".',
        },
        {
          label: 'Title length',
          detail: 'Keep under 60 characters. Shopify shows a live preview as you type.',
        },
        {
          label: 'Description length',
          detail: 'Keep under 155 characters. AI models read this field — treat it like a one-sentence answer to what the page is about.',
        },
        {
          label: 'Homepage meta',
          detail: 'Online Store → Preferences → "Title and meta description" at the top of the page.',
        },
      ],
    },
    {
      id: 'json-ld-schema',
      title: 'JSON-LD / Structured Data',
      tier: 'yellow',
      items: [
        {
          label: 'What Shopify adds by default',
          detail: 'Product schema and BreadcrumbList are injected automatically on product pages. No FAQ, LocalBusiness, Article, or HowTo schema is added.',
        },
        {
          label: 'DIY method (requires theme code access)',
          detail: 'Online Store → Themes → Actions → Edit code → open theme.liquid (or the relevant section file) → paste your JSON-LD block inside a <script type="application/ld+json"> tag just before </head>.',
        },
        {
          label: 'No-code method',
          detail: 'Use the Schema Plus for SEO app (see Recommended Apps). It generates and injects JSON-LD per page type without touching code.',
        },
        {
          label: 'FAQ schema tip',
          detail: 'Any product page with a FAQ section should have FAQPage schema added — this is one of the highest-impact GEO actions. AI models frequently pull FAQ content into answers.',
        },
      ],
      codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes your product different?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your honest, specific answer goes here."
      }
    }
  ]
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
          label: 'Built-in support',
          detail: 'Shopify themes automatically output og:title, og:description, og:image, og:url, and og:type on all pages — no setup needed.',
        },
        {
          label: 'Customizing OG image',
          detail: 'Online Store → Preferences → Social sharing image. This sets the fallback OG image site-wide. Individual product/collection images override it automatically.',
        },
        {
          label: 'Verify tags',
          detail: 'Use Facebook Sharing Debugger or opengraph.xyz to confirm tags are rendering correctly after any theme changes.',
        },
      ],
    },
    {
      id: 'robots-txt',
      title: 'robots.txt',
      tier: 'yellow',
      items: [
        {
          label: 'Default behavior',
          detail: 'Shopify generates a robots.txt automatically. For most stores the default is fine.',
        },
        {
          label: 'How to customize (Shopify 2.0+ themes only)',
          detail: 'Online Store → Themes → Actions → Edit code → look for robots.txt.liquid. If it doesn\'t exist, create it at the Templates level. This file uses Liquid to output your custom rules.',
        },
        {
          label: 'GEO-relevant rule',
          detail: 'Do NOT block GPTBot, ClaudeBot, PerplexityBot, or GoogleOther. These are the AI crawler agents that build the training and retrieval indexes. Blocking them means you won\'t appear in AI answers.',
        },
        {
          label: 'AI crawler user agents to allow',
          detail: 'GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot, GoogleOther (Gemini), anthropic-ai.',
        },
      ],
    },
    {
      id: 'h1-content',
      title: 'H1 & Content Headings',
      tier: 'green',
      items: [
        {
          label: 'Product page H1',
          detail: 'The product title IS the H1 on product pages. Edit it in Products → [product name] → Title field.',
        },
        {
          label: 'Page & blog H1',
          detail: 'Online Store → Pages or Blog Posts → the page title field renders as H1. Keep it specific and entity-rich.',
        },
        {
          label: 'Body content headings',
          detail: 'In the rich text editor, highlight text and use the Format dropdown to apply H2/H3. Structure your content so H2s answer specific questions — AI models look for clear Q&A patterns.',
        },
        {
          label: 'GEO tip',
          detail: 'Use H2s that mirror the exact questions your customers ask. "How long does shipping take?" as an H2 with a direct answer below it dramatically increases your chances of appearing in AI responses.',
        },
      ],
    },
  ],
  cannotDo: [
    'Control server-side rendering or streaming behavior — Shopify\'s CDN and rendering pipeline is fully managed.',
    'Implement dynamic rendering for AI crawlers specifically (no middleware or edge function access).',
    'Bulk-generate schema programmatically across thousands of products without an app.',
    'Add custom HTTP response headers (e.g., Link: <url>; rel=canonical via header instead of tag).',
    'Modify Core Web Vitals at the infrastructure level — theme code can help, but JS framework and CDN are Shopify-controlled.',
    'Create custom URL structures beyond Shopify\'s fixed /products/, /collections/, /pages/ patterns without third-party redirects.',
    'Implement server-side hreflang injection for complex international setups.',
  ],
  recommendedApps: [
    {
      name: 'Schema Plus for SEO',
      url: 'https://apps.shopify.com/schema-plus',
      description: 'Automatically generates and injects 20+ schema types including FAQ, HowTo, Article, and LocalBusiness. No code required.',
      free: false,
    },
    {
      name: 'Plug in SEO',
      url: 'https://apps.shopify.com/plug-in-seo',
      description: 'Comprehensive SEO audit tool with structured data, meta tag management, and broken link detection.',
      free: true,
    },
    {
      name: 'TinyIMG',
      url: 'https://apps.shopify.com/tiny-img',
      description: 'Image compression + alt text optimization. Fast images = better GEO signals.',
      free: true,
    },
    {
      name: 'JSON-LD for SEO',
      url: 'https://apps.shopify.com/json-ld-for-seo',
      description: 'Specialized structured data app used by 30k+ stores. Handles all major schema types.',
      free: false,
    },
  ],
  migrationFramework: [
    {
      situation: 'Simple product catalog, no complex content needs',
      verdict: 'Stay',
      reason: 'Shopify + Schema Plus app covers 90% of GEO needs for a standard e-commerce store.',
    },
    {
      situation: 'Primarily a content/blog-driven business using Shopify',
      verdict: 'Consider migrating',
      reason: 'Shopify\'s blog is limited. WordPress gives far more content structure control for GEO.',
    },
    {
      situation: 'Local service business using Shopify for booking',
      verdict: 'Consider migrating',
      reason: 'LocalBusiness + ServiceArea schema is complex on Shopify. Webflow or WordPress handles it better natively.',
    },
    {
      situation: 'Large catalog (1,000+ SKUs) needing bulk schema',
      verdict: 'Consider migrating',
      reason: 'Headless commerce (Shopify API + Next.js) gives full code control while keeping Shopify as backend.',
    },
    {
      situation: 'Revenue depends on AI-driven discovery for branded queries',
      verdict: 'Stay',
      reason: 'Shopify\'s domain authority and Product schema coverage is strong for branded product queries.',
    },
  ],
};
