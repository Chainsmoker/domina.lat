import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'ilb98xsw',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const categories = [
  {
    _id: 'cat-belleza-y-unas',
    _type: 'category',
    title: 'Belleza & uñas',
    slug: { _type: 'slug', current: 'belleza-y-unas' },
    eyebrow: 'Belleza',
    cardTitle: 'Uñas, maquillaje y servicios que puedes ofrecer.',
    description: 'Empieza desde cero o perfecciona una técnica.',
    cardStyle: 'cat-1',
    order: 1,
  },
  {
    _id: 'cat-cocina-y-pasteleria',
    _type: 'category',
    title: 'Cocina & pastelería',
    slug: { _type: 'slug', current: 'cocina-y-pasteleria' },
    eyebrow: 'Cocina',
    cardTitle: 'Pastelería y repostería para vender.',
    description: 'Técnicas esenciales, recetas con costo calculado, insumos requeridos y consejos clave para vender productos de repostería desde casa.',
    cardStyle: 'cat-2',
    order: 2,
  },
  {
    _id: 'cat-digital-e-ia',
    _type: 'category',
    title: 'Digital & IA',
    slug: { _type: 'slug', current: 'digital-e-ia' },
    eyebrow: 'Digital',
    cardTitle: 'IA, diseño y marketing.',
    description: 'Formaciones sobre IA para optimizar tu trabajo, creación de contenido, marketing digital y habilidades digitales con alta demanda laboral.',
    cardStyle: 'cat-3',
    order: 3,
  },
  {
    _id: 'cat-oficios-y-reparacion',
    _type: 'category',
    title: 'Oficios & reparación',
    slug: { _type: 'slug', current: 'oficios-y-reparacion' },
    eyebrow: 'Oficios',
    cardTitle: 'Reparación, electricidad y más.',
    description: 'Cursos prácticos para aprender diagnósticos, arreglos de dispositivos, herramientas indispensables y cómo estructurar un servicio técnico confiable.',
    cardStyle: 'cat-4',
    order: 4,
  },
  {
    _id: 'cat-creatividad-y-manualidades',
    _type: 'category',
    title: 'Creatividad & manualidades',
    slug: { _type: 'slug', current: 'creatividad-y-manualidades' },
    eyebrow: 'Creatividad',
    cardTitle: 'Costura, decoración y manualidades.',
    description: 'Paso a paso para dominar proyectos creativos, transformar pasatiempos en productos vendibles y estructurar la venta de artesanías.',
    cardStyle: 'cat-5',
    order: 5,
  },
];

async function seedExactCategories() {
  console.log('Replacing categories in Sanity with exact templates/index.html texts...');
  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log(`✓ Category updated: ${cat.eyebrow} -> ${cat.cardTitle}`);
  }
  console.log('Sanity categories updated successfully!');
}

seedExactCategories().catch(console.error);
