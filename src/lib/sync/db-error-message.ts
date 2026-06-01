export function formatPrismaDbError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('P1000') || error.message.includes('Authentication failed')) {
      return (
        'Authentification PostgreSQL refusée.\n' +
        'the-school utilise actuellement souvent localhost:5432 — vérifiez que PostgreSQL tourne, ' +
        'que la base existe (ex. the_school) et que DATABASE_URL est correct dans .env.\n\n' +
        'En dev, vous pouvez aussi pointer vers une 2ᵉ base Supabase (projet séparé) comme quiz-main.'
      );
    }
    if (error.message.includes('ENOTFOUND') || error.message.includes('tenant')) {
      return (
        'Serveur PostgreSQL introuvable ou projet Supabase invalide / en pause.\n' +
        'Mettez à jour DATABASE_URL depuis le tableau de bord Supabase.'
      );
    }
    if (
      error.message.includes('sync_logs') ||
      error.message.includes('source_quiz_id') ||
      error.message.includes('does not exist')
    ) {
      return (
        'Tables de sync absentes.\n' +
        'Exécutez dans the-school : npx prisma migrate deploy'
      );
    }
    return error.message;
  }
  return 'Erreur de connexion à la base de données.';
}
