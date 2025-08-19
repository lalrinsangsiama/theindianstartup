'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Heading, Text } from '@/components/ui/Typography';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Building,
  Award,
  Clock,
  CheckCircle,
  ExternalLink,
  Mail,
  TrendingUp,
  Target,
  Briefcase,
  Loader2
} from 'lucide-react';

interface IncubatorScheme {
  incubator_name: string;
  program_name: string;
  program_duration: number;
  batch_size: number;
  batches_per_year: number;
  seed_funding: number;
  office_space: boolean;
  mentorship: boolean;
  legal_support: boolean;
  tech_credits: boolean;
  lab_access: boolean;
  equity_taken: number;
  program_fee: number;
  demo_day: boolean;
  application_deadline: string;
  next_batch_date: string;
  selection_process: string;
  alumni_count: number;
  successful_exits: number;
  total_funding_raised: number;
  min_team_size: number;
  max_team_size: number;
  mvp_required: boolean;
  revenue_required: boolean;
  min_revenue: number;
}

interface FundingCategory {
  name: string;
  icon: string;
}

interface IncubatorData {
  id: string;
  name: string;
  description: string;
  type: string;
  min_funding: number;
  max_funding: number;
  location_type: string;
  specific_location: string;
  sectors: string[];
  stage: string[];
  website: string;
  contact_email: string;
  success_rate: number;
  avg_decision_time: number;
  equity_required: boolean;
  tags: string[];
  funding_categories: FundingCategory;
  incubator_schemes: IncubatorScheme[];
}

interface IncubatorDatabaseProps {
  userProducts?: string[];
  hasAccess?: boolean;
}

