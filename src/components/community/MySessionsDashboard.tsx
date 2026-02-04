'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Plus,
  ChevronRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Session {
  id: string;
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  maxAttendees: number;
  registeredCount: number;
  status: string;
  hostId: string;
}

interface MySessionsDashboardProps {
  userId: string;
}

export function MySessionsDashboard({ userId }: MySessionsDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [hostingSessions, setHostingSessions] = useState<Session[]>([]);
  const [attendingSessions, setAttendingSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchMySessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchMySessions = async () => {
    try {
      setLoading(true);

      // Fetch sessions I'm hosting
      const hostingResponse = await fetch(`/api/community/expert-sessions?hostId=${userId}&status=upcoming`);
      if (hostingResponse.ok) {
        const data = await hostingResponse.json();
        setHostingSessions(data.sessions || []);
      }

      // Fetch sessions I'm registered for (attending)
      const attendingResponse = await fetch('/api/community/expert-sessions/my-registrations?status=upcoming&limit=5');
      if (attendingResponse.ok) {
        const data = await attendingResponse.json();
        // Filter out sessions I'm hosting (to avoid duplication)
        setAttendingSessions(
          (data.sessions || []).filter((s: Session) => s.hostId !== userId)
        );
      }
    } catch (error) {
      logger.error('Error fetching my sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-gray-400 mx-auto animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sessions I'm Hosting */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-orange-600" />
              Sessions You&apos;re Hosting
            </CardTitle>
            <Link href="/community/expert-sessions/new">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Host New
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {hostingSessions.length > 0 ? (
            <div className="space-y-3">
              {hostingSessions.map(session => (
                <Link
                  key={session.id}
                  href={`/community/expert-sessions/${session.id}`}
                  className="block"
                >
                  <div className="p-4 border rounded-lg hover:border-black hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Text weight="medium" className="line-clamp-1">
                            {session.title}
                          </Text>
                          <Badge variant="outline" size="sm">
                            {session.registeredCount}/{session.maxAttendees}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(session.scheduledAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.durationMinutes}m
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Video className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <Text color="muted" className="mb-3">
                You haven&apos;t hosted any sessions yet
              </Text>
              <Link href="/community/expert-sessions/new">
                <Button variant="outline" size="sm">
                  Host Your First Session
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sessions I'm Attending */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Sessions You&apos;re Attending
            </CardTitle>
            <Link href="/community/expert-sessions">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {attendingSessions.length > 0 ? (
            <div className="space-y-3">
              {attendingSessions.map(session => (
                <Link
                  key={session.id}
                  href={`/community/expert-sessions/${session.id}`}
                  className="block"
                >
                  <div className="p-4 border rounded-lg hover:border-black hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Text weight="medium" className="mb-1 line-clamp-1">
                          {session.title}
                        </Text>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(session.scheduledAt)}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <Text color="muted" className="mb-3">
                No upcoming sessions registered
              </Text>
              <Link href="/community/expert-sessions">
                <Button variant="outline" size="sm">
                  Browse Sessions
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
