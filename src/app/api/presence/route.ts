import { redis, redisCreds } from "@/lib/redis";

const KEY = "portfolio:presence";
const FRESH_MS = 30_000; // heartbeats arrive every ~10s; anything older is gone
const MAX_PEERS = 12;

/** Anonymous presence: each open tab heartbeats its scroll position into a
 *  Redis hash and gets back where everyone else currently is on the page.
 *  No cookies, no PII — a random per-tab id and a percentage. */
export async function POST(req: Request) {
  const c = redisCreds();
  if (!c) return Response.json({ peers: null });

  let body: { id?: unknown; pos?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const id = String(body.id ?? "");
  if (!/^[a-z0-9-]{8,40}$/i.test(id)) {
    return Response.json({ error: "id" }, { status: 400 });
  }
  const pos = Math.max(0, Math.min(100, Math.round(Number(body.pos) || 0)));

  try {
    const now = Date.now();
    await redis(c, "HSET", KEY, id, `${pos}|${now}`);
    // hash self-destructs if the site goes quiet
    await redis(c, "EXPIRE", KEY, 120);

    const raw = (await redis(c, "HGETALL", KEY)) as string[];
    const peers: number[] = [];
    const stale: string[] = [];
    for (let i = 0; i < raw.length; i += 2) {
      const field = raw[i];
      const [p, ts] = raw[i + 1].split("|");
      if (now - Number(ts) > FRESH_MS) stale.push(field);
      else if (field !== id) peers.push(Number(p));
    }
    if (stale.length > 0) await redis(c, "HDEL", KEY, ...stale);

    return Response.json({ count: peers.length, peers: peers.slice(0, MAX_PEERS) });
  } catch {
    return Response.json({ peers: null });
  }
}
