-- THE INDIAN STARTUP - COMPLETE RLS SETUP
-- Run this entire file in Supabase SQL Editor

-- ================================================
-- STEP 1: ENABLE RLS ON ALL TABLES
-- ================================================
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StartupPortfolio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "XPEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyLesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;

-- ================================================
-- STEP 2: USER TABLE POLICIES
-- ================================================
-- Users can read their own profile
CREATE POLICY "Users read own profile" ON "User"
FOR SELECT USING (auth.uid()::text = id);

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON "User"
FOR UPDATE USING (auth.uid()::text = id);

-- ================================================
-- STEP 3: SUBSCRIPTION TABLE POLICIES
-- ================================================
-- Users can view their own subscription
CREATE POLICY "Users read own subscription" ON "Subscription"
FOR SELECT USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 4: DAILYPROGRESS TABLE POLICIES
-- ================================================
-- Users can read their own progress
CREATE POLICY "Users read own progress" ON "DailyProgress"
FOR SELECT USING (auth.uid()::text = "userId");

-- Users can create their own progress entries
CREATE POLICY "Users create own progress" ON "DailyProgress"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own progress
CREATE POLICY "Users update own progress" ON "DailyProgress"
FOR UPDATE USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 5: STARTUPPORTFOLIO TABLE POLICIES
-- ================================================
-- Users can read their own portfolio
CREATE POLICY "Users read own portfolio" ON "StartupPortfolio"
FOR SELECT USING (auth.uid()::text = "userId");

-- Users can create their own portfolio
CREATE POLICY "Users create own portfolio" ON "StartupPortfolio"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own portfolio
CREATE POLICY "Users update own portfolio" ON "StartupPortfolio"
FOR UPDATE USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 6: XPEVENT TABLE POLICIES
-- ================================================
-- Users can read their own XP events
CREATE POLICY "Users read own XP" ON "XPEvent"
FOR SELECT USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 7: DAILYLESSON TABLE POLICIES
-- ================================================
-- Users with active subscription can view lessons
CREATE POLICY "Active users read lessons" ON "DailyLesson"
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM "Subscription"
        WHERE "Subscription"."userId" = auth.uid()::text
        AND "Subscription".status = 'active'
        AND "Subscription"."expiryDate" > NOW()
    )
);

-- ================================================
-- STEP 8: BADGE TABLE POLICIES
-- ================================================
-- All authenticated users can view badges
CREATE POLICY "Users read badges" ON "Badge"
FOR SELECT USING (auth.uid() IS NOT NULL);

-- ================================================
-- STEP 9: CREATE USER TRIGGER FUNCTION
-- ================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public."User" (id, email, name, "createdAt")
    VALUES (
        NEW.id::text,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ================================================
-- STEP 10: VERIFY SETUP
-- ================================================
-- Check RLS is enabled
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN '✅ Enabled' ELSE '❌ Disabled' END as "RLS Status"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('User', 'Subscription', 'DailyProgress', 'StartupPortfolio', 'XPEvent', 'DailyLesson', 'Badge')
ORDER BY tablename;

-- Count policies per table
SELECT 
    tablename as "Table",
    COUNT(*) as "Policy Count"
FROM pg_policies 
WHERE schemaname = 'public' 
GROUP BY tablename
ORDER BY tablename;