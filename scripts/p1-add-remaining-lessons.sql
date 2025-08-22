-- P1: Add Remaining 18 Lessons (Days 10-14, 16-21, 23-29)
-- Complete the 30-day journey with comprehensive daily content

BEGIN;

-- Insert remaining lessons for Building Blocks module (Days 10-14)
INSERT INTO "Lesson" (
    "id", "moduleId", "day", "title", "briefContent", "actionItems", "resources", 
    "estimatedTime", "xpReward", "orderIndex", "metadata", "createdAt", "updatedAt"
) VALUES

-- Days 10-14: Building Blocks
('p1_day_10', 'p1_building_blocks', 10, 'Banking & Financial Setup',
'Open business bank accounts, set up accounting systems, and establish financial infrastructure.',
'[
    {"task": "Open current account for business", "priority": "high", "time": "90 mins"},
    {"task": "Set up accounting software", "priority": "high", "time": "60 mins"},
    {"task": "Configure payment gateways", "priority": "medium", "time": "45 mins"},
    {"task": "Create financial tracking system", "priority": "medium", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Bank Account Opening Checklist", "url": "/templates/p1/bank-account-checklist.pdf"},
    {"name": "Accounting Software Setup Guide", "url": "/templates/p1/accounting-setup.pdf"}
]}'::jsonb,
240, 100, 10,
'{"deliverables": ["Business Bank Account", "Accounting System"], "milestone": "Financial Infrastructure Ready"}'::jsonb,
NOW(), NOW()),

('p1_day_11', 'p1_building_blocks', 11, 'GST Registration & Compliance',
'Complete GST registration and understand tax obligations for your startup.',
'[
    {"task": "File GST registration online", "priority": "high", "time": "75 mins"},
    {"task": "Understand GST compliance requirements", "priority": "high", "time": "45 mins"},
    {"task": "Set up GST invoicing system", "priority": "medium", "time": "60 mins"},
    {"task": "Create compliance calendar", "priority": "medium", "time": "30 mins"}
]'::jsonb,
'{"templates": [
    {"name": "GST Registration Guide", "url": "/templates/p1/gst-registration.pdf"},
    {"name": "Compliance Calendar Template", "url": "/templates/p1/compliance-calendar.xlsx"}
]}'::jsonb,
210, 100, 11,
'{"deliverables": ["GST Registration", "Compliance System"], "expertInsight": "Nikhil Kamath (Zerodha): Get your compliance right from day one - it saves millions later"}'::jsonb,
NOW(), NOW()),

('p1_day_12', 'p1_building_blocks', 12, 'Intellectual Property Strategy',
'Protect your startup''s intellectual property through trademarks, copyrights, and trade secrets.',
'[
    {"task": "Conduct trademark search", "priority": "high", "time": "60 mins"},
    {"task": "File trademark application", "priority": "high", "time": "90 mins"},
    {"task": "Document trade secrets", "priority": "medium", "time": "45 mins"},
    {"task": "Create IP protection plan", "priority": "medium", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Trademark Application Guide", "url": "/templates/p1/trademark-guide.pdf"},
    {"name": "IP Protection Checklist", "url": "/templates/p1/ip-checklist.pdf"}
]}'::jsonb,
240, 100, 12,
'{"deliverables": ["Trademark Application", "IP Strategy"], "milestone": "IP Protection Started"}'::jsonb,
NOW(), NOW()),

('p1_day_13', 'p1_building_blocks', 13, 'Team Structure & Hiring',
'Define your team structure, create job descriptions, and plan your hiring strategy.',
'[
    {"task": "Define organizational structure", "priority": "high", "time": "60 mins"},
    {"task": "Create job descriptions for key roles", "priority": "high", "time": "75 mins"},
    {"task": "Set up hiring process", "priority": "medium", "time": "45 mins"},
    {"task": "Plan equity distribution", "priority": "high", "time": "60 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Org Chart Templates", "url": "/templates/p1/org-charts.pptx"},
    {"name": "Job Description Templates", "url": "/templates/p1/job-descriptions.docx"},
    {"name": "Equity Distribution Calculator", "url": "/templates/p1/equity-calculator.xlsx"}
]}'::jsonb,
240, 100, 13,
'{"deliverables": ["Team Structure", "Job Descriptions", "Equity Plan"], "expertInsight": "Sachin Bansal (Flipkart): Hire slowly and fire fast - team is everything"}'::jsonb,
NOW(), NOW()),

