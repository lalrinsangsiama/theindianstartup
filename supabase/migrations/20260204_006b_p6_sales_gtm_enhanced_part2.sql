-- THE INDIAN STARTUP - P6: Sales & GTM in India - Enhanced Content Part 2
-- Migration: 20260204_006b_p6_sales_gtm_enhanced_part2.sql
-- Purpose: Continue P6 course content - Modules 6-10 (Days 28-60)
-- Depends on: 20260204_006a_p6_sales_gtm_enhanced.sql (modules 1-5)

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
    v_mod_10_id TEXT;
BEGIN
    -- Get P6 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P6';

    -- ========================================
    -- MODULE 6: Inside Sales & Lead Generation (Days 28-33)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Inside Sales & Lead Generation',
        'Master inside sales techniques tailored for the Indian market - cold calling scripts that work, email outreach with India-specific response rates, LinkedIn prospecting leveraging India''s 100+ million user base, and multi-channel sequences that convert.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_6_id;

    -- Day 28: Cold Calling Mastery for Indian Markets
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        28,
        'Cold Calling Mastery for Indian Markets',
        'Cold calling remains one of the most effective B2B sales channels in India, with connect rates significantly higher than Western markets. Understanding Indian business communication culture and timing patterns is crucial for cold calling success.

Indian Cold Calling Landscape: India has unique advantages for phone-based sales. Mobile penetration exceeds 85% among business decision-makers. Indians generally answer unknown calls more readily than Western counterparts. Average connect rate in India: 15-25% vs 5-10% in US/EU markets. Best calling windows: 10:30 AM - 12:30 PM and 3:00 PM - 5:30 PM IST. Avoid Monday mornings (meetings) and Friday afternoons (early departures).

Regional Calling Considerations: North India (Delhi NCR, Punjab, Haryana): Direct communication style preferred. Hindi-English mix (Hinglish) often more effective. Decision-makers appreciate quick value articulation. South India (Bangalore, Chennai, Hyderabad): More formal initial approach works better. English typically preferred in tech hubs. Relationship building before business discussion. West India (Mumbai, Pune, Ahmedabad): Time-conscious business culture. Respect for hierarchy essential. Gujarati business community values trust signals. East India (Kolkata, Bhubaneswar): Longer relationship-building cycles. Regional language acknowledgment appreciated. Conservative business approach.

Cold Call Script Framework for India: Opening (15 seconds): Greeting with respect (Sir/Madam still valued). Quick introduction with company credibility marker. Permission-based approach: "Is this a good time for a 2-minute conversation?" Hook (30 seconds): Lead with a relevant pain point or opportunity. Reference similar Indian companies or competitors. Use local market data to establish relevance. Qualification (60 seconds): Ask 2-3 discovery questions. Understand their current situation. Identify decision-making authority. Value Proposition (45 seconds): Connect your solution to their stated pain. Quantify benefits with India-relevant metrics. Reference testimonials from similar Indian companies. Close for Next Step (30 seconds): Ask for a specific commitment. Offer calendar booking for detailed discussion. Confirm contact details and follow-up method.

Indian Response Rate Benchmarks: Cold call connect rate: 18-22% (industry average). Callback rate after voicemail: 3-5%. Conversion to meeting: 8-12% of connects. Best days for cold calling: Tuesday, Wednesday, Thursday. Optimal call duration for qualification: 4-7 minutes.

Gatekeepers in Indian Organizations: Executive Assistants are common in larger companies. Approach with respect - they often influence decisions. Use reference names when possible ("Sharma ji suggested I call"). Offer to send information via email first if blocked. Morning calls often bypass gatekeepers (executives answer directly).

Compliance and DND Registry: TRAI DND (Do Not Disturb) registry applies to promotional calls. B2B sales calls to business numbers generally exempt. Maintain internal DND list for opt-outs. Document consent for regulatory compliance. TCCCPR 2018 regulations govern telemarketing.',
        '["Create region-specific cold calling scripts adapting language and approach for North, South, West, and East India markets", "Build a calling schedule optimized for Indian business hours with time-blocked sessions during peak connect windows", "Develop objection handling responses for top 10 common Indian objections including price sensitivity and competitor comparisons", "Set up call tracking and recording system to analyze successful patterns and coach improvement areas"]'::jsonb,
        '["India Cold Calling Script Templates with regional variations for Hindi, English, and Hinglish approaches", "Indian Business Hours Calling Calendar with optimal timing by region and industry vertical", "Objection Handling Playbook covering 25 common Indian B2B sales objections with response frameworks", "Cold Call Metrics Dashboard Template tracking connect rates, conversion rates, and regional performance"]'::jsonb,
        90,
        100,
        0,
        NOW(),
        NOW()
    );

    -- Day 29: Email Outreach Excellence
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        29,
        'Email Outreach Excellence for Indian B2B',
        'Email outreach in India requires understanding unique inbox behaviors, cultural communication preferences, and the high mobile email consumption patterns. With proper execution, email remains a cost-effective channel for B2B lead generation.

Indian Email Engagement Statistics: Average B2B email open rate in India: 18-22% (vs 15-18% global). Click-through rate: 2.5-3.5% for well-targeted campaigns. Best send times: 10:00-11:00 AM and 2:00-3:00 PM IST. Mobile email opens: 65-70% of all B2B emails in India. Tuesday and Thursday consistently outperform other days. Avoid sending during major festivals (Diwali week, Holi, regional festivals).

Subject Line Strategies for Indian Audiences: Personalization increases opens by 26%: Include company name or recipient name. Reference mutual connections when available. Mention specific pain points or opportunities. Keep under 50 characters for mobile optimization. Avoid spam triggers: "Free", "Guaranteed", "Act Now". Indian-specific hooks that work: Reference to market trends ("Indian SaaS growth..."). Competitor mentions ("How [Competitor] achieved..."). Regulatory changes ("GST impact on..."). Numbers and specifics ("47% cost reduction").

Email Body Framework: Opening Line: Reference something specific about recipient or company. Recent news, funding, expansion, or achievement. Avoid generic "I hope this email finds you well". Value Proposition (2-3 sentences): State clear benefit in their context. Use India-relevant case studies and metrics. Quantify impact with INR figures when possible. Social Proof: Mention recognizable Indian customers. Include specific results achieved. Industry-specific testimonials work best. Clear CTA: Single, specific ask. Meeting request with proposed times. Keep friction minimal (calendar link, not phone tag).

Email Sequence Design: Day 1: Initial outreach with value proposition. Day 3: Follow-up with additional insight or case study. Day 7: Break-up email with alternative resource offer. Day 14: Re-engagement with new angle or trigger event. Day 30: Final attempt with direct ask.

Response Rate Optimization: Personalization at scale using merge fields. Company research visible in first line. LinkedIn profile reference for credibility. Mobile-optimized formatting (short paragraphs, bullet points). Plain text often outperforms HTML for B2B.

Email Tools Popular in India: Zoho Campaigns: Indian origin, rupee billing, good deliverability. Mailchimp: Global standard, higher pricing. Freshmarketer: Part of Freshworks suite, Indian company. Apollo.io: Email + database for prospecting. Instantly.ai: High-volume outreach with warm-up.

Indian Email Compliance: IT Act 2000 governs electronic communication. Include unsubscribe option in all commercial emails. Honor opt-out requests within 10 business days. Maintain suppression lists across campaigns. DPDP Act 2023 adds consent requirements for personal data.',
        '["Design a 5-email outreach sequence with India-specific messaging, cultural references, and value propositions", "Create email templates for top 5 target industries with sector-specific pain points and case studies", "Set up email tracking and A/B testing infrastructure to optimize subject lines and send times", "Build email deliverability monitoring system tracking open rates, bounce rates, and spam complaints"]'::jsonb,
        '["India B2B Email Sequence Templates with 5-touch cadence and follow-up variations", "Industry-Specific Email Templates for IT Services, Manufacturing, BFSI, Healthcare, and Retail", "Email A/B Testing Framework with statistical significance calculator for Indian market sample sizes", "Email Deliverability Checklist covering DNS setup, warm-up protocols, and reputation monitoring"]'::jsonb,
        90,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 30: LinkedIn Prospecting in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        30,
        'LinkedIn Prospecting Mastery for India',
        'LinkedIn India has over 100 million users, making it the second-largest market globally after the US. For B2B sales, LinkedIn is often the most effective channel to reach Indian decision-makers, especially in technology, services, and enterprise sectors.

LinkedIn India Market Overview: Total users: 100+ million (as of 2024). Monthly active users: 35-40 million. Decision-maker penetration: High in IT, BFSI, Manufacturing. Premium penetration: Lower than Western markets (cost sensitivity). Content engagement: Growing 25% YoY. Mobile app usage: 60%+ of all LinkedIn activity in India.

Building a High-Converting LinkedIn Profile: Professional Photo: Formal business attire appropriate for India. Clean background, good lighting. Face visible, approachable expression. Headline Optimization: Not just job title - include value proposition. Keywords for searchability. Example: "Helping Indian SaaS companies reduce CAC by 40% | Sales Leader". About Section: Story-driven narrative. India-relevant achievements and metrics. Include keywords for search optimization. Call-to-action for connection or conversation.

Connection Request Strategies: Personalization is mandatory: Generic requests see 20% acceptance vs 50%+ personalized. Reference mutual connections when available. Mention specific reason for connecting. Avoid sales pitch in connection request. Effective Connection Messages: Mention something specific from their profile. Reference shared groups, interests, or connections. Keep under 300 characters. Focus on value, not ask.

InMail Best Practices: Subject lines: Keep under 40 characters. Personalization: Reference their content or company news. Value-first approach: Lead with insight, not pitch. Mobile optimization: First 2 lines visible in preview. Response rate benchmark: 10-15% for well-targeted InMails.

Content Strategy for Social Selling: Posting Cadence: 3-5 posts per week for visibility. Mix of original insights and curated content. Engage with target accounts'' content before outreach. Comment thoughtfully on prospects'' posts. Content Types That Work in India: Industry insights with India-specific data. Success stories featuring Indian companies. Regulatory updates (GST, compliance changes). Market trend analysis. Personal professional journey stories.

LinkedIn Sales Navigator for India: Core features for Indian market: Lead recommendations based on ICP. Account mapping for enterprise sales. CRM integration (works with Zoho, Salesforce). InMail credits for direct outreach. Pricing: Rs 5,000-8,000/month for Professional. ROI calculation: If one deal per quarter from LinkedIn, typically justified.

Automation and Tools: LinkedIn-approved: Sales Navigator, LinkedIn Marketing Solutions. Third-party (use cautiously): Dux-Soup, LinkedHelper, Phantombuster. Risk: LinkedIn actively detects and restricts automation. Best practice: Semi-automation with human oversight.

Measuring LinkedIn ROI: SSI (Social Selling Index): Target 70+ score. Connection acceptance rate: 40%+ is good. InMail response rate: 10-15% benchmark. Meetings booked per month: Track by source. Pipeline influenced: Attribution to LinkedIn activities.',
        '["Optimize your LinkedIn profile for India B2B selling with keyword-rich headline, compelling about section, and credibility markers", "Build a target account list of 100 ideal customers using LinkedIn Sales Navigator with India-specific filters", "Create a 30-day LinkedIn content calendar mixing thought leadership, case studies, and engagement posts", "Design a LinkedIn outreach sequence combining connection requests, content engagement, and InMail follow-ups"]'::jsonb,
        '["LinkedIn Profile Optimization Checklist for India B2B Sales Professionals", "Sales Navigator Search Filters Guide for targeting Indian decision-makers by industry, company size, and role", "LinkedIn Content Calendar Template with 30 post ideas for India B2B context", "LinkedIn Outreach Sequence Templates with personalization frameworks for Indian markets"]'::jsonb,
        90,
        100,
        2,
        NOW(),
        NOW()
    );

    -- Day 31: Multi-Channel Outreach Sequences
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        31,
        'Multi-Channel Outreach Sequences',
        'Single-channel outreach is increasingly ineffective. Modern B2B sales in India requires orchestrated multi-channel sequences combining email, phone, LinkedIn, and WhatsApp to maximize response rates and meeting conversions.

Multi-Channel Impact Statistics: Single channel response rate: 5-8%. Dual channel (email + phone): 12-18%. Triple channel (email + phone + LinkedIn): 20-28%. Quad channel (adding WhatsApp): 25-35% in India. Touches required to reach decision-maker: 8-12 on average.

The India-Optimized Sequence Framework: Day 1: LinkedIn connection request with personalized note. Day 2: Email 1 - Value proposition with India case study. Day 3: Phone call attempt (morning slot). Day 4: WhatsApp message if number available (brief, professional). Day 6: LinkedIn - Engage with their content or share relevant post. Day 7: Email 2 - Follow-up with additional insight. Day 10: Phone call attempt (afternoon slot). Day 12: LinkedIn InMail if not connected. Day 14: Email 3 - Case study or testimonial. Day 17: Phone + Voicemail with callback request. Day 21: Break-up email offering alternative value.

WhatsApp for B2B Sales in India: WhatsApp is ubiquitous in Indian business communication. Acceptable for B2B once relationship initiated. Keep messages brief and professional. Best for: Meeting confirmations, quick questions, sharing documents. Timing: Business hours only (10 AM - 6 PM). Format: Text preferred over voice notes initially. WhatsApp Business: Use for professional presence.

Channel Orchestration Tools: All-in-one platforms: Apollo.io: Email + phone + LinkedIn integration. Outreach.io: Enterprise sequence management. Salesloft: Multi-channel engagement. Indian alternatives: LeadSquared: Indian platform with multi-channel. Zoho SalesIQ: Part of Zoho ecosystem. Freshsales: Email, phone, and chat integration.

