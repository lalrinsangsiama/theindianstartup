-- THE INDIAN STARTUP - P6: Sales & GTM in India - Enhanced Content (Part 1: Modules 1-5)
-- Migration: 20260204_006_p6_sales_gtm_enhanced.sql
-- Purpose: Enhanced P6 with 500-800 word briefContent, 4 actionItems, 4 resources per lesson
-- India-specific: Enterprise sales cycles, regional languages, tier-2/3 strategies, GST, payment terms, GeM portal

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_module_1_id TEXT;
    v_module_2_id TEXT;
    v_module_3_id TEXT;
    v_module_4_id TEXT;
    v_module_5_id TEXT;
BEGIN
    -- Get or create P6 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P6',
        'Sales & GTM in India',
        'Transform into a revenue-generating machine with India''s most comprehensive sales and go-to-market course. Master market assessment, customer segmentation across tier cities, consultative selling for Indian buyers, pricing strategies with GST optimization, and channel development including GeM portal for government sales. Navigate longer enterprise sales cycles, regional language considerations, and 30-90 day payment terms common in Indian B2B.',
        6999,
        false,
        60,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P6';
    END IF;

    -- Clean existing modules and lessons for P6
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: India Market Assessment & GTM Strategy (Days 1-6)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'India Market Assessment & GTM Strategy',
        'Master market sizing for India including TAM/SAM/SOM calculations, understand the unique characteristics of Indian markets across regions and sectors, and develop a comprehensive go-to-market strategy tailored for Indian business dynamics.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Understanding India''s Market Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Understanding India''s Market Landscape',
        'India represents one of the world''s most complex and rewarding markets for sales professionals. With a GDP of $3.7 trillion and projected to become the third-largest economy by 2027, India offers massive opportunities alongside unique challenges that require specialized go-to-market approaches. Understanding this landscape is foundational to building a successful sales engine.

The Indian market operates across multiple dimensions simultaneously. The formal economy coexists with an informal sector estimated at 40% of GDP. Urban India with 500 million people contrasts sharply with rural India''s 900 million. English-speaking professionals in metros work alongside vernacular-first businesses in tier-2/3 cities. This diversity means no single sales approach works universally.

India''s business ecosystem comprises distinct segments requiring different strategies. Large enterprises (revenue above Rs 500 crore) number approximately 8,000 companies but control significant purchasing power. Mid-market companies (Rs 50-500 crore) represent about 50,000 businesses with growing technology adoption. SMBs (Rs 1-50 crore) encompass 6.3 crore MSMEs, the backbone of Indian commerce. Micro-businesses (below Rs 1 crore) number over 6 crore, increasingly digitizing through UPI and GST compliance.

Regional economic variations shape market potential. Maharashtra contributes 14% of India''s GDP with Mumbai as the financial hub. Tamil Nadu and Karnataka together contribute 15%, with Bangalore as the technology capital. Gujarat at 8% GDP leads in manufacturing and trade. Uttar Pradesh, despite lower per-capita income, has the largest population and rapidly growing consumption. These variations demand region-specific market sizing and sales strategies.

Industry concentration patterns guide targeting decisions. IT services cluster in Bangalore, Hyderabad, Pune, and Chennai. Manufacturing concentrates in Gujarat, Maharashtra, and Tamil Nadu. Financial services center in Mumbai with growing presence in GIFT City. Pharmaceuticals thrive in Hyderabad and Ahmedabad. Agricultural businesses dominate Punjab, Haryana, and Madhya Pradesh. Understanding these patterns helps prioritize geographic expansion.

Government as a customer represents a distinct opportunity. Central and state governments together spend over Rs 40 lakh crore annually. The Government e-Marketplace (GeM) has processed Rs 3 lakh crore in transactions, democratizing government procurement. Public sector undertakings (PSUs) number over 300 with significant technology and services budgets. Defense procurement follows specialized DPSU channels with unique compliance requirements.',
        '[
            {"title": "Map India market segments", "description": "Create a detailed map of your target market across enterprise, mid-market, SMB, and micro-business segments with estimated counts and characteristics in your industry"},
            {"title": "Analyze regional potential", "description": "Rank top 10 states by market potential for your product considering GDP contribution, industry concentration, and competitive presence"},
            {"title": "Identify sector concentrations", "description": "Document which industries and sectors have highest demand for your solution and where they are geographically concentrated"},
            {"title": "Research government opportunity", "description": "Evaluate GeM portal relevance, identify applicable PSUs, and assess government procurement potential for your offering"}
        ]'::jsonb,
        '[
            {"title": "MOSPI State GDP Data", "url": "https://mospi.gov.in/", "type": "government"},
            {"title": "GeM Portal Statistics", "url": "https://gem.gov.in/", "type": "government"},
            {"title": "MSME Annual Report", "url": "https://msme.gov.in/", "type": "government"},
            {"title": "RBI State-wise Economic Data", "url": "https://rbi.org.in/", "type": "data"}
        ]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: TAM/SAM/SOM for Indian Markets
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'TAM/SAM/SOM for Indian Markets',
        'Market sizing in India requires adapting global frameworks to account for unique local factors including the large informal economy, regional price variations, and different adoption curves across customer segments. Accurate TAM/SAM/SOM analysis grounds your GTM strategy in reality rather than inflated projections that mislead both teams and investors.

Total Addressable Market (TAM) represents the entire revenue opportunity if you achieved 100% market share. In India, TAM calculation must account for the informal economy that doesn''t appear in official statistics. For B2B products, start with industry reports from NASSCOM, IBEF, or sector associations. For B2C, use NSSO consumption surveys and private research. Always triangulate multiple sources since single-source estimates often vary by 30-50%.

Top-down TAM calculation uses industry data narrowed to your segment. Example: India''s overall SaaS market is $12 billion. HR tech represents 8% or $960 million. SMB-focused HR tech is 40% of that or $384 million. This becomes your TAM. The weakness of top-down is reliance on available data and category definitions that may not match your specific offering.

Bottom-up TAM calculation builds from unit economics upward. Count potential customers in your target segment. Multiply by your expected average contract value. Example: 6.3 crore MSMEs in India, 20% have 10+ employees (1.26 crore), 30% of those use any software (37.8 lakh). At Rs 50,000 ACV, TAM is Rs 18,900 crore. Bottom-up is more credible but requires defensible assumptions about market size and willingness to pay.

Serviceable Available Market (SAM) narrows TAM to what you can realistically address given your business model, geography, and go-to-market capabilities. If you only sell in English and target metros, your SAM might be 15% of TAM. If you require on-ground implementation, geography limits SAM significantly. SAM should reflect honest assessment of your reach constraints.

Serviceable Obtainable Market (SOM) is what you can capture in 1-3 years given competition and resources. New entrants typically target 1-5% of SAM initially. SOM calculation considers: competitive intensity, sales capacity, marketing budget, and product maturity. A realistic SOM for a seed-stage startup might be Rs 5-20 crore annually even in large markets.

India-specific adjustments include: Price point differential (Indian pricing typically 60-80% lower than US/Europe for same products), longer sales cycles (2-3x Western markets for enterprise), higher customer acquisition costs in vernacular markets, and seasonal variations (Q4 government spending surge, Q1 budget freezes, festival-season consumer peaks).',
        '[
            {"title": "Calculate top-down TAM", "description": "Using 3+ industry sources, calculate TAM for your market segment with clear methodology and assumption documentation"},
            {"title": "Calculate bottom-up TAM", "description": "Build bottoms-up TAM from customer count, addressable percentage, and realistic ACV for Indian market with pricing research"},
            {"title": "Define SAM constraints", "description": "Document specific constraints that limit your addressable market: geography, language, segment focus, channel limitations"},
            {"title": "Project realistic SOM", "description": "Calculate 12-month and 36-month SOM based on sales capacity, competitive analysis, and go-to-market investment plans"}
        ]'::jsonb,
        '[
            {"title": "NASSCOM Industry Reports", "url": "https://nasscom.in/knowledge-center/", "type": "report"},
            {"title": "IBEF Sector Reports", "url": "https://www.ibef.org/", "type": "report"},
            {"title": "Inc42 Market Size Data", "url": "https://inc42.com/datalab/", "type": "data"},
            {"title": "RedSeer Market Research", "url": "https://redseer.com/", "type": "report"}
        ]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Indian Business Culture & Decision Making
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Indian Business Culture & Decision Making',
        'Success in Indian markets requires deep understanding of business culture and decision-making patterns that differ significantly from Western norms. Relationship-building, hierarchy respect, and consensus-seeking shape how deals progress. Adapting your sales approach to these cultural realities dramatically improves conversion rates and deal velocity.

Relationship-first business culture defines Indian commerce. Unlike transaction-focused Western markets, Indian buyers invest significant time in understanding vendors before committing. Personal rapport often matters more than product features. Multiple meetings, often including social elements like meals, precede serious business discussions. Attempting to rush this process typically backfires with prospects disengaging or ghosting.

Hierarchy and decision authority follow distinct patterns. In family-owned businesses (comprising 85% of Indian companies), the promoter or family patriarch often makes final decisions regardless of formal titles. In professional enterprises, decisions involve multiple stakeholders with informal influencers carrying significant weight. Understanding the real decision-maker versus the formal contact is critical for enterprise sales.

Consensus-building extends timelines considerably. Indian organizations prefer decisions that all stakeholders can support rather than top-down mandates. A CTO may love your product but won''t push forward without finance and operations alignment. This consensus culture means enterprise sales cycles of 6-18 months are normal, compared to 3-9 months in Western markets. Budget planning and patience for multiple stakeholder meetings are essential.

Trust signals that resonate in India include: existing customer references (especially well-known brands), longevity in market (new vendors face skepticism), physical presence (office in India signals commitment), and team pedigree (IIT/IIM backgrounds carry weight). Social proof through industry awards, media coverage, and association memberships also builds credibility.

Communication styles require adaptation. Direct criticism is avoided; negative feedback comes indirectly or not at all. "We will consider it" often means no. Head wobbles can mean yes, no, or maybe depending on context. Written follow-ups after verbal agreements are essential as verbal commitments may not translate to action. Building ability to read between the lines improves deal forecasting.

Regional cultural variations affect sales approaches. North Indian business tends to be more relationship-driven with hospitality expectations. South Indian businesses often prefer detailed technical evaluation. Western India (Gujarat, Maharashtra) emphasizes commercial terms and value. Understanding these regional nuances helps customize approaches for different geographies.',
        '[
            {"title": "Map stakeholder dynamics", "description": "For your target customer segment, document typical decision-making structure including formal authority, informal influencers, and consensus requirements"},
            {"title": "Build trust signal inventory", "description": "List all trust signals you can leverage: customer logos, team credentials, certifications, media mentions, physical presence, partnerships"},
            {"title": "Create relationship timeline", "description": "Design realistic relationship-building timeline for your target segment accounting for multiple meetings, social interactions, and consensus-building"},
            {"title": "Develop regional playbooks", "description": "Document cultural considerations and adjusted approaches for your top 5 target states or regions"}
        ]'::jsonb,
        '[
            {"title": "Harvard Business Review - India Business Culture", "url": "https://hbr.org/", "type": "article"},
            {"title": "Doing Business in India Guide", "url": "https://www.investindia.gov.in/", "type": "guide"},
            {"title": "FICCI Business Insights", "url": "https://ficci.in/", "type": "report"},
            {"title": "CII Industry Resources", "url": "https://www.cii.in/", "type": "association"}
        ]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: GTM Strategy Framework for India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'GTM Strategy Framework for India',
        'Go-to-market strategy in India must account for market diversity, infrastructure variations, and resource constraints that differ from Western playbooks. A well-designed GTM framework balances market opportunity against execution complexity, prioritizing segments and geographies where you can win decisively before expanding.

The beachhead strategy is essential for Indian market entry. Rather than spreading thin across all segments and regions, concentrate resources on a narrow target where you can achieve market leadership. Successful beachheads share characteristics: clearly defined customer profile, accessible through concentrated channels, referenceable wins create momentum, and economics support profitable unit economics.

Geographic sequencing typically follows a pattern. Most B2B companies start with Bangalore (tech hub, early adopters), Mumbai (financial capital, large enterprises), or Delhi NCR (government, diverse industries). Expansion proceeds to tier-1 cities (Pune, Hyderabad, Chennai, Kolkata) before tier-2 cities. Each expansion requires infrastructure investment in sales presence, support capability, and partner relationships.

Segment sequencing considers multiple factors. Enterprise sales require more investment but yield larger deals and references. Mid-market offers faster sales cycles but lower ACVs. SMB scales through digital channels but faces higher churn. Most successful Indian SaaS companies started mid-market, built references, then moved enterprise while adding self-serve for SMB.

