export const shopifyGuide = {
  platform: "Shopify",
  slug: "shopify",
  tagline: "The world's most popular e-commerce platform — powerful for selling, limited for GEO.",
  geoScore: 62,
  color: "#96bf48",

  canDo: [
    {
      title: "Add JSON-LD Schema",
      difficulty: "medium",
      steps: [
        "From your Shopify Admin, go to Online Store → Themes.",
        "Click the three-dot menu next to your active theme → Edit code.",
        "Open theme.liquid (under Layout).",
        "Paste your JSON-LD <script> block just before the closing </head> tag.",
        "For product-specific schema, open product.liquid or product-template.liquid.",
        "Use Liquid variables like {{ product.title }} and {{ product.description }} inside your JSON-LD to make it dynamic.",
        "Save and verify with Google's Rich Results Test."
      ],
      tip: "Shopify's Online Store 2.0 themes support app blocks — some schema apps inject JSON-LD without touching code at all."
    },
    {
      title: "Edit Meta Title & Description",
      difficulty: "easy",
      steps: [
        "Go to Online Store → Pages (or Products / Collections depending on what you're editing).",
        "Scroll to the bottom of any page editor — you'll see an SEO section.",
        "Click 'Edit website SEO'.",
        "Update Page title (70 chars max) and Meta description (160 chars max).",
        "Hit Save. Changes go live immediately."
      ],
      tip: "Shopify auto-generates meta titles from product/page names — always override them manually for GEO-optimized copy."
    },
    {
      title: "robots.txt",
      difficulty: "medium",
      steps: [
        "Shopify auto-generates a robots.txt file at yourdomain.com/robots.txt.",
        "Since Shopify 2021, you can customize it via a robots.txt.liquid file.",
        "In Theme Editor → Edit code, create a new template: Templates → Add a new template → robots.txt.",
        "This gives you control over which paths to allow/disallow and lets you add crawl rules for AI bots like GPTBot or ClaudeBot.",
        "Add: User-agent: GPTBot\nAllow: / to ensure AI crawlers can index your content."
      ],
      tip: "Without a custom robots.txt.liquid, Shopify blocks several paths like /checkout and /cart — that's fine. Focus on ensuring your main pages are crawlable."
    },
    {
      title: "Open Graph Tags",
      difficulty: "easy",
      steps: [
        "Shopify includes basic Open Graph tags natively in most themes via theme.liquid.",
        "To verify, view source on any page and search for og:title.",
        "For custom OG images per page: go to the page/product editor → SEO section → you may see an 'Image' field depending on your theme.",
        "For advanced control, edit theme.liquid to add custom og:description and og:image meta tags using Liquid variables."
      ],
      tip: "The free 'OG Tags' or 'SEO Manager' apps give you a UI to set Open Graph data without touching code."
    },
    {
      title: "Edit H1 & Content Headings",
      difficulty: "easy",
      steps: [
        "Product H1: The product title IS the H1 on most Shopify themes. Edit it in Products → [Product Name] → Title field.",
        "Page H1: Online Store → Pages → Title field renders as H1.",
        "Body content: Use the rich text editor to add H2, H3 headings inside description or page content.",
        "For blog posts: Blog Posts → [Post] — title is H1, use formatting in the body editor for subheadings."
      ],
      tip: "Never use H2/H3 in descriptions just for styling — AI engines read heading hierarchy to understand page structure."
    }
  ],

  cannotDo: [
    "Control server-side rendering or caching headers — Shopify manages all infrastructure.",
    "Restructure semantic HTML layout of your theme without editing Liquid theme files (requires developer).",
    "Implement dynamic rendering for AI crawlers specifically (e.g., serving a text-heavy version to GPTBot).",
    "Achieve sub-2s LCP reliably — Shopify's CDN is good but Core Web Vitals are heavily theme-dependent.",
    "Add custom HTTP headers (like Link: rel=canonical directives) at the server level.",
    "Bulk-generate schema across thousands of products programmatically without an app or custom script.",
    "Modify the checkout pages — these are locked by Shopify (Shopify Plus only allows limited customization)."
  ],

  recommendedApps: [
    {
      name: "Schema Plus for SEO",
      purpose: "Auto-generates rich JSON-LD schema for all products, collections, and pages.",
      free: false,
      url: "https://apps.shopify.com/schema-plus"
    },
    {
      name: "SEO Manager",
      purpose: "Bulk meta title/description editing, Open Graph controls, sitemap management.",
      free: false,
      url: "https://apps.shopify.com/seo-manager"
    },
    {
      name: "Plug In SEO",
      purpose: "Free tier available. Scans for missing meta, broken links, schema issues.",
      free: true,
      url: "https://apps.shopify.com/plug-in-seo"
    },
    {
      name: "TinyIMG",
      purpose: "Image compression + alt text automation for better Core Web Vitals and GEO signals.",
      free: true,
      url: "https://apps.shopify.com/tiny-img"
    }
  ],

  migrationFramework: {
    stayIf: [
      "You're an e-commerce store and selling is your primary goal — Shopify's commerce features are unmatched.",
      "You have under 500 products and your GEO needs are schema + meta optimization (fully doable on Shopify).",
      "You don't have developer resources — Shopify apps cover 80% of GEO gaps without code.",
      "Your tech team is non-technical — Shopify's UI is the most beginner-friendly of all platforms."
    ],
    migrateIf: [
      "You need granular control over page rendering, custom server middleware, or edge functions for AI personalization.",
      "Your site is content-heavy (blog, knowledge base, resource hub) and e-commerce is secondary.",
      "You need programmatic schema generation for a large catalog (1000+ products) and apps are too expensive.",
      "You're hitting Core Web Vitals walls that theme optimization can't solve."
    ],
    recommendedAlternative: "Next.js + Shopify Storefront API (headless) — keeps Shopify as the commerce backend while giving you full frontend control."
  }
};
