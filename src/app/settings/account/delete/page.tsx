'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  AlertTriangle,
  ArrowLeft,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Shield,
  Database,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';

interface DeletionRequest {
  id: string;
  status: string;
  reason: string;
  scheduledDeletionAt: string;
  cancelledAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

const deletionReasons = [
  { value: 'not_using', label: 'I am no longer using the platform' },
  { value: 'found_alternative', label: 'I found an alternative solution' },
  { value: 'privacy_concerns', label: 'Privacy concerns' },
  { value: 'too_expensive', label: 'Too expensive' },
  { value: 'not_helpful', label: 'The content was not helpful' },
  { value: 'other', label: 'Other reason' },
];

function DeleteAccountContent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletionRequest, setDeletionRequest] = useState<DeletionRequest | null>(null);

  // Form state
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    fetchDeletionStatus();
  }, []);

  const fetchDeletionStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/delete');
      if (res.ok) {
        const data = await res.json();
        setDeletionRequest(data.deletionRequest);
      }
    } catch (error) {
      logger.error('Failed to fetch deletion status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestDeletion = async () => {
    if (!reason) {
      toast.error('Please select a reason for deletion');
      return;
    }

    if (confirmEmail.toLowerCase() !== user?.email?.toLowerCase()) {
      toast.error('Email confirmation does not match');
      return;
    }

    if (confirmText !== 'DELETE MY ACCOUNT') {
      toast.error('Please type the confirmation text exactly');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          additionalFeedback,
          confirmEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to request deletion');
      }

      toast.success(data.message);
      fetchDeletionStatus();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to request deletion');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelDeletion = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel deletion');
      }

      toast.success(data.message);
      setDeletionRequest(null);
      setStep(1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cancel deletion');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  // Show pending deletion status
  if (deletionRequest && ['pending', 'scheduled'].includes(deletionRequest.status)) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push('/settings')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
        </div>

        <Card className="border-amber-300 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Clock className="w-5 h-5" />
              Account Deletion Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-amber-800 mb-4">
              Your account is scheduled for deletion on{' '}
              <strong>{formatDate(deletionRequest.scheduledDeletionAt)}</strong>.
            </Text>

            <Text size="sm" className="text-amber-700 mb-6">
              You can cancel this request anytime before the scheduled date. After deletion,
              all your data will be permanently removed and cannot be recovered.
            </Text>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-amber-200">
                <Text weight="medium" className="mb-2">What will be deleted:</Text>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>- Your profile and settings</li>
                  <li>- Your startup portfolio</li>
                  <li>- Your progress and achievements</li>
                  <li>- Your community posts</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-amber-200">
                <Text weight="medium" className="mb-2">What will be preserved (anonymized):</Text>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>- Purchase history (for financial records)</li>
                  <li>- Refund records (for compliance)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                variant="primary"
                onClick={handleCancelDeletion}
                disabled={submitting}
              >
                {submitting ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                Cancel Deletion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/settings')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
      </div>

      <div className="mb-8">
        <Heading as="h1" className="mb-2 text-red-600 flex items-center gap-2">
          <Trash2 className="w-6 h-6" />
          Delete Account
        </Heading>
        <Text color="muted">
          Permanently delete your account and all associated data
        </Text>
      </div>

      {/* Warning Card */}
      <Card className="mb-6 border-red-300 bg-red-50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="bold" className="text-red-800">This action is irreversible</Text>
              <Text size="sm" className="text-red-700 mt-1">
                Deleting your account will permanently remove all your data, including your
                profile, portfolio, progress, and community posts. You will have a 7-day
                grace period to cancel this request.
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Reason Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Why are you leaving?</CardTitle>
          </CardHeader>
          <CardContent>
            <Text size="sm" color="muted" className="mb-4">
              Your feedback helps us improve the platform for other founders.
            </Text>

            <div className="space-y-3">
              {deletionReasons.map((r) => (
                <label
                  key={r.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    reason === r.value
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.value}
                    checked={reason === r.value}
                    onChange={(e) => setReason(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      reason === r.value ? 'border-black' : 'border-gray-300'
                    }`}
                  >
                    {reason === r.value && (
                      <div className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </div>
                  <Text>{r.label}</Text>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <Text size="sm" weight="medium" className="mb-2">
                Additional feedback (optional)
              </Text>
              <textarea
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none"
                rows={3}
                maxLength={1000}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                disabled={!reason}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Data Information */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Your Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text size="sm" color="muted" className="mb-4">
              The following data will be affected when you delete your account:
            </Text>

            <div className="space-y-4 mb-6">
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <Text weight="medium" className="text-red-800 mb-2">Will be permanently deleted:</Text>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>- Profile information (name, phone, bio, links)</li>
                  <li>- Startup portfolio and all sections</li>
                  <li>- Course progress and XP/badges</li>
                  <li>- Community posts and comments</li>
                  <li>- Saved settings and preferences</li>
                </ul>
              </div>

              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <Text weight="medium" className="text-blue-800 mb-2">Will be preserved (anonymized):</Text>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>- Purchase transactions (required for tax records)</li>
                  <li>- Refund history (required for compliance)</li>
                </ul>
              </div>

              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <Text weight="medium" className="text-green-800">7-Day Grace Period</Text>
                </div>
                <Text size="sm" className="text-green-700">
                  You can cancel your deletion request within 7 days. Simply log in
                  and click cancel to restore your account.
                </Text>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="outline" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Confirm Account Deletion</CardTitle>
          </CardHeader>
          <CardContent>
            <Text size="sm" color="muted" className="mb-6">
              To confirm deletion, please verify your identity and type the confirmation text below.
            </Text>

            <div className="space-y-4">
              <div>
                <Text size="sm" weight="medium" className="mb-2">
                  Enter your email address
                </Text>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder={user?.email || 'your@email.com'}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <Text size="sm" weight="medium" className="mb-2">
                  Type <span className="font-mono bg-gray-100 px-1">DELETE MY ACCOUNT</span> to confirm
                </Text>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
                  className="w-full p-3 border border-gray-200 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="primary"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleRequestDeletion}
                disabled={
                  submitting ||
                  confirmEmail.toLowerCase() !== user?.email?.toLowerCase() ||
                  confirmText !== 'DELETE MY ACCOUNT'
                }
              >
                {submitting ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Delete My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function DeleteAccountPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DeleteAccountContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
