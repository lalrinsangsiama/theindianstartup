'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { TabsContent } from '@/components/ui/Tabs';
import { TabsList } from '@/components/ui/Tabs';
import { TabsTrigger } from '@/components/ui/Tabs';
import { Alert } from '@/components/ui/Alert';
import { Skeleton } from '@/components/ui/Skeleton';
import { P1ResourceLibrary } from '@/components/resources/P1ResourceLibrary';
import { P4ResourceLibrary } from '@/components/resources/P4ResourceLibrary';
import { P9ResourceLibrary } from '@/components/resources/P9ResourceLibrary';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search,
  BookOpen,
  Calculator,
  Briefcase,
  Scale,
  CreditCard,
  Users,
  Lightbulb,
  TrendingUp,
  Shield,
  Star,
  Filter,
  Package,
  Loader2,
  ShoppingCart,
  Sparkles,
  Building,
  Database,
  ArrowRight,
  CheckCircle,
  Target
} from 'lucide-react';
import { GovernmentSchemesDatabase } from '@/components/schemes/GovernmentSchemesDatabase';
import Link from 'next/link';

// Mock data - in real app, fetch from API
const resourceCategories = {
  templates: [
    {
      id: 1,
      title: 'Business Model Canvas Template',
      description: 'Complete business model canvas with Indian startup examples',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1547,
      rating: 4.8,
      category: 'Planning',
      featured: true
    },
    {
      id: 2,
      title: 'Pitch Deck Template (Hindi + English)',
      description: '15-slide investor pitch deck template with guidance',
      type: 'PowerPoint',
      size: '8.1 MB',
      downloads: 2341,
      rating: 4.9,
      category: 'Funding',
      featured: true
    },
    {
      id: 3,
      title: 'Legal Compliance Checklist',
      description: 'Complete checklist for Indian startup legal requirements',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 987,
      rating: 4.7,
      category: 'Legal'
    },
    {
      id: 4,
      title: 'Financial Projection Template',
      description: '3-year financial model with Indian tax considerations',
      type: 'Excel',
      size: '3.5 MB',
      downloads: 1234,
      rating: 4.6,
      category: 'Finance'
    },
    // P4 Finance Templates
    {
      id: 'p4-coa-template',
      title: 'P4: Chart of Accounts Master Template',
      description: 'Complete COA structure for Indian startups with 5-digit numbering system',
      type: 'Excel',
      size: '2.1 MB',
      downloads: 428,
      rating: 4.8,
      category: 'Finance',
      course: 'P4',
      featured: true
    },
    {
      id: 'p4-policies-manual',
      title: 'P4: Accounting Policies Manual',
      description: 'Comprehensive accounting policy manual template for startups',
      type: 'Word',
      size: '1.8 MB',
      downloads: 356,
      rating: 4.7,
      category: 'Finance',
      course: 'P4'
    },
    {
      id: 'p4-vendor-evaluation',
      title: 'P4: System Evaluation Matrix',
      description: 'Complete framework for evaluating accounting software and finance tools',
      type: 'Excel', 
      size: '1.2 MB',
      downloads: 289,
      rating: 4.6,
      category: 'Finance',
      course: 'P4'
    },
    {
      id: 'p4-compliance-calendar',
      title: 'P4: GST Compliance Calendar',
      description: 'Annual compliance calendar with automated alerts and due dates',
      type: 'Excel',
      size: '0.8 MB', 
      downloads: 567,
      rating: 4.9,
      category: 'Legal',
      course: 'P4'
    },
  ],
  tools: [
    // P4 Finance Tools
    {
      id: 'p4-financial-health',
      title: 'P4: Financial Health Assessment',
      description: '100-point comprehensive assessment to evaluate your financial maturity level',
      type: 'Interactive Tool',
      category: 'Finance',
      featured: true,
      link: '/templates/p4-financial-health-assessment.html',
      course: 'P4',
      rating: 4.9,
      downloads: 856
    },
    {
      id: 'p4-financial-model',
      title: 'P4: Financial Model Builder',
      description: 'Build dynamic 5-year financial models with real-time calculations and scenario analysis',
      type: 'Interactive Tool',
      category: 'Finance',
      featured: true,
      link: '/templates/p4-financial-model-builder.html',
      course: 'P4',
      rating: 4.8,
      downloads: 1247
    },
    {
      id: 'p4-gst-tracker',
      title: 'P4: GST Compliance Tracker',
      description: 'Stay compliant with automated tracking and alerts for all GST requirements',
      type: 'Interactive Tool',
      category: 'Legal',
      featured: true,
      link: '/templates/p4-gst-compliance-tracker.html',
      course: 'P4',
      rating: 4.7,
      downloads: 743
    },
    {
      id: 'p4-implementation',
      title: 'P4: Implementation Checklist',
      description: 'Track your progress through 55+ implementation tasks across 4 phases',
      type: 'Interactive Tool',
      category: 'Planning',
      featured: true,
      link: '/templates/p4-implementation-checklist.html',
      course: 'P4',
      rating: 4.9,
      downloads: 692
    },
    {
      id: 5,
      title: 'Startup Name Generator',
      description: 'AI-powered name generator for Indian startups',
      type: 'Web Tool',
      url: '#',
      category: 'Branding',
      featured: true
    },
    {
      id: 6,
      title: 'GST Calculator',
      description: 'Calculate GST rates for different product categories',
      type: 'Calculator',
      url: '#',
      category: 'Finance'
    },
    {
      id: 7,
      title: 'Market Size Calculator',
      description: 'Estimate TAM, SAM, and SOM for Indian markets',
      type: 'Calculator',
      url: '#',
      category: 'Research'
    },
    {
      id: 8,
      title: 'Logo Maker',
      description: 'Create professional logos for your startup',
      type: 'Design Tool',
      url: '#',
      category: 'Branding'
    },
  ],
  guides: [
    {
      id: 9,
      title: 'Complete Guide to Startup India Registration',
      description: 'Step-by-step guide with screenshots and tips',
      type: 'Article',
      readTime: '15 min',
      category: 'Legal',
      featured: true
    },
    {
      id: 10,
      title: 'How to Validate Your Startup Idea in India',
      description: 'Proven methods to validate ideas in Indian market',
      type: 'Article',
      readTime: '12 min',
      category: 'Planning'
    },
    {
      id: 11,
      title: 'Angel Investor Database India',
      description: 'List of 500+ angel investors with contact details',
      type: 'Database',
      readTime: '5 min',
      category: 'Funding'
    },
    {
      id: 12,
      title: 'Digital Marketing for Indian Startups',
      description: 'Complete guide to marketing in India',
      type: 'Article',
      readTime: '20 min',
      category: 'Marketing'
    },
  ]
};

