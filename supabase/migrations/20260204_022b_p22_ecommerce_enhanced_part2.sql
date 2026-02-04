-- THE INDIAN STARTUP - P22: E-commerce & D2C Mastery - Enhanced Content Part 2
-- Migration: 20260204_022b_p22_ecommerce_enhanced_part2.sql
-- Purpose: Modules 6-10 (Days 26-50) - Second half of P22 course content
-- Depends on: 20260130_016_p22_ecommerce_course.sql (base course) and part1 (if exists)

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
    -- Get P22 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P22';

    -- ========================================
    -- MODULE 6: Logistics & Fulfillment (Days 26-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Logistics & Fulfillment Excellence',
        'Build efficient logistics and fulfillment operations for e-commerce success - shipping partner selection, 3PL management, Amazon FBA India, returns management, and cost optimization strategies for pan-India delivery.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_6_id;

    -- Day 26: Logistics Ecosystem in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        26,
        'Understanding India''s E-commerce Logistics Ecosystem',
        'India''s e-commerce logistics market is valued at Rs 47,000+ crore and growing at 25% CAGR. The ecosystem has matured significantly with dedicated e-commerce logistics providers, aggregators, and marketplace fulfillment services. Understanding this landscape is critical for optimizing delivery costs and customer experience.

Logistics Cost Structure in India: Per-shipment costs typically range from Rs 50-150 for intra-city, Rs 60-200 for intra-zone, and Rs 80-300 for inter-zone deliveries. Weight and volumetric pricing apply, with slabs typically at 500g, 1kg, 2kg, and 5kg. COD shipments cost Rs 15-40 additional for remittance handling. Return shipments (RTO) are charged at 50-100% of forward shipping. Total logistics cost for e-commerce typically represents 8-15% of order value.

Major Logistics Players: Delhivery is the largest e-commerce logistics company with 24,000+ pin codes, 15 million+ sq ft of warehousing, and full-stack capabilities from express parcel to freight. Blue Dart, backed by DHL, offers premium express delivery with 35,000+ pin codes and highest brand trust but at premium pricing. DTDC provides economical surface options with 10,000+ pin codes. Ecom Express focuses exclusively on e-commerce with 27,000+ pin codes and strong Tier 2/3 coverage. Shadowfax, backed by Flipkart investment, specializes in hyperlocal and quick delivery. XpressBees offers aggressive pricing and strong growth trajectory.

Shipping Aggregators: Shiprocket is the largest aggregator with 17+ courier partners, serving 29,000+ pin codes. Single integration enables multi-carrier shipping with rate comparison. Pricing: Rs 26+ per 500g based on volume. Pickrr offers competitive rates with 10+ courier partners. ClickPost focuses on post-purchase experience with delivery tracking and notifications. iThink Logistics provides white-label logistics solutions.

Fulfillment Models: Self-Fulfillment involves own warehouse operations with full control but higher fixed costs. Suitable for high-volume, predictable demand with typical setup cost of Rs 5-20 lakh for small warehouse. Third-Party Logistics (3PL) outsources warehousing and fulfillment to specialists. Variable cost model with lower capital requirement. Major 3PLs: Delhivery, Emiza, Holisol, Increff. Marketplace Fulfillment like Amazon FBA, Flipkart Fulfillment, and Meesho Fulfillment. Fastest delivery options but higher fees of 15-25% of order value. Hybrid Model uses a combination of self-fulfillment in metros and 3PL/marketplace fulfillment for reach.

Geography Considerations: Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata) have same-day and next-day delivery options with multiple carrier choices and lowest shipping costs. Tier 2 Cities (state capitals, major cities with 500k+ population) offer 2-3 day delivery with good carrier coverage and moderate shipping costs. Tier 3/4 (smaller towns with less than 500k population) have 4-7 day delivery with limited carrier options and higher shipping costs with COD preference. India has 19,000+ pin codes; typical e-commerce coverage is 15,000-25,000 pin codes depending on carrier.

Last-Mile Challenges: Address Quality is a major issue as Indian addresses often lack standardization. Use address verification APIs like Google Places and What3Words. Delivery Failures occur due to customer not available and wrong address. First-attempt delivery success rate: 75-85%. Reattempt costs add Rs 30-50 per attempt. COD Collection requires cash handling with risk of fake currency. Digital payment at doorstep (QR, UPI) growing. Security concerns for high-value shipments require OTP-based delivery.',
        '["Map your delivery requirements by geography - identify pin codes with highest order concentration", "Compare logistics costs from 3+ providers for your typical shipment profile (weight, dimensions, COD mix)", "Evaluate self-fulfillment vs 3PL vs marketplace fulfillment based on volume and growth projections", "Analyze current delivery performance metrics: first-attempt success rate, average delivery time, RTO percentage"]'::jsonb,
        '["India E-commerce Logistics Landscape Report with market sizing and growth projections", "Shipping Cost Comparison Calculator for evaluating carrier options by zone and weight", "Fulfillment Model Decision Framework for selecting optimal fulfillment strategy", "Pin Code Coverage Analysis Tool comparing carrier serviceability"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 27: Shipping Partner Selection and Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        27,
        'Shipping Partner Selection and Rate Negotiation',
        'Selecting the right shipping partners and negotiating competitive rates is crucial for e-commerce profitability. With logistics costs representing 8-15% of revenue, even small improvements significantly impact bottom line. Understanding carrier strengths and negotiation strategies enables optimal logistics costs.

Carrier Selection Criteria: Cost per Shipment is the primary factor but should not be the only consideration. Compare rates across weight slabs and zones. Consider volumetric weight calculations (typically L x W x H / 5000). Factor in fuel surcharges, COD charges, and return handling. Serviceability must cover your pin code requirements, with priority on your top 100 pin codes by order volume. Check specific coverage for Tier 2/3 cities and remote areas. Verify pickup frequency and cut-off times for your locations.

Delivery Speed determines customer satisfaction with options ranging from same-day and next-day for metros to 2-4 days for standard delivery. Delivery promise vs actual performance varies; request 90-day delivery performance data from carriers. Express vs economy options at different price points. Reliability is measured by first-attempt delivery success rate (target 85%+), proof of delivery compliance, lost/damaged shipment rate (target less than 0.1%), and customer complaint rate.

Technology Capabilities include API integration quality (ease of integration, response times), real-time tracking accuracy, automated NDR management, and reporting and analytics dashboard. COD Management covers remittance cycle (typically 7-15 days), COD verification at doorstep, fake order detection, and digital payment options at delivery.

Rate Negotiation Strategies: Volume Commitments start with minimum guarantees of 100-500 shipments/month for startup rates. Tiered pricing improves with volume of 1000+, 5000+, and 10000+ monthly shipments. Long-term contracts of 12-24 months unlock better rates. Growth projections can be used to negotiate current rates based on future volume.

Rate Optimization Techniques: Zone-based optimization uses different carriers for different zones based on strength. Weight slab optimization consolidates orders to optimize weight slabs. Dimensional weight negotiation increases divisor from 5000 to 6000 or higher for bulky items. Fuel surcharge caps negotiate fixed fuel surcharge or caps.

Multi-Carrier Strategy: Primary Carrier handles 60-70% of volume with best overall rates. Secondary Carrier takes 20-30% for specific zones or requirements. Backup Carrier maintains for service continuity during disruptions. Smart Routing automatically allocates shipments based on cost, speed, and reliability. Aggregator platforms like Shiprocket and Pickrr enable easy multi-carrier management.

Typical Rate Ranges for E-commerce (2024): Within city ranges from Rs 35-60 per 500g, within zone Rs 45-80, adjacent zone Rs 60-120, and across country Rs 80-180. COD charges add Rs 15-35 per shipment. These rates are for moderate volumes of 1000+ monthly shipments; expect 20-30% higher for low volumes.

Contractual Considerations: Service Level Agreements should define delivery timelines, damage rates, and penalties. Insurance should have clear terms for lost/damaged shipments. Remittance Terms specify COD remittance frequency and minimum thresholds. Exit Clauses provide flexibility to switch carriers if service deteriorates. Rate Review enables annual or quarterly rate reviews based on performance.',
        '["Negotiate rates with at least 3 carriers using volume commitments and competitive benchmarks", "Implement multi-carrier strategy with primary, secondary, and backup carrier allocation rules", "Set up automated carrier allocation based on zone, weight, speed requirement, and cost", "Establish SLAs with performance metrics and regular review cadence"]'::jsonb,
        '["Carrier Evaluation Scorecard Template with weighted criteria for selection", "Rate Negotiation Playbook with tactics and benchmark rates by volume tier", "Multi-Carrier Allocation Logic Framework for smart routing", "Logistics SLA Template covering delivery timelines, damage rates, and penalties"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 28: Amazon FBA India and Marketplace Fulfillment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        28,
        'Amazon FBA India and Marketplace Fulfillment Services',
        'Marketplace fulfillment services like Amazon FBA (Fulfillment by Amazon) and Flipkart Fulfillment offer faster delivery, Prime/Assured badges, and reduced operational complexity in exchange for fees. Understanding when to use marketplace fulfillment versus self-fulfillment is crucial for profitability.

Amazon FBA India Overview: FBA allows sellers to store inventory in Amazon fulfillment centers across India. Amazon handles storage, picking, packing, shipping, and customer service. Products become Prime-eligible with 1-2 day delivery promise. Current FBA network has 60+ fulfillment centers across India with pan-India coverage.

FBA Fee Structure: Referral Fee ranges from 4-15% of selling price depending on category. FBA Fulfillment Fee comprises pick and pack of Rs 14-28 per unit plus weight handling of Rs 32-180 per kg. Storage Fee is Rs 21-35 per cubic foot per month with higher rates during festive season. Removal Fee for returning inventory is Rs 10-40 per unit. Total FBA Fees typically range from 18-30% of selling price depending on product category and size.

FBA vs Self-Fulfillment Economics: FBA Advantages include Prime badge (2-3x conversion uplift), faster delivery, reduced returns, customer service handled by Amazon, Buy Box advantage, and lower CAC due to higher conversion. Self-Fulfillment Advantages include lower per-order cost for high volume, inventory control, multi-channel fulfillment, brand packaging, and direct customer relationship.

Break-Even Analysis: For a Rs 500 product with 30% margin, FBA makes sense if Prime badge increases conversion by more than 15-20%. For higher-priced products with better margins, FBA economics improve. For low-margin products, self-fulfillment often more profitable.

FBA Best Practices: Inventory Management maintains 30-45 days of inventory based on sales velocity. Use Amazon inventory management tools for restock alerts. Avoid long-term storage fees by monitoring aged inventory. Coordinate inbound shipments to optimize placement fees.

Product Selection for FBA: High-velocity products benefit from Prime badge. Products with good margins can absorb FBA fees. Compact, lightweight products have lower fulfillment fees. Products with low return rates maximize profitability. Consider FBA for top 20% of SKUs by revenue.