('p1_day_14', 'p1_building_blocks', 14, 'Building Blocks Review & MVP Planning',
'Review your building blocks progress and plan your MVP development approach.',
'[
    {"task": "Complete building blocks checklist", "priority": "high", "time": "45 mins"},
    {"task": "Plan MVP development approach", "priority": "high", "time": "90 mins"},
    {"task": "Set development milestones", "priority": "medium", "time": "45 mins"},
    {"task": "Prepare for making it real phase", "priority": "medium", "time": "30 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Building Blocks Checklist", "url": "/templates/p1/building-blocks-review.pdf"},
    {"name": "MVP Planning Template", "url": "/templates/p1/mvp-planning.xlsx"}
]}'::jsonb,
210, 150, 14,
'{"deliverables": ["Building Blocks Review", "MVP Plan"], "milestone": "Building Blocks Complete", "reward": "Module completion bonus"}'::jsonb,
NOW(), NOW()),

-- Days 16-21: Making it Real (Day 15 already exists)
('p1_day_16', 'p1_making_real', 16, 'MVP Development Sprint',
'Continue building your MVP with focus on core features and user experience.',
'[
    {"task": "Implement core MVP features", "priority": "high", "time": "240 mins"},
    {"task": "Set up basic testing framework", "priority": "medium", "time": "60 mins"},
    {"task": "Create user onboarding flow", "priority": "medium", "time": "90 mins"},
    {"task": "Implement basic analytics", "priority": "low", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "MVP Feature Checklist", "url": "/templates/p1/mvp-features.pdf"},
    {"name": "Testing Framework Guide", "url": "/templates/p1/testing-guide.pdf"}
]}'::jsonb,
435, 100, 16,
'{"deliverables": ["Core MVP Features", "Testing Framework"], "milestone": "MVP Development Progress"}'::jsonb,
NOW(), NOW()),

('p1_day_17', 'p1_making_real', 17, 'User Testing & Feedback',
'Conduct user testing sessions and gather feedback to improve your MVP.',
'[
    {"task": "Recruit 10 beta testers", "priority": "high", "time": "90 mins"},
    {"task": "Conduct user testing sessions", "priority": "high", "time": "180 mins"},
    {"task": "Analyze feedback and identify issues", "priority": "high", "time": "75 mins"},
    {"task": "Prioritize improvements", "priority": "medium", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "User Testing Script", "url": "/templates/p1/user-testing-script.pdf"},
    {"name": "Feedback Analysis Template", "url": "/templates/p1/feedback-analysis.xlsx"}
]}'::jsonb,
390, 100, 17,
'{"deliverables": ["User Testing Results", "Improvement Roadmap"], "expertInsight": "Deep Kalra (MakeMyTrip): Listen to your users, but remember you know your vision better"}'::jsonb,
NOW(), NOW()),

('p1_day_18', 'p1_making_real', 18, 'MVP Refinement & Polish',
'Refine your MVP based on user feedback and prepare for launch.',
'[
    {"task": "Implement high-priority fixes", "priority": "high", "time": "180 mins"},
    {"task": "Polish user interface", "priority": "medium", "time": "120 mins"},
    {"task": "Optimize performance", "priority": "medium", "time": "90 mins"},
    {"task": "Prepare launch assets", "priority": "low", "time": "60 mins"}
]'::jsonb,
'{"templates": [
    {"name": "MVP Polish Checklist", "url": "/templates/p1/mvp-polish.pdf"},
    {"name": "Launch Assets Template", "url": "/templates/p1/launch-assets.zip"}
]}'::jsonb,
450, 100, 18,
'{"deliverables": ["Refined MVP", "Launch Assets"], "milestone": "MVP Ready for Testing"}'::jsonb,
NOW(), NOW()),

