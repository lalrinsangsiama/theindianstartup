-- THE INDIAN STARTUP - P25: EdTech Mastery - Enhanced Content Part 3
-- Migration: 20260204_027_p25_edtech_enhanced_part3.sql
-- Purpose: Complete P25 course with Modules 7-9 (Days 31-45)
-- Depends on: 20260204_026_p25_edtech_enhanced_part2.sql

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
BEGIN
    -- Get P25 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P25';

    -- ========================================
    -- MODULE 7: Student Acquisition (Days 31-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Student Acquisition', 'Acquire learners profitably - performance marketing, organic growth, content marketing, influencer partnerships, and referral programs for EdTech.', 6, NOW(), NOW())
    RETURNING id INTO v_mod_7_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_7_id, 31, 'EdTech Customer Acquisition Fundamentals',
        'Customer acquisition in EdTech presents unique challenges due to long consideration cycles, complex decision-makers, and high competitive intensity. Understanding the EdTech customer journey is essential for efficient acquisition.

EdTech Customer Journey: Awareness: Learner becomes aware of learning need. Triggers: Career goals, exam deadlines, skill gaps, job requirements. Channels: Social media, search, word-of-mouth, advertising.

Consideration: Research solutions, compare options. Duration: 1-2 weeks (short courses) to 6+ months (degree programs). Activities: Website visits, content consumption, reviews, demos.

Conversion: Purchase decision and enrollment. Decision makers: Self (adults), parents (K-12), employers (corporate). Friction points: Price, trust, time commitment.

Onboarding: Initial engagement with content. Critical period: First 7-14 days. Goal: Quick wins, habit formation.

Engagement: Ongoing learning activity. Metrics: Completion rate, time spent, assessment scores. Goal: Learning outcomes, satisfaction.

Retention/Referral: Continue or recommend. Subscription renewal, upsell to advanced courses. Referrals to peers.

Key Metrics to Track: Customer Acquisition Cost (CAC): Total marketing spend / new customers. Benchmark: Rs 500-2,000 (short courses), Rs 5,000-20,000 (degree programs).

Lifetime Value (LTV): Revenue per customer over relationship. Include repeat purchases, referrals. Target LTV:CAC ratio > 3:1.

Conversion Rates: Website visitor to lead: 2-5%. Lead to trial: 20-40%. Trial to paid: 5-20%. Funnel optimization critical.

Payback Period: Time to recover CAC. Target: Under 12 months. Affects cash flow and growth.

Acquisition Channels Overview: Paid Acquisition: Performance marketing (Google, Meta, YouTube). Scalable but expensive. CAC typically higher.

Organic Acquisition: SEO, content marketing, social media. Lower CAC but slower to scale. Requires consistent investment.

Viral/Referral: Word-of-mouth, referral programs. Lowest CAC, highest trust. Requires great product experience.

Partnerships: Institutions, corporates, influencers. Channel-based distribution. Revenue share models.

India-Specific Acquisition Dynamics: Price Sensitivity: Lower willingness to pay than Western markets. Heavy discounting expected (50-70% off). EMI options essential for higher-priced programs.

Trust Building: Education is high-involvement purchase. Reviews, testimonials crucial. Free trials and samples expected.

Regional Targeting: Different channels by region. Vernacular content for regional acquisition. Local testimonials and case studies.

Mobile-First: Mobile ads perform better. WhatsApp for lead nurturing. App installs as conversion event.

Seasonality: Exam-driven peaks (JEE, NEET, CAT cycles). Back-to-school seasonality (April-June). Year-end corporate budgets.',
        '["Map customer journey for your target learner segment", "Define acquisition metrics and targets (CAC, LTV, conversion rates)", "Identify top 3 acquisition channels to prioritize", "Create acquisition budget allocation by channel"]'::jsonb,
        '["EdTech Customer Journey Mapping Template", "Acquisition Metrics Dashboard Template", "Channel Prioritization Framework for EdTech", "Acquisition Budget Planning Calculator"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_7_id, 32, 'Performance Marketing for EdTech',
        'Performance marketing provides scalable, measurable customer acquisition but requires sophistication to achieve profitable unit economics in the competitive EdTech space.

Performance Marketing Channels: Google Ads: Search: High intent, expensive (Rs 50-200/click for competitive terms). YouTube: Video ads for awareness and education. Display: Retargeting and remarketing. Performance Max: AI-driven cross-channel.

Meta (Facebook/Instagram): Large reach, sophisticated targeting. Lower CPC than Google but lower intent. Strong for B2C courses and programs. Instagram effective for younger demographics.

YouTube: Pre-roll and in-stream ads. Effective for course previews. Can build channel alongside ads.

Programmatic: Display advertising at scale. Lower CPCs but lower quality. Brand awareness plays.

India-Specific Channels: ShareChat/Moj: Regional language audiences. Lower competition, lower CPCs. Growing EdTech adoption.

Campaign Structure: Awareness Campaigns: Objective: Reach, video views. Content: Educational content, brand introduction. Targeting: Broad interest-based. Budget: 20-30% of total.

Consideration Campaigns: Objective: Traffic, engagement. Content: Course previews, testimonials, comparisons. Targeting: Custom audiences, lookalikes. Budget: 30-40% of total.

Conversion Campaigns: Objective: Leads, purchases. Content: Strong offers, deadlines, social proof. Targeting: Retargeting, high-intent keywords. Budget: 40-50% of total.

Targeting Strategies: Interest Targeting: Education interests, competitive exams, career interests. Demographic: Age, location, income indicators.

Custom Audiences: Website visitors. Video viewers. Lead list uploads. Course completers for upsell.

Lookalike Audiences: Based on converted customers. 1-3% lookalikes for quality. 5-10% for scale.

Keyword Strategy: High-intent keywords: "best [course] course", "[skill] certification". Competitor keywords: Competitor brand names. Long-tail keywords: Lower competition, higher conversion.

Creative Best Practices: Video Ads: Hook in first 3 seconds. Show instructor/content quality. Clear call-to-action. Testimonials and outcomes.

Static Ads: Clear value proposition. Strong visual of learning experience. Price/offer prominently displayed.

Landing Pages: Message match with ad. Social proof above fold. Clear, single CTA. Mobile-optimized.

Attribution and Measurement: Multi-Touch Attribution: Education has long consideration cycles. Track beyond last-click. Use UTM parameters consistently.

Conversion Tracking: Define conversion events (lead, trial, purchase). Implement pixel/tag correctly. Track offline conversions (phone inquiries).

ROAS Targets: Target 3-4x return on ad spend. Account for LTV, not just first purchase. Adjust by channel and campaign type.',
        '["Set up performance marketing accounts (Google, Meta)", "Define campaign structure with awareness, consideration, conversion stages", "Create targeting strategy with custom and lookalike audiences", "Build creative brief for ad development"]'::jsonb,
        '["Performance Marketing Campaign Structure Template", "Targeting Strategy Guide for EdTech", "Ad Creative Best Practices Library", "Attribution and Measurement Setup Guide"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_7_id, 33, 'Content Marketing and SEO',
        'Content marketing and SEO provide the lowest CAC acquisition channels but require consistent, long-term investment. For EdTech, educational content naturally attracts potential learners.

Content Marketing Strategy: Educational Blog: Valuable content related to course topics. Target keywords learners are searching. Establish expertise and trust. Convert readers to leads.

YouTube Channel: Free educational content. Largest reach platform in India. Builds instructor brand. Direct path to paid courses.

Social Media Content: Regular educational posts. Engagement with community. Platform-specific content.

Podcasts: Growing medium in India. Expert interviews, discussions. Builds authority.

SEO Fundamentals for EdTech: Keyword Research: Target: Course-related searches, exam preparation, skill development. Tools: Google Keyword Planner, Ahrefs, SEMrush. Long-tail keywords: Lower competition, higher intent. Example: "python course for beginners" vs "learn python data science job placement".

On-Page SEO: Title tags and meta descriptions. Header structure (H1, H2, H3). Internal linking between related content. Page speed optimization.

Content SEO: Comprehensive, valuable content. Answer learner questions thoroughly. Regular content updates. Featured snippet optimization.

Technical SEO: Site structure and navigation. Mobile-friendliness. Core Web Vitals. Schema markup for courses.

Content Types That Work: How-To Guides: Step-by-step tutorials. Target skill-building searches. Demonstrate expertise.

Comparison Content: "X vs Y" comparisons. Decision-stage content. "Best [course/tool] for [purpose]".

Career Guides: Career path content. Salary guides. Industry outlook.

Exam Resources: Previous year questions. Study plans. Tips and strategies.

Free Courses/Samples: Teaser content. Lead magnets. Quality demonstration.

YouTube Strategy: Channel Positioning: Clear niche and value proposition. Consistent posting schedule. Playlist organization.

Content Types: Full tutorial videos. Quick tips and snippets. Q&A and doubt solving. Course previews.

Optimization: SEO-optimized titles and descriptions. Custom thumbnails. End screens and cards. Community engagement.

Monetization Path: Free content builds audience. Paid courses for comprehensive learning. Membership for exclusive content.

Content Calendar: Frequency: Minimum 2-3 blog posts per week. 1-2 YouTube videos per week. Daily social media.

Planning: Align with seasonal trends (exam cycles). Keyword opportunity-driven. Mix of evergreen and timely content.

Team: Content writers (Rs 25,000-50,000/month each). Video editors (Rs 30,000-60,000/month). SEO specialist (Rs 40,000-80,000/month).',
        '["Conduct keyword research for your course topics", "Create content calendar for blog and YouTube", "Implement on-page SEO for website", "Build YouTube channel strategy and content plan"]'::jsonb,
        '["Keyword Research Template for EdTech", "Content Calendar Planning Template", "On-Page SEO Checklist", "YouTube Channel Growth Guide for EdTech"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_7_id, 34, 'Influencer and Educator Partnerships',
        'Influencer and educator partnerships can provide authentic reach and lower CAC than traditional advertising. In EdTech, educators with following are particularly valuable partners.

Types of Influencer Partnerships: Educator Influencers: YouTube teachers with subscriber base. Subject matter experts on social media. Coaching teachers with student following. Most authentic for EdTech.

Career Influencers: Career coaches and counselors. Placement experts. Industry professionals.

Student Influencers: Toppers and achievers. Student content creators. Peer influence for younger audiences.

General Lifestyle Influencers: Broad reach, lower relevance. Effective for awareness. Higher cost, lower conversion.

Partnership Models: Affiliate/Commission: Pay per lead or sale. Commission: 10-30% of course fee. Low risk, aligned incentives.

Flat Fee: One-time payment for promotion. Fixed cost regardless of performance. Risk on EdTech company.

Content Collaboration: Co-create content (courses, videos). Revenue share on collaborative content. Long-term partnership.

Brand Ambassador: Ongoing relationship. Multiple touchpoints. Exclusive arrangement.

Finding and Evaluating Influencers: Discovery: YouTube search in relevant topics. Instagram/LinkedIn for professionals. Influencer platforms: Qoruz, Plixxo.

Evaluation Criteria: Relevance: Audience match with your target learners. Reach: Subscriber/follower count. Engagement: Comments, likes, genuine interaction (engagement rate 2-5% is good). Authenticity: Organic growth, genuine content. Past Partnerships: Quality of previous collaborations.

Pricing Benchmarks: Micro-influencers (10K-100K): Rs 5,000-25,000 per post. Mid-tier (100K-500K): Rs 25,000-1,00,000 per post. Macro (500K-1M): Rs 1,00,000-5,00,000 per post. Mega (1M+): Rs 5,00,000+ per post. Educator specialists often premium above these rates.

Campaign Execution: Briefing: Clear objectives and messaging. Creative guidelines, not scripts. Brand dos and don''ts. Disclosure requirements.

Content Approval: Review before publishing. Balance control with authenticity. Timely feedback.

Tracking: Unique promo codes. UTM-tagged links. Dedicated landing pages. Attribution tracking.

Building Educator Network: Teacher Ambassador Program: Recruit teachers as brand advocates. Provide free access to courses. Commission on referrals. Community and recognition.

Content Creator Program: Invite educators to create content on your platform. Revenue share model. Support in production. Platform promotion.

Long-term Relationships: Regular engagement and updates. Exclusive previews and input. Recognition and rewards.',
        '["Identify 20 potential influencer/educator partners in your niche", "Create influencer outreach and evaluation process", "Design affiliate program structure and commission rates", "Build educator community program framework"]'::jsonb,
        '["Influencer Discovery and Evaluation Template", "Partnership Outreach Email Templates", "Affiliate Program Structure Guide", "Educator Community Program Framework"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_7_id, 35, 'Referral Programs and Viral Growth',
        'Referral programs leverage satisfied learners to acquire new customers at low cost. Well-designed referral mechanics can create viral growth loops.

Referral Program Fundamentals: Why Referrals Work: Trust: Recommendation from known person. Relevance: Referred by someone with similar needs. Lower CAC: No media cost. Higher Quality: Referred customers often have better LTV.

Key Metrics: Referral Rate: % of customers who refer. Viral Coefficient: New customers per existing customer. Referral CAC: Cost per referred customer. Referral LTV: Lifetime value of referred customers (typically higher).

Referral Program Design: Incentive Structure: Referrer Incentive: What the referrer gets. Options: Cash, credits, course access, merchandise. Referee Incentive: What the new customer gets. Options: Discount, free trial, bonus content.

Incentive Examples: Physics Wallah: Referral credits toward courses. Unacademy: Free subscription days. upGrad: Cash rewards for successful referrals.

Program Mechanics: Simple Process: One-click sharing. Easy-to-remember referral code. Clear tracking and attribution.

Multi-Channel Sharing: WhatsApp (dominant in India). Social media. Email. Direct link.

Timely Rewards: Instant gratification when possible. Clear communication of reward status. Easy redemption.

Gamification: Leaderboards for top referrers. Tiered rewards (more referrals = better rewards). Challenges and campaigns.

Building Referral Into Product: Milestone Triggers: Course completion (moment of satisfaction). Achievement (badge earned, certificate). Success story (job placement).

In-Product Prompts: Share progress on social media. Invite friends to learn together. Referral reminders in key moments.

Social Proof: Display referral activity. Show what friends are learning. Learning communities.

Measuring Referral Program: K-Factor Calculation: K = (invites sent per user) x (conversion rate of invites). K > 1 means viral growth. Example: If each user sends 5 invites, 15% convert: K = 5 x 0.15 = 0.75.

Referral Funnel: Eligible users (who can refer). Active referrers (who actually refer). Invites sent. Invites converted.

Cost Analysis: Compare referral CAC to other channels. Include incentive cost in CAC. Factor in higher LTV of referred customers.

Optimizing Referral Programs: A/B Testing: Incentive amounts. Incentive types (cash vs credits vs discounts). Messaging and positioning. Timing of referral prompts.

Reducing Friction: Pre-written messages. One-click WhatsApp share. QR codes for offline sharing.

Incentive Optimization: Test different amounts. Ensure incentive is meaningful but sustainable. Consider asymmetric rewards (higher for referrer vs referee).',
        '["Design referral program structure with incentives", "Build referral mechanics into product experience", "Create referral tracking and measurement system", "Plan referral program launch and promotion"]'::jsonb,
        '["Referral Program Design Template", "Viral Coefficient Calculator", "Referral Program A/B Testing Guide", "Referral Launch Plan Template"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 8: EdTech Business Models (Days 36-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'EdTech Business Models', 'Build sustainable EdTech business - pricing strategies, unit economics, B2B sales, outcome-based models, and path to profitability.', 7, NOW(), NOW())
    RETURNING id INTO v_mod_8_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_8_id, 36, 'EdTech Pricing Strategy',
        'Pricing is critical to EdTech viability. Price too high and you limit addressable market; price too low and unit economics fail. Understanding India-specific pricing dynamics is essential.

Indian EdTech Pricing Context: Price Sensitivity: India ARPU significantly lower than Western markets. Mass market: Rs 500-2,000/month. Premium: Rs 5,000-15,000/month. High-ticket: Rs 50,000-5,00,000 (degree programs).

Competitive Pressure: Well-funded players subsidize prices. Free alternatives (YouTube, SWAYAM) set expectations. Price wars common in test prep.

Payment Capabilities: UPI enables small payments. EMI essential for higher amounts. Credit card penetration limited.

Pricing Models: Subscription: Monthly or annual recurring payment. Advantages: Predictable revenue, relationship focus. Challenges: Churn management, continuous value delivery. Best for: Ongoing learning, professional development.

Course Purchase: One-time payment for course access. Advantages: Simple, higher upfront revenue. Challenges: Continuous acquisition needed. Best for: Specific skills, certifications.

Freemium: Free basic, paid premium. Advantages: Large funnel, try-before-buy. Challenges: Conversion optimization, free tier costs. Best for: Building audience, competitive markets.

Tiered Pricing: Multiple price points for different needs. Basic/Standard/Premium tiers. Best for: Diverse audience needs.

Per-Seat (B2B): Per-user licensing for institutions. Advantages: Scalable with adoption. Best for: B2B SaaS, institutional sales.

Pricing Psychology: Anchoring: Show original price alongside discounted price. Higher reference increases perceived value.

Charm Pricing: Rs 999 vs Rs 1000. Works in Indian context.

Bundling: Course bundles at discount. Increases average order value.

Urgency: Limited-time offers. Enrollment deadlines. Cohort-based scarcity.

Price Testing: A/B Test: Test different prices with similar audiences. Measure conversion and revenue. Van Westendorp Analysis: Survey-based price sensitivity. Find acceptable price range. Conjoint Analysis: Feature-price tradeoff analysis.

Price Segmentation: Geographic: Lower prices for Tier 2/3 cities. Student/Professional: Student discounts. Early Bird: Lower price for early enrollment. Group: Discounts for group enrollment.

EMI and Financing: EMI Essential for High-Ticket: Programs above Rs 20,000 benefit from EMI. Razorpay, PayU offer no-cost EMI. EMI increases conversion 2-3x for high-ticket.

Income Share Agreements: Pay after placement. Reduces upfront barrier. Complex to implement.',
        '["Research competitor pricing in your segment", "Define pricing model (subscription vs one-time vs freemium)", "Design pricing tiers with feature differentiation", "Plan pricing tests and optimization approach"]'::jsonb,
        '["Competitor Pricing Analysis Template", "Pricing Model Selection Framework", "Price Testing Methodology Guide", "EMI and Financing Integration Guide"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_8_id, 37, 'Unit Economics Optimization',
        'Sustainable EdTech requires positive unit economics. Understanding and optimizing the relationship between customer acquisition cost, lifetime value, and margins is essential for building a viable business.

Unit Economics Framework: Customer Acquisition Cost (CAC): Total sales and marketing spend / new customers acquired. Include: advertising, sales salaries, marketing tools, content marketing. Segment by channel to understand channel efficiency.

Lifetime Value (LTV): Total revenue from a customer over relationship. For subscription: ARPU x Average customer lifetime. Include: repeat purchases, upgrades, referral value.

LTV:CAC Ratio: Target: 3:1 or higher (3x LTV to CAC). Below 3: Unprofitable growth. Above 5: Possibly under-investing in growth.

Payback Period: Time to recover CAC from customer revenue. Target: Under 12 months. Longer payback = more capital required.

Gross Margin: (Revenue - Direct costs) / Revenue. Include: content hosting, payment processing, variable support. Target: 60-80% for digital products.

Contribution Margin: Revenue - Variable costs - CAC. Positive contribution margin = profitable customer.

Optimizing CAC: Channel Mix: Double down on efficient channels. Reduce spend on high-CAC channels. Build organic channels (content, SEO, referral).

Conversion Optimization: Website conversion rate improvement. Landing page testing. Sales process efficiency.

Lead Quality: Better targeting for higher quality leads. Qualification before sales investment.

Sales Efficiency: Sales team productivity metrics. Inside sales vs field sales mix. Self-serve vs sales-assisted.

Optimizing LTV: Increase ARPU: Upsell and cross-sell. Premium tiers and add-ons. Price optimization.

Extend Customer Lifetime: Reduce churn through engagement. Continuous value delivery. Community building.

Referral Value: Referral program to increase customer value. Include referral revenue in LTV calculation.

Cohort Analysis: Track unit economics by acquisition cohort. Compare cohorts to understand trends. Early indicator of business health.

EdTech-Specific Challenges: High CAC: Competitive market drives up acquisition costs. Solution: Build organic channels, improve conversion.

Low ARPU: Indian price sensitivity limits ARPU. Solution: Volume, B2B, or premium positioning.

High Churn: Learning completion is hard. Solution: Engagement, outcomes focus, community.

Long Sales Cycles: Education is high-consideration. Solution: Nurture sequences, content marketing.

Scenario Modeling: Build financial model with: Variable CAC by channel. Retention curves by cohort. Revenue mix (subscription, one-time, B2B). Test scenarios: optimistic, base, pessimistic.',
        '["Calculate current CAC by acquisition channel", "Estimate LTV based on retention and revenue data", "Build cohort analysis to track unit economics over time", "Create financial model with unit economics scenarios"]'::jsonb,
        '["Unit Economics Calculator Template", "Cohort Analysis Template", "LTV Optimization Strategies Guide", "Financial Model Template for EdTech"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_8_id, 38, 'B2B EdTech Sales',
        'B2B EdTech (selling to schools, colleges, and corporates) offers more predictable revenue and higher contract values than B2C, but requires different sales approaches and longer cycles.

B2B EdTech Segments: K-12 Schools: 1.5 million schools in India (1.1 million government, 0.4 million private). Buying: LMS, assessment tools, supplementary content. Decision makers: Principals, management, sometimes state education departments. Budget cycles: April-May (new academic year).

Higher Education Institutions: 1,000+ universities, 50,000+ colleges. Buying: LMS, content, placement services. Decision makers: Registrar, Dean, Department heads. Budget cycles: Annual, often March-April.

Coaching Institutes: 10,000+ organized coaching centers. Buying: Content, technology platforms, test series. Decision makers: Owners, academic heads. Budget cycles: Based on admission cycles.

Corporate L&D: Every large company has training needs. Buying: Skill development, leadership training, compliance. Decision makers: HR heads, L&D managers. Budget cycles: Usually Q4 (next year planning).

B2B Sales Process: Lead Generation: Outbound: Email campaigns, LinkedIn outreach, cold calling. Inbound: Content marketing, webinars, events. Referrals: Existing customers, network.

Qualification: BANT: Budget, Authority, Need, Timeline. Identify decision makers and influencers. Understand procurement process.

Discovery: Deep understanding of needs and pain points. Map to your solution capabilities. Build champion within organization.

Demonstration: Tailored demo addressing specific needs. Proof of concept or pilot. Reference customers.

Proposal: Custom proposal addressing requirements. Pricing with clear ROI articulation. Implementation plan.

Negotiation: Commercial terms discussion. Contract review (legal involvement). Close and contract signing.

Implementation: Onboarding and setup. Training and change management. Success measurement.

Enterprise Sales Team: Sales Development Representatives (SDRs): Lead qualification and initial outreach. Rs 4-8 LPA salary range.

Account Executives (AEs): Demo, proposal, close. Rs 12-25 LPA salary range.

Customer Success: Post-sale relationship. Retention and expansion. Rs 8-15 LPA salary range.

Pricing for B2B: Per-User Pricing: Rs 500-2,000 per student per year. Scales with adoption. Easy to understand.

Site License: Flat fee for unlimited use. Rs 5-50 lakh per year depending on institution size. Predictable for buyer.

Outcome-Based: Tied to placement, pass rates. Higher price for guaranteed outcomes. Complex to structure.

B2B Sales Metrics: Pipeline: Value and stage of opportunities. Conversion rates by stage. Average deal size.

Velocity: Sales cycle length. Time in each stage. Bottleneck identification.

Productivity: Deals per rep. Revenue per rep. Activity metrics (calls, demos, proposals).',
        '["Define B2B target segments and ideal customer profile", "Build B2B sales process and qualification criteria", "Create sales collateral: pitch deck, case studies, proposal template", "Design sales team structure and compensation"]'::jsonb,
        '["B2B Sales Process Template for EdTech", "B2B Qualification Framework (BANT)", "Enterprise Sales Collateral Templates", "Sales Team Structure and Compensation Guide"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_8_id, 39, 'Outcome-Based and ISA Models',
        'Outcome-based pricing models tie revenue to learner results, aligning EdTech incentives with student success. Income Share Agreements (ISA) represent the most aggressive form of outcome-based pricing.

Outcome-Based Models Spectrum: Job Guarantee: Promise placement or refund. Lower price with guaranteed outcome. Risk on EdTech company.

Pay-on-Placement: Fee paid only if placed. EdTech bears upfront risk. Strong alignment with outcomes.

Income Share Agreement (ISA): Pay percentage of salary after placement. Deferred payment, risk-sharing. Complex legal and operational.

Performance-Based Pricing: Tiered pricing based on outcomes. Higher fee for better placement.

Income Share Agreement Deep Dive: ISA Structure: Learner pays percentage of salary (typically 10-18%). Payment for fixed period (typically 24-36 months). Payment cap (usually 1.5-2x course price). Income threshold (minimum salary to trigger payment).

Example: Course value: Rs 2,00,000. ISA: 15% of salary for 24 months. Income threshold: Rs 5 LPA. Payment cap: Rs 4,00,000. If graduate earns Rs 8 LPA: Monthly payment = Rs 10,000. Total over 24 months = Rs 2,40,000 (capped at Rs 4,00,000).

ISA Players in India: Masai School: Full-stack development, no upfront fee. Lambda School model for India. Newton School: Similar model for tech education. Scaler: Hybrid model with ISA option.

Operational Requirements: Strong Placement: Must have robust placement capabilities. Employer relationships and job pipeline. Career services team.

Student Selection: Selective admission for ISA candidates. Assessment of placement likelihood. Reduce risk through quality intake.

Payment Collection: Payment servicing infrastructure. Salary verification mechanism. Collections process for non-payment.

Legal Structure: ISA agreement terms. Regulatory compliance (not treated as loan). State-specific considerations.

Financial Implications: Cash Flow: Upfront investment in student education. Revenue deferred 3-6+ months. Requires capital to fund cohorts.

Risk: Placement failure risk. Non-payment risk. Economic downturn risk.

Unit Economics: Higher LTV if successfully placed. Factor in default rates. Collections cost.

Hybrid Models: Combine ISA with upfront payment. Example: Rs 50,000 upfront + 10% ISA. Reduces risk, improves cash flow. Maintains alignment with outcomes.

When Outcome-Based Works: Career Transition Programs: Clear before/after salary comparison. Measurable outcome (job placement).

High-Demand Skills: Strong employer demand ensures placement. Tech, data science, digital marketing.

Quality Control: Selective admission. Rigorous curriculum. Strong career services.',
        '["Evaluate outcome-based model feasibility for your programs", "Design ISA or job guarantee structure if applicable", "Build placement capability requirements", "Create financial model for outcome-based scenarios"]'::jsonb,
        '["ISA Structure Design Template", "Placement Capability Requirements Checklist", "Outcome-Based Financial Model", "ISA Legal Considerations Guide"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_8_id, 40, 'Path to EdTech Profitability',
        'Achieving profitability in EdTech requires careful balance of growth and efficiency. Post-2022 market correction has made profitability the key success metric, replacing growth-at-all-costs.

Profitability Benchmarks: Gross Margin: Target 70%+ for pure digital. 50-60% acceptable for hybrid. Content and hosting are main COGS.

Operating Margin: Best-in-class: 15-25% (Physics Wallah territory). Healthy: 5-15%. Breakeven acceptable for growing companies.

Net Margin: After all costs including taxes. 10-20% for mature EdTech.

Path to Profitability Levers: Revenue Optimization: Price increases (careful testing). Upsell and cross-sell. B2B revenue (higher margin). Premium offerings.

CAC Efficiency: Shift to organic channels. Improve conversion rates. Referral program investment. Better targeting.

Retention: Reduce churn through engagement. Community building. Continuous value delivery.

Operational Efficiency: Right-size team. Technology vs labor decisions. Outsource non-core functions.

Profitability Timeline: Year 1-2: Invest in product and initial growth. Negative margins acceptable with clear unit economics. Focus on product-market fit.

Year 3-4: Path to contribution margin positive. Improving unit economics. Scaling efficient channels.

Year 5+: Operating profitability. Sustainable growth rate. Cash flow positive.

Learning from Profitable EdTech: Physics Wallah: Low-cost acquisition (YouTube content). Affordable pricing (mass market). Lean operations. Teacher-centric model.

upGrad: High-ticket programs (premium ARPU). University partnerships (credibility). B2B revenue mix. Placement focus.

Common Mistakes: Over-hiring: Building large teams before revenue justifies. Keep team lean until product-market fit. Outsource initially.

Over-spending on Marketing: Heavy paid marketing without positive unit economics. Build organic channels first.

Feature Creep: Building features nobody asked for. Focus on core product excellence.

Geographic Over-expansion: Spreading thin across markets. Dominate one market before expanding.

Cash Flow Management: Education is capital intensive. Students pay over time. Collection cycles long. Plan cash flow carefully.

Investor Perspective: Post-2022 market favors profitability. Profitable growth over growth-at-all-costs. Unit economics scrutiny. Path to profitability required for funding.',
        '["Create profitability roadmap with timeline and milestones", "Identify top 5 levers for improving profitability", "Build detailed P&L model with path to profitability", "Define key metrics to track on profitability journey"]'::jsonb,
        '["EdTech Profitability Roadmap Template", "Cost Optimization Checklist", "P&L Model Template with Profitability Scenarios", "Profitability Metrics Dashboard"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 9: Skill Development & NSDC (Days 41-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Skill Development & NSDC', 'Navigate India''s skill development ecosystem - NSDC partnerships, Sector Skill Councils, NSQF alignment, Skill India schemes, and building job-ready programs.', 8, NOW(), NOW())
    RETURNING id INTO v_mod_9_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_9_id, 41, 'India Skill Development Ecosystem',
        'India faces a massive skill gap with 500 million people needing skilling by 2022 (target) and beyond. The government has created extensive infrastructure for skill development, creating significant opportunities for EdTech companies.

