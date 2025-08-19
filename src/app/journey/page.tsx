'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  Calendar,
  ChevronRight,
  Clock,
  Zap,
  Lock,
  BookOpen,
  Target,
  DollarSign,
  Scale,
  MapPin,
  Package,
  Star,
  Loader2,
  ShoppingCart,
  ArrowRight,
  Trophy,
  Flame,
  CheckCircle,
  Circle,
  AlertCircle,
  BarChart,
  Activity,
  Award,
  TrendingUp,
  Play,
  Pause,
  RefreshCw,
  BookMarked,
  GraduationCap,
  Brain,
  Sparkles,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Product type definitions
interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  hasAccess: boolean;
  progress?: number;
  completedModules?: number;
  totalModules?: number;
  estimatedDays?: number;
  category?: string;
  icon?: React.ReactNode;
  nextLesson?: {
    day: number;
    title: string;
    duration: string;
  };
  lastAccessedAt?: string;
  certificateEarned?: boolean;
}

// Mock learning statistics
interface LearningStats {
  totalLearningTime: number; // in hours
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  rank: number;
  totalRanks: number;
  weeklyGoal: number;
  weeklyProgress: number;
  completedLessons: number;
  totalLessons: number;
  averageSessionTime: number; // in minutes
  preferredLearningTime: string;
}

// Journey-capable products (products that have daily lessons/journey structure)
const journeyProducts = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'];

// Product icons mapping
const productIcons: Record<string, React.ReactNode> = {
  P1: <Target className="w-5 h-5" />,
  P2: <BookOpen className="w-5 h-5" />,
  P3: <DollarSign className="w-5 h-5" />,
  P4: <DollarSign className="w-5 h-5" />,
  P5: <Scale className="w-5 h-5" />,
  P6: <Target className="w-5 h-5" />,
  P7: <MapPin className="w-5 h-5" />,
  P8: <Package className="w-5 h-5" />,
  P9: <BookOpen className="w-5 h-5" />,
  P10: <Star className="w-5 h-5" />,
  P11: <Star className="w-5 h-5" />,
  P12: <Target className="w-5 h-5" />
};

// Mock achievements data
const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first lesson", icon: <Trophy className="w-6 h-6" />, earned: true, xp: 50 },
  { id: 2, name: "Week Warrior", description: "Complete a full week of lessons", icon: <Calendar className="w-6 h-6" />, earned: true, xp: 100 },
  { id: 3, name: "Streak Master", description: "Maintain a 7-day streak", icon: <Flame className="w-6 h-6" />, earned: true, xp: 150 },
  { id: 4, name: "Knowledge Seeker", description: "Complete 3 courses", icon: <Brain className="w-6 h-6" />, earned: false, xp: 500 },
  { id: 5, name: "Launch Ready", description: "Complete P1 journey", icon: <Target className="w-6 h-6" />, earned: false, xp: 300 },
  { id: 6, name: "All Star", description: "Earn all achievements", icon: <Star className="w-6 h-6" />, earned: false, xp: 1000 }
];

