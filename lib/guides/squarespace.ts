export const squarespaceGuide = {
  platform: "Squarespace",
  slug: "squarespace",
  tagline: "Beautiful design-first platform with decent SEO basics — but GEO depth is limited.",
  geoScore: 51,
  color: "#1c1c1c",

  canDo: [
    {
      title: "Add JSON-LD Schema",
      difficulty: "medium",
      steps: [
        "Go to your Squarespace Pages panel and open the page you want to add schema to.",
        "Click the gear icon next to the page name → Advanced tab.",
        "In the 'Page Header Code Injection' field, paste your JSON-LD <script> block.",
        "This injects code only on that specific page — ideal for page-specific schema.",
        "For site-wide schema (e.g., Organization schema), go to Settings → Advanced → Code Injection → Header.",
        "Paste your JSON-LD in the Header field — this runs on every page.",
        "Validate with Google's Rich Results Test after publishing."
      ],
      tip: "Squarespace 7.1 does NOT support the old Style Editor injection method — use the Advanced tab per-page or the global Code Injection in Settings."
    },
    {
      title: "Edit Meta Title & Description",
      difficulty: "easy",
      steps: [
        "In the Pages panel, click the gear icon next to any page.",
        "Go to the SEO tab.",
        "Edit the SEO Title (shown in search results) and Description fields.",
        "For blog posts: open the post → gear icon → SEO tab.",
        "For products: Squarespace Commerce → [Product] → SEO tab.",
        "Squarespace also has a site-wide SEO title format under Settings → SEO → Title Format."
      ],
      tip: "Use the Title Format setting to create a consistent brand suffix: 'Page Title | Your Business Name' — this is great for AI engines to identify your brand."
    },
    {
      title: "robots.txt",
      difficulty: "hard",
      steps: [
        "Squarespace auto-generates a robots.txt at yourdomain.com/robots.txt.",
        "You CANNOT edit it directly — there is no robots.txt editor in Squarespace's UI.",
        "The only workaround is to use the URL Mapping feature (Settings → Advanced → URL Mappings) to redirect /robots.txt to a custom hosted file — but this breaks the auto-generated one.",
        "Practical approach: Verify your site isn't accidentally blocked by checking the auto-generated robots.txt and ensuring your key pages are crawlable.",
        "For AI crawlers: Squarespace's default robots.txt doesn't block GPTBot or ClaudeBot — you're likely already crawlable."
      ],
      tip: "This is one of Squarespace's biggest GEO limitations. If robots.txt control is critical to your strategy, this is a strong migration argument."
    },
    {
      title: "Open Graph Tags",
      difficulty: "easy",
      steps: [
        "Squarespace automatically generates Open Graph tags from your page title, description, and thumbnail.",
        "To customize per page: Pages → gear icon → Social Image — upload a 1200×630px image.",
        "The social sharing title and description pull from your SEO Title and Description fields.",
        "For site-wide OG: Settings → SEO → Social Sharing → set a default social image.",
        "Verify OG tags with the Facebook Sharing Debugger or LinkedIn Post Inspector."
      ],
      tip: "Squarespace's OG implementation is solid for basic needs. You can't add custom og:type values beyond what Squarespace sets, but for most GEO use cases this is fine."
    },
    {
      title: "Edit H1 & Content Headings",
      difficulty: "easy",
      steps: [
        "In the Squarespace editor, click on any text block.",
        "Highlight text and use the toolbar to apply Heading 1, Heading 2, Heading 3, etc.",
        "Your page's main title (at the top of the page layout) typically renders as H1 automatically.",
        "Avoid adding a second H1 in your content blocks — use H2 for section headers instead.",
        "For blog posts: the post title is H1. Use heading formats in the body for structure."
      ],
      tip: "Squarespace 7.1 renders page headers as H1 in most templates. Confirm by viewing page source or using a browser SEO extension like Detailed."
    }
  ],

  cannotDo: [
    "Edit robots.txt — Squarespace generates it automatically and provides no native editor.",
    "Add custom HTTP headers, server-side redirects beyond basic URL mappings, or edge functions.",
    "Control Core Web Vitals at a technical level — Squarespace's JavaScript bundle is large.",
    "Generate pages programmatically — no templating engine access for bulk page creation.",
    "Use server-side rendering customization or dynamic rendering for AI crawlers.",
    "Access or modify the underlying HTML structure of your templates.",
    "Implement hreflang tags for multilingual SEO natively (requires code injection workarounds)."
  ],

  recommendedApps: [
    {
      name: "SEOSpace",
      purpose: "Squarespace-specific SEO tool. Audits pages, checks headings, meta, and schema gaps.",
      free: false,
      url: "https://seospace.co"
    },
    {
      name: "Google Search Console",
      purpose: "Connect via Settings → Connected Accounts. Essential for monitoring GEO crawl coverage.",
      free: true,
      url: "https://search.google.com/search-console"
    }
  ],

  migrationFramework: {
    stayIf: [
      "Your brand relies heavily on visual presentation (portfolio, photography, restaurant) and GEO optimization is secondary.",
      "You have a small site (under 30 pages) with basic local business GEO needs.",
      "Design consistency and ease of use matter more than technical SEO depth.",
      "You're using Squarespace for a side project, landing page, or personal brand."
    ],
    migrateIf: [
      "You need robots.txt control for AI crawler management — Squarespace simply doesn't offer this.",
      "You're building a content-heavy site (50+ pages) where programmatic SEO matters.",
      "Core Web Vitals failures are costing you visibility — Squarespace has limited optimization headroom.",
      "You need schema automation beyond what manual code injection can reasonably manage."
    ],
    recommendedAlternative: "WordPress with Kadence theme + Rank Math SEO offers comparable design quality with vastly superior GEO control."
  }
};
