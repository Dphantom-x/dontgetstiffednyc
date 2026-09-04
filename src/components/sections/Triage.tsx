"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Stamp } from "@/components/ui/Stamp";
import { TornEdge } from "@/components/ui/TornEdge";
import { siteConfig, type DoorId } from "@/config/site";
import {
  chaseEmail,
  contractDoor,
  doors,
  humanDoor,
  quietDoor,
  triage,
  type Step,
} from "@/content/site";
import { cn } from "@/lib/cn";

/** Numbered pink chips beside each instruction. */
function Steps({ steps, children }: { steps: Step[]; children?: React.ReactNode }) {
  return (
    <div className="mt-3.5 grid grid-cols-[26px_1fr] gap-x-3 gap-y-3 text-[14.5px] leading-[1.45] lg:mt-4 lg:grid-cols-[28px_1fr] lg:gap-3.5 lg:text-[15.5px]">
      {steps.map((step, i) => (
        <Fragmentish key={step.lead} index={i + 1}>
          <strong>{step.lead}</strong> {step.body}
          {i === steps.length - 1 ? children : null}
        </Fragmentish>
      ))}
    </div>
  );
}

function Fragmentish({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="headline h-6 bg-pink py-1 text-center text-[13px] leading-none text-navy lg:h-[26px] lg:text-sm"
      >
        {index}
      </div>
      <div>{children}</div>
    </>
  );
}

function CopyChaseEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(() => {
    void navigator.clipboard?.writeText(chaseEmail).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }, []);

  return (
    <>
      <pre className="mt-4.5 overflow-x-auto border-2 border-navy bg-paper p-3.5 font-mono text-[11.5px] leading-[1.65] whitespace-pre-wrap lg:mt-5 lg:p-4.5 lg:text-[12.5px] lg:leading-[1.7]">
        {chaseEmail}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-3.5 min-h-[52px] w-full border-none bg-navy p-3.5 font-mono text-xs font-bold tracking-[0.16em] text-cream uppercase shadow-[4px_4px_0_var(--color-pink)] lg:mt-4 lg:min-h-[54px] lg:w-auto lg:px-6 lg:py-[15px]"
      >
        {copied ? quietDoor.copyDone : quietDoor.copyIdle}
      </button>
    </>
  );
}

function Panel({ id, open, children }: { id: string; open: boolean; children: React.ReactNode }) {
  return (
    <div
      id={id}
      hidden={!open}
      className="mt-3.5 bg-cream px-[18px] py-5 text-navy shadow-[5px_5px_0_var(--color-pink)] lg:mt-4 lg:p-[26px] lg:shadow-[6px_6px_0_var(--color-pink)]"
    >
      {children}
    </div>
  );
}

