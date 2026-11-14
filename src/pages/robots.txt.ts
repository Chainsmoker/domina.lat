import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL('https://domina.lat');
  const sitemapUrl = new URL('sitemap.xml', baseUrl).href;

  // Content-Signal: indexar y citar en respuestas de IA sí; entrenar modelos no.
  // Desactivar el "managed robots.txt" de Cloudflare para no duplicar el grupo User-agent: *.
  return new Response(`User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
Disallow: /go/
Disallow: /admin/
Disallow: /api/

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

# Más rastreadores de entrenamiento (antes los cubría el robots.txt administrado de Cloudflare).
User-agent: anthropic-ai
User-agent: Claude-Web
User-agent: Amazonbot
User-agent: cohere-ai
User-agent: cohere-training-data-crawler
User-agent: Diffbot
User-agent: MistralAI-Training
User-agent: Google-CloudVertexBot
User-agent: omgili
User-agent: Cotoyogi
User-agent: ICC-Crawler
Disallow: /

Sitemap: ${sitemapUrl}
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
