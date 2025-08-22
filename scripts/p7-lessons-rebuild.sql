-- P7: Rebuild 30 lessons for State-wise Scheme Map course

BEGIN;

-- First, clear all existing lessons for P7 to start fresh
DELETE FROM "Lesson" WHERE "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" IN (
    SELECT id FROM "Product" WHERE code = 'P7'
  )
);

-- Get the module IDs for P7 in the correct order
WITH p7_modules AS (
  SELECT id, "orderIndex", title
  FROM "Module" 
  WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
  ORDER BY "orderIndex"
)

-- Insert 30 comprehensive lessons (3 per module)
INSERT INTO "Lesson" (
  "id", "moduleId", "day", "title", "briefContent", "actionItems", "resources", 
  "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
)
VALUES 

-- Module 1: Federal Structure & Central Government Benefits (Days 1-3)
('p7_l01', (SELECT id FROM p7_modules WHERE "orderIndex" = 1), 1, 
 'Understanding India''s Federal Structure & Central Government Schemes',
 'Master India''s three-tier governance system and 50+ central government schemes. Learn constitutional framework enabling state benefits, decision-making processes, and strategic multi-level government engagement.

Key Coverage:
• Federal structure and constitutional provisions (Articles 245-254)
• Central schemes: Startup India, Make in India, Digital India, MUDRA, SIDBI
• Government hierarchy and decision-making processes
• Strategic stakeholder engagement framework
• Policy influence and advocacy opportunities

Foundation knowledge for navigating India''s complex regulatory landscape.',
 '["Map India''s federal structure and governance hierarchy", "Research 20 central government schemes relevant to your business", "Create stakeholder engagement framework for different government levels", "Analyze constitutional provisions enabling state-specific benefits", "Develop central-state coordination strategy", "Connect with scheme administrators and begin application processes"]',
 '{"templates": ["Federal Structure Navigator", "Central Scheme Eligibility Matrix", "Government Engagement Framework"], "tools": ["Scheme Discovery Tool", "Eligibility Calculator"], "readings": ["Constitution Part XI Analysis", "Central Schemes Compendium 2024"]}',
 90, 150, 1, NOW(), NOW()),

('p7_l02', (SELECT id FROM p7_modules WHERE "orderIndex" = 1), 2, 
 'Central Scheme Optimization & Multi-Program Integration',
 'Deep dive into scheme stacking strategies, application processes, and integration with state benefits. Master the art of maximizing central government program advantages.

Advanced Strategies:
• Scheme stacking and complementary benefit optimization
• Application timeline coordination and documentation
• Performance tracking and ROI measurement
• Integration with state-specific programs
• Success stories and best practices from leading companies

Build foundation for comprehensive government benefit utilization.',
 '["Create master application tracker for relevant central schemes", "Develop scheme stacking strategy for maximum benefits", "Design documentation system for multiple program compliance", "Calculate ROI potential from integrated approach", "Establish relationship with scheme administrators", "Create timeline for phased application and benefit realization"]',
 '{"templates": ["Scheme Stacking Calculator", "Application Timeline Coordinator", "ROI Tracking Dashboard"], "tools": ["Multi-Scheme Optimizer", "Documentation Manager"], "readings": ["Scheme Integration Best Practices", "Success Stories Compendium"]}',
 90, 150, 2, NOW(), NOW()),

('p7_l03', (SELECT id FROM p7_modules WHERE "orderIndex" = 1), 3, 
 'National Policy Framework & Strategic Integration',
 'Master national policies affecting business operations and create integration framework combining central and state benefits for maximum advantage.

Policy Integration:
• National policy impact on state benefits
• Strategic coordination between different government levels
• Risk management for policy conflicts
• Long-term policy monitoring and adaptation
• Advocacy and influence building strategies

Create sustainable framework for navigating evolving policy landscape.',
 '["Map national policies affecting your business operations", "Create central-state integration strategy framework", "Design policy monitoring and early warning system", "Develop advocacy strategy for beneficial policy changes", "Build relationships with policy influencers", "Create contingency plans for policy conflicts"]',
 '{"templates": ["Policy Integration Framework", "Monitoring System Setup", "Advocacy Strategy Guide"], "tools": ["Policy Tracker", "Integration Planner"], "readings": ["National Policy Impact Analysis", "Government Relations Handbook"]}',
 90, 150, 3, NOW(), NOW()),

