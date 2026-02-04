'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft,
  Video,
  Calendar,
  Clock,
  Users,
  Link as LinkIcon,
  Copy,
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Share2,
  Play
} from 'lucide-react';
import Link from 'next/link';

interface SessionDetails {
  id: string;
  title: string;
  description: string;
  hostId: string;
  hostName: string;
  scheduledAt: string;
  durationMinutes: number;
  maxAttendees: number;
  registeredCount: number;
  topicTags: string[];
  status: string;
  meetingUrl?: string;
  recordingUrl?: string;
  shareToken: string;
}

interface Registration {
  userId: string;
  userName: string;
  registeredAt: string;
}

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionDetails | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/community/expert-sessions/${sessionId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setSession(null);
          return;
        }
        throw new Error('Failed to fetch session');
      }

      const data = await response.json();
      setSession(data.session);
      setIsRegistered(data.isRegistered);
      setIsHost(data.isHost);
      setRegistrations(data.registrations || []);
    } catch (err) {
      logger.error('Error fetching session:', err);
      setError('Failed to load session');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId, fetchSession]);

  const handleRegister = async () => {
    setRegisterLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/community/expert-sessions/${sessionId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setIsRegistered(true);
      fetchSession(); // Refresh to get updated count
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleUnregister = async () => {
    setRegisterLoading(true);

    try {
      const response = await fetch(`/api/community/expert-sessions/${sessionId}/register`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to unregister');
      }

      setIsRegistered(false);
      fetchSession();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unregistration failed');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleSendInvite = async () => {
    if (!inviteEmail || !inviteEmail.includes('@')) return;

    setInviteLoading(true);
    setError(null);
    setInviteSuccess(null);

    try {
      const response = await fetch(`/api/community/expert-sessions/${sessionId}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invite');
      }

      setInviteSuccess(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invite');
    } finally {
      setInviteLoading(false);
    }
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/community/expert-sessions/share/${session?.shareToken}`;
    navigator.clipboard.writeText(shareUrl);
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
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading session...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!session) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-2">
                  Session Not Found
                </Heading>
                <Text color="muted" className="mb-6">
                  This session doesn&apos;t exist or has been cancelled.
                </Text>
                <Button variant="primary" onClick={() => router.push('/community/expert-sessions')}>
                  Back to Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const spotsLeft = session.maxAttendees - session.registeredCount;
  const isUpcoming = session.status === 'upcoming';
  const isCompleted = session.status === 'completed';

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push('/community/expert-sessions')}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sessions
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Session Header */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={isUpcoming ? 'default' : isCompleted ? 'success' : 'warning'}>
                          {session.status}
                        </Badge>
                        {isHost && (
                          <Badge variant="outline">You&apos;re hosting</Badge>
                        )}
                      </div>
                      <Heading as="h1" variant="h3" className="mb-2">
                        {session.title}
                      </Heading>
                      <Text color="muted">
                        Hosted by {session.hostName}
                      </Text>
                    </div>
                  </div>

                  {session.description && (
                    <Text className="mb-6 leading-relaxed">
                      {session.description}
                    </Text>
                  )}

                  {/* Topics */}
                  {session.topicTags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {session.topicTags.map(tag => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Session Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <Text weight="medium">Date</Text>
                        <Text color="muted">{formatDate(session.scheduledAt)}</Text>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <Text weight="medium">Time</Text>
                        <Text color="muted">{formatTime(session.scheduledAt)} ({session.durationMinutes} min)</Text>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <Text weight="medium">Capacity</Text>
                        <Text color="muted">
                          {session.registeredCount} / {session.maxAttendees} registered
                          {spotsLeft <= 5 && spotsLeft > 0 && (
                            <span className="text-orange-600 ml-2">({spotsLeft} spots left!)</span>
                          )}
                        </Text>
                      </div>
                    </div>
                    {session.meetingUrl && (isHost || isRegistered) && (
                      <div className="flex items-start gap-3">
                        <LinkIcon className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <Text weight="medium">Meeting Link</Text>
                          <a
                            href={session.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Join Session <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recording (if completed) */}
              {isCompleted && session.recordingUrl && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Play className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <Text weight="medium">Session Recording Available</Text>
                        <Text size="sm" color="muted">
                          Watch the recorded session at your convenience
                        </Text>
                      </div>
                      <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">
                          Watch Recording
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Host: Attendee List */}
              {isHost && registrations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Registered Attendees ({registrations.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {registrations.map(reg => (
                        <div key={reg.userId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {reg.userName.charAt(0)}
                          </div>
                          <div>
                            <Text weight="medium">{reg.userName}</Text>
                            <Text size="xs" color="muted">
                              Registered {new Date(reg.registeredAt).toLocaleDateString()}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              {isUpcoming && !isHost && (
                <Card>
                  <CardHeader>
                    <CardTitle>Registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                        <Text size="sm" className="text-red-700">{error}</Text>
                      </div>
                    )}

                    {isRegistered ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            <Text weight="medium">You&apos;re registered!</Text>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleUnregister}
                          disabled={registerLoading}
                          className="w-full"
                        >
                          {registerLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Cancel Registration'
                          )}
                        </Button>
                      </div>
                    ) : spotsLeft > 0 ? (
                      <Button
                        variant="primary"
                        onClick={handleRegister}
                        disabled={registerLoading}
                        className="w-full"
                      >
                        {registerLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          'Register Now'
                        )}
                      </Button>
                    ) : (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                        <AlertCircle className="w-5 h-5 text-gray-500 mx-auto mb-2" />
                        <Text color="muted">This session is full</Text>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Share & Invite */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share & Invite
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Copy Link */}
                  <div>
                    <Text size="sm" weight="medium" className="mb-2">Share Link</Text>
                    <Button
                      variant="outline"
                      onClick={copyShareLink}
                      className="w-full justify-center"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Shareable Link
                    </Button>
                  </div>

                  {/* Email Invite */}
                  <div>
                    <Text size="sm" weight="medium" className="mb-2">Invite by Email</Text>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="friend@email.com"
                      />
                      <Button
                        variant="primary"
                        onClick={handleSendInvite}
                        disabled={inviteLoading || !inviteEmail}
                      >
                        {inviteLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Mail className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {inviteSuccess && (
                      <Text size="xs" className="text-green-600 mt-2">{inviteSuccess}</Text>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Host Actions */}
              {isHost && (
                <Card>
                  <CardHeader>
                    <CardTitle>Host Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href={`/community/expert-sessions/${sessionId}/edit`}>
                      <Button variant="outline" className="w-full">
                        Edit Session
                      </Button>
                    </Link>
                    {!session.meetingUrl && (
                      <Text size="xs" color="muted" className="text-center">
                        Don&apos;t forget to add a meeting link!
                      </Text>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
