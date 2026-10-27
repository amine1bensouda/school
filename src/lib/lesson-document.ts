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
    content.includes('&lt;body') ||
    content.includes('&lt;style') ||
    content.includes('&lt;div');
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
 * Décode le HTML éventuellement échappé par l'éditeur rich-text,
 * puis extrait CSS + corps (document complet ou fragment avec <style>).
 * Retourne null si le contenu est vide après nettoyage.
 */
export function prepareLessonDocument(content: string): LessonDocument | null {
  if (!content) return null;
  const source = unwrapEditorDocument(content).trim();
  if (!source) return null;

  const isDocument = /^<!DOCTYPE/i.test(source) || /^<html[\s>]/i.test(source);
  const hasStyle = /<style\b/i.test(source);
  if (!isDocument && !hasStyle) {
    // Fragment HTML classique (sans CSS embarqué) : laisser le caller gérer.
    return null;
  }

  const css = scopeCss(sanitizeCss(extractEmbeddedCss(source)));
  const bodyMatch = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const rawBody = bodyMatch?.[1] ?? source.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '');
  const body = cleanLessonHtml(rawBody).trim();
  if (!body && !css) return null;

  return { html: body, css };
}
