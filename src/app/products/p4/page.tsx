import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'P4: Finance Stack - CFO-Level Mastery | The Indian Startup',
  description: 'Transform from basic bookkeeping to CFO-level financial mastery. Build investor-grade financial infrastructure, achieve 100% compliance, and position for scale.',
  keywords: 'CFO course, financial modeling, GST compliance, startup finance, investor reporting, financial planning',
};

const modules = [
  {
    id: 1,
    title: "Financial Foundations & Strategy",
    days: "Days 1-5",
    description: "Build the mental models and strategic thinking of a world-class CFO",
    lessons: [
      { id: "day-1", title: "CFO Mindset Transformation", available: true },
      { id: "day-2", title: "Building Your Finance Architecture", available: true },
      { id: "day-3", title: "Chart of Accounts Mastery", available: true },
      { id: "day-4", title: "Accounting Policies Framework", available: true },
      { id: "day-5", title: "Financial Systems Architecture", available: true },
    ]
  },
  {
    id: 2,
    title: "Accounting Systems Setup",
    days: "Days 6-10", 
    description: "Transform from spreadsheet chaos to professional accounting infrastructure",
    lessons: [
      { id: "day-6", title: "Choosing the Right Accounting Software", available: true },
      { id: "day-7", title: "Implementation Excellence", available: true },
      { id: "day-8", title: "Transaction Processing SOPs", available: true },
      { id: "day-9", title: "Month-End Closing Process", available: true },
      { id: "day-10", title: "Internal Controls Framework", available: true },
    ]
  },
  {
    id: 3,
    title: "GST Compliance Mastery",
    days: "Days 11-16",
    description: "Navigate India's GST maze with confidence and optimization strategies",
    lessons: [
      { id: "day-11", title: "GST Fundamentals for Startups", available: true },
      { id: "day-12", title: "GST Compliance Architecture", available: true },
      { id: "day-13", title: "E-invoicing Implementation", available: true },
      { id: "day-14", title: "E-way Bill Management", available: true },
      { id: "day-15", title: "ITC Optimization", available: true },
      { id: "day-16", title: "GST Audit Preparation", available: true },
    ]
  },
  {
    id: 4,
    title: "Corporate Compliance Excellence", 
    days: "Days 17-21",
    description: "Build bulletproof compliance systems that run on autopilot",
    lessons: [
      { id: "day-17", title: "MCA Compliance Framework", available: true },
      { id: "day-18", title: "Board Governance & Reporting", available: true },
      { id: "day-19", title: "Statutory Audit Management", available: true },
      { id: "day-20", title: "Secretarial Compliance", available: true },
      { id: "day-21", title: "Income Tax Compliance", available: true },
    ]
  },
  {
    id: 5,
    title: "Financial Planning & Analysis",
    days: "Days 22-27",
    description: "Transform from reactive reporting to predictive insights",
    lessons: [
      { id: "day-22", title: "Building Dynamic Financial Models", available: true },
      { id: "day-23", title: "Revenue Planning & Forecasting", available: true },
      { id: "day-24", title: "Cost Management Framework", available: true },
      { id: "day-25", title: "Working Capital Management", available: true },
      { id: "day-26", title: "Cash Flow Management", available: true },
      { id: "day-27", title: "Management Reporting", available: true },
    ]
  },
  {
    id: 6,
    title: "Investor-Ready Finance",
    days: "Days 28-33",
    description: "Build financial infrastructure that attracts and retains investors",
    lessons: [
      { id: "day-28", title: "Investor Reporting Standards", available: true },
      { id: "day-29", title: "Due Diligence Preparation", available: true },
      { id: "day-30", title: "Valuation Frameworks", available: true },
      { id: "day-31", title: "Cap Table Management", available: true },
      { id: "day-32", title: "Financial Controls for Scale", available: true },
      { id: "day-33", title: "IPO Readiness Basics", available: true },
    ]
  }
];

const tools = [
  {
    title: "Financial Health Assessment",
    description: "100-point comprehensive assessment to evaluate your financial maturity",
    icon: "📊",
    link: "/templates/p4-financial-health-assessment.html"
  },
  {
    title: "Financial Model Builder", 
    description: "Build dynamic 5-year financial models with scenario analysis",
    icon: "📈",
    link: "/templates/p4-financial-model-builder.html"
  },
  {
    title: "GST Compliance Tracker",
    description: "Automated tracking and alerts for all GST requirements", 
    icon: "📋",
    link: "/templates/p4-gst-compliance-tracker.html"
  },
  {
    title: "Implementation Checklist",
    description: "Track your progress through 55+ implementation tasks",
    icon: "✅", 
    link: "/templates/p4-implementation-checklist.html"
  }
];

