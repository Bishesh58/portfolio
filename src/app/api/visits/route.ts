import { redis, redisCreds } from "@/lib/redis";

const KEY = "portfolio:visits";

export async function GET() {
  const c = redisCreds();
  if (!c) return Response.json({ count: null });
  try {
    const raw = await redis(c, "GET", KEY);
    return Response.json({ count: Number(raw ?? 0) });
  } catch {
    return Response.json({ count: null });
  }
}

export async function POST() {
  const c = redisCreds();
  if (!c) return Response.json({ count: null });
  try {
    return Response.json({ count: Number(await redis(c, "INCR", KEY)) });
  } catch {
    return Response.json({ count: null });
  }
}
