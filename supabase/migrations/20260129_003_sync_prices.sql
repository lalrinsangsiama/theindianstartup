-- THE INDIAN STARTUP - Sync Product Prices
-- Migration: 20260129_003_sync_prices.sql
-- Purpose: Ensure database prices match frontend catalog prices

-- ================================================
-- UPDATE PRODUCT PRICES
-- ================================================
-- Sync all product prices to match src/lib/products-catalog.ts

UPDATE "Product" SET price = 4999 WHERE code = 'P1';
UPDATE "Product" SET price = 4999 WHERE code = 'P2';
UPDATE "Product" SET price = 5999 WHERE code = 'P3';
UPDATE "Product" SET price = 6999 WHERE code = 'P4';
UPDATE "Product" SET price = 7999 WHERE code = 'P5';
UPDATE "Product" SET price = 6999 WHERE code = 'P6';
UPDATE "Product" SET price = 4999 WHERE code = 'P7';
UPDATE "Product" SET price = 9999 WHERE code = 'P8';
UPDATE "Product" SET price = 4999 WHERE code = 'P9';
UPDATE "Product" SET price = 7999 WHERE code = 'P10';
UPDATE "Product" SET price = 7999 WHERE code = 'P11';
UPDATE "Product" SET price = 9999 WHERE code = 'P12';
UPDATE "Product" SET price = 54999 WHERE code = 'ALL_ACCESS';

-- ================================================
-- VERIFY PRICES
-- ================================================
SELECT code, title, price,
    CASE
        WHEN code = 'P1' AND price = 4999 THEN '✅'
        WHEN code = 'P2' AND price = 4999 THEN '✅'
        WHEN code = 'P3' AND price = 5999 THEN '✅'
        WHEN code = 'P4' AND price = 6999 THEN '✅'
        WHEN code = 'P5' AND price = 7999 THEN '✅'
        WHEN code = 'P6' AND price = 6999 THEN '✅'
        WHEN code = 'P7' AND price = 4999 THEN '✅'
        WHEN code = 'P8' AND price = 9999 THEN '✅'
        WHEN code = 'P9' AND price = 4999 THEN '✅'
        WHEN code = 'P10' AND price = 7999 THEN '✅'
        WHEN code = 'P11' AND price = 7999 THEN '✅'
        WHEN code = 'P12' AND price = 9999 THEN '✅'
        WHEN code = 'ALL_ACCESS' AND price = 54999 THEN '✅'
        ELSE '❌'
    END as "Sync Status"
FROM "Product"
ORDER BY
    CASE
        WHEN code = 'ALL_ACCESS' THEN 0
        ELSE CAST(SUBSTRING(code FROM 2) AS INTEGER)
    END;
