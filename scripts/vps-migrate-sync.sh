#!/usr/bin/env bash
# Applique les migrations Prisma sur un VPS PostgreSQL dont la base existe déjà.
# Usage (depuis /var/www/school) :
#   chmod +x scripts/vps-migrate-sync.sh
#   ./scripts/vps-migrate-sync.sh

set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Marquage des migrations historiques comme déjà appliquées (base existante)..."
for name in \
  20260128163701_init \
  20260130093218_add_course_status \
  20260202081428_add_user_and_quiz_attempt
do
  npx prisma migrate resolve --applied "$name" 2>/dev/null || true
done

echo "==> Déploiement des nouvelles migrations (sync, etc.)..."
npx prisma migrate deploy

echo "==> OK. Redémarrez l'app : pm2 restart <nom-processus>"