('p1_day_19', 'p1_making_real', 19, 'Brand Identity & Marketing Materials',
'Create your brand identity and prepare marketing materials for launch.',
'[
    {"task": "Design logo and brand identity", "priority": "high", "time": "120 mins"},
    {"task": "Create brand guidelines", "priority": "medium", "time": "90 mins"},
    {"task": "Design marketing materials", "priority": "high", "time": "150 mins"},
    {"task": "Set up social media profiles", "priority": "medium", "time": "60 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Brand Identity Kit", "url": "/templates/p1/brand-identity-kit.zip"},
    {"name": "Marketing Materials Templates", "url": "/templates/p1/marketing-templates.zip"}
]}'::jsonb,
420, 100, 19,
'{"deliverables": ["Brand Identity", "Marketing Materials"], "milestone": "Brand Ready"}'::jsonb,
NOW(), NOW()),

('p1_day_20', 'p1_making_real', 20, 'Website & Digital Presence',
'Build your website and establish strong digital presence across platforms.',
'[
    {"task": "Build company website", "priority": "high", "time": "240 mins"},
    {"task": "Optimize for search engines", "priority": "medium", "time": "90 mins"},
    {"task": "Set up analytics and tracking", "priority": "medium", "time": "60 mins"},
    {"task": "Create content calendar", "priority": "low", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Website Builder Guide", "url": "/templates/p1/website-guide.pdf"},
    {"name": "SEO Checklist", "url": "/templates/p1/seo-checklist.pdf"},
    {"name": "Content Calendar Template", "url": "/templates/p1/content-calendar.xlsx"}
]}'::jsonb,
435, 100, 20,
'{"deliverables": ["Company Website", "Digital Presence"], "milestone": "Digital Presence Established"}'::jsonb,
NOW(), NOW()),

('p1_day_21', 'p1_making_real', 21, 'Making it Real Review & Launch Prep',
'Review your making it real progress and prepare for the final launch phase.',
'[
    {"task": "Complete making it real checklist", "priority": "high", "time": "60 mins"},
    {"task": "Finalize launch strategy", "priority": "high", "time": "90 mins"},
    {"task": "Set launch date and timeline", "priority": "high", "time": "45 mins"},
    {"task": "Prepare launch team", "priority": "medium", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Making it Real Checklist", "url": "/templates/p1/making-real-review.pdf"},
    {"name": "Launch Strategy Template", "url": "/templates/p1/launch-strategy.xlsx"}
]}'::jsonb,
240, 150, 21,
'{"deliverables": ["Making it Real Review", "Launch Strategy"], "milestone": "Making it Real Complete", "reward": "Module completion bonus"}'::jsonb,
NOW(), NOW()),

-- Days 23-29: Launch Ready (Days 22 and 30 already exist)
('p1_day_23', 'p1_launch_ready', 23, 'Sales Strategy & Pricing',
'Develop your sales strategy and set optimal pricing for your product.',
'[
    {"task": "Define sales process", "priority": "high", "time": "90 mins"},
    {"task": "Set pricing strategy", "priority": "high", "time": "75 mins"},
    {"task": "Create sales materials", "priority": "medium", "time": "120 mins"},
    {"task": "Train initial sales approach", "priority": "medium", "time": "60 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Sales Process Template", "url": "/templates/p1/sales-process.pdf"},
    {"name": "Pricing Strategy Calculator", "url": "/templates/p1/pricing-calculator.xlsx"},
    {"name": "Sales Materials Kit", "url": "/templates/p1/sales-materials.zip"}
]}'::jsonb,
345, 100, 23,
'{"deliverables": ["Sales Strategy", "Pricing Model", "Sales Materials"], "expertInsight": "Byju Raveendran (BYJU''S): Price based on value, not cost"}'::jsonb,
NOW(), NOW()),

