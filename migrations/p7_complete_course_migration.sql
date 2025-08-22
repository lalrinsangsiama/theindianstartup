-- P7: State Ecosystem Mastery - Complete Course Migration
-- Migrates all 30 days of content with modules, lessons, and resources
-- Total: 1 Product, 10 Modules, 30 Lessons

-- ============================================================================
-- PRODUCT CREATION
-- ============================================================================

-- Insert P7 Product with enhanced details
INSERT INTO "Product" (
  "id",
  "code", 
  "title",
  "description",
  "price",
  "isBundle",
  "bundleProducts",
  "estimatedDays",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_state_ecosystem_mastery',
  'P7',
  'State Ecosystem Mastery - Complete Navigation',
  'Master India''s state ecosystem with comprehensive coverage of all states and UTs. Transform from an outsider to a state ecosystem insider who knows every makerspace, every innovation center, every startup competition, every government official, and every opportunity in your state - building relationships and accessing resources that give you an unfair competitive advantage.',
  499900, -- ₹4,999
  false,
  '{}',
  30,
  NOW(),
  NOW()
);

-- ============================================================================
-- MODULE CREATION (10 Modules)
-- ============================================================================

-- Module 1: State Ecosystem Architecture (Days 1-3)
INSERT INTO "Module" (
  "id",
  "productId",
  "title", 
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_1_ecosystem_architecture',
  'p7_state_ecosystem_mastery',
  'State Ecosystem Architecture',
  'Foundation: Understanding Your State''s Complete Startup Infrastructure. Learn to map government infrastructure, physical resources, financial ecosystem, and recognition opportunities.',
  1,
  NOW(),
  NOW()
);

-- Module 2: State Innovation Infrastructure (Days 4-6)
INSERT INTO "Module" (
  "id",
  "productId", 
  "title",
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_2_innovation_infrastructure',
  'p7_state_ecosystem_mastery',
  'State Innovation Infrastructure',
  'Access: Makerspaces, Labs, Incubators, and Innovation Centers. Master the utilization of physical innovation infrastructure for product development, testing, and scaling.',
  2,
  NOW(),
  NOW()
);

-- Module 3: State Department Navigation (Days 7-9)
INSERT INTO "Module" (
  "id",
  "productId",
  "title",
  "description", 
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_3_department_navigation',
  'p7_state_ecosystem_mastery',
  'State Department Navigation',
  'Relationships: Working with Industries, MSME, IT, and Other Departments. Build strategic relationships with government departments for maximum resource access.',
  3,
  NOW(),
  NOW()
);

-- Module 4: State Startup Policy Mastery (Days 10-12)
INSERT INTO "Module" (
  "id",
  "productId",
  "title",
  "description",
  "orderIndex", 
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_4_policy_mastery',
  'p7_state_ecosystem_mastery',
  'State Startup Policy Mastery',
  'Benefits: Leveraging Your State''s Specific Startup Policy. Master policy benefit optimization, application strategies, and regulatory compliance for maximum advantage.',
  4,
  NOW(),
  NOW()
);

-- Module 5: State Competitions & Challenges (Days 13-15)
INSERT INTO "Module" (
  "id",
  "productId",
  "title",
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_5_competitions_challenges',
  'p7_state_ecosystem_mastery',
  'State Competitions & Challenges',
  'Recognition: Winning State-Level Competitions and Awards. Develop systematic approach to winning competitions, challenges, and securing recognition for funding and credibility.',
  5,
  NOW(),
  NOW()
);

-- Module 6: State Industrial Infrastructure (Days 16-18)
INSERT INTO "Module" (
  "id",
  "productId",
  "title",
  "description",
  "orderIndex",
  "createdAt", 
  "updatedAt"
) VALUES (
  'p7_module_6_industrial_infrastructure',
  'p7_state_ecosystem_mastery',
  'State Industrial Infrastructure', 
  'Manufacturing: Accessing Industrial Parks, SEZs, and Manufacturing Zones. Leverage industrial infrastructure for manufacturing, scaling, and export advantages.',
  6,
  NOW(),
  NOW()
);

-- Module 7: State University & Research Ecosystem (Days 19-21)
INSERT INTO "Module" (
  "id",
  "productId",
  "title",
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_7_university_research',
  'p7_state_ecosystem_mastery',
  'State University & Research Ecosystem',
  'Innovation: Leveraging Academic Partnerships and Research Resources. Build strategic university partnerships for talent, research, and innovation collaboration.',
  7,
  NOW(),
  NOW()
);

-- Module 8: State Procurement & Pilot Programs (Days 22-24)
INSERT INTO "Module" (
  "id",
  "productId",
  "title",
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_8_procurement_pilots',
  'p7_state_ecosystem_mastery',
  'State Procurement & Pilot Programs',
  'Revenue: Becoming a Vendor to State Government and PSUs. Access government procurement opportunities and pilot projects for assured revenue and validation.',
  8,
  NOW(),
  NOW()
);

-- Module 9: District & Local Ecosystem (Days 25-27)
INSERT INTO "Module" (
  "id", 
  "productId",
  "title",
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_9_district_local',
  'p7_state_ecosystem_mastery',
  'District & Local Ecosystem',
  'Local Power: Leveraging District-Level Resources and Connections. Build strong district-level relationships and access local ecosystem resources for immediate support.',
  9,
  NOW(),
  NOW()
);

