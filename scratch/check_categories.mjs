import { getCategories } from '../src/lib/sanity/queries.ts';

const cats = await getCategories();
console.log('Sanity Categories:', cats.map(c => ({ title: c.title, slug: c.slug })));
