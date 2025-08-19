-- Migration: P1 (30-Day India Launch Sprint) Content Structure
-- Description: Creates modules and lessons for P1 product
-- Date: 2025-01-18

-- Get P1 product ID
DO $$
DECLARE
    v_product_id TEXT;
    v_module1_id TEXT;
    v_module2_id TEXT;
    v_module3_id TEXT;
    v_module4_id TEXT;
BEGIN
    -- Get P1 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P1';
    
    -- Create Module 1: Foundation Week (Days 1-7)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays")
    VALUES (gen_random_uuid(), v_product_id, 'Foundation Week', 'Set goals, validate ideas, and understand the market', 1, 7)
    RETURNING id INTO v_module1_id;
    
    -- Create Module 2: Building Blocks (Days 8-14)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays")
    VALUES (gen_random_uuid(), v_product_id, 'Building Blocks', 'Create your MVP and set up business foundations', 2, 7)
    RETURNING id INTO v_module2_id;
    
    -- Create Module 3: Making it Real (Days 15-21)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays")
    VALUES (gen_random_uuid(), v_product_id, 'Making it Real', 'Test with users and handle registrations', 3, 7)
    RETURNING id INTO v_module3_id;
    
    -- Create Module 4: Launch Ready (Days 22-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays")
    VALUES (gen_random_uuid(), v_product_id, 'Launch Ready', 'Go live and prepare for growth', 4, 9)
    RETURNING id INTO v_module4_id;
    
    -- Insert lessons for Module 1 (Days 1-7)
    INSERT INTO "Lesson" ("moduleId", day, title, "estimatedTime", "xpReward", "orderIndex") VALUES
    (v_module1_id, 1, 'Start Your Journey', 45, 50, 1),
    (v_module1_id, 2, 'Market Research', 60, 50, 2),
    (v_module1_id, 3, 'Customer Discovery', 45, 50, 3),
    (v_module1_id, 4, 'Value Proposition', 30, 50, 4),
    (v_module1_id, 5, 'Business Model', 45, 50, 5),
    (v_module1_id, 6, 'Brand Identity', 60, 50, 6),
    (v_module1_id, 7, 'Week Review & Legal', 30, 100, 7);
    
    -- Insert lessons for Module 2 (Days 8-14)
    INSERT INTO "Lesson" ("moduleId", day, title, "estimatedTime", "xpReward", "orderIndex") VALUES
    (v_module2_id, 8, 'Logo & Visual Identity', 45, 50, 1),
    (v_module2_id, 9, 'Legal Entity Deep Dive', 60, 50, 2),
    (v_module2_id, 10, 'Compliance Roadmap', 45, 50, 3),
    (v_module2_id, 11, 'MVP Planning', 45, 50, 4),
    (v_module2_id, 12, 'MVP Development I', 90, 50, 5),
    (v_module2_id, 13, 'MVP Development II', 90, 50, 6),
    (v_module2_id, 14, 'Week Review & Testing', 30, 100, 7);
    
    -- Insert lessons for Module 3 (Days 15-21)
    INSERT INTO "Lesson" ("moduleId", day, title, "estimatedTime", "xpReward", "orderIndex") VALUES
    (v_module3_id, 15, 'User Testing Setup', 45, 50, 1),
    (v_module3_id, 16, 'Gather Feedback', 60, 50, 2),
    (v_module3_id, 17, 'Business Registration', 90, 50, 3),
    (v_module3_id, 18, 'GST & Tax Planning', 60, 50, 4),
    (v_module3_id, 19, 'Banking Setup', 45, 50, 5),
    (v_module3_id, 20, 'Pricing Strategy', 45, 50, 6),
    (v_module3_id, 21, 'Week Review & Launch Prep', 30, 100, 7);
    
    -- Insert lessons for Module 4 (Days 22-30)
    INSERT INTO "Lesson" ("moduleId", day, title, "estimatedTime", "xpReward", "orderIndex") VALUES
    (v_module4_id, 22, 'Digital Presence', 60, 50, 1),
    (v_module4_id, 23, 'First Customer Outreach', 45, 50, 2),
    (v_module4_id, 24, 'Sales Process', 45, 50, 3),
    (v_module4_id, 25, 'DPIIT Registration', 60, 50, 4),
    (v_module4_id, 26, 'Startup India Benefits', 45, 50, 5),
    (v_module4_id, 27, 'Investor Pitch Basics', 60, 50, 6),
    (v_module4_id, 28, 'Financial Projections', 45, 50, 7),
    (v_module4_id, 29, 'Pitch Deck Creation', 90, 75, 8),
    (v_module4_id, 30, 'Launch Day!', 60, 150, 9);
    
END $$;

-- Create a function to migrate existing DailyLesson content to new Lesson table
CREATE OR REPLACE FUNCTION migrate_daily_lessons() RETURNS void AS $$
DECLARE
    v_lesson RECORD;
    v_lesson_id TEXT;
BEGIN
    -- Update each lesson with content from DailyLesson table if it exists
    FOR v_lesson IN 
        SELECT l.id, l.day, dl."briefContent", dl."actionItems", dl.resources
        FROM "Lesson" l
        JOIN "DailyLesson" dl ON dl.day = l.day
    LOOP
        UPDATE "Lesson"
        SET 
            "briefContent" = v_lesson."briefContent",
            "actionItems" = v_lesson."actionItems",
            resources = v_lesson.resources
        WHERE id = v_lesson.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Run migration if DailyLesson table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'DailyLesson') THEN
        PERFORM migrate_daily_lessons();
    END IF;
