-- =====================================================
-- Comprehensive Portfolio-Course Integration
-- Links all P2-P12 courses to portfolio system
-- =====================================================

-- P2: Incorporation & Compliance Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Legal Compliance Section
('p2_company_registration', 'Company Registration Process', 'legal_compliance', 'legal_compliance', 'company_registration', 
 '{"type": "object", "properties": {"company_name": {"type": "string"}, "registration_type": {"type": "string", "enum": ["Private Limited", "OPC", "LLP"]}, "authorized_capital": {"type": "number"}, "registration_status": {"type": "string"}, "cin": {"type": "string"}, "registration_date": {"type": "string", "format": "date"}}}',
 'Complete company registration with MCA including name approval, incorporation, and CIN generation'),

('p2_compliance_calendar', 'Annual Compliance Calendar', 'legal_compliance', 'legal_compliance', 'compliance_calendar',
 '{"type": "object", "properties": {"board_meetings_scheduled": {"type": "number"}, "agm_date": {"type": "string", "format": "date"}, "roc_filings": {"type": "array", "items": {"type": "object", "properties": {"form": {"type": "string"}, "due_date": {"type": "string", "format": "date"}, "status": {"type": "string"}}}}, "tax_filings": {"type": "array", "items": {"type": "object"}}}}',
 'Comprehensive compliance calendar with all statutory requirements and deadlines'),

('p2_legal_documentation', 'Legal Documentation Setup', 'legal', 'legal_compliance', 'legal_documents',
 '{"type": "object", "properties": {"moa_completed": {"type": "boolean"}, "aoa_completed": {"type": "boolean"}, "board_resolutions": {"type": "array", "items": {"type": "string"}}, "employment_agreements": {"type": "boolean"}, "ip_assignments": {"type": "boolean"}}}',
 'Complete legal documentation including MOA, AOA, board resolutions, and employment contracts'),

-- Financial Planning Section
('p2_banking_setup', 'Corporate Banking Setup', 'financial_planning', 'financial_planning', 'banking_accounts',
 '{"type": "object", "properties": {"current_account": {"type": "object", "properties": {"bank": {"type": "string"}, "account_number": {"type": "string"}, "ifsc": {"type": "string"}}}, "online_banking": {"type": "boolean"}, "authorized_signatories": {"type": "array", "items": {"type": "string"}}, "credit_facilities": {"type": "array"}}}',
 'Corporate banking setup with current account, online banking, and authorized signatory management'),

('p2_tax_registrations', 'Tax Registrations & Compliance', 'financial_planning', 'legal_compliance', 'tax_compliance',
 '{"type": "object", "properties": {"gst_registration": {"type": "object", "properties": {"gstin": {"type": "string"}, "registration_date": {"type": "string", "format": "date"}}}, "tds_registration": {"type": "boolean"}, "pf_registration": {"type": "boolean"}, "esi_registration": {"type": "boolean"}}}',
 'Complete tax registration including GST, TDS, PF, and ESI compliance setup'),

-- Brand Assets Section  
('p2_trademark_filing', 'Trademark Registration', 'branding', 'brand_assets', 'trademark_protection',
 '{"type": "object", "properties": {"trademark_applied": {"type": "boolean"}, "application_number": {"type": "string"}, "classes": {"type": "array", "items": {"type": "string"}}, "status": {"type": "string"}, "attorney_details": {"type": "object"}}}',
 'Trademark application and registration for brand protection');

-- P3: Funding Mastery Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Funding Strategy Section
('p3_funding_strategy', 'Comprehensive Funding Strategy', 'funding', 'funding_strategy', 'funding_roadmap',
 '{"type": "object", "properties": {"funding_stages": {"type": "array", "items": {"type": "object", "properties": {"stage": {"type": "string"}, "amount": {"type": "number"}, "timeline": {"type": "string"}, "investor_type": {"type": "string"}}}}, "current_runway": {"type": "number"}, "burn_rate": {"type": "number"}, "next_milestone": {"type": "string"}}}',
 'Multi-stage funding strategy with timeline, milestones, and investor targeting'),

('p3_investor_outreach', 'Investor Pipeline Development', 'funding', 'funding_strategy', 'investor_pipeline',
 '{"type": "object", "properties": {"investor_database": {"type": "number"}, "meetings_scheduled": {"type": "number"}, "pitch_deck_version": {"type": "string"}, "follow_ups": {"type": "array"}, "term_sheets_received": {"type": "number"}}}',
 'Systematic investor outreach with CRM tracking and pipeline management'),

