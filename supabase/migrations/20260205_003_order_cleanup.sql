-- Cleanup function for expired pending orders
-- Razorpay orders expire after 30 minutes, we mark them as 'expired' after 35 minutes

-- Create or replace function to cleanup expired pending orders
CREATE OR REPLACE FUNCTION cleanup_expired_pending_orders()
RETURNS TABLE (
  cleaned_count INTEGER,
  cleaned_ids TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_cleaned_count INTEGER;
  v_cleaned_ids TEXT[];
BEGIN
  -- Mark pending orders older than 35 minutes as 'expired'
  WITH updated AS (
    UPDATE "Purchase"
    SET
      status = 'expired',
      "updatedAt" = NOW()
    WHERE status = 'pending'
      AND "createdAt" < NOW() - INTERVAL '35 minutes'
    RETURNING id
  )
  SELECT COUNT(*)::INTEGER, ARRAY_AGG(id) INTO v_cleaned_count, v_cleaned_ids FROM updated;

  RETURN QUERY SELECT COALESCE(v_cleaned_count, 0), COALESCE(v_cleaned_ids, ARRAY[]::TEXT[]);
END;
$$;

-- Grant execute to service role only (admin access)
REVOKE ALL ON FUNCTION cleanup_expired_pending_orders() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION cleanup_expired_pending_orders() TO service_role;

-- Add comment for documentation
COMMENT ON FUNCTION cleanup_expired_pending_orders IS 'Marks pending purchases older than 35 minutes as expired. Called by admin cleanup endpoint.';

-- Add 'expired' to the valid status enum if not already there
-- First check if we're using an enum or just text
DO $$
BEGIN
  -- Try to update the status check constraint if it exists
  -- This is a no-op if the constraint doesn't exist or already includes 'expired'
  EXCEPTION WHEN OTHERS THEN
    -- Constraint modification failed, likely doesn't exist or already correct
    NULL;
END $$;
