'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SessionManager } from '@/components/auth/SessionManager';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Users,
  Loader2,
  Calendar,
  Zap,
  Target,
  Lock,
  CheckCircle,
  Clock,
  ShoppingCart,
  TrendingUp,
  Grid,
  List,
  Map,
  Search,
  Filter,
  Briefcase,
  DollarSign,
  Scale,
  Rocket,
  MapPin,
  Package,
  Star,
  AlertCircle,
  Gift,
  Building,
  Factory,
  GraduationCap,
  Wheat,
  Building2,
  Microscope,
  Cloud,
  Globe,
  Heart,
  Settings,
  Server,
  CreditCard,
  Lightbulb
} from 'lucide-react';
import { PaymentButton, BuyNowButton, AddToCartButton, AllAccessButton } from '@/components/payment/PaymentButton';
import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';
import { ProgressiveOnboarding } from '@/components/onboarding/ProgressiveOnboarding';
import { MobileDashboard } from '@/components/dashboard/MobileDashboard';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { AchievementsSection } from '@/components/dashboard/AchievementsSection';
import { PersonalizedRecommendations } from '@/components/dashboard/PersonalizedRecommendations';
import { QuickWins } from '@/components/dashboard/QuickWins';
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';
import { ValueDashboard, ValueMetrics, PotentialValueCard } from '@/components/dashboard/ValueDashboard';
import { LearningPathRecommendations } from '@/components/courses/LearningPathRecommendations';
import { COURSE_CONTENT_STATS } from '@/components/courses/CourseContentBreakdown';

// Lazy load heavy components
const XPDisplay = dynamic(() => import('@/components/progress').then(mod => ({ default: mod.XPDisplay })), {
  loading: () => <div className="h-12 bg-gray-100 rounded animate-pulse" />,
  ssr: false
});

interface Product {
  code: string;
  title: string;
  shortTitle?: string;
  description: string;
  price: number;
  hasAccess: boolean;
  expiresAt?: string;
  progress?: number;
  completedModules?: number;
  totalModules?: number;
  estimatedDays?: number;
  category?: string;
  icon?: React.ReactNode;
  prerequisites?: string[];
  outcomes?: string[];
}

interface DashboardData {
  userName: string;
  userEmail?: string;
  totalXP: number;
  currentStreak: number;
  badges: string[];
  userLevel: number;
  nextLevelXP: number;
  startupName: string;
  ownedProducts: Product[];
  allProducts: Product[];
  recommendedProduct?: Product;
  totalInvestedTime?: number;
  skillsAcquired?: string[];
  lessonProgress?: any[];
  experience?: string;
  goals?: string[];
  businessStage?: string;
  primaryFocus?: string;
  valueMetrics?: ValueMetrics;
}

// Product categories with icons
const productCategories: Record<string, { name: string; icon: React.ReactNode; description: string }> = {
  foundation: {
    name: 'Foundation',
    icon: <Briefcase className="w-4 h-4" />,
    description: 'Start your journey'
  },
  funding: {
    name: 'Funding & Finance',
    icon: <DollarSign className="w-4 h-4" />,
    description: 'Master money matters'
  },
  legal: {
    name: 'Legal & IP',
    icon: <Scale className="w-4 h-4" />,
    description: 'Protect your business'
  },
  growth: {
    name: 'Growth & Sales',
    icon: <Rocket className="w-4 h-4" />,
    description: 'Scale your startup'
  },
  strategic: {
    name: 'Strategic',
    icon: <MapPin className="w-4 h-4" />,
    description: 'Advanced strategies'
  },
  sector: {
    name: 'Sector Specific',
    icon: <Target className="w-4 h-4" />,
    description: 'Industry specializations'
  },
  hr: {
    name: 'HR & Team',
    icon: <Users className="w-4 h-4" />,
    description: 'Build your team'
  },
  product: {
    name: 'Product',
    icon: <Lightbulb className="w-4 h-4" />,
    description: 'Build great products'
  },
  operations: {
    name: 'Operations',
    icon: <Settings className="w-4 h-4" />,
    description: 'Scale efficiently'
  },
  technology: {
    name: 'Technology',
    icon: <Server className="w-4 h-4" />,
    description: 'Tech infrastructure'
  },
  fintech: {
    name: 'FinTech',
    icon: <CreditCard className="w-4 h-4" />,
    description: 'Financial services'
  },
  healthtech: {
    name: 'HealthTech',
    icon: <Heart className="w-4 h-4" />,
    description: 'Healthcare innovation'
  },
  ecommerce: {
    name: 'E-commerce',
    icon: <ShoppingCart className="w-4 h-4" />,
    description: 'Online retail'
  },
  ev: {
    name: 'EV & Mobility',
    icon: <Zap className="w-4 h-4" />,
    description: 'Clean transportation'
  },
  manufacturing: {
    name: 'Manufacturing',
    icon: <Factory className="w-4 h-4" />,
    description: 'Make in India'
  },
  edtech: {
    name: 'EdTech',
    icon: <GraduationCap className="w-4 h-4" />,
    description: 'Education technology'
  },
  agritech: {
    name: 'AgriTech',
    icon: <Wheat className="w-4 h-4" />,
    description: 'Agricultural innovation'
  },
  proptech: {
    name: 'PropTech',
    icon: <Building2 className="w-4 h-4" />,
    description: 'Real estate technology'
  },
  biotech: {
    name: 'Biotech',
    icon: <Microscope className="w-4 h-4" />,
    description: 'Life sciences'
  },
  saas: {
    name: 'SaaS',
    icon: <Cloud className="w-4 h-4" />,
    description: 'Software as a Service'
  },
  international: {
    name: 'Global',
    icon: <Globe className="w-4 h-4" />,
    description: 'International expansion'
  }
};