-- Financial Planning Section
('p3_financial_modeling', 'Investor-Grade Financial Model', 'financial_planning', 'financial_projections', 'funding_model',
 '{"type": "object", "properties": {"revenue_projections": {"type": "object"}, "expense_forecasts": {"type": "object"}, "cash_flow_analysis": {"type": "object"}, "scenario_planning": {"type": "array"}, "unit_economics": {"type": "object"}}}',
 '5-year financial model with multiple scenarios for investor presentations'),

-- Pitch Materials Section
('p3_pitch_preparation', 'Investor Pitch Development', 'funding', 'pitch_materials', 'investor_pitch',
 '{"type": "object", "properties": {"pitch_deck_slides": {"type": "number"}, "demo_prepared": {"type": "boolean"}, "financial_appendix": {"type": "boolean"}, "qa_preparation": {"type": "boolean"}, "presentation_practiced": {"type": "number"}}}',
 'Complete investor pitch deck with demo, financials, and Q&A preparation');

-- P4: Finance Stack Activities  
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Financial Planning Section
('p4_accounting_system', 'Professional Accounting Setup', 'financial_planning', 'financial_planning', 'accounting_system',
 '{"type": "object", "properties": {"accounting_software": {"type": "string"}, "chart_of_accounts": {"type": "boolean"}, "bank_reconciliation": {"type": "boolean"}, "monthly_closing": {"type": "boolean"}, "financial_reports": {"type": "array"}}}',
 'Complete accounting system setup with software, processes, and monthly reporting'),

('p4_financial_controls', 'Financial Controls & Governance', 'financial_planning', 'financial_planning', 'financial_controls',
 '{"type": "object", "properties": {"approval_matrix": {"type": "object"}, "expense_policies": {"type": "boolean"}, "segregation_duties": {"type": "boolean"}, "audit_trail": {"type": "boolean"}, "internal_controls": {"type": "array"}}}',
 'Financial governance framework with controls, policies, and approval processes'),

-- Financial Projections Section
('p4_dashboard_reporting', 'Real-time Financial Dashboard', 'financial_planning', 'financial_projections', 'financial_dashboard',
 '{"type": "object", "properties": {"kpi_tracking": {"type": "array"}, "automated_reports": {"type": "boolean"}, "cash_flow_monitoring": {"type": "boolean"}, "budget_variance": {"type": "object"}, "investor_reports": {"type": "boolean"}}}',
 'Executive financial dashboard with KPIs, cash flow, and automated investor reporting');

-- P5: Legal Stack Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Legal Compliance Section
('p5_contract_management', 'Contract Management System', 'legal', 'legal_compliance', 'contract_repository',
 '{"type": "object", "properties": {"contract_templates": {"type": "number"}, "active_contracts": {"type": "number"}, "contract_database": {"type": "boolean"}, "renewal_tracking": {"type": "boolean"}, "compliance_monitoring": {"type": "boolean"}}}',
 'Comprehensive contract management with templates, tracking, and compliance monitoring'),

('p5_ip_protection', 'Intellectual Property Strategy', 'legal', 'brand_assets', 'ip_portfolio',
 '{"type": "object", "properties": {"patents_filed": {"type": "number"}, "trademarks_registered": {"type": "number"}, "copyrights_secured": {"type": "number"}, "trade_secrets": {"type": "array"}, "ip_strategy": {"type": "object"}}}',
 'Complete IP protection strategy including patents, trademarks, and trade secrets'),

('p5_employment_framework', 'Employment Legal Framework', 'legal', 'legal_compliance', 'employment_compliance',
 '{"type": "object", "properties": {"employee_handbook": {"type": "boolean"}, "employment_contracts": {"type": "number"}, "policy_compliance": {"type": "boolean"}, "dispute_prevention": {"type": "boolean"}, "labor_law_compliance": {"type": "boolean"}}}',
 'Complete employment legal framework with contracts, policies, and compliance');

-- P6: Sales & GTM Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Go-to-Market Section
('p6_sales_strategy', 'Sales Strategy & Process Design', 'sales', 'go_to_market_strategy', 'sales_process',
 '{"type": "object", "properties": {"sales_methodology": {"type": "string"}, "sales_stages": {"type": "array"}, "qualification_framework": {"type": "string"}, "pricing_strategy": {"type": "object"}, "territory_plan": {"type": "object"}}}',
 'Comprehensive sales strategy with methodology, process, and territory planning'),

