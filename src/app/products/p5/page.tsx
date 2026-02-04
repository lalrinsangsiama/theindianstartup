'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  Scale, 
  Users, 
  Shield, 
  FileText, 
  Award, 
  Clock, 
  CheckCircle, 
  Lock,
  Play,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Download,
  Star
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserProducts } from '@/hooks/useUserProducts';
import { P5ResourceHub } from '@/components/legal/P5ResourceHub';
import { useRouter } from 'next/navigation';

interface Module {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessonCount: number;
  completedLessons: number;
  estimatedTime: number;
}

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  estimatedTime: number;
  xpReward: number;
  completed: boolean;
  locked: boolean;
}

const P5LegalStackPage: React.FC = () => {
  const { user } = useAuthContext();
  const { hasAccess, loading } = useUserProducts();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'resources' | 'tools' | 'certification'>('overview');
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [stats, setStats] = useState({
    totalLessons: 45,
    completedLessons: 0,
    totalXP: 0,
    earnedXP: 0,
    progress: 0
  });

  const hasP5Access = hasAccess('P5') || hasAccess('ALL_ACCESS');

  useEffect(() => {
    if (hasP5Access && user) {
      fetchModules();
    }
  }, [hasP5Access, user]);

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/products/p5/modules');
      if (response.ok) {
        const data = await response.json();
        setModules(data.modules || []);
        
        // Calculate stats
        const totalCompleted = data.modules.reduce((sum: number, module: Module) => sum + module.completedLessons, 0);
        const totalXP = data.modules.reduce((sum: number, module: Module) => sum + (module.lessonCount * 100), 0);
        const earnedXP = data.modules.reduce((sum: number, module: Module) => sum + (module.completedLessons * 100), 0);
        
        setStats({
          totalLessons: 45,
          completedLessons: totalCompleted,
          totalXP,
          earnedXP,
          progress: Math.round((totalCompleted / 45) * 100)
        });
      }
    } catch (error) {
      logger.error('Error fetching modules:', error);
    }
  };

  const fetchLessons = async (moduleId: string) => {
    try {
      const response = await fetch(`/api/products/p5/modules/${moduleId}/lessons`);
      if (response.ok) {
        const data = await response.json();
        setLessons(data.lessons || []);
      }
    } catch (error) {
      logger.error('Error fetching lessons:', error);
    }
  };

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    fetchLessons(module.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading P5 Legal Stack...</p>
        </div>
      </div>
    );
  }

  if (!hasP5Access) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-6 pt-20">
          {/* Course Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Scale className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold font-mono mb-4">P5: Legal Stack</h1>
            <p className="text-2xl text-gray-600 mb-2">Bulletproof Legal Framework</p>
            <p className="text-xl text-blue-600 font-semibold">Master India's Complex Legal System</p>
          </div>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">347,836% ROI</h3>
                <p className="text-gray-600">₹27+ crore value from ₹7,999 investment</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-600 mb-2">300+ Templates</h3>
                <p className="text-gray-600">₹1,50,000+ worth of legal documents</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Bar Council</h3>
                <p className="text-gray-600">Recognized certification program</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-mono text-center">What You'll Master</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Legal Risk Prevention</h4>
                      <p className="text-sm text-gray-600">Prevent 95% of startup legal disasters with proven frameworks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Contract Mastery</h4>
                      <p className="text-sm text-gray-600">Draft and negotiate like top lawyers with 100+ templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">IP Protection Strategy</h4>
                      <p className="text-sm text-gray-600">Complete intellectual property portfolio management</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Crisis Management</h4>
                      <p className="text-sm text-gray-600">24x7 legal emergency response protocols</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Employment Law Compliance</h4>
                      <p className="text-sm text-gray-600">Bulletproof HR practices with POSH Act compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Regulatory Mastery</h4>
                      <p className="text-sm text-gray-600">Industry-specific compliance across all sectors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Professional Certification</h4>
                      <p className="text-sm text-gray-600">4-level certification from Foundation to Master</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Expert Network Access</h4>
                      <p className="text-sm text-gray-600">100+ specialized lawyers on-demand</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Transform Legal Liability into Strategic Advantage</h3>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-4xl font-bold">₹7,999</span>
                <div className="text-left">
                  <div className="text-sm opacity-90">One-time payment</div>
                  <div className="text-sm opacity-90">Lifetime access</div>
                </div>
              </div>
              <p className="text-xl mb-6 opacity-90">
                Save ₹8,50,000+ annually in legal costs while building bulletproof protection
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                onClick={() => router.push('/purchase?product=P5')}
              >
                Start Your Legal Mastery Journey
              </Button>
              <p className="text-sm mt-4 opacity-75">
                ✓ 45-day intensive program ✓ 300+ templates ✓ Bar Council certification ✓ 24x7 support
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-mono flex items-center gap-3">
                <Scale className="w-10 h-10 text-blue-600" />
                P5: Legal Stack
              </h1>
              <p className="text-xl text-gray-600 mt-2">Bulletproof Legal Framework Mastery</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{stats.progress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.completedLessons}/{stats.totalLessons}</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.earnedXP}</div>
                <div className="text-sm text-gray-600">XP Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-gray-600">Days</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600">Modules</div>
              </CardContent>
            </Card>
          </div>

          <Progress value={stats.progress} className="mt-4 h-3" />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Course Overview', icon: BookOpen },
            { id: 'modules', label: 'Modules & Lessons', icon: FileText },
            { id: 'resources', label: 'Resource Hub', icon: Download },
            { id: 'tools', label: 'Legal Tools', icon: Shield },
            { id: 'certification', label: 'Certification', icon: Award }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeTab === id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Course Journey */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Your Legal Mastery Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Foundation (Days 1-15)</h3>
                    <p className="text-sm text-gray-600">Master legal fundamentals, contract law, and IP protection basics</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">4 Modules</Badge>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Scale className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Advanced (Days 16-35)</h3>
                    <p className="text-sm text-gray-600">Employment law, dispute resolution, data protection, and compliance</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">6 Modules</Badge>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Expert (Days 36-45)</h3>
                    <p className="text-sm text-gray-600">Crisis management, international law, and cutting-edge legal tech</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">2 Modules</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Why P5 Legal Stack is Worth ₹27+ Crores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Direct Cost Savings
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Legal consultation fees avoided:</span>
                        <span className="font-semibold">₹25,00,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Litigation prevention:</span>
                        <span className="font-semibold">₹2,00,00,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Penalty avoidance:</span>
                        <span className="font-semibold">₹50,00,000</span>
                      </li>
                      <li className="flex justify-between border-t pt-2">
                        <span className="font-semibold">5-Year Savings:</span>
                        <span className="font-bold text-green-600">₹2,75,00,000</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Strategic Advantages
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Competitive legal moats:</span>
                        <span className="font-semibold">₹10,00,00,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Valuation premium:</span>
                        <span className="font-semibold">₹15,00,00,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Strategic advantage:</span>
                        <span className="font-semibold">₹5,00,00,000</span>
                      </li>
                      <li className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Strategic Value:</span>
                        <span className="font-bold text-blue-600">₹25,00,00,000</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Modules List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono">Course Modules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => handleModuleClick(module)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedModule?.id === module.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">Module {module.orderIndex}</span>
                        <Badge variant="outline">{module.lessonCount} lessons</Badge>
                      </div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                      <div className="mt-2">
                        <Progress 
                          value={module.lessonCount > 0 ? (module.completedLessons / module.lessonCount) * 100 : 0}
                          className="h-1"
                        />
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Module Details */}
            <div className="lg:col-span-2">
              {selectedModule ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono">{selectedModule.title}</CardTitle>
                    <p className="text-gray-600">{selectedModule.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`p-4 rounded-lg border ${
                            lesson.completed 
                              ? 'border-green-200 bg-green-50'
                              : lesson.locked
                              ? 'border-gray-200 bg-gray-50'
                              : 'border-blue-200 bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">Day {lesson.day}</Badge>
                                <Badge className={`${
                                  lesson.completed ? 'bg-green-100 text-green-800' :
                                  lesson.locked ? 'bg-gray-100 text-gray-600' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {lesson.completed ? 'Completed' : lesson.locked ? 'Locked' : 'Available'}
                                </Badge>
                              </div>
                              <h4 className="font-semibold mb-1">{lesson.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{lesson.briefContent}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.estimatedTime} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {lesson.xpReward} XP
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              {lesson.completed ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : lesson.locked ? (
                                <Lock className="w-6 h-6 text-gray-400" />
                              ) : (
                                <Button size="sm" className="flex items-center gap-1">
                                  <Play className="w-3 h-3" />
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select a Module</h3>
                    <p className="text-gray-600">Choose a module from the left to view its lessons and start learning.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <P5ResourceHub 
              hasAccess={hasP5Access}
              onUnlockClick={() => router.push('/pricing')}
            />
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Legal Tools */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Legal Risk Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Assess your legal vulnerabilities and calculate prevention costs vs potential losses.
                </p>
                <Button className="w-full" onClick={() => window.open('/legal/risk-calculator', '_blank')}>
                  Launch Calculator
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Contract Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered contract creation with 300+ expert-drafted templates.
                </p>
                <Button className="w-full" onClick={() => window.open('/legal/contract-generator', '_blank')}>
                  Generate Contracts
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Compliance Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Real-time legal compliance monitoring with automated deadline alerts.
                </p>
                <Button className="w-full" onClick={() => window.open('/legal/compliance-tracker', '_blank')}>
                  Track Compliance
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-purple-600" />
                  Template Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Access 300+ professional legal templates worth ₹1,50,000+.
                </p>
                <Button className="w-full" onClick={() => window.open('/legal/templates', '_blank')}>
                  Browse Templates
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  Expert Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with 100+ specialized lawyers for expert legal guidance.
                </p>
                <Button className="w-full">
                  Connect with Experts
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Crisis Hotline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  24x7 emergency legal support hotline for urgent legal matters.
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'certification' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-center">Professional Legal Certification</CardTitle>
                <p className="text-center text-gray-600">
                  Earn Bar Council recognized certification in 4 progressive levels
                </p>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Legal Foundation',
                  level: 1,
                  requirement: '75%+ Score',
                  description: 'Basic legal knowledge and contract review capabilities',
                  color: 'blue',
                  icon: BookOpen
                },
                {
                  name: 'Legal Strategy', 
                  level: 2,
                  requirement: '80%+ Score',
                  description: 'Advanced contract drafting and IP protection strategy',
                  color: 'green',
                  icon: Scale
                },
                {
                  name: 'Legal Expert',
                  level: 3, 
                  requirement: '85%+ Score',
                  description: 'Crisis management and complex legal problem solving',
                  color: 'purple',
                  icon: Award
                },
                {
                  name: 'Legal Master',
                  level: 4,
                  requirement: '90%+ Score', 
                  description: 'Legal training capabilities and consulting authorization',
                  color: 'yellow',
                  icon: Star
                }
              ].map((cert, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <cert.icon className={`w-12 h-12 mx-auto mb-4 text-${cert.color}-600`} />
                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                    <Badge className={`mb-3 bg-${cert.color}-100 text-${cert.color}-800`}>
                      Level {cert.level}
                    </Badge>
                    <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
                    <div className="text-xs text-gray-500 mb-4">{cert.requirement}</div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open('/legal/assessment', '_blank')}
                    >
                      Take Assessment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Assessment Information</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Assessment Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Duration: 60 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Questions: 10 comprehensive questions
                    </li>
                    <li className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-blue-600" />
                      Passing Score: 75% minimum
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      Certification: Bar Council approved
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Question Categories</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Legal Foundations & Risk Management</li>
                    <li>• Contract Law & Negotiation</li>
                    <li>• Intellectual Property Protection</li>
                    <li>• Employment Law & HR Compliance</li>
                    <li>• Dispute Resolution & Litigation</li>
                    <li>• Regulatory Compliance & Data Protection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default P5LegalStackPage;