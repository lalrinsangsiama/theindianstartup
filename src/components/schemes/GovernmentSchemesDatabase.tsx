'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { 
  Search, 
  Filter, 
  Building,
  IndianRupee,
  Calendar,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  ArrowRight,
  Download,
  ExternalLink,
  MapPin,
  Target,
  TrendingUp,
  FileText,
  Info,
  Star,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Package,
  X
} from 'lucide-react';
import { EligibilityChecker } from './EligibilityChecker';

interface Scheme {
  id: string;
  name: string;
  ministry: string;
  state?: string;
  category: string;
  fundingAmount: {
    min: number;
    max: number;
  };
  eligibility: string[];
  benefits: string[];
  applicationDeadline?: string;
  processingTime: string;
  documentsRequired: string[];
  applicationProcess: string[];
  successRate?: number;
  popularity: number;
  tags: string[];
  websiteUrl?: string;
  applicationUrl?: string;
  status: 'active' | 'upcoming' | 'closed';
  lastUpdated: string;
}

interface SchemeFilters {
  search: string;
  category: string;
  fundingRange: string;
  state: string;
  ministry: string;
  status: string;
}

const categories = [
  { id: 'all', name: 'All Categories', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'seed-funding', name: 'Seed Funding', icon: <Zap className="w-4 h-4" /> },
  { id: 'grants', name: 'Grants', icon: <IndianRupee className="w-4 h-4" /> },
  { id: 'subsidies', name: 'Subsidies', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'tax-benefits', name: 'Tax Benefits', icon: <Shield className="w-4 h-4" /> },
  { id: 'incubation', name: 'Incubation', icon: <Building className="w-4 h-4" /> },
  { id: 'export-promotion', name: 'Export Promotion', icon: <Package className="w-4 h-4" /> }
];

const fundingRanges = [
  { id: 'all', name: 'All Amounts' },
  { id: '0-10', name: 'Up to ₹10 Lakhs' },
  { id: '10-50', name: '₹10-50 Lakhs' },
  { id: '50-100', name: '₹50 Lakhs - 1 Crore' },
  { id: '100+', name: 'Above ₹1 Crore' }
];

const states = [
  { id: 'all', name: 'All States' },
  { id: 'central', name: 'Central Government' },
  { id: 'karnataka', name: 'Karnataka' },
  { id: 'maharashtra', name: 'Maharashtra' },
  { id: 'tamil-nadu', name: 'Tamil Nadu' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'telangana', name: 'Telangana' },
  { id: 'gujarat', name: 'Gujarat' },
  { id: 'rajasthan', name: 'Rajasthan' },
  { id: 'west-bengal', name: 'West Bengal' }
];

