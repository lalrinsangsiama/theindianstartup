'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { GovernmentSchemesDatabase } from '@/components/schemes/GovernmentSchemesDatabase';
import { EligibilityChecker } from '@/components/schemes/EligibilityChecker';
import { ApplicationTracker } from '@/components/schemes/ApplicationTracker';
import { 
  Building, 
  FileText, 
  Calculator,
  Target,
  Download,
  Users,
  TrendingUp,
  BookOpen,
  MapPin,
  Video,
  ArrowRight,
  CheckCircle,
  Info,
  Sparkles,
  X
} from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'guide' | 'video' | 'calculator';
  icon: React.ReactNode;
  downloadUrl?: string;
  action: () => void;
}

export default function GovernmentSchemesPage() {
  const [activeTab, setActiveTab] = useState<'database' | 'resources' | 'tracker'>('database');
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Scheme Eligibility Calculator',
      description: 'Check your eligibility for multiple schemes at once',
      type: 'calculator',
      icon: <Calculator className="w-5 h-5" />,
      action: () => setShowEligibilityChecker(true)
    },
    {
      id: '2',
      title: 'Application Templates Pack',
      description: '50+ ready-to-use templates for scheme applications',
      type: 'template',
      icon: <FileText className="w-5 h-5" />,
      downloadUrl: '/templates/scheme-applications.zip',
      action: () => alert('Downloading templates...')
    },
    {
      id: '3',
      title: 'Success Case Studies',
      description: 'Learn from 25+ successful scheme applications',
      type: 'guide',
      icon: <BookOpen className="w-5 h-5" />,
      action: () => alert('Opening case studies...')
    },
    {
      id: '4',
      title: 'Application Masterclass',
      description: '3-hour video guide on winning applications',
      type: 'video',
      icon: <Video className="w-5 h-5" />,
      action: () => alert('Opening video library...')
    }
  ];

  return (
    <ProductProtectedRoute productCode="P7">
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Heading as="h1" variant="h3">
                  Government Schemes Database
                </Heading>
                <Text color="muted" size="lg">
                  Access 500+ central and state government schemes worth ₹50L to ₹5Cr
                </Text>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-2 hover:border-black transition-colors">
              <CardContent className="p-6 text-center">
                <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <Text className="text-2xl font-bold">500+</Text>
                <Text size="sm" color="muted">Total Schemes</Text>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-black transition-colors">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <Text className="text-2xl font-bold">85%</Text>
                <Text size="sm" color="muted">Success Rate</Text>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-black transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <Text className="text-2xl font-bold">₹5Cr</Text>
                <Text size="sm" color="muted">Max Funding</Text>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-black transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <Text className="text-2xl font-bold">28+8</Text>
                <Text size="sm" color="muted">States + UTs</Text>
              </CardContent>
            </Card>
          </div>

          {/* Info Alert */}
          <Alert variant="info" className="mb-6">
            <Info className="w-4 h-4" />
            <div>
              <Text weight="medium">Pro Tip: Start with Central Government Schemes</Text>
              <Text size="sm" color="muted">
                Central schemes typically have higher funding amounts and standardized processes. 
                Use the filters to find schemes matching your startup stage and funding needs.
              </Text>
            </div>
          </Alert>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('database')}
              className={`
                px-4 py-3 font-medium transition-all
                ${activeTab === 'database' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-600 hover:text-black'
                }
              `}
            >
              Scheme Database
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`
                px-4 py-3 font-medium transition-all
                ${activeTab === 'resources' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-600 hover:text-black'
                }
              `}
            >
              Resources & Tools
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`
                px-4 py-3 font-medium transition-all
                ${activeTab === 'tracker' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-600 hover:text-black'
                }
              `}
            >
              Application Tracker
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'database' && (
            <GovernmentSchemesDatabase />
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <Card key={resource.id} className="border-2 hover:border-black transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          ${resource.type === 'template' ? 'bg-blue-100 text-blue-600' :
                            resource.type === 'calculator' ? 'bg-green-100 text-green-600' :
                            resource.type === 'guide' ? 'bg-purple-100 text-purple-600' :
                            'bg-orange-100 text-orange-600'
                          }
                        `}>
                          {resource.icon}
                        </div>
                        <div className="flex-1">
                          <Heading as="h4" variant="h6" className="mb-1">
                            {resource.title}
                          </Heading>
                          <Text size="sm" color="muted" className="mb-3">
                            {resource.description}
                          </Text>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={resource.action}
                          >
                            {resource.downloadUrl ? (
                              <>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </>
                            ) : (
                              <>
                                Access
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Resources */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <Heading as="h3" variant="h5" className="mb-3">
                        Weekly Scheme Updates
                      </Heading>
                      <Text color="muted" className="mb-4">
                        Get notified about new schemes, deadline reminders, and success stories 
                        delivered to your inbox every Monday.
                      </Text>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="primary">
                          Subscribe to Updates
                        </Button>
                        <Button variant="outline">
                          View Past Updates
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tracker' && (
            <ApplicationTracker />
          )}

          {/* Course Links */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Text weight="medium">P7: State-wise Scheme Map</Text>
                    <Badge size="sm" className="bg-green-100 text-green-700">Owned</Badge>
                  </div>
                </div>
                <Text size="sm" color="muted" className="mb-4">
                  Master India's state ecosystem with comprehensive coverage of all states and UTs
                </Text>
                <Link href="/products/p7">
                  <Button variant="outline" size="sm" className="w-full">
                    Continue Course →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <Text weight="medium">P9: Government Schemes & Funding</Text>
                    <Badge size="sm" className="bg-green-100 text-green-700">Owned</Badge>
                  </div>
                </div>
                <Text size="sm" color="muted" className="mb-4">
                  Access ₹50 lakhs to ₹5 crores in government funding through systematic navigation
                </Text>
                <Link href="/products/p9">
                  <Button variant="outline" size="sm" className="w-full">
                    Continue Course →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Eligibility Checker Modal */}
        {showEligibilityChecker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <Heading as="h2" variant="h4">
                  Government Scheme Eligibility Checker
                </Heading>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEligibilityChecker(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6">
                <EligibilityChecker 
                  onComplete={(results) => {
                    logger.info('Eligibility results:', results);
                    setShowEligibilityChecker(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}