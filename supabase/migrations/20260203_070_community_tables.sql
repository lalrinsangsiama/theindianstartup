-- Community Feature Database Tables
-- Migration: 20260203_070_community_tables.sql
-- Purpose: Create all tables required for community features
-- Tables: posts, comments, announcements, announcement_saves, ecosystem_listings, ecosystem_reviews, review_helpful_votes

-- ============================================================================
-- HELPER: Create users view for consistent access to User table
-- ============================================================================

CREATE OR REPLACE VIEW users AS
SELECT
  id,
  name,
  email,
  bio,
  "linkedinUrl" AS linkedin_url,
  "twitterUrl" AS twitter_url,
  "websiteUrl" AS website_url,
  "totalXP" AS total_xp,
  badges,
  "createdAt" AS created_at
FROM "User";

-- Grant access to the view
GRANT SELECT ON users TO authenticated, anon;

-- ============================================================================
-- TABLE: posts
-- Community discussion posts
-- ============================================================================

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'general' CHECK (type IN ('general', 'question', 'success_story', 'resource_share', 'discussion')),
  tags TEXT[] DEFAULT '{}',
  thread_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT TRUE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for posts
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_is_approved ON posts(is_approved);
CREATE INDEX IF NOT EXISTS idx_posts_thread_id ON posts(thread_id);
-- Compound index for cursor-based pagination
CREATE INDEX IF NOT EXISTS idx_posts_pagination ON posts(created_at DESC, id DESC) WHERE is_approved = TRUE;

-- ============================================================================
-- TABLE: comments
-- Comments on posts
-- ============================================================================

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for comments
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- ============================================================================
-- TABLE: post_likes
-- Track who liked which posts (for deduplication)
-- ============================================================================

CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_post_likes_post ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user ON post_likes(user_id);

-- ============================================================================
-- TABLE: announcements
-- Platform announcements, opportunities, events
-- ============================================================================

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  type TEXT DEFAULT 'general' CHECK (type IN ('general', 'event', 'opportunity', 'funding', 'news', 'milestone', 'partnership')),
  category TEXT DEFAULT 'general',
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  target_audience TEXT[] DEFAULT '{"all"}',
  industries TEXT[] DEFAULT '{"all"}',
  image_url TEXT,
  external_links JSONB DEFAULT '[]'::jsonb,
  application_deadline TIMESTAMPTZ,
  event_date TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  is_sponsored BOOLEAN DEFAULT FALSE,
  sponsor_name TEXT,
  sponsor_logo TEXT,
  sponsor_website TEXT,
  sponsorship_type TEXT CHECK (sponsorship_type IN ('banner', 'featured', 'promoted', NULL)),
  sponsorship_id UUID,
  views_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'archived')),
  is_admin_post BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  seo_slug TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for announcements
