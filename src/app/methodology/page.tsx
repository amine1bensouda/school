import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Methodology',
  description: `How ${SITE_NAME} designs math quizzes, learning paths, and scoring for exam preparation.`,
  alternates: { canonical: '/methodology' },
};

export default function MethodologyPage() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Methodology</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p>
            {SITE_NAME} ({SITE_URL}) helps students improve math scores through deliberate practice: short quizzes, clear
            feedback, and repeated attempts on weak topics.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Exams and Topics Covered</h2>
            <p>
              Our courses and quizzes focus on skills commonly tested on major U.S. math assessments, including algebra,
              functions, geometry, trigonometry basics, and data analysis. Content is organized by course and module so
              learners can follow a logical path.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Learning Goals</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Build fluency with core procedures under mild time pressure</li>
              <li>Strengthen conceptual understanding through explained solutions</li>
              <li>Identify weak topics quickly via percentage scoring</li>
              <li>Encourage spaced practice by making quizzes free and repeatable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Question Design</h2>
            <p>
              Items emphasize realistic wording, distractors that reflect common mistakes, and explanations that show
              both the correct method and why other options fail. Where helpful, we include step-by-step reasoning rather
              than answer-only keys.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Scoring</h2>
            <p>
              Scores are the percentage of correct answers. Passing thresholds (often around 70%) signal readiness to
              move on. After each quiz, students can review corrections and try related quizzes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Related Resources</h2>
            <p>
              See our{' '}
              <Link href="/editorial-policy" className="text-gray-900 underline">
                Editorial Policy
              </Link>{' '}
              and{' '}
              <Link href="/about-us" className="text-gray-900 underline">
                About Us
              </Link>{' '}
              pages, or browse{' '}
              <Link href="/quiz" className="text-gray-900 underline">
                all exams
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
