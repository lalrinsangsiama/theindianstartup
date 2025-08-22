'use client';

import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Play, 
  Lock, 
  Star,
  ShoppingCart,
  Eye
} from 'lucide-react';
import Link from 'next/link';

interface DemoLesson {
  id: string;
  order: number;
  title: string;
  briefContent: string;
  actionItems: any[];
  resources: any[];
  estimatedTime: number;
  isDemo: boolean;
}

interface DemoData {
  product: {
    code: string;
    title: string;
    description: string;
    price: number;
  };
  module: {
    title: string;
    description: string;
  };
  demoLessons: DemoLesson[];
  totalLessons: number;
  demoMessage: string;
}

export default function DemoPage({ params }: { params: { productCode: string } }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [demoData, setDemoData] = useState<DemoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState(0);

  useEffect(() => {
    async function fetchDemo() {
      if (!user) return;

      try {
        const response = await fetch(`/api/demo/${params.productCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch demo content');
        }
        const data = await response.json();
        setDemoData(data);
      } catch (error) {
        setError('Unable to load demo content');
        logger.error('Demo fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDemo();
  }, [user, params.productCode]);

  const handlePurchase = () => {
    router.push(`/pricing?product=${params.productCode}`);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
            <Text>Loading demo content...</Text>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !demoData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md mx-auto p-8 text-center">
            <Text className="text-red-600 mb-4">{error || 'Demo not available'}</Text>
            <Button onClick={() => router.back()}>
              Go Back
            </Button>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  const currentLesson = demoData.demoLessons[selectedLesson];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <Badge className="bg-blue-100 text-blue-700 mb-2">
                    <Eye className="w-3 h-3 mr-1" />
                    Demo Version
                  </Badge>
                  <Heading as="h1" variant="h4">
                    {demoData.product.title}
                  </Heading>
                  <Text size="sm" color="muted">
                    {demoData.module.title} - Day 1 & 2 Preview
                  </Text>
                </div>
              </div>
              
              <Button onClick={handlePurchase} className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Purchase Full Course - ₹{demoData.product.price.toLocaleString('en-IN')}
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Lesson Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <Heading as="h3" variant="h6" className="mb-4">
                    Demo Lessons
                  </Heading>
                  
                  <div className="space-y-2">
                    {demoData.demoLessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedLesson === index 
                            ? 'bg-accent text-white' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Play className="w-3 h-3" />
                          <Text size="sm" weight="medium">
                            Day {lesson.order}
                          </Text>
                        </div>
                        <Text size="xs" className={selectedLesson === index ? 'text-accent-light' : 'text-gray-600'}>
                          {lesson.title}
                        </Text>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3" />
                          <Text size="xs" className={selectedLesson === index ? 'text-accent-light' : 'text-gray-500'}>
                            {lesson.estimatedTime} min
                          </Text>
                        </div>
                      </button>
                    ))}
                    
                    {/* Show locked lessons */}
                    {Array.from({ length: Math.max(0, demoData.totalLessons - 2) }).map((_, index) => (
                      <div
                        key={`locked-${index}`}
                        className="w-full text-left p-3 rounded-lg bg-gray-100 opacity-60"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-3 h-3 text-gray-400" />
                          <Text size="sm" weight="medium" className="text-gray-400">
                            Day {index + 3}
                          </Text>
                        </div>
                        <Text size="xs" className="text-gray-400">
                          Locked - Purchase to unlock
                        </Text>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <Text size="xs" className="text-yellow-700">
                      💡 This demo shows {demoData.demoLessons.length} of {demoData.totalLessons} total lessons
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lesson Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Badge className="mb-2">Day {currentLesson.order}</Badge>
                    <Heading as="h2" variant="h4" className="mb-2">
                      {currentLesson.title}
                    </Heading>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentLesson.estimatedTime} minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Demo Content</span>
                      </div>
                    </div>
                  </div>

                  {/* Morning Brief */}
                  <div className="mb-8">
                    <Heading as="h3" variant="h5" className="mb-4">
                      Morning Brief
                    </Heading>
                    <div className="prose max-w-none">
                      <Text>{currentLesson.briefContent}</Text>
                    </div>
                  </div>

                  {/* Action Items (Limited for Demo) */}
                  <div className="mb-8">
                    <Heading as="h3" variant="h5" className="mb-4">
                      Action Items (Demo - First 3)
                    </Heading>
                    <div className="space-y-3">
                      {currentLesson.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <Text weight="medium">{item.title || `Action Item ${index + 1}`}</Text>
                            <Text size="sm" color="muted">{item.description || item}</Text>
                          </div>
                        </div>
                      ))}
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Text size="sm" className="text-yellow-700">
                          🔒 Full course includes 5-8 detailed action items per day with templates and tools
                        </Text>
                      </div>
                    </div>
                  </div>

                  {/* Resources (Limited for Demo) */}
                  <div className="mb-8">
                    <Heading as="h3" variant="h5" className="mb-4">
                      Resources (Demo - First 3)
                    </Heading>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentLesson.resources.map((resource, index) => (
                        <Card key={index} className="p-4">
                          <Text weight="medium" size="sm">{resource.title || `Resource ${index + 1}`}</Text>
                          <Text size="xs" color="muted">{resource.type || 'Template'}</Text>
                        </Card>
                      ))}
                      
                      <Card className="p-4 bg-yellow-50 border-yellow-200">
                        <Text weight="medium" size="sm" className="text-yellow-700">🔒 Premium Resources</Text>
                        <Text size="xs" className="text-yellow-600">8-12 templates & tools in full version</Text>
                      </Card>
                    </div>
                  </div>

                  {/* Purchase CTA */}
                  <div className="p-6 bg-gradient-to-r from-accent to-accent/80 rounded-lg text-white text-center">
                    <Heading as="h3" variant="h5" className="mb-2 text-white">
                      Ready for the Complete Experience?
                    </Heading>
                    <Text className="text-accent-light mb-4">
                      {demoData.demoMessage}
                    </Text>
                    <Button 
                      onClick={handlePurchase}
                      variant="secondary"
                      size="lg"
                      className="bg-white text-accent hover:bg-gray-100"
                    >
                      Purchase Full Course - ₹{demoData.product.price.toLocaleString('en-IN')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}