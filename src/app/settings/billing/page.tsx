'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Text, Heading } from '@/components/ui/Typography';
import {
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  FileText,
  IndianRupee,
} from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';

interface Purchase {
  id: string;
  productCode: string;
  productName: string;
  amount: number;
  purchasedAt: string;
  status: string;
  refundStatus: string;
  expiresAt: string;
}

interface RefundRequest {
  id: string;
  status: string;
  reason: string;
  requestedAmount: number;
  approvedAmount: number | null;
  denialReason: string | null;
  createdAt: string;
  reviewedAt: string | null;
  purchase: {
    id: string;
    productCode: string;
    productName: string;
    amount: number;
    purchasedAt: string;
  };
}

const statusConfig: Record<string, { label: string; color: 'default' | 'success' | 'warning' | 'error' | 'secondary' | 'outline'; icon: typeof Clock }> = {
  pending: { label: 'Pending Review', color: 'warning', icon: Clock },
  approved: { label: 'Approved', color: 'success', icon: CheckCircle },
  processing: { label: 'Processing', color: 'warning', icon: RefreshCw },
  completed: { label: 'Completed', color: 'success', icon: CheckCircle },
  denied: { label: 'Denied', color: 'error', icon: XCircle },
  failed: { label: 'Failed', color: 'error', icon: AlertCircle },
};

const reasonLabels: Record<string, string> = {
  not_as_expected: 'Product not as expected',
  duplicate_purchase: 'Duplicate purchase',
  technical_issues: 'Technical issues',
  changed_mind: 'Changed my mind',
  other: 'Other reason',
};

function BillingContent() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingRefund, setRequestingRefund] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch purchases
      const purchasesRes = await fetch('/api/user/purchases');
      if (purchasesRes.ok) {
        const purchasesData = await purchasesRes.json();
        setPurchases(purchasesData.purchases || []);
      }

      // Fetch refund requests
      const refundsRes = await fetch('/api/purchase/refund-request');
      if (refundsRes.ok) {
        const refundsData = await refundsRes.json();
        setRefunds(refundsData.refunds || []);
      }
    } catch (error) {
      logger.error('Failed to fetch billing data:', error);
      toast.error('Failed to load billing information');
    } finally {
      setLoading(false);
    }
  };

  const requestRefund = async (purchaseId: string) => {
    setRequestingRefund(purchaseId);
    try {
      const res = await fetch('/api/purchase/refund-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchaseId,
          reason: 'changed_mind',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to request refund');
      }

      toast.success('Refund request submitted successfully');
      fetchData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to request refund');
    } finally {
      setRequestingRefund(null);
    }
  };

  const isRefundEligible = (purchase: Purchase) => {
    const purchaseDate = new Date(purchase.purchasedAt);
    const refundDeadline = new Date(purchaseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    const now = new Date();

    return (
      purchase.status === 'completed' &&
      (!purchase.refundStatus || purchase.refundStatus === 'none' || purchase.refundStatus === 'denied') &&
      now <= refundDeadline
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount / 100);
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
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/settings')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
      </div>

      <div className="mb-8">
        <Heading as="h1" className="mb-2">Billing & Refunds</Heading>
        <Text color="muted">View your purchase history and manage refund requests</Text>
      </div>

      {/* Refund Requests Section */}
      {refunds.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Refund Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {refunds.map((refund) => {
                const config = statusConfig[refund.status] || statusConfig.pending;
                const StatusIcon = config.icon;

                return (
                  <div
                    key={refund.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Text weight="medium">{refund.purchase?.productName || refund.purchase?.productCode}</Text>
                        <Text size="sm" color="muted">
                          Requested on {formatDate(refund.createdAt)}
                        </Text>
                      </div>
                      <Badge variant={config.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Text size="xs" color="muted">Reason</Text>
                        <Text size="sm">{reasonLabels[refund.reason] || refund.reason}</Text>
                      </div>
                      <div>
                        <Text size="xs" color="muted">Amount</Text>
                        <Text size="sm">{formatCurrency(refund.approvedAmount || refund.requestedAmount)}</Text>
                      </div>
                    </div>

                    {refund.denialReason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                        <Text size="sm" className="text-red-700">
                          <strong>Denial Reason:</strong> {refund.denialReason}
                        </Text>
                      </div>
                    )}

                    {refund.status === 'completed' && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <Text size="sm" className="text-green-700">
                          Refund of {formatCurrency(refund.approvedAmount || refund.requestedAmount)} has been processed. It may take 5-7 business days to reflect in your account.
                        </Text>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase History Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Purchase History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <Text color="muted">No purchases yet</Text>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => router.push('/pricing')}
              >
                View Courses
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Text weight="medium">{purchase.productName || purchase.productCode}</Text>
                      <Text size="sm" color="muted">
                        Purchased on {formatDate(purchase.purchasedAt)}
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text weight="medium" className="flex items-center justify-end">
                        <IndianRupee className="w-4 h-4" />
                        {(purchase.amount / 100).toLocaleString('en-IN')}
                      </Text>
                      <Badge
                        variant={purchase.status === 'completed' ? 'success' : 'default'}
                        size="sm"
                      >
                        {purchase.status}
                      </Badge>
                    </div>
                  </div>

                  {purchase.refundStatus && purchase.refundStatus !== 'none' && (
                    <div className="mt-2">
                      <Badge variant="outline" size="sm">
                        Refund: {purchase.refundStatus}
                      </Badge>
                    </div>
                  )}

                  {isRefundEligible(purchase) && (
                    <div className="mt-3 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => requestRefund(purchase.id)}
                        disabled={requestingRefund === purchase.id}
                      >
                        {requestingRefund === purchase.id ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4 mr-2" />
                        )}
                        Request Refund
                      </Button>
                      <Text size="xs" color="muted" className="mt-1">
                        Eligible for refund until {formatDate(new Date(new Date(purchase.purchasedAt).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString())}
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Refund Policy Info */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="medium" className="text-blue-800">Refund Policy</Text>
              <Text size="sm" className="text-blue-700 mt-1">
                You can request a full refund within 3 days of purchase. Refunds are processed within 2-3 business days
                and may take 5-7 business days to reflect in your account. For more details, see our{' '}
                <a href="/refund-policy" className="underline">Refund Policy</a>.
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <BillingContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
