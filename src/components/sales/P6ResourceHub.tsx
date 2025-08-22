'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/Input';
import { 
  Download, 
  ExternalLink, 
  Play, 
  FileText, 
  Calculator, 
  Database,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  Lock,
  Star,
  Zap,
  Target,
  Users,
  TrendingUp,
  BookOpen,
  BarChart3,
  Phone,
  Mail,
  Globe,
  Search,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProducts } from '@/hooks/useUserProducts';

interface P6Resource {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'tool' | 'script' | 'calculator' | 'framework' | 'checklist' | 'playbook' | 'automation' | 'dashboard';
  url?: string;
  fileUrl?: string;
  value: number;
  downloads: number;
  rating: number;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: string;
  tags: string[];
  isPremium: boolean;
  category: string;
  fileSize?: string;
  isDownloadable: boolean;
  metadata?: any;
}

// Real P6 Sales & GTM resources data
const P6_SALES_RESOURCES: P6Resource[] = [
  // Sales Frameworks & Playbooks
  {
    id: 'p6-001',
    title: 'Complete Sales Playbook for Indian Market',
    description: 'Comprehensive 200-page sales playbook covering B2B and B2C strategies specific to Indian market dynamics',
    type: 'playbook',
    url: '/templates/p6-complete-sales-playbook.pdf',
    value: 50000,
    downloads: 3247,
    rating: 4.9,
    difficulty: 'Advanced',
    estimatedTime: '8-12 hours',
    tags: ['Sales Strategy', 'B2B', 'B2C', 'Indian Market'],
    isPremium: true,
    category: 'Sales Strategy',
    fileSize: '25.4 MB',
    isDownloadable: true
  },
  {
    id: 'p6-002',
    title: 'Cold Outreach Mastery Kit',
    description: 'Proven email templates, LinkedIn scripts, and cold calling frameworks with 40%+ response rates',
    type: 'template',
    url: '/templates/p6-cold-outreach-mastery.zip',
    value: 25000,
    downloads: 4521,
    rating: 4.8,
    difficulty: 'Intermediate',
    estimatedTime: '4-6 hours',
    tags: ['Cold Email', 'LinkedIn', 'Cold Calling', 'Outreach'],
    isPremium: true,
    category: 'Lead Generation',
    fileSize: '18.7 MB',
    isDownloadable: true
  },
  {
    id: 'p6-003',
    title: 'Sales Pipeline Builder & Tracker',
    description: 'Interactive Excel-based CRM with automated lead scoring, follow-up reminders, and conversion analytics',
    type: 'tool',
    url: '/tools/p6-sales-pipeline-builder',
    value: 35000,
    downloads: 2876,
    rating: 4.7,
    difficulty: 'Advanced',
    estimatedTime: '3-4 hours',
    tags: ['CRM', 'Pipeline Management', 'Lead Scoring', 'Analytics'],
    isPremium: true,
    category: 'Pipeline Management',
    isDownloadable: false
  },
  {
    id: 'p6-004',
    title: 'Customer Persona Development Framework',
    description: 'Research-backed framework to create detailed buyer personas with 25+ data points and validation methods',
    type: 'framework',
    url: '/templates/p6-customer-persona-framework.xlsx',
    value: 20000,
    downloads: 3654,
    rating: 4.6,
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    tags: ['Customer Research', 'Buyer Personas', 'Market Research'],
    isPremium: false,
    category: 'Customer Research',
    fileSize: '8.9 MB',
    isDownloadable: true
  },

  // Pricing & Revenue Optimization
  {
    id: 'p6-005',
    title: 'Dynamic Pricing Calculator',
    description: 'Advanced pricing model with competitor analysis, value-based pricing, and psychological pricing strategies',
    type: 'calculator',
    url: '/tools/p6-dynamic-pricing-calculator',
    value: 40000,
    downloads: 2134,
    rating: 4.8,
    difficulty: 'Expert',
    estimatedTime: '2-3 hours',
    tags: ['Pricing Strategy', 'Value Pricing', 'Competitor Analysis'],
    isPremium: true,
    category: 'Pricing Strategy',
    isDownloadable: false
  },
  {
    id: 'p6-006',
    title: 'Revenue Forecasting Model',
    description: 'Monte Carlo simulation-based revenue forecasting with seasonal adjustments and growth scenarios',
    type: 'calculator',
    url: '/tools/p6-revenue-forecasting-model',
    value: 30000,
    downloads: 1987,
    rating: 4.7,
    difficulty: 'Expert',
    estimatedTime: '4-5 hours',
    tags: ['Revenue Forecasting', 'Financial Planning', 'Growth Modeling'],
    isPremium: true,
    category: 'Revenue Planning',
    isDownloadable: false
  },
  {
    id: 'p6-007',
    title: 'Sales Commission Structure Designer',
    description: 'Comprehensive tool to design optimal commission structures with performance incentives and team scaling',
    type: 'tool',
    url: '/tools/p6-commission-structure-designer',
    value: 25000,
    downloads: 1654,
    rating: 4.5,
    difficulty: 'Advanced',
    estimatedTime: '2-3 hours',
    tags: ['Sales Compensation', 'Team Management', 'Incentive Design'],
    isPremium: true,
    category: 'Sales Management',
    isDownloadable: false
  },

  // Customer Success & Retention
  {
    id: 'p6-008',
    title: 'Customer Onboarding Automation System',
    description: 'Complete customer onboarding workflow with email sequences, milestone tracking, and success metrics',
    type: 'automation',
    url: '/templates/p6-customer-onboarding-system.zip',
    value: 35000,
    downloads: 2453,
    rating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    tags: ['Customer Onboarding', 'Automation', 'Email Marketing'],
    isPremium: true,
    category: 'Customer Success',
    fileSize: '22.1 MB',
    isDownloadable: true
  },
  {
    id: 'p6-009',
    title: 'Churn Prediction & Prevention Toolkit',
    description: 'Data-driven churn analysis tools with early warning systems and retention campaign templates',
    type: 'dashboard',
    url: '/tools/p6-churn-prediction-toolkit',
    value: 45000,
    downloads: 1321,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '4-6 hours',
    tags: ['Churn Analysis', 'Customer Retention', 'Predictive Analytics'],
    isPremium: true,
    category: 'Customer Retention',
    isDownloadable: false
  },
  {
    id: 'p6-010',
    title: 'Customer Success Score Dashboard',
    description: 'Real-time customer health scoring system with actionable insights and automated alerts',
    type: 'dashboard',
    url: '/tools/p6-customer-success-dashboard',
    value: 30000,
    downloads: 1876,
    rating: 4.6,
    difficulty: 'Advanced',
    estimatedTime: '3-4 hours',
    tags: ['Customer Health', 'Success Metrics', 'Dashboard'],
    isPremium: true,
    category: 'Customer Success',
    isDownloadable: false
  },

  // Sales Team Management
  {
    id: 'p6-011',
    title: 'Sales Team Hiring & Training System',
    description: 'Complete hiring framework with interview scripts, skills assessments, and 90-day training program',
    type: 'framework',
    url: '/templates/p6-sales-team-hiring-system.zip',
    value: 40000,
    downloads: 2198,
    rating: 4.7,
    difficulty: 'Advanced',
    estimatedTime: '8-10 hours',
    tags: ['Team Building', 'Hiring', 'Training', 'Sales Management'],
    isPremium: true,
    category: 'Team Management',
    fileSize: '31.5 MB',
    isDownloadable: true
  },
  {
    id: 'p6-012',
    title: 'Sales Performance Analytics Suite',
    description: 'Comprehensive performance tracking with individual and team KPIs, coaching recommendations, and improvement plans',
    type: 'dashboard',
    url: '/tools/p6-performance-analytics-suite',
    value: 35000,
    downloads: 1543,
    rating: 4.8,
    difficulty: 'Expert',
    estimatedTime: '5-6 hours',
    tags: ['Performance Management', 'Analytics', 'Team Coaching'],
    isPremium: true,
    category: 'Team Management',
    isDownloadable: false
  },

  // Digital Marketing Integration
  {
    id: 'p6-013',
    title: 'Sales-Marketing Alignment Framework',
    description: 'Complete system for aligning sales and marketing teams with shared KPIs, lead handoff processes, and attribution models',
    type: 'framework',
    url: '/templates/p6-sales-marketing-alignment.pdf',
    value: 30000,
    downloads: 2876,
    rating: 4.5,
    difficulty: 'Advanced',
    estimatedTime: '4-5 hours',
    tags: ['Sales-Marketing Alignment', 'Lead Management', 'Attribution'],
    isPremium: true,
    category: 'Marketing Integration',
    fileSize: '15.8 MB',
    isDownloadable: true
  },
  {
    id: 'p6-014',
    title: 'Content-Driven Sales Enablement Kit',
    description: 'Library of sales-focused content including case studies, objection handlers, and competitive battle cards',
    type: 'template',
    url: '/templates/p6-content-sales-enablement.zip',
    value: 35000,
    downloads: 3421,
    rating: 4.9,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    tags: ['Sales Enablement', 'Content Marketing', 'Case Studies'],
    isPremium: true,
    category: 'Sales Enablement',
    fileSize: '28.3 MB',
    isDownloadable: true
  },

  // Industry-Specific Templates
  {
    id: 'p6-015',
    title: 'SaaS Sales Playbook - Indian Market',
    description: 'Specialized playbook for SaaS companies including subscription metrics, trial optimization, and enterprise sales',
    type: 'playbook',
    url: '/templates/p6-saas-sales-playbook-india.pdf',
    value: 45000,
    downloads: 1987,
    rating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    tags: ['SaaS', 'Subscription Sales', 'Enterprise Sales'],
    isPremium: true,
    category: 'Industry-Specific',
    fileSize: '21.7 MB',
    isDownloadable: true
  },
  {
    id: 'p6-016',
    title: 'E-commerce Conversion Optimization Toolkit',
    description: 'Complete e-commerce sales optimization with funnel analysis, cart abandonment recovery, and upselling strategies',
    type: 'tool',
    url: '/tools/p6-ecommerce-conversion-optimizer',
    value: 40000,
    downloads: 2543,
    rating: 4.7,
    difficulty: 'Advanced',
    estimatedTime: '4-5 hours',
    tags: ['E-commerce', 'Conversion Optimization', 'Funnel Analysis'],
    isPremium: true,
    category: 'Industry-Specific',
    isDownloadable: false
  },

  // Sales Operations & Automation
  {
    id: 'p6-017',
    title: 'Sales Automation Workflow Builder',
    description: 'No-code automation builder for lead nurturing, follow-up sequences, and deal progression workflows',
    type: 'automation',
    url: '/tools/p6-sales-automation-builder',
    value: 50000,
    downloads: 1432,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '6-8 hours',
    tags: ['Sales Automation', 'Workflow', 'Lead Nurturing'],
    isPremium: true,
    category: 'Sales Operations',
    isDownloadable: false
  },
  {
    id: 'p6-018',
    title: 'Sales Reporting & KPI Dashboard',
    description: 'Executive-level sales dashboard with 40+ KPIs, trend analysis, and automated report generation',
    type: 'dashboard',
    url: '/tools/p6-sales-kpi-dashboard',
    value: 35000,
    downloads: 1765,
    rating: 4.6,
    difficulty: 'Advanced',
    estimatedTime: '3-4 hours',
    tags: ['Sales Reporting', 'KPIs', 'Executive Dashboard'],
    isPremium: true,
    category: 'Sales Operations',
    isDownloadable: false
  },

  // Negotiation & Closing
  {
    id: 'p6-019',
    title: 'Advanced Negotiation Mastery System',
    description: 'Psychology-based negotiation framework with scripts, objection handling, and win-win strategies',
    type: 'framework',
    url: '/templates/p6-negotiation-mastery-system.pdf',
    value: 40000,
    downloads: 2987,
    rating: 4.8,
    difficulty: 'Expert',
    estimatedTime: '5-6 hours',
    tags: ['Negotiation', 'Closing Techniques', 'Psychology'],
    isPremium: true,
    category: 'Sales Skills',
    fileSize: '19.2 MB',
    isDownloadable: true
  },
  {
    id: 'p6-020',
    title: 'Contract & Proposal Template Library',
    description: 'Legal-verified contract templates, proposal formats, and SOW templates for various industries',
    type: 'template',
    url: '/templates/p6-contract-proposal-library.zip',
    value: 30000,
    downloads: 3865,
    rating: 4.5,
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    tags: ['Contracts', 'Proposals', 'Legal Templates'],
    isPremium: false,
    category: 'Sales Documentation',
    fileSize: '16.4 MB',
    isDownloadable: true
  }
];

