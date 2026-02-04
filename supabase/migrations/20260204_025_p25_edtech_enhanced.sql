-- THE INDIAN STARTUP - P25: EdTech Mastery - Enhanced Content
-- Migration: 20260204_025_p25_edtech_enhanced.sql
-- Purpose: Enhance P25 course content to 500-800 words per lesson with India-specific EdTech data
-- Course: 45 days, 9 modules covering complete EdTech startup journey in India

-- Part 1: Product and Modules 1-3 (Days 1-15)

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_1_id TEXT;
    v_mod_2_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
BEGIN
    -- Get or create P25 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P25',
        'EdTech Mastery',
        'Complete guide to building EdTech startups in India - 9 modules covering NEP 2020 policies, UGC-DEB guidelines for online degrees, AICTE approvals for technical education, NSDC partnerships for skill development, LMS technology stack, content development strategies, student acquisition, and scaling to Tier 2/3 cities. India EdTech market projected at $30 billion by 2030 with 37 million paid users.',
        6999,
        false,
        45,
        NOW(),
        NOW()
    )
    ON CONFLICT (code) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        "estimatedDays" = EXCLUDED."estimatedDays",
        "updatedAt" = NOW()
    RETURNING id INTO v_product_id;

    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P25';
    END IF;

    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: EdTech Landscape India (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'EdTech Landscape India', 'Understand India''s EdTech ecosystem - market size of $6 billion growing to $30 billion by 2030, key segments, major players, and emerging opportunities.', 0, NOW(), NOW())
    RETURNING id INTO v_mod_1_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 1, 'India EdTech Market Overview',
        'India has emerged as the world''s second-largest EdTech market after the United States, with a current market size of approximately $6 billion in 2024 and projections reaching $30 billion by 2030, representing a CAGR of 39%. The sector witnessed unprecedented growth during COVID-19, with online learning adoption accelerating by an estimated 10 years within months. However, the post-pandemic period (2022-2024) brought significant correction, with valuations declining 60-80% and several unicorns facing funding challenges.

The Indian EdTech landscape serves over 400 million potential learners across multiple segments. K-12 supplementary education represents the largest segment at $2.5 billion, dominated by players like BYJU''S (despite recent challenges), Vedantu, and Toppr. Test preparation for competitive exams (JEE, NEET, UPSC, CAT) constitutes a $1.5 billion market with Unacademy, Physics Wallah, and Allen Digital as key players. Higher education and professional upskilling, led by upGrad, Simplilearn, and Great Learning, represents $1.2 billion with strong growth.

The funding landscape has evolved dramatically. Peak funding in 2021 saw $4.7 billion invested across 340+ deals. By 2023, this dropped to $600 million, forcing focus on unit economics over growth-at-all-costs. Profitable companies like Physics Wallah have become the new benchmark.

India''s unique characteristics shape EdTech opportunities. With 22 official languages and distinct regional curriculum boards, content localization is essential. Price sensitivity is extreme - successful products are priced at Rs 500-2,000/month. Mobile-first consumption dominates with 85% of learning on smartphones. Emerging opportunities lie in vernacular content (10x market expansion), Tier 2/3 cities (60% of new user growth), and professional certification aligned with NEP 2020 and NSDC frameworks.',
        '["Research current EdTech market size by segment from RBSA, Redseer, and KPMG reports - document 2024 numbers and 2030 projections", "Map top 30 EdTech companies by segment including funding raised, revenue estimates, user base, and current operational status", "Identify 5 underserved EdTech opportunities in vernacular content, Tier 3 cities, specific exam categories, or professional segments", "Calculate TAM, SAM, SOM for your chosen EdTech opportunity using NSSO education data and internet penetration statistics"]'::jsonb,
        '["EdTech Market Analysis Framework with segment-wise sizing methodology", "India EdTech Competitive Landscape Map with 100+ companies", "EdTech Funding Database 2019-2024 with deal sizes and valuations", "Opportunity Assessment Matrix scoring 20+ niches"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 2, 'EdTech Segments Deep Dive',
        'Understanding the distinct dynamics of each EdTech segment is crucial for strategic positioning. Each segment has different customer acquisition costs, lifetime values, regulatory requirements, and competitive intensities that fundamentally shape business model viability.

K-12 Supplementary Education ($2.5 billion market): Targets students grades 1-12 seeking additional learning support. Key players include BYJU''S, Vedantu, Toppr, and Cuemath. Customer acquisition involves reaching parents who make purchase decisions - a complex sale requiring trust-building. ARPU ranges from Rs 15,000-50,000 annually. High CAC of Rs 3,000-8,000 and long sales cycles (30-60 days) characterize this segment. Content must align with NCERT, CBSE, ICSE, and 30+ state board curricula.

Test Preparation ($1.5 billion market): Highly competitive segment targeting JEE, NEET, UPSC, CAT aspirants. Physics Wallah disrupted with affordable pricing (Rs 3,000-5,000 vs Rs 30,000-50,000). Unacademy operates a platform model with 10,000+ educators. Clear outcome metrics (exam results) enable performance marketing. ARPU varies: Rs 3,000-10,000 mass-market, Rs 50,000-150,000 premium.

