export type UploadKind = 'image' | 'pdf' | 'video';

const signatures: Record<string, (bytes: Uint8Array) => boolean> = {
  'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png': (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  'image/gif': (b) => String.fromCharCode(...b.slice(0, 6)) === 'GIF87a' || String.fromCharCode(...b.slice(0, 6)) === 'GIF89a',
  'image/webp': (b) => String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP',
  'application/pdf': (b) => String.fromCharCode(...b.slice(0, 5)) === '%PDF-',
  'video/mp4': (b) => String.fromCharCode(...b.slice(4, 8)) === 'ftyp',
  'video/webm': (b) => b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3,
};

const extensions: Record<string, string> = {
  'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif', 'image/webp': '.webp',
  'application/pdf': '.pdf', 'video/mp4': '.mp4', 'video/webm': '.webm',
};

export function validateUploadBytes(type: string, buffer: ArrayBuffer): boolean {
  const validator = signatures[type];
  return Boolean(validator && validator(new Uint8Array(buffer).slice(0, 16)));
}

export function extensionForMime(type: string): string | null {
  return extensions[type] || null;
}
