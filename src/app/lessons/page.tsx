import type { Metadata } from 'next';
import Link from 'next/link';
import { listCourseLessonGroups } from '@/lib/course-lessons';

export const metadata: Metadata = {
  title: 'Lessons',
  description: 'Read math lessons for SAT, ACT, PSAT, and AP courses. Explanations only — practice quizzes stay on each course page.',
  alternates: { canonical: '/lessons' },
};

export default function LessonsPage() {
  const groups = listCourseLessonGroups();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-900">Lesson</span>
        </nav>
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Lesson</h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Explanations only. Open a lesson to study the method, then use the course page when you want to practice.
          </p>
        </header>

        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.courseSlug} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center justify-between bg-slate-900 px-5 py-4">
                <h2 className="text-lg font-extrabold text-white">{group.shortName}</h2>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
                  {group.lessons.length} lesson{group.lessons.length === 1 ? '' : 's'}
                </span>
              </div>
              <ul>
                {group.lessons.map((lesson, index) => (
                  <li key={lesson.slug} className="border-t border-gray-100">
                    <Link
                      href={`/quiz/course/${encodeURIComponent(group.courseSlug)}/lesson/${lesson.slug}`}
                      className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-gray-50"
                    >
                      <span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {group.shortName} · Lesson {index + 1}
                        </span>
                        <span className="mt-0.5 block font-semibold text-gray-900">{lesson.title}</span>
                        <span className="mt-1 block text-sm text-gray-600">{lesson.summary}</span>
                      </span>
                      <span className="mt-1 flex-shrink-0 text-gray-400" aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