Higher Education and Upskilling ($1.2 billion market): Targets working professionals seeking degrees or certifications. upGrad partners with universities for online degrees (Rs 2,000 crore revenue). This segment commands highest ARPU (Rs 1-4 lakh) but has longest sales cycles (3-6 months). B2B corporate training is a growing sub-segment.

Early Childhood ($400 million market): Targets children 3-8 years for foundational literacy. NEP 2020''s NIPUN Bharat creates government opportunity. Lower ARPU (Rs 2,000-8,000/year) but potentially high retention.

Coding and STEM ($300 million market): WhiteHat Jr, Camp K12 faced hype followed by correction. Sustainable models focus on integrated STEM learning.',
        '["Analyze each EdTech segment documenting market size, growth rate, key players, typical unit economics (CAC, ARPU, LTV), and competitive intensity", "Deep dive into 3 segments most relevant to your background - interview 5 customers in each segment", "Compare business model characteristics: B2C vs B2B, subscription vs one-time, live vs recorded", "Select primary target segment with rationale based on market attractiveness and your capabilities"]'::jsonb,
        '["EdTech Segment Analysis Template with standardized metrics", "Customer Persona Library for each segment", "Unit Economics Benchmarks Database by segment", "Segment Selection Decision Matrix"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 3, 'EdTech Business Models Analysis',
        'EdTech business models have evolved significantly, with the post-2022 correction forcing a shift from growth-at-all-costs to sustainable unit economics. Understanding which model works for which segment and stage is critical.

B2C Subscription Model: Netflix-style unlimited access for monthly or annual fee. Examples: Unacademy Plus (Rs 12,000-24,000/year), Vedantu. Advantages: predictable recurring revenue, high LTV potential. Challenges: high CAC (Rs 2,000-5,000), significant upfront content investment, retention typically 40-60% annually. Works best for ongoing learning needs.

B2C Course Purchase Model: One-time purchase of specific courses. Examples: upGrad degrees (Rs 2-5 lakh). Advantages: higher upfront revenue, clearer value proposition. Challenges: requires continuous new customer acquisition. Works best for certification and career programs.

Freemium Model: Free basic content with premium features. Examples: Physics Wallah (free YouTube driving paid courses). Advantages: massive top-of-funnel, lower CAC. Challenges: conversion rates typically 2-5%. Works best for test prep where free content builds trust.

B2B SaaS to Institutions: Sell to schools, colleges, coaching institutes. Examples: Classplus, Teachmint, LEAD School. Advantages: longer contracts (1-3 years), predictable revenue. Challenges: long sales cycles (3-6 months). Works best for school technology and LMS platforms.

B2B2C Model: Partner with employers who pay for employee learning. Examples: Coursera for Business. Advantages: institutional buyer reduces CAC. Challenges: requires enterprise sales capability.

Hybrid Online-Offline Model: Combines digital content with physical centers. Examples: Allen Digital. Advantages: higher price realization, better completion rates. Challenges: capital intensive, geographic limitations.

Income Share Agreement (ISA) Model: Students pay percentage of salary after placement. Examples: Masai School, Scaler. Advantages: removes upfront barrier, aligned incentives. Challenges: requires strong placement capability, cash flow challenges.',
        '["Evaluate each business model against your target segment - score on capital efficiency, scalability, defensibility", "Calculate detailed unit economics for 3 business models using India-specific cost assumptions", "Study how successful EdTech companies evolved their business models - document pivots and rationale", "Select optimal business model with financial model showing path to profitability"]'::jsonb,
        '["Business Model Comparison Framework for Indian EdTech", "Unit Economics Calculator for subscription, course, and B2B models", "EdTech Business Model Evolution Case Studies", "Financial Model Templates with 5-year projections"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 4, 'EdTech Success and Failure Analysis',
        'Learning from both successes and failures in Indian EdTech provides invaluable insights. The sector has seen dramatic rises and falls with lessons applicable to new ventures.

Physics Wallah - The Profitable Unicorn: Founded by Alakh Pandey, achieved $2.5 billion valuation with actual profitability. Success factors: teacher-as-brand model with 20+ million YouTube subscribers providing free customer acquisition, extremely affordable pricing (Rs 3,000-5,000 vs industry Rs 30,000-50,000), community-driven growth through student engagement, lean operations focusing on content quality over fancy technology, hybrid model adding offline centers (Vidyapeeth). Key lesson: EdTech can be profitable when CAC is controlled through organic content.

Unacademy - Platform Model Evolution: Started as YouTube channel, pivoted to platform connecting educators with students. Raised $850 million, peaked at $3.4 billion valuation. Strategy: educator platform with revenue share (50-70% to teachers), aggressive acquisitions (PrepLadder, Mastree). Challenges: high burn rate ($30-40 million/month at peak), educator dependency creating retention risk, valuation down 70%+ in 2023. Lesson: platform models can scale quickly but profitability requires operational discipline.