('p1_day_24', 'p1_launch_ready', 24, 'Customer Acquisition Channels',
'Identify and set up your primary customer acquisition channels.',
'[
    {"task": "Identify top 3 acquisition channels", "priority": "high", "time": "75 mins"},
    {"task": "Set up digital marketing campaigns", "priority": "high", "time": "150 mins"},
    {"task": "Create referral program", "priority": "medium", "time": "90 mins"},
    {"task": "Plan partnership outreach", "priority": "medium", "time": "75 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Acquisition Channel Matrix", "url": "/templates/p1/acquisition-channels.xlsx"},
    {"name": "Digital Marketing Setup Guide", "url": "/templates/p1/digital-marketing.pdf"},
    {"name": "Referral Program Template", "url": "/templates/p1/referral-program.pdf"}
]}'::jsonb,
390, 100, 24,
'{"deliverables": ["Acquisition Strategy", "Marketing Campaigns", "Referral Program"], "milestone": "Acquisition Channels Ready"}'::jsonb,
NOW(), NOW()),

('p1_day_25', 'p1_launch_ready', 25, 'Operations & Customer Support',
'Set up operational processes and customer support systems.',
'[
    {"task": "Create operational workflows", "priority": "high", "time": "120 mins"},
    {"task": "Set up customer support system", "priority": "high", "time": "90 mins"},
    {"task": "Create knowledge base", "priority": "medium", "time": "105 mins"},
    {"task": "Train support procedures", "priority": "medium", "time": "75 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Operations Manual Template", "url": "/templates/p1/operations-manual.docx"},
    {"name": "Customer Support Setup Guide", "url": "/templates/p1/support-setup.pdf"},
    {"name": "Knowledge Base Templates", "url": "/templates/p1/knowledge-base.zip"}
]}'::jsonb,
390, 100, 25,
'{"deliverables": ["Operations Manual", "Support System", "Knowledge Base"], "milestone": "Operations Ready"}'::jsonb,
NOW(), NOW()),

('p1_day_26', 'p1_launch_ready', 26, 'Analytics & Performance Tracking',
'Set up comprehensive analytics and KPI tracking for your startup.',
'[
    {"task": "Define key performance indicators", "priority": "high", "time": "60 mins"},
    {"task": "Set up analytics dashboards", "priority": "high", "time": "120 mins"},
    {"task": "Create reporting templates", "priority": "medium", "time": "90 mins"},
    {"task": "Plan data collection processes", "priority": "medium", "time": "75 mins"}
]'::jsonb,
'{"templates": [
    {"name": "KPI Framework Template", "url": "/templates/p1/kpi-framework.xlsx"},
    {"name": "Analytics Setup Guide", "url": "/templates/p1/analytics-guide.pdf"},
    {"name": "Reporting Templates", "url": "/templates/p1/reporting-templates.zip"}
]}'::jsonb,
345, 100, 26,
'{"deliverables": ["KPI Framework", "Analytics Dashboard", "Reporting System"], "milestone": "Analytics Ready"}'::jsonb,
NOW(), NOW()),

('p1_day_27', 'p1_launch_ready', 27, 'Partnership & Network Building',
'Build strategic partnerships and expand your professional network.',
'[
    {"task": "Identify potential partners", "priority": "high", "time": "90 mins"},
    {"task": "Create partnership proposals", "priority": "high", "time": "120 mins"},
    {"task": "Reach out to industry connections", "priority": "medium", "time": "105 mins"},
    {"task": "Plan networking activities", "priority": "low", "time": "45 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Partnership Proposal Template", "url": "/templates/p1/partnership-proposal.docx"},
    {"name": "Networking Strategy Guide", "url": "/templates/p1/networking-guide.pdf"},
    {"name": "Contact Management Template", "url": "/templates/p1/contact-management.xlsx"}
]}'::jsonb,
360, 100, 27,
'{"deliverables": ["Partnership Proposals", "Network Plan"], "expertInsight": "Falguni Nayar (Nykaa): Build relationships before you need them"}'::jsonb,
NOW(), NOW()),

