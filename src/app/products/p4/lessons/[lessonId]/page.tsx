import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import P4ActivityCapture, {
  FinancialHealthAssessment,
  FinancialModelBuilder,
  GSTComplianceTracker,
  ImplementationChecklist
} from '@/components/P4ActivityCapture';
import { sanitizeHTML } from '@/lib/sanitize';

// Type definitions for P4 lessons
interface ActionItem {
  title: string;
  duration: string;
  description: string;
}

interface Section {
  title: string;
  content: string;
}

interface LessonContent {
  brief: string;
  objectives?: string[];
  keyInsights?: string[];
  sections?: Section[];
  actionItems?: ActionItem[];
  resources?: string[];
}

interface P4Lesson {
  id: string;
  title: string;
  module: string;
  dayNumber: number;
  estimatedTime: string;
  xpReward: number;
  content: LessonContent;
}

// P4 Course Lessons Data
const p4Lessons: Record<string, P4Lesson> = {
  "day-1": {
    id: "day-1",
    title: "CFO Mindset Transformation",
    module: "Module 1: Financial Foundations & Strategy",
    dayNumber: 1,
    estimatedTime: "2 hours",
    xpReward: 100,
    content: {
      brief: "Welcome to your transformation into a CFO-level financial leader! Today we establish why finance isn't just \"necessary evil\" but your startup's strategic weapon.",
      
      objectives: [
        "Strategic Finance Mindset - How CFOs think beyond bookkeeping",
        "Financial Architecture - The 7 pillars of bulletproof finance systems",
        "Competitive Advantage - Using finance for market leadership",
        "Risk Management - Protecting your startup from financial disasters"
      ],
      
      keyInsights: [
        "82% of startups fail due to cash flow issues (not lack of demand)",
        "Startups with proper financial systems raise funds 3x faster", 
        "Professional financial infrastructure increases valuation by 20-30%",
        "Poor financial management costs startups ₹5-15 lakhs annually in penalties"
      ],
      
      sections: [
        {
          title: "🎓 The 8 Core Financial Principles",
          content: `
**1. Accrual vs Cash Accounting**
- **When to Use Accrual:** Revenue > ₹1 Cr, seeking investment, B2B SaaS
- **When to Use Cash:** Early stage, B2C transactions, simplicity needed
- **Hybrid Approach:** Management accounts (accrual) + Tax accounts (cash)
- **Real Example:** How Freshworks switched from cash to accrual at ₹10 Cr ARR

**2. Matching Principle**
- **Revenue Recognition:** When earned, not when received
- **Expense Recognition:** When incurred, not when paid
- **SaaS Application:** Monthly revenue recognition for annual contracts
- **Implementation Tool:** Revenue recognition waterfall template

**3. Prudence & Conservatism**
- **Revenue:** Recognize when certain
- **Expenses:** Recognize when probable
- **Provisions:** Always for doubtful debts, warranties, returns
- **Investor Impact:** Conservative accounting = higher credibility

**4. Materiality Concepts**
- **Threshold Setting:** 0.5-1% of revenue or 5% of profit
- **Investor Focus:** What moves the needle for valuation
- **Audit Implications:** What triggers detailed reviews
- **Practical Framework:** Materiality matrix for decisions

**5. Going Concern Assumption**
- **18-Month Runway:** Minimum for investor confidence
- **Burn Rate Management:** Monthly tracking and forecasting
- **Scenario Planning:** Best, base, worst case models
- **Early Warning Systems:** 6-month advance alerts

**6. Consistency Principle**
- **Policy Documentation:** Written accounting policies
- **Change Management:** When and how to change methods
- **Disclosure Requirements:** Explaining changes to stakeholders
- **Audit Trail:** Maintaining historical consistency

**7. Full Disclosure**
- **Related Party Transactions:** Complete transparency
- **Contingent Liabilities:** All potential obligations
- **Accounting Changes:** Impact on comparability
- **Material Events:** Post-balance sheet disclosures

**8. Substance Over Form**
- **Economic Reality:** True nature of transactions
- **Complex Structures:** Looking through legal form
- **Revenue Arrangements:** Principal vs agent analysis
- **Lease Accounting:** Operating vs finance lease
          `
        },
        {
          title: "💡 Expert Insights: CFO Success Patterns",
          content: `
Based on analysis of 500+ successful Indian startups:

**Pattern 1: The 3-3-3 Rule**
- 3 days to close monthly books
- 3 hours for board pack preparation
- 3 minutes to answer any financial question

**Pattern 2: The 80/20 Finance Focus**
- 80% automation, 20% analysis
- 80% prevention, 20% correction
- 80% strategic, 20% compliance

**Pattern 3: The Finance Stack Evolution**
- Stage 1 (₹0-1 Cr): Excel + Tally
- Stage 2 (₹1-10 Cr): Cloud accounting + Basic MIS
- Stage 3 (₹10-50 Cr): ERP + BI tools
- Stage 4 (₹50 Cr+): Integrated finance platform
          `
        },
        {
          title: "📚 Case Study: Razorpay's Financial Excellence Journey",
          content: `
**Year 1-2: Foundation Phase**
- Implemented Zoho Books on Day 1
- Monthly MIS from Month 3
- First CFO hire at ₹5 Cr ARR

**Year 3-4: Scale Phase**
- Moved to NetSuite at ₹50 Cr ARR
- Real-time dashboards implemented
- Finance team of 15 people

**Year 5+: Excellence Phase**
- IPO-ready systems in place
- 2-day monthly close achieved
- Valuation premium for financial maturity

**Key Lessons:**
1. Start with discipline, not perfection
2. Invest in systems before you need them
3. Financial excellence attracts premium valuations
4. Good finance talent pays for itself
          `
        }
      ],
      
      actionItems: [
        {
          title: "Finance Vision Statement",
          duration: "30 minutes",
          description: "Write your 3-year financial transformation vision addressing what world-class finance looks like for your startup"
        },
        {
          title: "Current State Deep Dive", 
          duration: "45 minutes",
          description: "Document your current financial situation including P&L, cash position, compliance status, and challenges"
        },
        {
          title: "Gap Analysis",
          duration: "30 minutes", 
          description: "Compare current state to CFO-level excellence, identify top 10 gaps and prioritize by impact"
        },
        {
          title: "90-Day Quick Wins",
          duration: "15 minutes",
          description: "List 5 immediate improvements you can make across different timeframes"
        }
      ],
      
      resources: [
        "Financial Health Assessment Tool (Excel)",
        "Finance Vision Template (Word)", 
        "Gap Analysis Framework (Excel)",
        "CFO Competency Checklist (PDF)",
        "90-Day Quick Wins Planner (Excel)",
        "Financial Principles Cheat Sheet (PDF)",
        "Case Study Collection: 10 Indian Startups (PDF)"
      ]
    }
  },
  
  "day-2": {
    id: "day-2",
    title: "Building Your Finance Architecture",
    module: "Module 1: Financial Foundations & Strategy",
    dayNumber: 2,
    estimatedTime: "2.5 hours",
    xpReward: 150,
    content: {
      brief: "Today we design your complete finance architecture - the blueprint that will guide your financial transformation for the next 3-5 years.",
      
      objectives: [
        "Design 7-layer finance architecture stack",
        "Create system evaluation framework",
        "Build 18-month implementation roadmap",
        "Calculate ROI and TCO for system investments"
      ],
      
      keyInsights: [
        "Good architecture scales 100x without breaking",
        "Poor architecture requires complete rebuilds", 
        "Architecture determines 70% of finance efficiency",
        "Right architecture saves ₹10-20 lakhs in rework"
      ]
    }
  },

  "day-3": {
    id: "day-3", 
    title: "Chart of Accounts Mastery",
    module: "Module 1: Financial Foundations & Strategy",
    dayNumber: 3,
    estimatedTime: "2 hours",
    xpReward: 200,
    content: {
      brief: "Your Chart of Accounts (COA) is the backbone of your entire financial system. Get it wrong, and you'll struggle with reporting forever. Get it right, and financial insights flow effortlessly."
    }
  },

  "day-11": {
    id: "day-11",
    title: "GST Fundamentals for Startups", 
    module: "Module 3: GST Compliance Mastery",
    dayNumber: 11,
    estimatedTime: "2 hours",
    xpReward: 150,
    content: {
      brief: "GST compliance isn't just about avoiding penalties - it's about optimizing cash flow, claiming rightful credits, and building credibility. Master GST, and you'll save lakhs annually."
    }
  },

  "day-22": {
    id: "day-22",
    title: "Building Dynamic Financial Models",
    module: "Module 5: Financial Planning & Analysis", 
    dayNumber: 22,
    estimatedTime: "3 hours",
    xpReward: 200,
    content: {
      brief: "Today you'll learn to build financial models that adapt to your business changes and provide instant what-if analysis for strategic decisions."
    }
  },

  "day-60": {
    id: "day-60",
    title: "IPO Readiness Roadmap",
    module: "Module 12: IPO Readiness & Exit Planning",
    dayNumber: 60, 
    estimatedTime: "2 hours",
    xpReward: 300,
    content: {
      brief: "IPO readiness isn't just about going public - it's about building institutional-grade financial infrastructure that maximizes valuation at any exit."
    }
  }
};

