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
  const hasAllAccess = dashboardData.ownedProducts.length === dashboardData.allProducts.length;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Heading as="h1" className="mb-2">
                Welcome back, {dashboardData.userName}!
              </Heading>
              <Text color="muted">
                {dashboardData.startupName} • {dashboardData.ownedProducts.length}/11 products owned
              </Text>
            </div>
            
            {!hasAllAccess && dashboardData.ownedProducts.length >= 3 && (
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-orange-600" />
                    <div>
                      <Text weight="medium">Save ₹15,988 with All-Access!</Text>
                      <Text size="sm" color="muted">You own {dashboardData.ownedProducts.length} products</Text>
                    </div>
                    <Button size="sm" variant="primary" onClick={() => router.push('/pricing?bundle=true')}>
                      Upgrade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-gray-600" />
                <Badge size="sm" variant="default">Products</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.ownedProducts.length}/11
              </Text>
              <Text size="sm" color="muted">Products Owned</Text>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(dashboardData.ownedProducts.length / 11) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <Text className="font-heading text-lg font-bold text-green-500">
                  {Math.round((completedProducts / dashboardData.ownedProducts.length) * 100) || 0}%
                </Text>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {completedProducts}/{dashboardData.ownedProducts.length}
              </Text>
              <Text size="sm" color="muted">Completed</Text>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <Text className="font-heading text-lg font-bold text-yellow-500">Lvl {dashboardData.userLevel}</Text>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.totalXP}
              </Text>
              <Text size="sm" color="muted">Total XP</Text>
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
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <Badge size="sm" variant="outline">Skills</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.skillsAcquired?.length || 0}
              </Text>
              <Text size="sm" color="muted">Acquired</Text>
            </CardContent>
          </Card>
        </div>

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
                      relative p-6 border-2 rounded-lg cursor-pointer transition-all
                      ${product.hasAccess 
                        ? 'border-gray-200 hover:border-black hover:shadow-lg' 
                        : 'border-gray-100 bg-gray-50 hover:border-gray-300'
                      }
                    `}
                  >
                    {/* Lock Icon for Locked Products */}
                    {!product.hasAccess && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Product Icon */}
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mb-4
                      ${product.hasAccess ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}
                    `}>
                      {product.icon || <BookOpen className="w-6 h-6" />}
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
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-black transition-all duration-500"
                                style={{ width: `${product.progress}%` }}
                              />
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
                        <Button variant="outline" size="sm" className="w-full">
                          Learn More →
                        </Button>
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
                          <Lock className="w-5 h-5 text-gray-400" />
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5" />
                <Text weight="medium">Community Hub</Text>
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
                Track your startup&apos;s progress
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