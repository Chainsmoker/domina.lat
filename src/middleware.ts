import { defineMiddleware } from 'astro:middleware';
import { REDIRECTS } from './lib/redirects';

// Mismas cabeceras que public/_headers (que solo aplica a archivos estáticos).
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Redireccionar www.domina.lat a domina.lat (301 Permanent)
  if (url.hostname === 'www.domina.lat') {
    url.hostname = 'domina.lat';
    url.protocol = 'https:';
    return context.redirect(url.toString(), 301);
  }

  // Guías fusionadas/eliminadas: 301 al destino definido en src/lib/redirects.ts
  const target = REDIRECTS[url.pathname.replace(/\/$/, '')];
  if (target) {
    return context.redirect(target, 301);
  }

  const response = await next();
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(name)) {
      try {
        response.headers.set(name, value);
      } catch {
        // Respuestas con headers inmutables (p. ej. fetch proxied): se dejan tal cual.
      }
    }
  }
  return response;
});
