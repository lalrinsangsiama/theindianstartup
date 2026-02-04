import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
import { createAuditLog } from '@/lib/audit-log';
import { ADMIN_EMAIL_ALLOWLIST } from '@/lib/constants';

// Re-export for backwards compatibility (already exported from constants.ts)
export { ADMIN_EMAIL_ALLOWLIST } from '@/lib/constants';

// Valid roles for the system
export type UserRole = 'user' | 'admin' | 'support' | 'moderator';

// Roles that have admin access
const ADMIN_ROLES: UserRole[] = ['admin'];

export async function getUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Fetch full user profile from our User table
  const { data: profile } = await supabase
    .from('User')
    .select('*')
    .eq('id', user.id)
    .single();

  // Return profile if exists, otherwise return minimal user data from auth
  // This ensures authenticated users are recognized even if profile doesn't exist yet
  return profile || {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
  };
}

export async function getUserFromRequest(request: NextRequest) {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Check if current user has admin role
 * SECURITY: Requires BOTH database role='admin' AND email in allowlist (if allowlist is configured)
 * This fail-closed approach ensures no unauthorized admin access through DB tampering or email mismatch
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getUser();

  if (!user) {
    return false;
  }

  // FAIL CLOSED: Must have admin role in database
  const hasAdminRole = user.role && ADMIN_ROLES.includes(user.role as UserRole);
  if (!hasAdminRole) {
    return false;
  }

  // SECURITY: If email allowlist is configured, user's email must also be in it
  // This prevents unauthorized admin access if someone tampers with the database
  if (ADMIN_EMAIL_ALLOWLIST.length > 0) {
    const emailInAllowlist = ADMIN_EMAIL_ALLOWLIST.includes(user.email?.toLowerCase() || '');
    if (!emailInAllowlist) {
      logger.warn('Admin role found but email not in allowlist - access DENIED', {
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      return false;
    }
  }

  return true;
}

/**
 * Get the role of the current user
 */
export async function getUserRole(): Promise<UserRole | null> {
  const user = await getUser();
  if (!user) return null;
  return (user.role as UserRole) || 'user';
}

export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    throw new Error('Unauthorized - Please login');
  }

  return user;
}

/**
 * Require admin access - FAIL CLOSED with audit logging
 * SECURITY: Database role is the source of truth. Email allowlist is a secondary safeguard.
 * Access is DENIED if:
 * - User is not authenticated
 * - User profile is not found
 * - User does not have role='admin' in database
 * - Email allowlist is configured AND user's email is not in it
 */
export async function requireAdmin(options?: { ipAddress?: string }) {
  const supabase = createClient();
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

  // FAIL CLOSED: No authenticated user
  if (authError || !authUser) {
    await createAuditLog({
      eventType: 'security_event',
      action: 'admin_access_denied',
      details: {
        reason: 'not_authenticated',
        authError: authError?.message,
        ipAddress: options?.ipAddress,
      },
    });
    throw new Error('Authentication required');
  }

  // Fetch user profile with role - MUST succeed
  const { data: user, error: profileError } = await supabase
    .from('User')
    .select('id, email, role')
    .eq('id', authUser.id)
    .single();

  // FAIL CLOSED: Profile must exist
  if (profileError || !user) {
    await createAuditLog({
      eventType: 'security_event',
      userId: authUser.id,
      action: 'admin_access_denied',
      details: {
        reason: 'user_profile_not_found',
        profileError: profileError?.message,
        ipAddress: options?.ipAddress,
      },
    });
    throw new Error('User profile not found');
  }

  // FAIL CLOSED: Must have admin role in database (source of truth)
  const hasAdminRole = user.role && ADMIN_ROLES.includes(user.role as UserRole);
  if (!hasAdminRole) {
    await createAuditLog({
      eventType: 'security_event',
      userId: user.id,
      action: 'admin_access_denied',
      details: {
        reason: 'no_admin_role',
        userRole: user.role,
        email: user.email,
        ipAddress: options?.ipAddress,
      },
    });
    throw new Error('Admin access required');
  }

  // FAIL CLOSED: If email allowlist is configured, email must be in it
  // This prevents unauthorized access even if someone tampers with the database
  if (ADMIN_EMAIL_ALLOWLIST.length > 0) {
    const emailInAllowlist = ADMIN_EMAIL_ALLOWLIST.includes(user.email?.toLowerCase() || '');
    if (!emailInAllowlist) {
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: 'admin_access_denied',
        details: {
          reason: 'email_not_in_allowlist',
          userRole: user.role,
          email: user.email,
          ipAddress: options?.ipAddress,
        },
      });
      logger.error('SECURITY: Admin role found but email not in allowlist', {
        userId: user.id,
        email: user.email,
      });
      throw new Error('Admin access required');
    }
  }

  // Access granted - log for audit trail
  await createAuditLog({
    eventType: 'admin_action',
    userId: user.id,
    action: 'admin_access_granted',
    details: {
      email: user.email,
      ipAddress: options?.ipAddress,
    },
  });

  return user;
}

