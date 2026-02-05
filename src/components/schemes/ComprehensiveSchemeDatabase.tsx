'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Select, SelectItem } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Users, 
  ExternalLink, 
  Download,
  Star,
  Award,
  TrendingUp,
  CheckCircle,
  Heart,
  Target
} from 'lucide-react';

// Updated interface to match our database schema
interface GovernmentScheme {
  id: string;
  scheme_code: string;
  scheme_name: string;
  scheme_type: 'central' | 'state' | 'sector_specific';
  category: string;
  subcategory?: string;
  applicable_states: string[];
  implementing_agency: string;
  ministry_department?: string;
  min_funding_amount: number;
  max_funding_amount?: number;
  funding_type: string;
  interest_rate?: number;
  subsidy_percentage?: number;
  eligibility_criteria: string;
  company_age_limit?: string;
  turnover_criteria?: string;
  sector_focus?: string[];
  target_beneficiaries?: string;
  application_process: string;
  required_documents?: string[];
  application_url?: string;
  processing_time?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  office_address?: string;
  website_url?: string;
  launch_date?: string;
  validity_period?: string;
  budget_allocation?: number;
  beneficiaries_target?: number;
  success_rate?: number;
  average_approval_time?: string;
  funding_range?: string;
  short_description?: string;
  badge_color?: string;
}

interface SchemeStats {
  totalSchemes: number;
  centralSchemes: number;
  stateSchemes: number;
  categories: number;
  totalFunding: number;
  avgSuccessRate: number;
}

interface ComprehensiveSchemeProps {
  productCode?: string;
  showFilters?: boolean;
  defaultState?: string;
  defaultSector?: string;
  limit?: number;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
];

const CATEGORIES = [
  'startup', 'msme', 'manufacturing', 'agriculture', 'technology', 'services'
];

const SECTORS = [
  'technology', 'manufacturing', 'agriculture', 'services', 'biotechnology', 'electronics', 
  'information_technology', 'renewable_energy', 'food_processing', 'textiles', 'automotive'
];

const FUNDING_RANGES = [
  { label: '₹1L - ₹10L', value: '1-10' },
  { label: '₹10L - ₹50L', value: '10-50' },
  { label: '₹50L - ₹2Cr', value: '50-200' },
  { label: '₹2Cr+', value: '200+' }
];

