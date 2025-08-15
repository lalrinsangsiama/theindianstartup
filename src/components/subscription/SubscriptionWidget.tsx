'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import { 
  Calendar, 
  Crown, 
  AlertTriangle, 
  CheckCircle, 
  CreditCard,
  Gift,
  Clock
} from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { formatAmount } from '@/lib/razorpay';

interface SubscriptionWidgetProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function SubscriptionWidget({ 
  variant = 'default', 
  className = '' 
}: SubscriptionWidgetProps) {
  const { subscription, loading, hasActiveSubscription, isExpired, daysRemaining } = useSubscription();

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription?.hasSubscription) {
    return (
      <Card className={`border-2 border-blue-200 bg-blue-50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Gift className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <Text weight="medium" className="mb-2">
                Ready to Start Your Journey?
              </Text>
              <Text size="sm" color="muted" className="mb-4">
                Join 2,847+ founders building their startups with our 30-day program
              </Text>
              <Link href="/pricing">
                <Button variant="primary" size="sm">
                  Get P1 Access - ₹999
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-2">
          {hasActiveSubscription ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          )}
          <Badge 
            variant={hasActiveSubscription ? "success" : "error"}
            size="sm"
          >
            {hasActiveSubscription ? 'Active' : isExpired ? 'Expired' : 'Inactive'}
          </Badge>
        </div>
        
        {hasActiveSubscription && (
          <Text size="sm" color="muted">
            {daysRemaining} days left
          </Text>
        )}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-600" />
          Your Subscription
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Text>Status</Text>
          <Badge 
            variant={hasActiveSubscription ? "success" : "error"}
          >
            {hasActiveSubscription ? 'Active' : isExpired ? 'Expired' : 'Inactive'}
          </Badge>
        </div>

        {subscription.planId && (
          <div className="flex items-center justify-between">
            <Text>Plan</Text>
            <Text weight="medium">
              {subscription.planId === 'launch_offer' ? 'Launch Offer' : 'Regular'}
            </Text>
          </div>
        )}

        {subscription.amount && (
          <div className="flex items-center justify-between">
            <Text>Amount Paid</Text>
            <Text weight="medium">
              {formatAmount(subscription.amount)}
            </Text>
          </div>
        )}

        {hasActiveSubscription && subscription.expiryDate && (
          <>
            <div className="flex items-center justify-between">
              <Text>Days Remaining</Text>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <Text weight="medium">
                  {daysRemaining} days
                </Text>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Text>Expires On</Text>
              <Text weight="medium">
                {new Date(subscription.expiryDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </Text>
            </div>
          </>
        )}

        {subscription.paymentDetails?.purchaseDate && (
          <div className="flex items-center justify-between">
            <Text>Purchased On</Text>
            <Text>
              {new Date(subscription.paymentDetails.purchaseDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </Text>
          </div>
        )}

        {!hasActiveSubscription && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text weight="medium" className="text-red-700 mb-1">
                  {isExpired ? 'Subscription Expired' : 'Subscription Inactive'}
                </Text>
                <Text size="sm" color="muted">
                  {isExpired 
                    ? 'Renew your subscription to continue accessing the program'
                    : 'There seems to be an issue with your subscription'
                  }
                </Text>
              </div>
            </div>
            
            <Link href="/pricing">
              <Button variant="primary" size="sm" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                {isExpired ? 'Renew Subscription' : 'Get Access'}
              </Button>
            </Link>
          </div>
        )}

        {subscription.paymentDetails?.paymentId && (
          <div className="pt-4 border-t border-gray-200">
            <Text size="xs" color="muted">
              Payment ID: {subscription.paymentDetails.paymentId}
            </Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
}