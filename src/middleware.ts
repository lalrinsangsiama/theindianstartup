import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { SECURITY_HEADERS, logSecurityEvent } from '@/lib/security'
import { apiRateLimit, authRateLimit, paymentRateLimit } from '@/lib/rate-limit'

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://theindianstartup.in',
  'https://www.theindianstartup.in',
].filter(Boolean) as string[]

// Check if origin is localhost in development (any port)
function isLocalhostOrigin(origin: string | null): boolean {
  if (process.env.NODE_ENV !== 'development' || !origin) return false
  return /^http:\/\/localhost:\d+$/.test(origin)
}

// Create Supabase client for middleware with cookie handling
function createSupabaseMiddlewareClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Set cookie on request for subsequent middleware/server usage
          request.cookies.set({ name, value, ...options })
          // Set cookie on response to send back to browser
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// Check if user has a valid session by checking Supabase auth cookies
function hasAuthSession(request: NextRequest): boolean {
  // Supabase stores auth in cookies with the project ref
  // Look for any sb-*-auth-token cookie
  const cookies = request.cookies.getAll()
  const hasAuthToken = cookies.some(cookie =>
    cookie.name.includes('-auth-token') ||
    cookie.name.startsWith('sb-') && cookie.name.includes('auth')
  )
  return hasAuthToken
}

/**
 * SECURITY WARNING: This function extracts email from JWT WITHOUT signature verification.
 * It is ONLY used for UX optimization (early redirect of non-admins).
 *
 * NEVER use this for actual authorization decisions - all real auth happens server-side
 * via requireAdmin() which validates against the database role field.
 *
 * Returns null on ANY parsing error - FAIL CLOSED approach.
 */
function getUnverifiedEmailFromCookie(request: NextRequest): string | null {
  try {
    const cookies = request.cookies.getAll()
    const authCookie = cookies.find(cookie =>
      cookie.name.includes('-auth-token') && cookie.name.includes('base')
    )

    if (!authCookie?.value) {
      return null
    }

    const parts = authCookie.value.split('.')
    // Valid JWT must have exactly 3 parts
    if (parts.length !== 3) {
      return null
    }

    const payloadBase64 = parts[1]
    if (!payloadBase64) {
      return null
    }

    // Decode base64 (handle URL-safe base64)
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
    const payload = JSON.parse(payloadJson)

    // Strict validation: email must be a non-empty string with @
    if (typeof payload.email !== 'string' || !payload.email || !payload.email.includes('@')) {
      return null
    }

    return payload.email.toLowerCase().trim()
  } catch {
    // FAIL CLOSED: Any parsing error returns null, which triggers access denial
    return null
  }
}

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const pathname = request.nextUrl.pathname

  // CORS validation for API routes
  if (pathname.startsWith('/api/') && origin) {
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || isLocalhostOrigin(origin)
    if (!isAllowedOrigin) {
      logSecurityEvent({
        type: 'cors_violation',
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || undefined,
        details: `Blocked request from origin: ${origin} to ${pathname}`,
      })
      return new NextResponse(
        JSON.stringify({ error: 'CORS policy violation' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  // Create response with security headers
  const response = NextResponse.next()

  // H12 FIX: Add X-Request-ID for tracing requests across logs
  const requestId = crypto.randomUUID()
  response.headers.set('X-Request-ID', requestId)

  // Refresh Supabase session - this is crucial for PKCE flow and maintaining auth state
  // The getUser() call will refresh the session if needed and update cookies
  const supabase = createSupabaseMiddlewareClient(request, response)
  await supabase.auth.getUser()

  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Add CORS headers for allowed origins
  if (origin && (ALLOWED_ORIGINS.includes(origin) || isLocalhostOrigin(origin))) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }

  const clientIP = request.ip || 'unknown'

  // Rate limiting for API routes
  // IMPORTANT: Exclude webhook routes - they are protected by signature verification
  // and need to handle high volumes during payment events
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/webhooks/')) {
    const isAuthAPI = pathname.includes('/auth/') || pathname.includes('/login') || pathname.includes('/signup')
    const isPaymentAPI = pathname.includes('/purchase/') || pathname.includes('/payment/')

    // Select appropriate rate limiter
    let rateLimit = apiRateLimit
    if (isAuthAPI) {
      rateLimit = authRateLimit
    } else if (isPaymentAPI) {
      rateLimit = paymentRateLimit
    }

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

  // Check auth status using cookies (Edge-compatible)
  const isAuthenticated = hasAuthSession(request)

  // Define protected routes (onboarding removed - redirects to dashboard)
  const protectedRoutes = ['/dashboard', '/journey', '/portfolio', '/profile', '/community', '/resources', '/analytics', '/settings', '/help', '/admin', '/products']
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

  // Redirect /onboarding to /dashboard
  if (pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // NOTE: We no longer redirect authenticated users away from auth routes in middleware.
  // The pages themselves handle this check with proper session validation.
  // The hasAuthSession() check only looks for cookie presence, not validity,
  // which can cause redirect loops with expired sessions.

  // Special handling for admin routes - FAIL CLOSED
  if (pathname.startsWith('/admin')) {
    // Must be authenticated first
    if (!isAuthenticated) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // ========================================================================
    // SECURITY: MIDDLEWARE ADMIN CHECK IS UX OPTIMIZATION ONLY
    // ========================================================================
    // This check redirects non-admins early for better UX, but does NOT
    // provide security. The real authorization happens server-side via
    // requireAdmin() which validates against the database role field.
    //
    // Even if someone bypasses this middleware check, they will be blocked
    // by requireAdmin() at the API/page level.
    // ========================================================================

    const userEmail = getUnverifiedEmailFromCookie(request)
    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim().toLowerCase())
      : []

    // FAIL CLOSED: If we can't extract email, deny access at middleware level
    // User will see /unauthorized page, but even if bypassed, requireAdmin() blocks them
    if (!userEmail) {
      logSecurityEvent({
        type: 'admin_access_blocked',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        details: `[MIDDLEWARE] Admin access blocked - could not parse email from token for ${pathname}`,
      })
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // FAIL CLOSED: If email not in allowlist, deny access
    if (!adminEmails.includes(userEmail)) {
      logSecurityEvent({
        type: 'admin_access_denied',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        details: `[MIDDLEWARE] Non-admin email ${userEmail} attempted to access ${pathname}`,
      })
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // Middleware check passed, but real authorization happens at API/page level via requireAdmin()
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
