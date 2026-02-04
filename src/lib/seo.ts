/**
 * SEO Optimization System
 * Sitemap generation, meta tags, structured data, and SEO monitoring
 */

import { Metadata } from 'next';

// Product SEO data
const PRODUCT_SEO_DATA = {
  P1: {
    title: '30-Day India Launch Sprint - Build Your Startup in 30 Days',
    description: 'Transform your idea into a launch-ready startup with daily action plans. Complete legal entity, MVP, and first customers in 30 days.',
    keywords: ['startup launch', 'india startup', '30-day program', 'entrepreneurship', 'startup course'],
    price: 4999,
    currency: 'INR',
  },
  P2: {
    title: 'Incorporation & Compliance Kit - Complete Legal Setup for Indian Startups',
    description: 'Master Indian business incorporation and ongoing compliance with 150+ templates. Complete legal framework for your startup.',
    keywords: ['startup incorporation', 'legal compliance', 'indian business law', 'startup legal', 'company registration'],
    price: 4999,
    currency: 'INR',
  },
  P3: {
    title: 'Funding in India - Complete Mastery Course for Indian Startups',
    description: 'Master the Indian funding ecosystem from government grants to venture capital. Access ₹20L-₹5Cr funding opportunities.',
    keywords: ['startup funding', 'investor pitch', 'venture capital india', 'government grants', 'angel investment'],
    price: 5999,
    currency: 'INR',
  },
  P4: {
    title: 'Finance Stack - CFO-Level Financial Mastery for Startups',
    description: 'Build world-class financial infrastructure with complete accounting systems and strategic finance. 250+ templates included.',
    keywords: ['startup finance', 'financial planning', 'accounting systems', 'CFO skills', 'financial modeling'],
    price: 6999,
    currency: 'INR',
  },
  P5: {
    title: 'Legal Stack - Bulletproof Legal Framework for Indian Startups',
    description: 'Build bulletproof legal infrastructure with 300+ templates. Complete contract mastery and IP protection system.',
    keywords: ['startup legal', 'contract templates', 'intellectual property', 'legal framework', 'business law'],
    price: 7999,
    currency: 'INR',
  },
  P6: {
    title: 'Sales & GTM in India - Master Sales Course for Indian Startups',
    description: 'Transform into a revenue-generating machine with India-specific sales strategies. 75+ templates and systematic approach.',
    keywords: ['sales strategy', 'go-to-market', 'revenue generation', 'sales process', 'customer acquisition'],
    price: 6999,
    currency: 'INR',
  },
  P7: {
    title: 'State-wise Scheme Map - Navigate India\'s State Ecosystem',
    description: 'Master all 28 states + 8 UTs with 500+ schemes. Optimize multi-state presence with 30-50% cost savings.',
    keywords: ['government schemes', 'state benefits', 'startup incentives', 'policy navigation', 'government funding'],
    price: 4999,
    currency: 'INR',
  },
  P8: {
    title: 'Investor-Ready Data Room Mastery - Professional Fundraising',
    description: 'Build professional data room that accelerates fundraising and increases valuation. 50+ templates included.',
    keywords: ['data room', 'investor presentation', 'fundraising documents', 'due diligence', 'investor relations'],
    price: 9999,
    currency: 'INR',
  },
  P10: {
    title: 'Patent Mastery for Indian Startups - Complete IP Strategy',
    description: 'Master intellectual property from filing to monetization. 100+ templates for complete patent strategy.',
    keywords: ['patent filing', 'intellectual property', 'IP strategy', 'patent monetization', 'startup patents'],
    price: 7999,
    currency: 'INR',
  },
  P11: {
    title: 'Branding & Public Relations Mastery - Build Industry Recognition',
    description: 'Transform into recognized industry leader through strategic PR and brand building. 300+ templates included.',
    keywords: ['brand building', 'public relations', 'media coverage', 'industry recognition', 'founder branding'],
    price: 7999,
    currency: 'INR',
  },
  P12: {
    title: 'Marketing Mastery - Complete Growth Engine for Startups',
    description: 'Build data-driven marketing machine generating predictable growth. 500+ templates across all channels.',
    keywords: ['digital marketing', 'growth marketing', 'marketing automation', 'customer acquisition', 'marketing strategy'],
    price: 9999,
    currency: 'INR',
  },
  ALL_ACCESS: {
    title: 'All-Access Bundle - Complete Startup Mastery Program',
    description: 'Access all 30 courses with 33% savings. Complete startup education from idea to global scale.',
    keywords: ['startup bundle', 'complete program', 'startup education', 'entrepreneur course', 'business mastery'],
    price: 149999,
    currency: 'INR',
  },
} as const;