BYJU''S - Cautionary Tale: India''s most valuable startup at $22 billion, now facing existential crisis. Rise: compelling content, massive advertising, aggressive sales tactics, acquisition spree ($2.5 billion on 15+ companies). Fall: unsustainable unit economics (CAC reportedly 60-70% of revenue), aggressive revenue recognition, post-pandemic demand normalization, debt crisis. Lesson: growth without sustainable unit economics eventually fails regardless of funding.

upGrad - Higher Education Focus: Founded by Ronnie Screwvala, reportedly Rs 2,000 crore revenue with path to profitability. Success factors: premium positioning, university partnerships, strong placement focus, clear ROI proposition.

Failed Ventures - Patterns: Lido Learning (shut down, 1,200 layoffs), Udayy (shut down). Common patterns: unsustainable CAC, pricing pressure from competitors, over-hiring during growth phase.',
        '["Conduct detailed case study analysis of 3 successful and 3 failed EdTech companies", "Extract key success factors that are replicable versus factors that were unique/lucky", "Identify early warning signs of failure that you should monitor in your venture", "Create risk mitigation plan addressing top 5 failure patterns relevant to your business model"]'::jsonb,
        '["EdTech Case Study Library with 20+ company analyses", "Success Factor Analysis Framework", "EdTech Failure Patterns Database with root cause analysis", "Risk Monitoring Dashboard template"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 5, 'Identifying Your EdTech Opportunity',
        'Selecting the right EdTech opportunity requires systematic analysis matching market gaps with your capabilities, capital access, and risk appetite.

Opportunity Assessment Framework: Evaluate opportunities across eight dimensions. Market Size: TAM should be Rs 5,000+ crore. Competition Intensity: Avoid segments with well-funded incumbents unless you have clear differentiation. Capital Requirements: Match opportunity to your funding access. Time to Revenue: Prioritize faster revenue paths. Regulatory Complexity: Consider UGC, AICTE, NCVET requirements. Your Expertise Match: Founder-market fit is critical. Margin Potential: Target 60%+ gross margins for SaaS, 40%+ for content. Defensibility: Assess moat potential.

High-Potential Opportunity Areas in 2024-25: Vernacular EdTech represents 10x market expansion beyond English. Only 10% of India is comfortable learning in English, yet 80% of EdTech content is English-first. Hindi, Tamil, Telugu, Bengali, Marathi represent massive underserved markets.

Professional Certification aligned with industry needs. Sectors like healthcare, renewable energy, EVs, logistics face massive skill gaps. Partner with Sector Skill Councils under NSDC.

Government and CSR EdTech. NEP 2020 implementation requires massive technology deployment. States procuring EdTech solutions for government schools. CSR mandates fund education technology.

Assessment and Credentialing. Move beyond content to validated learning outcomes. Proctored assessments, digital credentials, skills assessment for hiring.

Teacher Enablement. 10 million teachers need digital upskilling. Tools for teachers to create and monetize content.

Validation Approach: Interview 30+ potential customers. Use JTBD framework to understand real problems. Test willingness to pay with pricing experiments. Build MVP and measure engagement. Target 40%+ completion rates and NPS of 50+ as quality indicators.',
        '["Complete EdTech opportunity assessment scoring 10+ opportunities across all 8 criteria", "Conduct 30 customer discovery interviews for top 2 opportunities using JTBD framework", "Build MVP or landing page test for chosen opportunity - measure interest through signups", "Create 90-day validation plan with specific metrics and decision criteria"]'::jsonb,
        '["EdTech Opportunity Assessment Matrix with 30+ opportunities scored", "Customer Discovery Interview Guide for EdTech", "MVP Specification Templates for different EdTech product types", "Validation Metrics Dashboard with benchmarks"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 2: NEP 2020 Opportunities (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'NEP 2020 Opportunities', 'Navigate National Education Policy 2020 - India''s most comprehensive education reform creating massive EdTech opportunities in foundational literacy, vocational education, and technology-enabled learning.', 1, NOW(), NOW())
    RETURNING id INTO v_mod_2_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 6, 'NEP 2020 Policy Framework',
        'The National Education Policy 2020 is India''s first comprehensive education policy in 34 years, replacing the 1986 policy. Released on July 29, 2020, NEP 2020 envisions transforming India''s education system by 2040. For EdTech entrepreneurs, understanding this policy is essential.

Key Structural Changes: The policy replaces 10+2 with new 5+3+3+4 structure. Foundational Stage (5 years): Ages 3-8, focus on play-based learning and foundational literacy. Preparatory Stage (3 years): Ages 8-11, introduction to subjects with experiential learning. Middle Stage (3 years): Ages 11-14, subject-oriented learning with critical thinking. Secondary Stage (4 years): Ages 14-18, multidisciplinary study with flexibility.

Foundational Literacy and Numeracy Mission: NEP 2020 declares achieving universal FLN by Grade 3 as highest priority. NIPUN Bharat launched in 2021 targets this by 2026-27. Massive EdTech opportunity serving 150+ million children aged 3-8.

Multilingual Education: Policy promotes mother tongue instruction until at least Grade 5. Content availability mandated in all 22 scheduled languages plus English. Three-language formula encourages learning Hindi, English, and one regional language.

