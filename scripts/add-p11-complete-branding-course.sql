-- P11: Branding & Public Relations Mastery - Complete Course Creation
-- This script creates a comprehensive 54-lesson brand building and PR mastery course with 12 modules

-- Insert the P11 product (premium pricing for comprehensive branding and PR mastery)
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt") 
VALUES (
  'p11_branding_pr',
  'P11',
  'Branding & Public Relations Mastery',
  'Transform into a recognized industry leader through powerful brand building and strategic PR. 54-day intensive course with 300+ templates, media training, award strategies, and crisis management.',
  7999,
  false,
  54,
  NOW(),
  NOW()
);

-- Module 1: Foundations of Brand Building (Days 1-5)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m1_foundations',
  'p11_branding_pr',
  'Foundations of Brand Building',
  'Master the fundamentals of brand strategy, positioning, and identity creation for competitive advantage',
  1,
  NOW(),
  NOW()
);

-- Module 1 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l1_brand_fundamentals',
  'p11_m1_foundations',
  1,
  'Understanding Brand vs Branding vs Marketing',
  'Master the critical distinctions between brand (perception), branding (deliberate actions), marketing (tactics), and PR (reputation management). Learn why branding precedes marketing and creates the ₹1000 Cr valuation difference through brand equity as business asset.',
  '["Define your brand ecosystem across 8 dimensions", "Audit current brand perception gaps", "Create brand vs marketing strategy split", "Document brand equity measurement system"]',
  '["Brand Ecosystem Framework", "Brand Audit Template", "Strategy Split Worksheet", "Brand Equity Calculator"]',
  120,
  150,
  1,
  NOW(),
  NOW()
),
(
  'p11_l2_brand_strategy',
  'p11_m1_foundations',
  2,
  'Brand Strategy Framework Development',
  'Build comprehensive brand positioning through target audience psychographics, competitive differentiation, value proposition clarity, brand promise definition, and positioning statement creation. Master category definition and mind space ownership.',
  '["Complete target audience psychographic profiles", "Map competitive differentiation matrix", "Craft compelling value proposition", "Write brand positioning statement"]',
  '["Audience Psychographic Template", "Competitive Analysis Framework", "Value Proposition Canvas", "Positioning Statement Generator"]',
  120,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p11_l3_brand_personality',
  'p11_m1_foundations',
  3,
  'Brand Personality & Voice Development',
  'Develop distinctive brand personality across five dimensions (Sincere, Exciting, Competent, Sophisticated, Rugged) with Indian context adaptations. Create consistent voice guidelines with tone variations, language choices, and communication standards.',
  '["Define brand personality dimensions", "Create voice and tone guidelines", "Develop communication do''s and don''ts", "Test personality consistency across channels"]',
  '["Brand Personality Assessment", "Voice & Tone Guide Template", "Communication Guidelines", "Consistency Checklist"]',
  120,
  150,
  3,
  NOW(),
  NOW()
),
(
  'p11_l4_visual_identity',
  'p11_m1_foundations',
  4,
  'Visual Identity System Creation',
  'Design comprehensive visual identity including logo principles, color psychology for India, typography selection, icon systems, photography style, illustration approach, pattern library, and space/layout guidelines.',
  '["Create logo design brief and concepts", "Develop color palette with cultural relevance", "Select typography hierarchy", "Build visual asset library"]',
  '["Logo Design Brief Template", "Indian Color Psychology Guide", "Typography Selection Framework", "Visual Asset Library"]',
  120,
  150,
  4,
  NOW(),
  NOW()
),
(
  'p11_l5_brand_guidelines',
  'p11_m1_foundations',
  5,
  'Brand Guidelines Creation & Implementation',
  'Create comprehensive brand guidelines documentation covering brand story, mission/vision/values, logo usage rules, color specifications, typography hierarchy, voice guide, photography guidelines, and implementation tools.',
  '["Write comprehensive brand story", "Document all visual and verbal guidelines", "Create template libraries", "Set up approval processes"]',
  '["Brand Guidelines Template", "Asset Management System", "Template Library", "Approval Workflow"]',
  120,
  150,
  5,
  NOW(),
  NOW()
);

-- Module 2: Customer Experience Branding (Days 6-10)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m2_customer_experience',
  'p11_branding_pr',
  'Customer Experience Branding',
  'Design every customer touchpoint to reinforce brand identity and create memorable experiences',
  2,
  NOW(),
  NOW()
);

