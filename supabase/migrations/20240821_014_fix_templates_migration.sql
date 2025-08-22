-- =====================================================
-- Fix Templates Migration - Corrected Column References
-- =====================================================

-- Add P2 Incorporation Templates (12 new templates)
DO $$
DECLARE
    p2_module_ids TEXT[];
BEGIN
    -- Get P2 module IDs (fix ambiguous column reference)
    SELECT ARRAY_AGG(m.id) INTO p2_module_ids 
    FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id 
    WHERE p.code = 'P2';

    -- Insert P2 templates if modules exist
    IF array_length(p2_module_ids, 1) > 0 THEN
        INSERT INTO "Resource" (id, "moduleId", title, description, type, "fileUrl", tags, "isDownloadable", metadata) VALUES
        
        (gen_random_uuid(), p2_module_ids[1], 'Incorporation Application Form', 'Interactive form for MCA company incorporation with validation and document checklist', 'template', '/templates/p2/01-incorporation-application-form.html', ARRAY['incorporation', 'MCA', 'legal', 'forms'], true, '{"category": "legal", "difficulty": "intermediate", "estimatedTime": "45 minutes", "format": "HTML"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[2], p2_module_ids[1]), 'MOA & AOA Generator', 'Professional Memorandum and Articles of Association generator with legal compliance', 'template', '/templates/p2/02-memorandum-articles-generator.html', ARRAY['MOA', 'AOA', 'legal', 'incorporation'], true, '{"category": "legal", "difficulty": "advanced", "estimatedTime": "60 minutes", "format": "HTML"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[2], p2_module_ids[1]), 'Board Resolution Templates', 'Complete board resolution templates for various corporate actions', 'template', '/templates/p2/03-board-resolution-template.docx', ARRAY['board', 'resolution', 'governance'], true, '{"category": "governance", "difficulty": "intermediate", "estimatedTime": "30 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[3], p2_module_ids[1]), 'Director Consent Letters', 'Director consent and declaration templates for incorporation', 'template', '/templates/p2/04-directors-consent-letter.pdf', ARRAY['directors', 'consent', 'legal'], true, '{"category": "legal", "difficulty": "beginner", "estimatedTime": "20 minutes", "format": "PDF"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[4], p2_module_ids[1]), 'GST Registration Application', 'Complete GST registration application with supporting documents checklist', 'template', '/templates/p2/05-gst-registration-application.xlsx', ARRAY['GST', 'tax', 'registration'], true, '{"category": "tax", "difficulty": "intermediate", "estimatedTime": "45 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[4], p2_module_ids[1]), 'PF & ESI Registration Forms', 'Employee provident fund and ESI registration templates', 'template', '/templates/p2/06-pf-esi-registration-forms.pdf', ARRAY['PF', 'ESI', 'employee', 'compliance'], true, '{"category": "compliance", "difficulty": "intermediate", "estimatedTime": "40 minutes", "format": "PDF"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[5], p2_module_ids[1]), 'Bank Account Opening Kit', 'Complete documentation for corporate bank account opening', 'template', '/templates/p2/07-bank-account-opening-kit.docx', ARRAY['banking', 'account', 'corporate'], true, '{"category": "banking", "difficulty": "beginner", "estimatedTime": "30 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[6], p2_module_ids[1]), 'Trademark Application Form', 'Trademark registration application with classification guide', 'template', '/templates/p2/08-trademark-application-form.pdf', ARRAY['trademark', 'IP', 'branding'], true, '{"category": "IP", "difficulty": "intermediate", "estimatedTime": "50 minutes", "format": "PDF"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[7], p2_module_ids[1]), 'Compliance Calendar Tracker', 'Annual compliance calendar with automated reminders', 'template', '/templates/p2/09-compliance-calendar-tracker.xlsx', ARRAY['compliance', 'calendar', 'tracking'], true, '{"category": "compliance", "difficulty": "intermediate", "estimatedTime": "35 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[8], p2_module_ids[1]), 'Employee Agreement Templates', 'Complete employment documentation including contracts and policies', 'template', '/templates/p2/10-employee-agreement-templates.docx', ARRAY['employment', 'HR', 'contracts'], true, '{"category": "HR", "difficulty": "intermediate", "estimatedTime": "40 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[9], p2_module_ids[1]), 'Annual Return Form MGT-7', 'Annual return preparation with automated calculations', 'template', '/templates/p2/11-annual-return-form-mgt7.xlsx', ARRAY['annual return', 'MCA', 'compliance'], true, '{"category": "compliance", "difficulty": "advanced", "estimatedTime": "60 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p2_module_ids[10], p2_module_ids[1]), 'Startup India Registration Kit', 'Complete DPIIT recognition application with benefits guide', 'template', '/templates/p2/12-startup-india-registration-kit.pdf', ARRAY['startup india', 'DPIIT', 'benefits'], true, '{"category": "government", "difficulty": "intermediate", "estimatedTime": "55 minutes", "format": "PDF"}');
    END IF;
    
