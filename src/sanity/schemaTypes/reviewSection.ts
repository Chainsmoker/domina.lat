import { defineField, defineType } from 'sanity';

const themeOptions = [
  { title: 'Navy editorial', value: 'ink' },
  { title: 'Violeta', value: 'violet' },
  { title: 'Naranja', value: 'orange' },
  { title: 'Lima', value: 'lime' },
  { title: 'Crema', value: 'cream' },
];

const imageFields = [
  defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
  defineField({ name: 'caption', title: 'Leyenda', type: 'string' }),
];

export const reviewFeatureType = defineType({
  name: 'reviewFeature',
  title: 'Historia con imagen',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Texto', type: 'text', rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: imageFields }),
    defineField({ name: 'theme', title: 'Tema', type: 'string', options: { list: themeOptions }, initialValue: 'ink' }),
    defineField({ name: 'imageSide', title: 'Posición de imagen', type: 'string', options: { list: [{ title: 'Derecha', value: 'right' }, { title: 'Izquierda', value: 'left' }], layout: 'radio' }, initialValue: 'right' }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow', media: 'image' } },
});

export const reviewMetricsType = defineType({
  name: 'reviewMetrics',
  title: 'Métricas con anillos',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Introducción', type: 'text', rows: 3 }),
    defineField({
      name: 'items', title: 'Métricas', type: 'array', validation: (Rule) => Rule.min(2).max(4),
      of: [{ type: 'object', name: 'reviewMetric', title: 'Métrica', fields: [
        defineField({ name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'value', title: 'Valor (0–10)', type: 'number', validation: (Rule) => Rule.required().min(0).max(10) }),
        defineField({ name: 'note', title: 'Nota corta', type: 'string' }),
      ] }],
    }),
    defineField({ name: 'theme', title: 'Tema', type: 'string', options: { list: themeOptions }, initialValue: 'violet' }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
});

export const reviewChecklistType = defineType({
  name: 'reviewChecklist',
  title: 'Lista editorial',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Introducción', type: 'text', rows: 3 }),
    defineField({ name: 'items', title: 'Puntos', type: 'array', of: [{ type: 'string' }], validation: (Rule) => Rule.min(2) }),
    defineField({ name: 'tone', title: 'Tono', type: 'string', options: { list: [{ title: 'Lo que incluye / positivo', value: 'positive' }, { title: 'Antes de comprar / alerta', value: 'caution' }] }, initialValue: 'positive' }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
});

export const reviewQuoteType = defineType({
  name: 'reviewQuote',
  title: 'Conclusión destacada',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Conclusión', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'attribution', title: 'Firma', type: 'string', initialValue: 'Equipo editorial Domina' }),
    defineField({ name: 'theme', title: 'Tema', type: 'string', options: { list: themeOptions }, initialValue: 'orange' }),
  ],
  preview: { select: { title: 'quote', subtitle: 'attribution' } },
});

export const reviewGalleryType = defineType({
  name: 'reviewGallery',
  title: 'Galería editorial',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'images', title: 'Imágenes', type: 'array', validation: (Rule) => Rule.min(1).max(4),
      of: [{ type: 'image', options: { hotspot: true }, fields: imageFields }],
    }),
  ],
  preview: { select: { title: 'title', media: 'images.0' } },
});

export const reviewCalloutType = defineType({
  name: 'reviewCallout',
  title: 'Dato o advertencia',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Texto', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'theme', title: 'Tema', type: 'string', options: { list: themeOptions }, initialValue: 'lime' }),
  ],
  preview: { select: { title: 'title', subtitle: 'label' } },
});

export const reviewSectionTypes = [
  reviewFeatureType,
  reviewMetricsType,
  reviewChecklistType,
  reviewQuoteType,
  reviewGalleryType,
  reviewCalloutType,
];