-- Module 2 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l6_packaging_design',
  'p11_m2_customer_experience',
  6,
  'Packaging as Brand Ambassador',
  'Master package design strategy for shelf impact, unboxing experience design, sustainability messaging, premium vs mass positioning, cultural considerations, and seasonal variations. Include technical considerations for material selection and e-commerce adaptation.',
  '["Design packaging that embodies brand values", "Create unboxing experience journey", "Plan sustainability messaging strategy", "Optimize for e-commerce requirements"]',
  '["Packaging Design Framework", "Unboxing Experience Template", "Sustainability Messaging Guide", "E-commerce Optimization Checklist"]',
  100,
  120,
  6,
  NOW(),
  NOW()
),
(
  'p11_l7_space_design',
  'p11_m2_customer_experience',
  7,
  'Retail and Space Design Excellence',
  'Create immersive physical space branding through store design principles, customer journey mapping, sensory branding (5 senses), lighting strategies, music/ambiance, scent marketing, and Instagram-worthy experiences.',
  '["Map customer journey through physical spaces", "Design sensory branding strategy", "Create lighting and ambiance plan", "Develop Instagram-worthy moments"]',
  '["Space Design Framework", "Customer Journey Mapping", "Sensory Branding Checklist", "Photo-Worthy Moments Guide"]',
  100,
  120,
  7,
  NOW(),
  NOW()
),
(
  'p11_l8_digital_touchpoints',
  'p11_m2_customer_experience',
  8,
  'Digital Touchpoint Excellence',
  'Optimize website branding through homepage storytelling, navigation philosophy, interactive elements, loading experiences, and app experience including onboarding design, notification personality, and gamification elements.',
  '["Audit all digital touchpoints for brand consistency", "Redesign homepage storytelling", "Optimize app onboarding experience", "Create micro-interaction guidelines"]',
  '["Digital Touchpoint Audit", "Homepage Storytelling Framework", "App Onboarding Template", "Micro-interaction Library"]',
  100,
  120,
  8,
  NOW(),
  NOW()
),
(
  'p11_l9_customer_service',
  'p11_m2_customer_experience',
  9,
  'Customer Service as Brand Expression',
  'Design service experience through response time standards, channel consistency, escalation personality, problem resolution style, proactive communication, and surprise/delight moments with comprehensive communication templates.',
  '["Set service standards aligned with brand", "Create escalation protocols", "Design surprise and delight moments", "Build communication template library"]',
  '["Service Standards Framework", "Escalation Protocol Template", "Surprise & Delight Ideas", "Communication Template Library"]',
  100,
  120,
  9,
  NOW(),
  NOW()
),
(
  'p11_l10_community_building',
  'p11_m2_customer_experience',
  10,
  'Brand Community Building & Engagement',
  'Build brand communities through user groups, ambassador programs, exclusive experiences, co-creation opportunities, feedback loops, referral programs, and offline meetups with comprehensive engagement strategies.',
  '["Launch brand ambassador program", "Create exclusive community experiences", "Design co-creation opportunities", "Plan offline community meetups"]',
  '["Ambassador Program Template", "Community Experience Playbook", "Co-creation Framework", "Meetup Planning Guide"]',
  100,
  120,
  10,
  NOW(),
  NOW()
);

-- Module 3: Team Culture as Brand (Days 11-15)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m3_team_culture',
  'p11_branding_pr',
  'Team Culture as Brand',
  'Build internal brand culture and transform employees into authentic brand ambassadors',
  3,
  NOW(),
  NOW()
);

-- Module 3 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l11_internal_branding',
  'p11_m3_team_culture',
  11,
  'Internal Brand Building Systems',
  'Define and activate core values through behavior standards, decision frameworks, communication norms, meeting culture, work philosophies, innovation approach, and failure handling with comprehensive culture documentation.',
  '["Activate core values in daily operations", "Create behavior standards documentation", "Design decision-making frameworks", "Build culture measurement systems"]',
  '["Values Activation Toolkit", "Behavior Standards Guide", "Decision Framework Template", "Culture Measurement Dashboard"]',
  110,
  140,
  11,
  NOW(),
  NOW()
),
(
  'p11_l12_employer_branding',
  'p11_m3_team_culture',
  12,
  'Employer Branding Excellence',
  'Build compelling employer brand through EVP (Employee Value Proposition), career site design, enhanced interview experience, and external positioning via LinkedIn, Glassdoor management, and thought leadership.',
  '["Develop compelling EVP", "Redesign career site and job descriptions", "Enhance interview experience", "Optimize Glassdoor and LinkedIn presence"]',
  '["EVP Development Framework", "Career Site Template", "Interview Experience Guide", "External Presence Optimization"]',
  110,
  140,
  12,
  NOW(),
  NOW()
),
(
  'p11_l13_brand_ambassadors',
  'p11_m3_team_culture',
  13,
  'Team as Brand Ambassadors',
  'Transform employees into brand ambassadors through social media guidelines, LinkedIn optimization, content sharing, personal branding support, speaking opportunities, media training, and recognition programs.',
  '["Create employee social media guidelines", "Optimize team LinkedIn profiles", "Launch internal content sharing program", "Design recognition and reward system"]',
  '["Social Media Guidelines", "LinkedIn Optimization Template", "Content Sharing Framework", "Recognition Program Design"]',
  110,
  140,
  13,
  NOW(),
  NOW()
),
(
  'p11_l14_leadership_branding',
  'p11_m3_team_culture',
  14,
  'Leadership Branding Strategy',
  'Position founders and executives through personal brand strategy, expertise definition, speaking topics, media bio, photography sessions, signature stories, thought leadership, and industry positioning.',
  '["Develop founder personal brand strategy", "Create executive media bios", "Plan professional photography sessions", "Build thought leadership content calendar"]',
  '["Personal Brand Strategy Template", "Media Bio Framework", "Photography Planning Guide", "Thought Leadership Calendar"]',
  110,
  140,
  14,
  NOW(),
  NOW()
),
(
  'p11_l15_culture_marketing',
  'p11_m3_team_culture',
  15,
  'Culture Marketing & Communication',
  'Showcase culture through internal communications (town halls, newsletters, celebrations) and external showcasing (culture videos, office tours, day-in-life content, team stories, CSR activities).',
  '["Plan internal communication calendar", "Create culture showcase content", "Document team stories and achievements", "Design CSR communication strategy"]',
  '["Internal Communication Calendar", "Culture Content Templates", "Team Story Framework", "CSR Communication Guide"]',
  110,
  140,
  15,
  NOW(),
  NOW()
);

