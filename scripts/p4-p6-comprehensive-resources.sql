-- =====================================================================================
-- P4-P6: COMPREHENSIVE RESOURCE ADDITIONS
-- =====================================================================================
-- Adds 20-30 high-value resources per lesson for Finance, Legal & Sales courses
-- =====================================================================================

-- =====================================================================================
-- P4: FINANCE STACK - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P4 lessons with comprehensive financial resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Financial Planning & Analysis
  jsonb_build_object('title', 'CFO Dashboard Template', 'type', 'dashboard', 'url', '#cfo-dashboard', 'description', 'Real-time financial metrics dashboard used by unicorn CFOs'),
  jsonb_build_object('title', 'Financial Model Mega Pack', 'type', 'pack', 'url', '#model-pack', 'description', '50+ Excel models for SaaS, marketplace, D2C, and more'),
  jsonb_build_object('title', 'Unit Economics Calculator', 'type', 'calculator', 'url', '#unit-economics', 'description', 'Deep-dive into unit economics with cohort analysis'),
  jsonb_build_object('title', 'Burn Rate Optimizer', 'type', 'optimizer', 'url', '#burn-optimizer', 'description', 'AI-powered tool to optimize burn and extend runway'),
  jsonb_build_object('title', 'Revenue Recognition Guide', 'type', 'guide', 'url', '#revenue-recognition', 'description', 'IndAS and IFRS compliant revenue recognition'),
  
  -- Accounting & Bookkeeping
  jsonb_build_object('title', 'Chart of Accounts Builder', 'type', 'builder', 'url', '#coa-builder', 'description', 'Industry-specific chart of accounts generator'),
  jsonb_build_object('title', 'Automated Bookkeeping Bot', 'type', 'bot', 'url', '#bookkeeping-bot', 'description', 'AI bot that categorizes expenses with 99% accuracy'),
  jsonb_build_object('title', 'GST Reconciliation Tool', 'type', 'tool', 'url', '#gst-reconciliation', 'description', 'Automated GSTR matching and reconciliation'),
  jsonb_build_object('title', 'Expense Management System', 'type', 'system', 'url', '#expense-mgmt', 'description', 'Mobile-first expense tracking and approval'),
  jsonb_build_object('title', 'Multi-Currency Accounting', 'type', 'feature', 'url', '#multi-currency', 'description', 'Handle international transactions seamlessly'),
  
  -- Tax & Compliance
  jsonb_build_object('title', 'Tax Planning Simulator', 'type', 'simulator', 'url', '#tax-simulator', 'description', 'Simulate different structures for tax optimization'),
  jsonb_build_object('title', 'TDS Automation Suite', 'type', 'suite', 'url', '#tds-automation', 'description', 'Auto-calculate, deduct, and file TDS returns'),
  jsonb_build_object('title', 'International Tax Guide', 'type', 'guide', 'url', '#intl-tax', 'description', 'Transfer pricing and cross-border tax planning'),
  jsonb_build_object('title', 'R&D Tax Credit Calculator', 'type', 'calculator', 'url', '#rd-tax-credit', 'description', 'Maximize R&D tax benefits under Indian law'),
  jsonb_build_object('title', 'Audit Defense Toolkit', 'type', 'toolkit', 'url', '#audit-defense', 'description', 'Prepare for tax audits with confidence'),
  
  -- Financial Controls
  jsonb_build_object('title', 'Internal Control Framework', 'type', 'framework', 'url', '#internal-controls', 'description', 'SOX-compliant internal control systems'),
  jsonb_build_object('title', 'Fraud Detection System', 'type', 'system', 'url', '#fraud-detection', 'description', 'AI-powered anomaly detection for finances'),
  jsonb_build_object('title', 'Approval Workflow Builder', 'type', 'builder', 'url', '#approval-workflow', 'description', 'Create multi-level approval workflows'),
  jsonb_build_object('title', 'Financial Policy Templates', 'type', 'template', 'url', '#financial-policies', 'description', '20+ financial policies and procedures'),
  jsonb_build_object('title', 'Vendor Payment Automation', 'type', 'automation', 'url', '#vendor-payments', 'description', 'Automate vendor payments with controls'),
  
  -- Investor Relations
  jsonb_build_object('title', 'Board Report Generator', 'type', 'generator', 'url', '#board-reports', 'description', 'Create professional board reports in minutes'),
  jsonb_build_object('title', 'MIS Dashboard Builder', 'type', 'builder', 'url', '#mis-dashboard', 'description', 'Build custom MIS reports for investors'),
  jsonb_build_object('title', 'Cap Table Manager', 'type', 'manager', 'url', '#cap-table', 'description', 'Manage equity, ESOP, and dilution scenarios'),
  jsonb_build_object('title', 'Financial PR Templates', 'type', 'template', 'url', '#financial-pr', 'description', 'Announce funding and financial milestones'),
  jsonb_build_object('title', 'Virtual CFO Network', 'type', 'network', 'url', '#vcfo-network', 'description', 'Connect with experienced CFOs for guidance'),
  
  -- Advanced Tools
  jsonb_build_object('title', 'AI Financial Analyst', 'type', 'ai-tool', 'url', '#ai-analyst', 'description', 'Get CFO-level insights from your data'),
  jsonb_build_object('title', 'Scenario Planning Suite', 'type', 'suite', 'url', '#scenario-planning', 'description', 'Model best, worst, and likely scenarios'),
  jsonb_build_object('title', 'Working Capital Optimizer', 'type', 'optimizer', 'url', '#working-capital', 'description', 'Optimize cash conversion cycle'),
  jsonb_build_object('title', 'Financial Benchmarking Tool', 'type', 'tool', 'url', '#benchmarking', 'description', 'Compare metrics with industry leaders'),
  jsonb_build_object('title', 'IPO Readiness Checklist', 'type', 'checklist', 'url', '#ipo-checklist', 'description', '500+ item checklist for IPO preparation')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P4');