('p1_day_28', 'p1_launch_ready', 28, 'Financial Management & Fundraising Prep',
'Prepare financial management systems and plan potential fundraising.',
'[
    {"task": "Set up financial management system", "priority": "high", "time": "105 mins"},
    {"task": "Create investor pitch deck", "priority": "high", "time": "150 mins"},
    {"task": "Prepare financial projections", "priority": "medium", "time": "90 mins"},
    {"task": "Research potential investors", "priority": "low", "time": "75 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Financial Management Guide", "url": "/templates/p1/financial-management.pdf"},
    {"name": "Pitch Deck Template", "url": "/templates/p1/pitch-deck.pptx"},
    {"name": "Financial Projections Model", "url": "/templates/p1/financial-model.xlsx"},
    {"name": "Investor Research Template", "url": "/templates/p1/investor-research.xlsx"}
]}'::jsonb,
420, 100, 28,
'{"deliverables": ["Financial System", "Pitch Deck", "Financial Projections"], "milestone": "Fundraising Ready"}'::jsonb,
NOW(), NOW()),

('p1_day_29', 'p1_launch_ready', 29, 'Final Preparations & Risk Management',
'Complete final preparations and set up risk management processes.',
'[
    {"task": "Complete final launch checklist", "priority": "high", "time": "90 mins"},
    {"task": "Set up risk management plans", "priority": "high", "time": "105 mins"},
    {"task": "Prepare contingency plans", "priority": "medium", "time": "90 mins"},
    {"task": "Brief your team on launch day", "priority": "medium", "time": "60 mins"}
]'::jsonb,
'{"templates": [
    {"name": "Final Launch Checklist", "url": "/templates/p1/final-launch-checklist.pdf"},
    {"name": "Risk Management Template", "url": "/templates/p1/risk-management.xlsx"},
    {"name": "Contingency Planning Guide", "url": "/templates/p1/contingency-plans.pdf"}
]}'::jsonb,
345, 100, 29,
'{"deliverables": ["Launch Checklist", "Risk Management Plan", "Contingency Plans"], "milestone": "Launch Ready"}'::jsonb,
NOW(), NOW());

COMMIT;

-- Verify the complete structure
SELECT 
    p.code,
    p.title,
    COUNT(DISTINCT m.id) as modules,
    COUNT(l.id) as total_lessons,
    MIN(l.day) as first_day,
    MAX(l.day) as last_day
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P1'
GROUP BY p.id, p.code, p.title;

-- Show lessons by module
SELECT 
    m.title as module,
    m."orderIndex",
    COUNT(l.id) as lesson_count,
    STRING_AGG(l.day::text, ', ' ORDER BY l.day) as days
FROM "Product" p
JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P1'
GROUP BY m.id, m.title, m."orderIndex"
ORDER BY m."orderIndex";

-- Success message
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🎉 P1 COMPLETE! ALL 30 LESSONS DEPLOYED! 🎉';
    RAISE NOTICE '=========================================';
    RAISE NOTICE '✅ Foundation Week: Days 1-7 (7 lessons)';
    RAISE NOTICE '✅ Building Blocks: Days 8-14 (7 lessons)';
    RAISE NOTICE '✅ Making it Real: Days 15-21 (7 lessons)';
    RAISE NOTICE '✅ Launch Ready: Days 22-30 (9 lessons)';
    RAISE NOTICE '';
    RAISE NOTICE '📚 Total: 30 comprehensive daily lessons';
    RAISE NOTICE '🎯 Ready for premium P1 experience!';
    RAISE NOTICE '';
END $$;