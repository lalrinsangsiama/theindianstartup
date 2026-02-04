-- THE INDIAN STARTUP - P1: 30-Day India Launch Sprint - Enhanced Content
-- Migration: 20260204_001_p1_launch_sprint_enhanced.sql
-- Purpose: Enhance P1 course content to 500-800 words per lesson with India-specific data

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_module_1_id TEXT;
    v_module_2_id TEXT;
    v_module_3_id TEXT;
    v_module_4_id TEXT;
BEGIN
    -- Get or create P1 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P1',
        '30-Day India Launch Sprint',
        'Go from idea to incorporated startup with daily action plans. India''s most comprehensive startup launch program covering validation, incorporation, MVP development, and market entry - designed specifically for Indian founders with regulatory compliance, funding guidance, and local market strategies.',
        4999,
        false,
        30,
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

    -- Get product ID if already exists
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P1';
    END IF;

    -- Clean existing modules and lessons for P1
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Foundation & Validation (Days 1-7)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Foundation & Validation',
        'Build your entrepreneurial mindset and validate your startup idea through customer discovery. Learn India-specific market research methods, understand the regulatory landscape, and identify your target segment.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: The Startup Mindset & Opportunity Recognition
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'The Startup Mindset & Opportunity Recognition',
        'India''s startup ecosystem has grown to become the world''s third-largest with over 1.12 lakh DPIIT-recognized startups as of 2024. The ecosystem has created 113 unicorns and generated Rs 10+ lakh crore in economic value. Yet 90% of Indian startups fail within the first 5 years, with 42% failing due to "no market need" - they built something nobody wanted.

The difference between successful founders and failed ones often comes down to mindset. Employee thinking focuses on tasks, predictability, and incremental improvement. Entrepreneur thinking embraces uncertainty, obsesses over customer problems, and creates 10x solutions.

Use the PAINS framework for systematic opportunity identification: P - Personal problems you face daily (your lived experience is valuable), A - Access to markets you can uniquely reach (your network, geography, expertise), I - Impact and significance of the problem (is it worth solving?), N - Numbers of people affected (TAM considerations), S - Solutions that are missing or inadequate (competitive gaps).

India offers unique startup advantages: 1.4 billion population with 800 million internet users, rising middle class with Rs 50 lakh crore annual consumption, government support through Startup India (Rs 10,000 crore Fund of Funds), and young demographics (median age 28 years). However, challenges include complex regulatory environment, diverse consumer preferences across states, and infrastructure gaps.

Market timing assessment is crucial. Evaluate: Technology enablement (is the enabling tech now affordable?), Regulatory changes (new policies opening markets), Social shifts (changing behaviors post-COVID), and Economic factors (rising incomes, new spending patterns). For example, UPI''s launch enabled the fintech revolution - 12 billion monthly transactions worth Rs 18 lakh crore create massive opportunities.

Pro Tip: The best startup ideas often feel obvious in hindsight. Focus on problems you personally understand deeply. If you''ve worked in healthcare for 5 years, your healthcare startup has higher odds than a random EdTech idea. Domain expertise compounds.',
        '["Complete the Problem Inventory Exercise - document 30 problems you personally face and 20 problems you observe others facing in India", "Create your Opportunity Scoring Matrix rating each problem on: Market Size (TAM >Rs 1000 Cr?), Pain Intensity (will people pay to solve?), Ability to Pay (B2B or affluent B2C?), Competition Level (blue ocean or red ocean?), Your Expertise (unfair advantage?)", "Set up your Entrepreneur OS: dedicated workspace, project management tool (Notion/Trello free tier), and daily 2-hour blocked calendar time for startup work", "Join 3 relevant online communities: LinkedIn groups, Reddit India entrepreneurship, Twitter/X startup circles - list 10 potential mentors to follow"]'::jsonb,
        '["Problem Inventory Template with 50+ India-specific prompts covering urban/rural pain points", "Opportunity Scoring Calculator with weighted criteria and examples", "Entrepreneur Productivity System Setup Guide with free tool recommendations", "India Startup Ecosystem Map 2024 with sector-wise opportunities"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Customer Development & Market Validation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Customer Development & Market Validation',
        'According to CB Insights research, 35% of startups fail because there''s "no market need." In India, this number is even higher at 42% based on IBM-NASSCOM studies. The solution? Customer development - talking to real customers before building anything.

Master the LISTEN customer interview framework developed specifically for Indian founders: L - Learn about their world (understand their context, daily routine, and constraints), I - Identify specific problems (dig into pain points with "tell me about the last time..."), S - Seek concrete examples (move from general complaints to specific incidents), T - Test your assumptions (gently validate or invalidate your hypotheses), E - Explore their decision process (understand how they currently solve the problem and who decides), N - Navigate to next steps (get referrals, follow-ups, and commitment signals).

Critical interview principles: Never pitch your solution during discovery interviews. Ask about past behavior, not future intentions ("What did you do last time?" not "Would you use X?"). Quantify the pain in rupees and time. Identify who has budget authority. Indian consumers often give polite positive feedback - look for actions, not words.

Interview logistics in India: WhatsApp calls work better than formal Zoom for most B2C. In-person chai conversations yield richer insights than structured interviews. Offer Rs 500-1000 gift cards for 30-minute interviews with professionals. Use vernacular languages in Tier 2/3 cities. Record (with permission) and transcribe for pattern analysis.

Target 50 interviews minimum before committing to building. The goal is to invalidate bad ideas quickly and validate good ones with evidence. Great founders talk to 100+ customers before writing a single line of code.

Warning signs your idea might be weak: Nobody can articulate the problem clearly, they have never tried solving it, budget conversations make them uncomfortable, they''re not willing to make introductions. Strong signals: They ask when your solution will be ready, they offer to pay for early access, they make unsolicited introductions.',
        '["Create interview guides with 10-12 questions for your top 3 problem areas - include India-specific context questions", "Build a list of 100 potential interview candidates using: LinkedIn Sales Navigator (free trial), Facebook groups (India-specific), WhatsApp groups, Reddit r/india and r/IndianEntrpreneurs, Twitter/X outreach", "Send 30 outreach messages today using the provided templates - expect 20-30% response rate", "Conduct your first 3 customer interviews using the LISTEN framework - record and take notes"]'::jsonb,
        '["LISTEN Framework Guide with India-specific adaptations for B2B vs B2C", "Customer Interview Question Bank with 100+ questions categorized by stage and sector", "Outreach Message Templates for WhatsApp, LinkedIn, Email with Hindi/English versions", "Interview Recording Setup Guide using Otter.ai, Fireflies, or phone recording"]'::jsonb,
        120,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Market Research Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Market Research Deep Dive',
        'Systematic market research separates serious founders from dreamers. In India, market size estimation is both an art and a science due to the significant informal economy (estimated at Rs 93 lakh crore or 40% of GDP) that doesn''t show up in official statistics.

Master the TAM-SAM-SOM methodology with Indian context: TAM (Total Addressable Market) represents the total market demand for your product/service if you had 100% market share with perfect distribution. For example, India''s EdTech TAM is approximately Rs 4 lakh crore by 2025. SAM (Serviceable Available Market) is the portion of TAM you can realistically serve given your business model, geography, and capabilities. If you''re building for vernacular-language learners, your SAM might be Rs 80,000 crore. SOM (Serviceable Obtainable Market) is what you can capture in 1-3 years given competition and resources - typically 1-5% of SAM for new entrants.

Two approaches to market sizing: Top-down uses industry reports and narrows down (India EdTech market × online segment × competitive share = your opportunity). Bottom-up calculates from unit economics up (Number of potential customers × willingness to pay × conversion rate = your opportunity). Bottom-up is more credible with investors.

Free India market research sources: MOSPI data (mospi.gov.in), RBI reports, IBEF sector reports, Economic Survey, NASSCOM reports for tech, Nielsen India (limited free data), RedSeer reports (summaries), Inc42 data reports, and LinkedIn''s Economic Graph. Paid sources worth considering: Tracxn (startup funding data), Statista India, Euromonitor.

Primary research methods for India: WhatsApp surveys (high response rates), Google Forms distributed through community groups, intercept interviews at malls/markets, expert interviews with industry veterans (offer to buy them lunch), and analyzing social media conversations (especially Twitter/X for B2B, Instagram for D2C).

Secondary research red flags: Avoid using global market data applied to India without adjustments. India''s price points are typically 60-80% lower than Western markets. Always triangulate multiple sources - if three independent sources show similar numbers, you can have higher confidence.',
        '["Calculate TAM, SAM, and SOM for your startup idea using both top-down and bottom-up approaches - document your assumptions clearly", "Conduct secondary research using 5+ free India sources - create a market overview document with key statistics", "Complete competitive analysis for 10 competitors (5 direct, 5 indirect) - map their pricing, positioning, funding, and weaknesses", "Create a market trends document identifying 5 favorable macro trends for your startup (demographic, technological, regulatory, economic, social)"]'::jsonb,
        '["TAM-SAM-SOM Calculator Template with India-specific examples and data sources", "India Market Research Sources Directory with 50+ free resources by sector", "Competitive Analysis Framework with funding data integration (Tracxn, Crunchbase)", "Market Trends Analysis Template with PESTEL framework for India"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Competitive Analysis Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Competitive Analysis Framework',
        'Competition analysis in India requires understanding three competitive layers: organized competitors (funded startups, established companies), unorganized alternatives (local solutions, manual processes), and behavioral competition (apathy, habit, status quo). Most founders only analyze the first layer and miss 80% of the competitive picture.

Porter''s Five Forces adapted for India: 1) Threat of New Entrants - In India, entry barriers are often low (cheap engineering talent, low incorporation costs) but scaling barriers are high (distribution, trust-building, regulatory navigation). 2) Bargaining Power of Suppliers - India has strong supplier ecosystems but relationship-driven negotiations; contracts mean less than relationships. 3) Bargaining Power of Buyers - Indian customers are extremely price-sensitive; discounts and offers drive behavior more than in Western markets. 4) Threat of Substitutes - The biggest substitute is often "doing nothing" or jugaad (workarounds); budget allocation to new categories is challenging. 5) Competitive Rivalry - Funded competitors can afford years of losses; Jio, Reliance Retail, and Tata companies can enter any market overnight.

