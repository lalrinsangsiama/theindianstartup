import { Metadata } from 'next';

/**
 * Base site metadata configuration
 */
const SITE_CONFIG = {
  name: 'The Indian Startup',
  domain: 'theindianstartup.in',
  description: 'Empower your startup journey with India-specific playbooks, templates, and guidance.',
  twitterHandle: '@theindianstartup',
};

/**
 * Generate consistent metadata for all pages
 */
export function generatePageMetadata(options: {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const {
    title,
    description = SITE_CONFIG.description,
    path = '',
    ogImage = '/og-image.png',
    noIndex = false,
  } = options;

  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const canonicalUrl = `https://${SITE_CONFIG.domain}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(`https://${SITE_CONFIG.domain}`),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Generate metadata for product/course pages
 */
export function generateProductMetadata(options: {
  code: string;
  title: string;
  description: string;
  price: number;
}): Metadata {
  const { code, title, description, price } = options;

  return {
    ...generatePageMetadata({
      title,
      description,
      path: `/products/${code.toLowerCase()}`,
    }),
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': 'INR',
    },
  };
}

/**
 * Generate metadata for blog/content pages
 */
export function generateContentMetadata(options: {
  title: string;
  description: string;
  path: string;
  publishedAt?: string;
  author?: string;
}): Metadata {
  const { title, description, path, publishedAt, author } = options;

  const metadata = generatePageMetadata({
    title,
    description,
    path,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(author && { authors: [author] }),
    },
  };
}

/**
 * Default metadata for the site
 */
export const defaultMetadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(`https://${SITE_CONFIG.domain}`),
  keywords: [
    'startup',
    'india',
    'founder',
    'entrepreneurship',
    'incorporation',
    'funding',
    'compliance',
    'business',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: `https://${SITE_CONFIG.domain}`,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    creator: SITE_CONFIG.twitterHandle,
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
  verification: {
    // Add verification codes if needed
    // google: 'your-google-verification-code',
  },
};
