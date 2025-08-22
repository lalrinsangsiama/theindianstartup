-- P8: Data Room Mastery - Complete Enhancement Part 2
-- Adding remaining lessons to reach 45+ total lessons

-- Continue with MODULE 4: Business Operations Excellence (complete remaining lessons)
DO $$ 
DECLARE
    p8_id TEXT;
    mod4_id TEXT; -- Business Operations Excellence
    mod5_id TEXT; -- Team & Human Capital Excellence
    mod6_id TEXT; -- Customer & Revenue Excellence
    mod7_id TEXT; -- Due Diligence Preparation Mastery
    mod8_id TEXT; -- Advanced Topics & Crisis Management
BEGIN
    -- Get P8 product and module IDs
    SELECT id INTO p8_id FROM "Product" WHERE code = 'P8';
    SELECT id INTO mod4_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 4;
    SELECT id INTO mod5_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 5;
    SELECT id INTO mod6_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 6;
    SELECT id INTO mod7_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 7;
    SELECT id INTO mod8_id FROM "Module" WHERE "productId" = p8_id AND "orderIndex" = 8;

    -- MODULE 4: Business Operations Excellence (lessons 17-19, 21-22, 24-25)
    INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex") VALUES
    (mod4_id, 17, 'Supply Chain & Vendor Excellence',
     'Document supply chain resilience and vendor relationships that demonstrate operational stability. Master vendor management systems, supply chain risk assessment, and procurement optimization frameworks.',
     '[
         {"title": "Supply Chain Documentation", "deliverable": "Complete supply chain mapping and documentation", "description": "Document entire supply chain with risk assessment and backup plans", "timeRequired": "120 mins"},
         {"title": "Vendor Relationship Management", "deliverable": "Vendor management system and scorecards", "description": "Implement system for managing and evaluating vendor performance", "timeRequired": "90 mins"},
         {"title": "Procurement Optimization", "deliverable": "Procurement process optimization plan", "description": "Optimize procurement processes for cost and efficiency", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Supply Chain Excellence Framework", "description": "Framework for supply chain management and optimization"},
         {"type": "template", "title": "Vendor Management Templates", "description": "Templates for vendor evaluation and management"},
         {"type": "tool", "title": "Supply Chain Risk Analyzer", "description": "Tool for assessing and managing supply chain risks"}
     ]'::jsonb,
     90, 100, 3),

    (mod4_id, 18, 'Technology Infrastructure Excellence',
     'Document technology infrastructure that demonstrates scalability and security. Master IT architecture documentation, security frameworks, and technology roadmaps that satisfy institutional requirements.',
     '[
         {"title": "IT Architecture Documentation", "deliverable": "Complete IT architecture and security documentation", "description": "Document all technology infrastructure, security measures, and scalability plans", "timeRequired": "150 mins"},
         {"title": "Security Framework Implementation", "deliverable": "Comprehensive cybersecurity framework", "description": "Implement and document cybersecurity measures and compliance", "timeRequired": "120 mins"},
         {"title": "Technology Roadmap", "deliverable": "5-year technology development roadmap", "description": "Create detailed technology roadmap showing scalability planning", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "IT Excellence Framework", "description": "Framework for technology infrastructure documentation"},
         {"type": "template", "title": "Security Documentation Templates", "description": "Templates for cybersecurity documentation"},
         {"type": "tool", "title": "Technology Roadmap Builder", "description": "Tool for creating comprehensive technology roadmaps"}
     ]'::jsonb,
     90, 100, 4),

    (mod4_id, 19, 'Quality Assurance & Testing Excellence',
     'Build quality assurance systems that demonstrate product reliability and customer satisfaction. Master QA documentation, testing frameworks, and continuous improvement systems.',
     '[
         {"title": "QA System Documentation", "deliverable": "Complete QA process and testing documentation", "description": "Document all quality assurance processes and testing methodologies", "timeRequired": "120 mins"},
         {"title": "Testing Framework Implementation", "deliverable": "Comprehensive testing framework", "description": "Implement automated and manual testing frameworks", "timeRequired": "90 mins"},
         {"title": "Quality Metrics Dashboard", "deliverable": "Real-time quality metrics tracking", "description": "Build dashboard for tracking quality metrics and improvements", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Quality Excellence Framework", "description": "Framework for comprehensive quality management"},
         {"type": "template", "title": "QA Documentation Templates", "description": "Templates for quality assurance documentation"},
         {"type": "tool", "title": "Quality Metrics Dashboard", "description": "Dashboard for tracking quality metrics"}
     ]'::jsonb,
     90, 100, 5),

    (mod4_id, 21, 'Business Continuity & Risk Management',
     'Document business continuity planning that demonstrates operational resilience. Master disaster recovery, business continuity planning, and operational risk management frameworks.',
     '[
         {"title": "Business Continuity Plan", "deliverable": "Comprehensive business continuity and disaster recovery plan", "description": "Create detailed plan for business continuity and disaster recovery", "timeRequired": "150 mins"},
         {"title": "Operational Risk Assessment", "deliverable": "Complete operational risk analysis", "description": "Assess and document all operational risks with mitigation strategies", "timeRequired": "120 mins"},
         {"title": "Crisis Management Framework", "deliverable": "Crisis management protocols and procedures", "description": "Develop crisis management procedures and communication plans", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Business Continuity Framework", "description": "Framework for business continuity and disaster recovery"},
         {"type": "template", "title": "Risk Assessment Templates", "description": "Templates for operational risk assessment"},
         {"type": "tool", "title": "Crisis Management Planner", "description": "Tool for crisis management planning"}
     ]'::jsonb,
     90, 100, 6),

    (mod4_id, 22, 'Regulatory & Compliance Operations',
     'Document regulatory compliance operations that demonstrate adherence to all applicable standards. Master compliance monitoring, regulatory reporting, and industry-specific requirements.',
     '[
         {"title": "Compliance Operations Documentation", "deliverable": "Complete compliance operations manual", "description": "Document all compliance operations and monitoring procedures", "timeRequired": "120 mins"},
         {"title": "Regulatory Reporting System", "deliverable": "Automated regulatory reporting system", "description": "Implement system for automated compliance reporting", "timeRequired": "90 mins"},
         {"title": "Industry Standards Compliance", "deliverable": "Industry-specific compliance framework", "description": "Ensure compliance with all industry-specific standards", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Compliance Operations Framework", "description": "Framework for regulatory compliance operations"},
         {"type": "template", "title": "Regulatory Reporting Templates", "description": "Templates for regulatory reporting and compliance"},
         {"type": "tool", "title": "Compliance Monitoring System", "description": "System for monitoring regulatory compliance"}
     ]'::jsonb,
     90, 100, 7),

    (mod4_id, 24, 'Performance Optimization Excellence',
     'Build performance optimization systems that demonstrate continuous improvement culture. Master performance metrics, optimization frameworks, and efficiency improvement systems.',
     '[
         {"title": "Performance Metrics Framework", "deliverable": "Comprehensive performance measurement system", "description": "Implement system for measuring and tracking all key performance indicators", "timeRequired": "120 mins"},
         {"title": "Optimization Process Implementation", "deliverable": "Continuous improvement process", "description": "Implement systematic process for identifying and implementing optimizations", "timeRequired": "90 mins"},
         {"title": "Efficiency Analytics Dashboard", "deliverable": "Real-time efficiency analytics", "description": "Build dashboard for tracking efficiency improvements and opportunities", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Performance Optimization Framework", "description": "Framework for systematic performance optimization"},
         {"type": "template", "title": "Performance Metrics Templates", "description": "Templates for performance measurement and tracking"},
         {"type": "tool", "title": "Optimization Analytics Tool", "description": "Tool for performance optimization analytics"}
     ]'::jsonb,
     90, 100, 8),

    (mod4_id, 25, 'Scalability Architecture Excellence',
     'Document scalability architecture that demonstrates ability to handle rapid growth. Master scalability planning, capacity management, and growth infrastructure frameworks.',
     '[
         {"title": "Scalability Architecture Documentation", "deliverable": "Complete scalability architecture plan", "description": "Document architecture and systems designed for 10x growth", "timeRequired": "150 mins"},
         {"title": "Capacity Planning Framework", "deliverable": "Comprehensive capacity planning system", "description": "Implement capacity planning for all business functions", "timeRequired": "120 mins"},
         {"title": "Growth Infrastructure Plan", "deliverable": "Infrastructure scaling roadmap", "description": "Create detailed plan for scaling infrastructure with growth", "timeRequired": "90 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Scalability Excellence Framework", "description": "Framework for scalability architecture and planning"},
         {"type": "template", "title": "Capacity Planning Templates", "description": "Templates for capacity planning and management"},
         {"type": "tool", "title": "Scalability Planner", "description": "Tool for planning and managing scalability"}
     ]'::jsonb,
     90, 100, 9);

    -- MODULE 5: Team & Human Capital Excellence (lessons 27-34)
    INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex") VALUES
    (mod5_id, 21, 'Executive Team Excellence Documentation',
     'Document executive team strength with comprehensive leadership profiles, track records, and organizational design. Create leadership documentation that demonstrates experience and capability to scale.',
     '[
         {"title": "Executive Profile Development", "deliverable": "Comprehensive executive team profiles", "description": "Create detailed profiles showcasing experience, achievements, and expertise", "timeRequired": "120 mins"},
         {"title": "Leadership Track Record Documentation", "deliverable": "Quantified leadership achievements", "description": "Document specific achievements and results from each executive", "timeRequired": "90 mins"},
         {"title": "Organizational Design Framework", "deliverable": "Scalable organizational structure", "description": "Design organizational structure for current and future growth phases", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "template", "title": "Executive Profile Templates", "description": "Professional templates for executive team documentation"},
         {"type": "framework", "title": "Leadership Documentation Framework", "description": "Framework for documenting leadership strength"},
         {"type": "tool", "title": "Organizational Design Tool", "description": "Tool for designing scalable organizational structures"}
     ]'::jsonb,
     60, 75, 2),

    (mod5_id, 27, 'Board & Advisory Excellence',
     'Document board composition and advisory strength that demonstrates governance and strategic guidance. Create board documentation that showcases expertise and strategic value.',
     '[
         {"title": "Board Composition Documentation", "deliverable": "Professional board member profiles", "description": "Document board member qualifications, experience, and contributions", "timeRequired": "90 mins"},
         {"title": "Advisory Team Showcase", "deliverable": "Advisory team documentation", "description": "Document advisory team expertise and strategic contributions", "timeRequired": "75 mins"},
         {"title": "Governance Framework Documentation", "deliverable": "Board governance structure", "description": "Document board committees, processes, and governance framework", "timeRequired": "60 mins"}
     ]'::jsonb,
     '[
         {"type": "template", "title": "Board Documentation Templates", "description": "Templates for board and advisory documentation"},
         {"type": "framework", "title": "Governance Documentation Framework", "description": "Framework for governance documentation"},
         {"type": "tool", "title": "Board Profile Builder", "description": "Tool for creating professional board profiles"}
     ]'::jsonb,
     60, 75, 3),

    (mod5_id, 28, 'Talent Acquisition & Retention Excellence',
     'Document talent strategy that demonstrates ability to attract and retain top performers. Create talent documentation that shows competitive advantage in human capital.',
     '[
         {"title": "Talent Strategy Documentation", "deliverable": "Comprehensive talent acquisition strategy", "description": "Document strategy for attracting, hiring, and retaining top talent", "timeRequired": "120 mins"},
         {"title": "Retention Program Documentation", "deliverable": "Employee retention programs and metrics", "description": "Document retention programs and track employee satisfaction metrics", "timeRequired": "90 mins"},
         {"title": "Competitive Compensation Analysis", "deliverable": "Market-competitive compensation framework", "description": "Document compensation strategy and market competitiveness", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Talent Excellence Framework", "description": "Framework for talent acquisition and retention"},
         {"type": "template", "title": "Talent Strategy Templates", "description": "Templates for talent strategy documentation"},
         {"type": "tool", "title": "Compensation Analyzer", "description": "Tool for compensation analysis and planning"}
     ]'::jsonb,
     60, 75, 4),

    (mod5_id, 29, 'Culture & Values Excellence',
     'Document company culture and values that demonstrate strong organizational foundation. Create culture documentation that shows competitive advantage in team building.',
     '[
         {"title": "Culture Documentation Framework", "deliverable": "Comprehensive culture documentation", "description": "Document company culture, values, and cultural practices", "timeRequired": "90 mins"},
         {"title": "Employee Engagement Metrics", "deliverable": "Culture metrics and engagement tracking", "description": "Implement and document employee engagement measurement systems", "timeRequired": "75 mins"},
         {"title": "Cultural Competitive Advantage", "deliverable": "Culture as competitive advantage documentation", "description": "Document how culture creates competitive advantage and drives performance", "timeRequired": "60 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Culture Excellence Framework", "description": "Framework for culture documentation and measurement"},
         {"type": "template", "title": "Culture Documentation Templates", "description": "Templates for culture and values documentation"},
         {"type": "tool", "title": "Culture Assessment Tool", "description": "Tool for assessing and tracking company culture"}
     ]'::jsonb,
     60, 75, 5),

    (mod5_id, 30, 'Performance Management Excellence',
     'Document performance management systems that demonstrate systematic approach to employee development. Create performance documentation that shows commitment to excellence.',
     '[
         {"title": "Performance Management System", "deliverable": "Comprehensive performance management framework", "description": "Document performance review processes and development programs", "timeRequired": "120 mins"},
         {"title": "Career Development Documentation", "deliverable": "Employee development and career pathing", "description": "Document career development programs and advancement opportunities", "timeRequired": "90 mins"},
         {"title": "Performance Analytics", "deliverable": "Performance metrics and analytics system", "description": "Implement system for tracking and analyzing employee performance", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Performance Excellence Framework", "description": "Framework for performance management excellence"},
         {"type": "template", "title": "Performance Management Templates", "description": "Templates for performance management documentation"},
         {"type": "tool", "title": "Performance Analytics Dashboard", "description": "Dashboard for performance analytics and tracking"}
     ]'::jsonb,
     60, 75, 6),

    (mod5_id, 31, 'Diversity & Inclusion Excellence',
     'Document diversity and inclusion initiatives that demonstrate commitment to inclusive excellence. Create D&I documentation that shows modern workforce practices.',
     '[
         {"title": "D&I Strategy Documentation", "deliverable": "Comprehensive diversity and inclusion strategy", "description": "Document D&I strategy, initiatives, and measurement systems", "timeRequired": "90 mins"},
         {"title": "Inclusive Hiring Practices", "deliverable": "Inclusive hiring framework", "description": "Document inclusive hiring practices and bias elimination processes", "timeRequired": "75 mins"},
         {"title": "D&I Metrics and Reporting", "deliverable": "D&I metrics tracking system", "description": "Implement system for tracking and reporting D&I metrics", "timeRequired": "60 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "D&I Excellence Framework", "description": "Framework for diversity and inclusion excellence"},
         {"type": "template", "title": "D&I Documentation Templates", "description": "Templates for D&I strategy and reporting"},
         {"type": "tool", "title": "D&I Metrics Tracker", "description": "Tool for tracking diversity and inclusion metrics"}
     ]'::jsonb,
     60, 75, 7),

    (mod5_id, 32, 'Leadership Development Excellence',
     'Document leadership development programs that demonstrate systematic approach to building future leaders. Create leadership documentation that shows succession planning.',
     '[
         {"title": "Leadership Development Program", "deliverable": "Comprehensive leadership development framework", "description": "Document leadership development programs and succession planning", "timeRequired": "120 mins"},
         {"title": "Succession Planning Documentation", "deliverable": "Leadership succession planning", "description": "Create succession plans for all key leadership positions", "timeRequired": "90 mins"},
         {"title": "Leadership Pipeline Tracking", "deliverable": "Leadership pipeline analytics", "description": "Implement system for tracking leadership development progress", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Leadership Development Framework", "description": "Framework for leadership development excellence"},
         {"type": "template", "title": "Succession Planning Templates", "description": "Templates for leadership succession planning"},
         {"type": "tool", "title": "Leadership Pipeline Tracker", "description": "Tool for tracking leadership development"}
     ]'::jsonb,
     60, 75, 8),

    (mod5_id, 33, 'Remote Work Excellence',
     'Document remote work capabilities that demonstrate operational resilience and modern workforce management. Create remote work documentation that shows competitive advantage.',
     '[
         {"title": "Remote Work Framework", "deliverable": "Comprehensive remote work policy and procedures", "description": "Document remote work policies, tools, and performance management", "timeRequired": "90 mins"},
         {"title": "Digital Collaboration Excellence", "deliverable": "Digital collaboration tools and processes", "description": "Document digital tools and processes for remote collaboration", "timeRequired": "75 mins"},
         {"title": "Remote Performance Metrics", "deliverable": "Remote work performance tracking", "description": "Implement metrics for tracking remote work effectiveness", "timeRequired": "60 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Remote Work Excellence Framework", "description": "Framework for remote work excellence"},
         {"type": "template", "title": "Remote Work Policy Templates", "description": "Templates for remote work policies and procedures"},
         {"type": "tool", "title": "Remote Performance Tracker", "description": "Tool for tracking remote work performance"}
     ]'::jsonb,
     60, 75, 9),

    (mod5_id, 34, 'Human Capital ROI Excellence',
     'Document human capital return on investment that demonstrates strategic value of workforce investments. Create human capital documentation that shows competitive advantage.',
     '[
         {"title": "Human Capital ROI Analysis", "deliverable": "Comprehensive human capital ROI framework", "description": "Calculate and document ROI on all human capital investments", "timeRequired": "120 mins"},
         {"title": "Workforce Analytics", "deliverable": "Advanced workforce analytics system", "description": "Implement analytics to track workforce productivity and value creation", "timeRequired": "90 mins"},
         {"title": "Human Capital Strategy", "deliverable": "Strategic human capital investment plan", "description": "Create strategic plan for human capital investments and development", "timeRequired": "75 mins"}
     ]'::jsonb,
     '[
         {"type": "framework", "title": "Human Capital ROI Framework", "description": "Framework for measuring human capital ROI"},
         {"type": "template", "title": "Workforce Analytics Templates", "description": "Templates for workforce analytics and measurement"},
         {"type": "tool", "title": "Human Capital ROI Calculator", "description": "Tool for calculating human capital ROI"}
     ]'::jsonb,
     60, 75, 10);

    RAISE NOTICE 'P8 Course Enhancement Part 2: Added comprehensive content for Modules 4-5';

END $$;