Create a competitive positioning map with two axes that matter to customers. Common axes: Price vs. Quality, Convenience vs. Comprehensiveness, Local vs. Global, Tech-enabled vs. Traditional. Find "white space" where no competitor exists but customer demand does.

Competitive intelligence sources in India: Company MCA filings (Rs 100-500 per document), GST filings (through vendor intelligence), LinkedIn for employee count and hiring patterns, Glassdoor for company culture and weaknesses, App Store/Play Store for mobile app metrics, SimilarWeb for traffic estimates, Social Blade for social media growth, VC portfolio pages for funding info, and customer reviews on Amazon, Google, Justdial.

Building sustainable competitive advantages in India: Distribution moats (exclusive retail partnerships, hyperlocal network), Regulatory moats (licenses, certifications, compliance expertise), Network effects (marketplaces, social products), Switching costs (data lock-in, integration depth), Brand trust (especially for health, finance, education), and Cost advantages (operational efficiency, scale).

Red flag: If you can''t articulate why you''ll win against well-funded competitors, reconsider the opportunity or niche down significantly.',
        '["Map 10 competitors (5 direct, 5 indirect) using the Competitor Analysis Matrix - include funding raised, team size, revenue estimates, and key weaknesses", "Complete Porter''s Five Forces analysis for your market with India-specific considerations", "Create a 2x2 competitive positioning map showing your differentiation visually", "Identify and document 3 potential sustainable competitive advantages you could build over 2-3 years"]'::jsonb,
        '["Competitor Analysis Matrix Template with data collection checklist", "Porter''s Five Forces Worksheet adapted for Indian markets", "Competitive Positioning Map Tool with examples from 10 sectors", "Competitive Advantage Assessment Framework with moat evaluation criteria"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Target Customer Identification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Target Customer Identification',
        'India''s diversity makes customer segmentation both critical and complex. A "middle-class Indian consumer" could mean vastly different things: a government employee in Bhopal earning Rs 8 lakh/year, a startup employee in Bangalore earning Rs 25 lakh/year, or a small business owner in Surat earning Rs 15 lakh with Rs 50 lakh in undeclared income. Each requires entirely different positioning and channels.

The Ideal Customer Profile (ICP) in India must include: Demographics (age, income, location, family size), Psychographics (values, aspirations, fears), Technographics (smartphone type, apps used, digital literacy), Behavioral patterns (purchase triggers, decision process, information sources), and Economic context (formal/informal income, credit access, price sensitivity).

Indian customer segmentation dimensions: Geography matters enormously - Metro (Bangalore, Mumbai, Delhi NCR), Tier 1 (Pune, Hyderabad, Chennai), Tier 2 (Indore, Lucknow, Coimbatore), Tier 3+ (Bhilai, Guntur, Warangal). Consumer behavior differs dramatically. Language preference (English-first, Hindi-first, regional language-first) affects product and marketing. Socioeconomic Classification (SEC A1 to E2) based on education of chief earner and household assets remains relevant for consumer products.

The beachhead market concept is crucial for resource-constrained startups. Instead of targeting "Indian SMBs," target "restaurants in Bangalore using Zomato for delivery with Rs 20-50 lakh monthly GMV." Instead of "Indian parents," target "English-medium school parents in Pune with children aged 6-10 in CBSE curriculum." The more specific, the faster your initial traction.

Customer journey mapping in India must account for: Discovery (word-of-mouth and WhatsApp forwards dominate over Google search for many categories), Consideration (Indians extensively compare prices across platforms, often using Telegram groups for deal-hunting), Purchase (EMI/credit options significantly boost conversion; 40% of smartphone purchases are EMI-driven), and Post-purchase (high support expectations; negative reviews spread rapidly through social networks).

Warning: Avoid "aspirational ICP" where you define ideal customers as high-income, tech-savvy early adopters just because they''re easier to sell to. Your actual addressable customers might be different.',
        '["Create 3 detailed customer personas based on your customer interviews - include photos, quotes, daily routines, and frustrations", "Define your Ideal Customer Profile with 10+ specific criteria - make it narrow enough that you can identify them immediately", "Identify and document your beachhead market with specific geography, industry, company size, and pain point criteria - target <10,000 potential customers initially", "Map the customer journey from problem awareness to purchase to retention - identify key touchpoints and decision factors at each stage"]'::jsonb,
        '["Customer Persona Template with India-specific fields (language, SEC, digital behavior)", "ICP Definition Worksheet with B2B and B2C examples from Indian startups", "Beachhead Market Selection Framework with validation criteria", "Customer Journey Map Template with India channel considerations (WhatsApp, retail, influencers)"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 6: Value Proposition Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        6,
        'Value Proposition Design',
        'Your value proposition is the core promise that makes customers choose you over alternatives. In India''s highly competitive markets, a weak value proposition means death by discounting. Strong value propositions answer: "Why should I buy from you instead of the 10 other options or doing nothing?"

Use the Value Proposition Canvas with Indian context: Customer Jobs: Functional jobs (what tasks do they need to complete?), Social jobs (how do they want to be perceived by others - this is particularly important in India''s relationship-driven society), Emotional jobs (how do they want to feel?). Customer Pains: Frustrations with current solutions, obstacles to getting the job done, risks they want to avoid. India-specific pains often include: distrust due to past scams, fear of post-purchase support abandonment, family/social approval requirements, and documentation/compliance anxiety. Customer Gains: Required outcomes (minimum expectations), expected outcomes (standard expectations), and desired/unexpected outcomes (delightful surprises).

Effective value proposition patterns for India: Cost savings (quantified in rupees, with ROI calculation - "Save Rs 50,000/month on operations"), Time savings (quantified in hours - "Get GST filing done in 10 minutes instead of 2 hours"), Risk reduction (with guarantee or social proof - "Used by 10,000 restaurants, money-back guarantee"), Status/recognition (important in Indian social context - "Join Swiggy''s exclusive partner program"), Convenience (especially for time-poor professionals and families), and Trust (certifications, brand associations, celebrity endorsements work well).

Value proposition formulas: Simple format: "We help [target customer] to [outcome] by [mechanism] unlike [alternative] which [weakness]." Example: "We help Indian SMB owners file GST returns in 10 minutes by using automated invoice scanning, unlike CAs who charge Rs 3,000/month and still miss deadlines."

Testing your value proposition: The "Mom Test" - would someone who doesn''t love you actually pay for this? The "Headline Test" - would this value prop make someone click/call? The "Competition Test" - does this clearly differentiate from alternatives? The "Rs 10,000 Test" - would your target customer pay Rs 10,000 to solve this problem today?',
        '["Complete the Value Proposition Canvas for your startup - map customer jobs, pains, and gains based on interview insights", "Craft 5 versions of your value proposition statement and test with 5 people each - measure which resonates most (emotional response, follow-up questions)", "Create your positioning statement: For [target], [product] is a [category] that [key benefit] unlike [competition] because [reason to believe]", "Develop 3 different value propositions for 3 customer segments - recognize that enterprise vs SMB vs consumer may need different messaging"]'::jsonb,
        '["Value Proposition Canvas Template with India-specific prompts for pains and gains", "Value Proposition Generator Tool with 20+ winning formulas from Indian startups", "Customer Validation Script for testing value propositions", "Value Proposition Examples Library from 50 successful Indian startups across sectors"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 7: Business Model Canvas Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        7,
        'Business Model Canvas Fundamentals',
        'The Business Model Canvas turns your startup idea into a testable business hypothesis. In India, where execution challenges are often greater than idea challenges, a well-designed business model is the difference between a startup that scales and one that stays stuck.

Nine building blocks with Indian considerations: 1) Customer Segments: Define your beachhead + expansion segments. Consider India''s pyramid: top 20 million (premium pricing viable), next 100 million (value-conscious but spending), and 300+ million (mass market, volume game). 2) Value Propositions: Your validated value prop from Day 6. Ensure it''s strong enough to overcome Indian consumer inertia and skepticism. 3) Channels: India-specific channel considerations - WhatsApp Business (3 billion messages sent daily by businesses), Instagram/YouTube for D2C, retail distribution for FMCG, direct sales for enterprise, resellers/distributors for SMB reach. 4) Customer Relationships: Indians expect high-touch support; automated-only rarely works. Consider vernacular support, WhatsApp-based service, and relationship-building through trust.

5) Revenue Streams: Indian pricing strategies differ significantly. Freemium to paid conversion is typically 1-2% (lower than global 2-5%). Annual plans with discounts convert better than monthly. EMI options increase conversion 40%+ for purchases above Rs 5,000. Razor-and-blade models work well. 6) Key Resources: Access to talent (tech talent concentrated in 5-6 cities), capital (funding ecosystem centered in Bangalore/Mumbai), and data (India Stack provides unique infrastructure). 7) Key Activities: Consider the India-specific activities needed: regulatory compliance, local payment integration, vernacular localization, and on-ground operations. 8) Key Partnerships: In India, strategic partnerships often determine success. Reliance/Jio, Tata, banks, and government platforms (ONDC, GeM) can provide massive distribution. 9) Cost Structure: India offers cost advantages (salaries 60-70% lower than West) but also unique costs (last-mile logistics, cash handling, compliance).

Identify your top 3 riskiest assumptions - these should become your Week 2 validation priorities. Risk categories: Desirability (will customers want this?), Viability (can we make money?), and Feasibility (can we build/deliver this?).

Week 1 Milestone: You should now have validated problem-solution fit with customer evidence, a clear ICP and beachhead market, a compelling value proposition, and a complete Business Model Canvas. If you''re not confident in these, invest more time in customer interviews before proceeding.',
        '["Complete the full Business Model Canvas for your startup - fill in all 9 blocks with specific details, not generic statements", "Identify and rank your top 5 riskiest assumptions in order of risk level and ease of testing", "Design 3 experiments to test your riskiest assumptions in Week 2 - what would prove/disprove each hypothesis?", "Document your Week 1 learnings and key insights - what surprised you? What changed from your original idea?"]'::jsonb,
        '["Business Model Canvas Template with India-specific guidance for each block", "Assumption Testing Prioritization Matrix (Risk vs. Effort)", "Week 1 Validation Checklist with go/no-go criteria", "Business Model Examples Library from 30 successful Indian startups with BMC analysis"]'::jsonb,
        120,
        75,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Building Blocks (Days 8-14)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Building Blocks',
        'Establish the foundational elements of your startup including legal structure, incorporation, branding, and technology decisions. Navigate India''s regulatory requirements efficiently.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 8: Legal Structure Decisions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Legal Structure Decisions',
        'Choosing the right legal structure is one of the most consequential decisions for Indian startups. The choice affects liability protection, taxation, funding eligibility, compliance burden, and eventual exit options. 78% of DPIIT-recognized startups are Private Limited companies for good reason.