const IncubatorDatabase: React.FC<IncubatorDatabaseProps> = ({ 
  userProducts = [], 
  hasAccess = false 
}) => {
  const [incubators, setIncubators] = useState<IncubatorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fundingRange, setFundingRange] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);
  
  // Filter options
  const [sectors, setSectors] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [fundingRanges] = useState([
    { label: 'Under ₹10L', value: '0-1000000' },
    { label: '₹10L - ₹50L', value: '1000000-5000000' },
    { label: '₹50L - ₹2Cr', value: '5000000-20000000' },
    { label: '₹2Cr+', value: '20000000-999999999' }
  ]);

  useEffect(() => {
    fetchIncubators();
  }, [selectedSector, selectedLocation, fundingRange, showFeatured]);

  const fetchIncubators = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedSector) params.append('sector', selectedSector);
      if (selectedLocation) params.append('location', selectedLocation);
      if (fundingRange) params.append('fundingRange', fundingRange);
      if (showFeatured) params.append('featured', 'true');
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/funding/incubators?${params}`);
      const data = await response.json();

      if (data.success) {
        setIncubators(data.data);
        setSectors(data.filters.sectors);
        setLocations(data.filters.locations);
      }
    } catch (error) {
      console.error('Error fetching incubators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchIncubators();
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const IncubatorCard = ({ incubator }: { incubator: IncubatorData }) => {
    const scheme = incubator.incubator_schemes?.[0];
    
    return (
      <Card className="h-full transition-all hover:shadow-lg hover:border-gray-400 group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg mb-1 group-hover:text-blue-600 transition-colors">
                {incubator.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {incubator.specific_location}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={incubator.type === 'accelerator' ? 'default' : 'outline'}>
                {incubator.type}
              </Badge>
              <div className="text-xs text-gray-500">
                {incubator.success_rate}% success
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Text size="sm" color="muted" className="mb-4 line-clamp-2">
            {incubator.description}
          </Text>

          {/* Key Program Details */}
          {scheme && (
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>{formatCurrency(scheme.seed_funding || 0)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{scheme.program_duration} months</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Batch: {scheme.batch_size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span>{scheme.equity_taken || 0}% equity</span>
              </div>
            </div>
          )}

          {/* Support Offered */}
          {scheme && (
            <div className="flex flex-wrap gap-1 mb-4">
              {scheme.office_space && <Badge size="sm" variant="outline">Office Space</Badge>}
              {scheme.mentorship && <Badge size="sm" variant="outline">Mentorship</Badge>}
              {scheme.legal_support && <Badge size="sm" variant="outline">Legal Support</Badge>}
              {scheme.tech_credits && <Badge size="sm" variant="outline">Tech Credits</Badge>}
              {scheme.lab_access && <Badge size="sm" variant="outline">Lab Access</Badge>}
            </div>
          )}

          {/* Sectors */}
          <div className="mb-4">
            <Text size="xs" color="muted" className="mb-1">Focus Areas:</Text>
            <div className="flex flex-wrap gap-1">
              {incubator.sectors.slice(0, 3).map((sector, index) => (
                <Badge key={index} size="sm" variant="secondary">
                  {sector}
                </Badge>
              ))}
              {incubator.sectors.length > 3 && (
                <Badge size="sm" variant="secondary">
                  +{incubator.sectors.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Success Metrics */}
          {scheme && (scheme.alumni_count || scheme.successful_exits) && (
            <div className="flex gap-4 mb-4 text-xs text-gray-600">
              {scheme.alumni_count && (
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {scheme.alumni_count} Alumni
                </div>
              )}
              {scheme.successful_exits && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {scheme.successful_exits} Exits
                </div>
              )}
            </div>
          )}

          {/* Application Status */}
          {scheme?.next_batch_date && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Next Batch:</span>
                <span>{new Date(scheme.next_batch_date).toLocaleDateString()}</span>
              </div>
              {scheme.application_deadline && (
                <div className="text-xs text-gray-600 mt-1">
                  Apply by: {new Date(scheme.application_deadline).toLocaleDateString()}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {incubator.website && (
              <Button variant="primary" size="sm" className="flex-1" asChild>
                <a href={incubator.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </a>
              </Button>
            )}
            {incubator.contact_email && (
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${incubator.contact_email}`}>
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Access Control */}
          {!hasAccess && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Text size="sm" className="text-yellow-800">
                Unlock detailed application insights and success strategies with P3 Funding Course
              </Text>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Access Control Component
  if (!hasAccess) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-purple-600" />
        </div>
        <Heading as="h3" variant="h4" className="mb-3">
          Access 700+ Verified Incubators
        </Heading>
        <Text className="mb-6 max-w-2xl mx-auto">
          Get detailed profiles, application strategies, success rates, and insider tips from 
          our comprehensive incubator database. Available with P3 Funding Course.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
          <div className="p-3 bg-white rounded-lg border border-purple-100">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <Text size="sm" weight="medium">200+ Indian Programs</Text>
          </div>
          <div className="p-3 bg-white rounded-lg border border-purple-100">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <Text size="sm" weight="medium">500+ Global Programs</Text>
          </div>
          <div className="p-3 bg-white rounded-lg border border-purple-100">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <Text size="sm" weight="medium">Application Templates</Text>
          </div>
        </div>
        <Button variant="primary" size="lg" asChild>
          <a href="/pricing">
            <Briefcase className="w-5 h-5 mr-2" />
            Unlock Incubator Database
          </a>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Heading as="h2" variant="h3" className="mb-2">
          Global Incubator Database
        </Heading>
        <Text color="muted" className="mb-4">
          Discover and apply to 700+ verified incubators and accelerators worldwide
        </Text>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search incubators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={fundingRange}
                onChange={(e) => setFundingRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Funding Ranges</option>
                {fundingRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={showFeatured}
                  onChange={(e) => setShowFeatured(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm">
                  Featured Only
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <Text className="ml-2">Loading incubators...</Text>
        </div>
      ) : (
        <>
          {/* Results Stats */}
          <div className="flex items-center justify-between">
            <Text color="muted">
              Found {incubators.length} incubators
            </Text>
          </div>

          {/* Incubator Grid */}
          {incubators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {incubators.map((incubator) => (
                <IncubatorCard key={incubator.id} incubator={incubator} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <Heading as="h4" variant="h5" className="mb-2">
                No Incubators Found
              </Heading>
              <Text color="muted">
                Try adjusting your search criteria or filters
              </Text>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default IncubatorDatabase;