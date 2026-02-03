'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Microscope,
  Pill,
  Shield,
  FlaskConical,
  Award,
  Globe,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p28Config: CourseConfig = {
  gradientFrom: 'from-teal-900',
  gradientVia: 'via-emerald-800',
  gradientTo: 'to-green-900',
  badgeText: 'BIOTECH & LIFE SCIENCES',
  badgeBgColor: 'bg-teal-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '12', label: 'Modules' },
    { value: '60', label: 'Days' },
    { value: '$100B+', label: 'Market by 2025' },
    { value: '60+', label: 'Templates' }
  ],
  achievements: [
    'Navigate CDSCO drug approval pathway',
    'Conduct compliant clinical trials (CTRI)',
    'Achieve GMP and WHO-GMP certifications',
    'Develop biosimilars and biologics',
    'Access BIRAC and DBT funding',
    'Expand to global markets (FDA, EMA)'
  ],
  features: [
    { icon: <Pill className="w-5 h-5 text-teal-500 mt-0.5" />, text: 'CDSCO approvals' },
    { icon: <FlaskConical className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Clinical trials (CTRI)' },
    { icon: <Shield className="w-5 h-5 text-green-500 mt-0.5" />, text: 'GMP certification' },
    { icon: <Microscope className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Biosimilars pathway' },
    { icon: <Award className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'BIRAC funding' },
    { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Global expansion' }
  ],
  journeySteps: [
    { title: 'Discover', description: 'R&D and preclinical', color: 'teal' },
    { title: 'Develop', description: 'Trials and approvals', color: 'blue' },
    { title: 'Manufacture', description: 'GMP and production', color: 'green' },
    { title: 'Scale', description: 'Funding and global', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-teal-600 mb-3" />,
      title: 'Biotech Templates',
      description: 'CDSCO applications, clinical protocols, GMP documentation',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Regulatory Pathway Mapper',
      description: 'Map your path to CDSCO, FDA, and EMA approvals',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Award className="w-8 h-8 text-green-600 mb-3" />,
      title: 'BIRAC Grant Finder',
      description: 'Find eligible BIRAC and DBT funding programs',
      buttonText: 'Find Grants',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '150+', label: 'Biotech Founders', color: 'teal' },
    { value: '12', label: 'Complete Modules', color: 'blue' },
    { value: '150+', label: 'Templates & Tools', color: 'green' }
  ],
  ctaText: 'Ready to Build in Biotech?',
  ctaSubtext: 'Master biotech with CDSCO compliance, clinical trials, GMP, and BIRAC funding.',
  price: 'Rs 9,999'
};

export default function P28CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p28', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P28', title: 'Biotech & Life Sciences', price: 9999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P28 course data:', error);
        setCourseData({ product: { code: 'P28', title: 'Biotech & Life Sciences', price: 9999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p28Config} /></DashboardLayout>);
}