Flipkart Fulfillment: Similar model to FBA with Flipkart managing fulfillment. Flipkart Assured badge for eligible products. Fee structure comparable to FBA. Strong for fashion and electronics categories.

Multi-Channel Fulfillment (MCF): Amazon MCF allows using FBA inventory for non-Amazon orders. Higher fees than standard FBA (Rs 50-100+ per order). Useful for inventory consolidation across channels. Consider for D2C orders during initial scale.

Easy Ship Alternative: Amazon picks up from seller location. Lower fees than FBA but no Prime badge. Good for sellers with own warehouse. Delivery performance depends on seller''s packaging and handover.',
        '["Analyze your product portfolio for FBA suitability - identify high-margin, fast-moving, compact products", "Calculate FBA vs self-fulfillment economics for top 20 SKUs including Prime conversion impact", "Set up FBA account and send initial inventory for test products", "Implement inventory management system for FBA restock optimization"]'::jsonb,
        '["FBA Profitability Calculator with fee breakdown and conversion impact modeling", "FBA vs Self-Fulfillment Decision Matrix by product characteristics", "FBA Inventory Management Best Practices Guide with restock strategies", "Amazon FBA Setup Checklist covering account setup, product prep, and shipment creation"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 29: Returns Management and RTO Reduction
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        29,
        'Returns Management and RTO Reduction Strategies',
        'Returns are a significant challenge for Indian e-commerce with 15-25% return rates for fashion and 5-10% for other categories. Return-to-Origin (RTO) due to delivery failures adds another 10-20% of orders. Effective returns management can save 3-5% of revenue.

Understanding Return Types: Customer-Initiated Returns happen after delivery due to product quality issues, size/fit issues (fashion), product different from expectation, changed mind, or damaged in transit. Average customer return rate: 15-25% for fashion, 8-12% for electronics, 5-8% for other categories. RTO (Return to Origin) is delivery failure due to customer not available, wrong/incomplete address, customer rejected (often fake orders), or COD refusal. Average RTO rate: 10-20% with higher in Tier 2/3 cities and COD orders.

RTO Impact Analysis: Direct Costs include forward shipping (full cost), return shipping (50-100% of forward), packaging materials, and product damage in transit (5-10% of returned items). Indirect Costs comprise blocked inventory, cash flow impact (COD), and operational overhead. Total RTO Cost is typically Rs 100-300 per order.

RTO Reduction Strategies: Address Verification uses pin code validation at checkout, Google Address autocomplete, and address quality scoring. Flag high-risk addresses for verification. IVR/WhatsApp Confirmation: Send order confirmation with address verification request, especially for COD orders. 30-40% reduction in wrong address RTO.

Fake Order Detection identifies patterns like new customer with COD and high-value order, multiple orders from same IP/device, unusual ordering times, and high-risk pin codes with history. Machine learning models for fraud scoring; block or convert to prepaid for high-risk orders.

COD to Prepaid Conversion offers prepaid discounts of Rs 50-100 to reduce COD preference. Partial prepaid where customer pays 10-20% online. Trust-building through ratings and reviews reduces COD preference. Incentivize UPI payment at doorstep.

Delivery Experience improves with real-time tracking and proactive communication, delivery slot selection by customer, and WhatsApp notifications with delivery updates.

Returns Process Optimization: Seamless Returns Experience offers easy return initiation via app/website, multiple return modes (pickup, drop-off, in-store), quick refund processing within 3-5 days, and exchange options to retain revenue. Quality Control implements inspection at return receipt, grading system for returned products, and fast restocking of saleable returns.

Recommerce Strategy: Grade A returns are restocked for full-price sale. Grade B (minor defects) go to clearance/sale section. Grade C (significant issues) go to recommerce platforms like Quikr, OLX. Unsaleable items are recycled/donated. Partnering with recommerce platforms can recover 30-70% of product value.

Return Analytics: Track return reasons by category and SKU. Identify products with high return rates. Address root causes through better product descriptions, size guides, and quality improvements. Set return rate targets by category and monitor weekly.',
        '["Implement address verification and IVR/WhatsApp confirmation for COD orders to reduce RTO", "Build fraud detection model identifying fake order patterns - block or convert high-risk orders to prepaid", "Design seamless returns experience with easy initiation, tracking, and quick refunds", "Set up recommerce channel for returned products to maximize value recovery"]'::jsonb,
        '["RTO Reduction Playbook with strategies by root cause and implementation priority", "Fraud Detection Framework for identifying fake orders with scoring model", "Returns Process Design Template covering customer experience and operations", "Recommerce Strategy Guide for maximizing value recovery from returns"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 30: Logistics Cost Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        30,
        'Logistics Cost Optimization and Warehouse Strategy',
        'Logistics cost optimization requires systematic approach across shipping rates, warehouse network design, packaging optimization, and operational efficiency. A well-optimized logistics operation can achieve 2-3% improvement in profit margins.

Warehouse Network Design: Single Warehouse Model has low fixed costs but high shipping costs and delivery times for distant customers. Suitable for early-stage with less than Rs 1 crore monthly GMV. Location should be central (typically Delhi-NCR, Mumbai, or Bangalore).

Multi-Warehouse Model uses 2-4 warehouses for regional coverage. Reduces average delivery time and shipping costs. Optimal for Rs 1-10 crore monthly GMV. Typical locations: Delhi-NCR for North, Mumbai/Pune for West, Bangalore for South, Kolkata for East.

Distributed Fulfillment uses 5+ locations including dark stores for hyperlocal delivery. Enables same-day/next-day delivery pan-India. Requires sophisticated inventory management. Suitable for Rs 10+ crore monthly GMV.

Network Optimization: Analyze order distribution by geography. Calculate total cost (shipping + warehousing) for different configurations. Consider delivery time impact on conversion. Plan network expansion with business growth.

Packaging Optimization: Right-Sizing Packaging uses minimum viable packaging dimensions. Volumetric weight directly impacts shipping costs. Invest in packaging design to minimize dead space. Category-specific packaging templates.

Material Optimization balances protection vs cost. Corrugate grade selection based on product fragility. Consider sustainable packaging (customer preference + cost). Typical packaging cost: Rs 10-30 per order.

Brand vs Cost: Brand packaging enhances unboxing experience but increases costs. Premium packaging for high-value products. Economy packaging for price-sensitive categories. A/B test packaging impact on returns and reviews.

Operational Efficiency: Pick-Pack-Ship Optimization implements batch picking for efficiency. Zone-based warehouse organization. Pack station optimization with ergonomic design. Shipping label integration for speed.

Inventory Positioning uses ABC analysis for inventory placement. Fast movers in prime pick locations. Seasonal inventory planning. Cross-docking for high-velocity items.

Technology Enablement: Warehouse Management System (WMS) provides real-time inventory visibility. Barcode/RFID for accuracy. Performance analytics. Integration with carriers. Cost: Rs 50,000-5,00,000 annually depending on features.

Logistics Analytics Dashboard: Cost per Order tracking by carrier, zone, and product category. Delivery Performance monitoring of SLA adherence and first-attempt success. Return Analytics tracking of RTO rate and customer returns. Inventory Metrics including turnover, stockouts, and aging.

Key Metrics to Optimize: Shipping Cost as Percentage of GMV should target 6-10%. RTO Rate should target less than 15%. First-Attempt Delivery should exceed 85%. Average Delivery Time should be 3-4 days pan-India. Warehouse Cost per Order should target Rs 15-30.',
        '["Design optimal warehouse network based on order geography analysis and growth projections", "Implement packaging optimization reducing volumetric weight and material costs", "Deploy WMS for inventory accuracy and operational efficiency", "Build logistics analytics dashboard tracking key metrics weekly"]'::jsonb,
        '["Warehouse Network Design Tool with cost-benefit analysis for different configurations", "Packaging Optimization Guide with material selection and design best practices", "WMS Evaluation Framework for selecting appropriate warehouse management system", "Logistics KPI Dashboard Template tracking cost, delivery, and inventory metrics"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Digital Marketing for E-commerce (Days 31-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Digital Marketing for E-commerce',
        'Master performance marketing for e-commerce growth - Meta Ads, Google Ads, SEO for e-commerce, attribution modeling, and ROAS optimization strategies for profitable customer acquisition.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 31: Performance Marketing Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        31,
        'Performance Marketing Fundamentals for E-commerce',
        'Performance marketing is the primary customer acquisition channel for Indian e-commerce brands, typically representing 30-50% of marketing spend. Understanding unit economics, attribution, and channel dynamics is essential for profitable growth.

E-commerce Marketing Funnel: Awareness (Top of Funnel) introduces brand to potential customers. Channels: Display ads, YouTube, influencer marketing. Metrics: Reach, impressions, video views. Cost: CPM Rs 50-200. Consideration (Middle of Funnel) engages interested prospects. Channels: Retargeting, email, social media. Metrics: Engagement, website visits, add to cart. Conversion (Bottom of Funnel) drives purchase. Channels: Search, shopping ads, retargeting. Metrics: Purchases, revenue, ROAS.

Key Metrics for E-commerce Marketing: Customer Acquisition Cost (CAC) equals Total Marketing Spend divided by New Customers. Benchmark varies by category: Rs 200-500 for low AOV, Rs 500-1500 for medium, Rs 1000-3000+ for high.

Return on Ad Spend (ROAS) equals Revenue divided by Ad Spend. Breakeven ROAS equals 1 divided by Gross Margin. Target ROAS typically 3-5x for sustainable growth. Blended ROAS across channels vs channel-specific ROAS.

Customer Lifetime Value (LTV) equals Average Order Value multiplied by Purchase Frequency multiplied by Customer Lifespan. LTV to CAC ratio target: 3x or higher. Critical for subscription and repeat purchase businesses.

Marketing Efficiency Ratio (MER) equals Total Revenue divided by Total Marketing Spend. Holistic view of marketing efficiency. Target: 5-10x for healthy businesses.

Channel Mix for Indian E-commerce: Meta (Facebook/Instagram) typically represents 40-60% of paid spend. Strongest for awareness and consideration. Good for visual products (fashion, beauty, home). CPM: Rs 80-200, CPC: Rs 5-20, typical ROAS: 2-4x.

Google represents 30-40% of paid spend. Search captures high-intent traffic. Shopping ads for product visibility. Display for retargeting. CPC: Rs 10-50 (search), ROAS: 3-6x.

Marketplace Ads (Amazon/Flipkart) are essential for marketplace sellers. Sponsored Products, Brands, Display. ACOS (Advertising Cost of Sale) target: 10-20%. Increasingly competitive with rising costs.

Emerging Channels include WhatsApp (broadcast, conversational commerce), YouTube Shorts, and regional language targeting on ShareChat/Moj.

