'use client';

import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import type { PracticeMenuGroup } from '@/lib/practice-pages';

export default function ResourcesBrowser({ groups }: { groups: PracticeMenuGroup[] }) {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('all');

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search additional resources</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a topic…"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-slate-900 shadow-sm outline-none focus:border-slate-400"
          />
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
      </div>

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
            <span className="ml-1.5 text-xs opacity-70">{group.pages.length}</span>
          </FilterChip>
        ))}
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {total} resource{total === 1 ? '' : 's'}
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl border border-slate-200 bg-white px-5 py-8 text-center text-slate-600">
          No resources match this search.
        </p>
      ) : (
        <div className="mt-6 space-y-8">
          {visible.map((group) => (
            <section key={group.name}>
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-500">
                {group.name}
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/pages/${page.slug}`}
                      title={page.title}
                      className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
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
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
      }`}
    >
      {children}
    </button>
  );
}