Channel strategy must align with segment targeting. Enterprise requires direct sales with solution selling capability. Mid-market can blend direct sales with inside sales. SMB demands digital-first acquisition with partners for implementation. Micro-business relies on channel partners, marketplaces, and self-serve. Trying to serve all segments with one channel model fails consistently.

India-specific GTM considerations include: Vernacular markets require localized product and support, adding significant cost. Government sales through GeM follow different timelines and compliance requirements. Channel partner economics must account for 15-40% margins typical in Indian distribution. Cash flow management becomes critical given 30-90 day payment terms common in Indian B2B.

GTM metrics for India should be calibrated appropriately. Sales cycle benchmarks: SMB 1-3 months, mid-market 3-6 months, enterprise 6-18 months. CAC payback in India often runs 18-24 months for enterprise versus 12-18 months in Western markets. Logo retention may matter more than revenue retention in early stages given lower ACVs.',
        '[
            {"title": "Define beachhead market", "description": "Specify your beachhead with precise criteria: industry vertical, company size, geography, use case, and buyer persona that you will dominate first"},
            {"title": "Create geographic expansion plan", "description": "Map 24-month geographic expansion sequence with trigger metrics for each expansion phase and required investments"},
            {"title": "Design segment strategy", "description": "Document target segments with prioritization, channel approach for each, and sequencing logic based on your current capabilities"},
            {"title": "Build GTM metrics dashboard", "description": "Define key GTM metrics with India-appropriate benchmarks for sales cycle, CAC, payback period, and conversion rates by segment"}
        ]'::jsonb,
        '[
            {"title": "SaaSBoomi GTM Playbooks", "url": "https://saasboomi.com/", "type": "community"},
            {"title": "Bessemer India Cloud Index", "url": "https://www.bvp.com/", "type": "report"},
            {"title": "Matrix Partners India Insights", "url": "https://www.matrixpartners.in/", "type": "insights"},
            {"title": "Accel India Resources", "url": "https://www.accel.com/", "type": "insights"}
        ]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Competitive Positioning in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Competitive Positioning in India',
        'Competitive positioning in India requires understanding multiple competitive layers: global players with India presence, well-funded Indian startups, legacy solution providers, and the ever-present "jugaad" alternative of manual workarounds. Effective positioning creates clear differentiation that resonates with Indian buyer priorities.

The Indian competitive landscape has unique characteristics. Global SaaS companies often struggle with India pricing expectations and support requirements. Well-funded Indian startups can sustain losses longer, competing aggressively on price. Legacy players (often system integrators or traditional software) have deep enterprise relationships. Spreadsheets, WhatsApp groups, and manual processes remain the biggest competitors for many categories.

Competitive analysis framework for India should map competitors across dimensions that matter to Indian buyers: Price positioning (Indian buyers are highly price-sensitive; understand competitor pricing and discount practices), Local support (24x7 IST support, vernacular capability, on-site availability), Implementation complexity (Indian companies often have limited IT resources), Integration with India Stack (GST, Aadhaar, UPI, banking integrations), Reference customers (logos that resonate locally carry more weight than global references).

Differentiation strategies that work in India include: India-first product design (built for Indian use cases, not adapted global product), Superior local support (WhatsApp-based support, regional language capability), Compliance expertise (GST, labor laws, industry-specific regulations), Ecosystem integrations (Tally, busy, Indian banks, government portals), and Flexible commercial terms (monthly billing, INR pricing, credit terms).

Positioning against global competitors leverages: Local presence and commitment to Indian market, understanding of Indian business processes and compliance, competitive pricing without currency risk, faster response times in IST, and relevant local customer references. Many Indian enterprise buyers prefer local vendors who will be responsive and available.

Positioning against funded Indian startups focuses on: Product maturity and stability, sustainable business model (not dependent on VC subsidies), customer success track record, and long-term partnership approach. Some buyers specifically avoid VC-funded companies fearing discontinuation or acquisition.

Competitive intelligence in India comes from: Customer conversations (buyers often reveal competitive dynamics), Partner channels (distributors know competitor activities), Industry events (NASSCOM, SaaSBoomi, sector conferences), Job postings (reveal competitor expansion plans), MCA filings (annual reports show financial health), and media monitoring (funding announcements, customer wins).',
        '[
            {"title": "Map competitive landscape", "description": "Create comprehensive competitor map including global players, Indian startups, legacy providers, and manual alternatives with positioning analysis"},
            {"title": "Build competitive battlecards", "description": "Develop detailed battlecards for top 5 competitors covering strengths, weaknesses, pricing, and recommended positioning against each"},
            {"title": "Identify differentiation pillars", "description": "Define 3-5 differentiation pillars that are defensible, relevant to Indian buyers, and clearly superior to competitive alternatives"},
            {"title": "Set up competitive intelligence", "description": "Establish ongoing competitive monitoring through customer feedback, partner insights, job tracking, and media alerts"}
        ]'::jsonb,
        '[
            {"title": "Tracxn Competitor Analysis", "url": "https://tracxn.com/", "type": "data"},
            {"title": "Crunchbase India Companies", "url": "https://www.crunchbase.com/", "type": "data"},
            {"title": "LinkedIn Competitor Tracking", "url": "https://www.linkedin.com/", "type": "tool"},
            {"title": "MCA Company Filings", "url": "https://www.mca.gov.in/", "type": "government"}
        ]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 6: GTM Planning & Resource Allocation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        6,
        'GTM Planning & Resource Allocation',
        'Translating GTM strategy into executable plans requires realistic resource allocation considering Indian cost structures, talent availability, and market development timelines. Effective planning balances ambition with pragmatism, building infrastructure systematically rather than overextending resources across too many initiatives.

Sales team sizing and structure follows market realities. Indian enterprise sales productivity averages Rs 1-2 crore per AE annually (lower than US benchmarks of $500K-1M). Inside sales can achieve Rs 30-50 lakh per rep for mid-market. SMB can be served by hybrid roles or channel partners. Typical ramp time is 6-9 months for enterprise AEs in India. These benchmarks inform hiring plans and revenue projections.

Sales compensation in India differs from Western models. Base to variable ratio typically runs 70:30 or 60:40 (more base-heavy than US). Total on-target earnings for enterprise AE: Rs 15-30 lakh in Bangalore, Rs 12-25 lakh in other metros, Rs 8-18 lakh in tier-2 cities. Sales managers command 30-50% premium over AEs. Variable compensation should align with longer sales cycles through quarterly or semi-annual measurement periods.

Marketing resource allocation requires India-specific considerations. Digital marketing costs have risen significantly; Google Ads CPC in competitive categories reaches Rs 200-500. LinkedIn InMail costs Rs 100-150 per message. Content marketing works well but requires consistent investment over 12-18 months. Events remain effective for enterprise; budget Rs 3-5 lakh per major conference sponsorship. Allocate 20-30% of marketing budget for experimentation.

Customer success investment is often underestimated. Indian customers expect high-touch support even at lower price points. Support costs run 15-25% of revenue for enterprise products. Implementation services may need to be included in pricing for complex solutions. Building vernacular support capability multiplies costs but expands addressable market.

Partner ecosystem investment enables scale. Channel partner recruitment requires dedicated resources. Partner margins in India range 15-40% depending on value-add. Expect 6-12 months to develop productive partner relationships. Technology partnerships with complementary products can accelerate pipeline. ISV partnerships with platforms like Zoho, Freshworks, or Tally provide distribution leverage.

Financial planning must account for Indian payment realities. DSO (Days Sales Outstanding) in India averages 60-90 days for enterprise, 30-45 days for SMB. Working capital requirements are higher than Western markets. Factor GST cash flow impact (18% held until customer pays). Budget for collection efforts including professional dunning services if selling to challenging segments.',
        '[
            {"title": "Build sales capacity model", "description": "Create detailed sales team plan with hiring timeline, productivity ramps, territory design, and quota allocation based on realistic India benchmarks"},
            {"title": "Design compensation structure", "description": "Develop sales compensation plans for each role including base/variable mix, accelerators, and measurement periods appropriate for Indian sales cycles"},
            {"title": "Allocate marketing budget", "description": "Create channel-wise marketing budget with expected CAC and pipeline contribution from each channel, including experimentation reserve"},
            {"title": "Plan partner investments", "description": "Define partner strategy with target partner count, margin structure, enablement investments, and timeline to productivity"}
        ]'::jsonb,
        '[
            {"title": "SaaSBoomi Compensation Benchmarks", "url": "https://saasboomi.com/", "type": "data"},
            {"title": "Glassdoor India Salaries", "url": "https://www.glassdoor.co.in/", "type": "data"},
            {"title": "LinkedIn Salary Insights", "url": "https://www.linkedin.com/salary/", "type": "data"},
            {"title": "NASSCOM HR Benchmarks", "url": "https://nasscom.in/", "type": "report"}
        ]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Customer Segmentation for India (Days 7-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Customer Segmentation for India',
        'Master customer segmentation across India''s diverse markets including SMB vs Enterprise dynamics, regional market variations, tier city strategies, and industry vertical approaches. Build ideal customer profiles that drive focused and efficient sales efforts.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 7: SMB vs Enterprise Market Dynamics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'SMB vs Enterprise Market Dynamics',
        'India''s business landscape presents stark contrasts between SMB and enterprise segments that fundamentally affect sales strategy. Understanding these dynamics helps allocate resources appropriately and avoid the common mistake of applying enterprise playbooks to SMB or vice versa. Each segment requires distinct approaches to product, pricing, sales motion, and support.

The Indian SMB segment comprises over 6.3 crore MSMEs contributing 30% of GDP. Characteristics include: owner-driven decision making (often one person decides and pays), price sensitivity with strong value focus, limited IT resources requiring simple products, preference for mobile-first solutions, cash flow constraints affecting payment behavior, and high trust requirements before commitment. The segment is rapidly digitizing post-GST and demonetization, creating new software adoption.

SMB sales dynamics require specific approaches. Sales cycles typically run 2-8 weeks with quick decisions or indefinite delays. Average contract values range Rs 20,000-2 lakh annually. Self-serve and inside sales models work best. Product-led growth can be effective with strong free tiers. Churn runs higher (15-25% annually) requiring continuous acquisition. WhatsApp-based communication outperforms email. References from similar businesses carry significant weight.

The Indian enterprise segment (companies above Rs 500 crore revenue) numbers approximately 8,000 but controls disproportionate purchasing power. Characteristics include: multiple stakeholders in decisions, formal procurement processes often involving RFPs, longer evaluation cycles with pilot requirements, need for enterprise features (SSO, audit logs, compliance), preference for established vendors with India presence, and willingness to pay for customization and support.

Enterprise sales dynamics differ fundamentally. Sales cycles run 6-18 months on average. Deal sizes range Rs 10 lakh to several crore annually. Requires dedicated account executives with solution selling skills. Multiple meetings with various stakeholders precede decisions. Pilot or proof-of-concept is often mandatory before procurement. Payment terms extend to 60-90 days post-delivery. Customer success involvement begins pre-sale.

Mid-market (Rs 50-500 crore companies) represents a sweet spot for many SaaS companies. Approximately 50,000 companies combine reasonable deal sizes (Rs 2-10 lakh ACV) with manageable sales cycles (3-6 months). Growing tech adoption but less bureaucratic than enterprise. Often overlooked by both enterprise-focused global players and SMB-focused products. Requires blend of inside sales efficiency and solution selling capability.

Segment selection criteria should consider: your product complexity (complex products struggle in SMB), support model economics (high-touch doesn''t work at low ACV), competitive landscape (where can you win?), reference-ability (enterprise logos help fundraising), and growth path (can you expand within segment or across segments?).',
        '[
            {"title": "Analyze segment economics", "description": "Calculate unit economics for SMB, mid-market, and enterprise segments including CAC, ACV, support costs, and LTV to determine viable segments"},
            {"title": "Map segment requirements", "description": "Document product, pricing, sales motion, and support requirements for each segment you might target with gap analysis against current capabilities"},
            {"title": "Research competitor segment focus", "description": "Identify which segments competitors prioritize and where gaps exist for differentiated positioning"},
            {"title": "Define initial segment strategy", "description": "Select primary segment focus with rationale, secondary segment approach, and criteria for segment expansion over time"}
        ]'::jsonb,
        '[
            {"title": "MSME Annual Report", "url": "https://msme.gov.in/", "type": "government"},
            {"title": "CMIE Business Database", "url": "https://www.cmie.com/", "type": "data"},
            {"title": "Dun & Bradstreet India", "url": "https://www.dnb.com/", "type": "data"},
            {"title": "ET 500 Company List", "url": "https://economictimes.indiatimes.com/", "type": "data"}
        ]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 8: Regional Market Variations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Regional Market Variations',
        'India''s federal structure creates 28 distinct state markets, each with unique economic profiles, language preferences, industry concentrations, and business cultures. Successful pan-India sales strategies must account for these variations rather than treating India as a homogeneous market. Regional understanding enables efficient resource allocation and culturally appropriate sales approaches.