Skill India Mission Overview: Launched in 2015 with goal to train 400 million people by 2022. Ministry of Skill Development and Entrepreneurship (MSDE) leads implementation. Key components: National Skill Development Corporation (NSDC), Sector Skill Councils (SSCs), Pradhan Mantri Kaushal Vikas Yojana (PMKVY), Industrial Training Institutes (ITIs).

National Skill Development Corporation (NSDC): Public-Private Partnership (Government: 49%, Private: 51%). Funding and enabling body for skill development. Has funded 600+ training partners. Target: Enable 15 crore skilled workforce by 2025.

NSDC Functions: Funding: Equity, loans, grants to training providers. Standards: Quality assurance and assessment. Certification: National skill certification through SSCs. Placement: Employment linkage support.

Sector Skill Councils (SSCs): 38 SSCs covering all major sectors. Industry-led bodies for sector-specific skilling. Functions: Develop National Occupational Standards. Create Qualification Packs. Accredit training providers. Conduct assessments and certification.

Key SSCs for EdTech: IT-ITeS SSC: Software, BPO, IT services. Electronics SSC: Hardware, IoT, embedded systems. Management & Entrepreneurship SSC: Business skills. Media & Entertainment SSC: Content, animation, gaming. Healthcare SSC: Allied health, nursing. Banking & Finance SSC: BFSI skills.

