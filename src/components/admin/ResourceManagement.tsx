'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  FileText,
  Link,
  Upload,
  Download,
  Edit,
  Trash2,
  Save,
  Plus,
  ExternalLink,
  File,
  Image,
  Video,
  Archive,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Modal } from '@/components/ui';

interface Resource {
  id: string;
  title: string;
  type: 'template' | 'link' | 'tool' | 'guide' | 'form';
  url: string;
  description: string;
  category: string;
  fileSize?: number;
  downloadCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface ResourceCategory {
  name: string;
  description: string;
  count: number;
}

export function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [resourceForm, setResourceForm] = useState({
    title: '',
    type: 'template',
    url: '',
    description: '',
    category: 'business'
  });

  // Predefined resource categories
  const resourceCategories = [
    { name: 'business', description: 'Business Templates & Planning', count: 0 },
    { name: 'legal', description: 'Legal Documents & Compliance', count: 0 },
    { name: 'finance', description: 'Financial Planning & Analysis', count: 0 },
    { name: 'government', description: 'Government Forms & Applications', count: 0 },
    { name: 'marketing', description: 'Marketing & Branding Resources', count: 0 },
    { name: 'technical', description: 'Technical Documentation', count: 0 }
  ];

  // Mock data for demonstration
  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Business Model Canvas Template',
      type: 'template',
      url: '/templates/business-model-canvas.xlsx',
      description: 'Interactive Excel template for business model planning',
      category: 'business',
      fileSize: 2048000,
      downloadCount: 1245,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Founders Agreement Template',
      type: 'template',
      url: '/templates/founders-agreement.docx',
      description: 'Comprehensive founders agreement with equity splits',
      category: 'legal',
      fileSize: 512000,
      downloadCount: 892,
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      title: 'Financial Projections Template',
      type: 'template',
      url: '/templates/financial-projections.xlsx',
      description: '5-year financial projections with scenarios',
      category: 'finance',
      fileSize: 1536000,
      downloadCount: 1567,
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z'
    },
    {
      id: '4',
      title: 'DPIIT Startup Recognition Portal',
      type: 'link',
      url: 'https://www.startupindia.gov.in/content/sih/en/home.html',
      description: 'Official portal for DPIIT startup recognition',
      category: 'government',
      downloadCount: 2341,
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z'
    },
    {
      id: '5',
      title: 'Pitch Deck Template (20 Slides)',
      type: 'template',
      url: '/templates/pitch-deck-template.pptx',
      description: 'Investor pitch deck with best practices',
      category: 'marketing',
      fileSize: 3072000,
      downloadCount: 2156,
      createdAt: '2024-01-12T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setResources(mockResources);
    
    // Calculate category counts
    const updatedCategories = resourceCategories.map(cat => ({
      ...cat,
      count: mockResources.filter(r => r.category === cat.name).length
    }));
    setCategories(updatedCategories);
    
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered resources based on category and search
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateResource = () => {
    setResourceForm({
      title: '',
      type: 'template',
      url: '',
      description: '',
      category: 'business'
    });
    setEditingResource(null);
    setShowResourceModal(true);
  };

  const handleEditResource = (resource: Resource) => {
    setResourceForm({
      title: resource.title,
      type: resource.type,
      url: resource.url,
      description: resource.description,
      category: resource.category
    });
    setEditingResource(resource);
    setShowResourceModal(true);
  };

  const handleSaveResource = () => {
    const newResource: Resource = {
      id: editingResource?.id || Date.now().toString(),
      ...resourceForm,
      type: resourceForm.type as 'template' | 'link' | 'tool' | 'guide' | 'form',
      downloadCount: editingResource?.downloadCount || 0,
      createdAt: editingResource?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingResource) {
      setResources(prev => prev.map(r => r.id === editingResource.id ? newResource : r));
    } else {
      setResources(prev => [...prev, newResource]);
    }

    setShowResourceModal(false);
  };

  const handleDeleteResource = (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    setResources(prev => prev.filter(r => r.id !== resourceId));
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'template': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'link': return <Link className="w-5 h-5 text-green-600" />;
      case 'tool': return <File className="w-5 h-5 text-purple-600" />;
      case 'guide': return <FileText className="w-5 h-5 text-orange-600" />;
      case 'form': return <File className="w-5 h-5 text-red-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Resource Management</CardTitle>
            <Button onClick={handleCreateResource}>
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Categories ({resources.length})</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.description} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Category Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedCategory === category.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="font-medium text-sm">{category.description}</div>
                <div className="text-xs text-gray-600">{category.count} resources</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getResourceIcon(resource.type)}
                  <div>
                    <h4 className="font-medium line-clamp-1">{resource.title}</h4>
                    <Badge variant="outline" className="text-xs mt-1">
                      {resource.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditResource(resource)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteResource(resource.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span>{formatFileSize(resource.fileSize)}</span>
                  <span>{resource.downloadCount} downloads</span>
                </div>
                {resource.type === 'link' ? (
                  <ExternalLink className="w-3 h-3" />
                ) : (
                  <Download className="w-3 h-3" />
                )}
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  {resource.type === 'link' ? 'Open Link' : 'Download'}
                  {resource.type === 'link' ? (
                    <ExternalLink className="w-3 h-3 ml-2" />
                  ) : (
                    <Download className="w-3 h-3 ml-2" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first resource'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Resource Form Modal */}
      {showResourceModal && (
        <Modal
          isOpen={showResourceModal}
          onClose={() => setShowResourceModal(false)}
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{editingResource ? 'Edit Resource' : 'Add New Resource'}</h2>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={resourceForm.title}
                onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                placeholder="Resource title..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  value={resourceForm.type}
                  onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="template">Template</option>
                  <option value="link">Link</option>
                  <option value="tool">Tool</option>
                  <option value="guide">Guide</option>
                  <option value="form">Form</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={resourceForm.category}
                  onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {resourceCategories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">URL</label>
              <Input
                value={resourceForm.url}
                onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                placeholder="https://... or /templates/..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={resourceForm.description}
                onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                placeholder="Describe what this resource provides..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleSaveResource} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingResource ? 'Update Resource' : 'Add Resource'}
              </Button>
              <Button variant="outline" onClick={() => setShowResourceModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}