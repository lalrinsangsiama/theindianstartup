'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Target,
  Award,
  BookOpen,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProgressBar as Progress } from '@/components/ui/ProgressBar';
// Helper function to format Indian price
const formatIndianPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};

interface MobileDashboardProps {
  user: any;
  purchases: any[];
  lessonProgress: any[];
  currentStreak: number;
  totalXP: number;
}

// Quick Stats Component
const QuickStats = ({ currentStreak, totalXP, completedLessons }: any) => (
  <div className="grid grid-cols-3 gap-3">
    <Card className="p-4 text-center">
      <div className="flex flex-col items-center">
        <Zap className="w-5 h-5 text-yellow-500 mb-1" />
        <Text size="lg" weight="bold">{currentStreak}</Text>
        <Text size="xs" color="muted">Day Streak</Text>
      </div>
    </Card>
    
    <Card className="p-4 text-center">
      <div className="flex flex-col items-center">
        <Award className="w-5 h-5 text-blue-500 mb-1" />
        <Text size="lg" weight="bold">{totalXP}</Text>
        <Text size="xs" color="muted">Total XP</Text>
      </div>
    </Card>
    
    <Card className="p-4 text-center">
      <div className="flex flex-col items-center">
        <Target className="w-5 h-5 text-green-500 mb-1" />
        <Text size="lg" weight="bold">{completedLessons}</Text>
        <Text size="xs" color="muted">Completed</Text>
      </div>
    </Card>
  </div>
);

// Continue Learning Component
const ContinueLearning = ({ activeCourses, router }: any) => {
  if (!activeCourses || activeCourses.length === 0) return null;

  const currentCourse = activeCourses[0];
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <Heading as="h3" variant="h6">Continue Learning</Heading>
        <Clock className="w-4 h-4 text-gray-500" />
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Text size="sm" weight="medium">{currentCourse.productName}</Text>
            <Text size="xs" color="muted">Day {currentCourse.currentDay}/30</Text>
          </div>
          <Progress value={currentCourse.progress} className="h-2 mb-3" />
          <Button 
            onClick={() => router.push(currentCourse.nextLessonUrl)}
            className="w-full"
            size="sm"
          >
            Continue Day {currentCourse.currentDay}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Popular Courses Component
const PopularCourses = ({ purchases, router, limit = 3 }: any) => {
  const popularProducts = [
    {
      code: 'P1',
      title: '30-Day Launch Sprint',
      price: 4999,
      duration: '30 days',
      color: 'bg-blue-500'
    },
    {
      code: 'P3',
      title: 'Funding Mastery',
      price: 5999,
      duration: '45 days',
      color: 'bg-green-500'
    },
    {
      code: 'P4',
      title: 'Finance Stack',
      price: 6999,
      duration: '45 days',
      color: 'bg-purple-500'
    }
  ];

  const availableProducts = popularProducts
    .filter(p => !purchases.some((purchase: any) => purchase.productCode === p.code))
    .slice(0, limit);

  if (availableProducts.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Heading as="h3" variant="h6">Popular Courses</Heading>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/pricing')}
          className="text-xs"
        >
          View All
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {availableProducts.map((product) => (
          <Card 
            key={product.code}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push(`/demo/${product.code.toLowerCase()}`)}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <Text weight="medium" size="sm" className="mb-1">
                  {product.title}
                </Text>
                <div className="flex items-center justify-between">
                  <Text size="xs" color="muted">{product.duration}</Text>
                  <Text size="sm" weight="bold">₹{formatIndianPrice(product.price)}</Text>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Progress Tracker Component
const ProgressTracker = ({ weeklyProgress }: any) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Adjust for Monday start
  
  return (
    <Card className="p-4">
      <Heading as="h3" variant="h6" className="mb-3">This Week</Heading>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCompleted = weeklyProgress?.[index] || false;
          const isToday = index === adjustedToday;
          
          return (
            <div key={index} className="text-center">
              <Text size="xs" color="muted" className="mb-1">{day}</Text>
              <div 
                className={`
                  w-8 h-8 rounded-full mx-auto flex items-center justify-center
                  ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100'}
                  ${isToday ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {isCompleted && '✓'}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Main Mobile Dashboard Component
export const MobileDashboard: React.FC<MobileDashboardProps> = ({
  user,
  purchases,
  lessonProgress,
  currentStreak,
  totalXP
}) => {
  const router = useRouter();
  
  // Calculate active courses
  const activeCourses = purchases
    .filter(p => p.isActive && p.productCode !== 'ALL_ACCESS')
    .map(purchase => {
      const progress = lessonProgress.filter(lp => lp.purchaseId === purchase.id);
      const completedCount = progress.filter(lp => lp.completed).length;
      const totalLessons = 30; // Adjust based on product
      
      return {
        ...purchase,
        progress: (completedCount / totalLessons) * 100,
        currentDay: completedCount + 1,
        nextLessonUrl: `/products/${purchase.productCode.toLowerCase()}/lessons/${completedCount + 1}`
      };
    })
    .sort((a, b) => b.updatedAt - a.updatedAt);

  // Calculate weekly progress (mock data for now)
  const weeklyProgress = [true, true, false, true, false, false, false];
  
  const completedLessons = lessonProgress.filter(lp => lp.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-white px-4 py-6 border-b">
        <Text size="sm" color="muted" className="mb-1">Welcome back,</Text>
        <Heading as="h1" variant="h4">{user.name || 'Founder'}</Heading>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 pb-20">
        <QuickStats 
          currentStreak={currentStreak}
          totalXP={totalXP}
          completedLessons={completedLessons}
        />
        
        <ContinueLearning 
          activeCourses={activeCourses}
          router={router}
        />
        
        <PopularCourses 
          purchases={purchases}
          router={router}
          limit={3}
        />
        
        <ProgressTracker 
          weeklyProgress={weeklyProgress}
        />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/portfolio/portfolio-dashboard')}
            className="w-full h-16 flex-col gap-1"
          >
            <Award className="w-5 h-5" />
            <span className="text-xs">Portfolio</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/community')}
            className="w-full h-16 flex-col gap-1"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Community</span>
          </Button>
        </div>

        {/* Quick Access to All Courses */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <Text weight="medium" className="mb-2">Explore All Courses</Text>
            <Text size="sm" color="muted" className="mb-4">
              12 comprehensive courses to master every aspect of building your startup
            </Text>
            <Button 
              size="sm" 
              variant="primary"
              onClick={() => router.push('/pricing')}
              className="w-full"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};