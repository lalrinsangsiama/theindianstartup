-- THE INDIAN STARTUP - P22: E-commerce & D2C Mastery - Enhanced Content
-- Migration: 20260204_022_p22_ecommerce_enhanced.sql
-- Purpose: Enhance P22 course content to 500-800 words per lesson with India-specific E-commerce data
-- Course: 50 days, 10 modules covering complete E-commerce and D2C startup journey in India
-- Part 1: Product and Modules 1-5 (Days 1-25)

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_1_id TEXT;
    v_mod_2_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
BEGIN
    -- Get or create P22 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P22',
        'E-commerce & D2C Mastery',
        'Complete guide to building E-commerce and D2C startups in India - 10 modules covering business models, platform selection, marketplace selling on Amazon India and Flipkart, D2C brand building, payment optimization with UPI and COD strategies, logistics and fulfillment, customer experience, marketing, and scaling operations. India''s e-commerce market projected to reach $200 billion by 2030 with 1,500+ D2C brands and 350+ million online shoppers.',
        7999,
        false,
        50,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P22';
    END IF;

    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: E-commerce Business Models (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'E-commerce Business Models', 'Master e-commerce and D2C business models in India - marketplace, inventory-led, D2C direct, and hybrid models. Understand unit economics, market positioning, and the $200+ billion opportunity.', 0, NOW(), NOW())
    RETURNING id INTO v_mod_1_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 1, 'India E-commerce Market Overview',
        'India has emerged as one of the world''s fastest-growing e-commerce markets, valued at approximately $83 billion in 2024 and projected to reach $200 billion by 2030, representing a CAGR of 15-18%. The sector serves over 350 million online shoppers, with 100 million added just in the past three years. This explosive growth is driven by smartphone penetration exceeding 750 million users, affordable data (India has among the lowest mobile data rates globally at Rs 10-15 per GB), and UPI adoption transforming digital payments.

The Indian e-commerce landscape comprises distinct segments with different dynamics. B2C retail e-commerce at $55 billion is dominated by horizontal marketplaces Amazon India and Flipkart controlling 60%+ market share. Fashion and electronics contribute 60% of GMV. Grocery and quick commerce reached $8 billion with Zepto, Blinkit, and Instamart revolutionizing 10-minute delivery in metros.

D2C (Direct-to-Consumer) brands have emerged as the most exciting segment with 1,500+ brands and $15 billion market size. Success stories like Mamaearth (IPO at $3 billion valuation), boAt ($1.5 billion valuation), and Lenskart ($4.5 billion valuation) have validated the category. These brands bypass marketplaces to build direct customer relationships, higher margins (60-70% vs 30-40% on marketplaces), and valuable first-party data.

Market structure is evolving rapidly. Horizontal marketplaces face intensifying competition with Meesho democratizing e-commerce for Tier 2/3 cities, JioMart leveraging Reliance Retail infrastructure, and ONDC threatening to unbundle the marketplace model. Category-specific verticals like Nykaa (beauty), 1mg (pharma), and Urban Company (services) demonstrate focused models can win.

Geographic expansion defines the next growth wave. Tier 2 cities now contribute 60% of new users, with cities like Lucknow, Jaipur, and Coimbatore showing 40%+ e-commerce growth. Vernacular interfaces (Hindi commerce growing 70% annually) and cash-on-delivery options remain essential for these markets.',
        '["Research India e-commerce market size by segment from RBSA, Redseer, and Bain reports - document 2024 numbers and 2030 projections for each category", "Map top 30 e-commerce players across marketplace, D2C, vertical commerce, and quick commerce - analyze GMV, funding, and market position", "Identify geographic distribution of e-commerce - analyze metro vs Tier 2/3 contribution and growth rates", "Create competitive landscape map showing positioning of Amazon, Flipkart, Meesho, JioMart, and D2C brands"]'::jsonb,
        '["India E-commerce Market Sizing Report with segment-wise breakdown", "E-commerce Competitive Landscape Map with 100+ players", "Tier-wise E-commerce Penetration Analysis", "D2C Brand Database with funding and revenue estimates"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 2, 'Marketplace vs D2C vs Hybrid Models',
        'Choosing the right business model is the foundational decision for any e-commerce venture. Each model - marketplace selling, D2C direct, inventory-led, and hybrid - has distinct unit economics, capital requirements, and strategic implications that entrepreneurs must understand deeply.

Marketplace-First Model: Selling on Amazon India, Flipkart, and Meesho offers immediate access to 200+ million active customers without building demand generation capabilities. Commission rates vary by category: electronics 5-12%, fashion 15-22%, beauty 8-15%, home furnishing 12-18%. Additional costs include closing fees (Rs 20-60 per item), shipping (if not using FBA/Flipkart Assured), and advertising (8-15% of GMV for visibility). Net margins typically compress to 10-20%. This model suits commodity products, price-competitive offerings, and brands building initial traction. Key success factors: catalog optimization, competitive pricing, review accumulation, and advertising efficiency.

D2C Direct Model: Building your own website/app through Shopify India, WooCommerce, or custom platforms. Initial investment Rs 50,000 to Rs 5 lakh for basic setup. Gross margins improve to 60-70% but customer acquisition costs are high - Rs 300-800 for beauty/fashion, Rs 150-300 for consumables, Rs 1,000-2,000 for premium products. This model requires building brand, driving traffic through performance marketing (Meta, Google), influencer partnerships, and content. Average Order Value (AOV) must exceed Rs 1,000-1,500 for sustainable unit economics after marketing and logistics costs. Success stories: Mamaearth built Rs 1,800 crore revenue with 35% D2C contribution; Sugar Cosmetics achieved Rs 500 crore with 60% D2C.

Inventory-Led Model: Holding inventory versus marketplace selling on consignment or dropshipping. Inventory enables control over quality, faster shipping, and bundling but requires working capital (typically 60-90 days of inventory) and warehousing infrastructure. Gross margin improvement of 10-15% versus dropshipping justifies investment at scale.

Hybrid Omnichannel Model: Combining D2C website, marketplace presence, and offline retail. Lenskart exemplifies this with Rs 5,000 crore revenue across 1,500 stores, strong D2C website, and marketplace presence. Channel-specific strategies: use marketplaces for customer acquisition and visibility, D2C for loyal customers and higher margins, offline for trust-building and experience. Attribution and inventory allocation across channels require sophisticated systems.',
        '["Evaluate all business models against your product category - create decision matrix scoring capital requirements, margin potential, scalability, and competitive intensity", "Build detailed unit economics comparison for marketplace vs D2C vs hybrid for your product - include all costs from sourcing to delivery", "Study channel evolution of 5 successful brands - document how they started and expanded across channels", "Select optimal starting model with clear rationale and define triggers for channel expansion"]'::jsonb,
        '["E-commerce Business Model Comparison Framework", "Unit Economics Calculator for marketplace, D2C, and hybrid models", "Channel Strategy Evolution Case Studies - Mamaearth, boAt, Lenskart", "Model Selection Decision Matrix with scoring methodology"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 3, 'E-commerce Unit Economics Deep Dive',
        'Understanding unit economics is critical for building sustainable e-commerce businesses. The Indian market has witnessed numerous failures from brands that achieved scale without profitability. Mastering these metrics separates successful ventures from those that burn out.

Customer Acquisition Cost (CAC): The cost to acquire one paying customer. For D2C brands in India, typical CAC ranges: beauty and personal care Rs 300-600, fashion Rs 400-900, food and beverages Rs 200-400, electronics Rs 800-1,500, home furnishings Rs 600-1,200. CAC has inflated 40-60% since 2021 due to iOS privacy changes affecting Meta targeting and increased competition. Successful brands achieve CAC reduction through organic channels (content, SEO, referrals) contributing 30-50% of customers.

Lifetime Value (LTV): Total revenue from a customer over their relationship. Calculate as (Average Order Value x Purchase Frequency x Customer Lifespan). Indian e-commerce benchmarks: consumables LTV Rs 3,000-8,000 with 3-6 purchases annually; fashion Rs 2,500-5,000 with 2-3 purchases; electronics Rs 8,000-15,000 with 1-2 purchases over 3 years. LTV/CAC ratio must exceed 3x for sustainable business; top D2C brands achieve 4-6x.

Average Order Value (AOV): Critical for unit economics as fixed costs (packaging, last-mile delivery at Rs 50-80 per shipment) are spread over order value. Indian e-commerce average AOV is Rs 1,200; successful D2C brands target Rs 1,500-2,500. AOV improvement strategies: bundling, cross-sell, minimum order thresholds, subscription models.

Contribution Margin: Revenue minus variable costs (COGS, payment gateway 2%, packaging Rs 20-40, shipping Rs 60-100, returns 15-25% of revenue). Target contribution margin: 25-35% for sustainable operations. Many D2C brands operate at 10-15% contribution margin, requiring significant scale for fixed cost absorption.

Return Rate and RTO (Return to Origin): India''s COD prevalence creates 15-25% return rates for fashion, 5-10% for electronics. Each return costs Rs 100-150 (forward + reverse shipping). RTO due to COD non-acceptance adds 3-5% revenue leakage. Strategies: COD verification via IVR, prepaid incentives, accurate sizing guides, and quality checks.

Working Capital Cycle: Cash-to-cash cycle days from paying suppliers to receiving customer payment. Marketplace models: 7-21 day settlement cycles. D2C: instant payment but higher inventory. Target 45-60 day inventory turns to optimize working capital.',
        '["Build comprehensive unit economics model for your e-commerce business including all cost components", "Benchmark your metrics against category leaders - identify gaps and improvement levers", "Calculate LTV/CAC ratio and contribution margin - determine minimum scale for profitability", "Create sensitivity analysis showing impact of 10% improvement in CAC, AOV, and return rate"]'::jsonb,
        '["E-commerce Unit Economics Calculator with India-specific costs", "Category-wise Benchmark Database with 50+ D2C brands", "Contribution Margin Optimization Framework", "Working Capital Calculator for e-commerce"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 4, 'Category Selection and Market Positioning',
        'Selecting the right product category and positioning strategy is crucial for e-commerce success. India''s diverse market offers opportunities across categories, but each has distinct dynamics, competitive intensity, and margin structures that must be carefully evaluated.

