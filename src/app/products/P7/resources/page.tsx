'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { 
  MapPin,
  FileText,
  Download,
  ExternalLink,
  Search,
  Filter,
  ArrowLeft,
  Package,
  Star,
  Database,
  Calculator,
  Monitor
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  tags: string[];
  isDownloadable: boolean;
  metadata: any;
  moduleTitle?: string;
  moduleOrder?: number;
}

interface ModuleResources {
  moduleOrder: number;
  moduleTitle: string;
  resources: Resource[];
}

export default function P7ResourcesPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [resourceData, setResourceData] = useState<{
    hasAccess: boolean;
    totalResources: number;
    totalValue: string;
    resourcesByModule: ModuleResources[];
    allResources: Resource[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/products/P7/resources', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setResourceData(data);
        } else {
          logger.error('Failed to fetch P7 resources:', response.statusText);
        }
      } catch (error) {
        logger.error('Error fetching P7 resources:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchResources();
    }
  }, [user]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template_collection':
        return <FileText className="w-5 h-5" />;
      case 'database_resource':
        return <Database className="w-5 h-5" />;
      case 'calculator_suite':
        return <Calculator className="w-5 h-5" />;
      case 'monitoring_system':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template_collection':
        return 'bg-blue-100 text-blue-800';
      case 'database_resource':
        return 'bg-green-100 text-green-800';
      case 'calculator_suite':
        return 'bg-purple-100 text-purple-800';
      case 'monitoring_system':
        return 'bg-orange-100 text-orange-800';
      case 'premium_database':
        return 'bg-yellow-100 text-yellow-800';
      case 'interactive_premium':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredResources = resourceData?.allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesModule = selectedModule === 'all' || resource.moduleOrder === selectedModule;

    return matchesSearch && matchesType && matchesModule;
  }) || [];

  const resourceTypes = [...new Set(resourceData?.allResources.map(r => r.type) || [])];
  const modules = resourceData?.resourcesByModule || [];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!resourceData) {
    return (
      <DashboardLayout>
        <div className="text-center space-y-4">
          <Heading as="h1" variant="h2">Resources Not Available</Heading>
          <Text color="muted">Unable to load P7 resources. Please try again later.</Text>
          <Button onClick={() => router.push('/government-schemes')}>
            Back to Course
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P7">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/government-schemes')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                P7 Resources
              </Badge>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              P7 State-wise Scheme Resources
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Access your complete collection of state scheme templates, databases, and tools
            </Text>
          </div>

          {/* Stats */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {resourceData.totalResources}
                </div>
                <Text size="sm" color="muted">Total Resources</Text>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {resourceData.totalValue}
                </div>
                <Text size="sm" color="muted">Total Value</Text>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  435+
                </div>
                <Text size="sm" color="muted">Templates Included</Text>
              </div>
            </div>
          </Card>

          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Modules</option>
                  {modules.map(module => (
                    <option key={module.moduleOrder} value={module.moduleOrder}>
                      Module {module.moduleOrder}: {module.moduleTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Resources Grid */}
          <div className="grid gap-6">
            {filteredResources.length === 0 ? (
              <Card className="p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <Heading as="h3" variant="h4" className="mb-2">No Resources Found</Heading>
                <Text color="muted">Try adjusting your search or filter criteria.</Text>
              </Card>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                          {getTypeIcon(resource.type)}
                        </div>
                        <div>
                          <Heading as="h3" variant="h4" className="mb-1">
                            {resource.title}
                          </Heading>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Module {resource.moduleOrder}: {resource.moduleTitle}
                            </Badge>
                            {resource.metadata?.value && (
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                                Worth {resource.metadata.value}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Text color="muted" className="mb-4">
                        {resource.description}
                      </Text>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {resource.metadata?.templateCount && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4" />
                          {resource.metadata.templateCount} templates included
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex items-center gap-2">
                      {resource.fileUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      {resource.isDownloadable && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.fileUrl} download>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <Heading as="h2" variant="h3" className="text-white mb-4">
              Premium State Scheme Resources
            </Heading>
            <Text className="text-blue-100 mb-6 max-w-2xl mx-auto">
              You have access to ₹9.8L+ worth of premium templates, databases, and tools 
              to master India's state ecosystem and achieve 30-50% cost savings.
            </Text>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/government-schemes')}
                className="bg-white text-blue-700 hover:bg-gray-50"
              >
                Continue Learning
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/portfolio')}
                className="bg-white text-blue-700 hover:bg-gray-50"
              >
                Build Portfolio
              </Button>
            </div>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}