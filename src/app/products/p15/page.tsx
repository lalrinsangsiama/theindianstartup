'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Target,
  Users,
  TrendingUp,
  Award,
  Globe,
  Building,
  FileText,
  Leaf,
  Wind,
  BarChart3,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p15Config: CourseConfig = {
  gradientFrom: 'from-teal-900',
  gradientVia: 'via-cyan-800',
  gradientTo: 'to-blue-900',
  badgeText: 'CARBON CREDITS & SUSTAINABILITY',
  badgeBgColor: 'bg-yellow-500',
  badgeTextColor: 'text-black',
  stats: [
    { value: '12', label: 'Modules' },
    { value: '60', label: 'Days' },
    { value: '$50B', label: 'VCM by 2030' },
    { value: '2070', label: 'India Net Zero' }
  ],
  achievements: [
    'Master GHG Protocol carbon accounting (Scope 1, 2, 3)',
    'Develop carbon credit projects with VCS and Gold Standard',
    'Navigate carbon trading and ERPA structuring',
    'Access green finance and climate funds',
    'Build corporate Net Zero strategies with SBTi',
    'Achieve SEBI BRSR and TCFD compliance'
  ],
  features: [
    { icon: <BarChart3 className="w-5 h-5 text-teal-500 mt-0.5" />, text: 'GHG Protocol carbon accounting' },
    { icon: <Leaf className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Verra VCS & Gold Standard certification' },
    { icon: <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Carbon credit trading mastery' },
    { icon: <Building className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Green finance and climate funds' },
    { icon: <Target className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Net Zero strategy with SBTi' },
    { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'ESG compliance and BRSR reporting' }
  ],
  journeySteps: [
    { title: 'Fundamentals', description: 'Climate science and markets', color: 'teal' },
    { title: 'Development', description: 'Carbon project certification', color: 'blue' },
    { title: 'Trading', description: 'Market dynamics and deals', color: 'green' },
    { title: 'Strategy', description: 'Net Zero and compliance', color: 'orange' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-teal-600 mb-3" />,
      title: 'Carbon Accounting Templates',
      description: 'GHG Protocol compliant footprint calculators and reports',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Carbon Footprint Calculator',
      description: 'Comprehensive Scope 1, 2, 3 calculator with India emission factors',
      buttonText: 'Access Calculator',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Net Zero Planner',
      description: 'Design decarbonization pathways with MACC analysis',
      buttonText: 'Plan Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '200+', label: 'Carbon Professionals', color: 'teal' },
    { value: '50+', label: 'Projects Registered', color: 'blue' },
    { value: 'Rs 500Cr+', label: 'Green Finance Accessed', color: 'green' }
  ],
  ctaText: 'Ready to Build Your Carbon Business?',
  ctaSubtext: 'Join 200+ professionals who have successfully developed carbon projects, accessed green finance, and built sustainability consulting businesses.',
  price: 'Rs 9,999'
};

export default function P15CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p15', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P15',
              title: 'Carbon Credits & Sustainability',
              description: 'Build a carbon business with GHG Protocol accounting, Verra VCS and Gold Standard certifications, carbon credit trading, green finance, Net Zero strategy, and SEBI BRSR compliance.',
              price: 9999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P15 course data:', error);
        setCourseData({
          product: {
            code: 'P15',
            title: 'Carbon Credits & Sustainability',
            description: 'Build a carbon business with GHG Protocol accounting, Verra VCS and Gold Standard certifications, carbon credit trading, green finance, Net Zero strategy, and SEBI BRSR compliance.',
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
      <GenericCourseInterface courseData={courseData} config={p15Config} />
    </DashboardLayout>
  );
}
