export const wixGuide = {
  platform: "Wix",
  slug: "wix",
  tagline: "Easy drag-and-drop builder with growing SEO capabilities — but GEO ceiling is real.",
  geoScore: 48,
  color: "#faad03",

  canDo: [
    {
      title: "Add JSON-LD Schema",
      difficulty: "medium",
      steps: [
        "In your Wix Editor, go to Settings (the gear icon in the left panel).",
        "Click 'SEO' in the left sidebar, then select 'SEO Tools'.",
        "Click 'Structured Data Markup' — this opens the JSON-LD editor.",
        "Select the page type you want to add schema to (Home, About, Product, etc.).",
        "Paste your JSON-LD code in the text box. Wix supports dynamic variables like {page.title} and {page.url}.",
        "Click 'Apply' and publish your site.",
        "Validate with Google's Rich Results Test."
      ],
      tip: "Wix's Structured Data tool is surprisingly capable — you can add LocalBusiness, FAQPage, Organization, and Product schema without any code."
    },
    {
      title: "Edit Meta Title & Description",
      difficulty: "easy",
      steps: [
        "In the Wix Editor, click on the page you want to edit in the Pages panel.",
        "Click the three-dot menu next to the page name → SEO Basics.",
        "Edit the Title Tag and Meta Description fields.",
        "For dynamic pages (blog, store): go to Pages → [Dynamic Page] → SEO → and use the SEO Patterns feature to set meta templates.",
        "Click Save and Publish."
      ],
      tip: "Use Wix's SEO Patterns for blog and store pages — it lets you create templates like '{post.title} | Your Brand' so you're not manually editing hundreds of posts."
    },
    {
      title: "robots.txt",
      difficulty: "hard",
      steps: [
        "Wix does NOT let you edit robots.txt directly through the standard editor.",
        "To access it: go to your Wix Dashboard → Marketing & SEO → SEO Tools → robots.txt editor.",
        "This feature is available on most paid plans and lets you add custom Allow/Disallow rules.",
        "Add AI crawler permissions: User-agent: GPTBot\nAllow: / and User-agent: ClaudeBot\nAllow: /",
        "Wix automatically includes a sitemap reference at the bottom of your robots.txt."
      ],
      tip: "If you don't see a robots.txt editor, you may be on an older Wix plan. Upgrade or contact Wix support."
    },
    {
      title: "Open Graph Tags",
      difficulty: "easy",
      steps: [
        "Wix includes basic Open Graph tags automatically for all pages.",
        "To customize: Editor → Page settings → SEO → Social Share.",
        "Upload a custom social image (1200×630px recommended) and edit the OG title and description.",
        "For blog posts: Blog dashboard → Post → SEO & Social settings → Social tab.",
        "For products: Wix Stores → Product → Edit → SEO tab → Social Share settings."
      ],
      tip: "Wix doesn't expose og:type or og:locale in the UI — these are set automatically. For advanced OG control you'll need Wix Velo (see below)."
    },
    {
      title: "Edit H1 & Content Headings",
      difficulty: "easy",
      steps: [
        "In the Wix Editor, click on any text element on your page.",
        "Highlight text and use the text formatting toolbar — select Heading 1, Heading 2, etc.",
        "Important: Only ONE element per page should be set to H1 — this is usually your page's main title.",
        "For blog posts: the post title is automatically H1. Use the editor to set subheadings as H2/H3.",
        "Use the Wix Accessibility Wizard (Settings → Accessibility) to check heading hierarchy."
      ],
      tip: "Wix's drag-and-drop makes it easy to accidentally have multiple H1 tags or skip heading levels. Run an audit with the Accessibility Wizard before publishing."
    }
  ],

  cannotDo: [
    "Edit raw HTML output — Wix generates HTML automatically and you can't override its structure.",
    "Control server-side rendering, caching, or CDN behavior.",
    "Implement custom HTTP headers or edge middleware.",
    "Achieve reliable sub-2s Core Web Vitals — Wix's JavaScript payload is heavy and largely outside your control.",
    "Add canonical tags to external URLs (Wix only allows self-referential canonicals).",
    "Export your site to another platform without rebuilding content manually.",
    "Use custom server-side logic for AI crawler detection or conditional rendering."
  ],

  recommendedApps: [
    {
      name: "Wix SEO Wiz",
      purpose: "Built-in guided SEO checklist. Good starting point for GEO basics.",
      free: true,
      url: "https://support.wix.com/en/article/wix-seo-wiz"
    },
    {
      name: "Semrush (Wix Integration)",
      purpose: "Keyword research + on-page SEO suggestions directly inside Wix dashboard.",
      free: false,
      url: "https://www.wix.com/app-market/semrush"
    },
    {
      name: "Site Booster",
      purpose: "Business listing distribution and local SEO signals — good for GEO local visibility.",
      free: false,
      url: "https://www.wix.com/app-market/site-booster"
    }
  ],

  migrationFramework: {
    stayIf: [
      "You're a small local business and local GEO (LocalBusiness schema, Google Maps, NAP consistency) is your primary need — fully doable on Wix.",
      "You're non-technical and need a manageable UI — Wix Velo can handle moderate customizations without a full developer.",
      "Your site has fewer than 50 pages and you're not relying on programmatic SEO at scale.",
      "Your budget doesn't allow for a rebuild — Wix's free structured data tool is genuinely useful."
    ],
    migrateIf: [
      "Core Web Vitals are failing and affecting your GEO visibility — Wix has limited CWV optimization headroom.",
      "You need programmatic page generation (e.g., 1000s of location pages, product pages).",
      "You're a SaaS or tech company where your site's authority and technical precision matter to AI engines.",
      "You need to run A/B tests, custom redirects, or middleware that Wix doesn't support."
    ],
    recommendedAlternative: "WordPress with a lightweight theme (Kadence, GeneratePress) + Rank Math SEO plugin gives you Wix-level ease with far more GEO control."
  }
};
