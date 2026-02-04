'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { logger } from '@/lib/logger';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Video,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  LogIn,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';

interface PublicSession {
  id: string;
  title: string;
  description: string;
  hostName: string;
  scheduledAt: string;
  durationMinutes: number;
  maxAttendees: number;
  registeredCount: number;
  topicTags: string[];
  status: string;
  recordingUrl?: string;
}

export default function SharedSessionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = params.token as string;
  const inviteToken = searchParams.get('invite');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<PublicSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotsAvailable, setSpotsAvailable] = useState(0);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/community/expert-sessions/share/${token}`);

      if (!response.ok) {
        if (response.status === 404) {
          setSession(null);
          return;
        }
        throw new Error('Failed to fetch session');
      }

      const data = await response.json();
      setSession(data.session);
      setIsAuthenticated(data.isAuthenticated);
      setIsRegistered(data.isRegistered);
      setSpotsAvailable(data.spotsAvailable);
    } catch (err) {
      logger.error('Error fetching shared session:', err);
      setError('Failed to load session');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchSession();
    }
  }, [token, fetchSession]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/auth/login?returnUrl=${returnUrl}`);
      return;
    }

    setRegisterLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/community/expert-sessions/${session?.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setIsRegistered(true);
      setSpotsAvailable(prev => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setRegisterLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Video className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
          <Text>Loading session...</Text>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <Heading as="h2" variant="h4" className="mb-2">
              Session Not Found
            </Heading>
            <Text color="muted" className="mb-6">
              This session doesn&apos;t exist or has been cancelled.
            </Text>
            <Link href="/community/expert-sessions">
              <Button variant="primary">
                Browse All Sessions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isUpcoming = session.status === 'upcoming';
  const isCompleted = session.status === 'completed';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TIS</span>
            </div>
            <Text weight="medium">The Indian Startup</Text>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Session Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {/* Status Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={isUpcoming ? 'default' : isCompleted ? 'success' : 'warning'} size="lg">
                {session.status === 'upcoming' ? 'Upcoming Session' : session.status}
              </Badge>
              {inviteToken && (
                <Badge variant="outline">You were invited!</Badge>
              )}
            </div>

            {/* Title */}
            <Heading as="h1" variant="h2" className="mb-4">
              {session.title}
            </Heading>

            {/* Host */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {session.hostName.charAt(0)}
              </div>
              <div>
                <Text weight="medium">{session.hostName}</Text>
                <Text size="sm" color="muted">Session Host</Text>
              </div>
            </div>

            {/* Description */}
            {session.description && (
              <Text className="mb-6 leading-relaxed text-lg">
                {session.description}
              </Text>
            )}

            {/* Topics */}
            {session.topicTags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {session.topicTags.map(tag => (
                  <Badge key={tag} variant="outline" size="lg">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <Text size="sm" color="muted">Date</Text>
                  <Text weight="medium">{formatDate(session.scheduledAt)}</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-600" />
                <div>
                  <Text size="sm" color="muted">Time</Text>
                  <Text weight="medium">{formatTime(session.scheduledAt)} ({session.durationMinutes} min)</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <Text size="sm" color="muted">Spots</Text>
                  <Text weight="medium">
                    {spotsAvailable > 0 ? `${spotsAvailable} available` : 'Session full'}
                  </Text>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <Text className="text-red-700">{error}</Text>
              </div>
            )}

            {/* Action */}
            {isUpcoming && (
              <div className="space-y-4">
                {isRegistered ? (
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <Heading as="h3" variant="h5" className="mb-2">
                      You&apos;re Registered!
                    </Heading>
                    <Text color="muted" className="mb-4">
                      We&apos;ll send you a reminder before the session starts.
                    </Text>
                    {isAuthenticated && (
                      <Link href={`/community/expert-sessions/${session.id}`}>
                        <Button variant="outline">
                          View Session Details
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : spotsAvailable > 0 ? (
                  <div className="text-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleRegister}
                      disabled={registerLoading}
                      className="min-w-[200px]"
                    >
                      {registerLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Registering...
                        </>
                      ) : isAuthenticated ? (
                        'Register for Session'
                      ) : (
                        <>
                          <LogIn className="w-5 h-5 mr-2" />
                          Sign in to Register
                        </>
                      )}
                    </Button>

                    {!isAuthenticated && (
                      <div className="mt-4">
                        <Text size="sm" color="muted">
                          Don&apos;t have an account?{' '}
                          <Link
                            href={`/auth/signup?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`}
                            className="text-blue-600 hover:underline"
                          >
                            Sign up for free
                          </Link>
                        </Text>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <Heading as="h3" variant="h5" className="mb-2">
                      Session is Full
                    </Heading>
                    <Text color="muted">
                      This session has reached maximum capacity.
                    </Text>
                  </div>
                )}
              </div>
            )}

            {/* Recording for completed sessions */}
            {isCompleted && session.recordingUrl && (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <Video className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <Heading as="h3" variant="h5" className="mb-2">
                  Session Recording Available
                </Heading>
                <Text color="muted" className="mb-4">
                  This session has ended but you can watch the recording.
                </Text>
                {isAuthenticated ? (
                  <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary">
                      Watch Recording
                    </Button>
                  </a>
                ) : (
                  <Link href={`/auth/login?returnUrl=${encodeURIComponent(window.location.pathname)}`}>
                    <Button variant="primary">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign in to Watch
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <Heading as="h3" variant="h5" className="mb-3">
              Join The Indian Startup Community
            </Heading>
            <Text color="muted" className="mb-6 max-w-xl mx-auto">
              Connect with fellow founders, attend expert sessions, and access resources
              to help you build a successful startup in India.
            </Text>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signup">
                <Button variant="primary">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Free Account
                </Button>
              </Link>
              <Link href="/community/expert-sessions">
                <Button variant="outline">
                  Browse All Sessions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Text size="sm" color="muted">
            &copy; {new Date().getFullYear()} The Indian Startup. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
}
