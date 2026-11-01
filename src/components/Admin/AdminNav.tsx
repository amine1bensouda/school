'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function AdminNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const world = searchParams.get('world');

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊', match: 'exact' as const },
    { href: '/admin/courses', label: 'Courses', icon: '📚', match: 'courses-all' as const },
    { href: '/admin/courses?world=quiz', label: 'Quiz', icon: '🧠', match: 'world-quiz' as const },
    { href: '/admin/courses?world=k12', label: 'K-12', icon: '🎒', match: 'world-k12' as const },
    { href: '/admin/modules', label: 'Modules', icon: '📦', match: 'prefix' as const },
    { href: '/admin/lessons', label: 'Lessons', icon: '📄', match: 'prefix' as const },
    { href: '/admin/quizzes', label: 'Quizzes', icon: '📝', match: 'prefix' as const },
    { href: '/admin/sync', label: 'Sync premium', icon: '🔄', match: 'prefix' as const },
    { href: '/admin/blogs', label: 'Blogs', icon: '📰', match: 'prefix' as const },
    { href: '/admin/pages', label: 'Pages', icon: '📄', match: 'prefix' as const },
    { href: '/admin/exams-page', label: 'Exams page', icon: '🎯', match: 'exact' as const },
  ];

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.match === 'exact') return pathname === item.href;
    if (item.match === 'courses-all') {
      return pathname === '/admin/courses' && !world;
    }
    if (item.match === 'world-quiz') {
      return pathname === '/admin/courses' && world === 'quiz';
    }
    if (item.match === 'world-k12') {
      return pathname === '/admin/courses' && world === 'k12';
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <div className="flex space-x-2 lg:space-x-4 overflow-x-auto">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            isActive(item)
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function AdminNav() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center space-x-6 min-w-0">
            <Link
              href="/admin"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex-shrink-0"
            >
              Admin Panel
            </Link>
            <Suspense fallback={<div className="h-9 w-64 bg-gray-100 rounded-lg animate-pulse" />}>
              <AdminNavLinks />
            </Suspense>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
