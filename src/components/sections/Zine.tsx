import { Container } from "@/components/ui/Container";
import { TornEdge } from "@/components/ui/TornEdge";
import { siteConfig } from "@/config/site";
import { zine } from "@/content/site";

/** The paper edition. The cover is a printer's placeholder until art lands. */
export function Zine() {
  return (
    <section id="zine" className="scroll-mt-20 bg-cream">
      <TornEdge from={siteConfig.showWorkshop ? "pink" : "navy"} variant="b" />
      <Container className="pt-6.5 pb-11 lg:pt-14 lg:pb-22">
        <div className="lg:hidden">
          <p className="eyebrow text-[11px] text-pink">{zine.eyebrow}</p>
          <h2 className="headline mt-2.5 mb-5 text-[38px] leading-[0.88]">{zine.titleMobile}</h2>
        </div>

        <div className="flex items-start gap-4.5 lg:grid lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-18">
          <div
            className="flex h-[176px] w-32 flex-none items-center justify-center border-2 border-navy bg-paper p-2 shadow-[5px_5px_0_var(--color-pink)] lg:h-[396px] lg:w-full lg:border-[3px] lg:p-3.5 lg:shadow-[8px_8px_0_var(--color-pink)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(20,26,70,0.10) 0 4px, transparent 4px 10px)",
              transform: "rotate(-1.5deg)",
            }}
          >
            <span className="text-center font-mono text-[9.5px] leading-[1.5] font-bold tracking-[0.08em] uppercase lg:text-xs lg:leading-[1.6] lg:tracking-[0.1em]">
              {zine.coverLabel[0]}
              <br />
              {zine.coverLabel[1]}
            </span>
          </div>

          <div className="flex-1">
            <p className="eyebrow hidden text-xs tracking-[0.2em] text-pink lg:block">
              {zine.eyebrow}
            </p>
            <h2 className="headline text-xl leading-none tracking-[-0.02em] lg:mt-3.5 lg:text-[clamp(40px,4.4vw,60px)] lg:leading-[0.88]">
              {zine.titleDesktop}
            </h2>
            <p className="mt-2.5 text-sm leading-[1.45] text-pretty lg:mt-5.5 lg:max-w-[540px] lg:text-[18px]">
              {zine.blurb} <span className="hidden lg:inline">{zine.reprint}</span>
            </p>
            <p className="mt-2.5 font-mono text-[11px] leading-[1.6] lg:hidden">{zine.reprint}</p>

            <div className="mt-8 hidden flex-wrap items-center gap-5.5 lg:flex">
              <a
                href={zine.ctaHref}
                style={{ transform: "rotate(0.6deg)" }}
                className="headline inline-flex min-h-16 items-center gap-3 bg-pink px-7.5 py-[19px] text-[21px] tracking-[-0.01em] text-navy shadow-[6px_6px_0_var(--color-navy)]"
              >
                {zine.cta}
              </a>
              <span className="font-mono text-[11.5px] tracking-[0.1em] uppercase">{zine.meta}</span>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <a
            href={zine.ctaHref}
            style={{ transform: "rotate(0.5deg)" }}
            className="headline mt-6 flex min-h-[60px] items-center justify-center gap-2.5 bg-pink p-4 text-[18px] tracking-[-0.01em] text-navy shadow-[5px_5px_0_var(--color-navy)]"
          >
            {zine.cta}
          </a>
          <p className="mt-3 text-center font-mono text-[10.5px] tracking-[0.1em] uppercase">
            {zine.meta}
          </p>
        </div>
      </Container>
    </section>
  );
}
