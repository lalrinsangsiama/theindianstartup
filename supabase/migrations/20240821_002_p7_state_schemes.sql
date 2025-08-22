-- P7: State-wise Scheme Map - Complete Navigation Mastery
-- Comprehensive course content deployment script

BEGIN;

-- First, ensure P7 product exists with updated description
INSERT INTO products (id, code, title, description, price, estimated_days, created_at, updated_at)
VALUES (
    'p7-state-scheme-map',
    'P7',
    'State-wise Scheme Map - Complete Navigation',
    'Master India''s state ecosystem with comprehensive coverage of all states and UTs. Access 500+ state schemes, unlock ₹10L-₹5Cr in benefits, achieve 30-50% cost savings through strategic state benefits, and build government relationships across India.',
    4999,
    33,
    NOW(),
    NOW()
)
ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    estimated_days = EXCLUDED.estimated_days,
    updated_at = NOW();

-- Get the product ID
DO $$
DECLARE
    v_product_id UUID;
    v_module_id UUID;
BEGIN
    SELECT id INTO v_product_id FROM products WHERE code = 'P7';

    -- Module 1: Understanding India's Federal Structure (Days 1-3)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 1: Understanding India''s Federal Structure',
        'Transform your understanding of India''s competitive state ecosystem and discover the ₹50 lakh hidden opportunity',
        1,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 1 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 1, 'The ₹50 Lakh Hidden Opportunity in State Benefits',
     'Discover how strategic location decisions can save you ₹10-50 lakhs annually through state competition for businesses. Learn about capital subsidies (15-50%), interest subventions (5-7%), tax holidays (5-15 years), and operational subsidies that most entrepreneurs never claim.',
     jsonb_build_array(
         jsonb_build_object('task', 'Complete Current Location Cost Analysis', 'completed', false),
         jsonb_build_object('task', 'Calculate potential savings using State Benefit Calculator', 'completed', false),
         jsonb_build_object('task', 'Research 5 competitor locations and their advantages', 'completed', false),
         jsonb_build_object('task', 'Map multi-state opportunity for your business', 'completed', false),
         jsonb_build_object('task', 'Identify ₹10L+ in unclaimed benefits', 'completed', false)
     ),
     jsonb_build_object(
         'videos', jsonb_build_array(
             'Hidden Millions: State Benefits Masterclass (90 min)',
             'Multi-State Tax Optimization Strategies (60 min)',
             'Quick Wins: Benefits You Can Claim Tomorrow (30 min)'
         ),
         'templates', jsonb_build_array(
             'State Benefit Calculator v3.0',
             'Location ROI Analyzer',
             'Multi-State Tax Optimizer',
             'Industry Cluster Heat Map',
             'Quick Benefit Eligibility Checker'
         ),
         'documents', jsonb_build_array(
             '500+ Schemes Master Database',
             'Government Contact Directory (1000+ officials)',
             'Success Stories Library (50+ cases)',
             'State Competition Landscape Report 2024'
         )
     ),
     45, 150, 1),

    (v_module_id, 2, 'Central-State Coordination - Double Your Benefits',
     'Master the art of combining central and state schemes for 2-3x benefit multiplication. Learn how states add their own benefits on top of central schemes like Startup India, MSME schemes, PLI, Make in India, and Digital India.',
     jsonb_build_array(
         jsonb_build_object('task', 'Audit all applicable central schemes', 'completed', false),
         jsonb_build_object('task', 'Map state additions for top 3 central schemes', 'completed', false),
         jsonb_build_object('task', 'Create benefit stacking strategy', 'completed', false),
         jsonb_build_object('task', 'Design 30-day implementation plan', 'completed', false),
         jsonb_build_object('task', 'Calculate combined benefit potential', 'completed', false)
     ),
     jsonb_build_object(
         'videos', jsonb_build_array(
             'The Art of Benefit Stacking (45 min)',
             'Central Scheme Mastery (60 min)',
             'State Amplification Strategies (45 min)'
         ),
         'templates', jsonb_build_array(
             'Benefit Stacking Calculator',
             'Central-State Mapping Matrix',
             'Application Sequencer',
             'Document Generator',
             'Success Probability Analyzer'
         ),
         'case_studies', jsonb_build_array(
             'RoboTech: ₹3.9 Cr benefits on ₹3 Cr investment',
             'Tech Startup: ₹2 Cr benefits on ₹50L investment',
             'Manufacturing SME: ₹5 Cr benefits on ₹3 Cr investment'
         )
     ),
     45, 175, 2),

    (v_module_id, 3, 'Strategic Location Selection - Your ₹50 Lakh Decision Framework',
     'Master the 50-factor framework to select optimal locations for maximum competitive advantage. Design multi-state strategies for 30-50% cost advantages and ₹50L-₹5Cr in direct benefits.',
     jsonb_build_array(
         jsonb_build_object('task', 'Complete 50-factor analysis for top 3 locations', 'completed', false),
         jsonb_build_object('task', 'Create 5-year TCO comparison', 'completed', false),
         jsonb_build_object('task', 'Design optimal multi-state presence', 'completed', false),
         jsonb_build_object('task', 'Build 12-month implementation roadmap', 'completed', false),
         jsonb_build_object('task', 'Identify location arbitrage opportunities', 'completed', false)
     ),
     jsonb_build_object(
         'tools', jsonb_build_array(
             '50-Factor Location Scorer (Excel)',
             'Multi-State ROI Calculator',
             'Location Risk Analyzer',
             'Competitive Intelligence Tool',
             'Implementation Roadmap Generator'
         ),
         'frameworks', jsonb_build_array(
             'Financial Factors Analysis (30% weight)',
             'Infrastructure Evaluation (20% weight)',
             'Talent & Ecosystem Assessment (20% weight)',
             'Market Access Scoring (15% weight)',
             'Government Support Rating (10% weight)',
             'Quality of Life Index (5% weight)'
         ),
         'examples', jsonb_build_array(
             'CloudNine: ₹1.3 Cr/year savings through multi-state',
             'D2C Fashion: 35% operational savings',
             'SaaS Startup: ₹1.8 Cr/year advantage'
         )
     ),
     60, 200, 3);

    -- Module 2: Northern States Deep Dive (Days 4-7)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 2: Northern States Deep Dive',
        'Delhi NCR, Haryana, Punjab, UP - Unlock North India''s ₹50,000 Cr opportunity with detailed schemes and benefits',
        2,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 2 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 4, 'Delhi NCR - Unlock the Capital Advantage',
     'Master Delhi NCR ecosystem to access ₹50L+ benefits. Navigate Delhi Startup Policy (₹25L seed fund, ₹1 Cr collateral-free loan), Haryana benefits (30-50% capital subsidy), and NOIDA advantages (UP schemes + SEZ benefits).',
     jsonb_build_array(
         jsonb_build_object('task', 'Complete Delhi NCR benefits eligibility check', 'completed', false),
         jsonb_build_object('task', 'Compare costs across Delhi, Gurgaon, NOIDA', 'completed', false),
         jsonb_build_object('task', 'Schedule meetings with 3 government departments', 'completed', false),
         jsonb_build_object('task', 'Create 30-day NCR establishment plan', 'completed', false),
         jsonb_build_object('task', 'Apply for Delhi Startup recognition', 'completed', false)
     ),
     jsonb_build_object(
         'contacts', jsonb_build_array(
             'DSIIDC: 011-23378471, dsiidc@delhi.gov.in',
             'Haryana HSIIDC: 0172-2590523',
             'NOIDA Authority: 0120-2316200',
             'Delhi Finance Corporation: 011-23370224'
         ),
         'schemes', jsonb_build_array(
             'Delhi Seed Fund: ₹10-25 lakhs',
             'Collateral-free Loan: Up to ₹1 Cr',
             'Office Space Subsidy: 50% up to ₹5L/year',
             'Haryana Capital Subsidy: 30-50%',
             'NOIDA SEZ Benefits: 10-year tax holiday'
         ),
         'success_stories', jsonb_build_array(
             'UrbanClap: ₹2.5 Cr benefits leveraged',
             'Zomato: Gurgaon advantage story',
             'Paytm: NOIDA benefits maximization'
         )
     ),
     45, 180, 4),

    (v_module_id, 5, 'Haryana - Manufacturing & Auto Hub Mastery',
     'Leverage Haryana''s industrial ecosystem for 50% cost advantages. Access capital subsidies up to ₹75L, 6% interest subvention, 100% electricity duty exemption, and specialized benefits for auto, textiles, and engineering sectors.',
     jsonb_build_array(
         jsonb_build_object('task', 'Calculate Haryana benefits for your investment', 'completed', false),
         jsonb_build_object('task', 'Identify optimal industrial cluster location', 'completed', false),
         jsonb_build_object('task', 'Prepare Haryana scheme applications', 'completed', false),
         jsonb_build_object('task', 'Connect with HSIIDC officials', 'completed', false),
         jsonb_build_object('task', 'Visit 3 potential sites in Haryana', 'completed', false)
     ),
     jsonb_build_object(
         'industrial_clusters', jsonb_build_array(
             'Gurugram: IT/ITES hub',
             'Faridabad: Engineering cluster',
             'Panipat: Textile city',
             'Sonipat: Sports goods',
             'Karnal: Agricultural equipment'
         ),
         'special_schemes', jsonb_build_array(
             'Padma Shri Devi Scheme for women',
             'Antyodaya MSME Scheme',
             'Export Award benefits',
             'Technology upgradation support',
             'Employment generation: ₹48,000/job'
         )
     ),
     45, 160, 5),

    (v_module_id, 6, 'Punjab - Agri-Tech & Sports Excellence',
     'Access Punjab''s specialized benefits for sports goods, textiles, food processing, and agri-tech. Get 20-30% capital subsidy, 5% interest subvention, ₹2/unit power subsidy, and 100% stamp duty exemption.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Punjab sector-specific advantages', 'completed', false),
         jsonb_build_object('task', 'Calculate border area extra benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with PSIEC officials', 'completed', false),
         jsonb_build_object('task', 'Prepare Punjab investment proposal', 'completed', false),
         jsonb_build_object('task', 'Explore export-oriented benefits', 'completed', false)
     ),
     jsonb_build_object(
         'focus_sectors', jsonb_build_array(
             'Sports goods manufacturing (Jalandhar)',
             'Textile and apparel (Ludhiana)',
             'Food processing units',
             'Leather products',
             'Bicycle parts manufacturing'
         ),
         'unique_benefits', jsonb_build_array(
             'Border area incentives: 30% extra',
             'SC/ST entrepreneurs: 35% subsidy',
             'Green industry bonus benefits',
             'Export promotion schemes',
             'Skill development grants'
         )
     ),
     45, 150, 6),

    (v_module_id, 7, 'Uttar Pradesh - Emerging Powerhouse Benefits',
     'Tap into UP''s massive market and aggressive new policies. Access ₹10-20L seed fund, 25% capital subsidy, 5% interest subsidy, and benefits from One District One Product (ODOP) scheme.',
     jsonb_build_array(
         jsonb_build_object('task', 'Register on Nivesh Mitra portal', 'completed', false),
         jsonb_build_object('task', 'Identify ODOP opportunities in target districts', 'completed', false),
         jsonb_build_object('task', 'Calculate UP Startup Policy benefits', 'completed', false),
         jsonb_build_object('task', 'Schedule meetings via Udyog Bandhu', 'completed', false),
         jsonb_build_object('task', 'Evaluate Noida vs other UP locations', 'completed', false)
     ),
     jsonb_build_object(
         'regional_advantages', jsonb_build_array(
             'Noida: IT/Software hub benefits',
             'Agra: Leather and footwear cluster',
             'Kanpur: Textile manufacturing',
             'Varanasi: Handicrafts hub',
             'Moradabad: Brass work specialization'
         ),
         'flagship_programs', jsonb_build_array(
             'UP Startup Fund: ₹10-20 lakhs',
             'ODOP scheme benefits',
             'Nivesh Mitra single window',
             'MSME Sathi mobile app',
             'Mukhyamantri Yuva Swarozgar Yojana'
         )
     ),
     45, 170, 7);

    -- Module 3: Western States Excellence (Days 8-11)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 3: Western States Excellence',
        'Maharashtra, Gujarat, Rajasthan, Goa - Access India''s industrial powerhouse with maximum subsidies and infrastructure',
        3,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 3 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 8, 'Maharashtra - Financial Capital Advantages',
     'Leverage Mumbai''s financial ecosystem and Maharashtra''s industrial might. Access 20-40% capital subsidy (max ₹2 Cr), mega project benefits up to ₹100 Cr, and specialized schemes for IT, manufacturing, and entertainment sectors.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Mumbai vs Pune vs Nashik locations', 'completed', false),
         jsonb_build_object('task', 'Calculate Package Scheme of Incentives (PSI) benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with MIDC for land options', 'completed', false),
         jsonb_build_object('task', 'Explore IT park opportunities', 'completed', false),
         jsonb_build_object('task', 'Prepare Maharashtra investment proposal', 'completed', false)
     ),
     jsonb_build_object(
         'regional_clusters', jsonb_build_array(
             'Mumbai: Financial services & entertainment',
             'Pune: IT and manufacturing hub',
             'Nashik: Wine and engineering',
             'Aurangabad: Auto components',
             'Nagpur: Mining and minerals'
         ),
         'mega_benefits', jsonb_build_array(
             'Capital subsidy: Up to ₹2 Cr',
             'Interest subsidy: 5% for 5 years',
             'Power tariff: ₹2/unit concession',
             'Stamp duty: 100% exemption',
             'Technology acquisition: 50% support'
         )
     ),
     45, 180, 8),

    (v_module_id, 9, 'Gujarat - Vibrant Business Ecosystem',
     'Master Gujarat''s industry-friendly policies and world-class infrastructure. Get 25-35% capital subsidy, 7% interest subsidy for MSMEs, plug-and-play GIDC estates, and benefits from Vibrant Gujarat Summit connections.',
     jsonb_build_array(
         jsonb_build_object('task', 'Register for Vibrant Gujarat Summit', 'completed', false),
         jsonb_build_object('task', 'Evaluate GIDC industrial estates', 'completed', false),
         jsonb_build_object('task', 'Calculate sector-specific Gujarat benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with Industries Commissionerate', 'completed', false),
         jsonb_build_object('task', 'Visit potential sites in Gujarat', 'completed', false)
     ),
     jsonb_build_object(
         'infrastructure', jsonb_build_array(
             'GIDC estates: ₹500-1500/sq.m',
             'Plug-and-play factories',
             'Port-based industries support',
             'Diamond processing hub benefits',
             'Chemical/petrochemical clusters'
         ),
         'vibrant_gujarat', jsonb_build_array(
             'Direct MOU opportunities',
             'Global investor connections',
             'Fast-track approvals',
             'Media visibility',
             'Partnership facilitation'
         )
     ),
     45, 170, 9),

    (v_module_id, 10, 'Rajasthan - Tourism & Handicrafts Benefits',
     'Access Rajasthan''s unique benefits for tourism, handicrafts, textiles, and renewable energy. Get 30% investment subsidy (max ₹75L), 7-year SGST reimbursement, and customized packages for mega projects.',
     jsonb_build_array(
         jsonb_build_object('task', 'Explore RIICO industrial areas', 'completed', false),
         jsonb_build_object('task', 'Calculate Rajasthan investment benefits', 'completed', false),
         jsonb_build_object('task', 'Identify tourism-linked opportunities', 'completed', false),
         jsonb_build_object('task', 'Connect with Bureau of Investment Promotion', 'completed', false),
         jsonb_build_object('task', 'Evaluate renewable energy benefits', 'completed', false)
     ),
     jsonb_build_object(
         'traditional_strengths', jsonb_build_array(
             'Handicrafts and textiles excellence',
             'Tourism and hospitality ecosystem',
             'Marble and minerals processing',
             'Renewable energy leadership',
             'Agro-processing opportunities'
         ),
         'investment_benefits', jsonb_build_array(
             'Investment subsidy: 30% (max ₹75L)',
             'Employment generation: ₹10,000/person',
             'Land tax exemption: 7 years',
             'Electricity duty: 50% for 7 years',
             'SGST reimbursement: 75% for 7 years'
         )
     ),
     45, 160, 10),

    (v_module_id, 11, 'Goa - Small State, Big Opportunities',
     'Leverage Goa''s unique advantages for startups and tourism-tech. Access ₹20L seed grant, ₹30K monthly sustenance allowance, ₹3 Cr acceleration fund, and benefits from peaceful environment with international connectivity.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Goa Startup Policy benefits', 'completed', false),
         jsonb_build_object('task', 'Calculate tourism-tech opportunities', 'completed', false),
         jsonb_build_object('task', 'Connect with Goa IDC', 'completed', false),
         jsonb_build_object('task', 'Explore pharma sector benefits', 'completed', false),
         jsonb_build_object('task', 'Assess quality of life advantages', 'completed', false)
     ),
     jsonb_build_object(
         'startup_benefits', jsonb_build_array(
             'Seed grant: ₹20 lakhs',
             'Monthly sustenance: ₹30,000',
             'Prototype grant: ₹5 lakhs',
             'Marketing support: ₹5 lakhs',
             'Acceleration fund: ₹3 Cr pool'
         ),
         'focus_areas', jsonb_build_array(
             'Tourism technology',
             'Marine industries',
             'Pharmaceuticals',
             'IT and software',
             'Food processing'
         )
     ),
     45, 150, 11);

    -- Module 4: Southern States Powerhouse (Days 12-16)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 4: Southern States Powerhouse',
        'Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala - Tech & manufacturing goldmine with progressive policies',
        4,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 4 Lessons (Days 12-16)
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 12, 'Karnataka - India''s Silicon Valley Benefits',
     'Master Bangalore''s startup ecosystem and Karnataka''s tech leadership. Access ₹50L seed funding, ₹3 Cr scale-up assistance, ELEVATE 100 program, and benefits from 400+ R&D centers and highest VC concentration.',
     jsonb_build_array(
         jsonb_build_object('task', 'Apply for Karnataka Startup registration', 'completed', false),
         jsonb_build_object('task', 'Evaluate Bangalore vs Mysore vs Hubli', 'completed', false),
         jsonb_build_object('task', 'Calculate ELEVATE 100 eligibility', 'completed', false),
         jsonb_build_object('task', 'Connect with Karnataka MSME department', 'completed', false),
         jsonb_build_object('task', 'Explore biotech/aerospace special benefits', 'completed', false)
     ),
     jsonb_build_object(
         'startup_programs', jsonb_build_array(
             'Seed funding: ₹50 lakhs',
             'Idea2PoC grant: ₹50 lakhs',
             'Scale-up assistance: ₹3 Cr',
             'Global market access: ₹20 lakhs',
             'Patent support: 100% reimbursement'
         ),
         'bangalore_ecosystem', jsonb_build_array(
             '400+ R&D centers',
             'Global tech headquarters',
             'Highest startup density',
             'VC fund concentration',
             'Talent availability leadership'
         )
     ),
     60, 200, 12),

    (v_module_id, 13, 'Tamil Nadu - Manufacturing Excellence Hub',
     'Leverage Tamil Nadu''s manufacturing leadership and port infrastructure. Get 50% capital subsidy (max ₹30L), payroll subsidy of ₹48K/job, 100% electricity tax waiver, and benefits from auto, healthcare, and leather clusters.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Chennai vs Coimbatore vs Tirupur', 'completed', false),
         jsonb_build_object('task', 'Calculate TN industrial policy benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with Guidance Tamil Nadu', 'completed', false),
         jsonb_build_object('task', 'Explore SIPCOT industrial parks', 'completed', false),
         jsonb_build_object('task', 'Assess export-oriented benefits', 'completed', false)
     ),
     jsonb_build_object(
         'district_specializations', jsonb_build_array(
             'Chennai: IT and healthcare capital',
             'Coimbatore: Textiles and engineering',
             'Tirupur: Knitwear capital of India',
             'Hosur: Electronics manufacturing',
             'Madurai: Temple tourism opportunities'
         ),
         'manufacturing_benefits', jsonb_build_array(
             'Capital subsidy: 50% (max ₹30L)',
             'Interest subvention: 5% for 5 years',
             'Payroll subsidy: ₹48,000/job',
             'Land at 50% concession',
             'Amma skill training: Free'
         )
     ),
     60, 190, 13),

    (v_module_id, 14, 'Telangana - Youngest State, Boldest Policies',
     'Access Telangana''s aggressive growth policies and T-Hub ecosystem. Get T-IDEA funding ₹10-15L, T-SEED grant ₹40L, benefits from India''s largest incubator, and TS-iPASS 15-day clearances.',
     jsonb_build_array(
         jsonb_build_object('task', 'Register with T-Hub incubator', 'completed', false),
         jsonb_build_object('task', 'Apply for T-IDEA/T-SEED funding', 'completed', false),
         jsonb_build_object('task', 'Explore WE Hub for women entrepreneurs', 'completed', false),
         jsonb_build_object('task', 'Calculate Hyderabad location benefits', 'completed', false),
         jsonb_build_object('task', 'Connect via TS-iPASS single window', 'completed', false)
     ),
     jsonb_build_object(
         'innovation_programs', jsonb_build_array(
             'T-IDEA funding: ₹10-15 lakhs',
             'T-SEED grant: ₹40 lakhs',
             'Incubation support: 50% subsidy',
             'Marketing assistance: ₹10 lakhs',
             'Patent filing: 100% reimbursement'
         ),
         'hyderabad_advantages', jsonb_build_array(
             'IT infrastructure excellence',
             'Pharma capital of India',
             'Aerospace hub development',
             'HITEC City ecosystem',
             'International airport connectivity'
         )
     ),
     60, 185, 14),

    (v_module_id, 15, 'Andhra Pradesh - Sunrise State Opportunities',
     'Leverage AP''s ambitious industrial development and port advantages. Access 15-30% investment subsidy, Sri City multi-product SEZ, sector-specific parks, and benefits from 974km coastline.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Sri City SEZ opportunities', 'completed', false),
         jsonb_build_object('task', 'Calculate AP industrial benefits', 'completed', false),
         jsonb_build_object('task', 'Explore sector-specific parks', 'completed', false),
         jsonb_build_object('task', 'Connect with AP Investment Board', 'completed', false),
         jsonb_build_object('task', 'Assess port-linked advantages', 'completed', false)
     ),
     jsonb_build_object(
         'regional_strengths', jsonb_build_array(
             'Visakhapatnam: Pharma and IT hub',
             'Tirupati: Electronics cluster',
             'Anantapur: Solar energy leader',
             'Krishna: Aqua processing zone',
             'Chittoor: Automobile manufacturing'
         ),
         'mega_initiatives', jsonb_build_array(
             'Sri City multi-product SEZ',
             'Electronics manufacturing clusters',
             'Food processing zones',
             'Pharma parks development',
             'Textile parks infrastructure'
         )
     ),
     60, 175, 15),

    (v_module_id, 16, 'Kerala - God''s Own Startup Ecosystem',
     'Access Kerala''s unique startup benefits and quality of life. Get ₹25L seed loan at 4%, ₹1 Cr scale-up grant, benefits from student entrepreneurship focus, and opportunities in space tech and marine industries.',
     jsonb_build_array(
         jsonb_build_object('task', 'Apply to Kerala Startup Mission', 'completed', false),
         jsonb_build_object('task', 'Calculate Kerala startup benefits', 'completed', false),
         jsonb_build_object('task', 'Explore space/marine sector opportunities', 'completed', false),
         jsonb_build_object('task', 'Connect with KSUM incubators', 'completed', false),
         jsonb_build_object('task', 'Evaluate Kochi vs Trivandrum benefits', 'completed', false)
     ),
     jsonb_build_object(
         'startup_support', jsonb_build_array(
             'Seed loan: ₹25 lakhs at 4%',
             'Product development: ₹10 lakhs',
             'Scale-up grant: ₹1 Cr',
             'Women/SC/ST: 15% extra benefits',
             'Student entrepreneurs: ₹15L special fund'
         ),
         'unique_features', jsonb_build_array(
             'Student entrepreneurship focus',
             'Fab labs in colleges',
             'Rural innovation support',
             'Social enterprise benefits',
             'Quality of life advantages'
         )
     ),
     60, 170, 16);

    -- Module 5: Eastern States Opportunities (Days 17-20)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 5: Eastern States Opportunities',
        'West Bengal, Odisha, Jharkhand, Bihar - Emerging economy benefits with resource advantages and growing infrastructure',
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 5 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 17, 'West Bengal - Eastern Gateway Benefits',
     'Access Kolkata''s financial hub advantages and Bengal''s industrial revival. Get 15-30% capital subsidy, 4% interest subsidy, cluster development funds, and benefits from port connectivity.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Kolkata location advantages', 'completed', false),
         jsonb_build_object('task', 'Calculate WB MSME policy benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with WBMSME department', 'completed', false),
         jsonb_build_object('task', 'Explore jute/textile opportunities', 'completed', false),
         jsonb_build_object('task', 'Assess IT sector growth benefits', 'completed', false)
     ),
     jsonb_build_object(
         'sectoral_strengths', jsonb_build_array(
             'Jute and textiles heritage',
             'Tea processing leadership',
             'Engineering goods manufacturing',
             'Leather products excellence',
             'IT and ITES growth'
         )
     ),
     45, 160, 17),

    (v_module_id, 18, 'Odisha - Mining to Manufacturing Transition',
     'Leverage Odisha''s resource wealth and industrial transformation. Access 30% capital subsidy (max ₹1 Cr), 75% GST reimbursement, free land conversion, and benefits from mineral resources and long coastline.',
     jsonb_build_array(
         jsonb_build_object('task', 'Calculate Odisha industrial benefits', 'completed', false),
         jsonb_build_object('task', 'Explore mining downstream opportunities', 'completed', false),
         jsonb_build_object('task', 'Connect with Odisha MSME department', 'completed', false),
         jsonb_build_object('task', 'Evaluate port-based industries', 'completed', false),
         jsonb_build_object('task', 'Assess power availability advantages', 'completed', false)
     ),
     jsonb_build_object(
         'natural_advantages', jsonb_build_array(
             'Mineral resources abundance',
             '480km coastline access',
             'Port infrastructure development',
             'Power surplus state',
             'Land availability'
         ),
         'growth_sectors', jsonb_build_array(
             'Metal downstream industries',
             'Chemicals and petrochemicals',
             'Food processing units',
             'Textiles and apparel',
             'Tourism development'
         )
     ),
     45, 165, 18),

    (v_module_id, 19, 'Jharkhand - Resource Rich Advantages',
     'Access Jharkhand''s mineral wealth benefits and industrial corridors. Get 40% capital subsidy (max ₹50L), 50% interest subsidy, 100% stamp duty reimbursement, and benefits from power surplus.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Jharkhand resource advantages', 'completed', false),
         jsonb_build_object('task', 'Calculate industrial policy benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with Department of Industries', 'completed', false),
         jsonb_build_object('task', 'Explore mineral-based opportunities', 'completed', false),
         jsonb_build_object('task', 'Assess industrial corridor benefits', 'completed', false)
     ),
     jsonb_build_object(
         'key_resources', jsonb_build_array(
             'Mineral wealth leadership',
             'Forest products availability',
             'Skilled workforce presence',
             'Power surplus advantage',
             'Industrial corridors development'
         )
     ),
     45, 155, 19),

    (v_module_id, 20, 'Bihar - Emerging Economy Benefits',
     'Tap into Bihar''s large market and development focus. Access 15-20% capital subsidy, ₹1/unit power subsidy, 100% patent filing support, and benefits from food processing and textile opportunities.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate Bihar market opportunities', 'completed', false),
         jsonb_build_object('task', 'Calculate Bihar industrial benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with BIADA officials', 'completed', false),
         jsonb_build_object('task', 'Explore food processing benefits', 'completed', false),
         jsonb_build_object('task', 'Assess IT sector potential', 'completed', false)
     ),
     jsonb_build_object(
         'focus_sectors', jsonb_build_array(
             'Food processing leadership',
             'Textiles development',
             'Leather industry growth',
             'Tourism potential',
             'IT and electronics emergence'
         )
     ),
     45, 150, 20);

    -- Module 6: North-Eastern States Special Benefits (Days 21-23)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 6: North-Eastern Special Benefits',
        'Assam & 7 sisters - Maximum subsidies up to 90% with special central support and strategic advantages',
        6,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 6 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 21, 'Assam & North-East Industrial Development Scheme',
     'Access maximum benefits under NEIDS with 30% capital subsidy (max ₹5 Cr), 10-year income tax exemption, 100% insurance subsidy, and Assam-specific additional 10% benefits.',
     jsonb_build_array(
         jsonb_build_object('task', 'Calculate NEIDS benefits for your business', 'completed', false),
         jsonb_build_object('task', 'Evaluate Guwahati startup hub opportunities', 'completed', false),
         jsonb_build_object('task', 'Connect with Assam Industries Department', 'completed', false),
         jsonb_build_object('task', 'Explore tea/bamboo processing benefits', 'completed', false),
         jsonb_build_object('task', 'Assess logistics and connectivity', 'completed', false)
     ),
     jsonb_build_object(
         'neids_benefits', jsonb_build_array(
             'Capital subsidy: 30% (max ₹5 Cr)',
             'Interest subsidy: 3% for 5 years',
             'Insurance subsidy: 100%',
             'Transport subsidy: 20%',
             'Income tax exemption: 10 years'
         ),
         'assam_additional', jsonb_build_array(
             'Extra 10% capital subsidy',
             'GST reimbursement: 90%',
             'Power subsidy: 30%',
             'Guwahati startup hub access',
             'Tea industry support'
         )
     ),
     45, 180, 21),

    (v_module_id, 22, 'Seven Sisters State-Specific Advantages',
     'Explore unique benefits across Meghalaya, Tripura, Manipur, Mizoram, Nagaland, Arunachal Pradesh, and Sikkim with focus on organic farming, handicrafts, tourism, and border trade.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate state-specific sector advantages', 'completed', false),
         jsonb_build_object('task', 'Calculate border trade opportunities', 'completed', false),
         jsonb_build_object('task', 'Explore organic/natural product benefits', 'completed', false),
         jsonb_build_object('task', 'Connect with state industries departments', 'completed', false),
         jsonb_build_object('task', 'Assess tourism-linked opportunities', 'completed', false)
     ),
     jsonb_build_object(
         'state_specializations', jsonb_build_array(
             'Meghalaya: Tourism and organic farming',
             'Tripura: Rubber and natural gas',
             'Manipur: Handloom and sports goods',
             'Mizoram: Bamboo and sericulture',
             'Nagaland: Agro-processing and handloom',
             'Arunachal: Hydropower and tourism',
             'Sikkim: Pharma hub and organic state'
         )
     ),
     45, 165, 22),

    (v_module_id, 23, 'Central India States - MP & Chhattisgarh',
     'Access central India''s strategic location benefits. MP offers 35% capital subsidy (max ₹75L) with IT/textile parks. Chhattisgarh provides 30% capital subsidy with mining-based industry opportunities.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate central location advantages', 'completed', false),
         jsonb_build_object('task', 'Calculate MP incubation benefits', 'completed', false),
         jsonb_build_object('task', 'Explore Chhattisgarh mining opportunities', 'completed', false),
         jsonb_build_object('task', 'Connect with state departments', 'completed', false),
         jsonb_build_object('task', 'Assess logistics hub potential', 'completed', false)
     ),
     jsonb_build_object(
         'mp_benefits', jsonb_build_array(
             'Capital subsidy: 35% (max ₹75L)',
             'Interest subsidy: 5% for 5 years',
             'Entry tax exemption',
             'MP Incubation Policy support',
             'IT and textile parks'
         ),
         'chhattisgarh_benefits', jsonb_build_array(
             'Capital subsidy: 30%',
             'Interest subsidy: 40% of total',
             'Power subsidy: 30%',
             'Mining-based industries focus',
             'Forest products opportunities'
         )
     ),
     45, 155, 23);

    -- Module 7: Implementation Framework (Days 24-26)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 7: Implementation Framework',
        'Documentation mastery, multi-state operations, and systematic benefit realization strategies',
        7,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 7 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 24, 'Documentation Mastery & Application Process',
     'Master the art of government applications with perfect documentation. Learn common requirements, application strategies, timeline management, and success factors for maximum approval rates.',
     jsonb_build_array(
         jsonb_build_object('task', 'Prepare master project report', 'completed', false),
         jsonb_build_object('task', 'Gather all required certificates', 'completed', false),
         jsonb_build_object('task', 'Create application tracking system', 'completed', false),
         jsonb_build_object('task', 'Set up follow-up mechanisms', 'completed', false),
         jsonb_build_object('task', 'Build document repository', 'completed', false)
     ),
     jsonb_build_object(
         'common_documents', jsonb_build_array(
             'Udyog Aadhaar/Udyam registration',
             'Detailed project report',
             'Company registration certificates',
             'GST registration',
             'Bank statements (6 months)',
             'Land/lease documents',
             'Environmental clearances',
             'Financial projections (5 years)'
         ),
         'application_strategy', jsonb_build_array(
             'Online vs offline decision matrix',
             'Timeline optimization techniques',
             'Follow-up best practices',
             'Liaison coordination tips',
             'Common mistakes to avoid'
         )
     ),
     60, 170, 24),

    (v_module_id, 25, 'Multi-State Operations Management',
     'Design and manage efficient multi-state presence. Learn optimization frameworks, interstate coordination, compliance management, and relationship building across multiple states.',
     jsonb_build_array(
         jsonb_build_object('task', 'Design multi-state corporate structure', 'completed', false),
         jsonb_build_object('task', 'Create compliance tracking matrix', 'completed', false),
         jsonb_build_object('task', 'Set up interstate coordination system', 'completed', false),
         jsonb_build_object('task', 'Build government relationship map', 'completed', false),
         jsonb_build_object('task', 'Establish reporting mechanisms', 'completed', false)
     ),
     jsonb_build_object(
         'optimization_framework', jsonb_build_array(
             'Registered office selection criteria',
             'Manufacturing location optimization',
             'R&D center placement strategy',
             'Warehouse network design',
             'Sales office distribution'
         ),
         'compliance_management', jsonb_build_array(
             'GST implications and optimization',
             'Labour law multi-state compliance',
             'Environmental norms navigation',
             'Transportation logistics planning',
             'Cultural adaptation strategies'
         )
     ),
     60, 175, 25),

    (v_module_id, 26, 'Monitoring, Compliance & Relationship Management',
     'Build systems for ongoing benefit management and government relations. Master post-approval compliance, subsidy claims, renewal procedures, and long-term relationship strategies.',
     jsonb_build_array(
         jsonb_build_object('task', 'Create benefit tracking dashboard', 'completed', false),
         jsonb_build_object('task', 'Set up compliance calendar', 'completed', false),
         jsonb_build_object('task', 'Design relationship management system', 'completed', false),
         jsonb_build_object('task', 'Build renewal tracking mechanism', 'completed', false),
         jsonb_build_object('task', 'Establish performance reporting', 'completed', false)
     ),
     jsonb_build_object(
         'post_approval_management', jsonb_build_array(
             'Utilization certificate preparation',
             'Progress report templates',
             'Inspection readiness checklist',
             'Subsidy claim procedures',
             'Renewal process navigation'
         ),
         'relationship_strategies', jsonb_build_array(
             'Government meeting protocols',
             'Achievement milestone sharing',
             'Policy feedback participation',
             'Summit participation planning',
             'Long-term partnership building'
         )
     ),
     60, 165, 26);

    -- Module 8: Sector-Specific State Mapping (Days 27-28)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 8: Sector-Specific State Mapping',
        'IT, Manufacturing, Food Processing, Textiles - Identify best states for your specific industry with targeted benefits',
        8,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 8 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 27, 'Technology Sector State Benefits Mapping',
     'Identify optimal states for IT/Software with detailed analysis of SEZ benefits, IT parks, talent pools, and ecosystem maturity across Karnataka, Telangana, Tamil Nadu, Maharashtra, and NCR.',
     jsonb_build_array(
         jsonb_build_object('task', 'Compare top 5 IT states for your needs', 'completed', false),
         jsonb_build_object('task', 'Calculate SEZ vs non-SEZ benefits', 'completed', false),
         jsonb_build_object('task', 'Evaluate talent cost-quality tradeoffs', 'completed', false),
         jsonb_build_object('task', 'Map customer proximity requirements', 'completed', false),
         jsonb_build_object('task', 'Design optimal IT location strategy', 'completed', false)
     ),
     jsonb_build_object(
         'it_state_ranking', jsonb_build_array(
             'Karnataka (Bangalore): Ecosystem leader',
             'Telangana (Hyderabad): Aggressive policies',
             'Tamil Nadu (Chennai): Balanced advantages',
             'Maharashtra (Mumbai/Pune): Market access',
             'NCR (Gurgaon/Noida): Client proximity'
         ),
         'state_specific_it_benefits', jsonb_build_array(
             'SEZ benefits comparison',
             'IT park infrastructure quality',
             'Talent availability metrics',
             'Cost structure analysis',
             'Government support comparison'
         )
     ),
     45, 160, 27),

    (v_module_id, 28, 'Manufacturing Sector State Optimization',
     'Master manufacturing location selection across Tamil Nadu (Auto), Gujarat (Textiles/Chemicals), Maharashtra (Engineering), Haryana (Auto components), and Karnataka (Electronics) with cluster benefits.',
     jsonb_build_array(
         jsonb_build_object('task', 'Identify manufacturing clusters for your product', 'completed', false),
         jsonb_build_object('task', 'Calculate logistics and port advantages', 'completed', false),
         jsonb_build_object('task', 'Evaluate raw material proximity benefits', 'completed', false),
         jsonb_build_object('task', 'Compare power and utility costs', 'completed', false),
         jsonb_build_object('task', 'Design manufacturing location strategy', 'completed', false)
     ),
     jsonb_build_object(
         'manufacturing_excellence_states', jsonb_build_array(
             'Tamil Nadu: Auto manufacturing hub',
             'Gujarat: Textiles and chemicals leader',
             'Maharashtra: Engineering excellence',
             'Haryana: Auto components cluster',
             'Karnataka: Electronics manufacturing'
         ),
         'manufacturing_benefits', jsonb_build_array(
             'Industrial park infrastructure',
             'Raw material proximity advantages',
             'Port connectivity benefits',
             'Power availability and costs',
             'Skilled workforce availability'
         )
     ),
     45, 165, 28);

    -- Module 9: Financial Planning for State Benefits (Days 29-30)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 9: Financial Planning & ROI',
        'Master financial modeling, ROI calculations, and benefit optimization strategies for maximum value extraction',
        9,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 9 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 29, 'Cost-Benefit Analysis & ROI Modeling',
     'Build comprehensive financial models for state benefits. Calculate subsidy values, tax savings, infrastructure advantages, operational benefits, and create 5-year ROI projections.',
     jsonb_build_array(
         jsonb_build_object('task', 'Build 5-year financial model', 'completed', false),
         jsonb_build_object('task', 'Calculate NPV of state benefits', 'completed', false),
         jsonb_build_object('task', 'Perform sensitivity analysis', 'completed', false),
         jsonb_build_object('task', 'Compare location ROI scenarios', 'completed', false),
         jsonb_build_object('task', 'Create board presentation', 'completed', false)
     ),
     jsonb_build_object(
         'financial_modeling', jsonb_build_array(
             'Subsidy calculation methods',
             'Tax savings computation',
             'Infrastructure cost analysis',
             'Hidden cost identification',
             'Net benefit calculations'
         ),
         'roi_metrics', jsonb_build_array(
             'Payback period analysis',
             'Internal rate of return (IRR)',
             'Net present value (NPV)',
             'Benefits/Investment ratio',
             'Break-even calculations'
         )
     ),
     60, 175, 29),

    (v_module_id, 30, 'Funding Strategy Integration',
     'Integrate state benefits with overall funding strategy. Learn to combine central and state schemes, maximize total benefits, optimize cash flows, and plan growth capital access.',
     jsonb_build_array(
         jsonb_build_object('task', 'Map all funding sources available', 'completed', false),
         jsonb_build_object('task', 'Create integrated funding timeline', 'completed', false),
         jsonb_build_object('task', 'Optimize benefit realization schedule', 'completed', false),
         jsonb_build_object('task', 'Plan working capital management', 'completed', false),
         jsonb_build_object('task', 'Design exit strategy considerations', 'completed', false)
     ),
     jsonb_build_object(
         'funding_integration', jsonb_build_array(
             'Central + State scheme combinations',
             'Private funding coordination',
             'Subsidy utilization planning',
             'Cash flow optimization',
             'Growth capital strategies'
         ),
         'strategic_planning', jsonb_build_array(
             'Timeline optimization techniques',
             'Milestone-based benefit unlocking',
             'Risk mitigation strategies',
             'Compliance cost planning',
             'Exit strategy implications'
         )
     ),
     60, 180, 30);

    -- Module 10: Advanced Strategies (Days 31-33)
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 10: Advanced Strategies',
        'SEZs, Investment Summits, Multi-state operations, and future opportunity identification for sustained advantage',
        10,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 10 Lessons
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES
    (v_module_id, 31, 'SEZ Benefits & Industrial Parks Mastery',
     'Master SEZ selection and benefits optimization. Understand tax holidays, duty-free imports, single window clearances, and compare 300+ SEZs across Maharashtra, Tamil Nadu, Karnataka, AP, and Gujarat.',
     jsonb_build_array(
         jsonb_build_object('task', 'Evaluate SEZ vs non-SEZ for your business', 'completed', false),
         jsonb_build_object('task', 'Compare top 10 SEZs for your sector', 'completed', false),
         jsonb_build_object('task', 'Calculate total SEZ benefit package', 'completed', false),
         jsonb_build_object('task', 'Understand compliance requirements', 'completed', false),
         jsonb_build_object('task', 'Visit shortlisted SEZ locations', 'completed', false)
     ),
     jsonb_build_object(
         'sez_benefits', jsonb_build_array(
             'Tax holidays: 10+5 years',
             'Duty-free imports for exports',
             'Single window clearance',
             'Infrastructure support',
             'Labour law relaxations'
         ),
         'major_sezs', jsonb_build_array(
             'Maharashtra: 300+ SEZs',
             'Tamil Nadu: 200+ SEZs',
             'Karnataka: 150+ SEZs',
             'Andhra Pradesh: 100+ SEZs',
             'Gujarat: 80+ SEZs'
         )
     ),
     60, 185, 31),

    (v_module_id, 32, 'State Investment Summit Strategy',
     'Leverage investment summits for maximum benefits. Master participation strategies for Vibrant Gujarat, Magnetic Maharashtra, Bengal Global Summit, UP Investors Summit, and other major events.',
     jsonb_build_array(
         jsonb_build_object('task', 'Identify relevant summits for next 12 months', 'completed', false),
         jsonb_build_object('task', 'Prepare summit participation strategy', 'completed', false),
         jsonb_build_object('task', 'Design booth and collateral materials', 'completed', false),
         jsonb_build_object('task', 'Schedule B2G meetings at summits', 'completed', false),
         jsonb_build_object('task', 'Prepare MOU templates for signing', 'completed', false)
     ),
     jsonb_build_object(
         'major_summits', jsonb_build_array(
             'Vibrant Gujarat Summit',
             'Magnetic Maharashtra',
             'Bengal Global Business Summit',
             'UP Investors Summit',
             'Momentum Jharkhand'
         ),
         'summit_strategies', jsonb_build_array(
             'Pre-event preparation checklist',
             'B2G meeting techniques',
             'MOU negotiation tactics',
             'Media management tips',
             'Follow-up protocols'
         )
     ),
     60, 190, 32),

    (v_module_id, 33, 'Future Trends & Emerging Opportunities',
     'Stay ahead with emerging state opportunities. Understand green energy corridors, EV manufacturing hubs, data center locations, logistics parks, and new policy trends for sustained competitive advantage.',
     jsonb_build_array(
         jsonb_build_object('task', 'Identify emerging sectors in target states', 'completed', false),
         jsonb_build_object('task', 'Track new policy announcements', 'completed', false),
         jsonb_build_object('task', 'Build monitoring system for opportunities', 'completed', false),
         jsonb_build_object('task', 'Create future expansion roadmap', 'completed', false),
         jsonb_build_object('task', 'Design adaptive strategy framework', 'completed', false)
     ),
     jsonb_build_object(
         'emerging_opportunities', jsonb_build_array(
             'Green energy corridors',
             'EV manufacturing hubs',
             'Data center locations',
             'Logistics parks development',
             'Food processing zones'
         ),
         'future_planning', jsonb_build_array(
             'Policy trend analysis',
             'Election impact assessment',
             'Technology adoption tracking',
             'Competition monitoring',
             'Opportunity identification system'
         )
     ),
     60, 200, 33);