North India (Delhi NCR, UP, Punjab, Haryana, Rajasthan) represents 25% of India''s GDP with distinct characteristics. Delhi NCR is India''s second-largest business hub with strong government, media, and services presence. Business culture tends toward relationship-driven with hospitality expectations. Hindi is the primary business language with English for corporate settings. Sales approaches benefit from personal connection building before business discussions. Payment discipline varies significantly by segment.

West India (Maharashtra, Gujarat, Goa) contributes 25% of GDP with Mumbai as the financial capital. Maharashtra hosts maximum Fortune 500 offices and startup ecosystem. Gujarat excels in manufacturing, trade, and entrepreneurship with highly networked business communities. Marathi and Gujarati influence business interactions though English predominates in corporate settings. Gujarati businesses particularly value commercial terms and demonstrated ROI. Both regions have strong payment discipline in organized sectors.

South India (Karnataka, Tamil Nadu, Telangana, Kerala, AP) contributes 30% of GDP with technology and manufacturing strength. Bangalore anchors India''s tech ecosystem with early-adopting customer base. Chennai combines IT services with automotive and manufacturing. Hyderabad has emerged as a pharma and enterprise tech hub. Business culture tends more formal with emphasis on technical evaluation. Language preference varies by state; English works well in corporate settings but regional language capability helps in SMB. Generally stronger payment discipline than North India.

East India (West Bengal, Odisha, Bihar, Jharkhand) remains underpenetrated by most vendors despite significant population. Kolkata has strong services and traditional industry presence but slower growth. Emerging manufacturing in Odisha and Jharkhand creates opportunities. Business pace tends slower with relationship importance high. Bengali language capability helps in West Bengal. Lower competitive intensity offers potential for focused players.

Regional sales infrastructure decisions consider: Language requirements (hire native speakers or partners for vernacular markets), Physical presence needs (some regions require local offices for enterprise sales), Industry vertical alignment (match regional strengths to your target sectors), Competitive landscape (early entry in less-served regions can build defensible position), and Support delivery (time zone uniformity simplifies support but regional preferences exist for local support).',
        '[
            {"title": "Map regional opportunity", "description": "Analyze each major region for your target segment: market size, industry fit, competitive intensity, and language requirements"},
            {"title": "Prioritize regional expansion", "description": "Rank regions for expansion based on opportunity size, fit with current capabilities, resource requirements, and competitive dynamics"},
            {"title": "Research regional business culture", "description": "Document key cultural considerations, communication preferences, and relationship expectations for priority regions"},
            {"title": "Plan regional infrastructure", "description": "Define infrastructure requirements for priority regions: language capability, physical presence, partners, and support delivery"}
        ]'::jsonb,
        '[
            {"title": "State GDP Rankings - MOSPI", "url": "https://mospi.gov.in/", "type": "government"},
            {"title": "Industry Concentration Maps - IBEF", "url": "https://www.ibef.org/", "type": "report"},
            {"title": "Census Language Data", "url": "https://censusindia.gov.in/", "type": "government"},
            {"title": "RBI State Economic Statistics", "url": "https://rbi.org.in/", "type": "data"}
        ]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 9: Tier City Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Tier City Strategy',
        'India''s tier classification system (Tier-1, Tier-2, Tier-3 cities) shapes market access strategy. While metros dominate B2B software adoption today, tier-2 and tier-3 cities represent the next growth frontier with rising digitization, lower competition, and improving infrastructure. Timing and approach for tier expansion significantly impact long-term market position.

Tier-1 cities (8 metros: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad) concentrate most enterprise tech spending. Characteristics include: highest digital adoption and tech sophistication, intense competition among vendors, saturating markets for many categories, highest customer acquisition costs, and best sales talent availability. Most vendors start here but face margin pressure from competition. Early-stage startups benefit from concentrated customer base enabling efficient sales.

Tier-2 cities (approximately 40 cities including Indore, Jaipur, Lucknow, Chandigarh, Coimbatore, Kochi, Nagpur, Bhopal) represent the emerging opportunity. Growing digitization driven by GST compliance, increasing comfort with SaaS products, lower customer acquisition costs, less vendor competition, but requires local sales presence for enterprise sales. English proficiency lower requiring vernacular capability for many segments. Infrastructure (internet, payment) adequate for most business applications.

Tier-3 cities (hundreds of smaller cities and large towns) remain nascent for most B2B software but show potential. Rapidly improving internet connectivity, smartphone penetration reaching 70%+, GST driving digitization of previously informal businesses, price sensitivity requiring affordable products, strong preference for vernacular interfaces, and channel partner reliance for sales and support. Opportunity for first-mover advantages in prepared categories.

Tier expansion triggers should be explicit. Move to tier-2 when: tier-1 market share plateaus, unit economics proven and stable, product localization complete, support infrastructure scalable, and competitive pressure justifies expansion. Move to tier-3 when: tier-2 presence established, channel partner network developed, vernacular product ready, and low-touch sales model working.

Go-to-market adaptation by tier includes: Tier-1 can support direct enterprise sales with field presence. Tier-2 requires hub-and-spoke model with regional hubs and inside sales coverage. Tier-3 depends on channel partners, digital marketing, and self-serve models. Pricing may need tier-specific adjustment. Support models must account for language preferences and expectations. Marketing channels differ significantly across tiers.

Channel partner importance increases with tier depth. Partners provide local presence without fixed costs, vernacular sales capability, implementation support, and payment collection in challenging segments. Partner recruitment and enablement becomes critical infrastructure for tier-2/3 success. Margin structures must sustain partner economics while maintaining company profitability.',
        '[
            {"title": "Classify target cities", "description": "Create tiered city list for your target market with market potential, competitive presence, and infrastructure assessment for each city"},
            {"title": "Analyze tier economics", "description": "Model customer acquisition cost, average deal size, and support costs by tier to understand unit economics variations"},
            {"title": "Define tier expansion triggers", "description": "Establish specific metrics and milestones that will trigger expansion from tier-1 to tier-2 and tier-2 to tier-3"},
            {"title": "Design tier-specific GTM", "description": "Document differentiated go-to-market approach for each tier including sales model, channel strategy, and support delivery"}
        ]'::jsonb,
        '[
            {"title": "Census Urban Agglomeration Data", "url": "https://censusindia.gov.in/", "type": "government"},
            {"title": "Smart Cities Mission", "url": "https://smartcities.gov.in/", "type": "government"},
            {"title": "ICRIER Tier City Research", "url": "https://icrier.org/", "type": "research"},
            {"title": "Nielsen Urban India Reports", "url": "https://www.nielsen.com/", "type": "report"}
        ]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 10: Industry Vertical Segmentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Industry Vertical Segmentation',
        'Vertical specialization often determines success in Indian B2B markets. Industry-specific knowledge enables deeper customer understanding, more relevant solutions, and differentiated positioning against horizontal competitors. The decision between horizontal and vertical focus shapes product development, sales hiring, and marketing strategy.

Major verticals in India present different opportunities. Banking and Financial Services: Highly regulated, large budgets, sophisticated buyers, long procurement cycles, strict compliance requirements, concentrated in Mumbai. IT Services: Bangalore/Hyderabad/Chennai clusters, cost-conscious but tech-savvy, procurement often through global headquarters. Manufacturing: Distributed across Gujarat, Maharashtra, Tamil Nadu, growing technology adoption, ERP and supply chain focus. Healthcare: Chennai/Mumbai/Delhi hubs, regulatory complexity, fragmented payer landscape, public and private segments differ vastly. Retail: Traditional trade digitizing, organized retail concentrated in metros, e-commerce disruption creating opportunities.

Government and Public Sector represents a massive vertical. Central government, 28 state governments, and PSUs together spend over Rs 40 lakh crore. GeM portal democratizes access but requires registration and compliance. Procurement cycles align with government financial years (April-March). Q4 (January-March) sees budget utilization surge. Requirements often specify Indian companies and Make in India compliance. Payment terms can extend significantly but government rarely defaults.

Vertical selection criteria include: Market size within vertical (is it large enough to support specialized focus?), domain expertise access (can you hire or partner for vertical knowledge?), competitive landscape (are horizontal competitors serving vertical poorly?), product fit (does your product address vertical-specific needs?), and reference-ability (will vertical logos help broader market?).

Vertical sales approach differs from horizontal. Vertical sales teams need industry knowledge and speak customer language. Marketing content must demonstrate vertical understanding through case studies, benchmarks, and thought leadership. Product roadmap prioritizes vertical-specific features. Partner ecosystem includes vertical-specific players. Events focus on industry conferences rather than general technology events.

Hybrid approaches combine horizontal platform with vertical solutions. Base product serves multiple industries. Vertical overlays provide industry-specific workflows, integrations, and compliance. Vertical specialists work with generalist sales team. This approach balances scale economics with vertical relevance. Examples include Zoho, Freshworks, and Salesforce ISV ecosystem.',
        '[
            {"title": "Analyze vertical opportunities", "description": "Evaluate top 5 relevant verticals for market size, growth rate, technology adoption, competitive intensity, and fit with your solution"},
            {"title": "Assess vertical capability gaps", "description": "For priority verticals, identify knowledge gaps, product gaps, and relationship gaps that would need to be addressed"},
            {"title": "Research vertical buying patterns", "description": "Document procurement processes, decision makers, budget cycles, and key evaluation criteria for priority verticals"},
            {"title": "Define vertical strategy", "description": "Decide between horizontal, vertical, or hybrid approach with clear rationale and resource allocation implications"}
        ]'::jsonb,
        '[
            {"title": "IBEF Industry Reports", "url": "https://www.ibef.org/industry", "type": "report"},
            {"title": "Industry Association Directory", "url": "https://ficci.in/", "type": "association"},
            {"title": "Sector Skill Councils", "url": "https://www.nsdcindia.org/", "type": "government"},
            {"title": "GeM Category Analysis", "url": "https://gem.gov.in/", "type": "government"}
        ]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 11: Ideal Customer Profile Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'Ideal Customer Profile Development',
        'The Ideal Customer Profile (ICP) defines precisely which companies your sales team should pursue. A well-crafted ICP improves sales efficiency by focusing resources on high-probability opportunities while disqualifying poor fits early. In India''s diverse market, ICP specificity is even more critical given the wide variation in customer characteristics.

ICP components for India include firmographic, technographic, and situational elements. Firmographic: Company size (employee count, revenue), industry vertical, geography (city tier, region), ownership structure (family-owned, professional, MNC subsidiary, government). Technographic: Current technology stack, digital maturity, existing vendor relationships, IT team capability. Situational: Specific triggers or conditions that create buying need, budget availability, decision-making timeline.

Building ICP from customer data requires analysis of existing customers. Identify your best customers based on: revenue (highest ACVs), retention (longest tenures), expansion (most growth), ease of sale (shortest cycles), and satisfaction (highest NPS). Find common characteristics among top performers. Conversely, analyze churned or difficult customers to identify negative indicators.

Indian market ICP considerations include: Language preference (English-first versus vernacular indicates technology sophistication and go-to-market approach needed), GST compliance status (indicates formalization and software readiness), Payment behavior history (some segments notoriously delay payments), Technology adoption history (prior software purchases indicate buying propensity), and Founder/promoter background (tech-savvy founders buy differently from traditional business owners).

ICP scoring model enables consistent qualification. Assign weights to each ICP criterion. Score prospects against criteria. Total score determines priority tier: Tier A (perfect fit, prioritize), Tier B (good fit, pursue), Tier C (marginal fit, nurture), Tier D (poor fit, disqualify). Integrate scoring into CRM for consistent application across sales team.

ICP evolution happens as you learn more. Initial ICP is hypothesis based on limited data. Refine as customer base grows and patterns emerge. Quarterly ICP review ensures alignment with actual success patterns. Be willing to expand ICP if current definition limits growth, or narrow if win rates decline. Document ICP changes and communicate to entire revenue team.

Anti-ICP documentation is equally valuable. Document characteristics of customers who churned, had long sales cycles, required excessive support, or generated complaints. These negative indicators help disqualify poor-fit prospects early, saving sales resources and preventing future problems.',
        '[
            {"title": "Analyze existing customer data", "description": "Review all existing customers to identify patterns among best performers and worst performers across firmographic, technographic, and behavioral dimensions"},
            {"title": "Define ICP criteria", "description": "Document specific ICP criteria with acceptable ranges for each: company size, industry, geography, technology indicators, and situational triggers"},
            {"title": "Build ICP scoring model", "description": "Create weighted scoring model for prospect qualification with tier definitions and corresponding sales actions for each tier"},
            {"title": "Document anti-ICP indicators", "description": "List specific characteristics that indicate poor fit and should trigger early disqualification to protect sales resources"}
        ]'::jsonb,
        '[
            {"title": "Clearbit ICP Framework", "url": "https://clearbit.com/", "type": "guide"},
            {"title": "Gartner Customer Segmentation", "url": "https://www.gartner.com/", "type": "framework"},
            {"title": "LinkedIn Sales Navigator Filters", "url": "https://business.linkedin.com/sales-solutions", "type": "tool"},
            {"title": "ZoomInfo India Data", "url": "https://www.zoominfo.com/", "type": "data"}
        ]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 12: Buyer Persona Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        12,
        'Buyer Persona Development',
        'While ICP defines target companies, buyer personas define target individuals within those companies. Understanding the specific people involved in buying decisions enables personalized engagement that resonates with their priorities and communication preferences. Indian organizational dynamics create unique persona characteristics.

