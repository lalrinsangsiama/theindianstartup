-- P11: Branding & Public Relations Mastery Course
-- Complete SQL script to insert product, modules, and lessons

-- Insert Product P11
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "bundleProducts", "estimatedDays", "createdAt", "updatedAt")
VALUES (
    'p11_product',
    'P11',
    'Branding & Public Relations Mastery',
    'Transform your startup into a recognized industry leader through powerful brand building and strategic PR. Master brand strategy, visual identity, customer experience, media relations, award winning, and personal branding. Includes 300+ templates, media training, crisis management protocols, and comprehensive PR toolkit.',
    7999,
    false,
    ARRAY[]::text[],
    54,
    NOW(),
    NOW()
);

-- Module 1: Foundations of Brand Building (Days 1-5)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_1',
    'p11_product',
    'Foundations of Brand Building',
    'Master the fundamental principles of brand building, from understanding brand vs branding to creating comprehensive brand guidelines. Learn brand strategy frameworks, develop brand personality and voice, design visual identity systems, and document everything in professional brand guidelines.',
    1,
    NOW(),
    NOW()
);

-- Module 2: Customer Experience Branding (Days 6-10)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_2',
    'p11_product',
    'Customer Experience Branding',
    'Design exceptional customer experiences that reinforce your brand at every touchpoint. Master packaging design, retail and space branding, digital touchpoint excellence, customer service as brand, and community building strategies.',
    2,
    NOW(),
    NOW()
);

-- Module 3: Team Culture as Brand (Days 11-15)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_3',
    'p11_product',
    'Team Culture as Brand',
    'Build a powerful internal brand that turns your team into brand ambassadors. Learn internal brand building, employer branding, employee advocacy, leadership positioning, and culture marketing strategies.',
    3,
    NOW(),
    NOW()
);

-- Module 4: Public Relations Fundamentals (Days 16-20)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_4',
    'p11_product',
    'Public Relations Fundamentals',
    'Master the core principles of public relations for Indian startups. Develop PR strategies, understand media landscape, craft compelling stories, write effective press releases, and excel in media training and crisis communication.',
    4,
    NOW(),
    NOW()
);

-- Module 5: Award Winning Strategies (Days 21-25)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_5',
    'p11_product',
    'Award Winning Strategies',
    'Win prestigious awards and leverage them for brand building. Map award landscape, create winning applications, manage award campaigns, secure speaking opportunities, and build industry recognition.',
    5,
    NOW(),
    NOW()
);

-- Module 6: Content & Digital PR (Days 26-30)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_6',
    'p11_product',
    'Content & Digital PR',
    'Master modern digital PR strategies and content marketing. Develop content strategies, execute digital PR tactics, leverage social media, prepare for crisis management, and measure PR effectiveness.',
    6,
    NOW(),
    NOW()
);

-- Module 7: Agency Relationships (Days 31-35)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_7',
    'p11_product',
    'Agency Relationships',
    'Navigate the world of PR agencies effectively. Learn agency selection, briefing and management, understand pricing models, evaluate in-house vs agency options, and create integrated communications strategies.',
    7,
    NOW(),
    NOW()
);

-- Module 8: Regional & Cultural PR (Days 36-40)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_8',
    'p11_product',
    'Regional & Cultural PR',
    'Master India-specific PR strategies with cultural sensitivity. Develop regional media strategies, ensure cultural sensitivity, build government relations, communicate CSR effectively, and manage international PR.',
    8,
    NOW(),
    NOW()
);

-- Module 9: Personal Branding for Founders (Days 41-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_9',
    'p11_product',
    'Personal Branding for Founders',
    'Build a powerful personal brand as a founder. Develop founder brand strategy, master LinkedIn, create media personality, establish thought leadership, and enhance executive presence through coaching.',
    9,
    NOW(),
    NOW()
);

-- Module 10: Entertainment & Sports PR (Days 46-48)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_10',
    'p11_product',
    'Entertainment & Sports PR',
    'Advanced strategies for entertainment and sports PR. Learn celebrity partnerships, sports sponsorships, entertainment marketing, event activations, and fan engagement strategies.',
    10,
    NOW(),
    NOW()
);

-- Module 11: Financial Communications (Days 49-51)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_11',
    'p11_product',
    'Financial Communications',
    'Master financial PR and investor relations. Learn earnings communication, M&A announcements, analyst relations, shareholder communication, and IPO readiness strategies.',
    11,
    NOW(),
    NOW()
);

-- Module 12: Global PR Strategies (Days 52-54)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
    'p11_module_12',
    'p11_product',
    'Global PR Strategies',
    'Expand your PR reach globally. Master international expansion PR, multi-market campaigns, global media relations, cross-cultural communication, and international award strategies.',
    12,
    NOW(),
    NOW()
);

