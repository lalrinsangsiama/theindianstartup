'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Rocket,
  Target,
  Building,
  FileText,
  Award,
  Users,
  TrendingUp,
  Download,
  ExternalLink,
  Zap,
  CheckCircle,
  Calendar
} from 'lucide-react';

const p1Config: CourseConfig = {
  gradientFrom: 'from-orange-900',
  gradientVia: 'via-orange-800',
  gradientTo: 'to-red-900',
  badgeText: '30-DAY LAUNCH SPRINT',
  badgeBgColor: 'bg-orange-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '4', label: 'Modules' },
    { value: '30', label: 'Days' },
    { value: '₹4,999', label: 'Price' },
    { value: 'Daily', label: 'Action Plans' }
  ],
  achievements: [
    'Validate your startup idea with real market research',
    'Complete your business incorporation',
    'Build your founding team structure',
    'Create your first MVP roadmap',
    'Set up essential legal and financial foundations',
    'Launch with confidence in 30 days'
  ],
  features: [
    { icon: <Rocket className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Daily action plans for 30 days' },
    { icon: <Target className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'India-specific startup guidance' },
    { icon: <Building className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Incorporation step-by-step' },
    { icon: <FileText className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Essential templates and checklists' },
    { icon: <Users className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Founder community access' },
    { icon: <Award className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Completion certificate' }
  ],
  journeySteps: [
    { title: 'Week 1', description: 'Idea validation and market research', color: 'orange' },
    { title: 'Week 2', description: 'Business model and team structure', color: 'blue' },
    { title: 'Week 3', description: 'Incorporation and legal setup', color: 'purple' },
    { title: 'Week 4', description: 'MVP planning and launch prep', color: 'green' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-orange-600 mb-3" />,
      title: 'Launch Checklist',
      description: 'Complete 30-day checklist with daily tasks and milestones',
      buttonText: 'Download Checklist',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Building className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Incorporation Guide',
      description: 'Step-by-step guide for company registration in India',
      buttonText: 'Access Guide',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'Idea Validator',
      description: 'Score your startup idea against key success factors',
      buttonText: 'Validate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '30', label: 'Days to Launch', color: 'orange' },
    { value: '100+', label: 'Templates Included', color: 'blue' },
    { value: '4', label: 'Complete Modules', color: 'green' }
  ],
  ctaText: 'Ready to Launch Your Startup?',
  ctaSubtext: 'Go from idea to incorporated startup in just 30 days with our step-by-step framework.',
  price: '₹4,999'
};

export default function P1CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p1', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P1',
              title: '30-Day India Launch Sprint',
              description: 'Learn to build a startup from idea to launch with daily lessons, action plans and India-specific guidance.',
              price: 4999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P1 course data:', error);
        setCourseData({
          product: {
            code: 'P1',
            title: '30-Day India Launch Sprint',
            description: 'Learn to build a startup from idea to launch with daily lessons, action plans and India-specific guidance.',
            price: 4999,
            modules: []
          },
          hasAccess: false,
          userProgress: {}
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <GenericCourseInterface courseData={courseData} config={p1Config} />
    </DashboardLayout>
  );
}
