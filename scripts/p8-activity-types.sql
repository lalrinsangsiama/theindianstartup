-- P8: Activity Types for Portfolio Integration
-- Date: 2025-08-21

BEGIN;

-- Create P8-specific activity types for portfolio integration
INSERT INTO "ActivityType" (
    id, name, category, "portfolioSection", "portfolioField", "dataSchema", "createdAt", "updatedAt"
) VALUES 
(
    'p8_data_room_setup', 
    'Goldman Sachs-Standard Data Room Setup',
    'data_room_excellence', 
    'idea_vision', 
    'data_room_structure',
    '{
        "type": "object",
        "properties": {
            "folder_structure_implemented": {"type": "boolean"},
            "documents_organized": {"type": "number"},
            "security_measures_active": {"type": "boolean"},
            "access_permissions_set": {"type": "boolean"},
            "naming_convention_applied": {"type": "boolean"},
            "version_control_enabled": {"type": "boolean"}
        },
        "required": ["folder_structure_implemented", "documents_organized"]
    }'::jsonb, 
    NOW(), NOW()
),
(
    'p8_financial_modeling', 
    'Investment Banking-Grade Financial Model',
    'financial_excellence',
    'financial_planning', 
    'financial_projections',
    '{
        "type": "object", 
        "properties": {
            "five_year_model_complete": {"type": "boolean"},
            "dcf_valuation_built": {"type": "boolean"},
            "scenario_analysis_included": {"type": "boolean"},
            "unit_economics_optimized": {"type": "boolean"},
            "investor_presentation_ready": {"type": "boolean"},
            "assumptions_documented": {"type": "boolean"}
        },
        "required": ["five_year_model_complete", "dcf_valuation_built"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p8_investor_materials', 
    'Investor Presentation Excellence',
    'investor_readiness',
    'pitch_materials', 
    'executive_summary',
    '{
        "type": "object",
        "properties": {
            "executive_summary_complete": {"type": "boolean"},
            "management_presentation_ready": {"type": "boolean"}, 
            "investor_psychology_optimized": {"type": "boolean"},
            "financial_highlights_included": {"type": "boolean"},
            "team_profiles_compelling": {"type": "boolean"},
            "market_analysis_credible": {"type": "boolean"}
        },
        "required": ["executive_summary_complete", "management_presentation_ready"]
    }'::jsonb,
    NOW(), NOW()
),
(
    'p8_dd_mastery', 
    'Due Diligence Preparation Excellence',
    'due_diligence_readiness',
    'legal_compliance', 
    'due_diligence_prep',
    '{
        "type": "object",
        "properties": {
            "qa_responses_complete": {"type": "number"},
            "red_flags_remediated": {"type": "boolean"},
            "expert_opinions_obtained": {"type": "boolean"},
            "reference_network_established": {"type": "boolean"},
            "negotiation_strategy_prepared": {"type": "boolean"},
            "timeline_optimized": {"type": "boolean"}
        },
        "required": ["qa_responses_complete", "red_flags_remediated"]
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

SELECT 'P8 Activity Types Successfully Created!' as status;