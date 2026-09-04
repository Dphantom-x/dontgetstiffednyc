/**
 * All page copy lives here so wording can change without touching layout,
 * and so a Spanish translation can slot in beside it later.
 */

import type { DoorId } from "@/config/site";

/** A numbered instruction: bold lead-in, then the rest of the sentence. */
export type Step = { lead: string; body: string };

export type ResourceLink = {
  title: string;
  blurb: string;
  href: string;
  /** External links open in a new tab and show an arrow out instead of down. */
  external: boolean;
};

export const masthead = {
  domain: "getpaidnyc.org",
  est: "est. brooklyn",
  stamp: ["free", "cc by-sa"],
  title: ["Don't", "get", "stiffed"],
  tagline: "Free legal armor for NYC creators. No ads. No signups. Yours to copy.",
};

export const nav = [
  { label: "Rights", href: "#rights" },
  { label: "Templates", href: "#templates" },
  { label: "Red flags", href: "#red-flags" },
  { label: "Workshop", href: "#workshop" },
  { label: "Zine", href: "#zine" },
];

export const triage = {
  eyebrow: "It's 2am and you're owed money",
  title: ["Didn't", "get paid?"],
  leadMobile: "Three doors. Pick the one that hurts.",
  leadDesktop:
    "Free legal armor for NYC creators. No ads. No signups. Yours to copy. Three doors, pick the one that hurts.",
  stamp: "Free · CC BY-SA 4.0 · getpaidnyc.org",
};

/** The five-line chase email, kept deliberately calm and dated. */
export const chaseEmail = [
  "Hi [Name] —",
  "",
  "Following up on invoice #[000] for [$0,000], sent [date] for [project]. It was due [due date] and is now [00] days late.",
  "",
  "Under NYC's Freelance Isn't Free Act, payment is due by the date we agreed or within 30 days of my completing the work. Please confirm a payment date by [date].",
  "",
  "Happy to resend the invoice if that helps.",
  "",
  "Thanks,",
  "[Your name]",
].join("\n");

export const doors: {
  id: DoorId;
  label: string;
  tone: "pink" | "cream";
  tilt: string;
}[] = [
  { id: "quiet", label: "Client went quiet", tone: "pink", tilt: "-0.7deg" },
  { id: "contract", label: "No contract, now what", tone: "pink", tilt: "0.6deg" },
  { id: "human", label: "I need a human", tone: "cream", tilt: "-0.5deg" },
];

export const quietDoor = {
  kicker: "Do this tonight",
  steps: [
    {
      lead: "Pull the receipts.",
      body: "Screenshot the brief, the approval, the invoice, the delivery date. One folder.",
    },
    {
      lead: "Send the five-line chase.",
      body: "Calm, dated, on the record. Not a vibe check.",
    },
    {
      lead: "No answer in 5 days?",
      body: "Escalate. File with DCWP or call a lawyer, both are free.",
    },
  ] satisfies Step[],
  copyIdle: "Copy the email",
  copyDone: "Copied ✓",
};

export const contractDoor = {
  lead: "You are probably still covered. Emails, DMs, a deposit, a delivered file, that's a deal.",
  steps: [
    {
      lead: "Screenshot everything today.",
      body: "Accounts get deleted. Threads disappear.",
    },
    {
      lead: "Send a written recap.",
      body: "“Confirming what we agreed: scope, fee, dates.” Silence is a kind of agreement.",
    },
    {
      lead: "Grab a template",
      body: "so the next one is airtight.",
    },
  ] satisfies Step[],
  note: "And note: at $800+ the client is the one legally required to hand you a written contract. Not having one is their problem before it's yours.",
};

export const humanDoor: ResourceLink[] = [
  {
    title: "Volunteer Lawyers for the Arts",
    blurb: "Free / low-cost legal help for creatives",
    href: "https://vlany.org",
    external: true,
  },
  {
    title: "NYC DCWP complaint",
    blurb: "File it yourself, free, online",
    href: "https://www.nyc.gov/site/dca/about/freelance-isnt-free-act.page",
    external: true,
  },
  {
    title: "Client Email Roast",
    blurb: "Come yell about it in a room with us",
    href: "#workshop",
    external: false,
  },
];

export const rights = {
  eyebrow: "01 / The law is on your side",
  title: ["Know your", "rights"],
  statement: {
    before: "In New York City, if a client hires you for ",
    highlight: "$800 or more",
    after:
      " of work, they owe you a written contract and full payment, on the date you agreed, or within 30 days of you finishing.",
  },
  attribution: "— The Freelance Isn't Free Act",
  catch: {
    kicker: "The $800 catch",
    before: "Under $800 and the written-contract rule doesn't kick in. But small jobs from the ",
    strong: "same client inside 120 days add up",
    after: ", three $300 gigs clears the bar. And either way, you are still owed the money.",
  },
  openLabel: "Read the whole thing ↓",
  closeLabel: "Close ↑",
  points: [
    {
      short: "Contract at $800+",
      lead: "Contract required at $800+",
      body: "one job, or several from the same client within 120 days.",
      shortBody: "One job, or several from the same client within 120 days.",
    },
    {
      short: "Paid on time",
      lead: "Paid on time",
      body: "by the date in the contract, or within 30 days of completing the work if no date was set.",
      shortBody: "By the agreed date, or within 30 days of completing the work.",
    },
    {
      short: "No retaliation",
      lead: "No retaliation",
      body: "a client can't punish, blacklist or threaten you for asking to be paid.",
      shortBody: "A client can't punish, blacklist or threaten you for asking.",
    },
    {
      short: "Double damages",
      lead: "Double damages",
      body: "win a nonpayment claim and you can be owed twice what you were stiffed, plus attorney's fees.",
      shortBody: "Win a nonpayment claim and you can be owed twice the sum, plus fees.",
    },
  ],
  deadlines:
    "Deadlines are generally two years for the missing contract and six years for nonpayment or retaliation, but don't wait.",
  deadlinesLink: {
    label: "Full text at NYC DCWP ↗",
    href: "https://www.nyc.gov/site/dca/about/freelance-isnt-free-act.page",
  },
};

