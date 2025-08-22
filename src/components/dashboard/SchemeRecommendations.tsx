'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Star, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Clock, 
  Target,
  ExternalLink,
  ChevronRight,
  Gift,
  Award,
  AlertCircle,
  Building
} from 'lucide-react';

interface SchemeRecommendation {
  scheme_code: string;
  scheme_name: string;
  match_score: number;
  recommendation_reason: string;
}

interface SchemeRecommendationsProps {
  userProfile?: {
    startup_stage?: 'idea' | 'early' | 'growth';
    sector?: string;
    state?: string;
    funding_need?: number;
  };
  maxRecommendations?: number;
  showUpgradePrompt?: boolean;
}

export default function SchemeRecommendations({ 
  userProfile = {
    startup_stage: 'early',
    sector: 'technology',
    state: 'Karnataka',
    funding_need: 2000000
  },
  maxRecommendations = 3,
  showUpgradePrompt = true 
}: SchemeRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SchemeRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/government-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'get_recommendations',
          data: userProfile
        })
      });

      if (response.status === 403) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations.slice(0, maxRecommendations));
          setHasAccess(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'idea': return <Target className="h-4 w-4" />;
      case 'early': return <TrendingUp className="h-4 w-4" />;
      case 'growth': return <Award className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card className="border-l-4 border-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-600" />
            Personalized Scheme Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasAccess && showUpgradePrompt) {
    return (
      <Card className="border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-yellow-600" />
            AI-Powered Scheme Recommendations
          </CardTitle>
          <p className="text-sm text-gray-600">Get personalized government scheme matches based on your startup profile</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg border">
              <Star className="h-6 w-6 text-blue-600 mb-1" />
              <p className="font-medium text-sm">Smart Matching</p>
              <p className="text-xs text-gray-600">85% match accuracy</p>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <TrendingUp className="h-6 w-6 text-green-600 mb-1" />
              <p className="font-medium text-sm">Success Tracking</p>
              <p className="text-xs text-gray-600">65-85% approval rates</p>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <Clock className="h-6 w-6 text-purple-600 mb-1" />
              <p className="font-medium text-sm">Real-time Data</p>
              <p className="text-xs text-gray-600">Updated 2025 schemes</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1">
              <Award className="h-4 w-4 mr-2" />
              Upgrade to P7 - State Schemes
            </Button>
            <Button variant="outline" className="flex-1">
              <Building className="h-4 w-4 mr-2" />
              View All Products
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500">
            Access 13+ verified schemes with detailed eligibility and application guidance
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className="border-l-4 border-gray-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-gray-600" />
            No Recommendations Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Complete your startup profile to get personalized scheme recommendations.
          </p>
          <Button variant="outline" onClick={() => window.location.href = '/profile'}>
            Update Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-purple-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-purple-600" />
              Recommended Government Schemes
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Personalized matches for {userProfile.startup_stage} stage {userProfile.sector} startup
            </p>
          </div>
          <div className="flex items-center gap-1">
            {getStageIcon(userProfile.startup_stage || 'early')}
            <Badge variant="outline" className="text-xs">
              {userProfile.state || 'All India'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div 
            key={rec.scheme_code}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm leading-tight mb-1">
                  {rec.scheme_name}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {rec.recommendation_reason}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(rec.match_score)}`}>
                {rec.match_score}% match
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>#{index + 1} match</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>Applicable</span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-7"
                onClick={() => window.location.href = `/government-schemes?scheme=${rec.scheme_code}`}
              >
                View Details
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              Updated daily • Success rate tracking included
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.href = '/government-schemes'}
              className="text-xs"
            >
              View All Schemes
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}