-- Module 1 Lessons (Days 1-5)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_1',
    'p11_module_1',
    1,
    'Understanding Brand vs Branding vs Marketing',
    'Master the fundamental distinctions between brand, branding, marketing, and PR. Learn why branding precedes marketing and how it creates the ₹1000 Cr valuation difference. Understand the complete brand ecosystem including visual, verbal, experiential, cultural, digital, physical, emotional, and social identities.',
    '["Define your brand essence in one sentence", "Map your current brand touchpoints across all 8 identity dimensions", "Identify gaps between brand perception and reality", "Calculate potential brand equity value for your business", "Document your brand vs marketing vs PR activities", "Create initial brand ecosystem audit"]'::jsonb,
    '["Brand Ecosystem Mapping Template", "Brand Equity Calculator", "Perception vs Reality Analysis Framework", "Brand Identity Dimensions Checklist", "Case Study: Zomato''s Brand Evolution", "Brand ROI Measurement Guide"]'::jsonb,
    120,
    150,
    1,
    NOW(),
    NOW()
),
(
    'p11_lesson_2',
    'p11_module_1',
    2,
    'Brand Strategy Framework',
    'Develop comprehensive brand positioning and architecture. Master target audience psychographics, competitive differentiation, value proposition clarity, and brand promise definition. Learn to create positioning statements, define categories, and plan brand architecture for future expansion.',
    '["Create detailed buyer personas with psychographic profiles", "Conduct competitive brand analysis", "Write your brand positioning statement", "Define your brand architecture model", "Map sub-brand relationships if applicable", "Plan naming conventions for future products"]'::jsonb,
    '["Brand Positioning Canvas", "Competitive Analysis Framework", "Brand Architecture Models Guide", "Naming Convention Templates", "Positioning Statement Formula", "Mind Space Ownership Strategies"]'::jsonb,
    120,
    150,
    2,
    NOW(),
    NOW()
),
(
    'p11_lesson_3',
    'p11_module_1',
    3,
    'Brand Personality & Voice',
    'Define your brand personality across five dimensions and develop a consistent brand voice. Learn to adapt personality for Indian context, create voice guidelines with tone variations, and maintain consistency across all communications.',
    '["Complete brand personality assessment", "Define voice characteristics and tone variations", "Create do''s and don''ts for brand communication", "Write sample content in brand voice", "Develop humor and formality guidelines", "Create regional adaptation guidelines"]'::jsonb,
    '["Brand Personality Questionnaire", "Voice & Tone Template", "Indian Cultural Nuances Guide", "Communication Style Guide", "Regional Variation Framework", "Brand Voice Examples Library"]'::jsonb,
    90,
    120,
    3,
    NOW(),
    NOW()
),
(
    'p11_lesson_4',
    'p11_module_1',
    4,
    'Visual Identity System',
    'Design comprehensive visual identity system including logo principles, color psychology for India, typography selection, and complete visual asset library. Create application guidelines for all brand touchpoints from business cards to digital interfaces.',
    '["Develop logo design brief", "Select brand color palette with cultural considerations", "Choose primary and secondary typefaces", "Create icon and symbol system", "Define photography and illustration style", "Design business card and letterhead templates"]'::jsonb,
    '["Logo Design Principles Guide", "Indian Color Psychology Research", "Typography Selection Framework", "Visual Asset Template Library", "Photography Style Guide", "Brand Application Examples"]'::jsonb,
    120,
    150,
    4,
    NOW(),
    NOW()
),
(
    'p11_lesson_5',
    'p11_module_1',
    5,
    'Brand Guidelines Creation',
    'Document your complete brand in professional guidelines. Include brand story, mission/vision/values, usage rules, specifications, and implementation tools. Create training materials and quality control processes for consistent brand application.',
    '["Write comprehensive brand story", "Document all visual specifications", "Create usage rules and examples", "Develop brand training materials", "Set up digital asset management system", "Design partner and vendor briefing kits"]'::jsonb,
    '["Brand Guidelines Template (50+ pages)", "Digital Asset Management Setup Guide", "Brand Training Presentation", "Vendor Briefing Kit Template", "Quality Control Checklist", "Brand Update Protocol Document"]'::jsonb,
    120,
    180,
    5,
    NOW(),
    NOW()
);

-- Module 2 Lessons (Days 6-10)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_6',
    'p11_module_2',
    6,
    'Packaging as Brand Ambassador',
    'Master package design strategy for maximum shelf impact and memorable unboxing experiences. Learn sustainability messaging, premium vs mass positioning, cultural considerations, and technical aspects of packaging that reinforces brand identity.',
    '["Design packaging concept with brand story", "Create unboxing experience journey", "Incorporate sustainability messaging", "Develop regional packaging variations", "Calculate packaging cost optimization", "Plan limited edition packaging calendar"]'::jsonb,
    '["Packaging Design Brief Template", "Unboxing Experience Planner", "Sustainable Packaging Guide", "Regional Adaptation Checklist", "Cost Optimization Calculator", "Limited Edition Strategy Framework"]'::jsonb,
    120,
    150,
    6,
    NOW(),
    NOW()
),
(
    'p11_lesson_7',
    'p11_module_2',
    7,
    'Retail and Space Design',
    'Transform physical spaces into brand experiences. Master store design principles, sensory branding across 5 senses, and workspace branding. Create Instagram-worthy spots and design spaces that reinforce brand values and enhance customer journey.',
    '["Map customer journey in physical space", "Design sensory brand experience plan", "Create Instagram-worthy spot concepts", "Plan workspace branding elements", "Develop retail design guidelines", "Design brand museum concept"]'::jsonb,
    '["Store Design Principles Handbook", "Sensory Branding Checklist", "Customer Journey Mapping Tools", "Workspace Branding Guide", "Retail Experience Examples", "Brand Museum Blueprint"]'::jsonb,
    120,
    150,
    7,
    NOW(),
    NOW()
),
(
    'p11_lesson_8',
    'p11_module_2',
    8,
    'Digital Touchpoint Excellence',
    'Create exceptional digital brand experiences across website and app. Master homepage storytelling, navigation philosophy, micro-interactions, and conversion optimization while maintaining brand consistency across all digital touchpoints.',
    '["Audit current digital brand experience", "Design homepage brand story", "Create micro-interaction guidelines", "Plan app onboarding experience", "Define error page personality", "Optimize for brand-driven conversions"]'::jsonb,
    '["Digital Brand Audit Template", "Homepage Storytelling Framework", "Micro-interaction Library", "App Experience Guidelines", "Error Page Personality Examples", "Conversion Optimization Checklist"]'::jsonb,
    120,
    150,
    8,
    NOW(),
    NOW()
),
(
    'p11_lesson_9',
    'p11_module_2',
    9,
    'Customer Service as Brand',
    'Transform customer service into powerful brand building tool. Design service principles, response standards, and communication templates that reinforce brand personality. Master complaint handling and surprise-and-delight strategies.',
    '["Define service design principles", "Create response time standards by channel", "Write communication templates in brand voice", "Design complaint handling process", "Plan surprise and delight program", "Develop loyalty building strategies"]'::jsonb,
    '["Service Design Toolkit", "Response Standards Template", "Communication Templates Library", "Complaint Resolution Framework", "Surprise & Delight Playbook", "Loyalty Program Designer"]'::jsonb,
    90,
    120,
    9,
    NOW(),
    NOW()
),
(
    'p11_lesson_10',
    'p11_module_2',
    10,
    'Community Building',
    'Build vibrant brand communities that drive engagement and advocacy. Create user groups, ambassador programs, and exclusive experiences. Master user-generated content strategies and design engagement programs that strengthen brand loyalty.',
    '["Design brand community structure", "Create ambassador program framework", "Plan exclusive community experiences", "Develop user-generated content strategy", "Design referral program mechanics", "Schedule offline community meetups"]'::jsonb,
    '["Community Building Playbook", "Ambassador Program Template", "UGC Strategy Framework", "Engagement Calendar Template", "Referral Program Calculator", "Meetup Planning Guide"]'::jsonb,
    120,
    150,
    10,
    NOW(),
    NOW()
);