const categoryIcons = {
  Planning: Lightbulb,
  Legal: Scale,
  Finance: Calculator,
  Funding: CreditCard,
  Branding: Briefcase,
  Research: TrendingUp,
  Marketing: Users,
  Design: FileText
};

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  url?: string;
  fileUrl?: string;
  tags: string[];
  isDownloadable: boolean;
  moduleTitle: string;
  moduleId: string;
  productCode: string;
  productTitle: string;
  source: 'module' | 'lesson';
  lessonTitle?: string;
}

interface ResourceData {
  resources: Resource[];
  resourcesByProduct: Record<string, Resource[]>;
  totalResources: number;
  products: Array<{
    code: string;
    title: string;
    resourceCount: number;
  }>;
  resourceTypes: string[];
  tags: string[];
  hasAllAccess: boolean;
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [resourceData, setResourceData] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/user/resources');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch resources');
        }

        setResourceData(data);
      } catch (err) {
        logger.error('Error fetching resources:', err);
        setError(err instanceof Error ? err.message : 'Failed to load resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search and filters
  const getFilteredResources = () => {
    if (!resourceData) return [];

    let filtered = resourceData.resources;

    // Filter by product
    if (selectedProduct !== 'all') {
      filtered = filtered.filter(r => r.productCode === selectedProduct);
    }

    // Filter by type/category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.type.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Group by type for tabs
    if (activeTab !== 'all') {
      filtered = filtered.filter(r => {
        if (activeTab === 'templates') {
          return ['template', 'pdf', 'excel', 'powerpoint', 'document'].includes(r.type.toLowerCase());
        } else if (activeTab === 'tools') {
          return ['tool', 'calculator', 'web tool', 'online tool'].includes(r.type.toLowerCase());
        } else if (activeTab === 'guides') {
          return ['guide', 'article', 'tutorial', 'video'].includes(r.type.toLowerCase());
        }
        return true;
      });
    }

    return filtered;
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'article':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'excel':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'powerpoint':
        return <FileText className="w-5 h-5 text-orange-500" />;
      case 'web tool':
      case 'calculator':
      case 'design tool':
        return <Calculator className="w-5 h-5 text-blue-500" />;
      case 'database':
        return <BookOpen className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const showDownload = resource.isDownloadable || resource.fileUrl;
    const isExternalLink = resource.url && !resource.fileUrl;
    
    return (
      <Card className="h-full transition-all hover:shadow-lg hover:border-black group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getIcon(resource.type)}
              <Badge variant="outline" size="sm">{resource.type}</Badge>
            </div>
            <Badge variant="default" size="sm">
              {resource.productCode}
            </Badge>
          </div>

          <Heading as="h3" variant="h5" className="mb-2 group-hover:text-blue-600 transition-colors">
            {resource.title}
          </Heading>
          
          <Text color="muted" className="mb-2">
            {resource.description}
          </Text>

          <div className="flex flex-col gap-1 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="truncate">{resource.productTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="truncate">{resource.moduleTitle}</span>
            </div>
            {resource.lessonTitle && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="truncate">{resource.lessonTitle}</span>
              </div>
            )}
          </div>

          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge variant="outline" size="sm">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {showDownload && resource.fileUrl && (
              <Button 
                variant="primary" 
                size="sm" 
                className="flex-1"
                onClick={() => window.open(resource.fileUrl, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
            {isExternalLink && (
              <Button 
                variant="primary" 
                size="sm" 
                className="flex-1"
                onClick={() => window.open(resource.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Link
              </Button>
            )}
            {!showDownload && !isExternalLink && (
              <Button variant="outline" size="sm" className="flex-1" disabled>
                <FileText className="w-4 h-4 mr-2" />
                View in Course
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Heading as="h1" className="mb-2">
                  Startup Resources
                </Heading>
                <Text color="muted">
                  {resourceData?.hasAllAccess ? 
                    'Access all resources from your courses in one place' :
                    'Templates, tools, and guides from your purchased courses'
                  }
                </Text>
              </div>
              {resourceData && resourceData.totalResources > 0 && (
                <Badge variant="default" size="lg">
                  {resourceData.totalResources} Resources Available
                </Badge>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Alert variant="warning" className="mb-8">
              {error}
            </Alert>
          )}

          {/* No Resources State */}
          {!loading && !error && resourceData?.totalResources === 0 && (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <FileText className="w-96 h-96" />
                </div>
                <div className="relative">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <FileText className="w-12 h-12 text-gray-400" />
                    <Calculator className="w-12 h-12 text-gray-400" />
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <Badge variant="warning" className="mb-4">
                    🎯 Unlock Premium Resources
                  </Badge>
                  <Heading as="h3" variant="h3" className="mb-3">
                    Get Access to 200+ Amazing Resources!
                  </Heading>
                  <Text size="lg" className="mb-2 font-medium">
                    Each course includes exclusive templates, tools, and guides worth ₹50,000+
                  </Text>
                  <Text color="muted" className="mb-8 max-w-2xl mx-auto">
                    From pitch deck templates to financial models, legal documents to marketing frameworks - 
                    everything you need to build and scale your startup is waiting in our comprehensive courses.
                  </Text>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <Text weight="medium" size="sm">Legal Templates</Text>
                      <Text size="xs" color="muted">Contracts, NDAs, Terms</Text>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <Text weight="medium" size="sm">Financial Tools</Text>
                      <Text size="xs" color="muted">Models, Calculators, Trackers</Text>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <Text weight="medium" size="sm">Business Guides</Text>
                      <Text size="xs" color="muted">Playbooks, Frameworks, SOPs</Text>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => window.location.href = '/pricing'}
                    className="mb-3"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Explore Courses & Unlock Resources
                  </Button>
                  <Text size="sm" color="muted">
                    Starting at just ₹4,999 per course
                  </Text>
                </div>
              </div>
            </Card>
          )}

          {/* Main Content */}
          {!loading && !error && resourceData && resourceData.totalResources > 0 && (
            <>
              {/* P3 Funding Mastery Premium Hub - Premium Feature for P3 owners */}
              {resourceData?.products.some(p => ['P3', 'ALL_ACCESS'].includes(p.code)) && (
                <Card className="mb-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Heading as="h3" variant="h4">
                            P3 Funding Mastery Hub
                          </Heading>
                          <Badge className="bg-green-100 text-green-700">Premium Access</Badge>
                        </div>
                        <Text color="muted" className="mb-4">
                          Complete funding ecosystem with investor database, pitch deck builder, financial modeling tools, 
                          government grants tracker, and term sheet negotiation simulator.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">700+ Verified Investors</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">Interactive Pitch Builder</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">Financial Model Creator</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">CRM & Pipeline Tracker</Text>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                          <Link href="/templates/p3-funding-readiness-assessment.html">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Funding Readiness Tool
                            </Button>
                          </Link>
                          <Link href="/templates/p3-investor-pitch-deck.html">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <FileText className="w-4 h-4 mr-2" />
                              Pitch Deck Builder
                            </Button>
                          </Link>
                          <Link href="/templates/p3-financial-model.html">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Calculator className="w-4 h-4 mr-2" />
                              Financial Model Tool
                            </Button>
                          </Link>
                          <Link href="/templates/p3-government-grant-application.html">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Building className="w-4 h-4 mr-2" />
                              Grant Application Hub
                            </Button>
                          </Link>
                          <Link href="/templates/p3-term-sheet-negotiation.html">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Scale className="w-4 h-4 mr-2" />
                              Term Sheet Simulator
                            </Button>
                          </Link>
                          <Link href="/templates/p3-investor-crm-tracker.html">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Users className="w-4 h-4 mr-2" />
                              Investor CRM System
                            </Button>
                          </Link>
                        </div>

                        <Link href="/products/p3">
                          <Button variant="primary" size="lg">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Access P3 Funding Hub
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Incubator Database - Premium Feature for P1/P5 owners */}
              {resourceData?.products.some(p => ['P1', 'P5', 'ALL_ACCESS'].includes(p.code)) && (
                <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Heading as="h3" variant="h4">
                            Global Incubator Database
                          </Heading>
                          <Badge className="bg-purple-100 text-purple-700">Premium Access</Badge>
                        </div>
                        <Text color="muted" className="mb-4">
                          Access 700+ verified incubators and accelerators worldwide. Find the perfect 
                          partner for your startup journey with detailed profiles and application insights.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                            <Text size="sm">200+ Indian Incubators</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                            <Text size="sm">500+ Global Programs</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                            <Text size="sm">Success Rate Data</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                            <Text size="sm">Application Deadlines</Text>
                          </div>
                        </div>

                        <Link href="/incubators">
                          <Button variant="primary" size="lg">
                            <Briefcase className="w-5 h-5 mr-2" />
                            Browse Incubator Database
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* P2 Legal Resources Hub - Premium Feature for P2 owners */}
              {resourceData?.products.some(p => ['P2', 'ALL_ACCESS'].includes(p.code)) && (
                <Card className="mb-8 border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Scale className="w-8 h-8 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Heading as="h3" variant="h4">
                            P2 Legal & Compliance Hub
                          </Heading>
                          <Badge className="bg-amber-100 text-amber-700">Premium Access</Badge>
                        </div>
                        <Text color="muted" className="mb-4">
                          Complete legal toolkit with 300+ templates, 8 interactive calculators, and 
                          comprehensive guides for incorporation and compliance mastery.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">300+ Legal Templates</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">8 Interactive Tools</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">Compliance Trackers</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">Portfolio Integration</Text>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Link href="/products/p2">
                            <Button variant="primary" size="lg">
                              <Scale className="w-5 h-5 mr-2" />
                              Access P2 Resources
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Link href="/portfolio">
                            <Button variant="outline" size="lg">
                              <FileText className="w-5 h-5 mr-2" />
                              Update Portfolio
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Government Schemes Database - Premium Feature for P7/P9 owners */}
              {resourceData?.products.some(p => ['P7', 'P9', 'ALL_ACCESS'].includes(p.code)) && (
                <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Database className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Heading as="h3" variant="h4">
                            Government Schemes Database
                          </Heading>
                          <Badge className="bg-orange-100 text-orange-700">Premium Access</Badge>
                        </div>
                        <Text color="muted" className="mb-4">
                          Access 500+ central and state government schemes worth ₹50L to ₹5Cr. 
                          Includes eligibility checker, application templates, and success tracking.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">500+ Active Schemes</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">Eligibility Checker</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Text size="sm">Application Templates</Text>
                          </div>
                        </div>

                        <Link href="/products/schemes">
                          <Button variant="primary" size="lg">
                            <Building className="w-5 h-5 mr-2" />
                            Access Schemes Database
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Course Filter Pills */}
              {resourceData.products.length > 1 && (
                <div className="mb-6 overflow-x-auto">
                  <div className="flex gap-2 min-w-max">
                    <Button
                      variant={selectedProduct === 'all' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedProduct('all')}
                    >
                      All Courses ({resourceData.totalResources})
                    </Button>
                    {resourceData.products.map(product => (
                      <Button
                        key={product.code}
                        variant={selectedProduct === product.code ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedProduct(product.code)}
                      >
                        {product.title} ({product.resourceCount})
                      </Button>
                    ))}
                  </div>
                </div>
              )}

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="all">All Types</option>
                    {resourceData?.resourceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

              {/* Resource Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-8">
                  <TabsTrigger value="p1" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    P1 Premium Library
                  </TabsTrigger>
                  <TabsTrigger value="p4" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    P4 Finance Stack
                  </TabsTrigger>
                  <TabsTrigger value="p9" className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    P9 Gov Schemes
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    All Resources
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Templates & Documents
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Online Tools
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Guides & Articles
                  </TabsTrigger>
                </TabsList>

                {/* P1 Premium Library */}
                <TabsContent value="p1">
                  <P1ResourceLibrary hasAccess={
                    resourceData?.products.some(p => 
                      p.code === 'P1' || p.code === 'ALL_ACCESS'
                    ) || false
                  } />
                </TabsContent>

                {/* P4 Finance Stack */}
                <TabsContent value="p4">
                  <P4ResourceLibrary hasAccess={
                    resourceData?.products.some(p => 
                      p.code === 'P4' || p.code === 'ALL_ACCESS'
                    ) || false
                  } />
                </TabsContent>

                {/* P9 Government Schemes */}
                <TabsContent value="p9">
                  <P9ResourceLibrary hasAccess={
                    resourceData?.products.some(p => 
                      p.code === 'P9' || p.code === 'ALL_ACCESS'
                    ) || false
                  } />
                </TabsContent>

                {/* Other Resources */}
                <TabsContent value="all">
                  <div className="min-h-[400px]">
                    {getFilteredResources().length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredResources().map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 text-center">
                        <Text color="muted">No resources found matching your criteria.</Text>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="templates">
                  <div className="min-h-[400px]">
                    {getFilteredResources().length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredResources().map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 text-center">
                        <Text color="muted">No templates found matching your criteria.</Text>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tools">
                  <div className="min-h-[400px]">
                    {getFilteredResources().length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredResources().map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 text-center">
                        <Text color="muted">No tools found matching your criteria.</Text>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="guides">
                  <div className="min-h-[400px]">
                    {getFilteredResources().length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredResources().map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 text-center">
                        <Text color="muted">No guides found matching your criteria.</Text>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {/* Legacy Resources Grid */}
                <div className="min-h-[400px]" style={{display: 'none'}}>
                  {getFilteredResources().length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getFilteredResources().map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Heading as="h4" variant="h5" className="mb-2">
                        No Resources Found
                      </Heading>
                      <Text color="muted">
                        Try adjusting your filters or search query
                      </Text>
                    </Card>
                  )}
                </div>
              </Tabs>

              {/* Resource Summary by Product */}
              {resourceData.products.length > 0 && (
                <Card className="mt-12">
                  <CardHeader>
                    <CardTitle>Resources by Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resourceData.products.map(product => (
                        <button
                          key={product.code}
                          onClick={() => setSelectedProduct(product.code)}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            selectedProduct === product.code 
                              ? 'border-black bg-gray-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{product.code}</Badge>
                            <Text size="sm" weight="medium">{product.resourceCount} items</Text>
                          </div>
                          <Text weight="medium">{product.title}</Text>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

            </>
          )}

          {/* Request Resource - Always Show */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <Heading as="h3" variant="h4" className="mb-2">
                Can't find what you're looking for?
              </Heading>
              <Text color="muted" className="mb-4">
                Request a specific template, tool, or guide and we'll add it to our resource library.
              </Text>
              <Button variant="primary">
                Request Resource
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}