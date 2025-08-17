'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Heading } from '../../../components/ui/Typography';
import { Text } from '../../../components/ui/Typography';
import { Card } from '../../../components/ui/Card';
import { CardContent } from '../../../components/ui/Card';
import { CardHeader } from "../../../components/ui/Card";
import { CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { 
  Search,
  Filter,
  Star,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Building,
  Banknote,
  Award,
  Users,
  Plus,
  Eye,
  MessageSquare,
  TrendingUp,
  Shield,
  Globe,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface EcosystemListing {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  logoUrl?: string;
  website?: string;
  city?: string;
  state?: string;
  tags: string[];
  averageRating: number;
  totalReviews: number;
  totalViews: number;
  isVerified: boolean;
  
  // Specific fields based on category
  fundingAmount?: string;
  equityTaken?: string;
  programDuration?: string;
  loanTypes?: string[];
  interestRates?: string;
  eligibilityInfo?: string;
}

const categories = [
  { id: 'all', name: 'All', icon: Building, count: 450 },
  { id: 'scheme', name: 'Govt Schemes', icon: Award, count: 85 },
  { id: 'incubator', name: 'Incubators', icon: TrendingUp, count: 120 },
  { id: 'bank', name: 'Banks', icon: Banknote, count: 45 },
  { id: 'accelerator', name: 'Accelerators', icon: Users, count: 65 },
  { id: 'legal', name: 'Legal Services', icon: Shield, count: 78 },
  { id: 'accounting', name: 'CA/Accounting', icon: Building, count: 57 },
];

const states = [
  'All India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 
  'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida'
];

export default function EcosystemDirectoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<EcosystemListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<EcosystemListing[]>([]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('All India');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Define applyFilters first
  const applyFilters = useCallback(() => {
    let filtered = [...listings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }

    // Location filter
    if (selectedState !== 'All India') {
      filtered = filtered.filter(listing => 
        listing.state === selectedState || listing.city === selectedState
      );
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(listing => listing.averageRating >= minRating);
    }

    setFilteredListings(filtered);
  }, [listings, searchQuery, selectedCategory, selectedState, minRating]);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockListings: EcosystemListing[] = [
        {
          id: '1',
          name: 'Startup India Seed Fund Scheme (SISFS)',
          description: 'Government scheme providing financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.',
          category: 'scheme',
          subCategory: 'government_scheme',
          logoUrl: '/logos/startup-india.png',
          website: 'https://startupindia.gov.in',
          city: 'New Delhi',
          state: 'Delhi',
          tags: ['seed-funding', 'government', 'prototype', 'early-stage'],
          averageRating: 4.2,
          totalReviews: 48,
          totalViews: 2340,
          isVerified: true,
          fundingAmount: '₹20L - ₹50L',
          eligibilityInfo: 'Startup incorporated less than 2 years ago, DPIIT recognized',
        },
        {
          id: '2',
          name: 'T-Hub Hyderabad',
          description: 'India\'s largest startup incubator and innovation hub, supporting tech startups with mentoring, funding, and market access.',
          category: 'incubator',
          subCategory: 'government_incubator',
          logoUrl: '/logos/t-hub.png',
          website: 'https://t-hub.co',
          city: 'Hyderabad',
          state: 'Telangana',
          tags: ['tech', 'ai', 'fintech', 'healthcare'],
          averageRating: 4.6,
          totalReviews: 89,
          totalViews: 5670,
          isVerified: true,
          fundingAmount: '₹25L - ₹2Cr',
          equityTaken: '8-15%',
          programDuration: '6-12 months',
        },
        {
          id: '3',
          name: 'HDFC Bank SmartUp',
          description: 'Comprehensive banking solutions for startups including current accounts, credit facilities, payment gateways, and business loans.',
          category: 'bank',
          subCategory: 'private_bank',
          logoUrl: '/logos/hdfc.png',
          website: 'https://hdfcbank.com/smartup',
          city: 'Mumbai',
          state: 'Maharashtra',
          tags: ['banking', 'loans', 'payment-gateway', 'credit'],
          averageRating: 4.1,
          totalReviews: 156,
          totalViews: 8920,
          isVerified: true,
          loanTypes: ['Working Capital', 'Term Loan', 'ECLGS'],
          interestRates: '9.5% - 14%',
        },
        {
          id: '4',
          name: 'Sequoia Capital India',
          description: 'Leading venture capital firm investing in early to growth stage startups across consumer, enterprise, and healthcare sectors.',
          category: 'accelerator',
          subCategory: 'vc_firm',
          logoUrl: '/logos/sequoia.png',
          website: 'https://sequoiacap.com/india',
          city: 'Bangalore',
          state: 'Karnataka',
          tags: ['venture-capital', 'series-a', 'growth', 'scaling'],
          averageRating: 4.8,
          totalReviews: 67,
          totalViews: 12450,
          isVerified: true,
          fundingAmount: '₹5Cr - ₹100Cr',
          equityTaken: '15-25%',
        },
        {
          id: '5',
          name: 'Khaitan & Co',
          description: 'Full-service law firm specializing in startup legal services, incorporation, compliance, fundraising, and intellectual property.',
          category: 'legal',
          subCategory: 'law_firm',
          logoUrl: '/logos/khaitan.png',
          website: 'https://khaitanco.com',
          city: 'Delhi',
          state: 'Delhi',
          tags: ['legal', 'incorporation', 'compliance', 'ip', 'contracts'],
          averageRating: 4.4,
          totalReviews: 92,
          totalViews: 3560,
          isVerified: true,
        },
        {
          id: '6',
          name: 'MUDRA Loan Scheme',
          description: 'Government scheme providing loans up to ₹10 lakhs to micro and small enterprises for business development and expansion.',
          category: 'scheme',
          subCategory: 'government_scheme',
          logoUrl: '/logos/mudra.png',
          website: 'https://mudra.org.in',
          city: 'New Delhi',
          state: 'Delhi',
          tags: ['micro-finance', 'government', 'small-business', 'collateral-free'],
          averageRating: 3.8,
          totalReviews: 234,
          totalViews: 15680,
          isVerified: true,
          fundingAmount: '₹50K - ₹10L',
          eligibilityInfo: 'Micro and small enterprises, no collateral required',
        }
      ];

      setListings(mockListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };


  const getCategoryIcon = (category: string) => {
    const iconMap = {
      scheme: Award,
      incubator: TrendingUp,
      bank: Banknote,
      accelerator: Users,
      legal: Shield,
      accounting: Building,
    };
    return iconMap[category as keyof typeof iconMap] || Building;
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      scheme: 'bg-green-100 text-green-700',
      incubator: 'bg-blue-100 text-blue-700',
      bank: 'bg-yellow-100 text-yellow-700',
      accelerator: 'bg-purple-100 text-purple-700',
      legal: 'bg-red-100 text-red-700',
      accounting: 'bg-gray-100 text-gray-700',
    };
    return colorMap[category as keyof typeof colorMap] || 'bg-gray-100 text-gray-700';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading startup ecosystem...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/community')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Community
                </Button>
              </div>
              
              <Link href="/community/ecosystem/submit">
                <Button variant="primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Listing
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Building className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Startup Ecosystem Directory
                </Heading>
                <Text className="text-gray-600">
                  Discover schemes, incubators, banks, and services with real founder reviews
                </Text>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for schemes, incubators, banks, or services..."
                    className="pl-12 text-lg py-3"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {categories.slice(0, 6).map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="flex items-center gap-2"
                        >
                          <IconComponent className="w-4 h-4" />
                          {category.name}
                          <Badge variant="outline" size="sm">
                            {category.count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                </div>

                {/* Extended Filters */}
                {showFilters && (
                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                      <select
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value={0}>Any Rating</option>
                        <option value={4}>4+ Stars</option>
                        <option value={3}>3+ Stars</option>
                        <option value={2}>2+ Stars</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedState('All India');
                        setMinRating(0);
                      }}>
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <Text color="muted">
              Found {filteredListings.length} results
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </Text>
            <div className="flex items-center gap-2">
              <Text size="sm" color="muted">Sort by:</Text>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Recently Added</option>
                <option>Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="space-y-6">
            {filteredListings.map((listing) => {
              const CategoryIcon = getCategoryIcon(listing.category);
              
              return (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Logo/Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                          {listing.logoUrl ? (
                            <Image 
                              src={listing.logoUrl} 
                              alt={listing.name} 
                              width={48} 
                              height={48} 
                              className="w-12 h-12 rounded object-cover" 
                            />
                          ) : (
                            <CategoryIcon className="w-8 h-8" />
                          )}
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Link href={`/community/ecosystem/${listing.id}`}>
                                <Heading as="h3" variant="h5" className="hover:text-blue-600 cursor-pointer">
                                  {listing.name}
                                </Heading>
                              </Link>
                              {listing.isVerified && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <Badge className={getCategoryColor(listing.category)}>
                                {listing.category}
                              </Badge>
                              
                              {listing.city && listing.state && (
                                <div className="flex items-center gap-1 text-gray-600">
                                  <MapPin className="w-4 h-4" />
                                  <Text size="sm">{listing.city}, {listing.state}</Text>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {renderStars(listing.averageRating)}
                                </div>
                                <Text size="sm" color="muted">
                                  {listing.averageRating.toFixed(1)} ({listing.totalReviews} reviews)
                                </Text>
                              </div>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="text-right">
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <Text size="sm">{listing.totalViews.toLocaleString()}</Text>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <Text size="sm">{listing.totalReviews}</Text>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Text size="sm" className="mb-4 line-clamp-2">
                          {listing.description}
                        </Text>

                        {/* Key Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {listing.fundingAmount && (
                            <div className="flex items-center gap-2">
                              <Banknote className="w-4 h-4 text-green-600" />
                              <Text size="sm">
                                <span className="text-gray-600">Funding:</span> {listing.fundingAmount}
                              </Text>
                            </div>
                          )}
                          
                          {listing.equityTaken && (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              <Text size="sm">
                                <span className="text-gray-600">Equity:</span> {listing.equityTaken}
                              </Text>
                            </div>
                          )}
                          
                          {listing.programDuration && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <Text size="sm">
                                <span className="text-gray-600">Duration:</span> {listing.programDuration}
                              </Text>
                            </div>
                          )}
                          
                          {listing.interestRates && (
                            <div className="flex items-center gap-2">
                              <Banknote className="w-4 h-4 text-red-600" />
                              <Text size="sm">
                                <span className="text-gray-600">Interest:</span> {listing.interestRates}
                              </Text>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex gap-1 flex-wrap mb-4">
                          {listing.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">
                              #{tag}
                            </Badge>
                          ))}
                          {listing.tags.length > 4 && (
                            <Badge variant="outline" size="sm">
                              +{listing.tags.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Link href={`/community/ecosystem/${listing.id}`}>
                              <Button variant="primary" size="sm">
                                View Details & Reviews
                              </Button>
                            </Link>
                            {listing.website && (
                              <a href={listing.website} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  Website
                                </Button>
                              </a>
                            )}
                          </div>
                          
                          <Link href={`/community/ecosystem/${listing.id}/review`}>
                            <Button variant="outline" size="sm">
                              Write Review
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredListings.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h3" variant="h5" className="mb-2">
                  No listings found
                </Heading>
                <Text color="muted" className="mb-6">
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </Text>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedState('All India');
                    setMinRating(0);
                  }}>
                    Clear All Filters
                  </Button>
                  <Link href="/community/ecosystem/submit">
                    <Button variant="primary">
                      Add New Listing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}