-- Module 3 Lessons (Days 11-15)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_11',
    'p11_module_3',
    11,
    'Internal Brand Building',
    'Build strong internal brand culture that drives external brand success. Define and activate core values, establish behavior standards, and create decision frameworks that align with brand identity. Document culture for consistency and scale.',
    '["Define and activate core values", "Create behavior standards document", "Develop decision-making frameworks", "Design culture deck presentation", "Create employee handbook with brand focus", "Establish culture measurement metrics"]'::jsonb,
    '["Core Values Activation Toolkit", "Culture Deck Template", "Employee Handbook Framework", "Behavior Standards Guide", "Decision Framework Templates", "Culture Measurement Tools"]'::jsonb,
    120,
    150,
    11,
    NOW(),
    NOW()
),
(
    'p11_lesson_12',
    'p11_module_3',
    12,
    'Employer Branding',
    'Position your startup as employer of choice through strategic employer branding. Develop EVP, design career experiences, and manage external positioning across platforms. Build talent attraction engine aligned with brand values.',
    '["Create Employee Value Proposition", "Design career site with brand story", "Optimize Glassdoor presence", "Develop campus relations strategy", "Create employee growth stories", "Plan employer brand campaign"]'::jsonb,
    '["EVP Development Framework", "Career Site Design Guide", "Glassdoor Management Playbook", "Campus Relations Toolkit", "Employee Story Templates", "Employer Brand Campaign Planner"]'::jsonb,
    120,
    150,
    12,
    NOW(),
    NOW()
),
(
    'p11_lesson_13',
    'p11_module_3',
    13,
    'Team as Brand Ambassadors',
    'Transform employees into powerful brand advocates. Develop employee advocacy programs, provide personal branding support, and create training programs that enable authentic brand representation across all channels.',
    '["Create social media guidelines for employees", "Design LinkedIn optimization program", "Develop employee content calendar", "Plan personal branding workshops", "Create recognition program for advocacy", "Design ambassador training curriculum"]'::jsonb,
    '["Employee Advocacy Playbook", "LinkedIn Optimization Guide", "Content Sharing Toolkit", "Personal Branding Workshop Materials", "Recognition Program Framework", "Ambassador Training Modules"]'::jsonb,
    90,
    120,
    13,
    NOW(),
    NOW()
),
(
    'p11_lesson_14',
    'p11_module_3',
    14,
    'Leadership Branding',
    'Position founders and executives as industry thought leaders. Develop personal brand strategies, create signature stories, and build executive visibility through strategic positioning and consistent presence across relevant platforms.',
    '["Define founder positioning strategy", "Create executive bio variations", "Develop signature story collection", "Plan conference speaking calendar", "Design thought leadership content plan", "Schedule executive photoshoot"]'::jsonb,
    '["Founder Positioning Toolkit", "Executive Bio Templates", "Signature Story Framework", "Speaking Opportunity Tracker", "Thought Leadership Calendar", "Executive Photography Guide"]'::jsonb,
    120,
    150,
    14,
    NOW(),
    NOW()
),
(
    'p11_lesson_15',
    'p11_module_3',
    15,
    'Culture Marketing',
    'Showcase company culture as competitive advantage. Design internal communications that reinforce brand, create external content that attracts talent and customers, and build culture marketing engine that differentiates your startup.',
    '["Design internal communication channels", "Create culture video concepts", "Plan day-in-life content series", "Document team celebration rituals", "Showcase innovation initiatives", "Design culture showcase events"]'::jsonb,
    '["Internal Comms Playbook", "Culture Video Scripts", "Content Series Templates", "Celebration Ritual Guide", "Innovation Showcase Framework", "Culture Event Planning Kit"]'::jsonb,
    120,
    150,
    15,
    NOW(),
    NOW()
);

