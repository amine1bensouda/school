-- AlterTable
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;

-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;
