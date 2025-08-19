-- Create Purchase table for The Indian Startup
-- This table tracks one-time purchases of products (like the 30-day guide)

CREATE TABLE IF NOT EXISTS "Purchase" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
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
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  
  -- Foreign key
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_purchase_user_id ON "Purchase"("userId");
CREATE INDEX IF NOT EXISTS idx_purchase_product_type ON "Purchase"("productType");
CREATE INDEX IF NOT EXISTS idx_purchase_status ON "Purchase"(status);
CREATE INDEX IF NOT EXISTS idx_purchase_access_end ON "Purchase"("accessEndDate");

-- Enable Row Level Security
ALTER TABLE "Purchase" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON "Purchase"
  FOR SELECT USING (auth.uid()::text = "userId");

-- Only authenticated users can insert purchases (usually through API)
CREATE POLICY "Authenticated users can create purchases" ON "Purchase"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own purchases (for billing info)
CREATE POLICY "Users can update own purchases" ON "Purchase"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Purchase"
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Add comment
COMMENT ON TABLE "Purchase" IS 'Tracks one-time purchases for products like the 30-day startup guide';