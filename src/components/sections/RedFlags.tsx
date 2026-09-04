import { Container } from "@/components/ui/Container";
import { TornEdge } from "@/components/ui/TornEdge";
import { redFlags } from "@/content/site";

/** Three things clients say, and the sentence to say back. */
export function RedFlags() {
  return (
    <section id="red-flags" className="scroll-mt-20 bg-cream">
      <TornEdge from="navy" variant="b" />
      <Container className="pt-6.5 pb-11 lg:pt-14 lg:pb-22">
        <p className="eyebrow text-[11px] text-pink lg:text-xs lg:tracking-[0.2em]">
          {redFlags.eyebrow}
        </p>
        <h2 className="headline mt-2.5 mb-5.5 text-[38px] leading-[0.88] lg:mt-3.5 lg:mb-11 lg:text-[64px]">
          {redFlags.title[0]}
          <br className="lg:hidden" />
          <span className="lg:hidden">{redFlags.title[1]}</span>
          <span className="hidden lg:inline"> {redFlags.title[1]}</span>
        </h2>

        <div className="flex flex-col gap-6.5 lg:grid lg:grid-cols-3 lg:gap-9">
          {redFlags.items.map((item) => (
            <div key={item.line} className="flex flex-col gap-2.5 lg:gap-3.5">
              <p className="max-w-[88%] self-start rounded-[18px_18px_18px_4px] border-2 border-navy bg-paper px-4 py-3.5 text-base leading-[1.35] lg:max-w-[94%] lg:rounded-[20px_20px_20px_4px] lg:px-5 lg:py-4 lg:text-[19px] lg:leading-[1.32]">
                {item.line}
              </p>
              <div className="max-w-[90%] self-end rounded-[18px_18px_4px_18px] bg-pink px-4 py-3.5 text-navy shadow-[3px_3px_0_var(--color-navy)] lg:max-w-[96%] lg:rounded-[20px_20px_4px_20px] lg:px-5 lg:py-4 lg:shadow-[4px_4px_0_var(--color-navy)]">
                <p className="font-mono text-[9.5px] font-bold tracking-[0.16em] uppercase lg:text-[10px]">
                  Roast
                </p>
                <p className="mt-[5px] text-[15px] leading-[1.4] font-semibold text-pretty lg:mt-1.5 lg:text-base">
                  {item.roast}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
