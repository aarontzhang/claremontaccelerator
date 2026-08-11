# Claremont Accelerator — CLAUDE.md

Marketing site for the Claremont Accelerator, a student startup program at the Claremont Colleges.

## Stack

- **Next.js 16** (App Router, static generation)
- **React 19**
- **Tailwind CSS v4** — no config file; configured via `@theme inline` in `globals.css`
- **TypeScript 5** — path alias `@/*` maps to `./src/*`
- **@tabler/icons-react** — the site's icon set
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
      page.tsx              # Server component — data + static chrome (h1, count), wraps client in Suspense
      StartupsClient.tsx    # "use client" — filtering, search, cohort tabs, card grid ONLY
      StartupsSkeleton.tsx  # Suspense fallback for the interactive list
      [slug]/
        page.tsx            # Individual startup detail page (statically generated)
    team/page.tsx
    mentor/page.tsx
    intern/page.tsx           # Intern landing — server component, pulls open roles from startup jobs
    found/page.tsx            # Founder landing — programs (Accelerator + CA Studio) + outcomes cards
    support/page.tsx
    l/[slug]/page.tsx       # Short link redirects (config in /links.json)
  components/
    Navbar.tsx              # Floating glass pill; docks flush on scroll
    Footer.tsx
    CTAButton.tsx
    PageAtmosphere.tsx      # Shared fixed background (blooms + grain) — required for glass
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

### /startups render split

`StartupsClient` calls `useSearchParams()`, which opts its whole subtree out of prerendering.
So the page wrapper, `PageAtmosphere`, `<h1>` and the company-count line live in the **server**
component (`page.tsx`) and ship in static HTML; only the filters and grid sit behind `<Suspense>`
with `StartupsSkeleton` as the fallback. Keep it that way — moving the header back into the client
component reintroduces a blank page on a cold cache.

On the portfolio cards, the jobs badge is only rendered when `startup.jobs.length > 0`.

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

Note: the `--surface` / `--surface-elevated` / `--border` tokens are legacy. Redesigned
pages use the glass system below instead; `--border` (`#262626`) in particular reads muddy
against glass — prefer `white/[0.07]` for dividers and `white/15` for chips.

## Glass Design System

Cards, inputs, and secondary buttons use a frosted-glass material defined in `globals.css`.

| Class | Use |
|---|---|
| `.glass` | The primitive: translucent gradient body + `backdrop-filter: blur(30px) saturate(180%)` + a 1px inset specular top edge |
| `.glass-flat` | Same material, lighter cast shadow. For DENSE grids (3+ cols / tight gaps) where full shadows pile up |
| `.glass-hover` | Lift + brighten on hover. Only for cards that are actually clickable |
| `.glass-nav` | Navbar-only override (denser tint, `brightness()` knock-down) |
| `.sheen` | Specular sweep across a button on hover |
| `.bloom` / `.grain-layer` | Used by `PageAtmosphere` |

**Glass needs a ground.** `backdrop-filter` has nothing to blur on a flat fill, so a page
using glass must be structured:

```tsx
<div className="relative min-h-screen bg-[#06070c]">
  <PageAtmosphere />
  <div className="relative z-10">{/* content */}</div>
</div>
```

Sections inside must NOT have opaque fills (`bg-[var(--surface)]` etc.) or the ground is hidden.

### Gotchas

- **Never hand-write `-webkit-backdrop-filter`.** Lightning CSS (Tailwind v4's compiler) does
  its own prefixing; a manual prefix makes it collapse the pair and DROP the standard property,
  silently disabling blur. Write only `backdrop-filter`.
- **No `opacity < 1`, `filter`, or `transform` on an ancestor** of a glass element — each creates
  a backdrop root and kills the blur. `ScrollReveal` settles to `opacity:1` at rest so it's fine.
- `.glass` sets `position: relative`. Absolutely-positioned siblings that must sit above it
  (e.g. the portfolio search icon) need an explicit `z-10`.
- `.glass::before` (specular sheen) paints above non-positioned in-flow content. Add
  `relative z-10` to content wrappers if text or a white logo plate looks washed.
- The top specular edge is an **inset box-shadow**, not a border — `borderTopColor` won't remove it.

## Icons

Use `@tabler/icons-react`. Convention — size via className (not the `size` prop), and `stroke`
matching the design weight:

```tsx
import { IconArrowRight } from "@tabler/icons-react";
<IconArrowRight className="w-4 h-4" stroke={2} />
```

Filled brand glyphs (LinkedIn, Instagram) use the `…Filled` variants with no `stroke`.
There are no hand-written inline `<svg>` icons left in `src/`.

## Navbar

`Navbar.tsx` is a floating glass pill that docks flush to the top past 90px of scroll
(`border-radius`, `max-width`, `border-color`, `box-shadow` transition together).

- **Total footprint at rest is 96px** (28px top inset + 68px capsule). Pages that need to clear
  it hardcode this number — change one, change the other.
- Resting corner radius is `34px` (half the bar height), NOT `rounded-full`. `rounded-full`
  compiles to `9999px`, and animating 9999→0 looks like it snaps at the very end.
- When docked, the top/side borders fade to `transparent` and the top specular inset goes to 0,
  rather than dropping `border-width`, so the bar never shifts a pixel.

## Short Links

`/l/[slug]` reads `public/links.json` and redirects. Add new short links there.

## Cohort 5

Cohort 5 is configured but has no startups yet. The empty state on the startups page reads "Cohort 5 is coming soon. Check back in August 2026."

## Hero Section Convention

Sub-pages (e.g. `/team`, `/intern`, `/found`) share a hero pattern for visual consistency:

- Section: `relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[131px]` — `pt`, not `mt`, so the full-bleed `absolute inset-0` background image starts at the top of the viewport and only the text clears the navbar. 131px = the navbar's 96px floating footprint (28px top inset + 68px capsule) + a 35px breathing gap. All five photo-header pages (`/team`, `/found`, `/intern`, `/mentor`, `/support`) use this.
- Content wrapper: `max-w-4xl mx-auto px-6 py-16 text-center`
- Overlay gradient: `radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)`
- h1: `font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.05]`
- Bottom edge: `border-b border-white/[0.13]` — same value as the navbar pill's border
- Exception: `/team` uses `pt-[116px]` (a 20px gap) rather than 131px, on purpose

The homepage has no photo hero; it nudges all sections down together with `pt-[35px]` on its
`relative z-10` content wrapper.
