import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnon)

export type Review = {
  id: string
  created_at: string
  name: string
  business_name: string | null
  business_type: string | null
  rating: number
  review_text: string
  website: string | null
  approved: boolean
}
