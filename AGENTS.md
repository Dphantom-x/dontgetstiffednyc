<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Don't Get Stiffed — working notes

A public information site for NYC freelancers, built from a Claude Design file.
Read `README.md` first for the stack and layout.

## Conventions that matter

- **Copy goes in `src/content/site.ts`.** Do not hard-code visible strings in
  components. Sections read their words from there.
- **Settings go in `src/config/site.ts`**, backed by environment variables, so
  one build can serve either stage.
- **One responsive tree.** The phone layout is the base; `lg:` (1024px) widens it.
  Do not add a second desktop-only component tree. Where the two layouts genuinely
  differ, `lg:hidden` / `hidden lg:block` on a small block is fine.
- **Design tokens live in `src/app/globals.css`.** Use `bg-cream`, `text-navy`,
  `bg-pink`, `bg-paper` and the `headline` / `eyebrow` / `tear-a` / `tear-b`
  utilities instead of raw hex values.

## Traps already hit

- The `next/font` variables are on `<html>`, not `<body>`. Theme tokens reference
  them from `:root`; move them to `<body>` and every headline silently falls back.
- Do not bake `display` or `background` classes into shared components such as
  `Stamp`. Callers pass `hidden lg:inline-block`, and Tailwind resolves conflicting
  utilities by stylesheet order, not by the order they appear in the class string.
- Big display type needs `clamp()` at desktop sizes, or headlines wrap mid-phrase
  in the narrower grid columns at 1024–1440px.

## Before committing

```bash
npm run lint
npm run build
```

## Content that is still placeholder

Anything in `[SQUARE BRACKETS]` in `src/content/site.ts`: workshop date and
venue, reviewing attorney, and the template and zine downloads. Legal text was
carried over from the design and reviewed by nobody — treat wording changes to
the rights section as substantive, not cosmetic.
