-- P16: HR & Team Building Mastery Course Migration
-- 45 days, 9 modules, comprehensive HR infrastructure

BEGIN;

-- Declare variables for IDs
DO $$
DECLARE
    v_product_id TEXT;
    v_mod_1_id TEXT;
    v_mod_2_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
BEGIN
    -- Generate IDs
    v_product_id := gen_random_uuid()::text;
    v_mod_1_id := gen_random_uuid()::text;
    v_mod_2_id := gen_random_uuid()::text;
    v_mod_3_id := gen_random_uuid()::text;
    v_mod_4_id := gen_random_uuid()::text;
    v_mod_5_id := gen_random_uuid()::text;
    v_mod_6_id := gen_random_uuid()::text;
    v_mod_7_id := gen_random_uuid()::text;
    v_mod_8_id := gen_random_uuid()::text;
    v_mod_9_id := gen_random_uuid()::text;

    -- Insert Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P16',
        'HR & Team Building Mastery',
        'Complete HR infrastructure from recruitment to scaling - 9 modules covering hiring, compensation, ESOPs, labor compliance, performance management, and POSH compliance. 63% of Indian startups lack structured HR.',
        5999,
        45,
        NOW(),
        NOW()
    )
    ON CONFLICT (code) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        "estimatedDays" = EXCLUDED."estimatedDays",
        "updatedAt" = NOW();

    -- Get the product ID (in case of conflict)
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P16';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Recruitment Fundamentals (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Recruitment Fundamentals', 'Master the foundations of startup recruiting - job descriptions, sourcing, interviews, and offers', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Hiring Strategy for Startups', 'Learn why 63% of Indian startups fail due to team issues. Understand the unique hiring challenges at different startup stages - from founding team to scale-up. Define your hiring philosophy: culture-first vs skills-first approach. Map your organization structure for the next 18 months.', '["Define your startup hiring philosophy in 3 sentences", "Map your org chart for current + next 6 months", "Identify your 3 most critical hires", "Create a hiring timeline with budget estimates"]'::jsonb, '{"templates": ["Org Chart Template", "Hiring Priority Matrix"], "tools": ["Role Prioritization Framework"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Job Descriptions That Attract Talent', 'Master the art of writing JDs that stand out. Understand the Indian job seeker mindset - what attracts top talent. Learn the JD structure: role clarity, growth path, compensation transparency. Avoid common mistakes that filter out great candidates.', '["Write JD for your most critical role", "Include growth path and learning opportunities", "Add compensation range (transparency builds trust)", "Get feedback from 2 potential candidates"]'::jsonb, '{"templates": ["JD Template Library - 20 Roles", "Compensation Benchmarking Guide"], "tools": ["JD Analyzer Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Sourcing Channels in India', 'Explore all sourcing channels: LinkedIn, Naukri, Indeed, AngelList, referrals, campus hiring. Understand cost per hire across channels. Build your employer brand on social media. Create a referral program that works.', '["Set up company profiles on 3 job platforms", "Create employee referral program with incentives", "Draft 5 LinkedIn outreach templates", "Calculate target cost-per-hire by role level"]'::jsonb, '{"templates": ["Referral Program Policy", "LinkedIn Outreach Templates"], "tools": ["Sourcing Channel ROI Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Interview Framework Design', 'Design a structured interview process: screening, technical, culture fit, founder round. Create scorecards for objective evaluation. Train interviewers to avoid bias. Set up assignment-based evaluation for key roles.', '["Design 4-stage interview process", "Create evaluation scorecards for each stage", "Draft take-home assignment for key role", "Train 2 team members on interviewing"]'::jsonb, '{"templates": ["Interview Scorecard Templates", "Take-home Assignment Examples"], "tools": ["Interview Scheduling System"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Offer Letters & Negotiation', 'Craft compelling offer letters with all legal requirements. Master salary negotiation - when to be flexible and when to hold firm. Understand notice period buyouts and joining bonuses. Create counter-offer strategies.', '["Draft standard offer letter template", "Create salary negotiation playbook", "Define joining bonus and buyout policies", "Set up offer approval workflow"]'::jsonb, '{"templates": ["Offer Letter Template (India-compliant)", "Salary Negotiation Guide"], "tools": ["Offer Comparison Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 2: Hiring for Startups (Days 6-10)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Hiring for Startups', 'Advanced hiring techniques - culture fit, technical hiring, reference checks, and closing candidates', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Culture Fit Assessment', 'Define your startup culture explicitly. Create culture-fit interview questions. Balance diversity with cultural alignment. Avoid culture-fit as excuse for homogeneity.', '["Document your 5 core culture values", "Create 10 culture-fit interview questions", "Design culture presentation for candidates", "Set up culture buddy system for new hires"]'::jsonb, '{"templates": ["Culture Values Framework", "Culture Interview Guide"], "tools": ["Culture Fit Assessment Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Technical Hiring Excellence', 'Design technical assessments that predict job performance. Choose between live coding, take-home, and pair programming. Evaluate system design and problem-solving. Build technical interview panels.', '["Create technical assessment for key engineering role", "Set up HackerRank or similar platform", "Train tech leads on evaluation criteria", "Design system design interview format"]'::jsonb, '{"templates": ["Technical Assessment Templates", "System Design Interview Guide"], "tools": ["Technical Skill Evaluation Matrix"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Reference Checks That Matter', 'Conduct effective reference checks beyond verification. Ask questions that reveal true performance. Decode reference language. Handle negative references professionally.', '["Create reference check question template", "Identify 5 key traits to verify per role", "Set up reference check process with candidates", "Document reference check findings format"]'::jsonb, '{"templates": ["Reference Check Questions", "Reference Summary Form"], "tools": ["Reference Check Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'Closing Top Candidates', 'Master the art of closing - timing, urgency, and personalization. Handle counter-offers from current employers. Create compelling narratives for startup journey. Build relationships with candidates who decline.', '["Create closing playbook for different scenarios", "Design personalized offer presentations", "Set up counter-offer response strategy", "Build talent pipeline for future roles"]'::jsonb, '{"templates": ["Closing Playbook", "Candidate Relationship Tracker"], "tools": ["Offer Acceptance Predictor"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 10, 'Background Verification', 'Understand legal requirements for background checks in India. Partner with verification agencies. Handle verification failures gracefully. Maintain candidate privacy and data protection.', '["Select background verification partner", "Define verification scope by role level", "Create verification consent form", "Set up adverse action process"]'::jsonb, '{"templates": ["BGV Consent Form", "Verification Scope Matrix"], "tools": ["BGV Vendor Comparison"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 3: Employee Onboarding (Days 11-15)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Employee Onboarding', 'Create world-class onboarding - 30-60-90 plans, documentation, culture immersion, and buddy systems', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 11, 'Pre-boarding Excellence', 'Start onboarding before Day 1. Send welcome kits and company swag. Set up accounts and equipment. Introduce team virtually. Create excitement for the journey ahead.', '["Design welcome kit contents", "Create pre-boarding email sequence", "Set up equipment procurement process", "Build virtual team introduction format"]'::jsonb, '{"templates": ["Pre-boarding Checklist", "Welcome Email Templates"], "tools": ["Onboarding Task Manager"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Day 1 Experience Design', 'Make Day 1 memorable and productive. Balance paperwork with meaningful interactions. Introduce company vision and values. Set up buddy assignments.', '["Design Day 1 schedule template", "Create founder/CEO welcome video", "Prepare Day 1 documentation kit", "Assign onboarding buddies"]'::jsonb, '{"templates": ["Day 1 Schedule Template", "Documentation Checklist"], "tools": ["Day 1 Experience Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 13, '30-60-90 Day Plans', 'Create role-specific success milestones. Balance learning with contribution. Set clear expectations and check-in cadence. Build confidence through early wins.', '["Create 30-60-90 template for each role type", "Define success metrics for each phase", "Set up weekly check-in schedule", "Plan early win opportunities"]'::jsonb, '{"templates": ["30-60-90 Day Plan Templates", "Success Metrics Framework"], "tools": ["Milestone Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 14, 'Culture Immersion Program', 'Teach culture through stories and experiences. Organize cross-functional lunches. Share company history and milestones. Connect with company mission.', '["Create culture immersion curriculum", "Schedule founder coffee chats", "Organize cross-team introductions", "Share company story and milestones"]'::jsonb, '{"templates": ["Culture Curriculum", "Founder Chat Guide"], "tools": ["Culture Quiz Generator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 15, 'Onboarding Metrics & Improvement', 'Measure onboarding effectiveness. Track time-to-productivity. Collect new hire feedback. Continuously improve the onboarding experience.', '["Define onboarding success metrics", "Create new hire survey (Day 30, 60, 90)", "Set up onboarding feedback loop", "Build onboarding improvement process"]'::jsonb, '{"templates": ["Onboarding Survey Templates", "Metrics Dashboard"], "tools": ["Onboarding Analytics"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 4: Compensation & ESOPs (Days 16-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Compensation & ESOPs', 'Design competitive compensation with ESOP structures, benchmarking, and tax optimization', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Salary Benchmarking in India', 'Access and use salary data sources: Glassdoor, LinkedIn, startup surveys. Understand city-wise and experience-wise variations. Build your compensation philosophy.', '["Research salary benchmarks for 5 key roles", "Define compensation percentile target", "Create salary bands for each level", "Document compensation philosophy"]'::jsonb, '{"templates": ["Salary Benchmarking Template", "Compensation Philosophy Doc"], "tools": ["Salary Benchmarking Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 17, 'ESOP Design Fundamentals', 'Understand ESOP pool sizing (10-20% typical). Learn vesting schedules and cliff periods. Design grant guidelines by role and level. Communicate equity value effectively.', '["Determine ESOP pool size", "Design vesting schedule (4-year with 1-year cliff)", "Create grant guidelines by level", "Prepare equity education materials"]'::jsonb, '{"templates": ["ESOP Pool Calculator", "Grant Guidelines Template"], "tools": ["ESOP Valuation Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 18, 'ESOP Tax Implications', 'Navigate ESOP taxation in India: grant, vesting, exercise, sale. Understand perquisite taxation. Plan for tax-efficient exercises. Communicate tax implications to employees.', '["Understand ESOP tax events", "Create employee tax guide", "Set up tax advisory for exercises", "Design tax-efficient exercise strategies"]'::jsonb, '{"templates": ["ESOP Tax Guide for Employees", "Tax Planning Worksheet"], "tools": ["ESOP Tax Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 19, 'Variable Pay & Incentives', 'Design variable pay structures: sales commissions, performance bonuses, project incentives. Balance fixed vs variable components. Create transparent incentive calculations.', '["Design sales commission structure", "Create performance bonus framework", "Define variable pay by role type", "Set up incentive tracking system"]'::jsonb, '{"templates": ["Commission Plan Templates", "Bonus Framework"], "tools": ["Incentive Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 20, 'Benefits & Perquisites', 'Design benefits package: health insurance, wellness, learning allowance, remote work support. Understand Section 80C and other tax benefits. Create flexible benefits programs.', '["Design health insurance plan", "Create learning and development allowance", "Set up wellness benefits", "Document all perquisites with tax treatment"]'::jsonb, '{"templates": ["Benefits Policy Template", "Perquisites List"], "tools": ["Benefits Cost Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 5: Labor Compliance (Days 21-25)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Labor Compliance', 'Master PF, ESI, gratuity, state labor codes, and employment contracts', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 21, 'PF & ESI Compliance', 'Understand Provident Fund registration and contribution rules. Learn ESI applicability and benefits. Set up monthly filing processes. Handle employee queries on PF/ESI.', '["Register for PF and ESI (if applicable)", "Set up monthly contribution calendar", "Create PF/ESI employee communication", "Partner with payroll provider for compliance"]'::jsonb, '{"templates": ["PF Registration Guide", "ESI Compliance Checklist"], "tools": ["PF/ESI Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 22, 'Gratuity & Statutory Bonus', 'Calculate and provision for gratuity. Understand Payment of Bonus Act applicability. Set up statutory bonus calculations. Plan for gratuity trust or insurance.', '["Calculate gratuity liability", "Determine bonus applicability", "Set up gratuity provisioning", "Create statutory bonus calculation sheet"]'::jsonb, '{"templates": ["Gratuity Calculator", "Bonus Calculation Template"], "tools": ["Statutory Compliance Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 23, 'Employment Contracts', 'Draft comprehensive employment contracts. Include intellectual property assignment. Add non-compete and confidentiality clauses. Understand enforceability in India.', '["Draft standard employment contract", "Include IP assignment clause", "Add appropriate confidentiality terms", "Get legal review of contract"]'::jsonb, '{"templates": ["Employment Contract Template", "IP Assignment Agreement"], "tools": ["Contract Clause Library"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 24, 'State Labor Law Compliance', 'Navigate Shops & Establishments Act by state. Understand state-specific leave rules. Handle interstate employee compliance. Maintain required registers and records.', '["Identify applicable state labor laws", "Register under Shops & Establishments", "Understand state leave requirements", "Set up mandatory registers"]'::jsonb, '{"templates": ["State-wise Compliance Matrix", "Register Templates"], "tools": ["State Compliance Checker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 25, 'New Labor Codes 2020', 'Understand the 4 new labor codes: Wages, Industrial Relations, Social Security, OSH. Prepare for implementation. Assess impact on your organization.', '["Study new labor code implications", "Assess impact on current policies", "Plan compliance roadmap", "Update employment contracts as needed"]'::jsonb, '{"templates": ["Labor Codes Summary", "Impact Assessment Template"], "tools": ["Labor Code Compliance Gap Analysis"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 6: Performance Management (Days 26-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Performance Management', 'Build OKRs, feedback systems, PIPs, promotions, and appraisals', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 26, 'OKR Implementation', 'Implement Objectives and Key Results for startup growth. Cascade OKRs from company to team to individual. Run quarterly OKR cycles. Avoid common OKR mistakes.', '["Define company-level OKRs for next quarter", "Cascade to team OKRs", "Set up OKR review cadence", "Train team on OKR methodology"]'::jsonb, '{"templates": ["OKR Template", "OKR Review Guide"], "tools": ["OKR Tracking Dashboard"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 27, 'Continuous Feedback Culture', 'Move from annual reviews to continuous feedback. Implement 1-on-1 meetings effectively. Create peer feedback mechanisms. Use feedback tools and apps.', '["Design 1-on-1 meeting format", "Implement weekly/biweekly 1-on-1s", "Set up peer feedback process", "Select feedback tool (15Five, Lattice, etc.)"]'::jsonb, '{"templates": ["1-on-1 Meeting Template", "Feedback Framework"], "tools": ["Feedback Tool Comparison"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 28, 'Performance Improvement Plans', 'Design fair and effective PIPs. Document performance issues properly. Set clear improvement targets and timelines. Handle PIP exits professionally.', '["Create PIP template", "Define PIP trigger criteria", "Set up PIP review process", "Train managers on PIP conversations"]'::jsonb, '{"templates": ["PIP Template", "Performance Documentation Guide"], "tools": ["PIP Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 29, 'Promotion Framework', 'Create transparent promotion criteria. Design career levels and ladders. Implement promotion review committees. Communicate promotion decisions effectively.', '["Define career levels for each function", "Create promotion criteria by level", "Set up promotion review committee", "Design promotion communication process"]'::jsonb, '{"templates": ["Career Ladder Templates", "Promotion Criteria Matrix"], "tools": ["Career Progression Planner"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 30, 'Annual Performance Reviews', 'Design effective annual review process. Balance manager, peer, and self-assessment. Calibrate ratings across teams. Link performance to compensation.', '["Design annual review timeline", "Create self-assessment template", "Set up calibration process", "Link to compensation cycles"]'::jsonb, '{"templates": ["Annual Review Templates", "Calibration Guide"], "tools": ["Performance Rating Distribution"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 7: HR Policies & Handbook (Days 31-35)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'HR Policies & Handbook', 'Create comprehensive HR policies, POSH compliance, remote work guidelines, and code of conduct', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 31, 'Leave Policy Design', 'Design comprehensive leave policy: casual, sick, earned, maternity, paternity. Understand statutory requirements. Create leave management system. Handle leave encashment.', '["Design leave policy document", "Set up leave tracking system", "Create leave approval workflow", "Define leave encashment rules"]'::jsonb, '{"templates": ["Leave Policy Template", "Leave Tracker"], "tools": ["Leave Management System"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 32, 'POSH Compliance', 'Understand Prevention of Sexual Harassment Act requirements. Form Internal Complaints Committee (ICC). Conduct mandatory POSH training. Handle complaints effectively.', '["Form ICC with required members", "Create POSH policy document", "Schedule POSH training for all employees", "Set up complaint mechanism"]'::jsonb, '{"templates": ["POSH Policy Template", "ICC Formation Guide"], "tools": ["POSH Training Modules"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 33, 'Remote Work Policy', 'Design remote/hybrid work policies. Set up remote work allowances. Create productivity tracking systems. Handle remote work tax implications.', '["Create remote work policy", "Define WFH equipment support", "Set up remote communication norms", "Address productivity expectations"]'::jsonb, '{"templates": ["Remote Work Policy", "WFH Agreement"], "tools": ["Remote Work Productivity Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 34, 'Code of Conduct', 'Draft comprehensive code of conduct. Cover ethics, conflicts of interest, and gifts. Include social media and communication guidelines. Set up violation reporting.', '["Create code of conduct document", "Define ethics guidelines", "Add social media policy", "Set up whistleblower mechanism"]'::jsonb, '{"templates": ["Code of Conduct Template", "Ethics Guidelines"], "tools": ["Policy Acknowledgment Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 35, 'Employee Handbook Creation', 'Compile comprehensive employee handbook. Make it accessible and readable. Get legal review. Roll out with acknowledgment tracking.', '["Compile all policies into handbook", "Add company culture and values", "Get legal review", "Roll out with acknowledgment"]'::jsonb, '{"templates": ["Employee Handbook Template", "Policy Acknowledgment Form"], "tools": ["Handbook Builder"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 8: Team Culture & Retention (Days 36-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Team Culture & Retention', 'Build engaging culture, conduct exit interviews, implement retention strategies, and develop EVP', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 36, 'Employee Engagement', 'Measure and improve employee engagement. Run engagement surveys (eNPS). Create action plans from feedback. Build engagement rituals and traditions.', '["Design employee engagement survey", "Calculate baseline eNPS", "Create engagement improvement plan", "Set up quarterly pulse surveys"]'::jsonb, '{"templates": ["Engagement Survey Template", "eNPS Tracker"], "tools": ["Engagement Analytics Dashboard"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 37, 'Exit Interviews & Analysis', 'Conduct effective exit interviews. Identify patterns in attrition. Take action on exit feedback. Track regrettable vs non-regrettable attrition.', '["Create exit interview questionnaire", "Set up exit interview process", "Build attrition dashboard", "Identify retention risk factors"]'::jsonb, '{"templates": ["Exit Interview Template", "Attrition Analysis Framework"], "tools": ["Attrition Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 38, 'Retention Strategies', 'Implement proven retention tactics. Create stay interviews. Design retention bonuses. Build career development programs.', '["Conduct stay interviews with key employees", "Design retention bonus structure", "Create career development program", "Identify flight risk employees"]'::jsonb, '{"templates": ["Stay Interview Guide", "Retention Playbook"], "tools": ["Retention Risk Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 39, 'Employer Value Proposition', 'Define and communicate your EVP. Differentiate in competitive talent market. Build employer brand on social media. Measure EVP effectiveness.', '["Define EVP pillars", "Create EVP messaging", "Build employer brand content", "Measure employer brand metrics"]'::jsonb, '{"templates": ["EVP Framework", "Employer Brand Guidelines"], "tools": ["EVP Assessment Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 40, 'Learning & Development', 'Create L&D strategy and budget. Design skill development programs. Implement learning management systems. Measure training ROI.', '["Create L&D budget and strategy", "Identify skill gaps", "Select LMS platform", "Design training programs"]'::jsonb, '{"templates": ["L&D Strategy Template", "Training Plan"], "tools": ["Learning Management System Comparison"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 9: Scaling HR Operations (Days 41-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Scaling HR Operations', 'Scale HR with HRIS systems, automation, outsourcing, and compliance audits', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 41, 'HRIS Selection & Implementation', 'Choose the right HRIS for your stage. Evaluate options: Zoho People, Keka, Darwinbox, BambooHR. Implement in phases. Migrate employee data securely.', '["Evaluate 3 HRIS options", "Select based on features and cost", "Plan implementation timeline", "Migrate employee data"]'::jsonb, '{"templates": ["HRIS Evaluation Scorecard", "Implementation Plan"], "tools": ["HRIS Comparison Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 42, 'HR Process Automation', 'Automate repetitive HR processes. Set up automated onboarding flows. Create self-service employee portals. Integrate HR systems with payroll.', '["Identify top 5 HR processes to automate", "Set up automated onboarding", "Create employee self-service", "Integrate with payroll system"]'::jsonb, '{"templates": ["Process Automation Checklist", "Integration Map"], "tools": ["HR Automation Platform"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 43, 'HR Outsourcing Decisions', 'Decide what to outsource: payroll, compliance, recruiting. Select and manage HR vendors. Define SLAs and performance metrics. Handle vendor transitions.', '["Evaluate outsourcing vs in-house for each function", "Select payroll partner", "Define vendor SLAs", "Set up vendor review cadence"]'::jsonb, '{"templates": ["Outsourcing Decision Matrix", "Vendor SLA Template"], "tools": ["HR Vendor Comparison"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 44, 'HR Compliance Audits', 'Conduct regular HR compliance audits. Create audit checklist covering all requirements. Address gaps proactively. Prepare for labor inspections.', '["Create comprehensive HR audit checklist", "Conduct self-audit", "Address compliance gaps", "Document audit findings and actions"]'::jsonb, '{"templates": ["HR Audit Checklist", "Compliance Gap Tracker"], "tools": ["Audit Management System"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 45, 'HR Metrics & Analytics', 'Build HR analytics capability. Track key metrics: time-to-hire, cost-per-hire, attrition rate, engagement. Create HR dashboards. Use data for strategic decisions.', '["Define top 10 HR metrics to track", "Build HR dashboard", "Set up regular HR reporting", "Use data for strategic planning"]'::jsonb, '{"templates": ["HR Metrics Dashboard", "Analytics Report Template"], "tools": ["HR Analytics Platform"]}'::jsonb, 60, 50, 5, NOW(), NOW());

END $$;

COMMIT;