Category Opportunity Assessment: Beauty and Personal Care ($8 billion online, growing 25% annually) offers highest margins (65-75% gross) but intense competition with Nykaa, Mamaearth, and Amazon. Entry requires differentiation through ingredients (Ayurvedic, clean beauty), target segment (men''s grooming, teen skincare), or price point. Fashion and Apparel ($15 billion online, 20% growth) is the largest category but most competitive. Success requires brand building; commodity fashion commoditized by Meesho and marketplace private labels. Ethnic wear, plus-size, sustainable fashion offer positioning opportunities.

Food and Beverages ($5 billion online, 30% growth) is fastest-growing with health focus. Categories like healthy snacks (Yoga Bar), specialty coffee (Blue Tokai), and protein supplements show strong D2C traction. Challenge: low AOV (Rs 500-800) requiring subscription or bundling. Electronics and Appliances ($20 billion online, 15% growth) are dominated by brands and marketplaces with low margins (15-25%). D2C opportunity in accessories (boAt at Rs 3,000+ crore), smart home, and niche categories.

Home and Living ($4 billion online, 25% growth) has high AOV (Rs 2,000-5,000) but logistics complexity for large items. Success stories: Pepperfry (furniture), Nestasia (home decor). Category challenges include high return rates (20%+) and delivery damages.

Positioning Strategy Framework: Price-based positioning competes on value (Meesho model) requiring extreme cost efficiency. Quality/Premium positioning commands price premium through superior ingredients, design, or experience (Forest Essentials, FabIndia). Problem-Solution positioning addresses specific customer pain points (Mamaearth''s toxin-free focus). Lifestyle/Aspiration positioning builds emotional connection beyond product (boAt''s youth culture). Convenience positioning offers accessibility advantages (quick commerce, subscription).

India-Specific Positioning Considerations: Ayurveda and natural ingredients resonate strongly - 70% consumers prefer natural. Value consciousness requires clear price-to-benefit communication. Trust building essential for new categories - influencer validation, reviews, certifications matter. Regional customization (sizes, colors, flavors) enables Tier 2/3 penetration.',
        '["Evaluate 5 product categories using opportunity assessment framework - score on market size, growth, competition, margin, and logistics complexity", "Analyze positioning strategies of top 3 brands in your chosen category - identify white space", "Define your positioning strategy with clear differentiation rationale", "Create positioning statement and validate through customer research - test with 20 target customers"]'::jsonb,
        '["Category Opportunity Assessment Framework with 20+ categories analyzed", "Positioning Strategy Canvas with India-specific dimensions", "Competitive Positioning Map Templates by category", "Customer Research Guide for positioning validation"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_1_id, 5, 'Building Your E-commerce Organization',
        'Building the right team is critical for e-commerce success. Unlike traditional retail, e-commerce requires diverse capabilities spanning digital marketing, technology, supply chain, and customer experience. Understanding the optimal team structure at different stages helps founders allocate limited resources effectively.

Early Stage (0-Rs 50 lakh monthly GMV): Founder-led with 5-10 person core team. Essential roles: Operations Lead handling fulfillment, inventory, and customer service; Marketing Lead managing performance marketing, social media, and content; Catalog Manager for listings, photography, and SEO. Technology often outsourced or using no-code tools. Founders should directly handle strategy, key supplier relationships, and product development. Total team cost: Rs 3-6 lakh monthly.

Growth Stage (Rs 50 lakh-Rs 5 crore monthly GMV): Functional specialization with 20-40 person team. Marketing splits into Performance (paid acquisition), Brand (content, influencer), and Retention (CRM, loyalty). Supply Chain adds Procurement and Warehouse Operations. Technology brings in-house developer for website optimization. Customer Experience creates dedicated team with 10-15 agents. Finance becomes full-time for working capital, compliance, and analytics. Total team cost: Rs 20-40 lakh monthly.

Scale Stage (Rs 5 crore+ monthly GMV): Full organizational structure with 100+ employees. C-suite: CEO, CMO, COO, CFO, CTO. Each function has multiple teams. Marketing: Performance, Brand, Content, Influencer, Retention, Marketplace. Operations: Procurement, Warehouse (multiple locations), Logistics, Quality, Returns. Technology: Product, Engineering, Data Science. Category expansion requires dedicated category managers.

Critical Hires and Salary Benchmarks (2024): Growth Marketing Manager: Rs 12-25 lakh annually - responsible for paid acquisition across Meta, Google; key metric is CAC management. Supply Chain Head: Rs 18-35 lakh annually - manages inventory, logistics partnerships, warehouse operations; experience from logistics companies (Delhivery, Amazon) valuable. D2C Brand Manager: Rs 10-18 lakh annually - handles brand positioning, content strategy, influencer partnerships. E-commerce Manager (Marketplace): Rs 8-15 lakh annually - manages Amazon/Flipkart presence, advertising, catalog.

Hiring Channels: LinkedIn for senior roles; Indeed for operations; AngelList for startup talent; Referrals often yield best cultural fit. Equity compensation increasingly common for senior hires (0.1-1% ESOP pool for top 10 employees).

Outsourcing Strategy: Photography and content creation easily outsourced (Rs 500-2,000 per product). Customer service can use BPO (Rs 15,000-25,000 per agent monthly). Performance marketing agencies charge 10-15% of ad spend but sacrifice control. Avoid outsourcing core capabilities: product development, brand strategy, key supplier relationships.',
        '["Design org structure for your current stage with clear role definitions and KPIs for each position", "Create hiring plan for next 12 months with prioritization rationale and budget", "Build job descriptions and interview frameworks for first 5 hires", "Identify outsourcing opportunities vs in-house requirements for each function"]'::jsonb,
        '["E-commerce Org Chart Templates for each growth stage", "Role Library with job descriptions for 30+ e-commerce positions", "E-commerce Salary Benchmarking Database 2024", "Interview Framework and Scorecards for key positions"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 2: Platform Selection & Technology (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Platform Selection & Technology', 'Choose the right technology stack for your e-commerce business - Shopify India, WooCommerce, Magento, custom builds, and India-specific platforms like Dukaan and Bikayi.', 1, NOW(), NOW())
    RETURNING id INTO v_mod_2_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 6, 'E-commerce Platform Comparison',
        'Selecting the right e-commerce platform is a foundational technology decision that impacts scalability, customization, costs, and operational efficiency. India''s e-commerce platform landscape offers options ranging from global solutions like Shopify to India-born platforms like Dukaan.

Shopify India: The dominant global platform with 35%+ market share among Indian D2C brands. Monthly cost: Basic Rs 2,400 ($29), Standard Rs 6,600 ($79), Advanced Rs 24,900 ($299). Additional costs: payment gateway 2% (using Razorpay/Cashfree), apps Rs 5,000-20,000 monthly, theme Rs 15,000-50,000 one-time. Strengths: robust ecosystem with 8,000+ apps, excellent uptime (99.99%), strong SEO capabilities, easy setup (live in 2-4 weeks). Limitations: transaction fees on non-Shopify payments, customization limits without Shopify Plus, international pricing.

Shopify Plus: Enterprise tier at $2,000/month minimum. Suitable for brands exceeding Rs 5 crore monthly GMV. Benefits: unlimited staff accounts, advanced automation, checkout customization, dedicated support. Users: Mamaearth, Sugar Cosmetics, boAt use Shopify Plus.

WooCommerce (WordPress): Open-source solution with maximum flexibility. Hosting cost: Rs 5,000-50,000 monthly depending on scale and hosting provider (AWS, DigitalOcean, SiteGround). Plugin costs: essential plugins Rs 20,000-50,000 annually. Strengths: complete customization, no transaction fees, extensive plugin ecosystem, lower long-term cost at scale. Limitations: requires technical expertise, security and maintenance responsibility, performance optimization challenges. Suitable for: brands needing heavy customization, content-driven commerce, blogs integrated with shopping.

Magento/Adobe Commerce: Enterprise open-source platform. Community edition free, Adobe Commerce from $22,000 annually. Implementation cost: Rs 10-50 lakh. Strengths: unlimited scalability, multi-store capabilities, B2B features. Limitations: high implementation cost, requires dedicated technical team, steep learning curve. Suitable for: large enterprises, multi-brand operations, complex B2B requirements.

India-Specific Platforms: Dukaan - built for Indian SMBs with WhatsApp-first approach. Cost: Free tier available, paid from Rs 3,999/year. Strengths: Hindi interface, WhatsApp catalog integration, simple setup. Limitations: limited customization, basic features. Bikayi - social commerce focused with Instagram and WhatsApp integration. Cost from Rs 2,999/year. Suitable for small sellers and social commerce operators.

Headless Commerce: Separating frontend (React, Next.js) from backend commerce engine. Options: Shopify Hydrogen, CommerceTools, custom APIs. Benefits: ultimate frontend flexibility, omnichannel capability, performance optimization. Cost: Rs 50 lakh-2 crore implementation. Suitable for: large brands needing unique experiences, omnichannel operations.',
        '["Evaluate 5 platform options against your requirements - create weighted scoring matrix including cost, scalability, customization, and India-specific features", "Calculate Total Cost of Ownership for 3 years including hosting, apps, development, and maintenance", "Review platform case studies from similar D2C brands in your category", "Make platform selection decision with migration plan if switching existing platform"]'::jsonb,
        '["E-commerce Platform Comparison Matrix with detailed feature analysis", "TCO Calculator for Shopify vs WooCommerce vs Custom", "Platform Migration Playbook with risk mitigation", "India E-commerce Platform Case Studies"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 7, 'Shopify India Deep Dive',
        'Shopify dominates the Indian D2C landscape with 35-40% market share among funded brands. Understanding how to optimize Shopify for Indian market requirements - including payment gateways, shipping integrations, and tax compliance - is essential for success.

Shopify India Setup: Indian merchants can use global Shopify with INR pricing. Setup process: 14-day free trial, business documents (GSTIN, PAN), bank account for payouts. Store setup: domain purchase or connection (Rs 1,000-5,000 annually), theme selection, basic configuration takes 2-4 weeks with agency support.

