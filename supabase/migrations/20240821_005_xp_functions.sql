-- Create a function to increment user XP
-- This function safely increments the user's total XP
CREATE OR REPLACE FUNCTION increment_user_xp(user_id TEXT, xp_amount INT)
RETURNS VOID AS $$
BEGIN
  UPDATE "User"
  SET "totalXP" = COALESCE("totalXP", 0) + xp_amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_user_xp(TEXT, INT) TO authenticated;