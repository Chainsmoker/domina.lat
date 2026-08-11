import { sanityClient } from 'sanity:client';

const token = import.meta.env.SANITY_API_READ_TOKEN;
const isProd = import.meta.env.PROD;

// Cliente configurado: useCdn: false en desarrollo (cambios en vivo instantáneos), useCdn: true en producción (máximo rendimiento)
export const liveClient = sanityClient.withConfig({
  useCdn: isProd,
  token: token || undefined,
  perspective: 'published',
});

/**
 * Cliente para leer borradores/drafts en vivo antes de publicar
 */
export const previewClient = token
  ? sanityClient.withConfig({
      token,
      useCdn: false,
      perspective: 'previewDrafts',
    })
  : liveClient;

/**
 * Helper para realizar consultas GROQ a Sanity.
 */
export async function sanityFetch<T = any>({
  query,
  params = {},
  preview = false,
}: {
  query: string;
  params?: Record<string, any>;
  preview?: boolean;
}): Promise<T> {
  const client = preview && token ? previewClient : liveClient;
  return await client.fetch<T>(query, params);
}

export { sanityClient };
