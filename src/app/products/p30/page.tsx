'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Globe,
  Plane,
  Building,
  DollarSign,
  Users,
  Shield,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p30Config: CourseConfig = {
  gradientFrom: 'from-rose-900',
  gradientVia: 'via-pink-800',
  gradientTo: 'to-fuchsia-900',
  badgeText: 'INTERNATIONAL EXPANSION',
  badgeBgColor: 'bg-rose-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '11', label: 'Modules' },
    { value: '55', label: 'Days' },
    { value: '10+', label: 'Markets Covered' },
    { value: '55+', label: 'Templates' }
  ],
  achievements: [
    'Navigate FEMA compliance for overseas investment',
    'Set up US (Delaware C-Corp) and EU entities',
    'Enter MENA and SEA markets effectively',
    'Master export procedures and documentation',
    'Optimize international payments and treasury',
    'Structure for global tax efficiency (DTAA)'
  ],
  features: [
    { icon: <Shield className="w-5 h-5 text-rose-500 mt-0.5" />, text: 'FEMA compliance' },
    { icon: <Building className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'US/EU entity setup' },
    { icon: <Globe className="w-5 h-5 text-green-500 mt-0.5" />, text: 'MENA/SEA expansion' },
    { icon: <Plane className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Export procedures' },
    { icon: <DollarSign className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Cross-border payments' },
    { icon: <Users className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Global hiring (EOR)' }
  ],
  journeySteps: [
    { title: 'Plan', description: 'Market selection and strategy', color: 'rose' },
    { title: 'Structure', description: 'Entity and FEMA setup', color: 'blue' },
    { title: 'Operate', description: 'Payments and hiring', color: 'green' },
    { title: 'Optimize', description: 'Tax and IP strategy', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-rose-600 mb-3" />,
      title: 'International Templates',
      description: 'FEMA filings, entity docs, international contracts',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Market Assessment Tool',
      description: 'Compare markets for expansion potential',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Building className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Entity Structure Planner',
      description: 'Design optimal holding and subsidiary structure',
      buttonText: 'Plan Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '300+', label: 'Global Founders', color: 'rose' },
    { value: '11', label: 'Complete Modules', color: 'blue' },
    { value: '200+', label: 'Templates & Tools', color: 'green' }
  ],
  ctaText: 'Ready to Go Global?',
  ctaSubtext: 'Master international expansion with FEMA compliance, US/EU/MENA market entry strategies.',
  price: 'Rs 9,999'
};

export default function P30CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p30', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P30', title: 'International Expansion', price: 9999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P30 course data:', error);
        setCourseData({ product: { code: 'P30', title: 'International Expansion', price: 9999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p30Config} /></DashboardLayout>);
}