Vocational Education Integration: NEP 2020 aims to integrate vocational education from Grade 6, with 50% learners having vocational exposure by 2025. Opportunity for skill-based content aligned with NSQF.

Higher Education Reforms: 4-year undergraduate programs with multiple exit options. Academic Bank of Credits allows credit accumulation from multiple institutions. These reforms enable modular learning and micro-credentials.

Technology in Education: NDEAR (National Digital Education Architecture) provides framework. DIKSHA platform serves school education. SWAYAM provides free university courses. Virtual labs, AR/VR, and AI-powered adaptive learning encouraged.

Implementation: States at different stages. Progressive states (Gujarat, Karnataka, Andhra Pradesh) ahead in adoption. Full implementation targeted by 2040.',
        '["Download and study complete NEP 2020 document from Ministry of Education website", "Create summary mapping each NEP provision to potential EdTech opportunity - identify top 10", "Research state-wise NEP implementation status - identify 5 progressive states", "Analyze NDEAR framework and understand government digital infrastructure integration"]'::jsonb,
        '["NEP 2020 Complete Document with EdTech opportunity mapping", "NEP Implementation Tracker showing state-wise adoption status", "NDEAR Integration Guide with technical specifications", "NEP Opportunity Canvas linking policy to products"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 7, 'NIPUN Bharat and Foundational Learning',
        'NIPUN Bharat (National Initiative for Proficiency in Reading with Understanding and Numeracy) is the flagship program implementing NEP 2020''s foundational literacy and numeracy goals. Launched July 2021 to ensure every child achieves FLN by Grade 3 by 2026-27, representing one of the largest EdTech opportunities.

Program Scope: Target population 150+ million children aged 3-8 across 11.5 lakh government schools. Budget: Part of Samagra Shiksha Abhiyan with Rs 2.7 lakh crore for 2021-26.

Learning Outcomes (Lakshya): By Grade 1: Identify letters, read simple words, number sense 1-20. By Grade 2: Read simple sentences, understand stories, addition/subtraction 1-99. By Grade 3: Read with comprehension (50-60 wpm), write paragraphs, multiplication/division basics.

EdTech Opportunities: Assessment Tools - Technology for assessing FLN levels at scale. Opportunity for comprehensive digital assessment. Products like Google Read Along demonstrate AI-based reading assessment.

Adaptive Learning Platforms - Personalized learning based on individual level. Children in same grade at vastly different FLN levels. Examples: Mindspark, Khan Academy.

Multilingual Content - FLN content required in all 22 languages. Massive gap in regional language content.

Teacher Training - 10+ million teachers need FLN pedagogy training. Digital modules and ongoing support.

Parent Engagement - FLN requires home reinforcement. Simple apps for parents, SMS/WhatsApp engagement.

Government Procurement: State governments procure through Samagra Shiksha budgets. RFP cycle: April-June release, July-August evaluation, September-October award. Criteria: pedagogy, language coverage, assessment capability, scalability, cost per child. Contract values Rs 10-100 crore.

CSR Funding: Education is priority CSR sector under Schedule VII. Corporations must spend 2% on CSR. Major spenders: Reliance Foundation, Azim Premji Foundation, Tata Trusts. Typical project size Rs 1-10 crore annually.',
        '["Study NIPUN Bharat guidelines and Lakshya framework - understand specific learning outcomes", "Research existing FLN EdTech solutions - map features, pricing, languages, adoption", "Identify 3 state governments actively procuring FLN solutions", "Create product concept for FLN addressing specific gap"]'::jsonb,
        '["NIPUN Bharat Complete Guidelines with Lakshya outcomes", "FLN EdTech Landscape Analysis with 50+ solutions mapped", "State Government FLN Procurement Guide with timelines", "CSR Funding Database with education-focused corporates"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 8, 'Academic Bank of Credits System',
        'The Academic Bank of Credits (ABC) is a revolutionary NEP 2020 initiative enabling students to accumulate credits from multiple institutions toward degree completion. Operational from 2022, ABC creates unprecedented opportunities for modular learning and micro-credentials.

ABC Framework: Digital repository where students store credits from any registered institution. Accumulate credits over 7 years and transfer between institutions. Multiple exit points: certificate (1 year), diploma (2 years), degree (3-4 years). Credits per NHEQF with standardized values.

Technical Integration: Built on NAD infrastructure. API integration for EdTech platforms to issue and verify credits. DigiLocker integration for credential access. Blockchain verification being explored.

Credit Structure (NHEQF): Each year comprises 40 credits (1 credit = 30 notional hours). 4-year degree requires 160 credits. Credits earned through: classroom learning, online courses (SWAYAM, MOOCs), workplace learning, vocational training. This legitimizes online learning as equivalent to traditional education.

EdTech Opportunities: Credit-Bearing Online Courses - Partner with ABC-registered universities for credit-bearing courses. Revenue model: course fee with university revenue share. Examples: upGrad online degrees.

Micro-Credential Platforms - Design stackable credentials aggregating into degrees. Professional certifications carrying academic credit.

Credit Transfer Management - Platforms helping students plan credit accumulation. Tools to identify best courses across institutions.