Attribution Challenges: Last-Click Attribution is the default but overvalues bottom-funnel. First-Click Attribution overvalues top-funnel awareness. Data-Driven Attribution is recommended where available. Cross-Device Attribution is challenging in India''s multi-device environment. View-Through Attribution captures display and video impact.

iOS 14+ Impact: App Tracking Transparency reduced targeting accuracy. Conversion API implementation essential. Broader targeting and creative testing. Modeled conversions in reporting. First-party data increasingly valuable.',
        '["Define target CAC and ROAS by channel based on unit economics and margin structure", "Set up proper attribution tracking with UTM parameters and conversion APIs", "Establish marketing efficiency benchmarks and reporting cadence", "Audit current channel mix and identify optimization opportunities"]'::jsonb,
        '["E-commerce Marketing Metrics Framework with benchmarks by category", "Attribution Setup Guide for e-commerce covering pixel, CAPI, and UTM standards", "Channel Mix Optimization Framework for budget allocation", "Marketing Efficiency Calculator with CAC, ROAS, and LTV analysis"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 32: Meta Ads for E-commerce
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        32,
        'Meta Ads Mastery for E-commerce',
        'Meta (Facebook and Instagram) is typically the largest paid channel for Indian D2C brands. Mastering Meta ads requires understanding campaign structure, audience targeting, creative strategy, and optimization techniques.

Campaign Structure Best Practices: Campaign Level sets the objective. For e-commerce, use Sales objective (formerly Conversions). Advantage+ Shopping Campaigns increasingly effective. Budget at campaign level for flexibility.

Ad Set Level defines audience and placements. Consolidate ad sets to give algorithm more data. Broad targeting often outperforms narrow segments post-iOS 14. Use Advantage+ Placements unless data suggests otherwise.

Ad Level houses the creative. 3-5 ads per ad set for testing. Mix formats: image, video, carousel, collection. Dynamic creative for automated combinations.

Audience Strategy: Prospecting (Cold Audiences) uses broad targeting with interest stacking. Lookalike audiences from purchasers with 1-3% size. Advantage+ Audiences for algorithm-based targeting. Budget: 60-70% of spend.

Retargeting (Warm Audiences) targets website visitors with 7, 30, 60-day windows. Add to cart abandoners with highest intent. Past purchasers for cross-sell and repeat. Budget: 20-30% of spend.

Retention targets existing customers for new launches and replenishment. Budget: 10-20% of spend.

Creative Strategy for E-commerce: Video Ads are highest performing format with 15-30 second optimal length. UGC (User Generated Content) style outperforms polished. Product demonstration with clear benefits. Hook in first 3 seconds. Typical CTR: 1-3%.

Carousel Ads are great for multiple products and telling brand story. 3-5 cards optimal with strong first card. Can showcase product range or single product from multiple angles.

Collection Ads provide immersive mobile experience. Instant Experience (Canvas) for brand storytelling. Great for catalog browsing.

Dynamic Product Ads (DPA): Automatically show products based on user behavior. Essential for retargeting. Catalog setup with accurate product data. Template customization for brand consistency.

Optimization Techniques: Bid Strategy starts with lowest cost for learning phase. Switch to cost cap for scaling with predictable CPA. ROAS bidding when sufficient conversion volume. Manual bidding for advanced control.

Testing Framework: Creative testing provides 3-5 variations per ad set. Allow Rs 5,000-10,000 spend per creative before judging. Test one variable at a time (image, copy, headline). Audience testing tests broad vs interest vs lookalike. Budget testing tests CBO vs ABO. Scale winners by 20-30% daily to maintain performance.

Key Metrics: CTR target: greater than 1%, CPM benchmark: Rs 80-200, CPC target: Rs 5-20, ROAS target: 2-4x, Frequency cap: less than 3 for prospecting, less than 8 for retargeting.',
        '["Set up proper Meta pixel and Conversion API for accurate tracking", "Build campaign structure with prospecting, retargeting, and retention segments", "Create creative testing framework with 5+ variations per audience", "Implement scaling strategy for winning campaigns"]'::jsonb,
        '["Meta Ads Campaign Structure Template for e-commerce", "Creative Testing Framework with variation ideas and measurement approach", "Audience Building Playbook covering prospecting and retargeting strategies", "Meta Ads Optimization Checklist for weekly and monthly review"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 33: Google Ads for E-commerce
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        33,
        'Google Ads for E-commerce Success',
        'Google Ads captures high-intent traffic at the moment of search, making it essential for e-commerce conversion. Google Shopping, Search, and Performance Max campaigns drive bottom-funnel conversions with strong ROAS.

Google Ads Campaign Types for E-commerce: Performance Max (PMax) is Google''s AI-driven campaign type using all Google inventory (Search, Shopping, Display, YouTube, Discovery, Gmail). Asset-based creative input with Google optimizing placements. Requires conversion data for optimization. Increasingly default choice for e-commerce. Budget recommendation: Rs 1,000+/day for learning.

Google Shopping showcases products with images, prices, and reviews in search results. Requires Merchant Center setup with product feed. Standard Shopping allows more control over bidding. Smart Shopping merged into PMax but some features remain. Essential for product visibility.

Search Ads are text ads on search results. High intent keywords drive conversions. Brand keywords for defense and efficiency. Non-brand for customer acquisition. Dynamic Search Ads for catalog coverage.

Display and YouTube are primarily for retargeting and awareness. Lower direct ROAS but supports full funnel. Responsive Display Ads for reach.

Google Merchant Center Setup: Product Feed Requirements include title (brand + product name + key attributes), description (detailed, keyword-rich), image (white background, high quality), price (accurate, matching website), availability (real-time sync), and GTIN/MPN (where applicable).

Feed Optimization: Title optimization includes keywords at beginning, brand name, and key attributes. Image optimization uses multiple images with lifestyle shots. Price competitiveness affects Shopping ranking. Product ratings enable review collection.

Feed Management: Manual upload for small catalogs. Automated feed via Shopify/WooCommerce plugins. Feed management tools like DataFeedWatch and Feedonomics. Supplemental feeds for additional attributes.

Keyword Strategy for E-commerce: Brand Keywords have lowest CPA with high conversion rate. Defend against competitors. Typically 5-10% of spend.

Non-Brand Keywords require category, product, and problem-based keywords. Higher CPA but essential for growth. Long-tail keywords for efficiency.

Competitor Keywords involve bidding on competitor brand names. Higher CPC, lower quality score. Use strategically for conquest.

Match Types: Broad Match works with smart bidding for volume. Phrase Match provides balanced control. Exact Match offers precision but limited scale.

Bidding Strategies: Target ROAS sets return target with Google optimizing bids. Requires 15-30 conversions in 30 days. Recommended for mature campaigns.

Maximize Conversions is good for learning phase. Transitions to Target CPA/ROAS with data.

Manual CPC provides maximum control. Time-intensive but valuable for learning.

Google Ads Benchmarks for Indian E-commerce: Search CPC is Rs 15-50 for non-brand, Rs 5-15 for brand. Shopping CPC ranges from Rs 8-30. Search ROAS target is 3-6x. Shopping ROAS target is 4-8x. Performance Max ROAS target is 3-5x.',
        '["Set up Google Merchant Center with optimized product feed", "Build campaign structure with Performance Max, Shopping, and Search campaigns", "Implement keyword strategy covering brand, non-brand, and competitor terms", "Optimize bidding strategy based on conversion volume and ROAS targets"]'::jsonb,
        '["Google Merchant Center Setup Guide with feed optimization checklist", "Google Ads Campaign Structure Template for e-commerce", "Keyword Research Framework for e-commerce with category examples", "Google Ads Bidding Strategy Guide with transition recommendations"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 34: SEO for E-commerce
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        34,
        'E-commerce SEO Strategy',
        'SEO drives 20-40% of e-commerce traffic at zero marginal cost. For Indian e-commerce, SEO is particularly valuable given the high cost of paid acquisition. A well-executed SEO strategy compounds over time, reducing dependency on paid channels.

E-commerce SEO Architecture: Site Structure follows Homepage to Category to Sub-Category to Product hierarchy. Flat architecture with products within 3 clicks of homepage. Logical URL structure reflecting hierarchy. Internal linking distributes authority.

URL Structure should use yourdomain.com/category/subcategory/product-name. Include keywords in URLs. Avoid parameters and session IDs. Implement canonical tags for duplicate content.

Technical SEO Foundation: Page Speed is a critical ranking factor. Target Core Web Vitals: LCP less than 2.5s, FID less than 100ms, CLS less than 0.1. Image optimization with lazy loading and WebP format. CDN for static assets.

Mobile Optimization is essential given India''s 80%+ mobile e-commerce. Responsive design with mobile-first approach. Touch-friendly elements and fast mobile load times.

Crawlability uses XML sitemap including product pages. Robots.txt configuration and proper use of noindex and nofollow. Internal linking for crawl efficiency.

Schema Markup: Product Schema shows price, availability, and reviews in search. Organization Schema provides brand information. Breadcrumb Schema aids navigation display. FAQ Schema provides additional SERP real estate.

Keyword Strategy for E-commerce: Category Pages target category + modifier keywords like "women''s running shoes" and "formal shirts for men". High volume, high competition. Target top 50-100 category keywords.

Product Pages target long-tail product-specific keywords like "Nike Air Max 270 black size 10". Lower volume, higher conversion. Unique content per product.

Blog/Content targets informational keywords like "how to choose running shoes" and "formal shirt styling tips". Top-of-funnel traffic. Links to product pages.

On-Page Optimization: Title Tags should include primary keyword + brand with 50-60 characters. Example: "Women''s Running Shoes | Nike, Adidas & More | YourBrand".

Meta Descriptions should have compelling copy with USP in 150-160 characters. Include pricing or offers where relevant.

H1 Tags need unique H1 per page with primary keyword.

Product Descriptions require unique descriptions of 200+ words. Include keywords naturally with features and benefits. User-generated content (reviews) for freshness.

Image Optimization uses descriptive file names and alt text. Compressed images in WebP format. Multiple images improve engagement.

Category Page Optimization: Content adds 200-500 words of category description. Internal links to related categories and products. Filters that do not create duplicate content. Pagination with proper handling (rel=next/prev or load more).

Link Building for E-commerce: Content Marketing involves creating guides, comparisons, and how-to content. Earns natural backlinks over time.

PR and Media Coverage targets news coverage for launches and milestones. Brand mentions convert to links.

Influencer Collaborations include product reviews with backlinks.