-- Module 10: State Ecosystem Integration (Days 28-30)
INSERT INTO "Module" (
  "id",
  "productId", 
  "title",
  "description",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_module_10_ecosystem_integration',
  'p7_state_ecosystem_mastery',
  'State Ecosystem Integration',
  'Mastery: Building Long-Term Strategic Positioning. Integrate all learnings into comprehensive strategy for long-term ecosystem leadership and scaling.',
  10,
  NOW(),
  NOW()
);

-- ============================================================================
-- LESSON CREATION (30 Lessons)
-- ============================================================================

-- MODULE 1 LESSONS (Days 1-3)

-- Day 1: Complete State Ecosystem Mapping and Intelligence System
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_01_ecosystem_mapping',
  'p7_module_1_ecosystem_architecture',
  1,
  'Complete State Ecosystem Mapping and Intelligence System',
  'Create a comprehensive map of your state''s startup ecosystem and build an intelligence system to track opportunities. Learn to map government infrastructure, physical resources, financial ecosystem, and recognition opportunities.',
  '["Complete State Ecosystem Audit", "Setup Intelligence System", "Create Navigation Database", "Map 50+ ecosystem elements", "Identify 25+ key contacts"]',
  '["State Ecosystem Map Template", "Infrastructure Database", "Contact Directory", "Opportunity Calendar", "Intelligence Dashboard"]',
  120, -- 2 hours
  100,
  1,
  NOW(),
  NOW()
);

-- Day 2: State Department Deep Dive - Advanced Relationship Strategy  
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day", 
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_02_department_relations',
  'p7_module_1_ecosystem_architecture',
  2,
  'State Department Deep Dive - Advanced Relationship Strategy',
  'Master advanced strategies for working with different state departments to access maximum resources, support, and opportunities. Build strategic relationships with Industries, IT, MSME, and other departments.',
  '["Department Prioritization", "Contact Database Development", "Benefit Optimization Planning", "Relationship Strategy", "Engagement Calendar"]',
  '["Department Opportunity Matrix", "Officials Contact Database", "Benefit Eligibility Assessment", "Engagement Strategy Document", "Meeting Templates"]',
  150, -- 2.5 hours
  125,
  2,
  NOW(),
  NOW()
);

-- Day 3: State Innovation Infrastructure - Advanced Access and Utilization
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title", 
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_03_innovation_infrastructure',
  'p7_module_1_ecosystem_architecture',
  3,
  'State Innovation Infrastructure - Advanced Access and Utilization',
  'Master the complete utilization of physical innovation infrastructure in your state for product development, testing, scaling, and competitive advantage. Access makerspaces, labs, incubators, and innovation centers.',
  '["Infrastructure Assessment", "Access Strategy Development", "Project Planning", "Membership Applications", "Equipment Training"]',
  '["Innovation Infrastructure Map", "Access Strategy Document", "Project Pipeline Plan", "Budget Allocation", "Equipment Training Schedule"]',
  180, -- 3 hours
  150,
  3,
  NOW(),
  NOW()
);

-- MODULE 2 LESSONS (Days 4-6)

-- Day 4: Mastering State Incubators and Accelerators
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent", 
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_04_incubators_accelerators',
  'p7_module_2_innovation_infrastructure',
  4,
  'Mastering State Incubators and Accelerators',
  'Navigate and leverage your state''s incubation ecosystem for maximum growth acceleration. Understand different types of incubators, application processes, and optimization strategies.',
  '["Incubator Research", "Application Preparation", "Selection Strategy", "Networking Plan", "Value Maximization"]',
  '["Incubator Database", "Application Templates", "Pitch Deck Template", "Selection Criteria", "Success Metrics"]',
  120,
  100,
  4,
  NOW(),
  NOW()
);

-- Day 5: State Competitions, Challenges, and Awards
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime", 
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_05_competitions_awards',
  'p7_module_2_innovation_infrastructure',
  5,
  'State Competitions, Challenges, and Awards',
  'Win state competitions for funding, recognition, and strategic advantages. Master the competition ecosystem, application strategies, and success techniques.',
  '["Competition Research", "Application Strategy", "Pitch Preparation", "Network Building", "Success Tracking"]',
  '["Competition Calendar", "Application Templates", "Pitch Deck Framework", "Success Metrics", "Network Database"]',
  135,
  110,
  5,
  NOW(),
  NOW()
);

-- Day 6: State Industrial Parks, SEZs, and Manufacturing Zones
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_06_industrial_infrastructure',
  'p7_module_2_innovation_infrastructure',
  6,
  'State Industrial Parks, SEZs, and Manufacturing Zones',
  'Access state industrial infrastructure for manufacturing and scaling operations. Understand industrial parks, SEZs, and manufacturing cluster benefits.',
  '["Infrastructure Assessment", "Location Selection", "Application Process", "Benefit Optimization", "Setup Planning"]',
  '["Industrial Park Database", "SEZ Benefits Guide", "Application Checklist", "Cost Calculator", "Setup Timeline"]',
  150,
  125,
  6,
  NOW(),
  NOW()
);

-- MODULE 3 LESSONS (Days 7-9)

-- Day 7: Working with State Industries Department
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_07_industries_department',
  'p7_module_3_department_navigation',
  7,
  'Working with State Industries Department',
  'Build strategic relationships with Industries Department for long-term advantages. Master the department structure, engagement strategies, and benefit optimization.',
  '["Department Mapping", "Relationship Building", "Benefit Applications", "Regular Engagement", "Value Creation"]',
  '["Department Structure Guide", "Engagement Strategy", "Benefit Matrix", "Application Templates", "Relationship Tracker"]',
  120,
  100,
  7,
  NOW(),
  NOW()
);

