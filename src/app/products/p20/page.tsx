'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  CreditCard,
  Shield,
  Building,
  TrendingUp,
  Lock,
  Smartphone,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p20Config: CourseConfig = {
  gradientFrom: 'from-emerald-900',
  gradientVia: 'via-teal-800',
  gradientTo: 'to-cyan-900',
  badgeText: 'FINTECH MASTERY',
  badgeBgColor: 'bg-emerald-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '11', label: 'Modules' },
    { value: '55', label: 'Days' },
    { value: 'Rs 1T+', label: 'Market Size' },
    { value: '50+', label: 'Templates' }
  ],
  achievements: [
    'Navigate RBI regulatory frameworks',
    'Obtain PA/PG and NBFC licenses',
    'Master digital lending guidelines 2022',
    'Build compliant payment systems',
    'Implement Account Aggregator framework',
    'Scale FinTech with partnerships'
  ],
  features: [
    { icon: <Shield className="w-5 h-5 text-emerald-500 mt-0.5" />, text: 'RBI compliance mastery' },
    { icon: <CreditCard className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Payment gateway licensing' },
    { icon: <Building className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'NBFC registration' },
    { icon: <Smartphone className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Digital lending rules' },
    { icon: <Lock className="w-5 h-5 text-red-500 mt-0.5" />, text: 'KYC/AML compliance' },
    { icon: <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Account Aggregator' }
  ],
  journeySteps: [
    { title: 'Regulate', description: 'RBI framework mastery', color: 'emerald' },
    { title: 'License', description: 'PA/PG and NBFC setup', color: 'blue' },
    { title: 'Build', description: 'Products and compliance', color: 'purple' },
    { title: 'Scale', description: 'Partnerships and growth', color: 'cyan' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-emerald-600 mb-3" />,
      title: 'FinTech Templates',
      description: 'RBI applications, KYC policies, compliance checklists',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Compliance Checker',
      description: 'Assess your FinTech for RBI regulation compliance',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'License Navigator',
      description: 'Find the right license for your FinTech business model',
      buttonText: 'Navigate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '300+', label: 'FinTech Founders', color: 'emerald' },
    { value: '50+', label: 'Licenses Obtained', color: 'blue' },
    { value: 'Rs 500Cr+', label: 'Raised', color: 'purple' }
  ],
  ctaText: 'Ready to Build in FinTech?',
  ctaSubtext: 'Join 300+ FinTech founders who have navigated RBI regulations successfully.',
  price: 'Rs 8,999'
};

export default function P20CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p20', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P20', title: 'FinTech Mastery', price: 8999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P20 course data:', error);
        setCourseData({ product: { code: 'P20', title: 'FinTech Mastery', price: 8999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p20Config} /></DashboardLayout>);
}
