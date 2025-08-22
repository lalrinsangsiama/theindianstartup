-- P9: Government Schemes & Funding Mastery - Complete Enhanced Migration
-- The Complete Insider's Guide to ₹8.5 Lakh Crore Government Ecosystem
-- Version: 4.0.0 - Enhanced Edition
-- Date: 2025-08-21

BEGIN;

-- Update P9 Product with enhanced features and description
UPDATE "Product" SET
    title = 'Government Schemes & Funding Mastery - The Complete Insider''s Guide',
    description = 'Master the ₹8.5 Lakh Crore Government Ecosystem: From Village Panchayat to PMO - Your Ultimate Street-Smart Guide to Non-Dilutive Funding & Government Relationships. Transform from funding-hungry entrepreneur to government-backed business leader.',
    price = 4999,
    "estimatedDays" = 35,
    features = '[
        "35-day comprehensive program covering ₹8.5 lakh crore ecosystem",
        "850+ verified government schemes database with insider success rates",
        "Complete platform mastery - 25+ government portals navigation",
        "Street-smart tactics for 84% success rate (vs 12% average)",
        "Advanced relationship building from bureaucrats to ministers",
        "Policy participation and influence strategies",
        "International cooperation programs access (₹1.5 lakh crore)",
        "1,200+ government contact directory across all ministries",
        "Professional template library - applications, proposals, communication",
        "Strategic partnership framework for long-term advantage",
        "Regulatory sandbox access and competitive moat building",
        "Success story multiplication and government showcasing",
        "Elite community access with other successful entrepreneurs",
        "Monthly policy briefings and quarterly strategy sessions",
        "International delegation and embassy network access"
    ]'::jsonb,
    metadata = '{
        "totalLessons": 35,
        "totalSchemes": 850,
        "fundingRange": "2Cr-50Cr",
        "successRate": "84%",
        "totalTemplates": 250,
        "governmentContacts": 1200,
        "platformsCovered": 25,
        "internationalPrograms": 15,
        "ministries": 47,
        "averageTimeToFunding": "3-6 months",
        "certificateIncluded": true,
        "lifetimeUpdates": true,
        "eliteSupport": true
    }'::jsonb,
    "updatedAt" = NOW()
WHERE code = 'P9';

-- Clear existing P9 modules and lessons for complete rebuild
DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P9'));
DELETE FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P9');

-- Insert Enhanced P9 Modules
INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    module_title,
    module_description,
    module_order,
    NOW(),
    NOW()
FROM (
    VALUES 
    ('Module 1: The Government Funding Universe - From Beginner to Insider', 
     'Master the ₹8.5 lakh crore ecosystem from foundation to advanced insider tactics. Learn how government funding actually works, who controls what, and how to position yourself for long-term strategic advantage.',
     1),
    ('Module 2: Strategic Government Relationships - The Art of Partnership', 
     'Build strategic networks across ministries, understand bureaucratic psychology, create value propositions for government partners, and position yourself for policy influence and advisory roles.',
     2),
    ('Module 3: Application Mastery & Documentation Excellence', 
     'Create applications that don''t just win funding but position you as a strategic government partner. Master multi-scheme coordination, timing strategies, and success optimization.',
     3),
    ('Module 4: Execution, Compliance & Strategic Scaling', 
     'Excel at fund management, compliance requirements, and build government-backed business empires with long-term strategic advantage.',
     4),
    ('Module 5: Advanced Government Integration - Becoming an Ecosystem Player', 
     'Elite strategies for policy participation, international opportunities, strategic sector access, and building government-backed competitive moats.',
     5)
) AS modules(module_title, module_description, module_order),
(SELECT id FROM "Product" WHERE code = 'P9') p;

-- Insert Enhanced P9 Lessons (35 days)
WITH p9_modules AS (
    SELECT m.id, m.title, m."orderIndex"
    FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P9'
)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "xpReward", "orderIndex", "estimatedTime", "createdAt", "updatedAt")
SELECT 
    m.id,
    lesson_day,
    lesson_title,
    lesson_content,
    action_items::jsonb,
    resources::jsonb,
    xp_reward,
    lesson_day,
    estimated_time,
    NOW(),
    NOW()