Personalization at Scale: Variables to personalize: Company name, industry, role, recent news. Research sources: LinkedIn, company website, news alerts. AI tools for research: ChatGPT, Perplexity for company insights. Templates with merge fields: 80% templated, 20% custom per prospect.

Sequence Metrics to Track: Sequence start rate: Prospects entering sequence. Touch completion rate: How many complete full sequence. Response rate by channel: Email, phone, LinkedIn individual performance. Meeting conversion rate: Responses to meetings booked. Sequence duration: Days from start to conversion.

A/B Testing Sequences: Test variables: Subject lines, call scripts, LinkedIn messages. Test one variable at a time. Sample size: Minimum 100 per variant. Statistical significance: 95% confidence before declaring winner.

Indian Business Calendar Integration: Avoid sequences during: Diwali week (usually October-November). Holi (March). Regional festivals by target geography. Q4 budget season (January-March for many companies). Intensify during: New financial year (April-June). Post-monsoon business pickup (September-October). Budget approval periods.',
        '["Design a 21-day multi-channel outreach sequence combining email, phone, LinkedIn, and WhatsApp touchpoints", "Set up sequence automation using Apollo.io, LeadSquared, or similar tool with India-specific timing", "Create channel-specific message variations maintaining consistent value proposition across touchpoints", "Build an Indian business calendar blocking sequences during major festivals and optimizing for peak periods"]'::jsonb,
        '["21-Day Multi-Channel Sequence Template with day-by-day touchpoint guide and messaging frameworks", "Channel Orchestration Tool Comparison for Indian B2B sales teams covering features, pricing, and integration", "Personalization Variables Checklist with 30+ data points to research and incorporate", "Indian Festival Calendar for Sales Planning with region-wise festival dates and business impact"]'::jsonb,
        90,
        100,
        3,
        NOW(),
        NOW()
    );

    -- Day 32: Lead Qualification Frameworks
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        32,
        'Lead Qualification Frameworks for India',
        'Effective lead qualification prevents wasted sales effort on unqualified prospects. In the Indian market, qualification must account for unique factors like budget cycles, decision-making hierarchies, and relationship-driven purchasing behaviors.

The Indian Buyer Qualification Challenge: Longer decision cycles: 6-12 months for enterprise. Multiple stakeholders: Average 5-8 in purchase decisions. Budget constraints: Price sensitivity across segments. Relationship requirements: Trust before transaction. Vendor evaluation rigor: Multiple rounds of evaluation common.

BANT Framework Adapted for India: Budget: Indian companies often have approved budgets but hide actual amounts. Ask about investment range rather than specific budget. Understand fiscal year timing (April-March for most). Check if budget is allocated or needs approval. Authority: Hierarchical structures mean multiple sign-offs. Identify champion, decision-maker, and budget holder separately. Family-owned businesses: Owner often final authority regardless of title. PSU/Government: Committee-based decisions. Need: Explicit pain articulation less common in India. Use probing questions to uncover unstated needs. Reference similar companies to validate pain. Quantify impact in their business terms. Timeline: Indian timeline often aspirational vs committed. Understand regulatory or business drivers for urgency. Budget cycles create natural timelines.

MEDDIC for Enterprise Sales in India: Metrics: Quantify business impact in INR. Economic Buyer: Find the person who controls budget. Decision Criteria: Understand evaluation parameters. Decision Process: Map approval workflow and stakeholders. Identify Pain: Uncover business-critical problems. Champion: Find internal advocate who will sell for you.

India-Specific Qualification Additions: Company Type Factors: Family-owned vs professionally managed. Indian company vs MNC subsidiary. Startup vs established enterprise. Government/PSU vs private sector. Relationship Signals: Willingness to take calls and meetings. Introduction to other stakeholders. Sharing of internal information. Response time and engagement quality. Red Flags in Indian Context: "Send me the proposal" without discovery. Price as first and only question. Unwillingness to share organizational context. No access to decision-makers after multiple meetings.

Lead Scoring Model: Demographic Score (Firmographic Fit): Company size: 0-25 points. Industry fit: 0-20 points. Geography: 0-15 points. Revenue/funding: 0-15 points. Behavioral Score (Engagement): Website visits: 0-10 points. Content downloads: 0-15 points. Email engagement: 0-10 points. Event attendance: 0-15 points. Meeting attendance: 0-20 points. Threshold for MQL: 50+ points. Threshold for SQL: 70+ points with BANT qualification.

Qualification Call Structure: Rapport Building (2-3 minutes): Reference connection or trigger. Show you have done homework on their company. Discovery Questions (10-15 minutes): Current state and challenges. Impact of problems on business. Previous solutions attempted. Decision-making process and timeline. Qualification Assessment (5 minutes): Budget range and approval process. Key stakeholders to involve. Evaluation criteria and timeline. Next Steps (2-3 minutes): Clear commitment to specific action. Calendar invite sent during call. Follow-up materials promised.',
        '["Implement a lead scoring model with firmographic and behavioral criteria tailored to Indian market segments", "Create a qualification call checklist covering BANT, decision process, and India-specific factors", "Design lead handoff criteria between marketing and sales with clear MQL and SQL definitions", "Build qualification dashboard tracking conversion rates at each qualification stage"]'::jsonb,
        '["Lead Scoring Model Template with India-specific demographic and behavioral criteria", "BANT+ Qualification Call Script with discovery questions adapted for Indian business culture", "MQL to SQL Handoff Checklist ensuring proper qualification before sales engagement", "Lead Qualification Metrics Dashboard tracking qualification rates, cycle times, and conversion"]'::jsonb,
        90,
        100,
        4,
        NOW(),
        NOW()
    );

    -- Day 33: Inside Sales Team Structure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        33,
        'Building High-Performance Inside Sales Teams',
        'Structuring an inside sales team in India requires balancing cost efficiency with effectiveness. Understanding role definitions, team structures, and performance management approaches specific to the Indian talent market is essential.

Inside Sales Team Roles: Sales Development Representative (SDR): Focus: Outbound prospecting and lead qualification. Activities: Cold calling, email outreach, LinkedIn prospecting. Output: Qualified meetings booked for Account Executives. Metrics: Calls made, emails sent, meetings booked, SQL generated. Indian salary range: Rs 3-6 LPA (base) + variable.

Business Development Representative (BDR): Focus: Inbound lead qualification and follow-up. Activities: Responding to inquiries, qualifying marketing leads. Output: Qualified opportunities for sales team. Metrics: Response time, qualification rate, conversion to opportunity. Indian salary range: Rs 2.5-5 LPA (base) + variable.

Inside Sales Representative (ISR): Focus: Full sales cycle for SMB/mid-market deals. Activities: Prospecting, demo, negotiation, closing. Output: Closed deals within defined segment. Metrics: Pipeline generated, win rate, revenue closed. Indian salary range: Rs 5-12 LPA (base) + variable.

Team Structure Models: Pod Model: SDR + AE + CSM working together on accounts. Benefits: Better collaboration, account continuity. Best for: Complex sales, larger deal sizes. Assembly Line Model: Specialized roles in sequence. SDR to AE to CSM handoffs. Benefits: Efficiency, easier training. Best for: High volume, transactional sales. Hybrid Model: SDRs in pods for enterprise, assembly line for SMB. Adapts structure to deal complexity.

Indian Talent Market for Inside Sales: Talent Hubs: Bangalore: Highest quality, highest cost. Pune: Strong talent, moderate cost. Hyderabad: Growing tech hub, good value. Delhi NCR: Large pool, variable quality. Chennai: Strong work ethic, English proficiency. Hiring Sources: Job portals: Naukri.com, LinkedIn Jobs. Referrals: Often highest quality in India. Campus recruitment: MBA schools for BDR/SDR roles. Agency recruitment: For volume hiring.

Compensation Structures: Base + Variable Split: Entry-level (SDR/BDR): 70-30 or 80-20 split. Inside Sales Rep: 60-40 split. Senior ISR: 50-50 split. Variable Components: Monthly targets: Activity-based (calls, meetings). Quarterly targets: Revenue or pipeline-based. Accelerators: Kickers for exceeding quota. Team bonuses: Collective achievement rewards. Sample SDR Compensation: Base: Rs 4,00,000/year. Variable at 100%: Rs 1,60,000/year. OTE: Rs 5,60,000/year. Accelerator: 1.5x for 120%+ achievement.

Performance Management: Daily Metrics: Calls made, connects, conversations. Emails sent, replies received. LinkedIn activities. Weekly Metrics: Meetings booked, meeting held rate. Qualified opportunities generated. Pipeline influenced. Monthly/Quarterly: Revenue attributed to sourced opportunities. Conversion rates at each stage. Ramp time for new hires.

Training and Onboarding: Week 1: Company, product, and market training. Week 2: Sales process and tools training. Week 3: Shadowing experienced reps. Week 4: Supervised live calling with coaching. Month 2-3: Ramping quota (50%, 75%, 100%). Ongoing: Weekly coaching, call reviews, skill development.

Technology Stack for Inside Sales: Phone: Exotel, Knowlarity, Ozonetel (Indian providers). Email: Apollo.io, Mailshake, Lemlist. CRM: Zoho CRM, Freshsales, Salesforce. Calling Intelligence: Gong, Chorus, Wingman. Engagement: LeadSquared, Outreach.',
        '["Design inside sales team structure appropriate for your sales model with clear role definitions and handoff points", "Create compensation plans for SDR, BDR, and Inside Sales roles with base, variable, and accelerator components", "Develop a 90-day onboarding program covering product training, sales skills, and ramping milestones", "Build daily, weekly, and monthly activity and outcome metrics dashboards for inside sales performance management"]'::jsonb,
        '["Inside Sales Team Structure Templates for different company sizes and sales models", "Inside Sales Compensation Plan Calculator with Indian salary benchmarks and variable structures", "90-Day Inside Sales Onboarding Program with week-by-week curriculum and milestones", "Inside Sales Metrics Dashboard Template tracking activity, pipeline, and revenue metrics"]'::jsonb,
        90,
        100,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Field Sales & Enterprise Selling (Days 34-39)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Field Sales & Enterprise Selling',
        'Master field sales and enterprise selling in the Indian context - account-based strategies, relationship building in Indian corporate culture, navigating hierarchies, and winning large deals with multiple stakeholders.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 34: Account-Based Selling Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        34,
        'Account-Based Selling Strategy for India',
        'Account-based selling (ABS) focuses resources on high-value target accounts with coordinated, personalized engagement. In India''s relationship-driven business culture, ABS aligns naturally with how enterprise decisions are made.

Why ABS Works in India: Enterprise buying in India involves: Average 7-10 stakeholders in purchase decisions. 6-18 month sales cycles for large deals. Relationship and trust prerequisites. Reference selling and social proof importance. ABS addresses these by focusing depth over breadth.

Target Account Selection for India: Ideal Customer Profile (ICP) Criteria: Company size: Revenue, employee count, growth rate. Industry fit: Vertical alignment with solution. Technology indicators: Stack compatibility, digital maturity. Location: HQ and operational presence. Intent signals: Hiring, funding, expansion plans.

India-Specific Selection Factors: Ownership structure: Family-owned vs professionally managed. MNC subsidiary vs Indian company. Funding status: VC-backed startups vs bootstrapped. Government relationship: PSU, government vendor, or private. Group affiliation: Tata, Reliance, Adani group companies.

Account Tiering: Tier 1 (Strategic): 10-20 accounts. Highest deal potential (Rs 1 Cr+). Full ABS treatment with dedicated resources. Custom content, executive engagement, events. Tier 2 (Target): 50-100 accounts. Strong potential (Rs 25L - 1 Cr). Scaled personalization. Industry-specific content and campaigns. Tier 3 (Scale): 200-500 accounts. Good fit but smaller potential. Programmatic ABM with light personalization.

Account Research and Intelligence: Company Research: Annual reports, investor presentations. News and press releases. Leadership changes and statements. Expansion and investment announcements. Stakeholder Research: LinkedIn profiles and activity. Conference speaking, publications. Mutual connections for warm introductions. Career history and background.

Account Planning Framework: Account Overview: Business model, revenue, growth trajectory. Strategic priorities and initiatives. Competitive landscape. Opportunity Assessment: Pain points and challenges. Solution fit and value potential. Budget and timeline indicators. Stakeholder Mapping: Decision-makers, influencers, users, blockers. Reporting relationships and dynamics. Individual motivations and concerns. Engagement Strategy: Key messages by stakeholder. Touchpoint plan across channels. Content and resource requirements. Success Metrics: Pipeline targets. Engagement milestones. Revenue goals and timeline.

Multi-Threading Strategy: Never rely on single contact in enterprise accounts. Engage 3-5+ stakeholders simultaneously. Different value propositions for different roles. Create internal champions who advocate for you. Build relationships at multiple levels.',
        '["Build Ideal Customer Profile for your enterprise target accounts with India-specific criteria", "Create tiered account list with Tier 1 (10-20), Tier 2 (50-100), and Tier 3 (200-500) accounts", "Develop detailed account plans for top 10 strategic accounts including stakeholder maps and engagement strategies", "Implement multi-threading approach engaging multiple stakeholders across your strategic accounts"]'::jsonb,
        '["India Enterprise ICP Template with firmographic, technographic, and intent criteria", "Account Tiering Framework with resource allocation guide by tier", "Enterprise Account Plan Template with research, stakeholder, and strategy sections", "Stakeholder Mapping Tool with influence and support matrix for Indian organizations"]'::jsonb,
        90,
        100,
        0,
        NOW(),
        NOW()
    );

    -- Day 35: Relationship Building in Indian Corporate Culture
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        35,
        'Relationship Building in Indian Corporate Culture',
        'Indian business culture is fundamentally relationship-driven. While Western sales often separates personal and professional, Indian enterprise sales requires building genuine personal connections that extend beyond transactions.

