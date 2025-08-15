'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ExternalLink,
  FileText,
  Video,
  Calculator,
  Book,
  Users,
  Building2,
  Download,
  Eye,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Star
} from 'lucide-react';

export interface Resource {
  title: string;
  type: string;
  url: string;
  category: 'reading' | 'tools' | 'templates' | 'videos' | 'government' | 'communities';
  description?: string;
  featured?: boolean;
}

interface ResourcesSectionProps {
  resources: Resource[];
  className?: string;
  showCategories?: boolean;
  defaultExpanded?: string[];
}

export function ResourcesSection({
  resources,
  className = '',
  showCategories = true,
  defaultExpanded = []
}: ResourcesSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(defaultExpanded)
  );
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleBookmark = (resourceUrl: string) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(resourceUrl)) {
      newBookmarked.delete(resourceUrl);
    } else {
      newBookmarked.add(resourceUrl);
    }
    setBookmarked(newBookmarked);
  };

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'reading':
        return {
          title: 'Essential Reading',
          subtitle: 'Articles, books, and guides',
          icon: Book,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'tools':
        return {
          title: 'Tools & Calculators',
          subtitle: 'Helpful utilities and apps',
          icon: Calculator,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'templates':
        return {
          title: 'Templates & Downloads',
          subtitle: 'Ready-to-use documents',
          icon: FileText,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      case 'videos':
        return {
          title: 'Video Tutorials',
          subtitle: 'Visual learning resources',
          icon: Video,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'government':
        return {
          title: 'Government Resources',
          subtitle: 'Official portals and schemes',
          icon: Building2,
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-200'
        };
      case 'communities':
        return {
          title: 'Communities',
          subtitle: 'Join fellow entrepreneurs',
          icon: Users,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      default:
        return {
          title: category.charAt(0).toUpperCase() + category.slice(1),
          subtitle: '',
          icon: FileText,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getResourceIcon = (resource: Resource) => {
    switch (resource.type) {
      case 'template':
        return FileText;
      case 'video':
        return Video;
      case 'tool':
      case 'calculator':
        return Calculator;
      case 'guide':
      case 'article':
        return Book;
      case 'community':
        return Users;
      case 'government':
        return Building2;
      default:
        return ExternalLink;
    }
  };

  // Featured resources
  const featuredResources = resources.filter(r => r.featured);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          Resources & Tools
        </CardTitle>
        {resources.length > 0 && (
          <Text size="sm" color="muted">
            {resources.length} resources available
          </Text>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <Text weight="medium" size="sm">Featured Resources</Text>
            </div>
            <div className="space-y-2">
              {featuredResources.map((resource, index) => (
                <ResourceItem
                  key={`featured-${index}`}
                  resource={resource}
                  isBookmarked={bookmarked.has(resource.url)}
                  onBookmark={() => toggleBookmark(resource.url)}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* Categorized Resources */}
        {showCategories ? (
          <div className="space-y-4">
            {Object.entries(groupedResources).map(([category, categoryResources]) => {
              const config = getCategoryConfig(category);
              const isExpanded = expandedCategories.has(category);
              const Icon = config.icon;

              return (
                <div key={category} className={`border rounded-lg ${config.borderColor}`}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full p-3 flex items-center justify-between hover:${config.bgColor} transition-colors rounded-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <div className="text-left">
                        <Text weight="medium" size="sm">{config.title}</Text>
                        <Text size="xs" color="muted">{config.subtitle}</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm">
                        {categoryResources.length}
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-2">
                      {categoryResources
                        .filter(r => !r.featured) // Don't duplicate featured resources
                        .map((resource, index) => (
                          <ResourceItem
                            key={`${category}-${index}`}
                            resource={resource}
                            isBookmarked={bookmarked.has(resource.url)}
                            onBookmark={() => toggleBookmark(resource.url)}
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Simple list view
          <div className="space-y-2">
            {resources.map((resource, index) => (
              <ResourceItem
                key={index}
                resource={resource}
                isBookmarked={bookmarked.has(resource.url)}
                onBookmark={() => toggleBookmark(resource.url)}
              />
            ))}
          </div>
        )}

        {resources.length === 0 && (
          <div className="text-center py-8">
            <Book className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <Text color="muted">No resources available for this lesson</Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ResourceItemProps {
  resource: Resource;
  isBookmarked: boolean;
  onBookmark: () => void;
  featured?: boolean;
}

function ResourceItem({ resource, isBookmarked, onBookmark, featured = false }: ResourceItemProps) {
  const Icon = getResourceIcon(resource);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (resource.url === '#' || !resource.url) {
      // Placeholder link - don't navigate
      return;
    }

    // Open in new tab for external links
    if (resource.url.startsWith('http')) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      // Internal link
      window.location.href = resource.url;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:border-gray-300 ${
      featured ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'
    }`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${
        featured ? 'text-yellow-600' : 'text-gray-600'
      }`} />
      
      <div className="flex-1 min-w-0">
        <button
          onClick={handleClick}
          className="text-left w-full hover:underline focus:outline-none focus:underline"
        >
          <Text weight="medium" size="sm" className="truncate">
            {resource.title}
          </Text>
          {resource.description && (
            <Text size="xs" color="muted" className="mt-1">
              {resource.description}
            </Text>
          )}
        </button>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" size="sm">
            {resource.type}
          </Badge>
          {featured && (
            <Badge variant="warning" size="sm" className="bg-yellow-100 text-yellow-700">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onBookmark}
          className={`p-1 rounded hover:bg-gray-100 transition-colors ${
            isBookmarked ? 'text-yellow-500' : 'text-gray-400'
          }`}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark resource'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
        
        {resource.url !== '#' && (
          <button
            onClick={handleClick}
            className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400"
            title="Open resource"
          >
            {resource.url.startsWith('http') ? (
              <ExternalLink className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function getResourceIcon(resource: Resource) {
  switch (resource.type) {
    case 'template':
      return FileText;
    case 'video':
      return Video;
    case 'tool':
    case 'calculator':
      return Calculator;
    case 'guide':
    case 'article':
      return Book;
    case 'community':
      return Users;
    case 'government':
      return Building2;
    default:
      return ExternalLink;
  }
}