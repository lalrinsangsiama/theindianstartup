-- Step 1: Enable Row Level Security on all tables
-- Run each ALTER TABLE command separately to identify any issues

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StartupPortfolio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "XPEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyLesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;

-- Step 2: User table policies
CREATE POLICY "Users can view own profile" ON "User"
  FOR SELECT 
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON "User"
  FOR UPDATE 
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Service role has full access to users" ON "User"
  FOR ALL 
  TO service_role
  USING (true);

-- Step 3: Subscription policies
CREATE POLICY "Users can view own subscription" ON "Subscription"
  FOR SELECT 
  TO authenticated
  USING (auth.uid()::text = "userId");

CREATE POLICY "Service role manages subscriptions" ON "Subscription"
  FOR ALL 
  TO service_role
  USING (true);

-- Step 4: DailyProgress policies
CREATE POLICY "Users can view own progress" ON "DailyProgress"
  FOR SELECT 
  TO authenticated
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own progress" ON "DailyProgress"
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own progress" ON "DailyProgress"
  FOR UPDATE 
  TO authenticated
  USING (auth.uid()::text = "userId");

-- Step 5: StartupPortfolio policies
CREATE POLICY "Users can view own portfolio" ON "StartupPortfolio"
  FOR SELECT 
  TO authenticated
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own portfolio" ON "StartupPortfolio"
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own portfolio" ON "StartupPortfolio"
  FOR UPDATE 
  TO authenticated
  USING (auth.uid()::text = "userId");

-- Step 6: XPEvent policies
CREATE POLICY "Users can view own XP events" ON "XPEvent"
  FOR SELECT 
  TO authenticated
  USING (auth.uid()::text = "userId");

CREATE POLICY "Service role creates XP events" ON "XPEvent"
  FOR INSERT 
  TO service_role
  USING (true);

-- Step 7: DailyLesson policies
CREATE POLICY "Authenticated users can view lessons" ON "DailyLesson"
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "Subscription"
      WHERE "Subscription"."userId" = auth.uid()::text
      AND "Subscription".status = 'active'
      AND "Subscription"."expiryDate" > NOW()
    )
  );

-- Step 8: Badge policies
CREATE POLICY "All users can view badges" ON "Badge"
  FOR SELECT 
  TO authenticated
  USING (true);

-- Step 9: Create helper function for subscription check
CREATE OR REPLACE FUNCTION has_active_subscription(user_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM "Subscription"
    WHERE "userId" = user_id
    AND status = 'active'
    AND "expiryDate" > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 10: Create function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."User" (id, email, name, "createdAt")
  VALUES (
    NEW.id::text,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 11: Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Step 12: Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('User', 'Subscription', 'DailyProgress', 'StartupPortfolio', 'XPEvent', 'DailyLesson', 'Badge');