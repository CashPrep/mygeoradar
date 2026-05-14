import { createClient } from '@supabase/supabase-js'

// Service-role client — server-side only. Never expose to the browser.
// Use this ONLY in API routes and server actions, never in components.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
