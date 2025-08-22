'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  FileText, 
  Calculator, 
  Download,
  ExternalLink,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  TrendingUp,
  DollarSign,
  Shield,
  Zap,
  Lock,
  Briefcase
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'template' | 'tool' | 'spreadsheet' | 'calculator' | 'dashboard' | 'guide';
  url: string;
  description: string;
  tags: string[];
  downloads: number;
  rating: number;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  isPremium: boolean;
  category: string;
  estimatedTime: string;
  fileSize?: string;
}

interface P4ResourceLibraryProps {
  hasAccess: boolean;
}

// Real P4 Finance resources data
const P4_FINANCE_RESOURCES: Resource[] = [
  // Financial Models & Templates
  {
    id: 'p4-001',
    title: '5-Year Financial Model Builder',
    type: 'spreadsheet',
    url: '/templates/p4-5-year-financial-model.xlsx',
    description: 'Comprehensive DCF model with scenario analysis, sensitivity analysis, and investor-ready outputs',
    tags: ['Financial Planning', 'DCF', 'Valuation', 'Scenario Analysis'],
    downloads: 2847,
    rating: 4.9,
    difficulty: 'Expert',
    isPremium: true,
    category: 'Financial Modeling',
    estimatedTime: '4-6 hours',
    fileSize: '15.2 MB'
  },
  {
    id: 'p4-002', 
    title: 'Startup Budget & Cash Flow Template',
    type: 'template',
    url: '/templates/p4-startup-budget-cashflow.xlsx',
    description: 'Monthly budget template with cash flow forecasting, burn rate tracking, and runway calculations',
    tags: ['Budgeting', 'Cash Flow', 'Burn Rate', 'Financial Planning'],
    downloads: 3921,
    rating: 4.8,
    difficulty: 'Intermediate',
    isPremium: false,
    category: 'Financial Planning',
    estimatedTime: '2-3 hours',
    fileSize: '8.4 MB'
  },
  {
    id: 'p4-003',
    title: 'Unit Economics Calculator',
    type: 'calculator',
    url: '/tools/p4-unit-economics-calculator',
    description: 'Interactive calculator for CAC, LTV, payback period, and unit economics optimization',
    tags: ['Unit Economics', 'CAC', 'LTV', 'Metrics'],
    downloads: 1876,
    rating: 4.7,
    difficulty: 'Intermediate',
    isPremium: true,
    category: 'Financial Analytics',
    estimatedTime: '1-2 hours'
  },
  {
    id: 'p4-004',
    title: 'Fundraising Financial Pack',
    type: 'template',
    url: '/templates/p4-fundraising-financials.zip',
    description: 'Complete investor-ready financial package including P&L, cash flow, balance sheet projections',
    tags: ['Fundraising', 'Investor Deck', 'Financial Statements', 'Projections'],
    downloads: 2134,
    rating: 4.9,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Fundraising',
    estimatedTime: '6-8 hours',
    fileSize: '22.1 MB'
  },

  // GST & Compliance Tools
  {
    id: 'p4-005',
    title: 'GST Compliance Dashboard',
    type: 'dashboard',
    url: '/tools/p4-gst-compliance-dashboard',
    description: 'Automated GST filing tracker with return management, ITC reconciliation, and penalty calculator',
    tags: ['GST', 'Compliance', 'Tax', 'Automation'],
    downloads: 4521,
    rating: 4.8,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Tax & Compliance',
    estimatedTime: '3-4 hours'
  },
  {
    id: 'p4-006',
    title: 'E-Invoice & E-Way Bill Generator',
    type: 'tool',
    url: '/tools/p4-einvoice-generator',
    description: 'Automated e-invoice generation tool with QR code creation and government portal integration',
    tags: ['E-Invoice', 'E-Way Bill', 'GST', 'Automation'],
    downloads: 3287,
    rating: 4.6,
    difficulty: 'Intermediate',
    isPremium: true,
    category: 'Tax & Compliance',
    estimatedTime: '1-2 hours'
  },
  {
    id: 'p4-007',
    title: 'TDS & Advance Tax Calculator',
    type: 'calculator',
    url: '/tools/p4-tds-advance-tax-calculator',
    description: 'Comprehensive TDS calculation tool with advance tax planning and quarterly payment scheduler',
    tags: ['TDS', 'Advance Tax', 'Tax Planning', 'Calculator'],
    downloads: 2891,
    rating: 4.7,
    difficulty: 'Intermediate',
    isPremium: false,
    category: 'Tax & Compliance',
    estimatedTime: '30-45 minutes'
  },

  // Accounting & Bookkeeping
  {
    id: 'p4-008',
    title: 'Complete Accounting System Setup',
    type: 'guide',
    url: '/guides/p4-accounting-system-setup.pdf',
    description: 'Step-by-step guide to setting up Tally, QuickBooks, or Zoho Books for Indian startups',
    tags: ['Accounting', 'Tally', 'QuickBooks', 'Setup'],
    downloads: 5432,
    rating: 4.9,
    difficulty: 'Basic',
    isPremium: false,
    category: 'Accounting',
    estimatedTime: '2-3 hours',
    fileSize: '12.8 MB'
  },
  {
    id: 'p4-009',
    title: 'Chart of Accounts Template',
    type: 'template',
    url: '/templates/p4-chart-of-accounts.xlsx',
    description: 'Industry-specific chart of accounts templates for tech, SaaS, e-commerce, and manufacturing',
    tags: ['Chart of Accounts', 'Accounting Structure', 'Templates'],
    downloads: 4187,
    rating: 4.8,
    difficulty: 'Intermediate',
    isPremium: true,
    category: 'Accounting',
    estimatedTime: '1-2 hours',
    fileSize: '4.2 MB'
  },
  {
    id: 'p4-010',
    title: 'Monthly Financial Close Checklist',
    type: 'template',
    url: '/templates/p4-monthly-close-checklist.xlsx',
    description: 'Comprehensive month-end closing checklist with automated workflows and approval processes',
    tags: ['Month End', 'Financial Close', 'Checklist', 'Process'],
    downloads: 3654,
    rating: 4.7,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Accounting',
    estimatedTime: '2-4 hours',
    fileSize: '6.8 MB'
  },

  // Financial Analytics & KPIs
  {
    id: 'p4-011',
    title: 'SaaS Metrics Dashboard',
    type: 'dashboard',
    url: '/tools/p4-saas-metrics-dashboard',
    description: 'Real-time SaaS metrics tracking: MRR, ARR, churn, CAC payback, net revenue retention',
    tags: ['SaaS', 'Metrics', 'MRR', 'Churn', 'Dashboard'],
    downloads: 2976,
    rating: 4.9,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Financial Analytics',
    estimatedTime: '3-4 hours'
  },
  {
    id: 'p4-012',
    title: 'Financial Ratios Calculator',
    type: 'calculator',
    url: '/tools/p4-financial-ratios-calculator',
    description: 'Calculate and benchmark 40+ financial ratios with industry comparisons and trend analysis',
    tags: ['Financial Ratios', 'Analysis', 'Benchmarking', 'KPIs'],
    downloads: 4321,
    rating: 4.8,
    difficulty: 'Intermediate',
    isPremium: false,
    category: 'Financial Analytics',
    estimatedTime: '45-60 minutes'
  },
  {
    id: 'p4-013',
    title: 'Break-even Analysis Tool',
    type: 'calculator',
    url: '/tools/p4-breakeven-analysis',
    description: 'Multi-scenario break-even analysis with sensitivity testing and profit optimization',
    tags: ['Break-even', 'Profit Analysis', 'Scenario Planning'],
    downloads: 3542,
    rating: 4.7,
    difficulty: 'Intermediate',
    isPremium: true,
    category: 'Financial Analytics',
    estimatedTime: '1-2 hours'
  },

  // Banking & Treasury
  {
    id: 'p4-014',
    title: 'Multi-Bank Reconciliation Template',
    type: 'template',
    url: '/templates/p4-bank-reconciliation.xlsx',
    description: 'Automated bank reconciliation with multi-currency support and exception reporting',
    tags: ['Bank Reconciliation', 'Treasury', 'Multi-Currency'],
    downloads: 2876,
    rating: 4.6,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Banking & Treasury',
    estimatedTime: '2-3 hours',
    fileSize: '9.4 MB'
  },
  {
    id: 'p4-015',
    title: 'Cash Management Dashboard',
    type: 'dashboard',
    url: '/tools/p4-cash-management-dashboard',
    description: 'Real-time cash position tracking with forecasting and liquidity risk management',
    tags: ['Cash Management', 'Liquidity', 'Forecasting', 'Risk'],
    downloads: 1987,
    rating: 4.8,
    difficulty: 'Expert',
    isPremium: true,
    category: 'Banking & Treasury',
    estimatedTime: '4-5 hours'
  },

  // Investor Relations
  {
    id: 'p4-016',
    title: 'Monthly Investor Report Template',
    type: 'template',
    url: '/templates/p4-investor-report-template.pptx',
    description: 'Professional monthly investor update template with key metrics and commentary',
    tags: ['Investor Relations', 'Monthly Reports', 'Updates'],
    downloads: 1654,
    rating: 4.9,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Investor Relations',
    estimatedTime: '2-3 hours',
    fileSize: '18.5 MB'
  },
  {
    id: 'p4-017',
    title: 'Board Package Template',
    type: 'template',
    url: '/templates/p4-board-package-template.zip',
    description: 'Complete board meeting package with financial statements, KPI dashboard, and strategic updates',
    tags: ['Board Meeting', 'Governance', 'Financial Reporting'],
    downloads: 1321,
    rating: 4.8,
    difficulty: 'Expert',
    isPremium: true,
    category: 'Investor Relations',
    estimatedTime: '4-6 hours',
    fileSize: '25.7 MB'
  },

  // Financial Planning & Strategy
  {
    id: 'p4-018',
    title: 'Annual Budget Planning Toolkit',
    type: 'template',
    url: '/templates/p4-annual-budget-toolkit.xlsx',
    description: 'Comprehensive annual budgeting with departmental allocation, variance analysis, and forecasting',
    tags: ['Annual Budget', 'Planning', 'Forecasting', 'Variance Analysis'],
    downloads: 2543,
    rating: 4.7,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Financial Planning',
    estimatedTime: '6-8 hours',
    fileSize: '14.3 MB'
  },
  {
    id: 'p4-019',
    title: 'Scenario Planning Model',
    type: 'spreadsheet',
    url: '/templates/p4-scenario-planning-model.xlsx',
    description: 'Advanced scenario modeling tool with Monte Carlo simulation and risk analysis',
    tags: ['Scenario Planning', 'Monte Carlo', 'Risk Analysis', 'Modeling'],
    downloads: 1876,
    rating: 4.9,
    difficulty: 'Expert',
    isPremium: true,
    category: 'Financial Planning',
    estimatedTime: '8-10 hours',
    fileSize: '19.8 MB'
  },

  // Audit & Internal Controls
  {
    id: 'p4-020',
    title: 'Internal Audit Checklist',
    type: 'template',
    url: '/templates/p4-internal-audit-checklist.xlsx',
    description: 'Comprehensive internal audit framework with risk assessment and control testing',
    tags: ['Internal Audit', 'Risk Assessment', 'Controls', 'Compliance'],
    downloads: 2198,
    rating: 4.6,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Audit & Controls',
    estimatedTime: '3-4 hours',
    fileSize: '7.9 MB'
  }
];

