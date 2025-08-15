import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Enable auto-refresh of sessions
        autoRefreshToken: true,
        // Detect session from URL (for OAuth and magic links)
        detectSessionInUrl: true,
        // Default storage is localStorage which persists across browser sessions
        // Session will be cleared based on the persistSession option during login
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      }
    }
  )
}