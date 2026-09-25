import Link from 'next/link';
import type { CourseGuide } from '@/lib/course-guides';
import { courseGuideKey } from '@/lib/course-guides';
import type { CourseLesson } from '@/lib/course-lessons';
import FaqSchema from '@/components/SEO/FaqSchema';
import ShowMore from '@/components/Course/ShowMore';
import ExamGrid, { type ExamCard } from '@/components/Course/ExamGrid';

export type LandingQuiz = ExamCard;

export type LandingModule = {
  title: string;
  quizzes: LandingQuiz[];
};

export type RelatedCourse = {
  title: string;
  slug: string;
  moduleCount: number;
  totalQuizzes: number;
};

const SCORE_BANDS: Record<string, { title: string; bands: { range: string; label: string }[] }> = {
  'sat-math': {
    title: 'SAT Math score overview',
    bands: [
      { range: '200–400', label: 'Needs work' },
      { range: '400–600', label: 'Below average' },
      { range: '600–700', label: 'Competitive' },
      { range: '700–750', label: 'Strong' },
      { range: '750–800', label: 'Excellent' },
    ],
  },
  'psat-nmsqt': {
    title: 'PSAT/NMSQT Math score overview',
    bands: [
      { range: '160–380', label: 'Needs work' },
      { range: '380–540', label: 'Below average' },
      { range: '540–640', label: 'Competitive' },
      { range: '640–720', label: 'Strong' },
      { range: '720–760', label: 'Excellent' },
    ],
  },
  'psat-8-9-math': {
    title: 'PSAT 8/9 Math score overview',
    bands: [
      { range: '120–360', label: 'Needs work' },
      { range: '360–480', label: 'Below average' },
      { range: '480–580', label: 'Competitive' },
      { range: '580–660', label: 'Strong' },
      { range: '660–720', label: 'Excellent' },
    ],
  },
  'act-math': {
    title: 'ACT Math score overview',
    bands: [
      { range: '1–15', label: 'Needs work' },
      { range: '16–19', label: 'Below average' },
      { range: '20–24', label: 'Competitive' },
      { range: '25–29', label: 'Strong' },
      { range: '30–36', label: 'Excellent' },
    ],
  },
  'ap-calculus-ab': {
    title: 'AP Calculus AB score overview',
    bands: [
      { range: '1', label: 'No recommendation' },
      { range: '2', label: 'Possibly qualified' },
      { range: '3', label: 'Qualified' },
      { range: '4', label: 'Well qualified' },
      { range: '5', label: 'Extremely well qualified' },
    ],
  },
  'ap-calculus-bc': {
    title: 'AP Calculus BC score overview',
    bands: [
      { range: '1', label: 'No recommendation' },
      { range: '2', label: 'Possibly qualified' },
      { range: '3', label: 'Qualified' },
      { range: '4', label: 'Well qualified' },
      { range: '5', label: 'Extremely well qualified' },
    ],
  },
  'ap-precalculus': {
    title: 'AP Precalculus score overview',
    bands: [
      { range: '1', label: 'No recommendation' },
      { range: '2', label: 'Possibly qualified' },
      { range: '3', label: 'Qualified' },
      { range: '4', label: 'Well qualified' },
      { range: '5', label: 'Extremely well qualified' },
    ],
  },
};

function moduleKind(title: string): 'full' | 'mini' | 'topic' {
  const value = title.toLowerCase();
  if (/full practice exam|full exam|full-length|simulation exam/.test(value)) return 'full';
  if (/mini[-\s]?exam|timed mini/.test(value)) return 'mini';
  return 'topic';
}

function quizChip(quiz: LandingQuiz) {
  return (
    <Link
      key={quiz.slug}
      href={`/quiz/${encodeURIComponent(quiz.slug)}`}
      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-gray-900"
    >
      {quiz.title}
      <span className="ml-1 text-gray-400" aria-hidden>
        →
      </span>
    </Link>
  );
}

interface CourseLandingProps {
  courseTitle: string;
  courseSlug: string;
  description?: string | null;
  guide?: CourseGuide;
  lessons: CourseLesson[];
  modules: LandingModule[];
  related: RelatedCourse[];
}