// Base SEO metadata
export const BASE_SEO: Metadata = {
  metadataBase: new URL('https://theindianstartup.in'),
  title: {
    template: '%s | The Indian Startup',
    default: 'The Indian Startup - Master Indian Startup Ecosystem',
  },
  description: 'Empower your startup journey with India-specific courses, funding database, and expert guidance. From idea to scale with modular products.',
  keywords: [
    'indian startup',
    'startup course',
    'entrepreneurship india',
    'startup funding',
    'business course',
    'startup education',
    'indian entrepreneur',
    'startup ecosystem',
    'business development',
    'startup mentorship',
  ],
  authors: [{ name: 'The Indian Startup Team' }],
  creator: 'The Indian Startup',
  publisher: 'The Indian Startup',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://theindianstartup.in',
    siteName: 'The Indian Startup',
    title: 'The Indian Startup - Master Indian Startup Ecosystem',
    description: 'Empower your startup journey with India-specific courses, funding database, and expert guidance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Indian Startup Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Indian Startup - Master Indian Startup Ecosystem',
    description: 'Empower your startup journey with India-specific courses, funding database, and expert guidance.',
    images: ['/twitter-image.png'],
    creator: '@theindianstartup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://theindianstartup.in',
  },
  category: 'Education',
};

// Generate product-specific SEO metadata
export function generateProductSEO(productCode: keyof typeof PRODUCT_SEO_DATA): Metadata {
  const product = PRODUCT_SEO_DATA[productCode];
  
  return {
    title: product.title,
    description: product.description,
    keywords: [...product.keywords, ...BASE_SEO.keywords as string[]],
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'website',
      images: [
        {
          url: `/og-${productCode.toLowerCase()}.png`,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [`/twitter-${productCode.toLowerCase()}.png`],
    },
  };
}

// Generate structured data for products
export function generateProductStructuredData(productCode: keyof typeof PRODUCT_SEO_DATA) {
  const product = PRODUCT_SEO_DATA[productCode];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: product.title,
    description: product.description,
    provider: {
      '@type': 'Organization',
      name: 'The Indian Startup',
      url: 'https://theindianstartup.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theindianstartup.in/logo.png',
      },
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      url: `https://theindianstartup.in/products/${productCode.toLowerCase()}`,
    },
    educationalLevel: 'Professional',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'entrepreneur',
    },
    keywords: product.keywords.join(', '),
    inLanguage: 'en-IN',
    isAccessibleForFree: false,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Organization',
        name: 'The Indian Startup',
      },
    },
  };
}

// Generate sitemap data
export function generateSitemap() {
  const baseUrl = 'https://theindianstartup.in';
  const currentDate = new Date().toISOString();

  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: '/pricing', priority: 0.9, changefreq: 'weekly' },
    { url: '/dashboard', priority: 0.8, changefreq: 'daily' },
    { url: '/community', priority: 0.7, changefreq: 'daily' },
    { url: '/resources', priority: 0.8, changefreq: 'weekly' },
    { url: '/portfolio', priority: 0.7, changefreq: 'weekly' },
    { url: '/signup', priority: 0.6, changefreq: 'monthly' },
    { url: '/auth/signin', priority: 0.5, changefreq: 'monthly' },
  ];

  const productPages = Object.keys(PRODUCT_SEO_DATA).map(productCode => ({
    url: `/products/${productCode.toLowerCase()}`,
    priority: 0.8,
    changefreq: 'weekly' as const,
  }));

  const allPages = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return sitemap;
}

// Generate robots.txt
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin
Disallow: /api/

# Allow specific API routes for SEO
Allow: /api/og/

Sitemap: https://theindianstartup.in/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;
}

// SEO monitoring and analytics
export class SEOMonitor {
  private static instance: SEOMonitor;
  
