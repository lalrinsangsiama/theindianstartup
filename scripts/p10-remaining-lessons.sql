-- Add remaining P10 lessons to complete the 60-lesson structure

-- Module 3: Filing Your Patent in India (Add Days 10-15)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l10-form-workshop', 'p10-m3-filing-india', 10, 'Form Filling Workshop (Step-by-Step)', 
'Complete workshop on filling all patent forms with live examples and screenshots',
'[{"title": "Complete Form 1", "description": "Fill out complete Form 1 for your invention", "timeRequired": 60, "deliverable": "Completed Form 1"}]'::jsonb,
'[{"type": "form", "title": "Form 1-31 Templates", "url": "/templates/p10/forms"}]'::jsonb,
150, 10, NOW(), NOW()),

('p10-l11-online-filing', 'p10-m3-filing-india', 11, 'Online Filing Demonstration', 
'Navigate the online filing system with confidence using step-by-step guides',
'[{"title": "Practice E-filing", "description": "Complete practice e-filing session", "timeRequired": 90, "deliverable": "E-filing walkthrough"}]'::jsonb,
'[{"type": "video", "title": "E-filing Tutorial", "url": "/videos/p10/e-filing"}]'::jsonb,
100, 11, NOW(), NOW()),

('p10-l12-startup-benefits', 'p10-m3-filing-india', 12, 'Startup Benefits and Free Support', 
'Access 80% fee reduction and free patent attorney support through government schemes',
'[{"title": "Apply for Benefits", "description": "Submit application for startup patent benefits", "timeRequired": 45, "deliverable": "Benefits application"}]'::jsonb,
'[{"type": "form", "title": "Startup Certificate", "url": "/forms/p10/startup-cert"}]'::jsonb,
100, 12, NOW(), NOW()),

('p10-l13-patent-agents', 'p10-m3-filing-india', 13, 'Working with Patent Professionals', 
'Choose and work effectively with patent agents and attorneys',
'[{"title": "Select Patent Agent", "description": "Research and shortlist patent professionals", "timeRequired": 60, "deliverable": "Agent selection report"}]'::jsonb,
'[{"type": "directory", "title": "Agent Directory", "url": "/directories/p10/agents"}]'::jsonb,
100, 13, NOW(), NOW()),

('p10-l14-post-filing', 'p10-m3-filing-india', 14, 'After Filing - What Next?', 
'Manage your patent application through examination to grant',
'[{"title": "Create Timeline", "description": "Set up post-filing timeline and reminders", "timeRequired": 30, "deliverable": "Filing timeline"}]'::jsonb,
'[{"type": "template", "title": "Status Tracking", "url": "/templates/p10/tracking"}]'::jsonb,
100, 14, NOW(), NOW()),

('p10-l15-case-studies', 'p10-m3-filing-india', 15, 'Indian Patent Success Stories', 
'Learn from successful Indian patent case studies and implementation strategies',
'[{"title": "Analyze Case Study", "description": "Complete analysis of successful patent case", "timeRequired": 45, "deliverable": "Case study analysis"}]'::jsonb,
'[{"type": "cases", "title": "Startup Patents", "url": "/cases/p10/success-stories"}]'::jsonb,
100, 15, NOW(), NOW());

-- Module 4: Advanced Patent Drafting (Add Days 17-20)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l17-biotech-pharma', 'p10-m4-advanced-drafting', 17, 'Biotech and Pharma Patents', 
'Master pharmaceutical and biotechnology patent strategies including Section 3(d) navigation',
'[{"type": "guidelines", "title": "Biotech Guidelines", "url": "/guides/p10/biotech"}]'::jsonb,
150, 17, NOW(), NOW()),

('p10-l18-hardware-electronics', 'p10-m4-advanced-drafting', 18, 'Hardware and Electronics Patents', 
'Draft comprehensive hardware and electronics patent applications',
'[{"type": "templates", "title": "System Claims", "url": "/templates/p10/hardware"}]'::jsonb,
100, 18, NOW(), NOW()),

