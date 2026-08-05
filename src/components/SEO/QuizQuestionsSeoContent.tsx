import type { Quiz } from '@/lib/types';
import { stripHtml } from '@/lib/utils';

/**
 * Texte crawlable d’un énoncé : alt des images + HTML strippé.
 * Utile quand la question n’est qu’une image (cas fréquent en math).
 */
function questionPlainText(raw: string | undefined | null, fallback: string): string {
  if (!raw) return fallback;

  const withAlt = raw.replace(
    /<img\b[^>]*\balt\s*=\s*(["'])(.*?)\1[^>]*>/gi,
    (_match, _q: string, alt: string) => (alt.trim() ? ` ${alt.trim()} ` : ' ')
  );

  const plain = stripHtml(withAlt)
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return plain || fallback;
}

/**
 * Questions en HTML serveur (SSR) — visibles pour Google / Gemini / AdsBot.
 * Placées AVANT le QuizPlayer (JS) pour apparaître tôt dans le HTML.
 * Pas de <details> : certains fetchers IA le truncatent ou l’ignorent.
 */
export default function QuizQuestionsSeoContent({ quiz }: { quiz: Quiz }) {
  const questions = quiz.acf?.questions || [];
  if (questions.length === 0) return null;

  return (
    <section
      aria-label="Quiz questions"
      className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
      data-seo-quiz-questions="true"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Questions in this quiz ({questions.length})
      </h2>
      <ol className="mt-6 space-y-6 list-decimal list-inside">
        {questions.map((question, index) => {
          const text = questionPlainText(
            question.texte_question ||
              question.title?.rendered ||
              question.content?.rendered,
            `Question ${index + 1}`
          );
          const answers = question.reponses || question.acf?.reponses || [];

          return (
            <li key={question.id ?? index} className="text-gray-900">
              <span className="font-medium leading-relaxed">{text}</span>
              {answers.length > 0 && (
                <ul className="mt-2 ml-5 list-disc space-y-1 text-gray-700">
                  {answers.map((answer, answerIndex) => {
                    const answerText = questionPlainText(answer.texte, '');
                    if (!answerText) return null;
                    return <li key={answerIndex}>{answerText}</li>;
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