END $$;

-- Add P3 Funding Templates (12 new templates)
DO $$
DECLARE
    p3_module_ids TEXT[];
BEGIN
    -- Get P3 module IDs
    SELECT ARRAY_AGG(m.id) INTO p3_module_ids 
    FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id 
    WHERE p.code = 'P3';

    -- Insert P3 templates if modules exist
    IF array_length(p3_module_ids, 1) > 0 THEN
        INSERT INTO "Resource" (id, "moduleId", title, description, type, "fileUrl", tags, "isDownloadable", metadata) VALUES
        
        (gen_random_uuid(), p3_module_ids[1], 'Investor Pitch Deck Template', 'Professional investor pitch deck with Indian startup examples', 'template', '/templates/p3/01-investor-pitch-deck-template.pptx', ARRAY['pitch deck', 'investors', 'presentation'], true, '{"category": "fundraising", "difficulty": "advanced", "estimatedTime": "120 minutes", "format": "PPTX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[2], p3_module_ids[1]), 'Term Sheet Template', 'Comprehensive term sheet template with Indian market standards', 'template', '/templates/p3/02-term-sheet-template.docx', ARRAY['term sheet', 'investment', 'legal'], true, '{"category": "legal", "difficulty": "advanced", "estimatedTime": "90 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[3], p3_module_ids[1]), 'Financial Model for Funding', 'Investor-grade 5-year financial model with scenarios', 'template', '/templates/p3/03-financial-model-funding.xlsx', ARRAY['financial model', 'projections', 'investors'], true, '{"category": "financial", "difficulty": "advanced", "estimatedTime": "180 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[4], p3_module_ids[1]), 'Business Plan - Investor Ready', 'Comprehensive business plan template for investors', 'template', '/templates/p3/04-business-plan-investor-ready.docx', ARRAY['business plan', 'strategy', 'investors'], true, '{"category": "planning", "difficulty": "advanced", "estimatedTime": "240 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[5], p3_module_ids[1]), 'Investor Database Tracker', '500+ verified investor contacts with CRM functionality', 'template', '/templates/p3/05-investor-database-tracker.xlsx', ARRAY['investor', 'CRM', 'networking'], true, '{"category": "CRM", "difficulty": "intermediate", "estimatedTime": "60 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[6], p3_module_ids[1]), 'Due Diligence Checklist', 'Comprehensive checklist for investor due diligence preparation', 'template', '/templates/p3/06-due-diligence-checklist.pdf', ARRAY['due diligence', 'compliance', 'investors'], true, '{"category": "compliance", "difficulty": "advanced", "estimatedTime": "45 minutes", "format": "PDF"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[7], p3_module_ids[1]), 'Government Grant Applications', 'Templates for 20+ government funding schemes', 'template', '/templates/p3/07-government-grant-applications.docx', ARRAY['grants', 'government', 'funding'], true, '{"category": "government", "difficulty": "intermediate", "estimatedTime": "90 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[8], p3_module_ids[1]), 'Cap Table Modeling', 'Advanced cap table with multiple funding round scenarios', 'template', '/templates/p3/08-cap-table-modeling.xlsx', ARRAY['cap table', 'equity', 'modeling'], true, '{"category": "financial", "difficulty": "advanced", "estimatedTime": "75 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[9], p3_module_ids[1]), 'Convertible Note Template', 'Legal template for convertible note agreements', 'template', '/templates/p3/09-convertible-note-template.docx', ARRAY['convertible notes', 'legal', 'funding'], true, '{"category": "legal", "difficulty": "advanced", "estimatedTime": "60 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[10], p3_module_ids[1]), 'Investor Update Template', 'Professional monthly/quarterly investor update format', 'template', '/templates/p3/10-investor-update-template.docx', ARRAY['investor updates', 'communication', 'reporting'], true, '{"category": "communication", "difficulty": "intermediate", "estimatedTime": "40 minutes", "format": "DOCX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[11], p3_module_ids[1]), 'Funding Strategy Planner', 'Comprehensive funding strategy with timeline and tracking', 'template', '/templates/p3/11-funding-strategy-planner.xlsx', ARRAY['strategy', 'planning', 'funding'], true, '{"category": "strategy", "difficulty": "advanced", "estimatedTime": "90 minutes", "format": "XLSX"}'),
        
        (gen_random_uuid(), COALESCE(p3_module_ids[12], p3_module_ids[1]), 'Legal Documents for Funding', 'Complete set of legal documents for equity transactions', 'template', '/templates/p3/12-legal-documents-funding.pdf', ARRAY['legal', 'equity', 'transaction'], true, '{"category": "legal", "difficulty": "advanced", "estimatedTime": "120 minutes", "format": "PDF"}');
    END IF;
    
