import { extractEmbeddedCss, sanitizeCss } from '@/lib/sanitize-html';

export type LessonDocument = {
  html: string;
  css: string;
};

const SCOPE = '.lesson-document';

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

/** Le contenu collé dans l'éditeur est un document HTML, une ligne par paragraphe. */
function unwrapEditorDocument(content: string): string {
  const escaped =
    content.includes('&lt;!DOCTYPE') ||
    content.includes('&lt;html') ||
    content.includes('&lt;body');
  if (!escaped) return content;

  const text = content
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n')
    .replace(/<\/?p[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n');
  return decodeEntities(text);
}

function scopeCss(css: string): string {
  return css.replace(/([^{}]+)\{/g, (_match, rawSelectors: string) => {
    const scoped = rawSelectors
      .split(',')
      .map((selector) => {
        const trimmed = selector.trim();
        if (!trimmed || trimmed.startsWith('@')) return trimmed;
        const rewritten = trimmed
          .replace(/:root/g, SCOPE)
          .replace(/\bbody\b/g, SCOPE);
        if (rewritten === SCOPE || rewritten.startsWith(`${SCOPE} `) || rewritten.startsWith(`${SCOPE}.`) || rewritten.startsWith(`${SCOPE}:`) || rewritten.startsWith(`${SCOPE}#`)) {
          return rewritten;
        }
        return `${SCOPE} ${rewritten}`;
      })
      .filter(Boolean)
      .join(', ');
    return `${scoped} {`;
  });
}

function cleanLessonHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+(href|src)\s*=\s*(["'])\s*(?:javascript:|vbscript:|data:text\/html)[\s\S]*?\2/gi, '');
}

/**
 * Reconstruit une leçon enregistrée comme page HTML complète.
 * Retourne null quand le contenu est déjà du HTML d'éditeur classique.
 */
export function prepareLessonDocument(content: string): LessonDocument | null {
  if (!content) return null;
  const source = unwrapEditorDocument(content).trim();
  const isDocument = /^<!DOCTYPE/i.test(source) || /^<html[\s>]/i.test(source);
  if (!isDocument) return null;

  const css = scopeCss(sanitizeCss(extractEmbeddedCss(source)));
  const bodyMatch = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const body = cleanLessonHtml(bodyMatch?.[1] ?? source).trim();
  if (!body) return null;

  return { html: body, css };
}
