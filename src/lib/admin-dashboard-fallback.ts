import { classifyPrismaError } from '@/lib/sync/db-error-message';
import { isSafeModeEnabled } from '@/lib/runtime-flags';

export function getAdminDashboardFallbackMessage(
  lastError: unknown | null
): string {
  if (isSafeModeEnabled()) {
    return 'SAFE_MODE=1 dans .env : retirez cette variable puis redémarrez l’application.';
  }

  if (lastError) {
    const kind = classifyPrismaError(lastError);
    if (kind === 'missing_migration') {
      return 'Migrations manquantes (sync). Sur le VPS : cd /var/www/school && npx prisma migrate deploy && npm run build && pm2 restart.';
    }
    if (kind === 'auth') {
      return 'PostgreSQL a refusé une requête. Vérifiez DATABASE_URL (school_user / school_db).';
    }
  }

  return 'Certaines données du dashboard n’ont pas pu être chargées. Voir pm2 logs.';
}
