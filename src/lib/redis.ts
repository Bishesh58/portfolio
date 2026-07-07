/** Upstash Redis over REST. Reads the Vercel marketplace integration's env
 *  vars (either naming scheme); callers treat a null return as "no store
 *  configured" and degrade gracefully. */

export type RedisCreds = { url: string; token: string };

export function redisCreds(): RedisCreds | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export async function redis(c: RedisCreds, ...cmd: (string | number)[]): Promise<unknown> {
  const res = await fetch(`${c.url}/${cmd.map((p) => encodeURIComponent(String(p))).join("/")}`, {
    headers: { Authorization: `Bearer ${c.token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis responded ${res.status}`);
  const body = (await res.json()) as { result?: unknown };
  return body.result;
}