-- Module 4 Lessons (Days 16-20)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_16',
    'p11_module_4',
    16,
    'PR Strategy Development',
    'Develop comprehensive PR strategy aligned with business objectives. Set clear PR goals from awareness to crisis preparation, map stakeholders across media, government, and community, and create integrated PR plan for sustainable growth.',
    '["Define PR objectives for next 12 months", "Map all stakeholder groups and influencers", "Create PR calendar aligned with business", "Identify potential crisis scenarios", "Set PR success metrics and KPIs", "Design stakeholder engagement plan"]'::jsonb,
    '["PR Strategy Canvas", "Stakeholder Mapping Template", "PR Calendar Framework", "Crisis Scenario Planner", "PR Metrics Dashboard", "Engagement Strategy Toolkit"]'::jsonb,
    120,
    150,
    16,
    NOW(),
    NOW()
),
(
    'p11_lesson_17',
    'p11_module_4',
    17,
    'Media Landscape Understanding',
    'Master the Indian media ecosystem across print, digital, broadcast, and new media. Build journalist relationships, understand beat structures, and develop media engagement strategies for maximum coverage and impact.',
    '["Map relevant media outlets by tier", "Identify key journalists in your beat", "Create journalist relationship tracker", "Understand publication calendars", "Build media contact database", "Design journalist engagement plan"]'::jsonb,
    '["Indian Media Landscape Map", "Journalist Database Template", "Beat Understanding Guide", "Media Calendar Tracker", "Relationship Building Playbook", "Pitch Preference Analyzer"]'::jsonb,
    120,
    150,
    17,
    NOW(),
    NOW()
),
(
    'p11_lesson_18',
    'p11_module_4',
    18,
    'Story Development',
    'Craft newsworthy stories that capture media attention. Master story angles from funding to social impact, develop compelling narratives using proven frameworks, and create story bank for consistent media presence.',
    '["Identify 10 potential story angles", "Develop 3 signature company stories", "Create data-backed story points", "Write problem-solution narrative", "Document customer success stories", "Prepare industry disruption angle"]'::jsonb,
    '["Story Angle Finder", "Narrative Framework Templates", "Data Story Builder", "Customer Story Interview Guide", "Newsworthy Checklist", "Story Bank Organizer"]'::jsonb,
    120,
    150,
    18,
    NOW(),
    NOW()
),
(
    'p11_lesson_19',
    'p11_module_4',
    19,
    'Press Release Mastery',
    'Write press releases that get noticed and published. Master structure from headline to boilerplate, understand distribution strategies, and develop follow-up systems for maximum media pickup and coverage.',
    '["Write press release for upcoming news", "Craft 5 compelling headline options", "Create quote bank for executives", "Design press kit materials", "Plan distribution strategy", "Create follow-up sequence"]'::jsonb,
    '["Press Release Template Library", "Headline Writing Formula", "Quote Development Guide", "Press Kit Checklist", "Distribution Channel Guide", "Follow-up Email Templates"]'::jsonb,
    90,
    120,
    19,
    NOW(),
    NOW()
),
(
    'p11_lesson_20',
    'p11_module_4',
    20,
    'Media Training',
    'Prepare for successful media interactions across all formats. Master interview techniques, develop key messages, handle difficult questions, and excel in TV, radio, podcast, and virtual appearances while managing crisis communications.',
    '["Develop 3 key messages", "Practice bridging techniques", "Prepare for 10 difficult questions", "Record mock interview", "Create crisis response protocols", "Design spokesperson briefing kit"]'::jsonb,
    '["Media Training Workbook", "Key Message Developer", "Difficult Questions Bank", "Interview Technique Guide", "Crisis Response Templates", "Body Language Checklist"]'::jsonb,
    120,
    180,
    20,
    NOW(),
    NOW()
);

-- Module 5 Lessons (Days 21-25)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_21',
    'p11_module_5',
    21,
    'Award Landscape Mapping',
    'Navigate the comprehensive award ecosystem in India. Identify relevant awards across industry, innovation, leadership, and CSR categories. Understand major award programs and create strategic award calendar for maximum impact.',
    '["Research 20 relevant awards for your startup", "Create award calendar for next 12 months", "Analyze past winners in your category", "Calculate ROI for each award", "Identify award jury members", "Plan award budget allocation"]'::jsonb,
    '["Award Database India", "Award Calendar Template", "ROI Calculator for Awards", "Jury Research Guide", "Award Category Analyzer", "Budget Planning Worksheet"]'::jsonb,
    120,
    150,
    21,
    NOW(),
    NOW()
),
(
    'p11_lesson_22',
    'p11_module_5',
    22,
    'Award Application Excellence',
    'Create winning award applications that stand out. Master application strategy from eligibility analysis to visual design, develop compelling narratives with metrics, and differentiate your submission from competition.',
    '["Write executive summary for award application", "Compile achievement metrics dashboard", "Design visual presentation for submission", "Collect supporting documents", "Create application video script", "Get reference letters from clients"]'::jsonb,
    '["Award Application Templates", "Metrics Presentation Guide", "Visual Design Toolkit", "Video Script Framework", "Reference Letter Templates", "Differentiation Strategies"]'::jsonb,
    120,
    150,
    22,
    NOW(),
    NOW()
),
(
    'p11_lesson_23',
    'p11_module_5',
    23,
    'Award Campaign Management',
    'Manage award campaigns from nomination to leverage. Master pre-award preparation, jury presentations, and post-award amplification. Create systems to maximize value from every award win or nomination.',
    '["Create pre-award campaign plan", "Prepare jury presentation", "Design winner announcement strategy", "Plan PR amplification campaign", "Update all marketing materials", "Create internal celebration plan"]'::jsonb,
    '["Campaign Management Toolkit", "Jury Presentation Template", "Winner Announcement Playbook", "PR Amplification Guide", "Marketing Update Checklist", "Celebration Planning Kit"]'::jsonb,
    90,
    120,
    23,
    NOW(),
    NOW()
),
(
    'p11_lesson_24',
    'p11_module_5',
    24,
    'Speaking Opportunities',
    'Secure and excel at speaking opportunities. Identify relevant conferences, master application processes, develop compelling topics, and deliver memorable presentations that position you as industry thought leader.',
    '["Identify 10 target speaking events", "Develop 3 signature talk topics", "Write speaker bio and abstracts", "Design presentation template", "Create demo video", "Plan networking strategy for events"]'::jsonb,
    '["Speaking Opportunity Tracker", "Topic Development Framework", "Speaker Bio Templates", "Presentation Design Kit", "Demo Video Guide", "Event ROI Maximizer"]'::jsonb,
    120,
    150,
    24,
    NOW(),
    NOW()
),
(
    'p11_lesson_25',
    'p11_module_5',
    25,
    'Industry Recognition',
    'Build systematic industry recognition beyond awards. Establish thought leadership through content, research, and advisory positions. Create pathways to industry leadership roles and sustained influence.',
    '["Define thought leadership topics", "Create research publication plan", "Apply for industry committee positions", "Plan white paper series", "Identify mentorship opportunities", "Design industry influence strategy"]'::jsonb,
    '["Thought Leadership Planner", "Research Publication Guide", "Committee Application Templates", "White Paper Framework", "Mentorship Program Structure", "Influence Building Toolkit"]'::jsonb,
    120,
    150,
    25,
    NOW(),
    NOW()
);

