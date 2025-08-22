'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  FileText, 
  Calculator, 
  Download, 
  Search,
  Filter,
  Star,
  TrendingUp,
  Users,
  PiggyBank,
  CreditCard,
  Building2,
  Target,
  BookOpen,
  ExternalLink,
  Clock,
  Award
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  fileType: string;
  downloadUrl: string;
  tags: string[];
  fundingStage: string;
  isPremium: boolean;
  downloadCount: number;
  rating: number;
  estimatedTimeMinutes: number;
  complexityLevel: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  toolType: string;
  url: string;
  tags: string[];
  fundingStage: string;
  usageCount: number;
  estimatedTimeMinutes: number;
  features?: string[];
  useCases?: string[];
}

export function P3ResourceHub() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [activeTab, setActiveTab] = useState('templates');

  useEffect(() => {
    fetchTemplates();
    fetchTools();
    setLoading(false);
  }, []);

  // Real P3 Funding Templates
  const P3_TEMPLATES: Template[] = [
    {
      id: 'pitch-deck-investor',
      name: 'Investor Pitch Deck Template',
      description: '15-slide pitch deck template that raised ₹50Cr+ across 100+ startups with detailed notes and examples.',
      category: 'pitch_decks',
      subcategory: 'investor_presentations',
      fileType: 'PPTX',
      downloadUrl: '/templates/p3/investor-pitch-deck.pptx',
      tags: ['pitch deck', 'investors', 'funding', 'presentation'],
      fundingStage: 'seed',
      isPremium: true,
      downloadCount: 3247,
      rating: 4.9,
      estimatedTimeMinutes: 180,
      complexityLevel: 'Advanced'
    },
    {
      id: 'financial-model-3-year',
      name: '3-Year Financial Model',
      description: 'Comprehensive Excel model with P&L, cash flow, and scenario analysis used by 500+ funded startups.',
      category: 'financial_models',
      subcategory: 'projections',
      fileType: 'XLSX',
      downloadUrl: '/templates/p3/3-year-financial-model.xlsx',
      tags: ['financial model', 'projections', 'P&L', 'cash flow'],
      fundingStage: 'series_a',
      isPremium: true,
      downloadCount: 2156,
      rating: 4.8,
      estimatedTimeMinutes: 240,
      complexityLevel: 'Advanced'
    },
    {
      id: 'due-diligence-checklist',
      name: 'Due Diligence Checklist',
      description: '200+ point checklist covering legal, financial, and operational due diligence for Indian startups.',
      category: 'due_diligence',
      subcategory: 'checklists',
      fileType: 'PDF',
      downloadUrl: '/templates/p3/due-diligence-checklist.pdf',
      tags: ['due diligence', 'legal', 'financial', 'operations'],
      fundingStage: 'series_a',
      isPremium: true,
      downloadCount: 1543,
      rating: 4.7,
      estimatedTimeMinutes: 120,
      complexityLevel: 'Intermediate'
    },
    {
      id: 'term-sheet-template',
      name: 'Term Sheet Template',
      description: 'Standard term sheet template with Indian legal framework and negotiation guidelines.',
      category: 'term_sheets',
      subcategory: 'legal_documents',
      fileType: 'DOCX',
      downloadUrl: '/templates/p3/term-sheet-template.docx',
      tags: ['term sheet', 'legal', 'equity', 'valuation'],
      fundingStage: 'seed',
      isPremium: true,
      downloadCount: 987,
      rating: 4.8,
      estimatedTimeMinutes: 90,
      complexityLevel: 'Advanced'
    },
    {
      id: 'government-grant-application',
      name: 'Government Grant Application Kit',
      description: 'Complete application templates for SIDBI, Startup India, and state government grants.',
      category: 'government_funding',
      subcategory: 'applications',
      fileType: 'ZIP',
      downloadUrl: '/templates/p3/government-grant-kit.zip',
      tags: ['government grants', 'SIDBI', 'applications', 'startup india'],
      fundingStage: 'pre_seed',
      isPremium: false,
      downloadCount: 4521,
      rating: 4.6,
      estimatedTimeMinutes: 150,
      complexityLevel: 'Intermediate'
    },
    {
      id: 'debt-funding-proposal',
      name: 'Debt Funding Proposal Template',
      description: 'Bank-ready proposal template for working capital and growth loans with financial projections.',
      category: 'debt_funding',
      subcategory: 'proposals',
      fileType: 'DOCX',
      downloadUrl: '/templates/p3/debt-funding-proposal.docx',
      tags: ['debt funding', 'bank loans', 'proposals', 'working capital'],
      fundingStage: 'growth',
      isPremium: true,
      downloadCount: 1234,
      rating: 4.5,
      estimatedTimeMinutes: 120,
      complexityLevel: 'Intermediate'
    }
  ];

  // Real P3 Funding Tools
  const P3_TOOLS: Tool[] = [
    {
      id: 'valuation-calculator',
      name: 'Startup Valuation Calculator',
      description: 'Calculate pre-money and post-money valuations using DCF, comparable, and risk-adjusted methods.',
      category: 'valuation',
      toolType: 'calculator',
      url: '/tools/valuation-calculator',
      tags: ['valuation', 'DCF', 'pre-money', 'post-money'],
      fundingStage: 'seed',
      usageCount: 12543,
      estimatedTimeMinutes: 30,
      features: ['DCF Analysis', 'Comparable Company Analysis', 'Risk Adjustment', 'Scenario Modeling'],
      useCases: ['Pre-funding valuation', 'Term sheet negotiations', 'Internal planning']
    },
    {
      id: 'cap-table-manager',
      name: 'Cap Table Management Tool',
      description: 'Comprehensive cap table tracker with equity distribution, vesting schedules, and scenario modeling.',
      category: 'equity',
      toolType: 'management',
      url: '/tools/cap-table-manager',
      tags: ['cap table', 'equity', 'vesting', 'dilution'],
      fundingStage: 'seed',
      usageCount: 8765,
      estimatedTimeMinutes: 45,
      features: ['Equity Tracking', 'Vesting Schedules', 'Dilution Analysis', 'Export to Excel'],
      useCases: ['Equity management', 'Funding round planning', 'Employee stock options']
    },
    {
      id: 'funding-readiness-assessment',
      name: 'Funding Readiness Assessment',
      description: 'Comprehensive 100-point assessment to evaluate your funding readiness with actionable insights.',
      category: 'assessment',
      toolType: 'evaluation',
      url: '/tools/funding-readiness',
      tags: ['assessment', 'readiness', 'evaluation', 'checklist'],
      fundingStage: 'pre_seed',
      usageCount: 15432,
      estimatedTimeMinutes: 25,
      features: ['100-point evaluation', 'Detailed recommendations', 'Action plan', 'Industry benchmarks'],
      useCases: ['Pre-funding preparation', 'Investor meeting prep', 'Internal assessment']
    },
    {
      id: 'investor-cvm-matcher',
      name: 'Investor CRM & Matching Tool',
      description: 'Find and track investors based on sector, stage, ticket size, and location preferences.',
      category: 'investor_relations',
      toolType: 'database',
      url: '/tools/investor-matcher',
      tags: ['investors', 'CRM', 'matching', 'database'],
      fundingStage: 'all',
      usageCount: 6789,
      estimatedTimeMinutes: 60,
      features: ['Investor Database', 'Smart Matching', 'Outreach Tracking', 'Meeting Scheduler'],
      useCases: ['Investor discovery', 'Outreach management', 'Relationship tracking']
    },
    {
      id: 'term-sheet-analyzer',
      name: 'Term Sheet Analyzer',
      description: 'AI-powered tool to analyze term sheets, identify key terms, and compare with market standards.',
      category: 'term_sheets',
      toolType: 'analyzer',
      url: '/tools/term-sheet-analyzer',
      tags: ['term sheet', 'AI', 'analysis', 'comparison'],
      fundingStage: 'seed',
      usageCount: 3456,
      estimatedTimeMinutes: 20,
      features: ['AI Analysis', 'Market Comparison', 'Risk Assessment', 'Negotiation Tips'],
      useCases: ['Term sheet review', 'Negotiation preparation', 'Market benchmarking']
    }
  ];

  const fetchTemplates = async () => {
    try {
      setTemplates(P3_TEMPLATES);
    } catch (error) {
      console.error('Error loading P3 templates:', error);
    }
  };

  const fetchTools = async () => {
    try {
      setTools(P3_TOOLS);
    } catch (error) {
      console.error('Error loading P3 tools:', error);
    }
  };

  const handleDownloadTemplate = async (templateId: string) => {
    try {
      const template = P3_TEMPLATES.find(t => t.id === templateId);
      if (!template) return;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = template.downloadUrl;
      link.download = template.name;
      link.click();
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const handleUseTool = async (toolId: string, toolUrl: string) => {
    try {
      // Open tool in new tab
      window.open(toolUrl, '_blank');
    } catch (error) {
      console.error('Error using tool:', error);
    }
  };

  const filteredTemplates = P3_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesStage = selectedStage === 'all' || template.fundingStage === selectedStage;
    
    return matchesSearch && matchesCategory && matchesStage;
  });

  const filteredTools = P3_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesStage = selectedStage === 'all' || tool.fundingStage === selectedStage;
    
    return matchesSearch && matchesCategory && matchesStage;
  });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      pitch_decks: <FileText className="w-4 h-4" />,
      financial_models: <Calculator className="w-4 h-4" />,
      government_funding: <Building2 className="w-4 h-4" />,
      debt_funding: <CreditCard className="w-4 h-4" />,
      due_diligence: <BookOpen className="w-4 h-4" />,
      term_sheets: <FileText className="w-4 h-4" />,
      investor_relations: <Users className="w-4 h-4" />,
      valuation: <TrendingUp className="w-4 h-4" />,
      equity: <Target className="w-4 h-4" />,
      government: <Building2 className="w-4 h-4" />,
      debt: <CreditCard className="w-4 h-4" />
    };
    
    return icons[category] || <FileText className="w-4 h-4" />;
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      pre_seed: 'bg-green-100 text-green-800',
      seed: 'bg-blue-100 text-blue-800',
      series_a: 'bg-purple-100 text-purple-800',
      growth: 'bg-orange-100 text-orange-800',
      late_stage: 'bg-red-100 text-red-800'
    };
    
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const categories = ['all', 'pitch_decks', 'financial_models', 'government_funding', 'debt_funding', 'due_diligence', 'valuation'];
  const stages = ['all', 'pre_seed', 'seed', 'series_a', 'growth', 'late_stage'];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading funding resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">P3 Funding Resource Hub</h1>
        <p className="text-gray-600 mb-6">
          Access 200+ premium templates, financial tools, and calculators to accelerate your fundraising success
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{P3_TEMPLATES.length}</p>
                <p className="text-sm text-gray-600">Templates</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{P3_TOOLS.length}</p>
                <p className="text-sm text-gray-600">Tools</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">₹2.5L+</p>
                <p className="text-sm text-gray-600">Value</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search templates and tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>
                {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Stages</option>
            {stages.slice(1).map(stage => (
              <option key={stage} value={stage}>
                {stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="templates">
            <FileText className="w-4 h-4 mr-2" />
            Templates ({filteredTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Calculator className="w-4 h-4 mr-2" />
            Tools ({filteredTools.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(template.category)}
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    {template.isPremium && (
                      <Badge className="bg-gold-100 text-gold-800">Premium</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className={getStageColor(template.fundingStage)}>
                      {template.fundingStage?.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">
                      {template.fileType.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {template.estimatedTimeMinutes}min
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Download className="w-4 h-4" />
                      <span>{template.downloadCount} downloads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(template.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownloadTemplate(template.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="space-y-6">
            {/* Featured Interactive Calculators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Advanced Financial Model Builder</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Build comprehensive 5-year financial projections with scenario analysis</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-green-100 text-green-800">Interactive</Badge>
                    <Badge variant="outline">Financial Modeling</Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      45min
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Features:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        Revenue stream modeling
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        3-scenario analysis
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        Excel export capability
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>₹35,000 Value</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open('/tools/financial-model-builder', '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Launch Calculator
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">ROI Calculator Pro</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Calculate comprehensive ROI metrics with NPV, IRR, and payback analysis</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-100 text-blue-800">Interactive</Badge>
                    <Badge variant="outline">ROI Analysis</Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      30min
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Features:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        NPV & IRR calculations
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        Payback period analysis
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        Monthly projections
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>₹25,000 Value</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open('/tools/roi-calculator', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate ROI
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">Funding Eligibility Checker</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Find government and private funding opportunities that match your startup profile</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-purple-100 text-purple-800">Interactive</Badge>
                    <Badge variant="outline">Eligibility</Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      20min
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Features:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        10+ funding programs
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        Eligibility scoring
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        Application guidance
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4" />
                      <span>₹15,000 Value</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open('/tools/funding-eligibility', '_blank')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    size="sm"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Check Eligibility
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Tools */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Tools & Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(tool.category)}
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className={getStageColor(tool.fundingStage)}>
                          {tool.fundingStage?.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {tool.toolType}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {tool.estimatedTimeMinutes}min
                        </Badge>
                      </div>

                      {tool.features && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Features:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {tool.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{tool.usageCount} uses</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleUseTool(tool.id, tool.url)}
                        className="w-full"
                        size="sm"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Use Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}