-- Module 2: Northern States Powerhouse (Days 4-6)
('p7_l04', (SELECT id FROM p7_modules WHERE "orderIndex" = 2), 4, 
 'Uttar Pradesh - India''s Largest Market Deep Dive',
 'Comprehensive analysis of UP''s massive opportunities: 240M population market, industrial policy benefits, expressway network advantages, and ODOP scheme optimization.

UP Strategic Advantages:
• UP Industrial Policy 2022-27 benefits and ₹1L Cr investment targets
• Expressway corridors: Yamuna, Purvanchal, Bundelkhand industrial zones
• One District One Product (ODOP) focused manufacturing opportunities
• Land availability and competitive costs vs other major states
• Delhi NCR proximity for logistics and market access

UP represents India''s largest single market with supportive policies.',
 '["Analyze UP Industrial Policy 2022-27 for your sector benefits", "Map optimal locations across UP expressway corridors", "Evaluate ODOP opportunities in target districts", "Compare land costs and acquisition processes", "Connect with UP investment promotion officials", "Develop market entry strategy leveraging UP''s scale"]',
 '{"templates": ["UP Industrial Policy Navigator", "ODOP Opportunity Mapper", "Location Selection Framework"], "tools": ["UP Incentive Calculator", "Market Size Analyzer"], "readings": ["UP Industrial Policy 2022-27", "Expressway Development Impact Report"]}',
 90, 180, 4, NOW(), NOW()),

('p7_l05', (SELECT id FROM p7_modules WHERE "orderIndex" = 2), 5, 
 'Punjab-Haryana-Delhi NCR Industrial Excellence Triangle',
 'Master the synergies between Punjab agriculture, Haryana manufacturing, and Delhi services for integrated regional strategies.

Regional Integration:
• Punjab: Agriculture processing and food industry benefits
• Haryana: Manufacturing clusters and automotive ecosystem
• Delhi: Services hub, government access, skilled workforce
• Integrated supply chain and logistics optimization
• Multi-state compliance and operational coordination

Leverage India''s most developed industrial triangle.',
 '["Map integrated business opportunities across NCR triangle", "Analyze multi-state presence benefits and costs", "Evaluate supply chain integration potential", "Design workforce strategy across different skill zones", "Create compliance framework for multi-state operations", "Connect with regional industrial associations"]',
 '{"templates": ["NCR Integration Strategy", "Multi-State Operations Framework", "Regional Supply Chain Optimizer"], "tools": ["Triangle Advantage Calculator", "Integration Planner"], "readings": ["NCR Regional Development Plan", "Industrial Cluster Analysis"]}',
 90, 180, 5, NOW(), NOW()),

('p7_l06', (SELECT id FROM p7_modules WHERE "orderIndex" = 2), 6, 
 'Rajasthan - Renewable Energy & Manufacturing Hub',
 'Explore Rajasthan''s transformation into renewable energy capital with RIPS 2019 benefits, land advantages, and strategic location benefits.

Rajasthan Opportunities:
• World''s largest solar infrastructure and renewable energy ecosystem
• RIPS 2019 generous incentive packages and land availability
• Strategic location for North-West market coverage
• Mining and mineral resource proximity advantages
• Heritage tourism integration for unique business models

Rajasthan offers competitive costs and generous incentives.',
 '["Analyze RIPS 2019 incentives for your business model", "Evaluate renewable energy cost advantages and integration", "Map optimal locations for manufacturing and operations", "Assess land acquisition processes and comparative benefits", "Connect with Rajasthan government investment teams", "Develop strategy for North-West market coverage from Rajasthan"]',
 '{"templates": ["RIPS Benefits Calculator", "Renewable Energy Integration Model", "Location Advantage Matrix"], "tools": ["Rajasthan Setup Optimizer", "Energy Cost Calculator"], "readings": ["RIPS 2019 Comprehensive Guide", "Solar Infrastructure Benefits Report"]}',
 90, 180, 6, NOW(), NOW()),

-- Module 3: Western States Excellence (Days 7-9)
('p7_l07', (SELECT id FROM p7_modules WHERE "orderIndex" = 3), 7, 
 'Maharashtra - Industrial Capital & Financial Hub Mastery',
 'Deep dive into Maharashtra''s industrial dominance: Mumbai financial access, Pune tech hub, industrial infrastructure, and 15% of India''s GDP contribution.

Maharashtra Excellence:
• Mumbai: Financial capital with market access and international trade
• Pune: IT and automotive clusters with skilled workforce
• Industrial Policy 2019 progressive benefits and infrastructure
• MIDC support and world-class industrial parks
• Export capabilities through major ports (Mumbai, JNPT)

Maharashtra offers most mature industrial ecosystem in India.',
 '["Analyze Maharashtra Industrial Policy 2019 sector-specific benefits", "Evaluate Mumbai-Pune-Nashik-Aurangabad industrial belt options", "Map financial ecosystem access and banking relationships", "Connect with MIDC for infrastructure support assessment", "Develop export strategy leveraging port connectivity", "Create market access strategy for domestic and international markets"]',
 '{"templates": ["Maharashtra Benefits Matrix", "Financial Ecosystem Navigator", "Export Strategy Framework"], "tools": ["Maharashtra Calculator", "Port Access Analyzer"], "readings": ["Maharashtra Industrial Policy 2019", "MIDC Infrastructure Guide"]}',
 90, 200, 7, NOW(), NOW()),

