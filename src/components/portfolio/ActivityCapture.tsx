'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import {
  Briefcase,
  CheckCircle,
  AlertCircle,
  Save,
  Eye,
  RefreshCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ActivityCaptureProps {
  activityTypeId: string;
  activityName: string;
  lessonId?: string;
  courseCode?: string;
  moduleId?: string;
  initialData?: any;
  onSave?: (data: any) => void;
  className?: string;
}

interface ActivityType {
  id: string;
  name: string;
  category: string;
  portfolioSection: string;
  portfolioField: string;
  dataSchema: any;
}

interface UserActivity {
  id: string;
  status: string;
  data: any;
  lastUpdated: string;
}

export function ActivityCapture({
  activityTypeId,
  activityName,
  lessonId,
  courseCode,
  moduleId,
  initialData,
  onSave,
  className = ''
}: ActivityCaptureProps) {
  const [activityType, setActivityType] = useState<ActivityType | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [activityData, setActivityData] = useState<any>(initialData || {});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPortfolioPreview, setShowPortfolioPreview] = useState(false);

  const fetchActivityData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`/api/portfolio/activities/${activityTypeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activity data');
      }

      const data = await response.json();
      setActivityType(data.activityType);
      setUserActivity(data.userActivity);
      
      // Use existing data if available, otherwise use initial data
      if (data.userActivity?.data) {
        setActivityData(data.userActivity.data);
      } else if (initialData) {
        setActivityData(initialData);
      }

    } catch (err) {
      logger.error('Failed to fetch activity data:', err);
      setError('Failed to load activity data');
    } finally {
      setIsLoading(false);
    }
  }, [activityTypeId, initialData]);

  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);

  // Prepare display value for textarea
  const displayValue = React.useMemo(() => {
    if (typeof activityData === 'string') {
      return activityData;
    }
    if (activityData && typeof activityData === 'object') {
      try {
        return JSON.stringify(activityData, null, 2);
      } catch {
        return String(activityData);
      }
    }
    return '';
  }, [activityData]);

  const saveActivity = async (status: 'draft' | 'completed' = 'completed') => {
    try {
      setIsSaving(true);
      setError('');

      // Validate activity data
      if (!activityData || (typeof activityData === 'string' && !activityData.trim())) {
        setError('Please enter some content before saving.');
        return;
      }

      const response = await fetch(`/api/portfolio/activities/${activityTypeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: activityData,
          status,
          sourceLesson: lessonId,
          sourceCourse: courseCode,
          sourceModule: moduleId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save activity');
      }

      const result = await response.json();
      setUserActivity(result.activity);
      
      // Call the onSave callback if provided
      if (onSave) {
        onSave(activityData);
      }

      // Show success message or animation
      setShowPortfolioPreview(true);
      setTimeout(() => setShowPortfolioPreview(false), 3000);

    } catch (err) {
      logger.error('Failed to save activity:', err);
      setError('Failed to save activity. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderActivityForm = () => {
    if (!activityType) return null;

    // For now, we'll render a simple textarea for all activity types
    // In a full implementation, we'd render different forms based on the dataSchema
    return (
      <div className="space-y-4">
        <div>
          <Text weight="medium" className="mb-2">
            {activityType.name}
          </Text>
          <textarea
            value={displayValue}
            onChange={(e) => {
              const value = e.target.value;
              if (!value.trim()) {
                setActivityData('');
                return;
              }

              try {
                // Try to parse as JSON for structured data, fallback to string
                const parsed = JSON.parse(value);
                setActivityData(parsed);
              } catch {
                // Keep as string if JSON parsing fails
                setActivityData(value);
              }
            }}
            className="w-full min-h-32 p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none resize-vertical"
            placeholder={`Enter your ${activityType.name.toLowerCase()}...`}
            disabled={isSaving}
          />
        </div>
        
        <Text size="sm" color="muted">
          This will be automatically added to your portfolio's <strong>{activityType.portfolioSection?.replace('_', ' ') || 'portfolio'}</strong> section.
        </Text>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className={`border-blue-200 bg-blue-50 ${className}`}>
        <CardContent className="p-6 text-center">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
          <Text color="muted">Loading activity...</Text>
        </CardContent>
      </Card>
    );
  }

  if (error && !activityType) {
    return (
      <Alert variant="warning" className={className}>
        <AlertCircle className="w-4 h-4" />
        {error}
      </Alert>
    );
  }

  return (
    <Card className={`border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Portfolio Activity</CardTitle>
              <Text size="sm" color="muted">
                {activityName || activityType?.name}
              </Text>
            </div>
          </div>
          
          {userActivity && (
            <Badge className={
              userActivity.status === 'completed' 
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }>
              <div className="flex items-center gap-1">
                {userActivity.status === 'completed' 
                  ? <CheckCircle className="w-3 h-3" />
                  : <AlertCircle className="w-3 h-3" />
                }
                {userActivity.status}
              </div>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Portfolio connection indicator */}
        <div className="flex items-center gap-2 p-3 bg-blue-100 rounded-lg">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <Text size="sm" className="text-blue-800">
            <strong>Connected to Portfolio:</strong> This activity will update your portfolio's {' '}
            {activityType?.portfolioSection?.replace('_', ' ') || 'section'} automatically
          </Text>
        </div>

        {error && (
          <Alert variant="warning">
            <AlertCircle className="w-4 h-4" />
            {error}
          </Alert>
        )}

        {/* Activity form */}
        {renderActivityForm()}

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => saveActivity('completed')}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {userActivity ? 'Update Portfolio' : 'Save to Portfolio'}
          </Button>

          <Button
            variant="outline"
            onClick={() => saveActivity('draft')}
            disabled={isSaving}
          >
            Save Draft
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('/portfolio/portfolio-dashboard', '_blank')}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Portfolio
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>

        {/* Success indicator */}
        {showPortfolioPreview && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Text weight="medium" className="text-green-800">
                Saved to Portfolio!
              </Text>
            </div>
            <Text size="sm" color="muted">
              Your activity has been automatically added to your startup portfolio. 
              {userActivity?.lastUpdated && (
                <span> Last updated: {new Date(userActivity.lastUpdated).toLocaleString()}</span>
              )}
            </Text>
          </div>
        )}

        {/* Show existing data preview if available */}
        {userActivity?.data && !showPortfolioPreview && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <Text size="sm" weight="medium" className="mb-1">
              Current Portfolio Data:
            </Text>
            <Text size="sm" color="muted" className="line-clamp-3">
              {typeof userActivity.data === 'string' 
                ? userActivity.data.substring(0, 150) + (userActivity.data.length > 150 ? '...' : '')
                : JSON.stringify(userActivity.data).substring(0, 150) + '...'
              }
            </Text>
            <Text size="xs" color="muted" className="mt-1">
              Last updated: {new Date(userActivity.lastUpdated).toLocaleDateString()}
            </Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
}