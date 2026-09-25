'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function CourseFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.question}
            className={`mb-1.5 overflow-hidden rounded-lg border ${
              isOpen ? 'border-indigo-200' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${
                isOpen ? 'bg-indigo-50' : 'bg-white'
              }`}
              aria-expanded={isOpen}
            >
              <span className="text-[13.5px] font-bold text-gray-900">{item.question}</span>
              <span className="flex-shrink-0 text-lg leading-none text-indigo-600" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <p className="border-t border-gray-200 bg-white px-4 py-3 text-[13.5px] leading-relaxed text-gray-700">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
