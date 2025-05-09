import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// key-value store
await redis.set("foo", "bar");
