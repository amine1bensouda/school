import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedCoursesSummary } from '@/lib/course-service';
import Navigation from '@/components/Layout/Navigation';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { excerptFromHtml } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Math Courses & Practice Categories',
  description: `Browse math courses and practice categories on ${SITE_NAME} — SAT, ACT, PSAT, AP and more.`,
  alternates: { canonical: '/categorie' },
  openGraph: {
    title: `Math Courses & Practice Categories | ${SITE_NAME}`,
    description: `Browse math courses and practice categories on ${SITE_NAME}.`,
    url: `${SITE_URL}/categorie`,
  },
};

export default async function CategoriesListPage() {
  let courses: {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    moduleCount?: number;
    totalQuizzes?: number;
  }[] = [];
  try {
    courses = await getPublishedCoursesSummary();
  } catch (error) {
    console.warn('Erreur lors de la récupération des cours:', error);
  }

  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 border border-primary-200 mb-4">
            <span className="text-sm font-semibold text-primary-700">Courses</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 gradient-text">
            All Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Choose a course to open modules and free practice quizzes organized by topic.
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/quiz/course/${encodeURIComponent(course.slug)}`}
                className="card-modern p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                {course.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {excerptFromHtml(course.description, 160)}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {course.moduleCount ?? 0} module{(course.moduleCount ?? 0) !== 1 ? 's' : ''}
                  {typeof course.totalQuizzes === 'number'
                    ? ` · ${course.totalQuizzes} quiz${course.totalQuizzes !== 1 ? 'zes' : ''}`
                    : ''}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 card-modern">
            <p className="text-gray-600 text-lg">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
