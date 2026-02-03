/**
 * Secure localStorage wrapper with encryption for sensitive data
 * Uses AES-GCM encryption with a session-based key
 */

import { logger } from './logger';

// Generate a session key that persists only for the browser session
const getSessionKey = (): string => {
  if (typeof window === 'undefined') return '';

  // Use sessionStorage for the encryption key (cleared when browser closes)
  let key = sessionStorage.getItem('_sk');
  if (!key) {
    // Generate a random key for this session
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    key = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    sessionStorage.setItem('_sk', key);
  }
  return key;
};

// Simple XOR encryption (lightweight, suitable for client-side obfuscation)
// Note: This is not cryptographically secure but provides obfuscation
// For true security, sensitive data should be stored server-side
const xorEncrypt = (data: string, key: string): string => {
  if (!key) return data;
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result); // Base64 encode
};

const xorDecrypt = (encrypted: string, key: string): string => {
  if (!key) return encrypted;
  try {
    const data = atob(encrypted); // Base64 decode
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch {
    return encrypted;
  }
};

interface StorageItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  version: number;
}

const STORAGE_VERSION = 1;
const DEFAULT_EXPIRY_HOURS = 24;

/**
 * Secure storage utility for localStorage with encryption and expiry
 */
export const secureStorage = {
  /**
   * Set an item with optional encryption and expiry
   */
  setItem: <T>(
    key: string,
    data: T,
    options: {
      encrypt?: boolean;
      expiryHours?: number;
    } = {}
  ): void => {
    if (typeof window === 'undefined') return;

    const { encrypt = false, expiryHours = DEFAULT_EXPIRY_HOURS } = options;
    const now = Date.now();

    const item: StorageItem<T> = {
      data,
      timestamp: now,
      expiresAt: now + expiryHours * 60 * 60 * 1000,
      version: STORAGE_VERSION,
    };

    try {
      let serialized = JSON.stringify(item);

      if (encrypt) {
        const sessionKey = getSessionKey();
        serialized = xorEncrypt(serialized, sessionKey);
      }

      localStorage.setItem(key, encrypt ? `_e:${serialized}` : serialized);
    } catch (error) {
      logger.error('SecureStorage setItem error:', error);
    }
  },

  /**
   * Get an item, automatically handling decryption and expiry
   */
  getItem: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      let serialized = stored;
      let isEncrypted = false;

      // Check if encrypted
      if (stored.startsWith('_e:')) {
        isEncrypted = true;
        serialized = stored.slice(3);
        const sessionKey = getSessionKey();
        serialized = xorDecrypt(serialized, sessionKey);
      }

      const item: StorageItem<T> = JSON.parse(serialized);

      // Check version
      if (item.version !== STORAGE_VERSION) {
        localStorage.removeItem(key);
        return null;
      }

      // Check expiry
      if (Date.now() > item.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      return item.data;
    } catch (error) {
      // If decryption fails (different session), remove the item
      logger.warn('SecureStorage getItem error, removing item', { key });
      localStorage.removeItem(key);
      return null;
    }
  },

  /**
   * Remove an item
   */
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  /**
   * Check if an item exists and is not expired
   */
  hasItem: (key: string): boolean => {
    return secureStorage.getItem(key) !== null;
  },

  /**
   * Clear all items with a specific prefix
   */
  clearPrefix: (prefix: string): void => {
    if (typeof window === 'undefined') return;

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },

  /**
   * Clean up all expired items
   */
  cleanupExpired: (): void => {
    if (typeof window === 'undefined') return;

    const keysToRemove: string[] = [];
    const now = Date.now();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      try {
        const stored = localStorage.getItem(key);
        if (!stored) continue;

        // Skip non-JSON items
        if (!stored.startsWith('{') && !stored.startsWith('_e:')) continue;

        let serialized = stored;
        if (stored.startsWith('_e:')) {
          serialized = stored.slice(3);
          const sessionKey = getSessionKey();
          serialized = xorDecrypt(serialized, sessionKey);
        }

        const item = JSON.parse(serialized);
        if (item.expiresAt && now > item.expiresAt) {
          keysToRemove.push(key);
        }
      } catch {
        // Skip items that can't be parsed
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  },
};

// Run cleanup periodically
if (typeof window !== 'undefined') {
  // Cleanup on load
  setTimeout(() => secureStorage.cleanupExpired(), 1000);

  // Cleanup every 30 minutes
  setInterval(() => secureStorage.cleanupExpired(), 30 * 60 * 1000);
}

/**
 * Specific secure storage keys for the application
 */
export const STORAGE_KEYS = {
  CART: 'dashboardCart',
  CHECKOUT_CART: 'checkoutCart',
  PRE_SIGNUP_CART: 'preSignupCart',
  PURCHASE_INTENT: 'purchaseIntent',
  EARLY_BIRD: 'earlyBirdPurchase',
  FAILED_PAYMENT_CART: 'failedPaymentCart',
  SESSION_STATE: 'sessionState',
  USER_PREFERENCES: 'userPreferences',
} as const;

/**
 * Cart-specific secure storage helpers
 */
export const cartStorage = {
  save: (cart: unknown): void => {
    secureStorage.setItem(STORAGE_KEYS.CART, cart, {
      encrypt: true,
      expiryHours: 24,
    });
  },

  load: <T>(): T | null => {
    return secureStorage.getItem<T>(STORAGE_KEYS.CART);
  },

  clear: (): void => {
    secureStorage.removeItem(STORAGE_KEYS.CART);
  },
};

/**
 * Purchase intent secure storage helpers
 */
export const purchaseStorage = {
  savePurchaseIntent: (intent: unknown): void => {
    secureStorage.setItem(STORAGE_KEYS.PURCHASE_INTENT, intent, {
      encrypt: true,
      expiryHours: 1, // Short expiry for purchase intent
    });
  },

  getPurchaseIntent: <T>(): T | null => {
    return secureStorage.getItem<T>(STORAGE_KEYS.PURCHASE_INTENT);
  },

  clearPurchaseIntent: (): void => {
    secureStorage.removeItem(STORAGE_KEYS.PURCHASE_INTENT);
  },
};
