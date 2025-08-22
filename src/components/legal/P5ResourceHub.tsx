'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Download, 
  FileText, 
  Search, 
  Scale,
  Shield,
  Users,
  Briefcase,
  AlertTriangle,
  Database,
  Globe,
  Gavel,
  Building,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle,
  Calculator,
  ExternalLink,
  Target,
  BookOpen
} from 'lucide-react';

interface LegalResource {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'template' | 'tool' | 'guide' | 'calculator' | 'checklist';
  fileType?: string;
  tags: string[];
  legalArea: string;
  jurisdiction: string;
  isPremium: boolean;
  downloadCount: number;
  rating: number;
  estimatedTime: number;
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
  requiresCustomization: boolean;
  url: string;
  price?: number;
}

interface P5ResourceHubProps {
  hasAccess: boolean;
  onUnlockClick?: () => void;
}

// Real P5 Legal Stack Resources
const P5_LEGAL_RESOURCES: LegalResource[] = [
  // Contract Templates
  {
    id: 'employment-agreement-template',
    name: 'Employment Agreement Template',
    description: 'Comprehensive employment agreement template compliant with Indian labor laws, including probation terms, salary structure, and termination clauses.',
    category: 'Contracts',
    type: 'template',
    fileType: 'DOCX',
    tags: ['employment', 'contract', 'HR', 'labor law'],
    legalArea: 'Employment Law',
    jurisdiction: 'India',
    isPremium: false,
    downloadCount: 2847,
    rating: 4.8,
    estimatedTime: 45,
    complexityLevel: 'Intermediate',
    requiresCustomization: true,
    url: '/templates/p5/employment-agreement.docx'
  },
  {
    id: 'founder-agreement-template',
    name: 'Founder Agreement Template',
    description: 'Detailed founder agreement covering equity distribution, vesting schedules, roles & responsibilities, and exit scenarios.',
    category: 'Contracts',
    type: 'template',
    fileType: 'DOCX',
    tags: ['founders', 'equity', 'vesting', 'partnership'],
    legalArea: 'Corporate Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 1923,
    rating: 4.9,
    estimatedTime: 90,
    complexityLevel: 'Advanced',
    requiresCustomization: true,
    url: '/templates/p5/founder-agreement.docx'
  },
  {
    id: 'nda-template-comprehensive',
    name: 'Comprehensive NDA Template',
    description: 'Multi-purpose Non-Disclosure Agreement covering mutual, unilateral, and employee NDAs with Indian jurisdiction clauses.',
    category: 'Contracts',
    type: 'template',
    fileType: 'DOCX',
    tags: ['NDA', 'confidentiality', 'IP protection', 'employees'],
    legalArea: 'IP & Confidentiality',
    jurisdiction: 'India',
    isPremium: false,
    downloadCount: 4126,
    rating: 4.7,
    estimatedTime: 30,
    complexityLevel: 'Basic',
    requiresCustomization: true,
    url: '/templates/p5/nda-comprehensive.docx'
  },
  {
    id: 'service-agreement-template',
    name: 'Service Agreement Template',
    description: 'Professional service agreement template for B2B contracts, including scope of work, payment terms, and liability clauses.',
    category: 'Contracts',
    type: 'template',
    fileType: 'DOCX',
    tags: ['service agreement', 'B2B', 'SOW', 'payments'],
    legalArea: 'Commercial Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 1654,
    rating: 4.6,
    estimatedTime: 60,
    complexityLevel: 'Intermediate',
    requiresCustomization: true,
    url: '/templates/p5/service-agreement.docx'
  },
  {
    id: 'vendor-agreement-template',
    name: 'Vendor Agreement Template',
    description: 'Complete vendor/supplier agreement with quality standards, delivery terms, and penalty clauses for Indian businesses.',
    category: 'Contracts',
    type: 'template',
    fileType: 'DOCX',
    tags: ['vendor', 'supplier', 'procurement', 'quality'],
    legalArea: 'Commercial Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 987,
    rating: 4.5,
    estimatedTime: 50,
    complexityLevel: 'Intermediate',
    requiresCustomization: true,
    url: '/templates/p5/vendor-agreement.docx'
  },

  // IP & Compliance
  {
    id: 'trademark-application-guide',
    name: 'Trademark Application Guide',
    description: 'Step-by-step guide for filing trademark applications in India, including class selection, documentation, and process timeline.',
    category: 'IP Protection',
    type: 'guide',
    fileType: 'PDF',
    tags: ['trademark', 'IP', 'filing', 'brand protection'],
    legalArea: 'Intellectual Property',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 1432,
    rating: 4.8,
    estimatedTime: 120,
    complexityLevel: 'Intermediate',
    requiresCustomization: false,
    url: '/guides/p5/trademark-application-guide.pdf'
  },
  {
    id: 'data-privacy-compliance-checklist',
    name: 'Data Privacy Compliance Checklist',
    description: '50-point checklist for GDPR and upcoming Indian data protection law compliance, including policy templates.',
    category: 'Compliance',
    type: 'checklist',
    fileType: 'PDF',
    tags: ['data privacy', 'GDPR', 'compliance', 'policies'],
    legalArea: 'Data Protection',
    jurisdiction: 'India/Global',
    isPremium: true,
    downloadCount: 2156,
    rating: 4.9,
    estimatedTime: 90,
    complexityLevel: 'Advanced',
    requiresCustomization: true,
    url: '/checklists/p5/data-privacy-compliance.pdf'
  },
  {
    id: 'copyright-protection-toolkit',
    name: 'Copyright Protection Toolkit',
    description: 'Complete toolkit for protecting copyrights, including registration forms, licensing templates, and infringement notices.',
    category: 'IP Protection',
    type: 'template',
    fileType: 'ZIP',
    tags: ['copyright', 'licensing', 'protection', 'infringement'],
    legalArea: 'Intellectual Property',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 876,
    rating: 4.7,
    estimatedTime: 75,
    complexityLevel: 'Intermediate',
    requiresCustomization: true,
    url: '/templates/p5/copyright-toolkit.zip'
  },

  // Corporate Governance
  {
    id: 'board-resolution-templates',
    name: 'Board Resolution Templates',
    description: '25+ board resolution templates covering common corporate decisions, appointments, and regulatory compliance.',
    category: 'Corporate Governance',
    type: 'template',
    fileType: 'DOCX',
    tags: ['board resolutions', 'corporate governance', 'compliance'],
    legalArea: 'Corporate Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 1543,
    rating: 4.8,
    estimatedTime: 40,
    complexityLevel: 'Intermediate',
    requiresCustomization: true,
    url: '/templates/p5/board-resolutions.docx'
  },
  {
    id: 'shareholder-agreement-template',
    name: 'Shareholder Agreement Template',
    description: 'Comprehensive shareholder agreement with drag-along, tag-along rights, and transfer restrictions.',
    category: 'Corporate Governance',
    type: 'template',
    fileType: 'DOCX',
    tags: ['shareholders', 'equity', 'governance', 'rights'],
    legalArea: 'Corporate Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 1234,
    rating: 4.9,
    estimatedTime: 120,
    complexityLevel: 'Advanced',
    requiresCustomization: true,
    url: '/templates/p5/shareholder-agreement.docx'
  },

  // Legal Tools & Calculators
  {
    id: 'contract-risk-analyzer',
    name: 'Contract Risk Analyzer',
    description: 'AI-powered tool to analyze contracts for potential risks, missing clauses, and compliance issues.',
    category: 'Tools',
    type: 'tool',
    tags: ['AI', 'contract analysis', 'risk assessment', 'due diligence'],
    legalArea: 'Contract Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 2987,
    rating: 4.8,
    estimatedTime: 20,
    complexityLevel: 'Basic',
    requiresCustomization: false,
    url: '/tools/contract-risk-analyzer'
  },
  {
    id: 'legal-cost-calculator',
    name: 'Legal Cost Calculator',
    description: 'Calculate estimated legal costs for incorporation, contracts, IP filing, and litigation in India.',
    category: 'Tools',
    type: 'calculator',
    tags: ['costs', 'budgeting', 'legal fees', 'planning'],
    legalArea: 'General',
    jurisdiction: 'India',
    isPremium: false,
    downloadCount: 3456,
    rating: 4.6,
    estimatedTime: 15,
    complexityLevel: 'Basic',
    requiresCustomization: false,
    url: '/tools/legal-cost-calculator'
  },
  {
    id: 'compliance-tracker',
    name: 'Compliance Tracker Tool',
    description: 'Interactive tool to track various compliance requirements, deadlines, and filing schedules.',
    category: 'Tools',
    type: 'tool',
    tags: ['compliance', 'tracking', 'deadlines', 'filing'],
    legalArea: 'Regulatory Compliance',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 1876,
    rating: 4.7,
    estimatedTime: 30,
    complexityLevel: 'Intermediate',
    requiresCustomization: false,
    url: '/tools/compliance-tracker'
  },

  // Dispute Resolution
  {
    id: 'legal-notice-templates',
    name: 'Legal Notice Templates',
    description: '15+ legal notice templates for various disputes including breach of contract, payment defaults, and IP infringement.',
    category: 'Dispute Resolution',
    type: 'template',
    fileType: 'DOCX',
    tags: ['legal notice', 'disputes', 'breach', 'infringement'],
    legalArea: 'Litigation',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 2134,
    rating: 4.8,
    estimatedTime: 35,
    complexityLevel: 'Intermediate',
    requiresCustomization: true,
    url: '/templates/p5/legal-notices.docx'
  },
  {
    id: 'arbitration-agreement-template',
    name: 'Arbitration Agreement Template',
    description: 'Standard arbitration agreement template compliant with Indian Arbitration Act with seat and venue clauses.',
    category: 'Dispute Resolution',
    type: 'template',
    fileType: 'DOCX',
    tags: ['arbitration', 'dispute resolution', 'ADR', 'mediation'],
    legalArea: 'Alternative Dispute Resolution',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 876,
    rating: 4.9,
    estimatedTime: 45,
    complexityLevel: 'Advanced',
    requiresCustomization: true,
    url: '/templates/p5/arbitration-agreement.docx'
  },

  // Regulatory & Tax
  {
    id: 'gst-compliance-guide',
    name: 'GST Compliance Guide',
    description: 'Complete guide to GST compliance including registration, returns filing, and input tax credit management.',
    category: 'Tax & Regulatory',
    type: 'guide',
    fileType: 'PDF',
    tags: ['GST', 'tax', 'compliance', 'returns'],
    legalArea: 'Tax Law',
    jurisdiction: 'India',
    isPremium: true,
    downloadCount: 3245,
    rating: 4.7,
    estimatedTime: 150,
    complexityLevel: 'Intermediate',
    requiresCustomization: false,
    url: '/guides/p5/gst-compliance-guide.pdf'
  }
];

