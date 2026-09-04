"use client";

import { useState } from "react";
import { footer } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * EN / ES switch. The Spanish translation is not written yet, so the toggle
 * only swaps the note beside it. It stays because the promise is part of the
 * project, and the wiring is ready for real copy.
 */
export function LangToggle({ className }: { className?: string }) {
  const [lang, setLang] = useState<"en" | "es">("en");

  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <div
        className="relative h-[38px] w-[94px] flex-none border-2 border-cream lg:h-10 lg:w-[100px]"
        role="group"
        aria-label="Language"
      >
        <div
          aria-hidden="true"
          className="absolute top-[3px] h-[28px] w-[41px] bg-pink transition-[left] duration-150 ease-out lg:h-[30px] lg:w-11"
          style={{ left: lang === "es" ? "calc(100% - 44px)" : "3px" }}
        />
        {/* The label sitting on the pink knob takes navy, like every other
            pink control on the site. A difference blend would tint it green. */}
        <div className="relative grid h-full grid-cols-2">
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={cn(
              "border-none bg-transparent font-mono text-xs font-bold tracking-[0.1em] lg:text-[13px]",
              lang === "en" ? "text-navy" : "text-cream",
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
            className={cn(
              "border-none bg-transparent font-mono text-xs font-bold tracking-[0.1em] lg:text-[13px]",
              lang === "es" ? "text-navy" : "text-cream",
            )}
          >
            ES
          </button>
        </div>
      </div>
      <p className="font-mono text-[10.5px] leading-[1.5] tracking-[0.04em] lg:text-[11.5px]">
        {lang === "es" ? footer.langNote.es : footer.langNote.en}
      </p>
    </div>
  );
}