-- Day 8: State MSME and Skill Development Departments
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_08_msme_skill_development',
  'p7_module_3_department_navigation',
  8,
  'State MSME and Skill Development Departments',
  'Leverage MSME benefits and skill development resources for growth. Access exclusive MSME advantages and talent pipeline creation opportunities.',
  '["MSME Registration", "Benefit Optimization", "Skill Programs", "Talent Pipeline", "Department Relations"]',
  '["MSME Benefits Guide", "Skill Program Database", "Registration Templates", "Talent Strategy", "Department Contacts"]',
  135,
  110,
  8,
  NOW(),
  NOW()
);

-- Day 9: Specialized Departments - IT, Agriculture, Health, Tourism
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_09_specialized_departments',
  'p7_module_3_department_navigation',
  9,
  'Specialized Departments - IT, Agriculture, Health, Tourism',
  'Access sector-specific department resources for specialized support. Engage with IT, Agriculture, Health, and Tourism departments based on your sector focus.',
  '["Sector Mapping", "Department Selection", "Specialized Programs", "Sector Benefits", "Strategic Partnerships"]',
  '["Sector Department Guide", "Program Database", "Application Templates", "Partnership Framework", "Success Metrics"]',
  150,
  125,
  9,
  NOW(),
  NOW()
);

-- MODULE 4 LESSONS (Days 10-12)

-- Day 10: Decoding Your State's Startup Policy
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_10_startup_policy',
  'p7_module_4_policy_mastery',
  10,
  'Decoding Your State''s Startup Policy',
  'Master your state''s startup policy to access maximum benefits. Understand policy structure, benefit categories, and maximization strategies.',
  '["Policy Analysis", "Benefit Mapping", "Eligibility Assessment", "Application Strategy", "Maximization Plan"]',
  '["Policy Analysis Framework", "Benefit Database", "Eligibility Checker", "Application Guide", "Maximization Strategy"]',
  120,
  100,
  10,
  NOW(),
  NOW()
);

-- Day 11: Policy Benefit Optimization and Application Strategy
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_11_benefit_optimization',
  'p7_module_4_policy_mastery',
  11,
  'Policy Benefit Optimization and Application Strategy',
  'Master the art of maximizing benefits from your state''s startup policy through strategic application and optimization techniques. Learn advanced benefit stacking and success multipliers.',
  '["Benefit Audit", "Optimization Planning", "Success Multipliers", "Application Sequence", "ROI Maximization"]',
  '["Benefit Calculator", "Optimization Strategy", "Application Calendar", "Success Framework", "ROI Tracker"]',
  180,
  150,
  11,
  NOW(),
  NOW()
);

-- Day 12: Regulatory Compliance and Government Relations Mastery
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_12_compliance_relations',
  'p7_module_4_policy_mastery',
  12,
  'Regulatory Compliance and Government Relations Mastery',
  'Build bulletproof regulatory compliance and develop strategic government relationships that provide long-term competitive advantages.',
  '["Compliance Audit", "Relations Strategy", "System Implementation", "Risk Mitigation", "Strategic Engagement"]',
  '["Compliance Framework", "Relations Strategy", "Tracking System", "Risk Assessment", "Engagement Plan"]',
  200,
  175,
  12,
  NOW(),
  NOW()
);

-- MODULE 5 LESSONS (Days 13-15)

-- Day 13: State Startup Grand Challenges and Innovation Competitions
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_13_grand_challenges',
  'p7_module_5_competitions_challenges',
  13,
  'State Startup Grand Challenges and Innovation Competitions',
  'Win major state competitions for funding, recognition, and strategic advantages. Master competition lifecycle management and winning strategies.',
  '["Competition Research", "Preparation Strategy", "Application Excellence", "Pitch Mastery", "Network Leverage"]',
  '["Competition Database", "Preparation Framework", "Application Templates", "Pitch Guidelines", "Success Metrics"]',
  150,
  125,
  13,
  NOW(),
  NOW()
);

-- Day 14: District and University Level Competitions
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_14_district_university_competitions',
  'p7_module_5_competitions_challenges',
  14,
  'District and University Level Competitions',
  'Build momentum through smaller competitions before targeting major ones. Access district-level and university competition opportunities.',
  '["Local Competition Mapping", "University Partnerships", "Application Strategy", "Momentum Building", "Network Development"]',
  '["Local Competition Guide", "University Database", "Application Framework", "Success Tracker", "Network Plan"]',
  120,
  100,
  14,
  NOW(),
  NOW()
);

-- Day 15: State Awards and Recognition Programs
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_15_awards_recognition',
  'p7_module_5_competitions_challenges',
  15,
  'State Awards and Recognition Programs',
  'Leverage awards for credibility, network, and business growth. Master the state awards ecosystem and post-award maximization strategies.',
  '["Awards Research", "Application Strategy", "Selection Process", "Award Leverage", "Long-term Value"]',
  '["Awards Database", "Application Guide", "Selection Criteria", "Leverage Strategy", "Value Maximization"]',
  135,
  110,
  15,
  NOW(),
  NOW()
);

-- MODULE 6 LESSONS (Days 16-18)

-- Day 16: Accessing State Industrial Parks and Clusters
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_16_industrial_parks',
  'p7_module_6_industrial_infrastructure',
  16,
  'Accessing State Industrial Parks and Clusters',
  'Leverage industrial infrastructure for manufacturing and scale. Access industrial parks, understand benefits, and optimize location selection.',
  '["Park Assessment", "Location Selection", "Application Process", "Benefit Optimization", "Cluster Integration"]',
  '["Industrial Park Database", "Selection Framework", "Application Guide", "Benefits Calculator", "Cluster Map"]',
  150,
  125,
  16,
  NOW(),
  NOW()
);

