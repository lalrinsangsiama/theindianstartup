import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAuditLog } from '@/lib/audit-log';

// Valid admin roles
const ADMIN_ROLES = ['admin'];

// Fallback admin emails (for migration period)
const FALLBACK_ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim())
  : [];

/**
 * Verify if the current user has admin access
 * Used by middleware to gate admin routes
 * Returns 200 if admin, 401 if not authenticated, 403 if not admin
 */
export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    // Not authenticated
    if (authError || !authUser) {
      return new NextResponse(null, { status: 401 });
    }

    // Fetch user profile with role
    const { data: user, error: profileError } = await supabase
      .from('User')
      .select('id, email, role')
      .eq('id', authUser.id)
      .single();

    // User profile not found
    if (profileError || !user) {
      await createAuditLog({
        eventType: 'security_event',
        userId: authUser.id,
        action: 'admin_verify_failed',
        details: { reason: 'profile_not_found' },
      });
      return new NextResponse(null, { status: 403 });
    }

    // Check admin access
    const hasAdminRole = user.role && ADMIN_ROLES.includes(user.role);
    const hasAdminEmail = FALLBACK_ADMIN_EMAILS.includes(user.email);

    if (!hasAdminRole && !hasAdminEmail) {
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: 'admin_verify_denied',
        details: {
          reason: 'insufficient_role',
          role: user.role,
        },
      });
      return new NextResponse(null, { status: 403 });
    }

    // Admin access verified
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // Fail closed on any error
    return new NextResponse(null, { status: 500 });
  }
}
