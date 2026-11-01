/** Niveaux affichés sur /k12 (style grille type IXL). */
export type K12Grade = {
  code: string;
  title: string;
  description: string;
  /** Couleur accent (badge + bordure) */
  color: string;
  /** Mots-clés pour rattacher un cours K-12 existant */
  slugHints: string[];
};

export const K12_GRADES: K12Grade[] = [
  {
    code: 'GS',
    title: 'Maths GS',
    description:
      'Count and order numbers, add and subtract, recognize shapes and solids… and much more!',
    color: '#ea580c',
    slugHints: ['gs', 'grande-section', 'kindergarten', 'maternelle'],
  },
  {
    code: 'CP',
    title: 'Maths CP',
    description:
      'Count to 100, work with numbers, calculate, recognize shapes, measure lengths… and much more!',
    color: '#16a34a',
    slugHints: ['cp', 'grade-1', 'grade1', 'cours-preparatoire'],
  },
  {
    code: 'CE1',
    title: 'Maths CE1',
    description:
      'Learn multiplication tables, add and subtract, decompose numbers, measure lengths, recognize geometric shapes… and much more!',
    color: '#dc2626',
    slugHints: ['ce1', 'grade-2', 'grade2'],
  },
  {
    code: 'CE2',
    title: 'Maths CE2',
    description:
      'Memorize multiplication tables, understand doubles and halves, share and divide, measure lengths, masses and volumes… and much more!',
    color: '#0284c7',
    slugHints: ['ce2', 'grade-3', 'grade3'],
  },
  {
    code: 'CM1',
    title: 'Maths CM1',
    description:
      'Discover fractions, understand decimals, learn to divide, recognize parallel and perpendicular lines, calculate perimeters and areas… and much more!',
    color: '#7c3aed',
    slugHints: ['cm1', 'grade-4', 'grade4'],
  },
  {
    code: 'CM2',
    title: 'Maths CM2',
    description:
      'Work with fractions and decimals, calculate perimeters and areas, measure angles, use symmetry, recognize plane figures and solids… and much more!',
    color: '#0d9488',
    slugHints: ['cm2', 'grade-5', 'grade5'],
  },
  {
    code: '6e',
    title: 'Maths 6ᵉ',
    description:
      'Operate on fractions and decimals, read number lines, respect order of operations, calculate percentages, use symmetry, compute areas and volumes… and much more!',
    color: '#c2410c',
    slugHints: ['6e', '6eme', 'sixieme', 'grade-6', 'grade6', 'middle-school'],
  },
];

export function matchCourseToGrade(
  course: { title: string; slug: string },
  grade: K12Grade
): boolean {
  const hay = `${course.slug} ${course.title}`.toLowerCase();
  return grade.slugHints.some((hint) => hay.includes(hint.toLowerCase()));
}
