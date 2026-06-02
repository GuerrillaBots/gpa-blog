import { Redis } from "@upstash/redis";

// Lazy-initialised so build doesn't fail without env vars
let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) _redis = Redis.fromEnv();
  return _redis;
}

export async function getPostStats(slug: string) {
  const redis = getRedis();
  const [views, up, down] = await Promise.all([
    redis.get<number>(`views:${slug}`),
    redis.get<number>(`react:${slug}:up`),
    redis.get<number>(`react:${slug}:down`),
  ]);
  return { views: views ?? 0, up: up ?? 0, down: down ?? 0 };
}

export async function incrementViews(slug: string) {
  return getRedis().incr(`views:${slug}`);
}

export async function addReaction(slug: string, type: "up" | "down") {
  return getRedis().incr(`react:${slug}:${type}`);
}