National Skills Qualifications Framework (NSQF): 10-level framework aligning qualifications. Level 1: Basic tasks, Level 10: Doctoral equivalent. Each level has defined competencies. Enables credit transfer and progression.

NSQF Alignment: EdTech courses can be NSQF-aligned. Provides national recognition. Enables credit toward formal qualifications. Requires SSC approval and assessment.

Market Opportunity: Total skill development market: Rs 50,000+ crore. Government spending: Rs 12,000+ crore annually on skill schemes. Corporate spending: Growing L&D budgets. Individual spending: Career-driven skill acquisition.

EdTech in Skill Development: Traditional skill development is center-based. EdTech enables: Scale and reach. Lower cost of delivery. Quality standardization. Outcome tracking.',
        '["Study NSDC structure and funded partner ecosystem", "Map relevant Sector Skill Councils for your focus areas", "Understand NSQF framework and alignment requirements", "Research PMKVY and other skill scheme structures"]'::jsonb,
        '["NSDC Ecosystem Overview Guide", "Sector Skill Council Directory with contact information", "NSQF Level Descriptions and Alignment Guide", "Skill Development Scheme Comparison Matrix"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_9_id, 42, 'NSDC Partnership Models',
        'Partnering with NSDC and its ecosystem provides access to funding, certification, and placement support. Understanding partnership models and requirements is essential for EdTech companies in skill development.

