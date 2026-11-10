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
async function forwardToKit(email: string): Promise<boolean> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID || "10170656";
  if (!apiKey) return false;

  try {
    const res = await fetch(`https://api.kit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
    });
    if (!res.ok) {
      console.error("[notify] Kit API responded", res.status);
      return false;
    }
    const data = await res.json().catch(() => null);
    if (data?.error) {
      console.error("[notify] Kit API error:", data.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify] Kit API unreachable", err);
    return false;
  }
}

async function forwardToWebhook(email: string): Promise<boolean> {
  const webhook = process.env.NOTIFY_WEBHOOK_URL;
  if (!webhook) return false;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, source: "prelaunch-gate" }),
      redirect: "follow",
    });
    if (!res.ok) {
      console.error("[notify] Webhook responded", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify] Webhook unreachable", err);
    return false;
  }
}

async function forwardToLegacyForm(email: string): Promise<boolean> {
  const formUrl = process.env.NOTIFY_FORM_URL;
  if (!formUrl) return false;

  try {
    const field = process.env.NOTIFY_FORM_EMAIL_FIELD || "email_address";
    const res = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({ [field]: email }),
    });
    if (!res.ok) {
      console.error("[notify] signup form responded", res.status);
      return false;
    }
    const body: unknown = await res.json().catch(() => null);
    const status = (body as { status?: unknown } | null)?.status;
    if (status === "failed" || status === "error" || status === "quarantined") {
      console.error("[notify] signup form rejected the address:", status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify] signup form unreachable", err);
    return false;
  }
}

/** Hands the address to all configured providers (Kit, Webhook/Sheets). null means none is configured. */
async function forward(email: string): Promise<boolean | null> {
  const hasKit = Boolean(process.env.KIT_API_KEY);
  const hasWebhook = Boolean(process.env.NOTIFY_WEBHOOK_URL);
  const hasLegacyForm = Boolean(process.env.NOTIFY_FORM_URL) && !hasKit;

  if (!hasKit && !hasWebhook && !hasLegacyForm) {
    return null;
  }

  const results = await Promise.allSettled([
    hasKit ? forwardToKit(email) : Promise.resolve(false),
    hasWebhook ? forwardToWebhook(email) : Promise.resolve(false),
    hasLegacyForm ? forwardToLegacyForm(email) : Promise.resolve(false),
  ]);

  const kitSuccess = results[0].status === "fulfilled" && results[0].value;
  const webhookSuccess = results[1].status === "fulfilled" && results[1].value;
  const legacySuccess = results[2].status === "fulfilled" && results[2].value;

  // Succeeded if at least one destination processed the submission
  if (kitSuccess || webhookSuccess || legacySuccess) {
    return true;
  }

  return false;
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
