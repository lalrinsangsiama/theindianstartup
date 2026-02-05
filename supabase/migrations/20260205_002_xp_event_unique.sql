-- Unique constraint on XP events to prevent duplicate XP awards
-- This ensures both verify route and webhook cannot double-award XP for the same purchase

-- Create a unique partial index for product_purchase XP events
-- Uses COALESCE to handle NULL metadata gracefully
CREATE UNIQUE INDEX IF NOT EXISTS idx_xp_event_purchase_unique
ON "XPEvent" (
  "userId",
  type,
  (metadata->>'purchaseId')
)
WHERE type = 'product_purchase' AND metadata->>'purchaseId' IS NOT NULL;

-- Add comment for documentation
COMMENT ON INDEX idx_xp_event_purchase_unique IS 'Prevents duplicate XP awards for the same purchase. Applied to product_purchase type events only.';
