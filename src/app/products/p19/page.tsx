'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Server,
  Cloud,
  Shield,
  Code,
  Database,
  Cpu,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p19Config: CourseConfig = {
  gradientFrom: 'from-blue-900',
  gradientVia: 'via-indigo-800',
  gradientTo: 'to-purple-900',
  badgeText: 'TECHNOLOGY STACK MASTERY',
  badgeBgColor: 'bg-blue-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '9', label: 'Modules' },
    { value: '45', label: 'Days' },
    { value: '50%', label: 'Cost Savings' },
    { value: '40+', label: 'Templates' }
  ],
  achievements: [
    'Design scalable system architectures',
    'Master cloud strategy (AWS/GCP/Azure)',
    'Implement DevOps and CI/CD pipelines',
    'Build robust security frameworks',
    'Manage technical debt effectively',
    'Make CTO-level technology decisions'
  ],
  features: [
    { icon: <Server className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Architecture design' },
    { icon: <Cloud className="w-5 h-5 text-cyan-500 mt-0.5" />, text: 'Cloud strategy' },
    { icon: <Code className="w-5 h-5 text-green-500 mt-0.5" />, text: 'DevOps & CI/CD' },
    { icon: <Shield className="w-5 h-5 text-red-500 mt-0.5" />, text: 'Security frameworks' },
    { icon: <Database className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Database design' },
    { icon: <Cpu className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Scalability patterns' }
  ],
  journeySteps: [
    { title: 'Architect', description: 'System design fundamentals', color: 'blue' },
    { title: 'Build', description: 'Cloud and DevOps setup', color: 'cyan' },
    { title: 'Secure', description: 'Security and compliance', color: 'red' },
    { title: 'Scale', description: 'Performance and growth', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Tech Templates',
      description: 'Architecture docs, security policies, and DevOps playbooks',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-600 mb-3" />,
      title: 'Cloud Cost Calculator',
      description: 'Compare AWS, GCP, Azure costs for your architecture',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600 mb-3" />,
      title: 'Security Assessment',
      description: 'Evaluate your security posture with OWASP checklist',
      buttonText: 'Assess Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '500+', label: 'CTOs & Tech Leads', color: 'blue' },
    { value: '9', label: 'Complete Modules', color: 'cyan' },
    { value: '140+', label: 'Templates & Tools', color: 'purple' }
  ],
  ctaText: 'Ready to Build World-Class Tech?',
  ctaSubtext: 'Master architecture, cloud strategy, DevOps, and security for your startup.',
  price: 'Rs 6,999'
};

export default function P19CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p19', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P19', title: 'Technology Stack & Infrastructure', price: 6999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P19 course data:', error);
        setCourseData({ product: { code: 'P19', title: 'Technology Stack & Infrastructure', price: 6999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p19Config} /></DashboardLayout>);
}
