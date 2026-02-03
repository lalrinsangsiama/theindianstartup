'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Store,
  TrendingUp,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p22Config: CourseConfig = {
  gradientFrom: 'from-orange-900',
  gradientVia: 'via-amber-800',
  gradientTo: 'to-yellow-900',
  badgeText: 'E-COMMERCE & D2C MASTERY',
  badgeBgColor: 'bg-orange-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '50', label: 'Days' },
    { value: 'Rs 7T+', label: 'Market Size' },
    { value: '45+', label: 'Templates' }
  ],
  achievements: [
    'Choose optimal e-commerce business models',
    'Navigate Consumer Protection Act compliance',
    'Master marketplace selling (Amazon, Flipkart)',
    'Build high-converting D2C websites',
    'Optimize logistics and fulfillment',
    'Scale with omnichannel strategies'
  ],
  features: [
    { icon: <Store className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Business model selection' },
    { icon: <ShoppingCart className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Marketplace mastery' },
    { icon: <Package className="w-5 h-5 text-green-500 mt-0.5" />, text: 'D2C website optimization' },
    { icon: <Truck className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Logistics & fulfillment' },
    { icon: <CreditCard className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Payment integration' },
    { icon: <TrendingUp className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Omnichannel scaling' }
  ],
  journeySteps: [
    { title: 'Model', description: 'Business model and compliance', color: 'orange' },
    { title: 'Launch', description: 'Marketplace and D2C setup', color: 'blue' },
    { title: 'Operate', description: 'Logistics and payments', color: 'green' },
    { title: 'Scale', description: 'Marketing and omnichannel', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-orange-600 mb-3" />,
      title: 'E-commerce Templates',
      description: 'Seller agreements, return policies, compliance checklists',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Unit Economics Calculator',
      description: 'Calculate CAC, LTV, margins, and profitability',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Logistics Planner',
      description: 'Compare 3PL partners and optimize shipping costs',
      buttonText: 'Plan Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '700+', label: 'E-commerce Founders', color: 'orange' },
    { value: '10', label: 'Complete Modules', color: 'blue' },
    { value: '150+', label: 'Templates & Tools', color: 'green' }
  ],
  ctaText: 'Ready to Build Your E-commerce Empire?',
  ctaSubtext: 'Master e-commerce with D2C models, Consumer Protection Act compliance, and logistics.',
  price: 'Rs 7,999'
};

export default function P22CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p22', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P22', title: 'E-commerce & D2C Mastery', price: 7999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P22 course data:', error);
        setCourseData({ product: { code: 'P22', title: 'E-commerce & D2C Mastery', price: 7999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p22Config} /></DashboardLayout>);
}
