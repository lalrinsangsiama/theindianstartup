-- P8: Data Room Mastery - Complete Enhancement Part 3
-- Adding final lessons for Modules 6-8 to complete 45+ lesson program

DO $$ 
DECLARE
    p8_id TEXT;
    mod6_id TEXT; -- Customer & Revenue Excellence
    mod7_id TEXT; -- Due Diligence Preparation Mastery
    mod8_id TEXT; -- Advanced Topics & Crisis Management
BEGIN
    -- Get P8 product and module IDs
    SELECT id INTO p8_id FROM "Product" WHERE code = 'P8';
    SELECT id INTO mod6_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 6;
    SELECT id INTO mod7_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 7;
    SELECT id INTO mod8_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 8;

    -- MODULE 6: Customer & Revenue Excellence (lessons 24, 36-41)
    UPDATE "Lesson" SET 
        "briefContent" = 'Master comprehensive customer analytics that demonstrate product-market fit and revenue quality. Build customer analytics frameworks, implement advanced tracking systems, and create validation documentation that proves market opportunity and customer satisfaction.',
        "actionItems" = '[
            {"title": "Customer Analytics Implementation", "deliverable": "Comprehensive customer analytics dashboard", "description": "Implement advanced customer analytics with cohort analysis, churn prediction, and satisfaction tracking", "timeRequired": "150 mins"},
            {"title": "Product-Market Fit Validation", "deliverable": "PMF validation documentation and metrics", "description": "Document product-market fit using multiple validation methodologies and metrics", "timeRequired": "120 mins"},
            {"title": "Customer Success Documentation", "deliverable": "Customer success stories and case studies", "description": "Create detailed customer success stories with quantified business impact", "timeRequired": "90 mins"}
        ]'::jsonb,
        "resources" = '[
            {"type": "tool", "title": "Advanced Customer Analytics Suite", "description": "Professional tools for customer behavior analysis and tracking"},
            {"type": "framework", "title": "Product-Market Fit Validation Framework", "description": "Comprehensive framework for validating and documenting PMF"},
            {"type": "template", "title": "Customer Success Story Templates", "description": "Professional templates for customer success documentation"}
        ]'::jsonb
    WHERE "moduleId" = mod6_id AND day = 23;

    INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex") VALUES
    (mod6_id, 36, 'Revenue Quality & Predictability Excellence',
     'Document revenue quality metrics that demonstrate sustainable and predictable business model. Master revenue analytics, create predictability frameworks, and build investor-grade revenue documentation.',
     '[
         {"title": "Revenue Quality Analysis", "deliverable": "Comprehensive revenue quality assessment", "description": "Analyze revenue streams for quality, predictability, and sustainability", "timeRequired": "120 mins"},
         {"title": "Revenue Predictability Framework", "deliverable": "Revenue forecasting and predictability system", "description": "Build system for accurate revenue forecasting and trend analysis", "timeRequired": "90 mins"},
         {"title": "Revenue Analytics Dashboard", "deliverable": "Real-time revenue analytics and insights", "description": "Create dashboard for monitoring revenue quality and trends", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Revenue Quality Framework", "description": "Framework for assessing and documenting revenue quality"},
         {"type": "tool", "title": "Revenue Analytics Suite", "description": "Advanced tools for revenue analysis and forecasting"},
         {"type": "template", "title": "Revenue Documentation Templates", "description": "Templates for revenue quality documentation"}
     ]'::jsonb,
     75, 100, 2),

    (mod6_id, 37, 'Customer Acquisition Cost Optimization',
     'Master customer acquisition cost analysis and optimization that demonstrates efficient growth. Build CAC frameworks, implement optimization systems, and document scalable acquisition strategies.',
     '[
         {"title": "CAC Analysis and Optimization", "deliverable": "Comprehensive CAC analysis and optimization plan", "description": "Analyze customer acquisition costs across all channels and optimize for efficiency", "timeRequired": "120 mins"},
         {"title": "Channel Performance Documentation", "deliverable": "Marketing channel performance analysis", "description": "Document performance and ROI of all customer acquisition channels", "timeRequired": "90 mins"},
         {"title": "Scalable Acquisition Strategy", "deliverable": "Scalable customer acquisition framework", "description": "Create strategy for scaling customer acquisition efficiently", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "CAC Optimization Framework", "description": "Framework for customer acquisition cost optimization"},
         {"type": "tool", "title": "CAC Analysis Tool", "description": "Tool for analyzing and optimizing customer acquisition costs"},
         {"type": "template", "title": "Acquisition Strategy Templates", "description": "Templates for customer acquisition strategy documentation"}
     ]'::jsonb,
     75, 100, 3),

    (mod6_id, 38, 'Customer Lifetime Value Maximization',
     'Build comprehensive customer lifetime value frameworks that demonstrate long-term revenue potential. Master LTV calculation, create value maximization strategies, and document customer value optimization.',
     '[
         {"title": "LTV Calculation and Analysis", "deliverable": "Comprehensive LTV calculation and analysis", "description": "Calculate customer lifetime value using multiple methodologies and scenarios", "timeRequired": "120 mins"},
         {"title": "Value Maximization Strategy", "deliverable": "Customer value maximization plan", "description": "Create strategy for maximizing customer lifetime value through retention and expansion", "timeRequired": "90 mins"},
         {"title": "Customer Journey Optimization", "deliverable": "Optimized customer journey and touchpoints", "description": "Optimize customer journey for maximum value creation and retention", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "LTV Maximization Framework", "description": "Framework for customer lifetime value optimization"},
         {"type": "tool", "title": "LTV Calculator Suite", "description": "Advanced tools for LTV calculation and optimization"},
         {"type": "template", "title": "Customer Journey Templates", "description": "Templates for customer journey optimization"}
     ]'::jsonb,
     75, 100, 4),

    (mod6_id, 39, 'Customer Retention & Churn Prevention',
     'Master customer retention strategies and churn prevention that demonstrate sustainable growth. Build retention frameworks, implement prevention systems, and document customer success processes.',
     '[
         {"title": "Churn Analysis and Prevention", "deliverable": "Comprehensive churn analysis and prevention system", "description": "Analyze churn patterns and implement predictive churn prevention", "timeRequired": "120 mins"},
         {"title": "Retention Strategy Implementation", "deliverable": "Customer retention strategy and programs", "description": "Implement retention programs and strategies for different customer segments", "timeRequired": "90 mins"},
         {"title": "Customer Success Framework", "deliverable": "Systematic customer success processes", "description": "Build customer success framework to ensure customer achievement and satisfaction", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Customer Retention Framework", "description": "Framework for customer retention and churn prevention"},
         {"type": "tool", "title": "Churn Prediction Tool", "description": "Tool for predicting and preventing customer churn"},
         {"type": "template", "title": "Customer Success Templates", "description": "Templates for customer success processes"}
     ]'::jsonb,
     75, 100, 5),

    (mod6_id, 40, 'Market Expansion & Growth Strategy',
     'Document market expansion strategies that demonstrate scalable growth potential. Master expansion frameworks, create growth documentation, and build scalable market entry strategies.',
     '[
         {"title": "Market Expansion Analysis", "deliverable": "Comprehensive market expansion strategy", "description": "Analyze and document strategy for expanding into new markets and segments", "timeRequired": "150 mins"},
         {"title": "Geographic Expansion Planning", "deliverable": "Geographic expansion roadmap", "description": "Create detailed plan for geographic market expansion", "timeRequired": "120 mins"},
         {"title": "Growth Strategy Documentation", "deliverable": "Scalable growth strategy framework", "description": "Document comprehensive strategy for sustainable business growth", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Market Expansion Framework", "description": "Framework for market expansion and growth strategy"},
         {"type": "tool", "title": "Market Analysis Tool", "description": "Tool for market analysis and expansion planning"},
         {"type": "template", "title": "Growth Strategy Templates", "description": "Templates for growth strategy documentation"}
     ]'::jsonb,
     75, 100, 6),

    (mod6_id, 41, 'Competitive Advantage & Moat Documentation',
     'Document competitive advantages and defensive moats that demonstrate sustainable market position. Master competitive analysis, create moat documentation, and build sustainable advantage frameworks.',
     '[
         {"title": "Competitive Advantage Analysis", "deliverable": "Comprehensive competitive advantage documentation", "description": "Analyze and document all sources of competitive advantage", "timeRequired": "120 mins"},
         {"title": "Defensive Moat Strategy", "deliverable": "Sustainable competitive moat framework", "description": "Create strategy for building and maintaining defensive business moats", "timeRequired": "90 mins"},
         {"title": "Market Position Documentation", "deliverable": "Market positioning and differentiation strategy", "description": "Document market positioning and differentiation strategies", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Competitive Advantage Framework", "description": "Framework for competitive advantage analysis"},
         {"type": "tool", "title": "Competitive Analysis Tool", "description": "Tool for competitive analysis and positioning"},
         {"type": "template", "title": "Market Position Templates", "description": "Templates for market positioning documentation"}
     ]'::jsonb,
     75, 100, 7);

    -- MODULE 7: Due Diligence Preparation Mastery (lessons 27-34, 43-44)
    UPDATE "Lesson" SET 
        "briefContent" = 'Master comprehensive due diligence preparation with advanced Q&A frameworks, red flag remediation strategies, and negotiation tactics. Build systems that anticipate investor questions, address concerns proactively, and accelerate the due diligence process by 50%.',
        "actionItems" = '[
            {"title": "Comprehensive Q&A Database", "deliverable": "Complete due diligence Q&A database with 500+ questions", "description": "Build comprehensive database of potential due diligence questions with detailed answers", "timeRequired": "180 mins"},
            {"title": "Red Flag Remediation Strategy", "deliverable": "Red flag identification and remediation plan", "description": "Identify potential red flags and create remediation strategies for each", "timeRequired": "120 mins"},
            {"title": "Negotiation Preparation Framework", "deliverable": "Investment negotiation preparation and strategy", "description": "Prepare comprehensive negotiation strategy and tactics for investment discussions", "timeRequired": "90 mins"}
        ]'::jsonb,
        "resources" = '[
            {"type": "tool", "title": "Due Diligence Q&A Generator", "description": "AI-powered tool for generating and managing due diligence questions"},
            {"type": "framework", "title": "Red Flag Remediation Framework", "description": "Systematic framework for identifying and fixing potential issues"},
            {"type": "template", "title": "Negotiation Strategy Templates", "description": "Professional templates for investment negotiation preparation"}
        ]'::jsonb
    WHERE "moduleId" = mod7_id AND day = 26;

    INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex") VALUES
    (mod7_id, 27, 'Legal Due Diligence Excellence',
     'Master legal due diligence preparation that demonstrates corporate governance excellence. Prepare legal documentation, address compliance issues, and create legal frameworks that accelerate due diligence.',
     '[
         {"title": "Legal Documentation Audit", "deliverable": "Complete legal due diligence package", "description": "Audit and organize all legal documents for due diligence review", "timeRequired": "150 mins"},
         {"title": "Compliance Gap Analysis", "deliverable": "Compliance gap analysis and remediation plan", "description": "Identify and address any compliance gaps or legal issues", "timeRequired": "120 mins"},
         {"title": "Legal Risk Assessment", "deliverable": "Legal risk analysis and mitigation strategy", "description": "Assess legal risks and create mitigation strategies", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Legal Due Diligence Framework", "description": "Framework for legal due diligence preparation"},
         {"type": "template", "title": "Legal Audit Templates", "description": "Templates for legal documentation audit"},
         {"type": "tool", "title": "Compliance Tracker", "description": "Tool for tracking legal compliance status"}
     ]'::jsonb,
     90, 100, 2),

    (mod7_id, 28, 'Financial Due Diligence Excellence',
     'Master financial due diligence preparation that demonstrates financial integrity and transparency. Prepare financial documentation, address accounting issues, and create financial frameworks that build investor confidence.',
     '[
         {"title": "Financial Documentation Preparation", "deliverable": "Complete financial due diligence package", "description": "Prepare all financial statements, records, and supporting documentation", "timeRequired": "180 mins"},
         {"title": "Accounting Standards Compliance", "deliverable": "Accounting compliance review and certification", "description": "Ensure compliance with applicable accounting standards and practices", "timeRequired": "120 mins"},
         {"title": "Financial Integrity Verification", "deliverable": "Financial integrity verification and documentation", "description": "Verify and document financial integrity and transparency", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Financial Due Diligence Framework", "description": "Framework for financial due diligence preparation"},
         {"type": "template", "title": "Financial Audit Templates", "description": "Templates for financial documentation audit"},
         {"type": "tool", "title": "Financial Integrity Checker", "description": "Tool for verifying financial integrity"}
     ]'::jsonb,
     90, 100, 3),

    (mod7_id, 29, 'Commercial Due Diligence Excellence',
     'Master commercial due diligence preparation that demonstrates market position and business model strength. Prepare market documentation, validate business assumptions, and create commercial frameworks that prove business viability.',
     '[
         {"title": "Market Position Documentation", "deliverable": "Commercial due diligence market package", "description": "Document market position, competitive advantages, and business model validation", "timeRequired": "150 mins"},
         {"title": "Business Model Validation", "deliverable": "Business model validation and documentation", "description": "Validate and document business model assumptions and projections", "timeRequired": "120 mins"},
         {"title": "Commercial Risk Assessment", "deliverable": "Commercial risk analysis and mitigation", "description": "Assess commercial risks and create mitigation strategies", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Commercial Due Diligence Framework", "description": "Framework for commercial due diligence preparation"},
         {"type": "template", "title": "Market Validation Templates", "description": "Templates for market and business model validation"},
         {"type": "tool", "title": "Commercial Risk Analyzer", "description": "Tool for commercial risk assessment"}
     ]'::jsonb,
     90, 100, 4),

    (mod7_id, 30, 'Technical Due Diligence Excellence',
     'Master technical due diligence preparation that demonstrates technology strength and scalability. Prepare technical documentation, address technology risks, and create technical frameworks that prove technical competence.',
     '[
         {"title": "Technical Architecture Documentation", "deliverable": "Complete technical due diligence package", "description": "Document technical architecture, code quality, and development processes", "timeRequired": "180 mins"},
         {"title": "Technology Risk Assessment", "deliverable": "Technology risk analysis and mitigation plan", "description": "Assess technology risks and create comprehensive mitigation strategies", "timeRequired": "120 mins"},
         {"title": "Scalability Validation", "deliverable": "Technology scalability validation and roadmap", "description": "Validate and document technology scalability for future growth", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Technical Due Diligence Framework", "description": "Framework for technical due diligence preparation"},
         {"type": "template", "title": "Technical Documentation Templates", "description": "Templates for technical documentation"},
         {"type": "tool", "title": "Technology Assessment Tool", "description": "Tool for technology assessment and validation"}
     ]'::jsonb,
     90, 100, 5),

    (mod7_id, 31, 'Operational Due Diligence Excellence',
     'Master operational due diligence preparation that demonstrates operational excellence and efficiency. Prepare operational documentation, validate processes, and create operational frameworks that prove execution capability.',
     '[
         {"title": "Operational Process Documentation", "deliverable": "Complete operational due diligence package", "description": "Document all operational processes, systems, and efficiency metrics", "timeRequired": "150 mins"},
         {"title": "Operational Efficiency Validation", "deliverable": "Operational efficiency analysis and validation", "description": "Validate operational efficiency and benchmark against industry standards", "timeRequired": "120 mins"},
         {"title": "Process Optimization Documentation", "deliverable": "Process optimization strategy and implementation", "description": "Document process optimization initiatives and continuous improvement", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Operational Due Diligence Framework", "description": "Framework for operational due diligence preparation"},
         {"type": "template", "title": "Operational Documentation Templates", "description": "Templates for operational process documentation"},
         {"type": "tool", "title": "Operational Efficiency Analyzer", "description": "Tool for operational efficiency analysis"}
     ]'::jsonb,
     90, 100, 6),

    (mod7_id, 32, 'ESG Due Diligence Excellence',
     'Master ESG (Environmental, Social, Governance) due diligence preparation that demonstrates sustainable business practices. Prepare ESG documentation, address sustainability issues, and create ESG frameworks that attract responsible investors.',
     '[
         {"title": "ESG Assessment and Documentation", "deliverable": "Comprehensive ESG due diligence package", "description": "Assess and document environmental, social, and governance practices", "timeRequired": "150 mins"},
         {"title": "Sustainability Strategy Documentation", "deliverable": "Sustainability strategy and implementation plan", "description": "Document sustainability initiatives and long-term environmental commitments", "timeRequired": "120 mins"},
         {"title": "Social Impact Measurement", "deliverable": "Social impact assessment and reporting", "description": "Measure and document social impact and community contributions", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "ESG Excellence Framework", "description": "Framework for ESG assessment and documentation"},
         {"type": "template", "title": "ESG Reporting Templates", "description": "Templates for ESG reporting and documentation"},
         {"type": "tool", "title": "ESG Impact Tracker", "description": "Tool for tracking ESG metrics and impact"}
     ]'::jsonb,
     90, 100, 7),

    (mod7_id, 33, 'Data Room Management Excellence',
     'Master data room management during active due diligence that ensures smooth investor experience. Create management processes, implement tracking systems, and optimize investor engagement throughout due diligence.',
     '[
         {"title": "Data Room Management System", "deliverable": "Complete data room management framework", "description": "Implement system for managing data room during active due diligence", "timeRequired": "120 mins"},
         {"title": "Investor Engagement Optimization", "deliverable": "Investor engagement strategy and tracking", "description": "Optimize investor engagement and track investor activity and interest", "timeRequired": "90 mins"},
         {"title": "Due Diligence Process Acceleration", "deliverable": "Process acceleration strategy and implementation", "description": "Implement strategies to accelerate due diligence timeline", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Data Room Management Framework", "description": "Framework for managing data rooms during due diligence"},
         {"type": "tool", "title": "Investor Engagement Tracker", "description": "Tool for tracking investor engagement and activity"},
         {"type": "template", "title": "Due Diligence Process Templates", "description": "Templates for due diligence process management"}
     ]'::jsonb,
     90, 100, 8),

    (mod7_id, 43, 'Post-Due Diligence Optimization',
     'Master post-due diligence optimization that captures learnings and improves future fundraising. Analyze due diligence feedback, implement improvements, and optimize data room for future rounds.',
     '[
         {"title": "Due Diligence Feedback Analysis", "deliverable": "Due diligence feedback analysis and learnings", "description": "Analyze feedback from due diligence process and capture key learnings", "timeRequired": "90 mins"},
         {"title": "Data Room Optimization", "deliverable": "Optimized data room based on feedback", "description": "Implement improvements based on due diligence feedback and learnings", "timeRequired": "75 mins"},
         {"title": "Future Fundraising Preparation", "deliverable": "Enhanced preparation for future fundraising", "description": "Apply learnings to enhance preparation for future fundraising rounds", "timeRequired": "60 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Post-DD Optimization Framework", "description": "Framework for post-due diligence optimization"},
         {"type": "tool", "title": "Feedback Analysis Tool", "description": "Tool for analyzing due diligence feedback"},
         {"type": "template", "title": "Optimization Planning Templates", "description": "Templates for planning data room optimizations"}
     ]'::jsonb,
     90, 100, 9),

    (mod7_id, 44, 'Investor Relations Excellence',
     'Master investor relations during and after due diligence that builds long-term relationships. Create IR frameworks, implement communication systems, and build investor relationship management that extends beyond fundraising.',
     '[
         {"title": "Investor Relations Framework", "deliverable": "Comprehensive investor relations strategy", "description": "Develop comprehensive investor relations strategy and communication plan", "timeRequired": "120 mins"},
         {"title": "Investor Communication System", "deliverable": "Systematic investor communication processes", "description": "Implement systematic processes for ongoing investor communication", "timeRequired": "90 mins"},
         {"title": "Long-term Relationship Building", "deliverable": "Long-term investor relationship strategy", "description": "Create strategy for building and maintaining long-term investor relationships", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Investor Relations Framework", "description": "Framework for investor relations excellence"},
         {"type": "tool", "title": "Investor Communication Platform", "description": "Platform for managing investor communications"},
         {"type": "template", "title": "IR Communication Templates", "description": "Templates for investor relations communications"}
     ]'::jsonb,
     90, 100, 10);

    RAISE NOTICE 'P8 Course Enhancement Part 3: Added comprehensive content for Modules 6-7';

END $$;