('p7_l08', (SELECT id FROM p7_modules WHERE "orderIndex" = 3), 8, 
 'Gujarat - Business Excellence & Manufacturing Leadership',
 'Master Gujarat''s business-friendly governance, single-window systems, industrial parks, and consistent ranking as India''s most business-friendly state.

Gujarat Advantages:
• Single-window clearance and efficient government processes
• World-class industrial infrastructure and dedicated parks
• Chemical, petrochemical, pharmaceutical, textile clusters
• Port connectivity (Kandla, Mundra) for international trade
• Vibrant Gujarat platform and international investment attraction

Gujarat sets benchmark for business facilitation.',
 '["Map Gujarat''s single-window system and time-saving benefits", "Evaluate industrial park options and infrastructure advantages", "Connect with Gujarat investment promotion teams", "Assess sector-specific cluster networking opportunities", "Analyze port connectivity for trade advantages", "Develop comprehensive Gujarat entry and growth strategy"]',
 '{"templates": ["Gujarat Business Accelerator", "Industrial Park Selector", "Trade Connectivity Guide"], "tools": ["Gujarat Advantage Calculator", "Cluster Network Mapper"], "readings": ["Gujarat Single Window Guide", "Vibrant Gujarat Opportunities"]}',
 90, 200, 8, NOW(), NOW()),

('p7_l09', (SELECT id FROM p7_modules WHERE "orderIndex" = 3), 9, 
 'Goa & MP Integration + Western Region Strategy',
 'Comprehensive Western region coverage including Goa''s tourism-business integration and MP''s central location advantages.

Regional Completion:
• Goa: Tourism integration, IT services, pharmaceutical manufacturing
• MP: Central India location, resource advantages, emerging policies
• Cross-state logistics and supply chain optimization
• Regional workforce and skill complementarity
• Integrated market coverage strategy

Complete Western region mastery for comprehensive coverage.',
 '["Explore Goa tourism-business integration opportunities", "Analyze MP central location advantages for distribution", "Create integrated Western region multi-state strategy", "Map cross-state logistics optimization potential", "Design workforce strategy utilizing regional skill diversity", "Connect with Goa and MP government representatives"]',
 '{"templates": ["Western Integration Framework", "Tourism-Business Model", "Regional Strategy Optimizer"], "tools": ["Multi-State Planner", "Regional Calculator"], "readings": ["Goa Business Integration Report", "MP Strategic Location Analysis"]}',
 90, 200, 9, NOW(), NOW()),

-- Module 4: Southern States Innovation Hub (Days 10-12)
('p7_l10', (SELECT id FROM p7_modules WHERE "orderIndex" = 4), 10, 
 'Karnataka - Silicon Valley & Innovation Capital',
 'Master Karnataka''s innovation ecosystem: Bangalore tech dominance, KITS R&D support, biotechnology leadership, and startup-friendly policies.

Innovation Leadership:
• Bangalore: Highest concentration of tech companies and startups
• Karnataka Innovation and Technology Society (KITS) R&D support
• Biotechnology and pharmaceutical research infrastructure
• Aerospace and defense manufacturing (HAL, ISRO presence)
• World-class educational institutions and skilled workforce

Karnataka represents India''s innovation capital.',
 '["Map Bangalore''s tech ecosystem entry points and networking opportunities", "Analyze KITS R&D incentives and technology development support", "Evaluate biotechnology and pharma cluster advantages", "Connect with innovation bodies and startup accelerators", "Assess educational institution collaboration opportunities", "Develop innovation-focused market entry strategy"]',
 '{"templates": ["Innovation Ecosystem Navigator", "R&D Support Optimizer", "Tech Cluster Integration Guide"], "tools": ["Karnataka Innovation Calculator", "Startup Ecosystem Mapper"], "readings": ["Karnataka Innovation Policy 2022", "Bangalore Tech Ecosystem Report"]}',
 90, 220, 10, NOW(), NOW()),

('p7_l11', (SELECT id FROM p7_modules WHERE "orderIndex" = 4), 11, 
 'Tamil Nadu - Manufacturing Powerhouse Excellence',
 'Deep dive into Tamil Nadu''s manufacturing dominance: automotive capital, textile hub, industrial policy benefits, and export connectivity.

Manufacturing Excellence:
• Largest manufacturing state with proven industrial output
• Automotive capital with OEM concentration and component ecosystem
• Textile and leather manufacturing with global market access
• Chennai port connectivity supporting export businesses
• Tamil Nadu Industrial Policy 2021 competitive incentives

Tamil Nadu offers India''s most comprehensive manufacturing ecosystem.',
 '["Analyze TN Industrial Policy 2021 manufacturing cost advantages", "Map automotive cluster integration and supplier opportunities", "Evaluate textile industry benefits and export potential", "Connect with TN investment promotion officials", "Assess port connectivity for international market access", "Develop manufacturing strategy leveraging TN ecosystem"]',
 '{"templates": ["TN Manufacturing Calculator", "Automotive Integration Guide", "Export Access Framework"], "tools": ["Manufacturing Optimizer", "Port Connectivity Analyzer"], "readings": ["TN Industrial Policy 2021", "Automotive Cluster Development Report"]}',
 90, 220, 11, NOW(), NOW()),