Supplier and Partner Links come from manufacturers, distributors, and partners. Be featured in their directories.',
        '["Conduct technical SEO audit addressing Core Web Vitals, mobile experience, and crawlability", "Implement schema markup for products, organization, and breadcrumbs", "Develop keyword strategy for category pages, product pages, and content", "Create content plan targeting informational keywords with links to products"]'::jsonb,
        '["E-commerce Technical SEO Checklist covering speed, mobile, and crawlability", "Schema Markup Implementation Guide for e-commerce with code examples", "E-commerce Keyword Research Framework with volume and intent mapping", "Content Strategy Template for e-commerce linking information to product pages"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 35: Attribution and ROAS Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        35,
        'Attribution Modeling and ROAS Optimization',
        'Attribution determines how credit for conversions is assigned across marketing touchpoints. With Indian customers often requiring 5-10+ touchpoints before purchase, proper attribution is essential for accurate ROAS measurement and budget allocation.

Attribution Models: Last-Click Attribution gives 100% credit to final touchpoint. Default in most platforms. Overvalues retargeting and brand search. Easy to implement but incomplete picture.

First-Click Attribution gives 100% credit to first touchpoint. Overvalues awareness channels. Useful for understanding discovery.

Linear Attribution gives equal credit across all touchpoints. Simple but may not reflect true impact.

Time-Decay Attribution gives more credit to touchpoints closer to conversion. Balances full-funnel view.

Position-Based (U-Shaped) Attribution gives 40% to first, 40% to last, 20% distributed across middle. Acknowledges discovery and conversion importance.

Data-Driven Attribution uses machine learning to determine credit. Available in Google Ads and GA4. Requires significant conversion volume. Recommended when data sufficient.

Attribution Implementation: Google Analytics 4 Setup requires enhanced e-commerce tracking. Attribution settings configuration for default model selection. Cross-domain tracking for multiple properties.

UTM Parameter Standards: utm_source (google, facebook, email), utm_medium (cpc, organic, email), utm_campaign (specific campaign name), utm_content (ad creative or link variation), utm_term (keyword for search). Consistent naming convention essential.

Conversion API Implementation: Server-side tracking for accurate data. Facebook Conversion API, Google Enhanced Conversions. Mitigates iOS 14+ tracking loss.

ROAS Optimization Strategies: Channel-Level Optimization involves reallocating budget to highest ROAS channels. Consider incrementality, not just ROAS. Test budget shifts to measure true impact.

Campaign-Level Optimization: Pause underperforming campaigns. Scale winners gradually (20-30% per day). Test new audiences and creatives.

Audience-Level Optimization: Compare ROAS across audience segments. Adjust bids or targeting for segments. Exclude low-value segments.

Creative-Level Optimization: Identify top-performing creatives. Iterate on winning concepts. Retire fatigued creatives.

Incrementality Testing: Holdout Tests withhold marketing from random sample. Compare conversion rate vs exposed group. Measure true incremental impact.

Geo Testing tests increased spend in specific regions. Compare vs control regions. Useful for budget allocation decisions.

Marketing Mix Modeling (MMM) is a statistical analysis of channel impact on sales. Accounts for offline and external factors. Useful for strategic planning.

Target ROAS by Stage: Early Stage (less than Rs 50L/month GMV) targets 2-3x ROAS with focus on growth. Growth Stage (Rs 50L-5Cr GMV) targets 3-4x ROAS balancing growth and efficiency. Scale Stage (Rs 5Cr+ GMV) targets 4-5x+ ROAS with focus on profitability.',
        '["Implement proper attribution tracking with UTM standards and Conversion APIs", "Select appropriate attribution model based on business stage and data availability", "Set up incrementality testing framework for major channels", "Build ROAS optimization process with weekly review and adjustment cadence"]'::jsonb,
        '["Attribution Model Comparison Guide with recommendations by business type", "UTM Parameter Standard Template with naming conventions", "Incrementality Testing Framework with holdout and geo test methodologies", "ROAS Optimization Playbook with channel, campaign, and creative optimization tactics"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Consumer Protection Act Compliance (Days 36-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Consumer Protection Act Compliance',
        'Navigate Consumer Protection (E-Commerce) Rules 2020 - mandatory disclosures, return and refund policies, FDI regulations for e-commerce, MRP and pricing requirements, and grievance redressal mechanisms.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 36: Consumer Protection E-Commerce Rules 2020
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        36,
        'Consumer Protection (E-Commerce) Rules 2020',
        'The Consumer Protection (E-Commerce) Rules 2020, notified in July 2020, established comprehensive regulations for e-commerce entities in India. These rules aim to protect consumer interests and create a fair marketplace. Non-compliance can result in significant penalties and reputational damage.

Applicability: Rules apply to all goods and services bought or sold over digital or electronic networks. Covers all e-commerce entities whether registered in India or abroad but systematically offering goods/services to consumers in India. Includes both marketplace e-commerce entities and inventory e-commerce entities.

Definition of E-Commerce Entity Types: Marketplace E-Commerce Entity provides an IT platform on a digital and electronic network to facilitate transactions between buyers and sellers. Does not own inventory. Examples: Amazon, Flipkart marketplace model, Meesho.

Inventory E-Commerce Entity owns the inventory of goods or services and sells such goods or services directly to consumers. D2C brands selling on their own websites. Single-brand retail with own inventory.

Key Obligations for All E-Commerce Entities: Entity Information Display must include legal name of e-commerce entity, principal geographic address of headquarters and all branches, name and details of website, email address, and contact details including phone number.

Appointment of Officers: Nodal Contact Person for 24x7 consumer grievance redressal. Resident Grievance Officer to acknowledge complaints within 48 hours. Senior Designated Officer to ensure compliance.

Consumer Information Requirements: Clear and accessible terms of use. Privacy policy and terms of use to be provided in Indian languages. Return, refund, exchange, warranty and guarantee policies. Information on available payment methods. Complaint mechanism for resolution.

Marketplace-Specific Obligations: Require sellers to provide details including name of seller, address, customer care, and returns policy. Ensure no seller exercises control over inventory with platform controlling more than 25% of purchases. Prohibit any form of unfair trade practice. Maintain records of relevant information for 24 months from date of transaction.

Seller Information Requirements on Marketplace: Every seller must provide: Legal name, address, and principal geographic location. Customer care number. Rating or feedback mechanism. Details of importer for imported goods. Guarantee and warranty information. Country of origin for all products. Expiry date for products where applicable.

Product Information Requirements: Description of goods/services with features. Total price including all charges and taxes. Mode of payment. Date of delivery/provision of service. Information on available payment methods. Grievance redressal mechanism.

Recent Amendments (2023): Flash Sales conducted by platform or its related party sellers prohibited. Fall-back liability introduced for marketplace platforms. Affiliated entities cannot list on marketplace. Increased disclosure requirements.',
        '["Audit your e-commerce platform against all E-Commerce Rules 2020 requirements", "Appoint required officers: Nodal Person, Grievance Officer, Compliance Officer", "Implement seller verification process ensuring all required information is collected", "Display all mandatory disclosures on website including entity details and policies"]'::jsonb,
        '["E-Commerce Rules 2020 Compliance Checklist covering all provisions", "Officer Appointment Requirements Guide with role descriptions and qualifications", "Seller Onboarding Compliance Template with required information fields", "Mandatory Website Disclosures Template with placement guidance"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 37: Return, Refund, and Cancellation Policies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        37,
        'Designing Compliant Return and Refund Policies',
        'Return and refund policies are central to consumer protection in e-commerce. Consumer Protection Act 2019 and E-Commerce Rules mandate clear, accessible policies. Well-designed policies balance consumer rights with business sustainability.

Legal Requirements: Clear Display: Return, refund, and exchange policies must be prominently displayed. Accessible before purchase (not hidden in terms). In simple, clear language. Available in Indian languages where applicable.

No False Representations: Cannot advertise returns if not offering. Policy must be honored as stated. Changes communicated clearly in advance. No unfair conditions restricting returns.

Reasonable Period: No mandatory minimum return period specified in law. Industry standard: 7-30 days. Longer periods for electronics and appliances. Can vary by product category.

Refund Timeline: Refund within reasonable time as per stated policy. Industry standard: 5-7 days for prepaid, 7-15 days for COD. Bank processing may add 5-7 days.

Designing Return Policy: Category-Based Returns: Fashion typically has a 15-30 day return window for size/fit issues with try-and-return options and free returns increasing conversion. Electronics typically have a 7-15 day return window with stricter condition requirements and may require original packaging. Beauty and Personal Care often have no returns due to hygiene (opened products) but quality issue exchanges allowed with sealed product returns accepted. Perishables and Food typically have no returns but replacement for quality issues within 24-48 hours.

Return Condition Requirements: Unused condition with tags attached. Original packaging requirement. Proof of purchase verification. Quality check before refund.

Return Modes: Scheduled Pickup is most convenient for customers. Self-Ship with prepaid return label. Drop-Off at designated locations. In-Store Returns for omnichannel players.

Refund Methods: Original Payment Method is preferred for prepaid orders. Store Credit can be offered as option with incentive. Exchange Option retains revenue while satisfying customer. Partial Refund applies for damaged or used items.

Cancellation Policy: Order Cancellation allows free cancellation before shipping. Cancellation window typically 30 minutes to 2 hours. Refund to original payment method in 5-7 days.

RTO and Delivery Cancellation: If customer refuses delivery, treat as return. COD refusal handling and fraud detection. Multiple cancellation flagging.

Exchange Policy: Exchange vs Return: Exchanges retain revenue. Encourage exchange over refund. Size/color exchange within category. Price adjustment for different products.

Documentation and Display: Website Placement should have dedicated policy page linked from footer. Summary on product pages. Clear call-out during checkout. Confirmation email includes policy link.

Policy Language: Simple, clear language without legal jargon. Bullet points for easy reading. FAQs addressing common questions. Contact information for queries.',
        '["Design category-specific return policies balancing consumer protection and business needs", "Implement clear refund timeline commitment (5-7 days recommended)", "Create prominent policy display on website with pre-purchase visibility", "Set up exchange encouragement flow to retain revenue from returns"]'::jsonb,
        '["Return Policy Template with category-specific provisions", "Refund Process Flowchart covering different scenarios", "Policy Display Best Practices Guide with website placement examples", "Exchange vs Return Optimization Strategy for revenue retention"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 38: FDI Policy for E-commerce
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        38,
        'FDI Policy for E-commerce in India',
        'Foreign Direct Investment (FDI) policy for e-commerce in India is complex and has significant implications for business model design. Understanding these regulations is critical for any e-commerce venture seeking foreign investment.

FDI Policy Framework: Press Note 2 (2018) is the primary governing regulation. FDI up to 100% under automatic route for marketplace model. FDI prohibited in inventory-based B2C e-commerce. Regular clarifications issued by DPIIT.

Marketplace vs Inventory Model: Marketplace Model (FDI Permitted): Platform facilitates transactions between buyers and sellers. Does not own inventory of goods sold. Revenue from commission, listing fees, advertising. Examples: Amazon, Flipkart as marketplace.

