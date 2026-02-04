'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Plus,
  X,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function CreateSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ shareUrl: string; id: string } | null>(null);

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
    setLoading(true);

    try {
      // Combine date and time
      const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      const response = await fetch('/api/community/expert-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          topicTags: tags,
          scheduledAt,
          durationMinutes: parseInt(duration),
          maxAttendees: parseInt(maxAttendees),
          meetingUrl: meetingUrl.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create session');
      }

      setSuccess({
        shareUrl: data.session.shareUrl,
        id: data.session.id,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

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
                  Session Created!
                </Heading>
                <Text color="muted" className="mb-8">
                  Your expert session has been created successfully. Share the link below to invite attendees.
                </Text>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <Text size="sm" color="muted" className="mb-2">Share Link:</Text>
                  <div className="flex gap-2">
                    <Input
                      value={success.shareUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(success.shareUrl);
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link href={`/community/expert-sessions/${success.id}`}>
                    <Button variant="primary">
                      View Session
                    </Button>
                  </Link>
                  <Link href="/community/expert-sessions">
                    <Button variant="outline">
                      All Sessions
                    </Button>
                  </Link>
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
              onClick={() => router.push('/community/expert-sessions')}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sessions
            </Button>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Host an Expert Session
                </Heading>
                <Text color="muted">
                  Share your expertise with fellow founders
                </Text>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <Text weight="medium" className="mb-1">Hosting Requirements</Text>
                  <Text size="sm" color="muted">
                    To host expert sessions, you must have purchased at least one course on the platform.
                    This ensures quality content from experienced founders.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    Add your Google Meet, Zoom, or other meeting link (can be added later)
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

                {/* Submit */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || !title || !scheduledDate || !scheduledTime}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Session'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/community/expert-sessions')}
                  >
                    Cancel
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