FROM (
    VALUES 
    -- Module 1: Days 1-7
    (1, 1, 'Government Funding 101 - How the ₹8.5 Lakh Crore Machine Actually Works',
     'Master the fundamental psychology of government funding. Understand how decisions are ACTUALLY made (not the official process), map the complete ecosystem from village to PMO level, and learn why most entrepreneurs fail.',
     '[
        "Complete Strategic Government Readiness Assessment (60 min)",
        "Map your personal funding universe across ministries",
        "Identify 10+ applicable schemes worth ₹2Cr+",
        "Research 3 success stories in your sector",
        "Create week 1 action plan for immediate opportunities"
     ]',
     '{
        "videos": ["Government Insider Masterclass - Part 1"],
        "templates": ["Government Ecosystem Mapper", "Scheme Intelligence Database"],
        "tools": ["Eligibility Optimization Matrix", "Strategic Timing Calendar"],
        "guides": ["Platform Navigation Toolkit", "Digital Certificate Setup Guide"]
     }',
     250, 45),
     
    (1, 2, 'Navigating the Digital Government Ecosystem - 25+ Platform Mastery',
     'Master GeM (₹1.5L Cr procurement), Startup India, MSME Samadhaan, and 20+ other critical platforms. Learn insider navigation tactics, multi-portal coordination, and strategic positioning for maximum success.',
     '[
        "Register on 5 critical government platforms",
        "Complete Udyam and Startup India recognition",
        "Set up GeM seller account for government contracts",
        "Map platform-specific opportunities worth ₹50L+",
        "Create multi-portal tracking system"
     ]',
     '{
        "videos": ["Platform Mastery Workshop"],
        "templates": ["GeM Bidding Strategy Template", "Portal Registration Checklist"],
        "tools": ["Multi-Portal Coordinator", "Platform Opportunity Tracker"],
        "guides": ["GeM Success Playbook", "Platform API Integration Manual"]
     }',
     200, 45),
     
    (1, 3, 'Decoding Central Government Schemes - ₹4.2 Lakh Crore Access',
     'Deep dive into ministry-specific funding programs. Master MSME schemes, technology funds, manufacturing incentives, and sector-specific opportunities. Learn timing, eligibility optimization, and success patterns.',
     '[
        "Analyze 15+ central schemes for your business",
        "Create eligibility optimization matrix",
        "Identify top 5 high-probability schemes",
        "Calculate potential funding: ₹___________",
        "Submit first strategic application"
     ]',
     '{
        "videos": ["Central Schemes Masterclass"],
        "templates": ["Ministry Contact Database", "Scheme Application Templates"],
        "tools": ["Success Rate Predictor", "Optimal Timing Analyzer"],
        "database": ["850+ Active Schemes Database", "Success Pattern Analysis"]
     }',
     200, 60),
     
    (1, 4, 'State & International Programs - Hidden ₹3.5 Lakh Crore Opportunities',
     'Unlock state government schemes, bilateral cooperation programs, World Bank projects, and UN SDG funds. Learn to leverage international partnerships for exponential funding access.',
     '[
        "Map state-specific opportunities in your location",
        "Identify 3 international cooperation programs",
        "Connect with embassy commercial attachés",
        "Research bilateral program eligibility",
        "Create international leverage strategy"
     ]',
     '{
        "videos": ["International Opportunities Masterclass"],
        "templates": ["State Scheme Navigator", "International Collaboration Proposal"],
        "contacts": ["Embassy Commercial Directory", "State Nodal Officers"],
        "guides": ["Bilateral Program Access Guide", "World Bank Project Manual"]
     }',
     200, 45),
     
    (1, 5, 'Street-Smart Tactics - What They Don''t Teach You Anywhere',
     'Learn insider tactics: Policy Participant Strategy, Ecosystem Integration Approach, Success Story Multiplication, International Leverage, and Regulatory Sandbox strategies for competitive advantage.',
     '[
        "Identify 3 policy consultations to participate in",
        "Build strategic partnership framework",
        "Document your success story professionally",
        "Apply regulatory sandbox strategy to your sector",
        "Create ecosystem integration plan"
     ]',
     '{
        "videos": ["Street-Smart Tactics Revealed"],
        "templates": ["Policy Response Template", "Partnership Agreement Format"],
        "case_studies": ["50 Insider Success Stories", "Failed Application Analysis"],
        "tools": ["Competition Intelligence Tool", "Risk Assessment Framework"]
     }',
     250, 60),
     
    (1, 6, 'Building Your Government Success Framework',
     'Create personalized GEMS (Government Ecosystem Mastery System) framework. Design your strategic approach, multi-scheme portfolio, and relationship building roadmap.',
     '[
        "Complete GEMS framework for your business",
        "Design 6-month strategic roadmap",
        "Create application pipeline worth ₹5Cr+",
        "Build relationship target list (25+ contacts)",
        "Set measurable success metrics"
     ]',
     '{
        "frameworks": ["GEMS Strategic Framework", "POWER Platform System"],
        "templates": ["Strategic Roadmap Template", "Relationship CRM Setup"],
        "tools": ["Portfolio Optimization Tool", "Success Metrics Dashboard"],
        "guides": ["Framework Implementation Guide", "Roadmap Execution Manual"]
     }',
     200, 45),
     
    (1, 7, 'Week 1 Mastery & Implementation Sprint',
     'Consolidate week 1 learning, submit first applications, initiate relationships, and create momentum. Set foundation for strategic government partnership journey.',
     '[
        "Submit 2-3 high-probability applications",
        "Initiate contact with 5 government officials",
        "Complete all platform registrations",
        "Document week 1 progress and learnings",
        "Plan week 2 relationship building activities"
     ]',
     '{
        "checklists": ["Week 1 Implementation Checklist", "Application Tracker"],
        "templates": ["Progress Report Template", "Week 2 Planning Framework"],
        "support": ["Expert Q&A Session Access", "Community Success Stories"],
        "tools": ["Momentum Tracker", "Quick Win Identifier"]
     }',
     300, 60),
     
    -- Module 2: Days 8-14
    (2, 8, 'Understanding Bureaucratic Psychology - The Key to YES',
     'Master the mindset of government officials. Learn what they care about, how they make decisions, and how to position your proposals for maximum appeal and approval.',
     '[
        "Analyze decision-making psychology framework",
        "Map stakeholder priorities in your sector",
        "Reframe proposals for government appeal",
        "Create value proposition for officials",
        "Practice bureaucratic communication style"
     ]',
     '{
        "videos": ["Bureaucratic Psychology Masterclass"],
        "frameworks": ["Decision Maker Analysis", "Stakeholder Mapping Tool"],
        "templates": ["Government Communication Scripts", "Value Proposition Builder"],
        "guides": ["Official Interaction Protocol", "Meeting Success Strategies"]
     }',
     200, 45),
     
    (2, 9, 'Strategic Networking - Building Your Government Web',
     'Build strategic networks across ministries. Learn relationship building protocols, networking events strategy, and long-term relationship nurturing for sustainable advantage.',
     '[
        "Identify 20 key relationships to build",
        "Attend 2 government events/webinars",
        "Send 5 strategic introduction emails",
        "Join 3 industry associations",
        "Create relationship tracking system"
     ]',
     '{
        "videos": ["Government Networking Secrets"],
        "templates": ["Introduction Email Templates", "Follow-up Framework"],
        "tools": ["Relationship CRM System", "Contact Management Database"],
        "directories": ["Event Calendar", "Association Directory"]
     }',
     200, 45),
     
    (2, 10, 'From Contact to Champion - Relationship Development',
     'Transform initial contacts into champions for your cause. Learn systematic relationship building, value creation strategies, and trust development protocols.',
     '[
        "Deepen 5 existing relationships",
        "Provide value to 3 government contacts",
        "Schedule 2 strategic meetings",
        "Create relationship nurturing calendar",
        "Document relationship progress"
     ]',
     '{
        "videos": ["Relationship Development Workshop"],
        "templates": ["Meeting Agenda Templates", "Thank You Note Scripts"],
        "tools": ["Relationship Stage Tracker", "Value Creation Planner"],
        "guides": ["Trust Building Strategies", "Long-term Nurturing System"]
     }',
     200, 45),
     
    (2, 11, 'Policy Participation - Becoming a Sector Voice',
     'Learn to participate in policy consultations, contribute to white papers, and position yourself as sector expert. Build influence beyond funding into policy shaping.',
     '[
        "Identify 3 ongoing policy consultations",
        "Draft policy response on sector issue",
        "Submit consultation feedback",
        "Connect with policy think tanks",
        "Create thought leadership content"
     ]',
     '{
        "videos": ["Policy Participation Masterclass"],
        "templates": ["Policy Response Template", "White Paper Format"],
        "tools": ["Consultation Tracker", "Policy Analysis Framework"],
        "guides": ["Think Tank Engagement", "Thought Leadership Playbook"]
     }',
     250, 60),
     
    (2, 12, 'Advisory Positions & Committee Memberships',
     'Position yourself for government advisory roles, committee memberships, and expert panels. Learn selection criteria, application strategies, and value maximization.',
     '[
        "Research advisory opportunities in sector",
        "Prepare advisory position application",
        "Build credibility portfolio",
        "Network with current advisors",
        "Apply for 1-2 positions"
     ]',
     '{
        "videos": ["Advisory Position Strategy"],
        "templates": ["Advisory Application Format", "Expert Profile Builder"],
        "case_studies": ["Successful Advisor Journeys"],
        "guides": ["Committee Contribution Guide", "Advisory Success Manual"]
     }',
     200, 45),
     
    (2, 13, 'International Relationships & Global Opportunities',
     'Build relationships with embassy officials, trade missions, and international organizations. Access bilateral programs and global expansion support.',
     '[
        "Connect with 3 embassy commercial officers",
        "Join international trade associations",
        "Apply for trade delegation participation",
        "Research bilateral funding programs",
        "Create international relationship map"
     ]',
     '{
        "videos": ["International Relations Workshop"],
        "directories": ["Embassy Contact Directory", "Trade Mission Calendar"],
        "templates": ["International Collaboration Proposal"],
        "guides": ["Embassy Engagement Protocol", "Trade Mission Success Guide"]
     }',
     200, 45),
     
    (2, 14, 'Week 2 Consolidation - Relationship Momentum',
     'Consolidate relationship building progress, strengthen connections, plan long-term engagement strategy, and create sustainable relationship ecosystem.',
     '[
        "Review and strengthen 10+ relationships",
        "Schedule follow-ups for next month",
        "Document relationship insights",
        "Plan participation in 3 upcoming events",
        "Create relationship maintenance system"
     ]',
     '{
        "tools": ["Relationship Audit Tool", "Engagement Calendar"],
        "templates": ["Relationship Status Report", "Monthly Engagement Plan"],
        "checklists": ["Week 2 Relationship Checklist"],
        "support": ["Expert Relationship Review", "Peer Success Stories"]
     }',
     250, 60),
     
    -- Module 3: Days 15-21
    (3, 15, 'Application Engineering - Beyond Documentation',
     'Master the art of creating compelling applications that tell a story, demonstrate impact, and position you as strategic partner, not just funding recipient.',
     '[
        "Analyze 5 winning applications",
        "Create application story framework",
        "Draft executive summary that compels",
        "Design impact measurement metrics",
        "Build application template library"
     ]',
     '{
        "videos": ["Application Engineering Masterclass"],
        "templates": ["Winning Application Templates", "Executive Summary Builder"],
        "examples": ["20 Successful Applications", "Before/After Comparisons"],
        "tools": ["Application Score Predictor", "Impact Calculator"]
     }',
     250, 60),
     
    (3, 16, 'Multi-Scheme Coordination Strategy',
     'Learn to apply for multiple schemes simultaneously without conflicts. Master timing, sequencing, and portfolio optimization for maximum funding success.',
     '[
        "Map scheme interdependencies",
        "Create application timeline for 6 months",
        "Identify complementary scheme combinations",
        "Design portfolio worth ₹10Cr+",
        "Submit 2 coordinated applications"
     ]',
     '{
        "videos": ["Multi-Scheme Strategy Workshop"],
        "tools": ["Scheme Conflict Checker", "Portfolio Optimizer"],
        "templates": ["Application Calendar", "Scheme Combination Matrix"],
        "guides": ["Timing Strategy Guide", "Portfolio Management Manual"]
     }',
     200, 45),
     
    (3, 17, 'Documentation Mastery & Professional Presentation',
     'Create professional documentation that stands out. Master financial projections, technical proposals, and presentation design that wins approvals.',
     '[
        "Create professional document templates",
        "Design compelling financial projections",
        "Build technical proposal framework",
        "Develop presentation deck template",
        "Compile master documentation folder"
     ]',
     '{
        "videos": ["Documentation Excellence Course"],
        "templates": ["Financial Model Templates", "Technical Proposal Formats"],
        "tools": ["Document Organizer", "Projection Calculator"],
        "guides": ["Presentation Design Guide", "Documentation Checklist"]
     }',
     200, 45),
     
    (3, 18, 'Advanced Application Strategies',
     'Learn insider tactics: consortium applications, phased funding approaches, strategic partnerships for applications, and success multiplier techniques.',
     '[
        "Design consortium application strategy",
        "Create phased funding proposal",
        "Build application partnership network",
        "Apply success multiplier tactics",
        "Submit 1 advanced application"
     ]',
     '{
        "videos": ["Advanced Application Tactics"],
        "templates": ["Consortium Agreement Template", "Phased Proposal Format"],
        "case_studies": ["Complex Application Successes"],
        "tools": ["Partnership Coordinator", "Phase Planning Tool"]
     }',
     250, 60),
     
    (3, 19, 'Follow-up Excellence & Relationship Leverage',
     'Master the critical follow-up phase. Learn systematic engagement, concern addressing, and relationship leverage for application success.',
     '[
        "Create follow-up protocol for applications",
        "Draft concern-addressing templates",
        "Schedule strategic follow-up meetings",
        "Leverage relationships for support",
        "Track application progress systematically"
     ]',
     '{
        "videos": ["Follow-up Mastery Workshop"],
        "templates": ["Follow-up Email Scripts", "Concern Response Templates"],
        "tools": ["Application Status Tracker", "Follow-up Calendar"],
        "guides": ["Meeting Success Protocol", "Objection Handling Manual"]
     }',
     200, 45),
     
    (3, 20, 'Negotiation & Terms Optimization',
     'Learn to negotiate funding terms, optimize conditions, and structure deals for maximum benefit. Master government negotiation protocols and win-win strategies.',
     '[
        "Study government negotiation patterns",
        "Prepare negotiation strategy framework",
        "Practice term optimization techniques",
        "Create win-win proposal modifications",
        "Document negotiation outcomes"
     ]',
     '{
        "videos": ["Government Negotiation Masterclass"],
        "frameworks": ["Negotiation Strategy Framework", "Terms Analysis Tool"],
        "templates": ["Counter-Proposal Templates", "Terms Sheet Formats"],
        "guides": ["Negotiation Protocol Guide", "Win-Win Strategy Manual"]
     }',
     200, 45),
     
    (3, 21, 'Week 3 Sprint - Application Excellence',
     'Submit multiple applications, implement advanced strategies, and create application momentum. Consolidate documentation and prepare for funding success.',
     '[
        "Submit 3-5 strategic applications",
        "Complete all documentation requirements",
        "Implement follow-up system",
        "Track application metrics",
        "Plan week 4 execution strategy"
     ]',
     '{
        "checklists": ["Application Submission Checklist", "Documentation Audit"],
        "tools": ["Submission Tracker", "Success Probability Calculator"],
        "templates": ["Week 3 Report", "Week 4 Planning Template"],
        "support": ["Application Review Service", "Expert Feedback Session"]
     }',
     300, 60),
     
    -- Module 4: Days 22-28
    (4, 22, 'Fund Management Excellence',
     'Master fund utilization, milestone management, and financial reporting. Learn to exceed government expectations and build credibility for future funding.',
     '[
        "Create fund utilization framework",
        "Design milestone tracking system",
        "Build financial reporting templates",
        "Establish audit preparation process",
        "Document compliance protocols"
     ]',
     '{
        "videos": ["Fund Management Masterclass"],
        "templates": ["Utilization Certificate Format", "Milestone Report Template"],
        "tools": ["Fund Tracker", "Compliance Calendar"],
        "guides": ["Financial Reporting Guide", "Audit Preparation Manual"]
     }',
     200, 45),
     
    (4, 23, 'Compliance Mastery & Reporting Excellence',
     'Navigate complex compliance requirements, create professional reports, and build systems for effortless compliance that strengthens government relationships.',
     '[
        "Map all compliance requirements",
        "Create reporting calendar",
        "Build compliance tracking system",
        "Prepare first progress report",
        "Schedule compliance audit"
     ]',
     '{
        "videos": ["Compliance Excellence Workshop"],
        "templates": ["Progress Report Templates", "Compliance Checklists"],
        "tools": ["Compliance Tracker", "Report Generator"],
        "guides": ["Reporting Standards Guide", "Compliance Best Practices"]
     }',
     200, 45),
     
    (4, 24, 'Success Story Development & Showcasing',
     'Transform your success into powerful stories. Learn to document impact, create case studies, and position yourself as government success champion.',
     '[
        "Document success metrics and impact",
        "Create professional case study",
        "Develop success story presentation",
        "Submit story to government portal",
        "Plan showcase opportunities"
     ]',
     '{
        "videos": ["Success Story Creation Course"],
        "templates": ["Case Study Template", "Impact Report Format"],
        "tools": ["Impact Measurement Tool", "Story Builder"],
        "guides": ["Government Showcase Guide", "Media Kit Creation"]
     }',
     250, 60),
     
    (4, 25, 'Scaling Through Government Partnerships',
     'Learn to leverage initial success for exponential growth. Master repeat funding, scheme stacking, and building government-backed business empire.',
     '[
        "Design scaling strategy with government",
        "Identify next-level funding opportunities",
        "Create expansion partnership proposals",
        "Build repeat funding framework",
        "Apply for 2 scale-up schemes"
     ]',
     '{
        "videos": ["Scaling Strategy Masterclass"],
        "frameworks": ["Scale-up Framework", "Partnership Model"],
        "templates": ["Expansion Proposal Template", "Partnership Agreement"],
        "case_studies": ["10 Scaling Success Stories"]
     }',
     200, 45),
     
    (4, 26, 'Building Long-term Government Relationships',
     'Transform from funding recipient to strategic partner. Learn to build decade-long relationships that create sustainable competitive advantage.',
     '[
        "Create 5-year relationship strategy",
        "Design value creation framework",
        "Plan annual engagement calendar",
        "Build partnership sustainability model",
        "Document relationship capital"
     ]',
     '{
        "videos": ["Long-term Partnership Workshop"],
        "frameworks": ["Relationship Lifecycle Model", "Value Creation Matrix"],
        "templates": ["Partnership Roadmap", "Annual Engagement Plan"],
        "guides": ["Relationship Sustainability Guide"]
     }',
     200, 45),
     
    (4, 27, 'Government Contracts & Procurement Mastery',
     'Access the ₹1.5 lakh crore GeM marketplace. Master bidding strategies, contract execution, and building government as customer, not just funder.',
     '[
        "Analyze GeM opportunities in your sector",
        "Create bidding strategy framework",
        "Submit 2 strategic bids",
        "Build contract execution capability",
        "Plan government customer acquisition"
     ]',
     '{
        "videos": ["GeM Mastery Course"],
        "templates": ["Bid Proposal Templates", "Contract Formats"],
        "tools": ["Bid Calculator", "Contract Manager"],
        "guides": ["GeM Success Playbook", "Procurement Strategy Guide"]
     }',
     250, 60),
     
    (4, 28, 'Week 4 Excellence - Execution Mastery',
     'Consolidate execution excellence, strengthen compliance, showcase success, and prepare for advanced strategies. Create sustainable government partnership ecosystem.',
     '[
        "Complete all compliance requirements",
        "Submit success stories and case studies",
        "Strengthen 15+ government relationships",
        "Plan next quarter funding pipeline",
        "Document week 4 achievements"
     ]',
     '{
        "checklists": ["Execution Excellence Checklist", "Compliance Audit"],
        "tools": ["Performance Dashboard", "Pipeline Tracker"],
        "templates": ["Quarter Review Template", "Success Report"],
        "support": ["Expert Execution Review", "Peer Mastermind Session"]
     }',
     300, 60),
     
    -- Module 5: Days 29-35
    (5, 29, 'Elite Strategy - Policy Influence & Thought Leadership',
     'Position yourself as policy influencer and thought leader. Learn to shape government decisions, influence scheme design, and become sector voice.',
     '[
        "Create thought leadership content plan",
        "Write policy position paper",
        "Submit to 2 policy consultations",
        "Connect with policy makers",
        "Plan speaking engagements"
     ]',
     '{
        "videos": ["Policy Influence Masterclass"],
        "templates": ["Position Paper Template", "Policy Brief Format"],
        "tools": ["Influence Tracker", "Content Planner"],
        "guides": ["Thought Leadership Playbook", "Policy Engagement Manual"]
     }',
     250, 60),
     
    (5, 30, 'International Expansion Through Government',
     'Leverage government support for global expansion. Access trade missions, embassy support, bilateral programs, and international partnerships.',
     '[
        "Map international expansion opportunities",
        "Apply for trade mission participation",
        "Connect with 5 embassy officials",
        "Create international partnership proposal",
        "Plan global expansion strategy"
     ]',
     '{
        "videos": ["International Expansion Workshop"],
        "directories": ["Embassy Network", "Trade Mission Calendar"],
        "templates": ["International Proposal Template", "Partnership MOU"],
        "guides": ["Global Expansion Playbook", "Embassy Leverage Guide"]
     }',
     250, 60),
     
    (5, 31, 'Strategic Sector Access - Defense, Space, Railways',
     'Access high-value strategic sectors through government partnerships. Learn to navigate defense, space, railways, and other restricted sectors.',
     '[
        "Research strategic sector opportunities",
        "Build sector-specific credentials",
        "Connect with sector stakeholders",
        "Apply for strategic sector programs",
        "Create sector entry strategy"
     ]',
     '{
        "videos": ["Strategic Sector Access Course"],
        "frameworks": ["Sector Entry Framework", "Credential Builder"],
        "templates": ["Strategic Proposal Template", "Security Clearance Guide"],
        "directories": ["Strategic Sector Contacts", "Program Database"]
     }',
     200, 45),
     
    (5, 32, 'Building Government-Backed Competitive Moats',
     'Create sustainable competitive advantages through government partnerships. Learn exclusivity strategies, regulatory advantages, and market protection techniques.',
     '[
        "Identify competitive moat opportunities",
        "Design exclusivity strategy",
        "Build regulatory advantage plan",
        "Create market protection framework",
        "Document competitive advantages"
     ]',
     '{
        "videos": ["Competitive Moat Strategies"],
        "frameworks": ["Moat Building Framework", "Advantage Analysis"],
        "case_studies": ["Monopoly Success Stories"],
        "guides": ["Regulatory Advantage Guide", "Market Protection Manual"]
     }',
     250, 60),
     
    (5, 33, 'PSU Partnerships & Joint Ventures',
     'Partner with Public Sector Units for exponential growth. Learn JV structuring, PSU collaboration models, and strategic partnership frameworks.',
     '[
        "Identify PSU partnership opportunities",
        "Create JV proposal framework",
        "Connect with PSU decision makers",
        "Design collaboration model",
        "Submit partnership proposal"
     ]',
     '{
        "videos": ["PSU Partnership Masterclass"],
        "templates": ["JV Proposal Template", "MOU Formats"],
        "directories": ["PSU Contact Database", "Partnership Opportunities"],
        "guides": ["PSU Collaboration Guide", "JV Structuring Manual"]
     }',
     200, 45),
     
    (5, 34, 'Creating Your Government Success Ecosystem',
     'Build complete ecosystem with multiple funding sources, strategic partnerships, policy influence, and sustainable competitive advantages.',
     '[
        "Design 5-year ecosystem vision",
        "Map all stakeholder relationships",
        "Create sustainability framework",
        "Build succession planning model",
        "Document ecosystem blueprint"
     ]',
     '{
        "videos": ["Ecosystem Building Workshop"],
        "frameworks": ["Ecosystem Design Framework", "Sustainability Model"],
        "templates": ["Vision Document Template", "Ecosystem Map"],
        "tools": ["Ecosystem Builder", "Relationship Visualizer"]
     }',
     250, 60),
     
    (5, 35, 'Graduation Day - Your Government Mastery Roadmap',
     'Consolidate your transformation from applicant to strategic partner. Create long-term roadmap, celebrate achievements, and plan ecosystem leadership journey.',
     '[
        "Complete government mastery assessment",
        "Create 5-year strategic roadmap",
        "Document all achievements and wins",
        "Plan next-level opportunities",
        "Share success story with community"
     ]',
     '{
        "certificates": ["Government Mastery Certificate"],
        "frameworks": ["5-Year Roadmap Template", "Legacy Planning Framework"],
        "community": ["Alumni Network Access", "Mastermind Group"],
        "support": ["Lifetime Advisory Access", "Annual Strategy Sessions"]
     }',
     300, 60)
     
) AS lessons(module_order, lesson_day, lesson_title, lesson_content, action_items, resources, xp_reward, estimated_time),
p9_modules m
WHERE m."orderIndex" = lessons.module_order;

