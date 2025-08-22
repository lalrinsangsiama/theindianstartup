-- P6: Sales & GTM in India - Complete Content Deployment
-- Deploy full resources, interactive tools, templates, and integration for all 60 lessons
-- Version: 1.0.0 - Complete Resource Deployment
-- Date: 2025-08-21

BEGIN;

-- Update all P6 lessons with comprehensive resources and metadata
DO $$
DECLARE
    p6_product_id text;
    lesson_record RECORD;
BEGIN
    SELECT id INTO p6_product_id FROM "Product" WHERE code = 'P6';
    
    -- Update lessons with comprehensive resources based on module focus
    FOR lesson_record IN 
        SELECT l.id, l.day, l.title, m."orderIndex" as module_order
        FROM "Lesson" l
        JOIN "Module" m ON l."moduleId" = m.id
        WHERE m."productId" = p6_product_id
        ORDER BY l.day
    LOOP
        -- Update each lesson based on its module focus
        CASE 
            WHEN lesson_record.module_order IN (1, 2) THEN -- Market Fundamentals & Sales Foundation
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Sales Readiness Assessment Tool", "type": "interactive_tool", "isPremium": true, "url": "/sales/tools#readiness-assessment", "value": 12000},
                        {"title": "Indian Market Analysis Templates (20 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/market-analysis.zip", "value": 25000},
                        {"title": "Sales Foundation Setup Guide", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p6/foundation-playbook.pdf", "value": 15000},
                        {"title": "Regional Sales Strategy Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p6/regional-strategies.zip", "value": 18000},
                        {"title": "Sales Process Builder", "type": "tool", "isPremium": true, "url": "/sales/tools#process-builder", "value": 20000},
                        {"title": "Team Structure Designer", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p6/team-designer.xlsx", "value": 10000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '100000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (3, 4) THEN -- Lead Generation & Sales Execution
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Lead Generation Machine", "type": "interactive_tool", "isPremium": true, "url": "/sales/tools#lead-generation", "value": 25000},
                        {"title": "Cold Outreach Templates (50 variations)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/cold-outreach.zip", "value": 30000},
                        {"title": "Sales Scripts Library (25 scenarios)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/sales-scripts.zip", "value": 25000},
                        {"title": "Negotiation Playbook", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p6/negotiation-playbook.pdf", "value": 20000},
                        {"title": "Pipeline Management System", "type": "tool", "isPremium": true, "url": "/sales/tools#pipeline-manager", "value": 22000},
                        {"title": "Customer Persona Builder", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p6/persona-builder.xlsx", "value": 12000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '134000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (5, 6) THEN -- Pricing & Team Management
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Pricing Strategy Calculator", "type": "interactive_tool", "isPremium": true, "url": "/sales/tools#pricing-calculator", "value": 18000},
                        {"title": "Pricing Templates (15 models)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/pricing-models.zip", "value": 22000},
                        {"title": "Sales Team Hiring Kit", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/team-hiring.zip", "value": 20000},
                        {"title": "Performance Management Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p6/performance-mgmt.zip", "value": 15000},
                        {"title": "Commission Structure Designer", "type": "calculator", "isPremium": true, "downloadUrl": "/templates/p6/commission-calculator.xlsx", "value": 12000},
                        {"title": "Training Curriculum Templates", "type": "curriculum", "isPremium": true, "downloadUrl": "/templates/p6/training-curriculum.zip", "value": 18000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '105000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (7, 8) THEN -- Customer Success & Channel Partnerships
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Customer Success Dashboard", "type": "dashboard", "isPremium": true, "url": "/sales/tools#customer-success", "value": 20000},
                        {"title": "Customer Onboarding Templates", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/customer-onboarding.zip", "value": 18000},
                        {"title": "Channel Partner Kit", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/channel-partner.zip", "value": 25000},
                        {"title": "Distribution Network Planner", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p6/distribution-planner.xlsx", "value": 15000},
                        {"title": "Partner Enablement Materials", "type": "template", "isPremium": true, "downloadUrl": "/templates/p6/partner-enablement.zip", "value": 20000},
                        {"title": "Revenue Expansion Playbook", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p6/revenue-expansion.pdf", "value": 18000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '116000'
                    )
                WHERE id = lesson_record.id;
                
            ELSE -- Advanced modules (9-10)
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Advanced Analytics Suite", "type": "dashboard", "isPremium": true, "url": "/sales/tools#analytics-suite", "value": 30000},
                        {"title": "AI Sales Automation Tools", "type": "tool", "isPremium": true, "url": "/sales/tools#ai-automation", "value": 35000},
                        {"title": "International Expansion Templates", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p6/international-expansion.zip", "value": 25000},
                        {"title": "M&A Sales Strategy Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p6/ma-sales-strategy.pdf", "value": 20000},
                        {"title": "Industry Vertical Playbooks", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p6/vertical-playbooks.zip", "value": 30000},
                        {"title": "Sales Technology Stack", "type": "stack", "isPremium": true, "downloadUrl": "/templates/p6/tech-stack-guide.pdf", "value": 15000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '155000'
                    )
                WHERE id = lesson_record.id;
        END CASE;
    END LOOP;
END $$;

-- Create comprehensive resources in Resource table for P6
DO $$
DECLARE
    p6_modules RECORD;
BEGIN
    -- Create resources for each P6 module
    FOR p6_modules IN 
        SELECT m.id, m.title, m."orderIndex" 
        FROM "Module" m
        JOIN "Product" p ON m."productId" = p.id
        WHERE p.code = 'P6'
        ORDER BY m."orderIndex"
    LOOP
        -- Insert comprehensive resources for each module
        INSERT INTO "Resource" (
            id,
            "moduleId",
            title,
            description,
            type,
            url,
            "fileUrl",
            tags,
            "isDownloadable",
            metadata,
            "createdAt",
            "updatedAt"
        )
        VALUES 
        (
            gen_random_uuid()::text,
            p6_modules.id,
            'Interactive Sales Tools Suite',
            'Access to 6 professional sales tools including Lead Generation Machine, Pipeline Manager, Pricing Calculator, and Analytics Suite',
            'interactive_tool',
            '/sales/tools',
            null,
            ARRAY['interactive', 'tools', 'sales', 'automation', 'professional'],
            false,
            jsonb_build_object(
                'tools_included', 6,
                'total_value', 132000,
                'access_url', '/sales/tools',
                'category', 'Interactive Tools'
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p6_modules.id,
            'Complete Sales Template Library',
            'Access to 200+ professional sales templates worth ₹2,50,000+ including scripts, playbooks, processes, and training materials',
            'template_library',
            '/sales/templates',
            '/templates/p6/complete-library.zip',
            ARRAY['templates', 'sales', 'scripts', 'playbooks', 'professional'],
            true,
            jsonb_build_object(
                'templates_count', 200,
                'total_value', 250000,
                'categories', 8,
                'formats', ARRAY['PDF', 'DOCX', 'PPTX', 'XLSX', 'HTML']
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p6_modules.id,
            'Sales Masterclass Video Series',
            'Expert-led video training covering all aspects of Indian sales strategy, customer psychology, and revenue operations',
            'video_series',
            null,
            '/videos/p6/masterclass-series.zip',
            ARRAY['video', 'training', 'masterclass', 'indian-sales', 'expert'],
            true,
            jsonb_build_object(
                'total_duration', '20 hours',
                'video_count', 60,
                'total_value', 80000,
                'quality', '4K HD'
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p6_modules.id,
            'Sales Analytics & Reporting Suite',
            'Comprehensive sales analytics templates, dashboards, and reporting tools for data-driven sales management',
            'dashboard',
            '/sales/analytics',
            '/templates/p6/analytics-suite.zip',
            ARRAY['analytics', 'dashboard', 'reporting', 'data-driven', 'metrics'],
            true,
            jsonb_build_object(
                'dashboard_count', 15,
                'total_value', 40000,
                'integrations', ARRAY['CRM', 'Excel', 'Google Sheets'],
                'category', 'Analytics'
            ),
            now(),
            now()
        );
    END LOOP;
END $$;

-- Add comprehensive portfolio activity integration for P6
INSERT INTO "ActivityType" (
    id, 
    name, 
    category, 
    "portfolioSection", 
    "portfolioField", 
    "dataSchema", 
    version, 
    "isActive",
    "createdAt", 
    "updatedAt"
)
VALUES 
(
    gen_random_uuid()::text,
    'sales_strategy_development',
    'Sales Strategy',
    'go_to_market',
    'salesStrategy',
    '{
        "type": "object",
        "properties": {
            "targetMarkets": {"type": "array", "title": "Target Markets", "items": {"type": "string"}, "required": true},
            "salesChannels": {"type": "array", "title": "Sales Channels", "items": {"type": "string"}},
            "salesProcess": {
                "type": "object",
                "title": "Sales Process",
                "properties": {
                    "stages": {"type": "array", "title": "Process Stages", "items": {"type": "string"}},
                    "avgCycleLength": {"type": "number", "title": "Average Sales Cycle (days)", "minimum": 1},
                    "conversionRate": {"type": "number", "title": "Lead to Customer Conversion %", "minimum": 0, "maximum": 100}
                }
            },
            "pricingStrategy": {
                "type": "object",
                "title": "Pricing Strategy",
                "properties": {
                    "model": {"type": "string", "title": "Pricing Model"},
                    "basePrice": {"type": "number", "title": "Base Price (₹)", "minimum": 0},
                    "discountStrategy": {"type": "string", "title": "Discount Strategy"}
                }
            },
            "salesTargets": {
                "type": "object",
                "title": "Sales Targets",
                "properties": {
                    "monthlyTarget": {"type": "number", "title": "Monthly Revenue Target (₹)", "minimum": 0},
                    "customerAcquisitionTarget": {"type": "number", "title": "New Customers/Month", "minimum": 0}
                }
            }
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'customer_acquisition_execution',
    'Customer Acquisition',
    'go_to_market',
    'customerAcquisition',
    '{
        "type": "object",
        "properties": {
            "leadGenerationChannels": {"type": "array", "title": "Lead Generation Channels", "items": {"type": "string"}, "required": true},
            "monthlyLeads": {"type": "number", "title": "Monthly Leads Generated", "minimum": 0},
            "costPerLead": {"type": "number", "title": "Cost Per Lead (₹)", "minimum": 0},
            "conversionMetrics": {
                "type": "object",
                "title": "Conversion Metrics",
                "properties": {
                    "leadToMeeting": {"type": "number", "title": "Lead to Meeting %", "minimum": 0, "maximum": 100},
                    "meetingToProposal": {"type": "number", "title": "Meeting to Proposal %", "minimum": 0, "maximum": 100},
                    "proposalToClose": {"type": "number", "title": "Proposal to Close %", "minimum": 0, "maximum": 100}
                }
            },
            "customerSegments": {"type": "array", "title": "Customer Segments", "items": {"type": "string"}},
            "avgDealSize": {"type": "number", "title": "Average Deal Size (₹)", "minimum": 0},
            "salesTeamSize": {"type": "number", "title": "Sales Team Size", "minimum": 1}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'revenue_operations_setup',
    'Revenue Operations',
    'business_model',
    'revenueOperations',
    '{
        "type": "object",
        "properties": {
            "revenueModel": {"type": "string", "title": "Revenue Model", "required": true},
            "monthlyRecurringRevenue": {"type": "number", "title": "Monthly Recurring Revenue (₹)", "minimum": 0},
            "customerRetentionRate": {"type": "number", "title": "Customer Retention Rate %", "minimum": 0, "maximum": 100},
            "avgCustomerLifetime": {"type": "number", "title": "Average Customer Lifetime (months)", "minimum": 1},
            "churnRate": {"type": "number", "title": "Monthly Churn Rate %", "minimum": 0, "maximum": 100},
            "expansionRevenue": {"type": "number", "title": "Expansion Revenue %", "minimum": 0, "maximum": 500},
            "paymentTerms": {"type": "string", "title": "Payment Terms"},
            "billingSystem": {"type": "string", "title": "Billing System Used"},
            "revenueForecasting": {
                "type": "object",
                "title": "Revenue Forecasting",
                "properties": {
                    "nextQuarterForecast": {"type": "number", "title": "Next Quarter Forecast (₹)", "minimum": 0},
                    "yearEndProjection": {"type": "number", "title": "Year End Projection (₹)", "minimum": 0}
                }
            }
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'sales_team_management',
    'Team Management',
    'go_to_market',
    'salesTeamManagement',
    '{
        "type": "object",
        "properties": {
            "teamStructure": {
                "type": "object",
                "title": "Team Structure",
                "properties": {
                    "salesReps": {"type": "number", "title": "Sales Representatives", "minimum": 0},
                    "salesManagers": {"type": "number", "title": "Sales Managers", "minimum": 0},
                    "salesEngineers": {"type": "number", "title": "Sales Engineers", "minimum": 0},
                    "insideSales": {"type": "number", "title": "Inside Sales Team", "minimum": 0}
                }
            },
            "hiringPlan": {"type": "string", "title": "Hiring Plan & Timeline"},
            "compensationStructure": {
                "type": "object",
                "title": "Compensation Structure",
                "properties": {
                    "baseSalary": {"type": "number", "title": "Average Base Salary (₹)", "minimum": 0},
                    "commissionRate": {"type": "number", "title": "Commission Rate %", "minimum": 0, "maximum": 50},
                    "otePlan": {"type": "string", "title": "OTE Plan Description"}
                }
            },
            "trainingProgram": {"type": "string", "title": "Sales Training Program"},
            "performanceMetrics": {"type": "array", "title": "Key Performance Metrics", "items": {"type": "string"}},
            "toolsAndSystems": {"type": "array", "title": "Sales Tools & Systems", "items": {"type": "string"}}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'competitive_analysis_execution',
    'Market Analysis',
    'market_research',
    'competitiveAnalysis',
    '{
        "type": "object",
        "properties": {
            "mainCompetitors": {"type": "array", "title": "Main Competitors", "items": {"type": "string"}, "required": true},
            "competitiveAdvantages": {"type": "array", "title": "Your Competitive Advantages", "items": {"type": "string"}},
            "pricingComparison": {
                "type": "object",
                "title": "Pricing Comparison",
                "properties": {
                    "yourPricing": {"type": "number", "title": "Your Pricing (₹)", "minimum": 0},
                    "avgCompetitorPrice": {"type": "number", "title": "Average Competitor Price (₹)", "minimum": 0},
                    "pricingPositioning": {"type": "string", "title": "Pricing Positioning"}
                }
            },
            "featureComparison": {"type": "string", "title": "Feature Comparison Summary"},
            "marketShare": {"type": "number", "title": "Estimated Market Share %", "minimum": 0, "maximum": 100},
            "competitiveStrategy": {"type": "string", "title": "Competitive Strategy"},
            "differentiationFactors": {"type": "array", "title": "Key Differentiation Factors", "items": {"type": "string"}}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'customer_success_implementation',
    'Customer Success',
    'go_to_market',
    'customerSuccess',
    '{
        "type": "object",
        "properties": {
            "onboardingProcess": {
                "type": "object",
                "title": "Customer Onboarding",
                "properties": {
                    "onboardingSteps": {"type": "number", "title": "Number of Onboarding Steps", "minimum": 1},
                    "timeToValue": {"type": "number", "title": "Time to First Value (days)", "minimum": 1},
                    "onboardingCompletion": {"type": "number", "title": "Onboarding Completion Rate %", "minimum": 0, "maximum": 100}
                }
            },
            "supportChannels": {"type": "array", "title": "Customer Support Channels", "items": {"type": "string"}},
            "npsScore": {"type": "number", "title": "Net Promoter Score", "minimum": -100, "maximum": 100},
            "customerSatisfaction": {"type": "number", "title": "Customer Satisfaction Score", "minimum": 1, "maximum": 10},
            "renewalRate": {"type": "number", "title": "Customer Renewal Rate %", "minimum": 0, "maximum": 100},
            "upsellRate": {"type": "number", "title": "Upsell Rate %", "minimum": 0, "maximum": 100},
            "supportTickets": {
                "type": "object",
                "title": "Support Metrics",
                "properties": {
                    "monthlyTickets": {"type": "number", "title": "Monthly Support Tickets", "minimum": 0},
                    "avgResolutionTime": {"type": "number", "title": "Average Resolution Time (hours)", "minimum": 0},
                    "firstResponseTime": {"type": "number", "title": "First Response Time (minutes)", "minimum": 0}
                }
            }
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
);

COMMIT;

-- Verification query
SELECT 
    'P6 Complete Content Status' as verification,
    COUNT(DISTINCT l.id) as total_lessons,
    COUNT(DISTINCT CASE WHEN jsonb_array_length(l.resources) >= 6 THEN l.id END) as lessons_with_full_resources,
    COUNT(DISTINCT r.id) as resource_entries,
    COUNT(DISTINCT at.id) as activity_types
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
LEFT JOIN "Resource" r ON r."moduleId" = m.id
LEFT JOIN "ActivityType" at ON at.category IN ('Sales Strategy', 'Customer Acquisition', 'Revenue Operations', 'Team Management', 'Market Analysis', 'Customer Success')
WHERE p.code = 'P6';

SELECT 'P6 Template Value Summary' as summary,
       SUM((l.metadata->>'total_template_value')::numeric) as total_template_value
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P6' AND l.metadata->>'total_template_value' IS NOT NULL;