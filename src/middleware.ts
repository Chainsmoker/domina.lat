import type { MiddlewareHandler } from 'astro';

const legacyPaths: Record<string, string> = {
  '/sobre-domina': '/sobre',
  '/contact': '/contacto',
  '/afiliados': '/aviso-afiliados',
  '/categoria': '/categoria/belleza-y-unas',
};

export const onRequest: MiddlewareHandler = ({ url }, next) => {
  const destination = legacyPaths[url.pathname];

  if (!destination) return next();

  const redirectUrl = new URL(destination, url);
  redirectUrl.search = url.search;
  return Response.redirect(redirectUrl, 301);
};