export default function JourneyPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [ownedProducts, setOwnedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasAllAccess, setHasAllAccess] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCourse, setSelectedCourse] = useState<Product | null>(null);
  
  // Mock learning stats - in real app, fetch from API
  const [learningStats] = useState<LearningStats>({
    totalLearningTime: 24.5,
    currentStreak: 6,
    longestStreak: 12,
    totalXP: 1250,
    rank: 42,
    totalRanks: 500,
    weeklyGoal: 5,
    weeklyProgress: 3,
    completedLessons: 18,
    totalLessons: 360,
    averageSessionTime: 45,
    preferredLearningTime: "Evening (6-8 PM)"
  });

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch dashboard data which includes user's products
        const response = await fetch('/api/dashboard');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter owned products that have journey capability
        const journeyOwnedProducts = data.ownedProducts
          .filter((product: Product) => journeyProducts.includes(product.code))
          .map((product: Product) => ({
            ...product,
            icon: productIcons[product.code],
            // Mock additional data
            nextLesson: (product.progress || 0) < 100 ? {
              day: Math.ceil(((product.progress || 0) / 100) * 30),
              title: "Next lesson title",
              duration: "45 min"
            } : null,
            lastAccessedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            certificateEarned: product.progress === 100
          }));
        
        // All products with journey capability
        const allJourneyProducts = data.allProducts
          .filter((product: Product) => journeyProducts.includes(product.code))
          .map((product: Product) => ({
            ...product,
            icon: productIcons[product.code]
          }));
        
        setOwnedProducts(journeyOwnedProducts);
        setAllProducts(allJourneyProducts);
        
        // Set first owned product as selected by default
        if (journeyOwnedProducts.length > 0) {
          setSelectedCourse(journeyOwnedProducts[0]);
        }
        
        // Check if user has all access
        const hasAllAccessBundle = data.ownedProducts.length === data.allProducts.length;
        setHasAllAccess(hasAllAccessBundle);
        
      } catch (err) {
        console.error('Failed to fetch user products:', err);
        setError('Failed to load your products. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProducts();
  }, [user]);

  const handleContinueLearning = (product: Product) => {
    if (product.code === 'P1') {
      router.push('/journey/p1');
    } else {
      router.push(`/products/${product.code.toLowerCase()}`);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getStreakDays = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date().getDay();
    const streakData = [];
    
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (today - i + 7) % 7;
      const isActive = i < learningStats.currentStreak;
      const isToday = i === 0;
      
      streakData.push({
        day: days[dayIndex],
        active: isActive,
        today: isToday
      });
    }
    
    return streakData;
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
              <Text className="ml-2">Loading your learning journey...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  // No owned products - show purchase prompt
  if (ownedProducts.length === 0) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Heading as="h1" className="mb-2">
                Your Learning Journey
              </Heading>
              <Text color="muted">
                Start your entrepreneurial education with our comprehensive courses
              </Text>
            </div>

            {/* No products message */}
            <Card className="mb-8">
              <CardContent className="text-center py-16">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="w-10 h-10 text-purple-600" />
                </div>
                <Heading as="h3" variant="h3" className="mb-4">
                  Begin Your Startup Education
                </Heading>
                <Text color="muted" className="max-w-2xl mx-auto mb-8">
                  Join thousands of Indian founders who are transforming their ideas into successful businesses. 
                  Our structured learning paths guide you through every step of the startup journey.
                </Text>
                
                <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">12</div>
                    <Text size="sm" color="muted">Expert Courses</Text>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <Text size="sm" color="muted">Lessons</Text>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">1000+</div>
                    <Text size="sm" color="muted">Templates</Text>
                  </div>
                </div>
                
                <Link href="/pricing">
                  <Button variant="primary" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Explore All Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Featured course */}
            <Card className="border-2 border-black bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-orange-600 text-white mb-3">Most Popular</Badge>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Target className="w-8 h-8 text-orange-600" />
                      P1: 30-Day India Launch Sprint
                    </CardTitle>
                    <Text color="muted" className="mt-3">
                      The perfect starting point for first-time founders. Learn to go from idea to startup launch 
                      with daily action plans and knowledge specifically designed for the Indian ecosystem.
                    </Text>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <Text weight="medium" className="mb-3">What You'll Learn:</Text>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <Text size="sm">Market validation & customer discovery</Text>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <Text size="sm">Business registration & compliance</Text>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <Text size="sm">MVP development & testing</Text>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <Text size="sm">DPIIT recognition & benefits</Text>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Text weight="medium" className="mb-3">Course Details:</Text>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <Text size="sm">30 days (1-2 hours/day)</Text>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <Text size="sm">30 comprehensive lessons</Text>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-gray-500" />
                        <Text size="sm">1500 XP + Achievement badges</Text>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <Text size="sm">Community support included</Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <Text className="text-3xl font-bold">₹4,999</Text>
                    <Text size="sm" color="muted">One-time payment • Lifetime access</Text>
                  </div>
                  <Link href="/pricing?highlight=P1">
                    <Button variant="primary" size="lg">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  // User has products - show detailed journey interface
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header with stats */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Heading as="h1" className="mb-2">
                  Learning Journey
                </Heading>
                <Text color="muted">
                  Track your progress and continue learning
                </Text>
              </div>
              {hasAllAccess && (
                <Badge className="bg-purple-100 text-purple-700">
                  <Sparkles className="w-4 h-4 mr-1" />
                  All Access Member
                </Badge>
              )}
            </div>
            
            {/* Learning Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Flame className="w-8 h-8 text-orange-600" />
                    <Text className="text-3xl font-bold">{learningStats.currentStreak}</Text>
                  </div>
                  <Text weight="medium">Day Streak</Text>
                  <Text size="sm" color="muted">Keep it up!</Text>
                  
                  {/* Streak Calendar */}
                  <div className="flex gap-1 mt-4">
                    {getStreakDays().map((day, i) => (
                      <div key={i} className="text-center">
                        <Text size="xs" color="muted" className="mb-1">{day.day}</Text>
                        <div className={cn(
                          "w-6 h-6 rounded-full",
                          day.active ? "bg-orange-600" : "bg-gray-200",
                          day.today && "ring-2 ring-orange-600 ring-offset-2"
                        )} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Clock className="w-8 h-8 text-blue-600" />
                    <Text className="text-3xl font-bold">{learningStats.totalLearningTime}</Text>
                  </div>
                  <Text weight="medium">Hours Learned</Text>
                  <Text size="sm" color="muted">Avg {learningStats.averageSessionTime} min/session</Text>
                  
                  <ProgressBar 
                    value={learningStats.weeklyProgress / learningStats.weeklyGoal * 100} 
                    className="mt-4"
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    {learningStats.weeklyProgress}/{learningStats.weeklyGoal} weekly goal
                  </Text>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Trophy className="w-8 h-8 text-green-600" />
                    <Text className="text-3xl font-bold">{learningStats.totalXP}</Text>
                  </div>
                  <Text weight="medium">Total XP</Text>
                  <Text size="sm" color="muted">Rank #{learningStats.rank} of {learningStats.totalRanks}</Text>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <Text size="xs" className="text-green-600">+250 XP this week</Text>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Activity className="w-8 h-8 text-purple-600" />
                    <Text className="text-3xl font-bold">
                      {Math.round((learningStats.completedLessons / learningStats.totalLessons) * 100)}%
                    </Text>
                  </div>
                  <Text weight="medium">Overall Progress</Text>
                  <Text size="sm" color="muted">
                    {learningStats.completedLessons}/{learningStats.totalLessons} lessons
                  </Text>
                  
                  <div className="mt-4">
                    <Badge size="sm" variant="outline" className="text-purple-600 border-purple-300">
                      {learningStats.preferredLearningTime}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {error && (
              <Alert variant="warning" className="mb-6">
                {error}
              </Alert>
            )}
          </div>

          {/* Main Content with Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active">Active Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>

            {/* Active Courses Tab */}
            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course List */}
                <div className="lg:col-span-1 space-y-4">
                  <Heading as="h3" variant="h4">Your Courses</Heading>
                  {ownedProducts.map((product) => (
                    <Card
                      key={product.code}
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedCourse?.code === product.code 
                          ? "border-2 border-black shadow-lg" 
                          : "border-2 border-gray-200 hover:border-gray-400"
                      )}
                      onClick={() => setSelectedCourse(product)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            product.progress === 100 ? "bg-green-600 text-white" : "bg-black text-white"
                          )}>
                            {product.icon}
                          </div>
                          <div className="flex-1">
                            <Text weight="medium" className="mb-1">
                              {product.code}: {product.title}
                            </Text>
                            <div className="flex items-center gap-2 mb-2">
                              <ProgressBar value={product.progress || 0} className="flex-1 h-2" />
                              <Text size="xs" weight="medium">{product.progress}%</Text>
                            </div>
                            <Text size="xs" color="muted">
                              Last accessed {getTimeAgo(product.lastAccessedAt || '')}
                            </Text>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Course Details */}
                {selectedCourse && (
                  <div className="lg:col-span-2">
                    <Card className="border-2 border-black">
                      <CardHeader className="bg-black text-white">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3 text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                              {selectedCourse.icon}
                            </div>
                            {selectedCourse.code}: {selectedCourse.title}
                          </CardTitle>
                          {selectedCourse.certificateEarned && (
                            <Badge className="bg-green-600 text-white">
                              <Award className="w-4 h-4 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <Text color="muted" className="mb-6">
                          {selectedCourse.description}
                        </Text>

                        {/* Progress Overview */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <Text weight="medium" className="mb-3">Course Progress</Text>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <Text size="sm">Overall Progress</Text>
                                  <Text size="sm" weight="medium">{selectedCourse.progress}%</Text>
                                </div>
                                <ProgressBar value={selectedCourse.progress || 0} />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <Text size="sm">Modules Completed</Text>
                                  <Text size="sm" weight="medium">
                                    {selectedCourse.completedModules}/{selectedCourse.totalModules}
                                  </Text>
                                </div>
                                <ProgressBar 
                                  value={(selectedCourse.completedModules || 0) / (selectedCourse.totalModules || 1) * 100} 
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Text weight="medium" className="mb-3">Learning Stats</Text>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Text size="sm" color="muted">Estimated Time</Text>
                                <Text size="sm">{selectedCourse.estimatedDays} days</Text>
                              </div>
                              <div className="flex items-center justify-between">
                                <Text size="sm" color="muted">Time Invested</Text>
                                <Text size="sm">~{Math.round((selectedCourse.progress || 0) * 0.45)} hours</Text>
                              </div>
                              <div className="flex items-center justify-between">
                                <Text size="sm" color="muted">XP Earned</Text>
                                <Text size="sm">{Math.round((selectedCourse.progress || 0) * 15)} XP</Text>
                              </div>
                              <div className="flex items-center justify-between">
                                <Text size="sm" color="muted">Last Activity</Text>
                                <Text size="sm">{getTimeAgo(selectedCourse.lastAccessedAt || '')}</Text>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Next Lesson or Certificate */}
                        {(selectedCourse.progress || 0) < 100 && selectedCourse.nextLesson ? (
                          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div>
                                  <Text weight="medium" className="mb-1">Next Lesson</Text>
                                  <Text className="text-lg mb-2">
                                    Day {selectedCourse.nextLesson.day}: {selectedCourse.nextLesson.title}
                                  </Text>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      <span>{selectedCourse.nextLesson.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Zap className="w-4 h-4 text-yellow-500" />
                                      <span>+50 XP</span>
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  variant="primary"
                                  onClick={() => handleContinueLearning(selectedCourse)}
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Continue
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ) : selectedCourse.certificateEarned ? (
                          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                            <CardContent className="p-6 text-center">
                              <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                              <Text weight="medium" className="text-lg mb-2">
                                Course Completed!
                              </Text>
                              <Text color="muted" className="mb-4">
                                You've successfully completed this course and earned your certificate.
                              </Text>
                              <Button variant="outline">
                                View Certificate
                              </Button>
                            </CardContent>
                          </Card>
                        ) : null}

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                          <Button 
                            variant="primary" 
                            className="flex-1"
                            onClick={() => handleContinueLearning(selectedCourse)}
                          >
                            {selectedCourse.progress === 100 ? 'Review Course' : 'Continue Learning'}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="outline">
                            <BookMarked className="w-4 h-4 mr-2" />
                            Resources
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Heading as="h3" variant="h4">Your Achievements</Heading>
                  <Text color="muted">
                    {achievements.filter(a => a.earned).length}/{achievements.length} Unlocked
                  </Text>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={cn(
                        "transition-all",
                        achievement.earned 
                          ? "border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50" 
                          : "border-2 border-gray-200 opacity-60"
                      )}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={cn(
                          "w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center",
                          achievement.earned ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-400"
                        )}>
                          {achievement.icon}
                        </div>
                        <Text weight="medium" className="mb-1">{achievement.name}</Text>
                        <Text size="sm" color="muted" className="mb-3">
                          {achievement.description}
                        </Text>
                        <Badge variant={achievement.earned ? "default" : "outline"}>
                          +{achievement.xp} XP
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Available Courses Tab */}
            <TabsContent value="available" className="space-y-6">
              {!hasAllAccess && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Heading as="h3" variant="h4">Available Courses</Heading>
                    <Link href="/pricing">
                      <Button variant="outline" size="sm">
                        View All Courses
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProducts
                      .filter(p => !p.hasAccess)
                      .slice(0, 6)
                      .map((product) => (
                        <Card
                          key={product.code}
                          className="border-2 border-gray-200 hover:border-gray-400 transition-all cursor-pointer"
                          onClick={() => router.push(`/pricing?highlight=${product.code}`)}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center">
                                {product.icon}
                              </div>
                              <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <CardTitle className="text-lg">
                              {product.code}: {product.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Text size="sm" color="muted" className="mb-4 line-clamp-2">
                              {product.description}
                            </Text>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Text className="font-bold text-lg">₹{product.price?.toLocaleString('en-IN')}</Text>
                                <Text size="xs" color="muted">{product.estimatedDays} days</Text>
                              </div>
                              <Button variant="outline" size="sm">
                                Learn More
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                  
                  {!hasAllAccess && (
                    <Card className="mt-8 border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50">
                      <CardContent className="p-8 text-center">
                        <Badge className="bg-purple-600 text-white mb-4">
                          SAVE ₹15,987
                        </Badge>
                        <Heading as="h3" variant="h3" className="mb-4">
                          Unlock All Courses with All Access
                        </Heading>
                        <Text color="muted" className="max-w-2xl mx-auto mb-6">
                          Get instant access to all 12 courses, future updates, and exclusive content. 
                          The complete education you need to build a successful startup.
                        </Text>
                        <Link href="/pricing">
                          <Button variant="primary" size="lg">
                            Get All Access
                            <Sparkles className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}