-- THE INDIAN STARTUP - P3: Funding in India - Complete Mastery - Enhanced Content
-- Migration: 20260204_003_p3_funding_enhanced.sql
-- Purpose: Enhance P3 course content to 500-800 words per lesson with India-specific funding data

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_module_1_id TEXT;
    v_module_2_id TEXT;
    v_module_3_id TEXT;
    v_module_4_id TEXT;
    v_module_5_id TEXT;
    v_module_6_id TEXT;
    v_module_7_id TEXT;
    v_module_8_id TEXT;
    v_module_9_id TEXT;
    v_module_10_id TEXT;
    v_module_11_id TEXT;
    v_module_12_id TEXT;
BEGIN
    -- Get or create P3 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P3',
        'Funding in India - Complete Mastery',
        'Master the Indian funding ecosystem from bootstrapping to Series A and beyond. 45 days, 12 modules covering angel investors, VCs, government grants, venture debt, pitch decks, term sheets, and fundraising execution. Includes templates, investor databases, and negotiation frameworks.',
        5999,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P3';
    END IF;

    -- Clean existing modules and lessons
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Indian Funding Ecosystem Overview (Days 1-4)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Indian Funding Ecosystem Overview',
        'Understand the complete Indian startup funding landscape from pre-seed to IPO. Learn funding stages, investor types, and how to position your startup for success.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: The Indian Startup Funding Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'The Indian Startup Funding Landscape',
        'India has emerged as the world''s third-largest startup ecosystem with over 1,12,000 DPIIT-recognized startups as of 2024. The funding landscape has matured significantly, with total VC investments reaching $8-10 billion annually despite global headwinds. Understanding this ecosystem is crucial for any founder seeking capital.

Funding stages in India: Pre-Seed (Rs 25 lakh - Rs 1 crore) typically comes from founders, friends, family, or early accelerators. This stage focuses on idea validation and initial product development. Seed funding (Rs 1-5 crore) comes from angel investors and micro-VCs, used for MVP launch and initial traction. Series A (Rs 15-50 crore) represents institutional VC entry, requiring proven product-market fit and revenue traction. Series B onwards (Rs 50 crore+) focuses on scaling proven business models.

Key investor categories in India: Angel Investors number over 4,500 active angels, with average ticket size Rs 25 lakh - Rs 1 crore. Prominent networks include Indian Angel Network (IAN), Mumbai Angels, Chennai Angels, and Hyderabad Angels. Micro-VCs deploy Rs 1-5 crore, examples include Titan Capital, First Cheque, Better Capital. Institutional VCs like Sequoia Capital India (now Peak XV), Accel, Matrix Partners, Elevation Capital invest Rs 15 crore onwards. Corporate VCs include Reliance Digital, Tata Digital, Mahindra Partners. Government bodies like SIDBI Fund of Funds, Startup India Seed Fund, and state startup funds provide non-dilutive or low-dilution capital.

India-specific funding characteristics: Valuations are typically 30-50% lower than US for comparable companies. Runway expectations are higher - investors expect 24-30 months runway post-funding. Revenue focus is stronger - Indian VCs increasingly prefer revenue-generating startups. Sector preferences evolve - current hot sectors include climate tech, B2B SaaS, fintech, healthtech, and D2C. Geography matters - while Bangalore dominates (40% of deals), tier-2 cities are growing rapidly.

Funding winter reality check: 2022-2024 saw significant correction from 2021 peaks. Deal volumes dropped 30-40%, but quality deals still get funded. Emphasis shifted from growth-at-all-costs to sustainable unit economics. This makes proper preparation even more critical - the bar for fundable startups has risen significantly.

FEMA compliance basics: Any foreign investment requires FEMA compliance. Form FC-GPR must be filed within 30 days of receiving foreign investment. Valuation certificate required from registered valuer for equity pricing. Non-compliance can result in penalties up to 3x the investment amount.',
        '["Map your startup to appropriate funding stage based on current metrics", "Research 10 investors active in your sector and stage", "Assess your FEMA compliance requirements if planning foreign investment", "Create funding timeline aligned with your business milestones"]'::jsonb,
        '["Indian Startup Funding Landscape Report 2024 with deal data", "Investor Database by sector and stage (500+ investors)", "FEMA Compliance Checklist for foreign investment", "Funding Stage Assessment Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Understanding Investor Types
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Understanding Investor Types in India',
        'Different investor types have vastly different expectations, processes, and value-add capabilities. Matching your startup to the right investor type dramatically increases fundraising success.

Angel Investors: High-net-worth individuals investing personal capital, typically Rs 10 lakh - Rs 1 crore per deal. Decision process: 2-4 weeks, often based on personal conviction. Value-add: Industry connections, mentorship, credibility. Indian Angel Network (IAN) is the largest with 500+ members, has invested Rs 900+ crore across 200+ startups. Mumbai Angels has 450+ members, focuses on early-stage with average ticket Rs 50 lakh. Lead angels often invest more (Rs 50 lakh - Rs 1 crore) and help coordinate syndicates.

Angel Networks and Syndicates: Pool capital from multiple angels for larger investments. Examples include Inflection Point Ventures, Venture Catalysts, LetsVenture platform. Typical range: Rs 1-5 crore. Process: Apply online, screening, pitch to members, collective decision. Benefits: Access to multiple investors through single process. Challenges: Longer decision time (6-8 weeks), more stakeholder management.

Micro-VCs and Seed Funds: Professional fund managers with smaller fund sizes (Rs 50-200 crore AUM). Examples: Titan Capital (Snapdeal founders), First Cheque, Antler India, Better Capital. Ticket size: Rs 1-5 crore for 10-15% equity. They bridge gap between angels and institutional VCs. Focus on founder quality and market potential over metrics. Decision process: 4-6 weeks, more structured than angels.

Institutional Venture Capital: Large funds (Rs 500+ crore AUM) investing from Series A onwards. Major India-focused VCs: Peak XV Partners (formerly Sequoia India) - $2.85 billion fund, sector agnostic; Accel India - $650 million fund, enterprise and consumer; Matrix Partners India - $525 million fund, strong in fintech; Elevation Capital - $670 million fund, consumer and B2B; Lightspeed India - $500 million fund, consumer tech. Process: 8-12 weeks, extensive due diligence. Expectations: Strong metrics, clear path to Rs 500+ crore valuation.

Corporate Venture Capital (CVC): Strategic investors from large corporations. Examples: Reliance Jio (digital ecosystem), Tata Digital, Mahindra Partners, Info Edge Ventures. Benefits: Strategic partnerships, distribution access, domain expertise. Challenges: May want strategic rights, potential conflict with competitors. Best for: Startups where corporate partnership accelerates growth.

Government and Institutional: SIDBI Fund of Funds (Rs 10,000 crore corpus), invests through SEBI-registered AIFs. State startup funds: Karnataka Innovation Fund, Kerala Startup Mission, T-Hub Hyderabad. Lower return expectations, patient capital, supportive of impact sectors.',
        '["Identify which investor type aligns with your current stage and capital needs", "Research 5 specific investors in your target category actively investing in your sector", "Understand typical terms expected by each investor type", "Prepare tailored approach strategy for your target investor type"]'::jsonb,
        '["Investor Type Comparison Matrix with pros/cons", "Active Angel Networks Directory with application links", "VC Fund Database with partner details and portfolio", "CVC Landscape Map by sector"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Funding Readiness Assessment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Funding Readiness Assessment',
        'Before approaching investors, honestly assess whether your startup is ready. Premature fundraising wastes time and can damage your reputation with investors you may want to approach later.

Product readiness by stage: Pre-Seed: Clear problem statement, initial solution concept, founder domain expertise. Seed: Working MVP, early user feedback, initial product-market fit signals. Series A: Scaled product, proven retention, clear value proposition validated by customers.

Traction benchmarks for Indian startups: B2C: Seed requires 10,000+ MAU with 20%+ M-o-M growth; Series A requires 1 lakh+ MAU, strong retention (D30 > 20%). B2B SaaS: Seed requires Rs 5-10 lakh ARR; Series A requires Rs 1-2 crore ARR, 100%+ NRR. Marketplace: Seed requires Rs 10-20 lakh GMV/month; Series A requires Rs 1-2 crore GMV/month. D2C: Seed requires Rs 10-25 lakh monthly revenue; Series A requires Rs 1-2 crore monthly revenue.

Team assessment criteria: Founders: Relevant domain expertise, complementary skills, full-time commitment. Investors heavily weight founder quality - 70% of early-stage decisions based on team. Red flags: Single non-technical founder for tech startup, part-time founders, no skin in the game.

Financial readiness checklist: Clean cap table with clear ownership, no messy founder agreements. Proper incorporation as Private Limited Company (not LLP for VC funding). Financial statements audited or at least properly maintained. Understanding of unit economics even if not yet profitable. Clear use of funds plan with 18-24 month runway projection.

Market opportunity validation: Total Addressable Market (TAM) should be Rs 5,000+ crore for VC interest. India-specific market sizing using credible data sources. Competition analysis showing differentiation and defensibility. Regulatory clarity - avoid sectors with uncertain regulations.

Honest self-assessment questions: Why would an investor choose you over competitors? What will you achieve with this funding that you cannot without it? Are you solving a real problem that customers will pay for? Do you have the team to execute this vision? Is this the right time to raise, or should you hit more milestones first?

Common reasons investors pass: Too early - need more traction before institutional funding. Team concerns - missing key skills or founder misalignment. Market size - too niche for VC returns expectations. Competition - unclear differentiation from well-funded competitors. Unit economics - path to profitability not credible.',
        '["Complete the Funding Readiness Assessment scoring your startup across all dimensions", "Identify top 3 gaps that need addressing before fundraising", "Gather metrics and proof points for your stage requirements", "Create honest SWOT analysis from an investor perspective"]'::jsonb,
        '["Funding Readiness Assessment Scorecard (25 criteria)", "Stage-wise Traction Benchmarks by business model", "Investor Red Flags Checklist to avoid", "Gap Analysis and Remediation Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Funding Strategy Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Developing Your Funding Strategy',
        'A well-thought-out funding strategy considers how much to raise, at what valuation, from whom, and when. Strategic errors here can have long-lasting consequences on your cap table and company trajectory.

How much to raise: Calculate based on 18-24 months runway plus buffer. Typical breakdown: 50% on team (hiring), 25% on product/tech, 15% on marketing/sales, 10% on operations/buffer. Common mistakes: Raising too little (constant fundraising mode) or too much (excessive dilution, pressure to deploy). Rule of thumb: Raise enough to hit clear milestones that justify 2-3x valuation increase.

Valuation considerations: Pre-money vs post-money understanding critical. Example: Rs 5 crore raise at Rs 20 crore pre-money = Rs 25 crore post-money, 20% dilution. Indian valuation benchmarks: Seed (Rs 5-20 crore), Series A (Rs 50-150 crore). Valuation too high creates problems: Down rounds damage morale and cap table. Valuation too low means excessive dilution and potential founder demotivation.

Dilution planning across rounds: Typical dilution: Seed 15-25%, Series A 15-25%, Series B 10-20%. After Series B, founders should retain 35-50% combined for motivation. Plan backwards: If targeting Rs 500 crore exit, model returns at each dilution level. Avoid: Giving away too much equity to angels (caps Series A valuation).

Timing your raise: Raise when you have momentum, not when desperate. Best timing: Just after achieving significant milestone. Plan 4-6 months ahead - fundraising takes 3-4 months typically. Avoid: Raising in December-January (holiday season) or August (VC vacation season).

Investor selection criteria: Stage fit: Don''t approach Series B investors for seed funding. Sector expertise: Investors with portfolio companies in your space add more value. Geographic presence: India-based partners for Indian market understanding. Value-add capabilities: What beyond money - customers, talent, advice? Reputation: Reference check with portfolio founders. Terms flexibility: Some investors more founder-friendly than others.

Building your target investor list: Create tiered list: Tier 1 (dream investors, best fit), Tier 2 (good fit), Tier 3 (acceptable). Research each investor: Recent investments, typical terms, partner preferences. Find warm introductions - cold outreach has <5% response rate. Sequence approaches: Start with Tier 2 for practice, move to Tier 1 with momentum.',
        '["Calculate your funding requirement based on 24-month plan", "Develop valuation expectations using comparable transactions", "Create target investor list with 20-30 names across tiers", "Plan fundraising timeline aligned with upcoming milestones"]'::jsonb,
        '["Funding Requirement Calculator with category breakdown", "Valuation Benchmark Database by sector and stage", "Dilution Planning Spreadsheet with scenario modeling", "Investor Targeting Template with research fields"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Bootstrapping & Revenue Funding (Days 5-8)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Bootstrapping & Revenue Funding',
        'Master the art of building without external capital. Learn bootstrapping strategies, revenue-based financing, and when bootstrapping makes more sense than equity funding.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 5: The Power of Bootstrapping
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        5,
        'The Power of Bootstrapping in India',
        'Bootstrapping remains a viable and often superior path for many Indian startups. Zerodha, India''s largest stock broker with Rs 8,000+ crore revenue, was bootstrapped. Understanding when and how to bootstrap effectively can preserve equity and build sustainable businesses.

