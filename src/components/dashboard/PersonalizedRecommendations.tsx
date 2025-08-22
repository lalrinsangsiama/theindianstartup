'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Text, Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Target, 
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react';
import { generateLearningPath, getNextRecommendedProduct, UserProfile } from '@/lib/learning-paths';
import { cn } from '@/lib/utils';

interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  estimatedDays: number;
  icon?: React.ReactNode;
}

interface PersonalizedRecommendationsProps {
  userProfile: UserProfile;
  completedProducts: string[];
  allProducts: Product[];
  className?: string;
}

export function PersonalizedRecommendations({
  userProfile,
  completedProducts,
  allProducts,
  className
}: PersonalizedRecommendationsProps) {
  const [learningPath, setLearningPath] = useState<any>(null);
  const [nextProduct, setNextProduct] = useState<Product | null>(null);
  const [showFullPath, setShowFullPath] = useState(false);

  useEffect(() => {
    // Generate personalized learning path
    const path = generateLearningPath(userProfile);
    setLearningPath(path);

    // Get next recommended product
    const nextProductCode = getNextRecommendedProduct(completedProducts, userProfile);
    if (nextProductCode) {
      const product = allProducts.find(p => p.code === nextProductCode);
      setNextProduct(product || null);
    }
  }, [userProfile, completedProducts, allProducts]);

  if (!learningPath || !nextProduct) return null;

  const pathProducts = learningPath.products
    .map((code: string) => allProducts.find(p => p.code === code))
    .filter(Boolean);

  const completedInPath = pathProducts.filter((p: Product) => 
    completedProducts.includes(p.code)
  ).length;

  const progressPercent = (completedInPath / pathProducts.length) * 100;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Learning Path Card */}
      <Card className="border-2 border-accent bg-gradient-to-br from-accent/5 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Your Personalized Learning Path</CardTitle>
                <Text size="sm" color="muted">
                  {learningPath.name}
                </Text>
              </div>
            </div>
            <Badge className="bg-accent/20 text-accent">
              {completedInPath}/{pathProducts.length} Completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Text size="sm" className="mb-4">
            {learningPath.description}
          </Text>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <Text size="sm" weight="medium">Path Progress</Text>
              <Text size="sm" color="muted">{Math.round(progressPercent)}%</Text>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-accent rounded-full h-3 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Path Overview */}
          <div className="space-y-3 mb-6">
            {pathProducts.slice(0, showFullPath ? undefined : 3).map((product: Product, index: number) => {
              const isCompleted = completedProducts.includes(product.code);
              const isCurrent = product.code === nextProduct?.code;

              return (
                <div 
                  key={product.code}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all",
                    isCompleted && "bg-green-50",
                    isCurrent && "bg-accent/10 border-2 border-accent"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    isCompleted ? "bg-green-500 text-white" : "bg-gray-200"
                  )}>
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <div className="flex-1">
                    <Text weight="medium" size="sm">
                      {product.code}: {product.title}
                    </Text>
                    {isCurrent && (
                      <Text size="xs" className="text-accent">
                        Recommended Next
                      </Text>
                    )}
                  </div>
                  <Text size="xs" color="muted">
                    {product.estimatedDays} days
                  </Text>
                </div>
              );
            })}
          </div>

          {pathProducts.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullPath(!showFullPath)}
              className="w-full"
            >
              {showFullPath ? 'Show Less' : `Show All ${pathProducts.length} Courses`}
              <ChevronRight className={cn(
                "w-4 h-4 ml-2 transition-transform",
                showFullPath && "rotate-90"
              )} />
            </Button>
          )}

          {/* Expected Outcomes */}
          <div className="mt-6 p-4 bg-white rounded-lg">
            <Text weight="medium" size="sm" className="mb-3">
              What You'll Achieve:
            </Text>
            <ul className="space-y-2">
              {learningPath.outcomes.slice(0, 3).map((outcome: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-accent mt-0.5" />
                  <Text size="sm">{outcome}</Text>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Next Recommended Course */}
      <Card className="border-2 hover:border-accent transition-all">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg">Start Your Next Course</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Text weight="semibold" className="mb-1">
                {nextProduct.code}: {nextProduct.title}
              </Text>
              <Text size="sm" color="muted" className="mb-3">
                {nextProduct.description}
              </Text>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <Text size="sm">{nextProduct.estimatedDays} days</Text>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <Text size="sm">₹{nextProduct.price.toLocaleString('en-IN')}</Text>
                </div>
              </div>
            </div>
          </div>

          <Link href={`/pricing?highlight=${nextProduct.code}`}>
            <Button variant="primary" className="w-full">
              View Course Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <Text size="sm" color="muted" className="mb-1">
              Estimated Completion
            </Text>
            <Text weight="semibold" className="text-lg">
              {learningPath.estimatedDuration}
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="sm" color="muted" className="mb-1">
              Path Difficulty
            </Text>
            <Text weight="semibold" className="text-lg capitalize">
              {learningPath.difficulty}
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}