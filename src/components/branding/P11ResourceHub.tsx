'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
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
  Palette,
  Megaphone,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProducts } from '@/hooks/useUserProducts';

interface P11Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  url?: string;
  fileUrl?: string;
  value: number;
  isDownloadable: boolean;
  metadata: any;
}

interface InteractiveTool {
  id: string;
  name: string;
  description: string;
  url: string;
  value: number;
  status: string;
}

interface ResourceHubData {
  product: any;
  resources: {
    total: number;
    categorized: any;
    totalValue: number;
  };
  interactiveTools: {
    count: number;
    tools: InteractiveTool[];
    totalValue: number;
  };
  templateLibrary: any;
  lessons: any;
  accessInfo: any;
}

const P11ResourceHub: React.FC = () => {
  const { user } = useAuth();
  const { hasAccess } = useUserProducts();
  const [resourceData, setResourceData] = useState<ResourceHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const hasP11Access = hasAccess('P11');

  useEffect(() => {
    if (hasP11Access) {
      fetchResourceData();
    } else {
      setLoading(false);
    }
  }, [hasP11Access]);

  const fetchResourceData = async () => {
    try {
      const response = await fetch('/api/products/P11/resources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      
      const data = await response.json();
      if (data.success) {
        setResourceData(data);
      } else {
        throw new Error(data.error || 'Failed to load resources');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interactive_tool': return <Zap className="w-4 h-4" />;
      case 'template_library': return <FileText className="w-4 h-4" />;
      case 'video_series': return <Play className="w-4 h-4" />;
      case 'calculator': return <Calculator className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getToolIcon = (toolId: string) => {
    switch (toolId) {
      case 'brand-strategy': return <Target className="w-6 h-6" />;
      case 'pr-campaigns': return <Megaphone className="w-6 h-6" />;
      case 'brand-assets': return <Palette className="w-6 h-6" />;
      case 'media-relations': return <Users className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const openTool = (toolUrl: string) => {
    // If it's a hash link, update the current page
    if (toolUrl.includes('#')) {
      window.location.hash = toolUrl.split('#')[1];
    } else {
      window.open(toolUrl, '_blank');
    }
  };

  const downloadResource = (resource: P11Resource) => {
    if (!hasP11Access) {
      alert('P11 access required to download resources');
      return;
    }
    
    if (resource.fileUrl) {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = resource.fileUrl;
      link.download = resource.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Download for ${resource.title} will be available soon!`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading P11 Resource Hub...</p>
        </div>
      </div>
    );
  }

  if (!hasP11Access) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-4">P11 Resource Hub Access Required</h2>
            <p className="text-gray-600 mb-6">
              Get access to all P11 resources including 4 interactive tools, 300+ templates, 
              and comprehensive learning materials worth ₹2,00,000+
            </p>
            <Button 
              onClick={() => window.location.href = '/pricing'}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Unlock P11 Resources - ₹7,999
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-4">Error Loading Resources</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchResourceData} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!resourceData) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">P11 Resource Hub</h1>
        <p className="text-gray-600 mb-4">
          Access all your branding and PR resources, tools, and templates
        </p>
        <div className="flex justify-center items-center gap-4 text-sm">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Full Access Active
          </Badge>
          <span className="text-gray-500">
            Expires: {new Date(resourceData.accessInfo.expiresAt).toLocaleDateString()}
          </span>
          <span className="text-gray-500">
            {resourceData.accessInfo.daysRemaining} days remaining
          </span>
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{resourceData.interactiveTools.count}</div>
            <div className="text-sm text-gray-600">Interactive Tools</div>
            <div className="text-xs text-green-600 font-medium">
              {formatCurrency(resourceData.interactiveTools.totalValue)} value
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{resourceData.templateLibrary.totalTemplates}+</div>
            <div className="text-sm text-gray-600">Templates</div>
            <div className="text-xs text-green-600 font-medium">
              {formatCurrency(resourceData.templateLibrary.totalValue)} value
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{resourceData.lessons.count}</div>
            <div className="text-sm text-gray-600">Lessons</div>
            <div className="text-xs text-gray-500">
              {resourceData.lessons.lessonsWithResources} with resources
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">₹2L+</div>
            <div className="text-sm text-gray-600">Total Value</div>
            <div className="text-xs text-green-600 font-medium">
              25x ROI
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Interactive Professional Tools
          </CardTitle>
          <p className="text-sm text-gray-600">
            4 professional-grade tools worth {formatCurrency(resourceData.interactiveTools.totalValue)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceData.interactiveTools.tools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      {getToolIcon(tool.id)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {formatCurrency(tool.value)} value
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => openTool(tool.url)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open Tool
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Complete Template Library
          </CardTitle>
          <p className="text-sm text-gray-600">
            {resourceData.templateLibrary.totalTemplates}+ professional templates worth {formatCurrency(resourceData.templateLibrary.totalValue)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Template Categories</h4>
              <ul className="space-y-2">
                {resourceData.templateLibrary.categories.map((category, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Available Formats</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {resourceData.templateLibrary.formats.map((format, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
              <Button 
                onClick={() => window.open(resourceData.templateLibrary.url, '_blank')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Browse All Templates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(resourceData.resources.categorized).map(([category, resources]) => {
              if (!Array.isArray(resources) || resources.length === 0) return null;
              
              return (
                <div key={category} className="space-y-3">
                  <h4 className="font-semibold capitalize flex items-center gap-2">
                    {getTypeIcon(category)}
                    {category.replace('_', ' ')}
                    <Badge variant="outline" className="ml-auto">
                      {resources.length}
                    </Badge>
                  </h4>
                  {resources.slice(0, 3).map((resource: P11Resource) => (
                    <div key={resource.id} className="p-3 border rounded-lg hover:bg-gray-50">
                      <h5 className="font-medium text-sm mb-1">{resource.title}</h5>
                      <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        {resource.metadata?.total_value && (
                          <span className="text-xs text-green-600">
                            {formatCurrency(resource.metadata.total_value)} value
                          </span>
                        )}
                        {resource.isDownloadable && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-6 px-2"
                            onClick={() => downloadResource(resource)}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your P11 Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Course Completion</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Lessons Completed</span>
                  <span className="font-medium">0 / {resourceData.lessons.count}</span>
                </div>
                <Progress value={0} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Resources Accessed</span>
                  <span className="font-medium">0 / {resourceData.resources.total}</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Start Brand Strategy Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Plan Your First PR Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Award className="w-4 h-4 mr-2" />
                  Access Certification Program
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default P11ResourceHub;