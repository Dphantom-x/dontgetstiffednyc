"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { TornEdge } from "@/components/ui/TornEdge";
import { rights } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The law, stated once in plain English. On phones the detail sits behind a
 * disclosure so the headline claim lands first; on desktop there is room to
 * show all four points at once.
 */
export function Rights() {
  const [open, setOpen] = useState(false);

  return (
    <section id="rights" className="scroll-mt-20 bg-cream">
      <TornEdge from="navy" variant="b" />
      <Container className="flex flex-col gap-5 pt-6.5 pb-11 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-x-18 lg:gap-y-7 lg:pt-14 lg:pb-22">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow text-[11px] text-pink lg:text-xs lg:tracking-[0.2em]">
            {rights.eyebrow}
          </p>
          <h2 className="headline mt-2.5 text-[38px] leading-[0.88] lg:mt-3.5 lg:text-[clamp(44px,4.6vw,64px)]">
            {rights.title[0]}
            <br className="lg:hidden" />
            <span className="lg:hidden">{rights.title[1]}</span>
            <span className="hidden lg:inline"> {rights.title[1]}</span>
          </h2>
        </div>

        <div className="lg:col-start-2 lg:row-start-1">
          <p className="text-[19px] leading-[1.35] font-semibold text-pretty lg:text-[30px] lg:leading-[1.22]">
            {rights.statement.before}
            <strong className="bg-pink px-1 lg:px-1.5">{rights.statement.highlight}</strong>
            {rights.statement.after}
          </p>
          <p className="mt-2.5 font-mono text-xs tracking-[0.05em] lg:mt-3.5 lg:text-[13px]">
            {rights.attribution}
          </p>
        </div>

        <div
          className="border-[3px] border-navy bg-paper p-4 shadow-[5px_5px_0_var(--color-pink)] lg:col-start-1 lg:row-start-2 lg:p-[22px] lg:shadow-[6px_6px_0_var(--color-pink)]"
          style={{ transform: "rotate(-0.75deg)" }}
        >
          <p className="eyebrow text-[10px] tracking-[0.16em] text-pink lg:text-[11px]">
            {rights.catch.kicker}
          </p>
          <p className="mt-2 text-[14.5px] leading-[1.45] text-pretty lg:mt-2.5 lg:text-[15.5px]">
            {rights.catch.before}
            <strong>{rights.catch.strong}</strong>
            {rights.catch.after}
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="rights-detail"
            className="inline-flex min-h-12 items-center gap-2.5 border-2 border-navy bg-transparent px-4 py-3 font-mono text-xs font-bold tracking-[0.14em] text-navy uppercase lg:hidden"
          >
            {open ? rights.closeLabel : rights.openLabel}
          </button>

          <div
            id="rights-detail"
            className={cn(
              "border-t-[3px] border-navy pt-4 lg:mt-0 lg:block lg:border-t-[3px] lg:pt-6.5",
              open ? "mt-4.5 block" : "mt-4.5 hidden",
            )}
          >
            <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
              {rights.points.map((point) => (
                <div key={point.short} className="grid grid-cols-[14px_1fr] gap-x-3 lg:block">
                  <div aria-hidden="true" className="mt-[5px] h-3.5 w-3.5 bg-pink lg:hidden" />
                  <p className="text-[14.5px] leading-[1.45] lg:text-[15.5px]">
                    <strong className="lg:headline lg:block lg:text-[15px] lg:leading-tight lg:text-pink">
                      {point.lead}
                    </strong>
                    <span className="lg:hidden"> — {point.body}</span>
                    <span className="hidden lg:inline">{point.shortBody}</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3.5 font-mono text-[11.5px] leading-[1.6] text-pretty lg:mt-6 lg:text-xs">
              {rights.deadlines}{" "}
              <a
                href={rights.deadlinesLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-navy underline decoration-pink decoration-2 underline-offset-4"
              >
                {rights.deadlinesLink.label}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
