'use client';

import React from 'react';
import { withLazyLoading } from '@/components/performance/LazyLoader';

// Lazy load heavy components to reduce initial bundle size
export const LazyBrandAssetGenerator = withLazyLoading(
  () => import('@/components/branding/BrandAssetGenerator'),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }
);

export const LazyDataRoomMastery = withLazyLoading(
  () => import('@/components/dataroom/P8ProgressTracker')
);

export const LazyFundingEligibilityChecker = withLazyLoading(
  () => import('@/components/funding/FundingEligibilityChecker')
);

export const LazyIncubatorDatabase = withLazyLoading(
  () => import('@/components/funding/IncubatorDatabase')
);

export const LazyROICalculator = withLazyLoading(
  () => import('@/components/funding/ROICalculator')
);

export const LazyP3ResourceHub = withLazyLoading(
  () => import('@/components/funding/P3ResourceHub')
);

export const LazyLegalComplianceTracker = withLazyLoading(
  () => import('@/components/legal/LegalComplianceTracker')
);

export const LazyLegalCertificationAssessment = withLazyLoading(
  () => import('@/components/legal/LegalCertificationAssessment')
);

export const LazySchemeDatabase = withLazyLoading(
  () => import('@/components/schemes/ComprehensiveSchemeDatabase')
);

export const LazyStateSchemeDatabase = withLazyLoading(
  () => import('@/components/schemes/StateSchemeDatabase')
);

export const LazyP9ResourceLibrary = withLazyLoading(
  () => import('@/components/resources/P9ResourceLibrary')
);

export const LazyUniversalResourceHub = withLazyLoading(
  () => import('@/components/resources/UniversalResourceHub')
);

// Dashboard components (load on demand)
export const LazyPersonalizedRecommendations = withLazyLoading(
  () => import('@/components/dashboard/PersonalizedRecommendations')
);

export const LazySchemeRecommendations = withLazyLoading(
  () => import('@/components/dashboard/SchemeRecommendations')
);

export const LazyAchievementsSection = withLazyLoading(
  () => import('@/components/dashboard/AchievementsSection')
);

// Portfolio components (heavy components)
export const LazyUniversalActivityCapture = withLazyLoading(
  () => import('@/components/portfolio/UniversalActivityCapture')
);

export const LazyPortfolioRecommendations = withLazyLoading(
  () => import('@/components/portfolio/PortfolioRecommendations')
);

// Admin components (rarely used)
export const LazyAdminDashboard = withLazyLoading(
  () => import('@/components/admin/AdminDashboard'),
  {
    loading: () => (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }
);

export const LazyUserManagement = withLazyLoading(
  () => import('@/components/admin/UserManagement')
);

export const LazyAnalyticsDashboard = withLazyLoading(
  () => import('@/components/admin/AnalyticsDashboard')
);

// Community components
export const LazyEcosystemDirectory = withLazyLoading(
  () => import('@/components/community/EcosystemDirectory')
);

// Heavy form components
export const LazyPurchaseForm = withLazyLoading(
  () => import('@/components/payment/PurchaseForm'),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    )
  }
);

export const LazyContactForm = withLazyLoading(
  () => import('@/components/ui/ContactSupport'),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    )
  }
);

// Chart/visualization components (heavy libraries)
export const LazyPerformanceChart = withLazyLoading(
  () => import('@/components/charts/PerformanceChart'),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }
);

// Mobile-specific components
export const LazyMobileDashboard = withLazyLoading(
  () => import('@/components/dashboard/MobileDashboard')
);

export const LazyMobileNavigation = withLazyLoading(
  () => import('@/components/mobile/MobileNavigation')
);

// Feature-specific components that are conditionally loaded
export const LazyReferralProgram = withLazyLoading(
  () => import('@/components/referral/ReferralProgram')
);

export const LazyBlogEditor = withLazyLoading(
  () => import('@/components/blog/BlogEditor'),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    )
  }
);

// Conditional exports for development tools
export const LazyDevTools = process.env.NODE_ENV === 'development'
  ? withLazyLoading(() => import('@/components/dev/DevTools'))
  : null;

export const LazyPerformanceMonitor = process.env.NODE_ENV === 'development'
  ? withLazyLoading(() => import('@/components/performance/PerformanceMonitor'))
  : null;
