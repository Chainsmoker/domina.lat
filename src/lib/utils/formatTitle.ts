/**
 * Formatea un título para que la palabra clave principal se destaque en color naranja (var(--orange)).
 * Si ya viene formateado con HTML (ej: <span>palabra</span>), lo mantiene intacto.
 */
export function formatTitle(title: string = ''): string {
  if (!title) return '';
  
  // Si ya contiene etiquetas HTML <span>, lo dejamos como está
  if (title.includes('<span>') || title.includes('<span')) {
    return title;
  }

  // Lista de palabras clave principales para resaltar
  const keywords = ['uñas', 'pastelería', 'cocina', 'postres', 'digital', 'servicio vendible', 'curso online', 'pestañas', 'maquillaje', 'habilidad', 'oficios', 'emprender'];
  
  for (const kw of keywords) {
    const regex = new RegExp(`\\b(${kw})(:)?\\b`, 'gi');
    if (regex.test(title)) {
      return title.replace(regex, '<span>$1$2</span>');
    }
  }

  // Si no coincide con ninguna palabra clave y tiene 2 o más palabras, envuelve la última
  const words = title.split(' ');
  if (words.length >= 2) {
    const lastWord = words.pop();
    return `${words.join(' ')} <span>${lastWord}</span>`;
  }

  return title;
}
