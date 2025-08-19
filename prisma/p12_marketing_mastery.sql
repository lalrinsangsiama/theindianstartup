-- P12: Marketing Mastery - Complete Growth Engine Course
-- 60 days, 12 modules, 60 lessons - Most comprehensive marketing course
-- Price: ₹9,999 (premium positioning)

-- Insert Product
INSERT INTO "Product" (
  id,
  code,
  title,
  description,
  price,
  "isBundle",
  "estimatedDays",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_marketing_mastery',
  'P12',
  'Marketing Mastery - Complete Growth Engine',
  'Transform into a data-driven marketing machine generating predictable customer acquisition, retention, and growth with measurable ROI. Master all marketing channels from SEO to AI, build complete marketing systems, and create predictable growth engines that scale. Includes 500+ marketing templates, complete tech stack setup, and advanced strategies for B2B, e-commerce, and international markets.',
  999900,
  false,
  60,
  NOW(),
  NOW()
);

-- Module 1: Marketing Foundations & Strategy (Days 1-4)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod1_foundations',
  'p12_marketing_mastery',
  'Marketing Foundations & Strategy',
  'Master modern marketing fundamentals, customer understanding, strategic framework development, and comprehensive metrics tracking. Build the foundation for data-driven marketing success.',
  1,
  NOW(),
  NOW()
);

-- Module 1 Lessons
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_1',
  'p12_mod1_foundations',
  1,
  'Marketing in the Digital Age',
  'Modern marketing has evolved beyond traditional advertising into a comprehensive growth engine. Today''s marketers must understand the complete customer journey (AAARRR: Awareness, Acquisition, Activation, Retention, Revenue, Referral) and balance performance marketing with brand building.

The Indian market presents unique challenges: diverse languages, varying digital adoption across tier 1-3 cities, price sensitivity, and strong preference for mobile-first experiences. Successful marketers must think digitally but execute omnichannel strategies.

Marketing now directly impacts company valuation through predictable growth metrics, customer lifetime value, and acquisition efficiency. The modern marketing stack includes 20+ tools working together to create seamless customer experiences and measurable outcomes.

Key principles: Customer-centricity, data-driven decisions, continuous experimentation, cross-channel orchestration, and ROI accountability. Marketing is no longer a cost center but a growth driver with clear revenue attribution.',
  '["Audit your current marketing activities and categorize them into AAARRR framework", "Map your customer journey from awareness to advocacy identifying all touchpoints", "Evaluate your marketing stack and identify gaps in acquisition, activation, or retention tools", "Calculate your current Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV)", "Create a competitive analysis of 5 direct competitors marketing strategies", "Define your marketing philosophy and core principles for your organization"]',
  '["AAARRR Framework Template for customer journey mapping", "Marketing Stack Audit Checklist with 50+ tool categories", "Customer Journey Mapping Template with touchpoint analysis", "CAC and LTV Calculator with industry benchmarks", "Competitive Analysis Framework for marketing strategy", "Marketing Philosophy Development Guide with examples"]',
  180,
  220,
  1,
  NOW(),
  NOW()
),
(
  'p12_lesson_2',
  'p12_mod1_foundations',
  2,
  'Customer Understanding Deep Dive',
  'Deep customer understanding is the foundation of effective marketing. This goes beyond basic demographics to psychographics, behavioral patterns, and emotional triggers that drive decisions.

Primary research methods include customer interviews (20+ interviews for statistically relevant insights), surveys with proper question design, focus groups for qualitative insights, and social listening for unfiltered opinions. Secondary research involves industry reports, competitor analysis, and market studies.

Effective customer personas combine demographic data (age, income, location), psychographic insights (values, interests, lifestyle), behavioral patterns (buying habits, channel preferences), and pain points with emotional context.

In India, consider regional variations, language preferences, cultural sensitivities, and the digital divide between urban and rural markets. Mobile-first behavior dominates, but traditional media still influences decisions, especially in tier 2-3 cities.

Advanced techniques include customer journey mapping with emotional layers, decision-making unit analysis for B2B, and cultural anthropology for deeper insights.',
  '["Conduct 10 customer interviews using provided script templates", "Create detailed buyer personas for your top 3 customer segments", "Design and launch a customer survey with 15+ strategic questions", "Perform social listening analysis using free and paid tools", "Map pain points and emotional triggers for each customer persona", "Validate personas through sales team interviews and customer data analysis"]',
  '["Customer Interview Script Templates for 5 different business types", "Buyer Persona Development Canvas with 25+ data points", "Survey Design Guide with question banks and best practices", "Social Listening Setup Guide for 10+ platforms and tools", "Pain Point Mapping Template with emotional trigger analysis", "Persona Validation Checklist with data sources and methods"]',
  165,
  200,
  2,
  NOW(),
  NOW()
),
(
  'p12_lesson_3',
  'p12_mod1_foundations',
  3,
  'Marketing Strategy Framework',
  'A comprehensive marketing strategy connects business objectives to tactical execution through a systematic framework. Start with clear target market selection using TAM/SAM/SOM analysis and customer segment prioritization.

Positioning strategy defines how you want to be perceived versus competitors. Use the positioning canvas: For [target customer] who [customer need], [brand] is the [category] that [unique benefit] unlike [competitors] because [reasons to believe].

Channel strategy involves selecting the optimal mix of owned, earned, and paid media based on where your customers spend time and how they prefer to consume information. Content strategy aligns with customer journey stages and business objectives.

Budget allocation follows the 40/20/20/20 rule: 40% on proven channels, 20% on promising channels, 20% on experimental channels, and 20% on brand building. Timeline planning considers seasonality, competitive landscape, and internal resource availability.

Team structure should align with strategy, not the other way around. Success metrics must be leading indicators, not just lagging indicators.',
  '["Complete TAM/SAM/SOM analysis for your market opportunity", "Develop positioning statement using the positioning canvas", "Create channel strategy matrix evaluating 15+ marketing channels", "Build content strategy aligned with customer journey stages", "Design budget allocation model with scenario planning", "Establish marketing team structure and role definitions"]',
  '["TAM/SAM/SOM Calculation Template with market sizing methodologies", "Positioning Canvas with competitor analysis framework", "Channel Evaluation Matrix with 50+ channels and scoring criteria", "Content Strategy Template aligned with buyer journey stages", "Marketing Budget Allocation Model with ROI tracking", "Team Structure Template with roles, responsibilities, and KPIs"]',
  170,
  210,
  3,
  NOW(),
  NOW()
),
(
  'p12_lesson_4',
  'p12_mod1_foundations',
  4,
  'Marketing Metrics & KPIs',
  'Marketing measurement requires both leading and lagging indicators across the entire customer lifecycle. North Star Metrics provide business-level direction: Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), CAC:LTV ratio (should be 1:3 minimum), and payback period (target under 12 months).

Channel-specific metrics include Cost Per Acquisition (CPA), conversion rates at each funnel stage, click-through rates (CTR), engagement rates, Return on Ad Spend (ROAS), and quality scores. Attribution models help understand multi-touch customer journeys.

Advanced metrics include cohort analysis for retention trends, net revenue retention for growth quality, marketing-influenced revenue for business impact, and marketing velocity for pipeline acceleration.

Create dashboards with three levels: Executive (business metrics), Marketing Manager (channel performance), and Specialist (tactical optimization). Implement data visualization best practices and automated reporting.

Indian market considerations include mobile-specific metrics, regional performance variations, and offline-to-online attribution challenges.',
  '["Set up comprehensive marketing analytics dashboard using Google Analytics 4", "Define and calculate your marketing North Star Metrics", "Implement attribution modeling for multi-channel customer journeys", "Create weekly marketing performance reporting template", "Establish benchmark targets for all key marketing metrics", "Design cohort analysis framework for customer retention tracking"]',
  '["Marketing Metrics Dictionary with 100+ KPI definitions and benchmarks", "Analytics Dashboard Template for Google Analytics 4 and Data Studio", "Attribution Modeling Guide with setup instructions for multiple platforms", "Marketing Performance Report Template with executive summary", "Benchmark Database with industry-specific performance standards", "Cohort Analysis Template with retention and revenue tracking"]',
  175,
  215,
  4,
  NOW(),
  NOW()
);

-- Module 2: Digital Marketing Fundamentals (Days 5-10)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod2_digital',
  'p12_marketing_mastery',
  'Digital Marketing Fundamentals',
  'Master the core digital marketing channels: SEO, SEM, social media, content marketing, email marketing, and marketing automation. Build expertise in each channel with advanced tactics and optimization strategies.',
  2,
  NOW(),
  NOW()
);

-- Module 2 Lessons
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_5',
  'p12_mod2_digital',
  5,
  'Search Engine Optimization (SEO)',
  'SEO is the foundation of sustainable organic growth. Modern SEO requires technical excellence, content authority, and off-page credibility. Start with comprehensive keyword research using tools like Ahrefs, SEMrush, or free alternatives like Ubersuggest.

On-page optimization involves title tags (50-60 characters), meta descriptions (150-160 characters), header structure (H1-H6 hierarchy), URL optimization, internal linking strategy, and content optimization for user intent. Schema markup helps search engines understand your content better.

Technical SEO ensures search engines can crawl and index your site efficiently. Focus on site speed (Core Web Vitals), mobile responsiveness, XML sitemaps, robots.txt optimization, canonical tags, SSL certificates, and structured data implementation.

Off-page SEO builds domain authority through high-quality backlinks, digital PR, guest posting, brand mentions, and local citations. Quality matters more than quantity - focus on relevant, authoritative sites in your industry.

