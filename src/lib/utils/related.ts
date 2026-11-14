/**
 * Relación temática entre guías y cursos por solapamiento de términos.
 * Sin dependencias: normaliza (minúsculas, sin acentos), quita stopwords en español
 * y puntúa por términos compartidos en título (peso alto) y entradilla (peso bajo).
 */

const STOPWORDS = new Set(
  (
    'a al algo ante antes como con contra cual cuando de del desde donde durante el ella ellos en entre era es esa ese eso esta este esto estos fue ha hacer hasta la las le les lo los mas me mi mis muy ni no nos o otra otro para pero poco por porque que quien se sea segun ser si sin sobre su sus tambien te tiene tu tus un una uno unos y ya ' +
    // términos genéricos del sitio que no aportan tema
    'guia guias curso cursos como paso pasos aprende aprender completa completo desde cero tu tus mejor mejores 2024 2025 2026 vs que cual cuales elegir ' +
    // vocabulario de negocio/formato que aparece en casi todas las guías
    'calcular precio precios costo costos cotizar vender venta ventas negocio negocios casa domicilio checklist plantilla criterios ' +
    'preparacion crear servicio servicios cliente clientes emprender emprendimiento empezar principiantes basico basica ' +
    'materiales lista estructura errores consejos tips ganar dinero online contenido herramienta herramientas ' +
    'artesanal artesanales casero caseros vende solo dias claves marketing estrategia estrategias practica practico ' +
    'metodo metodos profesional profesionales armar kit facil rapido real reales perfecto perfecta brillante tipo tipos usar uso ideal'
  ).split(/\s+/)
);

export function terms(text: string | undefined | null): Set<string> {
  if (!text) return new Set();
  const words = text
    .replace(/<[^>]*>/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9ñ]+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    // raíz simple: quita plural para que "pastel"/"pasteles", "una"/"unas" coincidan
    .map((w) => (w.length > 4 ? w.replace(/(es|s)$/, '') : w));
  return new Set(words);
}

interface Doc {
  slug: string;
  title: string;
  dek?: string;
  category?: { slug?: string } | null;
}

function overlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const t of a) if (b.has(t)) n++;
  return n;
}

function score(base: Doc, other: Doc): number {
  const bt = terms(base.title);
  const bd = terms(base.dek);
  const ot = terms(other.title);
  const od = terms(other.dek);
  const sameCategory = base.category?.slug && base.category.slug === other.category?.slug ? 1.5 : 0;
  // La entradilla pesa poco y entradilla↔entradilla no cuenta: introduce coincidencias espurias.
  return overlap(bt, ot) * 3 + (overlap(bt, od) + overlap(bd, ot)) + sameCategory;
}

/** Guías más cercanas por tema: la misma categoría pesa, pero hace falta compartir términos. */
export function relatedByTopic<T extends Doc>(base: Doc, pool: T[], limit = 3): T[] {
  return pool
    .filter((p) => p.slug !== base.slug)
    .map((p) => ({ p, s: score(base, p) }))
    .filter(({ s }) => s >= 3)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

/**
 * Curso más relacionado con una guía: el título del curso debe compartir términos con ella.
 * Devuelve null si no hay ninguno: mejor no recomendar nada que algo ajeno.
 */
export function bestCourseFor<T extends Doc>(base: Doc, courses: T[], minScore = 4.5): T | null {
  let best: T | null = null;
  let bestScore = 0;
  for (const c of courses) {
    // El título del curso debe compartir al menos un término con la guía.
    const courseTitle = terms(c.title);
    if (overlap(terms(base.title), courseTitle) + overlap(terms(base.dek), courseTitle) === 0) continue;
    const s = score(base, c);
    if (s > bestScore) {
      best = c;
      bestScore = s;
    }
  }
  return bestScore >= minScore ? best : null;
}
