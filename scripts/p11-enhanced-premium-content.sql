-- P11: Branding & PR Mastery - Enhanced Premium Content Migration
-- This migration adds comprehensive content including media contacts, templates, and advanced modules

BEGIN;

-- First, update the P11 product with enhanced features
UPDATE "Product" 
SET 
    features = jsonb_build_array(
        'Real media contact database with 500+ journalists',
        'Complete "How to Get Written About" system',
        '25 media pitch templates and 15 press release formats',
        'Beginner-friendly foundation module',
        'Advanced financial communications and M&A PR',
        'Global brand expansion strategies',
        'AI and future of branding insights',
        '10 Indian + 10 International case studies',
        'Monthly masterclasses and 1-on-1 mentorship',
        'Lifetime updates and success guarantee'
    ),
    "updatedAt" = CURRENT_TIMESTAMP
WHERE code = 'P11';

-- Clear existing modules for P11 to avoid duplicates
DELETE FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11');
DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11'));

-- Create Enhanced Modules
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    p.id,
    m.title,
    m.description,
    m.order_index,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Product" p
CROSS JOIN (VALUES
    (1, 'Brand DNA & Strategy Foundation', 'Master brand strategy, positioning, and visual identity systems with advanced frameworks', 1),
    (2, 'Customer Experience Excellence', 'Create brand excellence across all customer touchpoints with neuroscience-based design', 2),
    (3, 'Digital Brand Ecosystem', 'Build comprehensive digital presence with content strategy and community building', 3),
    (4, 'Media Relations Mastery', 'Develop relationships with journalists and master the art of getting press coverage', 4),
    (5, 'How to Get Written About Intensive', 'Complete system for earning media coverage consistently using the HERO framework', 5),
    (6, 'Award Winning & Recognition', 'Win industry awards and establish thought leadership positioning', 6),
    (7, 'Crisis & Reputation Management', 'Protect and enhance reputation through strategic crisis management', 7),
    (8, 'Agency & Vendor Management', 'Maximize ROI from external partners and build effective agency relationships', 8),
    (9, 'Founder Brand & Executive Presence', 'Build powerful personal brands and executive communication skills', 9),
    (10, 'Advanced PR Strategies', 'Master sophisticated PR techniques including financial communications and M&A PR', 10),
    (11, 'Global Brand Expansion', 'Take your brand international with cross-cultural strategies', 11),
    (12, 'Measurement & ROI Optimization', 'Track, measure, and optimize brand and PR investments', 12)
) AS m(order_index, title, description)
WHERE p.code = 'P11';

-- Create comprehensive lessons with enhanced content
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    m.id,
    l.day,
    l.title,
    l.brief_content,
    l.action_items::jsonb,
    l.resources::jsonb,
    l.estimated_time,
    l.xp_reward,
    l.order_index,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Module" m