END $$;

-- Add P4, P5, P6 templates (simplified approach)
DO $$
DECLARE
    p4_module_id TEXT;
    p5_module_id TEXT;  
    p6_module_id TEXT;
BEGIN
    -- Get first module ID for each product
    SELECT m.id INTO p4_module_id FROM "Module" m JOIN "Product" p ON m."productId" = p.id WHERE p.code = 'P4' LIMIT 1;
    SELECT m.id INTO p5_module_id FROM "Module" m JOIN "Product" p ON m."productId" = p.id WHERE p.code = 'P5' LIMIT 1;
    SELECT m.id INTO p6_module_id FROM "Module" m JOIN "Product" p ON m."productId" = p.id WHERE p.code = 'P6' LIMIT 1;

    -- P4 Templates (if module exists)
    IF p4_module_id IS NOT NULL THEN
        INSERT INTO "Resource" (id, "moduleId", title, description, type, "fileUrl", tags, "isDownloadable", metadata) VALUES
        (gen_random_uuid(), p4_module_id, 'Accounting System Setup', 'Complete accounting system with Indian standards compliance', 'template', '/templates/p4/01-accounting-system-setup.xlsx', ARRAY['accounting', 'setup', 'compliance'], true, '{"category": "accounting", "difficulty": "intermediate", "estimatedTime": "120 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'GST Compliance Master', 'Complete GST compliance system with automated calculations', 'template', '/templates/p4/02-gst-compliance-master.xlsx', ARRAY['GST', 'tax', 'compliance'], true, '{"category": "tax", "difficulty": "advanced", "estimatedTime": "90 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Financial Dashboard Template', 'Real-time financial KPI dashboard with automated reporting', 'template', '/templates/p4/03-financial-dashboard-template.xlsx', ARRAY['dashboard', 'KPI', 'monitoring'], true, '{"category": "reporting", "difficulty": "advanced", "estimatedTime": "75 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Budgeting & Forecasting Model', 'Sophisticated budgeting model with scenario planning', 'template', '/templates/p4/04-budgeting-forecasting-model.xlsx', ARRAY['budgeting', 'forecasting', 'planning'], true, '{"category": "planning", "difficulty": "advanced", "estimatedTime": "150 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Tax Planning Calculator', 'Comprehensive tax planning with Startup India benefits', 'template', '/templates/p4/05-tax-planning-calculator.xlsx', ARRAY['tax planning', 'optimization', 'startups'], true, '{"category": "tax", "difficulty": "intermediate", "estimatedTime": "60 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Banking & Treasury Management', 'Complete treasury management with multi-bank tracking', 'template', '/templates/p4/06-banking-treasury-management.xlsx', ARRAY['banking', 'treasury', 'cash management'], true, '{"category": "treasury", "difficulty": "advanced", "estimatedTime": "90 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Financial Ratios Analyzer', 'Advanced financial analysis with industry benchmarks', 'template', '/templates/p4/07-financial-ratios-analyzer.xlsx', ARRAY['ratios', 'analysis', 'benchmarking'], true, '{"category": "analysis", "difficulty": "advanced", "estimatedTime": "45 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Expense Management System', 'Complete expense management with approval workflows', 'template', '/templates/p4/08-expense-management-system.xlsx', ARRAY['expenses', 'workflow', 'management'], true, '{"category": "operations", "difficulty": "intermediate", "estimatedTime": "60 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Audit Preparation Kit', 'Comprehensive audit preparation with checklists', 'template', '/templates/p4/09-audit-preparation-kit.docx', ARRAY['audit', 'compliance', 'preparation'], true, '{"category": "compliance", "difficulty": "intermediate", "estimatedTime": "90 minutes", "format": "DOCX"}'),
        (gen_random_uuid(), p4_module_id, 'Investor Financial Reports', 'Professional investor-grade financial reporting templates', 'template', '/templates/p4/10-investor-financial-reports.xlsx', ARRAY['investor reports', 'financial', 'presentation'], true, '{"category": "reporting", "difficulty": "advanced", "estimatedTime": "120 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Working Capital Optimizer', 'Working capital optimization with cash flow forecasting', 'template', '/templates/p4/11-working-capital-optimizer.xlsx', ARRAY['working capital', 'optimization', 'cash flow'], true, '{"category": "optimization", "difficulty": "advanced", "estimatedTime": "75 minutes", "format": "XLSX"}'),
        (gen_random_uuid(), p4_module_id, 'Financial Policies & Procedures', 'Comprehensive financial policies manual', 'template', '/templates/p4/12-financial-policies-procedures.docx', ARRAY['policies', 'procedures', 'governance'], true, '{"category": "governance", "difficulty": "intermediate", "estimatedTime": "180 minutes", "format": "DOCX"}');
    END IF;
    
    -- P5 Templates (if module exists)
    IF p5_module_id IS NOT NULL THEN
        INSERT INTO "Resource" (id, "moduleId", title, description, type, "fileUrl", tags, "isDownloadable", metadata) VALUES
        (gen_random_uuid(), p5_module_id, 'Employment Agreement Template', 'Comprehensive employment agreements compliant with Indian labor laws', 'template', '/templates/p5/01-employment-agreement-template.docx', ARRAY['employment', 'legal', 'HR'], true, '{"category": "legal", "difficulty": "intermediate", "estimatedTime": "60 minutes", "format": "DOCX"}'),
        (gen_random_uuid(), p5_module_id, 'NDA & Confidentiality Agreements', 'Complete collection of NDAs for various business scenarios', 'template', '/templates/p5/02-nda-confidentiality-agreements.pdf', ARRAY['NDA', 'confidentiality', 'legal'], true, '{"category": "legal", "difficulty": "beginner", "estimatedTime": "30 minutes", "format": "PDF"}'),
        (gen_random_uuid(), p5_module_id, 'Service Agreement Templates', 'Professional service agreements for various business services', 'template', '/templates/p5/03-service-agreement-templates.docx', ARRAY['service agreements', 'contracts', 'legal'], true, '{"category": "legal", "difficulty": "intermediate", "estimatedTime": "45 minutes", "format": "DOCX"}');
    END IF;
    
    -- P6 Templates (if module exists)
    IF p6_module_id IS NOT NULL THEN
        INSERT INTO "Resource" (id, "moduleId", title, description, type, "fileUrl", tags, "isDownloadable", metadata) VALUES
        (gen_random_uuid(), p6_module_id, 'Sales Playbook Template', 'Comprehensive sales playbook with proven methodologies for Indian market', 'template', '/templates/p6/01-sales-playbook-template.docx', ARRAY['sales', 'playbook', 'methodology'], true, '{"category": "sales", "difficulty": "intermediate", "estimatedTime": "90 minutes", "format": "DOCX"}'),
        (gen_random_uuid(), p6_module_id, 'Customer Acquisition Strategy', 'Systematic customer acquisition planning with CAC/LTV analysis', 'template', '/templates/p6/02-customer-acquisition-strategy.xlsx', ARRAY['customer acquisition', 'strategy', 'analytics'], true, '{"category": "strategy", "difficulty": "advanced", "estimatedTime": "120 minutes", "format": "XLSX"}');
    END IF;
    
END $$;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'SUCCESS: Templates migration completed successfully. All new templates have been added to the database with proper metadata and categorization.';
END $$;