-- Day 17: Special Economic Zones (SEZs) and Export Benefits
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_17_sez_export_benefits',
  'p7_module_6_industrial_infrastructure',
  17,
  'Special Economic Zones (SEZs) and Export Benefits',
  'Understand SEZ advantages for export-oriented businesses. Master SEZ benefits, selection criteria, and export optimization strategies.',
  '["SEZ Research", "Benefit Analysis", "Selection Criteria", "Application Process", "Export Strategy"]',
  '["SEZ Database", "Benefits Framework", "Selection Guide", "Application Templates", "Export Plan"]',
  135,
  110,
  17,
  NOW(),
  NOW()
);

-- Day 18: State Manufacturing and MSME Clusters
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_18_manufacturing_clusters',
  'p7_module_6_industrial_infrastructure',
  18,
  'State Manufacturing and MSME Clusters',
  'Leverage cluster benefits for competitive advantage. Access manufacturing and MSME clusters for shared resources and economies of scale.',
  '["Cluster Research", "Benefit Analysis", "Integration Strategy", "Cost Optimization", "Partnership Development"]',
  '["Cluster Database", "Benefits Guide", "Integration Plan", "Cost Calculator", "Partnership Framework"]',
  120,
  100,
  18,
  NOW(),
  NOW()
);

-- MODULE 7 LESSONS (Days 19-21)

-- Day 19: University Partnerships and Student Talent
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_19_university_partnerships',
  'p7_module_7_university_research',
  19,
  'University Partnerships and Student Talent',
  'Build strategic university partnerships for talent, research, and resources. Access student talent pipeline and academic collaboration opportunities.',
  '["University Mapping", "Partnership Strategy", "Talent Pipeline", "Collaboration Framework", "Value Creation"]',
  '["University Database", "Partnership Guide", "Talent Strategy", "Collaboration Templates", "Success Metrics"]',
  135,
  110,
  19,
  NOW(),
  NOW()
);

-- Day 20: State Research Institutions and R&D Support
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_20_research_institutions',
  'p7_module_7_university_research',
  20,
  'State Research Institutions and R&D Support',
  'Access state research infrastructure for product development. Leverage research institutions, testing facilities, and R&D support programs.',
  '["Research Mapping", "Facility Access", "Collaboration Development", "R&D Programs", "Technology Transfer"]',
  '["Research Directory", "Access Guide", "Collaboration Framework", "Program Database", "Transfer Process"]',
  120,
  100,
  20,
  NOW(),
  NOW()
);

-- Day 21: Student Entrepreneurship and Campus Resources
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_21_student_entrepreneurship',
  'p7_module_7_university_research',
  21,
  'Student Entrepreneurship and Campus Resources',
  'Leverage student entrepreneurship ecosystem for growth. Access campus resources, student talent, and entrepreneurship programs.',
  '["Campus Resource Mapping", "Student Program Access", "Talent Acquisition", "Resource Utilization", "Program Integration"]',
  '["Campus Resource Guide", "Program Database", "Talent Strategy", "Resource Plan", "Integration Framework"]',
  105,
  90,
  21,
  NOW(),
  NOW()
);

-- MODULE 8 LESSONS (Days 22-24)

-- Day 22: Becoming a State Government Vendor
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_22_government_vendor',
  'p7_module_8_procurement_pilots',
  22,
  'Becoming a State Government Vendor',
  'Access government procurement opportunities for assured revenue. Master vendor registration, procurement processes, and contract winning strategies.',
  '["Vendor Registration", "Procurement Understanding", "Proposal Development", "Contract Winning", "Relationship Building"]',
  '["Vendor Registration Guide", "Procurement Framework", "Proposal Templates", "Success Strategy", "Relationship Plan"]',
  150,
  125,
  22,
  NOW(),
  NOW()
);

-- Day 23: State Pilot Projects and PoC Opportunities
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_23_pilot_projects',
  'p7_module_8_procurement_pilots',
  23,
  'State Pilot Projects and PoC Opportunities',
  'Partner with government for pilot projects and proof of concepts. Access pilot opportunities, funding, and validation through government partnerships.',
  '["Pilot Opportunity Mapping", "PoC Development", "Government Partnership", "Funding Access", "Validation Strategy"]',
  '["Pilot Database", "PoC Framework", "Partnership Guide", "Funding Templates", "Validation Plan"]',
  135,
  110,
  23,
  NOW(),
  NOW()
);

-- Day 24: State PSU Partnerships and Corporate Contracts
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_24_psu_partnerships',
  'p7_module_8_procurement_pilots',
  24,
  'State PSU Partnerships and Corporate Contracts',
  'Build partnerships with state PSUs for scale and stability. Access PSU opportunities, corporate contracts, and strategic partnerships.',
  '["PSU Mapping", "Partnership Development", "Contract Strategy", "Relationship Building", "Scale Planning"]',
  '["PSU Database", "Partnership Framework", "Contract Guide", "Relationship Strategy", "Scale Plan"]',
  120,
  100,
  24,
  NOW(),
  NOW()
);

-- MODULE 9 LESSONS (Days 25-27)

