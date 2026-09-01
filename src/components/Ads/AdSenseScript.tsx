'use client';

import Script from 'next/script';
import { ADSENSE_CONFIG } from '@/lib/constants';

/**
 * Script AdSense global (requis par Google pour la vérification du site).
 * Chargé une seule fois dans le layout — les blocs <ins> utilisent ce script.
 */
export default function AdSenseScript() {
  const clientId = ADSENSE_CONFIG.clientId;
  if (!clientId) return null;

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}
