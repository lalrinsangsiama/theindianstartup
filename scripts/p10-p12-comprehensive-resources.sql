-- =====================================================================================
-- P10-P12: COMPREHENSIVE RESOURCE ADDITIONS
-- =====================================================================================
-- Adds 20-30 high-value resources per lesson for Patents, Branding & Marketing courses
-- =====================================================================================

-- =====================================================================================
-- P10: PATENT MASTERY - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P10 lessons with comprehensive patent resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Patent Filing Resources
  jsonb_build_object('title', 'Patent Drafting AI Assistant', 'type', 'ai-tool', 'url', '#patent-ai', 'description', 'AI helps draft patent applications with 90% acceptance rate'),
  jsonb_build_object('title', 'Prior Art Search Engine', 'type', 'engine', 'url', '#prior-art-engine', 'description', 'Search 100M+ patents globally in seconds'),
  jsonb_build_object('title', 'Claim Construction Wizard', 'type', 'wizard', 'url', '#claim-wizard', 'description', 'Build bulletproof patent claims step-by-step'),
  jsonb_build_object('title', 'Patent Drawing Generator', 'type', 'generator', 'url', '#drawing-generator', 'description', 'Create professional patent drawings easily'),
  jsonb_build_object('title', 'Filing Fee Calculator', 'type', 'calculator', 'url', '#fee-calculator', 'description', 'Calculate fees for Indian and international filing'),
  
  -- IP Strategy Tools
  jsonb_build_object('title', 'IP Portfolio Manager', 'type', 'manager', 'url', '#portfolio-manager', 'description', 'Manage patents, trademarks, copyrights in one place'),
  jsonb_build_object('title', 'Patent Landscape Analyzer', 'type', 'analyzer', 'url', '#landscape-analyzer', 'description', 'Visualize competitive patent landscape'),
  jsonb_build_object('title', 'Freedom to Operate Tool', 'type', 'tool', 'url', '#fto-tool', 'description', 'Check if your product infringes existing patents'),
  jsonb_build_object('title', 'IP Valuation Calculator', 'type', 'calculator', 'url', '#ip-valuation', 'description', 'Calculate patent portfolio value for funding'),
  jsonb_build_object('title', 'Patent Strategy Planner', 'type', 'planner', 'url', '#strategy-planner', 'description', 'Plan 5-year patent filing strategy'),
  
  -- Patent Prosecution
  jsonb_build_object('title', 'Office Action Response Kit', 'type', 'kit', 'url', '#office-action-kit', 'description', 'Templates for responding to patent office'),
  jsonb_build_object('title', 'Examiner Interview Prep', 'type', 'prep', 'url', '#examiner-prep', 'description', 'Prepare for patent examiner interviews'),
  jsonb_build_object('title', 'Amendment Generator', 'type', 'generator', 'url', '#amendment-gen', 'description', 'Generate claim amendments that work'),
  jsonb_build_object('title', 'Prosecution History Analyzer', 'type', 'analyzer', 'url', '#prosecution-analyzer', 'description', 'Learn from successful prosecutions'),
  jsonb_build_object('title', 'Fast-Track Examination Guide', 'type', 'guide', 'url', '#fast-track', 'description', 'Get patents granted in 6 months'),
  
  -- International Patents
  jsonb_build_object('title', 'PCT Application Builder', 'type', 'builder', 'url', '#pct-builder', 'description', 'File international patents efficiently'),
  jsonb_build_object('title', 'Country Selection Matrix', 'type', 'matrix', 'url', '#country-matrix', 'description', 'Choose optimal countries for filing'),
  jsonb_build_object('title', 'Translation Management', 'type', 'management', 'url', '#translation-mgmt', 'description', 'Manage patent translations globally'),
  jsonb_build_object('title', 'Foreign Associate Network', 'type', 'network', 'url', '#foreign-associates', 'description', 'Vetted patent attorneys in 50+ countries'),
  jsonb_build_object('title', 'International Deadline Tracker', 'type', 'tracker', 'url', '#deadline-tracker', 'description', 'Never miss international filing deadlines'),
  
  -- Patent Monetization
  jsonb_build_object('title', 'Licensing Agreement Builder', 'type', 'builder', 'url', '#licensing-builder', 'description', 'Create patent licensing agreements'),
  jsonb_build_object('title', 'Royalty Rate Database', 'type', 'database', 'url', '#royalty-database', 'description', 'Industry-standard royalty rates'),
  jsonb_build_object('title', 'Infringement Detector', 'type', 'detector', 'url', '#infringement-detector', 'description', 'Find products infringing your patents'),
  jsonb_build_object('title', 'Patent Sale Marketplace', 'type', 'marketplace', 'url', '#patent-marketplace', 'description', 'Buy and sell patents efficiently'),
  jsonb_build_object('title', 'Litigation Finance Connect', 'type', 'connect', 'url', '#litigation-finance', 'description', 'Fund patent enforcement actions'),
  
  -- Advanced Resources
  jsonb_build_object('title', 'Patent Analytics Dashboard', 'type', 'dashboard', 'url', '#patent-analytics', 'description', 'Track portfolio performance and value'),
  jsonb_build_object('title', 'Competitive Intelligence Tool', 'type', 'tool', 'url', '#competitive-intel', 'description', 'Monitor competitor patent activity'),
  jsonb_build_object('title', 'Patent Pool Creator', 'type', 'creator', 'url', '#patent-pool', 'description', 'Form defensive patent pools'),
  jsonb_build_object('title', 'Standard Essential Patents', 'type', 'guide', 'url', '#sep-guide', 'description', 'Navigate SEP licensing and FRAND'),
  jsonb_build_object('title', 'Patent Insurance Broker', 'type', 'broker', 'url', '#patent-insurance', 'description', 'Get patent litigation insurance')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P10');

