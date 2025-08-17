import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { SECURITY_HEADERS, logSecurityEvent } from '@/lib/security'
import { apiRateLimit, authRateLimit } from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  // Apply security headers
  const response = await updateSession(request)
  
  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  const pathname = request.nextUrl.pathname
  const clientIP = request.ip || 'unknown'
  
  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const isAuthAPI = pathname.includes('/auth/') || pathname.includes('/login') || pathname.includes('/signup')
    const rateLimit = isAuthAPI ? authRateLimit : apiRateLimit
    
    const rateLimitResult = rateLimit(request)
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString())
    
    if (!rateLimitResult.success) {
      logSecurityEvent({
        type: 'rate_limit',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        details: `Rate limit exceeded for ${pathname}`,
      })
      
      return new NextResponse(
        JSON.stringify({ error: 'Rate limit exceeded', retryAfter: rateLimitResult.resetTime }),
        { 
          status: 429, 
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            ...Object.fromEntries(response.headers.entries()),
          }
        }
      )
    }
  }
  
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