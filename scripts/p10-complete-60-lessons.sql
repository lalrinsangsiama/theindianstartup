-- P10: Patent Mastery - Complete 60 Lessons with All Resources
-- This script adds all missing lessons (Days 17-60) and comprehensive resources

-- =============================================
-- Module 4: Prosecution & Examination (Days 17-22)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_17',
    'p10_module_4',
    17,
    'First Examination Report Response',
    'Master FER response strategies, overcome Section 3 rejections, handle claim objections, and draft professional responses.',
    '[
        {
            "title": "FER Response Framework Development",
            "description": "Create comprehensive response templates for common objections with argument libraries",
            "timeRequired": "180 minutes",
            "deliverable": "FER response framework with 20+ argument templates"
        },
        {
            "title": "Amendment Strategy Development",
            "description": "Develop claim amendment strategies while maintaining original scope",
            "timeRequired": "120 minutes",
            "deliverable": "Amendment decision tree with narrowing strategies"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "FER Response Template Library",
            "description": "20+ professional response templates for common examination objections",
            "url": "/templates/p10/fer-response-library.docx"
        },
        {
            "type": "guide",
            "title": "Objection Override Strategies",
            "description": "Comprehensive guide for overcoming patent examiner objections",
            "url": "/guides/p10/objection-override-strategies.pdf"
        },
        {
            "type": "template",
            "title": "Amendment Drafting Template",
            "description": "Professional amendment format with tracking and justification",
            "url": "/templates/p10/amendment-drafting-template.docx"
        }
    ]'::jsonb,
    150,
    140,
    17,
    NOW(),
    NOW()
),
(
    'p10_lesson_18',
    'p10_module_4',
    18,
    'Overcoming Novelty and Obviousness Rejections',
    'Master prior art differentiation, unexpected results documentation, secondary considerations, and expert declaration strategies.',
    '[
        {
            "title": "Prior Art Differentiation Matrix",
            "description": "Create detailed differentiation charts for cited prior art references",
            "timeRequired": "150 minutes",
            "deliverable": "Complete differentiation matrix with technical advantages"
        },
        {
            "title": "Expert Declaration Preparation",
            "description": "Draft expert declaration supporting non-obviousness arguments",
            "timeRequired": "90 minutes",
            "deliverable": "Expert declaration template with supporting evidence"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Prior Art Differentiation Matrix",
            "description": "Systematic comparison framework for distinguishing cited references",
            "url": "/templates/p10/prior-art-differentiation-matrix.xlsx"
        },
        {
            "type": "template",
            "title": "Expert Declaration Template",
            "description": "Professional expert declaration format for patent prosecution",
            "url": "/templates/p10/expert-declaration-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    18,
    NOW(),
    NOW()
),
(
    'p10_lesson_19',
    'p10_module_4',
    19,
    'Hearing Preparation and Advocacy',
    'Excel at oral hearing preparation, examiner interview strategies, argument presentation, and real-time objection handling.',
    '[
        {
            "title": "Hearing Presentation Development",
            "description": "Create compelling visual presentations for patent office hearings",
            "timeRequired": "120 minutes",
            "deliverable": "Professional hearing presentation with 30+ slides"
        },
        {
            "title": "Mock Hearing Practice",
            "description": "Conduct mock hearing with anticipated examiner questions",
            "timeRequired": "90 minutes",
            "deliverable": "Response script for 20+ anticipated questions"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Hearing Presentation Template",
            "description": "Professional PowerPoint template for patent office hearings",
            "url": "/templates/p10/hearing-presentation-template.pptx"
        },
        {
            "type": "guide",
            "title": "Examiner Interview Strategy Guide",
            "description": "Comprehensive strategies for successful examiner interactions",
            "url": "/guides/p10/examiner-interview-guide.pdf"
        }
    ]'::jsonb,
    120,
    120,
    19,
    NOW(),
    NOW()
),
(
    'p10_lesson_20',
    'p10_module_4',
    20,
    'Opposition Proceedings',
    'Master pre-grant and post-grant opposition strategies, evidence preparation, and defensive tactics.',
    '[
        {
            "title": "Opposition Defense Strategy",
            "description": "Develop comprehensive defense against potential oppositions",
            "timeRequired": "150 minutes",
            "deliverable": "Opposition defense playbook with counter-arguments"
        },
        {
            "title": "Evidence Package Preparation",
            "description": "Compile supporting evidence for opposition proceedings",
            "timeRequired": "120 minutes",
            "deliverable": "Complete evidence package with 50+ supporting documents"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Opposition Defense Playbook",
            "description": "Comprehensive strategies for defending against patent oppositions",
            "url": "/templates/p10/opposition-defense-playbook.docx"
        },
        {
            "type": "template",
            "title": "Evidence Organization Template",
            "description": "Systematic framework for organizing opposition evidence",
            "url": "/templates/p10/evidence-organization-template.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    20,
    NOW(),
    NOW()
),
(
    'p10_lesson_21',
    'p10_module_4',
    21,
    'Expedited Examination Strategies',
    'Leverage startup benefits, fast-track procedures, PPH programs, and acceleration tactics.',
    '[
        {
            "title": "Fast-Track Application Preparation",
            "description": "Prepare application for expedited examination with all requirements",
            "timeRequired": "90 minutes",
            "deliverable": "Complete fast-track application package"
        },
        {
            "title": "PPH Strategy Development",
            "description": "Develop Patent Prosecution Highway strategy for multiple jurisdictions",
            "timeRequired": "60 minutes",
            "deliverable": "PPH roadmap for 5+ countries"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Fast-Track Application Checklist",
            "description": "Complete requirements for expedited examination in India",
            "url": "/templates/p10/fast-track-checklist.pdf"
        },
        {
            "type": "guide",
            "title": "PPH Strategy Guide",
            "description": "Comprehensive guide to Patent Prosecution Highway programs",
            "url": "/guides/p10/pph-strategy-guide.pdf"
        }
    ]'::jsonb,
    90,
    100,
    21,
    NOW(),
    NOW()
),
(
    'p10_lesson_22',
    'p10_module_4',
    22,
    'Grant Procedures and Post-Grant Management',
    'Navigate grant procedures, annuity management, maintenance strategies, and portfolio optimization.',
    '[
        {
            "title": "Post-Grant Management System",
            "description": "Establish comprehensive system for managing granted patents",
            "timeRequired": "120 minutes",
            "deliverable": "Complete post-grant management framework"
        },
        {
            "title": "Annuity Payment Calendar",
            "description": "Create multi-year annuity payment schedule with reminders",
            "timeRequired": "60 minutes",
            "deliverable": "5-year annuity calendar with cost projections"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Patent Grant Management System",
            "description": "Comprehensive framework for post-grant patent management",
            "url": "/templates/p10/grant-management-system.xlsx"
        },
        {
            "type": "calculator",
            "title": "Annuity Cost Calculator",
            "description": "Calculate maintenance fees across multiple jurisdictions",
            "url": "/templates/p10/annuity-cost-calculator.xlsx"
        }
    ]'::jsonb,
    120,
    120,
    22,
    NOW(),
    NOW()
);

