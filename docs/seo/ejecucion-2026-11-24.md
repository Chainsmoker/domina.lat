# Ejecución SEO: 2026-11-24

> Registro de lo que se hizo tras la auditoría del 2026-11-14, con datos de Google (Search Console, URL Inspection, PageSpeed, GA4). Complementa `auditoria-2026-11-14.md` y `triage-guias.md`.

## Diagnóstico con datos (28 a 90 días)

| Métrica | Valor |
|---|---|
| Impresiones / clics (28 días) | 703 / 6 (CTR 0.85%, posición media 7.8) |
| Impresiones / clics (90 días) | 2 049 / 28 |
| Sesiones orgánicas GA4 (28 días) | 12 |
| URLs del sitemap indexadas | 39 de 173 |
| Guías indexadas | 18 de 143 |
| Guías con impresiones en 90 días que hoy no están indexadas | 86 (1 112 de 1 329 impresiones de guías) |
| Cursos indexados | 7 de 13 |
| Rendimiento (PageSpeed móvil) | 98 home, 95 curso, 100 guía; `/emprender` 80 en PSI y 1.8 s de LCP en simulación local |

Lectura: Google indexó muchas guías y luego las sacó. No es un fallo técnico, es una señal de calidad del sitio (patrón de contenido a escala, sin autor ni fuentes). Lo técnico ya está limpio; lo que queda es contenido y autoridad.

## Cambios técnicos (en `master`)

- Canonical sin `.html` en páginas prerenderizadas (la home declaraba `/index.html` y Google elegía `/`).
- 404 reales con `Astro.rewrite('/404')` (antes un 302 a `/404`).
- `src/lib/redirects.ts`: 301 para 3 guías borradas que aún recibían impresiones y 6 pares de guías que competían entre sí. Los documentos siguen en Sanity; `getPosts()` los excluye del sitemap y de los listados.
- `src/lib/noindex.ts`: 8 guías delgadas, rastreadas y no indexadas, sin impresiones, con `noindex,follow` y fuera del sitemap.
- `/guias` pasa de 6 a 24 guías por página (6 páginas en vez de 24) para reducir la profundidad de clics.
- Títulos y metas: home, `/sobre`, `/emprender` (dinámico), categorías por slug. Bloque "Guías sobre este tema" en las páginas de curso.
- Caché: `CACHE_VERSION` en `src/lib/redis/client.ts`. Las claves de Redis no caducan; subir ese valor y desplegar invalida todo.

## Cambios en Sanity (no están en git)

- 126 `seoTitle` reescritos a 60 caracteres o menos (125 guías y el curso Cake Designer).
- 4 guías con contenido reescrito con datos verificados de fuentes oficiales y bloque de fuentes con enlaces:
  - `canva-gratis-vs-pro-negocio-servicios`: qué incluye cada plan según Canva, precios de referencia en dólares y ejemplo de cálculo con números ilustrativos.
  - `conservar-masas-galletas-refrigeracion`: FDA, CDC y USDA (4 °C y −18 °C, regla de 24 horas con huevo crudo, regla de 2 horas, descongelado y recongelado).
  - `esterilizacion-herramientas-manicura-guia-basica`: OSHA 3542 y reglamentos de Connecticut y Georgia (10 a 30 minutos de remojo, alcohol, autoclave de referencia, cajas UV).
  - `organizar-taller-costura-casa`: DGUV 203-023, BG ETEM e Institute for Work & Health (alturas, 500 y 750 a 1000 lux, ángulo del cuello).
  En esas 4 guías se actualizaron `body`, `toc`, `dek`, `seoDescription` y `readingTime`.
- Las cifras de esas guías son de normas de EE. UU. o Alemania y están marcadas como referencia, no como la norma local.

## Pendiente (requiere a una persona)

1. **Autor y propietario reales** (auditoría #5): nombre de quien firma, experiencia, país, redes y entidad legal. Sin esto no se puede reforzar `/sobre`, las páginas de autor ni la firma de las guías.
2. **Reenviar el sitemap en Search Console.** El token de Google es de solo lectura.
3. **Cloudflare:** "Always Use HTTPS".
4. **Mejorar más guías.** Las 4 de arriba son la primera tanda. Siguientes por impresiones perdidas: `costos-negocio-reposteria-inversion-inicial` (plegar en el pilar `negocio-de-reposteria-desde-casa`), `ficha-tecnica-cliente-pestanas-cejas`, `herramientas-fontaneria-hogar-guia-basica`, `materiales-para-empezar-a-crochet-checklist`, `rendimiento-ingredientes-reposteria-venta`, `calcular-precio-minuto-corte-confeccion`. El patrón que funcionó: sustituir "consulta la autoridad de tu país" por la cifra oficial con su fuente, y añadir un ejemplo con números.
5. **Cursos no indexados (6 de 13).** Las páginas son copia del vendedor con poco valor propio. Añadir pruebas reales: capturas, una muestra, fecha de prueba y nombre de quien revisó.
6. **Rotar tokens** de Sanity y Upstash (se pegaron en un chat).

## Plan de enlaces externos

No hay datos de enlaces entrantes (solo Common Crawl; faltan claves de Moz y Bing). Un dominio de 3 meses sin autores nombrados rara vez consigue enlaces por sí solo, así que conviene ordenar el trabajo:

1. **Medir primero.** Clave gratuita de Moz (2 500 filas al mes) y verificar el sitio en Bing Webmaster Tools. Con eso `/seo backlinks domina.lat` da una línea base real.
2. **Los creadores de los 13 cursos.** Cada curso tiene una reseña propia con "para quién sí y para quién no". Escribir a cada creador o vendedor para avisarles de la reseña y de que pueden enlazarla. Es el contacto más natural y no requiere inventar nada. Dejar clara la relación de afiliado.
3. **Un dato propio citable.** Con el catálogo se pueden publicar cifras reales (rango de precios por área, formato más frecuente) en `/emprender`. Con 13 cursos es una muestra pequeña, así que presentarla como "nuestro catálogo", no como el mercado.
4. **Guías con cifras oficiales** (las 4 reescritas) son las que mejor se pueden citar. Cuando haya autor nombrado, ofrecerlas a blogs y comunidades de cada nicho (costura, repostería, uñas) como recurso, no como enlace pedido.
5. **Evitar:** directorios de pago, intercambio masivo de enlaces y comentarios en blogs. Pueden costar más de lo que aportan.

## Cómo medir

Vuelve a correr hacia el 22 de diciembre:

```
/seo google gsc sc-domain:domina.lat
/seo google inspect-batch <urls del sitemap>
```

Señales de que va bien: sube el número de URLs indexadas por encima de 39, aparecen impresiones en las 4 guías reescritas y no crecen los 404 en Search Console. Señal de alerta: más guías pasan a "rastreada, no indexada".
