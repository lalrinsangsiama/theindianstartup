-- Add index on Coupon code for faster lookups during validation
-- Using CONCURRENTLY to avoid locking the table

-- Note: CONCURRENTLY cannot be used inside a transaction block
-- This should be run separately if using migration tools that wrap in transactions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_coupon_code
ON "Coupon" (code);

-- Add comment for documentation
COMMENT ON INDEX idx_coupon_code IS 'Index on coupon code for faster validation lookups';