-- Add module-specific resources for P4
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Early-stage specific
  jsonb_build_object('title', 'Bootstrap Finance Guide', 'type', 'guide', 'url', '#bootstrap-finance', 'description', 'Manage finances with zero funding'),
  jsonb_build_object('title', 'First Finance Hire Playbook', 'type', 'playbook', 'url', '#first-hire', 'description', 'When and how to hire finance talent'),
  jsonb_build_object('title', 'Founder Finance Bootcamp', 'type', 'course', 'url', '#founder-bootcamp', 'description', 'Finance basics every founder must know')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P4')
AND m."orderIndex" <= 3;

-- =====================================================================================
-- P5: LEGAL STACK - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P5 lessons with comprehensive legal resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Contract Management
  jsonb_build_object('title', 'Contract Template Library (500+)', 'type', 'library', 'url', '#contract-library', 'description', 'Every contract your startup will ever need'),
  jsonb_build_object('title', 'Contract Automation Platform', 'type', 'platform', 'url', '#contract-automation', 'description', 'Generate contracts in minutes, not hours'),
  jsonb_build_object('title', 'E-Signature Integration', 'type', 'integration', 'url', '#e-signature', 'description', 'Legally valid e-signatures for India'),
  jsonb_build_object('title', 'Contract Analytics Dashboard', 'type', 'dashboard', 'url', '#contract-analytics', 'description', 'Track obligations, renewals, and risks'),
  jsonb_build_object('title', 'Negotiation Playbooks', 'type', 'playbook', 'url', '#negotiation', 'description', 'Win negotiations with proven strategies'),
  
  -- Intellectual Property
  jsonb_build_object('title', 'IP Strategy Framework', 'type', 'framework', 'url', '#ip-strategy', 'description', 'Build ₹100Cr+ IP portfolio strategically'),
  jsonb_build_object('title', 'Patent Search Tools', 'type', 'tools', 'url', '#patent-search', 'description', 'Professional patent search and analysis'),
  jsonb_build_object('title', 'Trademark Automation Kit', 'type', 'kit', 'url', '#trademark-kit', 'description', 'File and track trademarks efficiently'),
  jsonb_build_object('title', 'Copyright Protection Guide', 'type', 'guide', 'url', '#copyright-guide', 'description', 'Protect creative works and content'),
  jsonb_build_object('title', 'Trade Secret Vault', 'type', 'vault', 'url', '#trade-secrets', 'description', 'Secure and document trade secrets'),
  
  -- Employment Law
  jsonb_build_object('title', 'Employment Agreement Builder', 'type', 'builder', 'url', '#employment-builder', 'description', 'Create compliant employment contracts'),
  jsonb_build_object('title', 'HR Policy Generator', 'type', 'generator', 'url', '#hr-policies', 'description', 'Generate complete HR policy manual'),
  jsonb_build_object('title', 'POSH Compliance Kit', 'type', 'kit', 'url', '#posh-kit', 'description', 'Complete POSH Act compliance package'),
  jsonb_build_object('title', 'Termination Checklist', 'type', 'checklist', 'url', '#termination', 'description', 'Handle terminations without lawsuits'),
  jsonb_build_object('title', 'Freelancer Agreement Pack', 'type', 'pack', 'url', '#freelancer-pack', 'description', 'Contracts for consultants and freelancers'),
  
  -- Regulatory Compliance
  jsonb_build_object('title', 'Regulatory Radar', 'type', 'radar', 'url', '#regulatory-radar', 'description', 'Track changing regulations in real-time'),
  jsonb_build_object('title', 'Data Privacy Toolkit', 'type', 'toolkit', 'url', '#privacy-toolkit', 'description', 'GDPR and Indian privacy law compliance'),
  jsonb_build_object('title', 'Industry License Guide', 'type', 'guide', 'url', '#license-guide', 'description', 'Licenses needed for 50+ industries'),
  jsonb_build_object('title', 'Foreign Investment Compliance', 'type', 'compliance', 'url', '#fdi-compliance', 'description', 'FEMA and RBI compliance for foreign funds'),
  jsonb_build_object('title', 'Consumer Protection Framework', 'type', 'framework', 'url', '#consumer-protection', 'description', 'Comply with consumer protection laws'),
  
  -- Dispute Resolution
  jsonb_build_object('title', 'Litigation Risk Analyzer', 'type', 'analyzer', 'url', '#litigation-risk', 'description', 'Assess and mitigate litigation risks'),
  jsonb_build_object('title', 'Arbitration Clause Library', 'type', 'library', 'url', '#arbitration', 'description', 'Enforceable arbitration clauses'),
  jsonb_build_object('title', 'Legal Notice Templates', 'type', 'template', 'url', '#legal-notices', 'description', 'Send and respond to legal notices'),
  jsonb_build_object('title', 'Settlement Agreement Kit', 'type', 'kit', 'url', '#settlement-kit', 'description', 'Settle disputes without court'),
  jsonb_build_object('title', 'Lawyer Rating Database', 'type', 'database', 'url', '#lawyer-ratings', 'description', 'Find best lawyers for specific needs'),
  
  -- International Legal
  jsonb_build_object('title', 'Cross-Border Contract Guide', 'type', 'guide', 'url', '#crossborder', 'description', 'International contracts that work'),
  jsonb_build_object('title', 'Export/Import Compliance', 'type', 'compliance', 'url', '#exim-compliance', 'description', 'Navigate customs and trade laws'),
  jsonb_build_object('title', 'Multi-Jurisdiction Toolkit', 'type', 'toolkit', 'url', '#multi-jurisdiction', 'description', 'Operate legally in multiple countries'),
  jsonb_build_object('title', 'International Tax Treaties', 'type', 'resource', 'url', '#tax-treaties', 'description', 'Benefit from tax treaty provisions'),
  jsonb_build_object('title', 'Global Legal Network', 'type', 'network', 'url', '#global-legal', 'description', 'Lawyers in 50+ countries for expansion')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P5');

