const KEY = "portfolio:visits";

/** Upstash Redis over REST. Reads the Vercel marketplace integration's env
 *  vars (either naming scheme); when neither is configured the endpoint
 *  reports null and the footer counter simply doesn't render. */
function creds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(c: { url: string; token: string }, ...cmd: string[]): Promise<unknown> {
  const res = await fetch(`${c.url}/${cmd.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${c.token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis responded ${res.status}`);
  const body = (await res.json()) as { result?: unknown };
  return body.result;
}

export async function GET() {
  const c = creds();
  if (!c) return Response.json({ count: null });
  try {
    const raw = await redis(c, "GET", KEY);
    return Response.json({ count: Number(raw ?? 0) });
  } catch {
    return Response.json({ count: null });
  }
}

export async function POST() {
  const c = creds();
  if (!c) return Response.json({ count: null });
  try {
    return Response.json({ count: Number(await redis(c, "INCR", KEY)) });
  } catch {
    return Response.json({ count: null });
  }
}
