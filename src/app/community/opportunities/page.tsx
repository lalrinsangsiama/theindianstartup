'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft,
  Megaphone,
  Search,
  Filter,
  Calendar,
  Clock,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Eye,
  TrendingUp,
  Award,
  Banknote,
  Building,
  Users,
  AlertTriangle,
  Star,
  Plus,
  Crown,
  Zap,
  Shield
} from 'lucide-react';
import Link from 'next/link';

interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  type: string; // scheme, opportunity, update, announcement, sponsored
  category: string; // government, private, funding, event, deadline
  priority: string; // low, normal, high, urgent
  targetAudience: string[];
  industries: string[];
  imageUrl?: string;
  externalLinks?: {
    website?: string;
    applicationLink?: string;
    moreInfo?: string;
  };
  applicationDeadline?: string;
  eventDate?: string;
  validUntil?: string;
  
  // Sponsored content
  isSponsored: boolean;
  sponsorName?: string;
  sponsorLogo?: string;
  sponsorWebsite?: string;
  
  // Status
  isAdminPost: boolean;
  isPinned: boolean;
  isFeatured: boolean;
  
  // Engagement
  viewsCount: number;
  savesCount: number;
  isSaved?: boolean;
  
  // Meta
  tags: string[];
  publishedAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

const categories = [
  { id: 'all', name: 'All', icon: Megaphone, color: 'text-gray-600' },
  { id: 'scheme', name: 'Schemes', icon: Award, color: 'text-green-600' },
  { id: 'funding', name: 'Funding', icon: Banknote, color: 'text-blue-600' },
  { id: 'event', name: 'Events', icon: Calendar, color: 'text-purple-600' },
  { id: 'opportunity', name: 'Opportunities', icon: TrendingUp, color: 'text-orange-600' },
  { id: 'deadline', name: 'Deadlines', icon: AlertTriangle, color: 'text-red-600' },
];

const priorities = [
  { id: 'urgent', name: 'Urgent', color: 'bg-red-100 text-red-700' },
  { id: 'high', name: 'High', color: 'bg-orange-100 text-orange-700' },
  { id: 'normal', name: 'Normal', color: 'bg-blue-100 text-blue-700' },
  { id: 'low', name: 'Low', color: 'bg-gray-100 text-gray-700' },
];

