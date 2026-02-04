'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  FileText, 
  Calculator, 
  Download,
  ExternalLink,
  Search,
  VideoIcon,
  BookOpen,
  CheckCircle,
  Target,
  Users,
  TrendingUp,
  Globe,
  Briefcase,
  Clock,
  Star
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'template' | 'tool' | 'guide' | 'video' | 'calculator' | 'checklist';
  url: string;
  description: string;
  tags: string[];
  category: string;
  isPremium: boolean;
  fileType?: string;
  estimatedTime?: number;
}

interface P1ResourceLibraryProps {
  hasAccess: boolean;
}

// Real P1 30-Day Journey Resources
const P1_RESOURCES: Resource[] = [
  // Templates
  {
    id: 'business-model-canvas',
    title: 'Business Model Canvas Template',
    type: 'template',
    category: 'Planning',
    url: '/templates/business-model-canvas.pdf',
    description: 'Professional Business Model Canvas template with Indian startup examples and guidance notes.',
    tags: ['business model', 'planning', 'strategy', 'canvas'],
    isPremium: false,
    fileType: 'PDF',
    estimatedTime: 45
  },
  {
    id: 'mvp-development-checklist',
    title: 'MVP Development Checklist',
    type: 'checklist',
    category: 'Product',
    url: '/templates/mvp-checklist.pdf',
    description: '30-point checklist for building your Minimum Viable Product with validation framework.',
    tags: ['MVP', 'product', 'development', 'checklist'],
    isPremium: true,
    fileType: 'PDF',
    estimatedTime: 30
  },
  {
    id: 'customer-interview-guide',
    title: 'Customer Interview Guide',
    type: 'template',
    category: 'Research',
    url: '/templates/customer-interview-guide.pdf',
    description: '50+ validated questions for customer discovery interviews with analysis framework.',
    tags: ['customer research', 'interviews', 'validation', 'discovery'],
    isPremium: true,
    fileType: 'PDF',
    estimatedTime: 60
  },
  {
    id: 'pitch-deck-template',
    title: 'Investor Pitch Deck Template',
    type: 'template',
    category: 'Funding',
    url: '/templates/pitch-deck-template.pptx',
    description: '15-slide pitch deck template used by successful Indian startups to raise ₹1Cr+ funding.',
    tags: ['pitch deck', 'funding', 'investors', 'presentation'],
    isPremium: true,
    fileType: 'PPTX',
    estimatedTime: 120
  },
  {
    id: 'financial-projection-template',
    title: 'Financial Projection Template',
    type: 'template',
    category: 'Finance',
    url: '/templates/financial-projections.xlsx',
    description: '3-year financial projection template with Indian tax calculations and funding scenarios.',
    tags: ['financial planning', 'projections', 'revenue', 'costs'],
    isPremium: true,
    fileType: 'XLSX',
    estimatedTime: 90
  },
  {
    id: 'market-analysis-framework',
    title: 'Market Analysis Framework',
    type: 'template',
    category: 'Research',
    url: '/templates/market-analysis-framework.pdf',
    description: 'Complete framework for TAM, SAM, SOM analysis with Indian market data sources.',
    tags: ['market research', 'TAM', 'SAM', 'analysis'],
    isPremium: true,
    fileType: 'PDF',
    estimatedTime: 75
  },
  {
    id: 'legal-documents-pack',
    title: 'Startup Legal Documents Pack',
    type: 'template',
    category: 'Legal',
    url: '/templates/legal-documents-pack.zip',
    description: 'Essential legal templates: NDA, Employment Agreement, Founder Agreement, Terms of Service.',
    tags: ['legal', 'contracts', 'agreements', 'compliance'],
    isPremium: true,
    fileType: 'ZIP',
    estimatedTime: 60
  },

  // Tools & Calculators
  {
    id: 'startup-name-generator',
    title: 'AI Startup Name Generator',
    type: 'tool',
    category: 'Branding',
    url: '/tools/name-generator',
    description: 'AI-powered tool to generate unique startup names with domain availability check.',
    tags: ['naming', 'branding', 'AI', 'domains'],
    isPremium: false,
    estimatedTime: 15
  },
  {
    id: 'incorporation-cost-calculator',
    title: 'Incorporation Cost Calculator',
    type: 'calculator',
    category: 'Legal',
    url: '/tools/incorporation-calculator',
    description: 'Calculate exact incorporation costs for different business structures in India.',
    tags: ['incorporation', 'legal', 'costs', 'calculator'],
    isPremium: false,
    estimatedTime: 10
  },
  {
    id: 'competitor-analysis-tool',
    title: 'Competitor Analysis Tool',
    type: 'tool',
    category: 'Research',
    url: '/tools/competitor-analysis',
    description: 'Interactive tool to analyze competitors with pricing, features, and market positioning.',
    tags: ['competition', 'analysis', 'research', 'positioning'],
    isPremium: true,
    estimatedTime: 45
  },
  {
    id: 'unit-economics-calculator',
    title: 'Unit Economics Calculator',
    type: 'calculator',
    category: 'Finance',
    url: '/tools/unit-economics-calculator',
    description: 'Calculate CAC, LTV, churn rate, and unit economics for your startup.',
    tags: ['unit economics', 'CAC', 'LTV', 'metrics'],
    isPremium: true,
    estimatedTime: 30
  },

  // Guides
  {
    id: 'startup-legal-guide',
    title: 'Complete Startup Legal Guide',
    type: 'guide',
    category: 'Legal',
    url: '/guides/startup-legal-guide.pdf',
    description: '50-page comprehensive guide covering incorporation, contracts, IP, and compliance.',
    tags: ['legal', 'incorporation', 'contracts', 'IP'],
    isPremium: true,
    fileType: 'PDF',
    estimatedTime: 180
  },
  {
    id: 'digital-marketing-playbook',
    title: 'Digital Marketing Playbook',
    type: 'guide',
    category: 'Marketing',
    url: '/guides/digital-marketing-playbook.pdf',
    description: 'Step-by-step playbook for startup digital marketing with ₹10K-₹1L budget strategies.',
    tags: ['marketing', 'digital', 'social media', 'SEO'],
    isPremium: true,
    fileType: 'PDF',
    estimatedTime: 120
  },
  {
    id: 'fundraising-strategy-guide',
    title: 'Fundraising Strategy Guide',
    type: 'guide',
    category: 'Funding',
    url: '/guides/fundraising-strategy.pdf',
    description: 'Complete guide to raising funding in India from angels to VCs with term sheet analysis.',
    tags: ['fundraising', 'investors', 'strategy', 'term sheets'],
    isPremium: true,
    fileType: 'PDF',
    estimatedTime: 150
  },

  // Videos
  {
    id: 'mvp-development-masterclass',
    title: 'MVP Development Masterclass',
    type: 'video',
    category: 'Product',
    url: '/videos/mvp-masterclass',
    description: '2-hour masterclass on building MVPs with real startup examples and code walkthrough.',
    tags: ['MVP', 'development', 'product', 'masterclass'],
    isPremium: true,
    estimatedTime: 120
  },
  {
    id: 'customer-validation-workshop',
    title: 'Customer Validation Workshop',
    type: 'video',
    category: 'Research',
    url: '/videos/customer-validation',
    description: '90-minute workshop on validating your startup idea with real customer feedback.',
    tags: ['validation', 'customer research', 'workshop', 'feedback'],
    isPremium: true,
    estimatedTime: 90
  },
  {
    id: 'pitch-deck-review-session',
    title: 'Pitch Deck Review Session',
    type: 'video',
    category: 'Funding',
    url: '/videos/pitch-deck-review',
    description: 'Live review of 5 successful pitch decks with expert commentary and improvement tips.',
    tags: ['pitch deck', 'review', 'funding', 'tips'],
    isPremium: true,
    estimatedTime: 75
  }
];

