import { Stamp } from "@/components/ui/Stamp";
import { masthead } from "@/content/site";

/**
 * Phone masthead: the brand set as big as it goes, with the licence stamp
 * hanging off the right edge. Replaced by the sticky bar at desktop widths.
 */
export function SiteHeader() {
  return (
    <header className="bg-cream px-[22px] pt-3.5 pb-[34px] lg:hidden">
      <div className="relative mx-auto max-w-[470px]">
        <div className="flex items-center justify-between gap-2.5 border-b-2 border-navy pb-[22px] font-mono text-[11px] tracking-[0.16em] uppercase">
          <span>{masthead.domain}</span>
          <span className="text-pink">{masthead.est}</span>
        </div>

        <Stamp
          className="absolute top-11 -right-1.5 z-[2] block bg-cream"
          innerClassName="text-[9px] px-[7px] py-1 tracking-[0.12em]"
          style={{ transform: "rotate(-9deg)" }}
        >
          {masthead.stamp[0]}
          <br />
          {masthead.stamp[1]}
        </Stamp>

        <p className="headline mt-[26px] text-[58px] leading-[0.83] text-navy [text-shadow:4px_4px_0_var(--color-pink)]">
          {masthead.title[0]}
          <br />
          {masthead.title[1]}
          <br />
          {masthead.title[2]}
        </p>

        <p className="mt-[18px] max-w-[330px] text-[15px] leading-[1.45] font-medium text-pretty">
          {masthead.tagline}
        </p>
      </div>
    </header>
  );
}
