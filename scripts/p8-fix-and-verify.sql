-- P8: Data Room Mastery - Fix and Verify Enhancement

-- Update Product description and duration
UPDATE "Product" SET 
    description = 'Transform your startup with professional data room that increases valuation by 40% and accelerates fundraising by 60% through unicorn-grade documentation excellence. Now with 48 comprehensive lessons covering every aspect of data room mastery.',
    "estimatedDays" = 48
WHERE code = 'P8';

-- Verify the lesson count
SELECT 
    'P8 Enhancement Verification' as status,
    COUNT(l.id) as total_lessons,
    COUNT(DISTINCT m.id) as total_modules,
    COUNT(r.id) as total_resources
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
LEFT JOIN "Resource" r ON m.id = r."moduleId"
WHERE p.code = 'P8'
GROUP BY p.code;