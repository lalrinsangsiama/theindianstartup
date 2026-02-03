-- Migration: Create SECTOR_MASTERY bundle
-- Date: 2026-02-03
-- Description: Insert the Sector Mastery Bundle product (P13 + P14 + P15 + T13 + T14 + T15)

-- Insert SECTOR_MASTERY bundle
INSERT INTO "Product" (
  id,
  code,
  slug,
  title,
  description,
  price,
  "originalPrice",
  features,
  outcomes,
  "estimatedTime",
  "estimatedDays",
  "xpReward",
  modules,
  "isActive",
  "isBundle",
  "bundleProducts",
  "sortOrder",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid()::text,
  'SECTOR_MASTERY',
  'sector-mastery-bundle',
  'Sector Mastery Bundle - Food, Impact & Sustainability',
  'Master three high-growth sectors with our comprehensive bundle. Includes Food Processing Mastery (P13), Impact & CSR Mastery (P14), and Carbon Credits & Sustainability (P15) courses plus all corresponding toolkits. Perfect for entrepreneurs in food tech, social impact, or green business.',
  20999,
  26997,
  '[
    "3 complete sector-specific courses",
    "Food Processing with FSSAI compliance",
    "Impact & CSR with ₹25,000 Cr ecosystem access",
    "Carbon Credits & Net Zero strategy",
    "3 toolkit bundles (T13, T14, T15)",
    "150+ templates and tools",
    "Save ₹5,998 vs individual purchase"
  ]'::jsonb,
  '[
    "Master FSSAI compliance and food manufacturing",
    "Navigate the ₹25,000 Cr CSR ecosystem",
    "Build carbon credit revenue streams",
    "Achieve sustainability certifications",
    "Access sector-specific government subsidies",
    "Build compliant, profitable green businesses"
  ]'::jsonb,
  180,
  180,
  5000,
  33,
  true,
  true,
  ARRAY['P13', 'P14', 'P15', 'T13', 'T14', 'T15'],
  2,
  NOW(),
  NOW()
)
ON CONFLICT (code) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  "originalPrice" = EXCLUDED."originalPrice",
  features = EXCLUDED.features,
  outcomes = EXCLUDED.outcomes,
  "bundleProducts" = EXCLUDED."bundleProducts",
  "updatedAt" = NOW();

-- Verify the insertion
DO $$
DECLARE
  bundle_exists BOOLEAN;
  product_count INTEGER;
BEGIN
  SELECT EXISTS(SELECT 1 FROM "Product" WHERE code = 'SECTOR_MASTERY') INTO bundle_exists;
  SELECT array_length("bundleProducts", 1) INTO product_count FROM "Product" WHERE code = 'SECTOR_MASTERY';

  IF bundle_exists AND product_count = 6 THEN
    RAISE NOTICE 'SUCCESS: SECTOR_MASTERY bundle created with 6 products (P13, P14, P15, T13, T14, T15)';
  ELSIF bundle_exists THEN
    RAISE NOTICE 'WARNING: SECTOR_MASTERY bundle exists but has % products (expected 6)', product_count;
  ELSE
    RAISE NOTICE 'ERROR: SECTOR_MASTERY bundle was not created';
  END IF;
END $$;
