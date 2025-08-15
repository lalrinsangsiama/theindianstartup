import { createClient } from '@/lib/supabase/server';

// Admin email addresses
const ADMIN_EMAILS = [
  'admin@theindianstartup.in',
  'support@theindianstartup.in', // Your main email
];

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

export async function hasActiveSubscription() {
  const supabase = createClient();
  const user = await getUser();
  
  if (!user) {
    return false;
  }
  
  const { data: subscription } = await supabase
    .from('Subscription')
    .select('*')
    .eq('userId', user.id)
    .eq('status', 'active')
    .gt('expiryDate', new Date().toISOString())
    .single();
    
  return !!subscription;
}