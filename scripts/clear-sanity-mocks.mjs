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

async function clearMocks() {
  console.log('Clearing courses and posts from Sanity...');
  try {
    const courses = await client.fetch(`*[_type == "course"]{_id}`);
    console.log(`Found ${courses.length} courses.`);
    for (const c of courses) {
      await client.delete(c._id);
      console.log(`Deleted course: ${c._id}`);
    }

    const posts = await client.fetch(`*[_type == "post"]{_id}`);
    console.log(`Found ${posts.length} posts.`);
    for (const p of posts) {
      await client.delete(p._id);
      console.log(`Deleted post: ${p._id}`);
    }

    console.log('Successfully cleared all mock data.');
  } catch (err) {
    console.error('Error clearing mock data:', err.message);
  }
}

clearMocks();
