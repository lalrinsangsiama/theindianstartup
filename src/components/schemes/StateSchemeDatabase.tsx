'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, DollarSign, Clock, Building, Users, ExternalLink, Download } from 'lucide-react';

interface StateScheme {
  id: string;
  scheme_name: string;
  state_code: string;
  state_name: string;
  department: string;
  ministry: string;
  scheme_type: string;
  sector: string;
  min_grant_amount?: number;
  max_grant_amount?: number;
  subsidy_percentage?: number;
  interest_subvention?: number;
  eligibility_criteria: any;
  application_process: string;
  documents_required: string[];
  processing_time?: number;
  online_application: boolean;
  application_portal?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  office_address?: string;
  success_stories?: string;
  recent_updates?: string;
  special_provisions?: string;
  scheme_start_date?: string;
  scheme_end_date?: string;
  application_start?: string;
  application_end?: string;
}

interface SchemeStats {
  total_schemes: number;
  scheme_types: string[];
  sectors: string[];
  total_funding: number;
  states_covered: number;
}

interface StateSchemeProps {
  productCode?: string;
  showFilters?: boolean;
  defaultState?: string;
  defaultSector?: string;
  limit?: number;
}

const INDIAN_STATES = [
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar' },
  { code: 'CG', name: 'Chhattisgarh' },
  { code: 'GA', name: 'Goa' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HR', name: 'Haryana' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'LA', name: 'Ladakh' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MN', name: 'Manipur' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'OR', name: 'Odisha' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'TR', name: 'Tripura' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'UK', name: 'Uttarakhand' },
  { code: 'WB', name: 'West Bengal' },
  // Union Territories
  { code: 'AN', name: 'Andaman and Nicobar Islands' },
  { code: 'CH', name: 'Chandigarh' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: 'DL', name: 'Delhi' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'PY', name: 'Puducherry' }
];

const SECTORS = [
  'manufacturing', 'technology', 'agriculture', 'services', 'renewable_energy',
  'textiles', 'pharmaceuticals', 'automotive', 'food_processing', 'tourism',
  'defense', 'aerospace', 'chemicals', 'electronics', 'export', 'organic_agriculture'
];

const SCHEME_TYPES = ['subsidy', 'grant', 'tax_benefit', 'infrastructure', 'loan'];

