import { NextResponse } from "next/server";

/**
 * Mailing-list signup for the pre-launch gate.
 *
 * There is deliberately no database here. Addresses are handed straight to a
 * list provider, configured one of two ways:
 *
 * - NOTIFY_FORM_URL: a provider's public signup-form action (Kit, Brevo,
 *   MailerLite). The address is posted the way the provider's own embed form
 *   posts it, under NOTIFY_FORM_EMAIL_FIELD (default "email_address", Kit's name).
 * - NOTIFY_WEBHOOK_URL: any endpoint that accepts a JSON POST of { email, source }.
 *
 * With neither configured the route refuses the signup rather than showing a
 * confirmation for a list that does not exist.
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

/** Hands the address to the configured provider. null means none is configured. */
async function forward(email: string): Promise<boolean | null> {
  const webhook = process.env.NOTIFY_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, source: "prelaunch-gate" }),
      redirect: "follow",
    });
    if (!response.ok) {
      console.error("[notify] webhook responded", response.status);
      return false;
    }
    return true;
  }

  const formUrl = process.env.NOTIFY_FORM_URL;
  if (formUrl) {
    const field = process.env.NOTIFY_FORM_EMAIL_FIELD || "email_address";
    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({ [field]: email }),
    });
    if (!response.ok) {
      console.error("[notify] signup form responded", response.status);
      return false;
    }
    // Some providers answer 200 and put the failure in the body instead.
    const body: unknown = await response.json().catch(() => null);
    const status = (body as { status?: unknown } | null)?.status;
    if (status === "failed" || status === "error" || status === "quarantined") {
      console.error("[notify] signup form rejected the address:", status);
      return false;
    }
    return true;
  }

  return null;
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

  let delivered: boolean | null;
  try {
    delivered = await forward(email.trim());
  } catch (cause) {
    console.error("[notify] provider unreachable", cause);
    return NextResponse.json(
      { error: "That didn't go through. Try again in a minute." },
      { status: 502 },
    );
  }

  if (delivered === null) {
    // Deliberately does not log the address. Server logs are not a place to
    // keep someone's email.
    console.warn("[notify] no signup destination is set; signup refused");
    return NextResponse.json(
      { error: "Signups are not switched on yet. Try again shortly." },
      { status: 503 },
    );
  }

  if (!delivered) {
    return NextResponse.json(
      { error: "That didn't go through. Try again in a minute." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
