import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });

export default async function handler(req, res) {
  const { id } = req.query;
  const longUrl = await redis.get(id);
  longUrl ? res.redirect(longUrl) : res.status(404).send('Not found');
}