Indian SEO considerations include local language optimization, regional search patterns, mobile-first indexing, and voice search optimization for vernacular queries.',
  '["Conduct comprehensive keyword research for 100+ target keywords", "Optimize 10 key pages for on-page SEO best practices", "Implement technical SEO fixes for site speed and mobile optimization", "Create and submit XML sitemap to Google Search Console", "Build 20 high-quality backlinks through strategic outreach", "Set up SEO monitoring and tracking system"]',
  '["Keyword Research Template with competitor analysis and search volume data", "On-Page SEO Checklist with 50+ optimization points", "Technical SEO Audit Template with prioritized fix recommendations", "Link Building Outreach Templates with success rates by industry", "SEO Monitoring Dashboard with rank tracking and traffic analysis", "Local SEO Optimization Guide for Indian market specifics"]',
  180,
  220,
  5,
  NOW(),
  NOW()
),
(
  'p12_lesson_6',
  'p12_mod2_digital',
  6,
  'Search Engine Marketing (SEM)',
  'Google Ads mastery requires understanding account structure, keyword strategy, ad copy optimization, and landing page alignment. Structure accounts with tightly themed ad groups, relevant keywords, and tailored ad copy for maximum Quality Score.

Campaign types include Search (text ads), Display (image/banner ads), Shopping (product ads), Video (YouTube ads), App (mobile app promotion), Smart (automated), Performance Max (all Google properties), and Discovery (Gmail, YouTube, Discover).

Advanced tactics include Single Keyword Ad Groups (SKAGs) for maximum relevance, Dynamic Search Ads for discovery, Responsive Search Ads for automated testing, and Smart Bidding strategies for conversion optimization.

Optimization focuses on Quality Score improvement (expected CTR, ad relevance, landing page experience), bid management, negative keyword lists, ad extensions utilization, audience targeting, and conversion tracking setup.

Landing page optimization is crucial - ensure message match, fast loading times, clear value proposition, minimal form fields, and strong call-to-action. A/B test everything continuously.',
  '["Set up Google Ads account with proper campaign structure", "Create 5 search campaigns with optimized ad copy and keywords", "Implement conversion tracking and Google Analytics integration", "Build negative keyword lists and implement bid strategies", "Design and test 3 landing page variations for top campaigns", "Launch display remarketing campaign for website visitors"]',
  '["Google Ads Account Structure Template with naming conventions", "Ad Copy Writing Framework with 20+ proven templates", "Quality Score Optimization Checklist with improvement tactics", "Landing Page Optimization Guide with conversion rate best practices", "Google Ads Scripts Library for automation and optimization", "SEM Performance Tracking Template with ROI calculations"]',
  175,
  210,
  6,
  NOW(),
  NOW()
),
(
  'p12_lesson_7',
  'p12_mod2_digital',
  7,
  'Social Media Marketing',
  'Social media marketing requires platform-specific strategies, consistent content creation, and community engagement. Each platform has unique characteristics: Facebook for community building, Instagram for visual storytelling, LinkedIn for B2B networking, Twitter for real-time engagement.

Content strategy involves creating a content calendar with diverse post types: educational (40%), entertaining (30%), promotional (20%), and user-generated content (10%). Use platform-specific features like Instagram Stories, LinkedIn polls, Facebook Groups, and Twitter Spaces.

Organic growth tactics include hashtag research, optimal posting times, engagement strategies, influencer collaboration, user-generated content campaigns, and community building. Focus on building genuine relationships rather than just follower count.

Paid social advertising offers precise targeting options: demographics, interests, behaviors, custom audiences, and lookalike audiences. Create compelling creative assets, test different ad formats, and optimize for platform-specific objectives.

Regional considerations for India include vernacular content, festival-specific campaigns, regional influencers, and mobile-optimized content for data-conscious users.',
  '["Develop comprehensive social media strategy for 3 primary platforms", "Create 30-day content calendar with diverse post types", "Implement hashtag research and optimization strategy", "Launch paid social campaign with audience targeting and creative testing", "Build social media community engagement system", "Set up social media analytics and performance tracking"]',
  '["Social Media Strategy Template with platform-specific tactics", "Content Calendar Template with post scheduling and theme planning", "Hashtag Research Guide with tools and optimization techniques", "Social Media Ad Creative Templates for all major platforms", "Community Management Guide with engagement best practices", "Social Media Analytics Dashboard with KPI tracking"]',
  165,
  195,
  7,
  NOW(),
  NOW()
),
(
  'p12_lesson_8',
  'p12_mod2_digital',
  8,
  'Content Marketing',
  'Content marketing builds authority, drives organic traffic, and nurtures prospects through valuable information. Start with content audit, topic research using keyword tools and customer insights, and content calendar planning.

Content types serve different purposes: blog posts for SEO and thought leadership, videos for engagement and explanation, infographics for complex data visualization, podcasts for intimate connection, ebooks for lead generation, case studies for social proof, and webinars for education and lead nurturing.

Distribution strategy is as important as creation: owned channels (website, email), earned media (PR, organic social shares), paid promotion (social ads, native advertising), email newsletters, social amplification, partner channels, and content syndication.

Content optimization includes SEO optimization, social media optimization, email marketing integration, lead magnet creation, content repurposing across formats, and performance tracking.

Measure success through traffic generation, lead quality, engagement metrics, social shares, backlink acquisition, and ultimately, revenue attribution.',
  '["Complete content audit and gap analysis for your industry", "Develop comprehensive content strategy with topic clusters", "Create content production workflow and editorial calendar", "Produce 10 pieces of high-quality content across different formats", "Implement content distribution and promotion strategy", "Set up content performance tracking and optimization system"]',
  '["Content Audit Template with competitive analysis framework", "Content Strategy Canvas with topic clustering and keyword mapping", "Editorial Calendar Template with production workflow management", "Content Creation Templates for blogs, videos, infographics, and ebooks", "Content Distribution Checklist with 30+ promotion channels", "Content Performance Dashboard with engagement and conversion tracking"]',
  170,
  205,
  8,
  NOW(),
  NOW()
),
(
  'p12_lesson_9',
  'p12_mod2_digital',
  9,
  'Email Marketing',
  'Email marketing delivers the highest ROI of any digital channel when executed properly. Build email lists through lead magnets, content upgrades, website opt-ins, social media promotion, and strategic partnerships. Focus on quality over quantity.

Segmentation improves performance significantly: demographic segments, behavioral segments (purchase history, engagement level), lifecycle stage (new subscriber, active customer, churned), and preference-based segments. Use dynamic content for personalization.

Automation workflows handle routine communications efficiently: welcome series for new subscribers, nurture campaigns for prospects, promotional sequences for products, transactional emails for purchases, re-engagement campaigns for inactive subscribers, and win-back sequences for churned customers.

Advanced tactics include predictive sending times, AI-powered subject line optimization, interactive emails with polls/surveys, AMP emails for dynamic content, cross-channel integration with SMS and social media, and behavioral trigger campaigns.

Deliverability requires technical setup: SPF, DKIM, and DMARC records, IP warming, list hygiene, engagement monitoring, and reputation management.',
  '["Build email list growth strategy with 5+ lead magnets", "Set up email automation workflows for customer lifecycle", "Create segmentation strategy with 10+ customer segments", "Design and launch welcome email series", "Implement email deliverability best practices", "Develop email performance optimization system"]',
  '["Email Marketing Strategy Template with list building tactics", "Lead Magnet Creation Guide with 50+ ideas and templates", "Email Automation Workflow Templates for all customer lifecycle stages", "Email Design Templates with mobile optimization", "Deliverability Setup Guide with technical configuration", "Email Analytics Dashboard with engagement and revenue tracking"]',
  175,
  215,
  9,
  NOW(),
  NOW()
),
(
  'p12_lesson_10',
  'p12_mod2_digital',
  10,
  'Marketing Automation',
  'Marketing automation orchestrates personalized customer experiences at scale. Choose platforms based on needs: HubSpot for all-in-one solution, Marketo for enterprise B2B, ActiveCampaign for SMB, or Mailchimp for simple automation.

Workflow design requires understanding customer journey stages, behavioral triggers, scoring models, and handoff processes. Create lead scoring based on demographic data and behavioral actions, then trigger appropriate nurture sequences.

Advanced automation includes multi-channel campaigns (email + SMS + social), predictive analytics for next best action, AI-powered content personalization, dynamic content based on real-time data, and sales alert integration.

Integration strategy connects automation platform with CRM, analytics tools, social media platforms, advertising accounts, and custom applications through APIs or native integrations.

Performance optimization involves A/B testing workflows, analyzing drop-off points, optimizing trigger conditions, personalizing content, and measuring business impact through revenue attribution.',
  '["Select and implement marketing automation platform", "Design automated lead nurturing workflows", "Set up lead scoring and segmentation rules", "Create multi-channel automation campaigns", "Integrate automation platform with existing tools", "Establish automation performance monitoring and optimization"]',
  '["Marketing Automation Platform Comparison Guide with feature analysis", "Workflow Design Templates for 15+ common automation scenarios", "Lead Scoring Model Template with behavioral and demographic factors", "Integration Guide for connecting automation tools with CRM and analytics", "Automation Performance Dashboard with conversion and revenue tracking", "Marketing Automation Best Practices Checklist with optimization tips"]',
  180,
  220,
  10,
  NOW(),
  NOW()
);

-- Module 3: Performance Marketing (Days 11-16)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod3_performance',
  'p12_marketing_mastery',
  'Performance Marketing',
  'Master paid advertising across all major platforms with advanced optimization tactics. Learn Facebook/Instagram ads, Google Ads advanced features, LinkedIn B2B marketing, emerging platforms, and comprehensive attribution modeling.',
  3,
  NOW(),
  NOW()
);

-- Module 3 Lessons
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_11',
  'p12_mod3_performance',
  11,
  'Performance Marketing Fundamentals',
  'Performance marketing focuses on measurable actions and ROI optimization. Success requires systematic channel evaluation, budget allocation modeling, testing methodology, and scaling strategies.

Channel assessment involves evaluating 20+ channels using criteria: audience fit, cost efficiency, scalability potential, competition level, and resource requirements. Use portfolio approach - test multiple channels simultaneously rather than one at a time.

Campaign structure follows hierarchical organization: Account → Campaign → Ad Set/Ad Group → Creative/Ad. Maintain consistent naming conventions, logical grouping, and clear tracking setup for easy optimization and reporting.

Budget allocation follows the 70/20/10 rule: 70% on proven performers, 20% on promising channels, 10% on experimental channels. Include seasonal adjustments, competitive response planning, and risk management strategies.

Performance optimization requires continuous testing: creative variations, audience segments, bidding strategies, landing pages, and campaign structures. Document everything and build institutional knowledge.',
  '["Evaluate 15+ marketing channels using assessment framework", "Develop performance marketing budget allocation strategy", "Create campaign naming conventions and account structure", "Implement comprehensive tracking and attribution setup", "Launch test campaigns across 3 different channels", "Establish performance optimization workflow and testing calendar"]',
  '["Channel Assessment Matrix with scoring criteria for 20+ channels", "Performance Marketing Budget Model with scenario planning", "Campaign Structure Template with naming conventions", "Tracking Implementation Guide with UTM parameters and conversion setup", "A/B Testing Framework with statistical significance calculations", "Performance Optimization Checklist with weekly, monthly, and quarterly tasks"]',
  180,
  220,
  11,
  NOW(),
  NOW()
),
(
  'p12_lesson_12',
  'p12_mod3_performance',
  12,
  'Facebook & Instagram Advertising',
  'Facebook and Instagram advertising offers unparalleled targeting precision and creative flexibility. Master Business Manager setup, Pixel implementation, Conversions API integration, and iOS 14.5+ privacy adaptations.

Campaign objectives align with business goals: Awareness for reach, Traffic for website visits, Engagement for interactions, Leads for data collection, App Promotion for downloads, Sales for conversions. Choose objectives that optimize for your desired outcomes.

Creative excellence drives performance: use high-quality visuals, compelling copy, clear value propositions, and strong calls-to-action. Test multiple creative variations, ad formats (single image, carousel, video, collection), and creative concepts simultaneously.

Advanced strategies include funnel-based campaigns (awareness → consideration → conversion), dynamic product ads for e-commerce, retargeting campaigns for website visitors, lookalike audiences for acquisition, and custom audiences for precision targeting.

Optimization focuses on ad relevance score, audience refinement, creative rotation, bid strategy selection, budget allocation, and landing page experience improvement.',
  '["Set up Facebook Business Manager with proper account structure", "Implement Facebook Pixel and Conversions API tracking", "Create comprehensive Facebook advertising strategy with funnel campaigns", "Launch creative testing campaigns with 10+ ad variations", "Build custom and lookalike audiences for targeting", "Implement Facebook ads optimization and scaling system"]',
  '["Facebook Ads Account Setup Guide with Business Manager configuration", "Facebook Pixel Implementation Template with tracking events", "Facebook Ad Creative Templates with high-performing examples", "Audience Building Guide with custom and lookalike audience strategies", "Facebook Ads Optimization Checklist with scaling methodologies", "Facebook Advertising Performance Dashboard with ROI tracking"]',
  175,
  210,
  12,
  NOW(),
  NOW()
),
(
  'p12_lesson_13',
  'p12_mod3_performance',
  13,
  'Google Ads Advanced',
  'Advanced Google Ads strategies go beyond basic campaigns to maximize performance and efficiency. Master Smart Bidding, automation features, and advanced targeting options for superior results.

Search campaign excellence involves Single Keyword Ad Groups (SKAGs) for maximum relevance, Dynamic Search Ads for discovery opportunities, Responsive Search Ads for automated testing, and extensive negative keyword lists for waste reduction.

Display and Video campaigns expand reach through visual storytelling: use Responsive Display Ads for automatic optimization, YouTube advertising for video content, Gmail ads for inbox placement, and Discovery ads for native experiences across Google properties.

Advanced features include Smart Bidding strategies (Target CPA, Target ROAS, Maximize Conversions), automated bid adjustments, audience targeting layers, custom intent audiences, and cross-device conversion tracking.

Performance Max campaigns utilize machine learning across all Google inventory: Search, Display, YouTube, Gmail, Maps, and Discovery. Provide high-quality assets and clear conversion goals for optimal performance.',
  '["Implement advanced Google Ads account structure with Smart Bidding", "Create comprehensive search campaigns with SKAG methodology", "Launch display and video campaigns across Google network", "Set up Performance Max campaigns with quality creative assets", "Implement advanced audience targeting and remarketing", "Establish Google Ads optimization and performance monitoring system"]',
  '["Google Ads Advanced Structure Template with best practices", "SKAG Implementation Guide with keyword research methodology", "Display and Video Campaign Templates with creative specifications", "Performance Max Setup Guide with asset requirements", "Google Ads Audience Strategy Template with targeting options", "Google Ads Advanced Optimization Checklist with automation features"]',
  180,
  215,
  13,
  NOW(),
  NOW()
),
(
  'p12_lesson_14',
  'p12_mod3_performance',
  14,
  'LinkedIn & B2B Marketing',
  'LinkedIn advertising excels at B2B marketing with precise professional targeting. Master campaign objectives, targeting options, ad formats, and measurement specific to longer B2B sales cycles.

Targeting capabilities include job titles, functions, seniority, company size, industries, skills, education, and interests. Layer targeting criteria for precision while maintaining sufficient audience size for optimization.

Ad formats serve different purposes: Sponsored Content for engagement, Message Ads for direct outreach, Dynamic Ads for personalization, Lead Gen Forms for data collection, Event Ads for registrations, and Video Ads for storytelling.

B2B strategies focus on account-based marketing, decision-maker targeting, content marketing integration, sales enablement, longer attribution windows, and relationship building rather than immediate conversions.

Measurement considers B2B metrics: cost per lead, lead quality scores, marketing qualified leads (MQLs), sales qualified leads (SQLs), pipeline contribution, and longer-term revenue attribution.',
  '["Develop comprehensive LinkedIn advertising strategy for B2B", "Create targeted LinkedIn campaigns with precise audience segmentation", "Implement Lead Gen Forms and conversion tracking", "Build Account-Based Marketing campaigns for key prospects", "Integrate LinkedIn advertising with sales enablement and CRM", "Set up B2B marketing performance tracking with pipeline attribution"]',
  '["LinkedIn Advertising Strategy Template for B2B companies", "LinkedIn Targeting Guide with audience building best practices", "LinkedIn Ad Creative Templates with B2B messaging frameworks", "Account-Based Marketing Campaign Guide with LinkedIn tactics", "B2B Lead Scoring Model with LinkedIn integration", "LinkedIn Advertising Performance Dashboard with B2B metrics"]',
  170,
  200,
  14,
  NOW(),
  NOW()
),
(
  'p12_lesson_15',
  'p12_mod3_performance',
  15,
  'Emerging Platforms',
  'Emerging platforms offer opportunities for early adopter advantage and lower competition. Master TikTok, Snapchat, Pinterest, Reddit, Twitter, and regional platforms for diverse audience reach.

TikTok advertising capitalizes on short-form video content with young, engaged audiences. Use authentic, entertaining content, trending sounds, hashtag challenges, and influencer partnerships. Focus on creative storytelling over sales messages.

Platform-specific strategies: Snapchat for Gen Z engagement, Pinterest for visual discovery and shopping, Reddit for community-driven discussions, Twitter for real-time conversations, and regional platforms like ShareChat for vernacular content.

Creative requirements vary significantly: TikTok prefers vertical, authentic videos; Pinterest favors high-quality, inspirational images; Reddit values informative, community-relevant content; Snapchat focuses on augmented reality experiences.

Performance measurement differs from traditional platforms: engagement rates, share rates, save rates, and community sentiment become more important than traditional conversion metrics.',
  '["Research and evaluate 5 emerging platforms for your target audience", "Create platform-specific content strategy for top 3 platforms", "Launch test campaigns on 2 emerging platforms", "Develop creative assets optimized for each platform format", "Implement tracking and performance measurement for emerging platforms", "Build scaling strategy for promising emerging platform opportunities"]',
  '["Emerging Platforms Evaluation Framework with audience and opportunity analysis", "Platform-Specific Content Templates for TikTok, Snapchat, Pinterest, and Reddit", "Creative Asset Guide with specifications for all emerging platforms", "Emerging Platform Advertising Setup Guide with campaign objectives", "Performance Tracking Template for emerging platforms with unique metrics", "Emerging Platform Scaling Strategy with budget allocation models"]',
  165,
  190,
  15,
  NOW(),
  NOW()
),
(
  'p12_lesson_16',
  'p12_mod3_performance',
  16,
  'Attribution & Analytics',
  'Attribution modeling reveals the true customer journey across multiple touchpoints and channels. Understand first-click, last-click, linear, time-decay, position-based, and data-driven attribution models.

Multi-touch attribution provides comprehensive view of customer interactions: awareness touchpoints, consideration influences, decision drivers, and post-purchase engagement. Use tools like Google Analytics 4, Facebook Attribution, or advanced platforms like Mixpanel and Amplitude.

Advanced analytics includes cohort analysis for retention patterns, customer lifetime value modeling, marketing mix modeling for media effectiveness, and incrementality testing for true lift measurement.

Data visualization transforms raw data into actionable insights: executive dashboards for strategic decisions, channel performance reports for optimization, campaign analysis for tactical adjustments, and ROI analysis for budget allocation.

Implementation requires proper tracking setup, data integration across platforms, automated reporting systems, and regular analysis workflows to turn data into growth.',
  '["Implement comprehensive attribution tracking across all marketing channels", "Set up advanced analytics dashboard with multi-touch attribution", "Create automated reporting system for marketing performance", "Conduct incrementality testing for key marketing channels", "Build customer lifetime value and cohort analysis models", "Establish data-driven decision making framework for marketing optimization"]',
  '["Attribution Modeling Setup Guide with platform-specific instructions", "Advanced Analytics Dashboard Template with multi-channel performance", "Marketing Performance Report Templates for different stakeholder levels", "Incrementality Testing Framework with statistical methodologies", "Customer LTV and Cohort Analysis Templates with industry benchmarks", "Data-Driven Marketing Decision Framework with testing and optimization processes"]',
  180,
  220,
  16,
  NOW(),
  NOW()
);