Indian buyer persona elements include: Role and title (formal position may differ from actual authority), Reporting structure (who they influence and who influences them), Career motivations (advancement, job security, recognition), Pain points (what keeps them up at night professionally), Information sources (where they learn about solutions), Communication preferences (email, WhatsApp, calls, in-person), Decision authority (recommend, influence, approve, veto), and Personal characteristics (age, education, language preference).

Common B2B buying personas in India include: The Promoter/Founder: Often final decision-maker in family businesses, values relationships and trust, concerned about control and commitment, needs peer references from respected peers, may have limited technical depth but strong business acumen. The Professional CEO/CXO: Career-focused, values data and business cases, wants to look innovative to board, concerned about execution risk, needs ROI quantification and competitive benchmarking. The IT Head/CIO: Evaluates technical fit and integration, concerned about implementation complexity and team capability, wants to minimize risk and workload, needs technical documentation and support commitment. The Finance Controller: Gates budget allocation, focuses on cost and payment terms, skeptical of soft benefits, needs clear ROI and contract terms.

Persona research methods include: Customer interviews (ask about buying process and stakeholders), Win/loss analysis (understand who influenced outcome), Sales debrief (capture qualitative insights from deals), LinkedIn research (understand career paths and priorities), and Industry events (observe how personas engage with content and vendors).

Persona mapping to buying journey tracks which personas engage at each stage. Awareness stage often involves end users or junior evaluators researching solutions. Consideration stage brings in IT and functional heads for technical and use case evaluation. Decision stage involves executive sponsors and finance for business case and approvals. Each stage requires content and engagement tailored to active personas.

Multi-persona selling in India requires special attention. Enterprise deals typically involve 6-10 stakeholders. Each persona has different priorities and communication preferences. Sales team must map the full buying committee and develop relationship with each. Overlooking any stakeholder creates risk of late-stage derailment. Champion development is essential but not sufficient; blockers must also be managed.',
        '[
            {"title": "Identify key personas", "description": "List all personas involved in your typical sale with role, authority level, priorities, and concerns for each based on customer interviews and sales experience"},
            {"title": "Create detailed persona profiles", "description": "Develop comprehensive persona documents including demographics, motivations, pain points, information sources, and communication preferences"},
            {"title": "Map personas to buying journey", "description": "Document which personas engage at each stage of the buying process with their specific concerns and needs at each stage"},
            {"title": "Develop persona-specific content", "description": "Create or audit content library to ensure relevant materials exist for each persona at each buying stage"}
        ]'::jsonb,
        '[
            {"title": "HubSpot Buyer Persona Templates", "url": "https://www.hubspot.com/make-my-persona", "type": "tool"},
            {"title": "Gartner B2B Buying Research", "url": "https://www.gartner.com/", "type": "research"},
            {"title": "LinkedIn Persona Research", "url": "https://www.linkedin.com/", "type": "tool"},
            {"title": "ITSMA Persona Methodology", "url": "https://www.itsma.com/", "type": "framework"}
        ]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Sales Process Design (Days 13-18)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Sales Process Design',
        'Build effective sales processes for Indian buyers including consultative selling approaches, SPIN selling methodology adapted for Indian context, solution selling frameworks, and negotiation strategies that account for Indian business customs and expectations.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 13: Consultative Selling for India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'Consultative Selling for India',
        'Consultative selling positions the salesperson as a trusted advisor rather than a product pusher. This approach resonates strongly in India where relationships and trust precede transactions. Moving from feature-based selling to problem-solving consulting dramatically improves enterprise sales effectiveness and deal sizes.

The consultative selling mindset shift requires transformation. Traditional selling pushes product features and handles objections to close deals. Consultative selling seeks to understand customer challenges deeply, provides insights and education, proposes solutions that may include your product, and builds long-term relationships regardless of immediate sale. Indian buyers, skeptical of aggressive selling, respond well to consultative approaches that demonstrate genuine interest in their success.

Discovery excellence forms the foundation of consultative selling. Deep discovery uncovers: business context (industry trends, competitive pressures, strategic priorities), current state (existing processes, technologies, team capabilities), desired future state (goals, success metrics, timeline), gap analysis (what prevents reaching future state), and impact quantification (cost of status quo, value of improvement). Indian buyers appreciate thorough discovery as it demonstrates seriousness and competence.

The insight-led approach differentiates consultative sellers. Rather than asking what problems buyers have, provide insights about challenges they may not have recognized. Share industry benchmarks that reveal gaps. Present case studies of similar companies that achieved improvements. Introduce frameworks for thinking about their challenges. This positions you as expert rather than vendor and builds credibility.

Consultative selling in Indian enterprise context requires patience. The relationship-building phase may span multiple meetings before business discussions deepen. Social interactions (meals, events, personal conversations) are part of the process. Rushing to proposal before trust is established reduces win rates. The investment pays off in larger deals, higher win rates, and stronger customer relationships.

Consultative selling skills development requires training. Active listening: truly hear and understand rather than waiting to pitch. Questioning: move from surface to deep understanding through layered questions. Insight delivery: share perspectives that add value without appearing arrogant. Business acumen: understand business fundamentals to speak credibly about customer challenges. Industry knowledge: develop expertise in target verticals to provide relevant insights.

Metrics for consultative selling differ from transactional approaches. Track: number of discovery meetings, insight delivery moments, access to senior stakeholders, deal size compared to transactional deals, and customer satisfaction with buying experience. These leading indicators predict success better than activity metrics like calls made.',
        '[
            {"title": "Audit current selling approach", "description": "Evaluate current sales team behavior against consultative selling criteria to identify gaps between feature-pushing and problem-solving orientation"},
            {"title": "Build discovery framework", "description": "Create structured discovery framework with questions organized by category: business context, current state, future state, gaps, and impact"},
            {"title": "Develop insight inventory", "description": "Compile insights you can share with prospects: industry benchmarks, trend analysis, case study learnings, and frameworks for their challenges"},
            {"title": "Design consultative training", "description": "Plan training program for sales team covering discovery skills, insight delivery, and relationship-building for Indian enterprise context"}
        ]'::jsonb,
        '[
            {"title": "The Challenger Sale Book", "url": "https://www.amazon.in/Challenger-Sale-Control-Customer-Conversation/dp/1591844355", "type": "book"},
            {"title": "RAIN Group Consultative Selling", "url": "https://www.rainsalestraining.com/", "type": "training"},
            {"title": "Miller Heiman Methodology", "url": "https://www.kfrgroup.com/", "type": "methodology"},
            {"title": "Sandler Training India", "url": "https://www.sandler.com/", "type": "training"}
        ]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: SPIN Selling for Indian Buyers
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        'SPIN Selling for Indian Buyers',
        'SPIN Selling, developed by Neil Rackham through research on 35,000 sales calls, provides a proven framework for complex sales. The methodology is particularly effective for Indian enterprise sales where multiple stakeholders, longer cycles, and relationship dynamics require structured approaches. Adapting SPIN for Indian context improves its effectiveness significantly.

SPIN comprises four question types used in sequence. Situation questions establish context: "How is your current process organized?", "What systems do you use today?", "How many people are involved in this workflow?". These questions gather facts but don''t directly advance the sale. In India, situation questions also serve relationship-building by showing interest in the buyer''s world.

Problem questions uncover difficulties and dissatisfactions: "What challenges do you face with the current approach?", "Where do you see gaps in your current process?", "What frustrates your team about this workflow?". Indian buyers may be less direct about problems initially. Phrase questions to make it safe to share concerns. Listen for indirect signals of dissatisfaction.

Implication questions develop the seriousness of problems: "How does this impact your team''s productivity?", "What happens when this process fails?", "What does this cost you in terms of time and resources?". Implication questions help buyers recognize the full cost of inaction. In India, these questions should be asked gently without appearing to criticize the buyer''s current choices.

Need-payoff questions focus on the value of solving the problem: "How would your team benefit if this process were automated?", "What would it mean for your business if you could achieve X?", "Why is solving this important to you?". These questions let buyers articulate the value themselves, which is more persuasive than seller claims. Indian buyers particularly respond to questions that let them envision success.

SPIN adaptation for India requires cultural sensitivity. Direct questioning can feel confrontational; soften with relationship context. Patience in the sequence; rushing through SPIN undermines its power. Group dynamics matter; ensure key stakeholders hear the full SPIN conversation. Document insights to share with stakeholders not in the meeting.

SPIN question planning should precede every meeting. Research the account to prepare situation questions that don''t waste time on public information. Hypothesize likely problems based on segment and industry patterns. Prepare implication questions that quantify impact in terms that matter to the buyer. Design need-payoff questions that connect to your solution''s strengths. Practice questioning to build natural delivery.',
        '[
            {"title": "Study SPIN methodology", "description": "Read SPIN Selling book or summary materials to deeply understand the methodology and research behind it"},
            {"title": "Adapt questions for Indian context", "description": "Create India-adapted SPIN questions for your solution: situation questions about Indian business context, culturally appropriate problem questions, implication questions with relevant metrics"},
            {"title": "Build question library", "description": "Develop library of SPIN questions organized by buyer persona and industry vertical for sales team reference"},
            {"title": "Practice SPIN conversations", "description": "Role-play SPIN conversations with team members to build natural questioning ability and appropriate pacing"}
        ]'::jsonb,
        '[
            {"title": "SPIN Selling Book", "url": "https://www.amazon.in/SPIN-Selling-Neil-Rackham/dp/0070511136", "type": "book"},
            {"title": "Huthwaite SPIN Research", "url": "https://www.huthwaiteinternational.com/", "type": "research"},
            {"title": "SPIN Question Examples", "url": "https://blog.hubspot.com/sales/spin-selling", "type": "guide"},
            {"title": "Sales Methodology Comparison", "url": "https://www.gartner.com/", "type": "framework"}
        ]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Solution Selling Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'Solution Selling Framework',
        'Solution selling positions your offering as a comprehensive answer to buyer challenges rather than a product with features. This approach aligns with how Indian enterprise buyers evaluate purchases: they buy outcomes, not products. Solution selling requires deep understanding of customer problems and ability to connect your capabilities to their desired results.

The solution selling framework follows a structured approach. Pain identification: diagnose the specific business pain the buyer experiences. Pain exploration: understand the impact, causes, and urgency of the pain. Vision creation: help buyer envision a future state where pain is resolved. Capability demonstration: show how your solution enables the envisioned future. Proof provision: validate claims through references, case studies, and pilots. Value justification: quantify the ROI and business case. Buying process facilitation: guide buyer through their internal procurement.

Pain chain analysis connects individual pain to organizational impact. Start with user-level pain (frustration, time waste, errors). Connect to manager-level impact (team productivity, project delays, quality issues). Elevate to executive-level consequences (competitive disadvantage, revenue impact, strategic risk). This chain creates urgency and justifies budget allocation. Indian enterprise buyers especially need this connection to justify purchases internally.

Solution configuration addresses specific needs rather than presenting standard packages. Understand which capabilities address identified pains. Configure solution to match scope needed, not maximum possible. Phase implementation to align with budget and absorption capacity. Include services (implementation, training, support) as integral parts. This customized approach differentiates from competitors pushing standard products.

Business case development quantifies solution value in buyer terms. Calculate current cost of the problem (labor, errors, delays, opportunity cost). Project value of solution (efficiency gains, quality improvements, revenue impact). Compare to solution investment to derive ROI. Present in format appropriate for Indian financial evaluation: payback period, NPV, and IRR where applicable.

