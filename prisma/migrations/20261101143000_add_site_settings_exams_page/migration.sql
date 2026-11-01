-- CreateTable
CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "examsTitle" TEXT NOT NULL DEFAULT 'All Exams',
    "examsSubtitle" TEXT NOT NULL DEFAULT '{count} exams available to test your knowledge and improve your mathematics skills',
    "examsLandingHtml" TEXT,
    "examsMetaTitle" TEXT,
    "examsMetaDescription" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- Seed singleton row
INSERT INTO "site_settings" ("id", "examsTitle", "examsSubtitle", "updatedAt")
VALUES (
  'default',
  'All Exams',
  '{count} exams available to test your knowledge and improve your mathematics skills',
  CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;