Entity comparison for Indian founders: Sole Proprietorship: Simplest structure, no separate legal entity, personal liability for business debts, no limit on personal income tax (up to 30%+), cannot raise equity funding. Best for: freelancers, consultants testing an idea, no-scale lifestyle businesses. Registration: None required, just start trading under your name.

Partnership Firm: Two or more partners share profits/losses, unlimited personal liability, taxed at 30% flat rate, difficult to transfer ownership, limited legal protection. Best for: family businesses, professional practices (law, CA firms). Registration: Optional but recommended, Rs 1,000-2,000 through Registrar of Firms.

LLP (Limited Liability Partnership): Separate legal entity, limited liability for partners, taxed at 30% (no DDT), lower compliance than Pvt Ltd, cannot easily raise equity from VCs (most don''t invest in LLPs). Best for: professional services, consulting businesses, small tech companies not seeking VC funding. Registration: Rs 3,000-5,000 through MCA, 15-20 days.

Private Limited Company: Separate legal entity with limited liability, can have 2-200 shareholders, can issue ESOPs, VC-preferred structure, eligible for Startup India benefits, taxed at 25% for turnover <Rs 400 Cr (22% if forgoing exemptions). Higher compliance: ROC filings, audits, board meetings. Registration: Rs 7,000-15,000 through MCA SPICe+ form, 7-15 days. Best for: any startup planning to raise funding or scale significantly.

One Person Company (OPC): Single owner alternative to Pvt Ltd, limited liability, easier compliance than Pvt Ltd, but mandatory conversion to Pvt Ltd if paid-up capital exceeds Rs 50 lakh or turnover exceeds Rs 2 crore. Best for: solo founders testing before adding co-founders.

Section 8 Company: Non-profit structure for social enterprises, 80G tax benefits for donors, profits must be reinvested, can receive CSR funds. Best for: impact-focused organizations, NGO activities.

Decision framework: Choose Pvt Ltd if: planning to raise funding, building for scale, want clear exit options, or need ESOP pool. Choose LLP if: service business, no external funding planned, want simplicity, or partnership-based decision making.',
        '["Complete the Entity Type Decision Matrix - score each option on: Liability Protection, Tax Efficiency, Funding Eligibility, Compliance Burden, Exit Flexibility", "Calculate 5-year compliance cost comparison for LLP vs Pvt Ltd (registration + annual filings + audits + professional fees)", "Evaluate tax implications: model your expected revenue and compare effective tax rates across structures", "Make your final decision and document the rationale - create a one-page justification for future reference"]'::jsonb,
        '["Entity Type Comparison Matrix with 2024 tax rates and compliance requirements", "5-Year Compliance Cost Calculator by entity type", "Tax Implications Calculator with exemptions and deductions", "Legal Structure Decision Framework with decision tree"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 9: Incorporation Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Incorporation Process',
        'The MCA has significantly streamlined incorporation through the SPICe+ (INC-32) form, enabling one-stop registration with PAN, TAN, GST, EPFO, and ESIC in a single application. The entire process can be completed in 7-15 days at a cost of Rs 7,000-15,000 (government fees + professional charges).

Pre-incorporation requirements: Digital Signature Certificate (DSC): Class 2 or Class 3 DSC required for all directors/subscribers. Cost: Rs 800-1,500 from authorized vendors (eMudhra, Sify, n-Code). Processing time: 1-3 days. Validity: 2-3 years. DIN (Director Identification Number): Applied within SPICe+ form itself now. Each director needs DIN. Foreign nationals can also get DIN with additional documentation.

Company name selection: Apply through RUN (Reserve Unique Name) form or within SPICe+ Part A. Rules: Name should not be identical or similar to existing companies (check on MCA21 portal), should not violate Emblems and Names Act, should include "Private Limited" at the end, and should indicate business nature if using generic words. Tips: Run 4-5 name options, check trademark conflicts (ipindiaservices.gov.in), avoid common words that trigger rejections. Cost: Rs 1,000 for RUN application. Approval time: 2-5 days.

Key documents required: Identity proof of directors/subscribers (Aadhaar + PAN mandatory), Address proof of directors (Passport/Voter ID/Driving License), Photograph of directors (passport size), Proof of registered office (ownership document or rent agreement + NOC from owner + utility bill not older than 2 months), and Declaration by first directors (INC-9).

MOA and AOA considerations: MOA (Memorandum of Association) defines the company''s objects - keep it broad enough for future pivots but specific enough for clarity. Include main objects, ancillary objects, and other objects. AOA (Articles of Association) governs internal management. Key provisions to customize: Board composition, quorum requirements, share transfer restrictions, ESOP provisions, and investor protection clauses (if planning to raise funds).

Authorized capital considerations: Authorized capital is the maximum shares the company can issue. Start with Rs 1-10 lakh for most startups. Increasing later costs Rs 2,500-5,000. Issued capital is what''s actually distributed to shareholders - can be less than authorized.',
        '["Apply for DSC for all proposed directors from authorized vendors - allow 2-3 days for delivery", "Check name availability on MCA portal for your top 5 company name options and run trademark conflict check", "Prepare all director KYC documents: Aadhaar, PAN, address proof, photos - ensure all are current and clear", "Arrange registered office documentation: rental agreement (if rented) + NOC from landlord + electricity bill (within 2 months)"]'::jsonb,
        '["DSC Application Guide with vendor comparison and pricing", "Company Name Availability Checker with naming rules reference", "Director KYC Document Checklist with format specifications", "Registered Office Documentation Template with NOC format"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 10: Branding Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Branding Fundamentals',
        'Your brand is the promise you make to customers and how they perceive you. In India''s cluttered market with low brand loyalty among price-sensitive consumers, strong branding can be the difference between building a commodity business and building a premium one. Indian consumers increasingly trust brands - 73% of urban Indians say brand matters in purchase decisions.

Brand naming for Indian market: Characteristics of successful Indian startup names: Easy to pronounce in multiple languages (test in Hindi, Tamil, Bengali), Short (ideally 2-3 syllables), Memorable and unique, Domain available (.com preferred, .in acceptable), Social handles available, No negative connotations in regional languages, Trademark available.

Naming approaches: Descriptive (Swiggy - swift + piggy), Invented (Flipkart - combined flip + shopping cart), Acronym (CRED - Credit Card payment app), Founder-named (rare for tech startups in India), Sanskrit/Hindi origin (Dunzo, Nykaa, Paytm). Common mistakes: Names too similar to existing brands, names difficult for non-English speakers, names with trademark conflicts.

Visual identity foundations: Colors: Indian brands often use vibrant colors (Swiggy orange, Paytm blue, Zerodha purple). Consider cultural associations - red/orange for auspicious, green for freshness, blue for trust. Avoid colors with political associations. Typography: Choose fonts that work in both English and regional scripts if going vernacular. Sans-serif fonts dominate digital. Ensure readability at small sizes (mobile-first India). Logo: Design for versatility - app icon, social profile, website, print. Test at multiple sizes. Simple logos work better for recall.

Brand voice in India: Formality varies by sector - fintech tends formal, D2C tends casual. Humor works well for younger audiences but must be culturally appropriate. Authority and expertise matter for B2B and health/finance. Local language mixing (Hinglish) can increase relatability.

Protecting your brand: Trademark registration through IP India (ipindiaservices.gov.in). Cost: Rs 4,500 per class for startups. Processing time: 8-12 months for registration. Apply in Classes 35 (advertising), 42 (technology), and your specific category. File early - first-to-file system in India.',
        '["Brainstorm 30 potential brand names using different naming approaches - shortlist to top 10", "Conduct trademark search on IP India website for shortlisted names - eliminate conflicts", "Check domain availability (.com, .in, .co) and all social media handles for top 5 names", "Create brand mood board with 20+ reference images showing desired aesthetic, colors, and visual style"]'::jsonb,
        '["Brand Naming Workshop Guide with Indian market checklist", "Trademark Search Tutorial for IP India portal", "Domain and Social Handle Availability Checker", "Brand Mood Board Template with Indian brand examples"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 11: Visual Identity Creation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'Visual Identity Creation',
        'Your visual identity is how customers recognize and remember your brand. In mobile-first India where 97% of internet users access via smartphone, your visual identity must be optimized for small screens, low bandwidth, and diverse devices.

Logo design considerations: Types: Wordmark (text-only), Lettermark (initials), Symbol (icon), Combination (text + symbol). Recommendation for startups: Start with combination mark, but ensure the symbol works standalone for app icons and favicons. Design principles: Simplicity (works at 16x16 pixels), Memorability (recognizable after brief exposure), Versatility (works on dark/light backgrounds), Relevance (connects to your value proposition). DIY options: Canva (free tier adequate), Looka, Hatchful. Professional options: 99designs (Rs 15,000-50,000), DesignCrowd, Indian designers on Fiverr/Upwork (Rs 2,000-10,000).

Color palette creation: Primary color: Your main brand color, used in logo and key elements. Secondary color: Complementary color for accents and CTAs. Tertiary/accent colors: 2-3 supporting colors for variety. Neutral colors: Grays, whites for backgrounds and text. Tools: Coolors.co, Adobe Color, Canva Color Palette Generator. Document: Hex codes, RGB values, CMYK for print.

Typography selection: Primary font: For headings and brand elements. Secondary font: For body text and UI. Choose fonts with: Good Indian language support if going vernacular, multiple weights (regular, medium, bold), web optimization (Google Fonts is free and performant). Recommended: Inter, Poppins, Roboto for clean modern look; Playfair Display, Lora for premium feel.