-- Module 4: Growth Marketing (Days 17-22)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod4_growth',
  'p12_marketing_mastery',
  'Growth Marketing',
  'Master growth hacking, conversion optimization, retention strategies, viral mechanics, product marketing, and community building. Build systematic growth engines that compound over time.',
  4,
  NOW(),
  NOW()
);

-- Module 4 Lessons
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_17',
  'p12_mod4_growth',
  17,
  'Growth Hacking Fundamentals',
  'Growth hacking combines marketing creativity with data-driven experimentation to achieve rapid, sustainable growth. The AAARRR framework (Acquisition, Activation, Retention, Referral, Revenue) provides structure for systematic growth optimization.

Growth teams require diverse skills: marketing, product, data analysis, engineering, and psychology. Establish experimentation processes with hypothesis development, test prioritization frameworks (ICE: Impact, Confidence, Ease), and rapid iteration cycles.

Growth tactics focus on scalable, repeatable systems rather than one-time campaigns: viral loops that multiply users, referral programs that incentivize sharing, network effects that increase value with usage, product-led growth that makes products self-selling.

Successful growth hacking requires understanding user psychology, behavioral economics, and social dynamics. Design experiences that naturally encourage sharing, create FOMO (fear of missing out), and build habit-forming products.

Measurement focuses on leading indicators that predict sustainable growth: activation rates, engagement depth, referral rates, and customer lifetime value rather than vanity metrics like total users or page views.',
  '["Implement AAARRR growth framework analysis for your business", "Design growth experimentation process with hypothesis testing", "Create growth team structure and responsibilities", "Launch 5 growth experiments using different tactics", "Build viral loop or referral mechanism for your product", "Establish growth metrics dashboard with leading indicators"]',
  '["AAARRR Growth Framework Analysis Template with optimization opportunities", "Growth Experimentation Framework with ICE prioritization", "Growth Team Structure Guide with roles and KPIs", "Growth Hacking Tactics Library with 100+ proven strategies", "Viral Mechanics Design Template with K-factor calculations", "Growth Metrics Dashboard with funnel analysis and cohort tracking"]',
  180,
  220,
  17,
  NOW(),
  NOW()
),
(
  'p12_lesson_18',
  'p12_mod4_growth',
  18,
  'Conversion Rate Optimization',
  'Conversion Rate Optimization (CRO) systematically improves website performance through data-driven testing and user experience optimization. Start with conversion audit and funnel analysis to identify improvement opportunities.

Research methods include heatmap analysis (Hotjar, Crazy Egg), user session recordings, user surveys, customer interviews, and analytics data analysis. Understand where users drop off and why they don''t convert.

Testing methodology requires statistical rigor: A/B testing for binary comparisons, multivariate testing for complex interactions, and split testing for dramatic changes. Ensure statistical significance before making decisions.

Optimization areas include landing pages (headline, value proposition, social proof), product pages (images, descriptions, reviews), checkout flow (steps, form fields, payment options), and call-to-action optimization (copy, color, placement).

Advanced techniques include personalization based on traffic source, device type, or user behavior; dynamic content that adapts to user preferences; and progressive profiling that collects information gradually.',
  '["Conduct comprehensive conversion audit using analytics and heatmaps", "Set up A/B testing framework with statistical significance calculations", "Optimize 5 key landing pages based on best practices", "Implement conversion optimization for checkout or signup flow", "Create personalization strategy for different user segments", "Establish ongoing CRO process with testing calendar"]',
  '["Conversion Rate Audit Template with analysis framework", "A/B Testing Setup Guide with statistical significance calculators", "Landing Page Optimization Checklist with 50+ best practices", "Conversion Funnel Analysis Template with drop-off identification", "CRO Testing Calendar with experiment prioritization", "Conversion Optimization Toolkit with heatmap and testing tools"]',
  175,
  210,
  18,
  NOW(),
  NOW()
),
(
  'p12_lesson_19',
  'p12_mod4_growth',
  19,
  'Retention Marketing',
  'Retention marketing is 5-10x more cost-effective than acquisition. Focus on onboarding optimization, activation improvement, engagement campaigns, and win-back strategies to maximize customer lifetime value.

Onboarding sequences guide new users to value realization: progressive disclosure of features, milestone celebrations, helpful tips, and success metrics tracking. Measure time-to-value and activation rates.

Engagement strategies maintain ongoing relationships: email campaigns based on usage patterns, in-app messaging for feature education, push notifications for re-engagement, and personalized content recommendations.

Loyalty programs incentivize continued usage and higher spending: points systems, tier-based benefits, exclusive access, and experiential rewards. Design programs that align with customer values and business objectives.

Churn prediction uses behavioral data and machine learning to identify at-risk customers before they leave. Implement intervention campaigns with special offers, personal outreach, or product improvements.',
  '["Optimize onboarding flow to reduce time-to-value", "Create customer engagement campaign series", "Design and launch customer loyalty program", "Implement churn prediction and prevention system", "Build win-back campaign for churned customers", "Set up retention marketing performance tracking"]',
  '["Customer Onboarding Optimization Guide with milestone tracking", "Engagement Campaign Templates for different customer lifecycle stages", "Loyalty Program Design Framework with psychology-based rewards", "Churn Prediction Model with behavioral indicators", "Win-Back Campaign Template with incentive strategies", "Retention Marketing Dashboard with cohort and LTV analysis"]',
  170,
  205,
  19,
  NOW(),
  NOW()
),
(
  'p12_lesson_20',
  'p12_mod4_growth',
  20,
  'Referral & Viral Marketing',
  'Referral and viral marketing leverage existing customers to acquire new ones cost-effectively. Design referral programs with compelling incentives, simple mechanics, and social sharing integration.

Referral program structure includes double-sided rewards (benefits for both referrer and referee), tiered incentives that increase with more referrals, and limited-time bonuses to create urgency. Track referral sources and optimize based on performance.

Viral mechanics amplify reach through sharing triggers: useful content that provides value when shared, entertaining experiences that generate positive emotions, and social proof that validates sharing behavior.

K-factor calculation measures viral effectiveness: K = (invites sent per user) × (conversion rate of invites). Target K > 1 for exponential growth. Reduce cycle time (time between invitation and conversion) to accelerate viral spread.

Implementation requires tracking systems, fraud prevention, program promotion, and continuous optimization based on sharing patterns and conversion rates.',
  '["Design comprehensive referral program with incentive structure", "Implement viral sharing mechanics in your product/content", "Calculate and optimize K-factor for viral growth", "Create referral program promotion and communication strategy", "Set up referral tracking and fraud prevention systems", "Launch and optimize referral/viral marketing campaigns"]',
  '["Referral Program Design Template with incentive models", "Viral Mechanics Framework with sharing trigger psychology", "K-Factor Calculator with viral growth projections", "Referral Program Promotion Kit with marketing materials", "Referral Tracking System Setup Guide with analytics", "Viral Marketing Campaign Templates with success metrics"]',
  175,
  215,
  20,
  NOW(),
  NOW()
),
(
  'p12_lesson_21',
  'p12_mod4_growth',
  21,
  'Product Marketing',
  'Product marketing bridges product development and go-to-market execution. Master product launches, feature adoption, competitive positioning, and pricing strategy to maximize product success.

Product launch strategy includes pre-launch building anticipation, beta programs for feedback and testimonials, coordinated launch campaigns across channels, and post-launch optimization based on market response.

Feature adoption requires user education, onboarding updates, success metric tracking, and iterative improvements based on usage data. Use in-app messaging, email campaigns, and help documentation to drive adoption.

Competitive positioning involves understanding competitor strengths/weaknesses, identifying differentiation opportunities, and communicating unique value propositions clearly. Monitor competitive changes and adjust positioning accordingly.

Pricing strategy balances value perception, competitive landscape, and business objectives. Test different pricing models, packages, and price points to optimize revenue and market penetration.',
  '["Develop comprehensive product launch strategy and timeline", "Create feature adoption campaign for key product capabilities", "Conduct competitive positioning analysis and messaging framework", "Optimize product pricing strategy with market testing", "Build product marketing asset library", "Implement product marketing performance measurement system"]',
  '["Product Launch Playbook with 90-day timeline and tactics", "Feature Adoption Campaign Templates with user education", "Competitive Positioning Framework with differentiation mapping", "Pricing Strategy Analysis Template with testing methodologies", "Product Marketing Asset Library with templates and examples", "Product Marketing Metrics Dashboard with adoption and revenue tracking"]',
  170,
  200,
  21,
  NOW(),
  NOW()
),
(
  'p12_lesson_22',
  'p12_mod4_growth',
  22,
  'Community Marketing',
  'Community marketing builds loyal customer bases that provide support, feedback, and advocacy. Choose platforms and strategies that align with your audience preferences and business objectives.

Platform selection depends on audience behavior: Facebook Groups for broad communities, Slack for professional discussions, Discord for real-time interaction, Reddit for niche interests, LinkedIn for B2B networking, and proprietary platforms for controlled experiences.

Community building requires consistent value delivery, active moderation, member recognition, exclusive content, networking opportunities, and feedback incorporation. Focus on quality engagement over quantity.

Engagement tactics include ask-me-anything sessions, expert interviews, user-generated content contests, product feedback sessions, networking events, educational workshops, and peer-to-peer support facilitation.

Growth strategies involve referral incentives, exclusive access, influencer partnerships, content marketing, social media promotion, and word-of-mouth amplification through exceptional experiences.',
  '["Design community marketing strategy with platform selection", "Build and launch online community with engagement guidelines", "Create community content calendar and event planning", "Implement community growth and retention strategies", "Establish community moderation and member recognition systems", "Set up community marketing ROI tracking and success metrics"]',
  '["Community Marketing Strategy Template with platform comparison", "Community Launch Kit with setup guides and guidelines", "Community Engagement Calendar with content and event ideas", "Community Growth Tactics Library with proven strategies", "Community Management Guide with moderation best practices", "Community Marketing ROI Calculator with engagement and business metrics"]',
  165,
  195,
  22,
  NOW(),
  NOW()
);

