import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * robots.txt dynamique.
 * AdsBot-Google ignore User-agent: * → Allow explicite requis pour les landings quiz (Google Ads).
 */
export default function robots(): MetadataRoute.Robots {
  const disallowPrivate = [
    '/api/',
    '/admin/',
    '/dashboard/',
    '/login',
    '/register',
    '/categorie',
    '/categorie/',
    '/quiz/*/correction',
    '/quiz/*/results',
  ];

  return {
    rules: [
      {
        userAgent: 'AdsBot-Google',
        allow: ['/', '/quiz', '/quiz/', '/pages/', '/blogs/'],
        disallow: disallowPrivate,
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: ['/', '/quiz', '/quiz/', '/pages/', '/blogs/'],
        disallow: disallowPrivate,
      },
      // Gemini Apps / grounding (token robots, pas un crawler HTTP séparé)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: disallowPrivate,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowPrivate,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