('p10-l19-ai-ml-patents', 'p10-m4-advanced-drafting', 19, 'AI/ML Patent Strategies', 
'Protect artificial intelligence and machine learning innovations',
'[{"type": "templates", "title": "AI Claims Template", "url": "/templates/p10/ai-claims"}]'::jsonb,
150, 19, NOW(), NOW()),

('p10-l20-emerging-tech', 'p10-m4-advanced-drafting', 20, 'Emerging Technology Patents', 
'Navigate patent strategies for blockchain, quantum computing, and cutting-edge technologies',
'[{"type": "templates", "title": "Blockchain Claims", "url": "/templates/p10/blockchain"}]'::jsonb,
150, 20, NOW(), NOW());

-- Module 5: International Patent Strategy (Add Days 22-30)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l22-country-selection', 'p10-m5-international', 22, 'Strategic Country Selection', 
'Choose the right countries for patent protection using market analysis',
'[{"type": "tools", "title": "Country Selection Tool", "url": "/tools/p10/country-matrix"}]'::jsonb,
100, 22, NOW(), NOW()),

('p10-l23-us-strategy', 'p10-m5-international', 23, 'US Patent Strategy', 
'Navigate the US patent system effectively with USPTO best practices',
'[{"type": "guides", "title": "USPTO Guide", "url": "/guides/p10/uspto"}]'::jsonb,
150, 23, NOW(), NOW()),

('p10-l24-europe-strategy', 'p10-m5-international', 24, 'European Patent Strategy', 
'Master European patent filing and validation strategies',
'[{"type": "guides", "title": "EPO Guide", "url": "/guides/p10/epo"}]'::jsonb,
150, 24, NOW(), NOW()),

('p10-l25-china-strategy', 'p10-m5-international', 25, 'China Patent Strategy', 
'Protect innovations in the Chinese market with CNIPA strategies',
'[{"type": "guides", "title": "China IP Guide", "url": "/guides/p10/china"}]'::jsonb,
150, 25, NOW(), NOW()),

('p10-l26-japan-korea', 'p10-m5-international', 26, 'Japan and Korea Strategies', 
'Navigate Japanese and Korean patent systems effectively',
'[{"type": "guides", "title": "JPO Guide", "url": "/guides/p10/japan"}]'::jsonb,
100, 26, NOW(), NOW()),

('p10-l27-translation', 'p10-m5-international', 27, 'Translation and Localization', 
'Manage patent translations effectively with quality control',
'[{"type": "vendors", "title": "Translation Services", "url": "/directories/p10/translators"}]'::jsonb,
100, 27, NOW(), NOW()),

('p10-l28-priority-management', 'p10-m5-international', 28, 'Priority and Timeline Management', 
'Track and manage international filing deadlines systematically',
'[{"type": "tools", "title": "Deadline Calculator", "url": "/tools/p10/deadlines"}]'::jsonb,
100, 28, NOW(), NOW()),

('p10-l29-cost-optimization', 'p10-m5-international', 29, 'International Cost Optimization', 
'Optimize costs across multiple jurisdictions with strategic planning',
'[{"type": "calculators", "title": "Cost Optimizer", "url": "/tools/p10/cost-optimizer"}]'::jsonb,
100, 29, NOW(), NOW()),

('p10-l30-global-portfolio', 'p10-m5-international', 30, 'Building Global Patent Portfolio', 
'Design and execute global portfolio strategy with competitive positioning',
'[{"type": "frameworks", "title": "Portfolio Framework", "url": "/frameworks/p10/global"}]'::jsonb,
150, 30, NOW(), NOW());

-- Continue with remaining modules...
-- Module 6: Patent Prosecution (Add Days 32-35)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l32-response-techniques', 'p10-m6-prosecution', 32, 'Advanced Response Techniques', 
'Craft powerful responses to overcome patent objections effectively',
'[{"type": "templates", "title": "Response Templates", "url": "/templates/p10/responses"}]'::jsonb,
150, 32, NOW(), NOW()),

