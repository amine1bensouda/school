'use client';

import { useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { isBlockMathInHtml } from '@/lib/math-render-utils';

interface HtmlWithMathRendererProps {
  html: string;
  className?: string;
}

interface MathSlot {
  id: string;
  formula: string;
  block: boolean;
}

function buildHtmlWithMathPlaceholders(rawHtml: string): {
  html: string;
  mathSlots: MathSlot[];
} {
  if (!rawHtml.trim()) {
    return { html: '', mathSlots: [] };
  }

  let html = rawHtml;

  const imagePlaceholders: string[] = [];
  html = html.replace(/<img([^>]+)src=["'](data:image\/[^"']+)["']([^>]*)>/gi, (match) => {
    const placeholder = `__IMAGE_${imagePlaceholders.length}__`;
    imagePlaceholders.push(match);
    return placeholder;
  });

  html = html.replace(/&#36;/g, '$').replace(/&dollar;/g, '$');
  html = html.replace(/\\\\/g, '\\');

  const mathSlots: MathSlot[] = [];
  const matches: Array<{ start: number; end: number; formula: string; block: boolean }> = [];

  const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
  let match: RegExpExecArray | null;
  while ((match = blockMathRegex.exec(html)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      formula: match[1].trim(),
      block: isBlockMathInHtml(html, match.index, match.index + match[0].length),
    });
  }

  const inlineMathRegex = /(?<!\$)\$(?!\$)([^$]+?)\$(?!\$)/g;
  while ((match = inlineMathRegex.exec(html)) !== null) {
    const inBlock = matches.some(
      (m) => match!.index >= m.start && match!.index < m.end
    );
    if (inBlock) continue;

    const before = html.slice(0, match.index);
    const lastOpen = before.lastIndexOf('<');
    const lastClose = before.lastIndexOf('>');
    if (lastOpen > lastClose) continue;

    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      formula: match[1].trim(),
      block: false,
    });
  }

  matches.sort((a, b) => b.start - a.start);

  for (const m of matches) {
    const id = `math-${mathSlots.length}`;
    mathSlots.push({ id, formula: m.formula, block: m.block });
    const spanClass = m.block ? 'math-ph math-ph-block' : 'math-ph math-ph-inline';
    const placeholder = `<span class="${spanClass}" data-math-id="${id}"></span>`;
    html = html.slice(0, m.start) + placeholder + html.slice(m.end);
  }

  imagePlaceholders.forEach((img, idx) => {
    html = html.replace(`__IMAGE_${idx}__`, img);
  });

  return { html, mathSlots: mathSlots.reverse() };
}

/**
 * Rend le HTML Quill intact (sans couper les <p>) et hydrate les formules LaTeX.
 */
export default function HtmlWithMathRenderer({
  html,
  className = '',
}: HtmlWithMathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { html: processedHtml, mathSlots } = useMemo(
    () => buildHtmlWithMathPlaceholders(html),
    [html]
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    mathSlots.forEach(({ id, formula, block }) => {
      const el = root.querySelector<HTMLElement>(`[data-math-id="${id}"]`);
      if (!el) return;
      try {
        katex.render(formula, el, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (error) {
        console.warn('Erreur KaTeX:', formula, error);
        el.textContent = block ? `$$${formula}$$` : `$${formula}$`;
      }
    });
  }, [processedHtml, mathSlots]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const images = root.querySelectorAll('img');
    const handleImageError = (img: HTMLImageElement) => {
      if (!img.src.startsWith('data:image/')) return;
      const placeholder = document.createElement('div');
      placeholder.className = 'image-error-placeholder';
      placeholder.textContent = '⚠️ Image non disponible';
      placeholder.style.cssText =
        'padding: 20px; background: #fef3c7; border: 1px dashed #f59e0b; text-align: center; color: #92400e; border-radius: 8px; margin: 10px 0;';
      img.style.display = 'none';
      img.parentNode?.insertBefore(placeholder, img.nextSibling);
    };

    images.forEach((img) => {
      if (img.complete && img.naturalHeight === 0) {
        handleImageError(img);
      } else {
        img.addEventListener('error', () => handleImageError(img), { once: true });
      }
    });
  }, [processedHtml]);

  if (!html) return null;

  return (
    <div
      ref={containerRef}
      className={`html-with-math-renderer ${className}`}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
