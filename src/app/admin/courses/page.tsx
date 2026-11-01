import { prisma } from '@/lib/db';
import Link from 'next/link';
import DeleteCourseButton from '@/components/Admin/DeleteCourseButton';
import PublishCourseButton from '@/components/Admin/PublishCourseButton';
import SafeHtmlRenderer from '@/components/Common/SafeHtmlRenderer';
import CourseModulesDraggable from '@/components/Admin/CourseModulesDraggable';

type CourseWorld = 'quiz' | 'k12';

function CourseCard({
  course,
}: {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    world: string;
    status: string;
    modules: {
      id: string;
      title: string;
      _count: { quizzes: number; lessons: number };
    }[];
    _count: { modules: number };
  };
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
              {course._count.modules} module{course._count.modules !== 1 ? 's' : ''}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                course.world === 'k12'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-violet-100 text-violet-800'
              }`}
            >
              {course.world === 'k12' ? 'K-12' : 'Quiz'}
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                course.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {course.status === 'published' ? '✅ Published' : '📝 Draft'}
            </span>
          </div>
          {course.description && (
            <SafeHtmlRenderer
              html={course.description}
              className="text-gray-600 mb-2 prose prose-sm max-w-none"
            />
          )}
          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
            {course.slug}
          </code>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <PublishCourseButton
            courseId={course.id}
            courseTitle={course.title}
            currentStatus={(course.status as 'published' | 'draft') || 'draft'}
          />
          <Link
            href={`/admin/courses/${course.id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Edit
          </Link>
          <Link
            href={`/admin/modules?courseId=${course.id}`}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Modules
          </Link>
          <DeleteCourseButton courseId={course.id} courseTitle={course.title} />
        </div>
      </div>

      {course.modules.length > 0 ? (
        <>
          <CourseModulesDraggable
            courseId={course.id}
            modules={course.modules.map((m) => ({
              id: m.id,
              title: m.title,
              _count: m._count,
            }))}
          />
          <Link
            href={`/admin/modules/new?courseId=${course.id}`}
            className="mt-3 inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ➕ Add a module
          </Link>
        </>
      ) : (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href={`/admin/modules/new?courseId=${course.id}`}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ➕ Add a module
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams?: Promise<{ world?: string }> | { world?: string };
}) {
  try {
    const resolved = await Promise.resolve(searchParams || {});
    const worldFilter =
      resolved.world === 'k12' || resolved.world === 'quiz'
        ? (resolved.world as CourseWorld)
        : null;

    const courses = await prisma.course.findMany({
      where: worldFilter ? { world: worldFilter } : undefined,
      include: {
        modules: {
          include: {
            _count: {
              select: {
                quizzes: true,
                lessons: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            modules: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const quizCourses = courses.filter((c) => c.world !== 'k12');
    const k12Courses = courses.filter((c) => c.world === 'k12');

    const title =
      worldFilter === 'k12'
        ? 'K-12'
        : worldFilter === 'quiz'
          ? 'Quiz'
          : 'Course Management';
    const subtitle =
      worldFilter === 'k12'
        ? `${k12Courses.length} K-12 course${k12Courses.length !== 1 ? 's' : ''}`
        : worldFilter === 'quiz'
          ? `${quizCourses.length} Quiz course${quizCourses.length !== 1 ? 's' : ''}`
          : `${courses.length} courses total · Quiz & K-12`;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white">
              <Link
                href="/admin/courses"
                className={`px-4 py-2 text-sm font-medium ${
                  !worldFilter ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </Link>
              <Link
                href="/admin/courses?world=quiz"
                className={`px-4 py-2 text-sm font-medium border-l border-gray-200 ${
                  worldFilter === 'quiz'
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Quiz
              </Link>
              <Link
                href="/admin/courses?world=k12"
                className={`px-4 py-2 text-sm font-medium border-l border-gray-200 ${
                  worldFilter === 'k12'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                K-12
              </Link>
            </div>
            <Link
              href="/admin/courses/new"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg"
            >
              ➕ New Course
            </Link>
          </div>
        </div>

        {courses.length > 0 ? (
          worldFilter ? (
            <div className="space-y-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Quiz</h2>
                  <Link
                    href="/admin/courses?world=quiz"
                    className="text-sm font-medium text-violet-700 hover:text-violet-900"
                  >
                    View Quiz only →
                  </Link>
                </div>
                {quizCourses.length > 0 ? (
                  <div className="space-y-6">
                    {quizCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 bg-white border border-dashed border-gray-200 rounded-xl p-6">
                    No Quiz courses yet. Create a course and set World to Quiz.
                  </p>
                )}
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">K-12</h2>
                  <Link
                    href="/admin/courses?world=k12"
                    className="text-sm font-medium text-amber-700 hover:text-amber-900"
                  >
                    View K-12 only →
                  </Link>
                </div>
                {k12Courses.length > 0 ? (
                  <div className="space-y-6">
                    {k12Courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 bg-white border border-dashed border-gray-200 rounded-xl p-6">
                    No K-12 courses yet. Create a course and set World to{' '}
                    <strong>K-12</strong> in the course form.
                  </p>
                )}
              </section>
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {worldFilter === 'k12'
                ? 'No K-12 courses'
                : worldFilter === 'quiz'
                  ? 'No Quiz courses'
                  : 'No courses'}
            </h3>
            <p className="text-gray-600 mb-6">
              {worldFilter === 'k12'
                ? 'Create a course and choose World = K-12'
                : 'Start by creating your first course'}
            </p>
            <Link
              href="/admin/courses/new"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium"
            >
              Create a course
            </Link>
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    console.error('Erreur AdminCoursesPage:', error);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Course Management
          </h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h2>
          <p className="text-red-600 mb-4">
            Unable to connect to the database. Please check your configuration.
          </p>
          <details className="text-sm text-red-700">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">{error.message}</pre>
          </details>
        </div>
      </div>
    );
  }
}
