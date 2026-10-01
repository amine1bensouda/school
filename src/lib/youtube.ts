/** Convertit un lien YouTube en URL d'intégration. Retourne null sinon. */
export function youtubeEmbedUrl(rawUrl: string, startSeconds?: number | null): string | null {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
  let id: string | null = null;

  if (host === 'youtu.be') {
    id = parsed.pathname.split('/').filter(Boolean)[0] ?? null;
  } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    if (parsed.pathname === '/watch') {
      id = parsed.searchParams.get('v');
    } else {
      const [kind, value] = parsed.pathname.split('/').filter(Boolean);
      if (kind === 'embed' || kind === 'shorts' || kind === 'live' || kind === 'v') {
        id = value ?? null;
      }
    }
  }

  if (!id || !/^[\w-]{6,}$/.test(id)) return null;

  const params = new URLSearchParams({ rel: '0' });
  if (startSeconds && startSeconds > 0) {
    params.set('start', String(Math.floor(startSeconds)));
  }
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params.toString()}`;
}