Solution selling team structure for complex deals includes: Account Executive (owns relationship and deal strategy), Solution Consultant/Engineer (provides technical expertise and configuration), Customer Success (demonstrates post-sale value and support), and Executive Sponsor (provides senior credibility for executive access). This team selling approach is essential for enterprise deals where multiple buyer stakeholders need different conversations.',
        '[
            {"title": "Map pain chains", "description": "Document pain chains for your top 3 use cases connecting user pain to manager impact to executive consequences"},
            {"title": "Create solution configuration guide", "description": "Develop guide for configuring solutions to match customer needs including capability mapping, phasing options, and services integration"},
            {"title": "Build business case template", "description": "Create ROI calculator and business case template that quantifies value in terms Indian enterprise buyers use"},
            {"title": "Define team selling roles", "description": "Document roles and responsibilities for solution selling team with handoff protocols and engagement models for different deal sizes"}
        ]'::jsonb,
        '[
            {"title": "Solution Selling Book", "url": "https://www.amazon.in/Solution-Selling-Creating-Difficult-Markets/dp/0786303158", "type": "book"},
            {"title": "MEDDICC Framework", "url": "https://meddicc.com/", "type": "methodology"},
            {"title": "Value Selling Framework", "url": "https://www.valueselling.com/", "type": "methodology"},
            {"title": "ROI Calculation Best Practices", "url": "https://www.forrester.com/", "type": "guide"}
        ]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 16: Sales Process Stages & Pipeline Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'Sales Process Stages & Pipeline Management',
        'A well-defined sales process provides structure for complex sales while enabling accurate forecasting and management visibility. In India''s longer sales cycles with multiple stakeholders, clear stage definitions and advancement criteria prevent deals from languishing and ensure consistent execution across the sales team.

Standard B2B sales stages adapted for India include: Lead/MQL: Marketing qualified based on engagement and fit criteria. SAL (Sales Accepted Lead): Sales accepts for outreach based on ICP fit. Discovery: First meaningful conversation completed, pain identified. Qualified: BANT or equivalent criteria validated (Budget, Authority, Need, Timeline). Solution Design: Detailed requirements gathered, solution configured. Proposal: Formal proposal submitted with pricing. Negotiation: Commercial and legal terms in discussion. Verbal Commit: Stakeholder agreement pending paperwork. Closed Won/Lost: Deal concluded.

Stage entry criteria ensure consistent definition. Each stage should have explicit criteria for advancement. Discovery stage entry requires: conversation with target persona, problem or interest articulated, willingness to continue discussion. Qualified stage requires: budget confirmed or identifiable, decision maker identified, timeline within 6 months, clear need articulated. Proposal stage requires: technical requirements documented, commercial terms discussed, procurement process understood.

Pipeline management for Indian sales cycles requires longer views. With 6-18 month enterprise cycles, pipeline coverage needs 4-6x quota (versus 3x in faster markets). Weighted pipeline discounts early stages more heavily. Time-in-stage alerts identify stuck deals requiring intervention. Monthly pipeline reviews assess movement and accuracy. Quarterly pipeline clean-up removes stalled opportunities.

Forecasting accuracy improves with data discipline. Categorize deals by forecast status: Commit (>90% confidence), Best Case (50-90%), Pipeline (<50%). Require evidence for Commit status: verbal agreement, PO in process, contract in signature. Track forecast accuracy by rep and stage to identify patterns. Indian enterprise deals often slip quarters; build conservatism into forecasts.

Pipeline velocity metrics diagnose health. Win rate by stage shows conversion effectiveness. Average days per stage identifies bottlenecks. Average deal size tracks value creation. Sales velocity (number of deals x average value x win rate / cycle length) provides composite metric. Compare metrics across reps, segments, and time periods to identify improvement opportunities.',
        '[
            {"title": "Define sales stages", "description": "Document your sales stages with clear definitions, entry criteria, exit criteria, and typical activities at each stage"},
            {"title": "Build pipeline model", "description": "Create pipeline model with stage conversion rates, time-in-stage benchmarks, and required coverage ratios for your Indian sales context"},
            {"title": "Design forecasting methodology", "description": "Establish forecast categories, evidence requirements for each, and accuracy tracking mechanisms"},
            {"title": "Create pipeline review cadence", "description": "Design weekly, monthly, and quarterly pipeline review processes with templates and required preparation"}
        ]'::jsonb,
        '[
            {"title": "Salesforce Pipeline Management", "url": "https://www.salesforce.com/", "type": "tool"},
            {"title": "HubSpot Sales Pipeline Guide", "url": "https://www.hubspot.com/", "type": "guide"},
            {"title": "Winning by Design Sales Process", "url": "https://winningbydesign.com/", "type": "methodology"},
            {"title": "Gartner Sales Forecasting", "url": "https://www.gartner.com/", "type": "research"}
        ]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 17: Negotiation Strategies for Indian Markets
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        17,
        'Negotiation Strategies for Indian Markets',
        'Negotiation in Indian business differs significantly from Western patterns. Price negotiation is expected and even enjoyed as a skill demonstration. Relationship factors influence outcomes alongside commercial terms. Understanding Indian negotiation dynamics prevents leaving money on table while maintaining relationships essential for long-term success.

Indian negotiation characteristics include several cultural elements. Negotiation is expected: buyers feel they haven''t done their job without getting a discount. Initial price anchoring matters: quote higher knowing negotiation will occur. Relationship leverage: existing relationships can justify premium or accelerate decisions. Multi-factor negotiation: beyond price, payment terms, support, and customization are all negotiable. Face-saving importance: both parties should feel they achieved a good outcome.

Price negotiation tactics commonly encountered include: Extreme first offer: initial ask for 50-70% discount is common, especially in SMB. Multiple rounds: expect 2-4 negotiation rounds rather than quick agreement. Competitive pressure: "your competitor is offering lower" regardless of truth. Authority escalation: "I need to check with my boss" to extract more concessions. Last-minute asks: additional requests just before signing. Budget constraint claims: "we only have X budget" even if more exists.

Response strategies maintain value while advancing deals. Anchor appropriately: initial quote should be defensible but allow room. Trade, don''t cave: every concession should extract something in return. Understand true constraints: probe to understand real versus stated budget limits. Package deals: bundle discounts with commitments (longer term, larger scope, faster decision). Walk-away readiness: willingness to walk away is essential; desperation destroys leverage.

Payment terms negotiation matters significantly in India. Standard terms range 30-90 days in enterprise, net 30 common in mid-market. Government can extend to 90-180 days. Early payment discounts (2-5% for payment within 15 days) can improve cash flow. Milestone-based payments align payment with value delivery. Advance payments (25-50% upfront) reduce risk and improve cash flow.

Discounting governance prevents margin erosion. Establish discount authority by level (rep, manager, VP). Require approval for exceptions with documented justification. Track discount rates by rep, segment, and deal size. Compensation structures should discourage excessive discounting. Regular discount analysis identifies patterns needing correction.',
        '[
            {"title": "Document discount authority", "description": "Create clear discount authority matrix by role level with standard, maximum, and exception approval processes"},
            {"title": "Build negotiation playbook", "description": "Develop playbook for common negotiation tactics with recommended response strategies and example scripts"},
            {"title": "Design payment terms options", "description": "Create standard and alternative payment term options with criteria for offering each and discount/premium implications"},
            {"title": "Train negotiation skills", "description": "Plan negotiation training for sales team covering Indian-specific dynamics, role-play scenarios, and governance adherence"}
        ]'::jsonb,
        '[
            {"title": "Never Split the Difference Book", "url": "https://www.amazon.in/Never-Split-Difference-Negotiating-Depended/dp/0062407805", "type": "book"},
            {"title": "Getting to Yes", "url": "https://www.amazon.in/Getting-Yes-Negotiating-Agreement-Without/dp/0143118757", "type": "book"},
            {"title": "Harvard Negotiation Project", "url": "https://www.pon.harvard.edu/", "type": "research"},
            {"title": "Negotiation Training Programs", "url": "https://www.scotwork.com/", "type": "training"}
        ]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 18: Handling Objections & Closing Techniques
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        18,
        'Handling Objections & Closing Techniques',
        'Objection handling and closing require different approaches in Indian sales contexts. Direct confrontation of objections can damage relationships. Aggressive closing tactics backfire with relationship-oriented buyers. Understanding culturally appropriate objection handling and closing approaches improves conversion while maintaining trust essential for long-term success.

Common objections in Indian B2B sales fall into categories. Price objections: "Too expensive", "Competitor is cheaper", "Doesn''t fit our budget". Trust objections: "You''re too new/small", "We prefer established vendors", "Need more references". Timing objections: "Not right now", "Need to think about it", "Budget cycle is next quarter". Authority objections: "I need to check with my boss", "This needs board approval". Risk objections: "What if it doesn''t work?", "Too much change", "Our team can''t handle this".

Objection handling framework for India uses acknowledgment rather than confrontation. Listen fully without interruption; Indian buyers may take longer to articulate concerns. Acknowledge the concern validating their perspective: "I understand why that''s a concern." Clarify to understand true objection (surface objection often masks deeper concern). Respond with relevant information or evidence. Confirm the concern is addressed before moving forward.

Reading between lines matters greatly. "We will think about it" often means no but saves face. Extended silence after proposal may indicate discomfort, not consideration. Referring you to a junior person signals loss of executive interest. Delayed responses to follow-ups suggest priority has dropped. Develop sensitivity to these signals and adjust approach accordingly.

Closing approaches for India favor collaborative over pushy styles. Summary close: review agreed points and propose natural next step. Timeline close: connect to buyer''s stated deadline or event. Risk reversal close: offer pilot, guarantee, or proof period to reduce perceived risk. Reference close: offer to connect with similar customer who achieved success. Choice close: offer two positive options rather than yes/no decision.

Trial closes throughout the sales process reduce closing pressure. After value demonstration: "Does this address your primary concern?" After pricing discussion: "Does this fit within your budget framework?" After reference call: "Based on what you heard, are you comfortable moving forward?" These incremental commitments make final close natural rather than pressured.

Handling the final "no" preserves future opportunity. Don''t burn bridges; relationships may yield future business. Understand true reason for loss to improve future approach. Stay in touch with nurture touches; circumstances change. Ask for referrals even from lost deals; buyer may know others who fit better.',
        '[
            {"title": "Build objection response library", "description": "Document top 20 objections encountered with culturally appropriate response strategies and supporting evidence for each"},
            {"title": "Train objection handling skills", "description": "Develop role-play scenarios for common objections with Indian buyer dynamics and practice sessions for sales team"},
            {"title": "Create closing approach guide", "description": "Document collaborative closing techniques appropriate for Indian context with example scripts and timing guidance"},
            {"title": "Design loss analysis process", "description": "Establish process for capturing loss reasons, maintaining relationship post-loss, and incorporating learnings into sales improvement"}
        ]'::jsonb,
        '[
            {"title": "Objection Handling Training", "url": "https://www.sandler.com/", "type": "training"},
            {"title": "JOLT Effect Book", "url": "https://www.amazon.in/JOLT-Effect-Buyers-Overcome-Indecision/dp/0593538217", "type": "book"},
            {"title": "Closing Techniques Guide", "url": "https://blog.hubspot.com/sales/sales-closing-techniques", "type": "guide"},
            {"title": "Loss Analysis Framework", "url": "https://www.gartner.com/", "type": "framework"}
        ]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Pricing Strategy for Indian Market (Days 19-24)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Pricing Strategy for Indian Market',
        'Master pricing strategies tailored for Indian markets including value-based pricing, freemium models, tiered pricing architectures, and GST considerations. Learn to balance revenue optimization with market penetration in price-sensitive segments.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 19: Value-Based Pricing in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        19,
        'Value-Based Pricing in India',
        'Value-based pricing captures fair share of value created for customers rather than pricing based on costs or competition. In India, where price sensitivity is high but willingness to pay for genuine value exists, value-based pricing enables premium positioning while justifying prices through demonstrable ROI. Mastering this approach separates sustainable businesses from commoditized players racing to bottom.

Value-based pricing principles focus on customer outcomes. Understand the economic value your solution creates: cost savings, revenue increase, time savings, risk reduction, quality improvement. Quantify this value in rupees wherever possible. Price as a percentage of value delivered, typically 10-30% of total value for B2B solutions. Communicate value clearly so buyers can justify price internally.

Value quantification methods for Indian context include: Direct cost savings: labor reduction, error elimination, process efficiency. Example: if your solution saves 10 hours per week of a Rs 50,000/month employee''s time, annual value is Rs 3 lakh. Pricing at 30% of value suggests Rs 90,000/year is justifiable. Revenue impact: if solution enables 5% more sales for a company doing Rs 10 crore revenue, value is Rs 50 lakh annually. Even 5% value capture suggests Rs 2.5 lakh annual price is defensible.

Risk-based value applies to solutions preventing losses. Compliance solutions preventing penalties, security solutions preventing breaches, quality solutions preventing defects. Quantify potential loss frequency and magnitude. Insurance-style value calculation justifies premium pricing for risk mitigation.

Value communication in Indian sales requires evidence. Case studies with quantified results: "Customer X achieved Y% improvement, saving Z lakhs annually." ROI calculators that customers can use with their own numbers. References who can speak to value realized. Pilot programs that demonstrate value before full commitment.

