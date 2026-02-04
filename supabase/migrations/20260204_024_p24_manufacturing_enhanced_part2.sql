-- THE INDIAN STARTUP - P24: Manufacturing & Make in India Mastery - Part 2
-- Migration: 20260204_024_p24_manufacturing_enhanced_part2.sql
-- Purpose: Modules 4-7 (Days 16-35)

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
BEGIN
    -- Get P24 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P24';

    -- ========================================
    -- MODULE 4: BIS Certification (Days 16-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'BIS Certification and Standards',
        'Navigate Bureau of Indian Standards certification requirements - mandatory certification under BIS Act, ISI mark process, compulsory registration scheme (CRS), foreign manufacturer certification, and ongoing compliance requirements.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_4_id;

    -- Day 16: BIS Certification Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        16,
        'BIS Certification Overview',
        'Bureau of Indian Standards (BIS) is India''s national standards body responsible for standardization, certification, and quality. Understanding BIS requirements is essential as 384+ products now require mandatory BIS certification before sale in India.

BIS Act 2016: Replaced BIS Act 1986 with stronger enforcement. Enables government to notify mandatory standards. Provides for hallmarking of precious metals. Introduces Compulsory Registration Scheme (CRS). Significant penalties for violations.

Types of BIS Certification: ISI Mark (Product Certification Scheme): Traditional certification for products meeting Indian Standards. Voluntary for most products, mandatory for 109 items. Factory inspection and ongoing surveillance. Quality mark (ISI) on certified products.

Compulsory Registration Scheme (CRS): For electronics and IT products. Self-declaration based certification. No factory inspection required. 50+ product categories covered.

Foreign Manufacturer Certification Scheme (FMCS): For imported products requiring ISI mark. Additional requirements for overseas manufacturers.

Hallmarking: For gold, silver, and other precious metals. Mandatory in 343 districts for gold jewelry. BIS licensed hallmarking centers.

Mandatory Certification Products (109 Items): Food and Agriculture: Packaged drinking water, infant milk food, vanaspati, food additives. Electrical: Switches, cables, MCBs, motors, transformers, stabilizers. Steel and Metal: TMT bars, structural steel, LPG cylinders. Chemicals: Cement, paints, household insecticides. Safety: Helmets, safety glass, fire extinguishers. Electronics (under CRS): Mobile phones, power banks, LED products, smart watches.

Certification Process Overview: Application submission through BIS portal (manakonline.bis.gov.in). Document review by BIS. Factory inspection (for ISI mark). Product testing at BIS-recognized labs. Grant of license/registration. Ongoing surveillance and compliance.

Penalties for Non-Compliance: Using BIS mark without license: Up to Rs 5 lakh fine and/or 2 years imprisonment. Substandard marked products: Up to Rs 10 lakh fine and/or 2 years imprisonment. Repeat offense: Enhanced penalties. Product recall and destruction.',
        '["Check if your products fall under mandatory BIS certification - review complete list of 109 ISI products and 50+ CRS categories", "Identify applicable Indian Standard number for your product - study standard requirements and testing parameters", "Assess certification route: ISI mark, CRS, or voluntary certification based on product category", "Calculate certification cost and timeline for budgeting and project planning"]'::jsonb,
        '["BIS Mandatory Certification Product List with IS numbers and certification route", "BIS Certification Route Decision Tree for determining applicable scheme", "Certification Timeline and Cost Calculator for ISI and CRS schemes", "BIS Act 2016 Compliance Guide with penalties and enforcement provisions"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 17: ISI Mark Certification Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        17,
        'ISI Mark Certification Process',
        'The ISI (Indian Standards Institution) mark is India''s most recognized quality certification. For 109 mandatory products, ISI mark is legally required before sale. The certification process involves rigorous factory assessment and product testing.

Application Process: Online Registration: Create account on manakonline.bis.gov.in. Submit application with required documents. Pay application fee (Rs 1,000-10,000 based on product category).

Required Documents: Manufacturing license/Udyam registration. Factory layout showing production flow. Quality control system documentation. List of testing equipment. List of raw materials with sources. Production capacity details. Organizational structure with quality personnel.

Factory Assessment: Preliminary Review: BIS reviews application for completeness (15-20 days). Document adequacy check against scheme requirements.

Factory Inspection: BIS officer visits factory. Assessment areas: Production process adequacy, testing facilities, quality management system, raw material control, calibrated instruments, trained personnel. Duration: 1-2 days depending on complexity.

Critical Requirements: In-house testing facilities for specified parameters. Calibrated instruments traceable to national standards. Documented quality manual and procedures. Trained quality personnel. Raw material quality control.

Product Testing: Samples drawn during factory inspection. Testing at BIS-recognized laboratory. Full type testing per Indian Standard. Test report validity typically 1 year.

Grant of License: Satisfactory factory assessment. Conforming test results. Marking fee payment. License valid for 1-2 years depending on product. CM/L number assigned.

Ongoing Compliance: Surveillance visits (1-4 per year based on product). Market sample testing by BIS. Annual renewal of license. Reporting of production quantities. Informing BIS of any process changes.

Timeline Summary: Application to preliminary review: 15-20 days. Factory inspection scheduling: 15-30 days. Testing: 30-45 days. License grant: 15 days after compliant results. Total: 3-6 months typically.

Cost Components: Application fee: Rs 1,000-10,000. Testing charges: Rs 10,000-50,000 (varies by product). Marking fee: Based on production value (0.1-0.2%). Surveillance: Included in marking fee.',
        '["Prepare complete application documentation package as per BIS requirements for your product category", "Ensure factory has required testing equipment and calibrated instruments before applying", "Develop quality manual and documented procedures meeting BIS scheme requirements", "Submit application through manakonline portal and track progress regularly"]'::jsonb,
        '["ISI Mark Application Checklist with document requirements by product category", "Factory Assessment Preparation Guide with common non-conformities to avoid", "Quality Manual Template aligned with BIS scheme requirements", "BIS Testing Laboratory Directory with capabilities and typical timelines"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 18: Compulsory Registration Scheme (CRS)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        18,
        'Compulsory Registration Scheme for Electronics',
        'The Compulsory Registration Scheme (CRS) covers 50+ categories of electronics and IT products. Unlike ISI certification, CRS is self-declaration based with third-party testing, making it faster but with manufacturer responsibility for compliance.

Products Under CRS: Mobile phones and tablets. Power adapters and chargers. Power banks. LED products (bulbs, luminaires, drivers). Audio/video equipment. IT equipment (monitors, printers). Microwave ovens. Smart watches and fitness bands. Electronic toys. Set-top boxes.

CRS vs ISI Mark: CRS: Self-declaration based, no factory inspection, third-party testing only, faster (30-60 days), suitable for electronics. ISI: Factory assessment based, ongoing surveillance, more rigorous, longer timeline, traditional products.

Registration Process: Step 1 - Application: Register on BIS CRS portal. Submit company details and product information. Select product category and applicable Indian Standard.

Step 2 - Testing: Get samples tested at BIS-recognized lab. Safety testing per applicable standard. Test report upload to portal.

Step 3 - Documentation: Test report from recognized lab. Self-declaration of conformity. Authorized Indian Representative (for foreign manufacturers).

Step 4 - Registration: BIS reviews application and test report. Registration granted within 7-15 days of complete submission. Registration number format: R-xxxxxxx.

Step 5 - Marking: Display registration number on product. BIS standard mark usage guidelines.

Testing Requirements: Safety Tests: Electrical safety per IS 13252. Electromagnetic Compatibility (EMC) testing. Specific tests per product standard.

Recognized Labs: ERTL (Electronics Regional Test Labs). TUV, UL, Intertek (BIS recognized). Typically 2-4 weeks for complete testing. Cost: Rs 25,000-1,00,000 depending on product.

Foreign Manufacturer Requirements: Authorized Indian Representative (AIR) mandatory. AIR responsible for compliance in India. Test reports from any ILAC/MRA accredited lab acceptable. Agreement with BIS through AIR.

Ongoing Compliance: Registration valid for 2 years. Renewal with retesting required. Market surveillance by BIS. Non-conforming products face withdrawal and penalty.',
        '["Identify CRS-applicable products in your portfolio and corresponding Indian Standards", "Select BIS-recognized testing laboratory and submit samples for complete type testing", "Prepare self-declaration documentation and apply through CRS portal", "Implement labeling compliance with registration number and BIS standard mark"]'::jsonb,
        '["CRS Product Category List with applicable standards and testing requirements", "BIS-Recognized Lab Directory with capabilities, timelines, and costs", "CRS Application Step-by-Step Guide with portal screenshots", "Electronics Labeling Compliance Guide for CRS-registered products"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 19: Quality Control Orders
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        19,
        'Quality Control Orders and Mandatory Standards',
        'Quality Control Orders (QCOs) issued under BIS Act make specific Indian Standards mandatory for products. QCOs are expanding rapidly as the government pushes for quality improvement and import substitution. Understanding QCO landscape is crucial for compliance.

What is a QCO: Government notification making Indian Standard compulsory. Issued by Ministry after stakeholder consultation. Specifies products, standards, and compliance date. Non-compliance becomes illegal offense.

Recent QCO Expansion: Pre-2020: Approximately 100 products under QCO. 2024: 384+ products under mandatory standards. Planned: 500+ products by 2025. Focus sectors: Steel, chemicals, toys, electrical, electronics.

Major QCO Categories: Steel Products: TMT bars, structural steel, pipes, fasteners. 53 steel products under QCO. Domestic manufacturers largely compliant. Import checks at ports.

Chemical Products: Paints and varnishes. Household insecticides. Industrial chemicals. Fertilizers.

Toys: All toys brought under QCO from January 2021. IS 9873 compliance mandatory. Significant impact on imports from China.

Electrical Equipment: Cables and wires. Switches and sockets. Distribution boards. LED products.

Air Conditioners and Refrigerants: Energy efficiency standards. Refrigerant specifications. Safety requirements.

QCO Compliance Process: Identify applicable QCO for your product. Check transition period (typically 6-12 months from notification). Apply for ISI mark certification. Complete certification before mandatory date. Import clearance requires BIS registration.

Impact on Imports: All imports must be BIS certified. Foreign Manufacturer Certification Scheme (FMCS) required. Port checking of BIS compliance. Non-certified imports blocked.

Upcoming QCOs: Monitor BIS website and Ministry notifications. Stakeholder comments invited before notification. Industry associations provide advance information. Plan certification 12-18 months ahead.

Business Implications: Compliance cost: Rs 50,000 to Rs 5,00,000 per product depending on complexity. Competitive advantage for certified domestic manufacturers. Market consolidation as non-compliant players exit. Import substitution opportunity.',
        '["Review all QCOs applicable to your products - check compliance status and transition deadlines", "Create QCO compliance roadmap with certification timelines and budget requirements", "Monitor upcoming QCO notifications in your sector through BIS and Ministry websites", "Assess competitive impact of QCOs - opportunity from reduced imports or threat from compliance requirements"]'::jsonb,
        '["Quality Control Order Master List with products, standards, and effective dates", "QCO Impact Assessment Framework for business planning", "Upcoming QCO Tracking System with sector-wise notifications", "QCO Compliance Cost Calculator with certification requirements"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 20: International Standards and Export Certification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        20,
        'International Standards and Export Certification',
        'Exporting manufactured products requires compliance with destination country standards and certifications. Understanding major international standards regimes and certification requirements enables market access and premium positioning.

Major International Standards: ISO Standards: ISO 9001: Quality Management System (foundation for most certifications). ISO 14001: Environmental Management System. ISO 45001: Occupational Health and Safety. ISO 22000: Food Safety Management. ISO 13485: Medical Devices Quality Management. These are management system standards, not product certifications.

CE Marking (European Union): Mandatory for products sold in EU/EEA. Covers 25+ product categories (directives). Self-certification for most products. Notified Body certification for high-risk products. Declaration of Conformity required. Technical file documentation mandatory.

US Certifications: UL (Underwriters Laboratories): Voluntary but widely required for electrical products. FCC: Mandatory for electronic devices (EMC compliance). FDA: Required for food, drugs, medical devices, cosmetics. CPSC: Consumer Product Safety Commission compliance.

UK UKCA: Post-Brexit replacement for CE marking. Similar requirements to CE. Separate certification required for UK market.

Sector-Specific Certifications: Automotive: IATF 16949 (quality management), PPAP (production part approval). Aerospace: AS9100 (quality management), NADCAP (special processes). Medical Devices: FDA 510(k) or PMA (US), CE under MDR (EU). Food: FSSC 22000, BRC, SQF, HACCP.

Certification Process: Select applicable standards/certifications for target market. Implement required systems and controls. Engage accredited certification body. Complete documentation and testing. Undergo audit/assessment. Obtain certification. Maintain through surveillance audits.

Common Export Certifications from India: Certificate of Origin: From Chambers of Commerce or EPC. Phytosanitary Certificate: For agricultural exports. Health Certificate: For food and animal product exports. NABL-accredited Test Reports: Internationally recognized laboratory reports.

Cost and Timeline: ISO certifications: Rs 2-5 lakh, 3-6 months. CE marking: Rs 3-10 lakh, 3-6 months (self-cert) to 12+ months (Notified Body). UL certification: Rs 5-15 lakh, 6-12 months.

Strategic Approach: Start with ISO 9001 as foundation. Add sector-specific requirements (IATF, AS9100). Obtain CE/UL for target export markets.',
        '["Identify export certification requirements for your target markets - map products to required standards", "Implement ISO 9001 as foundation quality management system", "Obtain CE marking or UL certification for products targeting EU/US markets", "Build relationship with accredited certification bodies and testing laboratories"]'::jsonb,
        '["Export Certification Requirements Matrix by market and product category", "CE Marking Step-by-Step Guide with directive selection and conformity assessment", "UL Certification Process Guide for electrical and electronic products", "Certification Body and Testing Lab Directory with international accreditations"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Quality Standards (Days 21-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Quality Standards and Management Systems',
        'Build world-class quality infrastructure - ISO 9001 implementation, Total Quality Management, Six Sigma and Lean methodologies, supplier quality management, and statistical process control for consistent product quality.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_5_id;

    -- Day 21: ISO 9001 Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        21,
        'ISO 9001 Quality Management System',
        'ISO 9001 is the world''s most widely recognized quality management system standard with 1.1 million+ certified organizations globally. For Indian manufacturers, ISO 9001 certification is often the baseline requirement for B2B customers and export markets.

ISO 9001:2015 Structure: Based on 10 clauses following High Level Structure (HLS). Risk-based thinking integrated throughout. Process approach to management. Leadership commitment emphasis. Continual improvement focus.

Key Clauses: Clause 4 - Context of Organization: Internal and external issues affecting quality. Interested parties and their requirements. Scope of QMS. Process identification and interaction.

Clause 5 - Leadership: Top management commitment. Quality policy establishment. Roles and responsibilities. Customer focus.

Clause 6 - Planning: Risk and opportunity assessment. Quality objectives and planning. Change management.

Clause 7 - Support: Resources (people, infrastructure, environment). Competence and awareness. Communication. Documented information.

Clause 8 - Operation: Operational planning and control. Customer requirements determination. Design and development. External provider control. Production and service provision.

Clause 9 - Performance Evaluation: Monitoring and measurement. Internal audit. Management review.

Clause 10 - Improvement: Nonconformity and corrective action. Continual improvement.

Implementation Steps: Gap Assessment (2-4 weeks): Current state analysis against ISO requirements. Documentation (4-8 weeks): Quality manual, procedures, work instructions. Implementation (8-12 weeks): Process implementation, training. Internal Audit (2-4 weeks): Complete audit of all processes. Management Review (1-2 weeks): Top management review of QMS. Certification Audit: Stage 1 documentation review, Stage 2 implementation audit.

Costs: Implementation: Rs 2-5 lakh (consultant fees). Certification: Rs 1-3 lakh (certification body fees). Annual surveillance: Rs 50,000-1 lakh. Total first year: Rs 4-10 lakh depending on organization size.',
        '["Conduct gap assessment of current quality practices against ISO 9001:2015 requirements", "Develop quality manual, procedures, and work instructions covering all required processes", "Train internal auditors and conduct complete internal audit before certification", "Select accredited certification body and schedule certification audit"]'::jsonb,
        '["ISO 9001:2015 Implementation Guide with clause-by-clause requirements", "Quality Manual Template with customizable content for manufacturing", "Internal Audit Checklist covering all ISO 9001 requirements", "Certification Body Selection Guide with accreditation verification"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: Total Quality Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        22,
        'Total Quality Management Principles',
        'Total Quality Management (TQM) is a management philosophy that integrates quality into every aspect of the organization. While ISO provides the framework, TQM provides the culture and tools for sustainable quality excellence.

TQM Principles: Customer Focus: Quality defined by customer requirements. Internal and external customer satisfaction. Voice of Customer (VoC) integration. Customer feedback loops.

Leadership: Top management commitment visible. Quality as strategic priority. Resource allocation for quality. Leading by example.

Employee Involvement: Every employee responsible for quality. Empowerment for improvement. Recognition and reward. Training and development.

Process Approach: Work organized as processes. Process ownership defined. Input-output linkages clear. Cross-functional coordination.

Continuous Improvement: Kaizen philosophy (small improvements). Breakthrough improvements. Data-driven decision making. Learning from failures.

TQM Tools: Seven Basic Quality Tools: Check Sheets, Pareto Charts, Cause and Effect (Ishikawa), Histograms, Scatter Diagrams, Control Charts, Flowcharts.

Advanced Tools: Quality Function Deployment (QFD), Failure Mode Effects Analysis (FMEA), Design of Experiments (DoE), Statistical Process Control (SPC).

Quality Circles: Small groups (5-10) of workers. Voluntary participation. Meet regularly to solve problems. Focus on workplace improvements. Present solutions to management.

TQM Implementation: Phase 1 - Foundation (3-6 months): Leadership commitment, quality policy, baseline measurements. Phase 2 - Process Focus (6-12 months): Process mapping, quality tools training, improvement projects. Phase 3 - Culture Building (12-24 months): Employee involvement, quality circles, recognition systems. Phase 4 - Excellence (Ongoing): Benchmarking, quality awards pursuit.

Indian Context: QCI (Quality Council of India) promotes TQM. CII-EXIM Business Excellence Model. Deming Prize winners from India: Tata Steel, Sundaram Clayton, Mahindra.',
        '["Assess current quality culture maturity level in your organization using TQM assessment framework", "Train employees on 7 basic quality tools and implement in daily problem-solving", "Establish quality circles in production areas with regular meeting cadence", "Set up continuous improvement program with idea generation and implementation tracking"]'::jsonb,
        '["TQM Implementation Roadmap with phased approach and milestones", "Seven Quality Tools Training Material with manufacturing examples", "Quality Circle Implementation Guide with facilitation techniques", "Continuous Improvement Program Framework with metrics and recognition"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 23: Six Sigma and Lean Manufacturing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        23,
        'Six Sigma and Lean Manufacturing',
        'Six Sigma and Lean Manufacturing are complementary methodologies that drive quality improvement and waste elimination. Lean Six Sigma combines both for powerful operational transformation.

Six Sigma Fundamentals: Statistical basis: 3.4 defects per million opportunities. Focus on variation reduction. Data-driven decision making. Structured problem solving.

DMAIC Methodology: Define: Problem statement, project charter, customer requirements. Measure: Current performance baseline, data collection plan. Analyze: Root cause identification, data analysis, hypothesis testing. Improve: Solution generation, pilot testing, implementation. Control: Control plan, monitoring systems, documentation.

Belt System: Yellow Belt: Basic awareness. Green Belt: Part-time improvement projects. Black Belt: Full-time improvement leader. Master Black Belt: Program leadership, coaching.

Lean Manufacturing Principles: Value: Define from customer perspective. Value Stream: Map all steps, identify waste. Flow: Ensure smooth process flow. Pull: Produce based on demand. Perfection: Continuously pursue zero waste.

Eight Wastes (TIMWOODS): Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects, Skills (underutilized).

Lean Tools: 5S: Sort, Set in order, Shine, Standardize, Sustain. Visual Management: Information at glance. Kanban: Pull-based production control. Value Stream Mapping: End-to-end flow analysis. Poka-yoke: Error proofing. SMED: Quick changeover.

Lean Six Sigma Integration: Use Lean to eliminate waste and improve flow. Use Six Sigma to reduce variation and defects. Combined approach for maximum impact.

Implementation Approach: Start with 5S as foundation. Train Green Belts for improvement projects. Select high-impact projects aligned with business goals. Typical ROI: 5-10x project costs in savings.',
        '["Implement 5S across production areas as foundation for Lean", "Train at least 2 employees as Green Belts for internal improvement capability", "Identify and execute 3 Lean Six Sigma projects targeting major quality or efficiency issues", "Establish visual management systems for real-time performance monitoring"]'::jsonb,
        '["DMAIC Project Guide with templates for each phase", "Lean Manufacturing Implementation Roadmap with tool selection guidance", "5S Implementation Checklist with audit criteria", "Six Sigma Statistical Tools Guide with Excel-based analysis templates"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 24: Supplier Quality Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        24,
        'Supplier Quality Management',
        'For manufacturers, supplier quality directly impacts finished product quality. With 60-70% of product cost often in purchased materials, robust Supplier Quality Management (SQM) is critical for consistent quality and competitive pricing.

SQM Framework: Supplier Selection: Capability assessment before approval. Quality system evaluation. Financial stability check. Technical capability verification. Trial order evaluation.

Supplier Development: Gap identification against requirements. Joint improvement programs. Technical assistance provision. Training support. Regular performance reviews.

Supplier Monitoring: Incoming quality inspection. Performance metrics tracking. Audit program. Issue escalation process.

Supplier Qualification Process: Stage 1 - Initial Assessment: Self-assessment questionnaire, basic capability check. Stage 2 - Quality System Audit: QMS evaluation, process capability assessment. Stage 3 - Product Qualification: Sample submission, First Article Inspection, PPAP. Stage 4 - Approved Supplier Status: ASL addition, purchase authorization.

Key Metrics (Supplier Scorecard): Quality: PPM defective, lot rejection rate. Delivery: On-time delivery, lead time adherence. Cost: Price competitiveness, cost reduction. Service: Response time, complaint resolution.

PPAP (Production Part Approval Process): 18 elements for supplier approval (automotive standard). Design records, process flow, PFMEA, control plan, measurement system analysis, dimensional results, material test results.

Incoming Quality Control: Inspection levels based on supplier rating. Skip-lot inspection for proven suppliers. 100% inspection for new/problem suppliers. Sampling plans per AQL standards.

Supplier Development Programs: Kaizen workshops at supplier facilities. Quality improvement projects. Lean implementation support. Skill development training.

Indian Supplier Ecosystem: Large OEM programs: Tata Motors, Maruti, Mahindra. ACMA initiatives. CII supplier excellence awards.',
        '["Develop supplier qualification process with assessment criteria and approval stages", "Create supplier scorecard tracking quality, delivery, and cost performance monthly", "Implement incoming quality control system with inspection levels based on supplier rating", "Conduct supplier development activities for top 5 critical suppliers"]'::jsonb,
        '["Supplier Qualification Procedure with assessment forms and criteria", "Supplier Scorecard Template with automated calculations and trending", "PPAP Implementation Guide with 18 elements explanation", "Supplier Development Program Framework with improvement methodologies"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 25: Statistical Process Control
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        25,
        'Statistical Process Control Implementation',
        'Statistical Process Control (SPC) uses statistical methods to monitor and control manufacturing processes. SPC enables real-time identification of process variations before they create defects.

SPC Fundamentals: Common Cause Variation: Inherent process variability, random, predictable. Special Cause Variation: Assignable, identifiable causes, must be investigated.

Control Charts: Purpose: Distinguish common from special cause variation. Monitor process stability. Trigger investigation when out of control.

Types of Control Charts: Variables Charts: X-bar and R chart (subgroup averages and ranges), I-MR (individual measurements). Attributes Charts: p-chart (proportion defective), c-chart (count of defects).

Control Limits: UCL = Process mean + 3 standard deviations. LCL = Process mean - 3 standard deviations. Based on natural process variation.

Process Capability: Cp: Process capability index (spread vs specification). Cpk: Accounts for centering. Target: Cpk > 1.33 (minimum), > 1.67 (good), > 2.0 (excellent).

SPC Implementation Steps: Step 1 - Process Selection: Critical to quality characteristics, high volume processes. Step 2 - Measurement System Analysis: Gauge R&R study, calibration verification. Step 3 - Data Collection: Sampling plan design, rational subgrouping. Step 4 - Control Chart Setup: Historical data analysis, control limit calculation. Step 5 - Ongoing Monitoring: Real-time charting, out of control investigation.

Common Issues: Poor measurement systems. Wrong chart type selection. Misinterpreting natural variation. Not investigating special causes. Over-adjustment causing more variation.',
        '["Identify 5 critical process parameters for SPC implementation based on quality impact", "Conduct Measurement System Analysis (Gauge R&R) for selected parameters", "Set up control charts with calculated control limits based on process data", "Train operators on SPC charting, interpretation, and out-of-control response"]'::jsonb,
        '["SPC Implementation Guide with chart selection and calculation methods", "Measurement System Analysis (Gauge R&R) Procedure and calculator", "Control Chart Templates in Excel with automatic limit calculation", "Process Capability Analysis Guide with Cp/Cpk interpretation"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Manufacturing Technology (Days 26-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Manufacturing Technology and Industry 4.0',
        'Leverage modern manufacturing technologies - CNC and automation, robotics, additive manufacturing, IoT and smart factory, ERP systems, and Industry 4.0 implementation for competitive advantage.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_6_id;

    -- Day 26: CNC and Automation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        26,
        'CNC Machining and Factory Automation',
        'Computer Numerical Control (CNC) machines and automation systems form the backbone of modern manufacturing. Understanding technology options and selection criteria is essential for building competitive capability.

CNC Machine Categories: CNC Turning Centers: For cylindrical parts, 2-5 axis. Indian brands: Ace, LMW, Jyoti CNC. Imported: DMG Mori, Mazak, Haas. Price: Rs 15-80 lakh.

CNC Machining Centers: VMC and HMC, 3-5 axis. Indian: BFW, HMT, Jyoti. Imported: Makino, Okuma, Doosan. Price: Rs 20 lakh - 2 crore.

CNC Grinding and Wire EDM: For precision finishing and complex shapes. Price: Rs 20-90 lakh.

Selection Criteria: Application fit, accuracy requirements, productivity, reliability, cost.

Factory Automation Levels: Level 1 - Stand-alone CNC: Individual machine operation. Level 2 - Cell Automation: Multiple machines, robot loading. Level 3 - Flexible Manufacturing: FMS, automatic material handling. Level 4 - Fully Automated: Lights-out manufacturing.

Automation Technologies: PLCs: Machine and process control. SCADA: Supervisory monitoring. Material Handling: Conveyors, AGVs, AS/RS.

Indian CNC Industry: Rs 4,000 crore market. Import still 60%+ for high-precision. Government push for domestic development. IMTMA support.',
        '["Assess current machinery capability gaps against production requirements", "Develop CNC machine acquisition roadmap with technology specifications and budget", "Evaluate automation opportunities for high-volume repetitive operations", "Build relationships with machine tool suppliers for technology support"]'::jsonb,
        '["CNC Machine Selection Guide with technology comparison matrix", "Factory Automation ROI Calculator with labor and productivity analysis", "Indian CNC Manufacturer Directory with capabilities and pricing", "Automation Technology Comparison for different production scenarios"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 27: Industrial Robotics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        27,
        'Industrial Robotics in Manufacturing',
        'Industrial robots are transforming Indian manufacturing with 4,900+ robots added annually. Understanding robot types, applications, and implementation approaches enables smart automation investments.

Robot Types: Articulated Robots: 6-axis, most common. Applications: Welding, painting, assembly. Brands: FANUC, ABB, KUKA, Yaskawa. Price: Rs 15-50 lakh.

SCARA Robots: 4-axis, high-speed. Applications: Assembly, pick-and-place. Price: Rs 5-15 lakh.

Delta Robots: High-speed packaging. Price: Rs 10-25 lakh.

Collaborative Robots (Cobots): Work alongside humans safely. Easy programming. Brands: Universal Robots, Doosan. Price: Rs 10-25 lakh.

Manufacturing Applications: Welding: Highest robot application in India. Material Handling: Machine loading, palletizing. Assembly: Component insertion, fastening. Painting: Consistent finish quality. Quality Inspection: Vision-based inspection.

Robot Selection: Application analysis, payload and reach calculation, cycle time requirements, technology selection, system integration.

ROI Calculation: Labor savings, productivity improvement, quality improvement. Typical payback: 18-36 months.

Indian Robot Market: 4,900+ robots annually. Automotive 60%+. Robot density: 4 per 10,000 workers (vs 150+ developed countries). Significant growth potential.',
        '["Identify automation opportunities suitable for robotics in your operations", "Calculate ROI for prioritized robot applications", "Evaluate robot suppliers and system integrators", "Plan pilot robot installation for learning"]'::jsonb,
        '["Robot Application Assessment Framework", "Robot ROI Calculator with comprehensive cost-benefit analysis", "Robot Supplier and Integrator Directory for India", "Cobot vs Traditional Robot Decision Guide"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 28: Industry 4.0 and Smart Factory
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        28,
        'Industry 4.0 and Smart Factory Implementation',
        'Industry 4.0 integrates cyber-physical systems, IoT, cloud computing, and AI for smart manufacturing. Indian manufacturers are progressively adopting these technologies to compete globally.

Industry 4.0 Technologies: Industrial IoT: Sensors, real-time data collection, connectivity. Cloud Computing: Data storage, analytics platforms, remote access. Big Data Analytics: Production analysis, predictive modeling. AI/Machine Learning: Predictive maintenance, quality prediction. Digital Twin: Virtual replica for simulation.

Smart Factory Components: Connected Machines: Sensors, M2M communication, OPC-UA/MQTT protocols. Production Monitoring: Real-time OEE, downtime tracking. Quality 4.0: In-line inspection, vision systems, traceability. Predictive Maintenance: Vibration analysis, thermal imaging, ML-based prediction.

Implementation Approach: Stage 1 - Connectivity: Connect key machines, basic data collection. Stage 2 - Visibility: Comprehensive monitoring, automated reporting. Stage 3 - Transparency: Root cause analysis, process understanding. Stage 4 - Predictability: Predictive maintenance, quality prediction. Stage 5 - Adaptability: Autonomous optimization.

Indian Industry 4.0: SAMARTH Udyog Bharat 4.0 government initiative. Centres of Excellence established. Large companies advanced, MSMEs at early stages. Growing solution provider ecosystem.',
        '["Assess manufacturing digitization maturity using Industry 4.0 readiness framework", "Identify quick-win opportunities: machine connectivity, production monitoring", "Develop Industry 4.0 roadmap with phased implementation", "Explore SAMARTH Udyog scheme support"]'::jsonb,
        '["Industry 4.0 Readiness Assessment Framework", "IoT Technology Selection Guide for manufacturing", "Smart Factory Implementation Roadmap", "Industry 4.0 Solution Provider Directory"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 29: ERP Systems
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        29,
        'ERP Systems for Manufacturing',
        'Enterprise Resource Planning (ERP) systems integrate all business processes from order to delivery. For manufacturers, ERP is essential for managing complexity and scaling operations.

Manufacturing ERP Modules: Sales: Order processing, pricing, delivery. Production Planning: MRP, capacity planning, scheduling. Inventory: Stock tracking, valuation, reorder management. Procurement: Purchase orders, vendor management. Quality: Inspection, non-conformance, certificates. Finance: GL, AP/AR, cost accounting.

ERP Options: Tier 1 (Large): SAP S/4HANA, Oracle Cloud. Cost: Rs 50 lakh - 5 crore. Tier 2 (Mid-market): Microsoft Dynamics 365, Infor, Epicor. Cost: Rs 15-50 lakh. Tier 3 (SME): Tally, Zoho, ERPNext, SAP Business One. Cost: Rs 2-15 lakh.

Indian Manufacturing ERP: MARG, Ramco, Adaequare.

Implementation Success Factors: Business process mapping. Change management. Data migration quality. Phased implementation. User training.

Common Failures: Underestimating customization. Inadequate training. Poor data quality. Scope creep.

ROI: Inventory reduction 15-25%. Production efficiency 20-30%. Order fulfillment improvement 10-20%. Payback: 18-36 months.',
        '["Document current business processes across all functions", "Evaluate ERP options based on manufacturing requirements and budget", "Develop ERP implementation roadmap with change management", "Select implementation partner with manufacturing expertise"]'::jsonb,
        '["ERP Selection Framework for manufacturing", "Business Process Documentation Template", "ERP Implementation Project Plan", "ERP Vendor Directory for India"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 30: Additive Manufacturing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        30,
        'Additive Manufacturing and 3D Printing',
        'Additive Manufacturing (AM) is revolutionizing prototyping and increasingly production. Understanding AM technologies and strategic implementation provides competitive advantages.

AM Technologies: FDM: Plastic filament, entry-level to industrial. Price: Rs 50,000 - 20 lakh. Best for: Prototypes, jigs, fixtures.

SLA/DLP: UV curing resin, high detail. Price: Rs 1-30 lakh. Best for: Detailed prototypes, casting patterns.

SLS: Powder bed for plastics, no supports needed. Price: Rs 30 lakh - 2 crore. Best for: Functional prototypes, end-use parts.

Metal AM (DMLS/SLM): Production-capable metal parts. Price: Rs 2-15 crore. Best for: Aerospace, medical, complex geometries.

Manufacturing Applications: Rapid Prototyping: Design iteration acceleration. Tooling and Fixtures: 50-80% cost reduction vs machined. Casting Patterns: Eliminate tooling for low volumes. End-Use Parts: Low volume, spare parts, customization.

AM Implementation: Phase 1: Entry-level FDM for prototyping. Phase 2: Industrial FDM/SLA for production support. Phase 3: Production parts with quality certification.

Indian AM Landscape: Service providers: Objectify, Imaginarium, Think3D. Government support: NITI Aayog National AM Strategy. Growing adoption in automotive, aerospace, healthcare.',
        '["Assess AM opportunities: prototyping, tooling, production parts", "Start with entry-level FDM for learning", "Identify 5 tooling applications for AM cost savings", "Evaluate AM service providers for complex parts"]'::jsonb,
        '["AM Technology Selection Guide", "AM Cost Calculator comparing in-house vs outsourcing", "3D Printing Design Guidelines", "Indian AM Service Provider Directory"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Lean Operations (Days 31-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Lean Operations Excellence',
        'Implement world-class lean manufacturing - Toyota Production System principles, 5S, Kaizen culture, Just-in-Time production, and Total Productive Maintenance.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 31: Toyota Production System
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        31,
        'Toyota Production System Fundamentals',
        'The Toyota Production System (TPS) is the foundation of lean manufacturing. Understanding TPS principles provides the basis for operational excellence.

Two Pillars: Just-in-Time: Make only what is needed, when needed, in quantity needed. Pull-based, small lots, quick changeover. Jidoka: Automation with human intelligence. Stop on abnormality, built-in quality.

TPS House: Foundation: Stability through standardized work, heijunka, kaizen. Pillars: JIT and Jidoka. Goal: Highest quality, lowest cost, shortest lead time.

Key Concepts: Takt Time: Production pace aligned to customer demand. Heijunka: Level production by volume and mix. Genchi Genbutsu: Go and see for yourself. Kaizen: Continuous improvement. Muda, Mura, Muri: Waste, unevenness, overburden.

TPS in India: Successful: Maruti Suzuki, Toyota Kirloskar, TVS Motor. Cultural adaptation required. Long-term commitment needed.

Implementation: Phase 1 (6-12 months): 5S, standardized work, basic problem-solving. Phase 2 (12-24 months): Value stream mapping, continuous flow, pull system. Phase 3 (Ongoing): Kaizen culture, continuous evolution.

Common Mistakes: Tool-focused vs philosophy-focused. Lack of leadership commitment. Inadequate training. Impatience for results.',
        '["Study Toyota Production System philosophy, not just tools", "Assess operations against TPS principles", "Calculate takt time for major product lines", "Begin cultural foundation through 5S and standardized work"]'::jsonb,
        '["Toyota Production System Study Guide", "TPS Assessment Framework", "Takt Time Calculator", "TPS Implementation Roadmap"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 32: 5S Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        32,
        '5S Workplace Organization',
        '5S is the foundation of lean manufacturing, creating organized, clean, efficient workplace. Proper implementation improves safety, quality, and productivity.

5S Elements: Seiri (Sort): Remove unnecessary items, red tag campaign. Seiton (Set in Order): A place for everything, visual indicators. Seiso (Shine): Clean and inspect daily. Seiketsu (Standardize): Create standards for first 3S. Shitsuke (Sustain): Maintain through audits and recognition.

Implementation: Phase 1 - Preparation (2 weeks): Management commitment, team formation, pilot area selection. Phase 2 - Sort (1-2 weeks): Red tag campaign, item classification. Phase 3 - Set in Order (2-3 weeks): Layout optimization, labeling. Phase 4 - Shine (1-2 weeks): Deep cleaning, schedules. Phase 5 - Standardize (2 weeks): Photo standards, checklists. Phase 6 - Sustain (Ongoing): Audit system, recognition.

5S Audit: Weekly self-audits. Monthly cross-functional audits. Scoring system. Recognition for top performers.

Benefits: Space freed 20-30%. Search time reduced 50%+. Safety improvement. Foundation for further improvements.

Common Failures: Management not walking talk. One-time event vs ongoing. Poor audit follow-up. Stopping at 3S.',
        '["Form 5S implementation team", "Select pilot area for implementation", "Execute Sort phase with red tag campaign", "Develop visual standards and audit checklist"]'::jsonb,
        '["5S Implementation Guide", "Red Tag and Visual Control Templates", "5S Audit Checklist", "5S Before-After Documentation Template"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 33: Kaizen Culture
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        33,
        'Kaizen and Continuous Improvement Culture',
        'Kaizen means "change for better" - continuous improvement through small incremental changes. Building kaizen culture engages all employees in improvement.

Kaizen Philosophy: Improvement is everyone''s job. Small changes accumulate. Process focus, not blame. Gemba orientation. Data-driven decisions.

Types: Point Kaizen: Quick individual improvements. System Kaizen: Process-level, team involvement, 1-4 weeks. Kaizen Events (Blitz): Intensive 3-5 days, cross-functional, major transformation.

Kaizen Event Structure: Pre-Event: Scope, data collection, team selection. Day 1: Training, current state observation. Day 2-3: Analysis, solution development. Day 4: Implementation, trial runs. Day 5: Documentation, celebration.

Suggestion System: Simple submission process. Quick response (within 1 week). Implementation support. Recognition and rewards.

Building Culture: Leadership: Participate, recognize, remove barriers. Middle Management: Coach, support, track. Shop Floor: Identify opportunities, participate, sustain.

Common Challenges: Bureaucracy. Lack of recognition. Middle management resistance. Improvement fatigue.',
        '["Establish kaizen suggestion system", "Conduct first kaizen event", "Train supervisors as kaizen facilitators", "Set improvement targets and track metrics"]'::jsonb,
        '["Kaizen Event Facilitation Guide", "Suggestion System Implementation Framework", "A3 Problem-Solving Template", "Kaizen Recognition Program Design"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 34: Just-in-Time Production
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        34,
        'Just-in-Time Production System',
        'Just-in-Time (JIT) produces exactly what is needed, when needed, in quantity needed. JIT minimizes inventory, reduces lead time, exposes problems.

JIT Principles: Make only what is sold. Small lot production. Short setup times. Pull-based production. Continuous flow. Supplier integration.

Key Elements: Takt Time Production: Pace matches customer demand. One-Piece Flow: Products move one at a time. Pull System: Downstream pulls from upstream, kanban signals. SMED: Quick changeover enabling small lots.

Kanban System: Visual signal for production/movement. Card, bin, or electronic signal. Production kanban and withdrawal kanban. Calculation: (Daily demand x Lead time x Safety factor) / Container quantity.

JIT Implementation: Step 1 - Stability First: Reliable equipment, capable processes. Step 2 - Setup Reduction: SMED on bottlenecks. Step 3 - Lot Size Reduction: Progressive reduction. Step 4 - Flow Implementation: Continuous flow, cells. Step 5 - Pull System: Kanban, supermarkets.

Prerequisites: Stable, leveled demand. Quality at source. Reliable equipment. Capable suppliers.

JIT Risks in India: Supplier unreliability. Infrastructure disruptions. Demand variability. Mitigation through buffers, supplier development.',
        '["Calculate takt time for main product lines", "Implement SMED on constraint equipment", "Design and pilot kanban system", "Develop supplier reliability improvement plan"]'::jsonb,
        '["JIT Implementation Roadmap", "SMED Implementation Guide", "Kanban System Design Template", "Supplier Development Framework for JIT"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 35: Total Productive Maintenance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        35,
        'Total Productive Maintenance',
        'TPM maximizes equipment effectiveness through proactive maintenance involving all employees. Essential for manufacturing reliability.

TPM Goals: Zero breakdowns. Zero defects. Zero accidents. Optimal equipment effectiveness.

OEE: OEE = Availability x Performance x Quality. World class: 85%+.

Six Big Losses: Availability: Breakdowns, setup/adjustments. Performance: Idling, reduced speed. Quality: Defects, startup losses.

Eight Pillars: Autonomous Maintenance: Operators maintain equipment. Planned Maintenance: Systematic scheduling. Quality Maintenance: Zero defects from equipment. Focused Improvement: Team-based loss elimination. Early Equipment Management: Design for reliability. Training and Education: Skill development. Safety, Health, Environment. Office TPM.

Autonomous Maintenance Steps: 1. Initial cleaning. 2. Contamination countermeasures. 3. Cleaning/lubrication standards. 4. General inspection. 5. Autonomous inspection. 6. Workplace organization. 7. Full autonomous maintenance.

TPM Implementation: Phase 1 - Preparation (3-6 months): Commitment, organization, targets. Phase 2 - Introduction (1 month): Kickoff, pilot selection. Phase 3 - Implementation (2-3 years): Pillar activities, deployment. Phase 4 - Stabilization (Ongoing): Award pursuit, continuous improvement.',
        '["Calculate OEE for critical equipment", "Start autonomous maintenance on pilot equipment", "Develop planned maintenance schedule", "Form focused improvement teams for top losses"]'::jsonb,
        '["OEE Calculation Template", "Autonomous Maintenance Implementation Guide", "Planned Maintenance Schedule Template", "TPM Pillar Implementation Roadmap"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 4-7 created successfully for P24';

END $$;

COMMIT;