-- Module 4: Public Relations Fundamentals (Days 16-20)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m4_pr_fundamentals',
  'p11_branding_pr',
  'Public Relations Fundamentals',
  'Master strategic PR planning, media relations, and systematic campaign execution',
  4,
  NOW(),
  NOW()
);

-- Module 4 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l16_pr_strategy',
  'p11_m4_pr_fundamentals',
  16,
  'PR Strategy Development & Planning',
  'Develop comprehensive PR strategy with clear objectives (awareness, credibility, category creation, thought leadership, crisis preparation) and stakeholder mapping across media, influencers, government, investors, customers, employees, partners, and community.',
  '["Set clear PR objectives and KPIs", "Map all key stakeholders", "Create stakeholder engagement plan", "Design PR campaign calendar"]',
  '["PR Strategy Template", "Stakeholder Mapping Framework", "Engagement Planning Tool", "PR Campaign Calendar"]',
  120,
  160,
  16,
  NOW(),
  NOW()
),
(
  'p11_l17_media_landscape',
  'p11_m4_pr_fundamentals',
  17,
  'Indian Media Landscape Mastery',
  'Navigate Indian media ecosystem including national publications, regional newspapers, trade magazines, online publications, TV channels, radio, podcasts, YouTube. Build journalist relationships through beat understanding, pitch preferences, and long-term nurturing.',
  '["Map relevant media outlets and journalists", "Build journalist relationship database", "Create media pitch templates", "Establish regular touchpoint schedule"]',
  '["Media Landscape Map", "Journalist Database Template", "Pitch Template Library", "Relationship Management System"]',
  120,
  160,
  17,
  NOW(),
  NOW()
),
(
  'p11_l18_story_development',
  'p11_m4_pr_fundamentals',
  18,
  'Strategic Story Development',
  'Create compelling news stories using newsworthy angles (funding, launches, milestones, industry firsts, research, partnerships, expansion, social impact) and master story frameworks (problem-solution, David vs Goliath, innovation breakthrough, social impact, founder journey).',
  '["Develop newsworthy story angles inventory", "Create compelling story narratives", "Build founder story framework", "Plan story calendar for year"]',
  '["Story Angles Inventory", "Story Framework Templates", "Founder Story Guide", "Annual Story Calendar"]',
  120,
  160,
  18,
  NOW(),
  NOW()
),
(
  'p11_l19_press_release',
  'p11_m4_pr_fundamentals',
  19,
  'Press Release Mastery & Distribution',
  'Master press release structure (headline crafting, lead paragraph, quote selection, boilerplate writing) and distribution through PR Newswire, BusinessWire India, direct journalist contact, media databases, WhatsApp groups, and social media.',
  '["Write compelling press releases", "Create distribution contact list", "Set up distribution channels", "Plan follow-up strategy"]',
  '["Press Release Templates", "Distribution Channel Guide", "Contact List Template", "Follow-up Sequence"]',
  120,
  160,
  19,
  NOW(),
  NOW()
),
(
  'p11_l20_media_training',
  'p11_m4_pr_fundamentals',
  20,
  'Media Training & Crisis Communication',
  'Master interview preparation through key message development, bridging techniques, difficult questions handling, body language, virtual interviews, TV/radio techniques. Build crisis communication protocols with response procedures and recovery strategies.',
  '["Complete media training exercises", "Develop key messages and bridges", "Create crisis communication plan", "Practice interview scenarios"]',
  '["Media Training Workbook", "Key Messages Template", "Crisis Communication Plan", "Interview Practice Scenarios"]',
  120,
  160,
  20,
  NOW(),
  NOW()
);