Challenges in value-based pricing in India include: Price anchoring to cost-based competitors makes value conversation difficult. Procurement processes often focus on cost comparison rather than value. Longer sales cycles required to establish and communicate value. Some segments (SMB, government) have harder budget constraints regardless of value. Address these through segment-specific strategies and patient value demonstration.

Value-based pricing requires ongoing validation. Track actual value delivered versus promised. Collect data on customer outcomes for case studies. Adjust pricing as value demonstration strengthens or weakens. Consider value-based pricing models (outcome-based, gain-sharing) for sophisticated customers willing to share in upside.',
        '[
            {"title": "Quantify solution value", "description": "Calculate economic value your solution creates for typical customers in each segment: cost savings, revenue impact, time savings, risk reduction"},
            {"title": "Build value communication assets", "description": "Create case studies, ROI calculator, and value presentation materials that enable sales team to communicate and justify value"},
            {"title": "Align price to value", "description": "Evaluate current pricing against value delivered and adjust to capture appropriate value share (typically 10-30% for B2B)"},
            {"title": "Train value selling skills", "description": "Develop training for sales team on value quantification, communication, and handling price-based objections with value responses"}
        ]'::jsonb,
        '[
            {"title": "The Strategy and Tactics of Pricing", "url": "https://www.amazon.in/Strategy-Tactics-Pricing-Growing-Profitably/dp/1138737518", "type": "book"},
            {"title": "Value-Based Pricing Guide", "url": "https://www.priceintelligently.com/", "type": "guide"},
            {"title": "SaaS Pricing Benchmarks", "url": "https://www.openviewpartners.com/", "type": "data"},
            {"title": "ROI Calculator Templates", "url": "https://www.hubspot.com/", "type": "tool"}
        ]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 20: Freemium and Free Trial Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'Freemium and Free Trial Strategies',
        'Freemium and free trial models reduce adoption barriers in price-sensitive Indian markets. When designed correctly, they create product-led growth engines that complement or replace traditional sales. However, poorly designed free offerings can drain resources without converting to revenue. Strategic free tier design balances acquisition with conversion.

Freemium model design requires careful feature allocation. Free tier should: deliver genuine standalone value (not crippled product), showcase core product capabilities, create natural upgrade triggers as usage grows, and be cost-effective to serve (low marginal cost per user). Free tier should not: give away features that drive purchase decisions, create support burden disproportionate to revenue potential, or enable users to achieve full objectives without upgrading.

Feature allocation frameworks help structure decisions. Usage-based limits: free up to X users, records, transactions, storage. Feature tiers: basic features free, advanced features paid. Time-based: full features for limited time, then reduce to free tier. Support levels: self-serve free, human support paid. These can be combined for nuanced offerings that match value delivery to payment.

Indian freemium considerations include: Higher free-to-paid conversion barriers due to price sensitivity (expect 1-2% conversion versus 2-5% globally). Longer time to conversion as users maximize free tier. Need for local payment options (UPI, net banking) to reduce conversion friction. Vernacular onboarding may improve activation and conversion. WhatsApp-based engagement often outperforms email for Indian users.

Free trial best practices maximize conversion. Trial length: 14-30 days typical; shorter for simple products, longer for complex ones requiring implementation. Full feature access during trial reduces later feature discovery objections. Guided onboarding to achieve "aha moment" quickly. Regular engagement touchpoints (email, WhatsApp, in-app) throughout trial. Clear deadline communication and easy conversion path.

Product-qualified leads (PQLs) from freemium/trial identify high-potential conversions. Define PQL criteria based on usage patterns that predict conversion: feature adoption, usage frequency, team size, integration completion. Route PQLs to sales for outreach. Automated nurture for users below PQL threshold. This data-driven approach focuses expensive sales resources on highest-potential opportunities.

Metrics for freemium/trial success include: Activation rate (% completing key onboarding steps), Time-to-activation, Free-to-paid conversion rate, Time-to-conversion, Paid customer LTV compared to acquisition cost. Continuously optimize funnel based on metrics analysis.',
        '[
            {"title": "Design free tier strategy", "description": "Define free tier offering with feature allocation, usage limits, and upgrade triggers that balance value delivery with conversion incentive"},
            {"title": "Map conversion triggers", "description": "Identify natural upgrade moments in user journey and design prompts, messaging, and friction removal for each trigger point"},
            {"title": "Define PQL criteria", "description": "Establish product-qualified lead definition based on usage patterns that predict conversion, with routing rules to appropriate engagement"},
            {"title": "Build conversion optimization plan", "description": "Create plan for ongoing conversion rate optimization including A/B tests, onboarding improvements, and engagement optimization"}
        ]'::jsonb,
        '[
            {"title": "Product-Led Growth Book", "url": "https://www.productled.com/book", "type": "book"},
            {"title": "OpenView Freemium Benchmarks", "url": "https://www.openviewpartners.com/", "type": "data"},
            {"title": "Freemium Conversion Playbook", "url": "https://www.profitwell.com/", "type": "guide"},
            {"title": "Mixpanel Product Analytics", "url": "https://mixpanel.com/", "type": "tool"}
        ]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 21: Tiered Pricing Architecture
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'Tiered Pricing Architecture',
        'Tiered pricing enables serving multiple market segments with differentiated offerings while maximizing revenue capture across willingness-to-pay spectrum. In India''s diverse market spanning bootstrapped startups to large enterprises, well-designed pricing tiers accommodate different needs and budgets while creating clear upgrade paths.

Pricing tier design principles guide structure. Three tiers optimal: fewer limits choice architecture benefits; more creates confusion. Clear naming that signals value (Starter/Growth/Enterprise or Basic/Professional/Enterprise). 3-4x price multiplier between tiers is common. Each tier should have compelling primary use case. Anchor tier in middle often captures most customers.

Tier differentiation dimensions include: User/seat count (most common for collaboration tools), Usage volume (transactions, records, API calls), Feature access (basic versus advanced capabilities), Support level (email versus phone versus dedicated), Security and compliance features (SOC 2, SSO, audit logs), and Customization and integration depth. Choose dimensions that align with how customers receive and perceive value.

Indian market tier considerations affect design. Entry tier must be affordable enough for price-sensitive segments (consider Rs 500-2,000/month entry points). Enterprise tier should include compliance features important in India (GST integration, India data residency, local payment options). Mid-tier should capture the growing mid-market segment often underserved by both SMB and enterprise offerings.

Per-seat versus usage-based versus flat pricing each fit different products. Per-seat works when value scales with users (collaboration, communication tools). Usage-based aligns payment with value but creates budget unpredictability. Flat pricing simplifies but may leave money on table for heavy users. Many successful products use hybrid models (flat base plus usage overage).

Tier naming and positioning creates psychological framework. "Starter" signals accessible entry point. "Professional" or "Business" suggests serious capability. "Enterprise" sets expectations for premium pricing and features. Avoid names that feel condescending ("Basic") or unclear ("Silver/Gold/Platinum"). Name should indicate who the tier is for and what they get.

Price anchoring through tier display influences purchase decisions. Display highest tier first to anchor high, making lower tiers seem reasonable. Highlight recommended tier visually. Show feature comparison table making tier differences clear. Display annual pricing more prominently (with monthly as option) to encourage commitment.',
        '[
            {"title": "Design pricing tiers", "description": "Create 3-tier pricing structure with clear differentiation, appropriate price points for Indian market, and compelling value proposition for each tier"},
            {"title": "Define tier metrics", "description": "Establish which metrics or features differentiate tiers: users, usage, features, support. Document rationale for each differentiation dimension"},
            {"title": "Test price sensitivity", "description": "Conduct price sensitivity research through customer interviews, A/B tests, or Van Westendorp analysis to validate tier pricing"},
            {"title": "Design pricing page", "description": "Create pricing page design with effective tier presentation, anchoring, comparison table, and clear call-to-action for each tier"}
        ]'::jsonb,
        '[
            {"title": "SaaS Pricing Models Guide", "url": "https://www.priceintelligently.com/", "type": "guide"},
            {"title": "Pricing Page Examples", "url": "https://www.pricingpageexamples.com/", "type": "examples"},
            {"title": "Price Anchoring Psychology", "url": "https://www.behavioraleconomics.com/", "type": "research"},
            {"title": "Paddle Pricing Analytics", "url": "https://www.paddle.com/", "type": "tool"}
        ]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 22: GST and Tax Considerations in Pricing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'GST and Tax Considerations in Pricing',
        'Goods and Services Tax (GST) fundamentally affects pricing strategy and cash flow management for Indian SaaS and B2B companies. Understanding GST implications enables compliant pricing, proper invoicing, and optimal cash flow management. GST mistakes can result in penalties, audit issues, and customer dissatisfaction.

GST basics for SaaS and software services: Software services (SaaS, subscription, implementation) attract 18% GST. Software products (licensed software) also attract 18% GST. There is no distinction between goods and services for most software under GST. B2B transactions allow input tax credit (ITC) for the buyer, effectively making GST pass-through for GST-registered businesses. B2C and non-registered B2B customers bear full GST as cost.

Price display considerations affect customer perception. Price-inclusive-of-GST simplifies customer understanding but obscures actual price. Price-exclusive-of-GST (plus 18% GST) is standard for B2B. Contract and invoice should clearly state GST treatment. Enterprise customers expect exclusive pricing; SMB customers often prefer inclusive clarity. Consider segment norms when deciding display approach.

Inter-state versus intra-state transactions determine GST type. Intra-state (within same state): CGST (9%) + SGST (9%) applies. Inter-state (across states): IGST (18%) applies. For SaaS companies, place of supply rules determine which applies. Services to registered business: location of recipient. Services to unregistered: location of supplier. Multi-state GST registration may be required for compliance.

GST invoicing requirements are strict. Invoice must include: supplier GSTIN, recipient GSTIN (if registered), HSN/SAC code (SAC 9983 for IT services), place of supply, taxable value, tax rate and amount (CGST/SGST or IGST), and invoice number in specified format. E-invoicing is mandatory for businesses above Rs 5 crore turnover. Non-compliant invoices prevent ITC claim by customers.

GST cash flow impact affects working capital. You collect GST from customers but pay to government monthly (by 20th of following month). If customer pays late, you fund GST from working capital. ITC from your purchases offsets liability but with timing mismatch. Budget for GST cash flow impact, especially with 30-90 day receivables common in enterprise sales.

TDS on payments affects some B2B transactions. Certain entities (government, specified businesses) deduct 2% TDS on payments above Rs 2.5 lakh. This TDS becomes credit in your income tax return but affects immediate cash flow. Invoice appropriately to account for TDS deduction. Track TDS certificates and credits carefully.',
        '[
            {"title": "Review GST registration status", "description": "Ensure GST registration is current, multi-state registrations obtained if needed, and e-invoicing compliance addressed if applicable"},
            {"title": "Standardize pricing display", "description": "Establish clear policy for GST-inclusive versus exclusive pricing by segment with consistent communication across sales, marketing, and contracts"},
            {"title": "Create compliant invoice templates", "description": "Design invoice templates meeting all GST requirements including GSTIN, SAC codes, place of supply, and proper tax breakout"},
            {"title": "Model GST cash flow impact", "description": "Calculate GST cash flow impact based on receivables timing, input credits, and monthly liability to budget working capital requirements"}
        ]'::jsonb,
        '[
            {"title": "GST Portal", "url": "https://www.gst.gov.in/", "type": "government"},
            {"title": "CBIC GST Circulars", "url": "https://www.cbic.gov.in/", "type": "government"},
            {"title": "GST for SaaS Guide", "url": "https://cleartax.in/", "type": "guide"},
            {"title": "E-Invoicing Requirements", "url": "https://einvoice1.gst.gov.in/", "type": "government"}
        ]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 23: Payment Terms and Collections
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        23,
        'Payment Terms and Collections',
        'Payment terms and collections significantly impact SaaS and B2B cash flow in India where 30-90 day payment cycles are standard for enterprise sales. Effective payment terms design, contract enforcement, and collections processes determine whether revenue translates to cash. Managing the receivables-heavy nature of Indian B2B is essential for sustainable operations.

Standard payment terms in Indian B2B vary by segment. SMB: Net 15-30 days, often prepaid for SaaS. Mid-market: Net 30-45 days typical. Enterprise: Net 45-90 days standard, some extend to 120 days. Government: 60-120+ days, often with procedural delays. MNCs: May follow global terms (Net 30) or Indian market terms. Your leverage in negotiation depends on competitive position and deal size.

Payment term negotiation strategies balance deal closure with cash flow. Standard terms should be documented and sales trained to defend. Exceptions require approval with documented justification. Trade discounts for better terms: 2-5% discount for payment within 15 days. Advance payment for new customers or high-risk segments. Milestone-based payments for implementation-heavy deals align payment with delivery.

