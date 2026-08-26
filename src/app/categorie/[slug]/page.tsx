import { permanentRedirect } from 'next/navigation';

/** Anciennes pages catégorie — redirigées vers /quiz. */
export default function CategorieSlugRedirect() {
  permanentRedirect('/quiz');
}
