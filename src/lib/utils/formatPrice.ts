/**
 * Formatea un precio numérico o texto a formato $XX o $XX.YY (máximo 2 decimales).
 * Ejemplos:
 * 39 -> "$39"
 * 39.5 -> "$39.50"
 * 39.99 -> "$39.99"
 * "US$39" -> "$39"
 * "US9" -> "$9"
 */
export function formatPrice(price?: number | string | null): string {
  if (price === undefined || price === null || price === '') return '';

  let num: number;
  if (typeof price === 'number') {
    num = price;
  } else {
    const cleaned = String(price).replace(/[^0-9.]/g, '');
    num = parseFloat(cleaned);
  }

  if (isNaN(num)) return String(price);

  const formatted = Number.isInteger(num)
    ? num.toString()
    : num.toFixed(2);

  return `$${formatted}`;
}
