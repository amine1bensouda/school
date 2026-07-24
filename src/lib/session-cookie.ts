import { cookies } from 'next/headers';
import { createSignedToken } from './signed-token';

export const USER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getUserSessionSecret(): string {
  const secret = process.env.USER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('USER_SESSION_SECRET is required in production');
  }
  return secret || 'development-user-session-secret-change-me';
}

export async function setUserSessionCookie(userId: string): Promise<void> {
  const sessionToken = await createSignedToken(userId, getUserSessionSecret(), 'user.v1');
  const cookieStore = await cookies();
  const isProduction =
    Boolean(process.env.VERCEL) || process.env.NODE_ENV === 'production';

  cookieStore.set('session_token', sessionToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: USER_SESSION_MAX_AGE_SECONDS,
    path: '/',
  });
}
