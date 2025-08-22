-- P5: Legal Stack - Bulletproof Legal Framework
-- Corrected Database Migration Script
-- Version: 2.0.0
-- Date: 2025-08-21

BEGIN;

-- Check if P5 product already exists
DO $$
BEGIN
    -- Delete existing P5 data to prevent conflicts
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" IN (
            SELECT id FROM "Product" WHERE code = 'P5'
        )
    );
    DELETE FROM "Module" WHERE "productId" IN (
        SELECT id FROM "Product" WHERE code = 'P5'
    );
    DELETE FROM "Product" WHERE code = 'P5';
END $$;

-- Insert P5 Product
INSERT INTO "Product" (
    id,
    code,
    title,
    description,
    price,
    "isBundle",
    "bundleProducts",
    features,
    metadata,
    "estimatedDays",
    "createdAt",
    "updatedAt"
) VALUES (
    gen_random_uuid()::text,
    'P5',
    'Legal Stack - Bulletproof Legal Framework',
    'Build bulletproof legal infrastructure with contracts, IP protection, and dispute prevention for Indian startups.',
    799900, -- ₹7,999 in paise
    false,
    '[]'::jsonb,
    '[
        "300+ Legal Templates (₹1,50,000+ value)",
        "Complete Contract Mastery System",
        "IP Strategy & Protection Framework", 
        "Employment Law Compliance Suite",
        "Dispute Prevention Mechanisms",
        "Data Protection & Privacy Systems",
        "Regulatory Compliance Frameworks",
        "M&A Readiness Documentation",
        "Expert Legal Review Process",
        "Compliance Automation Tools",
        "Legal Risk Assessment Framework",
        "Professional Certification Program"
    ]'::jsonb,
    '{
        "duration": "45 days",
        "modules": 12,
        "templates": "300+",
        "certification": "Bar Council Recognized",
        "value": "₹1,50,000+ in templates",
        "outcomes": [
            "Bulletproof legal infrastructure established",
            "Complete IP protection and monetization strategy",
            "Employment law compliance systems",
            "Litigation-proof contracts and agreements",
            "Data protection and privacy compliance",
            "Regulatory compliance automation",
            "M&A ready documentation package",
            "Professional legal certification"
        ]
    }'::jsonb,
    45,
    now(),
    now()
);

-- Get the P5 product ID for modules
DO $$
DECLARE
    p5_product_id text;
BEGIN
    SELECT id INTO p5_product_id FROM "Product" WHERE code = 'P5';
    
    -- Insert 12 Modules for P5
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, p5_product_id, 'Legal Foundation Mastery', 'Build comprehensive understanding of Indian legal framework for startups', 1, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Contract Architecture & Design', 'Master the art of bulletproof contract creation and negotiation', 2, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Intellectual Property Strategy', 'Protect and monetize your innovations through comprehensive IP strategy', 3, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Employment Law Excellence', 'Build compliant HR systems and prevent employment disputes', 4, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Dispute Prevention & Resolution', 'Implement systems to prevent legal conflicts and resolve disputes efficiently', 5, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Data Protection & Privacy Compliance', 'Master GDPR, IT Act and build privacy-first systems', 6, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Regulatory Compliance Automation', 'Automate compliance across multiple regulatory frameworks', 7, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Corporate Governance Excellence', 'Establish world-class governance structures and board management', 8, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'M&A Legal Readiness', 'Prepare bulletproof documentation for mergers and acquisitions', 9, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'International Legal Expansion', 'Navigate cross-border legal requirements for global expansion', 10, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Legal Technology & Automation', 'Implement cutting-edge legal tech for efficiency and compliance', 11, now(), now()),
    (gen_random_uuid()::text, p5_product_id, 'Professional Certification & Mastery', 'Complete comprehensive assessment and earn Bar Council recognized certification', 12, now(), now());
END $$;

-- Insert first 12 core lessons (3-4 per module to start)
DO $$
DECLARE
    p5_product_id text;
    module_1_id text;
    module_2_id text;
    module_3_id text;
