// Comprehensive Course Content Templates for P2-P12
// This file contains detailed lesson structures for all courses

export interface CourseLesson {
  day: number;
  title: string;
  briefContent: string;
  actionItems: string[];
  resources: {
    title: string;
    type: 'template' | 'link' | 'tool' | 'guide' | 'form';
    url: string;
    description: string;
  }[];
  estimatedTime: number;
  xpReward: number;
  frameworks?: string[];
  outcomes: string[];
}

export interface CourseModule {
  title: string;
  description: string;
  orderIndex: number;
  lessons: CourseLesson[];
}

export interface Course {
  code: string;
  title: string;
  description: string;
  modules: CourseModule[];
}

// P2: Incorporation & Compliance Kit - Complete (₹4,999, 40 days, 10 modules)
export const P2_INCORPORATION_COMPLIANCE: Course = {
  code: 'P2',
  title: 'Incorporation & Compliance Kit - Complete',
  description: 'Master Indian business incorporation and ongoing compliance with comprehensive legal framework',
  modules: [
    {
      title: 'Foundation Planning',
      description: 'Pre-incorporation planning and business structure decisions',
      orderIndex: 1,
      lessons: [
        {
          day: 1,
          title: 'Business Structure Analysis - Proprietorship vs Partnership vs Company',
          briefContent: 'Understand the critical differences between business structures and make an informed decision based on your startup\'s needs, growth plans, and compliance requirements.',
          actionItems: [
            'Complete business structure assessment questionnaire',
            'Analyze liability protection needs for your business',
            'Calculate tax implications for each structure type',
            'Document ownership and profit-sharing preferences',
            'Create business structure decision matrix'
          ],
          resources: [
            {
              title: 'Business Structure Comparison Chart',
              type: 'template',
              url: '/templates/business-structure-comparison.xlsx',
              description: 'Detailed comparison of all Indian business structures'
            },
            {
              title: 'MCA Business Structure Guide',
              type: 'link',
              url: 'https://www.mca.gov.in/content/mca/global/en/home.html',
              description: 'Official government guide on business structures'
            }
          ],
          estimatedTime: 60,
          xpReward: 75,
          frameworks: ['Business Structure Matrix', 'Liability Assessment Framework'],
          outcomes: ['Clear business structure decision', 'Understanding of compliance requirements']
        },
        {
          day: 2,
          title: 'Name Reservation & Trademark Strategy',
          briefContent: 'Secure your business name through MCA name reservation and develop a comprehensive trademark strategy to protect your brand from day one.',
          actionItems: [
            'Research name availability across all databases (MCA, Trademark, Domain)',
            'Submit name reservation application through SPICe+',
            'Develop trademark search and filing strategy',
            'Register priority domain names and social handles',
            'Create brand protection checklist'
          ],
          resources: [
            {
              title: 'Name Search Template',
              type: 'template',
              url: '/templates/name-search-checklist.xlsx',
              description: 'Comprehensive name search across all databases'
            },
            {
              title: 'MCA Name Reservation Portal',
              type: 'tool',
              url: 'https://www.mca.gov.in/content/mca/global/en/mca/master-data/MDS.html',
              description: 'Official portal for name reservation'
            }
          ],
          estimatedTime: 90,
          xpReward: 100,
          frameworks: ['Name Strategy Framework', 'Brand Protection Protocol'],
          outcomes: ['Reserved business name', 'Trademark filing strategy', 'Brand protection plan']
        },
        {
          day: 3,
          title: 'Digital Signature Certificate (DSC) & Director Identification',
          briefContent: 'Obtain Digital Signature Certificates for all directors and complete Director Identification Number (DIN) allocation for seamless digital compliance.',
          actionItems: [
            'Apply for Class 2 Digital Signature Certificates for all directors',
            'Complete DIN allocation through DIR-3 form',
            'Set up DSC management and renewal system',
            'Verify DSC functionality across government portals',
            'Create digital compliance toolkit'
          ],
          resources: [
            {
              title: 'DSC Application Guide',
              type: 'guide',
              url: '/guides/dsc-application-process.pdf',
              description: 'Step-by-step DSC application process'
            },
            {
              title: 'DIN Application Form DIR-3',
              type: 'form',
              url: '/forms/dir-3-din-application.pdf',
              description: 'Official DIN application form with instructions'
            }
          ],
          estimatedTime: 45,
          xpReward: 60,
          frameworks: ['Digital Compliance Setup'],
          outcomes: ['Active DSC for all directors', 'DIN allocation completed', 'Digital compliance system']
        },
        {
          day: 4,
          title: 'Authorized Capital & Share Structure Planning',
          briefContent: 'Design optimal capital structure with authorized capital, paid-up capital, and shareholding pattern that supports future fundraising and growth.',
          actionItems: [
            'Determine optimal authorized capital amount',
            'Design initial share structure and shareholding pattern',
            'Plan for ESOP allocation and future dilution',
            'Calculate stamp duty and registration fees',
            'Create shareholder agreement framework'
          ],
          resources: [
            {
              title: 'Capital Structure Calculator',
              type: 'template',
              url: '/templates/capital-structure-calculator.xlsx',
              description: 'Interactive calculator for capital planning'
            },
            {
              title: 'Share Structure Templates',
              type: 'template',
              url: '/templates/share-structure-templates.docx',
              description: 'Various share structure examples for startups'
            }
          ],
          estimatedTime: 75,
          xpReward: 90,
          frameworks: ['Capital Structure Framework', 'Equity Dilution Planning'],
          outcomes: ['Optimized capital structure', 'Share allocation plan', 'ESOP strategy framework']
        }
      ]
    },
    {
      title: 'Incorporation Process',
      description: 'Complete incorporation through SPICe+ with all registrations',
      orderIndex: 2,
      lessons: [
        {
          day: 5,
          title: 'SPICe+ Form Filing - Complete Registration Process',
          briefContent: 'Master the SPICe+ form filing process for company incorporation, covering all sections from basic details to regulatory approvals in one integrated form.',
          actionItems: [
            'Prepare all documents required for SPICe+ filing',
            'Complete SPICe+ Part A (Company details and name reservation)',
            'Fill SPICe+ Part B (Registration with multiple agencies)',
            'Upload required documents and pay prescribed fees',
            'Track application status and respond to queries'
          ],
          resources: [
            {
              title: 'SPICe+ Form Guide',
              type: 'guide',
              url: '/guides/spice-plus-comprehensive-guide.pdf',
              description: 'Complete SPICe+ form filling guide with examples'
            },
            {
              title: 'Document Checklist for SPICe+',
              type: 'template',
              url: '/templates/spice-plus-documents-checklist.xlsx',
              description: 'Comprehensive checklist of all required documents'
            }
          ],
          estimatedTime: 120,
          xpReward: 150,
          frameworks: ['SPICe+ Filing Framework', 'Document Management System'],
          outcomes: ['SPICe+ application submitted', 'CIN received', 'Company legally incorporated']
        }
      ]
    },
    // Add more modules for P2...
  ]
};

