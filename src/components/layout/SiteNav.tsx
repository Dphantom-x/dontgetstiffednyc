import { Container } from "@/components/ui/Container";
import { masthead, nav } from "@/content/site";

/** Sticky desktop bar. Hidden on phones, where the masthead does this job. */
export function SiteNav() {
  return (
    <nav className="sticky top-0 z-20 hidden border-b-[3px] border-pink bg-navy text-cream lg:block">
      <Container className="flex h-[74px] items-center justify-between gap-8">
        <a
          href="#top"
          className="headline text-[22px] tracking-[-0.03em] text-cream [text-shadow:2px_2px_0_var(--color-pink)]"
        >
          {masthead.title.join(" ")}
        </a>
        <div className="flex items-center gap-7 font-mono text-xs font-bold tracking-[0.12em] uppercase">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-cream hover:text-pink">
              {item.label}
            </a>
          ))}
          <span className="inline-block border-2 border-pink px-2.5 py-1.5 text-pink">EN / ES</span>
        </div>
      </Container>
    </nav>
  );
}
