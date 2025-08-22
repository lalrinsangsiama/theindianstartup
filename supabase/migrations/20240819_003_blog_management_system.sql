-- Blog Management System Schema
-- Run this in your Supabase SQL Editor

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS "BlogPost" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "excerpt" TEXT,
  "content" TEXT NOT NULL,
  "featuredImage" TEXT,
  "author" TEXT NOT NULL DEFAULT 'The Indian Startup Team',
  "authorBio" TEXT,
  "authorImage" TEXT,
  "status" TEXT NOT NULL DEFAULT 'draft' CHECK ("status" IN ('draft', 'published', 'archived')),
  "publishedAt" TIMESTAMPTZ,
  "scheduledFor" TIMESTAMPTZ,
  
  -- SEO Fields
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "metaKeywords" TEXT[],
  "canonicalUrl" TEXT,
  "ogTitle" TEXT,
  "ogDescription" TEXT,
  "ogImage" TEXT,
  "twitterTitle" TEXT,
  "twitterDescription" TEXT,
  "twitterImage" TEXT,
  
  -- Content Organization
  "category" TEXT NOT NULL DEFAULT 'General',
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "readingTime" INTEGER, -- in minutes
  "wordCount" INTEGER,
  
  -- Engagement
  "viewCount" INTEGER DEFAULT 0,
  "likeCount" INTEGER DEFAULT 0,
  "shareCount" INTEGER DEFAULT 0,
  "commentCount" INTEGER DEFAULT 0,
  
  -- Admin Fields
  "createdBy" UUID NOT NULL,
  "updatedBy" UUID,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Categories Table
CREATE TABLE IF NOT EXISTS "BlogCategory" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "color" TEXT DEFAULT '#3B82F6', -- Hex color for category
  "icon" TEXT, -- Lucide icon name
  "parentId" UUID REFERENCES "BlogCategory"("id"),
  "orderIndex" INTEGER DEFAULT 0,
  "isActive" BOOLEAN DEFAULT TRUE,
  "postCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Tags Table
CREATE TABLE IF NOT EXISTS "BlogTag" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "color" TEXT DEFAULT '#6B7280',
  "postCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Post Views Table (for analytics)
CREATE TABLE IF NOT EXISTS "BlogPostView" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "postId" UUID NOT NULL REFERENCES "BlogPost"("id") ON DELETE CASCADE,
  "userId" UUID REFERENCES "User"("id"), -- null for anonymous views
  "ipAddress" INET,
  "userAgent" TEXT,
  "referrer" TEXT,
  "viewedAt" TIMESTAMPTZ DEFAULT NOW(),
  "sessionId" TEXT,
  "readingProgress" FLOAT DEFAULT 0.0 -- percentage of article read
);

-- Blog Comments Table (for engagement)
CREATE TABLE IF NOT EXISTS "BlogComment" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "postId" UUID NOT NULL REFERENCES "BlogPost"("id") ON DELETE CASCADE,
  "userId" UUID REFERENCES "User"("id"),
  "parentId" UUID REFERENCES "BlogComment"("id"), -- for nested comments
  "authorName" TEXT NOT NULL,
  "authorEmail" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'approved', 'rejected', 'spam')),
  "isVerified" BOOLEAN DEFAULT FALSE,
  "likeCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Media Table (for managing images/files)
CREATE TABLE IF NOT EXISTS "BlogMedia" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "filename" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL, -- in bytes
  "url" TEXT NOT NULL,
  "altText" TEXT,
  "caption" TEXT,
  "type" TEXT NOT NULL CHECK ("type" IN ('image', 'video', 'document', 'audio')),
  "uploadedBy" UUID NOT NULL,
  "usageCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog SEO Analytics Table
CREATE TABLE IF NOT EXISTS "BlogSEOAnalytics" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "postId" UUID NOT NULL REFERENCES "BlogPost"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "organicViews" INTEGER DEFAULT 0,
  "searchImpressions" INTEGER DEFAULT 0,
  "searchClicks" INTEGER DEFAULT 0,
  "avgPosition" FLOAT,
  "topKeywords" TEXT[],
  "socialShares" INTEGER DEFAULT 0,
  "backlinks" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("postId", "date")
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS "idx_blog_post_status" ON "BlogPost"("status");
CREATE INDEX IF NOT EXISTS "idx_blog_post_published" ON "BlogPost"("publishedAt");
CREATE INDEX IF NOT EXISTS "idx_blog_post_category" ON "BlogPost"("category");
CREATE INDEX IF NOT EXISTS "idx_blog_post_slug" ON "BlogPost"("slug");
CREATE INDEX IF NOT EXISTS "idx_blog_post_created" ON "BlogPost"("createdAt");
CREATE INDEX IF NOT EXISTS "idx_blog_post_tags" ON "BlogPost" USING GIN("tags");
CREATE INDEX IF NOT EXISTS "idx_blog_post_keywords" ON "BlogPost" USING GIN("metaKeywords");

