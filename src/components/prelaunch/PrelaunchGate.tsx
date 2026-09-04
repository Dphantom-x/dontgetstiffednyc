"use client";

import { useState } from "react";
import { Stamp } from "@/components/ui/Stamp";
import { siteConfig } from "@/config/site";
import { gate, masthead } from "@/content/site";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Holding page for the stage before launch. It collects one email address and
 * points anyone who is being stiffed right now at help that already exists.
 */
export function PrelaunchGate() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address }),
      });
      const body: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus("error");
        setError(body.error ?? "That didn't go through. Try again in a minute.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("That didn't go through. Try again in a minute.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy">
      <div className="mx-auto flex w-full max-w-[620px] items-center justify-between gap-3 px-6 pt-6.5 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span>{masthead.domain}</span>
        <span className="text-pink">{masthead.est}</span>
      </div>

      <div className="mx-auto flex w-full max-w-[620px] flex-1 flex-col justify-center px-6 pb-10">
        <div className="relative pt-14">
          <Stamp
            className="absolute top-0 left-0 z-[2] block border-[3px] bg-cream p-[5px]"
            innerClassName="border-[1.5px] px-3 py-2 text-[11px] tracking-[0.18em]"
            style={{ transform: "rotate(-4deg)" }}
          >
            {gate.stamp}
          </Stamp>

          <h1 className="headline text-[clamp(56px,13vw,104px)] leading-[0.82] tracking-[-0.04em] [text-shadow:5px_5px_0_var(--color-pink)]">
            {gate.title[0]}
            <br />
            {gate.title[1]}
            <br />
            {gate.title[2]}
          </h1>
        </div>

        <p className="mt-6.5 max-w-[460px] text-[clamp(17px,2.4vw,21px)] leading-[1.35] font-semibold text-pretty">
          {gate.lead}
        </p>

        <div className="mt-8.5 border-t-[3px] border-navy pt-6.5">
          {status === "done" ? (
            <div
              className="border-[3px] border-navy bg-paper p-5.5 shadow-[6px_6px_0_var(--color-pink)]"
              style={{ transform: "rotate(-0.6deg)" }}
              role="status"
            >
              <p className="eyebrow text-[11px] tracking-[0.18em] text-pink">
                {gate.successKicker}
              </p>
              <p className="headline mt-2.5 text-[clamp(22px,4vw,30px)] leading-none tracking-[-0.025em]">
                {gate.successTitle}
              </p>
              <p className="mt-3 text-[15px] leading-[1.45] text-pretty">
                {email}
                {gate.successBody}
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="gate-email"
                className="eyebrow block text-[11px] tracking-[0.16em] text-pink"
              >
                {gate.label}
              </label>
              <form onSubmit={onSubmit} className="mt-3.5 flex flex-wrap gap-3.5">
                <input
                  id="gate-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={gate.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-[62px] min-w-0 flex-[1_1_240px] rounded-none border-[3px] border-navy bg-paper px-4.5 py-4 font-mono text-[15px] text-navy outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{ transform: "rotate(-0.8deg)" }}
                  className="headline min-h-[62px] flex-none border-none bg-pink px-6.5 py-4.5 text-[19px] tracking-[-0.01em] text-navy shadow-[5px_5px_0_var(--color-navy)] disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : gate.submit}
                </button>
              </form>
              {error && (
                <p role="alert" className="mt-3 font-mono text-[11.5px] leading-[1.6] text-pink">
                  {error}
                </p>
              )}
              <p className="mt-4 font-mono text-[11px] leading-[1.7] text-pretty opacity-75">
                {gate.privacy}
              </p>
            </div>
          )}
        </div>

        <div className="mt-9.5 bg-navy p-5.5 text-cream">
          <p className="eyebrow text-[11px] tracking-[0.16em] text-pink">{gate.urgentKicker}</p>
          <p className="mt-2 text-[15px] leading-[1.45] text-pretty">{gate.urgentLead}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {gate.urgentLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center gap-2 border-2 border-cream px-4.5 py-4 font-mono text-xs font-bold tracking-[0.1em] text-cream uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 font-mono text-[11.5px] leading-[1.7] text-pretty">
          {gate.zineNote.before}
          <strong className="text-pink">{gate.zineNote.strong}</strong>
        </p>
      </div>

      <div className="border-t-2 border-navy">
        <div className="mx-auto flex w-full max-w-[620px] flex-wrap justify-between gap-x-5.5 gap-y-2.5 px-6 pt-4.5 pb-6.5 font-mono text-[10.5px] tracking-[0.08em] uppercase">
          <span>CC BY-SA 4.0 · launching {siteConfig.launchWindow}</span>
          <span className="opacity-60">no ads · no signups · no tracking</span>
        </div>
      </div>
    </div>
  );
}
