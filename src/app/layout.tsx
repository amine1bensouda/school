import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import GoogleAnalytics from '@/components/Analytics/GoogleAnalytics';
import NavigationProgress from '@/components/Layout/NavigationProgress';
import ConditionalLayout from '@/components/Layout/ConditionalLayout';
import CookieBanner from '@/components/Layout/CookieBanner';
import SiteSchema from '@/components/SEO/SiteSchema';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { getAllPublishedPagesData } from '@/lib/cache';
import type { PracticePageLink } from '@/lib/practice-pages';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['quiz', 'test', 'mathematics', 'math', 'education', 'learning'],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
    google: ['aqePUc7IOnNBwXrNGJFYlioTwHiWw7VugJH7lJ_BmVc', 'zgHDyL-ZuEVF3FHAtIQ3v7jpIbUBnARlfF11hM6_EXM'],
  },
  icons: {
    icon: '/logo_maths.svg',
    shortcut: '/logo_maths.svg',
    apple: '/logo_maths.svg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let practicePages: PracticePageLink[] = [];
  try {
    const pages = await getAllPublishedPagesData();
    practicePages = pages
      .map((page) => ({
        title: page.title,
        slug: page.slug,
      }))
      .sort((a, b) => a.title.localeCompare(b.title, 'en'));
  } catch {
    practicePages = [];
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="font-sans">
        <SiteSchema />
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <ConditionalLayout practicePages={practicePages}>{children}</ConditionalLayout>
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
