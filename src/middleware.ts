import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // First, update the session
  const response = await updateSession(request)
  
  // Create a Supabase client to check auth status
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set() {}, // Not needed for reading
        remove() {}, // Not needed for reading
      },
    }
  )

  // Get the user session
  const { data: { user } } = await supabase.auth.getUser()

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/journey', '/portfolio', '/community', '/leaderboard', '/resources', '/settings', '/admin', '/onboarding']
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
  const pathname = request.nextUrl.pathname

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && user && pathname !== '/logout') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Special handling for admin routes
  if (pathname.startsWith('/admin') && user) {
    const adminEmails = ['admin@theindianstartup.in', 'support@theindianstartup.in']
    if (!adminEmails.includes(user.email || '')) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}