-- =============================================
-- Module 5: Patent Portfolio Management (Days 23-27)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_23',
    'p10_module_5',
    23,
    'Strategic Portfolio Building',
    'Design patent portfolio architecture, technology roadmap alignment, competitive positioning, and value creation strategies.',
    '[
        {
            "title": "Portfolio Architecture Design",
            "description": "Create strategic patent portfolio structure aligned with business goals",
            "timeRequired": "180 minutes",
            "deliverable": "Portfolio architecture with 50+ patent opportunities"
        },
        {
            "title": "Technology Roadmap Integration",
            "description": "Align patent strategy with 5-year technology roadmap",
            "timeRequired": "120 minutes",
            "deliverable": "Integrated IP-technology roadmap"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Portfolio Architecture Framework",
            "description": "Strategic framework for building valuable patent portfolios",
            "url": "/templates/p10/portfolio-architecture-framework.xlsx"
        },
        {
            "type": "template",
            "title": "IP-Technology Roadmap Template",
            "description": "Integrated planning tool for IP and technology development",
            "url": "/templates/p10/ip-technology-roadmap.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    23,
    NOW(),
    NOW()
),
(
    'p10_lesson_24',
    'p10_module_5',
    24,
    'Patent Landscaping and White Space Analysis',
    'Master competitive intelligence gathering, technology gap identification, opportunity mapping, and strategic positioning.',
    '[
        {
            "title": "Comprehensive Patent Landscape Analysis",
            "description": "Conduct detailed landscape analysis for your technology domain",
            "timeRequired": "240 minutes",
            "deliverable": "Patent landscape report with 100+ analyzed patents"
        },
        {
            "title": "White Space Opportunity Mapping",
            "description": "Identify and prioritize unclaimed technology territories",
            "timeRequired": "120 minutes",
            "deliverable": "White space map with 20+ opportunities"
        }
    ]'::jsonb,
    '[
        {
            "type": "tool",
            "title": "Patent Landscape Analyzer Pro",
            "description": "Advanced tool for comprehensive patent landscape analysis",
            "url": "/tools/p10/landscape-analyzer-pro"
        },
        {
            "type": "template",
            "title": "White Space Analysis Framework",
            "description": "Systematic approach to identifying patent opportunities",
            "url": "/templates/p10/white-space-framework.xlsx"
        }
    ]'::jsonb,
    180,
    150,
    24,
    NOW(),
    NOW()
),
(
    'p10_lesson_25',
    'p10_module_5',
    25,
    'Portfolio Optimization and Pruning',
    'Evaluate patent value, make abandonment decisions, optimize maintenance costs, and maximize portfolio ROI.',
    '[
        {
            "title": "Patent Value Assessment",
            "description": "Evaluate each patent using multi-criteria value framework",
            "timeRequired": "150 minutes",
            "deliverable": "Value scores for entire portfolio with recommendations"
        },
        {
            "title": "Cost Optimization Strategy",
            "description": "Develop strategy to reduce maintenance costs by 40%",
            "timeRequired": "90 minutes",
            "deliverable": "Cost optimization plan with pruning recommendations"
        }
    ]'::jsonb,
    '[
        {
            "type": "calculator",
            "title": "Patent Value Calculator",
            "description": "Multi-criteria patent valuation tool with scoring algorithm",
            "url": "/templates/p10/patent-value-calculator.xlsx"
        },
        {
            "type": "template",
            "title": "Portfolio Pruning Decision Matrix",
            "description": "Framework for making strategic abandonment decisions",
            "url": "/templates/p10/pruning-decision-matrix.xlsx"
        }
    ]'::jsonb,
    120,
    120,
    25,
    NOW(),
    NOW()
),
(
    'p10_lesson_26',
    'p10_module_5',
    26,
    'IP Governance and Policies',
    'Establish IP committees, decision frameworks, approval processes, and organizational policies.',
    '[
        {
            "title": "IP Policy Framework Development",
            "description": "Create comprehensive IP policy for your organization",
            "timeRequired": "180 minutes",
            "deliverable": "Complete IP policy document with procedures"
        },
        {
            "title": "IP Committee Charter",
            "description": "Establish IP committee with roles and responsibilities",
            "timeRequired": "90 minutes",
            "deliverable": "IP committee charter with meeting cadence"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "IP Policy Template",
            "description": "Comprehensive organizational IP policy framework",
            "url": "/templates/p10/ip-policy-template.docx"
        },
        {
            "type": "template",
            "title": "IP Committee Charter Template",
            "description": "Framework for establishing IP governance committee",
            "url": "/templates/p10/ip-committee-charter.docx"
        }
    ]'::jsonb,
    120,
    120,
    26,
    NOW(),
    NOW()
),
(
    'p10_lesson_27',
    'p10_module_5',
    27,
    'Patent Analytics and Reporting',
    'Master KPI development, dashboard creation, executive reporting, and strategic insights generation.',
    '[
        {
            "title": "IP Dashboard Development",
            "description": "Create executive dashboard with key patent metrics",
            "timeRequired": "150 minutes",
            "deliverable": "Interactive IP dashboard with 20+ KPIs"
        },
        {
            "title": "Quarterly IP Report Creation",
            "description": "Develop comprehensive IP report for board presentation",
            "timeRequired": "120 minutes",
            "deliverable": "Professional IP report with insights and recommendations"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "IP Dashboard Template",
            "description": "Executive dashboard with automated patent metrics",
            "url": "/templates/p10/ip-dashboard-template.xlsx"
        },
        {
            "type": "template",
            "title": "Board IP Report Template",
            "description": "Professional template for board-level IP reporting",
            "url": "/templates/p10/board-ip-report-template.pptx"
        }
    ]'::jsonb,
    150,
    140,
    27,
    NOW(),
    NOW()
);

