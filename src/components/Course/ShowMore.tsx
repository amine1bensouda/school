'use client';

import { useState } from 'react';

interface ShowMoreProps {
  initial: number;
  moreLabel: string;
  children: React.ReactNode[];
}

export default function ShowMore({ initial, moreLabel, children }: ShowMoreProps) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(0, children.length - initial);
  const visible = open || hidden === 0 ? children : children.slice(0, initial);

  return (
    <div>
      <div className="flex flex-wrap gap-2">{visible}</div>
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