('p10-l33-examiner-interviews', 'p10-m6-prosecution', 33, 'Examiner Interviews and Hearings', 
'Navigate examiner interviews and hearings successfully',
'[{"type": "guides", "title": "Interview Preparation", "url": "/guides/p10/interviews"}]'::jsonb,
100, 33, NOW(), NOW()),

('p10-l34-opposition-proceedings', 'p10-m6-prosecution', 34, 'Opposition Proceedings', 
'Handle pre-grant and post-grant opposition proceedings effectively',
'[{"type": "templates", "title": "Opposition Notice", "url": "/templates/p10/opposition"}]'::jsonb,
100, 34, NOW(), NOW()),

('p10-l35-grant-procedures', 'p10-m6-prosecution', 35, 'Grant and Post-Grant Procedures', 
'Manage patent grant and post-grant requirements systematically',
'[{"type": "checklists", "title": "Grant Checklist", "url": "/checklists/p10/grant"}]'::jsonb,
100, 35, NOW(), NOW());

-- Module 7: Portfolio Management (Add Days 37-40)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l37-patent-mining', 'p10-m7-portfolio', 37, 'Patent Mining and Harvesting', 
'Systematically identify and capture patentable innovations from R&D',
'[{"type": "templates", "title": "Mining Process", "url": "/templates/p10/mining"}]'::jsonb,
100, 37, NOW(), NOW()),

('p10-l38-landscape-analysis', 'p10-m7-portfolio', 38, 'Patent Landscape Analysis', 
'Analyze patent landscapes for strategic insights and opportunities',
'[{"type": "tools", "title": "Landscape Tools", "url": "/tools/p10/landscape"}]'::jsonb,
100, 38, NOW(), NOW()),

('p10-l39-portfolio-optimization', 'p10-m7-portfolio', 39, 'Portfolio Optimization', 
'Optimize portfolio for maximum value and minimum cost',
'[{"type": "calculators", "title": "Portfolio ROI", "url": "/tools/p10/portfolio-roi"}]'::jsonb,
100, 39, NOW(), NOW()),

('p10-l40-ip-governance', 'p10-m7-portfolio', 40, 'IP Governance and Management', 
'Establish robust IP governance framework for scaling organizations',
'[{"type": "templates", "title": "IP Policy", "url": "/templates/p10/ip-policy"}]'::jsonb,
100, 40, NOW(), NOW());

-- Module 8: Monetization (Add Days 42-45)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l42-licensing', 'p10-m8-monetization', 42, 'Patent Licensing Strategies', 
'Create and negotiate profitable licensing deals with systematic approach',
'[{"type": "templates", "title": "License Agreement", "url": "/templates/p10/licensing"}]'::jsonb,
150, 42, NOW(), NOW()),

('p10-l43-patent-sales', 'p10-m8-monetization', 43, 'Patent Sales and Acquisitions', 
'Execute patent sales and acquisitions successfully with proper due diligence',
'[{"type": "checklists", "title": "Sales Package", "url": "/checklists/p10/sales"}]'::jsonb,
100, 43, NOW(), NOW()),

('p10-l44-partnerships', 'p10-m8-monetization', 44, 'Strategic Partnerships and Collaborations', 
'Structure IP-based strategic partnerships for mutual benefit',
'[{"type": "templates", "title": "JDA Template", "url": "/templates/p10/partnerships"}]'::jsonb,
100, 44, NOW(), NOW()),

('p10-l45-revenue-models', 'p10-m8-monetization', 45, 'Patent Revenue Generation Models', 
'Implement diverse patent revenue strategies beyond traditional licensing',
'[{"type": "models", "title": "Revenue Models", "url": "/models/p10/revenue"}]'::jsonb,
150, 45, NOW(), NOW());