-- Module 5: Award Winning Strategies (Days 21-25)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m5_award_strategies',
  'p11_branding_pr',
  'Award Winning Strategies',
  'Navigate award programs systematically to build industry recognition and credibility',
  5,
  NOW(),
  NOW()
);

-- Module 5 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l21_award_mapping',
  'p11_m5_award_strategies',
  21,
  'Award Landscape Mapping & Selection',
  'Map award categories (industry, startup, innovation, leadership, design, marketing, CSR, regional) and major programs (ET Awards, Business Today, CNBC, industry associations, government recognition, international awards, startup competitions).',
  '["Map relevant award opportunities", "Research eligibility requirements", "Create award application calendar", "Set award strategy budget"]',
  '["Award Landscape Map", "Eligibility Tracker", "Award Calendar Template", "Budget Planning Tool"]',
  100,
  130,
  21,
  NOW(),
  NOW()
),
(
  'p11_l22_application_excellence',
  'p11_m5_award_strategies',
  22,
  'Award Application Excellence',
  'Master winning applications through strategic research, eligibility analysis, category selection, timeline planning, and creating compelling applications with executive summaries, achievement highlights, metric presentation, visual design, and supporting documents.',
  '["Research target awards thoroughly", "Prepare winning application materials", "Create supporting documentation", "Design visual presentation"]',
  '["Application Research Template", "Winning Application Framework", "Achievement Highlight Guide", "Visual Presentation Templates"]',
  100,
  130,
  22,
  NOW(),
  NOW()
),
(
  'p11_l23_award_campaigns',
  'p11_m5_award_strategies',
  23,
  'Award Campaign Management',
  'Manage award campaigns through pre-award phase (nomination, jury research, presentation prep) and post-award leverage (winner announcements, media outreach, social campaigns, website updates, sales materials, recruitment usage).',
  '["Plan pre-award campaign strategy", "Prepare presentation materials", "Create post-award leverage plan", "Design winner announcement campaign"]',
  '["Pre-Award Campaign Template", "Presentation Planning Guide", "Post-Award Leverage Framework", "Winner Announcement Kit"]',
  100,
  130,
  23,
  NOW(),
  NOW()
),
(
  'p11_l24_speaking_opportunities',
  'p11_m5_award_strategies',
  24,
  'Speaking Opportunities & Excellence',
  'Secure and excel at speaking opportunities through conference strategy, application process, topic development, abstract writing, presentation design, demo preparation, networking plans, and speaking excellence techniques.',
  '["Identify target speaking opportunities", "Develop signature speaking topics", "Create compelling presentation materials", "Plan networking strategy"]',
  '["Speaking Opportunities Database", "Topic Development Framework", "Presentation Design Templates", "Networking Plan Template"]',
  100,
  130,
  24,
  NOW(),
  NOW()
),
(
  'p11_l25_industry_recognition',
  'p11_m5_award_strategies',
  25,
  'Industry Recognition & Thought Leadership',
  'Build industry recognition through thought leadership positioning, expertise areas, content strategy, research publication, white papers, industry reports, trend predictions, media commentary, and association leadership.',
  '["Position expertise areas", "Create thought leadership content calendar", "Plan research and white papers", "Secure association leadership roles"]',
  '["Expertise Positioning Framework", "Thought Leadership Calendar", "Research Planning Template", "Association Leadership Guide"]',
  100,
  130,
  25,
  NOW(),
  NOW()
);

-- Module 6: Content & Digital PR (Days 26-30)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m6_digital_pr',
  'p11_branding_pr',
  'Content & Digital PR',
  'Leverage digital platforms and content strategies for maximum PR impact and reach',
  6,
  NOW(),
  NOW()
);