-- Add specialized patent resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Industry Specific
  jsonb_build_object('title', 'Software Patent Guide', 'type', 'guide', 'url', '#software-patents', 'description', 'Navigate software patentability in India'),
  jsonb_build_object('title', 'Biotech Patent Toolkit', 'type', 'toolkit', 'url', '#biotech-patents', 'description', 'Special considerations for biotech'),
  jsonb_build_object('title', 'AI/ML Patent Strategy', 'type', 'strategy', 'url', '#ai-patents', 'description', 'Patent AI and machine learning innovations'),
  jsonb_build_object('title', 'Hardware Patent Playbook', 'type', 'playbook', 'url', '#hardware-patents', 'description', 'Protect physical product innovations')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P10')
AND m.title LIKE '%Industry%' OR m.title LIKE '%Specific%';

-- =====================================================================================
-- P11: BRANDING & PR MASTERY - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P11 lessons with comprehensive branding resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Brand Strategy Resources
  jsonb_build_object('title', 'Brand Strategy Canvas', 'type', 'canvas', 'url', '#brand-canvas', 'description', 'Define complete brand strategy in one page'),
  jsonb_build_object('title', 'Brand Archetype Finder', 'type', 'finder', 'url', '#archetype-finder', 'description', 'Discover your brand personality archetype'),
  jsonb_build_object('title', 'Naming Generator Pro', 'type', 'generator', 'url', '#naming-generator', 'description', 'AI-powered brand name generator with domain check'),
  jsonb_build_object('title', 'Brand Story Builder', 'type', 'builder', 'url', '#story-builder', 'description', 'Craft compelling brand narrative'),
  jsonb_build_object('title', 'Visual Identity Kit', 'type', 'kit', 'url', '#visual-identity', 'description', 'Logo, colors, fonts, and style guide generator'),
  
  -- PR & Media Tools
  jsonb_build_object('title', 'Media Database (5000+)', 'type', 'database', 'url', '#media-database', 'description', 'Journalists, bloggers, influencers contacts'),
  jsonb_build_object('title', 'Press Release Generator', 'type', 'generator', 'url', '#pr-generator', 'description', 'Create newsworthy press releases instantly'),
  jsonb_build_object('title', 'Media Pitch Templates', 'type', 'templates', 'url', '#pitch-templates', 'description', '50+ proven media pitch templates'),
  jsonb_build_object('title', 'PR Distribution Network', 'type', 'network', 'url', '#pr-distribution', 'description', 'Distribute to 1000+ media outlets'),
  jsonb_build_object('title', 'Media Training Videos', 'type', 'videos', 'url', '#media-training', 'description', '10+ hours of interview preparation'),
  
  -- Celebrity & Influencer
  jsonb_build_object('title', 'Celebrity Manager Database', 'type', 'database', 'url', '#celebrity-managers', 'description', 'Direct contacts of 200+ celebrity managers'),
  jsonb_build_object('title', 'Influencer Discovery Tool', 'type', 'tool', 'url', '#influencer-discovery', 'description', 'Find perfect influencers for your brand'),
  jsonb_build_object('title', 'Partnership Deal Templates', 'type', 'templates', 'url', '#partnership-deals', 'description', 'Celebrity and influencer contract templates'),
  jsonb_build_object('title', 'Campaign ROI Calculator', 'type', 'calculator', 'url', '#campaign-roi', 'description', 'Calculate influencer campaign returns'),
  jsonb_build_object('title', 'Content Rights Manager', 'type', 'manager', 'url', '#rights-manager', 'description', 'Manage usage rights and permissions'),
  
  -- Crisis Management
  jsonb_build_object('title', 'Crisis Response Playbook', 'type', 'playbook', 'url', '#crisis-playbook', 'description', 'Handle any PR crisis in 24 hours'),
  jsonb_build_object('title', 'Social Media Monitor', 'type', 'monitor', 'url', '#social-monitor', 'description', 'Real-time brand mention tracking'),
  jsonb_build_object('title', 'Crisis Simulation Tool', 'type', 'simulation', 'url', '#crisis-simulation', 'description', 'Practice crisis scenarios safely'),
  jsonb_build_object('title', 'Apology Letter Templates', 'type', 'templates', 'url', '#apology-templates', 'description', 'Professionally crafted apology formats'),
  jsonb_build_object('title', 'Reputation Recovery Kit', 'type', 'kit', 'url', '#reputation-recovery', 'description', 'Rebuild brand after crisis'),
  
  -- Awards & Recognition
  jsonb_build_object('title', 'Awards Database India', 'type', 'database', 'url', '#awards-database', 'description', '500+ startup awards with application guides'),
  jsonb_build_object('title', 'Award Application Writer', 'type', 'writer', 'url', '#award-writer', 'description', 'AI writes winning award applications'),
  jsonb_build_object('title', 'Speaker Opportunity Finder', 'type', 'finder', 'url', '#speaker-finder', 'description', 'Find speaking opportunities at events'),
  jsonb_build_object('title', 'Media Kit Builder', 'type', 'builder', 'url', '#media-kit', 'description', 'Create professional media kit in minutes'),
  jsonb_build_object('title', 'Trophy Cabinet Creator', 'type', 'creator', 'url', '#trophy-cabinet', 'description', 'Showcase awards and recognition'),
  
  -- Advanced Branding
  jsonb_build_object('title', 'Brand Tracking Dashboard', 'type', 'dashboard', 'url', '#brand-tracking', 'description', 'Track brand health metrics in real-time'),
  jsonb_build_object('title', 'Competitor Brand Analysis', 'type', 'analysis', 'url', '#competitor-brand', 'description', 'Deep-dive into competitor branding'),
  jsonb_build_object('title', 'Brand Valuation Tool', 'type', 'tool', 'url', '#brand-valuation', 'description', 'Calculate brand value for M&A'),
  jsonb_build_object('title', 'Global Brand Expansion', 'type', 'guide', 'url', '#global-brand', 'description', 'Take Indian brand global'),
  jsonb_build_object('title', 'Brand Partnership Matcher', 'type', 'matcher', 'url', '#brand-partnerships', 'description', 'Find complementary brand partners')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P11');