Contract clauses that protect collections include: Clear payment terms with specific due dates. Late payment interest (typically 1.5-2% per month, state maximum under contract law). Suspension rights for non-payment with notice period. Termination rights for extended non-payment. Limitation on liability conditional on timely payment. These clauses provide leverage but relationship sensitivity may limit enforcement.

Collections process design maintains customer relationships while ensuring payment. Proactive invoice delivery with clear payment instructions. Automated reminders before due date and at defined intervals after. Escalation path from AR team to account manager to management. Customer success involvement to understand if issues signal broader relationship problems. Clear escalation criteria for legal action or service suspension.

Indian collections challenges require specific approaches. Decision-maker accessibility: finance contacts may deflect; maintain relationship with business sponsor who has authority to expedite. Dispute resolution: payment often delayed over minor issues; fast dispute resolution process accelerates payment. Relationship considerations: aggressive collections can damage long-term relationships; balance firmness with diplomacy. Check bounce handling: ensure contracts allow cost recovery and have clear consequences.

Collections metrics to track include: DSO (Days Sales Outstanding) by segment. Aging buckets: current, 30-60, 60-90, 90+ days. Collection effectiveness index (CEI). Write-off rate. Dispute frequency and resolution time. These metrics identify problem areas and track improvement from collections process changes.',
        '[
            {"title": "Standardize payment terms", "description": "Document standard payment terms by segment with discount/premium options for better/worse terms and exception approval process"},
            {"title": "Review contract clauses", "description": "Audit payment-related contract clauses including due dates, late payment interest, suspension rights, and termination triggers"},
            {"title": "Design collections process", "description": "Create end-to-end collections process with reminder cadence, escalation triggers, and relationship-preserving approaches for each stage"},
            {"title": "Build AR reporting dashboard", "description": "Establish AR dashboard tracking DSO, aging buckets, collection effectiveness, and at-risk receivables with regular review cadence"}
        ]'::jsonb,
        '[
            {"title": "AR Management Best Practices", "url": "https://www.highradius.com/", "type": "guide"},
            {"title": "Contract Payment Clauses", "url": "https://www.lawinsider.com/", "type": "templates"},
            {"title": "Collections Process Design", "url": "https://www.cfoinstitute.com/", "type": "guide"},
            {"title": "Razorpay Business Banking", "url": "https://razorpay.com/", "type": "tool"}
        ]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 24: Pricing Operations and Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        24,
        'Pricing Operations and Optimization',
        'Pricing operations encompasses the systems, processes, and governance that execute pricing strategy consistently across the organization. Strong pricing operations prevent revenue leakage from inconsistent discounting, ensure compliance with pricing policies, and enable data-driven pricing optimization over time.

Pricing governance establishes authority and accountability. Define who can set prices (product/pricing team), who can approve discounts (sales management), and who can make exceptions (executive leadership). Document approval thresholds: standard terms, manager approval (up to X%), VP approval (up to Y%), C-level (above Y%). Create pricing committee for significant changes with cross-functional representation.

CPQ (Configure-Price-Quote) systems operationalize pricing. CPQ software automates quote generation ensuring pricing consistency, appropriate discounts, and compliant configurations. Features include: product configuration rules, pricing logic with discounting limits, approval workflows, and quote document generation. Options range from CRM-integrated tools (Salesforce CPQ, HubSpot) to specialized solutions (Conga, PandaDoc). For earlier stage, spreadsheet templates with controls can suffice.

Price change management requires process discipline. New pricing should be announced with lead time for sales team preparation. Existing customer treatment: honor current pricing for contract term, or grandfather indefinitely, or migrate with notice. Competitive response plans for major pricing moves. Communication templates for sales, customer success, and marketing. Track impact post-change to validate decisions.

Pricing analytics enable optimization. Win/loss analysis by price point identifies where pricing helps or hurts conversion. Discount analysis shows margin erosion patterns by rep, segment, or deal size. Price elasticity testing through A/B experiments or cohort analysis. Customer lifetime value by price point reveals long-term impact. Competitor pricing tracking informs positioning decisions.

Continuous pricing optimization treats pricing as ongoing discipline. Quarterly pricing reviews assess performance against goals. Annual comprehensive review evaluates strategy, structure, and positioning. A/B testing culture for price presentation and tier structure. Customer feedback integration captures perception and willingness-to-pay insights. This disciplined approach compounds pricing improvements over time.

Common pricing mistakes to avoid in India: Racing to bottom on price without differentiation. Inconsistent discounting that trains customers to negotiate. Ignoring GST in pricing leading to margin compression. Not adjusting for rupee depreciation on foreign-cost inputs. Copying competitor pricing without understanding their strategy. Over-complicating pricing making it hard for customers to understand and buy.',
        '[
            {"title": "Document pricing governance", "description": "Create pricing authority matrix with approval thresholds, exception processes, and accountability assignments by role"},
            {"title": "Evaluate CPQ solutions", "description": "Assess CPQ options appropriate for your stage and complexity, from spreadsheet templates to full CPQ systems, and plan implementation"},
            {"title": "Build pricing analytics", "description": "Establish pricing analytics tracking win rates, discount patterns, and price elasticity with regular reporting cadence"},
            {"title": "Create price change playbook", "description": "Document process for pricing changes including customer treatment options, communication templates, and impact tracking methodology"}
        ]'::jsonb,
        '[
            {"title": "Salesforce CPQ", "url": "https://www.salesforce.com/products/cpq/", "type": "tool"},
            {"title": "PandaDoc Pricing Tools", "url": "https://www.pandadoc.com/", "type": "tool"},
            {"title": "Price Intelligently Analytics", "url": "https://www.priceintelligently.com/", "type": "tool"},
            {"title": "Pricing Governance Framework", "url": "https://www.mckinsey.com/", "type": "framework"}
        ]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Channel Development (Days 25-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Channel Development',
        'Build comprehensive channel strategy including direct sales, reseller and distributor networks, marketplace presence, and government sales through GeM portal. Create partnerships that extend reach while maintaining brand and margin integrity.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 25: Direct vs Indirect Channel Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        25,
        'Direct vs Indirect Channel Strategy',
        'Channel strategy determines how your product reaches customers, with profound implications for economics, control, and scalability. In India''s diverse market spanning concentrated enterprise accounts to fragmented SMB segments across tier cities, optimal channel mix varies significantly by segment and evolution stage. Getting channel strategy right enables efficient scaling.

Direct sales channel involves your employees selling directly to customers. Advantages: full control over customer experience and messaging, higher margins (no partner share), direct customer feedback, and relationship ownership. Disadvantages: high fixed costs (salaries, infrastructure), geographic limitations, scaling challenges, and management complexity. Best fit: enterprise accounts with high ACVs justifying dedicated resources, complex solutions requiring deep expertise, and strategic accounts requiring direct relationship.

Inside sales operates as direct channel with lower cost structure. Remote selling via phone/video reduces cost per customer. Suitable for mid-market and upper SMB where deal sizes justify human touch but not field sales. Hybrid with occasional in-person for key meetings. Technology-enabled through CRM, dialers, and video conferencing. Indian buyers have become more accepting of inside sales post-pandemic.

Channel partners extend reach without proportional cost increase. Partner types include: resellers (buy and resell, own customer relationship), referral partners (introduce leads, you close), implementation partners (deliver services around your product), technology partners (integration and joint go-to-market), and distribution partners (aggregate resellers, manage partner network). Each type fits different needs and economics.

Channel economics require careful modeling. Partner margin requirements in India: resellers typically expect 20-40% margin, referral partners 10-20% of first year revenue, implementation partners 100%+ of implementation service value. Your effective revenue after partner share must sustain operations. Channel economics should be positive unit economics even after partner margin.

Channel conflict arises when direct and partner channels compete. Conflict sources include: direct team pursuing partner''s customer, price undercutting between channels, deal registration disputes, and service quality inconsistencies. Mitigation strategies: clear rules of engagement, deal registration systems, segment/geography alignment, and fair conflict resolution processes.

Channel strategy evolution typically progresses through stages. Stage 1: founder/team direct sales proving market and refining pitch. Stage 2: direct sales team scaling in priority segments. Stage 3: inside sales added for volume segments. Stage 4: channel partners added for reach expansion. Premature channel investment before direct sales success often fails; partners need proven playbook to execute.',
        '[
            {"title": "Map current channel performance", "description": "Analyze current channel mix effectiveness: revenue contribution, cost per acquisition, and customer satisfaction by channel"},
            {"title": "Model channel economics", "description": "Build financial model comparing direct, inside sales, and partner channels including full cost structure and net margin per channel"},
            {"title": "Define channel coverage strategy", "description": "Design channel coverage by segment: which segments served by which channels, with clear rules of engagement preventing conflict"},
            {"title": "Plan channel evolution roadmap", "description": "Create phased channel development roadmap aligned with growth stage, market maturity, and investment capacity"}
        ]'::jsonb,
        '[
            {"title": "Channel Strategy Framework", "url": "https://www.mckinsey.com/", "type": "framework"},
            {"title": "Partner Program Benchmarks", "url": "https://www.channelpartnersonline.com/", "type": "data"},
            {"title": "Inside Sales Best Practices", "url": "https://www.salesforlife.com/", "type": "guide"},
            {"title": "Channel Conflict Resolution", "url": "https://www.channelinsider.com/", "type": "guide"}
        ]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 26: Building Reseller and Distributor Networks
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        26,
        'Building Reseller and Distributor Networks',
        'Reseller and distributor networks enable geographic and segment reach impossible through direct sales alone. In India, where business relationships and local presence matter significantly, well-structured partner networks can access customers, languages, and regions beyond direct capabilities. Building productive partner networks requires systematic approach to recruitment, enablement, and management.

Reseller versus distributor models serve different purposes. Resellers sell directly to end customers, maintaining customer relationships and providing local support. Distributors recruit and manage reseller networks, aggregating demand and providing logistics. For SaaS, resellers are more relevant than distributors given digital delivery. Two-tier distribution (vendor to distributor to reseller) adds cost but enables broader reach in fragmented markets.

Partner recruitment strategy identifies and attracts right partners. Target partner profile includes: relevant customer base access, complementary (not competitive) offerings, sales and technical capability, financial stability, and cultural alignment. Recruitment sources: industry events and associations, LinkedIn research and outreach, customer referrals ("who else serves companies like you?"), and competitor partner poaching (carefully). Recruitment pitch emphasizes partnership opportunity, margin potential, and support commitment.

Partner program structure creates framework for engagement. Tier structure (Silver/Gold/Platinum or similar) with benefits escalating with commitment. Margin schedule by tier and deal type. Deal registration protecting partner investment in opportunities. Lead sharing and co-marketing opportunities. Training and certification requirements. Performance expectations and review processes.

Partner enablement drives productivity. Onboarding program covering product, positioning, and sales process. Sales tools: pitch decks, battlecards, proposal templates, demo environments. Technical training for implementation and support. Certification programs validating partner capabilities. Regular product updates and competitive intelligence. Marketing assets for partner-led demand generation.

Partner management sustains productive relationships. Dedicated partner manager for strategic partners. Regular business reviews assessing performance and opportunities. Pipeline visibility and forecasting coordination. Joint planning for territory and account development. Issue resolution and escalation processes. Partner advisory council for strategic input.

Indian partner network considerations include: Regional partners for vernacular market access, Local presence requirements in tier-2/3 cities, Partner financing challenges (terms may need flexibility), Relationship-heavy partnership development, and Longer time to partner productivity than Western markets.',
        '[
            {"title": "Define ideal partner profile", "description": "Document target partner characteristics: customer access, capabilities, capacity, financial requirements, and cultural fit criteria"},
            {"title": "Design partner program", "description": "Create partner program structure including tiers, margin schedule, deal registration rules, and performance requirements"},
            {"title": "Build partner enablement kit", "description": "Develop comprehensive enablement materials: onboarding curriculum, sales tools, technical training, and certification program"},
            {"title": "Create partner recruitment plan", "description": "Develop partner recruitment strategy with target count, identification sources, outreach approach, and timeline to productivity"}
        ]'::jsonb,
        '[
            {"title": "Partner Program Design Guide", "url": "https://www.channelpartnersonline.com/", "type": "guide"},
            {"title": "Partner Enablement Best Practices", "url": "https://www.highspot.com/", "type": "guide"},
            {"title": "Partner Relationship Management Tools", "url": "https://www.salesforce.com/", "type": "tool"},
            {"title": "India Channel Partner Associations", "url": "https://www.mabororganisation.in/", "type": "association"}
        ]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 27: Marketplace Strategies (Amazon, Flipkart, IndiaMart)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        27,
        'Marketplace Strategies (Amazon, Flipkart, IndiaMart)',
        'Marketplaces provide built-in traffic and trust, enabling customer acquisition without building direct demand generation capabilities. For certain B2B and B2C products, marketplace presence can significantly accelerate growth. Understanding marketplace dynamics, economics, and strategy helps leverage these platforms effectively.