Brand asset creation priorities: 1) Logo in multiple formats (PNG, SVG, light/dark versions), 2) Social media profile pictures and cover images, 3) Email signature template, 4) Basic presentation template, 5) Invoice and letterhead template, 6) Social media post templates. Free tools: Canva (extensive template library), Figma (professional design), GIMP (Photoshop alternative).

Brand guidelines document: Create a simple 1-2 page guide covering: Logo usage (spacing, minimum size, what not to do), Color specifications (with codes), Typography (fonts and usage), Tone of voice principles. This ensures consistency as you grow.',
        '["Create or commission your logo - generate at least 3 concepts before finalizing", "Define color palette: primary, secondary, accent, and neutral colors with exact codes", "Select primary and secondary fonts - download from Google Fonts and set up in your tools", "Build initial brand asset library: logo files, social templates, presentation template, email signature"]'::jsonb,
        '["Logo Design Guide with DIY and professional service options", "Color Palette Generator with psychology reference guide", "Typography Pairing Recommendations for Indian brands", "Canva Brand Kit Setup Tutorial with template library"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 12: Technology Stack Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        12,
        'Technology Stack Selection',
        'Technology decisions made at the MVP stage can either accelerate or cripple your startup. In India, where engineering talent is abundant but expensive-at-scale, and where internet connectivity varies dramatically, your tech choices must balance speed-to-market with scalability.

Build vs. No-Code decision framework: Choose No-Code if: Testing product-market fit, Non-technical founder, Simple CRUD application, Timeline under 4 weeks, Budget under Rs 50,000. Choose Code if: Complex business logic, Need for customization, Scale requirements beyond 10,000 users, Competitive differentiation through technology, Long-term cost optimization.

No-code tools for Indian startups: Website builders: Webflow (Rs 800-2,000/month), WordPress (Rs 300-1,000/month), Carrd (free-Rs 500/month for landing pages). Mobile apps: Glide, Adalo, Thunkable (all have free tiers). Automation: Zapier, Make.com, n8n (self-hosted option). Databases: Airtable, Notion databases, Google Sheets + AppScript. E-commerce: Shopify (Rs 2,000-6,000/month), WooCommerce (free + hosting), Dukaan (Indian, Rs 1,000-2,500/month).

Code-based stack recommendations: Web applications: Frontend - React.js or Next.js (most Indian developers know this). Backend - Node.js (large talent pool) or Python/Django (good for AI/ML). Database - PostgreSQL (reliable) or MongoDB (flexible). Mobile: React Native (code sharing with web, large community) or Flutter (faster UI development). Avoid native development initially unless required.

India-specific considerations: Payment gateway integration: Razorpay (most popular, Rs 2% transaction fee), Cashfree, PayU, CCAvenue. UPI integration is essential. WhatsApp Business API integration (official API requires business verification; unofficial tools exist). Regional language support (i18n setup from start if targeting Tier 2+). Aadhaar and DigiLocker integration for KYC. India Stack APIs (GSTN, ONDC, ABDM for healthcare).

Hosting for Indian audience: Primary on Indian servers for latency (AWS Mumbai, GCP Mumbai, DigitalOcean Bangalore). CDN essential - CloudFlare (free tier), AWS CloudFront. SSL certificate mandatory (free via Let''s Encrypt). Estimated costs: Rs 3,000-10,000/month for MVP hosting.

Technical debt warning: Building fast doesn''t mean building carelessly. Document your architecture decisions, write basic tests for critical flows, and plan for refactoring before Series A.',
        '["Evaluate no-code vs custom development for your MVP using decision matrix - document reasoning", "Select and document your technology stack: frontend, backend, database, hosting, and third-party integrations", "Set up development environment: code repository (GitHub free), project management (Linear/Jira free tier), and CI/CD (GitHub Actions free)", "Create technical architecture document: system diagram, data flow, third-party dependencies, and scaling considerations"]'::jsonb,
        '["Tech Stack Decision Matrix with criteria weighting", "No-Code Tools Comparison Chart for Indian market with pricing", "Development Environment Setup Guide with free tool recommendations", "Technical Specification Template with India Stack integration guide"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 13: Founder Agreements & Team Building
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        13,
        'Founder Agreements & Team Building',
        'Co-founder conflicts are the second leading cause of startup failure after "no market need." In India, where personal relationships often precede business relationships, having clear written agreements is even more critical - yet frequently avoided due to discomfort with "formal" discussions among friends and family.

Founder agreement essentials: Equity split: There is no "right" answer. Common approaches: Equal split (if similar commitment and contribution), Contribution-based (time, money, idea, connections weighted), Dynamic equity (earned over time). Key principle: The equity split should motivate everyone to work hard. A resentful co-founder is worse than a smaller team. Indian startups with 2 co-founders have 30% higher success rate than solo founders.

Vesting schedule: Standard: 4-year vesting with 1-year cliff. Meaning: Equity is earned over 4 years, but nothing vests until 12 months (cliff), then typically monthly or quarterly after. Why it matters: If a co-founder leaves after 3 months, without vesting, they would keep their full equity while doing none of the work. Cliff protects against early departures. Acceleration clauses: Single trigger (100% vesting on acquisition) or double trigger (vesting only if both acquisition AND termination happen).

IP assignment: All intellectual property created for the company must be assigned to the company, not individuals. This includes: code, designs, content, inventions, trade secrets. Include work done before incorporation if related to the startup. This is non-negotiable for any VC investment.

Decision-making and roles: Define: CEO responsibilities, domain ownership, voting rights, deadlock resolution. Common mistake: Avoiding these discussions leads to silent conflicts that explode later. Document: What decisions require unanimous consent, what can be decided by CEO alone, what needs board approval.

Exit provisions: What happens if a founder wants to leave? Right of first refusal (company or other founders can buy their shares first), drag-along and tag-along rights, non-compete and non-solicitation clauses, notice period requirements. What happens if a founder is asked to leave? Good leaver vs bad leaver provisions (bad leaver forfeits unvested and sometimes vested equity).

Getting legal help: DIY is risky for founder agreements. Budget Rs 15,000-50,000 for a startup-savvy lawyer. LegalZoom India, Vakilsearch, and IndiaFilings offer template-based services at lower costs.',
        '["Have explicit conversations with co-founders about: equity split rationale, time commitment, roles, decision-making, and exit scenarios", "Document equity split with detailed justification and create vesting schedule", "Draft founder agreement covering: equity, vesting, IP assignment, roles, decisions, exits - use template and customize", "Build list of potential advisors and early team members: identify 10 people who could help in next 6 months"]'::jsonb,
        '["Founder Agreement Template (India-compliant) with clause explanations", "Equity Split Calculator with contribution weighting factors", "Vesting Schedule Generator with cliff and acceleration options", "Co-founder Discussion Guide with conversation frameworks"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- Day 14: Week 2 Review & MVP Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        14,
        'Week 2 Review & MVP Planning',
        'Week 2 consolidation is critical before moving to MVP development. You should now have all building blocks in place: legal structure decided (and ideally incorporation initiated), brand identity created, technology stack selected, and founder agreements drafted. This lesson synthesizes everything and plans for MVP development.

Building blocks checklist: Legal: Entity type decided? Incorporation documents prepared? DSC applied for? Name reserved? Expected incorporation date set? Branding: Name finalized? Domain and social handles secured? Logo designed? Brand guidelines created? Technology: Tech stack decided? Development environment set up? Technical spec drafted? Team: Founder agreement discussed? Equity and vesting documented? Key hires identified?

MVP planning principles: The goal of an MVP is to learn, not to impress. Build the smallest thing that tests your core value proposition. For a marketplace: Don''t build buyer and seller apps; use WhatsApp for coordination and test if transactions happen. For SaaS: Don''t build full self-serve; use manual processes behind the scenes (Wizard of Oz MVP). For D2C: Don''t build a custom website; use Shopify/Dukaan and test if people buy.

MVP scope definition: List ALL features you can imagine. Ruthlessly cut using the MoSCoW method: Must have (impossible to launch without), Should have (important but can launch without), Could have (nice to have), Won''t have (future roadmap). Your MVP should have 3-5 Must-have features maximum.

MVP timeline planning: Week 3: MVP development sprint 1 (core feature), Week 4: MVP development sprint 2 (remaining must-haves + basic polish), Week 5: Beta launch to 10-50 users, Week 6-8: Iterate based on feedback, prepare for public launch. Common mistake: Spending 3-6 months on MVP. Target 2-4 weeks maximum.

Success metrics definition: Define what success looks like for your MVP: Activation rate (% who complete key action), Retention (% who return in week 2), Revenue (first paying customer), Engagement (time spent, actions taken), NPS/feedback (qualitative satisfaction). Don''t optimize for vanity metrics (downloads, signups) - focus on value metrics (usage, revenue).

Risk mitigation: Identify your top 3 risks going into MVP development and create mitigation plans. Common risks: Tech delays (mitigation: scope cut before timeline extension), Low initial adoption (mitigation: pre-committed beta users), Cash runway (mitigation: parallel consulting/freelancing).',
        '["Complete comprehensive Week 2 progress checklist - identify any gaps that need immediate attention", "Finalize all building block decisions and document them in a single Startup Setup Summary document", "Create detailed MVP scope document: feature list with MoSCoW prioritization, user stories for must-haves, and acceptance criteria", "Build MVP development plan: 2-week sprint plan with daily goals, resource allocation, and contingency buffers"]'::jsonb,
        '["Week 2 Completion Checklist with go/no-go criteria", "Startup Setup Summary Template for documenting all decisions", "MVP Scope Definition Template with prioritization framework", "Sprint Planning Template with agile methodology guide"]'::jsonb,
        120,
        100,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Making It Real (Days 15-21)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Making It Real',
        'Build your MVP, execute customer development, and prepare for market entry. Transform your validated idea into a working product that customers will pay for.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 15: MVP Development Sprint 1
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'MVP Development Sprint 1',
        'Today marks the start of actual building. Your focus for Sprint 1 is your core value-delivery feature - the single thing that, if it works, validates your entire hypothesis. Everything else is secondary.

