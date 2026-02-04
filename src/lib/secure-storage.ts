/**
 * Secure localStorage wrapper with encryption for sensitive data
 * Uses AES-GCM encryption with a session-based key via Web Crypto API
 */

import { logger } from './logger';

// Generate a session key that persists only for the browser session
const getSessionKey = async (): Promise<CryptoKey | null> => {
  if (typeof window === 'undefined' || !crypto.subtle) return null;

  // Check for existing raw key in sessionStorage
  let rawKeyHex = sessionStorage.getItem('_sk');
  let rawKey: Uint8Array;

  if (!rawKeyHex) {
    // Generate a random 256-bit key for this session
    rawKey = new Uint8Array(32);
    crypto.getRandomValues(rawKey);
    rawKeyHex = Array.from(rawKey, byte => byte.toString(16).padStart(2, '0')).join('');
    sessionStorage.setItem('_sk', rawKeyHex);
  } else {
    // Convert hex string back to Uint8Array
    rawKey = new Uint8Array(rawKeyHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  }

  // Import as CryptoKey for AES-GCM
  try {
    return await crypto.subtle.importKey(
      'raw',
      rawKey.buffer as ArrayBuffer,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  } catch {
    return null;
  }
};

// AES-GCM encryption using Web Crypto API
const aesEncrypt = async (data: string): Promise<string | null> => {
  const key = await getSessionKey();
  if (!key) return null;

  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    // Generate random IV (12 bytes for AES-GCM)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer
    );

    // Combine IV + encrypted data and base64 encode
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch {
    return null;
  }
};

const aesDecrypt = async (encrypted: string): Promise<string | null> => {
  const key = await getSessionKey();
  if (!key) return null;

  try {
    // Base64 decode
    const combined = new Uint8Array(
      atob(encrypted).split('').map(c => c.charCodeAt(0))
    );

    // Extract IV (first 12 bytes) and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch {
    return null;
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
      const serialized = JSON.stringify(item);

      if (encrypt && crypto.subtle) {
        // Use async encryption
        aesEncrypt(serialized).then(encrypted => {
          if (encrypted) {
            localStorage.setItem(key, `_e:${encrypted}`);
          } else {
            // Fallback to unencrypted if encryption fails
            localStorage.setItem(key, serialized);
          }
        }).catch(() => {
          localStorage.setItem(key, serialized);
        });
      } else {
        localStorage.setItem(key, serialized);
      }
    } catch (error) {
      logger.error('SecureStorage setItem error:', error);
    }
  },

  /**
   * Set an item with encryption (async version for proper encryption)
   */
  setItemAsync: async <T>(
    key: string,
    data: T,
    options: {
      encrypt?: boolean;
      expiryHours?: number;
    } = {}
  ): Promise<void> => {
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
      const serialized = JSON.stringify(item);

      if (encrypt && crypto.subtle) {
        const encrypted = await aesEncrypt(serialized);
        if (encrypted) {
          localStorage.setItem(key, `_e:${encrypted}`);
        } else {
          localStorage.setItem(key, serialized);
        }
      } else {
        localStorage.setItem(key, serialized);
      }
    } catch (error) {
      logger.error('SecureStorage setItemAsync error:', error);
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

      // If encrypted, return null (use getItemAsync instead)
      if (stored.startsWith('_e:')) {
        // For backwards compatibility, try to get via async method
        // This returns null for sync access to encrypted items
        return null;
      }

      const item: StorageItem<T> = JSON.parse(stored);

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
      logger.warn('SecureStorage getItem error, removing item', { key });
      localStorage.removeItem(key);
      return null;
    }
  },

  /**
   * Get an item with decryption (async version)
   */
  getItemAsync: async <T>(key: string): Promise<T | null> => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      let serialized = stored;

      // Check if encrypted
      if (stored.startsWith('_e:')) {
        const encrypted = stored.slice(3);
        const decrypted = await aesDecrypt(encrypted);
        if (!decrypted) {
          // Decryption failed (different session), remove the item
          localStorage.removeItem(key);
          return null;
        }
        serialized = decrypted;
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
      logger.warn('SecureStorage getItemAsync error, removing item', { key });
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
   * Clean up all expired items (checks non-encrypted items only for sync operation)
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

        // Skip encrypted items (they use async decryption)
        // and non-JSON items
        if (!stored.startsWith('{')) continue;

        const item = JSON.parse(stored);
        if (item.expiresAt && now > item.expiresAt) {
          keysToRemove.push(key);
        }
      } catch {
        // Skip items that can't be parsed
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  },

  /**
   * Check if an item exists (async version that supports encrypted items)
   */
  hasItemAsync: async (key: string): Promise<boolean> => {
    return (await secureStorage.getItemAsync(key)) !== null;
  },
};

// Run cleanup periodically - with proper cleanup to prevent memory leaks
if (typeof window !== 'undefined') {
  // Cleanup on load
  setTimeout(() => secureStorage.cleanupExpired(), 1000);

  // Store interval ID for cleanup
  const cleanupIntervalId = setInterval(() => secureStorage.cleanupExpired(), 30 * 60 * 1000);

  // Clean up interval on page unload to prevent memory leaks
  window.addEventListener('beforeunload', () => {
    clearInterval(cleanupIntervalId);
  });
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
  save: async (cart: unknown): Promise<void> => {
    await secureStorage.setItemAsync(STORAGE_KEYS.CART, cart, {
      encrypt: true,
      expiryHours: 24,
    });
  },

  load: async <T>(): Promise<T | null> => {
    return secureStorage.getItemAsync<T>(STORAGE_KEYS.CART);
  },

  clear: (): void => {
    secureStorage.removeItem(STORAGE_KEYS.CART);
  },
};

/**
 * Purchase intent secure storage helpers
 */
export const purchaseStorage = {
  savePurchaseIntent: async (intent: unknown): Promise<void> => {
    await secureStorage.setItemAsync(STORAGE_KEYS.PURCHASE_INTENT, intent, {
      encrypt: true,
      expiryHours: 1, // Short expiry for purchase intent
    });
  },

  getPurchaseIntent: async <T>(): Promise<T | null> => {
    return secureStorage.getItemAsync<T>(STORAGE_KEYS.PURCHASE_INTENT);
  },

  clearPurchaseIntent: (): void => {
    secureStorage.removeItem(STORAGE_KEYS.PURCHASE_INTENT);
  },
};