Why bootstrap in India: Lower burn rates - Indian talent costs 60-70% less than US equivalents. Large domestic market accessible without massive marketing spend. Service revenue can fund product development. Less pressure for hypergrowth allows sustainable business building. Maintains founder control and strategic flexibility.

Famous Indian bootstrapped successes: Zerodha - Rs 8,320 crore revenue (FY24), zero external funding, founders own 100%. Zoho - $1 billion+ revenue, 15,000+ employees, bootstrapped since 1996. Freshworks started bootstrapped for 4 years before raising. Wingify (VWO) - $20M+ ARR, bootstrapped, profitable.

Bootstrapping strategies that work: Services-to-product: Build custom solutions, productize common patterns. Example: Many Indian SaaS companies started as dev agencies. Consulting-funded: Use consulting revenue to fund product R&D. Pre-sales and customer funding: Sell annual contracts upfront, use cash flow. Geographic arbitrage: Serve global customers from India cost base.

Financial discipline for bootstrappers: Rule 1: Revenue before fancy office. Rule 2: Hire slow, fire fast. Rule 3: Every expense must have clear ROI. Rule 4: Build 6-month emergency runway minimum. Rule 5: Founder salaries last to increase, first to cut.

Bootstrap-friendly business models: B2B SaaS with annual contracts provides upfront cash. Services business with productization potential. Marketplace with transaction fees (capital-light). Content/community with premium offerings. Agency model transitioning to products.

When bootstrapping makes sense: Market doesn''t require winner-take-all dynamics. Business can be profitable with small team. Founders have runway from savings or other income. Service revenue available to fund development. Lifestyle business goals rather than massive scale.

When to consider raising despite bootstrap ability: Market has clear winner-take-all dynamics. Competitors are well-funded and aggressive. Speed is critical for market capture. Capital required for inventory, manufacturing, or hardware. Founders lack personal runway.',
        '["Evaluate whether bootstrapping is viable for your business model", "Identify potential revenue streams that could fund development", "Create lean budget that extends runway without external funding", "Research bootstrapped companies in your sector for strategy insights"]'::jsonb,
        '["Bootstrapping Viability Assessment Framework", "Lean Budget Template for bootstrapped startups", "Bootstrap Case Study Library (25 Indian companies)", "Services-to-Product Transition Playbook"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 6: Revenue-Based Financing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'Revenue-Based Financing in India',
        'Revenue-based financing (RBF) has emerged as a compelling alternative to equity, especially for startups with predictable revenue. You repay as a percentage of revenue, preserving equity while accessing growth capital.

How RBF works: Receive capital (typically Rs 25 lakh - Rs 5 crore). Repay fixed percentage (5-15%) of monthly revenue. Continue until repayment cap reached (typically 1.3-2x principal). No equity dilution, no board seats, no personal guarantees typically. Payments flex with revenue - pay less in slow months.

RBF providers in India: GetVantage - Pioneer in Indian RBF, funded 500+ brands, Rs 25 lakh - Rs 5 crore. Velocity - Focuses on D2C and e-commerce, quick disbursal. Klub - Revenue-based financing for digital businesses. Recur Club - RBF with embedded analytics. Traditional NBFCs also offering RBF: Blacksoil, Alteria Capital.

Typical RBF terms: Principal: Rs 25 lakh - Rs 5 crore (based on monthly revenue multiple). Revenue share: 5-15% of monthly revenue. Repayment cap: 1.3-1.8x of principal (effective cost 15-30% annually). Duration: 6-18 months typical repayment. Requirements: 6+ months revenue history, Rs 5+ lakh monthly revenue.

RBF vs equity comparison: RBF advantages: No dilution, fast (2-4 weeks), no board involvement, founder-friendly. RBF disadvantages: Regular repayment obligation, cost can exceed equity cost for high-growth companies. Equity advantages: No repayment, strategic value-add, validation signal. Equity disadvantages: Dilution, long process, loss of control.

When RBF is ideal: Profitable or near-profitable with predictable revenue. Need working capital for inventory, marketing, or hiring. Don''t want dilution at current valuation. Have seasonal business with fluctuating cash needs. Bridge financing between equity rounds.

RBF use cases in India: D2C brands: Fund inventory for seasonal peaks. SaaS companies: Fund customer acquisition with predictable payback. E-commerce sellers: Working capital for marketplace expansion. Service businesses: Fund hiring ahead of confirmed contracts.

Getting RBF-ready: Clean financials with clear revenue tracking. Connect accounting software (Zoho, Tally) or banking data. Demonstrate revenue stability or growth trend. Show clear use of funds and ROI potential.',
        '["Evaluate if RBF suits your business model and current stage", "Calculate optimal RBF amount based on revenue and repayment capacity", "Research and compare 3-4 RBF providers for your profile", "Prepare financial data required for RBF application"]'::jsonb,
        '["RBF Suitability Calculator", "RBF Provider Comparison Matrix (India)", "RBF Application Checklist", "Revenue Documentation Guide for RBF"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 7-8: Continue bootstrapping module
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_2_id, 7, 'Customer-Funded Growth', 'The ultimate bootstrapping strategy: using customer money to fund growth. This creates a virtuous cycle where growth funds more growth without dilution.

Annual contract strategies: Offer 15-20% discount for annual payment vs monthly. Example: Rs 10,000/month service offered at Rs 1,00,000/year (17% discount). Customer saves money, you get 12 months cash upfront. Common in B2B SaaS, professional services, subscription businesses.

Pre-sales and deposits: Sell before building - validate demand and fund development. Works well for: Courses/education, custom software, events, manufacturing. Crowdfunding platforms: Ketto, Milaap for social causes; global platforms for products. Enterprise contracts often allow 30-50% advance payment.

Customer financing in India: Many large enterprises pay advances for committed projects. Government contracts often include mobilization advances (10-30%). Use purchase orders to secure working capital loans from banks.

Retainer and subscription models: Monthly/quarterly retainers provide predictable cash flow. Structure services as subscriptions rather than projects. Helps with financial planning and reduces sales cycles.

Working capital optimization: Negotiate longer payment terms with vendors (45-60 days). Collect faster from customers (offer early payment discounts). Use invoice factoring for immediate cash on receivables.

Invoice factoring and discounting: Sell unpaid invoices at discount (typically 2-5% fee). Providers in India: KredX, Vayana, TReDS platform. Get 80-90% of invoice value immediately. Works well for B2B businesses with creditworthy customers.

