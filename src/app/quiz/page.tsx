import type { Metadata } from 'next';
import Navigation from '@/components/Layout/Navigation';
import AnimatedShapes from '@/components/Layout/AnimatedShapesClient';
import BackgroundPattern from '@/components/Layout/BackgroundPatternClient';
import CourseCard from '@/components/Quiz/CourseCard';
import { getPublishedCoursesSummary } from '@/lib/course-service';
import { SITE_NAME } from '@/lib/constants';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'All Exams',
  description: `Discover all our practice exams and interactive tests on mathematics topics at ${SITE_NAME}`,
  alternates: { canonical: '/quiz' },
};

export default async function QuizListPage() {
  let courses: Awaited<ReturnType<typeof getPublishedCoursesSummary>> = [];
  try {
    courses = await getPublishedCoursesSummary();
  } catch {
    courses = [];
  }

  const totalQuizzes = courses.reduce(
    (sum, course) => sum + (course.totalQuizzes || 0),
    0
  );

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <AnimatedShapes variant="hero" count={8} intensity="high" />
      <BackgroundPattern variant="luxury" opacity={0.12} />
      <Navigation />
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-6 leading-tight">
            All Exams
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto backdrop-blur-sm bg-white/40 rounded-2xl p-6 inline-block">
            {totalQuizzes} exam{totalQuizzes !== 1 ? 's' : ''} available to test your
            knowledge and improve your mathematics skills
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="space-y-8">
            <h2 className="sr-only">Available courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  moduleCount={course.moduleCount}
                  totalQuizzes={course.totalQuizzes}
                  slug={course.slug}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl p-12 border border-white/40">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                No Courses Available
              </h2>
              <p className="text-gray-700 text-lg">Check back soon for new courses!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
