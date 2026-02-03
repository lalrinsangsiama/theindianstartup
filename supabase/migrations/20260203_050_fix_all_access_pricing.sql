-- Migration: Fix ALL_ACCESS bundle pricing and description
-- Date: 2026-02-03
-- Description: Update ALL_ACCESS bundle to correct price (₹1,49,999) with full description and value breakdown

-- First, ensure the Product table has the originalPrice column
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "originalPrice" INTEGER;

-- Update ALL_ACCESS bundle with complete information
UPDATE "Product"
SET
  title = 'All-Access Mastermind Bundle',
  description = 'Complete access to all 30 courses and 18 toolkits. Master every aspect of building a startup in India - from incorporation to international expansion. Includes lifetime access, priority support, and exclusive founder community.',
  price = 149999,
  "originalPrice" = 290952,
  "bundleProducts" = ARRAY[
    'P1','P2','P3','P4','P5','P6','P7','P8','P9','P10',
    'P11','P12','P13','P14','P15','P16','P17','P18','P19','P20',
    'P21','P22','P23','P24','P25','P26','P27','P28','P29','P30',
    'T13','T14','T15','T16','T17','T18','T19','T20','T21','T22',
    'T23','T24','T25','T26','T27','T28','T29','T30'
  ],
  features = '[
    "All 30 comprehensive courses (P1-P30)",
    "All 18 professional toolkits (T13-T30)",
    "450+ lessons with actionable content",
    "300+ templates, tools, and resources",
    "Lifetime access to all current and future updates",
    "Priority email and community support",
    "Exclusive founder networking community",
    "Certificate of completion for each course"
  ]'::jsonb,
  outcomes = '[
    "Master startup incorporation and compliance",
    "Navigate all funding sources from grants to VC",
    "Build bulletproof legal and finance infrastructure",
    "Execute proven sales and marketing strategies",
    "Access government schemes worth ₹1 Cr+",
    "Expand to any sector or international market"
  ]'::jsonb,
  modules = 340,
  "estimatedDays" = 365,
  "updatedAt" = NOW()
WHERE code = 'ALL_ACCESS';

-- Also update the functions to check for any bundle containing the product
CREATE OR REPLACE FUNCTION check_product_access(
    p_user_id TEXT,
    p_product_code TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    v_has_access BOOLEAN := false;
BEGIN
    -- Check direct product purchase
    SELECT EXISTS (
        SELECT 1 FROM "Purchase"
        WHERE "userId" = p_user_id
        AND "productCode" = p_product_code
        AND status = 'completed'
        AND "isActive" = true
        AND "expiresAt" > NOW()
    ) INTO v_has_access;

    -- If no direct access, check for any bundle that includes this product
    IF NOT v_has_access THEN
        SELECT EXISTS (
            SELECT 1 FROM "Purchase" pur
            JOIN "Product" prod ON pur."productCode" = prod.code
            WHERE pur."userId" = p_user_id
            AND prod."isBundle" = true
            AND p_product_code = ANY(prod."bundleProducts")
            AND pur.status = 'completed'
            AND pur."isActive" = true
            AND pur."expiresAt" > NOW()
        ) INTO v_has_access;
    END IF;

    RETURN v_has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify the update
DO $$
DECLARE
  bundle_price INTEGER;
  bundle_count INTEGER;
  original_price INTEGER;
BEGIN
  SELECT price, array_length("bundleProducts", 1), "originalPrice"
  INTO bundle_price, bundle_count, original_price
  FROM "Product" WHERE code = 'ALL_ACCESS';

  IF bundle_price = 149999 AND bundle_count = 48 THEN
    RAISE NOTICE 'SUCCESS: ALL_ACCESS bundle updated - Price: ₹1,49,999, Products: 48, Original Price: ₹%', original_price;
  ELSE
    RAISE NOTICE 'WARNING: ALL_ACCESS bundle may not be correct - Price: %, Products: %', bundle_price, bundle_count;
  END IF;
END $$;
