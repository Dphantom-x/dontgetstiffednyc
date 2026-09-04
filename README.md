# Don't Get Stiffed

Free legal armor for NYC creators. Panic buttons for the night an invoice goes
unpaid, plain-English contract templates, and what the Freelance Isn't Free Act
actually entitles you to. No ads, no signups, no tracking.

Built from the Claude Design source `Dont Get Stiffed.dc.html` as a real,
responsive site: the phone layout is the base and desktop widens it, rather
than the two separate mockups the design file carried.

## Stack

| Piece      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, TypeScript) |
| Styling    | Tailwind CSS v4, CSS-first tokens             |
| Fonts      | `next/font` — Archivo, Archivo Black, Space Mono |
| Linting    | ESLint with `eslint-config-next`              |
| Hosting    | Vercel (zero-config), or any Node host        |

Next.js was picked because this is meant to grow: more pages, more tools, more
translations. The App Router gives per-route metadata, static generation for
the marketing pages, and route handlers where a form needs a real endpoint.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Other scripts:

```bash
npm run build
npm run start
npm run lint
```

## How it is put together

```
src/
  app/
    layout.tsx          Fonts, metadata, the print-grain overlay
    page.tsx            Serves the live site or the pre-launch gate
    prelaunch/page.tsx  Always-on preview of the gate
    api/notify/route.ts Launch-notification signup
    robots.ts           Blocks crawlers entirely while pre-launch
    sitemap.ts
    globals.css         Design tokens and custom utilities
  components/
    LiveSite.tsx        The published page, top to bottom
    layout/             Masthead, sticky nav, footer
    sections/           Triage, Rights, Templates, RedFlags, Workshop, Zine
    prelaunch/          The holding page
    ui/                 TornEdge, Stamp, Grain, Container, LangToggle
  config/site.ts        Deploy-time settings
  content/site.ts       Every line of copy on the page
  lib/cn.ts
```

Two rules keep this easy to extend:

1. **Copy lives in `src/content/site.ts`,** never inline in a component. Wording
   changes without touching layout, and a Spanish translation can sit beside the
   English one when it is written.
2. **Settings live in `src/config/site.ts`,** read from environment variables. The
   same build serves the holding page or the full site.

### The design system

Tokens are defined once in `src/app/globals.css` under `@theme`:

| Token           | Value     | Used for                        |
| --------------- | --------- | ------------------------------- |
| `--color-cream` | `#f3ecdd` | Newsprint ground                |
| `--color-navy`  | `#141a46` | First ink, and all body copy    |
| `--color-pink`  | `#ff48b0` | Second ink, every accent        |
| `--color-paper` | `#fff9ee` | Insets: quotes, boxes, the zine |

Custom utilities carry the riso print language: `headline` and `eyebrow` for
type, `tear-a` / `tear-b` for the torn-paper section breaks, `print-grain` for
the halftone screen. Hard offset shadows are written inline as
`shadow-[5px_5px_0_var(--color-pink)]` so each one can carry its own size.

Note: the font variables are set on `<html>`, not `<body>`. The theme tokens
reference them from `:root`, and a custom property that references an undefined
variable resolves to nothing — putting them on `<body>` silently kills every
headline.

### Adding a page

Create `src/app/<route>/page.tsx`, export `metadata`, and build it from the
existing section components and `Container`. Add the route to `src/app/sitemap.ts`
and, if it should appear in the header, to the `nav` array in the content file.

## Configuration

Copy `.env.example` to `.env.local` and set what you need. Nothing is required
for local development.

| Variable                  | Default                  | Effect                                     |
| ------------------------- | ------------------------ | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`    | `https://getpaidnyc.org` | Canonical URL for metadata and the sitemap |
| `NEXT_PUBLIC_SITE_STAGE`  | `live`                   | `prelaunch` serves the holding page at `/` |
| `NEXT_PUBLIC_HIDE_WORKSHOP` | unset                  | `true` hides the workshop section          |
| `NEXT_PUBLIC_DISABLE_GRAIN` | unset                  | `true` removes the halftone overlay        |
| `NOTIFY_WEBHOOK_URL`      | unset                    | Where pre-launch signups are forwarded     |

**Before switching `NEXT_PUBLIC_SITE_STAGE` to `prelaunch`, set
`NOTIFY_WEBHOOK_URL`.** There is no database here on purpose. With no endpoint
configured, `/api/notify` returns a 503 and the form says so, rather than
showing a confirmation for a list that does not exist. Point it at any provider
that accepts a JSON `POST` of `{ email, source }`.

## Deploying

Push to `main` and import the repository on Vercel; the defaults are correct.
Set the environment variables above in the project settings. Any host that runs
`npm run build && npm run start` works too.

## Still placeholders

Marked in `src/content/site.ts` with square brackets, and all of them are
copy-only changes:

- Workshop date, time and venue
- Reviewing attorney and firm
- Template downloads and the zine PDF, which currently link back to their own sections
- The Spanish translation behind the EN / ES toggle

## Licence

Content is CC BY-SA 4.0, per the site's own terms: copy it, translate it, print
it. Don't sell it and don't lock it up.
