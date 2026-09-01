const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export function isRecaptchaEnabled(): boolean {
  return Boolean(
    process.env.RECAPTCHA_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()
  );
}

type VerifyResult =
  | { ok: true; score?: number }
  | { ok: false; error: string };

/**
 * Vérifie un token reCAPTCHA v3 côté serveur.
 * Si reCAPTCHA n'est pas configuré, la vérification est ignorée (rétrocompatibilité).
 */
export async function verifyRecaptchaToken(
  token: string | undefined,
  options?: { remoteIp?: string | null; action?: string }
): Promise<VerifyResult> {
  if (!isRecaptchaEnabled()) {
    return { ok: true };
  }

  if (!token?.trim()) {
    return { ok: false, error: 'Please complete the reCAPTCHA verification.' };
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY!.trim();
  const params = new URLSearchParams({
    secret,
    response: token.trim(),
  });

  if (options?.remoteIp) {
    params.set('remoteip', options.remoteIp);
  }

  let response: Response;
  try {
    response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
  } catch {
    return { ok: false, error: 'Unable to verify reCAPTCHA. Please try again.' };
  }

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    score?: number;
    action?: string;
    'error-codes'?: string[];
  } | null;

  if (!data?.success) {
    return { ok: false, error: 'reCAPTCHA verification failed. Please try again.' };
  }

  const expectedAction = options?.action || 'contact';
  if (data.action && data.action !== expectedAction) {
    return { ok: false, error: 'Invalid reCAPTCHA action.' };
  }

  const minScore = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');
  if (typeof data.score === 'number' && Number.isFinite(minScore) && data.score < minScore) {
    return { ok: false, error: 'reCAPTCHA verification failed. Please try again.' };
  }

  return { ok: true, score: data.score };
}
