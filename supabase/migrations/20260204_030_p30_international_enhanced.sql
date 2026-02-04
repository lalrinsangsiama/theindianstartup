-- THE INDIAN STARTUP - P30: International Expansion - Enhanced Content
-- Migration: 20260204_030_p30_international_enhanced.sql
-- Purpose: Enhance P30 course content to 500-800 words per lesson with India-specific international expansion data
-- Course: 55 days, 11 modules covering complete global expansion journey for Indian startups

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
    v_mod_10_id TEXT;
    v_mod_11_id TEXT;
BEGIN
    -- Get or create P30 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P30',
        'International Expansion',
        'Complete guide to taking your Indian startup global - 11 modules covering global strategy, FEMA compliance for ODI, US market entry with Delaware incorporation, EU expansion with GDPR compliance, MENA and Southeast Asia markets, transfer pricing, international entity structures, global hiring with EOR, export promotion schemes (RoDTEP, MEIS), cross-border payments, and international IP protection. Master LRS limits, SEZ benefits, DGFT registration, and bilateral trade agreements.',
        9999,
        false,
        55,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P30';
    END IF;

    -- Clean existing modules and lessons for P30
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Going Global Strategy (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Going Global Strategy',
        'Master global expansion strategy for Indian startups - market selection frameworks, timing decisions, entry modes, competitive positioning, and building sustainable global competitive advantage. Learn from Freshworks, Zoho, InMobi, and other Indian global success stories.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_1_id;

    -- Day 1: Why and When to Go Global
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        1,
        'Why and When to Go Global',
        'Indian startups are increasingly building global businesses from day one, with over 100 Indian-origin unicorns having significant international operations. Understanding why and when to expand globally is critical for strategic planning and resource allocation.

Why Go Global - Strategic Drivers: Market Size Expansion: India''s $3.5 trillion economy, while large, represents only 3% of global GDP. The US ($25 trillion), EU ($17 trillion), and China ($18 trillion) offer massive market expansion. For B2B SaaS, US enterprise spending alone exceeds $500 billion annually. Revenue Diversification: Global revenue reduces dependence on Indian economic cycles. Currency diversification - earning in USD, EUR, GBP provides natural hedge against INR depreciation. Valuation Premium: Global companies command 2-3x revenue multiples compared to India-only businesses. Freshworks at IPO: 5.5x revenue multiple vs 2-3x for India-focused SaaS. Talent Access: Global presence enables hiring from worldwide talent pools. Critical for specialized roles (ML engineers, enterprise sales) with limited India availability. Competitive Moat: Global scale creates barriers to entry. Network effects, brand recognition, and customer relationships compound across markets.

Indian Global Success Stories Analysis: Freshworks: Founded Chennai 2010, now San Mateo HQ. Path: India product development, US sales focus from Year 2. Revenue: $500M+ (85% international). Key insight: Built product in India, sold in US from early stage. Zoho: Chennai-based, 100+ million users globally. Path: Bootstrapped global expansion over 25 years. Revenue: $1B+ (70% international). Key insight: Product-led growth, no external funding. InMobi: Bangalore to global mobile advertising. Path: Early US/EU expansion, China market entry. Revenue: $400M+ (90% international). Key insight: Followed customers (global advertisers) internationally. Postman: API development platform, Bangalore origin. Path: Developer community-led global growth. Valuation: $5.6B. Key insight: Bottom-up adoption, then enterprise sales.

When to Go Global - Readiness Assessment: Product-Market Fit Signals: Consistent growth in India (20%+ MoM for 6+ months), customer retention above 90%, clear unit economics (LTV:CAC > 3:1), product stability (minimal critical bugs). Organizational Readiness: Leadership bandwidth for global focus, financial runway (18+ months), scalable operations (not founder-dependent), English-proficient team for key functions. Market Timing: Category growth in target markets, competitive window (before market consolidation), favorable regulatory environment, available distribution channels.

Global Expansion Timing Models: Born Global: International from Day 1. Best for: Global products (developer tools, B2B SaaS), strong founder networks abroad, limited India-specific value proposition. Examples: Postman, Chargebee. Staged Expansion: Prove in India, then expand. Best for: Complex products requiring iteration, capital-efficient approach, products with India-specific learning. Examples: Freshworks, Zoho. Opportunistic: Follow customers globally. Best for: Enterprise software, services businesses, partnership-driven models. Examples: Infosys, TCS (enterprise IT), InMobi (followed advertisers).

Common Mistakes: Expanding too early (before product-market fit), expanding too late (missing competitive window), under-resourcing expansion (half-hearted effort), over-expanding (too many markets simultaneously), ignoring cultural differences (US sales vs India sales approach).',
        '["Complete global expansion readiness assessment scoring your startup on 15 criteria including product maturity, unit economics, team capability, and financial runway", "Analyze 5 Indian global success stories relevant to your industry - document their expansion timeline, market sequence, and key strategic decisions", "Define your primary driver for global expansion (market size, valuation, talent, competition) and validate with 3 board members or advisors", "Create preliminary 3-year global vision with target markets, revenue goals, and required investments - pressure test assumptions with industry benchmarks"]'::jsonb,
        '["Global Readiness Assessment Framework with 15 weighted criteria and scoring methodology used by VCs for evaluating portfolio expansion", "Indian Global Startup Case Study Library with detailed expansion analysis of 25 companies across SaaS, fintech, and consumer sectors", "Expansion Timing Decision Tree helping determine born-global vs staged vs opportunistic approach based on your business characteristics", "Global Vision Canvas template for articulating 3-year international expansion goals with financial modeling"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Market Selection Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        2,
        'Market Selection Framework',
        'Systematic market selection is critical for global expansion success. With 195 countries and limited resources, Indian startups must prioritize markets based on opportunity size, entry complexity, and strategic fit.

Market Attractiveness Criteria: Market Size (Weight 25%): Total Addressable Market in target segment. Growth rate (prefer 15%+ CAGR markets). Per-capita spending in your category. Example: US enterprise software market $300B, growing 12% annually. Market Accessibility (Weight 20%): Regulatory complexity for foreign companies. Language and cultural proximity. Existing Indian diaspora and business networks. Payment infrastructure maturity. Competition Intensity (Weight 15%): Number of well-funded competitors. Market concentration (leader market share). Barriers to entry for new players. Customer Acquisition Cost benchmarks. Economic Stability (Weight 15%): GDP growth trajectory. Currency stability. Political and regulatory predictability. Business environment rankings (World Bank Ease of Doing Business). Strategic Value (Weight 25%): Reference customer potential (logos that open other markets). Learning value (advanced market insights). Talent availability for local hiring. Gateway to adjacent markets.

Market Scoring Methodology: Score each market 1-10 on each criterion. Apply weights to calculate weighted score. Rank markets by total weighted score. Consider resource requirements for top markets. Select 2-3 markets for initial focus.

Regional Market Analysis for Indian Startups: United States (Score typically 85-95): Largest market for most B2B categories. High customer willingness to pay. Strong Indian founder networks. Complex but navigable regulations. High competition intensity. Entry cost: $500K-2M for meaningful presence.

European Union (Score typically 70-85): Large combined market ($17T GDP). Single market access from one entity. GDPR compliance mandatory. Diverse languages and cultures. Moderate competition intensity. Entry cost: $300K-1M for initial market.

Middle East/GCC (Score typically 65-80): High per-capita spending. Strong India trade relationships. Government digital transformation spending. Limited local competition. Cultural considerations important. Entry cost: $200K-500K.

Southeast Asia (Score typically 60-75): Proximity to India. Growing digital economies. Price sensitivity (lower ACV). Fragmented markets (country-by-country). Entry cost: $150K-400K.

Market Prioritization for Different Business Types: B2B SaaS: US first (highest willingness to pay), then UK/EU, then ANZ. E-commerce/D2C: Start with markets having Indian diaspora (US, UK, UAE, Singapore). Fintech: Regulatory complexity varies - consider UK sandbox, Singapore MAS, UAE DFSA. Enterprise Services: Follow existing customer relationships globally.

Common Market Selection Mistakes: Choosing markets based on founder preference vs data. Underestimating cultural and language barriers. Overweighting market size, underweighting competition. Ignoring regulatory complexity until too late. Spreading too thin across many markets.',
        '["Research and score top 15 potential markets using the weighted criteria framework - create detailed market profiles for top 5 scorers", "Analyze competitive landscape in top 3 markets: identify 10 competitors each, their market share, pricing, and positioning", "Conduct 10 customer discovery calls in top 2 target markets to validate demand assumptions and understand local buying patterns", "Create market prioritization matrix with final rankings, required investment estimates, and expected timeline to meaningful revenue"]'::jsonb,
        '["Market Scoring Calculator with pre-populated data for 30 countries across all evaluation criteria", "Competitive Intelligence Template for systematic competitor analysis in target markets", "Customer Discovery Interview Guide localized for US, EU, and MENA market conversations", "Market Prioritization Decision Framework with investment requirement estimates by region"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Entry Mode Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        3,
        'Entry Mode Selection',
        'Choosing the right entry mode balances control, investment, speed, and risk. Indian startups have multiple options ranging from direct export to full subsidiary establishment, each with distinct trade-offs.

Entry Mode Options Analysis: Direct Export/Remote Sales (Investment: Low, Control: High, Speed: Fast): Sell from India to international customers. No local entity required initially. Best for: Digital products, low-touch SaaS, initial market testing. Limitations: No local presence for enterprise sales, banking/payment challenges, limited customer trust. Example: Many Indian SaaS companies start with remote sales to US SMBs.

Licensing/Franchising (Investment: Low, Control: Low, Speed: Medium): License technology or brand to local partners. Partner handles local operations and sales. Best for: Products requiring local customization, regulated industries, capital-constrained expansion. Limitations: Limited control over customer experience, revenue sharing, partner dependency. Example: Some Indian edtech companies license content to international partners.

Distribution Partnerships (Investment: Medium, Control: Medium, Speed: Medium): Partner with local distributors or resellers. Leverage partner''s existing customer relationships. Best for: Products requiring local sales presence, complex sales cycles, markets with strong distribution networks. Limitations: Margin sharing (30-50% to partners), limited customer relationship ownership. Example: Indian enterprise software through local system integrators.

Joint Venture (Investment: High, Control: Shared, Speed: Medium): Create new entity with local partner. Share ownership, investment, and decision-making. Best for: Markets requiring local ownership (China, some MENA), access to partner capabilities, risk sharing. Limitations: Complex governance, potential conflicts, profit sharing. Example: Required structure for some Indian companies entering China.

Wholly-Owned Subsidiary (Investment: High, Control: High, Speed: Slow): Establish own legal entity in target market. Full control over operations and strategy. Best for: Long-term market commitment, enterprise sales requiring local presence, protecting IP. Limitations: High setup and ongoing costs, regulatory compliance burden. Example: Freshworks US subsidiary, Zoho international entities.

Acquisition (Investment: Very High, Control: High, Speed: Fast): Buy existing company in target market. Instant market presence, team, and customers. Best for: Rapid market entry, acquiring capabilities, consolidating fragmented markets. Limitations: Integration challenges, high capital requirement, cultural issues. Example: InMobi acquiring Sprinklr competitor.

Entry Mode Decision Framework: Consider these factors for each market: Regulatory Requirements: Some countries require local entity or partner (China, Saudi Arabia). Capital Availability: Subsidiaries require $200K-1M+ setup; partnerships need less. Sales Model: Enterprise sales often require local presence; PLG can start remote. Competitive Timing: Acquisition fastest; organic subsidiary slowest. Strategic Importance: Core markets warrant full subsidiary; peripheral markets use partners. Risk Tolerance: Partnerships reduce risk; subsidiaries concentrate it.

Staged Entry Approach (Recommended): Phase 1 (Months 1-6): Direct export/remote sales to test market demand. Phase 2 (Months 6-12): Distribution partnerships to scale. Phase 3 (Year 2+): Subsidiary establishment if market proves significant.

FEMA Considerations for Entry Modes: Direct export: Minimal FEMA implications, just export proceeds repatriation. Partnerships: Limited FEMA impact, potential royalty/fee payments to India. Subsidiary: Overseas Direct Investment (ODI) route, RBI compliance required. JV/Acquisition: ODI approval, potentially automatic or approval route.',
        '["Evaluate each entry mode option for your top 3 markets using the control-investment-speed-risk framework", "Research regulatory requirements for foreign company entry in each target market - identify any mandatory local partner or entity requirements", "Create financial model comparing 3-year costs and projected returns for partnership vs subsidiary entry in primary target market", "Design staged entry plan with triggers for progression from remote sales to partnership to subsidiary based on revenue and strategic milestones"]'::jsonb,
        '["Entry Mode Decision Matrix comparing all options across 10 evaluation criteria for different market contexts", "Regulatory Requirements Database for foreign company market entry in 30 key countries", "Entry Mode Financial Model Template with setup costs, ongoing costs, and revenue projections by mode", "Staged Entry Playbook with milestone triggers and transition planning frameworks"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Global Competitive Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        4,
        'Global Competitive Strategy',
        'Building sustainable competitive advantage in global markets requires understanding how to leverage India advantages while competing against well-resourced local and global players.

Indian Startup Global Advantages: Cost Arbitrage: Engineering costs 60-70% lower than US/EU. Enables competitive pricing or higher R&D investment. Sustainable for 5-10 years as India costs rise gradually. Example: Zoho offers enterprise features at SMB prices. Talent Depth: 1.5 million engineering graduates annually. Strong English proficiency for global business. 24/7 operations capability with India time zone. Frugal Innovation: Experience solving problems with resource constraints. Products often simpler and more accessible. Global applicability of India-tested solutions. Growth Market Experience: Understanding of high-growth, price-sensitive markets. Applicable to other emerging markets (SEA, Africa, LATAM). Mobile-first and digital-native product thinking. Diaspora Network: 18 million Indian diaspora globally. Strong presence in tech leadership (Google, Microsoft, Adobe CEOs). Network effects for hiring, sales, and partnerships.

Competitive Strategy Options: Cost Leadership: Leverage India cost advantage for lower pricing. Target price-sensitive segments underserved by incumbents. Risk: Race to bottom, margin pressure. Example: Zoho vs Salesforce (10x price difference). Differentiation: Build unique features leveraging India innovation. Focus on user experience, simplicity, or specific capabilities. Risk: Feature parity erosion, higher CAC. Example: Freshworks user-friendly interface vs complex enterprise tools. Niche Focus: Dominate specific vertical or use case globally. Deep expertise and tailored solutions. Risk: Limited market size, adjacency challenges. Example: Icertis (contract management), Postman (API development). Platform Strategy: Build ecosystem that creates switching costs. Network effects from users, developers, partners. Risk: Requires scale, winner-take-all dynamics. Example: Chargebee billing ecosystem.

Competing Against Global Giants: Identify Underserved Segments: Giants focus on enterprise; target SMB. Giants optimize for US; target other geographies. Giants have legacy products; offer modern alternatives. Move Faster: Smaller teams, faster decisions. Ship features weekly vs quarterly. Respond to customer feedback rapidly. Build Community: Developer communities, user groups. Open source contributions. Content marketing and thought leadership. Leverage Partnerships: Channel partners reaching customers you can''t. Technology partnerships adding capabilities. Strategic investors providing market access.

Competing Against Local Players: Superior Product: Global R&D investment vs local development. Best practices from multiple markets. Scale economies in product development. Trust and Credibility: Global brand recognition. Reference customers from developed markets. Security and compliance certifications. Long-term Commitment: Demonstrate market commitment vs opportunistic entry. Local team investment. Partnership with local ecosystem.

Global vs Multi-Domestic Strategy: Global Strategy: Standardized product and positioning worldwide. Centralized decision-making in India HQ. Economies of scale in development and marketing. Best for: B2B SaaS, developer tools, technology products. Multi-Domestic Strategy: Adapted product and positioning per market. Local autonomy for market-specific decisions. Responsiveness to local needs. Best for: Consumer products, regulated industries, culturally-sensitive offerings. Hybrid Approach (Recommended): Core product standardized globally. Local customization for language, compliance, integrations. Centralized product development, distributed sales and support.',
        '["Define your primary competitive strategy (cost leadership, differentiation, niche focus, or platform) with specific India advantages to leverage", "Analyze top 5 global competitors in target market: their positioning, pricing, strengths, weaknesses, and likely response to your entry", "Identify 3 underserved customer segments where your India advantages create meaningful differentiation vs incumbents", "Create competitive response playbook anticipating competitor reactions and your counter-strategies for pricing, features, and positioning attacks"]'::jsonb,
        '["Competitive Strategy Framework for Indian startups with advantage mapping and strategy selection guidance", "Global Competitor Analysis Template with comprehensive evaluation criteria and intelligence gathering methods", "India Advantage Calculator quantifying cost and capability advantages for competitive positioning", "Competitive Response Playbook template with scenario planning for common competitor reactions"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Global Expansion Roadmap
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        5,
        'Global Expansion Roadmap',
        'A comprehensive global expansion roadmap aligns organizational resources, sets clear milestones, and creates accountability for international growth. This strategic document guides execution and enables course correction.

Roadmap Components: Vision and Objectives: 3-5 year global revenue target (e.g., 50% international revenue). Market presence goals (e.g., top 3 in 5 markets). Strategic objectives beyond revenue (brand, talent, partnerships). Market Sequencing: Primary market (typically US for B2B) with full investment. Secondary markets (EU, ANZ) with scaled approach. Tertiary markets (emerging) with opportunistic approach. Timeline with clear triggers for market entry.

Year 1 Roadmap (Market Entry Phase): Q1: Market Research and Setup. Finalize primary market selection. Begin entity formation process. Hire first international team member (ideally customer success or sales). Set up banking and payment infrastructure. Q2: Initial Go-to-Market. Launch targeted marketing campaigns. Attend 2-3 key industry events. Close first 5-10 customers. Establish customer success processes for international time zones. Q3: Early Scaling. Hire dedicated sales resource in market. Develop local partnerships (2-3 channel partners). Iterate positioning based on market feedback. Q4: Foundation Building. Expand team to 3-5 in market. Establish office or co-working presence. Build local customer references. Prepare Year 2 expansion plan.

Year 2 Roadmap (Scaling Phase): H1: Accelerate Primary Market. Scale sales team to 8-12. Implement marketing automation and content localization. Achieve product-market fit signals (retention, NPS). H2: Enter Secondary Market. Apply learnings from primary market. Staged entry (remote first, then local presence). Leverage primary market references.

Year 3 Roadmap (Optimization Phase): Optimize primary market unit economics. Scale secondary markets. Evaluate tertiary market entry. Consider M&A for acceleration. Build regional leadership team.

Resource Requirements by Phase: Phase 1 (Testing, 6 months): Budget $200-500K. Team: 1-2 people. Focus: Customer discovery, initial sales. Phase 2 (Entry, 12 months): Budget $500K-1.5M. Team: 3-8 people. Focus: Go-to-market, early customers. Phase 3 (Scaling, 18 months): Budget $1.5-5M. Team: 10-25 people. Focus: Team building, market share.

Milestone Definition: Leading Indicators: Website traffic from target market, demo requests, partnership conversations, job applications. Lagging Indicators: Revenue, customer count, market share, brand awareness. Go/No-Go Triggers: Minimum 10 paying customers before scaling investment. Positive unit economics before team expansion. Clear competitive differentiation validated by customers.

Risk Management in Roadmap: Financial Risks: Currency fluctuation, higher-than-expected CAC. Mitigation: Conservative projections, milestone-based funding release. Operational Risks: Hiring challenges, regulatory surprises. Mitigation: EOR for initial hiring, legal counsel engaged early. Strategic Risks: Market timing, competitive response. Mitigation: Staged investment, clear exit criteria. Contingency Planning: Define pivot triggers and alternative strategies. Maintain optionality in market selection. Build relationships in backup markets.

Governance and Review: Monthly: Pipeline and revenue review with leadership. Quarterly: Strategic review with board. Annually: Comprehensive roadmap refresh. Continuous: Market monitoring and competitive intelligence.',
        '["Create comprehensive 3-year global expansion roadmap with quarterly milestones, resource requirements, and success metrics for your primary target market", "Define specific go/no-go triggers for each phase of expansion with quantitative thresholds for revenue, customers, and unit economics", "Build financial model for international expansion with detailed budget allocation across team, marketing, operations, and legal/compliance", "Develop governance framework with monthly, quarterly, and annual review cadences including board reporting templates"]'::jsonb,
        '["Global Expansion Roadmap Template with pre-built quarterly milestone structure for 3-year planning horizon", "Resource Planning Calculator estimating team size, budget, and timeline by market and entry mode", "Go/No-Go Decision Framework with threshold setting methodology and historical benchmarks from successful expansions", "Board Reporting Template for international expansion progress with KPI dashboard and narrative structure"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: FEMA Compliance for Outbound (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'FEMA Compliance for Outbound',
        'Master Foreign Exchange Management Act compliance for overseas investments - ODI procedures under automatic and approval routes, Liberalised Remittance Scheme limits, RBI reporting requirements, cross-border payments, and working effectively with Authorized Dealer banks.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_2_id;

    -- Day 6: FEMA Framework Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        6,
        'FEMA Framework Overview',
        'The Foreign Exchange Management Act, 1999 (FEMA) governs all foreign exchange transactions in India. For startups expanding internationally, understanding FEMA is essential for legal overseas investments, entity formation, and cross-border fund flows.

FEMA Structure and Philosophy: FEMA replaced the restrictive FERA (Foreign Exchange Regulation Act) in 1999, shifting from conservation of foreign exchange to facilitation of external trade and payments. Key principle: All forex transactions are permitted unless specifically prohibited. Administered by Reserve Bank of India (RBI) with enforcement by Directorate of Enforcement.

Key FEMA Regulations for Outbound Investment: FEMA 120: Foreign Exchange Management (Transfer or Issue of Any Foreign Security) Regulations, 2004 - governs ODI. FEMA 20: Overseas Direct Investment regulations - detailed ODI procedures. Master Direction on ODI: Consolidated RBI guidance issued January 2022, updated periodically.

Transaction Categories: Current Account Transactions: Day-to-day business payments - imports, exports, services, royalties. Generally freely permitted with some restrictions. Capital Account Transactions: Investment-related - ODI, ECB, foreign securities. Regulated with specific approval routes.

Key Definitions for Startups: Overseas Direct Investment (ODI): Investment by Indian entity in foreign entity as equity, loan, or guarantee. Joint Venture (JV): Foreign entity where Indian party holds 10-50% equity. Wholly Owned Subsidiary (WOS): Foreign entity with 100% Indian ownership. Step-Down Subsidiary (SDS): Subsidiary of foreign JV/WOS.

Liberalised Remittance Scheme (LRS): Individual limit: $250,000 per financial year per person. Permitted purposes: Education, travel, gifts, investments, maintenance of relatives. Key restriction: Cannot be used for business purposes by companies. Startup relevance: Founders can use LRS for personal investments in foreign entities (subject to tax implications).

ODI Limit Framework: Automatic Route (no RBI approval): Investment up to 400% of net worth of Indian company. Approval Route (RBI permission required): Investment exceeding 400% of net worth, investment in financial services sector, investment funded by ECB.

Prohibited Destinations: India maintains negative list for ODI - countries like Pakistan, certain entities under UN sanctions. FATF grey/black list countries face enhanced scrutiny. Check latest RBI circulars for current restrictions.

Indian Party Eligibility for ODI: Eligible: Companies registered under Companies Act, LLPs registered under LLP Act, partnership firms, proprietary concerns. Not Eligible: Individuals (for business ODI), trusts, societies, unincorporated entities.

Remittance for Services (Non-ODI): Software exports: Proceeds must be realized within 9 months. Services to overseas clients: Follow FEMA guidelines for service exports. Consultancy/royalty receipts: Subject to taxation and TDS provisions.

Common FEMA Violations to Avoid: Investing without proper ODI documentation. Exceeding automatic route limits without approval. Failing to file required RBI reports (Form ODI, APR). Round-tripping (Indian funds going abroad and returning as FDI). Incorrect transfer pricing in intercompany transactions.',
        '["Study FEMA regulations relevant to your planned overseas investment - download Master Direction on ODI from RBI website and create summary document", "Calculate your ODI limit under automatic route based on latest audited net worth - determine if approval route is required", "Review LRS guidelines to understand personal investment options for founders complementing company-level ODI", "Create FEMA compliance checklist covering all transaction types you expect: ODI, service payments, royalties, and repatriation"]'::jsonb,
        '["FEMA Regulations Summary covering ODI, LRS, and current account transactions with practical interpretation", "ODI Limit Calculator with automatic vs approval route determination based on company financials", "RBI Master Direction on ODI (January 2022) with highlighted sections relevant to startup international expansion", "FEMA Violation Checklist with common mistakes and prevention strategies for startups"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: Overseas Direct Investment (ODI) Procedures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        7,
        'Overseas Direct Investment Procedures',
        'Overseas Direct Investment (ODI) is the mechanism through which Indian companies establish and fund foreign subsidiaries. Understanding ODI procedures is critical for compliant international expansion.

ODI Investment Types: Equity Investment: Direct shareholding in foreign JV/WOS. Most common form of ODI for establishing subsidiaries. Can be through fresh issue or acquisition of existing shares. Loan to Foreign Entity: Debt funding from Indian parent to overseas subsidiary. Subject to interest rate guidelines (arm''s length). Repayment terms must comply with RBI norms. Guarantee: Corporate guarantee by Indian company for overseas subsidiary obligations. Counted within ODI limit. Requires proper documentation and board approval.

Automatic Route Procedure: Step 1 - Board Approval: Pass board resolution authorizing ODI investment. Document business rationale and expected returns. Ensure investment within 400% net worth limit. Step 2 - AD Bank Selection: Choose Authorized Dealer (Category I bank) for ODI. Major banks: SBI, HDFC, ICICI, Axis, Kotak. AD bank acts as RBI''s agent for compliance verification. Step 3 - Documentation Submission: Form ODI (Part I) - Application for overseas investment. Board resolution certified copy. Certificate from Company Secretary/CA on net worth calculation. Valuation certificate for acquisition transactions. KYC documents of Indian company and foreign entity. Step 4 - AD Bank Processing: AD bank reviews documentation completeness. Verifies compliance with automatic route conditions. Approves remittance within 2-5 working days typically. Step 5 - Fund Remittance: AD bank processes forex transfer. Issues Unique Identification Number (UIN) for transaction. Remittance must be for documented purpose only. Step 6 - Post-Investment Compliance: File Form ODI (Part II) within 30 days of investment. Submit Annual Performance Report (APR) by December 31 each year. Report any disinvestment or restructuring promptly.

Approval Route Procedure (When Required): Additional steps beyond automatic route: Submit application to RBI through AD bank. RBI reviews application (typically 4-8 weeks). May request additional information or clarifications. Approval letter issued with specific conditions. Investment must comply with approval conditions.

Documentation Checklist: Corporate Documents: Certificate of Incorporation, MOA/AOA, Board Resolution. Financial Documents: Latest audited financials, CA certificate on net worth, source of funds declaration. Foreign Entity Documents: Certificate of Incorporation (foreign), shareholding pattern, business plan. Valuation: Independent valuation for acquisition transactions. Compliance: FEMA compliance certificate from CS/CA.

Common Processing Issues: Incomplete documentation (40% of delays). Net worth calculation errors. Missing board resolution or incorrect format. Inadequate business rationale documentation. Valuation discrepancies in acquisition transactions.

Step-Down Subsidiary (SDS) Investments: First-level overseas subsidiary can make further investments. Creates step-down subsidiary structure. Requires separate reporting in APR. Common for regional holding company structures (e.g., Singapore holding company investing in SEA).

Timeline Planning: Automatic Route: 2-4 weeks from complete documentation. Approval Route: 8-12 weeks including RBI processing. Plan entity formation timeline accounting for ODI processing. Begin documentation 6-8 weeks before planned investment.',
        '["Prepare complete ODI documentation package for your planned overseas investment including board resolution, net worth certificate, and business rationale", "Select AD bank for ODI processing - compare 3 banks on processing time, fees, and international banking capabilities", "Create ODI timeline with milestones from board approval through fund remittance, accounting for typical processing times", "Engage Company Secretary or CA to prepare Form ODI Part I and net worth compliance certificate"]'::jsonb,
        '["Form ODI Template with field-by-field guidance and sample completed forms for different investment types", "Board Resolution Format for ODI authorization with standard clauses required by AD banks", "AD Bank Selection Criteria comparing top 5 banks for ODI processing capabilities and international services", "ODI Timeline Planner with task dependencies and typical duration benchmarks"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: RBI Reporting Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        8,
        'RBI Reporting Requirements',
        'Ongoing RBI reporting is mandatory for all ODI investments. Non-compliance can result in penalties, compounding violations, and restrictions on future investments. Establishing robust reporting systems from the start is essential.

Form ODI Reporting: Form ODI Part I: Application form submitted before investment. Contains Indian company details, foreign entity details, investment amount and type. Filed through AD bank. Form ODI Part II: Confirmation of investment completion. Must be filed within 30 days of remittance. Contains actual investment details, UIN, proof of investment. Form ODI Part III: Report for additional investments in existing JV/WOS. Required for subsequent equity, loan, or guarantee extensions.

Annual Performance Report (APR): Mandatory Filing: Every Indian company with ODI must file APR. Deadline: December 31 each year for preceding June 30 financial year. Coverage: All overseas JV/WOS including step-down subsidiaries. Content: Financial statements of foreign entity, shareholding pattern, dividend received, compliance status.

APR Components: Section A: Identification details of Indian party and foreign entity. Section B: Financial particulars - share capital, reserves, borrowings, turnover, profit/loss. Section C: Operations summary - nature of business, employees, major activities. Section D: Compliance confirmations - valuation, arm''s length pricing, regulatory compliance. Section E: Dividend and repatriation details.

APR Filing Process: Prepare audited/unaudited financials of foreign entity. Convert to INR at RBI reference rate. Complete APR form with required details. Submit through AD bank by December 31. AD bank forwards to RBI for record.

Other Reporting Obligations: Disinvestment Reporting: Sale, liquidation, or write-off of overseas investment. File through AD bank within 30 days. Provide valuation and transaction documentation. Evidence of sale proceeds receipt. Restructuring Reporting: Change in shareholding pattern of foreign entity. Merger/acquisition affecting foreign JV/WOS. Change in nature of business. Report within 30 days of event.

Common Reporting Errors: APR Errors: Incorrect exchange rate conversion. Incomplete foreign entity financials. Missing step-down subsidiary reporting. Late filing (penalties apply). Form ODI Errors: Mismatch between Part I and Part II amounts. Incomplete post-investment documentation. Missing proof of share issuance/acquisition.

Penalty Framework for Non-Compliance: Late Filing: Penalty up to three times the sum involved. Compounding available for certain violations. Non-Filing: Continued non-compliance can lead to: Restriction on future ODI. Enforcement Directorate investigation. Personal liability of directors. Compounding Process: Application to RBI for compounding violations. Payment of compounding fee (varies by violation). Regularization of compliance status.

Compliance Best Practices: Set up annual compliance calendar with reminders. Maintain documentation repository for all ODI transactions. Engage professional (CS/CA) for APR preparation. Review compliance quarterly, not just at year-end. Document all intercompany transactions for transfer pricing. Keep foreign entity financials updated and accessible.

Technology for Compliance: Use compliance management software for deadline tracking. Maintain digital documentation for all ODI transactions. Implement workflow for timely foreign entity financial reporting. Consider outsourced compliance services for multiple entities.',
        '["Create RBI reporting compliance calendar with all filing deadlines for Form ODI, APR, and event-based reports", "Establish documentation management system for storing and retrieving all ODI-related documents required for RBI reporting", "Prepare APR filing checklist ensuring all required information from foreign entity is captured and converted correctly", "Engage professional (CS or CA with FEMA expertise) to handle ongoing RBI compliance and reduce penalty risk"]'::jsonb,
        '["RBI Reporting Calendar Template with automated reminders for Form ODI, APR, and event-based filings", "APR Preparation Guide with section-by-section instructions and common error prevention tips", "Documentation Checklist for ODI compliance covering initial investment through ongoing reporting requirements", "FEMA Penalty and Compounding Guide explaining violation consequences and regularization procedures"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Cross-Border Payments Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        9,
        'Cross-Border Payments Compliance',
        'Beyond ODI, startups engage in various cross-border payments including service fees, royalties, and intercompany transactions. Each payment type has specific FEMA compliance requirements and documentation needs.

Categories of Cross-Border Payments: Current Account Transactions: Import payments for goods/services. Export proceeds receipt. Royalty and technical fee payments. Consultancy and professional service fees. Capital Account Transactions: ODI investments (covered previously). External Commercial Borrowings (ECB). Foreign Direct Investment (FDI) inflows.

Service Export Proceeds: Realization Timeline: Must realize proceeds within 9 months of invoice (extended from earlier 6 months). Can apply to AD bank for extension in genuine cases. Write-off requires RBI/AD bank approval beyond threshold. Documentation: Export invoice with proper description. SOFTEX form for software exports (for amounts above threshold). FIRC (Foreign Inward Remittance Certificate) as proof. Bank Realization Certificate (BRC) for record.

Import Payments: Advance Payments: Generally permitted for imports. Documentation of underlying import required. Time limit for import completion post-advance. Deferred Payments: Subject to interest rate guidelines. Maximum deferral period varies by transaction type. May require AD bank approval.

Royalty and Technical Fee Payments: Automatic Route: Up to 5% on domestic sales, 8% on export sales (combined royalty + technical fee). No RBI approval required within limits. Subject to TDS/withholding tax compliance. Beyond Limits: Requires RBI approval through AD bank. Must demonstrate arm''s length pricing. Documentation of underlying agreement required.

Intercompany Transactions: Service Fees to Overseas Subsidiary: Common for shared services, management fees. Must be at arm''s length (transfer pricing compliance). Proper service agreement documentation required. Subject to withholding tax in both jurisdictions. Cost Reimbursements: Document actual costs being reimbursed. Mark-up requirements may apply per transfer pricing rules. Proper allocation methodology documentation.

EEFC Account (Exchange Earners Foreign Currency): Eligibility: Entities earning forex through exports. Purpose: Retain forex earnings for future import/payment needs. Limit: Up to 100% of previous year''s forex earnings. Benefits: Avoid conversion losses, faster cross-border payments.

Documentation Requirements by Payment Type: All Payments: Purpose code (RBI schedule). Underlying agreement/contract. Invoice and supporting documents. Form A2 for remittances above threshold. Service Exports: SOFTEX (for software above limit). Invoice with SAC code. Bank realization certificate. Royalty Payments: Technology transfer agreement. Withholding tax certificate. CA certificate for arm''s length pricing.

Common Compliance Issues: Incorrect purpose code selection. Missing underlying documentation. Exceeding royalty limits without approval. Late realization of export proceeds. Inadequate transfer pricing documentation. TDS/withholding tax non-compliance.

Working with AD Bank for Payments: Build relationship with international banking team. Understand bank''s documentation requirements upfront. Provide complete documentation to avoid delays. Maintain purpose-code master for recurring payment types. Review bank charges and forex rates for optimization.',
        '["Set up EEFC account if your company earns forex through exports - compare offerings from 3 banks on interest, limits, and conversion charges", "Create payment type master document mapping each cross-border payment type to required documentation, purpose codes, and compliance requirements", "Establish intercompany service agreement with overseas subsidiary documenting service scope, pricing methodology, and payment terms", "Review royalty and technical fee payments against automatic route limits - prepare documentation for any payments requiring RBI approval"]'::jsonb,
        '["Cross-Border Payment Compliance Matrix mapping payment types to documentation and approval requirements", "Purpose Code Directory with RBI schedule codes for common startup cross-border transactions", "Intercompany Service Agreement Template with arm''s length pricing documentation requirements", "EEFC Account Comparison Guide evaluating top 5 banks for forex retention account features"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: FEMA Compliance Best Practices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        10,
        'FEMA Compliance Best Practices',
        'Building a robust FEMA compliance system protects your company from penalties, enables smooth international operations, and positions you for future growth. Proactive compliance is far more efficient than reactive regularization.

Building FEMA Compliance Infrastructure: Compliance Team Structure: Designate FEMA compliance owner (CFO/Finance Head typically). Engage external CS/CA with FEMA expertise as advisor. Train relevant team members on basic compliance requirements. Clear escalation path for complex transactions.

Documentation Management System: Centralized repository for all forex transactions. Standard naming convention for easy retrieval. Version control for agreements and amendments. Retention period: minimum 7 years (10 years recommended).

Process Documentation: Written SOPs for each transaction type. Checklist-based approach for recurring transactions. Approval matrix for different transaction values. Audit trail for all decisions and approvals.

Compliance Calendar Management: Annual: APR filing (December 31), statutory audit coordination. Quarterly: Compliance review, pending item resolution. Monthly: Transaction reconciliation, document completion. As Required: Form ODI filings, event-based reports.

AD Bank Relationship Management: Selecting the Right AD Bank: International banking capabilities and global correspondent network. FEMA expertise in banking team. Processing time for routine and complex transactions. Digital platform for transaction initiation and tracking. Competitive forex rates and charges.

Building Effective Relationship: Regular meetings with relationship manager and compliance team. Provide complete documentation proactively. Understand bank''s internal approval process and timelines. Escalation contacts for urgent matters. Annual review of services and pricing.

Managing Multiple AD Banks: May use different banks for different purposes (domestic vs international). Consolidation generally better for compliance tracking. Ensure coordination for aggregate limit monitoring.

Proactive Compliance Strategies: Pre-Transaction Planning: Assess FEMA implications before structuring transactions. Obtain informal guidance from AD bank for complex matters. Build compliance requirements into project timelines. Documentation Discipline: Prepare documentation concurrent with transaction, not after. Standard templates for recurring transaction types. Regular documentation audits by external advisor.

Regular Compliance Reviews: Quarterly self-assessment of pending items. Annual FEMA audit by external professional. Address issues promptly before they compound.

Common Scenarios and Solutions: Scenario 1: Overseas subsidiary needs emergency funding. Solution: Pre-approve additional ODI headroom with board. Have documentation templates ready. Maintain relationship with AD bank for quick processing. Scenario 2: Late APR filing discovered. Solution: File immediately with delay explanation. Consider voluntary compounding if significant delay. Implement calendar-based alerts for future.

Scenario 3: Export proceeds realization deadline approaching. Solution: Track receivables against 9-month deadline. Apply for extension well before deadline. Document collection efforts for potential write-off. Scenario 4: Exceeding automatic route ODI limit. Solution: Plan investments considering net worth trajectory. Apply for approval route well in advance. Consider capital raise to increase net worth if needed.

Professional Support Network: Company Secretary: Form ODI preparation, APR filing, compliance certificates. Chartered Accountant: Net worth calculation, arm''s length certification, audit coordination. FEMA Lawyer: Complex structuring, RBI applications, compounding matters. AD Bank: Day-to-day compliance guidance, transaction processing.',
        '["Build FEMA compliance infrastructure with designated owner, external advisor engagement, and documented SOPs for all transaction types", "Create comprehensive compliance calendar integrating all FEMA deadlines with your financial calendar and team responsibilities", "Conduct FEMA compliance audit of existing international transactions identifying gaps and creating remediation plan", "Establish AD bank relationship framework with quarterly review meetings, escalation contacts, and service level expectations"]'::jsonb,
        '["FEMA Compliance SOP Manual with process documentation for all common transaction types and decision trees", "Compliance Calendar Template with integrated reminders, responsibility assignment, and completion tracking", "FEMA Self-Assessment Checklist for quarterly compliance reviews covering all reporting and documentation requirements", "AD Bank Selection and Management Guide with evaluation criteria, relationship framework, and negotiation points"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: US Market Entry (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'US Market Entry',
        'Master US market entry for Indian startups - Delaware C-Corp incorporation, US banking setup, federal and state tax obligations, sales and marketing strategies, and building effective US sales teams.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_3_id;

    -- Day 11: US Market Opportunity Analysis
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        11,
        'US Market Opportunity Analysis',
        'The United States represents the largest single market opportunity for most Indian B2B startups. With $25 trillion GDP and sophisticated buyers willing to pay premium prices, the US is often the primary target for international expansion.

US Market Size by Sector: Enterprise Software: $300+ billion market, 10-12% CAGR. Cloud infrastructure: $80 billion. SaaS applications: $150 billion. Cybersecurity: $40 billion. DevOps/Developer tools: $30 billion. Fintech: $200+ billion market, 15% CAGR. Payments: $100 billion. Lending tech: $50 billion. Wealth tech: $30 billion. InsurTech: $20 billion. E-commerce Technology: $80+ billion market. E-commerce platforms: $25 billion. Marketing tech: $20 billion. Logistics tech: $15 billion. Healthcare IT: $150+ billion market. EHR/EMR: $30 billion. Telehealth: $40 billion. Healthcare analytics: $25 billion.

Indian Startup Advantages in US Market: Cost Arbitrage: 60-70% lower engineering costs. Enables competitive pricing or faster feature development. Sustainable advantage for next 5-10 years. English Proficiency: No language barrier for business communication. Technical documentation and support in native language. Marketing content creation capability. Time Zone Coverage: India team provides extended support hours. 10-12 hour overlap with US business hours achievable. 24/7 support capability with India + US teams. Diaspora Network: 4+ million Indian diaspora in US. Strong presence in tech leadership roles. Network effects for hiring, sales introductions, partnerships.

US Market Challenges for Indian Startups: Sales Model Differences: Relationship-driven vs transaction-driven. Longer sales cycles for enterprise (6-18 months). Local presence often required for enterprise deals. Trust Building: Brand awareness typically low. Customer references critical for enterprise sales. Security and compliance certifications expected (SOC 2, HIPAA).

Cultural Differences: Direct communication style. Time-sensitivity expectations. Follow-up and responsiveness standards. Competition: Most competitive market globally. Well-funded local and global competitors. Continuous innovation pressure.

Customer Segmentation Strategy: Enterprise ($50K+ ACV): Requires US sales presence and local references. Long sales cycles, relationship-driven. High customer success investment needed. Mid-Market ($10-50K ACV): Can sell remotely with inside sales model. Balance of relationship and product-led growth. Growing segment for Indian SaaS companies. SMB ($1-10K ACV): Product-led growth, self-serve model. Low-touch sales, digital marketing focus. Volume business requiring efficient operations. Startup/Developer: Freemium and community-led growth. Bottom-up adoption, viral potential. Brand building for future enterprise expansion.

US Geographic Considerations: Bay Area/Silicon Valley: Tech startup concentration, early adopter mindset. High competition, sophisticated buyers. Premium pricing acceptable. New York: Financial services, media, advertising focus. Enterprise concentration. East coast business culture. Texas (Austin, Dallas): Growing tech hub, cost-effective expansion. Midwest/Emerging Tech Hubs: Less competitive, growing markets. Consider for initial entry before major hubs.',
        '["Research US market size and growth rate for your specific segment using Gartner, Forrester, and industry analyst reports", "Analyze 10 US competitors including their positioning, pricing, market share, funding, and customer base characteristics", "Conduct 15 customer discovery interviews with US prospects to validate demand, understand buying process, and identify key requirements", "Define US customer segmentation strategy with target segment prioritization based on market size, competition, and fit with your capabilities"]'::jsonb,
        '["US Market Sizing Framework with industry-specific data sources and estimation methodology", "US Competitor Analysis Template for systematic evaluation of competitive landscape", "Customer Discovery Interview Guide adapted for US market conversations and cultural context", "US Customer Segmentation Matrix for prioritizing target segments based on multiple criteria"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 12: Delaware C-Corp Formation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        12,
        'Delaware C-Corp Formation',
        'Delaware C-Corporation is the standard entity structure for Indian startups entering the US market, particularly those planning to raise US venture capital. Understanding formation process, compliance requirements, and parent-subsidiary structuring is essential.

Why Delaware C-Corp: Investor Preference: 95%+ of VC-backed companies are Delaware C-Corps. Well-established legal precedents and case law. Investor-friendly corporate statutes. Business-Friendly Laws: Court of Chancery specializes in business disputes. Flexible corporate governance provisions. Privacy protections for shareholders. Practical Benefits: No requirement for directors or shareholders to be US residents. Can operate in any state (Delaware is just incorporation state). Established infrastructure for corporate services.

Formation Process: Step 1 - Name Reservation: Check name availability with Delaware Division of Corporations. Reserve name (optional but recommended). Include "Inc." or "Corporation" in name. Cost: $75 for reservation. Step 2 - Certificate of Incorporation: File with Delaware Secretary of State. Key provisions: authorized shares, registered agent, incorporator. Standard filing: 24-hour processing, $89 state fee. Expedited available: same-day ($50-100 additional). Step 3 - Registered Agent: Required for all Delaware entities. Receives legal documents and official correspondence. Popular providers: CT Corporation, Registered Agents Inc., Northwest. Cost: $50-300 annually.

Step 4 - Initial Corporate Setup: Adopt bylaws (governance rules). Hold organizational meeting (board resolution). Issue stock certificates. EIN application (see Day 13). Step 5 - Ongoing Compliance: Annual franchise tax: $175-200,000+ based on shares or assets (most startups pay minimum $400). Annual report: Due March 1 each year. Maintain registered agent continuously.

Entity Structure Options: Option 1: Direct US Subsidiary. India Parent → US Subsidiary (Delaware C-Corp). Simplest structure. Clear ownership relationship. FEMA ODI compliance required from India. Option 2: US Parent (Flip). US C-Corp as parent → India as subsidiary. Preferred by US VCs for US-focused companies. Complex to implement, tax implications on flip. Common for companies raising significant US capital. Option 3: Dual Structure. Parallel US and India entities. More complex, transfer pricing issues. May be appropriate for specific situations.

Key Corporate Documents: Certificate of Incorporation: Filed with Delaware. Defines authorized capital, basic structure. Bylaws: Internal governance rules. Adopted by board, not filed publicly. Board Resolutions: Formal decisions by board. Required for major actions (banking, contracts, hiring). Stock Ledger: Record of all shareholders. Maintained by company (often via Carta or similar). Shareholder Agreements: Rights and obligations of shareholders. Voting agreements, transfer restrictions.

Common Formation Mistakes: Incorrect authorized share structure (affects 409A valuation). Missing organizational resolutions. Improper stock issuance to founders. Failure to maintain corporate formalities. Late franchise tax payment (penalties accumulate).

Formation Cost Summary: State Filing: $89 (standard) to $1,000+ (expedited/complex). Registered Agent: $50-300/year. Legal Assistance: $500-2,000 (formation package) to $5,000-15,000 (full legal setup including shareholder agreements). Total: $2,000-5,000 for basic setup, $10,000-20,000 for comprehensive legal structure.',
        '["Select entity structure (direct subsidiary vs flip) based on funding plans, with input from US legal counsel and Indian CA on tax implications", "Choose registered agent service comparing CT Corporation, Registered Agents Inc., and Northwest on cost, service, and reputation", "Prepare Certificate of Incorporation with appropriate authorized share structure consulting with startup lawyer on 409A implications", "Create corporate setup checklist including bylaws adoption, organizational resolutions, and stock issuance to parent company"]'::jsonb,
        '["Delaware Incorporation Checklist with step-by-step process and timeline from name reservation to complete setup", "Entity Structure Decision Guide comparing direct subsidiary vs flip structure with tax and legal implications", "Sample Certificate of Incorporation with standard provisions for VC-backed startups and annotation of key terms", "Corporate Document Templates including bylaws, organizational consent, and stock purchase agreement"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 13: US Banking and Payments Setup
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        13,
        'US Banking and Payments Setup',
        'Establishing US banking and payment infrastructure is essential for collecting customer payments, paying US vendors and employees, and managing working capital. Options have expanded significantly for international founders.

Employer Identification Number (EIN): What It Is: Federal tax identification number (like PAN for US). Required for: Banking, tax filing, hiring, vendor payments. Application: Form SS-4 to IRS. Timeline: Immediate by phone (requires SSN), 4-6 weeks by mail/fax. Foreign Owners: Can apply without SSN using Form SS-4 by mail/fax. Process: Complete SS-4 → Mail/fax to IRS → Receive EIN letter.

US Business Bank Account Options: Traditional Banks (Wells Fargo, Chase, Bank of America): Pros: Established reputation, full banking services, integration with enterprise systems. Cons: In-person visit often required, stringent documentation, limited international founder support. Requirements: EIN, Certificate of Incorporation, bylaws, board resolution, owner identification. Process: 2-4 weeks typically.

Digital-First Banks (Mercury, Relay, Brex): Pros: Remote account opening, founder-friendly, modern interface, startup ecosystem integration. Cons: May have deposit limits initially, fewer traditional banking services. Mercury: Most popular for startups. Remote opening for non-US residents. Free wire transfers, good integrations. Requirements: EIN, incorporation documents, founder ID. Timeline: 3-7 days typically.

International-Friendly Banks (SVB, First Republic): Pros: Experience with international founders, VC ecosystem connections. Cons: May require minimum balances or relationship. Note: SVB situation evolved - check current status.

Banking Documentation Requirements: Standard Requirements: EIN confirmation letter. Certificate of Incorporation (certified copy). Company bylaws. Board resolution authorizing account opening. Personal identification of signatories (passport). Proof of business address. Additional for Non-US Founders: W-8BEN-E form (for foreign companies). Explanation of business and source of funds. May require US director or officer for some banks.

Payment Collection Infrastructure: Stripe: Industry standard for SaaS/subscription billing. Supports ACH, cards, wire transfers. 2.9% + $0.30 per card transaction. International payouts to India available. Setup: 1-2 days, requires US entity and bank account.

Other Options: Square: Good for in-person payments. PayPal: Alternative for smaller merchants. Adyen: Enterprise-grade, complex implementation. ACH Direct: Lower fees (0.8%), longer settlement (3-5 days).

Payroll and Expense Management: Payroll Providers: Gusto: Popular for startups, $40/month base + $6/employee. Rippling: HR + IT + Payroll integrated. ADP/Paychex: Traditional providers for larger teams. Corporate Cards: Brex: No personal guarantee, integrates with accounting. Ramp: Expense management focus, cashback. Mercury Treasury: Integrated with Mercury banking.

Multi-Currency and Repatriation: Holding USD in US Account: Maintain operating capital in US. Repatriate to India as needed per FEMA guidelines. Currency Management: Consider timing of conversions. Use treasury tools for larger amounts. Wire Transfer to India: Cost: $25-45 per wire typically. Timeline: 2-3 business days. Documentation: Ensure proper purpose codes for FEMA compliance.',
        '["Apply for EIN using Form SS-4 - use mail/fax method if no US SSN available, keep confirmation letter for all future filings", "Open US business bank account with Mercury or similar startup-friendly bank - prepare all required documentation in advance", "Set up Stripe account connected to US bank for payment collection - configure for your billing model (subscription, usage, one-time)", "Establish payroll infrastructure selecting Gusto or Rippling based on team size and HR needs"]'::jsonb,
        '["EIN Application Guide with Form SS-4 instructions and timeline expectations for foreign applicants", "US Bank Account Comparison Matrix evaluating Mercury, Brex, traditional banks on features, fees, and requirements", "Payment Infrastructure Setup Checklist covering Stripe configuration, ACH setup, and integration requirements", "Payroll Provider Comparison for startups evaluating Gusto, Rippling, and alternatives on cost and features"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 14: US Sales and Marketing Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        14,
        'US Sales and Marketing Strategy',
        'Building effective US sales and marketing requires adapting your approach for American buyers, establishing local presence, and investing appropriately in customer acquisition.

US Sales Model Options: Product-Led Growth (PLG): Self-serve signup, freemium or trial model. Focus on product experience and onboarding. Low CAC, suitable for SMB/developer segments. Examples: Postman, Canva, Notion. Marketing-Led Growth: Inbound marketing drives qualified leads. Content, SEO, paid acquisition. Inside sales converts leads. Suitable for mid-market, scalable approach. Sales-Led Growth: Outbound prospecting and relationship building. Higher touch, longer cycles. Necessary for enterprise ($100K+ deals). Requires US-based sales team.

Building US Sales Team: First US Hire - Options: Option A - Sales Rep: Hire experienced AE with rolodex. Cost: $150-300K OTE. Faster revenue but higher risk. Option B - Sales Leader: Hire VP Sales to build team. Cost: $250-400K+ OTE. Slower but more strategic. Option C - Customer Success: Hire CS first, grow into sales. Lower cost, relationship-focused. Best for PLG companies. Hiring Considerations: US sales compensation is 50% base, 50% variable (at quota). Quota typically 4-6x OTE for SaaS. Look for relevant industry experience and startup DNA. Remote vs office depends on target segment.

Sales Process Adaptation for US Market: Discovery: Americans expect direct, efficient communication. Focus on business value, not features. Quantify ROI with specific metrics. Demo: Interactive, focused on customer use case. 30-45 minute standard (not 90-minute deep dives). Clear next steps and timeline. Proposal/Negotiation: Written proposals with clear pricing. Expect negotiation on price and terms. Legal review common for enterprise deals. Procurement: Enterprise deals involve procurement team. Security questionnaires standard. May require vendor registration process.

US Marketing Strategy: Content Marketing: Blog posts, whitepapers, case studies. SEO optimization for US search terms. Thought leadership positioning. Budget: $2-5K/month for quality content. Paid Acquisition: Google Ads: High intent, expensive ($20-100+ CPL). LinkedIn: B2B targeting, $50-200+ CPL. Review sites: G2, Capterra (pay for leads/placement). Budget: Start $5-10K/month, scale with CAC validation.

Events and Community: Industry conferences (RSA, SaaStr, Dreamforce). Local meetups in target cities. Webinars and virtual events. Budget: $20-50K per major conference sponsorship. PR and Analyst Relations: Industry analyst briefings (Gartner, Forrester). Press coverage in trade publications. Costs $10-20K/month for PR agency.

Go-to-Market Metrics to Track: Leading: Website traffic (US), demo requests, trial signups, MQL to SQL conversion. Lagging: Pipeline created, win rate, ACV, CAC, sales cycle length. Targets: Enterprise CAC payback < 18 months, SMB CAC payback < 12 months, LTV:CAC > 3:1.

US Market Launch Playbook: Month 1-2: Website localization, pricing in USD, basic content. Set up analytics and attribution tracking. Month 3-4: Launch paid acquisition experiments. Hire first US resource (sales or CS). Attend 1-2 industry events. Month 5-6: Scale working channels. Build initial case studies. Refine ICP based on early customers.',
        '["Define US sales model (PLG, marketing-led, sales-led, or hybrid) based on your product, ACV, and target segment", "Create US go-to-market plan with specific channel mix, budget allocation, and timeline for first 6 months", "Develop US-specific content strategy including blog topics, case study format, and SEO keyword targets", "Design US sales process with stage definitions, exit criteria, and playbook for discovery and demo calls"]'::jsonb,
        '["US Sales Model Selection Framework helping choose between PLG, marketing-led, and sales-led approaches", "US GTM Budget Planner with channel-specific cost benchmarks and budget allocation recommendations", "US Content Marketing Playbook with topic ideas, format recommendations, and SEO best practices", "US Sales Process Template with stage definitions, discovery questions, and objection handling guides"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 15: US Tax and Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        15,
        'US Tax and Compliance',
        'US tax compliance involves federal, state, and local obligations. Understanding nexus rules, sales tax requirements, and filing obligations is essential to avoid penalties and operate legally.

Federal Tax Obligations: Corporate Income Tax: Rate: 21% flat rate (reduced from 35% in 2017). Filing: Form 1120 annually, due 15th of 4th month after year-end. Estimated payments: Quarterly if expecting $500+ tax. Foreign-Owned Corporations: Form 5472: Required for reportable transactions with foreign related parties. Form 1120-F: If US subsidiary has transactions with Indian parent. Transfer pricing: Document arm''s length pricing for intercompany transactions.

Payroll Taxes: Federal: Social Security: 6.2% employer + 6.2% employee (up to $160,200 in 2023). Medicare: 1.45% each (no limit), additional 0.9% employee above $200K. Federal Unemployment (FUTA): 6% on first $7,000, reduced to 0.6% with state credit. State: Varies by state (California, New York have additional payroll taxes).

State Tax Obligations: Corporate Income Tax: Varies by state: 0% (Nevada, Wyoming) to 11.5% (New Jersey). Multi-state operations: Apportionment based on sales, payroll, property. Nexus Triggers: Physical presence (office, employees, inventory). Economic nexus (exceeding sales thresholds). Agent or representative conducting business. Filing: Separate state returns required where nexus exists.

Sales Tax - Critical for SaaS: Economic Nexus Rules: Post-Wayfair (2018): States can require sales tax collection based on economic presence. Typical thresholds: $100,000 sales or 200 transactions in state. SaaS Taxability: Varies by state - taxable in some (Texas, New York), non-taxable in others. B2B exemptions may apply with proper documentation. Compliance Options: Manual: Track nexus, register, file - complex with 45 states + DC. Automated: Use services like Avalara, TaxJar - cost $300-1,000+/month. Pass-through: Some companies add "taxes and fees" line item.

Delaware Franchise Tax: Due: March 1 annually (penalty if late). Calculation Methods: Authorized Shares Method: $175 minimum to $200,000 maximum. Assumed Par Value Capital Method: Often lower for high-share-count startups. Recommendation: Use Assumed Par Value method - calculate both, pay lower amount.

Compliance Calendar: Quarterly: Federal estimated tax payments (if applicable). Payroll tax deposits (semi-weekly for most). State estimated taxes. Annually: Form 1120 (federal corporate return). State corporate returns. Delaware Franchise Tax (March 1). Form 5472 (with 1120). W-2s and 1099s (January 31). Ongoing: Sales tax filings (monthly/quarterly per state). Payroll processing and filings.

Common Compliance Issues: Sales Tax: Failing to collect when required creates liability. States conduct audits and assess back taxes + penalties. Implement sales tax from start in taxable states. Transfer Pricing: Intercompany transactions scrutinized by IRS. Document arm''s length methodology. Consider advance pricing agreement for certainty. Payroll Compliance: Worker misclassification (employee vs contractor). Multi-state payroll complexity. Withholding and reporting requirements.',
        '["Engage US tax advisor (CPA with international experience) to plan tax structure and identify filing requirements for your specific situation", "Determine sales tax obligations by state - evaluate manual vs automated compliance based on number of states and transaction volume", "Create US tax compliance calendar with all federal, state, and Delaware filing deadlines and estimated payment dates", "Document transfer pricing methodology for intercompany transactions between India parent and US subsidiary"]'::jsonb,
        '["US Tax Overview Guide covering federal, state, and local tax obligations for foreign-owned corporations", "Sales Tax Decision Tree helping determine taxability and compliance approach by state", "US Tax Compliance Calendar Template with all filing deadlines and payment schedules", "Transfer Pricing Documentation Template for intercompany transactions with arm''s length analysis"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 1-3 created successfully';

    -- ========================================
    -- MODULE 4: EU Market Entry (Days 16-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'EU Market Entry',
        'Master European Union market entry - single market access from one entity, GDPR compliance requirements, VAT management, country selection between Netherlands, Ireland, and Germany, and adapting go-to-market for diverse European cultures.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_4_id;

    -- Day 16: EU Market Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        16,
        'EU Market Fundamentals',
        'The European Union represents a $17 trillion economic bloc with 450 million consumers accessible through a single market framework. Understanding EU market dynamics is essential for Indian startups seeking geographic diversification beyond the US.

EU Single Market Advantage: One Entity, 27 Markets: Establish entity in any EU member state. Freedom to sell goods and services across all 27 countries. No customs duties or trade barriers within EU. Harmonized regulations in many areas. Market Size by Segment: Enterprise Software: EUR 150 billion market. Growing at 8-10% annually. Strong in manufacturing, automotive, financial services. Fintech: EUR 50 billion market. UK (post-Brexit) remains major hub. Germany, France, Netherlands emerging. Digital Services: EUR 200 billion addressable market. Varying digital maturity across countries.

Key EU Markets for Indian Startups: Germany: Largest EU economy (EUR 3.8 trillion GDP). Strong manufacturing, automotive, industrial sector. Formal business culture, longer sales cycles. Language: German preferred for SMB, English acceptable for enterprise. Price-sensitive despite economic strength. UK (Post-Brexit): EUR 2.8 trillion GDP, now outside EU single market. Most accessible market for English-speaking companies. Strong financial services, tech adoption. Separate entity/compliance required from EU. France: EUR 2.6 trillion GDP. Government and large enterprise focus. French language often required. Strong in luxury, aerospace, nuclear, pharma. Netherlands: EUR 900 billion GDP. Gateway to EU for many companies. English widely spoken, international business culture. Strong logistics, trading, agriculture tech. Ireland: EUR 500 billion GDP. Tech hub (Google, Facebook, Microsoft EU HQ). English-speaking, favorable tax environment. Limited domestic market but EU access.

EU vs US Market Differences: Sales Cycles: Generally longer than US (20-30% more time). More consensus-driven decision making. Relationship building important. Pricing: Lower willingness to pay than US (typically 20-40% lower). Value orientation differs by country. Enterprise budgets more constrained. Procurement: Formal RFP processes common. Public sector significant buyer (complex procurement). GDPR and data handling scrutinized.

Cultural Considerations: Northern Europe (Germany, Netherlands, Nordics): Direct communication, punctuality valued, thorough documentation expected. Southern Europe (France, Italy, Spain): Relationship-oriented, flexibility appreciated, personal connections matter. Eastern Europe (Poland, Czech Republic): Growing tech markets, cost-sensitive, strong engineering talent.

Post-Brexit Considerations: UK Requires Separate Strategy: No longer part of EU single market. Separate entity needed for UK operations. Data transfer mechanisms required (UK adequacy decision helps). Different regulatory framework emerging. Opportunity: UK can be faster entry point for English-speaking companies. Many Indian companies start with UK, then expand to EU.',
        '["Research EU market size and competitive landscape for your specific segment - identify top 5 target countries based on market opportunity and accessibility", "Analyze cultural and business practice differences between target EU countries - document implications for sales process and marketing", "Evaluate UK vs EU-first strategy based on language requirements, market size, and regulatory complexity for your product", "Conduct 10 customer discovery calls with EU prospects to validate positioning and understand local buying preferences"]'::jsonb,
        '["EU Market Sizing Framework with country-specific data and growth projections by industry vertical", "EU Business Culture Guide covering communication styles, decision-making, and relationship building by region", "UK vs EU Entry Decision Matrix with regulatory, tax, and market considerations for each approach", "EU Customer Discovery Interview Guide with country-specific adaptations and cultural considerations"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 17: EU Entity Setup
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        17,
        'EU Entity Setup',
        'Selecting the right EU jurisdiction and entity type is critical for tax efficiency, operational simplicity, and market access. Each country offers distinct advantages for Indian startups.

Popular EU Jurisdictions for Indian Startups: Netherlands (BV - Besloten Vennootschap): Advantages: English-friendly business environment. Extensive DTAA network including India. No local director requirement. Holding company benefits for EU expansion. Strong IP regime (Innovation Box - 9% rate on qualifying IP income). Setup: Minimum capital EUR 0.01 (practical minimum EUR 1,000). Formation time: 2-4 weeks. Cost: EUR 3,000-8,000 including notary.

Ireland (Limited Company): Advantages: English-speaking, common law system. Low corporate tax rate (12.5% on trading income). Strong tech ecosystem and talent. US company familiarity. EU access with familiar legal concepts. Setup: Minimum capital EUR 1 (no minimum paid-up). Formation time: 1-2 weeks. Cost: EUR 2,000-5,000. Note: Local director requirement (can use nominee service).

Germany (GmbH - Gesellschaft mit beschrankter Haftung): Advantages: Access to largest EU market directly. Strong brand credibility in B2B. Excellent engineering talent. Good for manufacturing/industrial focus. Setup: Minimum capital EUR 25,000 (EUR 12,500 paid up at formation). Formation time: 4-8 weeks. Cost: EUR 5,000-15,000. Note: Local notarization required, can be done remotely.

Estonia (OU - Osahing): Advantages: e-Residency program - fully remote setup and management. No corporate tax on retained earnings. Digital-first government services. Low costs. Setup: Minimum capital EUR 2,500 (can be deferred). Formation time: 1-2 weeks. Cost: EUR 1,500-3,000. Limitation: Small domestic market, may face perception issues with larger enterprises.

Entity Structure Considerations: Direct Subsidiary: India Parent → EU Subsidiary. Simplest structure, clear ownership. FEMA ODI compliance required. Most common approach. Holding Company Structure: India Parent → Netherlands Holding → Operating Subsidiaries. Tax-efficient profit repatriation. Flexibility for future restructuring. Additional complexity and cost.

Formation Process (Generic): Pre-Formation: Select jurisdiction based on strategic criteria. Engage local corporate service provider. Prepare required documentation. Formation Steps: Reserve company name. Draft articles of association. Notarize documents (if required). File with commercial register. Open bank account. Register for tax and VAT.

Documentation Required: From India Parent: Board resolution authorizing investment. Certificate of Incorporation (apostilled). Passport copies of directors (apostilled). Proof of address for beneficial owners. Local Requirements: Registered office address. Local representative (varies by country). Bank account application documents.

Timeline and Cost Summary: Netherlands: 2-4 weeks, EUR 5,000-10,000 total first year. Ireland: 1-2 weeks, EUR 4,000-8,000 total first year. Germany: 4-8 weeks, EUR 10,000-20,000 total first year. Estonia: 1-2 weeks, EUR 2,000-5,000 total first year.',
        '["Evaluate EU jurisdiction options based on your strategic priorities: tax efficiency, market access, talent, language, and setup complexity", "Engage local corporate service provider in selected jurisdiction - obtain detailed quotation including formation, registered office, and annual compliance", "Prepare documentation required from India parent: board resolution, apostilled documents, and KYC materials for beneficial owners", "Create EU entity formation project plan with timeline, dependencies, and FEMA ODI coordination requirements"]'::jsonb,
        '["EU Jurisdiction Comparison Matrix evaluating Netherlands, Ireland, Germany, and Estonia on 15 criteria", "Entity Formation Checklist by jurisdiction with step-by-step process and documentation requirements", "Corporate Service Provider Directory with vetted providers in key EU jurisdictions", "FEMA-EU Entity Coordination Guide for managing ODI compliance alongside EU formation"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 18: GDPR Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        18,
        'GDPR Compliance',
        'The General Data Protection Regulation (GDPR) is mandatory for any company processing EU personal data. Non-compliance can result in fines up to EUR 20 million or 4% of global revenue. Building GDPR compliance is essential for EU market entry.

GDPR Fundamentals: Scope: Applies to processing of EU residents'' personal data. Applies regardless of where processing occurs. Applies to companies without EU presence selling to EU. Key Principles: Lawfulness, fairness, transparency. Purpose limitation. Data minimization. Accuracy. Storage limitation. Integrity and confidentiality. Accountability.

Legal Bases for Processing: Consent: Must be freely given, specific, informed, unambiguous. Can be withdrawn at any time. Highest standard for marketing communications. Contract: Processing necessary for contract performance. Common basis for SaaS services. Legitimate Interest: Processing necessary for legitimate business purposes. Requires balancing test against individual rights. Legal Obligation: Processing required by law. Relevant for employment, tax, regulatory compliance.

Key GDPR Requirements: Privacy Notice: Clear explanation of data processing. Must include: identity of controller, purposes, legal bases, retention periods, rights, international transfers. Accessible before data collection. Data Subject Rights: Right to access (copy of data within 30 days). Right to rectification (correct inaccurate data). Right to erasure ("right to be forgotten"). Right to data portability. Right to object to processing. Must have processes to handle requests.

Data Processing Agreements: Required with all processors (vendors handling data on your behalf). Standard Contractual Clauses for non-EU processors. Cloud providers (AWS, Google Cloud) have DPAs available. Records of Processing: Document all processing activities. Include purposes, categories of data, recipients, transfers, retention. Maintain as living document.

International Data Transfers (India): India Not Adequate: No EU adequacy decision for India. Additional safeguards required for transfers. Transfer Mechanisms: Standard Contractual Clauses (SCCs): Contract incorporating EU-approved clauses. Most common mechanism for India transfers. New SCCs (2021) must be implemented. Binding Corporate Rules: For intra-group transfers. Complex to implement, suitable for large enterprises. Transfer Impact Assessments: Evaluate destination country data protection. Document supplementary measures if needed.

Data Protection Officer (DPO): When Required: Public authority or body. Core activities involve large-scale systematic monitoring. Core activities involve large-scale processing of special categories. Recommendation: Even if not required, designate privacy lead. Can be internal employee or external service. Contact details must be published and notified to supervisory authority.

Breach Notification: Notify supervisory authority within 72 hours of awareness. Notify affected individuals if high risk. Maintain breach register even for non-notifiable breaches.

Practical Implementation Steps: Phase 1 (Foundation): Data mapping - identify all personal data flows. Update privacy notices and policies. Implement consent mechanisms where required. Phase 2 (Processes): Establish data subject request handling process. Implement DPAs with all processors. Create breach response procedures. Phase 3 (Ongoing): Regular compliance reviews. Staff training. Privacy by design in product development.',
        '["Conduct data mapping exercise identifying all EU personal data processed: categories, sources, purposes, recipients, and international transfers", "Update privacy policy and notices for GDPR compliance - ensure all required information is clearly communicated to EU data subjects", "Implement Standard Contractual Clauses for India data transfers - update contracts with EU customers and internal data flows", "Create data subject rights request handling process with response templates and tracking mechanism for 30-day deadline compliance"]'::jsonb,
        '["GDPR Compliance Checklist with comprehensive requirements mapped to implementation steps", "Privacy Policy Template GDPR-compliant with annotations explaining each required element", "Standard Contractual Clauses Guide explaining new 2021 SCCs and implementation for India transfers", "Data Subject Rights Response Templates and workflow for handling access, deletion, and portability requests"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 19: EU VAT Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        19,
        'EU VAT Management',
        'Value Added Tax (VAT) is a consumption tax applied throughout the EU with rates ranging from 17% to 27%. Proper VAT management is essential for pricing, compliance, and avoiding penalties.

EU VAT Fundamentals: What is VAT: Consumption tax charged on goods and services. Collected by businesses, remitted to tax authorities. End consumer bears the tax burden. Businesses can reclaim VAT paid on inputs. VAT Rates by Country: Standard rates range from 17% (Luxembourg) to 27% (Hungary). Germany: 19%, France: 20%, Netherlands: 21%, Ireland: 23%. Reduced rates apply to certain goods/services. Digital services generally at standard rate.

B2B vs B2C VAT Treatment: B2B Sales (Business to Business): Reverse charge mechanism applies within EU. Customer self-assesses VAT in their country. You invoice without VAT (with valid VAT number). Must verify customer VAT number (VIES database). B2C Sales (Business to Consumer): VAT charged at customer location rate. You must register and remit VAT. OSS (One-Stop-Shop) simplifies multi-country compliance.

One-Stop-Shop (OSS): What It Is: Single VAT registration for all EU B2C sales. File one quarterly return covering all EU countries. Pay all VAT to one tax authority. Eligibility: Available to companies selling to EU consumers from any EU country. Registration: Register in country of EU establishment. Non-EU companies can use IOSS for imported goods. Benefits: Avoid registration in 27 countries. Simplified compliance and reporting. Single point of contact.

VAT Registration Requirements: When Required (Without OSS): Domestic sales in a country. Stock held in a country. Physical presence creating taxable activity. B2C sales exceeding country thresholds (pre-OSS). With OSS: Single registration sufficient for B2C digital services across EU.

SaaS and Digital Services VAT: Place of Supply Rules: B2C: VAT at customer location. B2B: Reverse charge in customer country. Customer Location Evidence: For B2C, must collect two pieces of non-contradictory evidence. IP address, billing address, payment details. Keep records to prove customer location. Digital Services Definition: Website supply, hosting, software, SaaS. Database access, downloads, online content. Electronically supplied services.

Practical VAT Compliance: Invoice Requirements: Supplier and customer details. VAT identification numbers (B2B). Description of goods/services. Amount exclusive and inclusive of VAT. VAT rate and amount. Sequential invoice number.

Record Keeping: Invoices and credit notes. Import/export documentation. Evidence of customer location (B2C). VAT calculations and returns. Retain for 7-10 years (varies by country).

VAT Return Filing: Frequency varies: monthly, quarterly, or annually. OSS returns: quarterly. Deadlines vary by country. Electronic filing generally required.

Common VAT Issues for SaaS Companies: Incorrect B2B/B2C classification. Missing VAT number verification. Wrong place of supply determination. Insufficient customer location evidence. Late registration when thresholds exceeded.

VAT Automation Tools: Avalara: Comprehensive VAT solution for EU. Taxamo: Specialized in digital services VAT. Stripe Tax: Integrated with Stripe payments. Fonoa: API-first VAT compliance. Cost: EUR 200-1,000+ per month depending on volume.',
        '["Determine VAT registration requirements based on your business model: B2B only (reverse charge), B2C (OSS registration), or mixed", "Register for OSS if selling B2C digital services - select registration country and prepare for quarterly filing", "Implement VAT number verification process for B2B customers using VIES database integration", "Update invoicing system for EU VAT compliance including proper formatting, VAT breakdown, and sequential numbering"]'::jsonb,
        '["EU VAT Rate Reference Guide with current rates by country and applicable categories", "B2B vs B2C VAT Decision Tree for determining correct VAT treatment by transaction type", "OSS Registration Guide with step-by-step process and quarterly filing requirements", "EU Invoice Compliance Checklist ensuring all required elements for VAT-valid invoices"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 20: EU Go-to-Market Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        20,
        'EU Go-to-Market Strategy',
        'Building successful EU go-to-market requires adapting strategy for diverse markets while leveraging single-market advantages. Balancing localization investment with efficient scaling is the key challenge.

EU GTM Strategy Options: Pan-European Approach: Single positioning and messaging across EU. English-language marketing and sales. Target multinational companies and English-comfortable buyers. Lower cost, faster to market. Limitation: Miss significant market segment.

Country-Specific Approach: Localized messaging and content per country. Native language sales and support. Deep understanding of local market dynamics. Higher cost, longer timeline. Better penetration in each market.

Hybrid Approach (Recommended): Start with English-language pan-European. Prioritize 2-3 countries for localization. Localize based on traction and opportunity. Progressive investment as market validates.

Country Prioritization Framework: Tier 1 - Primary Markets: UK (if targeting): Largest addressable, English-speaking. Germany: Largest EU market, enterprise focus. Netherlands: International, English-friendly, gateway to EU. Tier 2 - Secondary Markets: France: Large market, requires French. Nordics: High digital adoption, English acceptable. Tier 3 - Emerging: Spain, Italy, Eastern Europe.

Localization Requirements by Country: Germany: Product and marketing in German for SMB. German legal entity builds trust. Local customer references essential. Price sensitivity despite economic strength. France: French language strongly preferred. Local entity and team important. Relationship-driven sales process. Compliance with French regulations (hosting, invoicing). Netherlands/Nordics: English acceptable for most business. International outlook and early adopters. Strong digital transformation focus.

EU Sales Team Structure: Initial Team (Year 1): Remote sales from India for English markets. 1-2 local resources for key markets. Partner channel for broader coverage. Scaled Team (Year 2+): Country managers for Tier 1 markets. Inside sales for SMB segment. Field sales for enterprise. Customer success in local time zones.

EU Partner Strategy: System Integrators: Important for enterprise sales. Examples: Accenture, Capgemini, local SIs. Provide implementation and credibility. Typically 20-30% partner margin. Resellers and VARs: Extend reach to SMB segment. Country-specific networks. Important for countries without direct presence. Technology Partners: Cloud marketplaces (AWS, Azure, GCP). ISV partnerships for ecosystem play. API integrations with popular EU tools.

EU Marketing Channels: Content Marketing: Localized content for key markets. EU-specific case studies and use cases. GDPR-compliant content approach. Paid Acquisition: Google Ads (strong in most markets). LinkedIn (B2B across EU). Local platforms (Xing in Germany). Events: Web Summit (Lisbon), Slush (Helsinki). Country-specific industry events. Partner-hosted events.

Pricing for EU Market: Currency: Price in EUR for EU (local currency for UK). Consider EUR pricing even for UK for simplicity. Pricing Level: Typically 20-30% below US pricing. Higher price sensitivity than US. Localize value proposition for pricing. Regional Considerations: Eastern Europe more price-sensitive. Nordics closer to US willingness to pay. Enterprise deals vary by company not country.

EU Market Launch Playbook: Months 1-3: English-language pan-European presence. Localized pricing and payment options. Partner identification and initial conversations. First customers through direct outreach. Months 4-6: Prioritize countries based on early traction. Begin localization for top 1-2 markets. First local hire or partner in priority market. Months 7-12: Scale in proven markets. Add local teams based on revenue. Expand partner network. Plan Year 2 country expansion.',
        '["Develop EU go-to-market strategy deciding between pan-European vs country-specific approach based on your product, resources, and target segment", "Prioritize EU countries for market entry using traction data, market size, competition, and localization requirements", "Create EU pricing strategy accounting for regional willingness to pay, currency considerations, and competitive positioning", "Build EU partner strategy identifying target system integrators, resellers, and technology partners by market"]'::jsonb,
        '["EU GTM Strategy Framework with decision criteria for pan-European vs localized approaches", "Country Prioritization Scorecard for EU markets with market size, accessibility, and requirements data", "EU Pricing Strategy Guide with regional benchmarks and currency considerations", "EU Partner Identification Template for mapping potential partners by country and partnership type"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Module 4 (EU Market Entry) created successfully';

    -- ========================================
    -- MODULE 5: MENA & Southeast Asia (Days 21-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'MENA & Southeast Asia',
        'Expand to Middle East, North Africa, and Southeast Asia - market dynamics, UAE and Singapore setup, GCC opportunities, ASEAN trade agreements, and building local partnerships in emerging markets.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_5_id;

    -- Day 21: MENA Market Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        21,
        'MENA Market Overview',
        'The Middle East and North Africa (MENA) region offers significant opportunities for Indian startups, driven by government digital transformation initiatives, strong India trade relationships, and high per-capita technology spending.

MENA Market Overview: Regional GDP: $3.5+ trillion combined. GCC countries (Gulf Cooperation Council) represent core market. UAE, Saudi Arabia, Qatar leading digital transformation. Key Sectors: Government/public sector (largest buyer in region). Financial services and fintech. Healthcare digitization. Smart city initiatives. E-commerce growth.

GCC Countries Analysis: UAE: GDP $500 billion, population 10 million. Dubai: Business hub, fintech, tourism tech. Abu Dhabi: Government, energy, healthcare. Highest digital maturity in region. Pro-business regulations, strong IP protection. 9% corporate tax (introduced 2023). Saudi Arabia: GDP $1 trillion, population 35 million. Vision 2030 driving massive digital transformation. Largest market in region by size. Saudization requirements (local hiring mandates). Giga-projects (NEOM, Red Sea) creating opportunities.

Qatar: GDP $220 billion, population 3 million. High per-capita income. Government-driven procurement. World Cup infrastructure now leveraged for tech. Kuwait: GDP $180 billion, population 4.5 million. Oil wealth driving diversification. Government sector dominant buyer. Bahrain: GDP $45 billion, population 1.5 million. Fintech hub with central bank sandbox. Smaller but accessible market. Oman: GDP $110 billion, population 5 million. Growing tech adoption. Government digitization initiatives.

India-MENA Business Corridor: Trade Volume: India-UAE trade exceeds $80 billion annually. India-Saudi trade growing rapidly. Historical Business Ties: Large Indian diaspora (8 million+ in GCC). Established Indian business community. Cultural understanding and trust. CEPA Agreement: India-UAE Comprehensive Economic Partnership Agreement (2022). Preferential tariffs on goods. Services trade facilitation. Investment protection.

MENA Market Characteristics: Decision-Making: Relationship-driven, trust essential. Long sales cycles (6-18 months for government). Influencer and intermediary networks important. In-person presence valued highly. Procurement Patterns: Government is largest buyer in most countries. Tender/RFP processes for public sector. Local presence often required for government contracts. Local partnership may be mandated.

Cultural Considerations: Business Practices: Hospitality and relationship building important. Patience in negotiations valued. Respect for hierarchy and seniority. Business week: Sunday-Thursday in most GCC countries. Ramadan: Reduced business hours during holy month. Plan around religious calendar. Language: Arabic official language. English widely used in business. Localized content builds trust.

Entry Considerations: Market Size vs Complexity: UAE: Accessible, smaller market. Saudi: Larger market, more complex entry. Partner Requirements: Saudi: Local partner may be required for certain sectors. UAE: Free zones allow 100% foreign ownership. Visa and Residency: Relatively easy to obtain business visas. Long-term residency options available.',
        '["Research MENA market opportunity for your specific product - size the addressable market in UAE, Saudi Arabia, and other target GCC countries", "Analyze government digital transformation initiatives and procurement opportunities relevant to your offering in target MENA markets", "Identify 10 potential customers in MENA including government entities, large enterprises, and growth companies", "Evaluate partnership requirements and options - determine if local partner is mandatory or strategic for your target markets"]'::jsonb,
        '["MENA Market Sizing Guide with country-specific data on digital transformation spending and sector opportunities", "GCC Government Procurement Guide covering tender processes, requirements, and key decision-makers by country", "India-MENA Business Corridor Analysis detailing trade agreements, diaspora networks, and entry facilitation", "MENA Cultural Business Guide with protocols, calendar considerations, and relationship-building practices"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: UAE and Dubai Setup
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        22,
        'UAE and Dubai Setup',
        'The UAE offers multiple pathways for company establishment, from free zones with 100% foreign ownership to mainland companies with broader market access. Understanding these options is critical for optimal market entry.

UAE Company Formation Options: Free Zone Company: 100% foreign ownership permitted. Limited to operating within free zone or internationally. Cannot directly sell to UAE mainland customers. Quick setup (1-2 weeks). Lower costs. Best for: Regional HQ, international operations, specific sector focus.

Mainland Company (LLC): Can operate anywhere in UAE. Local service agent required (not ownership). Can sell directly to UAE customers including government. Longer setup (4-8 weeks). Required for government tenders. Best for: UAE market focus, government sales.

Branch Office: Extension of foreign parent company. Can operate in free zone or mainland. Parent company liable for branch obligations. Good for initial market testing. Best for: Exploratory presence, project-based work.

Popular Free Zones for Tech Companies: Dubai Internet City (DIC): Tech and digital focus. Home to Google, Microsoft, LinkedIn regional offices. Excellent ecosystem for tech companies. Investor visa eligibility for shareholders. Dubai Multi Commodities Centre (DMCC): Largest free zone (20,000+ companies). Diverse sectors including tech. Flexi-desk options available. Strong business community.

Abu Dhabi Global Market (ADGM): Financial services and fintech focus. Common law jurisdiction (English law). Strong regulatory framework. Best for fintech companies. Dubai International Financial Centre (DIFC): Financial services hub. Common law, own court system. Premium positioning. Higher costs but strong credibility. RAKEZ (Ras Al Khaimah): Cost-effective option. Flexible packages. Growing tech presence.

Free Zone Setup Process: Step 1: Select appropriate free zone. Step 2: Choose activity license (IT services, consultancy, etc.). Step 3: Submit application with required documents. Step 4: Receive initial approval. Step 5: Sign lease agreement for office/flexi-desk. Step 6: Pay fees and receive license. Step 7: Open corporate bank account. Step 8: Apply for investor/employee visas.

Documentation Required: Parent company documents (apostilled). Passport copies of shareholders and directors. Business plan/activity description. Bank reference letter. NOC from current sponsor (if transferring visa).

Costs and Timeline: Free Zone: Setup: AED 15,000-50,000 ($4,000-14,000). Annual renewal: AED 10,000-30,000. Timeline: 1-2 weeks. Mainland LLC: Setup: AED 30,000-80,000 ($8,000-22,000). Annual renewal: AED 15,000-40,000. Timeline: 4-8 weeks.

Banking in UAE: Account Opening: Banks include Emirates NBD, ADCB, Mashreq, RAK Bank. Corporate account opening increasingly scrutinized. In-person presence often required. Process: 2-8 weeks depending on bank. Documentation: Trade license, shareholder documents, business plan, bank statements.

Visa and Residency: Investor Visa: Available for company shareholders. 2-3 year validity. Enables UAE residence. Employee Visa: Sponsored by company. Work permit required. Medical and Emirates ID process. Golden Visa: 10-year residency for investors, entrepreneurs. Requires minimum investment or business criteria. Attractive for long-term commitment.',
        '["Evaluate UAE setup options (free zone vs mainland) based on your target customer profile - government sales require mainland, international operations suit free zones", "Select appropriate free zone if going that route - compare Dubai Internet City, DMCC, and ADGM on costs, facilities, and ecosystem fit", "Prepare UAE company formation documentation including apostilled parent company documents and business plan", "Research UAE banking options and prepare for account opening process with comprehensive documentation"]'::jsonb,
        '["UAE Company Formation Comparison Matrix evaluating free zone vs mainland options by business type and objectives", "Free Zone Selection Guide comparing top 10 free zones on cost, facilities, visa allocation, and sector focus", "UAE Company Setup Checklist with documentation requirements and step-by-step process by entity type", "UAE Banking Guide covering bank selection, account opening requirements, and timeline expectations"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 23: Southeast Asia Market Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        23,
        'Southeast Asia Market Strategy',
        'Southeast Asia represents a high-growth region with 700 million population, strong digital adoption, and proximity to India. Understanding the diverse markets within ASEAN is essential for successful expansion.

Southeast Asia Market Overview: Regional Demographics: 700 million population across 11 countries. Median age 30 years (young, digital-native). Growing middle class driving consumption. Mobile-first internet adoption. Digital Economy: SEA internet economy projected at $300 billion by 2025. E-commerce, fintech, and digital services leading growth. Government digitization across countries. Strong startup ecosystem (Grab, GoTo, Sea Group).

Key Markets Analysis: Singapore: GDP $400 billion, population 6 million. Highest per-capita income in SEA. Regional HQ for most multinationals. Strong rule of law, IP protection. English-speaking, business-friendly. Limited domestic market but gateway to region. Indonesia: GDP $1.3 trillion, population 275 million. Largest SEA economy and population. Bahasa Indonesia required for mass market. Complex regulations but improving. Huge domestic opportunity. Unicorns: GoTo, Tokopedia, Bukalapak.

Vietnam: GDP $400 billion, population 100 million. Fastest-growing SEA economy. Young, tech-savvy population. Manufacturing and tech hub emerging. Improving business environment. Thailand: GDP $500 billion, population 70 million. Established economy, stable politics improving. Strong tourism and manufacturing. Growing tech adoption. Bangkok as regional hub.

Malaysia: GDP $400 billion, population 33 million. Diverse, multilingual market. Strong Islamic finance sector. Digital transformation initiatives. Good infrastructure. Philippines: GDP $400 billion, population 115 million. English-speaking (advantage for services). BPO industry leader. Young population. Infrastructure challenges but improving.

ASEAN Trade Framework: ASEAN Economic Community: Free movement of goods, services, investment within ASEAN. Harmonizing regulations across members. India-ASEAN FTA benefits for goods trade. Single market of 700 million consumers. Regional Agreements: RCEP (Regional Comprehensive Economic Partnership) including India consideration. Bilateral agreements between countries. Singapore-India CECA (Comprehensive Economic Cooperation Agreement).

Market Entry Approaches: Singapore as Regional Hub: Establish entity in Singapore. Serve SEA markets from central location. Hire regional team in Singapore. Expand to country entities as markets mature. Benefits: Strong legal system, talent pool, connectivity.

Country-Specific Entry: Direct entry into priority countries. Required for regulated industries. Better for large domestic markets (Indonesia). Higher complexity and cost. Hybrid Approach: Singapore holding + priority country subsidiaries. Best of both: regional control with local presence.

SEA Market Characteristics: Price Sensitivity: Generally more price-sensitive than US/EU. Freemium models can work well. Volume-based pricing considerations. Mobile-First: Mobile internet dominant. Apps and mobile-responsive essential. Mobile payment adoption high. Language Diversity: English in Singapore, Philippines. Local languages elsewhere (Bahasa, Thai, Vietnamese). Localization investment required for mass market.

Go-to-Market Considerations: Partnership Importance: Local partners valuable in most markets. Distribution networks vary by country. System integrator ecosystem growing. Government Sector: Digital government initiatives across region. Procurement processes vary by country. Local presence often required.',
        '["Research SEA market opportunity by country - prioritize based on market size, accessibility, language requirements, and competitive landscape", "Evaluate Singapore hub strategy vs direct country entry based on your target customers, product type, and resource constraints", "Identify ASEAN trade agreement benefits applicable to your business - leverage India-ASEAN FTA and Singapore CECA", "Create SEA market entry sequence with prioritized countries and timeline based on market validation and resource availability"]'::jsonb,
        '["SEA Market Analysis by Country with market size, growth rates, and key sector opportunities", "ASEAN Trade Agreement Guide explaining FTA benefits, tariff schedules, and compliance requirements", "Singapore Regional Hub Playbook for serving SEA markets from central Singapore entity", "SEA Localization Requirements Matrix covering language, payment, and regulatory needs by country"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 24: Singapore as Regional Hub
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        24,
        'Singapore as Regional Hub',
        'Singapore is the preferred regional headquarters location for companies entering Asia-Pacific. Understanding Singapore company formation, tax benefits, and operational considerations enables effective regional expansion.

Why Singapore for Regional HQ: Business Environment: Ranked #2 globally for ease of doing business. Strong rule of law and IP protection. Corruption-free, transparent regulations. English as business language. Pro-business government policies. Tax Benefits: Corporate tax rate: 17% (among lowest in developed Asia). No capital gains tax. Extensive DTAA network (including India). Participation exemption for foreign dividends. R&D tax incentives available.

Strategic Location: Central to SEA markets (2-4 hour flights). Gateway to China, India, Australia. Major airline hub (Changi Airport). Strong logistics infrastructure. Talent and Ecosystem: Strong talent pool (local and expat). Major tech companies present. Active startup ecosystem. Financial services hub.

Singapore Company Types: Private Limited Company (Pte Ltd): Most common for foreign companies. Limited liability protection. Can have foreign directors. At least one local resident director required. Minimum paid-up capital: S$1 (typically S$10,000+). Best for: Operating companies, regional HQ.

Branch Office: Extension of foreign parent. Can conduct all business of parent. Not separate legal entity (parent liable). Best for: Representative activities, testing market.

Subsidiary: Pte Ltd owned by foreign parent. Separate legal entity. Best for: Full operations, liability separation.

Formation Process: Step 1: Reserve company name with ACRA (Accounting and Corporate Regulatory Authority). Step 2: Prepare incorporation documents (Constitution, director consents). Step 3: File with ACRA (same-day incorporation possible). Step 4: Appoint company secretary within 6 months. Step 5: Open corporate bank account. Step 6: Register for GST if applicable.

Local Director Requirement: At least one director must be Singapore resident. Options: Hire local employee as director. Engage nominee director service (S$3,000-8,000/year). Founder relocates to Singapore (Employment Pass). Nominee Considerations: Nominee has legal obligations. Select reputable provider. Plan for transition to local hire.

Banking in Singapore: Major Banks: DBS, OCBC, UOB (local banks). Standard Chartered, HSBC, Citibank (international). Account Opening: Corporate documents. Business plan and projections. Director/shareholder identification. Source of funds documentation. Timeline: 2-4 weeks typically. Note: Banks selective - technology companies generally well-received.

Employment Pass (Work Visa): Eligibility: For foreign professionals working in Singapore. Minimum salary: S$5,000/month (higher for older applicants and financial sector). Criteria: Educational qualifications, professional experience, salary. Process: Online application to MOM. Processing: 3-8 weeks. Validity: Up to 2 years initially, renewable. Entrepreneur Pass: For entrepreneurs starting businesses. Requires business plan review. Funding or incubator support helpful.

Tax Considerations: Corporate Tax: 17% headline rate. Partial exemption: 75% exemption on first S$10,000, 50% on next S$190,000. Effective rate much lower for profits under S$200,000. GST (VAT): 8% (increasing to 9% in 2024). Registration required if turnover exceeds S$1 million. Can register voluntarily. India-Singapore DTAA: Favorable withholding rates. Dividend: 0% (under certain conditions). Interest: 15%. Royalty: 10%. Capital gains: No tax in Singapore, may be taxable in India.',
        '["Evaluate Singapore as regional hub considering tax benefits, talent availability, and strategic location for your target markets", "Prepare Singapore company incorporation with appropriate structure (subsidiary vs branch) and local director arrangement", "Research Employment Pass requirements and plan founder/key employee relocation if Singapore presence is strategic", "Model Singapore tax implications including corporate tax, GST, and India-Singapore DTAA benefits for your planned structure"]'::jsonb,
        '["Singapore Company Formation Guide with step-by-step process, costs, and timeline for foreign companies", "Singapore Tax Planning Overview covering corporate tax, GST, and DTAA benefits for Indian parent companies", "Employment Pass Application Guide with eligibility criteria, documentation requirements, and success factors", "Singapore Banking Comparison Matrix for corporate account features, fees, and opening requirements by bank"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 25: Building Local Partnerships
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        25,
        'Building Local Partnerships',
        'Local partnerships are often essential for success in MENA and Southeast Asia markets. Understanding partnership structures, partner selection, and relationship management is critical for effective market entry.

Why Local Partnerships Matter: Market Access: Access to customer relationships and networks. Understanding of local buying behavior. Navigate regulatory complexity. Credibility with local customers. Operational Efficiency: Local fulfillment and support. Cultural and language capabilities. Time zone coverage. Reduced direct investment requirement. Requirements: Some markets mandate local partners (Saudi for certain sectors). Government contracts often require local entity/partner. Distribution licenses may require local participation.

Partnership Types: Distribution Partners: Resell your product to end customers. Handle local sales and sometimes support. Margin: typically 20-40% discount from list price. Best for: Product companies needing local reach. System Integrators: Implement and customize your solution. Provide services around your product. May resell or refer deals. Best for: Enterprise software requiring implementation. Strategic Partners: Joint venture or equity partnership. Shared investment and risk. Deeper commitment and alignment. Best for: Major market commitment, regulatory requirements.

Referral Partners: Introduce opportunities for commission. Lower commitment, transactional. Commission: typically 10-20% of first-year revenue. Best for: Testing partnership value, building relationships. Technology Partners: Integrate products for joint value proposition. Go-to-market collaboration. No direct commercial relationship (usually). Best for: Ecosystem building, market positioning.

Partner Selection Criteria: Capability Assessment: Market coverage and customer relationships. Technical capabilities (for implementation partners). Sales team quality and reach. Support infrastructure. Financial Stability: Years in business. Revenue and profitability. Customer references. Strategic Fit: Alignment with your target market. Non-competing product portfolio. Growth orientation. Cultural fit: Values and business practices. Commitment Level: Willingness to invest in partnership. Dedicated resources assigned. Training and certification commitment.

Partnership Structure Best Practices: Clear Agreement Terms: Territory definition (exclusive vs non-exclusive). Product scope (which products/services). Pricing and margins. Performance expectations and minimums. Term and termination provisions. IP and confidentiality protections.

Exclusivity Considerations: Exclusive partnerships: Higher partner commitment but limited reach. Non-exclusive: Broader coverage but less partner investment. Consider tiered exclusivity based on performance. Market-specific: Exclusive in certain territories or segments.

Partner Enablement: Training: Product training for sales and technical teams. Certification programs for quality assurance. Regular updates on product and positioning. Sales Tools: Localized marketing materials. Demo environments and trial accounts. Case studies and references. Support: Partner portal for resources and communication. Deal registration and protection. Technical support escalation paths. Joint marketing: Co-branded campaigns. Event participation. Lead sharing programs.

Partner Management: Onboarding: Structured onboarding program (30-60-90 day plan). Executive sponsorship from both sides. Clear metrics and milestones. Ongoing Management: Regular business reviews (quarterly minimum). Pipeline and forecast reviews. Training and enablement updates. Relationship development at multiple levels.

Performance Management: KPIs: Revenue, pipeline, certifications, customer satisfaction. Tiering: Different benefit levels based on performance. Consequences: Address underperformance, exit provisions.

MENA Partnership Considerations: Relationship Orientation: Personal relationships matter more than contracts. Invest time in relationship building. Patience in partnership development. Sponsor/Agent Requirements: Some sectors require local sponsor/agent. Understand legal requirements before commitment. Local Presence: Partners expect your presence and commitment. Regular visits and engagement important.

SEA Partnership Considerations: Country-Specific: Each country has different partner landscape. Singapore partners may cover region or just Singapore. Local partners needed for local language markets. Emerging Ecosystems: Partner ecosystems still developing in some markets. Opportunity to build with growing partners. Consider partner capability building investments.',
        '["Define partnership strategy by market - determine where partners are essential vs optional based on regulatory requirements and market access needs", "Create partner profile and selection criteria specific to your product and target markets in MENA and SEA", "Identify and evaluate 5-10 potential partners in priority markets using defined selection criteria and capability assessment", "Develop partner agreement framework covering commercial terms, exclusivity, performance expectations, and enablement commitments"]'::jsonb,
        '["Partner Selection Scorecard with weighted criteria for evaluating potential partners across capability, fit, and commitment", "Partnership Agreement Template covering key commercial and legal terms for distribution and implementation partnerships", "Partner Enablement Program Framework with training, tools, and support structure for effective partner management", "MENA and SEA Partner Directory with categorized potential partners by country, type, and sector focus"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Transfer Pricing (Days 26-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Transfer Pricing',
        'Master transfer pricing for multi-entity structures - arm''s length pricing principles, transfer pricing methods, documentation requirements, intercompany agreements, and managing TP audits across jurisdictions.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_6_id;

    -- Day 26: Transfer Pricing Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        26,
        'Transfer Pricing Fundamentals',
        'Transfer pricing governs how multinational enterprises price transactions between related parties across borders. For Indian startups with overseas subsidiaries, transfer pricing compliance is essential to avoid penalties and double taxation.

What is Transfer Pricing: Definition: Pricing of transactions between related parties (associated enterprises). Scope: Sale of goods, provision of services, use of intangibles, financial transactions. Purpose: Ensure fair allocation of taxable profits across jurisdictions. Requirement: Transactions must be at arm''s length (as if between unrelated parties).

Why Transfer Pricing Matters: Tax Authority Scrutiny: Tax authorities globally scrutinize intercompany transactions. Profit shifting concerns drive aggressive enforcement. India, US, EU have extensive TP regulations. Penalties for non-compliance can be severe. Double Taxation Risk: Incorrect pricing can be taxed twice (once in each jurisdiction). Proper documentation and pricing prevents disputes. Mutual Agreement Procedure (MAP) for resolution can be lengthy.

Arm''s Length Principle: Core Concept: Price transactions as if parties were independent. Benchmark against comparable transactions between unrelated parties. Consider all relevant facts and circumstances. OECD Guidelines: International standard for transfer pricing. India largely follows OECD guidelines. OECD Transfer Pricing Guidelines (2022 update) is key reference.

Common Intercompany Transactions for Startups: Service Fees: Software development services from India to overseas subsidiary. Management services from parent to subsidiary. Technical support and maintenance. Typical structure: Cost plus mark-up (15-25% commonly). Product/License Fees: SaaS license fees between entities. Resale of products across borders. White-label or OEM arrangements.

Royalties: License of IP from one entity to another. Brand licensing fees. Technology licensing royalties. Cost Sharing Arrangements: Joint development of IP. Shared R&D costs. Common platform development. Financial Transactions: Intercompany loans from parent to subsidiary. Guarantees provided by parent for subsidiary borrowing.

Indian Transfer Pricing Framework: Applicable Law: Section 92 to 92F of Income Tax Act. Transfer Pricing Rules, 2001. Annual TP documentation requirements. Key Provisions: Applies to international transactions with associated enterprises. Arm''s length price must be determined using prescribed methods. Documentation and certification required annually. Associated Enterprise Definition: Direct/indirect holding of 26% or more voting power. Same persons holding 26% or more in both enterprises. Common management or control. Penalties: 2% of transaction value for failure to maintain documentation. 100-300% of tax on adjustment for incorrect pricing.

International Coordination: BEPS (Base Erosion and Profit Shifting): OECD/G20 initiative to address profit shifting. Country-by-Country Reporting requirements. Three-tier documentation (Master File, Local File, CbCR). India has adopted BEPS recommendations. Global Minimum Tax: Pillar Two (15% minimum tax) being implemented. May affect structuring decisions. Monitor developments for impact on your structure.',
        '["Map all intercompany transactions between India parent and overseas entities - classify by type (services, IP, financial) and estimate annual values", "Study Indian transfer pricing regulations (Section 92) and understand documentation and reporting requirements applicable to your transactions", "Review arm''s length principle and begin identifying comparable transactions or data sources for benchmarking your intercompany prices", "Assess transfer pricing risk level based on transaction values, transaction types, and jurisdictions involved"]'::jsonb,
        '["Transfer Pricing Fundamentals Guide explaining arm''s length principle and key concepts for startups with international operations", "Intercompany Transaction Mapping Template for documenting and categorizing all transactions between related entities", "Indian Transfer Pricing Regulations Summary covering Sections 92-92F with practical interpretation", "Transfer Pricing Risk Assessment Framework for evaluating exposure and prioritizing compliance focus"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 27: Transfer Pricing Methods
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        27,
        'Transfer Pricing Methods',
        'Transfer pricing methods determine how arm''s length prices are calculated. Selecting the most appropriate method for each transaction type is critical for defensible pricing and compliance.

Traditional Transaction Methods: Comparable Uncontrolled Price (CUP) Method: Most direct method - compares price with comparable uncontrolled transactions. Internal CUP: Same product/service sold to unrelated party. External CUP: Comparable transactions between unrelated parties in market. When Applicable: Identical or highly comparable products/services available. Reliable comparable data accessible. Minimal adjustments needed for comparability. Example: If your India entity provides software development to US subsidiary and also to unrelated US clients at $50/hour, the $50/hour is CUP benchmark.

Resale Price Method (RPM): Starts with resale price to unrelated customer. Deducts appropriate gross margin. Residual is arm''s length price for intercompany purchase. When Applicable: Distributor/reseller arrangements. Limited value-added by reseller. Comparable reseller margins available. Example: US subsidiary sells SaaS to end customers at $100. Comparable resellers earn 30% margin. Arm''s length intercompany price = $100 × (1 - 30%) = $70.

Cost Plus Method: Starts with costs incurred by supplier. Adds appropriate mark-up to costs. When Applicable: Services between related parties. Contract manufacturing. Back-office support services. Example: India entity provides software development at cost of $40/hour. Comparable services earn 20% mark-up. Arm''s length price = $40 × (1 + 20%) = $48/hour.

Transactional Profit Methods: Transactional Net Margin Method (TNMM): Most commonly used method globally. Examines net profit margin relative to appropriate base (costs, sales, assets). Compares with margins of comparable companies. When Applicable: One party performs routine functions. Comparable company data available (databases like CapIQ, Orbis). Most flexible and commonly applied method. Example: India entity provides IT services. Comparable IT service providers earn 10-15% operating margin on costs. India entity should earn margin within this range.

Profit Split Method: Divides combined profits based on relative contributions. Contribution analysis or residual profit split. When Applicable: Both parties contribute unique intangibles. Highly integrated operations. No comparables for separate transactions. Example: India does R&D, US does sales and marketing. Combined profit split based on relative value contributions.

Method Selection for Common Startup Transactions: Software Development Services (India to US): Recommended Method: TNMM or Cost Plus. Benchmark: Operating margin on costs for IT service companies. Typical Range: 15-25% mark-up on total costs (operating cost plus).

Management Services: Recommended Method: Cost Plus or TNMM. Benchmark: Comparable management service providers. Typical Range: 5-10% mark-up on costs.

SaaS License/Resale: Recommended Method: RPM or TNMM. Benchmark: Software reseller margins or distributor returns. Typical Range: 15-30% gross margin for limited-risk distributor.

IP Licensing (Royalties): Recommended Method: CUP (if comparable licenses exist) or TNMM. Benchmark: Comparable license agreements, profit split analysis. Typical Range: Highly variable based on IP value and contribution.

Intercompany Loans: Recommended Method: CUP (comparable interest rates). Benchmark: Market interest rates for similar credit risk and terms. Considerations: Currency, tenor, credit rating, security.

Benchmarking Studies: What is Benchmarking: Analysis of comparable company data to establish arm''s length range. Used primarily with TNMM and profit methods. Data Sources: Commercial databases (Bureau van Dijk Orbis, S&P Capital IQ). Public company filings. Industry surveys and studies.

Benchmarking Process: Define tested party (usually the simpler entity). Identify comparable companies (similar functions, risks, assets). Apply quantitative screens (size, financial data availability). Calculate profit level indicators (PLI). Establish arm''s length range (typically interquartile range). Annual Update: Benchmarking studies should be updated periodically (annually or every 2-3 years). Use same methodology for consistency.',
        '["Select most appropriate transfer pricing method for each intercompany transaction type based on transaction characteristics and data availability", "Conduct preliminary benchmarking analysis for your primary intercompany transaction using available comparable data", "Document method selection rationale explaining why chosen method is most appropriate under OECD guidelines and Indian rules", "Identify data sources needed for full benchmarking study - evaluate commercial databases vs public data vs internal comparables"]'::jsonb,
        '["Transfer Pricing Method Selection Guide with decision tree for choosing appropriate method by transaction type", "Benchmarking Study Template with step-by-step process for conducting TNMM analysis", "Comparable Company Search Criteria for identifying appropriate benchmarks for IT services, software, and management functions", "Transfer Pricing Method Application Examples for common startup intercompany transactions"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 28: TP Documentation Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        28,
        'Transfer Pricing Documentation',
        'Transfer pricing documentation is mandatory in most jurisdictions and provides defense against tax authority challenges. Understanding documentation requirements and maintaining contemporaneous records is essential for compliance.

Indian TP Documentation Requirements: Mandatory Documentation: Required for international transactions with associated enterprises. Must be maintained and furnished on request. Contemporaneous documentation (prepared before filing deadline). Documentation Components (Rule 10D): Enterprise overview (ownership, business description). Industry analysis. Functional analysis (functions, assets, risks). Transaction details and terms. Method selection analysis with reasons. Comparability analysis and adjustments. Arm''s length price determination. Accountant''s Report: Form 3CEB required for companies with international transactions. Certified by Chartered Accountant. Due date: November 30 following financial year end. Report confirms transactions and certifies arm''s length compliance.

OECD Three-Tier Documentation: Master File: Group-wide information about MNE. Organizational structure, business overview. Intangibles, intercompany financial activities. Consolidated financial position. Filed in parent jurisdiction, available to all.

Local File: Country-specific detailed information. Local entity transactions and analysis. Functional and comparability analysis. Method selection and application. Maintained in each country with TP regulations.

Country-by-Country Report (CbCR): Revenue, profit, tax, employees by country. Filed by ultimate parent if group revenue exceeds threshold. India threshold: INR 5,500 crore consolidated revenue. Exchanged automatically between tax authorities.

Documentation Best Practices: Contemporaneous Preparation: Prepare documentation during year, not after. Update for significant changes in business or transactions. Have documentation ready before filing deadlines. Consistency Across Jurisdictions: Align documentation globally where possible. Ensure positions in different countries are consistent. Coordinate between India and foreign entity documentation.

Functional Analysis: Detailed description of functions performed by each party. Assets used and risks assumed. Changes in functional profile documented. Economic Analysis: Clear method selection rationale. Robust comparable search and selection. Proper adjustments for differences. Interquartile range application documented.

Documentation Timeline: Indian Compliance Calendar: March 31: Financial year end. September 30: Tax return filing (typical). November 30: Form 3CEB (TP Report) due date. Documentation should be substantially complete by tax return filing. Ongoing: Maintain supporting documents throughout year.

US Documentation (If US Subsidiary): Form 5472: Required for reportable transactions with foreign related party. Filed with Form 1120. Penalties for non-filing: $25,000 per form. Documentation: Similar principles, maintain records to support pricing.

EU Documentation: Country-specific requirements (most EU countries require documentation). Master File and Local File under BEPS common. Thresholds and penalties vary by country.

Documentation Package Contents: Executive Summary: Transaction overview and conclusions. Corporate Structure: Organizational chart, entity descriptions. Industry Analysis: Market conditions, competitive factors. Functional Analysis: Functions, assets, risks by entity. Transaction Analysis: Description of each transaction type. Economic Analysis: Method selection, comparables, calculations. Financial Statements: Related party transactions highlighted. Intercompany Agreements: Copies of relevant agreements. Appendices: Comparable search details, financial data.',
        '["Create transfer pricing documentation package covering all intercompany transactions with Indian entity - follow Rule 10D requirements", "Prepare functional analysis documenting functions performed, assets used, and risks assumed by each entity in intercompany transactions", "Establish documentation preparation timeline aligned with Indian tax filing calendar and Form 3CEB deadline", "Implement document retention system for supporting records including contracts, invoices, and correspondence for at least 8 years"]'::jsonb,
        '["Indian TP Documentation Checklist covering all Rule 10D requirements with section-by-section guidance", "Functional Analysis Template for documenting entity characterization in intercompany transactions", "Form 3CEB Preparation Guide with field-by-field instructions and common filing issues to avoid", "TP Documentation Package Template with sample structure and content for comprehensive documentation"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 29: Intercompany Agreements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        29,
        'Intercompany Agreements',
        'Intercompany agreements formalize the terms of transactions between related parties and are essential evidence for transfer pricing compliance. Properly drafted agreements support arm''s length pricing and reduce audit risk.

Importance of Intercompany Agreements: Legal Documentation: Establishes legally binding terms between related parties. Demonstrates commercial substance of transactions. Creates contemporaneous record of arrangement. TP Support: Aligns with transfer pricing documentation. Supports arm''s length characterization. Provides basis for pricing methodology. Audit Defense: First document requested in TP audits. Missing or inadequate agreements raise red flags. Well-drafted agreements reduce adjustment risk.

Key Agreement Types for Startups: Software Development Services Agreement: Service Provider: India entity. Service Recipient: US or other foreign subsidiary. Scope: Software development, maintenance, support services. Pricing: Cost plus mark-up (typically 15-25% on total costs). Terms: Service descriptions, quality standards, deliverables. Duration: Annual, renewable. Key Clauses: Service descriptions and SLAs, cost definitions and allocation, pricing mechanism and invoicing, IP ownership provisions, confidentiality, termination.

Management Services Agreement: Service Provider: Parent company (India or foreign). Service Recipient: Subsidiaries. Scope: Strategic planning, finance, HR, legal, IT support. Pricing: Cost allocation or cost plus mark-up. Key Clauses: Services catalog, cost allocation methodology, pricing and payment terms.

IP License Agreement: Licensor: IP owner entity. Licensee: Entity using IP. Scope: Software, technology, trademarks, know-how. Pricing: Royalty rate (percentage of revenue or fixed fee). Key Clauses: IP description and scope of license, exclusivity and territory, royalty rate and calculation, payment terms, sublicensing rights, termination and IP return.

Intercompany Loan Agreement: Lender: Parent or treasury entity. Borrower: Subsidiary needing funding. Terms: Principal, interest rate, repayment schedule. Key Clauses: Loan amount and purpose, interest rate (arm''s length rate), repayment terms, security (if any), default provisions.

Cost Sharing/Cost Contribution Arrangement: For joint development of intangibles. Participants share costs based on anticipated benefits. Complex arrangement requiring detailed documentation.

Essential Agreement Elements: Parties and Effective Date: Clear identification of contracting parties. Commencement date and term. Recitals: Background and context for transaction. Business purpose and rationale. Scope of Services/Transaction: Detailed description of what is provided. Specifications, deliverables, exclusions. Pricing Mechanism: Clear pricing methodology. Formula or rate schedule. Adjustment provisions for changes in scope/costs. Payment Terms: Invoice frequency and timing. Currency and payment method. Late payment provisions.

Rights and Obligations: Obligations of each party. Service levels or quality standards. Cooperation requirements. Intellectual Property: Ownership of developed IP. License grants and limitations. Background IP treatment. Confidentiality: Protection of confidential information. Duration of obligations. Term and Termination: Agreement duration. Renewal provisions. Termination rights and notice periods. Post-termination obligations.

Agreement Maintenance: Annual Review: Review agreements annually for relevance. Update for changes in business operations. Ensure pricing remains at arm''s length. Amendment Process: Document all changes in writing. Amendment or new agreement for material changes. Maintain amendment history. Consistency Check: Ensure agreement terms match actual conduct. Invoice terms should align with agreement. Document deviations and rationale.',
        '["Draft or update intercompany service agreement between India entity and foreign subsidiary covering software development and support services", "Create intercompany agreement checklist ensuring all required elements are included: pricing mechanism, scope, IP provisions, and termination rights", "Review existing intercompany agreements for consistency with actual business conduct and transfer pricing documentation", "Establish agreement management process with annual review, amendment procedures, and compliance verification"]'::jsonb,
        '["Intercompany Service Agreement Template with software development focus and arm''s length pricing provisions", "IP License Agreement Template covering technology and software licensing between related parties", "Intercompany Loan Agreement Template with market interest rate benchmarking provisions", "Agreement Review Checklist for annual compliance verification and update requirements"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 30: TP Audit Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        30,
        'Transfer Pricing Audit Management',
        'Transfer pricing audits are increasingly common as tax authorities worldwide focus on profit allocation. Understanding audit processes, preparation strategies, and dispute resolution mechanisms is essential for managing TP risk.

TP Audit Landscape: India: High audit activity, aggressive positions by tax authorities. TPO (Transfer Pricing Officer) conducts specialized audits. Reference to TPO mandatory for international transactions above threshold. Focus areas: IT services, royalties, management fees. US: IRS examination through Large Business and International division. Advance Pricing Agreements available. Transfer pricing is high priority. EU: Country-specific audit approaches. Increasing coordination between countries. Joint audits emerging.

Audit Triggers and Selection: High-Risk Indicators: Large intercompany transaction volumes. Significant losses or low profitability. Inconsistent margins year-over-year. Related party payments to low-tax jurisdictions. Missing or inadequate documentation. Industry Focus: IT and software services (frequent audits in India). Financial services. Pharmaceutical and IP-heavy industries. Manufacturing with related-party transactions.

Audit Preparation: Proactive Measures: Maintain contemporaneous documentation. Update benchmarking studies regularly. Ensure agreements match actual conduct. Consistent positions across jurisdictions. Audit Readiness Checklist: Documentation complete and accessible. Intercompany agreements in place. Functional analysis current. Benchmarking study defensible. Response team identified.

Indian TP Audit Process: Reference to TPO: AO (Assessing Officer) refers case to TPO. Occurs during assessment proceedings. TPO has specialized expertise. Information Requests: Questionnaire on transactions and documentation. Requests for supporting documents, contracts, invoices. May include show cause notice for positions.

TPO Order: TPO issues order determining arm''s length price. If adjustment proposed, details reasons and computation. Time limit: Generally before December 31 of assessment year. Appeal Rights: DRP (Dispute Resolution Panel) or CIT(A). ITAT (Income Tax Appellate Tribunal). High Court and Supreme Court.

Managing Audit Process: Initial Response: Respond timely and completely to information requests. Engage experienced TP advisor early. Understand specific concerns of tax authority. Substantive Defense: Emphasize documentation quality. Explain business rationale for transactions. Provide comparable analysis supporting pricing. Address specific technical issues raised.

Settlement Strategies: Negotiation: Discuss with TPO/tax authority to resolve. Provide additional evidence or analysis. Narrow issues before formal determination. Mutual Agreement Procedure (MAP): Available under tax treaties. Competent authorities negotiate resolution. Prevents double taxation. Can take 2-3+ years to resolve. Advance Pricing Agreement (APA): Prospective agreement on TP methodology. Provides certainty for future years. Available in India (unilateral, bilateral, multilateral). Process takes 12-36 months. Recommended for significant ongoing transactions.

Dispute Resolution: APA Benefits: Certainty on methodology for 5+ years. Potential rollback to open years. Reduced audit burden. Demonstrates compliance commitment. APA Process in India: Pre-filing consultation (optional but recommended). Formal application with proposed methodology. CBDT review and negotiation. Agreement execution. Annual compliance reports.

Post-Audit Actions: Comply with Order: Pay assessed taxes (can pay under protest). Maintain records for ongoing disputes. Learn and Improve: Address documentation gaps identified. Update agreements and processes. Consider APA for ongoing protection. Multi-Year Consistency: Maintain consistent positions. Document rationale for any changes. Anticipate future audit cycles.',
        '["Conduct transfer pricing audit readiness assessment identifying documentation gaps, agreement issues, and risk areas requiring remediation", "Develop TP audit response protocol with team responsibilities, timeline management, and communication procedures", "Evaluate Advance Pricing Agreement (APA) opportunity for significant ongoing intercompany transactions to achieve certainty", "Create audit defense file with key documents, analysis, and talking points for potential TP examination"]'::jsonb,
        '["Transfer Pricing Audit Readiness Checklist for self-assessment of documentation and compliance status", "TP Audit Response Playbook with step-by-step process for managing tax authority inquiries", "Indian APA Application Guide covering eligibility, process, timeline, and documentation requirements", "TP Dispute Resolution Options Matrix comparing appeal, MAP, APA, and settlement approaches"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 5-6 (MENA SEA and Transfer Pricing) created successfully';

    -- ========================================
    -- MODULE 7: International Entity Structure (Days 31-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'International Entity Structure',
        'Design optimal international corporate structure - holding company jurisdictions, substance requirements, CFC and POEM rules, treaty benefits, and structuring for tax efficiency while maintaining compliance.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 31: Structure Design Principles
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        31,
        'Structure Design Principles',
        'International corporate structure significantly impacts tax efficiency, operational flexibility, and compliance burden. Understanding design principles helps create structures that support business objectives while managing risk.

Structure Design Objectives: Tax Efficiency: Minimize overall tax burden legally. Avoid double taxation through treaty planning. Optimize withholding taxes on cross-border payments. Utilize available incentives and exemptions. Operational Flexibility: Support business operations across markets. Enable efficient cash management. Facilitate future restructuring or exits. Align with business decision-making.

Compliance Manageability: Minimize filing and reporting burden. Avoid unnecessarily complex structures. Meet substance requirements in each jurisdiction. Legal and Risk Management: Limit liability appropriately. Protect intellectual property. Manage regulatory requirements. Support financing objectives.

Common International Structures for Indian Startups: Structure 1 - Simple Subsidiary: India Parent → Foreign Operating Subsidiary. Pros: Simple, clear ownership, easy to manage. Cons: May not optimize tax on repatriation. Best for: Single-market expansion, early-stage companies.

Structure 2 - Regional Holding: India Parent → Holding Company (Singapore/Netherlands) → Operating Subsidiaries. Pros: Tax-efficient profit repatriation, regional management hub. Cons: Additional entity, substance requirements. Best for: Multi-market expansion, significant overseas operations.

Structure 3 - IP Holding: India Parent → IP Holding (Ireland/Netherlands) → Operating Subsidiaries. Pros: Tax-efficient royalty flows, IP protection. Cons: Complex, significant substance requirements, scrutiny. Best for: IP-centric businesses, mature operations.

Structure 4 - US Flip: US Parent (Delaware) → India Subsidiary. Pros: Preferred by US VCs, access to US capital markets. Cons: Complex flip process, India tax implications on transfer. Best for: US-focused companies, significant US fundraising planned.

Key Structuring Considerations: Holding Company Jurisdiction Selection: Tax factors: Corporate rate, dividend exemption, capital gains treatment, treaty network. Non-tax factors: Legal system, stability, reputation, banking access. Popular choices: Singapore (Asia focus), Netherlands (EU focus), Ireland (EU + IP). Substance Requirements: OECD/BEPS requires real substance for treaty benefits. Minimum requirements: Local directors, decision-making, employees. Avoid "brass plate" entities with no real operations.

Treaty Network: India has 90+ Double Tax Avoidance Agreements. Treaty benefits require substance and beneficial ownership. Important treaties: US, UK, Singapore, Netherlands, UAE.

Anti-Avoidance Rules: CFC Rules (Controlled Foreign Corporation): India taxes passive income of foreign subsidiaries in certain cases. POEM (Place of Effective Management): Foreign company with POEM in India may be taxed as Indian resident. GAAR (General Anti-Avoidance Rules): Can deny benefits if arrangement lacks commercial substance.

Structure Planning Process: Step 1: Define business objectives and operational requirements. Step 2: Map planned markets and entity needs. Step 3: Evaluate holding company jurisdictions. Step 4: Model tax implications of alternatives. Step 5: Assess substance requirements and costs. Step 6: Consider anti-avoidance rule implications. Step 7: Plan for future flexibility (M&A, IPO, restructuring). Step 8: Implement with proper documentation.

When to Restructure: Early Stage: Keep it simple - direct subsidiaries. Growth Stage: Consider holding structure as operations scale. Maturity: Optimize structure for tax efficiency and exits. Key Trigger: When tax leakage or complexity justifies restructuring costs.

Common Structuring Mistakes: Over-engineering: Creating complex structures for small operations. Lack of Substance: Entities without real operations or decision-making. Ignoring Anti-Avoidance: Structures caught by CFC, POEM, or GAAR rules. Tax-Only Focus: Ignoring operational and compliance implications. Static Planning: Not adapting structure as business evolves.',
        '["Define international structure objectives prioritizing tax efficiency, operational needs, compliance burden, and flexibility for your specific business", "Map current and planned entities identifying gaps and inefficiencies in existing structure", "Evaluate holding company jurisdiction options comparing Singapore, Netherlands, Ireland, and UAE based on your operational footprint and objectives", "Model tax implications of 2-3 alternative structures including withholding taxes, repatriation, and effective tax rates"]'::jsonb,
        '["International Structure Design Framework with decision criteria and common structure templates for Indian startups", "Holding Company Jurisdiction Comparison covering Singapore, Netherlands, Ireland, UAE on tax and operational factors", "Structure Tax Modeling Template for comparing effective tax rates across alternative configurations", "Anti-Avoidance Rules Summary covering CFC, POEM, and GAAR implications for international structures"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 32: Holding Company Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        32,
        'Holding Company Structures',
        'Holding companies serve as intermediate entities owning operating subsidiaries and managing regional operations. Understanding holding company benefits, jurisdiction selection, and implementation is critical for multi-entity structures.

Why Use Holding Companies: Tax Efficiency: Participation exemption for dividends and capital gains. Reduced withholding taxes through treaty network. Tax-efficient profit pooling and repatriation. Regional Management: Centralize regional decision-making. Efficient cash management within region. Administrative consolidation.

Liability Isolation: Separate operating risks from parent. Ring-fence regional operations. Protect IP and other valuable assets. Exit Flexibility: Facilitate sale of regional operations. IPO optionality in different markets. M&A structuring flexibility.

Popular Holding Jurisdictions for Indian Companies: Singapore: Corporate Tax: 17% (partial exemption available). Participation Exemption: Exempt for qualifying dividends and capital gains from foreign subsidiaries. Treaty Network: 80+ treaties including India. India-Singapore DTAA: Favorable rates - 15% dividend WHT, 15% interest, 10% royalty. Substance Requirements: Manageable - local directors, registered office, can outsource operations. Advantages: Asia focus, strong legal system, English-speaking, time zone proximity to India. Setup Cost: S$5,000-15,000 initial, S$3,000-8,000 annual.

Netherlands: Corporate Tax: 25.8% (15% on first EUR 200,000). Participation Exemption: Full exemption for qualifying shareholdings (5%+ ownership, subject tests). Treaty Network: 90+ treaties including India. Substance Requirements: Moderate - local board, employees, office address. Advantages: EU access, extensive treaty network, favorable IP regime (Innovation Box). India-Netherlands DTAA: 10% dividend WHT, 10% interest, 10% royalty. Setup Cost: EUR 5,000-15,000 initial, EUR 5,000-12,000 annual.

Ireland: Corporate Tax: 12.5% (trading income), 25% (passive). Participation Exemption: Limited - requires EU or treaty country subsidiary. Treaty Network: 70+ treaties including India. Substance Requirements: Significant for IP structures. Advantages: EU access, IP regime, English-speaking, US company familiarity. India-Ireland DTAA: 10% dividend WHT, 10% interest, 10% royalty. Setup Cost: EUR 3,000-10,000 initial, EUR 3,000-8,000 annual.

UAE: Corporate Tax: 9% (introduced 2023, 0% on first AED 375,000). Participation Exemption: Generally exempt under new regime. Treaty Network: Growing - 100+ treaties including India. Substance Requirements: Economic substance regulations apply. Advantages: Low tax, regional hub, large Indian community, no personal income tax. India-UAE DTAA: 10% dividend WHT, 12.5% interest, 10% royalty. Setup Cost: AED 15,000-50,000 initial, AED 10,000-30,000 annual.

Holding Company Implementation: Formation Steps: Select jurisdiction based on criteria. Incorporate holding entity. Establish substance (directors, bank accounts, registered office). Implement intercompany agreements. Restructure existing subsidiaries under holding (if applicable).

Transfer of Subsidiaries to Holding: May involve transfer of shares from India parent to new holding. FEMA ODI implications - may require approval. Tax implications in India on transfer (capital gains). Consider phased implementation. Ongoing Substance: Board meetings in jurisdiction (quarterly minimum). Local directors with decision-making authority. Employees or outsourced functions in jurisdiction. Proper documentation of activities.

Holding Company Costs: Setup: $10,000-30,000 depending on jurisdiction and complexity. Annual: $20,000-100,000+ including director fees, accounting, audit, registered office. Benefit Threshold: Generally makes sense when: Tax savings exceed costs by meaningful margin. Multi-entity structure already exists or planned. Regional operations justify central coordination.',
        '["Evaluate need for holding company based on current structure, tax leakage analysis, and multi-entity expansion plans", "Compare Singapore, Netherlands, Ireland, and UAE as holding company jurisdictions based on your specific operational and tax profile", "Model holding company economics including setup costs, annual costs, and expected tax benefits to validate ROI", "Plan holding company implementation including formation, substance establishment, and potential restructuring of existing entities"]'::jsonb,
        '["Holding Company Jurisdiction Deep Dive with detailed analysis of Singapore, Netherlands, Ireland, and UAE", "Holding Company ROI Calculator for modeling costs vs benefits of intermediate holding structure", "Substance Requirements Checklist by jurisdiction covering director, employee, and activity requirements", "Holding Company Implementation Timeline with formation, substance, and restructuring milestones"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 33: Substance Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        33,
        'Substance Requirements',
        'Economic substance is increasingly required to claim tax treaty benefits and avoid anti-avoidance rules. Understanding and meeting substance requirements is essential for international structures to achieve intended benefits.

What is Economic Substance: Definition: Real business activities and decision-making in claimed jurisdiction. Not just legal registration but actual operations. Personnel, facilities, and functions in the jurisdiction. Why It Matters: Tax authorities examine substance to determine treaty eligibility. Lack of substance can result in: Denied treaty benefits. Recharacterization of income. Penalties and additional taxes.

OECD BEPS and Substance: BEPS Action 5: Requires substantial activity for IP regimes. BEPS Action 6: Principal Purpose Test for treaty benefits. BEPS Action 8-10: Transfer pricing aligned with value creation. Global Trend: Increasing substance requirements worldwide.

Substance Requirements by Entity Type: Holding Company: Board of Directors: Majority or all local residents. Meet regularly in jurisdiction (quarterly minimum). Make strategic decisions locally with proper documentation. Operations: Registered office with physical presence. Bank accounts in jurisdiction. Administrative staff or outsourced management. Activities: Investment decisions made locally. Monitoring of subsidiaries. Financing activities (if applicable).

Operating Company (Regional HQ): All holding company requirements plus: Employees performing core income-generating activities. Adequate operating expenditure. Strategic decisions for regional operations.

IP Holding Company (Highest Scrutiny): All holding company requirements plus: Employees with relevant qualifications (engineers, scientists). Decision-making on IP development and exploitation. Control over risks related to IP development. DEMPE functions: Development, Enhancement, Maintenance, Protection, Exploitation.

Practical Substance Measures: Directors: Local Directors: Ideally residents of jurisdiction with relevant experience. Professional directors available (cost: $5,000-20,000/year). Avoid nominee directors for important positions. Meetings: Regular board meetings in jurisdiction. Documented minutes with substantive discussion. Decisions made by board, not ratified after the fact.

Personnel: Employees: Local staff for key functions. Can be full-time, part-time, or shared services. Skill level appropriate to functions. Outsourcing: Certain functions can be outsourced locally. Provider must be local and substantive. Retain control and decision-making internally.

Physical Presence: Office: Dedicated office space (not just registered address). Appropriate for size of operations. Can be serviced office if genuinely used. Equipment and Systems: IT infrastructure, communication systems. Access to documents and records.

Documentation: Board Resolutions: Formal documentation of decisions. Show deliberation and analysis. Minutes signed by attendees. Management Reports: Regular reporting to board. Performance monitoring. Strategic planning documents.

Contracts and Correspondence: Executed from jurisdiction. Correspondence shows local involvement. Key negotiations involve local personnel.

Substance Assessment and Monitoring: Self-Assessment: Regularly evaluate substance against requirements. Document activities and presence. Gap analysis and remediation planning.

Risk Areas: Decisions made elsewhere and rubber-stamped. Board meetings only on paper. No real activity between meetings. Employees with no relevant functions.

Consequences of Inadequate Substance: Treaty Denial: Withholding tax benefits disallowed. Higher taxes on cross-border payments. Potential refund claims denied. Tax Authority Challenges: CFC rules triggered. POEM determination (treated as resident elsewhere). Transfer pricing adjustments. Reputational Risk: Listing in tax authority guidance. Scrutiny on other structures. Potential penalties.',
        '["Assess current substance in each international entity against jurisdiction-specific requirements - identify gaps requiring remediation", "Develop substance implementation plan including local directors, employees, office presence, and documentation practices", "Create board meeting protocol ensuring substantive discussion, local attendance, and proper documentation of decision-making", "Establish substance monitoring process with regular self-assessment and evidence collection for potential audit defense"]'::jsonb,
        '["Economic Substance Requirements Guide by jurisdiction and entity type with practical compliance measures", "Board Meeting Protocol Template with agenda structure, documentation requirements, and best practices", "Substance Self-Assessment Checklist for evaluating current compliance and identifying improvement areas", "Substance Documentation Package Template for creating audit-ready evidence of economic presence"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 34: CFC and POEM Rules
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        34,
        'CFC and POEM Rules',
        'Controlled Foreign Corporation (CFC) rules and Place of Effective Management (POEM) are anti-avoidance provisions that can override tax benefits of international structures. Understanding these rules is essential for compliant planning.

Indian CFC Rules (Place of Effective Management): What is POEM: Test to determine tax residency of foreign companies. Company with POEM in India is treated as Indian tax resident. Taxable in India on worldwide income. Definition: Place where key management and commercial decisions are made. Considers where board meetings occur. Where senior management operates. Where main commercial activities are controlled.

POEM Determination Factors: Active Business Test: If foreign company has active business outside India, POEM less likely to be India. Active business: Employees in foreign country, assets used for business, defined scope of operations. Passive income focus increases POEM risk. Management and Control: Where board of directors meets and makes decisions. Where senior management is based. Where key commercial decisions are taken.

High-Risk Scenarios: Board meetings primarily in India. Indian residents control foreign company decisions. No real management in foreign jurisdiction. Foreign company primarily receives passive income from India.

Mitigation Strategies: Genuine Substance: Establish real management in foreign jurisdiction. Local directors with decision-making authority. Board meetings in foreign country. Management Functions: Senior management based outside India. Decisions made outside India with documentation. Active business operations in foreign location.

GAAR (General Anti-Avoidance Rules): What is GAAR: Empowers tax authorities to deny benefits of arrangements lacking commercial substance. Applies to impermissible avoidance arrangements. Impermissible Arrangement: Main purpose is to obtain tax benefit. Creates rights not ordinarily created between unrelated parties. Misuse or abuse of tax provisions. Lacks commercial substance.

Commercial Substance Test: Not meeting the test if: Arrangement is in a form that does not reflect economic substance. Tax benefit without commensurate business benefit. Incorporates elements that have effect of offsetting each other.

GAAR Safeguards: Tax benefit threshold: INR 3 crore in a year (below this, GAAR may not apply). Grandfathering: Generally not applicable to arrangements before April 1, 2017.

Defensive Measures: Business Purpose Documentation: Document commercial rationale for each entity and arrangement. Maintain contemporaneous records of business reasons. Tax benefit should not be sole or main purpose. Arm''s Length Behavior: Structure transactions as unrelated parties would. Genuine commercial terms. Not artificially constructed.

Consistent Treatment: Actual behavior consistent with documented purpose. Ongoing substance and activity. Regular review and documentation.

Tax Treaty Override Considerations: Treaty Benefits: May be denied if arrangement lacks substance. Principal Purpose Test in newer treaties. Beneficial ownership requirements. India Approach: India takes strict view on treaty shopping. Circular 789 guidance on beneficial ownership. Substance requirements for treaty benefits.

Planning Implications: Structure Choices: Avoid structures with tax benefit as primary driver. Ensure genuine business purposes. Build adequate substance from start. Documentation: Document business rationale at time of implementation. Maintain evidence of ongoing business purpose. Be prepared to defend if challenged. Professional Advice: Complex anti-avoidance rules require expert guidance. Tax advisors should review structure and documentation. Regular review as rules evolve.',
        '["Assess POEM risk for existing or planned foreign entities - evaluate where management and control actually resides", "Document business purpose for each international entity demonstrating commercial rationale beyond tax benefits", "Implement POEM mitigation measures including foreign board meetings, local management, and documented decision-making outside India", "Review structure against GAAR criteria ensuring arrangements have commercial substance and arm''s length characteristics"]'::jsonb,
        '["POEM Risk Assessment Framework for evaluating Indian tax residency risk of foreign subsidiaries", "POEM Mitigation Checklist with practical measures for demonstrating foreign management and control", "GAAR Compliance Documentation Template for substantiating commercial purpose of international arrangements", "Anti-Avoidance Rules Summary covering CFC, POEM, GAAR, and treaty anti-abuse provisions relevant to Indian structures"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 35: Treaty Planning and Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        35,
        'Treaty Planning and Optimization',
        'Double Tax Avoidance Agreements (DTAAs) reduce withholding taxes and prevent double taxation on cross-border payments. Strategic use of India''s treaty network can significantly reduce tax costs.

India''s Treaty Network: Overview: India has DTAAs with 90+ countries. Treaties override domestic law where more favorable. Key treaties for startups: US, UK, Singapore, Netherlands, UAE, Ireland, Germany. Treaty Types: Comprehensive DTAAs: Cover income tax, capital gains, withholding. Limited treaties: May cover only certain income types. TIEA: Tax Information Exchange Agreements (not tax reduction).

Key Treaty Benefits: Reduced Withholding Taxes: Dividends: Domestic rate 20%+, treaty rates typically 10-15%. Interest: Domestic rate 20%, treaty rates typically 10-15%. Royalties/FTS: Domestic rate 10%, treaty rates 10-15%. Capital Gains: May be exempt from source country tax if treaty provides.

Permanent Establishment Protection: Treaty defines when taxable presence exists. Higher thresholds than domestic law. Protection for limited activities.

India Treaty Rates (Key Countries): US: Dividend 15-25%, Interest 15%, Royalty 15%, FTS 15%. UK: Dividend 10-15%, Interest 15%, Royalty 15%, FTS 15%. Singapore: Dividend 15%, Interest 15%, Royalty 10%, FTS 10%. Netherlands: Dividend 10%, Interest 10%, Royalty 10%, FTS 10%. UAE: Dividend 10%, Interest 12.5%, Royalty 10%, FTS 10%. Ireland: Dividend 10%, Interest 10%, Royalty 10%, FTS 10%.

Treaty Benefit Claims: Requirements: Valid treaty between jurisdictions. Recipient must be resident of treaty country. Beneficial ownership of income. Proper documentation and certification. Tax Residency Certificate (TRC): Required to claim treaty benefits in India. Issued by foreign tax authority. Must be obtained annually.

Form 10F: Self-declaration of beneficial ownership. Filed with Indian payer. Contains treaty eligibility information. Documentation: Maintain evidence of treaty eligibility. Beneficial ownership documentation. Form 10F and TRC on file.

Treaty Planning Strategies: Route Planning: Structure to utilize favorable treaty rates. Consider intermediate holding company in treaty-favorable jurisdiction. Ensure substance requirements met for each entity.

Example Structure: India → Singapore Holding → US Operating Subsidiary. India-Singapore: 15% dividend withholding (vs 20%+ domestic). Singapore: Participation exemption on US dividends. US-Singapore: No withholding on dividends to Singapore. Overall: Tax-efficient repatriation through Singapore.

Dividend Planning: Time dividend declarations to optimize treaty position. Consider treaty residence of recipient. Document beneficial ownership clearly.

Royalty and Service Fee Planning: Route through treaty-favorable jurisdictions (with substance). Consider IP ownership location. Document arm''s length pricing.

Treaty Anti-Avoidance: Limitation on Benefits (LOB): Common in US treaties. Requires qualifying tests to claim benefits. May deny benefits for conduit arrangements.

Principal Purpose Test (PPT): In newer treaties and MLI. Denies benefits if principal purpose is tax benefit. Requires genuine business purpose.

Beneficial Ownership: Must be real owner, not mere agent or conduit. Substance and control over income required. India takes strict interpretation.

Multilateral Instrument (MLI): What is MLI: Modifies tax treaties multilaterally. Implements BEPS recommendations. India has adopted MLI for many treaties. Impact: Principal Purpose Test added to covered treaties. PE definitions modified. Tighter anti-avoidance rules. Check: Verify MLI positions for specific treaties.',
        '["Map applicable treaties for your international structure - identify withholding tax rates for dividends, interest, royalties, and fees by country pair", "Evaluate treaty planning opportunities for reducing withholding taxes through intermediate holding structures with adequate substance", "Implement treaty benefit claim process including TRC collection, Form 10F completion, and documentation maintenance", "Review MLI impact on relevant treaties - understand how Principal Purpose Test and other provisions affect your planning"]'::jsonb,
        '["India DTAA Rate Card with withholding rates for dividends, interest, royalties, and FTS by treaty country", "Treaty Benefit Claim Checklist covering TRC, Form 10F, beneficial ownership documentation, and filing requirements", "Treaty Planning Structure Analysis comparing tax outcomes under different routing options", "MLI Impact Assessment Guide explaining modifications to India treaties under Multilateral Instrument"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Global Hiring (Days 36-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Global Hiring',
        'Master global hiring for international expansion - Employer of Record (EOR) services, contractor vs employee classification, global compensation design, equity for international employees, and building effective distributed teams.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 36: Global Hiring Options
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        36,
        'Global Hiring Options',
        'Hiring internationally requires navigating different employment laws, tax obligations, and compliance requirements. Understanding your options enables compliant, cost-effective global team building.

Global Hiring Challenges: Employment Law Complexity: Each country has unique employment regulations. Termination rules vary dramatically. Benefits requirements differ. Collective bargaining in some jurisdictions. Tax and Compliance: Employer tax registration required. Withholding and reporting obligations. Social security and pension contributions. Penalties for non-compliance can be severe.

Permanent Establishment Risk: Employees can create taxable presence. May trigger corporate tax obligations. Specific role-dependent risk. Administrative Burden: Payroll processing complexity. Currency and banking requirements. Statutory filings and reporting.

Hiring Options Comparison: Option 1 - Own Entity: Establish legal entity in country. Hire employees directly. Full Control: Complete control over employment relationship. Direct employment creates stronger connection. Cost: High setup ($10-50K+) and ongoing costs ($20-50K+/year). Best For: Significant presence in country (5+ employees), long-term commitment.

Option 2 - Employer of Record (EOR): Third party legally employs worker on your behalf. You manage day-to-day work, EOR handles compliance. Speed: Can hire within days, no entity setup. Cost: 15-30% on top of salary (varies by provider and country). Control: Worker is technically EOR employee. Best For: Initial market entry, small teams, testing markets.

Option 3 - Independent Contractors: Engage individuals as self-employed contractors. No employment relationship, service agreement. Speed: Fastest to engage. Cost: No employer taxes or benefits (higher base payment typical). Risk: Misclassification risk if relationship resembles employment. Best For: Genuinely independent workers, project-based, multiple clients.

Option 4 - Professional Employer Organization (PEO): Co-employment model (primarily US). You and PEO share employer responsibilities. Control: More control than EOR, shared compliance. Cost: Similar to EOR, may include benefits access. Best For: US hiring without full payroll infrastructure.

Decision Framework: Number of Hires: 1-2: Contractor (if genuinely independent) or EOR. 3-5: EOR for simplicity, evaluate entity economics. 5+: Consider own entity if long-term commitment. Timeline: Immediate need: Contractor or EOR. 3-6 months: EOR or entity. 6+ months: Plan for entity if scaling.

Market Commitment: Testing market: Contractor or EOR. Committed but early: EOR. Significant investment: Own entity. Role Type: Sales/Business Development: EOR or entity (PE considerations). Engineering/Support: EOR often sufficient. Executive/Leadership: Entity may be preferable.

Cost Comparison Example (US Hire, $100K base): Own Entity: Employer costs ~$130K (salary + benefits + taxes). Entity overhead ~$30K/year amortized per employee. Total: ~$160K per employee (lower with scale). EOR: Service fee 20% = $20K. No entity overhead. Total: ~$120K per employee (plus limited benefits typically).

Contractor: Pay rate typically $110-130K (gross, covering their taxes). No benefits or employer taxes. Risk of misclassification. Total: ~$120K but with compliance risk.

Hybrid Approach: Common Strategy: Start with EOR for first hires in new market. Convert to own entity once threshold reached (usually 5-10 employees). Maintain contractors for genuinely project-based work. Transition Planning: Plan EOR to entity transition from start. EOR employees typically easy to transfer. Allow 3-6 months for entity setup.',
        '["Evaluate global hiring options for each target market based on team size plans, timeline, and long-term market commitment", "Create decision matrix for contractor vs EOR vs entity across your priority markets with cost and timeline comparisons", "Assess misclassification risk for any planned contractor engagements using country-specific criteria", "Develop market-specific hiring strategy documentation with chosen approach, rationale, and transition triggers"]'::jsonb,
        '["Global Hiring Options Comparison Matrix evaluating own entity, EOR, PEO, and contractor approaches by key criteria", "Hiring Decision Framework with decision tree based on team size, timeline, market commitment, and role type", "Misclassification Risk Assessment Checklist by country for evaluating contractor relationship appropriateness", "Global Hiring Cost Calculator comparing total employer costs across different hiring approaches by country"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 37: Employer of Record (EOR)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        37,
        'Employer of Record Services',
        'Employer of Record (EOR) services enable hiring employees in countries where you have no entity. Understanding EOR models, provider selection, and effective management enables compliant global hiring.

How EOR Works: Legal Structure: EOR is legal employer of record in target country. EOR handles employment contract, payroll, taxes, benefits. You direct daily work and manage performance. Worker is employed by EOR, works for you. Responsibilities Split: EOR Handles: Employment contracts, payroll processing, tax withholding and remittance, statutory benefits, compliance with local labor law. You Handle: Recruiting and selection, day-to-day management, performance management, work assignments, termination decisions (EOR executes).

Major EOR Providers: Deel: Coverage: 150+ countries. Pricing: $599/employee/month (approximate). Strengths: Modern platform, fast onboarding, contractor management. Integrations: Good with HRIS and payroll systems.

Remote.com: Coverage: 60+ countries (own entities in most). Pricing: $599/employee/month base. Strengths: Own entities (not subcontracting), IP protection. Features: Equipment management, benefits administration.

Oyster: Coverage: 180+ countries. Pricing: $599/employee/month (varies by country). Strengths: User experience, integrations, distributed work focus. Features: Global benefits, equity management.

Velocity Global: Coverage: 185+ countries. Pricing: Custom pricing. Strengths: Enterprise focus, compliance expertise. Features: Immigration support, global mobility.

Papaya Global: Coverage: 160+ countries. Pricing: Varies by country and services. Strengths: Payroll platform, enterprise features. Features: Contractor management, analytics.

EOR Provider Selection Criteria: Country Coverage: Does provider cover your target markets? Quality of local presence (own entity vs subcontractors). Compliance track record in target countries. Pricing Model: Per-employee fee vs percentage of salary. Setup fees and minimums. Benefits costs (included or additional).

Service Quality: Onboarding speed and process. Payroll accuracy and timeliness. Responsiveness to issues. Technology and Integrations: Platform usability. HRIS and accounting integrations. Reporting and analytics. Benefits Offering: Local benefits options. Supplemental benefits available. Equity management support.

EOR Implementation: Onboarding Process: Select provider and sign Master Services Agreement. Provide employee details and compensation information. Provider generates compliant employment contract. Employee signs contract with EOR. Provider sets up payroll, withholding, benefits. Employee starts work. Timeline: 3-7 days typical for standard countries, longer for complex jurisdictions.

Ongoing Management: Payroll: You approve payroll, EOR processes and pays. Monthly cycle typical, varies by country. Expenses often processed through EOR. Performance: You manage performance directly. EOR not involved in day-to-day supervision. Keep EOR informed of significant issues. Termination: Inform EOR of termination decision. EOR ensures compliant termination process. Notice periods and severance per local law. EOR handles exit paperwork.

EOR Limitations: Control: Worker is not technically your employee. May affect some benefits or programs. Confidentiality and IP concerns (use robust agreements). Costs: Per-employee fees add up with scale. May become more expensive than own entity. Benefits options may be limited. Long-Term: Generally viewed as transitional solution. Build plan for entity transition if scaling. Some employees prefer direct employment.',
        '["Research and compare 3-4 EOR providers based on your target country coverage, pricing, and service requirements", "Request detailed quotes from shortlisted EOR providers including per-employee fees, benefits costs, and any additional charges", "Evaluate provider technology platforms for usability, integrations with your existing systems, and reporting capabilities", "Develop EOR engagement checklist covering contract terms, data protection, IP assignments, and termination procedures"]'::jsonb,
        '["EOR Provider Comparison Matrix evaluating major providers on coverage, pricing, features, and service quality", "EOR Due Diligence Checklist for evaluating provider compliance, financial stability, and service delivery track record", "EOR Master Services Agreement Review Checklist covering key terms to negotiate and risks to address", "EOR Onboarding Process Template with timeline and documentation requirements by country"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 38: Contractor Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        38,
        'Contractor Compliance',
        'Engaging independent contractors internationally carries significant misclassification risk. Understanding classification criteria and compliance requirements protects against penalties and back-taxes.

Misclassification Risk: What is Misclassification: Treating employee as contractor when relationship resembles employment. Tax authorities globally scrutinize contractor relationships. Misclassification results in back taxes, penalties, and interest. Consequences: Employer Taxes: Back payment of employer portion of taxes. Employee Taxes: May be held liable for unwithheld amounts. Penalties: Often 20-100% of taxes owed. Benefits: May owe benefits for misclassified period. Criminal: In extreme cases, criminal liability possible.

Classification Criteria (General Principles): Control: Contractors control how, when, and where work is performed. Employees subject to employer direction and control. Financial Dependence: Contractors have multiple clients, business expenses, profit/loss risk. Employees economically dependent on single employer. Relationship: Contractors provide services for defined project or period. Employees have ongoing, indefinite relationship.

Integration: Contractors provide distinct services, not integral to business. Employees perform core business functions. Equipment and Tools: Contractors typically provide own tools. Employees use employer-provided equipment.

Country-Specific Considerations: US: IRS 20-factor test for classification. State-level tests (California AB5 more restrictive). Focus on behavioral control, financial control, relationship type. UK: IR35 rules for off-payroll working. Inside IR35 = treated as employment for tax. Determination required before engagement. EU Countries: Varies by country but generally protective of workers. Many countries presume employment if in doubt. Some countries restrict contractor use for ongoing work.

Safe Contractor Practices: Genuine Independence: Contractor has own business, multiple clients. Controls own schedule and methods. Bears business risk. Limited Engagement: Project-based or time-limited engagements. Clear deliverables and milestones. Avoid ongoing, indefinite arrangements. No Employment Indicators: No fixed hours or location requirements. No performance reviews as employees receive. Contractor invoices for services.

Written Agreement: Clear contract stating independent contractor status. Scope of work, deliverables, payment terms. IP assignment and confidentiality provisions. No exclusivity clause.

Contractor Agreement Essentials: Relationship Definition: Explicitly state independent contractor relationship. Contractor responsible for own taxes. No employment benefits provided. Scope and Term: Defined project or engagement period. Specific deliverables or milestones. Avoid open-ended arrangements. Payment Terms: Project fee or hourly rate (not salary). Invoice-based payment. No advance payments like salary.

IP and Confidentiality: Work product owned by company. Confidentiality obligations. Non-compete may be unenforceable.

Termination: Either party can terminate with notice. No severance obligations. Clear wind-down provisions.

Monitoring and Review: Regular Assessment: Review contractor relationships annually. Check for drift toward employment. Update arrangements if scope changes. Documentation: Maintain evidence of contractor independence. Keep contracts, invoices, communications. Document multiple clients if known. Red Flags: Contractor works exclusively for you for extended period. Fixed schedule, company email, integrated into team. Regular payments resembling salary. Company controls methods of work.',
        '["Assess misclassification risk for existing contractor relationships using country-specific classification criteria", "Create compliant contractor agreement template covering independence indicators, scope limitation, and IP assignment", "Develop contractor engagement policy defining appropriate use cases and prohibited arrangements", "Implement annual contractor review process to identify relationships drifting toward employment"]'::jsonb,
        '["Contractor Classification Checklist with country-specific criteria for major markets (US, UK, EU, India)", "International Contractor Agreement Template with independence provisions and IP protections", "Contractor vs Employee Decision Guide for evaluating appropriate engagement type by role and situation", "Contractor Compliance Audit Framework for annual review of existing contractor relationships"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 39: Global Compensation Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        39,
        'Global Compensation Design',
        'Designing globally competitive compensation requires balancing local market rates, internal equity, and budget constraints. A thoughtful compensation framework attracts talent while maintaining fairness.

Compensation Philosophy Options: Global Pay: Same pay for same role regardless of location. Maximum internal equity. May overpay in low-cost markets. Challenges attracting talent in high-cost markets.

Local Market Rate: Pay at local market rates. Competitive in each market. Internal equity challenges when teams collaborate. Most common approach.

Location-Adjusted: Base rate with location adjustments. Maintains some internal equity. Recognizes cost of living differences. Growing approach for distributed teams.

Hybrid: Different approaches for different roles. Location-adjusted for most roles. Global pay for leadership or scarce talent. Pragmatic for many companies.

Benchmarking Approaches: Salary Surveys: Radford, Mercer, Culpepper. Levels.fyi, Glassdoor (less reliable). Compensately (startups focus). Cost: $5,000-50,000 for formal surveys. Free sources less accurate but directional.

Percentile Targeting: 50th percentile: Market average (cost-effective). 60th-75th percentile: Competitive (most funded startups). 90th percentile: Premium (scarce talent, aggressive growth).

Role-Based Decisions: Engineering: Often target 75th+ in competitive markets. Sales: Commission-heavy, benchmark OTE. Support: Often 50th-60th percentile.

Compensation Components: Base Salary: Fixed cash compensation. Primary component in most countries. Determine frequency (monthly common outside US).

Variable Pay: Sales commissions, bonuses. Varies by role and performance. Consider local practices (13th month, etc.).

Equity: Stock options or RSUs. US: Options common for startups. EU: RSUs may be preferred (tax). Complex for international employees. See Day 40 for details.

Benefits: Statutory: Required by law (pension, healthcare in many countries). Supplemental: Additional benefits to attract talent. Common: Health insurance, retirement, PTO. Consider local expectations (meal vouchers in France, etc.).

Global Compensation Structure: Job Architecture: Define levels consistently globally. Map roles to levels. Compensation bands by level.

Geographic Zones: Create location groupings. Zone 1: High-cost (SF, NYC, London). Zone 2: Moderate (Austin, Boston, Berlin). Zone 3: Lower-cost (most of world). Adjustment factor per zone.

Pay Bands: Define min-mid-max for each level. Based on benchmark percentile target. Review annually.

Implementation: Offer Process: Determine level and zone. Look up compensation band. Consider experience and skills within band. Present total compensation package.

Annual Review: Market data refresh annually. Adjust bands for market movement. Individual adjustments for performance and market.

Communication: Be transparent about philosophy. Explain geographic approach. Help employees understand their compensation.

Special Considerations: Currency: Pay in local currency typically. Reduces employee FX risk. Company bears FX exposure.

Inflation: Monitor high-inflation countries. May need more frequent adjustments. Consider cost-of-living allowances.

Relocation: Policy for employees moving. Adjust compensation for new location. Consider transition period.',
        '["Define compensation philosophy for your company - global pay, local market, or location-adjusted approach with clear rationale", "Create job architecture with consistent levels and mapping to compensation bands across all locations", "Establish geographic zones with pay adjustment factors based on cost of labor benchmarking", "Develop annual compensation review process including market data refresh, band adjustments, and individual reviews"]'::jsonb,
        '["Compensation Philosophy Framework with pros/cons of global pay, local market, and location-adjusted approaches", "Job Level Architecture Template for creating consistent global leveling system", "Geographic Pay Zone Structure with methodology for grouping locations and setting adjustment factors", "Annual Compensation Review Process Guide with timeline, data sources, and decision-making framework"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 40: Equity for International Employees
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        40,
        'Equity for International Employees',
        'Granting equity to international employees is complex due to varying tax treatments, securities laws, and reporting requirements. Understanding these complexities enables fair and compliant equity programs.

Equity Grant Types: Stock Options: Right to purchase shares at fixed price. Most common for US startups. Tax treatment varies dramatically by country. ISO (US) vs NSO/NQSO distinctions.

Restricted Stock Units (RSUs): Promise to deliver shares on vesting. No purchase required by employee. Simpler tax treatment in many countries. More common for later-stage companies.

Phantom Stock/Stock Appreciation Rights: Cash-based equity equivalent. No actual share ownership. Simplifies securities and tax issues. May not provide same motivation.

Country-Specific Tax Considerations: US: ISOs: Favorable treatment if holding requirements met. NSOs: Taxed at exercise as ordinary income. RSUs: Taxed at vesting as ordinary income.

UK: EMI Scheme: Tax-advantaged for qualifying companies. Non-EMI: Taxed at exercise, potentially as employment income. Unapproved options: Complex, may trigger upfront tax.

Germany: Generally taxed at exercise/vesting as employment income. No favorable capital gains treatment for options. RSUs may be preferred for simplicity.

India (for reference): ESOPs taxed at exercise as perquisite (employment income). Additionally taxed on sale as capital gains. ESOP trust structure common.

Other EU Countries: Varying treatments, often less favorable than US. France, Netherlands have some favorable regimes. Many countries tax at exercise as income.

Grant Considerations by Country: High-Tax/Unfavorable Countries: Consider cash bonus instead of equity. Phantom equity for equity-like participation. Accept higher cost for equity motivation.

Favorable Countries (US, UK EMI): Standard option grants work well. Utilize favorable tax programs where eligible.

Uncertain/Complex Countries: Get local tax advice before granting. Consider RSUs over options. Build in withholding mechanisms.

Practical Implementation: Securities Compliance: Each country has securities regulations. May require filings or exemptions. US Rule 701 for private company grants. Professional advice essential.

Equity Plan Design: Plan should accommodate international grants. Sub-plans for specific countries. Flexibility for different grant types.

Grant Documentation: Stock option agreement or RSU agreement. Country-specific language may be needed. Clear vesting schedule and terms.

Withholding and Reporting: Many countries require employer withholding on equity. Sell-to-cover mechanisms common. Employer reporting obligations.

Communication: Employees may not understand equity. Educate on grant value and mechanics. Clear communication on tax implications.

EOR Equity Challenges: Legal Complexity: Employee employed by EOR, not you. EOR typically cannot grant your equity. Workarounds required. Solutions: Direct equity grant from parent company. Phantom equity or cash bonus equivalent. Contractor agreement for equity (careful). EOR Providers: Some EORs facilitate equity. Deel, Remote have equity management features. Often requires additional paperwork.

Best Practices: Get Local Advice: Tax advisor in each country before granting. One-size-fits-all does not work. Country-specific grant terms.

Plan Ahead: Build international capability into equity plan. Consider future countries in plan design.

Document Carefully: Clear agreements for each country. Withholding procedures documented. Employee acknowledgment of tax responsibility.

Consider Alternatives: Cash instead of equity in problem countries. Phantom equity for simplicity. Bonus tied to company milestones.',
        '["Evaluate equity grant types (options, RSUs, phantom) for each country where you have or plan employees based on tax treatment and complexity", "Engage local tax advisors in key hiring countries to understand equity tax implications and optimal grant structures", "Update equity plan documentation to accommodate international grants with country-specific provisions where needed", "Create international equity grant process including country review, documentation, withholding setup, and employee communication"]'::jsonb,
        '["International Equity Tax Summary covering stock options and RSUs treatment in top 15 hiring countries", "Equity Plan International Checklist for ensuring plan documents support multi-country grants", "Country-Specific Grant Considerations Guide with recommendations for options vs RSUs vs phantom by country", "International Equity Communication Template for explaining grants and tax implications to employees"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 7-8 (Entity Structure and Global Hiring) created successfully';

    -- ========================================
    -- MODULE 9: Export Promotion Schemes (Days 41-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Export Promotion Schemes',
        'Maximize export benefits through Indian government schemes - RoDTEP, MEIS successor schemes, SEZ benefits, DGFT registration, advance authorization, EPCG, and bilateral trade agreement advantages.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 41: Export Promotion Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        41,
        'Export Promotion Framework',
        'India offers comprehensive export promotion through various schemes administered by DGFT and other ministries. Understanding these incentives can significantly improve export margins and competitiveness.

India Export Overview: Export Performance: India exports approximately $450 billion in goods and $300 billion in services annually. IT/ITeS services constitute major service export (~$200 billion). Software and SaaS exports growing rapidly. Policy Framework: Foreign Trade Policy (FTP) 2023 governs export promotion. DGFT (Directorate General of Foreign Trade) administers schemes. Ministry of Commerce drives policy. State governments offer additional incentives.

Key Export Promotion Schemes: RoDTEP (Remission of Duties and Taxes on Exported Products): Refunds duties and taxes not otherwise refunded. Covers central, state, and local taxes. Rates notified product-wise (0.5% to 4.3% of FOB value). Replaced MEIS for goods exports.

SEIS (Service Exports from India Scheme): For service exporters (ended in 2020, successor expected). Provided duty credit scrips as percentage of forex earnings. IT/ITeS companies were major beneficiaries. Watch for new service export scheme.

SEZ (Special Economic Zone) Benefits: Zero customs duty on imports. Tax holiday on export income. Duty-free procurement of domestic goods. Infrastructure and logistics benefits.

Advance Authorization: Duty-free imports of inputs for export production. Value addition norms specified. Export obligation within specified period.

EPCG (Export Promotion Capital Goods): Duty-free import of capital goods. Export obligation of 6x duty saved in 6 years. Benefits manufacturing exporters.

DGFT Registration and IEC: Import Export Code (IEC): Mandatory for import/export activities. 10-digit code issued by DGFT. One-time registration, no renewal. Apply online at dgft.gov.in. Process: Online application with PAN, bank account, and address proof. Processing time: 2-3 working days typically. Cost: INR 500 application fee.

AD Code Registration: Required for foreign exchange transactions. Register IEC with authorized dealer bank. Enables export proceeds receipt and remittance.

Software Export Classification: STPI Registration: Software Technology Parks of India scheme. Benefits for IT/ITeS exporters. Tax benefits (Section 10A/10AA expired but still relevant for some). STP unit registration for operational benefits.

Services Export: No IEC required for pure services export. SOFTEX form for software exports above threshold. Foreign exchange realization requirements.

Export Documentation: Commercial Invoice: Details of goods/services exported. Value, quantity, terms of sale.

Bill of Lading/Airway Bill: Shipping document for goods. Evidence of shipment.

Shipping Bill: Customs document for goods export. Filed electronically through ICEGATE.

Certificate of Origin: Proves Indian origin for preferential tariff. Required for FTA benefits. Issued by chambers of commerce.

SOFTEX Form: For software exports (above threshold). Declares software export details. Filed with STPI/SEZ authority.

FIRC: Foreign Inward Remittance Certificate. Proof of export proceeds receipt. Important for compliance and claims.

Export Compliance: Realization: Export proceeds must be realized within 9 months. Extension available with AD bank approval. Write-off requires RBI/AD approval.

Documentation Retention: Maintain export documents for 7+ years. Required for audits and claims.

Annual Reporting: DGFT may require periodic reporting. Scheme-specific compliance requirements.',
        '["Register for IEC (Import Export Code) with DGFT if not already done - required for goods and services exports", "Evaluate applicable export promotion schemes for your business - RoDTEP for goods, monitor service export scheme developments", "Complete AD Code registration with your bank to enable foreign exchange transactions for exports", "Create export documentation checklist covering commercial invoices, shipping documents, and certificate of origin requirements"]'::jsonb,
        '["IEC Registration Guide with step-by-step online application process and documentation requirements", "Export Promotion Scheme Overview covering RoDTEP, SEZ, Advance Authorization, and EPCG eligibility and benefits", "Export Documentation Checklist for goods and services exports with template formats", "DGFT Compliance Calendar with filing deadlines and scheme-specific reporting requirements"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 42: RoDTEP and Duty Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        42,
        'RoDTEP and Duty Benefits',
        'RoDTEP (Remission of Duties and Taxes on Exported Products) is India''s primary export incentive scheme for goods, replacing MEIS. Understanding how to claim these benefits can improve export margins by 0.5-4.3%.

RoDTEP Scheme Overview: What It Refunds: Central, state, and local duties/taxes not refunded through other mechanisms. Includes electricity duties, mandi tax, stamp duty, fuel used in transport. Does not include refunded taxes (GST, customs duty on inputs). Scheme Details: WTO-compliant export incentive. Notified rates for ~8,000+ tariff lines. Rates range from 0.5% to 4.3% of FOB value. Benefits received as duty credit scrips.

Eligibility: Exporters of goods covered under RoDTEP schedule. Export must be from India. Exporter must have valid IEC. Manufacturer exporter or merchant exporter.

RoDTEP Rates by Category: High Rates (3-4.3%): Textiles and garments, leather products, handicrafts. Medium Rates (1-3%): Engineering goods, chemicals, pharmaceuticals. Lower Rates (0.5-1%): Electronics, auto components, basic commodities. Not Covered: Items already receiving other duty neutralization. SEZ exports (separate benefit regime). Certain restricted items.

Claim Process: Step 1: Export goods through customs (shipping bill). Step 2: Shipping bill must claim RoDTEP (check appropriate box). Step 3: Realize export proceeds (FIRC/BRC required). Step 4: Generate e-scrip on DGFT portal. Step 5: Use scrip for duty payment or transfer to others.

Documentation Required: Shipping Bill: Must indicate RoDTEP claim. Commercial Invoice: Export value determination. FIRC/BRC: Proof of export proceeds realization. IEC and DGFT registration: Valid registration.

E-Scrip Mechanism: What is E-Scrip: Electronic duty credit ledger on DGFT portal. Credits issued to exporter''s ledger. Transferable to other IEC holders. Usable for customs duty payment.

Generation: Auto-generated based on shipping bill data. Credit appears after export proceeds realization. Accessible through DGFT ECOM portal.

Utilization: Pay customs duty on imports. Transfer to another party for consideration. Valid indefinitely (no expiry currently).

Duty Drawback (Separate Scheme): What It Is: Refund of customs duties paid on imported inputs. Applies when inputs imported for export production. All Industry Rates: Standardized rates by product. Claimed at time of export. Brand Rate: Company-specific rate based on actual duty paid. Higher than AIR but requires documentation.

Comparison with RoDTEP: Duty Drawback: Refunds customs duty on inputs (already known). RoDTEP: Refunds other unrefunded taxes. Both can be claimed on same export (not mutually exclusive).

Practical Considerations: Rate Verification: Check current RoDTEP rates for your products. Rates are HS code specific. Rates subject to periodic revision. Claim Optimization: Ensure shipping bill correctly indicates RoDTEP. Realize proceeds promptly for scrip generation. Track scrip balance and utilization.

Documentation Discipline: Maintain export documentation carefully. Link shipping bills with FIRCs. Reconcile DGFT portal credits with exports.',
        '["Check RoDTEP rates applicable to your export products using DGFT notifications and HS code classification", "Ensure shipping bill procedures include RoDTEP claim indication for all eligible exports", "Set up process for e-scrip generation on DGFT portal once export proceeds are realized", "Evaluate duty drawback eligibility if your exports involve imported inputs - compare All Industry Rate vs Brand Rate benefits"]'::jsonb,
        '["RoDTEP Rate Schedule with HS code-wise rates for key export categories", "RoDTEP Claim Process Guide with step-by-step shipping bill and e-scrip procedures", "Duty Drawback vs RoDTEP Comparison explaining complementary benefits and claim procedures", "E-Scrip Management Guide for DGFT portal usage, transfer procedures, and utilization for duty payment"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 43: SEZ Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        43,
        'SEZ Benefits for Exporters',
        'Special Economic Zones offer comprehensive benefits for export-oriented units including duty exemptions, tax holidays, and infrastructure advantages. Understanding SEZ benefits helps optimize export operations.

SEZ Framework: What are SEZs: Geographically delineated zones with special economic regulations. Deemed foreign territory for trade and duties. Over 260 operational SEZs across India. IT/ITeS SEZs particularly relevant for tech startups. Governing Law: SEZ Act, 2005 and SEZ Rules, 2006. Ministry of Commerce oversees SEZ policy. Development Commissioners administer individual SEZs.

Types of SEZ Units: Developer: Develops and operates SEZ infrastructure. Co-Developer: Partners with developer for specific activities. Unit: Operating entity within SEZ conducting business.

SEZ Benefits: Customs Duty Exemption: Duty-free import of goods for authorized operations. Includes raw materials, capital goods, consumables. Domestic procurement treated as deemed export (duty-free).

GST Benefits: Zero-rated supplies to SEZ units. Input tax credit available on inputs. Simplified procedures for SEZ transactions.

Income Tax Benefits (Post-Amendment): Earlier: 100% deduction for 5 years, 50% for next 5 years. Current: Benefits under Section 10AA sunset for new units (grandfathered for existing). New units may still benefit from other provisions. Check current status and grandfathering.

Other Benefits: Single-window clearance. Exemption from state levies. Dedicated infrastructure. Simplified labor regulations.

Setting Up SEZ Unit: Eligibility: Must be engaged in export of goods/services. Positive Net Foreign Exchange (NFE) earning required. Manufacturing, services, or trading activities.

Application Process: Apply to Development Commissioner of chosen SEZ. Submit Letter of Approval (LOA) application. Include project details, investment, employment plans. LOA issued upon approval.

Compliance Requirements: Achieve positive NFE over 5-year blocks. Maintain required records and filings. Annual Progress Reports to DC. Exit bond requirements.

IT/ITeS SEZ Considerations: Relevant for Software Companies: IT/ITeS SEZ units can export software services. Work from designated SEZ premises. Specialized IT SEZs in major cities.

Remote Work Challenges: Traditional SEZ requires work from SEZ premises. Recent relaxations allow limited Work from Home. Check current Work from Home guidelines for SEZ units.

Practical Considerations: SEZ vs DTA Trade-offs: Benefit from duty exemption vs operational flexibility. SEZ requires designated premises. DTA (Domestic Tariff Area) allows flexibility.

Cost-Benefit Analysis: Duty savings vs rental premium in SEZ. Tax benefits (if available) vs compliance burden. Infrastructure quality and connectivity.

NFE Compliance: Must maintain positive Net Foreign Exchange. NFE = Exports - Imports - Deemed Exports. Failure impacts SEZ status.

Exit Provisions: Exit from SEZ involves duty payment on assets. Plan exit strategy if SEZ not working. Recent policy eases exit procedures.',
        '["Evaluate SEZ setup for your export operations - analyze duty savings, tax benefits, and compliance requirements against operational flexibility needs", "Research IT/ITeS SEZs in your operational areas - compare infrastructure, connectivity, and rental costs", "Calculate Net Foreign Exchange position to ensure positive NFE compliance if establishing SEZ unit", "Understand current Work from Home provisions for SEZ units and implications for your workforce model"]'::jsonb,
        '["SEZ Benefits Summary covering customs, GST, and income tax advantages with current applicability status", "SEZ Unit Setup Guide with application process, documentation, and timeline for IT/ITeS units", "SEZ Cost-Benefit Analysis Framework for comparing SEZ vs DTA operations", "SEZ Compliance Checklist covering NFE, annual reporting, and Development Commissioner filings"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 44: Trade Agreements and FTAs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        44,
        'Trade Agreements and FTAs',
        'India''s Free Trade Agreements and bilateral trade agreements provide preferential market access and tariff benefits. Leveraging these agreements can significantly reduce costs and improve competitiveness.

India''s Trade Agreement Network: Free Trade Agreements (FTAs): ASEAN-India FTA: Covers 10 ASEAN countries. Preferential tariffs on goods. Services agreement provides market access. India-Singapore CECA: Comprehensive agreement covering goods, services, investment. Preferential tariffs and services access. Investment protection provisions.

India-Korea CEPA: Preferential tariffs on goods. Services commitments. India-Japan CEPA: Comprehensive economic partnership. Goods, services, and investment coverage. India-UAE CEPA (2022): Most recent major FTA. Significant tariff reductions. Services trade facilitation. India-EFTA (Negotiated): Switzerland, Norway, Iceland, Liechtenstein. Focus on investment and services.

SAFTA: South Asian Free Trade Area. Preferential tariffs among SAARC nations. Limited practical usage.

FTA Benefits: Tariff Preferences: Reduced or zero customs duties on qualifying goods. Significant cost savings for manufacturing exports. Requires compliance with rules of origin. Market Access: Services trade commitments. Investment protection. Reduced non-tariff barriers.

Rules of Origin: What are Rules of Origin: Criteria determining when goods qualify for FTA benefits. Ensures benefits go to FTA member production. Prevents transshipment from non-member countries.

Common Criteria: Wholly Obtained: Product entirely sourced from FTA country. Substantial Transformation: Sufficient processing in FTA country. Value Addition: Minimum percentage of value added in FTA country. Change in Tariff Classification: Product classification changes through processing.

Certificate of Origin: Document proving FTA qualification. Issued by authorized bodies (chambers of commerce). Required to claim preferential tariff at destination.

India-UAE CEPA Deep Dive: Coverage: 80% of Indian tariff lines get preferential access. Immediate zero duty on many lines. Phased reduction on others. Key Sectors: Jewelry: Reduced duty provides significant advantage. Textiles: Preferential access to UAE market. Agriculture: Some products covered. Automotive: Gradual tariff reduction.

Services: Mode 3 (commercial presence) commitments. Mutual recognition arrangements. Professional services access. Compliance: Rules of origin certification. Bilateral safeguard provisions. Dispute resolution mechanism.

Leveraging FTAs for Services: Services Mode Coverage: Mode 1 (Cross-border): Remote delivery of services. Mode 2 (Consumption abroad): Client travels to India. Mode 3 (Commercial presence): Establishing presence in FTA country. Mode 4 (Movement of professionals): Personnel temporarily working abroad.

IT Services: Generally covered under Mode 1. Check specific commitments in each FTA. CEPA agreements typically favorable.

Practical Steps: Identify Applicable FTAs: Map your export destinations to FTA coverage. Check product/service coverage under each agreement.

Understand Rules of Origin: Determine qualifying criteria for your products. Ensure manufacturing/processing meets requirements.

Obtain Certificates: Identify issuing authority for each FTA. Process for Certificate of Origin. Documentation requirements.

Monitor Negotiations: Track FTAs under negotiation (UK, EU, Australia). Plan for future preferential access.',
        '["Map your export destinations to applicable FTAs - identify tariff benefits and services access under each agreement", "Understand rules of origin requirements for your products under relevant FTAs - ensure compliance for preferential treatment", "Establish Certificate of Origin process with appropriate chambers of commerce for FTA-covered exports", "Track FTA negotiations in progress (India-UK, India-EU, India-Australia) for future market access planning"]'::jsonb,
        '["India FTA Network Overview with country coverage, key benefits, and utilization guidance", "Rules of Origin Compliance Guide for major India FTAs with qualification criteria by product category", "Certificate of Origin Application Process by FTA with issuing authority contacts and documentation", "FTA Negotiation Tracker covering ongoing negotiations and expected timelines and benefits"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 45: Advance Authorization and EPCG
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        45,
        'Advance Authorization and EPCG',
        'Advance Authorization and EPCG schemes enable duty-free imports for export production. These powerful schemes can significantly reduce manufacturing costs for export-oriented businesses.

Advance Authorization: Purpose: Allow duty-free import of inputs for export production. Inputs must be physically incorporated in export product. Value addition and export obligation must be fulfilled.

Eligibility: Manufacturer exporters. Merchant exporters with supporting manufacturer. Jobbers producing for export.

Coverage: Raw materials. Components and parts. Consumables directly used. Packing materials.

Norms and Obligations: Standard Input Output Norms (SION): Pre-defined input quantities per unit of export. Published for various product categories. Self-declaration for items not covered.

Value Addition: Minimum 15% value addition required. Value addition = (Export value - Input value) / Export value.

Export Obligation: Complete export within 18 months (extendable). Obligation quantity/value specified in authorization. Non-fulfillment attracts duty payment with interest.

Application Process: Apply to DGFT Regional Authority. Submit details of inputs required and export products. Obtain authorization with specific quantities and validity.

Usage: Import inputs duty-free against authorization. Maintain import-export correlation records. File closure application after export obligation completion.

Advance Authorization for Annual Requirement: For Status Holders: Advance Authorization for annual estimated requirement. Based on previous export performance. Simplified procedure for regular exporters.

EPCG (Export Promotion Capital Goods): Purpose: Allow duty-free import of capital goods for export production. Promotes investment in export-oriented manufacturing.

Eligibility: Manufacturer exporters. Merchant exporters tied to supporting manufacturers. Service providers (for specified services).

Coverage: Capital goods for production. Spares up to 10% of capital goods value. Office equipment for specific sectors.

Export Obligation: 6 times the duty saved (on CIF value of capital goods). Fulfillment period: 6 years from authorization. Block-wise completion (50% in first half, 100% by end).

Specific Export Obligation: Must export products manufactured using the capital goods. Or export of other products if specifically permitted.

Application: Apply to DGFT Regional Authority. Submit project details and export projections. Obtain authorization specifying goods and obligation.

Compliance: Maintain records of capital goods and production. File annual reports on export obligation completion. File closure application after fulfillment.

Combined Strategy: Optimize Benefits: Use Advance Authorization for inputs. Use EPCG for capital goods. Combine with RoDTEP on exports. Compliance Management: Track multiple obligations. Plan production and exports to meet timelines. Maintain comprehensive documentation.

Risk Management: Export obligation fulfillment risk. Changes in business affecting exports. Currency fluctuations affecting values.

Practical Considerations: Scheme Selection: Advance Authorization: Frequent imports, established export patterns. EPCG: Capital investment, long-term export commitment. Cash vs Scheme: Consider working capital implications.

Documentation: Correlation between imports and exports. Production and usage records. Export documentation linking to authorization.

Professional Support: Consider licensed customs broker. DGFT consultant for complex applications. Regular compliance reviews.',
        '["Evaluate Advance Authorization eligibility based on your export product inputs and import requirements", "Calculate potential duty savings from EPCG scheme for planned capital goods imports against export obligation commitment", "Assess export obligation fulfillment capability before applying for duty exemption schemes - model export projections against obligations", "Establish documentation system for tracking imports against authorizations and maintaining export-import correlation records"]'::jsonb,
        '["Advance Authorization Application Guide with documentation requirements and DGFT filing process", "EPCG Scheme Benefits Calculator for modeling duty savings against export obligation commitment", "Export Obligation Management System for tracking multiple authorizations and compliance timelines", "SION (Standard Input Output Norms) Reference for common export products with input quantities"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Cross-Border Payments (Days 46-50)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Cross-Border Payments',
        'Master international payment collection and management - multi-currency billing, payment gateway selection, FX optimization, collection challenges, and treasury management for global operations.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 46: Global Payment Infrastructure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        46,
        'Global Payment Infrastructure',
        'Building effective global payment infrastructure enables efficient collection from customers worldwide. Understanding payment methods, gateway options, and regional preferences is essential for international revenue.

Payment Methods by Region: North America (US/Canada): Credit Cards: Dominant payment method (70%+). Visa, Mastercard, Amex. 2.5-3.5% processing fees. ACH (US): Bank transfers for recurring payments. Lower fees (0.5-1%). Slower settlement (3-5 days). Wire Transfers: For large transactions. Higher fees but immediate. Checks: Declining but still used by some enterprises.

Europe: Credit Cards: Common but lower usage than US (50-60%). Strong debit card culture. SEPA: Single Euro Payments Area bank transfers. Low cost, widely used in EU. iDEAL (Netherlands): Popular local payment method. Bank-based, real-time. Giropay (Germany): Bank-based payments. Open Banking: PSD2 driving innovation.

Middle East/MENA: Credit Cards: Growing usage. Cash on delivery: Still significant for e-commerce. Local Payment Methods: KNET (Kuwait), Benefit (Bahrain). Bank Transfers: Common for B2B.

Southeast Asia: Digital Wallets: GrabPay, GCash, OVO. Very high mobile payment adoption. Bank Transfers: Popular for B2B. Credit Cards: Lower penetration than West. Local Methods: PayNow (Singapore), PromptPay (Thailand).

Payment Gateway Selection: Major Global Gateways: Stripe: Best-in-class developer experience. Coverage: 46 countries. Fees: 2.9% + $0.30 (varies by country). Strengths: APIs, subscription billing, fraud prevention. Indian Payout: Available (previously challenging).

PayPal: Global recognition and trust. Coverage: 200+ countries. Fees: 2.9% + fixed fee (higher international). Limitations: Account holds, dispute handling.

Adyen: Enterprise-focused, complex integration. Coverage: Extensive global. Fees: Custom pricing, volume-based. Strengths: Unified commerce, risk management.

Braintree (PayPal): Good developer experience. Coverage: 45+ countries. Integrated PayPal support.

India-Specific Considerations: Razorpay: Domestic focus but international capabilities. Indian bank account settlement. Good for India-based companies.

Collection Strategy: Pricing Currency: Bill in customer''s currency (reduces friction). Consider major currencies: USD, EUR, GBP. INR for India/Indian diaspora.

Payment Method Offering: Offer locally preferred methods by region. Cards + ACH/SEPA minimum. Local methods for key markets.

Recurring vs One-Time: Subscription: Auto-charge reduces collection effort. Consider failed payment handling. One-Time: Simpler but collection risk.

Invoice Payments: Enterprise often pays on invoice. Net 30-60 terms common. Collection effort required.

Implementation Approach: Phase 1: Primary gateway for main market (Stripe for US). Phase 2: Add payment methods based on customer feedback. Phase 3: Optimize for local methods in key markets.

Considerations: Settlement Currency: Where do you want funds? Settlement timing by gateway. Multi-gateway complexity.

Fraud Prevention: Built-in tools in major gateways. Balance fraud blocking vs false declines. Regional fraud patterns differ.',
        '["Map payment method preferences by your target markets - identify must-have and nice-to-have payment options", "Evaluate payment gateways based on your market coverage needs, pricing, and integration capabilities", "Design payment infrastructure supporting multi-currency collection with appropriate settlement options", "Create payment method implementation roadmap prioritized by customer demand and market importance"]'::jsonb,
        '["Payment Method Preferences by Region covering cards, bank transfers, and local methods for 20+ countries", "Payment Gateway Comparison Matrix evaluating Stripe, PayPal, Adyen, and others on coverage, fees, and features", "Multi-Currency Payment Implementation Checklist for setting up global payment collection", "Fraud Prevention Best Practices for international payment collection by region"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 47: Multi-Currency Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        47,
        'Multi-Currency Management',
        'Operating internationally means dealing with multiple currencies for billing, collection, and operations. Effective multi-currency management minimizes FX losses and optimizes cash flow.

Currency Strategy: Billing Currency Decisions: Customer Preference: Billing in customer currency reduces friction. Price Anchoring: USD pricing may be preferred for SaaS. Currency Risk: Who bears FX fluctuation risk? Common Approaches: Bill in customer currency (you bear risk). Bill in USD (customer bears risk). Hybrid (local currency for key markets, USD for others).

Collection Currency: Same as Billing: Simplest approach. Gateway Conversion: Collect in billing currency, gateway converts. Multi-Currency Accounts: Hold multiple currencies.

Operating Currency: Expense Matching: Hold currency where expenses occur. INR for India operations. USD/local currency for foreign subsidiaries.

FX Exposure Types: Transaction Exposure: FX impact on specific transactions. Example: Invoice in EUR, payment in 30 days, EUR/INR moves. Hedging possible through forwards.

Translation Exposure: Impact on financial statement consolidation. Foreign subsidiary values translated to reporting currency. Accounting treatment varies.

Economic Exposure: Long-term impact of currency movements. Affects competitiveness in foreign markets.

FX Management Approaches: Natural Hedging: Match revenue and expense currencies. Example: USD revenue funds USD expenses. Reduces net exposure without cost.

Forward Contracts: Lock in exchange rate for future transaction. Available through banks. Requires credit facility or margin.

Options: Right but not obligation to exchange at rate. Premium cost for flexibility. Useful for uncertain cash flows.

No Hedging: Accept FX volatility. Appropriate for small/predictable exposures. Simpler but more volatile.

Practical Multi-Currency Setup: Bank Accounts: Open accounts in major currencies (USD, EUR, GBP). EEFC account for forex earnings retention in India. Foreign subsidiary accounts in local currency.

Payment Gateway: Configure to collect in customer currencies. Understand gateway conversion rates (often unfavorable). Consider local acquiring for better rates.

Accounting: Multi-currency accounting system. Track unrealized and realized FX gains/losses. Currency revaluation procedures.

FX Conversion Optimization: Bank Rates: Generally better for large conversions. Negotiate rates with relationship bank. Wire transfer costs vary.

Payment Gateway Rates: Convenient but often 1-3% spread. Compare to bank rates for large amounts.

FX Platforms: Wise (formerly TransferWise), OFX. Better rates than banks for some corridors. Useful for smaller, frequent conversions.

Timing: Consider rate trends for discretionary conversions. Avoid panic conversions.

Repatriation to India: FEMA Compliance: Export proceeds must be realized within 9 months. Repatriation documentation required.

Timing: Convert when rates favorable (within compliance window). Hold in EEFC if INR not immediately needed.

Cost Optimization: Compare bank wire costs. Consider timing of conversion.

Treasury Management: Cash Forecasting: Project cash needs by currency. Plan conversions in advance.

Working Capital: Maintain operating buffers in each currency. Avoid emergency conversions.

Policies: Document FX management policy. Define hedging approach and authority. Regular review of exposures.',
        '["Define currency strategy for billing (customer currency vs USD) based on customer preferences and your risk appetite", "Set up multi-currency bank accounts for major operating currencies - USD, EUR and others based on your market focus", "Evaluate FX conversion options comparing bank rates, payment gateway rates, and platforms like Wise for your transaction patterns", "Create FX management policy documenting hedging approach, conversion authorities, and exposure monitoring"]'::jsonb,
        '["Multi-Currency Strategy Framework for deciding billing, collection, and operating currency approaches", "FX Exposure Analysis Template for identifying and quantifying currency risks across operations", "Bank vs Gateway vs Platform FX Comparison for common currency pairs and transaction sizes", "Treasury Management Policy Template covering FX, cash management, and repatriation procedures"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 48-50: Continue Module 10 (abbreviated for space, following same pattern)
    -- Day 48: Collection Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        48,
        'Collection Optimization',
        'Effective collection processes minimize revenue leakage from failed payments, delayed invoices, and bad debt. Building robust collection infrastructure is essential for healthy international cash flow.

Collection Challenges: Payment Failures: Card declines (10-15% of recurring charges). Insufficient funds, expired cards, bank blocks. Different failure rates by country and card type. Invoice Non-Payment: Enterprise customers pay on terms. Extended payment cycles internationally. Collection effort for overdue invoices. Fraud and Chargebacks: Higher risk for international transactions. Chargeback costs and time. Country-specific fraud patterns.

Reducing Card Payment Failures: Card Updater Services: Automatically update expired card details. Stripe and others offer this feature. Recovers 5-10% of would-be failures.

Smart Retry Logic: Retry failed payments at optimal times. Consider bank processing windows. Avoid over-retrying (can cause blocks).

Dunning Automation: Automated emails for failed payments. Escalating communication sequence. Self-service card update links.

Multiple Payment Methods: Offer alternatives when card fails. ACH/SEPA backup for recurring. Prevent involuntary churn.

Invoice Collection Best Practices: Clear Payment Terms: Specify terms upfront (Net 30, Net 60). Include in contract and invoice. Late payment penalties (where enforceable).

Invoice Quality: All required details included. PO number if provided. Correct billing entity and address.

Payment Options: Wire transfer details clearly stated. Online payment portal link. Multiple currency acceptance.

Follow-Up Cadence: Reminder before due date. Follow-up on due date. Escalating communication post-due.

Collection Metrics: Days Sales Outstanding (DSO): Average time to collect invoices. Benchmark: 30-45 days for SaaS. Track trend and investigate increases.

Collection Effectiveness Index: Percentage of receivables collected. Target: 95%+ for healthy business.

Bad Debt Rate: Percentage written off as uncollectible. Target: Less than 1% of revenue.

Failed Payment Recovery Rate: Percentage of failed payments recovered. Target: 70%+ recovery through dunning.

Automation Tools: Subscription Billing: Chargebee, Recurly, Stripe Billing. Automated invoicing and collection. Dunning and retry built-in.

AR Automation: Invoiced, Tesorio, HighRadius. Invoice delivery and tracking. Collection workflow automation.

Payment Portals: Self-service payment options. Reduce manual collection effort.

International Collection Challenges: Time Zones: Follow-up timing across zones. Collection team coverage.

Cultural Factors: Payment culture varies by country. Relationship importance in some markets.

Currency and Banking: Wire transfer complexities. Correspondent bank delays.

Legal Enforcement: Cross-border debt recovery difficult. Prevention better than cure.',
        '["Analyze current payment failure rates by country and payment method - identify highest-impact improvement opportunities", "Implement dunning automation with email sequence, retry logic, and self-service card update for failed recurring payments", "Establish AR follow-up process for invoice customers with clear escalation timeline and responsibilities", "Set up collection metrics dashboard tracking DSO, collection rate, failed payment recovery, and bad debt"]'::jsonb,
        '["Collection Optimization Playbook covering payment failures, dunning, and invoice collection best practices", "Dunning Email Sequence Templates for failed payment recovery communication", "AR Follow-Up Cadence Template with timing and escalation for invoice collection", "Collection Metrics Dashboard Template with KPI definitions and benchmarks"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 49: International Treasury Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        49,
        'International Treasury Management',
        'Treasury management for international operations involves managing cash across entities, currencies, and jurisdictions while ensuring compliance and optimizing returns.

Multi-Entity Cash Management: Cash Visibility: Consolidated view of all bank accounts. Real-time balance monitoring. Cash position by currency and entity.

Cash Concentration: Pool cash for efficient management. Physical pooling: Move funds to central account. Notional pooling: Offset balances without movement.

Intercompany Funding: Fund subsidiaries from parent or holding. Intercompany loans (arm''s length interest). Capital contributions (ODI compliance for India).

Working Capital Management: Operating Cash: Maintain appropriate buffers by entity. Consider local payment cycles. Emergency liquidity provisions.

Cash Forecasting: Project cash needs by entity and currency. 13-week rolling forecast common. Scenario planning for variations.

Surplus Management: Short-term investment of excess cash. Consider jurisdiction restrictions. Balance return vs liquidity.

Bank Relationship Management: Multi-Bank Strategy: Relationship bank for primary services. Transaction banks for specific needs. Backup banks for resilience.

Service Negotiation: Negotiate fees and rates based on volume. Review annually. Compare to market benchmarks.

Technology: Online banking platforms. API integration for automation. Multi-bank connectivity.

Intercompany Transactions: Intercompany Loans: Parent funds subsidiary through loan. Interest must be arm''s length. Document loan agreement. India: ODI implications, interest withholding.

Management Fees: Charge for HQ services. Cost allocation or cost plus. Transfer pricing compliance.

Dividends: Repatriate profits to parent. Withholding tax implications. FEMA compliance for receipt in India.

Treasury Controls: Authorization Matrix: Who can authorize what amounts. Segregation of duties.

Payment Controls: Dual authorization for large payments. Verification procedures.

Reconciliation: Regular bank reconciliation. Intercompany balance reconciliation.

Reporting: Treasury reports to leadership. Cash position, FX exposure, liquidity.

Treasury Technology: Treasury Management Systems: For complex multi-entity operations. Cash visibility, forecasting, FX management. Examples: Kyriba, GTreasury, SAP Treasury.

ERP Integration: Accounting system integration. Automated reconciliation. Cash flow reporting.

Banking Platforms: Multi-bank connectivity. Payment initiation. Balance reporting.',
        '["Establish consolidated cash visibility across all entities and bank accounts - create daily/weekly cash position reporting", "Design intercompany funding structure with appropriate loan agreements and transfer pricing documentation", "Implement treasury controls including authorization matrix, payment verification, and reconciliation procedures", "Evaluate treasury management technology needs based on multi-entity complexity and transaction volumes"]'::jsonb,
        '["Multi-Entity Cash Management Framework covering visibility, concentration, and intercompany funding", "Intercompany Loan Agreement Template with arm''s length interest rate provisions", "Treasury Controls Checklist covering authorization, payment verification, and reconciliation procedures", "Cash Forecasting Model Template for 13-week rolling forecast by entity and currency"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 50: Payment Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        50,
        'Payment Compliance',
        'International payment compliance involves KYC, AML, sanctions screening, and regulatory requirements. Building compliant payment infrastructure protects against penalties and reputational risk.

Compliance Framework: Know Your Customer (KYC): Verify identity of customers. Business customers: Company registration, beneficial owners. Individual customers: ID verification. Risk-based approach (higher scrutiny for higher risk).

Anti-Money Laundering (AML): Monitor transactions for suspicious activity. Report suspicious transactions. Maintain records. AML officer designation.

Sanctions Compliance: Screen against sanctions lists. OFAC (US), UN, EU sanctions. Block prohibited transactions. Ongoing monitoring for changes.

Payment Gateway Compliance: Gateway Responsibilities: Payment gateways handle significant compliance. KYC on merchants (you). Transaction monitoring. Sanctions screening.

Your Responsibilities: Provide accurate information to gateway. Know your customers. Report suspicious activity you observe. Cooperate with gateway investigations.

Shared Compliance: Understand division of responsibilities. Gateway terms of service requirements. Prohibited activities and products.

India-Specific Payment Compliance: FEMA: Export proceeds realization within 9 months. Documentation for inward remittances. Purpose codes for all cross-border payments.

GST on Services: GST implications of payment service fees. Input credit where applicable.

TCS (Tax Collected at Source): On foreign remittances above threshold. LRS compliance for individuals.

High-Risk Indicators: Geography: High-risk countries (FATF grey/black list). Sanctioned countries (Iran, North Korea, etc.). Tax havens requiring scrutiny.

Transaction Patterns: Unusual transaction sizes. Rapid account activity changes. Structuring to avoid thresholds.

Customer Behavior: Reluctance to provide information. Complex ownership structures. Inconsistent business descriptions.

Compliance Program Elements: Policies and Procedures: Written compliance policies. Procedures for screening, monitoring, reporting. Regular updates for regulatory changes.

Training: Staff training on compliance requirements. Red flag recognition. Escalation procedures.

Monitoring: Transaction monitoring system. Alert investigation process. Suspicious activity reporting.

Record Keeping: Maintain records per regulatory requirements. Minimum 5 years typically. Accessible for regulatory inquiry.

Audit: Regular compliance audits. Internal or external review. Remediation of findings.

Working with Compliance Requirements: Payment Gateway Selection: Evaluate compliance capabilities. Understand gateway restrictions. Ensure coverage for your markets and products.

Customer Communication: Clear terms about prohibited activities. Collect necessary KYC information. Privacy-compliant data handling.

Incident Response: Plan for compliance incidents. Relationship with gateway compliance team. Legal counsel for serious matters.',
        '["Develop payment compliance policy covering KYC, AML, and sanctions screening appropriate to your business scale and risk profile", "Implement customer screening process including identity verification and sanctions checking for high-value customers", "Understand payment gateway compliance requirements and ensure your practices meet gateway terms of service", "Create compliance training for relevant team members covering red flag recognition and escalation procedures"]'::jsonb,
        '["Payment Compliance Policy Template covering KYC, AML, and sanctions requirements for international businesses", "Customer Screening Checklist for identity verification and risk assessment", "Sanctions Screening Guide covering OFAC, UN, and EU lists with screening tool options", "Compliance Incident Response Plan for handling compliance issues and gateway inquiries"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: International IP Protection (Days 51-55)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'International IP Protection',
        'Protect intellectual property globally - international patent strategies through PCT, global trademark protection via Madrid Protocol, trade secrets, IP licensing across borders, and enforcement strategies.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_11_id;

    -- Day 51: Global IP Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        51,
        'Global IP Strategy',
        'Intellectual property protection is territorial - rights in India do not automatically extend internationally. Building a global IP strategy aligned with business expansion protects competitive advantage.

IP Fundamentals for Global Business: Territorial Nature: IP rights are country-specific. Indian patent/trademark does not protect in US or EU. Must file separately in each target country. International treaties simplify but do not eliminate this.

IP Types: Patents: Protect inventions, processes, innovations. 20-year term from filing. Expensive to obtain and maintain globally.

Trademarks: Protect brand names, logos, slogans. Indefinite term with renewal. More affordable than patents globally.

Copyrights: Automatic protection in most countries. Software code protected as literary work. No registration required (but helpful).

Trade Secrets: Confidential business information. No registration, must maintain secrecy. Can be lost if disclosed.

Strategic Considerations: Business Alignment: Protect IP where you do business. Prioritize key markets and competitors. Balance cost vs protection value.

Filing Timing: Patents: File early (before public disclosure). Trademarks: Can file when entering market. 12-month priority period for patents after initial filing.

Budget Allocation: Patents: $10,000-50,000+ per country. Trademarks: $1,000-5,000 per country. Prioritize based on business value.

IP Portfolio Strategy: Offensive IP: Protect your innovations and brand. Create barriers for competitors. Enable licensing revenue.

Defensive IP: Freedom to operate in key markets. Counter-assertion capability. Cross-licensing leverage.

Portfolio Management: Regular review of IP assets. Abandon low-value registrations. Align with business direction.

Priority Market Selection: Factors to Consider: Market size and revenue potential. Competitor presence and activity. Manufacturing locations. Risk of infringement.

Typical Priorities for Indian Startups: US: Usually highest priority (market size, IP litigation culture). EU: Key markets within EU (Germany, UK, France). China: If manufacturing or selling there. India: Home market protection.

Cost-Benefit Analysis: Estimate IP costs per country. Estimate business value of protection. Select countries where benefit exceeds cost. Review annually as business evolves.

IP and International Structure: IP Ownership Location: Where should IP be owned? Tax implications of IP placement. Transfer pricing for IP licensing.

Considerations: India: R&D tax benefits, cost-effective management. Ireland/Netherlands: Favorable IP tax regimes. US: Close to US market and enforcement.

IP Holding Company: Centralized IP ownership. License to operating entities. Requires genuine substance.

Implementation Approach: Phase 1: Protect core trademarks in key markets. File patents for key innovations (if applicable). Establish trade secret practices.

Phase 2: Expand trademark portfolio as entering new markets. Evaluate patent filing in additional countries. Monitor for infringement.

Phase 3: Optimize IP structure for tax and operations. Consider IP holding company. Develop enforcement capabilities.',
        '["Inventory existing IP assets and identify protection gaps in current and planned markets", "Prioritize countries for IP protection based on business importance, competitor activity, and cost-benefit analysis", "Develop IP filing timeline aligned with market entry plans, considering 12-month priority periods for patents", "Create IP budget allocating resources across patents, trademarks, and trade secret protection by priority market"]'::jsonb,
        '["Global IP Strategy Framework for aligning IP protection with business expansion plans", "IP Priority Market Selection Matrix for evaluating countries based on business value and protection costs", "IP Cost Estimation Guide with typical patent, trademark, and maintenance costs by country", "IP Portfolio Review Template for annual assessment and optimization of IP assets"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 52: International Patents (PCT)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        52,
        'International Patents via PCT',
        'The Patent Cooperation Treaty (PCT) provides a streamlined process for seeking patent protection in multiple countries. Understanding PCT strategy enables cost-effective global patent protection.

PCT System Overview: What is PCT: International treaty with 150+ member countries. Single international application. Delays national filing decisions by 30 months. Does not grant international patent (still need national filings).

Benefits: More time to evaluate commercial potential. Unified search and examination. Cost deferral on national phase.

PCT Process: Phase 1 - International Filing: File PCT application with receiving office (Indian Patent Office for India filers). Claims priority from earlier national application (within 12 months). Single application, single fee.

Phase 2 - International Search: International Searching Authority (ISA) conducts search. ISR (International Search Report) identifies prior art. Written Opinion on patentability.

Phase 3 - Publication: Application published at 18 months from priority. Provides notice to competitors.

Phase 4 - International Preliminary Examination (Optional): Additional examination before national phase. Opportunity to amend claims. IPRP (International Preliminary Report on Patentability).

Phase 5 - National Phase Entry: Enter national phase by 30 months from priority. File in each target country separately. Each country examines and grants independently.

Cost Structure: International Phase: Filing fee: ~CHF 1,330 (Indian applicant gets 90% reduction). Search fee: ~INR 10,000-45,000 depending on ISA. Preliminary examination: Additional ~INR 10,000-25,000. Total international phase: ~$1,000-3,000.

National Phase (Per Country): Filing and examination: $5,000-20,000 per country. Attorney fees: $2,000-10,000 per country. Translation costs: $2,000-5,000 per country (non-English). Total: $10,000-50,000 per country.

Typical 5-Country Strategy: PCT international + US, EU, China, Japan, India. Estimated cost: $100,000-200,000 over patent lifecycle.

Strategic Decisions: Countries to Enter: Evaluate at 30-month mark. Consider: Market size, competitor activity, enforcement capability, cost. Can still decide not to proceed (abandon PCT).

Claims Strategy: Different claims for different countries (within scope). Adapt to local examination practice. Continuation applications for ongoing protection.

Timing: Balance early filing (priority) vs development time. Provisional applications can establish priority. 12-month convention priority window.

PCT vs Direct National: PCT Advantages: Time to decide (30 months). Unified search provides guidance. Cost deferral.

Direct National Advantages: Faster grant in target country. Lower cost if few countries. When immediate protection needed.

India Patent Filing: Indian Patent Office: PCT receiving office for India filers. Reduced fees for Indian applicants.

India as ISA: Can designate India as searching authority. Cost-effective search.

National Phase in India: 31 months deadline (1 month more than standard). Expedited examination available.',
        '["Evaluate PCT filing strategy for key innovations - determine whether PCT international application or direct national filing is appropriate", "Calculate PCT cost estimates including international phase and national phase entry for priority countries", "Create PCT filing timeline accounting for 12-month priority window and 30-month national phase entry deadline", "Identify claims strategy adapting to examination practices in target countries while maintaining core protection scope"]'::jsonb,
        '["PCT Filing Guide with step-by-step process, forms, and timeline from international to national phase", "PCT Cost Calculator estimating international and national phase costs by country combination", "PCT vs Direct National Decision Framework for evaluating optimal filing strategy", "National Phase Entry Requirements by country covering deadlines, fees, and documentation needs"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 53-55: Continue Module 11 (abbreviated)
    -- Day 53: Global Trademark Protection (Madrid Protocol)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        53,
        'Global Trademarks via Madrid Protocol',
        'The Madrid Protocol enables efficient international trademark registration through a single application. Understanding the system enables cost-effective brand protection globally.

Madrid System Overview: What is Madrid Protocol: International trademark registration system. 130+ member countries. Single application through home country office. Centralized management of multi-country registrations.

Benefits: Cost-effective multi-country filing. Simplified administration. Centralized renewal and changes. Faster than direct national filings.

Madrid Process: Step 1 - Base Application/Registration: Must have Indian trademark application or registration (base mark). Forms foundation for international application.

Step 2 - International Application: File through Indian IP Office (CGPDTM). Designate target countries. Single application, single fee payment.

Step 3 - WIPO Processing: WIPO (World IP Organization) reviews formalities. Publishes in WIPO Gazette. Forwards to designated countries.

Step 4 - National Examination: Each designated country examines locally. Can refuse within 12-18 months. Silence means acceptance.

Step 5 - Registration: WIPO records international registration. Protection in accepted countries. 10-year term, renewable.

Cost Structure: Basic Fee: CHF 653 for black/white mark. CHF 903 for color mark. Supplementary Fee: ~CHF 100 per class beyond first.

Individual Designation Fees: Varies by country. US: ~$400 per class. EU: ~$900 for up to 3 classes. China: ~$250 per class.

Typical 5-Country Cost: US, EU, UK, China, Australia. Approximately $3,000-5,000 total. Compared to $10,000+ for direct filings.

Strategic Considerations: Dependency on Base Mark: First 5 years, international registration dependent on base mark. If base mark cancelled, international registration fails. Central attack vulnerability.

Goods/Services: Cannot expand beyond base mark scope. Ensure base mark covers all intended goods/services.

Country Selection: Select countries aligned with business plans. Can add countries later (subsequent designation).

Madrid vs Direct National: Madrid Advantages: Lower cost for multiple countries. Centralized management. Faster filing process.

Direct National Advantages: Independence from base mark. More flexibility in prosecution. May be faster in specific countries. Preferred when only 1-2 countries.

India as Origin Country: Filing through CGPDTM. Designate India as member since 2013. Indian attorneys can file.

Implementation Steps: Ensure Base Mark: File Indian trademark application if not done. Cover all intended goods/services.

Select Countries: Prioritize based on business operations. Consider competitor activity.

File International Application: Through Indian IP Office. Professional assistance recommended.

Monitor Prosecution: Respond to any office actions. Track acceptance in each country.',
        '["Conduct comprehensive trademark search in target markets before Madrid filing to identify conflicts", "Ensure Indian base trademark application covers all goods/services classes needed for international designations", "Select countries for Madrid designation based on market entry plans, competitor presence, and cost-benefit analysis", "File Madrid Protocol application through Indian IP Office with appropriate country designations and class coverage"]'::jsonb,
        '["Madrid Protocol Filing Guide with step-by-step process and forms for filing from India", "Madrid System Cost Calculator for estimating fees by country designation and class", "Trademark Search Strategy Guide for clearing marks in multiple jurisdictions before filing", "Madrid vs Direct Filing Decision Framework for evaluating optimal trademark filing approach"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 54: Trade Secrets and IP Agreements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        54,
        'Trade Secrets and IP Agreements',
        'Trade secrets protect confidential business information without registration. Combined with robust IP agreements, they form essential protection for international operations.

Trade Secret Protection: What Qualifies as Trade Secret: Information not generally known. Derives economic value from secrecy. Subject to reasonable efforts to maintain secrecy. Examples: Source code, algorithms, customer lists, processes, formulas.

Protection Measures: Physical Security: Access controls to facilities. Secure document storage. Visitor protocols.

Technical Security: Access controls to systems. Encryption of sensitive data. Audit trails for access.

Contractual Protection: NDAs with employees and contractors. Confidentiality provisions in agreements. Non-compete clauses (where enforceable).

Policies and Training: Trade secret identification and marking. Employee training on handling. Exit procedures for departing employees.

International Considerations: Varying Levels of Protection: US: DTSA provides federal protection. EU: Trade Secrets Directive harmonizes protection. India: Common law protection, specific statute limited. China: Improving protection but enforcement challenging.

Cross-Border Transfers: Limit transfer of trade secrets to what''s necessary. Contractual protections for recipients. Consider jurisdiction for disputes.

IP Agreements for International Operations: Employee IP Agreements: Assignment: Employees assign IP created to company. Works for Hire: Company owns as employer. Confidentiality: Obligations during and after employment. Non-Compete: Restrictions vary significantly by jurisdiction.

Contractor IP Agreements: Clear Assignment: Must be explicit (no automatic assignment). Work Product: Define what is covered. Background IP: Address contractor''s pre-existing IP. Confidentiality: Protect shared information.

Customer/Partner Agreements: License Terms: What rights granted. Restrictions: Limitations on use. Feedback: Ownership of suggestions/improvements. Confidentiality: Mutual protections.

International IP Assignment: Assignability: IP can be assigned to different entity. Transfer Pricing: Fair market value for IP transfers. Documentation: Written assignment agreements. Formalities: Registration requirements in some countries.

Key Agreement Provisions: IP Ownership: Clear statement of ownership. Assignment language for future IP. Coverage of all relevant IP types.

Confidentiality: Definition of confidential information. Permitted disclosures. Survival period post-termination.

Enforcement: Governing law selection. Jurisdiction for disputes. Remedies (injunction, damages).

Jurisdiction-Specific Considerations: US: Strong enforcement, broad restrictive covenants in most states (not California). UK/EU: Moderate non-compete enforcement, GDPR implications. India: Non-competes post-employment generally unenforceable.

Best Practices: Consistent Frameworks: Standard templates adapted for local law. Consistent policies globally where possible. Regular review and updates.

Employee Onboarding: IP agreement execution at hiring. Training on obligations. Clear communication of expectations.

Exit Procedures: Return of company materials. Reminder of ongoing obligations. Exit interview on confidentiality.',
        '["Implement comprehensive trade secret protection program covering identification, marking, access controls, and handling procedures", "Update employee IP agreements ensuring proper assignment language and confidentiality provisions compliant with local employment law", "Create contractor IP agreement template with clear assignment, work product definition, and background IP provisions", "Develop exit procedures for departing employees including material return, obligation reminders, and transition planning"]'::jsonb,
        '["Trade Secret Protection Program Framework covering identification, security measures, and enforcement", "Employee IP Agreement Template with jurisdiction-specific variations for US, UK, EU, and India", "Contractor IP Agreement Template with clear assignment and background IP provisions", "Exit Procedure Checklist for protecting trade secrets when employees depart"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 55: IP Enforcement and Licensing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        55,
        'IP Enforcement and Licensing',
        'Protecting IP rights requires active monitoring and enforcement. Additionally, IP licensing can create revenue streams and support international expansion strategies.

IP Monitoring and Enforcement: Monitoring: Trademark Watch: Monitor new trademark filings for conflicts. Watch services: WIPO, national offices, commercial providers. Cost: $200-1,000 per mark per year.

Patent Watch: Monitor competitor patents. Technology landscape monitoring. Freedom to operate analysis.

Online Monitoring: Domain name registrations. App store listings. Marketplace counterfeits. Social media infringement.

Enforcement Options: Cease and Desist Letters: First step for most infringement. Formal notice of rights. Demand to stop infringement. Often effective for unintentional infringement.

UDRP (Domain Disputes): For domain name disputes. WIPO arbitration process. Faster and cheaper than litigation.

Takedown Notices: DMCA for copyright infringement (US). Platform-specific processes. Amazon Brand Registry, Google IP tools.

Litigation: Court proceedings for serious infringement. Expensive and time-consuming. May be necessary for willful infringement.

Customs Recordation: Register trademarks/patents with customs. Enable seizure of infringing imports. Available in most countries.

Enforcement Strategy: Prioritization: Focus on material infringement. Consider business impact. Proportionate response.

Documentation: Evidence preservation. Infringement documentation. Communication records.

Professional Support: IP attorneys in relevant jurisdictions. Investigation services if needed. Coordination for multi-jurisdiction enforcement.

IP Licensing: Licensing Types: Exclusive License: Only licensee can use IP in territory. Non-Exclusive License: Multiple licensees permitted. Sole License: Licensor and one licensee only.

License Terms: Scope: What IP, what uses, what territory. Duration: Term and renewal. Fees: Royalties, lump sums, minimums. Quality Control: Maintain trademark validity. Sublicensing: Rights to sublicense.

International Licensing Considerations: Withholding Taxes: Royalties subject to withholding. Treaty rates may reduce. Gross-up provisions.

Transfer Pricing: Arm''s length royalty rates. Documentation requirements. See Module 6 on transfer pricing.

Registration: License registration required in some countries. May affect enforceability.

Intercompany Licensing: Parent to subsidiary licensing. IP holding company structures. Substance requirements for IP holding.

License Agreement Essentials: Grant Clause: Clear definition of licensed rights. Royalties: Rate, calculation, payment terms. Reports: Licensee reporting obligations. Quality Control: Standards, inspection rights. Termination: Conditions and consequences. Infringement: Obligations to report, right to enforce.

Practical Implementation: License Management: Track all licenses. Monitor compliance and payments. Renewal and termination tracking.

Royalty Collection: Invoice and collection process. Audit rights exercise. Withholding tax compliance.

Quality Monitoring: Ensure trademark quality control. Product/service standards. Brand protection.',
        '["Implement IP monitoring program including trademark watch, patent monitoring, and online infringement detection", "Develop enforcement response protocol with graduated actions from cease and desist through litigation", "Create IP license agreement template covering grant, royalties, quality control, and termination provisions", "Establish license management system for tracking agreements, royalty collection, and compliance monitoring"]'::jsonb,
        '["IP Monitoring Program Framework covering trademark watch, patent monitoring, and online surveillance", "Enforcement Response Playbook with decision tree and template communications for different infringement scenarios", "IP License Agreement Template with comprehensive terms for domestic and international licensing", "License Management System Checklist for tracking agreements, payments, and compliance obligations"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'All 11 modules created successfully for P30: International Expansion';

END $$;

COMMIT;
