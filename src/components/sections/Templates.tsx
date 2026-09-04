import { Container } from "@/components/ui/Container";
import { Stamp } from "@/components/ui/Stamp";
import { TornEdge } from "@/components/ui/TornEdge";
import { siteConfig } from "@/config/site";
import { templates } from "@/content/site";

export function Templates() {
  return (
    <section id="templates" className="scroll-mt-20 bg-navy text-cream">
      <TornEdge from="cream" variant="a" />
      <Container className="pt-6.5 pb-11 lg:pt-14 lg:pb-22">
        <div className="lg:flex lg:flex-wrap lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="eyebrow text-[11px] text-pink lg:text-xs lg:tracking-[0.2em]">
              {templates.eyebrow}
            </p>
            <h2 className="headline mt-2.5 mb-3 text-[38px] leading-[0.88] lg:mt-3.5 lg:mb-0 lg:text-[64px]">
              {templates.title[0]}
              <br className="lg:hidden" />
              <span className="lg:hidden">{templates.title[1]}</span>
              <span className="hidden lg:inline"> {templates.title[1]}</span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.45] font-medium text-pretty opacity-85 lg:max-w-[360px] lg:text-[17px]">
            {templates.lead}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3.5 lg:mt-11 lg:grid-cols-4 lg:gap-[22px]">
          {templates.items.map((item) => (
            <a
              key={item.number}
              href={item.href}
              className="flex min-h-[172px] flex-col justify-between bg-cream p-3.5 text-navy shadow-[4px_4px_0_var(--color-pink)] lg:min-h-[246px] lg:p-5 lg:shadow-[6px_6px_0_var(--color-pink)]"
            >
              <div>
                <div className="font-mono text-[10px] font-bold tracking-[0.14em] text-pink lg:text-[11px]">
                  {item.number}
                </div>
                <div className="headline mt-2 text-[19px] leading-[0.98] tracking-[-0.02em] lg:mt-3 lg:text-[26px] lg:leading-[0.96]">
                  {item.name}
                </div>
                <div className="mt-[7px] text-[12.5px] leading-[1.35] lg:mt-3 lg:text-sm lg:leading-[1.4]">
                  {item.blurb}
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2 border-t-2 border-navy pt-2 lg:mt-5 lg:pt-2.5">
                <span className="font-mono text-[9.5px] tracking-[0.06em] lg:text-[10.5px]">
                  {siteConfig.templateFormat}
                </span>
                <span aria-hidden="true" className="headline text-[18px] text-pink lg:text-[22px]">
                  ↓
                </span>
              </div>
            </a>
          ))}
        </div>

        <Stamp
          className="mt-5 inline-block lg:mt-7.5"
          innerClassName="px-2.5 py-[7px] text-[10px] lg:px-3 lg:py-2 lg:text-[11px]"
          style={{ transform: "rotate(-1.2deg)" }}
        >
          {templates.licence}
        </Stamp>
      </Container>
    </section>
  );
}
