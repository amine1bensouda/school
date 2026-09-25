'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ExamCard } from '@/components/Course/ExamGrid';

interface TopicModuleProps {
  title: string;
  quizzes: ExamCard[];
  barClass: string;
  arrowClass: string;
  initial?: number;
}

export default function TopicModule({
  title,
  quizzes,
  barClass,
  arrowClass,
  initial = 8,
}: TopicModuleProps) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(0, quizzes.length - initial);
  const visible = open || hidden === 0 ? quizzes : quizzes.slice(0, initial);

  return (
    <section className="mb-3 overflow-hidden rounded-xl border border-gray-200">
      <div className={`flex items-center justify-between gap-3 px-4 py-3.5 ${barClass}`}>
        <h3 className="text-sm font-extrabold text-white">{title}</h3>
        <span className="whitespace-nowrap rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white">
          {quizzes.length} quiz{quizzes.length === 1 ? '' : 'zes'}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-1.5 p-3 sm:grid-cols-2">
        {visible.map((quiz) => (
          <Link
            key={quiz.slug}
            href={`/quiz/${encodeURIComponent(quiz.slug)}`}
            className="flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-[12.5px] font-medium text-gray-800 hover:border-gray-300 hover:bg-white"
          >
            <span className="min-w-0">{quiz.title}</span>
            <span className={`flex-shrink-0 text-sm font-extrabold ${arrowClass}`} aria-hidden>
              →
            </span>
          </Link>
        ))}
      </div>
      {hidden > 0 && (
        <div className="px-3 pb-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="block w-full rounded-lg border border-indigo-100 bg-indigo-50 py-2 text-center text-[13px] font-bold text-indigo-600 hover:bg-indigo-100"
          >
            {open ? 'Show fewer' : `Show all ${quizzes.length} quizzes`}
          </button>
        </div>
      )}
    </section>
  );
}
