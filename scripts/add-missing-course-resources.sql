-- Add Missing Resources for P7, P9, P10, P11
-- Ensures each course has minimum 10 templates + 5 interactive resources

-- P7: State Ecosystem Mastery Resources
-- Templates (15 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

-- Module 1: State Ecosystem Architecture Templates
('p7-template-001', '9222f3bc-6909-4f33-80f5-f52754c7e400', 'State Selection Matrix Template', 'Comprehensive scoring matrix to evaluate and select optimal states for business setup', 'template', true, ARRAY['analysis', 'state-selection', 'decision-making'], '{"format": "xlsx", "pages": 3}'),
('p7-template-002', '9222f3bc-6909-4f33-80f5-f52754c7e400', 'State Ecosystem Mapping Template', 'Visual template to map key stakeholders, policies, and opportunities in each state', 'template', true, ARRAY['mapping', 'ecosystem', 'stakeholders'], '{"format": "pptx", "slides": 15}'),
('p7-template-003', '30819b66-9d9c-4cc1-ae5e-5b93105860ca', 'Innovation Hub Partnership Agreement Template', 'Legal template for partnerships with state innovation hubs and incubators', 'template', true, ARRAY['partnership', 'legal', 'innovation'], '{"format": "docx", "clauses": 25}'),

-- Module 2: State Innovation Infrastructure Templates  
('p7-template-004', '30819b66-9d9c-4cc1-ae5e-5b93105860ca', 'State Grant Application Master Template', 'Universal template adaptable for any state grant application with sector customization', 'template', true, ARRAY['grants', 'application', 'funding'], '{"format": "docx", "sections": 12}'),
('p7-template-005', 'c66ab6f8-75a8-446e-9a90-cf9dc183782d', 'Government Liaison Communication Templates', 'Email and letter templates for professional government department communication', 'template', true, ARRAY['communication', 'government', 'liaison'], '{"format": "docx", "templates": 20}'),

-- Module 3: State Department Navigation Templates
('p7-template-006', 'c66ab6f8-75a8-446e-9a90-cf9dc183782d', 'State Compliance Checklist Template', 'State-specific compliance requirements checklist with deadlines and procedures', 'template', true, ARRAY['compliance', 'checklist', 'regulatory'], '{"format": "xlsx", "states": 28}'),
('p7-template-007', '50a465ba-120f-48d4-b4b0-993ebf86c281', 'State Policy Analysis Framework', 'Template to analyze and compare state startup policies across different parameters', 'template', true, ARRAY['policy', 'analysis', 'comparison'], '{"format": "xlsx", "criteria": 50}'),

-- Module 4: State Startup Policy Templates
('p7-template-008', '50a465ba-120f-48d4-b4b0-993ebf86c281', 'State Benefit Calculator Template', 'Calculate and compare financial benefits across different states for your sector', 'template', true, ARRAY['calculator', 'benefits', 'financial'], '{"format": "xlsx", "calculations": 30}'),
('p7-template-009', '2c7eceda-6d97-4c54-b5ad-c9ccb6f5c61a', 'Competition Submission Template', 'Professional template for state-level startup competitions and pitch decks', 'template', true, ARRAY['competition', 'pitch', 'presentation'], '{"format": "pptx", "slides": 25}'),

-- Module 5: State Competitions Templates
('p7-template-010', '2c7eceda-6d97-4c54-b5ad-c9ccb6f5c61a', 'State Challenge Response Template', 'Template for responding to state innovation challenges and problem statements', 'template', true, ARRAY['challenge', 'innovation', 'response'], '{"format": "docx", "sections": 8}'),
('p7-template-011', '682370fe-df70-48fa-a4c0-8c7a305be750', 'Industrial Plot Application Template', 'Template for applying to state industrial parks and SEZ allocations', 'template', true, ARRAY['industrial', 'plot', 'application'], '{"format": "pdf", "forms": 15}'),

-- Module 6: Industrial Infrastructure Templates
('p7-template-012', '0a25a9d7-4604-4233-a012-590a6b12a7ff', 'University Collaboration Agreement Template', 'MOU template for R&D collaborations with state universities', 'template', true, ARRAY['university', 'collaboration', 'research'], '{"format": "docx", "terms": 20}'),
('p7-template-013', '1f8dcd00-3896-419a-b245-11fa5cdf50ed', 'Government Procurement Proposal Template', 'Template for responding to state government tenders and procurement', 'template', true, ARRAY['procurement', 'tender', 'proposal'], '{"format": "docx", "sections": 12}'),

-- Module 7: Research Ecosystem Templates
('p7-template-014', '0d95c639-374f-4d3a-850f-ee6ba0541f6b', 'District Collector Meeting Template', 'Agenda and presentation template for meetings with district administration', 'template', true, ARRAY['district', 'meeting', 'administration'], '{"format": "pptx", "agenda": 10}'),
('p7-template-015', '9d589697-cfad-4ae8-82d4-6ce4d274a522', 'Multi-State Expansion Plan Template', 'Strategic template for scaling operations across multiple states', 'template', true, ARRAY['expansion', 'strategy', 'multi-state'], '{"format": "xlsx", "phases": 5}');

-- P7: Interactive Resources (7 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

('p7-tool-001', '9222f3bc-6909-4f33-80f5-f52754c7e400', 'State Selection Decision Engine', 'Interactive tool to input your business parameters and get optimal state recommendations', 'interactive_tool', false, ARRAY['decision-engine', 'state-selection', 'calculator'], '{"type": "web_app", "inputs": 25}'),
('p7-tool-002', '30819b66-9d9c-4cc1-ae5e-5b93105860ca', 'State Grant Eligibility Checker', 'Real-time tool to check eligibility for grants across all 28 states based on your profile', 'interactive_tool', false, ARRAY['eligibility', 'grants', 'checker'], '{"type": "web_app", "grants_count": 500}'),
('p7-tool-003', 'c66ab6f8-75a8-446e-9a90-cf9dc183782d', 'Government Contact Directory', 'Searchable directory of key government contacts across all states with direct phone/email', 'interactive_tool', false, ARRAY['contacts', 'directory', 'government'], '{"type": "database", "contacts": 1000}'),
('p7-tool-004', '50a465ba-120f-48d4-b4b0-993ebf86c281', 'Policy Comparison Dashboard', 'Interactive dashboard to compare startup policies across states with visual charts', 'dashboard', false, ARRAY['comparison', 'policy', 'dashboard'], '{"type": "dashboard", "metrics": 40}'),
('p7-tool-005', '2c7eceda-6d97-4c54-b5ad-c9ccb6f5c61a', 'Competition Calendar & Tracker', 'Live calendar of all state competitions with deadline alerts and submission tracking', 'interactive_tool', false, ARRAY['calendar', 'competitions', 'tracker'], '{"type": "calendar", "competitions": 200}'),
('p7-tool-006', '682370fe-df70-48fa-a4c0-8c7a305be750', 'Industrial Infrastructure Finder', 'Map-based tool to find and compare industrial plots, SEZs, and facilities across states', 'interactive_tool', false, ARRAY['infrastructure', 'finder', 'map'], '{"type": "map_tool", "facilities": 500}'),
('p7-tool-007', '9d589697-cfad-4ae8-82d4-6ce4d274a522', 'ROI Calculator by State', 'Calculate expected ROI and cost savings by choosing different states for your business', 'interactive_tool', false, ARRAY['roi', 'calculator', 'financial'], '{"type": "calculator", "variables": 20}');

-- P9: Government Schemes & Funding Resources
-- Templates (12 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

-- Module 1: Government Funding Universe Templates
('p9-template-001', 'cc43bca8-7c29-43ec-8046-60095697cd8f', 'Government Funding Master Database Template', 'Comprehensive database template to track 500+ government schemes with eligibility criteria', 'template', true, ARRAY['database', 'funding', 'schemes'], '{"format": "xlsx", "schemes": 500}'),
('p9-template-002', 'cc43bca8-7c29-43ec-8046-60095697cd8f', 'Scheme Eligibility Assessment Template', 'Self-assessment template to determine eligibility for various government schemes', 'template', true, ARRAY['assessment', 'eligibility', 'self-check'], '{"format": "xlsx", "criteria": 100}'),
('p9-template-003', 'cc43bca8-7c29-43ec-8046-60095697cd8f', 'Grant Application Timeline Template', 'Project timeline template for managing multiple grant applications simultaneously', 'template', true, ARRAY['timeline', 'project', 'grants'], '{"format": "xlsx", "milestones": 50}'),

-- Module 2: Strategic Government Relationships Templates
('p9-template-004', '18e0ca57-aaa1-4b9e-9433-f2dbdeba8608', 'Government Stakeholder Mapping Template', 'Template to map and track relationships with key government stakeholders', 'template', true, ARRAY['stakeholder', 'mapping', 'relationships'], '{"format": "xlsx", "stakeholders": 200}'),
('p9-template-005', '18e0ca57-aaa1-4b9e-9433-f2dbdeba8608', 'Official Meeting Request Template', 'Professional templates for requesting meetings with government officials', 'template', true, ARRAY['meeting', 'request', 'official'], '{"format": "docx", "templates": 15}'),
('p9-template-006', '18e0ca57-aaa1-4b9e-9433-f2dbdeba8608', 'Government Presentation Template', 'Professional presentation template for government meetings and scheme presentations', 'template', true, ARRAY['presentation', 'government', 'official'], '{"format": "pptx", "slides": 30}'),

-- Module 3: Application Mastery Templates
('p9-template-007', '7cc48ca3-b9b1-4fca-aeef-e9d197b7d583', 'Universal Grant Application Template', 'Master template adaptable for any government grant application', 'template', true, ARRAY['application', 'universal', 'grant'], '{"format": "docx", "sections": 20}'),
('p9-template-008', '7cc48ca3-b9b1-4fca-aeef-e9d197b7d583', 'Financial Projections for Government Grants', 'Specialized financial template for government grant applications with required formats', 'template', true, ARRAY['financial', 'projections', 'government'], '{"format": "xlsx", "years": 5}'),
('p9-template-009', '7cc48ca3-b9b1-4fca-aeef-e9d197b7d583', 'Supporting Documents Checklist Template', 'Comprehensive checklist of all documents needed for various government schemes', 'template', true, ARRAY['checklist', 'documents', 'compliance'], '{"format": "xlsx", "documents": 100}'),

-- Module 4: Execution & Compliance Templates
('p9-template-010', '56766557-0fb9-41e2-a0d4-5028f72b48b3', 'Grant Utilization Tracking Template', 'Template to track and report grant fund utilization as per government requirements', 'template', true, ARRAY['tracking', 'utilization', 'reporting'], '{"format": "xlsx", "categories": 25}'),
('p9-template-011', '56766557-0fb9-41e2-a0d4-5028f72b48b3', 'Government Compliance Calendar Template', 'Calendar template for all government compliance requirements and deadlines', 'template', true, ARRAY['compliance', 'calendar', 'deadlines'], '{"format": "xlsx", "months": 12}'),
('p9-template-012', '56766557-0fb9-41e2-a0d4-5028f72b48b3', 'Progress Reporting Template', 'Standardized template for periodic progress reports to government agencies', 'template', true, ARRAY['reporting', 'progress', 'periodic'], '{"format": "docx", "formats": 10}');

-- P9: Interactive Resources (6 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

('p9-tool-001', 'cc43bca8-7c29-43ec-8046-60095697cd8f', 'Government Scheme Matcher', 'AI-powered tool to match your startup profile with relevant government schemes', 'interactive_tool', false, ARRAY['matcher', 'ai', 'schemes'], '{"type": "ai_tool", "schemes": 500}'),
('p9-tool-002', 'cc43bca8-7c29-43ec-8046-60095697cd8f', 'Funding Calendar Dashboard', 'Live dashboard showing all government funding deadlines and application windows', 'dashboard', false, ARRAY['calendar', 'funding', 'deadlines'], '{"type": "dashboard", "schemes": 300}'),
('p9-tool-003', '18e0ca57-aaa1-4b9e-9433-f2dbdeba8608', 'Government Contact Database', 'Searchable database of government officials and department contacts', 'interactive_tool', false, ARRAY['database', 'contacts', 'government'], '{"type": "database", "contacts": 800}'),
('p9-tool-004', '7cc48ca3-b9b1-4fca-aeef-e9d197b7d583', 'Application Success Predictor', 'Tool to assess your application strength and success probability', 'interactive_tool', false, ARRAY['predictor', 'success', 'assessment'], '{"type": "assessment", "factors": 30}'),
('p9-tool-005', '7cc48ca3-b9b1-4fca-aeef-e9d197b7d583', 'Document Verification Checklist', 'Interactive checklist to ensure all required documents are complete', 'interactive_tool', false, ARRAY['verification', 'checklist', 'documents'], '{"type": "checklist", "items": 150}'),
('p9-tool-006', '56766557-0fb9-41e2-a0d4-5028f72b48b3', 'Compliance Tracker', 'Automated tool to track all compliance requirements and send deadline alerts', 'interactive_tool', false, ARRAY['compliance', 'tracker', 'alerts'], '{"type": "tracker", "requirements": 100}');

-- P10: Patent Mastery Resources
-- Templates (15 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

-- Module 1: Patents Basics Templates
('p10-template-001', 'p10-m1-beginners', 'Patent Landscape Analysis Template', 'Template to analyze existing patents in your field and identify white spaces', 'template', true, ARRAY['analysis', 'landscape', 'research'], '{"format": "xlsx", "fields": 20}'),
('p10-template-002', 'p10-m1-beginners', 'Invention Disclosure Form Template', 'Standardized form to document inventions with all required technical details', 'template', true, ARRAY['disclosure', 'invention', 'documentation'], '{"format": "docx", "sections": 15}'),

-- Module 2: Preparation Templates
('p10-template-003', 'p10-m2-preparation', 'Prior Art Search Template', 'Comprehensive template for conducting thorough prior art searches', 'template', true, ARRAY['prior-art', 'search', 'research'], '{"format": "xlsx", "databases": 25}'),
('p10-template-004', 'p10-m2-preparation', 'Patentability Assessment Template', 'Template to assess the patentability of inventions across multiple criteria', 'template', true, ARRAY['assessment', 'patentability', 'evaluation'], '{"format": "xlsx", "criteria": 30}'),

-- Module 3: Filing in India Templates
('p10-template-005', 'p10-m3-filing-india', 'Indian Patent Application Template', 'Complete template for filing patent applications in India with forms and guides', 'template', true, ARRAY['application', 'india', 'filing'], '{"format": "docx", "forms": 10}'),
('p10-template-006', 'p10-m3-filing-india', 'Patent Specification Writing Template', 'Professional template for writing patent specifications with examples', 'template', true, ARRAY['specification', 'writing', 'technical'], '{"format": "docx", "examples": 20}'),

-- Module 4: Advanced Drafting Templates
('p10-template-007', 'p10-m4-advanced-drafting', 'Claims Drafting Master Template', 'Advanced template for drafting strong patent claims with multiple strategies', 'template', true, ARRAY['claims', 'drafting', 'strategy'], '{"format": "docx", "strategies": 15}'),
('p10-template-008', 'p10-m5-international', 'PCT Application Template', 'Template for international patent applications under Patent Cooperation Treaty', 'template', true, ARRAY['pct', 'international', 'application'], '{"format": "docx", "countries": 50}'),

-- Module 5: International Strategy Templates
('p10-template-009', 'p10-m5-international', 'International Filing Strategy Template', 'Strategic template for planning international patent filings and timelines', 'template', true, ARRAY['international', 'strategy', 'planning'], '{"format": "xlsx", "countries": 30}'),
('p10-template-010', 'p10-m6-prosecution', 'Office Action Response Template', 'Template for responding to patent office objections and office actions', 'template', true, ARRAY['response', 'office-action', 'prosecution'], '{"format": "docx", "responses": 25}'),

-- Module 6-12: Portfolio, Monetization, etc Templates
('p10-template-011', 'p10-m7-portfolio', 'Patent Portfolio Management Template', 'Comprehensive template for managing and tracking patent portfolios', 'template', true, ARRAY['portfolio', 'management', 'tracking'], '{"format": "xlsx", "patents": 100}'),
('p10-template-012', 'p10-m8-monetization', 'Patent Licensing Agreement Template', 'Legal template for licensing patents with various licensing models', 'template', true, ARRAY['licensing', 'agreement', 'monetization'], '{"format": "docx", "models": 10}'),
('p10-template-013', 'p10-m9-litigation', 'Patent Infringement Analysis Template', 'Template for analyzing potential patent infringement cases', 'template', true, ARRAY['infringement', 'analysis', 'litigation'], '{"format": "xlsx", "analysis": 20}'),
('p10-template-014', 'p10-m11-government-support', 'Government Patent Grant Application Template', 'Template for applying to government patent funding and support schemes', 'template', true, ARRAY['government', 'grants', 'funding'], '{"format": "docx", "schemes": 15}'),
('p10-template-015', 'p10-m12-ip-business', 'IP-Driven Business Plan Template', 'Business plan template specifically for IP-based startups and companies', 'template', true, ARRAY['business-plan', 'ip-driven', 'strategy'], '{"format": "docx", "sections": 20}');

-- P10: Interactive Resources (8 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

('p10-tool-001', 'p10-m1-beginners', 'Patent Search Engine', 'Advanced patent search tool with filters for Indian and international patents', 'interactive_tool', false, ARRAY['search', 'patents', 'database'], '{"type": "search_engine", "patents": 50000000}'),
('p10-tool-002', 'p10-m2-preparation', 'Patentability Checker', 'AI-powered tool to assess the patentability of your invention', 'interactive_tool', false, ARRAY['assessment', 'ai', 'patentability'], '{"type": "ai_tool", "accuracy": 85}'),
('p10-tool-003', 'p10-m3-filing-india', 'Patent Cost Calculator', 'Calculate total costs for patent filing in India and internationally', 'interactive_tool', false, ARRAY['calculator', 'costs', 'filing'], '{"type": "calculator", "countries": 100}'),
('p10-tool-004', 'p10-m5-international', 'International Filing Timeline Tool', 'Interactive tool to plan and track international patent filing deadlines', 'interactive_tool', false, ARRAY['timeline', 'international', 'deadlines'], '{"type": "timeline", "countries": 50}'),
('p10-tool-005', 'p10-m7-portfolio', 'Portfolio Value Calculator', 'Calculate the commercial value of your patent portfolio', 'interactive_tool', false, ARRAY['valuation', 'portfolio', 'calculator'], '{"type": "calculator", "methods": 5}'),
('p10-tool-006', 'p10-m8-monetization', 'Licensing Revenue Projector', 'Project potential licensing revenues from your patents', 'interactive_tool', false, ARRAY['revenue', 'licensing', 'projections'], '{"type": "projector", "scenarios": 10}'),
('p10-tool-007', 'p10-m10-industry-specific', 'Industry Patent Landscape Analyzer', 'Analyze patent landscapes for specific industries and sectors', 'interactive_tool', false, ARRAY['industry', 'landscape', 'analysis'], '{"type": "analyzer", "industries": 25}'),
('p10-tool-008', 'p10-m12-ip-business', 'IP Strategy Planner', 'Comprehensive tool to plan IP strategy for business growth', 'interactive_tool', false, ARRAY['strategy', 'planning', 'ip'], '{"type": "planner", "strategies": 20}');

-- P11: Branding & PR Resources
-- Templates (18 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

-- Module 1: Brand DNA Templates
('p11-template-001', '58302815-1888-44ee-b98d-507e45f22fd0', 'Brand Strategy Master Template', 'Comprehensive brand strategy template with positioning, messaging, and guidelines', 'template', true, ARRAY['strategy', 'brand', 'positioning'], '{"format": "pptx", "slides": 40}'),
('p11-template-002', '58302815-1888-44ee-b98d-507e45f22fd0', 'Brand Identity Guidelines Template', 'Complete brand identity manual template with logo usage, colors, and typography', 'template', true, ARRAY['identity', 'guidelines', 'manual'], '{"format": "pdf", "pages": 50}'),
('p11-template-003', '58302815-1888-44ee-b98d-507e45f22fd0', 'Brand Messaging Framework Template', 'Template for creating consistent brand messaging across all touchpoints', 'template', true, ARRAY['messaging', 'framework', 'communication'], '{"format": "docx", "frameworks": 10}'),

-- Module 2: Customer Experience Templates
('p11-template-004', 'dfa9e139-6345-4019-97e9-f47b10c2804f', 'Customer Journey Mapping Template', 'Template to map and optimize customer experiences across all brand touchpoints', 'template', true, ARRAY['journey', 'customer', 'experience'], '{"format": "xlsx", "touchpoints": 50}'),
('p11-template-005', 'dfa9e139-6345-4019-97e9-f47b10c2804f', 'Brand Experience Audit Template', 'Comprehensive audit template for evaluating brand consistency across channels', 'template', true, ARRAY['audit', 'experience', 'consistency'], '{"format": "xlsx", "channels": 25}'),

-- Module 3: Digital Brand Templates
('p11-template-006', '381bf454-c75a-4ef8-96c7-db4268ac713a', 'Social Media Brand Template Kit', 'Complete template kit for maintaining brand consistency across social platforms', 'template', true, ARRAY['social-media', 'templates', 'digital'], '{"format": "psd", "templates": 30}'),
('p11-template-007', '381bf454-c75a-4ef8-96c7-db4268ac713a', 'Content Calendar Master Template', 'Strategic content calendar template for consistent brand storytelling', 'template', true, ARRAY['content', 'calendar', 'planning'], '{"format": "xlsx", "months": 12}'),

-- Module 4: Media Relations Templates
('p11-template-008', 'b18d27bf-700b-4e8f-bc8e-55ecaa43d74f', 'Press Release Template Collection', 'Professional press release templates for various announcement types', 'template', true, ARRAY['press-release', 'media', 'announcements'], '{"format": "docx", "types": 20}'),
('p11-template-009', 'b18d27bf-700b-4e8f-bc8e-55ecaa43d74f', 'Media Kit Template', 'Comprehensive media kit template with company info, images, and key messages', 'template', true, ARRAY['media-kit', 'press', 'company'], '{"format": "pdf", "sections": 15}'),
('p11-template-010', 'a700f6ec-adf5-4f31-bde7-0a796390ff8a', 'Journalist Pitch Templates', 'Effective pitch templates for different types of media outreach', 'template', true, ARRAY['pitch', 'journalist', 'outreach'], '{"format": "docx", "templates": 15}'),

-- Module 5: Awards & Recognition Templates
('p11-template-011', '4b4469ad-2457-48d5-9175-e9643806c189', 'Award Application Master Template', 'Universal template for applying to business and industry awards', 'template', true, ARRAY['awards', 'application', 'recognition'], '{"format": "docx", "categories": 25}'),
('p11-template-012', '4b4469ad-2457-48d5-9175-e9643806c189', 'Thought Leadership Content Template', 'Template for creating thought leadership articles and content', 'template', true, ARRAY['thought-leadership', 'content', 'articles'], '{"format": "docx", "formats": 10}'),

-- Module 6: Crisis Management Templates
('p11-template-013', '29ca3744-630b-4ced-891b-490a1abe6af3', 'Crisis Communication Plan Template', 'Comprehensive crisis communication plan with response procedures', 'template', true, ARRAY['crisis', 'communication', 'plan'], '{"format": "docx", "scenarios": 15}'),
('p11-template-014', '29ca3744-630b-4ced-891b-490a1abe6af3', 'Crisis Response Message Templates', 'Pre-written response templates for various crisis scenarios', 'template', true, ARRAY['crisis', 'response', 'messages'], '{"format": "docx", "scenarios": 20}'),

-- Module 7-12: Agency, Founder Brand, etc Templates
('p11-template-015', 'e3327c8b-0b6e-42c4-909a-fa5b5e263be1', 'PR Agency Brief Template', 'Template for briefing PR agencies with clear objectives and expectations', 'template', true, ARRAY['agency', 'brief', 'pr'], '{"format": "docx", "sections": 12}'),
('p11-template-016', '49dfd094-6a59-4469-b628-af37fe11aff2', 'Founder Personal Brand Template', 'Template for building and managing founder personal brand across platforms', 'template', true, ARRAY['founder', 'personal-brand', 'leadership'], '{"format": "pptx", "platforms": 15}'),
('p11-template-017', 'aad1ba1e-1d4e-4368-b64f-e202e8e686eb', 'Event PR Template Kit', 'Templates for maximizing PR impact from events and activations', 'template', true, ARRAY['event', 'pr', 'activation'], '{"format": "docx", "events": 20}'),
('p11-template-018', 'efc3d45a-1fd3-4974-9232-404a436bde45', 'Investor Communication Template', 'Template for regular investor updates and financial communications', 'template', true, ARRAY['investor', 'communication', 'updates'], '{"format": "docx", "formats": 10}');

-- P11: Interactive Resources (8 total)
INSERT INTO "Resource" (id, "moduleId", title, description, type, "isDownloadable", tags, metadata) VALUES

('p11-tool-001', '58302815-1888-44ee-b98d-507e45f22fd0', 'Brand Health Monitor', 'Track brand mentions, sentiment, and reputation across digital channels', 'dashboard', false, ARRAY['monitoring', 'brand', 'sentiment'], '{"type": "dashboard", "sources": 100}'),
('p11-tool-002', 'dfa9e139-6345-4019-97e9-f47b10c2804f', 'Customer Experience Scorecard', 'Interactive tool to measure and improve customer experience touchpoints', 'interactive_tool', false, ARRAY['scorecard', 'experience', 'measurement'], '{"type": "scorecard", "metrics": 25}'),
('p11-tool-003', '381bf454-c75a-4ef8-96c7-db4268ac713a', 'Social Media Performance Tracker', 'Comprehensive tool to track brand performance across all social platforms', 'dashboard', false, ARRAY['social-media', 'performance', 'analytics'], '{"type": "dashboard", "platforms": 15}'),
('p11-tool-004', 'b18d27bf-700b-4e8f-bc8e-55ecaa43d74f', 'Media Contact Database', 'Searchable database of journalists and media contacts across India', 'interactive_tool', false, ARRAY['media', 'contacts', 'database'], '{"type": "database", "contacts": 2000}'),
('p11-tool-005', 'a700f6ec-adf5-4f31-bde7-0a796390ff8a', 'Press Coverage Analytics', 'Analyze and measure the impact of your press coverage and media mentions', 'interactive_tool', false, ARRAY['analytics', 'coverage', 'impact'], '{"type": "analytics", "metrics": 20}'),
('p11-tool-006', '4b4469ad-2457-48d5-9175-e9643806c189', 'Award Opportunity Finder', 'Find relevant awards and recognition opportunities for your industry and stage', 'interactive_tool', false, ARRAY['awards', 'finder', 'opportunities'], '{"type": "finder", "awards": 500}'),
('p11-tool-007', '49dfd094-6a59-4469-b628-af37fe11aff2', 'Founder Brand Audit Tool', 'Assess and optimize your founder personal brand across digital platforms', 'interactive_tool', false, ARRAY['founder', 'audit', 'personal-brand'], '{"type": "audit", "platforms": 20}'),
('p11-tool-008', '4e7ad7dd-e89f-4999-bdc2-717fc42f46b1', 'Global Brand Expansion Planner', 'Plan and execute brand expansion strategies for international markets', 'interactive_tool', false, ARRAY['expansion', 'global', 'planning'], '{"type": "planner", "markets": 50}');

-- Update timestamps
UPDATE "Resource" SET "createdAt" = NOW(), "updatedAt" = NOW() 
WHERE id LIKE 'p7-%' OR id LIKE 'p9-%' OR id LIKE 'p10-%' OR id LIKE 'p11-%';