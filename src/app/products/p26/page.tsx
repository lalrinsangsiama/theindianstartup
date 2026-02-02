'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Wheat,
  Truck,
  Store,
  Thermometer,
  Globe,
  FileText,
  Download,
  ExternalLink,
  Zap,
  Tractor
} from 'lucide-react';

const p26Config: CourseConfig = {
  gradientFrom: 'from-green-900',
  gradientVia: 'via-lime-800',
  gradientTo: 'to-yellow-900',
  badgeText: 'AGRITECH & FARM-TO-FORK',
  badgeBgColor: 'bg-green-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '9', label: 'Modules' },
    { value: '45', label: 'Days' },
    { value: '100M+', label: 'Farmers' },
    { value: '40+', label: 'Templates' }
  ],
  achievements: [
    'Form and manage Farmer Producer Organizations',
    'Navigate APMC reforms and e-NAM',
    'Set up farm inputs and mechanization business',
    'Access PM-KISAN, PMFBY, and state schemes',
    'Build cold chain and storage infrastructure',
    'Master APEDA exports and value addition'
  ],
  features: [
    { icon: <Wheat className="w-5 h-5 text-green-500 mt-0.5" />, text: 'FPO formation' },
    { icon: <Store className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'APMC and e-NAM' },
    { icon: <Tractor className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Farm mechanization' },
    { icon: <Thermometer className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Cold chain logistics' },
    { icon: <Globe className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'APEDA exports' },
    { icon: <FileText className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Government schemes' }
  ],
  journeySteps: [
    { title: 'Organize', description: 'FPO and farmer aggregation', color: 'green' },
    { title: 'Source', description: 'Inputs and mechanization', color: 'orange' },
    { title: 'Process', description: 'Storage and value addition', color: 'cyan' },
    { title: 'Market', description: 'e-NAM and exports', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-green-600 mb-3" />,
      title: 'AgriTech Templates',
      description: 'FPO registration, APEDA applications, scheme documents',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Wheat className="w-8 h-8 text-orange-600 mb-3" />,
      title: 'Scheme Eligibility Checker',
      description: 'Check PM-KISAN, PMFBY, KCC eligibility',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Truck className="w-8 h-8 text-cyan-600 mb-3" />,
      title: 'Cold Chain Planner',
      description: 'Design cold chain with subsidy optimization',
      buttonText: 'Plan Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '300+', label: 'AgriTech Founders', color: 'green' },
    { value: '50+', label: 'FPOs Formed', color: 'orange' },
    { value: 'Rs 100Cr+', label: 'Farmer Income', color: 'cyan' }
  ],
  ctaText: 'Ready to Transform Agriculture?',
  ctaSubtext: 'Join 300+ AgriTech founders connecting farmers to markets.',
  price: 'Rs 6,999'
};

export default function P26CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p26', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P26', title: 'AgriTech & Farm-to-Fork', price: 6999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P26 course data:', error);
        setCourseData({ product: { code: 'P26', title: 'AgriTech & Farm-to-Fork', price: 6999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p26Config} /></DashboardLayout>);
}
