'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Building2,
  Shield,
  Home,
  Landmark,
  FileText,
  TrendingUp,
  Download,
  ExternalLink,
  Zap,
  MapPin
} from 'lucide-react';

const p27Config: CourseConfig = {
  gradientFrom: 'from-stone-900',
  gradientVia: 'via-neutral-800',
  gradientTo: 'to-zinc-900',
  badgeText: 'REAL ESTATE & PROPTECH',
  badgeBgColor: 'bg-stone-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '50', label: 'Days' },
    { value: 'Rs 1T+', label: 'Market Opportunity' },
    { value: '45+', label: 'Templates' }
  ],
  achievements: [
    'Navigate state-wise RERA compliance',
    'Master construction permits and approvals',
    'Build PropTech solutions (VR, blockchain)',
    'Understand real estate finance (REIT, InvIT)',
    'Set up co-living and co-working spaces',
    'Integrate with smart city initiatives'
  ],
  features: [
    { icon: <Shield className="w-5 h-5 text-stone-500 mt-0.5" />, text: 'RERA compliance' },
    { icon: <Building2 className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Construction permits' },
    { icon: <Home className="w-5 h-5 text-green-500 mt-0.5" />, text: 'PropTech innovations' },
    { icon: <Landmark className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'REIT and finance' },
    { icon: <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Co-living/working' },
    { icon: <TrendingUp className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Smart city integration' }
  ],
  journeySteps: [
    { title: 'Comply', description: 'RERA and permits', color: 'stone' },
    { title: 'Build', description: 'PropTech solutions', color: 'blue' },
    { title: 'Finance', description: 'REIT and funding', color: 'green' },
    { title: 'Scale', description: 'Multi-city expansion', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-stone-600 mb-3" />,
      title: 'PropTech Templates',
      description: 'RERA registration, lease agreements, compliance checklists',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Property Valuation Tool',
      description: 'Estimate property values with market data',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600 mb-3" />,
      title: 'RERA Compliance Tracker',
      description: 'Track state-wise RERA requirements',
      buttonText: 'Track Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '200+', label: 'PropTech Founders', color: 'stone' },
    { value: '10', label: 'Complete Modules', color: 'blue' },
    { value: '140+', label: 'Templates & Tools', color: 'green' }
  ],
  ctaText: 'Ready to Transform Real Estate?',
  ctaSubtext: 'Master PropTech with RERA compliance and smart city integration strategies.',
  price: 'Rs 7,999'
};

export default function P27CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p27', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P27', title: 'Real Estate & PropTech', price: 7999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P27 course data:', error);
        setCourseData({ product: { code: 'P27', title: 'Real Estate & PropTech', price: 7999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p27Config} /></DashboardLayout>);
}
