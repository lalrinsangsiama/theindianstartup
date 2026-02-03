-- Enhanced Onboarding System
-- Priority: P2 - MEDIUM
-- Date: 2026-02-03

-- 1. Add onboarding tracking columns to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingStep" INTEGER DEFAULT 0;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingCompletedAt" TIMESTAMPTZ;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingSkippedAt" TIMESTAMPTZ;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingData" JSONB DEFAULT '{}'::jsonb;

-- 2. Create OnboardingProgress table for detailed tracking
CREATE TABLE IF NOT EXISTS "OnboardingProgress" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE UNIQUE,

  -- Step tracking
  "currentStep" INTEGER DEFAULT 0,
  "stepsCompleted" INTEGER[] DEFAULT '{}',

  -- Goals assessment
  "primaryGoal" TEXT, -- launch, grow, fundraise, scale
  "biggestChallenge" TEXT, -- funding, legal, sales, tech, hiring, marketing
  "stage" TEXT, -- idea, building, launched, scaling
  "monthlyRevenue" TEXT, -- pre_revenue, sub_1l, 1_to_10l, above_10l
  "teamSize" TEXT, -- solo, 2_5, 6_20, above_20
  "hasFunding" TEXT, -- no, angel, seed, series_a_plus

  -- Course preferences
  "recommendedCourses" TEXT[] DEFAULT '{}',
  "selectedFirstCourse" TEXT,

  -- Community profile
  "communityBio" TEXT,
  "linkedinUrl" TEXT,
  "twitterUrl" TEXT,
  "websiteUrl" TEXT,

  -- Completion
  "completedAt" TIMESTAMPTZ,
  "skippedSteps" INTEGER[] DEFAULT '{}',
  "bonusXpAwarded" BOOLEAN DEFAULT FALSE,

  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE "OnboardingProgress" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own onboarding progress"
  ON "OnboardingProgress"
  FOR ALL
  USING (auth.uid()::text = "userId");

-- 4. Create index
CREATE INDEX IF NOT EXISTS idx_onboarding_user ON "OnboardingProgress"("userId");

-- 5. Function to award bonus XP for completing onboarding
CREATE OR REPLACE FUNCTION award_onboarding_bonus(p_user_id TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_bonus_xp INTEGER := 100; -- 10% of typical starter XP
  v_already_awarded BOOLEAN;
BEGIN
  -- Check if already awarded
  SELECT "bonusXpAwarded" INTO v_already_awarded
  FROM "OnboardingProgress"
  WHERE "userId" = p_user_id;

  IF v_already_awarded IS TRUE THEN
    RETURN FALSE;
  END IF;

  -- Award XP
  UPDATE "User"
  SET "totalXP" = "totalXP" + v_bonus_xp,
      "updatedAt" = NOW()
  WHERE id = p_user_id;

  -- Record XP event
  INSERT INTO "XPEvent" ("userId", amount, reason, source)
  VALUES (p_user_id, v_bonus_xp, 'Completed onboarding', 'onboarding_bonus');

  -- Mark as awarded
  UPDATE "OnboardingProgress"
  SET "bonusXpAwarded" = TRUE,
      "updatedAt" = NOW()
  WHERE "userId" = p_user_id;

  -- Create notification
  INSERT INTO "Notification" ("userId", type, title, message, "iconType", "actionUrl")
  VALUES (
    p_user_id,
    'achievement',
    'Onboarding Complete!',
    'You earned 100 bonus XP for completing your profile. Start your journey now!',
    'gift',
    '/dashboard'
  );

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- 6. Comments
COMMENT ON TABLE "OnboardingProgress" IS 'Tracks progressive onboarding completion with goals assessment';
COMMENT ON COLUMN "OnboardingProgress"."stepsCompleted" IS 'Array of step indices that have been completed';
COMMENT ON COLUMN "OnboardingProgress"."skippedSteps" IS 'Array of step indices that were skipped';
COMMENT ON FUNCTION award_onboarding_bonus IS 'Awards 100 XP bonus for completing full onboarding';