-- Module 5: Content & Creative Excellence (Days 23-28)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod5_content',
  'p12_marketing_mastery',
  'Content & Creative Excellence',
  'Master content strategy, video marketing, design principles, copywriting, localization, and influencer partnerships. Create compelling content that drives engagement and conversions across all channels.',
  5,
  NOW(),
  NOW()
);

-- Module 5 Lessons (Days 23-28)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_23',
  'p12_mod5_content',
  23,
  'Content Strategy Development',
  'Content strategy aligns content creation with business objectives and customer needs. Develop content pillars that reinforce brand positioning, address customer pain points, and drive desired actions.

Editorial calendar planning requires understanding seasonality, product launches, industry events, and customer journey stages. Balance evergreen content with timely topics, educational with promotional content.

Content formats serve different purposes: blog posts for SEO and thought leadership, videos for engagement and explanation, infographics for data visualization, podcasts for personal connection, case studies for social proof, and interactive content for engagement.

Production workflow includes ideation, research, creation, review, optimization, and distribution. Establish quality standards, brand guidelines, and approval processes to maintain consistency.

Content performance measurement tracks engagement (time on page, shares, comments), conversion (leads generated, sales attributed), and SEO impact (rankings, organic traffic). Use insights to optimize future content.',
  '["Develop comprehensive content strategy with pillars and messaging framework", "Create 90-day editorial calendar with diverse content types", "Build content production workflow and quality standards", "Produce content library with 20 pieces across different formats", "Implement content distribution strategy across owned and earned channels", "Set up content performance tracking and optimization system"]',
  '["Content Strategy Framework with pillar development and messaging", "Editorial Calendar Template with content planning and scheduling", "Content Production Workflow Guide with quality checklists", "Content Creation Templates for blogs, videos, infographics, and podcasts", "Content Distribution Checklist with 30+ promotion channels", "Content Performance Dashboard with engagement and conversion metrics"]',
  180,
  220,
  23,
  NOW(),
  NOW()
),
(
  'p12_lesson_24',
  'p12_mod5_content',
  24,
  'Video Marketing',
  'Video marketing dominates digital consumption with higher engagement rates and better conversion performance. Master video strategy across platforms: YouTube for discovery, Instagram for lifestyle, LinkedIn for professional content, TikTok for entertainment.

Video production process includes script writing with hook-problem-solution structure, storyboarding for visual planning, shooting with proper lighting and audio, editing with transitions and graphics, and optimization for platform specifications.

YouTube optimization requires keyword research for titles and descriptions, custom thumbnails that stand out, proper tags and categories, end screens and cards for engagement, playlists for watch time, and community engagement through comments.

Live streaming builds authentic connections: webinars for education, product demos for explanation, Q&A sessions for engagement, behind-the-scenes for transparency, and event coverage for community building.

Video advertising leverages emotional storytelling, clear value propositions, strong calls-to-action, and platform-specific creative formats. Test different video lengths, messaging approaches, and creative styles.',
  '["Develop comprehensive video marketing strategy for key platforms", "Create video content production workflow and templates", "Produce 10 videos optimized for different platforms and objectives", "Optimize YouTube channel with SEO best practices", "Launch live streaming series for audience engagement", "Set up video marketing performance tracking and optimization"]',
  '["Video Marketing Strategy Template with platform-specific tactics", "Video Production Workflow Guide with scripting and editing", "YouTube Optimization Checklist with SEO and engagement tactics", "Live Streaming Setup Guide with technical and content requirements", "Video Creative Templates with hooks and storytelling frameworks", "Video Marketing Analytics Dashboard with engagement and conversion tracking"]',
  175,
  210,
  24,
  NOW(),
  NOW()
),
(
  'p12_lesson_25',
  'p12_mod5_content',
  25,
  'Design for Marketing',
  'Visual design directly impacts marketing performance through attention capture, message communication, and brand perception. Master design principles that drive engagement and conversions.

Design principles include visual hierarchy (guide attention flow), color psychology (evoke emotions), typography (enhance readability), white space (reduce cognitive load), contrast (highlight important elements), and consistency (build brand recognition).

Tool mastery enables efficient creation: Canva for quick designs, Figma for collaborative work, Adobe Creative Suite for professional output, Sketch for interface design, and design system tools for consistency.

Brand consistency requires style guides, template libraries, asset management, and approval workflows. Maintain visual identity across all marketing materials and touchpoints.

Mobile-first design considers thumb-friendly layouts, readable text sizes, fast loading images, and touch-optimized interactions. Test designs across devices and screen sizes.',
  '["Develop design system and brand guidelines for marketing materials", "Master key design tools and create template library", "Design marketing assets for all major channels and campaigns", "Implement mobile-first design approach for all materials", "Create design workflow with approval and version control", "Set up design performance tracking and A/B testing"]',
  '["Marketing Design System Template with brand guidelines", "Design Tool Mastery Guide with tutorials for Canva, Figma, and Adobe", "Marketing Asset Template Library with 100+ designs", "Mobile-First Design Checklist with optimization guidelines", "Design Workflow Guide with collaboration and approval processes", "Design Performance Tracking Template with engagement and conversion metrics"]',
  170,
  205,
  25,
  NOW(),
  NOW()
),
(
  'p12_lesson_26',
  'p12_mod5_content',
  26,
  'Copywriting Mastery',
  'Copywriting transforms features into benefits and benefits into emotions that drive action. Master frameworks that consistently produce high-converting copy across all marketing channels.

Copy frameworks provide structure: AIDA (Attention, Interest, Desire, Action), PAS (Problem, Agitation, Solution), Before/After/Bridge, Features/Advantages/Benefits, and Problem/Solution/Proof. Choose frameworks based on audience awareness and content context.

Emotional triggers tap into human psychology: fear of missing out, desire for status, need for security, quest for convenience, and aspiration for transformation. Combine rational arguments with emotional appeals.

Platform-specific copy considerations: headlines for attention capture, ad copy for quick scanning, email copy for personal connection, landing page copy for conversion, social media copy for engagement, and product descriptions for purchase decisions.

Copy optimization involves A/B testing headlines, calls-to-action, value propositions, and messaging angles. Test one element at a time and measure performance impact.',
  '["Master copywriting frameworks with practice exercises", "Write high-converting copy for all major marketing channels", "Create copy template library with proven formulas", "Implement systematic copy testing and optimization", "Develop brand voice and messaging guidelines", "Build copywriting performance measurement system"]',
  '["Copywriting Framework Guide with templates and examples", "Copy Template Library for ads, emails, landing pages, and social media", "Copy Testing Methodology with A/B testing best practices", "Brand Voice Development Guide with tone and messaging", "Copywriting Checklist with persuasion and conversion tactics", "Copy Performance Dashboard with engagement and conversion tracking"]',
  175,
  215,
  26,
  NOW(),
  NOW()
),
(
  'p12_lesson_27',
  'p12_mod5_content',
  27,
  'Marketing Localization',
  'Marketing localization adapts messages, visuals, and experiences for regional markets and cultural contexts. Go beyond translation to cultural adaptation that resonates with local audiences.

Language strategy includes Hindi marketing for national reach, regional language content for deeper connection, translation quality management, and cultural adaptation that considers local values, humor, and references.

Regional customization addresses metro versus tier 2/3 city preferences, urban versus rural marketing approaches, state-specific variations, and local partnership opportunities for credibility and distribution.

Cultural considerations include festival marketing aligned with regional celebrations, religious sensitivity in messaging and visuals, local influencer partnerships, and regional media preferences.

Implementation requires local market research, cultural consultant partnerships, regional content creation workflows, and localized performance measurement.',
  '["Develop localization strategy for key regional markets", "Create Hindi and regional language content for major campaigns", "Build cultural adaptation guidelines and review processes", "Implement regional marketing campaigns with local partnerships", "Set up localized content creation and management workflow", "Track localization performance and optimize for regional preferences"]',
  '["Marketing Localization Strategy Framework with regional analysis", "Hindi and Regional Language Content Templates", "Cultural Adaptation Guidelines with sensitivity checklist", "Regional Marketing Campaign Templates with local tactics", "Localization Workflow Guide with translation and cultural review", "Localization Performance Dashboard with regional engagement metrics"]',
  165,
  195,
  27,
  NOW(),
  NOW()
),
(
  'p12_lesson_28',
  'p12_mod5_content',
  28,
  'Influencer Marketing',
  'Influencer marketing leverages trusted voices to reach engaged audiences authentically. Develop systematic approaches for influencer identification, outreach, collaboration, and performance measurement.

Influencer identification involves audience alignment analysis, engagement rate evaluation, content quality assessment, brand safety verification, and authenticity checking. Focus on micro and nano influencers for higher engagement and lower costs.

Outreach strategy includes personalized communication, clear value propositions, flexible collaboration options, and professional relationship management. Build long-term partnerships rather than one-off transactions.

Campaign types serve different objectives: product reviews for credibility, brand ambassador programs for ongoing visibility, event coverage for reach, content creation for assets, social media takeovers for engagement, and challenge participation for viral potential.

Performance measurement tracks reach, engagement, conversions, brand sentiment, and cost efficiency. Use unique tracking codes, dedicated landing pages, and platform analytics for attribution.',
  '["Develop comprehensive influencer marketing strategy", "Create influencer identification and vetting process", "Build influencer outreach and relationship management system", "Launch influencer campaigns with different collaboration types", "Implement influencer performance tracking and optimization", "Establish long-term influencer partnership program"]',
  '["Influencer Marketing Strategy Template with platform-specific tactics", "Influencer Identification Framework with evaluation criteria", "Influencer Outreach Templates with negotiation guidelines", "Influencer Campaign Brief Templates for different collaboration types", "Influencer Performance Tracking Dashboard with ROI calculations", "Influencer Relationship Management System with CRM integration"]',
  170,
  200,
  28,
  NOW(),
  NOW()
);

-- Module 6: Marketing Technology (Days 29-34)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod6_technology',
  'p12_marketing_mastery',
  'Marketing Technology',
  'Master marketing technology stack selection, advanced analytics, automation platforms, AI integration, privacy compliance, and marketing operations optimization for scalable growth.',
  6,
  NOW(),
  NOW()
);

-- Module 6 Lessons (Days 29-34)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_29',
  'p12_mod6_technology',
  29,
  'Marketing Tech Stack',
  'Marketing technology stack selection requires balancing functionality, integration, cost, and scalability. Build integrated systems that enhance efficiency and provide actionable insights.

Essential tool categories include CRM for customer management, email platforms for communication, analytics tools for insights, social media management for efficiency, SEO tools for optimization, design tools for creativity, project management for coordination, and communication tools for collaboration.

Tool evaluation criteria include feature completeness, ease of use, integration capabilities, scalability potential, pricing structure, support quality, security features, and vendor stability. Create scoring matrices for objective comparison.

Integration strategy ensures data flows seamlessly between tools through native integrations, APIs, or middleware platforms like Zapier. Maintain data consistency and avoid tool proliferation that creates inefficiency.

