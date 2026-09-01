'use client';

import { useEffect } from 'react';
import { ADSENSE_CONFIG } from '@/lib/constants';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
}: AdSenseProps) {
  const clientId = ADSENSE_CONFIG.clientId;

  useEffect(() => {
    if (!clientId || typeof window === 'undefined') return;
    try {
      ((window as Window & { adsbygoogle?: unknown[] }).adsbygoogle =
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [clientId, adSlot]);

  if (!clientId) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        ...style,
      }}
      data-ad-client={clientId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
    />
  );
}
