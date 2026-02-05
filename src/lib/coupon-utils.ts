import { createClient } from '@/lib/supabase/server';

import { logger } from '@/lib/logger';
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
      logger.info('User already has a first purchase coupon');
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
      logger.error('Failed to create coupon:', error);
      return null;
    }
    
    return coupon;
  } catch (error) {
    logger.error('Error creating first purchase coupon:', error);
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
    logger.error('Error validating coupon:', error);
    return { valid: false, error: 'Failed to validate coupon' };
  }
}

/**
 * Error thrown when coupon marking fails
 */
export class CouponMarkingError extends Error {
  constructor(message: string, public readonly couponId: string) {
    super(message);
    this.name = 'CouponMarkingError';
  }
}

/**
 * Mark a coupon as used with atomic increment
 * Uses RPC for atomic operation, falls back to select+update pattern
 * @throws {CouponMarkingError} if coupon cannot be marked as used
 */
export async function markCouponAsUsed(couponId: string, purchaseId: string): Promise<void> {
  const supabase = createClient();

  // Try atomic increment via RPC first (preferred)
  const { data: rpcResult, error: rpcError } = await supabase.rpc('increment_coupon_usage', {
    coupon_id: couponId,
    purchase_id: purchaseId
  });

  // RPC succeeded and returned true
  if (!rpcError && rpcResult === true) {
    return;
  }

  // RPC returned false (coupon at max uses or not found)
  if (!rpcError && rpcResult === false) {
    throw new CouponMarkingError('Coupon has already been fully used', couponId);
  }

  // RPC doesn't exist yet, fall back to select+update pattern
  if (rpcError?.code === 'PGRST202') {
    // Get current count first
    const { data: coupon, error: fetchError } = await supabase
      .from('Coupon')
      .select('usedCount, maxUses')
      .eq('id', couponId)
      .single();

    if (fetchError || !coupon) {
      logger.error('Failed to fetch coupon for update:', fetchError);
      throw new CouponMarkingError('Coupon not found', couponId);
    }

    // Check if coupon can still be used
    if (coupon.usedCount >= coupon.maxUses) {
      throw new CouponMarkingError('Coupon has already been fully used', couponId);
    }

    // Atomic conditional update: only update if usedCount hasn't changed
    const newUsedCount = (coupon.usedCount || 0) + 1;
    const { data: updated, error: updateError } = await supabase
      .from('Coupon')
      .update({
        usedCount: newUsedCount,
        usedAt: new Date().toISOString(),
        usedForPurchase: purchaseId,
        updatedAt: new Date().toISOString()
      })
      .eq('id', couponId)
      .eq('usedCount', coupon.usedCount) // Optimistic lock
      .select('id')
      .single();

    if (updateError || !updated) {
      // Race condition: another request updated the coupon
      logger.warn('Coupon update race condition', { couponId, error: updateError });
      throw new CouponMarkingError('Coupon usage conflict - please try again', couponId);
    }

    return;
  }

  // Other RPC error
  logger.error('Error marking coupon as used:', rpcError);
  throw new CouponMarkingError('Failed to mark coupon as used', couponId);
}