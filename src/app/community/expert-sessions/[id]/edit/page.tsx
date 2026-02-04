'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { logger } from '@/lib/logger';
import {
  ArrowLeft,
  Video,
  Calendar,
  Clock,
  Users,
  Link as LinkIcon,
  Plus,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

interface SessionData {
  id: string;
  title: string;
  description: string;
  scheduledAt: string;
  durationMinutes: number;
  maxAttendees: number;
  meetingUrl: string;
  topicTags: string[];
  status: string;
  hostId: string;
}

export default function EditSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [session, setSession] = useState<SessionData | null>(null);
  const [isHost, setIsHost] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [maxAttendees, setMaxAttendees] = useState('50');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState('upcoming');

  const fetchSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/community/expert-sessions/${sessionId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch session');
      }

      if (!data.isHost) {
        setError('Only the host can edit this session');
        setIsHost(false);
        return;
      }

      setIsHost(true);
      setSession(data.session);

      // Populate form fields
      const s = data.session;
      setTitle(s.title || '');
      setDescription(s.description || '');
      setDuration(String(s.durationMinutes || 60));
      setMaxAttendees(String(s.maxAttendees || 50));
      setMeetingUrl(s.meetingUrl || '');
      setTags(s.topicTags || []);
      setStatus(s.status || 'upcoming');

      // Parse scheduled date/time
      if (s.scheduledAt) {
        const date = new Date(s.scheduledAt);
        setScheduledDate(date.toISOString().split('T')[0]);
        setScheduledTime(date.toTimeString().slice(0, 5));
      }
    } catch (err) {
      logger.error('Error fetching session:', err);
      setError(err instanceof Error ? err.message : 'Failed to load session');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId, fetchSession]);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      // Combine date and time
      const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      const response = await fetch(`/api/community/expert-sessions/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          topicTags: tags,
          scheduledAt,
          durationMinutes: parseInt(duration),
          maxAttendees: parseInt(maxAttendees),
          meetingUrl: meetingUrl.trim() || null,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update session');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/community/expert-sessions/${sessionId}`);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this session? This action cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`/api/community/expert-sessions/${sessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel session');
      }

      router.push('/community/expert-sessions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel session');
      setSaving(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <Text color="muted">Loading session...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!isHost || !session) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="max-w-2xl mx-auto p-8">
            <Card className="text-center">
              <CardContent className="p-12">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-4">
                  Access Denied
                </Heading>
                <Text color="muted" className="mb-6">
                  {error || 'Only the session host can edit this session.'}
                </Text>
                <Link href="/community/expert-sessions">
                  <Button variant="primary">
                    Back to Sessions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (success) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="max-w-2xl mx-auto p-8">
            <Card className="text-center">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <Heading as="h2" variant="h4" className="mb-4">
                  Session Updated!
                </Heading>
                <Text color="muted" className="mb-4">
                  Your changes have been saved successfully.
                </Text>
                <div className="animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  <Text size="sm" color="muted" className="mt-2">Redirecting...</Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-3xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push(`/community/expert-sessions/${sessionId}`)}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Session
            </Button>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Edit Session
                </Heading>
                <Text color="muted">
                  Update your expert session details
                </Text>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <Text className="text-red-700">{error}</Text>
                  </div>
                )}

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Session Title *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., How I Raised My Seed Round in 30 Days"
                    required
                    maxLength={100}
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    {title.length}/100 characters
                  </Text>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what attendees will learn from this session..."
                    rows={4}
                    maxLength={1000}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    {description.length}/1000 characters
                  </Text>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date *
                    </label>
                    <Input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={today}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Time *
                    </label>
                    <Input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Duration and Attendees */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes (1 hour)</option>
                      <option value="90">90 minutes</option>
                      <option value="120">120 minutes (2 hours)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Max Attendees
                    </label>
                    <select
                      value={maxAttendees}
                      onChange={(e) => setMaxAttendees(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="10">10 attendees</option>
                      <option value="25">25 attendees</option>
                      <option value="50">50 attendees</option>
                      <option value="100">100 attendees</option>
                      <option value="200">200 attendees</option>
                    </select>
                  </div>
                </div>

                {/* Meeting URL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <LinkIcon className="w-4 h-4 inline mr-1" />
                    Meeting URL
                  </label>
                  <Input
                    type="url"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    placeholder="https://meet.google.com/... or https://zoom.us/..."
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    Add your Google Meet, Zoom, or other meeting link
                  </Text>
                </div>

                {/* Topic Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topic Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="e.g., fundraising, marketing"
                      maxLength={30}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={tags.length >= 5}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Text size="xs" color="muted" className="mt-1">
                    Up to 5 tags to help attendees find your session
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={saving || !title || !scheduledDate || !scheduledTime}
                    className="flex-1"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/community/expert-sessions/${sessionId}`)}
                  >
                    Cancel
                  </Button>
                </div>

                {/* Danger Zone */}
                <div className="pt-6 border-t border-red-200">
                  <Text weight="medium" className="text-red-700 mb-3">Danger Zone</Text>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={saving}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancel Session
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
