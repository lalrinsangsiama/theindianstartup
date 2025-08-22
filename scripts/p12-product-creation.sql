-- P12 Marketing Mastery - Product Creation
-- Date: 2025-08-21

BEGIN;

-- Create P12 Marketing Mastery product
INSERT INTO "Product" (
    id, code, title, description, price, "isBundle", "estimatedDays", metadata, "createdAt", "updatedAt"
) VALUES (
    'p12_marketing',
    'p12_marketing', 
    'Marketing Mastery - Complete Growth Engine',
    'Build a data-driven marketing machine generating predictable growth across all channels with expert guidance from Flipkart, Zomato, and Nykaa leadership teams.',
    9999,
    false,
    60,
    jsonb_build_object(
        'highlights', ARRAY[
            '500+ Marketing Templates (Worth ₹5,00,000+)',
            '50+ Hours Expert Masterclasses',
            'Triple Industry Certification',
            'Advanced Analytics & Tools Suite',
            '60-Day Implementation Framework',
            'ROI: 1,500x Return on Investment'
        ],
        'outcomes', ARRAY[
            'Data-driven marketing engine with multi-channel campaigns',
            'Measurable ROI and predictable customer acquisition system', 
            'Marketing leadership capabilities and strategic thinking',
            'Advanced analytics and performance optimization skills',
            'Industry-recognized certifications and career acceleration',
            'Complete marketing technology stack mastery'
        ],
        'expert_faculty', ARRAY[
            'Kalyan Krishnamurthy (Former CEO, Flipkart)',
            'Deepinder Goyal (CEO, Zomato)',
            'Falguni Nayar (CEO, Nykaa)',
            'Sameer Nigam (CEO, PhonePe)',
            '50+ Marketing Leaders from Unicorn Companies'
        ],
        'certifications', ARRAY[
            'Marketing Mastery Professional Certificate',
            'Performance Marketing Expert Certificate',
            'Strategic Marketing Leadership Certificate'
        ],
        'tools_included', ARRAY[
            '25+ Advanced Analytics Tools',
            '500+ Professional Templates',
            'Marketing Technology Stack',
            'Real-time Performance Dashboards',
            'Predictive Analytics Models'
        ],
        'course_value', '₹50,00,000+ in professional marketing resources',
        'target_roi', '10x-50x return within 12 months',
        'career_impact', '50-300% salary increase potential',
        'business_impact', '200-500% revenue growth capability'
    ),
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    "estimatedDays" = EXCLUDED."estimatedDays",
    metadata = EXCLUDED.metadata,
    "updatedAt" = NOW();

COMMIT;

SELECT 'P12 Marketing Mastery Product Successfully Created!' as status;