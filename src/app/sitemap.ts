import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllQuizSlugs } from '@/lib/quiz-service';
import { getPublishedCoursesSummaryData, getAllPublishedPagesData } from '@/lib/cache';
import { getAllBlogPostsFromDB } from '@/lib/blog-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function safeSection<T>(
  label: string,
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(`Sitemap section "${label}" failed:`, error);
    return fallback;
  }
}

/**
 * Sitemap résilient : chaque section est isolée.
 * Une panne DB partielle ne doit jamais renvoyer HTTP 500 (Google perdrait le crawl).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogPosts = await safeSection('blogs', () => getAllBlogPostsFromDB(), []);
  if (blogPosts.length > 0) {
    staticPages.push({
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  const quizSlugs = await safeSection('quizzes', () => getAllQuizSlugs(), []);
  const quizPages: MetadataRoute.Sitemap = quizSlugs.map((slug) => ({
    url: `${baseUrl}/quiz/${encodeURIComponent(slug)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const courses = await safeSection('courses', () => getPublishedCoursesSummaryData(), []);
  const coursePages: MetadataRoute.Sitemap = courses
    .filter((course) => course.totalQuizzes > 0)
    .map((course) => ({
      url: `${baseUrl}/quiz/course/${encodeURIComponent(course.slug)}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${encodeURIComponent(post.slug)}`,
    lastModified: post.date ? new Date(post.date) : currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const pages = await safeSection('custom-pages', () => getAllPublishedPagesData(), []);
  const customPages: MetadataRoute.Sitemap = pages
    .filter((p) => !p.noIndex)
    .map((p) => ({
      url: `${baseUrl}/pages/${encodeURIComponent(p.slug)}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [
    ...staticPages,
    ...quizPages,
    ...coursePages,
    ...blogPages,
    ...customPages,
  ];
}
