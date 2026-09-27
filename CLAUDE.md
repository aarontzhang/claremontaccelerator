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

## Git Commits

Do not add a `Co-Authored-By: Claude` (or similar) trailer to commit messages on this repo.

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
    found/cohort/page.tsx      # "Apply here" target for the Claremont Accelerator card — mail-client
                                # mockup of Chase's cohort-recruitment email, not a real form
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
  logos/partners/           # Partner/exit logos shown in the homepage hero "Backed by" row
  logos/schools/            # The 5C college logos shown under "Who We Are" on the homepage
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

### /found apply flow

The two program cards on `/found` intentionally use different CTA states right now:

- **Claremont Accelerator (main program)** — "Apply here" links to `/found/cohort`, a
  standalone page styled as a mail-client window showing Chase's cohort-recruitment email
  (subject, sender, body). It's a static mockup, not a real form — the reply button is a
  `mailto:` to `cwitzansky29@cmc.edu` with the subject pre-filled. `FOUNDER_APPLICATION_URL`
  in `found/page.tsx` (the real Google Form) stays commented out until there's an actual
  in-site application flow.
- **CA Studio** — applications are open. "Apply here" is a plain `<a>` (external, `target="_blank"`)
  to `STUDIO_APPLICATION_URL` in `found/page.tsx`, the live Studio Google Form viewform link.
  The old disabled `Applications Closed` span + mailing-list signup CTA has been removed.

### Homepage "Our Programs" cards

The 3-card grid on `/` (Accelerator, CA Studio, Intern) used to share a single CTA button
below the grid linking to `/intern`. Each card is now `flex flex-col` with its own
`mt-auto`-pinned button instead, so all three buttons stay aligned across the row regardless
of list length:

- **Claremont Accelerator** — `Link` "Apply" → `/found/cohort` (same mockup page as the
  `/found` card).
- **CA Studio** — external `<a>` "Apply" → the live Studio Google Form (same URL as
  `STUDIO_APPLICATION_URL` on `/found`).
- **Intern Program** — `Link` "Learn more" → `/intern`. This replaced the old shared
  bottom CTA ("Learn More & Apply"), which has been deleted.

Funding figures are phrased as "Up to $X" (not a range) on both the homepage cards and the
`/found` cards, e.g. "Up to $15K in funding" (Accelerator) and "Up to $1K in funding" (Studio).
CA Studio's team-eligibility copy reads "Teams of 2 and solo participants welcome" (was
"Individual-level (not teams)" / "Individual founders (not teams)") — Studio now accepts small
teams, not just solo founders.

### Homepage hero "Backed by" logo row

All partner marks in the hero's `CA founders backed by` row are shown **full color, at rest,
with no hover effect** (dimming/opacity-shift on hover has been removed site-wide from this
row). Files live in `public/logos/partners/`: `yc.png`, `ef.png`, `speedrun.png` (a16z
Speedrun), `zfellows.png`, `afore.png`, `1517.png`. The a16z mark itself has been removed from
the row entirely.

Sizing: YC is the reference — a square `w-7 h-7` `fill` image. The wordmarks (EF, Speedrun,
Z Fellows) use intrinsic `width`/`height` matching the real PNG dimensions plus `className="h-6
w-auto object-contain"`, so height is pinned to match YC's mark and width scales naturally by
aspect ratio — do not hardcode a fixed width for these, it'll distort or letterbox them.
Afore and 1517 still use the older `relative` + `fill` wrapper-div pattern at `w-20 h-6` /
`w-14 h-6`. Below `md` every mark shrinks further (e.g. `h-3.5` for the wordmarks) on top of this.

**Below `md`, the six marks render as two explicit flex rows of three** (`flex flex-col gap-4`
wrapping two `flex items-center justify-center gap-5` rows), not the same `flex-wrap` used at
`md`+. Two things broke with plain `flex-wrap` at phone widths: (1) wrap point depends on
cumulative width, so row count isn't guaranteed — a 3-column CSS grid was tried first to force a
2-row cap, but centering each mark in an equal-width grid column reads as wildly uneven gaps once
mark widths vary this much (YC's ~20px square next to Speedrun's ~115px wordmark). Explicit rows
with a uniform `gap` fixed both problems at once. `md:contents` on the row wrappers drops them
from the desktop layout so the marks rejoin the single `md:flex md:flex-wrap` row unchanged.

Several of these PNGs are **background-removed originals**: source files had a near-solid
background color that was chroma-keyed to transparent (with alpha feathered proportionally to
color distance from the background color, not a hard cutoff, to avoid a fringe/halo), then
cropped to the alpha bounding box. Speedrun's source was black artwork on white — same alpha
derivation, but RGB was also forced to pure white on every remaining pixel (not just the fully
opaque ones) so partial-alpha edge pixels don't read as muddy grey when composited over the
dark page background. If you need to reprocess a partner logo, replicate this approach rather
than a naive `Image.putalpha()` swap.

### Homepage "Who We Are" — 5C school logos