Credential Verification - B2B services for employers. Anti-fraud systems for certificate authentication.

Partnership Requirements: Must partner with ABC-registered universities (NAAC B+ grade minimum, UGC recognized). Revenue sharing typically 30-50% to EdTech, 50-70% to university. Agreement duration 3-5 years.

Regulatory Compliance: UGC governs credit transfer. Maximum 40% online for traditional programs. 100% online degrees only for specific approved programs. SWAYAM courses can substitute up to 40% of credits.',
        '["Register on ABC portal (abc.gov.in) and understand workflows", "Research universities registered with ABC - identify partnership targets", "Design micro-credential program showing how credentials stack to degrees", "Create partnership proposal template for approaching universities"]'::jsonb,
        '["ABC Technical Integration Guide with API documentation", "University Partnership Target List with ABC-registered institutions", "Micro-Credential Design Framework for credit pathways", "Partnership Agreement Template for collaborations"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 9, 'Digital Education Infrastructure',
        'India has built substantial digital education infrastructure through government initiatives. Understanding these platforms is essential to leverage existing infrastructure and identify complementary opportunities.

DIKSHA (Digital Infrastructure for Knowledge Sharing): Launched 2017 as national platform for school education. Scale: 5+ billion content plays, 150+ million users, 10+ million teachers. Content: 1.2 lakh+ pieces across NCERT, CBSE, state boards in multiple languages. Features: QR-coded textbooks, teacher training, assessment tools.

DIKSHA Opportunities: Content Contribution - Contribute under open license. Visibility to massive user base. Technology Partnership - States procure services to extend DIKSHA. Opportunities in assessment engines, adaptive learning, analytics. Complementary Solutions - DIKSHA is content repository, not LMS. Opportunity for classroom management, live tutoring, personalized learning.

SWAYAM: Free online courses for higher education launched 2017. Partners: UGC, AICTE, NPTEL (IITs), IGNOU, NCERT. 4,000+ courses, 20+ million enrollments. Credit-bearing: SWAYAM courses can substitute up to 40% of program credits.

SWAYAM Integration: Course Enhancement - Partner with SWAYAM coordinators for supplementary content, doubt-solving, placement support. Monetize premium services around free courses. Proctoring Services - SWAYAM requires proctored exams for credit-bearing certificates.

NDEAR (National Digital Education Architecture): Framework for interoperability across platforms. Components: Unified learner profile, credential registry, content standards, APIs. Vision: Any learner accessing any content from any provider with portable credentials.

NDEAR Implications: Interoperability requirements - Future solutions need NDEAR compliance. Standard APIs for content, assessment, credentials. Opportunity areas: Infrastructure services, content aggregation, cross-platform analytics.

PM eVIDYA Initiative: COVID-19 response unifying digital education. Components: DIKSHA (school), SWAYAM (higher ed), SWAYAM PRABHA (34 DTH channels), Radio, Accessible content. Total reach: 250+ million students.',
        '["Explore DIKSHA platform - understand content organization, teacher features, state customizations", "Register on SWAYAM and complete one course to understand learner experience", "Study NDEAR framework documents - understand technical standards and compliance", "Identify 3 integration opportunities with government platforms"]'::jsonb,
        '["DIKSHA Technical Documentation with content contribution guidelines", "SWAYAM Partnership Guide with course hosting opportunities", "NDEAR Architecture Overview with compliance checklist", "Government EdTech Integration Playbook with case studies"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 10, 'NEP Implementation Strategy',
        'Successfully leveraging NEP 2020 requires understanding implementation dynamics across states, building government relationships, and positioning for both B2G and B2C opportunities.

State-wise Implementation Analysis: Implementation varies significantly by state. Fast Adopters: Gujarat, Karnataka, Andhra Pradesh, Madhya Pradesh, UP moved quickly. Earlier opportunities, receptive bureaucracy, active procurement. Gradual Implementers: Maharashtra, Tamil Nadu, West Bengal implementing selectively. Focus on specific NEP components rather than comprehensive adoption.

Government Stakeholder Mapping: Ministry of Education (Centre): Policy framework, DIKSHA/SWAYAM, central schemes. State Education Departments: Implementation authority, budget allocation, procurement. SCERT: Curriculum development, teacher training, content approval. District Education Officers: Ground-level implementation. School Principals/Teachers: End users influencing adoption.

Building Government Relationships: Industry Associations - FICCI Education Committee, CII, NASSCOM provide platforms. Participate in policy consultations. Education Conferences - State summits, MHRD events with government participation. Pilot Programs - Offer free pilots in government schools. Success builds case for larger procurement. CSR Partnerships - Partner with corporates funding government school programs.

Positioning for NEP Opportunities: Product Alignment - Explicitly map product to NEP objectives. Use NEP terminology in materials. Demonstrate how solution helps states achieve NEP targets. Compliance Documentation - Alignment with DIKSHA standards, NDEAR requirements. Language coverage for 22 scheduled languages. Accessibility features.

