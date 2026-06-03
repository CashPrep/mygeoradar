import type { PlatformGuide } from './types';

export const wixGuide: PlatformGuide = {
  platform: 'Wix',
  slug: 'wix',
  tagline: 'More GEO control than most people realize — but with hard infrastructure ceilings.',
  description:
    'Wix has significantly improved its SEO and structured data capabilities in recent years. Most GEO-relevant changes — meta tags, JSON-LD schema, Open Graph, and robots.txt — are now accessible without writing code, through the Wix SEO settings panel. The platform ceiling appears when you need programmatic control, custom rendering logic, or deep technical customization. This guide shows you exactly what\'s possible and where you\'ll hit a wall.',
  geoScore: 5,
  sections: [
    {
      id: 'meta-title-description',
      title: 'Meta Title & Description',
      tier: 'green',
      items: [
        {
          label: 'Where to find it',
          detail: 'In the Wix Editor, click on any page → Page Settings (gear icon at top) → SEO tab. Or use the Wix SEO Dashboard (Marketing & SEO → SEO Tools → SEO Dashboard).',
        },
        {
          label: 'Bulk editing',
          detail: 'Marketing & SEO → SEO Tools → SEO Dashboard → scroll down to "Get found on Google" → manage pages. You can edit meta for all pages from one view.',
        },
        {
          label: 'Dynamic pages',
          detail: 'For Wix Stores, Blog, or dynamic content: go to the dynamic page settings and use SEO patterns (e.g., {title} - {siteName}) to auto-populate meta tags across all items.',
        },
        {
          label: 'GEO tip',
          detail: 'Write meta descriptions as direct answers. "We are a Canton MA plumber open 24/7" performs better in AI answers than "Welcome to our plumbing services."',
        },
      ],
    },
    {
      id: 'json-ld-schema',
      title: 'JSON-LD / Structured Data',
      tier: 'yellow',
      items: [
        {
          label: 'Built-in Structured Data Markup tool',
          detail: 'Marketing & SEO → SEO Tools → Structured Data Markup. This is Wix\'s native JSON-LD editor. You can select page type and add schema without writing code.',
        },
        {
          label: 'How to add custom JSON-LD',
          detail: 'In the Structured Data Markup tool, click "Add Schema" → choose type (e.g., FAQPage, LocalBusiness) → fill in the fields or paste raw JSON. Save and publish.',
        },
        {
          label: 'Dynamic variables',
          detail: 'Wix lets you use variables like {title}, {price}, {description} inside schema fields to auto-populate data from your content — no manual updates needed when products change.',
        },
        {
          label: 'Wix Stores schema',
          detail: 'Product schema is added automatically for Wix Stores items. Verify it\'s rendering correctly with Google\'s Rich Results Test.',
        },
        {
          label: 'Blog Article schema',
          detail: 'Wix Blog auto-generates Article schema. To add Author entity markup (important for E-E-A-T signals), you need to use the Structured Data Markup tool manually per post or use a pattern.',
        },
      ],
      codeSnippet: `// Example: Adding FAQPage schema via Wix Structured Data Markup tool
// Paste this JSON in the "Custom" schema field:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you offer same-day service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer same-day service for appointments booked before 2pm."
      }
    }
  ]
}`,
      codeLanguage: 'json',
    },
    {
      id: 'open-graph',
      title: 'Open Graph Tags',
      tier: 'green',
      items: [
        {
          label: 'Default behavior',
          detail: 'Wix auto-generates og:title, og:description, og:image, og:type, and og:url for all pages based on your SEO settings and featured images.',
        },
        {
          label: 'Customizing per page',
          detail: 'Page Settings → SEO tab → Social Share section. You can set a custom OG title, description, and image per page.',
        },
        {
          label: 'Site-wide OG image',
          detail: 'Marketing & SEO → SEO Tools → Social Share Settings. Set the default fallback image used when no page-specific image is defined.',
        },
      ],
    },
    {
      id: 'robots-txt',
      title: 'robots.txt',
      tier: 'yellow',
      items: [
        {
          label: 'Where to find it',
          detail: 'Marketing & SEO → SEO Tools → Robots.txt Editor. This is a full text editor for your robots.txt — available on all Wix plans.',
        },
        {
          label: 'How to edit',
          detail: 'Click "Edit Robots.txt" and modify directly. Changes take effect after publishing. Wix will warn you if you\'re about to block major crawlers.',
        },
        {
          label: 'GEO-critical rule',
          detail: 'Make sure GPTBot, ClaudeBot, PerplexityBot, GoogleOther, and anthropic-ai are NOT in your Disallow list. If you\'ve ever used a security plugin or template, check these entries.',
        },
        {
          label: 'Recommended addition',
          detail: 'Add a Sitemap line: Sitemap: https://yourdomain.com/sitemap.xml — Wix auto-generates your sitemap at this URL.',
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
          detail: 'In the Wix Editor, click any text element → Text Settings (top toolbar) → change the style dropdown to "Heading 1". Only one H1 per page.',
        },
        {
          label: 'GEO best practice',
          detail: 'Your H1 should match or closely mirror your meta title. AI models weight the H1 heavily when determining what a page is about.',
        },
        {
          label: 'Subheadings (H2/H3)',
          detail: 'Use the same Text Settings dropdown for H2 and H3. Structure content as questions (H2) with direct answers (paragraph below) — this is the format AI models love to cite.',
        },
        {
          label: 'Wix Blog headings',
          detail: 'In the Blog post editor, use the Format toolbar (the H1/H2/H3 buttons) to set heading hierarchy. The post title auto-renders as H1.',
        },
      ],
    },
  ],
  cannotDo: [
    'Access or modify server infrastructure, CDN configuration, or HTTP headers.',
    'Implement custom middleware for dynamic rendering or bot-specific responses.',
    'Use custom JavaScript frameworks (React, Next.js, Vue) — Wix uses its own Velo framework only.',
    'Control Core Web Vitals at the infrastructure level — Wix\'s rendering engine is fully managed.',
    'Create URL structures outside of Wix\'s slug patterns (e.g., no /category/subcategory/product nesting).',
    'Inject server-side code or edge functions for real-time personalization or AI-specific rendering.',
    'Export and migrate content easily — Wix lock-in is real and migration requires manual effort or third-party tools.',
  ],
  recommendedApps: [
    {
      name: 'Wix SEO Wiz',
      url: 'https://support.wix.com/en/article/wix-seo-wiz-getting-started',
      description: 'Built-in guided SEO setup tool. Walks you through meta, sitemap, and structured data steps for your specific business type.',
      free: true,
    },
    {
      name: 'SE Ranking',
      url: 'https://seranking.com',
      description: 'External tool for tracking GEO keyword visibility across AI platforms. Use alongside Wix to measure what\'s working.',
      free: false,
    },
    {
      name: 'Semrush Site Audit',
      url: 'https://semrush.com',
      description: 'Connect your Wix domain for a full technical SEO audit including schema validation and crawlability checks.',
      free: false,
    },
    {
      name: 'Cloudflare (via CNAME)',
      url: 'https://www.cloudflare.com',
      description: 'If on a Wix Business plan, you can point to Cloudflare for added performance and security — partially mitigates infrastructure limitations.',
      free: true,
    },
  ],
  migrationFramework: [
    {
      situation: 'Local service business with simple info pages',
      verdict: 'Stay',
      reason: 'Wix\'s structured data tool + clean content structure covers the GEO needs of most local businesses.',
    },
    {
      situation: 'E-commerce store growing past 500 products',
      verdict: 'Consider migrating',
      reason: 'Shopify or WooCommerce provide better schema coverage, bulk editing, and app ecosystems at scale.',
    },
    {
      situation: 'Content-heavy site needing advanced blog structure',
      verdict: 'Consider migrating',
      reason: 'WordPress gives far more content architecture control — categories, tags, custom post types, and schema all at a deeper level.',
    },
    {
      situation: 'Technical founder who wants full code control',
      verdict: 'Migrate',
      reason: 'Wix Velo is limited vs. Next.js/Webflow. If you\'re comfortable with code, the ceiling is too low for serious GEO work.',
    },
    {
      situation: 'Non-technical owner with limited budget',
      verdict: 'Stay',
      reason: 'Wix\'s native SEO tools are genuinely good enough for most small businesses. The migration cost outweighs the gains.',
    },
  ],
};