export function Triage() {
  const [open, setOpen] = useState<DoorId | null>(siteConfig.defaultDoor);
  const toggle = (id: DoorId) => setOpen((prev) => (prev === id ? null : id));

  return (
    <section id="triage" className="bg-navy text-cream">
      <TornEdge from="cream" variant="a" className="lg:hidden" />
      <Container className="pt-[22px] pb-11 lg:pt-16 lg:pb-21">
        <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-18">
          <div>
            <p className="eyebrow text-[11px] text-pink lg:text-[13px] lg:tracking-[0.2em]">
              {triage.eyebrow}
            </p>

            {/* Scales with the viewport so "get paid?" always holds one line. */}
            <h1 className="headline mt-3 text-[52px] leading-[0.86] lg:mt-5 lg:text-[clamp(56px,6.4vw,104px)] lg:leading-[0.82] lg:tracking-[-0.04em] lg:[text-shadow:6px_6px_0_var(--color-pink)]">
              {triage.title[0]}
              <br />
              {triage.title[1]}
            </h1>

            <p className="mt-1.5 text-[15px] leading-[1.45] font-medium opacity-85 lg:hidden">
              {triage.leadMobile}
            </p>
            <p className="hidden max-w-[440px] text-pretty lg:mt-8 lg:block lg:text-[21px] lg:leading-[1.35] lg:font-semibold">
              {triage.leadDesktop}
            </p>

            <Stamp
              className="mt-9 hidden lg:inline-block"
              innerClassName="px-3.5 py-2.5 text-[11px] tracking-[0.16em]"
              style={{ transform: "rotate(-2deg)" }}
            >
              {triage.stamp}
            </Stamp>
          </div>

          <div className="mt-6.5 flex flex-col gap-5 lg:mt-0 lg:pt-3.5">
            {doors.map((door) => {
              const isOpen = open === door.id;
              const panelId = `door-panel-${door.id}`;
              return (
                <div key={door.id}>
                  <button
                    type="button"
                    onClick={() => toggle(door.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    style={{ transform: `rotate(${door.tilt})` }}
                    className={cn(
                      "flex min-h-[76px] w-full items-center justify-between gap-3.5 rounded-[2px] border-none px-[18px] py-4 text-left text-navy lg:min-h-[84px] lg:px-6 lg:py-5",
                      door.tone === "pink"
                        ? "bg-pink shadow-[5px_5px_0_var(--color-cream)] lg:shadow-[6px_6px_0_var(--color-cream)]"
                        : "bg-cream shadow-[5px_5px_0_var(--color-pink)] lg:shadow-[6px_6px_0_var(--color-pink)]",
                    )}
                  >
                    <span className="headline text-[21px] leading-[1.02] tracking-[-0.02em]">
                      {door.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="headline flex h-[34px] flex-none items-center justify-center border-2 border-navy text-xl leading-none lg:h-[38px] lg:w-[38px] lg:text-[22px]"
                      style={{ width: 34 }}
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>

                  {door.id === "quiet" && (
                    <Panel id={panelId} open={isOpen}>
                      <p className="eyebrow text-[10px] tracking-[0.16em] text-pink lg:text-[11px]">
                        {quietDoor.kicker}
                      </p>
                      <Steps steps={quietDoor.steps} />
                      <CopyChaseEmail />
                    </Panel>
                  )}

                  {door.id === "contract" && (
                    <Panel id={panelId} open={isOpen}>
                      <p className="text-base leading-[1.4] font-semibold text-pretty lg:text-[18px]">
                        {contractDoor.lead}
                      </p>
                      <Steps steps={contractDoor.steps}>
                        {" "}
                        <a
                          href="#templates"
                          className="font-bold text-pink underline decoration-pink decoration-2 underline-offset-4"
                        >
                          Jump down ↓
                        </a>
                      </Steps>
                      <p className="mt-4 border-t-2 border-navy pt-3 font-mono text-[11.5px] leading-[1.6] text-pretty lg:mt-4.5 lg:pt-3.5 lg:text-xs">
                        {contractDoor.note}
                      </p>
                    </Panel>
                  )}

                  {door.id === "human" && (
                    <Panel id={panelId} open={isOpen}>
                      {humanDoor.map((link, i) => (
                        <a
                          key={link.href}
                          href={link.href}
                          {...(link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={cn(
                            "flex min-h-[58px] items-center justify-between gap-3.5 py-3.5 text-navy lg:min-h-16 lg:py-4",
                            i < humanDoor.length - 1 && "border-b-2 border-navy",
                          )}
                        >
                          <span>
                            <span className="headline block text-base tracking-[-0.01em] lg:text-[18px]">
                              {link.title}
                            </span>
                            <span className="mt-[3px] block font-mono text-[11px] lg:text-xs">
                              {link.blurb}
                            </span>
                          </span>
                          <span aria-hidden="true" className="headline text-xl text-pink lg:text-[22px]">
                            {link.external ? "↗" : "↓"}
                          </span>
                        </a>
                      ))}
                    </Panel>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
