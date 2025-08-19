-- Portfolio System Seed Data
-- Populate ActivityTypes and PortfolioSections based on PORTFOLIO_FEATURE_DESIGN.md

-- Insert Portfolio Sections
INSERT INTO "PortfolioSection" ("id", "name", "title", "description", "order", "icon", "fields") VALUES
('executive_summary', 'executive_summary', 'Executive Summary', 'High-level overview of your startup', 1, '📝', 
 '{"fields": [{"name": "elevator_pitch", "label": "Elevator Pitch", "type": "text", "required": true}, {"name": "mission_statement", "label": "Mission Statement", "type": "text", "required": true}, {"name": "vision_statement", "label": "Vision Statement", "type": "text", "required": true}]}'::jsonb),

('problem_solution', 'problem_solution', 'Problem & Solution', 'The problem you solve and your solution', 2, '💡', 
 '{"fields": [{"name": "problem_statement", "label": "Problem Statement", "type": "textarea", "required": true}, {"name": "solution_description", "label": "Solution Description", "type": "textarea", "required": true}, {"name": "value_proposition", "label": "Value Proposition", "type": "text", "required": true}, {"name": "target_customer", "label": "Target Customer", "type": "text", "required": true}]}'::jsonb),

('market_research', 'market_research', 'Market Research', 'Market analysis and competitive landscape', 3, '📊', 
 '{"fields": [{"name": "market_size", "label": "Market Size (TAM/SAM/SOM)", "type": "object", "required": true}, {"name": "target_segments", "label": "Target Market Segments", "type": "array", "required": true}, {"name": "competitor_analysis", "label": "Competitor Analysis", "type": "array", "required": true}, {"name": "market_trends", "label": "Market Trends", "type": "array", "required": false}]}'::jsonb),

('business_model', 'business_model', 'Business Model', 'Revenue streams and business mechanics', 4, '💼', 
 '{"fields": [{"name": "revenue_streams", "label": "Revenue Streams", "type": "array", "required": true}, {"name": "cost_structure", "label": "Cost Structure", "type": "array", "required": true}, {"name": "pricing_strategy", "label": "Pricing Strategy", "type": "object", "required": true}, {"name": "unit_economics", "label": "Unit Economics", "type": "object", "required": false}]}'::jsonb),

('product_development', 'product_development', 'Product Development', 'Product roadmap and development status', 5, '🛠️', 
 '{"fields": [{"name": "product_description", "label": "Product Description", "type": "textarea", "required": true}, {"name": "key_features", "label": "Key Features", "type": "array", "required": true}, {"name": "development_roadmap", "label": "Development Roadmap", "type": "array", "required": false}, {"name": "technical_architecture", "label": "Technical Architecture", "type": "text", "required": false}]}'::jsonb),

('go_to_market', 'go_to_market', 'Go-to-Market Strategy', 'Sales and marketing approach', 6, '🎯', 
 '{"fields": [{"name": "marketing_channels", "label": "Marketing Channels", "type": "array", "required": true}, {"name": "sales_strategy", "label": "Sales Strategy", "type": "text", "required": true}, {"name": "customer_personas", "label": "Customer Personas", "type": "array", "required": true}, {"name": "launch_plan", "label": "Launch Plan", "type": "object", "required": false}]}'::jsonb),

('team_organization', 'team_organization', 'Team & Organization', 'Team structure and key personnel', 7, '👥', 
 '{"fields": [{"name": "founding_team", "label": "Founding Team", "type": "array", "required": true}, {"name": "organizational_structure", "label": "Organizational Structure", "type": "text", "required": false}, {"name": "hiring_plan", "label": "Hiring Plan", "type": "array", "required": false}, {"name": "advisory_board", "label": "Advisory Board", "type": "array", "required": false}]}'::jsonb),

('financial_projections', 'financial_projections', 'Financial Projections', 'Financial forecasts and metrics', 8, '💰', 
 '{"fields": [{"name": "revenue_projections", "label": "Revenue Projections", "type": "object", "required": true}, {"name": "expense_projections", "label": "Expense Projections", "type": "object", "required": true}, {"name": "key_metrics", "label": "Key Financial Metrics", "type": "object", "required": true}, {"name": "funding_requirements", "label": "Funding Requirements", "type": "object", "required": false}]}'::jsonb),