MVP development principles: Build for learning, not perfection. The code you write now will likely be thrown away. That''s fine. The point is to test assumptions quickly. Ship something ugly that works rather than something pretty that doesn''t ship. Indian founders often over-engineer; resist this urge.

Core feature prioritization: For marketplace: The matching/discovery mechanism, For SaaS: The primary workflow automation, For D2C: The purchase flow, For content: The content delivery mechanism. Ask yourself: "If this feature alone worked perfectly, would users find value?" If yes, that''s your core feature.

Development workflow setup: Code repository: GitHub (free for private repos), create with README, .gitignore, and basic structure. Version control: Commit frequently, use meaningful commit messages. Environment separation: Development (your machine), Staging (testing), Production (live). CI/CD: GitHub Actions (free) for automated testing and deployment.

Daily development rhythm: Morning (30 min): Review priorities, check for blockers. Development blocks (3-4 hours): Focused coding with Pomodoro technique. Integration (1 hour): Merge code, fix conflicts, test. Documentation (30 min): Update progress, note decisions, flag blockers. Communication (30 min): Update co-founders/stakeholders, seek input on decisions.

No-code MVP track: If using no-code tools: Day 1 - Set up accounts and basic structure, Day 2 - Build core user flow, Day 3-4 - Add supporting features, Day 5 - Polish and test. Popular no-code combinations: Webflow + Airtable + Zapier (web apps), Glide + Google Sheets (mobile apps), WordPress + WooCommerce (e-commerce), Notion + Super.so (simple sites).

Progress tracking: Use simple Kanban: To Do, In Progress, Done. Tools: Trello (free), Linear (free for small teams), or even sticky notes. Daily standup (even if solo): What did I do yesterday? What will I do today? What''s blocking me?',
        '["Set up complete development environment: repository, local environment, staging server, basic CI/CD pipeline", "Define and build the core MVP feature - the single most important user flow", "Create basic user interface for core feature - functional but not polished", "Implement basic data storage and retrieval for core feature"]'::jsonb,
        '["Development Environment Setup Checklist with tool recommendations", "Core Feature Specification Template with acceptance criteria", "MVP UI/UX Minimal Guidelines (function over form)", "Progress Tracking Setup with Kanban templates"]'::jsonb,
        180,
        100,
        0,
        NOW(),
        NOW()
    );

    -- Day 16: MVP Development Sprint 1 (Continued)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'MVP Development Sprint 1 (Continued)',
        'Day 2 of development should see your core feature taking shape. Today''s focus is completing the core user flow and adding essential integrations. Remember: shipping beats perfection.

User flow completion: Map the complete user journey for your core feature: Entry point (how users find/access), Primary action (what they do), Value moment (when they experience the core value), Next step (what happens after). Each step should be functional, even if basic.

Essential integrations for Indian MVPs: Authentication: Consider Supabase Auth (free tier), Firebase Auth, or Auth0. For Indian market, phone OTP is often preferred over email - MSG91 and Twilio support OTP. Payment: Razorpay (most common), Cashfree, or PayU. Set up in test mode first. KYC/Sandbox applications take 3-5 days. Analytics: Mixpanel (free tier) or Amplitude for product analytics. Google Analytics for web traffic. Set up event tracking for key actions. Communication: SendGrid or Resend for emails. WhatsApp Business API for Indian users (official or third-party like Gupshup).

Technical debt acceptance: It''s okay to: Hardcode values you''ll later make configurable, Skip edge cases you''ll handle later, Use basic security (improve before scale), Have minimal error handling (log errors, show generic messages). Document these decisions as "tech debt" for future reference.

Code quality minimums: Even for MVP, maintain: Consistent naming conventions, Basic code organization (separate concerns), Version control hygiene, Environment variables for secrets. These prevent painful rewrites and security issues.

Testing approach for MVP: Manual testing: Create a simple test script covering happy path and 2-3 common edge cases. Test on: Chrome (desktop), Chrome (mobile), Safari (iOS). Automated testing: Skip for MVP unless critical flows. You''ll know what to test after seeing real usage patterns.

End of day checkpoint: Core feature should be 60-70% complete. If significantly behind, consider scope reduction immediately rather than timeline extension.',
        '["Complete core feature implementation with basic UI and data persistence", "Integrate essential services: authentication, payment gateway (test mode), and basic analytics", "Create and execute manual test script for core feature - fix critical bugs", "Document technical decisions and known tech debt for future reference"]'::jsonb,
        '["User Flow Completion Checklist with QA criteria", "Integration Setup Guides for Razorpay, Firebase Auth, and analytics tools", "Manual Testing Script Template with edge cases", "Tech Debt Documentation Template"]'::jsonb,
        180,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 17: Customer Development & Landing Page
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        17,
        'Customer Development & Landing Page',
        'While development continues, parallel customer development ensures you''re building for real users. Today balances development with customer validation and building your pre-launch audience.

Prototype-based customer interviews: Now that you have something to show, interviews become more concrete. Show your MVP (even if incomplete) and observe: Do they understand what it does without explanation? Where do they click first? What questions do they ask? What''s their immediate reaction?

The "Mom Test" for prototypes: Don''t ask: "Is this good?" or "Would you use this?" Do ask: "What would you use this for?" "What''s missing before you could use this daily?" "What would make you recommend this to a friend?" "How much would you pay?" "Can you try completing [key task]?"

Pre-launch landing page: Even before MVP is ready, start building your waitlist. Essential elements: Clear headline (value proposition in 5-10 words), Subheadline (how you deliver the value), Visual (screenshot, mockup, or demo video), Social proof (if any - even "Built by ex-Flipkart engineers" helps), Email capture form, Optional: Pricing or features preview.

Landing page tools: Carrd (Rs 400/year - simple, fast), Webflow (free tier - professional), Unbounce (expensive but optimized for conversion), Notion + Super.so (quick and easy), Framer (design-forward).

Traffic generation for waitlist: Day 1-3 focus: Your network - personal LinkedIn post, WhatsApp to 50 friends, direct messages to 20 target users. Week 2: Content - one in-depth article about the problem you''re solving. Week 3: Communities - share in relevant groups (not spammy, add value first). Budget option (Rs 5,000): Facebook/Instagram ads to target audience for email collection.

Email sequence for waitlist: Welcome email (immediate): Thanks for joining, what to expect, ask one survey question. Week 1: Behind-the-scenes update, build relationship. Week 2: Exclusive preview or early insight. Pre-launch: Early access invitation with special offer.',
        '["Conduct 5+ customer interviews showing your prototype - record insights systematically", "Build and publish your pre-launch landing page with email capture", "Start waitlist building: post on LinkedIn, WhatsApp to 50 contacts, engage in 3 communities", "Set up email automation: welcome sequence with 3-4 emails for new signups"]'::jsonb,
        '["Prototype Interview Guide with observation checklist", "Landing Page Templates optimized for Indian audience", "Pre-launch Marketing Playbook with channel-specific tactics", "Email Sequence Templates for waitlist nurturing"]'::jsonb,
        120,
        100,
        2,
        NOW(),
        NOW()
    );

    -- Day 18: MVP Development Sprint 2
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        18,
        'MVP Development Sprint 2',
        'Sprint 2 focuses on completing remaining must-have features and making the product usable for real users. The bar for "done" is: a user can complete the core value loop without your intervention.

Feature completion priorities: Priority 1: Complete any unfinished core features from Sprint 1. Priority 2: User onboarding flow (how do new users get started?). Priority 3: Basic user account management (profile, settings, logout). Priority 4: Error handling for common failures (network issues, invalid inputs). Priority 5: Mobile responsiveness (remember, India is mobile-first).

User onboarding design: First impression matters. 40-60% of users who have bad onboarding never return. Principles: Show value quickly (time-to-value under 60 seconds), Reduce friction (minimum required fields), Guide without overwhelming (progressive disclosure), Celebrate completion (dopamine hit on success). Patterns that work in India: WhatsApp number as primary identifier, Skip options for non-essential fields, Visual tutorials over text, Vernacular language option.

Error handling basics: User-facing: Generic friendly messages ("Something went wrong. Please try again or contact support."). Internal: Detailed logging for debugging. Recovery: Clear next steps for users (retry button, contact support, go back). Validation: Catch errors before they happen (form validation, confirmation dialogs).

Basic security checklist: Authentication: Secure password storage (use Auth provider), Session management, Logout functionality. Data: HTTPS everywhere, Input sanitization, No secrets in code. Infrastructure: Environment variables for credentials, Limited access to production. Note: Full security audit comes later, but these basics prevent obvious vulnerabilities.

Performance basics for India: Image optimization (compress, lazy load), Minimize JavaScript bundle size, Test on slow connections (Chrome DevTools throttling), Consider offline/poor connectivity states (show cached data, queue actions). Indian users often have 3G-level speeds; your MVP must work acceptably at 1Mbps.',
        '["Complete remaining must-have features from your MVP scope document", "Build user onboarding flow: signup, initial setup, first value experience", "Implement error handling for common failure scenarios", "Test on mobile devices and slow connections - fix critical issues"]'::jsonb,
        '["Feature Completion Checklist with acceptance criteria", "User Onboarding Design Patterns for Indian users", "Error Handling Implementation Guide", "Performance Optimization Checklist for Indian internet conditions"]'::jsonb,
        180,
        100,
        3,
        NOW(),
        NOW()
    );

    -- Day 19: Financial Projections & Unit Economics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        19,
        'Financial Projections & Unit Economics',
        'Understanding your financial model is crucial whether bootstrapping or seeking funding. In India''s current market (2024), investors are especially focused on unit economics and path to profitability. No more growth-at-all-costs.

Unit economics fundamentals: Customer Acquisition Cost (CAC): Total marketing and sales spend / Number of customers acquired. Include: ads, sales salaries, tools, content creation. Target: CAC should be recoverable within 12-18 months for most businesses. Customer Lifetime Value (LTV): Revenue per customer × Gross margin × Average customer lifespan. For subscription: Monthly revenue × Gross margin × Months retained. LTV:CAC ratio: Healthy = 3:1 or higher. Below 1:1 = losing money on each customer.

