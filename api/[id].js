// api/[id].js
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).send("ID required");

  try {
    const longUrl = await redis.get(id);
    if (longUrl) {
      // 302 is a standard temporary redirect
      return res.redirect(longUrl); 
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
}
