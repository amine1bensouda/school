import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getAllCategories, getCoursesByCategorySlug } from '@/lib/quiz-service';
import type { Category } from '@/lib/types';
import CourseCard from '@/components/Quiz/CourseCard';
import Navigation from '@/components/Layout/Navigation';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FaqSchema from '@/components/SEO/FaqSchema';
import { SITE_URL } from '@/lib/constants';
import { buildCategorySeoContent } from '@/lib/seo-content';

export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

function normalizeSlug(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function findCategoryBySlug(categories: Category[], slugParam: string) {
  const decoded = decodeURIComponent(slugParam || '');
  const exact = categories.find((c) => c.slug === decoded);
  if (exact) return exact;
  const normalized = normalizeSlug(decoded);
  const bySlug = categories.find((c) => normalizeSlug(c.slug) === normalized);
  if (bySlug) return bySlug;
  const byName = categories.find(
    (c) => normalizeSlug(c.name) === normalized || c.name.toLowerCase() === decoded.toLowerCase()
  );
  return byName ?? null;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categories = await getAllCategories();
  const category = findCategoryBySlug(categories, params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/categorie/${encodeURIComponent(category.slug)}`;
  const description =
    category.description?.trim() ||
    `Free ${category.name} math practice courses and quizzes on The School of Mathematics. Study with scored quizzes, explanations, and exam-style questions.`;

  return {
    title: `${category.name} Courses & Practice Quizzes`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${category.name} Courses & Practice Quizzes`,
      description,
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const categories = await getAllCategories();
  const category = findCategoryBySlug(categories, params.slug);

  if (!category) {
    notFound();
  }

  const decodedSlug = decodeURIComponent(params.slug);
  if (decodedSlug !== category.slug && params.slug !== category.slug) {
    permanentRedirect(`/categorie/${encodeURIComponent(category.slug)}`);
  }

  const courses = await getCoursesByCategorySlug(category.slug);
  const seo = buildCategorySeoContent({
    name: category.name,
    description: category.description,
    courseCount: courses.length,
  });

  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Quizzes', url: `${SITE_URL}/quiz` },
    {
      name: category.name,
      url: `${SITE_URL}/categorie/${encodeURIComponent(category.slug)}`,
    },
  ];

  return (
    <div>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FaqSchema items={seo.faqs} />
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 animate-fade-in max-w-4xl">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 border border-primary-200 mb-4">
            <span className="text-sm font-semibold text-primary-700">Category</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 gradient-text">
            {category.name} Quizzes
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">{seo.intro}</p>
          <p className="text-base text-gray-500">
            {courses.length} course{courses.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
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
        ) : (
          <div className="text-center py-16 card-modern mb-14">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 text-lg">
              No courses available in this category at the moment.
            </p>
          </div>
        )}

        <section className="max-w-4xl space-y-8 mb-12">
          {seo.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{section.body}</p>
            </div>
          ))}
        </section>

        <section className="max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-5">
            {seo.faqs.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
