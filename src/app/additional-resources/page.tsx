import type { Metadata } from 'next';
import AnimatedShapes from '@/components/Layout/AnimatedShapesClient';
import BackgroundPattern from '@/components/Layout/BackgroundPatternClient';
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
  const resourceCount = groups.reduce((count, group) => count + group.pages.length, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50/70">
      <AnimatedShapes variant="hero" count={6} intensity="medium" />
      <BackgroundPattern variant="grid" opacity={0.06} />

      <div className="container relative z-10 mx-auto max-w-[100vw] px-4 py-10 sm:px-5 sm:py-14 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center sm:mb-12">
            <p className="mb-4 inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 shadow-sm ring-1 ring-indigo-100">
              Free practice guides
            </p>
            <h1 className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
              Additional Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Topic guides for every course. Search a subject or filter by exam.
            </p>
            <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3">
              <Stat value={String(resourceCount)} label={resourceCount === 1 ? 'Guide' : 'Guides'} />
              <Stat value={String(groups.length)} label={groups.length === 1 ? 'Course' : 'Courses'} />
            </div>
          </header>

          <ResourcesBrowser groups={groups} />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[8.5rem] rounded-2xl border border-white/70 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-xl">
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
        {value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
    </div>
  );
}
