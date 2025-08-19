-- Create Purchase table for The Indian Startup
-- This table tracks one-time purchases of products (like the 30-day guide)

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own purchases" ON "Purchase";
DROP POLICY IF EXISTS "Authenticated users can create purchases" ON "Purchase";
DROP POLICY IF EXISTS "Users can update own purchases" ON "Purchase";

-- Create table only if it doesn't exist
CREATE TABLE IF NOT EXISTS "Purchase" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  
  -- Product details
  "productType" TEXT DEFAULT '30_day_guide',
  "productName" TEXT DEFAULT '30-Day India Launch Sprint',
  
  -- Payment details
  amount INTEGER NOT NULL, -- Amount in paise
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL, -- pending, completed, failed, refunded
  
  -- Razorpay integration
  "razorpayOrderId" TEXT UNIQUE,
  "razorpayPaymentId" TEXT UNIQUE,
  "razorpaySignature" TEXT,
  "paymentMethod" TEXT,
  
  -- Access control
  "purchaseDate" TIMESTAMPTZ,
  "accessEndDate" TIMESTAMPTZ,
  "isActive" BOOLEAN DEFAULT true,
  
  -- GST/Tax
  "gstNumber" TEXT,
  "companyName" TEXT,
  "billingAddress" TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_user' 
    AND table_name = 'Purchase'
  ) THEN
    ALTER TABLE "Purchase" 
    ADD CONSTRAINT fk_user 
    FOREIGN KEY ("userId") 
    REFERENCES "User"(id) 
    ON DELETE CASCADE;
  END IF;
END $$;

-- Create indexes only if they don't exist
CREATE INDEX IF NOT EXISTS idx_purchase_user_id ON "Purchase"("userId");
CREATE INDEX IF NOT EXISTS idx_purchase_product_type ON "Purchase"("productType");
CREATE INDEX IF NOT EXISTS idx_purchase_status ON "Purchase"(status);
CREATE INDEX IF NOT EXISTS idx_purchase_access_end ON "Purchase"("accessEndDate");

-- Enable Row Level Security
ALTER TABLE "Purchase" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies with proper type casting
CREATE POLICY "Users can view own purchases" ON "Purchase"
  FOR SELECT 
  USING (auth.uid()::text = "userId");

CREATE POLICY "Authenticated users can create purchases" ON "Purchase"
  FOR INSERT 
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own purchases" ON "Purchase"
  FOR UPDATE 
  USING (auth.uid()::text = "userId");

-- Add service role policy for backend operations
CREATE POLICY "Service role has full access" ON "Purchase"
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS set_timestamp ON "Purchase";

-- Create or replace the timestamp function
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Purchase"
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Add comment
COMMENT ON TABLE "Purchase" IS 'Tracks one-time purchases for products like the 30-day startup guide';

-- Grant permissions
GRANT ALL ON "Purchase" TO authenticated;
GRANT ALL ON "Purchase" TO service_role;

-- Insert a test record (optional - comment out in production)
-- INSERT INTO "Purchase" (
--   "userId", 
--   "productType", 
--   "productName", 
--   amount, 
--   status,
--   "purchaseDate",
--   "accessEndDate"
-- ) VALUES (
--   'test-user-id',
--   '30_day_guide',
--   '30-Day India Launch Sprint - Test',
--   100,
--   'completed',
--   NOW(),
--   NOW() + INTERVAL '1 year'
-- );