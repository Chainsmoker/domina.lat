import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error('No Upstash Redis URL or token found in .env');
  process.exit(1);
}

const redis = new Redis({ url, token });

async function clearCache() {
  console.log('Clearing Upstash Redis cache...');
  await redis.flushdb();
  console.log('✓ Upstash Redis cache cleared successfully!');
}

clearCache().catch(console.error);