// Enhanced product data with categories
const enhancedProducts: Record<string, Partial<Product>> = {
  P1: { 
    category: 'foundation', 
    shortTitle: 'Launch Sprint',
    icon: <Rocket className="w-5 h-5" />,
    outcomes: ['Incorporated company', 'MVP ready', 'First customers']
  },
  P2: { 
    category: 'foundation', 
    shortTitle: 'Incorporation',
    icon: <Briefcase className="w-5 h-5" />,
    prerequisites: ['P1'],
    outcomes: ['Legal compliance', 'All registrations', 'Compliance systems']
  },
  P3: { 
    category: 'funding', 
    shortTitle: 'Funding Mastery',
    icon: <DollarSign className="w-5 h-5" />,
    prerequisites: ['P1', 'P2'],
    outcomes: ['Funding pipeline', 'Investor meetings', '18-month roadmap']
  },
  P4: { 
    category: 'funding', 
    shortTitle: 'Finance Stack',
    icon: <TrendingUp className="w-5 h-5" />,
    prerequisites: ['P2'],
    outcomes: ['Financial systems', 'Investor reporting', 'CFO toolkit']
  },
  P5: { 
    category: 'legal', 
    shortTitle: 'Legal Stack',
    icon: <Scale className="w-5 h-5" />,
    prerequisites: ['P2'],
    outcomes: ['Contract templates', 'IP protection', 'Dispute prevention']
  },
  P6: { 
    category: 'growth', 
    shortTitle: 'Sales & GTM',
    icon: <Target className="w-5 h-5" />,
    prerequisites: ['P1'],
    outcomes: ['Sales machine', 'Customer acquisition', 'Revenue growth']
  },
  P7: { 
    category: 'strategic', 
    shortTitle: 'State Schemes',
    icon: <MapPin className="w-5 h-5" />,
    outcomes: ['30-50% cost savings', 'State benefits', 'Multi-state strategy']
  },
  P8: { 
    category: 'growth', 
    shortTitle: 'Data Room',
    icon: <Package className="w-5 h-5" />,
    prerequisites: ['P3'],
    outcomes: ['Professional data room', 'Faster fundraising', 'Higher valuation']
  },
  P9: { 
    category: 'funding', 
    shortTitle: 'Gov Schemes',
    icon: <Briefcase className="w-5 h-5" />,
    outcomes: ['₹50L-5Cr funding', 'Application templates', 'Scheme navigation']
  },
  P10: { 
    category: 'legal', 
    shortTitle: 'Patent Mastery',
    icon: <Star className="w-5 h-5" />,
    prerequisites: ['P5'],
    outcomes: ['Patent strategy', 'IP portfolio', 'Monetization plan']
  },
  P11: {
    category: 'growth',
    shortTitle: 'Branding & PR',
    icon: <Star className="w-5 h-5" />,
    prerequisites: ['P1'],
    outcomes: ['Brand identity', 'Media presence', 'Industry recognition']
  },
  P12: {
    category: 'growth',
    shortTitle: 'Marketing',
    icon: <TrendingUp className="w-5 h-5" />,
    prerequisites: ['P1', 'P11'],
    outcomes: ['Marketing engine', 'Predictable CAC/LTV', 'Automation running']
  },
  P13: {
    category: 'sector',
    shortTitle: 'Food Processing',
    icon: <Target className="w-5 h-5" />,
    outcomes: ['FSSAI compliance', 'Quality certifications', 'Export ready']
  },
  P14: {
    category: 'sector',
    shortTitle: 'Impact & CSR',
    icon: <Heart className="w-5 h-5" />,
    outcomes: ['CSR structure', 'Corporate partnerships', 'Impact measurement']
  },
  P15: {
    category: 'sector',
    shortTitle: 'Carbon Credits',
    icon: <TrendingUp className="w-5 h-5" />,
    outcomes: ['Carbon accounting', 'Credit development', 'Net Zero consulting']
  },
  P16: {
    category: 'hr',
    shortTitle: 'HR & Team',
    icon: <Users className="w-5 h-5" />,
    outcomes: ['Hiring systems', 'ESOP structures', 'Labor compliance']
  },
  P17: {
    category: 'product',
    shortTitle: 'Product Dev',
    icon: <Lightbulb className="w-5 h-5" />,
    prerequisites: ['P1'],
    outcomes: ['Product-market fit', 'Growth experiments', 'Product roadmap']
  },
  P18: {
    category: 'operations',
    shortTitle: 'Operations',
    icon: <Package className="w-5 h-5" />,
    outcomes: ['Scalable processes', 'Supply chain', '30% cost reduction']
  },
  P19: {
    category: 'technology',
    shortTitle: 'Tech Stack',
    icon: <Server className="w-5 h-5" />,
    outcomes: ['System architecture', 'Cloud infrastructure', 'Security framework']
  },
  P20: {
    category: 'fintech',
    shortTitle: 'FinTech',
    icon: <CreditCard className="w-5 h-5" />,
    outcomes: ['RBI compliance', 'Licensing pathway', 'Partnership ready']
  },
  P21: {
    category: 'healthtech',
    shortTitle: 'HealthTech',
    icon: <Heart className="w-5 h-5" />,
    outcomes: ['CDSCO compliance', 'ABDM integration', 'ISO 13485 ready']
  },
  P22: {
    category: 'ecommerce',
    shortTitle: 'E-commerce',
    icon: <ShoppingCart className="w-5 h-5" />,
    outcomes: ['Marketplace presence', 'D2C optimization', 'Logistics network']
  },
  P23: {
    category: 'ev',
    shortTitle: 'EV & Mobility',
    icon: <Zap className="w-5 h-5" />,
    outcomes: ['PLI access', 'FAME II subsidies', 'Homologation certified']
  },
  P24: {
    category: 'manufacturing',
    shortTitle: 'Manufacturing',
    icon: <Factory className="w-5 h-5" />,
    outcomes: ['Factory operations', 'PLI approved', 'Export ready']
  },
  P25: {
    category: 'edtech',
    shortTitle: 'EdTech',
    icon: <GraduationCap className="w-5 h-5" />,
    outcomes: ['NEP 2020 compliance', 'Content platform', 'Accreditation ready']
  },
  P26: {
    category: 'agritech',
    shortTitle: 'AgriTech',
    icon: <Wheat className="w-5 h-5" />,
    outcomes: ['FPO registered', 'Scheme access', 'Export operations']
  },
  P27: {
    category: 'proptech',
    shortTitle: 'PropTech',
    icon: <Building2 className="w-5 h-5" />,
    outcomes: ['RERA compliance', 'PropTech deployed', 'Smart city ready']
  },
  P28: {
    category: 'biotech',
    shortTitle: 'Biotech',
    icon: <Microscope className="w-5 h-5" />,
    outcomes: ['CDSCO pathway', 'Clinical ready', 'BIRAC funded']
  },
  P29: {
    category: 'saas',
    shortTitle: 'SaaS',
    icon: <Cloud className="w-5 h-5" />,
    outcomes: ['SaaS metrics', 'PLG engine', 'SOC 2 compliant']
  },
  P30: {
    category: 'international',
    shortTitle: 'International',
    icon: <Globe className="w-5 h-5" />,
    outcomes: ['FEMA compliant', 'Global entity', 'Export running']
  }
};

