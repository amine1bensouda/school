import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';

export const SITE_SETTINGS_CACHE_TAG = 'site-settings';
export const SITE_SETTINGS_ID = 'default';

export type ExamsPageSettings = {
  examsTitle: string;
  examsSubtitle: string;
  examsLandingHtml: string | null;
  examsMetaTitle: string | null;
  examsMetaDescription: string | null;
};

const DEFAULT_EXAMS: ExamsPageSettings = {
  examsTitle: 'All Exams',
  examsSubtitle:
    '{count} exams available to test your knowledge and improve your mathematics skills',
  examsLandingHtml: null,
  examsMetaTitle: null,
  examsMetaDescription: null,
};

async function ensureSiteSettings() {
  return prisma.siteSettings.upsert({
    where: { id: SITE_SETTINGS_ID },
    create: { id: SITE_SETTINGS_ID },
    update: {},
  });
}

const getSiteSettingsCached = unstable_cache(
  async () => {
    const row = await ensureSiteSettings();
    return {
      examsTitle: row.examsTitle || DEFAULT_EXAMS.examsTitle,
      examsSubtitle: row.examsSubtitle || DEFAULT_EXAMS.examsSubtitle,
      examsLandingHtml: row.examsLandingHtml || null,
      examsMetaTitle: row.examsMetaTitle || null,
      examsMetaDescription: row.examsMetaDescription || null,
    } satisfies ExamsPageSettings;
  },
  ['site-settings-default'],
  { revalidate: 300, tags: [SITE_SETTINGS_CACHE_TAG] }
);

export async function getExamsPageSettings(): Promise<ExamsPageSettings> {
  try {
    return await getSiteSettingsCached();
  } catch (error) {
    console.error('getExamsPageSettings:', error);
    return DEFAULT_EXAMS;
  }
}

export function invalidateSiteSettingsCache() {
  revalidateTag(SITE_SETTINGS_CACHE_TAG);
}

/** Remplace {count} dans le sous-titre Exams. */
export function formatExamsSubtitle(template: string, count: number): string {
  const label = `${count} exam${count !== 1 ? 's' : ''}`;
  return (template || DEFAULT_EXAMS.examsSubtitle).replace(/\{count\}/g, label);
}
