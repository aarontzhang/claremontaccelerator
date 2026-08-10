# Claremont Accelerator — CLAUDE.md

Marketing site for the Claremont Accelerator, a student startup program at the Claremont Colleges.

## Stack

- **Next.js 16** (App Router, static generation)
- **React 19**
- **Tailwind CSS v4** — no config file; configured via `@theme inline` in `globals.css`
- **TypeScript 5** — path alias `@/*` maps to `./src/*`
- No database, no auth, no API routes

## Commands

```bash
npm run dev    # dev server (usually http://localhost:3000)
npm run build  # production build
npm run lint   # ESLint
```

## Project Structure

```
src/
  app/
    layout.tsx              # Root layout: Navbar + Footer wrapping all routes
    page.tsx                # Homepage
    globals.css             # Tailwind import + CSS custom properties (dark theme)
    startups/
      page.tsx              # Server component — loads data, renders StartupsClient
      StartupsClient.tsx    # "use client" — filtering, search, cohort tabs, card grid
      [slug]/
        page.tsx            # Individual startup detail page (statically generated)
    team/page.tsx
    mentor/page.tsx
    intern/page.tsx           # Intern landing — server component, pulls open roles from startup jobs
    found/page.tsx            # Founder landing — programs (Accelerator + CA Studio) + outcomes cards
    support/page.tsx
    l/[slug]/page.tsx       # Short link redirects (config in /links.json)
  components/
    Navbar.tsx
    Footer.tsx
    CTAButton.tsx
    ScrollReveal.tsx
    StartupLogo.tsx
    TeamMember.tsx
  lib/
    startups.ts             # loadAllStartups() — reads markdown, parses frontmatter

content/
  startups/
    cohort-1/ … cohort-5/  # One .md file per startup

public/
  logos/                    # Startup logos (webp/png)
  logos/partners/           # Partner logos (a16z, YC, EF, etc.)
  team/                     # Team member photos
  links.json                # Short-link map for /l/[slug]
```

## Adding a Startup

1. Create `content/startups/cohort-N/startup-slug.md` with this frontmatter:

```markdown
---
name: Company Name
tagline: One-line description
logo: /logos/filename.webp
website: https://...
founders: Founder One, Founder Two
status: active
cohort: N
---

Description paragraphs here.

## Jobs
Job Title | Full-time | Location | https://apply-url.com
```

2. Add the slug to `SLUG_ORDER` in `src/lib/startups.ts` under the correct cohort key.
3. Drop the logo file in `public/logos/`.

## Startup Data Flow

`loadAllStartups()` (server-only, called in page components):
- Reads `.md` files from `content/startups/cohort-{n}/` in `SLUG_ORDER` order
- Parses YAML-like frontmatter + markdown body
- Splits `## Jobs` section into structured `Job[]`
- Checks logo file existence in `public/`
- Returns `Startup[]`

The `/startups/[slug]` route uses `generateStaticParams()` to pre-render one page per startup at build time.

The `/intern` route also calls `loadAllStartups()`: it renders an "Open roles" section aggregated from every startup's `## Jobs` block, and falls back to a portfolio snapshot grid when no jobs exist yet. The snapshot is hardcoded to show only: `kandor-ai`, `flash-biometrics`, `openflow`, `lintel`.

## Theme / Styling

Dark theme only. Key CSS variables (defined in `globals.css`):

| Variable | Use |
|---|---|
| `--background` | Page background (near-black) |
| `--surface` | Card backgrounds |
| `--surface-elevated` | Slightly lighter surface |
| `--border` | Subtle borders |
| `--muted` | Dim text |
| `--muted-light` | Secondary body text |
| `--accent` | `#0165fc` — primary blue |

Blue tones used directly as hex: `#0165fc` (solid), `#3385fd` (hover/highlight), `#0165fc/40` (border opacity).

## Short Links

`/l/[slug]` reads `public/links.json` and redirects. Add new short links there.

## Cohort 5

Cohort 5 is configured but has no startups yet. The empty state on the startups page reads "Cohort 5 is coming soon. Check back in August 2026."

## Hero Section Convention

Sub-pages (e.g. `/team`, `/intern`, `/found`) share a hero pattern for visual consistency:

- Section: `relative min-h-[40vh] flex items-center justify-center overflow-hidden mt-[72px]`
- Content wrapper: `max-w-4xl mx-auto px-6 py-16 text-center`
- Overlay gradient: `radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)`
- h1: `font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.05]`
