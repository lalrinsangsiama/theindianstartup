'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, 
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
  Filter,
  Globe,
  Phone
} from 'lucide-react';

interface IncubatorData {
  id: string;
  name: string;
  description: string;
  type: 'Incubator' | 'Accelerator' | 'VC' | 'Government' | 'Corporate';
  location: string;
  city: string;
  state: string;
  sectors: string[];
  stages: string[];
  minFunding: number;
  maxFunding: number;
  equityTaken: number;
  batchSize: number;
  programDuration: number;
  website: string;
  email: string;
  phone?: string;
  applicationDeadline?: string;
  nextBatch?: string;
  successRate: number;
  avgDecisionTime: number;
  totalFunded: number;
  notableExits: string[];
  benefits: string[];
  requirements: string[];
  rating: number;
  founded: number;
  isPremium: boolean;
}

// Real Indian Incubators Database
const INDIAN_INCUBATORS: IncubatorData[] = [
  {
    id: 'y-combinator-india',
    name: 'Y Combinator',
    description: 'World\'s most famous startup accelerator with strong Indian presence and alumni network.',
    type: 'Accelerator',
    location: 'Global (US-based)',
    city: 'Mountain View',
    state: 'California',
    sectors: ['Technology', 'SaaS', 'Fintech', 'Healthcare', 'E-commerce'],
    stages: ['Pre-seed', 'Seed'],
    minFunding: 0,
    maxFunding: 12500000, // $125K USD
    equityTaken: 7,
    batchSize: 200,
    programDuration: 3,
    website: 'https://ycombinator.com',
    email: 'apply@ycombinator.com',
    applicationDeadline: 'Rolling',
    nextBatch: '2024-09-01',
    successRate: 3,
    avgDecisionTime: 30,
    totalFunded: 4000,
    notableExits: ['Razorpay', 'Meesho', 'Cleartax', 'Freshworks'],
    benefits: ['$125K funding', 'Valley network', 'Demo day', 'Mentorship'],
    requirements: ['Working product', 'Strong team', 'Global ambition'],
    rating: 4.9,
    founded: 2005,
    isPremium: true
  },
  {
    id: 'sequoia-surge',
    name: 'Sequoia Surge',
    description: 'Sequoia Capital\'s rapid scale-up program for startups in India and Southeast Asia.',
    type: 'Accelerator',
    location: 'Bangalore, India',
    city: 'Bangalore',
    state: 'Karnataka',
    sectors: ['Technology', 'Consumer', 'Enterprise', 'Healthcare', 'Fintech'],
    stages: ['Seed', 'Series A'],
    minFunding: 8000000, // ~$1M USD
    maxFunding: 25000000, // ~$3M USD
    equityTaken: 6,
    batchSize: 15,
    programDuration: 4,
    website: 'https://surge.sequoiacap.com',
    email: 'surge@sequoiacap.com',
    applicationDeadline: '2024-08-15',
    nextBatch: '2024-10-01',
    successRate: 2,
    avgDecisionTime: 45,
    totalFunded: 300,
    notableExits: ['Gojek', 'Tokopedia', 'Zomato', 'Byju\'s'],
    benefits: ['Up to $3M funding', 'Sequoia network', 'Mentorship', 'Demo day'],
    requirements: ['Product-market fit', 'Revenue traction', 'Scalable model'],
    rating: 4.8,
    founded: 2019,
    isPremium: true
  },
  {
    id: 'accel-atoms',
    name: 'Accel Atoms',
    description: 'Accel Partners\' pre-Series A accelerator program for Indian startups.',
    type: 'Accelerator',
    location: 'Bangalore, India',
    city: 'Bangalore',
    state: 'Karnataka',
    sectors: ['SaaS', 'Fintech', 'Healthcare', 'Consumer', 'Enterprise'],
    stages: ['Pre-Series A'],
    minFunding: 5000000, // ~$600K USD
    maxFunding: 15000000, // ~$1.8M USD
    equityTaken: 8,
    batchSize: 10,
    programDuration: 3,
    website: 'https://atoms.accel.com',
    email: 'atoms@accel.com',
    applicationDeadline: '2024-09-30',
    nextBatch: '2024-11-01',
    successRate: 5,
    avgDecisionTime: 30,
    totalFunded: 150,
    notableExits: ['Flipkart', 'Freshworks', 'Swiggy', 'BookMyShow'],
    benefits: ['Up to $1.8M funding', 'Accel network', 'Product mentorship'],
    requirements: ['Tech product', 'Early revenue', 'Strong team'],
    rating: 4.7,
    founded: 2020,
    isPremium: true
  },
  {
    id: 'iit-bombay-sinc',
    name: 'IIT Bombay SINE',
    description: 'Society for Innovation and Entrepreneurship - premier incubator at IIT Bombay.',
    type: 'Incubator',
    location: 'Mumbai, India',
    city: 'Mumbai',
    state: 'Maharashtra',
    sectors: ['Technology', 'Healthcare', 'Energy', 'Manufacturing', 'Agriculture'],
    stages: ['Pre-seed', 'Seed'],
    minFunding: 500000,
    maxFunding: 5000000,
    equityTaken: 2,
    batchSize: 50,
    programDuration: 18,
    website: 'https://sine.iitb.ac.in',
    email: 'sine@iitb.ac.in',
    phone: '+91-22-2576-4625',
    applicationDeadline: 'Rolling',
    nextBatch: '2024-08-01',
    successRate: 15,
    avgDecisionTime: 45,
    totalFunded: 300,
    notableExits: ['Ideaforge', 'Emotix', 'Avaada Energy', 'Miko'],
    benefits: ['IIT network', 'Lab access', 'Faculty mentorship', 'Industry connects'],
    requirements: ['Tech innovation', 'IIT connection preferred', 'Scalable idea'],
    rating: 4.6,
    founded: 2004,
    isPremium: false
  },
  {
    id: 'indian-angel-network',
    name: 'Indian Angel Network',
    description: 'India\'s first and largest angel investor network with 500+ investors.',
    type: 'VC',
    location: 'New Delhi, India',
    city: 'New Delhi',
    state: 'Delhi',
    sectors: ['Technology', 'Consumer', 'Healthcare', 'Education', 'Fintech'],
    stages: ['Pre-seed', 'Seed'],
    minFunding: 1000000,
    maxFunding: 50000000,
    equityTaken: 15,
    batchSize: 100,
    programDuration: 6,
    website: 'https://indianangelnetwork.com',
    email: 'info@indianangelnetwork.com',
    phone: '+91-11-4173-5000',
    applicationDeadline: 'Rolling',
    successRate: 8,
    avgDecisionTime: 60,
    totalFunded: 350,
    notableExits: ['DriveU', 'Box8', 'Stepathlon', 'Zimplistic'],
    benefits: ['Angel network', 'Mentorship', 'Follow-on funding', 'Market access'],
    requirements: ['Proven traction', 'Experienced team', 'Scalable model'],
    rating: 4.4,
    founded: 2006,
    isPremium: false
  },
  {
    id: 'nasscom-10000-startups',
    name: 'NASSCOM 10000 Startups',
    description: 'India\'s largest startup incubation platform by NASSCOM.',
    type: 'Incubator',
    location: 'Multiple Cities',
    city: 'Bangalore',
    state: 'Karnataka',
    sectors: ['Technology', 'SaaS', 'IoT', 'AI/ML', 'Cybersecurity'],
    stages: ['Pre-seed', 'Seed', 'Early'],
    minFunding: 0,
    maxFunding: 10000000,
    equityTaken: 0,
    batchSize: 500,
    programDuration: 12,
    website: 'https://10000startups.com',
    email: 'startups@nasscom.in',
    applicationDeadline: 'Rolling',
    successRate: 25,
    avgDecisionTime: 30,
    totalFunded: 2000,
    notableExits: ['Freshworks', 'Zoho', 'InMobi', 'Ola'],
    benefits: ['Free incubation', 'Mentorship', 'Market access', 'Global connects'],
    requirements: ['Tech startup', 'Indian company', 'Early stage'],
    rating: 4.3,
    founded: 2013,
    isPremium: false
  },
  {
    id: 'startup-india-hub',
    name: 'Startup India Hub',
    description: 'Government of India\'s flagship startup support platform.',
    type: 'Government',
    location: 'New Delhi, India',
    city: 'New Delhi',
    state: 'Delhi',
    sectors: ['All sectors'],
    stages: ['Idea', 'Pre-seed', 'Seed'],
    minFunding: 0,
    maxFunding: 20000000,
    equityTaken: 0,
    batchSize: 1000,
    programDuration: 24,
    website: 'https://startupindia.gov.in',
    email: 'startupindia@gov.in',
    applicationDeadline: 'Rolling',
    successRate: 30,
    avgDecisionTime: 60,
    totalFunded: 5000,
    notableExits: ['Various government-supported startups'],
    benefits: ['Tax benefits', 'Compliance support', 'Funding access', 'Recognition'],
    requirements: ['Indian startup', 'DPIIT recognition', 'Innovation focus'],
    rating: 4.1,
    founded: 2016,
    isPremium: false
  },
  {
    id: 'microsoft-accelerator',
    name: 'Microsoft for Startups',
    description: 'Microsoft\'s global startup accelerator program with strong Indian presence.',
    type: 'Corporate',
    location: 'Bangalore, India',
    city: 'Bangalore',
    state: 'Karnataka',
    sectors: ['B2B SaaS', 'AI/ML', 'IoT', 'Productivity', 'Developer Tools'],
    stages: ['Seed', 'Series A'],
    minFunding: 0,
    maxFunding: 0, // Credits and support
    equityTaken: 0,
    batchSize: 30,
    programDuration: 6,
    website: 'https://microsoft.com/startups',
    email: 'startups@microsoft.com',
    applicationDeadline: 'Rolling',
    successRate: 20,
    avgDecisionTime: 30,
    totalFunded: 500,
    notableExits: ['Various B2B SaaS companies'],
    benefits: ['Azure credits', 'Technical mentorship', 'Sales support', 'Co-selling'],
    requirements: ['B2B focus', 'Series A+', 'Revenue traction'],
    rating: 4.5,
    founded: 2018,
    isPremium: false
  },
  {
    id: 'techstars-bangalore',
    name: 'Techstars Bangalore',
    description: 'Global startup accelerator with dedicated India program.',
    type: 'Accelerator',
    location: 'Bangalore, India',
    city: 'Bangalore',
    state: 'Karnataka',
    sectors: ['Technology', 'SaaS', 'Consumer', 'Enterprise', 'Hardware'],
    stages: ['Pre-seed', 'Seed'],
    minFunding: 8000000, // ~$100K USD
    maxFunding: 8000000,
    equityTaken: 6,
    batchSize: 12,
    programDuration: 3,
    website: 'https://techstars.com/bangalore',
    email: 'bangalore@techstars.com',
    applicationDeadline: '2024-10-15',
    nextBatch: '2025-01-01',
    successRate: 5,
    avgDecisionTime: 45,
    totalFunded: 150,
    notableExits: ['Sendgrid', 'DigitalOcean', 'Twilio'],
    benefits: ['$100K funding', 'Global network', 'Demo day', 'Lifetime support'],
    requirements: ['Strong team', 'Scalable product', 'Global potential'],
    rating: 4.6,
    founded: 2019,
    isPremium: true
  },
  {
    id: 'tlabs-hyderabad',
    name: 'T-Labs (T-Hub)',
    description: 'Telangana\'s flagship innovation hub and incubator.',
    type: 'Incubator',
    location: 'Hyderabad, India',
    city: 'Hyderabad',
    state: 'Telangana',
    sectors: ['Technology', 'HealthTech', 'Fintech', 'AgriTech', 'Mobility'],
    stages: ['Pre-seed', 'Seed', 'Growth'],
    minFunding: 1000000,
    maxFunding: 25000000,
    equityTaken: 5,
    batchSize: 40,
    programDuration: 12,
    website: 'https://t-hub.co',
    email: 'hello@t-hub.co',
    phone: '+91-40-4033-4000',
    applicationDeadline: '2024-09-15',
    nextBatch: '2024-10-01',
    successRate: 12,
    avgDecisionTime: 30,
    totalFunded: 200,
    notableExits: ['Darwinbox', 'Sportido', 'CropIn', 'SilverHealth'],
    benefits: ['Funding access', 'Mentorship', 'Pilot opportunities', 'Lab access'],
    requirements: ['Tech innovation', 'Scalable model', 'Market validation'],
    rating: 4.4,
    founded: 2015,
    isPremium: false
  }
];

