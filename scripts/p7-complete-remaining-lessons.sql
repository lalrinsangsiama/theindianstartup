-- P7: Complete Remaining 21 Lessons (Days 10-30)
-- Adding missing lessons to complete the 30-day course promise

BEGIN;

-- Get existing module IDs for P7
-- Module 4: State Startup Policy Mastery (Days 10-12)
-- Module 5: State Competitions & Challenges (Days 13-15)  
-- Module 6: State Industrial Infrastructure (Days 16-18)
-- Module 7: State University & Research Ecosystem (Days 19-21)
-- Module 8: State Procurement & Pilot Programs (Days 22-24)
-- Module 9: District & Local Ecosystem (Days 25-27)
-- Module 10: State Ecosystem Integration (Days 28-30)

-- First, add the missing modules (4-10)
INSERT INTO "Module" ("id", "productId", "title", "description", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_module_4_policy_mastery', 'p7_state_schemes', 'State Startup Policy Mastery', 'Master your state''s specific startup policy and benefits optimization', 4, NOW(), NOW()),
('p7_module_5_competitions', 'p7_state_schemes', 'State Competitions & Challenges', 'Win state-level competitions and recognition programs', 5, NOW(), NOW()),
('p7_module_6_industrial', 'p7_state_schemes', 'State Industrial Infrastructure', 'Access industrial parks, SEZs, and manufacturing zones', 6, NOW(), NOW()),
('p7_module_7_university', 'p7_state_schemes', 'State University & Research Ecosystem', 'Leverage academic partnerships and research resources', 7, NOW(), NOW()),
('p7_module_8_procurement', 'p7_state_schemes', 'State Procurement & Pilot Programs', 'Become a vendor to state government and PSUs', 8, NOW(), NOW()),
('p7_module_9_district', 'p7_state_schemes', 'District & Local Ecosystem', 'Leverage district-level resources and connections', 9, NOW(), NOW()),
('p7_module_10_integration', 'p7_state_schemes', 'State Ecosystem Integration', 'Build long-term strategic positioning', 10, NOW(), NOW());

-- Add all remaining lessons (Days 10-30)

-- Module 4: State Startup Policy Mastery (Days 10-12)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_10', 'p7_module_4_policy_mastery', 10, 'Decoding Your State''s Startup Policy', 'Master your state''s specific startup policy framework and identify all available benefits. Learn to navigate policy documents, understand eligibility criteria, and create a comprehensive benefit optimization strategy.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_11', 'p7_module_4_policy_mastery', 11, 'Policy Benefit Optimization and Application Strategy', 'Develop systematic approaches to maximize policy benefits. Create multi-scheme application strategies, build compliance frameworks, and implement success rate improvement techniques.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_12', 'p7_module_4_policy_mastery', 12, 'Regulatory Compliance and Government Relations Mastery', 'Build bulletproof compliance systems and strategic government relationships. Master crisis management, issue resolution, and long-term regulatory positioning.', 45, 50, 3, NOW(), NOW());

-- Module 5: State Competitions & Challenges (Days 13-15)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_13', 'p7_module_5_competitions', 13, 'State Startup Grand Challenges and Innovation Competitions', 'Master state-level startup competitions with prize pools of ₹10L-₹5Cr. Learn winning strategies, application optimization, and post-win leverage techniques.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_14', 'p7_module_5_competitions', 14, 'District and University Level Competitions', 'Dominate local competitions to build momentum and recognition. Access university innovation challenges and district-level entrepreneurship programs.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_15', 'p7_module_5_competitions', 15, 'State Awards and Recognition Programs', 'Position your startup for state awards and recognition. Build systematic award strategies that enhance credibility and open new opportunities.', 45, 50, 3, NOW(), NOW());

-- Module 6: State Industrial Infrastructure (Days 16-18)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_16', 'p7_module_6_industrial', 16, 'Accessing State Industrial Parks and Clusters', 'Navigate state industrial parks and manufacturing clusters. Access subsidized land, infrastructure benefits, and cluster-specific advantages.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_17', 'p7_module_6_industrial', 17, 'Special Economic Zones (SEZs) and Export Benefits', 'Master SEZ benefits and export promotion schemes. Access tax advantages, export incentives, and international market support.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_18', 'p7_module_6_industrial', 18, 'State Manufacturing and MSME Clusters', 'Leverage MSME cluster benefits and manufacturing support schemes. Access technology upgradation funds and cluster development programs.', 45, 50, 3, NOW(), NOW());

-- Module 7: State University & Research Ecosystem (Days 19-21)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_19', 'p7_module_7_university', 19, 'University Partnerships and Student Talent', 'Build strategic university partnerships for talent acquisition, research collaboration, and innovation support. Access student entrepreneurs and academic resources.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_20', 'p7_module_7_university', 20, 'State Research Institutions and R&D Support', 'Partner with state research institutions for technology development. Access R&D grants, lab facilities, and technical expertise.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_21', 'p7_module_7_university', 21, 'Student Entrepreneurship and Campus Resources', 'Leverage campus incubators, student startup programs, and university innovation challenges. Build sustainable campus engagement strategies.', 45, 50, 3, NOW(), NOW());

-- Module 8: State Procurement & Pilot Programs (Days 22-24)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_22', 'p7_module_8_procurement', 22, 'Becoming a State Government Vendor', 'Navigate state procurement processes and become an approved vendor. Master tender processes, compliance requirements, and relationship building with procurement officers.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_23', 'p7_module_8_procurement', 23, 'State Pilot Projects and PoC Opportunities', 'Access state pilot projects and proof-of-concept opportunities. Build strategic relationships with government departments for innovative solution deployment.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_24', 'p7_module_8_procurement', 24, 'State PSU Partnerships and Corporate Contracts', 'Partner with state PSUs and government corporations. Access long-term contracts, technology partnerships, and corporate collaboration opportunities.', 45, 50, 3, NOW(), NOW());

-- Module 9: District & Local Ecosystem (Days 25-27)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_25', 'p7_module_9_district', 25, 'District Administration and Local Support', 'Build relationships with district collectors, magistrates, and local administration. Access district-specific schemes and local government support.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_26', 'p7_module_9_district', 26, 'Municipal Corporations and Urban Local Bodies', 'Navigate municipal corporation services and urban development programs. Access smart city initiatives and local infrastructure benefits.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_27', 'p7_module_9_district', 27, 'Local Business Associations and Chambers', 'Build strategic relationships with local chambers of commerce and business associations. Access networking opportunities and collective advocacy power.', 45, 50, 3, NOW(), NOW());

-- Module 10: State Ecosystem Integration (Days 28-30)
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p7_lesson_28', 'p7_module_10_integration', 28, 'Building Your State Ecosystem Strategy', 'Integrate all state ecosystem elements into a comprehensive strategic framework. Create systematic approaches for long-term relationship management and benefit optimization.', 45, 50, 1, NOW(), NOW()),
('p7_lesson_29', 'p7_module_10_integration', 29, 'Long-term State Government Relations', 'Build and maintain strategic government relationships for sustained competitive advantage. Develop influence, thought leadership, and policy input capabilities.', 45, 50, 2, NOW(), NOW()),
('p7_lesson_30', 'p7_module_10_integration', 30, 'State Ecosystem Success Metrics and Scaling', 'Measure ecosystem success, track ROI from state benefits, and scale your approach across multiple states. Build permanent competitive advantages through state ecosystem mastery.', 45, 50, 3, NOW(), NOW());

COMMIT;