-- THE INDIAN STARTUP - SAFE RLS SETUP (Checks for existing policies)
-- Run this in Supabase SQL Editor if you get "policy already exists" errors

-- ================================================
-- STEP 1: ENABLE RLS ON ALL TABLES (Safe - won't error if already enabled)
-- ================================================
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StartupPortfolio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "XPEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyLesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;

-- ================================================
-- STEP 2: DROP EXISTING POLICIES (if they exist)
-- ================================================
DROP POLICY IF EXISTS "Users read own profile" ON "User";
DROP POLICY IF EXISTS "Users update own profile" ON "User";
DROP POLICY IF EXISTS "Users create own record" ON "User";
DROP POLICY IF EXISTS "Users read own subscription" ON "Subscription";
DROP POLICY IF EXISTS "Users read own progress" ON "DailyProgress";
DROP POLICY IF EXISTS "Users create own progress" ON "DailyProgress";
DROP POLICY IF EXISTS "Users update own progress" ON "DailyProgress";
DROP POLICY IF EXISTS "Users read own portfolio" ON "StartupPortfolio";
DROP POLICY IF EXISTS "Users create own portfolio" ON "StartupPortfolio";
DROP POLICY IF EXISTS "Users update own portfolio" ON "StartupPortfolio";
DROP POLICY IF EXISTS "Users read own XP" ON "XPEvent";
DROP POLICY IF EXISTS "Users create own XP" ON "XPEvent";
DROP POLICY IF EXISTS "Active users read lessons" ON "DailyLesson";
DROP POLICY IF EXISTS "Users read badges" ON "Badge";

-- ================================================
-- STEP 3: CREATE USER TABLE POLICIES
-- ================================================
-- Users can read their own profile
CREATE POLICY "Users read own profile" ON "User"
FOR SELECT USING (auth.uid()::text = id);

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON "User"
FOR UPDATE USING (auth.uid()::text = id);

-- Allow authenticated users to create their own user record
CREATE POLICY "Users create own record" ON "User"
FOR INSERT WITH CHECK (auth.uid()::text = id);

-- ================================================
-- STEP 4: SUBSCRIPTION TABLE POLICIES
-- ================================================
-- Users can view their own subscription
CREATE POLICY "Users read own subscription" ON "Subscription"
FOR SELECT USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 5: DAILYPROGRESS TABLE POLICIES
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
-- STEP 6: STARTUPPORTFOLIO TABLE POLICIES
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
-- STEP 7: XPEVENT TABLE POLICIES
-- ================================================
-- Users can read their own XP events
CREATE POLICY "Users read own XP" ON "XPEvent"
FOR SELECT USING (auth.uid()::text = "userId");

-- Users can create their own XP events (for system-generated XP)
CREATE POLICY "Users create own XP" ON "XPEvent"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- ================================================
-- STEP 8: DAILYLESSON TABLE POLICIES
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
-- STEP 9: BADGE TABLE POLICIES
-- ================================================
-- All authenticated users can view badges
CREATE POLICY "Users read badges" ON "Badge"
FOR SELECT USING (auth.uid() IS NOT NULL);

-- ================================================
-- STEP 10: CREATE USER TRIGGER FUNCTION (Safe - uses CREATE OR REPLACE)
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

-- Create trigger (drops existing first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ================================================
-- STEP 11: VERIFY SETUP
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