'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Heart,
  Shield,
  Stethoscope,
  Pill,
  FileText,
  Building,
  Download,
  ExternalLink,
  Zap,
  Activity
} from 'lucide-react';

const p21Config: CourseConfig = {
  gradientFrom: 'from-red-900',
  gradientVia: 'via-rose-800',
  gradientTo: 'to-pink-900',
  badgeText: 'HEALTHTECH & MEDICAL DEVICES',
  badgeBgColor: 'bg-red-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '11', label: 'Modules' },
    { value: '55', label: 'Days' },
    { value: 'Top 3', label: 'Funded Sector' },
    { value: '55+', label: 'Templates' }
  ],
  achievements: [
    'Navigate CDSCO medical device regulations',
    'Master telemedicine practice guidelines',
    'Implement ABDM integration for digital health',
    'Conduct compliant clinical trials',
    'Achieve quality certifications (ISO 13485, GMP)',
    'Build healthcare partnerships and B2B2C models'
  ],
  features: [
    { icon: <Stethoscope className="w-5 h-5 text-red-500 mt-0.5" />, text: 'Telemedicine regulations' },
    { icon: <Shield className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'CDSCO compliance' },
    { icon: <Activity className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Medical device classification' },
    { icon: <Pill className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Drug regulations' },
    { icon: <Heart className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'ABDM integration' },
    { icon: <Building className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Healthcare partnerships' }
  ],
  journeySteps: [
    { title: 'Comply', description: 'CDSCO and telemedicine rules', color: 'red' },
    { title: 'Certify', description: 'ISO 13485 and GMP', color: 'blue' },
    { title: 'Integrate', description: 'ABDM and digital health', color: 'green' },
    { title: 'Scale', description: 'Partnerships and funding', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-red-600 mb-3" />,
      title: 'HealthTech Templates',
      description: 'CDSCO applications, clinical protocols, ABDM integration guides',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Device Classifier',
      description: 'Determine CDSCO device class and regulatory requirements',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Activity className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Regulatory Pathway Planner',
      description: 'Map your path to CDSCO approval',
      buttonText: 'Plan Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '250+', label: 'HealthTech Founders', color: 'red' },
    { value: '100+', label: 'Devices Approved', color: 'blue' },
    { value: 'Rs 300Cr+', label: 'Raised', color: 'green' }
  ],
  ctaText: 'Ready to Build in HealthTech?',
  ctaSubtext: 'Join 250+ HealthTech founders who have navigated CDSCO regulations successfully.',
  price: 'Rs 8,999'
};

export default function P21CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p21', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P21', title: 'HealthTech & Medical Devices', price: 8999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P21 course data:', error);
        setCourseData({ product: { code: 'P21', title: 'HealthTech & Medical Devices', price: 8999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p21Config} /></DashboardLayout>);
}