('p7_l12', (SELECT id FROM p7_modules WHERE "orderIndex" = 4), 12, 
 'Telangana, AP & Kerala - Tech Hub Diversification',
 'Explore Hyderabad''s tech growth, AP''s capital development, and Kerala''s IT-spices integration for comprehensive South coverage.

Southern Diversification:
• Telangana: Hyderabad tech ecosystem and pharmaceutical manufacturing
• Andhra Pradesh: New capital opportunities and industrial focus
• Kerala: IT services excellence and spices trade advantages
• Regional complementarity and market access optimization
• Multi-state presence for complete South Indian coverage

Integrated Southern strategy for maximum market penetration.',
 '["Map Hyderabad tech ecosystem growth and government support", "Analyze AP new capital development early-mover advantages", "Evaluate Kerala unique industry advantages and opportunities", "Create integrated South Indian multi-state presence strategy", "Connect with government officials across all three states", "Develop comprehensive Southern market access plan"]',
 '{"templates": ["Southern Integration Matrix", "Multi-State Presence Optimizer", "Regional Market Access Guide"], "tools": ["Southern Strategy Planner", "Market Coverage Calculator"], "readings": ["Telangana IT Policy 2021", "Kerala IT-Spices Integration Study"]}',
 90, 220, 12, NOW(), NOW()),

-- Module 5: Eastern States Potential (Days 13-15)
('p7_l13', (SELECT id FROM p7_modules WHERE "orderIndex" = 5), 13, 
 'West Bengal - Cultural Capital & Industrial Revival',
 'Discover West Bengal''s transformation: Kolkata cultural advantages, industrial revival policies, strategic location, and Bangladesh connectivity.

Bengal Opportunities:
• Kolkata: Cultural capital with intellectual workforce advantages
• Strategic location for Eastern and international markets (Bangladesh, SE Asia)
• Industrial revival with automotive, textiles, IT services focus
• Port connectivity through Kolkata and Haldia
• Cultural heritage enabling unique business integration models

West Bengal offers cultural richness with strategic location advantages.',
 '["Analyze West Bengal industrial revival policies and opportunities", "Map strategic location advantages for Eastern market access", "Evaluate cultural integration opportunities for unique business models", "Connect with WB investment promotion authorities", "Assess port connectivity and international trade potential", "Develop market strategy leveraging cultural and locational benefits"]',
 '{"templates": ["WB Revival Strategy Navigator", "Cultural Integration Framework", "Eastern Access Guide"], "tools": ["Bengal Calculator", "Cultural Business Generator"], "readings": ["WB Industrial Revival Policy", "Kolkata Port Development Plan"]}',
 90, 150, 13, NOW(), NOW()),

('p7_l14', (SELECT id FROM p7_modules WHERE "orderIndex" = 5), 14, 
 'Odisha - Mineral Wealth & Coastal Development',
 'Explore Odisha''s mineral resources, emerging industrial infrastructure, Paradip port development, and competitive cost advantages.

Odisha Resource Advantages:
• Rich mineral resources supporting steel and allied industries
• Emerging industrial parks and SEZ development
• Paradip port development and coastal location benefits
• Lower operational costs and competitive land availability
• Government focus on sustainable mining and processing

Odisha represents significant resource-based opportunities.',
 '["Map mineral resource advantages and supply chain integration", "Analyze Odisha industrial development policies and incentives", "Evaluate Paradip port development and coastal benefits", "Connect with Odisha investment promotion teams", "Assess land costs and availability advantages", "Develop resource-based industry integration strategy"]',
 '{"templates": ["Odisha Resource Mapper", "Coastal Development Framework", "Mining Integration Guide"], "tools": ["Resource Advantage Calculator", "Coastal Access Planner"], "readings": ["Odisha Industrial Policy 2022", "Paradip Development Plan"]}',
 90, 150, 14, NOW(), NOW()),

('p7_l15', (SELECT id FROM p7_modules WHERE "orderIndex" = 5), 15, 
 'Jharkhand, Bihar & Eastern Integration',
 'Navigate Jharkhand''s mining potential, Bihar''s agricultural advantages, and create comprehensive Eastern region integration strategies.

Eastern Integration:
• Jharkhand: Mining, steel, heavy industries with resource proximity
• Bihar: Agricultural processing potential and logistics advantages
• Regional cost optimization and operational efficiency
• Infrastructure development and growth potential
• Government focus on industrial development and employment

Create comprehensive Eastern region strategy with cost advantages.',
 '["Map mineral and agricultural resource advantages across both states", "Analyze emerging industrial policies and government support", "Develop integrated Eastern region multi-state strategy", "Connect with Jharkhand and Bihar investment officials", "Evaluate infrastructure development timeline and opportunities", "Create cost-optimized Eastern region market strategy"]',
 '{"templates": ["Eastern Integration Framework", "Resource-Agriculture Synergy", "Cost Optimization Matrix"], "tools": ["Eastern Planner", "Regional Cost Calculator"], "readings": ["Jharkhand Mining Policy", "Bihar Agricultural Development Report"]}',
 90, 150, 15, NOW(), NOW()),