NSDC Partnership Types: Training Partner: Deliver NSDC-funded training programs. Access to PMKVY and other scheme funding. Required: Accreditation, infrastructure norms.

Assessment Body: Conduct third-party assessments for certification. Revenue from assessment fees. Required: SSC empanelment.

Technology Partner: Provide technology solutions to NSDC ecosystem. LMS, assessment platforms, tracking systems. Procurement-based engagement.

Content Partner: Develop curriculum and content for skill programs. Aligned with National Occupational Standards. Revenue from content licensing.

Becoming NSDC Training Partner: Eligibility: Registered company with 3+ years existence. Financial viability (minimum turnover requirements). Relevant domain expertise. Accreditation Process: Apply to relevant Sector Skill Council. Undergo SSC assessment. Meet Qualification Pack requirements. Receive accreditation.

Infrastructure Norms: Physical centers (for practical training). Equipment as per job role requirements. Qualified trainers (certified by SSC). Digital infrastructure for blended delivery.

PMKVY Partnership: Pradhan Mantri Kaushal Vikas Yojana is flagship skill scheme. PMKVY 4.0 (current phase) emphasizes: Industry-linked training. On-the-job training (OJT). Digital and blended delivery. Placement-linked outcomes.

Training Cost Reimbursement: Government reimburses training cost per candidate. Rates vary by sector and job role (Rs 5,000-25,000 per candidate). Payment linked to certification and placement.

