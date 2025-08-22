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
  Database,
  Shield,
  Calculator,
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
  Crown,
  Globe,
  Search,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProducts } from '@/hooks/useUserProducts';

interface P8Resource {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'tool' | 'framework' | 'spreadsheet' | 'dashboard' | 'guide' | 'video' | 'calculator' | 'checklist';
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

// Real P8 Data Room resources data
const P8_DATAROOM_RESOURCES: P8Resource[] = [
  // Data Room Architecture & Strategy
  {
    id: 'p8-001',
    title: 'Complete Data Room Architecture Blueprint',
    description: 'Comprehensive 150-page guide to building investor-grade data rooms with folder structures, security protocols, and access controls',
    type: 'framework',
    url: '/templates/p8-data-room-architecture-blueprint.pdf',
    value: 150000,
    downloads: 1876,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '8-12 hours',
    tags: ['Data Room', 'Architecture', 'Security', 'Investor Relations'],
    isPremium: true,
    category: 'Data Room Strategy',
    fileSize: '45.3 MB',
    isDownloadable: true
  },
  {
    id: 'p8-002',
    title: 'Due Diligence Checklist & Document Matrix',
    description: 'Complete DD checklist with 400+ document requirements mapped to investor types, funding stages, and industries',
    type: 'checklist',
    url: '/templates/p8-due-diligence-checklist.xlsx',
    value: 75000,
    downloads: 2543,
    rating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '4-6 hours',
    tags: ['Due Diligence', 'Checklist', 'Documentation', 'Legal'],
    isPremium: true,
    category: 'Due Diligence',
    fileSize: '12.8 MB',
    isDownloadable: true
  },
  {
    id: 'p8-003',
    title: 'Data Room Security & Access Control System',
    description: 'Advanced security framework with NDA management, access logging, download tracking, and watermarking protocols',
    type: 'framework',
    url: '/templates/p8-data-room-security-system.zip',
    value: 125000,
    downloads: 1432,
    rating: 4.7,
    difficulty: 'Expert',
    estimatedTime: '6-8 hours',
    tags: ['Security', 'Access Control', 'NDAs', 'Compliance'],
    isPremium: true,
    category: 'Security & Compliance',
    fileSize: '28.7 MB',
    isDownloadable: true
  },

  // Financial Models & Spreadsheets
  {
    id: 'p8-004',
    title: 'Investor-Grade Financial Model Builder',
    description: 'Professional 5-year financial model with scenario analysis, sensitivity testing, and automated investor reports',
    type: 'spreadsheet',
    url: '/templates/p8-investor-financial-model.xlsx',
    value: 200000,
    downloads: 3214,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '10-15 hours',
    tags: ['Financial Modeling', 'DCF', 'Valuation', 'Investor Reports'],
    isPremium: true,
    category: 'Financial Modeling',
    fileSize: '32.4 MB',
    isDownloadable: true
  },
  {
    id: 'p8-005',
    title: 'Cap Table Management System',
    description: 'Dynamic cap table with waterfall analysis, dilution modeling, and equity pool management for all funding rounds',
    type: 'spreadsheet',
    url: '/templates/p8-cap-table-management.xlsx',
    value: 100000,
    downloads: 2876,
    rating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '4-6 hours',
    tags: ['Cap Table', 'Equity', 'Dilution', 'Waterfall Analysis'],
    isPremium: true,
    category: 'Equity Management',
    fileSize: '15.6 MB',
    isDownloadable: true
  },
  {
    id: 'p8-006',
    title: 'Revenue Recognition & SaaS Metrics Dashboard',
    description: 'Advanced revenue tracking with MRR, ARR, churn analysis, cohort analysis, and ASC 606 compliance',
    type: 'dashboard',
    url: '/tools/p8-revenue-recognition-dashboard',
    value: 150000,
    downloads: 1987,
    rating: 4.6,
    difficulty: 'Expert',
    estimatedTime: '6-8 hours',
    tags: ['Revenue Recognition', 'SaaS Metrics', 'Compliance', 'Analytics'],
    isPremium: true,
    category: 'Financial Analytics',
    isDownloadable: false
  },

  // Legal Documentation
  {
    id: 'p8-007',
    title: 'Investment Agreement Template Library',
    description: 'Complete legal templates for SAFE, convertible notes, Series A-D, with term sheets and closing documents',
    type: 'template',
    url: '/templates/p8-investment-agreement-library.zip',
    value: 250000,
    downloads: 1654,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '8-12 hours',
    tags: ['Legal', 'Investment Agreements', 'SAFE', 'Term Sheets'],
    isPremium: true,
    category: 'Legal Documentation',
    fileSize: '41.2 MB',
    isDownloadable: true
  },
  {
    id: 'p8-008',
    title: 'Corporate Governance & Board Management Kit',
    description: 'Board resolutions, meeting minutes, governance policies, and director & officer insurance templates',
    type: 'template',
    url: '/templates/p8-corporate-governance-kit.zip',
    value: 125000,
    downloads: 2198,
    rating: 4.7,
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    tags: ['Corporate Governance', 'Board Management', 'Policies', 'Resolutions'],
    isPremium: true,
    category: 'Corporate Governance',
    fileSize: '23.9 MB',
    isDownloadable: true
  },
  {
    id: 'p8-009',
    title: 'Employee Equity & ESOP Management System',
    description: 'Complete ESOP documentation with vesting schedules, exercise tracking, and tax optimization strategies',
    type: 'framework',
    url: '/templates/p8-esop-management-system.xlsx',
    value: 100000,
    downloads: 2743,
    rating: 4.5,
    difficulty: 'Advanced',
    estimatedTime: '4-6 hours',
    tags: ['ESOP', 'Employee Equity', 'Vesting', 'Tax Optimization'],
    isPremium: true,
    category: 'Employee Equity',
    fileSize: '18.4 MB',
    isDownloadable: true
  },

  // Market Analysis & Business Intelligence
  {
    id: 'p8-010',
    title: 'Market Research & Competitive Analysis Framework',
    description: 'Comprehensive market sizing methodology with TAM/SAM/SOM analysis and competitive intelligence gathering',
    type: 'framework',
    url: '/templates/p8-market-analysis-framework.pdf',
    value: 75000,
    downloads: 3541,
    rating: 4.6,
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    tags: ['Market Research', 'Competitive Analysis', 'TAM/SAM/SOM'],
    isPremium: false,
    category: 'Market Analysis',
    fileSize: '16.7 MB',
    isDownloadable: true
  },
  {
    id: 'p8-011',
    title: 'Customer Analytics & Segmentation Dashboard',
    description: 'Advanced customer analytics with lifetime value, acquisition cost, and behavioral segmentation models',
    type: 'dashboard',
    url: '/tools/p8-customer-analytics-dashboard',
    value: 125000,
    downloads: 2134,
    rating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '5-6 hours',
    tags: ['Customer Analytics', 'Segmentation', 'LTV', 'CAC'],
    isPremium: true,
    category: 'Customer Intelligence',
    isDownloadable: false
  },
  {
    id: 'p8-012',
    title: 'Product-Market Fit Assessment Tool',
    description: 'Data-driven PMF measurement framework with survey templates, analysis models, and improvement recommendations',
    type: 'tool',
    url: '/tools/p8-pmf-assessment-tool',
    value: 100000,
    downloads: 2876,
    rating: 4.7,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    tags: ['Product-Market Fit', 'Assessment', 'Surveys', 'Analytics'],
    isPremium: true,
    category: 'Product Strategy',
    isDownloadable: false
  },

  // Operations & KPI Management
  {
    id: 'p8-013',
    title: 'Executive KPI Dashboard & Reporting System',
    description: 'Real-time executive dashboard with 50+ KPIs, automated reporting, and board presentation templates',
    type: 'dashboard',
    url: '/tools/p8-executive-kpi-dashboard',
    value: 175000,
    downloads: 1543,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '8-10 hours',
    tags: ['KPIs', 'Executive Dashboard', 'Reporting', 'Analytics'],
    isPremium: true,
    category: 'Executive Reporting',
    isDownloadable: false
  },
  {
    id: 'p8-014',
    title: 'Risk Management & Mitigation Framework',
    description: 'Enterprise risk assessment with risk registers, mitigation strategies, and compliance tracking systems',
    type: 'framework',
    url: '/templates/p8-risk-management-framework.pdf',
    value: 125000,
    downloads: 1876,
    rating: 4.6,
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    tags: ['Risk Management', 'Compliance', 'Mitigation', 'Assessment'],
    isPremium: true,
    category: 'Risk & Compliance',
    fileSize: '22.1 MB',
    isDownloadable: true
  },
  {
    id: 'p8-015',
    title: 'Operational Efficiency & Process Optimization Kit',
    description: 'Process mapping tools, efficiency metrics, automation recommendations, and continuous improvement frameworks',
    type: 'template',
    url: '/templates/p8-operational-efficiency-kit.zip',
    value: 100000,
    downloads: 2456,
    rating: 4.5,
    difficulty: 'Intermediate',
    estimatedTime: '5-7 hours',
    tags: ['Operations', 'Process Optimization', 'Efficiency', 'Automation'],
    isPremium: true,
    category: 'Operational Excellence',
    fileSize: '26.8 MB',
    isDownloadable: true
  },

  // Technology & IP Documentation
  {
    id: 'p8-016',
    title: 'Technical Architecture & IP Documentation System',
    description: 'Complete technical documentation framework with architecture diagrams, IP registers, and patent strategies',
    type: 'framework',
    url: '/templates/p8-technical-architecture-docs.zip',
    value: 150000,
    downloads: 1654,
    rating: 4.8,
    difficulty: 'Expert',
    estimatedTime: '10-12 hours',
    tags: ['Technical Architecture', 'IP Documentation', 'Patents', 'Security'],
    isPremium: true,
    category: 'Technology & IP',
    fileSize: '35.7 MB',
    isDownloadable: true
  },
  {
    id: 'p8-017',
    title: 'Cybersecurity & Data Privacy Compliance Suite',
    description: 'GDPR/CCPA compliance framework with security policies, audit trails, and data breach response protocols',
    type: 'framework',
    url: '/templates/p8-cybersecurity-compliance-suite.pdf',
    value: 125000,
    downloads: 1987,
    rating: 4.7,
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    tags: ['Cybersecurity', 'Data Privacy', 'GDPR', 'Compliance'],
    isPremium: true,
    category: 'Security & Privacy',
    fileSize: '29.3 MB',
    isDownloadable: true
  },

  // Investor Relations & Communications
  {
    id: 'p8-018',
    title: 'Investor Update & Communication Templates',
    description: 'Monthly investor updates, quarterly reports, annual shareholder communications, and crisis communication templates',
    type: 'template',
    url: '/templates/p8-investor-communications.zip',
    value: 100000,
    downloads: 3214,
    rating: 4.8,
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    tags: ['Investor Relations', 'Communications', 'Updates', 'Reports'],
    isPremium: true,
    category: 'Investor Communications',
    fileSize: '19.6 MB',
    isDownloadable: true
  },
  {
    id: 'p8-019',
    title: 'Board Meeting Management System',
    description: 'Complete board meeting toolkit with agenda templates, presentation formats, and decision tracking systems',
    type: 'template',
    url: '/templates/p8-board-meeting-system.zip',
    value: 75000,
    downloads: 2543,
    rating: 4.6,
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    tags: ['Board Meetings', 'Governance', 'Presentations', 'Decision Tracking'],
    isPremium: false,
    category: 'Board Management',
    fileSize: '14.2 MB',
    isDownloadable: true
  },

  // Exit Strategy & M&A Preparation
  {
    id: 'p8-020',
    title: 'M&A Readiness & Exit Strategy Playbook',
    description: 'Complete M&A preparation guide with valuation models, buyer profiling, and negotiation strategies',
    type: 'guide',
    url: '/templates/p8-ma-exit-strategy-playbook.pdf',
    value: 200000,
    downloads: 1321,
    rating: 4.9,
    difficulty: 'Expert',
    estimatedTime: '12-15 hours',
    tags: ['M&A', 'Exit Strategy', 'Valuation', 'Negotiations'],
    isPremium: true,
    category: 'M&A & Exits',
    fileSize: '38.4 MB',
    isDownloadable: true
  }
];

interface P8ResourceHubProps {
  hasAccess?: boolean;
}

const P8ResourceHub: React.FC<P8ResourceHubProps> = ({ hasAccess: hasAccessProp }) => {
  const { user } = useAuth();
  const { hasAccess: hasUserAccess } = useUserProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const hasP8Access = hasAccessProp ?? hasUserAccess('P8');

  const filteredResources = useMemo(() => {
    return P8_DATAROOM_RESOURCES.filter(resource => {
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
      case 'framework': return <Target className="w-4 h-4" />;
      case 'spreadsheet': return <BarChart3 className="w-4 h-4" />;
      case 'dashboard': return <BarChart3 className="w-4 h-4" />;
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Play className="w-4 h-4" />;
      case 'calculator': return <Calculator className="w-4 h-4" />;
      case 'checklist': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'bg-blue-100 text-blue-800';
      case 'tool': return 'bg-green-100 text-green-800';
      case 'framework': return 'bg-orange-100 text-orange-800';
      case 'spreadsheet': return 'bg-purple-100 text-purple-800';
      case 'dashboard': return 'bg-indigo-100 text-indigo-800';
      case 'guide': return 'bg-red-100 text-red-800';
      case 'calculator': return 'bg-yellow-100 text-yellow-800';
      case 'checklist': return 'bg-pink-100 text-pink-800';
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

  const downloadResource = (resource: P8Resource) => {
    if (!hasP8Access) {
      alert('P8 access required to download resources');
      return;
    }
    
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else {
      alert(`Resource ${resource.title} will be available soon!`);
    }
  };

  if (!hasP8Access) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Database className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3">P8: Data Room Mastery</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Access 20 investor-grade data room resources worth ₹25,50,000. Build professional data rooms with 
          security protocols, financial models, and compliance frameworks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
          <div className="p-3 bg-white rounded-lg border border-indigo-100">
            <Database className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Data Room Architecture</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-indigo-100">
            <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Security & Compliance</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-indigo-100">
            <BarChart3 className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Financial Models</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-indigo-100">
            <Crown className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <div className="text-sm font-medium">Investor Grade</div>
          </div>
        </div>
        <a href="/pricing">
          <Button variant="primary" size="lg">
            <Database className="w-5 h-5 mr-2" />
            Unlock Data Room Mastery (₹9,999)
          </Button>
        </a>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-900 to-purple-700 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">P8: Data Room Mastery Resource Hub</h1>
              <p className="text-indigo-200">20 Investor-Grade Resources Worth ₹25,50,000</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{P8_DATAROOM_RESOURCES.length}</div>
                <div className="text-sm">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{P8_DATAROOM_RESOURCES.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}</div>
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
                placeholder="Search data room resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'Data Room Strategy', label: 'Strategy' },
                { id: 'Financial Modeling', label: 'Financial' },
                { id: 'Legal Documentation', label: 'Legal' },
                { id: 'Security & Compliance', label: 'Security' },
                { id: 'M&A & Exits', label: 'M&A' }
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
          { label: 'Total Resources', value: P8_DATAROOM_RESOURCES.length, icon: FileText, color: 'text-blue-600' },
          { label: 'Premium Tools', value: P8_DATAROOM_RESOURCES.filter(r => r.isPremium).length, icon: Lock, color: 'text-purple-600' },
          { label: 'Expert Level', value: P8_DATAROOM_RESOURCES.filter(r => r.difficulty === 'Expert').length, icon: Star, color: 'text-red-600' },
          { label: 'Interactive Tools', value: P8_DATAROOM_RESOURCES.filter(r => r.type === 'tool' || r.type === 'dashboard').length, icon: Zap, color: 'text-green-600' }
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
              P8_DATAROOM_RESOURCES.reduce((acc, resource) => {
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
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P8_DATAROOM_RESOURCES.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(P8_DATAROOM_RESOURCES.reduce((sum, r) => sum + r.rating, 0) / P8_DATAROOM_RESOURCES.length).toFixed(1)}★
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(P8_DATAROOM_RESOURCES.reduce((sum, r) => sum + r.value, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {P8_DATAROOM_RESOURCES.filter(r => r.difficulty === 'Expert').length}
              </div>
              <div className="text-sm text-gray-600">Expert Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default P8ResourceHub;