-- Module 6: North-Eastern States Advantages (Days 16-18)
('p7_l16', (SELECT id FROM p7_modules WHERE "orderIndex" = 6), 16, 
 'North-East Maximum Incentive Zone Strategy',
 'Master India''s most incentivized region: 100% income tax exemption, maximum subsidies, ASEAN gateway potential, and strategic advantages.

NE Maximum Benefits:
• 100% income tax exemption for 10 years (eligible industries)
• Transport, interest, and capital investment subsidies
• Strategic ASEAN gateway location advantages
• Abundant natural resources and sustainable development potential
• Government connectivity and infrastructure development focus

North-East offers highest incentive concentration in India.',
 '["Map comprehensive NE incentive structure and qualification criteria", "Analyze 100% tax exemption eligibility for your business", "Evaluate ASEAN gateway strategic location advantages", "Connect with North-East development authorities", "Assess infrastructure development and connectivity improvements", "Develop NE entry strategy for maximum incentive utilization"]',
 '{"templates": ["NE Incentive Maximizer", "ASEAN Gateway Strategy", "Tax Exemption Guide"], "tools": ["NE Benefits Calculator", "Southeast Asia Planner"], "readings": ["NE Industrial Policy Comprehensive", "Look East Implementation Guide"]}',
 90, 180, 16, NOW(), NOW()),

('p7_l17', (SELECT id FROM p7_modules WHERE "orderIndex" = 6), 17, 
 'Assam & Meghalaya Strategic Deep Dive',
 'Focus on Assam''s tea-oil-manufacturing integration and Meghalaya''s central NE location for strategic regional advantages.

Strategic States Focus:
• Assam: Tea industry integration, oil/gas advantages, manufacturing emergence
• Meghalaya: Central NE location with connectivity advantages
• Maximum central incentives plus state-specific benefits
• Cultural integration and tourism business opportunities
• Natural resource advantages and sustainable development

Master specific strategies for key NE states.',
 '["Analyze Assam tea and oil industry integration opportunities", "Map Meghalaya central location advantages within NE region", "Evaluate state-specific incentive packages and criteria", "Connect with Assam and Meghalaya investment teams", "Assess cultural and tourism business integration potential", "Develop state-specific maximum benefit extraction strategies"]',
 '{"templates": ["Assam Integration Guide", "Meghalaya Strategic Framework", "Cultural Business Model"], "tools": ["State Benefits Calculator", "Cultural Opportunity Mapper"], "readings": ["Assam Industrial Policy 2022", "Meghalaya Investment Opportunities"]}',
 90, 180, 17, NOW(), NOW()),

('p7_l18', (SELECT id FROM p7_modules WHERE "orderIndex" = 6), 18, 
 'Complete NE Strategy & International Connectivity',
 'Comprehensive NE coverage across all 9 states with international connectivity strategy and maximum incentive stacking.

Complete NE Mastery:
• All 9 states (8 sisters + Sikkim) comparative analysis
• International connectivity for Bangladesh, Myanmar, ASEAN markets
• Maximum incentive stacking and optimization strategies
• Cross-border business opportunities and trade potential
• Long-term positioning for India''s Act East policy benefits

Master strategy for India''s highest opportunity region.',
 '["Create comprehensive 9-state NE coverage and comparison strategy", "Map international connectivity and cross-border opportunities", "Develop maximum incentive stacking across central and state programs", "Connect with regional authorities and international trade bodies", "Assess infrastructure timeline for strategic early positioning", "Create long-term NE master strategy with implementation phases"]',
 '{"templates": ["Complete NE Framework", "International Connectivity Guide", "Incentive Stacking Optimizer"], "tools": ["NE Master Planner", "Cross-Border Mapper"], "readings": ["Act East Policy Report", "NE Infrastructure Development Timeline"]}',
 90, 180, 18, NOW(), NOW()),