Stack optimization involves regular audits, usage analysis, cost-benefit evaluation, and consolidation opportunities. Replace tools that don''t deliver value or create workflow friction.',
  '["Audit current marketing tool usage and identify gaps", "Research and evaluate tools for each marketing function", "Create integrated marketing technology architecture", "Implement new tools with proper integration setup", "Train team on tool usage and best practices", "Establish ongoing tech stack optimization process"]',
  '["Marketing Technology Audit Template with usage and ROI analysis", "Tool Evaluation Framework with scoring criteria for 20+ categories", "Marketing Tech Stack Architecture Guide with integration mapping", "Tool Implementation Checklist with setup and training requirements", "Marketing Technology Training Program with skill development", "Tech Stack Optimization Process with regular review cycles"]',
  180,
  220,
  29,
  NOW(),
  NOW()
),
(
  'p12_lesson_30',
  'p12_mod6_technology',
  30,
  'Marketing Analytics',
  'Marketing analytics transforms data into actionable insights that drive growth. Build comprehensive measurement frameworks that track performance, identify opportunities, and guide optimization decisions.

Analytics framework includes KPI definition aligned with business objectives, dashboard creation for different stakeholder needs, automated reporting for efficiency, data visualization for clarity, and insight generation for action planning.

Advanced analytics techniques include cohort analysis for retention patterns, customer journey analytics for experience optimization, multi-channel attribution for budget allocation, predictive analytics for forecasting, and marketing mix modeling for media effectiveness.

Data visualization best practices include clear chart selection, appropriate color usage, logical layout design, interactive features for exploration, and executive summary highlights for quick understanding.

Implementation requires proper tracking setup, data integration across platforms, automated reporting systems, team training on analytics tools, and regular optimization based on insights.',
  '["Build comprehensive marketing analytics framework", "Create executive and operational dashboards", "Implement advanced analytics including cohort and attribution analysis", "Set up automated reporting and alert systems", "Train team on analytics tools and interpretation", "Establish data-driven decision making process"]',
  '["Marketing Analytics Framework with KPI definition and measurement", "Dashboard Template Library for different roles and objectives", "Advanced Analytics Setup Guide with cohort, attribution, and predictive models", "Automated Reporting System with customizable schedules", "Analytics Training Program with tool mastery and interpretation", "Data-Driven Decision Framework with testing and optimization processes"]',
  175,
  210,
  30,
  NOW(),
  NOW()
),
(
  'p12_lesson_31',
  'p12_mod6_technology',
  31,
  'Marketing Automation Advanced',
  'Advanced marketing automation orchestrates complex, personalized customer experiences across multiple channels and touchpoints. Build sophisticated workflows that adapt to customer behavior and drive business outcomes.

Complex workflow design includes multi-channel campaigns that coordinate email, SMS, social media, and web experiences; behavioral targeting based on user actions; lead scoring models that prioritize sales efforts; and personalization engines that adapt content dynamically.

Integration strategy connects automation platforms with CRM systems, analytics tools, social media platforms, advertising accounts, customer support systems, and custom applications through APIs or native connectors.

Advanced features include AI-powered send time optimization, predictive content recommendations, dynamic segmentation based on real-time behavior, cross-device journey orchestration, and automated A/B testing.

Performance optimization involves workflow analysis, trigger optimization, content personalization, timing adjustments, and continuous testing to improve conversion rates and customer satisfaction.',
  '["Design complex multi-channel automation workflows", "Implement advanced lead scoring and segmentation", "Set up comprehensive platform integrations", "Create personalized content and dynamic campaigns", "Build automated testing and optimization systems", "Establish automation performance monitoring and enhancement"]',
  '["Advanced Automation Workflow Templates for complex customer journeys", "Lead Scoring and Segmentation Framework with behavioral triggers", "Marketing Automation Integration Guide with API setup", "Personalization Strategy Template with dynamic content rules", "Automation Testing Framework with optimization methodologies", "Advanced Automation Performance Dashboard with journey and revenue analytics"]',
  180,
  215,
  31,
  NOW(),
  NOW()
),
(
  'p12_lesson_32',
  'p12_mod6_technology',
  32,
  'AI in Marketing',
  'Artificial Intelligence revolutionizes marketing through automation, personalization, and optimization at scale. Master AI applications that enhance creativity, improve targeting, and drive better results.

AI applications include content generation for headlines, ad copy, and social media posts; ad optimization through automated bidding and creative testing; personalization engines that adapt experiences to individual preferences; chatbots for customer service; predictive analytics for forecasting; and recommendation engines for cross-selling.

AI tools for marketers include ChatGPT for content creation, Jasper AI for marketing copy, Copy.ai for ad variations, DALL-E and Midjourney for image generation, AI video tools for video creation, and custom AI solutions for specific business needs.

Implementation strategy involves identifying high-impact use cases, selecting appropriate tools, training teams on AI capabilities, establishing quality control processes, and measuring AI impact on marketing performance.

Ethical considerations include bias prevention, transparency in AI usage, data privacy protection, and maintaining human oversight for critical decisions.',
  '["Identify AI opportunities in your marketing processes", "Implement AI tools for content creation and optimization", "Build AI-powered personalization and recommendation systems", "Create AI governance framework with quality control", "Train team on AI tools and best practices", "Measure AI impact on marketing performance and ROI"]',
  '["AI in Marketing Opportunity Assessment with use case identification", "AI Tool Implementation Guide with setup and optimization", "AI-Powered Personalization Framework with recommendation engines", "AI Governance Guidelines with ethics and quality control", "AI Marketing Training Program with tool mastery", "AI Marketing ROI Calculator with performance measurement"]',
  175,
  205,
  32,
  NOW(),
  NOW()
),
(
  'p12_lesson_33',
  'p12_mod6_technology',
  33,
  'Privacy & Compliance',
  'Privacy and compliance requirements reshape marketing practices with stricter data protection regulations. Implement systems that protect customer privacy while enabling effective marketing.

Data regulations include GDPR for European customers, Indian data protection laws, CAN-SPAM for email marketing, TCPA for SMS communications, and platform-specific policies for social media and advertising.

Compliance implementation requires privacy policy creation, consent management systems, data handling procedures, user rights fulfillment, breach response protocols, audit procedures, team training, and comprehensive documentation.

Cookie policies and consent management become critical as third-party cookies phase out. Implement first-party data strategies, cookieless tracking methods, and transparent consent mechanisms.

Future-proofing involves monitoring regulatory changes, implementing privacy-by-design principles, building flexible consent systems, and preparing for a cookieless future with alternative tracking methods.',
  '["Conduct marketing compliance audit for all regulations", "Implement comprehensive privacy policy and consent management", "Build data handling and user rights fulfillment systems", "Create privacy-compliant tracking and analytics setup", "Train team on privacy regulations and compliance procedures", "Establish ongoing compliance monitoring and updates"]',
  '["Marketing Compliance Audit Checklist with regulatory requirements", "Privacy Policy Template with comprehensive coverage", "Consent Management System Setup Guide with technical implementation", "Privacy-Compliant Analytics Framework with cookieless tracking", "Privacy Training Program with regulatory updates", "Compliance Monitoring System with regular review processes"]',
  170,
  195,
  33,
  NOW(),
  NOW()
),
(
  'p12_lesson_34',
  'p12_mod6_technology',
  34,
  'Marketing Operations',
  'Marketing operations optimize processes, resources, and performance to scale marketing efficiently. Build systems that support growth while maintaining quality and consistency.

Process optimization includes workflow design for campaign creation, template libraries for efficiency, approval processes for quality control, asset management for organization, budget tracking for financial control, and vendor management for external relationships.

Performance management involves team KPI setting, individual metric tracking, regular review cycles, skill development programs, resource planning, capacity management, and succession planning for continuity.

Technology operations include tool administration, data management, integration maintenance, security protocols, backup procedures, and performance monitoring to ensure reliable marketing infrastructure.

Operational excellence requires documentation, training programs, quality assurance, continuous improvement, and change management to adapt to evolving business needs.',
  '["Design marketing operations framework with process documentation", "Implement marketing asset and resource management systems", "Create performance management system with team and individual KPIs", "Build marketing technology operations and maintenance procedures", "Establish quality assurance and continuous improvement processes", "Train team on marketing operations best practices"]',
  '["Marketing Operations Framework with process mapping and optimization", "Marketing Asset Management System with organization and workflow", "Marketing Performance Management Template with KPIs and review cycles", "Marketing Technology Operations Guide with maintenance and security", "Marketing Quality Assurance Framework with standards and procedures", "Marketing Operations Training Program with skill development"]',
  165,
  190,
  34,
  NOW(),
  NOW()
);

-- Module 7: Offline Marketing Integration (Days 35-40)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod7_offline',
  'p12_marketing_mastery',
  'Offline Marketing Integration',
  'Master traditional media, out-of-home advertising, event marketing, direct marketing, retail strategies, and guerrilla tactics. Integrate offline channels with digital campaigns for comprehensive market coverage.',
  7,
  NOW(),
  NOW()
);

-- Module 7 Lessons (Days 35-40)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_35',
  'p12_mod7_offline',
  35,
  'Traditional Media Marketing',
  'Traditional media remains relevant for brand building, credibility, and reaching audiences with limited digital engagement. Master print, radio, and television advertising with modern measurement approaches.

Print advertising includes newspaper selection based on readership demographics, magazine targeting for niche audiences, ad design principles for attention capture, media buying negotiations, and performance tracking through unique codes or landing pages.

Broadcast media involves radio advertising for local reach and frequency, television commercials for mass awareness, production planning for quality content, media scheduling for optimal reach, and brand lift studies for effectiveness measurement.

Integration with digital channels amplifies traditional media impact: social media promotion of TV appearances, online landing pages for print ads, podcast sponsorships complementing radio, and content marketing supporting broadcast campaigns.