Payment Integration: Shopify Payments not available in India - use third-party gateways. Razorpay: most popular, 2% transaction fee, easy setup, supports UPI, cards, wallets, EMI, BNPL (Simpl, LazyPay integration). Cashfree: 1.9% transaction fee, faster settlements (T+2), strong COD verification features. PayU: established player, 2% fee, good for high-volume merchants with negotiated rates. Integration via Shopify Payment Apps ensures seamless checkout.

Shipping and Logistics Integration: Native integrations via Shopify apps. Shiprocket (most popular): aggregates 17+ couriers, from Rs 26/500g, AWB generation, NDR management. Pickrr: competitive rates, strong automation. Delhivery Direct: for scale merchants (10,000+ orders/month) with 15-20% rate negotiation. App setup enables: automated order push, shipping label generation, tracking page customization, return management.

India Compliance: GST integration through apps like GST Manager, BillingBee. Features: automated tax calculation by state, GSTIN validation, invoice generation per format, filing reports. E-invoicing for turnover above Rs 5 crore requires IRN generation integration.

Essential Shopify Apps for India: Judge.me/Loox for reviews (Rs 1,000-3,000/month), Klaviyo/Omnisend for email marketing (Rs 2,000-10,000/month), ReConvert for thank you page upsells, Gokwik for COD verification and checkout optimization, Nosto/LimeSpot for product recommendations, Google Shopping integration for marketplace expansion.

Theme Selection: Free themes (Dawn, Craft) suitable for starting. Premium themes (Rs 20,000-50,000) from Out of the Sandbox, Maestrooo offer better customization. Key features for India: mobile optimization (85% traffic), fast loading (target sub-3 second), trust badges, COD visibility, WhatsApp integration.

Performance Optimization: Core Web Vitals critical for SEO and conversion. Image optimization using TinyPNG or built-in compression. Lazy loading for product images. CDN enabled by default. Target: LCP under 2.5 seconds, FID under 100ms, CLS under 0.1.',
        '["Set up Shopify store with Indian payment gateway integration - configure Razorpay or Cashfree with all payment methods enabled", "Integrate shipping solution with rate configuration and AWB automation", "Install and configure essential apps for reviews, marketing, and compliance", "Optimize theme for mobile performance and Core Web Vitals"]'::jsonb,
        '["Shopify India Setup Checklist with 50+ configuration items", "Payment Gateway Comparison for Indian merchants", "Essential Shopify Apps Directory with India-specific recommendations", "Shopify Performance Optimization Guide"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 8, 'WooCommerce and Custom Solutions',
        'WooCommerce powers millions of online stores globally with its open-source flexibility, making it the choice for brands requiring extensive customization or content-commerce integration. For Indian merchants, WooCommerce offers cost advantages at scale but requires technical investment.

WooCommerce Architecture: Built on WordPress, WooCommerce converts any WordPress site into a full e-commerce platform. Core is free; costs arise from hosting, premium plugins, and development. Technology stack: PHP backend, MySQL database, WordPress admin, REST API for integrations.

Hosting for Indian WooCommerce: Shared hosting (Rs 3,000-10,000/year) suitable only for testing or very low traffic. VPS/Cloud hosting (Rs 2,000-15,000/month) recommended - providers include DigitalOcean, AWS Lightsail, Cloudways. Managed WooCommerce hosting (Rs 5,000-30,000/month) from Starter like Starter, Starter provides optimized performance. For scale (10,000+ orders/month), AWS/GCP with proper architecture costs Rs 30,000-100,000/month.

Essential Plugins for India: Payment gateways - Razorpay for WooCommerce (free plugin, 2% transaction), PayU, Instamojo. Shipping - WooCommerce Shipping by Starter offers multi-carrier integration, Shiprocket plugin for automated shipping. GST compliance - WooCommerce GST for invoice formatting, GSTIN field at checkout. Performance - WP Rocket for caching (Rs 4,000/year), Imagify for compression, Redis object caching.

Development Requirements: Basic WooCommerce setup: Rs 30,000-75,000 with agency. Custom theme development: Rs 1-3 lakh. Ongoing maintenance: Rs 15,000-30,000/month. Full-stack developer salary: Rs 6-15 lakh annually. Consider agencies like starter, starter, or freelancers on Starter for development.

Custom E-commerce Development: When to consider: complex product configuration, unique business logic, multi-vendor marketplace, heavy B2B requirements. Technology choices: React/Next.js frontend with Node.js or Python backend; commerce engines like Medusa (open-source Shopify alternative), Saleor (GraphQL-first). Development cost: Rs 15-50 lakh for MVP, 6-12 month timeline. Suitable for: brands with Rs 10 crore+ GMV and specific technical requirements.

WooCommerce vs Custom Decision Framework: Choose WooCommerce for: content-heavy sites, blogs with commerce, budget constraints, basic customization needs. Choose custom for: unique product experiences, complex workflows, multi-tenant platforms, enterprise scale. Hybrid approach: WooCommerce with headless frontend (Starter provides React storefronts) offers middle ground.

Performance Benchmarks: Target metrics - page load under 3 seconds, checkout under 2 steps, 99.9% uptime. Database optimization critical as SKUs grow - consider ElasticSearch for product search, Redis for sessions. Security: SSL mandatory, Sucuri or Wordfence for firewall, regular backups.',
        '["Evaluate WooCommerce vs custom development for your specific requirements with detailed cost-benefit analysis", "Set up WooCommerce development environment with essential Indian plugins configured", "Create technical specification document for custom requirements", "Develop vendor shortlist for development agency or freelancer with capability assessment"]'::jsonb,
        '["WooCommerce India Setup Guide with plugin recommendations", "Custom E-commerce Technical Specification Template", "Development Agency Evaluation Framework", "WooCommerce Performance Optimization Checklist"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 9, 'E-commerce Technology Stack',
        'Building a complete e-commerce technology ecosystem requires integration of multiple systems beyond the core platform. Understanding the full stack - from CRM to analytics to marketing automation - enables efficient operations and data-driven decision making.

Order Management System (OMS): Critical for multi-channel operations. Functions: centralized order processing, inventory sync across channels, fulfillment routing, returns management. Options: Unicommerce (Rs 15,000-50,000/month, dominant in India with 30,000+ brands), Vinculum (enterprise-focused), EasyEcom, Browntape. For single-channel Shopify/WooCommerce stores, native OMS usually sufficient until Rs 5 crore monthly GMV.

Customer Relationship Management (CRM): Unify customer data across touchpoints. For D2C: Freshsales (Rs 1,500/user/month), HubSpot CRM (free tier available, Rs 4,000+/month for automation), Zoho CRM (Rs 800/user/month). Key features: purchase history, communication log, segmentation, campaign tracking. Integration with e-commerce platform critical for unified customer view.

Marketing Automation: Email and WhatsApp automation drives retention and repeat purchases. Klaviyo (Rs 5,000-25,000/month, e-commerce specialized, strong Shopify integration), Webengage (Rs 25,000+/month, Indian platform with WhatsApp), MoEngage (Rs 20,000+/month, mobile-first), Netcore (Indian enterprise option). Key flows: welcome series, abandoned cart (recover 10-15% of carts), post-purchase, win-back. WhatsApp Business API via Gupshup, Interakt, Wati enables conversational commerce.

Analytics and Business Intelligence: Google Analytics 4 (free, essential for all stores) with enhanced e-commerce tracking. For advanced analytics: Mixpanel for product analytics, Amplitude for behavioral analysis. Business intelligence: Metabase (open-source), Tableau, PowerBI for dashboards. Key metrics dashboard: daily GMV, orders, AOV, CAC, conversion rate, inventory levels.

Customer Data Platform (CDP): Unify customer data from all sources for segmentation and personalization. Options: Segment (expensive but comprehensive), Rudderstack (open-source alternative), mParticle. Enables: single customer view, cross-channel campaigns, advanced personalization.

Product Information Management (PIM): Centralize product data for multi-channel consistency. Critical when selling on 5+ channels with 500+ SKUs. Options: Akeneo (open-source), Salsify, Starter. Features: attribute management, digital asset management, syndication to marketplaces.

Integration Architecture: APIs connect all systems. Middleware platforms like Zapier (simple), Celigo, or custom integration enable data flow. Webhook-based real-time sync preferred over batch updates. Document all integrations for maintenance and troubleshooting.',
        '["Map your current technology stack and identify gaps across OMS, CRM, marketing automation, and analytics", "Evaluate and select key vendors for each technology category with integration requirements", "Design integration architecture showing data flow between systems", "Create technology roadmap with implementation phasing over 12 months"]'::jsonb,
        '["E-commerce Technology Stack Map with vendor options", "Integration Architecture Templates", "Technology Vendor Comparison Database", "Implementation Roadmap Template with dependencies"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_2_id, 10, 'Mobile Commerce and App Strategy',
        'Mobile commerce dominates Indian e-commerce with 80-85% of traffic and 70% of transactions occurring on mobile devices. Understanding mobile-first design, app vs mobile web decisions, and emerging channels like WhatsApp commerce is essential for success.

Mobile Web Optimization: Progressive Web Apps (PWAs) offer app-like experience without app store friction. Benefits: offline capability, push notifications, home screen installation. Implementation: Shopify supports PWA through themes and apps; WooCommerce via PWA plugins. Key mobile UX principles: thumb-friendly navigation, minimal form fields, sticky add-to-cart, express checkout. Performance critical: 53% of mobile users abandon sites taking over 3 seconds to load.

Native App Decision: When to build: Rs 5 crore+ monthly GMV, high repeat purchase category, loyalty/engagement focus. App development cost: Rs 10-30 lakh for native iOS and Android, Rs 5-15 lakh for cross-platform (React Native, Flutter). Ongoing maintenance: Rs 1-3 lakh monthly. App discovery challenge: install CAC can reach Rs 100-300, requires significant marketing investment.

App Development Approaches: Native (Swift for iOS, Kotlin for Android) - best performance, highest cost. Cross-platform (React Native, Flutter) - 70% code sharing, good performance, faster development. Shopify Mobile App Builder - simple app from Shopify store, limited customization, Rs 99/month. Custom PWA - web technology, no app store dependency, lower development cost.