  static getInstance() {
    if (!SEOMonitor.instance) {
      SEOMonitor.instance = new SEOMonitor();
    }
    return SEOMonitor.instance;
  }

  // Track page performance
  trackPagePerformance(url: string, metrics: {
    loadTime?: number;
    renderTime?: number;
    interactiveTime?: number;
    seoScore?: number;
  }) {
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics
      fetch('/api/analytics/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          metrics,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {}); // Silent fail
    }
  }

  // Track SEO events
  trackSEOEvent(event: string, data: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        custom_map: { seo_data: data },
        ...data,
      });
    }
  }

  // Check page SEO health
  checkPageSEO(url: string): {
    hasTitle: boolean;
    hasDescription: boolean;
    hasKeywords: boolean;
    hasCanonical: boolean;
    hasOpenGraph: boolean;
    hasTwitterCard: boolean;
    hasStructuredData: boolean;
    score: number;
  } {
    if (typeof document === 'undefined') {
      return {
        hasTitle: false,
        hasDescription: false,
        hasKeywords: false,
        hasCanonical: false,
        hasOpenGraph: false,
        hasTwitterCard: false,
        hasStructuredData: false,
        score: 0,
      };
    }

    const checks = {
      hasTitle: !!document.querySelector('title')?.textContent,
      hasDescription: !!document.querySelector('meta[name="description"]')?.getAttribute('content'),
      hasKeywords: !!document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasOpenGraph: !!document.querySelector('meta[property^="og:"]'),
      hasTwitterCard: !!document.querySelector('meta[name^="twitter:"]'),
      hasStructuredData: !!document.querySelector('script[type="application/ld+json"]'),
    };

    const score = Object.values(checks).filter(Boolean).length / Object.keys(checks).length * 100;

    return { ...checks, score };
  }
}

export const seoMonitor = SEOMonitor.getInstance();

// Page-specific SEO configurations
export const PAGE_SEO_CONFIG = {
  '/': {
    title: 'The Indian Startup - Master Indian Startup Ecosystem',
    description: 'Empower your startup journey with India-specific courses, funding database, and expert guidance. From idea to scale with modular products.',
    canonical: 'https://theindianstartup.in',
  },
  '/pricing': {
    title: 'Startup Courses & Pricing - Modular Products for Indian Entrepreneurs',
    description: 'Choose from 12 specialized startup courses or get the All-Access Bundle. India-specific content with practical templates and expert guidance.',
    canonical: 'https://theindianstartup.in/pricing',
  },
  '/dashboard': {
    title: 'Startup Dashboard - Track Your Entrepreneurial Journey',
    description: 'Monitor your startup progress, access purchased courses, and track achievements in your personalized founder dashboard.',
    canonical: 'https://theindianstartup.in/dashboard',
  },
  '/community': {
    title: 'Startup Community - Connect with Indian Entrepreneurs',
    description: 'Join India\'s most active startup community. Network, share experiences, and get support from fellow entrepreneurs.',
    canonical: 'https://theindianstartup.in/community',
  },
  '/resources': {
    title: 'Startup Resources - Free Tools & Funding Database',
    description: 'Access comprehensive funding database, free tools, templates, and resources for Indian startups. 500+ funding sources included.',
    canonical: 'https://theindianstartup.in/resources',
  },
} as const;

// Generate meta tags for a specific page
export function generatePageSEO(path: keyof typeof PAGE_SEO_CONFIG): Metadata {
  const config = PAGE_SEO_CONFIG[path];
  
  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.canonical,
    },
    twitter: {
      title: config.title,
      description: config.description,
    },
  };
}

// SEO utility functions
export const SEOUtils = {
  // Generate breadcrumb schema
  generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  },

  // Generate FAQ schema
  generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  },

  // Generate organization schema
  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'The Indian Startup',
      url: 'https://theindianstartup.in',
      logo: 'https://theindianstartup.in/logo.png',
      description: 'Empowering Indian entrepreneurs with practical startup education and resources',
      foundingDate: '2023',
      email: 'support@theindianstartup.in',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: 'India',
      },
      sameAs: [
        'https://twitter.com/theindianstartup',
        'https://linkedin.com/company/theindianstartup',
        'https://github.com/lalrinsangsiama/theindianstartup',
      ],
    };
  },
};