Compliance Requirements: Daily attendance tracking (Aadhaar-linked). Assessment by third-party assessment bodies. Placement tracking for 12 months. Regular audits and inspections.

EdTech as Training Partner: Blended Model: Online content + practical center. Reduces center infrastructure cost. Expands geographic reach.

Pure Online: Permitted for select job roles. Limited but growing scope. Requires SSC approval.

Technology Enablement: Provide platform to existing training partners. B2B model serving NSDC ecosystem. Lower regulatory burden.

Revenue from NSDC Ecosystem: Scheme Funding: Rs 5,000-25,000 per candidate trained. Assessment Fees: Rs 500-1,500 per assessment. Technology Licensing: B2B SaaS to training partners. Corporate CSR: Corporates funding skill development.',
        '["Evaluate NSDC partnership feasibility for your EdTech", "Identify relevant SSCs and accreditation requirements", "Understand PMKVY funding structure and compliance", "Design partnership strategy: training partner vs technology partner"]'::jsonb,
        '["NSDC Training Partner Application Guide", "SSC Accreditation Requirements by sector", "PMKVY Scheme Guidelines and Funding Rates", "NSDC Partnership Strategy Decision Framework"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_9_id, 43, 'Sector Skill Council Engagement',
        'Sector Skill Councils (SSCs) are the key bodies for industry-recognized skill certification. Engaging effectively with SSCs opens doors to certification, funding, and industry connections.

