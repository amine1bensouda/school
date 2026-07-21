import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `How ${SITE_NAME} uses cookies for analytics, advertising, and site functionality.`,
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit {SITE_NAME} ({SITE_URL}).
              They help the site work properly, remember preferences, and understand how visitors use our pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Cookies We Use</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Essential cookies</strong> — required for login sessions, security, and basic site operation.
              </li>
              <li>
                <strong>Analytics cookies</strong> — Google Analytics (GA4) to measure traffic, page performance, and quiz engagement.
              </li>
              <li>
                <strong>Advertising cookies</strong> — may be used if Google Ads or Google AdSense is enabled, to measure campaign performance and show relevant ads.
              </li>
              <li>
                <strong>Preference cookies</strong> — remember choices such as cookie consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Your Choices</h2>
            <p>
              You can accept or decline non-essential cookies via our cookie banner. You can also block cookies in your
              browser settings. Declining analytics/ads cookies will not prevent you from using quizzes, but may limit
              personalized measurement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Third Parties</h2>
            <p>
              Third-party providers such as Google may set their own cookies when Analytics or Ads scripts load. Their
              use of data is governed by their respective policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. More Information</h2>
            <p>
              See our{' '}
              <Link href="/privacy-policy" className="text-gray-900 underline">
                Privacy Policy
              </Link>{' '}
              or contact us at{' '}
              <a href="mailto:contact@schoolofmathematics.com" className="text-gray-900 underline">
                contact@schoolofmathematics.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
