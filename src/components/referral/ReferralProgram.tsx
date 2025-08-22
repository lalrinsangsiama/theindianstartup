'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { 
  Gift, 
  Users, 
  Copy, 
  CheckCircle, 
  Share2,
  IndianRupee,
  UserPlus,
  TrendingUp,
  Mail
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';

interface ReferralData {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  successfulReferrals: number;
  pendingCredits: number;
  availableCredits: number;
  referralHistory: Array<{
    id: string;
    referredEmail: string;
    status: 'pending' | 'successful' | 'expired';
    createdAt: string;
    purchaseDate?: string;
    creditEarned?: number;
  }>;
}

export function ReferralProgram() {
  const { user } = useAuthContext();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/referral');
      if (response.ok) {
        const data = await response.json();
        setReferralData(data);
      }
    } catch (error) {
      logger.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sendInvite = async () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      setInviteMessage('Please enter a valid email address');
      return;
    }

    setInviting(true);
    setInviteMessage('');

    try {
      const response = await fetch('/api/referral/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setInviteMessage('Invitation sent successfully!');
        setInviteEmail('');
        fetchReferralData(); // Refresh data
      } else {
        setInviteMessage(data.error || 'Failed to send invitation');
      }
    } catch (error) {
      setInviteMessage('Failed to send invitation. Please try again.');
    } finally {
      setInviting(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  if (!referralData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <Badge size="sm" variant="outline">Total</Badge>
            </div>
            <Text className="text-2xl font-bold">{referralData.totalReferrals}</Text>
            <Text size="sm" color="muted">Referrals Made</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Badge size="sm" className="bg-green-100 text-green-700">Success</Badge>
            </div>
            <Text className="text-2xl font-bold">{referralData.successfulReferrals}</Text>
            <Text size="sm" color="muted">Successful</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <IndianRupee className="w-5 h-5 text-orange-600" />
              <Badge size="sm" className="bg-orange-100 text-orange-700">Pending</Badge>
            </div>
            <Text className="text-2xl font-bold">₹{referralData.pendingCredits}</Text>
            <Text size="sm" color="muted">Pending Credits</Text>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-5 h-5 text-green-600" />
              <Badge size="sm" className="bg-green-600 text-white">Available</Badge>
            </div>
            <Text className="text-2xl font-bold text-green-700">₹{referralData.availableCredits}</Text>
            <Text size="sm" color="muted">Available Credits</Text>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Text size="sm" color="muted" className="mb-2">
                Share this link with friends to earn ₹500 credit for each successful referral
              </Text>
              <div className="flex gap-2">
                <Input
                  value={referralData.referralLink}
                  readOnly
                  className="flex-1 bg-gray-50"
                />
                <Button
                  variant="outline"
                  onClick={copyReferralLink}
                  className="min-w-[100px]"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Text size="sm" weight="medium">Share on:</Text>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const text = `Join me on The Indian Startup! Get expert guidance to build your startup with step-by-step courses. Use my referral link: ${referralData.referralLink}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const text = `Building a startup? Check out @theindianstartup - comprehensive courses for Indian founders! 🚀`;
                    const url = referralData.referralLink;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                  }}
                >
                  Twitter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const url = referralData.referralLink;
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                  }}
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Invite Section */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Friends via Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="friend@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendInvite()}
              />
              <Button
                onClick={sendInvite}
                disabled={inviting}
              >
                {inviting ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invite
                  </>
                )}
              </Button>
            </div>
            {inviteMessage && (
              <Alert variant={inviteMessage.includes('success') ? 'success' : 'error'}>
                {inviteMessage}
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      {referralData.referralHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referralData.referralHistory.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Text weight="medium">{referral.referredEmail}</Text>
                    <Text size="sm" color="muted">
                      Invited on {new Date(referral.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                  <div className="text-right">
                    {referral.status === 'successful' ? (
                      <>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Successful
                        </Badge>
                        <Text size="sm" className="text-green-600 font-medium mt-1">
                          +₹{referral.creditEarned}
                        </Text>
                      </>
                    ) : referral.status === 'pending' ? (
                      <Badge variant="outline">
                        Pending Purchase
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        Expired
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* How It Works */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <Heading as="h3" variant="h5" className="mb-4">
            How the Referral Program Works
          </Heading>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <Text weight="medium" className="mb-1">1. Share Your Link</Text>
              <Text size="sm" color="muted">
                Share your unique referral link with friends and colleagues
              </Text>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <Text weight="medium" className="mb-1">2. They Sign Up & Purchase</Text>
              <Text size="sm" color="muted">
                When they sign up using your link and make a purchase
              </Text>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <Text weight="medium" className="mb-1">3. Earn ₹500 Credit</Text>
              <Text size="sm" color="muted">
                You get ₹500 credit to use on any course purchase
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}