Go-to-Market Strategy: Phase 1 - Proof Points (Months 1-6): Build pilots in 2-3 progressive states. Document outcomes with measurable impact. Secure testimonials from officials. Phase 2 - State Expansion (Months 7-18): Leverage pilot success for larger procurements. State-specific customizations. Hire sales team with government experience. Phase 3 - Scale (Months 19+): Pursue central government tenders. Build partnerships with large system integrators (TCS, Infosys, Wipro). Consider PPP models.

Pricing for Government: Account for longer payment cycles (90-180 days), volume discounts, annual budget constraints. Typical pricing: Rs 50-500 per student per year for B2G solutions.',
        '["Create state prioritization matrix ranking states on NEP progress, budget, digital readiness, competition", "Map government stakeholders in 3 target states - identify key decision-makers and introduction paths", "Develop NEP alignment documentation showing specific policy provisions addressed", "Design 6-month government engagement plan including pilots, conferences, relationship building"]'::jsonb,
        '["State NEP Implementation Tracker with detailed status across all states", "Government Stakeholder Directory with key education officials", "NEP Product Alignment Template mapping features to policy", "B2G Sales Playbook with procurement cycle guidance"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 3: UGC ODL Regulations (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'UGC ODL Regulations', 'Navigate UGC regulations for online and distance learning programs - eligibility criteria, Online Programme Manager (OPM) requirements, university partnerships, and compliance frameworks.', 2, NOW(), NOW())
    RETURNING id INTO v_mod_3_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 11, 'UGC Online Degree Regulations',
        'The University Grants Commission (UGC) regulates online and distance education in India. Understanding these regulations is critical for EdTech companies seeking to offer degree programs or partner with universities.

UGC (Online Courses or Programmes) Regulations 2018/2020: Framework governing online degree programs in India. Initially restrictive, progressively liberalized. 2020 amendments expanded eligibility to more institutions. Key principle: Only UGC-recognized universities can offer degrees; EdTech companies can partner as Online Programme Managers (OPM).

University Eligibility Criteria: NAAC Accreditation: Only institutions with NAAC A++ or A+ grade (or equivalent NBA accreditation for technical programs) were initially eligible. 2020 amendments expanded to NAAC A grade institutions. NIRF Ranking: Universities ranked in top 100 NIRF have additional flexibilities. Approval Status: Must have valid UGC recognition and no adverse remarks. Duration: Minimum 3 years of existence for new universities.

Programs Eligible for Online Delivery: Permitted: Most undergraduate and postgraduate programs across disciplines. Engineering, Management, Commerce, Arts, Sciences all permitted. Restricted: Programs requiring laboratory work, clinical practice, or physical presence have limitations. Medical, Dental, Nursing, Pharmacy programs have specific restrictions. Professional courses may require practical components to be in-person.

Credit and Assessment Requirements: Academic requirements same as regular programs. Minimum 40% course delivery can be online for conventional programs. 100% online delivery permitted for approved online-specific programs. Assessment: Combination of online and proctored examinations. Practical components may require physical presence.

OPM (Online Programme Manager) Role: EdTech companies operate as OPMs providing: Technology platform (LMS, video conferencing), Content development and delivery, Student recruitment and marketing, Student support services. University retains: Academic oversight and quality control, Faculty provision or approval, Examination and certification, Regulatory compliance.

Revenue Sharing Models: Typical structures: 30-50% to OPM for services, 50-70% retained by university. Variables: Content creation responsibility, marketing costs, technology platform. Higher OPM share when: OPM creates content, bears marketing costs, provides comprehensive technology.

Compliance Requirements: Program approval: Each program requires UGC approval before launch. Enrollment caps: Limits may apply based on faculty ratio. Quality assurance: Annual reporting to UGC, subject to inspections. Student data: Must be reported to NAD (National Academic Depository).',
        '["Study UGC Online Courses Regulations 2018 and 2020 amendments in detail", "Create eligibility checklist for universities you could partner with", "Research OPM requirements and prepare capability assessment", "Identify top 20 universities by NAAC grade and NIRF ranking as partnership targets"]'::jsonb,
        '["UGC Online Regulations 2018/2020 with amendments and clarifications", "University Eligibility Checker with NAAC and NIRF data", "OPM Capability Requirements Checklist", "University Partnership Target Database with rankings and contact information"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 12, 'UGC-DEB Framework for Distance Education',
        'The UGC Distance Education Bureau (DEB) oversees distance and open learning programs distinct from pure online programs. Understanding DEB requirements is essential for EdTech companies targeting this segment.

DEB vs Online Regulations: Distance Education: Traditionally self-paced, correspondence-based with some contact sessions. Governed by UGC DEB regulations. Broader university eligibility than pure online. Online Education: Real-time or near-real-time online delivery. Governed by UGC Online Courses Regulations. More restrictive eligibility but growing.

UGC (ODL and Online Programmes) Regulations 2020: Consolidated framework merging distance and online regulations. Key provisions: Eligible institutions can offer programs through ODL mode. Minimum 10% contact hours required for distance programs. Quality assurance through annual returns and inspections.

Open and Distance Learning (ODL) Eligibility: Universities with 5 years of existence. NAAC accreditation (B grade or above) for new programs. Existing ODL providers with approval continue operations. State Open Universities (14 in India) have inherent ODL mandate.