END $$;

-- Create a view for easy access to P1 journey data
CREATE OR REPLACE VIEW p1_journey_view AS
SELECT 
    m.id as module_id,
    m.title as module_title,
    m.description as module_description,
    m."orderIndex" as module_order,
    l.id as lesson_id,
    l.day,
    l.title as lesson_title,
    l."briefContent",
    l."actionItems",
    l.resources,
    l."estimatedTime",
    l."xpReward",
    l."orderIndex" as lesson_order
FROM "Module" m
JOIN "Lesson" l ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P1'
ORDER BY m."orderIndex", l."orderIndex";

-- Create a function to get user's P1 progress
CREATE OR REPLACE FUNCTION get_p1_user_progress(p_user_id TEXT)
RETURNS TABLE(
    "currentDay" INTEGER,
    "completedDays" INTEGER[],
    "totalXP" INTEGER,
    "modulesCompleted" INTEGER,
    "progressPercentage" INTEGER
) AS $$
DECLARE
    v_purchase_id TEXT;
    v_completed_days INTEGER[];
    v_total_xp INTEGER;
    v_modules_completed INTEGER;
BEGIN
    -- Get active P1 purchase
    SELECT id INTO v_purchase_id
    FROM "Purchase"
    WHERE "userId" = p_user_id
    AND ("productCode" = 'P1' OR "productCode" = 'ALL_ACCESS')
    AND status = 'completed'
    AND "isActive" = true
    AND "expiresAt" > NOW()
    LIMIT 1;
    
    IF v_purchase_id IS NULL THEN
        RETURN QUERY SELECT 
            1 as "currentDay",
            ARRAY[]::INTEGER[] as "completedDays",
            0 as "totalXP",
            0 as "modulesCompleted",
            0 as "progressPercentage";
        RETURN;
    END IF;
    
    -- Get completed days
    SELECT ARRAY_AGG(l.day ORDER BY l.day)
    INTO v_completed_days
    FROM "LessonProgress" lp
    JOIN "Lesson" l ON l.id = lp."lessonId"
    WHERE lp."userId" = p_user_id
    AND lp."purchaseId" = v_purchase_id
    AND lp.completed = true;
    
    -- Get total XP earned
    SELECT COALESCE(SUM("xpEarned"), 0)
    INTO v_total_xp
    FROM "LessonProgress"
    WHERE "userId" = p_user_id
    AND "purchaseId" = v_purchase_id;
    
    -- Get modules completed
    SELECT COUNT(*)
    INTO v_modules_completed
    FROM "ModuleProgress"
    WHERE "userId" = p_user_id
    AND "purchaseId" = v_purchase_id
    AND "progressPercentage" = 100;
    
    RETURN QUERY SELECT 
        COALESCE(array_length(v_completed_days, 1), 0) + 1 as "currentDay",
        COALESCE(v_completed_days, ARRAY[]::INTEGER[]) as "completedDays",
        v_total_xp as "totalXP",
        v_modules_completed as "modulesCompleted",
        CASE 
            WHEN array_length(v_completed_days, 1) IS NULL THEN 0
            ELSE ROUND((array_length(v_completed_days, 1)::NUMERIC / 30) * 100)::INTEGER
        END as "progressPercentage";
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;