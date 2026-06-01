-- Réception sync depuis quiz-main (premium)
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "source_quiz_id" TEXT;
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "source_synced_at" TIMESTAMP(3);
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "source_payload_hash" TEXT;
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "is_enabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "quizzes" ADD COLUMN IF NOT EXISTS "lock_local_edits" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS "quizzes_source_quiz_id_key" ON "quizzes"("source_quiz_id");
CREATE INDEX IF NOT EXISTS "quizzes_is_enabled_idx" ON "quizzes"("is_enabled");

ALTER TABLE "questions" ADD COLUMN IF NOT EXISTS "source_question_id" TEXT;
CREATE INDEX IF NOT EXISTS "questions_quiz_id_source_question_id_idx" ON "questions"("quiz_id", "source_question_id");

ALTER TABLE "answers" ADD COLUMN IF NOT EXISTS "source_answer_id" TEXT;

CREATE TABLE IF NOT EXISTS "sync_logs" (
    "id" TEXT NOT NULL,
    "source_quiz_id" TEXT NOT NULL,
    "local_quiz_id" TEXT,
    "action" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "sync_logs_source_quiz_id_created_at_idx" ON "sync_logs"("source_quiz_id", "created_at" DESC);
