import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, ExternalLink, Search, Filter, Calculator, FileIcon, DollarSign } from 'lucide-react';

interface P9Resource {
  id: string;
  title: string;
  description?: string;
  type: string;
  moduleTitle?: string;
  category: string;
  url?: string;
  isPremium: boolean;
  downloadUrl?: string;
}

interface GovernmentScheme {
  id: string;
  scheme_name: string;
  department: string;
  ministry: string;
  grant_amount: string;
  subsidy_percentage: number | null;
  scheme_description: string;
  eligibility_criteria: string;
  application_process: string;
  scheme_code?: string;
  central_scheme: boolean;
}

interface P9ResourceLibraryProps {
  hasAccess: boolean;
}

const RESOURCE_CATEGORIES = [
  'All Resources',
  'Application Templates',
  'Eligibility Tools',
  'Government Schemes',
  'Funding Applications',
  'Compliance Forms',
  'Documentation',
  'Calculators',
  'Guidelines'
];

export function P9ResourceLibrary({ hasAccess }: P9ResourceLibraryProps) {
  const [resources, setResources] = useState<P9Resource[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [showingSchemes, setShowingSchemes] = useState(false);

  useEffect(() => {
    fetchResources();
    fetchGovernmentSchemes();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/user/resources');
      if (!response.ok) throw new Error('Failed to fetch resources');
      
      const data = await response.json();
      const p9Resources = data.resources?.filter((r: any) => r.productCode === 'P9') || [];
      setResources(p9Resources);
    } catch (error) {
      console.error('Error fetching P9 resources:', error);
      setError('Failed to load resources');
    }
  };

  const fetchGovernmentSchemes = async () => {
    try {
      const response = await fetch('/api/government-schemes');
      if (!response.ok) throw new Error('Failed to fetch schemes');
      
      const data = await response.json();
      setSchemes(data.schemes || []);
    } catch (error) {
      console.error('Error fetching government schemes:', error);
      // Don't set error since this might not exist yet
    }
    setLoading(false);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Resources' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSchemes = schemes.filter(scheme => {
    return scheme.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           scheme.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
           scheme.ministry.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <Card className="border-2 border-yellow-400">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <DollarSign className="h-12 w-12 mx-auto text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
          <p className="text-gray-600 mb-4">
            Access the complete P9 Government Schemes & Funding resource library with 100+ templates, calculators, and scheme guides.
          </p>
          <Button onClick={() => window.location.href = '/pricing'}>
            Upgrade to Access P9 Resources
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🏛️ P9 Government Schemes Resource Hub</h2>
        <p className="text-gray-600">
          Complete toolkit for accessing ₹50L-₹5Cr government funding
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{resources.length}</div>
            <div className="text-sm text-gray-600">Templates & Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{schemes.length}</div>
            <div className="text-sm text-gray-600">Government Schemes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-gray-600">Interactive Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">₹5Cr</div>
            <div className="text-sm text-gray-600">Max Funding Access</div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Interactive Tools & Calculators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Eligibility Calculator</h4>
              <p className="text-sm text-gray-600 mb-3">
                Discover which government schemes you're eligible for based on your startup profile
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/templates/p9-eligibility-calculator.html', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open Calculator
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">📋 Application Tracker</h4>
              <p className="text-sm text-gray-600 mb-3">
                Track your government scheme applications and stay organized
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/templates/p9-application-tracker.html', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open Tracker
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources and schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={!showingSchemes ? "default" : "outline"}
            onClick={() => setShowingSchemes(false)}
            size="sm"
          >
            <FileIcon className="h-4 w-4 mr-1" />
            Resources ({resources.length})
          </Button>
          <Button
            variant={showingSchemes ? "default" : "outline"}
            onClick={() => setShowingSchemes(true)}
            size="sm"
          >
            <DollarSign className="h-4 w-4 mr-1" />
            Schemes ({schemes.length})
          </Button>
        </div>
      </div>

      {!showingSchemes && (
        <>
          {/* Category Filter for Resources */}
          <div className="flex flex-wrap gap-2">
            {RESOURCE_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Resources Grid */}
          {error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No resources found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-start gap-2">
                        <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{resource.title}</span>
                      </CardTitle>
                      {resource.isPremium && (
                        <Badge variant="secondary" className="ml-2">Premium</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {resource.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.category}
                      </Badge>
                      {resource.moduleTitle && (
                        <Badge variant="outline" className="text-xs">
                          {resource.moduleTitle}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {resource.url && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      )}
                      {resource.downloadUrl && (
                        <Button 
                          size="sm"
                          onClick={() => window.open(resource.downloadUrl, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {showingSchemes && (
        <>
          {/* Government Schemes Grid */}
          {filteredSchemes.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No government schemes found matching your search
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{scheme.scheme_name}</CardTitle>
                      <div className="flex gap-2">
                        {scheme.central_scheme && (
                          <Badge variant="default">Central Scheme</Badge>
                        )}
                        {scheme.subsidy_percentage && (
                          <Badge variant="secondary">{scheme.subsidy_percentage}% Subsidy</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Department</div>
                        <div className="text-sm">{scheme.department}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Ministry</div>
                        <div className="text-sm">{scheme.ministry}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Grant Amount</div>
                        <div className="text-sm font-semibold text-green-600">{scheme.grant_amount}</div>
                      </div>
                      {scheme.scheme_code && (
                        <div>
                          <div className="text-sm font-medium text-gray-700">Scheme Code</div>
                          <div className="text-sm font-mono">{scheme.scheme_code}</div>
                        </div>
                      )}
                    </div>
                    
                    {scheme.scheme_description && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Description</div>
                        <div className="text-sm text-gray-600">{scheme.scheme_description}</div>
                      </div>
                    )}
                    
                    {scheme.eligibility_criteria && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Eligibility</div>
                        <div className="text-sm text-gray-600">{scheme.eligibility_criteria}</div>
                      </div>
                    )}
                    
                    {scheme.application_process && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Application Process</div>
                        <div className="text-sm text-gray-600">{scheme.application_process}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default P9ResourceLibrary;