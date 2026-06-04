import { cookies } from 'next/headers';

export async function setUserSessionCookie(userId: string): Promise<void> {
  const sessionToken = `${userId}-${Date.now()}`;
  const cookieStore = await cookies();
  const isProduction =
    Boolean(process.env.VERCEL) || process.env.NODE_ENV === 'production';

  cookieStore.set('session_token', sessionToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}