-- Module 6 Lessons (Days 26-30)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_26',
    'p11_module_6',
    26,
    'Content Strategy for PR',
    'Develop content strategy that drives PR outcomes. Create diverse content types from founder letters to customer spotlights, design distribution strategies across owned and earned channels, and build content engine for consistent coverage.',
    '["Create content calendar for PR", "Write founder letter on industry topic", "Develop 3 case studies", "Plan behind-scenes content series", "Design research report concept", "Create content distribution matrix"]'::jsonb,
    '["PR Content Calendar Template", "Founder Letter Framework", "Case Study Templates", "Content Series Planner", "Research Report Guide", "Distribution Strategy Matrix"]'::jsonb,
    120,
    150,
    26,
    NOW(),
    NOW()
),
(
    'p11_lesson_27',
    'p11_module_6',
    27,
    'Digital PR Tactics',
    'Master modern digital PR tactics for online visibility. Leverage HARO, journalist queries, and expert positioning. Integrate SEO with PR for maximum impact and build sustainable digital presence.',
    '["Set up HARO monitoring", "Create expert positioning plan", "Optimize for knowledge panels", "Build citation strategy", "Design link building campaign", "Plan newsjacking calendar"]'::jsonb,
    '["HARO Response Templates", "Expert Positioning Toolkit", "Knowledge Panel Guide", "Citation Building Checklist", "Link Building Playbook", "Newsjacking Framework"]'::jsonb,
    120,
    150,
    27,
    NOW(),
    NOW()
),
(
    'p11_lesson_28',
    'p11_module_6',
    28,
    'Social Media PR',
    'Leverage social media for PR amplification. Develop platform-specific strategies, build influencer relationships, and create viral moments. Master thought leadership on LinkedIn and community building across platforms.',
    '["Create LinkedIn thought leadership plan", "Design Twitter engagement strategy", "Plan Instagram storytelling calendar", "Identify relevant influencers", "Create viral moment opportunities", "Schedule Reddit AMA"]'::jsonb,
    '["LinkedIn Strategy Playbook", "Twitter PR Tactics", "Instagram Story Templates", "Influencer Outreach Scripts", "Viral Content Formula", "Reddit AMA Guide"]'::jsonb,
    90,
    120,
    28,
    NOW(),
    NOW()
),
(
    'p11_lesson_29',
    'p11_module_6',
    29,
    'Crisis Management',
    'Prepare for and manage PR crises effectively. Develop crisis protocols, response teams, and communication strategies. Learn to handle different crisis types from product issues to regulatory challenges.',
    '["Conduct crisis risk assessment", "Create crisis response team", "Write crisis communication templates", "Design monitoring system", "Plan crisis simulation exercise", "Develop recovery strategies"]'::jsonb,
    '["Crisis Risk Assessment Tool", "Response Team Structure", "Crisis Message Templates", "Monitoring Setup Guide", "Crisis Simulation Scenarios", "Recovery Planning Framework"]'::jsonb,
    120,
    180,
    29,
    NOW(),
    NOW()
),
(
    'p11_lesson_30',
    'p11_module_6',
    30,
    'Measurement & Analytics',
    'Measure PR impact with comprehensive analytics. Track media mentions, sentiment, and share of voice. Calculate PR ROI and create reporting frameworks that demonstrate value to stakeholders.',
    '["Set up PR measurement dashboard", "Define success metrics", "Create monthly reporting template", "Calculate PR ROI", "Design competitive analysis", "Plan quarterly review process"]'::jsonb,
    '["PR Analytics Dashboard", "Metrics Definition Guide", "Reporting Templates Library", "ROI Calculator", "Competitive Analysis Tools", "Review Process Framework"]'::jsonb,
    120,
    150,
    30,
    NOW(),
    NOW()
);

