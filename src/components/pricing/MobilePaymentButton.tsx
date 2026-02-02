'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { 
  CreditCard, 
  Shield, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Smartphone,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

interface MobilePaymentButtonProps {
  productCode: string;
  productName: string;
  price: number;
  onPurchase: (code: string, price: number) => Promise<void>;
  disabled?: boolean;
  className?: string;
  showSecurityBadge?: boolean;
  showPaymentMethods?: boolean;
}

export const MobilePaymentButton: React.FC<MobilePaymentButtonProps> = ({
  productCode,
  productName,
  price,
  onPurchase,
  disabled,
  className,
  showSecurityBadge = true,
  showPaymentMethods = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Monitor online status
  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handlePayment = async () => {
    if (isOffline) {
      setError('No internet connection. Please check your connection and try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onPurchase(productCode, price);
      setIsSuccess(true);
      
      // Haptic feedback on success (if supported)
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      logger.error('Payment error:', err);
      
      // Haptic feedback on error
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Main Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading || isOffline}
        className={cn(
          "w-full py-4 text-lg font-semibold transition-all",
          "active:scale-[0.98] touch-manipulation",
          isSuccess && "bg-green-600 hover:bg-green-700"
        )}
        variant="primary"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Payment Successful!
          </>
        ) : isOffline ? (
          <>
            <WifiOff className="w-5 h-5 mr-2" />
            No Internet Connection
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay ₹{price.toLocaleString('en-IN')}
          </>
        )}
      </Button>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <Text size="sm" className="text-red-800">
            {error}
          </Text>
        </div>
      )}

      {/* Security Badge */}
      {showSecurityBadge && !isSuccess && (
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
          <Shield className="w-4 h-4" />
          <Text size="xs">
            Secured by Razorpay • 256-bit encryption
          </Text>
        </div>
      )}

      {/* Payment Methods */}
      {showPaymentMethods && !isSuccess && (
        <div className="mt-4 space-y-2">
          <Text size="xs" color="muted" className="text-center">
            Accepted payment methods
          </Text>
          <div className="flex justify-center gap-3">
            {/* Payment method icons */}
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <Text size="xs" weight="bold">UPI</Text>
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <CheckCircle className="w-4 h-4" />
          <Text size="xs" weight="medium">
            3-day money back guarantee
          </Text>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <CheckCircle className="w-4 h-4" />
          <Text size="xs">
            Instant access after payment
          </Text>
        </div>
      </div>
    </div>
  );
};