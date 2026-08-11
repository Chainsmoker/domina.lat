import { defineField, defineType } from 'sanity';

export const guideCategoryType = defineType({
  name: 'guideCategory',
  title: 'Categoría de Guía',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Categoría',
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
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
      rows: 3,
    }),
  ],
});
