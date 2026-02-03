'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  TrendingUp,
  Calculator,
  FileText,
  Award,
  DollarSign,
  Download,
  ExternalLink,
  Zap,
  BarChart3,
  PieChart,
  Receipt,
  Building,
  Shield,
  Target
} from 'lucide-react';

const p4Config: CourseConfig = {
  gradientFrom: 'from-green-900',
  gradientVia: 'via-emerald-800',
  gradientTo: 'to-teal-900',
  badgeText: 'CFO-LEVEL MASTERY',
  badgeBgColor: 'bg-green-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '12', label: 'Modules' },
    { value: '45', label: 'Days' },
    { value: '250+', label: 'Templates' },
    { value: '100%', label: 'Compliance' }
  ],
  achievements: [
    'Master CFO-level financial thinking',
    'Build investor-grade financial infrastructure',
    'Achieve 100% GST and tax compliance',
    'Create professional financial models',
    'Set up automated compliance systems',
    'Prepare for investor due diligence'
  ],
  features: [
    { icon: <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Complete financial infrastructure' },
    { icon: <Calculator className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Financial modeling templates' },
    { icon: <Receipt className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'GST & tax compliance mastery' },
    { icon: <BarChart3 className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Investor-ready reporting' },
    { icon: <Shield className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Internal controls framework' },
    { icon: <Award className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Due diligence preparation' }
  ],
  journeySteps: [
    { title: 'Foundations', description: 'CFO mindset and strategy', color: 'green' },
    { title: 'Systems', description: 'Accounting and compliance', color: 'blue' },
    { title: 'Planning', description: 'Financial analysis and forecasting', color: 'purple' },
    { title: 'Scale', description: 'Investor-ready finance', color: 'orange' }
  ],
  resources: [
    {
      icon: <PieChart className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Financial Model Builder',
      description: 'Build dynamic 5-year financial models with scenario analysis',
      buttonText: 'Build Model',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Receipt className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'GST Compliance Tracker',
      description: 'Automated tracking and alerts for all GST requirements',
      buttonText: 'Track Compliance',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'MCA Compliance Calendar',
      description: 'Never miss a statutory deadline with automated reminders',
      buttonText: 'View Calendar',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '12', label: 'Complete Modules', color: 'green' },
    { value: '250+', label: 'Templates & Tools', color: 'blue' },
    { value: '45', label: 'Days of Content', color: 'purple' }
  ],
  ctaText: 'Ready to Master Finance?',
  ctaSubtext: 'Transform from basic bookkeeping to CFO-level mastery with our proven framework.',
  price: '₹6,999'
};

export default function P4CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p4', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P4',
              title: 'Finance Stack - CFO-Level Mastery',
              description: 'Transform from basic bookkeeping to CFO-level financial mastery. Build investor-grade financial infrastructure worth ₹50L+ in consulting value.',
              price: 6999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P4 course data:', error);
        setCourseData({
          product: {
            code: 'P4',
            title: 'Finance Stack - CFO-Level Mastery',
            description: 'Transform from basic bookkeeping to CFO-level financial mastery. Build investor-grade financial infrastructure worth ₹50L+ in consulting value.',
            price: 6999,
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
      <GenericCourseInterface courseData={courseData} config={p4Config} />
    </DashboardLayout>
  );
}