-- Module 6 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l26_content_strategy',
  'p11_m6_digital_pr',
  26,
  'Content Strategy for PR Success',
  'Develop content strategy for PR including content types (founder letters, industry insights, research reports, case studies, success stories, behind-scenes, team features) and distribution strategy across company blog, Medium, LinkedIn, guest posts, syndication.',
  '["Create content strategy for PR goals", "Plan content calendar", "Develop content templates", "Set up distribution channels"]',
  '["PR Content Strategy Framework", "Content Calendar Template", "Content Type Templates", "Distribution Channel Guide"]',
  110,
  150,
  26,
  NOW(),
  NOW()
),
(
  'p11_l27_digital_tactics',
  'p11_m6_digital_pr',
  27,
  'Digital PR Tactics & SEO Integration',
  'Master online visibility through HARO participation, journalist queries, expert positioning, quote provision, data sharing, trend commentary, news jacking, viral moments, and SEO integration with keyword research, link building, brand mentions.',
  '["Set up HARO and journalist query alerts", "Create expert positioning strategy", "Plan SEO-integrated PR content", "Build brand mention monitoring"]',
  '["HARO Setup Guide", "Expert Positioning Framework", "SEO-PR Integration Checklist", "Brand Monitoring Tools"]',
  110,
  150,
  27,
  NOW(),
  NOW()
),
(
  'p11_l28_social_media_pr',
  'p11_m6_digital_pr',
  28,
  'Social Media PR & Influencer Relations',
  'Leverage platform strategies (LinkedIn thought leadership, Twitter conversations, Instagram storytelling, YouTube documentation, podcast appearances) and influencer relations including identification, collaboration frameworks, content partnerships, and measurement.',
  '["Create platform-specific PR strategies", "Identify and engage key influencers", "Plan content partnerships", "Set up measurement systems"]',
  '["Social Media PR Templates", "Influencer Database", "Partnership Framework", "PR Measurement Dashboard"]',
  110,
  150,
  28,
  NOW(),
  NOW()
),
(
  'p11_l29_crisis_management',
  'p11_m6_digital_pr',
  29,
  'Crisis Management & Recovery',
  'Build crisis preparedness through risk assessment, response team formation, communication protocols, approval processes, media statements, social monitoring, legal coordination, and recovery planning for various crisis types.',
  '["Conduct crisis risk assessment", "Form crisis response team", "Create communication protocols", "Develop recovery strategies"]',
  '["Crisis Risk Assessment", "Response Team Structure", "Communication Protocol", "Recovery Planning Framework"]',
  110,
  150,
  29,
  NOW(),
  NOW()
),
(
  'p11_l30_measurement_analytics',
  'p11_m6_digital_pr',
  30,
  'PR Measurement & Analytics',
  'Implement PR measurement through media mentions, share of voice, sentiment analysis, reach metrics, website traffic, lead generation, brand lift studies, sales impact, and comprehensive reporting frameworks.',
  '["Set up PR measurement systems", "Create reporting dashboards", "Establish KPIs and benchmarks", "Plan regular analysis and optimization"]',
  '["PR Measurement Framework", "Analytics Dashboard Template", "KPI Tracking System", "Reporting Templates"]',
  110,
  150,
  30,
  NOW(),
  NOW()
);

-- Module 7: Agency Relationships (Days 31-35)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m7_agency_relationships',
  'p11_branding_pr',
  'Agency Relationships',
  'Master agency selection, management, and maximize ROI from PR investments',
  7,
  NOW(),
  NOW()
);

-- Module 7 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l31_agency_selection',
  'p11_m7_agency_relationships',
  31,
  'Agency Selection Process & Evaluation',
  'Master agency selection through understanding agency types (full-service, digital PR, crisis management, financial communications, B2B specialists) and evaluation criteria including industry expertise, media relationships, team composition, creative capabilities.',
  '["Define agency requirements", "Research and shortlist agencies", "Create evaluation criteria", "Conduct agency pitches and selection"]',
  '["Agency Requirements Template", "Agency Evaluation Framework", "Pitch Evaluation Scorecard", "Selection Decision Matrix"]',
  100,
  130,
  31,
  NOW(),
  NOW()
),
(
  'p11_l32_agency_management',
  'p11_m7_agency_relationships',
  32,
  'Agency Briefing & Management Excellence',
  'Excel at agency management through briefing excellence (background, objectives, target audiences, key messages, budget parameters) and working relationships including communication protocols, meeting rhythms, reporting formats, performance reviews.',
  '["Create comprehensive agency briefs", "Establish working protocols", "Set up regular review processes", "Design performance measurement"]',
  '["Agency Brief Template", "Working Protocol Framework", "Review Process Guide", "Performance Measurement System"]',
  100,
  130,
  32,
  NOW(),
  NOW()
),
(
  'p11_l33_pr_pricing',
  'p11_m7_agency_relationships',
  33,
  'PR Packages, Pricing & Negotiations',
  'Navigate PR pricing through retainer models (₹50K-₹5L monthly retainers, project fees, performance bonuses), service components (media relations, content creation, event management, crisis support) and contract negotiations.',
  '["Understand PR pricing models", "Negotiate service packages", "Set clear scope and deliverables", "Establish success metrics"]',
  '["PR Pricing Guide", "Package Comparison Template", "Contract Negotiation Framework", "Success Metrics Template"]',
  100,
  130,
  33,
  NOW(),
  NOW()
),
(
  'p11_l34_inhouse_vs_agency',
  'p11_m7_agency_relationships',
  34,
  'In-house vs Agency Strategy',
  'Optimize PR resources through understanding in-house benefits (deep brand knowledge, quick responses, cost efficiency, direct control) vs agency advantages (media relationships, expertise breadth, scalability, objectivity, creative resources).',
  '["Assess in-house capabilities", "Evaluate agency needs", "Create hybrid model strategy", "Optimize resource allocation"]',
  '["Capability Assessment Tool", "Resource Optimization Framework", "Hybrid Model Template", "Cost-Benefit Analysis"]',
  100,
  130,
  34,
  NOW(),
  NOW()
),
(
  'p11_l35_integrated_communications',
  'p11_m7_agency_relationships',
  35,
  'Integrated Communications Management',
  'Create integrated communications through alignment with marketing, sales enablement, HR coordination, investor relations, customer success, product teams, legal review, and leadership involvement with campaign orchestration.',
  '["Map integration touchpoints", "Create coordination protocols", "Design campaign orchestration", "Establish measurement integration"]',
  '["Integration Mapping Template", "Coordination Protocol", "Campaign Orchestration Framework", "Integrated Measurement System"]',
  100,
  130,
  35,
  NOW(),
  NOW()
);

