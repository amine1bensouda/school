import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import CourseSchema from '@/components/SEO/CourseSchema';
import CourseLanding from '@/components/Course/CourseLanding';
import { getCourseBySlug, getPublishedCoursesSummary } from '@/lib/course-service';
import { getCourseGuide } from '@/lib/course-guides';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { lessonDisplayTitle, stripHtml } from '@/lib/utils';
import { resolveSeoDescription, resolveSeoTitle } from '@/lib/seo-meta';

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

  const guide = getCourseGuide(course.slug);
  const title = resolveSeoTitle(
    course.metaTitle,
    `Free ${guide?.name ?? stripHtml(course.title)} Practice`
  );
  const description =
    resolveSeoDescription(
      course.metaDescription,
      guide?.summary,
      course.description,
      `${stripHtml(course.title)} practice on ${SITE_NAME}.`
    ) || `${stripHtml(course.title)} practice on ${SITE_NAME}.`;
  const canonical = `/quiz/course/${encodeURIComponent(course.slug)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}${canonical}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  if (slug !== course.slug) {
    permanentRedirect(`/quiz/course/${encodeURIComponent(course.slug)}`);
  }

  const guide = getCourseGuide(course.slug);
  const studyLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lessonDisplayTitle(lesson.title),
      href: `/quiz/lesson/${encodeURIComponent(lesson.slug)}`,
    }))
  );
  const totalQuizzes = course.modules.reduce((sum, module) => sum + module.quizzes.length, 0);

  let related: { title: string; slug: string; moduleCount: number; totalQuizzes: number }[] = [];
  try {
    const courses = await getPublishedCoursesSummary();
    related = courses
      .filter((item) => item.slug !== course.slug && item.totalQuizzes > 0)
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        moduleCount: item.moduleCount,
        totalQuizzes: item.totalQuizzes,
      }));
  } catch {
    related = [];
  }

  return (
    <>
      <CourseSchema
        slug={course.slug}
        title={course.title}
        description={course.description}
        moduleCount={course.modules.length}
        totalQuizzes={totalQuizzes}
      />
      <CourseLanding
        courseTitle={course.title}
        courseSlug={course.slug}
        description={course.description}
        guide={guide}
        lessons={studyLessons}
        related={related}
      />
    </>
  );
}
