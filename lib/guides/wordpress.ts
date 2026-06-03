import type { PlatformGuide } from './types';

export const wordpressGuide: PlatformGuide = {
  platform: 'WordPress',
  slug: 'wordpress',
  tagline: 'The gold standard for GEO-ready content sites — with the right plugins, it\'s nearly limitless.',
  description:
    'WordPress powers 43% of the web and has the deepest SEO and GEO plugin ecosystem of any platform. With Yoast SEO or Rank Math installed, you can control meta tags, JSON-LD schema, Open Graph, robots directives, and breadcrumbs on every page type — including WooCommerce products — without writing a line of code. The platform ceiling only appears at the hosting and infrastructure level: your GEO results will depend significantly on your hosting provider\'s speed and uptime.',
  geoScore: 9,
  sections: [
    {
      id: 'meta-title-description',
      title: 'Meta Title & Description',
      tier: 'green',
      items: [
        {
          label: 'With Yoast SEO (recommended)',
          detail: 'Edit any page or post → scroll to the Yoast SEO block at the bottom → "SEO" tab → edit the snippet preview. The fields for SEO title and meta description are directly below the preview.',
        },
        {
          label: 'With Rank Math',
          detail: 'Edit any page or post → Rank Math panel (right sidebar or bottom) → General tab → Edit Snippet. Same fields, slightly different UI.',
        },
        {
          label: 'Template-level control',
          detail: 'Both Yoast and Rank Math let you set dynamic title templates for all posts of a type (e.g., "%title% | %sitename%" for all blog posts). Set this in Yoast → Search Appearance → Content Types.',
        },
        {
          label: 'WooCommerce products',
          detail: 'Yoast/Rank Math integrate directly with WooCommerce. Meta fields appear on the product edit screen. Templates auto-apply to all products.',
        },
        {
          label: 'GEO tip',
          detail: 'Use Yoast\'s "Focus Keyphrase" feature to identify if your meta title answers the question your target audience is likely asking an AI.',
        },
      ],
    },
    {
      id: 'json-ld-schema',
      title: 'JSON-LD / Structured Data',
      tier: 'green',
      items: [
        {
          label: 'Yoast SEO auto-schema',
          detail: 'Yoast automatically generates a schema graph (WebPage, Article, BreadcrumbList, Organization, WebSite) for every page. The graph is connected, meaning entities reference each other correctly — this is best practice for AI indexing.',
        },
        {
          label: 'FAQ schema (high GEO impact)',
          detail: 'Install Yoast → add a FAQ block to any Gutenberg post or page → Yoast auto-generates FAQPage schema from the block content. No code required. This is the single highest-impact GEO action for most WordPress sites.',
        },
        {
          label: 'HowTo schema',
          detail: 'Same as FAQ: add a How-To block in Gutenberg → Yoast generates HowTo schema automatically.',
        },
        {
          label: 'LocalBusiness schema',
          detail: 'Yoast → General → Company or Person → fill in your organization details. For richer local schema, use the Local SEO for Yoast add-on or Rank Math\'s built-in LocalBusiness settings.',
        },
        {
          label: 'Custom schema',
          detail: 'For any schema type not natively supported, use the Rank Math Schema Generator or the WPCode plugin to inject raw JSON-LD per page, per post type, or sitewide.',
        },
        {
          label: 'WooCommerce product schema',
          detail: 'Yoast WooCommerce SEO or Rank Math auto-generates Product, Offer, and AggregateRating schema for all products.',
        },
      ],
      codeSnippet: `// Add custom schema via WPCode plugin (no theme editing required)
// WPCode > Add New Snippet > PHP Snippet
add_action('wp_head', function() {
  if (is_singular('post')) { // Only on blog posts
    $schema = [
      '@context' => 'https://schema.org',
      '@type' => 'Article',
      'headline' => get_the_title(),
      'description' => get_the_excerpt(),
      'datePublished' => get_the_date('c'),
      'dateModified' => get_the_modified_date('c'),
      'author' => [
        '@type' => 'Person',
        'name' => get_the_author()
      ]
    ];
    echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
  }
});`,
      codeLanguage: 'php',
    },
    {
      id: 'open-graph',
      title: 'Open Graph Tags',
      tier: 'green',
      items: [
        {
          label: 'Yoast SEO',
          detail: 'Yoast → Social (left menu) → Facebook tab. Enable Open Graph metadata. Per-page OG fields appear in the Yoast block on each post/page edit screen under the "Social" tab.',
        },
        {
          label: 'Rank Math',
          detail: 'Rank Math → Titles & Meta → Global Meta. Enable Open Graph. Per-post Social Preview is in the Rank Math panel under "Social Preview".',
        },
        {
          label: 'Custom OG image per post',
          detail: 'In the Yoast social tab or Rank Math social preview, upload a specific OG image. If not set, both plugins fall back to the post\'s Featured Image.',
        },
        {
          label: 'Twitter/X cards',
          detail: 'Both plugins also generate Twitter Card meta tags. Enable in Yoast → Social → Twitter or Rank Math\'s Global Meta settings.',
        },
      ],
    },
    {
      id: 'robots-txt',
      title: 'robots.txt',
      tier: 'green',
      items: [
        {
          label: 'Yoast SEO editor',
          detail: 'Yoast → Tools → File Editor → robots.txt section. Full text editor — edit and save directly from the WordPress admin.',
        },
        {
          label: 'Rank Math editor',
          detail: 'Rank Math → General Settings → Edit robots.txt. Same functionality, different location.',
        },
        {
          label: 'Manual editing (via FTP/hosting)',
          detail: 'Your robots.txt file lives at the root of your WordPress install (same level as wp-config.php). Edit via FTP, cPanel File Manager, or SSH.',
        },
        {
          label: 'GEO-critical rule',
          detail: 'Ensure GPTBot, ClaudeBot, PerplexityBot, GoogleOther, and anthropic-ai are explicitly allowed. Some WordPress security plugins (Wordfence, iThemes) add blanket Disallow rules — check your file carefully.',
        },
        {
          label: 'Wordfence warning',
          detail: 'Wordfence does NOT block AI crawlers by default, but some Wordfence firewall rules can inadvertently block bot user agents. Check Live Traffic logs for blocked AI crawler requests.',
        },
      ],
    },
    {
      id: 'h1-content',
      title: 'H1 & Content Headings',
      tier: 'green',
      items: [
        {
          label: 'Post/page title as H1',
          detail: 'In WordPress (Gutenberg or Classic Editor), the Title field at the top of every post/page renders as the H1 tag. Never add a second H1 in the body.',
        },
        {
          label: 'Gutenberg heading blocks',
          detail: 'In the block editor, use the Heading block and set level to H2 or H3. The toolbar shows the heading level. Structure content top-down: H2 for main sections, H3 for subsections.',
        },
        {
          label: 'FAQ blocks for GEO',
          detail: 'Add a FAQ block (from Yoast or the native WordPress FAQ block) with question text in the heading. Yoast generates FAQPage schema automatically from these blocks — maximum GEO impact with zero code.',
        },
        {
          label: 'Content audit',
          detail: 'Use Yoast\'s Readability analysis — it flags poor heading structure, passive voice, and paragraph length. All three affect AI model citation quality.',
        },
      ],
    },
  ],
  cannotDo: [
    'Control server infrastructure without a managed or self-hosted plan — shared hosting limits your Core Web Vitals ceiling.',
    'Modify CDN behavior natively without a CDN plugin (WP Rocket, Cloudflare) or a managed host (WP Engine, Kinsta, Flywheel).',
    'Implement Edge Functions or middleware without moving to a headless setup (Next.js + WordPress as headless CMS).',
    'Guarantee uptime or speed without investing in quality hosting — this is the #1 WordPress GEO risk most owners ignore.',
  ],
  recommendedApps: [
    {
      name: 'Yoast SEO',
      url: 'https://yoast.com/wordpress/plugins/seo/',
      description: 'The most comprehensive SEO plugin for WordPress. Handles meta, schema graph, OG, robots, breadcrumbs, and readability analysis.',
      free: true,
    },
    {
      name: 'Rank Math',
      url: 'https://rankmath.com',
      description: 'Yoast alternative with more schema types in the free tier. Excellent for LocalBusiness and Product schema without paid add-ons.',
      free: true,
    },
    {
      name: 'WPCode',
      url: 'https://wpcode.com',
      description: 'Safely inject custom PHP/HTML snippets (including JSON-LD) without editing theme files. Survives theme updates.',
      free: true,
    },
    {
      name: 'WP Rocket',
      url: 'https://wp-rocket.me',
      description: 'Page caching, lazy loading, and CDN integration. Fastest way to improve Core Web Vitals on WordPress.',
      free: false,
    },
    {
      name: 'Cloudflare (free tier)',
      url: 'https://cloudflare.com',
      description: 'DNS + CDN + DDoS protection. The free tier meaningfully improves TTFB and adds basic AI bot traffic visibility in analytics.',
      free: true,
    },
  ],
  migrationFramework: [
    {
      situation: 'Content-driven site, blog, or local business',
      verdict: 'Stay',
      reason: 'WordPress + Yoast is the most mature GEO stack available. Almost no reason to migrate for content sites.',
    },
    {
      situation: 'SaaS or web application',
      verdict: 'Migrate',
      reason: 'WordPress is not a web app framework. Use Next.js or similar for the application layer, keeping WordPress as a headless CMS if needed.',
    },
    {
      situation: 'E-commerce store (WooCommerce)',
      verdict: 'Stay',
      reason: 'WooCommerce + Yoast/Rank Math gives excellent product schema and GEO coverage. Only migrate to Shopify if you need their commerce operations features.',
    },
    {
      situation: 'On cheap shared hosting with poor Core Web Vitals',
      verdict: 'Consider migrating',
      reason: "Don't migrate the platform — migrate the host. Move to WP Engine, Kinsta, or Cloudways. Speed is a GEO signal.",
    },
    {
      situation: 'Non-technical user who finds WordPress overwhelming',
      verdict: 'Consider migrating',
      reason: 'Webflow or Squarespace may serve you better. GEO gains from WordPress are lost if you never update the site due to complexity.',
    },
  ],
};
