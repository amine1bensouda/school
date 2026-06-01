type Props = {
  appLabel: string;
  message: string;
};

export default function SyncDatabaseError({ appLabel, message }: Props) {
  return (
    <div className="max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 space-y-4">
      <h1 className="text-xl font-bold text-red-900">
        Base de données inaccessible — {appLabel}
      </h1>
      <p className="text-sm text-red-800 whitespace-pre-wrap">{message}</p>
      <div className="text-sm text-gray-800 space-y-2 bg-white rounded-lg p-4 border border-red-100">
        <p className="font-semibold">À vérifier :</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <code className="text-xs">DATABASE_URL</code> dans{' '}
            <code className="text-xs">C:\xampp\htdocs\the-school\.env</code>
          </li>
          <li>
            PostgreSQL local :{' '}
            <code className="text-xs">postgresql://USER:PASS@localhost:5432/the_school</code>
          </li>
          <li>
            Ou une URL Supabase dédiée au site gratuit (projet séparé de quiz-main)
          </li>
          <li>
            <code className="text-xs">npx prisma migrate deploy</code> puis{' '}
            <code className="text-xs">npm run health:db</code>
          </li>
        </ol>
      </div>
    </div>
  );
}