-- Module 7: Implementation Framework (Days 19-21)
('p7_l19', (SELECT id FROM p7_modules WHERE "orderIndex" = 7), 19, 
 'Multi-State Presence Optimization & Strategic Framework',
 'Master multi-state expansion strategy: location selection, legal optimization, supply chain integration, and performance monitoring.

Multi-State Strategy:
• Location selection criteria for different business functions
• Legal and tax structure optimization for multi-state operations
• Supply chain integration leveraging complementary advantages
• Risk diversification and business continuity planning
• Regulatory compliance coordination and standardization

Systematic approach to multi-state benefit maximization.',
 '["Create location selection matrix for different business functions", "Design legal and tax structure for multi-state optimization", "Develop supply chain strategy leveraging state complementarity", "Build comprehensive multi-state compliance framework", "Create risk assessment and mitigation for diverse operations", "Establish performance monitoring for multi-location ROI"]',
 '{"templates": ["Multi-State Framework", "Location Selection Matrix", "Compliance Coordinator"], "tools": ["Multi-State Optimizer", "Location ROI Calculator"], "readings": ["Multi-State Operations Guide", "Cross-State Compliance Handbook"]}',
 90, 200, 19, NOW(), NOW()),

('p7_l20', (SELECT id FROM p7_modules WHERE "orderIndex" = 7), 20, 
 'Government Relations & Stakeholder Management Excellence',
 'Build systematic government relations across states: stakeholder mapping, relationship protocols, advocacy strategies, and crisis management.

Government Relations Mastery:
• Multi-state stakeholder mapping and engagement prioritization
• Communication strategies for different government levels and cultures
• Policy advocacy and beneficial change influence techniques
• Long-term partnership development with government bodies
• Crisis management and relationship recovery protocols

Master relationship aspects determining long-term success.',
 '["Map stakeholders across target states with engagement priorities", "Develop communication protocols for different government levels", "Create policy advocacy framework for beneficial changes", "Design crisis management for government relationship challenges", "Establish long-term partnership development strategies", "Build community engagement supporting government relations"]',
 '{"templates": ["Stakeholder Mapping Framework", "Government Relations Protocol", "Advocacy Strategy Guide"], "tools": ["Relationship Tracker", "Engagement Planner"], "readings": ["Government Relations Best Practices", "Multi-State Stakeholder Management"]}',
 90, 200, 20, NOW(), NOW()),

('p7_l21', (SELECT id FROM p7_modules WHERE "orderIndex" = 7), 21, 
 'Implementation Timeline & Project Management',
 'Create actionable implementation plan: phased expansion, resource allocation, milestone tracking, and continuous optimization.

Implementation Excellence:
• Phased expansion with state prioritization and sequencing
• Resource allocation and team structure for multi-state operations
• Milestone tracking and progress monitoring systems
• Risk management and contingency planning for implementation
• Performance measurement and continuous improvement processes

Transform strategy into executable implementation plan.',
 '["Create comprehensive implementation timeline with state priorities", "Design resource allocation and team structure for expansion", "Develop milestone tracking and progress monitoring system", "Build contingency planning for risks and implementation delays", "Establish performance measurement for all state initiatives", "Create continuous improvement protocol for strategy optimization"]',
 '{"templates": ["Implementation Master Plan", "Multi-State Project Tracker", "Performance Dashboard"], "tools": ["Implementation Planner", "Progress Tracker"], "readings": ["Multi-State Project Management", "Implementation Best Practices"]}',
 90, 200, 21, NOW(), NOW()),

-- Module 8: Sector-Specific Benefits (Days 22-24)
('p7_l22', (SELECT id FROM p7_modules WHERE "orderIndex" = 8), 22, 
 'Manufacturing & Heavy Industries State Optimization',
 'Sector-specific state advantages: automotive clusters, textile regions, chemical hubs, steel corridors, and electronics zones.

Manufacturing Sector Mastery:
• Automotive: Tamil Nadu, Maharashtra, Karnataka cluster advantages
• Textiles: Regional specializations and export benefits across states
• Chemicals: Resource proximity and infrastructure optimization
• Electronics: SEZ benefits and skilled workforce availability
• Food Processing: Agricultural integration and market access

Master manufacturing-specific state selection and optimization.',
 '["Map automotive cluster advantages and supplier ecosystem benefits", "Analyze textile regional specializations for your product category", "Evaluate chemical industry setup considering resources and regulations", "Assess electronics manufacturing including SEZ advantages", "Map food processing with agricultural integration potential", "Create manufacturing sector state selection strategy"]',
 '{"templates": ["Manufacturing Benefits Matrix", "Cluster Integration Framework", "Sector Optimization Guide"], "tools": ["Manufacturing Location Optimizer", "Sector Calculator"], "readings": ["Manufacturing Competitiveness Report", "Industrial Cluster Analysis"]}',
 90, 200, 22, NOW(), NOW()),