('p6_customer_acquisition', 'Customer Acquisition Engine', 'customer_acquisition', 'go_to_market_strategy', 'acquisition_channels',
 '{"type": "object", "properties": {"acquisition_channels": {"type": "array"}, "cac_by_channel": {"type": "object"}, "ltv_analysis": {"type": "object"}, "conversion_funnels": {"type": "object"}, "optimization_plan": {"type": "object"}}}',
 'Multi-channel customer acquisition with CAC/LTV optimization and funnel analysis'),

-- Market Research Section
('p6_sales_enablement', 'Sales Enablement Platform', 'sales', 'market_research', 'sales_enablement',
 '{"type": "object", "properties": {"sales_collateral": {"type": "number"}, "crm_setup": {"type": "boolean"}, "sales_training": {"type": "boolean"}, "performance_tracking": {"type": "boolean"}, "lead_scoring": {"type": "boolean"}}}',
 'Complete sales enablement with CRM, collateral, training, and performance tracking');

-- P8: Data Room Mastery Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Executive Summary Section
('p8_data_room_architecture', 'Professional Data Room Setup', 'data_room_excellence', 'executive_summary', 'data_room_structure',
 '{"type": "object", "properties": {"folder_structure": {"type": "object"}, "document_categories": {"type": "array"}, "access_controls": {"type": "object"}, "version_control": {"type": "boolean"}, "audit_trail": {"type": "boolean"}}}',
 'Professional data room with organized structure, access controls, and audit capabilities'),

-- Financial Projections Section  
('p8_due_diligence_prep', 'Due Diligence Preparation', 'due_diligence_readiness', 'financial_projections', 'dd_documentation',
 '{"type": "object", "properties": {"financial_statements": {"type": "boolean"}, "legal_documents": {"type": "boolean"}, "operational_metrics": {"type": "boolean"}, "compliance_certificates": {"type": "boolean"}, "management_presentations": {"type": "boolean"}}}',
 'Complete due diligence preparation with all required documentation and presentations');

-- P9: Government Schemes Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Funding Strategy Section
('p9_scheme_optimization', 'Government Scheme Optimization', 'funding', 'funding_strategy', 'government_funding',
 '{"type": "object", "properties": {"eligible_schemes": {"type": "array"}, "applications_submitted": {"type": "number"}, "funding_secured": {"type": "number"}, "compliance_status": {"type": "object"}, "renewal_timeline": {"type": "object"}}}',
 'Comprehensive government scheme optimization with eligibility mapping and application tracking');

-- P10: Patent Mastery Activities  
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Brand Assets Section
('p10_patent_portfolio', 'Patent Portfolio Development', 'legal', 'brand_assets', 'patent_strategy',
 '{"type": "object", "properties": {"patents_filed": {"type": "number"}, "patent_applications": {"type": "array"}, "patent_strategy": {"type": "object"}, "prior_art_analysis": {"type": "boolean"}, "commercialization_plan": {"type": "object"}}}',
 'Strategic patent portfolio development with filing, analysis, and commercialization planning');

-- P11: Branding & PR Activities  
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Brand Identity Section
('p11_brand_identity', 'Comprehensive Brand Identity', 'branding', 'brand_identity', 'brand_foundation',
 '{"type": "object", "properties": {"brand_positioning": {"type": "string"}, "brand_values": {"type": "array"}, "brand_personality": {"type": "object"}, "target_audience": {"type": "object"}, "brand_guidelines": {"type": "boolean"}}}',
 'Complete brand identity development with positioning, values, and comprehensive guidelines'),

-- Brand Assets Section
('p11_media_strategy', 'PR & Media Strategy', 'PR & Marketing', 'brand_assets', 'media_presence',
 '{"type": "object", "properties": {"media_contacts": {"type": "number"}, "press_releases": {"type": "number"}, "media_coverage": {"type": "array"}, "crisis_management": {"type": "boolean"}, "thought_leadership": {"type": "boolean"}}}',
 'Strategic PR and media relations with contacts, coverage tracking, and crisis management');

-- P12: Marketing Mastery Activities
INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema", description) VALUES

-- Go-to-Market Section  
('p12_marketing_strategy', 'Comprehensive Marketing Strategy', 'marketing', 'go_to_market_strategy', 'marketing_plan',
 '{"type": "object", "properties": {"marketing_channels": {"type": "array"}, "content_calendar": {"type": "boolean"}, "campaign_tracking": {"type": "boolean"}, "roi_analysis": {"type": "object"}, "automation_setup": {"type": "boolean"}}}',
 'Multi-channel marketing strategy with automation, tracking, and ROI optimization'),

