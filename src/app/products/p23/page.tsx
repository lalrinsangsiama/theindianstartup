'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Zap,
  Battery,
  Car,
  Factory,
  FileText,
  Award,
  Download,
  ExternalLink,
  TrendingUp,
  Plug
} from 'lucide-react';

const p23Config: CourseConfig = {
  gradientFrom: 'from-lime-900',
  gradientVia: 'via-green-800',
  gradientTo: 'to-emerald-900',
  badgeText: 'EV & CLEAN MOBILITY',
  badgeBgColor: 'bg-lime-500',
  badgeTextColor: 'text-black',
  stats: [
    { value: '11', label: 'Modules' },
    { value: '55', label: 'Days' },
    { value: 'Rs 25,938Cr', label: 'PLI Scheme' },
    { value: '50+', label: 'Templates' }
  ],
  achievements: [
    'Navigate FAME II and state EV subsidies',
    'Master PLI scheme application process',
    'Understand battery and supply chain regulations',
    'Complete vehicle homologation (ARAI/iCAT)',
    'Set up EV charging infrastructure',
    'Build EV fleet and B2B business models'
  ],
  features: [
    { icon: <Zap className="w-5 h-5 text-lime-500 mt-0.5" />, text: 'FAME II subsidies' },
    { icon: <Award className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'PLI scheme navigation' },
    { icon: <Battery className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Battery supply chain' },
    { icon: <Car className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Vehicle homologation' },
    { icon: <Plug className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Charging infrastructure' },
    { icon: <Factory className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Manufacturing setup' }
  ],
  journeySteps: [
    { title: 'Subsidize', description: 'FAME II and state incentives', color: 'lime' },
    { title: 'Build', description: 'Manufacturing and supply chain', color: 'green' },
    { title: 'Certify', description: 'Homologation and compliance', color: 'blue' },
    { title: 'Scale', description: 'Fleet and infrastructure', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-lime-600 mb-3" />,
      title: 'EV Templates',
      description: 'PLI applications, homologation docs, subsidy calculators',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Subsidy Calculator',
      description: 'Calculate FAME II, state subsidies, and PLI benefits',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'DVA Compliance Tracker',
      description: 'Track Domestic Value Addition requirements',
      buttonText: 'Track Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '200+', label: 'EV Founders', color: 'lime' },
    { value: '11', label: 'Complete Modules', color: 'green' },
    { value: '150+', label: 'Templates & Tools', color: 'blue' }
  ],
  ctaText: 'Ready to Drive the EV Revolution?',
  ctaSubtext: 'Master EV manufacturing with PLI scheme access, FAME II benefits, and battery supply chain.',
  price: 'Rs 8,999'
};

export default function P23CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p23', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P23', title: 'EV & Clean Mobility', price: 8999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P23 course data:', error);
        setCourseData({ product: { code: 'P23', title: 'EV & Clean Mobility', price: 8999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p23Config} /></DashboardLayout>);
}
