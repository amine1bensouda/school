const blockedElements = /<(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>|<(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)\b[^>]*\/?>/gi;
const eventHandler = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const unsafeUrl = /\s+(href|src|xlink:href|action|formaction)\s*=\s*(["'])\s*(?:javascript:|vbscript:|data:text\/html)[\s\S]*?\2/gi;
const srcDoc = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

/** Sanitization boundary used for every piece of CMS/user-authored HTML. */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  let clean = html;
  let previous: string;
  do {
    previous = clean;
    clean = clean.replace(blockedElements, '');
  } while (clean !== previous);
  return clean.replace(eventHandler, '').replace(unsafeUrl, '').replace(srcDoc, '');
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function sanitizeCss(css: string): string {
  return css
    .replace(/<\/style/gi, '<\\/style')
    .replace(/@import[\s\S]*?;/gi, '')
    .replace(/url\s*\(\s*(['"]?)\s*(?:javascript:|data:)[\s\S]*?\1\s*\)/gi, '')
    .replace(/expression\s*\([^)]*\)/gi, '');
}

/**
 * Extracts CSS authored inside <style> tags. The HTML renderer still removes
 * those tags; callers can render the returned CSS inside a controlled scope.
 */
export function extractEmbeddedCss(html: string): string {
  if (!html) return '';

  const rules: string[] = [];
  const styleElement = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
  let match: RegExpExecArray | null;

  while ((match = styleElement.exec(html)) !== null) {
    rules.push(match[1]);
  }

  return sanitizeCss(rules.join('\n'));
}