// P3: Funding Mastery - Complete (₹5,999, 45 days, 12 modules)
export const P3_FUNDING_MASTERY: Course = {
  code: 'P3',
  title: 'Funding in India - Complete Mastery',
  description: 'Master the Indian funding ecosystem from government grants to venture capital',
  modules: [
    {
      title: 'Funding Landscape Overview',
      description: 'Understanding the complete Indian startup funding ecosystem',
      orderIndex: 1,
      lessons: [
        {
          day: 1,
          title: 'Indian Startup Funding Ecosystem - Complete Map',
          briefContent: 'Get a comprehensive overview of India\'s funding landscape, from government schemes worth ₹20L-₹5Cr to venture capital rounds, understanding the entire journey from idea to IPO.',
          actionItems: [
            'Map your startup stage to appropriate funding sources',
            'Research 50+ funding sources relevant to your industry',
            'Create personalized funding roadmap for next 18 months',
            'Analyze successful funding stories in your sector',
            'Build funding source database with contact details'
          ],
          resources: [
            {
              title: 'Indian Startup Funding Map',
              type: 'template',
              url: '/templates/indian-funding-ecosystem-map.xlsx',
              description: 'Complete database of 500+ funding sources in India'
            },
            {
              title: 'Funding Readiness Assessment',
              type: 'template',
              url: '/templates/funding-readiness-checklist.xlsx',
              description: 'Assess your startup\'s readiness for different funding types'
            }
          ],
          estimatedTime: 90,
          xpReward: 100,
          frameworks: ['Funding Ecosystem Map', 'Stage-Source Alignment Framework'],
          outcomes: ['Personal funding roadmap', 'Relevant funding sources identified', 'Readiness assessment completed']
        }
      ]
    },
    {
      title: 'Government Funding Mastery',
      description: 'Access ₹20L-₹5Cr through government schemes and grants',
      orderIndex: 2,
      lessons: [
        {
          day: 2,
          title: 'Government Schemes Deep Dive - ₹20L to ₹5Cr Opportunities',
          briefContent: 'Explore lucrative government funding opportunities including DPIIT recognition benefits, MUDRA loans, and sector-specific schemes that can provide substantial non-dilutive funding.',
          actionItems: [
            'Apply for DPIIT Startup India recognition',
            'Research sector-specific government schemes (BIRAC, MEITY, etc.)',
            'Calculate potential government funding for your startup',
            'Prepare documentation for top 5 relevant schemes',
            'Create government funding application calendar'
          ],
          resources: [
            {
              title: 'Government Schemes Database',
              type: 'template',
              url: '/templates/government-schemes-database.xlsx',
              description: 'Complete database of 200+ government funding schemes'
            },
            {
              title: 'DPIIT Application Kit',
              type: 'template',
              url: '/templates/dpiit-recognition-kit.zip',
              description: 'Complete application kit for DPIIT startup recognition'
            }
          ],
          estimatedTime: 120,
          xpReward: 150,
          frameworks: ['Government Funding Framework', 'Scheme Eligibility Matrix'],
          outcomes: ['DPIIT recognition applied', '5+ relevant schemes identified', 'Government funding roadmap']
        }
      ]
    }
    // Add more modules for P3...
  ]
};

