'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Checkbox } from '@/components/ui/Input';
import {
  Shield,
  Smartphone,
  Key,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Copy,
  Monitor,
  Trash2,
  Clock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { PageBreadcrumbs } from '@/components/ui/Breadcrumbs';

interface TrustedDevice {
  id: string;
  deviceName: string;
  ipAddress: string;
  trustedAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

interface TwoFactorStatus {
  enabled: boolean;
  enabledAt: string | null;
  method: string | null;
  backupCodesRemaining: number;
  trustedDevices: TrustedDevice[];
}

function TwoFactorContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<TwoFactorStatus | null>(null);

  // Setup state
  const [setupMode, setSetupMode] = useState(false);
  const [setupData, setSetupData] = useState<{
    qrCodeUri: string;
    secret: string;
    backupCodes: string[];
  } | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [setupLoading, setSetupLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [backupCodesCopied, setBackupCodesCopied] = useState(false);

  // Disable state
  const [disableMode, setDisableMode] = useState(false);
  const [disableCode, setDisableCode] = useState('');
  const [disablePassword, setDisablePassword] = useState('');
  const [disableLoading, setDisableLoading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/2fa/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (error) {
      logger.error('Failed to fetch 2FA status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupStart = async () => {
    setSetupLoading(true);
    try {
      const res = await fetch('/api/user/2fa/setup', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to start 2FA setup');
        return;
      }

      setSetupData(data);
      setSetupMode(true);
    } catch (error) {
      toast.error('Failed to start 2FA setup');
    } finally {
      setSetupLoading(false);
    }
  };

  const handleVerifyAndEnable = async () => {
    if (verifyCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setSetupLoading(true);
    try {
      const res = await fetch('/api/user/2fa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifyCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to enable 2FA');
        return;
      }

      toast.success('Two-factor authentication enabled!');
      setSetupMode(false);
      setSetupData(null);
      setVerifyCode('');
      fetchStatus();
    } catch (error) {
      toast.error('Failed to enable 2FA');
    } finally {
      setSetupLoading(false);
    }
  };

  const handleDisable = async () => {
    if (disableCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    if (!disablePassword) {
      toast.error('Please enter your password');
      return;
    }

    setDisableLoading(true);
    try {
      const res = await fetch('/api/user/2fa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: disableCode, password: disablePassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to disable 2FA');
        return;
      }

      toast.success('Two-factor authentication disabled');
      setDisableMode(false);
      setDisableCode('');
      setDisablePassword('');
      fetchStatus();
    } catch (error) {
      toast.error('Failed to disable 2FA');
    } finally {
      setDisableLoading(false);
    }
  };

  const copyBackupCodes = () => {
    if (setupData?.backupCodes) {
      navigator.clipboard.writeText(setupData.backupCodes.join('\n'));
      setBackupCodesCopied(true);
      toast.success('Backup codes copied to clipboard');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          Two-Factor Authentication
        </Heading>
        <Text color="muted">
          Add an extra layer of security to your account
        </Text>
      </div>

      {/* Current Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Status</span>
            <Badge variant={status?.enabled ? 'success' : 'default'}>
              {status?.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status?.enabled ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <Text>Your account is protected with 2FA</Text>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Text color="muted">Method</Text>
                  <Text weight="medium" className="capitalize">
                    {status.method || 'Authenticator App'}
                  </Text>
                </div>
                <div>
                  <Text color="muted">Enabled</Text>
                  <Text weight="medium">
                    {status.enabledAt ? formatDate(status.enabledAt) : 'Unknown'}
                  </Text>
                </div>
                <div>
                  <Text color="muted">Backup Codes</Text>
                  <Text weight="medium" className={status.backupCodesRemaining <= 2 ? 'text-amber-600' : ''}>
                    {status.backupCodesRemaining} remaining
                  </Text>
                </div>
              </div>

              {status.backupCodesRemaining <= 2 && (
                <Alert variant="warning">
                  <AlertTriangle className="w-4 h-4" />
                  <span>You have few backup codes left. Consider regenerating them.</span>
                </Alert>
              )}

              <div className="pt-4 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDisableMode(true)}
                  disabled={disableMode}
                >
                  Disable 2FA
                </Button>
                <Button variant="ghost" onClick={handleSetupStart}>
                  Regenerate Codes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <Text weight="medium">2FA is not enabled</Text>
                  <Text size="sm" color="muted">
                    We recommend enabling two-factor authentication to protect your account.
                  </Text>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleSetupStart}
                isLoading={setupLoading}
              >
                <Shield className="w-4 h-4 mr-2" />
                Enable 2FA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disable 2FA Form */}
      {disableMode && (
        <Card className="mb-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Disable Two-Factor Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="warning" className="mb-4">
              Disabling 2FA will make your account less secure. Are you sure?
            </Alert>

            <div className="space-y-4">
              <div>
                <Text size="sm" weight="medium" className="mb-2">
                  Enter code from your authenticator app
                </Text>
                <Input
                  type="text"
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="font-mono text-center text-2xl tracking-widest"
                />
              </div>

              <div>
                <Text size="sm" weight="medium" className="mb-2">
                  Enter your password
                </Text>
                <Input
                  type="password"
                  value={disablePassword}
                  onChange={(e) => setDisablePassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDisableMode(false);
                    setDisableCode('');
                    setDisablePassword('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDisable}
                  isLoading={disableLoading}
                  disabled={disableCode.length !== 6 || !disablePassword}
                >
                  Disable 2FA
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setup Mode */}
      {setupMode && setupData && (
        <Card className="mb-6 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Smartphone className="w-5 h-5" />
              Set Up Authenticator App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step 1: QR Code */}
              <div>
                <Text weight="medium" className="mb-2">
                  Step 1: Scan QR Code
                </Text>
                <Text size="sm" color="muted" className="mb-4">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </Text>

                <div className="bg-white p-4 inline-block rounded-lg border">
                  {/* QR Code - using next/image with unoptimized for external dynamic URL */}
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.qrCodeUri)}`}
                    alt="2FA QR Code - Scan with your authenticator app"
                    width={192}
                    height={192}
                    className="w-48 h-48"
                    unoptimized
                  />
                </div>

                <div className="mt-4">
                  <Text size="sm" color="muted" className="mb-2">
                    Can't scan? Enter this code manually:
                  </Text>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">
                      {showSecret ? setupData.secret : '•'.repeat(setupData.secret.length)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(setupData.secret);
                        toast.success('Secret copied');
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Step 2: Backup Codes */}
              <div className="border-t pt-6">
                <Text weight="medium" className="mb-2">
                  Step 2: Save Backup Codes
                </Text>
                <Text size="sm" color="muted" className="mb-4">
                  Save these backup codes in a safe place. Each code can only be used once.
                </Text>

                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm grid grid-cols-2 gap-2">
                  {setupData.backupCodes.map((code, index) => (
                    <div key={index} className="bg-white px-3 py-2 rounded border">
                      {code}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={copyBackupCodes}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {backupCodesCopied ? 'Copied!' : 'Copy All Codes'}
                </Button>
              </div>

              {/* Step 3: Verify */}
              <div className="border-t pt-6">
                <Text weight="medium" className="mb-2">
                  Step 3: Verify Setup
                </Text>
                <Text size="sm" color="muted" className="mb-4">
                  Enter the 6-digit code from your authenticator app to complete setup.
                </Text>

                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="font-mono text-center text-2xl tracking-widest w-40"
                  />
                  <Button
                    variant="primary"
                    onClick={handleVerifyAndEnable}
                    isLoading={setupLoading}
                    disabled={verifyCode.length !== 6}
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSetupMode(false);
                    setSetupData(null);
                    setVerifyCode('');
                  }}
                >
                  Cancel Setup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trusted Devices */}
      {status?.enabled && status.trustedDevices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Trusted Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text size="sm" color="muted" className="mb-4">
              These devices won't be asked for 2FA codes for 30 days.
            </Text>

            <div className="space-y-3">
              {status.trustedDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <div>
                      <Text weight="medium">{device.deviceName}</Text>
                      <Text size="xs" color="muted">
                        {device.ipAddress} - Last used {formatDate(device.lastUsedAt)}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text size="xs" color="muted">
                      Expires {formatDate(device.expiresAt)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function TwoFactorPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TwoFactorContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
