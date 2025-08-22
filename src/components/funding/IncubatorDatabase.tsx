'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
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

interface IncubatorData {
  id: string;
  name: string;
  type: string;
  city: string;
  sectors: string[];
  stage_focus: string[];
  website: string;
  description: string;
  total_startups_supported: number;
  success_stories: string[];
  program_duration_weeks: number;
  equity_stake: number;
  funding_amount_max: number;
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
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Filter options from API
  const [cities, setCities] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchIncubators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, selectedSector, selectedStage, selectedType]);

  const fetchIncubators = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('query', searchTerm);
      if (selectedCity) params.append('city', selectedCity);
      if (selectedSector) params.append('sector', selectedSector);
      if (selectedStage) params.append('stage', selectedStage);
      if (selectedType) params.append('type', selectedType);

      const response = await fetch(`/api/incubators?${params}`);
      const data = await response.json();

      if (data.success) {
        setIncubators(data.data.incubators || []);
        setCities(data.data.filters.cities || []);
        setSectors(data.data.filters.sectors || []);
        setStages(data.data.filters.stages || []);
        setTypes(data.data.filters.types || []);
      }
    } catch (error) {
      logger.error('Error fetching incubators:', error);
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
    const getTypeColor = (type: string) => {
      switch (type?.toLowerCase()) {
        case 'academic': return 'bg-blue-100 text-blue-800';
        case 'government': return 'bg-green-100 text-green-800';
        case 'corporate': return 'bg-purple-100 text-purple-800';
        case 'private': return 'bg-orange-100 text-orange-800';
        case 'sector_specific': return 'bg-teal-100 text-teal-800';
        case 'accelerator': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
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
                {incubator.city}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge className={getTypeColor(incubator.type)}>
                {incubator.type}
              </Badge>
              {incubator.total_startups_supported && (
                <div className="text-xs text-gray-500">
                  {incubator.total_startups_supported}+ startups
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Text size="sm" color="muted" className="mb-4 line-clamp-2">
            {incubator.description}
          </Text>

          {/* Key Program Details */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            {incubator.funding_amount_max && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Up to {formatCurrency(incubator.funding_amount_max)}</span>
              </div>
            )}
            {incubator.program_duration_weeks && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{incubator.program_duration_weeks} weeks</span>
              </div>
            )}
            {incubator.total_startups_supported && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>{incubator.total_startups_supported}+ supported</span>
              </div>
            )}
            {incubator.equity_stake && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span>{incubator.equity_stake}% equity</span>
              </div>
            )}
          </div>

          {/* Sectors */}
          <div className="mb-4">
            <Text size="xs" color="muted" className="mb-1">Focus Areas:</Text>
            <div className="flex flex-wrap gap-1">
              {incubator.sectors.slice(0, 3).map((sector, index) => (
                <Badge key={index} size="sm" variant="default">
                  {sector}
                </Badge>
              ))}
              {incubator.sectors.length > 3 && (
                <Badge size="sm" variant="default">
                  +{incubator.sectors.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Stage Focus */}
          <div className="mb-4">
            <Text size="xs" color="muted" className="mb-1">Stage Focus:</Text>
            <div className="flex flex-wrap gap-1">
              {incubator.stage_focus.slice(0, 3).map((stage, index) => (
                <Badge key={index} size="sm" variant="secondary">
                  {stage.replace('_', ' ')}
                </Badge>
              ))}
              {incubator.stage_focus.length > 3 && (
                <Badge size="sm" variant="secondary">
                  +{incubator.stage_focus.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Success Stories */}
          {incubator.success_stories && incubator.success_stories.length > 0 && (
            <div className="mb-4">
              <Text size="xs" color="muted" className="mb-1">Success Stories:</Text>
              <div className="flex flex-wrap gap-1">
                {incubator.success_stories.slice(0, 2).map((story, index) => (
                  <Badge key={index} size="sm" variant="outline">
                    {story.replace('_', ' ')}
                  </Badge>
                ))}
                {incubator.success_stories.length > 2 && (
                  <Badge size="sm" variant="outline">
                    +{incubator.success_stories.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {incubator.website && (
              <a href={incubator.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
              </a>
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
          Access 18+ Verified Incubators & Accelerators
        </Heading>
        <Text className="mb-6 max-w-2xl mx-auto">
          Get detailed profiles, application strategies, success rates, and insider tips from 
          our comprehensive incubator database with real, current data. Available with P3 Funding Course.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
          <div className="p-3 bg-white rounded-lg border border-purple-100">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <Text size="sm" weight="medium">18+ Verified Programs</Text>
          </div>
          <div className="p-3 bg-white rounded-lg border border-purple-100">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <Text size="sm" weight="medium">Real Contact Details</Text>
          </div>
          <div className="p-3 bg-white rounded-lg border border-purple-100">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <Text size="sm" weight="medium">Current Program Data</Text>
          </div>
        </div>
        <a href="/pricing">
          <Button variant="primary" size="lg">
            <Briefcase className="w-5 h-5 mr-2" />
            Unlock Incubator Database
          </Button>
        </a>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Heading as="h2" variant="h3" className="mb-2">
          Indian Incubator & Accelerator Database
        </Heading>
        <Text color="muted" className="mb-4">
          Discover and apply to 18+ verified incubators and accelerators with real, current data
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
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

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
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Stages</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage.replace('_', ' ')}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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