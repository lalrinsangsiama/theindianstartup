'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  MapPin,
  Building2,
  FileText,
  Award,
  Globe,
  Landmark,
  IndianRupee,
  Shield,
  Download,
  ExternalLink,
  Zap,
  CheckCircle
} from 'lucide-react';

const p7Config: CourseConfig = {
  gradientFrom: 'from-orange-900',
  gradientVia: 'via-amber-800',
  gradientTo: 'to-yellow-900',
  badgeText: 'STATE-WISE SCHEME MAP',
  badgeBgColor: 'bg-green-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '30', label: 'Days' },
    { value: '28', label: 'States Covered' },
    { value: '8', label: 'UTs Covered' }
  ],
  achievements: [
    'Navigate all 28 state startup policies and incentives',
    'Access 8 Union Territory startup schemes',
    'Master state-specific tax benefits and subsidies',
    'Understand land and infrastructure incentives by region',
    'Apply for state incubator programs and accelerators',
    'Maximize location-based advantages for your startup'
  ],
  features: [
    { icon: <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Complete state-by-state scheme directory' },
    { icon: <Landmark className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Government incentive navigation' },
    { icon: <IndianRupee className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Tax benefits and subsidies guide' },
    { icon: <Building2 className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Land and infrastructure incentives' },
    { icon: <Award className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'State incubator and accelerator access' },
    { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Regional advantage optimization' }
  ],
  journeySteps: [
    { title: 'Discovery', description: 'Understand Indias startup ecosystem', color: 'orange' },
    { title: 'Mapping', description: 'Navigate state policies and incentives', color: 'blue' },
    { title: 'Application', description: 'Apply for relevant schemes', color: 'purple' },
    { title: 'Optimization', description: 'Maximize regional benefits', color: 'green' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-orange-600 mb-3" />,
      title: 'State Scheme Directory',
      description: 'Complete database of all 36 state/UT startup schemes with eligibility criteria',
      buttonText: 'Download Directory',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Application Tracker',
      description: 'Track your scheme applications across multiple states',
      buttonText: 'Access Tracker',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Benefits Calculator',
      description: 'Calculate total incentives available based on your location and sector',
      buttonText: 'Calculate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '30', label: 'Days Duration', color: 'orange' },
    { value: '36', label: 'States & UTs', color: 'blue' },
    { value: '200+', label: 'Scheme Templates', color: 'green' }
  ],
  ctaText: 'Ready to Unlock State Benefits?',
  ctaSubtext: 'Navigate all 28 states and 8 Union Territories to maximize government incentives, subsidies, and startup benefits for your venture.',
  price: 'Rs 4,999'
};

export default function P7CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p7', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          // If API not ready, use default data
          setCourseData({
            product: {
              code: 'P7',
              title: 'State-wise Scheme Map',
              description: 'Complete guide to navigating all 28 Indian states and 8 Union Territories for startup benefits - state policies, tax incentives, land subsidies, incubator programs, and regional advantages.',
              price: 4999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P7 course data:', error);
        setCourseData({
          product: {
            code: 'P7',
            title: 'State-wise Scheme Map',
            description: 'Complete guide to navigating all 28 Indian states and 8 Union Territories for startup benefits - state policies, tax incentives, land subsidies, incubator programs, and regional advantages.',
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
      <GenericCourseInterface courseData={courseData} config={p7Config} />
    </DashboardLayout>
  );
}