The Indian Relationship Paradigm: "Log pehle log ko khareedtein hain, phir product ko" (People buy people first, then products). Trust is prerequisite, not outcome of sales process. Personal chemistry often outweighs feature comparisons. Long-term relationship valued over short-term transaction. References and introductions carry significant weight.

Building Trust in Indian Business: Consistency and Reliability: Follow through on every commitment. Be punctual (even if they are not). Respond promptly to all communications. Under-promise and over-deliver. Demonstrate genuine interest beyond business. Personal Connection Elements: Remember personal details (family, interests). Acknowledge festivals and occasions. Show respect for experience and seniority. Find common ground (education, hometown, connections). Be patient with relationship building time.

Hierarchy and Protocol: Respect for Seniority: Address senior people appropriately (Sir, Madam, or Hindi equivalents). Let seniors speak first in meetings. Seek guidance and opinions from experienced stakeholders. Never contradict or embarrass seniors publicly. Organizational Protocol: Understand reporting relationships. Get appropriate introductions before cold outreach. Copy relevant stakeholders in communications. Navigate gatekeepers respectfully.

Meeting Etiquette in India: Pre-Meeting: Confirm meetings 1-2 days before. Bring appropriate materials (printed presentations still valued). Research attendees and their backgrounds. Plan for meetings to start 10-15 minutes late. During Meeting: Exchange business cards properly (receive with both hands). Small talk before business discussion (5-10 minutes). Offer refreshments if hosting. Avoid aggressive or pushy behavior. Post-Meeting: Send thank you note within 24 hours. Follow up on all action items promptly. Share relevant information or articles. Maintain regular touch even without immediate opportunity.

Entertainment and Hospitality: Business Meals: Common and important relationship building. Let client choose venue if possible. Discuss business after food is ordered. Offer to host but accept graciously if they insist. Vegetarian options always needed. Gifts and Occasions: Diwali gifts are common and expected. Moderate value (sweets, dry fruits, branded items). Avoid alcohol unless you know preferences. Personalized gifts show thoughtfulness.

Long-Term Relationship Investment: Stay Connected: Regular check-ins even without active deals. Share relevant industry news and insights. Congratulate on achievements and milestones. Connect them with useful contacts. Provide Value: Offer advice without expectation of return. Make introductions that help their business. Share knowledge and best practices. Be a resource, not just a vendor.

Red Lines and Cultural Sensitivity: Never discuss: Religion, politics, caste. Avoid: Criticism of India or Indian companies. Be Careful: Humor that may not translate. Remember: India is diverse - regional differences matter.',
        '["Develop relationship-building action plan for each key stakeholder in top accounts including personal connection strategies", "Create festival and occasion calendar for customer touchpoints including Diwali, regional festivals, and birthdays", "Design executive engagement program facilitating peer-level relationships between your leadership and customer executives", "Build a customer advisory board or community fostering ongoing relationships beyond individual transactions"]'::jsonb,
        '["Indian Business Etiquette Guide covering meeting protocol, communication norms, and relationship expectations", "Festival and Occasion Calendar with appropriate gift and communication suggestions", "Executive Engagement Program Framework for building C-level relationships", "Relationship Health Scorecard tracking touchpoints, engagement quality, and relationship strength"]'::jsonb,
        90,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 36: Navigating Indian Enterprise Hierarchies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        36,
        'Navigating Indian Enterprise Hierarchies',
        'Indian enterprises typically have more hierarchical structures than Western companies. Successfully selling into these organizations requires understanding decision-making dynamics, power structures, and how to effectively engage multiple levels.

Indian Corporate Hierarchy Structures: Family-Owned Enterprises: Chairman/Promoter at apex with final authority. Family members in key positions. Professional managers in operations. Decisions often centralized at top. Relationship with promoter family valuable. Examples: Tata, Birla, Mahindra, Bajaj groups.

Professionally Managed Companies: CEO/MD leads with board oversight. Functional heads with delegated authority. More systematic decision processes. Multiple approval levels for significant purchases. Examples: Infosys, HDFC, TCS.

MNC Indian Subsidiaries: Country head reports to regional/global leadership. Global processes and approval requirements. India-specific budget authority limits. Matrix reporting complicates decisions. Examples: Microsoft India, Google India, IBM India.

PSUs and Government Enterprises: CMD (Chairman & Managing Director) at top. Director-level officers for functions. Committee-based decision making. Detailed procurement processes. Examples: ONGC, SBI, BHEL, Indian Railways.

Decision-Making Dynamics: Authority vs Influence: Titles may not reflect actual power. Trusted advisors influence senior decisions. Administrative staff gatekeep access. Identify real power behind titles. Budget Authority Levels: Department heads: Rs 5-25 lakh typically. VPs/Directors: Rs 25L - 1 Cr. C-level: Rs 1 Cr+. Board approval: Major capital expenditures.

Committee Decisions: Many Indian enterprises use committees. Purchase committee for vendor evaluation. Technical committee for solution assessment. Finance committee for budget approval. Board subcommittee for strategic decisions.

Stakeholder Categories: Economic Buyer: Controls budget allocation. Often VP/Director level or above. Focused on ROI and strategic fit. Technical Buyer: Evaluates solution capabilities. IT, Engineering, or functional expert. Focused on features and integration. User Buyer: Will use the solution daily. Operations or functional team. Focused on usability and workflow fit. Coach/Champion: Internal advocate for your solution. Provides intelligence and guidance. Helps navigate organization. Gatekeeper: Controls access to decision-makers. Executive assistants, junior staff. Can block or facilitate engagement.

Engaging Multiple Levels: Bottom-Up Approach: Build support with users and technical team. Let enthusiasm rise through organization. Champions advocate to their leadership. Risk: Decision-makers may not engage if not approached directly. Top-Down Approach: Engage senior executives first. Get mandate to evaluate. Working teams follow executive direction. Risk: May be delegated to uncommitted teams. Sandwich Approach (Recommended): Simultaneously engage top and bottom. Executive sponsorship + user enthusiasm. Middle management follows both signals. Reduces risk of either approach alone.

Executive Access Strategies: Warm Introductions: Board members, investors, advisors. Industry peers and associations. Mutual professional connections. Executive Events: CXO roundtables and forums. Industry conferences. Exclusive executive dinners. Thought Leadership: Research and insights relevant to their challenges. Published content demonstrating expertise. Speaking at events they attend.',
        '["Map complete decision hierarchy for top 10 accounts identifying economic, technical, and user buyers", "Develop stakeholder engagement strategy for each buying role with appropriate messaging and value propositions", "Create executive access plan using warm introductions, events, and thought leadership", "Design committee presentation approach for accounts with formal evaluation processes"]'::jsonb,
        '["Indian Corporate Hierarchy Patterns by company type - Family, Professional, MNC, PSU", "Stakeholder Influence Mapping Template with role identification and engagement strategy", "Executive Access Playbook with introduction request templates and event strategies", "Committee Presentation Framework addressing multiple stakeholder concerns in single session"]'::jsonb,
        90,
        100,
        2,
        NOW(),
        NOW()
    );

    -- Day 37: Enterprise Sales Meetings and Presentations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        37,
        'Enterprise Sales Meetings and Presentations',
        'Enterprise sales meetings in India require careful preparation, cultural sensitivity, and the ability to navigate complex stakeholder dynamics. Mastering the in-person meeting is critical for closing large deals.

Pre-Meeting Preparation: Research Depth: Company recent news, financial performance. Attendee LinkedIn profiles and backgrounds. Previous interactions and meeting notes. Competitive landscape at the account. Industry challenges and trends. Materials Preparation: Printed presentations (3-5 copies minimum). Customized content for this account/industry. Demo environment tested and ready. Leave-behind materials. Business cards (essential in India). Logistics: Arrive 15-20 minutes early. Know the venue and entry process. Dress appropriately (formal for enterprise). Prepare for technology issues (bring backup).

Meeting Structure for Indian Enterprise: Opening (10-15 minutes): Greetings and introductions (seniority matters). Small talk and rapport building. Exchange of business cards. Context setting and agenda review.

Discovery Reconfirmation (15-20 minutes): Validate understanding of situation. Ask additional discovery questions. Understand what has changed since last contact. Identify who else needs to be involved.

Presentation/Demo (30-45 minutes): Lead with business value, not features. Tell relevant customer stories. Demonstrate key capabilities. Engage audience with questions. Handle objections as they arise.

Discussion and Q&A (20-30 minutes): Encourage questions from all attendees. Address concerns directly. Identify additional requirements. Discuss evaluation process and criteria.

Next Steps (10 minutes): Summarize key points. Agree on specific next actions. Confirm timeline and responsibilities. Set next meeting if appropriate.

Presentation Best Practices: Start with Why: Business context before product. Their challenges, not your features. Relevance to their specific situation. Visual Impact: Clean, professional slides. Data and charts to support claims. Customer logos for credibility. Engagement: Ask questions throughout. Invite senior people to share views. Read room for interest and attention.

Demo Excellence: Keep demos focused and relevant. Practice extensively before meeting. Have fallback if technology fails. Let customers drive where possible. Connect features to their stated needs.

Handling Indian Meeting Dynamics: Silence: Does not mean disagreement - often means consideration. Side conversations in local language: Common, often clarifying not conspiring. Senior person silent: May be waiting to see team reaction. Excessive politeness: May mask objections - probe deeper. "We will discuss internally": Standard response - get commitment for next step.

Post-Meeting Follow-Up: Same Day: Thank you email with meeting summary. Key points discussed. Agreed next steps. Any materials promised. Within 3 Days: Detailed proposal or information requested. Answers to questions raised. Suggested meeting for next discussion. Ongoing: Regular check-ins on decision timeline. Additional stakeholder engagement. Provide requested references.',
        '["Create enterprise meeting preparation checklist covering research, materials, and logistics", "Design presentation template for Indian enterprise audiences leading with business value and customer proof", "Develop objection handling responses for top 10 enterprise objections common in Indian market", "Build post-meeting follow-up workflow with same-day, 3-day, and ongoing touchpoints"]'::jsonb,
        '["Enterprise Meeting Preparation Checklist with research, materials, and logistics items", "India Enterprise Presentation Template with business-first structure and cultural considerations", "Enterprise Objection Handling Guide covering pricing, competition, risk, and timing objections", "Post-Meeting Follow-Up Workflow with templates for different meeting outcomes"]'::jsonb,
        90,
        100,
        3,
        NOW(),
        NOW()
    );

    -- Day 38: Proposal and Negotiation for Indian Enterprise
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        38,
        'Proposal and Negotiation for Indian Enterprise',
        'Enterprise proposals and negotiations in India have unique characteristics. Understanding price negotiation culture, proposal expectations, and closing dynamics is essential for successful deal completion.

Indian Enterprise Proposal Expectations: Comprehensive Documentation: Detailed scope of work. Technical specifications. Implementation approach and timeline. Team credentials and experience. Commercial terms and pricing. References and case studies. Terms and conditions.

Proposal Presentation: Many enterprises expect formal proposal presentation. Committee evaluation common for large deals. Multiple rounds of clarification typical. Competitive comparison often explicit.

Pricing in Proposals: Detailed line-item breakdown expected. Indicate negotiability through structure. Include optional items for flexibility. Show value, not just cost. Reference ROI and payback period.

Indian Negotiation Culture: Negotiation is Expected: First price is never final price. Budget for 10-25% negotiation room. "Best and final" often not actually final. Multiple rounds of negotiation common. Relationship with procurement separately from business.

Negotiation Tactics Common in India: Price anchoring low. "Budget is only Rs X" (often not true). Comparison with cheaper alternatives. Request for additional discounts after agreement. Asking for free extras (training, support, customization). Splitting scope to fit budget.

Counter-Strategies: Value-based pricing justification. Walk-away alternatives (BATNA) clear. Bundle/unbundle options. Trade value for price reductions. Create urgency without pressure.

Pricing Negotiation Framework: Prepare: Know your floor price. Understand their BATNA. Research market rates. Identify value drivers for them. Respond to First Offer: Never accept first counter immediately. Acknowledge and probe for priorities. Propose alternative structures. Focus on value, not price alone. Trade: Every concession requires reciprocity. Give on terms, not just price. Package concessions strategically. Document trades explicitly. Close: Create commitment moment. Summarize agreed terms. Move quickly to documentation.

Common Commercial Terms in India: Payment Terms: 30-60 days from invoice is standard. Advance payments (10-30%) common for projects. Progress-based payments for implementation. Annual contracts with quarterly billing. Support/Maintenance: 15-22% of license annually is market rate. Response time SLAs. Escalation procedures. Warranty and Liability: 1-year warranty standard. Liability caps typical (1x contract value). Indemnification provisions. Contract Duration: 1-3 year initial terms. Auto-renewal provisions. Termination notice (60-90 days).

Handling Procurement: Procurement Department: Separate from business stakeholders. Focus on compliance and cost reduction. May have authority to negotiate post-business approval. Important to engage but not bypass business relationship. Procurement Tactics: Formal RFP process. Multiple vendor comparison. Price benchmarking. Rate card/catalog pricing requests. MSA negotiation separate from SOW.