WhatsApp Commerce: WhatsApp has 500+ million users in India, making it a critical commerce channel. WhatsApp Business API (through providers like Gupshup, Interakt, Wati) enables: catalog sharing, automated responses, order notifications, payment collection. Cost: Rs 5,000-25,000/month depending on message volume. WhatsApp Commerce use cases: broadcast promotional messages (opt-in required), cart recovery messages (30%+ conversion rate), order updates and tracking, customer support, catalog browsing and ordering.

Social Commerce Integration: Instagram Shopping: tag products in posts and stories, checkout on website. Facebook Shops: free storefront integrated with Instagram. Integration via Facebook Commerce Manager. Conversions happen on your website; attribution tracking through Facebook Pixel/CAPI. Pinterest: product pins drive traffic, strong for home and fashion categories.

Voice Commerce: Emerging channel with Alexa skills and Google Assistant actions. Early adoption opportunity. Voice search optimization important for product discovery.

ONDC (Open Network for Digital Commerce): Government initiative to democratize e-commerce. Unbundles buyer and seller apps from network. Integration enables: listing on multiple buyer apps, reduced marketplace dependency. Implementation through ONDC-enabled apps or direct protocol integration. Early but growing - monitor for category-specific opportunities.',
        '["Audit mobile experience of your store using Google PageSpeed Insights and Lighthouse - identify optimization priorities", "Evaluate app vs mobile web strategy for your business stage and category", "Implement WhatsApp Business integration for key customer communication flows", "Explore ONDC integration readiness and potential benefits for your business"]'::jsonb,
        '["Mobile Commerce Optimization Checklist", "App vs Mobile Web Decision Framework", "WhatsApp Commerce Implementation Guide", "ONDC Integration Assessment Template"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 3: Marketplace Selling (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Marketplace Selling', 'Master selling on Indian marketplaces - Amazon India commission rates (5-27%), Flipkart seller hub, Meesho seller program, and multi-marketplace strategy.', 2, NOW(), NOW())
    RETURNING id INTO v_mod_3_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 11, 'Amazon India Seller Masterclass',
        'Amazon India is the largest e-commerce marketplace with 300+ million product listings and 150+ million monthly visitors. Understanding Amazon''s fee structure, algorithms, and optimization strategies is essential for marketplace success.

Amazon India Fee Structure: Referral fees vary by category - Electronics 5-12%, Fashion 17-22%, Beauty and Personal Care 5-15%, Home and Kitchen 12-15%, Books 6%, Grocery 7-14%. Additional fees: Closing fee Rs 20-60 per item based on price range; Weight handling Rs 29-64 for standard size; FBA fees (Fulfillment by Amazon) include pick-pack Rs 14-23, weight handling Rs 43-110, storage Rs 47-120 per cubic foot monthly. Total marketplace cost typically 25-35% of selling price.

Seller Account Types: Individual (pay-per-sale fee of Rs 99, limited features) vs Professional (Rs 499/month, required for FBA, advertising, brand registry). Verification requires: business documents (GST, PAN), bank account, address proof. Approval timeline: 2-7 days for most categories, longer for restricted categories (jewelry, grocery, supplements).

Amazon FBA vs FBM (Fulfilled by Merchant): FBA advantages - Prime badge increases conversion 30-40%, Amazon handles storage, shipping, returns, customer service. FBA challenges - higher fees, inventory inbounding complexity, storage limits for new sellers. FBM suitable for: large items, slow-moving inventory, local/regional sellers. Hybrid strategy common: FBA for best-sellers, FBM for long-tail.

Listing Optimization (A9 Algorithm): Title: include key search terms, brand, size, color within 200 characters. Bullet points: 5 points highlighting features and benefits with keywords. Backend keywords: 250 bytes of additional search terms. Images: 7 images including main (white background), lifestyle, infographics, size charts. A+ Content: enhanced brand content for registered brands increases conversion 3-10%.

Amazon SEO and Ranking Factors: Conversion rate (most important), click-through rate, sales velocity, price competitiveness, fulfillment method, seller ratings. Initial launch strategy: competitive pricing, PPC spend for visibility, external traffic, review generation through Amazon Vine or follow-up emails.

Amazon Advertising: Sponsored Products (keyword-targeted, 8-15% ACOS typical), Sponsored Brands (brand awareness, header banner), Sponsored Display (retargeting, competitor targeting). PPC strategy: start with automatic campaigns, analyze search term reports, build manual campaigns with proven keywords. Budget allocation: 10-20% of revenue for growth, 5-10% for maintenance.

Brand Registry Benefits: A+ Content access, brand analytics, IP protection, sponsored brand ads. Requires trademark registration (can use pending application).',
        '["Set up Amazon Professional seller account with complete documentation and category approvals", "Create optimized listings for 5 products following A9 algorithm best practices", "Develop Amazon PPC strategy with campaign structure and budget allocation", "Enroll in Brand Registry if trademark available or plan trademark filing"]'::jsonb,
        '["Amazon India Fee Calculator by category", "Amazon Listing Optimization Checklist with A9 factors", "Amazon PPC Campaign Structure Template", "Brand Registry Application Guide"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 12, 'Flipkart Seller Strategy',
        'Flipkart, part of Walmart, is India''s second-largest marketplace with particular strength in fashion, mobile phones, and Tier 2/3 cities. Understanding Flipkart''s seller ecosystem, fee structure, and differentiated strategies from Amazon is essential for multi-marketplace success.

Flipkart Fee Structure: Commission rates by category - Mobile Phones 2-5%, Electronics 6-12%, Fashion 10-22%, Beauty 4-12%, Home 8-15%. Fixed fee: Rs 10-40 based on order value. Shipping fee: Rs 30-100 depending on zone and weight. Collection fee: 2% for prepaid, additional Rs 40-80 for COD. Total platform cost: 20-30% of selling price, generally slightly lower than Amazon.

Seller Registration: Flipkart Seller Hub (seller.flipkart.com) registration requires GSTIN, PAN, bank account, address proof, brand authorization (if selling branded products). Account activation: 3-7 days. Quality checks stricter than Amazon - new sellers start with limited catalog and grow through performance.

Flipkart Fulfillment (FBF): Similar to Amazon FBA - Flipkart handles warehousing, shipping, returns. Flipkart Assured badge (equivalent to Prime) requires FBF or meeting quality metrics. FBF costs similar to FBA with pick-pack, storage, and handling fees. Non-FBF sellers can use Ekart (Flipkart logistics) or own shipping partners.

Listing Quality Score: Flipkart''s equivalent to A9 algorithm considers: content quality, image quality, pricing competitiveness, seller ratings, delivery speed, return rate. Score impacts search ranking and Buy Box winning. Target score above 4.5 out of 5.

Flipkart Advertising: Product Listing Ads (PLA): keyword-targeted ads similar to Amazon Sponsored Products. Brand Ads: premium placements for registered brands. Display Network: banner ads across Flipkart ecosystem. Cost model: CPC (cost per click) typically Rs 3-15 depending on category. ROAS benchmark: 3-5x for sustainable advertising.

Big Billion Days (BBD) and Sales: Flipkart''s major sale events drive 40-50% of annual GMV for many sellers. BBD (October, aligns with Diwali), Big Savings Days, Republic Day Sale. Preparation: inventory build-up 60-90 days prior, deal submission deadlines 30 days before, pricing locks. Advertising budgets increase 5-10x during sales. Sales velocity during events can be 20-50x normal days.

Flipkart-Specific Strategies: Strong in fashion - prioritize apparel, footwear categories on Flipkart. SuperCoins loyalty program integration. Flipkart Wholesale for B2B. Video commerce through Flipkart Video. Shopsy integration for social commerce.

Seller Support and Account Health: Seller Support available via Seller Hub. Performance metrics: Order Defect Rate (ODR) below 1%, Late Dispatch Rate (LDR) below 5%, Cancellation Rate below 2.5%. Account suspension for metric breaches - appeal process available.',
        '["Register on Flipkart Seller Hub and complete verification process", "Create Flipkart listings optimized for Listing Quality Score", "Develop Flipkart advertising strategy with PLA campaign structure", "Plan Big Billion Days participation with inventory and deal strategy"]'::jsonb,
        '["Flipkart Fee Calculator and margin analyzer", "Flipkart Listing Quality Score Optimization Guide", "Big Billion Days Preparation Checklist", "Flipkart vs Amazon Strategy Comparison"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 13, 'Meesho and Social Commerce Platforms',
        'Meesho has emerged as India''s third-largest e-commerce platform with 150+ million monthly transacting users, uniquely positioned for Tier 2/3/4 cities and zero-commission model for sellers. Understanding Meesho and social commerce platforms unlocks access to Bharat''s massive untapped market.

Meesho Platform Overview: Founded 2015, valued at $4.9 billion, the platform pioneered reseller-led social commerce. Current model: direct B2C marketplace with zero commission (as of 2023 for many categories). Revenue from logistics margins and ads. User base: 80% from Tier 2+ cities, 80% women buyers, average order value Rs 300-400.

Meesho Zero Commission Model: Referral fee: 0% (versus 15-25% on Amazon/Flipkart). Payment gateway fee: ~2% absorbed by Meesho for many categories. Seller pays: shipping (heavily subsidized, as low as Rs 21 for first 500g), penalties for cancellations/returns. Net margin significantly higher than other marketplaces - 40-50% gross margin achievable versus 15-25% on Amazon/Flipkart.

Seller Onboarding: Registration requires PAN (GSTIN optional for small sellers below Rs 40 lakh turnover). Catalog listing: simple product upload with basic images. Quality requirements lower than Amazon/Flipkart - opportunity for small sellers. Seller Hub provides analytics, inventory management, order processing.

Meesho Category Strategy: Fashion dominates - 70%+ of GMV from apparel, footwear, accessories. Ethnic wear, sarees particularly strong. Low price point products: Rs 200-500 average item price. New categories growing: beauty, home, electronics. Brand presence increasing as Meesho targets upgrade.

Meesho Ads: Self-serve advertising platform similar to other marketplaces. Cost per click Rs 1-5 (lower than Amazon/Flipkart). Product Ads appear in search and browse. Budget minimum Rs 500/day. ROAS expectation 3-5x with proper targeting.

