#!/usr/bin/env bash
# Base PostgreSQL déjà remplie (VPS) : baseline P3005 + colonnes sync + order.
# Usage : cd /var/www/school && chmod +x scripts/vps-migrate-sync.sh && ./scripts/vps-migrate-sync.sh

set -euo pipefail

cd "$(dirname "$0")/.."

BASELINE=(
  20260128163701_init
  20260130093218_add_course_status
  20260202081428_add_user_and_quiz_attempt
)

SYNC_MIGRATION=20260601120000_quiz_sync_from_premium
SYNC_SQL="prisma/migrations/${SYNC_MIGRATION}/migration.sql"

echo "==> 1/4 Baseline : migrations historiques déjà en base"
for name in "${BASELINE[@]}"; do
  echo "    resolve --applied $name"
  npx prisma migrate resolve --applied "$name" || true
done

echo "==> 2/4 SQL sync (order, source_quiz_id, sync_logs…) — idempotent"
if [ ! -f "$SYNC_SQL" ]; then
  echo "Fichier introuvable: $SYNC_SQL"
  exit 1
fi
npx prisma db execute --file "$SYNC_SQL" --schema prisma/schema.prisma

echo "==> 3/4 Index moduleId + order (si absent)"
npx prisma db execute --stdin --schema prisma/schema.prisma <<'SQL'
CREATE INDEX IF NOT EXISTS "quizzes_moduleId_order_idx" ON "quizzes"("moduleId", "order");
SQL

echo "==> 4/4 Enregistrer la migration sync dans _prisma_migrations"
npx prisma migrate resolve --applied "$SYNC_MIGRATION" || true

echo ""
echo "Statut Prisma :"
npx prisma migrate status || true

echo ""
echo "Test connexion :"
npm run health:db

echo ""
echo "Terminé. Lancez : npm run build && pm2 restart school"