-- Module 7 Lessons (Days 31-35)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_31',
    'p11_module_7',
    31,
    'Agency Selection Process',
    'Navigate PR agency landscape and select the right partner. Understand different agency types from full-service to specialists, develop evaluation criteria, and make informed decisions based on expertise, relationships, and cultural fit.',
    '["Research 10 potential PR agencies", "Create agency evaluation scorecard", "Prepare RFP document", "Schedule agency presentations", "Check agency client references", "Analyze agency case studies"]'::jsonb,
    '["Agency Research Database", "Evaluation Scorecard Template", "RFP Template for PR", "Presentation Evaluation Guide", "Reference Check Questions", "Case Study Analysis Framework"]'::jsonb,
    120,
    150,
    31,
    NOW(),
    NOW()
),
(
    'p11_lesson_32',
    'p11_module_7',
    32,
    'Agency Briefing & Management',
    'Master agency briefing and ongoing management for optimal results. Create comprehensive briefs, establish working relationships, and develop systems for effective collaboration and performance management.',
    '["Create comprehensive agency brief", "Define communication protocols", "Set up reporting requirements", "Establish approval processes", "Plan knowledge transfer sessions", "Design performance review system"]'::jsonb,
    '["Agency Briefing Template", "Communication Protocol Guide", "Reporting Format Standards", "Approval Process Flowchart", "Knowledge Transfer Checklist", "Performance Review Templates"]'::jsonb,
    90,
    120,
    32,
    NOW(),
    NOW()
),
(
    'p11_lesson_33',
    'p11_module_7',
    33,
    'PR Packages & Pricing',
    'Understand PR pricing models and negotiate optimal packages. Learn retainer structures, project fees, and performance bonuses. Design service agreements that align with your budget and objectives.',
    '["Analyze PR pricing benchmarks", "Define service requirements", "Create budget allocation plan", "Negotiate retainer terms", "Design performance incentives", "Plan cost optimization strategies"]'::jsonb,
    '["PR Pricing Benchmark Report", "Service Requirement Checklist", "Budget Planning Calculator", "Negotiation Strategy Guide", "Performance Incentive Models", "Cost Optimization Toolkit"]'::jsonb,
    120,
    150,
    33,
    NOW(),
    NOW()
),
(
    'p11_lesson_34',
    'p11_module_7',
    34,
    'In-house vs Agency',
    'Evaluate in-house PR versus agency models. Understand benefits and limitations of each approach, design hybrid models, and make strategic decisions based on stage, budget, and objectives.',
    '["Compare in-house vs agency costs", "Assess internal capabilities", "Design hybrid PR model", "Create transition plan if needed", "Define role distributions", "Plan capability building"]'::jsonb,
    '["Cost Comparison Calculator", "Capability Assessment Tool", "Hybrid Model Templates", "Transition Planning Guide", "Role Distribution Matrix", "Capability Building Roadmap"]'::jsonb,
    90,
    120,
    34,
    NOW(),
    NOW()
),
(
    'p11_lesson_35',
    'p11_module_7',
    35,
    'Integrated Communications',
    'Create integrated communications strategy aligning PR with all functions. Coordinate with marketing, sales, HR, and leadership for consistent messaging and maximum impact across all channels.',
    '["Map all communication touchpoints", "Create message consistency guide", "Design integration workflow", "Plan cross-functional campaigns", "Set up measurement systems", "Create feedback loops"]'::jsonb,
    '["Touchpoint Mapping Template", "Message Consistency Checklist", "Integration Workflow Designer", "Campaign Coordination Toolkit", "Integrated Metrics Dashboard", "Feedback System Templates"]'::jsonb,
    120,
    150,
    35,
    NOW(),
    NOW()
);

-- Module 8 Lessons (Days 36-40)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_36',
    'p11_module_8',
    36,
    'Regional Media Strategy',
    'Master regional media engagement across India. Understand language considerations, regional press dynamics, and cultural adaptations. Build relationships with regional media and create locally relevant content.',
    '["Map regional media in target markets", "Identify regional language requirements", "Find local spokespersons", "Create regional PR calendar", "Adapt key messages for regions", "Plan regional media tours"]'::jsonb,
    '["Regional Media Database", "Language Adaptation Guide", "Spokesperson Training Kit", "Regional Calendar Template", "Message Localization Framework", "Media Tour Planning Guide"]'::jsonb,
    120,
    150,
    36,
    NOW(),
    NOW()
),
(
    'p11_lesson_37',
    'p11_module_8',
    37,
    'Cultural Sensitivity',
    'Navigate cultural nuances in Indian PR. Master festival calendars, religious considerations, and social dynamics. Design culturally appropriate communications that resonate across diverse audiences.',
    '["Create cultural sensitivity guidelines", "Map festival calendar for PR", "Design inclusive visual guidelines", "Plan cultural celebration content", "Review messaging for sensitivity", "Create regional adaptation protocols"]'::jsonb,
    '["Cultural Sensitivity Handbook", "Festival PR Calendar", "Inclusive Communication Guide", "Visual Representation Standards", "Message Review Checklist", "Regional Protocol Templates"]'::jsonb,
    90,
    120,
    37,
    NOW(),
    NOW()
),
(
    'p11_lesson_38',
    'p11_module_8',
    38,
    'Government Relations',
    'Build effective government relations and policy engagement. Navigate stakeholder landscape from policymakers to regulators, create engagement strategies, and position your startup as industry leader.',
    '["Map government stakeholders", "Create position papers on policy", "Plan regulatory engagement", "Design CSR alignment strategy", "Prepare for public consultations", "Build thought leadership on policy"]'::jsonb,
    '["Stakeholder Mapping Toolkit", "Position Paper Templates", "Regulatory Engagement Guide", "CSR Alignment Framework", "Consultation Prep Checklist", "Policy Leadership Playbook"]'::jsonb,
    120,
    150,
    38,
    NOW(),
    NOW()
),
(
    'p11_lesson_39',
    'p11_module_8',
    39,
    'CSR Communication',
    'Communicate CSR initiatives effectively for brand building. Design CSR strategy aligned with brand, create compelling stories, and leverage CSR for media coverage and stakeholder engagement.',
    '["Define CSR focus areas", "Create CSR communication plan", "Design impact measurement system", "Plan CSR report publication", "Create employee engagement program", "Submit for CSR awards"]'::jsonb,
    '["CSR Strategy Framework", "Communication Plan Template", "Impact Measurement Tools", "CSR Report Guidelines", "Employee Engagement Toolkit", "CSR Award Applications"]'::jsonb,
    90,
    120,
    39,
    NOW(),
    NOW()
),
(
    'p11_lesson_40',
    'p11_module_8',
    40,
    'International PR',
    'Expand PR reach internationally. Master cross-border messaging, cultural translations, and global media engagement. Coordinate multi-market PR efforts while maintaining local relevance.',
    '["Research international media targets", "Create global PR strategy", "Design market entry PR plans", "Build international agency network", "Plan global campaign coordination", "Create crisis protocols for multiple markets"]'::jsonb,
    '["International Media Database", "Global PR Strategy Canvas", "Market Entry PR Playbook", "Agency Network Builder", "Global Campaign Toolkit", "Multi-Market Crisis Guide"]'::jsonb,
    120,
    150,
    40,
    NOW(),
    NOW()
);

