import { redis, redisCreds, type RedisCreds } from "@/lib/redis";

const LB_KEY = "portfolio:arcade:lb";
const TOP_N = 10;
const MAX_SCORE = 500; // sanity ceiling — the game gets unplayable long before this

/** Three-letter arcade initials that shouldn't sit on a portfolio forever. */
const BLOCKED = new Set([
  "ASS", "COC", "COK", "CUM", "DIC", "DIK", "FAG", "FCK", "FUC", "FUK",
  "JIZ", "KKK", "NGR", "NIG", "PIS", "SEX", "TIT", "VAG", "WTF", "XXX",
]);

export type BoardEntry = { name: string; score: number };

async function topTen(c: RedisCreds): Promise<BoardEntry[]> {
  // Flat [member, score, member, score, ...] pairs
  const raw = (await redis(c, "ZRANGE", LB_KEY, 0, TOP_N - 1, "REV", "WITHSCORES")) as string[];
  const board: BoardEntry[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    board.push({ name: raw[i], score: Number(raw[i + 1]) });
  }
  return board;
}

export async function GET() {
  const c = redisCreds();
  if (!c) return Response.json({ board: null });
  try {
    return Response.json({ board: await topTen(c) });
  } catch {
    return Response.json({ board: null });
  }
}

export async function POST(req: Request) {
  const c = redisCreds();
  if (!c) return Response.json({ board: null });

  let body: { name?: unknown; score?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().toUpperCase();
  const score = Number(body.score);
  if (!/^[A-Z]{3}$/.test(name) || BLOCKED.has(name)) {
    return Response.json({ error: "initials" }, { status: 400 });
  }
  if (!Number.isInteger(score) || score < 1 || score > MAX_SCORE) {
    return Response.json({ error: "score" }, { status: 400 });
  }

  try {
    // 5 submissions per IP per minute
    const ip = (req.headers.get("x-forwarded-for") ?? "anon").split(",")[0].trim();
    const rlKey = `portfolio:arcade:rl:${ip}`;
    const hits = Number(await redis(c, "INCR", rlKey));
    if (hits === 1) await redis(c, "EXPIRE", rlKey, 60);
    if (hits > 5) return Response.json({ error: "rate" }, { status: 429 });

    // GT: one slot per initials, only ever upgraded
    await redis(c, "ZADD", LB_KEY, "GT", score, name);
    // keep the set from growing unbounded
    await redis(c, "ZREMRANGEBYRANK", LB_KEY, 0, -51);
    return Response.json({ board: await topTen(c) });
  } catch {
    return Response.json({ board: null });
  }
}