CREATE INDEX IF NOT EXISTS idx_announcements_author ON announcements(author_id);
CREATE INDEX IF NOT EXISTS idx_announcements_type ON announcements(type);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_is_pinned ON announcements(is_pinned DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_valid_until ON announcements(valid_until);
CREATE INDEX IF NOT EXISTS idx_announcements_seo_slug ON announcements(seo_slug);

-- ============================================================================
-- TABLE: announcement_saves
-- Track user saved announcements
-- ============================================================================

CREATE TABLE IF NOT EXISTS announcement_saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(announcement_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_announcement_saves_announcement ON announcement_saves(announcement_id);
CREATE INDEX IF NOT EXISTS idx_announcement_saves_user ON announcement_saves(user_id);

-- ============================================================================
-- TABLE: announcement_clicks
-- Track announcement link clicks for analytics
-- ============================================================================

CREATE TABLE IF NOT EXISTS announcement_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  link_url TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcement_clicks_announcement ON announcement_clicks(announcement_id);

-- ============================================================================
-- TABLE: ecosystem_listings
-- Directory of incubators, accelerators, investors, service providers, etc.
-- ============================================================================

CREATE TABLE IF NOT EXISTS ecosystem_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('incubator', 'accelerator', 'investor', 'mentor', 'service_provider', 'coworking', 'government', 'bank', 'nbfc', 'law_firm', 'ca_firm', 'other')),
  sub_category TEXT,
  logo_url TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  pincode TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Specific fields for different categories
  funding_amount TEXT,  -- e.g., "₹25L - ₹2Cr"
  equity_taken TEXT,    -- e.g., "5-10%"
  program_duration TEXT, -- e.g., "3 months"
  batch_size INTEGER,
  loan_types TEXT[],    -- For banks/NBFCs
  interest_rates TEXT,
  eligibility_info TEXT,
  application_process TEXT,
  documents_required TEXT[] DEFAULT '{}',

  -- Stats and verification
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  -- Submission tracking
  submitted_by TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  verified_by TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for ecosystem_listings
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_category ON ecosystem_listings(category);
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_city ON ecosystem_listings(city);
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_state ON ecosystem_listings(state);
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_rating ON ecosystem_listings(average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_is_active ON ecosystem_listings(is_active);
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_is_verified ON ecosystem_listings(is_verified);
CREATE INDEX IF NOT EXISTS idx_ecosystem_listings_name ON ecosystem_listings(name);

-- ============================================================================
-- TABLE: ecosystem_reviews
-- Reviews for ecosystem listings
-- ============================================================================

CREATE TABLE IF NOT EXISTS ecosystem_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES ecosystem_listings(id) ON DELETE CASCADE,
  author_id TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  experience_type TEXT CHECK (experience_type IN ('applied', 'accepted', 'rejected', 'participated', 'client', 'other')),
  application_date DATE,
  response_time TEXT,  -- e.g., "Within 2 weeks"
  is_anonymous BOOLEAN DEFAULT FALSE,
  anonymous_name TEXT,
  helpful_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for ecosystem_reviews
CREATE INDEX IF NOT EXISTS idx_ecosystem_reviews_listing ON ecosystem_reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_ecosystem_reviews_author ON ecosystem_reviews(author_id);
CREATE INDEX IF NOT EXISTS idx_ecosystem_reviews_rating ON ecosystem_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_ecosystem_reviews_helpful ON ecosystem_reviews(helpful_count DESC);
CREATE INDEX IF NOT EXISTS idx_ecosystem_reviews_created ON ecosystem_reviews(created_at DESC);

-- Prevent duplicate reviews (one per user per listing, unless anonymous)
CREATE UNIQUE INDEX IF NOT EXISTS idx_ecosystem_reviews_unique_user_listing
  ON ecosystem_reviews(listing_id, author_id)
  WHERE author_id IS NOT NULL;

-- ============================================================================
-- TABLE: review_helpful_votes
-- Track helpful votes on reviews to prevent duplicates
-- ============================================================================

CREATE TABLE IF NOT EXISTS review_helpful_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES ecosystem_reviews(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_review_helpful_votes_review ON review_helpful_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_review_helpful_votes_user ON review_helpful_votes(user_id);

-- ============================================================================
-- TABLE: sponsorships
-- Track sponsored content purchases
-- ============================================================================

CREATE TABLE IF NOT EXISTS sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('banner', 'featured', 'promoted')),
  title TEXT NOT NULL,
  content TEXT,
  target_url TEXT NOT NULL,
  image_url TEXT,
  duration_days INTEGER NOT NULL,
  amount INTEGER NOT NULL,  -- In paise
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'completed', 'rejected', 'cancelled')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sponsorships_user ON sponsorships(user_id);
CREATE INDEX IF NOT EXISTS idx_sponsorships_status ON sponsorships(status);
CREATE INDEX IF NOT EXISTS idx_sponsorships_active ON sponsorships(start_date, end_date) WHERE status = 'active';

-- ============================================================================
-- TRIGGERS: Auto-update timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_community_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all community tables
CREATE TRIGGER trigger_posts_updated_at
  BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_community_updated_at();

CREATE TRIGGER trigger_comments_updated_at
  BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_community_updated_at();

CREATE TRIGGER trigger_announcements_updated_at
  BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_community_updated_at();

CREATE TRIGGER trigger_ecosystem_listings_updated_at
  BEFORE UPDATE ON ecosystem_listings FOR EACH ROW EXECUTE FUNCTION update_community_updated_at();

CREATE TRIGGER trigger_ecosystem_reviews_updated_at
  BEFORE UPDATE ON ecosystem_reviews FOR EACH ROW EXECUTE FUNCTION update_community_updated_at();

-- ============================================================================
-- TRIGGERS: Auto-update counts
-- ============================================================================

-- Update comment count on posts
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = GREATEST(0, comments_count - 1) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_comment_count
  AFTER INSERT OR DELETE ON comments FOR EACH ROW EXECUTE FUNCTION update_post_comment_count();

-- Update like count on posts
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_like_count
  AFTER INSERT OR DELETE ON post_likes FOR EACH ROW EXECUTE FUNCTION update_post_like_count();

-- Update helpful count on reviews
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE ecosystem_reviews SET helpful_count = helpful_count + 1 WHERE id = NEW.review_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE ecosystem_reviews SET helpful_count = GREATEST(0, helpful_count - 1) WHERE id = OLD.review_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_review_helpful_count
  AFTER INSERT OR DELETE ON review_helpful_votes FOR EACH ROW EXECUTE FUNCTION update_review_helpful_count();

-- Update announcement save count
CREATE OR REPLACE FUNCTION update_announcement_save_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE announcements SET saves_count = saves_count + 1 WHERE id = NEW.announcement_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE announcements SET saves_count = GREATEST(0, saves_count - 1) WHERE id = OLD.announcement_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_announcement_save_count
  AFTER INSERT OR DELETE ON announcement_saves FOR EACH ROW EXECUTE FUNCTION update_announcement_save_count();

-- Update listing review stats
CREATE OR REPLACE FUNCTION update_listing_review_stats()
RETURNS TRIGGER AS $$
DECLARE
  new_avg DECIMAL(3,2);
  new_count INTEGER;
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    SELECT AVG(rating)::DECIMAL(3,2), COUNT(*) INTO new_avg, new_count
    FROM ecosystem_reviews
    WHERE listing_id = NEW.listing_id AND is_approved = TRUE;

    UPDATE ecosystem_listings
    SET average_rating = COALESCE(new_avg, 0), total_reviews = new_count
    WHERE id = NEW.listing_id;
  ELSIF TG_OP = 'DELETE' THEN
    SELECT AVG(rating)::DECIMAL(3,2), COUNT(*) INTO new_avg, new_count
    FROM ecosystem_reviews
    WHERE listing_id = OLD.listing_id AND is_approved = TRUE;

    UPDATE ecosystem_listings
    SET average_rating = COALESCE(new_avg, 0), total_reviews = new_count
    WHERE id = OLD.listing_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_listing_review_stats
  AFTER INSERT OR UPDATE OR DELETE ON ecosystem_reviews FOR EACH ROW EXECUTE FUNCTION update_listing_review_stats();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_helpful_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "posts_select" ON posts FOR SELECT USING (
  is_approved = TRUE OR author_id = auth.uid()::TEXT
);
CREATE POLICY "posts_insert" ON posts FOR INSERT WITH CHECK (
  auth.uid()::TEXT = author_id
);
CREATE POLICY "posts_update" ON posts FOR UPDATE USING (
  auth.uid()::TEXT = author_id
);
CREATE POLICY "posts_delete" ON posts FOR DELETE USING (
  auth.uid()::TEXT = author_id
);

-- Comments policies
CREATE POLICY "comments_select" ON comments FOR SELECT USING (
  is_approved = TRUE OR author_id = auth.uid()::TEXT
);
CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (
  auth.uid()::TEXT = author_id
);
CREATE POLICY "comments_update" ON comments FOR UPDATE USING (
  auth.uid()::TEXT = author_id
);
CREATE POLICY "comments_delete" ON comments FOR DELETE USING (
  auth.uid()::TEXT = author_id
);

-- Post likes policies
CREATE POLICY "post_likes_select" ON post_likes FOR SELECT USING (TRUE);
CREATE POLICY "post_likes_insert" ON post_likes FOR INSERT WITH CHECK (
  auth.uid()::TEXT = user_id
);
CREATE POLICY "post_likes_delete" ON post_likes FOR DELETE USING (
  auth.uid()::TEXT = user_id
);

-- Announcements policies (anyone can read approved, only author can modify)
CREATE POLICY "announcements_select" ON announcements FOR SELECT USING (
  status = 'approved' OR author_id = auth.uid()::TEXT
);
CREATE POLICY "announcements_insert" ON announcements FOR INSERT WITH CHECK (
  auth.uid()::TEXT = author_id
);
CREATE POLICY "announcements_update" ON announcements FOR UPDATE USING (
  auth.uid()::TEXT = author_id
);
CREATE POLICY "announcements_delete" ON announcements FOR DELETE USING (
  auth.uid()::TEXT = author_id
);

-- Announcement saves policies
CREATE POLICY "announcement_saves_select" ON announcement_saves FOR SELECT USING (
  user_id = auth.uid()::TEXT
);
CREATE POLICY "announcement_saves_insert" ON announcement_saves FOR INSERT WITH CHECK (
  auth.uid()::TEXT = user_id
);
CREATE POLICY "announcement_saves_delete" ON announcement_saves FOR DELETE USING (
  auth.uid()::TEXT = user_id
);

-- Announcement clicks policies (more permissive for analytics)
CREATE POLICY "announcement_clicks_insert" ON announcement_clicks FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "announcement_clicks_select" ON announcement_clicks FOR SELECT USING (
  user_id = auth.uid()::TEXT OR user_id IS NULL
);

-- Ecosystem listings policies
CREATE POLICY "ecosystem_listings_select" ON ecosystem_listings FOR SELECT USING (
  is_active = TRUE
);
CREATE POLICY "ecosystem_listings_insert" ON ecosystem_listings FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL
);
CREATE POLICY "ecosystem_listings_update" ON ecosystem_listings FOR UPDATE USING (
  submitted_by = auth.uid()::TEXT
);

