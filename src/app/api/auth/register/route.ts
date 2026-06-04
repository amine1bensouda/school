import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * L'inscription directe est désactivée — vérification e-mail obligatoire.
 * Utiliser POST /api/auth/register/send-code puis /api/auth/register/verify
 */
export async function POST(_request: NextRequest) {
  return NextResponse.json(
    {
      error:
        'Email verification is required. Use send-code and verify endpoints.',
      steps: [
        'POST /api/auth/register/send-code',
        'POST /api/auth/register/verify',
      ],
    },
    { status: 400 }
  );
}