export function P4ResourceLibrary({ hasAccess }: P4ResourceLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredResources = useMemo(() => {
    return P4_FINANCE_RESOURCES.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'template': return <FileText className="w-5 h-5" />;
      case 'calculator': return <Calculator className="w-5 h-5" />;
      case 'spreadsheet': return <TrendingUp className="w-5 h-5" />;
      case 'dashboard': return <TrendingUp className="w-5 h-5" />;
      case 'tool': return <Zap className="w-5 h-5" />;
      case 'guide': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'bg-blue-100 text-blue-800';
      case 'calculator': return 'bg-green-100 text-green-800';
      case 'spreadsheet': return 'bg-orange-100 text-orange-800';
      case 'dashboard': return 'bg-purple-100 text-purple-800';
      case 'tool': return 'bg-yellow-100 text-yellow-800';
      case 'guide': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!hasAccess) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3">P4: Finance Stack - CFO Mastery</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Access 20 CFO-level financial templates, calculators, and tools worth ₹75,000. 
          Build world-class financial infrastructure with GST compliance, investor reporting, and advanced analytics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
          <div className="p-3 bg-white rounded-lg border border-green-100">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-sm font-medium">5+ Financial Models</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-100">
            <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-sm font-medium">GST Compliance</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-100">
            <Calculator className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Interactive Tools</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-100">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Investor Reports</div>
          </div>
        </div>
        <a href="/pricing">
          <Button variant="primary" size="lg">
            <DollarSign className="w-5 h-5 mr-2" />
            Unlock Finance Stack (₹6,999)
          </Button>
        </a>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-900 to-green-700 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">P4: Finance Stack Resource Library</h1>
              <p className="text-green-200">20 CFO-Level Templates & Tools Worth ₹75,000</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{P4_FINANCE_RESOURCES.length}</div>
                <div className="text-sm">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{P4_FINANCE_RESOURCES.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}</div>
                <div className="text-sm">Downloads</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search financial templates, calculators, models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'template', label: 'Templates' },
                { id: 'calculator', label: 'Calculators' },
                { id: 'spreadsheet', label: 'Excel Models' },
                { id: 'dashboard', label: 'Dashboards' },
                { id: 'tool', label: 'Tools' },
                { id: 'guide', label: 'Guides' }
              ].map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Resources', value: P4_FINANCE_RESOURCES.length, icon: FileText, color: 'text-blue-600' },
          { label: 'Premium Tools', value: P4_FINANCE_RESOURCES.filter(r => r.isPremium).length, icon: Lock, color: 'text-purple-600' },
          { label: 'Free Resources', value: P4_FINANCE_RESOURCES.filter(r => !r.isPremium).length, icon: Users, color: 'text-green-600' },
          { label: 'Expert Level', value: P4_FINANCE_RESOURCES.filter(r => r.difficulty === 'Expert').length, icon: Star, color: 'text-red-600' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getIcon(resource.type)}
                  <Badge className={getTypeColor(resource.type)}>
                    {resource.type}
                  </Badge>
                  {resource.isPremium && (
                    <Badge variant="outline" className="text-xs">
                      <Lock className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <Badge className={getDifficultyColor(resource.difficulty)} variant="outline">
                  {resource.difficulty}
                </Badge>
              </div>
              
              <h3 className="font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  {resource.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {resource.downloads.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {resource.estimatedTime}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {resource.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{resource.tags.length - 3}
                  </Badge>
                )}
              </div>

              <Button 
                className="w-full" 
                variant={resource.isPremium ? "default" : "outline"}
                asChild
              >
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {['calculator', 'dashboard', 'tool'].includes(resource.type) ? 'Launch Tool' : 'Download'}
                  {['calculator', 'dashboard', 'tool'].includes(resource.type) ? (
                    <ExternalLink className="w-4 h-4 ml-2" />
                  ) : (
                    <Download className="w-4 h-4 ml-2" />
                  )}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resource Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(
              P4_FINANCE_RESOURCES.reduce((acc, resource) => {
                acc[resource.category] = (acc[resource.category] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([category, count]) => (
              <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P4_FINANCE_RESOURCES.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(P4_FINANCE_RESOURCES.reduce((sum, r) => sum + r.rating, 0) / P4_FINANCE_RESOURCES.length).toFixed(1)}★
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P4_FINANCE_RESOURCES.filter(r => r.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Premium Resources</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P4_FINANCE_RESOURCES.filter(r => r.difficulty === 'Expert').length}
              </div>
              <div className="text-sm text-gray-600">Expert Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}