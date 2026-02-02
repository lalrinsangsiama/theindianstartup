-- P29: SaaS & B2B Tech Mastery Course Migration
-- 50 days, 10 modules, comprehensive SaaS business building

BEGIN;

-- Declare variables for IDs
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
BEGIN
    -- Generate IDs
    v_product_id := gen_random_uuid()::text;
    v_mod_1_id := gen_random_uuid()::text;
    v_mod_2_id := gen_random_uuid()::text;
    v_mod_3_id := gen_random_uuid()::text;
    v_mod_4_id := gen_random_uuid()::text;
    v_mod_5_id := gen_random_uuid()::text;
    v_mod_6_id := gen_random_uuid()::text;
    v_mod_7_id := gen_random_uuid()::text;
    v_mod_8_id := gen_random_uuid()::text;
    v_mod_9_id := gen_random_uuid()::text;
    v_mod_10_id := gen_random_uuid()::text;

    -- Insert Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P29',
        'SaaS & B2B Tech Mastery',
        'Complete guide to building and scaling SaaS businesses in India - 10 modules covering SaaS business models, metrics, product-led growth, enterprise sales, global pricing, legal frameworks, data privacy, partnerships, fundraising, and global expansion. Master the $10B+ Indian SaaS opportunity.',
        7999,
        50,
        NOW(),
        NOW()
    )
    ON CONFLICT (code) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        "estimatedDays" = EXCLUDED."estimatedDays",
        "updatedAt" = NOW();

    -- Get the product ID (in case of conflict)
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P29';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: SaaS Business Models (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'SaaS Business Models', 'Master different SaaS business models - B2B, B2C, horizontal vs vertical, and hybrid approaches for the Indian market', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'SaaS Fundamentals for India', 'Understand why India is producing unicorn SaaS companies at record pace. Learn the fundamentals of recurring revenue models, customer lifetime value, and why SaaS from India serves global markets. Analyze successful Indian SaaS companies like Freshworks, Zoho, and Chargebee.', '["Research 5 successful Indian SaaS companies", "Document their business models and target markets", "Identify the gap your SaaS can fill", "Define your initial target market (India vs global-first)"]'::jsonb, '{"templates": ["SaaS Business Model Canvas", "Market Opportunity Assessment"], "tools": ["SaaS Idea Validator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'B2B vs B2C SaaS Models', 'Deep dive into B2B SaaS (higher ACV, longer sales cycles) vs B2C SaaS (volume-based, viral growth). Understand SMB vs Enterprise positioning. Learn why most Indian SaaS succeeds with B2B models serving global SMBs.', '["Determine B2B vs B2C fit for your product", "Define your ideal customer profile (ICP)", "Map the buying journey for your target segment", "Calculate preliminary unit economics for each model"]'::jsonb, '{"templates": ["ICP Template", "B2B vs B2C Decision Matrix"], "tools": ["Unit Economics Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Horizontal vs Vertical SaaS', 'Understand horizontal SaaS (broad market, more competition) vs vertical SaaS (niche focus, domain expertise). Learn why vertical SaaS often achieves better retention and higher valuations. Identify vertical opportunities in India.', '["Evaluate horizontal vs vertical positioning", "Research vertical SaaS opportunities in your domain", "Define your competitive moat", "Map industry-specific pain points"]'::jsonb, '{"templates": ["Vertical SaaS Opportunity Framework", "Competitive Analysis Template"], "tools": ["Market Size Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Pricing Model Selection', 'Master SaaS pricing models: per-seat, usage-based, tiered, freemium, flat-rate. Understand when each model works best. Learn value-based pricing principles. Design pricing that scales with customer success.', '["Research pricing models of 10 competitors", "Design 3 pricing model options", "Validate pricing with 5 potential customers", "Create pricing page wireframe"]'::jsonb, '{"templates": ["Pricing Model Comparison Matrix", "Value Metric Identifier"], "tools": ["Pricing Strategy Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Revenue Model Architecture', 'Design your complete revenue model: core subscription, add-ons, professional services, marketplace revenue. Understand revenue recognition for SaaS (ASC 606). Plan for multi-product expansion.', '["Design your revenue model architecture", "Identify 3 potential add-on revenue streams", "Create revenue recognition policy", "Build 3-year revenue projection model"]'::jsonb, '{"templates": ["Revenue Model Template", "Add-on Strategy Framework"], "tools": ["Revenue Projection Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 2: SaaS Metrics Mastery (Days 6-10)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'SaaS Metrics Mastery', 'Master the metrics that matter - MRR, ARR, churn, LTV, CAC, and unit economics that drive SaaS success', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 6, 'MRR & ARR Fundamentals', 'Master Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR) calculations. Understand MRR components: new, expansion, contraction, churned. Learn proper revenue recognition and deferred revenue handling.', '["Set up MRR tracking system", "Define MRR calculation methodology", "Create MRR waterfall template", "Implement MRR dashboard"]'::jsonb, '{"templates": ["MRR Tracking Template", "ARR Calculator"], "tools": ["Revenue Analytics Dashboard"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Churn Analysis & Prevention', 'Understand gross churn vs net revenue retention. Learn to calculate logo churn and revenue churn. Identify leading indicators of churn. Build churn prediction and prevention systems.', '["Calculate current churn rates", "Identify top 5 churn reasons", "Build churn prediction model", "Design churn prevention playbook"]'::jsonb, '{"templates": ["Churn Analysis Framework", "Churn Prevention Playbook"], "tools": ["Churn Prediction Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'LTV & CAC Economics', 'Master Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC) calculations. Understand LTV:CAC ratio benchmarks (3:1 target). Learn CAC payback period optimization. Build cohort-based LTV analysis.', '["Calculate LTV by customer segment", "Track CAC by acquisition channel", "Build LTV:CAC ratio dashboard", "Identify highest ROI customer segments"]'::jsonb, '{"templates": ["LTV Calculator", "CAC Analysis Template"], "tools": ["Unit Economics Dashboard"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'Net Revenue Retention', 'Master Net Revenue Retention (NRR) - the key metric VCs love. Understand how expansion revenue offsets churn. Learn strategies to achieve 120%+ NRR. Build expansion playbooks.', '["Calculate NRR for last 12 months", "Identify expansion opportunities", "Design upsell and cross-sell programs", "Set NRR improvement targets"]'::jsonb, '{"templates": ["NRR Tracking Template", "Expansion Playbook"], "tools": ["NRR Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 10, 'SaaS Metrics Dashboard', 'Build comprehensive SaaS metrics dashboard. Track leading and lagging indicators. Set up automated reporting. Create investor-ready metrics presentations.', '["Design SaaS metrics dashboard", "Set up automated metric calculations", "Create weekly metrics review process", "Build investor metrics deck"]'::jsonb, '{"templates": ["SaaS Metrics Dashboard Template", "Investor Metrics Deck"], "tools": ["Metrics Automation Platform"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 3: Product-Led Growth (Days 11-15)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Product-Led Growth', 'Implement PLG strategies - self-serve acquisition, viral loops, freemium optimization, and product-qualified leads', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 11, 'PLG Fundamentals', 'Understand Product-Led Growth principles from companies like Slack, Zoom, and Notion. Learn when PLG works and when it does not. Assess your product PLG readiness. Design your PLG strategy.', '["Assess PLG fit for your product", "Study 5 successful PLG companies", "Identify PLG opportunities in your product", "Create PLG implementation roadmap"]'::jsonb, '{"templates": ["PLG Readiness Assessment", "PLG Strategy Canvas"], "tools": ["PLG Fit Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Self-Serve Acquisition', 'Design frictionless self-serve signup and onboarding. Optimize time-to-value for new users. Build in-app guidance and activation flows. Reduce dependency on sales for initial adoption.', '["Map current signup to activation flow", "Identify friction points", "Design improved onboarding sequence", "Set up activation metrics"]'::jsonb, '{"templates": ["Onboarding Flow Template", "Activation Checklist"], "tools": ["User Journey Mapper"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 13, 'Freemium Strategy', 'Design effective freemium tiers that drive upgrades. Balance value in free vs paid tiers. Understand freemium conversion benchmarks. Avoid common freemium mistakes.', '["Design freemium tier structure", "Define upgrade triggers", "Calculate freemium conversion targets", "A/B test free tier limitations"]'::jsonb, '{"templates": ["Freemium Design Framework", "Conversion Trigger Map"], "tools": ["Freemium Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 14, 'Viral Loops & Network Effects', 'Build viral mechanics into your product. Design referral programs that scale. Create network effects for retention. Measure viral coefficient and optimize for growth.', '["Identify viral opportunities in product", "Design referral program", "Build sharing mechanics", "Track viral coefficient"]'::jsonb, '{"templates": ["Viral Loop Framework", "Referral Program Design"], "tools": ["Viral Coefficient Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 15, 'Product-Qualified Leads', 'Implement PQL scoring based on product usage. Define hand-off triggers to sales. Build PLG + sales hybrid model. Optimize PQL to customer conversion.', '["Define PQL criteria", "Build PQL scoring model", "Design sales hand-off process", "Set up PQL tracking"]'::jsonb, '{"templates": ["PQL Scoring Model", "Sales Hand-off Playbook"], "tools": ["PQL Dashboard"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 4: Enterprise Sales (Days 16-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Enterprise Sales', 'Master enterprise SaaS sales - complex deals, procurement, security reviews, and multi-stakeholder selling', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Enterprise Sales Fundamentals', 'Understand enterprise sales cycles (6-18 months). Learn multi-stakeholder selling to champions, decision makers, and economic buyers. Map enterprise procurement processes. Build enterprise sales playbook.', '["Map typical enterprise buying process", "Identify stakeholder types and motivations", "Create enterprise sales playbook", "Define enterprise qualification criteria"]'::jsonb, '{"templates": ["Enterprise Sales Playbook", "Stakeholder Map Template"], "tools": ["Deal Qualification Scorecard"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 17, 'Security & Compliance Reviews', 'Prepare for enterprise security questionnaires. Complete SOC 2 Type II certification. Handle GDPR, HIPAA, and other compliance requirements. Build security documentation that wins deals.', '["Complete SOC 2 readiness assessment", "Prepare security questionnaire responses", "Document compliance certifications", "Create security whitepaper"]'::jsonb, '{"templates": ["SOC 2 Readiness Checklist", "Security Questionnaire Master"], "tools": ["Compliance Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 18, 'Enterprise Pricing & Contracts', 'Design enterprise pricing with custom quotes. Navigate MSA and procurement negotiations. Handle legal redlines effectively. Structure multi-year deals with payment terms.', '["Create enterprise pricing framework", "Prepare MSA template", "Define negotiation parameters", "Build contract management system"]'::jsonb, '{"templates": ["Enterprise Pricing Calculator", "MSA Template"], "tools": ["Contract Redline Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 19, 'Proof of Concept & Pilots', 'Design effective POCs that convert. Structure paid pilots vs free trials. Define success criteria upfront. Manage POC to production transition.', '["Create POC framework", "Define success criteria template", "Build POC to production playbook", "Set up POC tracking dashboard"]'::jsonb, '{"templates": ["POC Framework", "Success Criteria Template"], "tools": ["POC Management Dashboard"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 20, 'Account-Based Sales', 'Implement account-based selling for key targets. Coordinate sales, marketing, and CS for accounts. Build account plans for strategic opportunities. Measure account-based metrics.', '["Identify top 20 target accounts", "Create account plans", "Design ABM campaigns", "Set up account tracking"]'::jsonb, '{"templates": ["Account Plan Template", "ABM Campaign Framework"], "tools": ["Account Intelligence Platform"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 5: Global Pricing Strategy (Days 21-25)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Global Pricing Strategy', 'Master global SaaS pricing - currency strategies, regional pricing, purchasing power parity, and price localization', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 21, 'Global Pricing Fundamentals', 'Understand pricing strategies for global SaaS: uniform pricing vs localized pricing. Learn currency display and billing best practices. Navigate exchange rate fluctuations. Build pricing for 100+ countries.', '["Analyze global pricing strategies of competitors", "Define primary and secondary currencies", "Create exchange rate policy", "Map country-wise pricing approach"]'::jsonb, '{"templates": ["Global Pricing Strategy Framework", "Currency Policy Template"], "tools": ["Multi-Currency Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 22, 'Purchasing Power Parity', 'Implement PPP-based pricing for emerging markets. Balance revenue optimization with market access. Design regional pricing tiers. Handle arbitrage and VPN abuse.', '["Research PPP indices for target markets", "Design PPP pricing tiers", "Implement geo-based pricing", "Create anti-arbitrage policies"]'::jsonb, '{"templates": ["PPP Pricing Matrix", "Regional Tier Framework"], "tools": ["PPP Pricing Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 23, 'Enterprise Global Pricing', 'Design global enterprise pricing with regional discounts. Handle multi-region deployments and data residency pricing. Navigate global procurement and payment terms. Build global pricing governance.', '["Create enterprise global pricing policy", "Define regional discount matrix", "Design data residency pricing", "Build pricing approval workflow"]'::jsonb, '{"templates": ["Enterprise Global Pricing Template", "Regional Discount Matrix"], "tools": ["Global Pricing Governance Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 24, 'Payment Infrastructure', 'Set up global payment infrastructure. Integrate multiple payment gateways (Stripe, PayPal, local methods). Handle tax collection and remittance. Manage failed payments and dunning.', '["Select payment gateway stack", "Implement local payment methods", "Set up tax calculation", "Design dunning workflow"]'::jsonb, '{"templates": ["Payment Gateway Comparison", "Dunning Sequence Template"], "tools": ["Payment Analytics Dashboard"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 25, 'Price Testing & Optimization', 'Implement price testing methodologies. A/B test pricing pages and packaging. Measure price elasticity. Optimize for revenue per visitor.', '["Design pricing A/B test plan", "Set up price testing infrastructure", "Measure price elasticity", "Implement dynamic pricing"]'::jsonb, '{"templates": ["Price Testing Framework", "A/B Test Design Template"], "tools": ["Pricing Optimization Platform"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 6: SaaS Legal Framework (Days 26-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'SaaS Legal Framework', 'Build legal infrastructure for SaaS - ToS, privacy policies, SLAs, DPAs, and international compliance', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 26, 'SaaS Terms of Service', 'Draft comprehensive SaaS Terms of Service. Cover subscription terms, acceptable use, and liability limitations. Handle auto-renewal and cancellation policies. Ensure enforceability across jurisdictions.', '["Draft Terms of Service", "Define acceptable use policy", "Create auto-renewal disclosures", "Get legal review"]'::jsonb, '{"templates": ["SaaS ToS Template", "Acceptable Use Policy"], "tools": ["ToS Generator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 27, 'Privacy Policy & Compliance', 'Create GDPR, CCPA, and India DPDP compliant privacy policies. Implement consent management. Handle data subject requests. Build privacy-by-design processes.', '["Draft privacy policy", "Implement cookie consent", "Set up DSR handling process", "Create privacy impact assessment"]'::jsonb, '{"templates": ["Privacy Policy Template", "Cookie Policy"], "tools": ["Privacy Compliance Checker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 28, 'SLA Design & Management', 'Design SLAs that balance commitment with business reality. Define uptime guarantees and service credits. Build incident communication processes. Manage SLA reporting and compliance.', '["Design SLA tiers by plan", "Define uptime calculations", "Create service credit policy", "Build SLA dashboard"]'::jsonb, '{"templates": ["SLA Template", "Service Credit Calculator"], "tools": ["SLA Monitoring Dashboard"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 29, 'Data Processing Agreements', 'Draft DPAs for enterprise customers. Handle sub-processor management. Implement Standard Contractual Clauses. Navigate international data transfers.', '["Create DPA template", "Build sub-processor list", "Implement SCCs", "Design data transfer mechanisms"]'::jsonb, '{"templates": ["DPA Template", "Sub-processor Agreement"], "tools": ["DPA Generator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 30, 'IP Protection for SaaS', 'Protect SaaS intellectual property. Understand software patents in India. Handle open source license compliance. Build IP assignment and invention policies.', '["Conduct IP audit", "Review open source compliance", "Create IP assignment policy", "Evaluate patent opportunities"]'::jsonb, '{"templates": ["IP Audit Checklist", "Open Source Policy"], "tools": ["License Compliance Scanner"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 7: Data Privacy & Security (Days 31-35)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Data Privacy & Security', 'Implement enterprise-grade security - SOC 2, ISO 27001, penetration testing, and security operations', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 31, 'Security Architecture for SaaS', 'Design secure SaaS architecture. Implement defense in depth. Handle multi-tenancy security. Build secure development practices.', '["Design security architecture", "Implement tenant isolation", "Create secure SDLC", "Set up security monitoring"]'::jsonb, '{"templates": ["Security Architecture Template", "SDLC Security Checklist"], "tools": ["Security Architecture Review Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 32, 'SOC 2 Certification', 'Understand SOC 2 Trust Service Criteria. Prepare for Type I and Type II audits. Implement required controls. Manage ongoing compliance.', '["Complete SOC 2 readiness assessment", "Implement required controls", "Select SOC 2 auditor", "Prepare audit documentation"]'::jsonb, '{"templates": ["SOC 2 Control Matrix", "Evidence Collection Guide"], "tools": ["SOC 2 Compliance Platform"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 33, 'ISO 27001 Implementation', 'Implement ISO 27001 Information Security Management System. Build ISMS documentation. Conduct risk assessments. Prepare for certification audit.', '["Create ISMS scope", "Conduct risk assessment", "Implement ISO 27001 controls", "Build ISMS documentation"]'::jsonb, '{"templates": ["ISMS Documentation Kit", "Risk Assessment Template"], "tools": ["ISO 27001 Compliance Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 34, 'Penetration Testing Program', 'Build ongoing security testing program. Conduct application and infrastructure pentests. Implement bug bounty programs. Handle vulnerability disclosure.', '["Select pentest vendor", "Define pentest scope", "Create vulnerability management process", "Evaluate bug bounty program"]'::jsonb, '{"templates": ["Pentest RFP Template", "Vulnerability Management Policy"], "tools": ["Vulnerability Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 35, 'Security Operations', 'Build security operations capability. Implement SIEM and monitoring. Create incident response procedures. Handle security incident communication.', '["Set up security monitoring", "Create incident response plan", "Build security runbooks", "Conduct tabletop exercises"]'::jsonb, '{"templates": ["Incident Response Plan", "Security Runbook Template"], "tools": ["SIEM Platform Comparison"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 8: SaaS Partnerships (Days 36-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'SaaS Partnerships', 'Build partnership ecosystem - integrations, channel partners, technology alliances, and marketplace presence', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 36, 'Integration Strategy', 'Build integration strategy that drives adoption. Prioritize integrations by customer demand and strategic value. Design integration architecture. Measure integration impact on retention.', '["Survey customers on integration needs", "Prioritize top 10 integrations", "Design integration architecture", "Build integration roadmap"]'::jsonb, '{"templates": ["Integration Prioritization Matrix", "API Strategy Document"], "tools": ["Integration Impact Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 37, 'Channel Partner Program', 'Design and launch channel partner program. Create partner tiers and benefits. Build partner enablement and training. Manage partner deal registration and conflicts.', '["Design partner program structure", "Create partner agreement", "Build partner portal", "Launch partner recruitment"]'::jsonb, '{"templates": ["Partner Program Framework", "Partner Agreement Template"], "tools": ["Partner Management Platform"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 38, 'Technology Alliances', 'Build strategic technology alliances. Partner with cloud providers (AWS, Azure, GCP). Join technology partner programs. Co-sell with alliance partners.', '["Identify strategic alliance targets", "Apply to partner programs", "Build co-marketing plans", "Design co-sell motions"]'::jsonb, '{"templates": ["Alliance Partnership Framework", "Co-Marketing Plan Template"], "tools": ["Partner Opportunity Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 39, 'Marketplace Strategy', 'Launch on cloud marketplaces (AWS, Azure, GCP). List on software marketplaces (G2, Capterra). Optimize marketplace listings. Drive marketplace revenue.', '["Evaluate marketplace opportunities", "Build marketplace listing", "Implement marketplace billing", "Optimize for marketplace discovery"]'::jsonb, '{"templates": ["Marketplace Launch Checklist", "Listing Optimization Guide"], "tools": ["Marketplace Analytics Dashboard"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 40, 'Partnership Operations', 'Build partnership operations and measurement. Track partner-sourced and partner-influenced revenue. Manage partner relationships at scale. Optimize partnership ROI.', '["Set up partner attribution", "Build partner dashboard", "Create partner QBR process", "Measure partnership ROI"]'::jsonb, '{"templates": ["Partner Attribution Model", "Partner QBR Template"], "tools": ["Partnership ROI Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 9: SaaS Fundraising (Days 41-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'SaaS Fundraising', 'Master SaaS fundraising - metrics investors want, valuation, pitch strategies, and investor relations', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 41, 'SaaS Investor Landscape', 'Understand SaaS-focused investors in India and globally. Learn what metrics matter at each stage. Identify right investors for your stage and segment. Build investor target list.', '["Research SaaS-focused investors", "Map investors by stage and check size", "Create target investor list", "Understand portfolio and thesis"]'::jsonb, '{"templates": ["Investor Research Template", "Target List Framework"], "tools": ["SaaS Investor Database"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 42, 'SaaS Valuation Methods', 'Understand SaaS valuation methodologies: ARR multiples, revenue growth, and rule of 40. Learn valuation drivers: NRR, growth rate, gross margins. Negotiate valuation effectively.', '["Research comparable SaaS valuations", "Calculate your metrics vs benchmarks", "Determine target valuation range", "Prepare valuation justification"]'::jsonb, '{"templates": ["Valuation Comparables Template", "Rule of 40 Calculator"], "tools": ["SaaS Valuation Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 43, 'SaaS Pitch Deck', 'Build compelling SaaS pitch deck. Highlight metrics that matter. Tell growth story with data. Address common investor concerns.', '["Create pitch deck structure", "Build metrics slides", "Prepare growth projections", "Practice pitch delivery"]'::jsonb, '{"templates": ["SaaS Pitch Deck Template", "Metrics Slide Examples"], "tools": ["Pitch Deck Review Checklist"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 44, 'Due Diligence Preparation', 'Prepare for SaaS due diligence. Build data room with metrics, legal, and financial documents. Handle technical due diligence. Manage reference calls.', '["Create due diligence checklist", "Build investor data room", "Prepare technical documentation", "Brief reference customers"]'::jsonb, '{"templates": ["Due Diligence Checklist", "Data Room Structure"], "tools": ["Data Room Platform"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 45, 'Investor Relations', 'Build ongoing investor relations. Create board reporting cadence. Manage investor updates. Leverage investors for growth.', '["Design board reporting template", "Create monthly investor update", "Build investor leverage plan", "Set up IR calendar"]'::jsonb, '{"templates": ["Board Report Template", "Investor Update Format"], "tools": ["Investor Relations Platform"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 10: Global Expansion (Days 46-50)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Global Expansion', 'Scale globally - market selection, localization, global teams, and international operations', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 46, 'Global Market Selection', 'Evaluate global markets for SaaS expansion. Analyze market size, competition, and go-to-market complexity. Prioritize markets for expansion. Build market entry playbooks.', '["Analyze top 10 target markets", "Create market prioritization matrix", "Define market entry criteria", "Build market entry playbook"]'::jsonb, '{"templates": ["Market Analysis Framework", "Entry Prioritization Matrix"], "tools": ["Global Market Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 47, 'Product Localization', 'Localize product for global markets. Handle multi-language support. Adapt UX for local preferences. Manage localization at scale.', '["Prioritize languages for localization", "Set up localization infrastructure", "Adapt UX for key markets", "Build localization workflow"]'::jsonb, '{"templates": ["Localization Roadmap", "Translation Management Guide"], "tools": ["Localization Platform"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 48, 'Global Team Building', 'Build global SaaS teams. Decide between remote, hub, and local office models. Handle timezone challenges. Create global culture and communication.', '["Define global team structure", "Evaluate location options", "Design global communication cadence", "Build global onboarding"]'::jsonb, '{"templates": ["Global Team Structure Template", "Timezone Collaboration Guide"], "tools": ["Global Team Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 49, 'International Operations', 'Set up international operations infrastructure. Handle global payroll and benefits. Manage multi-entity structure. Build operational playbooks.', '["Design international entity structure", "Select global payroll solution", "Create operational playbooks", "Build compliance calendar"]'::jsonb, '{"templates": ["International Entity Framework", "Global Payroll Comparison"], "tools": ["International Ops Dashboard"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 50, 'Global Scale Playbook', 'Build complete global scale playbook. Learn from Indian SaaS unicorns going global. Create repeatable international expansion process. Plan for $100M+ ARR scale.', '["Study Indian SaaS global expansion cases", "Create global scale playbook", "Define $100M ARR roadmap", "Build global leadership team plan"]'::jsonb, '{"templates": ["Global Scale Playbook", "$100M ARR Roadmap"], "tools": ["Scale Planning Dashboard"]}'::jsonb, 60, 50, 5, NOW(), NOW());

END $$;

COMMIT;