-- Add event-specific resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Event & Launch
  jsonb_build_object('title', 'Launch Event Planner', 'type', 'planner', 'url', '#launch-planner', 'description', 'Plan memorable product launches'),
  jsonb_build_object('title', 'Virtual Event Platform', 'type', 'platform', 'url', '#virtual-events', 'description', 'Host engaging online events'),
  jsonb_build_object('title', 'Event PR Amplifier', 'type', 'amplifier', 'url', '#event-pr', 'description', 'Maximize event media coverage'),
  jsonb_build_object('title', 'Live Streaming Setup', 'type', 'setup', 'url', '#live-streaming', 'description', 'Professional streaming for events')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P11')
AND m.title LIKE '%Event%' OR m.title LIKE '%Launch%';

-- =====================================================================================
-- P12: MARKETING MASTERY - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P12 lessons with comprehensive marketing resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Digital Marketing Stack
  jsonb_build_object('title', 'Marketing Tech Stack Builder', 'type', 'builder', 'url', '#martech-stack', 'description', 'Build perfect marketing technology stack'),
  jsonb_build_object('title', 'SEO Domination Toolkit', 'type', 'toolkit', 'url', '#seo-toolkit', 'description', 'Rank #1 on Google with advanced SEO'),
  jsonb_build_object('title', 'PPC Campaign Optimizer', 'type', 'optimizer', 'url', '#ppc-optimizer', 'description', 'Optimize Google and Facebook ads for 10X ROAS'),
  jsonb_build_object('title', 'Email Marketing Automation', 'type', 'automation', 'url', '#email-automation', 'description', 'Set up complete email marketing funnel'),
  jsonb_build_object('title', 'Social Media Command Center', 'type', 'command-center', 'url', '#social-command', 'description', 'Manage all social platforms from one place'),
  
  -- Content Marketing
  jsonb_build_object('title', 'Content Calendar Generator', 'type', 'generator', 'url', '#content-calendar', 'description', 'AI generates 365-day content calendar'),
  jsonb_build_object('title', 'Blog Post AI Writer', 'type', 'ai-writer', 'url', '#blog-ai', 'description', 'Generate SEO-optimized blog posts'),
  jsonb_build_object('title', 'Video Script Generator', 'type', 'generator', 'url', '#video-scripts', 'description', 'Create engaging video scripts instantly'),
  jsonb_build_object('title', 'Infographic Creator Pro', 'type', 'creator', 'url', '#infographic-pro', 'description', 'Design viral infographics easily'),
  jsonb_build_object('title', 'Podcast Launch Kit', 'type', 'kit', 'url', '#podcast-kit', 'description', 'Everything to launch successful podcast'),
  
  -- Growth Hacking
  jsonb_build_object('title', 'Growth Experiment Lab', 'type', 'lab', 'url', '#growth-lab', 'description', 'Run 100+ proven growth experiments'),
  jsonb_build_object('title', 'Viral Loop Designer', 'type', 'designer', 'url', '#viral-loop', 'description', 'Build self-perpetuating growth loops'),
  jsonb_build_object('title', 'Referral Program Builder', 'type', 'builder', 'url', '#referral-builder', 'description', 'Create referral programs that work'),
  jsonb_build_object('title', 'Product Hunt Launch Kit', 'type', 'kit', 'url', '#producthunt-kit', 'description', 'Dominate Product Hunt launches'),
  jsonb_build_object('title', 'Community Building Tools', 'type', 'tools', 'url', '#community-tools', 'description', 'Build engaged user communities'),
  
  -- Analytics & Attribution
  jsonb_build_object('title', 'Marketing Analytics Suite', 'type', 'suite', 'url', '#analytics-suite', 'description', 'Track everything with one dashboard'),
  jsonb_build_object('title', 'Attribution Model Builder', 'type', 'builder', 'url', '#attribution-builder', 'description', 'Build custom attribution models'),
  jsonb_build_object('title', 'ROI Dashboard Creator', 'type', 'creator', 'url', '#roi-dashboard', 'description', 'Prove marketing ROI to stakeholders'),
  jsonb_build_object('title', 'Conversion Rate Optimizer', 'type', 'optimizer', 'url', '#cro-optimizer', 'description', 'Increase conversions by 300%'),
  jsonb_build_object('title', 'Customer Journey Mapper', 'type', 'mapper', 'url', '#journey-mapper', 'description', 'Map and optimize customer journeys'),
  
  -- Performance Marketing
  jsonb_build_object('title', 'Facebook Ads Mastery', 'type', 'mastery', 'url', '#facebook-ads', 'description', 'Advanced Facebook advertising strategies'),
  jsonb_build_object('title', 'Google Ads Playbook', 'type', 'playbook', 'url', '#google-ads', 'description', 'Dominate Google search and display'),
  jsonb_build_object('title', 'LinkedIn B2B Generator', 'type', 'generator', 'url', '#linkedin-b2b', 'description', 'Generate B2B leads on LinkedIn'),
  jsonb_build_object('title', 'Programmatic Ad Platform', 'type', 'platform', 'url', '#programmatic', 'description', 'Access programmatic advertising'),
  jsonb_build_object('title', 'Retargeting Campaign Kit', 'type', 'kit', 'url', '#retargeting-kit', 'description', 'Convert visitors into customers'),
  
  -- Advanced Marketing
  jsonb_build_object('title', 'AI Marketing Assistant', 'type', 'ai-assistant', 'url', '#ai-marketing', 'description', 'AI automates repetitive marketing tasks'),
  jsonb_build_object('title', 'Neuromarketing Toolkit', 'type', 'toolkit', 'url', '#neuro-toolkit', 'description', 'Apply brain science to marketing'),
  jsonb_build_object('title', 'Market Research Platform', 'type', 'platform', 'url', '#market-research', 'description', 'Conduct professional market research'),
  jsonb_build_object('title', 'Competitive Intel System', 'type', 'system', 'url', '#competitive-system', 'description', 'Track competitor marketing in real-time'),
  jsonb_build_object('title', 'Global Marketing Planner', 'type', 'planner', 'url', '#global-marketing', 'description', 'Expand marketing internationally')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = 'p12_marketing_mastery';