Key ODL Institutions: IGNOU (Indira Gandhi National Open University): India''s largest university with 4+ million students. Extensive course catalog, strong brand recognition. EdTech partnership opportunities for content enhancement. State Open Universities: NSOU (West Bengal), BRAOU (Andhra), KKHSOU (Assam), etc. Regional focus with vernacular content needs. Partnership opportunities for technology and content.

Learner Support Centers: Distance programs require learner support centers for contact sessions. EdTech opportunity: Technology-enabled learner support. Virtual learning centers replacing physical infrastructure.

Program Delivery Requirements: Self-Learning Materials (SLM): Core content for distance programs. Increasingly digital (e-SLM) rather than printed. EdTech opportunity: Interactive digital SLM development. Assignments and Projects: Regular assessment through assignments. EdTech opportunity: Assignment management platforms. Term-End Examinations: Proctored examinations remain mandatory. EdTech opportunity: Proctoring solutions.

DEB Recognition Process: New ODL providers must apply to UGC-DEB. Inspection by DEB committee. Recognition valid for 5 years, renewable. Annual returns mandatory for continued recognition.

EdTech Partnership Opportunities with ODL: Content digitization for existing ODL providers. LMS and student management systems. Virtual contact session technology. Proctoring solutions for examinations. Learner analytics and support systems.',
        '["Research UGC-DEB regulations and recognition framework", "Map State Open Universities and their technology partnership needs", "Identify programs where ODL institutions need content/technology support", "Create partnership proposal for ODL content digitization"]'::jsonb,
        '["UGC-DEB Regulations Complete Guide", "State Open University Directory with programs and contact details", "ODL Technology Requirements Assessment Framework", "DEB Recognition Process Flowchart with timelines"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 13, 'University Partnership Structuring',
        'Structuring effective university partnerships is critical for EdTech companies entering formal education. The right partnership model balances risk, revenue, and control while ensuring regulatory compliance.

Partnership Models Overview: Online Programme Manager (OPM): Most common model for EdTech-university partnerships. EdTech provides technology, marketing, support; university provides academics, credentials. Revenue share based on responsibilities. Content Licensing: EdTech licenses existing content to universities. Lower involvement but limited revenue potential. Works for established content libraries.

Joint Certification: Co-branded certificates without full degree. Faster to market, lighter regulatory burden. Works for professional development and short courses. Platform Licensing: EdTech provides LMS platform; university manages content and delivery. SaaS model with per-student or subscription pricing.

OPM Partnership Deep Dive: Responsibilities typically split as: EdTech OPM provides: LMS platform and technology infrastructure, content production (video, interactive elements), student recruitment and marketing, student support (counseling, doubt resolution), career services and placement support. University provides: Faculty for content review and creation, academic quality assurance, examination administration, degree/certificate issuance, regulatory compliance with UGC.

Revenue Sharing Structures: Full-service OPM (marketing + content + technology): 40-50% to OPM. Technology + support only: 25-35% to OPM. Marketing only: 15-25% to OPM (commission based). Variables: Who bears marketing costs, content creation costs, technology investment.

Key Contract Terms: Duration: Typically 3-5 years with renewal provisions. Exclusivity: Exclusive vs non-exclusive program rights. Geographic scope: Pan-India vs regional limitations. Program scope: Specific programs vs broad collaboration. Performance guarantees: Minimum enrollment commitments.

Partnership Process: Initial Engagement: Identify target university and program fit. Present capability and track record. Sign NDA for detailed discussions. Due Diligence: Assess university''s regulatory status, academic quality. Evaluate faculty capability and involvement. Review existing online infrastructure.

Program Selection: Identify programs with market demand. Ensure regulatory approval feasibility. Assess competitive landscape. Agreement Negotiation: Define detailed responsibilities and deliverables. Structure revenue sharing and payment terms. Include performance metrics and governance.

Regulatory Approval: Prepare program documentation for UGC. University submits for approval. Typically 3-6 months for new program approval.

Launch and Operations: Recruit first cohort, deliver program. Establish governance rhythm. Continuous improvement based on feedback.',
        '["Develop partnership proposal template covering all key elements", "Create due diligence checklist for evaluating university partners", "Design revenue share model with sensitivity analysis for different scenarios", "Draft MoU template for initial university engagement"]'::jsonb,
        '["OPM Partnership Agreement Template with standard clauses", "University Due Diligence Checklist covering regulatory and academic factors", "Revenue Share Calculator with scenario modeling", "Partnership Process Timeline with milestones and responsibilities"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 14, 'AICTE Approvals for Technical Education',
        'The All India Council for Technical Education (AICTE) regulates technical education including engineering, management, pharmacy, architecture, and applied arts. Understanding AICTE requirements is essential for EdTech companies in technical education.

AICTE Regulatory Framework: AICTE is the statutory body for technical education established under AICTE Act, 1987. Regulates: Engineering and Technology, Management (MBA/PGDM), Pharmacy, Architecture, Hotel Management, Applied Arts. Does not regulate: Pure sciences, commerce, arts (UGC jurisdiction).

