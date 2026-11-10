"use client";

import { useState } from "react";
import { Stamp } from "@/components/ui/Stamp";
import { siteConfig } from "@/config/site";
import { gate, masthead } from "@/content/site";

type Status = "idle" | "sending" | "done" | "error";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Holding page for the stage before launch. It collects one email address and
 * points anyone who is being stiffed right now at help that already exists.
 */
export function PrelaunchGate() {
  const [email, setEmail] = useState("");
  const [showIntake, setShowIntake] = useState(false);
  const [story, setStory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submittedWithIntake, setSubmittedWithIntake] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;

    if (file && file.size > 4.5 * 1024 * 1024) {
      setError("Please attach a file under 4.5MB.");
      return;
    }

    setStatus("sending");
    setError(null);

    const payload: Record<string, unknown> = { email: address };
    if (showIntake && (story.trim() || file)) {
      payload.hasIntake = true;
      payload.story = story.trim();
      payload.isAnonymous = isAnonymous;
      if (file) {
        try {
          const base64 = await fileToBase64(file);
          payload.fileBase64 = base64;
          payload.fileName = file.name;
          payload.fileSize = file.size;
          payload.fileType = file.type || "application/octet-stream";
        } catch {
          setStatus("error");
          setError("Could not read attached file. Please try another file.");
          return;
        }
      }
    }

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus("error");
        setError(body.error ?? "That didn't go through. Try again in a minute.");
        return;
      }
      if (payload.hasIntake) {
        setSubmittedWithIntake(true);
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

        {siteConfig.showWorkshop && (
          <div
            className="mt-8 border-[3px] border-navy bg-paper p-5.5 shadow-[6px_6px_0_var(--color-pink)]"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            <p className="eyebrow text-[11px] tracking-[0.18em] text-pink">
              {gate.workshop.kicker}
            </p>
            <p className="headline mt-2.5 text-[clamp(22px,4vw,30px)] leading-none tracking-[-0.025em]">
              {gate.workshop.title}
            </p>
            <p className="mt-2.5 font-mono text-[12px] tracking-[0.08em] uppercase">
              {gate.workshop.when}
            </p>
            <p className="mt-3 text-[15px] leading-[1.45] text-pretty">{gate.workshop.body}</p>
            {siteConfig.rsvpUrl ? (
              <a
                href={siteConfig.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transform: "rotate(-0.8deg)" }}
                className="headline mt-4.5 inline-flex min-h-[56px] items-center bg-pink px-6 py-4 text-[18px] tracking-[-0.01em] text-navy shadow-[5px_5px_0_var(--color-navy)]"
              >
                {gate.workshop.cta}
              </a>
            ) : (
              <p className="mt-4 font-mono text-[11.5px] leading-[1.6] text-pink">
                {gate.workshop.pending}
              </p>
            )}
          </div>
        )}

        <div className="mt-8.5 border-t-[3px] border-navy pt-6.5">
          {status === "done" ? (
            <div
              className="border-[3px] border-navy bg-paper p-5.5 shadow-[6px_6px_0_var(--color-pink)]"
              style={{ transform: "rotate(-0.6deg)" }}
              role="status"
            >
              <p className="eyebrow text-[11px] tracking-[0.18em] text-pink">
                {submittedWithIntake ? "On the list & Material Received ✓" : gate.successKicker}
              </p>
              <p className="headline mt-2.5 text-[clamp(22px,4vw,30px)] leading-none tracking-[-0.025em]">
                {gate.successTitle}
              </p>
              <p className="mt-3 text-[15px] leading-[1.45] text-pretty">
                {submittedWithIntake
                  ? "Thanks for signing up and submitting your case! We'll review your material for the Client Email Roast and keep you posted on upcoming dates."
                  : gate.successBody}
              </p>
              <p className="mt-2 font-mono text-[12px] opacity-75">
                Saved: {email} {file ? `· Attached: ${file.name}` : ""}
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
              <form onSubmit={onSubmit} className="mt-3.5 flex flex-col gap-3.5">
                <div className="flex flex-wrap gap-3.5">
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
                    className="headline min-h-[62px] flex-none cursor-pointer border-none bg-pink px-6.5 py-4.5 text-[19px] tracking-[-0.01em] text-navy shadow-[5px_5px_0_var(--color-navy)] transition-transform hover:scale-[1.01] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-70"
                  >
                    {status === "sending" ? "Sending…" : gate.submit}
                  </button>
                </div>

                {/* The Checkbox Trigger to expand intake form */}
                <label className="mt-1.5 flex cursor-pointer items-start gap-3 select-none">
                  <input
                    type="checkbox"
                    checked={showIntake}
                    onChange={(e) => setShowIntake(e.target.checked)}
                    className="mt-0.5 h-5 w-5 cursor-pointer rounded-none border-2 border-navy accent-pink"
                  />
                  <span className="font-mono text-[13px] leading-[1.4] text-navy">
                    <strong className="text-pink">Submit material</strong> you want to review or get help with (shady email, unpaid invoice, or contract)
                  </span>
                </label>

                {/* Expandable Intake Form */}
                {showIntake && (
                  <div
                    className="mt-2 border-[3px] border-navy bg-paper p-5.5 shadow-[6px_6px_0_var(--color-pink)] transition-all"
                    style={{ transform: "rotate(-0.3deg)" }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="eyebrow text-[11px] tracking-[0.18em] text-pink">
                        ROAST & REVIEW INTAKE
                      </p>
                      <span className="bg-navy px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-cream uppercase">
                        Confidential
                      </span>
                    </div>

                    <p className="headline mt-2 text-[20px] leading-tight tracking-[-0.02em]">
                      What happened with this client?
                    </p>
                    <p className="mt-1 text-[13.5px] leading-[1.45] text-navy/80 text-pretty">
                      Paste the email excerpt, client excuse, or confusing clauses. We&apos;ll break down the red flags at the Client Email Roast so you and other freelancers stay protected.
                    </p>

                    {/* Context / Story Textarea */}
                    <div className="mt-4">
                      <label htmlFor="intake-story" className="eyebrow block text-[10.5px] tracking-[0.15em] text-navy mb-1.5">
                        Context or Email Text
                      </label>
                      <textarea
                        id="intake-story"
                        rows={4}
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        placeholder={`"Client approved final delivery on Oct 1st, then went silent. When I followed up, they said: 'Our accounting department only pays net-90 on external contractors'..."`}
                        className="w-full rounded-none border-2 border-navy bg-cream/50 p-3 font-mono text-[13px] text-navy placeholder:text-navy/40 outline-none focus:bg-cream"
                      />
                    </div>

                    {/* File Attachment Drop Area */}
                    <div className="mt-3.5">
                      <label className="eyebrow block text-[10.5px] tracking-[0.15em] text-navy mb-1.5">
                        Attach File (PDF, Screenshot, Contract, or Text)
                      </label>
                      <div className="relative border-2 border-dashed border-navy/60 bg-cream/30 p-4 text-center transition-colors hover:bg-cream/60">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.docx,.txt"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                        {file ? (
                          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[12px] text-navy">
                            <span className="font-bold text-pink">📎 {file.name}</span>
                            <span className="text-navy/60">({(file.size / 1024).toFixed(0)} KB)</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                              }}
                              className="ml-2 cursor-pointer text-xs font-bold text-navy underline hover:text-pink"
                            >
                              [Remove]
                            </button>
                          </div>
                        ) : (
                          <div className="font-mono text-[12px] text-navy/80">
                            <span className="font-bold text-navy">Click to upload file</span> or drag & drop here
                            <p className="mt-0.5 text-[11px] text-navy/55">PDF, PNG, JPG, or DOCX (up to 4.5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Anonymous Redaction Checkbox */}
                    <div className="mt-3.5 flex items-center gap-2.5">
                      <input
                        id="intake-anon"
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded-none border-2 border-navy accent-pink"
                      />
                      <label htmlFor="intake-anon" className="cursor-pointer font-mono text-[11.5px] text-navy/90 select-none">
                        Redact all personal & client names during the public roast
                      </label>
                    </div>
                  </div>
                )}
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
    </div>
  );
}
