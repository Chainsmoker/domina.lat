import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL('https://domina.lat');
  const sitemapUrl = new URL('sitemap.xml', baseUrl).href;

  return new Response(`User-agent: *
Allow: /

# Referencia en buscadores con IA, sin autorizar el rastreador de
# preentrenamiento de OpenAI (GPTBot).
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Perplexity indica que este rastreador es solo para su índice de búsqueda.
User-agent: PerplexityBot
Allow: /

# Acceso a páginas solicitado explícitamente por una persona en Perplexity.
User-agent: Perplexity-User
Allow: /

# Rastreadores asociados al entrenamiento de modelos: no permitidos.
User-agent: GPTBot
Disallow: /

# Google-Extended agrupa entrenamiento y grounding de Gemini; no permite
# habilitar referencia sin habilitar también el uso de entrenamiento.
User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

Sitemap: ${sitemapUrl}
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
