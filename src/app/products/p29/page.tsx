'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Cloud,
  BarChart3,
  Rocket,
  Shield,
  Globe,
  Users,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p29Config: CourseConfig = {
  gradientFrom: 'from-sky-900',
  gradientVia: 'via-blue-800',
  gradientTo: 'to-indigo-900',
  badgeText: 'SAAS & B2B TECH MASTERY',
  badgeBgColor: 'bg-sky-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '50', label: 'Days' },
    { value: '$50B+', label: 'Indian SaaS Market' },
    { value: '45+', label: 'Templates' }
  ],
  achievements: [
    'Master SaaS pricing and packaging models',
    'Track and optimize SaaS metrics (ARR, NRR, LTV)',
    'Implement product-led growth strategies',
    'Execute enterprise sales processes',
    'Achieve global compliance (GDPR, SOC 2)',
    'Scale internationally with proper structure'
  ],
  features: [
    { icon: <BarChart3 className="w-5 h-5 text-sky-500 mt-0.5" />, text: 'SaaS metrics mastery' },
    { icon: <Rocket className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Product-led growth' },
    { icon: <Users className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Enterprise sales' },
    { icon: <Shield className="w-5 h-5 text-red-500 mt-0.5" />, text: 'GDPR and SOC 2' },
    { icon: <Cloud className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'SaaS partnerships' },
    { icon: <Globe className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Global expansion' }
  ],
  journeySteps: [
    { title: 'Model', description: 'Pricing and metrics', color: 'sky' },
    { title: 'Grow', description: 'PLG and enterprise', color: 'purple' },
    { title: 'Comply', description: 'GDPR and security', color: 'red' },
    { title: 'Scale', description: 'Global markets', color: 'green' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-sky-600 mb-3" />,
      title: 'SaaS Templates',
      description: 'ToS, DPA, SLA agreements, pricing models',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'SaaS Metrics Dashboard',
      description: 'Track ARR, MRR, churn, NRR, and magic number',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Rocket className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Pricing Optimizer',
      description: 'Model and optimize SaaS pricing strategies',
      buttonText: 'Optimize Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '500+', label: 'SaaS Founders', color: 'sky' },
    { value: '10', label: 'Complete Modules', color: 'purple' },
    { value: '150+', label: 'Templates & Tools', color: 'green' }
  ],
  ctaText: 'Ready to Build Global SaaS?',
  ctaSubtext: 'Master SaaS metrics, product-led growth, SOC 2 compliance, and GDPR readiness.',
  price: 'Rs 7,999'
};

export default function P29CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p29', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P29', title: 'SaaS & B2B Tech Mastery', price: 7999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P29 course data:', error);
        setCourseData({ product: { code: 'P29', title: 'SaaS & B2B Tech Mastery', price: 7999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p29Config} /></DashboardLayout>);
}
