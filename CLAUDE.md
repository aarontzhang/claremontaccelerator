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
    Navbar.tsx              # Full-width flush bar; glass fades in scroll-scrubbed
    Footer.tsx
    CTAButton.tsx
    PageAtmosphere.tsx      # Blooms + grain background — currently unmounted (pages use flat bg-black)
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
So the page wrapper, `<h1>` and the company-count line live in the **server**
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
| `.flat-cards` | Page-wrapper opt-in: recolors any descendant `.glass` to a flat, uniform frost — kills the top-lit gradient body, `::before` dome, and specular top edge. On every page **except `/team`** (which keeps the graded glass). The navbar is unaffected because it renders in `layout.tsx`, outside these wrappers. |
| `.sheen` | Specular sweep across a button on hover |
| `.bloom` / `.grain-layer` | Used by `PageAtmosphere` (currently unmounted — see below) |

**Glass needs a ground.** `backdrop-filter` has nothing to blur, but a solid fill is fine —
it blurs to that flat color. Pages now use pure black and no atmosphere layer:

```tsx
<div className="relative min-h-screen bg-black flat-cards">
  <div className="relative z-10">{/* content */}</div>
</div>
```

`PageAtmosphere` (blooms + grain) is no longer mounted on any page — it was removed in favor of
flat black backgrounds. The component still exists if you want to bring the texture back.
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

`Navbar.tsx` is a **full-width bar flush to the top** at all times — no pill, no docking, no
width/radius animation. (It used to be a floating pill that docked on scroll; that's gone.)

- **Footprint is ~88px** (`py-[23px]` × 2 + 42px logo, flush at `top-0`, no inset). Pages that
  need to clear it hardcode a `pt` derived from this — change the padding, revisit those.
- **The glass material is scroll-scrubbed, not toggled.** A rAF-throttled scroll listener maps
  `window.scrollY / 80` → `t` (0..1), and every material property is interpolated inline by `t`:
  fill alpha, `backdrop-filter` blur+brightness, bottom border alpha, the inset specular shadows,
  and the `::before` dome opacity (driven by the `--nav-frost` CSS var). So at the very top the bar
  is fully transparent with no blur, and the frost fades in over the first 80px of scroll.
- `backdropFilter` **and** `WebkitBackdropFilter` are both set inline (React inline styles, no
  Lightning CSS to collapse them) — otherwise the class's `-webkit-` value lingers on Safari and
  the bar never un-blurs at the top.
- An open mobile menu (`isOpen`) forces `t = 1` so the dropdown never floats over a transparent bar.
- Active-link underline (`.nav-link-active::after`) uses `#0050ca` (the darker `--accent-dark`),
  not `#0165fc` — a 2px hairline of the brighter blue anti-aliases to periwinkle over the glass.

## Short Links

`/l/[slug]` reads `public/links.json` and redirects. Add new short links there.

## Cohort 5

Cohort 5 is configured but has no startups yet. The empty state on the startups page reads "Cohort 5 is coming soon. Check back in August 2026."

## Hero Section Convention

Sub-pages (e.g. `/team`, `/intern`, `/found`) share a hero pattern for visual consistency:

- Section: `relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[...] border-b border-white/[0.13]` — `pt`, not `mt`, so the full-bleed `absolute inset-0` background image starts at the top of the viewport and only the text clears the navbar.
- `pt` values are **per page and hand-tuned** (the text is `flex items-center`-centered, so shrinking `pt` mostly nudges the block up rather than closing a fixed gap). Current values after the flush-navbar switch: `/found` & `/intern` `pt-[79px]`, `/team` `pt-[64px]`, `/startups` `pt-[151px]`. `/mentor` & `/support` still carry the old `pt-[131px]` — not yet retuned.
- Content wrapper: `max-w-4xl mx-auto px-6 py-16 text-center`
- Overlay gradient: `radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)`
- h1: `font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.05]`
- Bottom edge: `border-b border-white/[0.13]` — same value as the navbar's bottom hairline
- The homepage has no photo hero; its `relative z-10` content wrapper sits at `pt-0`.

## Assets

Keep image assets small — the site had a **15 MB** hero PNG that tanked load times. The hero
cutout is now `public/betterbg-transparent.webp` (1600px, ~88 KB), generated with `sharp`
(bundled via Next). To resize/convert a heavy asset:

```js
require('sharp')(src).resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82, alphaQuality: 90 }).toFile(out)
```

Known remaining weight (not yet optimized): `logos/partners/ef_v4.png` (544 KB),
`zfellows.svg` (292 KB, SVGs bypass next/image), and `/team` photos (1.6–1.8 MB each). Also
`layout.tsx` loads the Aileron heading font from `fonts.cdnfonts.com` via a render-blocking
`<link>` — worth self-hosting with `next/font/local`.

The homepage has no photo hero; it nudges all sections down together with `pt-[35px]` on its
`relative z-10` content wrapper.