-- Insert P9-specific resources (commented out as Resources table may not exist)
/*
INSERT INTO "Resources" ("productId", "title", "description", "type", "url", "metadata", "createdAt", "updatedAt")
SELECT 
    p.id,
    resource_title,
    resource_description,
    resource_type,
    resource_url,
    metadata::jsonb,
    NOW(),
    NOW()
FROM (
    VALUES 
    ('Government Ecosystem Mapper', 'Complete organizational chart of 47 ministries with contact details and decision-making hierarchy', 'tool', 
     '/resources/p9/ecosystem-mapper', '{"downloadable": true, "format": "interactive"}'),
    
    ('850+ Schemes Database', 'Comprehensive database of all active government schemes with eligibility, process, and success rates', 'database', 
     '/resources/p9/schemes-database', '{"searchable": true, "updated": "monthly"}'),
    
    ('1200+ Contact Directory', 'Verified government official contacts across all ministries and departments', 'directory', 
     '/resources/p9/contact-directory', '{"verified": true, "categories": 47}'),
    
    ('Application Template Library', 'Professional templates for all major government schemes and proposals', 'templates', 
     '/resources/p9/application-templates', '{"count": 250, "editable": true}'),
    
    ('Platform Navigation Guide', 'Step-by-step guides for 25+ government portals and platforms', 'guide', 
     '/resources/p9/platform-guide', '{"platforms": 25, "video_tutorials": true}'),
    
    ('Success Story Library', '500+ detailed case studies of successful government funding', 'case_studies', 
     '/resources/p9/success-stories', '{"sectors": 15, "searchable": true}'),
    
    ('Policy Response Toolkit', 'Templates and frameworks for participating in policy consultations', 'toolkit', 
     '/resources/p9/policy-toolkit', '{"templates": 20, "examples": 50}'),
    
    ('International Programs Guide', 'Access guide for bilateral and multilateral funding programs', 'guide', 
     '/resources/p9/international-guide', '{"programs": 15, "countries": 25}'),
    
    ('Compliance Management System', 'Complete system for managing government compliance and reporting', 'system', 
     '/resources/p9/compliance-system', '{"automated": true, "reminders": true}'),
    
    ('GeM Mastery Playbook', 'Complete guide to winning government contracts on GeM portal', 'playbook', 
     '/resources/p9/gem-playbook', '{"value": "1.5L Cr market", "success_rate": "71%"}')
     
) AS resources(resource_title, resource_description, resource_type, resource_url, metadata),
(SELECT id FROM "Product" WHERE code = 'P9') p;
*/

