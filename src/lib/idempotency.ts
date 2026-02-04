import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

interface IdempotencyResult {
  isNew: boolean;
  key?: string;
  existingResponse?: unknown;
}

/**
 * Generate a hash for the request to detect duplicate requests
 */
function generateRequestHash(userId: string, data: Record<string, unknown>): string {
  const payload = JSON.stringify({ userId, ...data });
  return crypto.createHash('sha256').update(payload).digest('hex');
}

/**
 * Check for existing idempotency key and return cached response if found
 * @param userId - The user ID
 * @param operation - The operation name (e.g., 'create-order')
 * @param requestData - The request data to hash
 * @returns Object with isNew flag and existing response if found
 */
export async function checkIdempotency(
  userId: string,
  operation: string,
  requestData: Record<string, unknown>
): Promise<IdempotencyResult> {
  const supabase = createClient();
  const requestHash = generateRequestHash(userId, { operation, ...requestData });

  // Check for existing non-expired key
  const { data: existing } = await supabase
    .from('IdempotencyKey')
    .select('id, response')
    .eq('userId', userId)
    .eq('requestHash', requestHash)
    .gt('expiresAt', new Date().toISOString())
    .single();

  if (existing?.response) {
    return {
      isNew: false,
      key: existing.id,
      existingResponse: existing.response
    };
  }

  // Create new idempotency key using UPSERT to prevent TOCTOU race condition
  const keyId = `${operation}_${userId}_${Date.now()}_${crypto.randomUUID()}`;
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  // Use upsert with ON CONFLICT to handle race conditions atomically
  // If another request created the same key, we'll update it with our keyId
  // but the response will remain null (indicating in-progress)
  const { data: upserted, error } = await supabase
    .from('IdempotencyKey')
    .upsert(
      {
        id: keyId,
        userId,
        requestHash,
        expiresAt: expiresAt.toISOString(),
        // response is intentionally not set - will be updated later
      },
      {
        onConflict: 'userId,requestHash',
        ignoreDuplicates: false,
      }
    )
    .select('id, response')
    .single();

  if (error) {
    // If upsert fails, do a final check for existing key
    const { data: existingKey } = await supabase
      .from('IdempotencyKey')
      .select('id, response')
      .eq('userId', userId)
      .eq('requestHash', requestHash)
      .gt('expiresAt', new Date().toISOString())
      .single();

    if (existingKey?.response) {
      return {
        isNew: false,
        key: existingKey.id,
        existingResponse: existingKey.response
      };
    }

    // No existing key with response found, treat as new
    return {
      isNew: true,
      key: keyId
    };
  }

  // Check if the upserted record has a response (from concurrent request)
  if (upserted?.response) {
    return {
      isNew: false,
      key: upserted.id,
      existingResponse: upserted.response
    };
  }

  return {
    isNew: true,
    key: upserted?.id || keyId
  };
}

/**
 * Store the response for an idempotency key
 * @param key - The idempotency key ID
 * @param response - The response to cache
 */
export async function storeIdempotencyResponse(
  key: string,
  response: unknown
): Promise<void> {
  const supabase = createClient();

  await supabase
    .from('IdempotencyKey')
    .update({ response })
    .eq('id', key);
}

/**
 * Check for pending orders for the same product
 * Returns the existing pending order if found
 */
export async function checkPendingOrder(
  userId: string,
  productCode: string
): Promise<{ hasPending: boolean; pendingOrder?: Record<string, unknown> }> {
  const supabase = createClient();

  // Check for pending orders in the last 30 minutes
  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

  const { data: pendingOrders } = await supabase
    .from('Purchase')
    .select('*, product:Product(*)')
    .eq('userId', userId)
    .eq('status', 'pending')
    .gte('createdAt', thirtyMinutesAgo.toISOString())
    .order('createdAt', { ascending: false });

  if (pendingOrders && pendingOrders.length > 0) {
    // Find pending order for same product
    const pendingForProduct = pendingOrders.find(
      order => order.product?.code === productCode
    );

    if (pendingForProduct) {
      return {
        hasPending: true,
        pendingOrder: {
          orderId: pendingForProduct.razorpayOrderId,
          amount: pendingForProduct.amount,
          currency: 'INR',
          productName: pendingForProduct.product?.title,
          purchaseId: pendingForProduct.id,
          existingOrder: true
        }
      };
    }
  }

  return { hasPending: false };
}
