/** Clé publique reCAPTCHA v3 (client-safe). */
export function getRecaptchaSiteKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  return key || undefined;
}
