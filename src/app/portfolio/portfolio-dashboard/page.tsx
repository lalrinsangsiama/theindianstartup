'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  FileText,
  TrendingUp,
  Calendar,
  Download,
  Edit,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart,
  Activity,
  Star,
  Target,
  Lightbulb,
  DollarSign,
  Users,
  Scale,
  Palette,
  Shield,
  ArrowRight,
  ExternalLink,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { PortfolioErrorBoundary } from '@/components/portfolio/PortfolioErrorBoundary';

interface PortfolioSection {
  id: string;
  name: string;
  title: string;
  description: string;
  order: number;
  icon: string;
  completionPercentage: number;
  completedActivities: number;
  totalActivities: number;
  activities: any[];
}

interface Portfolio {
  id: string;
  startupName: string;
  tagline: string;
  overallCompletion: number;
  completedSections: number;
  totalSections: number;
}

interface PortfolioStats {
  totalActivities: number;
  completedActivities: number;
  draftActivities: number;
  lastUpdated: number | null;
}

interface Recommendation {
  type: string;
  title: string;
  description: string;
  productCode?: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  ctaText: string;
}

// Section icons mapping
const sectionIcons: Record<string, React.ReactNode> = {
  'executive_summary': <FileText className="w-6 h-6" />,
  'problem_solution': <Lightbulb className="w-6 h-6" />,
  'market_research': <BarChart className="w-6 h-6" />,
  'business_model': <DollarSign className="w-6 h-6" />,
  'product_development': <Target className="w-6 h-6" />,
  'go_to_market': <TrendingUp className="w-6 h-6" />,
  'team_organization': <Users className="w-6 h-6" />,
  'financial_projections': <DollarSign className="w-6 h-6" />,
  'legal_compliance': <Scale className="w-6 h-6" />,
  'brand_identity': <Palette className="w-6 h-6" />,
  'risk_mitigation': <Shield className="w-6 h-6" />,
  'growth_scaling': <Activity className="w-6 h-6" />
};

export default function PortfolioDashboardPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [sections, setSections] = useState<PortfolioSection[]>([]);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch portfolio data
        const [portfolioResponse, recommendationsResponse] = await Promise.all([
          fetch('/api/portfolio'),
          fetch('/api/portfolio/recommendations')
        ]);
        
        if (!portfolioResponse.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        
        const portfolioData = await portfolioResponse.json();
        
        setPortfolio(portfolioData.portfolio);
        setSections(portfolioData.sections || []);
        setStats(portfolioData.stats);
        
        // Handle recommendations (non-critical)
        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          setRecommendations(recommendationsData.recommendations || []);
        }
        
      } catch (err) {
        logger.error('Failed to fetch portfolio data:', err);
        setError('Failed to load portfolio. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [user]);

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-blue-600 bg-blue-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
              <Text className="ml-2">Loading your portfolio...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PortfolioErrorBoundary>
        <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" className="mb-2">
                {portfolio?.startupName || 'Your Startup'} Portfolio
              </Heading>
              <Text color="muted">
                Build a comprehensive portfolio as you complete course activities
              </Text>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden md:flex">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="primary">
                <Edit className="w-4 h-4 mr-2" />
                Edit Info
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="warning">
              {error}
            </Alert>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text color="muted" size="sm">Portfolio Complete</Text>
                    <Heading as="h3" variant="h2" className="mt-1">
                      {portfolio?.overallCompletion || 0}%
                    </Heading>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <ProgressBar 
                  value={portfolio?.overallCompletion || 0} 
                  className="mt-4" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text color="muted" size="sm">Sections Complete</Text>
                    <Heading as="h3" variant="h2" className="mt-1">
                      {portfolio?.completedSections || 0}/{portfolio?.totalSections || 0}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text color="muted" size="sm">Activities</Text>
                    <Heading as="h3" variant="h2" className="mt-1">
                      {stats?.completedActivities || 0}/{stats?.totalActivities || 0}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text color="muted" size="sm">Last Updated</Text>
                    <Heading as="h3" variant="h3" className="mt-1">
                      {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'Never'}
                    </Heading>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Sections Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Heading as="h2" variant="h3">Portfolio Sections</Heading>
              <Text color="muted" size="sm">
                Click any section to view details and add activities
              </Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Card 
                  key={section.id} 
                  className="cursor-pointer hover:border-black transition-colors"
                  onClick={() => router.push(`/portfolio/section/${section.name}`)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          {sectionIcons[section.name] || <FileText className="w-5 h-5" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                        </div>
                      </div>
                      <Badge className={getCompletionColor(section.completionPercentage)}>
                        {section.completionPercentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" color="muted" className="mb-4">
                      {section.description}
                    </Text>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Text size="sm" color="muted">
                          {section.completedActivities}/{section.totalActivities} activities complete
                        </Text>
                        <Text size="sm" weight="medium">
                          {section.completionPercentage}%
                        </Text>
                      </div>
                      <ProgressBar value={section.completionPercentage} />
                    </div>

                    {section.completionPercentage === 100 ? (
                      <div className="flex items-center gap-2 mt-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <Text size="sm" className="text-green-600">Section Complete</Text>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between mt-3">
                        <Text size="sm" color="muted">
                          {section.totalActivities - section.completedActivities} activities remaining
                        </Text>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <Heading as="h2" variant="h3">Recommended Next Steps</Heading>
                <Text color="muted" size="sm">
                  Based on your portfolio progress
                </Text>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map((recommendation, index) => (
                  <Card key={index} className={getPriorityColor(recommendation.priority)}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Text weight="medium">{recommendation.title}</Text>
                            <Badge size="sm" variant="outline" className={
                              recommendation.priority === 'high' ? 'text-red-600 border-red-300' :
                              recommendation.priority === 'medium' ? 'text-yellow-600 border-yellow-300' :
                              'text-gray-600 border-gray-300'
                            }>
                              {recommendation.priority}
                            </Badge>
                          </div>
                          <Text size="sm" color="muted" className="mb-2">
                            {recommendation.description}
                          </Text>
                          <Text size="xs" className="text-green-600 mb-3">
                            Impact: {recommendation.impact}
                          </Text>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (recommendation.productCode) {
                            router.push(`/pricing?highlight=${recommendation.productCode}`);
                          }
                        }}
                      >
                        {recommendation.ctaText}
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <Heading as="h3" variant="h3" className="mb-3">
                Ready to Export Your Portfolio?
              </Heading>
              <Text color="muted" className="mb-6 max-w-2xl mx-auto">
                Your portfolio is {portfolio?.overallCompletion || 0}% complete. 
                {portfolio?.overallCompletion && portfolio.overallCompletion >= 70 
                  ? ' Export it as a professional one-pager or pitch deck!'
                  : ' Complete more sections to unlock export options.'
                }
              </Text>
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="primary" 
                  disabled={(portfolio?.overallCompletion || 0) < 70}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Portfolio
                </Button>
                <Link href="/portfolio/sections">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Sections
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        </DashboardLayout>
      </PortfolioErrorBoundary>
    </ProtectedRoute>
  );
}