-- Ecosystem reviews policies
CREATE POLICY "ecosystem_reviews_select" ON ecosystem_reviews FOR SELECT USING (
  is_approved = TRUE OR author_id = auth.uid()::TEXT
);
CREATE POLICY "ecosystem_reviews_insert" ON ecosystem_reviews FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL
);
CREATE POLICY "ecosystem_reviews_update" ON ecosystem_reviews FOR UPDATE USING (
  author_id = auth.uid()::TEXT
);
CREATE POLICY "ecosystem_reviews_delete" ON ecosystem_reviews FOR DELETE USING (
  author_id = auth.uid()::TEXT
);

-- Review helpful votes policies
CREATE POLICY "review_helpful_votes_select" ON review_helpful_votes FOR SELECT USING (TRUE);
CREATE POLICY "review_helpful_votes_insert" ON review_helpful_votes FOR INSERT WITH CHECK (
  auth.uid()::TEXT = user_id
);
CREATE POLICY "review_helpful_votes_delete" ON review_helpful_votes FOR DELETE USING (
  auth.uid()::TEXT = user_id
);

-- Sponsorships policies
CREATE POLICY "sponsorships_select" ON sponsorships FOR SELECT USING (
  user_id = auth.uid()::TEXT OR status = 'active'
);
CREATE POLICY "sponsorships_insert" ON sponsorships FOR INSERT WITH CHECK (
  auth.uid()::TEXT = user_id
);
CREATE POLICY "sponsorships_update" ON sponsorships FOR UPDATE USING (
  auth.uid()::TEXT = user_id
);