-- Module 8: Regional & Cultural PR (Days 36-40)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m8_regional_pr',
  'p11_branding_pr',
  'Regional & Cultural PR',
  'Navigate India''s diverse markets with culturally sensitive PR strategies',
  8,
  NOW(),
  NOW()
);

-- Module 8 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l36_regional_media',
  'p11_m8_regional_pr',
  36,
  'Regional Media Strategy & Language Adaptation',
  'Navigate regional media through language considerations (Hindi media, regional language press, translation quality, cultural adaptation), regional priorities (metro focus, tier 2/3 cities, rural outreach, state variations), and local influence networks.',
  '["Map regional media landscape", "Create language adaptation strategy", "Build regional contact database", "Plan tier-wise outreach"]',
  '["Regional Media Map", "Language Adaptation Guide", "Regional Contact Database", "Tier-wise Strategy Framework"]',
  110,
  140,
  36,
  NOW(),
  NOW()
),
(
  'p11_l37_cultural_sensitivity',
  'p11_m8_regional_pr',
  37,
  'Cultural Sensitivity & Communication Adaptation',
  'Master Indian cultural context including festival calendars, religious considerations, social hierarchies, gender dynamics, age respect, family values, community focus, and communication adaptations for visual representations, color symbolism, number significance.',
  '["Create cultural sensitivity guidelines", "Plan festival-aligned campaigns", "Adapt visual and verbal communication", "Design community-focused messaging"]',
  '["Cultural Sensitivity Guide", "Festival Calendar Planning", "Communication Adaptation Framework", "Community Messaging Templates"]',
  110,
  140,
  37,
  NOW(),
  NOW()
),
(
  'p11_l38_government_relations',
  'p11_m8_regional_pr',
  38,
  'Government Relations & Policy Engagement',
  'Engage government stakeholders including policy makers, bureaucrats, regulators, local authorities, industry bodies, think tanks through position papers, industry representations, event participation, CSR alignment, employment showcasing.',
  '["Map government stakeholders", "Create policy engagement strategy", "Develop position papers", "Plan CSR communication"]',
  '["Government Stakeholder Map", "Policy Engagement Framework", "Position Paper Templates", "CSR Communication Strategy"]',
  110,
  140,
  38,
  NOW(),
  NOW()
),
(
  'p11_l39_csr_communication',
  'p11_m8_regional_pr',
  39,
  'CSR Communication & Social Impact',
  'Develop CSR communication strategy through cause selection, partner identification, program design, employee involvement, impact measurement, story development, and communication across annual reports, sustainability reports, media features.',
  '["Select aligned CSR causes", "Design impactful programs", "Measure and document impact", "Create compelling CSR stories"]',
  '["CSR Strategy Framework", "Impact Measurement Tools", "Story Development Templates", "CSR Communication Calendar"]',
  110,
  140,
  39,
  NOW(),
  NOW()
),
(
  'p11_l40_international_pr',
  'p11_m8_regional_pr',
  40,
  'International PR & Global Expansion',
  'Plan international PR for global expansion including market entry PR, cross-border messaging, cultural translations, time zone management, global media relations, international awards, trade missions, and diplomatic relations.',
  '["Plan international PR strategy", "Adapt messaging for global markets", "Build international media contacts", "Coordinate multi-market campaigns"]',
  '["International PR Strategy", "Global Messaging Framework", "International Media Database", "Multi-Market Campaign Template"]',
  110,
  140,
  40,
  NOW(),
  NOW()
);

-- Module 9: Personal Branding for Founders (Days 41-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m9_founder_branding',
  'p11_branding_pr',
  'Personal Branding for Founders',
  'Build powerful founder brand and establish thought leadership in your industry',
  9,
  NOW(),
  NOW()
);

