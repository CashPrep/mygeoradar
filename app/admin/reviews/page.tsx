import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Star, AlertTriangle, CheckCircle } from 'lucide-react'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'
          }`}
        />
      ))}
    </div>
  )
}

export default async function AdminReviewsPage() {
  const supabase = await createClient()

  // Auth guard — redirects to login if not signed in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  const all = reviews || []
  const published = all.filter((r) => r.published)
  const flagged = all.filter((r) => !r.published)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Reviews Admin</h1>
        <p className="text-sm text-muted mb-8">
          All reviews are shown here. 4–5 star reviews are auto-published publicly. 1–3 star reviews are private (only you can see them).
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-border bg-white p-4 text-center">
            <p className="text-2xl font-black">{all.length}</p>
            <p className="text-xs text-muted mt-1">Total Reviews</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-2xl font-black text-green-700">{published.length}</p>
            <p className="text-xs text-green-600 mt-1">Published (4–5 ★)</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-2xl font-black text-red-700">{flagged.length}</p>
            <p className="text-xs text-red-600 mt-1">Private (1–3 ★)</p>
          </div>
        </div>

        {/* Bad reviews — only you see these */}
        {flagged.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h2 className="font-semibold text-red-700">Private Reviews (1–3 stars) — Not shown publicly</h2>
            </div>
            <div className="flex flex-col gap-3">
              {flagged.map((r) => (
                <div key={r.id} className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <StarRating rating={r.rating} />
                      <span className="font-semibold text-sm">{r.name}</span>
                      {r.email && <span className="text-xs text-muted">{r.email}</span>}
                    </div>
                    <span className="text-xs text-muted">
                      {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Published reviews */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h2 className="font-semibold text-green-700">Published Reviews (4–5 stars) — Shown publicly</h2>
          </div>
          {published.length === 0 ? (
            <p className="text-sm text-muted">No published reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {published.map((r) => (
                <div key={r.id} className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <StarRating rating={r.rating} />
                      <span className="font-semibold text-sm">{r.name}</span>
                      {r.email && <span className="text-xs text-muted">{r.email}</span>}
                    </div>
                    <span className="text-xs text-muted">
                      {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