-- Module 9: Litigation (Add Days 47-50)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l47-litigation-process', 'p10-m9-litigation', 47, 'Patent Litigation Process', 
'Navigate patent litigation from filing to judgment with strategic planning',
'[{"type": "guides", "title": "Litigation Guide", "url": "/guides/p10/litigation"}]'::jsonb,
100, 47, NOW(), NOW()),

('p10-l48-defense-strategies', 'p10-m9-litigation', 48, 'Defense Against Patent Assertions', 
'Defend against patent infringement claims with proven strategies',
'[{"type": "strategies", "title": "Defense Playbook", "url": "/strategies/p10/defense"}]'::jsonb,
100, 48, NOW(), NOW()),

('p10-l49-settlement', 'p10-m9-litigation', 49, 'Settlement and Negotiation', 
'Negotiate favorable settlements and agreements in IP disputes',
'[{"type": "templates", "title": "Settlement Agreement", "url": "/templates/p10/settlement"}]'::jsonb,
100, 49, NOW(), NOW()),

('p10-l50-enforcement', 'p10-m9-litigation', 50, 'Global Enforcement Strategies', 
'Enforce patents globally across multiple channels and jurisdictions',
'[{"type": "guides", "title": "Customs Enforcement", "url": "/guides/p10/customs"}]'::jsonb,
100, 50, NOW(), NOW());

-- Module 10: Industry-Specific (Add Days 52-55)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l52-healthtech', 'p10-m10-industry-specific', 52, 'HealthTech and MedTech Patents', 
'Protect healthcare innovations with regulatory considerations',
'[{"type": "guidelines", "title": "Medical Device Patents", "url": "/guides/p10/medtech"}]'::jsonb,
150, 52, NOW(), NOW()),

('p10-l53-cleantech', 'p10-m10-industry-specific', 53, 'CleanTech and Sustainability Patents', 
'Leverage patents for sustainable innovation with green technology focus',
'[{"type": "programs", "title": "Green Channel", "url": "/programs/p10/green"}]'::jsonb,
100, 53, NOW(), NOW()),

('p10-l54-iot-connectivity', 'p10-m10-industry-specific', 54, 'IoT and Connectivity Patents', 
'Protect IoT and connectivity innovations with standard essential patents',
'[{"type": "standards", "title": "IoT Standards", "url": "/standards/p10/iot"}]'::jsonb,
100, 54, NOW(), NOW()),

('p10-l55-traditional-industries', 'p10-m10-industry-specific', 55, 'Traditional Industry Innovations', 
'Patent strategies for manufacturing, chemicals, and traditional industries',
'[{"type": "templates", "title": "Process Claims", "url": "/templates/p10/process"}]'::jsonb,
100, 55, NOW(), NOW());

-- Module 11: Government Support (Add Days 57-58)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "resources", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
('p10-l57-state-schemes', 'p10-m11-government-support', 57, 'State-wise Patent Support Programs', 
'Leverage state government patent incentives and funding programs',
'[{"type": "directory", "title": "State Schemes", "url": "/directories/p10/state-schemes"}]'::jsonb,
100, 57, NOW(), NOW()),

('p10-l58-international-funding', 'p10-m11-government-support', 58, 'International Filing Support', 
'Get funding for international patent filings through government programs',
'[{"type": "programs", "title": "International Support", "url": "/programs/p10/international"}]'::jsonb,
100, 58, NOW(), NOW());

-- Verify the final count
DO $$
DECLARE
    v_lesson_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_lesson_count 
    FROM "Lesson" 
    WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P10')
    );
    
    RAISE NOTICE 'Total P10 lessons after addition: %', v_lesson_count;
    
    IF v_lesson_count >= 58 THEN
        RAISE NOTICE '✅ P10 Enhanced content successfully expanded';
    ELSE
        RAISE WARNING '⚠️ P10 lesson count still below target: %', v_lesson_count;
    END IF;
END $$;