Other Social Commerce Platforms: GlowRoad: reseller-focused platform, 10+ million resellers, commission-based model with reseller margin. Shop101: social selling platform, WhatsApp and Facebook integration. Bulbul: live commerce platform, video shopping experience. DealShare: social group buying, WhatsApp-based.

Social Commerce Strategy: Product design for social: impulse purchase pricing (below Rs 500), shareable products, visual appeal. Reseller network: build relationships with top resellers, provide marketing materials. Content strategy: create content optimized for WhatsApp/Facebook sharing. Pricing: factor in reseller margins (10-20%) if using reseller model.

Tier 2/3 Market Considerations: COD preference remains high (70-80%). Vernacular content important - Hindi, regional languages. Trust building through influencers, reviews critical. Price sensitivity extreme - value perception matters more than brand.',
        '["Register as Meesho seller and list initial product catalog with optimized images and descriptions", "Analyze category opportunities on Meesho identifying gaps in your product area", "Develop pricing strategy optimized for Meesho zero-commission model", "Create social commerce content strategy for WhatsApp and Facebook sharing"]'::jsonb,
        '["Meesho Seller Registration and Listing Guide", "Social Commerce Platform Comparison", "Tier 2/3 Market Pricing Strategy Framework", "Reseller Network Building Playbook"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 14, 'Multi-Marketplace Operations',
        'Successful e-commerce brands operate across multiple marketplaces to maximize reach while managing complexity. Understanding multi-marketplace strategy, operational challenges, and technology requirements enables efficient scaling.

Multi-Marketplace Strategy Framework: Channel selection based on category fit, customer overlap, and operational complexity. Amazon: premium positioning, brand building, best for electronics, books. Flipkart: mass market, strong in fashion, mobile. Meesho: value segment, Tier 2+ reach. Vertical marketplaces: Nykaa (beauty), Myntra (fashion), 1mg (pharma) for category-specific reach.

Inventory Allocation Strategy: Common challenges: stockouts on one platform, overselling across platforms, working capital tied in distributed inventory. Strategies: safety stock buffer (10-20%) for each platform; real-time sync through OMS; prioritize high-velocity platforms; FBA/FBF for top 20% SKUs, self-fulfilled for long-tail.

Pricing Strategy Across Platforms: Price parity expectations: Amazon and Flipkart monitor competitor pricing, may suppress listings for price disparity. MAP (Minimum Advertised Price) considerations for branded products. Platform-specific pricing: adjust based on fee differences, target margins. Promotional pricing coordination during sales events.

Catalog Management: Master catalog with complete product information. Platform-specific adaptation: image sizes, title formats, backend keywords. PIM (Product Information Management) systems for 500+ SKU operations. Listing quality maintenance across platforms.

Order Management: Centralized OMS essential for multi-channel. Leading India solutions: Unicommerce (30,000+ brands), Vinculum, EasyEcom, Browntape. Features: single dashboard for all orders, automated routing, shipping label generation, returns management. Integration with shipping aggregators (Shiprocket, Pickrr).

Analytics and Reporting: Channel-specific metrics: GMV, orders, AOV, return rate, advertising ROI. Cross-channel analysis: customer overlap, cannibalization assessment. Profitability by channel accounting for all fees. Dashboard tools: platform-native analytics plus unified view through OMS or BI tools.

Operational Complexity Management: Team structure: dedicated marketplace manager per 2-3 platforms. SOPs for listing, pricing, inventory, customer service. Escalation matrix for platform issues. Performance monitoring and account health maintenance.

ONDC Integration: Open Network for Digital Commerce enables listing on multiple buyer apps through single integration. Early but growing - consider as additional channel. Protocol integration or through enabled apps like Paytm, PhonePe.',
        '["Develop multi-marketplace strategy document identifying platforms, allocation, and positioning for each", "Evaluate and implement OMS for centralized order management", "Create pricing and inventory allocation framework across platforms", "Design operational SOPs for multi-channel management"]'::jsonb,
        '["Multi-Marketplace Strategy Canvas", "OMS Vendor Comparison Matrix", "Pricing Strategy Framework for multi-channel", "Operational SOP Templates for marketplace management"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_3_id, 15, 'Marketplace Advertising Mastery',
        'Marketplace advertising has become essential for visibility and sales, with advertising contributing 20-30% of GMV for active sellers. Mastering sponsored ads, campaign optimization, and budget allocation drives profitable marketplace growth.

Amazon Advertising Deep Dive: Sponsored Products: keyword-targeted ads appearing in search results and product pages. Match types: Broad (widest reach), Phrase (moderate), Exact (precise). Auto campaigns for keyword discovery, manual for optimization. ACOS (Advertising Cost of Sale) target: 15-25% for mature products, accept higher for launches.

Campaign Structure Best Practice: Separate campaigns by objective - branded keywords (defensive, low ACOS), category keywords (offensive, higher ACOS), competitor targeting. Product-level campaigns for top 20 SKUs, portfolio campaigns for long-tail. Budget allocation: 60% to proven performers, 40% to testing.

Bid Optimization: Starting bids based on category benchmarks (Rs 5-20 CPC typical). Dynamic bidding strategies: down only (conservative), up and down (balanced), fixed (control). Placement adjustments: increase bids 20-50% for top of search which converts better. Dayparting and budget pacing for efficiency.

Negative Keywords: Critical for ACOS control. Identify wasted spend from search term reports. Add irrelevant, low-converting terms as negatives. Regular weekly review of search term performance. Negative exact, negative phrase match types.

Flipkart Product Listing Ads: Similar CPC model with keyword targeting. Lower CPCs than Amazon (Rs 3-10 typical). Less sophisticated than Amazon - fewer targeting options. Budget minimum Rs 100/day. Focus on category and brand keywords.

Meesho Ads: Emerging platform with basic self-serve ads. Lower competition, lower CPCs. Product ads in search and browse. Limited analytics compared to Amazon/Flipkart.

Advanced Strategies: Seasonal budget scaling: 3-5x during sale events. External traffic to marketplace: Facebook/Google ads to Amazon listings with attribution tracking. Amazon DSP (Demand Side Platform) for display advertising, retargeting - requires managed service or Rs 35,000+ monthly minimum. Video ads for brand building - Amazon Sponsored Brands Video.

Measurement and Optimization: Key metrics: impressions, clicks, CTR, CPC, orders, sales, ACOS, TACOS (Total ACOS including organic). Attribution window: Amazon 7-14 day lookback. Incrementality testing: pause ads to measure true lift. A/B testing ad creative, copy variations.

Budget Planning: Percentage of revenue method: 8-15% of target marketplace revenue. Goal-based budgeting: required spend to achieve rank/visibility targets. ROAS targets: 3-5x for sustainable profitability. Cash flow consideration: 2-week lag between spend and sales revenue.',
        '["Create comprehensive marketplace advertising strategy with campaign structure and budget allocation", "Set up Amazon advertising campaigns following best practices - auto, manual, branded, category", "Implement weekly optimization routine for bid adjustments and negative keywords", "Build advertising dashboard tracking key metrics across platforms"]'::jsonb,
        '["Amazon Advertising Campaign Structure Template", "Bid Optimization Playbook with benchmarks", "Search Term Analysis Framework", "Advertising Budget Calculator and ROAS planner"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 4: D2C Brand Building (Days 16-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'D2C Brand Building', 'Build your D2C brand from scratch - website, social commerce, Instagram and WhatsApp selling, and direct customer relationships.', 3, NOW(), NOW())
    RETURNING id INTO v_mod_4_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_4_id, 16, 'D2C Website Design and UX',
        'Your D2C website is your flagship store - the primary touchpoint for building brand perception and driving conversions. In India''s mobile-first market (85% mobile traffic), designing for mobile experience while maintaining brand consistency across devices is critical.

Homepage Design Principles: Above the fold: hero banner with primary value proposition, clear CTA (Shop Now, Explore). Navigation: category-based menu, search prominent (50%+ of Indian users use search), account/cart icons. Trust signals: founding story snippet, certifications (cruelty-free, organic, etc.), press mentions. Social proof: star ratings, customer count if impressive, testimonial carousel. Featured products: best sellers, new arrivals, promotional items.

Product Listing Page (PLP) Optimization: Filter and sort critical - size, color, price, ratings. Grid layout with 2-column on mobile, 3-4 column on desktop. Quick view functionality reduces friction. Infinite scroll or pagination based on catalog size. Load time: target under 3 seconds for initial paint.

Product Detail Page (PDP) Best Practices: Image gallery: 5-7 images including lifestyle shots, scale reference, texture close-ups. Product information hierarchy: name, price (show original if discounted), ratings, size/variant selector, add to cart. Detailed tabs: description, ingredients/materials, shipping info, reviews. Related products and complete-the-look recommendations. Mobile consideration: sticky add-to-cart button at bottom.

Cart and Checkout UX: Cart page: line items, quantity adjustors, remove option, order summary, promo code field, express checkout options. Guest checkout mandatory - 35% of Indian shoppers abandon for forced registration. Address autofill using Google Places API. Payment page: all options visible (UPI, cards, wallets, COD, EMI). Order summary always visible. Progress indicator for multi-step checkout.

Trust Elements for Indian Consumers: Payment security badges (PCI DSS, Razorpay/Cashfree verified). Return policy prominently displayed (30-day returns expected). Customer service contact: WhatsApp preferred (90%+ of D2C queries via WhatsApp). COD availability displayed (still preferred by 50%+ in Tier 2+). Delivery timeline visibility (expected delivery date generator).

Mobile-Specific Considerations: Touch-friendly: buttons minimum 44x44 pixels. Form fields: appropriate keyboard types (numeric for phone, email for email). Autofill enabled for faster checkout. Bottom navigation for key actions. Hamburger menu with essential categories. Swipe gestures for image galleries.

