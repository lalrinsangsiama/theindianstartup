'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import {
  Building,
  FileText,
  Shield,
  Award,
  Users,
  Scale,
  Calculator,
  Download,
  ExternalLink,
  Zap,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const p2Config: CourseConfig = {
  gradientFrom: 'from-blue-900',
  gradientVia: 'via-blue-800',
  gradientTo: 'to-indigo-900',
  badgeText: 'INCORPORATION & COMPLIANCE',
  badgeBgColor: 'bg-blue-500',
  badgeTextColor: 'text-white',
  stats: [
    { value: '10', label: 'Modules' },
    { value: '40', label: 'Days' },
    { value: '80+', label: 'Templates' },
    { value: '100%', label: 'Compliant' }
  ],
  achievements: [
    'Master business structure selection (Pvt Ltd, LLP, OPC)',
    'Complete company incorporation with MCA',
    'Set up GST, PAN, TAN registrations',
    'Build comprehensive compliance calendar',
    'Navigate labor law requirements',
    'Establish proper corporate governance'
  ],
  features: [
    { icon: <Building className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Complete incorporation roadmap' },
    { icon: <Shield className="w-5 h-5 text-green-500 mt-0.5" />, text: 'GST and tax compliance mastery' },
    { icon: <Scale className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Labor law compliance' },
    { icon: <FileText className="w-5 h-5 text-orange-500 mt-0.5" />, text: '80+ professional templates' },
    { icon: <Calculator className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Compliance cost calculators' },
    { icon: <Award className="w-5 h-5 text-yellow-500 mt-0.5" />, text: 'Expert review support' }
  ],
  journeySteps: [
    { title: 'Foundation', description: 'Business structure selection', color: 'blue' },
    { title: 'Registration', description: 'MCA, GST, and tax setup', color: 'green' },
    { title: 'Compliance', description: 'Labor and statutory requirements', color: 'purple' },
    { title: 'Governance', description: 'Board, meetings, and records', color: 'orange' }
  ],
  resources: [
    {
      icon: <FileText className="w-8 h-8 text-blue-600 mb-3" />,
      title: 'Incorporation Templates',
      description: 'MOA, AOA, board resolutions, and all registration forms',
      buttonText: 'Download Templates',
      buttonIcon: <Download className="w-4 h-4 mr-2" />
    },
    {
      icon: <Calculator className="w-8 h-8 text-green-600 mb-3" />,
      title: 'Compliance Calculator',
      description: 'Calculate your annual compliance costs and deadlines',
      buttonText: 'Calculate Now',
      buttonIcon: <Zap className="w-4 h-4 mr-2" />
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600 mb-3" />,
      title: 'Structure Selector',
      description: 'Find the right business structure for your startup',
      buttonText: 'Select Structure',
      buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
    }
  ],
  communityStats: [
    { value: '1500+', label: 'Companies Incorporated', color: 'blue' },
    { value: '₹10L+', label: 'Penalties Avoided', color: 'green' },
    { value: '99%', label: 'Compliance Score', color: 'purple' }
  ],
  ctaText: 'Ready to Incorporate Your Company?',
  ctaSubtext: 'Join 1500+ founders who built bulletproof legal foundations for their startups.',
  price: '₹4,999'
};

export default function P2CoursePage() {
  const { user } = useAuthContext();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch('/api/products/P2', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        } else {
          setCourseData({
            product: {
              code: 'P2',
              title: 'Incorporation & Compliance Kit - Complete',
              description: 'Master Indian business incorporation and compliance with 12 comprehensive modules, 45 detailed lessons, and 80+ professional templates.',
              price: 4999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
        }
      } catch (error) {
        logger.error('Error fetching P2 course data:', error);
        setCourseData({
          product: {
            code: 'P2',
            title: 'Incorporation & Compliance Kit - Complete',
            description: 'Master Indian business incorporation and compliance with 12 comprehensive modules, 45 detailed lessons, and 80+ professional templates.',
            price: 4999,
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
      <GenericCourseInterface courseData={courseData} config={p2Config} />
    </DashboardLayout>
  );
}
