'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GenericCourseInterface, CourseConfig, courseConfigs } from '@/components/GenericCourseInterface';
import { logger } from '@/lib/logger';
import { Loader2 } from 'lucide-react';
import {
  Target,
  Users,
  Award,
  Globe,
  FileText,
  Download,
  ExternalLink,
  Zap
} from 'lucide-react';

// Legacy routes for backward compatibility - redirect these to their legacy pages
const LEGACY_PRODUCT_ROUTES: Record<string, string> = {
  p1: '/journey',
  p2: '/incorporation-compliance',
  p3: '/funding-mastery',
  p4: '/finance-mastery',
  p5: '/legal-mastery',
  p6: '/sales-mastery',
  p7: '/state-schemes',
  p8: '/investor-ready',
  p9: '/government-schemes',
  p10: '/patent-mastery',
  p11: '/branding-mastery',
  p12: '/marketing-mastery'
};

// All valid product codes
const VALID_PRODUCT_CODES = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12',
  'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20', 'P21', 'P22', 'P23',
  'P24', 'P25', 'P26', 'P27', 'P28', 'P29', 'P30'
];

/**
 * Generate a default course config for products without custom configs
 */
function getDefaultCourseConfig(productCode: string, productTitle: string, productPrice: number): CourseConfig {
  // Color themes for different product ranges
  const colorThemes: Record<string, { from: string; via: string; to: string }> = {
    // Foundation (P1-P12)
    'P1': { from: 'from-orange-900', via: 'via-orange-800', to: 'to-amber-900' },
    'P2': { from: 'from-blue-900', via: 'via-blue-800', to: 'to-indigo-900' },
    'P5': { from: 'from-red-900', via: 'via-red-800', to: 'to-rose-900' },
    'P6': { from: 'from-emerald-900', via: 'via-emerald-800', to: 'to-green-900' },
    'P7': { from: 'from-violet-900', via: 'via-violet-800', to: 'to-purple-900' },
    'P8': { from: 'from-sky-900', via: 'via-sky-800', to: 'to-cyan-900' },
    'P9': { from: 'from-teal-900', via: 'via-teal-800', to: 'to-emerald-900' },
    'P10': { from: 'from-amber-900', via: 'via-amber-800', to: 'to-yellow-900' },
    'P11': { from: 'from-pink-900', via: 'via-pink-800', to: 'to-rose-900' },
    'P12': { from: 'from-indigo-900', via: 'via-indigo-800', to: 'to-blue-900' },
    // Sector-specific (P13-P15)
    'P13': { from: 'from-green-900', via: 'via-emerald-800', to: 'to-teal-900' },
    'P14': { from: 'from-cyan-900', via: 'via-cyan-800', to: 'to-blue-900' },
    'P15': { from: 'from-emerald-900', via: 'via-green-800', to: 'to-lime-900' },
    // Core Functions (P16-P19)
    'P16': { from: 'from-slate-900', via: 'via-slate-800', to: 'to-gray-900' },
    'P17': { from: 'from-fuchsia-900', via: 'via-fuchsia-800', to: 'to-pink-900' },
    'P18': { from: 'from-stone-900', via: 'via-stone-800', to: 'to-neutral-900' },
    'P19': { from: 'from-zinc-900', via: 'via-zinc-800', to: 'to-gray-900' },
    // High-Growth (P20-P24)
    'P20': { from: 'from-blue-900', via: 'via-indigo-800', to: 'to-violet-900' },
    'P21': { from: 'from-red-900', via: 'via-rose-800', to: 'to-pink-900' },
    'P22': { from: 'from-orange-900', via: 'via-amber-800', to: 'to-yellow-900' },
    'P23': { from: 'from-green-900', via: 'via-teal-800', to: 'to-cyan-900' },
    'P24': { from: 'from-gray-900', via: 'via-slate-800', to: 'to-zinc-900' },
    // Emerging (P25-P28)
    'P25': { from: 'from-purple-900', via: 'via-violet-800', to: 'to-indigo-900' },
    'P26': { from: 'from-lime-900', via: 'via-green-800', to: 'to-emerald-900' },
    'P27': { from: 'from-amber-900', via: 'via-orange-800', to: 'to-red-900' },
    'P28': { from: 'from-teal-900', via: 'via-cyan-800', to: 'to-blue-900' },
    // Advanced (P29-P30)
    'P29': { from: 'from-blue-900', via: 'via-sky-800', to: 'to-cyan-900' },
    'P30': { from: 'from-violet-900', via: 'via-purple-800', to: 'to-fuchsia-900' },
  };

  const theme = colorThemes[productCode] || { from: 'from-blue-900', via: 'via-blue-800', to: 'to-indigo-900' };

  return {
    gradientFrom: theme.from,
    gradientVia: theme.via,
    gradientTo: theme.to,
    badgeText: productCode,
    badgeBgColor: 'bg-yellow-500',
    badgeTextColor: 'text-black',
    stats: [
      { value: '10+', label: 'Modules' },
      { value: '30+', label: 'Lessons' },
      { value: '50+', label: 'Templates' },
      { value: '100%', label: 'India-Specific' }
    ],
    achievements: [
      'Master comprehensive industry knowledge',
      'Implement proven frameworks and strategies',
      'Access professional templates and tools',
      'Build practical skills through daily action plans',
      'Join a community of like-minded founders'
    ],
    features: [
      { icon: <FileText className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Comprehensive learning modules' },
      { icon: <Target className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Daily action plans and tasks' },
      { icon: <Download className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Professional templates included' },
      { icon: <Award className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'India-specific compliance guidance' },
      { icon: <Users className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Expert-curated content' }
    ],
    journeySteps: [
      { title: 'Foundation', description: 'Learn core concepts', color: 'blue' },
      { title: 'Implementation', description: 'Apply practical skills', color: 'green' },
      { title: 'Optimization', description: 'Refine your approach', color: 'purple' },
      { title: 'Mastery', description: 'Achieve excellence', color: 'orange' }
    ],
    resources: [
      {
        icon: <FileText className="w-8 h-8 text-blue-600 mb-3" />,
        title: 'Templates Library',
        description: 'Professional templates to accelerate your work',
        buttonText: 'Access Templates',
        buttonIcon: <Download className="w-4 h-4 mr-2" />
      },
      {
        icon: <Zap className="w-8 h-8 text-purple-600 mb-3" />,
        title: 'Interactive Tools',
        description: 'Calculators and tools for practical implementation',
        buttonText: 'Use Tools',
        buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
      },
      {
        icon: <Globe className="w-8 h-8 text-green-600 mb-3" />,
        title: 'Resource Database',
        description: 'Curated resources and external references',
        buttonText: 'Explore',
        buttonIcon: <ExternalLink className="w-4 h-4 mr-2" />
      }
    ],
    communityStats: [
      { value: '30+', label: 'Days Duration', color: 'blue' },
      { value: '50+', label: 'Templates', color: 'purple' },
      { value: '10+', label: 'Modules', color: 'green' }
    ],
    ctaText: `Ready to Master ${productTitle}?`,
    ctaSubtext: 'Start your learning journey with our comprehensive, India-specific course and templates.',
    price: `Rs ${productPrice.toLocaleString('en-IN')}`
  };
}

/**
 * Dynamic product page that handles all products using the generic API
 * P13-P30 render directly with GenericCourseInterface
 * P1-P12 have individual pages at /products/p1, /products/p2, etc.
 */
export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const productCode = (params.productCode as string)?.toUpperCase() || '';
  const productCodeLower = productCode.toLowerCase();

  const [courseData, setCourseData] = useState<{
    product: {
      code: string;
      title: string;
      description: string;
      price: number;
      modules?: Array<{
        id: string;
        title: string;
        description: string;
        lessons?: Array<{
          id: string;
          day: number;
          title: string;
          briefContent: string;
          actionItems?: string[];
          resources?: Record<string, string[]> | string[];
          xpReward: number;
        }>;
      }>;
    };
    hasAccess: boolean;
    userProgress: Record<string, { completed: boolean }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<CourseConfig | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Handle invalid product codes
    if (!productCode || !VALID_PRODUCT_CODES.includes(productCode)) {
      router.replace('/pricing');
      return;
    }

    // Check if this is a legacy product that has its own dedicated page
    // For P1-P12, we check if there's a dedicated route and redirect
    const legacyRoute = LEGACY_PRODUCT_ROUTES[productCodeLower];
    if (legacyRoute) {
      // Check if there's a dedicated page at /products/p{n}
      // For now, let's render directly for all products using the generic API
      // This provides a consistent experience across all products
    }

    const fetchCourseData = async () => {
      try {
        const response = await fetch(`/api/products/${productCode}`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData(data);

          // Use existing config if available, otherwise generate default
          const existingConfig = courseConfigs[productCode];
          if (existingConfig) {
            setConfig(existingConfig);
          } else {
            setConfig(getDefaultCourseConfig(
              productCode,
              data.product?.title || productCode,
              data.product?.price || 4999
            ));
          }
        } else {
          logger.error(`Failed to fetch product ${productCode}:`, await response.text());
          // Set fallback data
          setCourseData({
            product: {
              code: productCode,
              title: getProductTitle(productCode),
              description: 'Course details loading...',
              price: 4999,
              modules: []
            },
            hasAccess: false,
            userProgress: {}
          });
          setConfig(getDefaultCourseConfig(productCode, getProductTitle(productCode), 4999));
        }
      } catch (error) {
        logger.error(`Error fetching course data for ${productCode}:`, error);
        setCourseData({
          product: {
            code: productCode,
            title: getProductTitle(productCode),
            description: 'Course details loading...',
            price: 4999,
            modules: []
          },
          hasAccess: false,
          userProgress: {}
        });
        setConfig(getDefaultCourseConfig(productCode, getProductTitle(productCode), 4999));
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [productCode, productCodeLower, user, router]);

  // Show loading spinner
  if (loading || !config || !courseData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <GenericCourseInterface courseData={courseData} config={config} />
    </DashboardLayout>
  );
}

function getProductTitle(productCode: string): string {
  const titles: Record<string, string> = {
    P1: '30-Day India Launch Sprint',
    P2: 'Incorporation & Compliance Kit',
    P3: 'Funding Mastery',
    P4: 'Finance Stack - CFO-Level Mastery',
    P5: 'Legal Stack - Bulletproof Framework',
    P6: 'Sales & GTM Master Course',
    P7: 'State Ecosystem Mastery',
    P8: 'Investor-Ready Data Room Mastery',
    P9: 'Government Schemes Mastery',
    P10: 'Patent Mastery for Indian Startups',
    P11: 'Branding & Public Relations Mastery',
    P12: 'Marketing Mastery - Complete Growth Engine',
    P13: 'Food Processing Mastery',
    P14: 'Impact & CSR Mastery',
    P15: 'Carbon Credits & Sustainability',
    P16: 'HR & Team Building Mastery',
    P17: 'Product Development & Validation',
    P18: 'Operations & Supply Chain Mastery',
    P19: 'Technology Stack & Infrastructure',
    P20: 'FinTech Mastery',
    P21: 'HealthTech & Medical Devices',
    P22: 'E-commerce & D2C Mastery',
    P23: 'EV & Clean Mobility',
    P24: 'Manufacturing & Make in India',
    P25: 'EdTech Mastery',
    P26: 'AgriTech & Farm-to-Fork',
    P27: 'Real Estate & PropTech',
    P28: 'Biotech & Life Sciences',
    P29: 'SaaS & B2B Tech Mastery',
    P30: 'International Expansion'
  };

  return titles[productCode] || 'Product';
}
