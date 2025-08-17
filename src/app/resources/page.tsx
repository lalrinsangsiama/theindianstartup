'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
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
  Filter
} from 'lucide-react';

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
  ],
  tools: [
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

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const ResourceCard = ({ resource, showDownload = true }: { resource: any, showDownload?: boolean }) => {
    const CategoryIcon = categoryIcons[resource.category as keyof typeof categoryIcons] || FileText;
    
    return (
      <Card className="h-full transition-all hover:shadow-lg hover:border-black group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getIcon(resource.type)}
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-4 h-4 text-gray-500" />
                <Badge variant="outline" size="sm">{resource.category}</Badge>
              </div>
            </div>
            {resource.featured && (
              <Badge variant="warning" size="sm">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <Heading as="h3" variant="h5" className="mb-2 group-hover:text-blue-600 transition-colors">
            {resource.title}
          </Heading>
          
          <Text color="muted" className="mb-4">
            {resource.description}
          </Text>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <span>{resource.type}</span>
              {resource.size && <span>{resource.size}</span>}
              {resource.readTime && <span>{resource.readTime}</span>}
            </div>
            {resource.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
            )}
          </div>

          {resource.downloads && (
            <Text size="sm" color="muted" className="mb-4">
              {resource.downloads.toLocaleString()} downloads
            </Text>
          )}

          <div className="flex gap-2">
            {showDownload ? (
              <Button variant="primary" size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            ) : (
              <Button variant="primary" size="sm" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Tool
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="mb-2">
              Startup Resources
            </Heading>
            <Text color="muted">
              Templates, tools, and guides to accelerate your startup journey
            </Text>
          </div>

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
                    <option value="all">All Categories</option>
                    <option value="Planning">Planning</option>
                    <option value="Legal">Legal</option>
                    <option value="Finance">Finance</option>
                    <option value="Funding">Funding</option>
                    <option value="Branding">Branding</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resource Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
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

            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceCategories.templates.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceCategories.tools.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} showDownload={false} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceCategories.guides.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} showDownload={false} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Popular Categories */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(categoryIcons).map(([category, Icon]) => (
                  <button
                    key={category}
                    className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors text-center group"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-black" />
                    <Text size="sm" weight="medium">{category}</Text>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Request Resource */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <Heading as="h3" variant="h4" className="mb-2">
                Can&apos;t find what you&apos;re looking for?
              </Heading>
              <Text color="muted" className="mb-4">
                Request a specific template, tool, or guide and we&apos;ll add it to our resource library.
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