Inventory Model (FDI Prohibited for Multi-Brand): Company owns and sells inventory directly to consumers. Single-brand retail permitted with conditions. Multi-brand retail with FDI prohibited in e-commerce. D2C brands owned by foreign entities face restrictions.

Key FDI Policy Restrictions: Entity-Level Restrictions prohibit FDI-backed marketplace from holding inventory. Cannot influence pricing of products sold. Cannot offer differential treatment to sellers.

Seller-Level Restrictions: No seller can have more than 25% of marketplace sales. Group companies of marketplace cannot sell as sellers. Vendor agreements must be on arm''s length basis.

Exclusive Arrangements: No exclusive partnerships for products. Cannot mandate sellers to sell exclusively. Back-to-back exclusive agreements prohibited.

Deep Discounting: Marketplace cannot influence seller pricing. Cash-back and discount funding scrutinized. Promotional activities must be non-discriminatory.

Compliance Structure for FDI-Backed E-commerce: Marketplace Operations: Maintain clear separation between marketplace and sellers. Document arm''s length pricing for services. Monitor seller concentration (less than 25% threshold). Avoid exclusive arrangements.

Group Company Transactions: If group company sells on platform, ensure less than 25% threshold. Pricing must be market-competitive. Preferential treatment prohibited.

Inventory Handling: Just-in-time arrangements scrutinized. Fulfillment services acceptable but ownership transfer critical. Clear documentation of inventory ownership.

Implications for Indian Startups: Fundraising Considerations: FDI policy impacts business model for foreign-funded companies. Marketplace model preferred for VC-backed startups. Inventory model limits fundraising options.

Structuring Options: Pure marketplace with third-party sellers. Hybrid with owned brands under 25% threshold. Single-brand retail for owned brands with FDI.

Recent Developments and Enforcement: Increased scrutiny on marketplace operations. CCI investigations into preferential treatment. Policy changes anticipated for B2B and exports. State-level enforcement variations.',
        '["Assess current business model for FDI policy compliance", "Implement seller concentration monitoring ensuring no seller exceeds 25%", "Document arm''s length basis for all group company transactions", "Design compliance processes for exclusive arrangement and pricing policies"]'::jsonb,
        '["FDI Policy for E-commerce Comprehensive Guide with Press Note 2 analysis", "Marketplace vs Inventory Model Compliance Checklist", "Seller Concentration Monitoring Framework with threshold alerts", "FDI Compliance Documentation Requirements for audit readiness"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 39: MRP, Pricing, and Advertising Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        39,
        'MRP, Pricing, and Advertising Compliance',
        'E-commerce pricing and advertising are regulated under multiple laws including Legal Metrology Act, Consumer Protection Act, and ASCI guidelines. Non-compliance can result in penalties, product seizure, and reputational damage.

Legal Metrology Act and MRP: MRP Requirement: Maximum Retail Price (MRP) mandatory on all pre-packaged commodities. MRP is the maximum price including all taxes. Selling above MRP is illegal offense. Penalty: Up to Rs 25,000 for first offense.

E-commerce MRP Display: Must display MRP clearly on product page. Cannot sell above MRP even during scarcity. MRP inclusive of all taxes (GST included).

Discount Representation: Discount must be from actual MRP. Cannot inflate MRP to show higher discount. "Compare at" pricing must reflect genuine original price. Documentation of original pricing required.

Online Display Requirements: Net quantity of commodity. Name and address of manufacturer/packer/importer. Country of origin for imported goods. Month and year of manufacture or packing. Expiry date or use by date for applicable products.

Consumer Protection Act 2019 - Unfair Trade Practices: False Representation: Misleading quality claims. False country of origin. Fake reviews or testimonials. Manipulated ratings.

Deceptive Practices: Bait and switch tactics. Hidden charges at checkout. Fake scarcity ("Only 2 left"). Countdown timers for artificial urgency.

Advertising Standards (ASCI Guidelines): General Principles: Advertisements must be truthful and honest. Not misleading by omission or ambiguity. Substantiation required for claims. Respect for consumer intelligence.

E-commerce Specific: Price claims must be accurate and current. "Sale" claims require genuine reduction from regular price. Stock availability claims must be accurate. Delivery promises must be achievable.

Influencer Advertising: Mandatory disclosure of paid partnerships. "Ad" or "Sponsored" label required. Material connection must be disclosed. Platform compliance for influencer content.

Dark Patterns (Prohibited Practices): Confirm Shaming uses guilt to influence decisions. Forced Action requires unrelated action to proceed. Subscription Trap makes cancellation difficult. Interface Interference highlights certain choices. Bait and Switch advertises one product and substitutes another. Drip Pricing hides charges until checkout. Disguised Advertisement presents ads as content. Nagging persistent repetition to achieve action.

Implementation Compliance: Pricing Compliance should implement MRP validation in catalog management. Regular audit of discount representations. Document pricing history for substantiation.

Advertising Compliance: Review all ad creatives before publication. Substantiation file for claims. Influencer disclosure guidelines. Regular ASCI guidelines review.

Checkout Compliance: All charges visible before checkout. No hidden fees at final step. Clear delivery timeline representation.',
        '["Implement MRP validation in product catalog ensuring all products display accurate MRP", "Audit discount representations for genuine original pricing documentation", "Create influencer disclosure guidelines and enforce across partnerships", "Review website and ads for dark patterns and eliminate prohibited practices"]'::jsonb,
        '["MRP Compliance Checklist for e-commerce with Legal Metrology Act requirements", "ASCI Guidelines Summary for e-commerce advertising compliance", "Influencer Disclosure Guidelines Template with required disclosure formats", "Dark Patterns Audit Checklist for website and app review"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 40: Grievance Redressal and Dispute Resolution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        40,
        'Grievance Redressal and Consumer Dispute Resolution',
        'E-Commerce Rules 2020 mandate comprehensive grievance redressal mechanisms. Consumer Protection Act 2019 established new Consumer Commissions with enhanced jurisdiction. Effective grievance handling prevents escalation and maintains customer trust.

Mandatory Grievance Redressal Framework: Required Officers: Nodal Contact Person for 24x7 availability to regulatory authorities. Grievance Officer (resident in India) to receive and acknowledge complaints within 48 hours. Chief Compliance Officer for overall compliance oversight.

Acknowledgment Requirement: Acknowledge receipt of complaint within 48 hours. Unique ticket number for tracking. Expected resolution timeline communication.

Resolution Timeline: Redress complaint within one month from receipt. Document all communication and actions. Escalation path if unresolved.

Complaint Channels: Website complaint form prominently displayed. Email for written complaints. Phone support with call logging. Chat support with transcript retention.

Building Effective Grievance System: Intake Process: Easy-to-find complaint submission. Minimal information required to initiate. Category selection for routing. Confirmation with ticket number.

Triage and Routing: Severity classification based on issue type. Auto-routing to appropriate team. SLA assignment based on category. Escalation triggers for VIP customers.

Resolution Process: First-response within 24 hours. Regular updates during resolution. Multiple resolution options offered. Confirmation of resolution and satisfaction check.

Documentation: Complete interaction history. Resolution details and timeline. Customer feedback captured. Audit trail for regulatory compliance.

Consumer Dispute Resolution Forums: District Consumer Disputes Redressal Forum handles claims up to Rs 1 crore. State Consumer Disputes Redressal Commission handles claims Rs 1 crore to Rs 10 crore. National Consumer Disputes Redressal Commission handles claims above Rs 10 crore. E-Filing portal at edaakhil.nic.in.

Pre-Litigation Options: Internal Grievance Resolution is the first step. Mediation through authorized centers. National Consumer Helpline 1915 for assistance. Online Consumer Complaint Portal at consumerhelpline.gov.in.

Responding to Consumer Forum Complaints: Response Timeline is 30-45 days from notice. Documentation Requirements include purchase records, communication history, and resolution attempts. Representation either by authorized representative or advocate. Settlement offered at any stage can close case.

Best Practices: Proactive Resolution is cheaper than escalation. Document Everything for regulatory audit trail. Empower Front-Line Staff to resolve within limits. Learn from Complaints to identify systemic issues. Regular Training on consumer rights and resolution.

Key Metrics: First Response Time should be under 24 hours. Resolution Time should be under 7 days average. Resolution Rate should exceed 90% internal resolution. Escalation Rate should be less than 5% to external forums. Customer Satisfaction post-resolution should be above 4/5 stars.',
        '["Establish grievance redressal infrastructure with required officers and systems", "Implement 48-hour acknowledgment and 30-day resolution SLA tracking", "Create escalation matrix for complex cases with executive involvement triggers", "Build grievance analytics to identify systemic issues and improve products/services"]'::jsonb,
        '["Grievance Redressal System Setup Guide with officer requirements and system specifications", "Complaint Handling SOP Template covering intake, triage, resolution, and closure", "Consumer Forum Response Playbook for handling escalated complaints", "Grievance Analytics Framework for identifying improvement opportunities"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Customer Experience & Retention (Days 41-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Customer Experience & Retention',
        'Build customer loyalty and maximize lifetime value - CRM implementation, loyalty programs, WhatsApp commerce, retention marketing, and personalization strategies for Indian e-commerce.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 41: CRM for E-commerce
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        41,
        'CRM Implementation for E-commerce',
        'Customer Relationship Management (CRM) is the backbone of e-commerce retention strategy. A well-implemented CRM enables personalized marketing, customer service excellence, and data-driven decision making. For Indian e-commerce, CRM helps navigate the diverse customer base across demographics and geographies.

CRM for E-commerce: Core Functions: Customer Data Management centralizes all customer interactions across touchpoints, including purchase history, browsing behavior, and support interactions with a unified customer profile.

Marketing Automation enables email marketing with segmentation, triggered campaigns based on behavior, lifecycle marketing automation, and A/B testing for optimization.

Customer Service integrates support ticket management, multi-channel support (email, chat, phone, social), knowledge base and self-service, and SLA tracking and escalation.

Analytics and Reporting provide customer segmentation, cohort analysis, lifetime value tracking, and campaign performance.

CRM Platform Options for E-commerce: Enterprise (Rs 1 lakh+/month): Salesforce Commerce Cloud offers comprehensive features with high customization but is expensive and complex. Adobe Experience Cloud provides strong personalization but requires significant implementation.

Mid-Market (Rs 20,000-1 lakh/month): HubSpot has good marketing automation and is easy to use but is limited for large catalogs. Zoho CRM is cost-effective and India-friendly with good integration options.

E-commerce Specific (Rs 5,000-50,000/month): Klaviyo is purpose-built for e-commerce with excellent Shopify integration. Omnisend offers good multi-channel marketing with affordable pricing. WebEngage is India-focused with strong mobile engagement.

SMB (Rs 2,000-20,000/month): Freshdesk offers good support features and India-based support. Mailchimp has basic CRM with email focus.

