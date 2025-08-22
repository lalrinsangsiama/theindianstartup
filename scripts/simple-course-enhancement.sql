-- Simple Course Enhancement Migration
-- Updates course content with enhanced descriptions and lesson improvements

BEGIN;

-- Update product descriptions with enhanced value propositions (already done successfully)
UPDATE "Product" SET 
  "updatedAt" = NOW()
WHERE code IN ('P1', 'P2', 'P3', 'P4', 'P5', 'P6');

-- Enhance key lessons with better action items and resources
UPDATE "Lesson" SET 
  "briefContent" = 'Master the entrepreneurial transformation from employee to entrepreneur mindset. Learn the PAINS framework (Personal, Access, Impact, Numbers, Solving) for systematic problem identification and create your opportunity scoring matrix to rank business opportunities.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1')
);

UPDATE "Lesson" SET 
  "briefContent" = 'Master customer development and market validation using the LISTEN framework (Learn, Identify, Seek, Test, Explore, Navigate). Conduct professional customer interviews and create data-driven buyer personas specific to Indian market segments.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 2 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1')
);

UPDATE "Lesson" SET 
  "briefContent" = 'Conduct comprehensive competitive analysis using proven frameworks and calculate Total Addressable Market (TAM) for your opportunity. Create competitive positioning maps and identify sustainable competitive advantages.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 3 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1')
);

-- Enhance P2 lessons
UPDATE "Lesson" SET 
  "briefContent" = 'Master all business entity types available in India including Private Limited, LLP, OPC, Partnership, and Section 8 companies. Compare pros/cons, understand tax implications, and choose optimal structure using comprehensive decision frameworks.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P2')
);

-- Enhance P3 lessons
UPDATE "Lesson" SET 
  "briefContent" = 'Master the complete Indian funding ecosystem from pre-seed to IPO with access to 200+ active investors. Understand investor psychology, decision-making processes, and create personalized funding roadmaps.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P3')
);

-- Enhance P4 lessons  
UPDATE "Lesson" SET 
  "briefContent" = 'Build professional financial architecture from ground up with CFO-level Chart of Accounts tailored for Indian startups. Implement automated workflows reducing manual finance work by 80%.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P4')
);

-- Enhance P5 lessons
UPDATE "Lesson" SET 
  "briefContent" = 'Understand the 15 critical legal areas every startup must master including Contract Law, Employment Law, IP, Consumer Protection, and Data Protection. Assess current legal vulnerabilities and create comprehensive risk mitigation plans.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P5')
);

-- Enhance P6 lessons
UPDATE "Lesson" SET 
  "briefContent" = 'Master Indian buyer psychology and market dynamics using the TRUST model (Trust Building, Relationship Focus, Understanding Value, Social Validation, Timing Sensitivity). Understand regional variations and cultural considerations for sales success.',
  "xpReward" = 100,
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P6')
);

-- Update XP rewards for enhanced content
UPDATE "Lesson" SET "xpReward" = 75 WHERE day <= 7 AND "xpReward" < 75;
UPDATE "Lesson" SET "xpReward" = 50 WHERE day > 7 AND day <= 14 AND "xpReward" < 50;

-- Mark modules as updated
UPDATE "Module" SET "updatedAt" = NOW();

COMMIT;

-- Verification
SELECT 'Enhanced Lessons Created' as status, COUNT(*) as count 
FROM "Lesson" 
WHERE "updatedAt" > NOW() - INTERVAL '2 minutes' AND "xpReward" >= 75;