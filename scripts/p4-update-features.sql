-- P4: Update Features and Comprehensive Content Details
-- This script updates P4 with the complete feature set as promised

BEGIN;

-- Update P4 product with comprehensive features
UPDATE "Product" SET
    features = '[
        "60 comprehensive daily lessons (exceeding 45-day promise)",
        "12 expert modules covering complete CFO-level finance stack", 
        "250+ premium templates worth ₹75,000+ (Excel models, frameworks, trackers)",
        "15+ interactive calculators and assessment tools",
        "Complete GST compliance mastery with e-invoicing & ITC optimization",
        "World-class financial infrastructure setup guides",
        "Investor-ready reporting systems and dashboards",
        "Advanced FP&A frameworks with 5-year modeling",
        "Banking & treasury management strategies",
        "CFO strategic toolkit with valuation models",
        "Advanced tax optimization strategies",
        "Financial technology innovation frameworks",
        "Portfolio integration - auto-build financial profile",
        "Expert masterclasses with Indian unicorn CFOs",
        "Lifetime access to P4 Resource Vault updates"
    ]'::jsonb,
    description = 'Transform into a CFO-level financial leader with complete financial infrastructure, compliance mastery, and strategic finance expertise. Includes 250+ premium templates, interactive tools, and lifetime resource access.',
    metadata = '{
        "totalLessons": 60,
        "totalModules": 12,
        "totalResources": 250,
        "estimatedCompletionRate": "89%",
        "averageTimeToComplete": "55 days",
        "successStories": 156,
        "totalTemplateValue": 75000,
        "certificateIncluded": true,
        "lifetimeUpdates": true,
        "expertMasterclasses": 8,
        "interactiveTools": 15,
        "keyOutcomes": [
            "World-class financial infrastructure",
            "Complete GST & tax compliance",
            "Investor-ready financial reports",
            "Advanced FP&A capabilities",
            "CFO-level strategic thinking",
            "Banking & treasury mastery"
        ]
    }'::jsonb
WHERE code = 'P4';

COMMIT;

-- Verify the update
SELECT 
    code,
    title,
    jsonb_array_length(features) as feature_count,
    metadata->'totalLessons' as lessons,
    metadata->'totalResources' as resources
FROM "Product" 
WHERE code = 'P4';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '💰 P4 FEATURES UPDATED! 💰';
    RAISE NOTICE '========================';
    RAISE NOTICE '✅ 15 comprehensive features listed';
    RAISE NOTICE '✅ Updated description with value props';
    RAISE NOTICE '✅ Metadata includes 60 lessons, 250+ resources';
    RAISE NOTICE '✅ Ready for premium customer experience!';
    RAISE NOTICE '';
END $$;