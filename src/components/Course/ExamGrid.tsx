'use client';

import { useState } from 'react';
import Link from 'next/link';

export type ExamCard = {
  slug: string;
  title: string;
  questionCount: number;
  duration?: number;
};

interface ExamGridProps {
  exams: ExamCard[];
  initial: number;
  moreLabel: string;
}

export default function ExamGrid({ exams, initial, moreLabel }: ExamGridProps) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(0, exams.length - initial);
  const visible = open || hidden === 0 ? exams : exams.slice(0, initial);

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visible.map((exam) => (
          <li key={exam.slug}>
            <Link
              href={`/quiz/${encodeURIComponent(exam.slug)}`}
              className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-gray-900 transition-colors"
            >
              <span className="font-semibold text-gray-900">{exam.title}</span>
              <span className="mt-2 text-sm text-gray-500">
                {exam.questionCount > 0 ? `${exam.questionCount} q` : 'Practice'}
                {exam.duration && exam.duration > 0 ? ` · ${exam.duration} min` : ''}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-4 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          {open ? 'Show fewer' : moreLabel}
        </button>
      )}
    </div>
  );
}
