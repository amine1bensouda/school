/** Détermine si une formule $$...$$ doit être affichée en bloc (ligne seule) ou en ligne. */
export function isBlockMathInHtml(html: string, start: number, end: number): boolean {
  const before = html.slice(0, start);
  const after = html.slice(end);

  const lineBefore = (before.split(/<br\s*\/?>/gi).pop() ?? before)
    .split(/<\/p>/gi)
    .pop() ?? '';
  const textBefore = lineBefore
    .replace(/<p[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();

  const lineAfter = (after.split(/<br\s*\/?>/gi)[0] ?? after).split(/<p[^>]*>/i)[0] ?? '';
  const textAfter = lineAfter
    .replace(/<\/p>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();

  return textBefore === '' && textAfter === '';
}

export function isBlockMathInPlainText(text: string, start: number, end: number): boolean {
  const lineStart = text.lastIndexOf('\n', start - 1) + 1;
  const lineEndIdx = text.indexOf('\n', end);
  const lineEnd = lineEndIdx === -1 ? text.length : lineEndIdx;
  const line = text.slice(lineStart, lineEnd);
  const relStart = start - lineStart;
  const relEnd = end - lineStart;
  const withoutFormula = line.slice(0, relStart) + line.slice(relEnd);
  return withoutFormula.trim() === '';
}
