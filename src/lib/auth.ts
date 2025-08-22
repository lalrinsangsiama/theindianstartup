import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
// Admin email addresses from environment variable
// Format: ADMIN_EMAILS="email1@example.com,email2@example.com"
const ADMIN_EMAILS = process.env.ADMIN_EMAILS
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

export async function isAdmin() {
  const user = await getUser();
  
  if (!user) {
    return false;
  }
  
  return ADMIN_EMAILS.includes(user.email);
}

export async function requireAuth() {
  const user = await getUser();
  
  if (!user) {
    throw new Error('Unauthorized - Please login');
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  const adminStatus = await isAdmin();
  
  if (!adminStatus) {
    throw new Error('Unauthorized - Admin access required');
  }
  
  return user;
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
      
      // ALL_ACCESS bundle access
      if (product.code === 'ALL_ACCESS' && product.isBundle) {
        return product.bundleProducts?.includes(productCode) || true; // ALL_ACCESS includes all products
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

// NextAuth compatibility - for legacy routes that still use getServerSession
export const authOptions = {
  providers: [],
  callbacks: {
    session: async ({ session, token }: any) => {
      // This is a placeholder - actual auth is handled by Supabase
      // Use token if needed for future implementation
      if (token) {
        session.token = token;
      }
      return session;
    }
  }
};

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