('p7_l23', (SELECT id FROM p7_modules WHERE "orderIndex" = 8), 23, 
 'Technology & Services Hub Optimization',
 'IT and services sector state advantages: Silicon Valley ecosystems, emerging hubs, cost optimization, and innovation zones.

Technology Sector Strategy:
• Bangalore: Silicon Valley ecosystem and innovation advantages
• Hyderabad: Emerging tech hub with competitive costs
• Pune, Chennai: IT services and product development clusters
• NCR: Government and enterprise market access
• Tier-2 cities: Cost optimization and emerging talent pools

Optimize technology presence across India''s IT landscape.',
 '["Analyze Bangalore Silicon Valley advantages for your tech model", "Evaluate Hyderabad emerging ecosystem and cost benefits", "Map IT services opportunities across established hubs", "Assess Tier-2 city advantages for cost and talent optimization", "Create multi-hub technology strategy for coverage and costs", "Develop innovation ecosystem integration across tech centers"]',
 '{"templates": ["IT Hub Matrix", "Technology Ecosystem Navigator", "Multi-Hub Framework"], "tools": ["Tech Hub Optimizer", "Innovation Mapper"], "readings": ["India IT Landscape Report", "Tech Hub Analysis"]}',
 90, 200, 23, NOW(), NOW()),

('p7_l24', (SELECT id FROM p7_modules WHERE "orderIndex" = 8), 24, 
 'Agriculture & Rural Business State Integration',
 'Agri-business opportunities: crop-specific advantages, processing infrastructure, rural markets, export potential, and cooperative integration.

Agri-Business State Strategy:
• Agricultural processing: State crop advantages and infrastructure
• Rural market access: Distribution strategies and penetration
• Cooperative integration: Leveraging existing networks
• Export promotion: International market access for agricultural products
• AgTech opportunities: Government digitalization support

Master agriculture-state government intersection opportunities.',
 '["Map agricultural resource advantages and processing opportunities", "Develop rural market penetration leveraging state networks", "Analyze cooperative integration for agri-business development", "Evaluate export promotion and international market access", "Assess AgTech opportunities and government support", "Create comprehensive agri-business multi-state strategy"]',
 '{"templates": ["Agri-Business Matrix", "Rural Integration Framework", "Export Strategy Guide"], "tools": ["Agricultural Mapper", "Rural Access Planner"], "readings": ["Agriculture Policy State Analysis", "Rural Market Development"]}',
 90, 200, 24, NOW(), NOW()),

-- Module 9: Financial Planning & Optimization (Days 25-27)
('p7_l25', (SELECT id FROM p7_modules WHERE "orderIndex" = 9), 25, 
 'Cost-Benefit Analysis & 30-50% Savings Achievement',
 'Master financial analysis for state benefits: ROI calculation, cost savings quantification, break-even analysis, and financial modeling.

Financial Optimization:
• Comprehensive cost-benefit analysis for state benefit evaluation
• ROI frameworks for different state advantage categories
• 30-50% cost savings quantification and achievement strategies
• Break-even analysis for multi-state expansion investments
• Financial modeling for long-term state benefit optimization

Develop sophisticated financial framework for state ROI maximization.',
 '["Create comprehensive cost-benefit model for target states", "Develop ROI calculation quantifying all benefit categories", "Build financial model demonstrating 30-50% cost savings potential", "Create break-even analysis for multi-state investments", "Design risk assessment for state-dependent benefits", "Establish ongoing financial monitoring for benefit performance"]',
 '{"templates": ["State ROI Calculator", "Multi-State Financial Model", "Cost Savings Framework"], "tools": ["Financial Optimizer", "ROI Dashboard"], "readings": ["State Benefits Financial Guide", "Multi-State Investment Planning"]}',
 90, 220, 25, NOW(), NOW()),

('p7_l26', (SELECT id FROM p7_modules WHERE "orderIndex" = 9), 26, 
 'Tax Planning & Incentive Maximization',
 'Navigate multi-state tax implications: GST optimization, income tax benefits, incentive stacking, and compliance coordination.

Tax Optimization Strategy:
• State tax structure analysis and optimization opportunities
• GST implications and multi-state operation optimization
• Income tax benefits and state-specific exemptions
• Incentive stacking for maximum benefit extraction
• Transfer pricing and multi-state compliance coordination

Master tax-efficient structures with maximum incentive utilization.',
 '["Analyze state tax structures for optimization opportunities", "Create GST optimization strategy for multi-state operations", "Map income tax benefits and exemption criteria", "Develop incentive stacking combining multiple programs", "Design transfer pricing policy for multi-state operations", "Establish comprehensive tax compliance coordination"]',
 '{"templates": ["Multi-State Tax Optimizer", "Incentive Stacking Calculator", "Tax Compliance Framework"], "tools": ["Tax Planning Tool", "Compliance Tracker"], "readings": ["Multi-State Tax Guide", "Incentive Tax Implications"]}',
 90, 220, 26, NOW(), NOW()),