END $$;

-- Insert Portfolio Activity Types for P7 course
INSERT INTO portfolio_activity_types (id, activity_id, name, description, category, course_code, created_at)
VALUES
    (gen_random_uuid(), 'state_benefit_analysis', 'State Benefit Analysis', 
     'Comprehensive analysis of state-wise benefits and location strategy', 'market_research', 'P7', NOW()),
    
    (gen_random_uuid(), 'multi_state_strategy', 'Multi-State Strategy Design', 
     'Strategic multi-state presence planning for maximum benefits', 'business_model', 'P7', NOW()),
    
    (gen_random_uuid(), 'government_relations', 'Government Relations Building', 
     'Documentation of government relationships and benefit applications', 'go_to_market', 'P7', NOW()),
    
    (gen_random_uuid(), 'location_optimization', 'Location Optimization Framework', 
     '50-factor location analysis and ROI calculations', 'financials', 'P7', NOW()),
    
    (gen_random_uuid(), 'compliance_framework', 'Multi-State Compliance Framework', 
     'Compliance and monitoring systems for multi-state operations', 'legal_compliance', 'P7', NOW())
ON CONFLICT (activity_id) DO NOTHING;

-- Add some initial data for state schemes (sample)
CREATE TABLE IF NOT EXISTS state_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_name VARCHAR(100) NOT NULL,
    scheme_name VARCHAR(255) NOT NULL,
    scheme_type VARCHAR(100),
    benefits TEXT,
    eligibility TEXT,
    max_amount BIGINT,
    department VARCHAR(255),
    contact_info TEXT,
    application_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample state schemes data
