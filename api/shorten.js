import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });

export default async function handler(req, res) {
  const { url } = req.body;
  const id = Math.random().toString(36).substring(2, 8);
  await redis.set(id, url);
  res.status(200).json({ shortUrl: `${req.headers['x-forwarded-proto']}://${req.headers.host}/${id}` });
}
