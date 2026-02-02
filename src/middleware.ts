import { type NextRequest, NextResponse } from 'next/server'
import { SECURITY_HEADERS, logSecurityEvent } from '@/lib/security'
import { apiRateLimit, authRateLimit, paymentRateLimit } from '@/lib/rate-limit'

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://theindianstartup.in',
  'https://www.theindianstartup.in',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean) as string[]

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
    if (!ALLOWED_ORIGINS.includes(origin)) {
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

  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Add CORS headers for allowed origins
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
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

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/journey', '/portfolio', '/profile', '/community', '/resources', '/analytics', '/settings', '/help', '/admin', '/onboarding', '/products']
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

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

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && isAuthenticated && pathname !== '/logout') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

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
