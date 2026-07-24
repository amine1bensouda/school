export interface SubmittedAnswer { questionId: string; answer: string }
export interface ScorableQuestion { id: string; type: string; answers: Array<{ text: string; isCorrect: boolean }> }

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export function scoreQuizAttempt(questions: ScorableQuestion[], submitted: SubmittedAnswer[]) {
  const byQuestion = new Map(submitted.map((item) => [item.questionId, normalize(item.answer)]));
  let correctAnswers = 0;
  for (const question of questions) {
    const selected = byQuestion.get(question.id);
    if (selected && question.answers.some((answer) => answer.isCorrect && normalize(answer.text) === selected)) {
      correctAnswers++;
    }
  }
  const totalQuestions = questions.length;
  return { score: correctAnswers, correctAnswers, totalQuestions,
    percentage: totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0 };
}
