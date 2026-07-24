import { stripHtml } from '@/lib/utils';

/** Tronque une meta description pour Google (~155–160 chars). */
export function truncateMetaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const safe = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${safe.trim()}…`;
}

export function resolveSeoTitle(
  metaTitle: string | null | undefined,
  fallbackTitle: string
): string {
  const custom = (metaTitle || '').trim();
  return custom || fallbackTitle.trim();
}

export function resolveSeoDescription(
  metaDescription: string | null | undefined,
  ...fallbacks: Array<string | null | undefined>
): string {
  const custom = (metaDescription || '').trim();
  if (custom) return truncateMetaDescription(custom);

  for (const fb of fallbacks) {
    const plain = stripHtml(fb || '').replace(/\s+/g, ' ').trim();
    if (plain) return truncateMetaDescription(plain);
  }
  return '';
}
