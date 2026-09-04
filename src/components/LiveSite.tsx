import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteNav } from "@/components/layout/SiteNav";
import { RedFlags } from "@/components/sections/RedFlags";
import { Rights } from "@/components/sections/Rights";
import { Templates } from "@/components/sections/Templates";
import { Triage } from "@/components/sections/Triage";
import { Workshop } from "@/components/sections/Workshop";
import { Zine } from "@/components/sections/Zine";
import { siteConfig } from "@/config/site";

/**
 * The published site, top to bottom. One responsive tree: the phone layout is
 * the base and desktop widens it, rather than two separate builds.
 */
export function LiveSite() {
  return (
    <>
      <a
        href="#triage"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:tracking-widest focus:text-cream focus:uppercase"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="top">
        <SiteHeader />
        <Triage />
        <Rights />
        <Templates />
        <RedFlags />
        {siteConfig.showWorkshop && <Workshop />}
        <Zine />
      </main>
      <SiteFooter />
    </>
  );
}
