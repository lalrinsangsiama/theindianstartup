-- THE INDIAN STARTUP - P21: HealthTech & Medical Devices - Enhanced Content Part 2
-- Migration: 20260204_021b_p21_healthtech_enhanced_part2.sql
-- Purpose: Continue P21 course content - Modules 3-6 (Days 11-30)
-- Depends on: 20260204_021_p21_healthtech_enhanced.sql

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
BEGIN
    -- Get P21 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P21';

    -- ========================================
    -- MODULE 3: Medical Device Registration (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Medical Device Registration Under MDR 2017',
        'Navigate Medical Devices Rules 2017 comprehensively - device classification from Class A to Class D, registration pathways, clinical evidence requirements, Software as Medical Device (SaMD) regulations, and maintaining compliance post-registration.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_3_id;

    -- Day 11: MDR 2017 Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        11,
        'Medical Devices Rules 2017 Framework',
        'The Medical Devices Rules 2017 (MDR 2017) brought all medical devices under regulatory control in India, replacing the earlier system where only 23 notified device categories were regulated. Understanding this framework is essential for any medical device or health tech hardware venture.

Historical Context and Transition: Pre-2017: Only 23 device categories notified under D&C Act required registration. MDR 2017 gazetted: December 2017, bringing comprehensive medical device regulation. Implementation phases: Class C-D (high risk) mandatory from January 2018, Class A-B (lower risk) phased in by 2022. Current status: All four classes now require registration for manufacture and import.

Definition of Medical Device (MDR 2017): Any instrument, apparatus, appliance, implant, material or other article, including software, intended by its manufacturer for use on human beings for: diagnosis, prevention, monitoring, prediction, prognosis, or treatment of disease; investigation, replacement, or modification of anatomy or physiological process; control of conception; and which does not achieve its principal intended action by pharmacological, immunological, or metabolic means but may be assisted by such means.

Risk-Based Classification System: Class A (Low Risk): Non-invasive devices not in contact with injured skin, devices that come into contact with intact skin. Examples: bandages, tongue depressors, wheelchairs, hospital beds, stethoscopes, non-powered surgical instruments. Regulatory pathway: Notification to State Licensing Authority, minimal pre-market requirements.

Class B (Low-Moderate Risk): Non-invasive devices channeling or storing for eventual administration. Surgically invasive devices for transient use. Active diagnostic devices. Examples: syringes, blood collection tubes, pregnancy test kits, BP monitors, clinical thermometers. Regulatory pathway: Registration with CDSCO, technical documentation required.

Class C (Moderate-High Risk): Devices containing substances considered medicinal products. Long-term surgically invasive devices. Implantable devices (short-term). Examples: dialysis machines, ventilators, infusion pumps, orthopedic implants (short-term), condoms with spermicide. Regulatory pathway: CDSCO registration with clinical data requirements.

Class D (High Risk): Long-term implantable devices. Devices in direct contact with heart, central circulatory system, or central nervous system. Devices incorporating biological materials. Examples: pacemakers, heart valves, joint replacements, IUDs with copper, breast implants. Regulatory pathway: Full CDSCO approval with comprehensive clinical evidence.

Classification Decision Process: Step 1: Identify intended purpose and mechanism of action. Step 2: Determine invasiveness and duration of contact. Step 3: Apply classification rules (18 rules in MDR First Schedule). Step 4: If multiple rules apply, highest risk class governs. Step 5: For combination products, consider drug-device or device-diagnostic rules. When in doubt: Submit classification query to CDSCO for formal opinion.',
        '["Study MDR 2017 First Schedule classification rules - work through 18 rules systematically with examples", "Determine classification for your medical device - document rationale with reference to specific classification rules applied", "Identify comparable devices in same classification - understand regulatory precedents and timeline expectations", "If classification is uncertain, draft classification query letter to CDSCO for formal opinion before investing in registration"]'::jsonb,
        '["MDR 2017 Complete Text with annotations explaining key provisions and recent amendments", "Device Classification Decision Tree walking through 18 rules with practical examples", "Classification Query Template for seeking CDSCO formal opinion on device classification", "Comparable Device Database searchable by classification, intended use, and regulatory status"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 12: Device Registration Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        12,
        'Medical Device Registration Process',
        'The medical device registration process under MDR 2017 varies significantly by device class, with higher-risk devices requiring more extensive documentation and longer review timelines. Strategic preparation can substantially reduce time to market.

Registration Pathways by Class: Class A Devices: Pathway: Notification to State Licensing Authority (SLA). Requirements: Device Master File with basic information, quality declaration, and manufacturing site details. Timeline: 30-45 days. Fees: Rs 4,500 registration, Rs 1,000 annual retention. Process: Submit through SUGAM, SLA reviews and issues registration.

Class B Devices: Pathway: Registration with CDSCO. Requirements: Technical documentation including design specifications, verification/validation reports, essential principles checklist, labeling, and instructions for use. Timeline: 60-90 days. Fees: Rs 8,000 registration, Rs 2,000 annual retention. Process: Submit through SUGAM, CDSCO reviews documentation, may request additional information.

Class C Devices: Pathway: CDSCO registration with enhanced scrutiny. Requirements: All Class B requirements plus clinical evaluation report demonstrating safety and performance, post-market clinical follow-up plan. Timeline: 90-120 days. Fees: Rs 15,000 registration, Rs 3,000 annual retention. Process: Subject Expert Committee review may be required for novel devices.

Class D Devices: Pathway: Full CDSCO approval. Requirements: Comprehensive technical documentation, clinical investigation data (may require Indian clinical trials), risk management file per ISO 14971, comprehensive labeling and IFU. Timeline: 120-180 days or longer for novel devices. Fees: Rs 25,000 registration, Rs 5,000 annual retention. Process: SEC review mandatory, may require advisory committee input.

Technical Documentation Requirements: Device Description: Detailed description of device, variants, accessories, principle of operation. Intended Use/Indications: Precise statement of medical purpose, target population, contraindications. Design Documentation: Design inputs, outputs, verification activities, and design validation. Manufacturing: Process description, critical parameters, in-process controls. Quality Control: Specifications, test methods, acceptance criteria, batch release procedures.

Essential Principles of Safety and Performance: MDR Third Schedule lists essential principles that all devices must meet. Covers: chemical/physical properties, infection control, construction requirements, measurement accuracy, radiation protection, software requirements, electrical safety. Documentation must demonstrate compliance with each applicable principle.

Import Registration Special Requirements: For imported devices, additional documentation required: Free Sale Certificate from country of origin, GMP certificate of manufacturing site (EU CE or US FDA registration preferred), authorization letter from manufacturer appointing Indian importer, stability data appropriate for Indian storage conditions. Non-resident manufacturers must appoint Authorized Indian Agent.',
        '["Prepare complete technical documentation package for your device class - use CDSCO recommended format and content requirements", "Compile Essential Principles compliance matrix - document evidence of meeting each applicable principle from MDR Third Schedule", "Engage CDSCO-empaneled testing laboratory for required device testing - understand testing scope and timeline", "For imported devices, obtain all manufacturer documents: FSC, GMP certificate, authorization letter with original signatures"]'::jsonb,
        '["Technical Documentation Template structured per CDSCO requirements with section-by-section guidance", "Essential Principles Checklist (MDR Third Schedule) with evidence mapping guidance", "CDSCO-Empaneled Lab Directory with testing capabilities, costs, and typical turnaround times", "Import Registration Document Checklist with sample formats for authorization letters and declarations"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 13: Clinical Evidence Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        13,
        'Clinical Evidence for Medical Devices',
        'Clinical evidence requirements under MDR 2017 scale with device risk classification. Understanding when clinical investigations are required versus when literature-based evidence suffices is critical for regulatory planning and resource allocation.

Clinical Evidence Framework: Clinical evidence demonstrates that device achieves intended purpose and meets essential principles when used as intended. Three types of clinical evidence recognized: Clinical investigation data (trials), Literature review and analysis, Clinical experience (post-market data from equivalent devices).

Clinical Evaluation Report (CER): Required for Class B, C, and D devices. Class A may need simplified evaluation. CER Contents: Device description and intended purpose, clinical background and current treatment options, literature review methodology and findings, analysis of clinical data from equivalent devices, clinical investigation data (if conducted), conclusions on safety and performance. CER must be updated when new clinical data becomes available.

When Clinical Investigations Are Required: Novel devices without predicate/equivalent device. High-risk Class D devices (implants, life-supporting). Devices with new intended use claims. When literature evidence insufficient to demonstrate safety/performance. CDSCO may mandate trials during registration review.

Clinical Investigation Approval Process: Pre-submission: Protocol development, ethics committee identification, site selection. Application: Submit to CDSCO through SUGAM with protocol, investigator brochure, informed consent, and ethics committee approval. Timeline: 30 working days for CDSCO decision (per CT Rules 2019 framework). Conduct: Follow ICH-GCP guidelines, report adverse events, maintain regulatory oversight. Completion: Submit clinical study report, integrate data into CER.

Clinical Investigation Requirements by Class: Class A: Generally not required, device history and user experience suffice. Class B: Literature-based evaluation usually sufficient, investigation for novel intended use. Class C: Clinical evaluation mandatory, investigation may be required for novel devices. Class D: Clinical investigation typically required unless strong predicate equivalence demonstrated.

Post-Market Clinical Follow-Up (PMCF): Plan required for Class C and D devices. Objectives: Confirm long-term safety and performance, identify previously unknown risks, evaluate rare adverse events. Methods: Post-market studies, registries, literature monitoring, complaint analysis. PMCF report submitted to CDSCO periodically (typically annually).

Clinical Evidence Budget Planning: Literature-based CER: Rs 2-5 lakh (consultant-prepared comprehensive evaluation). Clinical investigation: Rs 20 lakh to Rs 2 crore depending on device, endpoints, and sample size. Testing laboratory: Rs 5-30 lakh for bench testing, biocompatibility, and performance verification. Total budget range: Rs 10 lakh (simple Class B) to Rs 3 crore (novel Class D with clinical trial).',
        '["Assess clinical evidence requirements for your device class - determine if clinical investigation is required or if literature-based approach is acceptable", "Develop Clinical Evaluation Report outline - identify literature sources, equivalent devices, and data gaps requiring prospective evidence", "If clinical investigation needed, draft study protocol covering: objectives, endpoints, sample size, duration, and budget", "Identify clinical investigation sites and principal investigators - seek sites with CDSCO trial experience and relevant patient populations"]'::jsonb,
        '["Clinical Evaluation Report Template per CDSCO and IMDRF guidance with section-by-section instructions", "Literature Review Methodology Guide for medical device clinical evaluation with database search strategies", "Clinical Investigation Protocol Template covering ICH-GCP requirements and CDSCO expectations", "Clinical Evidence Budget Calculator estimating costs by device class and evidence strategy"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 14: Software as Medical Device (SaMD)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        14,
        'Software as Medical Device Regulations',
        'Software as Medical Device (SaMD) is explicitly included in MDR 2017 definition, and CDSCO has issued specific guidance for digital health software regulation. Understanding SaMD classification and lifecycle requirements is essential for health tech software ventures.

CDSCO SaMD Definition: Software intended to be used for medical purposes without being part of hardware medical device. Includes: diagnostic algorithms, clinical decision support tools, patient monitoring apps, therapeutic software. Excludes: administrative software (appointment scheduling, billing), general wellness apps without medical claims, software driving hardware medical devices (regulated with hardware).

SaMD Classification Approach: CDSCO follows IMDRF SaMD classification framework. Classification based on: Significance of healthcare situation (critical, serious, non-serious) and Significance of information provided (treat/diagnose, drive clinical management, inform clinical management). Matrix yields Class A (lowest) through Class D (highest) for SaMD.

SaMD Classification Examples: Class A: Health tracking apps providing information only, symptom loggers without diagnosis. Class B: Clinical calculators (drug dosing, BMI), screening tools with physician review required. Class C: Diagnostic aids for serious conditions (cancer screening AI), treatment planning tools. Class D: AI directly controlling high-risk treatment, standalone diagnostic for critical conditions.

IEC 62304 Software Lifecycle: International standard for medical device software development. Three safety classes: A (no injury possible), B (non-serious injury possible), C (death or serious injury possible). Required processes: Software development planning, requirements analysis, architectural design, detailed design, implementation, verification, release, and maintenance. Documentation: Software requirements specification, software architecture, test protocols, and traceability matrix. Compliance increasingly expected by CDSCO for SaMD registration.

AI/ML-Based SaMD Considerations: Additional scrutiny for AI/ML algorithms in medical decision-making. Validation requirements: Training data quality and representativeness, algorithm performance metrics (sensitivity, specificity, AUC). Locked vs adaptive algorithms: Locked algorithms treated as standard SaMD, adaptive algorithms may require ongoing validation. CDSCO guidance evolving - reference FDA AI/ML action plan and EU MDR requirements for best practices.

Software Change Management: Pre-determined Change Control Plan (PCCP) concept emerging. Categorize changes: Minor (documentation only), Moderate (notification to CDSCO), Major (new registration/approval). Change impact assessment process: Evaluate effect on safety, performance, and intended use. Maintain version control and change history documentation.

SaMD-Specific Registration Requirements: Standard MDR technical documentation plus: Software requirements specification and architecture, Risk management file per ISO 14971 with SaMD-specific hazards, Verification and validation evidence including clinical validation, Cybersecurity documentation covering threat assessment and controls, Usability engineering file per IEC 62366.',
        '["Determine if your software qualifies as SaMD - apply CDSCO/IMDRF definition and document rationale", "Classify your SaMD using IMDRF framework - map healthcare situation significance and information significance to risk class", "Implement IEC 62304 compliant development process - establish software lifecycle procedures and documentation practices", "For AI/ML-based SaMD, document algorithm validation approach: training data, performance metrics, and ongoing monitoring plan"]'::jsonb,
        '["CDSCO SaMD Guidance Document with interpretive notes and practical examples", "IMDRF SaMD Classification Framework with decision flowchart and classification examples", "IEC 62304 Implementation Guide with templates for software development documentation", "AI/ML Medical Device Validation Framework covering training data requirements, performance validation, and update protocols"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 15: Manufacturing License and QMS
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        15,
        'Manufacturing License and Quality Management',
        'Manufacturing medical devices in India requires obtaining manufacturing license from State Licensing Authority and implementing Quality Management System meeting regulatory expectations. ISO 13485 certification is increasingly expected even when not mandatory.

Manufacturing License Requirements (MDR Rule 11): Issued by State Licensing Authority (State Drug Controller office). Separate license required for each manufacturing site. License specifies: Device categories authorized, manufacturing processes covered, and quality system requirements. Validity: 5 years with annual renewal procedures.

Application Process: Step 1: Premises preparation meeting site requirements. Step 2: Submit application (Form MD-3) through SUGAM with site master file, device list, QMS documentation. Step 3: Pay application fee (Rs 10,000-50,000 based on device class). Step 4: State Drug Inspector conducts site inspection. Step 5: Inspector report submitted to licensing authority. Step 6: License issued or deficiencies communicated.

Site Requirements: Building: Adequate space for manufacturing, storage, quality control. Clean room requirements for relevant device types (Class 100,000 or better for implants). Utilities: HVAC appropriate for device requirements, power backup, water quality. Equipment: Qualified manufacturing and testing equipment with calibration program. Personnel: Qualified Person meeting MDR requirements, trained production and QC staff.

ISO 13485 Quality Management System: International standard for medical device QMS. Not mandatory under MDR 2017, but: Expected by most institutional customers, Required for CE marking (EU export), Preferred by CDSCO inspectors as compliance indicator. Key elements: Management responsibility, resource management, product realization, measurement/analysis/improvement.

ISO 13485 Implementation Roadmap: Phase 1 (Months 1-3): Gap assessment, management commitment, project planning. Phase 2 (Months 3-6): Documentation development - quality manual, procedures, work instructions. Phase 3 (Months 6-9): Implementation - training, process deployment, record keeping. Phase 4 (Months 9-12): Internal audits, management review, corrective actions. Phase 5 (Month 12+): Certification audit by accredited certification body.

Certification Costs and Maintenance: Initial certification: Rs 3-8 lakh depending on company size and complexity. Annual surveillance: Rs 1-2 lakh for annual audits. Recertification: Full audit every 3 years, similar cost to initial certification. Training: Rs 50,000-2 lakh annually for staff competency development.

Good Manufacturing Practice (GMP) Inspections: CDSCO/State inspectors may conduct GMP inspections. Schedule M-III: Specific GMP requirements for medical devices under D&C Rules. Focus areas: Premises, personnel, documentation, production controls, quality control, complaints, and recalls. Inspection frequency: Risk-based, Class D manufacturers inspected more frequently.',
        '["Assess manufacturing license requirements for your device - identify applicable State Drug Controller and specific requirements for your device class", "Conduct premises gap analysis against manufacturing license site requirements - develop remediation plan for any gaps", "Implement ISO 13485 QMS or equivalent - develop documentation and procedures meeting medical device quality requirements", "Identify and engage Qualified Person meeting MDR requirements - ensure appropriate qualifications and full-time availability"]'::jsonb,
        '["Manufacturing License Application Guide with Form MD-3 walkthrough and supporting documentation requirements", "Site Master File Template covering premises, equipment, personnel, and process documentation", "ISO 13485 Implementation Toolkit with quality manual template, procedure templates, and form library", "Qualified Person Role Description with qualification requirements, responsibilities, and sample employment agreement"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Telemedicine Guidelines (Days 16-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Telemedicine Practice Guidelines',
        'Master the NMC Telemedicine Practice Guidelines 2020 - understanding RMP requirements, consultation protocols for different encounter types, prescription restrictions, platform compliance requirements, and building compliant telemedicine operations.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_4_id;

    -- Day 16: Telemedicine Guidelines Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        16,
        'Telemedicine Practice Guidelines 2020 Overview',
        'The Telemedicine Practice Guidelines (TPG) 2020, issued by the Board of Governors in supersession of MCI, provide the legal framework for telemedicine practice in India. These guidelines enabled the rapid growth of teleconsultation platforms, particularly during and after COVID-19.

Guideline Background and Authority: Issued March 25, 2020 by Board of Governors (Medical Council of India was superseded, later replaced by National Medical Commission). Legal basis: Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations 2002. Scope: All Registered Medical Practitioners (RMPs) providing telemedicine services. Binding nature: Non-compliance constitutes professional misconduct, subject to disciplinary action.

Definition of Telemedicine: The delivery of health care services, where distance is a critical factor, by all health care professionals using information and communication technologies for the exchange of valid information for diagnosis, treatment and prevention of disease and injuries, research and evaluation.

Key Principles: Patient safety as paramount concern. Standards of care equivalent to in-person consultation. Informed consent mandatory before consultation. RMP discretion to determine appropriateness of telemedicine for specific case. Physical examination may be required - RMP must refer for in-person visit when clinically indicated.

Registered Medical Practitioner (RMP) Requirements: Only doctors registered with State Medical Council or National Medical Register can practice telemedicine. MBBS minimum qualification required. Registration must be current and in good standing. RMP must practice within scope of their registered qualification. International graduates must have Indian registration to practice telemedicine in India.

Modes of Telemedicine Consultation: Video (Most Comprehensive): Recommended for first consultations and complex cases. Enables visual assessment of patient. Best mode when examination findings needed. Audio (Telephonic): Suitable for follow-ups and simple complaints. Limited to conditions not requiring visual assessment. Appropriate when patient has technology constraints. Text-Based (Chat/Messaging): Appropriate for simple queries and follow-ups. Not suitable for emergencies or complex conditions. Asynchronous communication permitted with documented response times.

First Consultation vs Follow-up: First Consultation: Patient not seen by this RMP before. More detailed history taking required. Greater caution in prescribing. Video mode recommended. Follow-up Consultation: Patient previously examined in-person by same RMP. Diagnosis already established. May use any mode appropriate to clinical situation. Greater flexibility in prescribing.

Consultation Documentation Requirements: Patient identification and verification. Chief complaint and history. Mode of consultation. Assessment/diagnosis. Advice/prescription given. Follow-up recommendations. Medical records maintained per standard requirements (minimum 3 years).',
        '["Study Telemedicine Practice Guidelines 2020 in detail - understand scope, RMP requirements, and consultation protocols", "Verify RMP registration requirements for your platform - implement NMC/State Medical Council registration verification process", "Define consultation protocols by mode (video/audio/text) aligned with TPG recommendations", "Create informed consent process and documentation meeting TPG requirements"]'::jsonb,
        '["Telemedicine Practice Guidelines 2020 Full Text with clause-by-clause analysis and practical interpretation", "RMP Verification Process Guide covering NMC register search, state council verification, and ongoing monitoring", "Consultation Mode Selection Matrix mapping clinical scenarios to appropriate telemedicine modes", "Telemedicine Informed Consent Template meeting TPG requirements with customization guidance"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 17: Prescription Guidelines
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        17,
        'Telemedicine Prescription Regulations',
        'Prescription via telemedicine is subject to specific restrictions under TPG 2020. Understanding what can and cannot be prescribed remotely is essential for platform compliance and patient safety.

Prescription Categories Under TPG: List O (Over-the-Counter): Minimal restrictions - can be prescribed through any mode. Examples: Paracetamol, antacids, ORS, simple cough syrups, vitamins. RMP discretion on appropriateness. List A (Prescription Required, Low Risk): Can be prescribed via telemedicine with appropriate assessment. First consultation: 5 days maximum supply. Follow-up: Up to 30 days supply. Examples: Antibiotics (non-resistant), antihypertensives, antidiabetics, antihistamines.

List B (Special Conditions Apply): Can be prescribed only with documented clinical diagnosis. Requires prior in-person assessment for first prescription of many. Refills via telemedicine possible with ongoing monitoring. Examples: Anti-anxiety drugs, sleep medications, certain hormones. Special documentation requirements for prescription.

Prohibited Prescriptions (List P): Cannot be prescribed via telemedicine under any circumstances. Schedule X drugs: Narcotic and psychotropic substances. Drugs requiring physical examination for dosing: Warfarin (requires INR monitoring), insulin (requires glucose monitoring), chemotherapy agents. Drugs with high abuse potential. Emergency medications requiring immediate in-person assessment.

Prescription Format Requirements: RMP identification: Name, qualification, registration number. Patient identification: Name, age, gender, contact details. Date and time of consultation. Mode of consultation (video/audio/text). Diagnosis/provisional diagnosis. Drug details: Name (generic preferred), dosage, frequency, duration. Instructions and warnings. RMP signature (digital signature acceptable). Unique consultation identifier for tracking.

E-Prescription Platform Requirements: Prescription generation integrated with EMR. Drug database with scheduling classification. Automatic warnings for prohibited prescriptions. Audit trail of all prescriptions issued. Integration with e-pharmacy for fulfillment. Digital signature capability for RMP.

Common Compliance Issues: Prescribing without adequate history (30% of compliance complaints). Prescribing Schedule H1 drugs without proper documentation. Exceeding permitted supply duration. Prescribing prohibited medications via telemedicine. Inadequate patient identity verification. Missing prescription elements.

Liability Considerations: RMP remains responsible for prescription appropriateness. Platform has duty to facilitate compliance (warning systems, verification). Medical malpractice standards apply equally to telemedicine. Professional indemnity insurance should cover telemedicine practice.',
        '["Implement drug classification system on your platform - categorize all prescribable drugs as List O, A, B, or Prohibited", "Build prescription guardrails preventing prohibited prescriptions and alerting for special-condition drugs", "Create e-prescription format meeting TPG requirements with all mandatory elements and digital signature capability", "Develop prescription record management system with appropriate retention and retrieval capabilities"]'::jsonb,
        '["TPG Drug Classification Reference with List O, A, B, and Prohibited categorization for 500+ common drugs", "E-Prescription Template Generator meeting TPG format requirements with state-wise customization", "Prescription Compliance Checklist for telemedicine platforms covering prohibited scenarios and required documentation", "Prescription Audit Protocol for regular compliance monitoring with sample audit report format"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 18: Platform Compliance Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        18,
        'Telemedicine Platform Compliance',
        'Telemedicine platforms enabling RMP-patient consultations have specific compliance obligations beyond what individual practitioners face. Platform operators must build infrastructure supporting regulatory compliance while enabling seamless user experience.

Platform Operator Responsibilities: Technology infrastructure enabling compliant consultations. RMP verification and ongoing monitoring. Patient identity verification capabilities. Consultation documentation and record keeping. Privacy and data security implementation. Facilitation (not provision) of medical services.

RMP Onboarding Requirements: Registration verification: Verify NMC registration or State Medical Council registration. Check for disciplinary actions or practice restrictions. Ongoing monitoring: Annual re-verification of registration status. Monitor for new restrictions or suspensions. Documentation: Maintain RMP credentials file with registration certificate, qualification proof, photo ID. Terms of engagement: Agreement specifying compliance responsibilities, conduct standards, and liability allocation.

Patient Identity Verification: Pre-consultation: Collect basic demographics, ID proof for first-time patients. Consultation: Verify patient identity matches registration (video verification ideal). Age verification: Critical for pediatric and elderly patients (consent implications). Special cases: Emergency verification protocols, verification for minors.

Consultation Technology Requirements: Video consultation: Minimum 256 kbps bandwidth recommendation, end-to-end encryption. Audio consultation: Clear communication with call recording (with consent). Chat/messaging: Message delivery confirmation, asynchronous response tracking. All modes: Session logging, timestamp documentation, technical failure handling.

Data Privacy and Security: Data Protection Compliance: Patient data handling per DPDP Act requirements. Consent for data collection, storage, and sharing. Minimal data collection principle. Health data treated as sensitive personal data. Technical Security: End-to-end encryption for consultations. Secure data storage (encryption at rest). Access controls with audit logging. Regular security assessments and penetration testing. Data Localization: Health data may have localization requirements under evolving regulations. Server infrastructure planning for India-based data storage.

Complaint and Grievance Handling: Patient complaints: Clear escalation pathway for consultation-related grievances. RMP complaints: Process for reporting RMP misconduct to medical councils. Platform accountability: Response timelines, resolution documentation. Regulatory reporting: Serious incident reporting to appropriate authorities.

Liability Framework: Platform as facilitator: Generally not liable for RMP medical decisions if proper verification done. Due diligence defense: Demonstrable compliance processes reduce liability exposure. Insurance: Technology errors and omissions coverage, cyber liability insurance. Indemnification: Clear terms between platform and RMPs regarding liability allocation.',
        '["Build RMP onboarding workflow with registration verification, credential documentation, and compliance agreement", "Implement patient identity verification process appropriate for consultation mode and risk level", "Ensure platform technology meets consultation requirements: encryption, recording, documentation integration", "Develop privacy compliance framework covering consent, data handling, and security requirements"]'::jsonb,
        '["RMP Onboarding Checklist covering verification, documentation, and agreement requirements", "Patient Identity Verification Protocol with mode-wise requirements and special case handling", "Telemedicine Platform Technical Standards covering video, audio, and messaging requirements", "Privacy Policy Template for telemedicine platforms addressing DPDP Act requirements"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 19: E-Pharmacy Integration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        19,
        'E-Pharmacy Regulatory Framework',
        'E-pharmacy operations in India operate in an evolving regulatory environment. While draft e-pharmacy rules have been proposed multiple times, the current framework relies on existing D&C Act provisions with state-level retail licenses. Understanding this landscape is crucial for telemedicine platforms integrating prescription fulfillment.

Current Regulatory Status: No central e-pharmacy legislation enacted (as of 2024). Multiple draft rules proposed (2018, 2021) but not finalized. Operations under existing D&C Act: State retail drug license required, compliance with scheduling requirements, pharmacist supervision. Legal status: Technically permissible under current framework if licenses obtained, but gray areas remain.

Draft E-Pharmacy Rules Key Provisions: If enacted, would require: Central registration with CDSCO for e-pharmacy operations. State license remains required for physical fulfillment. Registered pharmacist for prescription validation. Display of license details on platform. Prohibition on sale of Schedule X and select Schedule H drugs online.

Current Operating Models: Model 1 - Integrated Marketplace: Platform operates as technology facilitator connecting licensed pharmacies with patients. Each pharmacy holds own retail license. Platform provides ordering interface and logistics. Examples: 1mg, PharmEasy, NetMeds. Compliance: Platform terms must ensure partner pharmacies are licensed.

Model 2 - Owned Pharmacy Network: Platform operates own licensed pharmacy locations. Direct control over compliance. Higher capital requirement, better quality control. Hybrid approaches common: owned pharmacies in metros, partners in smaller cities.

Prescription Verification Process: Receive prescription (electronic from telemedicine or uploaded by patient). Verify RMP credentials against prescription. Check drug scheduling and prescription validity. Pharmacist review for drug interactions, dosage appropriateness. Patient identity verification before dispensing. Maintain dispensing records as required.

Licensing Requirements by State: Retail Drug License: Form 20/21 under D&C Rules, issued by State Drug Controller. Requirements vary by state: premises specifications, pharmacist employment, security arrangements. Fee range: Rs 1,000-5,000 depending on state. Validity: 5 years typically, annual renewal or compliance certificates.

Multi-State Operations: Separate license required in each state where physical dispensing occurs. Central fulfillment with multi-state shipping under legal scrutiny. Some states have taken enforcement action against out-of-state e-pharmacies. Strategy: Obtain licenses in key states, partner with licensed pharmacies in others.

Cold Chain and Logistics: Temperature-sensitive medications require cold chain logistics. Last-mile delivery temperature monitoring. Special handling for injectables, biologics, vaccines. Documentation of temperature maintenance during transit.',
        '["Determine e-pharmacy operating model appropriate for your business: marketplace, owned pharmacies, or hospital integration", "Identify retail drug license requirements in your primary operating states - initiate license applications", "Build prescription verification workflow ensuring pharmacist review, RMP validation, and patient identity confirmation", "Develop logistics solution addressing cold chain requirements for temperature-sensitive medications"]'::jsonb,
        '["E-Pharmacy Operating Model Comparison with regulatory, capital, and compliance implications of each approach", "State-wise Retail Drug License Guide covering application process, fees, and specific requirements for major states", "Prescription Verification SOP Template meeting regulatory requirements with pharmacist review documentation", "Cold Chain Logistics Requirements for pharmaceutical distribution with monitoring and documentation standards"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 20: Telemedicine for Specialists
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_4_id,
        20,
        'Specialty Telemedicine Applications',
        'Different medical specialties have varying degrees of telemedicine suitability based on examination requirements, diagnostic needs, and intervention types. Understanding specialty-specific considerations enables focused product development and appropriate use case targeting.

High Telemedicine Suitability Specialties: Dermatology: Visual examination via high-quality images/video highly effective. Teledermatology achieves 80%+ diagnostic concordance with in-person. Image quality standards: Minimum 1080p, proper lighting, multiple angles. Asynchronous (store-and-forward) models effective for many conditions. Limitations: Palpation-dependent diagnoses, biopsy requirements.

Psychiatry/Mental Health: Conversation-based assessment well-suited to video consultation. Evidence shows equivalent outcomes to in-person for many conditions. High patient preference for privacy of remote consultation. Medication management feasible with appropriate safeguards. Limitations: Acute safety concerns, substance abuse assessment, involuntary treatment situations.

Radiology/Telepathology: Image-based specialties naturally suited to remote interpretation. Tele-radiology: Remote reading of X-rays, CT, MRI by qualified radiologists. Tele-pathology: Digital pathology for remote diagnosis. Regulatory: Reporting physician must be registered RMP in India.

Moderate Telemedicine Suitability: Cardiology: History and symptom assessment via telemedicine. ECG interpretation with remote monitoring devices. Echocardiography requires in-person, but follow-up can be remote. Remote cardiac monitoring (pacemaker checks) established. Limitations: Physical examination for murmurs, jugular venous pressure.

Pulmonology: Symptom assessment and medication management. Spirometry now available through connected devices. COPD/asthma management with remote monitoring effective. Limitations: Chest examination, acute respiratory distress.

Endocrinology/Diabetes: Chronic disease management highly effective via telemedicine. Integration with glucometers and CGM devices. Medication titration based on remote data. Thyroid management with periodic in-person assessments. Limitations: Physical examination for complications.

Limited Telemedicine Suitability: Surgery: Pre-operative consultation possible remotely. Post-operative follow-up appropriate for wound checks via video. Surgical intervention obviously requires in-person. Emergency assessment must defer to in-person evaluation.

Emergency Medicine: Telemedicine useful for triage and first-response guidance. Cannot replace emergency department assessment. Ambulance telemedicine for en-route guidance emerging. Clear protocols needed for emergency escalation.

Specialty Telemedicine Platform Features: Dermatology: High-resolution image capture, dermoscopy device integration, image annotation tools. Mental Health: Extended session scheduling (45-60 min), mood tracking integration, crisis intervention protocols. Cardiology: ECG device integration, remote monitoring dashboard, alert management. Diabetes: Glucometer/CGM integration, medication tracking, care plan management.',
        '["Identify target specialties for your telemedicine platform based on telemedicine suitability and market opportunity", "Develop specialty-specific consultation protocols addressing unique examination needs, limitations, and referral criteria", "Integrate relevant remote diagnostic devices (dermatoscopes, ECG, glucometers) with appropriate data visualization", "Create specialist network with RMPs qualified in target specialties, ensuring adequate geographic and time coverage"]'::jsonb,
        '["Specialty Telemedicine Suitability Matrix rating 25+ specialties on telemedicine effectiveness with use case examples", "Specialty-Specific Consultation Templates with history, examination proxies, and red flags by specialty", "Remote Diagnostic Device Integration Guide covering popular devices, data standards, and platform integration approaches", "Specialist Network Building Playbook with recruitment strategies, compensation models, and quality management"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Clinical Trials (Days 21-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Clinical Trials Framework',
        'Navigate clinical trial regulations under New Drugs and Clinical Trials Rules 2019 - understanding trial approval process, ethics committee requirements, investigator obligations, and building clinical trial technology solutions for the Indian market.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_5_id;

    -- Day 21: CT Rules 2019 Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        21,
        'New Drugs and Clinical Trials Rules 2019',
        'The New Drugs and Clinical Trials Rules 2019 replaced the earlier provisions under D&C Rules, establishing a modern framework for clinical research in India. These rules govern trials for drugs, biologics, medical devices, and digital health products requiring clinical validation.

Key Improvements Over Previous Framework: Defined timelines: 30 working days for trial approval (previously open-ended). Reduced approval layers: Single-window approach through CDSCO. Risk-proportionate requirements: Global trial data acceptance for approved drugs elsewhere. Compensation framework: Clear guidelines for trial-related injury compensation. Academic research facilitation: Simplified pathway for academic/investigator-initiated trials.

Scope of CT Rules 2019: New drugs: Chemical entities not previously approved in India. Investigational new drugs: Drugs in clinical development. Biologics: Including biosimilars requiring clinical trials. Medical devices: Clinical investigations for Class C/D devices. Bioequivalence studies: For generic drug approvals. Bioavailability studies: Pharmacokinetic characterization.

Trial Classifications: Global Clinical Trials: Multinational trials including Indian sites. 30-day approval timeline if drug approved in specified countries. Concurrent submission with other regulators permitted. India-Specific Trials: Trials designed specifically for Indian population. May be required for drugs with limited global data. Longer approval timeline (90-180 days possible). Post-Marketing Studies: Phase IV trials for approved products. Surveillance and additional indication studies. May be mandated by CDSCO as condition of approval.

CDSCO Organization for Trials: New Drug Division handles trial approvals. Subject Expert Committees provide scientific review. Drug Technical Advisory Board advises on policy matters. Clinical Trial Registry-India (CTRI) mandatory registration.

Key Regulatory Documents: Form CT-01: Application for clinical trial permission. Form CT-06: Clinical trial approval certificate. CT Protocol: Detailed trial design and procedures. Investigators Brochure: Summary of drug information for investigators. Informed Consent: Patient information and consent documentation.

Timeline Framework: Day 0: Complete application submitted. Day 3: Application review for completeness. Day 7: Queries issued if information gaps. Day 15: SEC meeting for review (if scheduled). Day 30: Approval/rejection decision communicated. Extensions possible for complex applications or additional information requests.',
        '["Study New Drugs and Clinical Trials Rules 2019 - understand scope, approval pathways, and timeline framework", "Identify which CT Rules provisions apply to your product - determine if clinical trial or other pathway applies", "Register on Clinical Trial Registry-India (CTRI) - understand mandatory registration requirements", "Map clinical trial approval timeline into product development plan - account for realistic approval duration"]'::jsonb,
        '["CT Rules 2019 Complete Text with practical annotations and recent amendments/clarifications", "Clinical Trial Pathway Decision Guide determining when trials are required vs alternative pathways", "CTRI Registration Walkthrough with step-by-step guidance and sample registration content", "Clinical Trial Timeline Planner with approval milestones and common delay factors"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22-25: Additional Clinical Trial lessons
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_mod_5_id, 22, 'Clinical Trial Approval Process', 'Obtaining clinical trial approval requires systematic preparation of documentation, engagement with ethics committees, and navigation of CDSCO review process. Understanding the sequence and requirements can significantly accelerate trial initiation. Pre-Application Phase: Protocol Development requires comprehensive trial protocol covering objectives, design, endpoints, statistical analysis. Medical writing support recommended for complex protocols. Scientific advice meeting with CDSCO available for novel therapies. Ethics Committee Approval: All ECs must be registered with CDSCO under CT Rules 2019. EC Review Process includes submission of protocol, ICF, investigator credentials. EC meeting typically monthly with initial response in 30 days. CDSCO Application Submission through Form CT-01 via SUGAM portal. Attach: Protocol, IB, EC approvals, site details, investigator CVs, regulatory certificates. Pay application fee (Rs 50,000 for Indian sponsors). CDSCO Review Process includes Screening for administrative completeness within 3 working days, Technical Review assigned to reviewer, SEC Review for scientific merit, and Decision communication within 30 days. Common Application Deficiencies: Protocol issues (40%), Documentation gaps (30%), Site concerns (20%), Regulatory history (10%). Post-Approval Requirements include trial initiation within 12 months, CTRI registration before first enrollment, SAE reporting within 24 hours, and annual safety reports.', '["Prepare clinical trial application package: protocol, IB, ICF, EC approvals, investigator credentials", "Identify and engage Ethics Committee appropriate for your trial sites", "Submit complete application through SUGAM portal with all required attachments", "Develop query response strategy for rapid responses to CDSCO queries"]'::jsonb, '["Clinical Trial Application Checklist (Form CT-01) with document requirements", "Ethics Committee Directory with registered ECs and meeting schedules", "Protocol Template meeting ICH-GCP and CDSCO requirements", "Query Response Best Practices Guide"]'::jsonb, 90, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 23, 'Clinical Trial Technology Solutions', 'Clinical trial technology represents a significant HealthTech opportunity, with the global clinical trial management market at $1.5 billion growing 12% annually. India conducts 3,000+ clinical trials annually, creating substantial demand for trial technology solutions. Clinical Trial Management System (CTMS) core functions include trial planning, site management, patient enrollment monitoring, budget management. Market opportunity: 500+ active trial sponsors in India. Electronic Data Capture (EDC) purpose: Collect and manage clinical trial data electronically replacing paper CRFs. Features include electronic CRF design, data validation, query management, audit trails. Patient Recruitment Technology addresses the challenge that 80% of trials fail to meet enrollment timelines. Decentralized Clinical Trial (DCT) Technology is emerging with components like remote consent, telemedicine visits, home nursing networks, and wearable monitoring. Regulatory Technology (RegTech) for trials includes CDSCO submission automation, EC management, compliance monitoring, and safety reporting automation.', '["Identify clinical trial technology opportunity aligned with your capabilities", "Research competitive landscape for your chosen solution", "Develop product concept addressing India-specific trial challenges", "Identify pilot customers among Indian sponsors and CROs"]'::jsonb, '["Clinical Trial Technology Market Map covering CTMS, EDC, recruitment, DCT solutions", "India Clinical Trial Sponsor Database", "DCT Enablement Framework for Indian trials", "Product Requirements Template for clinical trial technology"]'::jsonb, 90, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 24, 'Post-Market Surveillance Systems', 'Post-market surveillance (PMS) is mandatory for approved drugs and medical devices in India. Building effective PMS systems is both a regulatory requirement and a HealthTech opportunity. Regulatory Framework includes PvPI (Pharmacovigilance Programme of India) established 2010, Medical device vigilance under MDR 2017, and mandatory adverse event reporting. PvPI Structure includes National Coordinating Centre at IPC Ghaziabad, 5 Regional Centres, 350+ Adverse Drug Reaction Monitoring Centres, and Manufacturer Reporting. Reporting Requirements: Serious ADRs within 15 calendar days, death or life-threatening within 24-72 hours, aggregate PSURs for drugs. Medical Device Vigilance requires reporting of malfunction causing injury, unexpected adverse events, and Field Safety Corrective Actions. PMS System Requirements include ADR/AE collection, signal detection, case management, and regulatory reporting. HealthTech Opportunity: 2,000+ pharma and 1,000+ device companies need PMS solutions with most using manual processes currently.', '["Understand PMS requirements applicable to your products", "Design adverse event collection system", "Implement signal detection methodology", "If building PMS technology, identify target customers"]'::jsonb, '["PvPI Reporting Guide with forms and timelines", "Medical Device Vigilance SOP Template", "PMS Database Requirements Document", "Signal Detection Methodology Guide"]'::jsonb, 90, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 25, 'Real World Evidence Generation', 'Real World Evidence (RWE) is increasingly important for regulatory and commercial decision-making in healthcare. RWD sources include EHRs, claims data, patient registries, wearables. RWE applications in India include regulatory support (post-marketing commitments, indication expansion), commercial applications (HTA submissions, payer negotiations). RWD Sources in India: Hospital chains have substantial EHR data, IRDA mandates electronic health claims, disease-specific registries exist but quality varies, connected devices generating continuous data. RWE Generation Capabilities include retrospective studies (3-6 months), prospective registries (12-36 months), and hybrid approaches. Technology Platform Requirements: Data integration (ETL, harmonization, OMOP CDM), analytics engine (statistical analysis, ML, visualization), governance (privacy compliance, consent management, audit trails). Market opportunity: Rs 500+ crore annual RWE spending by pharma in India, growing as requirements increase.', '["Understand RWE applications relevant to your product or target market", "Identify RWD sources accessible for your therapeutic area", "Develop RWE generation capability internally or through partners", "If building RWE technology, define platform capabilities"]'::jsonb, '["RWE Study Design Framework covering retrospective, prospective, hybrid approaches", "India RWD Source Directory listing hospitals, registries, claims data", "OMOP Common Data Model Implementation Guide", "RWE Technology Platform Requirements Document"]'::jsonb, 90, 75, 4, NOW(), NOW());

    -- ========================================
    -- MODULE 6: ABDM Integration (Days 26-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'ABDM Integration',
        'Integrate with Ayushman Bharat Digital Mission - understanding ABHA ID, Health Information Exchange, Health Facility Registry, Health Professional Registry, and building ABDM-compliant healthcare applications.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_6_id;

    -- Day 26-30: ABDM lessons
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_mod_6_id, 26, 'ABDM Ecosystem Overview', 'Ayushman Bharat Digital Mission (ABDM) is India flagship digital health initiative creating interoperable infrastructure for health data exchange. Launched September 2021, targeting 500 million ABHA IDs by 2025 with 450+ million already created. ABDM Building Blocks: ABHA (Ayushman Bharat Health Account) provides unique 14-digit health ID for every citizen linked to mobile/Aadhaar. Health Facility Registry (HFR) is database of all health facilities with unique identifiers. Health Professional Registry (HPR) contains verified health professionals linked to NMC/Council registration. Health Information Exchange (HIE) includes Consent Manager for patient consent, HIPs that generate health data, and HIUs that request access. ABDM APIs cover ABHA creation, HFR search, HPR verification, and HIE data exchange. ABDM Compliance for HealthTech: HIP Registration for data generators, HIU Registration for data consumers, Sandbox Environment for integration testing. Business Implications include patient acquisition through ABHA, differentiation through early adoption, and data access with consent.', '["Study ABDM architecture and component interactions", "Determine your ABDM integration requirements: HIP, HIU, or both", "Register for ABDM Sandbox access at sandbox.abdm.gov.in", "Plan ABDM integration roadmap aligned with product development"]'::jsonb, '["ABDM Architecture Overview with component diagrams", "ABDM Integration Decision Guide for HIP/HIU requirements", "Sandbox Registration and Setup Guide", "ABDM Integration Roadmap Template"]'::jsonb, 90, 50, 0, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 27, 'ABHA ID Creation and Linking', 'ABHA (Ayushman Bharat Health Account) is the cornerstone of ABDM providing unique health identity. Format: 14-digit unique identifier (YY-DDDD-DDDD-DDDD) or ABHA Address (user@abdm). ABHA Creation Methods: Aadhaar-Based is most common with highest verification level, Mobile-Based for users without Aadhaar linkage, Assisted Creation by healthcare facilities. Integration APIs include Create ABHA, Get Profile, Search by ABHA, and Link Care Context. Authentication Flows: Aadhaar OTP (highest trust), Mobile OTP, Demographic verification, Token-Based for returning users. Implementation Considerations: User Experience should minimize friction, Error Handling for service availability, Data Storage should be secure, Consent Management should document user consent. Business Benefits include reliable patient identification, care coordination, government alignment, and patient trust.', '["Implement ABHA creation flow using appropriate method", "Design user experience minimizing friction with proper consent", "Build authentication handling for different verification methods", "Create ABHA storage and retrieval mechanism"]'::jsonb, '["ABHA API Documentation with endpoint specifications", "ABHA Creation UX Patterns from leading implementations", "Authentication Flow Diagrams for verification methods", "ABHA Integration Code Samples with error handling"]'::jsonb, 90, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 28, 'Health Information Exchange Implementation', 'ABDM Health Information Exchange (HIE) enables consent-based sharing of health records between providers. HIE Architecture: HIP (Health Information Provider) generates and holds health data, HIU (Health Information User) consumes health data with consent, Consent Manager manages patient consent centrally. Consent Framework: HIU initiates request specifying purpose, data types, time period, expiry. Patient receives notification, reviews, and grants/denies consent. Consent Artifact is digital record enabling data flow. Data Push (HIP Flow): Create care context after encounter, link to ABHA, notify patient, format data to FHIR, encrypt and push through gateway. Data Pull (HIU Flow): Discover patient care contexts, request consent, await approval, fetch data, decrypt and integrate. FHIR Data Standards: HL7 FHIR R4 standard with ABDM India-specific profiles. Key resources: Patient, Encounter, Observation, Condition, MedicationRequest. Implementation Complexity: HIP 2-4 months, HIU 3-6 months, Both 4-8 months.', '["Determine HIP and/or HIU requirements based on data flows", "Implement HIP capability: care context creation, FHIR formatting, encrypted push", "Implement HIU capability: consent request flow, data fetch, decryption", "Build FHIR data mapping for your clinical data types"]'::jsonb, '["ABDM HIE Technical Specification with API documentation", "FHIR Profile Guide for ABDM with India-specific definitions", "Consent Management UX Guidelines", "HIE Integration Architecture Patterns"]'::jsonb, 90, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 29, 'Health Facility and Professional Registries', 'Health Facility Registry (HFR) and Health Professional Registry (HPR) are foundational ABDM components for verification. HFR Purpose: Comprehensive database of all health facilities with 200,000+ registered. HFR Registration Process: Register at facility.abdm.gov.in with facility details, verification takes 2-4 weeks. HFR API Integration: Search facilities by location/type/services, get facility details, verify registration status. HPR Purpose: Verified database of health professionals with 150,000+ verified, linked to NMC and state councils. HPR Registration at hpr.abdm.gov.in with credentials, verification in 1-2 weeks. HPR API Integration: Search professionals, verify registration status (critical for telemedicine compliance), get credentials. Integration Benefits: For platforms - verified provider network and compliance; For facilities - discoverability and trust; For patients - confidence in legitimacy.', '["Register your organization/facility on HFR if applicable", "Implement HPR verification for all healthcare professionals on platform", "Build facility search/discovery feature using HFR APIs", "Create provider onboarding workflow with HFR/HPR integration"]'::jsonb, '["HFR Registration Guide with document requirements", "HPR Verification API Documentation with code samples", "Provider Discovery UX Patterns", "Provider Onboarding Workflow Template"]'::jsonb, 90, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 30, 'ABDM Compliance and Certification', 'Moving from sandbox to production ABDM integration requires completing compliance certification. ABDM Compliance Framework: Currently voluntary for private sector but increasingly expected by institutional customers. Compliance Categories: HIP, HIU, PHR App. Certification Process: Step 1 - Complete sandbox integration and testing. Step 2 - Self-assessment checklist completion. Step 3 - Certification application through ABDM portal. Step 4 - Technical review by ABDM team. Step 5 - Certification issued and listed in directory. Technical Requirements: HIP needs ABHA linking, care context creation, FHIR compliance, encryption, data push. HIU needs patient discovery, consent flow, consent UI, data pull, decryption. Security Requirements: End-to-end encryption, key management, audit logging, data retention policies, breach notification. Timeline: Development 2-4 months, Testing 1-2 months, Certification 2-4 weeks. Total 4-8 months. Post-Certification: Maintain compliance, periodic re-certification, incident reporting.', '["Complete all required ABDM integrations in sandbox", "Perform self-assessment against compliance checklist", "Submit certification application with documentation", "Prepare for production: infrastructure, monitoring, support"]'::jsonb, '["ABDM Compliance Checklist for HIP, HIU, PHR applications", "Certification Application Guide with requirements", "Production Readiness Assessment covering infrastructure and security", "ABDM Certified Application Case Studies"]'::jsonb, 90, 75, 4, NOW(), NOW());

    RAISE NOTICE 'Modules 3-6 (Days 11-30) created successfully for P21';

END $$;

COMMIT;