export const P5ResourceHub: React.FC<P5ResourceHubProps> = ({ hasAccess, onUnlockClick }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'tools' | 'guides'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLegalArea, setSelectedLegalArea] = useState<string>('all');

  // Categories with counts
  const categories = [
    { id: 'all', name: 'All Resources', icon: <Database className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.length },
    { id: 'Contracts', name: 'Contracts', icon: <FileText className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'Contracts').length },
    { id: 'IP Protection', name: 'IP Protection', icon: <Shield className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'IP Protection').length },
    { id: 'Corporate Governance', name: 'Corporate Governance', icon: <Building className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'Corporate Governance').length },
    { id: 'Compliance', name: 'Compliance', icon: <ShieldCheck className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'Compliance').length },
    { id: 'Tools', name: 'Tools', icon: <Calculator className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'Tools').length },
    { id: 'Dispute Resolution', name: 'Dispute Resolution', icon: <Gavel className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'Dispute Resolution').length },
    { id: 'Tax & Regulatory', name: 'Tax & Regulatory', icon: <Scale className="w-4 h-4" />, count: P5_LEGAL_RESOURCES.filter(r => r.category === 'Tax & Regulatory').length }
  ];

  const legalAreas = [
    'all', 
    'Employment Law', 
    'Corporate Law', 
    'IP & Confidentiality', 
    'Commercial Law', 
    'Intellectual Property', 
    'Data Protection',
    'Contract Law',
    'Regulatory Compliance',
    'Litigation',
    'Alternative Dispute Resolution',
    'Tax Law'
  ];

  const filteredResources = useMemo(() => {
    return P5_LEGAL_RESOURCES.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesLegalArea = selectedLegalArea === 'all' || resource.legalArea === selectedLegalArea;
      const matchesTab = activeTab === 'templates' ? ['template', 'checklist'].includes(resource.type) :
                        activeTab === 'tools' ? ['tool', 'calculator'].includes(resource.type) :
                        resource.type === 'guide';
      const hasAccess_ = hasAccess || !resource.isPremium;
      
      return matchesSearch && matchesCategory && matchesLegalArea && matchesTab && hasAccess_;
    });
  }, [searchQuery, selectedCategory, selectedLegalArea, activeTab, hasAccess]);

  const handleResourceAccess = (resource: LegalResource) => {
    if (!hasAccess && resource.isPremium) {
      if (onUnlockClick) {
        onUnlockClick();
      } else {
        window.open('/pricing?product=P5', '_blank');
      }
      return;
    }
    
    // Track download/usage
    if (resource.type === 'tool' || resource.type === 'calculator') {
      window.open(resource.url, '_blank');
    } else {
      // Trigger download
      const link = document.createElement('a');
      link.href = resource.url;
      link.download = resource.name;
      link.click();
    }
  };

  const getResourceIcon = (type: string) => {
    const icons = {
      template: <FileText className="w-5 h-5" />,
      tool: <Globe className="w-5 h-5" />,
      calculator: <Calculator className="w-5 h-5" />,
      guide: <BookOpen className="w-5 h-5" />,
      checklist: <CheckCircle className="w-5 h-5" />
    };
    return icons[type as keyof typeof icons] || <FileText className="w-5 h-5" />;
  };

  const getComplexityColor = (level: string) => {
    const colors = {
      'Basic': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!hasAccess) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Scale className="w-16 h-16 mx-auto text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Legal Resources</h3>
            <p className="text-gray-600 mb-4">
              Access 16+ legal templates, tools, and guides worth ₹2.5 lakhs
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Templates</div>
                <div className="text-xs text-gray-600">10+ Legal Docs</div>
              </div>
              <div className="text-center">
                <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Tools</div>
                <div className="text-xs text-gray-600">3 AI-Powered</div>
              </div>
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Guides</div>
                <div className="text-xs text-gray-600">2 Comprehensive</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Compliance</div>
                <div className="text-xs text-gray-600">Full Coverage</div>
              </div>
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={onUnlockClick || (() => window.open('/pricing?product=P5', '_blank'))}
            >
              Upgrade to P5 - ₹7,999
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with Stats */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Scale className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">P5 Legal Resource Hub</h1>
              <p className="text-gray-600">Complete legal framework worth ₹2.5 lakhs</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{P5_LEGAL_RESOURCES.length}</div>
              <div className="text-sm text-gray-600">Legal Resources</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{P5_LEGAL_RESOURCES.filter(r => r.type === 'template').length}</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{P5_LEGAL_RESOURCES.filter(r => r.type === 'tool' || r.type === 'calculator').length}</div>
              <div className="text-sm text-gray-600">Tools</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">₹2.5L</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured Legal Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => window.open('/tools/contract-risk-analyzer', '_blank')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-6 h-6 text-green-600" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Contract Risk Analyzer</h3>
              <p className="text-sm text-gray-600">AI-powered contract analysis</p>
            </div>

            <div 
              onClick={() => window.open('/tools/legal-cost-calculator', '_blank')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Legal Cost Calculator</h3>
              <p className="text-sm text-gray-600">Estimate legal expenses</p>
            </div>

            <div 
              onClick={() => window.open('/tools/compliance-tracker', '_blank')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Compliance Tracker</h3>
              <p className="text-sm text-gray-600">Track deadlines & filings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search legal resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <option key={category.id} value={category.id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
        <select
          value={selectedLegalArea}
          onChange={(e) => setSelectedLegalArea(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {legalAreas.map(area => (
            <option key={area} value={area}>
              {area === 'all' ? 'All Legal Areas' : area}
            </option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'templates', label: 'Templates & Checklists', count: P5_LEGAL_RESOURCES.filter(r => ['template', 'checklist'].includes(r.type)).length },
          { id: 'tools', label: 'Legal Tools', count: P5_LEGAL_RESOURCES.filter(r => ['tool', 'calculator'].includes(r.type)).length },
          { id: 'guides', label: 'Legal Guides', count: P5_LEGAL_RESOURCES.filter(r => r.type === 'guide').length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors font-medium ${
              activeTab === tab.id
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                </div>
                {resource.isPremium && (
                  <Badge className="bg-gold-100 text-gold-800">Premium</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant="outline" className="bg-red-50 text-red-800">
                  {resource.legalArea}
                </Badge>
                <Badge variant="outline" className={getComplexityColor(resource.complexityLevel)}>
                  {resource.complexityLevel}
                </Badge>
                {resource.fileType && (
                  <Badge variant="outline">
                    {resource.fileType}
                  </Badge>
                )}
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {resource.estimatedTime}min
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Download className="w-4 h-4" />
                  <span>{resource.downloadCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(resource.rating) 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </div>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                </div>
              </div>

              <div className="flex gap-1 mb-3 flex-wrap">
                {resource.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {resource.requiresCustomization && (
                <div className="flex items-center gap-1 mb-3 text-xs text-amber-600">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Requires customization</span>
                </div>
              )}

              <Button
                onClick={() => handleResourceAccess(resource)}
                className={`w-full ${
                  resource.type === 'tool' || resource.type === 'calculator'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
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

      {/* Legal Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Coverage Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1, 5).map((category) => (
              <div key={category.id} className="text-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-center mb-2">
                  {category.icon}
                </div>
                <h4 className="font-medium text-sm">{category.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{category.count} resources</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};