-- Module 9 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l41_founder_brand',
  'p11_m9_founder_branding',
  41,
  'Founder as Brand Strategy',
  'Develop founder personal brand strategy through expertise definition, personality showcase, value alignment, authenticity balance, professional vs personal boundaries, platform selection, content themes, and visual identity consistency.',
  '["Define founder expertise areas", "Create personal brand strategy", "Plan content themes", "Design visual identity system"]',
  '["Founder Brand Strategy Template", "Expertise Definition Framework", "Content Theme Planner", "Visual Identity Guidelines"]',
  120,
  160,
  41,
  NOW(),
  NOW()
),
(
  'p11_l42_linkedin_mastery',
  'p11_m9_founder_branding',
  42,
  'LinkedIn Mastery & Professional Presence',
  'Master LinkedIn through profile optimization (headline crafting, summary writing, experience descriptions), content strategy (post types, frequency planning, engagement tactics, video content, article writing, newsletter creation, event hosting).',
  '["Optimize LinkedIn profile completely", "Create LinkedIn content calendar", "Launch LinkedIn newsletter", "Plan networking strategy"]',
  '["LinkedIn Optimization Template", "Content Calendar Framework", "Newsletter Templates", "Networking Strategy Guide"]',
  120,
  160,
  42,
  NOW(),
  NOW()
),
(
  'p11_l43_media_personality',
  'p11_m9_founder_branding',
  43,
  'Media Personality Development',
  'Build media personality through media readiness (bio variations, headshot library, key messages, signature stories) and platform presence across Twitter, Instagram, YouTube, podcast guesting, blog writing, newsletter authoring, speaking circuit.',
  '["Create comprehensive media kit", "Develop signature stories", "Plan multi-platform presence", "Secure speaking opportunities"]',
  '["Media Kit Template", "Signature Story Framework", "Platform Strategy Guide", "Speaking Opportunity Tracker"]',
  120,
  160,
  43,
  NOW(),
  NOW()
),
(
  'p11_l44_thought_leadership',
  'p11_m9_founder_branding',
  44,
  'Thought Leadership & Content Creation',
  'Establish thought leadership through content creation (opinion pieces, industry analysis, trend predictions, research insights, book writing, course creation) and distribution strategy across publications, syndication, social amplification, email campaigns.',
  '["Create thought leadership content plan", "Write opinion pieces", "Plan book or course creation", "Build distribution network"]',
  '["Thought Leadership Strategy", "Content Creation Templates", "Publication Target List", "Distribution Plan"]',
  120,
  160,
  44,
  NOW(),
  NOW()
),
(
  'p11_l45_executive_coaching',
  'p11_m9_founder_branding',
  45,
  'Executive Coaching & Leadership Presence',
  'Develop executive presence through communication skills (public speaking, media training, presentation skills, storytelling mastery) and leadership presence (executive presence, board communication, investor pitching, team inspiration, crisis leadership).',
  '["Complete executive presence assessment", "Improve public speaking skills", "Master investor pitching", "Develop crisis leadership protocols"]',
  '["Executive Presence Assessment", "Public Speaking Framework", "Investor Pitch Templates", "Crisis Leadership Guide"]',
  120,
  160,
  45,
  NOW(),
  NOW()
);

-- Module 10: Entertainment & Sports PR (Days 46-48)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m10_entertainment_pr',
  'p11_branding_pr',
  'Entertainment & Sports PR',
  'Leverage celebrity partnerships and sports marketing for brand amplification',
  10,
  NOW(),
  NOW()
);

-- Module 10 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l46_celebrity_partnerships',
  'p11_m10_entertainment_pr',
  46,
  'Celebrity Partnerships & Endorsement Strategies',
  'Master celebrity partnerships through strategic selection, endorsement deals, brand alignment assessment, campaign development, content creation, event activations, social media integration, and ROI measurement for maximum brand impact.',
  '["Research celebrity alignment opportunities", "Develop partnership strategy", "Create endorsement campaign concepts", "Plan activation events"]',
  '["Celebrity Partnership Framework", "Endorsement Strategy Template", "Campaign Development Guide", "Activation Planning Tool"]',
  90,
  180,
  46,
  NOW(),
  NOW()
),
(
  'p11_l47_sports_marketing',
  'p11_m10_entertainment_pr',
  47,
  'Sports Sponsorship & Marketing Excellence',
  'Leverage sports marketing through sponsorship selection, team/event partnerships, fan engagement strategies, stadium branding, digital activations, athlete endorsements, fantasy sports integration, and tournament marketing.',
  '["Identify sports sponsorship opportunities", "Create fan engagement strategies", "Plan digital sports activations", "Develop athlete partnership programs"]',
  '["Sports Sponsorship Guide", "Fan Engagement Framework", "Digital Activation Templates", "Athlete Partnership Strategy"]',
  90,
  180,
  47,
  NOW(),
  NOW()
),
(
  'p11_l48_entertainment_integration',
  'p11_m10_entertainment_pr',
  48,
  'Entertainment Marketing Integration',
  'Integrate entertainment marketing through movie partnerships, music collaborations, web series placements, OTT platform integrations, cultural event sponsorships, festival marketing, and content entertainment strategies.',
  '["Explore entertainment partnership opportunities", "Create cultural event strategies", "Plan content entertainment integration", "Develop festival marketing campaigns"]',
  '["Entertainment Partnership Guide", "Cultural Event Strategy", "Content Integration Framework", "Festival Marketing Templates"]',
  90,
  180,
  48,
  NOW(),
  NOW()
);

