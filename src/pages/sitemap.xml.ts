import type { APIRoute } from 'astro';
import { getCategories, getCourses, getPosts } from '../lib/sanity/queries';

// Sin changefreq ni priority: Google los ignora. lastmod solo cuando hay una fecha real.
interface SitemapItem {
  url: string;
  lastmod?: string;
}

const toIso = (d?: string) => (d ? new Date(d).toISOString() : undefined);
const newest = (...dates: (string | undefined)[]) =>
  dates.filter(Boolean).sort().at(-1);

export const GET: APIRoute = async () => {
  const siteUrl = 'https://domina.lat';

  let categories: any[] = [];
  let courses: any[] = [];
  let posts: any[] = [];

  try {
    const results = await Promise.all([getCategories(), getCourses(), getPosts()]);
    categories = results[0] || [];
    courses = results[1] || [];
    posts = results[2] || [];
  } catch (error) {
    console.error('Error fetching data for sitemap.xml:', error);
  }

  const courseUrls: SitemapItem[] = courses.map((course) => ({
    url: `/cursos/${course.slug}`,
    lastmod: toIso(newest(course._updatedAt, course.publishedAt, course._createdAt)),
  }));

  // Fecha de modificación real del documento (no la de publicación).
  const postUrls: SitemapItem[] = posts.map((post) => ({
    url: `/guias/${post.slug}`,
    lastmod: toIso(newest(post._updatedAt, post.publishedAt, post._createdAt)),
  }));

  // Una categoría cambia cuando cambia ella o alguno de sus cursos/guías.
  const categoryUrls: SitemapItem[] = categories.map((cat) => {
    const related = [...courses, ...posts]
      .filter((doc) => doc.category?.slug === cat.slug)
      .map((doc) => doc._updatedAt);
    return {
      url: `/categoria/${cat.slug}`,
      lastmod: toIso(newest(cat._updatedAt, ...related)),
    };
  });

  const latestCourse = newest(...courseUrls.map((u) => u.lastmod));
  const latestPost = newest(...postUrls.map((u) => u.lastmod));

  // Listados SSR: cambian con su contenido. Las páginas prerenderizadas (/, /categorias,
  // /emprender, legales) solo cambian al hacer build, así que no llevan lastmod.
  const staticPages: SitemapItem[] = [
    { url: '/' },
    { url: '/cursos', lastmod: latestCourse },
    { url: '/categorias' },
    { url: '/guias', lastmod: latestPost },
    { url: '/emprender' },
    { url: '/sobre' },
    { url: '/contacto' },
    { url: '/privacidad' },
    { url: '/terminos' },
    { url: '/aviso-afiliados' },
  ];

  const allUrls = [...staticPages, ...categoryUrls, ...courseUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) =>
      `  <url>\n    <loc>${siteUrl}${item.url}</loc>${item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : ''}\n  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=14400',
    },
  });
};
