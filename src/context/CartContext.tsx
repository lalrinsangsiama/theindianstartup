'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { secureStorage, STORAGE_KEYS } from '@/lib/secure-storage';

export interface CartItem {
  productCode: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productCode: string, title: string, price: number) => void;
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart persistence using secure storage with encryption
const CART_EXPIRY_HOURS = 24;

const saveCartToStorage = (cart: CartItem[]) => {
  try {
    secureStorage.setItem(STORAGE_KEYS.CART, cart, {
      encrypt: true, // Encrypt cart data
      expiryHours: CART_EXPIRY_HOURS,
    });
  } catch (error) {
    logger.error('Error saving cart to storage:', error);
  }
};

const loadCartFromStorage = (): CartItem[] => {
  try {
    const cart = secureStorage.getItem<CartItem[]>(STORAGE_KEYS.CART);
    return cart || [];
  } catch (error) {
    logger.error('Error loading cart from storage:', error);
    secureStorage.removeItem(STORAGE_KEYS.CART);
    return [];
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    setCart(savedCart);
  }, []);

  // Save cart to storage when it changes
  useEffect(() => {
    if (cart.length > 0) {
      saveCartToStorage(cart);
    } else {
      secureStorage.removeItem(STORAGE_KEYS.CART);
    }
  }, [cart]);

  const addToCart = useCallback((productCode: string, title: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productCode === productCode);
      if (existing) {
        return prev.map(item =>
          item.productCode === productCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productCode, title, price, quantity: 1 }];
    });
    setShowCart(true);
  }, []);

  const removeFromCart = useCallback((productCode: string) => {
    setCart(prev => prev.filter(item => item.productCode !== productCode));
  }, []);

  const updateQuantity = useCallback((productCode: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.productCode !== productCode));
    } else {
      setCart(prev => prev.map(item =>
        item.productCode === productCode
          ? { ...item, quantity }
          : item
      ));
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    secureStorage.removeItem(STORAGE_KEYS.CART);
  }, []);

  const calculateTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      calculateTotal,
      showCart,
      setShowCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
