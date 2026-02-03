'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Target,
  Users,
  TrendingUp,
  Award,
  FileText,
  Lightbulb,
  BarChart3,
  Zap,
  Rocket,
  Download,
  ExternalLink
} from 'lucide-react';

const p17Config: CourseConfig = {
  gradientFrom: 'from-cyan-900',
  gradientVia: 'via-teal-800',
  gradientTo: 'to-emerald-900',
  badgeText: 'PRODUCT DEVELOPMENT MASTERY',
  badgeBgColor: 'bg-cyan-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '50', label: 'Days' },
    { value: '90%', label: 'Fail Rate Avoided' },
    { value: '40+', label: 'Templates' }
  ],
  achievements: [
    'Master customer discovery and problem validation',
    'Design and launch MVPs with product-market fit',
    'Implement agile methodologies for startups',
    'Track and optimize product metrics',
    'Build growth loops and experimentation systems',
    'Lead product teams and stakeholder management'
  ],
  features: [
    { icon: <Lightbulb className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Customer discovery frameworks' },
    { icon: <Target className="w-5 h-5 text-teal-500 mt-0.5" />, text: 'MVP design and validation' },
    { icon: <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Agile for startups' },
    { icon: <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Product metrics mastery' },
    { icon: <Rocket className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Growth experimentation' },
    { icon: <Users className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Product leadership' }
  ],
  journeySteps: [
    { title: 'Discover', description: 'Customer and market validation', color: 'cyan' },
    { title: 'Build', description: 'MVP and agile development', color: 'teal' },
    { title: 'Measure', description: 'Metrics and experimentation', color: 'blue' },
    { title: 'Scale', description: 'Roadmapping and leadership', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-cyan-600 mb-3" />,
      title: 'Product Templates',
      description: 'PRDs, user personas, roadmaps, and experiment frameworks',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-teal-600 mb-3" />,
      title: 'TAM/SAM/SOM Calculator',
      description: 'Market sizing tool with India-specific data sources',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Feature Priority Matrix',
      description: 'Score and prioritize features with impact vs effort analysis',
      buttonText: 'Prioritize Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '600+', label: 'Product Managers', color: 'cyan' },
    { value: '10', label: 'Complete Modules', color: 'teal' },
    { value: '120+', label: 'Templates & Tools', color: 'blue' }
  ],
  ctaText: 'Ready to Build Products Users Love?',
  ctaSubtext: 'Master product development with customer discovery, MVP design, and growth experiments.',
  price: 'Rs 6,999'
};

export default function P17CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p17', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: { code: 'P17', title: 'Product Development & Validation', description: 'Master product-market fit with 10 modules covering customer discovery, MVP design, user research, agile methodology, product metrics, growth experimentation, and product leadership.', price: 6999, modules: [] },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P17 course data:', error);
        setCourseData({ product: { code: 'P17', title: 'Product Development & Validation', price: 6999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [user]);

  if (loading) {
    return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>);
  }

  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p17Config} /></DashboardLayout>);
}
