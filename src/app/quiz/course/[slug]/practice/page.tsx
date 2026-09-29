import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import AnimatedShapes from '@/components/Layout/AnimatedShapesClient';
import BackgroundPattern from '@/components/Layout/BackgroundPatternClient';
import Accordion from '@/components/Layout/Accordion';
import QuizCard from '@/components/Quiz/QuizCard';
import SafeHtmlRenderer from '@/components/Common/SafeHtmlRenderer';
import { getCourseBySlug } from '@/lib/course-service';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: course.title,
    robots: { index: false, follow: true },
  };
}

export default async function CoursePracticePage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  if (slug !== course.slug) {
    permanentRedirect(`/quiz/course/${encodeURIComponent(course.slug)}/practice`);
  }

  const totalQuizzes = course.modules.reduce((sum, module) => sum + module.quizzes.length, 0);
  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const courseHref = `/quiz/course/${encodeURIComponent(course.slug)}`;

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50 min-h-screen">
      <AnimatedShapes variant="hero" count={6} intensity="medium" />
      <BackgroundPattern variant="luxury" opacity={0.08} />
      <div className="flex gap-4 lg:gap-6 xl:gap-8 container mx-auto px-4 sm:px-5 md:px-6 py-6 sm:py-8 md:py-10 lg:py-12 relative z-10 max-w-[100vw] overflow-x-hidden">
        <main className="flex-1 min-w-0 max-w-4xl mx-auto">
          <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/quiz" className="hover:text-indigo-600 transition-colors">Exams</Link>
            <span className="mx-1.5">/</span>
            <Link href={courseHref} className="hover:text-indigo-600 transition-colors">{course.title}</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-900 font-medium">Practice</span>
          </nav>

          <header className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
            <div className="rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-white/60 shadow-xl shadow-indigo-900/5 p-6 sm:p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  {course.modules.length} module{course.modules.length !== 1 ? 's' : ''}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                  {totalQuizzes} quiz{totalQuizzes !== 1 ? 'zes' : ''}
                </span>
                {totalLessons > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight">
                {course.title}
              </h1>
              {course.description && (
                <div className="prose prose-sm sm:prose-base prose-gray max-w-none">
                  <SafeHtmlRenderer html={course.description} className="text-gray-600 leading-relaxed" />
                </div>
              )}
            </div>
          </header>

          {course.modules.length > 0 ? (
            <section className="space-y-4 sm:space-y-5 animate-fade-in" aria-label="Modules du cours">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Practice by topic</h2>
              {course.modules.map((module) => {
                const quizCount = module.quizzes.length;
                const lessonCount = module.lessons.length;
                if (quizCount === 0 && lessonCount === 0) return null;
                return (
                  <Accordion
                    key={module.id}
                    title={module.title}
                    quizCount={quizCount}
                    lessonCount={lessonCount}
                    defaultOpen={false}
                    icon={
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    }
                  >
                    <div className="space-y-6">
                      {lessonCount > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-3">Lessons</h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {module.lessons.map((lesson) => (
                              <li key={lesson.id}>
                                <Link
                                  href={`/quiz/lesson/${lesson.slug}`}
                                  className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
                                >
                                  <span className="font-medium text-gray-900">{lesson.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {quizCount > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {module.quizzes.map((quiz, index) => (
                            <QuizCard key={quiz.prismaId ?? quiz.id} quiz={quiz} index={index} />
                          ))}
                        </div>
                      )}
                    </div>
                  </Accordion>
                );
              })}
            </section>
          ) : (
            <div className="text-center py-12 sm:py-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 shadow-lg px-4">
              <p className="text-gray-600">This course has no modules yet.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
