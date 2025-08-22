-- P7: State-wise Scheme Map - Complete Navigation (30 Days, 10 Modules)
-- Deploy complete course content with all resources and templates

BEGIN;

-- First, clean up existing P7 content to rebuild it correctly
DELETE FROM "LessonProgress" WHERE "lessonId" IN (
  SELECT l.id FROM "Lesson" l 
  JOIN "Module" m ON m.id = l."moduleId"
  JOIN "Product" p ON p.id = m."productId"
  WHERE p.code = 'P7'
);

DELETE FROM "ModuleProgress" WHERE "moduleId" IN (
  SELECT m.id FROM "Module" m
  JOIN "Product" p ON p.id = m."productId"
  WHERE p.code = 'P7'
);

DELETE FROM "Lesson" WHERE "moduleId" IN (
  SELECT m.id FROM "Module" m
  JOIN "Product" p ON p.id = m."productId"
  WHERE p.code = 'P7'
);

DELETE FROM "Module" WHERE "productId" IN (
  SELECT id FROM "Product" WHERE code = 'P7'
);

-- Update Product details
UPDATE "Product" SET
  title = 'State-wise Scheme Map - Complete Navigation',
  description = 'Master India''s state ecosystem with comprehensive coverage of all states and UTs. Navigate 500+ state schemes, optimize multi-state presence, and achieve 30-50% cost savings through strategic state benefits.',
  "updatedAt" = NOW()
WHERE code = 'P7';

-- Get P7 product ID
WITH p7_product AS (
  SELECT id FROM "Product" WHERE code = 'P7'
),