// Mock data - In production, this would come from an API
const schemesData: Scheme[] = [
  {
    id: '1',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    ministry: 'Department for Promotion of Industry and Internal Trade',
    category: 'seed-funding',
    fundingAmount: { min: 2000000, max: 5000000 },
    eligibility: [
      'DPIIT recognized startup',
      'Incorporated not more than 2 years ago',
      'Not received funding exceeding ₹10 lakhs',
      'Indian registered entity'
    ],
    benefits: [
      'Up to ₹50 lakhs funding',
      'No equity dilution',
      'Mentorship support',
      'Networking opportunities'
    ],
    processingTime: '3-4 months',
    documentsRequired: [
      'DPIIT recognition certificate',
      'Business plan',
      'Financial projections',
      'Pitch deck',
      'Incorporation documents'
    ],
    applicationProcess: [
      'Apply through approved incubator',
      'Pitch to incubator committee',
      'Due diligence process',
      'Final approval from DPIIT'
    ],
    successRate: 15,
    popularity: 95,
    tags: ['seed-funding', 'no-equity', 'dpiit'],
    websiteUrl: 'https://seedfund.startupindia.gov.in/',
    applicationUrl: 'https://seedfund.startupindia.gov.in/apply',
    status: 'active',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'MSME Champions Scheme',
    ministry: 'Ministry of MSME',
    category: 'grants',
    fundingAmount: { min: 500000, max: 10000000 },
    eligibility: [
      'Registered MSME',
      'Minimum 1 year of operations',
      'Annual turnover less than ₹250 crores',
      'Valid Udyam registration'
    ],
    benefits: [
      'ZED certification support',
      'Technology upgradation grant',
      'IPR registration support',
      'Marketing assistance'
    ],
    processingTime: '2-3 months',
    documentsRequired: [
      'Udyam registration',
      'Financial statements',
      'Project report',
      'Bank statements'
    ],
    applicationProcess: [
      'Online application submission',
      'Document verification',
      'Site inspection',
      'Approval and disbursement'
    ],
    successRate: 35,
    popularity: 80,
    tags: ['msme', 'grants', 'technology'],
    websiteUrl: 'https://champions.gov.in/msme',
    status: 'active',
    lastUpdated: '2024-01-20'
  },
  {
    id: '3',
    name: 'Karnataka Startup Policy - Idea2PoC Grant',
    ministry: 'Karnataka Innovation and Technology Society',
    state: 'karnataka',
    category: 'grants',
    fundingAmount: { min: 5000000, max: 5000000 },
    eligibility: [
      'Karnataka-based startup',
      'Technology-based solution',
      'Prototype stage',
      'Team of at least 2 founders'
    ],
    benefits: [
      '₹50 lakh grant',
      'Incubation support',
      'Mentorship from industry experts',
      'Access to testing facilities'
    ],
    processingTime: '2 months',
    documentsRequired: [
      'Detailed project proposal',
      'Technical specifications',
      'Team profiles',
      'IP documentation'
    ],
    applicationProcess: [
      'Submit online application',
      'Technical evaluation',
      'Presentation to committee',
      'Grant agreement signing'
    ],
    successRate: 20,
    popularity: 75,
    tags: ['karnataka', 'proof-of-concept', 'tech'],
    websiteUrl: 'https://startup.karnataka.gov.in/',
    status: 'active',
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    name: 'Credit Guarantee Scheme for Startups (CGSS)',
    ministry: 'SIDBI',
    category: 'subsidies',
    fundingAmount: { min: 1000000, max: 100000000 },
    eligibility: [
      'DPIIT recognized startup',
      'Seeking debt funding',
      'Minimum 6 months operations',
      'Positive unit economics'
    ],
    benefits: [
      'Credit guarantee up to ₹10 crores',
      'No collateral required',
      'Lower interest rates',
      'Faster loan approval'
    ],
    processingTime: '1 month',
    documentsRequired: [
      'DPIIT certificate',
      'Business financials',
      'Bank statements',
      'Loan application'
    ],
    applicationProcess: [
      'Apply through partner bank',
      'SIDBI evaluation',
      'Guarantee approval',
      'Loan disbursement'
    ],
    successRate: 45,
    popularity: 85,
    tags: ['debt', 'guarantee', 'collateral-free'],
    websiteUrl: 'https://www.sidbi.in/cgss',
    status: 'active',
    lastUpdated: '2024-01-18'
  },
  {
    id: '5',
    name: 'Atal Innovation Mission - AIM Grant',
    ministry: 'NITI Aayog',
    category: 'incubation',
    fundingAmount: { min: 1000000, max: 10000000 },
    eligibility: [
      'Innovative solution',
      'Social impact focus',
      'Scalable business model',
      'Team commitment'
    ],
    benefits: [
      'Grant-in-aid funding',
      'Incubation at AIM centers',
      'Mentorship network',
      'Market access support'
    ],
    processingTime: '3 months',
    documentsRequired: [
      'Innovation proposal',
      'Impact assessment',
      'Business plan',
      'Team credentials'
    ],
    applicationProcess: [
      'Submit through AIM portal',
      'Screening by experts',
      'Bootcamp participation',
      'Final selection'
    ],
    successRate: 10,
    popularity: 90,
    tags: ['innovation', 'social-impact', 'incubation'],
    websiteUrl: 'https://aim.gov.in/',
    status: 'upcoming',
    lastUpdated: '2024-01-22'
  }
];

