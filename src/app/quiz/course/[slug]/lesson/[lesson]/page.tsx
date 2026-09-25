import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import Navigation from '@/components/Layout/Navigation';
import BackgroundPattern from '@/components/Layout/BackgroundPattern';
import { getCourseGuide } from '@/lib/course-guides';
import { getCourseLesson, getCourseLessons } from '@/lib/course-lessons';
import { getCourseBySlug } from '@/lib/course-service';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string; lesson: string }> | { slug: string; lesson: string };
}

async function resolveParams(params: PageProps['params']) {
  return Promise.resolve(params);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lesson: lessonSlug } = await resolveParams(params);
  const guide = getCourseGuide(slug);
  const lesson = getCourseLesson(slug, lessonSlug);

  if (!guide || !lesson) {
    return {
      title: 'Lesson Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = `${lesson.title} | ${guide.name}`;
  const canonical = `/quiz/course/${encodeURIComponent(slug)}/lesson/${lesson.slug}`;

  return {
    title,
    description: lesson.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: lesson.summary,
      type: 'article',
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function CourseLessonPage({ params }: PageProps) {
  const { slug, lesson: lessonSlug } = await resolveParams(params);
  const guide = getCourseGuide(slug);
  const lesson = getCourseLesson(slug, lessonSlug);

  if (!guide || !lesson) {
    notFound();
  }

  let course: Awaited<ReturnType<typeof getCourseBySlug>> = null;
  try {
    course = await getCourseBySlug(slug);
  } catch {
    course = null;
  }

  if (course && course.slug !== slug) {
    permanentRedirect(
      `/quiz/course/${encodeURIComponent(course.slug)}/lesson/${encodeURIComponent(lesson.slug)}`
    );
  }

  const courseTitle = course?.title ?? guide.name;
  const courseHref = `/quiz/course/${encodeURIComponent(course?.slug ?? slug)}`;
  const lessons = getCourseLessons(course?.slug ?? slug);
  const index = lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = index > 0 ? lessons[index - 1] : undefined;
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50">
      <BackgroundPattern variant="luxury" opacity={0.08} />
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-3xl relative z-10">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/quiz" className="hover:text-indigo-600">Courses</Link>
          <span className="mx-1.5">/</span>
          <Link href={courseHref} className="hover:text-indigo-600">{courseTitle}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-900 font-medium">{lesson.title}</span>
        </nav>

        <article className="rounded-2xl bg-white/90 border border-white/60 shadow-xl p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700 mb-2">
            {guide.name}
            {index >= 0 ? ` · Lesson ${index + 1} of ${lessons.length}` : ''}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{lesson.summary}</p>

          <div className="space-y-8">
            {lesson.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-xl bg-indigo-50/80 border border-indigo-100 p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Worked example</h2>
              <p className="text-gray-800 mb-3">{lesson.example.question}</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-3">
                {lesson.example.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">Why this works. </span>
                {lesson.example.takeaway}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Check your understanding</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {lesson.checkpoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        <nav className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between" aria-label="Lesson navigation">
          {previous ? (
            <Link
              href={`/quiz/course/${encodeURIComponent(course?.slug ?? slug)}/lesson/${previous.slug}`}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:border-indigo-300"
            >
              Previous: {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/quiz/course/${encodeURIComponent(course?.slug ?? slug)}/lesson/${next.slug}`}
              className="rounded-xl border border-indigo-200 bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 sm:text-right"
            >
              Next: {next.title}
            </Link>
          ) : (
            <Link
              href={courseHref}
              className="rounded-xl border border-indigo-200 bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 sm:text-right"
            >
              Back to {courseTitle} practice
            </Link>
          )}
        </nav>

        <p className="mt-6 text-sm text-gray-500">
          After the lesson, use the quizzes on the {courseTitle} course page to practice. {SITE_NAME} quiz
          scores are practice feedback, not official exam scores.
        </p>
      </div>
    </div>
  );
}
