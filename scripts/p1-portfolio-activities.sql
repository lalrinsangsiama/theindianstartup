-- P1: Add Portfolio Activities for 30-Day Journey Integration
-- This script adds portfolio activity types that are referenced in P1 content

BEGIN;

-- Insert P1-specific portfolio activity types
INSERT INTO "ActivityType" (
    "id", "name", "category", "portfolioSection", "portfolioField", 
    "dataSchema", "version", "isActive", "createdAt", "updatedAt"
) VALUES

-- Core P1 Activities from Day 1 content
('define_problem_statement', 'Problem Statement Definition', 'foundation', 'idea_vision', 'problem_statement', '{
    "type": "object",
    "properties": {
        "problemStatement": {"type": "string", "description": "One-sentence problem definition"},
        "targetAudience": {"type": "string", "description": "Primary and secondary audience"},
        "problemSeverity": {"type": "integer", "minimum": 1, "maximum": 10},
        "currentSolutions": {"type": "array", "items": {"type": "string"}},
        "uniqueAngle": {"type": "string", "description": "Your unique Indian market angle"}
    },
    "required": ["problemStatement", "targetAudience", "problemSeverity"]
}', 1, true, NOW(), NOW()),

('target_market_analysis', 'Target Market Analysis', 'research', 'market_research', 'target_market', '{
    "type": "object",
    "properties": {
        "primaryMarket": {"type": "string", "description": "Primary target segment"},
        "secondaryMarket": {"type": "string", "description": "Secondary target segment"},
        "marketSize": {"type": "object", "properties": {
            "tam": {"type": "number", "description": "Total Addressable Market"},
            "sam": {"type": "number", "description": "Serviceable Addressable Market"},
            "som": {"type": "number", "description": "Serviceable Obtainable Market"}
        }},
        "customerPersonas": {"type": "array", "items": {"type": "object"}},
        "competitorAnalysis": {"type": "array", "items": {"type": "object"}}
    },
    "required": ["primaryMarket", "marketSize"]
}', 1, true, NOW(), NOW()),

('legal_structure_decision', 'Legal Structure Decision', 'legal', 'legal_compliance', 'company_structure', '{
    "type": "object",
    "properties": {
        "chosenStructure": {"type": "string", "enum": ["Private Limited", "LLP", "One Person Company", "Partnership"]},
        "companyName": {"type": "string", "description": "Chosen company name"},
        "reasonForChoice": {"type": "string", "description": "Why this structure was chosen"},
        "incorporationStatus": {"type": "string", "enum": ["Planning", "In Progress", "Completed"]},
        "complianceRequirements": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["chosenStructure", "companyName"]
}', 1, true, NOW(), NOW()),

('brand_identity_creation', 'Brand Identity Creation', 'branding', 'brand_assets', 'brand_identity', '{
    "type": "object",
    "properties": {
        "brandName": {"type": "string", "description": "Brand name"},
        "tagline": {"type": "string", "description": "Brand tagline"},
        "brandValues": {"type": "array", "items": {"type": "string"}},
        "colorPalette": {"type": "array", "items": {"type": "string"}},
        "logoDescription": {"type": "string", "description": "Logo concept description"},
        "brandPersonality": {"type": "string", "description": "Brand personality traits"}
    },
    "required": ["brandName", "brandValues"]
}', 1, true, NOW(), NOW()),

('product_roadmap', 'Product Development Roadmap', 'product', 'product_development', 'roadmap', '{
    "type": "object",
    "properties": {
        "mvpFeatures": {"type": "array", "items": {"type": "string"}},
        "developmentPhases": {"type": "array", "items": {"type": "object"}},
        "techStack": {"type": "array", "items": {"type": "string"}},
        "developmentTimeline": {"type": "object", "properties": {
            "phase1": {"type": "string"},
            "phase2": {"type": "string"},
            "phase3": {"type": "string"}
        }},
        "resourceRequirements": {"type": "object"}
    },
    "required": ["mvpFeatures", "developmentPhases"]
}', 1, true, NOW(), NOW()),

('go_to_market_strategy', 'Go-to-Market Strategy', 'marketing', 'go_to_market', 'strategy', '{
    "type": "object",
    "properties": {
        "targetSegments": {"type": "array", "items": {"type": "string"}},
        "marketingChannels": {"type": "array", "items": {"type": "string"}},
        "pricingStrategy": {"type": "object", "properties": {
            "model": {"type": "string"},
            "pricing": {"type": "number"},
            "rationale": {"type": "string"}
        }},
        "salesStrategy": {"type": "object"},
        "launchPlan": {"type": "object"},
        "successMetrics": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["targetSegments", "marketingChannels", "pricingStrategy"]
}', 1, true, NOW(), NOW()),

('mvp_development', 'MVP Development Planning', 'product', 'product_development', 'mvp_plan', '{
    "type": "object",
    "properties": {
        "mvpDescription": {"type": "string", "description": "MVP concept description"},
        "coreFeatures": {"type": "array", "items": {"type": "string"}},
        "userFlows": {"type": "array", "items": {"type": "object"}},
        "technicalSpecs": {"type": "object"},
        "testingPlan": {"type": "object"},
        "launchCriteria": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["mvpDescription", "coreFeatures"]
}', 1, true, NOW(), NOW()),

('customer_validation', 'Customer Validation Research', 'research', 'market_research', 'customer_feedback', '{
    "type": "object",
    "properties": {
        "interviewResults": {"type": "array", "items": {"type": "object"}},
        "surveyData": {"type": "object"},
        "keyInsights": {"type": "array", "items": {"type": "string"}},
        "painPoints": {"type": "array", "items": {"type": "string"}},
        "solutionValidation": {"type": "object"},
        "iterationPlan": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["interviewResults", "keyInsights"]
}', 1, true, NOW(), NOW())

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    "portfolioSection" = EXCLUDED."portfolioSection",
    "portfolioField" = EXCLUDED."portfolioField",
    "dataSchema" = EXCLUDED."dataSchema",
    version = EXCLUDED.version,
    "updatedAt" = NOW();

COMMIT;

-- Verify the activities were added
SELECT 
    id,
    name,
    category,
    "portfolioSection",
    "portfolioField"
FROM "ActivityType" 
WHERE id IN (
    'define_problem_statement',
    'target_market_analysis', 
    'legal_structure_decision',
    'brand_identity_creation',
    'product_roadmap',
    'go_to_market_strategy',
    'mvp_development',
    'customer_validation'
)
ORDER BY id;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🎯 P1 PORTFOLIO ACTIVITIES DEPLOYED! 🎯';
    RAISE NOTICE '======================================';
    RAISE NOTICE '✅ 8 portfolio activity types added for P1';
    RAISE NOTICE '✅ Proper portfolio section mapping';
    RAISE NOTICE '✅ JSON schema validation included';
    RAISE NOTICE '✅ Ready for P1 lesson integration';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 P1 lessons can now capture portfolio activities!';
    RAISE NOTICE '';
END $$;