Indian market pricing reality: Indian consumers are price-sensitive. Average spending is 60-80% lower than Western markets. Freemium conversion rates: 1-2% (vs 2-5% globally). Annual plans convert better than monthly. EMI options significantly boost high-ticket conversion. B2B: Indian SMBs resist software subscription; consider transaction-based pricing.

Revenue projection approach: Month 1-3: Conservative (you''re still learning), Month 4-6: Based on early traction patterns, Month 7-12: Growth assumptions with justification. Be honest about assumptions: conversion rates, churn, average order value. Model best case, base case, and worst case scenarios.

Cost structure for Indian startups: Fixed costs: Founders'' living expenses (yes, count this), Hosting and tools (Rs 5,000-20,000/month), Office/co-working (Rs 5,000-30,000/month if needed), Legal and compliance (Rs 20,000-50,000/year). Variable costs: Payment gateway fees (2-3% of revenue), Customer support (Rs 15,000-25,000/month per person), Marketing (varies dramatically), Cloud costs that scale with usage.

Cash flow management: Runway calculation: Cash in bank / Monthly burn rate = Months of runway. Rule of thumb: Always maintain 6+ months runway. Start fundraising when you have 9+ months left. Watch out for: Seasonal revenue patterns, payment delays (net 30-60 common in B2B), large one-time expenses.

Break-even analysis: At what point does revenue cover all costs? For most Indian startups: 18-36 months to break-even is reasonable. Faster for services businesses, slower for product businesses. Investors now want to see clear path to break-even, not just hockey stick growth.',
        '["Build 12-month revenue projection model with realistic assumptions - document all assumptions", "Calculate unit economics: CAC (with channel breakdown), LTV (with churn assumptions), LTV:CAC ratio", "Create detailed cost structure: fixed costs, variable costs, and one-time expenses", "Determine break-even point and runway requirements - how much funding/revenue do you need?"]'::jsonb,
        '["Financial Model Template with India-specific assumptions", "Unit Economics Calculator with benchmarks by industry", "Cost Structure Template with Indian startup cost references", "Break-Even Analysis Tool with runway calculator"]'::jsonb,
        120,
        100,
        4,
        NOW(),
        NOW()
    );

    -- Day 20: Regulatory Compliance Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        20,
        'Regulatory Compliance Overview',
        'India''s regulatory environment is complex but navigable. Early-stage startups should focus on essential compliance while deferring optional items. Non-compliance can result in penalties, operational shutdowns, and investor red flags.

Essential compliance (Day 1 priorities): PAN and TAN: Obtained during incorporation via SPICe+. Bank Account: Required for all business transactions. Within 30 days of incorporation. GST Registration: Mandatory if annual turnover exceeds Rs 20 lakh (Rs 10 lakh for special category states) OR if selling inter-state OR if selling on e-commerce platforms. Penalty for non-registration: Rs 10,000 or tax due, whichever is higher.

Startup India registration: Benefits: Tax exemption for 3 years under Section 80-IAC (after DPIIT recognition and Inter-Ministerial Board approval), Self-certification for labor and environment laws, Fast-track patent examination (80% fee reduction), Easier public procurement, Fund of Funds access. Eligibility: Company/LLP registered in India, Less than 10 years old, Annual turnover below Rs 100 crore, Working towards innovation/improvement/scalability. Process: Register on startupindia.gov.in with incorporation certificate and brief description.

MSME Registration (Udyam): Benefits: Priority sector lending, Interest rate subvention, Credit guarantee schemes, Protection against delayed payments, Government tender preferences. Cost: Free. Process: udyamregistration.gov.in with Aadhaar. Classification: Micro (investment < Rs 1 Cr, turnover < Rs 5 Cr), Small (investment < Rs 10 Cr, turnover < Rs 50 Cr), Medium (investment < Rs 50 Cr, turnover < Rs 250 Cr).

Industry-specific compliance: Fintech: RBI registrations (NBFC, PA/PG), data localization requirements. E-commerce: Consumer Protection Act compliance, FDI norms for marketplace vs inventory models. Healthcare: CDSCO for medical devices, state drug licenses. Food: FSSAI registration/license. EdTech: No central regulation yet, but watch for NEP-related guidelines.

Compliance calendar: Monthly: GST returns (if registered), TDS payments (if applicable). Quarterly: Advance tax (if applicable). Annually: Income tax return, ROC filings (AOC-4, MGT-7), auditor appointment. Board meetings: Minimum 4 per year (first within 30 days of incorporation).

Compliance costs: Basic compliance (GST, ROC filings, tax returns): Rs 30,000-60,000/year using online services. Full compliance with CA: Rs 60,000-1,50,000/year. DIY where possible early on, professionalize as you scale.',
        '["Complete compliance requirements checklist for your specific industry and business model", "Register for GST if applicable - or document why you''re exempt and set reminder for threshold monitoring", "Apply for Startup India recognition and MSME (Udyam) registration - both are free and provide benefits", "Create 12-month compliance calendar with all filing deadlines and set up reminders"]'::jsonb,
        '["Industry-wise Compliance Checklist with requirements and deadlines", "GST Registration Guide with step-by-step portal navigation", "Startup India Registration Tutorial with document templates", "Compliance Calendar Template with automated reminder setup"]'::jsonb,
        90,
        100,
        5,
        NOW(),
        NOW()
    );

    -- Day 21: Week 3 Review & Beta Launch Prep
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        21,
        'Week 3 Review & Beta Launch Prep',
        'Week 3 ends with a critical decision: Is your MVP ready for beta users? This lesson covers final preparations and the go/no-go decision for launch.

MVP readiness checklist: Functionality: Core feature works end-to-end without crashes? User can complete primary action without help? Basic error handling in place? Works on mobile? Usability: New users can figure out what to do? Onboarding guides them to value? Critical feedback from 3-5 test users addressed? Infrastructure: Hosting is stable? SSL certificate installed? Basic analytics tracking works? Payment integration tested (even if in test mode)?

Beta launch strategy: Cohort size: Start with 10-25 users. Small enough to give individual attention, large enough to see patterns. User selection: Prioritize users who: Expressed strong interest during interviews, Have the exact problem you''re solving, Can provide articulate feedback, Are forgiving of bugs. Avoid: Friends/family who''ll be too nice, Users who don''t match your ICP.

Beta communication: Invitation email: What they''re getting, what you need from them, how to give feedback. Expectations: This is beta - bugs expected, feedback requested. Feedback channels: Dedicated WhatsApp group, in-app feedback widget, or scheduled calls. Response commitment: Respond to all feedback within 24 hours during beta.

Feedback collection strategy: Quantitative: Track usage metrics (DAU, sessions, key actions). Qualitative: Weekly feedback calls or async surveys. NPS: Ask "How likely to recommend?" on day 7. Watch for: Features requested, points of confusion, bugs reported, unsolicited praise.

Success metrics for beta: Activation: 50%+ complete key action within first session. Retention: 40%+ return within week 1. Engagement: Average 3+ sessions per user in week 1. Qualitative: 3+ users say "I would be disappointed if this went away." Revenue signal: At least 1 user offers to pay or asks about pricing.

Go/No-go decision: GO if: MVP is functional, 10+ qualified beta users ready, you have capacity to support them. DELAY if: Critical bugs exist, no qualified users identified, core feature incomplete. PIVOT if: Customer interviews show problem isn''t worth solving.',
        '["Complete MVP readiness checklist - address all critical items before beta", "Finalize beta user list: 10-25 qualified users with contact information and relationship context", "Prepare beta launch materials: invitation email, feedback guide, and WhatsApp group setup", "Set up beta tracking: analytics for key metrics, feedback collection mechanism, and weekly review schedule"]'::jsonb,
        '["MVP Readiness Checklist with go/no-go criteria", "Beta Launch Communication Templates (invitation, onboarding, feedback request)", "Feedback Collection System Setup Guide", "Beta Success Metrics Dashboard Template"]'::jsonb,
        120,
        125,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Launch Ready (Days 22-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Launch Ready',
        'Execute your beta launch, gather learnings, iterate, and prepare for public launch. Build sustainable customer acquisition and revenue systems.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 22: Beta Launch Execution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'Beta Launch Execution',
        'Today is launch day. Your beta users get access to your MVP. The goal isn''t perfection - it''s learning. Every bug report, confused user, and feature request is valuable data.

Launch day checklist: Pre-launch (morning): Final functionality check, all systems operational, analytics verified, support channels ready. Launch (midday): Send beta invitations, monitor for immediate issues, be available for questions. Post-launch (evening): Review Day 1 metrics, respond to all feedback, fix any critical issues.

Beta invitation best practices: Personalize each message - mention your previous conversation or their specific pain point. Set clear expectations: "This is an early version. Your feedback will shape the product." Create urgency: "You''re one of our first 20 users - your input matters most." Make giving feedback easy: Direct WhatsApp access to founder, one-click feedback button.

First 24 hours monitoring: Real-time metrics: Signups/activations, Time to first key action, Drop-off points in onboarding, Error rates. Support volume: Questions asked (confusion = UX opportunity), Bugs reported (prioritize by severity), Feature requests (document but don''t promise).

Common Day 1 issues and responses: Users can''t sign up: Priority 1 fix immediately. Users don''t understand what to do: Send personal walkthrough, update onboarding. Feature doesn''t work: Acknowledge, fix, follow up when resolved. Users ask for feature: Thank them, add to backlog, don''t commit to timeline.

Founder mode support: During beta, founders should handle all support. Why? Direct feedback loop, understand user problems deeply, build relationships with early users. Response time target: Under 2 hours during business hours. Support channels: WhatsApp is most effective for Indian users - instant, personal, familiar.',
        '["Execute beta launch: send invitations to all beta users with personalized messages", "Monitor launch metrics in real-time: signups, activations, and any errors", "Respond to all user messages within 2 hours - be available throughout the day", "Document all feedback received: bugs, confusion points, feature requests, praise"]'::jsonb,
        '["Beta Launch Day Checklist with hour-by-hour schedule", "Beta Invitation Templates with personalization prompts", "Real-time Monitoring Dashboard Setup Guide", "Feedback Documentation Template with categorization"]'::jsonb,
        180,
        125,
        0,
        NOW(),
        NOW()
    );

    -- Day 23-30 lessons continue with similar enhanced content...
    -- Day 23: Beta Feedback Analysis
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        23,
        'Beta Feedback Analysis & Iteration',
        'Days 2-3 of beta are about analyzing early feedback and making rapid improvements. The best startups iterate quickly based on user behavior, not just user words.