export const templates = {
  eyebrow: "02 / Pull-out contracts",
  title: ["Steal these", "templates"],
  lead: "One page each. Plain English. Fill in five blanks and send it before you start the job.",
  licence: "CC BY-SA 4.0 · copy · remix · print",
  items: [
    {
      number: "01",
      name: "Shoot",
      blurb: "Day rate, usage window, kill fee, who owns the raws.",
      href: "#templates",
    },
    {
      number: "02",
      name: "Design & illustration",
      blurb: "Rounds of revisions, source files, licence, 50% up front.",
      href: "#templates",
    },
    {
      number: "03",
      name: "Writing",
      blurb: "Per-word or flat, kill fee, byline, rights reverting to you.",
      href: "#templates",
    },
    {
      number: "04",
      name: "Social & UGC",
      blurb: "Deliverable count, paid-media boost fee, exclusivity end date.",
      href: "#templates",
    },
  ],
};

export const redFlags = {
  eyebrow: "03 / Heard it before",
  title: ["Red flags,", "roasted"],
  items: [
    {
      line: "“We'll pay you after launch.”",
      roast:
        "Launch is not a payment term, a date is. “Net 15 from delivery.” Their timeline is not your cashflow.",
    },
    {
      line: "“It'll be great exposure.”",
      roast:
        "Exposure has never once cleared rent on Myrtle Ave. Ask for the number, not the vibe: “What's the budget?”",
    },
    {
      line: "“Just a quick unpaid test first.”",
      roast:
        "A test that ships is a job. Offer a paid mini-brief instead, real clients say yes in one message.",
    },
  ],
};

export const workshop = {
  eyebrow: "04 / Free, in person, monthly",
  title: ["Client", "email roast"],
  lead: "Bring your worst client email. We rewrite it live, out loud, in a room full of people who've been stiffed by the same three agencies.",
  kicker: "Next session",
  date: ["[Thu · Month 00]", "[7:00 – 9:00pm]"],
  venue: [
    "[VENUE NAME]",
    "[STREET ADDRESS], [NEIGHBOURHOOD]",
    "Free · BYO laptop · No RSVP needed",
  ],
  cta: "Save me a seat →",
  ctaHref: "#workshop",
};

export const zine = {
  eyebrow: "05 / The paper version",
  titleMobile: "The zine",
  titleDesktop: "500 free copies around Brooklyn",
  coverLabel: ["Zine cover", "5.5 × 8.5in"],
  blurb:
    "16 pages, two-colour riso, pull-out contracts in the middle. Stacked in coffee shops, print shops and studios from Bushwick to Sunset Park.",
  reprint: "Out of copies? Print your own. Seriously.",
  cta: "Download the PDF ↓",
  ctaHref: "#zine",
  meta: "Print-ready spreads · 8.4 MB",
};

export const footer = {
  kicker: "Go get your money",
  links: [
    { label: "Volunteer Lawyers for the Arts", href: "https://vlany.org" },
    {
      label: "NYC DCWP",
      href: "https://www.nyc.gov/site/dca/about/freelance-isnt-free-act.page",
    },
    { label: "NYC Business Solutions", href: "https://www.nyc.gov/nycbusiness" },
  ],
  legal: {
    reviewed: {
      before: "Templates reviewed by ",
      attorney: "[ATTORNEY NAME]",
      after: ", [FIRM NAME], licensed in New York.",
    },
    disclaimer: "This is information, not legal advice. Your situation is yours.",
    licence: {
      before: "Everything here is ",
      strong: "CC BY-SA 4.0",
      after:
        ". Copy it, translate it, print it, staple it, leave it in a coffee shop. Just don't sell it and don't lock it up.",
    },
  },
  colophon: "no ads · no signups · no tracking",
  langNote: {
    en: "Español coming soon.",
    es: "Traducción al español, en camino.",
  },
};

export const gate = {
  stamp: "Not yet published",
  title: ["Don't", "get", "stiffed"],
  lead: "Free legal armor for NYC creators: the panic buttons, the contract templates, the workshop dates. Currently in production. No ads, no signups, yours to copy when it lands.",
  label: "Get one email the day it's live",
  placeholder: "you@studio.nyc",
  submit: "Tell me →",
  privacy:
    "One email. At launch. Then we delete the list. No tracking, no partners, no newsletter you have to escape.",
  successKicker: "On the list ✓",
  successTitle: "We'll shout when it's live.",
  successBody: ", that's it, nothing else to do. Meanwhile: go put a payment date in writing.",
  urgentKicker: "Getting stiffed right now?",
  urgentLead: "Don't wait for us. These two are free and open today.",
  urgentLinks: [
    { label: "Volunteer Lawyers for the Arts ↗", href: "https://vlany.org" },
    {
      label: "NYC DCWP ↗",
      href: "https://www.nyc.gov/site/dca/about/freelance-isnt-free-act.page",
    },
  ],
  zineNote: {
    before: "Scanned the QR off the zine? You're early, the paper version is already out there. ",
    strong: "500 free copies around Brooklyn.",
  },
};