Government and enterprise payment optimization: Large companies often have 60-90 day payment cycles. Budget for this delay in working capital planning. Some buyers offer supply chain financing through their banks. GST input credit locked until customer files returns - factor this in.', '["Analyze pricing structure for annual prepayment opportunities", "Identify pre-sale possibilities for upcoming products/features", "Evaluate invoice factoring providers for your receivables", "Create working capital optimization plan"]'::jsonb, '["Annual Pricing Calculator with discount modeling", "Pre-Sales Campaign Template", "Invoice Factoring Provider Comparison", "Working Capital Optimization Checklist"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_2_id, 8, 'Hybrid Funding Strategies', 'Most successful startups use a combination of funding sources. Understanding how to blend different capital types optimizes for both growth and founder outcomes.

The funding stack approach: Layer 1: Founder capital and sweat equity. Layer 2: Revenue and customer funding. Layer 3: Grants and non-dilutive capital. Layer 4: Revenue-based financing. Layer 5: Angel/VC equity (when truly needed).

Strategic use of grants: Startup India Seed Fund: Up to Rs 50 lakh for ideation, Rs 25 lakh for validation. State startup grants: Karnataka (Rs 50 lakh), Telangana (Rs 50 lakh), Kerala (Rs 25 lakh). Sector grants: BIRAC for biotech, DST for deep tech, MEITY for software. Grants extend runway without dilution - always pursue before equity.

Blending RBF with equity: Use RBF for working capital, preserve equity for growth. RBF for inventory/marketing, equity for product/team. Example: Rs 50 lakh equity + Rs 50 lakh RBF = Rs 1 crore capital with less dilution than Rs 1 crore equity.

Convertible instruments: Convertible notes and SAFEs provide flexibility. Raise small amounts without setting valuation. Convert to equity at next priced round with discount (typically 15-25%). Common for bridge rounds or when valuation difficult to determine.

Strategic timing of different capital: Early stage: Grants + founder capital + small angel checks. Growth stage: Equity round + RBF for working capital. Scale stage: Larger equity + venture debt.

Family and friends round structuring: Common in India - friends and family often willing to support. Structure properly: Convertible note or equity with clear terms. Keep it professional to avoid relationship damage. Typical range: Rs 10-50 lakh cumulative.

Matching capital type to use of funds: Product development: Equity (long-term value creation). Working capital/inventory: RBF or debt (short-term need). Marketing experiments: Revenue or RBF (clear ROI). Team building: Equity (long-term investment).', '["Map your capital needs to appropriate funding types", "Identify grant programs relevant to your sector and stage", "Design optimal funding stack for next 24 months", "Create timeline for pursuing different funding sources"]'::jsonb, '["Funding Stack Planning Template", "Grant Program Database for Indian Startups", "Convertible Note Term Sheet Template", "Friends and Family Round Structuring Guide"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 3: Angel Investors (Days 9-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Angel Investors',
        'Navigate the angel investor landscape in India. Learn to identify, approach, and close angel investors including networks like Indian Angel Network, Mumbai Angels, and individual super-angels.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_3_id, 9, 'Angel Investor Landscape in India', 'India has a vibrant angel investor ecosystem with 4,500+ active angels. Understanding this landscape helps you target the right investors for your startup.

Major angel networks: Indian Angel Network (IAN) is India''s largest with 500+ members across chapters in Delhi, Mumbai, Bangalore, and other cities. IAN has invested Rs 900+ crore across 200+ companies including Druva (unicorn), Box8, Wow Momo. Application process: Online application, screening, pitch to chapter, due diligence, investment committee. Average deal size: Rs 50 lakh - Rs 2 crore.

Mumbai Angels: 450+ members, focused on early-stage investments. Notable investments include OYO Rooms, Myntra, Druva. Known for quick decision-making and strong follow-on support. Average ticket: Rs 25 lakh - Rs 1 crore.

Chennai Angels: 200+ members, strong in manufacturing and healthcare sectors. Known for detailed due diligence and hands-on involvement. Good fit for B2B and traditional sector innovation.

Hyderabad Angels: Active in pharma, life sciences, and IT services. Strong network in Telangana startup ecosystem.

Platform-based angel investing: LetsVenture: Online platform connecting startups with 8,000+ angels. Invest alongside lead investors in syndicates. Ticket sizes from Rs 5 lakh. AngelList India: Part of global AngelList, growing presence. Facilitates syndicate deals and rolling funds.

Super-angels and prolific individuals: Rajan Anandan: Former Google India head, 100+ investments. Kunal Shah: CRED founder, invests in consumer and fintech. Anupam Mittal: Shaadi.com founder, active angel especially in consumer. Binny Bansal: Flipkart co-founder, prolific angel investor. Sanjay Mehta: 100 Unicorns fund, early-stage focus.

Sector-focused angels: Healthcare: Dr. Devi Shetty, Ronnie Screwvala (Swasth). Fintech: Jitendra Gupta, Kunal Shah. B2B: Shekhar Kirani (Accel), through personal investing. Deep tech: Angels from IIT ecosystem.

Angel expectations: Typical equity: 10-20% for Rs 25 lakh - Rs 1 crore. Timeline: 2-4 weeks from pitch to close (faster than VCs). Value-add varies widely - some very hands-on, others passive. Follow-on: Best angels help with next round introductions.', '["Create target list of 20 angel investors relevant to your sector", "Research each angel''s portfolio and investment thesis", "Identify mutual connections for warm introductions", "Prepare angel-specific pitch adjusting for individual preferences"]'::jsonb, '["Indian Angel Network Application Guide", "Angel Investor Database (500+ profiles)", "Super-Angel Investment Thesis Compilation", "Angel Pitch Customization Framework"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_3_id, 10, 'Approaching Angel Investors', 'The approach to angel investors differs significantly from VC outreach. Angels invest personal capital and often make decisions based on personal conviction and founder relationship.

The warm introduction imperative: Cold emails to angels have <5% response rate. Warm introductions through mutual connections are 10x more effective. Sources of introductions: Portfolio founders (best), mutual professional contacts, alumni networks, accelerator networks.

Crafting your outreach: Keep initial email under 200 words. Include: One-line description, key traction metric, specific ask, reason for reaching out to this investor. Example: "Building [product] for [market]. Rs 15 lakh MRR, 40% M-o-M growth. Raising Rs 50 lakh seed round. Would love your perspective given your experience with [portfolio company]."

Angel pitch structure: 10-minute pitch is common (shorter than VC): Problem (1 min): Clear, relatable, urgent. Solution (2 min): Demo if possible, unique approach. Traction (2 min): The most important slide - metrics, growth, validation. Team (1 min): Why you will win. Market (1 min): Big enough opportunity. Ask (1 min): Clear amount and use of funds. Angels often decide based on: Founder impression, market intuition, gut feeling.

Network application process (IAN, Mumbai Angels): Online application with detailed questionnaire. Initial screening by investment committee. Selected startups pitch to relevant chapter. Due diligence process (1-2 weeks). Final investment committee approval. Documentation and funding (1-2 weeks).

Platform approach (LetsVenture, AngelList): Create profile with pitch deck and data room. Apply to open syndicates or create your own raise. Lead investor sets terms, others follow. Platform handles documentation and compliance.

Meeting logistics: Angels often prefer informal settings - coffee meetings common. Be prepared for personal questions - angels assess founder character. Follow up promptly with any requested information. Respect their time - they have day jobs typically.',
        '["Identify 5 warm introduction paths to target angels", "Craft personalized outreach messages for top 10 angels", "Prepare 10-minute angel-specific pitch", "Apply to 2-3 angel networks with complete applications"]'::jsonb,
        '["Angel Outreach Email Templates", "Warm Introduction Request Scripts", "Angel Pitch Deck Template (10 slides)", "Angel Network Application Optimization Guide"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    ),

    (gen_random_uuid()::text, v_module_3_id, 11, 'Angel Tax and Section 56(2)(viib)', 'The "angel tax" under Section 56(2)(viib) of the Income Tax Act has been a major concern for Indian startups. Understanding and navigating this provision is critical when raising angel funding.

What is angel tax: Section 56(2)(viib) taxes share premium received by unlisted companies. If shares issued above Fair Market Value (FMV), the excess is taxed as income of the company. Tax rate: 30% + surcharge + cess (effectively ~35%). Example: If FMV is Rs 100/share but you issue at Rs 200/share, Rs 100 premium is taxable income.

Why this matters for startups: Startups often raise at valuations above traditional FMV methods justify. Rs 1 crore raise at Rs 10 crore valuation might trigger significant tax. Notices from tax department have disrupted many startups.

Exemptions available: DPIIT-recognized startups exempted if: Aggregate paid-up capital and share premium < Rs 25 crore post-issue. Investor is Category I AIF or resident individual/HUF. Investment is not made through ineligible sources. Must be a recognized startup under Startup India scheme.

DPIIT recognition requirements: Private Limited Company or LLP. Less than 10 years from incorporation. Turnover not exceeding Rs 100 crore in any year. Working towards innovation, development, or improvement of products/processes/services. Entity not formed by splitting or reconstruction of existing business.

Fair Market Value (FMV) methods: DCF Method: Based on projected cash flows - commonly used for startups. NAV Method: Based on net asset value - not suitable for tech startups. Comparable transaction method: Based on similar company valuations. DPIIT-recognized startups can use merchant banker valuation.

Compliance steps: Get DPIIT recognition before raising funding. Obtain valuation certificate from registered merchant banker. Ensure investor eligibility documentation. File Form 2 (exemption declaration) with income tax. Maintain documentation for potential scrutiny.

Recent developments (2023-2024): Budget 2023 increased exemption threshold to Rs 25 crore. CBDT clarifications provided additional relief. Still advisable to obtain proper valuation and maintain documentation.

Practical recommendations: Always get DPIIT recognition before raising (free, takes 2-3 weeks). Obtain valuation certificate even if claiming exemption (Rs 10,000-25,000 cost). Structure round properly - multiple small tranches vs one large can have different treatment. Consult tax advisor before closing round to ensure compliance.',
        '["Check and apply for DPIIT recognition if not already obtained", "Obtain FMV valuation certificate from registered merchant banker", "Review investor eligibility against angel tax exemption criteria", "Prepare documentation file for potential tax scrutiny"]'::jsonb,
        '["DPIIT Recognition Application Guide", "Angel Tax Exemption Checklist", "Valuation Certificate Sample and Requirements", "Section 56(2)(viib) Compliance Tracker"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    ),

    (gen_random_uuid()::text, v_module_3_id, 12, 'Closing Angel Rounds', 'Closing an angel round requires managing multiple investors, documentation, and compliance. A structured approach ensures smooth execution.

Term sheet negotiation with angels: Simpler than VC term sheets typically. Key terms: Valuation (pre-money), Amount being raised, Equity percentage, Pro-rata rights for future rounds, Information rights, Board observer seat (sometimes). Avoid complex terms like liquidation preferences at angel stage.

Angel round documentation: Shareholders Agreement (SHA): Rights and obligations of all shareholders. Share Subscription Agreement (SSA): Terms of share purchase. Articles of Association amendment: If needed for new rights. Board resolution: Approving the allotment. Compliance filings: ROC forms within timelines.

Managing multiple angels: Angel rounds often have 3-10+ investors. Designate one "lead angel" to coordinate. Lead negotiates terms, others follow. Consider creating angel syndicate vehicle for cleaner cap table.

Valuation certificate requirements: Registered merchant banker valuation mandatory under Companies Act for share pricing above par. DCF (Discounted Cash Flow) method most common for startups. Cost: Rs 10,000-30,000 depending on complexity. Timeline: 3-7 days typically.

FEMA compliance for NRI/foreign angels: Prior approval not required but post-facto reporting mandatory. Form FC-GPR filing within 30 days of receiving funds. Pricing compliance with RBI guidelines. Foreign angels: Additional documentation requirements.

Closing timeline and checklist: Week 1: Term sheet agreement, valuation certificate. Week 2: Legal documentation drafting. Week 3: Investor KYC, documentation signing. Week 4: Fund receipt, share allotment, ROC filings. Total timeline: 3-4 weeks from term sheet to close.

Post-close obligations: Allot shares within 60 days of receiving money. File PAS-3 (return of allotment) with ROC within 30 days. Update register of members. Issue share certificates within 2 months. If FEMA applicable, file FC-GPR within 30 days.

Common closing delays and how to avoid: KYC issues: Collect investor documents early. Valuation delays: Engage valuer immediately after term sheet. Legal back-and-forth: Use standard documents, minimize negotiation. Fund transfer issues: Confirm banking details and forex processes early.',
        '["Create angel round closing checklist with all milestones", "Engage valuation firm and legal counsel", "Prepare investor KYC collection process", "Draft board resolution for share allotment"]'::jsonb,
        '["Angel Round Term Sheet Template", "Shareholders Agreement Template (Angel Stage)", "Angel Round Closing Checklist", "ROC Filing Guide for Share Allotment"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Seed Funding (Days 13-16)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Seed Funding',
        'Master seed stage fundraising from micro-VCs and seed funds. Learn benchmarks, processes, and negotiation strategies for Rs 1-5 crore raises.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_4_id, 13, 'Seed Fund Landscape', 'The seed funding ecosystem in India has matured significantly with dedicated micro-VCs and seed funds deploying Rs 1-5 crore per deal. Understanding this landscape helps target the right investors.

Active seed funds in India: Titan Capital: Founded by Snapdeal founders, Rs 250 crore fund, 100+ investments including Razorpay, Mamaearth, Urban Company. Invests Rs 25 lakh - Rs 2 crore. First Cheque: Rs 100 crore fund focused on first institutional check for startups. Led by Bhavin Turakhia. Invests Rs 1-3 crore. Better Capital: Solo GP fund by Vaibhav Domkundwar, focused on exceptional founders. Antler India: Global pre-seed investor with India presence, accelerator model.

Micro-VCs active in seed: Blume Ventures: Early-stage focused, Rs 700 crore fund. Notable investments: Unacademy, Slice, HealthifyMe. 3one4 Capital: Bangalore-based, Rs 600 crore AUM. Strong in enterprise and consumer. India Quotient: Early-stage focus on Bharat-centric startups. Sauce.vc: Focused on consumer brands and D2C.

Accelerator-linked funding: Y Combinator India: $500K standard deal, highly competitive. Techstars: Various programs, $120K investment. Global Founders Capital: Scout program for early stage.

Seed round benchmarks: Round size: Rs 1-5 crore ($ 150K - $600K). Valuation: Rs 5-25 crore pre-money. Dilution: 15-25% typical. Expected traction: MVP live, initial customers, early revenue signal. Team: 2-3 founders, 5-10 people total.

What seed investors look for: Founder quality: Domain expertise, complementary skills, resilience. Market size: Minimum Rs 5,000 crore TAM for venture returns. Product: Working MVP with user validation. Traction: Early signals of product-market fit. Unit economics: Path to profitability even if currently losing money.

Seed vs angel investment differences: More structured process (closer to VC than angel). Formal term sheets with institutional terms. Due diligence more thorough. Timeline: 6-8 weeks typically. More standardized documentation.', '["Create target list of 15 seed funds relevant to your sector", "Research recent seed deals in your space for benchmark data", "Assess your metrics against seed stage expectations", "Identify which seed investors have portfolio overlap synergies"]'::jsonb, '["Indian Seed Fund Database (50+ funds)", "Seed Round Benchmark Data by sector", "Seed Investor Thesis Compilation", "Seed Stage Metrics Dashboard Template"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_4_id, 14, 'Building Seed Stage Traction', 'Seed investors need to see signals of product-market fit. This lesson covers how to build and demonstrate the traction required for seed funding.

What counts as seed-stage traction: B2B SaaS: 5-15 paying customers, Rs 2-10 lakh MRR, strong engagement metrics. Consumer app: 10K-50K MAU, retention curves flattening, clear engagement patterns. Marketplace: Rs 10-50 lakh GMV/month, liquidity in core market, repeat usage. D2C: Rs 5-15 lakh monthly revenue, repeat purchase rate >25%, CAC payback <6 months.

Quality over quantity: 10 deeply engaged users > 1,000 casual signups. Net Promoter Score (NPS) of 50+ indicates strong fit. Organic growth and word-of-mouth signal true value. User testimonials and case studies build credibility.

Demonstrating product-market fit signals: Retention curves: Show D1, D7, D30, D90 retention. Cohort analysis: Each cohort better than previous. Revenue retention: Net Revenue Retention >100% for B2B. Organic vs paid: High organic percentage shows pull. Time to value: Quick user activation indicates strong fit.

Building traction efficiently: Focus on narrow segment first - dominate before expanding. Manual processes before automation - do things that don''t scale. Obsessive user feedback loops - weekly user calls minimum. Rapid iteration cycles - ship weekly, measure constantly.

Traction metrics dashboard: Create investor-ready metrics dashboard: Core metrics: MAU, Revenue, Growth rate. Engagement: DAU/MAU, session length, feature adoption. Economics: CAC, LTV, payback period, margins. Funnel: Conversion rates at each stage. Update weekly and track month-over-month trends.

When you have enough traction to raise seed: Revenue growing 15%+ month-over-month consistently. Retention metrics in healthy range for your model. Clear understanding of what drives growth. Identified scalable customer acquisition channel. Team in place to execute next stage plan.', '["Define your seed-stage traction targets for next 3 months", "Build metrics dashboard tracking key indicators weekly", "Identify 3 growth experiments to accelerate traction", "Create traction narrative connecting metrics to product-market fit"]'::jsonb, '["Seed Stage Traction Benchmarks by Business Model", "Metrics Dashboard Template (Notion/Sheets)", "Product-Market Fit Assessment Framework", "Growth Experiment Prioritization Matrix"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_4_id, 15, 'Seed Pitch and Process', 'The seed fundraising process requires a compelling pitch and systematic execution. This lesson covers how to navigate the process effectively.

Seed pitch deck structure (12-15 slides): Cover: Company name, tagline, logo. Problem: Clear problem statement with data. Solution: Your product and unique approach. Demo/Product: Screenshots, video, or live demo. Traction: The money slide - all key metrics. Business Model: How you make money. Market: TAM/SAM/SOM with credible sources. Competition: Honest landscape, your differentiation. Team: Founders and key hires. Financials: High-level projections, assumptions. Ask: Amount, use of funds, timeline. Appendix: Additional metrics, customer logos, press.

Seed pitch delivery: 15-20 minute pitch is standard. Focus 30% on traction - this is what matters most. Tell a story - investors remember narratives. Anticipate tough questions and prepare answers. Practice 20+ times before real pitches.

Running an efficient seed process: Week 1-2: Create target investor list (20-30), get warm introductions. Week 3-4: First meetings with Tier 2 investors for practice. Week 5-6: Pitch Tier 1 investors with refined pitch. Week 7-8: Follow-ups, partner meetings, term sheet negotiation. Week 9-10: Due diligence, documentation, close.

Managing investor pipeline: Track every interaction in CRM (Notion, Airtable, or simple spreadsheet). Note: Next steps, timeline, champion within firm. Follow up within 24 hours of every meeting. Keep top 5 prospects warm with regular updates.

Creating competitive dynamics: Run parallel processes - don''t pitch sequentially. Share progress updates ("Just closed meeting with X fund"). If you get a term sheet, inform other interested investors. FOMO is real - create urgency without being manipulative.

Responding to seed investor objections: "Too early": Discuss milestones that would change their mind, ask to reconnect. "Market too small": Challenge their assumptions with data, show expansion potential. "Competitive market": Emphasize differentiation, show why you''ll win. "Team gaps": Acknowledge and share hiring plan. "Valuation high": Focus on quality of opportunity, be prepared to negotiate.', '["Build seed pitch deck following the 12-slide structure", "Create investor pipeline tracker with 25+ target investors", "Practice pitch with 5 friendly audiences for feedback", "Develop seed fundraising timeline and execution plan"]'::jsonb, '["Seed Pitch Deck Template (Canva/Figma)", "Investor Pipeline Tracker Template", "Pitch Practice Feedback Form", "Seed Fundraising Timeline Planner"]'::jsonb, 120, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_4_id, 16, 'Seed Term Sheets and Closing', 'Understanding seed term sheets and managing the close process ensures you get good terms and complete the round efficiently.

Key seed term sheet components: Valuation: Pre-money valuation determining equity percentage. Round size: Total amount being raised. Lead investor rights: Board seat, information rights. Pro-rata: Right to maintain percentage in future rounds. Option pool: Equity reserved for future employees (typically 10-15% post-money). Liquidation preference: Usually 1x non-participating at seed.

Seed term sheet red flags: Participating liquidation preference: Investor gets money back AND shares - avoid. High cumulative dividends: Adds to amount owed - unnecessary at seed. Full ratchet anti-dilution: Too punitive - prefer weighted average. Excessive board control: One board seat max for seed investor. Founder vesting restart: Should continue existing vesting, not restart.

Negotiation priorities at seed: Worth fighting for: Valuation (within reason), option pool size, pro-rata terms. Accept standard: 1x non-participating liquidation preference, weighted average anti-dilution. Don''t over-negotiate: Information rights, standard protective provisions.

Due diligence preparation: Financial: Last 2 years statements, current MIS, bank statements. Legal: Incorporation docs, contracts, IP assignments, cap table. Customer: Reference customers for calls, usage data. Technical: Code review (sometimes), security practices.

Documentation for seed round: Term sheet: Non-binding outline of deal terms. Share Subscription Agreement (SSA): Binding purchase terms. Shareholders Agreement (SHA): Ongoing rights and obligations. Articles of Association: Updated for new provisions. Board resolutions: Approving all transactions.

Closing process timeline: Day 1-3: Term sheet negotiation and signing. Day 4-14: Due diligence and documentation drafting. Day 15-21: Documentation negotiation and signing. Day 22-30: Fund transfer, share allotment, ROC filings.

Common closing issues: Cap table discrepancies: Clean up before due diligence. Missing IP assignments: Ensure all founders assigned IP to company. Tax compliance gaps: Clear any pending GST, TDS issues. Contract issues: Customer/vendor contracts without proper terms.', '["Review seed term sheet checklist to understand all terms", "Prepare due diligence data room with all required documents", "Identify and address any red flags in your current setup", "Draft negotiation priorities list for term sheet discussions"]'::jsonb, '["Seed Term Sheet Decoder Guide", "Due Diligence Checklist for Seed", "Data Room Setup Template", "Term Sheet Negotiation Priorities Framework"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 5: Series A and Institutional VCs (Days 17-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Series A and Institutional VCs',
        'Navigate Series A fundraising with institutional VCs like Sequoia, Accel, Matrix, and Elevation. Understand VC economics, processes, and how to position for institutional investment.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_5_id, 17, 'Understanding VC Economics', 'To raise from VCs effectively, understand how they think. VC fund economics drive their investment decisions, portfolio construction, and expectations from founders.

VC fund structure: VCs raise from Limited Partners (LPs): pension funds, endowments, family offices, fund of funds. Fund lifecycle: 10 years typically - 3-4 years investing, 6-7 years harvesting. Management fee: 2% of fund size annually (funds operations). Carried interest: 20% of profits above threshold (the real upside).

Fund economics example: Rs 500 crore fund deploying over 3-4 years. Target: 3x fund return (Rs 1,500 crore) over 10 years. Portfolio: 25-30 companies typically. Per company: Average investment Rs 15-20 crore across rounds. Win expectation: 1-2 companies return the entire fund, rest are write-offs or small returns.

What this means for founders: VCs need BIG outcomes - Rs 100 crore exits don''t move the needle. Power law dynamics: 90% of returns come from top 10% of investments. VCs prefer concentrated bets on potential breakouts. They would rather miss a deal than invest in something that returns 2x.

VC portfolio construction: Initial checks: Series A investment, typically Rs 15-40 crore. Reserve capital: Keep 2-3x initial investment for follow-ons. Pro-rata: Right to maintain ownership percentage in future rounds. Portfolio support: Active board involvement, operational support.

Indian VC landscape benchmarks: Series A range: Rs 15-50 crore ($ 2-6M). Typical ownership target: 15-25% at Series A. Board seat: Expected by lead Series A investor. Active involvement: Monthly/quarterly board meetings, strategic guidance.

Top VCs in India by Series A activity: Peak XV Partners (formerly Sequoia): Largest India-focused VC, sector agnostic, Rs 15,000+ crore AUM. Accel: Strong in enterprise and consumer, Rs 4,000+ crore India fund. Matrix Partners: Fintech expertise, Rs 3,500 crore fund. Elevation Capital: Consumer and B2B focus, Rs 5,000 crore fund. Lightspeed: Consumer tech focus, Rs 3,500 crore India fund. Nexus Venture Partners: B2B and enterprise focus.', '["Research fund economics of your target VCs", "Understand how your potential outcome fits VC return expectations", "Identify which VCs have raised recent funds (more active deploying)", "Map VC partners by sector expertise and portfolio"]'::jsonb, '["VC Fund Economics Explained Guide", "Indian VC Fund Database with AUM data", "VC Partner Directory by sector focus", "Series A Deal Activity Tracker"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_5_id, 18, 'Series A Readiness', 'Series A is a significant milestone requiring proven product-market fit, scalable economics, and a credible path to large outcomes. Assess your readiness honestly.

Series A benchmarks by business model: B2B SaaS: Rs 1-2 crore ARR, 100%+ NRR, 10-15% month-over-month growth. Consumer: 5-10 lakh MAU, strong retention (D30 >30%), clear engagement. Marketplace: Rs 2-5 crore monthly GMV, positive unit economics, liquidity. D2C: Rs 15-25 crore annual revenue, 40%+ gross margin, CAC payback <6 months. Fintech: Depends on model - lending needs Rs 50+ crore book, payments need volume.

What VCs look for at Series A: Product-market fit: Strong retention, organic growth, customer love. Unit economics: Path to positive contribution margin. Scalability: Can growth continue with more capital? Team: A-team in place for next stage. Market: Large TAM with defensible position.

The "Series A crunch" reality: Many seed-funded companies never reach Series A. Common failures: Couldn''t achieve PMF, ran out of runway, team issues. Bridge rounds common: 40% of seed companies raise bridge before Series A. Prepare: 18-month runway minimum before starting Series A process.

Pre-Series A preparation: Financial cleanup: Audit-ready books, clear cap table. Legal cleanup: All contracts in place, IP assigned, compliance current. Metrics dashboard: Real-time visibility into all KPIs. Data room: Due diligence ready documents organized.

Team for Series A: Founding team: Demonstrated ability to attract talent. Key hires: Product, engineering, sales leaders in place or identified. Advisory board: Industry experts adding credibility. Board composition: Clean, ideally with seed investor observer.

Series A timing: Start process with 12+ months runway remaining. Process takes 3-4 months typically. Don''t raise too early: Weak metrics mean lower valuation or no deal. Don''t raise too late: Desperation shows and weakens negotiating position.', '["Score your startup against Series A benchmarks for your model", "Identify gaps between current state and Series A requirements", "Create 6-month plan to achieve Series A readiness", "Build Series A-ready data room and financial model"]'::jsonb, '["Series A Readiness Scorecard", "Business Model Specific Benchmark Guide", "Pre-Series A Preparation Checklist", "Series A Financial Model Template"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_5_id, 19, 'VC Fundraising Process', 'Series A fundraising is more structured and longer than seed. Understanding the VC process helps you navigate it effectively.

VC decision-making process: Sourcing: VCs find deals through referrals, portfolio companies, conferences. Partner pitch: Initial meeting with one partner (30-60 min). Team meeting: Pitch to multiple partners (if initial interest). Partner meeting: Full partnership discussion (weekly). Term sheet: If approved, formal terms issued. Due diligence: 4-6 weeks of detailed verification. Close: Legal documentation and funding.

Building relationships early: Start building VC relationships 12-18 months before raise. Share quarterly updates with interested VCs. Get advice on specific challenges - builds rapport. When ready to raise, warm relationship accelerates process.

The VC pitch: Longer and deeper than seed pitch (45-60 minutes). Expect interruptions and questions throughout. Know your numbers cold - every metric, every assumption. Prepare for "why will you win" and "what could go wrong" questions.

Managing VC process: Create tiered investor list: 5 Tier 1 (dream investors), 10 Tier 2 (good fit), 10 Tier 3 (acceptable). Start with Tier 2 for practice, move to Tier 1 with momentum. Run parallel processes - don''t pitch sequentially. Weekly update cadence to maintain momentum.

Partner dynamics: Each VC partner has different interests and track record. Research which partner would champion your deal. Some partners focus on sectors, others on stages. Getting the right partner matters as much as getting the right firm.

Common VC concerns and responses: Market size: Show bottom-up analysis, expansion potential. Competition: Demonstrate differentiation, why you win. Team: Acknowledge gaps, show hiring plan. Unit economics: Path to profitability, when and how. Scalability: Evidence that growth continues with capital.', '["Create tiered VC target list with 25 firms", "Research partners at each firm and their investment focus", "Build relationship-building plan for 6-12 months pre-raise", "Prepare for common VC questions with documented answers"]'::jsonb, '["VC Target List Template with tracking", "Partner Research Guide", "VC Relationship Building Playbook", "Series A Q&A Preparation Document"]'::jsonb, 120, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_5_id, 20, 'Series A Terms and Negotiation', 'Series A term sheets are more complex than seed. Understanding each provision and knowing what to negotiate ensures founder-friendly terms.

Key Series A terms: Valuation: Pre-money valuation, typically Rs 50-150 crore for Indian Series A. Round size: Rs 15-50 crore typically. Liquidation preference: Usually 1x non-participating. Anti-dilution: Weighted average broad-based. Option pool: 15-20% post-money typical. Board composition: 2 founders, 1 VC, 1-2 independents.

Liquidation preference deep dive: 1x non-participating: Investor gets money back OR shares (whichever higher). 1x participating: Investor gets money back AND shares - avoid this. Seniority: Series A pari passu or senior to seed? Multiple preferences stack: Rs 50 crore Series B + Rs 20 crore Series A = Rs 70 crore before common.

Anti-dilution provisions: Protects investors if future round is at lower valuation (down round). Broad-based weighted average: Standard, relatively founder-friendly. Narrow-based weighted average: More investor-friendly. Full ratchet: Most investor-friendly, avoid this.

Protective provisions: Standard provisions VCs require: Approval for new equity issuance, debt, major acquisitions, changes to charter. Reasonable: Don''t fight standard protective provisions. Watch for: Overly broad provisions that limit operating flexibility.

Board composition and governance: Standard: 2 founders, 1 VC, 1-2 independents. VC board seat comes with Series A investment. Board observer rights for smaller investors. Avoid: Giving board control to investors at Series A.

Founder vesting and lockup: VCs want founders locked in - reasonable expectation. Standard: 4-year vesting with 1-year cliff. Credit for time served: Don''t restart vesting entirely. Acceleration: Single-trigger (on acquisition) or double-trigger (acquisition + termination).

Negotiation priorities: Worth fighting: Valuation, option pool size, board composition. Accept standard: 1x non-participating preference, weighted-average anti-dilution. Don''t over-optimize: You need investor support for success.', '["Review Series A term sheet explainer for each provision", "Understand liquidation preference scenarios through modeling", "Identify your negotiation priorities vs acceptable terms", "Model different valuation and dilution scenarios"]'::jsonb, '["Series A Term Sheet Decoder", "Liquidation Preference Calculator", "Negotiation Priorities Framework", "Cap Table Modeling Tool"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 6: Government Grants & SIDBI (Days 21-24)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Government Grants & SIDBI',
        'Access non-dilutive funding through government grants, SIDBI schemes, and Startup India programs. Learn to navigate the ecosystem and maximize grant success.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_6_id, 21, 'Startup India Seed Fund Scheme', 'The Startup India Seed Fund Scheme (SISFS) provides Rs 50 lakh - Rs 1 crore to DPIIT-recognized startups through approved incubators. Understanding this scheme is essential for early-stage funding.

SISFS overview: Total corpus: Rs 945 crore deployed through 300+ incubators nationwide. Funding per startup: Up to Rs 20 lakh for validation, up to Rs 50 lakh for growth. Equity or debt: Funding through convertible instruments or equity. Non-dilutive grants also available for ideation stage.

Eligibility criteria: DPIIT-recognized startup (mandatory). Not more than 2 years old at application. Working towards innovation/IP creation. Minimum viable product ready for growth funding. Based in India with Indian founder(s).

Incubator-mediated process: Step 1: Identify approved incubator (300+ across India). Step 2: Apply to incubator''s seed fund program. Step 3: Incubator evaluates and recommends to SISFS. Step 4: SISFS committee approves disbursement. Step 5: Funding released through incubator.

Finding the right incubator: Government list at: seedfund.startupindia.gov.in. Filter by state, sector focus, and available corpus. Top incubators by deployment: IIT-M Incubation Cell, NSRCEL (IIM-B), T-Hub, KIIT-TBI. Apply to multiple incubators to increase chances.

Application tips: Clear problem statement with market validation. Working MVP or prototype demonstration. Detailed use of funds plan. Strong founder credentials and commitment. Innovation angle - what''s novel about your approach?

Common SISFS mistakes: Applying without DPIIT recognition (auto-reject). Poor articulation of innovation component. Unrealistic financial projections. Incomplete documentation. Missing the incubator-specific requirements.

Post-funding obligations: Progress reporting to incubator quarterly. Milestone achievement within defined timelines. Exit through equity conversion or repayment. Maintain DPIIT recognition status.

Success rates and timeline: Selection rate: 10-15% of applications. Timeline: 3-6 months from application to funding. Funding release: Milestone-based in most cases.', '["Check DPIIT recognition status and apply if needed", "Identify 5 approved incubators relevant to your sector and location", "Prepare SISFS application with required documentation", "Contact incubators to understand their specific evaluation criteria"]'::jsonb, '["SISFS Approved Incubator Directory", "SISFS Application Checklist", "DPIIT Recognition Application Guide", "Incubator Outreach Template"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_6_id, 22, 'SIDBI and Fund of Funds', 'SIDBI (Small Industries Development Bank of India) operates the Rs 10,000 crore Fund of Funds for Startups (FFS). Understanding how this works helps access capital through SEBI-registered AIFs.

SIDBI Fund of Funds structure: Rs 10,000 crore corpus allocated to FFS. Does not invest directly in startups. Invests in SEBI-registered Category I and II AIFs. These AIFs then invest in startups. Enables smaller VCs/AIFs to deploy more capital.

How startups benefit: More capital available in early-stage ecosystem. AIFs receiving SIDBI investment actively seeking startups. Often more founder-friendly terms than pure commercial VCs. Focus on Indian startups building for India.

Finding SIDBI-backed AIFs: List available at sidbi.in/ffs. Filter by sector focus, stage preference, geography. Examples: Blume Ventures, 3one4, India Quotient, many regional funds. Approach these funds knowing SIDBI backing means patient capital.

Direct SIDBI schemes for startups: SIDBI-Startup Mitra: Connects startups with banks and NBFCs. SIDBI-Make in India Soft Loan Fund (SMILE): Loans for manufacturing startups. SIDBI-Growth Capital and Equity Assistance: Equity support for growth-stage startups.

SIDBI eligibility and process: MSME registration recommended. Strong financials and business plan. Sector alignment with SIDBI priorities (manufacturing, services, tech). Apply through identified AIFs or direct schemes.

State-level SIDBI partnerships: SIDBI partners with state governments for startup funding. Examples: Kerala Startup Mission, Karnataka Innovation Fund. These state funds often have easier access than national schemes.

Advantages of SIDBI-backed funding: Patient capital with longer horizons. Developmental mandate beyond pure returns. Often provide additional support (mentoring, connections). Government backing provides credibility.', '["Research SIDBI-backed AIFs active in your sector", "Check eligibility for direct SIDBI schemes", "Explore state-level partnerships relevant to your location", "Prepare documentation aligned with SIDBI requirements"]'::jsonb, '["SIDBI-backed AIF Directory", "SIDBI Direct Schemes Overview", "State-SIDBI Partnership Guide", "SIDBI Application Document Checklist"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_6_id, 23, 'Sector-Specific Government Grants', 'Various government bodies provide grants for specific sectors. These non-dilutive funding sources can be game-changers for deep tech and research-heavy startups.

BIRAC for Biotech: Biotechnology Industry Research Assistance Council. Programs: BIG (Rs 50 lakh for ideation), SBIRI (Rs 1 crore for proof of concept), BIPP (Rs 3-5 crore for later stage). Focus: Healthcare, agriculture, industrial biotech. Application: birac.nic.in, quarterly calls typically.

DST for Science & Technology: Department of Science & Technology grants. NIDHI Programs: PRAYAS (Rs 10 lakh for prototyping), EIR (Rs 30,000/month fellowship), TBI (incubator funding). SERB grants for research-oriented startups. Focus: Deep tech, clean tech, research commercialization.

MEITY for IT: Ministry of Electronics and IT. TIDE 2.0: Technology Incubation and Development of Entrepreneurs. Grants up to Rs 3.25 crore for tech startups through incubators. Focus: AI/ML, blockchain, IoT, cybersecurity.

MSME schemes: CLCSS: Credit Linked Capital Subsidy (15% subsidy on equipment). CGTMSE: Collateral-free loans up to Rs 2 crore. ASPIRE: Fund for incubation and entrepreneurship.

State-specific grants: Karnataka: Rs 50 lakh through KITS scheme. Telangana: Rs 25 lakh through T-Hub. Kerala: Rs 25 lakh through KSUM. Tamil Nadu: TANSIM grants and subsidies. Maharashtra: MAITRI grants for innovation.

Grant application best practices: Read guidelines thoroughly - eligibility criteria strict. Align proposal with scheme objectives explicitly. Budget justification must be detailed and realistic. Technical documentation should be comprehensive. Letters of support from potential customers/partners help.

Grant monitoring and compliance: Most grants have milestone-based release. Quarterly/annual progress reports mandatory. Utilization certificates required. Audit requirements for larger grants. Non-compliance can require repayment.', '["Identify 3-5 grants relevant to your sector and stage", "Review eligibility criteria and application requirements", "Prepare technical documentation for grant applications", "Note application deadlines and plan submissions"]'::jsonb, '["Sector Grant Program Directory", "Grant Proposal Writing Guide", "Budget Justification Template", "Grant Compliance Checklist"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_6_id, 24, 'Maximizing Grant Success', 'Grant applications require specific skills and preparation. This lesson covers strategies to maximize your success rate in government grant applications.

Understanding grant evaluation: Technical merit: Is the innovation genuine and valuable? Commercial viability: Can this become a sustainable business? Team capability: Can these founders execute? Alignment: Does it fit scheme objectives? Budget reasonableness: Is the ask justified and realistic?

Proposal writing excellence: Executive summary: Compelling 1-page overview. Problem statement: Clear articulation with data. Innovation: What''s novel and defensible? Market analysis: Credible sizing and opportunity. Implementation plan: Detailed milestones and timeline. Team: Highlight relevant credentials. Budget: Line-item justification for every expense.

Common grant proposal mistakes: Copy-paste from other applications (evaluators notice). Unrealistic milestones and timelines. Inflated market size claims without basis. Missing required sections or documentation. Late submission or incomplete forms.

Building grant-worthy credibility: Publications, patents, or prior research. Industry letters of support. Customer letters of intent. Technical validation from domain experts. Previous grant track record (success breeds success).

Grant stacking strategy: Multiple grants can be combined (different components). Example: BIRAC for R&D + MEITY for tech development. Clearly segregate spending to avoid double-dipping. Coordinate timelines for maximum runway.

Timeline management: Application deadlines are strict - no exceptions. Review cycles take 3-6 months typically. Budget for uncertainty - don''t count on grant until received. Have backup plan if grant doesn''t come through.

Post-award optimization: Build relationship with program officer. Report successes proactively. Request no-cost extensions if needed. Position for follow-on grants. Use grant validation for equity fundraising credibility.', '["Audit current applications for common mistakes", "Build credibility documentation for future applications", "Create grant application calendar with deadlines", "Develop grant stacking strategy for your funding plan"]'::jsonb, '["Grant Proposal Evaluation Rubric", "Credibility Building Checklist", "Grant Application Timeline Planner", "Grant Stacking Strategy Template"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 7: Venture Debt (Days 25-28)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Venture Debt',
        'Leverage venture debt to extend runway without dilution. Understand when venture debt makes sense, key providers in India, and how to structure debt facilities.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_7_id, 25, 'Understanding Venture Debt', 'Venture debt provides non-dilutive capital to startups, typically alongside or after equity rounds. Understanding when and how to use it optimizes your capital structure.

What is venture debt: Debt financing for venture-backed startups. Unlike traditional bank loans, doesn''t require profitability or hard collateral. Typically comes with warrants (equity kicker). Used alongside equity to reduce dilution.

Venture debt vs equity: Debt: Non-dilutive but requires repayment, has interest cost. Equity: Dilutive but no repayment, patient capital. Optimal: Use debt for predictable needs, equity for uncertain bets.

Venture debt structure: Principal: Rs 2-10 crore typically (25-50% of last equity round). Term: 24-48 months. Interest rate: 14-18% annually. Warrants: 5-15% of loan amount, exercisable at last round price. Repayment: Interest-only period (6-12 months) then principal amortization.

When venture debt makes sense: After raising equity round (lenders want VC validation). For predictable capital needs (hiring, equipment, working capital). To extend runway to hit milestones for better equity terms. Bridge between equity rounds.

When to avoid venture debt: Pre-product-market fit (too risky, no repayment ability). Burning cash heavily without clear path to revenue. Already high debt load. Equity unavailable (debt won''t solve equity problems).

Venture debt providers in India: Trifecta Capital: Largest venture debt fund in India, Rs 1,500+ crore deployed. InnoVen Capital: Part of Temasek, active across stages. Alteria Capital: Focus on growth-stage startups. BlackSoil: NBFC providing venture debt. Traditional banks: ICICI, HDFC, Kotak have startup lending programs.

Venture debt vs revenue-based financing: Venture debt: Larger amounts, requires equity backing, warrants. RBF: Smaller amounts, revenue-based, no equity kicker. Venture debt better for larger, equity-backed companies. RBF better for bootstrapped or smaller capital needs.', '["Evaluate if venture debt suits your current situation", "Research venture debt providers active in your stage/sector", "Calculate optimal debt amount based on use of funds", "Understand your equity investors'' views on debt"]'::jsonb, '["Venture Debt Suitability Assessment", "Indian Venture Debt Provider Directory", "Debt Sizing Calculator", "Equity-Debt Mix Optimization Guide"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_7_id, 26, 'Venture Debt Terms and Negotiation', 'Venture debt terms significantly impact your effective cost of capital. Understanding each component helps negotiate favorable deals.

Key venture debt terms: Principal: Amount borrowed, typically 25-50% of last equity round. Interest rate: 14-18% annually, can be fixed or floating. Term: Loan duration, typically 24-48 months. Drawdown: Single or multiple tranches. Repayment: Interest-only period + amortization.

Warrant coverage: Warrants give lender right to buy shares at fixed price. Coverage: Typically 5-15% of loan amount. Price: Usually last equity round price. Term: 7-10 years typically. Example: Rs 5 crore loan with 10% warrant coverage = Rs 50 lakh in warrants.

Covenants and restrictions: Financial covenants: Minimum cash balance, revenue targets. Operational covenants: Approval requirements for certain actions. Negative covenants: Restrictions on additional debt, asset sales. Understand covenant headroom and consequences of breach.

Security and collateral: Typically blanket lien on all assets. Personal guarantees usually NOT required (unlike bank loans). May include IP assignment as security. Understand what happens in default scenario.

Effective cost calculation: All-in cost includes: Interest + Warrant dilution + Fees. Example: 16% interest + 10% warrant coverage + 1% origination = ~18-20% effective cost. Compare to equity dilution cost to evaluate.

Negotiation priorities: Worth negotiating: Warrant coverage (lower is better), interest rate, covenant flexibility. Accept standard: Security package, reporting requirements. Important: Interest-only period length (longer = more runway).

Red flags in venture debt: Personal guarantees: Avoid if possible. Excessive covenants: Limit operational flexibility. High warrant coverage: Above 15% is expensive. Short term with balloon payment: Refinancing risk.', '["Calculate effective cost of venture debt for your scenario", "Compare venture debt cost to equity dilution cost", "Identify negotiation priorities for debt terms", "Review sample term sheets to understand standard provisions"]'::jsonb, '["Venture Debt Cost Calculator", "Term Sheet Comparison Matrix", "Covenant Analysis Framework", "Negotiation Priorities Checklist"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_7_id, 27, 'Venture Debt Process and Documentation', 'The venture debt process differs from equity fundraising. Understanding the timeline and documentation requirements ensures smooth execution.

Venture debt process timeline: Week 1-2: Initial conversations, term sheet. Week 3-4: Due diligence. Week 5-6: Documentation negotiation. Week 7-8: Closing and disbursement. Total: 6-8 weeks typically (faster than equity).

Due diligence requirements: Financial: 3 years financials, projections, cap table. Legal: Incorporation docs, contracts, IP. Equity: Details of equity investors, terms, relationships. Business: Customer contracts, pipeline, metrics. Reference: Calls with equity investors, customers.

Key documentation: Loan agreement: Primary contract defining all terms. Security agreement: Details of collateral and liens. Warrant agreement: Terms of warrant instrument. Board consent: Approval of debt facility. Compliance certificates: Ongoing covenant compliance.

Lender relationship management: Venture debt lenders want ongoing relationship. Regular financial reporting (monthly/quarterly). Proactive communication about challenges. Introduce to equity investors for reference. Good relationship helps with future facilities and covenant flexibility.

Drawdown strategies: Full drawdown: Get all capital upfront, maximize runway. Tranched drawdown: Draw as needed, lower interest cost. Milestone-based: Draw upon achieving certain goals. Strategy depends on interest vs flexibility tradeoff.

Interaction with equity investors: Inform equity investors before pursuing debt. Most VCs supportive of reasonable venture debt. Ensure debt terms don''t conflict with equity agreements. Coordinate timing with equity fundraising plans.', '["Create venture debt timeline aligned with your funding plan", "Prepare due diligence documentation in advance", "Inform and get support from equity investors", "Understand drawdown strategy options"]'::jsonb, '["Venture Debt Process Timeline Template", "Due Diligence Document Checklist", "Equity Investor Communication Template", "Drawdown Strategy Decision Framework"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_7_id, 28, 'Managing Venture Debt Successfully', 'Taking venture debt creates obligations that must be managed carefully. Proper debt management ensures the benefits without risking the company.

Cash flow planning with debt: Model monthly cash flows including debt service. Maintain minimum cash buffer above covenant requirements. Plan for principal repayment phase (higher monthly outflow). Scenario plan for revenue shortfalls.

Covenant compliance: Understand exact covenant definitions and measurement. Track metrics that impact covenants weekly. Build early warning system for potential breaches. Communicate proactively if breach is possible.

Handling covenant breaches: Proactive communication is critical - don''t surprise lender. Request waiver before breach occurs if possible. Propose remediation plan with timeline. Understand consequences: Acceleration, penalty rates, etc. Most lenders prefer workout to default.

Refinancing and extension: Start planning 6 months before maturity. Options: New venture debt, bank loan, equity paydown. Build lender relationship for favorable refinancing terms. Market conditions impact refinancing availability.

Debt in distress situations: Venture debt can complicate distress scenarios. Lender has priority over equity in liquidation. Negotiate with lender on restructuring options. Understand lender incentives (recovery vs relationship).

Success metrics for venture debt: Achieved intended use of funds goal. Maintained covenant compliance throughout. Extended runway to better equity terms. Total cost of capital optimized vs pure equity.

When to pay off early: Strong cash position from revenue or new equity. Covenants limiting operational flexibility. Better terms available elsewhere. Preparing for acquisition or major transaction.', '["Create 24-month cash flow model including debt service", "Set up covenant tracking dashboard", "Develop early warning system for covenant risks", "Plan refinancing timeline if applicable"]'::jsonb, '["Cash Flow Model Template with Debt", "Covenant Tracking Dashboard", "Breach Response Playbook", "Refinancing Planning Guide"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 8: Pitch Decks (Days 29-32)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Pitch Decks',
        'Create compelling pitch decks that convert investor meetings to term sheets. Master the art and science of investor presentation design and delivery.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_8_id, 29, 'Pitch Deck Fundamentals', 'A great pitch deck is your most important fundraising tool. It needs to tell a compelling story, present data convincingly, and leave investors wanting to learn more.

The purpose of a pitch deck: Not to close the deal - that happens in conversations. To get the next meeting. To provide a leave-behind that investors can share internally. To structure your own thinking about the business.

The narrative arc: Start with a hook - why should investors pay attention? Build the problem - make it feel urgent and important. Present your solution - elegant, differentiated, defensible. Prove it works - traction, customers, metrics. Show the path - how you win from here. The ask - what you need and what you''ll do with it.

Deck length guidelines: Email deck (teaser): 8-12 slides, digestible in 5 minutes. Presentation deck: 15-20 slides for 20-30 minute pitch. Appendix: Additional slides for Q&A and deep dives.

Design principles: One idea per slide - don''t overload. Visual hierarchy - most important info stands out. Consistent design language - professional, not flashy. Readable fonts and sizes - works on laptop and projector. Minimal text - you tell the story, slides support.

The "So What" test: Every slide should answer "so what?" for investors. Problem slide: So what = Large market feeling this pain. Solution slide: So what = Our approach is better/different. Traction slide: So what = Evidence of product-market fit.

Common pitch deck mistakes: Too much text - walls of text lose attention. No story - collection of facts without narrative. Weak traction slide - the most important slide is often weakest. Buried ask - unclear what you want. Generic claims - "huge market" without specifics.', '["Audit your current deck against these fundamentals", "Define the narrative arc for your pitch", "Apply the \"so what\" test to each slide", "Reduce text and increase visual impact"]'::jsonb, '["Pitch Deck Evaluation Rubric", "Narrative Arc Planning Template", "Slide-by-Slide So What Framework", "Design Best Practices Guide"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_8_id, 30, 'Slide-by-Slide Construction', 'Each slide in your pitch deck serves a specific purpose. Understanding what investors look for in each section helps you craft compelling content.

Title slide: Company name, tagline (one-liner description). Founder contact info. Stage/round information. Logo and visual identity. Example tagline: "Making enterprise sales 10x faster with AI"

Problem slide: Clearly articulate the pain point. Quantify the problem (Rs amount, time wasted, etc.). Show who has this problem and how many. Make it relatable - investors should feel the pain. Avoid: Vague problems, problems only you have.

Solution slide: Your product/service in simple terms. Why your approach is different/better. Demo screenshot or product visual. Avoid: Technical jargon, feature lists. Focus on outcome for customer.

Product/Demo slide: Show the product in action. Screenshots, video, or live demo. Highlight key features that differentiate. Show user interface if applicable.

Traction slide: The most important slide in your deck. Revenue/users over time (show growth curve). Key metrics: MRR, MAU, retention, NPS. Customer logos if B2B. Avoid: Vanity metrics, unclear timeframes.

Business model slide: How you make money. Unit economics: CAC, LTV, payback, margins. Pricing strategy and rationale. Path to profitability.

Market slide: TAM, SAM, SOM with methodology. Show market is large enough for VC returns. Credible sources for numbers. Bottom-up analysis preferred over top-down.

Competition slide: Honest competitive landscape. Your differentiation on key dimensions. Why you win in your segment. Avoid: "No competition" claims.

Team slide: Founders with relevant credentials. Key hires and advisors. Why this team wins. Domain expertise highlighted.

Financials slide: High-level projections (3 years). Key assumptions stated. Revenue drivers clear. Milestone-based roadmap.

Ask slide: Amount raising. Use of funds breakdown. Key milestones with this funding. Desired investor profile.', '["Create/refine each slide following specific guidelines", "Ensure traction slide is your strongest slide", "Get feedback on each slide from target audience", "Create consistent visual design across all slides"]'::jsonb, '["Slide-by-Slide Template", "Traction Slide Best Practices", "Market Sizing Methodology Guide", "Competition Slide Framework"]'::jsonb, 120, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_8_id, 31, 'Data Presentation and Visualization', 'How you present data matters as much as the data itself. Effective visualization makes your metrics memorable and convincing.

Chart selection: Line charts: Show trends over time (growth curves). Bar charts: Compare discrete categories. Pie charts: Show composition (use sparingly). Tables: Detailed data for reference (appendix).

Making metrics memorable: Up-and-to-the-right: Growth curves should show clear trajectory. Highlight the headline: "10x growth in 12 months" not just a chart. Context matters: "Rs 1 crore MRR" vs "Rs 1 crore MRR, 2x industry average".

Cohort visualization: Show retention curves that flatten (evidence of PMF). Earlier cohorts vs later cohorts (improvement over time). Revenue retention curves for B2B SaaS.

Benchmark comparison: Compare your metrics to industry benchmarks. "Our NRR of 140% vs industry average of 100%". Use credible benchmark sources.

Financial projection presentation: Show base case, not optimistic case. Clear assumptions stated. Milestone-based roadmap. Identify key risk factors and mitigation.

Data integrity: Only include data you can defend. Avoid cherry-picking favorable metrics. Prepare for questions on any number shown. Have backup data ready in appendix.

Common data presentation mistakes: Too many numbers on one slide. Unclear axes or labels. Inconsistent time periods. Missing context for metrics. Metrics that don''t matter to investors.', '["Redesign your data slides for visual impact", "Add benchmark comparisons where applicable", "Create appendix with backup data", "Test data presentation with someone unfamiliar"]'::jsonb, '["Data Visualization Best Practices", "Metric Benchmark Database", "Chart Template Library", "Financial Projection Template"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_8_id, 32, 'Pitch Delivery and Practice', 'A great deck with poor delivery fails. A good deck with great delivery succeeds. Master the art of presenting your pitch.

Pitch structure and timing: Introduction (2 min): Hook, personal connection. Problem-Solution (5 min): Set up and payoff. Traction-Business (5 min): The proof. Team-Vision (3 min): Why you win. Ask (2 min): What you need. Buffer for Q&A: Leave time for dialogue. Total: 20-25 minutes for full pitch.

Storytelling techniques: Start with a story or example - make it human. Use "we" and "our customers" - make it relational. Paint the vision - what does success look like? Create contrast - before/after, problem/solution. End with conviction - you believe in this.

Handling Q&A: Listen fully before answering. If you don''t know, say so and offer to follow up. Redirect tangents back to your strengths. Note questions for deck/strategy improvement. Have answers prepared for common questions.

Common tough questions: "Why will you win vs [competitor]?" - Be specific about differentiation. "What if [big company] enters your space?" - Show defensibility. "These projections seem aggressive" - Defend assumptions. "Why haven''t you grown faster?" - Acknowledge and show plan. "What happens if [key risk] materializes?" - Show you''ve thought about it.

Practice methodology: Practice alone to internalize content (10+ times). Practice with friendly audience for feedback (5+ times). Practice with people who will challenge you (2-3 times). Record yourself and review critically. Practice Q&A with tough questions.

Pitch day preparation: Know your first 30 seconds cold - anxiety is highest. Arrive early, check tech, settle in. Bring backup of deck on USB/cloud. Have water available. Deep breaths, confident posture.', '["Practice pitch following the timing structure", "Record yourself and review critically", "Prepare answers for 20 tough questions", "Do at least 3 practice pitches with feedback"]'::jsonb, '["Pitch Timing Template", "Tough Question Q&A Bank", "Pitch Practice Feedback Form", "Pitch Day Checklist"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 9: Term Sheets (Days 33-36)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Term Sheets',
        'Decode term sheets and negotiate effectively. Understand every provision, from valuation to liquidation preferences, and know what to fight for vs accept.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_9_id, 33, 'Term Sheet Anatomy', 'A term sheet outlines the key terms of an investment. While non-binding (except for exclusivity and confidentiality), it sets the framework for final documentation.

Term sheet components: Economic terms: Valuation, investment amount, share price. Control terms: Board seats, voting rights, protective provisions. Operational terms: Information rights, founder restrictions. Exit terms: Liquidation preference, drag-along, tag-along.

Pre-money vs post-money valuation: Pre-money: Company value before investment. Post-money: Company value after investment (pre-money + investment). Example: Rs 20 crore pre-money + Rs 5 crore investment = Rs 25 crore post-money. Investor ownership: Rs 5 crore / Rs 25 crore = 20%.

Price per share calculation: Post-money valuation / fully-diluted shares = price per share. Fully-diluted includes: Existing shares + option pool + new shares. Example: Rs 25 crore post / 25 lakh shares = Rs 100 per share.

Option pool: Reserved equity for future employee grants. Typically 10-20% of post-money at Series A. Option pool creation dilutes existing shareholders. "Option pool shuffle": VCs prefer pool created pre-money (dilutes founders more).

Binding vs non-binding provisions: Non-binding: Economic terms, control terms (subject to due diligence). Binding: Exclusivity (no-shop), confidentiality, expenses. Exclusivity period: Typically 30-60 days to complete due diligence.

Reading term sheets critically: Understand every term - don''t sign what you don''t understand. Model scenarios - what happens in different exit scenarios? Compare to market norms - know what''s standard. Get legal review - lawyer familiar with VC terms essential.', '["Get sample term sheets to study the structure", "Understand pre-money vs post-money math thoroughly", "Model option pool impact on founder dilution", "Identify lawyer experienced in VC term sheets"]'::jsonb, '["Term Sheet Template with Annotations", "Valuation and Dilution Calculator", "Option Pool Impact Modeler", "Term Sheet Legal Review Checklist"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_9_id, 34, 'Liquidation Preferences and Anti-Dilution', 'Liquidation preferences and anti-dilution provisions significantly impact founder outcomes in various exit scenarios. Understanding these is critical.

Liquidation preference basics: Determines payout order in liquidity event (sale, IPO, liquidation). Investor gets: Preference amount OR share of proceeds (non-participating), OR Preference amount AND share of remaining proceeds (participating). Standard: 1x non-participating liquidation preference.

Non-participating vs participating: Non-participating 1x: Investor gets money back OR converts to common and shares pro-rata. Example: Rs 5 crore investment, 20% ownership, Rs 50 crore exit. Option A: Rs 5 crore preference. Option B: 20% × Rs 50 crore = Rs 10 crore. Investor chooses B (converts), gets Rs 10 crore.

Participating preference (avoid if possible): Investor gets preference AND shares in remainder. Same example: Rs 5 crore + 20% × (Rs 50 crore - Rs 5 crore) = Rs 5 crore + Rs 9 crore = Rs 14 crore. Founder gets: 80% × Rs 45 crore = Rs 36 crore vs Rs 40 crore with non-participating. Participating preference is more investor-friendly.

Multiple liquidation preferences: Some investors ask for >1x (e.g., 2x). 2x means investor gets 2× investment before common shares. Significantly reduces founder proceeds in moderate exits. Standard is 1x - push back on multiples.

Anti-dilution protection: Protects investors if next round is at lower valuation (down round). Weighted average: New price = weighted average of old and new prices. Full ratchet: Price adjusts to new lower price entirely. Broad-based: Includes all shares in calculation (more founder-friendly). Narrow-based: Excludes some shares (more investor-friendly). Standard: Broad-based weighted average.

Modeling different scenarios: Model exits at different valuations: Rs 25 crore, Rs 100 crore, Rs 500 crore. Calculate founder proceeds under different preference structures. Understand where preferences really matter (smaller exits).', '["Model your term sheet terms across different exit scenarios", "Calculate impact of participating vs non-participating preference", "Understand anti-dilution mechanics and triggers", "Identify terms that deviate from market standard"]'::jsonb, '["Liquidation Preference Calculator", "Exit Scenario Modeler", "Anti-Dilution Calculation Guide", "Preference Structure Comparison"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_9_id, 35, 'Control Provisions and Governance', 'Control provisions determine who has decision-making power. Balancing investor protection with founder flexibility is critical for company success.

Board composition: Common structures: 2 founders, 1 investor, 1-2 independents. Avoid: Investor-controlled board at early stages. Board approval thresholds: Majority, supermajority, unanimous. Aim: Founder control with appropriate investor input.

Protective provisions: Actions requiring investor approval (typically majority of preferred). Standard provisions: Changing charter or bylaws, issuing new equity, taking on significant debt, selling the company, changing board size. Reasonable: Standard protective provisions are expected. Watch for: Overly broad provisions limiting day-to-day operations.

Information rights: Investor right to receive financial and operational information. Standard: Monthly/quarterly financials, annual audited statements, board materials. Reasonable: Appropriate transparency expectations. Watch for: Excessive reporting burden for early-stage company.

Founder restrictions: Vesting: Founder shares vest over time (4-year standard). Acceleration: What happens on acquisition? Single/double trigger. Non-compete: Restrictions on competing during and after. ROFR: Company right of first refusal on founder shares.

Drag-along rights: If majority approve sale, all shareholders must sell. Protects against minority holdouts blocking acquisition. Standard: Majority of each class approves. Reasonable: Necessary for M&A execution.

Tag-along rights: If founders sell, investors can sell proportionally. Protects investors from founders exiting early. Co-sale: Investors can join any founder sale. Standard: Reasonable investor protection.', '["Review your cap table and existing control provisions", "Understand board composition implications", "Evaluate protective provisions against operational needs", "Model founder vesting scenarios"]'::jsonb, '["Board Composition Framework", "Protective Provisions Checklist", "Founder Vesting Calculator", "Control Provision Comparison Guide"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_9_id, 36, 'Term Sheet Negotiation Strategy', 'Effective negotiation gets you better terms while maintaining a positive relationship with your future investor and board member.

Negotiation principles: Win-win mindset: Investor becomes partner, not adversary. Know your leverage: Multiple term sheets = more leverage. Prioritize: Know what matters most vs what to concede. Relationship matters: Aggressive negotiation can sour relationship.

What to negotiate hard on: Valuation: Within reasonable range based on comparables. Option pool size and creation (pre vs post-money). Board composition and control. Participating vs non-participating preference.

What to accept standard: 1x non-participating liquidation preference. Weighted average anti-dilution. Reasonable protective provisions. Standard information rights.

What not to fight over: Minor legal language. Standard drag-along/tag-along. Confidentiality provisions. Typical founder vesting (if fair).

Negotiation tactics: Create alternatives: Best leverage is another term sheet. Research norms: Know what''s market standard. Use lawyer strategically: Lawyer can be "bad cop". Take time: Don''t rush - "Let me think about this." Ask "why": Understand investor reasoning.

When to walk away: Unreasonable control provisions. Participating preferences with high multiples. Full ratchet anti-dilution. Investor you don''t trust. Terms that would harm future fundraising.

Post-term sheet: Exclusivity starts - you''re committed to this investor. Due diligence begins - be responsive and transparent. Keep other investors warm - deals fall through sometimes. Start preparing for close.', '["Define your negotiation priorities before discussions", "Research market terms for your stage and sector", "Prepare responses to investor term requests", "Identify your walk-away points"]'::jsonb, '["Term Sheet Negotiation Playbook", "Market Terms Benchmark Database", "Negotiation Response Templates", "Deal Terms Comparison Tool"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 10: Due Diligence (Days 37-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Due Diligence',
        'Navigate investor due diligence successfully. Prepare your data room, manage the process, and avoid common pitfalls that derail deals.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_10_id, 37, 'Data Room Preparation', 'A well-organized data room accelerates due diligence and signals professionalism. Prepare before you need it - scrambling during DD delays deals.

Data room structure: Folder 1 - Corporate: Incorporation docs, cap table, shareholder agreements. Folder 2 - Financial: Statements, projections, bank statements, tax filings. Folder 3 - Legal: Contracts, IP assignments, litigation, compliance. Folder 4 - Team: Org chart, employment agreements, founder backgrounds. Folder 5 - Business: Customers, metrics, product docs, competitive analysis. Folder 6 - Other: Insurance, permits, material correspondence.

Corporate documents: Certificate of Incorporation (COI). MOA and AOA (current versions). Board resolutions and minutes. Shareholder agreements. Cap table (fully diluted). Previous funding documents.

Financial documents: Audited financials (last 2-3 years if available). Management accounts (monthly). Bank statements (12 months). Tax returns and GST filings. Financial projections with assumptions. MIS reports and dashboards.

Legal documents: All material contracts (customer, vendor, partner). IP assignments from founders and employees. Employment/contractor agreements. NDA templates used. Any litigation or disputes. Regulatory licenses and permits.

Team documents: Org chart with reporting structure. Founder CVs and backgrounds. Key employee agreements. ESOP plan and grants. Reference list for founder calls.

Business documents: Product documentation and roadmap. Customer list with contract values. Metrics dashboard. Competitive analysis. Marketing materials. Press coverage.

Data room best practices: Use secure platform (DocSend, Notion, Google Drive with permissions). Name files clearly and consistently. Keep documents current - update regularly. Track who views what (analytics). Have everything ready before DD starts.', '["Set up data room with proper folder structure", "Collect and organize all corporate documents", "Update financial documents to current date", "Review data room completeness against checklist"]'::jsonb, '["Data Room Structure Template", "Document Naming Convention Guide", "Data Room Completeness Checklist", "Secure Data Room Platform Comparison"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_10_id, 38, 'Financial Due Diligence', 'Investors scrutinize your financials to understand business health, validate metrics, and assess management capability. Preparation prevents surprises.

What investors examine: Revenue: Recognition timing, customer concentration, cohort performance. Expenses: Burn rate, spending efficiency, unusual items. Cash: Runway calculation, working capital needs. Metrics: Verification of reported KPIs.

Common financial DD findings: Revenue recognition issues: Recognizing revenue before delivery. Customer concentration: Too much revenue from few customers. Related party transactions: Payments to founder-related entities. Missing documentation: Invoices, contracts for revenue claims. Inconsistent metrics: Numbers don''t match between documents.

Financial model review: Assumptions: Are they reasonable and defensible? Revenue build: Bottom-up vs top-down analysis. Expense projections: Realistic or wishful thinking? Sensitivity: What changes if assumptions are wrong?

Tax compliance verification: GST filings: Regular and accurate. TDS compliance: Proper deduction and deposit. Income tax: Returns filed, no outstanding demands. Angel tax: Valuation documentation for Section 56.

Addressing financial weaknesses: Acknowledge issues proactively - don''t hide. Provide context for unusual items. Show remediation plan for gaps. Demonstrate improved practices going forward.

Preparing for financial DD: Reconcile all accounts before DD starts. Document unusual transactions with explanations. Prepare metric validation methodology. Have CFO/accountant available for questions.', '["Reconcile all financial accounts", "Prepare revenue recognition documentation", "Address any compliance gaps before DD", "Create metric validation document"]'::jsonb, '["Financial DD Preparation Checklist", "Revenue Recognition Guide", "Tax Compliance Verification Checklist", "Metric Validation Template"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_10_id, 39, 'Legal and Technical Due Diligence', 'Legal and technical DD can uncover deal-breakers. Proactive cleanup prevents issues from derailing your fundraise.

Legal DD focus areas: Corporate: Clean incorporation, proper authorizations. Equity: Clean cap table, properly issued shares. IP: Clear ownership, no encumbrances. Contracts: No problematic terms or liabilities. Compliance: All regulatory requirements met. Litigation: No material disputes.

Common legal red flags: IP not assigned to company: Founders or employees own critical IP. Founder agreement issues: Missing or poorly structured. Cap table discrepancies: Records don''t match actual holdings. Contract issues: Unusual terms, missing signatures. Compliance gaps: Licenses, registrations not current.

Fixing legal issues: IP assignment: Execute proper assignment agreements. Cap table: Reconcile and correct discrepancies. Missing agreements: Draft and sign before DD. Compliance: Apply for missing registrations. Timeline: Some fixes take weeks - start early.

Technical DD (for tech companies): Code review: Architecture, quality, scalability. Security assessment: Vulnerabilities, data protection. Infrastructure: Scalability, reliability, costs. Technical debt: Maintenance burden. Team capability: Can team execute roadmap?

Technical DD preparation: Document architecture and tech stack. Address known security vulnerabilities. Clean up technical debt where possible. Prepare technical team for questions. Have CTO available for deep dive sessions.

FEMA compliance for foreign investment: Ensure pricing complies with RBI guidelines. Prepare Form FC-GPR documentation. Verify no downstream investment restrictions. Address any past FEMA non-compliance.', '["Audit all IP assignments and fix gaps", "Reconcile cap table and resolve discrepancies", "Address known security vulnerabilities", "Prepare FEMA compliance documentation"]'::jsonb, '["Legal DD Preparation Checklist", "IP Assignment Audit Guide", "Technical DD Preparation Guide", "FEMA Compliance Checklist"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_10_id, 40, 'Managing the DD Process', 'Due diligence is a test of your organization and communication. Managing it well signals that you will be a good partner post-investment.

DD process management: Assign DD coordinator: One person manages all requests. Response SLA: Commit to 24-48 hour response time. Track requests: Log all questions and responses. Escalate blockers: Flag issues that need founder attention.

Communication best practices: Be responsive: Delays signal problems. Be transparent: Don''t hide issues - they will surface. Be organized: Clear, complete answers. Be proactive: Anticipate questions, provide context.

Handling tough questions: Financial issues: Explain context, show remediation. Legal gaps: Acknowledge and show fix timeline. Customer concerns: Provide additional references. Competition: Be honest about competitive position.

Reference checks: Investors will call customers: Prepare them. Former employees may be contacted: Be aware. Other investors will be asked: Manage relationships. Industry experts consulted: Ensure accurate market perception.

When DD goes wrong: Deal fatigue: Process drags, investor loses interest. Surprise issues: Unexpected findings raise concerns. Trust breakdown: Feeling investor is looking for reasons to decline. Competitive dynamics: Other deals closing faster.

Keeping DD on track: Set timeline expectations upfront. Provide everything needed promptly. Address issues transparently. Maintain regular communication. Know when to escalate.

Post-DD transition: DD findings summary: Understand what was found. Negotiate on findings: Some items may affect terms. Prepare for close: Documentation transition. Relationship foundation: DD interactions set the tone.', '["Assign DD coordinator and establish process", "Create request tracking system", "Prepare customers for reference calls", "Set timeline expectations with investor"]'::jsonb, '["DD Process Management Template", "Request Tracking Spreadsheet", "Customer Reference Preparation Guide", "DD Communication Framework"]'::jsonb, 120, 75, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 11: Valuation Methods (Days 41-42)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Valuation Methods',
        'Understand how startups are valued in India. Learn multiple valuation methodologies and how to negotiate your valuation effectively.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_11_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_11_id, 41, 'Startup Valuation Methodologies', 'Startup valuation is more art than science at early stages. Understanding different methodologies helps you justify your ask and negotiate effectively.

Revenue multiples: Most common for startups with revenue. Multiple applied to ARR or revenue run-rate. B2B SaaS: 5-15x ARR depending on growth. D2C: 2-5x revenue depending on margins. Marketplace: 1-3x GMV or 5-10x take rate.

Comparable transactions: Value based on similar companies'' recent rounds. Find 5-10 comparable companies at similar stage. Adjust for differences in metrics, growth, team. Sources: Tracxn, Crunchbase, Entrackr, news reports.

Discounted Cash Flow (DCF): Projects future cash flows, discounts to present value. Common for merchant banker valuations (required for angel tax). Less relevant for early-stage with no predictable cash flows. Used more for later-stage and profitable companies.

Scorecard method: Weights different factors vs typical startup. Factors: Team, market, product, competition, marketing, need for funding. Adjusts average valuation up or down based on scores. Better for pre-revenue companies.

Berkus method: Assigns value to key milestones. Sound idea: Rs 1-2 crore. Prototype: Rs 1-2 crore. Quality team: Rs 1-2 crore. Strategic relationships: Rs 1-2 crore. Product rollout/sales: Rs 1-2 crore. Max pre-revenue valuation: Rs 5-10 crore.

Indian valuation benchmarks 2024: Pre-seed: Rs 2-5 crore pre-money. Seed: Rs 5-25 crore pre-money. Series A: Rs 50-150 crore pre-money. Series B: Rs 150-500 crore pre-money. Note: Significant variation by sector, traction, team.

Valuation certificate requirements: Required under Companies Act for share issuance above par. Merchant banker valuation for DPIIT-recognized startups. DCF method commonly used. Cost: Rs 15,000-50,000. Timeline: 5-10 days.', '["Research comparable transactions in your sector", "Calculate your valuation using multiple methodologies", "Prepare valuation justification document", "Obtain valuation certificate if needed for compliance"]'::jsonb, '["Comparable Transaction Database", "Valuation Methodology Calculator", "Valuation Justification Template", "Merchant Banker Directory"]'::jsonb, 120, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_11_id, 42, 'Negotiating Your Valuation', 'Valuation negotiation requires preparation, data, and strategy. Getting the right valuation balances founder dilution with investor return expectations.

Determining your target valuation: Start with comparable analysis. Adjust for your specific strengths/weaknesses. Factor in your desired dilution. Consider investor return expectations.

Building your valuation case: Growth metrics: Demonstrate trajectory. Market opportunity: Large TAM = higher multiple justified. Competitive position: Unique advantages. Team quality: Exceptional team commands premium. Capital efficiency: More done with less. Strategic value: Beyond financial returns.

Negotiation tactics: Anchor high: Start above your target. Use data: Comparables, metrics, projections. Create competition: Multiple interested investors. Know your floor: Minimum acceptable valuation. Be willing to walk: Best leverage.

Common investor pushbacks: "Too early for this valuation": Show milestones achieved. "Market is down": Emphasize quality vs market. "Comparables are lower": Explain your differentiation. "Need more traction": Discuss upcoming milestones.

Valuation vs terms tradeoff: Higher valuation may come with worse terms. Consider total package, not just headline number. Clean terms at fair valuation > high valuation with bad terms. Model different scenarios to compare.

Down rounds and their impact: If next round is at lower valuation. Anti-dilution triggers (increases existing investor ownership). Psychological impact on team and market perception. Avoid by: Not over-raising valuation, achieving milestones.

Flat rounds: Same valuation as previous round. Better than down round but signals challenges. May be acceptable in tough markets. Negotiate for additional benefits (less dilution, better terms).', '["Prepare valuation justification with data support", "Identify your negotiation range (target, floor)", "Practice responding to valuation pushbacks", "Model different valuation scenarios and dilution"]'::jsonb, '["Valuation Negotiation Playbook", "Comparable Analysis Template", "Dilution Scenario Modeler", "Term-Valuation Tradeoff Framework"]'::jsonb, 90, 75, 1, NOW(), NOW());

    -- ========================================
    -- MODULE 12: Fundraising Execution (Days 43-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Fundraising Execution',
        'Execute your fundraise from first meeting to money in the bank. Master the closing process, post-funding obligations, and investor relationship management.',
        11,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_12_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_12_id, 43, 'Closing Process Management', 'The period between term sheet and funding requires careful management. Deals can still fall apart - maintaining momentum and execution is critical.

Term sheet to close timeline: Week 1-2: Due diligence initiation, legal engagement. Week 3-4: Due diligence completion, documentation drafting. Week 5-6: Documentation negotiation, board/shareholder approvals. Week 7-8: Signing, fund transfer, compliance filings. Total: 6-8 weeks typical for Series A, 4-6 weeks for seed.

Legal documentation overview: Share Purchase Agreement (SPA): Terms of share sale. Shareholders Agreement (SHA): Ongoing rights and obligations. Articles of Association: Company constitution update. Board resolutions: Approving all transactions. Closing certificates: Representations and warranties.

Managing legal negotiation: Engage experienced startup lawyer. Don''t re-negotiate agreed term sheet points. Focus on material issues, not wordsmithing. Track all changes in redline document. Set deadline for documentation completion.

Conditions precedent: Items required before closing. Standard: Due diligence completion, regulatory approvals, no material adverse change. Ensure you can satisfy all conditions. Flag any challenges early.

Simultaneous vs sequential closing: Simultaneous: All investors sign and fund together. Sequential: Lead investor first, others follow. Simultaneous preferred for cleanliness. Coordinate with all parties on timing.

Common closing delays: Documentation: Endless legal negotiation. DD findings: New issues arising late. Investor approvals: Internal committee delays. Founder issues: Last-minute cold feet. Banking: Fund transfer processing time.

Keeping deal on track: Weekly check-ins with all parties. Clear action item tracking. Escalate blockers quickly. Maintain relationship with investor during process.', '["Create detailed closing timeline with all parties", "Engage startup-experienced legal counsel", "Identify and address all conditions precedent", "Establish regular check-in cadence"]'::jsonb, '["Closing Timeline Template", "Legal Document Checklist", "Conditions Precedent Tracker", "Deal Management Dashboard"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_12_id, 44, 'Post-Funding Compliance', 'After funding closes, several compliance requirements must be completed. Missing these can create problems for future rounds and M&A.

Immediate post-funding filings (within 30 days): PAS-3: Return of allotment to ROC. Form FC-GPR: If foreign investment received (RBI reporting). DIR-12: If new directors appointed. MGT-14: For special resolutions passed.

Cap table update: Update share register with new shareholders. Issue share certificates to all new shareholders. Update beneficial ownership records. Ensure ESOPs properly documented.

FEMA compliance (for foreign investment): FC-GPR filing within 30 days of fund receipt. Valuation certificate required. Pricing compliance verification. KYC documentation for foreign investors. Annual reporting obligations.

Board and governance setup: Appoint investor nominee to board. Schedule first board meeting post-funding. Set up board meeting cadence (quarterly typical). Establish information sharing protocols.

Bank account management: Ensure funds received in correct account. Set up appropriate spending controls. Multi-signatory requirements if agreed. Track against agreed use of funds.

Ongoing compliance requirements: Board meetings: Quarterly minimum. Shareholder meetings: Annual. ROC filings: Annual return, financial statements. Information rights: Monthly/quarterly reports to investors. Budget approval: Annual budget to board.

Documentation and record keeping: Maintain signed copies of all documents. Keep investor communication records. Document board decisions and rationale. Prepare for future DD from day one.', '["Create post-funding compliance checklist with deadlines", "File all required ROC forms within timelines", "Update cap table and issue share certificates", "Set up board meeting schedule and cadence"]'::jsonb, '["Post-Funding Compliance Checklist", "ROC Filing Guide", "Cap Table Update Template", "Board Meeting Schedule Template"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_12_id, 45, 'Investor Relations Post-Funding', 'Your relationship with investors continues long after the check clears. Building a strong investor relationship provides ongoing value and positions you for future rounds.

Investor communication cadence: Monthly updates: Key metrics, highlights, lowlights, asks. Quarterly: Detailed review, usually in board meeting. Annual: Strategic planning, performance review. Ad-hoc: Material developments, decisions requiring input.

Effective investor updates: Keep it concise - 1 page maximum for monthly. Standard format: Metrics dashboard, wins, challenges, asks. Be transparent about challenges - no surprises. Include specific asks - how can they help?

Leveraging investor value-add: Customer introductions: Share ideal customer profile, ask for specific intros. Hiring: Share roles, ask for referrals. Strategic advice: Use board meetings for strategic input. Portfolio synergies: Connect with relevant portfolio companies.

Managing investor expectations: Set realistic goals and track against them. Communicate proactively when targets will be missed. Explain variances - context matters. Propose remediation plans.

Board meeting best practices: Share materials 3+ days in advance. Focus on strategic discussion, not status updates. Come with specific questions/decisions needed. Follow up with clear action items.

Preparing for next round: Build relationship with next-round investors early. Get current investor support for introductions. Discuss timing with existing investors. Ensure current investors committed to pro-rata.

Exit preparation: Understand investor exit expectations. Align on timeline for liquidity. Prepare for various scenarios (M&A, IPO, secondary). Maintain optionality while building value.

Congratulations on completing this comprehensive guide to funding in India. Remember: fundraising is a means to an end. The goal is building a valuable company. Use this capital wisely, hit your milestones, and create something great.', '["Set up investor update template and cadence", "Schedule first board meeting post-funding", "Create list of specific asks for investor value-add", "Begin relationship building for next round"]'::jsonb, '["Investor Update Template", "Board Meeting Best Practices", "Investor Value-Add Tracker", "Next Round Planning Framework"]'::jsonb, 180,
        100,
        2,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P3: Funding in India - Complete Mastery course content successfully enhanced';

END $$;

COMMIT;
