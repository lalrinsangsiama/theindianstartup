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
  ArrowLeft,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  ExternalLink,
  Loader2,
  FileText,
  Target,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { PortfolioErrorBoundary } from '@/components/portfolio/PortfolioErrorBoundary';

interface ActivityType {
  id: string;
  name: string;
  category: string;
  portfolioSection: string;
  portfolioField: string;
  dataSchema: any;
  userProgress?: {
    status: string;
    data: any;
    lastUpdated: string;
    isCompleted: boolean;
  } | null;
}

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
  requiredActivities: string[];
  fields: {
    fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
    }>;
  };
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

interface PageProps {
  params: {
    sectionName: string;
  };
}

export default function PortfolioSectionPage({ params }: PageProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { sectionName } = params;
  
  const [section, setSection] = useState<PortfolioSection | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch portfolio data to get section info
        const portfolioResponse = await fetch('/api/portfolio');
        if (!portfolioResponse.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        
        const portfolioData = await portfolioResponse.json();
        const sectionData = portfolioData.sections?.find((s: PortfolioSection) => s.name === sectionName);
        
        if (!sectionData) {
          setError('Portfolio section not found');
          return;
        }
        
        setSection(sectionData);

        // Fetch activities for this section
        const activitiesResponse = await fetch('/api/portfolio/activities');
        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          const sectionActivities = activitiesData.activities?.filter((a: ActivityType) => 
            a.portfolioSection === sectionName
          ) || [];
          
          setActivities(sectionActivities);
        }

        // Fetch recommendations
        const recommendationsResponse = await fetch('/api/portfolio/recommendations');
        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          const sectionRecommendations = recommendationsData.recommendations?.filter((r: Recommendation) => 
            r.type === 'course_purchase' || r.type === 'activity_completion'
          ) || [];
          
          setRecommendations(sectionRecommendations.slice(0, 3));
        }
        
      } catch (err) {
        logger.error('Failed to fetch section data:', err);
        setError('Failed to load section. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData();
  }, [user, sectionName]);

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'draft': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleEditActivity = (activity: ActivityType) => {
    // For now, we'll just show an alert. In a real implementation,
    // this would open a modal or navigate to an activity editor
    alert(`Edit activity: ${activity.name}`);
  };

  const handleAddActivity = () => {
    // Navigate to activity selection or creation
    alert('Add new activity feature coming soon!');
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
              <Text className="ml-2">Loading section...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error || !section) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <Alert variant="warning">
              {error || 'Section not found'}
            </Alert>
            <div className="mt-6">
              <Button onClick={() => router.push('/portfolio/portfolio-dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/portfolio/portfolio-dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  {section.icon || <FileText className="w-5 h-5" />}
                </div>
                <Heading as="h1">{section.title}</Heading>
                <Badge className={section.completionPercentage === 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                  {section.completionPercentage}% Complete
                </Badge>
              </div>
              <Text color="muted">{section.description}</Text>
            </div>
          </div>

          {/* Section Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Section Progress</span>
                <Text color="muted" size="sm">
                  {section.completedActivities}/{section.totalActivities} activities complete
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressBar value={section.completionPercentage} className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{section.completedActivities}</div>
                  <Text size="sm" color="muted">Completed</Text>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {activities.filter(a => a.userProgress?.status === 'draft').length}
                  </div>
                  <Text size="sm" color="muted">In Progress</Text>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {section.totalActivities - section.completedActivities}
                  </div>
                  <Text size="sm" color="muted">Remaining</Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Heading as="h2" variant="h3">Activities</Heading>
              <Button onClick={handleAddActivity}>
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {activities.map((activity) => (
                <Card 
                  key={activity.id}
                  className="hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() => setSelectedActivity(activity)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Text weight="medium">{activity.name}</Text>
                          {activity.userProgress && (
                            <Badge className={getActivityStatusColor(activity.userProgress.status)}>
                              <div className="flex items-center gap-1">
                                {getActivityStatusIcon(activity.userProgress.status)}
                                {activity.userProgress.status}
                              </div>
                            </Badge>
                          )}
                        </div>
                        
                        <Text size="sm" color="muted" className="mb-3">
                          Category: {activity.category.replace('_', ' ')}
                        </Text>

                        {activity.userProgress?.data && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <Text size="sm" weight="medium" className="mb-1">Preview:</Text>
                            <Text size="sm" color="muted" className="line-clamp-2">
                              {typeof activity.userProgress.data === 'string' 
                                ? activity.userProgress.data.substring(0, 100) + '...'
                                : JSON.stringify(activity.userProgress.data).substring(0, 100) + '...'
                              }
                            </Text>
                          </div>
                        )}

                        {activity.userProgress?.lastUpdated && (
                          <Text size="xs" color="muted">
                            Last updated: {new Date(activity.userProgress.lastUpdated).toLocaleDateString()}
                          </Text>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {activity.userProgress ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditActivity(activity);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        ) : (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditActivity(activity);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {activities.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-gray-400" />
                  </div>
                  <Heading as="h3" variant="h4" className="mb-2">No Activities Yet</Heading>
                  <Text color="muted" className="mb-6">
                    Complete course activities to automatically populate this section
                  </Text>
                  <Button onClick={handleAddActivity}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Activity
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommendations for improving this section */}
          {recommendations.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle>Recommended to Complete This Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex-1">
                        <Text weight="medium" className="mb-1">{rec.title}</Text>
                        <Text size="sm" color="muted">{rec.description}</Text>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (rec.productCode) {
                            router.push(`/pricing?highlight=${rec.productCode}`);
                          }
                        }}
                      >
                        {rec.ctaText}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}