Customer Data Platform (CDP): Purpose is to unify customer data from all sources and create single customer view. Key Features include identity resolution (matching customers across devices/channels), real-time data sync, audience segmentation, and data activation for marketing platforms.

Popular CDPs: Segment is a leader in data infrastructure but expensive. mParticle is strong for mobile apps. RudderStack is an open-source alternative. Clevertap is India-based with strong mobile focus.

CRM Implementation Best Practices: Data Integration: Connect all data sources including e-commerce platform, website, mobile app, and support. Real-time sync for transactional data. Historical data migration for existing customers.

Segmentation Framework uses RFM (Recency, Frequency, Monetary), lifecycle stage (new, active, at-risk, churned), demographics and geography, and behavioral segments (browsers, buyers, advocates).

Privacy Compliance: DPDP Act requirements for data handling. Consent management for marketing. Data retention and deletion policies. Customer data access requests.',
        '["Select CRM platform based on business size, budget, and integration requirements", "Implement data integration connecting e-commerce platform, website, and support systems", "Build customer segmentation framework using RFM and lifecycle stages", "Establish data privacy compliance with consent management and retention policies"]'::jsonb,
        '["CRM Platform Comparison Matrix for e-commerce with pricing and feature analysis", "CRM Implementation Checklist covering data integration and configuration", "Customer Segmentation Framework Template with segment definitions and use cases", "CRM Privacy Compliance Guide covering DPDP Act requirements"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 42: Loyalty Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        42,
        'Designing Effective Loyalty Programs',
        'Loyalty programs increase customer retention and lifetime value. For Indian e-commerce, well-designed loyalty programs can increase repeat purchase rate by 20-30% and customer lifetime value by 25-50%. Program design must balance customer value with financial sustainability.

Loyalty Program Models: Points-Based Programs earn points per rupee spent (typical: 1 point per Rs 10-50). Points redeemable for discounts or products. Easy to understand, high engagement. Examples: Tata Neu Points, Flipkart SuperCoins.

Tiered Programs have bronze, silver, gold, platinum progression. Higher tiers get better benefits. Creates aspiration and status. Encourages spending to maintain tier. Examples: Nykaa Privé, Myntra Insider.

Paid Membership Programs involve annual fee for premium benefits. Strong commitment from members. Higher lifetime value from members. Examples: Amazon Prime, Flipkart Plus, Swiggy One.

Cash-Back Programs give direct money back on purchases. Simple value proposition. Can be percentage or flat. Popular with price-sensitive customers.

Program Design Elements: Earning Structure defines points per rupee or percentage back. Bonus points for specific behaviors (reviews, referrals). Multipliers for premium products or categories. Birthday and anniversary bonuses.

Redemption Structure sets minimum redemption threshold. Partial payment with points plus cash. Points expiry policy (typical: 6-12 months). Exclusive redemption options (early access, limited products).

Tier Benefits for Entry Tier include basic points earning, birthday bonus, and members-only communication. Mid Tier adds enhanced points earning (1.5-2x), free shipping, and early access to sales. Top Tier provides best points earning (2-3x), priority customer service, exclusive products, and personal shopping assistance.

Indian Market Considerations: Price Sensitivity means cash-equivalent benefits resonate strongly. Simple, clear value proposition preferred. Instant gratification vs delayed rewards.

Mobile-First Design: App-based loyalty experience. WhatsApp integration for engagement. Digital loyalty cards and tracking.

Cultural Factors: Festival bonus points during Diwali and other occasions. Family sharing options. Vernacular communication.

Program Economics: Cost Considerations: Typical loyalty cost of 2-5% of revenue. Points liability on balance sheet. Breakage (unredeemed points) typically 20-30%. ROI timeline of 12-24 months.

Success Metrics: Enrollment Rate should target 30-50% of customers. Active Rate of enrolled members should exceed 40%. Redemption Rate should target 60-80%. Lift in purchase frequency should be 15-30%. Lift in AOV should be 10-20%.',
        '["Define loyalty program model (points/tier/membership) based on customer base and economics", "Design earning and redemption structure balancing customer value and financial sustainability", "Build tier benefits structure creating clear progression and value at each level", "Implement program tracking with enrollment, engagement, and ROI metrics"]'::jsonb,
        '["Loyalty Program Model Comparison with pros and cons of each approach", "Loyalty Program Economics Calculator modeling costs and ROI", "Tier Benefits Design Framework with benefit ideas and cost estimates", "Loyalty Program Launch Playbook covering communication and enrollment strategy"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 43: WhatsApp Commerce
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        43,
        'WhatsApp Commerce for E-commerce',
        'WhatsApp is India''s dominant messaging platform with 500+ million users. WhatsApp Business and WhatsApp Commerce are transforming how Indian consumers shop, with 80%+ open rates and 30-40% click rates making it the most effective direct communication channel.

WhatsApp Business Platform: WhatsApp Business App is free and suitable for small businesses. Handles up to 5,000 contacts. Business profile with catalog, quick replies, and labels.

WhatsApp Business API is for medium to large businesses. Unlimited contacts with automated messaging. Integration with CRM, e-commerce platforms, and chatbots. Cost: Rs 0.50-1.50 per conversation based on type.

WhatsApp Commerce Features: Product Catalog displays up to 500 products with images, descriptions, and prices. Customers browse within WhatsApp. Links to website for checkout.

Shopping Cart and Checkout: Customers add items to cart. Can share cart for order placement. Payment via UPI or linked payment methods.

Order Updates: Automated order confirmation and shipping updates. Delivery notifications with tracking. Post-delivery feedback collection.

Use Cases for E-commerce: Customer Acquisition: Click-to-WhatsApp ads from Meta. Product inquiries with instant response. Catalog sharing for discovery. Lead capture for high-consideration products.

Customer Support: Real-time query resolution. Order status inquiries. Returns and refund processing. Complaint handling with rich media.

Retention Marketing: Abandoned cart recovery with 20-30% recovery rate. Restock reminders and replenishment. New launch announcements. Personalized offers based on purchase history.

Transactional Communications: Order confirmation and invoices. Shipping and delivery updates. Payment reminders for COD. Feedback and review requests.

Implementation Approach: BSP (Business Solution Provider) Selection provides access to WhatsApp Business API. Popular BSPs: Gupshup, Kaleyra, Twilio, Wati, AiSensy. Consider: pricing, features, support, and integration options.

Integration Requirements: E-commerce platform integration for order data. CRM integration for customer context. Payment gateway for checkout. Chatbot platform for automation.

Template Message Approval: WhatsApp requires pre-approval for outbound messages. Categories: utility, authentication, marketing. Approval takes 24-48 hours. Follow guidelines to avoid rejection.

Chatbot Implementation: Automated responses for common queries. Order status lookup. Product recommendations. Human handoff for complex issues.

Compliance and Best Practices: Consent Requirements must have explicit opt-in for marketing messages. Easy opt-out mechanism and message frequency limits.

Message Quality: Relevant, personalized content. Rich media (images, videos, documents). Clear call-to-action. Respect timing (avoid late night).

Cost Management: Optimize conversation initiation. Use session messages efficiently. Template message cost awareness. Track ROI by use case.',
        '["Select WhatsApp BSP based on features, pricing, and integration capabilities", "Implement transactional message flows: order confirmation, shipping, delivery", "Build abandoned cart recovery automation with personalized product reminders", "Create chatbot for common queries: order status, returns, product information"]'::jsonb,
        '["WhatsApp BSP Comparison Guide with pricing and feature analysis", "WhatsApp Message Template Library with pre-approved template examples", "WhatsApp Commerce Implementation Checklist covering setup and integration", "WhatsApp Chatbot Design Framework for e-commerce use cases"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 44: Retention Marketing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        44,
        'Retention Marketing Strategies',
        'Retention marketing costs 5-7x less than acquisition and drives disproportionate revenue. For Indian e-commerce, repeat customers typically represent 30-50% of revenue. Building systematic retention programs is essential for sustainable profitability.

Lifecycle Marketing Framework: New Customer Onboarding (Days 0-30): Welcome series (email/WhatsApp) introducing brand and benefits. First purchase follow-up checking satisfaction. Second purchase incentive to establish habit. Education content about products and usage.

Active Customer Engagement (Days 30-180): Regular engagement maintaining connection. Cross-sell and upsell based on purchase history. Loyalty program engagement. Festival and occasion marketing.

At-Risk Prevention (Days 180-365): Re-engagement campaigns for declining engagement. Win-back offers before churn. Feedback collection to understand issues. Personalized incentives based on history.

Churned Customer Revival (Days 365+): We-miss-you campaigns with strong offers. New product announcements. Lapsed customer survey. Last resort offers before suppression.

Email Marketing for Retention: Automated Flows: Welcome Series typically has 3-5 emails with brand story, product education, and first purchase incentive. Open rate: 40-60%. Abandoned Cart has 2-3 emails at 1hr, 24hr, and 48hr with product reminder and urgency. Recovery rate: 10-15%. Post-Purchase has order confirmation, shipping updates, review request, and cross-sell. Browse Abandonment targets viewed-but-not-purchased with personalized recommendations. Replenishment reminds about consumable products when due for restock.

Campaign Emails: New launches and collections. Sale and promotional announcements. Content and education. Festival and occasion campaigns.

Email Best Practices: Segmentation based on behavior and preferences. Personalization with name, product recommendations, and dynamic content. Mobile optimization given 70%+ mobile opens. Deliverability management of sender reputation and list hygiene.

Retention Metrics: Repeat Purchase Rate is Repeat Customers divided by Total Customers, with a target of 25-40%. Purchase Frequency is Orders divided by Customers with typical range of 1.5-3 annually. Time Between Purchases for average days between orders. Churn Rate is Churned Customers divided by Total Customers with a target of less than 20% annual. Customer Lifetime Value equals AOV times Purchase Frequency times Customer Lifespan.

Cohort Analysis: Track customer behavior by acquisition cohort. Compare retention curves over time. Identify high-value acquisition sources. Measure retention program impact.

Personalization for Retention: Product Recommendations use collaborative filtering based on similar customers. Content-based using product attributes. Hybrid combining multiple signals. Placement in email, website, and app.

Dynamic Content: Personalized homepage based on history. Category affinity-based navigation. Pricing and offers based on segment. Communication timing optimization.

Indian Market Retention Considerations: Festival Marketing around Diwali, Holi, and regional festivals as major retention drivers. Early access and exclusive offers for loyal customers. Gift-giving behavior patterns.

Price Sensitivity: Retention offers need clear value. Points and rewards resonate. Price-match guarantees build trust.