Conversion Rate Optimization: Indian D2C benchmarks: 1.5-2.5% conversion rate. Key levers: page speed (every 1 second delay reduces conversion 7%), checkout friction, trust signals, payment options. Heat mapping tools (Hotjar, Microsoft Clarity) identify drop-off points. A/B testing: headlines, CTAs, product images, pricing display.',
        '["Audit current website UX against best practices checklist - identify top 10 improvement opportunities", "Create mobile-first wireframes for homepage, PLP, PDP, and checkout flow", "Implement trust elements specific to Indian consumers - payment badges, WhatsApp support, COD visibility", "Set up conversion tracking and heat mapping to identify optimization opportunities"]'::jsonb,
        '["D2C Website UX Audit Checklist with 100+ criteria", "Mobile-First Wireframe Templates", "Trust Element Implementation Guide for Indian D2C", "Conversion Rate Optimization Playbook"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_4_id, 17, 'Instagram Commerce Strategy',
        'Instagram is the primary discovery and engagement platform for Indian D2C brands with 250+ million users. Understanding Instagram commerce features, content strategy, and shoppable posts drives significant D2C traffic and sales.

Instagram Shopping Setup: Eligibility: business/creator account, connected to Facebook Business Page, catalog on Facebook Commerce Manager. Catalog creation: product feed with images, descriptions, prices, variants. Product tagging in posts, stories, reels enabled after approval. Instagram Shop tab: dedicated storefront within your profile. Checkout options: link to website (most common in India) or Instagram Checkout (limited availability).

Content Strategy for Commerce: Content pillars: product showcases (30%), lifestyle/aspirational (25%), educational/how-to (20%), user-generated content (15%), behind-the-scenes/brand story (10%). Posting frequency: 1-2 feed posts daily, 3-5 stories daily, 3-5 reels weekly. Best posting times India: 7-9 PM weekdays, 11 AM-1 PM weekends. Content calendar planning: align with seasons, festivals, trends.

Reels for Product Discovery: Reels dominate Instagram algorithm with 2x reach versus static posts. Product showcase reels: transformation videos, unboxing, before-after. Trend participation: audio trends with product integration. Educational content: how-to-use, styling tips, ingredient spotlights. Target: 10-30 second reels optimized for retention. Hook in first 1-3 seconds critical.

Stories for Engagement and Sales: Story features: polls, questions, quizzes, countdown stickers drive engagement. Product stickers link directly to product pages. Swipe-up (or link stickers) for accounts with 10K+ followers. Story highlights: organize by category, collections, FAQs. Flash sales and limited-time offers create urgency.

Influencer Integration: Instagram is primary influencer marketing platform. Content collaboration: influencer posts with product tags. Branded content tools: partnership labels for transparency. Whitelisted ads: run ads from influencer accounts with their creative. Affiliate links via stories with tracking.

Instagram Ads for D2C: Ad formats: image, video, carousel, collection, stories, reels ads. Targeting: interests, behaviors, lookalike audiences, retargeting. Campaign objectives: traffic (website clicks), conversions (purchases), catalog sales (dynamic product ads). Budget starting point: Rs 500/day for testing, Rs 5,000+/day for scale. ROAS expectation: 2-4x for prospecting, 5-10x for retargeting.

Performance Metrics: Engagement rate benchmark: 3-6% for D2C accounts. Story view rate: 5-10% of followers. Click-through rate from shopping posts: 1-3%. Track: profile visits, website clicks, saves, shares. Use Instagram Insights and Commerce Manager analytics.',
        '["Set up Instagram Shopping with complete product catalog and enable product tagging", "Develop Instagram content strategy with content pillars, posting schedule, and content calendar", "Create first 5 shoppable reels showcasing products with conversion-focused hooks", "Design Instagram advertising strategy with campaign structure and audience targeting"]'::jsonb,
        '["Instagram Shopping Setup Guide", "D2C Instagram Content Strategy Template", "Reels Best Practices for Product Commerce", "Instagram Ads Campaign Structure Template"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_4_id, 18, 'WhatsApp Commerce and Conversational Selling',
        'WhatsApp is the dominant communication channel in India with 500+ million users. For D2C brands, WhatsApp has evolved from customer service channel to a full commerce platform enabling catalog browsing, ordering, payments, and post-purchase engagement.

WhatsApp Business Ecosystem: WhatsApp Business App: free, suitable for small sellers (under 500 messages/day). Features: business profile, catalog (up to 500 products), quick replies, labels for organization. WhatsApp Business API: for scale operations, requires Business Solution Provider (BSP). BSPs: Gupshup, Interakt, Wati, Yellow.ai, Haptik. Cost: platform fee Rs 5,000-25,000/month plus per-message costs.

WhatsApp Commerce Features: Catalog: full product listings with images, descriptions, prices accessible via ''Shop'' button. Cart: customers add items to cart within WhatsApp. Checkout: order placement with address, payment link generation. Payments: direct payment via WhatsApp Pay (UPI-based) or payment links to gateway.

Conversational Commerce Flows: Discovery: customer clicks WhatsApp from website/ads, receives welcome message with menu options. Catalog browsing: share specific products or categories based on queries. Personalized recommendations: based on chat history and preferences. Order placement: guided checkout through conversation. Payment: share payment link or enable WhatsApp Pay. Confirmation: order details, expected delivery, tracking link.

WhatsApp Marketing (Broadcast): Opt-in required: explicit consent before promotional messages. Template messages: pre-approved message formats for broadcasts. Message types: promotional (new launches, sales), utility (order updates), authentication (OTP). Cost per template message: Rs 0.30-0.50 (category-dependent). Frequency: 2-4 promotional messages/month to avoid opt-outs.

Automation and Chatbots: Automated responses: greeting, away messages, quick replies. Chatbot integration: AI-powered conversations for FAQs, product discovery. Platforms: Interakt, Wati, Yellow.ai offer no-code chatbot builders. Human handoff: seamless transfer to live agent for complex queries. Balance automation and personal touch - Indian customers value human interaction.

WhatsApp for Customer Service: Query resolution: 90%+ of D2C customer queries via WhatsApp. Response time expectation: under 1 hour during business hours. Multimedia support: share images for quality issues, videos for how-to. Order tracking: automated status updates via WhatsApp. Returns and refunds: guided process through chat.

Performance Metrics: Open rate: 95%+ (versus 15-20% for email). Click-through rate: 15-25% on promotional messages. Conversion from WhatsApp lead: 5-15% for engaged conversations. Response time: target under 30 minutes during business hours. Customer satisfaction: track with post-interaction surveys.

Integration with E-commerce: Shopify: apps like DelightChat, Interakt integrate catalog and orders. WooCommerce: plugins for WhatsApp integration. Custom: API integration for order sync, inventory updates. Abandoned cart recovery: WhatsApp messages recover 25-35% of abandoned carts (versus 10-15% for email).',
        '["Set up WhatsApp Business with complete catalog and business profile optimization", "Design conversational commerce flows for discovery, ordering, and support", "Implement WhatsApp automation with chatbot for FAQs and human handoff protocol", "Create WhatsApp marketing strategy with message templates and broadcast calendar"]'::jsonb,
        '["WhatsApp Business API Setup Guide", "Conversational Commerce Flow Templates", "WhatsApp Marketing Calendar and Template Library", "WhatsApp Performance Dashboard Template"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_4_id, 19, 'Building Brand Identity and Story',
        'D2C success requires building a distinctive brand that connects emotionally with customers. In a market crowded with options, brand identity and story differentiate beyond product features and price.

Brand Strategy Foundation: Brand purpose: why your brand exists beyond making money. Brand promise: what customers can expect consistently. Brand personality: human characteristics of your brand (playful, expert, caring, rebellious). Brand values: principles guiding decisions and behavior. These elements should authentically reflect founder vision and resonate with target audience.

Indian D2C Brand Archetypes: Heritage/Authenticity: connecting to Indian traditions, Ayurveda, craftsmanship. Examples: Forest Essentials, Fabindia. Modern Indian: contemporary interpretation of Indian identity. Examples: Good Earth, Nicobar. Problem-Solver: addressing specific Indian consumer needs. Examples: Mamaearth (toxin-free), Plum (vegan beauty). Aspirational/Lifestyle: representing desirable lifestyle. Examples: boAt, Sugar Cosmetics. Value Champion: democratizing quality. Examples: Wow Skin Science, Minimalist.

Brand Story Development: Origin story: founder journey, problem discovery, solution creation. Authentic narratives resonate - Vineeta Singh''s Sugar Cosmetics story of rejection by investors, Ghazal Alagh''s Mamaearth story of struggling to find safe baby products. Story elements: challenge faced, insight discovered, solution created, impact achieved.

Visual Brand Identity: Logo: memorable, scalable, culturally appropriate. Color palette: 2-3 primary colors with psychological alignment (green for natural, blue for trust). Typography: readable, personality-appropriate, available in Hindi/regional if needed. Photography style: consistent editing, lighting, model representation. Packaging design: unboxing experience, sustainability considerations, Instagram-worthy elements.

Brand Voice and Messaging: Tone definition: formal vs casual, expert vs friendly, serious vs playful. Messaging hierarchy: key messages by priority and context. Tagline: memorable encapsulation of brand promise. Copy guidelines: word choice, sentence structure, personality expression. Adapt voice across channels: more formal for email, casual for social.

Brand Consistency Across Touchpoints: Touchpoint mapping: website, social media, packaging, customer service, advertising, influencer content. Brand guidelines document: comprehensive reference for all brand elements. Training for customer service team on brand voice. Partner and influencer briefs for consistent representation.

Building Brand Community: Community purpose: shared interest, learning, belonging. Platforms: Instagram community, WhatsApp groups for VIP customers, Facebook groups. Engagement: user-generated content campaigns, customer spotlights, exclusive access. Brand ambassadors: loyal customers who actively promote. Community metrics: engagement rate, content contribution, referral generation.',
        '["Define brand strategy foundation including purpose, promise, personality, and values", "Develop brand origin story with authentic narrative elements", "Create or refine visual brand identity with complete style guidelines", "Design brand community strategy with platform selection and engagement plan"]'::jsonb,
        '["Brand Strategy Canvas Template", "Brand Story Development Framework", "Visual Brand Guidelines Template", "Community Building Playbook for D2C"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_4_id, 20, 'Content Marketing for D2C Growth',
        'Content marketing builds organic traffic, brand authority, and customer trust - essential for reducing CAC dependence on paid advertising. Indian D2C brands leveraging content effectively achieve 30-50% of traffic from organic sources.