('legal_compliance', 'legal_compliance', 'Legal & Compliance', 'Legal structure and compliance status', 9, '⚖️', 
 '{"fields": [{"name": "business_structure", "label": "Business Structure", "type": "text", "required": true}, {"name": "intellectual_property", "label": "Intellectual Property", "type": "array", "required": false}, {"name": "compliance_checklist", "label": "Compliance Checklist", "type": "array", "required": true}, {"name": "legal_documents", "label": "Legal Documents", "type": "array", "required": false}]}'::jsonb),

('brand_identity', 'brand_identity', 'Brand & Identity', 'Brand assets and identity elements', 10, '🎨', 
 '{"fields": [{"name": "brand_positioning", "label": "Brand Positioning", "type": "text", "required": true}, {"name": "brand_assets", "label": "Brand Assets", "type": "object", "required": false}, {"name": "marketing_materials", "label": "Marketing Materials", "type": "array", "required": false}, {"name": "digital_presence", "label": "Digital Presence", "type": "object", "required": false}]}'::jsonb),

('risk_mitigation', 'risk_mitigation', 'Risk & Mitigation', 'Risk analysis and mitigation strategies', 11, '🛡️', 
 '{"fields": [{"name": "risk_analysis", "label": "Risk Analysis", "type": "array", "required": true}, {"name": "mitigation_strategies", "label": "Mitigation Strategies", "type": "array", "required": true}, {"name": "contingency_plans", "label": "Contingency Plans", "type": "array", "required": false}]}'::jsonb),

('growth_scaling', 'growth_scaling', 'Growth & Scaling', 'Growth strategy and scaling plans', 12, '📈', 
 '{"fields": [{"name": "growth_strategy", "label": "Growth Strategy", "type": "textarea", "required": true}, {"name": "scaling_plan", "label": "Scaling Plan", "type": "object", "required": false}, {"name": "expansion_roadmap", "label": "Expansion Roadmap", "type": "array", "required": false}]}'::jsonb);

-- Insert Activity Types
INSERT INTO "ActivityType" ("id", "name", "category", "portfolioSection", "portfolioField", "dataSchema") VALUES
-- Problem & Solution Activities
('define_problem_statement', 'Problem Statement Definition', 'problem_solution', 'problem_solution', 'problem_statement', 
 '{"type": "object", "properties": {"problem": {"type": "string", "minLength": 50, "maxLength": 500}, "impact": {"type": "string"}, "frequency": {"type": "string"}, "urgency": {"type": "string"}}, "required": ["problem"]}'::jsonb),

('solution_design', 'Solution Design', 'problem_solution', 'problem_solution', 'solution_description', 
 '{"type": "object", "properties": {"solution": {"type": "string", "minLength": 50, "maxLength": 500}, "approach": {"type": "string"}, "differentiators": {"type": "array", "items": {"type": "string"}}, "benefits": {"type": "array", "items": {"type": "string"}}}, "required": ["solution"]}'::jsonb),

('value_proposition_canvas', 'Value Proposition Canvas', 'problem_solution', 'problem_solution', 'value_proposition', 
 '{"type": "object", "properties": {"value_prop": {"type": "string", "minLength": 20, "maxLength": 200}, "gain_creators": {"type": "array", "items": {"type": "string"}}, "pain_relievers": {"type": "array", "items": {"type": "string"}}}, "required": ["value_prop"]}'::jsonb),

-- Market Research Activities
('market_sizing', 'Market Sizing Analysis', 'market_analysis', 'market_research', 'market_size', 
 '{"type": "object", "properties": {"tam": {"type": "number"}, "sam": {"type": "number"}, "som": {"type": "number"}, "methodology": {"type": "string"}, "sources": {"type": "array", "items": {"type": "string"}}}, "required": ["tam", "sam", "som"]}'::jsonb),

('competitor_analysis', 'Competitive Analysis', 'market_analysis', 'market_research', 'competitor_analysis', 
 '{"type": "object", "properties": {"competitors": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "strengths": {"type": "array"}, "weaknesses": {"type": "array"}, "market_share": {"type": "string"}}}}, "positioning": {"type": "string"}}, "required": ["competitors"]}'::jsonb),