-- =============================================
-- Module 6: Commercialization & Monetization (Days 28-33)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_28',
    'p10_module_6',
    28,
    'Patent Valuation Methods',
    'Master cost, market, and income approaches to patent valuation, understand option pricing models, and develop valuation frameworks.',
    '[
        {
            "title": "Multi-Method Patent Valuation",
            "description": "Value patents using three different methodologies",
            "timeRequired": "180 minutes",
            "deliverable": "Valuation report with three independent estimates"
        },
        {
            "title": "Valuation Model Calibration",
            "description": "Calibrate valuation model using market comparables",
            "timeRequired": "120 minutes",
            "deliverable": "Calibrated valuation model with benchmarks"
        }
    ]'::jsonb,
    '[
        {
            "type": "calculator",
            "title": "Patent Valuation Suite",
            "description": "Comprehensive valuation tool using multiple methodologies",
            "url": "/templates/p10/patent-valuation-suite.xlsx"
        },
        {
            "type": "template",
            "title": "Valuation Report Template",
            "description": "Professional patent valuation report format",
            "url": "/templates/p10/valuation-report-template.docx"
        }
    ]'::jsonb,
    150,
    140,
    28,
    NOW(),
    NOW()
),
(
    'p10_lesson_29',
    'p10_module_6',
    29,
    'Licensing Strategy Development',
    'Design licensing programs, structure deals, negotiate terms, and manage licensing relationships.',
    '[
        {
            "title": "Licensing Program Design",
            "description": "Create comprehensive licensing program for patent portfolio",
            "timeRequired": "180 minutes",
            "deliverable": "Complete licensing program with target licensees"
        },
        {
            "title": "License Agreement Drafting",
            "description": "Draft professional license agreement with optimal terms",
            "timeRequired": "150 minutes",
            "deliverable": "License agreement template ready for negotiation"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Licensing Program Framework",
            "description": "Strategic framework for patent licensing programs",
            "url": "/templates/p10/licensing-program-framework.docx"
        },
        {
            "type": "template",
            "title": "Master License Agreement Template",
            "description": "Comprehensive license agreement with multiple options",
            "url": "/templates/p10/master-license-agreement.docx"
        }
    ]'::jsonb,
    180,
    150,
    29,
    NOW(),
    NOW()
),
(
    'p10_lesson_30',
    'p10_module_6',
    30,
    'Patent Sales and Acquisitions',
    'Master patent transaction strategies, due diligence processes, valuation negotiations, and deal structuring.',
    '[
        {
            "title": "Patent Sale Package Preparation",
            "description": "Create professional package for patent sale or acquisition",
            "timeRequired": "150 minutes",
            "deliverable": "Complete sale package with all documentation"
        },
        {
            "title": "Due Diligence Framework",
            "description": "Develop comprehensive due diligence checklist",
            "timeRequired": "90 minutes",
            "deliverable": "Due diligence framework with 100+ checkpoints"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Patent Sale Package Template",
            "description": "Professional package for patent transactions",
            "url": "/templates/p10/patent-sale-package.docx"
        },
        {
            "type": "checklist",
            "title": "Patent Due Diligence Checklist",
            "description": "Comprehensive checklist for patent transactions",
            "url": "/templates/p10/due-diligence-checklist.pdf"
        }
    ]'::jsonb,
    120,
    120,
    30,
    NOW(),
    NOW()
),
(
    'p10_lesson_31',
    'p10_module_6',
    31,
    'Strategic Partnerships and Joint Ventures',
    'Structure IP partnerships, cross-licensing arrangements, technology transfer agreements, and joint development programs.',
    '[
        {
            "title": "Partnership Structure Design",
            "description": "Design optimal IP partnership structure with terms",
            "timeRequired": "150 minutes",
            "deliverable": "Partnership framework with IP arrangements"
        },
        {
            "title": "Technology Transfer Agreement",
            "description": "Draft comprehensive technology transfer agreement",
            "timeRequired": "120 minutes",
            "deliverable": "Technology transfer agreement template"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "IP Partnership Agreement Template",
            "description": "Comprehensive framework for IP partnerships",
            "url": "/templates/p10/ip-partnership-agreement.docx"
        },
        {
            "type": "template",
            "title": "Technology Transfer Agreement",
            "description": "Professional technology transfer documentation",
            "url": "/templates/p10/technology-transfer-agreement.docx"
        }
    ]'::jsonb,
    150,
    140,
    31,
    NOW(),
    NOW()
),
(
    'p10_lesson_32',
    'p10_module_6',
    32,
    'Royalty Structures and Revenue Models',
    'Design royalty frameworks, milestone payments, hybrid models, and revenue optimization strategies.',
    '[
        {
            "title": "Royalty Model Development",
            "description": "Create optimal royalty structure for licensing deals",
            "timeRequired": "120 minutes",
            "deliverable": "Royalty model with rate justification"
        },
        {
            "title": "Revenue Projection Modeling",
            "description": "Build 5-year revenue projection from patent licensing",
            "timeRequired": "90 minutes",
            "deliverable": "Revenue model with scenario analysis"
        }
    ]'::jsonb,
    '[
        {
            "type": "calculator",
            "title": "Royalty Rate Calculator",
            "description": "Determine optimal royalty rates using industry benchmarks",
            "url": "/templates/p10/royalty-rate-calculator.xlsx"
        },
        {
            "type": "template",
            "title": "Revenue Projection Model",
            "description": "5-year patent revenue projection template",
            "url": "/templates/p10/revenue-projection-model.xlsx"
        }
    ]'::jsonb,
    120,
    120,
    32,
    NOW(),
    NOW()
),
(
    'p10_lesson_33',
    'p10_module_6',
    33,
    'Patent Enforcement Economics',
    'Evaluate enforcement ROI, litigation funding options, settlement strategies, and damage calculations.',
    '[
        {
            "title": "Enforcement ROI Analysis",
            "description": "Calculate potential returns from patent enforcement",
            "timeRequired": "120 minutes",
            "deliverable": "Enforcement ROI model with risk assessment"
        },
        {
            "title": "Settlement Strategy Development",
            "description": "Develop settlement strategies for infringement cases",
            "timeRequired": "90 minutes",
            "deliverable": "Settlement framework with negotiation points"
        }
    ]'::jsonb,
    '[
        {
            "type": "calculator",
            "title": "Enforcement ROI Calculator",
            "description": "Calculate returns and risks of patent enforcement",
            "url": "/templates/p10/enforcement-roi-calculator.xlsx"
        },
        {
            "type": "template",
            "title": "Settlement Strategy Framework",
            "description": "Strategic framework for patent settlement negotiations",
            "url": "/templates/p10/settlement-strategy-framework.docx"
        }
    ]'::jsonb,
    120,
    120,
    33,
    NOW(),
    NOW()
);