ROI measurement requires attribution modeling, brand awareness studies, website traffic analysis, lead generation tracking, and sales correlation analysis to demonstrate traditional media value.',
  '["Develop traditional media strategy aligned with digital campaigns", "Create print and broadcast advertising campaigns", "Implement traditional media measurement and tracking systems", "Negotiate media buying deals with cost optimization", "Integrate traditional media with digital marketing channels", "Build traditional media performance optimization process"]',
  '["Traditional Media Strategy Framework with channel selection criteria", "Print and Broadcast Ad Templates with design guidelines", "Traditional Media Measurement Guide with attribution methods", "Media Buying Negotiation Tactics with cost optimization", "Traditional-Digital Integration Strategy with cross-channel amplification", "Traditional Media ROI Calculator with brand and performance metrics"]',
  170,
  205,
  35,
  NOW(),
  NOW()
),
(
  'p12_lesson_36',
  'p12_mod7_offline',
  36,
  'Out-of-Home Marketing',
  'Out-of-Home (OOH) advertising captures attention in high-traffic locations with creative, memorable messages. Master billboard strategies, transit advertising, and innovative OOH experiences.

OOH strategy involves location selection based on target audience traffic patterns, creative design for quick message consumption, campaign timing for maximum impact, and cost negotiation for budget optimization.

Traditional OOH includes billboard placement in high-visibility locations, transit advertising on buses and metros, airport advertising for business travelers, and street furniture ads for pedestrian engagement.

Digital OOH enables dynamic content, real-time updates, social media integration, weather-based messaging, and interactive experiences through QR codes or augmented reality features.

Innovation opportunities include interactive billboards with user engagement, augmented reality experiences, social media integration for viral amplification, and data-driven personalization based on location and time.',
  '["Design comprehensive OOH advertising strategy", "Create compelling OOH creative campaigns", "Implement innovative OOH experiences with digital integration", "Negotiate OOH media placements with cost optimization", "Launch integrated OOH campaigns with social amplification", "Measure OOH campaign effectiveness and brand impact"]',
  '["OOH Advertising Strategy Template with location and audience analysis", "OOH Creative Design Guide with message clarity and visual impact", "Innovative OOH Campaign Examples with interactive elements", "OOH Media Buying Guide with negotiation tactics", "OOH-Digital Integration Framework with social amplification", "OOH Campaign Measurement Template with brand lift and engagement tracking"]',
  165,
  195,
  36,
  NOW(),
  NOW()
),
(
  'p12_lesson_37',
  'p12_mod7_offline',
  37,
  'Event Marketing',
  'Event marketing builds personal connections, demonstrates products, and generates qualified leads through face-to-face interactions. Master trade shows, conferences, and customer events.

Event strategy includes event selection based on audience alignment, booth design for attraction and engagement, lead capture systems for follow-up, demonstration planning for product showcase, and networking tactics for relationship building.

Event types serve different objectives: trade shows for industry networking, conferences for thought leadership, product launches for announcements, customer events for relationship building, and educational workshops for value delivery.

Pre-event marketing builds awareness and drives attendance through email campaigns, social media promotion, content marketing, partnership announcements, and speaker promotion.

Post-event follow-up maximizes ROI through immediate lead outreach, content creation from event experiences, social media amplification, relationship nurturing, and performance analysis for future improvement.',
  '["Develop comprehensive event marketing strategy", "Plan and execute trade show or conference participation", "Create event lead capture and follow-up systems", "Design engaging booth experiences and demonstrations", "Implement pre and post-event marketing campaigns", "Measure event marketing ROI and relationship building"]',
  '["Event Marketing Strategy Template with objective and audience alignment", "Trade Show Participation Guide with booth design and staffing", "Event Lead Management System with capture and follow-up", "Event Experience Design Framework with engagement tactics", "Event Promotion Campaign Templates for pre and post-event", "Event Marketing ROI Calculator with lead quality and relationship metrics"]',
  175,
  210,
  37,
  NOW(),
  NOW()
),
(
  'p12_lesson_38',
  'p12_mod7_offline',
  38,
  'Direct Marketing',
  'Direct marketing creates personal connections through targeted, measurable communications. Master direct mail, telemarketing, and personalized outreach campaigns.

Direct mail strategy includes list building through customer data and purchased lists, creative design for attention and response, personalization for relevance, testing for optimization, and response tracking for ROI measurement.

Telemarketing requires script development, training programs for quality conversations, compliance with regulations, quality monitoring, lead qualification processes, and performance tracking.

Personalization techniques include variable data printing, customized offers based on purchase history, location-specific messaging, demographic targeting, and behavioral triggers from digital interactions.

Integration with digital channels amplifies direct marketing impact: QR codes linking to landing pages, social media follow-up, email sequence coordination, and retargeting campaigns for non-responders.',
  '["Design direct marketing campaigns with targeting and personalization", "Create direct mail campaigns with tracking and measurement", "Develop telemarketing scripts and training programs", "Implement multi-channel direct marketing integration", "Build direct marketing performance optimization system", "Test and scale successful direct marketing approaches"]',
  '["Direct Marketing Strategy Framework with channel selection and targeting", "Direct Mail Campaign Template with creative and tracking", "Telemarketing Script Library with conversation guides", "Direct Marketing Integration Guide with digital channel coordination", "Direct Marketing Performance Dashboard with response and ROI tracking", "Direct Marketing Testing Framework with optimization methodology"]',
  170,
  200,
  38,
  NOW(),
  NOW()
),
(
  'p12_lesson_39',
  'p12_mod7_offline',
  39,
  'Retail Marketing',
  'Retail marketing drives in-store sales through point-of-sale displays, merchandising, promotions, and staff training. Build retail partnerships and optimize in-store customer experiences.

In-store marketing includes point-of-sale display design, product merchandising for visibility, promotional campaigns for traffic and sales, sampling programs for trial, and staff training for product knowledge and customer service.

Retail partnerships involve channel strategy development, partner selection criteria, joint promotion planning, co-op advertising coordination, training program delivery, and performance tracking with shared metrics.

Customer experience optimization focuses on store layout efficiency, product discovery ease, checkout process speed, loyalty program integration, and feedback collection for continuous improvement.

Local marketing adapts national campaigns for regional preferences, partners with local influencers, sponsors community events, and builds relationships with local media and organizations.',
  '["Develop retail marketing strategy with partner channel approach", "Create in-store marketing materials and promotion campaigns", "Build retail partner training and support programs", "Implement customer experience optimization in retail locations", "Launch local marketing campaigns for retail presence", "Track retail marketing performance with partner collaboration"]',
  '["Retail Marketing Strategy Template with channel partnership framework", "In-Store Marketing Asset Library with POS and merchandising", "Retail Partner Training Program with product and sales education", "Retail Customer Experience Optimization Guide with journey mapping", "Local Marketing Campaign Templates with community engagement", "Retail Marketing Performance Dashboard with partner and sales metrics"]',
  165,
  190,
  39,
  NOW(),
  NOW()
),
(
  'p12_lesson_40',
  'p12_mod7_offline',
  40,
  'Guerrilla Marketing',
  'Guerrilla marketing creates memorable brand experiences through creative, unconventional tactics that generate buzz and viral sharing. Master street marketing, flash mobs, and innovative brand activations.

Creative tactics include street art and murals, flash mob performances, pop-up experiences, projection mapping, ambient advertising, sticker campaigns, and viral stunts that capture attention and encourage sharing.

Execution planning requires legal consideration for permits and regulations, safety protocol development, documentation strategy for content creation, social media amplification planning, and media outreach for coverage.

Risk management includes legal compliance checking, safety plan development, brand reputation protection, crisis response preparation, and insurance consideration for public activities.

Viral amplification transforms guerrilla marketing into digital content through professional documentation, social media promotion, influencer involvement, user-generated content encouragement, and media coverage generation.',
  '["Design creative guerrilla marketing campaigns", "Plan guerrilla marketing execution with legal and safety considerations", "Create viral amplification strategy for guerrilla campaigns", "Execute guerrilla marketing activations with documentation", "Build guerrilla marketing risk management and compliance framework", "Measure guerrilla marketing impact on brand awareness and engagement"]',
  '["Guerrilla Marketing Campaign Ideas Library with 50+ creative concepts", "Guerrilla Marketing Execution Checklist with legal and safety protocols", "Viral Amplification Strategy Template with social media integration", "Guerrilla Marketing Documentation Kit with video and photo requirements", "Guerrilla Marketing Risk Management Guide with legal compliance", "Guerrilla Marketing Impact Measurement Framework with brand awareness metrics"]',
  175,
  215,
  40,
  NOW(),
  NOW()
);

-- Module 8: B2B Marketing Mastery (Days 41-45)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod8_b2b',
  'p12_marketing_mastery',
  'B2B Marketing Mastery',
  'Master B2B marketing strategies including account-based marketing, B2B content creation, lead generation systems, and B2B-specific analytics and ROI measurement for complex sales cycles.',
  8,
  NOW(),
  NOW()
);

-- Module 8 Lessons (Days 41-45)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_41',
  'p12_mod8_b2b',
  41,
  'B2B Marketing Strategy',
  'B2B marketing differs fundamentally from B2C with longer sales cycles, multiple decision-makers, rational purchase decisions, relationship focus, and higher transaction values. Build strategies that address these unique characteristics.

B2B buyer journey involves multiple stakeholders: users who interact with products, influencers who provide input, decision-makers who approve purchases, and economic buyers who control budgets. Map content and touchpoints for each role.

Strategic planning requires account-based thinking with ideal customer profile development, target account identification, competitive landscape analysis, value proposition articulation, and ROI demonstration for business justification.

Content strategy focuses on education over entertainment, thought leadership for credibility, case studies for proof, whitepapers for depth, and webinars for relationship building. Align content with buyer journey stages and stakeholder needs.

Sales alignment ensures marketing qualified leads meet sales criteria, lead handoff processes work smoothly, feedback loops improve lead quality, and shared metrics drive collaboration.',
  '["Develop comprehensive B2B marketing strategy with stakeholder mapping", "Create ideal customer profile and target account list", "Build B2B content strategy aligned with buyer journey", "Implement sales and marketing alignment processes", "Design B2B lead qualification and scoring system", "Launch integrated B2B marketing campaigns"]',
  '["B2B Marketing Strategy Framework with stakeholder analysis", "Ideal Customer Profile Template with firmographic and technographic data", "B2B Content Strategy Canvas with journey and role mapping", "Sales-Marketing Alignment Guide with SLA and feedback loops", "B2B Lead Scoring Model with qualification criteria", "B2B Campaign Planning Template with multi-touch coordination"]',
  180,
  220,
  41,
  NOW(),
  NOW()
),
(
  'p12_lesson_42',
  'p12_mod8_b2b',
  42,
  'Account-Based Marketing',
  'Account-Based Marketing (ABM) treats individual accounts as markets, delivering personalized experiences to high-value prospects. Master account selection, research, personalization, and orchestration.

Account selection involves revenue potential analysis, strategic fit assessment, competitive position evaluation, and likelihood to purchase scoring. Focus resources on accounts with highest potential return.

Account research includes organizational structure mapping, decision-maker identification, pain point analysis, technology stack assessment, and competitive relationship understanding. Use LinkedIn, company websites, and industry reports.

Personalization strategy adapts messaging, content, and experiences for specific accounts through customized landing pages, personalized email campaigns, targeted advertising, and account-specific content creation.

Multi-channel orchestration coordinates touchpoints across email, advertising, direct mail, events, and sales outreach to create cohesive account experiences. Time interactions for maximum impact.',
  '["Develop ABM strategy with account selection and prioritization", "Conduct deep research on target accounts", "Create personalized content and campaigns for key accounts", "Implement multi-channel ABM campaign orchestration", "Build ABM measurement and optimization framework", "Scale ABM approach with technology and processes"]',
  '["ABM Strategy Framework with account selection criteria", "Account Research Template with competitive and organizational analysis", "ABM Personalization Guide with content and campaign customization", "ABM Campaign Orchestration Template with multi-channel coordination", "ABM Measurement Dashboard with account engagement and pipeline metrics", "ABM Scaling Guide with technology and process optimization"]',
  175,
  210,
  42,
  NOW(),
  NOW()
),
(
  'p12_lesson_43',
  'p12_mod8_b2b',
  43,
  'B2B Content Marketing',
  'B2B content marketing establishes thought leadership, educates buyers, and nurtures long sales cycles. Create content that addresses complex business challenges and demonstrates expertise.

Content types serve B2B objectives: whitepapers for detailed analysis, research reports for industry insights, case studies for social proof, webinars for education, ROI calculators for value demonstration, and industry guides for thought leadership.

Distribution strategy leverages B2B channels: LinkedIn for professional networking, email nurturing for relationship building, industry publications for credibility, conference presentations for authority, and sales enablement for direct conversations.

Thought leadership content positions executives as industry experts through original research, trend analysis, opinion pieces, speaking opportunities, and media interviews. Build personal brands that support company objectives.

Content performance measurement includes lead generation, engagement depth, share rates, pipeline influence, and sales cycle acceleration. Track content consumption by target accounts and buying committee members.',
  '["Create comprehensive B2B content strategy with thought leadership focus", "Develop B2B content library with diverse formats and topics", "Implement B2B content distribution across professional channels", "Build thought leadership program for company executives", "Create content measurement system with B2B-specific metrics", "Optimize B2B content for lead generation and nurturing"]',
  '["B2B Content Strategy Template with thought leadership framework", "B2B Content Creation Templates for whitepapers, case studies, and webinars", "B2B Content Distribution Guide with channel-specific tactics", "Thought Leadership Program Framework with executive positioning", "B2B Content Performance Dashboard with pipeline and influence tracking", "B2B Content Optimization Checklist with lead generation focus"]',
  170,
  205,
  43,
  NOW(),
  NOW()
),
(
  'p12_lesson_44',
  'p12_mod8_b2b',
  44,
  'B2B Lead Generation',
  'B2B lead generation requires multi-channel approaches that build trust and demonstrate value throughout extended sales cycles. Master demand generation, lead qualification, and nurturing systems.

Lead generation channels include content marketing for inbound leads, LinkedIn outreach for direct prospecting, webinars for education-based attraction, trade shows for face-to-face connections, and partner referrals for warm introductions.

Lead qualification involves BANT criteria (Budget, Authority, Need, Timeline), lead scoring based on fit and behavior, progressive profiling for data collection, and qualification frameworks that align with sales requirements.

Nurturing campaigns maintain engagement through educational content, industry insights, case study sharing, and relationship building. Use marketing automation to deliver relevant content based on prospect behavior and sales cycle stage.

Lead management includes CRM integration, routing rules, SLA agreements with sales, feedback loops for quality improvement, and performance tracking for optimization.',
  '["Design comprehensive B2B lead generation strategy", "Implement lead qualification and scoring systems", "Create lead nurturing campaigns for different buyer personas", "Build lead management processes with sales alignment", "Launch multi-channel lead generation campaigns", "Optimize lead generation performance with testing and analysis"]',
  '["B2B Lead Generation Strategy Framework with channel mix optimization", "Lead Qualification and Scoring Template with BANT criteria", "B2B Lead Nurturing Campaign Templates with persona-based messaging", "Lead Management Process Guide with CRM integration", "B2B Lead Generation Campaign Templates for multiple channels", "B2B Lead Generation Performance Dashboard with quality and conversion tracking"]',
  175,
  215,
  44,
  NOW(),
  NOW()
),
(
  'p12_lesson_45',
  'p12_mod8_b2b',
  45,
  'B2B Analytics & ROI',
  'B2B analytics requires understanding complex, multi-touch customer journeys and long sales cycles. Build measurement systems that attribute revenue to marketing activities and optimize for business impact.

B2B metrics include pipeline generation, velocity improvement, deal size influence, win rate impact, customer acquisition cost, lifetime value, and marketing-influenced revenue. Focus on business outcomes rather than activity metrics.

Attribution modeling addresses multi-touch B2B journeys with first-touch for awareness, multi-touch for nurturing influence, and time-decay for recent interaction weighting. Account for offline interactions and long consideration periods.

ROI measurement involves marketing contribution to pipeline, sales cycle acceleration, deal size improvement, and customer retention impact. Use closed-loop reporting to connect marketing activities to revenue outcomes.

Reporting structure includes executive dashboards with business metrics, marketing performance reports with channel effectiveness, and campaign analysis with optimization recommendations.',
  '["Implement comprehensive B2B marketing analytics framework", "Build B2B attribution models for multi-touch journeys", "Create B2B ROI measurement system with revenue attribution", "Design B2B marketing performance dashboards", "Establish B2B marketing reporting and optimization processes", "Train team on B2B analytics interpretation and action planning"]',
  '["B2B Marketing Analytics Framework with business-focused metrics", "B2B Attribution Modeling Guide with multi-touch methodology", "B2B ROI Measurement Template with revenue contribution analysis", "B2B Marketing Dashboard Templates for different stakeholder needs", "B2B Marketing Performance Report Templates with optimization insights", "B2B Analytics Training Program with interpretation and action planning"]',
  180,
  220,
  45,
  NOW(),
  NOW()
);

