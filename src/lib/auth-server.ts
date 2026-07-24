import { cookies } from 'next/headers';
import { prisma } from './db';
import { getUserSessionSecret, USER_SESSION_MAX_AGE_SECONDS } from './session-cookie';
import { verifySignedToken } from './signed-token';

/**
 * Récupère l'utilisateur à partir d'un session token (sans appeler cookies()).
 * Utilisé par les route handlers qui appellent cookies() eux-mêmes en premier.
 */
export async function getUserBySessionToken(sessionToken: string | undefined) {
  if (!sessionToken) return null;
  try {
    const userId = await verifySignedToken(
      sessionToken,
      getUserSessionSecret(),
      'user.v1',
      USER_SESSION_MAX_AGE_SECONDS * 1000
    );
    if (!userId) return null;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error getting user from session:', error);
    return null;
  }
}

/**
 * Récupère l'utilisateur actuel depuis la session (appel à cookies() ici).
 */
export async function getCurrentUserFromSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    return getUserBySessionToken(sessionToken);
  } catch (error) {
    console.error('Error getting user from session:', error);
    return null;
  }
}

/**
 * Vérifie si l'utilisateur est authentifié
 */
export async function requireAuth() {
  const user = await getCurrentUserFromSession();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