-- =============================================
-- Module 7: Industry-Specific Strategies (Days 34-38)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_34',
    'p10_module_7',
    34,
    'Software and AI Patent Strategies',
    'Master software patentability, AI/ML claiming strategies, algorithm protection, and technical effect documentation.',
    '[
        {
            "title": "Software Patent Portfolio Design",
            "description": "Design comprehensive patent strategy for software products",
            "timeRequired": "180 minutes",
            "deliverable": "Software patent strategy with 10+ patent opportunities"
        },
        {
            "title": "AI Patent Claim Drafting",
            "description": "Draft patent claims for AI/ML innovations",
            "timeRequired": "120 minutes",
            "deliverable": "AI patent claims with technical advantages"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Software Patent Strategy Guide",
            "description": "Comprehensive guide for software patent protection",
            "url": "/guides/p10/software-patent-strategy.pdf"
        },
        {
            "type": "template",
            "title": "AI Patent Claim Templates",
            "description": "Professional templates for AI/ML patent claims",
            "url": "/templates/p10/ai-patent-claim-templates.docx"
        }
    ]'::jsonb,
    150,
    140,
    34,
    NOW(),
    NOW()
),
(
    'p10_lesson_35',
    'p10_module_7',
    35,
    'Biotech and Pharmaceutical Patents',
    'Navigate biotech patentability, sequence claiming, formulation patents, and regulatory considerations.',
    '[
        {
            "title": "Biotech Patent Landscape Analysis",
            "description": "Analyze patent landscape for biotech innovations",
            "timeRequired": "150 minutes",
            "deliverable": "Biotech patent landscape with freedom to operate"
        },
        {
            "title": "Pharma Patent Lifecycle Planning",
            "description": "Plan patent lifecycle for pharmaceutical products",
            "timeRequired": "120 minutes",
            "deliverable": "20-year patent lifecycle strategy"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Biotech Patent Guide",
            "description": "Complete guide to biotechnology patent strategies",
            "url": "/guides/p10/biotech-patent-guide.pdf"
        },
        {
            "type": "template",
            "title": "Pharma Patent Lifecycle Planner",
            "description": "Strategic planning tool for pharmaceutical patents",
            "url": "/templates/p10/pharma-lifecycle-planner.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    35,
    NOW(),
    NOW()
),
(
    'p10_lesson_36',
    'p10_module_7',
    36,
    'Hardware and Electronics Patents',
    'Master device claiming, system architecture patents, manufacturing process protection, and design patents.',
    '[
        {
            "title": "Hardware Patent Architecture",
            "description": "Design patent architecture for hardware products",
            "timeRequired": "150 minutes",
            "deliverable": "Hardware patent strategy with claim hierarchy"
        },
        {
            "title": "Design Patent Portfolio",
            "description": "Develop design patent strategy for product aesthetics",
            "timeRequired": "90 minutes",
            "deliverable": "Design patent portfolio plan"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Hardware Patent Strategy Guide",
            "description": "Comprehensive guide for hardware patent protection",
            "url": "/guides/p10/hardware-patent-guide.pdf"
        },
        {
            "type": "template",
            "title": "Design Patent Application Template",
            "description": "Professional template for design patent applications",
            "url": "/templates/p10/design-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    36,
    NOW(),
    NOW()
),
(
    'p10_lesson_37',
    'p10_module_7',
    37,
    'Fintech and Business Method Patents',
    'Navigate business method patentability, fintech innovations, blockchain patents, and technical implementation focus.',
    '[
        {
            "title": "Fintech Patent Strategy Development",
            "description": "Create patent strategy for fintech innovations",
            "timeRequired": "150 minutes",
            "deliverable": "Fintech patent portfolio plan"
        },
        {
            "title": "Blockchain Patent Analysis",
            "description": "Analyze blockchain patent opportunities",
            "timeRequired": "90 minutes",
            "deliverable": "Blockchain patent strategy document"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Fintech Patent Playbook",
            "description": "Complete playbook for fintech patent strategies",
            "url": "/guides/p10/fintech-patent-playbook.pdf"
        },
        {
            "type": "template",
            "title": "Business Method Patent Template",
            "description": "Template for business method patent applications",
            "url": "/templates/p10/business-method-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    37,
    NOW(),
    NOW()
),
(
    'p10_lesson_38',
    'p10_module_7',
    38,
    'Traditional Industry Patents',
    'Master mechanical inventions, chemical formulations, manufacturing processes, and agricultural innovations.',
    '[
        {
            "title": "Manufacturing Process Patents",
            "description": "Develop patent strategy for manufacturing innovations",
            "timeRequired": "120 minutes",
            "deliverable": "Manufacturing patent portfolio plan"
        },
        {
            "title": "Chemical Formulation Protection",
            "description": "Create protection strategy for chemical innovations",
            "timeRequired": "90 minutes",
            "deliverable": "Chemical patent strategy document"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Manufacturing Patent Guide",
            "description": "Guide to manufacturing process patents",
            "url": "/guides/p10/manufacturing-patent-guide.pdf"
        },
        {
            "type": "template",
            "title": "Chemical Patent Template",
            "description": "Template for chemical formulation patents",
            "url": "/templates/p10/chemical-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    38,
    NOW(),
    NOW()
);

-- =============================================
-- Module 8: International Patent Strategy (Days 39-43)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_39',
    'p10_module_8',
    39,
    'Global Filing Strategies',
    'Master PCT national phase strategy, direct filing optimization, priority management, and cost-benefit analysis.',
    '[
        {
            "title": "Global Filing Roadmap",
            "description": "Create 5-year global patent filing strategy",
            "timeRequired": "180 minutes",
            "deliverable": "Global filing roadmap for 20+ countries"
        },
        {
            "title": "PCT Strategy Optimization",
            "description": "Optimize PCT filing and national phase entry",
            "timeRequired": "120 minutes",
            "deliverable": "PCT strategy with timeline and budget"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Global Filing Strategy Matrix",
            "description": "Comprehensive matrix for global patent filing decisions",
            "url": "/templates/p10/global-filing-matrix.xlsx"
        },
        {
            "type": "calculator",
            "title": "PCT Cost-Benefit Calculator",
            "description": "Calculate optimal PCT national phase strategy",
            "url": "/templates/p10/pct-cost-calculator.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    39,
    NOW(),
    NOW()
),
(
    'p10_lesson_40',
    'p10_module_8',
    40,
    'United States Patent Strategy',
    'Navigate USPTO procedures, continuation practice, provisional strategies, and litigation considerations.',
    '[
        {
            "title": "US Patent Portfolio Design",
            "description": "Design comprehensive US patent strategy",
            "timeRequired": "150 minutes",
            "deliverable": "US patent portfolio plan with continuation strategy"
        },
        {
            "title": "Provisional Application Strategy",
            "description": "Develop provisional patent application approach",
            "timeRequired": "90 minutes",
            "deliverable": "Provisional filing strategy document"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "USPTO Complete Guide",
            "description": "Comprehensive guide to US patent procedures",
            "url": "/guides/p10/uspto-complete-guide.pdf"
        },
        {
            "type": "template",
            "title": "US Patent Application Template",
            "description": "Professional template for USPTO applications",
            "url": "/templates/p10/us-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    40,
    NOW(),
    NOW()
),
(
    'p10_lesson_41',
    'p10_module_8',
    41,
    'European Patent Strategy',
    'Master EPO procedures, validation strategies, opposition handling, and national phase considerations.',
    '[
        {
            "title": "European Patent Strategy",
            "description": "Develop comprehensive European patent approach",
            "timeRequired": "150 minutes",
            "deliverable": "EP patent strategy with validation plan"
        },
        {
            "title": "EPO Opposition Preparation",
            "description": "Prepare for potential EPO oppositions",
            "timeRequired": "90 minutes",
            "deliverable": "Opposition defense strategy"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "EPO Complete Guide",
            "description": "Comprehensive guide to European patent procedures",
            "url": "/guides/p10/epo-complete-guide.pdf"
        },
        {
            "type": "template",
            "title": "European Patent Template",
            "description": "Professional template for EPO applications",
            "url": "/templates/p10/ep-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    41,
    NOW(),
    NOW()
),
(
    'p10_lesson_42',
    'p10_module_8',
    42,
    'China and Asia-Pacific Patents',
    'Navigate CNIPA procedures, utility models, Japanese patent system, and ASEAN considerations.',
    '[
        {
            "title": "China Patent Strategy",
            "description": "Develop comprehensive China patent approach",
            "timeRequired": "150 minutes",
            "deliverable": "China patent strategy with enforcement plan"
        },
        {
            "title": "Asia-Pacific Filing Plan",
            "description": "Create filing strategy for key Asian markets",
            "timeRequired": "120 minutes",
            "deliverable": "APAC patent filing roadmap"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "China Patent Complete Guide",
            "description": "Comprehensive guide to Chinese patent system",
            "url": "/guides/p10/china-patent-guide.pdf"
        },
        {
            "type": "template",
            "title": "APAC Patent Strategy Template",
            "description": "Strategic framework for Asia-Pacific patents",
            "url": "/templates/p10/apac-strategy-template.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    42,
    NOW(),
    NOW()
),
(
    'p10_lesson_43',
    'p10_module_8',
    43,
    'Translation and Localization Strategies',
    'Master technical translation requirements, cost optimization, quality control, and deadline management.',
    '[
        {
            "title": "Translation Management System",
            "description": "Establish system for managing patent translations",
            "timeRequired": "90 minutes",
            "deliverable": "Translation management framework"
        },
        {
            "title": "Translation Cost Optimization",
            "description": "Develop strategies to reduce translation costs by 30%",
            "timeRequired": "60 minutes",
            "deliverable": "Cost optimization plan"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Translation Management System",
            "description": "Framework for managing global patent translations",
            "url": "/templates/p10/translation-management.xlsx"
        },
        {
            "type": "checklist",
            "title": "Translation Quality Checklist",
            "description": "Quality control checklist for patent translations",
            "url": "/templates/p10/translation-quality-checklist.pdf"
        }
    ]'::jsonb,
    90,
    100,
    43,
    NOW(),
    NOW()
);

-- =============================================
-- Module 9: Cost Management & Funding (Days 44-45)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_44',
    'p10_module_9',
    44,
    'Complete Patent Cost Analysis',
    'Master cost breakdown structures, budget planning, cost reduction strategies, and financial modeling.',
    '[
        {
            "title": "20-Year Cost Projection",
            "description": "Create comprehensive 20-year patent cost projection",
            "timeRequired": "150 minutes",
            "deliverable": "Complete cost model with scenario analysis"
        },
        {
            "title": "Budget Optimization Strategy",
            "description": "Develop strategies to reduce patent costs by 40%",
            "timeRequired": "90 minutes",
            "deliverable": "Cost optimization roadmap"
        }
    ]'::jsonb,
    '[
        {
            "type": "calculator",
            "title": "20-Year Patent Cost Model",
            "description": "Comprehensive cost projection for patent lifecycle",
            "url": "/templates/p10/20-year-cost-model.xlsx"
        },
        {
            "type": "template",
            "title": "Patent Budget Planner",
            "description": "Annual patent budget planning template",
            "url": "/templates/p10/patent-budget-planner.xlsx"
        }
    ]'::jsonb,
    120,
    120,
    44,
    NOW(),
    NOW()
),
(
    'p10_lesson_45',
    'p10_module_9',
    45,
    'Patent Funding and Support Programs',
    'Access government grants, startup schemes, international funding, and strategic partnerships.',
    '[
        {
            "title": "Funding Application Portfolio",
            "description": "Prepare applications for 5+ patent funding programs",
            "timeRequired": "180 minutes",
            "deliverable": "Complete funding applications ready for submission"
        },
        {
            "title": "Grant Eligibility Mapping",
            "description": "Map eligibility for all available patent grants",
            "timeRequired": "60 minutes",
            "deliverable": "Eligibility matrix with application timeline"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Patent Funding Complete Guide",
            "description": "Comprehensive guide to patent funding programs",
            "url": "/guides/p10/patent-funding-guide.pdf"
        },
        {
            "type": "template",
            "title": "Grant Application Templates",
            "description": "Templates for major patent grant applications",
            "url": "/templates/p10/grant-application-templates.zip"
        }
    ]'::jsonb,
    120,
    120,
    45,
    NOW(),
    NOW()
);

-- =============================================
-- Module 10: Advanced Litigation & Disputes (Days 46-50)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_46',
    'p10_module_10',
    46,
    'Patent Litigation Process',
    'Understand litigation lifecycle, court procedures, evidence requirements, and strategic considerations.',
    '[
        {
            "title": "Litigation Readiness Assessment",
            "description": "Evaluate portfolio litigation readiness",
            "timeRequired": "150 minutes",
            "deliverable": "Litigation readiness report with gaps"
        },
        {
            "title": "Litigation Budget Planning",
            "description": "Develop litigation budget and funding strategy",
            "timeRequired": "90 minutes",
            "deliverable": "Litigation budget with funding options"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Patent Litigation Playbook",
            "description": "Complete guide to patent litigation process",
            "url": "/guides/p10/litigation-playbook.pdf"
        },
        {
            "type": "template",
            "title": "Litigation Readiness Checklist",
            "description": "Comprehensive litigation preparation checklist",
            "url": "/templates/p10/litigation-readiness-checklist.pdf"
        }
    ]'::jsonb,
    120,
    120,
    46,
    NOW(),
    NOW()
),
(
    'p10_lesson_47',
    'p10_module_10',
    47,
    'Infringement Analysis',
    'Master claim charts, evidence collection, expert witnesses, and infringement opinions.',
    '[
        {
            "title": "Infringement Claim Chart Creation",
            "description": "Create detailed infringement claim charts",
            "timeRequired": "180 minutes",
            "deliverable": "Complete claim charts with evidence"
        },
        {
            "title": "Evidence Package Development",
            "description": "Compile comprehensive evidence package",
            "timeRequired": "120 minutes",
            "deliverable": "Evidence package with chain of custody"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Infringement Claim Chart Template",
            "description": "Professional claim chart for infringement analysis",
            "url": "/templates/p10/infringement-claim-chart.docx"
        },
        {
            "type": "template",
            "title": "Evidence Collection Framework",
            "description": "Systematic framework for evidence collection",
            "url": "/templates/p10/evidence-collection-framework.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    47,
    NOW(),
    NOW()
),
(
    'p10_lesson_48',
    'p10_module_10',
    48,
    'Defensive Strategies',
    'Develop invalidity defenses, prior art challenges, non-infringement arguments, and counterclaim strategies.',
    '[
        {
            "title": "Invalidity Defense Development",
            "description": "Build comprehensive invalidity defense",
            "timeRequired": "150 minutes",
            "deliverable": "Invalidity defense with prior art"
        },
        {
            "title": "Non-Infringement Strategy",
            "description": "Develop non-infringement arguments",
            "timeRequired": "90 minutes",
            "deliverable": "Non-infringement position paper"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Patent Defense Strategies",
            "description": "Comprehensive guide to patent defense tactics",
            "url": "/guides/p10/defense-strategies.pdf"
        },
        {
            "type": "template",
            "title": "Invalidity Contentions Template",
            "description": "Template for invalidity contentions",
            "url": "/templates/p10/invalidity-contentions.docx"
        }
    ]'::jsonb,
    120,
    120,
    48,
    NOW(),
    NOW()
),
(
    'p10_lesson_49',
    'p10_module_10',
    49,
    'Damages Calculation',
    'Master reasonable royalty analysis, lost profits calculation, entire market value rule, and expert testimony.',
    '[
        {
            "title": "Damages Model Development",
            "description": "Create comprehensive damages calculation model",
            "timeRequired": "180 minutes",
            "deliverable": "Damages model with multiple theories"
        },
        {
            "title": "Expert Report Preparation",
            "description": "Prepare expert damages report",
            "timeRequired": "120 minutes",
            "deliverable": "Expert damages report draft"
        }
    ]'::jsonb,
    '[
        {
            "type": "calculator",
            "title": "Patent Damages Calculator",
            "description": "Comprehensive damages calculation tool",
            "url": "/templates/p10/damages-calculator.xlsx"
        },
        {
            "type": "template",
            "title": "Expert Damages Report Template",
            "description": "Professional template for damages expert reports",
            "url": "/templates/p10/expert-damages-report.docx"
        }
    ]'::jsonb,
    150,
    140,
    49,
    NOW(),
    NOW()
),
(
    'p10_lesson_50',
    'p10_module_10',
    50,
    'Settlement and Alternative Dispute Resolution',
    'Navigate settlement negotiations, mediation strategies, arbitration procedures, and licensing settlements.',
    '[
        {
            "title": "Settlement Strategy Development",
            "description": "Create comprehensive settlement strategy",
            "timeRequired": "120 minutes",
            "deliverable": "Settlement strategy with BATNA analysis"
        },
        {
            "title": "Settlement Agreement Drafting",
            "description": "Draft settlement agreement terms",
            "timeRequired": "90 minutes",
            "deliverable": "Settlement agreement framework"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Settlement Strategy Framework",
            "description": "Strategic framework for patent settlements",
            "url": "/templates/p10/settlement-strategy.docx"
        },
        {
            "type": "template",
            "title": "Settlement Agreement Template",
            "description": "Comprehensive settlement agreement template",
            "url": "/templates/p10/settlement-agreement.docx"
        }
    ]'::jsonb,
    120,
    120,
    50,
    NOW(),
    NOW()
);