-- Module 9: E-commerce Marketing (Days 46-50)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod9_ecommerce',
  'p12_marketing_mastery',
  'E-commerce Marketing',
  'Master e-commerce marketing fundamentals, marketplace optimization, direct-to-consumer strategies, shopping campaigns, and e-commerce analytics for online retail success.',
  9,
  NOW(),
  NOW()
);

-- Module 9 Lessons (Days 46-50)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_46',
  'p12_mod9_ecommerce',
  46,
  'E-commerce Fundamentals',
  'E-commerce marketing drives online sales through optimized product discovery, compelling product presentation, frictionless purchase experiences, and customer retention strategies.

E-commerce strategy includes platform selection (Shopify, WooCommerce, Magento), product catalog optimization, pricing strategy development, shipping and fulfillment planning, payment option configuration, and customer service framework.

Conversion optimization focuses on product page optimization with high-quality images, detailed descriptions, customer reviews, and clear calls-to-action. Optimize category pages for discovery, search functionality for efficiency, and checkout flow for completion.

Trust building elements include security badges, customer testimonials, return policies, contact information prominence, about page authenticity, and social proof displays. Address purchase hesitations proactively.

Mobile optimization ensures responsive design, thumb-friendly navigation, fast loading times, simplified checkout, and mobile payment options. Prioritize mobile experience for growing mobile commerce.',
  '["Audit e-commerce website for conversion optimization opportunities", "Optimize product pages with images, descriptions, and reviews", "Improve checkout flow to reduce cart abandonment", "Implement trust signals and security features", "Optimize e-commerce site for mobile experience", "Set up e-commerce analytics and performance tracking"]',
  '["E-commerce Conversion Audit Template with optimization checklist", "Product Page Optimization Guide with best practices", "Checkout Flow Optimization Framework with abandonment reduction", "E-commerce Trust Building Checklist with security and social proof", "Mobile E-commerce Optimization Guide with responsive design", "E-commerce Analytics Setup Guide with tracking and measurement"]',
  175,
  210,
  46,
  NOW(),
  NOW()
),
(
  'p12_lesson_47',
  'p12_mod9_ecommerce',
  47,
  'Marketplace Marketing',
  'Marketplace marketing leverages platforms like Amazon, Flipkart, and category-specific marketplaces to reach customers where they shop. Master listing optimization, advertising, and marketplace-specific strategies.

Amazon marketing requires listing optimization with keyword-rich titles, bullet points, descriptions, and high-quality images. Implement Amazon SEO best practices, sponsored product campaigns, sponsored brand campaigns, and Amazon DSP for comprehensive advertising.

Indian marketplace strategies include Flipkart optimization for electronics and fashion, Myntra focus for apparel, Nykaa positioning for beauty, and category-specific platforms for specialized products. Understand each platform''s algorithm and customer behavior.

Marketplace optimization involves competitive analysis, pricing strategy, inventory management, review generation, and brand registry for protection. Monitor performance metrics and adjust strategies based on platform feedback.

Multi-marketplace management requires centralized inventory, synchronized pricing, consistent branding, unified customer service, and performance tracking across platforms.',
  '["Optimize product listings on primary marketplaces", "Launch marketplace advertising campaigns", "Implement marketplace-specific strategies for key platforms", "Build review generation and management system", "Create multi-marketplace management and optimization framework", "Track marketplace performance and ROI across platforms"]',
  '["Marketplace Listing Optimization Guide with platform-specific tactics", "Marketplace Advertising Templates for Amazon, Flipkart, and others", "Marketplace Strategy Framework with platform comparison", "Review Generation System with customer follow-up", "Multi-Marketplace Management Guide with inventory and pricing sync", "Marketplace Performance Dashboard with sales and ranking tracking"]',
  170,
  205,
  47,
  NOW(),
  NOW()
),
(
  'p12_lesson_48',
  'p12_mod9_ecommerce',
  48,
  'D2C Marketing',
  'Direct-to-Consumer (D2C) marketing builds direct relationships with customers, capturing higher margins and valuable customer data. Master brand building, customer acquisition, and retention for D2C success.

D2C strategy focuses on brand differentiation, customer experience excellence, data collection and utilization, and retention-focused marketing. Build direct relationships that marketplaces can''t replicate.

Customer acquisition channels include social media marketing for brand awareness, influencer partnerships for credibility, content marketing for education, email marketing for nurturing, and paid advertising for targeted reach.

Retention strategies include loyalty programs, subscription models, personalized recommendations, exclusive access, community building, and exceptional customer service. Focus on lifetime value over single transaction value.

D2C channels include website optimization, social commerce integration, WhatsApp commerce for personal touch, mobile app development, and omnichannel experiences that connect online and offline touchpoints.',
  '["Develop comprehensive D2C marketing strategy", "Build D2C customer acquisition campaigns across channels", "Implement customer retention and loyalty programs", "Create social commerce and WhatsApp commerce presence", "Build D2C brand community and engagement strategy", "Optimize D2C customer lifetime value and retention metrics"]',
  '["D2C Marketing Strategy Framework with brand and customer focus", "D2C Customer Acquisition Campaign Templates for multiple channels", "D2C Retention Strategy Guide with loyalty and subscription models", "Social Commerce Setup Guide with shopping integration", "D2C Community Building Framework with engagement tactics", "D2C Performance Dashboard with LTV and retention tracking"]',
  175,
  215,
  48,
  NOW(),
  NOW()
),
(
  'p12_lesson_49',
  'p12_mod9_ecommerce',
  49,
  'Shopping Campaigns',
  'Shopping campaigns showcase products directly in search results and social media, driving qualified traffic and sales. Master Google Shopping, social commerce, and shopping campaign optimization.

Google Shopping requires product feed optimization with accurate titles, descriptions, categories, and pricing. Implement campaign structure with appropriate bidding strategies, negative keywords, and performance monitoring.

Social commerce leverages Facebook Shops, Instagram Shopping, Pinterest Shopping, and YouTube Shopping for native purchasing experiences. Create shoppable posts, product tags, and seamless checkout experiences.

Campaign optimization includes bid management, product group segmentation, seasonal adjustments, competitive monitoring, and landing page alignment. Test different campaign structures and bidding strategies.

Advanced shopping tactics include dynamic remarketing for abandoned carts, local inventory ads for nearby customers, promotion extensions for special offers, and cross-platform shopping campaigns for maximum reach.',
  '["Set up optimized Google Shopping campaigns", "Implement social commerce across Facebook, Instagram, and Pinterest", "Create shopping campaign optimization and management system", "Launch dynamic remarketing and promotional campaigns", "Build cross-platform shopping campaign strategy", "Track shopping campaign performance and ROI optimization"]',
  '["Google Shopping Campaign Setup Guide with feed optimization", "Social Commerce Implementation Guide with platform setup", "Shopping Campaign Optimization Framework with bid and structure management", "Dynamic Remarketing Campaign Templates with audience targeting", "Cross-Platform Shopping Strategy with campaign coordination", "Shopping Campaign Performance Dashboard with ROAS and conversion tracking"]',
  165,
  195,
  49,
  NOW(),
  NOW()
),
(
  'p12_lesson_50',
  'p12_mod9_ecommerce',
  50,
  'E-commerce Analytics',
  'E-commerce analytics provides insights into customer behavior, product performance, and revenue optimization opportunities. Build comprehensive measurement systems for data-driven e-commerce growth.

Key e-commerce metrics include conversion rate, average order value, cart abandonment rate, customer lifetime value, product performance, traffic sources, and customer acquisition cost. Track metrics that directly impact profitability.

Advanced analytics includes cohort analysis for customer retention patterns, RFM segmentation for customer value assessment, product affinity analysis for cross-selling, and predictive analytics for inventory and demand forecasting.

Customer journey analytics reveals path to purchase, identifies optimization opportunities, and improves user experience. Use heat mapping, session recordings, and funnel analysis for deeper insights.

Performance optimization involves A/B testing, personalization, dynamic pricing, inventory optimization, and customer experience improvements based on data insights.',
  '["Implement comprehensive e-commerce analytics tracking", "Build e-commerce performance dashboard with key metrics", "Create advanced analytics including cohort and RFM analysis", "Set up customer journey and behavior analysis", "Implement e-commerce optimization testing framework", "Establish data-driven e-commerce decision making process"]',
  '["E-commerce Analytics Setup Guide with tracking implementation", "E-commerce Performance Dashboard Template with key metrics", "Advanced E-commerce Analytics Framework with cohort and segmentation", "Customer Journey Analysis Template with optimization identification", "E-commerce A/B Testing Framework with conversion optimization", "E-commerce Data Analysis Training with insight generation and action planning"]',
  180,
  220,
  50,
  NOW(),
  NOW()
);

-- Module 10: Mobile Marketing (Days 51-54)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod10_mobile',
  'p12_marketing_mastery',
  'Mobile Marketing',
  'Master app marketing, mobile advertising, push notifications, in-app messaging, SMS marketing, and WhatsApp Business for effective mobile customer engagement.',
  10,
  NOW(),
  NOW()
);

-- Module 10 Lessons (Days 51-54)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_51',
  'p12_mod10_mobile',
  51,
  'App Marketing',
  'App marketing drives downloads, engagement, and retention through app store optimization, user acquisition campaigns, and in-app experience optimization.

App Store Optimization (ASO) includes keyword research for app titles and descriptions, compelling app descriptions, high-quality screenshots and videos, review and rating management, and localization for multiple markets.

User acquisition strategies include paid campaigns across Google UAC, Facebook app ads, Apple Search Ads, influencer partnerships, content marketing, PR campaigns, and referral programs. Focus on quality users over quantity.

Onboarding optimization reduces time-to-value with progressive disclosure, tutorial design, milestone celebration, and early engagement encouragement. Measure activation rates and optimize for core action completion.

Retention tactics include push notifications, in-app messaging, feature updates, loyalty programs, social features, and personalized experiences. Track cohort retention and implement re-engagement campaigns.',
  '["Optimize app store listings with ASO best practices", "Launch user acquisition campaigns across multiple channels", "Design and implement app onboarding optimization", "Create app retention and engagement strategy", "Build app performance tracking and analytics system", "Implement app growth optimization and testing framework"]',
  '["App Store Optimization Guide with ASO best practices", "App User Acquisition Campaign Templates for multiple platforms", "App Onboarding Optimization Framework with UX best practices", "App Retention Strategy Guide with engagement tactics", "App Analytics Setup Guide with tracking and measurement", "App Growth Testing Framework with optimization methodology"]',
  175,
  210,
  51,
  NOW(),
  NOW()
),
(
  'p12_lesson_52',
  'p12_mod10_mobile',
  52,
  'Mobile Advertising',
  'Mobile advertising captures attention on smartphones and tablets through native, video, and interactive ad formats optimized for mobile consumption patterns.

Mobile ad formats include banner ads for brand awareness, interstitial ads for full-screen impact, native ads for seamless integration, video ads for engagement, playable ads for app promotion, and rewarded ads for value exchange.

Platform strategies vary by objective: Google UAC for app promotion, Facebook for social engagement, TikTok for entertainment content, Snapchat for AR experiences, and programmatic networks for broad reach.

Creative optimization for mobile includes vertical video formats, thumb-stopping visuals, clear value propositions, strong calls-to-action, and mobile-optimized landing pages. Test creative variations continuously.

Performance tracking includes app installs, cost per install, retention rates, in-app events, and lifetime value. Optimize campaigns based on quality metrics rather than just volume.',
  '["Create mobile advertising strategy across key platforms", "Design mobile-optimized ad creatives for different formats", "Launch mobile advertising campaigns with performance tracking", "Implement mobile landing page optimization", "Build mobile advertising optimization and scaling system", "Track mobile advertising ROI and quality metrics"]',
  '["Mobile Advertising Strategy Framework with platform selection", "Mobile Ad Creative Templates with format specifications", "Mobile Campaign Setup Guide with tracking implementation", "Mobile Landing Page Optimization Checklist", "Mobile Advertising Optimization Guide with scaling tactics", "Mobile Advertising Performance Dashboard with quality metrics"]',
  165,
  195,
  52,
  NOW(),
  NOW()
),
(
  'p12_lesson_53',
  'p12_mod10_mobile',
  53,
  'Push & In-App Messaging',
  'Push notifications and in-app messaging maintain user engagement, drive app usage, and deliver personalized experiences based on user behavior and preferences.

Push notification strategy includes permission optimization, segmentation based on behavior and preferences, personalization using user data, timing optimization for maximum open rates, and A/B testing for message performance.

In-app messaging delivers contextual communications through onboarding tips, feature announcements, promotional offers, behavioral triggers, feedback requests, and cross-selling opportunities. Design messages that enhance rather than interrupt user experience.

Message types serve different purposes: transactional notifications for updates, promotional messages for offers, educational content for feature adoption, social notifications for community engagement, and retention campaigns for inactive users.

Advanced tactics include rich media notifications, deep linking to specific app sections, geo-targeted messages, behavioral automation, and cross-channel messaging coordination.',
  '["Develop push notification and in-app messaging strategy", "Implement permission optimization and segmentation", "Create personalized messaging campaigns based on user behavior", "Set up automated messaging workflows", "Design rich media and interactive message experiences", "Build messaging performance optimization system"]',
  '["Push Notification Strategy Framework with permission and engagement optimization", "In-App Messaging Guide with contextual communication", "Message Personalization Templates with user segmentation", "Automated Messaging Workflow Templates for user lifecycle", "Rich Media Messaging Design Guide with interactive elements", "Mobile Messaging Performance Dashboard with engagement and conversion tracking"]',
  170,
  205,
  53,
  NOW(),
  NOW()
),
(
  'p12_lesson_54',
  'p12_mod10_mobile',
  54,
  'SMS & WhatsApp Marketing',
  'SMS and WhatsApp marketing provide direct, personal communication channels with high open rates and immediate delivery. Master compliance, automation, and relationship building.

SMS marketing includes list building through opt-ins, compliance with regulations, message crafting for character limits, timing optimization, personalization, link tracking, and two-way conversation management.

WhatsApp Business enables personal customer service, catalog showcasing, broadcast messaging, quick replies for efficiency, automated responses, and integration with business systems for seamless experiences.

Automation possibilities include welcome sequences, order confirmations, shipping updates, appointment reminders, feedback requests, and promotional campaigns. Balance automation with personal touch.

Integration strategies connect SMS and WhatsApp with other channels for coordinated customer experiences, CRM systems for data management, and analytics platforms for performance tracking.',
  '["Build SMS marketing strategy with compliance and list building", "Set up WhatsApp Business with catalog and automation", "Create SMS and WhatsApp campaign templates", "Implement automated messaging workflows", "Integrate SMS and WhatsApp with other marketing channels", "Track SMS and WhatsApp marketing performance and optimization"]',
  '["SMS Marketing Strategy Guide with compliance and best practices", "WhatsApp Business Setup Guide with automation features", "SMS and WhatsApp Campaign Templates with proven formulas", "Automated Messaging Workflow Framework", "Cross-Channel Integration Guide for SMS and WhatsApp", "SMS and WhatsApp Performance Dashboard with engagement and conversion metrics"]',
  160,
  190,
  54,
  NOW(),
  NOW()
);

