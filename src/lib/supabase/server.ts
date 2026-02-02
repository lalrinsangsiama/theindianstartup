import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options?: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options?: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Create a getter that returns a fresh client each time
// This allows `supabase.from(...)` syntax while ensuring fresh cookies
export const supabase = {
  from: (table: string) => createClient().from(table),
  auth: {
    getUser: () => createClient().auth.getUser(),
    getSession: () => createClient().auth.getSession(),
    signOut: () => createClient().auth.signOut(),
  },
  rpc: (fn: string, args?: Record<string, unknown>) => createClient().rpc(fn, args),
  storage: {
    from: (bucket: string) => createClient().storage.from(bucket),
  },
};