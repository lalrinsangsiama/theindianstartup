'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Users,
  Target,
  TrendingUp,
  Award,
  FileText,
  Shield,
  Briefcase,
  Heart,
  DollarSign,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

const p16Config: CourseConfig = {
  gradientFrom: 'from-indigo-900',
  gradientVia: 'via-purple-800',
  gradientTo: 'to-violet-900',
  badgeText: 'HR & TEAM BUILDING MASTERY',
  badgeBgColor: 'bg-indigo-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '9', label: 'Modules' },
    { value: '45', label: 'Days' },
    { value: '63%', label: 'Startups Lack HR' },
    { value: '50+', label: 'Templates' }
  ],
  achievements: [
    'Build complete recruitment and hiring systems',
    'Design competitive compensation with ESOP structures',
    'Master PF, ESI, and labor compliance',
    'Create performance management frameworks',
    'Implement POSH compliance and HR policies',
    'Scale HR operations with HRIS automation'
  ],
  features: [
    { icon: <Users className="w-5 h-5 text-indigo-500 mt-0.5" />, text: 'Complete recruitment system' },
    { icon: <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Compensation & ESOP design' },
    { icon: <Shield className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Labor law compliance' },
    { icon: <Target className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Performance management' },
    { icon: <Heart className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Culture & retention strategies' },
    { icon: <Briefcase className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'HR policies & handbook' }
  ],
  journeySteps: [
    { title: 'Recruit', description: 'Hiring systems and talent acquisition', color: 'indigo' },
    { title: 'Compensate', description: 'Salary, ESOPs, and benefits', color: 'green' },
    { title: 'Comply', description: 'Labor laws and POSH', color: 'blue' },
    { title: 'Scale', description: 'HR automation and culture', color: 'purple' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-indigo-600 mb-3" />,
      title: 'HR Templates',
      description: 'Offer letters, employment contracts, ESOP agreements, and policy templates',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Salary Benchmarking Tool',
      description: 'Compare salaries by role, city, and experience level across Indian startups',
      buttonText: 'Access Tool',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'ESOP Calculator',
      description: 'Design equity plans with vesting schedules and valuation scenarios',
      buttonText: 'Calculate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '800+', label: 'HR Leaders', color: 'indigo' },
    { value: '9', label: 'Complete Modules', color: 'green' },
    { value: '120+', label: 'Templates & Tools', color: 'purple' }
  ],
  ctaText: 'Ready to Build Your A-Team?',
  ctaSubtext: 'Master HR with hiring frameworks, compensation structures, ESOPs, and POSH compliance.',
  price: 'Rs 5,999'
};

export default function P16CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/p16', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P16',
              title: 'HR & Team Building Mastery',
              description: 'Complete HR infrastructure from recruitment to scaling - 9 modules covering hiring, compensation, ESOPs, labor compliance, performance management, and POSH compliance.',
              price: 5999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P16 course data:', error);
        setCourseData({
          product: {
            code: 'P16',
            title: 'HR & Team Building Mastery',
            description: 'Complete HR infrastructure from recruitment to scaling - 9 modules covering hiring, compensation, ESOPs, labor compliance, performance management, and POSH compliance.',
            price: 5999,
            modules: []
          },
          hasAccess: false,
          userProgress: {}
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <GenericCourseInterface courseData={courseData} config={p16Config} />
    </DashboardLayout>
  );
}
