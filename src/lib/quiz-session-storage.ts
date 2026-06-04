import type { Question } from '@/lib/types';

export interface QuizSessionData {
  version: 1;
  startedAt: number;
  durationSeconds: number;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  flaggedQuestions: number[];
  /** IDs des questions dans l'ordre affiché (mélange aléatoire) */
  questionOrder?: string[];
  /** Fin absolue du timer par question (timestamp ms) */
  questionTimers?: Record<number, { endsAt: number }>;
}

export function getQuizSessionKey(quizId: string | number): string {
  return `quiz-session-${quizId}`;
}

export function loadQuizSession(quizId: string | number): QuizSessionData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(getQuizSessionKey(quizId));
    if (!raw) return migrateLegacySession(quizId);
    const data = JSON.parse(raw) as QuizSessionData;
    if (data.version !== 1 || !data.startedAt) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveQuizSession(quizId: string | number, data: QuizSessionData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getQuizSessionKey(quizId), JSON.stringify(data));
}

export function clearQuizSession(quizId: string | number): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getQuizSessionKey(quizId));
  localStorage.removeItem(`quiz-progress-${quizId}`);
  localStorage.removeItem(`quiz-timer-${quizId}`);
  localStorage.removeItem(`quiz-start-time-${quizId}`);
  localStorage.removeItem(`quiz-flags-${quizId}`);
}

/** Temps restant global du quiz (secondes), ou null si sans limite */
export function getQuizTimeRemaining(session: QuizSessionData): number | null {
  if (!session.durationSeconds || session.durationSeconds <= 0) return null;
  const endsAt = session.startedAt + session.durationSeconds * 1000;
  return Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
}

export function getQuestionTimeRemaining(
  session: QuizSessionData,
  questionIndex: number
): number | null {
  const timer = session.questionTimers?.[questionIndex];
  if (!timer) return null;
  return Math.max(0, Math.floor((timer.endsAt - Date.now()) / 1000));
}

export function getQuestionId(question: Question): string {
  return String(question.id ?? question.texte_question?.slice(0, 32) ?? '');
}

/** Réordonne les questions selon une session sauvegardée */
export function orderQuestionsBySession(
  questions: Question[],
  questionOrder?: string[]
): Question[] {
  if (!questionOrder?.length) return questions;
  const byId = new Map(questions.map((q) => [getQuestionId(q), q]));
  const ordered: Question[] = [];
  for (const id of questionOrder) {
    const q = byId.get(id);
    if (q) {
      ordered.push(q);
      byId.delete(id);
    }
  }
  for (const q of byId.values()) ordered.push(q);
  return ordered.length > 0 ? ordered : questions;
}

export function buildQuestionOrder(questions: Question[]): string[] {
  return questions.map(getQuestionId);
}

function migrateLegacySession(quizId: string | number): QuizSessionData | null {
  if (typeof window === 'undefined') return null;

  const savedProgress = localStorage.getItem(`quiz-progress-${quizId}`);
  const savedStartTime = localStorage.getItem(`quiz-start-time-${quizId}`);
  const savedTimer = localStorage.getItem(`quiz-timer-${quizId}`);
  const savedFlags = localStorage.getItem(`quiz-flags-${quizId}`);

  if (!savedProgress && !savedStartTime) return null;

  let currentQuestionIndex = 0;
  let selectedAnswers: Record<number, string> = {};
  if (savedProgress) {
    try {
      const progress = JSON.parse(savedProgress);
      currentQuestionIndex = progress.currentQuestionIndex ?? 0;
      selectedAnswers = progress.selectedAnswers ?? {};
    } catch {
      /* ignore */
    }
  }

  let flaggedQuestions: number[] = [];
  if (savedFlags) {
    try {
      flaggedQuestions = JSON.parse(savedFlags);
    } catch {
      /* ignore */
    }
  }

  const startedAt = savedStartTime ? parseInt(savedStartTime, 10) : Date.now();
  let durationSeconds = 0;
  if (savedTimer && savedStartTime) {
    const remaining = parseInt(savedTimer, 10);
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    durationSeconds = remaining + elapsed;
  }

  const session: QuizSessionData = {
    version: 1,
    startedAt,
    durationSeconds,
    currentQuestionIndex,
    selectedAnswers,
    flaggedQuestions,
  };

  saveQuizSession(quizId, session);
  localStorage.removeItem(`quiz-progress-${quizId}`);
  localStorage.removeItem(`quiz-timer-${quizId}`);
  localStorage.removeItem(`quiz-start-time-${quizId}`);
  localStorage.removeItem(`quiz-flags-${quizId}`);

  return session;
}