export function GovernmentSchemesDatabase() {
  const [schemes, setSchemes] = useState<Scheme[]>(schemesData);
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);
  const [selectedSchemeForEligibility, setSelectedSchemeForEligibility] = useState<Scheme | null>(null);
  
  const [filters, setFilters] = useState<SchemeFilters>({
    search: '',
    category: 'all',
    fundingRange: 'all',
    state: 'all',
    ministry: '',
    status: 'all'
  });

  // Filter schemes based on current filters
  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!scheme.name.toLowerCase().includes(searchLower) &&
            !scheme.ministry.toLowerCase().includes(searchLower) &&
            !scheme.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && scheme.category !== filters.category) {
        return false;
      }

      // Funding range filter
      if (filters.fundingRange !== 'all') {
        const [min, max] = filters.fundingRange.split('-').map(n => parseInt(n) * 100000);
        if (max) {
          if (scheme.fundingAmount.min > max || scheme.fundingAmount.max < min) {
            return false;
          }
        } else {
          // 100+ case
          if (scheme.fundingAmount.max < 10000000) {
            return false;
          }
        }
      }

      // State filter
      if (filters.state !== 'all') {
        if (filters.state === 'central' && scheme.state) {
          return false;
        }
        if (filters.state !== 'central' && scheme.state !== filters.state) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'all' && scheme.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [schemes, filters]);

  const handleFilterChange = (key: keyof SchemeFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSaveScheme = (schemeId: string) => {
    setSavedSchemes(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const downloadSchemeDetails = (scheme: Scheme) => {
    // In production, this would generate a PDF
    const details = `
${scheme.name}
Ministry: ${scheme.ministry}
Funding: ₹${scheme.fundingAmount.min / 100000}L - ₹${scheme.fundingAmount.max / 100000}L

Eligibility:
${scheme.eligibility.map(e => `- ${e}`).join('\n')}

Benefits:
${scheme.benefits.map(b => `- ${b}`).join('\n')}

Documents Required:
${scheme.documentsRequired.map(d => `- ${d}`).join('\n')}

Application Process:
${scheme.applicationProcess.map((p, i) => `${i + 1}. ${p}`).join('\n')}
    `;
    
    const blob = new Blob([details], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.name.replace(/\s+/g, '_')}_details.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Building className="w-5 h-5 text-blue-600" />
              <Badge size="sm" variant="outline">Total</Badge>
            </div>
            <Text className="text-2xl font-bold">{schemes.length}</Text>
            <Text size="sm" color="muted">Government Schemes</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Badge size="sm" className="bg-green-100 text-green-700">Active</Badge>
            </div>
            <Text className="text-2xl font-bold">
              {schemes.filter(s => s.status === 'active').length}
            </Text>
            <Text size="sm" color="muted">Open for Application</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <IndianRupee className="w-5 h-5 text-orange-600" />
              <Text size="xs" className="text-orange-600">Max</Text>
            </div>
            <Text className="text-2xl font-bold">₹10Cr</Text>
            <Text size="sm" color="muted">Highest Funding</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-5 h-5 text-purple-600" />
              <Badge size="sm" className="bg-purple-100 text-purple-700">Saved</Badge>
            </div>
            <Text className="text-2xl font-bold">{savedSchemes.length}</Text>
            <Text size="sm" color="muted">Bookmarked</Text>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search schemes by name, ministry, or tags..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="min-w-[120px]"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t">
              <div>
                <Text size="sm" weight="medium" className="mb-2">Category</Text>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Text size="sm" weight="medium" className="mb-2">Funding Range</Text>
                <select
                  value={filters.fundingRange}
                  onChange={(e) => handleFilterChange('fundingRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  {fundingRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Text size="sm" weight="medium" className="mb-2">State/Central</Text>
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Text size="sm" weight="medium" className="mb-2">Status</Text>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(1).map(cat => (
          <Button
            key={cat.id}
            size="sm"
            variant={filters.category === cat.id ? 'primary' : 'outline'}
            onClick={() => handleFilterChange('category', cat.id)}
            className="flex items-center gap-1"
          >
            {cat.icon}
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <Text color="muted">No schemes found matching your criteria</Text>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setFilters({
                  search: '',
                  category: 'all',
                  fundingRange: 'all',
                  state: 'all',
                  ministry: '',
                  status: 'all'
                })}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredSchemes.map(scheme => (
            <Card
              key={scheme.id}
              className={`
                border-2 transition-all cursor-pointer
                ${selectedScheme?.id === scheme.id ? 'border-black shadow-lg' : 'border-gray-200 hover:border-gray-400'}
              `}
              onClick={() => setSelectedScheme(scheme.id === selectedScheme?.id ? null : scheme)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Heading as="h3" variant="h5" className="mb-1">
                          {scheme.name}
                        </Heading>
                        <Text size="sm" color="muted">
                          {scheme.ministry} {scheme.state && `• ${scheme.state.charAt(0).toUpperCase() + scheme.state.slice(1)}`}
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        {scheme.status === 'active' && (
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        )}
                        {scheme.status === 'upcoming' && (
                          <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
                        )}
                        {scheme.status === 'closed' && (
                          <Badge variant="outline" className="text-gray-500">Closed</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        <Text size="sm" weight="medium">
                          ₹{scheme.fundingAmount.min / 100000}L - ₹{scheme.fundingAmount.max / 100000}L
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <Text size="sm">{scheme.processingTime}</Text>
                      </div>
                      {scheme.successRate && (
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-gray-500" />
                          <Text size="sm">{scheme.successRate}% success rate</Text>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {scheme.tags.map(tag => (
                        <Badge key={tag} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveScheme(scheme.id);
                      }}
                    >
                      <Star className={`w-4 h-4 ${savedSchemes.includes(scheme.id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    </Button>
                    {scheme.websiteUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(scheme.websiteUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadSchemeDetails(scheme);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedScheme?.id === scheme.id && (
                  <div className="mt-6 pt-6 border-t space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Text weight="medium" className="mb-3">Eligibility Criteria</Text>
                        <ul className="space-y-2">
                          {scheme.eligibility.map((criteria, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <Text size="sm">{criteria}</Text>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <Text weight="medium" className="mb-3">Key Benefits</Text>
                        <ul className="space-y-2">
                          {scheme.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <Text size="sm">{benefit}</Text>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <Text weight="medium" className="mb-3">Documents Required</Text>
                      <div className="grid md:grid-cols-2 gap-2">
                        {scheme.documentsRequired.map((doc, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <Text size="sm">{doc}</Text>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Text weight="medium" className="mb-3">Application Process</Text>
                      <div className="space-y-3">
                        {scheme.applicationProcess.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </div>
                            <Text size="sm">{step}</Text>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      {scheme.applicationUrl && (
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(scheme.applicationUrl, '_blank');
                          }}
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEligibilityChecker(true);
                          setSelectedSchemeForEligibility(scheme);
                        }}
                      >
                        Check Eligibility
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Saved Schemes Summary */}
      {savedSchemes.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Heading as="h4" variant="h5" className="mb-1">
                  Your Saved Schemes ({savedSchemes.length})
                </Heading>
                <Text size="sm" color="muted">
                  Download all scheme details or create a comparison sheet
                </Text>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Compare Schemes
                </Button>
                <Button size="sm">
                  Download All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Eligibility Checker Modal */}
      {showEligibilityChecker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <Heading as="h2" variant="h4">
                  Eligibility Checker
                </Heading>
                {selectedSchemeForEligibility && (
                  <Text size="sm" color="muted">
                    Checking eligibility for: {selectedSchemeForEligibility.name}
                  </Text>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowEligibilityChecker(false);
                  setSelectedSchemeForEligibility(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <EligibilityChecker 
                onComplete={(results) => {
                  logger.info('Eligibility results:', results);
                  // Could integrate with the main component state
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}