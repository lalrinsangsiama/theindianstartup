import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pricing',
          '/login',
          '/signup',
          '/community',
          '/journey/day/*',
        ],
        disallow: [
          '/dashboard/*',
          '/portfolio/*',
          '/settings/*',
          '/admin/*',
          '/api/*',
          '/onboarding',
          '/auth/*',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://theindianstartup.in/sitemap.xml',
  };
}