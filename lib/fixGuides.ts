// ─────────────────────────────────────────────────────────────────────────────
// Fix Guides — one detailed guide per scan check ID
// Each guide is shown in the paid /report/[token] page
// ─────────────────────────────────────────────────────────────────────────────

export interface FixGuide {
  id: string
  title: string
  why: string
  steps: string[]
  // Platform-specific step overrides — keyed by platform id (e.g. 'shopify', 'wix')
  // When present, these REPLACE the generic steps for users on that platform.
  platformSteps?: Record<string, string[]>
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
    platformSteps: {
      shopify: [
        'Shopify automatically provides and renews SSL for all stores — your store should already be on HTTPS.',
        'If your custom domain is showing HTTP, log in to your Shopify Admin → Settings → Domains.',
        'Find your primary domain and click "Enable SSL certificate". Shopify provisions this free via Let\'s Encrypt.',
        'Under your domain settings, enable "Redirect all traffic to this domain" and make sure "Force HTTPS" is on.',
        'Wait up to 24 hours for DNS propagation if this is a newly connected domain.',
        'Visit your store at https://yourdomain.com and confirm the padlock appears. If issues persist, contact Shopify Support — SSL on custom domains is covered under all Shopify plans.',
      ],
      wix: [
        'Wix provides free SSL for all connected domains automatically.',
        'Go to your Wix Dashboard → Settings → Domains.',
        'If SSL is not showing as active on your domain, click "Renew" or "Enable SSL" next to your domain name.',
        'Wix also enables HTTPS redirects by default — ensure "Redirect to HTTPS" is toggled on under your domain settings.',
        'If your site is still on a free Wix subdomain (yourname.wixsite.com), upgrade to a paid plan to connect a custom domain, which then gets free SSL.',
        'After changes, wait 10–30 minutes and verify by visiting https://yourdomain.com in an incognito window.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'Log in to your Shopify Admin in an incognito window to simulate a logged-out visitor. If the site loads, it is publicly accessible.',
        'Check that your store is not in password-protected mode: Admin → Online Store → Preferences → scroll to "Password protect your storefront" — make sure this is disabled.',
        'Verify your custom domain is correctly pointing to Shopify: Admin → Settings → Domains. The domain should show as "Connected".',
        'If your domain expired, renew it through your registrar (Shopify Domains, GoDaddy, Namecheap, etc.) and allow 24–48 hours for DNS to propagate.',
        'If pages are loading slowly (over 5s), check your app list for heavy third-party apps — each installed Shopify app can add render-blocking scripts. Remove unused apps.',
      ],
      wix: [
        'Open your site in an incognito window. If it loads without asking for a password, it is publicly accessible.',
        'Check that your site is Published (not in draft mode): in the Wix Editor, click the blue "Publish" button in the top right. If it says "Update" instead, click it to push the latest version.',
        'Check for a Members-Only or password page: Wix Dashboard → Settings → Permissions. Make sure your homepage is set to "Everyone" not "Members only".',
        'Confirm your domain is not expired: Dashboard → Settings → Domains. Renew if within 30 days.',
        'If load time is slow, go to Dashboard → Marketing & SEO → SEO Tools and check for Wix performance alerts. Compress images using Wix\'s built-in media optimizer.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'Visit https://yourdomain.com/robots.txt in your browser to see what is currently there.',
        'Shopify auto-generates your robots.txt. You cannot edit it freely on basic plans — it requires a Shopify Liquid robots.txt template (available on Online Store 2.0 themes).',
        'To enable custom robots.txt: in your Shopify Admin → Online Store → Themes → click "Edit code" on your active theme.',
        'In the Templates folder, look for "robots.txt.liquid". If it does not exist, click "Add a new template" → select "robots.txt" from the dropdown.',
        'In the robots.txt.liquid file, find any Disallow rules for GPTBot, ClaudeBot, or wildcard (*) that block everything. Delete those lines.',
        'Add these lines to the end of the file to explicitly allow AI crawlers:\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /',
        'Save the file and visit https://yourdomain.com/robots.txt to confirm the new rules are live.',
      ],
      wix: [
        'Visit https://yourdomain.com/robots.txt to see the current file.',
        'Wix lets you edit your robots.txt directly: go to your Wix Dashboard → Marketing & SEO → SEO → SEO Tools → "Optimize your site\'s robots.txt".',
        'In the robots.txt editor, look for any Disallow: / rules under User-agent: * or AI bot user agents (GPTBot, ClaudeBot).',
        'Remove those blocking lines or change "Disallow: /" to "Allow: /" for the AI bot agents.',
        'A safe Wix robots.txt should read:\n\nUser-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://yourdomain.com/sitemap.xml',
        'Click Save and visit your robots.txt URL again to confirm the change went live.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'For your homepage title: Shopify Admin → Online Store → Preferences → "Homepage title" field. Write your title using the format: [Business Name] — [Primary Service] | [City or Niche]. Keep it 30–65 characters.',
        'For other pages (About, Contact, Collections, Products): navigate to that page in Admin, scroll down to the "Search engine listing preview" section, and click "Edit website SEO".',
        'Update the "Page title" field with a descriptive, unique title for each page.',
        'For product pages: go to Products → select a product → scroll to "Search engine listing preview" → Edit website SEO → update Page title.',
        'Shopify does not allow bulk-editing meta titles from the Admin UI — you\'ll need to edit them one by one, or use a Shopify SEO app like "SEO Manager" or "Smart SEO" for bulk edits.',
        'Save changes and wait a few minutes, then view your page source (right-click → View Page Source) and search for "<title>" to confirm the update.',
      ],
      wix: [
        'In the Wix Editor, click on the page you want to update in the Pages & Menu panel on the left.',
        'Click the three-dot menu next to the page name → "SEO (Google preview)".',
        'Update the "Title tag" field. Use the format: [Business Name] — [Primary Service] | [City if local]. Keep it 30–65 characters.',
        'For your homepage specifically: go to Dashboard → Marketing & SEO → SEO → SEO Tools → "Get found on Google" → edit your homepage SEO title there.',
        'Wix also has a bulk SEO editor: Dashboard → Marketing & SEO → SEO → "Manage SEO". This lets you see and edit meta titles across all pages at once — faster than the editor.',
        'Click Publish after making changes. Verify by viewing page source and searching for "<title>".',
      ],
    },
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
    platformSteps: {
      shopify: [
        'For your homepage: Admin → Online Store → Preferences → "Homepage meta description" field.',
        'Write a 120–155 character description covering what your store sells, who it\'s for, and any differentiator (e.g. "free shipping", "handmade", "Austin-based").',
        'For other pages (collections, products, About): navigate to the page → scroll to "Search engine listing preview" → Edit website SEO → update the "Meta description" field.',
        'For products: Products → select product → Search engine listing preview → Edit → update "Meta description".',
        'To edit multiple pages faster, use a Shopify SEO app like "Smart SEO" which lets you bulk-edit descriptions.',
        'Save, then verify by viewing page source and searching for "meta name=\\"description\\"" to confirm the text appears.',
      ],
      wix: [
        'In the Wix Editor, click the three-dot menu next to the page name → "SEO (Google preview)".',
        'Update the "Description" field. Write 120–155 characters describing what you do, for whom, and where (if local).',
        'For the homepage via Dashboard: Marketing & SEO → SEO → SEO Tools → "Get found on Google" → edit your homepage description.',
        'Use the Wix bulk SEO editor (Dashboard → Marketing & SEO → SEO → Manage SEO) to update descriptions across all pages at once.',
        'Click Publish after all edits. Verify with page source — search for "meta name=\\"description\\"".',
      ],
    },
    validate: 'View your page source and search for "meta name=\"description\"". Confirm your text appears in the content attribute. Re-run this scan — the meta description check should turn green.',
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
    platformSteps: {
      shopify: [
        'Shopify automatically generates og:title and og:description from your page/product titles and descriptions — no code needed for those.',
        'To set a custom og:image for your homepage: Admin → Online Store → Preferences → scroll to "Social sharing image" → upload a 1200×630px image here. This becomes your og:image for the homepage.',
        'For product pages, Shopify uses the first product image as og:image automatically.',
        'To customise OG tags beyond these defaults (e.g. unique og:title per page), you\'ll need to edit your theme\'s Liquid files: Admin → Online Store → Themes → Edit code → find "theme.liquid" → locate the og: meta tags and update the values using Liquid variables.',
        'Alternatively, install a free Shopify SEO app like "SEO Manager" or "Booster SEO" — both provide a UI for editing OG tags per page without touching code.',
        'Test with https://www.opengraph.xyz by pasting your store URL to confirm all three OG tags appear.',
      ],
      wix: [
        'Wix automatically generates og:title and og:description from your page SEO settings.',
        'To set og:image: in the Wix Editor, go to the page → three-dot menu → "SEO (Google preview)" → scroll to "Social share image" → upload your 1200×630px image.',
        'For the homepage via Dashboard: Marketing & SEO → SEO → "Get found on Google" → update the social share image.',
        'Create your og:image using Canva (free) — search for "Facebook Link Preview" template (1200×630px). Add your logo and business name, then export as PNG.',
        'After publishing, test with https://www.opengraph.xyz to confirm og:title, og:description, and og:image all appear correctly.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'Shopify automatically generates basic Product schema for product pages. However, Organization and LocalBusiness schema for your homepage requires manual addition.',
        'Go to https://technicalseo.com/tools/schema-markup-generator/ → select "Organization" (or "LocalBusiness" if you have a physical location). Fill in your store name, URL, description, logo URL, and social profile links.',
        'Copy the generated JSON-LD <script> block.',
        'In Shopify Admin → Online Store → Themes → Edit code → find "theme.liquid".',
        'Paste the entire <script type="application/ld+json">...</script> block just before the closing </head> tag.',
        'Click Save. Then validate at https://search.google.com/test/rich-results — paste your store URL and confirm the Organization schema appears with no errors.',
        'Alternatively, install the free "Schema Plus for SEO" app from the Shopify App Store — it adds Organization, LocalBusiness, and breadcrumb schema automatically with no code editing.',
      ],
      wix: [
        'Go to https://technicalseo.com/tools/schema-markup-generator/ → select "Organization" (or "LocalBusiness"). Fill in your business name, URL, description, logo, address, and social links.',
        'Copy the generated <script type="application/ld+json">...</script> block.',
        'In your Wix Dashboard → Settings → Advanced → Custom Code.',
        'Click "+ Add Custom Code", paste the full JSON-LD script block, give it a name like "Organization Schema", set location to "Head", and apply it to "All Pages".',
        'Click Apply. Then validate at https://search.google.com/test/rich-results — paste your Wix site URL and confirm the schema is detected.',
        'Important: Wix\'s custom code feature is available on paid plans only. If you are on the free plan, upgrading to any paid Wix plan (starting at ~$17/month) unlocks this feature.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'In Shopify, each page type handles H1 differently. For your homepage: the H1 is typically your store name or the first banner heading in your theme.',
        'Go to Admin → Online Store → Themes → Customize. Navigate to your homepage in the theme editor.',
        'Click on the hero/banner section at the top. Look for a "Heading" text field — this text renders as an H1 in most themes. Update it to clearly describe what your store sells and who it\'s for.',
        'For regular pages (About, etc.): Admin → Online Store → Pages → edit the page → the page title automatically renders as H1.',
        'For collection pages: Admin → Products → Collections → edit the collection → the collection title is the H1.',
        'Important: some Shopify themes render the store name (from Settings → General → Store name) as the H1 on the homepage. Check by viewing page source (Ctrl+U) and searching for "<h1". Update your store name or theme heading text accordingly.',
        'Do not duplicate H1s — each page should have exactly one. Use the page source check to confirm.',
      ],
      wix: [
        'In the Wix Editor, click on the main headline text block on your page.',
        'In the text editing toolbar that appears, check the text style dropdown. It should show "Heading 1" (or "H1"). If it says Heading 2, Heading 3, or Paragraph, click the dropdown and change it to "Heading 1".',
        'Your H1 text should be: [What you do] for [who you serve] in [city, if local]. Keep it clear over clever.',
        'Check that you only have ONE Heading 1 per page. Click through every text block on the page and confirm no other block is set to Heading 1.',
        'Click Publish after making changes.',
        'Verify: right-click your published page → View Page Source → search for "<h1". You should see exactly one result with your new headline text.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'Go to Admin → Settings → General → "Store name". Make sure this exactly matches the name on your Google Business Profile and other directories.',
        'Your store name automatically appears in the browser tab title. To also show it visibly on the homepage: Admin → Online Store → Themes → Customize → click your header section → ensure "Show store name" is enabled (or add a text element with your store name).',
        'Update your logo alt text: Admin → Online Store → Themes → Customize → click on your logo image → update the "Logo alt text" field to "[Your Store Name] logo".',
        'On your homepage, add a text section (if your theme supports it) with an introductory sentence: "At [Store Name], we...". This gives AI a clear brand-to-URL mapping.',
        'Check your About page also mentions the store name prominently — AI cross-references multiple pages on your domain to build brand associations.',
      ],
      wix: [
        'In the Wix Editor, confirm your site name appears in the header. Click the header → if your business name is only shown as a logo image, add a Text element next to it with your business name typed out.',
        'Click on your logo image → in the left panel, find "Alt Text" and enter "[Your Business Name] logo". This is critical — logo-only headers with no alt text mean your brand name is invisible to crawlers.',
        'On your homepage, add a text block in the first content section with an intro sentence: "At [Business Name], we help [customers] with [service/product]." Keep it natural.',
        'Go to Dashboard → Settings → General Info → confirm your "Business Name" field is filled in with the exact same name you use everywhere.',
        'Click Publish after all changes. Use Ctrl+F on your published page to search for your business name — it should appear at least 3 times.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'Shopify themes automatically include the viewport meta tag — this check failing on a Shopify store is unusual and usually indicates a theme customisation removed it.',
        'Go to Admin → Online Store → Themes → Edit code → find "theme.liquid".',
        'Search (Ctrl+F) for "viewport" in the file. If it is missing, add this line inside the <head> section:\n<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">',
        'If the viewport tag was there and this check still failed, it may be a timing issue with our scanner. Re-run the free scan to confirm.',
        'Contact Shopify Support if the issue persists — viewport is a core tag that should not be removable.',
      ],
      wix: [
        'Wix automatically adds the viewport meta tag to all pages — if this check failed, it is likely a Wix platform issue, not something you did.',
        'First, confirm your site is Published (not in draft mode) — click Publish in the Wix Editor.',
        'If published and the check still fails: go to Dashboard → Help → Contact Support and report that your viewport tag is missing. Wix Support can investigate platform-side.',
        'As a workaround: Dashboard → Settings → Advanced → Custom Code → add this in the Head section:\n<meta name="viewport" content="width=device-width, initial-scale=1">',
        'Re-run the scan after publishing to confirm.',
      ],
    },
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
    platformSteps: {
      shopify: [
        'Shopify automatically generates canonical tags for all pages — this is built into every theme. If the check failed, it likely means the scanner hit a redirect or timing issue.',
        'Verify by viewing your page source (Ctrl+U on your store URL) and searching for "canonical". You should see: <link rel="canonical" href="https://yourdomain.com/">',
        'If canonical is missing from your theme, go to Admin → Online Store → Themes → Edit code → open "theme.liquid" → search for "canonical". Add this before </head> if missing:\n<link rel="canonical" href="{{ canonical_url }}">',
        'For products accessible via multiple collection URLs (e.g. /collections/sale/products/shirt vs /collections/all/products/shirt), Shopify automatically handles canonicalisation using the primary product URL — no action needed.',
        'Re-run the free scan to confirm the tag is now detected.',
      ],
      wix: [
        'Wix automatically adds canonical tags to all published pages. If this check failed, ensure your site is Published (not in preview mode).',
        'Go to Dashboard → Marketing & SEO → SEO → SEO Tools. Under "Canonical URLs", confirm canonical tags are enabled for your site.',
        'If you have duplicate pages or URL variations: Dashboard → Marketing & SEO → SEO → "301 Redirects" — set up redirects from old/duplicate URLs to your canonical URLs.',
        'Verify by viewing page source on your published site and searching for "canonical". It should show your primary domain URL.',
        'If canonical is missing after all of this, contact Wix Support — canonical tags are a platform-managed feature in Wix.',
      ],
    },
    validate: 'View page source and search for "canonical". Confirm the tag appears pointing to your primary URL. Re-run this scan — the canonical check should turn green.',
    timeEstimate: '5–10 minutes',
  },

}
