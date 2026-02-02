'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
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
  Truck,
  Shield,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p13Config: CourseConfig = {
  gradientFrom: 'from-green-900',
  gradientVia: 'via-emerald-800',
  gradientTo: 'to-teal-900',
  badgeText: 'FOOD PROCESSING MASTERY',
  badgeBgColor: 'bg-yellow-500',
  badgeTextColor: 'text-black',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '50', label: 'Days' },
    { value: 'Rs 10L', label: 'PMFME Subsidy' },
    { value: '35%', label: 'PMKSY Subsidy' }
  ],
  achievements: [
    'Complete FSSAI licensing and compliance mastery',
    'Set up food-grade manufacturing facility',
    'Achieve ISO 22000 and HACCP certifications',
    'Build cold chain infrastructure and logistics',
    'Access PMFME, PMKSY, and PLI subsidies',
    'Master APEDA registration and export documentation'
  ],
  features: [
    { icon: <Shield className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Complete FSSAI compliance system' },
    { icon: <Building className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Manufacturing setup and licensing' },
    { icon: <Award className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Quality certifications roadmap' },
    { icon: <Truck className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Cold chain and logistics mastery' },
    { icon: <Leaf className="w-5 h-5 text-emerald-500 mt-0.5" />, text: 'Government subsidies navigation' },
    { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Export regulations and APEDA' }
  ],
  journeySteps: [
    { title: 'Foundation', description: 'Industry fundamentals and planning', color: 'green' },
    { title: 'Compliance', description: 'FSSAI and manufacturing setup', color: 'blue' },
    { title: 'Quality', description: 'Certifications and cold chain', color: 'purple' },
    { title: 'Growth', description: 'Subsidies, exports, and scaling', color: 'orange' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-green-600 mb-3" />,
      title: 'FSSAI Templates',
      description: 'License applications, food safety manual, and compliance checklists',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'HACCP Plan Builder',
      description: 'Complete HACCP implementation with hazard analysis worksheets',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'Subsidy Calculator',
      description: 'Calculate PMFME, PMKSY, and state incentives for your project',
      buttonText: 'Calculate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '500+', label: 'Food Entrepreneurs', color: 'green' },
    { value: 'Rs 50Cr+', label: 'Subsidies Accessed', color: 'blue' },
    { value: '100+', label: 'Exports Started', color: 'purple' }
  ],
  ctaText: 'Ready to Master Food Processing?',
  ctaSubtext: 'Join 500+ food entrepreneurs who have successfully built compliant, profitable food processing businesses.',
  price: 'Rs 7,999'
};

export default function P13CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p13', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          // If API not ready, use default data
          setCourseData({
            product: {
              code: 'P13',
              title: 'Food Processing Mastery',
              description: 'Complete guide to food processing business in India - FSSAI compliance, manufacturing setup, quality certifications, cold chain logistics, government subsidies (PMFME, PMKSY, PLI), and APEDA export regulations.',
              price: 7999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P13 course data:', error);
        setCourseData({
          product: {
            code: 'P13',
            title: 'Food Processing Mastery',
            description: 'Complete guide to food processing business in India - FSSAI compliance, manufacturing setup, quality certifications, cold chain logistics, government subsidies (PMFME, PMKSY, PLI), and APEDA export regulations.',
            price: 7999,
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
      <GenericCourseInterface courseData={courseData} config={p13Config} />
    </DashboardLayout>
  );
}
