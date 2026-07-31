/** Pages custom publiées pour le menu Practice Guide. */

export type PracticePageLink = {
  title: string;
  slug: string;
};

/** Titre court pour le menu (partie avant « : » si présente). */
export function shortPracticePageTitle(title: string): string {
  const trimmed = title.trim();
  const beforeColon = trimmed.split(':')[0]?.trim();
  return beforeColon || trimmed;
}
