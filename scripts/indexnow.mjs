#!/usr/bin/env node
/**
 * Envía URLs a IndexNow (Bing, Copilot, Yandex, Seznam…).
 *
 * Uso:
 *   node scripts/indexnow.mjs                 # URLs del sitemap modificadas en las últimas 48 h
 *   node scripts/indexnow.mjs --since 7d      # ventana distinta (h = horas, d = días)
 *   node scripts/indexnow.mjs --all           # todo el sitemap (solo la primera vez)
 *   node scripts/indexnow.mjs /guias/a /cursos/b   # URLs concretas
 *   node scripts/indexnow.mjs --dry-run ...   # muestra qué enviaría, sin enviar
 *
 * Requiere que https://domina.lat/<KEY>.txt esté publicado (archivo en public/).
 * Ejecutar después del deploy y después de publicar o editar contenido en Sanity.
 */

const HOST = 'domina.lat';
const SITE = `https://${HOST}`;
const KEY = '45f9cdb852021dab45386c29c9816ab5';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10000; // límite del protocolo por petición

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const all = args.includes('--all');
const sinceIdx = args.indexOf('--since');
const sinceArg = sinceIdx >= 0 ? args[sinceIdx + 1] : '48h';
const explicit = args.filter((a, i) => a.startsWith('/') && args[i - 1] !== '--since');

function parseWindow(value) {
  const m = /^(\d+)([hd])$/.exec(value || '');
  if (!m) throw new Error(`--since inválido: "${value}" (usa p. ej. 48h o 7d)`);
  return Number(m[1]) * (m[2] === 'd' ? 86_400_000 : 3_600_000);
}

async function urlsFromSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml respondió ${res.status}`);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
    loc: /<loc>(.*?)<\/loc>/.exec(body)?.[1],
    lastmod: /<lastmod>(.*?)<\/lastmod>/.exec(body)?.[1],
  }));
  if (all) return entries.map((e) => e.loc).filter(Boolean);
  const cutoff = Date.now() - parseWindow(sinceArg);
  return entries
    .filter((e) => e.loc && e.lastmod && Date.parse(e.lastmod) >= cutoff)
    .map((e) => e.loc);
}

async function main() {
  const urls = explicit.length > 0 ? explicit.map((p) => `${SITE}${p}`) : await urlsFromSitemap();

  if (urls.length === 0) {
    console.log('Nada que enviar.');
    return;
  }

  const keyRes = await fetch(KEY_LOCATION);
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
    throw new Error(`La clave no está publicada en ${KEY_LOCATION}. Haz deploy primero.`);
  }

  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    if (dryRun) {
      console.log(`[dry-run] ${urlList.length} URLs:\n${urlList.join('\n')}`);
      continue;
    }
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    // 200/202 = aceptado. 422 = URLs que no pertenecen al host. 429 = demasiadas peticiones.
    console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
    if (res.status >= 400) process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