SSC Structure and Governance: Industry-led bodies with corporate governance. Board comprising industry leaders. CEO manages operations. Technical committees develop standards. Funded through: NSDC grants, assessment revenue, membership fees.

Key SSCs for EdTech: NASSCOM SSC (IT-ITeS): Covers software, BPO, IT services. Large industry with strong employer demand. Job roles: Software developer, data analyst, cloud engineer, etc. Website: sscnasscom.com

Electronics SSC (ESSCI): Hardware, IoT, embedded systems. Growing sector with government push. Job roles: Electronics technician, IoT developer, embedded engineer.

BFSI SSC: Banking, financial services, insurance. Large employer base. Job roles: Banking associate, insurance agent, financial analyst.

Media & Entertainment SSC (MESC): Content creation, animation, gaming. Creative industry skills. Job roles: Content writer, animator, video editor, game developer.

Healthcare SSC (HSSC): Allied health, nursing support. Critical sector with shortage. Job roles: General duty assistant, phlebotomist, ECG technician.

Working with SSCs: Qualification Pack (QP) Development: QPs define job roles and competencies. Industry input shapes QP content. EdTech can contribute to QP development. Opportunity to influence standards.

Training Provider Affiliation: Apply for affiliation with relevant SSC. Meet infrastructure and trainer requirements. Receive authorization to train for specific QPs.

