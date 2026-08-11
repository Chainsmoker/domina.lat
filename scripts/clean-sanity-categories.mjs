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

async function removeDuplicateCategories() {
  console.log('Removing category-* duplicates from Sanity...');
  
  const categories = await client.fetch(`*[_type == "category"]`);
  for (const cat of categories) {
    if (cat._id.startsWith('category-')) {
      try {
        await client.delete(cat._id);
        console.log(`✓ Deleted duplicate: ${cat._id}`);
      } catch (err) {
        console.warn(`Could not delete ${cat._id}: ${err.message}`);
      }
    }
  }

  const remaining = await client.fetch(`*[_type == "category"] | order(order asc) { _id, title, "slug": slug.current, eyebrow, cardTitle, cardStyle }`);
  console.log('\n--- Final Clean 5 Unified Categories in Sanity ---');
  console.table(remaining);
}

removeDuplicateCategories().catch(console.error);
