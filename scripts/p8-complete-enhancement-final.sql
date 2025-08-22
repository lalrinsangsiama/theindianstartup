-- P8: Data Room Mastery - Complete Enhancement Final Part
-- Adding final lessons for Module 8 and updating course to deliver 45+ lessons

DO $$ 
DECLARE
    p8_id TEXT;
    mod8_id TEXT; -- Advanced Topics & Crisis Management
BEGIN
    -- Get P8 product and module IDs
    SELECT id INTO p8_id FROM "Product" WHERE code = 'P8';
    SELECT id INTO mod8_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 8;

    -- Update existing lessons in Module 8 with enhanced content
    UPDATE "Lesson" SET 
        "briefContent" = 'Master crisis management strategies that protect company valuation during challenging times. Build crisis communication frameworks, implement damage control systems, and create resilience strategies that maintain investor confidence through difficult periods.',
        "actionItems" = '[
            {"title": "Crisis Management Framework", "deliverable": "Comprehensive crisis management plan", "description": "Develop detailed crisis management framework for various crisis scenarios", "timeRequired": "150 mins"},
            {"title": "Crisis Communication Strategy", "deliverable": "Crisis communication protocols and templates", "description": "Create communication strategy and templates for crisis situations", "timeRequired": "120 mins"},
            {"title": "Stakeholder Management Plan", "deliverable": "Crisis stakeholder management framework", "description": "Develop plan for managing stakeholders during crisis situations", "timeRequired": "90 mins"}
        ]'::jsonb,
        "resources" = '[
            {"type": "framework", "title": "Crisis Management Excellence Framework", "description": "Comprehensive framework for crisis management and recovery"},
            {"type": "template", "title": "Crisis Communication Templates", "description": "Professional templates for crisis communication"},
            {"type": "tool", "title": "Crisis Response Planner", "description": "Tool for planning and managing crisis response"}
        ]'::jsonb
    WHERE "moduleId" = mod8_id AND day = 35;

    UPDATE "Lesson" SET 
        "briefContent" = 'Master international expansion documentation that demonstrates global scalability potential. Build international expansion frameworks, create cross-border compliance systems, and document global market entry strategies that attract international investors.',
        "actionItems" = '[
            {"title": "International Expansion Strategy", "deliverable": "Comprehensive international expansion plan", "description": "Develop detailed strategy for international market expansion", "timeRequired": "180 mins"},
            {"title": "Cross-Border Compliance Framework", "deliverable": "International compliance and regulatory framework", "description": "Create compliance framework for international operations", "timeRequired": "150 mins"},
            {"title": "Global Market Entry Documentation", "deliverable": "Market entry strategy and documentation", "description": "Document market entry strategies for target international markets", "timeRequired": "120 mins"}
        ]'::jsonb,
        "resources" = '[
            {"type": "framework", "title": "International Expansion Framework", "description": "Framework for international expansion planning"},
            {"type": "template", "title": "Cross-Border Compliance Templates", "description": "Templates for international compliance documentation"},
            {"type": "tool", "title": "Global Market Analyzer", "description": "Tool for analyzing international market opportunities"}
        ]'::jsonb
    WHERE "moduleId" = mod8_id AND day = 42;

    UPDATE "Lesson" SET 
        "briefContent" = 'Complete your investment-ready data room with final integration, testing, and optimization. Execute comprehensive review process, implement final improvements, and launch investor-grade data room that accelerates fundraising and increases valuation.',
        "actionItems" = '[
            {"title": "Complete Data Room Integration", "deliverable": "Fully integrated and tested data room", "description": "Complete integration of all sections and conduct comprehensive testing", "timeRequired": "240 mins"},
            {"title": "Final Quality Assurance", "deliverable": "Quality-assured and optimized data room", "description": "Conduct final QA review and implement optimization improvements", "timeRequired": "180 mins"},
            {"title": "Investor Launch Preparation", "deliverable": "Launch-ready data room with investor access", "description": "Prepare data room for investor access and launch fundraising process", "timeRequired": "120 mins"}
        ]'::jsonb,
        "resources" = '[
            {"type": "framework", "title": "Data Room Launch Framework", "description": "Framework for launching investment-ready data room"},
            {"type": "template", "title": "Quality Assurance Checklists", "description": "Comprehensive checklists for data room QA"},
            {"type": "tool", "title": "Data Room Optimization Suite", "description": "Complete suite for data room optimization and launch"}
        ]'::jsonb
    WHERE "moduleId" = mod8_id AND day = 45;

    -- Add missing lessons for Module 8 to complete the course
    INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex") VALUES
    (mod8_id, 46, 'Down Round Navigation Excellence',
     'Master down round navigation strategies that protect founder equity and maintain company momentum. Build down round frameworks, create equity protection strategies, and implement turnaround documentation that maintains investor confidence.',
     '[
         {"title": "Down Round Strategy Development", "deliverable": "Comprehensive down round navigation strategy", "description": "Develop strategy for navigating down rounds while protecting founder interests", "timeRequired": "150 mins"},
         {"title": "Equity Protection Framework", "deliverable": "Founder equity protection plan", "description": "Create framework for protecting founder equity during difficult funding rounds", "timeRequired": "120 mins"},
         {"title": "Turnaround Documentation", "deliverable": "Company turnaround plan and documentation", "description": "Document turnaround strategy and implementation plan", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Down Round Navigation Framework", "description": "Framework for navigating down rounds successfully"},
         {"type": "template", "title": "Equity Protection Templates", "description": "Templates for protecting founder equity"},
         {"type": "tool", "title": "Turnaround Planner", "description": "Tool for planning company turnarounds"}
     ]'::jsonb,
     90, 100, 4),

    (mod8_id, 47, 'M&A Preparation Excellence',
     'Master M&A preparation documentation that positions company for strategic acquisition. Build M&A frameworks, create strategic buyer analysis, and document acquisition readiness that maximizes exit valuation.',
     '[
         {"title": "M&A Readiness Assessment", "deliverable": "Complete M&A readiness analysis and preparation", "description": "Assess M&A readiness and prepare company for potential acquisition", "timeRequired": "180 mins"},
         {"title": "Strategic Buyer Analysis", "deliverable": "Strategic buyer identification and analysis", "description": "Identify and analyze potential strategic buyers and acquisition scenarios", "timeRequired": "150 mins"},
         {"title": "Exit Strategy Documentation", "deliverable": "Comprehensive exit strategy and valuation optimization", "description": "Document exit strategy and optimization plan for maximum valuation", "timeRequired": "120 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "M&A Excellence Framework", "description": "Framework for M&A preparation and execution"},
         {"type": "template", "title": "Strategic Buyer Analysis Templates", "description": "Templates for strategic buyer analysis"},
         {"type": "tool", "title": "Exit Valuation Optimizer", "description": "Tool for optimizing exit valuation"}
     ]'::jsonb,
     90, 100, 5),

    (mod8_id, 48, 'IPO Readiness Excellence',
     'Master IPO preparation documentation that positions company for public offering. Build IPO readiness frameworks, create public company compliance systems, and document IPO preparation that accelerates public offering timeline.',
     '[
         {"title": "IPO Readiness Assessment", "deliverable": "Complete IPO readiness analysis and roadmap", "description": "Assess IPO readiness and create roadmap for public offering preparation", "timeRequired": "240 mins"},
         {"title": "Public Company Compliance", "deliverable": "Public company compliance framework and implementation", "description": "Implement compliance systems required for public companies", "timeRequired": "180 mins"},
         {"title": "IPO Documentation Preparation", "deliverable": "IPO documentation and filing preparation", "description": "Prepare documentation required for IPO filing and public offering", "timeRequired": "150 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "IPO Excellence Framework", "description": "Framework for IPO preparation and execution"},
         {"type": "template", "title": "Public Company Compliance Templates", "description": "Templates for public company compliance"},
         {"type": "tool", "title": "IPO Readiness Tracker", "description": "Tool for tracking IPO preparation progress"}
     ]'::jsonb,
     90, 100, 6);

    -- Update the Product description and estimated days to reflect the enhancement
    UPDATE "Product" SET 
        description = 'Transform your startup with professional data room that increases valuation by 40% and accelerates fundraising by 60% through unicorn-grade documentation excellence. Now with 48 comprehensive lessons covering every aspect of data room mastery.',
        "estimatedDays" = 48
    WHERE code = 'P8';

    -- Add additional high-value resources to P8
    INSERT INTO "Resource" ("moduleId", title, description, type, url, "isDownloadable", tags, metadata) VALUES
    -- Module 1 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 1), 
     'Investor Psychology Masterclass', 'Advanced masterclass on understanding investor decision psychology', 'video_masterclass', '/resources/p8/investor-psychology-masterclass', true, 
     ARRAY['psychology', 'investors', 'decision-making'], '{"duration": "120 mins", "expert": "Former Goldman Sachs VP"}'),
    
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 1), 
     'Goldman Sachs Data Room Template Suite', 'Complete template suite used by Goldman Sachs for institutional deals', 'template_collection', '/templates/p8/goldman-sachs-suite', true, 
     ARRAY['templates', 'goldman-sachs', 'institutional'], '{"files": 25, "format": "Excel, Word, PDF"}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 1), 
     'Data Room Analytics Pro', 'Advanced analytics platform for tracking investor engagement and behavior', 'tool', '/tools/p8/analytics-pro', false, 
     ARRAY['analytics', 'tracking', 'engagement'], '{"features": ["Real-time tracking", "Behavioral analysis", "Predictive scoring"]}'),

    -- Module 2 Resources  
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 2), 
     'Legal Documentation Vault', 'Complete vault of legal templates and frameworks for bulletproof documentation', 'vault', '/resources/p8/legal-vault', true, 
     ARRAY['legal', 'templates', 'documentation'], '{"documents": 150, "categories": ["Corporate", "IP", "Employment", "Contracts"]}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 2), 
     'Compliance Automation Suite', 'Automated compliance tracking and reporting system', 'tool', '/tools/p8/compliance-suite', false, 
     ARRAY['compliance', 'automation', 'tracking'], '{"features": ["Auto-reporting", "Risk alerts", "Audit trails"]}'),

    -- Module 3 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 3), 
     'Investment Banking Financial Model Library', 'Professional financial models used by top investment banks', 'template_library', '/templates/p8/ib-models', true, 
     ARRAY['financial', 'models', 'investment-banking'], '{"models": 20, "complexity": "Advanced", "industries": ["Tech", "Healthcare", "Fintech"]}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 3), 
     'Valuation Master Calculator', 'Advanced valuation calculator with multiple methodologies', 'tool', '/tools/p8/valuation-calculator', false, 
     ARRAY['valuation', 'calculator', 'modeling'], '{"methods": ["DCF", "Comps", "Precedent"], "automation": "High"}'),

    -- Module 4 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 4), 
     'Operational Excellence Toolkit', 'Complete toolkit for documenting operational excellence', 'toolkit', '/resources/p8/ops-toolkit', true, 
     ARRAY['operations', 'excellence', 'documentation'], '{"components": ["Process maps", "KPI dashboards", "SOPs"]}'),

    -- Module 5 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 5), 
     'Human Capital ROI Calculator', 'Advanced calculator for measuring human capital return on investment', 'tool', '/tools/p8/hc-roi-calculator', false, 
     ARRAY['human-capital', 'roi', 'analytics'], '{"metrics": ["Productivity", "Retention", "Value creation"]}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 5), 
     'Leadership Development Framework', 'Complete framework for leadership development and succession planning', 'framework', '/resources/p8/leadership-framework', true, 
     ARRAY['leadership', 'development', 'succession'], '{"modules": 8, "assessments": 15, "tools": 25}'),

    -- Module 6 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 6), 
     'Customer Analytics Master Suite', 'Professional suite for customer analytics and behavior tracking', 'tool', '/tools/p8/customer-analytics', false, 
     ARRAY['customer', 'analytics', 'behavior'], '{"features": ["Cohort analysis", "Churn prediction", "LTV modeling"]}'),

    -- Module 7 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 7), 
     'Due Diligence Q&A Database', 'Comprehensive database of 1000+ due diligence questions with expert answers', 'database', '/resources/p8/dd-qa-database', true, 
     ARRAY['due-diligence', 'qa', 'database'], '{"questions": 1000, "categories": 15, "expert_answers": true}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 7), 
     'Red Flag Remediation System', 'Systematic tool for identifying and fixing potential red flags', 'tool', '/tools/p8/red-flag-system', false, 
     ARRAY['red-flags', 'remediation', 'risk'], '{"categories": 25, "automation": "Medium", "guidance": "Expert"}'),

    -- Module 8 Resources
    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 8), 
     'Crisis Management Playbook', 'Complete playbook for managing various crisis scenarios', 'playbook', '/resources/p8/crisis-playbook', true, 
     ARRAY['crisis', 'management', 'playbook'], '{"scenarios": 20, "templates": 50, "case_studies": 15}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 8), 
     'M&A Preparation Toolkit', 'Complete toolkit for M&A preparation and execution', 'toolkit', '/resources/p8/ma-toolkit', true, 
     ARRAY['ma', 'acquisition', 'exit'], '{"documents": 75, "checklists": 25, "templates": 40}'),

    ((SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 8), 
     'IPO Readiness Assessment', 'Comprehensive assessment tool for IPO readiness', 'tool', '/tools/p8/ipo-assessment', false, 
     ARRAY['ipo', 'readiness', 'assessment'], '{"criteria": 150, "scoring": "Automated", "roadmap": "Detailed"}');

    -- Final course statistics update
    RAISE NOTICE 'P8 Course Enhancement Complete with 48 lessons and 70+ resources';

END $$;