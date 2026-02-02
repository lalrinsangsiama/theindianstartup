'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Settings,
  Truck,
  Package,
  BarChart3,
  Workflow,
  Shield,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p18Config: CourseConfig = {
  gradientFrom: 'from-slate-900',
  gradientVia: 'via-gray-800',
  gradientTo: 'to-zinc-900',
  badgeText: 'OPERATIONS & SUPPLY CHAIN',
  badgeBgColor: 'bg-slate-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '8', label: 'Modules' },
    { value: '40', label: 'Days' },
    { value: '30%', label: 'Cost Reduction' },
    { value: '35+', label: 'Templates' }
  ],
  achievements: [
    'Design scalable operational processes',
    'Build robust supply chain networks',
    'Implement quality management systems',
    'Master inventory optimization',
    'Develop vendor management frameworks',
    'Scale operations efficiently'
  ],
  features: [
    { icon: <Workflow className="w-5 h-5 text-slate-500 mt-0.5" />, text: 'Process design and SOPs' },
    { icon: <Truck className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Supply chain management' },
    { icon: <Package className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Inventory optimization' },
    { icon: <Shield className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Quality systems' },
    { icon: <Settings className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Vendor management' },
    { icon: <BarChart3 className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Operational metrics' }
  ],
  journeySteps: [
    { title: 'Design', description: 'Process and workflow design', color: 'slate' },
    { title: 'Source', description: 'Supply chain and vendors', color: 'blue' },
    { title: 'Optimize', description: 'Inventory and quality', color: 'green' },
    { title: 'Scale', description: 'Automation and growth', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-slate-600 mb-3" />,
      title: 'Operations Templates',
      description: 'SOPs, process maps, vendor agreements, and quality checklists',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Package className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Inventory Optimizer',
      description: 'Calculate optimal stock levels, reorder points, and safety stock',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Process Mapper',
      description: 'Design and visualize operational workflows',
      buttonText: 'Map Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '400+', label: 'Ops Leaders', color: 'slate' },
    { value: 'Rs 50Cr+', label: 'Costs Saved', color: 'green' },
    { value: '100+', label: 'Supply Chains Built', color: 'blue' }
  ],
  ctaText: 'Ready to Build Scalable Operations?',
  ctaSubtext: 'Join 400+ operations leaders who have built efficient, scalable systems.',
  price: 'Rs 5,999'
};

export default function P18CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p18', { credentials: 'include' });
        if (response.ok) { setCourseData(await response.json()); }
        else { setCourseData({ product: { code: 'P18', title: 'Operations & Supply Chain Mastery', price: 5999, modules: [] }, hasAccess: false, userProgress: {} }); }
      } catch (error) {
        logger.error('Error fetching P18 course data:', error);
        setCourseData({ product: { code: 'P18', title: 'Operations & Supply Chain Mastery', price: 5999, modules: [] }, hasAccess: false, userProgress: {} });
      } finally { setLoading(false); }
    };
    fetchCourseData();
  }, [user]);

  if (loading) { return (<DashboardLayout><div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div></DashboardLayout>); }
  return (<DashboardLayout><GenericCourseInterface courseData={courseData} config={p18Config} /></DashboardLayout>);
}
