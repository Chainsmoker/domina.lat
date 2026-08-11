import { Redis } from '@upstash/redis';

let redisInstance: Redis | null = null;

export function getRedisClient(): Redis | null {
  // Desactivar caché automáticamente en entorno de desarrollo (astro dev)
  if (import.meta.env.DEV) {
    return null;
  }

  if (redisInstance) return redisInstance;

  const url = import.meta.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || url.includes('your-upstash-redis-url') || token.includes('your-upstash-redis-token')) {
    return null;
  }

  try {
    redisInstance = new Redis({
      url,
      token,
    });
    return redisInstance;
  } catch (error) {
    console.warn('[Upstash Redis] Error al inicializar cliente:', error);
    return null;
  }
}

/**
 * Función wrapper genérica para cachear consultas en Upstash Redis
 * 
 * - En Desarrollo (`import.meta.env.DEV`): Bypass automático del caché para desarrollo ágil.
 * - En Producción (`PROD`): Guarda la data sin TTL (almacenamiento persistente e indefinido hasta invalidación manual).
 * 
 * @param key Clave única de caché (ej: "sanity:posts:all")
 * @param fetcher Función asíncrona que obtiene la data si no está en caché
 * @param ttlSeconds (Opcional) Tiempo de expiración si se requiere TTL específico
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const cached = await redis.get<T>(key);
      if (cached !== null && cached !== undefined) {
        return cached;
      }
    } catch (err) {
      console.warn(`[Upstash Redis] Error leyendo clave "${key}":`, err);
    }
  }

  const freshData = await fetcher();

  if (redis && freshData !== undefined && freshData !== null) {
    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await redis.set(key, freshData, { ex: ttlSeconds });
      } else {
        // Sin TTL: persistente e indefinido en Upstash Redis
        await redis.set(key, freshData);
      }
    } catch (err) {
      console.warn(`[Upstash Redis] Error guardando clave "${key}":`, err);
    }
  }

  return freshData;
}

/**
 * Invalida/Elimina una clave de caché en Redis
 */
export async function invalidateCache(key: string): Promise<boolean> {
  const redis = getRedisClient();
  if (!redis) return false;

  try {
    await redis.del(key);
    return true;
  } catch (err) {
    console.warn(`[Upstash Redis] Error borrando clave "${key}":`, err);
    return false;
  }
}