-- =============================================
-- Module 11: Advanced Prosecution (Days 51-55)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_51',
    'p10_module_11',
    51,
    'Complex Response Strategies',
    'Master multi-reference rejections, combination arguments, secondary considerations, and declaration strategies.',
    '[
        {
            "title": "Complex Response Development",
            "description": "Develop response to multi-reference rejection",
            "timeRequired": "180 minutes",
            "deliverable": "Complete response with supporting evidence"
        },
        {
            "title": "Declaration Package Creation",
            "description": "Create declaration package for prosecution",
            "timeRequired": "120 minutes",
            "deliverable": "Declaration package with exhibits"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Advanced Prosecution Strategies",
            "description": "Guide to complex prosecution responses",
            "url": "/guides/p10/advanced-prosecution.pdf"
        },
        {
            "type": "template",
            "title": "Complex Response Templates",
            "description": "Templates for complex office action responses",
            "url": "/templates/p10/complex-response-templates.docx"
        }
    ]'::jsonb,
    150,
    140,
    51,
    NOW(),
    NOW()
),
(
    'p10_lesson_52',
    'p10_module_11',
    52,
    'Appeal Procedures',
    'Navigate appeal briefs, oral hearings, IPAB procedures, and Federal Circuit considerations.',
    '[
        {
            "title": "Appeal Brief Drafting",
            "description": "Draft comprehensive appeal brief",
            "timeRequired": "180 minutes",
            "deliverable": "Complete appeal brief ready for filing"
        },
        {
            "title": "Oral Hearing Preparation",
            "description": "Prepare for appeal oral hearing",
            "timeRequired": "90 minutes",
            "deliverable": "Hearing presentation with Q&A prep"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Appeal Brief Template",
            "description": "Professional template for patent appeals",
            "url": "/templates/p10/appeal-brief-template.docx"
        },
        {
            "type": "guide",
            "title": "Appeal Strategy Guide",
            "description": "Comprehensive guide to patent appeals",
            "url": "/guides/p10/appeal-strategy-guide.pdf"
        }
    ]'::jsonb,
    150,
    140,
    52,
    NOW(),
    NOW()
),
(
    'p10_lesson_53',
    'p10_module_11',
    53,
    'International Prosecution Coordination',
    'Manage multi-jurisdiction prosecution, harmonization strategies, and centralized response development.',
    '[
        {
            "title": "Global Prosecution Strategy",
            "description": "Develop coordinated global prosecution approach",
            "timeRequired": "150 minutes",
            "deliverable": "Global prosecution roadmap"
        },
        {
            "title": "Response Harmonization",
            "description": "Harmonize responses across jurisdictions",
            "timeRequired": "120 minutes",
            "deliverable": "Harmonized response strategy"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Global Prosecution Tracker",
            "description": "Track prosecution across multiple jurisdictions",
            "url": "/templates/p10/global-prosecution-tracker.xlsx"
        },
        {
            "type": "guide",
            "title": "International Coordination Guide",
            "description": "Guide to coordinating international prosecution",
            "url": "/guides/p10/international-coordination.pdf"
        }
    ]'::jsonb,
    120,
    120,
    53,
    NOW(),
    NOW()
),
(
    'p10_lesson_54',
    'p10_module_11',
    54,
    'Post-Grant Procedures',
    'Master reissue applications, reexamination procedures, post-grant reviews, and maintenance strategies.',
    '[
        {
            "title": "Post-Grant Strategy Development",
            "description": "Develop comprehensive post-grant strategy",
            "timeRequired": "120 minutes",
            "deliverable": "Post-grant management plan"
        },
        {
            "title": "Reexamination Preparation",
            "description": "Prepare for potential reexamination",
            "timeRequired": "90 minutes",
            "deliverable": "Reexamination defense strategy"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Post-Grant Procedures Guide",
            "description": "Complete guide to post-grant procedures",
            "url": "/guides/p10/post-grant-procedures.pdf"
        },
        {
            "type": "template",
            "title": "Post-Grant Management System",
            "description": "System for managing post-grant procedures",
            "url": "/templates/p10/post-grant-management.xlsx"
        }
    ]'::jsonb,
    120,
    120,
    54,
    NOW(),
    NOW()
),
(
    'p10_lesson_55',
    'p10_module_11',
    55,
    'Continuation and Divisional Strategies',
    'Optimize continuation practice, divisional applications, claim sets, and portfolio expansion.',
    '[
        {
            "title": "Continuation Strategy Design",
            "description": "Design optimal continuation strategy",
            "timeRequired": "120 minutes",
            "deliverable": "Continuation filing roadmap"
        },
        {
            "title": "Divisional Planning",
            "description": "Plan divisional application strategy",
            "timeRequired": "90 minutes",
            "deliverable": "Divisional application plan"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Continuation Strategy Planner",
            "description": "Strategic planner for continuation practice",
            "url": "/templates/p10/continuation-planner.xlsx"
        },
        {
            "type": "guide",
            "title": "Divisional Application Guide",
            "description": "Complete guide to divisional applications",
            "url": "/guides/p10/divisional-guide.pdf"
        }
    ]'::jsonb,
    120,
    120,
    55,
    NOW(),
    NOW()
);

