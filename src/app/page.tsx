import { LiveSite } from "@/components/LiveSite";
import { PrelaunchGate } from "@/components/prelaunch/PrelaunchGate";
import { siteConfig } from "@/config/site";

/**
 * The homepage serves whichever stage the deployment is set to. Flip it with
 * NEXT_PUBLIC_SITE_STAGE=prelaunch.
 */
export default function Home() {
  return siteConfig.stage === "prelaunch" ? <PrelaunchGate /> : <LiveSite />;
}
