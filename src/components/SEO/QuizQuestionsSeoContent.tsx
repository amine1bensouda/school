import type { Quiz } from '@/lib/types';
import { stripHtml } from '@/lib/utils';

/**
 * Contenu questions rendu côté serveur (HTML initial) pour Googlebot.
 * Les énoncés + choix sont crawlables sans attendre le JS / "Loading quiz...".
 * L’UI interactive reste dans QuizPlayer (hydratation client).
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
      <h2>Questions in this quiz</h2>
      <ol>
        {questions.map((question, index) => {
          const text = stripHtml(
            question.texte_question ||
              question.title?.rendered ||
              question.content?.rendered ||
              `Question ${index + 1}`
          );
          const answers = question.reponses || question.acf?.reponses || [];

          return (
            <li key={question.id ?? index}>
              <p>{text}</p>
              {answers.length > 0 && (
                <ul>
                  {answers.map((answer, answerIndex) => (
                    <li key={answerIndex}>{stripHtml(answer.texte || '')}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