Feedback analysis framework: Categorize all feedback: Critical bugs (product doesn''t work), UX issues (product is confusing), Feature requests (product is missing something), Praise (product is working). Prioritize by: Frequency (how many users mention it?), Severity (how much does it block usage?), Effort (how hard to fix?). Matrix: High frequency + High severity + Low effort = Fix immediately.

Behavioral vs stated feedback: What users say they want vs how they actually behave often differs. Watch for: Features they request but wouldn''t use (validate with "Would you pay for this?"), Problems they don''t mention but clearly struggle with (watch session recordings or ask for screenshare), Workarounds they create (indicates missing functionality).

Rapid iteration process: Fix critical bugs: Same day. Improve confusing UX: 24-48 hours. Add quick wins: By end of week. Log but defer: Complex features, nice-to-haves. Communication: Tell users when you fix their reported issues. "Based on your feedback, we just shipped X."

User interview follow-ups: Schedule 15-30 minute calls with 5+ beta users. Questions: What did you try to do? What was confusing? What would make this a must-have? What would you pay? How does this compare to your current solution? Pro tip: Ask to watch them use the product while thinking aloud.

Cohort analysis basics: Divide beta users into cohorts based on when they joined, acquisition source, or user type. Compare: activation rates, retention, engagement. This reveals: Which users find value? Where does the product fail specific segments?

Metrics review: Day 1-3 metrics to watch: Activation rate (target: 50%+), Day 1 retention (target: 40%+), Feature usage (which features are used?), Session duration (engagement level), Support tickets (confusion indicator).',
        '["Analyze all feedback received: categorize, prioritize, and create action list", "Fix critical bugs and major UX issues identified in first 48 hours", "Schedule and conduct 5+ user feedback calls with beta users", "Update MVP based on learnings - ship improvements and communicate to users"]'::jsonb,
        '["Feedback Analysis Template with prioritization matrix", "User Interview Script for beta follow-ups", "Rapid Iteration Workflow Guide", "Cohort Analysis Basics Tutorial"]'::jsonb,
        120,
        125,
        1,
        NOW(),
        NOW()
    );

    -- Day 24: Go-to-Market Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        24,
        'Go-to-Market Strategy',
        'With beta learnings in hand, it''s time to finalize your go-to-market strategy for public launch. GTM is how you acquire customers profitably and at scale.

GTM strategy components: Target market: Refined ICP based on beta learnings (who activated and retained?). Positioning: How you want to be perceived relative to alternatives. Pricing: What you charge and how (subscription, transaction, tiered). Channels: Where you find customers. Sales process: How you convert leads to customers.

Positioning statement format: For [target customer], [product name] is a [category] that [primary benefit] unlike [primary alternative] because [reason to believe]. Example: "For Indian D2C brands, ReturnKaro is a returns management platform that reduces return losses by 40% unlike manual processes because we predict and prevent fraudulent returns using AI."

Pricing strategy for Indian market: Cost-plus: Your costs + target margin. Works for services. Value-based: What is the customer outcome worth? Competitive: Match or undercut alternatives. Penetration: Low initial price to gain market share. Freemium: Free basic tier, paid premium features. Indian considerations: Price sensitivity is high. Annual plans with discount work better. Show prices in INR. Consider GST-inclusive pricing for B2C.

Channel strategy for India: Organic (free but slow): SEO, content marketing, social media, community building, referrals. Paid (fast but expensive): Google Ads, Facebook/Instagram Ads, LinkedIn Ads (B2B), influencer marketing. Partnerships (medium): Reseller agreements, integration partnerships, affiliate programs. Direct sales (for B2B): Outbound prospecting, conferences, referrals.

Channel economics: Calculate CAC by channel: Total channel spend / Customers from channel. Target: Channel CAC < 1/3 of LTV. Start with 2-3 channels, double down on what works.

First 90 days GTM plan: Month 1: Founder-led sales, organic growth, validate PMF with paying customers. Month 2: Test 2-3 paid channels with limited budget (Rs 30,000-50,000 each), identify what works. Month 3: Scale winning channel, begin building content/SEO foundation.',
        '["Define refined target market and ICP based on beta learnings", "Finalize positioning statement and test with 5 potential customers", "Set pricing strategy with 3 pricing experiments to test", "Create channel strategy: prioritize 3 channels with budget allocation and success metrics"]'::jsonb,
        '["GTM Strategy Template with India-specific considerations", "Positioning Statement Worksheet with examples", "Pricing Strategy Guide for Indian market", "Channel Selection Matrix with CAC benchmarks"]'::jsonb,
        90,
        125,
        2,
        NOW(),
        NOW()
    );

    -- Day 25: Sales Process Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        25,
        'Sales Process Development',
        'Even product-led startups need sales capabilities. For B2B, founder-led sales is essential for learning. For B2C, conversion optimization is your "sales process."

B2B sales process stages: Lead generation: Inbound (content, SEO, ads) or Outbound (cold email, LinkedIn, referrals). Qualification: Does the lead match your ICP? Do they have budget, authority, need, timeline (BANT)? Discovery: Deep dive into their problems and current solutions. Demo/proposal: Show how you solve their specific problems. Negotiation: Handle objections, discuss pricing, terms. Close: Get signature, payment, onboarding scheduled. Post-sale: Ensure success, gather referrals, expand account.

B2C conversion optimization: The "sales process" for B2C is your product experience. Key conversion points: Landing page to signup, Signup to activation (first value), Activation to paid conversion. Optimize each step: Reduce friction, increase motivation, provide social proof.

Sales scripts for founder-led sales: Opening: Brief context, ask if now is a good time. Discovery questions: Current solution, pain points, impact, budget, timeline. Demo approach: Tie features to their specific problems. Objection handling: Prepare answers for top 5 objections. Close: Clear next steps with specific timeline.

Common objections in India (and responses): "Too expensive": "What would the cost of not solving this be?" + Show ROI calculation. "We''ll think about it": "What specific concerns can I address?" + Set specific follow-up. "Our team won''t adopt it": "Let''s pilot with 2-3 users first." "We have our own solution": "How much time/money does maintaining it cost?"

CRM setup for Indian startups: Free options: HubSpot (free CRM), Zoho CRM (free tier), Notion (DIY CRM). What to track: Contact info, company details, interaction history, deal stage, next action. Pipeline stages: Lead → Qualified → Meeting → Proposal → Negotiation → Closed Won/Lost.

Indian B2B sales nuances: Relationships matter more than in Western markets - invest in chai conversations. Decision-making can be slow - multiple approvers common. Reference customers are crucial - "Who else is using this?" is the top question. Local presence/support is expected - even if you''re fully digital.',
        '["Map your sales process from lead to close with specific stages and actions at each stage", "Write sales scripts for: initial outreach, discovery call, demo, objection handling, and close", "Set up CRM system (HubSpot free recommended) and configure your pipeline stages", "Create objection handling document with responses to top 10 expected objections"]'::jsonb,
        '["Sales Process Template with stage definitions and metrics", "Sales Script Library for Indian market with conversation frameworks", "CRM Setup Guide for startups with configuration checklist", "Objection Handling Playbook with response templates"]'::jsonb,
        90,
        125,
        3,
        NOW(),
        NOW()
    );

    -- Day 26: Revenue Systems Setup
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        26,
        'Revenue Systems Setup',
        'Your revenue systems must work flawlessly from Day 1 of public launch. Payment failures kill conversion and trust. In India, payment experience is a competitive differentiator.

Payment gateway selection: Razorpay: Most popular, 2% transaction fee, good UPI support, easy integration. Cashfree: Strong UPI, competitive rates (1.9-2.1%), payout features. PayU: Established player, good enterprise support. CCAvenue: Older, more payment options, higher fees. Recommendation: Razorpay for most startups due to ecosystem and support.

Payment flow optimization: Offer multiple payment methods: UPI (dominant in India, 40%+ of online payments), Credit/Debit cards, Netbanking, Wallets (Paytm, PhonePe). EMI options: For purchases above Rs 3,000, EMI can boost conversion 30-40%. UPI AutoPay: For subscriptions, reduces payment failures. Retry logic: Auto-retry failed payments, send reminders.

Pricing page best practices: Clear value at each tier: What specific outcomes does each tier enable? Highlight recommended tier: Make the decision easy. Annual discount: Show monthly equivalent and savings. Social proof: Customer logos or count. Money-back guarantee: Reduces purchase risk. FAQ: Address common questions below pricing.

Invoicing and compliance: GST invoices mandatory for B2B transactions above Rs 50. Include: GSTIN (yours and customer''s if B2B), HSN/SAC code, GST breakup. Tools: Zoho Invoice (free tier), Razorpay invoices, or accounting software. Record keeping: Maintain all invoices for 8 years (tax requirement).

Revenue tracking dashboard: Key metrics to track: MRR/ARR (monthly/annual recurring revenue), New revenue (from new customers), Expansion revenue (upsells), Churned revenue (cancellations), Net revenue retention. Tools: Chargebee, Stripe (not available in India but useful for international), custom spreadsheet for MVP stage.

First revenue milestone: Your goal before public launch: At least 1 paying customer (ideally 3-5). Why it matters: Validates willingness to pay, proves your solution delivers value, gives you a reference customer. How to get it: Offer beta users early-bird pricing with manual payment if needed.',
        '["Complete payment gateway integration with all payment methods (UPI, cards, netbanking)", "Build pricing page with clear tiers, annual discount, and social proof elements", "Set up invoicing system that generates GST-compliant invoices automatically", "Create revenue tracking dashboard with key metrics and reporting"]'::jsonb,
        '["Payment Gateway Integration Guide with code examples", "Pricing Page Templates optimized for conversion", "GST Invoice Requirements Checklist", "Revenue Dashboard Template with metric definitions"]'::jsonb,
        120,
        125,
        4,
        NOW(),
        NOW()
    );

    -- Day 27: Funding Readiness Assessment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        27,
        'Funding Readiness Assessment',
        'Not every startup needs funding, but every founder should understand the funding landscape. This lesson helps you decide if and when to raise, and prepares you for that conversation.

