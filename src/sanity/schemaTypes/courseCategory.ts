import { defineField, defineType } from 'sanity';

export const courseCategoryType = defineType({
  name: 'courseCategory',
  title: 'Categoría de Curso',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la categoría',
      type: 'string',
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
      description: 'Ej: Belleza, Cocina, Digital, Oficios, Creatividad',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardTitle',
      title: 'Título en tarjeta (Home)',
      type: 'string',
      description: 'Ej: Uñas, maquillaje y servicios que puedes ofrecer.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción corta',
      type: 'text',
      rows: 2,
      description: 'Ej: Empieza desde cero o perfecciona una técnica.',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Estilo visual de tarjeta (Home Grid)',
      type: 'string',
      options: {
        list: [
          { title: 'Estilo 1 (Destacado Grande)', value: 'cat-1' },
          { title: 'Estilo 2 (Verde Ácido)', value: 'cat-2' },
          { title: 'Estilo 3 (Naranja Ácido)', value: 'cat-3' },
          { title: 'Estilo 4 (Oscuro Nocturno)', value: 'cat-4' },
          { title: 'Estilo 5 (Crema Elegante)', value: 'cat-5' },
        ],
      },
      initialValue: 'cat-1',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'image',
      title: 'Imagen destacada de categoría',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuredCourse',
      title: 'Curso recomendado en el menú',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Selecciona el curso a destacar en el menú de navegación.',
    }),
  ],
});
