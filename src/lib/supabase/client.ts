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
        // Persist session across browser sessions
        persistSession: true,
        // Use PKCE flow for better security
        flowType: 'pkce',
      },
      // Let @supabase/ssr handle cookie storage automatically
      // This ensures PKCE code verifier is stored in cookies, not localStorage
    }
  )
}