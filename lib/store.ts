import "server-only";
import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

export type ContentSection = "projects" | "motionItems" | "shortsItems";

const KEYS: Record<ContentSection, string> = {
  projects: "admin:projects",
  motionItems: "admin:motionItems",
  shortsItems: "admin:shortsItems",
};

interface WithId {
  id: number;
}

export async function getExtra<T extends WithId>(section: ContentSection): Promise<T[]> {
  if (!redis) return [];
  const items = await redis.get<T[]>(KEYS[section]);
  return items ?? [];
}

export async function addExtra<T extends WithId>(
  section: ContentSection,
  entry: Omit<T, "id">
): Promise<T> {
  if (!redis) throw new Error("No storage configured — set KV_REST_API_URL and KV_REST_API_TOKEN");
  const items = await getExtra<T>(section);
  const newEntry = { ...entry, id: Date.now() } as T;
  await redis.set(KEYS[section], [...items, newEntry]);
  return newEntry;
}

export async function deleteExtra(section: ContentSection, id: number): Promise<void> {
  if (!redis) return;
  const items = await getExtra<WithId>(section);
  await redis.set(KEYS[section], items.filter((item) => item.id !== id));
}