-- Insert P9-specific portfolio activities (commented out as table may not exist)
/*
INSERT INTO "PortfolioActivityType" ("name", "category", "description", "promptText", "metadata", "createdAt", "updatedAt")
VALUES 
    ('government_funding_strategy', 'go_to_market', 
     'Document your government funding strategy and pipeline', 
     'Describe your government funding strategy, target schemes, and relationship building approach.',
     '{"relatedProduct": "P9", "xpReward": 200}'::jsonb, NOW(), NOW()),
    
    ('policy_participation', 'brand_assets', 
     'Document your policy consultation participation and thought leadership', 
     'Describe your contributions to policy consultations and thought leadership initiatives.',
     '{"relatedProduct": "P9", "xpReward": 250}'::jsonb, NOW(), NOW()),
    
    ('government_partnerships', 'business_model', 
     'Detail your government partnerships and strategic relationships', 
     'List your government partnerships, PSU collaborations, and strategic relationships built.',
     '{"relatedProduct": "P9", "xpReward": 300}'::jsonb, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
*/

-- Update P9 course completion tracking (commented out as table may not exist)
/*
INSERT INTO "CourseCompletionRewards" ("productCode", "rewardType", "rewardValue", "metadata", "createdAt", "updatedAt")
VALUES 
    ('P9', 'certificate', 'Government Funding Mastery Certificate', 
     '{"certificateType": "advanced", "validityYears": 3}'::jsonb, NOW(), NOW()),
    ('P9', 'badge', 'Government Strategic Partner', 
     '{"badgeLevel": "elite", "benefits": ["priority_support", "policy_access"]}'::jsonb, NOW(), NOW()),
    ('P9', 'access', 'Elite Government Network', 
     '{"networkSize": 1200, "includes": ["monthly_briefings", "quarterly_sessions"]}'::jsonb, NOW(), NOW())
ON CONFLICT (productCode, rewardType) DO UPDATE
SET rewardValue = EXCLUDED.rewardValue,
    metadata = EXCLUDED.metadata,
    updatedAt = NOW();
*/

COMMIT;

-- Verification Query
SELECT 
    p.code,
    p.title,
    p.price,
    p."estimatedDays",
    COUNT(DISTINCT m.id) as module_count,
    COUNT(DISTINCT l.id) as lesson_count
    -- COUNT(DISTINCT r.id) as resource_count
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
-- LEFT JOIN "Resources" r ON r."productId" = p.id
WHERE p.code = 'P9'
GROUP BY p.code, p.title, p.price, p."estimatedDays";