import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazily instantiate the Supabase client so importing this module never
// throws when VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are missing
// (for example in preview builds or local development without a .env file).
// Callers already wrap their queries in try/catch, so a missing-config
// error surfaces as a fetch failure on the specific page, not as a
// module-load crash that prevents the rest of the app from rendering.
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (client) return client

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  client = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')
  return client
}

// Backwards-compatible `supabase` proxy so existing `supabase.from(...)`
// call sites keep working without any per-call changes.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, _receiver) {
    return Reflect.get(getSupabase(), prop)
  },
})