Content Strategy Framework: Content pillars: 4-6 themes aligned with brand expertise and customer interests. For beauty brand: skincare routines, ingredient education, beauty trends, self-care wellness. Content types by funnel stage: awareness (educational, trending), consideration (comparison, reviews, how-to), decision (product-specific, testimonials). Content-to-commerce ratio: 70% value content, 30% promotional for trust building.

Blog and SEO Strategy: Blog on D2C website: cornerstone of content strategy. Keyword research: identify search terms with purchase intent and volume. Tools: Ahrefs, SEMrush, free alternatives like Ubersuggest. Content types: buying guides (''best vitamin C serums in India''), how-to (''how to layer skincare products''), listicles (''10 ingredients for glowing skin''). On-page SEO: title tags, meta descriptions, header hierarchy, internal linking. Publishing frequency: 2-4 quality posts per week for meaningful traffic. Results timeline: 4-6 months for organic traffic growth.

Video Content Strategy: YouTube: second largest search engine, essential for discovery. Content types: tutorials, product demos, ingredient deep-dives, customer stories. Optimization: thumbnails, titles, descriptions with keywords. Shorts: vertical video competing with Instagram Reels, TikTok. Behind-the-scenes: manufacturing, founder vlogs, team culture build authenticity. User-generated video: encourage and reshare customer content.

Email Marketing for D2C: Email remains highest ROI channel at Rs 40-50 for every Rs 1 spent. List building: pop-ups (exit intent, scroll-triggered), lead magnets (discounts, guides), checkout opt-in. Email types: welcome series (5-7 emails introducing brand), promotional (sales, new launches), educational (tips, content), transactional (order confirmation, shipping). Personalization: product recommendations based on purchase history, browse behavior. Frequency: 3-4 emails/week is acceptable with engaged list. Platforms: Klaviyo (e-commerce specialized), Mailchimp, Webengage.

Influencer Content Collaboration: Types: sponsored posts, brand ambassadorships, affiliate partnerships, gifting. Micro-influencers (10K-100K): higher engagement, more affordable (Rs 5,000-50,000/post). Creator-led content: authentic, user-generated style performs better. Content repurposing: use influencer content in ads (whitelisting), website, email. Measurement: unique codes, UTM links, post-campaign surveys.