CREATE INDEX IF NOT EXISTS "idx_blog_view_post" ON "BlogPostView"("postId");
CREATE INDEX IF NOT EXISTS "idx_blog_view_date" ON "BlogPostView"("viewedAt");
CREATE INDEX IF NOT EXISTS "idx_blog_comment_post" ON "BlogComment"("postId");
CREATE INDEX IF NOT EXISTS "idx_blog_comment_status" ON "BlogComment"("status");

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS "idx_blog_post_search" ON "BlogPost" 
  USING GIN(to_tsvector('english', title || ' ' || content));

-- RLS Policies
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPostView" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogComment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogMedia" ENABLE ROW LEVEL SECURITY;

-- Admin full access to blog management
CREATE POLICY "Admin full access to blog posts" ON "BlogPost"
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM "User" 
      WHERE "User"."id" = auth.uid() 
      AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
    )
  );

-- Public can read published posts
CREATE POLICY "Public can read published blog posts" ON "BlogPost"
  FOR SELECT USING ("status" = 'published' AND "publishedAt" <= NOW());

-- Similar policies for other tables...

-- Functions for blog management
CREATE OR REPLACE FUNCTION update_blog_post_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_post_update_timestamp
  BEFORE UPDATE ON "BlogPost"
  FOR EACH ROW EXECUTE FUNCTION update_blog_post_updated_at();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_blog_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Convert to lowercase, replace spaces and special chars with hyphens
  base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  
  final_slug := base_slug;
  
  -- Check for existing slugs and append number if needed
  WHILE EXISTS (SELECT 1 FROM "BlogPost" WHERE "slug" = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
BEGIN
  -- Average reading speed: 200 words per minute
  RETURN GREATEST(1, ROUND(array_length(string_to_array(content, ' '), 1) / 200.0));
END;
$$ LANGUAGE plpgsql;

-- Function to count words
CREATE OR REPLACE FUNCTION count_words(content TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN array_length(string_to_array(trim(content), ' '), 1);
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE "BlogPost" 
  SET "viewCount" = "viewCount" + 1 
  WHERE "id" = post_id;
END;
$$ LANGUAGE plpgsql;

-- Seed initial blog categories
INSERT INTO "BlogCategory" ("name", "slug", "description", "color", "icon", "orderIndex") VALUES
('Legal & Compliance', 'legal-compliance', 'Legal requirements, compliance, and regulatory guidance for Indian startups', '#EF4444', 'Scale', 1),
('Funding & Investment', 'funding-investment', 'Fundraising strategies, investor relations, and financial planning', '#10B981', 'TrendingUp', 2),
('Finance & Operations', 'finance-operations', 'Financial management, accounting, and operational excellence', '#3B82F6', 'Calculator', 3),
('Sales & Marketing', 'sales-marketing', 'Sales strategies, marketing tactics, and customer acquisition', '#F59E0B', 'Target', 4),
('Government & Policy', 'government-policy', 'Government schemes, policies, and startup benefits in India', '#8B5CF6', 'Building', 5),
('Technology & Innovation', 'technology-innovation', 'Tech trends, innovation strategies, and digital transformation', '#06B6D4', 'Zap', 6),
('Leadership & Management', 'leadership-management', 'Leadership skills, team management, and organizational growth', '#84CC16', 'Users', 7),
('Industry Insights', 'industry-insights', 'Market analysis, industry trends, and competitive intelligence', '#F97316', 'BarChart3', 8),
('Success Stories', 'success-stories', 'Startup success stories, case studies, and lessons learned', '#EC4899', 'Star', 9),
('Resources & Tools', 'resources-tools', 'Templates, tools, and resources for startup founders', '#6366F1', 'FileText', 10)
ON CONFLICT ("name") DO NOTHING;

-- Seed initial blog tags
INSERT INTO "BlogTag" ("name", "slug", "description") VALUES
('startup-guide', 'startup-guide', 'Comprehensive guides for startup founders'),
('funding', 'funding', 'Articles about raising capital and funding strategies'),
('legal-advice', 'legal-advice', 'Legal guidance and compliance information'),
('government-schemes', 'government-schemes', 'Government programs and benefits for startups'),
('marketing-strategy', 'marketing-strategy', 'Marketing and growth strategies'),
('financial-planning', 'financial-planning', 'Financial management and planning advice'),
('technology-trends', 'technology-trends', 'Latest technology trends and innovations'),
('case-study', 'case-study', 'Real startup case studies and examples'),
('templates', 'templates', 'Free templates and resources'),
('beginners', 'beginners', 'Content specifically for startup beginners')
ON CONFLICT ("name") DO NOTHING;