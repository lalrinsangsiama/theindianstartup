-- Fix duplicate P12 products and add missing resources

DO $$
DECLARE
    correct_p12_id TEXT;
    duplicate_p12_id TEXT;
    p7_id TEXT;
    p9_id TEXT;
BEGIN
    -- Get the correct P12 product ID (uppercase code)
    SELECT id INTO correct_p12_id FROM "Product" WHERE code = 'P12';
    
    -- Get the duplicate p12_marketing ID
    SELECT id INTO duplicate_p12_id FROM "Product" WHERE code = 'p12_marketing';
    
    -- If we have both, migrate all data to P12 and remove duplicate
    IF correct_p12_id IS NOT NULL AND duplicate_p12_id IS NOT NULL THEN
        -- Update all modules to point to correct P12
        UPDATE "Module" SET "productId" = correct_p12_id WHERE "productId" = duplicate_p12_id;
        
        -- Delete the duplicate product
        DELETE FROM "Product" WHERE id = duplicate_p12_id;
        
        RAISE NOTICE 'Consolidated P12 products - removed duplicate';
    END IF;
    
    -- Get P7 and P9 product IDs for adding resources
    SELECT id INTO p7_id FROM "Product" WHERE code = 'P7';
    SELECT id INTO p9_id FROM "Product" WHERE code = 'P9';
    
    -- Add resources for P7 (State-wise Scheme Map)
    IF p7_id IS NOT NULL THEN
        -- Get first module ID for P7
        INSERT INTO "Resource" (id, "moduleId", title, description, type, url, "isDownloadable", tags)
        SELECT 
            'p7_res_' || generate_series(1, 10),
            (SELECT id FROM "Module" WHERE "productId" = p7_id ORDER BY "orderIndex" LIMIT 1),
            title,
            description,
            type,
            url,
            "isDownloadable",
            tags
        FROM (VALUES
            ('State Scheme Database', 'Comprehensive database of all state government schemes across 28 states and 8 UTs', 'database', '/resources/p7/state-schemes-db', true, ARRAY['state-schemes', 'database', 'comprehensive']),
            ('State Benefit Calculator', 'Calculate potential benefits and subsidies for your business across different states', 'tool', '/tools/p7/benefit-calculator', false, ARRAY['calculator', 'benefits', 'optimization']),
            ('Location Optimization Framework', 'Strategic framework for choosing optimal state locations based on benefits', 'framework', '/resources/p7/location-framework', true, ARRAY['location', 'strategy', 'optimization']),
            ('State Incentive Comparison Matrix', 'Compare incentives and benefits across all Indian states', 'template', '/templates/p7/incentive-matrix', true, ARRAY['comparison', 'incentives', 'analysis']),
            ('SEZ and Industrial Park Guide', 'Complete guide to SEZs and industrial parks across India', 'guide', '/resources/p7/sez-guide', true, ARRAY['sez', 'industrial-parks', 'infrastructure']),
            ('State Contact Directory', 'Direct contacts for all state industry departments and nodal officers', 'directory', '/resources/p7/contacts', true, ARRAY['contacts', 'government', 'networking']),
            ('Application Template Library', 'State-specific application templates for all major schemes', 'template_library', '/templates/p7/applications', true, ARRAY['applications', 'templates', 'schemes']),
            ('Multi-State Strategy Planner', 'Plan expansion across multiple states with benefit optimization', 'tool', '/tools/p7/multi-state-planner', false, ARRAY['planning', 'expansion', 'strategy']),
            ('State Policy Tracker', 'Track policy changes and new schemes across all states', 'dashboard', '/tools/p7/policy-tracker', false, ARRAY['policy', 'tracking', 'updates']),
            ('Success Story Database', 'Case studies of businesses leveraging state benefits effectively', 'database', '/resources/p7/success-stories', true, ARRAY['case-studies', 'success', 'examples'])
        ) AS resources(title, description, type, url, "isDownloadable", tags)
        ON CONFLICT (id) DO NOTHING;
        
        RAISE NOTICE 'Added resources for P7';
    END IF;
    
    -- Add resources for P9 (Government Schemes & Funding)
    IF p9_id IS NOT NULL THEN
        -- Get first module ID for P9
        INSERT INTO "Resource" (id, "moduleId", title, description, type, url, "isDownloadable", tags)
        SELECT 
            'p9_res_' || generate_series(1, 12),
            (SELECT id FROM "Module" WHERE "productId" = p9_id ORDER BY "orderIndex" LIMIT 1),
            title,
            description,
            type,
            url,
            "isDownloadable",
            tags
        FROM (VALUES
            ('Government Funding Database', 'Complete database of 850+ active government funding schemes', 'database', '/resources/p9/funding-database', true, ARRAY['funding', 'schemes', 'government']),
            ('Eligibility Assessment Tool', 'Automated tool to check eligibility for multiple schemes', 'tool', '/tools/p9/eligibility-checker', false, ARRAY['eligibility', 'assessment', 'automation']),
            ('Application Template Suite', 'Professional templates for all major government funding applications', 'template_collection', '/templates/p9/applications', true, ARRAY['applications', 'templates', 'professional']),
            ('Ministry Contact Database', 'Direct contacts for 47 ministries and implementing agencies', 'database', '/resources/p9/ministry-contacts', true, ARRAY['contacts', 'ministries', 'networking']),
            ('Funding Calculator', 'Calculate potential funding from multiple government sources', 'calculator', '/tools/p9/funding-calculator', false, ARRAY['calculator', 'funding', 'planning']),
            ('Success Story Library', '200+ detailed case studies of successful government funding', 'library', '/resources/p9/success-stories', true, ARRAY['case-studies', 'success', 'inspiration']),
            ('Policy Response Templates', 'Templates for participating in government consultations', 'template_collection', '/templates/p9/policy-response', true, ARRAY['policy', 'consultations', 'participation']),
            ('Compliance Tracking System', 'Track compliance requirements for all government funding', 'system', '/tools/p9/compliance-tracker', false, ARRAY['compliance', 'tracking', 'management']),
            ('International Program Guide', 'Access bilateral and multilateral funding programs', 'guide', '/resources/p9/international', true, ARRAY['international', 'bilateral', 'global']),
            ('GeM Portal Mastery Guide', 'Win government contracts worth ₹1.5 lakh crore annually', 'guide', '/resources/p9/gem-guide', true, ARRAY['gem', 'procurement', 'contracts']),
            ('Scheme Intelligence Reports', 'Monthly updates on new schemes and policy changes', 'resource', '/resources/p9/intelligence', true, ARRAY['updates', 'intelligence', 'trends']),
            ('ROI Analysis Framework', 'Measure and maximize ROI from government funding', 'framework', '/resources/p9/roi-framework', true, ARRAY['roi', 'analysis', 'measurement'])
        ) AS resources(title, description, type, url, "isDownloadable", tags)
        ON CONFLICT (id) DO NOTHING;
        
        RAISE NOTICE 'Added resources for P9';
    END IF;
    
    -- Update P7 and P9 to have correct estimated days and modules if needed
    UPDATE "Product" SET "estimatedDays" = 30 WHERE code = 'P7';
    UPDATE "Product" SET "estimatedDays" = 21 WHERE code = 'P9';
    
END $$;

-- Verify the fixes
SELECT 
    p.code,
    p.title,
    COUNT(DISTINCT m.id) as modules,
    COUNT(DISTINCT l.id) as lessons,
    COUNT(DISTINCT r.id) as resources
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
LEFT JOIN "Resource" r ON m.id = r."moduleId"
WHERE p.code IN ('P7', 'P9', 'P12', 'p12_marketing')
GROUP BY p.code, p.title
ORDER BY p.code;