User-Generated Content (UGC): Encourage: post-purchase emails requesting reviews/photos, hashtag campaigns, contests. Curate: tools like Foursixty, Yotpo aggregate UGC. Feature: website galleries, social proof on PDPs, social media reshares. Legal: ensure proper permissions and terms of use. Incentivize: loyalty points, discounts for submissions.',
        '["Develop content strategy document with pillars, types, and editorial calendar", "Create blog content plan with keyword research and 12-month topic schedule", "Design email marketing strategy with automation flows and campaign calendar", "Build influencer and UGC strategy with partnership framework and content guidelines"]'::jsonb,
        '["Content Strategy Template for D2C brands", "SEO and Blog Editorial Calendar Template", "Email Marketing Automation Flow Templates", "Influencer Partnership Agreement and Brief Templates"]'::jsonb,
        90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 5: Payment & Checkout Optimization (Days 21-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Payment & Checkout Optimization', 'Optimize payments and checkout for Indian consumers - UPI integration, EMI options, and COD strategy (60%+ in Tier 2+ cities).', 4, NOW(), NOW())
    RETURNING id INTO v_mod_5_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_5_id, 21, 'Payment Gateway Selection and Integration',
        'Payment gateway selection impacts conversion rates, costs, and customer experience. India''s diverse payment landscape requires supporting multiple methods from UPI to COD, making gateway choice a strategic decision.

Indian Payment Gateway Landscape: Major players: Razorpay (market leader, 40%+ share among D2C), PayU, Cashfree Payments, CCAvenue, Instamojo, Paytm for Business. Each offers: credit/debit cards, net banking, UPI, wallets, EMI, BNPL integration. Differentiation through: pricing, features, settlement speed, developer experience, support quality.

Pricing Comparison: Razorpay: 2% for domestic transactions, 3% for international. No setup fee, no annual maintenance. PayU: 1.9-2% depending on volume, slight discount for high volume. Cashfree: 1.9% standard, aggressive pricing for startups. CCAvenue: 2-2.5% with higher setup complexity. Instamojo: 2% + Rs 3 per transaction, simpler for small sellers. Negotiation possible above Rs 50 lakh monthly volume - can achieve 1.5-1.75%.

Gateway Selection Criteria: Payment success rate: target 95%+ success rate, varies by gateway and payment method. Settlement time: standard T+2, some offer T+1 or instant at premium. Developer experience: API documentation, SDKs, sandbox quality. Feature set: subscription billing, payment links, invoicing, marketplace split payments. Support: response time, dedicated account manager thresholds. Compliance: PCI-DSS certified, RBI guidelines adherent.

Integration Approaches: Hosted checkout: redirect to gateway page, simplest integration, lower conversion. Embedded checkout: gateway widget within your site, better experience, moderate complexity. Custom UI with API: full control over checkout design, highest conversion, complex implementation. Shopify: native apps from Razorpay, PayU, Cashfree for seamless integration. WooCommerce: plugins available for all major gateways.

Payment Methods to Enable: UPI: dominant in India, 40-50% of digital payments, must enable (UPI Intent, QR, Collect). Cards: credit/debit card acceptance, tokenization required post-RBI mandate. Net banking: all major banks, 50+ bank options recommended. Wallets: Paytm, PhonePe, Amazon Pay as supplementary options. International: enable for NRI customers, additional 1% cost.

Multi-Gateway Strategy: Reasons: payment routing for higher success, redundancy, cost optimization. Implementation: route by payment method, card network, or amount. Tools: Juspay, Plural (formerly PineLabs), or custom routing logic. Recommendation: start with single gateway, add second at Rs 1 crore+ monthly volume.

Security and Compliance: PCI-DSS compliance: gateways are certified, ensure your site handles card data appropriately. Tokenization: RBI mandate requires card-on-file tokenization, gateways provide this. Fraud prevention: gateway provides basic, consider additional tools at scale. 3D Secure: mandatory for card transactions in India.',
        '["Compare payment gateways against requirements - create decision matrix with pricing, features, and success rates", "Select primary payment gateway and complete integration with all payment methods enabled", "Configure payment method display order optimized for Indian consumers (UPI first)", "Set up payment analytics dashboard tracking success rates by method and amounts"]'::jsonb,
        '["Payment Gateway Comparison Matrix for Indian e-commerce", "Integration Checklist for Razorpay/PayU/Cashfree", "Payment Method Priority Guide for India", "Payment Analytics Dashboard Template"]'::jsonb,
        90, 50, 0, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_5_id, 22, 'UPI and Digital Payments Optimization',
        'UPI has transformed Indian payments with 12+ billion monthly transactions. For e-commerce, UPI offers instant payment confirmation, zero transaction failures (unlike card declines), and increasing consumer preference. Optimizing UPI checkout is critical for conversion.

UPI Payment Flows: UPI Intent: customer clicks ''Pay with UPI'', opens preferred UPI app, authorizes payment, returns to merchant site. Highest conversion, recommended default. UPI Collect: enter VPA (name@upi), receive request in UPI app, authorize. Requires customer to remember VPA, lower conversion. UPI QR: display QR code, customer scans with any UPI app. Useful for WhatsApp commerce, stores. Recommended: enable Intent as primary, Collect and QR as fallback.

UPI Success Rate Optimization: Current ecosystem success rate: 96-98% for intent-based payments. Failure reasons: insufficient balance (40%), technical errors (30%), timeout (20%), wrong PIN (10%). Optimization: clear error messages, retry prompts, alternative payment suggestions. Customer communication: real-time status updates, failure notifications with next steps.

UPI AutoPay for Subscriptions: RBI-approved recurring payments via UPI mandate. Customer authorizes recurring debit during subscription setup. Maximum mandate amount: Rs 1 lakh per transaction. Use cases: subscription boxes, SIP-style purchases, membership fees. Implementation: requires specific gateway support and mandate management. Benefits: no failed renewals due to card expiry, higher retention.

BNPL (Buy Now, Pay Later) Integration: Major players: Simpl, LazyPay, ZestMoney, Amazon Pay Later, Flipkart Pay Later. Customer journey: select BNPL at checkout, instant credit check, approval/denial in seconds. Conversion impact: 15-20% increase in conversion, 30-40% increase in AOV. Merchant cost: 3-6% of transaction value (higher than standard payment). Customer segment: appeals to millennials/Gen-Z, higher adoption in fashion, electronics. Integration: most gateways offer BNPL add-ons, direct integration available.

EMI Options: No-cost EMI: merchant bears interest, shown as ''No Cost EMI'' to customer. Increases AOV for high-ticket items (Rs 3,000+). Standard EMI: customer bears interest, available on credit cards and BNPL. Subvention: brand/merchant negotiates with bank/BNPL for reduced rates. Gateway integration: Razorpay, PayU offer EMI configuration. Impact: EMI availability can increase conversion 25-40% for Rs 5,000+ purchases.

Digital Wallet Integration: Paytm Wallet, PhonePe, Amazon Pay, MobiKwik. Usage declining as UPI dominates (5-10% of payments now versus 30% in 2019). Still relevant for: cashback-driven customers, specific demographics. Integration: usually through payment gateway, minimal additional effort.

Payment Optimization Metrics: Track by payment method: success rate, average transaction value, drop-off rate. UPI benchmarks: 96%+ success rate, sub-10 second completion. Card benchmarks: 85-90% success rate (3DS failures impact). Conversion by method: typically UPI > Wallet > Card > Net Banking for success rate.',
        '["Optimize UPI integration with Intent as primary flow and clear error handling", "Evaluate and integrate BNPL options based on target customer segment and category", "Configure EMI options for products above Rs 3,000 with no-cost EMI analysis", "Set up payment method analytics tracking success rates and conversion by type"]'::jsonb,
        '["UPI Integration Best Practices Guide", "BNPL Provider Comparison Matrix", "EMI Configuration Playbook with subvention analysis", "Payment Method Performance Dashboard"]'::jsonb,
        90, 50, 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_5_id, 23, 'COD Strategy and RTO Management',
        'Cash on Delivery remains significant in Indian e-commerce at 40-60% of orders depending on category and geography. While COD enables access to customers without digital payment habits, it creates operational challenges through RTO (Return to Origin) and delayed cash flow. Strategic COD management is essential.

COD Landscape in India: Overall COD share: 40-45% nationally, down from 70% in 2018. Geographic variation: metros 30-35% COD, Tier 2 cities 50-55%, Tier 3+ 60-70%. Category variation: fashion 50-55% COD, electronics 35-40%, beauty 45-50%. Trend: declining 5-7% annually as UPI adoption increases, but remains essential for Tier 2+ penetration.

COD Economics: Direct costs: COD fee to logistics (Rs 20-40 extra per order), cash handling (1-2% of order value). RTO impact: undelivered COD orders return at full forward + reverse logistics cost (Rs 100-150 total). RTO rates: 15-25% for COD versus 5-10% for prepaid. Cash flow: COD remittance takes 5-7 days after delivery versus instant for prepaid. Net COD cost: 3-5% of order value including RTO impact.

RTO Reduction Strategies: COD Verification: IVR call before dispatch confirming order and address. Services: Gokwik, Shiprocket''s RTO Shield, Razorpay''s COD verification. Impact: reduces RTO 20-40%, cost Rs 2-5 per verification. Address Verification: pin code validation, Google Places autocomplete, delivery serviceability check at checkout. Historical Data: block repeat RTO addresses, identify high-risk pin codes, customer behavior scoring. NDR Management: Non-Delivery Report follow-up within 24 hours, customer re-confirmation, address correction.

COD to Prepaid Conversion: Incentivization: Rs 50-100 discount for prepaid, free shipping for prepaid orders. Wallet offers: Paytm, PhonePe cashback for prepaid. UPI promotion: prominent UPI option, one-click UPI payments. Trust building: return policy clarity, delivery tracking, brand credibility reduce COD preference. Partial payment: collect Rs 100-200 upfront with remaining COD (reduces RTO significantly).

COD Availability Rules: Geographic restrictions: disable COD for high-RTO pin codes (RTO history-based). Order value thresholds: COD only for orders above Rs 500 or below Rs 3,000. First-time customer rules: prepaid only for first order, COD enabled after successful prepaid. Product restrictions: no COD for high-value items (above Rs 10,000), perishables, customized products.

COD Remittance and Reconciliation: Standard remittance: T+5 to T+7 days post-delivery. Early remittance: some logistics offer T+2 at 1-2% premium. Reconciliation: match delivered orders with remittance amounts, track shortages. Cash management: factor COD float in working capital planning.

Fake Order and Fraud Prevention: Identification: multiple orders to same address, new phone numbers, incomplete addresses, suspicious behavior patterns. Prevention: phone verification, address validation, blacklisting. Tools: fraud scoring through Gokwik, Razorpay, or custom rules. Cost of fraud: full logistics cost plus product cost if not recovered.',
        '["Analyze current COD versus prepaid split and RTO rates by geography and customer segment", "Implement COD verification system (IVR or service integration) for all COD orders", "Design COD to prepaid conversion strategy with incentives and trust elements", "Create COD availability rules based on pin code, order value, and customer history"]'::jsonb,
        '["COD Economics Calculator with RTO impact analysis", "RTO Reduction Strategy Playbook", "COD Verification Implementation Guide", "COD Availability Rules Configuration Template"]'::jsonb,
        90, 50, 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_5_id, 24, 'Checkout Optimization for Conversion',
        'Checkout is where purchase intent converts to revenue - or abandons. Indian e-commerce faces 70-75% cart abandonment rates, with checkout friction being a primary cause. Optimizing every checkout element can improve conversion by 20-35%.

Cart Abandonment Analysis: Indian benchmarks: 70-75% cart abandonment (global 69%). Top abandonment reasons: high shipping costs (48%), forced account creation (26%), complex checkout (21%), security concerns (17%), slow delivery (16%). Recovery opportunity: optimized checkout recaptures 20-35% of potential lost revenue.

Checkout Flow Design: Single page checkout: all steps visible on one page, reduces perceived complexity, 10-15% conversion lift. Multi-step checkout: clear progress indicator, maximum 3 steps (information, shipping, payment). Guest checkout: mandatory - 35% of Indian shoppers abandon for forced registration. Account creation: offer post-purchase with incentive, or optional during checkout.

Information Collection Optimization: Essential fields only: name, phone, email, address. Phone number validation: 10-digit Indian format, OTP optional for high-value orders. Address: autocomplete via Google Places, pin code-first approach for India. Field defaults: most common country, state pre-selected based on IP or pin code.

Shipping and Delivery Options: Display shipping cost early: show estimated shipping in cart, not checkout surprise. Free shipping threshold: ''Add Rs 200 more for free shipping'' increases AOV. Multiple options: standard (3-5 days), express (1-2 days), same-day where available. Expected delivery date: show specific date, not just ''3-5 days''.

Payment Experience: Payment method prominence: show most popular methods first (UPI, then cards). Saved payments: token-based card storage for returning customers. Express checkout: Razorpay Magic Checkout, Simpl one-click for returning customers. Error handling: clear error messages, retry options, alternative payment suggestions.

Trust Elements at Checkout: Security badges: SSL, PCI-DSS, payment gateway logos. Return policy reminder: ''Free 30-day returns'' prominently displayed. Customer service: WhatsApp/phone number visible. Order summary: clear line items, quantities, prices throughout checkout. COD reassurance: ''Pay when you receive your order'' messaging.

Mobile Checkout Optimization: 85% of Indian e-commerce traffic is mobile: Sticky order summary/CTA on mobile, Keyboard optimization (numeric for phone/pin code), Autofill enabled, Large touch targets (minimum 44x44 pixels), Minimal scrolling.

Checkout Technology: Checkout optimization tools: Gokwik, Razorpay Magic Checkout, Simpl. Features: address autofill, one-click checkout for repeat customers, COD verification. Impact: 15-25% conversion improvement from checkout tools. Cost: 0.5-1% of order value or subscription-based.

A/B Testing Checkout: Test elements: button colors/copy, field order, trust badges, shipping display. Tools: Google Optimize (free), VWO, Optimizely. Testing discipline: one variable at a time, statistical significance before conclusion.',
        '["Audit current checkout flow against best practices - identify top 10 friction points", "Implement guest checkout if not available, optimize field requirements", "A/B test checkout page elements starting with highest-impact changes", "Evaluate and implement checkout optimization tool (Gokwik/Magic Checkout)"]'::jsonb,
        '["Checkout Audit Checklist with 50+ optimization criteria", "Checkout A/B Testing Roadmap", "Mobile Checkout Optimization Guide", "Checkout Tool Comparison Matrix"]'::jsonb,
        90, 50, 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_mod_5_id, 25, 'Payment Fraud Prevention',
        'E-commerce payment fraud costs Indian merchants 1-3% of revenue annually. As transaction volumes grow, fraud sophistication increases - requiring systematic prevention approaches balancing security with customer experience.

Fraud Landscape in India: Common fraud types: card testing (small transactions to validate stolen cards), friendly fraud (chargebacks from legitimate purchases), account takeover, promo abuse, return fraud. Industry fraud rate: 1-3% of transactions in value terms. Peak fraud periods: sale events, new customer acquisition campaigns. Category risk: electronics and gift cards highest risk, fashion and beauty moderate.

Payment Gateway Fraud Tools: Built-in protection: Razorpay Thirdwatch, PayU Fraud Shield, Cashfree Risk Shield. Features: velocity checks, device fingerprinting, transaction pattern analysis. Cost: usually included or Rs 1-3 per transaction. Limitation: catch-all rules may block legitimate transactions.

Fraud Prevention Framework: Pre-transaction: address verification, IP geolocation, device fingerprinting, email/phone validation. At-transaction: velocity limits (orders per hour/day), amount thresholds, card BIN checks, 3D Secure. Post-transaction: order review queue for flagged transactions, manual verification for high-risk, chargeback monitoring.

Risk Scoring Approach: Assign risk points for suspicious signals: new customer, high-value order, address mismatch, multiple failed payments. Threshold actions: low risk (auto-approve), medium risk (additional verification), high risk (manual review or decline). Continuous learning: analyze chargebacks and fraud cases to refine rules.

3D Secure and Authentication: 3D Secure mandatory in India for card transactions. Impact: reduces fraud but adds friction (15-20% cart abandonment at 3DS step). Optimization: ensure smooth 3DS flow, educate customers on OTP process. Biometric authentication: emerging via bank apps, reduces 3DS friction.

COD Fraud Prevention: Fake orders: phone verification, address validation, repeat customer checks. RTO fraud: blacklist repeat non-accepting customers. Cash handling fraud: driver verification, reconciliation processes.

Chargeback Management: Chargeback reasons: fraud (unauthorized transaction), merchandise (not as described), service (non-delivery). Response process: gather evidence (delivery proof, communication, photos), submit within timeline (7-21 days). Representment: challenge fraudulent chargebacks with compelling evidence. Win rate: 30-50% with proper documentation.

Fraud Analytics and Monitoring: Metrics to track: fraud rate by value and count, chargeback ratio, false positive rate. Dashboard: real-time fraud alerts, daily/weekly trends. Review cadence: weekly fraud review, monthly rule tuning. Industry benchmarks: fraud rate below 0.5% of transactions, chargeback rate below 0.1%.

Balancing Security and Experience: Over-aggressive fraud prevention blocks legitimate customers. False positive impact: lost sale plus negative customer experience. Optimal approach: graduated verification based on risk level. Customer communication: explain security measures as customer protection.',
        '["Implement payment gateway fraud tools and configure basic fraud rules", "Design fraud scoring framework with risk signals and threshold actions", "Create chargeback response process with evidence collection templates", "Build fraud monitoring dashboard tracking key metrics"]'::jsonb,
        '["Fraud Prevention Framework Template", "Risk Scoring Model for E-commerce", "Chargeback Response Playbook with templates", "Fraud Analytics Dashboard Template"]'::jsonb,
        90, 75, 4, NOW(), NOW());

END $$;

COMMIT;
