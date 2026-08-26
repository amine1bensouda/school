import { permanentRedirect } from 'next/navigation';

/** Ancienne hub catégories — redirigée vers /quiz. */
export default function CategorieIndexRedirect() {
  permanentRedirect('/quiz');
}
