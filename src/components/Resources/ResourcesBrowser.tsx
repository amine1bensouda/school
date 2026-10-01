'use client';

import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import type { PracticeMenuGroup } from '@/lib/practice-pages';

const TONES = [
  {
    bar: 'from-purple-600 to-purple-800',
    badge: 'bg-purple-100 text-purple-800',
    hover: 'hover:border-purple-200',
  },
  {
    bar: 'from-blue-600 to-blue-800',
    badge: 'bg-blue-100 text-blue-800',
    hover: 'hover:border-blue-200',
  },
  {
    bar: 'from-pink-600 to-rose-600',
    badge: 'bg-pink-100 text-pink-800',
    hover: 'hover:border-pink-200',
  },
  {
    bar: 'from-indigo-600 to-indigo-800',
    badge: 'bg-indigo-100 text-indigo-800',
    hover: 'hover:border-indigo-200',
  },
  {
    bar: 'from-emerald-600 to-teal-600',
    badge: 'bg-emerald-100 text-emerald-800',
    hover: 'hover:border-emerald-200',
  },
  {
    bar: 'from-rose-600 to-pink-700',
    badge: 'bg-rose-100 text-rose-800',
    hover: 'hover:border-rose-200',
  },
];

export default function ResourcesBrowser({ groups }: { groups: PracticeMenuGroup[] }) {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('all');

  const toneByName = useMemo(() => {
    const map = new Map<string, (typeof TONES)[number]>();
    groups.forEach((group, index) => {
      map.set(group.name, TONES[index % TONES.length]);
    });
    return map;
  }, [groups]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return groups
      .filter((group) => course === 'all' || group.name === course)
      .map((group) => ({
        ...group,
        pages: group.pages.filter((page) => {
          if (!needle) return true;
          return (
            page.label.toLowerCase().includes(needle) ||
            page.title.toLowerCase().includes(needle) ||
            group.name.toLowerCase().includes(needle)
          );
        }),
      }))
      .filter((group) => group.pages.length > 0);
  }, [groups, query, course]);

  const total = visible.reduce((count, group) => count + group.pages.length, 0);

  return (
    <div>
      <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search additional resources</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a topic…"
            className="w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3.5 pl-12 text-gray-900 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={course === 'all'} onClick={() => setCourse('all')}>
            All courses
          </FilterChip>
          {groups.map((group) => (
            <FilterChip
              key={group.name}
              active={course === group.name}
              onClick={() => setCourse(group.name)}
            >
              {group.name}
              <span className={`ml-1.5 text-xs ${course === group.name ? 'text-white/75' : 'text-gray-400'}`}>
                {group.pages.length}
              </span>
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">
        {total} guide{total === 1 ? '' : 's'}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-white/70 bg-white/80 px-6 py-14 text-center shadow-xl backdrop-blur-xl">
          <p className="text-lg font-semibold text-gray-800">No guides match this search.</p>
          <p className="mt-2 text-sm text-gray-500">Try another topic or choose a different course.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {visible.map((group) => {
            const tone = toneByName.get(group.name) ?? TONES[0];
            return (
              <section key={group.name}>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`h-8 w-1.5 rounded-full bg-gradient-to-b ${tone.bar}`} />
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{group.name}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone.badge}`}>
                    {group.pages.length}
                  </span>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={`/pages/${page.slug}`}
                        title={page.title}
                        className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${tone.hover}`}
                      >
                        <span className={`h-1 bg-gradient-to-r ${tone.bar}`} />
                        <span className="flex flex-1 items-start justify-between gap-3 p-4 sm:p-5">
                          <span className="text-[15px] font-semibold leading-snug text-gray-900 group-hover:text-indigo-700">
                            {page.label}
                          </span>
                          <svg
                            className="mt-1 h-4 w-4 flex-shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
        active
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
          : 'border border-gray-200 bg-white text-gray-700 hover:border-indigo-200 hover:text-indigo-700'
      }`}
    >
      {children}
    </button>
  );
}
