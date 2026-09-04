import { NextResponse } from "next/server";

/**
 * Launch-notification signup for the pre-launch gate.
 *
 * There is deliberately no database here. Set NOTIFY_WEBHOOK_URL to any list
 * provider or form endpoint that accepts a JSON POST, and addresses are handed
 * straight to it. With no endpoint configured the route refuses the signup
 * rather than showing a confirmation for a list that does not exist.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Small in-memory throttle. Per instance, best-effort, not a security control. */
const seen = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function throttled(key: string): boolean {
  const now = Date.now();
  const hits = (seen.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seen.set(key, hits);
  if (seen.size > 5_000) seen.clear();
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ error: "Too many tries. Give it a minute." }, { status: 429 });
  }

  let email: unknown;
  try {
    ({ email } = (await request.json()) as { email?: unknown });
  } catch {
    return NextResponse.json({ error: "Send JSON." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 254) {
    return NextResponse.json({ error: "That doesn't look like an email address." }, { status: 400 });
  }

  const endpoint = process.env.NOTIFY_WEBHOOK_URL;
  if (!endpoint) {
    console.warn("[notify] NOTIFY_WEBHOOK_URL is not set; refusing signup for", email.trim());
    return NextResponse.json(
      { error: "Signups are not switched on yet. Try again shortly." },
      { status: 503 },
    );
  }

  try {
    const forwarded = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: email.trim(), source: "prelaunch-gate" }),
    });
    if (!forwarded.ok) {
      console.error("[notify] provider responded", forwarded.status);
      return NextResponse.json(
        { error: "That didn't go through. Try again in a minute." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[notify] provider unreachable", cause);
    return NextResponse.json(
      { error: "That didn't go through. Try again in a minute." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
