'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Radar, ExternalLink, LogOut, BarChart2 } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'
import type { User } from '@supabase/supabase-js'

type Scan = {
  id: string
  created_at: string
  business_name: string
  website: string
  overall_score: number | null
  level: string | null
  paid: boolean
}

function scoreColor(score: number | null) {
  if (!score) return 'text-muted'
  if (score >= 70) return 'text-green-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-red-400'
}

export function AccountClient({ user, scans }: { user: User; scans: Scan[] }) {
  const router   = useRouter()
  const supabase = createSupabaseBrowser()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-accent" />
            <span className="font-bold text-base tracking-tight">
              my<span className="text-accent">geo</span>radar
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">My scans</h1>
          <p className="text-sm text-muted mt-1">{user.email}</p>
        </div>

        {scans.length === 0 ? (
          <div className="text-center py-20">
            <BarChart2 className="w-10 h-10 text-muted mx-auto mb-4" />
            <p className="font-semibold mb-1">No scans yet</p>
            <p className="text-sm text-muted mb-6">Run your first AI visibility scan to see results here.</p>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              Run a scan
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {scans.map((scan) => (
              <Link
                key={scan.id}
                href={`/scan/${scan.id}`}
                className="group bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-accent/50 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{scan.business_name}</p>
                  <p className="text-xs text-muted truncate mt-0.5">{scan.website}</p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(scan.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  {scan.overall_score !== null && (
                    <div className="text-right">
                      <p className={clsx('text-xl font-bold', scoreColor(scan.overall_score))}>
                        {scan.overall_score}
                      </p>
                      <p className="text-xs text-muted">score</p>
                    </div>
                  )}
                  {scan.level && (
                    <Badge variant="neutral" className="hidden sm:block">{scan.level}</Badge>
                  )}
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