AICTE Online Education Policy: AICTE permits online delivery with specific guidelines. NBA (National Board of Accreditation) accredited institutions have flexibility. Institutions ranked in NIRF can offer online programs. Hybrid models (blend of online and offline) increasingly encouraged.

Technical Program Online Eligibility: Management Programs: More flexibility for online MBA/PGDM. Executive MBA programs commonly offered online. AICTE approved institutions can offer with approval.

Engineering Programs: More restrictive due to laboratory requirements. Theory components can be online; practicals require physical presence. Virtual labs being explored to increase online component.

Pharmacy Programs: Highly restricted for core pharmacy degrees. Supplementary courses and continuing education possible online.

AICTE Internship and Industry Connect: AICTE mandates internships for technical programs. EdTech opportunity: Internship management platforms. Connecting students with industry for experiential learning.

Approval Process for Online Technical Programs: Institution applies through AICTE portal. Technical expert committee review. Compliance inspection (virtual or physical). Approval typically for 3 years, renewable.

EdTech Opportunities in Technical Education: Content for AICTE Programs: High-quality technical content (video lectures, simulations). Virtual laboratory experiences. Industry case studies and projects.

Skill Development Courses: Short courses aligned with industry needs. Not requiring AICTE approval if non-degree. Certifications for working professionals.

Placement and Career Services: Strong placement support differentiates technical EdTech. Industry partnerships for job placements. Interview preparation and soft skills training.

Institution Technology Solutions: LMS for engineering colleges. Lab scheduling and management. Student information systems.

AICTE-NPTEL Partnership: NPTEL (National Programme on Technology Enhanced Learning) offers free technical courses. AICTE allows credit transfer from NPTEL courses. EdTech can build supplementary services around NPTEL.',
        '["Study AICTE Approval Process Handbook for online programs", "Research NBA accredited institutions as partnership targets", "Identify technical programs with highest demand for online delivery", "Create compliance checklist for AICTE online program requirements"]'::jsonb,
        '["AICTE Online Program Guidelines with approval requirements", "NBA Accredited Institution Directory with program details", "Technical Education Market Analysis with program-wise demand", "AICTE Compliance Checklist for online program delivery"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 15, 'International Certifications in India',
        'Offering international certifications in India presents opportunity for EdTech companies to serve globally-oriented learners while navigating regulatory considerations for foreign credentials.

Global Certification Landscape: Technology Certifications: Cloud: AWS, Azure, Google Cloud (high demand in India). Programming: Oracle Java, Microsoft, Python Institute. Data: Databricks, Snowflake, Tableau. Project Management: PMP, Prince2, Agile certifications. Professional Certifications: Finance: CFA, CPA, ACCA (global recognition). HR: SHRM, HRCI certifications. Marketing: Google, HubSpot, Meta certifications.

EdTech Partnership Models: Authorized Training Partner (ATP): Formal partnership with certification body. Authorized to deliver official curriculum. Use certification body branding. Access to official learning materials. Examples: AWS Training Partners, Microsoft Learning Partners. Content Partner: Create supplementary content around certifications. Practice tests, exam prep, study guides. No official branding but can reference certification. Lower barrier to entry, more competitive.

UGC Stance on Foreign Credentials: Degree Recognition: Foreign degrees require equivalence from AIU (Association of Indian Universities). Online foreign degrees have limited recognition in India. Certification Recognition: Non-degree certifications generally not regulated by UGC. Employer recognition drives market, not regulatory recognition. Professional certifications (CFA, CPA) have industry acceptance regardless of UGC.

Building International Certification Business: Target Audience: Working professionals seeking career advancement. Fresh graduates preparing for global careers. IT professionals pursuing technology certifications. Value Proposition: Quality preparation improving pass rates. Local support and doubt resolution. Flexible learning accommodating Indian schedules. More affordable than direct certification body courses.

Revenue Models: Course Fee: One-time payment for preparation course. Subscription: Access to multiple certification prep courses. Bootcamp: Intensive preparation with guaranteed outcomes. Corporate: B2B sales to companies upskilling employees.

Partnerships to Pursue: Certification Body Partnerships: Become authorized training partner. Access to official curriculum and branding. Revenue share or licensing fee to certification body.

Corporate Partnerships: Companies paying for employee certifications. Learning budgets increasingly allocated to certifications. Multi-certification packages for enterprises.

Success Metrics to Track: Certification pass rate (vs industry average). Time to certification. Learner satisfaction (NPS). Placement or career advancement post-certification.

Regulatory Considerations: No UGC approval needed for certification prep. Foreign entity regulations may apply if partnering. GST compliance for course fees. Data privacy for international certifications with cross-border data.',
        '["Research top 10 international certifications by demand in India", "Identify certification bodies with authorized partner programs", "Create business model for certification preparation business", "Design curriculum for one high-demand certification"]'::jsonb,
        '["International Certification Demand Analysis for India", "Authorized Training Partner Requirements by certification body", "Certification Business Model Canvas with unit economics", "Certification Prep Curriculum Development Guide"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    RAISE NOTICE 'Modules 1-3 created successfully for P25 EdTech Mastery';

END $$;

COMMIT;