Final Close Techniques: Assumptive Close: Proceed as if decision is made. Final Agreement Summary: List all agreed points, ask for sign-off. Timeline Close: Tie to business milestone or fiscal deadline. Executive to Executive: Final push from your leadership to theirs.',
        '["Create enterprise proposal template with comprehensive sections meeting Indian buyer expectations", "Develop pricing structure with negotiation room built in and trade options prepared", "Build negotiation preparation checklist including BATNA analysis and trade options", "Design procurement engagement strategy parallel to business stakeholder relationship"]'::jsonb,
        '["India Enterprise Proposal Template with all sections expected by Indian buyers", "Pricing Negotiation Playbook with common tactics, counter-strategies, and trade options", "Negotiation Preparation Worksheet covering BATNA, floor price, and value justification", "Procurement Engagement Guide covering compliance requirements and cost negotiation tactics"]'::jsonb,
        90,
        100,
        4,
        NOW(),
        NOW()
    );

    -- Day 39: Reference Selling and Social Proof
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        39,
        'Reference Selling and Social Proof in India',
        'Indian enterprise buyers heavily rely on references and social proof when making purchasing decisions. Building a strong reference program and leveraging customer success stories effectively can significantly accelerate sales cycles and improve win rates.

Why References Matter More in India: Risk Aversion: Indian buyers often avoid being first adopters. Proven solutions preferred over innovative but unproven. References reduce perceived risk significantly. Network Orientation: "Who else is using this?" is top question. Industry peer validation carries enormous weight. Personal connections to references highly valued. Trust Building: References substitute for relationship history. Third-party validation more credible than vendor claims. Specific, relatable success stories resonate.

Reference Program Structure: Reference Customer Tiers: Tier 1 References: Flagship customers willing to host visits, speak at events, provide detailed case studies. Engage sparingly for highest-value opportunities. Tier 2 References: Strong customers available for calls and written testimonials. Used for qualified opportunities. Tier 3 References: Customers who can confirm satisfaction briefly. For basic validation needs.

Building Reference Pipeline: Identify satisfied customers with measurable success. Request reference participation as part of relationship. Offer value in exchange (early access, reduced pricing, co-marketing). Maintain reference health (regular check-ins, quick issue resolution).

Types of Social Proof: Case Studies: Detailed written success stories. Problem-solution-results framework. Quantified outcomes (Rs X savings, Y% improvement). Industry-specific and relatable. Best Practice: Aim for 3-5 case studies per target industry.

Customer Testimonials: Written quotes with name and title. Video testimonials (more impactful). Specific results cited. Used in proposals, presentations, website.

Reference Calls: Direct conversation between prospect and customer. Typically 30-minute call. Prepare reference with context. Follow up with prospect for feedback.

Site Visits: Most powerful but resource-intensive. Prospect visits reference customer. Sees solution in action. Peer-to-peer conversation. Reserve for late-stage, large opportunities.

Customer Events: Annual conferences with customer presentations. Executive roundtables with peer sharing. Industry-specific user groups. Customer advisory boards.

Effective Reference Utilization: Matching References to Prospects: Same industry whenever possible. Similar company size and complexity. Geographic proximity helps. Similar use case and business challenges.

Timing Reference Introduction: Not too early (wastes reference goodwill). Not too late (could have accelerated decision). Ideal: After solution fit confirmed, before final evaluation.

Preparing References: Brief on prospect background. Clarify questions they may face. Coach on key points to emphasize. Express appreciation and offer reciprocity.

Logos and Brand Association: Customer Logo Usage: Get explicit permission for logo use. Industry-specific logo walls in presentations. Website customer section. Proposal customer lists. Logo visibility builds credibility progressively.

Industry Recognition: Analyst reports and positioning. Industry awards and recognition. Media coverage and press mentions. Speaking at industry events.

Digital Social Proof: LinkedIn recommendations and endorsements. G2, Capterra reviews for SaaS. Industry forum discussions. Thought leadership content.

Measuring Reference Impact: Reference influence on win rates. Deals accelerated by reference engagement. Reference health and availability. Net Promoter Score (NPS) trends.',
        '["Build tiered reference customer program with Tier 1, 2, and 3 customers identified and engaged", "Create industry-specific case studies with problem-solution-results framework and quantified outcomes", "Design reference matching system to connect prospects with most relevant reference customers", "Develop customer testimonial collection process capturing video and written endorsements"]'::jsonb,
        '["Reference Program Framework with tiering criteria and engagement guidelines", "Case Study Template with India-relevant sections and outcome quantification guide", "Reference Request Email Templates for initial ask and follow-up", "Reference Call Preparation Guide for both customer and prospect participants"]'::jsonb,
        90,
        100,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Sales Operations & CRM (Days 40-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Sales Operations & CRM',
        'Build robust sales operations infrastructure - pipeline management, forecasting, CRM implementation with Indian tools like Zoho CRM, Freshsales, and LeadSquared, and data-driven sales management.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 40: CRM Selection and Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        40,
        'CRM Selection and Implementation for Indian Sales Teams',
        'The CRM is the backbone of modern sales operations. For Indian businesses, selecting the right CRM requires evaluating India-specific features, pricing in INR, local support, and integration with Indian business tools.

India CRM Market Landscape: Indian-Origin CRM Solutions: Zoho CRM: Comprehensive, affordable, Indian company. Freshsales: Modern UI, part of Freshworks ecosystem. LeadSquared: Strong in education, healthcare, BFSI verticals. Kylas: Newer entrant, SMB focused.

Global CRM Solutions in India: Salesforce: Market leader, enterprise-focused, INR pricing available. HubSpot: Free tier popular, growing in India. Microsoft Dynamics: Enterprise integration strength. Pipedrive: Simple, visual pipeline management.

CRM Selection Criteria: Functional Requirements: Contact and lead management. Pipeline and opportunity tracking. Activity logging (calls, emails, meetings). Reporting and dashboards. Mobile app capability. Automation and workflows.

India-Specific Considerations: INR pricing and invoicing. GST-compliant billing. Indian payment gateway integration. WhatsApp and SMS integration. Hindi/regional language support. Local customer support availability.

Integration Requirements: Email integration (Gmail, Outlook). Phone/calling integration. Website and forms. Marketing automation. Accounting software (Tally, Zoho Books).

Zoho CRM Deep Dive: Strengths: Comprehensive feature set at competitive price. Full suite integration (Zoho One). Indian company with rupee pricing. Strong customization options. Pricing: Free: Up to 3 users. Standard: Rs 800/user/month. Professional: Rs 1,400/user/month. Enterprise: Rs 2,400/user/month. Best For: SMBs, companies using other Zoho products.

Freshsales Deep Dive: Strengths: Modern, intuitive interface. Built-in phone and email. AI-powered lead scoring. Part of Freshworks ecosystem. Pricing: Free: Basic features, unlimited users. Growth: Rs 999/user/month. Pro: Rs 2,499/user/month. Enterprise: Rs 4,999/user/month. Best For: Growing sales teams wanting modern UX.

LeadSquared Deep Dive: Strengths: Strong in education, healthcare, BFSI. Marketing automation included. High-velocity sales tools. Field sales mobile features. Pricing: Custom pricing based on requirements. Typically Rs 1,000-3,000/user/month. Best For: Specific verticals, high-lead-volume businesses.

Salesforce in India: Strengths: Most comprehensive platform. Extensive ecosystem and integrations. Enterprise-grade security and compliance. Market credibility. Pricing: Essentials: Rs 2,100/user/month. Professional: Rs 6,300/user/month. Enterprise: Rs 13,300/user/month. Best For: Enterprise, complex sales processes.

CRM Implementation Best Practices: Phase 1 - Planning (2-4 weeks): Define requirements and success criteria. Select CRM based on evaluation. Plan data migration and integration. Identify customization needs.

Phase 2 - Setup (4-8 weeks): Configure fields, stages, workflows. Integrate email and phone. Import clean data. Set up reports and dashboards.

Phase 3 - Training (2-4 weeks): Admin training for power users. End-user training for sales team. Documentation and guides. Support process establishment.

Phase 4 - Adoption (Ongoing): Monitor usage and compliance. Address issues and feedback. Continuous improvement. Regular reviews and optimization.',
        '["Evaluate 3-4 CRM options using India-specific criteria including pricing, support, and integrations", "Create CRM requirements document covering functional needs and India-specific requirements", "Design CRM implementation plan with phases for setup, data migration, and training", "Build CRM adoption program with training curriculum and usage compliance monitoring"]'::jsonb,
        '["CRM Comparison Matrix for Indian market covering Zoho, Freshsales, LeadSquared, Salesforce, HubSpot", "CRM Requirements Template with functional, integration, and India-specific criteria", "CRM Implementation Project Plan with phase-by-phase tasks and timeline", "CRM Training Curriculum covering admin and end-user modules with exercises"]'::jsonb,
        90,
        100,
        0,
        NOW(),
        NOW()
    );

    -- Day 41: Pipeline Management Excellence
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        41,
        'Pipeline Management Excellence',
        'Effective pipeline management is the discipline of maintaining a healthy, predictable sales funnel. In India''s longer sales cycles and relationship-driven environment, rigorous pipeline management becomes even more critical.

Pipeline Stage Definition: Standard B2B Pipeline Stages: Lead: Identified potential prospect, not yet contacted. Contacted: Initial outreach made, awaiting response. Qualified: BANT criteria met, opportunity confirmed. Discovery: Detailed requirements gathering underway. Proposal: Formal proposal submitted. Negotiation: Terms under discussion. Closed Won: Deal signed and booked. Closed Lost: Opportunity lost (with reason captured).

India-Specific Stage Considerations: Longer qualification stage due to relationship building. Add "Internal Review" stage for committee decisions. "Procurement" stage for enterprise deals. "Legal/Contract" stage for complex agreements.

Stage Exit Criteria: Each stage should have clear exit criteria. Examples: Lead to Contacted: Outreach attempt made. Contacted to Qualified: BANT confirmed on call. Qualified to Discovery: Meeting scheduled. Discovery to Proposal: Requirements documented, proposal requested. Proposal to Negotiation: Proposal reviewed, negotiation initiated. Negotiation to Won: Contract signed, PO received.

Pipeline Metrics: Coverage Metrics: Pipeline Coverage Ratio: Pipeline / Quota (target: 3-4x for enterprise, 2-3x for SMB). Stage Distribution: Healthy spread across stages. New Pipeline Added: Weekly/monthly inflow tracking.

Velocity Metrics: Average Deal Size: Track by segment and product. Win Rate: Closed Won / (Won + Lost). Sales Cycle Length: Days from creation to close. Stage Conversion Rates: Movement between stages.

Health Metrics: Pipeline Age: Deals stuck too long in stage. Activity Recency: Days since last activity. Close Date Accuracy: Predicted vs actual close.

Pipeline Reviews: Weekly Pipeline Review: All open opportunities reviewed. Stage accuracy verification. Activity planning for each deal. Commit vs upside classification. Stuck deal intervention.

Monthly/Quarterly Review: Pipeline trends analysis. Win/loss review. Forecast accuracy assessment. Strategy adjustments.

Pipeline Hygiene: Regular Cleaning: Close out dead deals (don''t let them linger). Update close dates realistically. Maintain accurate stage assignments. Document reasons for lost deals.

Stale Deal Management: Define stale deal criteria (e.g., 60 days without activity). Create workflow for stale deal review. Re-engage or close stale opportunities. Prevent pipeline inflation from zombie deals.

Data Quality: Mandatory fields at each stage. Data validation rules in CRM. Regular data audits. Single source of truth maintained.

Pipeline Visualization: Funnel View: Shows volume at each stage. Identifies bottlenecks. Tracks conversion rates. Kanban View: Card-based stage progression. Drag-and-drop movement. Activity visibility. Time-Based View: Aging and velocity tracking. Close date forecasting. Historical comparison.

Pipeline Dashboards: Build dashboards for: Sales rep individual view. Manager team view. Executive summary view. Include key metrics and visual indicators.',
        '["Define pipeline stages with clear exit criteria appropriate for your sales process and market", "Create pipeline health metrics dashboard tracking coverage, velocity, and quality indicators", "Implement weekly pipeline review process with deal-by-deal accountability", "Build stale deal management workflow identifying and actioning stuck opportunities"]'::jsonb,
        '["Pipeline Stage Definition Template with India-specific stages and exit criteria", "Pipeline Metrics Dashboard Template with coverage, velocity, and health KPIs", "Weekly Pipeline Review Meeting Agenda with deal review framework", "Pipeline Hygiene Checklist covering data quality, stale deals, and accuracy maintenance"]'::jsonb,
        90,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 42: Sales Forecasting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        42,
        'Sales Forecasting for Indian Markets',
        'Accurate sales forecasting enables business planning, resource allocation, and investor confidence. In India''s longer and less predictable sales cycles, forecasting requires disciplined methodology and continuous refinement.

Forecasting Challenges in India: Longer sales cycles create more uncertainty. Committee decisions hard to predict timing. Festival seasons create unpredictable delays. Budget cycles (April-March) concentrate decisions. Relationship-based deals have less linear progression.

Forecast Categories: Commit: Deals expected to close with 90%+ confidence. Verbal commitment or signed contract pending. Clear close date with specific actions remaining. Best Case: Deals with 60-80% confidence. All stakeholders aligned, terms being finalized. Some uncertainty on timing or scope. Pipeline: Deals with 20-50% confidence. Qualified but early-stage. Included in longer-term forecasts. Upside: Speculative deals with <20% confidence. Not included in forecast but tracked.

Forecasting Methodologies: Bottom-Up (Rep Commit): Reps categorize deals and estimate close. Managers review and adjust. Aggregated for company forecast. Pros: Accountability, detailed. Cons: Prone to optimism bias.

Historical/Statistical: Based on historical conversion rates. Apply probability by stage. More objective, less deal-specific. Pros: Data-driven, consistent. Cons: Requires historical data, averages out deal specifics.

