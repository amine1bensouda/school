/** Pages custom publiées pour le menu Additional Resources. */

export type PracticePageLink = {
  title: string;
  slug: string;
};

export type PracticeMenuPage = PracticePageLink & {
  label: string;
};

export type PracticeMenuGroup = {
  name: string;
  pages: PracticeMenuPage[];
};

const courseRules: { name: string; slug: RegExp }[] = [
  { name: 'SAT', slug: /(?:^|-)sat(?:-|$)/ },
  { name: 'ACT', slug: /(?:^|-)act(?:-|$)/ },
  { name: 'PSAT 8/9', slug: /psat-8-9/ },
  { name: 'PSAT/NMSQT', slug: /psat/ },
  { name: 'AP Calculus AB', slug: /ap-calculus-ab/ },
  { name: 'AP Calculus BC', slug: /ap-calculus-bc/ },
  { name: 'AP Precalculus', slug: /ap-precalculus/ },
];

/** Titre court pour le menu (partie avant « : » si présente). */
export function shortPracticePageTitle(title: string): string {
  const trimmed = title.trim();
  const beforeColon = trimmed.split(':')[0]?.trim();
  return beforeColon || trimmed;
}

function stripCoursePrefix(text: string): string {
  return text
    .replace(
      /^(free\s+)?(digital\s+)?(ap calculus (ab|bc)|ap precalculus|psat\/nmsqt|psat 8\/9|psat|act|sat)\s+(math\s+)?(practice(\s+problems)?\s*)?/i,
      '',
    )
    .trim();
}

function topicLabel(title: string, slug: string): string {
  if (/^free-/.test(slug) && !title.includes(':')) return 'Overview';

  const head = title.split('|')[0]?.trim() || title.trim();
  const colon = head.indexOf(':');
  if (colon === -1) {
    const topic = stripCoursePrefix(head);
    return topic || shortPracticePageTitle(title);
  }

  const before = head.slice(0, colon).trim();
  const rawAfter = head.slice(colon + 1).trim();
  const afterIsGeneric = /^\d+\s+practice problems/i.test(rawAfter);

  if (afterIsGeneric) {
    return stripCoursePrefix(before) || before;
  }

  const after = rawAfter
    .replace(/\s*\([^)]*step-by-step explanations[^)]*\)\s*/gi, '')
    .trim();
  return after || stripCoursePrefix(before) || before;
}

/** Menu Additional Resources : un bloc par cours (SAT, ACT, …). */
export function groupPracticePages(pages: PracticePageLink[]): PracticeMenuGroup[] {
  const buckets = new Map<string, PracticeMenuPage[]>();

  for (const page of pages) {
    const rule = courseRules.find((item) => item.slug.test(page.slug));
    const name = rule?.name ?? 'Other';
    const list = buckets.get(name) ?? [];
    list.push({ ...page, label: topicLabel(page.title, page.slug) });
    buckets.set(name, list);
  }

  const ordered = [
    ...courseRules.map((rule) => rule.name),
    ...[...buckets.keys()].filter((name) => !courseRules.some((rule) => rule.name === name)),
  ];

  return ordered
    .filter((name) => (buckets.get(name)?.length ?? 0) > 0)
    .map((name) => ({
      name,
      pages: (buckets.get(name) ?? []).sort((a, b) => {
        if (a.label === 'Overview' && b.label !== 'Overview') return -1;
        if (b.label === 'Overview' && a.label !== 'Overview') return 1;
        return a.label.localeCompare(b.label, 'en');
      }),
    }));
}