BEGIN
    SELECT id INTO p5_product_id FROM "Product" WHERE code = 'P5';
    SELECT id INTO module_1_id FROM "Module" WHERE "productId" = p5_product_id AND "orderIndex" = 1;
    SELECT id INTO module_2_id FROM "Module" WHERE "productId" = p5_product_id AND "orderIndex" = 2;
    SELECT id INTO module_3_id FROM "Module" WHERE "productId" = p5_product_id AND "orderIndex" = 3;
    
    -- Module 1: Legal Foundation Mastery (4 lessons)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", metadata, "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, module_1_id, 1, 'Indian Legal System for Startups', 
     'Master the fundamentals of Indian legal system, courts, and startup-specific regulations.',
     '[
        "Complete legal system assessment for your startup",
        "Identify applicable laws and regulations",
        "Create legal compliance calendar",
        "Document current legal gaps"
     ]'::jsonb,
     '[
        {"title": "Companies Act 2013 - Complete Guide", "type": "pdf", "isPremium": true},
        {"title": "Startup Legal Checklist Template", "type": "template", "isPremium": true},
        {"title": "Legal System Flow Chart", "type": "visual", "isPremium": false}
     ]'::jsonb,
     60, 75, 1,
     '{"difficulty": "Foundation", "category": "Legal Framework"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_1_id, 2, 'Business Structure Optimization', 
     'Choose and optimize the perfect business structure for growth, funding, and exit strategies.',
     '[
        "Analyze current business structure effectiveness",
        "Model alternative structures for growth scenarios",
        "Create structure optimization roadmap",
        "Implement structure improvements"
     ]'::jsonb,
     '[
        {"title": "Business Structure Comparison Matrix", "type": "tool", "isPremium": true},
        {"title": "Structure Change Documentation Kit", "type": "template", "isPremium": true},
        {"title": "Tax Optimization Guide by Structure", "type": "guide", "isPremium": true}
     ]'::jsonb,
     75, 100, 2,
     '{"difficulty": "Intermediate", "category": "Corporate Structure"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_1_id, 3, 'Legal Risk Assessment Framework', 
     'Build comprehensive systems to identify, assess, and mitigate legal risks proactively.',
     '[
        "Conduct comprehensive legal risk audit",
        "Implement risk scoring methodology",
        "Create risk mitigation protocols",
        "Establish ongoing risk monitoring"
     ]'::jsonb,
     '[
        {"title": "Legal Risk Assessment Tool", "type": "calculator", "isPremium": true},
        {"title": "Risk Mitigation Playbook", "type": "playbook", "isPremium": true},
        {"title": "Legal Insurance Planning Guide", "type": "guide", "isPremium": true}
     ]'::jsonb,
     90, 125, 3,
     '{"difficulty": "Advanced", "category": "Risk Management"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_1_id, 4, 'Legal Budget & Cost Optimization', 
     'Master legal cost management and build scalable legal operations without breaking the bank.',
     '[
        "Create annual legal budget framework",
        "Optimize legal service provider mix",
        "Implement legal cost tracking systems",
        "Establish legal ROI measurement"
     ]'::jsonb,
     '[
        {"title": "Legal Budget Planning Template", "type": "template", "isPremium": true},
        {"title": "Legal Service Provider Comparison", "type": "database", "isPremium": true},
        {"title": "Legal Operations Optimization Guide", "type": "guide", "isPremium": true}
     ]'::jsonb,
     75, 100, 4,
     '{"difficulty": "Intermediate", "category": "Legal Operations"}'::jsonb,
     now(), now()),

    -- Module 2: Contract Architecture & Design (4 lessons)
    (gen_random_uuid()::text, module_2_id, 5, 'Contract Design Principles', 
     'Master the art and science of creating bulletproof contracts that protect your interests.',
     '[
        "Learn 10 fundamental contract design principles",
        "Analyze and improve existing contracts",
        "Create contract design checklist",
        "Practice contract risk analysis"
     ]'::jsonb,
     '[
        {"title": "Contract Design Masterclass Video", "type": "video", "isPremium": true},
        {"title": "Contract Analysis Worksheet", "type": "template", "isPremium": true},
        {"title": "Legal Language Simplification Guide", "type": "guide", "isPremium": true}
     ]'::jsonb,
     90, 125, 1,
     '{"difficulty": "Advanced", "category": "Contract Law"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_2_id, 6, 'Customer Agreement Mastery', 
     'Create customer contracts that drive growth while protecting your business interests.',
     '[
        "Design customer onboarding contract flow",
        "Create pricing and payment protection clauses",
        "Implement service level agreements",
        "Build customer dispute resolution system"
     ]'::jsonb,
     '[
        {"title": "Customer Agreement Template Library", "type": "template", "isPremium": true},
        {"title": "SLA Design Toolkit", "type": "tool", "isPremium": true},
        {"title": "Payment Protection Clause Bank", "type": "resource", "isPremium": true}
     ]'::jsonb,
     85, 110, 2,
     '{"difficulty": "Intermediate", "category": "Customer Relations"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_2_id, 7, 'Vendor & Partnership Agreements', 
     'Secure your supply chain and partnerships with ironclad vendor agreements.',
     '[
        "Create vendor qualification framework",
        "Design partnership agreement templates",
        "Implement vendor performance monitoring",
        "Establish partnership dispute resolution"
     ]'::jsonb,
     '[
        {"title": "Vendor Agreement Template Suite", "type": "template", "isPremium": true},
        {"title": "Partnership Structure Guide", "type": "guide", "isPremium": true},
        {"title": "Vendor Management System Template", "type": "system", "isPremium": true}
     ]'::jsonb,
     80, 105, 3,
     '{"difficulty": "Intermediate", "category": "Business Relations"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_2_id, 8, 'Employment Contract Excellence', 
     'Build employment agreements that attract talent while protecting company interests.',
     '[
        "Design role-based employment templates",
        "Create comprehensive policy integration",
        "Implement performance-based protections",
        "Establish termination protocols"
     ]'::jsonb,
     '[
        {"title": "Employment Contract Template Library", "type": "template", "isPremium": true},
        {"title": "Policy Integration Checklist", "type": "checklist", "isPremium": true},
        {"title": "HR Legal Compliance Guide", "type": "guide", "isPremium": true}
     ]'::jsonb,
     75, 100, 4,
     '{"difficulty": "Advanced", "category": "Employment Law"}'::jsonb,
     now(), now()),

    -- Module 3: Intellectual Property Strategy (4 lessons)
    (gen_random_uuid()::text, module_3_id, 9, 'IP Portfolio Assessment & Strategy', 
     'Identify, catalog, and strategically protect all your intellectual property assets.',
     '[
        "Conduct comprehensive IP audit",
        "Create IP protection priority matrix",
        "Design IP monetization roadmap",
        "Establish IP monitoring systems"
     ]'::jsonb,
     '[
        {"title": "IP Audit Comprehensive Toolkit", "type": "tool", "isPremium": true},
        {"title": "IP Strategy Planning Template", "type": "template", "isPremium": true},
        {"title": "IP Monetization Case Studies", "type": "case_study", "isPremium": true}
     ]'::jsonb,
     95, 150, 1,
     '{"difficulty": "Advanced", "category": "Intellectual Property"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_3_id, 10, 'Patent Filing & Management', 
     'Master the patent system to protect innovations and build valuable IP portfolios.',
     '[
        "Identify patentable innovations in your startup",
        "Create patent filing strategy and timeline",
        "Design patent portfolio management system",
        "Establish innovation documentation process"
     ]'::jsonb,
     '[
        {"title": "Patent Filing Complete Guide", "type": "guide", "isPremium": true},
        {"title": "Innovation Documentation System", "type": "system", "isPremium": true},
        {"title": "Patent Portfolio Management Tool", "type": "tool", "isPremium": true}
     ]'::jsonb,
     120, 175, 2,
     '{"difficulty": "Expert", "category": "Patent Law"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_3_id, 11, 'Trademark & Brand Protection', 
     'Build comprehensive brand protection strategies across all channels and markets.',
     '[
        "Design comprehensive trademark strategy",
        "Implement brand monitoring systems",
        "Create brand protection protocols",
        "Establish enforcement procedures"
     ]'::jsonb,
     '[
        {"title": "Trademark Strategy Playbook", "type": "playbook", "isPremium": true},
        {"title": "Brand Protection Monitoring Tools", "type": "tool", "isPremium": true},
        {"title": "Brand Enforcement Template Library", "type": "template", "isPremium": true}
     ]'::jsonb,
     85, 115, 3,
     '{"difficulty": "Intermediate", "category": "Brand Protection"}'::jsonb,
     now(), now()),
     
    (gen_random_uuid()::text, module_3_id, 12, 'Trade Secrets & Confidentiality', 
     'Protect your competitive advantages through sophisticated trade secret management.',
     '[
        "Identify and classify trade secrets",
        "Create comprehensive confidentiality systems",
        "Implement access control protocols",
        "Design trade secret protection training"
     ]'::jsonb,
     '[
        {"title": "Trade Secret Identification Matrix", "type": "tool", "isPremium": true},
        {"title": "Confidentiality Agreement Suite", "type": "template", "isPremium": true},
        {"title": "Trade Secret Protection Training", "type": "training", "isPremium": true}
     ]'::jsonb,
     90, 125, 4,
     '{"difficulty": "Advanced", "category": "Trade Secrets"}'::jsonb,
     now(), now());
END $$;

COMMIT;

-- Verification queries
SELECT 'P5 Product Created' as status, code, title, price FROM "Product" WHERE code = 'P5';
SELECT 'P5 Modules Created' as status, COUNT(*) as module_count FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P5');
SELECT 'P5 Lessons Created' as status, COUNT(*) as lesson_count FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P5'));