-- Module 11: Financial Communications (Days 49-51)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m11_financial_comms',
  'p11_branding_pr',
  'Financial Communications',
  'Master investor relations, M&A communications, and IPO readiness',
  11,
  NOW(),
  NOW()
);

-- Module 11 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l49_investor_relations',
  'p11_m11_financial_comms',
  49,
  'Investor Relations & Financial PR Excellence',
  'Master investor relations through stakeholder mapping, earnings communication, analyst relations, shareholder communication, financial storytelling, transparency protocols, regulatory compliance, and crisis financial communication.',
  '["Map investor stakeholders", "Create earnings communication strategy", "Build analyst relations program", "Develop financial transparency protocols"]',
  '["Investor Relations Framework", "Earnings Communication Templates", "Analyst Relations Guide", "Financial Transparency Protocol"]',
  100,
  180,
  49,
  NOW(),
  NOW()
),
(
  'p11_l50_ma_communications',
  'p11_m11_financial_comms',
  50,
  'M&A Communications & Deal Announcements',
  'Navigate M&A communications including deal announcement strategies, stakeholder messaging, regulatory compliance, media management, employee communication, customer retention messaging, and integration communication planning.',
  '["Plan M&A announcement strategy", "Create stakeholder messaging", "Develop integration communication plan", "Prepare crisis management protocols"]',
  '["M&A Communication Strategy", "Stakeholder Messaging Framework", "Integration Communication Plan", "Deal Crisis Management Protocol"]',
  100,
  180,
  50,
  NOW(),
  NOW()
),
(
  'p11_l51_ipo_readiness',
  'p11_m11_financial_comms',
  51,
  'IPO Readiness & Public Market Communications',
  'Prepare for IPO through public market readiness assessment, roadshow planning, analyst engagement, media strategy for going public, regulatory compliance communication, post-IPO communication planning, and ongoing public company obligations.',
  '["Assess IPO communication readiness", "Plan roadshow strategy", "Create public market media strategy", "Develop ongoing communication protocols"]',
  '["IPO Readiness Assessment", "Roadshow Planning Guide", "Public Market Media Strategy", "Public Company Communication Framework"]',
  100,
  180,
  51,
  NOW(),
  NOW()
);

-- Module 12: Global PR Strategies (Days 52-54)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_m12_global_pr',
  'p11_branding_pr',
  'Global PR Strategies',
  'Scale PR efforts internationally with multi-market campaign orchestration',
  12,
  NOW(),
  NOW()
);

-- Module 12 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_l52_global_expansion',
  'p11_m12_global_pr',
  52,
  'Global Expansion PR Strategy',
  'Plan global PR expansion through market entry communication, cultural adaptation, local media relations, regulatory compliance communication, partnership announcements, and global brand consistency while maintaining local relevance.',
  '["Create global expansion PR plan", "Adapt messaging for target markets", "Build local media relationships", "Plan market entry campaigns"]',
  '["Global Expansion PR Template", "Cultural Adaptation Framework", "Local Media Strategy", "Market Entry Campaign Guide"]',
  110,
  180,
  52,
  NOW(),
  NOW()
),
(
  'p11_l53_multi_market_campaigns',
  'p11_m12_global_pr',
  53,
  'Multi-Market Campaign Orchestration',
  'Orchestrate multi-market campaigns through centralized strategy with local execution, time zone coordination, cross-cultural messaging, global media coordination, shared content libraries, and performance measurement across markets.',
  '["Design multi-market campaign framework", "Create coordination protocols", "Build shared content systems", "Establish global measurement standards"]',
  '["Multi-Market Campaign Framework", "Global Coordination Protocol", "Shared Content System", "Global Measurement Dashboard"]',
  110,
  180,
  53,
  NOW(),
  NOW()
),
(
  'p11_l54_international_recognition',
  'p11_m12_global_pr',
  54,
  'International Awards & Global Recognition',
  'Achieve global recognition through international award strategies, global media placement, cross-border thought leadership, international speaking opportunities, global partnership announcements, and worldwide brand building initiatives.',
  '["Target international award opportunities", "Build global media relationships", "Plan international speaking circuit", "Create global recognition strategy"]',
  '["International Award Strategy", "Global Media Database", "International Speaking Guide", "Global Recognition Framework"]',
  110,
  180,
  54,
  NOW(),
  NOW()
);

-- Verification query to ensure all lessons are created
SELECT 
  m.title as module_title,
  COUNT(l.id) as lesson_count,
  SUM(l."xpReward") as total_xp
FROM "Module" m
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
WHERE m."productId" = 'p11_branding_pr'
GROUP BY m.id, m.title, m."orderIndex"
ORDER BY m."orderIndex";

-- This should show:
-- 12 modules
-- 54 total lessons (5+5+5+5+5+5+5+5+5+3+3+3)
-- 7,650 total XP available