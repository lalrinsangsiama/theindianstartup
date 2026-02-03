'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { PageBreadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  ArrowLeft,
  RefreshCw,
  Receipt,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { formatDistanceToNow } from 'date-fns';

interface RefundRequest {
  id: string;
  purchaseId: string;
  reason: string;
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'denied' | 'failed';
  requestedAmount: number;
  approvedAmount?: number;
  denialReason?: string;
  createdAt: string;
  updatedAt: string;
  purchase?: {
    id: string;
    productCode: string;
    productName: string;
    amount: number;
    purchasedAt: string;
  };
}

const REASON_LABELS: Record<string, string> = {
  not_as_expected: 'Content not as expected',
  duplicate_purchase: 'Duplicate purchase',
  technical_issues: 'Technical issues',
  changed_mind: 'Changed my mind',
  other: 'Other reason',
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  approved: { label: 'Approved', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: RefreshCw },
  completed: { label: 'Refunded', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  denied: { label: 'Denied', color: 'bg-red-100 text-red-800', icon: XCircle },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800', icon: AlertCircle },
};

function RefundHistoryContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/purchase/refund-request');
      if (res.ok) {
        const data = await res.json();
        setRefunds(data.refunds || []);
      }
    } catch (error) {
      logger.error('Failed to fetch refunds:', error);
      toast.error('Failed to load refund history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageBreadcrumbs />

      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/settings?tab=billing')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Billing
        </Button>
      </div>

      <div className="mb-8">
        <Heading as="h1" className="mb-2 flex items-center gap-2">
          <Receipt className="w-6 h-6" />
          Refund History
        </Heading>
        <Text color="muted">
          Track the status of your refund requests
        </Text>
      </div>

      {/* Refund Policy Info */}
      <Alert variant="info" className="mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <Text size="sm" weight="medium">Our Refund Policy</Text>
            <Text size="sm" color="muted">
              Refunds are available within 3 days of purchase. Approved refunds are processed
              within 2-3 business days and credited to your original payment method.
            </Text>
          </div>
        </div>
      </Alert>

      {/* Refund List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Refund Requests ({refunds.length})</span>
            <Button variant="ghost" size="sm" onClick={fetchRefunds}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {refunds.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <Text color="muted">No refund requests</Text>
              <Text size="sm" color="muted" className="mt-1">
                If you need to request a refund, go to your purchase history.
              </Text>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => router.push('/settings?tab=billing')}
              >
                View Purchase History
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {refunds.map((refund) => {
                const statusConfig = STATUS_CONFIG[refund.status] || STATUS_CONFIG.pending;
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={refund.id}
                    className="border rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Text weight="medium">
                            {refund.purchase?.productName || refund.purchase?.productCode || 'Unknown Product'}
                          </Text>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <Text size="sm" color="muted">
                          Request ID: {refund.id.slice(0, 8)}...
                        </Text>
                      </div>
                      <div className="text-right">
                        <Text weight="bold" size="lg">
                          {formatCurrency(refund.approvedAmount || refund.requestedAmount)}
                        </Text>
                        {refund.approvedAmount && refund.approvedAmount !== refund.requestedAmount && (
                          <Text size="xs" color="muted" className="line-through">
                            {formatCurrency(refund.requestedAmount)}
                          </Text>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <Text size="xs" color="muted">Reason</Text>
                        <Text size="sm">{REASON_LABELS[refund.reason] || refund.reason}</Text>
                      </div>
                      <div>
                        <Text size="xs" color="muted">Requested</Text>
                        <Text size="sm">{formatDate(refund.createdAt)}</Text>
                      </div>
                      <div>
                        <Text size="xs" color="muted">Last Updated</Text>
                        <Text size="sm">{formatDate(refund.updatedAt)}</Text>
                      </div>
                      {refund.purchase && (
                        <div>
                          <Text size="xs" color="muted">Original Purchase</Text>
                          <Text size="sm">{formatDate(refund.purchase.purchasedAt)}</Text>
                        </div>
                      )}
                    </div>

                    {refund.additionalInfo && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                        <Text size="xs" color="muted" className="mb-1">Your Notes:</Text>
                        <Text size="sm">{refund.additionalInfo}</Text>
                      </div>
                    )}

                    {refund.status === 'denied' && refund.denialReason && (
                      <div className="mt-3 p-2 bg-red-50 rounded text-sm border border-red-100">
                        <Text size="xs" className="text-red-600 mb-1">Denial Reason:</Text>
                        <Text size="sm" className="text-red-700">{refund.denialReason}</Text>
                      </div>
                    )}

                    {refund.status === 'completed' && (
                      <div className="mt-3 p-2 bg-green-50 rounded text-sm border border-green-100">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <Text size="sm" weight="medium" className="text-green-700">
                            Refund processed! The amount will be credited to your original payment method.
                          </Text>
                        </div>
                      </div>
                    )}

                    {refund.status === 'pending' && (
                      <div className="mt-3 p-2 bg-yellow-50 rounded text-sm border border-yellow-100">
                        <div className="flex items-center gap-2 text-yellow-700">
                          <Clock className="w-4 h-4" />
                          <Text size="sm" className="text-yellow-700">
                            Your request is being reviewed. We&apos;ll notify you once it&apos;s processed.
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-gray-500" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text size="sm" color="muted" className="mb-4">
            If you have questions about a refund or need assistance, please contact our support team.
          </Text>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push('/help')}>
              Visit Help Center
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = 'mailto:support@theindianstartup.in'}
            >
              Email Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RefundHistoryPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <RefundHistoryContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
