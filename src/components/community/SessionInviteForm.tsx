'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Typography';
import { Mail, Copy, CheckCircle, Loader2, Share2 } from 'lucide-react';

interface SessionInviteFormProps {
  sessionId: string;
  shareToken: string;
}

export function SessionInviteForm({ sessionId, shareToken }: SessionInviteFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/community/expert-sessions/share/${shareToken}`
    : '';

  const handleSendInvite = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/community/expert-sessions/${sessionId}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invite');
      }

      setSuccess(`Invitation sent to ${email}`);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Invite Peers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Share Link */}
        <div>
          <Text size="sm" weight="medium" className="mb-2">
            Shareable Link
          </Text>
          <div className="flex gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="font-mono text-sm bg-gray-50"
            />
            <Button
              variant={copied ? 'primary' : 'outline'}
              onClick={copyLink}
            >
              {copied ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Text size="xs" color="muted" className="mt-1">
            Anyone with this link can view and register for your session
          </Text>
        </div>

        {/* Email Invite */}
        <div>
          <Text size="sm" weight="medium" className="mb-2">
            Send Email Invitation
          </Text>
          <div className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendInvite();
                }
              }}
            />
            <Button
              variant="primary"
              onClick={handleSendInvite}
              disabled={loading || !email}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
            </Button>
          </div>

          {error && (
            <Text size="xs" className="text-red-600 mt-2">{error}</Text>
          )}
          {success && (
            <Text size="xs" className="text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {success}
            </Text>
          )}
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Text size="xs" className="text-blue-700">
            Invitees will receive an email with a link to view and register for your session.
            They&apos;ll need to create an account to complete registration.
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}
