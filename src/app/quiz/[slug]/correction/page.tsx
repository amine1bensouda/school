import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getQuizBySlug } from '@/lib/wordpress';
import QuizCorrection from '@/components/Quiz/QuizCorrection';
import { SITE_URL } from '@/lib/constants';
import { stripHtml } from '@/lib/utils';

export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  let quiz = await getQuizBySlug(decodedSlug);
  if (!quiz && decodedSlug !== params.slug) {
    quiz = await getQuizBySlug(params.slug);
  }

  if (!quiz) {
    return {
      title: 'Quiz Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = stripHtml(quiz.title.rendered);
  const canonicalSlug = quiz.slug || decodedSlug;
  const quizCanonical = `/quiz/${encodeURIComponent(canonicalSlug)}`;

  return {
    title: `Correction - ${title}`,
    description: `Answer key and explanations for: ${title}`,
    alternates: { canonical: quizCanonical },
    robots: { index: false, follow: false },
    openGraph: {
      title: `Correction - ${title}`,
      description: `Answer key and explanations for: ${title}`,
      type: 'article',
      url: `${SITE_URL}${quizCanonical}`,
    },
  };
}

export default async function QuizCorrectionPage({ params }: PageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  let quiz = await getQuizBySlug(decodedSlug);
  if (!quiz && decodedSlug !== params.slug) {
    quiz = await getQuizBySlug(params.slug);
  }

  if (!quiz) {
    notFound();
  }

  const canonicalSlug = quiz.slug || decodedSlug;
  if (decodedSlug !== canonicalSlug && params.slug !== canonicalSlug) {
    permanentRedirect(`/quiz/${encodeURIComponent(canonicalSlug)}/correction`);
  }

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Quiz Correction
          </h1>
          <p className="text-lg text-gray-600">
            {stripHtml(quiz.title.rendered)}
          </p>
        </div>

        <QuizCorrection quiz={quiz} />
      </div>
    </div>
  );
}