Regional Personalization: Vernacular communication where relevant. Regional festival recognition. Local payment and delivery preferences.',
        '["Implement lifecycle email automation: welcome series, abandoned cart, post-purchase, replenishment", "Build customer segmentation for personalized retention campaigns", "Create retention calendar aligning with festivals and occasions", "Establish retention metrics dashboard tracking repeat rate, frequency, and LTV"]'::jsonb,
        '["Lifecycle Email Automation Templates with flow structure and content examples", "Retention Marketing Calendar Template for Indian market with key dates", "Customer Segmentation Framework for retention targeting", "Retention Metrics Dashboard Template with benchmark targets"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 45: Customer Feedback and NPS
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        45,
        'Customer Feedback and NPS Implementation',
        'Customer feedback drives continuous improvement and identifies advocates. Net Promoter Score (NPS) is the industry standard for measuring customer loyalty. For Indian e-commerce, systematic feedback collection and action enables product, service, and experience improvements.

Net Promoter Score (NPS): NPS Question: "How likely are you to recommend [Brand] to a friend or colleague?" (0-10 scale). Promoters (9-10) are loyal enthusiasts who refer others. Passives (7-8) are satisfied but not enthusiastic. Detractors (0-6) are unhappy customers who can damage brand.

NPS Calculation: NPS equals Percentage of Promoters minus Percentage of Detractors. Range: -100 to +100. E-commerce benchmark: 30-50 is good, 50-70 is excellent, 70+ is world-class. Indian e-commerce averages: 25-45 typically.

NPS Program Implementation: Survey Timing: Transactional NPS is post-purchase at 7-14 days after delivery. Relationship NPS is periodic for overall brand sentiment (quarterly). Event-Based follows specific interactions like support resolution or returns.

Survey Distribution: Email with 15-25% response rate. SMS/WhatsApp with 20-30% response rate. In-app with 10-20% response rate. Website pop-up with 5-15% response rate.

Follow-Up Questions: Detractors: "What could we do better?". Passives: "What would make you a 10?". Promoters: "What do you love about us?".

Acting on NPS: Closed-Loop Process: Immediate acknowledgment of all responses. Detractor follow-up within 24-48 hours. Issue resolution with personal outreach. Convert detractors to promoters through recovery.

Root Cause Analysis: Categorize feedback themes. Quantify impact of issues. Prioritize improvements. Track issue resolution.

Promoter Activation: Thank promoters personally. Request reviews and referrals. Invite to advocacy programs. Provide exclusive early access.

Product Reviews and Ratings: Review Collection Strategy: Post-delivery email at optimal timing (7-14 days). Incentivize reviews (points, discounts) while maintaining authenticity. Photo and video reviews for richer content. Follow-up for non-responders.

Review Management: Respond to all negative reviews. Acknowledge and thank positive reviews. Use reviews in marketing and product pages. Monitor competitor reviews.

Review Authenticity: No fake reviews (ASCI and Consumer Protection compliance). Verified purchase badges. Balanced reviews including criticism.

Customer Feedback Channels: Support Interactions: Tag and categorize support reasons. Identify product and service issues. Track resolution satisfaction. Feedback loop to product team.

Social Listening: Monitor brand mentions on Twitter, Instagram, and Facebook. Track sentiment and themes. Respond to complaints publicly. Identify trends and issues.

User Research: Periodic customer interviews. Usability testing for website and app. Focus groups for new features. Customer advisory board for loyal customers.

Metrics and Reporting: NPS Tracking: Overall NPS trend over time. NPS by customer segment. NPS by product category. NPS after specific touchpoints.

Review Metrics: Average rating (target 4.0+ stars). Review volume and velocity. Review response rate. Sentiment analysis of review text.',
        '["Implement NPS program with transactional and relationship surveys", "Build closed-loop process for detractor follow-up and issue resolution", "Create product review collection strategy with optimized timing and incentives", "Establish feedback analysis process identifying improvement opportunities"]'::jsonb,
        '["NPS Implementation Guide with survey design and distribution strategy", "Closed-Loop NPS Process Template for detractor recovery", "Product Review Collection Playbook with email templates and incentive structure", "Customer Feedback Analysis Framework for identifying actionable insights"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Scaling & Expansion (Days 46-50)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Scaling & Expansion',
        'Scale your e-commerce business for exponential growth - omnichannel retail, international expansion via Amazon Global Selling, quick commerce, and building for D2C IPO or exit.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 46: Omnichannel Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        46,
        'Omnichannel Retail Strategy',
        'Omnichannel expansion is the natural evolution for successful D2C brands. Indian consumers expect seamless experiences across online and offline. Brands like Lenskart, Mamaearth, and boAt have demonstrated the power of omnichannel with 30-50% of revenue from offline post-expansion.

Omnichannel Models: Exclusive Brand Outlets (EBOs) are company-owned stores showcasing full range. High investment (Rs 20-50 lakh per store). Full control over experience. Best for premium positioning.

Shop-in-Shop (SIS) is branded space within larger retail stores. Lower investment (Rs 5-15 lakh). Leverage retailer footfall. Partners: Shoppers Stop, Lifestyle, Reliance Retail.

Multi-Brand Retail involves listing in retailer stores alongside competitors. Lowest investment but limited control. Wide distribution quickly. Partners: Modern trade chains, regional retailers.

Kiosk/Pop-Up offers temporary or small-format presence. Testing markets before full stores. High-traffic locations (malls, airports). Event-based presence.

Franchise Model uses franchisees for rapid expansion. Lower capital requirement. Partner selection critical. Defined operating standards.

Offline Retail Economics: EBO Unit Economics for a 500-1000 sq ft store: Setup Cost is Rs 25-50 lakh (interiors, inventory, technology). Monthly Rent ranges Rs 1-5 lakh (location dependent). Staff Cost is Rs 1-2 lakh for 3-5 people. Monthly Sales Target is Rs 5-15 lakh for break-even. Payback Period is typically 18-36 months.

Location Selection Criteria: Footfall and catchment demographics. Competitor presence analysis. Rent to revenue ratio (target less than 15%). Anchor tenant proximity.

Omnichannel Capabilities: Unified Inventory: Single view of inventory across channels. Real-time stock updates. Allocation rules for channel priority. Inventory transfer between locations.

Order Fulfillment: Buy Online, Pick Up in Store (BOPIS) offers same-day availability with higher conversion and lower logistics cost. Ship from Store uses store inventory for online orders with faster delivery and better inventory utilization. Endless Aisle orders from store with home delivery accessing full online catalog. Return to Store offers easy returns for online purchases driving store traffic.

Unified Customer Experience: Single customer profile across channels. Loyalty program works everywhere. Consistent pricing and promotions. Cross-channel purchase history.

Technology Requirements: POS System with integration to e-commerce platform. Inventory Management System provides real-time unified view. Order Management System enables cross-channel fulfillment. Customer Data Platform offers unified customer view.

Indian Omnichannel Success Stories: Lenskart has 1,500+ stores with 40%+ offline revenue and integrated eye testing with e-commerce. Mamaearth operates 150+ exclusive outlets plus 40,000+ retail touchpoints. boAt has expanded through electronics retail chains and EBOs. Nykaa operates 150+ stores contributing significant revenue.',
        '["Assess omnichannel readiness: brand strength, product-market fit, capital availability", "Define omnichannel strategy: EBO, SIS, multi-brand, or hybrid approach", "Plan pilot with 3-5 stores in home market to validate model", "Build technology foundation for unified inventory and customer experience"]'::jsonb,
        '["Omnichannel Strategy Framework with model comparison and selection criteria", "EBO Unit Economics Calculator for store viability analysis", "Omnichannel Technology Stack Requirements covering POS, OMS, and CDP", "Retail Location Selection Scorecard with evaluation criteria"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 47: International Expansion via Amazon Global Selling
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        47,
        'International Expansion via Amazon Global Selling',
        'Amazon Global Selling enables Indian sellers to access 300+ million customers across US, UK, Europe, UAE, and other markets. Indian e-commerce exports crossed Rs 1.2 lakh crore with significant growth potential. Understanding global selling mechanics is essential for international expansion.

Amazon Global Selling Overview: Available Markets: North America (US, Canada, Mexico), Europe (UK, Germany, France, Italy, Spain, Netherlands, Poland, Sweden), Middle East (UAE, Saudi Arabia), and Asia-Pacific (Japan, Australia, Singapore). Indian sellers primarily target US, UK, and UAE.

Account Types: Unified Account enables selling on multiple marketplaces from one account. Individual accounts per marketplace provide more control. Amazon Global Logistics for cross-border fulfillment.

Market Selection Criteria: Market Size: US is the largest with $450 billion+ e-commerce market. UK has a $150 billion+ market. UAE is growing rapidly with a $28 billion+ market.

Competition: Analyze category competition on target marketplace. Look for gaps in Indian product categories. Consider language and cultural fit.

Logistics: Shipping costs and times. FBA availability. Customs and duties. Returns handling.

Regulatory: Product compliance requirements. Import restrictions. Labeling requirements.

Cross-Border Logistics Options: Amazon FBA Export stores inventory in destination country FBA centers. Fastest delivery to customers with Prime eligibility. Higher upfront investment in inventory. Best for high-velocity products.

Amazon Global Logistics (AGL) ships from India to FBA centers. Competitive shipping rates. End-to-end tracking. Volume requirements may apply.

Direct Fulfillment ships orders directly from India. Lower inventory investment. Longer delivery times (7-21 days). Higher per-unit shipping costs.

Third-Party Logistics uses international 3PLs for fulfillment. Flexibility across marketplaces. Can be cost-effective for certain products.

Product Selection for Export: Best Categories: Apparel and textiles (Indian ethnic wear, contemporary fashion). Home and Kitchen (handicrafts, home decor). Jewelry and Accessories (costume, fashion jewelry). Beauty and Personal Care (Ayurvedic, natural products). Food and Grocery (spices, tea, snacks with compliance).

Selection Criteria: Good margins to absorb international logistics. Lightweight and non-fragile. Limited regulatory barriers. Differentiated from local competition.

Compliance Requirements: US Market: FCC certification for electronics, FDA compliance for food and cosmetics, CPSC for toys, state-specific requirements (California Prop 65).

UK/EU Market: CE marking, UKCA (UK), product safety regulations, REACH chemical compliance, VAT registration and compliance.

UAE Market: ESMA compliance, Halal certification for food and cosmetics, Trade License requirements.

Financial Considerations: Pricing: Account for shipping (Rs 150-500+ per unit), marketplace fees (15-20%), import duties (varies by product and country), currency conversion, and returns (higher rates internationally).