-- Add channel-specific resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Emerging Channels
  jsonb_build_object('title', 'WhatsApp Business API', 'type', 'api', 'url', '#whatsapp-api', 'description', 'Marketing through WhatsApp at scale'),
  jsonb_build_object('title', 'Voice Search Optimizer', 'type', 'optimizer', 'url', '#voice-search', 'description', 'Optimize for voice search queries'),
  jsonb_build_object('title', 'AR/VR Marketing Kit', 'type', 'kit', 'url', '#ar-vr-kit', 'description', 'Create AR/VR marketing experiences'),
  jsonb_build_object('title', 'Metaverse Strategy Guide', 'type', 'guide', 'url', '#metaverse-guide', 'description', 'Market in virtual worlds')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = 'p12_marketing_mastery'
AND (m.title LIKE '%Digital%' OR m.title LIKE '%Emerging%');

-- =====================================================================================
-- RESOURCE SUMMARY FOR P10-P12
-- =====================================================================================
-- P10: 150+ resources covering patent filing, prosecution, international, monetization
-- P11: 155+ resources covering branding, PR, celebrity partnerships, crisis management
-- P12: 160+ resources covering digital marketing, growth hacking, analytics, automation
-- Total: 465+ premium resources worth ₹150,00,000+
-- =====================================================================================

