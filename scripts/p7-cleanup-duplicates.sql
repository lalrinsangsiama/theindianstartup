-- P7: Clean up duplicate modules and fix lesson assignments

BEGIN;

-- First, let's reassign lessons from duplicate modules to the original modules
-- and then delete the duplicate modules

-- Update lessons from p7_module_4_policy_mastery to the original module ID
UPDATE "Lesson" SET "moduleId" = '50a465ba-120f-48d4-b4b0-993ebf86c281' 
WHERE "moduleId" = 'p7_module_4_policy_mastery';

-- Update lessons from p7_module_5_competitions to the original module ID  
UPDATE "Lesson" SET "moduleId" = '2c7eceda-6d97-4c54-b5ad-c9ccb6f5c61a'
WHERE "moduleId" = 'p7_module_5_competitions';

-- Update lessons from p7_module_6_industrial to the original module ID
UPDATE "Lesson" SET "moduleId" = '682370fe-df70-48fa-a4c0-8c7a305be750'
WHERE "moduleId" = 'p7_module_6_industrial';

-- Update lessons from p7_module_7_university to the original module ID
UPDATE "Lesson" SET "moduleId" = '0a25a9d7-4604-4233-a012-590a6b12a7ff'
WHERE "moduleId" = 'p7_module_7_university';

-- Update lessons from p7_module_8_procurement to the original module ID
UPDATE "Lesson" SET "moduleId" = '1f8dcd00-3896-419a-b245-11fa5cdf50ed'
WHERE "moduleId" = 'p7_module_8_procurement';

-- Update lessons from p7_module_9_district to the original module ID
UPDATE "Lesson" SET "moduleId" = '0d95c639-374f-4d3a-850f-ee6ba0541f6b'
WHERE "moduleId" = 'p7_module_9_district';

-- Update lessons from p7_module_10_integration to the original module ID
UPDATE "Lesson" SET "moduleId" = '9d589697-cfad-4ae8-82d4-6ce4d274a522'
WHERE "moduleId" = 'p7_module_10_integration';

-- Now delete the duplicate modules
DELETE FROM "Module" WHERE "id" IN (
  'p7_module_4_policy_mastery',
  'p7_module_5_competitions', 
  'p7_module_6_industrial',
  'p7_module_7_university',
  'p7_module_8_procurement',
  'p7_module_9_district',
  'p7_module_10_integration'
);

COMMIT;