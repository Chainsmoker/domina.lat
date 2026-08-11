import { defineField, defineType } from 'sanity';

export const courseType = defineType({
  name: 'course',
  title: 'Curso',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del curso',
      type: 'string',
      description: 'Ej: Uñas profesionales desde cero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Badge / Etiqueta destacada',
      type: 'string',
      description: 'Ej: Ruta recomendada, Servicio práctico, Nivel inicial',
    }),
    defineField({
      name: 'resourceType',
      title: 'Tipo de recurso / Formato del contenido',
      type: 'string',
      description: 'Define la etiqueta verde del curso (ej: Video curso, Ebook / PDF, Masterclass, Curso en vivo, Plantillas)',
      options: {
        list: [
          { title: 'Video curso', value: 'Video curso' },
          { title: 'Ebook / PDF', value: 'Ebook / PDF' },
          { title: 'Masterclass', value: 'Masterclass' },
          { title: 'Curso en vivo', value: 'Curso en vivo' },
          { title: 'Plantillas / Recursos', value: 'Plantillas / Recursos' },
        ],
      },
      initialValue: 'Video curso',
    }),
    defineField({
      name: 'dek',
      title: 'Descripción corta / Resumen',
      type: 'text',
      rows: 3,
      description: 'Resumen claro de lo que enseña la formación.',
      validation: (Rule) => Rule.required().error('La descripción corta es obligatoria.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría del curso',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required().error('La categoría es obligatoria.'),
      description: 'Vinculada a las categorías unificadas de Domina (Belleza y uñas, Cocina, Digital, etc.)',
    }),
    defineField({
      name: 'price',
      title: 'Precio aproximado (USD)',
      type: 'number',
      description: 'Valor numérico en dólares sin símbolos ni letras (ej: 39 o 39.99)',
      validation: (Rule) => Rule.required().positive().error('El precio aproximado es obligatorio.'),
    }),
    defineField({
      name: 'level',
      title: 'Nivel recomendado',
      type: 'string',
      description: 'Ej: Nivel inicial, Intermedio, Todos los niveles',
      validation: (Rule) => Rule.required().error('El nivel recomendado es obligatorio.'),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen del curso',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('La imagen del curso es obligatoria.'),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (Alt text)',
          type: 'string',
          validation: (Rule) => Rule.required().error('El texto alternativo (Alt text) es obligatorio para SEO.'),
        }),
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: '¿Destacar en la página principal y categoría?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isMenuRecommended',
      title: '¿Mostrar como "Curso recomendado" en el menú desplegable superior?',
      type: 'boolean',
      description: 'Si se activa, este curso aparecerá destacado en el panel desplegable del menú de navegación.',
      initialValue: false,
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'Enlace del creador / Compra (Afiliado)',
      type: 'url',
      description: 'Enlace directo a la página de ventas del creador.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }).error('El enlace de compra es obligatorio.'),
    }),

    // RATING / VALORACIÓN
    defineField({
      name: 'ratingScore',
      title: 'Valoración numérica (ej: 4.8)',
      type: 'number',
      description: 'Nota de 1 a 5 (ej: 4.8 o 4.9). Si está vacío no se muestra.',
    }),
    defineField({
      name: 'ratingText',
      title: 'Texto de la valoración',
      type: 'string',
      description: 'Ej: valoración mostrada por la plataforma del curso',
    }),

    // PUNTOS CLAVE / FACTS
    defineField({
      name: 'facts',
      title: 'Puntos clave (Etiquetas rápidas)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: ["18 módulos", "Acceso online", "Para emprender", "Certificado"]',
    }),

    // --- QUÉ APRENDERÁS (LEARN CARDS) ---
    defineField({
      name: 'learnItems',
      title: 'Qué aprenderás (Tarjetas de resultados)',
      type: 'array',
      description: 'Lista de 3 a 4 logros o módulos prácticos que aprenderá el estudiante.',
      of: [
        {
          type: 'object',
          title: 'Resultado',
          fields: [
            defineField({ name: 'title', title: 'Título corto', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Descripción breve', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),

    // --- AUDIENCIA (PARA QUIÉN SÍ / NO) ---
    defineField({
      name: 'forYouIf',
      title: 'Este curso puede ser para ti si... (Lista)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notForYouIf',
      title: 'No es la mejor opción si... (Lista)',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // --- INFORMACIÓN DEL AUTOR / CREADOR ---
    defineField({
      name: 'authorName',
      title: 'Nombre del autor / creador (OPCIONAL)',
      type: 'string',
      description: 'Nombre del instructor o academia. Si se deja en blanco no se muestra la sección del autor.',
    }),
    defineField({
      name: 'authorRole',
      title: 'Rol / Especialidad del autor (OPCIONAL)',
      type: 'string',
      description: 'Ej: Especialista en Nail Art & Master Instructor',
    }),
    defineField({
      name: 'authorBio',
      title: 'Biografía breve del autor (OPCIONAL)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'authorAvatar',
      title: 'Foto / Avatar del autor (OPCIONAL)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo del autor',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'authorBgColor',
      title: 'Color de fondo de la sección del autor',
      type: 'string',
      options: {
        list: [
          { title: 'Violeta (#8D7CFF)', value: '#8D7CFF' },
          { title: 'Rosa (#F6BBD0)', value: '#F6BBD0' },
          { title: 'Menta (#BDE8DB)', value: '#BDE8DB' },
          { title: 'Lima (#D7FF5F)', value: '#D7FF5F' },
          { title: 'Crema (#F5F1E8)', value: '#F5F1E8' },
          { title: 'Oscuro (#0B1020)', value: '#0B1020' },
        ],
        layout: 'radio',
      },
      initialValue: '#8D7CFF',
    }),
    defineField({
      name: 'authorTextColor',
      title: 'Color de texto de la sección del autor',
      type: 'string',
      options: {
        list: [
          { title: 'Oscuro (#0B1020)', value: '#0B1020' },
          { title: 'Blanco (#FFFFFF)', value: '#FFFFFF' },
        ],
        layout: 'radio',
      },
      initialValue: '#0B1020',
    }),

    // --- RUTA MÓDULO POR MÓDULO (SYLLABUS) ---
    defineField({
      name: 'modules',
      title: 'La ruta, módulo por módulo (OPCIONAL)',
      type: 'array',
      description: 'Estructura detallada del temario o módulos del curso.',
      of: [
        {
          type: 'object',
          name: 'moduleItem',
          title: 'Módulo del temario',
          fields: [
            defineField({
              name: 'moduleTitle',
              title: 'Título del módulo',
              type: 'string',
              description: 'Ej: Módulo 1: Preparación de la uña y bioseguridad',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'moduleDesc',
              title: 'Descripción del módulo',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'lessons',
              title: 'Lista de lecciones / temas (opcional)',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Ej: ["Técnica de retirado", "Preparación de la cutícula", "Esmaltado perfecto"]',
            }),
          ],
        },
      ],
    }),

    // --- PREGUNTAS FRECUENTES (FAQS) ---
    defineField({
      name: 'faqs',
      title: 'Preguntas Frecuentes (FAQ)',
      type: 'array',
      description: 'Lista de preguntas y respuestas frecuentes sobre el curso (acceso, certificado, garantía, etc.)',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Pregunta Frecuente',
          fields: [
            defineField({
              name: 'question',
              title: 'Pregunta',
              type: 'string',
              validation: (Rule) => Rule.required().error('La pregunta es obligatoria.'),
            }),
            defineField({
              name: 'answer',
              title: 'Respuesta',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().error('La respuesta es obligatoria.'),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),

    // --- VEREDICTO Y EVALUACIÓN EDITORIAL ---
    defineField({
      name: 'editorialScore',
      title: 'Puntuación editorial (ej: 8.7)',
      type: 'number',
      description: 'Puntuación dada por Domina (1 a 10). Dejar en blanco si no se evaluó.',
    }),
    defineField({
      name: 'editorialTitle',
      title: 'Título del veredicto editorial',
      type: 'string',
      description: 'Ej: Buena ruta para principiantes.',
    }),
    defineField({
      name: 'editorialPros',
      title: 'Lo mejor (Puntos positivos)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'editorialCons',
      title: 'A considerar (Puntos a tener en cuenta)',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // EVALUACIÓN EDITORIAL DE DOMINA
    defineField({
      name: 'editorialReview',
      title: 'Evaluación Editorial de Domina (Análisis del curso)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Destacado', value: 'blockquote' },
          ],
          lists: [{ title: 'Viñetas', value: 'bullet' }],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo (Alt text)',
              type: 'string',
              description: 'Descripción accesible de la imagen.',
              validation: (Rule) => Rule.required().error('El texto alternativo de la imagen es obligatorio.'),
            }),
            defineField({
              name: 'caption',
              title: 'Leyenda de la imagen (Opcional)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'reviewSections',
      title: 'Evaluación editorial modular',
      description: 'Bloques visuales reordenables. Usa esta sección para construir una evaluación editorial con diseño propio.',
      type: 'array',
      of: [
        { type: 'reviewFeature' },
        { type: 'reviewMetrics' },
        { type: 'reviewChecklist' },
        { type: 'reviewQuote' },
        { type: 'reviewGallery' },
        { type: 'reviewCallout' },
      ],
      options: {
        insertMenu: {
          groups: [
            { name: 'narrative', title: 'Historia', of: ['reviewFeature', 'reviewQuote'] },
            { name: 'analysis', title: 'Análisis', of: ['reviewMetrics', 'reviewChecklist', 'reviewCallout'] },
            { name: 'media', title: 'Media', of: ['reviewGallery'] },
          ],
          views: [{ name: 'list' }],
        },
      },
    }),

    // --- METADATOS Y SEO ---
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (Meta Title)',
      type: 'string',
      description: 'Título personalizado para motores de búsqueda (máx 60 caracteres). Si está vacío se usará el título del curso.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO (Meta Description)',
      type: 'text',
      rows: 3,
      description: 'Resumen descriptivo para buscadores (máx 160 caracteres). Si está vacío se usará la descripción corta.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para redes sociales (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen optimizada para compartir en redes. Si está vacía se usará la imagen del curso.',
    }),
  ],
});
