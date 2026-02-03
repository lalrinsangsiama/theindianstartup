'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Factory,
  Award,
  Shield,
  Globe,
  Settings,
  Package,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p24Config: CourseConfig = {
  gradientFrom: 'from-amber-900',
  gradientVia: 'via-orange-800',
  gradientTo: 'to-red-900',
  badgeText: 'MANUFACTURING & MAKE IN INDIA',
  badgeBgColor: 'bg-amber-500',
  badgeTextColor: 'text-black',
  stats: [
    { value: '11', label: 'Modules' },
    { value: '55', label: 'Days' },
    { value: '13', label: 'PLI Schemes' },
    { value: 'Rs 1.97L Cr', label: 'Total PLI Value' }
  ],
  achievements: [
    'Navigate factory setup and licensing',
    'Master 13 PLI scheme applications',
    'Achieve quality certifications (ISO, BIS)',
    'Optimize supply chain and sourcing',
    'Leverage SEZ and industrial park benefits',
    'Scale with automation and Industry 4.0'
  ],
  features: [
    { icon: <Factory className="w-5 h-5 text-amber-500 mt-0.5" />, text: 'Factory setup and licensing' },
    { icon: <Award className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'PLI scheme mastery' },
    { icon: <Shield className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Quality certifications' },
    { icon: <Package className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Supply chain optimization' },
    { icon: <Globe className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Export manufacturing' },
    { icon: <Settings className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Industry 4.0 automation' }
  ],
  journeySteps: [
    { title: 'Setup', description: 'Factory and licensing', color: 'amber' },
    { title: 'Certify', description: 'PLI and quality standards', color: 'blue' },
    { title: 'Optimize', description: 'Supply chain and SEZ', color: 'green' },
    { title: 'Scale', description: 'Export and automation', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-amber-600 mb-3" />,
      title: 'Manufacturing Templates',
      description: 'PLI applications, factory licenses, quality manuals',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'PLI Eligibility Checker',
      description: 'Check eligibility across all 13 PLI schemes',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Factory className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Capacity Planner',
      description: 'Plan production capacity and investment requirements',
      buttonText: 'Plan Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '300+', label: 'Manufacturers', color: 'amber' },
    { value: '11', label: 'Complete Modules', color: 'blue' },
    { value: '180+', label: 'Templates & Tools', color: 'green' }
  ],
  ctaText: 'Ready for Make in India?',
  ctaSubtext: 'Master manufacturing with access to 13 PLI schemes worth ₹1.97 lakh crore.',
  price: 'Rs 8,999'
};

export default function P24CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p24', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P24', title: 'Manufacturing & Make in India', price: 8999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P24 course data:', error);
        setCourseData({ product: { code: 'P24', title: 'Manufacturing & Make in India', price: 8999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p24Config} /></DashboardLayout>);
}
