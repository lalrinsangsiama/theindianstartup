-- Migration: Add missing foreign key indexes
-- Foreign keys without covering indexes can cause slow JOINs and DELETE cascades
-- These indexes improve query performance significantly

-- ============================================================================
-- BlogCategory - parentId (self-referential for nested categories)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_blogcategory_parent_id
ON public."BlogCategory" ("parentId")
WHERE "parentId" IS NOT NULL;

-- ============================================================================
-- BlogComment - parentId (for threaded comments)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_blogcomment_parent_id
ON public."BlogComment" ("parentId")
WHERE "parentId" IS NOT NULL;

-- ============================================================================
-- BlogMedia - uploadedBy (for user's media lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_blogmedia_uploaded_by
ON public."BlogMedia" ("uploadedBy");

-- ============================================================================
-- BlogPostTag - tagId (for tag-based post lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_blogposttag_tag_id
ON public."BlogPostTag" ("tagId");

-- ============================================================================
-- BlogPostView - userId (for user's view history)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_blogpostview_user_id
ON public."BlogPostView" ("userId")
WHERE "userId" IS NOT NULL;

-- ============================================================================
-- Coupon - userId (for user-specific coupons)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_coupon_user_id
ON public."Coupon" ("userId")
WHERE "userId" IS NOT NULL;

-- ============================================================================
-- FounderLog - userId (for user's founder logs)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_founderlog_user_id
ON public."FounderLog" ("userId");

-- ============================================================================
-- ModuleProgress - moduleId (for module completion stats)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_moduleprogress_module_id
ON public."ModuleProgress" ("moduleId");

-- ============================================================================
-- ModuleProgress - purchaseId (for purchase-based progress lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_moduleprogress_purchase_id
ON public."ModuleProgress" ("purchaseId")
WHERE "purchaseId" IS NOT NULL;

-- ============================================================================
-- PortfolioActivity - activityTypeId (for activity type filtering)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_portfolioactivity_activity_type_id
ON public."PortfolioActivity" ("activityTypeId");

-- ============================================================================
-- PortfolioActivity - portfolioId (for portfolio's activities lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_portfolioactivity_portfolio_id
ON public."PortfolioActivity" ("portfolioId");

-- ============================================================================
-- Purchase - productId (for product sales lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_purchase_product_id
ON public."Purchase" ("productId")
WHERE "productId" IS NOT NULL;

-- ============================================================================
-- Referral - refereeId (for referral tracking)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_referral_referee_id
ON public."Referral" ("refereeId")
WHERE "refereeId" IS NOT NULL;

-- ============================================================================
-- Resource - moduleId (for module resources lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_resource_module_id
ON public."Resource" ("moduleId");

-- ============================================================================
-- Review - userId (for user's reviews lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_review_user_id
ON public."Review" ("userId");

-- ============================================================================
-- TicketResponse - userId (for user's responses lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_ticketresponse_user_id
ON public."TicketResponse" ("userId")
WHERE "userId" IS NOT NULL;

-- ============================================================================
-- UserNote - adminId (for admin's notes lookup)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_usernote_admin_id
ON public."UserNote" ("adminId");

-- ============================================================================
-- Verification
-- ============================================================================
DO $$
DECLARE
  new_index_count INT;
BEGIN
  SELECT COUNT(*) INTO new_index_count
  FROM pg_indexes
  WHERE schemaname = 'public'
  AND indexname IN (
    'idx_blogcategory_parent_id',
    'idx_blogcomment_parent_id',
    'idx_blogmedia_uploaded_by',
    'idx_blogposttag_tag_id',
    'idx_blogpostview_user_id',
    'idx_coupon_user_id',
    'idx_founderlog_user_id',
    'idx_moduleprogress_module_id',
    'idx_moduleprogress_purchase_id',
    'idx_portfolioactivity_activity_type_id',
    'idx_portfolioactivity_portfolio_id',
    'idx_purchase_product_id',
    'idx_referral_referee_id',
    'idx_resource_module_id',
    'idx_review_user_id',
    'idx_ticketresponse_user_id',
    'idx_usernote_admin_id'
  );

  IF new_index_count = 17 THEN
    RAISE NOTICE 'SUCCESS: All 17 foreign key indexes created';
  ELSE
    RAISE NOTICE 'Created % of 17 foreign key indexes', new_index_count;
  END IF;
END $$;

-- ============================================================================
-- NOTE: Unused indexes are intentionally NOT dropped
-- ============================================================================
-- The "unused_index" warnings are expected for a newly launched platform.
-- These indexes were created for performance optimization and will be used
-- once the platform has real traffic. Dropping them prematurely would hurt
-- query performance when users start actively using the platform.
--
-- Indexes to monitor after 30 days of production traffic:
-- - idx_xp_event_user, idx_purchase_user, idx_purchase_product, etc.
-- - If still unused after sustained traffic, consider removal
-- ============================================================================
