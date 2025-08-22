'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  Star,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

interface CourseProgress {
  courseCode: string;
  courseName: string;
  completedActivities: number;
  totalActivities: number;
  completionPercentage: number;
  lastActivity: string | null;
  isAccessible: boolean;
}

interface PortfolioRecommendation {
  type: 'next_course' | 'complete_section' | 'enhance_portfolio' | 'cross_connect';
  title: string;
  description: string;
  actionText: string;
  actionUrl: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  xpReward: number;
  reason: string;
  relatedCourses?: string[];
}

interface PortfolioStats {
  totalSections: number;
  completedSections: number;
  totalActivities: number;
  completedActivities: number;
  portfolioScore: number;
  strengthAreas: string[];
  improvementAreas: string[];
}

const PortfolioRecommendations: React.FC = () => {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [recommendations, setRecommendations] = useState<PortfolioRecommendation[]>([]);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchPortfolioData();
    }
  }, [user]);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      
      // Fetch course progress
      const progressResponse = await fetch('/api/portfolio/progress');
      if (!progressResponse.ok) {
        throw new Error('Failed to fetch progress');
      }
      const progressData = await progressResponse.json();
      setCourseProgress(progressData.courses || []);
      setPortfolioStats(progressData.stats);

      // Fetch recommendations
      const recResponse = await fetch('/api/portfolio/recommendations');
      if (!recResponse.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const recData = await recResponse.json();
      setRecommendations(recData.recommendations || []);

    } catch (err: any) {
      setError(err.message || 'Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'next_course': return <BookOpen className="w-5 h-5" />;
      case 'complete_section': return <Target className="w-5 h-5" />;
      case 'enhance_portfolio': return <TrendingUp className="w-5 h-5" />;
      case 'cross_connect': return <Lightbulb className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-medium">Failed to load recommendations</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
        </div>
        <button
          onClick={fetchPortfolioData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Overview Stats */}
      {portfolioStats && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Portfolio Progress</h2>
              <p className="text-gray-600">Your startup development journey</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(portfolioStats.portfolioScore)}%
              </div>
              <p className="text-sm text-gray-600">Portfolio Complete</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolioStats.completedSections}
                  </p>
                  <p className="text-sm text-gray-600">
                    of {portfolioStats.totalSections} sections
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolioStats.completedActivities}
                  </p>
                  <p className="text-sm text-gray-600">
                    activities completed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolioStats.strengthAreas?.length || 0}
                  </p>
                  <p className="text-sm text-gray-600">
                    strength areas
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {courseProgress.filter(c => c.completionPercentage > 75).length}
                  </p>
                  <p className="text-sm text-gray-600">
                    courses advanced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Progress Overview */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Course Progress</h3>
          <p className="text-gray-600">Track your progress across all courses</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseProgress.map((course) => (
              <div key={course.courseCode} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.courseCode}</h4>
                    <p className="text-sm text-gray-600 line-clamp-1">{course.courseName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-blue-600">
                      {Math.round(course.completionPercentage)}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.completionPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{course.completedActivities}/{course.totalActivities} activities</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.isAccessible 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {course.isAccessible ? 'Accessible' : 'Purchase Required'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Smart Recommendations</h3>
              <p className="text-gray-600">Personalized next steps to accelerate your progress</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Lightbulb className="w-4 h-4" />
              <span>AI-powered insights</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {recommendations.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">Keep working on your portfolio activities to get new recommendations.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Recommendation Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {getTypeIcon(rec.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </span>
                  </div>

                  {/* Recommendation Details */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{rec.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>{rec.xpReward} XP</span>
                      </div>
                      {rec.relatedCourses && (
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{rec.relatedCourses.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={rec.actionUrl}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group"
                  >
                    <span>{rec.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Strengths & Areas for Improvement */}
      {portfolioStats && (portfolioStats.strengthAreas?.length > 0 || portfolioStats.improvementAreas?.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          {portfolioStats.strengthAreas?.length > 0 && (
            <div className="bg-green-50 rounded-xl border border-green-200">
              <div className="p-6 border-b border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Portfolio Strengths</h3>
                    <p className="text-sm text-green-700">Areas where you excel</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {portfolioStats.strengthAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {area.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Improvement Areas */}
          {portfolioStats.improvementAreas?.length > 0 && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="p-6 border-b border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Target className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900">Focus Areas</h3>
                    <p className="text-sm text-yellow-700">Opportunities for growth</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {portfolioStats.improvementAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Target className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-800 font-medium">
                        {area.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioRecommendations;