/**
 * Redirects 301 para guías fusionadas o eliminadas (fase de clasificación de contenido).
 * Clave: ruta antigua. Valor: ruta destino. Sin barra final.
 * Solo funciona para rutas SSR (p. ej. /guias/*, /cursos/*): el middleware no ve las prerenderizadas.
 *
 * Ejemplo:
 *   '/guias/calcular-punto-equilibrio-maquillaje-domicilio': '/guias/calcular-punto-de-equilibrio-maquillaje-a-domicilio',
 */
export const REDIRECTS: Record<string, string> = {
  // Guías borradas de Sanity que seguían recibiendo impresiones (nombre antiguo con sufijo "continuidad")
  '/guias/como-calcular-precio-venta-tejidos-crochet-dos-agujas-continuidad-20260901152904': '/guias/calcular-precio-tejidos-crochet-venta',
  '/guias/como-lijar-madera-para-pintar-continuidad-20260901180700': '/guias/preparacion-madera-lijado-para-pintar',
  '/guias/herramientas-fontaneria-hogar-reparaciones-comunes-continuidad-20260901154150': '/guias/herramientas-fontaneria-hogar-guia-basica',

  // Canibalización: dos guías sobre el mismo tema. Se conserva la que tiene más impresiones (o más contenido).
  // Los documentos siguen en Sanity (no se borraron): para recuperar uno, quitar su línea de aquí.
  '/guias/calcular-punto-equilibrio-maquillaje-domicilio': '/guias/calcular-punto-de-equilibrio-maquillaje-a-domicilio',
  '/guias/fotos-productos-artesanales-celular': '/guias/fotografia-productos-artesanales-luz-natural-ventana-casa',
  '/guias/taller-costura-ergonomico-casa': '/guias/organizar-taller-costura-casa',
  '/guias/crear-curso-online-de-manualidades-desde-cero': '/guias/crear-curso-online-desde-cero',
  '/guias/monetizar-decoracion-unas-acrilicas-con-ia': '/guias/monetiza-belleza-con-ia-unas',
  '/guias/presupuestos-claros-pintura-acabados': '/guias/cotizar-pintura-por-metro-cuadrado-estructura',
};