export default function CourseLanding({
  courseTitle,
  courseSlug,
  description,
  guide,
  lessons,
  modules,
  related,
}: CourseLandingProps) {
  const topicModules = modules.filter((module) => moduleKind(module.title) === 'topic' && module.quizzes.length > 0);
  const fullExams = modules
    .filter((module) => moduleKind(module.title) === 'full')
    .flatMap((module) => module.quizzes);
  const miniExams = modules
    .filter((module) => moduleKind(module.title) === 'mini')
    .flatMap((module) => module.quizzes);
  const quizCount = modules.reduce((sum, module) => sum + module.quizzes.length, 0);
  const firstQuiz = topicModules[0]?.quizzes[0] ?? modules.find((module) => module.quizzes[0])?.quizzes[0];
  const scores = SCORE_BANDS[courseGuideKey(courseSlug)];
  const headline = guide?.headline ?? 'Practice by topic, then try a full set';
  const summary =
    guide?.summary ??
    description?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ??
    `Free ${courseTitle} practice. Work through topic quizzes, then longer sets when the method is clear.`;

  return (
    <div className="bg-white">
      {guide && <FaqSchema items={guide.faq} />}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-5xl">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-1.5">›</span>
          <Link href="/quiz" className="hover:text-gray-900">Exams</Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-900">{courseTitle}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Free {guide?.name ?? courseTitle} Practice
            <span className="block mt-2 font-serif italic font-medium text-gray-700">{headline}</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-3xl">{summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {firstQuiz && (
              <Link
                href={`/quiz/${encodeURIComponent(firstQuiz.slug)}`}
                className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Start Free Practice →
              </Link>
            )}
            <a
              href="#practice"
              className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 hover:border-gray-900"
            >
              Browse All Topics
            </a>
          </div>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { value: String(quizCount), label: 'Quizzes' },
              { value: String(topicModules.length), label: 'Topic modules' },
              { value: String(fullExams.length), label: 'Full practice sets' },
              { value: String(miniExams.length), label: 'Timed mini-exams' },
              { value: '$0', label: 'Cost, forever' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-gray-200 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="mb-12 space-y-4 text-gray-700 leading-relaxed">
          {(guide?.introduction ?? []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
            Completely free. Every quiz on this page can be opened without an account. The site is supported by display advertising.
          </p>
        </section>

        {guide && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{guide.overviewTitle}</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {guide.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {scores && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{scores.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {scores.bands.map((band) => (
                <div key={band.range} className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="font-bold text-gray-900">{band.range}</p>
                  <p className="text-sm text-gray-600">{band.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              These ranges are general checkpoints. A score on this site is practice feedback, not an official result.
            </p>
          </section>
        )}

        {lessons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lessons</h2>
            <p className="text-gray-600 mb-4">Read the explanation, then use the quizzes below to practice the same idea.</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lessons.map((lesson, index) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/quiz/course/${encodeURIComponent(courseSlug)}/lesson/${lesson.slug}`}
                    className="block h-full rounded-xl border border-gray-200 p-4 hover:border-gray-900"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Lesson {index + 1}
                    </span>
                    <span className="mt-1 block font-semibold text-gray-900">{lesson.title}</span>
                    <span className="mt-1 block text-sm text-gray-600">{lesson.summary}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section id="practice" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice by topic</h2>
          <p className="text-gray-600 mb-6">
            {topicModules.length} modules covering this course. Drill a weak topic before you open a longer set.
          </p>
          <div className="space-y-8">
            {topicModules.map((module) => (
              <div key={module.title}>
                <h3 className="text-lg font-bold text-gray-900">
                  {module.title}
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    {module.quizzes.length} quiz{module.quizzes.length === 1 ? '' : 'zes'}
                  </span>
                </h3>
                <div className="mt-3">
                  <ShowMore
                    initial={16}
                    moreLabel={`Show all ${module.quizzes.length} quizzes`}
                  >
                    {module.quizzes.map((quiz) => quizChip(quiz))}
                  </ShowMore>
                </div>
              </div>
            ))}
          </div>
        </section>

        {fullExams.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Full-length practice exams</h2>
            <p className="text-gray-600 mb-6">
              {fullExams.length} longer sets. Take the parts back to back when you want a realistic session.
            </p>
            <ExamGrid
              exams={fullExams}
              initial={12}
              moreLabel={`Show all ${fullExams.length} full exams`}
            />
          </section>
        )}

        {miniExams.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Timed mini-exams</h2>
            <p className="text-gray-600 mb-6">
              Short timed sets for a daily session. Start these after the topic quizzes feel familiar.
            </p>
            <ExamGrid
              exams={miniExams}
              initial={12}
              moreLabel={`Show all ${miniExams.length} mini-exams`}
            />
          </section>
        )}

        {guide && guide.tips.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips before you practice</h2>
            <ol className="space-y-3">
              {guide.tips.map((tip, index) => (
                <li key={tip} className="flex gap-3 text-gray-700">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {guide && guide.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
            <dl className="space-y-5">
              {guide.faq.map((item) => (
                <div key={item.question} className="border-b border-gray-100 pb-5">
                  <dt className="font-semibold text-gray-900">{item.question}</dt>
                  <dd className="mt-1 text-gray-700 leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Other free question banks</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/quiz/course/${encodeURIComponent(item.slug)}`}
                    className="block rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-900"
                  >
                    <span className="font-semibold text-gray-900">{item.title}</span>
                    <span className="mt-1 block text-sm text-gray-500">
                      {item.moduleCount} modules · {item.totalQuizzes} quizzes
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {firstQuiz && (
          <section className="rounded-2xl bg-gray-900 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">Ready to start?</h2>
            <p className="mt-2 text-gray-300">Free practice. No account needed.</p>
            <Link
              href={`/quiz/${encodeURIComponent(firstQuiz.slug)}`}
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              Start Practicing →
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
