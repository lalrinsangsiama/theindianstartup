-- Refund System Implementation
-- Priority: P0 - Critical
-- Date: 2026-02-02

-- 1. Add refund-related columns to Purchase table
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "refundStatus" TEXT DEFAULT 'none';
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "refundRequestedAt" TIMESTAMPTZ;
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "refundCompletedAt" TIMESTAMPTZ;
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "refundAmount" INTEGER;
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "refundReason" TEXT;
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "razorpayRefundId" TEXT;

-- Add check constraint for refund status values
ALTER TABLE "Purchase" DROP CONSTRAINT IF EXISTS purchase_refund_status_check;
ALTER TABLE "Purchase" ADD CONSTRAINT purchase_refund_status_check
  CHECK ("refundStatus" IN ('none', 'requested', 'processing', 'completed', 'denied'));

-- 2. Create RefundRequest table for detailed tracking
CREATE TABLE IF NOT EXISTS "RefundRequest" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "purchaseId" TEXT NOT NULL REFERENCES "Purchase"(id) ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,

  -- Request details
  reason TEXT NOT NULL,
  "additionalInfo" TEXT,
  status TEXT NOT NULL DEFAULT 'pending',

  -- Amount details
  "requestedAmount" INTEGER NOT NULL,
  "approvedAmount" INTEGER,

  -- Razorpay details
  "razorpayRefundId" TEXT,
  "razorpayRefundStatus" TEXT,

  -- Admin handling
  "reviewedBy" TEXT REFERENCES "User"(id),
  "reviewedAt" TIMESTAMPTZ,
  "adminNotes" TEXT,
  "denialReason" TEXT,

  -- Timestamps
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT refund_request_status_check
    CHECK (status IN ('pending', 'approved', 'processing', 'completed', 'denied', 'failed'))
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_refund_request_user ON "RefundRequest"("userId");
CREATE INDEX IF NOT EXISTS idx_refund_request_purchase ON "RefundRequest"("purchaseId");
CREATE INDEX IF NOT EXISTS idx_refund_request_status ON "RefundRequest"(status);
CREATE INDEX IF NOT EXISTS idx_purchase_refund_status ON "Purchase"("refundStatus");

-- 4. Enable RLS on RefundRequest table
ALTER TABLE "RefundRequest" ENABLE ROW LEVEL SECURITY;

-- Users can view their own refund requests
CREATE POLICY "Users can view own refund requests"
  ON "RefundRequest"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- Users can create refund requests for their own purchases
CREATE POLICY "Users can create refund requests"
  ON "RefundRequest"
  FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

-- Only admins can update refund requests
CREATE POLICY "Admins can manage refund requests"
  ON "RefundRequest"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "User"
      WHERE id = auth.uid()::text
      AND role = 'admin'
    )
  );

-- 5. Create function to check if purchase is eligible for refund
CREATE OR REPLACE FUNCTION is_purchase_refundable(purchase_id TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  purchase_record RECORD;
  refund_window_days INTEGER := 3; -- 3-day refund window
BEGIN
  SELECT * INTO purchase_record
  FROM "Purchase"
  WHERE id = purchase_id;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Check if already refunded
  IF purchase_record."refundStatus" IN ('completed', 'processing') THEN
    RETURN FALSE;
  END IF;

  -- Check if purchase is completed
  IF purchase_record.status != 'completed' THEN
    RETURN FALSE;
  END IF;

  -- Check if within refund window
  IF purchase_record."purchasedAt" < NOW() - (refund_window_days || ' days')::INTERVAL THEN
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- 6. Create trigger to update Purchase when refund status changes
CREATE OR REPLACE FUNCTION update_purchase_refund_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Purchase"
  SET
    "refundStatus" = NEW.status,
    "refundRequestedAt" = CASE
      WHEN NEW.status = 'pending' THEN NEW."createdAt"
      ELSE "refundRequestedAt"
    END,
    "refundCompletedAt" = CASE
      WHEN NEW.status = 'completed' THEN NOW()
      ELSE "refundCompletedAt"
    END,
    "refundAmount" = NEW."approvedAmount",
    "razorpayRefundId" = NEW."razorpayRefundId",
    "updatedAt" = NOW()
  WHERE id = NEW."purchaseId";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_purchase_refund ON "RefundRequest";
CREATE TRIGGER trigger_update_purchase_refund
  AFTER INSERT OR UPDATE ON "RefundRequest"
  FOR EACH ROW
  EXECUTE FUNCTION update_purchase_refund_status();

-- 7. Add comment for documentation
COMMENT ON TABLE "RefundRequest" IS 'Tracks refund requests for purchases with full audit trail';
COMMENT ON COLUMN "Purchase"."refundStatus" IS 'Refund status: none, requested, processing, completed, denied';
