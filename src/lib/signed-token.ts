const encoder = new TextEncoder();

function base64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const encoded = typeof btoa === 'function'
    ? btoa(binary)
    : Buffer.from(binary, 'binary').toString('base64');
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return base64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

function equal(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index++) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

export async function createSignedToken(subject: string, secret: string, namespace: string): Promise<string> {
  const issuedAt = Date.now();
  const payload = `${namespace}.${subject}.${issuedAt}`;
  return `${subject}.${issuedAt}.${await sign(secret, payload)}`;
}

export async function verifySignedToken(
  token: string | undefined,
  secret: string,
  namespace: string,
  maxAgeMs: number
): Promise<string | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [subject, issuedAtText, signature] = parts;
  const issuedAt = Number(issuedAtText);
  const now = Date.now();
  if (!subject || !Number.isFinite(issuedAt) || issuedAt <= 0) return null;
  if (issuedAt > now + 60_000 || now - issuedAt > maxAgeMs) return null;
  const expected = await sign(secret, `${namespace}.${subject}.${issuedAt}`);
  return equal(expected, signature) ? subject : null;
}