export default function StateSchemeDatabase({ 
  productCode = 'P7', 
  showFilters = true, 
  defaultState, 
  defaultSector, 
  limit = 20 
}: StateSchemeProps) {
  const [schemes, setSchemes] = useState<StateScheme[]>([]);
  const [stats, setStats] = useState<SchemeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [selectedState, setSelectedState] = useState(defaultState || '');
  const [selectedSector, setSelectedSector] = useState(defaultSector || '');
  const [selectedType, setSelectedType] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedScheme, setSelectedScheme] = useState<StateScheme | null>(null);

  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      if (selectedState) params.append('state', selectedState);
      if (selectedSector) params.append('sector', selectedSector);
      if (selectedType) params.append('type', selectedType);
      if (minAmount) params.append('min_amount', minAmount);
      if (maxAmount) params.append('max_amount', maxAmount);

      const response = await fetch(`/api/schemes/state-schemes?${params}`);
      const data = await response.json();

      if (data.schemes) {
        setSchemes(data.schemes);
        setStats(data.stats);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      logger.error('Failed to fetch schemes:', error);
    } finally {
      setLoading(false);
    }
  }, [limit, page, selectedState, selectedSector, selectedType, minAmount, maxAmount]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const filteredSchemes = schemes.filter(scheme =>
    scheme.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount?: number) => {
    if (!amount) return 'N/A';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getSchemeTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'subsidy': 'bg-blue-100 text-blue-800',
      'grant': 'bg-green-100 text-green-800',
      'tax_benefit': 'bg-purple-100 text-purple-800',
      'infrastructure': 'bg-orange-100 text-orange-800',
      'loan': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const exportSchemes = () => {
    const csvContent = [
      ['Scheme Name', 'State', 'Department', 'Type', 'Sector', 'Min Amount', 'Max Amount', 'Subsidy %', 'Processing Time', 'Contact Email'].join(','),
      ...filteredSchemes.map(scheme => [
        scheme.scheme_name,
        scheme.state_name,
        scheme.department,
        scheme.scheme_type,
        scheme.sector,
        scheme.min_grant_amount || 0,
        scheme.max_grant_amount || 0,
        scheme.subsidy_percentage || 0,
        scheme.processing_time || 0,
        scheme.contact_email || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `state-schemes-${selectedState || 'all'}-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Schemes</p>
                  <p className="text-2xl font-bold">{stats.total_schemes.toLocaleString()}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">States Covered</p>
                  <p className="text-2xl font-bold">{stats.states_covered}</p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Funding</p>
                  <p className="text-2xl font-bold">{formatAmount(stats.total_funding)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Processing</p>
                  <p className="text-2xl font-bold">75 days</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Schemes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search schemes by name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {INDIAN_STATES.map(state => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sectors</SelectItem>
                  {SECTORS.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector.replace('_', ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Scheme Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {SCHEME_TYPES.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Min Amount (₹)"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                type="number"
              />
              
              <Input
                placeholder="Max Amount (₹)"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                type="number"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedState('');
                  setSelectedSector('');
                  setSelectedType('');
                  setMinAmount('');
                  setMaxAmount('');
                  setSearchTerm('');
                  setPage(1);
                }}
              >
                Clear Filters
              </Button>
              
              <Button onClick={exportSchemes} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export to CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schemes List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading schemes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => setSelectedScheme(scheme)}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className={getSchemeTypeColor(scheme.scheme_type)}>
                    {scheme.scheme_type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{scheme.state_code}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{scheme.scheme_name}</CardTitle>
                <p className="text-sm text-gray-600">{scheme.department}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Sector:</span>
                    <Badge variant="secondary">
                      {scheme.sector.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  {scheme.min_grant_amount && scheme.max_grant_amount && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="font-medium">
                        {formatAmount(scheme.min_grant_amount)} - {formatAmount(scheme.max_grant_amount)}
                      </span>
                    </div>
                  )}
                  
                  {scheme.subsidy_percentage && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Subsidy:</span>
                      <span className="font-medium text-green-600">
                        {scheme.subsidy_percentage}%
                      </span>
                    </div>
                  )}
                  
                  {scheme.processing_time && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Processing:</span>
                      <span className="font-medium">{scheme.processing_time} days</span>
                    </div>
                  )}
                  
                  {scheme.application_portal && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={scheme.application_portal} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Apply Online
                        </a>
                      </Button>
                    </div>
                  )}
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
          
          <span className="px-4 py-2">
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
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedScheme.scheme_name}</CardTitle>
                  <p className="text-gray-600 mt-1">
                    {selectedScheme.department} • {selectedScheme.state_name}
                  </p>
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
            
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="application">Application</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Financial Details</h4>
                      {selectedScheme.min_grant_amount && (
                        <p><span className="font-medium">Min Amount:</span> {formatAmount(selectedScheme.min_grant_amount)}</p>
                      )}
                      {selectedScheme.max_grant_amount && (
                        <p><span className="font-medium">Max Amount:</span> {formatAmount(selectedScheme.max_grant_amount)}</p>
                      )}
                      {selectedScheme.subsidy_percentage && (
                        <p><span className="font-medium">Subsidy:</span> {selectedScheme.subsidy_percentage}%</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Scheme Details</h4>
                      <p><span className="font-medium">Type:</span> {selectedScheme.scheme_type.replace('_', ' ').toUpperCase()}</p>
                      <p><span className="font-medium">Sector:</span> {selectedScheme.sector.replace('_', ' ').toUpperCase()}</p>
                      <p><span className="font-medium">Ministry:</span> {selectedScheme.ministry}</p>
                      {selectedScheme.processing_time && (
                        <p><span className="font-medium">Processing Time:</span> {selectedScheme.processing_time} days</p>
                      )}
                    </div>
                  </div>
                  
                  {selectedScheme.special_provisions && (
                    <div>
                      <h4 className="font-semibold mb-2">Special Provisions</h4>
                      <p className="text-gray-700">{selectedScheme.special_provisions}</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="eligibility">
                  <div>
                    <h4 className="font-semibold mb-3">Eligibility Criteria</h4>
                    {selectedScheme.eligibility_criteria && (
                      <div className="space-y-2">
                        {Object.entries(selectedScheme.eligibility_criteria).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-medium w-32 capitalize">{key.replace('_', ' ')}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="application">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Application Process</h4>
                      <p className="text-gray-700">{selectedScheme.application_process}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Required Documents</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedScheme.documents_required.map((doc, index) => (
                          <li key={index} className="text-gray-700">{doc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedScheme.application_portal && (
                      <div>
                        <h4 className="font-semibold mb-2">Apply Online</h4>
                        <Button asChild className="w-full">
                          <a href={selectedScheme.application_portal} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Application Portal
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="contact">
                  <div className="space-y-4">
                    {selectedScheme.contact_person && (
                      <div>
                        <h4 className="font-semibold">Contact Person</h4>
                        <p>{selectedScheme.contact_person}</p>
                      </div>
                    )}
                    
                    {selectedScheme.contact_email && (
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <a href={`mailto:${selectedScheme.contact_email}`} 
                           className="text-blue-600 hover:underline">
                          {selectedScheme.contact_email}
                        </a>
                      </div>
                    )}
                    
                    {selectedScheme.contact_phone && (
                      <div>
                        <h4 className="font-semibold">Phone</h4>
                        <a href={`tel:${selectedScheme.contact_phone}`} 
                           className="text-blue-600 hover:underline">
                          {selectedScheme.contact_phone}
                        </a>
                      </div>
                    )}
                    
                    {selectedScheme.office_address && (
                      <div>
                        <h4 className="font-semibold">Office Address</h4>
                        <p className="text-gray-700">{selectedScheme.office_address}</p>
                      </div>
                    )}
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