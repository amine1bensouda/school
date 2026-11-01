-- AlterTable
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "world" TEXT NOT NULL DEFAULT 'quiz';

-- CreateIndex
CREATE INDEX IF NOT EXISTS "courses_world_idx" ON "courses"("world");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "courses_status_world_idx" ON "courses"("status", "world");
