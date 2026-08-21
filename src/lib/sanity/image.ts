import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Helper para generar URLs de imágenes optimizadas de Sanity.
 * Ejemplo de uso en componente Astro:
 * urlFor(imageObj).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format');
}