-- Module 11: International Marketing (Days 55-58)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod11_international',
  'p12_marketing_mastery',
  'International Marketing',
  'Master global expansion strategies, cross-cultural marketing, international SEO/SEM, and global social media for successful international market entry and growth.',
  11,
  NOW(),
  NOW()
);

-- Module 11 Lessons (Days 55-58)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_55',
  'p12_mod11_international',
  55,
  'Global Expansion Strategy',
  'Global expansion requires systematic market evaluation, entry strategy development, and resource planning for sustainable international growth.

Market research includes market size analysis, competitive landscape assessment, regulatory environment understanding, cultural considerations, customer behavior patterns, and economic conditions evaluation.

Entry strategies vary by market and resources: direct expansion with local teams, partnership models with established players, franchise approaches for brand extension, licensing deals for market access, joint ventures for shared risk, and online-first approaches for testing.

Resource planning involves budget allocation, team structure, technology infrastructure, legal compliance, supply chain management, and timeline development for systematic expansion.

Risk management includes political risk assessment, currency fluctuation planning, regulatory compliance monitoring, and cultural sensitivity training to avoid costly mistakes.',
  '["Conduct market research and analysis for target international markets", "Develop international expansion strategy with entry models", "Create resource and budget planning for global expansion", "Build risk management framework for international markets", "Design pilot program for initial market entry", "Establish international expansion performance measurement"]',
  '["International Market Research Template with analysis framework", "Global Expansion Strategy Framework with entry model comparison", "International Resource Planning Template with budget and timeline", "International Risk Management Checklist with mitigation strategies", "Market Entry Pilot Program Guide with testing methodology", "International Expansion Dashboard with market performance tracking"]',
  180,
  220,
  55,
  NOW(),
  NOW()
),
(
  'p12_lesson_56',
  'p12_mod11_international',
  56,
  'Cross-Cultural Marketing',
  'Cross-cultural marketing adapts messages, visuals, and experiences for different cultural contexts while maintaining brand consistency and relevance.

Cultural adaptation involves understanding cultural values, communication styles, color significance, religious considerations, social norms, business etiquette, and legal requirements. Research cultural nuances thoroughly.

Message localization goes beyond translation to cultural adaptation that considers local idioms, humor, references, and communication preferences. Work with native speakers and cultural consultants.

Visual adaptation includes color symbolism awareness, imagery preferences, layout conventions, and cultural sensitivities. What works in one culture may offend in another.

Regional strategies require understanding APAC collectivism, Middle Eastern relationship focus, European regulatory compliance, American individualism, African community orientation, and Latin American family values.',
  '["Research cultural considerations for target international markets", "Develop cultural adaptation guidelines and review processes", "Create culturally adapted marketing materials and campaigns", "Build relationships with local cultural consultants", "Implement cultural sensitivity training for marketing team", "Test and optimize culturally adapted marketing approaches"]',
  '["Cross-Cultural Marketing Research Template with cultural analysis", "Cultural Adaptation Guidelines with sensitivity checklist", "Culturally Adapted Campaign Templates for different regions", "Cultural Consultant Network Building Guide", "Cultural Marketing Training Program with awareness education", "Cross-Cultural Marketing Performance Framework with cultural effectiveness metrics"]',
  170,
  205,
  56,
  NOW(),
  NOW()
),
(
  'p12_lesson_57',
  'p12_mod11_international',
  57,
  'International SEO & SEM',
  'International SEO and SEM require technical implementation, content localization, and platform adaptation for global search visibility and paid advertising effectiveness.

International SEO includes hreflang tag implementation, country and language targeting, domain structure decisions (subdomain vs subfolder), local keyword research, content localization, and regional link building strategies.

Global SEM involves account structure planning, currency management, language-specific campaigns, time zone optimization, budget allocation across markets, creative localization, and local landing page development.

Technical considerations include website structure for multiple languages, loading speed optimization globally, mobile optimization for different markets, and local search optimization for regional visibility.

Platform differences require understanding Google dominance in most markets, Baidu importance in China, Yandex usage in Russia, and local search engines in specific regions.',
  '["Implement international SEO with hreflang and targeting", "Set up global SEM campaigns with localization", "Optimize website structure for international markets", "Create local keyword research and content strategies", "Build international link building and citation strategies", "Monitor international SEO and SEM performance across markets"]',
  '["International SEO Setup Guide with technical implementation", "Global SEM Campaign Structure Template with localization", "International Website Optimization Checklist", "Local Keyword Research Framework for multiple markets", "International Link Building Strategy with regional tactics", "International Search Marketing Dashboard with market-specific metrics"]',
  175,
  210,
  57,
  NOW(),
  NOW()
),
(
  'p12_lesson_58',
  'p12_mod11_international',
  58,
  'Global Social Media',
  'Global social media marketing requires platform selection, content adaptation, community management, and performance tracking across different regions and cultural contexts.

Platform selection varies by region: Facebook''s global presence, WeChat dominance in China, Line popularity in Japan, VK usage in Russia, and regional platforms that dominate specific markets.

Content strategy adaptation includes language management, cultural content creation, time zone coordination, regional trend incorporation, local holiday alignment, and cultural event participation.

Community management requires understanding communication styles, response time expectations, crisis management approaches, and cultural sensitivity in customer interactions across different markets.

Performance measurement must account for regional differences in engagement patterns, platform usage behavior, and business outcome expectations.',
  '["Research and select social media platforms for target international markets", "Develop global social media content strategy with regional adaptation", "Implement international community management and customer service", "Create global social media advertising campaigns", "Build cross-cultural social media team and processes", "Track global social media performance with regional insights"]',
  '["Global Social Media Platform Analysis with regional preferences", "International Social Media Content Strategy with cultural adaptation", "Global Community Management Guide with cultural communication", "International Social Media Advertising Templates", "Global Social Media Team Structure with cultural expertise", "International Social Media Performance Dashboard with regional engagement metrics"]',
  165,
  195,
  58,
  NOW(),
  NOW()
);

-- Module 12: Budget & ROI Management (Days 59-60)
INSERT INTO "Module" (
  id,
  "productId",
  title,
  description,
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES (
  'p12_mod12_budget',
  'p12_marketing_mastery',
  'Budget & ROI Management',
  'Master marketing budget planning, cost optimization, ROI measurement, and performance optimization for maximum marketing efficiency and business impact.',
  12,
  NOW(),
  NOW()
);

-- Module 12 Lessons (Days 59-60)
INSERT INTO "Lesson" (
  id,
  "moduleId",
  day,
  title,
  "briefContent",
  "actionItems",
  resources,
  "estimatedTime",
  "xpReward",
  "orderIndex",
  "createdAt",
  "updatedAt"
) VALUES
(
  'p12_lesson_59',
  'p12_mod12_budget',
  59,
  'Marketing Budget Planning',
  'Marketing budget planning aligns financial resources with growth objectives through systematic allocation, scenario planning, and performance-based optimization.

Budget framework starts with revenue percentage allocation (typically 5-20% depending on growth stage), growth stage considerations (higher for early stage), channel distribution based on performance history, testing budget for experiments, and seasonal adjustments for market dynamics.

Allocation methodology includes 40/20/20/20 rule: 40% on proven channels, 20% on promising channels, 20% on experimental channels, and 20% on brand building. Adjust ratios based on business stage and objectives.

Cost management involves vendor negotiation for better rates, media buying optimization, tool consolidation for efficiency, process automation for scale, team productivity improvement, and agency management for external resources.

Scenario planning prepares for different growth situations: conservative growth plans, aggressive expansion budgets, economic downturn adjustments, and opportunity response capabilities.',
  '["Create comprehensive marketing budget framework", "Develop scenario-based budget planning", "Implement cost optimization and vendor management", "Build budget tracking and monitoring systems", "Create budget reallocation and optimization processes", "Establish budget performance and ROI measurement"]',
  '["Marketing Budget Planning Framework with allocation methodology", "Scenario Planning Template with growth and economic models", "Cost Optimization Guide with vendor negotiation tactics", "Budget Tracking Dashboard with real-time monitoring", "Budget Optimization Process with reallocation triggers", "Marketing Budget ROI Calculator with performance measurement"]',
  180,
  220,
  59,
  NOW(),
  NOW()
),
(
  'p12_lesson_60',
  'p12_mod12_budget',
  60,
  'ROI Optimization',
  'ROI optimization maximizes marketing efficiency through systematic measurement, attribution modeling, performance analysis, and continuous optimization across all marketing activities.

Measurement systems include attribution setup for multi-touch journeys, ROI calculation with lifetime value consideration, incrementality testing for true impact measurement, lift studies for brand campaigns, and scenario modeling for future planning.

Optimization process involves performance review cycles, channel reallocation based on efficiency, creative optimization for better performance, audience refinement for targeting improvement, bid optimization for cost efficiency, and landing page testing for conversion improvement.

Advanced techniques include marketing mix modeling for holistic view, customer journey optimization for experience improvement, predictive analytics for forecasting, and machine learning for automated optimization.

Decision frameworks help prioritize investments: ICE scoring for initiatives, portfolio theory for channel mix, risk assessment for new opportunities, and ROI threshold setting for investment decisions.',
  '["Implement comprehensive ROI measurement and attribution system", "Build marketing optimization framework with performance review cycles", "Create advanced analytics and predictive modeling", "Develop decision frameworks for marketing investments", "Establish continuous optimization processes", "Build marketing performance culture with ROI accountability"]',
  '["ROI Measurement Framework with attribution and incrementality", "Marketing Optimization Process with systematic review cycles", "Advanced Analytics Setup Guide with predictive modeling", "Marketing Investment Decision Framework with scoring methodology", "Continuous Optimization Checklist with testing and improvement", "Marketing Performance Culture Guide with accountability and measurement"]',
  175,
  215,
  60,
  NOW(),
  NOW()
);

-- Display total counts
SELECT 
  'Product Inserted' as item,
  COUNT(*) as count 
FROM "Product" 
WHERE code = 'P12'
UNION ALL
SELECT 
  'Modules Inserted' as item,
  COUNT(*) as count 
FROM "Module" m
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P12'
UNION ALL
SELECT 
  'Lessons Inserted' as item,
  COUNT(*) as count 
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P12'
UNION ALL
SELECT 
  'Total XP Available' as item,
  SUM(l."xpReward") as count 
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P12';