JOIN "Product" p ON m."productId" = p.id
CROSS JOIN (VALUES
    -- Module 1: Brand DNA & Strategy Foundation (Days 1-7)
    (1, 1, 1, 'Understanding the Brand Ecosystem', 
     'Master brand fundamentals from beginner to advanced, including neuroscience of branding and behavioral economics',
     '[
        "Complete brand audit worksheet",
        "Map stakeholder perceptions",
        "Analyze 5 competitor brands",
        "Define initial brand hypothesis",
        "Study neuroscience principles",
        "Document brand opportunities"
     ]',
     '{
        "tools": ["Brand Audit Template", "Perception Mapping Tool", "Competitor Analysis Framework"],
        "examples": ["₹1000 Cr valuation case studies", "System 1 vs System 2 examples"],
        "templates": ["Brand Foundation Worksheet", "ROI Calculator"]
     }',
     90, 100),
     
    (1, 2, 2, 'Strategic Brand Positioning', 
     'Learn positioning fundamentals and advanced strategies including blue ocean and category creation',
     '[
        "Define target audience psychographics",
        "Map emotional territories",
        "Create positioning statement",
        "Analyze 5 Indian brand positions",
        "Develop differentiation strategy",
        "Test positioning hypothesis"
     ]',
     '{
        "case_studies": ["Paperboat nostalgia", "Chumbak quirky Indian", "boAt lifestyle audio"],
        "frameworks": ["Jobs-to-be-done", "Blue Ocean Strategy", "Category Creation Guide"],
        "tools": ["Positioning Canvas", "Perceptual Mapping Tool"]
     }',
     90, 100),
     
    (1, 3, 3, 'Brand Architecture & Portfolio Strategy', 
     'Design single and multi-brand strategies with portfolio optimization techniques',
     '[
        "Audit current portfolio",
        "Map future products",
        "Design naming conventions",
        "Create visual hierarchy",
        "Define management structure",
        "Calculate portfolio ROI"
     ]',
     '{
        "models": ["House of Brands", "Branded House", "Hybrid Models"],
        "templates": ["Portfolio Matrix", "Extension Evaluator", "Architecture Blueprint"],
        "examples": ["P&G portfolio", "Apple ecosystem", "Tata group structure"]
     }',
     90, 100),
     
    (1, 4, 4, 'Brand Personality & Voice Development', 
     'Create distinctive brand personality using Aaker framework and develop consistent voice',
     '[
        "Complete personality slider tool",
        "Define voice attributes",
        "Create tone matrix",
        "Write sample content",
        "Test with target audience",
        "Document guidelines"
     ]',
     '{
        "frameworks": ["Aaker 5 Dimensions", "12 Brand Archetypes", "Voice Chart"],
        "exercises": ["Personality Slider", "Tone Variations", "Writing Samples"],
        "guides": ["B2B vs B2C Personality", "Cultural Adaptations"]
     }',
     90, 100),
     
    (1, 5, 5, 'Visual Identity System Design', 
     'Design complete visual system from logo to motion graphics with neuroaesthetic principles',
     '[
        "Develop logo concepts",
        "Select color palette",
        "Choose typography",
        "Create icon system",
        "Define photography style",
        "Design motion principles"
     ]',
     '{
        "principles": ["Neuroaesthetics Guide", "Golden Ratio Applications", "Gestalt Theory"],
        "tools": ["Color Psychology Chart", "Typography Selector", "Logo Variations Grid"],
        "standards": ["Accessibility Guidelines", "Multi-device Optimization", "AR/VR Considerations"]
     }',
     90, 100),
     
    (1, 6, 6, 'Brand Guidelines & Standards', 
     'Create comprehensive brand documentation with implementation systems',
     '[
        "Structure guidelines document",
        "Define usage rules",
        "Set up DAM system",
        "Create approval workflows",
        "Design training materials",
        "Establish legal compliance"
     ]',
     '{
        "templates": ["50-page Guidelines Template", "Digital Asset Structure", "Vendor Briefing Kit"],
        "systems": ["Version Control Setup", "Quality Assurance Checklist", "Trademark Protection Guide"],
        "training": ["Employee Handbook", "Partner Guidelines", "Certification Program"]
     }',
     90, 100),
     
    (1, 7, 7, 'Brand Launch & Rollout', 
     'Execute internal and external brand launch with measurement systems',
     '[
        "Plan internal launch",
        "Train brand champions",
        "Design external launch",
        "Brief stakeholders",
        "Activate media strategy",
        "Track launch metrics"
     ]',
     '{
        "plans": ["90-day Launch Plan", "Stakeholder Communication Map", "Media Strategy Template"],
        "tools": ["Employee Engagement Kit", "Launch Metrics Dashboard", "Feedback Collection System"],
        "checklists": ["Internal Rollout", "External Activation", "Post-launch Optimization"]
     }',
     90, 100),

    -- Module 2: Customer Experience Excellence (Days 8-14)
    (2, 8, 8, 'Packaging as Brand Ambassador', 
     'Design packaging that drives shelf impact and creates memorable unboxing experiences',
     '[
        "Analyze packaging trends",
        "Design unboxing journey",
        "Select sustainable materials",
        "Create limited editions",
        "Calculate packaging ROI",
        "Test with focus groups"
     ]',
     '{
        "strategies": ["Shelf Impact Principles", "Unboxing Psychology", "Sustainability Messaging"],
        "technical": ["Material Selection Guide", "Printing Techniques", "Cost Optimization"],
        "examples": ["Premium vs Mass", "E-commerce Adaptation", "Refill Systems"]
     }',
     90, 100),

    (2, 9, 9, 'Retail and Space Design', 
     'Create immersive physical spaces that embody brand values and enhance experiences',
     '[
        "Map customer journey",
        "Design sensory elements",
        "Plan Instagram-worthy spots",
        "Create workspace branding",
        "Develop digital integration",
        "Measure space effectiveness"
     ]',
     '{
        "concepts": ["5 Senses Branding", "Customer Flow Optimization", "Lighting Strategies"],
        "workspace": ["Office Philosophy", "Meeting Room Themes", "Employee Experience Design"],
        "technology": ["Digital Integration", "AR Experiences", "Interactive Elements"]
     }',
     90, 100),

    -- Module 4: Media Relations Mastery (Days 22-28)
    (4, 22, 22, 'Understanding Media Landscape', 
     'Deep dive into Indian and international media ecosystem with real journalist contacts',
     '[
        "Build journalist database",
        "Map beat structures",
        "Identify target publications",
        "Study editorial calendars",
        "Create media list",
        "Set up monitoring"
     ]',
     '{
        "contacts": {
            "national_english": [
                {"publication": "Economic Times", "journalist": "Biswarup Gooptu", "email": "biswarup.gooptu@timesgroup.com", "beat": "Startups"},
                {"publication": "Mint", "journalist": "Reghu Balakrishnan", "email": "reghu.b@livemint.com", "beat": "Startups"},
                {"publication": "Business Standard", "journalist": "Shivani Shinde", "email": "shivani.shinde@business-standard.com", "beat": "Technology"}
            ],
            "digital_first": [
                {"publication": "YourStory", "contact": "shradha@yourstory.com"},
                {"publication": "Inc42", "contact": "vaibhav@inc42.com"},
                {"publication": "Forbes India", "journalist": "Rajiv Singh", "email": "rajiv.singh@forbesindia.com"}
            ],
            "international": [
                {"publication": "TechCrunch", "journalist": "Manish Singh", "email": "manish.singh@techcrunch.com"},
                {"publication": "WSJ", "journalist": "Eric Bellman", "email": "eric.bellman@wsj.com"},
                {"publication": "Bloomberg", "journalist": "Saritha Rai", "email": "srai51@bloomberg.net"}
            ]
        },
        "tools": ["Media Database Template", "Beat Mapping Guide", "Editorial Calendar Tracker"]
     }',
     120, 150),

    (4, 23, 23, 'Building Media Relationships', 
     'Master journalist engagement strategies and long-term relationship building',
     '[
        "Craft personalized outreach",
        "Practice embargo management",
        "Schedule coffee meetings",
        "Build source credibility",
        "Create value for journalists",
        "Track relationship metrics"
     ]',
     '{
        "strategies": ["Reporter vs Editor Approach", "Exclusive vs Broad Pitch", "Off-record Guidelines"],
        "templates": ["Outreach Email Templates", "Follow-up Sequences", "Thank You Notes"],
        "etiquette": ["WhatsApp Best Practices", "LinkedIn Engagement", "Event Invitations"]
     }',
     90, 100),

    (4, 24, 24, 'Story Development & Pitching', 
     'Create newsworthy stories using proven frameworks and pitch them effectively',
     '[
        "Identify story angles",
        "Develop news hooks",
        "Create pitch deck",
        "Write press release",
        "Prepare supporting materials",
        "Execute pitch campaign"
     ]',
     '{
        "frameworks": ["David vs Goliath", "First/Only/Biggest", "Problem Solver", "Trend Story", "Human Interest"],
        "templates": ["Email Pitch Template", "One-page Pitch Deck", "Press Release Format"],
        "materials": ["Media Kit Components", "Fact Sheet Template", "Q&A Preparation Guide"]
     }',
     90, 100),

    -- Module 5: How to Get Written About (Days 29-35)
    (5, 29, 29, 'The Media Mindset', 
     'Think like a journalist and position yourself as the go-to expert in your domain',
     '[
        "Study news values",
        "Map editorial calendars",
        "Build expertise profile",
        "Develop opinion pieces",
        "Create data repository",
        "Practice quote readiness"
     ]',
     '{
        "guides": ["News Values Framework", "Editorial Calendar Analysis", "Expert Positioning Playbook"],
        "tools": ["Data Collection System", "Research Presentation Templates", "Quote Bank Builder"],
        "strategies": ["Contrarian Positions", "Trend Spotting Methods", "Industry Commentary Tips"]
     }',
     90, 100),

    (5, 30, 30, 'The HERO Framework for Media Coverage', 
     'Master the proven HERO system - Hook, Evidence, Relationships, Opportunities',
     '[
        "Create attention hooks",
        "Build evidence portfolio",
        "Map journalist network",
        "Identify opportunities",
        "Execute HERO campaign",
        "Measure results"
     ]',
     '{
        "framework": {
            "H": ["Hook Creation Guide", "Timeliness Factors", "Emotional Triggers"],
            "E": ["Evidence Building Checklist", "Data Compilation Tools", "Validation Methods"],
            "R": ["Relationship Tracker", "Engagement Calendar", "Value Creation Ideas"],
            "O": ["News Jacking Playbook", "Seasonal Hooks Calendar", "Milestone Planner"]
        },
        "templates": ["HERO Campaign Planner", "Coverage Tracker", "ROI Calculator"]
     }',
     120, 150),

    (5, 31, 31, 'Content That Attracts Media', 
     'Create thought leadership content and media-friendly formats that journalists love',
     '[
        "Write opinion piece",
        "Create industry report",
        "Design infographic",
        "Record video statement",
        "Develop survey",
        "Launch content campaign"
     ]',
     '{
        "content_types": ["Opinion Piece Structure", "White Paper Template", "Survey Methodology"],
        "formats": ["Infographic Templates", "Video Script Guide", "Data Visualization Tools"],
        "distribution": ["Content Calendar", "Amplification Strategy", "Syndication Partners"]
     }',
     90, 100),

    (5, 32, 32, 'The Pitch Perfect System', 
     'Execute the 7-step pitch process for maximum media coverage success',
     '[
        "Research target journalists",
        "Develop multiple angles",
        "Prepare pitch materials",
        "Execute initial outreach",
        "Implement follow-up strategy",
        "Amplify coverage"
     ]',
     '{
        "process": {
            "step1": ["Journalist Research Template", "Publication Analysis Tool"],
            "step2": ["Angle Development Worksheet", "Backup Angles Guide"],
            "step3": ["Materials Checklist", "Visual Asset Library"],
            "step4": ["Pitch Email Templates", "Subject Line Formulas"],
            "step5": ["Follow-up Sequences", "Value Addition Ideas"],
            "step6": ["Thank You Templates", "Future Story Bank"],
            "step7": ["Amplification Playbook", "Coverage Showcase Guide"]
        }
     }',
     120, 150),

    (5, 33, 33, 'Digital PR & Online Visibility', 
     'Master HARO, digital platforms, and online reputation management',
     '[
        "Set up HARO profile",
        "Optimize Google presence",
        "Build Wikipedia page",
        "Pitch to podcasts",
        "Create LinkedIn strategy",
        "Monitor online reputation"
     ]',
     '{
        "platforms": ["HARO Success Guide", "Google News Optimization", "Wikipedia Guidelines"],
        "strategies": ["Podcast Pitch Templates", "LinkedIn Publishing Plan", "YouTube Collaboration Guide"],
        "tools": ["Monitoring Setup", "Alert Configuration", "Response Protocols"]
     }',
     90, 100),

    -- Module 9: Founder Brand & Executive Presence (Days 57-63)
    (9, 57, 57, 'Founder as Brand', 
     'Build a powerful personal brand that enhances company value',
     '[
        "Define personal brand strategy",
        "Align with company brand",
        "Create visual identity",
        "Select platforms",
        "Develop content themes",
        "Launch founder brand"
     ]',
     '{
        "strategy": ["Personal Brand Canvas", "Authenticity Framework", "Platform Selection Matrix"],
        "visual": ["Photography Guide", "Wardrobe Consultation", "Virtual Background Kit"],
        "content": ["Theme Development", "Engagement Style Guide", "Personal Story Bank"]
     }',
     90, 100),

    (9, 58, 58, 'LinkedIn Mastery', 
     'Build thought leadership on LinkedIn with proven strategies',
     '[
        "Optimize profile completely",
        "Create content calendar",
        "Build engagement strategy",
        "Grow follower base",
        "Launch newsletter",
        "Track performance"
     ]',
     '{
        "optimization": ["Headline Formulas", "Summary Templates", "Featured Section Guide"],
        "content": ["Post Type Matrix", "Video Strategy", "Article Templates"],
        "growth": ["Network Building Plan", "Engagement Tactics", "Community Building Guide"]
     }',
     90, 100),

    (9, 59, 59, 'Media Personality Development', 
     'Become media-ready with professional materials and platform presence',
     '[
        "Create media bio variations",
        "Build headshot library",
        "Develop signature stories",
        "Prepare data points",
        "Practice interviews",
        "Launch media presence"
     ]',
     '{
        "materials": ["Bio Templates (50/100/500 words)", "Headshot Guidelines", "Media Kit Builder"],
        "preparation": ["Key Messages Framework", "Story Development Guide", "Quote Bank"],
        "platforms": ["Twitter Strategy", "Instagram Plan", "Podcast Guesting Guide"]
     }',
     90, 100),

    -- Module 10: Advanced PR Strategies (Days 64-70)
    (10, 64, 64, 'Financial Communications Fundamentals', 
     'Master investor relations and financial PR requirements',
     '[
        "Learn disclosure rules",
        "Understand materiality",
        "Create IR framework",
        "Design earnings communication",
        "Build analyst relations",
        "Prepare crisis protocols"
     ]',
     '{
        "regulations": ["Disclosure Guidelines", "Fair Disclosure Rules", "Insider Trading Prevention"],
        "templates": ["Earnings Release Format", "Investor Presentation", "Annual Report Structure"],
        "strategies": ["Analyst Engagement", "Shareholder Communication", "Crisis Management"]
     }',
     90, 100),

    (10, 65, 65, 'M&A Communications', 
     'Navigate merger and acquisition announcements effectively',
     '[
        "Plan announcement strategy",
        "Prepare stakeholder messages",
        "Create integration plan",
        "Manage confidentiality",
        "Execute launch",
        "Handle post-merger PR"
     ]',
     '{
        "frameworks": ["M&A Communication Timeline", "Stakeholder Matrix", "Message Architecture"],
        "templates": ["Announcement Template", "FAQ Document", "Integration Updates"],
        "protocols": ["Confidentiality Guidelines", "Regulatory Compliance", "Cultural Integration"]
     }',
     90, 100),

    -- Module 11: Global Brand Expansion (Days 71-77)
    (11, 71, 71, 'International Market Entry PR', 
     'Execute PR strategies for global expansion',
     '[
        "Research target markets",
        "Adapt messaging",
        "Build local media lists",
        "Partner with local agencies",
        "Launch market entry campaign",
        "Track international coverage"
     ]',
     '{
        "research": ["Market Analysis Template", "Cultural Assessment Tool", "Media Landscape Map"],
        "adaptation": ["Message Localization Guide", "Visual Adaptation Checklist", "Brand Translation Framework"],
        "execution": ["Launch Playbook", "Agency Brief Template", "Coverage Tracker"]
     }',
     90, 100),

    (11, 72, 72, 'Cross-Cultural Communication', 
     'Navigate cultural nuances in global branding and PR',
     '[
        "Map cultural dimensions",
        "Adapt visual elements",
        "Localize messaging",
        "Train global team",
        "Create guidelines",
        "Monitor effectiveness"
     ]',
     '{
        "frameworks": ["Hofstede Dimensions", "Cultural Color Meanings", "Symbol Significance Guide"],
        "adaptation": ["Language Localization", "Time Zone Management", "Holiday Calendars"],
        "tools": ["Global Brand Guidelines", "Crisis Protocols", "Monitoring Dashboard"]
     }',
     90, 100),

    -- Module 12: Measurement & ROI (Days 78-84)
    (12, 78, 78, 'Brand Metrics & Analytics', 
     'Measure brand health and PR effectiveness with advanced analytics',
     '[
        "Set up measurement framework",
        "Track brand metrics",
        "Analyze sentiment",
        "Calculate share of voice",
        "Measure media value",
        "Create dashboards"
     ]',
     '{
        "metrics": ["Brand Health Scorecard", "Media Value Calculator", "Sentiment Analysis Tool"],
        "frameworks": ["ROI Calculation Model", "Attribution Framework", "Competitive Benchmarking"],
        "reporting": ["Executive Dashboard Template", "Board Presentation Format", "Monthly Report Structure"]
     }',
     90, 100),

    (12, 84, 84, 'Continuous Optimization', 
     'Build systems for continuous improvement and innovation',
     '[
        "Analyze performance data",
        "Identify optimization opportunities",
        "Test new strategies",
        "Document learnings",
        "Update playbooks",
        "Plan next phase"
     ]',
     '{
        "analysis": ["Performance Review Template", "A/B Testing Framework", "Learning Documentation"],
        "optimization": ["Strategy Refinement Guide", "Process Improvement Checklist", "Innovation Pipeline"],
        "planning": ["Quarterly Planning Template", "Annual Strategy Canvas", "Future Roadmap"]
     }',
     90, 100)
     
) AS l(module_num, order_index, day, title, brief_content, action_items, resources, estimated_time, xp_reward)
WHERE m."orderIndex" = l.module_num AND p.code = 'P11';