Weighted Pipeline: Multiply deal value by stage probability. Stage 1: 10%, Stage 2: 20%, etc. Adjust probabilities based on history. Pros: Simple, intuitive. Cons: Assumes uniform probability.

Machine Learning/AI: Predictive algorithms analyze deal patterns. Factor in multiple signals. Increasingly available in CRMs. Pros: Objective, pattern recognition. Cons: Requires data, black box.

Recommended Hybrid Approach: Use weighted pipeline as baseline. Layer rep judgment for commit deals. Apply historical adjustment factors. Review and adjust monthly based on accuracy.

Forecast Accuracy Measurement: Forecast Accuracy = 1 - (ABS(Forecast - Actual) / Actual). Track accuracy by: Time horizon (30/60/90 day). Rep and team. Deal size segment. Industry vertical.

Improving Forecast Accuracy: Better qualification: Only qualified deals in pipeline. Stage discipline: Accurate stage assignment. Close date rigor: Realistic, updated dates. Activity tracking: Activity correlates with progress. Loss learning: Understand why forecasts missed.

Forecasting Cadence: Weekly: Current quarter commit review. Deal-by-deal discussion for commit. Adjustments based on week''s progress. Monthly: Full pipeline review. Next quarter projection. Quarterly trend analysis. Quarterly: Board-level forecast. Annual plan tracking. Next quarter budget finalization.

India Financial Year Considerations: Q4 (Jan-Mar): Budget finalization period, high activity. Q1 (Apr-Jun): New budgets, often slow start. Q2 (Jul-Sep): Monsoon impact, steady activity. Q3 (Oct-Dec): Festival season, variable. Adjust forecasts for these seasonal patterns.',
        '["Design forecast categories (Commit, Best Case, Pipeline, Upside) with confidence criteria", "Implement weighted pipeline forecasting with stage-specific probabilities based on your data", "Create forecast accuracy tracking system measuring predicted vs actual by rep, team, and segment", "Build India financial year seasonality adjustments into forecast methodology"]'::jsonb,
        '["Sales Forecast Category Definitions with confidence criteria and deal characteristics", "Weighted Pipeline Probability Calculator with stage-based forecasting model", "Forecast Accuracy Dashboard tracking weekly, monthly, and quarterly accuracy trends", "India Seasonality Forecast Adjustment Guide by quarter and industry"]'::jsonb,
        90,
        100,
        2,
        NOW(),
        NOW()
    );

    -- Day 43: Sales Analytics and Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        43,
        'Sales Analytics and Reporting',
        'Data-driven sales management requires robust analytics and reporting infrastructure. Building the right dashboards and reports enables informed decision-making at all levels of the sales organization.

Sales Metrics Framework: Activity Metrics (Leading Indicators): Calls made per day/week. Emails sent. Meetings held. Proposals submitted. Demos delivered.

Pipeline Metrics (Mid-Funnel): New opportunities created. Pipeline value by stage. Stage conversion rates. Average deal size. Sales cycle length.

Outcome Metrics (Lagging Indicators): Revenue closed (won). Win rate (won/total decisions). Average selling price (ASP). Revenue per rep. Quota attainment.

Efficiency Metrics: Customer Acquisition Cost (CAC). Sales expense ratio. Revenue per employee. Ramp time for new hires.

Dashboard Design Principles: Executive Dashboard: High-level KPIs at a glance. Revenue vs target (MTD, QTD, YTD). Pipeline health summary. Win rate trends. Top deals and risks. Update frequency: Daily.

Manager Dashboard: Team performance view. Individual rep metrics. Pipeline coverage by rep. Activity compliance. Deal progression. Update frequency: Daily.

Rep Dashboard: Personal performance. Target progress. Activity tracking. Upcoming tasks. Deal alerts. Update frequency: Real-time.

Key Reports: Win/Loss Analysis: What did we win, why? What did we lose, why? Competitive intelligence. Product/service gaps. Pricing insights.

Sales Cycle Analysis: Average cycle by segment. Stage duration breakdown. Bottleneck identification. Comparison over time.

Funnel Conversion Report: Lead to opportunity rate. Stage to stage conversion. Lost deal analysis by stage. Identification of leakage points.

Rep Performance Report: Activity vs outcome correlation. Quota attainment trends. Skill and behavior patterns. Coaching opportunities.

Analytics Tools: CRM Built-in: Zoho Analytics (with Zoho CRM). Salesforce Reports and Dashboards. HubSpot Reporting. Business Intelligence: Power BI (Microsoft). Tableau (Salesforce). Looker (Google). Metabase (Open source). Spreadsheet-Based: Google Sheets with CRM export. Excel with data connections. Good for early stage, limited scale.

Data Quality for Analytics: Garbage In, Garbage Out: Clean data is prerequisite. Mandatory fields enforcement. Regular data audits. Training on data entry standards. Deduplication and normalization.

Building Analytics Culture: Regular review rhythm. Data-informed discussions. Celebrate data-driven wins. Share insights across team. Continuous improvement mindset.',
        '["Design sales metrics framework with leading (activity), mid-funnel (pipeline), and lagging (outcome) indicators", "Build role-specific dashboards for executives, managers, and reps with appropriate metrics and views", "Create standard reports library covering win/loss analysis, funnel conversion, and rep performance", "Implement data quality program ensuring clean, consistent data for reliable analytics"]'::jsonb,
        '["Sales Metrics Framework Template with KPIs categorized by type and role relevance", "Sales Dashboard Design Guide with executive, manager, and rep views", "Standard Sales Reports Library with templates for win/loss, funnel, and performance reports", "Data Quality Checklist covering mandatory fields, validation rules, and audit procedures"]'::jsonb,
        90,
        100,
        3,
        NOW(),
        NOW()
    );

    -- Day 44: Sales Process Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        44,
        'Sales Process Optimization',
        'Continuous improvement of the sales process drives efficiency and effectiveness over time. Systematic optimization based on data analysis and feedback helps scale winning patterns and eliminate friction.

Sales Process Analysis: Current State Assessment: Map existing sales process end-to-end. Identify all touchpoints and handoffs. Document time spent at each stage. Catalog tools and systems used. Capture rep and customer feedback.

Bottleneck Identification: Where do deals stall? Which stages have longest duration? Where is conversion lowest? What causes deals to fall out? Where do reps spend most time?

Optimization Opportunities: Process Streamlining: Eliminate unnecessary steps. Reduce approval layers. Automate repetitive tasks. Standardize where possible. Create clear playbooks.

Conversion Improvement: Better qualification criteria. Improved discovery process. More compelling demos. Stronger objection handling. Faster proposal turnaround.

Cycle Time Reduction: Parallel vs sequential activities. Faster internal approvals. Proactive next step scheduling. Reduced time between touches.

Sales Playbooks: What is a Playbook? Documented best practices for sales scenarios. Step-by-step guidance. Scripts, templates, and tools. Continuously updated.

Playbook Types: Prospecting Playbook: Ideal customer targeting. Outreach sequences. Messaging templates. Qualification criteria. Discovery Playbook: Question framework. Pain point identification. Requirements documentation. Opportunity assessment.

Demo Playbook: Preparation checklist. Demo flow and structure. Feature-benefit mapping. Objection handling.

Closing Playbook: Negotiation strategies. Proposal templates. Contract process. Hand-off procedures.

Implementing Process Changes: Change Management: Get buy-in before mandating change. Pilot with small group first. Measure impact before full rollout. Provide training and support. Document and communicate clearly.

Technology Enablement: Automate new processes in CRM. Update workflows and triggers. Modify dashboards and reports. Integrate with other tools.

Sales Enablement: Sales Enablement Function: Create and maintain content. Train on process and tools. Provide deal support. Measure effectiveness.

Content Management: Central content repository. Version control. Easy search and access. Usage analytics.

Training Programs: New hire onboarding. Continuous skill development. Product and market updates. Process change training.

Measuring Process Improvement: Before/After Comparison: Win rate change. Cycle time reduction. Conversion rate improvement. Activity efficiency gains.

Ongoing Monitoring: Track key metrics weekly/monthly. Compare to baseline. Identify regression quickly. Continuous improvement cycle.',
        '["Conduct sales process audit mapping current state with time, conversion, and bottleneck analysis", "Identify top 3 optimization opportunities with expected impact and implementation approach", "Create sales playbooks for key scenarios: prospecting, discovery, demo, and closing", "Design sales enablement function providing content, training, and deal support"]'::jsonb,
        '["Sales Process Audit Framework with current state mapping and bottleneck identification", "Process Optimization Prioritization Matrix evaluating impact vs implementation effort", "Sales Playbook Templates for prospecting, discovery, demo, and closing scenarios", "Sales Enablement Program Blueprint covering content, training, and deal support functions"]'::jsonb,
        90,
        100,
        4,
        NOW(),
        NOW()
    );

    -- Day 45: Revenue Operations Integration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        45,
        'Revenue Operations Integration',
        'Revenue Operations (RevOps) aligns sales, marketing, and customer success operations to drive predictable revenue growth. Building RevOps capability creates operational excellence and breaks down functional silos.

What is Revenue Operations? RevOps is the strategic integration of: Sales Operations. Marketing Operations. Customer Success Operations. Focus Areas: Process alignment across functions. Technology stack integration. Data consistency and analytics. Performance optimization.

Why RevOps Matters: Traditional siloed ops creates: Handoff friction and lead leakage. Inconsistent data and metrics. Duplicated efforts and tools. Misaligned incentives. RevOps addresses these through integration.

RevOps Functions: Process Management: Lead routing and handoffs. Sales-marketing SLAs. Customer lifecycle management. Territory and quota planning.

Technology Management: CRM administration. Marketing automation. Customer success tools. Integration and data flow.

Analytics and Insights: Unified revenue metrics. Funnel and pipeline analytics. Customer analytics. Attribution and ROI.

Enablement: Sales enablement content. Training programs. Playbooks and best practices. Tool adoption.

Marketing-Sales Alignment: Lead Management: Shared lead definitions. Lead scoring criteria. Handoff process and SLAs. Feedback loops on lead quality.

Campaign Coordination: Joint planning for campaigns. Sales involvement in content. Campaign-to-pipeline tracking. Attribution agreement.

Metrics Alignment: Shared funnel metrics. Revenue accountability. Joint targets. Regular review rhythm.

Sales-Success Alignment: Customer Handoff: Clear handoff process and timing. Information transfer (context, expectations). Joint introduction calls. Success criteria definition.

Expansion Revenue: Upsell/cross-sell identification. Success involvement in expansion. Revenue credit alignment. Joint account planning.

Renewal Management: Renewal ownership clarity. Sales involvement in at-risk accounts. Churn analysis and feedback.

RevOps Metrics: Funnel Metrics: Lead to MQL conversion. MQL to SQL conversion. SQL to opportunity. Opportunity to close. Customer to expansion.

Efficiency Metrics: CAC by channel. CAC payback period. LTV:CAC ratio. Revenue per employee.

Health Metrics: Lead response time. Handoff completion rate. Data quality scores. SLA compliance.

Building RevOps Capability: Organizational Options: Centralized RevOps team. Federated model with coordination. Hybrid with shared services. Start with clear ownership and mandate.

Technology Foundation: CRM as single source of truth. Marketing automation integration. Customer success platform connection. Analytics layer across all.

Process Documentation: End-to-end revenue process map. Clear ownership and handoffs. SLAs and escalation paths. Continuous improvement mechanism.',
        '["Design marketing-sales SLA covering lead definitions, handoff process, and feedback mechanisms", "Create customer handoff process from sales to success with information transfer checklist", "Build unified revenue funnel metrics dashboard tracking lead through expansion", "Establish RevOps review cadence with weekly, monthly, and quarterly cross-functional meetings"]'::jsonb,
        '["Marketing-Sales SLA Template with lead criteria, response times, and feedback process", "Sales to Success Handoff Checklist ensuring smooth customer transitions", "Unified Revenue Funnel Dashboard with marketing, sales, and success metrics integrated", "RevOps Review Meeting Agenda Templates for weekly, monthly, and quarterly cadences"]'::jsonb,
        90,
        100,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Government & PSU Sales (Days 46-51)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Government & PSU Sales',
        'Master the unique world of government and PSU sales in India - GeM portal registration and selling, tender processes, EMD requirements, documentation, and building relationships with public sector buyers.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 46: Government Sales Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        46,
        'Government and PSU Sales Landscape in India',
        'Government procurement in India represents a massive market opportunity exceeding Rs 20 lakh crore annually. Understanding the ecosystem, key players, and procurement methods is essential for tapping this segment.

Indian Government Procurement Market: Total Annual Procurement: Rs 20+ lakh crore (central + state). Central Government: Rs 5+ lakh crore annually. State Governments: Rs 8+ lakh crore combined. PSUs (Public Sector Undertakings): Rs 7+ lakh crore. Key Sectors: Defense, Railways, Power, Healthcare, IT, Infrastructure.

Government Buyer Categories: Central Ministries: Finance, Defence, Home, IT, Health, Education, etc. Each has procurement divisions. Central purchasing through DGS&D/GeM.

Central PSUs (CPSEs): 340+ Central PSUs (Maharatna, Navratna, Miniratna). Examples: ONGC, NTPC, SAIL, BHEL, Coal India. Autonomous procurement with board oversight.

State Governments: 28 states + 8 UTs with own procurement. State PSUs and corporations. State procurement portals emerging.

Public Sector Banks: SBI, Bank of Baroda, Canara Bank, etc. Independent procurement processes. Significant IT and services spending.

Procurement Methods: Government e-Marketplace (GeM): Mandatory for central government goods and services. Over Rs 1 lakh crore annual procurement. Growing rapidly.

Open Tender: Advertised publicly. Most transparent method. Used for high-value procurement.

