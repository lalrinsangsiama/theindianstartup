-- P11: Complete 84-Day Branding & PR Mastery Course Migration
-- This migration adds all 84 lessons with full content

BEGIN;

-- Clear existing P11 content for clean migration
DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11'));
DELETE FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11');

-- Update P11 product with complete features
UPDATE "Product" 
SET 
    title = 'Branding & PR Mastery - Premium Edition',
    description = 'Transform into a recognized industry leader with powerful brand building and strategic PR engine. Includes real media contacts, proven frameworks, and guaranteed outcomes.',
    price = 14999,
    "estimatedDays" = 84,
    features = jsonb_build_array(
        'Real media contact database with 500+ journalists',
        'Complete "How to Get Written About" HERO framework',
        '25 media pitch templates and 15 press release formats',
        'Beginner-friendly Day 0 foundation module',
        'Advanced financial communications and M&A PR',
        'Global brand expansion strategies',
        'AI and future of branding insights',
        '10 Indian + 10 International case studies',
        'Monthly masterclasses and 1-on-1 mentorship',
        'Success guarantee: 5+ media mentions, 1+ award win'
    ),
    metadata = jsonb_build_object(
        'pricing_tiers', jsonb_build_array(
            jsonb_build_object(
                'name', 'Standard',
                'price', 7999,
                'features', jsonb_build_array('Core modules 1-9', 'Basic templates', '60-day access', 'Community support')
            ),
            jsonb_build_object(
                'name', 'Premium',
                'price', 14999,
                'features', jsonb_build_array('All 12 modules', 'Media database access', 'All templates & tools', 'Lifetime access', '3 x 1-on-1 mentorship', 'Monthly masterclasses', 'Success guarantee')
            )
        ),
        'success_metrics', jsonb_build_object(
            'media_mentions', '5+ guaranteed in 90 days',
            'award_wins', '1+ industry award guaranteed',
            'linkedin_growth', '5000+ followers in 6 months',
            'brand_value', '₹5-50 Cr brand equity creation',
            'roi_multiple', '1250x expected return'
        ),
        'media_contacts', jsonb_build_object(
            'total_contacts', 500,
            'categories', jsonb_build_array('National English', 'National Hindi', 'Regional', 'Digital-First', 'International', 'TV', 'Radio', 'Podcasts'),
            'verified', true,
            'updated_quarterly', true
        ),
        'bonus_value', 140000,
        'completion_certificate', 'Master Brand Strategist',
        'prerequisites', 'None - suitable for complete beginners to advanced practitioners'
    ),
    "updatedAt" = CURRENT_TIMESTAMP
WHERE code = 'P11';

-- Create all 12 modules
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
    (1, 'Brand DNA & Strategy Foundation', 'Master brand strategy, positioning, and visual identity systems with advanced frameworks including neuroscience of branding'),
    (2, 'Customer Experience Excellence', 'Create brand excellence across all customer touchpoints with neuroscience-based design and sensory branding'),
    (3, 'Digital Brand Ecosystem', 'Build comprehensive digital presence with content strategy, social media mastery, and community building'),
    (4, 'Media Relations Mastery', 'Develop relationships with 500+ journalists and master the art of getting consistent press coverage'),
    (5, 'How to Get Written About Intensive', 'Complete HERO framework system for earning media coverage with proven pitch templates'),
    (6, 'Award Winning & Recognition', 'Win industry awards and establish thought leadership positioning with speaking opportunities'),
    (7, 'Crisis & Reputation Management', 'Protect and enhance reputation through strategic crisis management and proactive protection'),
    (8, 'Agency & Vendor Management', 'Maximize ROI from external partners and build effective agency relationships'),
    (9, 'Founder Brand & Executive Presence', 'Build powerful personal brands and executive communication skills for founders'),
    (10, 'Advanced PR Strategies', 'Master financial communications, M&A PR, and sophisticated PR techniques'),
    (11, 'Global Brand Expansion', 'Take your brand international with cross-cultural strategies and multi-market campaigns'),
    (12, 'Measurement & ROI Optimization', 'Track, measure, and optimize brand and PR investments with advanced analytics')
) AS m(order_index, title, description)
WHERE p.code = 'P11';

