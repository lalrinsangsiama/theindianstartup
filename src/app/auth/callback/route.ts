import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';
  const type = requestUrl.searchParams.get('type');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // Handle errors from Supabase
  if (error) {
    const errorMessage = encodeURIComponent(errorDescription || error);
    return NextResponse.redirect(
      new URL(`/auth/error?message=${errorMessage}`, requestUrl.origin)
    );
  }

  // If no code, redirect to the error page
  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/error?message=No%20verification%20code%20found', requestUrl.origin)
    );
  }

  // Determine redirect path based on type
  let redirectPath = '/dashboard';

  switch (type) {
    case 'signup':
      redirectPath = '/dashboard';
      break;
    case 'recovery':
      redirectPath = '/reset-password';
      break;
    case 'email':
    case 'email_change':
      redirectPath = '/dashboard?emailVerified=true';
      break;
    case 'invite':
      redirectPath = '/dashboard';
      break;
    default:
      // Use the 'next' parameter if provided
      if (next && next.startsWith('/') && !next.startsWith('//')) {
        redirectPath = next;
      }
  }

  // Create the redirect response first so we can attach cookies to it
  const redirectUrl = new URL(redirectPath, requestUrl.origin);
  const response = NextResponse.redirect(redirectUrl);

  // Create Supabase client that sets cookies on the response
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set cookie on the response
          response.cookies.set({
            name,
            value,
            ...options,
            // Ensure secure settings for production
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
            path: '/',
          });
        },
      },
    }
  );

  // Exchange the code for a session
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error('Code exchange error:', exchangeError);
    const errorMessage = encodeURIComponent(exchangeError.message);
    return NextResponse.redirect(
      new URL(`/auth/error?message=${errorMessage}`, requestUrl.origin)
    );
  }

  return response;
}