Limited Tender: Invitation to pre-qualified bidders. For specialized requirements. Faster than open tender.

Single Tender/Nomination: Direct award to specific vendor. For proprietary items or emergencies. Requires strong justification.

Rate Contract: Framework agreement for recurring items. Multiple suppliers at agreed rates. Users order from rate contract.

Reverse Auction: Online auction with price discovery. Used for commodity items. Increasingly popular on GeM.

Key Regulations: GFR 2017: General Financial Rules governing central procurement. State Financial Rules: Each state has own rules. MSME Preferences: 25% procurement from MSMEs mandated. Startup Preferences: Relaxations for DPIIT-recognized startups. Make in India: Local content requirements.

Government Sales Challenges: Long Sales Cycles: 6-18 months typical. Complex Processes: Multiple approvals and documentation. Payment Delays: 30-180 days not uncommon. Price Focus: L1 (lowest price) often wins. Relationship Building: Within ethical boundaries.

Government Sales Advantages: Large Deal Sizes: Multi-crore opportunities. Predictable Budgets: Annual allocation known. Reference Value: Government customer as credibility. Repeat Business: Long-term relationships possible. Payment Security: Government payments are certain (if delayed).',
        '["Research government market opportunity in your product/service category by ministry and sector", "Identify top 20 government and PSU target accounts relevant to your solution", "Understand key procurement regulations (GFR 2017, MSME policy) affecting your eligibility", "Map decision-making structure for 5 priority government departments or PSUs"]'::jsonb,
        '["India Government Procurement Market Overview by sector, ministry, and opportunity size", "Government and PSU Target Account Identification Framework with prioritization criteria", "Key Procurement Regulations Summary covering GFR 2017, MSME policy, and startup benefits", "Government Decision-Making Map Template for understanding approval hierarchies"]'::jsonb,
        90,
        100,
        0,
        NOW(),
        NOW()
    );

    -- Day 47: GeM Portal Mastery
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        47,
        'GeM Portal Registration and Selling',
        'Government e-Marketplace (GeM) is the mandatory procurement portal for central government ministries and departments. Mastering GeM is essential for any business targeting government customers in India.

GeM Overview: Launched: August 2016. Annual GMV: Rs 1+ lakh crore (2023-24). Registered Sellers: 60+ lakh. Registered Buyers: 80,000+ government organizations. Product Categories: 10,000+ with 40 lakh+ listings.

GeM Benefits for Sellers: Massive Market Access: Single registration for all central buyers. Direct Access: No intermediaries or agents. Transparent: All processes visible and documented. Level Playing Field: Fair evaluation processes. Prompt Payments: Auto-debit ensures faster payment.

GeM Registration Process: Step 1 - Prerequisites: GSTIN (mandatory). PAN card. Bank account details. Business registration documents. Digital signature certificate (DSC).

Step 2 - Portal Registration: Visit gem.gov.in. Choose seller registration. Enter PAN and mobile OTP verification. Fill organization details. Upload required documents.

Step 3 - Brand Approval: For branded products, get brand approval. Requires authorization from brand owner. Or register as OEM.

Step 4 - Product/Service Listing: Select relevant categories. Fill technical specifications. Set pricing (MRP, seller price, L1 considerations). Upload product images and documents.

GeM Selling Modes: Direct Purchase: For orders up to Rs 25,000 (goods) or Rs 1 lakh (services). Buyer searches catalog and orders directly. No bidding, fastest process.

L1 Purchase: For Rs 25,000 to Rs 5 lakh. System compares prices from multiple sellers. Lowest price (L1) wins. Called during active bid.

Bid/RA (Reverse Auction): For higher value procurement. Buyer creates bid with specifications. Sellers quote prices. May include reverse auction component.

GeM Success Strategies: Catalog Optimization: Complete and accurate specifications. Competitive pricing (monitor L1 prices). High-quality product images. Prompt updates and refreshes.

Responsiveness: Check portal daily for opportunities. Respond to queries quickly. Participate in relevant bids promptly. Maintain good ratings.

Ratings and Reviews: Delivery performance matters. Quality ratings from buyers. Response time tracked. Build positive seller rating.

GeM Categories: Goods: IT hardware, office supplies, furniture, vehicles, etc. Services: IT services, consulting, manpower, facility management. Works: Under development for certain projects.

Common GeM Challenges: Technical Issues: Portal downtime, slow loading. Competition: Many sellers, price pressure. Specifications: Sometimes restrictive or favoring specific brands. Payment: Generally faster than traditional, but delays occur. Dispute Resolution: Mechanism exists but can be slow.

MSME Benefits on GeM: 25% procurement reserved for MSMEs. 3% sub-reservation for women entrepreneurs. Price preference of up to 15% over L1 for MSMEs. Exemption from prior turnover requirements. Exemption from earnest money deposit.',
        '["Complete GeM seller registration with all required documents and DSC", "List your products/services with optimized catalog including specifications, images, and competitive pricing", "Set up daily monitoring process for relevant bids and direct purchase opportunities", "Build strategy for achieving high seller rating through delivery performance and responsiveness"]'::jsonb,
        '["GeM Registration Step-by-Step Guide with document checklist and common issues resolution", "GeM Catalog Optimization Checklist for maximum visibility and L1 success", "GeM Daily Monitoring Workflow for opportunity identification and response", "GeM Seller Rating Improvement Guide with best practices for maintaining high ratings"]'::jsonb,
        90,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 48: Tender Process Mastery
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        48,
        'Government Tender Process Mastery',
        'Traditional tender processes remain important for high-value government procurement. Understanding tender types, documentation, and bid preparation is crucial for winning government contracts.

Tender Types: Open Tender (Advertised): Published in newspapers and portals. Any eligible bidder can participate. Most transparent and common method. Two-Bid System (Technical + Financial): Technical bid evaluated first. Only technically qualified financial bids opened. Common for complex procurements.

Limited Tender: Invitation to pre-qualified vendors. For specialized requirements. Typically 3-5 vendors invited.

Single Tender: Direct negotiation with one vendor. For proprietary or emergency situations. Requires detailed justification.

Tender Lifecycle: Tender Publication: Notice Inviting Tender (NIT) published. Advertised in newspapers, websites. Typically 21-30 days bid submission time.

Pre-Bid Conference: For complex tenders. Clarification of requirements. Amendments may be issued.

Bid Submission: Technical and financial bids. Physical or electronic (e-procurement). Sealed submission.

Bid Opening: Public opening of technical bids. Evaluation by committee. Financial bids of qualified bidders opened.

Award: L1 determination. Negotiations if applicable. Award letter issued.

Contract: Signing of contract/agreement. Performance security submission. Work/supply commencement.

Tender Documentation: Typical Bid Contents: Covering letter. Bid security (EMD). Technical qualification documents. Technical specifications compliance. Commercial bid/price schedule. Terms and conditions acceptance.

Common Document Requirements: Company registration certificate. PAN and GST registration. Financial statements (3 years). Experience certificates. Technical capability documents. Authorization letters.

EMD (Earnest Money Deposit): Purpose: Security against bid withdrawal. Amount: Typically 2-5% of estimated value. Form: Bank guarantee, demand draft, or online. MSME Exemption: MSMEs often exempt. Forfeiture: If bidder withdraws or doesn''t execute contract.

Performance Security: After Award: Winner submits performance security. Amount: Typically 3-10% of contract value. Form: Bank guarantee usually. Duration: Contract period plus warranty. Release: After successful completion.

Tender Evaluation: Technical Evaluation: Compliance with specifications. Experience and capability. Past performance. Technical scoring (if quality-cum-cost).

Financial Evaluation: L1 Determination: Lowest quoted price wins. Arithmetical corrections applied. Conditional bids may be rejected.

Quality-cum-Cost Based Selection (QCBS): Technical score: 70-80% weight. Financial score: 20-30% weight. Combined score determines winner.

