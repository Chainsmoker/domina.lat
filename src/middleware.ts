import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Redireccionar www.domina.lat a domina.lat (301 Permanent)
  if (url.hostname === 'www.domina.lat') {
    url.hostname = 'domina.lat';
    url.protocol = 'https:';
    return context.redirect(url.toString(), 301);
  }

  return next();
});
