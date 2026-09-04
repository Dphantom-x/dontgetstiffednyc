/**
 * Site-wide configuration.
 *
 * These mirror the adjustable props on the original Claude Design file, but as
 * real deploy-time settings. Flip them with environment variables so the same
 * build can serve the pre-launch gate or the full site.
 */

export type SiteStage = "live" | "prelaunch";
export type DoorId = "quiet" | "contract" | "human";

const stageFromEnv = process.env.NEXT_PUBLIC_SITE_STAGE;

export const siteConfig = {
  /** Public-facing project name. */
  name: "Don't Get Stiffed",
  /** Short name for the browser tab and PWA surfaces. */
  shortName: "Don't Get Stiffed",
  /** The domain as printed on the zine. */
  domain: "getpaidnyc.org",
  /** Canonical origin, used for metadata, sitemap and robots. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpaidnyc.org",
  description:
    "Free legal armor for NYC creators. Panic buttons, contract templates and your rights under the Freelance Isn't Free Act. No ads, no signups, yours to copy.",
  locale: "en_US",

  /** "prelaunch" serves the holding page at /, "live" serves the full site. */
  stage: (stageFromEnv === "prelaunch" ? "prelaunch" : "live") as SiteStage,

  /** Halftone print grain over the whole page. */
  grain: process.env.NEXT_PUBLIC_DISABLE_GRAIN !== "true",

  /** Show the monthly Client Email Roast strip. */
  showWorkshop: process.env.NEXT_PUBLIC_HIDE_WORKSHOP !== "true",

  /** Which triage door is open when someone lands. null = all closed. */
  defaultDoor: null as DoorId | null,

  /** File formats offered on the contract template cards. */
  templateFormat: "PDF + DOCX",

  /** Month shown on the pre-launch gate footer. */
  launchWindow: "[Month] 2026",
} as const;

export type SiteConfig = typeof siteConfig;
