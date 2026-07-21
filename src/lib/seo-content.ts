import { stripHtml, difficultyToEnglish, categoryToEnglish, formatDuration } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

/** Intro 150–220 mots pour éviter le thin content sur les landing quiz. */
export function buildQuizIntro(params: {
  title: string;
  category?: string;
  difficulty?: string;
  questionCount?: number;
  durationMinutes?: number;
  existingExcerptPlain?: string;
}): string {
  const title = params.title.trim();
  const category = params.category ? categoryToEnglish(params.category) : '';
  const difficulty = params.difficulty
    ? difficultyToEnglish(params.difficulty)
    : '';
  const qCount = params.questionCount && params.questionCount > 0 ? params.questionCount : null;
  const duration =
    params.durationMinutes && params.durationMinutes > 0
      ? formatDuration(params.durationMinutes)
      : null;

  const existing = (params.existingExcerptPlain || '').trim();
  // Si l'extrait admin est déjà assez long, on le garde tel quel côté rendu HTML.
  if (existing.length >= 280) {
    return '';
  }

  const parts: string[] = [];
  parts.push(
    `This free ${title} practice quiz from ${SITE_NAME} helps you build exam-ready math skills with clear scoring and step-by-step review.`
  );

  if (category) {
    parts.push(
      `It is designed for ${category} learners who want targeted practice before test day.`
    );
  } else {
    parts.push(
      `It is designed for students preparing for standardized math exams who want focused, timed practice.`
    );
  }

  if (qCount || duration || difficulty) {
    const bits: string[] = [];
    if (qCount) bits.push(`${qCount} questions`);
    if (duration) bits.push(`about ${duration}`);
    if (difficulty && difficulty !== 'Intermediate') bits.push(`${difficulty} difficulty`);
    parts.push(`Expect ${bits.join(', ')}.`);
  }

  parts.push(
    `Work through each problem carefully, then use the answer explanations to understand mistakes and strengthen weak topics. Retake the quiz after reviewing to track improvement and build confidence under exam conditions.`
  );

  return parts.join(' ');
}

export function buildQuizFaqs(params: {
  title: string;
  category?: string;
  questionCount?: number;
  minimumScore?: number;
}): SeoFaqItem[] {
  const title = params.title.trim();
  const category = params.category ? categoryToEnglish(params.category) : 'math exams';
  const qCount = params.questionCount && params.questionCount > 0 ? params.questionCount : null;
  const minScore = params.minimumScore ?? 70;

  return [
    {
      question: `Is the ${title} quiz free?`,
      answer: `Yes. ${SITE_NAME} provides this quiz and most practice tools free of charge. You can start without a paid subscription.`,
    },
    {
      question: 'How does scoring work?',
      answer: `Your score is the percentage of correct answers. A passing score is typically ${minScore}%. After you finish, you can review each question with detailed explanations.`,
    },
    {
      question: 'Are these official-style questions?',
      answer: `Questions are written to mirror the style, difficulty, and topics found on major ${category} assessments. They are practice materials, not official exam questions.`,
    },
    {
      question: qCount
        ? `How many questions are in this quiz?`
        : 'How should I use this quiz to study?',
      answer: qCount
        ? `This quiz includes ${qCount} questions. Complete it in one sitting when possible, then review incorrect answers before retaking.`
        : `Complete the quiz in one sitting when possible, note the topics you miss, review those concepts, then retake the quiz to measure progress.`,
    },
  ];
}

/** Intro longue pour pages catégorie (objectif ~500+ mots via paragraphes structurés). */
export function buildCategorySeoContent(params: {
  name: string;
  description?: string | null;
  courseCount: number;
}): { intro: string; sections: Array<{ heading: string; body: string }>; faqs: SeoFaqItem[] } {
  const name = params.name.trim();
  const courseCount = params.courseCount;
  const custom = (params.description || '').trim();

  const intro = custom
    ? custom
    : `${name} practice on ${SITE_NAME} gives students structured math preparation with exam-style quizzes, clear scoring, and detailed answer explanations. Whether you are reviewing fundamentals or sharpening advanced skills, this category organizes courses and quizzes so you can study efficiently and track progress.`;

  const sections = [
    {
      heading: `What you will practice in ${name}`,
      body: `Each ${name} course groups related quizzes by topic so you can focus on one skill at a time. Questions emphasize conceptual understanding, multi-step reasoning, and the kinds of traps that appear on timed exams. Use the course list below to choose a module, then complete quizzes in order of increasing difficulty when available.`,
    },
    {
      heading: 'How to study effectively',
      body: `Start with a diagnostic quiz to identify weak areas. Review explanations carefully—especially for mistakes driven by rushed reading or incomplete algebra. Then retake the same quiz after 24–48 hours. Consistent short sessions (20–40 minutes) usually outperform rare marathon study blocks for math retention.`,
    },
    {
      heading: 'Scoring and progress',
      body: `Scores are calculated as the percentage of correct answers. Aim to pass each quiz before moving to the next topic. If your score is below the passing threshold, revisit the related lessons or explanations, then try again. Free practice means you can repeat quizzes as often as needed without limits.`,
    },
    {
      heading: `Why ${name} practice matters`,
      body: `Strong ${name} performance depends on fluency with core procedures and the ability to apply them under time pressure. Targeted quizzes help you convert passive review into active problem solving—the skill that actually improves exam scores.`,
    },
  ];

  if (courseCount > 0) {
    sections.push({
      heading: 'Available courses',
      body: `This category currently includes ${courseCount} course${courseCount === 1 ? '' : 's'}. Browse the cards below to open modules, lessons, and quizzes tailored to ${name}.`,
    });
  }

  const faqs: SeoFaqItem[] = [
    {
      question: `Is ${name} practice free on ${SITE_NAME}?`,
      answer: `Yes. You can access ${name} courses and quizzes for free and practice as many times as you need.`,
    },
    {
      question: 'Are questions similar to real exams?',
      answer: `Quizzes are written to reflect the style and difficulty of major standardized math exams. They are practice tools and are not official test materials.`,
    },
    {
      question: 'How should I start if I am a beginner?',
      answer: `Begin with the first course or the easiest quizzes in the list, review every explanation, then gradually move to harder sets as your accuracy improves.`,
    },
  ];

  return { intro, sections, faqs };
}

export function buildStudyTip(percentage: number, category?: string): string {
  const topic = category ? categoryToEnglish(category) : 'the topics you missed';
  if (percentage >= 90) {
    return `Strong result. Keep momentum by attempting a related quiz at the same or slightly higher difficulty, and review any single miss carefully so it does not repeat on exam day.`;
  }
  if (percentage >= 70) {
    return `You passed. Before the next quiz, spend 15–20 minutes reviewing ${topic}—especially the questions you missed—and retry this set once your accuracy feels steadier.`;
  }
  return `Based on your score, focus on reviewing ${topic} fundamentals (definitions, formulas, and common setups) before attempting the next quiz. Re-read the explanations for incorrect answers, then retake this quiz to measure improvement.`;
}