-- Create all 84 lessons (7 per module)
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
     'Master brand fundamentals from beginner to advanced, including neuroscience of branding, behavioral economics, and cultural codes. Learn the ₹1000 Cr valuation difference.',
     '[
        "Complete comprehensive brand audit worksheet",
        "Map all stakeholder perceptions",
        "Analyze 5 competitor brands in detail",
        "Define initial brand hypothesis",
        "Study neuroscience principles of branding",
        "Document brand opportunities and gaps"
     ]',
     '{
        "tools": ["Brand Audit Template", "Perception Mapping Tool", "Competitor Analysis Framework", "Neuroscience Guide"],
        "case_studies": ["₹1000 Cr valuation stories", "System 1 vs System 2 examples", "Memory structure analysis"],
        "templates": ["Brand Foundation Worksheet", "ROI Calculator", "Investment Timeline"],
        "reading": ["Behavioral Economics in Branding", "Cultural Codes Guide", "Semiotics Handbook"]
     }',
     120, 150),
     
    (1, 2, 2, 'Strategic Brand Positioning Mastery', 
     'Learn positioning fundamentals and advanced strategies including blue ocean, category creation, and multi-segment positioning with Indian case studies.',
     '[
        "Define target audience psychographics in detail",
        "Map emotional and functional territories",
        "Create powerful positioning statement",
        "Analyze 5 Indian brand positions (Paperboat, Chumbak, boAt)",
        "Develop differentiation strategy",
        "Test positioning with target audience"
     ]',
     '{
        "case_studies": ["Paperboat nostalgia positioning", "Chumbak Indian quirky", "boAt lifestyle audio", "Sleepy Owl premium coffee", "Mamaearth toxin-free"],
        "frameworks": ["Jobs-to-be-done", "Blue Ocean Strategy", "Category Creation Guide", "Flanking Strategies"],
        "tools": ["Positioning Canvas", "Perceptual Mapping Tool", "Occasion-based Framework"],
        "templates": ["Positioning Statement Builder", "Territory Map", "Testing Protocol"]
     }',
     120, 150),
     
    (1, 3, 3, 'Brand Architecture & Portfolio Strategy', 
     'Design single and multi-brand strategies with portfolio optimization. Learn house of brands vs branded house models.',
     '[
        "Audit current and future portfolio",
        "Map product relationships",
        "Design naming conventions",
        "Create visual hierarchy system",
        "Define management structure",
        "Calculate portfolio ROI and synergies"
     ]',
     '{
        "models": ["House of Brands (P&G model)", "Branded House (Apple model)", "Hybrid Models", "Endorsement Strategies"],
        "templates": ["Portfolio Matrix", "Extension Evaluator", "Architecture Blueprint", "Naming Convention Guide"],
        "examples": ["Tata group structure", "HUL portfolio", "ITC brands", "Reliance ecosystem"],
        "tools": ["Portfolio Optimizer", "Synergy Calculator", "Risk Assessment Matrix"]
     }',
     90, 100),
     
    (1, 4, 4, 'Brand Personality & Voice Development', 
     'Create distinctive brand personality using Aaker framework and 12 archetypes. Develop consistent voice across all touchpoints.',
     '[
        "Complete personality slider assessment",
        "Define voice attributes and tone variations",
        "Create comprehensive tone matrix",
        "Write sample content in brand voice",
        "Test personality with target audience",
        "Document complete voice guidelines"
     ]',
     '{
        "frameworks": ["Aaker 5 Dimensions Detailed", "12 Brand Archetypes Deep Dive", "Voice Chart Builder"],
        "exercises": ["Personality Slider Tool", "Tone Variation Workshop", "Writing Style Guide"],
        "guides": ["B2B vs B2C Personality", "Cultural Adaptations for India", "Category Norms"],
        "examples": ["Zomato witty voice", "CRED sophisticated tone", "Swiggy friendly personality"]
     }',
     90, 100),
     
    (1, 5, 5, 'Visual Identity System Design', 
     'Design complete visual system from logo to motion graphics using neuroaesthetic principles and cultural symbolism.',
     '[
        "Develop logo concepts and variations",
        "Select color palette with cultural meaning",
        "Choose typography system",
        "Create comprehensive icon library",
        "Define photography and illustration style",
        "Design motion and animation principles"
     ]',
     '{
        "principles": ["Neuroaesthetics Guide", "Golden Ratio Applications", "Gestalt Theory", "Cultural Symbolism"],
        "tools": ["Color Psychology Chart for India", "Typography Selector", "Logo Grid System", "Icon Builder"],
        "standards": ["Accessibility Guidelines", "Multi-device Optimization", "AR/VR Considerations", "Future-proofing"],
        "examples": ["Responsive logo systems", "Cultural color meanings", "Festival adaptations"]
     }',
     120, 150),
     
    (1, 6, 6, 'Brand Guidelines & Standards Creation', 
     'Create comprehensive 50-page brand guidelines with implementation systems and digital asset management.',
     '[
        "Structure comprehensive guidelines document",
        "Define detailed usage rules",
        "Set up Digital Asset Management system",
        "Create approval workflows",
        "Design training materials",
        "Establish legal and trademark compliance"
     ]',
     '{
        "templates": ["50-page Guidelines Template", "Digital Asset Structure", "Vendor Briefing Kit", "Training Modules"],
        "systems": ["Version Control Setup", "Quality Assurance Checklist", "Trademark Protection Guide", "Copyright Management"],
        "tools": ["DAM Platform Setup", "Approval Workflow Builder", "Brand Portal Configuration"],
        "examples": ["Global brand standards", "Franchise guidelines", "Partner toolkits"]
     }',
     90, 100),
     
    (1, 7, 7, 'Brand Launch & Rollout Excellence', 
     'Execute internal and external brand launch with measurement systems and stakeholder engagement.',
     '[
        "Plan comprehensive internal launch",
        "Train and activate brand champions",
        "Design external launch campaign",
        "Brief all stakeholders effectively",
        "Activate multi-channel media strategy",
        "Track and optimize launch metrics"
     ]',
     '{
        "plans": ["90-day Launch Plan", "Stakeholder Communication Map", "Media Strategy Template", "Event Planning Guide"],
        "tools": ["Employee Engagement Kit", "Launch Metrics Dashboard", "Feedback Collection System", "ROI Tracker"],
        "checklists": ["Internal Rollout Checklist", "External Activation Guide", "Post-launch Optimization"],
        "campaigns": ["Launch event ideas", "Social media calendar", "PR timeline"]
     }',
     120, 150),

    -- Module 2: Customer Experience Excellence (Days 8-14)
    (2, 8, 8, 'Packaging as Brand Ambassador', 
     'Design packaging that drives shelf impact, creates memorable unboxing experiences, and communicates sustainability.',
     '[
        "Analyze packaging trends and innovations",
        "Design complete unboxing journey",
        "Select sustainable materials and messaging",
        "Create limited edition strategies",
        "Calculate packaging ROI and costs",
        "Test designs with focus groups"
     ]',
     '{
        "strategies": ["Shelf Impact Principles", "Unboxing Psychology", "Sustainability Messaging", "Premium vs Mass"],
        "technical": ["Material Selection Guide", "Printing Techniques", "Cost Optimization", "Regulatory Compliance"],
        "examples": ["D2C packaging excellence", "E-commerce optimization", "Refill systems", "QR code integration"],
        "tools": ["Package Design Checklist", "Cost Calculator", "Sustainability Scorecard"]
     }',
     90, 100),

    (2, 9, 9, 'Retail and Space Design Excellence', 
     'Create immersive physical spaces that embody brand values with sensory branding and digital integration.',
     '[
        "Map complete customer journey in space",
        "Design 5-senses brand experience",
        "Plan Instagram-worthy photo spots",
        "Create workspace branding strategy",
        "Develop AR/digital integration",
        "Measure space effectiveness and ROI"
     ]',
     '{
        "concepts": ["5 Senses Branding Guide", "Customer Flow Optimization", "Lighting Psychology", "Sound Design"],
        "workspace": ["Office Design Philosophy", "Meeting Room Themes", "Employee Experience Design", "Reception Impact"],
        "technology": ["AR Experience Builder", "Interactive Display Guide", "Digital Signage Strategy", "App Integration"],
        "examples": ["Retail theater concepts", "Pop-up store designs", "Experience centers"]
     }',
     90, 100),

    (2, 10, 10, 'Digital Touchpoint Excellence', 
     'Master website, app, and digital experience branding with micro-interactions and conversion optimization.',
     '[
        "Audit all digital touchpoints",
        "Design homepage storytelling",
        "Create app onboarding experience",
        "Define micro-interactions and animations",
        "Optimize for conversions",
        "Implement personalization strategy"
     ]',
     '{
        "web": ["Homepage Storytelling Guide", "Navigation Philosophy", "Loading Experience Design", "404 Page Personality"],
        "app": ["Onboarding Best Practices", "Gesture Language", "Push Notification Voice", "Gamification Elements"],
        "tools": ["Heatmap Analysis", "A/B Testing Framework", "Personalization Engine", "Analytics Setup"],
        "examples": ["Best-in-class websites", "App experiences", "Chatbot personalities"]
     }',
     90, 100),

    (2, 11, 11, 'Customer Service as Brand', 
     'Transform customer service into brand experience with response frameworks and surprise-delight strategies.',
     '[
        "Define service design principles",
        "Create response time standards",
        "Develop escalation personality",
        "Design surprise and delight program",
        "Build complaint handling framework",
        "Implement loyalty building system"
     ]',
     '{
        "templates": ["Response Templates Library", "Escalation Scripts", "Apology Framework", "Thank You Sequences"],
        "strategies": ["Proactive Communication", "Recovery Paradox", "Lifetime Value Focus", "Omnichannel Consistency"],
        "tools": ["Service Blueprint", "Journey Mapping", "Satisfaction Tracker", "NPS Implementation"],
        "examples": ["Zappos service culture", "Amazon customer obsession", "Zomato complaint handling"]
     }',
     90, 100),

    (2, 12, 12, 'Community Building & Engagement', 
     'Build brand communities with ambassador programs, user-generated content, and engagement strategies.',
     '[
        "Design community strategy and structure",
        "Launch brand ambassador program",
        "Create user-generated content campaigns",
        "Plan exclusive experiences and events",
        "Implement referral and loyalty programs",
        "Measure community health and growth"
     ]',
     '{
        "programs": ["Ambassador Program Playbook", "Referral System Design", "Loyalty Tier Structure", "Exclusive Access Strategy"],
        "engagement": ["Content Calendar Template", "UGC Campaign Guide", "Contest Framework", "Meetup Planning Kit"],
        "tools": ["Community Platform Selection", "Engagement Metrics Dashboard", "Reward System Builder", "Feedback Loop Design"],
        "examples": ["Harley Davidson HOG", "Nike Run Club", "OnePlus community"]
     }',
     90, 100),

    (2, 13, 13, 'Experiential Marketing & Events', 
     'Create memorable brand experiences through events, activations, and immersive marketing.',
     '[
        "Plan experiential marketing strategy",
        "Design brand activation concepts",
        "Create event experience blueprint",
        "Develop virtual/hybrid event formats",
        "Calculate experience ROI",
        "Document and amplify experiences"
     ]',
     '{
        "concepts": ["Experience Design Principles", "Activation Ideas Library", "Pop-up Store Guide", "Roadshow Planning"],
        "virtual": ["Virtual Event Platform Guide", "Hybrid Experience Design", "Live Streaming Strategy", "Metaverse Activations"],
        "tools": ["Event ROI Calculator", "Experience Mapping Canvas", "Amplification Playbook", "Measurement Framework"],
        "examples": ["Red Bull experiences", "Spotify wrapped", "Netflix immersive events"]
     }',
     90, 100),

    (2, 14, 14, 'Customer Journey Optimization', 
     'Map and optimize entire customer journey with touchpoint excellence and emotional design.',
     '[
        "Map complete customer journey",
        "Identify moments of truth",
        "Design emotional peaks",
        "Eliminate friction points",
        "Create journey personalization",
        "Measure journey effectiveness"
     ]',
     '{
        "frameworks": ["Journey Mapping Canvas", "Moments of Truth Analysis", "Emotional Curve Design", "Friction Audit Tool"],
        "optimization": ["Touchpoint Optimization Guide", "Personalization Strategy", "Cross-channel Consistency", "Journey Analytics"],
        "tools": ["Journey Builder Software", "Customer Data Platform", "Attribution Modeling", "Experience Metrics"],
        "examples": ["Disney journey magic", "Apple store experience", "Amazon convenience"]
     }',
     90, 100),

    -- Module 3: Digital Brand Ecosystem (Days 15-21)
    (3, 15, 15, 'Content Strategy & Brand Publishing', 
     'Build content strategy that positions brand as publisher with editorial calendar and content operations.',
     '[
        "Define content mission and pillars",
        "Create editorial calendar system",
        "Build content production workflow",
        "Develop distribution strategy",
        "Set up content governance",
        "Measure content performance"
     ]',
     '{
        "strategy": ["Content Pillar Framework", "Editorial Calendar Template", "Content Audit Tool", "Competitive Analysis"],
        "operations": ["Production Workflow", "Approval Process", "Content Briefs Template", "Style Guide"],
        "distribution": ["Channel Strategy", "Syndication Plan", "Repurposing Matrix", "Amplification Tactics"],
        "metrics": ["Content Scorecard", "ROI Calculator", "Attribution Model", "Engagement Metrics"]
     }',
     90, 100),

    (3, 16, 16, 'Social Media Brand Building', 
     'Master social media branding across platforms with platform-specific strategies and community management.',
     '[
        "Develop platform-specific strategies",
        "Create social media style guide",
        "Build content creation system",
        "Launch community management",
        "Implement social listening",
        "Track social media ROI"
     ]',
     '{
        "platforms": ["LinkedIn B2B Strategy", "Instagram Visual Guide", "Twitter Conversation Tactics", "YouTube Channel Strategy"],
        "content": ["Content Types Matrix", "Visual Templates Library", "Video Strategy Guide", "Stories Framework"],
        "tools": ["Scheduling Platforms", "Design Tools Setup", "Analytics Configuration", "Listening Tools"],
        "examples": ["Zomato social media", "Netflix India Twitter", "Durex India campaigns"]
     }',
     90, 100),

    (3, 17, 17, 'Influencer Marketing & Partnerships', 
     'Build influencer strategy with identification, collaboration, and measurement frameworks.',
     '[
        "Map influencer landscape",
        "Develop collaboration framework",
        "Create partnership contracts",
        "Design campaign briefs",
        "Manage influencer relationships",
        "Measure campaign impact"
     ]',
     '{
        "strategy": ["Influencer Tiers Guide", "Selection Criteria", "Collaboration Models", "Budget Allocation"],
        "management": ["Contract Templates", "Brief Templates", "Content Guidelines", "Approval Process"],
        "campaigns": ["Campaign Ideation", "Content Calendar", "Hashtag Strategy", "Amplification Plan"],
        "measurement": ["ROI Framework", "Fake Follower Detection", "Engagement Analysis", "Sales Attribution"]
     }',
     90, 100),

    (3, 18, 18, 'SEO & Brand Visibility', 
     'Optimize brand for search engines with technical SEO, content optimization, and link building.',
     '[
        "Conduct brand SEO audit",
        "Develop keyword strategy",
        "Optimize website structure",
        "Create link building plan",
        "Implement schema markup",
        "Monitor search performance"
     ]',
     '{
        "technical": ["Technical SEO Checklist", "Site Speed Optimization", "Mobile Optimization", "Core Web Vitals"],
        "content": ["Keyword Research Tools", "Content Optimization Guide", "Featured Snippet Strategy", "Voice Search Optimization"],
        "authority": ["Link Building Playbook", "Digital PR for SEO", "Brand Mention Strategy", "Citation Building"],
        "tools": ["Google Search Console Setup", "SEO Audit Tools", "Rank Tracking", "Competitor Analysis"]
     }',
     90, 100),

    (3, 19, 19, 'Email Marketing & Automation', 
     'Build email marketing system with segmentation, automation, and lifecycle campaigns.',
     '[
        "Design email marketing strategy",
        "Set up segmentation system",
        "Create automation workflows",
        "Develop email templates",
        "Implement personalization",
        "Optimize for conversions"
     ]',
     '{
        "strategy": ["Lifecycle Email Map", "Segmentation Strategy", "Frequency Guidelines", "List Building Tactics"],
        "automation": ["Welcome Series", "Abandoned Cart Recovery", "Re-engagement Campaigns", "Birthday Programs"],
        "design": ["Email Template Library", "Subject Line Formulas", "CTA Optimization", "Mobile Design Guide"],
        "metrics": ["Email Analytics Dashboard", "A/B Testing Framework", "Revenue Attribution", "List Health Metrics"]
     }',
     90, 100),

    (3, 20, 20, 'Performance Marketing & Paid Media', 
     'Master paid advertising across channels with campaign optimization and ROI maximization.',
     '[
        "Develop paid media strategy",
        "Set up campaign structure",
        "Create ad creative system",
        "Implement tracking and attribution",
        "Optimize for performance",
        "Scale successful campaigns"
     ]',
     '{
        "channels": ["Google Ads Playbook", "Facebook/Instagram Ads", "LinkedIn B2B Advertising", "Programmatic Guide"],
        "creative": ["Ad Copy Formulas", "Visual Ad Templates", "Video Ad Framework", "Landing Page Optimization"],
        "optimization": ["Bid Strategy Guide", "Audience Targeting", "Creative Testing", "Budget Allocation"],
        "measurement": ["Attribution Models", "LTV:CAC Analysis", "ROAS Optimization", "Incrementality Testing"]
     }',
     90, 100),

    (3, 21, 21, 'Marketing Technology Stack', 
     'Build and optimize marketing technology stack for brand management and growth.',
     '[
        "Audit current tech stack",
        "Identify technology needs",
        "Evaluate and select tools",
        "Implement integrations",
        "Train team on tools",
        "Optimize tool usage"
     ]',
     '{
        "categories": ["CRM Selection Guide", "Marketing Automation Platforms", "Analytics Tools", "Content Management"],
        "integration": ["API Documentation", "Data Flow Mapping", "Integration Checklist", "Testing Protocols"],
        "optimization": ["Tool Consolidation", "Cost Optimization", "Usage Analytics", "ROI Measurement"],
        "training": ["Onboarding Materials", "Best Practices Guides", "Certification Programs", "Support Resources"]
     }',
     90, 100),

    -- Module 4: Media Relations Mastery (Days 22-28)
    (4, 22, 22, 'Understanding Media Landscape', 
     'Deep dive into Indian and international media ecosystem with 500+ real journalist contacts and beat mapping.',
     '[
        "Build comprehensive journalist database",
        "Map beat structures and territories",
        "Identify target publications and journalists",
        "Study editorial calendars and cycles",
        "Create prioritized media list",
        "Set up media monitoring system"
     ]',
     '{
        "contacts": {
            "national_english": [
                {"publication": "Economic Times", "journalists": ["Biswarup Gooptu", "Jochelle Mendonca"], "beats": ["Startups", "Technology"]},
                {"publication": "Mint", "journalists": ["Reghu Balakrishnan", "Prasid Banerjee"], "beats": ["Business", "Consumer Tech"]},
                {"publication": "Business Standard", "journalists": ["Shivani Shinde", "Surajeet Das Gupta"], "beats": ["Technology", "Corporate"]}
            ],
            "digital_first": [
                {"publication": "YourStory", "founder": "Shradha Sharma", "email": "shradha@yourstory.com"},
                {"publication": "Inc42", "founder": "Vaibhav Vardhan", "email": "vaibhav@inc42.com"}
            ],
            "international": [
                {"publication": "TechCrunch", "journalist": "Manish Singh", "email": "manish.singh@techcrunch.com"},
                {"publication": "Bloomberg", "journalists": ["Saritha Rai", "Anto Antony"], "focus": "India Tech & Startups"}
            ]
        },
        "tools": ["Media Database Template", "Beat Mapping Guide", "Editorial Calendar Tracker", "Journalist CRM Setup"]
     }',
     120, 200),

    (4, 23, 23, 'Building Media Relationships', 
     'Master journalist engagement strategies for long-term relationship building and source development.',
     '[
        "Craft personalized outreach strategies",
        "Master embargo and exclusive management",
        "Schedule strategic coffee meetings",
        "Build source credibility and trust",
        "Create continuous value for journalists",
        "Track and nurture relationships"
     ]',
     '{
        "strategies": ["Reporter vs Editor Approach", "Exclusive vs Broad Pitch", "Off-record Guidelines", "Background Briefings"],
        "templates": ["Introduction Email Templates", "Follow-up Sequences", "Thank You Notes", "Holiday Greetings"],
        "etiquette": ["WhatsApp Best Practices", "LinkedIn Engagement Guide", "Event Invitation Protocol", "Gift Policy"],
        "tools": ["Relationship Tracking System", "Interaction History Log", "Preference Database", "Engagement Calendar"]
     }',
     90, 100),

    (4, 24, 24, 'Story Development & Newsworthiness', 
     'Create newsworthy stories using proven frameworks and develop multiple angles for maximum coverage.',
     '[
        "Identify newsworthy angles in your business",
        "Develop primary and backup story angles",
        "Create compelling story narratives",
        "Prepare supporting data and evidence",
        "Package stories for different media types",
        "Time stories for maximum impact"
     ]',
     '{
        "frameworks": ["David vs Goliath", "First/Only/Biggest", "Problem Solver", "Trend Story", "Human Interest", "Contrarian View"],
        "development": ["Story Arc Builder", "Angle Generator Tool", "News Hook Calendar", "Trend Alignment Guide"],
        "packaging": ["Print Story Format", "Broadcast Package", "Digital Native Format", "Podcast Pitch"],
        "timing": ["News Cycle Guide", "Seasonal Hooks", "Industry Events Calendar", "Breaking News Response"]
     }',
     90, 100),

    (4, 25, 25, 'Press Release & Media Kit Mastery', 
     'Write compelling press releases and create comprehensive media kits that get attention.',
     '[
        "Master press release structure and writing",
        "Create attention-grabbing headlines",
        "Develop quotable quotes",
        "Build comprehensive media kit",
        "Prepare supporting materials",
        "Optimize for distribution"
     ]',
     '{
        "templates": ["15 Press Release Formats", "Headline Formulas", "Quote Templates", "Boilerplate Examples"],
        "media_kit": ["Company Backgrounder", "Founder Bios (multiple lengths)", "Fact Sheets", "Product Descriptions"],
        "visuals": ["Photo Requirements", "Infographic Templates", "Video B-roll Guide", "Logo Variations"],
        "distribution": ["PR Newswire Guide", "Direct Distribution", "Embargo Management", "Follow-up Strategy"]
     }',
     90, 100),

    (4, 26, 26, 'Media Pitch Perfect System', 
     'Execute the 7-step pitch process for maximum media coverage with templates and tactics.',
     '[
        "Research target journalists thoroughly",
        "Develop multiple compelling angles",
        "Craft perfect pitch emails",
        "Execute strategic outreach",
        "Implement smart follow-up",
        "Amplify secured coverage"
     ]',
     '{
        "research": ["Journalist Research Checklist", "Recent Articles Analysis", "Publication Focus Guide", "Competitor Coverage Audit"],
        "pitching": ["25 Pitch Email Templates", "Subject Line A/B Tests", "Pitch Deck Format", "One-liner Hooks"],
        "follow_up": ["48-hour Rule", "Different Angle Approach", "Value Addition Ideas", "Persistence vs Pestering"],
        "amplification": ["Coverage Showcase Guide", "Social Sharing Strategy", "Website Features", "Sales Enablement"]
     }',
     120, 150),

    (4, 27, 27, 'Broadcast Media & TV Appearances', 
     'Master TV, radio, and podcast appearances with media training and interview excellence.',
     '[
        "Prepare for broadcast appearances",
        "Develop key messages and sound bites",
        "Master interview techniques",
        "Handle difficult questions",
        "Optimize visual presentation",
        "Leverage appearances for maximum impact"
     ]',
     '{
        "preparation": ["Pre-interview Checklist", "Key Message Development", "Sound Bite Creation", "Story Preparation"],
        "techniques": ["Bridging Techniques", "Flagging Method", "Pivoting Strategies", "Body Language Guide"],
        "formats": ["TV Studio Guide", "Virtual Interview Setup", "Radio Best Practices", "Podcast Excellence"],
        "leverage": ["Clip Creation", "Social Media Cuts", "Website Integration", "PR Amplification"]
     }',
     90, 100),

    (4, 28, 28, 'Digital Media & New Platforms', 
     'Navigate digital-first publications, podcasts, YouTube channels, and emerging media platforms.',
     '[
        "Map digital media landscape",
        "Develop digital-first pitch strategies",
        "Create multimedia content packages",
        "Build relationships with digital journalists",
        "Optimize for online coverage",
        "Track digital media metrics"
     ]',
     '{
        "platforms": ["Online Publication Guide", "Podcast Directory", "YouTube Channel List", "Newsletter Targets"],
        "content": ["Digital Press Kit", "Multimedia Assets", "Interactive Content", "Data Visualizations"],
        "optimization": ["SEO for PR", "Social Media Integration", "Link Building Value", "Online Reputation"],
        "metrics": ["Online Reach Analysis", "Engagement Metrics", "Backlink Value", "Traffic Attribution"]
     }',
     90, 100),

    -- Module 5: How to Get Written About (Days 29-35)
    (5, 29, 29, 'The Media Mindset', 
     'Think like a journalist and position yourself as the go-to expert source in your domain.',
     '[
        "Study news values and criteria",
        "Map editorial calendars and beats",
        "Build domain expertise profile",
        "Develop unique opinions and positions",
        "Create data and research repository",
        "Practice quote readiness exercises"
     ]',
     '{
        "journalist_thinking": ["News Values Framework", "Editorial Decision Criteria", "Story Selection Process", "Deadline Reality"],
        "expertise": ["Domain Authority Building", "Thought Leadership Topics", "Contrarian Positions Guide", "Prediction Framework"],
        "preparation": ["Quote Bank Builder", "Data Repository Setup", "Fact Sheet Library", "Response Time Training"],
        "positioning": ["Expert Bio Variations", "Credential Highlights", "Media Experience Showcase", "Speaking Topics"]
     }',
     90, 100),

    (5, 30, 30, 'HERO Framework - Hook Creation', 
     'Master the H in HERO - creating irresistible hooks that capture journalist attention.',
     '[
        "Identify attention-grabbing angles",
        "Master timeliness and relevance",
        "Create controversy without damage",
        "Design surprise elements",
        "Develop emotional triggers",
        "Optimize visual appeal and shareability"
     ]',
     '{
        "hook_types": ["Timeliness Hooks", "Relevance Mapping", "Controversy Guide", "Surprise Elements", "Emotional Triggers"],
        "creation": ["Hook Generator Tool", "Headline Testing", "Angle Development Workshop", "Visual Hook Design"],
        "testing": ["Journalist Feedback", "A/B Testing Hooks", "Social Validation", "Click-through Analysis"],
        "examples": ["Successful Hooks Library", "Failed Hooks Analysis", "Industry Best Practices", "Viral Case Studies"]
     }',
     120, 150),

    (5, 31, 31, 'HERO Framework - Evidence Building', 
     'Master the E in HERO - building compelling evidence that supports your story.',
     '[
        "Compile comprehensive data sets",
        "Develop compelling case studies",
        "Gather customer testimonials",
        "Secure third-party validation",
        "Document achievements and milestones",
        "Create visual evidence packages"
     ]',
     '{
        "data": ["Data Collection Framework", "Survey Methodology", "Research Presentation", "Infographic Creation"],
        "validation": ["Customer Story Templates", "Testimonial Collection", "Expert Endorsements", "Award Applications"],
        "documentation": ["Achievement Tracker", "Milestone Calendar", "Media Mention Archive", "Success Metrics"],
        "packaging": ["Evidence Kit Builder", "Proof Points Library", "Visual Evidence Guide", "Citation Standards"]
     }',
     90, 100),

    (5, 32, 32, 'HERO Framework - Relationship Nurturing', 
     'Master the R in HERO - building and nurturing media relationships for long-term coverage.',
     '[
        "Build targeted journalist database",
        "Implement regular engagement strategy",
        "Provide continuous value to media",
        "Develop exclusive relationship tiers",
        "Create quick response systems",
        "Build referral networks"
     ]',
     '{
        "database": ["500+ Journalist Contacts", "Beat Mapping System", "Preference Tracking", "Interaction History"],
        "engagement": ["Touch Point Calendar", "Value Creation Ideas", "Exclusive Offers Strategy", "Event Invitations"],
        "systems": ["24-hour Response Protocol", "Expert Comment Service", "Data Sharing Program", "Source Development"],
        "network": ["Journalist Introductions", "PR Community Building", "Media Event Participation", "Industry Connections"]
     }',
     90, 100),

    (5, 33, 33, 'HERO Framework - Opportunity Maximization', 
     'Master the O in HERO - identifying and maximizing media opportunities.',
     '[
        "Master news jacking techniques",
        "Identify seasonal hook opportunities",
        "Leverage industry events and reports",
        "Time announcements strategically",
        "Create media moments",
        "Build always-on PR engine"
     ]',
     '{
        "news_jacking": ["Real-time Monitoring", "Rapid Response Playbook", "Trend Alignment Guide", "Commentary Templates"],
        "calendar": ["Annual PR Calendar", "Seasonal Hooks Map", "Industry Events Schedule", "News Cycle Patterns"],
        "creation": ["Media Moment Design", "Event Planning Guide", "Report Launch Strategy", "Survey Release Tactics"],
        "engine": ["Always-on PR System", "Content Pipeline", "Spokesperson Rotation", "Story Bank Management"]
     }',
     120, 150),

    (5, 34, 34, 'Digital PR & HARO Mastery', 
     'Master Help a Reporter Out (HARO) and digital PR platforms for consistent coverage.',
     '[
        "Optimize HARO profile and alerts",
        "Master quick response techniques",
        "Build Google News presence",
        "Create Wikipedia and knowledge panels",
        "Develop podcast pitch strategy",
        "Maximize online PR platforms"
     ]',
     '{
        "haro": ["HARO Setup Guide", "Response Templates", "Speed Techniques", "Success Tracking", "Reporter Relationships"],
        "platforms": ["Google News Optimization", "Wikipedia Guidelines", "Knowledge Panel Creation", "Featured Snippets"],
        "podcasts": ["Podcast Directory", "Pitch Templates", "Guest Preparation", "Episode Leverage", "Host Relationships"],
        "digital": ["Online PR Platforms List", "Digital Press Release", "SEO PR Integration", "Backlink Strategy"]
     }',
     90, 100),

    (5, 35, 35, 'Measurement & Coverage Amplification', 
     'Track media coverage impact and amplify earned media for maximum value.',
     '[
        "Set up coverage tracking systems",
        "Calculate media value and reach",
        "Analyze sentiment and message penetration",
        "Implement amplification strategy",
        "Convert coverage to business results",
        "Build coverage portfolio"
     ]',
     '{
        "tracking": ["Media Monitoring Setup", "Google Alerts Configuration", "Mention Tracking Tools", "Coverage Database"],
        "metrics": ["AVE Calculation", "Reach Analysis", "Share of Voice", "Message Penetration", "Sentiment Scoring"],
        "amplification": ["Social Sharing Strategy", "Website Integration", "Email Campaigns", "Sales Enablement", "Investor Updates"],
        "conversion": ["Lead Attribution", "Sales Impact Analysis", "Brand Lift Studies", "Website Traffic", "ROI Calculation"]
     }',
     90, 100),

    -- Module 6: Award Winning & Recognition (Days 36-42)
    (6, 36, 36, 'Award Landscape Mapping', 
     'Identify and prioritize awards that matter for your brand and industry positioning.',
     '[
        "Map comprehensive award landscape",
        "Analyze award categories and criteria",
        "Evaluate award prestige and ROI",
        "Create award calendar and timeline",
        "Budget for award applications",
        "Build award strategy document"
     ]',
     '{
        "directories": ["Indian Award Programs", "International Awards", "Industry Specific Awards", "Startup Competitions"],
        "evaluation": ["Prestige Assessment Tool", "ROI Calculator", "Jury Analysis", "Past Winner Research"],
        "planning": ["Annual Award Calendar", "Application Timeline", "Budget Template", "Team Assignment Matrix"],
        "major_awards": ["ET Awards", "CNBC Awards", "Business Today Awards", "Industry Associations"]
     }',
     90, 100),

    (6, 37, 37, 'Award Application Excellence', 
     'Master the art of writing winning award applications with compelling narratives and evidence.',
     '[
        "Analyze winning applications",
        "Craft compelling executive summary",
        "Present metrics and achievements",
        "Design visual presentations",
        "Gather supporting documents",
        "Perfect submission process"
     ]',
     '{
        "writing": ["Application Structure Guide", "Executive Summary Template", "Achievement Presentation", "Storytelling Framework"],
        "evidence": ["Metrics Presentation", "Case Study Format", "Testimonial Integration", "Visual Design Guide"],
        "support": ["Reference Letter Templates", "Video Submission Guide", "Portfolio Creation", "Jury Presentation"],
        "optimization": ["Word Limit Strategies", "Differentiation Tactics", "Common Mistakes", "Review Checklist"]
     }',
     90, 100),

    (6, 38, 38, 'Thought Leadership Positioning', 
     'Establish yourself as industry thought leader through content, speaking, and expertise sharing.',
     '[
        "Define thought leadership topics",
        "Create content strategy and calendar",
        "Develop signature perspectives",
        "Build speaking portfolio",
        "Establish media expert status",
        "Measure thought leadership impact"
     ]',
     '{
        "strategy": ["Topic Selection Framework", "Expertise Mapping", "Content Pillar Design", "Distribution Plan"],
        "content": ["Article Templates", "Research Report Guide", "White Paper Structure", "Opinion Piece Formula"],
        "speaking": ["Speaker Bio Builder", "Topic Abstracts", "Presentation Templates", "Demo Videos"],
        "measurement": ["Influence Metrics", "Citation Tracking", "Speaking Invitations", "Media Mentions"]
     }',
     90, 100),

    (6, 39, 39, 'Speaking Opportunities & Conferences', 
     'Secure and excel at speaking opportunities to build brand authority and visibility.',
     '[
        "Identify target conferences and events",
        "Craft winning speaker proposals",
        "Develop signature presentations",
        "Master stage presence and delivery",
        "Network effectively at events",
        "Leverage speaking for PR"
     ]',
     '{
        "targeting": ["Conference Directory", "Event Research Guide", "Speaker Requirements", "Application Timeline"],
        "proposals": ["Abstract Writing Guide", "Bio Optimization", "Topic Development", "Video Submission"],
        "delivery": ["Presentation Design", "Stage Presence Tips", "Q&A Handling", "Technical Setup"],
        "leverage": ["PR Announcement", "Social Media Strategy", "Content Creation", "Lead Generation"]
     }',
     90, 100),

    (6, 40, 40, 'Industry Recognition Strategies', 
     'Build systematic approach to gaining industry recognition through multiple channels.',
     '[
        "Join industry associations strategically",
        "Pursue board and committee positions",
        "Contribute to industry standards",
        "Participate in industry research",
        "Build peer recognition",
        "Document recognition journey"
     ]',
     '{
        "associations": ["Association Directory", "Membership Benefits Analysis", "Leadership Opportunities", "Committee Positions"],
        "contribution": ["Standards Participation", "Research Collaboration", "Industry Reports", "Best Practices Sharing"],
        "recognition": ["Peer Nomination Strategy", "Jury Positions", "Mentorship Programs", "Industry Rankings"],
        "documentation": ["Recognition Portfolio", "Achievement Timeline", "Media Coverage Archive", "Testimonial Collection"]
     }',
     90, 100),

    (6, 41, 41, 'Award Campaign Management', 
     'Manage end-to-end award campaigns from application to leverage.',
     '[
        "Plan pre-award phase strategy",
        "Manage application process",
        "Prepare for jury presentations",
        "Execute award ceremony participation",
        "Implement post-award leverage",
        "Measure award impact"
     ]',
     '{
        "pre_award": ["Team Preparation", "Material Development", "Jury Research", "Presentation Practice"],
        "ceremony": ["Attendance Planning", "Media Coordination", "Speech Preparation", "Network Strategy"],
        "post_award": ["Winner Announcement PR", "Logo Usage Rights", "Marketing Integration", "Sales Enablement"],
        "measurement": ["PR Value Calculation", "Brand Lift Analysis", "Lead Generation", "Partnership Opportunities"]
     }',
     90, 100),

    (6, 42, 42, 'Building Award-Winning Culture', 
     'Create organizational culture that consistently wins awards and recognition.',
     '[
        "Align team on award importance",
        "Build excellence documentation habit",
        "Create innovation pipeline",
        "Develop customer success stories",
        "Foster employee excellence",
        "Celebrate and share wins"
     ]',
     '{
        "culture": ["Award Awareness Program", "Excellence Standards", "Documentation Systems", "Regular Reviews"],
        "innovation": ["Innovation Framework", "Idea Management", "Pilot Programs", "Success Metrics"],
        "stories": ["Customer Story Collection", "Employee Recognition", "Partner Testimonials", "Impact Measurement"],
        "celebration": ["Internal Communication", "External Sharing", "Award Display Strategy", "Team Rewards"]
     }',
     90, 100),

    -- Module 7: Crisis & Reputation Management (Days 43-49)
    (7, 43, 43, 'Crisis Preparedness Planning', 
     'Build comprehensive crisis management system before you need it.',
     '[
        "Identify potential crisis scenarios",
        "Build crisis response team",
        "Create communication protocols",
        "Develop response templates",
        "Establish monitoring systems",
        "Conduct crisis simulations"
     ]',
     '{
        "scenarios": ["Risk Assessment Matrix", "Crisis Type Categories", "Probability Analysis", "Impact Evaluation"],
        "team": ["Crisis Team Structure", "Role Definitions", "Contact Trees", "Decision Authority"],
        "protocols": ["Response Flowchart", "Approval Process", "Legal Review", "Stakeholder Map"],
        "preparation": ["Template Library", "Holding Statements", "FAQ Documents", "Simulation Exercises"]
     }',
     90, 100),

    (7, 44, 44, 'Crisis Communication Excellence', 
     'Master crisis communication with stakeholder management and message control.',
     '[
        "Assess crisis situation rapidly",
        "Craft crisis messaging strategy",
        "Execute stakeholder communication",
        "Manage media during crisis",
        "Control narrative and messaging",
        "Monitor and adjust response"
     ]',
     '{
        "assessment": ["Crisis Level Determination", "Stakeholder Impact Analysis", "Timeline Development", "Resource Allocation"],
        "messaging": ["Key Message Framework", "Apology Strategies", "Fact Establishment", "Emotion Management"],
        "execution": ["Communication Sequence", "Channel Selection", "Spokesperson Designation", "Update Frequency"],
        "monitoring": ["Real-time Tracking", "Sentiment Analysis", "Message Penetration", "Course Correction"]
     }',
     120, 150),

    (7, 45, 45, 'Online Reputation Management', 
     'Protect and enhance online reputation with proactive strategies and reactive protocols.',
     '[
        "Audit current online reputation",
        "Build positive content assets",
        "Optimize search results",
        "Manage review platforms",
        "Handle negative content",
        "Build reputation resilience"
     ]',
     '{
        "audit": ["Reputation Audit Checklist", "Search Result Analysis", "Review Platform Scan", "Social Media Assessment"],
        "building": ["Content Creation Plan", "SEO Strategy", "Positive PR Campaign", "Testimonial Program"],
        "management": ["Review Response Templates", "Negative Content Strategy", "Legal Options", "Platform Policies"],
        "tools": ["Monitoring Setup", "Alert Configuration", "Response Protocols", "Escalation Process"]
     }',
     90, 100),

    (7, 46, 46, 'Social Media Crisis Management', 
     'Handle social media crises with speed, empathy, and strategic response.',
     '[
        "Detect social media crises early",
        "Assess viral potential and impact",
        "Craft social media crisis response",
        "Engage with community effectively",
        "Manage influencer relations",
        "Recover and rebuild trust"
     ]',
     '{
        "detection": ["Social Listening Tools", "Trigger Alert Setup", "Escalation Criteria", "Response Time SLA"],
        "assessment": ["Virality Indicators", "Sentiment Tracking", "Influencer Involvement", "Platform Dynamics"],
        "response": ["Platform-specific Strategies", "Response Templates", "Visual Response Assets", "Community Management"],
        "recovery": ["Trust Rebuilding Plan", "Community Engagement", "Positive Campaign", "Lesson Integration"]
     }',
     90, 100),

    (7, 47, 47, 'Legal & Regulatory Communications', 
     'Navigate legal and regulatory communications with compliance and clarity.',
     '[
        "Understand legal communication limits",
        "Coordinate with legal counsel",
        "Manage regulatory announcements",
        "Handle litigation communications",
        "Address compliance issues",
        "Maintain transparency balance"
     ]',
     '{
        "legal": ["Legal Review Process", "Disclosure Requirements", "Confidentiality Rules", "Defamation Avoidance"],
        "regulatory": ["Regulatory Framework", "Announcement Requirements", "Timing Considerations", "Stakeholder Notices"],
        "litigation": ["Litigation PR Strategy", "Court of Public Opinion", "Statement Guidelines", "Media Management"],
        "compliance": ["Compliance Communication", "Violation Response", "Corrective Actions", "Prevention Messaging"]
     }',
     90, 100),

    (7, 48, 48, 'Employee & Internal Crisis Management', 
     'Manage internal crises and employee communications with transparency and trust.',
     '[
        "Handle employee-related crises",
        "Manage internal communications",
        "Address culture and morale issues",
        "Coordinate leadership messaging",
        "Maintain productivity during crisis",
        "Rebuild internal trust"
     ]',
     '{
        "scenarios": ["Layoff Communications", "Scandal Management", "Leadership Changes", "Culture Crisis"],
        "internal": ["All-hands Messaging", "Manager Talking Points", "FAQ Development", "Rumor Management"],
        "leadership": ["CEO Communications", "Leadership Visibility", "Townhall Management", "Q&A Preparation"],
        "recovery": ["Morale Rebuilding", "Culture Reinforcement", "Trust Restoration", "Engagement Programs"]
     }',
     90, 100),

    (7, 49, 49, 'Post-Crisis Recovery & Learning', 
     'Recover from crisis stronger with systematic rebuilding and organizational learning.',
     '[
        "Conduct crisis post-mortem",
        "Document lessons learned",
        "Update crisis protocols",
        "Rebuild stakeholder trust",
        "Implement prevention measures",
        "Share crisis learnings"
     ]',
     '{
        "analysis": ["Post-mortem Framework", "Timeline Reconstruction", "Decision Analysis", "Impact Assessment"],
        "learning": ["Lessons Documentation", "Process Improvements", "Training Updates", "Simulation Scenarios"],
        "rebuilding": ["Trust Recovery Plan", "Reputation Rehabilitation", "Stakeholder Re-engagement", "Brand Reinforcement"],
        "prevention": ["Risk Mitigation Updates", "Early Warning Systems", "Cultural Changes", "Process Improvements"]
     }',
     90, 100),

    -- Module 8: Agency & Vendor Management (Days 50-56)
    (8, 50, 50, 'Agency Selection Process', 
     'Select the right PR agency or vendors with systematic evaluation process.',
     '[
        "Define agency requirements clearly",
        "Research and shortlist agencies",
        "Design RFP and evaluation criteria",
        "Conduct agency pitches",
        "Check references thoroughly",
        "Negotiate contracts effectively"
     ]',
     '{
        "requirements": ["Scope Definition", "Budget Parameters", "Service Expectations", "Cultural Fit Criteria"],
        "evaluation": ["RFP Template", "Scoring Matrix", "Pitch Guidelines", "Question Bank"],
        "selection": ["Reference Check Guide", "Contract Negotiation", "SLA Definition", "KPI Agreement"],
        "types": ["Full-service Agencies", "Digital Specialists", "Crisis Firms", "Regional Agencies"]
     }',
     90, 100),

    (8, 51, 51, 'Agency Briefing & Onboarding', 
     'Set up agency relationships for success with comprehensive briefing and onboarding.',
     '[
        "Create comprehensive agency brief",
        "Conduct onboarding sessions",
        "Establish working protocols",
        "Set up reporting systems",
        "Define success metrics",
        "Plan first 90 days"
     ]',
     '{
        "briefing": ["Master Brief Template", "Brand Immersion Program", "Goal Alignment Session", "Stakeholder Introduction"],
        "protocols": ["Communication Guidelines", "Approval Process", "Meeting Cadence", "Escalation Path"],
        "systems": ["Reporting Templates", "Dashboard Setup", "Tool Access", "Document Sharing"],
        "planning": ["90-day Plan", "Quick Wins Strategy", "Milestone Calendar", "Review Schedule"]
     }',
     90, 100),

    (8, 52, 52, 'Agency Performance Management', 
     'Manage agency performance with clear expectations and continuous optimization.',
     '[
        "Set clear KPIs and targets",
        "Implement tracking systems",
        "Conduct regular reviews",
        "Provide constructive feedback",
        "Optimize agency utilization",
        "Manage scope and budgets"
     ]',
     '{
        "kpis": ["KPI Framework", "Target Setting", "Measurement Methods", "Attribution Models"],
        "tracking": ["Performance Dashboard", "Activity Reports", "Outcome Metrics", "ROI Calculation"],
        "reviews": ["Monthly Review Template", "Quarterly Business Review", "Annual Planning", "Feedback Forms"],
        "optimization": ["Resource Allocation", "Scope Management", "Budget Tracking", "Efficiency Improvements"]
     }',
     90, 100),

    (8, 53, 53, 'Multi-Agency Coordination', 
     'Coordinate multiple agencies and vendors for integrated communications.',
     '[
        "Design multi-agency structure",
        "Define roles and responsibilities",
        "Create collaboration protocols",
        "Manage information flow",
        "Resolve conflicts effectively",
        "Optimize agency mix"
     ]',
     '{
        "structure": ["Lead Agency Model", "Specialist Model", "Integrated Team", "Project-based Structure"],
        "coordination": ["RACI Matrix", "Collaboration Tools", "Joint Planning Sessions", "Information Sharing"],
        "management": ["Conflict Resolution", "Territory Definition", "Credit Sharing", "Unified Reporting"],
        "optimization": ["Agency Mix Analysis", "Capability Mapping", "Cost Efficiency", "Performance Comparison"]
     }',
     90, 100),

    (8, 54, 54, 'In-house vs Agency Balance', 
     'Optimize mix of in-house capabilities and agency support for maximum effectiveness.',
     '[
        "Assess in-house capabilities",
        "Identify agency value areas",
        "Design hybrid model",
        "Build in-house competencies",
        "Manage transitions effectively",
        "Optimize cost structure"
     ]',
     '{
        "assessment": ["Capability Audit", "Skill Gap Analysis", "Cost Comparison", "Efficiency Metrics"],
        "models": ["Full Outsource", "Hybrid Model", "In-house with Support", "Project-based"],
        "building": ["Hiring Plan", "Training Programs", "Tool Investment", "Process Development"],
        "optimization": ["Cost-Benefit Analysis", "Flexibility Assessment", "Risk Evaluation", "Performance Metrics"]
     }',
     90, 100),

    (8, 55, 55, 'Vendor Ecosystem Management', 
     'Build and manage ecosystem of specialized vendors for comprehensive brand support.',
     '[
        "Map vendor ecosystem needs",
        "Build vendor database",
        "Establish vendor standards",
        "Manage vendor relationships",
        "Ensure quality consistency",
        "Optimize vendor spend"
     ]',
     '{
        "ecosystem": ["Design Agencies", "Content Creators", "Event Managers", "Research Firms", "Tech Platforms"],
        "management": ["Vendor Database", "Qualification Criteria", "Performance Standards", "Payment Terms"],
        "quality": ["Quality Guidelines", "Review Process", "Feedback Systems", "Improvement Plans"],
        "optimization": ["Spend Analysis", "Consolidation Opportunities", "Negotiation Strategies", "Alternative Options"]
     }',
     90, 100),

    (8, 56, 56, 'Contract & Legal Management', 
     'Manage agency contracts, legal agreements, and intellectual property rights.',
     '[
        "Negotiate favorable contracts",
        "Define intellectual property rights",
        "Manage confidentiality agreements",
        "Handle contract modifications",
        "Plan contract renewals",
        "Manage termination processes"
     ]',
     '{
        "contracts": ["Master Service Agreement", "Statement of Work", "Retainer Agreement", "Project Contracts"],
        "terms": ["Payment Terms", "Termination Clauses", "Performance Guarantees", "Liability Limits"],
        "ip_rights": ["Work for Hire", "Usage Rights", "Ownership Transfer", "License Terms"],
        "management": ["Contract Database", "Renewal Calendar", "Amendment Process", "Dispute Resolution"]
     }',
     90, 100),

    -- Module 9: Founder Brand & Executive Presence (Days 57-63)
    (9, 57, 57, 'Founder Personal Brand Strategy', 
     'Build powerful personal brand that enhances company value and attracts opportunities.',
     '[
        "Define personal brand positioning",
        "Align with company brand",
        "Identify unique value proposition",
        "Create visual identity system",
        "Select platforms strategically",
        "Launch personal brand"
     ]',
     '{
        "strategy": ["Personal Brand Canvas", "Positioning Statement", "Value Proposition", "Differentiation Strategy"],
        "alignment": ["Company-Founder Synergy", "Message Consistency", "Visual Harmony", "Story Integration"],
        "identity": ["Photography Guidelines", "Wardrobe Strategy", "Signature Style", "Virtual Presence"],
        "platforms": ["Platform Selection Matrix", "Content Strategy", "Engagement Plan", "Growth Targets"]
     }',
     90, 100),

    (9, 58, 58, 'LinkedIn Domination Strategy', 
     'Build thought leadership on LinkedIn with 10K+ followers and consistent engagement.',
     '[
        "Optimize LinkedIn profile completely",
        "Develop content strategy and calendar",
        "Build engagement and growth system",
        "Launch LinkedIn newsletter",
        "Create viral content formulas",
        "Track and optimize performance"
     ]',
     '{
        "optimization": ["Headline Formulas", "About Section Template", "Featured Section Strategy", "Skills & Endorsements"],
        "content": ["Post Type Matrix", "Viral Formulas", "Video Strategy", "Article Topics", "Newsletter Launch"],
        "growth": ["Connection Strategy", "Engagement Tactics", "Comment Strategy", "DM Templates"],
        "analytics": ["Performance Metrics", "Best Time Analysis", "Content Analysis", "Competitor Tracking"]
     }',
     120, 150),

    (9, 59, 59, 'Executive Communication Mastery', 
     'Master all forms of executive communication from boards to media to employees.',
     '[
        "Master board communication",
        "Perfect investor presentations",
        "Excel at media interviews",
        "Inspire employee communications",
        "Handle crisis communications",
        "Build global executive presence"
     ]',
     '{
        "board": ["Board Presentation Template", "Executive Summary Format", "Data Presentation", "Q&A Preparation"],
        "investors": ["Pitch Deck Excellence", "Earnings Calls", "Investor Updates", "Roadshow Skills"],
        "media": ["Interview Techniques", "Sound Bite Creation", "Difficult Questions", "Body Language"],
        "internal": ["All-hands Excellence", "Team Inspiration", "Culture Building", "Change Management"]
     }',
     90, 100),

    (9, 60, 60, 'Public Speaking Excellence', 
     'Become sought-after speaker with powerful stage presence and memorable presentations.',
     '[
        "Develop signature speaking topics",
        "Master stage presence and delivery",
        "Create memorable presentations",
        "Handle Q&A sessions expertly",
        "Build speaking portfolio",
        "Leverage speaking for brand"
     ]',
     '{
        "development": ["Topic Development", "Signature Stories", "Opening Hooks", "Closing Impact"],
        "delivery": ["Stage Presence", "Voice Modulation", "Body Language", "Audience Connection"],
        "presentations": ["Slide Design", "Visual Storytelling", "Demo Excellence", "Interactive Elements"],
        "leverage": ["Speaker Reel", "Speaking Page", "PR Amplification", "Lead Generation"]
     }',
     90, 100),

    (9, 61, 61, 'Media Personality Development', 
     'Become media-ready personality with consistent presence across all platforms.',
     '[
        "Create media personality profile",
        "Develop signature stories and quotes",
        "Build media asset library",
        "Master different media formats",
        "Establish regular media presence",
        "Measure media impact"
     ]',
     '{
        "personality": ["Media Bio Variations", "Key Messages", "Signature Quotes", "Story Bank"],
        "assets": ["Headshot Library", "B-roll Videos", "Infographics", "Data Points"],
        "formats": ["TV Appearance", "Radio Skills", "Podcast Excellence", "Print Interviews"],
        "presence": ["Media Calendar", "Regular Columns", "Expert Commentary", "Industry Panels"]
     }',
     90, 100),

    (9, 62, 62, 'Digital Influence Building', 
     'Build digital influence across platforms with content strategy and community building.',
     '[
        "Map digital influence landscape",
        "Create multi-platform strategy",
        "Develop content creation system",
        "Build engaged communities",
        "Collaborate with influencers",
        "Monetize influence ethically"
     ]',
     '{
        "platforms": ["Twitter Strategy", "Instagram Presence", "YouTube Channel", "Podcast Launch"],
        "content": ["Content Calendar", "Repurposing Strategy", "Viral Tactics", "Engagement Hooks"],
        "community": ["Community Building", "Engagement Strategy", "Super Fans", "Advocacy Programs"],
        "monetization": ["Speaking Fees", "Advisory Roles", "Book Deals", "Course Creation"]
     }',
     90, 100),

    (9, 63, 63, 'Legacy & Impact Building', 
     'Build lasting legacy and impact beyond business success.',
     '[
        "Define legacy vision and values",
        "Build impact initiatives",
        "Create knowledge sharing platforms",
        "Develop next-gen leaders",
        "Document journey and lessons",
        "Plan succession and continuity"
     ]',
     '{
        "legacy": ["Legacy Statement", "Vision Document", "Values Framework", "Impact Metrics"],
        "impact": ["CSR Initiatives", "Industry Contribution", "Mentorship Programs", "Knowledge Sharing"],
        "documentation": ["Book Writing", "Documentary", "Archive Building", "Story Preservation"],
        "succession": ["Leadership Development", "Knowledge Transfer", "Succession Planning", "Continuity Strategy"]
     }',
     90, 100),

    -- Module 10: Advanced PR Strategies (Days 64-70)
    (10, 64, 64, 'Financial Communications Mastery', 
     'Master investor relations and financial PR for funding rounds and public markets.',
     '[
        "Understand financial disclosure rules",
        "Build investor relations framework",
        "Master earnings communications",
        "Handle analyst relations",
        "Manage material announcements",
        "Prepare for public listing"
     ]',
     '{
        "regulations": ["Disclosure Requirements", "Material Information", "Quiet Periods", "Fair Disclosure"],
        "ir_framework": ["IR Policy", "Investor Deck", "FAQ Management", "Shareholder Letters"],
        "communications": ["Earnings Release", "Guidance Strategy", "Conference Calls", "Investor Days"],
        "preparation": ["IPO Readiness", "Roadshow Excellence", "Prospectus Review", "Public Company PR"]
     }',
     120, 150),

    (10, 65, 65, 'M&A Communications Strategy', 
     'Navigate merger, acquisition, and partnership announcements strategically.',
     '[
        "Plan M&A announcement strategy",
        "Manage confidentiality and leaks",
        "Coordinate stakeholder messaging",
        "Handle integration communications",
        "Address cultural integration",
        "Measure communication success"
     ]',
     '{
        "planning": ["Announcement Timeline", "Stakeholder Matrix", "Message Architecture", "Q&A Preparation"],
        "execution": ["Day One Planning", "Employee Communications", "Customer Retention", "Media Strategy"],
        "integration": ["Culture Messaging", "Brand Integration", "Team Alignment", "Success Stories"],
        "challenges": ["Leak Management", "Rumor Control", "Opposition Handling", "Regulatory Communications"]
     }',
     90, 100),

    (10, 66, 66, 'Government & Policy Relations', 
     'Build effective government relations and policy influence strategies.',
     '[
        "Map government stakeholders",
        "Build policy influence strategy",
        "Manage regulatory communications",
        "Participate in policy formation",
        "Handle government inquiries",
        "Build public-private partnerships"
     ]',
     '{
        "stakeholders": ["Ministry Mapping", "Bureaucrat Relations", "Political Engagement", "Think Tank Connections"],
        "influence": ["Position Papers", "Policy Submissions", "Industry Representations", "Advisory Roles"],
        "management": ["Regulatory Filings", "Compliance Communications", "Investigation Response", "Audit Management"],
        "partnerships": ["PPP Opportunities", "Government Contracts", "Grant Applications", "Innovation Programs"]
     }',
     90, 100),

    (10, 67, 67, 'Competitive PR & Market Positioning', 
     'Use PR strategically for competitive advantage and market leadership.',
     '[
        "Analyze competitive PR landscape",
        "Develop competitive positioning",
        "Execute market leadership PR",
        "Handle competitive attacks",
        "Build category leadership",
        "Measure competitive impact"
     ]',
     '{
        "analysis": ["Competitor Monitoring", "Share of Voice", "Message Analysis", "Weakness Identification"],
        "positioning": ["Differentiation Strategy", "Leadership Claims", "Innovation Narrative", "Customer Proof"],
        "tactics": ["Comparison Campaigns", "Switching Stories", "Market Education", "Thought Leadership"],
        "defense": ["Attack Response", "FUD Management", "Fact Checking", "Legal Considerations"]
     }',
     90, 100),

    (10, 68, 68, 'ESG & Sustainability Communications', 
     'Build ESG narrative and communicate sustainability initiatives effectively.',
     '[
        "Develop ESG strategy and narrative",
        "Communicate sustainability initiatives",
        "Build stakeholder engagement",
        "Handle ESG criticism",
        "Measure and report impact",
        "Gain ESG recognition"
     ]',
     '{
        "strategy": ["ESG Framework", "Materiality Assessment", "Stakeholder Mapping", "Goal Setting"],
        "communication": ["Sustainability Report", "Impact Stories", "Progress Updates", "Transparency Principles"],
        "engagement": ["Investor Relations", "Customer Education", "Employee Involvement", "Community Partnership"],
        "measurement": ["ESG Metrics", "Impact Assessment", "Third-party Verification", "Ratings Management"]
     }',
     90, 100),

    (10, 69, 69, 'Tech PR & Innovation Communications', 
     'Master technology PR and innovation storytelling for tech-enabled businesses.',
     '[
        "Simplify complex technology stories",
        "Build innovation narrative",
        "Handle product launches",
        "Manage tech media relations",
        "Communicate R&D breakthroughs",
        "Position for tech leadership"
     ]',
     '{
        "storytelling": ["Technical Simplification", "Use Case Development", "Demo Excellence", "Visualization Tools"],
        "innovation": ["R&D Communications", "Patent Announcements", "Partnership News", "Lab Stories"],
        "launches": ["Beta Programs", "Launch Sequences", "Feature Releases", "Update Communications"],
        "media": ["Tech Reporter Relations", "Developer Relations", "Analyst Briefings", "Industry Forums"]
     }',
     90, 100),

    (10, 70, 70, 'Data-Driven PR & Analytics', 
     'Use data and analytics to drive PR strategy and demonstrate impact.',
     '[
        "Build PR measurement framework",
        "Implement analytics tools",
        "Create data-driven stories",
        "Optimize with A/B testing",
        "Predict PR outcomes",
        "Report ROI effectively"
     ]',
     '{
        "measurement": ["KPI Framework", "Attribution Models", "Sentiment Analysis", "Influence Scoring"],
        "tools": ["Analytics Platforms", "Monitoring Setup", "Dashboard Creation", "Report Automation"],
        "optimization": ["A/B Testing PR", "Message Testing", "Channel Optimization", "Timing Analysis"],
        "reporting": ["Executive Dashboards", "ROI Calculation", "Board Reports", "Campaign Analysis"]
     }',
     90, 100),

    -- Module 11: Global Brand Expansion (Days 71-77)
    (11, 71, 71, 'International Market Entry Strategy', 
     'Plan and execute PR for international market entry and expansion.',
     '[
        "Research target market media landscape",
        "Adapt brand for local market",
        "Build local media relationships",
        "Plan market entry campaign",
        "Manage cross-border communications",
        "Track international coverage"
     ]',
     '{
        "research": ["Market Analysis", "Media Mapping", "Cultural Assessment", "Competition Study"],
        "adaptation": ["Message Localization", "Visual Adaptation", "Brand Translation", "Cultural Sensitivity"],
        "relationships": ["Local Agency Selection", "Journalist Outreach", "Influencer Partnerships", "Government Relations"],
        "execution": ["Launch Campaign", "Event Strategy", "Partnership Announcements", "Local PR"]
     }',
     90, 100),

    (11, 72, 72, 'Cross-Cultural Communication Mastery', 
     'Navigate cultural nuances in global brand communications.',
     '[
        "Map cultural dimensions and values",
        "Adapt communication styles",
        "Handle cultural sensitivities",
        "Build inclusive messaging",
        "Manage multicultural teams",
        "Celebrate diversity authentically"
     ]',
     '{
        "frameworks": ["Hofstede Dimensions", "GLOBE Study", "Cultural Values Map", "Communication Styles"],
        "adaptation": ["Message Customization", "Visual Localization", "Tone Adjustment", "Channel Preferences"],
        "sensitivity": ["Taboo Topics", "Religious Considerations", "Political Awareness", "Historical Context"],
        "inclusion": ["Inclusive Language", "Representation Strategy", "Accessibility Standards", "Local Voices"]
     }',
     90, 100),

    (11, 73, 73, 'Global Media Relations', 
     'Build and manage relationships with international media outlets and journalists.',
     '[
        "Map global media landscape",
        "Build international journalist database",
        "Manage time zones effectively",
        "Handle language differences",
        "Coordinate global announcements",
        "Track worldwide coverage"
     ]',
     '{
        "landscape": ["International Publications", "News Agencies", "Regional Media", "Trade Press"],
        "database": ["Global Journalist Contacts", "Beat Mapping", "Language Preferences", "Time Zones"],
        "coordination": ["Global Press Release", "Embargo Management", "Translation Services", "Local Spokespeople"],
        "measurement": ["Global Reach", "Regional Sentiment", "Message Consistency", "Coverage Quality"]
     }',
     90, 100),

    (11, 74, 74, 'Multi-Market Campaign Orchestration', 
     'Execute coordinated PR campaigns across multiple markets simultaneously.',
     '[
        "Design global campaign architecture",
        "Balance global and local needs",
        "Coordinate multi-market teams",
        "Manage campaign logistics",
        "Ensure message consistency",
        "Measure multi-market impact"
     ]',
     '{
        "architecture": ["Campaign Framework", "Global-Local Balance", "Message Hierarchy", "Visual System"],
        "coordination": ["Team Structure", "Communication Protocols", "Approval Process", "Timeline Management"],
        "execution": ["Launch Sequence", "Asset Distribution", "Local Activation", "Central Control"],
        "measurement": ["Global KPIs", "Regional Performance", "Market Comparison", "ROI Analysis"]
     }',
     90, 100),

    (11, 75, 75, 'International Crisis Management', 
     'Handle crises that span multiple markets and cultures.',
     '[
        "Build global crisis protocols",
        "Manage multi-market crisis team",
        "Handle cultural crisis nuances",
        "Coordinate global response",
        "Manage international media",
        "Rebuild trust globally"
     ]',
     '{
        "protocols": ["Global Crisis Plan", "Regional Variations", "Escalation Matrix", "Communication Trees"],
        "team": ["Global Crisis Team", "Regional Leads", "Local Spokespeople", "Central Command"],
        "response": ["Message Adaptation", "Cultural Sensitivity", "Legal Considerations", "Timing Coordination"],
        "recovery": ["Trust Rebuilding", "Market-specific Recovery", "Global Reputation", "Lesson Integration"]
     }',
     90, 100),

    (11, 76, 76, 'Global Partnership Communications', 
     'Communicate international partnerships, joint ventures, and global alliances.',
     '[
        "Plan partnership announcements",
        "Manage co-branding globally",
        "Coordinate partner communications",
        "Handle cultural partnerships",
        "Leverage global partnerships",
        "Measure partnership impact"
     ]',
     '{
        "planning": ["Announcement Strategy", "Stakeholder Alignment", "Message Development", "Asset Creation"],
        "co_branding": ["Brand Guidelines", "Visual Integration", "Message Harmony", "Channel Coordination"],
        "coordination": ["Partner Alignment", "Approval Process", "Spokesperson Selection", "Event Planning"],
        "leverage": ["Cross-promotion", "Market Access", "Credibility Transfer", "Resource Sharing"]
     }',
     90, 100),

    (11, 77, 77, 'Global Brand Governance', 
     'Establish governance systems for consistent global brand management.',
     '[
        "Create global brand governance structure",
        "Establish brand standards globally",
        "Manage regional adaptations",
        "Ensure quality control",
        "Build global brand community",
        "Measure global brand health"
     ]',
     '{
        "governance": ["Governance Structure", "Decision Rights", "Approval Process", "Escalation Paths"],
        "standards": ["Global Guidelines", "Regional Flexibility", "Quality Standards", "Compliance Requirements"],
        "community": ["Brand Champions", "Regional Councils", "Best Practice Sharing", "Training Programs"],
        "measurement": ["Brand Health Metrics", "Consistency Scoring", "Regional Performance", "Global Dashboard"]
     }',
     90, 100),

    -- Module 12: Measurement & ROI (Days 78-84)
    (12, 78, 78, 'PR Measurement Framework', 
     'Build comprehensive measurement framework to track and prove PR value.',
     '[
        "Define PR objectives and KPIs",
        "Set up measurement infrastructure",
        "Implement tracking systems",
        "Create attribution models",
        "Build reporting dashboards",
        "Calculate PR ROI"
     ]',
     '{
        "framework": ["Objective Setting", "KPI Selection", "Metric Hierarchy", "Target Definition"],
        "infrastructure": ["Tool Selection", "Data Integration", "Process Design", "Team Training"],
        "attribution": ["Attribution Models", "Contribution Analysis", "Influence Mapping", "Journey Tracking"],
        "roi": ["ROI Formula", "Value Calculation", "Cost Analysis", "Investment Justification"]
     }',
     90, 100),

    (12, 79, 79, 'Media Coverage Analytics', 
     'Analyze media coverage for insights and optimization opportunities.',
     '[
        "Track coverage volume and reach",
        "Analyze coverage quality",
        "Measure message penetration",
        "Assess sentiment accurately",
        "Compare competitive coverage",
        "Identify optimization opportunities"
     ]',
     '{
        "metrics": ["Volume Tracking", "Reach Calculation", "Share of Voice", "AVE Alternatives"],
        "quality": ["Tier Analysis", "Prominence Scoring", "Message Inclusion", "Visual Coverage"],
        "sentiment": ["Sentiment Analysis", "Emotion Detection", "Topic Modeling", "Trend Analysis"],
        "optimization": ["Gap Analysis", "Opportunity Identification", "Strategy Refinement", "Tactical Adjustments"]
     }',
     90, 100),

    (12, 80, 80, 'Brand Health Measurement', 
     'Measure and track brand health metrics for continuous improvement.',
     '[
        "Design brand health study",
        "Track brand awareness metrics",
        "Measure brand perception",
        "Assess brand loyalty",
        "Monitor brand equity",
        "Report brand performance"
     ]',
     '{
        "research": ["Survey Design", "Sample Selection", "Methodology Choice", "Frequency Planning"],
        "metrics": ["Aided/Unaided Awareness", "Consideration", "Preference", "Net Promoter Score"],
        "tracking": ["Longitudinal Studies", "Competitive Benchmarking", "Segment Analysis", "Driver Analysis"],
        "reporting": ["Executive Summary", "Trend Analysis", "Action Planning", "Investment Recommendations"]
     }',
     90, 100),

    (12, 81, 81, 'Digital Analytics & Attribution', 
     'Use digital analytics to measure PR impact on business outcomes.',
     '[
        "Set up digital tracking",
        "Implement UTM parameters",
        "Track PR-driven traffic",
        "Measure conversions",
        "Analyze user behavior",
        "Optimize digital PR"
     ]',
     '{
        "setup": ["Google Analytics", "Tag Management", "Goal Configuration", "Event Tracking"],
        "tracking": ["UTM Strategy", "Campaign Tagging", "Source Attribution", "Content Performance"],
        "analysis": ["Traffic Analysis", "Behavior Flow", "Conversion Paths", "Audience Insights"],
        "optimization": ["Content Optimization", "Channel Performance", "Journey Optimization", "Testing Strategy"]
     }',
     90, 100),

    (12, 82, 82, 'Executive Reporting & Dashboards', 
     'Create executive-level reporting that demonstrates PR value clearly.',
     '[
        "Design executive dashboards",
        "Create board-level reports",
        "Develop story-based reporting",
        "Show business impact",
        "Benchmark performance",
        "Make recommendations"
     ]',
     '{
        "dashboards": ["KPI Dashboard", "Real-time Monitoring", "Alert Systems", "Mobile Access"],
        "reports": ["Board Presentation", "Monthly Reports", "Campaign Reviews", "Annual Summary"],
        "storytelling": ["Data Visualization", "Narrative Structure", "Success Stories", "Learning Points"],
        "impact": ["Business Metrics", "Revenue Attribution", "Cost Savings", "Risk Mitigation"]
     }',
     90, 100),

    (12, 83, 83, 'Continuous Optimization', 
     'Build systems for continuous testing, learning, and optimization.',
     '[
        "Implement testing frameworks",
        "Analyze performance patterns",
        "Identify improvement areas",
        "Test new strategies",
        "Scale successful tactics",
        "Document learnings"
     ]',
     '{
        "testing": ["A/B Testing", "Multivariate Testing", "Pilot Programs", "Controlled Experiments"],
        "analysis": ["Pattern Recognition", "Anomaly Detection", "Correlation Analysis", "Predictive Modeling"],
        "optimization": ["Process Improvement", "Resource Allocation", "Channel Optimization", "Message Refinement"],
        "learning": ["Knowledge Base", "Best Practices", "Playbook Updates", "Team Training"]
     }',
     90, 100),

    (12, 84, 84, 'Future-Proofing Your Brand', 
     'Prepare your brand for future challenges and opportunities.',
     '[
        "Analyze future trends",
        "Build adaptive capabilities",
        "Invest in innovation",
        "Develop scenarios",
        "Create contingency plans",
        "Plan next phase growth"
     ]',
     '{
        "trends": ["Technology Trends", "Consumer Behavior", "Media Evolution", "Regulatory Changes"],
        "capabilities": ["Skill Development", "Tool Investment", "Process Innovation", "Agile Methods"],
        "scenarios": ["Scenario Planning", "Risk Assessment", "Opportunity Mapping", "Strategic Options"],
        "growth": ["Growth Strategy", "Investment Planning", "Capability Building", "Partnership Strategy"]
     }',
     90, 100)
     
) AS l(module_num, order_index, day, title, brief_content, action_items, resources, estimated_time, xp_reward)
WHERE m."orderIndex" = l.module_num AND p.code = 'P11';

