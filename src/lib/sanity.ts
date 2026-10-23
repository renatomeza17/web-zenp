// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'uugu24du', 
  dataset: 'production',
  useCdn: true, // true para caché rápida y ahorro de cuota gratuita
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

// Función auxiliar para obtener las URLs optimizadas de Sanity
export function urlFor(source: any) {
  return builder.image(source);
}