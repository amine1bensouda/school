'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';
import { getCurrentUser } from '@/lib/auth-client';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalMenuOpen, setLegalMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    loadUser();
  }, [pathname]); // Re-vérifier après navigation (ex. retour de /login)

  useEffect(() => {
    setLegalMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname?.startsWith(path);
  };

  const practiceActive = pathname === '/additional-resources' || Boolean(pathname?.startsWith('/pages/'));
  const examsActive = Boolean(pathname?.startsWith('/quiz') && !pathname.includes('/lesson'));
  const k12Active = Boolean(pathname === '/k12' || pathname?.startsWith('/k12/'));

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-xl bg-white/95 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 xl:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 min-w-0 group animate-fade-in"
          >
            <div className="relative flex-shrink-0">
              {logoError ? (
                <div className="w-10 h-10 xl:w-14 xl:h-14 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-gray-800">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              ) : (
                <div className="w-10 h-10 xl:w-14 xl:h-14 relative rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 bg-white border-2 border-gray-200 p-1.5 xl:p-2">
                  <Image
                    src="/logo_maths.svg"
                    alt={`Logo ${SITE_NAME}`}
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                    priority
                    onError={() => setLogoError(true)}
                  />
                </div>
              )}
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 via-black to-gray-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>
            <span className="text-base sm:text-lg xl:text-2xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent tracking-tight leading-tight truncate">
              {SITE_NAME}
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0">
            <Link
              href="/"
              className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors relative whitespace-nowrap ${
                isActive('/') ? 'bg-gray-100 rounded-lg' : 'hover:text-gray-900'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/quiz"
              className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors relative whitespace-nowrap ${
                examsActive ? 'bg-gray-100 rounded-lg' : 'hover:text-gray-900'
              }`}
            >
              Exams
              {examsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/k12"
              className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors relative whitespace-nowrap ${
                k12Active ? 'bg-gray-100 rounded-lg' : 'hover:text-gray-900'
              }`}
            >
              K-12
              {k12Active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/additional-resources"
              className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors relative whitespace-nowrap ${
                practiceActive ? 'bg-gray-100 rounded-lg' : 'hover:text-gray-900'
              }`}
            >
              Additional Resources
              {practiceActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/about-us"
              className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors relative whitespace-nowrap ${
                isActive('/about-us')
                  ? 'bg-gray-100 rounded-lg'
                  : 'hover:text-gray-900'
              }`}
            >
              About us
              {isActive('/about-us') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/blogs"
              className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors relative whitespace-nowrap ${
                isActive('/blogs') ? 'bg-gray-100 rounded-lg' : 'hover:text-gray-900'
              }`}
            >
              Blogs
              {isActive('/blogs') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full"></span>
              )}
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLegalMenuOpen((prev) => !prev);
                }}
                className={`px-3 2xl:px-5 py-3 font-medium text-gray-800 transition-colors rounded-lg flex items-center gap-2 ${
                  isActive('/terms-of-service') ||
                  isActive('/privacy-policy') ||
                  isActive('/contact-us')
                    ? 'bg-gray-100'
                    : 'hover:text-gray-900'
                }`}
                aria-expanded={legalMenuOpen}
                aria-haspopup="true"
                aria-label="Open legal links menu"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${legalMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {legalMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-lg py-2 z-50">
                  <Link
                    href="/terms-of-service"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/contact-us"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* User menu */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            {user ? (
              <Link
                href="/dashboard"
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/dashboard')
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-black font-semibold transition-all duration-300 hover:bg-gray-100 relative group border border-transparent hover:border-gray-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gray-900 text-white hover:bg-black"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-gray-700 hover:text-black rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300 flex-shrink-0"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <nav className="xl:hidden mt-4 pb-4 animate-slide-in border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  isActive('/') ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                href="/quiz"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  examsActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Exams
              </Link>
              <Link
                href="/k12"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  k12Active ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                K-12
              </Link>
              <Link
                href="/additional-resources"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  practiceActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Additional Resources
              </Link>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  isActive('/about-us') ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                About us
              </Link>
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  isActive('/blogs') ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Blogs
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link
                href="/terms-of-service"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  isActive('/terms-of-service') ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy-policy"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  isActive('/privacy-policy') ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 font-medium text-gray-800 transition-colors rounded-lg ${
                  isActive('/contact-us') ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                Contact Us
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 font-medium text-gray-800 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 font-medium text-gray-800 hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 font-medium bg-gray-900 text-white hover:bg-black transition-colors rounded-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