-- =============================================
-- Module 12: Emerging Technologies (Days 56-60)
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_56',
    'p10_module_12',
    56,
    'Quantum Computing Patents',
    'Navigate quantum algorithm patents, hardware protection, error correction innovations, and application patents.',
    '[
        {
            "title": "Quantum Patent Landscape Analysis",
            "description": "Analyze quantum computing patent landscape",
            "timeRequired": "150 minutes",
            "deliverable": "Quantum patent landscape report"
        },
        {
            "title": "Quantum Innovation Protection",
            "description": "Develop protection strategy for quantum innovations",
            "timeRequired": "90 minutes",
            "deliverable": "Quantum patent strategy document"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Quantum Patent Guide",
            "description": "Guide to quantum computing patents",
            "url": "/guides/p10/quantum-patent-guide.pdf"
        },
        {
            "type": "template",
            "title": "Quantum Patent Template",
            "description": "Template for quantum computing patents",
            "url": "/templates/p10/quantum-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    56,
    NOW(),
    NOW()
),
(
    'p10_lesson_57',
    'p10_module_12',
    57,
    'Gene Editing and Synthetic Biology',
    'Master CRISPR patents, gene therapy protection, synthetic biology innovations, and ethical considerations.',
    '[
        {
            "title": "Gene Editing Patent Strategy",
            "description": "Develop patent strategy for gene editing technology",
            "timeRequired": "150 minutes",
            "deliverable": "Gene editing patent portfolio plan"
        },
        {
            "title": "Bioethics Compliance Framework",
            "description": "Ensure patent compliance with bioethics standards",
            "timeRequired": "90 minutes",
            "deliverable": "Bioethics compliance checklist"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Gene Editing Patent Playbook",
            "description": "Complete playbook for gene editing patents",
            "url": "/guides/p10/gene-editing-playbook.pdf"
        },
        {
            "type": "template",
            "title": "Biotech Patent Ethics Framework",
            "description": "Framework for ethical biotech patenting",
            "url": "/templates/p10/biotech-ethics-framework.docx"
        }
    ]'::jsonb,
    120,
    120,
    57,
    NOW(),
    NOW()
),
(
    'p10_lesson_58',
    'p10_module_12',
    58,
    'Autonomous Systems and Robotics',
    'Navigate autonomous vehicle patents, robotics innovations, sensor technologies, and control systems.',
    '[
        {
            "title": "Autonomous System Patent Portfolio",
            "description": "Design patent portfolio for autonomous systems",
            "timeRequired": "150 minutes",
            "deliverable": "Autonomous system patent strategy"
        },
        {
            "title": "Safety-Critical Patent Considerations",
            "description": "Address safety-critical aspects in patents",
            "timeRequired": "90 minutes",
            "deliverable": "Safety compliance framework"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Autonomous Systems Patent Guide",
            "description": "Guide to patenting autonomous technologies",
            "url": "/guides/p10/autonomous-systems-guide.pdf"
        },
        {
            "type": "template",
            "title": "Robotics Patent Template",
            "description": "Template for robotics patent applications",
            "url": "/templates/p10/robotics-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    58,
    NOW(),
    NOW()
),
(
    'p10_lesson_59',
    'p10_module_12',
    59,
    'Web3 and Blockchain Technologies',
    'Master DeFi patents, NFT innovations, consensus mechanisms, and smart contract protection.',
    '[
        {
            "title": "Web3 Patent Strategy Development",
            "description": "Create comprehensive Web3 patent strategy",
            "timeRequired": "150 minutes",
            "deliverable": "Web3 patent portfolio plan"
        },
        {
            "title": "Decentralization Patent Challenges",
            "description": "Address unique challenges of decentralized patents",
            "timeRequired": "90 minutes",
            "deliverable": "Decentralization patent framework"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Web3 Patent Complete Guide",
            "description": "Comprehensive guide to Web3 patents",
            "url": "/guides/p10/web3-patent-guide.pdf"
        },
        {
            "type": "template",
            "title": "Blockchain Patent Template",
            "description": "Professional template for blockchain patents",
            "url": "/templates/p10/blockchain-patent-template.docx"
        }
    ]'::jsonb,
    120,
    120,
    59,
    NOW(),
    NOW()
),
(
    'p10_lesson_60',
    'p10_module_12',
    60,
    'Future Technologies and Patent Strategy',
    'Prepare for emerging technologies, adapt to changing regulations, build future-proof portfolios.',
    '[
        {
            "title": "Future Technology Assessment",
            "description": "Identify and assess future technology opportunities",
            "timeRequired": "120 minutes",
            "deliverable": "Future technology patent roadmap"
        },
        {
            "title": "Adaptive Patent Strategy Framework",
            "description": "Build framework for adapting to new technologies",
            "timeRequired": "90 minutes",
            "deliverable": "Adaptive strategy framework"
        },
        {
            "title": "Course Completion Reflection",
            "description": "Reflect on patent mastery journey and plan next steps",
            "timeRequired": "60 minutes",
            "deliverable": "Personal patent strategy action plan"
        }
    ]'::jsonb,
    '[
        {
            "type": "guide",
            "title": "Future Technologies Patent Guide",
            "description": "Guide to patenting emerging technologies",
            "url": "/guides/p10/future-tech-guide.pdf"
        },
        {
            "type": "template",
            "title": "Patent Strategy Evolution Framework",
            "description": "Framework for evolving patent strategies",
            "url": "/templates/p10/strategy-evolution-framework.xlsx"
        },
        {
            "type": "certificate",
            "title": "Patent Mastery Completion Certificate",
            "description": "Certificate of completion for Patent Mastery course",
            "url": "/certificates/p10/completion-certificate.pdf"
        }
    ]'::jsonb,
    150,
    200,
    60,
    NOW(),
    NOW()
);

