import Link from 'next/link';
import type { CourseGuide } from '@/lib/course-guides';
import { courseGuideKey } from '@/lib/course-guides';
import FaqSchema from '@/components/SEO/FaqSchema';
import DisplayAd from '@/components/Ads/DisplayAd';
import CourseFaq from '@/components/Course/CourseFaq';

export type LandingLesson = {
  id: string;
  title: string;
  href: string;
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

const SCORE_STYLES = [
  'bg-red-100 text-red-800',
  'bg-amber-100 text-amber-800',
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-slate-900 text-amber-400',
];

interface CourseLandingProps {
  courseTitle: string;
  courseSlug: string;
  description?: string | null;
  guide?: CourseGuide;
  lessons: LandingLesson[];
  related: RelatedCourse[];
}

export default function CourseLanding({
  courseTitle,
  courseSlug,
  description,
  guide,
  lessons,
  related,
}: CourseLandingProps) {
  const firstLesson = lessons[0];
  const scores = SCORE_BANDS[courseGuideKey(courseSlug)];
  const headline = guide?.headline ?? 'Practice by topic, then try a full set';
  const summary =
    guide?.summary ??
    description?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ??
    `Free ${courseTitle} practice. Work through topic quizzes, then longer sets when the method is clear.`;

  const courseName = guide?.name ?? courseTitle;
  const plainDescription = description?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  return (
    <div className="bg-white text-gray-900">
      {guide && <FaqSchema items={guide.faq} />}

      <header className="bg-slate-900 px-4 py-12 sm:px-8 sm:py-16 text-center">
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          Free {courseName} Practice — <em className="font-serif italic text-amber-400">{headline}</em>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">{summary}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {firstLesson && (
            <Link
              href={firstLesson.href}
              className="rounded-lg bg-amber-400 px-7 py-3 text-[15px] font-bold text-black hover:bg-amber-500"
            >
              Start with lesson 1 →
            </Link>
          )}
          {lessons.length > 0 && (
            <a
              href="#lessons"
              className="rounded-lg border border-white/35 px-7 py-3 text-[15px] font-semibold text-white hover:border-white/60"
            >
              Browse lessons
            </a>
          )}
        </div>
        <dl className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-4">
          {[
            { value: String(lessons.length), label: lessons.length === 1 ? 'Lesson' : 'Lessons' },
            { value: '$0', label: 'Cost, forever' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-[28px] font-extrabold text-white">{stat.value}</dd>
              <dt className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-white/40">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      <div className="mx-auto max-w-[980px] px-4 sm:px-8">
        <DisplayAd className="my-6" />
        <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span>›</span>
          <Link href="/quiz" className="text-blue-600 hover:underline">Exams</Link>
          <span>›</span>
          <span className="text-gray-700">{courseTitle}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 pb-16 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-800">{courseName}</span>
              <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-semibold text-indigo-800">Exam prep</span>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">2026</span>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-800">Free resource</span>
            </div>
        <section className="mb-6 space-y-3 text-[14.5px] leading-relaxed text-gray-700">
          {(guide?.introduction ?? []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {!guide?.introduction?.length && plainDescription && <p>{plainDescription}</p>}
        </section>

        {guide && (
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-extrabold text-gray-900">{guide.overviewTitle}</h2>
            <div className="space-y-3 text-[14.5px] leading-relaxed text-gray-700">
              {guide.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {scores && (
          <section className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h2 className="mb-2 text-[13px] font-extrabold text-blue-800">{scores.title}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {scores.bands.map((band, index) => (
                <div key={band.range} className={`rounded-md px-2 py-2 text-center ${SCORE_STYLES[index % SCORE_STYLES.length]}`}>
                  <p className="text-sm font-extrabold">{band.range}</p>
                  <p className="mt-0.5 text-[10px] opacity-80">{band.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-blue-800/70">
              Checkpoints only. A result on this site is practice feedback, not an official score.
            </p>
          </section>
        )}

        {lessons.length > 0 && (
          <section id="lessons" className="mb-6 scroll-mt-24 overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3.5">
              <h2 className="text-sm font-extrabold text-white">Lessons</h2>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {lessons.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 p-3 sm:grid-cols-2">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  href={lesson.href}
                  className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 hover:bg-white"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                    Lesson {index + 1}
                  </span>
                  <span className="mt-0.5 block text-[13px] font-bold text-gray-900">{lesson.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {guide && guide.tips.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-extrabold text-gray-900">Tips before you practice</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
              {guide.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ol>
          </section>
        )}

        {guide && guide.faq.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-extrabold text-gray-900">Frequently asked questions</h2>
            <CourseFaq items={guide.faq} />
          </section>
        )}
          </div>

          <aside className="lg:sticky lg:top-24">
            {related.length > 0 && (
              <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
                <h2 className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-widest text-gray-500">
                  Other free question banks
                </h2>
                <ul>
                  {related.map((item) => (
                    <li key={item.slug} className="border-b border-gray-100 last:border-b-0">
                      <Link
                        href={`/quiz/course/${encodeURIComponent(item.slug)}`}
                        className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50"
                      >
                        <span>
                          <span className="block text-[13px] font-bold text-gray-900">{item.title}</span>
                          <span className="mt-0.5 block text-[11px] text-gray-400">
                            {item.moduleCount} modules
                          </span>
                        </span>
                        <span className="text-gray-300" aria-hidden>›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {firstLesson && (
              <div className="rounded-lg bg-slate-900 p-5 text-center text-white">
                <p className="text-sm font-extrabold">Ready to start?</p>
                <p className="mt-1 text-xs leading-relaxed text-white/50">Open the first lesson.</p>
                <Link
                  href={firstLesson.href}
                  className="mt-3 block rounded-md bg-amber-400 py-2.5 text-[13px] font-extrabold text-black hover:bg-amber-500"
                >
                  Start lesson 1 →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