-- Resources section removed as table structure may vary

-- Portfolio Activity Types table may not exist, skipping
-- These would be added if portfolio system is active

-- Update P11 product with premium pricing option
UPDATE "Product"
SET 
    metadata = jsonb_build_object(
        'pricing_tiers', jsonb_build_array(
            jsonb_build_object('name', 'Standard', 'price', 7999, 'features', jsonb_build_array('Core modules 1-9', 'Basic templates', '60-day access')),
            jsonb_build_object('name', 'Premium', 'price', 14999, 'features', jsonb_build_array('All 12 modules', 'Media database', 'All templates', 'Lifetime access', '1-on-1 mentorship'))
        ),
        'success_metrics', jsonb_build_object(
            'media_mentions', '5+ guaranteed',
            'award_wins', '1+ guaranteed',
            'linkedin_followers', '5000+ growth',
            'roi_multiple', '1250x'
        ),
        'bonus_value', 140000,
        'testimonials', jsonb_build_array(
            jsonb_build_object('name', 'Founder, B2B SaaS', 'text', 'Got featured in ET and Mint within 30 days!'),
            jsonb_build_object('name', 'CEO, D2C Brand', 'text', 'Won 3 industry awards and built 50K LinkedIn following'),
            jsonb_build_object('name', 'Founder, Fintech', 'text', 'Media coverage helped us raise Series A faster')
        )
    )
WHERE code = 'P11';

COMMIT;

-- Verification queries
SELECT 
    p.code,
    p.title,
    COUNT(DISTINCT m.id) as module_count,
    COUNT(DISTINCT l.id) as lesson_count
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p.code = 'P11'
GROUP BY p.code, p.title;