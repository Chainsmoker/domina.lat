import type { APIRoute } from 'astro';
import { getCourseBySlug } from '../../lib/sanity/queries';

export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
  const { slug } = params;

  if (!slug) {
    return redirect('/cursos', 302);
  }

  try {
    const course = await getCourseBySlug(slug);

    if (course?.affiliateUrl) {
      return new Response(null, {
        status: 307,
        headers: {
          'Location': course.affiliateUrl,
          'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        },
      });
    }
  } catch (error) {
    console.error(`Error in /go/${slug} redirect:`, error);
  }

  return redirect('/cursos', 302);
};
