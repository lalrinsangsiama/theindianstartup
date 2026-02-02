'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  TrendingUp,
  Target,
  Users,
  FileText,
  Award,
  BarChart3,
  Megaphone,
  Download,
  ExternalLink,
  Zap,
  Globe,
  Mail
} from 'lucide-react';

const p12Config: CourseConfig = {
  gradientFrom: 'from-purple-900',
  gradientVia: 'via-violet-800',
  gradientTo: 'to-indigo-900',
  badgeText: 'MARKETING MASTERY',
  badgeBgColor: 'bg-purple-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '12', label: 'Modules' },
    { value: '60', label: 'Days' },
    { value: '₹9,999', label: 'Price' },
    { value: 'Expert', label: 'Mentors' }
  ],
  achievements: [
    'Build data-driven marketing infrastructure',
    'Master customer acquisition channels',
    'Create high-converting content strategy',
    'Optimize performance marketing campaigns',
    'Build scalable growth frameworks',
    'Learn from Flipkart, Zomato, and Nykaa leaders'
  ],
  features: [
    { icon: <TrendingUp className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Complete growth engine framework' },
    { icon: <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Data-driven marketing systems' },
    { icon: <Target className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Customer acquisition mastery' },
    { icon: <Megaphone className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Content and brand strategy' },
    { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Digital marketing expertise' },
    { icon: <Mail className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Email and retention systems' }
  ],
  journeySteps: [
    { title: 'Foundation', description: 'Marketing infrastructure setup', color: 'purple' },
    { title: 'Acquisition', description: 'Channel strategy and CAC optimization', color: 'blue' },
    { title: 'Content', description: 'Brand building and content machine', color: 'green' },
    { title: 'Scale', description: 'Growth loops and automation', color: 'orange' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'Marketing Playbooks',
      description: 'Battle-tested playbooks from unicorn marketing teams',
      buttonText: 'Download Playbooks',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'CAC Calculator',
      description: 'Calculate and optimize customer acquisition costs',
      buttonText: 'Calculate CAC',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    },
    {
      icon: <Target className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Channel Analyzer',
      description: 'Find the best marketing channels for your startup',
      buttonText: 'Analyze Channels',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '1000+', label: 'Marketing Leaders', color: 'purple' },
    { value: '₹100Cr+', label: 'Revenue Generated', color: 'blue' },
    { value: '3x', label: 'Avg Growth Rate', color: 'green' }
  ],
  ctaText: 'Ready to Build Your Growth Engine?',
  ctaSubtext: 'Learn from the marketing leaders who scaled Flipkart, Zomato, and Nykaa to unicorn status.',
  price: '₹9,999'
};

export default function P12CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p12', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P12',
              title: 'Marketing Mastery - Complete Growth Engine',
              description: 'Build a data-driven marketing machine with 12 comprehensive modules, 60 detailed lessons, and expert guidance from Flipkart, Zomato, and Nykaa leadership teams.',
              price: 9999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P12 course data:', error);
        setCourseData({
          product: {
            code: 'P12',
            title: 'Marketing Mastery - Complete Growth Engine',
            description: 'Build a data-driven marketing machine with 12 comprehensive modules, 60 detailed lessons, and expert guidance from Flipkart, Zomato, and Nykaa leadership teams.',
            price: 9999,
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
      <GenericCourseInterface courseData={courseData} config={p12Config} />
    </DashboardLayout>
  );
}