Assessment Partnership: Become empaneled assessment body. Conduct assessments for SSC certification. Revenue from assessment fees.

Curriculum Alignment: Align content with National Occupational Standards (NOS). Each QP has multiple NOS components. Content must map to NOS competencies. SSC review and approval.

Certification Process: Training: Candidate completes training program. Assessment: Third-party assessment (theory + practical). Certification: SSC issues certificate on passing. Digital Certificate: Stored in NAD/DigiLocker.

Industry Connect: SSCs provide industry linkage. Placement support through employer network. Industry advisory for curriculum relevance. Corporate partnerships for training.

SSC Engagement Strategy: Identify Relevant SSCs: Map your content areas to SSC domains. Select 1-2 SSCs for initial focus.

Build Relationships: Attend SSC events and meetings. Connect with SSC leadership. Participate in working groups.

Pilot Programs: Start with limited pilot for certification. Demonstrate quality and outcomes. Scale based on success.

Long-term Partnership: Curriculum development collaboration. Joint programs with industry. Assessment body role.',
        '["Identify 2-3 relevant SSCs for your EdTech focus", "Research QPs and NOS in your target domain", "Connect with SSC teams and understand affiliation process", "Plan curriculum alignment with NOS"]'::jsonb,
        '["SSC Directory with contact and QP information", "QP and NOS Alignment Template", "SSC Affiliation Application Checklist", "SSC Engagement Strategy Template"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_9_id, 44, 'Building Job-Ready Programs',
        'Job-readiness is the ultimate measure of skill program success. Designing programs that genuinely prepare learners for employment requires understanding employer needs, incorporating practical skills, and building placement infrastructure.