/**
 * Check admin status for a specific user ID (used by API routes)
 * SECURITY: Returns isAdmin=true ONLY if user has role='admin' AND (no allowlist OR email in allowlist)
 */
export async function checkAdminStatus(userId: string): Promise<{
  isAdmin: boolean;
  role: string | null;
}> {
  const supabase = createClient();

  const { data: user, error } = await supabase
    .from('User')
    .select('role, email')
    .eq('id', userId)
    .single();

  // FAIL CLOSED: No user found
  if (error || !user) {
    return { isAdmin: false, role: null };
  }

  // FAIL CLOSED: Must have admin role in database
  const hasAdminRole = user.role && ADMIN_ROLES.includes(user.role as UserRole);
  if (!hasAdminRole) {
    return { isAdmin: false, role: user.role || 'user' };
  }

  // FAIL CLOSED: If email allowlist is configured, email must be in it
  if (ADMIN_EMAIL_ALLOWLIST.length > 0) {
    const emailInAllowlist = ADMIN_EMAIL_ALLOWLIST.includes(user.email?.toLowerCase() || '');
    if (!emailInAllowlist) {
      logger.warn('checkAdminStatus: Admin role but email not in allowlist', {
        userId,
        email: user.email,
      });
      return { isAdmin: false, role: user.role || 'user' };
    }
  }

  return {
    isAdmin: true,
    role: user.role || 'user',
  };
}

export async function hasProductAccess(userId: string, productCode: string) {
  const supabase = createClient();

  try {
    // Check for direct product purchase or ALL_ACCESS bundle
    const { data: purchases, error } = await supabase
      .from('Purchase')
      .select('product:Product(*)')
      .eq('userId', userId)
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString());

    if (error) {
      logger.error('Error checking product access:', error);
      return false;
    }

    if (!purchases || purchases.length === 0) {
      return false;
    }

    // Check if user has direct access to the product or ALL_ACCESS bundle
    return purchases.some((purchase: any) => {
      const product = purchase.product;
      if (!product) return false;

      // Direct product access
      if (product.code === productCode) return true;

      // ALL_ACCESS bundle access - grants access to all products
      if (product.code === 'ALL_ACCESS' && product.isBundle) {
        return true;
      }

      return false;
    });
  } catch (error) {
    logger.error('Error checking product access:', error);
    return false;
  }
}

export async function requireProductAccess(productCode: string) {
  const user = await requireAuth();
  const hasAccess = await hasProductAccess(user.id, productCode);

  if (!hasAccess) {
    throw new Error(`Access required - Please purchase ${productCode} or upgrade to ALL_ACCESS bundle`);
  }

  return user;
}

// Backwards compatibility
export async function hasActiveAccess(userId: string, productType: string = 'P1') {
  return hasProductAccess(userId, productType);
}

export async function requireAccess(productType: string = 'P1') {
  return requireProductAccess(productType);
}

// Alias for compatibility
export const getCurrentUser = getUser;
export const auth = getUser;
