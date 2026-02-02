'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  TrendingUp,
  Users,
  Building,
  FileText,
  Award,
  Target,
  DollarSign,
  Download,
  ExternalLink,
  Zap,
  Briefcase,
  PiggyBank
} from 'lucide-react';

const p3Config: CourseConfig = {
  gradientFrom: 'from-green-900',
  gradientVia: 'via-emerald-800',
  gradientTo: 'to-teal-900',
  badgeText: 'FUNDING MASTERY',
  badgeBgColor: 'bg-green-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '12', label: 'Modules' },
    { value: '45', label: 'Days' },
    { value: '22+', label: 'Investors' },
    { value: '₹5Cr+', label: 'Avg Raised' }
  ],
  achievements: [
    'Master bootstrapping and revenue-first growth',
    'Build investor-ready pitch decks',
    'Navigate government grants and schemes',
    'Access angel investors and VC networks',
    'Structure term sheets and cap tables',
    'Complete successful fundraising rounds'
  ],
  features: [
    { icon: <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Complete funding ecosystem guide' },
    { icon: <Users className="w-5 h-5 text-blue-500 mt-0.5" />, text: '22+ verified investor contacts' },
    { icon: <FileText className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Pitch deck templates' },
    { icon: <DollarSign className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Valuation calculators' },
    { icon: <Briefcase className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Term sheet negotiation' },
    { icon: <Award className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Due diligence preparation' }
  ],
  journeySteps: [
    { title: 'Foundations', description: 'Funding stages and readiness', color: 'green' },
    { title: 'Pitch', description: 'Deck building and storytelling', color: 'blue' },
    { title: 'Connect', description: 'Investor outreach and meetings', color: 'purple' },
    { title: 'Close', description: 'Term sheets and due diligence', color: 'orange' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Pitch Deck Builder',
      description: 'Create investor-ready pitch decks with proven templates',
      buttonText: 'Build Deck',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Valuation Calculator',
      description: 'Calculate your startup valuation using multiple methods',
      buttonText: 'Calculate Value',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'Investor Database',
      description: 'Access 22+ verified investors matched to your stage',
      buttonText: 'Find Investors',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '₹500Cr+', label: 'Total Raised', color: 'green' },
    { value: '300+', label: 'Funded Startups', color: 'blue' },
    { value: '22+', label: 'Investor Network', color: 'purple' }
  ],
  ctaText: 'Ready to Raise Funding?',
  ctaSubtext: 'Join 300+ founders who successfully raised from ₹50L to ₹50Cr using our proven framework.',
  price: '₹5,999'
};

export default function P3CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p3', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P3',
              title: 'Funding in India - Complete Mastery',
              description: 'Master the Indian funding ecosystem with 12 modules, 60 comprehensive lessons, and access to 22+ verified investors.',
              price: 5999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P3 course data:', error);
        setCourseData({
          product: {
            code: 'P3',
            title: 'Funding in India - Complete Mastery',
            description: 'Master the Indian funding ecosystem with 12 modules, 60 comprehensive lessons, and access to 22+ verified investors.',
            price: 5999,
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
      <GenericCourseInterface courseData={courseData} config={p3Config} />
    </DashboardLayout>
  );
}
