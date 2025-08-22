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
  TrendingUp
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
  description: string;
  price: number;
  hasAccess: boolean;
  expiresAt?: string;
  progress?: number; // 0-100
  completedModules?: number;
  totalModules?: number;
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
  recommendedProduct?: Product;
}

function DashboardContent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  
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
        setDashboardData(data);
      } catch (error) {
        logger.error('Failed to fetch dashboard data:', error);
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
      <div className="p-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-gray-600" />
                <Badge size="sm" variant="default">Products</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {dashboardData.ownedProducts.length}/8
              </Text>
              <Text size="sm" color="muted">Products Owned</Text>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(dashboardData.ownedProducts.length / 8) * 100}%` }}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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