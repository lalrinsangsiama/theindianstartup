import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
import { createAuditLog } from '@/lib/audit-log';

// Valid roles for the system
export type UserRole = 'user' | 'admin' | 'support' | 'moderator';

// Roles that have admin access
const ADMIN_ROLES: UserRole[] = ['admin'];

// Fallback admin emails (only used if role column doesn't exist yet)
const FALLBACK_ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim())
  : [];

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

  return profile;
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
 * Uses database role field, falls back to email list for backwards compatibility
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getUser();

  if (!user) {
    return false;
  }

  // Primary check: database role field
  if (user.role && ADMIN_ROLES.includes(user.role as UserRole)) {
    return true;
  }

  // Fallback: email-based check (for migration period)
  if (FALLBACK_ADMIN_EMAILS.includes(user.email)) {
    logger.warn('Admin access via email fallback - migrate to role field', {
      userId: user.id,
      email: user.email,
    });
    return true;
  }

  return false;
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
 * Require admin access - fails closed with audit logging
 */
export async function requireAdmin(options?: { ipAddress?: string }) {
  const supabase = createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  // No authenticated user
  if (!authUser) {
    await createAuditLog({
      eventType: 'security_event',
      action: 'admin_access_denied',
      details: {
        reason: 'not_authenticated',
        ipAddress: options?.ipAddress,
      },
    });
    throw new Error('Authentication required');
  }

  // Fetch user profile with role
  const { data: user } = await supabase
    .from('User')
    .select('id, email, role')
    .eq('id', authUser.id)
    .single();

  if (!user) {
    await createAuditLog({
      eventType: 'security_event',
      userId: authUser.id,
      action: 'admin_access_denied',
      details: {
        reason: 'user_profile_not_found',
        ipAddress: options?.ipAddress,
      },
    });
    throw new Error('User profile not found');
  }

  // Check role-based admin access
  const hasAdminRole = user.role && ADMIN_ROLES.includes(user.role as UserRole);
  const hasAdminEmail = FALLBACK_ADMIN_EMAILS.includes(user.email);

  if (!hasAdminRole && !hasAdminEmail) {
    await createAuditLog({
      eventType: 'security_event',
      userId: user.id,
      action: 'admin_access_denied',
      details: {
        reason: 'insufficient_role',
        userRole: user.role,
        email: user.email,
        ipAddress: options?.ipAddress,
      },
    });
    throw new Error('Admin access required');
  }

  // Log successful admin access (for audit trail)
  if (hasAdminEmail && !hasAdminRole) {
    logger.warn('Admin access via email fallback', {
      userId: user.id,
      email: user.email,
    });
  }

  return user;
}

/**
 * Check admin status for a specific user ID (used by API routes)
 */
export async function checkAdminStatus(userId: string): Promise<{
  isAdmin: boolean;
  role: string | null;
}> {
  const supabase = createClient();

  const { data: user } = await supabase
    .from('User')
    .select('role, email')
    .eq('id', userId)
    .single();

  if (!user) {
    return { isAdmin: false, role: null };
  }

  const hasAdminRole = user.role && ADMIN_ROLES.includes(user.role as UserRole);
  const hasAdminEmail = FALLBACK_ADMIN_EMAILS.includes(user.email);

  return {
    isAdmin: hasAdminRole || hasAdminEmail,
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
