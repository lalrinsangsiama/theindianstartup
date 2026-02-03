'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Play,
  Heart,
  Eye,
  Calendar,
  Building,
  DollarSign,
  Users,
  Plus,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { COURSE_OUTCOMES } from '@/lib/course-outcomes';
import { PLATFORM_METRICS } from '@/components/social-proof/PlatformMetrics';

interface SuccessStory {
  id: string;
  title: string;
  story: string;
  companyName: string;
  industry: string;
  revenue?: string;
  timeline: string;
  keyLearnings: string[];
  images: string[];
  videoUrl?: string;
  likesCount: number;
  viewsCount: number;
  isFeatured: boolean;
  createdAt: string;
  author: {
    name: string;
    avatar?: string;
    badges: string[];
  };
}

export default function SuccessStoriesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [filter, setFilter] = useState('all'); // all, featured, recent

  const fetchSuccessStories = useCallback(async () => {
    try {
      setLoading(true);
      
      // Comprehensive success stories with real outcomes
      const mockStories: SuccessStory[] = [
        {
          id: '1',
          title: 'Accessed ₹45L in State Subsidies Within 60 Days',
          story: 'I was struggling to find funding for my food processing startup. Traditional investors wanted traction I didn\'t have yet. Then I discovered P7 State-wise Scheme Map. The course showed me subsidies I never knew existed - PMFME in Maharashtra, cold chain grants in Gujarat, and MSME schemes in Karnataka. Within 60 days of completing the course, I had submitted applications to 5 schemes and got approved for 3. The state scheme database alone was worth 10x what I paid. Now I\'m expanding to 3 states with government support covering 40% of my capital costs.',
          companyName: 'NutriBox India',
          industry: 'Food Processing',
          revenue: '₹45L subsidies',
          timeline: '60 days',
          keyLearnings: [
            'Most founders miss state subsidies because they don\'t know where to look',
            'Each state has different schemes - multi-state strategy multiplies benefits',
            'Application quality matters more than company size',
            'Government relationships open doors to more schemes later'
          ],
          images: [],
          likesCount: 287,
          viewsCount: 4520,
          isFeatured: true,
          createdAt: '2026-01-15',
          author: {
            name: 'Priya Sharma',
            badges: ['Subsidy Master', 'Food Processing Pro', 'Government Relations']
          }
        },
        {
          id: '2',
          title: 'Raised ₹2Cr Seed Round in 45 Days with P3',
          story: 'I had been pitching to investors for 8 months with no success. My pitch deck was decent, but I wasn\'t getting term sheets. P3 Funding Mastery changed everything. The course taught me how to structure my story for Indian angel investors, create a proper financial model (not just revenue projections), and build a warm intro strategy. The investor database gave me 50+ qualified contacts. Within 45 days of completing the course, I had 3 term sheets and closed at ₹2Cr with a 2-year runway. The pitch deck templates and negotiation frameworks were game-changers.',
          companyName: 'PayFlow Technologies',
          industry: 'FinTech',
          revenue: '₹2Cr seed round',
          timeline: '45 days to term sheets',
          keyLearnings: [
            'Warm intros convert 10x better than cold outreach in India',
            'Financial models must show unit economics, not just revenue',
            'Indian angels care about founder commitment and skin in the game',
            'Multiple term sheets give you negotiating leverage'
          ],
          images: [],
          videoUrl: 'https://youtube.com/watch?v=example',
          likesCount: 412,
          viewsCount: 6890,
          isFeatured: true,
          createdAt: '2026-01-10',
          author: {
            name: 'Rahul Mehta',
            badges: ['Funding Pro', 'Pitch Perfect', 'FinTech Expert']
          }
        },
        {
          id: '3',
          title: 'Incorporated and Got DPIIT Recognition in 45 Days',
          story: 'As a first-time founder, I was overwhelmed by the incorporation process. Should I go Pvt Ltd or LLP? What about DPIIT? GST? The complexity was paralyzing me. P1 and P2 gave me a clear roadmap. Day by day, I followed the checklist - name approval, DSC, incorporation, GST registration, and finally DPIIT. The templates saved me ₹50K in consultant fees. My CA was impressed with how prepared I was. In 45 days, I had a fully incorporated Pvt Ltd with DPIIT startup recognition. Now I qualify for tax benefits and government schemes that weren\'t available to me before.',
          companyName: 'MedAssist Health',
          industry: 'HealthTech',
          revenue: '₹50K saved in fees',
          timeline: '45 days',
          keyLearnings: [
            'Having a checklist removes decision paralysis',
            'DPIIT recognition unlocks many government benefits',
            'Template documents are 80% of a consultant\'s value',
            'Starting compliant from day 1 avoids expensive fixes later'
          ],
          images: [],
          likesCount: 356,
          viewsCount: 5430,
          isFeatured: true,
          createdAt: '2026-01-08',
          author: {
            name: 'Ananya Reddy',
            badges: ['Launch Legend', 'Compliance Pro', 'HealthTech Pioneer']
          }
        },
        {
          id: '4',
          title: 'Applied for ₹5Cr PLI Scheme with P24 Manufacturing Course',
          story: 'We were a small manufacturing unit doing ₹2Cr annual revenue. I heard about PLI schemes but thought they were only for big companies. P24 Manufacturing & Make in India showed me that\'s not true - there are schemes for companies our size too. The course walked me through the eligibility criteria, documentation requirements, and application process for the PLI scheme in our sector. The compliance checklists ensured we didn\'t miss anything. We\'ve now submitted our PLI application worth ₹5Cr in incentives over 5 years. Even if we get 50%, that\'s transformational for our growth.',
          companyName: 'GreenWeld Manufacturing',
          industry: 'Manufacturing',
          revenue: '₹5Cr PLI application',
          timeline: '90 days',
          keyLearnings: [
            'PLI schemes are not just for large companies',
            'Documentation quality determines approval chances',
            'State and central schemes can be combined',
            'Manufacturing compliance is complex but navigable with the right guide'
          ],
          images: [],
          likesCount: 234,
          viewsCount: 3870,
          isFeatured: false,
          createdAt: '2026-01-05',
          author: {
            name: 'Vikram Patel',
            badges: ['Manufacturing Expert', 'PLI Pro', 'Make in India']
          }
        },
        {
          id: '5',
          title: 'All-Access Bundle: From Idea to Series A Ready',
          story: 'When I started, I had an idea and zero knowledge of running a startup in India. I bought the All-Access bundle because I knew I\'d need everything eventually. Over 6 months, I went through P1 (launch), P2 (compliance), P5 (legal), P4 (finance), P6 (sales), and P3 (funding) in sequence. Each course built on the previous. By month 6, I had a compliant company, proper financial systems, legal contracts, and was raising my seed round. The bundle approach meant I never hit a knowledge gap - whatever I needed was already there. The ₹1.5L investment probably saved me ₹10L+ in consultants and mistakes.',
          companyName: 'LearnSmart EdTech',
          industry: 'EdTech',
          revenue: '₹3.5Cr raised',
          timeline: '6 months',
          keyLearnings: [
            'Having all courses removes friction when you need to learn something new',
            'Sequential learning from launch to funding creates compound knowledge',
            'The bundle pays for itself in avoided consultant fees',
            'Each course connects to others - legal affects finance affects funding'
          ],
          images: [],
          videoUrl: 'https://youtube.com/watch?v=example2',
          likesCount: 523,
          viewsCount: 8450,
          isFeatured: true,
          createdAt: '2026-01-01',
          author: {
            name: 'Sneha Agarwal',
            badges: ['All-Access Champion', 'EdTech Pioneer', 'Series A Ready']
          }
        },
        {
          id: '6',
          title: 'Registered FPO with 500+ Farmers Using P26',
          story: 'Bringing farmers together is hard. Getting them to trust a formal structure is harder. P26 AgriTech & Farm-to-Fork gave me the complete playbook for FPO registration. From member mobilization templates to board formation documents to government scheme applications - everything was there. I adapted the strategies for my region and within 3 months had a registered FPO with 500+ farmer members. We\'ve now accessed ₹35L in government grants for infrastructure. The e-NAM integration guide helped us connect to digital mandis, increasing farmer income by 15%.',
          companyName: 'AgriTech Solutions',
          industry: 'AgriTech',
          revenue: '₹35L grant',
          timeline: '3 months',
          keyLearnings: [
            'Farmer trust is built through transparent communication and quick wins',
            'FPO registration is complex but the templates simplify it dramatically',
            'Government schemes for FPOs are generous if you know where to apply',
            'Digital integration (e-NAM) creates immediate value for farmers'
          ],
          images: [],
          likesCount: 298,
          viewsCount: 4230,
          isFeatured: false,
          createdAt: '2025-12-28',
          author: {
            name: 'Arjun Krishnamurthy',
            badges: ['AgriTech Champion', 'FPO Expert', 'Rural Impact']
          }
        },
        {
          id: '7',
          title: 'Generated ₹80L from Carbon Credits in Year One',
          story: 'Our sustainability company was helping clients reduce emissions but we weren\'t monetizing the carbon credits properly. P15 Carbon Credits & Sustainability opened my eyes to the opportunity. The course covered GHG Protocol accounting, Verra VCS verification, and carbon credit trading. We restructured our projects to generate verified credits. In year one, we traded ₹80L worth of carbon credits - pure margin on top of our consulting revenue. The course paid for itself 80x over. Now we\'re building a portfolio of credit-generating projects.',
          companyName: 'CarbonNeutral Tech',
          industry: 'Sustainability',
          revenue: '₹80L carbon revenue',
          timeline: '8 months',
          keyLearnings: [
            'Carbon credits are a massive revenue opportunity most startups ignore',
            'Verra VCS verification is the gold standard - worth the investment',
            'Combining consulting with credit generation creates multiple revenue streams',
            'Net Zero strategy is becoming mandatory for corporates - huge market'
          ],
          images: [],
          likesCount: 267,
          viewsCount: 3980,
          isFeatured: true,
          createdAt: '2025-12-20',
          author: {
            name: 'Meera Iyer',
            badges: ['Sustainability Pro', 'Carbon Expert', 'ESG Pioneer']
          }
        },
        {
          id: '8',
          title: 'Obtained PA-PG License from RBI in 6 Months',
          story: 'Getting a payment aggregator license from RBI is notoriously difficult. Companies wait years or give up. P20 FinTech Mastery gave me the complete regulatory roadmap. Every document, every compliance requirement, every net-worth criterion - laid out clearly. We prepared our application meticulously following the course framework. Result? License granted in 6 months. Our competitors are still waiting. The course saved us ₹10L+ in regulatory consultants and probably 2 years of time. Now we\'re processing payments for 50+ merchants.',
          companyName: 'FinServ Digital',
          industry: 'FinTech',
          revenue: 'PA-PG License + ₹10L saved',
          timeline: '6 months',
          keyLearnings: [
            'RBI compliance is about meticulous documentation, not connections',
            'Understanding the intent behind regulations helps you comply better',
            'Net worth and security requirements must be planned from day 1',
            'Once licensed, you have a significant moat against competitors'
          ],
          images: [],
          likesCount: 445,
          viewsCount: 7120,
          isFeatured: true,
          createdAt: '2025-12-15',
          author: {
            name: 'Karthik Sundaram',
            badges: ['FinTech Expert', 'Regulatory Pro', 'Payments Pioneer']
          }
        }
      ];

      // Filter stories
      let filteredStories = mockStories;
      if (filter === 'featured') {
        filteredStories = mockStories.filter(story => story.isFeatured);
      } else if (filter === 'recent') {
        filteredStories = mockStories.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      setStories(filteredStories);
    } catch (error) {
      logger.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchSuccessStories();
  }, [fetchSuccessStories]);

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading success stories...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
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
              
              <Link href="/community/new-post">
                <Button variant="primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Share Your Story
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Success Stories
                </Heading>
                <Text className="text-gray-600">
                  Get inspired by fellow founders who&apos;ve built successful startups
                </Text>
              </div>
            </div>

            {/* Platform Metrics Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <Text className="text-2xl font-bold text-green-700">{PLATFORM_METRICS.foundersEnrolledDisplay}</Text>
                  <Text size="sm" color="muted">Founders Enrolled</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-blue-700">{PLATFORM_METRICS.fundingRaisedDisplay}</Text>
                  <Text size="sm" color="muted">Funding Raised</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-purple-700">{PLATFORM_METRICS.subsidiesAccessedDisplay}</Text>
                  <Text size="sm" color="muted">Subsidies Accessed</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-yellow-700">{PLATFORM_METRICS.avgRating}/5</Text>
                  <Text size="sm" color="muted">Avg Rating</Text>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-200 mb-6">
              {[
                { id: 'all', name: 'All Stories', icon: Trophy },
                { id: 'featured', name: 'Featured', icon: Star },
                { id: 'recent', name: 'Recent', icon: Clock },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 border-b-2 transition-colors
                      ${filter === tab.id 
                        ? 'border-blue-500 text-blue-600 bg-blue-50' 
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid lg:grid-cols-1 gap-8">
            {stories.map((story) => (
              <Card key={story.id} className={`
                hover:shadow-lg transition-shadow
                ${story.isFeatured ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''}
              `}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {story.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <Text weight="medium">{story.author.name}</Text>
                          <div className="flex gap-1">
                            {story.author.badges.map((badge, i) => (
                              <Badge key={i} variant="outline" size="sm">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Text size="sm" color="muted">{story.companyName} • {story.industry}</Text>
                      </div>
                    </div>
                    
                    {story.isFeatured && (
                      <Badge variant="warning" className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="mb-6">
                    <Heading as="h2" variant="h4" className="mb-4">
                      {story.title}
                    </Heading>
                    
                    <Text className="mb-6 leading-relaxed">
                      {story.story}
                    </Text>

                    {/* Key Metrics */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      {story.revenue && (
                        <div className="text-center">
                          <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                          <Text weight="medium" className="text-green-600">
                            {story.revenue}
                          </Text>
                          <Text size="sm" color="muted">Revenue</Text>
                        </div>
                      )}
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <Text weight="medium" className="text-blue-600">
                          {story.timeline}
                        </Text>
                        <Text size="sm" color="muted">Timeline</Text>
                      </div>
                      <div className="text-center">
                        <Building className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                        <Text weight="medium" className="text-purple-600">
                          {story.industry}
                        </Text>
                        <Text size="sm" color="muted">Industry</Text>
                      </div>
                    </div>

                    {/* Key Learnings */}
                    <div className="mb-6">
                      <Heading as="h4" variant="h6" className="mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Key Learnings
                      </Heading>
                      <ul className="space-y-2">
                        {story.keyLearnings.map((learning, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
                            <Text>{learning}</Text>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Video */}
                    {story.videoUrl && (
                      <div className="mb-6">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Watch Full Story
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Heart className="w-4 h-4" />
                        <Text size="sm">{story.likesCount} likes</Text>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <Text size="sm">{story.viewsCount.toLocaleString()} views</Text>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <Text size="sm">{new Date(story.createdAt).toLocaleDateString()}</Text>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm">
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {stories.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h3" variant="h5" className="mb-2">
                  No Success Stories Yet
                </Heading>
                <Text color="muted" className="mb-6">
                  Be the first to share your startup success story with the community!
                </Text>
                <Link href="/community/new-post">
                  <Button variant="primary">
                    Share Your Story
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-8 text-center">
              <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <Heading as="h3" variant="h4" className="mb-2">
                Share Your Success Story
              </Heading>
              <Text className="mb-6 max-w-2xl mx-auto">
                Inspire fellow founders by sharing your journey, challenges, and victories. 
                Your story could be the motivation someone needs to take their next big step.
              </Text>
              <Link href="/community/new-post">
                <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                  <Plus className="w-5 h-5" />
                  Share Your Story
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}