('p7_l27', (SELECT id FROM p7_modules WHERE "orderIndex" = 9), 27, 
 'Investment Strategy & Funding Integration',
 'Integrate state benefits with funding: investor presentations, capital planning, valuation enhancement, and exit strategy consideration.

Investment Integration:
• Presenting state benefits for enhanced investor valuations
• Capital planning integration with state incentives
• Location strategy impact on funding and investor attractiveness
• Government grants integration with private funding
• Exit strategy with state benefit dependencies

Optimize state benefits within comprehensive investment strategy.',
 '["Develop investor presentation highlighting state advantages", "Integrate state incentives with capital and funding timeline", "Create location strategy enhancing investor attractiveness", "Map government grants complementing private funding", "Design exit strategy considering benefit dependencies", "Develop international investor strategy for state operations"]',
 '{"templates": ["Investor Presentation Framework", "Funding Integration Guide", "Capital Planning with Benefits"], "tools": ["Investment Planner", "Benefits Valuation Calculator"], "readings": ["State Benefits Investment Guide", "Location Strategy for Funding"]}',
 90, 220, 27, NOW(), NOW()),

-- Module 10: Advanced Strategies (Days 28-30) - Enhanced XP and time
('p7_l28', (SELECT id FROM p7_modules WHERE "orderIndex" = 10), 28, 
 'Policy Monitoring & Future-Proofing Mastery',
 'Build advanced systems for policy tracking, change anticipation, adaptation strategies, and long-term benefit sustainability.

Future-Proofing Excellence:
• Advanced policy monitoring and early warning systems
• Government relationship intelligence and advance policy access
• Scenario planning for policy changes and business impact
• Rapid adaptation strategies for evolving benefit structures
• Long-term stakeholder relationship maintenance protocols

Create sustainable policy navigation and benefit optimization.',
 '["Establish comprehensive policy monitoring across all states", "Build early warning system for changes affecting benefits", "Create scenario planning for policy evolution possibilities", "Develop rapid adaptation protocols for benefit changes", "Design stakeholder relationship maintenance for long-term access", "Establish continuous strategy refinement based on policy evolution"]',
 '{"templates": ["Policy Monitoring System", "Change Adaptation Protocol", "Future Strategy Framework"], "tools": ["Policy Alert System", "Adaptation Planner"], "readings": ["Policy Evolution in India", "Change Management in Government"]}',
 120, 250, 28, NOW(), NOW()),

('p7_l29', (SELECT id FROM p7_modules WHERE "orderIndex" = 10), 29, 
 'Advanced Government Relations & Industry Leadership',
 'Master high-level government relations, policy advocacy, thought leadership, and competitive intelligence for sustained advantages.

Advanced Relations Mastery:
• High-level government relationship building across states
• Policy advocacy and beneficial change influence strategies
• Industry thought leadership and government forum positioning
• Cross-state relationship coordination for maximum influence
• Crisis management and rapid relationship recovery techniques

Develop sophisticated government relations for competitive advantage.',
 '["Build high-level relationship strategy across states and center", "Develop policy advocacy for industry-beneficial changes", "Create thought leadership positioning in government forums", "Design cross-state coordination for influence maximization", "Establish crisis management for relationship challenges", "Build competitive intelligence through government networks"]',
 '{"templates": ["Advanced Relations Framework", "Policy Advocacy Playbook", "Leadership Positioning Guide"], "tools": ["Relationship Influence Tracker", "Advocacy Measurer"], "readings": ["Advanced Government Relations", "Policy Leadership Strategies"]}',
 120, 250, 29, NOW(), NOW()),

('p7_l30', (SELECT id FROM p7_modules WHERE "orderIndex" = 10), 30, 
 'State Ecosystem Mastery & Leadership Implementation',
 'Synthesize complete state mastery: implementation roadmap, performance optimization, scaling strategies, and ecosystem leadership.

Complete Mastery Integration:
• Master implementation roadmap for all state strategies
• Performance measurement and continuous optimization systems
• Scaling strategies for expanding benefit utilization over time
• Team development for state benefit management capability
• Technology integration and automation for ongoing optimization
• Long-term vision for state ecosystem leadership position

Achieve comprehensive state benefit optimization mastery.',
 '["Synthesize complete state strategy into master roadmap", "Establish performance measurement and optimization system", "Create scaling strategy for expanding utilization over growth", "Design team development for internal capability building", "Integrate technology for automated monitoring and optimization", "Develop long-term vision for state ecosystem leadership"]',
 '{"templates": ["Master Implementation Roadmap", "Optimization Framework", "Leadership Strategy"], "tools": ["Complete Integrator", "Master Dashboard"], "readings": ["State Mastery Implementation", "Ecosystem Leadership Guide"]}',
 120, 250, 30, NOW(), NOW());

-- Final summary
SELECT 
  'P7 State-wise Scheme Map - 30 Lessons Successfully Deployed!' as status,
  COUNT(*) as total_lessons,
  MIN(day) as first_day,
  MAX(day) as last_day,
  SUM("estimatedTime") as total_minutes,
  SUM("xpReward") as total_xp
FROM "Lesson" 
WHERE "moduleId" IN (
  SELECT id FROM "Module" 
  WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
);

COMMIT;