-- Day 25: District Administration and Local Support
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_25_district_administration',
  'p7_module_9_district_local',
  25,
  'District Administration and Local Support',
  'Build strong district-level relationships for immediate support. Navigate district administration and access local support systems.',
  '["District Mapping", "Administration Engagement", "Local Support Access", "Relationship Building", "Problem Resolution"]',
  '["District Guide", "Administration Framework", "Support Database", "Relationship Plan", "Resolution Process"]',
  120,
  100,
  25,
  NOW(),
  NOW()
);

-- Day 26: Municipal Corporations and Urban Local Bodies
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_26_municipal_corporations',
  'p7_module_9_district_local',
  26,
  'Municipal Corporations and Urban Local Bodies',
  'Navigate urban local bodies for permissions and support. Access municipal services, permits, and urban development opportunities.',
  '["Municipal Mapping", "Permission Processes", "Service Access", "Development Opportunities", "Compliance Management"]',
  '["Municipal Guide", "Permission Framework", "Service Database", "Opportunity Map", "Compliance Tracker"]',
  105,
  90,
  26,
  NOW(),
  NOW()
);

-- Day 27: Local Business Associations and Chambers
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_27_business_associations',
  'p7_module_9_district_local',
  27,
  'Local Business Associations and Chambers',
  'Integrate with local business community for support and growth. Access chambers of commerce, industry associations, and business networks.',
  '["Association Mapping", "Network Integration", "Membership Strategy", "Value Creation", "Relationship Building"]',
  '["Association Database", "Integration Plan", "Membership Guide", "Value Framework", "Network Strategy"]',
  90,
  80,
  27,
  NOW(),
  NOW()
);

-- MODULE 10 LESSONS (Days 28-30)

-- Day 28: Building Your State Ecosystem Strategy
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_28_ecosystem_strategy',
  'p7_module_10_ecosystem_integration',
  28,
  'Building Your State Ecosystem Strategy',
  'Create an integrated strategy to maximize state ecosystem benefits. Develop comprehensive approach for long-term ecosystem leadership.',
  '["Strategy Development", "Integration Planning", "Benefit Maximization", "Relationship Optimization", "Long-term Positioning"]',
  '["Strategy Framework", "Integration Plan", "Benefit Tracker", "Relationship Matrix", "Success Scorecard"]',
  180,
  150,
  28,
  NOW(),
  NOW()
);

-- Day 29: Long-term State Government Relations
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_29_longterm_relations',
  'p7_module_10_ecosystem_integration',
  29,
  'Long-term State Government Relations',
  'Build lasting relationships that survive political and administrative changes. Develop sustainable government relations strategy.',
  '["Relationship Sustainability", "Change Management", "Value Creation", "Long-term Planning", "Legacy Building"]',
  '["Sustainability Framework", "Change Strategy", "Value Plan", "Long-term Roadmap", "Legacy Strategy"]',
  150,
  125,
  29,
  NOW(),
  NOW()
);

-- Day 30: State Ecosystem Success Metrics and Scaling
INSERT INTO "Lesson" (
  "id",
  "moduleId",
  "day",
  "title",
  "briefContent",
  "actionItems",
  "resources",
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p7_lesson_30_success_metrics_scaling',
  'p7_module_10_ecosystem_integration',
  30,
  'State Ecosystem Success Metrics and Scaling',
  'Measure success and scale beyond your home state. Develop metrics framework and multi-state expansion strategy.',
  '["Success Measurement", "Metrics Development", "Scaling Strategy", "Multi-state Planning", "Leadership Development"]',
  '["Metrics Framework", "Success Dashboard", "Scaling Plan", "Multi-state Strategy", "Leadership Roadmap"]',
  120,
  200, -- Higher XP for course completion
  30,
  NOW(),
  NOW()
);

-- ============================================================================
-- ACTIVITY TYPES FOR PORTFOLIO INTEGRATION
-- ============================================================================

-- Insert Activity Types specific to P7 course
INSERT INTO "ActivityType" (
  "id",
  "name", 
  "description",
  "portfolioSection",
  "productCode",
  "moduleId",
  "createdAt",
  "updatedAt"
) VALUES
-- Module 1 Activity Types
('p7_activity_ecosystem_mapping', 'State Ecosystem Mapping', 'Map complete state startup ecosystem with government, infrastructure, and opportunities', 'market-research', 'P7', 'p7_module_1_ecosystem_architecture', NOW(), NOW()),
('p7_activity_department_contacts', 'Government Department Contacts', 'Build comprehensive database of key government officials and department contacts', 'market-research', 'P7', 'p7_module_1_ecosystem_architecture', NOW(), NOW()),
('p7_activity_infrastructure_assessment', 'Innovation Infrastructure Assessment', 'Evaluate and assess state innovation infrastructure for product development', 'product-development', 'P7', 'p7_module_1_ecosystem_architecture', NOW(), NOW()),

-- Module 2 Activity Types  
('p7_activity_incubator_applications', 'Incubator Applications', 'Apply to state incubators and accelerators for funding and support', 'funding', 'P7', 'p7_module_2_innovation_infrastructure', NOW(), NOW()),
('p7_activity_competition_strategy', 'Competition Winning Strategy', 'Develop strategy for winning state competitions and challenges', 'funding', 'P7', 'p7_module_2_innovation_infrastructure', NOW(), NOW()),
('p7_activity_industrial_setup', 'Industrial Infrastructure Setup', 'Secure industrial land and infrastructure for manufacturing operations', 'operations', 'P7', 'p7_module_2_innovation_infrastructure', NOW(), NOW()),

