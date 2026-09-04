import { Container } from "@/components/ui/Container";
import { TornEdge } from "@/components/ui/TornEdge";
import { workshop } from "@/content/site";

/** The monthly in-person session. Dates are placeholders until a venue lands. */
export function Workshop() {
  return (
    <section id="workshop" className="scroll-mt-20 bg-pink text-navy">
      <TornEdge from="cream" variant="a" />
      <Container className="flex flex-col gap-5.5 pt-6.5 pb-11 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-18 lg:gap-y-8 lg:pt-14 lg:pb-22">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow text-[11px] lg:text-xs lg:tracking-[0.2em]">{workshop.eyebrow}</p>
          <h2 className="headline mt-2.5 mb-3.5 text-[40px] leading-[0.86] [text-shadow:3px_3px_0_var(--color-cream)] lg:mt-3.5 lg:mb-6 lg:text-[clamp(46px,5vw,72px)] lg:leading-[0.84] lg:tracking-[-0.04em] lg:[text-shadow:5px_5px_0_var(--color-cream)]">
            {workshop.title[0]}
            <br />
            {workshop.title[1]}
          </h2>
          <p className="text-base leading-[1.4] font-semibold text-pretty lg:max-w-[480px] lg:text-[19px]">
            {workshop.lead}
          </p>
        </div>

        <div
          className="border-[3px] border-dashed border-navy bg-cream p-4.5 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:p-7"
          style={{ transform: "rotate(0.75deg)" }}
        >
          <p className="eyebrow text-[10px] tracking-[0.16em] text-pink lg:text-[11px]">
            {workshop.kicker}
          </p>
          <p className="headline mt-2.5 text-[26px] leading-[1.05] tracking-[-0.02em] lg:mt-3.5 lg:text-[38px] lg:leading-[1.02]">
            {workshop.date[0]}
            <br />
            {workshop.date[1]}
          </p>
          <p className="mt-3 border-t-2 border-navy pt-3 font-mono text-xs leading-[1.7] lg:mt-4.5 lg:pt-4 lg:text-[13px] lg:leading-[1.8]">
            {workshop.venue[0]}
            <br />
            {workshop.venue[1]}
            <br />
            {workshop.venue[2]}
          </p>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <a
            href={workshop.ctaHref}
            style={{ transform: "rotate(-0.85deg)" }}
            className="headline flex min-h-[62px] items-center justify-center gap-2.5 bg-navy p-4 text-[19px] tracking-[-0.01em] text-cream shadow-[5px_5px_0_var(--color-cream)] lg:inline-flex lg:min-h-16 lg:px-8 lg:py-5 lg:text-[22px] lg:shadow-[6px_6px_0_var(--color-cream)]"
          >
            {workshop.cta}
          </a>
        </div>
      </Container>
    </section>
  );
}
