-- AlterTable
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;