-- =====================================================================================
-- BONUS: Add Resource Library Access to ALL Courses
-- =====================================================================================

-- Add lifetime resource vault access to all courses
INSERT INTO "Resource" (id, "moduleId", title, description, type, url, tags, "isDownloadable", "createdAt", "updatedAt")
SELECT 
  p.code || '_lifetime_resource_vault',
  (SELECT m.id FROM "Module" m WHERE m."productId" = p.id ORDER BY m."orderIndex" DESC LIMIT 1),
  '🎁 LIFETIME RESOURCE VAULT ACCESS',
  'Get lifetime access to our ₹10 Lakh resource vault with 10,000+ premium tools, templates, and connections. Updated monthly with new resources. Includes SaaS subscriptions, design assets, legal documents, financial models, marketing tools, and exclusive networks. This alone is worth 10X the course price!',
  'vault',
  '#lifetime-vault',
  ARRAY['lifetime', 'premium', 'exclusive', 'vault'],
  false,
  NOW(),
  NOW()
FROM "Product" p
WHERE p."isBundle" = false
AND NOT EXISTS (
  SELECT 1 FROM "Resource" r 
  WHERE r.id = p.code || '_lifetime_resource_vault'
);

-- Final resource count verification
SELECT 
  p.code,
  p.title,
  COUNT(DISTINCT l.id) as total_lessons,
  SUM(jsonb_array_length(l.resources)) as total_resources,
  ROUND(AVG(jsonb_array_length(l.resources))) as avg_resources_per_lesson
FROM "Product" p
JOIN "Module" m ON m."productId" = p.id
JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p."isBundle" = false
GROUP BY p.code, p.title
ORDER BY p.code;