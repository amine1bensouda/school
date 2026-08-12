import { permanentRedirect } from 'next/navigation';

/** Ancienne URL FR — redirige vers la page About canonique. */
export default function AProposRedirectPage() {
  permanentRedirect('/about-us');
}