-- =============================================
-- Additional P10 Resources and Templates (100+ Total)
-- =============================================

INSERT INTO "CourseTemplate" ("productCode", name, description, category, type, "fileUrl", "isActive")
VALUES 
-- Additional Strategy Templates (61-70)
('P10', 'Patent War Game Simulator', 'Interactive simulator for patent litigation scenarios', 'strategy', 'tool', '/tools/p10/patent-war-game', true),
('P10', 'Competitive Patent Intelligence System', 'Real-time competitor patent monitoring dashboard', 'analysis', 'tool', '/tools/p10/competitive-intelligence', true),
('P10', 'Patent Thicket Navigation Guide', 'Navigate complex patent landscapes in crowded fields', 'strategy', 'guide', '/guides/p10/patent-thicket-navigation.pdf', true),
('P10', 'Standard Essential Patents Guide', 'Master SEP licensing and FRAND obligations', 'strategy', 'guide', '/guides/p10/sep-guide.pdf', true),
('P10', 'Patent Pool Strategy Framework', 'Framework for participating in patent pools', 'strategy', 'template', '/templates/p10/patent-pool-framework.docx', true),
('P10', 'Open Source Patent Strategy', 'Balance open source contributions with patent protection', 'strategy', 'guide', '/guides/p10/open-source-patent-strategy.pdf', true),
('P10', 'Defensive Publication Strategy', 'Strategic use of defensive publications', 'strategy', 'template', '/templates/p10/defensive-publication-strategy.docx', true),
('P10', 'Patent Assertion Defense Playbook', 'Defend against patent trolls and NPEs', 'litigation', 'guide', '/guides/p10/patent-assertion-defense.pdf', true),
('P10', 'Trade Secret vs Patent Decision Tree', 'Framework for choosing between patents and trade secrets', 'strategy', 'template', '/templates/p10/trade-secret-decision-tree.xlsx', true),
('P10', 'Patent Mining Workshop Materials', 'Materials for conducting patent mining sessions', 'innovation', 'template', '/templates/p10/patent-mining-workshop.pptx', true),

-- Financial and Valuation Tools (71-80)
('P10', 'Patent Auction Preparation Kit', 'Complete kit for patent auction participation', 'monetization', 'template', '/templates/p10/auction-preparation-kit.docx', true),
('P10', 'IP-Backed Financing Guide', 'Guide to using patents as collateral for financing', 'financial', 'guide', '/guides/p10/ip-financing-guide.pdf', true),
('P10', 'Patent Insurance Calculator', 'Calculate optimal patent insurance coverage', 'financial', 'calculator', '/templates/p10/patent-insurance-calculator.xlsx', true),
('P10', 'Litigation Finance Model', 'Model for litigation financing arrangements', 'financial', 'template', '/templates/p10/litigation-finance-model.xlsx', true),
('P10', 'Patent Tax Strategy Guide', 'Optimize tax treatment of patent income and expenses', 'financial', 'guide', '/guides/p10/patent-tax-strategy.pdf', true),
('P10', 'IP Holding Company Structure', 'Optimal structures for IP holding companies', 'financial', 'template', '/templates/p10/ip-holding-structure.docx', true),
('P10', 'Patent Securitization Framework', 'Framework for patent-backed securities', 'financial', 'template', '/templates/p10/patent-securitization.xlsx', true),
('P10', 'M&A Patent Due Diligence Checklist', 'Comprehensive checklist for M&A patent review', 'financial', 'checklist', '/templates/p10/ma-due-diligence-checklist.pdf', true),
('P10', 'Patent Escrow Agreement Template', 'Template for patent escrow arrangements', 'legal', 'template', '/templates/p10/patent-escrow-agreement.docx', true),
('P10', 'IP Bankruptcy Guide', 'Navigate patent issues in bankruptcy proceedings', 'legal', 'guide', '/guides/p10/ip-bankruptcy-guide.pdf', true),