export default function ComprehensiveSchemeDatabase({ 
  productCode = 'P7', 
  showFilters = true, 
  defaultState, 
  defaultSector, 
  limit = 20 
}: ComprehensiveSchemeProps) {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [stats, setStats] = useState<SchemeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState(defaultState || '');
  const [selectedSector, setSelectedSector] = useState(defaultSector || '');
  const [selectedFundingRange, setSelectedFundingRange] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: ((page - 1) * limit).toString()
      });

      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedState) params.append('state', selectedState);
      if (selectedFundingRange) params.append('fundingRange', selectedFundingRange);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/government-schemes?${params}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.schemes) {
        setSchemes(data.schemes);
        setStats(data.statistics);
        setTotalPages(data.pagination.pages || 1);
      }
    } catch (error) {
      logger.error('Failed to fetch schemes:', error);
      // Show fallback message or redirect to upgrade
      setSchemes([]);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [limit, page, selectedCategory, selectedState, selectedFundingRange, searchTerm]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const formatAmount = (amount?: number) => {
    if (!amount) return 'N/A';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getSchemeTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'central': 'bg-blue-100 text-blue-800 border-blue-200',
      'state': 'bg-green-100 text-green-800 border-green-200',
      'sector_specific': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'startup': 'bg-orange-100 text-orange-800',
      'msme': 'bg-blue-100 text-blue-800',
      'manufacturing': 'bg-green-100 text-green-800',
      'agriculture': 'bg-yellow-100 text-yellow-800',
      'technology': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getRecommendations = async () => {
    try {
      const response = await fetch('/api/government-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'get_recommendations',
          data: {
            startup_stage: 'early',
            sector: selectedSector || 'technology',
            state: selectedState || 'Karnataka',
            funding_need: 2000000
          }
        })
      });
      
      const data = await response.json();
      if (data.recommendations) {
        setSchemes(data.recommendations.map((r: any) => ({
          ...r,
          id: r.scheme_code,
          funding_range: `Match Score: ${r.match_score}%`
        })));
      }
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Schemes</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalSchemes}</p>
                  <p className="text-xs text-gray-500">Real-time verified</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Central Schemes</p>
                  <p className="text-2xl font-bold text-green-600">{stats.centralSchemes}</p>
                  <p className="text-xs text-gray-500">Pan-India access</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Success Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.avgSuccessRate?.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">High approval rates</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Funding</p>
                  <p className="text-2xl font-bold text-orange-600">{formatAmount(stats.totalFunding)}</p>
                  <p className="text-xs text-gray-500">Available funding</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      {showFilters && (
        <Card className="border-2 border-blue-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Smart Scheme Discovery
            </CardTitle>
            <p className="text-sm text-gray-600">Find schemes matching your startup profile and funding needs</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search schemes by name, agency, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11"
              >
                <SelectItem value="">All Categories</SelectItem>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </Select>

              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="h-11"
              >
                <SelectItem value="">All India</SelectItem>
                <SelectItem value="central">Central Only</SelectItem>
                {INDIAN_STATES.map(state => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </Select>

              <Select
                value={selectedFundingRange}
                onChange={(e) => setSelectedFundingRange(e.target.value)}
                className="h-11"
              >
                <SelectItem value="">Any Amount</SelectItem>
                {FUNDING_RANGES.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </Select>

              <Button 
                onClick={getRecommendations} 
                className="h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Star className="h-4 w-4 mr-2" />
                Get Recommendations
              </Button>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedState('');
                  setSelectedFundingRange('');
                  setSearchTerm('');
                  setPage(1);
                }}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </Button>
              
              <div className="text-sm text-gray-600">
                {schemes.length > 0 && `${schemes.length} schemes found`}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Access Message */}
      {!loading && schemes.length === 0 && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="text-center py-12">
            <Target className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Premium Government Schemes Database
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Access our comprehensive database of 13+ verified government schemes with real-time data, 
              success rates, and personalized recommendations. Get funded faster with our proven strategies.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-white p-4 rounded-lg border">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">Verified Data</p>
                  <p className="text-sm text-gray-600">Current 2025 schemes</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium">AI Recommendations</p>
                  <p className="text-sm text-gray-600">Personalized matches</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium">Success Tracking</p>
                  <p className="text-sm text-gray-600">65-85% approval rates</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg">
                Upgrade to Access Premium Database
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schemes List */}
      {schemes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-transparent hover:border-blue-500" 
                  onClick={() => setSelectedScheme(scheme)}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getSchemeTypeColor(scheme.scheme_type)} variant="outline">
                    {scheme.scheme_type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-gray-600">{scheme.success_rate || 'N/A'}%</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{scheme.scheme_name}</CardTitle>
                <p className="text-sm text-gray-600">{scheme.implementing_agency}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Category:</span>
                    <Badge className={getCategoryColor(scheme.category)} variant="secondary">
                      {scheme.category.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Funding:</span>
                    <span className="font-medium text-green-600">
                      {scheme.funding_range || `${formatAmount(scheme.min_funding_amount)} - ${formatAmount(scheme.max_funding_amount)}`}
                    </span>
                  </div>
                  
                  {scheme.subsidy_percentage && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Subsidy:</span>
                      <span className="font-medium text-purple-600">
                        {scheme.subsidy_percentage}%
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Processing:</span>
                    <span className="font-medium">{scheme.average_approval_time || 'N/A'}</span>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {scheme.short_description || scheme.eligibility_criteria?.substring(0, 100) + '...'}
                    </p>
                  </div>
                  
                  <div className="pt-2 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {scheme.application_url && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                        <a href={scheme.application_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded">
            Page {page} of {totalPages}
          </span>
          
          <Button 
            variant="outline" 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedScheme.scheme_name}</CardTitle>
                  <p className="text-gray-600 mt-1">
                    {selectedScheme.implementing_agency} • {selectedScheme.scheme_type.replace('_', ' ').toUpperCase()}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getCategoryColor(selectedScheme.category)}>
                      {selectedScheme.category.toUpperCase()}
                    </Badge>
                    {selectedScheme.success_rate && (
                      <Badge variant="outline" className="text-green-600">
                        {selectedScheme.success_rate}% Success Rate
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedScheme(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="application">Application</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Financial Details
                        </h4>
                        <div className="bg-gray-50 p-3 rounded space-y-1">
                          <p><span className="font-medium">Amount:</span> {selectedScheme.funding_range}</p>
                          <p><span className="font-medium">Type:</span> {selectedScheme.funding_type?.replace('_', ' ')}</p>
                          {selectedScheme.subsidy_percentage && (
                            <p><span className="font-medium">Subsidy:</span> {selectedScheme.subsidy_percentage}%</p>
                          )}
                          {selectedScheme.interest_rate && (
                            <p><span className="font-medium">Interest:</span> {selectedScheme.interest_rate}%</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Timeline & Success
                        </h4>
                        <div className="bg-gray-50 p-3 rounded space-y-1">
                          <p><span className="font-medium">Processing:</span> {selectedScheme.average_approval_time || 'N/A'}</p>
                          <p><span className="font-medium">Success Rate:</span> {selectedScheme.success_rate || 'N/A'}%</p>
                          <p><span className="font-medium">Validity:</span> {selectedScheme.validity_period || 'Ongoing'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Target Beneficiaries</h4>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded">
                      {selectedScheme.target_beneficiaries || 'Startup entrepreneurs and MSMEs'}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="eligibility" className="mt-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Eligibility Criteria
                    </h4>
                    <div className="bg-gray-50 p-4 rounded space-y-2">
                      <p className="text-gray-700">{selectedScheme.eligibility_criteria}</p>
                      {selectedScheme.company_age_limit && (
                        <p><span className="font-medium">Company Age:</span> {selectedScheme.company_age_limit}</p>
                      )}
                      {selectedScheme.turnover_criteria && (
                        <p><span className="font-medium">Turnover:</span> {selectedScheme.turnover_criteria}</p>
                      )}
                      {selectedScheme.sector_focus && selectedScheme.sector_focus.length > 0 && (
                        <div>
                          <span className="font-medium">Sectors:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedScheme.sector_focus.map((sector, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {sector.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="application" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Application Process</h4>
                      <p className="text-gray-700 bg-yellow-50 p-3 rounded">{selectedScheme.application_process}</p>
                    </div>
                    
                    {selectedScheme.required_documents && selectedScheme.required_documents.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Required Documents</h4>
                        <ul className="list-disc list-inside space-y-1 bg-gray-50 p-3 rounded">
                          {selectedScheme.required_documents.map((doc, index) => (
                            <li key={index} className="text-gray-700">{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      {selectedScheme.application_url && (
                        <Button asChild className="flex-1">
                          <a href={selectedScheme.application_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apply Online
                          </a>
                        </Button>
                      )}
                      {selectedScheme.website_url && (
                        <Button variant="outline" asChild className="flex-1">
                          <a href={selectedScheme.website_url} target="_blank" rel="noopener noreferrer">
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {selectedScheme.contact_person && (
                        <div>
                          <h4 className="font-semibold">Contact Person</h4>
                          <p className="bg-gray-50 p-2 rounded">{selectedScheme.contact_person}</p>
                        </div>
                      )}
                      
                      {selectedScheme.contact_email && (
                        <div>
                          <h4 className="font-semibold">Email</h4>
                          <a href={`mailto:${selectedScheme.contact_email}`} 
                             className="text-blue-600 hover:underline bg-gray-50 p-2 rounded block">
                            {selectedScheme.contact_email}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {selectedScheme.contact_phone && (
                        <div>
                          <h4 className="font-semibold">Phone</h4>
                          <a href={`tel:${selectedScheme.contact_phone}`} 
                             className="text-blue-600 hover:underline bg-gray-50 p-2 rounded block">
                            {selectedScheme.contact_phone}
                          </a>
                        </div>
                      )}
                      
                      {selectedScheme.office_address && (
                        <div>
                          <h4 className="font-semibold">Office Address</h4>
                          <p className="text-gray-700 bg-gray-50 p-2 rounded">{selectedScheme.office_address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}