-- Quick Wins feature for new user engagement
-- Tracks completion of 6 quick actions with XP rewards and 24-hour bonus

-- Add quickWins column to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "quickWins" JSONB DEFAULT '{}';

-- Create index for querying quick wins
CREATE INDEX IF NOT EXISTS idx_user_quick_wins ON "User" USING GIN ("quickWins");

-- Add fast_starter badge to available badges if not exists
COMMENT ON COLUMN "User"."quickWins" IS 'Quick wins progress: { completed: string[], startedAt: timestamp, bonusEarned: boolean }';

-- Function to update quick wins safely
CREATE OR REPLACE FUNCTION update_user_quick_wins(
  p_user_id TEXT,
  p_quick_wins JSONB,
  p_xp_earned INTEGER
) RETURNS VOID AS $$
BEGIN
  UPDATE "User"
  SET
    "quickWins" = p_quick_wins,
    "totalXP" = COALESCE("totalXP", 0) + p_xp_earned
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_user_quick_wins TO authenticated;
