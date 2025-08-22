import { logger } from '@/lib/logger';

declare global {
  interface Window {
    Razorpay: any;
    gtag?: Function;
  }
}

export interface PaymentConfig {
  productCode: string;
  productName: string;
  amount: number;
  description?: string;
  couponCode?: string;
  redirectUrl?: string;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
}

/**
 * Initialize Razorpay script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Quick checkout function for direct purchases
 */
export const quickCheckout = async (config: PaymentConfig) => {
  try {
    // Track checkout initiation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'INR',
        value: config.amount,
        items: [{
          item_id: config.productCode,
          item_name: config.productName,
          price: config.amount,
          quantity: 1
        }]
      });
    }

    // Load Razorpay if not loaded
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      throw new Error('Failed to load payment gateway');
    }

    // Create order
    const orderResponse = await fetch('/api/purchase/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productType: config.productCode,
        amount: config.amount * 100, // Convert to paise
        couponCode: config.couponCode
      }),
    });

    if (!orderResponse.ok) {
      const error = await orderResponse.json();
      throw new Error(error.message || 'Failed to create order');
    }

    const orderData = await orderResponse.json();

    // Initialize Razorpay
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'The Indian Startup',
      description: config.description || config.productName,
      image: '/logo.png',
      order_id: orderData.orderId,
      prefill: orderData.prefill,
      theme: {
        color: '#000000',
      },
      modal: {
        ondismiss: function() {
          logger.info('Payment cancelled by user');
          if (config.onFailure) {
            config.onFailure({ reason: 'cancelled' });
          }
        }
      },
      handler: async function (response: any) {
        try {
          // Verify payment
          const verifyResponse = await fetch('/api/purchase/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          const verifyData = await verifyResponse.json();

          // Track successful purchase
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'purchase', {
              currency: 'INR',
              transaction_id: response.razorpay_payment_id,
              value: config.amount,
              items: [{
                item_id: config.productCode,
                item_name: config.productName,
                price: config.amount,
                quantity: 1
              }]
            });
          }

          // Call success callback or redirect
          if (config.onSuccess) {
            config.onSuccess(verifyData);
          } else if (config.redirectUrl) {
            window.location.href = config.redirectUrl;
          } else {
            window.location.href = `/purchase/success?orderId=${verifyData.orderId}`;
          }
        } catch (error) {
          logger.error('Payment verification error:', error);
          if (config.onFailure) {
            config.onFailure(error);
          } else {
            window.location.href = `/purchase/failed?error=VERIFICATION_FAILED`;
          }
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    logger.error('Quick checkout error:', error);
    if (config.onFailure) {
      config.onFailure(error);
    } else {
      alert('Failed to initiate payment. Please try again.');
    }
  }
};

/**
 * Add item to cart and redirect to checkout
 */
export const addToCartAndCheckout = (productCode: string, productName: string, price: number) => {
  const cart = [{
    productCode,
    quantity: 1,
    price,
    title: productName
  }];
  
  localStorage.setItem('checkoutCart', JSON.stringify(cart));
  window.location.href = `/checkout?product=${productCode}`;
};

/**
 * Check if user has access to a product
 */
export const checkProductAccess = async (productCode: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/products/${productCode}/access`);
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.hasAccess;
  } catch (error) {
    logger.error('Error checking product access:', error);
    return false;
  }
};

/**
 * Get user's purchase history
 */
export const getUserPurchases = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/purchase/history');
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.purchases || [];
  } catch (error) {
    logger.error('Error fetching purchase history:', error);
    return [];
  }
};

/**
 * Apply coupon code
 */
export const validateCoupon = async (couponCode: string, productCode: string, amount: number) => {
  try {
    const response = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ couponCode, productCode, amount })
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { valid: false, error: error.message };
    }
    
    const data = await response.json();
    return { valid: true, discount: data.discount, finalAmount: data.finalAmount };
  } catch (error) {
    logger.error('Error validating coupon:', error);
    return { valid: false, error: 'Failed to validate coupon' };
  }
};

/**
 * Format price for display
 */
export const formatPrice = (amount: number, showCurrency = true): string => {
  const formatted = amount.toLocaleString('en-IN');
  return showCurrency ? `₹${formatted}` : formatted;
};

/**
 * Calculate bundle savings
 */
export const calculateBundleSavings = (individualPrices: number[], bundlePrice: number): number => {
  const total = individualPrices.reduce((sum, price) => sum + price, 0);
  return total - bundlePrice;
};

/**
 * Get payment method icon
 */
export const getPaymentMethodIcon = (method: string): string => {
  const icons: Record<string, string> = {
    'card': '💳',
    'upi': '📱',
    'netbanking': '🏦',
    'wallet': '👛',
    'emi': '📊'
  };
  return icons[method] || '💰';
};

/**
 * Check if a product is on sale
 */
export const isProductOnSale = (productCode: string): { onSale: boolean; discount: number } => {
  // Define sale periods
  const sales = {
    'LAUNCH': { products: ['P1', 'ALL_ACCESS'], discount: 50 },
    'FESTIVAL': { products: ['ALL_ACCESS'], discount: 30 },
    'EARLYBIRD': { products: ['P1', 'P2', 'P3'], discount: 40 }
  };
  
  // Check current sale (this would be managed via admin panel in production)
  const currentSale = 'LAUNCH';
  const sale = sales[currentSale as keyof typeof sales];
  
  if (sale && sale.products.includes(productCode)) {
    return { onSale: true, discount: sale.discount };
  }
  
  return { onSale: false, discount: 0 };
};

/**
 * Generate referral discount code
 */
export const generateReferralCode = (userId: string): string => {
  const prefix = 'REF';
  const hash = userId.substring(0, 6).toUpperCase();
  return `${prefix}${hash}`;
};

/**
 * Track payment event
 */
export const trackPaymentEvent = (event: string, data: any) => {
  logger.info(`Payment Event: ${event}`, data);
  
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, data);
  }
  
  // Send to backend for tracking
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, data })
  }).catch(error => logger.error('Failed to track event:', error));
};