-- Module 3 Activity Types
('p7_activity_department_relationships', 'Department Relationship Building', 'Build strategic relationships with key government departments', 'partnerships', 'P7', 'p7_module_3_department_navigation', NOW(), NOW()),
('p7_activity_msme_registration', 'MSME Registration and Benefits', 'Complete MSME registration and access exclusive benefits', 'legal-compliance', 'P7', 'p7_module_3_department_navigation', NOW(), NOW()),
('p7_activity_sector_partnerships', 'Sector-Specific Partnerships', 'Develop partnerships with IT, Agriculture, Health, or Tourism departments', 'partnerships', 'P7', 'p7_module_3_department_navigation', NOW(), NOW()),

-- Module 4 Activity Types
('p7_activity_policy_optimization', 'Policy Benefit Optimization', 'Optimize state startup policy benefits for maximum advantage', 'funding', 'P7', 'p7_module_4_policy_mastery', NOW(), NOW()),
('p7_activity_compliance_system', 'Regulatory Compliance System', 'Implement bulletproof regulatory compliance management system', 'legal-compliance', 'P7', 'p7_module_4_policy_mastery', NOW(), NOW()),
('p7_activity_government_relations', 'Strategic Government Relations', 'Develop long-term strategic government relationship framework', 'partnerships', 'P7', 'p7_module_4_policy_mastery', NOW(), NOW()),

-- Module 5 Activity Types
('p7_activity_competition_wins', 'Competition and Award Wins', 'Win state competitions and awards for funding and recognition', 'funding', 'P7', 'p7_module_5_competitions_challenges', NOW(), NOW()),
('p7_activity_recognition_strategy', 'Recognition and PR Strategy', 'Leverage awards and recognition for credibility and business growth', 'marketing', 'P7', 'p7_module_5_competitions_challenges', NOW(), NOW()),

-- Module 6 Activity Types
('p7_activity_sez_setup', 'SEZ and Export Setup', 'Establish operations in SEZ for export advantages and tax benefits', 'operations', 'P7', 'p7_module_6_industrial_infrastructure', NOW(), NOW()),
('p7_activity_cluster_integration', 'Manufacturing Cluster Integration', 'Integrate with state manufacturing and MSME clusters for economies of scale', 'operations', 'P7', 'p7_module_6_industrial_infrastructure', NOW(), NOW()),

-- Module 7 Activity Types
('p7_activity_university_partnerships', 'University Research Partnerships', 'Build strategic partnerships with universities for talent and research', 'partnerships', 'P7', 'p7_module_7_university_research', NOW(), NOW()),
('p7_activity_research_collaboration', 'Research Institution Collaboration', 'Collaborate with state research institutions for R&D and innovation', 'product-development', 'P7', 'p7_module_7_university_research', NOW(), NOW()),

-- Module 8 Activity Types
('p7_activity_government_vendor', 'Government Vendor Registration', 'Become registered government vendor for procurement opportunities', 'revenue', 'P7', 'p7_module_8_procurement_pilots', NOW(), NOW()),
('p7_activity_pilot_projects', 'Government Pilot Projects', 'Secure government pilot projects for validation and revenue', 'revenue', 'P7', 'p7_module_8_procurement_pilots', NOW(), NOW()),
('p7_activity_psu_partnerships', 'PSU Strategic Partnerships', 'Develop partnerships with state PSUs for scale and stability', 'partnerships', 'P7', 'p7_module_8_procurement_pilots', NOW(), NOW()),

-- Module 9 Activity Types
('p7_activity_district_relations', 'District Administration Relations', 'Build strong relationships with district administration for local support', 'partnerships', 'P7', 'p7_module_9_district_local', NOW(), NOW()),
('p7_activity_local_networks', 'Local Business Networks', 'Integrate with local chambers and business associations', 'partnerships', 'P7', 'p7_module_9_district_local', NOW(), NOW()),

-- Module 10 Activity Types
('p7_activity_ecosystem_strategy', 'Comprehensive Ecosystem Strategy', 'Develop integrated state ecosystem strategy for long-term success', 'business-model', 'P7', 'p7_module_10_ecosystem_integration', NOW(), NOW()),
('p7_activity_scaling_plan', 'Multi-State Scaling Plan', 'Create plan for scaling beyond home state to multiple states', 'business-model', 'P7', 'p7_module_10_ecosystem_integration', NOW(), NOW()),
('p7_activity_ecosystem_leadership', 'Ecosystem Leadership Development', 'Achieve thought leadership and influence in state startup ecosystem', 'business-model', 'P7', 'p7_module_10_ecosystem_integration', NOW(), NOW());

-- ============================================================================
-- RESOURCES TABLE - P7 TEMPLATES AND TOOLS
-- ============================================================================

-- Insert P7 specific resources and templates
INSERT INTO "Resource" (
  "id",
  "productCode",
  "moduleId", 
  "title",
  "description",
  "type",
  "downloadUrl",
  "fileSize",
  "createdAt",
  "updatedAt"
) VALUES
-- Module 1 Resources
('p7_resource_ecosystem_map', 'P7', 'p7_module_1_ecosystem_architecture', 'State Ecosystem Mapping Template', 'Comprehensive template for mapping state startup ecosystem with government, infrastructure, and opportunities', 'excel', '/resources/p7/state-ecosystem-mapping-template.xlsx', 2048, NOW(), NOW()),
('p7_resource_contact_database', 'P7', 'p7_module_1_ecosystem_architecture', 'Government Contact Database Template', 'Professional database template for managing government contacts and relationships', 'excel', '/resources/p7/government-contact-database.xlsx', 1536, NOW(), NOW()),
('p7_resource_infrastructure_guide', 'P7', 'p7_module_1_ecosystem_architecture', 'Innovation Infrastructure Access Guide', 'Complete guide for accessing and utilizing state innovation infrastructure', 'pdf', '/resources/p7/innovation-infrastructure-guide.pdf', 3072, NOW(), NOW()),

