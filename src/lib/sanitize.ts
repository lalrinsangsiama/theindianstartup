/**
 * HTML Sanitization utilities to prevent XSS attacks
 * Uses DOMPurify for client-side and a safe subset for server-side
 */

import React from 'react';

// Safe HTML sanitization configuration
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'a', 'abbr', 'acronym', 'blockquote', 'cite', 'code', 'pre',
  'hr', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'caption', 'col', 'colgroup', 'tfoot',
  'div', 'span', 'sub', 'sup', 'mark', 'del', 'ins',
  'figure', 'figcaption', 'article', 'section', 'nav',
  'header', 'footer', 'main', 'aside', 'time',
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height', 'loading'],
  'blockquote': ['cite'],
  'q': ['cite'],
  'time': ['datetime'],
  '*': ['class', 'id', 'style'], // Allow these on all elements
};

const ALLOWED_STYLES = [
  'color', 'background-color', 'font-size', 'font-weight',
  'font-style', 'text-decoration', 'text-align',
  'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
  'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
  'border', 'border-radius', 'display', 'width', 'max-width', 'height', 'max-height',
];

// URL schemes we allow
const ALLOWED_SCHEMES = ['http', 'https', 'mailto', 'tel'];

// Client-side sanitization using DOMPurify
let DOMPurify: any = null;

if (typeof window !== 'undefined') {
  // Dynamically import DOMPurify for client-side only
  import('dompurify').then((module) => {
    DOMPurify = module.default;
    
    // Configure DOMPurify
    DOMPurify.setConfig({
      ALLOWED_TAGS,
      ALLOWED_ATTR: (Object.keys(ALLOWED_ATTRIBUTES) as Array<keyof typeof ALLOWED_ATTRIBUTES>).reduce((acc, tag) => {
        if (tag === '*') {
          return [...acc, ...ALLOWED_ATTRIBUTES[tag]];
        }
        return [...acc, ...ALLOWED_ATTRIBUTES[tag].map(attr => `${tag}[${attr}]`)];
      }, [] as string[]),
      ALLOWED_URI_REGEXP: new RegExp(`^(${ALLOWED_SCHEMES.join('|')}):`, 'i'),
      KEEP_CONTENT: true,
      ADD_TAGS: ['time'], // HTML5 tags
      ADD_ATTR: ['target', 'rel', 'loading'], // Additional attributes
    });
  });
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - The potentially unsafe HTML string
 * @param options - Optional configuration
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(
  dirty: string,
  options?: {
    allowImages?: boolean;
    allowLinks?: boolean;
    allowStyles?: boolean;
    allowTables?: boolean;
    maxLength?: number;
  }
): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  // Apply length limit if specified
  if (options?.maxLength && dirty.length > options.maxLength) {
    dirty = dirty.substring(0, options.maxLength) + '...';
  }

  // Client-side sanitization with DOMPurify
  if (typeof window !== 'undefined' && DOMPurify) {
    let config: any = {};

    // Customize based on options
    if (!options?.allowImages) {
      config.FORBID_TAGS = [...(config.FORBID_TAGS || []), 'img'];
    }
    if (!options?.allowLinks) {
      config.FORBID_TAGS = [...(config.FORBID_TAGS || []), 'a'];
    }
    if (!options?.allowStyles) {
      config.FORBID_ATTR = [...(config.FORBID_ATTR || []), 'style'];
    }
    if (!options?.allowTables) {
      config.FORBID_TAGS = [...(config.FORBID_TAGS || []), 
        'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'col', 'colgroup', 'tfoot'
      ];
    }

    return DOMPurify.sanitize(dirty, config);
  }

  // Server-side fallback - basic sanitization
  return serverSanitize(dirty, options);
}

/**
 * Server-side HTML sanitization (basic)
 * This is a fallback when DOMPurify is not available
 */
function serverSanitize(
  html: string,
  options?: {
    allowImages?: boolean;
    allowLinks?: boolean;
    allowStyles?: boolean;
    allowTables?: boolean;
  }
): string {
  // Remove script tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove on* event handlers
  html = html.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  html = html.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  html = html.replace(/javascript:/gi, '');
  
  // Remove data: protocol except for images
  if (!options?.allowImages) {
    html = html.replace(/data:/gi, '');
  }
  
  // Remove style tags and attributes if not allowed
  if (!options?.allowStyles) {
    html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    html = html.replace(/\s*style\s*=\s*["'][^"']*["']/gi, '');
  }
  
  // Remove iframes
  html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  
  // Remove object and embed tags
  html = html.replace(/<(object|embed)\b[^<]*(?:(?!<\/(object|embed)>)<[^<]*)*<\/(object|embed)>/gi, '');
  
  return html;
}

/**
 * Sanitize user input for display in text content (not HTML)
 * This escapes HTML entities to prevent injection
 */
export function escapeHTML(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export function sanitizeURL(url: string): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }
  
  // Remove whitespace and convert to lowercase for checking
  const cleanUrl = url.trim().toLowerCase();
  
  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  for (const protocol of dangerousProtocols) {
    if (cleanUrl.startsWith(protocol)) {
      return '#';
    }
  }
  
  // Allow relative URLs and safe protocols
  if (cleanUrl.startsWith('/') || 
      cleanUrl.startsWith('#') ||
      cleanUrl.startsWith('http://') ||
      cleanUrl.startsWith('https://') ||
      cleanUrl.startsWith('mailto:') ||
      cleanUrl.startsWith('tel:')) {
    return url.trim();
  }
  
  // Default to safe URL
  return '#';
}

/**
 * Sanitize CSS to prevent injection attacks
 */
export function sanitizeCSS(css: string): string {
  if (!css || typeof css !== 'string') {
    return '';
  }
  
  // Remove javascript: protocol
  css = css.replace(/javascript:/gi, '');
  
  // Remove expression() which can execute code in IE
  css = css.replace(/expression\s*\(/gi, '');
  
  // Remove @import which could load external resources
  css = css.replace(/@import/gi, '');
  
  // Remove behaviors (IE specific)
  css = css.replace(/behavior\s*:/gi, '');
  
  // Remove -moz-binding (Firefox specific)
  css = css.replace(/-moz-binding\s*:/gi, '');
  
  return css;
}

/**
 * Create a safe HTML component with sanitization
 * Use this instead of dangerouslySetInnerHTML
 */
interface SafeHTMLProps {
  html: string;
  className?: string;
  options?: Parameters<typeof sanitizeHTML>[1];
}

export function SafeHTML({ html, className, options }: SafeHTMLProps): React.JSX.Element {
  if (typeof window === 'undefined') {
    // Server-side rendering
    return React.createElement('div', {
      className,
      dangerouslySetInnerHTML: { __html: sanitizeHTML(html, options) }
    });
  }
  
  // Client-side rendering
  const sanitized = sanitizeHTML(html, options);
  
  return React.createElement('div', {
    className,
    dangerouslySetInnerHTML: { __html: sanitized }
  });
}

// Markdown to HTML conversion with sanitization
export function markdownToSafeHTML(markdown: string): string {
  // This is a simple implementation - for production, use a proper markdown parser
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convert links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  
  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // Sanitize the result
  return sanitizeHTML(html);
}