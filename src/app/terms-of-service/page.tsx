import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE_NAME} — terms and conditions for using our educational website.`,
  alternates: { canonical: '/terms-of-service' },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500 mb-8">
            <strong>Last updated: August 28, 2026</strong>
          </p>

          <p>
            Welcome to <strong>{SITE_NAME}</strong>.
          </p>

          <p>
            By accessing or using{' '}
            <a href={SITE_URL} className="text-gray-900 underline">
              {SITE_URL}
            </a>{' '}
            (the &ldquo;Website&rdquo;), you agree to comply with these Terms of Service. If you
            do not agree with these terms, please do not use the Website.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Purpose of the Website
            </h2>
            <p>
              {SITE_NAME} provides free educational mathematics resources, including practice
              quizzes, exam-style questions, explanations, study materials, and related
              educational content.
            </p>
            <p className="mt-4">
              The Website is intended for educational and informational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Educational Use
            </h2>
            <p>
              Our quizzes and practice materials are designed to help learners practice
              mathematical concepts and prepare for standardized mathematics assessments.
            </p>
            <p className="mt-4">
              Unless specifically stated otherwise, our questions are{' '}
              <strong>
                original practice questions inspired by common mathematical topics and exam
                formats
              </strong>
              . They should not be considered official examination questions.
            </p>
            <p className="mt-4">
              {SITE_NAME} is an independent educational website and is not affiliated with,
              endorsed by, or sponsored by the College Board, ACT, Inc., or any other
              examination organization unless explicitly stated.
            </p>
            <p className="mt-4">
              Names of examinations, organizations, and educational programs may be used for
              identification and informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Use of the Website
            </h2>
            <p>
              You may use the Website for lawful personal, educational, and non-commercial
              learning purposes.
            </p>
            <p className="mt-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the Website for unlawful purposes.</li>
              <li>Attempt to interfere with or disrupt the Website.</li>
              <li>Attempt to gain unauthorized access to systems or data.</li>
              <li>
                Copy, reproduce, redistribute, or commercially exploit substantial portions of
                our content without permission.
              </li>
              <li>
                Use automated methods to excessively access or scrape the Website in a manner
                that negatively affects its operation.
              </li>
              <li>
                Circumvent security, access controls, or other technical protections.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Intellectual Property
            </h2>
            <p>
              Unless otherwise stated, the Website and its original content, including text,
              questions, explanations, graphics, designs, logos, and other materials, are owned
              by or licensed to {SITE_NAME}.
            </p>
            <p className="mt-4">
              You may access and use the content for personal educational purposes.
            </p>
            <p className="mt-4">
              You may not reproduce, republish, distribute, modify, sell, or commercially
              exploit substantial portions of the Website&apos;s content without prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Accuracy of Educational Content
            </h2>
            <p>
              We make reasonable efforts to provide accurate and useful educational content.
            </p>
            <p className="mt-4">
              However, mathematical content, explanations, examples, and practice questions may
              occasionally contain errors or omissions.
            </p>
            <p className="mt-4">
              The Website is provided for educational practice and should not be considered a
              substitute for official examination materials, professional educational advice,
              or instructions issued by an examination organization.
            </p>
            <p className="mt-4">
              If you identify a possible error, please contact us so that we can review and
              correct it when appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. No Guarantee of Examination Results
            </h2>
            <p>
              Using our quizzes or educational resources does not guarantee any particular
              examination score, academic result, admission decision, or other outcome.
            </p>
            <p className="mt-4">
              Students should also consult official examination materials and requirements when
              preparing for an examination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. Third-Party Links and Services
            </h2>
            <p>
              The Website may contain links to third-party websites or services.
            </p>
            <p className="mt-4">
              These links are provided for convenience or informational purposes. We do not
              control third-party websites and are not responsible for their content,
              availability, privacy practices, or terms.
            </p>
            <p className="mt-4">
              Your use of third-party services is subject to the terms and policies of those
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Advertising</h2>
            <p>
              The Website may display advertisements provided by third-party advertising
              services, including Google and other advertising partners.
            </p>
            <p className="mt-4">
              Advertising helps support the operation and development of the Website.
            </p>
            <p className="mt-4">
              Advertisements are provided by third parties, and {SITE_NAME} does not necessarily
              endorse the products or services shown in advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              9. Website Availability
            </h2>
            <p>
              We aim to keep the Website available and functional, but we do not guarantee
              uninterrupted or error-free access.
            </p>
            <p className="mt-4">
              We may modify, suspend, or discontinue any part of the Website, including
              individual quizzes or features, at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              10. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by applicable law, {SITE_NAME} shall not be liable for
              indirect, incidental, consequential, or other losses arising from the use of, or
              inability to use, the Website or its educational content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              11. Changes to These Terms
            </h2>
            <p>We may update these Terms of Service from time to time.</p>
            <p className="mt-4">
              When changes are made, the updated version will be published on this page with a
              new &ldquo;Last updated&rdquo; date.
            </p>
            <p className="mt-4">
              Your continued use of the Website after changes are published constitutes
              acceptance of the updated terms, to the extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact</h2>
            <p>
              If you have questions regarding these Terms of Service, please contact us through
              our{' '}
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
