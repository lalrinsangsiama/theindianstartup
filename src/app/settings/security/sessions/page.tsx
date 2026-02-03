'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  ArrowLeft,
  RefreshCw,
  Trash2,
  LogOut,
  Shield,
  MapPin,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { formatDistanceToNow } from 'date-fns';
import { PageBreadcrumbs } from '@/components/ui/Breadcrumbs';

interface Session {
  id: string;
  deviceName: string;
  deviceFingerprint: string;
  ipAddress: string;
  userAgent: string;
  trustedAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

function getDeviceIcon(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (ua.includes('iphone') || ua.includes('android') && ua.includes('mobile')) {
    return Smartphone;
  }
  if (ua.includes('ipad') || ua.includes('tablet')) {
    return Tablet;
  }
  return Monitor;
}

function parseLocation(ipAddress: string): string {
  // In a real app, you'd use a GeoIP service
  // For now, just show the IP
  if (ipAddress === 'unknown') return 'Unknown location';
  return ipAddress;
}

function ActiveSessionsContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentDevice, setCurrentDevice] = useState<{ userAgent: string; ipAddress: string } | null>(null);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [signingOutAll, setSigningOutAll] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
        setCurrentDevice(data.currentDevice);
      }
    } catch (error) {
      logger.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevokeSession = async (sessionId: string) => {
    setRevoking(sessionId);
    try {
      const res = await fetch(`/api/user/sessions?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Session revoked');
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to revoke session');
      }
    } catch (error) {
      toast.error('Failed to revoke session');
    } finally {
      setRevoking(null);
    }
  };

  const handleSignOutAll = async () => {
    if (!confirm('Are you sure you want to sign out from all devices? You will need to log in again on each device.')) {
      return;
    }

    setSigningOutAll(true);
    try {
      const res = await fetch('/api/user/sessions?all=true', {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Signed out from all devices');
        setSessions([]);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to sign out');
      }
    } catch (error) {
      toast.error('Failed to sign out from all devices');
    } finally {
      setSigningOutAll(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageBreadcrumbs />

      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/settings')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
      </div>

      <div className="mb-8">
        <Heading as="h1" className="mb-2 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Active Sessions
        </Heading>
        <Text color="muted">
          Manage devices that have access to your account
        </Text>
      </div>

      {/* Security Info */}
      <Alert variant="info" className="mb-6">
        <div className="flex items-start gap-2">
          <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <Text size="sm" weight="medium">About Active Sessions</Text>
            <Text size="sm" color="muted">
              These are devices that have been trusted for 2FA bypass. Revoking a session will
              require 2FA verification on that device next time.
            </Text>
          </div>
        </div>
      </Alert>

      {/* Sign Out All */}
      {sessions.length > 1 && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleSignOutAll}
            disabled={signingOutAll}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            {signingOutAll ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4 mr-2" />
            )}
            Sign out from all devices
          </Button>
        </div>
      )}

      {/* Sessions List */}
      <Card>
        <CardHeader>
          <CardTitle>Trusted Devices ({sessions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <Monitor className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <Text color="muted">No trusted devices</Text>
              <Text size="sm" color="muted" className="mt-1">
                When you enable 2FA and choose "Remember this device", it will appear here.
              </Text>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.userAgent);
                const isCurrentDevice = currentDevice?.ipAddress === session.ipAddress;

                return (
                  <div
                    key={session.id}
                    className={`flex items-start justify-between p-4 border rounded-lg ${
                      isCurrentDevice ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${isCurrentDevice ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <DeviceIcon className={`w-5 h-5 ${isCurrentDevice ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Text weight="medium">{session.deviceName}</Text>
                          {isCurrentDevice && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              Current device
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{parseLocation(session.ipAddress)}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>Last active {formatDate(session.lastUsedAt)}</span>
                        </div>
                        <Text size="xs" color="muted" className="mt-1">
                          Trusted {formatDate(session.trustedAt)} - Expires {formatDate(session.expiresAt)}
                        </Text>
                      </div>
                    </div>

                    {!isCurrentDevice && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        disabled={revoking === session.id}
                        className="text-red-600 hover:bg-red-50"
                      >
                        {revoking === session.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Security Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>Regularly review your active sessions and remove any you don't recognize</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>If you see a device you don't recognize, revoke it immediately and change your password</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>Use "Sign out from all devices" if you suspect your account has been compromised</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>Enable 2FA for maximum account security</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ActiveSessionsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ActiveSessionsContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
