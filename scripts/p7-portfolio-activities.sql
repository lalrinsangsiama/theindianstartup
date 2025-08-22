-- P7 State-wise Scheme Map - Portfolio Activity Types
-- Integration with startup portfolio system for P7 course activities

INSERT INTO "ActivityType" (id, name, category, "portfolioSection", "portfolioField", "dataSchema") VALUES
-- Module 1: Federal Structure Activities
('p7_federal_analysis', 'Federal Structure Analysis', 'analysis', 'market_research', 'federal_analysis', '{"type": "object", "properties": {"federal_benefits": {"type": "array"}, "central_schemes": {"type": "array"}, "analysis_summary": {"type": "string"}}}'),
('p7_central_schemes_mapping', 'Central Schemes Eligibility Mapping', 'planning', 'legal_compliance', 'central_schemes', '{"type": "object", "properties": {"eligible_schemes": {"type": "array"}, "application_timeline": {"type": "string"}, "expected_benefits": {"type": "string"}}}'),

-- Module 2: Northern States Activities
('p7_northern_location_analysis', 'Northern States Location Analysis', 'analysis', 'market_research', 'northern_analysis', '{"type": "object", "properties": {"state_opportunities": {"type": "array"}, "location_scores": {"type": "object"}, "recommendation": {"type": "string"}}}'),
('p7_up_industrial_benefits', 'UP Industrial Policy Benefits Assessment', 'assessment', 'financial_planning', 'up_benefits', '{"type": "object", "properties": {"applicable_benefits": {"type": "array"}, "estimated_savings": {"type": "string"}, "implementation_plan": {"type": "string"}}}'),

-- Module 3: Western States Activities
('p7_western_expansion_strategy', 'Western States Expansion Strategy', 'strategy', 'go_to_market_strategy', 'western_expansion', '{"type": "object", "properties": {"expansion_timeline": {"type": "string"}, "target_states": {"type": "array"}, "resource_requirements": {"type": "string"}}}'),
('p7_gujarat_single_window', 'Gujarat Single Window Registration', 'registration', 'legal_compliance', 'gujarat_registration', '{"type": "object", "properties": {"registration_status": {"type": "string"}, "benefits_accessed": {"type": "array"}, "next_steps": {"type": "string"}}}'),

-- Module 4: Southern States Activities
('p7_southern_innovation_mapping', 'Southern States Innovation Ecosystem Mapping', 'analysis', 'market_research', 'southern_innovation', '{"type": "object", "properties": {"ecosystem_map": {"type": "object"}, "partnership_opportunities": {"type": "array"}, "integration_strategy": {"type": "string"}}}'),
('p7_bangalore_ecosystem_integration', 'Bangalore Startup Ecosystem Integration Plan', 'planning', 'go_to_market_strategy', 'bangalore_integration', '{"type": "object", "properties": {"network_connections": {"type": "array"}, "events_calendar": {"type": "array"}, "participation_plan": {"type": "string"}}}'),

-- Module 5: Eastern States Activities
('p7_eastern_opportunity_assessment', 'Eastern States Opportunity Assessment', 'assessment', 'market_research', 'eastern_opportunities', '{"type": "object", "properties": {"market_opportunities": {"type": "array"}, "risk_assessment": {"type": "string"}, "entry_strategy": {"type": "string"}}}'),
('p7_eastern_expansion_roadmap', 'Eastern Region Expansion Roadmap', 'planning', 'go_to_market_strategy', 'eastern_roadmap', '{"type": "object", "properties": {"expansion_phases": {"type": "array"}, "timeline": {"type": "string"}, "success_metrics": {"type": "array"}}}'),

-- Module 6: North-Eastern States Activities
('p7_northeast_incentive_maximization', 'North-East Incentive Maximization Strategy', 'strategy', 'financial_planning', 'northeast_incentives', '{"type": "object", "properties": {"incentive_matrix": {"type": "object"}, "optimization_strategy": {"type": "string"}, "projected_savings": {"type": "string"}}}'),
('p7_tax_exemption_application', '100% Tax Exemption Application Process', 'application', 'legal_compliance', 'tax_exemption', '{"type": "object", "properties": {"application_status": {"type": "string"}, "documentation": {"type": "array"}, "approval_timeline": {"type": "string"}}}'),

-- Module 7: Implementation Framework Activities
('p7_multi_state_strategy', 'Multi-State Implementation Strategy', 'strategy', 'business_model', 'multi_state_strategy', '{"type": "object", "properties": {"state_priorities": {"type": "array"}, "implementation_phases": {"type": "array"}, "coordination_plan": {"type": "string"}}}'),
('p7_government_relations_plan', 'Government Relations Master Plan', 'planning', 'go_to_market_strategy', 'government_relations', '{"type": "object", "properties": {"key_contacts": {"type": "array"}, "engagement_schedule": {"type": "array"}, "relationship_strategy": {"type": "string"}}}'),

-- Module 8: Sector-Specific Activities
('p7_sector_benefits_optimization', 'Sector-Specific Benefits Optimization', 'optimization', 'financial_planning', 'sector_optimization', '{"type": "object", "properties": {"sector_benefits": {"type": "array"}, "optimization_opportunities": {"type": "array"}, "implementation_roadmap": {"type": "string"}}}'),
('p7_industry_cluster_mapping', 'Industry Cluster Integration Mapping', 'analysis', 'market_research', 'cluster_mapping', '{"type": "object", "properties": {"relevant_clusters": {"type": "array"}, "integration_opportunities": {"type": "array"}, "participation_strategy": {"type": "string"}}}'),

-- Module 9: Financial Planning Activities
('p7_cost_savings_calculation', '30-50% Cost Savings Achievement Plan', 'calculation', 'financial_planning', 'cost_savings', '{"type": "object", "properties": {"savings_breakdown": {"type": "object"}, "achievement_timeline": {"type": "string"}, "monitoring_framework": {"type": "string"}}}'),
('p7_roi_optimization_framework', 'ROI Optimization Framework Implementation', 'implementation', 'financial_planning', 'roi_optimization', '{"type": "object", "properties": {"roi_targets": {"type": "object"}, "optimization_strategies": {"type": "array"}, "measurement_system": {"type": "string"}}}'),

-- Module 10: Advanced Strategies Activities
('p7_policy_monitoring_setup', 'Policy Monitoring System Setup', 'setup', 'business_model', 'policy_monitoring', '{"type": "object", "properties": {"monitoring_system": {"type": "string"}, "alert_mechanisms": {"type": "array"}, "adaptation_protocols": {"type": "string"}}}'),
('p7_state_ecosystem_mastery', 'State Ecosystem Leadership Plan', 'planning', 'go_to_market_strategy', 'ecosystem_leadership', '{"type": "object", "properties": {"leadership_strategy": {"type": "string"}, "thought_leadership": {"type": "array"}, "sustainability_plan": {"type": "string"}}}');