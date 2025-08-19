'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
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
  AlertCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';

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
}

// Product categories with icons
const productCategories = {
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
  }
};

function DashboardContent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'journey'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if user is coming from completed onboarding
  const [skipOnboardingCheck, setSkipOnboardingCheck] = useState(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('onboarding') === 'complete') {
      setSkipOnboardingCheck(true);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard', {
          cache: 'force-cache',
          next: { revalidate: 300 }
        });
        
        if (!response.ok) {
          if (!skipOnboardingCheck) {
            router.push('/onboarding');
          }
          return;
        }
        
        const data = await response.json();
        
        // Enhance products with additional data
        const enhancedOwnedProducts = data.ownedProducts.map((product: Product) => ({
          ...product,
          ...enhancedProducts[product.code]
        }));
        
        // Mock all products for demonstration
        const allProducts = Object.keys(enhancedProducts).map(code => ({
          code,
          title: `Product ${code}`,
          description: 'Product description',
          price: 4999,
          hasAccess: data.ownedProducts.some((p: Product) => p.code === code),
          ...enhancedProducts[code]
        }));
        
        setDashboardData({
          ...data,
          ownedProducts: enhancedOwnedProducts,
          allProducts,
          totalInvestedTime: enhancedOwnedProducts.reduce((acc: number, p: Product) => 
            acc + (p.estimatedDays || 30), 0
          ),
          skillsAcquired: ['Incorporation', 'Funding', 'Sales', 'Legal']
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        if (!skipOnboardingCheck) {
          router.push('/onboarding');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, router, skipOnboardingCheck]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const hasAnyProducts = dashboardData.ownedProducts.length > 0;
  const completedProducts = dashboardData.ownedProducts.filter(p => p.progress === 100).length;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <Heading as="h1" className="mb-2">
            Welcome back, {dashboardData.userName}!
          </Heading>
          <Text color="muted">
            {dashboardData.startupName} • {dashboardData.ownedProducts.length} products owned
          </Text>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-gray-600" />
                <Badge size="sm" variant="default">Products</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.ownedProducts.length}/9
              </Text>
              <Text size="sm" color="muted">Products Owned</Text>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(dashboardData.ownedProducts.length / 9) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <Text className="font-heading text-lg font-bold text-yellow-500">+{dashboardData.totalXP}</Text>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.totalXP}
              </Text>
              <Text size="sm" color="muted">Total XP</Text>
              <div className="mt-3">
                <Text size="xs" color="muted">Level {dashboardData.userLevel}</Text>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div className="text-2xl">🔥</div>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.currentStreak}
              </Text>
              <Text size="sm" color="muted">Day Streak</Text>
              <div className="mt-3">
                <Text size="xs" color="muted">
                  {dashboardData.currentStreak > 0 ? 'Keep it up!' : 'Start today!'}
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <Badge size="sm" variant="outline">{completedProducts} Complete</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.badges.length}
              </Text>
              <Text size="sm" color="muted">Badges Earned</Text>
              <div className="mt-3">
                <div className="flex -space-x-2">
                  {dashboardData.badges.slice(0, 3).map((badge: string, i: number) => (
                    <div key={i} className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white" />
                  ))}
                  {dashboardData.badges.length > 3 && (
                    <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                      <Text size="xs">+{dashboardData.badges.length - 3}</Text>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Products */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-black shadow-lg">
              <CardHeader className="bg-black text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {hasAnyProducts ? 'Your Products' : 'Get Started'}
                  </CardTitle>
                  {hasAnyProducts && (
                    <Badge variant="outline" size="lg">
                      {completedProducts}/{dashboardData.ownedProducts.length} Complete
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {hasAnyProducts ? (
                  <div className="space-y-4">
                    {dashboardData.ownedProducts.map((product) => (
                      <div 
                        key={product.code}
                        className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <Text weight="medium">{product.code}: {product.title}</Text>
                            <Text size="sm" color="muted">{product.description}</Text>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.progress === 100 ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Clock className="w-5 h-5 text-orange-500" />
                            )}
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                        
                        {product.progress !== undefined && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <Text size="sm" color="muted">
                                Progress: {product.completedModules}/{product.totalModules} modules
                              </Text>
                              <Text size="sm" color="muted">{product.progress}%</Text>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-black transition-all duration-500"
                                style={{ width: `${product.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {product.expiresAt && (
                          <Text size="xs" color="muted" className="mt-2">
                            Access expires: {new Date(product.expiresAt).toLocaleDateString()}
                          </Text>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <Heading as="h3" variant="h5" className="mb-2">
                      No Products Yet
                    </Heading>
                    <Text color="muted" className="mb-6 max-w-md mx-auto">
                      Start your startup journey with our step-by-step products. Each one is designed to help you overcome specific challenges.
                    </Text>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/pricing">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Browse Products
                        </Button>
                      </Link>
                      <Link href="/community">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                          Join Community
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* XP Progress */}
            <Card>
              <CardHeader>
                <CardTitle>XP Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <XPDisplay 
                  currentXP={dashboardData.totalXP}
                  totalXP={dashboardData.totalXP}
                  level={dashboardData.userLevel}
                  variant="compact"
                />
                <Text size="sm" color="muted" className="mt-2">
                  {dashboardData.nextLevelXP} XP to reach Level {dashboardData.userLevel + 1}
                </Text>
              </CardContent>
            </Card>

            {/* Recommended Product */}
            {dashboardData.recommendedProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Text weight="medium">{dashboardData.recommendedProduct.title}</Text>
                      <Text size="sm" color="muted">{dashboardData.recommendedProduct.description}</Text>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">₹{dashboardData.recommendedProduct.price.toLocaleString('en-IN')}</span>
                      <Badge size="sm">Next Step</Badge>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => router.push('/pricing')}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/community" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Join Discussion
                    </Button>
                  </Link>
                  
                  <Link href="/portfolio" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Trophy className="w-4 h-4 mr-2" />
                      Update Portfolio
                    </Button>
                  </Link>
                  
                  <Link href="/pricing" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Explore Products
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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