/**
 * Redirects 301 para guías fusionadas o eliminadas (fase de clasificación de contenido).
 * Clave: ruta antigua. Valor: ruta destino. Sin barra final.
 * Solo funciona para rutas SSR (p. ej. /guias/*, /cursos/*): el middleware no ve las prerenderizadas.
 *
 * Ejemplo:
 *   '/guias/calcular-punto-equilibrio-maquillaje-domicilio': '/guias/calcular-punto-de-equilibrio-maquillaje-a-domicilio',
 */
export const REDIRECTS: Record<string, string> = {};
