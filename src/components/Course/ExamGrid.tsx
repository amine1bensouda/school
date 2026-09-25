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
  tone: 'full' | 'mini';
}

export default function ExamGrid({ exams, initial, moreLabel, tone }: ExamGridProps) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(0, exams.length - initial);
  const visible = open || hidden === 0 ? exams : exams.slice(0, initial);
  const card =
    tone === 'full'
      ? 'bg-blue-50 border-blue-200'
      : 'bg-amber-50 border-amber-200';

  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visible.map((exam) => (
          <li key={exam.slug}>
            <Link
              href={`/quiz/${encodeURIComponent(exam.slug)}`}
              className={`block h-full rounded-lg border-[1.5px] p-3.5 hover:opacity-90 ${card}`}
            >
              <span className="block text-[13px] font-extrabold text-gray-900 leading-snug">{exam.title}</span>
              <span className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                  {exam.questionCount > 0 ? `${exam.questionCount} q` : 'Practice'}
                </span>
                {exam.duration && exam.duration > 0 ? (
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-800">
                    {exam.duration} min
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-3 block w-full rounded-lg border border-indigo-100 bg-indigo-50 py-2.5 text-center text-[13px] font-bold text-indigo-600 hover:bg-indigo-100"
        >
          {open ? 'Show fewer' : moreLabel}
        </button>
      )}
    </div>
  );
}