('customer_persona_development', 'Customer Persona Development', 'market_analysis', 'problem_solution', 'target_customer', 
 '{"type": "object", "properties": {"primary_persona": {"type": "object", "properties": {"name": {"type": "string"}, "demographics": {"type": "object"}, "psychographics": {"type": "object"}, "pain_points": {"type": "array"}, "goals": {"type": "array"}}}, "secondary_personas": {"type": "array"}}, "required": ["primary_persona"]}'::jsonb),

-- Business Model Activities
('revenue_model_design', 'Revenue Model Design', 'business_model', 'business_model', 'revenue_streams', 
 '{"type": "object", "properties": {"primary_revenue": {"type": "object", "properties": {"type": {"type": "string"}, "description": {"type": "string"}, "pricing": {"type": "object"}}}, "secondary_revenue": {"type": "array"}, "monetization_timeline": {"type": "string"}}, "required": ["primary_revenue"]}'::jsonb),

('pricing_strategy', 'Pricing Strategy Development', 'business_model', 'business_model', 'pricing_strategy', 
 '{"type": "object", "properties": {"pricing_model": {"type": "string"}, "price_points": {"type": "object"}, "rationale": {"type": "string"}, "competitive_comparison": {"type": "object"}}, "required": ["pricing_model", "price_points"]}'::jsonb),

-- Financial Projections Activities
('financial_modeling', 'Financial Model Creation', 'financials', 'financial_projections', 'revenue_projections', 
 '{"type": "object", "properties": {"projections": {"type": "object", "properties": {"year1": {"type": "number"}, "year2": {"type": "number"}, "year3": {"type": "number"}}}, "assumptions": {"type": "array"}, "scenarios": {"type": "object"}}, "required": ["projections"]}'::jsonb),

('funding_requirements', 'Funding Requirements Analysis', 'financials', 'financial_projections', 'funding_requirements', 
 '{"type": "object", "properties": {"total_funding": {"type": "number"}, "use_of_funds": {"type": "object"}, "runway": {"type": "number"}, "milestones": {"type": "array"}}, "required": ["total_funding", "use_of_funds"]}'::jsonb),

-- Product Development Activities
('product_roadmap', 'Product Roadmap Planning', 'product', 'product_development', 'development_roadmap', 
 '{"type": "object", "properties": {"phases": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "timeline": {"type": "string"}, "features": {"type": "array"}, "resources": {"type": "string"}}}}, "mvp_definition": {"type": "string"}}, "required": ["phases"]}'::jsonb),

('feature_prioritization', 'Feature Prioritization', 'product', 'product_development', 'key_features', 
 '{"type": "object", "properties": {"core_features": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "priority": {"type": "string"}, "effort": {"type": "string"}, "impact": {"type": "string"}}}}, "nice_to_have": {"type": "array"}}, "required": ["core_features"]}'::jsonb),

-- Go-to-Market Activities
('marketing_strategy', 'Marketing Strategy Development', 'marketing', 'go_to_market', 'marketing_channels', 
 '{"type": "object", "properties": {"channels": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "cost": {"type": "string"}, "reach": {"type": "string"}, "effectiveness": {"type": "string"}}}}, "budget_allocation": {"type": "object"}}, "required": ["channels"]}'::jsonb),

('sales_process_design', 'Sales Process Design', 'marketing', 'go_to_market', 'sales_strategy', 
 '{"type": "object", "properties": {"sales_funnel": {"type": "object"}, "sales_cycle": {"type": "string"}, "conversion_metrics": {"type": "object"}, "sales_tools": {"type": "array"}}, "required": ["sales_funnel"]}'::jsonb),

-- Team & Organization Activities
('team_structure_planning', 'Team Structure Planning', 'team', 'team_organization', 'organizational_structure', 
 '{"type": "object", "properties": {"current_team": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "role": {"type": "string"}, "responsibilities": {"type": "array"}, "equity": {"type": "string"}}}}, "hiring_roadmap": {"type": "object"}}, "required": ["current_team"]}'::jsonb),

