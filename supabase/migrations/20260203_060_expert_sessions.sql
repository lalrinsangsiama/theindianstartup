-- Expert Sessions Feature
-- Enables founders to host expert sessions and invite peers

-- ============================================================================
-- TABLE: expert_sessions
-- Sessions hosted by founders
-- ============================================================================

CREATE TABLE IF NOT EXISTS expert_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  topic_tags TEXT[] DEFAULT '{}',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60 CHECK (duration_minutes > 0 AND duration_minutes <= 480),
  max_attendees INTEGER DEFAULT 50 CHECK (max_attendees > 0 AND max_attendees <= 500),
  meeting_url TEXT,
  recording_url TEXT,
  share_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('draft', 'upcoming', 'live', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient queries
CREATE INDEX IF NOT EXISTS idx_expert_sessions_host_id ON expert_sessions(host_id);
CREATE INDEX IF NOT EXISTS idx_expert_sessions_status ON expert_sessions(status);
CREATE INDEX IF NOT EXISTS idx_expert_sessions_scheduled_at ON expert_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_expert_sessions_share_token ON expert_sessions(share_token);

-- ============================================================================
-- TABLE: expert_session_registrations
-- Tracks who has registered for sessions
-- ============================================================================

CREATE TABLE IF NOT EXISTS expert_session_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES expert_sessions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  attended BOOLEAN DEFAULT FALSE,
  UNIQUE(session_id, user_id)
);

-- Index for efficient queries
CREATE INDEX IF NOT EXISTS idx_session_registrations_session_id ON expert_session_registrations(session_id);
CREATE INDEX IF NOT EXISTS idx_session_registrations_user_id ON expert_session_registrations(user_id);

-- ============================================================================
-- TABLE: expert_session_invites
-- Tracks email invites and shareable link registrations
-- ============================================================================

CREATE TABLE IF NOT EXISTS expert_session_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES expert_sessions(id) ON DELETE CASCADE,
  invited_by TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  invite_email TEXT,  -- NULL for shareable link registrations
  invite_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  accepted_by TEXT REFERENCES "User"(id) ON DELETE SET NULL  -- tracks who accepted the invite
);

-- Index for efficient queries
CREATE INDEX IF NOT EXISTS idx_session_invites_session_id ON expert_session_invites(session_id);
CREATE INDEX IF NOT EXISTS idx_session_invites_invited_by ON expert_session_invites(invited_by);
CREATE INDEX IF NOT EXISTS idx_session_invites_invite_token ON expert_session_invites(invite_token);
CREATE INDEX IF NOT EXISTS idx_session_invites_invite_email ON expert_session_invites(invite_email);

-- ============================================================================
-- FUNCTION: Update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_expert_session_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_expert_sessions_updated_at
  BEFORE UPDATE ON expert_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_expert_session_updated_at();

-- ============================================================================
-- FUNCTION: Check if user has purchased any course
-- Used to verify host eligibility
-- ============================================================================

CREATE OR REPLACE FUNCTION user_has_purchase(user_id_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM "Purchase"
    WHERE "userId" = user_id_param
    AND status = 'completed'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- FUNCTION: Get registration count for a session
-- ============================================================================

CREATE OR REPLACE FUNCTION get_session_registration_count(session_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
  count_val INTEGER;
BEGIN
  SELECT COUNT(*) INTO count_val
  FROM expert_session_registrations
  WHERE session_id = session_id_param;
  RETURN count_val;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEW: Sessions with registration count
-- ============================================================================

CREATE OR REPLACE VIEW expert_sessions_with_counts AS
SELECT
  es.*,
  COALESCE((
    SELECT COUNT(*)
    FROM expert_session_registrations esr
    WHERE esr.session_id = es.id
  ), 0) AS registered_count,
  u.name AS host_name,
  u.email AS host_email
FROM expert_sessions es
LEFT JOIN "User" u ON es.host_id = u.id;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE expert_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_session_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_session_invites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "expert_sessions_select_policy" ON expert_sessions;
DROP POLICY IF EXISTS "expert_sessions_insert_policy" ON expert_sessions;
DROP POLICY IF EXISTS "expert_sessions_update_policy" ON expert_sessions;
DROP POLICY IF EXISTS "expert_sessions_delete_policy" ON expert_sessions;

DROP POLICY IF EXISTS "session_registrations_select_policy" ON expert_session_registrations;
DROP POLICY IF EXISTS "session_registrations_insert_policy" ON expert_session_registrations;
DROP POLICY IF EXISTS "session_registrations_delete_policy" ON expert_session_registrations;

DROP POLICY IF EXISTS "session_invites_select_policy" ON expert_session_invites;
DROP POLICY IF EXISTS "session_invites_insert_policy" ON expert_session_invites;
DROP POLICY IF EXISTS "session_invites_update_policy" ON expert_session_invites;

-- Sessions: Anyone can view upcoming/completed sessions, only host can modify
CREATE POLICY "expert_sessions_select_policy" ON expert_sessions
  FOR SELECT USING (
    status IN ('upcoming', 'live', 'completed')
    OR host_id = auth.uid()::TEXT
  );

CREATE POLICY "expert_sessions_insert_policy" ON expert_sessions
  FOR INSERT WITH CHECK (
    host_id = auth.uid()::TEXT
    AND user_has_purchase(auth.uid()::TEXT)
  );

CREATE POLICY "expert_sessions_update_policy" ON expert_sessions
  FOR UPDATE USING (host_id = auth.uid()::TEXT)
  WITH CHECK (host_id = auth.uid()::TEXT);

CREATE POLICY "expert_sessions_delete_policy" ON expert_sessions
  FOR DELETE USING (host_id = auth.uid()::TEXT);

-- Registrations: Anyone can view registration counts, users can register/unregister themselves
CREATE POLICY "session_registrations_select_policy" ON expert_session_registrations
  FOR SELECT USING (true);

CREATE POLICY "session_registrations_insert_policy" ON expert_session_registrations
  FOR INSERT WITH CHECK (user_id = auth.uid()::TEXT);

CREATE POLICY "session_registrations_delete_policy" ON expert_session_registrations
  FOR DELETE USING (user_id = auth.uid()::TEXT);

-- Invites: Users can see invites they sent or received, hosts can see all invites for their sessions
CREATE POLICY "session_invites_select_policy" ON expert_session_invites
  FOR SELECT USING (
    invited_by = auth.uid()::TEXT
    OR accepted_by = auth.uid()::TEXT
    OR EXISTS (
      SELECT 1 FROM expert_sessions
      WHERE id = expert_session_invites.session_id
      AND host_id = auth.uid()::TEXT
    )
  );

CREATE POLICY "session_invites_insert_policy" ON expert_session_invites
  FOR INSERT WITH CHECK (invited_by = auth.uid()::TEXT);

CREATE POLICY "session_invites_update_policy" ON expert_session_invites
  FOR UPDATE USING (
    accepted_by = auth.uid()::TEXT
    OR invited_by = auth.uid()::TEXT
  );

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT SELECT ON expert_sessions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON expert_sessions TO authenticated;
GRANT SELECT, INSERT, DELETE ON expert_session_registrations TO authenticated;
GRANT SELECT, INSERT, UPDATE ON expert_session_invites TO authenticated;
GRANT SELECT ON expert_sessions_with_counts TO authenticated;

-- Allow anonymous access to public session info via share token
GRANT SELECT ON expert_sessions TO anon;
