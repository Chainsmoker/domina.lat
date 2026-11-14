# Clasificación de las guías (fase 3, punto #2 de la auditoría)

> Datos tomados de Sanity (dataset `production`) el 2026-11-14. Hay 149 guías.
> Este documento sirve para **decidir**. No se ha borrado, fusionado ni redirigido nada todavía.

## Diagnóstico en números

| Señal | Valor | Lectura |
|---|---|---|
| Ritmo de publicación | 64 días con publicaciones entre 2026-08-12 y 2026-11-09. 34 días con 2 guías, 20 con 3, 2 con 4 y 1 con 6 | Es el patrón de calendario fijo que señala la auditoría |
| Firma | 149 de 149 firmadas "Equipo Domina.lat" | Ninguna lleva autor con nombre |
| Fuentes citadas | 126 de 149 sin bloque `sourcesBlock` | Les falta evidencia verificable |
| Frase repetida "Guarda esta checklist" | 34 guías | Plantilla visible |
| `dateModified` = `datePublished` | 141 de 149 | Nunca se actualizaron después de publicarse |
| Extensión | mínimo 404, mediana 784, máximo 1,529 palabras | 19 guías con menos de 600 |
| Títulos SEO de más de 60 caracteres | 148 de 149 (máximo 114), sin contar el sufijo de marca | Google los corta. Hay que reescribirlos en Sanity |

## Paso 0: detener el calendario automático

No hay ningún programador de publicaciones en este repositorio. Si las guías se publican con n8n, Make, un cron externo o un agente, hay que pausarlo antes de seguir.

## Paso 1: fusionar los duplicados claros (301)

| Conservar | Fusionar en ella y redirigir |
|---|---|
| `calcular-punto-de-equilibrio-maquillaje-a-domicilio` | `calcular-punto-equilibrio-maquillaje-domicilio` (es la misma guía) |
| `fotografia-productos-artesanales-luz-natural-ventana-casa` | `fotos-productos-artesanales-celular` |
| `organizar-taller-costura-casa` | `taller-costura-ergonomico-casa`, `organizar-pedidos-fecha-entrega-taller-costura` (revisar) |
| `crear-curso-online-desde-cero` | `crear-curso-online-de-manualidades-desde-cero` |
| `monetiza-belleza-con-ia-unas` | `monetizar-decoracion-unas-acrilicas-con-ia` |
| `presupuestos-claros-pintura-acabados` | `cotizar-pintura-por-metro-cuadrado-estructura` |
| `maquina-coser-mecanica-vs-electronica` | `elegir-maquina-coser-para-arreglos` (revisar) |
| (decidir) | `aerografo-vs-pinceles-decoracion-unas-reposteria`: mezcla uñas y repostería. Dividirla en dos o eliminarla |

Cómo hacerlo:
1. Pasar a la guía que se conserva lo que la otra tenga de valor.
2. Borrar o despublicar la guía fusionada en Sanity.
3. Añadir la línea correspondiente en `src/lib/redirects.ts`. El middleware responde con un 301.
4. Ejecutar `pnpm indexnow /guias/<conservada>` después del deploy.

## Paso 2: familias que se convierten en pilares

Estas guías no son duplicadas, pero se pisan entre sí. El cluster plan (`docs/seo/cluster-plan.json`) propone pilares. Los pilares se construyen con estas guías, sin escribir otras nuevas.

- **Precios y cotizaciones (18):** `calcular-*`, `cotizar-*`, `cobrar-*`, `fijar-precios-*`, `presupuestos-*`. Un pilar del tipo "Cómo calcular el precio de tu servicio o producto", con las variantes por oficio como secciones o guías hijas que enlacen al pilar.
- **Repostería (18):** pilar en `negocio-de-reposteria-desde-casa`. Fusionar `costos-negocio-reposteria-inversion-inicial` (565 palabras) y `cursos-de-reposteria-para-emprender` (483 palabras) dentro del pilar.
- **Uñas y manicura (14):** pilar en `cursos-unas-manicura-como-elegir` más `fijar-precios-retiro-esmaltado-manicura`.
- **WhatsApp para vender (7):** todas enlazan al curso `whatsapp-letal-ventas-whatsapp-business` (ya automático) y entre sí.
- **IA aplicada (16):** dispersas por categorías. Revisar cuáles aportan un caso práctico real y cuáles son relleno "con IA".
- **Costura y crochet (12):** dos pilares, uno de costura y arreglos y otro de crochet.

