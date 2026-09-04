import type { Metadata } from "next";
import { PrelaunchGate } from "@/components/prelaunch/PrelaunchGate";

/** Always-on preview of the holding page, whatever stage the site is in. */
export const metadata: Metadata = {
  title: "Pre-launch",
  robots: { index: false, follow: false },
};

export default function PrelaunchPage() {
  return <PrelaunchGate />;
}