-- Insert 10 comprehensive modules
modules_data AS (
  INSERT INTO "Module" ("id", "productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
  SELECT 
    'p7_mod_' || row_number() OVER(),
    p7_product.id,
    module_title,
    module_description,
    module_order,
    NOW(),
    NOW()
  FROM p7_product,
  (VALUES 
    (1, 'Federal Structure & Central Government Benefits', 'Master India''s federal governance structure, central government schemes, and national-level benefits for startups and businesses.'),
    (2, 'Northern States Powerhouse (UP, Punjab, Haryana, Delhi, Rajasthan)', 'Deep dive into Northern India''s industrial landscape, policy benefits, and massive market opportunities.'),
    (3, 'Western States Excellence (Maharashtra, Gujarat, Goa, MP)', 'Navigate India''s industrial heartland with comprehensive scheme mapping and optimization strategies.'),
    (4, 'Southern States Innovation Hub (Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala)', 'Master the South Indian innovation ecosystem with tech-focused benefits and startup-friendly policies.'),
    (5, 'Eastern States Potential (West Bengal, Odisha, Jharkhand, Bihar)', 'Unlock Eastern India''s emerging opportunities and government incentive programs.'),
    (6, 'North-Eastern States Advantages (8 Sister States + Sikkim)', 'Explore India''s most incentivized region with maximum subsidies, tax benefits, and development schemes.'),
    (7, 'Implementation Framework & Multi-State Strategy', 'Build systematic approach to leverage multiple state benefits and create optimized business presence.'),
    (8, 'Sector-Specific State Benefits Mapping', 'Navigate industry-specific incentives across manufacturing, technology, agriculture, and services sectors.'),
    (9, 'Financial Planning & ROI Optimization', 'Master the art of maximizing state benefits to achieve 30-50% cost savings and optimal ROI.'),
    (10, 'Advanced Strategies & Policy Monitoring', 'Stay ahead with policy tracking, relationship building, and future-proofing strategies.')
  ) AS modules(module_order, module_title, module_description)
  RETURNING id, "orderIndex"
),

-- Insert 30 comprehensive lessons (3 per module)
lessons_inserted AS (
  INSERT INTO "Lesson" (
    "id", "moduleId", "day", "title", "briefContent", "actionItems", "resources", 
    "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
  )
  VALUES 
  
  -- Module 1: Federal Structure & Central Government Benefits (Days 1-3)
  ('p7_l01', (SELECT id FROM modules_data WHERE "orderIndex" = 1), 1, 
   'Understanding India''s Federal Structure & Governance Framework',
   'Master India''s three-tier governance system and understand how federal, state, and local governments create opportunities for businesses. Learn the constitutional framework that enables state-specific benefits and how to leverage multi-level governance for maximum advantage.

Key Learning Outcomes:
• Complete understanding of India''s federal structure and governance hierarchy
• Constitutional provisions enabling state-specific business benefits
• Government decision-making processes and policy implementation
• Strategic approach to engaging with different government levels
• Framework for identifying cross-jurisdictional opportunities

This foundational knowledge is critical for navigating India''s complex regulatory landscape and maximizing state-specific advantages.',
   '["Map India''s federal structure and identify key decision-making bodies at central, state, and local levels", "Research and document constitutional provisions (Articles 245-254) that enable state-specific business legislation", "Create a governance hierarchy chart showing reporting relationships and policy influence flows", "Identify 5 central government schemes that complement state benefits in your industry", "Develop a stakeholder engagement framework for different government levels", "Analyze case study: How Tata Motors leveraged federal structure for Nano project across multiple states"]',
   '{"masterclass": "Former Cabinet Secretary on Federal Governance (60 min masterclass)", "templates": ["Federal Structure Mapping Template", "Multi-Level Government Engagement Framework", "Constitutional Provisions Reference Guide"], "tools": ["Interactive Federal Structure Navigator", "Government Hierarchy Visualizer"], "readings": ["Constitution of India - Part XI (Relations between Union and States)", "7th Schedule Analysis - Central vs State Powers"]}',
   120, 150, 1, NOW(), NOW()),

  ('p7_l02', (SELECT id FROM modules_data WHERE "orderIndex" = 1), 2, 
   'Central Government Schemes & National Programs Deep Dive',
   'Comprehensive analysis of 50+ central government schemes available to businesses and startups. Learn eligibility criteria, application processes, and strategic combinations of multiple schemes for maximum benefit.

Central Schemes Coverage:
• Startup India Initiative with complete benefits breakdown
• Make in India program and manufacturing incentives
• Digital India mission technology benefits
• Skill India workforce development programs
• MUDRA, SIDBI, and other financial scheme access
• Export promotion schemes and international trade benefits
• Research & Development incentives through DST, CSIR
• Green energy and sustainability program benefits

This module provides the foundation for understanding national-level opportunities before diving into state-specific benefits.',
   '["Audit your business against 20 major central government schemes and identify eligible programs", "Create detailed application timeline and documentation requirements for top 5 relevant schemes", "Develop central scheme optimization strategy combining multiple programs", "Map central scheme benefits to your 3-year business plan and financial projections", "Connect with scheme administrators and establish application tracking system", "Document success stories: 10 companies that maximized central scheme benefits"]',
   '{"masterclass": "NITI Aayog Policy Expert on Central Schemes Optimization (90 min masterclass)", "templates": ["Central Scheme Eligibility Matrix", "Multi-Scheme Application Tracker", "Benefits Optimization Calculator"], "tools": ["Scheme Eligibility Assessment Tool", "Application Timeline Generator"], "readings": ["Startup India Policy Document 2023", "Make in India Sector-wise Benefits Guide", "Digital India Impact Assessment Report"]}',
   120, 150, 2, NOW(), NOW()),

  ('p7_l03', (SELECT id FROM modules_data WHERE "orderIndex" = 1), 3, 
   'National Framework Integration & Strategic Planning',
   'Learn to integrate central government benefits with state-specific advantages for maximum impact. Develop strategic framework for leveraging national programs while optimizing state benefits.

Integration Strategies:
• Central-State scheme coordination and complementary benefits
• Avoiding conflicts between central and state program requirements
• Timeline optimization for multiple government benefit applications
• Documentation and compliance framework for multi-tier benefits
• Risk management when operating across jurisdictions
• Performance tracking and ROI measurement across all government benefits

Master the art of creating synergy between central and state benefits rather than viewing them as separate opportunities.',
   '["Create comprehensive integration map showing how central schemes complement state benefits in your target states", "Develop master compliance calendar coordinating central and state program requirements", "Design documentation system that serves both central and state scheme requirements", "Calculate combined ROI potential from integrated central-state benefit approach", "Establish monitoring system for policy changes at both central and state levels", "Create contingency plans for policy conflicts between central and state programs"]',
   '{"masterclass": "Former Joint Secretary on Central-State Coordination (75 min masterclass)", "templates": ["Central-State Integration Framework", "Master Compliance Calendar", "Multi-Tier Benefits ROI Calculator"], "tools": ["Integration Planning Tool", "Policy Conflict Alert System"], "readings": ["Inter-Governmental Relations in India Report", "Best Practices in Federal Cooperation", "Central-State Scheme Coordination Guidelines"]}',
   120, 150, 3, NOW(), NOW()),

  -- Module 2: Northern States Powerhouse (Days 4-6)
  ('p7_l04', (SELECT id FROM modules_data WHERE "orderIndex" = 2), 4, 
   'Uttar Pradesh - India''s Largest Market & Manufacturing Hub',
   'Deep dive into Uttar Pradesh''s massive opportunities - India''s largest state by population with the biggest consumer market and rapidly expanding industrial infrastructure.

UP''s Strategic Advantages:
• World''s 5th largest economy equivalent with 240 million population
• Expressway network creating new industrial corridors (Yamuna, Purvanchal, Bundelkhand)
• UP Industrial Policy 2022-27 with ₹1 lakh crore investment target
• Land availability at competitive rates compared to other major states
• Proximity to Delhi NCR providing logistics and market access
• Government focus on electronics, textiles, food processing, and automotive sectors
• One District One Product (ODOP) scheme creating focused manufacturing clusters

UP represents the largest untapped market opportunity in India with supportive government policies.',
   '["Conduct comprehensive analysis of UP Industrial Policy 2022-27 benefits for your industry sector", "Map optimal locations across UP''s industrial corridors and calculate logistics cost advantages", "Analyze ODOP opportunities and identify district-specific advantages for your product category", "Evaluate land acquisition processes and comparative cost analysis vs other states", "Connect with UP government officials and establish relationship for future applications", "Create market entry strategy for UP leveraging government incentives and market size"]',
   '{"masterclass": "UP Industrial Development Commissioner on State Benefits (90 min masterclass)", "templates": ["UP Industrial Policy Benefits Matrix", "Location Selection Framework", "ODOP Opportunity Mapper"], "tools": ["UP Incentive Calculator", "Industrial Corridor Analyzer"], "readings": ["UP Industrial Policy 2022-27 Complete Document", "UP Infrastructure Development Report", "Expressway Impact on Industrial Development"]}',
   120, 180, 4, NOW(), NOW()),

  ('p7_l05', (SELECT id FROM modules_data WHERE "orderIndex" = 2), 5, 
   'Punjab, Haryana & Delhi NCR - Industrial Excellence Triangle',
   'Master the synergies between Punjab''s agriculture-based industries, Haryana''s manufacturing excellence, and Delhi''s services hub to create integrated business strategies.

Regional Advantages:
• Punjab: Agriculture processing, food industry benefits, and rural market access
• Haryana: Manufacturing hub with automotive cluster advantages (Gurgaon, Manesar)
• Delhi: Services, logistics hub, government access, and skilled workforce
• Integrated supply chain opportunities across the three states
• World-class infrastructure and connectivity
• Access to both domestic and export markets through Delhi airport and seaports

This region represents India''s most developed industrial ecosystem with complementary advantages.',
   '["Map integrated business opportunities across Punjab-Haryana-Delhi triangle for your industry", "Analyze state-specific incentives and create optimized multi-state presence strategy", "Evaluate supply chain integration opportunities and cost optimization potential", "Connect with industrial associations and government bodies across all three states", "Develop workforce strategy leveraging different skill sets available in each state", "Create regulatory compliance framework for multi-state operations in this region"]',
   '{"masterclass": "Regional Development Expert on NCR Industrial Integration (75 min masterclass)", "templates": ["NCR Integration Strategy Template", "Multi-State Compliance Framework", "Supply Chain Optimization Model"], "tools": ["Regional Advantage Calculator", "Multi-State Setup Planner"], "readings": ["NCR Regional Plan 2041", "Industrial Cluster Development Report", "Cross-Border Industrial Cooperation Guide"]}',
   120, 180, 5, NOW(), NOW()),

  ('p7_l06', (SELECT id FROM modules_data WHERE "orderIndex" = 2), 6, 
   'Rajasthan - Desert Innovation & Renewable Energy Leadership',
   'Explore Rajasthan''s transformation into India''s renewable energy capital and manufacturing destination with unique incentives and abundant land availability.

Rajasthan''s Unique Opportunities:
• World''s largest solar park (Bhadla) and renewable energy ecosystem
• Massive land availability for large-scale manufacturing projects
• Rajasthan Investment Promotion Scheme (RIPS) 2019 with generous incentives
• Strategic location for serving both North and West Indian markets
• Rich mineral resources supporting manufacturing and processing industries
• Heritage tourism integration opportunities for unique business models
• Government focus on textiles, chemicals, automotive, and renewable energy

Rajasthan offers some of India''s most competitive land costs and generous incentive packages.',
   '["Analyze RIPS 2019 incentives and calculate potential savings for your business model", "Evaluate renewable energy opportunities and cost savings from Rajasthan''s solar infrastructure", "Map optimal locations considering logistics, resources, and government support", "Connect with Rajasthan government officials and begin relationship building", "Assess land acquisition processes and comparative advantages vs other states", "Develop market strategy for serving North and West India from Rajasthan base"]',
   '{"masterclass": "Rajasthan Industry Secretary on State Investment Opportunities (85 min masterclass)", "templates": ["RIPS Benefits Calculator", "Land Acquisition Framework", "Renewable Energy Integration Model"], "tools": ["Rajasthan Location Optimizer", "Incentive ROI Calculator"], "readings": ["RIPS 2019 Policy Document", "Rajasthan Solar Policy 2019", "Industrial Infrastructure Development Plan"]}',
   120, 180, 6, NOW(), NOW()),

  -- Module 3: Western States Excellence (Days 7-9)
  ('p7_l07', (SELECT id FROM modules_data WHERE "orderIndex" = 3), 7, 
   'Maharashtra - India''s Industrial Capital & Financial Hub',
   'Deep dive into Maharashtra''s unmatched industrial ecosystem - home to Mumbai financial district, Pune tech hub, and India''s largest state economy.

Maharashtra''s Dominance:
• Largest state economy contributing 15% of India''s GDP
• Mumbai: Financial capital with access to markets, banking, and international trade
• Pune: IT and automotive manufacturing cluster with skilled workforce
• Industrial Policy 2019 with progressive benefits and ease of doing business focus
• World-class ports (Mumbai, JNPT) providing export capabilities
• Established automotive, pharmaceutical, IT, and financial services ecosystems
• Maharashtra Industrial Development Corporation (MIDC) infrastructure support

Maharashtra offers the most mature industrial ecosystem in India with unparalleled access to capital and markets.',
   '["Conduct detailed analysis of Maharashtra Industrial Policy 2019 benefits for your sector", "Evaluate location options across Mumbai-Pune-Nashik-Aurangabad industrial belt", "Assess MIDC infrastructure support and industrial park advantages", "Map financial ecosystem access and banking relationship opportunities in Mumbai", "Connect with industry associations and government bodies for relationship building", "Develop market strategy leveraging Maharashtra''s domestic and export market access"]',
   '{"masterclass": "Maharashtra Industry Minister on State Economic Vision (100 min masterclass)", "templates": ["Maharashtra Policy Benefits Matrix", "Location Selection Framework", "Financial Ecosystem Access Guide"], "tools": ["Maharashtra Setup Calculator", "Industrial Belt Analyzer"], "readings": ["Maharashtra Industrial Policy 2019", "MIDC Infrastructure Development Plan", "Mumbai Financial District Opportunities Report"]}',
   120, 200, 7, NOW(), NOW()),

  ('p7_l08', (SELECT id FROM modules_data WHERE "orderIndex" = 3), 8, 
   'Gujarat - Manufacturing Excellence & Business-Friendly Governance',
   'Master Gujarat''s world-class business environment, industrial infrastructure, and pro-business policies that make it India''s most business-friendly state.

Gujarat''s Excellence:
• Consistent ranking as India''s most business-friendly state
• World-class industrial infrastructure with dedicated industrial parks
• Vibrant Gujarat Global Summit attracting international investments
• Strong entrepreneurial culture and business ecosystem
• Excellent port connectivity (Kandla, Mundra) for international trade
• Chemical, petrochemical, pharmaceutical, and textile industry clusters
• Single-window clearance system and efficient government processes

Gujarat sets the benchmark for industrial development and business facilitation in India.',
   '["Analyze Gujarat''s single-window clearance system and map time savings for your business setup", "Evaluate industrial park options and infrastructure advantages across Gujarat", "Connect with Gujarat government''s investment promotion team", "Assess sector-specific cluster advantages and networking opportunities", "Map port connectivity benefits for domestic and international market access", "Develop comprehensive Gujarat entry strategy with timeline and milestones"]',
   '{"masterclass": "Gujarat Industry Commissioner on Business Excellence (90 min masterclass)", "templates": ["Gujarat Business Setup Accelerator", "Industrial Park Selection Framework", "Trade Connectivity Optimizer"], "tools": ["Gujarat Advantage Calculator", "Port Access Analyzer"], "readings": ["Gujarat Industrial Policy Latest", "Vibrant Gujarat Investment Opportunities", "Port Connectivity and Trade Benefits Guide"]}',
   120, 200, 8, NOW(), NOW()),

  ('p7_l09', (SELECT id FROM modules_data WHERE "orderIndex" = 3), 9, 
   'Goa, MP & Western Region Integration Strategy',
   'Explore opportunities in Goa''s unique tourism-business model and Madhya Pradesh''s emerging industrial landscape for comprehensive Western region coverage.

Regional Opportunities:
• Goa: Tourism integration, IT services, pharmaceutical manufacturing, and port access
• Madhya Pradesh: Central location advantages, abundant resources, and emerging industrial policies
• Regional integration strategies for supply chain optimization
• Complementary advantages across different Western states
• Cross-border opportunities and logistics optimization
• Workforce and skill complementarity across the region

Create integrated strategies that leverage the unique advantages of each Western state.',
   '["Map tourism-business integration opportunities in Goa for unique revenue models", "Analyze MP''s central location advantages for pan-India market access", "Develop integrated Western region strategy leveraging complementary state advantages", "Connect with government officials across Goa and MP for relationship building", "Evaluate cross-state supply chain and logistics optimization opportunities", "Create workforce strategy utilizing different skill sets across Western states"]',
   '{"masterclass": "Western Region Development Expert on Integration Strategies (80 min masterclass)", "templates": ["Western Region Integration Framework", "Cross-State Logistics Optimizer", "Tourism-Business Integration Model"], "tools": ["Regional Strategy Planner", "Multi-State Advantage Calculator"], "readings": ["Goa Tourism-Industry Integration Report", "MP Industrial Development Vision", "Western Region Economic Cooperation Framework"]}',
   120, 200, 9, NOW(), NOW()),

  -- Module 4: Southern States Innovation Hub (Days 10-12)
  ('p7_l10', (SELECT id FROM modules_data WHERE "orderIndex" = 4), 10, 
   'Karnataka - India''s Silicon Valley & Innovation Capital',
   'Deep dive into Karnataka''s world-class innovation ecosystem, Bangalore''s tech dominance, and state policies supporting startups and R&D.

Karnataka''s Innovation Leadership:
• Bangalore: India''s Silicon Valley with highest concentration of tech companies
• Leading startup ecosystem with unicorn creation track record
• Karnataka Innovation and Technology Society (KITS) supporting R&D
• Biotechnology capital with research institutions and pharma clusters
• Aerospace and defense manufacturing hub (HAL, ISRO presence)
• Progressive policies supporting innovation, research, and technology development
• World-class educational institutions creating skilled workforce pipeline

Karnataka represents India''s innovation capital with unmatched technology ecosystem support.',
   '["Map Karnataka''s innovation ecosystem and identify strategic entry points for your business", "Analyze state R&D incentives and technology development support programs", "Connect with KITS and other innovation promotion bodies", "Evaluate Bangalore''s tech cluster advantages and networking opportunities", "Assess startup ecosystem support and accelerator programs available", "Develop technology-focused market entry strategy leveraging Karnataka''s innovation infrastructure"]',
   '{"masterclass": "Karnataka IT Minister on Innovation Ecosystem (95 min masterclass)", "templates": ["Innovation Ecosystem Navigator", "R&D Incentive Optimizer", "Tech Cluster Integration Guide"], "tools": ["Karnataka Innovation Calculator", "Startup Ecosystem Analyzer"], "readings": ["Karnataka Innovation Policy 2022", "Bangalore Tech Cluster Analysis", "Startup India Karnataka Implementation Report"]}',
   120, 220, 10, NOW(), NOW()),

  ('p7_l11', (SELECT id FROM modules_data WHERE "orderIndex" = 4), 11, 
   'Tamil Nadu - Manufacturing Powerhouse & Industrial Excellence',
   'Master Tamil Nadu''s world-class manufacturing infrastructure, automotive excellence, and comprehensive industrial development support.

Tamil Nadu''s Manufacturing Dominance:
• Largest manufacturing state contributing significantly to India''s industrial output
• Automotive capital with major OEMs and comprehensive auto component ecosystem
• Textile and leather manufacturing hub with global market access
• Chennai: Detroit of India with automotive manufacturing concentration
• Excellent port connectivity (Chennai, Ennore) supporting export businesses
• Tamil Nadu Industrial Policy 2021 with competitive incentive packages
• Skilled workforce and technical education infrastructure

Tamil Nadu offers India''s most comprehensive manufacturing ecosystem with proven track record.',
   '["Analyze Tamil Nadu Industrial Policy 2021 benefits and calculate manufacturing cost advantages", "Map automotive cluster opportunities and supplier ecosystem integration possibilities", "Evaluate port connectivity benefits for international market access", "Connect with Tamil Nadu investment promotion officials", "Assess manufacturing infrastructure and industrial park options", "Develop manufacturing strategy leveraging Tamil Nadu''s ecosystem advantages"]',
   '{"masterclass": "Tamil Nadu Industry Secretary on Manufacturing Excellence (85 min masterclass)", "templates": ["TN Manufacturing Benefits Calculator", "Automotive Cluster Integration Guide", "Export Market Access Framework"], "tools": ["Tamil Nadu Setup Optimizer", "Manufacturing Cost Calculator"], "readings": ["Tamil Nadu Industrial Policy 2021", "Automotive Cluster Development Report", "Port Connectivity and Export Benefits Guide"]}',
   120, 220, 11, NOW(), NOW()),

  ('p7_l12', (SELECT id FROM modules_data WHERE "orderIndex" = 4), 12, 
   'Telangana, Andhra Pradesh & Kerala - Emerging Tech & Spices Hub',
   'Explore the rapid development of Telangana''s Hyderabad tech hub, Andhra Pradesh''s new capital opportunities, and Kerala''s unique spices and IT services model.

Southern Region Diversification:
• Telangana: Hyderabad''s growing tech ecosystem and pharmaceutical manufacturing
• Andhra Pradesh: New capital development opportunities and government focus on industrial growth
• Kerala: IT services, spices trade, and unique tourism-business integration models
• Regional complementarity and integrated Southern strategy opportunities
• Access to skilled workforce across different specializations
• Comprehensive coverage of South Indian market through multi-state presence

Develop integrated Southern strategy leveraging the unique strengths of each state.',
   '["Map Hyderabad''s tech ecosystem growth opportunities and government support programs", "Analyze Andhra Pradesh''s new capital development and early-mover advantages", "Evaluate Kerala''s unique industry advantages and niche market opportunities", "Develop integrated Southern region strategy with multi-state presence optimization", "Connect with government officials across all three states", "Create market access strategy for comprehensive South Indian coverage"]',
   '{"masterclass": "Southern Region Expert on Integrated Development Strategy (90 min masterclass)", "templates": ["Southern Integration Framework", "Multi-State Presence Optimizer", "Regional Advantage Matrix"], "tools": ["Southern Strategy Planner", "Cross-State Synergy Calculator"], "readings": ["Telangana IT Policy 2021", "Andhra Pradesh Capital Development Plan", "Kerala Spices and IT Integration Report"]}',
   120, 220, 12, NOW(), NOW()),

  -- Module 5: Eastern States Potential (Days 13-15)
  ('p7_l13', (SELECT id FROM modules_data WHERE "orderIndex" = 5), 13, 
   'West Bengal - Cultural Capital & Industrial Revival',
   'Discover West Bengal''s transformation from traditional industries to modern manufacturing and service sectors with unique cultural and locational advantages.

West Bengal''s Opportunities:
• Kolkata: Cultural and intellectual capital with skilled workforce
• Strategic location providing access to both domestic and international markets (Bangladesh, Southeast Asia)
• Industrial revival with focus on automotive, textiles, and IT services
• Rich cultural heritage enabling unique tourism and cultural business integration
• Port connectivity through Kolkata and Haldia ports
• Government focus on industrial development and investment attraction
• Lower operational costs compared to Western and Southern states

West Bengal offers unique combination of cultural richness, strategic location, and cost advantages.',
   '["Analyze West Bengal''s industrial revival policies and identify sector-specific opportunities", "Map strategic location advantages for accessing Eastern and international markets", "Evaluate cultural integration opportunities for unique business models", "Connect with West Bengal investment promotion authorities", "Assess port connectivity benefits and international trade potential", "Develop market entry strategy leveraging cultural and locational advantages"]',
   '{"masterclass": "West Bengal Industry Minister on State Transformation (80 min masterclass)", "templates": ["WB Opportunity Mapper", "Cultural Integration Framework", "Eastern Market Access Guide"], "tools": ["Bengal Advantage Calculator", "Cultural Business Model Generator"], "readings": ["West Bengal Industrial Policy Latest", "Kolkata Port Development Plan", "Cultural Heritage Business Integration Report"]}',
   120, 150, 13, NOW(), NOW()),

  ('p7_l14', (SELECT id FROM modules_data WHERE "orderIndex" = 5), 14, 
   'Odisha - Mineral Wealth & Emerging Industrial Hub',
   'Explore Odisha''s rich mineral resources, emerging industrial infrastructure, and government focus on creating a modern industrial ecosystem.

Odisha''s Resource Advantages:
• Rich mineral resources supporting mining, steel, and allied industries
• Emerging industrial infrastructure with new industrial parks and SEZs
• Strategic coastal location with port development at Paradip
• Government focus on industrial development and investment attraction
• Lower land and operational costs creating competitive advantages
• Proximity to mineral resources reducing raw material costs
• Growing focus on sustainable mining and processing industries

Odisha represents significant untapped potential with resource and cost advantages.',
   '["Map mineral resource advantages and supply chain integration opportunities", "Analyze Odisha''s industrial development policies and incentive structures", "Evaluate port development at Paradip and coastal location benefits", "Connect with Odisha investment promotion teams", "Assess land availability and cost advantages for manufacturing setup", "Develop resource-based industry strategy leveraging Odisha''s natural advantages"]',
   '{"masterclass": "Odisha Industry Secretary on Resource-Based Development (75 min masterclass)", "templates": ["Odisha Resource Advantage Mapper", "Coastal Development Opportunities Framework", "Mining Integration Strategy Guide"], "tools": ["Odisha Setup Calculator", "Resource Cost Optimizer"], "readings": ["Odisha Industrial Policy 2022", "Paradip Port Development Plan", "Mineral Resources and Industrial Development Report"]}',
   120, 150, 14, NOW(), NOW()),

  ('p7_l15', (SELECT id FROM modules_data WHERE "orderIndex" = 5), 15, 
   'Jharkhand, Bihar & Eastern Region Integration',
   'Navigate the emerging opportunities in Jharkhand''s mineral-rich landscape and Bihar''s agricultural potential while developing comprehensive Eastern region strategies.

Eastern Region Potential:
• Jharkhand: Mining, steel, and heavy industries with mineral resource proximity
• Bihar: Agricultural processing, logistics hub potential, and emerging industrial policies
• Regional integration opportunities for supply chain and market access
• Lower operational costs across the Eastern region
• Government focus on industrial development and employment generation
• Emerging infrastructure development supporting industrial growth

Create comprehensive Eastern region strategy leveraging complementary advantages across states.',
   '["Map mineral and agricultural resource advantages across Jharkhand and Bihar", "Analyze emerging industrial policies and government support in both states", "Develop integrated Eastern region strategy with multi-state presence", "Connect with government officials across Jharkhand and Bihar", "Evaluate infrastructure development and future growth potential", "Create market strategy for Eastern region coverage with cost optimization"]',
   '{"masterclass": "Eastern Region Development Expert on Integration Strategy (70 min masterclass)", "templates": ["Eastern Integration Framework", "Resource-Agriculture Synergy Model", "Cost Optimization Strategy"], "tools": ["Eastern Region Planner", "Multi-State Cost Calculator"], "readings": ["Jharkhand Industrial Development Report", "Bihar Agricultural Processing Opportunities", "Eastern Region Economic Development Plan"]}',
   120, 150, 15, NOW(), NOW()),

  -- Module 6: North-Eastern States Advantages (Days 16-18)
  ('p7_l16', (SELECT id FROM modules_data WHERE "orderIndex" = 6), 16, 
   'North-East India - Maximum Incentive Zone & Strategic Gateway',
   'Discover India''s most incentivized region with maximum subsidies, tax benefits, and strategic importance as gateway to Southeast Asia.

North-East Advantages:
• Maximum central and state incentives available anywhere in India
• 100% income tax exemption for 10 years for eligible industries
• Transport subsidies, interest subsidies, and capital investment subsidies
• Strategic location as gateway to Southeast Asia and ASEAN markets
• Abundant natural resources and pristine environment for sustainable industries
• Government focus on connectivity and infrastructure development
• Unique opportunity for early movers in India''s most supported region

North-East represents the highest incentive opportunity in India with strategic international connectivity potential.',
   '["Map comprehensive incentive structure available across North-Eastern states", "Analyze 100% income tax exemption criteria and qualifying industry sectors", "Evaluate strategic location advantages for ASEAN market access", "Connect with North-East Industrial Development authorities", "Assess infrastructure development plans and connectivity improvements", "Develop North-East entry strategy for maximum incentive utilization"]',
   '{"masterclass": "North-East Development Minister on Maximum Incentive Strategy (100 min masterclass)", "templates": ["NE Incentive Maximizer", "ASEAN Gateway Strategy", "Tax Exemption Qualification Guide"], "tools": ["NE Benefits Calculator", "Southeast Asia Access Planner"], "readings": ["North-East Industrial Policy Compilation", "Look East Policy Implementation", "ASEAN Connectivity Development Plan"]}',
   120, 180, 16, NOW(), NOW()),

  ('p7_l17', (SELECT id FROM modules_data WHERE "orderIndex" = 6), 17, 
   'Assam & Meghalaya - Strategic States Deep Dive',
   'Deep dive into Assam''s tea, oil, and emerging industrial landscape and Meghalaya''s unique opportunities in the heart of North-East.

Strategic State Focus:
• Assam: Tea industry integration, oil and natural gas advantages, and emerging manufacturing
• Meghalaya: Strategic central location in North-East with connectivity advantages
• Both states offering maximum central incentives plus state-specific benefits
• Cultural richness enabling unique tourism and cultural business integration
• Natural resource advantages and sustainable development opportunities
• Government focus on industrial development and connectivity improvement

Master the specific advantages and strategies for India''s most incentivized states.',
   '["Analyze tea and oil industry integration opportunities in Assam", "Map Meghalaya''s central location advantages within North-East region", "Evaluate specific incentive packages and qualification criteria for both states", "Connect with Assam and Meghalaya investment promotion teams", "Assess cultural integration and tourism business opportunities", "Develop state-specific strategies for maximum benefit extraction"]',
   '{"masterclass": "Assam-Meghalaya Industry Expert on State-Specific Strategies (85 min masterclass)", "templates": ["Assam Industry Integration Guide", "Meghalaya Strategic Location Framework", "Cultural Business Integration Model"], "tools": ["State-Specific Benefits Calculator", "NE Cultural Business Planner"], "readings": ["Assam Industrial Policy 2022", "Meghalaya Investment Opportunities", "Tea Industry Integration Report"]}',
   120, 180, 17, NOW(), NOW()),

  ('p7_l18', (SELECT id FROM modules_data WHERE "orderIndex" = 6), 18, 
   'Complete North-East Strategy & International Connectivity',
   'Develop comprehensive North-East strategy covering all 8 states plus Sikkim with focus on international connectivity and maximum incentive utilization.

Comprehensive NE Strategy:
• All 8 sister states plus Sikkim coverage and comparative advantage analysis
• International connectivity strategy for Bangladesh, Myanmar, and ASEAN markets
• Infrastructure development timeline and early-mover advantages
• Maximum incentive stacking and qualification optimization
• Regional cooperation and cross-border business opportunities
• Long-term strategic positioning for India''s Look East policy benefits

Create master strategy for India''s highest opportunity and most incentivized region.',
   '["Create comprehensive North-East coverage strategy across all 9 states", "Map international connectivity opportunities and cross-border business potential", "Develop maximum incentive stacking strategy combining central and state benefits", "Connect with regional development authorities and international trade bodies", "Assess infrastructure development timeline for strategic positioning", "Create long-term North-East strategy with phased implementation plan"]',
   '{"masterclass": "North-East Regional Expert on Comprehensive Strategy (95 min masterclass)", "templates": ["Complete NE Coverage Framework", "International Connectivity Optimizer", "Maximum Incentive Stacking Guide"], "tools": ["NE Master Strategy Planner", "Cross-Border Opportunity Mapper"], "readings": ["Act East Policy Implementation Report", "NE Infrastructure Development Timeline", "Cross-Border Trade Opportunities Analysis"]}',
   120, 180, 18, NOW(), NOW()),

  -- Module 7: Implementation Framework (Days 19-21)
  ('p7_l19', (SELECT id FROM modules_data WHERE "orderIndex" = 7), 19, 
   'Multi-State Presence Strategy & Optimization Framework',
   'Master the art of creating strategic multi-state presence to maximize benefits, minimize risks, and optimize operations across India''s diverse state ecosystem.

Multi-State Strategy Elements:
• Location selection criteria for different business functions (manufacturing, sales, R&D, services)
• Legal structure optimization for multi-state operations
• Tax planning and compliance coordination across states
• Supply chain optimization leveraging different state advantages
• Risk diversification and business continuity planning
• Regulatory compliance coordination and standardization
• Performance monitoring and ROI optimization across locations

Develop systematic approach to multi-state expansion and benefit optimization.',
   '["Create location selection matrix ranking states for different business functions", "Design legal and tax structure for optimized multi-state operations", "Develop supply chain strategy leveraging complementary state advantages", "Create comprehensive compliance framework for multi-state coordination", "Build risk assessment and mitigation strategy for diverse state operations", "Establish performance monitoring system for multi-location ROI tracking"]',
   '{"masterclass": "Multi-State Operations Expert on Strategic Expansion (100 min masterclass)", "templates": ["Multi-State Strategy Framework", "Location Selection Matrix", "Cross-State Compliance Coordinator"], "tools": ["Multi-State Optimizer", "Location ROI Calculator"], "readings": ["Multi-State Operations Best Practices", "Cross-State Compliance Guide", "Location Strategy Optimization Report"]}',
   120, 200, 19, NOW(), NOW()),

  ('p7_l20', (SELECT id FROM modules_data WHERE "orderIndex" = 7), 20, 
   'Government Relations & Stakeholder Management',
   'Build systematic approach to government relations, stakeholder engagement, and long-term relationship management across multiple states.

Government Relations Strategy:
• Stakeholder mapping and relationship building framework
• Communication strategies for different government levels
• Policy advocacy and influence building techniques
• Crisis management and relationship recovery protocols
• Long-term partnership development with government bodies
• Industry association engagement and collective advocacy
• CSR and community engagement strategies supporting government relations

Master the relationship aspects that determine long-term success in leveraging state benefits.',
   '["Map key stakeholders across target states and create engagement priority matrix", "Develop communication strategy and relationship building protocols", "Create policy advocacy framework for industry-beneficial changes", "Design crisis management protocol for government relationship issues", "Establish long-term partnership development strategy", "Build community engagement and CSR strategy supporting government relations"]',
   '{"masterclass": "Government Relations Expert on Strategic Stakeholder Management (90 min masterclass)", "templates": ["Stakeholder Mapping Framework", "Government Relations Protocol", "Policy Advocacy Strategy Guide"], "tools": ["Relationship Tracker", "Stakeholder Engagement Planner"], "readings": ["Government Relations Best Practices", "Policy Advocacy Handbook", "Stakeholder Management in Indian Context"]}',
   120, 200, 20, NOW(), NOW()),

  ('p7_l21', (SELECT id FROM modules_data WHERE "orderIndex" = 7), 21, 
   'Implementation Timeline & Project Management',
   'Create detailed implementation timeline and project management framework for systematic state benefit extraction and multi-state expansion.

Implementation Framework:
• Phased expansion strategy with priority state selection
• Timeline optimization for application processes and benefit realization
• Resource allocation and team structure for multi-state operations
• Milestone tracking and progress monitoring systems
• Risk management and contingency planning for implementation
• Performance measurement and ROI tracking across all initiatives
• Continuous improvement and strategy refinement processes

Transform strategy into actionable implementation plan with clear timelines and accountability.',
   '["Create comprehensive implementation timeline with state priority ranking", "Design resource allocation and team structure for multi-state expansion", "Develop milestone tracking and progress monitoring framework", "Build contingency planning for implementation risks and delays", "Establish performance measurement system for all state initiatives", "Create continuous improvement protocol for strategy refinement and optimization"]',
   '{"masterclass": "Project Management Expert on Multi-State Implementation (85 min masterclass)", "templates": ["Implementation Timeline Master Plan", "Multi-State Project Tracker", "Performance Monitoring Dashboard"], "tools": ["Implementation Planning Tool", "Multi-State Progress Tracker"], "readings": ["Project Management in Government Context", "Multi-Location Implementation Guide", "Performance Tracking Best Practices"]}',
   120, 200, 21, NOW(), NOW()),

  -- Module 8: Sector-Specific Benefits (Days 22-24)
  ('p7_l22', (SELECT id FROM modules_data WHERE "orderIndex" = 8), 22, 
   'Manufacturing & Heavy Industries - State-wise Advantage Mapping',
   'Deep dive into manufacturing-specific benefits across states with focus on automotive, textiles, chemicals, steel, and heavy industries.

Manufacturing Benefits Analysis:
• Automotive sector: State-wise cluster advantages and supplier ecosystem benefits
• Textiles: Regional specializations and export promotion benefits
• Chemicals & Petrochemicals: Resource proximity and infrastructure advantages
• Steel & Heavy Industries: Raw material access and transportation benefits
• Electronics & Components: SEZ benefits and skilled workforce availability
• Food Processing: Agricultural integration and market access advantages

Master sector-specific strategies for maximum manufacturing benefit extraction.',
   '["Map automotive cluster advantages across Tamil Nadu, Karnataka, Maharashtra, and other states", "Analyze textile industry benefits and regional specializations for your product category", "Evaluate chemical industry setup benefits considering resource proximity and regulations", "Assess electronics and components manufacturing benefits including SEZ advantages", "Map food processing opportunities with agricultural integration potential", "Create sector-specific state selection strategy for manufacturing operations"]',
   '{"masterclass": "Manufacturing Sector Expert on State-wise Optimization (95 min masterclass)", "templates": ["Manufacturing Sector Benefits Matrix", "Cluster Integration Framework", "Supply Chain Optimization Guide"], "tools": ["Manufacturing Location Optimizer", "Sector Benefits Calculator"], "readings": ["National Manufacturing Policy Implementation", "State-wise Industrial Cluster Analysis", "Manufacturing Competitiveness Report"]}',
   120, 200, 22, NOW(), NOW()),

  ('p7_l23', (SELECT id FROM modules_data WHERE "orderIndex" = 8), 23, 
   'Technology & Services - IT Hub Advantages & Innovation Zones',
   'Navigate technology and services sector benefits across India''s major IT hubs and emerging innovation zones.

Technology Sector Benefits:
• Bangalore: Silicon Valley advantages and innovation ecosystem benefits
• Hyderabad: Emerging tech hub with competitive costs and government support
• Pune: IT services and product development cluster advantages
• Chennai: IT services and manufacturing technology integration benefits
• NCR: Government and enterprise market access advantages
• Emerging hubs: Tier-2 city advantages and cost optimization opportunities

Optimize technology sector presence across India''s diverse IT landscape.',
   '["Analyze Bangalore''s Silicon Valley advantages for your technology business model", "Evaluate Hyderabad''s emerging tech ecosystem and cost-benefit optimization", "Map IT services opportunities across Chennai, Pune, and other established hubs", "Assess Tier-2 city advantages for cost optimization and talent availability", "Create technology sector multi-hub strategy for market coverage and cost optimization", "Develop innovation ecosystem integration strategy across multiple tech hubs"]',
   '{"masterclass": "IT Industry Expert on Multi-Hub Technology Strategy (90 min masterclass)", "templates": ["IT Hub Advantage Matrix", "Technology Ecosystem Navigator", "Multi-Hub Strategy Framework"], "tools": ["Tech Hub Optimizer", "Innovation Ecosystem Mapper"], "readings": ["India IT Industry Landscape Report", "Tech Hub Comparative Analysis", "Innovation Ecosystem Development Study"]}',
   120, 200, 23, NOW(), NOW()),

  ('p7_l24', (SELECT id FROM modules_data WHERE "orderIndex" = 8), 24, 
   'Agriculture & Rural Business - State Resources & Market Integration',
   'Explore agriculture-based business opportunities, rural market integration, and state-specific advantages for agri-business development.

Agri-Business Opportunities:
• Agricultural processing: State-wise crop advantages and processing infrastructure
• Rural market access: Distribution and logistics strategies for rural penetration
• Cooperative integration: Leveraging existing cooperative networks for business development
• Export promotion: Agricultural export benefits and international market access
• Sustainable agriculture: Organic farming and sustainability program benefits
• Technology integration: AgTech opportunities and government digitalization support

Master the intersection of agriculture, rural markets, and state government support systems.',
   '["Map agricultural resource advantages and processing opportunities across states", "Develop rural market penetration strategy leveraging state distribution networks", "Analyze cooperative integration opportunities for agriculture business development", "Evaluate export promotion benefits and international market access for agricultural products", "Assess AgTech opportunities and government support for agriculture technology integration", "Create comprehensive agri-business strategy utilizing multi-state agricultural advantages"]',
   '{"masterclass": "Agri-Business Expert on State Integration Strategy (85 min masterclass)", "templates": ["Agri-Business State Advantage Matrix", "Rural Market Integration Framework", "Agricultural Export Strategy Guide"], "tools": ["Agricultural Opportunity Mapper", "Rural Market Access Planner"], "readings": ["National Agriculture Policy Implementation", "State-wise Agricultural Advantage Report", "Rural Market Development Study"]}',
   120, 200, 24, NOW(), NOW()),

  -- Module 9: Financial Planning & Optimization (Days 25-27)
  ('p7_l25', (SELECT id FROM modules_data WHERE "orderIndex" = 9), 25, 
   'Cost-Benefit Analysis & ROI Optimization Framework',
   'Master comprehensive financial analysis of state benefits with focus on achieving 30-50% cost savings through strategic state advantage utilization.

Financial Optimization Strategy:
• Comprehensive cost-benefit analysis methodology for state benefits evaluation
• ROI calculation frameworks for different types of state advantages
• Cost savings quantification across operations, taxes, incentives, and infrastructure
• Break-even analysis for multi-state expansion and benefit utilization
• Financial modeling for long-term state benefit optimization
• Risk assessment and financial contingency planning for state-dependent benefits

Develop sophisticated financial framework for maximizing state benefit ROI.',
   '["Create comprehensive cost-benefit analysis model for your target states", "Develop ROI calculation framework quantifying all state benefit categories", "Build financial model showing 30-50% cost savings potential through state optimization", "Create break-even analysis for multi-state expansion investments", "Design risk assessment framework for state-dependent financial benefits", "Establish ongoing financial monitoring system for state benefit performance"]',
   '{"masterclass": "Financial Planning Expert on State Benefits ROI Optimization (100 min masterclass)", "templates": ["State Benefits ROI Calculator", "Multi-State Financial Model", "Cost Savings Quantification Framework"], "tools": ["Financial Optimization Calculator", "ROI Tracking Dashboard"], "readings": ["State Benefits Financial Analysis Guide", "Multi-State Investment Planning", "Cost Optimization Best Practices"]}',
   120, 220, 25, NOW(), NOW()),

  ('p7_l26', (SELECT id FROM modules_data WHERE "orderIndex" = 9), 26, 
   'Tax Planning & Incentive Maximization',
   'Navigate complex tax implications of multi-state operations while maximizing available incentives and maintaining compliance.

Tax Optimization Strategy:
• State tax structure analysis and optimization opportunities
• GST implications and optimization for multi-state operations
• Income tax planning leveraging state-specific exemptions and benefits
• Incentive stacking strategies for maximum benefit extraction
• Transfer pricing considerations for multi-state operations
• Tax compliance coordination across multiple jurisdictions

Master tax-efficient structures while maximizing state incentive utilization.',
   '["Analyze state tax structures and identify optimization opportunities for your business", "Create GST optimization strategy for multi-state operations", "Map income tax benefits and exemption qualification criteria across target states", "Develop incentive stacking strategy combining multiple state and central benefits", "Design transfer pricing policy for multi-state operations", "Establish comprehensive tax compliance coordination system"]',
   '{"masterclass": "Tax Expert on Multi-State Tax Optimization (90 min masterclass)", "templates": ["Multi-State Tax Optimizer", "Incentive Stacking Calculator", "Tax Compliance Coordinator"], "tools": ["Tax Planning Tool", "Compliance Tracking System"], "readings": ["Multi-State Tax Planning Guide", "GST Optimization Strategies", "State Incentive Tax Implications"]}',
   120, 220, 26, NOW(), NOW()),

  ('p7_l27', (SELECT id FROM modules_data WHERE "orderIndex" = 9), 27, 
   'Funding & Investment Strategy Integration',
   'Integrate state benefit optimization with funding strategy, investor relations, and capital structure planning.

Investment Integration Strategy:
• Presenting state benefits to investors and lenders for enhanced valuations
• Integrating state incentives with funding rounds and capital planning
• Location strategy impact on investor attractiveness and fund raising
• Government grants and subsidies integration with private funding
• Exit strategy considerations with state benefit dependencies
• International investor considerations for state-optimized operations

Optimize state benefits as part of comprehensive investment and funding strategy.',
   '["Develop investor presentation highlighting state benefit advantages and cost savings", "Integrate state incentives with capital requirements and funding timeline", "Create location strategy enhancing investor attractiveness and business valuation", "Map government grants and subsidies complementing private funding sources", "Design exit strategy considering state benefit dependencies and transferability", "Develop international investor engagement strategy for state-optimized operations"]',
   '{"masterclass": "Investment Expert on State Benefits and Funding Integration (85 min masterclass)", "templates": ["Investor Presentation with State Benefits", "Funding Integration Framework", "Capital Planning with State Advantages"], "tools": ["Investment Strategy Planner", "State Benefits Valuation Calculator"], "readings": ["State Benefits and Investor Relations", "Location Strategy for Fund Raising", "Government Incentives Integration with Private Capital"]}',
   120, 220, 27, NOW(), NOW()),

  -- Module 10: Advanced Strategies (Days 28-30)
  ('p7_l28', (SELECT id FROM modules_data WHERE "orderIndex" = 10), 28, 
   'Policy Monitoring & Future-Proofing Strategy',
   'Build systems for continuous policy monitoring, anticipating changes, and adapting strategies to evolving state benefit landscapes.

Future-Proofing Framework:
• Policy monitoring systems and early warning indicators
• Relationship building for advance policy intelligence
• Scenario planning for policy changes and their business impact
• Adaptation strategies for evolving state benefit structures
• Long-term relationship maintenance with government stakeholders
• Continuous strategy refinement based on policy evolution

Create sustainable approach to policy navigation and long-term benefit optimization.',
   '["Establish comprehensive policy monitoring system across all target states", "Build early warning system for policy changes affecting your business benefits", "Create scenario planning framework for different policy evolution possibilities", "Develop adaptation protocols for responding to state benefit structure changes", "Design long-term stakeholder relationship maintenance strategy", "Establish continuous strategy refinement process based on policy landscape evolution"]',
   '{"masterclass": "Policy Expert on Future-Proofing and Change Management (95 min masterclass)", "templates": ["Policy Monitoring Framework", "Change Adaptation Protocol", "Future Strategy Planning Guide"], "tools": ["Policy Alert System", "Strategy Adaptation Planner"], "readings": ["Policy Evolution Patterns in India", "Change Management in Government Relations", "Future-Proofing Business Strategy"]}',
   120, 250, 28, NOW(), NOW()),

  ('p7_l29', (SELECT id FROM modules_data WHERE "orderIndex" = 10), 29, 
   'Advanced Government Relations & Advocacy',
   'Master advanced techniques for government relations, policy advocacy, and building influential relationships that create long-term competitive advantages.

Advanced Relations Strategy:
• High-level government relationship building and maintenance
• Policy advocacy and influence strategies for beneficial changes
• Industry leadership positioning and thought leadership development
• Cross-state government relationship coordination
• Crisis management and relationship recovery in government context
• Leveraging relationships for competitive intelligence and early opportunities

Develop sophisticated government relations capabilities for sustained competitive advantage.',
   '["Build high-level government relationship strategy across key states and central government", "Develop policy advocacy plan for creating industry-beneficial changes", "Create thought leadership positioning strategy in government and industry forums", "Design cross-state relationship coordination for maximum influence and intelligence", "Establish crisis management protocol for government relationship challenges", "Build competitive intelligence network through government and industry relationships"]',
   '{"masterclass": "Senior Government Relations Expert on Advanced Advocacy (90 min masterclass)", "templates": ["Advanced Relations Strategy Framework", "Policy Advocacy Playbook", "Influence Building Guide"], "tools": ["Relationship Influence Tracker", "Advocacy Impact Measurer"], "readings": ["Advanced Government Relations Techniques", "Policy Advocacy Success Stories", "Influence Building in Indian Government Context"]}',
   120, 250, 29, NOW(), NOW()),

  ('p7_l30', (SELECT id FROM modules_data WHERE "orderIndex" = 10), 30, 
   'Master Implementation & Continuous Optimization',
   'Synthesize all learnings into master implementation plan with continuous optimization framework for ongoing state benefit maximization.

Master Strategy Integration:
• Comprehensive implementation roadmap integrating all state benefit strategies
• Performance measurement and optimization framework for continuous improvement
• Scaling strategies for expanding state benefit utilization over time
• Team development and capability building for state benefit management
• Technology integration for automated monitoring and optimization
• Long-term vision and strategic roadmap for state ecosystem leadership

Create comprehensive mastery framework for sustained state benefit optimization leadership.',
   '["Synthesize complete state benefit strategy into master implementation roadmap", "Establish comprehensive performance measurement and continuous optimization system", "Create scaling strategy for expanding state benefit utilization across business growth", "Design team development program for building internal state benefit management capability", "Integrate technology solutions for automated monitoring and optimization", "Develop long-term vision and strategic roadmap for state ecosystem leadership position"]',
   '{"masterclass": "State Strategy Master on Complete Implementation and Leadership (120 min masterclass)", "templates": ["Master Implementation Roadmap", "Continuous Optimization Framework", "State Ecosystem Leadership Strategy"], "tools": ["Complete Strategy Integrator", "Master Performance Dashboard"], "readings": ["State Benefits Mastery Implementation", "Continuous Optimization in Government Benefits", "Leadership in State Ecosystem Navigation"]}',
   120, 250, 30, NOW(), NOW())

  RETURNING id, day, title
)

-- Summary of lessons inserted
SELECT 
  'P7 State-wise Scheme Map Course Successfully Deployed!' as status,
  COUNT(*) as total_lessons,
  MIN(day) as first_day,
  MAX(day) as last_day,
  SUM("estimatedTime") as total_minutes,
  SUM("xpReward") as total_xp
FROM lessons_inserted;

COMMIT;