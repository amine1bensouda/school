import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * robots.txt dynamique.
 * Les quiz individuels restent crawlables pour que Google lise leur noindex.
 * Les pages de cours et de leçons restent autorisées.
 * AdsBot-Google ignore User-agent: * → Allow explicite requis.
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