function DashboardContent() {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'journey'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Check if user is coming from completed onboarding
  const [skipOnboardingCheck, setSkipOnboardingCheck] = useState(false);
  const [showProgressiveOnboarding, setShowProgressiveOnboarding] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('onboarding') === 'complete') {
      setSkipOnboardingCheck(true);
      window.history.replaceState({}, '', '/dashboard');
    }
    
    // Check if we should show progressive onboarding
    if (urlParams.get('showOnboarding') === 'true') {
      setShowProgressiveOnboarding(true);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError(null);
        setIsRetrying(retryCount > 0);
        
        const response = await fetch('/api/dashboard', {
          cache: 'no-store', // Always get fresh data for dashboard
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.status === 401) {
          // Session expired, redirect to login
          logger.warn('Dashboard: Session expired, redirecting to login');
          router.push('/login');
          return;
        }
        
        if (response.status === 404 || (response.status === 500 && !skipOnboardingCheck)) {
          // User not found in DB, needs onboarding
          logger.info('Dashboard: User profile not found, redirecting to onboarding');
          router.push('/onboarding');
          return;
        }
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate response data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format from dashboard API');
        }
        
        // Check if user needs progressive onboarding (only if not already showing it)
        if (!showProgressiveOnboarding && (!data.userName || data.userName === data.userEmail?.split('@')[0])) {
          try {
            const onboardingResponse = await fetch('/api/user/progressive-onboarding', {
              cache: 'no-store'
            });
            if (onboardingResponse.ok) {
              const onboardingData = await onboardingResponse.json();
              if (onboardingData.onboardingStep < 3) {
                setShowProgressiveOnboarding(true);
              }
            }
          } catch (onboardingError) {
            logger.error('Failed to check progressive onboarding:', onboardingError);
            // Don't block dashboard loading for onboarding check failures
          }
        }
        
        // Enhance products with additional data
        const enhancedOwnedProducts = (data.ownedProducts || []).map((product: Product) => ({
          ...product,
          ...enhancedProducts[product.code]
        }));
        
        // Enhance all products with additional data
        const enhancedAllProducts = (data.allProducts || []).map((product: Product) => ({
          ...product,
          ...enhancedProducts[product.code]
        }));
        
        setDashboardData({
          ...data,
          ownedProducts: enhancedOwnedProducts,
          allProducts: enhancedAllProducts
        });
        
        // Reset retry count on success
        setRetryCount(0);
        
      } catch (error) {
        logger.error('Failed to fetch dashboard data:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (retryCount < 2) {
          // Retry up to 2 times
          logger.info(`Dashboard: Retrying fetch, attempt ${retryCount + 1}`);
          setRetryCount(prev => prev + 1);
          // Retry after a delay
          setTimeout(() => {
            if (user) {
              fetchDashboardData();
            }
          }, 1000 * (retryCount + 1)); // Progressive delay
          return;
        }
        
        // Max retries reached
        setError(`Failed to load dashboard: ${errorMessage}`);
      } finally {
        setLoading(false);
        setIsRetrying(false);
      }
    };

    if (user && !loading) {
      fetchDashboardData();
    }
  }, [user, router, skipOnboardingCheck, retryCount]);

  const handleProductClick = useCallback((product: Product) => {
    if (product.hasAccess) {
      router.push(`/products/${product.code.toLowerCase()}`);
    } else {
      router.push(`/pricing?highlight=${product.code}`);
    }
  }, [router]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    if (!dashboardData) return [];
    
    let products = dashboardData.allProducts;
    
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      products = products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return products;
  }, [dashboardData, selectedCategory, searchQuery]);

  // Calculate unbought products - moved before early returns to follow hooks rules
  const unboughtProducts = useMemo(() => {
    if (!dashboardData) return [];
    const ownedCodes = new Set(dashboardData.ownedProducts.map(p => p.code));
    return dashboardData.allProducts.filter(p => !ownedCodes.has(p.code) && p.code !== 'ALL_ACCESS');
  }, [dashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto p-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isRetrying ? 'Retrying...' : 'Loading Dashboard'}
          </h3>
          <p className="text-sm text-gray-600">
            {isRetrying ? `Attempting to reconnect (${retryCount}/2)` : 'Preparing your startup journey...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="p-8 max-w-md border-2 border-red-200">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Error</h3>
              <Text className="text-gray-600 mb-4">{error}</Text>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setRetryCount(0);
                  // Trigger refetch
                  setTimeout(() => window.location.reload(), 100);
                }}
              >
                Try Again
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  // Sign out and redirect to login
                  signOut().then(() => {
                    router.push('/login');
                  });
                }}
              >
                Sign Out
              </Button>
            </div>
            <Text size="sm" color="muted">
              If this continues, please contact{' '}
              <a href="mailto:support@theindianstartup.in" className="text-blue-600 underline">
                support@theindianstartup.in
              </a>
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const hasAnyProducts = dashboardData.ownedProducts.length > 0;
  const completedProducts = dashboardData.ownedProducts.filter(p => p.progress === 100).length;
  const hasAllAccess = dashboardData.ownedProducts.length === dashboardData.allProducts.length;
  
  // Calculate All Access original price
  const getAllAccessOriginalPrice = () => {
    return dashboardData.allProducts
      .filter(p => p.code !== 'ALL_ACCESS')
      .reduce((sum, p) => sum + (p.price || 0), 0);
  };

  // Mobile Dashboard
  if (isMobile) {
    return (
      <MobileDashboard
        user={user}
        purchases={dashboardData.ownedProducts}
        lessonProgress={dashboardData.lessonProgress || []}
        currentStreak={dashboardData.currentStreak}
        totalXP={dashboardData.totalXP}
      />
    );
  }

  // Check if email is verified (Supabase user has email_confirmed_at)
  const isEmailVerified = !!user?.email_confirmed_at;

  return (
    <DashboardLayout>
      {/* Email Verification Banner */}
      {user?.email && !isEmailVerified && (
        <div className="px-6 lg:px-8 pt-6">
          <EmailVerificationBanner
            email={user.email}
            isVerified={isEmailVerified}
            className="max-w-7xl mx-auto"
          />
        </div>
      )}

      {/* Progressive Onboarding Modal */}
      {showProgressiveOnboarding && (
        <ProgressiveOnboarding
          onComplete={() => {
            setShowProgressiveOnboarding(false);
            // Refresh dashboard data after onboarding
            window.location.reload();
          }}
          onSkip={() => setShowProgressiveOnboarding(false)}
          initialData={{
            email: user?.email || '',
            name: dashboardData.userName || '',
          }}
        />
      )}
      
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        {/* Special Welcome Banner for New Users */}
        {dashboardData.ownedProducts.length === 0 && (
          <Card className="mb-8 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-1">
                  <Badge className="bg-blue-600 text-white mb-3">NEW FOUNDER OFFER</Badge>
                  <Heading as="h2" variant="h3" className="mb-3">
                    Start Your Startup Journey Today! 🚀
                  </Heading>
                  <Text size="lg" className="mb-4">
                    Build your successful startup with our comprehensive course ecosystem featuring 30 courses and 1000+ templates.
                  </Text>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      3-Day Money Back Guarantee
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700">
                      <Zap className="w-3 h-3 mr-1" />
                      Instant Access
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-700">
                      <Trophy className="w-3 h-3 mr-1" />
                      Certificate on Completion
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <BuyNowButton
                    productCode="P1"
                    size="lg"
                    showPrice={true}
                    customText="Start with P1: 30-Day Sprint"
                    className="bg-blue-600 hover:bg-blue-700"
                  />
                  <AllAccessButton
                    size="lg"
                    showSavings={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Heading as="h1" className="mb-2">
                Welcome back, {dashboardData.userName}!
              </Heading>
              <Text color="muted">
                {dashboardData.startupName} • {dashboardData.ownedProducts.length}/30 courses owned
              </Text>
            </div>
            
            {!hasAllAccess && dashboardData.ownedProducts.length >= 3 && (
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-orange-600" />
                    <div>
                      <Text weight="medium">Save ₹74,971 with All-Access!</Text>
                      <Text size="sm" color="muted">You own {dashboardData.ownedProducts.length} products</Text>
                    </div>
                    <BuyNowButton
                      productCode="ALL_ACCESS"
                      size="sm"
                      showPrice={false}
                      customText="Upgrade Now"
                      ctaStyle="pulse"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Enhanced Stats Grid with Animation */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Primary Progress Card */}
          <Card className="col-span-2 lg:col-span-2 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <Badge size="sm" variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200">Journey Progress</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <Text className="font-heading text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {dashboardData.ownedProducts.length}
                    </Text>
                    <Text className="text-2xl text-gray-400">/30</Text>
                  </div>
                  <Text size="sm" color="muted">Courses Owned</Text>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="text-blue-600">{Math.round((dashboardData.ownedProducts.length / 30) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full shadow-sm transition-all duration-1000 ease-out relative"
                      style={{ width: `${(dashboardData.ownedProducts.length / 12) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completion Stats */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                {completedProducts > 0 && (
                  <Text className="font-heading text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {Math.round((completedProducts / dashboardData.ownedProducts.length) * 100)}%
                  </Text>
                )}
              </div>
              <Text className="font-heading text-2xl font-bold mb-1 text-gray-900">
                {completedProducts}
              </Text>
              <Text size="sm" color="muted">Completed</Text>
            </CardContent>
          </Card>

          {/* XP & Level */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-yellow-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <Badge size="sm" className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-0">
                  Level {dashboardData.userLevel}
                </Badge>
              </div>
              <Text className="font-heading text-2xl font-bold mb-1 text-gray-900">
                {dashboardData.totalXP.toLocaleString()}
              </Text>
              <Text size="sm" color="muted">Total XP</Text>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                {dashboardData.currentStreak > 0 && (
                  <div className="text-2xl animate-bounce">🔥</div>
                )}
              </div>
              <Text className="font-heading text-2xl font-bold mb-1 text-gray-900">
                {dashboardData.currentStreak}
              </Text>
              <Text size="sm" color="muted">Day Streak</Text>
            </CardContent>
          </Card>
        </div>

        {/* Value Dashboard - Show ROI metrics for users with purchases */}
        {dashboardData.valueMetrics && dashboardData.valueMetrics.totalInvested > 0 && (
          <div className="mb-8">
            <ValueDashboard metrics={dashboardData.valueMetrics} />
          </div>
        )}

        {/* Potential Value Card for New Users (no purchases) */}
        {dashboardData.ownedProducts.length === 0 && (
          <div className="mb-8">
            <PotentialValueCard />
          </div>
        )}

        {/* Quick Wins for New Users */}
        {dashboardData.ownedProducts.length === 0 && (
          <div className="mb-8">
            <QuickWins
              userId={user?.id || ''}
              onXPEarned={(xp) => {
                // Update local XP display
                setDashboardData(prev => prev ? {
                  ...prev,
                  totalXP: (prev.totalXP || 0) + xp
                } : null);
              }}
            />
          </div>
        )}

        {/* Main Content Area */}
        <Card className="border-2 border-black shadow-lg">
          <CardHeader className="bg-black text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Product Library
              </CardTitle>
              
              {/* View Mode Toggles */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-black' : 'text-white hover:bg-gray-700'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-black' : 'text-white hover:bg-gray-700'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('journey')}
                    className={`p-2 rounded ${viewMode === 'journey' ? 'bg-white text-black' : 'text-white hover:bg-gray-700'}`}
                  >
                    <Map className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Filters and Search */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Products
                  </Button>
                  {Object.entries(productCategories).map(([key, category]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={selectedCategory === key ? 'primary' : 'outline'}
                      onClick={() => setSelectedCategory(key)}
                      className="flex items-center gap-1"
                    >
                      {category.icon}
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Views */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.code}
                    onClick={() => handleProductClick(product)}
                    className={`
                      relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 group
                      ${product.hasAccess 
                        ? 'border-gray-200 hover:border-black hover:shadow-xl hover:-translate-y-1 bg-white' 
                        : 'border-gray-100 bg-gradient-to-br from-gray-50 to-white hover:border-gray-400 hover:shadow-md'
                      }
                    `}
                  >
                    {/* Lock Badge for Locked Products */}
                    {!product.hasAccess && (
                      <div className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 shadow-sm">
                        <Lock className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                    
                    {/* Product Icon with Gradient */}
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110
                      ${product.hasAccess 
                        ? 'bg-gradient-to-br from-gray-800 to-black text-white shadow-lg' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500'}
                    `}>
                      {product.icon || <BookOpen className="w-7 h-7" />}
                    </div>
                    
                    {/* Product Info */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Text weight="semibold" className="text-lg">
                          {product.code}: {product.shortTitle}
                        </Text>
                      </div>
                      <Text size="sm" color="muted" className="line-clamp-2">
                        {product.description}
                      </Text>
                    </div>
                    
                    {/* Progress or Price */}
                    {product.hasAccess ? (
                      <div>
                        {product.progress !== undefined && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <Text size="sm" color="muted">Progress</Text>
                              <Text size="sm" weight="medium">{product.progress}%</Text>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700 ease-out relative"
                                style={{ width: `${product.progress}%` }}
                              >
                                <div className="absolute inset-0 bg-white/30 animate-pulse" />
                              </div>
                            </div>
                          </div>
                        )}
                        <Button variant="outline" size="sm" className="w-full">
                          {product.progress === 100 ? 'Review' : 'Continue'} →
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Text size="lg" weight="bold">₹{product.price?.toLocaleString('en-IN')}</Text>
                          <Badge size="sm" variant="outline">
                            {product.estimatedDays} days
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <AddToCartButton
                            productCode={product.code}
                            size="sm"
                            className="flex-1"
                            showPrice={false}
                            customText="Add to Cart"
                            onSuccess={() => {
                              // Refresh dashboard data after purchase
                              window.location.reload();
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product);
                            }}
                          >
                            Info
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.code}
                    onClick={() => handleProductClick(product)}
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-all flex items-center gap-4
                      ${product.hasAccess 
                        ? 'border-gray-200 hover:border-black hover:shadow' 
                        : 'border-gray-100 bg-gray-50 hover:border-gray-300'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${product.hasAccess ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}
                    `}>
                      {product.icon || <BookOpen className="w-5 h-5" />}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <Text weight="medium">{product.code}: {product.title}</Text>
                      <Text size="sm" color="muted">{product.description}</Text>
                    </div>
                    
                    {/* Status */}
                    <div className="flex items-center gap-3">
                      {product.hasAccess ? (
                        <>
                          {product.progress === 100 ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="flex items-center gap-2">
                              <Text size="sm" color="muted">{product.progress}%</Text>
                              <Clock className="w-5 h-5 text-orange-500" />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <Text weight="medium">₹{product.price?.toLocaleString('en-IN')}</Text>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product.code, product.title, product.price);
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'journey' && (
              <div className="relative">
                <div className="text-center mb-8">
                  <Text color="muted">Your Startup Journey Path</Text>
                </div>
                
                {/* Journey visualization would go here */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {Object.entries(productCategories).map(([key, category]) => (
                    <div key={key} className="text-center">
                      <div className="mb-2">
                        <Badge variant="outline" size="sm">{category.name}</Badge>
                      </div>
                      <div className="flex gap-2">
                        {filteredProducts
                          .filter(p => p.category === key)
                          .map((product) => (
                            <div
                              key={product.code}
                              onClick={() => handleProductClick(product)}
                              className={`
                                w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all
                                ${product.hasAccess 
                                  ? 'border-black bg-black text-white hover:shadow-lg' 
                                  : 'border-gray-300 hover:border-gray-400'
                                }
                              `}
                            >
                              {product.icon || <BookOpen className="w-6 h-6 mb-1" />}
                              <Text size="xs" weight="medium">{product.code}</Text>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Prerequisites Info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <Text weight="medium">Product Prerequisites</Text>
                      <Text size="sm" color="muted">
                        Some products require completion of foundational courses. The journey path shows recommended progression.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements & Gamification */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <Heading as="h2" variant="h4">
              Your Achievements & Progress
            </Heading>
          </div>
          <AchievementsSection
            userId={user?.id || ''}
            totalXP={dashboardData.totalXP}
            currentLevel={dashboardData.userLevel}
            badges={dashboardData.badges || []}
          />
        </div>

        {/* Learning Path Guide */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <Heading as="h2" variant="h4">
              Your Learning Path
            </Heading>
          </div>
          <LearningPathRecommendations
            ownedCourses={dashboardData.ownedProducts.map(p => p.code)}
            currentStage={
              dashboardData.ownedProducts.length === 0 ? 'idea' :
              dashboardData.ownedProducts.length < 5 ? 'launch' :
              dashboardData.ownedProducts.length < 10 ? 'growth' :
              dashboardData.ownedProducts.length < 20 ? 'scale' : 'global'
            }
          />
        </div>

        {/* Personalized Recommendations */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <Heading as="h2" variant="h4">
                Personalized Recommendations
              </Heading>
            </div>
            <PersonalizedRecommendations
              userProfile={{
                experience: (dashboardData.experience as 'beginner' | 'intermediate' | 'experienced' | 'expert') || 'beginner',
                goals: dashboardData.goals || [],
                businessStage: (dashboardData.businessStage as 'idea' | 'mvp' | 'growth' | 'scale') || 'idea',
                primaryFocus: (dashboardData.primaryFocus as 'tech' | 'sales' | 'marketing' | 'finance' | 'operations') || 'tech'
              }}
              completedProducts={dashboardData.ownedProducts.map(p => p.code)}
              allProducts={dashboardData.allProducts.map(p => ({
                code: p.code,
                title: p.title,
                description: p.description,
                price: p.price,
                estimatedDays: p.estimatedDays || 30
              }))}
            />
          </div>

          {/* Enhanced Quick Stats Sidebar */}
          <div className="space-y-4">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Total Lessons Completed */}
                <div className="p-3 bg-white rounded-lg">
                  <Text size="sm" color="muted">Lessons Completed</Text>
                  <div className="flex items-baseline gap-2 mt-1">
                    <Text size="xl" weight="bold" className="text-blue-700">
                      {dashboardData.lessonProgress?.filter((p: any) => p.completed).length || 0}
                    </Text>
                    <Text size="sm" color="muted">
                      / {(() => {
                        let total = 0;
                        dashboardData.ownedProducts.forEach(p => {
                          const stats = COURSE_CONTENT_STATS[p.code];
                          if (stats) total += stats.lessonCount;
                        });
                        return total || 'N/A';
                      })()}
                    </Text>
                  </div>
                </div>

                {/* Learning Streak */}
                <div className="p-3 bg-white rounded-lg">
                  <Text size="sm" color="muted">Learning Streak</Text>
                  <div className="flex items-center gap-2 mt-1">
                    <Text size="xl" weight="bold" className="text-orange-600">
                      {dashboardData.currentStreak}
                    </Text>
                    <Text size="sm">days</Text>
                    {dashboardData.currentStreak > 0 && <span className="text-xl">🔥</span>}
                  </div>
                </div>

                {/* Courses Owned */}
                <div className="p-3 bg-white rounded-lg">
                  <Text size="sm" color="muted">Courses Owned</Text>
                  <div className="flex items-baseline gap-2 mt-1">
                    <Text size="xl" weight="bold" className="text-purple-700">
                      {dashboardData.ownedProducts.length}
                    </Text>
                    <Text size="sm" color="muted">/ 30</Text>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(dashboardData.ownedProducts.length / 30) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Total XP */}
                <div className="p-3 bg-white rounded-lg">
                  <Text size="sm" color="muted">Total XP Earned</Text>
                  <Text size="xl" weight="bold" className="text-green-600">
                    {dashboardData.totalXP.toLocaleString()}
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5" />
                <Text weight="medium">Community Hub</Text>
                <Badge size="sm" className="bg-green-100 text-green-700">Free</Badge>
              </div>
              <Text size="sm" color="muted" className="mb-4">
                Connect with 10,000+ Indian founders
              </Text>
              <Link href="/community">
                <Button variant="outline" size="sm" className="w-full">
                  Join Discussions →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-5 h-5" />
                <Text weight="medium">Startup Portfolio</Text>
              </div>
              <Text size="sm" color="muted" className="mb-4">
                Track your startup's progress
              </Text>
              <Link href="/portfolio">
                <Button variant="outline" size="sm" className="w-full">
                  Update Portfolio →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-5 h-5" />
                <Text weight="medium">Referral Program</Text>
                <Badge size="sm" className="bg-orange-100 text-orange-700">New</Badge>
              </div>
              <Text size="sm" color="muted" className="mb-4">
                Earn ₹500 per successful referral
              </Text>
              <Link href="/referral">
                <Button variant="outline" size="sm" className="w-full">
                  Start Referring →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5" />
                <Text weight="medium">Resources</Text>
              </div>
              <Text size="sm" color="muted" className="mb-4">
                Templates, tools & guides
              </Text>
              <Link href="/resources">
                <Button variant="outline" size="sm" className="w-full">
                  Browse Resources →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Investor Database - Only show if user has P3 */}
          {(dashboardData.ownedProducts.some(p => ['P3', 'ALL_ACCESS'].includes(p.code))) && (
            <Card className="border-2 border-green-200 hover:border-black transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <Text weight="medium">Investor Database</Text>
                  <Badge size="sm" className="bg-green-100 text-green-700">Premium</Badge>
                </div>
                <Text size="sm" color="muted" className="mb-4">
                  37+ verified investor contacts with real data
                </Text>
                <Link href="/investors">
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Investors →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Government Schemes Database - Only show if user has P7 or P9 */}
          {(dashboardData.ownedProducts.some(p => ['P7', 'P9', 'ALL_ACCESS'].includes(p.code))) && (
            <Card className="border-2 border-orange-200 hover:border-black transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-orange-600" />
                  <Text weight="medium">Schemes Database</Text>
                  <Badge size="sm" className="bg-orange-100 text-orange-700">Premium</Badge>
                </div>
                <Text size="sm" color="muted" className="mb-4">
                  500+ government schemes worth ₹5Cr
                </Text>
                <Link href="/products/schemes">
                  <Button variant="outline" size="sm" className="w-full">
                    Access Database →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Unbought Courses Section */}
        {unboughtProducts.length > 0 && !hasAllAccess && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Heading as="h2" variant="h4" className="mb-2">
                  Expand Your Startup Knowledge
                </Heading>
                <Text color="muted">
                  {unboughtProducts.length} more courses to master your startup journey
                </Text>
              </div>
              {dashboardData.ownedProducts.length > 0 && (
                <Badge className="bg-green-100 text-green-700">
                  You have a 10% coupon available!
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {unboughtProducts.slice(0, 6).map((product) => (
                <Card 
                  key={product.code} 
                  className="border-2 border-gray-200 hover:border-black transition-all cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        {product.icon || <BookOpen className="w-6 h-6 text-gray-600" />}
                      </div>
                      <Badge size="sm" variant="outline">
                        {product.estimatedDays} days
                      </Badge>
                    </div>
                    
                    <Text weight="semibold" className="mb-2">
                      {product.code}: {product.shortTitle || product.title}
                    </Text>
                    <Text size="sm" color="muted" className="mb-4 line-clamp-2">
                      {product.description}
                    </Text>
                    
                    <div className="flex items-center justify-between">
                      <Text className="font-bold text-lg">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </Text>
                      <div className="flex gap-2">
                        <AddToCartButton
                          productCode={product.code}
                          size="sm"
                          showPrice={false}
                          customText="Add"
                          onSuccess={() => {
                            // Refresh dashboard data after purchase
                            window.location.reload();
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/pricing#${product.code}`);
                          }}
                        >
                          Info
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {unboughtProducts.length > 6 && (
              <div className="text-center mb-8">
                <Link href="/pricing">
                  <Button variant="outline">
                    View All {unboughtProducts.length} Courses →
                  </Button>
                </Link>
              </div>
            )}

            {/* All Access Bundle Promotion */}
            <Card className="border-2 border-black bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-8">
                <div className="max-w-4xl mx-auto text-center">
                  <Badge className="bg-purple-600 text-white mb-4">
                    BEST VALUE - SAVE ₹15,987
                  </Badge>
                  <Heading as="h3" variant="h3" className="mb-4">
                    Get All-Access Bundle
                  </Heading>
                  <Text size="lg" color="muted" className="mb-6">
                    Unlock all 12 comprehensive courses and master every aspect of building a successful startup in India
                  </Text>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center">
                      <Text className="font-bold text-2xl">12</Text>
                      <Text size="sm" color="muted">Courses</Text>
                    </div>
                    <div className="text-center">
                      <Text className="font-bold text-2xl">500+</Text>
                      <Text size="sm" color="muted">Lessons</Text>
                    </div>
                    <div className="text-center">
                      <Text className="font-bold text-2xl">1000+</Text>
                      <Text size="sm" color="muted">Templates</Text>
                    </div>
                    <div className="text-center">
                      <Text className="font-bold text-2xl">1 Year</Text>
                      <Text size="sm" color="muted">Access</Text>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div>
                      <Text className="text-gray-500 line-through text-xl">
                        ₹{getAllAccessOriginalPrice().toLocaleString('en-IN')}
                      </Text>
                      <Text className="font-bold text-3xl">
                        ₹54,999
                      </Text>
                    </div>
                    <AllAccessButton 
                      size="lg"
                      showSavings={false}
                      className="min-w-[200px]"
                    />
                  </div>

                  {dashboardData.ownedProducts.length > 0 && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                      <Text size="sm" className="text-purple-700">
                        💡 You already own {dashboardData.ownedProducts.length} course{dashboardData.ownedProducts.length > 1 ? 's' : ''}. 
                        Upgrade to All Access and save even more!
                      </Text>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <SessionManager />
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}