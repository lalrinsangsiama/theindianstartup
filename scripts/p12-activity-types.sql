-- P12 Marketing Mastery: Activity Types for Portfolio Integration
-- Date: 2025-08-21

BEGIN;

-- Create P12-specific activity types for portfolio integration
INSERT INTO "ActivityType" (
    id, name, category, "portfolioSection", "portfolioField", "dataSchema", "createdAt", "updatedAt"
) VALUES 
(
    'p12_marketing_strategy', 
    'Comprehensive Marketing Strategy Development',
    'strategic_marketing', 
    'go_to_market', 
    'marketing_strategy',
    '{
        "type": "object",
        "properties": {
            "target_audience_defined": {"type": "boolean"},
            "positioning_strategy_complete": {"type": "boolean"},
            "marketing_channels_selected": {"type": "array", "items": {"type": "string"}},
            "budget_allocation_optimized": {"type": "boolean"},
            "kpi_framework_established": {"type": "boolean"},
            "competitive_analysis_complete": {"type": "boolean"},
            "implementation_timeline_created": {"type": "boolean"}
        },
        "required": ["target_audience_defined", "positioning_strategy_complete", "marketing_channels_selected"]
    }'::jsonb, 
    NOW(), NOW()
),
(
    'p12_digital_campaigns', 
    'Multi-Channel Digital Marketing Campaigns',
    'digital_marketing',
    'go_to_market', 
    'customer_acquisition',
    '{
        "type": "object", 
        "properties": {
            "google_ads_campaigns_active": {"type": "boolean"},
            "facebook_campaigns_optimized": {"type": "boolean"},
            "linkedin_b2b_campaigns_running": {"type": "boolean"},
            "email_automation_implemented": {"type": "boolean"},
            "content_calendar_executed": {"type": "boolean"},
            "conversion_tracking_setup": {"type": "boolean"},
            "roi_measurement_active": {"type": "boolean"}
        },
        "required": ["google_ads_campaigns_active", "conversion_tracking_setup"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p12_content_system', 
    'Content Marketing System & SEO Excellence',
    'content_marketing',
    'brand_assets', 
    'content_strategy',
    '{
        "type": "object",
        "properties": {
            "content_pillars_defined": {"type": "boolean"},
            "editorial_calendar_created": {"type": "boolean"},
            "seo_strategy_implemented": {"type": "boolean"},
            "blog_content_published": {"type": "number"},
            "video_content_created": {"type": "number"},
            "social_content_scheduled": {"type": "number"},
            "content_performance_tracked": {"type": "boolean"}
        },
        "required": ["content_pillars_defined", "editorial_calendar_created", "seo_strategy_implemented"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p12_brand_identity', 
    'Brand Building & Visual Identity Excellence',
    'brand_building',
    'brand_assets', 
    'brand_guidelines',
    '{
        "type": "object",
        "properties": {
            "brand_strategy_documented": {"type": "boolean"},
            "visual_identity_complete": {"type": "boolean"},
            "brand_guidelines_created": {"type": "boolean"},
            "messaging_framework_defined": {"type": "boolean"},
            "brand_assets_library_built": {"type": "boolean"},
            "brand_voice_established": {"type": "boolean"},
            "brand_monitoring_setup": {"type": "boolean"}
        },
        "required": ["brand_strategy_documented", "visual_identity_complete", "brand_guidelines_created"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p12_analytics_dashboard', 
    'Marketing Analytics & Performance Dashboard',
    'marketing_analytics',
    'financial_planning', 
    'performance_metrics',
    '{
        "type": "object",
        "properties": {
            "analytics_platform_setup": {"type": "boolean"},
            "custom_dashboards_created": {"type": "boolean"},
            "conversion_tracking_implemented": {"type": "boolean"},
            "attribution_model_configured": {"type": "boolean"},
            "automated_reporting_active": {"type": "boolean"},
            "kpi_monitoring_established": {"type": "boolean"},
            "roi_calculation_automated": {"type": "boolean"}
        },
        "required": ["analytics_platform_setup", "conversion_tracking_implemented", "kpi_monitoring_established"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p12_customer_acquisition', 
    'Customer Acquisition & Conversion Optimization',
    'customer_acquisition',
    'go_to_market', 
    'sales_funnel',
    '{
        "type": "object",
        "properties": {
            "acquisition_funnel_optimized": {"type": "boolean"},
            "lead_generation_system_active": {"type": "boolean"},
            "conversion_rate_improved": {"type": "boolean"},
            "customer_acquisition_cost_optimized": {"type": "boolean"},
            "lifetime_value_calculated": {"type": "boolean"},
            "retention_strategies_implemented": {"type": "boolean"},
            "referral_program_launched": {"type": "boolean"}
        },
        "required": ["acquisition_funnel_optimized", "lead_generation_system_active"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p12_automation_systems', 
    'Marketing Automation & Technology Stack',
    'marketing_automation',
    'product_development', 
    'technology_stack',
    '{
        "type": "object",
        "properties": {
            "martech_stack_implemented": {"type": "boolean"},
            "email_automation_flows_active": {"type": "boolean"},
            "social_media_automation_setup": {"type": "boolean"},
            "lead_scoring_system_active": {"type": "boolean"},
            "crm_integration_complete": {"type": "boolean"},
            "workflow_automation_optimized": {"type": "boolean"},
            "ai_optimization_enabled": {"type": "boolean"}
        },
        "required": ["martech_stack_implemented", "email_automation_flows_active", "crm_integration_complete"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p12_growth_experiments', 
    'Growth Marketing & Experimentation Framework',
    'growth_marketing',
    'go_to_market', 
    'growth_strategy',
    '{
        "type": "object",
        "properties": {
            "growth_experiment_framework_setup": {"type": "boolean"},
            "ab_testing_system_implemented": {"type": "boolean"},
            "viral_mechanisms_designed": {"type": "boolean"},
            "referral_systems_optimized": {"type": "boolean"},
            "product_marketing_integrated": {"type": "boolean"},
            "user_onboarding_optimized": {"type": "boolean"},
            "retention_experiments_running": {"type": "boolean"}
        },
        "required": ["growth_experiment_framework_setup", "ab_testing_system_implemented"]
    }'::jsonb,
    NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    "portfolioSection" = EXCLUDED."portfolioSection",
    "portfolioField" = EXCLUDED."portfolioField", 
    "dataSchema" = EXCLUDED."dataSchema",
    "updatedAt" = NOW();

COMMIT;

SELECT 'P12 Marketing Activity Types Successfully Created!' as status,
       COUNT(*) as activity_types_created
FROM "ActivityType" 
WHERE id LIKE 'p12_%';