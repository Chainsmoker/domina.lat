/**
 * Guías que no se indexan (meta robots noindex,follow) ni van al sitemap.
 * Criterio (2026-11-24, datos de Search Console): menos de 650 palabras, Google las rastreó
 * y no las indexó, y no tuvieron ninguna impresión en 90 días. Se pueden mejorar y quitar de aquí.
 */
export const NOINDEX_GUIDES = new Set<string>([
  'checklist-auditar-presencia-digital-tecnico-reparaciones',
  'como-elegir-curso-de-ia',
  'plantilla-comparar-proveedores-insumos-belleza',
  'ficha-pedido-postres-personalizados',
  'kit-portatil-maquillaje-domicilio',
  'tabla-medidas-tejidos-encargo',
  'congelar-bizcochos-horneados-pasteles-anticipacion',
  'herramientas-gratis-diseno-publicaciones-comerciales-redes-micronegocio',
]);
