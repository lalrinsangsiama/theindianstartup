-- P8: Investor-Ready Data Room Mastery - Complete Content Deployment
-- Deploy full resources, interactive tools, templates, and integration for all 45 lessons
-- Version: 1.0.0 - Complete Resource Deployment
-- Date: 2025-08-21

BEGIN;

-- Update all P8 lessons with comprehensive resources and metadata
DO $$
DECLARE
    p8_product_id text;
    lesson_record RECORD;
BEGIN
    SELECT id INTO p8_product_id FROM "Product" WHERE code = 'P8';
    
    -- Update lessons with comprehensive resources based on module focus
    FOR lesson_record IN 
        SELECT l.id, l.day, l.title, m."orderIndex" as module_order
        FROM "Lesson" l
        JOIN "Module" m ON l."moduleId" = m.id
        WHERE m."productId" = p8_product_id
        ORDER BY l.day
    LOOP
        -- Update each lesson based on its module focus
        CASE 
            WHEN lesson_record.module_order IN (1, 2) THEN -- Data Room Fundamentals & Legal Foundation
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Data Room Architecture Tool", "type": "interactive_tool", "isPremium": true, "url": "/dataroom/tools#architecture", "value": 25000},
                        {"title": "Legal Documentation Templates (30 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p8/legal-docs.zip", "value": 40000},
                        {"title": "Investor Psychology Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p8/investor-psychology.pdf", "value": 15000},
                        {"title": "Corporate Structure Visualizer", "type": "tool", "isPremium": true, "url": "/dataroom/tools#structure", "value": 18000},
                        {"title": "Compliance Checklist Generator", "type": "checklist", "isPremium": true, "downloadUrl": "/templates/p8/compliance-checklist.xlsx", "value": 12000},
                        {"title": "IP Portfolio Manager", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p8/ip-portfolio.xlsx", "value": 20000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '130000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (3, 4) THEN -- Financial Deep Dive & Business Operations
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Financial Model Builder", "type": "interactive_tool", "isPremium": true, "url": "/dataroom/tools#financial-model", "value": 35000},
                        {"title": "Advanced Financial Templates (40 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p8/financial-models.zip", "value": 50000},
                        {"title": "Cap Table Management System", "type": "tool", "isPremium": true, "url": "/dataroom/tools#cap-table", "value": 30000},
                        {"title": "MIS Dashboard Generator", "type": "dashboard", "isPremium": true, "downloadUrl": "/templates/p8/mis-dashboard.xlsx", "value": 25000},
                        {"title": "Business Strategy Canvas", "type": "canvas", "isPremium": true, "downloadUrl": "/templates/p8/strategy-canvas.pdf", "value": 15000},
                        {"title": "Market Analysis Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p8/market-analysis.pptx", "value": 20000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '175000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (5, 6) THEN -- Team & Organization / Customer & Revenue
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Team Analytics Dashboard", "type": "dashboard", "isPremium": true, "url": "/dataroom/tools#team-analytics", "value": 22000},
                        {"title": "HR Documentation Suite (25 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p8/hr-docs.zip", "value": 30000},
                        {"title": "Customer Analytics Engine", "type": "tool", "isPremium": true, "url": "/dataroom/tools#customer-analytics", "value": 28000},
                        {"title": "Revenue Quality Analyzer", "type": "analyzer", "isPremium": true, "downloadUrl": "/templates/p8/revenue-analyzer.xlsx", "value": 25000},
                        {"title": "Organizational Chart Builder", "type": "builder", "isPremium": true, "downloadUrl": "/templates/p8/org-chart.pptx", "value": 10000},
                        {"title": "Customer Success Metrics", "type": "metrics", "isPremium": true, "downloadUrl": "/templates/p8/customer-metrics.xlsx", "value": 18000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '133000'
                    )
                WHERE id = lesson_record.id;
                
            ELSE -- Due Diligence Preparation & Post-Investment (7-8)
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Due Diligence Q&A Generator", "type": "interactive_tool", "isPremium": true, "url": "/dataroom/tools#dd-qa", "value": 30000},
                        {"title": "Red Flag Remediation Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p8/red-flag-guide.pdf", "value": 20000},
                        {"title": "Exit Strategy Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p8/exit-strategy.pptx", "value": 25000},
                        {"title": "Post-Investment Compliance", "type": "compliance", "isPremium": true, "downloadUrl": "/templates/p8/post-investment.zip", "value": 22000},
                        {"title": "Unicorn Scaling Playbook", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p8/unicorn-playbook.pdf", "value": 35000},
                        {"title": "IPO Readiness Checklist", "type": "checklist", "isPremium": true, "downloadUrl": "/templates/p8/ipo-checklist.xlsx", "value": 28000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '160000'
                    )
                WHERE id = lesson_record.id;
        END CASE;
    END LOOP;
END $$;

-- Create comprehensive resources in Resource table for P8
DO $$
DECLARE
    p8_modules RECORD;
BEGIN
    -- Create resources for each P8 module
    FOR p8_modules IN 
        SELECT m.id, m.title, m."orderIndex" 
        FROM "Module" m
        JOIN "Product" p ON m."productId" = p.id
        WHERE p.code = 'P8'
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
            p8_modules.id,
            'Interactive Data Room Tools Suite',
            'Access to 7 professional data room tools including Financial Model Builder, Cap Table Manager, Due Diligence Q&A Generator, and Analytics Suite',
            'interactive_tool',
            '/dataroom/tools',
            null,
            ARRAY['interactive', 'tools', 'dataroom', 'investor', 'professional'],
            false,
            jsonb_build_object(
                'tools_included', 7,
                'total_value', 218000,
                'access_url', '/dataroom/tools',
                'category', 'Interactive Tools'
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p8_modules.id,
            'Complete Data Room Template Library',
            'Access to 300+ professional templates worth ₹4,00,000+ including legal docs, financial models, operational templates, and compliance materials',
            'template_library',
            '/dataroom/templates',
            '/templates/p8/complete-library.zip',
            ARRAY['templates', 'dataroom', 'legal', 'financial', 'professional'],
            true,
            jsonb_build_object(
                'templates_count', 300,
                'total_value', 400000,
                'categories', 10,
                'formats', ARRAY['PDF', 'DOCX', 'PPTX', 'XLSX', 'AI', 'PSD']
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p8_modules.id,
            'VC & CFO Masterclass Series',
            'Expert video series featuring top VCs, CFOs, and investment bankers sharing insider insights on data room best practices',
            'video_series',
            null,
            '/videos/p8/masterclass-series.zip',
            ARRAY['video', 'training', 'masterclass', 'vc', 'cfo', 'expert'],
            true,
            jsonb_build_object(
                'total_duration', '15 hours',
                'video_count', 45,
                'total_value', 150000,
                'quality', '4K HD'
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p8_modules.id,
            'Advanced Analytics & Reporting Suite',
            'Comprehensive analytics templates, investor dashboards, and KPI tracking tools for professional data room management',
            'dashboard',
            '/dataroom/analytics',
            '/templates/p8/analytics-suite.zip',
            ARRAY['analytics', 'dashboard', 'reporting', 'kpi', 'investor'],
            true,
            jsonb_build_object(
                'dashboard_count', 20,
                'total_value', 80000,
                'integrations', ARRAY['Excel', 'Google Sheets', 'Tableau', 'Power BI'],
                'category', 'Analytics'
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p8_modules.id,
            'Legal & Compliance Framework',
            'Complete legal documentation framework with compliance checklists, contract templates, and regulatory guidance',
            'framework',
            null,
            '/templates/p8/legal-framework.zip',
            ARRAY['legal', 'compliance', 'contracts', 'regulatory', 'framework'],
            true,
            jsonb_build_object(
                'documents_count', 80,
                'total_value', 120000,
                'jurisdictions', ARRAY['India', 'US', 'Singapore', 'UK'],
                'category', 'Legal'
            ),
            now(),
            now()
        );
    END LOOP;
END $$;

-- Add comprehensive portfolio activity integration for P8
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
    'data_room_architecture',
    'Data Room Management',
    'business_model',
    'dataRoomArchitecture',
    '{
        "type": "object",
        "properties": {
            "dataRoomPlatform": {"type": "string", "title": "Data Room Platform", "required": true},
            "documentCategories": {"type": "array", "title": "Document Categories", "items": {"type": "string"}},
            "accessLevels": {
                "type": "object",
                "title": "Access Control Levels",
                "properties": {
                    "boardLevel": {"type": "number", "title": "Board Level Documents", "minimum": 0},
                    "investorLevel": {"type": "number", "title": "Investor Level Documents", "minimum": 0},
                    "managementLevel": {"type": "number", "title": "Management Level Documents", "minimum": 0}
                }
            },
            "securityMeasures": {"type": "array", "title": "Security Measures Implemented", "items": {"type": "string"}},
            "documentCount": {"type": "number", "title": "Total Documents", "minimum": 0},
            "lastUpdated": {"type": "string", "title": "Last Updated Date", "format": "date"},
            "completionPercentage": {"type": "number", "title": "Data Room Completion %", "minimum": 0, "maximum": 100}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'financial_model_development',
    'Financial Documentation',
    'financials',
    'financialModel',
    '{
        "type": "object",
        "properties": {
            "modelType": {"type": "string", "title": "Financial Model Type", "required": true},
            "projectionYears": {"type": "number", "title": "Projection Period (Years)", "minimum": 3, "maximum": 10},
            "revenueProjection": {
                "type": "object",
                "title": "Revenue Projections",
                "properties": {
                    "year1": {"type": "number", "title": "Year 1 Revenue (₹)", "minimum": 0},
                    "year3": {"type": "number", "title": "Year 3 Revenue (₹)", "minimum": 0},
                    "year5": {"type": "number", "title": "Year 5 Revenue (₹)", "minimum": 0},
                    "growthRate": {"type": "number", "title": "Average Growth Rate %", "minimum": 0}
                }
            },
            "fundingRequirement": {"type": "number", "title": "Total Funding Required (₹)", "minimum": 0},
            "burnRate": {"type": "number", "title": "Monthly Burn Rate (₹)", "minimum": 0},
            "runway": {"type": "number", "title": "Current Runway (Months)", "minimum": 0},
            "keyAssumptions": {"type": "array", "title": "Key Model Assumptions", "items": {"type": "string"}},
            "scenarioAnalysis": {"type": "boolean", "title": "Scenario Analysis Included"},
            "validationStatus": {"type": "string", "title": "Model Validation Status"}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'due_diligence_preparation',
    'Due Diligence',
    'legal_compliance',
    'dueDiligencePrep',
    '{
        "type": "object",
        "properties": {
            "documentAuditCompleted": {"type": "boolean", "title": "Document Audit Completed", "required": true},
            "legalReviewStatus": {"type": "string", "title": "Legal Review Status"},
            "redFlagsIdentified": {"type": "number", "title": "Red Flags Identified", "minimum": 0},
            "redFlagsResolved": {"type": "number", "title": "Red Flags Resolved", "minimum": 0},
            "qaPreparation": {
                "type": "object",
                "title": "Q&A Preparation",
                "properties": {
                    "questionsAnticipated": {"type": "number", "title": "Questions Anticipated", "minimum": 0},
                    "answersDocumented": {"type": "number", "title": "Answers Documented", "minimum": 0},
                    "expertConsultations": {"type": "number", "title": "Expert Consultations", "minimum": 0}
                }
            },
            "complianceAreas": {"type": "array", "title": "Compliance Areas Covered", "items": {"type": "string"}},
            "dataRoomReadiness": {"type": "number", "title": "Data Room Readiness %", "minimum": 0, "maximum": 100},
            "investorFeedback": {"type": "array", "title": "Investor Feedback Items", "items": {"type": "string"}},
            "preparationTimeline": {"type": "string", "title": "Preparation Timeline"}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'investor_relations_setup',
    'Investor Relations',
    'go_to_market',
    'investorRelations',
    '{
        "type": "object",
        "properties": {
            "investorDatabase": {
                "type": "object",
                "title": "Investor Database",
                "properties": {
                    "totalInvestors": {"type": "number", "title": "Total Investors Mapped", "minimum": 0},
                    "targetInvestors": {"type": "number", "title": "Target Investors", "minimum": 0},
                    "warmIntroductions": {"type": "number", "title": "Warm Introductions Available", "minimum": 0}
                }
            },
            "pitchMaterials": {
                "type": "object",
                "title": "Pitch Materials",
                "properties": {
                    "pitchDeckVersion": {"type": "string", "title": "Pitch Deck Version"},
                    "executiveSummary": {"type": "boolean", "title": "Executive Summary Ready"},
                    "demoVideos": {"type": "number", "title": "Demo Videos Created", "minimum": 0},
                    "caseStudies": {"type": "number", "title": "Case Studies Documented", "minimum": 0}
                }
            },
            "communicationStrategy": {"type": "string", "title": "Investor Communication Strategy"},
            "meetingsScheduled": {"type": "number", "title": "Investor Meetings Scheduled", "minimum": 0},
            "followUpSystem": {"type": "string", "title": "Follow-up System Implemented"},
            "fundingTimeline": {"type": "string", "title": "Expected Funding Timeline"}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'cap_table_management',
    'Financial Documentation',
    'financials',
    'capTableManagement',
    '{
        "type": "object",
        "properties": {
            "currentCapTable": {
                "type": "object",
                "title": "Current Cap Table Structure",
                "properties": {
                    "foundersEquity": {"type": "number", "title": "Founders Equity %", "minimum": 0, "maximum": 100},
                    "employeePool": {"type": "number", "title": "Employee Pool %", "minimum": 0, "maximum": 100},
                    "investorEquity": {"type": "number", "title": "Investor Equity %", "minimum": 0, "maximum": 100},
                    "totalShares": {"type": "number", "title": "Total Shares Outstanding", "minimum": 0}
                }
            },
            "vestingSchedules": {"type": "boolean", "title": "Vesting Schedules Documented"},
            "optionPlan": {"type": "boolean", "title": "Employee Option Plan Created"},
            "futureRounds": {
                "type": "object",
                "title": "Future Funding Rounds",
                "properties": {
                    "nextRoundSize": {"type": "number", "title": "Next Round Size (₹)", "minimum": 0},
                    "dilutionProjected": {"type": "number", "title": "Projected Dilution %", "minimum": 0, "maximum": 50},
                    "investorType": {"type": "string", "title": "Target Investor Type"}
                }
            },
            "complianceStatus": {"type": "string", "title": "Cap Table Compliance Status"},
            "shareholderAgreements": {"type": "boolean", "title": "Shareholder Agreements Updated"},
            "boardComposition": {"type": "string", "title": "Board Composition Structure"}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'exit_strategy_planning',
    'Strategic Planning',
    'business_model',
    'exitStrategy',
    '{
        "type": "object",
        "properties": {
            "exitOptions": {"type": "array", "title": "Potential Exit Options", "items": {"type": "string"}, "required": true},
            "timelineToExit": {"type": "number", "title": "Expected Timeline to Exit (Years)", "minimum": 3, "maximum": 15},
            "targetValuation": {"type": "number", "title": "Target Exit Valuation (₹)", "minimum": 0},
            "strategicBuyers": {
                "type": "object",
                "title": "Strategic Buyers Analysis",
                "properties": {
                    "identifiedBuyers": {"type": "number", "title": "Strategic Buyers Identified", "minimum": 0},
                    "relationships": {"type": "number", "title": "Existing Relationships", "minimum": 0},
                    "synergies": {"type": "array", "title": "Potential Synergies", "items": {"type": "string"}}
                }
            },
            "ipoReadiness": {
                "type": "object",
                "title": "IPO Readiness Assessment",
                "properties": {
                    "revenueRequirement": {"type": "number", "title": "IPO Revenue Requirement (₹)", "minimum": 0},
                    "complianceGap": {"type": "number", "title": "Compliance Gap %", "minimum": 0, "maximum": 100},
                    "preparationTime": {"type": "number", "title": "Estimated Preparation Time (Months)", "minimum": 12}
                }
            },
            "exitPreparation": {"type": "string", "title": "Exit Preparation Strategy"},
            "advisorsEngaged": {"type": "boolean", "title": "Exit Advisors Engaged"}
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
    'P8 Complete Content Status' as verification,
    COUNT(DISTINCT l.id) as total_lessons,
    COUNT(DISTINCT CASE WHEN l.resources IS NOT NULL THEN l.id END) as lessons_with_resources,
    COUNT(DISTINCT r.id) as resource_entries,
    COUNT(DISTINCT at.id) as activity_types
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
LEFT JOIN "Resource" r ON r."moduleId" = m.id
LEFT JOIN "ActivityType" at ON at.category IN ('Data Room Management', 'Financial Documentation', 'Due Diligence', 'Investor Relations', 'Strategic Planning')
WHERE p.code = 'P8';

SELECT 'P8 Template Value Summary' as summary,
       SUM((l.metadata->>'total_template_value')::numeric) as total_template_value
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P8' AND l.metadata->>'total_template_value' IS NOT NULL;