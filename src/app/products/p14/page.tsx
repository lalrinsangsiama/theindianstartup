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
  Heart,
  Briefcase,
  BarChart3,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p14Config: CourseConfig = {
  gradientFrom: 'from-purple-900',
  gradientVia: 'via-violet-800',
  gradientTo: 'to-indigo-900',
  badgeText: 'IMPACT & CSR MASTERY',
  badgeBgColor: 'bg-yellow-500',
  badgeTextColor: 'text-black',
  stats: [
    { value: '11', label: 'Modules' },
    { value: '55', label: 'Days' },
    { value: 'Rs 25K Cr', label: 'CSR Market' },
    { value: '8,000+', label: 'CSR Companies' }
  ],
  achievements: [
    'Master Schedule VII compliance and eligible activities',
    'Register as Section 8, Trust, or Society',
    'Implement IRIS+ impact measurement framework',
    'Build corporate partnership pipeline',
    'Integrate ESG and BRSR reporting',
    'Access impact investment ecosystem'
  ],
  features: [
    { icon: <Heart className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Complete CSR landscape understanding' },
    { icon: <Building className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Social enterprise registration mastery' },
    { icon: <BarChart3 className="w-5 h-5 text-green-500 mt-0.5" />, text: 'IRIS+ impact measurement framework' },
    { icon: <Briefcase className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Corporate partnership development' },
    { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'ESG integration and BRSR support' },
    { icon: <TrendingUp className="w-5 h-5 text-emerald-500 mt-0.5" />, text: 'Impact investing navigation' }
  ],
  journeySteps: [
    { title: 'Landscape', description: 'CSR ecosystem and compliance', color: 'purple' },
    { title: 'Registration', description: 'Legal structure and tax benefits', color: 'blue' },
    { title: 'Measurement', description: 'Impact metrics and SROI', color: 'green' },
    { title: 'Partnerships', description: 'Corporate CSR engagement', color: 'orange' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'CSR Proposal Templates',
      description: 'Comprehensive proposal templates, pitch decks, and budget formats',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'SROI Calculator',
      description: 'Calculate Social Return on Investment with financial proxies',
      buttonText: 'Access Calculator',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Users className="w-8 h-8 text-green-600 mb-3" />,
      title: 'CSR Company Database',
      description: 'Research corporate CSR spending and focus areas',
      buttonText: 'Search Database',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '300+', label: 'NGOs & Social Enterprises', color: 'purple' },
    { value: 'Rs 100Cr+', label: 'CSR Partnerships Facilitated', color: 'blue' },
    { value: '50+', label: 'Impact Investments', color: 'green' }
  ],
  ctaText: 'Ready to Master Impact & CSR?',
  ctaSubtext: 'Join 300+ social enterprises who have successfully built corporate CSR partnerships and scaled their impact.',
  price: 'Rs 8,999'
};

export default function P14CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p14', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P14',
              title: 'Impact & CSR Mastery',
              description: 'Master India\'s Rs 25,000 Cr CSR ecosystem with Schedule VII compliance, social enterprise registration, IRIS+ impact measurement, corporate partnership development, and ESG integration.',
              price: 8999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P14 course data:', error);
        setCourseData({
          product: {
            code: 'P14',
            title: 'Impact & CSR Mastery',
            description: 'Master India\'s Rs 25,000 Cr CSR ecosystem with Schedule VII compliance, social enterprise registration, IRIS+ impact measurement, corporate partnership development, and ESG integration.',
            price: 8999,
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
      <GenericCourseInterface courseData={courseData} config={p14Config} />
    </DashboardLayout>
  );
}