-- Module 2 Resources
('p7_resource_incubator_database', 'P7', 'p7_module_2_innovation_infrastructure', 'State Incubator Database', 'Comprehensive database of state incubators with application details and success strategies', 'excel', '/resources/p7/state-incubator-database.xlsx', 2560, NOW(), NOW()),
('p7_resource_competition_calendar', 'P7', 'p7_module_2_innovation_infrastructure', 'State Competition Calendar', 'Annual calendar of state competitions with deadlines and application strategies', 'excel', '/resources/p7/state-competition-calendar.xlsx', 1792, NOW(), NOW()),
('p7_resource_industrial_park_guide', 'P7', 'p7_module_2_innovation_infrastructure', 'Industrial Park Selection Guide', 'Guide for selecting and accessing state industrial parks and SEZs', 'pdf', '/resources/p7/industrial-park-selection-guide.pdf', 2816, NOW(), NOW()),

-- Module 3 Resources
('p7_resource_department_strategy', 'P7', 'p7_module_3_department_navigation', 'Department Engagement Strategy', 'Strategic framework for engaging with different government departments', 'pdf', '/resources/p7/department-engagement-strategy.pdf', 2304, NOW(), NOW()),
('p7_resource_msme_benefits', 'P7', 'p7_module_3_department_navigation', 'MSME Benefits Optimization Guide', 'Complete guide to accessing and optimizing MSME benefits and registrations', 'pdf', '/resources/p7/msme-benefits-guide.pdf', 2048, NOW(), NOW()),
('p7_resource_sector_partnerships', 'P7', 'p7_module_3_department_navigation', 'Sector Partnership Framework', 'Framework for building partnerships with sector-specific government departments', 'pdf', '/resources/p7/sector-partnership-framework.pdf', 1792, NOW(), NOW()),

-- Module 4 Resources
('p7_resource_policy_analyzer', 'P7', 'p7_module_4_policy_mastery', 'State Policy Benefits Analyzer', 'Interactive tool for analyzing and optimizing state startup policy benefits', 'excel', '/resources/p7/policy-benefits-analyzer.xlsx', 3584, NOW(), NOW()),
('p7_resource_compliance_system', 'P7', 'p7_module_4_policy_mastery', 'Regulatory Compliance Management System', 'Complete system for managing regulatory compliance and government relations', 'excel', '/resources/p7/compliance-management-system.xlsx', 2816, NOW(), NOW()),
('p7_resource_relations_framework', 'P7', 'p7_module_4_policy_mastery', 'Government Relations Framework', 'Strategic framework for building and maintaining government relationships', 'pdf', '/resources/p7/government-relations-framework.pdf', 2560, NOW(), NOW()),

-- Module 5 Resources
('p7_resource_competition_strategy', 'P7', 'p7_module_5_competitions_challenges', 'Competition Winning Strategy Guide', 'Comprehensive guide for winning state competitions and maximizing recognition', 'pdf', '/resources/p7/competition-winning-strategy.pdf', 2304, NOW(), NOW()),
('p7_resource_pitch_templates', 'P7', 'p7_module_5_competitions_challenges', 'State Competition Pitch Templates', 'Professional pitch deck templates optimized for state competitions', 'pptx', '/resources/p7/competition-pitch-templates.pptx', 4096, NOW(), NOW()),
('p7_resource_awards_tracker', 'P7', 'p7_module_5_competitions_challenges', 'Awards and Recognition Tracker', 'System for tracking awards, applications, and leveraging recognition', 'excel', '/resources/p7/awards-recognition-tracker.xlsx', 1536, NOW(), NOW()),

-- Module 6 Resources
('p7_resource_sez_benefits', 'P7', 'p7_module_6_industrial_infrastructure', 'SEZ Benefits Calculator', 'Calculator for analyzing SEZ benefits and export advantages', 'excel', '/resources/p7/sez-benefits-calculator.xlsx', 2048, NOW(), NOW()),
('p7_resource_cluster_guide', 'P7', 'p7_module_6_industrial_infrastructure', 'Manufacturing Cluster Integration Guide', 'Guide for integrating with state manufacturing and MSME clusters', 'pdf', '/resources/p7/cluster-integration-guide.pdf', 2304, NOW(), NOW()),
('p7_resource_location_analyzer', 'P7', 'p7_module_6_industrial_infrastructure', 'Industrial Location Analyzer', 'Tool for analyzing and selecting optimal industrial locations', 'excel', '/resources/p7/location-analyzer.xlsx', 2816, NOW(), NOW()),

-- Module 7 Resources
('p7_resource_university_database', 'P7', 'p7_module_7_university_research', 'University Partnership Database', 'Database of universities with partnership opportunities and contact details', 'excel', '/resources/p7/university-partnership-database.xlsx', 2560, NOW(), NOW()),
('p7_resource_research_framework', 'P7', 'p7_module_7_university_research', 'Research Collaboration Framework', 'Framework for building research partnerships with institutions', 'pdf', '/resources/p7/research-collaboration-framework.pdf', 2048, NOW(), NOW()),
('p7_resource_talent_strategy', 'P7', 'p7_module_7_university_research', 'Student Talent Acquisition Strategy', 'Strategy for accessing and developing student talent pipeline', 'pdf', '/resources/p7/talent-acquisition-strategy.pdf', 1792, NOW(), NOW()),

