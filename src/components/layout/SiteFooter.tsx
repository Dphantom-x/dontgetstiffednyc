import { Container } from "@/components/ui/Container";
import { LangToggle } from "@/components/ui/LangToggle";
import { TornEdge } from "@/components/ui/TornEdge";
import { footer } from "@/content/site";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream">
      <TornEdge from="cream" variant="a" />
      <Container className="pt-7 pb-11 lg:pt-14 lg:pb-16">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1fr_0.8fr] lg:items-start lg:gap-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 className="eyebrow text-[11px] tracking-[0.16em] text-pink lg:text-xs lg:tracking-[0.18em]">
              {footer.kicker}
            </h2>
            <div className="mt-3.5 flex flex-col border-t-2 border-cream/35 lg:mt-4">
              {footer.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="headline flex min-h-14 items-center justify-between gap-3 border-b-2 border-cream/35 py-3.5 text-[15px] leading-tight tracking-[-0.01em] text-cream hover:text-pink lg:min-h-[58px] lg:py-[15px] lg:text-[17px]"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-pink">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-start-3 lg:row-start-1">
            <LangToggle />
            <p className="mt-6 hidden font-mono text-[11.5px] leading-[1.7] opacity-60 lg:block">
              {siteConfig.domain}
              <br />
              {footer.colophon}
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t-2 border-cream/35 pt-4.5 font-mono text-[11px] leading-[1.65] lg:col-start-2 lg:row-start-1 lg:gap-3.5 lg:border-t-0 lg:pt-0 lg:text-xs lg:leading-[1.7]">
            <p>
              {footer.legal.reviewed.before}
              <strong className="text-pink">{footer.legal.reviewed.attorney}</strong>
              {footer.legal.reviewed.after}
            </p>
            <p>{footer.legal.disclaimer}</p>
            <p>
              {footer.legal.licence.before}
              <strong className="text-pink">{footer.legal.licence.strong}</strong>
              {footer.legal.licence.after}
            </p>
            <p className="opacity-60 lg:hidden">
              {siteConfig.domain} · {footer.colophon}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