INSERT INTO state_schemes (state_name, scheme_name, scheme_type, benefits, eligibility, max_amount, department, contact_info)
VALUES
    ('Karnataka', 'Karnataka Startup Policy 2022-27', 'Startup', 
     'Seed funding ₹50L, Scale-up ₹3Cr, Patent support 100%', 
     'Startups registered in Karnataka, less than 10 years old', 
     30000000, 'Karnataka Startup Cell', '080-22034977, startup@karnataka.gov.in'),
    
    ('Gujarat', 'Gujarat Industrial Policy 2020', 'Industrial', 
     'Capital subsidy 25-35%, Interest subsidy 7%, Power subsidy ₹2/unit', 
     'MSMEs with Udyam registration, manufacturing units', 
     4000000, 'Industries Commissionerate', '079-23252801, comm-ind@gujarat.gov.in'),
    
    ('Tamil Nadu', 'Tamil Nadu Industrial Policy 2021', 'Manufacturing', 
     'Capital subsidy 50%, Payroll subsidy ₹48K/job, 100% electricity tax waiver', 
     'Manufacturing units, minimum investment ₹25L', 
     3000000, 'Guidance Tamil Nadu', '044-28592551, guidance@tn.gov.in'),
    
    ('Telangana', 'T-Hub Innovation Policy', 'Innovation', 
     'T-IDEA ₹10-15L, T-SEED ₹40L, Incubation support 50% subsidy', 
     'Tech startups, innovative businesses', 
     4000000, 'T-Hub', '040-42020000, info@t-hub.co'),
    
    ('Delhi', 'Delhi Startup Policy 2022', 'Startup', 
     'Seed fund ₹10-25L, Collateral-free loan ₹1Cr, Office subsidy 50%', 
     'Startups registered in Delhi', 
     10000000, 'Delhi Startup Cell', '011-23378471, dsiidc@delhi.gov.in');

-- Create success metrics tracking
CREATE TABLE IF NOT EXISTS p7_user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    benefits_identified BIGINT DEFAULT 0,
    applications_submitted INTEGER DEFAULT 0,
    officials_met INTEGER DEFAULT 0,
    approvals_received INTEGER DEFAULT 0,
    cost_reduction_percentage DECIMAL(5,2) DEFAULT 0,
    states_evaluated TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_state_schemes_state ON state_schemes(state_name);
CREATE INDEX IF NOT EXISTS idx_state_schemes_type ON state_schemes(scheme_type);
CREATE INDEX IF NOT EXISTS idx_p7_progress_user ON p7_user_progress(user_id);

COMMIT;

-- Verification query
SELECT 
    p.code,
    p.title,
    p.price,
    COUNT(DISTINCT m.id) as module_count,
    COUNT(DISTINCT l.id) as lesson_count,
    SUM(l.xp_reward) as total_xp
FROM products p
LEFT JOIN modules m ON m.product_id = p.id
LEFT JOIN lessons l ON l.module_id = m.id
WHERE p.code = 'P7'
GROUP BY p.code, p.title, p.price;