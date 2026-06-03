export const wordpressGuide = {
  platform: "WordPress",
  slug: "wordpress",
  tagline: "The most powerful platform for GEO — full control, vast plugin ecosystem, but requires some technical confidence.",
  geoScore: 94,
  color: "#21759b",

  canDo: [
    {
      title: "Add JSON-LD Schema",
      difficulty: "easy",
      steps: [
        "Install Rank Math SEO (free) or Yoast SEO (free tier) from Plugins → Add New.",
        "Rank Math auto-generates schema for all post types — go to Rank Math → Schema → Schema Generator.",
        "For custom schema on any page: Rank Math adds a Schema tab in every post/page editor.",
        "Click 'Schema Generator' → choose type (Article, FAQ, Product, LocalBusiness, etc.) → fill in the fields.",
        "Rank Math also lets you add custom JSON-LD via its Code block or via the Theme Header injection.",
        "For WooCommerce: Rank Math Pro automatically adds Product schema with price, availability, and reviews.",
        "Validate with Google's Rich Results Test."
      ],
      tip: "Rank Math's Schema Generator is one of the most capable no-code schema tools available anywhere. The free version covers 95% of GEO schema needs."
    },
    {
      title: "Edit Meta Title & Description",
      difficulty: "easy",
      steps: [
        "With Rank Math or Yoast installed, every post/page editor shows an SEO panel at the bottom.",
        "Scroll to the SEO section → Edit Snippet.",
        "Edit the SEO Title and Meta Description. Both plugins show character count and a live preview.",
        "For bulk editing: Rank Math → SEO Analysis → Bulk Editor lets you edit meta for hundreds of pages at once.",
        "Set global title templates: Rank Math → Titles & Meta → Posts → Title Format."
      ],
      tip: "WordPress + Rank Math is the gold standard for meta management. The Bulk SEO Editor alone saves hours and is not available on any other major platform."
    },
    {
      title: "robots.txt",
      difficulty: "easy",
      steps: [
        "With Rank Math: go to Rank Math → General Settings → Edit robots.txt.",
        "You get a full text editor. Edit and save — changes go live immediately.",
        "With Yoast: SEO → Tools → File Editor → robots.txt section.",
        "Add AI crawler rules: User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /",
        "Also ensure your sitemap URL is referenced: Sitemap: https://yourdomain.com/sitemap_index.xml",
        "Test your robots.txt via Google Search Console → Settings → robots.txt."
      ],
      tip: "WordPress gives you full robots.txt control — one of the most important GEO capabilities. Use it to explicitly allow all major AI crawlers."
    },
    {
      title: "Open Graph Tags",
      difficulty: "easy",
      steps: [
        "Rank Math: post/page editor → SEO panel → Social tab.",
        "Set Facebook (OG) Title, Description, and Image.",
        "Set Twitter Card Title, Description, and Image separately.",
        "Site-wide defaults: Rank Math → Titles & Meta → Homepage → Social Media tab.",
        "For WooCommerce products: OG tags pull from product data automatically with Rank Math."
      ],
      tip: "WordPress gives you the most granular OG control of any platform — including og:type, og:locale, article:author, and article:published_time tags that other platforms don't expose."
    },
    {
      title: "Edit H1 & Content Headings",
      difficulty: "easy",
      steps: [
        "In the WordPress Block Editor (Gutenberg), use the Heading block — set level to H1, H2, H3, etc. in the block settings sidebar.",
        "The post/page Title field at the top automatically renders as H1.",
        "Never add a second Heading block set to H1 in your content.",
        "Use Rank Math's Content Analysis (in the SEO panel) to check heading structure in real time.",
        "For page builders (Elementor, Beaver Builder): each heading widget lets you set the HTML tag independently of visual size."
      ],
      tip: "Rank Math's Content Analysis panel grades your heading structure, keyword usage, and content quality in real time as you write — this is the closest thing to an AI editor built into your CMS."
    },
    {
      title: "Canonical Tags, hreflang & Sitemaps",
      difficulty: "easy",
      steps: [
        "Canonical: Rank Math → Advanced tab in post editor → Canonical URL field. Override per page.",
        "hreflang for multilingual: use WPML or Polylang + their Rank Math integration for automatic hreflang tags.",
        "Sitemap: Rank Math auto-generates an XML sitemap at yourdomain.com/sitemap_index.xml.",
        "Submit to Google Search Console and Bing Webmaster Tools.",
        "Configure which post types / taxonomies to include: Rank Math → Sitemap Settings."
      ],
      tip: "WordPress + Rank Math is the only platform where all five of these advanced GEO signals (canonical, hreflang, sitemap, robots, schema) are fully controllable without writing a single line of code."
    }
  ],

  cannotDo: [
    "Nothing major — WordPress is the most capable GEO platform available. Edge cases only:",
    "Real-time server-side rendering with complex API data requires a headless WordPress setup.",
    "Achieving Next.js-level ISR (Incremental Static Regeneration) performance requires WP as a headless backend.",
    "Managed hosting plans (WordPress.com free/personal) restrict plugin installation — you need WordPress.org (self-hosted) for full GEO control."
  ],

  recommendedApps: [
    {
      name: "Rank Math SEO",
      purpose: "Best-in-class free SEO/GEO plugin. Schema, meta, robots.txt, sitemaps, content analysis — all-in-one.",
      free: true,
      url: "https://rankmath.com"
    },
    {
      name: "WP Rocket",
      purpose: "Caching + Core Web Vitals optimization. Dramatically improves LCP and CLS scores.",
      free: false,
      url: "https://wp-rocket.me"
    },
    {
      name: "Imagify",
      purpose: "Auto-convert images to WebP/AVIF and compress for faster load times.",
      free: true,
      url: "https://imagify.io"
    },
    {
      name: "WPML",
      purpose: "Multilingual support with automatic hreflang — essential for international GEO.",
      free: false,
      url: "https://wpml.org"
    },
    {
      name: "Kadence Theme",
      purpose: "Lightweight, GEO-friendly theme with excellent Core Web Vitals out of the box.",
      free: true,
      url: "https://www.kadencewp.com"
    }
  ],

  migrationFramework: {
    stayIf: [
      "You have a content-heavy site (blog, knowledge base, news, resource hub) — WordPress is purpose-built for this.",
      "You're using WooCommerce — it remains the most GEO-capable e-commerce platform when paired with Rank Math.",
      "Your team is familiar with WordPress and a rebuild would mean months of downtime/risk.",
      "You need maximum GEO control without a full developer — WordPress + Rank Math covers everything."
    ],
    migrateIf: [
      "You're building a complex web application (dashboard, SaaS, real-time features) — WordPress is not a web app framework.",
      "Your WordPress site has accumulated years of plugin bloat and is too slow to fix — a fresh Next.js build may be faster.",
      "You need a fully managed, zero-ops infrastructure — Webflow or Squarespace may be easier to maintain long-term."
    ],
    recommendedAlternative: "Next.js with WordPress as a headless CMS (WPGraphQL) — keeps your content in WordPress while giving you full frontend performance control."
  }
};