Payment: Amazon payments in local currency. Repatriation to India through approved channels. Currency hedging for stability.',
        '["Evaluate international market opportunity based on product fit and competition analysis", "Register on Amazon Global Selling and select target marketplaces", "Understand compliance requirements for target markets and ensure product eligibility", "Plan logistics strategy: FBA Export vs direct fulfillment based on product characteristics"]'::jsonb,
        '["Amazon Global Selling Setup Guide for Indian sellers", "International Market Selection Framework with opportunity assessment criteria", "Product Compliance Checklist by market (US, UK, UAE)", "International Pricing Calculator accounting for all costs and fees"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 48: Quick Commerce and 10-Minute Delivery
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        48,
        'Quick Commerce: The 10-Minute Delivery Revolution',
        'Quick commerce (q-commerce) is transforming Indian e-commerce with 10-30 minute delivery. The market is projected to reach Rs 1 lakh crore by 2030. Players like Zepto, Blinkit (Zomato), and Swiggy Instamart are reshaping consumer expectations. D2C brands must strategize their quick commerce presence.

Quick Commerce Landscape: Major Players: Blinkit (Zomato) was the pioneer as Grofers, now expanded with 15-minute delivery in 20+ cities. Zepto is the fastest-growing with 10-minute delivery promise and strong tech and ops focus. Swiggy Instamart leverages Swiggy delivery network with integrated food and grocery. BigBasket BB Now is the Tata-backed player with Instant delivery in metros. Amazon Fresh offers same-day and scheduled delivery.

Market Characteristics: Rs 25,000 crore GMV in FY24. Growing at 70%+ year-on-year. Metro focused (top 10-15 cities). Primarily grocery but expanding categories.

Operating Model: Dark Stores: Micro-fulfillment centers (1,500-3,000 sq ft). Located in residential areas (1-2 km radius). Curated assortment (2,000-4,000 SKUs). High throughput with rapid inventory turns.

Delivery: Gig workers on two-wheelers. Average delivery time of 10-15 minutes. Delivery radius of 2-3 km. Delivery fee of Rs 0-25 based on order value.

Unit Economics: Average Order Value is Rs 400-600. Take Rate is 15-25% from brands. Delivery Cost is Rs 30-50 per order. Dark Store Cost is Rs 2-5 lakh rent plus operations. Break-even typically at Rs 15-20 crore monthly GMV per city.

Opportunities for D2C Brands: Listing on Quick Commerce Platforms: Incremental reach to convenience-seeking customers. Higher discoverability for new product trials. No logistics complexity as platform handles fulfillment. Typically 20-35% margins to platform.

Category Expansion: Beyond grocery to beauty, personal care, and pet care. Electronics accessories and chargers. Apparel basics and essentials. OTC medicines and health products.

Brand Building: Visibility in high-frequency app. Impulse purchase opportunities. Sampling and trial packs. New launch velocity.

Getting Started on Quick Commerce: Platform Onboarding: Account setup on Blinkit Seller Hub, Zepto Partner Portal, and Instamart Seller. Category approval process. Margin and pricing negotiation.

Product Selection: Fast-moving SKUs. Impulse purchase items. Convenience sizes. Price points suitable for low AOV environment.

Inventory Management: Dark store inventory allocation. Demand forecasting by location. Stockout prevention (critical for ranking). Working capital planning.

Challenges and Considerations: Margin Pressure: 20-35% commission plus promotional contributions. Price parity requirements. Promotional intensity expectations.

Operational Complexity: Multiple dark store inventory management. Frequent replenishment. Expiry management for perishables.

Strategic Considerations: Channel conflict with D2C and marketplace. Brand positioning in discount-driven environment. Customer data access limitations.',
        '["Assess quick commerce opportunity for your product categories and target customers", "Apply for listing on major quick commerce platforms: Blinkit, Zepto, Instamart", "Select initial SKU assortment optimized for impulse purchase and convenience", "Plan inventory allocation and replenishment for dark store model"]'::jsonb,
        '["Quick Commerce Platform Comparison with onboarding requirements and terms", "SKU Selection Framework for quick commerce optimization", "Quick Commerce P&L Calculator modeling margins and profitability", "Dark Store Inventory Management Guide for brand partners"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 49: D2C Fundraising and Valuation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        49,
        'D2C Fundraising and Valuation',
        'D2C brands have attracted significant VC and PE investment in India with Rs 8,000+ crore invested in the sector. Understanding valuation drivers, investor expectations, and fundraising process is essential for scaling ambitions.

D2C Funding Landscape: Funding Stages: Seed/Angel (Rs 50 lakh - 3 crore) for MVP and initial traction, Series A (Rs 10-50 crore) for proven model and scaling, Series B (Rs 50-150 crore) for market leadership, and Series C+ (Rs 150+ crore) for category dominance and IPO preparation.

Active Investors: Venture Capital includes Sequoia Surge, Accel, Matrix Partners, Fireside Ventures, and DSG Consumer. PE/Growth includes Warburg Pincus, General Atlantic, Peak XV, and Tiger Global. Strategic includes Tata, Reliance, ITC, and Marico Ventures. Family Offices include many focused on consumer brands.

Valuation Metrics for D2C: Revenue Multiples: Early stage (less than Rs 50 crore revenue) ranges from 3-8x revenue. Growth stage (Rs 50-200 crore) ranges from 2-5x revenue. Scale stage (Rs 200+ crore) ranges from 1-3x revenue.

Valuation Drivers: Growth Rate: 50%+ YoY commands premium. Profitability: Path to profitability increasingly important. Unit Economics: Contribution margin of 30%+ expected. Repeat Rate: Higher repeat indicates product-market fit. Brand Strength: Premium positioning and customer loyalty. Category: Certain categories (beauty, food) attract premium.

Key Metrics Investors Evaluate: Revenue and Growth: GMV vs Net Revenue. YoY and MoM growth rates. Revenue quality (repeat vs new).

Profitability Metrics: Gross Margin (target 50%+). Contribution Margin after marketing (target 15%+). EBITDA margin progression.

Customer Metrics: Customer Acquisition Cost (CAC). Customer Lifetime Value (LTV). LTV to CAC ratio (target 3x+). Cohort retention curves.

Operational Metrics: Return rate (lower is better). Inventory turns. Working capital cycle.

Fundraising Process: Preparation (2-3 months): Financial model with projections. Data room with all documentation. Pitch deck telling a compelling story. Target investor list.

Outreach (1-2 months): Warm introductions preferred. Initial meetings and screening. Thesis alignment verification.

Due Diligence (1-2 months): Financial and legal DD. Commercial DD. Reference calls.

Negotiation and Close (1 month): Term sheet negotiation. Definitive agreements. Funding and closing.

Pitch Deck Essentials: Problem and market opportunity. Solution and product. Traction and metrics. Business model. Competition and differentiation. Team. Use of funds. Vision and ask.

Current Market Reality (2024-25): Valuation correction from 2021 peaks. Focus on profitability over growth at all costs. Longer fundraising timelines. Preference for capital-efficient businesses. Strategic investors more active.',
        '["Assess fundraising readiness based on metrics, growth, and market position", "Build comprehensive data room with financials, legal, and operational documentation", "Create compelling pitch deck highlighting differentiation and path to profitability", "Identify and prioritize target investors based on thesis fit and track record"]'::jsonb,
        '["D2C Investor Landscape Map with active investors and their focus areas", "D2C Pitch Deck Template with section-by-section guidance", "Data Room Checklist for fundraising due diligence", "Financial Model Template for D2C brands with investor-relevant metrics"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 50: Building for Exit or IPO
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        50,
        'Building for Exit: M&A and IPO Readiness',
        'Exit planning should begin early in the D2C journey. Indian D2C space has seen significant M&A activity (Mamaearth IPO, mCaffeine to Unilever, Plix to Unilever) and more exits are expected. Understanding exit options and preparation requirements enables value maximization.

Exit Options for D2C Brands: Strategic Acquisition: Acquirers include FMCG giants (HUL, P&G, Nestle), conglomerates (Tata, Reliance, ITC), international brands entering India, and private equity portfolio companies. Valuation typically 2-5x revenue depending on growth and strategic fit. Timeline is 6-18 months from initial discussions.

Private Equity Buyout: PE firms acquiring majority stakes. Growth capital with operational support. Typical hold of 4-7 years before exit. Examples: Lighthouse acquiring WOW Skin Science stake.

IPO (Initial Public Offering): Public listing on BSE/NSE. Requirements: Rs 500+ crore revenue, profitability track record, and governance standards. Timeline: 18-36 months preparation. Examples: Mamaearth (Honasa Consumer), Nykaa.

Management Buyout: Founders buying out investors. Requires debt financing or personal capital. Maintains independence.

Exit Readiness Assessment: Financial Readiness: Clean audited financials (3+ years). Consistent accounting policies. Proper revenue recognition. Tax compliance and documentation. Working capital management.

Legal Readiness: Clean cap table. No litigation or disputes. IP ownership documented. Employee agreements in place. Regulatory compliance verified.

Operational Readiness: Documented processes and SOPs. Management team depth. Technology systems scalable. Customer and supplier diversification.

Strategic Positioning: Clear market position. Defensible competitive advantages. Growth runway visible. Category leadership or clear path.

IPO Preparation: Pre-IPO Requirements (18-24 months before): Board composition (independent directors). Audit committee and governance structures. ESOP pool creation and grants. Financial reporting systems upgrade. Legal and compliance cleanup.

DRHP (Draft Red Herring Prospectus) Preparation (12-18 months): Merchant banker selection. Legal counsel engagement. Financial and legal due diligence. DRHP drafting with business description, financials, and risk factors.

SEBI Filing and Approval (6-12 months): DRHP submission. SEBI observations and responses. RHP (Red Herring Prospectus) filing.

IPO Execution (1-3 months): Price band determination. Roadshows and marketing. Book building. Allotment and listing.

D2C IPO Learnings from Nykaa and Mamaearth: Governance: Start building governance early. Independent directors with relevant expertise. Audit and compliance rigor.

Profitability: Path to profitability critical for valuation. Demonstrate improving unit economics. Sustainable growth over growth at all costs.

Positioning: Clear category leadership narrative. Diversified revenue streams. Omnichannel presence adds credibility.

Timing: Market conditions matter significantly. Build optionality to time IPO well. Have alternative exit paths ready.

Key Metrics for Exit: Revenue should target Rs 200-500+ crore for meaningful exit. Growth Rate should be 30-50%+ YoY. Gross Margin should exceed 50%. EBITDA Margin should be positive or clear path to positive. Repeat Rate should exceed 30% of revenue from repeat customers.',
        '["Conduct exit readiness assessment across financial, legal, and operational dimensions", "Build governance foundation with board composition and compliance structures", "Develop exit timeline and milestone plan for preferred exit option", "Create value creation roadmap addressing gaps in exit readiness"]'::jsonb,
        '["Exit Readiness Assessment Framework with detailed checklist", "IPO Preparation Timeline with key milestones and activities", "M&A Process Guide for D2C brands with negotiation considerations", "Value Creation Roadmap Template for exit preparation"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 6-10 (Days 26-50) created successfully for P22 E-commerce & D2C Mastery';

END $$;

COMMIT;