Job-Ready Program Elements: Industry-Aligned Curriculum: Based on current job requirements. Input from employers and industry. Regular updates as requirements evolve. Beyond theoretical knowledge to practical skills.

Practical Application: Hands-on projects and exercises. Real-world problem solving. Portfolio building. Simulated work environment.

Soft Skills: Communication (written, verbal, presentation). Teamwork and collaboration. Problem-solving and critical thinking. Time management and productivity.

Assessment and Certification: Skills-based assessment. Industry-recognized certification. Employer validation.

Placement Support: Resume building and interview prep. Job matching and referrals. Career counseling.

Employer Engagement: Employer Input on Curriculum: Regular feedback from hiring managers. Skills gap analysis. Industry advisory board. Curriculum updates based on feedback.

Hiring Partnerships: Build relationships with hiring companies. Exclusive hiring pipeline. Campus-style recruitment. Apprenticeship programs.

Industry Projects: Real projects from companies. Mentorship from industry professionals. Exposure to work environment.

Placement Infrastructure: Placement Cell: Dedicated team for placement support. Employer relationship management. Job sourcing and matching. Interview coordination.

Career Preparation: Resume and LinkedIn optimization. Interview skills training. Mock interviews with feedback. Salary negotiation guidance.

Job Matching: Skills-based matching algorithm. Employer preferences matching. Geographic and preference consideration.

Tracking and Reporting: Placement rate tracking. Salary data collection. Employer feedback. Outcome reporting.

Apprenticeship and OJT: Apprenticeship Act: Legal framework for apprenticeships. Employer incentives under NAPS (National Apprenticeship Promotion Scheme). EdTech can facilitate apprenticeship matching.

On-the-Job Training (OJT): Practical training at employer site. Combines learning with earning. PMKVY includes OJT component. Improves placement outcomes.

Measuring Job-Readiness: Placement Rate: % of completers placed within X months. Target: 70%+ for quality programs.

Time to Placement: Average time from completion to employment. Target: Under 3 months.

Salary Levels: Average starting salary of placed candidates. Salary improvement for career changers.

Employer Satisfaction: Feedback from hiring employers. Repeat hiring as indicator. Employer NPS.

Retention: How long placed candidates stay employed. Early attrition indicates fit issues.',
        '["Design job-ready curriculum with employer input", "Build employer partnership program", "Create placement cell structure and processes", "Define placement metrics and tracking system"]'::jsonb,
        '["Job-Ready Curriculum Design Framework", "Employer Partnership Program Template", "Placement Cell Operations Guide", "Placement Metrics Dashboard Template"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_9_id, 45, 'Skill India Schemes and Funding',
        'Multiple government schemes fund skill development in India. Understanding and leveraging these schemes can significantly reduce the cost of training delivery and expand reach.

Key Skill Development Schemes: PMKVY (Pradhan Mantri Kaushal Vikas Yojana): Flagship scheme, largest scale. Free training for candidates. Funding: Rs 5,000-25,000 per candidate. Focus: Short-term training (150-300 hours).

PMKVY 4.0 Features: Industry-linked training emphasis. On-the-job training component. Digital and blended delivery. Recognition of Prior Learning (RPL). International skilling component.

Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY): Focus: Rural youth skill development. Funding: Higher rates than PMKVY. Mandatory placement: 70% placement requirement. Target: 15+ million rural youth.

National Apprenticeship Promotion Scheme (NAPS): Promotes apprenticeship training. Stipend support: 25% of stipend, up to Rs 1,500/month. Cost sharing: Up to Rs 7,500 for basic training cost. Target: 50 lakh apprentices.

Skill Loan Scheme: Loans for skill training programs. Amount: Rs 5,000 to Rs 1.5 lakh. Interest subvention: Government subsidizes interest. Collateral-free up to Rs 1 lakh.

State Skill Missions: Each state has skill development mission. Additional state-level funding. State-specific priorities and schemes. Example: Maharashtra State Skill Development Society.

Accessing Scheme Funding: PMKVY Route: Become accredited training partner. Bid for target allocation. Deliver training as per norms. Receive funding post-certification.

Direct Benefit: Some schemes transfer to candidate directly. Candidate pays for training. Reduces compliance burden.

CSR Funding: Corporate CSR can fund skill training. Skill development is Schedule VII activity. Partner with corporates for CSR projects.

Scheme Compliance: Aadhaar-Based Tracking: All scheme candidates require Aadhaar. Biometric attendance. Geo-tagged training centers.

MIS and Reporting: Regular data submission. Skill Development Management System (SDMS). Real-time monitoring.

Assessment: Mandatory third-party assessment. Minimum passing marks. Practical and theory components.

Placement Tracking: Placement verification. 12-month tracking requirement. Payment linked to placement.

Challenges and Solutions: Compliance Burden: Heavy documentation and reporting. Solution: Invest in systems and processes.

Payment Delays: Scheme payments often delayed. Solution: Working capital management, diversified revenue.

Quality vs Quantity: Pressure to meet targets may compromise quality. Solution: Focus on outcomes, not just numbers.

Strategic Use of Schemes: Blend scheme and commercial revenue. Use schemes for reach, commercial for margins. Build capabilities that work beyond schemes. Scheme funding as customer acquisition cost.',
        '["Research applicable schemes for your skill programs", "Understand scheme compliance requirements", "Evaluate scheme participation feasibility and economics", "Create scheme engagement strategy and timeline"]'::jsonb,
        '["Skill Development Scheme Comparison Guide", "PMKVY Compliance Checklist", "Scheme Funding Calculator", "Scheme Engagement Strategy Template"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    RAISE NOTICE 'Modules 7-9 created successfully for P25 EdTech Mastery - Course Complete';

END $$;

COMMIT;
