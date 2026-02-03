-- Migration: Fix ALL_ACCESS bundle to include all 48 products
-- Date: 2026-02-03
-- Description: Update ALL_ACCESS bundle to include P1-P30 and T13-T30 (all 48 products)
-- Also update SECTOR_MASTERY bundle to include toolkits

-- Update ALL_ACCESS bundle to include all 48 products
UPDATE "Product"
SET "bundleProducts" = ARRAY[
  'P1','P2','P3','P4','P5','P6','P7','P8','P9','P10',
  'P11','P12','P13','P14','P15','P16','P17','P18','P19','P20',
  'P21','P22','P23','P24','P25','P26','P27','P28','P29','P30',
  'T13','T14','T15','T16','T17','T18','T19','T20','T21','T22',
  'T23','T24','T25','T26','T27','T28','T29','T30'
]
WHERE code = 'ALL_ACCESS';

-- Update SECTOR_MASTERY bundle to include corresponding toolkits
UPDATE "Product"
SET "bundleProducts" = ARRAY['P13','P14','P15','T13','T14','T15']
WHERE code = 'SECTOR_MASTERY';

-- Verify the update
DO $$
DECLARE
  all_access_count INTEGER;
  sector_mastery_count INTEGER;
BEGIN
  SELECT array_length("bundleProducts", 1) INTO all_access_count
  FROM "Product" WHERE code = 'ALL_ACCESS';

  SELECT array_length("bundleProducts", 1) INTO sector_mastery_count
  FROM "Product" WHERE code = 'SECTOR_MASTERY';

  IF all_access_count != 48 THEN
    RAISE NOTICE 'Warning: ALL_ACCESS bundle has % products (expected 48)', all_access_count;
  ELSE
    RAISE NOTICE 'SUCCESS: ALL_ACCESS bundle updated with 48 products';
  END IF;

  IF sector_mastery_count != 6 THEN
    RAISE NOTICE 'Warning: SECTOR_MASTERY bundle has % products (expected 6)', sector_mastery_count;
  ELSE
    RAISE NOTICE 'SUCCESS: SECTOR_MASTERY bundle updated with 6 products';
  END IF;
END $$;