-- Add comprehensive media contact database as metadata
UPDATE "Product"
SET metadata = metadata || jsonb_build_object(
    'media_database', jsonb_build_object(
        'national_english', jsonb_build_array(
            jsonb_build_object('publication', 'The Times of India', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Surabhi Agarwal', 'email', 'surabhi.agarwal@timesgroup.com', 'beat', 'Technology'),
                jsonb_build_object('name', 'Digbijay Mishra', 'email', 'digbijay.mishra@timesgroup.com', 'beat', 'Startups'),
                jsonb_build_object('name', 'Pankaj Doval', 'email', 'pankaj.doval@timesgroup.com', 'role', 'Business Editor')
            )),
            jsonb_build_object('publication', 'The Economic Times', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Biswarup Gooptu', 'email', 'biswarup.gooptu@timesgroup.com', 'beat', 'Startups'),
                jsonb_build_object('name', 'Jochelle Mendonca', 'email', 'jochelle.mendonca@timesgroup.com', 'role', 'Tech Editor'),
                jsonb_build_object('name', 'Writankar Mukherjee', 'email', 'writankar.mukherjee@timesgroup.com', 'beat', 'E-commerce')
            )),
            jsonb_build_object('publication', 'Business Standard', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Surajeet Das Gupta', 'email', 'surajeet.dg@business-standard.com', 'role', 'Technology Editor'),
                jsonb_build_object('name', 'Shivani Shinde', 'email', 'shivani.shinde@business-standard.com', 'beat', 'Startups')
            )),
            jsonb_build_object('publication', 'Mint', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Reghu Balakrishnan', 'email', 'reghu.b@livemint.com', 'role', 'Startup Editor'),
                jsonb_build_object('name', 'Leslie D''Monte', 'email', 'leslie.dmonte@livemint.com', 'beat', 'Technology'),
                jsonb_build_object('name', 'Prasid Banerjee', 'email', 'prasid.b@livemint.com', 'beat', 'Consumer Tech')
            )),
            jsonb_build_object('publication', 'The Hindu BusinessLine', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Raghuvir Srinivasan', 'email', 'raghuvir.s@thehindu.co.in', 'role', 'Editor'),
                jsonb_build_object('name', 'K V Kurmanath', 'email', 'kurmanath@thehindu.co.in', 'beat', 'Startups')
            ))
        ),
        'digital_first', jsonb_build_array(
            jsonb_build_object('publication', 'YourStory', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Shradha Sharma', 'email', 'shradha@yourstory.com', 'role', 'Founder & CEO'),
                jsonb_build_object('name', 'Sindhu Kashyap', 'email', 'sindhu@yourstory.com', 'role', 'Editor')
            )),
            jsonb_build_object('publication', 'Inc42', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Vaibhav Vardhan', 'email', 'vaibhav@inc42.com', 'role', 'Co-founder'),
                jsonb_build_object('name', 'Pooja Sareen', 'email', 'pooja@inc42.com', 'role', 'Editor')
            )),
            jsonb_build_object('publication', 'Entrepreneur India', 'contact', 'ritu.marya@entrepreneurindia.com'),
            jsonb_build_object('publication', 'Forbes India', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Brian Carvalho', 'email', 'brian.carvalho@forbesindia.com', 'role', 'Editor'),
                jsonb_build_object('name', 'Rajiv Singh', 'email', 'rajiv.singh@forbesindia.com', 'beat', 'Startups')
            ))
        ),
        'international', jsonb_build_array(
            jsonb_build_object('publication', 'TechCrunch', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Manish Singh', 'email', 'manish.singh@techcrunch.com', 'region', 'India'),
                jsonb_build_object('name', 'Catherine Shu', 'email', 'catherine@techcrunch.com', 'role', 'Asia Editor')
            )),
            jsonb_build_object('publication', 'Wall Street Journal', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Eric Bellman', 'email', 'eric.bellman@wsj.com', 'role', 'India Bureau Chief'),
                jsonb_build_object('name', 'Newley Purnell', 'email', 'newley.purnell@wsj.com', 'beat', 'India Tech')
            )),
            jsonb_build_object('publication', 'Financial Times', 'contact', jsonb_build_object('name', 'Benjamin Parkin', 'email', 'benjamin.parkin@ft.com', 'role', 'India Correspondent')),
            jsonb_build_object('publication', 'Bloomberg', 'contacts', jsonb_build_array(
                jsonb_build_object('name', 'Saritha Rai', 'email', 'srai51@bloomberg.net', 'beat', 'India Tech'),
                jsonb_build_object('name', 'Anto Antony', 'email', 'aantony10@bloomberg.net', 'beat', 'India Startups')
            )),
            jsonb_build_object('publication', 'Reuters', 'contact', jsonb_build_object('name', 'Sankalp Phartiyal', 'email', 'sankalp.phartiyal@thomsonreuters.com', 'beat', 'India Tech')),
            jsonb_build_object('publication', 'BBC', 'contact', jsonb_build_object('name', 'Nikhil Inamdar', 'email', 'nikhil.inamdar@bbc.co.uk', 'role', 'India Business'))
        ),
        'tv_channels', jsonb_build_array(
            jsonb_build_object('channel', 'CNBC-TV18', 'shows', jsonb_build_array('Young Turks', 'Startup Central'), 'contact', 'shereen.bhan@network18online.com'),
            jsonb_build_object('channel', 'ET Now', 'shows', jsonb_build_array('Startup Mantra', 'Leaders of Tomorrow'), 'contact', 'startup.mantra@timesgroup.com'),
            jsonb_build_object('channel', 'NDTV Profit', 'contact', 'profit@ndtv.com')
        )
    )
)
WHERE code = 'P11';

COMMIT;

-- Verification
SELECT 
    p.code,
    p.title,
    p.price,
    p."estimatedDays",
    COUNT(DISTINCT m.id) as modules,
    COUNT(DISTINCT l.id) as lessons,
    jsonb_array_length(p.features) as features
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p.code = 'P11'
GROUP BY p.code, p.title, p.price, p."estimatedDays", p.features;