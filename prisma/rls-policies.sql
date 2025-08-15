-- Enable Row Level Security on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StartupPortfolio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "XPEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyLesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;

-- User table policies
-- Users can only view and update their own data
CREATE POLICY "Users can view own profile" ON "User"
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON "User"
  FOR UPDATE USING (auth.uid()::text = id);

-- Service role can do everything (for backend operations)
CREATE POLICY "Service role has full access to users" ON "User"
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Subscription policies
-- Users can only view their own subscription
CREATE POLICY "Users can view own subscription" ON "Subscription"
  FOR SELECT USING (auth.uid()::text = "userId");

-- Only service role can create/update subscriptions (through payment webhook)
CREATE POLICY "Service role manages subscriptions" ON "Subscription"
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- DailyProgress policies
-- Users can view and update their own progress
CREATE POLICY "Users can view own progress" ON "DailyProgress"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own progress" ON "DailyProgress"
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own progress" ON "DailyProgress"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- StartupPortfolio policies
-- Users can manage their own portfolio
CREATE POLICY "Users can view own portfolio" ON "StartupPortfolio"
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own portfolio" ON "StartupPortfolio"
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own portfolio" ON "StartupPortfolio"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- XPEvent policies
-- Users can only view their own XP events
CREATE POLICY "Users can view own XP events" ON "XPEvent"
  FOR SELECT USING (auth.uid()::text = "userId");

-- Only service role can create XP events (system awards them)
CREATE POLICY "Service role creates XP events" ON "XPEvent"
  FOR INSERT USING (auth.jwt()->>'role' = 'service_role');

-- DailyLesson policies
-- All authenticated users can view lessons (if they have active subscription)
CREATE POLICY "Authenticated users can view lessons" ON "DailyLesson"
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM "Subscription"
      WHERE "Subscription"."userId" = auth.uid()::text
      AND "Subscription".status = 'active'
      AND "Subscription"."expiryDate" > NOW()
    )
  );

-- Badge policies
-- All authenticated users can view badges
CREATE POLICY "All users can view badges" ON "Badge"
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Function to check if user has active subscription
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

-- Function to automatically create user profile on signup
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

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();