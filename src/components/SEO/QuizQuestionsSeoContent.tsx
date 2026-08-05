import type { Quiz } from '@/lib/types';
import { stripHtml } from '@/lib/utils';

function questionPlainText(raw: string | undefined | null, fallback: string): string {
  const plain = stripHtml(raw || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain || fallback;
}

/**
 * Questions en HTML serveur (SSR) — visibles pour Google/AdsBot.
 * Modèle sat-mini-exam-63 : énoncés + choix dans le premier HTML, sans JS.
 * Affiché dans un <details> ouvert pour compter comme contenu réel (pas thin/sr-only).
 */
export default function QuizQuestionsSeoContent({ quiz }: { quiz: Quiz }) {
  const questions = quiz.acf?.questions || [];
  if (questions.length === 0) return null;

  return (
    <section
      aria-label="Quiz questions for search engines"
      className="mt-10 mb-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
      data-seo-quiz-questions="true"
    >
      <details className="group" open>
        <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Questions in this quiz ({questions.length})
          </h2>
          <span className="text-sm text-gray-500 group-open:hidden">Show all</span>
          <span className="text-sm text-gray-500 hidden group-open:inline">Hide</span>
        </summary>
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
      </details>
    </section>
  );
}
