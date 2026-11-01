import type { Metadata } from 'next';
import Navigation from '@/components/Layout/Navigation';
import K12GradeCard from '@/components/K12/K12GradeCard';
import { getPublishedCoursesSummary } from '@/lib/course-service';
import { K12_GRADES, matchCourseToGrade } from '@/lib/k12-grades';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { excerptFromHtml } from '@/lib/utils';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'K-12 Math',
  description: `Interactive math practice from kindergarten through grade 6 — structured skills for every level on ${SITE_NAME}.`,
  alternates: { canonical: '/k12' },
  openGraph: {
    title: `K-12 Math | ${SITE_NAME}`,
    description: `Interactive math practice from kindergarten through grade 6 on ${SITE_NAME}.`,
    url: `${SITE_URL}/k12`,
    type: 'website',
  },
};

export default async function K12Page() {
  let courses: Awaited<ReturnType<typeof getPublishedCoursesSummary>> = [];
  try {
    courses = (await getPublishedCoursesSummary()).filter((c) => c.world === 'k12');
  } catch {
    courses = [];
  }

  const usedCourseIds = new Set<string>();
  const gradeCards = K12_GRADES.map((grade) => {
    const matched = courses.find(
      (course) => !usedCourseIds.has(course.id) && matchCourseToGrade(course, grade)
    );
    if (matched) usedCourseIds.add(matched.id);
    const skills =
      matched && matched.totalQuizzes > 0
        ? `${matched.totalQuizzes} quiz${matched.totalQuizzes !== 1 ? 'zes' : ''}`
        : matched
          ? `${matched.moduleCount} module${matched.moduleCount !== 1 ? 's' : ''}`
          : 'skills';
    return {
      ...grade,
      title: matched?.title || grade.title,
      description: matched?.description
        ? excerptFromHtml(matched.description, 180)
        : grade.description,
      href: matched ? `/quiz/course/${encodeURIComponent(matched.slug)}` : null,
      skillsLabel: matched ? `See the ${skills}` : 'Coming soon',
    };
  });

  const extraCourses = courses.filter((c) => !usedCourseIds.has(c.id));

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-50 border-b border-gray-200">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute -top-10 left-10 text-6xl">➕</div>
          <div className="absolute top-16 right-16 text-5xl">△</div>
          <div className="absolute bottom-8 left-1/3 text-5xl">÷</div>
          <div className="absolute top-8 right-1/3 text-4xl">☆</div>
        </div>
        <div className="container mx-auto px-4 py-14 md:py-20 relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-800 mb-3">
            K-12 Math
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Math support that grows with your child
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Interactive practice from GS to 6ᵉ — clear skills, exam-style questions, and
            structured progress on {SITE_NAME}.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {gradeCards.map((card) => (
            <K12GradeCard
              key={card.code}
              code={card.code}
              title={card.title}
              description={card.description}
              color={card.color}
              href={card.href}
              skillsLabel={card.skillsLabel}
            />
          ))}
        </div>

        {extraCourses.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More K-12 courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {extraCourses.map((course, index) => {
                const palette = K12_GRADES.map((g) => g.color);
                const color = palette[index % palette.length];
                const code = course.title
                  .replace(/maths?/i, '')
                  .trim()
                  .slice(0, 4)
                  .toUpperCase() || 'K12';
                return (
                  <K12GradeCard
                    key={course.id}
                    code={code}
                    title={course.title}
                    description={
                      course.description
                        ? excerptFromHtml(course.description, 180)
                        : 'Practice math skills with structured quizzes.'
                    }
                    color={color}
                    href={`/quiz/course/${encodeURIComponent(course.slug)}`}
                    skillsLabel={`See the ${course.totalQuizzes || course.moduleCount} ${
                      course.totalQuizzes > 0 ? 'quizzes' : 'modules'
                    }`}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