// Continue with P4-P12 course definitions...

export const ALL_COURSES: Course[] = [
  P2_INCORPORATION_COMPLIANCE,
  P3_FUNDING_MASTERY,
  // Add P4-P12 when ready
];

// Resource templates for all courses
export const RESOURCE_TEMPLATES = {
  businessTemplates: [
    'Business Model Canvas Template',
    'Financial Projections Template',
    'Pitch Deck Template (20 slides)',
    'Market Research Template',
    'Competitive Analysis Framework'
  ],
  legalTemplates: [
    'Founders Agreement Template',
    'Employment Contract Template',
    'NDA Template (Mutual & One-way)',
    'Service Agreement Template',
    'Privacy Policy Template'
  ],
  complianceTemplates: [
    'GST Registration Checklist',
    'Income Tax Filing Guide',
    'ROC Compliance Calendar',
    'Statutory Register Templates',
    'Board Resolution Templates'
  ],
  fundingTemplates: [
    'Investment Pitch Template',
    'Term Sheet Template',
    'Due Diligence Checklist',
    'Financial Model Template',
    'Investor Update Template'
  ]
};

// Government schemes database structure
export const GOVERNMENT_SCHEMES = {
  central: [
    {
      name: 'Startup India Seed Fund Scheme (SISFS)',
      amount: '₹20L - ₹5Cr',
      category: 'Seed Funding',
      eligibility: 'DPIIT recognized startups, less than 2 years old',
      application: 'https://seedfund.startupindia.gov.in/'
    },
    {
      name: 'MUDRA Loan Scheme',
      amount: '₹10L - ₹10L',
      category: 'Business Loan',
      eligibility: 'Small businesses and startups',
      application: 'Through partner banks and NBFCs'
    }
  ],
  state: [
    {
      name: 'Karnataka Startup Policy',
      amount: '₹50L - ₹2Cr',
      category: 'State Grant',
      eligibility: 'Karnataka-based startups',
      application: 'Karnataka Innovation and Technology Society'
    }
  ]
};