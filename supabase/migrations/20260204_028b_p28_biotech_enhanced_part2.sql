-- THE INDIAN STARTUP - P28: Biotech & Life Sciences - Enhanced Content Part 2
-- Migration: 20260204_028b_p28_biotech_enhanced_part2.sql
-- Purpose: Continue P28 course content - Modules 7-12 (Days 31-60)
-- Depends on: 20260204_028a_p28_biotech_enhanced_part1.sql (assumed to create modules 1-6)

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
    v_mod_10_id TEXT;
    v_mod_11_id TEXT;
    v_mod_12_id TEXT;
BEGIN
    -- Get P28 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P28';

    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Product P28 not found. Please run part 1 migration first.';
    END IF;

    -- ========================================
    -- MODULE 7: GMP Manufacturing (Days 31-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'GMP Manufacturing for Biotech',
        'Master pharmaceutical and biotech manufacturing compliance - Schedule M requirements, WHO-GMP certification, facility design, cleanroom operations, quality systems, and preparation for regulatory inspections across CDSCO, WHO, US FDA, and EU GMP standards.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 31: Schedule M Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        31,
        'Schedule M GMP Requirements for Pharmaceuticals',
        'Schedule M of the Drugs and Cosmetics Rules sets the mandatory Good Manufacturing Practice (GMP) requirements for pharmaceutical manufacturing in India. Understanding and implementing Schedule M is the foundation for any biotech manufacturing operation, whether producing APIs, formulations, or biologics.

Historical Context and Evolution: Schedule M was significantly revised in 2018 to align with global GMP standards while maintaining India-specific requirements. The revision brought Indian GMP closer to WHO-GMP and PIC/S standards, making compliance easier for export-oriented manufacturers. Key changes included enhanced documentation requirements, stricter environmental controls, and updated qualification/validation expectations.

Schedule M Structure and Coverage: Part I covers general requirements applicable to all pharmaceutical manufacturers including organization and personnel, premises, equipment, documentation, production, quality control, and self-inspection. Part I-A specifies requirements for specific dosage forms: tablets, capsules, oral liquids, ointments, parenterals, and biologicals. Part I-B covers additional requirements for manufacturers of Active Pharmaceutical Ingredients (APIs). Part II addresses requirements for specific facilities like blood banks and radiopharmaceuticals.

Key Schedule M Requirements - Premises: Manufacturing premises must be designed to minimize contamination risk with logical flow of materials and personnel. Minimum space requirements: production area 10 sq m per workstation, quality control 25 sq m minimum. Environmental controls: temperature 25 plus/minus 2 degrees Celsius, relative humidity 45-55% for most operations. HVAC systems must provide 20-50 air changes per hour depending on area classification. Pressure differentials: minimum 15 Pa between adjacent areas of different cleanliness. Segregation requirements for penicillins, hormones, cytotoxics, and biologicals mandate completely separate facilities or rigorous containment.

Personnel Requirements: Qualified Person (QP) responsible for batch release must be a graduate in pharmacy or chemistry with minimum 2 years experience. Production and QC heads must have appropriate qualifications with 5+ years relevant experience. Training program mandatory: initial GMP training for all personnel, annual refresher training, job-specific training documented. Health monitoring: pre-employment medical examination, annual health checkups, exclusion policies for communicable diseases.

Documentation Requirements: Batch Manufacturing Record (BMR) for each production batch with deviation documentation. Batch Packaging Record (BPR) with reconciliation of packaging materials. Standard Operating Procedures (SOPs) for all critical operations - typically 200-500 SOPs for a mid-sized facility. Specifications for raw materials, in-process controls, and finished products. Stability data supporting shelf life claims with ongoing stability monitoring.

Quality Control Requirements: Separate QC department independent from production with adequate laboratory space and equipment. Testing per pharmacopoeial methods (Indian Pharmacopoeia, BP, USP as applicable). Sampling procedures ensuring representative samples from production batches. Release testing before distribution with certificate of analysis.

Manufacturing License Requirements: State Drug Licensing Authority (SLA) issues manufacturing license based on Schedule M compliance. Pre-license inspection by Drug Inspector to verify GMP compliance. License validity: 5 years with annual compliance verification. License conditions may specify products, processes, and capacity limits.

Schedule M vs International GMP: Schedule M is substantially aligned with WHO-GMP Part I and II. Key differences from US FDA cGMP (21 CFR Parts 210/211): US FDA has more detailed process validation requirements, data integrity expectations more explicitly stated in US framework. EU GMP Annex 1 for sterile products is more stringent than Schedule M for parenterals.',
        '["Conduct comprehensive Schedule M gap assessment for your facility - engage qualified consultant if needed to identify all compliance gaps", "Develop Schedule M compliance roadmap with timeline and budget - prioritize critical gaps affecting product quality and patient safety", "Create or update documentation system to meet Schedule M requirements - implement BMR, BPR, SOP, and specification formats", "Establish training program meeting Schedule M personnel requirements - develop training matrix and maintain training records"]'::jsonb,
        '["Schedule M Complete Text (2018 Revision) with clause-by-clause compliance guidance and interpretive notes", "Schedule M Gap Assessment Template covering all requirements with rating scale and evidence requirements", "Documentation System Implementation Guide with templates for BMR, BPR, SOPs, and specifications", "Training Program Framework meeting Schedule M requirements with sample training modules and assessment tools"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 32: WHO-GMP Certification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        32,
        'WHO-GMP Certification for Export Markets',
        'WHO-GMP certification is essential for biotech companies targeting export markets, particularly for UN procurement, government tenders in developing countries, and registration in WHO prequalification-accepting countries. India has over 600 WHO-GMP certified manufacturing sites, the highest globally.

WHO-GMP Certification Process: Application submitted to CDSCO with site master file, product details, and Schedule M compliance documentation. CDSCO coordinates inspection by WHO-trained inspectors (typically 2-3 inspectors over 3-5 days). Inspection covers manufacturing, quality control, quality assurance, and storage areas. Post-inspection: observations classified as critical, major, or other. Compliance report submitted to WHO if no critical observations or after corrective actions verified.

Inspection Focus Areas: Quality Management System: quality policy, quality manual, organizational structure, management review. Personnel: qualifications, training records, health monitoring, hygiene practices. Premises: facility design, material flow, environmental controls, maintenance. Equipment: qualification, calibration, maintenance, cleaning validation. Documentation: batch records, SOPs, specifications, validation protocols. Production: process validation, in-process controls, batch reconciliation. Quality Control: laboratory controls, stability studies, OOS investigation. Handling of materials: receipt, quarantine, sampling, release, rejection.

Typical Timeline and Costs: Application preparation: 2-3 months for documentation compilation. CDSCO processing: 1-2 months for application review. Inspection scheduling: 1-3 months depending on CDSCO and WHO schedules. Inspection: 3-5 days on-site. Post-inspection corrective actions: 1-6 months depending on findings. Total timeline: 6-15 months from application to certification. Costs: CDSCO fees Rs 50,000-2,00,000 depending on product range. Consultant fees Rs 5-20 lakh for preparation support. Facility upgrades: Rs 20 lakh to Rs 5 crore depending on gap severity.

Common Inspection Observations: Documentation deficiencies (35% of observations): incomplete batch records, unsigned documents, inadequate SOPs. Environmental control issues (25%): HVAC qualification gaps, environmental monitoring failures, cleanroom breaches. Equipment qualification gaps (20%): incomplete IQ/OQ/PQ, calibration lapses, inadequate maintenance records. Personnel training deficiencies (15%): missing training records, inadequate training content, no competency assessment. Laboratory issues (5%): OOS investigation gaps, reference standard management, analytical method validation.

Maintaining WHO-GMP Status: Annual self-inspections with documented corrective actions. Ongoing compliance monitoring through quality metrics. Re-inspection typically every 3-5 years or triggered by significant changes. Change control for any modifications affecting GMP compliance. Regulatory intelligence monitoring for WHO guidance updates.

WHO Prequalification Programme: For manufacturers targeting UN procurement (UNICEF, Global Fund, etc.). More rigorous than WHO-GMP with product-specific assessment. Requires submission of comprehensive product dossier in addition to site inspection. Invitation model: manufacturers must be invited based on WHO priority needs. Currently 39 Indian vaccine and pharmaceutical manufacturers are WHO prequalified.

Strategic Considerations for Biotech: For biologics: WHO-GMP plus specific guidance on biological products (WHO TRS 999, TRS 1016). Biosimilar manufacturers: consider WHO prequalification pathway for global access markets. Cell and gene therapy: evolving WHO guidance - monitor for applicable standards. API manufacturers: WHO prequalification of APIs enables use by prequalified finished product manufacturers.',
        '["Assess WHO-GMP readiness through comprehensive gap analysis against current WHO guidance documents", "Develop WHO-GMP certification project plan with milestones, responsibilities, and budget allocation", "Engage experienced consultant with WHO inspection track record to support preparation and mock inspection", "Prepare Site Master File meeting WHO format requirements - ensure accuracy and completeness of facility documentation"]'::jsonb,
        '["WHO GMP Guidelines (TRS 986, Annex 2) with implementation guidance for Indian manufacturers", "WHO-GMP Certification Roadmap with typical timeline and milestone checklist", "Site Master File Template meeting WHO format requirements with section-by-section guidance", "Common WHO Inspection Observations Database with corrective action examples and prevention strategies"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 33: Biotech Facility Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        33,
        'Biotech Manufacturing Facility Design',
        'Biotech manufacturing facilities require specialized design considerations beyond conventional pharmaceutical manufacturing due to the unique nature of biological production processes, containment requirements, and contamination control challenges. Proper facility design is critical for regulatory compliance and operational efficiency.

Facility Classification and Requirements: BSL-1 (Basic): Suitable for work with well-characterized agents of no known consistent disease risk. Standard laboratory practices, no special containment equipment required. Typical for recombinant DNA work with exempt organisms. BSL-2 (Moderate): For agents associated with human disease of varying severity. Controlled access, biosafety cabinets for aerosol-generating procedures. Required for work with most human cell lines, moderate-risk pathogens. Cost increment over BSL-1: 20-30% additional construction cost. BSL-3 (Enhanced): For agents with potential for respiratory transmission causing serious/lethal disease. Strict access control, decontamination of all waste, HEPA filtration of exhaust. Required for vaccine manufacturing using live attenuated pathogens. Cost increment over BSL-2: 50-100% additional construction cost.

Cleanroom Design for Biologics: Grade A (ISO 5): High-risk operations like filling, stopper placement, making aseptic connections. Less than 100 particles per cubic meter of 0.5 microns or larger at rest. Typically achieved in laminar flow workstations or isolators. Grade B (ISO 7): Background environment for Grade A zones. 3,520 particles per cubic meter at rest. Critical for personnel gowning and material airlocks. Grade C (ISO 8): For less critical manufacturing steps. 352,000 particles per cubic meter at rest. Suitable for solution preparation and non-sterile processing. Grade D (ISO 8): For earliest manufacturing steps with less stringent requirements. Used for equipment preparation and initial processing.

HVAC System Design: Air handling units sized for 20-50 air changes per hour depending on room grade. HEPA filtration (H14 minimum) for Grade A/B areas, pre-filters and medium-efficiency filters for Grade C/D. Pressure cascade: positive pressure from cleanest to less clean areas (minimum 15 Pa differential). Temperature control: 18-25 degrees Celsius typical for biologics production. Humidity control: 45-55% RH to prevent microbial growth and electrostatic discharge. Dedicated air handling for containment areas (BSL-2/3) with 100% exhaust (no recirculation).

Utility Systems: Purified Water: USP Purified Water specification for cleaning, buffer preparation. Water for Injection (WFI): For final product contact and critical rinses. Storage at 80+ degrees Celsius or ambient with frequent cycling. Distribution via 316L stainless steel with minimum 1.5 m/s velocity. Clean Steam: For sterilization of equipment and autoclave operations. Process Gases: Nitrogen, carbon dioxide, oxygen for cell culture. Point-of-use filtration (0.2 micron) for all critical gases.

Single-Use Technology Considerations: Growing adoption of single-use bioreactors, bags, and tubing in biotech manufacturing. Advantages: reduced cleaning validation, faster changeover, lower cross-contamination risk. Disadvantages: higher consumable costs, extractables/leachables concerns, waste management. Facility design implications: reduced utility requirements but increased storage for disposables. Typical cost comparison: single-use facility 40% lower capital cost but 20-30% higher operating cost.

Facility Layout Principles: Unidirectional flow of materials from receipt through processing to finished product. Personnel flow separated from material flow where possible. Gowning sequence: street clothes to facility gowning to cleanroom gowning. Airlocks between different classification zones with interlocking doors. Equipment layout minimizing travel distances while maintaining separation.

Cost Estimates for Biotech Facilities in India: Small-scale R&D/pilot facility (500-1000 sq m): Rs 5-15 crore. Medium-scale commercial facility (2000-5000 sq m): Rs 30-80 crore. Large-scale multi-product facility (10000+ sq m): Rs 150-400 crore. Key cost drivers: cleanroom classification, containment level, degree of automation.',
        '["Define facility requirements based on product type, process, and regulatory standards", "Engage specialized biotech facility design firm with Indian regulatory experience", "Develop facility layout optimizing material flow, personnel flow, and contamination control", "Create equipment and utility specifications meeting process and regulatory requirements"]'::jsonb,
        '["Biotech Facility Design Guidelines combining WHO, US FDA, and EU requirements with India-specific considerations", "Cleanroom Classification Requirements Matrix by operation type and product category", "HVAC Design Specifications for biotech manufacturing with calculation methods and example designs", "Facility Cost Estimation Model with parametric costing based on size, classification, and containment level"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 34: Quality Systems for Biotech
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        34,
        'Quality Management Systems for Biotech Manufacturing',
        'A robust Quality Management System (QMS) is essential for biotech manufacturing, encompassing quality assurance, quality control, and regulatory compliance activities. The QMS must be designed to ensure consistent product quality while meeting the stringent requirements of biological product manufacturing.

ICH Q10 Pharmaceutical Quality System Framework: ICH Q10 provides a comprehensive model for effective pharmaceutical quality management that is increasingly expected for biotech manufacturers. Management Responsibility: Quality policy and objectives communicated throughout organization. Management review of quality system effectiveness at least annually. Resource allocation ensuring adequate staffing, training, and equipment. Process Performance and Product Quality Monitoring: Establish meaningful quality metrics (batch success rate, deviation trends, CAPA effectiveness). Statistical process control where applicable. Corrective and Preventive Action (CAPA) System: Systematic approach to investigating deviations, identifying root causes, and implementing effective corrective/preventive actions. Change Management: Comprehensive change control system covering equipment, processes, materials, and documentation. Knowledge Management: Capture and maintain organizational knowledge about products and processes.

Quality Assurance Functions: Batch disposition: QA review and release of each batch based on complete batch record review. Deviation management: documentation, investigation, and CAPA for all deviations from procedures or specifications. Change control: evaluation and approval of all changes that may affect product quality. Supplier qualification: assessment and ongoing monitoring of critical material suppliers. Document control: creation, approval, distribution, and revision of all GMP documents. Training administration: ensuring all personnel are trained and qualified for their roles. Self-inspection: regular internal audits to verify GMP compliance and identify improvement opportunities.

Quality Control for Biologics: Analytical Testing: Identity testing confirming product is what it claims to be. Potency testing measuring biological activity. Purity testing for product-related impurities (aggregates, variants, fragments). Safety testing including sterility, endotoxin, mycoplasma, adventitious agents. Stability Testing: ICH Q1A compliant stability program with accelerated and long-term conditions. Testing at 0, 3, 6, 9, 12, 18, 24 months minimum for biologics. Photostability where applicable. Reference Standards: Primary reference standard characterized extensively. Working reference standards calibrated against primary. Trend monitoring for reference standard stability.

Data Integrity Requirements: ALCOA+ principles: Attributable, Legible, Contemporaneous, Original, Accurate plus Complete, Consistent, Enduring, Available. Electronic records: 21 CFR Part 11 and EU Annex 11 compliance for computerized systems. Audit trails: immutable records of all data changes with user identification and timestamp. Data review: verification procedures for critical data before batch release.

Validation Master Plan: Process Validation: Stage 1 (Process Design), Stage 2 (Process Qualification), Stage 3 (Continued Process Verification). For biologics: consider process characterization studies defining proven acceptable ranges. Cleaning Validation: residue limits for product, cleaning agents, and microbial contamination. Analytical Method Validation: ICH Q2 requirements for accuracy, precision, specificity, linearity, range. Computer System Validation: GAMP 5 methodology for GxP-relevant computerized systems.

Quality Metrics for Biotech Manufacturing: Batch success rate (target >95% for mature processes). Right first time for batch record completion. Deviation closure within target time (typically 30-60 days). CAPA effectiveness rate. OOS investigation rate. Customer complaint trend. Supplier non-conformance rate.',
        '["Develop or enhance QMS to meet ICH Q10 framework requirements for pharmaceutical quality system", "Implement comprehensive deviation management and CAPA system with root cause analysis methodology", "Establish validation master plan covering process, cleaning, analytical, and computer system validation", "Create quality metrics dashboard tracking key performance indicators for manufacturing quality"]'::jsonb,
        '["ICH Q10 Pharmaceutical Quality System Implementation Guide with biotech-specific considerations", "QMS Documentation Suite including quality manual template, SOP templates, and form library", "Deviation and CAPA Management System Design with investigation methodology and effectiveness tracking", "Validation Master Plan Template for biotech manufacturing with product-specific appendices"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 35: Regulatory Inspection Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        35,
        'Preparing for Regulatory Inspections',
        'Regulatory inspections are a critical milestone for biotech manufacturers, whether for initial licensing, WHO-GMP certification, or market authorization in regulated markets. Systematic preparation and a culture of inspection readiness are essential for successful outcomes.

Types of Regulatory Inspections: Pre-Approval Inspection (PAI): Conducted before new product approval to verify manufacturing capability. Focus: process validation, batch records, facility compliance, data integrity. Typical duration: 3-5 days for biologics. Routine GMP Inspection: Scheduled inspections to verify ongoing compliance. Frequency: every 1-3 years depending on product risk and regulatory authority. For-Cause Inspection: Triggered by complaints, adverse events, or compliance concerns. Typically unannounced with focused scope on identified issues.

Inspection by Regulatory Authority: CDSCO (India): Focus on Schedule M compliance, license conditions, product-specific requirements. Inspectors: Drug Inspectors from State and Central authorities. WHO: WHO-trained inspectors (often from CDSCO) focusing on WHO-GMP guidelines. Detailed site master file review before inspection. US FDA: cGMP compliance (21 CFR 210/211), data integrity emphasis, 483 observations. Foreign inspections based on import alerts, new applications, or routine surveillance. EU GMP: EudraGMDP database listing, joint inspections for EU authorization. Focus on EU GMP Annex compliance specific to product type.

Inspection Readiness Program: Continuous Readiness (not just pre-inspection preparation): Regular self-inspections by trained internal auditors. Mock inspections by external consultants annually. Gap tracking and timely closure of identified deficiencies. Management review of inspection readiness status. Documentation Readiness: All documents current and accessible. Batch records complete with no pending deviations. Validation reports current and available. Training records up to date. Personnel Readiness: Key personnel knowledgeable about their areas. SMEs identified for each functional area. Escort training for personnel who will accompany inspectors. Back-room team prepared for document retrieval and question research.

During the Inspection: Opening meeting: present company overview, quality highlights, facility tour orientation. Facility tour: clean, organized, activities normal (not staged). Document requests: prompt retrieval, no document discovery issues. Daily wrap-up meetings: understand observations, begin response preparation. Control room: designated area for document review, copying, and team coordination.

Responding to Observations: US FDA 483 Response: Submit within 15 business days (recommended). Acknowledge observation, describe root cause, detail CAPA with timeline. Evidence of completed actions strengthens response. EU/WHO Observations: Response timeline specified in inspection close-out letter (typically 30-60 days). Classify observations and prioritize critical/major items. Include evidence of corrective action completion.

Common Biotech-Specific Observations: Process validation gaps: inadequate characterization, insufficient batch data. Environmental monitoring: trending issues, investigation of excursions. Aseptic processing: media fill failures, gowning qualification issues. Cell bank management: inadequate characterization, storage monitoring. Raw material control: supplier qualification, incoming testing.

Post-Inspection Activities: CAPA tracking: ensure all committed actions completed on schedule. Effectiveness verification: confirm corrective actions prevent recurrence. Knowledge sharing: cascade lessons learned across organization. Regulatory intelligence: track similar observations at other companies.',
        '["Implement continuous inspection readiness program with regular self-inspections and gap tracking", "Conduct mock inspection with qualified external consultant simulating target regulatory authority approach", "Develop inspection response playbook with roles, responsibilities, and communication protocols", "Create back-room operations procedure ensuring efficient document retrieval and question response"]'::jsonb,
        '["Regulatory Inspection Preparation Checklist by authority type (CDSCO, WHO, US FDA, EU GMP)", "Mock Inspection Protocol with scope definition, execution guidance, and observation handling", "Inspection Response Playbook with personnel roles, document management, and daily wrap-up protocols", "Post-Inspection CAPA Tracking System ensuring commitment completion and effectiveness verification"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: CDSCO Approvals & Drug Registration (Days 36-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'CDSCO Approvals & Drug Registration',
        'Navigate the complete drug registration process in India - New Drug Applications, Abbreviated NDAs for generics, biosimilar regulatory pathways, import licensing, and post-approval compliance requirements under the Drugs and Cosmetics Act.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 36: CDSCO Structure and New Drug Definition
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        36,
        'CDSCO Structure and New Drug Classification',
        'The Central Drugs Standard Control Organization (CDSCO) is the national regulatory authority for pharmaceuticals in India, responsible for approval of new drugs, clinical trials, medical devices, and import licensing. Understanding CDSCO organization and the classification of new drugs is essential for regulatory strategy.

CDSCO Organizational Structure: Drugs Controller General of India (DCGI): Head of CDSCO, final approval authority for new drugs. Deputy DCG (India): Multiple deputies handling different product categories and functions. Assistant DCGs: Regional and functional responsibilities. Divisions: New Drug Division, Medical Devices Division, Cosmetics Division, Biological Division. Zonal Offices: Mumbai, Kolkata, Chennai, Ghaziabad, Hyderabad, Ahmedabad - handle import licensing and routine approvals. State Drug Controllers: Manufacture licensing, retail licensing, enforcement.

New Drug Definition Under D&C Act: A drug is considered NEW DRUG if: Not previously approved in India for any indication. Previously approved drug now proposed for new indication. Previously approved drug with new dosage form, route, or strength. Fixed dose combination not previously approved. Drug containing new excipient or delivery system. New Drug status: Remains NEW DRUG for 4 years after initial approval (for monitoring and reporting requirements).

Categories of New Drug Applications: Category A (New Chemical Entity - NCE): Entirely new molecular entity not approved anywhere globally. Requires complete preclinical and clinical development. Most stringent requirements and longest approval timeline. Category B (New Drug - Approved Elsewhere): New molecular entity approved in specified countries (US, UK, EU, Japan, Australia, Canada). May leverage global development data with Indian bridging studies. Accelerated pathway possible based on global approval.

Category C (NDSR - New Drug Already Approved in India for Different Indication): Existing approved drug seeking additional indication. Requires clinical data supporting new indication. May leverage post-marketing experience. Category D (Fixed Dose Combinations): Two or more drugs combined in single formulation. Requires justification for combination and appropriate clinical data. FDC rationality increasingly scrutinized.

Form 44 Application: Standard application form for new drug approval. Key sections: Administrative information, applicant details. Drug substance and drug product specifications. Nonclinical study summaries. Clinical study summaries and reports. Proposed labeling and prescribing information. Manufacturing information and GMP compliance. Supporting documents: study reports, certificates, undertakings.

Submission Through SUGAM Portal: Online submission mandatory since 2019. Create account, upload documents, pay fees, track status. Document requirements: PDF format, specified file naming convention. Fee structure: Rs 50,000 for Indian applicants, Rs 1,00,000 for foreign applicants (Category A/B).

Subject Expert Committees (SECs): Provide scientific and technical review of applications. Biological SEC: Reviews biologics, vaccines, biosimilars. New Drug SEC: Reviews NCEs and new drugs. Medical Devices SEC: Reviews Class C/D devices. SEC meetings: Typically monthly, applicant presentation invited for complex applications.',
        '["Study CDSCO organizational structure and identify relevant division for your product category", "Determine new drug classification for your product - understand regulatory pathway implications", "Register on SUGAM portal and familiarize with submission process and document requirements", "Identify relevant Subject Expert Committee and understand review process and meeting schedule"]'::jsonb,
        '["CDSCO Organizational Guide with contact information for relevant divisions and zonal offices", "New Drug Classification Decision Tree helping determine Category A, B, C, or D classification", "SUGAM Portal User Guide with step-by-step submission process and troubleshooting tips", "Form 44 Preparation Checklist with document requirements and formatting specifications"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 37: New Drug Application Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        37,
        'New Drug Application (NDA) Submission and Approval',
        'The New Drug Application (NDA) process in India has been modernized under the New Drugs and Clinical Trials Rules 2019, with defined timelines and streamlined procedures. Understanding the complete approval pathway enables effective planning and execution of regulatory strategy.

NDA Submission Requirements by Category: Category A (NCE): Complete CTD format dossier with all modules. Indian Phase III clinical trial data typically required (unless waiver granted). Phase I study in Indian subjects if not conducted globally with Indian sites. Bioequivalence not applicable for NCEs.

Category B (New Drug Approved Elsewhere): Abbreviated pathway available if approved in reference countries. Global clinical data may be accepted with bridging study justification. Bridging study typically Phase III in 100-500 Indian patients. CDSCO may waive Indian trial if disease prevalence/treatment response similar globally. Marketing authorization from reference country and Certificate of Pharmaceutical Product (CPP) required.

Category C (New Indication): Clinical data supporting efficacy and safety for new indication. May leverage post-marketing data and real-world evidence. Label extension application with updated prescribing information.

CTD Format Requirements: Module 1: Administrative and prescribing information (India-specific). Module 2: Summaries - Quality, Nonclinical, Clinical overviews and summaries. Module 3: Quality (Chemistry, Manufacturing, Controls). Module 4: Nonclinical study reports. Module 5: Clinical study reports.

Timeline for NDA Review: Day 0: Complete application submitted through SUGAM. Day 15: Application screened for completeness. Day 30: Deficiency letter issued if application incomplete. Day 45: SEC review scheduled for complete applications. Day 60-90: SEC recommendation to DCGI. Day 90-120: Approval decision communicated. Total timeline: 4-6 months for Category B, 12-18 months for Category A (with Indian clinical trials). Clock stops during applicant response time (not counted in timeline).

Accelerated Approval Pathways: Orphan Drugs: Expedited review for rare diseases (prevalence less than 5 per 10,000). Clinical trial requirements may be relaxed. Rolling submission permitted. Global Health Emergency: Emergency Use Authorization pathway (demonstrated during COVID-19). Abbreviated data requirements with post-authorization commitments. NDSR Pathway: For approved drugs with new indication based on substantial evidence. May not require separate clinical trial if supported by published literature.

Post-Approval Requirements: Periodic Safety Update Reports (PSURs): Every 6 months for first 2 years, annually for years 3-4. Phase IV commitments: Post-marketing studies if required as condition of approval. Pharmacovigilance: Adverse event reporting within 15 days (serious) or periodic (non-serious). Labeling updates: Submission of changes based on post-marketing safety data. New Drug monitoring: Enhanced reporting requirements for 4 years after approval.

Common NDA Deficiencies: Quality deficiencies (40%): Insufficient validation data, stability data gaps, specification issues. Clinical deficiencies (35%): Inadequate safety database, efficacy endpoint concerns, patient population issues. Administrative deficiencies (25%): Missing documents, fee issues, format non-compliance.',
        '["Prepare CTD format dossier meeting CDSCO requirements with all five modules complete", "Develop bridging study strategy if seeking abbreviated pathway based on global approvals", "Engage regulatory consultant with CDSCO track record to review submission strategy and documents", "Create NDA timeline with key milestones, potential clock-stop events, and contingency planning"]'::jsonb,
        '["CTD Format Guide for CDSCO with India-specific Module 1 requirements and document checklist", "Bridging Study Design Framework determining when bridging is required and optimal study design", "NDA Deficiency Response Best Practices with common deficiency categories and effective responses", "NDA Timeline Planning Tool with milestone tracking and scenario analysis capabilities"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 38: ANDA for Generic Drugs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        38,
        'Abbreviated New Drug Application (ANDA) for Generics',
        'Generic drug approval in India follows an abbreviated pathway that relies on demonstrating bioequivalence to the innovator reference product rather than conducting full clinical trials. This pathway has made India the pharmacy of the world, with Indian generics serving 20% of global demand.

Generic Drug Definition: Same active ingredient as reference listed drug. Same strength, dosage form, and route of administration. Bioequivalent to reference product (within defined limits). May differ in inactive ingredients, appearance, packaging.

Reference Listed Drug (RLD) Requirements: Must be approved in India or specified reference countries (US, UK, EU, Japan, Australia, Canada). If innovator not marketed in India, import and testing of reference product may be required. Reference product must be procured from approved market (not gray market).

Bioequivalence Study Requirements: Single-dose, randomized, crossover design typically required. Fasting and fed state studies depending on product characteristics. 24-36 healthy volunteers typically (may be higher for high-variability drugs). Primary endpoints: Cmax, AUC0-t, AUC0-infinity. Acceptance criteria: 90% CI for test/reference ratio within 80.00-125.00%. Narrow therapeutic index drugs: Tightened limits (90.00-111.11%).

Study Site Requirements: CDSCO-approved Bioavailability/Bioequivalence study centers. 180+ approved BA/BE centers in India. Study protocol and ethics committee approval required. CDSCO notification before study initiation.

Biowaiver Provisions: BCS Class I drugs (high solubility, high permeability): In vitro dissolution comparison may substitute for BE study. BCS Class III drugs: Biowaiver possible with dissolution comparison. Lower strengths: Biowaiver for proportionally similar lower strengths if highest strength has BE data. Certain dosage forms: Solutions, gases, topicals with qualification.

ANDA Documentation: Form 44 (abbreviated): Applicant information, product details. Comparative dissolution data against reference product. Bioequivalence study report (or biowaiver justification). CMC documentation (manufacturing, specifications, stability). Compliance with pharmacopoeial standards (IP, BP, or USP).

Manufacturing Approval: Manufacturing site must hold valid Drug Manufacturing License for the specific dosage form. Schedule M compliance verification. Product-specific process validation. Site inspection may be conducted prior to product approval.

Timeline and Fees: Application fee: Rs 15,000 for Indian applicants. Review timeline: 60-90 days for straightforward applications. Complex applications (new excipients, modified release): May take longer. Marketing approval: Form 46 issued after satisfactory review.

Challenges in Generic Development: Reference product selection: Ensuring appropriate comparator. Bioequivalence failure: 30-40% failure rate for some complex products. Patent considerations: Freedom to operate analysis required. Pricing constraints: NPPA price controls under DPCO 2013.

Complex Generics: Modified release products: Additional in-vitro release testing, potentially multiple BE studies. Locally acting products: May require clinical endpoint studies. Peptide generics: Between generic and biosimilar pathway complexity. Topical products: Dermatopharmacokinetic or clinical endpoint studies.',
        '["Identify appropriate reference listed drug and procurement source for comparative testing", "Design bioequivalence study protocol meeting CDSCO requirements and select approved BA/BE center", "Evaluate biowaiver potential for your product based on BCS classification and dosage form", "Prepare ANDA documentation package with CMC, BE data, and compliance certificates"]'::jsonb,
        '["Reference Listed Drug Selection Guide with procurement strategies and equivalence documentation", "Bioequivalence Study Design Protocol Template meeting CDSCO and ICH requirements", "Biowaiver Assessment Framework determining eligibility and documentation requirements", "ANDA Preparation Checklist with document requirements and common deficiency avoidance"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 39: Biosimilar Regulatory Pathway
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        39,
        'Biosimilar Regulatory Pathway in India',
        'India was among the first countries to establish a regulatory pathway for biosimilars with the Similar Biologics Guidelines issued in 2012 (revised 2016). The Indian biosimilar market is valued at Rs 15,000+ crore with strong growth driven by affordable access to biological therapies.

Definition of Similar Biologic (Biosimilar): A biological product that is similar in terms of quality, safety, and efficacy to an already approved reference biological product. Similar is not identical: molecular complexity means exact replication is not possible. Biosimilarity demonstrated through totality of evidence approach.

Reference Biologic Requirements: Must be approved in India or innovator market (US, EU). If reference not approved in India, submission must include dossier comparing against reference from approved market. Reference product characterization data required for comparability.

Biosimilar Development Pathway: Step 1 - Comprehensive Physicochemical Characterization: Primary structure (amino acid sequence, glycosylation). Higher-order structure (secondary, tertiary, quaternary). Charge variants, size variants, glycan profile. Process-related impurities (HCP, DNA, leachables). Step 2 - Functional Characterization: Receptor binding studies. Biological activity assays (potency). Effector function testing where relevant. Step 3 - Comparative Nonclinical Studies: In vitro comparison (may be sufficient for highly similar products). In vivo studies if warranted by analytical differences. PK studies in appropriate species. Step 4 - Comparative Clinical Studies: Comparative PK/PD study in healthy volunteers or patients. Comparative efficacy/safety trial (typically Phase III). Immunogenicity assessment throughout development.

Clinical Trial Requirements: Comparative PK/PD Study: Demonstrates similar pharmacokinetics and pharmacodynamics. Typically single-dose, parallel or crossover design. Primary endpoint: PK parameters within equivalence margins. Comparative Efficacy/Safety Trial: Sensitive indication and population to detect differences. Equivalent or non-inferior design. Duration sufficient to assess efficacy and safety. Sample size: typically 300-600 patients depending on endpoint variability. Immunogenicity: Pre-dose and multiple post-dose samples. Comparison of immunogenicity rates and clinical impact.

Similar Biologics Guidelines 2016 Key Provisions: Totality of evidence approach: No single study determinative. Analytical similarity: Extensive characterization required with head-to-head comparison. Clinical flexibility: If analytical and functional similarity demonstrated, clinical requirements may be reduced. Extrapolation: Approval for indications not directly studied may be granted based on totality of evidence. Interchangeability: Not specifically addressed (unlike US framework).

Documentation Requirements: CTD format dossier with biosimilar-specific content. Module 2: Biosimilar-specific quality, nonclinical, clinical overviews. Module 3: Detailed characterization and comparability data. Module 4: Nonclinical comparability studies. Module 5: Clinical comparability studies.

Indian Biosimilar Market Leaders: Biocon: Insulin glargine, trastuzumab, adalimumab, bevacizumab. Dr. Reddys: Rituximab, darbepoetin. Zydus: Adalimumab, pegfilgrastim. Intas: Rituximab, bevacizumab.

Regulatory Timeline: Pre-submission meeting advisable for complex biosimilars. Complete submission to approval: 12-18 months typically. SEC review of biosimilars by Biological SEC.',
        '["Conduct comprehensive reference product characterization establishing comparability baseline", "Design biosimilar development plan with analytical, functional, nonclinical, and clinical components", "Assess clinical trial requirements based on analytical similarity and therapeutic area guidance", "Prepare biosimilar dossier in CTD format with comparability data throughout all modules"]'::jsonb,
        '["Similar Biologics Guidelines 2016 with interpretive guidance and implementation examples", "Biosimilar Analytical Characterization Protocol covering physicochemical and functional testing", "Biosimilar Clinical Development Framework with trial design guidance by therapeutic area", "Biosimilar Dossier Template with comparability-focused content requirements"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 40: Import License and Post-Approval
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        40,
        'Import Licensing and Post-Approval Compliance',
        'Import of pharmaceuticals and biologics into India requires specific licensing from CDSCO, with requirements varying based on product category and registration status. Post-approval compliance involves ongoing pharmacovigilance, periodic reporting, and lifecycle management activities.

Import License Requirements: Form 10 (Registration Certificate): Required for all drugs imported for sale. Issued by CDSCO after product registration approval. Validity: 3 years, renewable. Names specific importer and manufacturer. Form 8 (Import License): Permits physical import of registered drug. Issued by CDSCO zonal offices. Specifies quantity limits (may be unlimited for registered products). Required for each port of entry.

Import Registration Process: Submit Form 40 application through SUGAM portal. Documentation: Product dossier (CTD or national format for older products). Certificate of Pharmaceutical Product (CPP) or Free Sale Certificate. GMP certificate of manufacturing site. Authorization letter from manufacturer. Stability data for Indian climatic conditions (Zone IVa/IVb). Fees: Rs 1,00,000 registration fee for new drugs, Rs 50,000 for generics.

Non-Resident Manufacturer Requirements: Must appoint Authorized Indian Agent with Form 41 submission. Agent responsible for: Regulatory correspondence, adverse event reporting, import and distribution. Agent qualifications: Must be a company registered in India with pharmaceutical expertise.

Import Testing Requirements: First three batches: 100% testing by CDSCO-approved laboratory. Subsequent batches: Random sampling (typically 10-20% of imports). Test protocols based on registered specifications. Release only after satisfactory test report.

Post-Approval Compliance: Pharmacovigilance: Establish local PV system or contract with PV service provider. Appoint Qualified Person for Pharmacovigilance (QPPV). Report serious adverse events within 15 calendar days. Submit Periodic Safety Update Reports per schedule. Product Quality Complaints: Document and investigate all quality complaints. Report confirmed quality issues to CDSCO. Implement CAPA for systemic issues. Annual Reports: Product-specific annual reports to CDSCO. Include safety data, quality data, distribution information.

Variations and Lifecycle Management: Type I Variations (Minor): Administrative changes, minor specification changes. Notification to CDSCO (no approval required). Type II Variations (Major): Significant changes to manufacturing, specifications, or labeling. Require CDSCO approval before implementation. Supporting data requirements based on change type. Line Extensions: New strengths, dosage forms, or indications. Treated as new applications with abbreviated requirements.

Pricing and Market Access: NPPA/DPCO Compliance: Essential drugs under price control (Schedule I of DPCO 2013). Ceiling price calculation for scheduled formulations. Non-scheduled drugs: Annual price increase capped at 10%. Market Authorization Transfer: Original manufacturer consent required. Form 29 application to CDSCO. Regulatory history transfers with product.

Compliance Monitoring: CDSCO post-marketing surveillance. State FDA inspections of distribution chain. Adverse event investigation triggers. Quality sampling from market.',
        '["Prepare import registration application with complete documentation and appropriate authorizations", "Establish pharmacovigilance system meeting Indian regulatory requirements for adverse event management", "Implement variation management process for ongoing lifecycle changes", "Ensure pricing compliance with DPCO requirements for applicable product categories"]'::jsonb,
        '["Import Registration Application Guide with Form 40 requirements and supporting documentation", "Pharmacovigilance System Setup Checklist for importers including QPPV requirements", "Variation Classification Guide determining Type I vs Type II for common changes", "DPCO Pricing Compliance Framework with ceiling price calculation methodology"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: BIRAC & Government Funding (Days 41-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'BIRAC & Government Funding',
        'Access biotech funding from government sources - BIRAC schemes (BIG Rs 50 lakh, SBIRI Rs 1 crore, AcE Fund), DBT programs, state biotechnology initiatives, and strategic grant application techniques for biotech startups.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 41: BIRAC Overview and Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        41,
        'BIRAC Programs for Biotech Startups',
        'The Biotechnology Industry Research Assistance Council (BIRAC) is the premier government agency supporting biotech innovation in India. Established in 2012 under the Department of Biotechnology (DBT), BIRAC has funded over 1,500 startups and SMEs with grants exceeding Rs 3,000 crore.

BIRAC Mission and Mandate: Bridge gap between academia and industry in biotechnology. Support biotech startups and SMEs through funding and incubation. Develop innovation ecosystem for biotechnology sector. Enable affordable product development addressing national priorities.

Core BIRAC Programs: Biotechnology Ignition Grant (BIG): Purpose: Early-stage proof of concept funding. Amount: Up to Rs 50 lakh. Duration: 18 months. Eligibility: Startups, entrepreneurs, scientists with innovative ideas. Focus areas: Healthcare, agriculture, industrial biotech, clean energy. Success rate: Approximately 5-10% of applications funded.

Small Business Innovation Research Initiative (SBIRI): Purpose: Support product/technology development in SMEs. Amount: Phase I up to Rs 50 lakh (proof of concept), Phase II up to Rs 1 crore (product development). Duration: Phase I 18 months, Phase II 36 months. Eligibility: Indian companies with biotech focus. Focus: Later-stage development with clear commercialization path.

Biotechnology Industry Partnership Programme (BIPP): Purpose: Support high-risk, high-reward translational research. Amount: Up to Rs 10 crore (50-70% of project cost as soft loan). Duration: Up to 5 years. Eligibility: Indian companies with R&D capability. Focus: Advanced development, clinical trials, scale-up.

Sparsh (Social Innovation Programme for Products: Affordable and Relevant to Societal Health): Purpose: Address unmet health needs of developing countries. Amount: Variable based on project scope. Focus: Vaccines, diagnostics, therapeutics for neglected diseases.

Accelerating Entrepreneurs (AcE) Fund: Purpose: Equity funding for BIRAC-supported startups. Amount: Rs 25 lakh to Rs 3 crore. Stage: Seed and early-stage equity. Structure: BIRAC invests alongside other investors (matching investment).

BioNEST (Bioincubators Nurturing Entrepreneurship for Scaling Technologies): Network of 70+ BIRAC-supported bioincubators across India. Provides physical infrastructure, mentorship, and networking. Resident startups eligible for BIRAC funding with incubator endorsement.

BIRAC Application Process: Call for Proposals: Published on BIRAC website (birac.nic.in) periodically. Continuous submission for some programs (BIG). Specific windows for larger programs. Online Application: Through BIRAC portal with detailed project proposal. Technical and business components. Team information and institutional support letters. Evaluation Process: Preliminary screening for eligibility. Expert panel review of technical merit. Site visit for shortlisted candidates. Funding committee decision.

Success Factors for BIRAC Applications: Innovation: Clear differentiation from existing solutions. Impact: Addressable market and societal benefit. Team: Technical expertise and entrepreneurial capability. Feasibility: Realistic timelines and milestones. Scalability: Path to commercial viability.',
        '["Review BIRAC programs and identify most appropriate scheme for your development stage and funding needs", "Register on BIRAC portal (birac.nic.in) and monitor call for proposals relevant to your technology area", "Connect with BioNEST incubator for institutional support and guidance on BIRAC applications", "Prepare preliminary project concept aligned with BIRAC focus areas and evaluation criteria"]'::jsonb,
        '["BIRAC Program Comparison Guide with eligibility, funding amounts, and typical timelines", "BIRAC Application Success Strategies based on analysis of funded projects", "BioNEST Incubator Directory with location, focus areas, and contact information", "BIRAC Project Concept Development Framework for application preparation"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 42: BIG Grant Application
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        42,
        'Biotechnology Ignition Grant (BIG) Application Strategy',
        'The Biotechnology Ignition Grant (BIG) is BIRAC's flagship program for early-stage biotech entrepreneurs. With funding up to Rs 50 lakh for proof-of-concept work, BIG has been instrumental in launching many successful Indian biotech ventures.

BIG Program Details: Funding Amount: Up to Rs 50 lakh (non-dilutive grant). Duration: 18 months maximum. Applicant Categories: Individual entrepreneurs, startups (registered less than 5 years), scientists/faculty spinning out research. Host Institution: Must be executed through recognized R&D institution or incubator. BIRAC empaneled institutions preferred.

Eligible Technology Areas: Healthcare: Therapeutics, diagnostics, medical devices, digital health. Agriculture: Crop improvement, animal health, aquaculture, food processing. Industrial Biotechnology: Biofuels, bioremediation, industrial enzymes. Emerging Areas: Synthetic biology, gene editing, microbiome research.

Application Components: Executive Summary: One-page overview of innovation, impact, and team. Problem Statement: Clear articulation of unmet need being addressed. Proposed Solution: Technical approach with scientific rationale. Innovation and Novelty: What makes your approach unique and protectable. Proof of Concept Plan: Specific milestones achievable within 18 months. Market Analysis: Target market, competitive landscape, commercialization potential. Team Profile: Qualifications, relevant experience, and commitment. Budget: Detailed breakdown with justification. Institutional Support: Letter from host institution confirming facilities and support.

Budget Guidelines: Manpower: Up to 40% of budget for project personnel. Consumables: Chemicals, reagents, biologicals for experiments. Equipment: Small equipment purchases (major equipment through institutional facilities). Travel: Conferences, training, collaboration visits. Institutional Overhead: Up to 15% for host institution.

Evaluation Criteria: Innovation (30%): Novelty of approach, differentiation from existing solutions. Scientific Merit (25%): Technical feasibility, sound methodology. Team Capability (20%): Relevant expertise, entrepreneurial potential. Impact Potential (15%): Market size, societal benefit. Execution Plan (10%): Realistic milestones, appropriate budget.

Application Timeline: Submission: Rolling basis or specific call windows. Preliminary Screening: 2-4 weeks. Expert Review: 4-6 weeks. Presentation: Shortlisted applicants present to committee. Decision: 2-4 weeks after presentation. Total: 3-5 months from submission to funding decision.

Common Pitfalls to Avoid: Overly ambitious scope: Focus on achievable proof of concept, not full product development. Unclear innovation: Articulate specific novel elements clearly. Weak team justification: Demonstrate relevant expertise and commitment. Unrealistic budget: Ensure costs align with proposed activities. Poor institutional linkage: Secure strong host institution support.

Post-Award Requirements: Quarterly progress reports. Financial utilization certificates. Milestone achievement documentation. IP disclosure and registration. Final project report with results and future plans.',
        '["Prepare comprehensive BIG application addressing all evaluation criteria with compelling narrative", "Identify and confirm host institution (incubator or R&D institution) willing to support your project", "Develop realistic 18-month proof-of-concept plan with specific, measurable milestones", "Create detailed budget with line-item justification aligned with project activities"]'::jsonb,
        '["BIG Application Template with section-by-section guidance and character limits", "BIG Budget Preparation Guide with allowable cost categories and justification requirements", "Host Institution Selection Criteria including BIRAC-empaneled incubator list", "BIG Success Stories showcasing funded projects and their outcomes"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 43: SBIRI and BIPP Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        43,
        'SBIRI and BIPP for Advanced Development',
        'As biotech ventures progress beyond proof of concept, BIRAC's Small Business Innovation Research Initiative (SBIRI) and Biotechnology Industry Partnership Programme (BIPP) provide substantial funding for product development and commercialization. These programs have supported development of vaccines, diagnostics, and therapeutics now in clinical use.

SBIRI Program Details: Phase I (Proof of Concept): Amount: Up to Rs 50 lakh grant. Duration: 18 months. Focus: Establish technical feasibility and preliminary efficacy. Deliverables: Proof of concept data, preliminary regulatory strategy.

Phase II (Product Development): Amount: Up to Rs 1 crore (50% grant, 50% soft loan). Duration: Up to 36 months. Eligibility: Successful Phase I completion or equivalent development stage. Focus: Prototype development, preclinical studies, manufacturing scale-up. Deliverables: Product ready for clinical trials or regulatory submission.

SBIRI Eligibility Criteria: Indian company registered under Companies Act. Annual turnover less than Rs 500 crore. Biotech as primary business activity. R&D capability demonstrated through prior work. Willing to co-invest (Phase II requires company contribution).

BIPP Program for Large-Scale Development: Amount: Up to Rs 10 crore (50-70% as soft loan, remainder as grant). Duration: Up to 5 years. Focus: High-risk translational research, clinical trials, manufacturing. Eligibility: Established biotech companies with R&D track record. Requirements: Company co-investment of 30-50%.

BIPP Target Areas: Clinical development of novel therapeutics. Manufacturing scale-up for biologics. Multi-center clinical trials. Technology platforms with broad applicability.

Soft Loan Terms: Interest Rate: Typically 2% below prime lending rate. Repayment: Begins after product commercialization. Moratorium: 3-5 years during development phase. Conversion: May convert to grant if project fails despite good-faith effort.

Application Process for SBIRI/BIPP: Call for Proposals: Published periodically (typically 2-3 times per year). Pre-submission consultation: Recommended for complex projects. Detailed Proposal: Technical, commercial, and financial components. Due Diligence: Financial audit, IP review, site visit. Committee Review: Technical expert panel and funding committee.

Evaluation Emphasis: Technical Merit: Scientific rigor and feasibility of approach. Innovation: Advancement over current state of art. Commercial Viability: Clear path to market with defined business model. National Relevance: Addressing Indian healthcare or agricultural needs. IP Strategy: Protection of innovations and freedom to operate. Team and Infrastructure: Capability to execute proposed work.

Success Stories: Bharat Biotech: BIPP support for Rotavac vaccine development. Biocon: SBIRI support for biosimilar development programs. Strand Life Sciences: Genomics platform development with BIRAC funding.

Combining BIRAC Programs: BIG for initial proof of concept, then SBIRI for advanced development. SBIRI Phase I leading to Phase II. Successful SBIRI companies eligible for BIPP for clinical development. AcE Fund equity investment complementing grant funding.',
        '["Assess readiness for SBIRI or BIPP application based on development stage and funding needs", "Prepare detailed technical proposal demonstrating innovation and commercial viability", "Develop financial projections and co-investment plan meeting program requirements", "Build relationships with BIRAC program officers through pre-submission consultations"]'::jsonb,
        '["SBIRI Application Guide with Phase I and Phase II requirements and differentiation", "BIPP Program Deep-Dive with eligibility assessment and application strategy", "Soft Loan Terms Comparison across BIRAC programs with repayment scenarios", "BIRAC Success Stories with lessons learned from funded companies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 44: DBT and State Biotech Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        44,
        'DBT Programs and State Biotechnology Initiatives',
        'Beyond BIRAC, the Department of Biotechnology (DBT) offers numerous funding programs, and state governments have established biotechnology promotion initiatives. Understanding this broader ecosystem enables biotech startups to access multiple funding sources for different aspects of their development programs.

DBT Direct Funding Programs: DBT Grants for R&D Projects: Extramural research funding for academic and industry researchers. Project grants for specific research objectives. Typically Rs 20 lakh to Rs 2 crore for 3-5 year projects.

DBT-Wellcome Trust India Alliance: Fellowship programs for biomedical researchers. Early Career, Intermediate, and Senior Fellowships. Funding for laboratory establishment and research.

DBT Star College Program: Strengthening science education infrastructure. Supports colleges with research funding and equipment.

Grand Challenges India: Focus on specific health challenges. Collaborative funding with Bill & Melinda Gates Foundation.

State Biotechnology Policies and Incentives: Karnataka: Karnataka Biotechnology Policy 2023 with incentives for manufacturing. KBITS (Karnataka Biotechnology Incubation Task Force) support. Subsidy on land, stamp duty exemption, interest subvention.

Telangana: Genome Valley cluster development with dedicated biotech zone. T-Hub incubation support for biotech startups. Single-window clearance for biotech projects. Up to Rs 30 crore incentive per project.

Maharashtra: Maharashtra Biotechnology Policy with sector-specific incentives. MITCON and C-DAC incubation support. Incentives for anchor units establishing manufacturing.

Gujarat: GBRC (Gujarat Biotechnology Research Centre) funding. Land at concessional rates in biotech parks. Capital subsidy and interest subvention programs.

Tamil Nadu: TICEL Biotech Park Chennai. State biotech policy with manufacturing incentives. Skill development partnerships.

Key State Incentives Available: Land: 25-50% subsidy on land cost or concessional lease rates. Capital Subsidy: 15-25% subsidy on plant and machinery. Interest Subvention: 3-5% interest subsidy on term loans. Stamp Duty: Exemption or reimbursement on land registration. Electricity: Concessional power tariffs for manufacturing. R&D Support: State grants for research and innovation.

Combining Central and State Funding: BIRAC grant for product development. State capital subsidy for manufacturing facility. State R&D grant for local clinical trials. DBT grant for collaborative research with academic institution.

Application Strategy: Identify all applicable programs at central and state level. Sequence applications based on development stage. Leverage existing grants in subsequent applications. Maintain compliance across all funding sources.

Compliance and Reporting: Utilization certificates for fund release. Quarterly/annual progress reports. Audit requirements (statutory and program-specific). IP reporting obligations. Employment and investment milestones (for state incentives).',
        '["Map all applicable DBT and state biotechnology programs for your company and project", "Identify state-specific incentives based on your manufacturing location plans", "Develop integrated funding strategy combining central and state programs", "Build relationships with state biotechnology promotion agencies in target locations"]'::jsonb,
        '["DBT Funding Programs Directory with eligibility, amounts, and application processes", "State Biotechnology Policy Comparison covering major biotech states with incentive summaries", "Multi-Source Funding Strategy Framework for combining central and state programs", "State Biotechnology Agency Contact Directory with key contacts and application portals"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 45: Grant Application Best Practices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        45,
        'Grant Application Best Practices and Success Strategies',
        'Securing government grants requires understanding not just program requirements but also the strategic elements that differentiate successful applications. Drawing from analysis of successful BIRAC and DBT grants, this lesson provides actionable guidance for maximizing grant success rates.

Pre-Application Preparation: Technology Readiness Assessment: Honestly evaluate your Technology Readiness Level (TRL). TRL 1-3: Basic research, appropriate for academic grants. TRL 4-6: Proof of concept and prototype, appropriate for BIG/SBIRI. TRL 7-9: Demonstration and deployment, appropriate for BIPP/commercialization grants. Misalignment between TRL and program focus is a common rejection reason.

IP Landscape Analysis: Conduct freedom-to-operate search before application. Demonstrate awareness of competitive IP in proposal. Show plan for building proprietary IP position. Include preliminary patent filing if possible.

Team Assembly: Ensure team has relevant technical expertise. Include business/commercial capability for later-stage grants. Advisory board with industry experience strengthens application. Institutional collaborations add credibility.

Writing Compelling Proposals: Problem-Solution Narrative: Clearly articulate the problem with quantified impact. Present your solution with specific technical approach. Differentiate from existing solutions with evidence.

Innovation Articulation: Be specific about what is novel. Reference prior art and explain advancement. Avoid generic claims (first in class, revolutionary).

Scientific Rigor: Include preliminary data supporting feasibility. Cite relevant literature demonstrating scientific foundation. Present realistic experimental approaches with contingencies.

Commercial Viability: Define target market with credible size estimates. Identify customer segments and value proposition. Present realistic commercialization timeline. Address regulatory pathway.

Budget Development: Align budget with proposed activities. Provide line-item justification. Avoid both under-budgeting (not credible) and over-budgeting (raises questions). Include contingency for common cost increases.

Common Mistakes to Avoid: Scope Creep: Proposing too much for grant period and budget. Vague Milestones: Milestones should be specific and measurable. Weak Team Justification: Clearly explain why team can execute. Ignoring Competition: Acknowledge competitors and explain differentiation. Unrealistic Timelines: Account for real-world delays and challenges.

Post-Submission Strategy: Respond promptly to any queries. Prepare thoroughly for evaluation presentations. Accept feedback constructively if not funded. Resubmit with improvements for future calls.

Grant Management Best Practices: Track milestones and deliverables carefully. Maintain detailed financial records. Communicate proactively with program officers about challenges. Build relationship with BIRAC/DBT for future applications.',
        '["Conduct Technology Readiness Level assessment to identify most appropriate grant programs", "Develop comprehensive grant strategy covering application timing, program selection, and resource allocation", "Create grant application template incorporating best practices from successful applications", "Establish grant management processes for compliance and reporting once funded"]'::jsonb,
        '["Technology Readiness Level Assessment Tool for biotech projects with program matching", "Grant Proposal Writing Guide with section-by-section best practices and common pitfalls", "Grant Budget Development Template with justification guidance and allowable cost categories", "Grant Management Checklist covering milestone tracking, reporting, and compliance requirements"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Diagnostics & Medical Devices (Days 46-50)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Diagnostics & Medical Devices',
        'Navigate the medical device and diagnostics regulatory landscape - MDR 2017 device classification (Class A-D), IVD regulations, CDSCO registration pathways, ISO 13485 quality systems, and clinical evidence requirements for medical devices in India.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 46: Medical Devices Rules 2017 Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        46,
        'Medical Devices Rules 2017 Framework',
        'The Medical Devices Rules 2017 (MDR 2017) established India's comprehensive regulatory framework for medical devices, replacing the earlier system where only notified devices were regulated. Understanding MDR 2017 is essential for biotech companies developing diagnostic or therapeutic devices.

MDR 2017 Overview: Effective: January 1, 2018 (phased implementation). Coverage: All medical devices including diagnostics, implants, equipment. Classification: Risk-based (Class A, B, C, D). Regulatory Authority: CDSCO (Central Drugs Standard Control Organization).

Medical Device Definition: Any instrument, apparatus, appliance, implant, material, software, or other article intended for: Diagnosis, prevention, monitoring, prediction, treatment of disease. Investigation, replacement, or modification of anatomy or physiological process. Control of conception. Does NOT achieve primary action through pharmacological, immunological, or metabolic means (distinguishes from drugs).

Risk-Based Classification System: Class A (Low Risk): Non-invasive, no contact with injured skin. Examples: Surgical retractors, tongue depressors, wheelchairs, hospital beds. Regulatory Pathway: Notification to State Licensing Authority. Timeline: 30-45 days.

Class B (Low-Moderate Risk): Non-invasive devices channeling or storing for administration. Short-term invasive devices. Active therapeutic devices. Examples: Syringes, blood collection tubes, powered surgical instruments, clinical thermometers. Regulatory Pathway: Registration with CDSCO or notified body. Timeline: 60-90 days.

Class C (Moderate-High Risk): Long-term surgically invasive devices. Active devices releasing energy or substances. Devices with measuring function critical to patient management. Examples: Dialysis machines, ventilators, infusion pumps, implantable pacemaker leads. Regulatory Pathway: CDSCO registration with clinical data. Timeline: 90-120 days.

Class D (High Risk): Long-term implantable devices contacting heart, CNS, circulatory system. Devices using animal tissues. Devices intended for contraception or preventing STDs. Examples: Heart valves, hip implants, IUDs, breast implants, stents. Regulatory Pathway: Full CDSCO approval. Timeline: 120-180 days.

Classification Rules (First Schedule MDR 2017): 18 classification rules based on: Duration of contact (transient, short-term, long-term). Invasiveness (non-invasive, surgically invasive, implantable). Active vs passive devices. Specific anatomical targets (heart, CNS, circulatory). When multiple rules apply, highest risk classification governs.

Notified Bodies: CDSCO-recognized bodies authorized to assess Class A and B devices. Currently 20+ notified bodies approved. Scope limited to non-implantable, lower-risk devices. Assessment includes technical documentation review and site audit.

Current Regulatory Status: All four classes now under regulatory control (phased implementation completed). Single Registration Certificate (SRC) system implemented for efficiency. Online submission mandatory through SUGAM portal. Import and manufacture licenses required for commercial activity.',
        '["Study MDR 2017 classification rules and determine appropriate class for your device", "Understand regulatory pathway based on device classification", "Identify comparable devices and their regulatory status in India", "Register on SUGAM portal for online submission capability"]'::jsonb,
        '["MDR 2017 Complete Text with clause-by-clause guidance and recent amendments", "Device Classification Decision Tool applying 18 classification rules systematically", "Comparable Device Database searchable by classification and intended use", "SUGAM Portal Registration and Navigation Guide for device submissions"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 47: IVD Regulations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        47,
        'In-Vitro Diagnostic (IVD) Regulations',
        'In-Vitro Diagnostics (IVDs) represent a critical segment of the Indian medical device market, valued at Rs 8,000+ crore with 15%+ annual growth. IVDs fall under MDR 2017 with specific considerations for diagnostic performance and clinical evidence.

IVD Definition Under MDR 2017: Medical device intended to examine specimens derived from human body. Purpose: Providing information about physiological or pathological state, congenital abnormality, treatment safety or efficacy, or predisposition to disease. Includes: Reagents, instruments, calibrators, control materials, specimen containers. Software qualifies as IVD if intended for diagnostic purpose.

IVD Classification: Class A IVD (Low Risk): General laboratory reagents and instruments. Sample collection devices not in direct contact with body. Examples: Buffer solutions, general pipettes, centrifuges.

Class B IVD (Low-Moderate Risk): Clinical chemistry, hematology, coagulation analyzers. Pregnancy tests, urine analysis. Histology and cytology reagents. Examples: Glucose meters for self-testing, HbA1c analyzers.

Class C IVD (Moderate-High Risk): Blood grouping, HLA typing. Infectious disease testing (excluding HIV, Hepatitis). Cancer markers, therapeutic drug monitoring. Examples: Infectious disease ELISAs, tumor markers.

Class D IVD (High Risk): Blood screening for transfusion (HIV, HBV, HCV). Companion diagnostics for therapeutic decisions. Self-testing for serious conditions. Examples: HIV rapid tests, blood bank screening assays, companion diagnostics.

Performance Evaluation Requirements: Analytical Performance: Sensitivity, specificity, accuracy, precision. Linearity, limit of detection, measuring range. Interfering substances evaluation. Clinical Performance: Clinical sensitivity and specificity. Positive and negative predictive values. Comparison with reference standard or gold standard. Sample size adequate for statistical validity.

Clinical Performance Study Requirements: For Class C and D IVDs: prospective clinical study typically required. Study protocol: target population, sample size, comparator method, endpoints. Ethics committee approval mandatory. CDSCO notification before study initiation. Study sites with appropriate patient population and laboratory capability.

IVD-Specific Documentation: Essential Principles: Performance characteristics documentation. Analytical validation reports. Clinical performance evaluation. Labeling: Intended use, specimen requirements, testing procedure. Limitations and interfering substances. Performance characteristics summary. Quality Control: Internal QC requirements. Participation in external quality assessment schemes.

Companion Diagnostics: IVDs used to guide therapeutic decisions for specific drugs. Require coordinated development with therapeutic product. Higher evidentiary standard for clinical performance. Labeling linked to drug prescribing information. Growing importance with precision medicine and targeted therapies.',
        '["Determine IVD classification for your diagnostic product based on risk level and intended use", "Design analytical and clinical performance evaluation studies meeting CDSCO requirements", "Prepare IVD technical documentation including performance characteristics and validation data", "If developing companion diagnostic, coordinate development plan with therapeutic product"]'::jsonb,
        '["IVD Classification Guide with decision rules and examples for common diagnostic types", "Analytical Performance Validation Protocol Template for IVD products", "Clinical Performance Study Design Framework for Class C/D IVDs", "Companion Diagnostic Development Pathway integrating diagnostic and therapeutic requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 48: Device Registration Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        48,
        'Medical Device Registration Process',
        'The device registration process under MDR 2017 involves preparing technical documentation, submitting applications through SUGAM portal, and navigating CDSCO or notified body review. Understanding the complete process enables effective planning and timely market access.

Registration Requirements by Class: Class A: Notification to State Licensing Authority (SLA). Documents: Device master file, declaration of conformity, site details. Review: Administrative check, no technical assessment. Outcome: Registration number issued. Fees: Rs 4,500 registration, Rs 1,000 annual retention.

Class B: Registration with CDSCO or notified body. Documents: Technical file including design, risk analysis, performance data. Review: Technical documentation assessment. Outcome: Registration certificate issued. Fees: Rs 8,000 registration, Rs 2,000 annual retention.

Class C: Registration with CDSCO. Documents: Complete technical documentation, clinical evaluation report. Review: Technical review, may involve SEC consultation. Outcome: Registration certificate with any conditions. Fees: Rs 15,000 registration, Rs 3,000 annual retention.

Class D: Approval from CDSCO. Documents: Comprehensive dossier with clinical investigation data. Review: SEC review mandatory, possible advisory committee. Outcome: Approval certificate. Fees: Rs 25,000 registration, Rs 5,000 annual retention.

Technical Documentation Requirements: Device Description: Intended purpose, mechanism of action, variants, accessories. Design and Manufacturing: Design inputs/outputs, manufacturing process, critical parameters. Risk Management: ISO 14971 compliant risk management file. Verification and Validation: Design verification, performance validation, biocompatibility. Clinical Evaluation: Literature review, clinical data, post-market clinical follow-up plan. Labeling: Labels, IFU, promotional materials.

Essential Principles (Third Schedule MDR 2017): General requirements: Chemical, physical, biological properties. Infection and microbial contamination control. Construction and environmental properties. Devices with measuring or diagnostic function. Protection against radiation. Requirements for active devices. Software requirements.

SUGAM Portal Submission: Create manufacturer/importer account. Upload technical documentation in PDF format. Pay application fees online. Track application status. Respond to queries through portal.

Import Registration Additional Requirements: Free Sale Certificate from country of origin. GMP certificate of manufacturing site (EU CE or US FDA preferred). Authorization letter from manufacturer. Wholesale/import license from CDSCO zonal office.

Registration Timeline Optimization: Pre-submission meeting for complex devices. Complete documentation before submission (incomplete applications face delays). Proactive query response (timeline stops during applicant response). Parallel preparation of manufacturing license application.',
        '["Prepare technical documentation meeting MDR Essential Principles requirements", "Compile clinical evaluation based on literature, equivalent devices, or clinical investigation", "Submit complete application through SUGAM with all required documents and fees", "Plan for manufacturing/import license in parallel with registration"]'::jsonb,
        '["Technical Documentation Template structured per MDR Essential Principles", "Clinical Evaluation Report Framework for medical devices", "SUGAM Submission Guide with document format requirements and common issues", "Registration Timeline Planner with key milestones and optimization strategies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 49: ISO 13485 for Devices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        49,
        'ISO 13485 Quality Management System',
        'ISO 13485 is the international standard for medical device quality management systems, providing the framework for consistent design, development, production, and servicing of medical devices. While not mandatory under MDR 2017, ISO 13485 certification is increasingly expected by customers and facilitates global market access.

ISO 13485:2016 Structure: Based on ISO 9001 framework with medical device-specific requirements. Process-based approach with emphasis on risk management. Focus on regulatory requirements and customer requirements. Documentation requirements more stringent than ISO 9001.

Key Requirements: Management Responsibility: Quality policy, objectives, and management commitment. Management review at planned intervals. Resource allocation and organizational structure.

Resource Management: Human resources: competence, training, awareness. Infrastructure appropriate for product requirements. Work environment conducive to product conformity.

Product Realization: Planning of product realization. Customer-related processes (requirements review, communication). Design and development controls. Purchasing controls for critical materials. Production and service provision. Control of monitoring and measuring equipment.

Measurement, Analysis, and Improvement: Monitoring of customer satisfaction. Internal audits. Monitoring of processes and product. Control of nonconforming product. Analysis of data for trends. Corrective and preventive actions.

Medical Device-Specific Requirements: Design Controls: Design input, output, review, verification, validation. Design transfer to production. Design changes with appropriate review.

Risk Management: Integration of ISO 14971 principles. Risk management throughout product lifecycle. Traceability of risk controls to design outputs.

Traceability: Unique device identification. Batch/lot traceability. Installation and service records.

Documentation: Quality manual. Procedures and work instructions. Records demonstrating conformity.

Implementation Roadmap: Phase 1 (Month 1-3): Gap assessment, management commitment, project planning. Hire or designate quality management representative. Phase 2 (Month 3-6): Documentation development. Quality manual, procedures, work instructions, forms. Implement document control system. Phase 3 (Month 6-9): Implementation and training. Deploy procedures across organization. Train all personnel on relevant procedures. Phase 4 (Month 9-12): Verification and certification. Internal audits to verify implementation. Management review of QMS effectiveness. Certification audit by accredited body.

Certification Costs: Initial certification audit: Rs 3-8 lakh depending on company size. Annual surveillance audit: Rs 1-2 lakh. Recertification (every 3 years): Similar to initial certification. Consultant support for implementation: Rs 2-5 lakh.

Certification Bodies in India: Bureau Veritas, TUV SUD, SGS, DNV, BSI. Select accredited body with medical device experience. Check accreditation scope covers your product categories.',
        '["Conduct gap assessment against ISO 13485:2016 requirements to identify compliance gaps", "Develop ISO 13485 implementation project plan with phases, responsibilities, and timeline", "Create quality management system documentation: quality manual, procedures, work instructions", "Select accredited certification body and schedule certification audit"]'::jsonb,
        '["ISO 13485:2016 Gap Assessment Checklist with detailed requirements and evidence expectations", "QMS Documentation Suite with templates for quality manual, procedures, and forms", "ISO 13485 Implementation Guide with phased approach and resource requirements", "Certification Body Selection Criteria including accreditation verification and cost comparison"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 50: Clinical Evidence for Devices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        50,
        'Clinical Evidence Requirements for Medical Devices',
        'Clinical evidence demonstrating safety and performance is required for medical device registration, with requirements scaling based on device risk class. Understanding clinical evidence pathways enables appropriate evidence generation strategy balancing regulatory requirements with development efficiency.

Clinical Evidence Framework: Purpose: Demonstrate device safety and performance when used as intended. Components: Clinical evaluation, clinical investigation data (if needed), post-market clinical follow-up. Risk-Proportionate: Higher-risk devices require more clinical evidence.

Clinical Evaluation Report (CER): Required for Class B, C, and D devices. Class A may need simplified evaluation. CER Contents: Device description and intended purpose. Clinical background and current clinical practice. Summary of clinical data (literature, equivalent devices, clinical investigation). Evaluation of clinical data quality and relevance. Conclusions on safety and performance. Post-market clinical follow-up plan.

Sources of Clinical Data: Literature Data: Published studies on same or equivalent devices. Systematic literature search documented. Critical appraisal of study quality and applicability.

Equivalent Device Data: Demonstration of equivalence (technical, biological, clinical). Access to equivalent device technical documentation. Acknowledgment of limitations of equivalence claim.

Clinical Investigation Data: Prospective studies designed for regulatory submission. Highest level of evidence for novel devices. Required when literature and equivalence insufficient.

When Clinical Investigation Required: Novel devices without equivalent predicate. Class D devices (implants, life-supporting). Devices with new intended use claims. When clinical performance cannot be demonstrated through other means. CDSCO may mandate investigation during review.

Clinical Investigation Under CT Rules: MDR 2017 clinical investigations follow New Drugs and Clinical Trials Rules 2019 framework. Approval required from CDSCO before initiation. Ethics committee approval mandatory. CTRI registration before enrollment.

Clinical Investigation Process: Protocol development: objectives, design, endpoints, sample size. Ethics committee submission and approval. CDSCO application through SUGAM. Approval typically within 30 working days. Study conduct per ICH-GCP principles. Clinical study report preparation.

Study Design Considerations: Endpoints: Safety (adverse events, device deficiencies) and performance (effectiveness endpoints). Control: Active comparator, standard of care, or historical control. Sample Size: Adequate for statistical conclusions on primary endpoint. Duration: Sufficient to assess safety and performance for intended use duration.

Post-Market Clinical Follow-Up (PMCF): Required for Class C and D devices. Proactive collection of clinical data post-market. Methods: registries, post-market studies, structured complaint analysis. PMCF report updates clinical evaluation periodically.

Clinical Evidence Budget Estimates: Literature-based CER: Rs 2-5 lakh (comprehensive evaluation). Small clinical investigation (50-100 subjects): Rs 20-50 lakh. Large clinical investigation (200+ subjects): Rs 1-3 crore. PMCF program (annual): Rs 5-15 lakh.',
        '["Assess clinical evidence requirements for your device based on classification and intended use", "Develop clinical evaluation strategy: literature, equivalent devices, and/or clinical investigation", "If clinical investigation needed, prepare protocol and plan regulatory submissions", "Establish post-market clinical follow-up plan for ongoing evidence generation"]'::jsonb,
        '["Clinical Evidence Strategy Framework determining optimal approach based on device profile", "Clinical Evaluation Report Template meeting CDSCO and IMDRF guidance", "Clinical Investigation Protocol Template for medical device studies", "PMCF Plan Template with methodology options and reporting requirements"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Contract Research & Manufacturing (Days 51-55)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Contract Research & Manufacturing',
        'Navigate the Indian CRAMS industry ($20B+ market) - selecting CRO and CMO partners, structuring quality agreements, executing technology transfers, and building successful outsourcing relationships for biotech development and manufacturing.',
        11,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_11_id;

    -- Day 51: India CRAMS Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        51,
        'Indian CRAMS Industry Overview',
        'India's Contract Research and Manufacturing Services (CRAMS) industry has grown to over $20 billion, driven by cost advantages, scientific talent, and regulatory capabilities. Understanding the CRAMS landscape enables biotech startups to leverage outsourcing effectively while managing quality and IP risks.

CRAMS Market Structure: Contract Research (CRO): Chemistry services, biology services, clinical trials. Market size: $6+ billion. Key players: Syngene, Eurofins, Lambda Therapeutic Research.

Contract Development (CDMO): Process development, formulation development, analytical development. Market size: $4+ billion. Key players: Syngene, Piramal Pharma, Aragen Life Sciences.

Contract Manufacturing (CMO): API manufacturing, formulation manufacturing, biologics manufacturing. Market size: $10+ billion. Key players: Aurobindo, Lupin, Biocon.

India CRAMS Advantages: Cost: 40-60% lower than US/EU for comparable services. Talent: 500,000+ STEM graduates annually, strong chemistry expertise. Capacity: Significant installed manufacturing capacity across API and formulations. Regulatory Track Record: 800+ US FDA approved facilities in India. Time Zone: Enabling round-the-clock development with Western partners.

Key CRAMS Service Categories: Discovery Chemistry: Custom synthesis, library synthesis, process chemistry. Scale: Milligrams to kilograms. India strength: Strong organic chemistry expertise.

Preclinical Services: In vitro biology, pharmacology, toxicology, DMPK. GLP-certified facilities available. Growing capability in specialized studies.

Clinical Trials: Site management, patient recruitment, data management. 3,000+ active clinical trials in India. Cost advantage for large-scale trials.

API Manufacturing: Custom API synthesis, generic API manufacturing. Scale: Kilograms to metric tons. Global supply capability with regulatory compliance.

Formulation Development and Manufacturing: Dosage form development, commercial manufacturing. Capabilities across solid, liquid, parenteral, and specialized forms.

Biologics Development and Manufacturing: Cell line development, upstream/downstream process development. Growing capacity in monoclonal antibodies and recombinant proteins.

Major CRAMS Companies: Syngene International: Discovery to development, biologics capability. Revenue: Rs 3,000+ crore. Clients include Bristol-Myers Squibb.

Piramal Pharma Solutions: CDMO services, API, and formulations. Revenue: Rs 5,500+ crore. 14 global manufacturing facilities.

Aragen Life Sciences (formerly GVK Biosciences): Discovery services, development services. Strong chemistry and biology platforms.

Jubilant Biosys/Life Sciences: Drug discovery, development, manufacturing. Integrated services from target to commercial.

Biocon: Biologics development and manufacturing. Global biosimilar leader.

Dr. Reddys Custom Pharmaceutical Services: API and formulation development. Integrated drug product capabilities.',
        '["Map Indian CRAMS landscape for your specific service needs (CRO, CDMO, CMO)", "Research potential partners based on capabilities, track record, and regulatory status", "Understand cost structures and typical engagement models in Indian CRAMS", "Identify India-specific advantages and risks for your outsourcing strategy"]'::jsonb,
        '["India CRAMS Company Database with capabilities, capacities, and regulatory certifications", "CRAMS Cost Benchmarking Guide comparing India, China, and Western providers", "CRAMS Engagement Models explaining fee-for-service, FTE, and risk-sharing structures", "India CRAMS Due Diligence Checklist for evaluating potential partners"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 52: CRO/CMO Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        52,
        'CRO and CMO Partner Selection',
        'Selecting the right contract partner is critical for biotech development success. A structured selection process evaluating capabilities, quality, and cultural fit reduces project risk and builds foundation for productive long-term relationships.

Selection Process Framework: Stage 1 - Define Requirements: Detailed scope of work with technical specifications. Timeline requirements and milestones. Quality standards and regulatory requirements. Volume/scale requirements (current and future). Budget constraints and payment terms.

Stage 2 - Long List Development: Industry research and peer recommendations. Trade directories and conference contacts. Previous audit reports if available. Typically 5-10 candidates for initial screening.

Stage 3 - Request for Information (RFI): Company overview and capabilities. Relevant experience and client references. Quality systems and regulatory certifications. Capacity and resource availability. General pricing information.

Stage 4 - Short List and Site Visits: Evaluate RFI responses against criteria. Select 2-4 candidates for detailed evaluation. Conduct site visits and capability audits. Meet project team and assess cultural fit.

Stage 5 - Request for Proposal (RFP): Detailed technical requirements and specifications. Commercial terms and conditions. Proposal evaluation criteria and weightings. Timeline for decision.

Stage 6 - Evaluation and Selection: Technical capability assessment. Commercial evaluation. Reference checks. Final selection and negotiation.

Key Evaluation Criteria: Technical Capability (35%): Relevant experience with similar projects. Equipment and facilities appropriate for project. Scientific expertise of project team. Track record of successful project delivery.

Quality Systems (25%): Regulatory certifications (FDA, WHO-GMP, EU GMP). Quality management system maturity. Audit history and findings. CAPA effectiveness.

Commercial Terms (20%): Pricing competitiveness. Payment terms and milestones. IP ownership and confidentiality protections. Liability and indemnification.

Capacity and Reliability (10%): Capacity to handle project within timeline. Backup resources and contingency planning. Financial stability and business continuity.

Cultural Fit (10%): Communication style and responsiveness. Problem-solving approach. Flexibility and customer orientation. Long-term partnership potential.

Due Diligence Checklist: Quality Audit: GMP compliance, documentation systems, deviation handling. Financial Review: Annual reports, credit references, ownership structure. Regulatory Status: Inspection history, warning letters, consent decrees. IP Security: Confidentiality practices, access controls, employee agreements. References: Similar projects, client satisfaction, issue resolution.

Red Flags to Watch: High employee turnover in key positions. Significant recent regulatory issues. Reluctance to allow site visit or provide references. Unclear ownership or financial instability. Overselling capabilities or unrealistic commitments.',
        '["Define detailed requirements for your CRO/CMO needs including technical, quality, and timeline specifications", "Develop long list of potential partners through research and industry contacts", "Create RFI/RFP documents with clear evaluation criteria and weightings", "Conduct site visits and capability audits of shortlisted candidates"]'::jsonb,
        '["CRO/CMO Requirements Definition Template with comprehensive checklist", "RFI/RFP Templates for contract research and manufacturing services", "Partner Evaluation Scorecard with weighted criteria and rating scales", "Site Audit Checklist covering quality systems, capabilities, and compliance"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 53: Quality Agreements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        53,
        'Quality and Supply Agreements',
        'Formal agreements governing quality responsibilities and supply terms are essential for CRO/CMO relationships. Well-drafted agreements prevent misunderstandings, ensure regulatory compliance, and provide framework for issue resolution.

Agreement Structure: Master Service Agreement (MSA): Overall relationship terms covering multiple projects. General terms: confidentiality, IP, liability, termination. Duration: Typically 3-5 years with renewal options.

Quality Agreement (QA): GMP-required document defining quality responsibilities. Specific to each service type/product. Updated when scope or regulations change.

Supply Agreement: Commercial terms for ongoing supply. Pricing, volumes, delivery, and payment. Forecasting and capacity commitments.

Project-Specific Work Order: Detailed scope, specifications, and timeline. Deliverables and acceptance criteria. Project-specific pricing.

Quality Agreement Key Elements: Responsibilities Matrix: Clear allocation of quality responsibilities. Sponsor responsibilities vs contractor responsibilities. Shared responsibilities and communication requirements.

Quality System Requirements: Applicable standards (GMP, ICH, pharmacopeial). Documentation requirements. Personnel qualifications and training. Equipment qualification and maintenance.

Change Control: Types of changes requiring notification. Approval process for changes. Timeline requirements.

Deviation and CAPA: Deviation notification requirements. Investigation responsibilities. CAPA implementation and effectiveness verification.

Batch Release: Testing responsibilities (who tests what). Release criteria and documentation. Batch record review process.

Audits: Audit rights and frequency. Audit scope and access. Response to audit findings.

Regulatory Inspections: Notification requirements. Support during inspections. Response to regulatory observations.

Supply Agreement Key Elements: Pricing: Unit pricing, volume tiers, price adjustment mechanisms. Annual review process.

Forecasting: Rolling forecast requirements (typically 12-18 months). Firm order horizons. Capacity reservation fees if applicable.

Delivery: Lead times by product/stage. Delivery terms (Incoterms). Packaging and shipping specifications.

Quality and Acceptance: Acceptance testing procedures. Rejection and disposition process. Quality failure remediation.

Business Continuity: Safety stock requirements. Alternative manufacturing provisions. Force majeure definitions and remedies.

Termination: Termination triggers and notice periods. Transition assistance obligations. Inventory disposition.

Negotiation Best Practices: Involve quality, legal, and commercial stakeholders. Use industry-standard templates as starting point. Focus on practical workability, not just legal protection. Ensure alignment between QA and commercial agreements. Plan for issues that commonly arise in relationships.',
        '["Draft Master Service Agreement covering overall relationship terms and conditions", "Develop Quality Agreement defining responsibilities per regulatory requirements", "Negotiate Supply Agreement with appropriate commercial protections and flexibility", "Ensure alignment and consistency across all agreement documents"]'::jsonb,
        '["Master Service Agreement Template for CRO/CMO relationships", "Quality Agreement Template meeting GMP requirements with responsibility matrices", "Supply Agreement Template with forecasting, delivery, and business continuity terms", "Agreement Negotiation Checklist with key terms and negotiation strategies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 54: Technology Transfer
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        54,
        'Technology Transfer Execution',
        'Technology transfer from development to manufacturing, or between manufacturing sites, requires systematic documentation, method transfer, and process validation. Successful tech transfer ensures consistent product quality while meeting regulatory expectations.

Technology Transfer Types: R&D to Manufacturing: Transfer of process developed in R&D to commercial manufacturing. Most challenging due to scale differences and tacit knowledge. Site-to-Site: Transfer between manufacturing sites for capacity or redundancy. Requires demonstration of equivalence at receiving site. Acquisition Transfer: Transfer following company or product acquisition. May involve multiple products and processes.

Technology Transfer Process: Phase 1 - Planning: Define transfer scope and objectives. Identify sending and receiving site teams. Develop transfer timeline and milestones. Create communication and escalation protocols. Establish success criteria.

Phase 2 - Documentation Package: Process Description: Detailed process flow, parameters, and controls. Critical process parameters and proven acceptable ranges. Equipment requirements and specifications. Raw material specifications and qualified suppliers. In-process controls and acceptance criteria.

Analytical Methods: Method descriptions and validation summary. Reference standards and reagents. Equipment and software requirements. System suitability criteria.

Quality Documentation: Batch record templates. Specifications and test methods. Stability data and protocols.

Phase 3 - Knowledge Transfer: Technical training at receiving site. Process demonstration and observation. Q&A sessions to transfer tacit knowledge. Documentation of lessons learned.

Phase 4 - Method Transfer: Analytical Method Transfer: Co-validation or method verification at receiving site. Transfer protocol with acceptance criteria. Comparison of results between sites. Approved transfer report documenting equivalence.

Phase 5 - Process Validation at Receiving Site: Installation Qualification (IQ) for new equipment. Operational Qualification (OQ) demonstrating equipment performance. Process Performance Qualification (PPQ) demonstrating process consistency. Typically 3 consecutive successful batches at commercial scale.

Phase 6 - Continued Process Verification: Ongoing monitoring of process performance. Statistical process control where applicable. Annual product review including transfer batches.

Technology Transfer Challenges: Scale-Up Issues: Parameters may not scale linearly. Equipment differences affecting process performance. Raw material variability at larger scale. Mitigation: Thorough characterization studies, DOE for critical parameters.

Knowledge Gaps: Tacit knowledge not captured in documentation. Personnel changes during transfer. Mitigation: Extended training periods, video documentation, overlap of key personnel.

Analytical Variability: Method performance differences between sites. Reference standard variability. Mitigation: Robust method development, proper transfer protocols.

Timeline Pressures: Compressed timelines leading to shortcuts. Insufficient validation batches. Mitigation: Realistic planning, clear success criteria, management support.',
        '["Develop comprehensive technology transfer plan with phases, milestones, and responsibilities", "Prepare technology transfer documentation package including process, methods, and quality documents", "Execute analytical method transfer with proper protocols and acceptance criteria", "Complete process validation at receiving site demonstrating equivalent performance"]'::jsonb,
        '["Technology Transfer Plan Template with phase gates and deliverables", "Technology Transfer Documentation Package Checklist", "Analytical Method Transfer Protocol Template with acceptance criteria guidance", "Process Validation Protocol Template for receiving site qualification"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 55: Outsourcing Relationship Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        55,
        'Managing Outsourcing Relationships',
        'Long-term success with CRO/CMO partners requires active relationship management beyond initial contracting. Building productive partnerships enables better outcomes, faster issue resolution, and mutual value creation.

Governance Structure: Strategic Level: Annual business reviews with senior leadership. Relationship strategy and long-term planning. Major issue escalation and resolution. Operational Level: Quarterly performance reviews. Resource planning and capacity discussions. Process improvement initiatives. Project Level: Weekly/bi-weekly project meetings. Milestone tracking and issue management. Day-to-day coordination.

Performance Management: Key Performance Indicators (KPIs): On-time delivery (target: 95%+). Right-first-time (batch success rate). Deviation rate and closure time. Audit findings and CAPA effectiveness. Responsiveness to queries and issues.

Balanced Scorecard Approach: Quality metrics (regulatory compliance, audit results). Delivery metrics (on-time, complete). Cost metrics (budget adherence, cost reduction). Relationship metrics (satisfaction surveys, communication).

Regular Reviews: Monthly operational review with project data. Quarterly business review with trend analysis. Annual strategic review with relationship assessment.

Issue Management: Issue Classification: Critical: Affects product quality, patient safety, or regulatory compliance. Major: Affects project timeline or cost significantly. Minor: Operational issues with limited impact.

Escalation Process: Define escalation triggers and paths. Tiered escalation to appropriate management levels. Time-bound response requirements. Documentation of issues and resolution.

Root Cause Analysis: For recurring or significant issues. Joint investigation with partner. Systemic corrective actions. Effectiveness verification.

Continuous Improvement: Joint improvement initiatives. Sharing of best practices. Process optimization projects. Cost reduction programs with shared benefits.

Relationship Health Assessment: Regular relationship surveys (both parties). Identification of friction points. Action plans for improvement. Celebration of successes.

Managing Multiple Partners: Portfolio approach to partner management. Clear scope boundaries between partners. Information sharing protocols (protecting confidentiality). Benchmarking across partners (appropriately).

Exit Planning: Maintain process knowledge internally. Document dependencies and transition requirements. Alternative supplier qualification. Reasonable termination notice periods in contracts.',
        '["Establish governance structure with appropriate meeting cadence at strategic, operational, and project levels", "Define KPIs and balanced scorecard for partner performance management", "Implement issue management process with clear escalation paths and response requirements", "Conduct regular relationship assessments and develop improvement action plans"]'::jsonb,
        '["Outsourcing Governance Framework Template with roles and meeting structures", "Partner Performance Scorecard with KPI definitions and targets", "Issue Escalation Process Guide with classification and response requirements", "Relationship Assessment Survey Template for regular health checks"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 12: Biotech Business Development (Days 56-60)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Biotech Business Development',
        'Build biotech business development capabilities - licensing strategies, partnership structures, M&A fundamentals, exit planning, and navigating the deal landscape for Indian biotech companies.',
        12,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_12_id;

    -- Day 56: Biotech Deal Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        56,
        'Biotech Deal Landscape and Opportunity Assessment',
        'Business development is essential for biotech success, enabling access to capital, capabilities, and markets. Understanding the deal landscape helps biotech companies identify partnership opportunities and structure transactions that create value.

Types of Biotech Deals: Licensing Deals: Grant of rights to develop/commercialize product. In-licensing: Acquire rights from external party. Out-licensing: Grant rights to external party. Common for geographic expansion or capability access.

Research Collaborations: Joint research programs with risk/reward sharing. Often includes option for licensing. Common for early-stage programs.

Co-Development: Shared development costs and activities. Joint decision-making on program. Shared commercialization rights and economics.

Acquisition: Full purchase of company or asset. Strategic acquirer gains full control. Exit for founders and investors.

Indian Biotech Deal Activity: Annual deal value: $2-5 billion in recent years. Deal types: Predominantly out-licensing to global pharma. Growing in-licensing for Indian market rights. Increasing domestic M&A activity.

Active Deal Makers (Pharma Partners): Big Pharma: Pfizer, Novartis, AstraZeneca, Sanofi actively seeking partnerships. Biotech Mid-Caps: Seeking pipeline expansion through acquisition. Indian Pharma: Sun, Lupin, Cipla seeking specialty products. Financial Investors: PE firms, crossover funds for late-stage opportunities.

Opportunity Assessment Framework: Strategic Fit: Alignment with partner's therapeutic focus. Geographic fit (market coverage). Development stage alignment.

Value Drivers: Differentiation from existing therapies. Market size and growth potential. Patent protection and regulatory exclusivity. Development risk and timeline.

Deal Readiness: Data package completeness. IP position clarity. Manufacturing readiness. Regulatory strategy clarity.

When to Partner: Early Partnering (Discovery/Preclinical): Access to capital and capabilities. Validation of science and approach. Lower valuation but reduced risk. Late Partnering (Clinical/Commercial): Higher valuation based on de-risked asset. More complex negotiations. May require co-promotion or co-commercialization.

Geographic Considerations: Out-licensing to global markets: Access expertise and capital for costly development. Retain India rights when possible. Example: Biocon's biosimilar partnerships.

In-licensing for India: Leverage Indian market knowledge and presence. Lower risk than internal development. Growing opportunity as India market grows.',
        '["Assess your pipeline for partnering opportunities based on development stage and strategic needs", "Identify potential partner universe based on therapeutic focus and partnering history", "Evaluate deal readiness: data package, IP position, manufacturing, regulatory strategy", "Develop preliminary partnering strategy: timing, deal type, geographic scope"]'::jsonb,
        '["Biotech Deal Landscape Report with recent transactions and trend analysis", "Partner Identification Framework with criteria for target partner assessment", "Deal Readiness Assessment Checklist across technical, IP, and commercial dimensions", "Partnering Strategy Framework template for biotech programs"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 57: Licensing Deal Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        57,
        'Licensing Deal Structures and Economics',
        'Licensing deals involve complex economic structures with multiple payment types, rights allocations, and governance mechanisms. Understanding deal structures enables effective negotiation of value-maximizing transactions.

License Grant: Scope Definition: Product(s) covered by license. Field of use (therapeutic areas, indications). Territory (geographic rights). Exclusivity vs non-exclusive. Sublicensing rights.

Rights Retained: Reserved rights for licensor. Co-development options. Co-promotion rights in certain territories. Rights to improvements and derivatives.

Economic Terms: Upfront Payment: Cash payment at signing. Reflects current value and deal premium. Range: $1 million (early discovery) to $1 billion+ (approved products). Typically 10-20% of total deal value.

Development Milestones: Payments upon achieving specified milestones. IND filing, Phase I/II/III start, Phase III completion. Regulatory milestones (FDA approval, EMA approval). Range: $10-100 million per milestone depending on stage and market.

Commercial Milestones: Sales thresholds triggering additional payments. Example: $50M at first commercial sale, $100M at $500M annual sales. Incentivize continued investment in commercialization.

Royalties: Percentage of net sales paid to licensor. Range: 5-15% for early-stage, 15-30% for late-stage/approved. Tiered royalties increasing with sales thresholds. Duration: patent life or fixed term (typically 10-15 years). Royalty reductions for patent expiry, generic competition, sublicensing.

Cost/Profit Sharing: Alternative to royalty in co-development deals. Share development costs (typically 50/50). Share profits (net revenue minus costs) in defined territory. More complex accounting but aligns incentives.

Development Responsibilities: Development Plan: Who conducts and funds development activities. Decision rights for key development choices. Regulatory strategy and submissions.

Governance: Joint Steering Committee structure. Decision-making processes. Dispute resolution mechanisms.

Diligence Obligations: Minimum investment requirements. Timeline commitments. Reversion of rights for failure to diligence.

Sample Deal Economics: Early-stage deal (preclinical): Upfront $5-15 million. Milestones $50-150 million. Royalties 5-10%. Total potential value: $100-200 million.

Late-stage deal (Phase II complete): Upfront $50-100 million. Milestones $200-500 million. Royalties 15-20%. Total potential value: $500 million to $1 billion.

Approved product deal: Upfront $200-500 million. Commercial milestones $200-400 million. Royalties 20-30%. Total potential value: $1-2 billion.',
        '["Understand licensing economic structures and typical ranges for each component", "Develop financial model for potential deal scenarios with sensitivity analysis", "Define minimum acceptable terms and walk-away positions for negotiation", "Prepare term sheet template capturing key economic and rights terms"]'::jsonb,
        '["Licensing Deal Economics Guide with benchmarks by development stage and therapeutic area", "Deal Financial Model Template for analyzing partnership economics", "Term Sheet Template covering rights, economics, and governance provisions", "Royalty Calculation Guide with adjustments for various scenarios"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 58: Partnership Negotiations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        58,
        'Partnership Negotiation Strategies',
        'Biotech partnership negotiations require balancing value maximization with relationship building. Effective negotiation combines thorough preparation, skilled execution, and appropriate post-negotiation follow-through.

Preparation Phase: Know Your BATNA: Best Alternative to Negotiated Agreement. Alternatives: other potential partners, internal development, different deal structure. Stronger BATNA enables better negotiation position.

Understand Partner Motivations: Strategic priorities driving interest. Internal decision-making process. Competitive dynamics affecting urgency. Budget cycles and deal capacity.

Valuation Analysis: Asset valuation using multiple methods (rNPV, comparables, precedent transactions). Range of acceptable outcomes. Value drivers to emphasize.

Team Preparation: Roles: lead negotiator, technical expert, commercial expert, legal. Alignment on objectives and limits. Communication protocols during negotiation.

Negotiation Execution: Opening Positions: Start with aspiration, not minimum acceptable. Anchor on value, not cost. Support positions with data and precedents.

Information Exchange: Share information to build value understanding. Seek information about partner priorities. Look for creative solutions to apparent impasses.

Package Negotiation: Negotiate multiple terms together, not sequentially. Trade-offs across issues create mutual gains. Example: Lower upfront for higher milestones and royalties.

Managing the Process: Control pace and agenda when possible. Take breaks to reassess and regroup. Escalate strategically to senior decision-makers.

Key Negotiation Issues: Economics: Upfront, milestones, royalties. Timing and triggers for payments. Audits and accounting definitions.

Development: Who conducts and funds activities. Decision rights at key inflection points. Go/no-go criteria.

Commercialization: Responsibility for launch and marketing. Minimum promotional commitments. Pricing authority.

Governance: Committee structure and composition. Voting and dispute resolution. Termination triggers and consequences.

IP: Ownership of improvements. Prosecution responsibility. Enforcement rights and obligations.

Common Negotiation Pitfalls: Inadequate preparation leading to reactive positions. Focusing only on price, not total value. Conceding early to build goodwill (rarely reciprocated). Taking issues personally, damaging relationship. Failing to document agreements as you go.

Post-Negotiation: Prompt drafting of definitive agreements. Careful review against negotiated terms. Preparation for deal announcement and implementation. Relationship investment for successful partnership.',
        '["Conduct thorough preparation including BATNA analysis, partner research, and valuation", "Define negotiation strategy with opening positions, trade-off priorities, and limits", "Assemble and align negotiation team with clear roles and communication protocols", "Execute negotiation systematically with attention to both substance and relationship"]'::jsonb,
        '["Negotiation Preparation Checklist covering BATNA, partner analysis, and valuation", "Negotiation Strategy Template with positions, limits, and trade-off analysis", "Term-by-Term Negotiation Guide with common positions and resolution approaches", "Post-Negotiation Documentation Checklist ensuring agreements are captured accurately"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 59: M&A Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        59,
        'M&A Fundamentals for Biotech',
        'Mergers and acquisitions are significant liquidity events for biotech companies and their investors. Understanding M&A dynamics helps founders prepare for potential transactions and navigate the process effectively.

M&A in Indian Biotech: Recent Activity: Growing M&A activity with $1-2 billion annually. Mix of domestic consolidation and cross-border deals. Notable deals: Aurobindo acquisitions, Biocon-Viatris deal.

Acquirer Types: Global Pharma: Seeking pipeline, capabilities, or market access. Indian Pharma: Consolidation and specialty capability acquisition. Private Equity: Platform building and portfolio company add-ons. SPACs: Emerging pathway (primarily for US listings).

Valuation Approaches: Revenue/EBITDA Multiples: For commercial-stage companies. Biotech average: 3-8x revenue, 10-20x EBITDA. Premium for growth and margin profile.

Risk-Adjusted NPV (rNPV): For pipeline-stage companies. Probability-weighted cash flows. Discount rate reflecting development risk.

Comparable Transactions: Precedent deals for similar assets. Adjust for timing, risk, and strategic factors.

Sum-of-Parts: Separate valuation for each asset/program. Useful for diversified portfolios.

Deal Structures: Asset Purchase: Acquirer buys specific assets (product, technology). Seller retains liabilities not assumed. Cleaner but may miss full value.

Stock Purchase: Acquirer buys shares from shareholders. All assets and liabilities transfer. Continuity of contracts and licenses.

Merger: Combining two entities into one. Statutory merger, reverse merger. Complex but may have tax advantages.

Earnouts: Contingent consideration based on future performance. Bridges valuation gaps. Common when development risk remains.

M&A Process Timeline: Pre-Marketing (Months 1-2): Prepare information memorandum. Identify and prioritize potential acquirers. Engage advisors (investment bank, legal).

Marketing (Months 2-4): Confidential outreach to targets. Non-binding indications of interest. Management presentations.

Due Diligence (Months 4-6): Data room access for bidders. Technical, commercial, legal, financial diligence. Final bid preparation.

Negotiation and Signing (Months 6-8): Select preferred bidder. Negotiate purchase agreement. Board approval and signing.

Closing (Months 8-12): Regulatory approvals (CCI, FEMA). Shareholder approvals. Closing conditions satisfaction.

Founder Considerations: Alignment with investors on exit timing and terms. Retention requirements and post-closing role. IP and non-compete provisions. Tax planning for proceeds.',
        '["Understand M&A landscape and typical acquirer motivations in your sector", "Assess company readiness for potential M&A: value drivers, housekeeping items, governance", "Develop preliminary view of valuation using multiple approaches", "Align with board and investors on M&A strategy and decision-making process"]'::jsonb,
        '["Biotech M&A Landscape Report with recent transactions and valuation benchmarks", "M&A Readiness Assessment covering operational, legal, and financial preparation", "Valuation Methodology Guide for biotech M&A with calculation examples", "M&A Process Timeline with key activities and decision points"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 60: Exit Planning and Execution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        60,
        'Exit Planning and Execution',
        'Exit planning should begin early in a biotech company's lifecycle, informing decisions about business strategy, capital structure, and value creation. Thoughtful planning maximizes outcomes for founders, employees, and investors.

Exit Pathways: Trade Sale (M&A): Most common exit for biotech companies. Acquirer: strategic pharma or larger biotech. Timing: Often after key value inflection (Phase II data, approval). Advantages: Certainty of value, faster execution. Challenges: Finding right buyer, valuation negotiation.

Initial Public Offering (IPO): Access public capital markets. Listing options: BSE/NSE (India), NASDAQ (US via ADR), or dual listing. Timing: Requires commercial revenue or late-stage pipeline. Advantages: Continued access to capital, liquidity, visibility. Challenges: Public company obligations, market timing.

Secondary Sale: Sale of existing shares to new investors. Partial liquidity for founders/early investors. Common in larger private rounds. Advantages: Liquidity without full exit. Challenges: Valuation, governance implications.

Exit Timing Considerations: Value Inflection Points: Clinical data readouts. Regulatory approvals. Commercial launch and traction. Each milestone typically increases valuation.

Market Conditions: M&A appetite of strategic acquirers. Public market receptivity for IPO. Financing environment affecting alternatives.

Stakeholder Alignment: Investor timeline and return expectations. Founder goals and plans. Employee considerations and retention.

Exit Preparation: Corporate Housekeeping: Clean cap table with clear ownership. All contracts properly executed. IP assignments complete. Regulatory compliance documented. Financial audit completed.

Value Documentation: Clear articulation of value proposition. Comprehensive data package. Competitive positioning analysis. Growth opportunity identification.

Management and Organization: Strong management team in place. Key personnel retention arrangements. Succession planning if needed.

Advisor Selection: Investment bank for process management. Legal counsel experienced in M&A/IPO. Tax advisors for structure optimization.

Exit Execution: M&A Process: Confidential marketing to qualified buyers. Competitive process to maximize value. Negotiate favorable terms. Manage through closing.

IPO Process: Select underwriters. Prepare prospectus (DRHP in India). SEC/SEBI review and response. Roadshow and pricing. Listing and aftermarket.

Post-Exit Considerations: Earnout Management: Achieve earnout milestones. Document and dispute resolution. Cash management.

Retention Obligations: Employment agreements. Non-compete compliance. Knowledge transfer.

Wealth Management: Tax-efficient proceeds management. Diversification planning. Next venture planning.',
        '["Develop exit strategy aligned with stakeholder objectives and market opportunities", "Complete exit preparation activities: corporate housekeeping, value documentation, team readiness", "Engage appropriate advisors for exit planning and execution", "Create exit timeline with key milestones and decision points"]'::jsonb,
        '["Exit Strategy Framework for biotech companies with pathway comparison", "Exit Preparation Checklist covering corporate, legal, financial, and operational readiness", "Advisor Selection Guide for M&A and IPO with evaluation criteria", "Post-Exit Planning Guide covering earnouts, retention, and wealth management"]'::jsonb,
        90,
        100,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P28 Biotech & Life Sciences Enhanced - Modules 7-12 (Days 31-60) created successfully';

END $$;

COMMIT;
