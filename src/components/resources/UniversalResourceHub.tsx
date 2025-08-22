'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  Star,
  Clock,
  FileText,
  Video,
  Wrench,
  BookOpen,
  Award,
  CheckCircle,
  Heart,
  Eye,
  Users,
  BarChart3,
  Calculator,
  Database,
  Presentation,
  Archive,
  PlayCircle,
  Globe
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  tags: string[];
  isDownloadable: boolean;
  viewCount: number;
  downloadCount: number;
  useCount: number;
  rating?: number;
  hasAccess: boolean;
  productCode: string;
  productTitle: string;
  moduleTitle: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  format: string;
  metadata: any;
}

interface UniversalResourceHubProps {
  productCode?: string;
  title?: string;
  description?: string;
  showFilters?: boolean;
  downloadableOnly?: boolean;
  limit?: number;
  showStats?: boolean;
}

const UniversalResourceHub: React.FC<UniversalResourceHubProps> = ({
  productCode,
  title = 'Resources & Templates',
  description = 'Access professional templates, tools, and resources for your startup journey',
  showFilters = true,
  downloadableOnly = false,
  limit = 50,
  showStats = true
}) => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'alphabetical'>('popular');
  
  // Filter options
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [products, setProducts] = useState<Array<{code: string, title: string}>>([]);
  
  // Stats
  const [totalResources, setTotalResources] = useState(0);
  const [userAccess, setUserAccess] = useState<any>({});

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCode, searchTerm, selectedCategory, selectedTag, sortBy]);

  const fetchResources = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (productCode) params.append('product', productCode);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedTag) params.append('tag', selectedTag);
      if (searchTerm) params.append('search', searchTerm);
      if (downloadableOnly) params.append('downloadable', 'true');
      params.append('limit', limit.toString());

      const response = await fetch(`/api/resources?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const data = await response.json();
      
      let sortedResources = [...data.resources];
      
      // Apply sorting
      switch (sortBy) {
        case 'popular':
          sortedResources.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
          break;
        case 'newest':
          sortedResources.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'alphabetical':
          sortedResources.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }

      setResources(sortedResources);
      setCategories(data.filters.categories || []);
      setTags(data.filters.tags || []);
      setProducts(data.filters.products || []);
      setTotalResources(data.totalResources || 0);
      setUserAccess(data.userAccess || {});
      
    } catch (err: any) {
      setError(err.message || 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const downloadResource = async (resourceId: string) => {
    try {
      const response = await fetch('/api/resources/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceId,
          action: 'download'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Download failed');
      }

      // Open download URL
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }

      // Update resource download count locally
      setResources(prev => prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, downloadCount: resource.downloadCount + 1 }
          : resource
      ));

      // Show success message (you could use a toast library here)
      console.log(`Downloaded: ${data.resource?.title}`);
      
    } catch (err: any) {
      console.error('Download error:', err.message);
      alert(err.message || 'Download failed');
    }
  };

  const trackResourceView = async (resourceId: string) => {
    try {
      await fetch('/api/resources/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceId,
          action: 'view'
        }),
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'template': return <FileText className="w-5 h-5" />;
      case 'template_collection': return <Archive className="w-5 h-5" />;
      case 'template_library': return <Database className="w-5 h-5" />;
      case 'interactive_tool': return <Calculator className="w-5 h-5" />;
      case 'dashboard': return <BarChart3 className="w-5 h-5" />;
      case 'dashboard_template': return <Presentation className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'video_series': return <PlayCircle className="w-5 h-5" />;
      case 'video_masterclass': return <Award className="w-5 h-5" />;
      case 'tool': return <Wrench className="w-5 h-5" />;
      case 'toolkit': return <Archive className="w-5 h-5" />;
      case 'guide': return <BookOpen className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'spreadsheet': return <BarChart3 className="w-5 h-5" />;
      case 'presentation': return <Presentation className="w-5 h-5" />;
      case 'framework': return <Globe className="w-5 h-5" />;
      case 'vault': return <Archive className="w-5 h-5" />;
      case 'premium_collection': return <Star className="w-5 h-5" />;
      case 'library': return <Database className="w-5 h-5" />;
      case 'playbook': return <BookOpen className="w-5 h-5" />;
      case 'resource': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-medium">Failed to load resources</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
        </div>
        <button
          onClick={fetchResources}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        
        {showStats && (
          <div className="flex justify-center items-center space-x-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>{totalResources} Resources</span>
            </div>
            {userAccess.hasAllAccess && (
              <div className="flex items-center space-x-1 text-green-600">
                <Award className="w-4 h-4" />
                <span>All Access</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'newest' | 'alphabetical')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedTag || searchTerm) && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Search: {searchTerm}
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('')}
                    className="ml-1 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  {selectedTag}
                  <button 
                    onClick={() => setSelectedTag('')}
                    className="ml-1 hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Resources Grid */}
      {resources.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory || selectedTag 
              ? 'Try adjusting your filters or search terms'
              : 'Resources will be added soon'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg border hover:shadow-lg transition-all duration-300"
                onClick={() => trackResourceView(resource.id)}
              >
                {/* Resource Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {resource.format}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    {resource.rating && (
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm ml-1">{resource.rating}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{resource.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{resource.downloadCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{resource.viewCount}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          +{resource.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Resource Actions */}
                <div className="px-6 pb-6">
                  {resource.hasAccess ? (
                    <div className="space-y-2">
                      {resource.isDownloadable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadResource(resource.id);
                          }}
                          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      )}
                      
                      {resource.fileUrl && !resource.isDownloadable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(resource.fileUrl, '_blank');
                          }}
                          className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <span>Purchase Required</span>
                    </button>
                  )}
                  
                  {/* Product Info */}
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    {resource.productTitle}
                    {resource.moduleTitle && (
                      <span> • {resource.moduleTitle}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UniversalResourceHub;