-- Module 9 Lessons (Days 41-45)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_41',
    'p11_module_9',
    41,
    'Founder as Brand',
    'Develop powerful personal brand strategy as founder. Define expertise, showcase personality, and create authentic presence across platforms. Balance professional and personal while building trust and influence.',
    '["Define personal brand positioning", "Create brand archetype for yourself", "Design visual identity guidelines", "Plan content themes and topics", "Set authenticity boundaries", "Create personal brand guidelines"]'::jsonb,
    '["Personal Brand Canvas", "Archetype Assessment Tool", "Visual Identity Kit", "Content Theme Planner", "Authenticity Framework", "Personal Brand Guidebook"]'::jsonb,
    120,
    150,
    41,
    NOW(),
    NOW()
),
(
    'p11_lesson_42',
    'p11_module_9',
    42,
    'LinkedIn Mastery',
    'Transform LinkedIn into powerful personal branding platform. Optimize profile for maximum impact, develop content strategy, and build engaged community. Master LinkedIn as primary B2B branding tool.',
    '["Optimize LinkedIn profile completely", "Create content calendar for 30 days", "Build engagement strategy", "Start LinkedIn newsletter", "Plan LinkedIn Live series", "Design community building approach"]'::jsonb,
    '["LinkedIn Optimization Checklist", "Content Calendar Template", "Engagement Strategy Guide", "Newsletter Launch Kit", "LinkedIn Live Playbook", "Community Building Tactics"]'::jsonb,
    120,
    150,
    42,
    NOW(),
    NOW()
),
(
    'p11_lesson_43',
    'p11_module_9',
    43,
    'Media Personality',
    'Build compelling media personality that attracts coverage. Prepare comprehensive media kit, develop signature stories, and create consistent presence across platforms. Become go-to expert for media.',
    '["Create media kit with all materials", "Develop 5 signature stories", "Write quotable quotes collection", "Build headshot and video library", "Create podcast guest one-sheet", "Design speaker introduction kit"]'::jsonb,
    '["Media Kit Template Suite", "Signature Story Framework", "Quotable Quotes Builder", "Visual Asset Guidelines", "Podcast One-Sheet Template", "Speaker Intro Templates"]'::jsonb,
    90,
    120,
    43,
    NOW(),
    NOW()
),
(
    'p11_lesson_44',
    'p11_module_9',
    44,
    'Thought Leadership',
    'Establish authentic thought leadership in your domain. Create high-value content from opinion pieces to research insights, build distribution strategy, and measure thought leadership impact.',
    '["Define thought leadership topics", "Create opinion piece calendar", "Plan research publication", "Design content distribution strategy", "Apply for speaking at major events", "Start writing book outline"]'::jsonb,
    '["Topic Authority Builder", "Opinion Piece Templates", "Research Publication Guide", "Distribution Strategy Planner", "Major Event Application Kit", "Book Proposal Framework"]'::jsonb,
    120,
    180,
    44,
    NOW(),
    NOW()
),
(
    'p11_lesson_45',
    'p11_module_9',
    45,
    'Executive Coaching',
    'Master executive communication and presence. Develop public speaking excellence, media readiness, and leadership communication skills. Build confidence and capability for any platform or audience.',
    '["Complete communication skills assessment", "Practice public speaking techniques", "Master virtual presentation skills", "Develop storytelling capabilities", "Enhance executive presence", "Create personal development plan"]'::jsonb,
    '["Communication Assessment Tool", "Public Speaking Workbook", "Virtual Presence Guide", "Storytelling Masterclass", "Executive Presence Checklist", "Development Plan Template"]'::jsonb,
    120,
    180,
    45,
    NOW(),
    NOW()
);

-- Module 10 Lessons (Days 46-48)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_46',
    'p11_module_10',
    46,
    'Celebrity Partnerships & Endorsements',
    'Master celebrity partnerships and brand endorsements. Learn selection criteria, negotiation strategies, and campaign execution. Understand legal considerations and ROI measurement for celebrity collaborations.',
    '["Identify potential celebrity partners", "Create partnership evaluation criteria", "Design endorsement campaign concepts", "Calculate partnership ROI projections", "Draft partnership proposal", "Plan activation strategies"]'::jsonb,
    '["Celebrity Partnership Playbook", "Evaluation Criteria Matrix", "Campaign Concept Templates", "ROI Calculator for Endorsements", "Partnership Proposal Framework", "Activation Strategy Guide"]'::jsonb,
    120,
    150,
    46,
    NOW(),
    NOW()
),
(
    'p11_lesson_47',
    'p11_module_10',
    47,
    'Sports Sponsorships & Marketing',
    'Navigate sports sponsorships and marketing opportunities. From team sponsorships to event partnerships, learn to leverage sports for brand building. Master activation strategies and fan engagement.',
    '["Research sports sponsorship opportunities", "Create sponsorship strategy", "Design fan engagement programs", "Plan event activation concepts", "Calculate sports marketing ROI", "Build athlete partnership framework"]'::jsonb,
    '["Sports Sponsorship Guide", "Fan Engagement Toolkit", "Event Activation Playbook", "Sports Marketing ROI Model", "Athlete Partnership Templates", "Sponsorship Negotiation Guide"]'::jsonb,
    120,
    150,
    47,
    NOW(),
    NOW()
),
(
    'p11_lesson_48',
    'p11_module_10',
    48,
    'Entertainment Marketing Integration',
    'Integrate entertainment into your brand strategy. From movie partnerships to music collaborations, learn to create cultural moments. Master content integration and viral marketing through entertainment.',
    '["Identify entertainment partnership opportunities", "Create content integration strategy", "Design co-marketing campaigns", "Plan cultural moment activations", "Develop influencer collaboration framework", "Create viral content strategies"]'::jsonb,
    '["Entertainment Partnership Toolkit", "Content Integration Guide", "Co-marketing Templates", "Cultural Calendar Planner", "Influencer Collaboration Framework", "Viral Marketing Playbook"]'::jsonb,
    120,
    150,
    48,
    NOW(),
    NOW()
);

