import { LiveSite } from "@/components/LiveSite";
import { PrelaunchGate } from "@/components/prelaunch/PrelaunchGate";
import { siteConfig } from "@/config/site";

/**
 * The homepage serves whichever stage the deployment is set to. The pre-launch
 * gate is the default; NEXT_PUBLIC_SITE_STAGE=live opens the full site.
 */
export default function Home() {
  return siteConfig.stage === "prelaunch" ? <PrelaunchGate /> : <LiveSite />;
}
