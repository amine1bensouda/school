import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostFromDB } from '@/lib/blog-data';
import CommentsSection from '@/components/Comments/CommentsSection';
import { extractEmbeddedCss, sanitizeHtml } from '@/lib/sanitize-html';
import { resolveSeoDescription, resolveSeoTitle } from '@/lib/seo-meta';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import ArticleSchema from '@/components/SEO/ArticleSchema';
import { stripHtml } from '@/lib/utils';

export const revalidate = 900;

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: idOrSlug } = await Promise.resolve(params);
  const post = await getBlogPostFromDB(idOrSlug);
  if (!post) return { title: 'Blog', robots: { index: false, follow: false } };

  const canonical = `/blogs/${encodeURIComponent(post.slug)}`;
  const title = resolveSeoTitle(post.metaTitle, `${post.title} | ${SITE_NAME}`);
  const description = resolveSeoDescription(post.metaDescription, post.excerpt);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id: idOrSlug } = await Promise.resolve(params);
  const post = await getBlogPostFromDB(idOrSlug);

  if (!post) {
    notFound();
  }
  if (idOrSlug !== post.slug) {
    permanentRedirect(`/blogs/${post.slug}`);
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const embeddedCss = extractEmbeddedCss(post.content);

  return (
    <div className="min-h-screen bg-white">
      <ArticleSchema
        title={post.title}
        description={
          resolveSeoDescription(post.metaDescription, post.excerpt) ||
          stripHtml(post.excerpt || '').slice(0, 160)
        }
        slug={post.slug}
        datePublished={post.date}
        category={post.category}
      />
      {embeddedCss && (
        <style dangerouslySetInnerHTML={{ __html: embeddedCss }} />
      )}

      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All articles
        </Link>

        <div className="mb-3">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-900">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>

        <article
          className="blog-article-content prose prose-slate prose-lg max-w-none mt-8
            prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
            prose-p:text-slate-700 prose-p:leading-[1.8]
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />

        <CommentsSection targetType="blog" targetSlug={post.slug} />
      </div>
    </div>
  );
}