-- Legal & Compliance Activities
('incorporation_setup', 'Business Incorporation Setup', 'legal', 'legal_compliance', 'business_structure', 
 '{"type": "object", "properties": {"entity_type": {"type": "string"}, "jurisdiction": {"type": "string"}, "registrations": {"type": "array"}, "compliance_calendar": {"type": "array"}}, "required": ["entity_type", "jurisdiction"]}'::jsonb),

('compliance_checklist', 'Compliance Checklist Creation', 'legal', 'legal_compliance', 'compliance_checklist', 
 '{"type": "object", "properties": {"mandatory_compliances": {"type": "array", "items": {"type": "object", "properties": {"name": {"type": "string"}, "frequency": {"type": "string"}, "deadline": {"type": "string"}, "status": {"type": "string"}}}}, "optional_compliances": {"type": "array"}}, "required": ["mandatory_compliances"]}'::jsonb),

-- Brand & Identity Activities
('brand_positioning', 'Brand Positioning Strategy', 'branding', 'brand_identity', 'brand_positioning', 
 '{"type": "object", "properties": {"brand_promise": {"type": "string"}, "brand_personality": {"type": "object"}, "positioning_statement": {"type": "string"}, "differentiation": {"type": "array"}}, "required": ["brand_promise", "positioning_statement"]}'::jsonb),

-- Risk & Mitigation Activities
('risk_assessment', 'Risk Assessment Analysis', 'risk_management', 'risk_mitigation', 'risk_analysis', 
 '{"type": "object", "properties": {"risks": {"type": "array", "items": {"type": "object", "properties": {"risk": {"type": "string"}, "probability": {"type": "string"}, "impact": {"type": "string"}, "mitigation": {"type": "string"}}}}, "overall_risk_level": {"type": "string"}}, "required": ["risks"]}'::jsonb),

-- Growth & Scaling Activities
('growth_strategy_planning', 'Growth Strategy Planning', 'growth', 'growth_scaling', 'growth_strategy', 
 '{"type": "object", "properties": {"growth_model": {"type": "string"}, "key_growth_levers": {"type": "array"}, "growth_metrics": {"type": "object"}, "expansion_plan": {"type": "object"}}, "required": ["growth_model", "key_growth_levers"]}'::jsonb),

-- Executive Summary Activities  
('elevator_pitch_development', 'Elevator Pitch Development', 'executive', 'executive_summary', 'elevator_pitch', 
 '{"type": "object", "properties": {"pitch": {"type": "string", "minLength": 100, "maxLength": 300}, "hook": {"type": "string"}, "problem": {"type": "string"}, "solution": {"type": "string"}, "traction": {"type": "string"}}, "required": ["pitch"]}'::jsonb),

('mission_vision_definition', 'Mission & Vision Definition', 'executive', 'executive_summary', 'mission_statement', 
 '{"type": "object", "properties": {"mission": {"type": "string", "minLength": 50, "maxLength": 200}, "vision": {"type": "string", "minLength": 50, "maxLength": 200}, "core_values": {"type": "array"}}, "required": ["mission", "vision"]}'::jsonb);

-- Update requiredActivities for each section
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['elevator_pitch_development', 'mission_vision_definition'] WHERE "name" = 'executive_summary';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['define_problem_statement', 'solution_design', 'value_proposition_canvas', 'customer_persona_development'] WHERE "name" = 'problem_solution';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['market_sizing', 'competitor_analysis'] WHERE "name" = 'market_research';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['revenue_model_design', 'pricing_strategy'] WHERE "name" = 'business_model';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['product_roadmap', 'feature_prioritization'] WHERE "name" = 'product_development';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['marketing_strategy', 'sales_process_design'] WHERE "name" = 'go_to_market';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['team_structure_planning'] WHERE "name" = 'team_organization';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['financial_modeling', 'funding_requirements'] WHERE "name" = 'financial_projections';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['incorporation_setup', 'compliance_checklist'] WHERE "name" = 'legal_compliance';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['brand_positioning'] WHERE "name" = 'brand_identity';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['risk_assessment'] WHERE "name" = 'risk_mitigation';
UPDATE "PortfolioSection" SET "requiredActivities" = ARRAY['growth_strategy_planning'] WHERE "name" = 'growth_scaling';