export default function OpportunitiesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showExpired, setShowExpired] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: '1',
        limit: '20',
      });

      if (selectedCategory !== 'all') {
        queryParams.set('type', selectedCategory);
      }

      if (selectedPriority !== 'all') {
        queryParams.set('priority', selectedPriority);
      }

      if (searchQuery) {
        queryParams.set('search', searchQuery);
      }

      if (showExpired) {
        queryParams.set('showExpired', 'true');
      }

      // Fetch from API
      const response = await fetch(`/api/community/announcements?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }

      const data = await response.json();
      setAnnouncements(data.announcements || []);
      
      // Fallback to mock data if API returns empty
      if (!data.announcements?.length) {
        const mockAnnouncements: Announcement[] = [
        {
          id: '1',
          title: 'Startup India Seed Fund Scheme - Applications Open',
          content: 'The Department for Promotion of Industry and Internal Trade (DPIIT) has opened applications for the Startup India Seed Fund Scheme. Eligible startups can receive up to ₹50 lakhs in seed funding to support proof of concept, prototype development, product trials, market entry and commercialization.',
          excerpt: 'DPIIT opens applications for seed funding up to ₹50L for eligible startups',
          type: 'scheme',
          category: 'government',
          priority: 'high',
          targetAudience: ['early-stage', 'all'],
          industries: ['all'],
          imageUrl: '/announcements/startup-india-seed.jpg',
          externalLinks: {
            website: 'https://startupindia.gov.in',
            applicationLink: 'https://startupindia.gov.in/seed-fund',
            moreInfo: 'https://startupindia.gov.in/content/sih/en/sch_ben.html',
          },
          applicationDeadline: '2024-02-15T23:59:59Z',
          validUntil: '2024-02-15T23:59:59Z',
          isSponsored: false,
          isAdminPost: true,
          isPinned: true,
          isFeatured: true,
          viewsCount: 12450,
          savesCount: 342,
          isSaved: false,
          tags: ['seed-funding', 'government', 'early-stage', 'dpiit'],
          publishedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'FinTech Accelerator Program by Visa - Now Accepting Applications',
          content: 'Visa is launching its FinTech Accelerator Program in India, offering selected startups mentorship, funding, and access to Visa\'s global network. The 6-month program focuses on payment technologies, financial inclusion, and digital banking solutions.',
          excerpt: 'Visa launches FinTech accelerator program with mentorship and funding opportunities',
          type: 'opportunity',
          category: 'private',
          priority: 'high',
          targetAudience: ['early-stage', 'growth'],
          industries: ['fintech', 'payments'],
          isSponsored: true,
          sponsorName: 'Visa Inc.',
          sponsorLogo: '/sponsors/visa-logo.png',
          sponsorWebsite: 'https://visa.com',
          externalLinks: {
            website: 'https://visa.com/fintech-accelerator',
            applicationLink: 'https://visa.com/apply',
          },
          applicationDeadline: '2024-02-28T23:59:59Z',
          validUntil: '2024-02-28T23:59:59Z',
          isAdminPost: false,
          isPinned: false,
          isFeatured: true,
          viewsCount: 8960,
          savesCount: 234,
          isSaved: true,
          tags: ['fintech', 'accelerator', 'payments', 'mentorship'],
          publishedAt: '2024-01-12T14:30:00Z',
        },
        {
          id: '3',
          title: 'Google for Startups Cloud Credits - $100K in Credits Available',
          content: 'Google for Startups is offering up to $100,000 in Google Cloud credits for eligible startups. These credits can be used for computing, storage, machine learning APIs, and other Google Cloud services to help startups scale their technology infrastructure.',
          excerpt: 'Google offers $100K cloud credits for eligible startups to scale tech infrastructure',
          type: 'opportunity',
          category: 'private',
          priority: 'normal',
          targetAudience: ['early-stage', 'growth'],
          industries: ['tech', 'saas', 'ai'],
          externalLinks: {
            website: 'https://startup.google.com',
            applicationLink: 'https://startup.google.com/cloud-credits',
          },
          validUntil: '2024-12-31T23:59:59Z',
          isSponsored: false,
          isAdminPost: true,
          isPinned: false,
          isFeatured: false,
          viewsCount: 6780,
          savesCount: 156,
          isSaved: false,
          tags: ['cloud', 'credits', 'google', 'infrastructure'],
          publishedAt: '2024-01-10T09:15:00Z',
        },
        {
          id: '4',
          title: 'TechSparks 2024 - Startup Pitch Competition Registration Open',
          content: 'YourStory TechSparks 2024, India\'s largest startup-tech summit, is now accepting registrations for the startup pitch competition. Winners receive funding opportunities, mentorship, and exposure to top investors and industry leaders.',
          excerpt: 'TechSparks 2024 startup pitch competition registration now open with funding opportunities',
          type: 'event',
          category: 'private',
          priority: 'normal',
          targetAudience: ['early-stage', 'growth'],
          industries: ['all'],
          eventDate: '2024-03-15T09:00:00Z',
          applicationDeadline: '2024-02-20T23:59:59Z',
          externalLinks: {
            website: 'https://yourstory.com/techsparks',
            applicationLink: 'https://yourstory.com/techsparks/register',
          },
          isSponsored: false,
          isAdminPost: false,
          isPinned: false,
          isFeatured: false,
          viewsCount: 4320,
          savesCount: 89,
          isSaved: false,
          tags: ['event', 'pitch-competition', 'techsparks', 'funding'],
          publishedAt: '2024-01-08T16:45:00Z',
          author: {
            name: 'Startup Ecosystem Team',
          },
        },
        {
          id: '5',
          title: 'MSME Loan Scheme - Quick Processing for Tech Startups',
          content: 'The Ministry of MSME has announced a special loan scheme for technology startups with quick processing within 15 days. Loans up to ₹1 crore available at subsidized interest rates for eligible tech startups registered under Startup India.',
          excerpt: 'MSME launches quick loan scheme for tech startups with 15-day processing',
          type: 'scheme',
          category: 'government',
          priority: 'urgent',
          targetAudience: ['early-stage', 'growth'],
          industries: ['tech', 'saas', 'ai'],
          applicationDeadline: '2024-01-31T23:59:59Z',
          validUntil: '2024-01-31T23:59:59Z',
          externalLinks: {
            applicationLink: 'https://msme.gov.in/startup-loans',
            moreInfo: 'https://msme.gov.in/schemes',
          },
          isSponsored: false,
          isAdminPost: true,
          isPinned: false,
          isFeatured: false,
          viewsCount: 3450,
          savesCount: 67,
          isSaved: false,
          tags: ['msme', 'loans', 'government', 'tech-startups'],
          publishedAt: '2024-01-05T11:20:00Z',
        },
      ];

        setAnnouncements(mockAnnouncements);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedPriority, showExpired, searchQuery]);

  const applyFilters = useCallback(() => {
    let filtered = [...announcements];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(announcement => announcement.type === selectedCategory);
    }

    // Priority filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(announcement => announcement.priority === selectedPriority);
    }

    // Expired filter
    if (!showExpired) {
      const now = new Date();
      filtered = filtered.filter(announcement => {
        if (announcement.validUntil) {
          return new Date(announcement.validUntil) > now;
        }
        if (announcement.applicationDeadline) {
          return new Date(announcement.applicationDeadline) > now;
        }
        return true;
      });
    }

    // Sort by priority and date
    filtered.sort((a, b) => {
      // First by pinned
      if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
      
      // Then by priority
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
      if (aPriority !== bPriority) return bPriority - aPriority;
      
      // Finally by date
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    setFilteredAnnouncements(filtered);
  }, [searchQuery, selectedCategory, selectedPriority, showExpired, announcements]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSave = async (id: string) => {
    try {
      const response = await fetch(`/api/community/announcements/${id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save announcement');
      }

      const data = await response.json();
      
      // Update local state
      setAnnouncements(announcements.map(announcement =>
        announcement.id === id
          ? { 
              ...announcement, 
              isSaved: data.isSaved,
              savesCount: data.savesCount
            }
          : announcement
      ));
    } catch (error) {
      console.error('Error saving announcement:', error);
      // Fallback to optimistic update
      setAnnouncements(announcements.map(announcement =>
        announcement.id === id
          ? { 
              ...announcement, 
              isSaved: !announcement.isSaved,
              savesCount: announcement.isSaved 
                ? announcement.savesCount - 1 
                : announcement.savesCount + 1
            }
          : announcement
      ));
    }
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      scheme: Award,
      opportunity: TrendingUp,
      event: Calendar,
      funding: Banknote,
      deadline: AlertTriangle,
      announcement: Megaphone,
      sponsored: Crown,
    };
    return icons[type as keyof typeof icons] || Megaphone;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      scheme: 'bg-green-100 text-green-700',
      opportunity: 'bg-blue-100 text-blue-700',
      event: 'bg-purple-100 text-purple-700',
      funding: 'bg-yellow-100 text-yellow-700',
      deadline: 'bg-red-100 text-red-700',
      announcement: 'bg-gray-100 text-gray-700',
      sponsored: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.id === priority)?.color || 'bg-gray-100 text-gray-700';
  };

  const formatTimeLeft = (dateString: string) => {
    const deadline = new Date(dateString);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Expires soon';
  };

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading opportunities...</Text>
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
              
              <div className="flex gap-3">
                <Link href="/community/opportunities/submit">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Submit Opportunity
                  </Button>
                </Link>
                <Link href="/community/opportunities/advertise">
                  <Button variant="primary" className="flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Advertise Here
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Megaphone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Opportunities & Announcements
                </Heading>
                <Text className="text-gray-600">
                  Stay updated with latest schemes, funding opportunities, and startup events
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
                    placeholder="Search for schemes, funding, events, or opportunities..."
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
                          <IconComponent className={`w-4 h-4 ${category.color}`} />
                          {category.name}
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
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="all">All Priorities</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Options</label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={showExpired}
                            onChange={(e) => setShowExpired(e.target.checked)}
                            className="rounded"
                          />
                          Show expired
                        </label>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedPriority('all');
                        setShowExpired(false);
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
              Found {filteredAnnouncements.length} opportunities
              {searchQuery && ` for "${searchQuery}"`}
            </Text>
          </div>

          {/* Announcements Grid */}
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement) => {
              const TypeIcon = getTypeIcon(announcement.type);
              const hasDeadline = announcement.applicationDeadline || announcement.validUntil;
              const deadline = announcement.applicationDeadline || announcement.validUntil;
              
              return (
                <Card key={announcement.id} className={`
                  hover:shadow-lg transition-shadow
                  ${announcement.isPinned ? 'ring-2 ring-orange-200 bg-orange-50' : ''}
                  ${announcement.isSponsored ? 'ring-2 ring-purple-200 bg-gradient-to-r from-purple-50 to-pink-50' : ''}
                `}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Icon/Image */}
                      <div className="flex-shrink-0">
                        {announcement.imageUrl || announcement.sponsorLogo ? (
                          <Image 
                            src={(announcement.imageUrl || announcement.sponsorLogo) || '/placeholder.jpg'} 
                            alt={announcement.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                            <TypeIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Link href={`/community/opportunities/${announcement.id}`}>
                                <Heading as="h3" variant="h5" className="hover:text-blue-600 cursor-pointer line-clamp-2">
                                  {announcement.title}
                                </Heading>
                              </Link>
                              
                              {announcement.isPinned && (
                                <Badge variant="warning" size="sm">
                                  <Star className="w-3 h-3 mr-1" />
                                  Pinned
                                </Badge>
                              )}
                              
                              {announcement.isSponsored && (
                                <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700" size="sm">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Sponsored
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <Badge className={getTypeColor(announcement.type)}>
                                {announcement.type}
                              </Badge>
                              
                              <Badge className={getPriorityColor(announcement.priority)} size="sm">
                                {announcement.priority}
                              </Badge>
                              
                              {announcement.isAdminPost ? (
                                <div className="flex items-center gap-1 text-green-600">
                                  <Shield className="w-4 h-4" />
                                  <Text size="sm" weight="medium">Official</Text>
                                </div>
                              ) : announcement.author && (
                                <Text size="sm" color="muted">
                                  by {announcement.author.name}
                                </Text>
                              )}
                              
                              <Text size="sm" color="muted">
                                {new Date(announcement.publishedAt).toLocaleDateString()}
                              </Text>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSave(announcement.id)}
                              className="flex items-center gap-1"
                            >
                              {announcement.isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                              <Text size="sm">{announcement.savesCount}</Text>
                            </Button>
                            
                            <div className="flex items-center gap-1 text-gray-500">
                              <Eye className="w-4 h-4" />
                              <Text size="sm">{announcement.viewsCount.toLocaleString()}</Text>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <Text className="mb-4 line-clamp-2">
                          {announcement.excerpt}
                        </Text>

                        {/* Sponsored info */}
                        {announcement.isSponsored && announcement.sponsorName && (
                          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Crown className="w-4 h-4 text-purple-600" />
                              <Text size="sm" className="text-purple-700">
                                Sponsored by {announcement.sponsorName}
                              </Text>
                              {announcement.sponsorWebsite && (
                                <a 
                                  href={announcement.sponsorWebsite} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:underline text-sm"
                                >
                                  Visit Website
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Deadline Warning */}
                        {hasDeadline && deadline && (
                          <div className={`mb-4 p-3 rounded-lg border ${
                            new Date(deadline) < new Date()
                              ? 'bg-red-50 border-red-200'
                              : new Date(deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
                                ? 'bg-yellow-50 border-yellow-200'
                                : 'bg-blue-50 border-blue-200'
                          }`}>
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 ${
                                new Date(deadline) < new Date()
                                  ? 'text-red-600'
                                  : new Date(deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
                                    ? 'text-yellow-600'
                                    : 'text-blue-600'
                              }`} />
                              <Text size="sm" className={
                                new Date(deadline) < new Date()
                                  ? 'text-red-700'
                                  : new Date(deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
                                    ? 'text-yellow-700'
                                    : 'text-blue-700'
                              }>
                                {announcement.applicationDeadline ? 'Application deadline: ' : 'Valid until: '}
                                {new Date(deadline).toLocaleDateString()} ({formatTimeLeft(deadline)})
                              </Text>
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-4">
                          {announcement.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">
                              #{tag}
                            </Badge>
                          ))}
                          {announcement.tags.length > 4 && (
                            <Badge variant="outline" size="sm">
                              +{announcement.tags.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Link href={`/community/opportunities/${announcement.id}`}>
                              <Button variant="primary" size="sm">
                                View Details
                              </Button>
                            </Link>
                            
                            {announcement.externalLinks?.applicationLink && (
                              <a href={announcement.externalLinks.applicationLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  Apply Now
                                </Button>
                              </a>
                            )}
                            
                            {announcement.externalLinks?.website && (
                              <a href={announcement.externalLinks.website} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  Website
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredAnnouncements.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h3" variant="h5" className="mb-2">
                  No opportunities found
                </Heading>
                <Text color="muted" className="mb-6">
                  Try adjusting your filters or check back later for new opportunities.
                </Text>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedPriority('all');
                    setShowExpired(false);
                  }}>
                    Clear All Filters
                  </Button>
                  <Link href="/community/opportunities/submit">
                    <Button variant="primary">
                      Submit Opportunity
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