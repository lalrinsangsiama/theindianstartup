-- P9 Government Schemes Portfolio Activities
-- Adds funding-related activities that integrate with portfolio system

INSERT INTO "ActivityType" (
    "id", "name", "category", "portfolioSection", "portfolioField", 
    "dataSchema", "version", "isActive", "createdAt", "updatedAt"
) VALUES

-- Government funding exploration activity
(
    'government_funding_analysis',
    'Government Funding Analysis',
    'funding',
    'funding_strategy',
    'government_schemes',
    '{
        "type": "object",
        "properties": {
            "eligible_schemes": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "scheme_name": {"type": "string"},
                        "ministry": {"type": "string"},
                        "funding_amount": {"type": "string"},
                        "eligibility_match": {"type": "number"},
                        "application_deadline": {"type": "string"},
                        "status": {"type": "string", "enum": ["researching", "applying", "applied", "approved", "rejected"]}
                    }
                }
            },
            "total_potential_funding": {"type": "number"},
            "priority_applications": {
                "type": "array",
                "items": {"type": "string"}
            },
            "application_timeline": {"type": "string"},
            "documentation_status": {"type": "string"}
        },
        "required": ["eligible_schemes", "total_potential_funding"]
    }'::jsonb,
    1,
    true,
    NOW(),
    NOW()
),

-- Grant application tracker
(
    'grant_application_tracker',
    'Grant Application Tracker',
    'funding',
    'funding_strategy', 
    'active_applications',
    '{
        "type": "object",
        "properties": {
            "active_applications": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "scheme_name": {"type": "string"},
                        "application_id": {"type": "string"},
                        "submission_date": {"type": "string"},
                        "expected_decision": {"type": "string"},
                        "amount_applied": {"type": "number"},
                        "current_status": {"type": "string"},
                        "contact_person": {"type": "string"},
                        "required_documents": {"type": "array"},
                        "completion_percentage": {"type": "number"}
                    }
                }
            },
            "total_applied_amount": {"type": "number"},
            "applications_count": {"type": "number"},
            "success_rate": {"type": "number"}
        },
        "required": ["active_applications", "total_applied_amount"]
    }'::jsonb,
    1,
    true,
    NOW(),
    NOW()
),

-- Subsidy optimization analysis
(
    'subsidy_optimization',
    'Subsidy Optimization Strategy',
    'funding',
    'financial_projections',
    'subsidy_benefits',
    '{
        "type": "object", 
        "properties": {
            "state_subsidies": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "state": {"type": "string"},
                        "subsidy_type": {"type": "string"},
                        "benefit_amount": {"type": "number"},
                        "eligibility_status": {"type": "string"},
                        "application_complexity": {"type": "string"}
                    }
                }
            },
            "total_subsidy_value": {"type": "number"},
            "recommended_location": {"type": "string"},
            "cost_savings_percentage": {"type": "number"},
            "implementation_timeline": {"type": "string"}
        },
        "required": ["state_subsidies", "total_subsidy_value"]
    }'::jsonb,
    1,
    true,
    NOW(),
    NOW()
),

-- Funding pipeline development
(
    'funding_pipeline_development', 
    'Funding Pipeline Development',
    'funding',
    'funding_strategy',
    'funding_pipeline',
    '{
        "type": "object",
        "properties": {
            "pipeline_stages": {
                "type": "array",
                "items": {
                    "type": "object", 
                    "properties": {
                        "stage": {"type": "string"},
                        "funding_source": {"type": "string"},
                        "target_amount": {"type": "number"},
                        "timeline": {"type": "string"},
                        "probability": {"type": "number"},
                        "requirements": {"type": "array"},
                        "status": {"type": "string"}
                    }
                }
            },
            "total_pipeline_value": {"type": "number"},
            "next_milestone": {"type": "string"},
            "risk_mitigation": {"type": "string"}
        },
        "required": ["pipeline_stages", "total_pipeline_value"]
    }'::jsonb,
    1,
    true,
    NOW(),
    NOW()
)

ON CONFLICT ("id") DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category", 
    "portfolioSection" = EXCLUDED."portfolioSection",
    "portfolioField" = EXCLUDED."portfolioField",
    "dataSchema" = EXCLUDED."dataSchema",
    "updatedAt" = NOW();

-- Add P9-specific lesson activity mappings if they don't exist
INSERT INTO "LessonActivity" (
    "id", "lessonId", "activityTypeId", "isRequired", "orderIndex", 
    "instructions", "createdAt", "updatedAt"
)
SELECT 
    'p9_day_' || l."day" || '_funding_analysis',
    l."id",
    'government_funding_analysis',
    true,
    1,
    'Analyze government funding opportunities relevant to your startup using the P9 eligibility calculator and schemes database.',
    NOW(),
    NOW()
FROM "Lesson" l 
WHERE l."moduleId" IN (
    SELECT m."id" FROM "Module" m 
    JOIN "Product" p ON m."productId" = p."id" 
    WHERE p."code" = 'P9'
) 
AND l."day" IN (5, 10, 15, 21) -- Key funding analysis days
ON CONFLICT ("id") DO NOTHING;

-- Insert grant application tracker activity for specific lessons
INSERT INTO "LessonActivity" (
    "id", "lessonId", "activityTypeId", "isRequired", "orderIndex",
    "instructions", "createdAt", "updatedAt"  
)
SELECT 
    'p9_day_' || l."day" || '_grant_tracker',
    l."id", 
    'grant_application_tracker',
    false,
    2,
    'Track your government scheme applications using the P9 application tracker tool.',
    NOW(),
    NOW()
FROM "Lesson" l
WHERE l."moduleId" IN (
    SELECT m."id" FROM "Module" m
    JOIN "Product" p ON m."productId" = p."id"
    WHERE p."code" = 'P9'
)
AND l."day" IN (10, 15, 21) -- Application tracking days
ON CONFLICT ("id") DO NOTHING;