Below the "Who We Are" paragraph, a row of the five Claremont College logos sits in a
`mt-10 flex flex-wrap items-center justify-center gap-10` block at `md`+, ordered **CMC, Pitzer,
Mudd, Scripps, Pomona**. Files live in `public/logos/schools/` (`cmc.png`, `pitzer.png`,
`harvey_mudd.png`, `scripps.png`, `pomona.png`), each `className="h-16 w-auto object-contain"` at
`md`+ with `width`/`height` set to the file's real pixel dimensions (required for `w-auto` to
compute the correct aspect ratio — update both together if a logo file is ever swapped). Like the
partner row, several were background-removed from a near-white source via the same
distance-feathered chroma-key approach before being cropped to their bounding box.

**Below `md`, logos shrink to `h-10`** and render as two explicit centered rows (3+2: CMC/Pitzer/
Mudd, then Scripps/Pomona) via the same `flex-col` + `md:contents` pattern used for the partner
row above — natural `flex-wrap` collapses to a single row well before the `md` breakpoint on wider
phones, so the 2-row grouping is fixed explicitly rather than left to wrap based on viewport width.

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
- **Mobile frost floor.** Below 768px (`matchMedia("(max-width: 767px)")`, tracked in `isMobile`
  state), `t` is floored at `MOBILE_FROST_FLOOR = 0.45` instead of starting at 0 — on short mobile
  viewports the hero title can sit close beneath the bar, and a fully transparent bar at scroll-top
  made the logo/menu icon illegible against it.
- **Wordmark is fluid below `md`.** `"Claremont Accelerator"` uses
  `text-[clamp(14px,8.75vw-14px,21px)] md:text-[21px]` plus `whitespace-nowrap` — a fixed 21px
  wraps to two lines next to the icon + hamburger on narrow phones, and no single breakpoint step
  fits both a 320px and a 425px phone. The clamp reaches the original 21px by ~400px wide, where
  there's room. Horizontal padding on the content wrapper is also tighter on mobile (`px-6` vs.
  `md:px-[42px]`) to give the wordmark more room before it has to shrink.

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
- The homepage has no photo hero; its outer `relative z-10` page wrapper sits at `pt-0`.

### Homepage hero — mobile height & spacing

The hero `<section>` and its text wrapper are `md:min-h-[max(100vh,860px)]`, not unconditionally
`min-h-screen` — that full-viewport height exists only to make room for the desktop team-cutout
image (`hidden md:flex`), which doesn't render on mobile at all. Forcing full-screen height on
mobile too left large dead space below the CTA buttons on taller/skinnier phones (e.g. iPhone 16,
393×852) once the text wrapper switched to `justify-start` (see below) — with no other content to
push into that space, it just piled up at the bottom of the section.

The text wrapper is `justify-start` with `pt-28 md:pt-40` (not the old mobile `justify-center`
with `pt-0`): on short viewports (iPhone SE, 375×667) centering an overflowing flex column pushes
its top **above** the transparent navbar, overlapping the logo. Top-anchoring with explicit
padding guarantees clearance regardless of content height. Mobile also carries `pb-16` (`md:pb-0`)
so the CTA row doesn't butt directly against the stats band now that the section isn't padded out
by `min-h-screen`.

### Homepage hero — short desktop viewports

On desktop, the team-cutout photo is `position: absolute`, `bottom-0` (plus `translate-y-24`) —
anchored to the hero **section's** bottom edge, not to the text content above it. The text block's
height is fixed px (`pt-40` + fixed text sizes), so when the section's height was plain
`md:min-h-screen`, a short-but-desktop-width viewport (browser window resized shorter, not a phone)
would shrink the section along with `100vh`, dragging the bottom-anchored photo upward while the
text block stayed the same height — the photo's heads would rise up behind the CTA buttons/copy.
`md:min-h-[max(100vh,860px)]` floors the section (and its text wrapper) at 860px so it can never
get short enough for that collision, regardless of how short the window gets. Tune the 860px value
up if a similar overlap resurfaces; the trade-off is a bit more scroll before the stats band on
short/wide windows.

## Assets

Keep image assets small — the site had a **15 MB** hero PNG that tanked load times. The hero
cutout is now `public/betterbg-transparent.webp` (1600px, ~88 KB), generated with `sharp`
(bundled via Next). To resize/convert a heavy asset:

```js
require('sharp')(src).resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82, alphaQuality: 90 }).toFile(out)
```

Known remaining weight (not yet optimized): `/team` photos (1.6–1.8 MB each). Also
`layout.tsx` loads the Aileron heading font from `fonts.cdnfonts.com` via a render-blocking
`<link>` — worth self-hosting with `next/font/local`.

Superseded originals get deleted outright once their replacement is live and confirmed working
— e.g. `logos/partners/ef_v4.png`, `zfellows.svg`, `a16z.png`, `1517.svg`, `afore.webp` were
removed after the full-color partner-logo swap above. Don't leave old asset versions sitting in
`public/` "just in case" once nothing references them; check with a repo-wide grep for the
filename first, then delete. Raw, unprocessed source images (e.g. a temporary
`remade_exit_logos/` or `school_logos/` staging folder dropped in `public/` for hand-processing
into `logos/partners/` or `logos/schools/`) are also meant to be deleted once processing is
done — they're intentionally never referenced by `src/`, so they won't show up as "used" in any
audit, and are not meant to be kept around after their processed output is live.

The homepage has no photo hero; it nudges all sections down together with `pt-[35px]` on its
`relative z-10` content wrapper.
