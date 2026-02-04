'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft,
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  CheckCircle,
  AlertCircle,
  Star,
  Loader2,
  BookOpen,
  TrendingUp,
  Zap,
  Target,
  Plus
} from 'lucide-react';
import Link from 'next/link';

interface ExpertSession {
  id: string;
  title: string;
  description: string;
  expertName: string;
  expertBio: string;
  expertImage?: string;
  scheduledAt: string;
  duration: number;
  maxAttendees: number;
  registeredCount: number;
  topic: string[];
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  meetingUrl?: string;
  recordingUrl?: string;
  isRegistered?: boolean;
}

export default function ExpertSessionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<ExpertSession[]>([]);
  const [filter, setFilter] = useState('upcoming'); // upcoming, completed, all

  const fetchExpertSessions = useCallback(async () => {
    try {
      setLoading(true);

      // Build query params for API
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.set('status', filter);
      }

      // Fetch real data from API
      const response = await fetch(`/api/community/expert-sessions?${params}`);

      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      } else {
        // API not available yet, show empty state
        setSessions([]);
      }
    } catch (error) {
      logger.error('Error fetching expert sessions:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchExpertSessions();
  }, [fetchExpertSessions]);

  const handleRegister = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/community/expert-sessions/${sessionId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register');
      }

      // Update local state
      setSessions(sessions.map(session =>
        session.id === sessionId
          ? {
              ...session,
              isRegistered: true,
              registeredCount: session.registeredCount + 1
            }
          : session
      ));
    } catch (error) {
      logger.error('Registration error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }),
    };
  };

  const getTopicColor = (topic: string) => {
    const colors = {
      'fundraising': 'bg-green-100 text-green-700',
      'investment': 'bg-green-100 text-green-700',
      'product': 'bg-blue-100 text-blue-700',
      'mvp': 'bg-blue-100 text-blue-700',
      'marketing': 'bg-purple-100 text-purple-700',
      'growth': 'bg-purple-100 text-purple-700',
      'legal': 'bg-red-100 text-red-700',
      'compliance': 'bg-red-100 text-red-700',
      'default': 'bg-gray-100 text-gray-700',
    };
    return colors[topic as keyof typeof colors] || colors.default;
  };

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading expert sessions...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/community')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Community
              </Button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Video className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <Heading as="h1" className="mb-1">
                    Expert Office Hours
                  </Heading>
                  <Text className="text-gray-600">
                    Learn from industry experts and successful entrepreneurs
                  </Text>
                </div>
              </div>
              <Link href="/community/expert-sessions/new">
                <Button variant="primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Host a Session
                </Button>
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-200 mb-6">
              {[
                { id: 'upcoming', name: 'Upcoming', icon: Calendar },
                { id: 'completed', name: 'Completed', icon: Play },
                { id: 'all', name: 'All Sessions', icon: Video },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 border-b-2 transition-colors
                      ${filter === tab.id 
                        ? 'border-orange-500 text-orange-600 bg-orange-50' 
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            {filter === 'upcoming' && (
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <Video className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <Text className="font-heading text-xl font-bold text-orange-600">
                      {sessions.filter(s => s.status === 'upcoming').length}
                    </Text>
                    <Text size="sm" color="muted">Upcoming Sessions</Text>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <Text className="font-heading text-xl font-bold text-blue-600">
                      {sessions.reduce((sum, s) => sum + s.registeredCount, 0)}
                    </Text>
                    <Text size="sm" color="muted">Total Registrations</Text>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <Star className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <Text className="font-heading text-xl font-bold text-green-600">
                      Live
                    </Text>
                    <Text size="sm" color="muted">Expert Sessions</Text>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sessions Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {sessions.map((session) => {
              const { date, time } = formatDate(session.scheduledAt);
              const isUpcoming = session.status === 'upcoming';
              const isCompleted = session.status === 'completed';
              const spotsLeft = session.maxAttendees - session.registeredCount;

              return (
                <Card key={session.id} className={`
                  hover:shadow-lg transition-all
                  ${session.isRegistered ? 'ring-2 ring-green-200 bg-green-50' : ''}
                `}>
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Heading as="h3" variant="h5" className="mb-2 line-clamp-2">
                          {session.title}
                        </Heading>
                        <Text size="sm" color="muted" className="mb-3">
                          with {session.expertName}
                        </Text>
                      </div>
                      
                      {isUpcoming && (
                        <Badge 
                          variant={spotsLeft > 0 ? "default" : "warning"}
                          className="ml-4"
                        >
                          {session.registeredCount}/{session.maxAttendees}
                        </Badge>
                      )}
                      
                      {isCompleted && (
                        <Badge variant="success" className="ml-4">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>

                    {/* Expert Info */}
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {session.expertName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <Text weight="medium" size="sm">{session.expertName}</Text>
                        <Text size="xs" color="muted" className="line-clamp-1">
                          {session.expertBio}
                        </Text>
                      </div>
                    </div>

                    {/* Description */}
                    <Text size="sm" className="mb-4 line-clamp-3">
                      {session.description}
                    </Text>

                    {/* Topics */}
                    <div className="flex gap-1 flex-wrap mb-4">
                      {session.topic.map((topic) => (
                        <span
                          key={topic}
                          className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${getTopicColor(topic)}
                          `}
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>

                    {/* Session Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <Text size="sm" weight="medium">{date}</Text>
                          <Text size="xs" color="muted">{time}</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <Text size="sm" weight="medium">{session.duration} minutes</Text>
                          <Text size="xs" color="muted">Duration</Text>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {isUpcoming && (
                        <>
                          {session.isRegistered ? (
                            <Link href={`/community/expert-sessions/${session.id}`} className="flex-1">
                              <Button variant="secondary" className="w-full">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </Link>
                          ) : spotsLeft > 0 ? (
                            <Button
                              variant="primary"
                              className="flex-1"
                              onClick={() => handleRegister(session.id)}
                            >
                              Register Now
                            </Button>
                          ) : (
                            <Button variant="outline" className="flex-1" disabled>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Full
                            </Button>
                          )}

                          <Link href={`/community/expert-sessions/${session.id}`}>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </Link>
                        </>
                      )}

                      {isCompleted && (
                        <>
                          <Link href={`/community/expert-sessions/${session.id}`} className="flex-1">
                            <Button variant="primary" className="w-full">
                              <Play className="w-4 h-4 mr-2" />
                              View Recording
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Spots Warning */}
                    {isUpcoming && spotsLeft > 0 && spotsLeft <= 5 && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Text size="xs" className="text-yellow-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Only {spotsLeft} spots left!
                        </Text>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {sessions.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h3" variant="h5" className="mb-2">
                  No {filter === 'all' ? '' : filter} sessions available
                </Heading>
                <Text color="muted" className="mb-6">
                  {filter === 'upcoming' 
                    ? 'Check back soon for new expert sessions!'
                    : 'No sessions found for the selected filter.'
                  }
                </Text>
                {filter !== 'upcoming' && (
                  <Button variant="outline" onClick={() => setFilter('upcoming')}>
                    View Upcoming Sessions
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Benefits Section */}
          <Card className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Video className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <Heading as="h3" variant="h4" className="mb-2">
                  Why Attend Expert Sessions?
                </Heading>
                <Text className="max-w-2xl mx-auto">
                  Get direct access to industry experts and learn from their real-world experience
                </Text>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <Text weight="medium" className="mb-1">Learn Best Practices</Text>
                  <Text size="sm" color="muted">
                    Get proven strategies and frameworks from successful entrepreneurs
                  </Text>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <Text weight="medium" className="mb-1">Ask Direct Questions</Text>
                  <Text size="sm" color="muted">
                    Get personalized advice for your specific challenges and goals
                  </Text>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <Text weight="medium" className="mb-1">Network with Peers</Text>
                  <Text size="sm" color="muted">
                    Connect with other founders facing similar challenges
                  </Text>
                </div>
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <Text weight="medium" className="mb-1">Access Recordings</Text>
                  <Text size="sm" color="muted">
                    All sessions are recorded for future reference and learning
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}