interface Props {
  params: {
    lessonId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = p4Lessons[params.lessonId as keyof typeof p4Lessons];
  
  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.title} - P4: Finance Stack Mastery | The Indian Startup`,
    description: lesson.content.brief,
  };
}

export default function P4LessonPage({ params }: Props) {
  const lesson = p4Lessons[params.lessonId as keyof typeof p4Lessons];

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <span>P4: Finance Stack Mastery</span>
            <span>→</span>
            <span>{lesson.module}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Day {lesson.dayNumber}: {lesson.title}
          </h1>
          <div className="flex items-center space-x-6 text-sm">
            <span>⏱ {lesson.estimatedTime}</span>
            <span>🏆 {lesson.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Morning Brief */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            📅 Morning Brief (30 minutes)
          </h2>
          <p className="text-blue-800 leading-relaxed">
            {lesson.content.brief}
          </p>
        </div>

        {/* Learning Objectives */}
        {lesson.content.objectives && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🎯 Core Learning Objectives</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lesson.content.objectives.map((objective, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-medium">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Insights */}
        {lesson.content.keyInsights && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">💡 The Shocking Reality</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <ul className="space-y-2">
                {lesson.content.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Interactive Tools Section */}
        {lesson.dayNumber === 1 && (
          <FinancialHealthAssessment 
            lessonId={lesson.id}
            courseCode="P4"
            moduleId="module-1"
            dayNumber={lesson.dayNumber}
          />
        )}

        {lesson.dayNumber === 11 && (
          <GSTComplianceTracker
            lessonId={lesson.id}
            courseCode="P4" 
            moduleId="module-3"
            dayNumber={lesson.dayNumber}
          />
        )}

        {lesson.dayNumber === 22 && (
          <FinancialModelBuilder
            lessonId={lesson.id}
            courseCode="P4"
            moduleId="module-5" 
            dayNumber={lesson.dayNumber}
          />
        )}

        {/* Detailed Content Sections */}
        {lesson.content.sections && (
          <div className="space-y-8 mb-8">
            {lesson.content.sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <div className="p-6">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(section.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'))
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Items */}
        {lesson.content.actionItems && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">🛠 Action Items ({lesson.estimatedTime})</h2>
            <div className="space-y-4">
              {lesson.content.actionItems.map((item, index) => (
                <div key={index} className="bg-white border-2 border-black rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{index + 1}. {item.title}</h3>
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downloads */}
        {lesson.content.resources && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">📎 Downloads for Day {lesson.dayNumber}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lesson.content.resources.map((resource, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium">{resource}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Implementation Checklist Link */}
        <div className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-900 mb-3">
              ✅ Track Your Implementation Progress
            </h3>
            <p className="text-green-800 mb-4">
              Use our comprehensive implementation checklist to track your progress through the entire P4 course.
            </p>
            <a 
              href="/templates/p4-implementation-checklist.html" 
              target="_blank"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              View Implementation Checklist
            </a>
          </div>
        </div>

        {/* Portfolio Integration */}
        <P4ActivityCapture
          lessonId={lesson.id}
          courseCode="P4"
          moduleId={`module-${Math.ceil(lesson.dayNumber / 5)}`}
          dayNumber={lesson.dayNumber}
        />

        {/* Milestone Achievement */}
        <div className="bg-black text-white rounded-lg p-6 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-xl font-bold mb-2">
              Milestone Unlocked: Foundation Builder
            </h3>
            <p className="text-gray-300 mb-4">
              You've earned {lesson.xpReward} XP for completing Day {lesson.dayNumber}
            </p>
            <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
              🎖 Badge Earned: Finance Strategist Level 1
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <div>
            {lesson.dayNumber > 1 && (
              <a 
                href={`/products/p4/lessons/day-${lesson.dayNumber - 1}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Day
              </a>
            )}
          </div>
          <div>
            {lesson.dayNumber < 60 && (
              <a 
                href={`/products/p4/lessons/day-${lesson.dayNumber + 1}`}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Next Day
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}