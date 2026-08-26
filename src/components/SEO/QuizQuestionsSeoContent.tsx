import type { Quiz } from '@/lib/types';
import { questionPlainTextForSeo } from '@/lib/seo-questions';

/**
 * Une seule copie texte des questions dans le HTML serveur (SSR).
 * sr-only : crawlable sans doublon visuel. Pas de noscript (évite la double injection).
 */
export default function QuizQuestionsSeoContent({ quiz }: { quiz: Quiz }) {
  const questions = quiz.acf?.questions || [];
  if (questions.length === 0) return null;

  return (
    <section
      aria-label="Quiz questions for search engines"
      className="sr-only"
      data-seo-quiz-questions="true"
    >
      <h2>Questions in this quiz ({questions.length})</h2>
      <ol>
        {questions.map((question, index) => {
          const text = questionPlainTextForSeo(
            question.texte_question ||
              question.title?.rendered ||
              question.content?.rendered,
            `Question ${index + 1}`
          );
          const answers = question.reponses || question.acf?.reponses || [];

          return (
            <li key={question.id ?? index}>
              <p>{text}</p>
              {answers.length > 0 && (
                <ul>
                  {answers.map((answer, answerIndex) => {
                    const answerText = questionPlainTextForSeo(answer.texte, '');
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
