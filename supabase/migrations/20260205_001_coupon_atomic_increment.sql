-- Atomic coupon usage increment with row-level locking
-- Prevents race condition where coupons can be used beyond max limit

-- Create or replace function for atomic coupon increment
CREATE OR REPLACE FUNCTION increment_coupon_usage(
  coupon_id TEXT,
  purchase_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_coupon RECORD;
  v_new_count INTEGER;
BEGIN
  -- Lock the coupon row for update to prevent concurrent modifications
  SELECT id, "usedCount", "maxUses"
  INTO v_coupon
  FROM "Coupon"
  WHERE id = coupon_id
  FOR UPDATE;

  -- If coupon not found, return false
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Check if coupon is already at max uses
  IF v_coupon."usedCount" >= v_coupon."maxUses" THEN
    RETURN FALSE;
  END IF;

  -- Increment the usage count atomically
  v_new_count := COALESCE(v_coupon."usedCount", 0) + 1;

  -- Update the coupon
  UPDATE "Coupon"
  SET
    "usedCount" = v_new_count,
    "usedAt" = NOW(),
    "usedForPurchase" = purchase_id,
    "updatedAt" = NOW()
  WHERE id = coupon_id;

  RETURN TRUE;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_coupon_usage(TEXT, TEXT) TO authenticated;

-- Add comment for documentation
COMMENT ON FUNCTION increment_coupon_usage IS 'Atomically increments coupon usage count with row-level locking to prevent race conditions. Returns FALSE if coupon not found or already at max uses.';