-- ============================================================================
-- GRANTS
-- ============================================================================

GRANT SELECT ON posts TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON posts TO authenticated;

GRANT SELECT ON comments TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON comments TO authenticated;

GRANT SELECT, INSERT, DELETE ON post_likes TO authenticated;

GRANT SELECT ON announcements TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON announcements TO authenticated;

GRANT SELECT, INSERT, DELETE ON announcement_saves TO authenticated;

GRANT SELECT, INSERT ON announcement_clicks TO authenticated, anon;

GRANT SELECT ON ecosystem_listings TO authenticated, anon;
GRANT INSERT, UPDATE ON ecosystem_listings TO authenticated;

GRANT SELECT ON ecosystem_reviews TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON ecosystem_reviews TO authenticated;

GRANT SELECT, INSERT, DELETE ON review_helpful_votes TO authenticated;

GRANT SELECT, INSERT, UPDATE ON sponsorships TO authenticated;

-- ============================================================================
-- FUNCTION: award_xp (if not exists)
-- ============================================================================

CREATE OR REPLACE FUNCTION award_xp(
  user_id TEXT,
  points INTEGER,
  event_type TEXT,
  description TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  -- Update user's total XP
  UPDATE "User"
  SET "totalXP" = COALESCE("totalXP", 0) + points
  WHERE id = user_id;

  -- Log the XP event
  INSERT INTO "XPEvent" (
    "userId",
    type,
    points,
    description,
    "createdAt"
  ) VALUES (
    user_id,
    event_type,
    points,
    description,
    NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute on function
GRANT EXECUTE ON FUNCTION award_xp TO authenticated;

RAISE NOTICE 'Community tables created successfully!';
