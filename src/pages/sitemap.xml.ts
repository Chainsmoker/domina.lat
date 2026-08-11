import type { APIRoute } from 'astro';
import { getCategories, getCourses, getPosts } from '../lib/sanity/queries';

interface SitemapItem {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export const GET: APIRoute = async () => {
  const siteUrl = 'https://domina.lat';

  // 1. Páginas estáticas principales
  const staticPages: SitemapItem[] = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/cursos', priority: '0.9', changefreq: 'daily' },
    { url: '/categorias', priority: '0.9', changefreq: 'weekly' },
    { url: '/guias', priority: '0.8', changefreq: 'daily' },
    { url: '/emprender', priority: '0.8', changefreq: 'weekly' },
    { url: '/sobre', priority: '0.5', changefreq: 'monthly' },
    { url: '/contacto', priority: '0.5', changefreq: 'monthly' },
    { url: '/privacidad', priority: '0.3', changefreq: 'monthly' },
    { url: '/terminos', priority: '0.3', changefreq: 'monthly' },
    { url: '/aviso-afiliados', priority: '0.3', changefreq: 'monthly' },
  ];

  // 2. Cargar datos dinámicos desde Sanity
  let categories: any[] = [];
  let courses: any[] = [];
  let posts: any[] = [];

  try {
    const results = await Promise.all([
      getCategories(),
      getCourses(),
      getPosts(),
    ]);
    categories = results[0] || [];
    courses = results[1] || [];
    posts = results[2] || [];
  } catch (error) {
    console.error('Error fetching data for sitemap.xml:', error);
  }

  const categoryUrls = categories.map((cat) => ({
    url: `/categoria/${cat.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: undefined,
  }));

  const courseUrls = courses.map((course) => ({
    url: `/cursos/${course.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: course._updatedAt ? new Date(course._updatedAt).toISOString() : undefined,
  }));

  const postUrls = posts.map((post) => ({
    url: `/guias/${post.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: post.publishedAt 
      ? new Date(post.publishedAt).toISOString() 
      : (post._updatedAt ? new Date(post._updatedAt).toISOString() : undefined),
  }));

  const allUrls = [...staticPages, ...categoryUrls, ...courseUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (item) => `
  <url>
    <loc>${siteUrl}${item.url}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=14400',
    },
  });
};
