import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_NAME} — how we collect, use, and protect your information.`,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500 mb-8">
            <strong>Last updated: August 28, 2026</strong>
          </p>

          <p>
            At <strong>{SITE_NAME}</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;the Website&rdquo;), we respect your privacy and are committed to
            protecting your personal information.
          </p>

          <p>
            This Privacy Policy explains what information we may collect, how we use
            it, how cookies and advertising technologies may be used, and the choices
            available to you when using{' '}
            <a href={SITE_URL} className="text-gray-900 underline">
              {SITE_URL}
            </a>
            .
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p>Depending on how you use the Website, we may collect limited information such as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Information you voluntarily provide through contact forms or other forms
                on the Website.
              </li>
              <li>Information related to your use of quizzes and educational content.</li>
              <li>
                Technical information such as IP address, browser type, device type,
                operating system, referring pages, and approximate location.
              </li>
              <li>
                Usage information, such as pages visited, interactions with the Website,
                and general website performance data.
              </li>
            </ul>
            <p className="mt-4">
              We do not require users to create an account in order to access the majority
              of our educational content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. How We Use Information
            </h2>
            <p>We may use information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and improve our educational content and quizzes.</li>
              <li>Operate, maintain, and secure the Website.</li>
              <li>Respond to questions and requests.</li>
              <li>Understand how visitors use the Website.</li>
              <li>Detect and prevent abuse, fraud, and security issues.</li>
              <li>Measure website performance and improve the user experience.</li>
              <li>Display advertising where applicable and where permitted by law.</li>
            </ul>
            <p className="mt-4">We do not sell users&apos; personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Cookies and Similar Technologies
            </h2>
            <p>
              The Website may use cookies and similar technologies for essential
              functionality, analytics, security, preferences, and advertising.
            </p>
            <p className="mt-4">
              Essential cookies may be required for the Website to function properly.
            </p>
            <p className="mt-4">
              Where required by applicable law, non-essential cookies and similar
              technologies will only be used after obtaining the appropriate user consent.
            </p>
            <p className="mt-4">
              You can manage your cookie preferences through the cookie consent mechanism
              available on the Website and, depending on your browser, through your browser
              settings.
            </p>
            <p className="mt-4">
              For more information, please see our{' '}
              <Link href="/cookie-policy" className="text-gray-900 underline">
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Google Advertising
            </h2>
            <p>
              We may use Google and other third-party advertising providers to display
              advertisements on the Website.
            </p>
            <p className="mt-4">
              These providers may use cookies or similar technologies to provide, measure,
              and personalize advertising, subject to applicable laws and the choices and
              consent provided by users where required.
            </p>
            <p className="mt-4">
              Google may use information collected through its advertising technologies in
              accordance with its applicable policies.
            </p>
            <p className="mt-4">
              Users can learn more about how Google uses information in advertising through
              Google&apos;s privacy resources and can manage available advertising preferences
              through their Google account or Google&apos;s advertising settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Analytics</h2>
            <p>
              We may use analytics services to understand how visitors interact with the
              Website and to improve its content, functionality, and performance.
            </p>
            <p className="mt-4">
              Analytics technologies may collect information such as pages viewed, approximate
              location, device information, browser information, and interactions with the
              Website.
            </p>
            <p className="mt-4">
              Where required by applicable law, the use of non-essential analytics
              technologies is subject to user consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. Educational Content and Children
            </h2>
            <p>
              {SITE_NAME} provides educational mathematics resources for students and other
              learners.
            </p>
            <p className="mt-4">
              We do not knowingly request or intentionally collect unnecessary personal
              information from children.
            </p>
            <p className="mt-4">
              The Website is designed primarily to provide educational content and does not
              require users to provide personal information simply to access our general
              quizzes and learning materials.
            </p>
            <p className="mt-4">
              If you believe that a child has provided personal information to us
              unnecessarily, please contact us so that we can review the information and
              take appropriate action.
            </p>
            <p className="mt-4">
              Parents or guardians who have concerns about personal information relating to
              a child may contact us using the information provided on our{' '}
              <Link href="/contact-us" className="text-gray-900 underline">
                Contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. Third-Party Services
            </h2>
            <p>
              The Website may contain links to or use services provided by third parties,
              including advertising, analytics, hosting, security, or other service providers.
            </p>
            <p className="mt-4">
              These third parties may process information according to their own privacy
              policies.
            </p>
            <p className="mt-4">
              We are not responsible for the privacy practices of third-party websites or
              services that we do not control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect information
              against unauthorized access, loss, misuse, alteration, or disclosure.
            </p>
            <p className="mt-4">
              However, no internet transmission or electronic storage system can be
              guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Data Retention</h2>
            <p>
              We retain information only for as long as reasonably necessary for the purposes
              described in this Privacy Policy, to provide our services, comply with legal
              obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              10. Your Privacy Rights
            </h2>
            <p>
              Depending on your location and applicable law, you may have rights concerning
              your personal information, including rights to access, correct, delete, restrict,
              or object to certain processing.
            </p>
            <p className="mt-4">
              To exercise an applicable privacy right or ask a privacy-related question,
              please contact us through our{' '}
              <Link href="/contact-us" className="text-gray-900 underline">
                Contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              Website, services, technologies, or legal requirements.
            </p>
            <p className="mt-4">
              Any changes will be published on this page with an updated &ldquo;Last
              updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices,
              please contact us through our{' '}
              <Link href="/contact-us" className="text-gray-900 underline">
                Contact page
              </Link>
              .
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>{SITE_NAME}</strong>
              </p>
              <p>
                Website:{' '}
                <a href={SITE_URL} className="text-gray-900 underline">
                  {SITE_URL}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
