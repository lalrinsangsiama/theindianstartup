import { createClient } from '@/lib/supabase/server';

/**
 * Generate a unique coupon code for a user
 * Format: TIS-{USERNAME}-{RANDOM}
 */
export function generateCouponCode(userName: string): string {
  const cleanName = userName
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .substring(0, 8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TIS-${cleanName}-${random}`;
}

/**
 * Create a coupon for a user after their first purchase
 */
export async function createFirstPurchaseCoupon(userId: string, userName: string) {
  try {
    const supabase = createClient();
    
    // Check if user already has a coupon
    const { data: existingCoupon } = await supabase
      .from('Coupon')
      .select('id')
      .eq('userId', userId)
      .eq('description', '10% off your next course')
      .single();
    
    if (existingCoupon) {
      console.log('User already has a first purchase coupon');
      return null;
    }
    
    // Generate unique coupon code
    let couponCode = generateCouponCode(userName);
    let attempts = 0;
    
    // Ensure code is unique
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from('Coupon')
        .select('id')
        .eq('code', couponCode)
        .single();
      
      if (!existing) break;
      
      couponCode = generateCouponCode(userName + attempts);
      attempts++;
    }
    
    // Create expiry date (6 months from now)
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + 6);
    
    // Create the coupon
    const { data: coupon, error } = await supabase
      .from('Coupon')
      .insert({
        code: couponCode,
        userId,
        discountPercent: 10,
        description: '10% off your next course',
        maxUses: 1,
        validUntil: validUntil.toISOString(),
        excludedProducts: ['ALL_ACCESS'] // Cannot be used for bundle
      })
      .select()
      .single();
    
    if (error) {
      console.error('Failed to create coupon:', error);
      return null;
    }
    
    return coupon;
  } catch (error) {
    console.error('Error creating first purchase coupon:', error);
    return null;
  }
}

/**
 * Validate and apply a coupon
 */
export async function validateCoupon(
  couponCode: string, 
  userId: string, 
  productCode: string,
  originalAmount: number
): Promise<{
  valid: boolean;
  discountAmount?: number;
  finalAmount?: number;
  coupon?: any;
  error?: string;
}> {
  try {
    const supabase = createClient();
    
    // Get the coupon
    const { data: coupon, error } = await supabase
      .from('Coupon')
      .select('*')
      .eq('code', couponCode)
      .single();
    
    if (error || !coupon) {
      return { valid: false, error: 'Invalid coupon code' };
    }
    
    // Check if coupon belongs to the user
    if (coupon.userId !== userId) {
      return { valid: false, error: 'This coupon is not valid for your account' };
    }
    
    // Check if coupon is already used
    if (coupon.usedCount >= coupon.maxUses) {
      return { valid: false, error: 'This coupon has already been used' };
    }
    
    // Check validity dates
    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validUntil = new Date(coupon.validUntil);
    
    if (now < validFrom || now > validUntil) {
      return { valid: false, error: 'This coupon has expired' };
    }
    
    // Check product restrictions
    if (coupon.excludedProducts.includes(productCode)) {
      return { valid: false, error: 'This coupon cannot be used for this product' };
    }
    
    if (coupon.applicableProducts.length > 0 && !coupon.applicableProducts.includes(productCode)) {
      return { valid: false, error: 'This coupon is not valid for this product' };
    }
    
    // Calculate discount
    const discountAmount = Math.floor(originalAmount * (coupon.discountPercent / 100));
    const finalAmount = originalAmount - discountAmount;
    
    return {
      valid: true,
      discountAmount,
      finalAmount,
      coupon
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { valid: false, error: 'Failed to validate coupon' };
  }
}

/**
 * Mark a coupon as used
 */
export async function markCouponAsUsed(couponId: string, purchaseId: string) {
  try {
    const supabase = createClient();
    
    await supabase
      .from('Coupon')
      .update({
        usedCount: 1,
        usedAt: new Date().toISOString(),
        usedForPurchase: purchaseId
      })
      .eq('id', couponId);
    
    return true;
  } catch (error) {
    console.error('Error marking coupon as used:', error);
    return false;
  }
}