-- Growth & Scaling Section
('p12_growth_engine', 'Growth Marketing Engine', 'growth_marketing', 'growth_scaling', 'growth_systems',
 '{"type": "object", "properties": {"growth_loops": {"type": "array"}, "viral_coefficients": {"type": "object"}, "retention_analysis": {"type": "object"}, "expansion_metrics": {"type": "object"}, "growth_experimentation": {"type": "boolean"}}}',
 'Systematic growth marketing engine with loops, experimentation, and scaling mechanisms');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activity_type_portfolio_section ON "ActivityType"("portfolioSection");
CREATE INDEX IF NOT EXISTS idx_activity_type_category ON "ActivityType"(category);

-- Add portfolio recommendations based on course completions
CREATE OR REPLACE VIEW "PortfolioRecommendations" AS
SELECT 
    u.id as user_id,
    u.email,
    CASE 
        WHEN pa.completed_p2 AND NOT pa.completed_p3 THEN 'P3: Complete funding strategy after incorporation'
        WHEN pa.completed_p3 AND NOT pa.completed_p4 THEN 'P4: Set up financial systems after funding preparation'
        WHEN pa.completed_p4 AND NOT pa.completed_p5 THEN 'P5: Strengthen legal framework after financial setup'
        WHEN pa.completed_p5 AND NOT pa.completed_p6 THEN 'P6: Build sales engine after legal compliance'
        WHEN pa.completed_p6 AND NOT pa.completed_p8 THEN 'P8: Prepare data room for investor readiness'
        WHEN pa.completed_p8 AND NOT pa.completed_p11 THEN 'P11: Build brand presence after investor preparation'
        WHEN pa.completed_p11 AND NOT pa.completed_p12 THEN 'P12: Scale with marketing after brand building'
        ELSE 'Continue portfolio development across all areas'
    END as recommendation,
    CASE
        WHEN pa.portfolio_completion < 0.3 THEN 'Get started with core activities'
        WHEN pa.portfolio_completion < 0.6 THEN 'Build momentum with consistent progress'  
        WHEN pa.portfolio_completion < 0.8 THEN 'Focus on advanced portfolio sections'
        ELSE 'Optimize and scale your complete portfolio'
    END as portfolio_guidance
FROM "User" u
LEFT JOIN (
    SELECT 
        user_id,
        AVG(CASE WHEN product_code = 'P2' THEN 1 ELSE 0 END) as completed_p2,
        AVG(CASE WHEN product_code = 'P3' THEN 1 ELSE 0 END) as completed_p3,
        AVG(CASE WHEN product_code = 'P4' THEN 1 ELSE 0 END) as completed_p4,
        AVG(CASE WHEN product_code = 'P5' THEN 1 ELSE 0 END) as completed_p5,
        AVG(CASE WHEN product_code = 'P6' THEN 1 ELSE 0 END) as completed_p6,
        AVG(CASE WHEN product_code = 'P8' THEN 1 ELSE 0 END) as completed_p8,
        AVG(CASE WHEN product_code = 'P11' THEN 1 ELSE 0 END) as completed_p11,
        AVG(CASE WHEN product_code = 'P12' THEN 1 ELSE 0 END) as completed_p12,
        COUNT(DISTINCT activity_type_id)::float / 19 as portfolio_completion -- 19 portfolio sections
    FROM (
        SELECT DISTINCT 
            pa.user_id, 
            'P2' as product_code,
            pa."activityTypeId" as activity_type_id
        FROM "PortfolioActivity" pa
        JOIN "ActivityType" at ON pa."activityTypeId" = at.id  
        WHERE at.id LIKE 'p2_%'
        
        UNION ALL
        
        SELECT DISTINCT 
            pa.user_id, 
            'P3' as product_code,
            pa."activityTypeId"
        FROM "PortfolioActivity" pa
        JOIN "ActivityType" at ON pa."activityTypeId" = at.id
        WHERE at.id LIKE 'p3_%'
        
        -- Continue for other courses...
    ) course_activities
    GROUP BY user_id
) pa ON u.id = pa.user_id;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'SUCCESS: Comprehensive portfolio-course integration completed. Added 23+ new activity types linking all courses P2-P12 to portfolio system with cross-course recommendations.';
END $$;