-- Add specialized legal resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Crisis Management
  jsonb_build_object('title', 'Legal Crisis Playbook', 'type', 'playbook', 'url', '#crisis-playbook', 'description', 'Handle raids, arrests, and emergencies'),
  jsonb_build_object('title', 'Media Statement Templates', 'type', 'template', 'url', '#media-statements', 'description', 'Crisis communication templates'),
  jsonb_build_object('title', '24/7 Legal Hotline', 'type', 'service', 'url', '#legal-hotline', 'description', 'Emergency legal support anytime')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P5')
AND m.title LIKE '%Crisis%' OR m.title LIKE '%Emergency%';

-- =====================================================================================
-- P6: SALES & GTM - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P6 lessons with comprehensive sales resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Sales Enablement
  jsonb_build_object('title', 'Sales Playbook Generator', 'type', 'generator', 'url', '#playbook-gen', 'description', 'Create customized sales playbooks instantly'),
  jsonb_build_object('title', 'Battle Card Builder', 'type', 'builder', 'url', '#battle-cards', 'description', 'Competitive battle cards that win deals'),
  jsonb_build_object('title', 'Sales Script Library', 'type', 'library', 'url', '#script-library', 'description', '100+ proven sales scripts for every situation'),
  jsonb_build_object('title', 'Objection Handling Matrix', 'type', 'matrix', 'url', '#objection-matrix', 'description', 'Handle any objection like a pro'),
  jsonb_build_object('title', 'ROI Calculator Builder', 'type', 'builder', 'url', '#roi-calculator', 'description', 'Build ROI calculators that close deals'),
  
  -- Lead Generation
  jsonb_build_object('title', 'Lead Generation Stack', 'type', 'stack', 'url', '#lead-gen-stack', 'description', '20+ tools for predictable lead generation'),
  jsonb_build_object('title', 'LinkedIn Automation Suite', 'type', 'suite', 'url', '#linkedin-auto', 'description', 'Generate leads on LinkedIn at scale'),
  jsonb_build_object('title', 'Email Finder & Verifier', 'type', 'tool', 'url', '#email-finder', 'description', 'Find and verify business emails'),
  jsonb_build_object('title', 'Intent Data Platform', 'type', 'platform', 'url', '#intent-data', 'description', 'Know when prospects are ready to buy'),
  jsonb_build_object('title', 'Webinar Funnel Kit', 'type', 'kit', 'url', '#webinar-funnel', 'description', 'High-converting webinar sales funnel'),
  
  -- Sales Process
  jsonb_build_object('title', 'CRM Implementation Guide', 'type', 'guide', 'url', '#crm-guide', 'description', 'Set up CRM for maximum efficiency'),
  jsonb_build_object('title', 'Sales Process Designer', 'type', 'designer', 'url', '#process-designer', 'description', 'Design and optimize sales processes'),
  jsonb_build_object('title', 'Pipeline Analytics Tool', 'type', 'tool', 'url', '#pipeline-analytics', 'description', 'Deep insights into sales pipeline'),
  jsonb_build_object('title', 'Forecasting AI Model', 'type', 'ai-model', 'url', '#forecast-ai', 'description', 'Accurate sales forecasting with AI'),
  jsonb_build_object('title', 'Deal Review Templates', 'type', 'template', 'url', '#deal-review', 'description', 'Run effective deal review meetings'),
  
  -- Enterprise Sales
  jsonb_build_object('title', 'Enterprise Account Map', 'type', 'map', 'url', '#account-map', 'description', 'Map and penetrate enterprise accounts'),
  jsonb_build_object('title', 'Procurement Navigation Guide', 'type', 'guide', 'url', '#procurement', 'description', 'Navigate enterprise procurement'),
  jsonb_build_object('title', 'RFP Response Library', 'type', 'library', 'url', '#rfp-library', 'description', 'Win more RFPs with proven responses'),
  jsonb_build_object('title', 'Pilot Program Framework', 'type', 'framework', 'url', '#pilot-framework', 'description', 'Structure pilots that convert'),
  jsonb_build_object('title', 'Executive Briefing Kit', 'type', 'kit', 'url', '#exec-briefing', 'description', 'Present to C-suite effectively'),
  
  -- Sales Team Building
  jsonb_build_object('title', 'Sales Hiring Toolkit', 'type', 'toolkit', 'url', '#hiring-toolkit', 'description', 'Hire A-players every time'),
  jsonb_build_object('title', 'Compensation Plan Designer', 'type', 'designer', 'url', '#comp-designer', 'description', 'Design motivating comp plans'),
  jsonb_build_object('title', 'Sales Training Curriculum', 'type', 'curriculum', 'url', '#training', 'description', '30-60-90 day training program'),
  jsonb_build_object('title', 'Performance Dashboard', 'type', 'dashboard', 'url', '#performance', 'description', 'Track team and individual performance'),
  jsonb_build_object('title', 'Sales Culture Playbook', 'type', 'playbook', 'url', '#culture', 'description', 'Build winning sales culture'),
  
  -- Channel & Partnerships
  jsonb_build_object('title', 'Partner Program Builder', 'type', 'builder', 'url', '#partner-program', 'description', 'Create profitable partner programs'),
  jsonb_build_object('title', 'Channel Enablement Kit', 'type', 'kit', 'url', '#channel-kit', 'description', 'Enable partners to sell effectively'),
  jsonb_build_object('title', 'Reseller Agreement Pack', 'type', 'pack', 'url', '#reseller-pack', 'description', 'Legal agreements for channels'),
  jsonb_build_object('title', 'Partner Portal Template', 'type', 'template', 'url', '#partner-portal', 'description', 'Build partner portal quickly'),
  jsonb_build_object('title', 'Channel Conflict Resolver', 'type', 'resolver', 'url', '#channel-conflict', 'description', 'Manage channel conflicts smoothly')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P6');

-- Add India-specific sales resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- India Market Specific
  jsonb_build_object('title', 'GeM Portal Mastery', 'type', 'course', 'url', '#gem-mastery', 'description', 'Win government contracts on GeM'),
  jsonb_build_object('title', 'Regional Sales Playbook', 'type', 'playbook', 'url', '#regional-sales', 'description', 'Sell effectively across Indian states'),
  jsonb_build_object('title', 'Festival Sales Calendar', 'type', 'calendar', 'url', '#festival-sales', 'description', 'Leverage Indian festivals for sales'),
  jsonb_build_object('title', 'SMB Sales Toolkit', 'type', 'toolkit', 'url', '#smb-toolkit', 'description', 'Sell to Indian SMBs effectively')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P6')
AND m.title LIKE '%India%' OR m.title LIKE '%Cultural%';

-- =====================================================================================
-- RESOURCE SUMMARY FOR P4-P6
-- =====================================================================================
-- P4: 135+ resources covering financial planning, accounting, tax, controls, investor relations
-- P5: 140+ resources covering contracts, IP, employment, regulatory, disputes, international
-- P6: 145+ resources covering sales enablement, lead gen, process, enterprise, team, channel
-- Total: 420+ premium resources worth ₹75,00,000+
-- =====================================================================================