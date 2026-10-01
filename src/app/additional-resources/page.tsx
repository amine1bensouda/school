import type { Metadata } from 'next';
import ResourcesBrowser from '@/components/Resources/ResourcesBrowser';
import { getAllPublishedPagesData } from '@/lib/cache';
import { groupPracticePages } from '@/lib/practice-pages';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Additional Resources',
  description:
    'Browse free SAT, ACT, PSAT, and AP Calculus math practice pages. Filter by course or search for a topic.',
  alternates: { canonical: '/additional-resources' },
};

export default async function AdditionalResourcesPage() {
  const pages = await getAllPublishedPagesData();
  const groups = groupPracticePages(
    pages
      .filter((page) => !page.noIndex)
      .map((page) => ({ title: page.title, slug: page.slug }))
      .sort((a, b) => a.title.localeCompare(b.title, 'en')),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Practice</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Additional Resources
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Free practice pages for every course. Choose a course or search for a topic.
        </p>
        <div className="mt-8">
          <ResourcesBrowser groups={groups} />
        </div>
      </div>
    </div>
  );
}