Amazon Business serves B2B procurement in India. GST-compliant invoicing for business buyers. Bulk pricing and business-specific deals. Integration with procurement systems for larger buyers. Amazon Business Prime offers additional benefits. Suitable for standardized products with clear specifications. Commission rates typically 5-20% depending on category.

Flipkart for business and Flipkart wholesale target different segments. Growing B2B focus with GST invoicing. Strong presence in electronics, appliances, and general merchandise. Flipkart Wholesale serves kiranas and small retailers. Regional language support improving reach. Commission structures competitive with Amazon.

IndiaMART dominates B2B discovery and lead generation. 7+ crore buyers and 75 lakh suppliers. Lead generation model rather than transaction completion. Suitable for industrial, manufacturing, and service businesses. Subscription tiers from Rs 2,400/month to Rs 3+ lakh/year. Quality of leads varies; requires sales capability to convert.

SaaS and app marketplaces include: Zoho Marketplace (integration with Zoho ecosystem), Freshworks Marketplace, AWS Marketplace (growing India presence), and Google Workspace Marketplace. These provide discovery and distribution within platform ecosystems. Typically revenue share 15-30% but provide qualified, purchase-ready buyers.

Marketplace strategy considerations include: Brand control limitations (marketplace controls experience), Margin impact from commissions, Customer relationship ownership (marketplace often owns), Competitive visibility (you appear alongside competitors), and Dependency risk (algorithm changes affect visibility). Balance marketplace benefits against these considerations.

Marketplace optimization for India involves: Product listing quality (detailed specifications, professional images, video where supported), Pricing strategy (competitive pricing; marketplace buyers compare easily), Review management (ratings significantly impact conversion), Advertising investment (sponsored products, display ads within marketplace), and Inventory management (stockouts hurt marketplace standing).',
        '[
            {"title": "Evaluate marketplace fit", "description": "Assess which marketplaces align with your product and customer: Amazon Business, Flipkart, IndiaMART, or SaaS marketplaces with clear fit criteria"},
            {"title": "Analyze marketplace economics", "description": "Model marketplace channel economics including commissions, advertising costs, and operational overhead against direct sales comparison"},
            {"title": "Optimize marketplace presence", "description": "Audit and improve marketplace listings: product content, images, pricing, and review strategy for selected platforms"},
            {"title": "Develop marketplace growth plan", "description": "Create marketplace growth plan with investment in advertising, review generation, and inventory management with KPIs and timeline"}
        ]'::jsonb,
        '[
            {"title": "Amazon Business India", "url": "https://www.amazon.in/business", "type": "marketplace"},
            {"title": "IndiaMART Seller Guide", "url": "https://seller.indiamart.com/", "type": "marketplace"},
            {"title": "Flipkart Seller Hub", "url": "https://seller.flipkart.com/", "type": "marketplace"},
            {"title": "AWS Marketplace India", "url": "https://aws.amazon.com/marketplace", "type": "marketplace"}
        ]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 28: Government Sales via GeM Portal
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        28,
        'Government Sales via GeM Portal',
        'Government e-Marketplace (GeM) has transformed government procurement in India, processing over Rs 3 lakh crore in transactions. For vendors, GeM provides access to central and state government buyers, PSUs, and autonomous bodies. Understanding GeM processes, registration, and success factors enables capturing significant government market opportunity.

GeM overview and scale demonstrate opportunity magnitude. Mandatory for central government procurement above Rs 50,000. State government adoption growing rapidly. Over 60,000 government buyer organizations registered. 50+ lakh sellers across product and service categories. Average order value varies from lakhs to crores. Transparent, competitive procurement reduces traditional government sales complexity.

GeM registration process is prerequisites for selling. Seller registration requires: business registration documents (GSTIN, PAN), bank account details, authorized signatory details, and business category selection. Product/service catalog creation with specifications. Pricing updates (must maintain competitive pricing). OEM registration for manufacturers. Reseller authorization required for non-OEM sellers.

GeM procurement modes include: Direct purchase: up to Rs 25,000 without competition. L1 purchase: up to Rs 5 lakh, lowest-priced compliant seller wins automatically. Bidding/RA: above Rs 5 lakh, reverse auction or bid evaluation. Custom bidding: for complex requirements with technical evaluation. GeM Startup Runway: dedicated portal for DPIIT-registered startups with relaxed criteria.

GeM success factors for vendors include: Competitive pricing (L1 wins most transactions automatically), Catalog quality (detailed specifications matching buyer search), Ratings and reviews (quality metrics influence buyer confidence), Delivery performance (on-time delivery metrics tracked), and Query response speed (buyers can query sellers; fast response matters). Consistent performance across these factors builds GeM reputation.

GeM-specific considerations for SaaS and services: Software services increasingly procured via GeM. Catalog listing for standard offerings. Custom bidding for tailored solutions. Annual rate contracts for recurring services. Compliance requirements (data localization, security certifications) for some government buyers. Payment terms typically 30-45 days post-acceptance.

GeM limitations and complements apply: Not all government procurement flows through GeM. Defense procurement has separate DPSU processes. Some state governments have parallel platforms. Relationship-building with government buyers still matters for large opportunities. GeM supplements but doesn''t replace traditional government sales for complex deals.',
        '[
            {"title": "Complete GeM registration", "description": "Register as GeM seller with required documents, business verification, and catalog creation for your products/services"},
            {"title": "Optimize GeM catalog", "description": "Create detailed product/service listings with specifications matching government buyer search terms and compliance requirements"},
            {"title": "Develop GeM pricing strategy", "description": "Establish GeM pricing considering L1 dynamics, margin requirements, and competitive positioning with price monitoring system"},
            {"title": "Build GeM operations process", "description": "Create operational processes for GeM order management, delivery tracking, and performance metric maintenance"}
        ]'::jsonb,
        '[
            {"title": "GeM Portal", "url": "https://gem.gov.in/", "type": "government"},
            {"title": "GeM Seller Registration Guide", "url": "https://gem.gov.in/resources", "type": "guide"},
            {"title": "GeM Startup Runway", "url": "https://gem.gov.in/startup", "type": "government"},
            {"title": "Government Procurement Policies", "url": "https://doe.gov.in/", "type": "government"}
        ]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 29: Strategic Partnerships and Alliances
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        29,
        'Strategic Partnerships and Alliances',
        'Strategic partnerships create multiplier effects beyond transactional reseller relationships. Technology integrations, co-selling agreements, and ecosystem plays can dramatically accelerate growth. In India''s relationship-driven market, strong partnerships with established players provide credibility and access that would take years to build independently.

Technology partnerships create integration value. Integrate with platforms your customers already use: Tally (accounting), Zoho (business suite), Freshworks (customer engagement), SAP/Oracle (enterprise), and banking platforms. Integration reduces friction in customer adoption. Co-marketing with technology partners extends reach. Joint solutions combining capabilities create differentiated offerings.

Co-selling partnerships leverage complementary sales forces. System integrators (TCS, Infosys, Wipro, HCL) for enterprise access. Regional IT services companies for mid-market. Accounting firms for finance solutions. HR consultancies for HR tech. Partnership structures: referral fees, revenue sharing, or joint solution pricing. SI partnerships particularly valuable for enterprise deals where they own implementation relationships.

Ecosystem partnerships with platforms provide distribution. Zoho ecosystem includes thousands of small businesses. AWS and Azure partner networks reach technology buyers. Industry association partnerships access sector-specific buyers. Startup ecosystem partnerships (accelerators, VCs) reach emerging companies. Platform ISV programs often include co-marketing and lead sharing.

Strategic partnership development follows structured approach. Partnership identification: map potential partners by value they could provide (customers, credibility, technology, geography). Partner qualification: assess strategic alignment, cultural fit, and economic viability. Relationship building: multiple touchpoints before formal partnership discussion. Partnership structuring: clear terms on responsibilities, economics, and governance. Launch and enablement: joint announcement, sales training, and marketing activation. Ongoing management: regular reviews, pipeline sharing, and issue resolution.

Indian partnership dynamics require patience. Relationships develop slowly; rushing to formal agreements can backfire. Personal connections often precede organizational partnerships. Social interactions (meals, events) are part of partnership building. Start with small pilots before committing to large partnerships. Success in initial engagements earns expanded partnership scope.

Partnership metrics track health and value. Revenue influenced or generated by partner. Pipeline contribution from partner sources. Joint customer success metrics. Partner engagement and activity levels. ROI of partnership investment. Regular reviews with partners on metrics ensure alignment and accountability.',
        '[
            {"title": "Map partnership opportunities", "description": "Identify potential strategic partners across technology, co-selling, and ecosystem categories with value proposition for each"},
            {"title": "Prioritize partnership targets", "description": "Rank partnership opportunities by potential value, feasibility, and alignment. Select top 3-5 for active pursuit"},
            {"title": "Develop partnership playbook", "description": "Create partnership development process: identification criteria, qualification framework, relationship building approach, and structuring guidelines"},
            {"title": "Build partnership pitch", "description": "Develop partnership value proposition and pitch for priority partners highlighting mutual benefits and proposed structure"}
        ]'::jsonb,
        '[
            {"title": "Strategic Alliance Best Practices", "url": "https://www.bain.com/", "type": "guide"},
            {"title": "ISV Partner Programs Guide", "url": "https://www.channelpartnersonline.com/", "type": "guide"},
            {"title": "SI Partnership Strategies", "url": "https://www.forrester.com/", "type": "research"},
            {"title": "Partnership Agreement Templates", "url": "https://www.lawinsider.com/", "type": "templates"}
        ]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 30: Channel Operations and Partner Performance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        30,
        'Channel Operations and Partner Performance',
        'Channel operations infrastructure enables scalable partner management as networks grow. Systems, processes, and metrics must support partner lifecycle from recruitment through ongoing performance management. Strong operations prevent channel programs from becoming chaotic as partner count increases.

Partner relationship management (PRM) systems centralize partner operations. Core PRM functions include: partner portal for resources and deal registration, lead distribution and tracking, training and certification management, performance dashboards, and commission/margin calculation. PRM options range from CRM extensions (Salesforce Partner Community, HubSpot) to specialized platforms (Impartner, Zift Solutions, Allbound). For smaller programs, structured spreadsheets and basic portals can suffice initially.

Deal registration protects partner investment. Registration process should be simple (online form, few required fields). Clear rules on registration validity period (typically 90-180 days). First-to-register generally wins; exceptions clearly defined. Registration visibility to sales team to prevent conflict. Automated approval for qualifying deals; management review for exceptions.

Partner performance management drives results. Key metrics: revenue generated, pipeline created, certifications achieved, deal registration activity, customer satisfaction, and support ticket volume. Regular performance reviews (quarterly for strategic partners, semi-annual for others). Performance tiers with benefits and consequences (tier adjustment, program removal for persistent underperformance). Top partner recognition and incentives.

Partner incentives motivate desired behaviors. Revenue-based incentives: commission rates, volume bonuses, accelerators for growth. Activity-based incentives: bonuses for certifications, marketing activities, or deal registrations. Strategic incentives: co-investment in market development, exclusive offerings. Incentive programs should balance motivation with sustainable economics.

Channel conflict resolution maintains trust. Clear rules of engagement documented and communicated. Deal registration as primary conflict prevention mechanism. Neutral review process for disputes. Consistent application of rules regardless of partner size. Communication with both parties on resolution rationale. Tracking conflict patterns to improve rules.

Channel operations scaling requires investment as programs grow. Dedicated channel operations headcount for 20+ active partners. PRM system becomes essential above 50 partners. Automated commission calculation and payment. Regular training and certification maintenance. Quality assurance on partner customer interactions. This operations investment ensures channel growth remains sustainable.',
        '[
            {"title": "Implement partner systems", "description": "Select and implement PRM system or structured manual processes for partner management: portal, deal registration, training tracking, and performance dashboards"},
            {"title": "Design deal registration process", "description": "Create deal registration process with forms, rules, approval workflow, and conflict resolution guidelines documented and communicated"},
            {"title": "Build partner scorecard", "description": "Develop partner performance scorecard with metrics, targets, review cadence, and tier implications for performance outcomes"},
            {"title": "Create channel operations playbook", "description": "Document all channel operations processes: onboarding, enablement, deal registration, performance management, and incentives in comprehensive playbook"}
        ]'::jsonb,
        '[
            {"title": "Salesforce Partner Community", "url": "https://www.salesforce.com/", "type": "tool"},
            {"title": "Impartner PRM", "url": "https://www.impartner.com/", "type": "tool"},
            {"title": "Channel Operations Guide", "url": "https://www.channelpartnersonline.com/", "type": "guide"},
            {"title": "Partner Incentive Design", "url": "https://www.mckinsey.com/", "type": "framework"}
        ]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

END $$;

COMMIT;
