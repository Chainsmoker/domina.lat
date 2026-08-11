import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la categoría',
      type: 'string',
      description: 'Ej: Belleza y uñas, Cocina y pastelería, Digital e IA',
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
      title: 'Badge / Antetítulo',
      type: 'string',
      description: 'Ej: Categoría destacada, Ruta de aprendizaje',
    }),
    defineField({
      name: 'cardTitle',
      title: 'Título para tarjetas del Home',
      type: 'string',
      description: 'Ej: Aprender manicure y belleza',
    }),
    defineField({
      name: 'description',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      description: 'Resumen claro de lo que abarca esta categoría para SEO y cabeceras.',
      validation: (Rule) => Rule.required().error('La descripción de la categoría es obligatoria.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagen destacada de la categoría',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (Alt text)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cardStyle',
      title: 'Estilo visual en Home (Color)',
      type: 'string',
      options: {
        list: [
          { title: 'Naranja / Crema', value: 'card-orange' },
          { title: 'Lima / Ácido', value: 'card-lime' },
          { title: 'Violeta / Noche', value: 'card-violet' },
          { title: 'Menta / Claro', value: 'card-mint' },
          { title: 'Rosa / Pastel', value: 'card-pink' },
        ],
      },
      initialValue: 'card-pink',
    }),
    defineField({
      name: 'color',
      title: 'Color de acento de la categoría',
      type: 'string',
      description: 'Color hex o CSS para el hero y detalles (ej: #F6BBD0, #D7FF5F, #8D7CFF, #FF8A65). Si se deja en blanco, usa cardStyle.',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featuredCourse',
      title: 'Curso recomendado (Tarjeta del menú desplegable)',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Selecciona el curso que se destacará en el menú de navegación superior para esta categoría.',
    }),
  ],
});
