import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: `How ${SITE_NAME} creates, reviews, and updates math quizzes and educational content.`,
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Editorial Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p>
            {SITE_NAME} ({SITE_URL}) publishes free math practice quizzes and study resources for students preparing
            for standardized exams. This policy explains how content is created, reviewed, and maintained.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. How Quizzes Are Created</h2>
            <p>
              Questions are written by educators and content editors familiar with major U.S. math assessments (such as
              ACT, SAT, and AP-style topics). Each quiz targets specific skills—algebra, functions, geometry, data
              analysis, and related areas—and uses clear language with unambiguous answer choices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Review and Accuracy</h2>
            <p>
              Before publication, quizzes are checked for mathematical correctness, answer-key consistency, and readable
              explanations. When users report an error via the contact form, we investigate and correct the item as soon
              as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Updates</h2>
            <p>
              Content is updated periodically when curricula shift, when better explanations are available, or when
              quality issues are found. Featured quizzes and high-traffic topics are prioritized for review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Independence and Disclaimers</h2>
            <p>
              Practice materials are independent study tools. They are not affiliated with, endorsed by, or official
              products of ACT, College Board, or other testing organizations unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact</h2>
            <p>
              Questions about content quality:{' '}
              <Link href="/contact-us" className="text-gray-900 underline">
                Contact Us
              </Link>{' '}
              or{' '}
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
