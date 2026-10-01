'use client';

import { useEffect, useRef } from 'react';

export default function LessonDocumentView({ html, css }: { html: string; css: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest('.option-btn');
      if (!(button instanceof HTMLButtonElement) || button.disabled) return;

      const problem = button.closest('.problem');
      if (!problem) return;

      problem.querySelectorAll('.option-btn').forEach((item) => {
        if (item instanceof HTMLButtonElement) item.disabled = true;
      });

      const correct = button.getAttribute('data-correct') === 'true';
      button.classList.add(correct ? 'correct' : 'incorrect');
      if (!correct) {
        problem.querySelector('.option-btn[data-correct="true"]')?.classList.add('correct');
      }
      problem.querySelector('.explanation')?.classList.add('show');
    };

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [html]);

  return (
    <div className="lesson-document">
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
