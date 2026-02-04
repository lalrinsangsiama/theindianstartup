'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CreditCard,
  ShoppingCart,
  Zap,
  Lock,
  Loader2,
  ArrowRight,
  Sparkles,
  Gift,
  TrendingUp
} from 'lucide-react';
import { quickCheckout, addToCartAndCheckout, formatPrice, isProductOnSale } from '@/lib/payment-utils';
import { PRODUCTS } from '@/lib/products-catalog';
import { logger } from '@/lib/logger';

interface PaymentButtonProps {
  productCode: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showPrice?: boolean;
  showDiscount?: boolean;
  quickBuy?: boolean;
  customText?: string;
  icon?: React.ReactNode;
  onSuccess?: () => void;
  onFailure?: () => void;
  fullWidth?: boolean;
  showSavings?: boolean;
  ctaStyle?: 'default' | 'gradient' | 'animated' | 'pulse';
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  productCode,
  variant = 'primary',
  size = 'lg',
  className = '',
  showPrice = true,
  showDiscount = true,
  quickBuy = false,
  customText,
  icon,
  onSuccess,
  onFailure,
  fullWidth = false,
  showSavings = false,
  ctaStyle = 'default'
}) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  
  const product = PRODUCTS[productCode];
  if (!product) return null;
  
  const { onSale, discount } = isProductOnSale(productCode);
  const salePrice = onSale ? product.price * (1 - discount / 100) : product.price;
  
  const handleClick = async () => {
    // Check if user is logged in
    if (!user) {
      // Save purchase intent for after login
      localStorage.setItem('purchaseIntent', JSON.stringify({
        productCode,
        returnUrl: window.location.pathname
      }));
      // Also save redirect URL that login page will check
      sessionStorage.setItem('redirectAfterLogin', `/checkout?product=${productCode}`);
      router.push('/login');
      return;
    }
    
    setLoading(true);
    
    try {
      if (quickBuy) {
        // Direct payment
        await quickCheckout({
          productCode,
          productName: product.title,
          amount: salePrice,
          description: product.description,
          onSuccess: (response) => {
            setLoading(false);
            if (onSuccess) {
              onSuccess();
            } else {
              router.push(`/purchase/success?orderId=${response.orderId}`);
            }
          },
          onFailure: (error) => {
            setLoading(false);
            if (onFailure) {
              onFailure();
            } else if (error.reason !== 'cancelled') {
              // Only redirect to failed page for actual failures, not user cancellations
              router.push(`/purchase/failed?error=${error.code || 'UNKNOWN'}`);
            }
          }
        });
      } else {
        // Add to cart and go to checkout
        addToCartAndCheckout(productCode, product.title, salePrice);
        setLoading(false);
      }
    } catch (error) {
      logger.error('Payment error:', error);
      setLoading(false);
    }
  };
  
  // Determine button text
  const getButtonText = () => {
    if (customText) return customText;
    
    if (loading) return 'Processing...';
    
    let text = quickBuy ? 'Buy Now' : 'Select';
    
    if (showPrice) {
      text += ` - ${formatPrice(salePrice)}`;
      if (onSale && showDiscount) {
        text += ` (${discount}% OFF)`;
      }
    }
    
    return text;
  };
  
  // Determine button styles
  const getButtonStyles = () => {
    let styles = className;
    
    if (fullWidth) styles += ' w-full';
    
    switch (ctaStyle) {
      case 'gradient':
        styles += ' bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300';
        break;
      case 'animated':
        styles += ' group relative overflow-hidden';
        break;
      case 'pulse':
        styles += ' animate-pulse';
        break;
    }
    
    return styles;
  };
  
  // Determine icon
  const getIcon = () => {
    if (loading) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (icon) return icon;
    
    if (quickBuy) return <Zap className="w-4 h-4" />;
    return <ShoppingCart className="w-4 h-4" />;
  };
  
  return (
    <div className="relative inline-block">
      {/* Sale Badge */}
      {onSale && showDiscount && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold animate-bounce">
            {discount}% OFF
          </Badge>
        </div>
      )}
      
      {/* Main Button */}
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={loading}
        className={getButtonStyles()}
        aria-label={`Purchase ${product?.title || productCode} for ${formatPrice(onSale ? salePrice : (product?.price || 0))}`}
      >
        {ctaStyle === 'animated' && (
          <span className="absolute inset-0 bg-white opacity-25 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
        )}
        
        <span className="relative flex items-center justify-center gap-2">
          {getIcon()}
          <span>{getButtonText()}</span>
          {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </span>
      </Button>
      
      {/* Savings Text */}
      {showSavings && onSale && (
        <div className="text-center mt-2">
          <span className="text-sm text-green-600 font-medium">
            Save {formatPrice(product.price - salePrice)}!
          </span>
        </div>
      )}
      
      {/* Trust Badge */}
      {quickBuy && (
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-600">
          <Lock className="w-3 h-3" />
          <span>Secure Payment</span>
        </div>
      )}
    </div>
  );
};

// Preset variations for common use cases
export const BuyNowButton: React.FC<Omit<PaymentButtonProps, 'quickBuy'>> = (props) => (
  <PaymentButton {...props} quickBuy={true} icon={<CreditCard className="w-4 h-4" />} />
);

export const AddToCartButton: React.FC<Omit<PaymentButtonProps, 'quickBuy'>> = (props) => (
  <PaymentButton {...props} quickBuy={false} icon={<ShoppingCart className="w-4 h-4" />} />
);

export const UpgradeButton: React.FC<Omit<PaymentButtonProps, 'icon'>> = (props) => (
  <PaymentButton {...props} icon={<TrendingUp className="w-4 h-4" />} customText="Upgrade Now" />
);

export const GiftButton: React.FC<Omit<PaymentButtonProps, 'icon'>> = (props) => (
  <PaymentButton {...props} icon={<Gift className="w-4 h-4" />} customText="Gift This Course" />
);

// Bundle-specific button
export const AllAccessButton: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSavings?: boolean;
}> = ({ className, size = 'lg', showSavings = true }) => {
  return (
    <div className="relative">
      {showSavings && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 text-xs font-bold whitespace-nowrap">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            SAVE ₹74,971
          </Badge>
        </div>
      )}
      <PaymentButton
        productCode="ALL_ACCESS"
        variant="primary"
        size={size}
        className={`bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 hover:from-yellow-500 hover:via-red-600 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${className}`}
        customText="Get All-Access Bundle - ₹1,49,999"
        icon={<Sparkles className="w-5 h-5" />}
        quickBuy={true}
        fullWidth={true}
        ctaStyle="animated"
      />
    </div>
  );
};