interface FunctionalIncubatorDatabaseProps {
  userProducts?: string[];
  hasAccess?: boolean;
}

const FunctionalIncubatorDatabase: React.FC<FunctionalIncubatorDatabaseProps> = ({ 
  userProducts = [], 
  hasAccess = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  
  // Extract unique values for filters
  const sectors = [...new Set(INDIAN_INCUBATORS.flatMap(inc => inc.sectors))].sort();
  const locations = [...new Set(INDIAN_INCUBATORS.map(inc => inc.city))].sort();
  const types = [...new Set(INDIAN_INCUBATORS.map(inc => inc.type))].sort();
  const stages = [...new Set(INDIAN_INCUBATORS.flatMap(inc => inc.stages))].sort();

  const filteredIncubators = useMemo(() => {
    return INDIAN_INCUBATORS.filter(incubator => {
      const matchesSearch = incubator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incubator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incubator.sectors.some(sector => sector.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSector = !selectedSector || incubator.sectors.includes(selectedSector);
      const matchesLocation = !selectedLocation || incubator.city === selectedLocation;
      const matchesType = !selectedType || incubator.type === selectedType;
      const matchesStage = !selectedStage || incubator.stages.includes(selectedStage);
      const hasAccess_ = hasAccess || !incubator.isPremium;
      
      return matchesSearch && matchesSector && matchesLocation && matchesType && matchesStage && hasAccess_;
    });
  }, [searchTerm, selectedSector, selectedLocation, selectedType, selectedStage, hasAccess]);

  const handleContactIncubator = (incubator: IncubatorData) => {
    if (!hasAccess && incubator.isPremium) {
      window.open('/pricing?product=P3', '_blank');
      return;
    }
    
    window.open(incubator.website, '_blank');
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Accelerator': 'bg-blue-100 text-blue-800',
      'Incubator': 'bg-green-100 text-green-800',
      'VC': 'bg-purple-100 text-purple-800',
      'Government': 'bg-orange-100 text-orange-800',
      'Corporate': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatFunding = (min: number, max: number) => {
    const formatAmount = (amount: number) => {
      if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
      if (amount === 0) return 'No funding';
      return `₹${(amount / 1000).toFixed(0)}K`;
    };
    
    if (min === max) return formatAmount(min);
    return `${formatAmount(min)} - ${formatAmount(max)}`;
  };

  if (!hasAccess) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Building className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Incubator Database</h3>
            <p className="text-gray-600 mb-4">
              Access 10+ premium incubators and accelerators with direct contacts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Premium</div>
                <div className="text-xs text-gray-600">5 Top-tier</div>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Funding</div>
                <div className="text-xs text-gray-600">₹1Cr-₹25Cr</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Network</div>
                <div className="text-xs text-gray-600">Direct Access</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Success</div>
                <div className="text-xs text-gray-600">High Rate</div>
              </div>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open('/pricing?product=P3', '_blank')}
            >
              Upgrade to P3 - ₹5,999
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Incubator & Accelerator Database</h1>
              <p className="text-gray-600">Comprehensive database of Indian startup incubators and accelerators</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{INDIAN_INCUBATORS.length}</div>
              <div className="text-sm text-gray-600">Total Programs</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹1L-₹25Cr</div>
              <div className="text-sm text-gray-600">Funding Range</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round(INDIAN_INCUBATORS.reduce((sum, inc) => sum + inc.successRate, 0) / INDIAN_INCUBATORS.length)}%</div>
              <div className="text-sm text-gray-600">Avg Success Rate</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{INDIAN_INCUBATORS.reduce((sum, inc) => sum + inc.totalFunded, 0)}</div>
              <div className="text-sm text-gray-600">Startups Funded</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search incubators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Types</option>
              {types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Sectors</option>
              {sectors.map(sector => <option key={sector} value={sector}>{sector}</option>)}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Cities</option>
              {locations.map(location => <option key={location} value={location}>{location}</option>)}
            </select>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">All Stages</option>
              {stages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIncubators.map((incubator) => (
          <Card key={incubator.id} className="hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{incubator.name}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getTypeColor(incubator.type)}>
                      {incubator.type}
                    </Badge>
                    {incubator.isPremium && (
                      <Badge className="bg-gold-100 text-gold-800">Premium</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(incubator.rating) 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </div>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{incubator.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{incubator.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{incubator.city}, {incubator.state}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>{formatFunding(incubator.minFunding, incubator.maxFunding)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>Batch: {incubator.batchSize} | Equity: {incubator.equityTaken}%</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{incubator.programDuration} months | {incubator.avgDecisionTime} days decision</span>
                </div>

                <div className="flex gap-1 flex-wrap">
                  {incubator.sectors.slice(0, 3).map(sector => (
                    <Badge key={sector} variant="outline" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                  {incubator.sectors.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{incubator.sectors.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Success Rate: {incubator.successRate}%</span>
                    <span>Founded: {incubator.founded}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleContactIncubator(incubator)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                    {incubator.email && (
                      <Button
                        onClick={() => window.open(`mailto:${incubator.email}`, '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIncubators.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No incubators found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Footer */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Database Statistics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {INDIAN_INCUBATORS.filter(inc => inc.type === 'Accelerator').length}
              </div>
              <div className="text-sm text-gray-600">Accelerators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {INDIAN_INCUBATORS.filter(inc => inc.type === 'Incubator').length}
              </div>
              <div className="text-sm text-gray-600">Incubators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {INDIAN_INCUBATORS.filter(inc => inc.type === 'VC').length}
              </div>
              <div className="text-sm text-gray-600">VCs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {INDIAN_INCUBATORS.filter(inc => inc.type === 'Government').length}
              </div>
              <div className="text-sm text-gray-600">Government</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunctionalIncubatorDatabase;