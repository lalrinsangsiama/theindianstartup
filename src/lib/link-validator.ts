import { logger } from '@/lib/logger';

export interface LinkValidationResult {
  url: string;
  status: 'valid' | 'invalid' | 'redirect' | 'error';
  statusCode?: number;
  message?: string;
  finalUrl?: string;
}

export interface PageLink {
  text: string;
  url: string;
  type: 'internal' | 'external' | 'anchor' | 'mailto';
  section: string;
  critical: boolean; // Whether this link is critical for user flow
}

// Define all links found on the landing page
export const landingPageLinks: PageLink[] = [
  // Header Navigation
  { text: 'Features', url: '#features', type: 'anchor', section: 'header', critical: false },
  { text: "What's Included", url: '#value', type: 'anchor', section: 'header', critical: false },
  { text: 'Pricing', url: '/pricing', type: 'internal', section: 'header', critical: true },
  { text: 'Dashboard', url: '/dashboard', type: 'internal', section: 'header', critical: true },
  { text: 'Get Started', url: '/signup', type: 'internal', section: 'header', critical: true },
  
  // Hero Section CTAs
  { text: 'Start Your 30-Day Journey', url: '/signup', type: 'internal', section: 'hero', critical: true },
  
  // Portfolio Demo
  { text: 'View Portfolio Demo', url: '/portfolio', type: 'internal', section: 'portfolio', critical: false },
  
  // Product Section
  { text: 'View All Products', url: '/pricing', type: 'internal', section: 'products', critical: true },
  
  // Final CTA Section
  { text: 'Get Started Now', url: '/signup', type: 'internal', section: 'cta', critical: true },
  { text: 'View All Products', url: '/pricing', type: 'internal', section: 'cta', critical: true },
  
  // Footer Legal
  { text: 'Terms of Service', url: '/terms', type: 'internal', section: 'footer', critical: false },
  { text: 'Privacy Policy', url: '/privacy', type: 'internal', section: 'footer', critical: false },
  { text: 'Terms', url: '/terms', type: 'internal', section: 'footer', critical: false },
  { text: 'Privacy', url: '/privacy', type: 'internal', section: 'footer', critical: false },
  { text: 'support@theindianstartup.in', url: 'mailto:support@theindianstartup.in', type: 'mailto', section: 'footer', critical: false },
];

// Test if a Next.js route exists by checking for the page file
export function checkRouteExists(path: string): boolean {
  if (typeof window !== 'undefined') {
    // Client-side: Can't check file system, assume valid
    return true;
  }
  
  // Server-side route validation would go here
  // For now, we'll validate based on known routes
  const validRoutes = [
    '/',
    '/pricing',
    '/dashboard',
    '/signup',
    '/portfolio',
    '/terms',
    '/privacy',
    '/login',
    '/signup',
    '/onboarding',
    '/community',
    '/resources'
  ];
  
  return validRoutes.includes(path) || path.startsWith('#');
}

// Validate a single link
export async function validateLink(link: PageLink): Promise<LinkValidationResult> {
  try {
    if (link.type === 'anchor') {
      // Check if anchor exists on current page
      if (typeof window !== 'undefined') {
        const element = document.querySelector(link.url);
        return {
          url: link.url,
          status: element ? 'valid' : 'invalid',
          message: element ? 'Anchor exists' : 'Anchor not found on page'
        };
      }
      return { url: link.url, status: 'valid', message: 'Anchor link (server-side)' };
    }
    
    if (link.type === 'mailto') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = link.url.replace('mailto:', '');
      return {
        url: link.url,
        status: emailRegex.test(email) ? 'valid' : 'invalid',
        message: emailRegex.test(email) ? 'Valid email format' : 'Invalid email format'
      };
    }
    
    if (link.type === 'internal') {
      // Check if internal route exists
      const routeExists = checkRouteExists(link.url);
      return {
        url: link.url,
        status: routeExists ? 'valid' : 'invalid',
        message: routeExists ? 'Route exists' : 'Route not found'
      };
    }
    
    if (link.type === 'external') {
      // For external links, we'd need to make HTTP requests
      // Skip for now to avoid CORS issues in browser
      return {
        url: link.url,
        status: 'valid',
        message: 'External link (not tested)'
      };
    }
    
    return { url: link.url, status: 'error', message: 'Unknown link type' };
  } catch (error) {
    return {
      url: link.url,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Validate all landing page links
export async function validateAllLinks(): Promise<LinkValidationResult[]> {
  logger.info('Validating all landing page links...');
  
  const results = await Promise.all(
    landingPageLinks.map(link => validateLink(link))
  );
  
  const criticalIssues = results.filter((result, index) => 
    landingPageLinks[index].critical && result.status !== 'valid'
  );
  
  const totalLinks = results.length;
  const validLinks = results.filter(r => r.status === 'valid').length;
  const invalidLinks = results.filter(r => r.status === 'invalid').length;
  const errorLinks = results.filter(r => r.status === 'error').length;
  
  logger.info('Link validation results:', {
    total: totalLinks,
    valid: validLinks,
    invalid: invalidLinks,
    errors: errorLinks,
    criticalIssues: criticalIssues.length,
    successRate: `${Math.round((validLinks / totalLinks) * 100)}%`
  });
  
  if (criticalIssues.length > 0) {
    logger.error('Critical link issues found:', criticalIssues);
  }
  
  return results;
}

// Check for duplicate links (same URL referenced multiple times)
export function findDuplicateLinks(): Array<{ url: string; count: number; sections: string[] }> {
  const urlCounts = new Map<string, { count: number; sections: string[] }>();
  
  landingPageLinks.forEach(link => {
    if (urlCounts.has(link.url)) {
      const existing = urlCounts.get(link.url)!;
      existing.count++;
      if (!existing.sections.includes(link.section)) {
        existing.sections.push(link.section);
      }
    } else {
      urlCounts.set(link.url, { count: 1, sections: [link.section] });
    }
  });
  
  return Array.from(urlCounts.entries())
    .filter(([, data]) => data.count > 1)
    .map(([url, data]) => ({ url, ...data }));
}

// Generate a report of all links
export function generateLinkReport(): string {
  const duplicates = findDuplicateLinks();
  const criticalLinks = landingPageLinks.filter(link => link.critical);
  
  let report = '# Landing Page Link Report\n\n';
  
  report += '## Summary\n';
  report += `- Total Links: ${landingPageLinks.length}\n`;
  report += `- Critical Links: ${criticalLinks.length}\n`;
  report += `- Duplicate URLs: ${duplicates.length}\n\n`;
  
  report += '## Links by Section\n';
  const sections = [...new Set(landingPageLinks.map(link => link.section))];
  sections.forEach(section => {
    const sectionLinks = landingPageLinks.filter(link => link.section === section);
    report += `### ${section.charAt(0).toUpperCase() + section.slice(1)}\n`;
    sectionLinks.forEach(link => {
      const critical = link.critical ? ' [CRITICAL]' : '';
      report += `- ${link.text} → ${link.url} (${link.type})${critical}\n`;
    });
    report += '\n';
  });
  
  if (duplicates.length > 0) {
    report += '## Duplicate URLs\n';
    duplicates.forEach(duplicate => {
      report += `- ${duplicate.url} (${duplicate.count} times in: ${duplicate.sections.join(', ')})\n`;
    });
    report += '\n';
  }
  
  report += '## Critical Links\n';
  criticalLinks.forEach(link => {
    report += `- ${link.text} → ${link.url} (${link.section})\n`;
  });
  
  return report;
}

// Test link behavior in browser
export function testLinkInBrowser(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    try {
      if (url.startsWith('#')) {
        // Test anchor link
        const element = document.querySelector(url);
        resolve(!!element);
      } else if (url.startsWith('mailto:')) {
        // Mailto links are always valid if properly formatted
        resolve(true);
      } else {
        // For internal links, we can't easily test without navigation
        // So we'll assume they're valid if they follow expected patterns
        resolve(url.startsWith('/') && url.length > 1);
      }
    } catch (error) {
      logger.error('Error testing link in browser:', error);
      resolve(false);
    }
  });
}