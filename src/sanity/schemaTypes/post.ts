import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post / Guía',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título principal',
      type: 'string',
      description: 'Puedes encerrar una palabra en <span>palabra</span> para destacarla en naranja.',
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
      title: 'Eyebrow / Etiqueta superior',
      type: 'string',
      description: 'Ej: Guía práctica · Belleza, Estrategia · Emprendimiento',
    }),
    defineField({
      name: 'dek',
      title: 'Resumen corto / Subtítulo',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().error('El resumen corto es obligatorio.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría principal',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required().error('La categoría es obligatoria.'),
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de lectura',
      type: 'string',
      description: 'Ej: 10 min de lectura',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('La fecha de publicación es obligatoria.'),
    }),
    defineField({
      name: 'editorialStatus',
      title: 'Estado Editorial',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente de Revisión', value: 'pending_review' },
          { title: 'Recomendado', value: 'recommended' },
          { title: 'Experimento', value: 'experiment' },
          { title: 'Bloqueado', value: 'blocked' },
        ],
      },
    }),
    defineField({
      name: 'trendStatus',
      title: 'Estado de Tendencia',
      type: 'string',
      options: {
        list: [
          { title: 'Tendencia Verificada', value: 'verified_trend' },
          { title: 'Oportunidad de Mercado', value: 'market_opportunity' },
          { title: 'Experimento', value: 'experiment' },
          { title: 'Sin Verificar', value: 'unverified' },
        ],
      },
    }),
    defineField({
      name: 'priorityScore',
      title: 'Puntaje de Prioridad',
      type: 'number',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen destacada (Hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('La imagen destacada es obligatoria.'),
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
      name: 'heroBadge',
      title: 'Badge del Hero',
      type: 'string',
      description: 'Ej: Guía destacada, Guía práctica, Comparativa',
    }),
    defineField({
      name: 'authorName',
      title: 'Nombre del autor',
      type: 'string',
    }),
    defineField({
      name: 'authorRole',
      title: 'Rol del autor',
      type: 'string',
    }),
    defineField({
      name: 'authorAvatar',
      title: 'Avatar del autor',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo del avatar',
          type: 'string',
        }),
      ],
    }),

    // CUSTOM BODY WITH PORTABLE TEXT AND CUSTOM BLOCKS
    defineField({
      name: 'body',
      title: 'Cuerpo del post (Custom Body)',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).error('El cuerpo del post no puede estar vacío.'),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Cita / Lead', value: 'blockquote' },
          ],
          lists: [{ title: 'Viñetas', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo (Alt text)',
              type: 'string',
              description: 'Obligatorio para accesibilidad y SEO.',
              validation: (Rule) => Rule.required().error('El texto alternativo es obligatorio.'),
            }),
            defineField({
              name: 'caption',
              title: 'Leyenda de la imagen',
              type: 'string',
            }),
          ],
        },

        // CUSTOM BLOCK: CALLOUT BOX
        {
          name: 'callout',
          title: 'Caja destacada (Callout)',
          type: 'object',
          fields: [
            defineField({
              name: 'variant',
              title: 'Estilo visual',
              type: 'string',
              options: {
                list: [
                  { title: 'Naranja / Ácido', value: 'orange' },
                  { title: 'Crema / Claro', value: 'cream' },
                  { title: 'Oscuro / Nocturno', value: 'dark' },
                ],
              },
              initialValue: 'cream',
            }),
            defineField({
              name: 'title',
              title: 'Título del callout',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Contenido del callout',
              type: 'text',
              rows: 3,
            }),
          ],
        },

        // CUSTOM BLOCK: CHECKLIST
        {
          name: 'checklist',
          title: 'Lista de verificación (Checklist)',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título de la checklist (opcional)',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Elementos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'bold', title: 'Texto resaltado (negrita)', type: 'string' }),
                    defineField({ name: 'text', title: 'Descripción', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        },

        // CUSTOM BLOCK: TABLE
        {
          name: 'tableBlock',
          title: 'Tabla Informativa (Table)',
          type: 'object',
          fields: [
            defineField({
              name: 'headers',
              title: 'Cabeceras de la tabla',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'rows',
              title: 'Filas de la tabla',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'cells',
                      title: 'Celdas (en orden de cabecera)',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                  ],
                },
              ],
            }),
          ],
        },

        // CUSTOM BLOCK: AFFILIATE NOTICE
        {
          name: 'affiliateNotice',
          title: 'Aviso de Afiliados',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Mensaje de transparencia',
              type: 'text',
              rows: 2,
              initialValue: 'Algunos cursos recomendados por Domina pueden utilizar enlaces de afiliado. Si compras mediante uno de ellos, podríamos recibir una comisión sin costo adicional para ti.',
            }),
          ],
        },
      ],
    }),

    // RELATIVE COURSE CTA
    defineField({
      name: 'relatedCourse',
      title: 'Curso relacionado recomendado (Full Width CTA)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título del curso', type: 'string' }),
        defineField({ name: 'desc', title: 'Descripción corta del curso', type: 'text', rows: 2 }),
        defineField({
          name: 'image',
          title: 'Imagen del curso',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo de la imagen',
              type: 'string',
            }),
          ],
        }),
        defineField({ name: 'link', title: 'Enlace al curso (/cursos/...)', type: 'string' }),
      ],
    }),

    // TABLE OF CONTENTS
    defineField({
      name: 'toc',
      title: 'Tabla de Contenidos (TOC)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'ID de ancla (#id)', type: 'string' }),
            defineField({ name: 'text', title: 'Texto del enlace', type: 'string' }),
          ],
        },
      ],
    }),

    // --- METADATOS Y SEO ---
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (Meta Title)',
      type: 'string',
      description: 'Título personalizado para motores de búsqueda (máx 60 caracteres). Si está vacío se usará el título principal.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO (Meta Description)',
      type: 'text',
      rows: 3,
      description: 'Resumen descriptivo para buscadores (máx 160 caracteres). Si está vacío se usará el subtítulo/resumen.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para redes sociales (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen optimizada para compartir en redes. Si está vacía se usará la imagen del hero.',
    }),
  ],
});