## Paso 3: guías delgadas (menos de 600 palabras)

Cada una se mejora, se fusiona o se marca `noindex`.

| Guía | Palabras | Categoría |
|---|---|---|
| `kit-emergencia-herramientas-visitas-tecnicas` | 404 | oficios-y-reparacion |
| `checklist-auditar-presencia-digital-tecnico-reparaciones` | 425 | oficios-y-reparacion |
| `cursos-de-reposteria-para-emprender` | 483 | cocina-y-pasteleria |
| `costura-mano-arreglos-ropa` | 507 | creatividad-y-manualidades |
| `preparacion-madera-lijado-para-pintar` | 510 | emprendimiento |
| `como-elegir-curso-de-ia` | 525 | digital-e-ia |
| `plantilla-comparar-proveedores-insumos-belleza` | 535 | comparativas |
| `ficha-pedido-postres-personalizados` | 537 | cocina-y-pasteleria |
| `chatgpt-descripciones-productos-venta-online` | 539 | emprendimiento |
| `kit-portatil-maquillaje-domicilio` | 542 | belleza-y-unas |
| `costos-negocio-reposteria-inversion-inicial` | 565 | cocina-y-pasteleria |
| `esterilizacion-herramientas-manicura-guia-basica` | 570 | emprendimiento |
| `mantenimiento-herramientas-mano-corte-guia` | 570 | oficios-y-reparacion |
| `emprendimiento-para-mujeres` | 577 | emprendimiento |
| `mensaje-confirmacion-cita-salon-belleza` | 578 | belleza-y-unas |
| `control-citas-cobros-manicura-independiente` | 583 | belleza-y-unas |
| `fotos-productos-artesanales-celular` | 585 | emprendimiento |
| `fotografiar-unas-luz-natural-acabados-detalles` | 587 | belleza-y-unas |
| `capacidad-semanal-postres-caseros` | 598 | cocina-y-pasteleria |

Hay guías en una categoría que no les corresponde. `esterilizacion-herramientas-manicura-guia-basica` y `preparacion-madera-lijado-para-pintar` están en `emprendimiento`. Esa categoría tiene 54 de las 149 guías.

## Paso 4: mejorar las 20 a 30 mejores

Criterios para elegirlas: tema con demanda en LatAm, más de 900 palabras, y que se pueda añadir un ejemplo numérico real.

A cada una se le añade:
- autor con nombre (requiere el punto #5)
- ejemplo con cifras reales en moneda local
- `sourcesBlock` con 2 a 4 fuentes
- título SEO de 60 caracteres o menos y descripción de 155 o menos
- revisar la frase "Guarda esta checklist"

Al editarlas cambia el `_updatedAt` en Sanity. El sitemap ya usa esa fecha como `lastmod`.

## Lo que ya resolvió el código

- Las guías relacionadas se eligen por tema. Antes eran las 3 más recientes. La lógica está en `src/lib/utils/related.ts`.
- Cada guía enlaza al curso más afín si comparte tema con él. Hoy son 13 guías, revisadas una por una, y todas son pertinentes. Las demás no muestran curso: es preferible a recomendar uno ajeno. Hay 10 guías sin ninguna relacionada, y en ellas la sección se oculta. Si se rellena `relatedCourse` a mano en Sanity, esa elección tiene prioridad.
- Los títulos de más de 60 caracteres pierden el sufijo de marca. Las descripciones de más de 155 se cortan en un límite de palabra. Los títulos que siguen largos tras quitar el sufijo hay que reescribirlos en Sanity.