To raise or not to raise? Raise if: Your market requires fast scaling (network effects, winner-take-all), Capital intensive model (hardware, inventory), Competitors are well-funded, You need specific expertise (VC value-add). Bootstrap if: You can grow profitably, Market allows gradual growth, You want to maintain control, You''re building a lifestyle business.

Indian funding landscape 2024: Seed round (idea to early PMF): Rs 50L - Rs 3 Cr, from angels, micro VCs. Pre-Series A: Rs 3 Cr - Rs 10 Cr, from early-stage VCs. Series A: Rs 10 Cr - Rs 40 Cr, from institutional VCs. Note: 2024 market is more selective than 2021-22. Unit economics and path to profitability matter more than pure growth.

What investors look for at seed stage: Team: Relevant experience, complementary skills, full-time commitment. Market: Large TAM, clear wedge to enter, favorable timing. Traction: Early signals of PMF (even if small numbers). Insight: Unique perspective on the problem/solution. Fundraising materials: Pitch deck (10-12 slides), one-pager, basic data room.

Pitch deck structure: Problem (1 slide): Pain point with market context. Solution (1 slide): Your product and how it works. Why now (1 slide): Market timing, enabling trends. Market size (1 slide): TAM, SAM, SOM with sources. Business model (1 slide): How you make money. Traction (1 slide): Key metrics, growth, testimonials. Team (1 slide): Founder backgrounds, advisors. Go-to-market (1 slide): How you acquire customers. Competition (1 slide): Landscape and positioning. Financials (1 slide): Projections, unit economics. Ask (1 slide): Raise amount, use of funds, milestones.

Building investor pipeline: Start with: Angels in your network, alumni networks, ecosystem connectors. Research: Indian VC list (300+ active), thesis fit (sector, stage, check size). Warm intros are essential - cold emails have <5% response rate. Start conversations 6 months before you need money.',
        '["Complete funding readiness self-assessment: should you raise? when? how much?", "Create initial pitch deck with all 10-12 slides - focus on narrative over design", "Write one-page executive summary for investor outreach", "Build target investor list: 20 angels + 10 VCs who invest in your sector and stage"]'::jsonb,
        '["Funding Readiness Assessment Framework", "Pitch Deck Template with slide-by-slide guidance", "One-Pager Template with examples", "Indian Investor Database with thesis information"]'::jsonb,
        120,
        125,
        5,
        NOW(),
        NOW()
    );

    -- Day 28: Public Launch Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        28,
        'Public Launch Preparation',
        'Public launch is when you open up to the world beyond your beta users. The goal is controlled growth - enough to learn and iterate, not so much that you can''t handle support.

Launch readiness final checklist: Product: All critical bugs fixed, onboarding smooth, performance acceptable, mobile works. Infrastructure: Hosting can handle 10x current traffic, monitoring alerts set up, backup plan exists. Support: FAQ/help docs ready, support channels set up, response SLA defined. Marketing: Landing page updated, social profiles active, launch content created. Legal: Terms of service, privacy policy, required compliance in place.

Launch channel strategy: Tier 1 (Day 1): Your network (LinkedIn, WhatsApp), waitlist, beta user referrals. Tier 2 (Week 1): Product Hunt (if applicable), relevant communities, content marketing. Tier 3 (Month 1): Paid acquisition tests, PR outreach, partnerships.

Product Hunt launch (if applicable): Best for: B2B SaaS, developer tools, productivity apps. Not ideal for: Hyper-local Indian services, vernacular apps. Tips: Launch Tuesday-Thursday, prepare tagline/images/video, mobilize community to upvote, be active in comments all day. Success metrics: Top 5 of the day gives significant traffic.

PR and media: DIY PR approach: Create newsworthy angle (data, trend, founder story), build relationship with 10-15 relevant journalists, pitch personalized story ideas. Press release: Keep it factual, include quotes, have founder available for follow-ups. Indian tech media: Inc42, YourStory, Tech in Asia, Economic Times Tech, Mint. Remember: PR is for awareness, not customer acquisition. Don''t over-invest early.

Community launch: Identify 10 communities where your target users hang out. Add value first (answer questions, share insights), then soft-launch with "we built this to solve X, feedback welcome." Reddit: r/india, r/IndianEntrpreneurs, niche subreddits. LinkedIn: Industry groups, alumni groups. Discord/Slack: Industry communities, startup communities.',
        '["Complete public launch readiness checklist - address any gaps", "Prepare launch content: updated landing page, social posts, announcement email", "Create launch day schedule with specific activities by hour", "Set up monitoring: traffic analytics, error alerts, support queue"]'::jsonb,
        '["Public Launch Readiness Checklist with go/no-go criteria", "Launch Content Templates (social posts, email, press release)", "Launch Day Schedule Template", "Monitoring and Alert Setup Guide"]'::jsonb,
        120,
        150,
        6,
        NOW(),
        NOW()
    );

    -- Day 29: Public Launch Execution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        29,
        'Public Launch Execution',
        'Launch day. Everything you''ve built over 28 days comes together. Stay calm, stay responsive, and focus on learning more than celebrating.

Launch day execution plan: Morning (8 AM): Final systems check, team sync, support channels open. Mid-morning (10 AM): Announce on LinkedIn (personal + company), send waitlist email. Midday (12 PM): Post on Twitter/X, relevant communities, follow up on engagement. Afternoon (2 PM): Product Hunt launch (if applicable), check metrics, respond to all feedback. Evening (6 PM): WhatsApp shares, thank early supporters, address any issues. Night (10 PM): Day 1 metrics review, prioritize tomorrow''s fixes.

Real-time monitoring: Traffic: Watch for unusual spikes or drops (could indicate issues or opportunity). Signups: Track rate and quality (are these your target users?). Activation: Are new users completing key actions? Errors: Any increase in error rates or support tickets? Conversion: If selling, any purchases?

Launch day support: Expect 5-10x normal support volume. Have pre-written responses for common questions. Escalation path for technical issues. Celebrate publicly when helping users (builds trust).

Handling launch problems: Traffic overload: Scale infrastructure, add queuing, communicate delays. Critical bugs: Fix immediately, communicate transparently ("We''re aware and fixing"). Negative feedback: Thank, address constructively, show you''re listening. Low traffic: Don''t panic. Analyze channels, double down on what''s working.

Launch day communication: LinkedIn post template: "After [X] months of building, we''re excited to launch [product]. We help [target] do [benefit]. We''d love your feedback and support. [Link]" Personal WhatsApp: "Hey! I finally launched my startup. Would mean a lot if you could check it out: [link]. Happy to answer any questions!"

Celebrate (briefly): Launching is an achievement. Acknowledge the milestone. But remember: Launch is the beginning, not the end. Real work starts tomorrow.',
        '["Execute launch day plan: announcements, community posts, and outreach as scheduled", "Monitor all channels: traffic, signups, activations, errors, and support", "Respond to all engagement: comments, questions, and feedback within 2 hours", "Document launch day learnings: what worked, what didn''t, what to improve"]'::jsonb,
        '["Launch Day Execution Checklist with timeline", "Social Media Post Templates for launch", "Real-time Monitoring Dashboard", "Launch Day Problem Response Playbook"]'::jsonb,
        180,
        150,
        7,
        NOW(),
        NOW()
    );

    -- Day 30: Course Completion & 90-Day Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        30,
        'Course Completion & 90-Day Planning',
        'Congratulations on completing the 30-Day India Launch Sprint! You''ve gone from idea to launched startup. But this is just the beginning. Today, we reflect on learnings and plan for the next 90 days.

30-day reflection: What worked: Document the decisions and actions that drove progress. What didn''t: Be honest about mistakes and wasted effort. Key learnings: Insights about your market, customers, and business. Metrics snapshot: Document current state (users, revenue, engagement) as baseline.

The post-launch reality: Week 1-2: Initial spike followed by drop (the "trough of sorrow"). Month 1: Find your first loyal users - the ones who would be disappointed if you disappeared. Month 2-3: Iterate toward product-market fit through rapid experimentation. Month 3-6: Find repeatable customer acquisition before scaling.

90-day goal setting: Product-Market Fit indicators: 40%+ users say they''d be "very disappointed" without your product, Natural word-of-mouth growth (20%+ of users from referrals), Retention curves flatten (users stick around), Willingness to pay (revenue from strangers). Set 3-month targets for: Users (focus on quality over quantity), Revenue (even small amounts validate value), Retention (week 4 retention > 20%), NPS (target 40+).

90-day action plan: Month 1 - Retention focus: Talk to users weekly, iterate on product, fix drop-off points, delight early users. Month 2 - Acquisition experiments: Test 3 paid channels with Rs 50K each, identify winning channel, begin content/SEO foundation. Month 3 - Scale what works: Double down on winning channel, hire first team member (support or growth), prepare for fundraise if needed.

Building for the long term: Startup success is a marathon, not a sprint. 95% of the journey is ahead of you. Key principles: Stay close to customers (weekly calls even as you scale), Preserve runway (18 months minimum), Build team slowly (hire only when it hurts), Focus on distribution (product is 30%, distribution is 70%), Take care of yourself (burnout is real, sustainable pace wins).

What''s next: This course gave you the foundation. Consider: P2 (Incorporation & Compliance) for deeper legal/compliance knowledge, P3 (Funding in India) when preparing to raise, P6 (Sales & GTM) for scaling customer acquisition. Join the alumni community for ongoing support and connections.',
        '["Complete 30-day course reflection: document wins, losses, and key learnings", "Create 90-day goal document with specific, measurable targets for users, revenue, and retention", "Build detailed 90-day action plan with monthly themes and weekly milestones", "Set up monthly review cadence: schedule recurring time to review progress and adjust plans"]'::jsonb,
        '["30-Day Reflection Template with guiding questions", "90-Day Goal Setting Framework with benchmark metrics", "90-Day Action Plan Template with milestone tracking", "Monthly Review Template for ongoing progress tracking"]'::jsonb,
        120,
        200,
        8,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P1 Enhanced Content: Successfully created 4 modules with 30 lessons with comprehensive India-specific content';

END $$;

COMMIT;