export default function P4ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              P4: Finance Stack - CFO-Level Mastery
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform from basic bookkeeping to CFO-level financial mastery. Build investor-grade 
              financial infrastructure worth ₹50L+ in consulting value.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center">
                <span className="text-2xl mr-2">⏱</span>
                <span>60 days total</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">📚</span>
                <span>12 modules</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">🛠</span>
                <span>250+ templates</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">💰</span>
                <span>₹6,999</span>
              </div>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-bold mb-2">Save ₹3-5 Lakhs Annually</h3>
              <p className="text-gray-300 text-sm">On CA/consultant fees through systematic processes</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-bold mb-2">20-30% Valuation Increase</h3>
              <p className="text-gray-300 text-sm">Through professional financial infrastructure</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold mb-2">3x Faster Fundraising</h3>
              <p className="text-gray-300 text-sm">With investor-ready documentation and reporting</p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/products/p4/lessons/day-1"
              className="inline-block bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your CFO Journey →
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Tools Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🛠 Interactive Tools & Templates</h2>
            <p className="text-xl text-gray-600">
              Get immediate value with our professional-grade financial tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-bold mb-3">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <a 
                  href={tool.link}
                  target="_blank"
                  className="inline-flex items-center text-black font-medium hover:underline"
                >
                  Try Tool →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">📚 Complete Course Curriculum</h2>
            <p className="text-xl text-gray-600">
              60 days of comprehensive financial transformation
            </p>
          </div>

          <div className="space-y-8">
            {modules.slice(0, 6).map((module) => (
              <div key={module.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">
                        Module {module.id}: {module.title}
                      </h3>
                      <p className="text-gray-600">{module.days}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                        {module.lessons.length} lessons
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{module.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/products/p4/lessons/${lesson.id}`}
                        className={`block p-4 rounded-lg border-2 transition-all ${
                          lesson.available 
                            ? 'border-gray-200 hover:border-black hover:shadow-md' 
                            : 'border-gray-100 bg-gray-50 opacity-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{lesson.title}</span>
                          {lesson.available ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-gray-400">🔒</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining Modules Preview */}
          <div className="mt-12 text-center">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">+ 6 More Advanced Modules</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-2">Module 7-9</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Banking & Treasury Management</li>
                    <li>• Advanced Financial Management</li>
                    <li>• Building Your Finance Team</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Module 10-12</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Specialized Finance Tracks</li>
                    <li>• Tax Planning & Optimization</li>
                    <li>• IPO Readiness & Exit Planning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Bonus Content</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SaaS Finance Mastery</li>
                    <li>• E-commerce Finance</li>
                    <li>• Marketplace Finance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Build */}
      <div className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">✅ What You'll Build</h2>
            <p className="text-xl text-gray-300">
              By course completion, you'll have a complete financial infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">🏗</div>
              <h3 className="text-lg font-bold mb-2">World-Class Financial Infrastructure</h3>
              <p className="text-gray-300 text-sm">Complete accounting systems with real-time dashboards</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold mb-2">100% Compliance Framework</h3>
              <p className="text-gray-300 text-sm">GST, MCA, Income Tax on autopilot</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-bold mb-2">Investor-Grade Reporting</h3>
              <p className="text-gray-300 text-sm">Monthly MIS, board packs that wow VCs</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Advanced Financial Models</h3>
              <p className="text-gray-300 text-sm">DCF, scenario planning, valuation frameworks</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-bold mb-2">Team & Process Documentation</h3>
              <p className="text-gray-300 text-sm">250+ templates and SOPs for your finance function</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold mb-2">CFO Strategic Toolkit</h3>
              <p className="text-gray-300 text-sm">Skills to be a strategic business partner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Integration */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🎯 Portfolio Integration</h2>
            <p className="text-xl text-gray-600">
              Build your startup portfolio automatically as you complete activities
            </p>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Smart Portfolio Building</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Financial planning activities auto-populate portfolio</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Professional financial models and projections</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Compliance framework documentation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Export-ready investor materials</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-3">Portfolio Sections Enhanced:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Financial Planning</span>
                    <span className="text-blue-600">Auto-populated</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Business Model</span>
                    <span className="text-blue-600">Financial Canvas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Legal Compliance</span>
                    <span className="text-blue-600">Framework docs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Research</span>
                    <span className="text-blue-600">Financial analysis</span>
                  </div>
                </div>
                <Link 
                  href="/portfolio"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                >
                  View Portfolio →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Hub */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">📚 Complete Resource Library</h2>
            <p className="text-xl text-gray-600">
              250+ templates, tools, and resources included
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">Financial Modeling (50+)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Financial Model Templates</li>
                <li>• SaaS Metrics Dashboard</li>
                <li>• Unit Economics Calculator</li>
                <li>• Valuation Models</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">Compliance Tools (40+)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GST Compliance Tracker</li>
                <li>• MCA Compliance Calendar</li>
                <li>• Tax Planning Worksheets</li>
                <li>• Audit Checklists</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">Process Documents (35+)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accounting Policy Manual</li>
                <li>• Monthly Closing SOPs</li>
                <li>• Approval Matrix Templates</li>
                <li>• Internal Controls</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">Team Management (25+)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Finance JD Templates</li>
                <li>• Interview Scorecards</li>
                <li>• Training Programs</li>
                <li>• Performance Reviews</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/resources"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse All Resources →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Finance Function?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of founders who've built world-class financial infrastructure with P4
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products/p4/lessons/day-1"
              className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-colors"
            >
              View Pricing
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}