-- Industry-Specific Templates (81-90)
('P10', 'Medical Device Patent Playbook', 'Complete playbook for medical device patents', 'industry', 'guide', '/guides/p10/medical-device-playbook.pdf', true),
('P10', 'Clean Tech Patent Strategy', 'Patent strategies for clean technology startups', 'industry', 'guide', '/guides/p10/clean-tech-patent-strategy.pdf', true),
('P10', 'Gaming Industry Patent Guide', 'Navigate patents in gaming and entertainment', 'industry', 'guide', '/guides/p10/gaming-patent-guide.pdf', true),
('P10', 'EdTech Patent Framework', 'Patent framework for education technology', 'industry', 'template', '/templates/p10/edtech-patent-framework.docx', true),
('P10', 'AgTech Patent Landscape', 'Agricultural technology patent strategies', 'industry', 'guide', '/guides/p10/agtech-patent-landscape.pdf', true),
('P10', 'Fashion Tech Patent Guide', 'Patent protection for fashion technology', 'industry', 'guide', '/guides/p10/fashion-tech-patent.pdf', true),
('P10', 'Space Technology Patents', 'Patent strategies for space tech startups', 'industry', 'guide', '/guides/p10/space-tech-patents.pdf', true),
('P10', 'Cybersecurity Patent Playbook', 'Navigate cybersecurity patent challenges', 'industry', 'guide', '/guides/p10/cybersecurity-patents.pdf', true),
('P10', 'IoT Patent Architecture', 'Design patent architecture for IoT ecosystems', 'industry', 'template', '/templates/p10/iot-patent-architecture.xlsx', true),
('P10', '5G Technology Patent Guide', 'Master 5G and telecom patent strategies', 'industry', 'guide', '/guides/p10/5g-patent-guide.pdf', true),

-- Prosecution and Legal Templates (91-100)
('P10', 'Terminal Disclaimer Template', 'Template for terminal disclaimer filings', 'prosecution', 'template', '/templates/p10/terminal-disclaimer.docx', true),
('P10', 'Petition Decision Appeal Template', 'Template for appealing petition decisions', 'prosecution', 'template', '/templates/p10/petition-appeal.docx', true),
('P10', 'Information Disclosure Statement Guide', 'Complete guide to IDS requirements and strategy', 'prosecution', 'guide', '/guides/p10/ids-guide.pdf', true),
('P10', 'Patent Term Extension Calculator', 'Calculate patent term adjustments and extensions', 'prosecution', 'calculator', '/templates/p10/term-extension-calculator.xlsx', true),
('P10', 'Inventorship Correction Procedures', 'Guide to correcting inventorship issues', 'prosecution', 'guide', '/guides/p10/inventorship-correction.pdf', true),
('P10', 'Certificate of Correction Template', 'Template for certificate of correction requests', 'prosecution', 'template', '/templates/p10/certificate-correction.docx', true),
('P10', 'Supplemental Examination Guide', 'Navigate supplemental examination procedures', 'prosecution', 'guide', '/guides/p10/supplemental-examination.pdf', true),
('P10', 'Patent Cooperation Treaty Guide', 'Complete PCT filing and national phase guide', 'international', 'guide', '/guides/p10/pct-complete-guide.pdf', true),
('P10', 'Paris Convention Strategy', 'Optimize Paris Convention priority claims', 'international', 'guide', '/guides/p10/paris-convention-strategy.pdf', true),
('P10', 'Patent Prosecution Highway Map', 'Navigate PPH programs across jurisdictions', 'international', 'guide', '/guides/p10/pph-complete-map.pdf', true),

-- Bonus Advanced Tools (101-110)
('P10', 'AI Patent Claim Generator', 'AI-powered tool for generating patent claims', 'drafting', 'tool', '/tools/p10/ai-claim-generator', true),
('P10', 'Patent Family Tree Visualizer', 'Visualize complex patent family relationships', 'analysis', 'tool', '/tools/p10/family-tree-visualizer', true),
('P10', 'Prior Art Search Automation', 'Automated prior art search across databases', 'research', 'tool', '/tools/p10/prior-art-automation', true),
('P10', 'Patent Citation Network Analyzer', 'Analyze patent citation networks and influence', 'analysis', 'tool', '/tools/p10/citation-network-analyzer', true),
('P10', 'Freedom to Operate Analyzer', 'Comprehensive FTO analysis tool', 'analysis', 'tool', '/tools/p10/fto-analyzer', true),
('P10', 'Patent Maintenance Tracker', 'Track and optimize patent maintenance across portfolios', 'management', 'tool', '/tools/p10/maintenance-tracker', true),
('P10', 'Competitive Filing Monitor', 'Real-time monitoring of competitor patent filings', 'intelligence', 'tool', '/tools/p10/competitive-monitor', true),
('P10', 'Patent Quality Scorer', 'Score patent quality using multiple metrics', 'analysis', 'tool', '/tools/p10/quality-scorer', true),
('P10', 'Licensing Revenue Optimizer', 'Optimize licensing terms for maximum revenue', 'monetization', 'tool', '/tools/p10/licensing-optimizer', true),
('P10', 'Patent Portfolio Health Dashboard', 'Real-time dashboard for portfolio health metrics', 'management', 'tool', '/tools/p10/portfolio-health-dashboard', true);

-- =============================================
-- P10 Portfolio Activity Types
-- =============================================

INSERT INTO "ActivityType" (id, name, description, category, "sectionName", "productCode", "orderIndex", "createdAt", "updatedAt")
VALUES 
('patent_landscape_analysis', 'Patent Landscape Analysis', 'Analyze patent landscape for your technology domain', 'research', 'product', 'P10', 1, NOW(), NOW()),
('invention_disclosure', 'Invention Disclosure', 'Document and disclose new inventions systematically', 'documentation', 'product', 'P10', 2, NOW(), NOW()),
('patent_application_draft', 'Patent Application Draft', 'Draft complete patent application with claims', 'drafting', 'legal_compliance', 'P10', 3, NOW(), NOW()),
('prior_art_search', 'Prior Art Search', 'Conduct comprehensive prior art searches', 'research', 'product', 'P10', 4, NOW(), NOW()),
('patent_portfolio_plan', 'Patent Portfolio Plan', 'Design strategic patent portfolio architecture', 'strategy', 'business_model', 'P10', 5, NOW(), NOW()),
('fto_analysis', 'Freedom to Operate Analysis', 'Assess freedom to operate in target markets', 'analysis', 'go_to_market', 'P10', 6, NOW(), NOW()),
('patent_valuation', 'Patent Valuation', 'Value patents using multiple methodologies', 'financial', 'financials', 'P10', 7, NOW(), NOW()),
('licensing_strategy', 'Licensing Strategy', 'Develop patent licensing and monetization strategy', 'monetization', 'business_model', 'P10', 8, NOW(), NOW());

-- =============================================
-- Success Message
-- =============================================

SELECT 
    'P10 Patent Mastery Complete Deployment Success!' as status,
    COUNT(*) as total_lessons,
    (SELECT COUNT(*) FROM "CourseTemplate" WHERE "productCode" = 'P10') as total_templates,
    (SELECT COUNT(*) FROM "ActivityType" WHERE "productCode" = 'P10') as portfolio_activities
FROM "Lesson" 
WHERE "moduleId" LIKE 'p10_module_%';