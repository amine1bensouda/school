import type { Quiz } from '@/lib/types';
import { SITE_URL } from '@/lib/constants';
import { stripHtml } from '@/lib/utils';
import { safeJsonLd } from '@/lib/sanitize-html';
import { buildQuizPublicTitle } from '@/lib/seo-meta';

interface QuizSchemaProps {
  quiz: Quiz;
}

/**
 * Schema Quiz allégé : métadonnées uniquement.
 * Les énoncés ne sont pas dupliqués ici (déjà dans QuizQuestionsSeoContent).
 */
export default function QuizSchema({ quiz }: QuizSchemaProps) {
  const questionCount = quiz.acf?.questions?.length || 0;
  const title = buildQuizPublicTitle({
    title: stripHtml(quiz.title.rendered),
    category: quiz.acf?.categorie,
    slug: quiz.slug,
  });
  const description = stripHtml(quiz.excerpt?.rendered || quiz.content?.rendered || '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: title,
    description,
    url: `${SITE_URL}/quiz/${encodeURIComponent(quiz.slug)}`,
    ...(quiz.featured_media_url && {
      image: quiz.featured_media_url,
    }),
    ...(quiz.acf?.duree_estimee && {
      timeRequired: `PT${quiz.acf.duree_estimee}M`,
    }),
    ...(quiz.acf?.niveau_difficulte && {
      educationalLevel: quiz.acf.niveau_difficulte,
    }),
    numberOfQuestions: questionCount,
    isAccessibleForFree: true,
    ...(quiz.acf?.categorie && {
      about: {
        '@type': 'Thing',
        name: quiz.acf.categorie,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
