'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  ArrowLeft,
  Star,
  ExternalLink,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Building,
  Banknote,
  Clock,
  Users,
  CheckCircle,
  Shield,
  ThumbsUp,
  MessageSquare,
  Eye,
  TrendingUp,
  Award,
  AlertCircle,
  Edit
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
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  foundedYear?: number;
  tags: string[];
  averageRating: number;
  totalReviews: number;
  totalViews: number;
  isVerified: boolean;
  
  // Specific fields
  fundingAmount?: string;
  equityTaken?: string;
  programDuration?: string;
  batchSize?: number;
  loanTypes?: string[];
  interestRates?: string;
  eligibilityInfo?: string;
  applicationProcess?: string;
  documentsRequired?: string[];
}

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  experienceType: string;
  applicationDate?: string;
  responseTime?: string;
  isAnonymous: boolean;
  anonymousName?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  helpfulCount: number;
  isHelpful?: boolean;
  createdAt: string;
  isVerified: boolean;
}

export default function ListingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<EcosystemListing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewFilter, setReviewFilter] = useState('all'); // all, positive, negative, recent

  const fetchListingDetails = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockListing: EcosystemListing = {
        id: listingId,
        name: 'T-Hub Hyderabad',
        description: 'T-Hub is India&apos;s largest startup incubator and innovation hub, supporting tech startups with mentoring, funding, and market access. Founded by the Government of Telangana, T-Hub has supported over 1,800+ startups and facilitated funding worth $300M+.',
        category: 'incubator',
        subCategory: 'government_incubator',
        logoUrl: '/logos/t-hub.png',
        website: 'https://t-hub.co',
        email: 'hello@t-hub.co',
        phone: '+91 40 4033 7000',
        address: 'Raidurg, Cyberabad, Hyderabad, Telangana 500081',
        city: 'Hyderabad',
        state: 'Telangana',
        foundedYear: 2015,
        tags: ['tech', 'ai', 'fintech', 'healthcare', 'saas', 'b2b'],
        averageRating: 4.6,
        totalReviews: 89,
        totalViews: 5670,
        isVerified: true,
        fundingAmount: '₹25L - ₹2Cr',
        equityTaken: '8-15%',
        programDuration: '6-12 months',
        batchSize: 15,
        eligibilityInfo: 'Early-stage tech startups with working prototype, founded less than 3 years ago',
        applicationProcess: 'Online application → Pitch presentation → Due diligence → Selection committee review → Final decision',
        documentsRequired: ['Business plan', 'Financial projections', 'Founder profiles', 'Product demo', 'Market research'],
      };

      const mockReviews: Review[] = [
        {
          id: '1',
          rating: 5,
          title: 'Excellent mentorship and network access',
          content: 'T-Hub provided incredible value to our startup. The mentorship from industry experts helped us refine our product-market fit, and the network access led to our Series A funding. The infrastructure and support ecosystem is world-class.',
          experienceType: 'completed',
          applicationDate: '2023-01-15',
          responseTime: '3 weeks',
          isAnonymous: false,
          author: {
            name: 'Rahul Kumar',
            avatar: '',
          },
          helpfulCount: 23,
          isHelpful: false,
          createdAt: '2023-12-15',
          isVerified: true,
        },
        {
          id: '2',
          rating: 4,
          title: 'Great program but very competitive selection',
          content: 'Applied twice before getting selected. The program is excellent - great mentors, good funding opportunities, and amazing peer network. However, the selection process is quite rigorous and they only select the best startups.',
          experienceType: 'completed',
          applicationDate: '2023-03-10',
          responseTime: '4 weeks',
          isAnonymous: true,
          anonymousName: 'SaaS Founder',
          helpfulCount: 18,
          isHelpful: true,
          createdAt: '2023-11-20',
          isVerified: false,
        },
        {
          id: '3',
          rating: 3,
          title: 'Good resources but limited individual attention',
          content: 'T-Hub has great resources and facilities, but with so many startups in each batch, individual attention is limited. The mentorship sessions are valuable but not frequent enough for early-stage startups that need more hands-on guidance.',
          experienceType: 'completed',
          applicationDate: '2023-02-20',
          responseTime: '2 weeks',
          isAnonymous: true,
          anonymousName: 'FinTech Entrepreneur',
          helpfulCount: 12,
          isHelpful: false,
          createdAt: '2023-10-25',
          isVerified: false,
        },
      ];

      setListing(mockListing);
      setReviews(mockReviews);
      
      // Increment view count (in real app)
      
    } catch (error) {
      console.error('Error fetching listing details:', error);
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    if (listingId) {
      fetchListingDetails();
    }
  }, [listingId, fetchListingDetails]);

  const handleHelpfulVote = async (reviewId: string) => {
    // In real app, call API to vote
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpfulCount: review.helpfulCount + (review.isHelpful ? -1 : 1), isHelpful: !review.isHelpful }
        : review
    ));
  };

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getExperienceColor = (type: string) => {
    const colors = {
      'applied': 'bg-blue-100 text-blue-700',
      'accepted': 'bg-green-100 text-green-700',
      'rejected': 'bg-red-100 text-red-700',
      'ongoing': 'bg-yellow-100 text-yellow-700',
      'completed': 'bg-purple-100 text-purple-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      breakdown[review.rating as keyof typeof breakdown]++;
    });
    return breakdown;
  };

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading details...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!listing) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-2">
                  Listing Not Found
                </Heading>
                <Text color="muted" className="mb-6">
                  The listing you&apos;re looking for doesn&apos;t exist or has been removed.
                </Text>
                <Button variant="primary" onClick={() => router.push('/community/ecosystem')}>
                  Back to Directory
                </Button>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const ratingBreakdown = getRatingBreakdown();

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push('/community/ecosystem')}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Directory
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Listing Header */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                        {listing.logoUrl ? (
                          <Image 
                            src={listing.logoUrl} 
                            alt={listing.name} 
                            width={64} 
                            height={64} 
                            className="w-16 h-16 rounded-lg object-cover" 
                          />
                        ) : (
                          <Building className="w-10 h-10" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Heading as="h1" variant="h3">
                              {listing.name}
                            </Heading>
                            {listing.isVerified && (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant="default" className="capitalize">
                              {listing.category}
                            </Badge>
                            
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {renderStars(listing.averageRating, 'w-5 h-5')}
                              </div>
                              <Text weight="medium" className="ml-2">
                                {listing.averageRating.toFixed(1)}
                              </Text>
                              <Text color="muted">
                                ({listing.totalReviews} reviews)
                              </Text>
                            </div>
                          </div>
                          
                          {listing.city && listing.state && (
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="w-4 h-4" />
                              <Text>{listing.city}, {listing.state}</Text>
                              {listing.foundedYear && (
                                <>
                                  <Text color="muted">•</Text>
                                  <Text color="muted">Since {listing.foundedYear}</Text>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Eye className="w-4 h-4" />
                            <Text size="sm">{listing.totalViews.toLocaleString()} views</Text>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link href={`/community/ecosystem/${listing.id}/review`}>
                          <Button variant="primary">
                            Write Review
                          </Button>
                        </Link>
                        {listing.website && (
                          <a href={listing.website} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="leading-relaxed mb-4">
                    {listing.description}
                  </Text>
                  
                  {listing.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {listing.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Program/Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {listing.fundingAmount && (
                      <div className="flex items-start gap-3">
                        <Banknote className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <Text weight="medium">Funding Amount</Text>
                          <Text color="muted">{listing.fundingAmount}</Text>
                        </div>
                      </div>
                    )}
                    
                    {listing.equityTaken && (
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <Text weight="medium">Equity Taken</Text>
                          <Text color="muted">{listing.equityTaken}</Text>
                        </div>
                      </div>
                    )}
                    
                    {listing.programDuration && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <Text weight="medium">Program Duration</Text>
                          <Text color="muted">{listing.programDuration}</Text>
                        </div>
                      </div>
                    )}
                    
                    {listing.batchSize && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <Text weight="medium">Batch Size</Text>
                          <Text color="muted">{listing.batchSize} startups</Text>
                        </div>
                      </div>
                    )}
                    
                    {listing.interestRates && (
                      <div className="flex items-start gap-3">
                        <Banknote className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <Text weight="medium">Interest Rates</Text>
                          <Text color="muted">{listing.interestRates}</Text>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility & Application */}
              {(listing.eligibilityInfo || listing.applicationProcess) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Application Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {listing.eligibilityInfo && (
                      <div>
                        <Text weight="medium" className="mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          Eligibility Criteria
                        </Text>
                        <Text color="muted">{listing.eligibilityInfo}</Text>
                      </div>
                    )}
                    
                    {listing.applicationProcess && (
                      <div>
                        <Text weight="medium" className="mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          Application Process
                        </Text>
                        <Text color="muted">{listing.applicationProcess}</Text>
                      </div>
                    )}
                    
                    {listing.documentsRequired && listing.documentsRequired.length > 0 && (
                      <div>
                        <Text weight="medium" className="mb-2">Required Documents</Text>
                        <ul className="list-disc list-inside space-y-1">
                          {listing.documentsRequired.map((doc, index) => (
                            <li key={index} className="text-sm text-gray-600">{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {listing.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-600" />
                      <a 
                        href={listing.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {listing.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  {listing.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <a href={`mailto:${listing.email}`} className="text-blue-600 hover:underline text-sm">
                        {listing.email}
                      </a>
                    </div>
                  )}
                  
                  {listing.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <a href={`tel:${listing.phone}`} className="text-blue-600 hover:underline text-sm">
                        {listing.phone}
                      </a>
                    </div>
                  )}
                  
                  {listing.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <Text size="sm" color="muted">{listing.address}</Text>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rating Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = ratingBreakdown[stars as keyof typeof ratingBreakdown];
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      
                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <Text size="sm">{stars}</Text>
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <Text size="sm" className="w-8 text-right">{count}</Text>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={`/community/ecosystem/${listing.id}/review`} className="block">
                    <Button variant="primary" className="w-full">
                      Write Review
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Save for Later
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Listing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <Heading as="h2" variant="h4">
                Reviews ({reviews.length})
              </Heading>
              
              <div className="flex items-center gap-4">
                <select 
                  value={reviewFilter}
                  onChange={(e) => setReviewFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Reviews</option>
                  <option value="positive">Positive (4-5 stars)</option>
                  <option value="negative">Critical (1-3 stars)</option>
                  <option value="recent">Most Recent</option>
                </select>
                
                <Link href={`/community/ecosystem/${listing.id}/review`}>
                  <Button variant="primary" size="sm">
                    Write Review
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {review.isAnonymous ? (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                            <Users className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {review.author?.name.charAt(0) || 'A'}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <Text weight="medium">
                                {review.isAnonymous ? review.anonymousName : review.author?.name}
                              </Text>
                              {review.isVerified && (
                                <Badge variant="success" size="sm">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <Badge className={getExperienceColor(review.experienceType)} size="sm">
                                {review.experienceType}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <Text size="sm" color="muted">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </Text>
                            </div>
                          </div>
                        </div>
                        
                        <Heading as="h4" variant="h6" className="mb-2">
                          {review.title}
                        </Heading>
                        
                        <Text className="mb-4 leading-relaxed">
                          {review.content}
                        </Text>
                        
                        {(review.applicationDate || review.responseTime) && (
                          <div className="flex gap-6 mb-4 p-3 bg-gray-50 rounded-lg">
                            {review.applicationDate && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-600" />
                                <Text size="sm">Applied: {new Date(review.applicationDate).toLocaleDateString()}</Text>
                              </div>
                            )}
                            {review.responseTime && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <Text size="sm">Response time: {review.responseTime}</Text>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleHelpfulVote(review.id)}
                            className="flex items-center gap-1"
                          >
                            <ThumbsUp className={`w-4 h-4 ${review.isHelpful ? 'text-blue-600' : 'text-gray-600'}`} />
                            Helpful ({review.helpfulCount})
                          </Button>
                          
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {reviews.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <Heading as="h3" variant="h5" className="mb-2">
                    No reviews yet
                  </Heading>
                  <Text color="muted" className="mb-6">
                    Be the first to share your experience with {listing.name}
                  </Text>
                  <Link href={`/community/ecosystem/${listing.id}/review`}>
                    <Button variant="primary">
                      Write First Review
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}