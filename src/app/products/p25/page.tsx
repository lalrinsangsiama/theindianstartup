'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  GraduationCap,
  BookOpen,
  Video,
  Shield,
  Users,
  TrendingUp,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p25Config: CourseConfig = {
  gradientFrom: 'from-violet-900',
  gradientVia: 'via-purple-800',
  gradientTo: 'to-fuchsia-900',
  badgeText: 'EDTECH MASTERY',
  badgeBgColor: 'bg-violet-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '9', label: 'Modules' },
    { value: '45', label: 'Days' },
    { value: 'NEP 2020', label: 'Compliance' },
    { value: '40+', label: 'Templates' }
  ],
  achievements: [
    'Navigate NEP 2020 curriculum frameworks',
    'Obtain UGC ODL and AICTE approvals',
    'Build engaging content and curriculum',
    'Set up LMS and video infrastructure',
    'Implement student data privacy (DPDPA)',
    'Master EdTech monetization models'
  ],
  features: [
    { icon: <GraduationCap className="w-5 h-5 text-violet-500 mt-0.5" />, text: 'NEP 2020 compliance' },
    { icon: <Shield className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'UGC/AICTE approvals' },
    { icon: <BookOpen className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Content creation' },
    { icon: <Video className="w-5 h-5 text-red-500 mt-0.5" />, text: 'LMS and video tech' },
    { icon: <Users className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Student data privacy' },
    { icon: <TrendingUp className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Monetization models' }
  ],
  journeySteps: [
    { title: 'Comply', description: 'NEP 2020 and accreditation', color: 'violet' },
    { title: 'Build', description: 'Content and platform', color: 'blue' },
    { title: 'Secure', description: 'Data privacy and trust', color: 'green' },
    { title: 'Scale', description: 'Monetization and growth', color: 'pink' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-violet-600 mb-3" />,
      title: 'EdTech Templates',
      description: 'UGC applications, content frameworks, partnership agreements',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Video className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'LMS Comparison Tool',
      description: 'Compare top LMS platforms for your needs',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Pricing Calculator',
      description: 'Model subscription, course, and cohort-based pricing',
      buttonText: 'Calculate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '400+', label: 'EdTech Founders', color: 'violet' },
    { value: '1M+', label: 'Students Reached', color: 'blue' },
    { value: '50+', label: 'Accreditations', color: 'green' }
  ],
  ctaText: 'Ready to Transform Education?',
  ctaSubtext: 'Join 400+ EdTech founders who have built compliant, scalable learning platforms.',
  price: 'Rs 6,999'
};

export default function P25CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p25', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P25', title: 'EdTech Mastery', price: 6999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P25 course data:', error);
        setCourseData({ product: { code: 'P25', title: 'EdTech Mastery', price: 6999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p25Config} /></DashboardLayout>);
}
