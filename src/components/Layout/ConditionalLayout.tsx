'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import type { PracticePageLink } from '@/lib/practice-pages';
import type { LessonMenuGroup } from '@/lib/lesson-menu';

export default function ConditionalLayout({
  children,
  practicePages = [],
  lessonMenu = [],
}: {
  children: React.ReactNode;
  practicePages?: PracticePageLink[];
  lessonMenu?: LessonMenuGroup[];
}) {
  const pathname = usePathname();
  const isAdminLogin = pathname === '/admin/login';
  const isEnConstruction = pathname === '/en-construction';
  const isMaintenance = pathname === '/maintenance';

  // Pas de Header/Footer : login admin, pages temporaires, mode maintenance global
  if (isAdminLogin || isEnConstruction || isMaintenance) {
    return <>{children}</>;
  }

  return (
    <>
      <Header practicePages={practicePages} lessonMenu={lessonMenu} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