Common Tender Pitfalls: Incomplete Documentation: Missing single document can disqualify. Specification Mismatch: Careful reading of requirements essential. Conditional Bids: Adding conditions often leads to rejection. Late Submission: Even by minutes results in rejection. Inadequate EMD: Short EMD amount disqualifies.',
        '["Identify relevant tender portals and set up alerts for your product/service categories", "Create tender documentation checklist ensuring completeness for all bid submissions", "Develop tender response template with pre-approved sections for faster bid preparation", "Build EMD and performance security process with bank relationships for quick issuance"]'::jsonb,
        '["Government Tender Portals Directory with central, state, and PSU procurement sites", "Tender Documentation Checklist covering all commonly required documents", "Tender Response Template with pre-written sections for common requirements", "EMD and Bank Guarantee Process Guide with bank documentation requirements"]'::jsonb,
        90,
        100,
        2,
        NOW(),
        NOW()
    );

    -- Day 49-51: Additional Government Sales lessons
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_mod_9_id, 49, 'PSU and CPSE Selling Strategies', 'Public Sector Undertakings (PSUs) represent significant B2B opportunity with more predictable procurement than direct government. Understanding PSU categories, procurement processes, and relationship dynamics enables effective selling into this segment. PSU Categories: Maharatna: 12 companies with highest operational freedom. Examples: ONGC, IOCL, NTPC, Coal India, SAIL. Investment limit: Rs 5,000 crore. Annual revenue: Rs 25,000+ crore. Navratna: 14 companies with enhanced powers. Examples: BHEL, GAIL, NMDC, Power Grid. Investment limit: Rs 1,000 crore. Miniratna Category I: 72 companies. Profit-making for 3 consecutive years. Investment limit: Rs 500 crore. Miniratna Category II: 61 companies. Profit-making for 2 years. Investment limit: Rs 300 crore. PSU Procurement Characteristics: Board-level procurement policies. Greater flexibility than ministries. Focus on value, not just L1. Longer evaluation for complex purchases. Strong vendor management systems. PSU Vendor Registration: Most PSUs maintain approved vendor lists. Registration process: Application, evaluation, approval. Annual renewal and performance review. Preferred for limited tenders. PSU Decision-Making: Functional Directors: Finance, Operations, HR, Technical. Delegation of Powers: Defined authority limits. Board Approval: For high-value purchases. Committee Evaluation: Multi-department review. PSU Sales Cycle: Typically 6-12 months. Multiple presentations and evaluations. Technical committee satisfaction critical. Commercial negotiation after technical clearance. Relationship Building in PSUs: Within compliance boundaries. Technical seminars and knowledge sharing. Reference customers in similar PSUs. Industry association engagement. Long-term relationship investment.', '["Identify top 20 PSU targets relevant to your product/service with procurement potential", "Complete vendor registration for priority PSUs and track registration status", "Map decision-making structure for 5 priority PSUs including functional directors and committees", "Develop PSU-specific value proposition addressing operational efficiency and compliance needs"]'::jsonb, '["PSU Target Account List with Maharatna, Navratna, and Miniratna categorization", "PSU Vendor Registration Tracker with application status and renewal dates", "PSU Decision-Making Map Template with authority levels and committee structures", "PSU Value Proposition Framework addressing public sector-specific drivers"]'::jsonb, 90, 100, 3, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_9_id, 50, 'Government Sales Documentation Excellence', 'Government procurement requires meticulous documentation. Errors or omissions in documentation are the most common cause of bid rejection. Mastering documentation ensures you compete on merit rather than getting disqualified on technicalities. Documentation Categories: Company Credentials: Certificate of Incorporation. Memorandum and Articles of Association. PAN card and GST registration. MSME/Startup registration (if applicable). Financial Documents: Audited financial statements (typically 3 years). CA certificate for turnover. ITR acknowledgements. Bank statements. Technical Documents: Technical specifications compliance matrix. Experience certificates from past clients. Performance certificates. Case studies and references. Bid-Specific Documents: EMD (Demand Draft, BG, or online). Signed tender document with all pages. Declaration on letterhead. Power of Attorney for authorized signatory. Common Documentation Errors: Unsigned pages in tender document. Missing self-attestation on documents. Expired validity of documents. Incorrect EMD amount or form. Non-compliance with submission format. Missing annexures or forms. Documents not notarized when required. Document Organization: Create master document repository. Maintain updated versions of standard documents. Pre-fill reusable tender sections. Create checklists for each bid. Quality review before submission. Digital Documentation: E-procurement increasingly standard. Digital signatures required (Class 3 DSC). PDF formatting requirements. File size limitations. Secure document storage. Documentation Best Practices: Start preparation early (minimum 1 week before deadline). Use checklists religiously. Get second person to review. Make copies before submission. Submit well before deadline.', '["Create master documentation repository with all commonly required company credentials", "Develop tender checklist template customized for your typical bid requirements", "Establish documentation review process with two-person verification before submission", "Build digital signature and e-procurement capability with Class 3 DSC"]'::jsonb, '["Master Document Repository Structure with file organization and version control", "Tender Documentation Checklist Template with bid-specific customization", "Documentation Review Process covering verification steps and approval workflow", "E-Procurement Setup Guide covering DSC, portal registration, and submission process"]'::jsonb, 90, 100, 4, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_9_id, 51, 'Government Relationship Building and Compliance', 'Building relationships with government buyers requires operating within strict ethical and compliance boundaries. Understanding what is acceptable and what crosses lines protects your business while enabling legitimate relationship development. Compliance Framework: Prevention of Corruption Act 1988: Criminalizes bribery of public servants. Applies to giving and receiving. Strict liability for companies. CVC Guidelines: Central Vigilance Commission oversight. Transparency requirements. Complaint mechanisms. Integrity Pact: Required for high-value contracts. Commitment from both parties. Independent monitor oversight. What is Acceptable: Knowledge Sharing: Product demonstrations and seminars. Technical presentations. Industry conferences. Site visits to reference customers. Professional Engagement: Responding to RFI/RFP. Clarification meetings. Pre-bid conferences. Post-award coordination. Appropriate Hospitality: Working meals during business discussions. Reasonable refreshments at events. Travel for legitimate site visits (with approvals). What Crosses Lines: Gifts: Personal gifts to officials are prohibited. Cash or cash equivalents strictly forbidden. Excessive entertainment or hospitality. Kickbacks: Commission to officials prohibited. Payments through intermediaries problematic. Undisclosed agents or consultants. Bid Manipulation: Accessing competitor bids. Influencing specifications unduly. Cartel or bid rigging arrangements. Building Legitimate Relationships: Industry Forums: CII, FICCI, NASSCOM events with government. Public conferences and seminars. Industry-government dialogues. Professional networking. Thought Leadership: Research and reports on relevant topics. Speaking at government events. Contributing to policy discussions. Publishing insights beneficial to sector. References and Reputation: Strong track record speaks. Other government customers as reference. Industry recognition and awards. Reputation for quality and reliability. Navigating the System Ethically: Consultants and Advisors: Use for legitimate guidance on process. Verify credentials and reputation. Transparent fee arrangements. Avoid those promising to "fix" outcomes.', '["Develop compliance policy for government sales covering acceptable and prohibited practices", "Train sales team on government ethics requirements and red flags", "Build thought leadership program for government sector through industry forums and content", "Create legitimate consultant engagement process with due diligence and transparent arrangements"]'::jsonb, '["Government Sales Compliance Policy Template with dos and don''ts for sales team", "Government Ethics Training Module covering legal requirements and practical scenarios", "Government Thought Leadership Plan using industry forums, content, and public engagement", "Consultant Engagement Checklist with due diligence and contractual requirements"]'::jsonb, 90, 100, 5, NOW(), NOW());

    -- ========================================
    -- MODULE 10: Sales Team Building & Compensation (Days 52-60)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Sales Team Building & Compensation',
        'Build high-performing sales teams in India - hiring SDRs, BDRs, and Account Executives, designing competitive compensation structures with Indian salary benchmarks, managing performance, and creating a winning sales culture.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 52-60: Sales Team Building lessons
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_mod_10_id, 52, 'Sales Hiring Strategy for Indian Market', 'Building a high-performing sales team starts with hiring the right talent. The Indian sales talent market has unique characteristics requiring adapted hiring strategies. Indian Sales Talent Landscape: Talent Hubs: Bangalore: Largest pool of tech sales talent, highest cost. Pune: Growing hub with good value. Mumbai: Enterprise sales strength, financial services. Delhi NCR: Large volume, variable quality. Hyderabad: Emerging tech hub, competitive costs. Chennai: Strong work ethic, English proficiency. Tier 2 Cities: Indore, Jaipur, Kochi emerging as options. Salary Benchmarks (2024): SDR/BDR: Rs 3-6 LPA (base) + 20-30% variable. Inside Sales Rep: Rs 5-10 LPA (base) + 30-40% variable. Account Executive (SMB): Rs 8-15 LPA (base) + 40-50% variable. Account Executive (Enterprise): Rs 15-30 LPA (base) + 50-100% variable. Sales Manager: Rs 20-40 LPA (base) + variable. Sales Director: Rs 40-75 LPA (base) + variable. VP Sales: Rs 60-120 LPA + equity. Hiring Sources: Job Portals: Naukri.com: Largest volume in India. LinkedIn Jobs: Premium candidates. Indeed: Growing in India. AngelList: Startup-focused talent. Referrals: Often highest quality hires. Typical 15-25% of hires from referrals. Referral bonus: Rs 25,000-1,00,000 common. Campus Recruitment: MBA programs for entry-level. IIMs, ISB, XLRI, SPJAIN for premium. Regional B-schools for volume. Agencies: Executive search for senior roles. RPO for volume hiring. Typical fee: 8-15% of annual salary. Role Definitions: SDR (Sales Development Representative): Focus: Outbound prospecting. Qualification: Cold calling, email outreach. Output: Qualified meetings for AEs. Profile: 0-2 years experience, hunger to learn. BDR (Business Development Representative): Focus: Inbound lead qualification. Qualification: Responding to inquiries. Output: Qualified opportunities. Profile: Similar to SDR, may be slightly senior. Account Executive: Focus: Full sales cycle management. Activities: Discovery, demo, negotiation, close. Output: Closed revenue. Profile: 3-7 years, proven closer.', '["Define sales roles clearly with job descriptions, responsibilities, and success metrics", "Establish salary bands by role based on market benchmarks and your competitiveness strategy", "Create multi-channel sourcing plan combining portals, referrals, campus, and agencies", "Design structured interview process with scorecards for consistent evaluation"]'::jsonb, '["Sales Role Definition Templates for SDR, BDR, AE, and Manager positions", "India Sales Salary Benchmark Report with city-wise and industry-wise data", "Sales Hiring Sourcing Strategy covering channels, costs, and expected results", "Sales Interview Scorecard with competency-based evaluation criteria"]'::jsonb, 90, 100, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 53, 'Sales Interview and Selection Process', 'A rigorous, structured interview process is essential for hiring sales talent. The process should assess both skills and cultural fit while providing a positive candidate experience. Interview Process Structure: Phone Screen (30 minutes): Basic qualification and fit. Communication skills assessment. Interest and motivation. Salary expectations alignment. Conducted by: HR or hiring manager. First Round Interview (60 minutes): Detailed background review. Sales experience and achievements. Situational questions. Cultural fit assessment. Conducted by: Hiring manager. Role Play/Simulation (45-60 minutes): Live selling exercise. Cold call simulation. Discovery call role play. Objection handling. Conducted by: Sales leader. Final Round (60 minutes): Executive assessment. Strategic thinking. Leadership potential (for senior roles). Final approval. Conducted by: VP Sales or CEO. Reference Checks: 2-3 professional references. Focus on performance and behavior. Verify achievements claimed. Key Competencies to Assess: Drive and Motivation: Achievement orientation. Resilience and persistence. Goal-oriented mindset. Self-motivation. Communication: Articulation and clarity. Listening skills. Questioning ability. Persuasion capability. Sales Acumen: Process understanding. Qualification skills. Objection handling. Closing ability. Culture Fit: Team orientation. Integrity and ethics. Growth mindset. Adaptability. Interview Questions by Competency: Achievement: "Tell me about your biggest sales win." "How did you rank in your team?" "What was your quota attainment?" Process: "Walk me through your sales process." "How do you qualify opportunities?" "Describe your discovery approach." Resilience: "Tell me about a deal you lost." "How do you handle rejection?" "Describe a difficult period in sales." Role Play Scenarios: Cold Call: Give company and product context. Prospect persona description. Evaluate opening, questioning, handling. Discovery Call: Set scenario with qualified prospect. Assess questioning depth. Evaluate needs understanding. Objection Handling: Present common objections. Evaluate response quality. Assess recovery ability. Red Flags in Sales Candidates: Blaming others for failures. Inability to articulate achievements specifically. Lack of curiosity about your company. Overselling self without substance. Poor listening during interview. Negative comments about previous employers.', '["Design structured interview process with stages, interviewers, and time allocations", "Create role play scenarios for each sales position testing relevant skills", "Develop interview scorecards with competency-based evaluation criteria", "Build reference check process with targeted questions for sales candidates"]'::jsonb, '["Sales Interview Process Template with stage-by-stage guide", "Sales Role Play Scenarios Library with evaluation rubrics", "Sales Interview Scorecard with competency ratings and decision criteria", "Sales Reference Check Guide with performance verification questions"]'::jsonb, 90, 100, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 54, 'Sales Compensation Design for India', 'Compensation design directly impacts sales performance, motivation, and retention. In India, compensation structures must balance competitive pay with fiscal prudence while driving desired behaviors. Compensation Philosophy: Pay for Performance: Variable compensation tied to results. Clear line between effort and reward. High performers significantly out-earn. Competitive Total Compensation: OTE competitive with market. Consider total package (base + variable + benefits). Adjust for geography and industry. Simple and Understandable: Reps can calculate their earnings. Minimize complexity. Clear rules and exceptions. Compensation Structure Components: Base Salary: Fixed monthly compensation. Provides security and stability. Covers basic living expenses. Market-competitive for talent attraction. Variable Compensation: Commission on sales. Quota-based bonus. Accelerators for over-achievement. Paid monthly, quarterly, or annually. Benefits: Health insurance (increasingly important). Provident fund (mandatory). Gratuity (after 5 years). Leave encashment. Other perks (car, fuel, phone). Variable Compensation Models: Commission Only: Percentage of revenue sold. Highest motivation, highest risk. Suitable for proven sellers. Example: 10% of deal value. Quota-Based Bonus: Percentage of base for hitting quota. Graduated rates for over-achievement. Predictable cost for company. Example: 50% of base at 100% quota. Hybrid (Most Common): Mix of commission and bonus. Balance of predictability and motivation. Example: 30% of OTE as commission, 20% as quarterly bonus. Indian Market Variable Splits: SDR/BDR: 70% base / 30% variable. Inside Sales: 60% base / 40% variable. SMB AE: 55% base / 45% variable. Enterprise AE: 50% base / 50% variable. Sales Manager: 60% base / 40% variable. Accelerators and Kickers: Purpose: Motivate over-achievement. Structure: Higher rates above 100% quota. Example: 100-120%: 1.2x rate. 120-150%: 1.5x rate. 150%+: 2x rate. Cap or Uncapped: Generally uncapped for AEs. Caps for SDRs (predictability). Decelerators: Purpose: Reduce payout for under-performance. Structure: Lower rates below quota. Example: 80-100%: 0.8x rate. Below 80%: 0.5x or no payout. Use carefully to avoid demotivation.', '["Design compensation structure by role with base, variable, and benefits components", "Create quota-setting methodology ensuring fair and achievable targets", "Build accelerator and decelerator structure motivating over-achievement", "Develop compensation communication materials clearly explaining earnings potential"]'::jsonb, '["Sales Compensation Plan Templates by role (SDR, AE, Manager) with India benchmarks", "Quota Setting Framework with top-down and bottom-up methodology", "Accelerator Calculator showing earnings at different achievement levels", "Compensation Communication Deck explaining plan to sales team"]'::jsonb, 90, 100, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 55, 'Sales Onboarding and Ramp', 'Effective onboarding accelerates time to productivity and improves retention. A structured ramp program sets clear expectations and supports new hires through their critical first months. Onboarding Program Structure: Week 1 - Company and Culture: Company history, mission, values. Organizational structure. Product overview. Market and competition. Key policies and systems. Week 2 - Product Deep Dive: Detailed product training. Technical understanding. Demo skills development. Competitive differentiation. Use case mastery. Week 3 - Sales Process and Tools: Sales methodology. CRM and tools training. Pipeline management. Forecasting process. Administrative procedures. Week 4 - Shadowing and Practice: Shadow experienced reps. Observe customer calls. Practice role plays. Begin prospecting activities. First customer interactions with supervision. Ramp Program Design: Ramp Period: Typical 3-6 months depending on role. SDR: 1-2 months. SMB AE: 3 months. Enterprise AE: 4-6 months. Quota During Ramp: Month 1: 25% of full quota. Month 2: 50% of full quota. Month 3: 75% of full quota. Month 4+: 100% of full quota. Guaranteed Earnings: Consider guaranteed variable during ramp. Reduces financial stress. Allows focus on learning. Example: 80% of target variable guaranteed for first 2 months. Onboarding Milestones: Week 1: Complete company training, pass basic assessment. Week 2: Complete product certification. Week 3: Complete CRM and tools setup. Week 4: Conduct first supervised customer call. Month 2: Book first meeting (SDR) or qualified opportunity (AE). Month 3: Close first deal (AE). Training Methods: Classroom/Virtual Training: Instructor-led sessions. Interactive exercises. Group discussions. Knowledge checks. Self-Paced Learning: Online courses and videos. Reading materials. Quizzes and assessments. Shadowing: Observe senior reps. Listen to recorded calls. Join customer meetings. Learn by example. Practice: Role plays with manager. Pitch practice sessions. Objection handling drills. Mock negotiations. Buddy Program: Assign experienced rep as buddy. Daily check-ins initially. Informal guidance and support. Cultural integration. Measuring Onboarding Success: Time to First Deal: How quickly new hires close. Ramp Quota Attainment: Performance vs ramp targets. Knowledge Assessment Scores: Training test results. Activity Levels: Prospecting volume during ramp. Retention at 6 months: Indicator of onboarding quality.', '["Design 30-60-90 day onboarding program with weekly milestones and activities", "Create ramp quota structure with graduated targets and guaranteed earnings", "Build onboarding content library including company, product, and sales training", "Establish buddy program pairing new hires with experienced reps"]'::jsonb, '["30-60-90 Day Onboarding Plan Template with detailed activities and milestones", "Ramp Quota Calculator with graduated targets and earnings projections", "Onboarding Content Checklist covering all training modules and materials", "Buddy Program Guide with buddy selection criteria and engagement structure"]'::jsonb, 90, 100, 3, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 56, 'Sales Performance Management', 'Effective performance management drives continuous improvement and accountability. In sales, clear metrics, regular reviews, and swift action on underperformance are essential for team success. Performance Management Framework: Goal Setting: Annual quota/targets. Quarterly milestones. Monthly activity expectations. Individual development goals. SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound). Tracking and Monitoring: Daily activity tracking. Weekly pipeline review. Monthly results review. Quarterly performance assessment. Annual evaluation. Feedback and Coaching: Regular 1:1 meetings. Real-time feedback on calls. Pipeline coaching. Skills development. Career conversations. Recognition and Consequences: Public recognition for achievements. Performance-based compensation. Improvement plans for underperformance. Termination when necessary. 1:1 Meeting Structure: Weekly 1:1 (30-45 minutes): Pipeline review. Deal coaching. Activity check. Obstacle removal. Personal check-in. Monthly 1:1 (60 minutes): Results review. Target progress. Development progress. Broader feedback. Career discussion. Performance Metrics by Role: SDR Metrics: Calls made per day (target: 50-80). Emails sent per day (target: 50-100). Conversations per day (target: 10-15). Meetings booked per week (target: 8-12). Show rate for booked meetings. AE Metrics: Meetings held per week. Opportunities created. Pipeline generated. Win rate. Revenue closed. Average deal size. Sales cycle length. Manager Metrics: Team quota attainment. Rep productivity (revenue per rep). Ramp time for new hires. Attrition rate. Pipeline coverage. Performance Improvement Plans (PIP): When to Use: Consistent underperformance (2+ months below 70%). Significant behavioral issues. Skills gaps affecting results. PIP Components: Clear performance gap identification. Specific improvement expectations. Timeline (typically 30-60 days). Support and resources provided. Consequences of non-improvement. PIP Execution: Document everything. Weekly check-ins during PIP. Fair and consistent application. Legal HR review. Exit management if PIP fails. Managing Out Underperformers: Swift Action: Long tolerance of underperformance hurts team. Address early, don''t wait. Fairness: Same standards for all. Documentation critical. Support First: Try coaching and development. Ensure they have what they need to succeed. Clear Process: Warning, PIP, termination if needed. HR and legal alignment. Respectful exit.', '["Implement performance management cadence with daily, weekly, monthly, and quarterly rhythms", "Define clear metrics and targets by role with tracking mechanisms", "Create 1:1 meeting templates for weekly and monthly performance conversations", "Develop PIP process and templates for addressing underperformance"]'::jsonb, '["Performance Management Cadence Calendar with meeting types and participants", "Sales Metrics Dashboard Template by role with targets and tracking", "1:1 Meeting Agenda Templates for weekly and monthly performance discussions", "Performance Improvement Plan Template with clear expectations and timeline"]'::jsonb, 90, 100, 4, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 57, 'Sales Coaching and Development', 'Coaching is the most powerful lever managers have for improving team performance. Effective sales coaching develops skills, improves results, and increases retention. Coaching vs Managing: Managing: Directing activities and tasks. Monitoring metrics and compliance. Administrative oversight. Telling what to do. Coaching: Developing skills and capabilities. Asking questions to build understanding. Observing and providing feedback. Helping reps discover solutions. Coaching Models: GROW Model: Goal: What do you want to achieve? Reality: Where are you now? Options: What could you do? Will: What will you do? Useful for goal-oriented coaching conversations. Observe-Diagnose-Prescribe: Observe: Listen to calls, join meetings. Diagnose: Identify skill gaps. Prescribe: Specific development actions. Useful for skills-based coaching. Coaching Activities: Call Coaching: Listen to recorded calls. Provide specific feedback. Identify patterns and gaps. Celebrate wins. Deal Coaching: Review pipeline opportunities. Strategize on stuck deals. Role play difficult conversations. Plan next steps together. Skills Coaching: Identify development areas. Create learning plan. Practice and role play. Track improvement. Coaching Frequency: High Performers: Monthly coaching adequate. Focus on stretch goals. Exposure to leadership. Mid Performers: Weekly coaching recommended. Address specific skill gaps. Accelerate to high performance. Low Performers: Daily/frequent coaching. Intense support. Clear improvement expectations. Coaching Meeting Structure: Prepare: Review rep''s metrics and calls. Identify 1-2 focus areas. Prepare questions and examples. Conduct: Start with rep''s self-assessment. Share observations. Discuss together. Agree on actions. Follow Up: Document coaching notes. Check on action completion. Observe improvement. Adjust approach as needed. Development Planning: Individual Development Plans: Assess current skills vs required. Identify 2-3 development priorities. Create specific learning activities. Set timeline and milestones. Review progress quarterly. Development Activities: On-the-job learning (70%): Stretch assignments. New responsibilities. Cross-functional projects. Learning from others (20%): Mentoring. Peer learning. Shadowing. Formal training (10%): Courses and workshops. Certifications. External programs.', '["Implement GROW or similar coaching model for structured coaching conversations", "Create coaching cadence by performer level with appropriate frequency and focus", "Design individual development plan template with skills assessment and learning activities", "Build coaching skills in sales managers through training and practice"]'::jsonb, '["GROW Coaching Framework Guide with example questions for each stage", "Coaching Cadence Matrix by performer level with meeting frequency and focus areas", "Individual Development Plan Template with skills assessment and action planning", "Sales Manager Coaching Training Program covering models, techniques, and practice"]'::jsonb, 90, 100, 5, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 58, 'Building Sales Culture', 'Sales culture significantly impacts team performance, retention, and customer experience. Building a healthy, high-performing sales culture requires intentional effort and consistent reinforcement. Elements of Strong Sales Culture: Performance Orientation: Clear expectations and accountability. Results celebrated and rewarded. Underperformance addressed quickly. Data-driven decision making. Continuous improvement mindset. Collaboration: Team success alongside individual success. Knowledge sharing encouraged. Help seeking normalized. Cross-functional partnerships. No lone wolves. Integrity: Ethical selling practices. Customer-first mentality. Honest internal communication. No shortcuts or gaming. Long-term relationship focus. Learning: Curiosity and growth mindset. Failure as learning opportunity. Investment in development. Best practice sharing. Innovation encouraged. Culture Building Activities: Recognition Programs: Monthly/quarterly awards. Public recognition in team meetings. Peer recognition systems. Non-monetary recognition. Examples: "Deal of the Month", "Rookie of the Quarter", "Team Player Award". Competitions: Quarterly sales competitions. Team vs team contests. Gamification elements. Meaningful prizes. Balance competition with collaboration. Team Events: Regular team gatherings. Celebrations for milestones. Outings and activities. Virtual events for remote teams. Build relationships beyond work. Communication: Regular all-hands meetings. Transparent performance sharing. Strategy and direction clarity. Two-way feedback channels. Town halls with leadership. Common Culture Problems: Toxic Competition: Reps sabotaging each other. Information hoarding. Customer stealing. Fix: Team goals, collaboration rewards, swift action on violations. Low Accountability: Underperformance tolerated. Excuses accepted. Inconsistent standards. Fix: Clear expectations, consistent consequences, transparent metrics. Complacency: Satisfied with mediocrity. No stretch goals. Innovation stagnates. Fix: Challenging targets, recognition for excellence, continuous learning. Burnout: Unsustainable pace. No work-life balance. High turnover. Fix: Realistic expectations, wellness programs, manager training. Remote Sales Culture: Challenges: Isolation and disconnection. Difficult to observe and coach. Communication barriers. Culture dilution. Solutions: Regular video check-ins. Virtual team events. Over-communicate expectations. Intentional relationship building. Hybrid work policies where possible. Leadership Role in Culture: Model Behavior: Leaders set example. Actions speak louder than words. Consistent with stated values. Visible and accessible. Reinforce and Reward: Recognize culture-aligned behavior. Call out violations. Reward cultural contributors. Hire for culture fit. Evolve Intentionally: Culture needs care and feeding. Adapt as company grows. Listen to team feedback. Continuous improvement mindset.', '["Define sales team values and expected behaviors creating culture foundation", "Design recognition program celebrating performance and cultural contributions", "Create communication cadence keeping team informed and connected", "Build remote/hybrid culture practices for distributed teams"]'::jsonb, '["Sales Culture Values Statement with expected behaviors and standards", "Sales Recognition Program Framework with awards, criteria, and prizes", "Sales Team Communication Plan with meeting cadence and channels", "Remote Sales Culture Playbook with practices for distributed teams"]'::jsonb, 90, 100, 6, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 59, 'Sales Manager Development', 'Strong sales managers are the linchpin of high-performing sales organizations. Developing management capability through clear expectations, training, and support creates multiplicative impact on team performance. Sales Manager Role: Key Responsibilities: Recruit and hire top talent. Onboard and develop team members. Coach for performance improvement. Manage pipeline and forecast. Drive team to quota achievement. Time Allocation: 40% coaching and development. 25% pipeline and forecast management. 15% recruiting and onboarding. 10% admin and reporting. 10% strategy and planning. Manager vs Individual Contributor: From Doing to Enabling: IC: Personal sales achievement. Manager: Team achievement through others. Mindset Shift: Success measured by team, not self. Give credit, take responsibility. Develop others to be better than you. Common Transition Challenges: Difficulty letting go of deals. Trying to sell for reps instead of coaching. Not allocating time to management activities. Missing the thrill of personal wins. Developing Sales Managers: First-Time Manager Program: Transition support from IC to manager. Management fundamentals training. Coaching skills development. Peer cohort for shared learning. Manager mentorship. Ongoing Development: Monthly manager roundtables. Quarterly training workshops. Annual leadership development. External programs and certifications. Executive coaching for high potentials. Manager Coaching: Manager''s manager role: Coach the coaches. 1:1 with skip-levels for visibility. Observe managers in team interactions. Feedback on management behaviors. Key Manager Capabilities: Hiring: Interview skills. Candidate assessment. Selling the opportunity. Making decisions. Coaching: Observation and diagnosis. Feedback delivery. Development planning. Performance improvement. Pipeline Management: Forecast accuracy. Deal strategy. Pipeline health monitoring. Risk identification. Leadership: Team motivation. Culture building. Conflict resolution. Change management. Manager Metrics: Team Quota Attainment: Primary success measure. Rep Productivity: Revenue per rep. Ramp Time: Speed of new hire productivity. Forecast Accuracy: Commit vs actual. Attrition Rate: Voluntary turnover. Team Health: Engagement survey scores. Manager Quality Issues: Signs of Poor Management: High team turnover. Consistent quota miss. Rep complaints. Poor forecast accuracy. Intervention: Direct feedback with specific issues. Manager coaching and support. Skills training for gaps. Role change if improvement doesn''t happen.', '["Define sales manager role with responsibilities, time allocation, and success metrics", "Create first-time manager transition program supporting IC to manager shift", "Build manager development curriculum covering key capabilities", "Establish manager coaching cadence with director-level oversight"]'::jsonb, '["Sales Manager Role Description with detailed responsibilities and expectations", "First-Time Manager Transition Program with training and support elements", "Manager Development Curriculum covering hiring, coaching, pipeline, and leadership", "Manager Coaching Framework for director-level development of managers"]'::jsonb, 90, 100, 7, NOW(), NOW()),

    (gen_random_uuid()::text, v_mod_10_id, 60, 'Scaling the Sales Organization', 'As revenue grows, the sales organization must scale effectively. Scaling requires planning, process discipline, and continuous adaptation to maintain performance while growing headcount and complexity. Scaling Challenges: Hiring at Volume: More open positions than before. Quality maintenance difficult. Onboarding capacity strained. Training Consistency: More new hires to train. Quality varies across trainers. Tribal knowledge doesn''t scale. Process Discipline: Processes that worked with 5 reps may not work with 50. Documentation becomes critical. Consistency across teams. Manager Development: More managers needed. Promoting ICs to managers. Manager training at scale. Culture Preservation: Values can dilute with growth. New hires change culture. Intentional culture maintenance needed. Scaling Playbook: Hiring Scale: Build recruiting capability. Multiple sourcing channels. Pipeline of candidates. Employer branding. Agency relationships. Onboarding Scale: Document and systematize. Cohort-based onboarding. Train-the-trainer programs. Self-service learning. Reduced manager dependence. Process Scale: Documented playbooks. CRM automation. Approval workflows. Exception handling. Audit and compliance. Manager Scale: Leadership development pipeline. Promote from within where possible. External hiring for specialized needs. Manager onboarding program. Organizational Design: Team Structures: Pod model for enterprise. Geographic territories. Vertical specialization. Customer segment alignment. Hybrid approaches. Span of Control: SDR manager: 8-12 reps. AE manager: 6-8 reps (enterprise) or 10-12 (SMB). Adjust based on deal complexity. Layers: Flat early (VP + Managers). Add Director layer at scale. Regional structure for geographic spread. Consider shared services for operations. Metrics for Scaling: Efficiency Metrics: Revenue per rep. CAC as percentage of revenue. Sales expense ratio. Productivity trending. Quality Metrics: Win rate maintenance. Deal size consistency. Customer satisfaction. Forecast accuracy. Health Metrics: Attrition rate. Ramp time. Manager effectiveness. Team engagement. When to Scale: Lead Indicators: Sales pipeline growth. Demand exceeding capacity. Quota attainment consistently high. Market opportunity expanding. Lag Indicators: Revenue growth. Profitability targets met. Customer acquisition increasing. Scaling Red Flags: Hiring ahead of revenue. Quality declining with volume. Culture degrading. Attrition increasing. Profitability suffering.', '["Create hiring plan aligned with revenue targets and capacity requirements", "Document and systematize onboarding for scale with cohort model", "Design organizational structure for next growth phase with spans and layers", "Build metrics dashboard tracking efficiency, quality, and health during scaling"]'::jsonb, '["Sales Hiring Plan Template aligned with revenue targets and capacity", "Scalable Onboarding Program Design with cohort model and self-service elements", "Sales Org Design Framework with structures for different growth stages", "Sales Scaling Dashboard tracking efficiency, quality, and health metrics"]'::jsonb, 90, 100, 8, NOW(), NOW());

    RAISE NOTICE 'Modules 6-10 (Days 28-60) created successfully for P6 Sales & GTM Enhanced';

END $$;

COMMIT;