-- Module 8 Resources
('p7_resource_procurement_guide', 'P7', 'p7_module_8_procurement_pilots', 'Government Procurement Guide', 'Complete guide for becoming government vendor and winning contracts', 'pdf', '/resources/p7/government-procurement-guide.pdf', 3072, NOW(), NOW()),
('p7_resource_pilot_framework', 'P7', 'p7_module_8_procurement_pilots', 'Pilot Project Framework', 'Framework for securing and executing government pilot projects', 'pdf', '/resources/p7/pilot-project-framework.pdf', 2304, NOW(), NOW()),
('p7_resource_psu_strategy', 'P7', 'p7_module_8_procurement_pilots', 'PSU Partnership Strategy', 'Strategy for building partnerships with state PSUs and corporations', 'pdf', '/resources/p7/psu-partnership-strategy.pdf', 2048, NOW(), NOW()),

-- Module 9 Resources
('p7_resource_district_guide', 'P7', 'p7_module_9_district_local', 'District Administration Guide', 'Guide for working with district administration and local bodies', 'pdf', '/resources/p7/district-administration-guide.pdf', 2304, NOW(), NOW()),
('p7_resource_local_networks', 'P7', 'p7_module_9_district_local', 'Local Business Network Directory', 'Directory of local chambers, associations, and business networks', 'excel', '/resources/p7/local-business-directory.xlsx', 1792, NOW(), NOW()),
('p7_resource_municipal_framework', 'P7', 'p7_module_9_district_local', 'Municipal Engagement Framework', 'Framework for engaging with municipal corporations and urban bodies', 'pdf', '/resources/p7/municipal-engagement-framework.pdf', 1536, NOW(), NOW()),

-- Module 10 Resources
('p7_resource_ecosystem_strategy', 'P7', 'p7_module_10_ecosystem_integration', 'State Ecosystem Strategy Template', 'Comprehensive template for developing integrated ecosystem strategy', 'excel', '/resources/p7/ecosystem-strategy-template.xlsx', 3584, NOW(), NOW()),
('p7_resource_scaling_plan', 'P7', 'p7_module_10_ecosystem_integration', 'Multi-State Scaling Plan', 'Strategic plan template for scaling to multiple states', 'excel', '/resources/p7/multi-state-scaling-plan.xlsx', 2816, NOW(), NOW()),
('p7_resource_success_dashboard', 'P7', 'p7_module_10_ecosystem_integration', 'Ecosystem Success Dashboard', 'Dashboard for tracking and measuring ecosystem integration success', 'excel', '/resources/p7/success-dashboard.xlsx', 2048, NOW(), NOW()),

-- Additional Cross-Module Resources
('p7_resource_roi_calculator', 'P7', NULL, 'State Ecosystem ROI Calculator', 'Advanced calculator for measuring ROI from state ecosystem engagement', 'excel', '/resources/p7/ecosystem-roi-calculator.xlsx', 4096, NOW(), NOW()),
('p7_resource_master_tracker', 'P7', NULL, 'Master Application Tracker', 'Comprehensive tracker for all government applications and submissions', 'excel', '/resources/p7/master-application-tracker.xlsx', 3072, NOW(), NOW()),
('p7_resource_relationship_crm', 'P7', NULL, 'Government Relationship CRM', 'CRM system for managing government and ecosystem relationships', 'excel', '/resources/p7/government-relationship-crm.xlsx', 3584, NOW(), NOW()),
('p7_resource_compliance_calendar', 'P7', NULL, 'Annual Compliance Calendar', 'Calendar for tracking all compliance deadlines and requirements', 'excel', '/resources/p7/annual-compliance-calendar.xlsx', 2304, NOW(), NOW()),
('p7_resource_complete_toolkit', 'P7', NULL, 'P7 Complete Toolkit', 'All-in-one toolkit with templates, calculators, and frameworks', 'zip', '/resources/p7/p7-complete-toolkit.zip', 25600, NOW(), NOW());

-- ============================================================================
-- UPDATE MODULE PROGRESS TRACKING
-- ============================================================================

-- Update existing modules to ensure proper lesson count
UPDATE "Module" 
SET "createdAt" = NOW(), "updatedAt" = NOW()
WHERE "productId" = 'p7_state_ecosystem_mastery';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify product creation
-- SELECT * FROM "Product" WHERE "code" = 'P7';

-- Verify module creation (should return 10 modules)
-- SELECT COUNT(*) as module_count FROM "Module" WHERE "productId" = 'p7_state_ecosystem_mastery';

-- Verify lesson creation (should return 30 lessons)
-- SELECT COUNT(*) as lesson_count FROM "Lesson" 
-- JOIN "Module" ON "Lesson"."moduleId" = "Module"."id"
-- WHERE "Module"."productId" = 'p7_state_ecosystem_mastery';

-- Verify lessons by module
-- SELECT m."title" as module_title, COUNT(l."id") as lesson_count
-- FROM "Module" m
-- LEFT JOIN "Lesson" l ON m."id" = l."moduleId"
-- WHERE m."productId" = 'p7_state_ecosystem_mastery'
-- GROUP BY m."id", m."title", m."orderIndex"
-- ORDER BY m."orderIndex";

-- Verify activity types
-- SELECT COUNT(*) as activity_count FROM "ActivityType" WHERE "productCode" = 'P7';

-- Verify resources
-- SELECT COUNT(*) as resource_count FROM "Resource" WHERE "productCode" = 'P7';

COMMIT;