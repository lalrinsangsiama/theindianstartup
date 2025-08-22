'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  Lock,
  PlayCircle,
  Download,
  Users,
  Calendar,
  TrendingUp,
  Target,
  Briefcase,
  FileText,
  Calculator,
  Shield,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Module {
  id: string;
  title: string;
  description: string;
  days: number;
  lessons: number;
  status: 'locked' | 'current' | 'completed';
  progress: number;
  icon: React.ReactNode;
}

export default function P2CourseInterface() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<string>('module-1');
  const [overallProgress, setOverallProgress] = useState(15);

  const modules: Module[] = [
    {
      id: 'module-1',
      title: 'Incorporation Foundations',
      description: 'Master business structures, pre-incorporation essentials, and documentation',
      days: 5,
      lessons: 15,
      status: 'current',
      progress: 60,
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      id: 'module-2',
      title: 'Licenses & Permits',
      description: 'Navigate the complete licensing landscape and regulatory requirements',
      days: 5,
      lessons: 12,
      status: 'locked',
      progress: 0,
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'module-3',
      title: 'Financial Compliance',
      description: 'Build world-class financial infrastructure and tax systems',
      days: 5,
      lessons: 18,
      status: 'locked',
      progress: 0,
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: 'module-4',
      title: 'Contracts & Agreements',
      description: 'Master legal documentation and negotiation strategies',
      days: 5,
      lessons: 20,
      status: 'locked',
      progress: 0,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'module-5',
      title: 'Advanced Compliance',
      description: 'Handle complex regulatory requirements and international compliance',
      days: 5,
      lessons: 15,
      status: 'locked',
      progress: 0,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'module-6',
      title: 'Ongoing Compliance',
      description: 'Build sustainable compliance systems for long-term success',
      days: 5,
      lessons: 12,
      status: 'locked',
      progress: 0,
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const quickStats = [
    { label: 'Total Progress', value: '15%', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Lessons Completed', value: '9/92', icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: 'XP Earned', value: '750', icon: <Award className="w-4 h-4" /> },
    { label: 'Templates Downloaded', value: '23', icon: <Download className="w-4 h-4" /> }
  ];

  const upcomingActivities = [
    {
      time: 'Today, 3:00 PM',
      title: 'Live Q&A: GST Registration',
      type: 'live',
      instructor: 'CA Rahul Sharma'
    },
    {
      time: 'Tomorrow, 11:00 AM',
      title: 'Workshop: SPICe+ Form Filling',
      type: 'workshop',
      instructor: 'CS Priya Patel'
    },
    {
      time: 'Friday, 4:00 PM',
      title: 'Office Hours: Compliance Queries',
      type: 'office-hours',
      instructor: 'Legal Team'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <Badge className="mb-3 bg-white/20 text-white border-white/30">
              P2: INCORPORATION & COMPLIANCE KIT
            </Badge>
            <h1 className="text-3xl font-bold mb-2">
              Master Indian Business Incorporation
            </h1>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Transform from legal novice to incorporation expert with India's most comprehensive 
              business setup course. Build bulletproof legal infrastructure in 30 days.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                30 Days • 92 Lessons
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                2,847 Enrolled
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certificate on Completion
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold mb-2">{overallProgress}%</div>
            <ProgressBar value={overallProgress} className="w-48 h-2 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Modules List */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedModule === module.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${module.status === 'locked' ? 'opacity-60' : ''}`}
                  onClick={() => module.status !== 'locked' && setSelectedModule(module.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        module.status === 'completed' ? 'bg-green-100' :
                        module.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{module.title}</h3>
                          {module.status === 'completed' && (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          )}
                          {module.status === 'locked' && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{module.days} Days</span>
                          <span>{module.lessons} Lessons</span>
                          {module.status !== 'locked' && (
                            <span>{module.progress}% Complete</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {module.status === 'current' && (
                      <Button size="sm" onClick={() => router.push('/incorporation-compliance/lessons/p2-lesson-1')}>
                        Continue
                      </Button>
                    )}
                    {module.status === 'completed' && (
                      <Button size="sm" variant="outline">Review</Button>
                    )}
                  </div>
                  {module.status !== 'locked' && module.progress > 0 && (
                    <div className="mt-3">
                      <ProgressBar value={module.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Current Module Details */}
          <Card>
            <CardHeader>
              <CardTitle>Current Module: Incorporation Foundations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Today's Focus</h4>
                      <p className="text-sm text-yellow-800">
                        Complete "Digital Prerequisites Setup" lesson to unlock GST Registration module
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="w-full"
                    onClick={() => router.push('/incorporation-compliance/lessons/p2-lesson-1')}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Resume Lesson
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resources
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingActivities.map((activity, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
                  <p className="text-xs text-gray-600">with {activity.instructor}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Access Templates Library
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="w-4 h-4 mr-2" />
                Compliance Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Join Study Group
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Set Learning Goals
              </Button>
            </CardContent>
          </Card>

          {/* Achievement Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Incorporation Expert</h4>
                    <p className="text-xs text-gray-600">Complete Module 1</p>
                  </div>
                </div>
                <ProgressBar value={60} className="h-2" />
                <p className="text-xs text-gray-600 text-center">
                  3 more lessons to unlock
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}