export function P1ResourceLibrary({ hasAccess }: P1ResourceLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = ['all', 'Planning', 'Product', 'Research', 'Funding', 'Finance', 'Legal', 'Branding', 'Marketing'];
  const types = ['all', 'template', 'tool', 'calculator', 'guide', 'video', 'checklist'];

  const filteredResources = useMemo(() => {
    return P1_RESOURCES.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const hasAccess_ = hasAccess || !resource.isPremium;
      
      return matchesSearch && matchesCategory && matchesType && hasAccess_;
    });
  }, [searchTerm, selectedCategory, selectedType, hasAccess]);

  const handleResourceAccess = (resource: Resource) => {
    if (!hasAccess && resource.isPremium) {
      // Redirect to purchase page
      window.open('/pricing?product=P1', '_blank');
      return;
    }
    
    // Track download/usage
    if (resource.type === 'tool' || resource.type === 'calculator') {
      window.open(resource.url, '_blank');
    } else {
      // Trigger download
      const link = document.createElement('a');
      link.href = resource.url;
      link.download = resource.title;
      link.click();
    }
  };

  const getResourceIcon = (type: string) => {
    const icons = {
      template: <FileText className="w-5 h-5" />,
      tool: <Globe className="w-5 h-5" />,
      calculator: <Calculator className="w-5 h-5" />,
      guide: <BookOpen className="w-5 h-5" />,
      video: <VideoIcon className="w-5 h-5" />,
      checklist: <CheckCircle className="w-5 h-5" />
    };
    return icons[type as keyof typeof icons] || <FileText className="w-5 h-5" />;
  };

  if (!hasAccess) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Target className="w-16 h-16 mx-auto text-orange-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Resources Available</h3>
            <p className="text-gray-600 mb-4">
              Access 15+ premium templates, tools, and guides worth ₹75,000
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Templates</div>
                <div className="text-xs text-gray-600">7 Premium</div>
              </div>
              <div className="text-center">
                <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Tools</div>
                <div className="text-xs text-gray-600">4 Interactive</div>
              </div>
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Guides</div>
                <div className="text-xs text-gray-600">3 Detailed</div>
              </div>
              <div className="text-center">
                <VideoIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Videos</div>
                <div className="text-xs text-gray-600">3 Masterclasses</div>
              </div>
            </div>
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => window.open('/pricing?product=P1', '_blank')}
            >
              Upgrade to P1 - ₹4,999
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">P1 Resource Library</h1>
              <p className="text-gray-600">Complete 30-Day Journey resources worth ₹75,000</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{P1_RESOURCES.length}</div>
              <div className="text-sm text-gray-600">Total Resources</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{P1_RESOURCES.filter(r => r.type === 'template').length}</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{P1_RESOURCES.filter(r => r.type === 'tool' || r.type === 'calculator').length}</div>
              <div className="text-sm text-gray-600">Tools</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">₹75K</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Quick Access Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Quick Access Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => window.open('/tools/name-generator', '_blank')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-6 h-6 text-green-600" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">AI Name Generator</h3>
              <p className="text-sm text-gray-600">Generate unique startup names</p>
            </div>

            <div 
              onClick={() => window.open('/tools/incorporation-calculator', '_blank')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Incorporation Calculator</h3>
              <p className="text-sm text-gray-600">Calculate incorporation costs</p>
            </div>

            <div 
              onClick={() => window.open('/tools/unit-economics-calculator', '_blank')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Unit Economics</h3>
              <p className="text-sm text-gray-600">Calculate CAC, LTV & more</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search resources, templates, tools..."
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
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
                {resource.isPremium && (
                  <Badge className="bg-gold-100 text-gold-800">Premium</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-800">
                  {resource.category}
                </Badge>
                {resource.fileType && (
                  <Badge variant="outline">
                    {resource.fileType}
                  </Badge>
                )}
                {resource.estimatedTime && (
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {resource.estimatedTime}min
                  </Badge>
                )}
              </div>
              

              <div className="flex gap-2 mb-3">
                {resource.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                onClick={() => handleResourceAccess(resource)}
                className={`w-full ${
                  resource.type === 'tool' || resource.type === 'calculator'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                size="sm"
              >
                {resource.type === 'tool' || resource.type === 'calculator' ? (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Use Tool
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Resource Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{P1_RESOURCES.length}</div>
              <div className="text-sm text-gray-600">Resources</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{P1_RESOURCES.filter(r => r.isPremium).length}</div>
              <div className="text-sm text-gray-600">Premium Resources</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Access</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}