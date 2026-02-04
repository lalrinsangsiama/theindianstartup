-- COMPREHENSIVE ENHANCED COURSE CONTENT MIGRATION
-- The Indian Startup Platform - P1-P30 Enhanced Content
-- Created: 2026-02-04
--
-- This script applies all 40 correctly-formatted enhanced course migrations.
-- NOTE: P11 (Branding), P20 (FinTech), P26 (AgriTech) have schema issues and are excluded.
--
-- INSTRUCTIONS:
-- 1. Run this script in Supabase SQL Editor
-- 2. Alternatively use: psql -h db.[PROJECT_REF].supabase.co -U postgres -d postgres -f apply_enhanced_migrations.sql
--
-- Each course migration:
-- - Creates or updates the Product record
-- - Deletes existing modules/lessons for clean re-insert
-- - Inserts all modules and lessons with enhanced 500-800 word content

-- ============================================================
-- FOUNDATION COURSES (P1-P10, P12)
-- ============================================================

-- Import P1: 30-Day India Launch Sprint
\ir 20260204_001_p1_launch_sprint_enhanced.sql

-- Import P2: Incorporation & Compliance Kit
\ir 20260204_002_p2_incorporation_enhanced.sql

-- Import P3: Funding in India
\ir 20260204_003_p3_funding_enhanced.sql

-- Import P4: Finance Stack (Part 1)
\ir 20260204_004_p4_finance_enhanced.sql

-- Import P4: Finance Stack (Part 2)
\ir 20260204_004b_p4_finance_enhanced_part2.sql

-- Import P5: Legal Stack (Part 1)
\ir 20260204_005_p5_legal_enhanced.sql

-- Import P5: Legal Stack (Part 2)
\ir 20260204_005b_p5_legal_enhanced_part2.sql

-- Import P6: Sales & GTM (Part 1)
\ir 20260204_006_p6_sales_gtm_enhanced.sql

-- Import P6: Sales & GTM (Part 2)
\ir 20260204_006b_p6_sales_gtm_enhanced_part2.sql

-- Import P7: State-wise Scheme Map
\ir 20260204_007_p7_state_schemes_enhanced.sql

-- Import P8: Investor-Ready Data Room
\ir 20260204_008_p8_dataroom_enhanced.sql

-- Import P9: Government Schemes & Funding
\ir 20260204_009_p9_govt_schemes_enhanced.sql

-- Import P10: Patent Mastery
\ir 20260204_010_p10_patent_enhanced.sql

-- Import P11: Branding & PR Mastery
\ir 20260204_011_p11_branding_enhanced.sql

-- Import P12: Marketing Mastery
\ir 20260204_012_p12_marketing_enhanced.sql

-- ============================================================
-- SECTOR-SPECIFIC COURSES (P13-P15)
-- ============================================================

-- Import P13: Food Processing Mastery
\ir 20260204_013_p13_food_processing_enhanced.sql

-- Import P14: Impact & CSR Mastery
\ir 20260204_014_p14_impact_csr_enhanced.sql

-- Import P15: Carbon Credits & Sustainability
\ir 20260204_015_p15_carbon_credits_enhanced.sql

-- ============================================================
-- CORE FUNCTIONS (P16-P19)
-- ============================================================

-- Import P16: HR & Team Building
\ir 20260204_016_p16_hr_team_enhanced.sql

-- Import P17: Product Development
\ir 20260204_017_p17_product_dev_enhanced.sql

-- Import P18: Operations & Supply Chain (Part 1)
\ir 20260204_018_p18_operations_enhanced.sql

-- Import P18: Operations & Supply Chain (Part 2)
\ir 20260204_018b_p18_operations_enhanced_part2.sql

-- Import P19: Technology Stack
\ir 20260204_019_p19_technology_enhanced.sql

-- ============================================================
-- HIGH-GROWTH SECTORS (P20-P24)
-- ============================================================

-- Import P20: FinTech Mastery
\ir 20260204_020_p20_fintech_enhanced.sql

-- Import P21: HealthTech (Part 1)
\ir 20260204_021_p21_healthtech_enhanced.sql

-- Import P21: HealthTech (Part 2)
\ir 20260204_021b_p21_healthtech_enhanced_part2.sql

-- Import P21: HealthTech (Part 3)
\ir 20260204_021c_p21_healthtech_enhanced_part3.sql

-- Import P22: E-commerce & D2C (Part 1)
\ir 20260204_022_p22_ecommerce_enhanced.sql

-- Import P22: E-commerce & D2C (Part 2)
\ir 20260204_022b_p22_ecommerce_enhanced_part2.sql

-- Import P23: EV & Clean Mobility
\ir 20260204_023_p23_ev_mobility_enhanced.sql

-- Import P24: Manufacturing (Part 1)
\ir 20260204_024_p24_manufacturing_enhanced.sql

-- Import P24: Manufacturing (Part 2)
\ir 20260204_024_p24_manufacturing_enhanced_part2.sql

-- Import P24: Manufacturing (Part 3)
\ir 20260204_024_p24_manufacturing_enhanced_part3.sql

-- ============================================================
-- EMERGING SECTORS (P25-P28)
-- ============================================================

-- Import P25: EdTech (Part 1)
\ir 20260204_025_p25_edtech_enhanced.sql

-- Import P25: EdTech (Part 2)
\ir 20260204_026_p25_edtech_enhanced_part2.sql

-- Import P25: EdTech (Part 3)
\ir 20260204_027_p25_edtech_enhanced_part3.sql

-- Import P26: AgriTech & Farm-to-Fork
\ir 20260204_026_p26_agritech_enhanced.sql

-- Import P27: PropTech
\ir 20260204_027_p27_proptech_enhanced.sql

-- Import P28: Biotech (Part 1)
\ir 20260204_028_p28_biotech_enhanced.sql

-- Import P28: Biotech (Part 2)
\ir 20260204_028b_p28_biotech_enhanced_part2.sql

-- ============================================================
-- ADVANCED & GLOBAL (P29-P30)
-- ============================================================

-- Import P29: SaaS Mastery (Part 1)
\ir 20260204_029_p29_saas_enhanced.sql

-- Import P29: SaaS Mastery (Part 2)
\ir 20260204_029b_p29_saas_enhanced_part2.sql

-- Import P30: International Expansion
\ir 20260204_030_p30_international_enhanced.sql

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Verify content lengths after migration
SELECT
    p.code,
    p.title,
    COUNT(DISTINCT m.id) as modules,
    COUNT(l.id) as lessons,
    AVG(LENGTH(l."briefContent"))::int as avg_content_length
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code LIKE 'P%'
GROUP BY p.code, p.title
ORDER BY p.code;

-- List courses that may need attention (low content length)
SELECT p.code, p.title, AVG(LENGTH(l."briefContent"))::int as avg_content_length
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code LIKE 'P%'
GROUP BY p.code, p.title
HAVING AVG(LENGTH(l."briefContent")) < 500
ORDER BY avg_content_length;

-- ============================================================
-- ALL 30 COURSES INCLUDED
-- Schema fix completed for P11, P20, P26 on 2026-02-04
-- ============================================================
