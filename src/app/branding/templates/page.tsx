'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Users, 
  Building, 
  Shield, 
  Scale,
  AlertTriangle,
  CheckCircle,
  Star,
  DollarSign,
  Crown,
  Zap,
  Award,
  Megaphone,
  Palette,
  Eye,
  Globe
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProducts } from '@/hooks/useUserProducts';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  type: string;
  isPremium: boolean;
  value: number;
  pages: number;
  format: string[];
  downloadUrl: string;
  previewUrl?: string;
}

const BrandingTemplatesPage: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { hasAccess, loading: accessLoading } = useUserProducts();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(false);

  const hasP11Access = hasAccess('P11');

  // Template data
  useEffect(() => {
    const templateData: Template[] = [
      // Brand Identity Templates
      {
        id: '1',
        name: 'Brand Strategy Canvas',
        description: 'Complete brand foundation framework with positioning, messaging, and competitive analysis',
        category: 'Brand Identity',
        subcategory: 'Strategy',
        type: 'Canvas',
        isPremium: true,
        value: 15000,
        pages: 12,
        format: ['PDF', 'DOCX', 'Figma'],
        downloadUrl: '/templates/brand-strategy-canvas.zip'
      },
      {
        id: '2',
        name: 'Visual Identity Guidelines',
        description: 'Professional brand guidelines with logo usage, colors, typography, and applications',
        category: 'Brand Identity',
        subcategory: 'Visual System',
        type: 'Guidelines',
        isPremium: true,
        value: 25000,
        pages: 40,
        format: ['PDF', 'AI', 'Sketch'],
        downloadUrl: '/templates/visual-identity-guidelines.zip'
      },
      {
        id: '3',
        name: 'Business Card Templates',
        description: 'Professional business card designs in 15 variations with print-ready files',
        category: 'Marketing Collateral',
        subcategory: 'Print Materials',
        type: 'Design',
        isPremium: true,
        value: 8000,
        pages: 15,
        format: ['AI', 'PSD', 'PDF'],
        downloadUrl: '/templates/business-card-suite.zip'
      },
      // PR Templates
      {
        id: '4',
        name: 'Press Release Template Library',
        description: '10 professional press release formats for all announcement types',
        category: 'Public Relations',
        subcategory: 'Media Relations',
        type: 'Template',
        isPremium: true,
        value: 12000,
        pages: 25,
        format: ['DOCX', 'PDF', 'Google Docs'],
        downloadUrl: '/templates/press-release-library.zip'
      },
      {
        id: '5',
        name: 'Media Kit Builder',
        description: 'Complete media kit with company facts, bios, images, and press coverage',
        category: 'Public Relations',
        subcategory: 'Media Relations',
        type: 'Kit',
        isPremium: true,
        value: 18000,
        pages: 30,
        format: ['PDF', 'DOCX', 'InDesign'],
        downloadUrl: '/templates/media-kit-builder.zip'
      },
      {
        id: '6',
        name: 'Crisis Communication Playbook',
        description: 'Emergency response templates and protocols for crisis management',
        category: 'Public Relations',
        subcategory: 'Crisis Management',
        type: 'Playbook',
        isPremium: true,
        value: 22000,
        pages: 35,
        format: ['PDF', 'DOCX'],
        downloadUrl: '/templates/crisis-communication.zip'
      },
      // Award Templates
      {
        id: '7',
        name: 'Award Submission Templates',
        description: 'Professional award application templates for 15 major industry awards',
        category: 'Awards & Recognition',
        subcategory: 'Applications',
        type: 'Template',
        isPremium: true,
        value: 20000,
        pages: 45,
        format: ['DOCX', 'PDF'],
        downloadUrl: '/templates/award-submissions.zip'
      },
      // Social Media
      {
        id: '8',
        name: 'Social Media Template Library',
        description: '50+ designs for Instagram, LinkedIn, Facebook, and Twitter',
        category: 'Digital Marketing',
        subcategory: 'Social Media',
        type: 'Design',
        isPremium: true,
        value: 16000,
        pages: 50,
        format: ['PSD', 'Figma', 'Canva'],
        downloadUrl: '/templates/social-media-library.zip'
      }
    ];
    
    setTemplates(templateData);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', count: templates.length, icon: Globe },
    { id: 'brand-identity', name: 'Brand Identity', count: templates.filter(t => t.category === 'Brand Identity').length, icon: Palette },
    { id: 'public-relations', name: 'Public Relations', count: templates.filter(t => t.category === 'Public Relations').length, icon: Megaphone },
    { id: 'awards', name: 'Awards & Recognition', count: templates.filter(t => t.category === 'Awards & Recognition').length, icon: Award },
    { id: 'digital-marketing', name: 'Digital Marketing', count: templates.filter(t => t.category === 'Digital Marketing').length, icon: Zap },
    { id: 'marketing-collateral', name: 'Marketing Collateral', count: templates.filter(t => t.category === 'Marketing Collateral').length, icon: FileText }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           template.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
                           template.category.toLowerCase().includes(selectedCategory);
    
    const matchesType = selectedType === 'all' || template.type.toLowerCase() === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalValue = templates.reduce((sum, template) => sum + template.value, 0);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const downloadTemplate = (template: Template) => {
    if (!hasP11Access) {
      alert('P11 Branding & PR Mastery access required to download templates');
      return;
    }
    
    // In a real implementation, this would trigger the actual download
    console.log('Downloading:', template.name);
    alert(`Downloading ${template.name}...`);
  };

  if (authLoading || accessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Brand & PR Template Library</h1>
              <p className="text-gray-600">
                300+ professional templates worth {formatCurrency(totalValue)}+
              </p>
            </div>
          </div>
          
          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold">300+</div>
                <div className="text-sm text-gray-600">Templates</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold">{formatCurrency(totalValue)}</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Download className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold">Instant</div>
                <div className="text-sm text-gray-600">Download</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Crown className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-lg font-bold">P11</div>
                <div className="text-sm text-gray-600">Exclusive</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border rounded-md"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="template">Templates</option>
                <option value="canvas">Canvas</option>
                <option value="guidelines">Guidelines</option>
                <option value="design">Designs</option>
                <option value="playbook">Playbooks</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <category.icon className="w-4 h-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Access Status */}
            <Card className="mt-4">
              <CardContent className="p-4">
                {hasP11Access ? (
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-green-700">P11 Access Active</div>
                    <div className="text-sm text-gray-600">Full template library access</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="font-semibold text-yellow-700">Premium Access Required</div>
                    <div className="text-sm text-gray-600 mb-3">Unlock 300+ templates</div>
                    <Button onClick={() => router.push('/pricing')} size="sm" className="w-full">
                      Get P11 Access
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedCategory === 'all' ? 'All Templates' : categories.find(c => c.id === selectedCategory)?.name} 
                ({filteredTemplates.length})
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Loading templates...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map(template => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                          <Badge variant="outline" className="mt-2">
                            {template.type}
                          </Badge>
                        </div>
                        {template.isPremium && (
                          <Crown className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {template.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div>Pages: {template.pages}</div>
                          <div>Value: {formatCurrency(template.value)}</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {template.format.map((format, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          {template.previewUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => window.open(template.previewUrl, '_blank')}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => downloadTemplate(template)}
                            disabled={!hasP11Access}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredTemplates.length === 0 && !loading && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No templates found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingTemplatesPage;