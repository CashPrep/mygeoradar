import Link from 'next/link';
import type { PlatformGuide } from '@/lib/guides/types';

const tierConfig = {
  green: {
    label: '✅ Easy Win',
    bg: 'bg-emerald-50 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  yellow: {
    label: '🟡 Requires App/Plugin',
    bg: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-400',
  },
  red: {
    label: '🔴 Needs Developer',
    bg: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
};

const scoreLabel = (score: number) => {
  if (score >= 8) return { text: 'Highly Capable', color: 'text-emerald-600' };
  if (score >= 6) return { text: 'Capable', color: 'text-amber-600' };
  if (score >= 4) return { text: 'Limited', color: 'text-orange-600' };
  return { text: 'Very Limited', color: 'text-red-600' };
};

export default function GuidePageTemplate({ guide }: { guide: PlatformGuide }) {
  const score = scoreLabel(guide.geoScore);
  const tableOfContents = [
    ...guide.sections.map((s) => ({ id: s.id, label: s.title })),
    { id: 'cannot-do', label: 'What You Cannot Do' },
    { id: 'recommended-apps', label: 'Recommended Apps & Plugins' },
    { id: 'migration', label: 'Should I Migrate?' },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* ── TOP STICKY SCAN BANNER ── */}
      <div className="sticky top-0 z-50 bg-blue-600 text-white px-4 py-2.5 flex items-center justify-between gap-3 shadow-md">
        <p className="text-sm font-medium leading-tight">
          Came from your scan? Fix one issue here, then unlock your full report to see everything else.
        </p>
        <Link
          href="/scan"
          className="shrink-0 bg-white text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          Back to Scan →
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 text-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href="/guides" className="text-slate-400 hover:text-white text-sm transition-colors">
              ← All Platform Guides
            </Link>
          </div>
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-2">Platform GEO Guide</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">{guide.platform} GEO Guide</h1>
              <p className="text-slate-300 text-lg max-w-2xl">{guide.tagline}</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-5 text-center min-w-[140px]">
              <div className="text-5xl font-bold mb-1">{guide.geoScore}<span className="text-2xl text-slate-400">/10</span></div>
              <div className={`text-sm font-semibold ${score.color}`}>{score.text}</div>
              <div className="text-slate-500 text-xs mt-1">GEO Capability</div>
            </div>
          </div>
          {/* Tier legend */}
          <div className="flex flex-wrap gap-3 mt-8">
            {Object.entries(tierConfig).map(([key, val]) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full">
                <span className={`w-2 h-2 rounded-full ${val.dot}`} />
                {val.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sticky TOC */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">On this page</p>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-slate-600 hover:text-blue-600 py-1 border-l-2 border-transparent hover:border-blue-500 pl-3 transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs font-semibold text-blue-900 mb-2">Run your GEO audit</p>
                <p className="text-xs text-blue-700 mb-3">See exactly where your site shows up in AI answers.</p>
                <Link
                  href="/"
                  className="block text-center text-xs font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Free Scan
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="flex-1 min-w-0">
            <p className="text-slate-600 text-base leading-relaxed mb-10">{guide.description}</p>

            {/* Sections — inject mid-article CTA after index 2 (step 3) */}
            {guide.sections.map((section, index) => {
              const t = tierConfig[section.tier];
              return (
                <>
                  <section key={section.id} id={section.id} className={`mb-10 rounded-2xl border p-6 ${t.bg}`}>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                      <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${t.badge}`}>{t.label}</span>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${t.dot}`} />
                          <div>
                            <span className="font-semibold text-slate-800 text-sm">{item.label}: </span>
                            <span className="text-slate-600 text-sm">{item.detail}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {section.codeSnippet && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Code Example</p>
                        <pre className="bg-slate-900 text-green-400 text-xs rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
                          <code>{section.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </section>

                  {/* ── MID-ARTICLE SCANNER CTA (after step 3, index 2) ── */}
                  {index === 2 && (
                    <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900 mb-1">Not sure this applies to you?</p>
                        <p className="text-sm text-slate-600">Run your site through the GEO scanner for a personalized pass/fail list.</p>
                      </div>
                      <Link
                        href="/scan"
                        className="shrink-0 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        Scan My Site →
                      </Link>
                    </div>
                  )}
                </>
              );
            })}

            {/* Cannot Do */}
            <section id="cannot-do" className="mb-10 rounded-2xl border border-red-200 bg-red-50 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">🚫 What You Cannot Do Without a Developer or Migration</h2>
              <p className="text-sm text-slate-600 mb-4">These are hard platform ceilings. No workaround exists without either hiring a developer or moving to a different platform.</p>
              <ul className="space-y-2">
                {guide.cannotDo.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-red-500 font-bold shrink-0">✗</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recommended Apps */}
            <section id="recommended-apps" className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-2">🧩 Recommended Apps & Plugins</h2>
              <p className="text-sm text-slate-500 mb-5">These tools fill the gaps that {guide.platform} doesn&apos;t cover natively for GEO.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {guide.recommendedApps.map((app, i) => (
                  <a
                    key={i}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{app.name}</span>
                      {app.free && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Free tier</span>}
                    </div>
                    <p className="text-xs text-slate-500">{app.description}</p>
                  </a>
                ))}
              </div>
            </section>

            {/* Migration Framework */}
            <section id="migration" className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-2">🧭 Should I Migrate Off {guide.platform}?</h2>
              <p className="text-sm text-slate-500 mb-5">Use this framework to decide whether staying on {guide.platform} is fine for your GEO goals or whether it&apos;s a real ceiling.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left p-3 font-semibold text-slate-700 rounded-tl-lg">Your Situation</th>
                      <th className="text-left p-3 font-semibold text-slate-700">Verdict</th>
                      <th className="text-left p-3 font-semibold text-slate-700 rounded-tr-lg">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guide.migrationFramework.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-3 text-slate-700 border-b border-slate-100">{row.situation}</td>
                        <td className="p-3 font-semibold border-b border-slate-100">
                          <span className={row.verdict === 'Stay' ? 'text-emerald-600' : row.verdict === 'Consider migrating' ? 'text-amber-600' : 'text-red-600'}>
                            {row.verdict}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 border-b border-slate-100">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── BOTTOM PAID CTA ── */}
            <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Your Next Steps</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Step 1: Fix this. &nbsp;Step 2: Confirm your improvements with a full GEO scan.
                  </h3>
                  <p className="text-sm text-slate-600">
                    Get your complete {guide.platform} GEO report — every signal scored, every gap flagged, with a prioritized fix list.
                  </p>
                </div>
                <Link
                  href="/checkout"
                  className="shrink-0 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm whitespace-nowrap shadow-sm"
                >
                  Get Full Report →
                </Link>
              </div>
            </div>

            {/* Free scan CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 text-center">
              <h3 className="text-xl font-bold mb-2">See how your {guide.platform} site scores in AI search</h3>
              <p className="text-blue-100 text-sm mb-5">myGEOradar scans ChatGPT, Perplexity, Gemini & Claude and shows you exactly where you&apos;re missing visibility.</p>
              <Link
                href="/"
                className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
              >
                Run Your Free GEO Scan →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