-- Module 11 Lessons (Days 49-51)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_49',
    'p11_module_11',
    49,
    'Investor Relations & Financial PR',
    'Master financial communications and investor relations. Learn to communicate financial performance, manage investor expectations, and build credibility with financial stakeholders through strategic PR.',
    '["Create investor communication framework", "Develop financial messaging guidelines", "Design investor update templates", "Plan earnings communication strategy", "Build analyst relations program", "Create crisis communication protocols"]'::jsonb,
    '["Investor Relations Handbook", "Financial Messaging Guide", "Investor Update Templates", "Earnings Call Playbook", "Analyst Relations Toolkit", "Financial Crisis Protocols"]'::jsonb,
    120,
    150,
    49,
    NOW(),
    NOW()
),
(
    'p11_lesson_50',
    'p11_module_11',
    50,
    'M&A Communications',
    'Navigate merger and acquisition communications. Master announcement strategies, stakeholder management, and integration communications. Learn to maintain brand value through transitions.',
    '["Create M&A communication plan", "Design stakeholder messaging matrix", "Develop integration roadmap", "Plan employee communication strategy", "Create customer retention messaging", "Build media strategy for announcements"]'::jsonb,
    '["M&A Communication Playbook", "Stakeholder Matrix Template", "Integration Communication Guide", "Employee FAQ Templates", "Customer Retention Scripts", "M&A Media Strategy Kit"]'::jsonb,
    120,
    150,
    50,
    NOW(),
    NOW()
),
(
    'p11_lesson_51',
    'p11_module_11',
    51,
    'IPO Readiness & Market Communications',
    'Prepare for IPO with comprehensive communication strategy. Build market credibility, manage regulatory requirements, and create sustainable public company communications infrastructure.',
    '["Assess IPO communication readiness", "Create pre-IPO PR strategy", "Design roadshow materials", "Build compliance framework", "Plan post-IPO communication rhythm", "Develop market positioning strategy"]'::jsonb,
    '["IPO Readiness Checklist", "Pre-IPO PR Timeline", "Roadshow Presentation Kit", "Compliance Guidelines", "Public Company Playbook", "Market Positioning Framework"]'::jsonb,
    120,
    180,
    51,
    NOW(),
    NOW()
);

-- Module 12 Lessons (Days 52-54)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES
(
    'p11_lesson_52',
    'p11_module_12',
    52,
    'Global Expansion PR Strategy',
    'Create PR strategy for international expansion. Master market entry communications, adapt messaging for global audiences, and build international media presence while maintaining brand consistency.',
    '["Research target market media landscape", "Create market entry PR plan", "Adapt brand messaging for new markets", "Build international media list", "Design launch campaign strategy", "Plan global coordination protocols"]'::jsonb,
    '["Market Entry PR Framework", "Global Messaging Adapter", "International Media Database", "Launch Campaign Templates", "Global Coordination Toolkit", "Cultural Adaptation Guide"]'::jsonb,
    120,
    150,
    52,
    NOW(),
    NOW()
),
(
    'p11_lesson_53',
    'p11_module_12',
    53,
    'Multi-Market Campaign Orchestration',
    'Orchestrate synchronized PR campaigns across multiple markets. Master timing, localization, and measurement while maintaining central brand control and local market relevance.',
    '["Design multi-market campaign architecture", "Create localization framework", "Build central approval process", "Plan synchronized launch strategy", "Design measurement dashboard", "Create best practice sharing system"]'::jsonb,
    '["Campaign Architecture Blueprint", "Localization Framework", "Approval Process Designer", "Launch Synchronization Tools", "Global Metrics Dashboard", "Best Practice Repository"]'::jsonb,
    120,
    150,
    53,
    NOW(),
    NOW()
),
(
    'p11_lesson_54',
    'p11_module_12',
    54,
    'International Awards & Recognition',
    'Win international awards and recognition. Navigate global award landscape, create winning international submissions, and leverage international recognition for global brand building.',
    '["Research international award opportunities", "Create award strategy for global recognition", "Adapt submissions for international jury", "Plan multi-market leverage strategy", "Build international credibility portfolio", "Design global PR amplification plan"]'::jsonb,
    '["International Award Directory", "Global Submission Templates", "Cross-Cultural Jury Guide", "Multi-Market Leverage Playbook", "Credibility Portfolio Builder", "Global Amplification Toolkit"]'::jsonb,
    120,
    180,
    54,
    NOW(),
    NOW()
);

-- Update Product XP calculation (total XP from all lessons)
UPDATE "Product" 
SET description = 'Transform your startup into a recognized industry leader through powerful brand building and strategic PR. Master brand strategy, visual identity, customer experience, media relations, award winning, and personal branding. Includes 300+ templates, media training, crisis management protocols, and comprehensive PR toolkit. Total XP: 7,650 points across 54 lessons.'
WHERE code = 'P11';