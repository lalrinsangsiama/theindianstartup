'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Building,
  FileText,
  CheckCircle,
  Lock,
  Play,
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Briefcase,
  MessageSquare
} from 'lucide-react';

interface P9CourseInterfaceProps {
  courseData: any;
}

export function P9CourseInterface({ courseData }: P9CourseInterfaceProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  const { product, hasAccess, userProgress } = courseData || {};

  const completedLessons = Object.values(userProgress || {}).filter((p: any) => p.completed).length;
  const totalLessons = product?.modules?.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Course Content' },
    { id: 'resources', label: 'Resources' },
    { id: 'community', label: 'Community' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-yellow-500 text-black">
              ₹8.5 LAKH CRORE ECOSYSTEM
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Government Schemes & Funding Mastery
            </h1>
            <p className="text-xl mb-6 text-green-100">
              The Complete Insider's Guide to Non-Dilutive Funding & Strategic Government Partnerships
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">850+</div>
                <div className="text-sm text-green-200">Active Schemes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">84%</div>
                <div className="text-sm text-green-200">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">₹2-50Cr</div>
                <div className="text-sm text-green-200">Funding Range</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">21 Days</div>
                <div className="text-sm text-green-200">To Mastery</div>
              </div>
            </div>

            {/* Progress Bar */}
            {hasAccess && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Your Progress</span>
                  <span className="text-sm">{completedLessons}/{totalLessons} Lessons</span>
                </div>
                <div className="bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs items={tabItems} defaultValue="overview">
          {/* Overview Tab */}
          <div data-value="overview">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* What You'll Achieve */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  What You'll Achieve
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Access ₹2Cr-₹50Cr+ without equity dilution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Build relationships with 15+ government officials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Master 25+ government platforms and portals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Achieve 84% funding success rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Position as government strategic partner</span>
                  </li>
                </ul>
              </Card>

              {/* Key Features */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Exclusive Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                    <span>International cooperation programs access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="w-5 h-5 text-purple-500 mt-0.5" />
                    <span>PSU partnership opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-orange-500 mt-0.5" />
                    <span>1,200+ government contact directory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <span>250+ professional templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-pink-500 mt-0.5" />
                    <span>Policy consultation participation</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Success Framework */}
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Your Journey to Government Partnership</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-600">1</span>
                  </div>
                  <h4 className="font-semibold mb-1">Foundation</h4>
                  <p className="text-sm text-gray-600">Master ₹8.5L Cr ecosystem</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h4 className="font-semibold mb-1">Relationships</h4>
                  <p className="text-sm text-gray-600">Build strategic networks</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h4 className="font-semibold mb-1">Partnership</h4>
                  <p className="text-sm text-gray-600">Secure funding & contracts</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                  <h4 className="font-semibold mb-1">Leadership</h4>
                  <p className="text-sm text-gray-600">Policy influence & growth</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Modules Tab */}
          <div data-value="modules">
            <div className="space-y-4">
              {product?.modules?.map((module: any, index: number) => (
                <Card key={module.id} className="overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-lg font-bold text-green-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{module.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`w-5 h-5 transition-transform ${
                          activeModule === index ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {activeModule === index && (
                    <div className="border-t">
                      {module.lessons?.map((lesson: any) => {
                        const isCompleted = userProgress?.[lesson.id]?.completed;
                        const isLocked = !hasAccess;
                        
                        return (
                          <div 
                            key={lesson.id}
                            className={`p-4 border-b last:border-b-0 ${
                              isLocked ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
                            } transition-colors`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`mt-1 ${
                                  isCompleted ? 'text-green-500' : isLocked ? 'text-gray-400' : 'text-gray-300'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : isLocked ? (
                                    <Lock className="w-5 h-5" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-current" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-gray-500">
                                      Day {lesson.day}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {lesson.xpReward} XP
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium mb-2">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600 mb-3">{lesson.briefContent}</p>
                                  
                                  {!isLocked && (
                                    <Button
                                      onClick={() => setExpandedLesson(
                                        expandedLesson === lesson.id ? null : lesson.id
                                      )}
                                      variant="outline"
                                      size="sm"
                                    >
                                      <BookOpen className="w-4 h-4 mr-2" />
                                      View Details
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {expandedLesson === lesson.id && (
                              <div className="mt-4 pl-8 space-y-4">
                                {/* Action Items */}
                                <div>
                                  <h5 className="font-medium mb-2 text-sm text-gray-700">Action Items:</h5>
                                  <ul className="space-y-1">
                                    {lesson.actionItems?.map((item: string, i: number) => (
                                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Resources */}
                                {lesson.resources && (
                                  <div>
                                    <h5 className="font-medium mb-2 text-sm text-gray-700">Resources:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {Object.entries(lesson.resources).map(([key, items]: [string, any]) => (
                                        items?.map((item: string, i: number) => (
                                          <Badge key={`${key}-${i}`} variant="secondary" className="text-xs">
                                            {item}
                                          </Badge>
                                        ))
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <Button className="w-full sm:w-auto">
                                  <Play className="w-4 h-4 mr-2" />
                                  Start Lesson
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Resources Tab */}
          <div data-value="resources">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Key Resources */}
              <Card className="p-6">
                <FileText className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold mb-2">850+ Schemes Database</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive database with eligibility and success rates
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Access Database
                </Button>
              </Card>

              <Card className="p-6">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">1,200+ Contacts</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Verified government official contacts across ministries
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Directory
                </Button>
              </Card>

              <Card className="p-6">
                <Briefcase className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">250+ Templates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Professional application and proposal templates
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Get Templates
                </Button>
              </Card>

              <Card className="p-6">
                <Globe className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold mb-2">Platform Guides</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Navigation guides for 25+ government portals
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Guides
                </Button>
              </Card>

              <Card className="p-6">
                <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold mb-2">Success Stories</h3>
                <p className="text-sm text-gray-600 mb-4">
                  500+ detailed case studies across sectors
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Stories
                </Button>
              </Card>

              <Card className="p-6">
                <Award className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="font-semibold mb-2">Elite Community</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Network with successful government partners
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </Card>
            </div>
          </div>

          {/* Community Tab */}
          <div data-value="community">
            <Card className="p-8 text-center">
              <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Elite Government Success Community</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Connect with entrepreneurs who have successfully secured government funding. 
                Share experiences, get advice, and build strategic partnerships.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div>
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">₹250Cr+</div>
                  <div className="text-sm text-gray-600">Total Funding Secured</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Success Stories</div>
                </div>
              </div>
              <Button size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Join Community Discussions
              </Button>
            </Card>
          </div>
        </Tabs>

        {/* CTA Section */}
        {!hasAccess && (
          <Card className="mt-8 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Master Government Funding?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join 500+ entrepreneurs who have secured ₹250Cr+ in government funding without equity dilution.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Instant Access - ₹4,999
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                30-day money-back guarantee • Lifetime updates included
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}