interface P6ResourceHubProps {
  hasAccess?: boolean;
}

const P6ResourceHub: React.FC<P6ResourceHubProps> = ({ hasAccess: hasAccessProp }) => {
  const { user } = useAuth();
  const { hasAccess: hasUserAccess } = useUserProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const hasP6Access = hasAccessProp ?? hasUserAccess('P6');

  const filteredResources = useMemo(() => {
    return P6_SALES_RESOURCES.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template': return <FileText className="w-4 h-4" />;
      case 'tool': return <Zap className="w-4 h-4" />;
      case 'script': return <FileText className="w-4 h-4" />;
      case 'calculator': return <Calculator className="w-4 h-4" />;
      case 'framework': return <BookOpen className="w-4 h-4" />;
      case 'checklist': return <CheckCircle className="w-4 h-4" />;
      case 'playbook': return <BookOpen className="w-4 h-4" />;
      case 'automation': return <Zap className="w-4 h-4" />;
      case 'dashboard': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'bg-blue-100 text-blue-800';
      case 'tool': return 'bg-green-100 text-green-800';
      case 'calculator': return 'bg-purple-100 text-purple-800';
      case 'framework': return 'bg-orange-100 text-orange-800';
      case 'playbook': return 'bg-red-100 text-red-800';
      case 'automation': return 'bg-yellow-100 text-yellow-800';
      case 'dashboard': return 'bg-indigo-100 text-indigo-800';
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

  const openTool = (toolUrl: string) => {
    window.open(toolUrl, '_blank');
  };

  const downloadResource = (resource: P6Resource) => {
    if (!hasP6Access) {
      alert('P6 access required to download resources');
      return;
    }
    
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else {
      alert(`Resource ${resource.title} will be available soon!`);
    }
  };

  if (!hasP6Access) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
        <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3">P6: Sales & GTM Mastery</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Access 20 professional sales resources worth ₹6,70,000. Master Indian market sales with proven frameworks, 
          automation tools, and industry-specific playbooks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
          <div className="p-3 bg-white rounded-lg border border-orange-100">
            <BookOpen className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Complete Playbooks</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-orange-100">
            <Calculator className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Pricing Tools</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-orange-100">
            <Zap className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Automation Systems</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-orange-100">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Analytics Dashboards</div>
          </div>
        </div>
        <a href="/pricing">
          <Button variant="primary" size="lg">
            <Target className="w-5 h-5 mr-2" />
            Unlock Sales Mastery (₹6,999)
          </Button>
        </a>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-900 to-red-700 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">P6: Sales & GTM Resource Hub</h1>
              <p className="text-orange-200">20 Professional Sales Resources Worth ₹6,70,000</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{P6_SALES_RESOURCES.length}</div>
                <div className="text-sm">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{P6_SALES_RESOURCES.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}</div>
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
                placeholder="Search sales resources, templates, tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'Sales Strategy', label: 'Strategy' },
                { id: 'Lead Generation', label: 'Lead Gen' },
                { id: 'Pricing Strategy', label: 'Pricing' },
                { id: 'Customer Success', label: 'Success' },
                { id: 'Team Management', label: 'Management' }
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Resources', value: P6_SALES_RESOURCES.length, icon: FileText, color: 'text-blue-600' },
          { label: 'Premium Tools', value: P6_SALES_RESOURCES.filter(r => r.isPremium).length, icon: Lock, color: 'text-purple-600' },
          { label: 'Free Resources', value: P6_SALES_RESOURCES.filter(r => !r.isPremium).length, icon: Users, color: 'text-green-600' },
          { label: 'Expert Level', value: P6_SALES_RESOURCES.filter(r => r.difficulty === 'Expert').length, icon: Star, color: 'text-red-600' }
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
                  {getTypeIcon(resource.type)}
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

              <div className="text-sm font-medium text-green-600 mb-3">
                Value: {formatCurrency(resource.value)}
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
                onClick={() => downloadResource(resource)}
              >
                {resource.isDownloadable ? (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Launch Tool
                  </>
                )}
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
              P6_SALES_RESOURCES.reduce((acc, resource) => {
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
      <Card className="bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P6_SALES_RESOURCES.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(P6_SALES_RESOURCES.reduce((sum, r) => sum + r.rating, 0) / P6_SALES_RESOURCES.length).toFixed(1)}★
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(P6_SALES_RESOURCES.reduce((sum, r) => sum + r.value, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P6_SALES_RESOURCES.filter(r => r.difficulty === 'Expert').length}
              </div>
              <div className="text-sm text-gray-600">Expert Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default P6ResourceHub;