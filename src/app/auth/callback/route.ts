import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/onboarding';
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

  // Create Supabase client with cookie handling for route handler
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options?: Record<string, unknown>) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options?: Record<string, unknown>) {
          cookieStore.set({ name, value: '', ...options });
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

  // Determine redirect based on type
  let redirectPath = '/onboarding';

  switch (type) {
    case 'signup':
      redirectPath = '/onboarding';
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
      // Use the 'next' parameter if provided, otherwise default to onboarding
      // Validate it's an internal path to prevent open redirect
      if (next && next.startsWith('/') && !next.startsWith('//')) {
        redirectPath = next;
      }
  }

  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin));
}
