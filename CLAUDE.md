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
    PageHero.tsx            # Shared photo hero for /found, /intern, /team, /support, /mentor
    StatusBadge.tsx         # Active/Inactive pill (portfolio grid + startup detail)
    StartupLogoTile.tsx     # Logo tile w/ logoBg + logoScale + initial fallback (3 sizes)
    BackerPills.tsx         # `backers:` pills, with a logo when BACKER_LOGOS has one
    JobAccordion.tsx        # One posting, expandable to description + traits ("card"/"row")
    Pill.tsx                # The small uppercase chip — cohort/status/backers/open-spots
    ScrollReveal.tsx
    TeamMember.tsx
  lib/
    startups.ts             # loadAllStartups() (memoised, server-only — imports fs)
    flags.ts                # JOBS_LIVE + intern CTA label/href (fs-free: the NAVBAR reads it)
    format.ts               # jobMeta()/initials() — fs-free so CLIENT components can import
    backers.ts              # BACKER_LOGOS map (fs-free, same reason)
    links.ts                # every site-wide external URL + contact address
    program.ts              # MENTOR_COUNT, funding figures, MISSION sentence

content/
  startups/
    cohort-1/ … cohort-5/  # One .md file per startup

public/
  logos/                    # Homepage MARQUEE logos only — transparent cutouts (see step 4)
  logos/partners/           # Partner/exit logos shown in the homepage hero "Backed by" row
  logos/schools/            # The 5C college logos shown under "Who We Are" on the homepage
  startups/logos/           # Per-startup logos referenced by content/**.md `logo:`
  startups/founders/        # Founder headshots referenced by `founders:` (~200x200 webp)
  team/                     # Team member photos (webp, <=600px long edge)
  acceleratormeeting-*.webp # Sub-page hero photos used by PageHero
(repo root)
  links.json                # Short-link map for /l/[slug] — at the ROOT, not in public/
```

## Adding a Startup

1. Create `content/startups/cohort-N/startup-slug.md` with this frontmatter:

```markdown
---
name: Company Name
tagline: One-line description
logo: /startups/logos/filename.webp
logoBg: #ffffff
logoScale: 80
website: https://...
founders: Founder One|https://linkedin.com/in/founder-one|/startups/founders/founder-one.webp, Founder Two
status: active
cohort: N
backers: YC
---

Description paragraphs here.

## Jobs
Job Title | Full-time | Location | https://apply-url.com
```

   Each entry in `founders` is comma-separated; within an entry, `Name|linkedinUrl|photoPath` are
   pipe-separated and the LinkedIn URL and photo are both optional (a bare name still works, as do
   older cohorts that only ever had names). `startups.ts` parses this into `Founder[]` (`name`,
   `linkedin`, `photo`, `photoExists`). On the `/startups/[slug]` page, each founder renders as a
   pill with their photo (or an initial-letter avatar if no photo), their name, and a LinkedIn
   glyph; when `linkedin` is set the **whole pill** is an `<a>` to their profile (not just the
   glyph), so there's a `Pill = founder.linkedin ? "a" : "div"` branch there.

   `logoBg` and `logoScale` are both optional per-startup overrides for the logo tile on the
   `/startups` grid card and the `/startups/[slug]` header. Without `logoBg`, the tile falls back
   to the cohort-based default (`bg-white` for cohort ≥ 4, a translucent dark plate otherwise) —
   set it (any CSS color, e.g. `#ffffff` or `#242120`) when a specific startup's logo needs a
   background the cohort default doesn't give it. `logoScale` is a percentage (default `100`) of
   the tile the logo image renders at, still centered — use it to shrink a logo that reads too
   large/cramped in the fixed-size tile. Both are read in `startups.ts` (`Startup.logoBg`,
   `Startup.logoScale`) and rendered in **one** place: `src/components/StartupLogoTile.tsx`
   (sizes `sm` 48px / `md` 56px / `lg` 80px). This used to be three hand-copied blocks in
   `StartupsClient.tsx`, `[slug]/page.tsx` and `intern/page.tsx` that had drifted — each used a
   different cohort fallback color and the `/intern` copy ignored `logoBg`/`logoScale` entirely.
   Change the tile here, not at the call sites.

   Note `cohort:` in the frontmatter is **never read** — `startups.ts` derives the cohort from
   the directory name. It is kept in every file for human readability, but a value that
   disagrees with its directory is silently ignored, not an error.

   `COHORT_ORDER` and `LATEST_COHORT` are **derived** from `SLUG_ORDER`'s keys, so adding a
   cohort means adding one `SLUG_ORDER` entry and nothing else. (They used to be three separate
   hand-maintained constants.)

2. Add the slug to `SLUG_ORDER` in `src/lib/startups.ts` under the correct cohort key. Note the
   slug is the filename/URL, not necessarily the current `name` — e.g. Cohort 3's `openflow.md`
   has `name: Preman` (the company renamed Opentest → Openflow → Preman) and Cohort 2's `stag.md`
   has `name: Damus` (renamed from Stag), but the files and `SLUG_ORDER` entries are still
   `openflow` / `stag`, so `/startups/openflow` and `/startups/stag` keep working. Only rename a
   slug (and its file) deliberately, since it changes the live URL.
3. Drop the startup logo in `public/startups/logos/` and any founder headshots in
   `public/startups/founders/` (resize headshots to ~200×200 webp, e.g. via `sharp`
   `.resize({ width: 200, height: 200, fit: "cover" })`). Note `public/logos/` (no `startups/`
   prefix) is a different, older directory used only for the homepage partner/school logos — don't
   confuse the two.
4. If the startup also appears in the homepage's scrolling logo marquee (`startups` array in
   `src/app/page.tsx`, logos in `public/logos/`), that image needs to be a **transparent-background
   cutout** — the marquee applies `brightness-0 invert` to turn every opaque pixel white, so a
   logo with a baked-in solid background renders as a plain white box instead of a silhouette mark.
   This is a separate asset from `public/startups/logos/`, which (via `logoBg`) is fine with either
   a transparent or opaque source.

## Startup Data Flow

`loadAllStartups()` (server-only, called in page components):
- Reads `.md` files from `content/startups/cohort-{n}/` in `SLUG_ORDER` order
- Parses YAML-like frontmatter + markdown body
- Splits `## Jobs` section into structured `Job[]`
- Checks logo file existence in `public/`
- Returns `Startup[]`

The `/startups/[slug]` route uses `generateStaticParams()` to pre-render one page per startup at build time.

The `/intern` route also calls `loadAllStartups()`: it renders an "Open roles" section aggregated
from every startup's `## Jobs` block, and falls back to a portfolio snapshot grid when no jobs
exist. That snapshot is a curated four-slug list, `SNAPSHOT_SLUGS` in `intern/page.tsx`
(`kandor-ai`, `flash-biometrics`, `openflow`, `lintel`) — the grid is `lg:grid-cols-4`, so keep
it at four. Note it is **one to two cohorts behind**: every Cohort 5 startup is `active` and
none appear.

### `loadAllStartups()` is memoised — keep it that way

A module-level `cache` holds the parsed result. Content is immutable for the life of the
process, and the function is called once per static page plus once in each of
`generateStaticParams`/`generateMetadata` — 48 calls in a full build. Without the memo that was
~1,000 `readFileSync` and ~2,000 `existsSync` calls for 23 files; with it, 2 parses (one per
build worker process that touches it).

Use `getStartupBySlug(slug)` rather than `loadAllStartups().find(...)`, and `allStartupSlugs()`
in `generateStaticParams` so it doesn't parse every file just to read back the keys.

### Server-only vs client-safe modules — IMPORTANT

`src/lib/startups.ts` imports `fs`/`path`. `StartupsClient.tsx` is a **client component**, so
value-importing anything from `startups.ts` anywhere in its subtree drags the whole server-only
module into the browser bundle and the build fails with `Module not found: Can't resolve 'fs'`.

- Importing **types** (`import type { Startup }`) is fine — they erase at compile time.
- Pure helpers that client components need live in `src/lib/format.ts` (`jobMeta`, `initials`)
  and `src/lib/backers.ts` (`BACKER_LOGOS`), both deliberately free of `fs`. Add new shared
  helpers there, not to `startups.ts`.

### The jobs / internship feature is behind a switch

`JOBS_LIVE` in **`src/lib/flags.ts`** (re-exported from `startups.ts` for convenience). While
`false`, `loadAllStartups()` returns every startup with `jobs: []`.

It lives in `flags.ts` rather than `startups.ts` because `Navbar.tsx` is a **client component**
and reads the flag — importing it from `startups.ts` would pull `fs` into the browser bundle and
fail the build. Keep `flags.ts` free of server-only imports.

Flipping it to `true` changes three things at once:
1. Job postings render on `/startups/[slug]` and `/intern`, plus the portfolio jobs badges.
2. The **homepage hero** promotes "Intern at a startup" to the primary (solid blue) button and
   **drops "Join us"** entirely — once there is something to apply to, the holding CTA is noise.
   Both branches share `HERO_PRIMARY_CLASS`/`HERO_PRIMARY_STYLE` in `page.tsx` so the promoted
   button is visually identical to the one it replaces.
3. The **navbar pill** (both desktop and mobile copies) switches from the external
   "Join our mailing list!" `<a>` to an internal `<Link>` to `/intern`. Both share
   `PILL_CLASS`/`PILL_STYLE` in `Navbar.tsx`.
4. `/intern`'s **"Get real experience"** section (the 3-card "why intern" pitch) is hidden —
   it only earns its space while there is nothing to apply to. Note this one is gated on
   `totalOpenRoles === 0`, not `JOBS_LIVE` directly, matching the `Open roles` /
   `Where you could intern` branching already on that page: if the flag is on but a cycle has
   no postings yet, the pitch correctly reappears.

The CTA label and href are `INTERN_CTA_LABEL` / `INTERN_CTA_HREF` in `flags.ts` — change them
there, not at the four call sites.

Gating happens at the **data layer, not in the JSX**, on purpose: a UI-level flag would still
serialise every job description into the RSC payload, where it is readable in page source before
the roles are announced. With the data zeroed, no job text reaches the build output at all.

The off state needs no special handling because it is exactly what the site already rendered
before any job data existed: no job badges on `/startups`, `/intern` shows the portfolio
snapshot, and detail pages read "No open roles right now." Flip to `true`, rebuild, and
everything lights up at once.

Job authoring format — blank-line-separated blocks, each a `title | type | location | url`
header, then description paragraphs (one per line), then `- trait` bullets:

```markdown
## Jobs

Software Engineer | Internship | Remote | https://apply-url.com | 2
A paragraph about the role.
Another paragraph.
- An ideal-candidate trait
```

The 5th pipe field is **`spots`** — how many people the role is hiring. It is optional and
defaults to `1`, rendering an "N OPEN SPOT(S)" pill beside the role title in `JobAccordion`.
Non-numeric or `< 1` values fall back to 1. Because `location` is usually blank you will often
write `Title | Internship | | url | 2` with the empty third field.

Postings render through **`src/components/JobAccordion.tsx`** on both `/startups/[slug]` and
`/intern` — a `<details>` whose summary is title / type·location / Apply, expanding to the
description paragraphs and an "Ideal Candidate Traits" list. Two variants: `card` (self-contained
bordered tile, the default, used on the detail page) and `row` (no border or fill of its own, so
it sits inside `/intern`'s parent `divide-y` list, with slightly larger type). `/intern` used to
render flat rows with no description at all; don't re-add a second copy there.

Startup lists on `/intern` are sorted **reverse-alphabetically by `name`** (Z→A) — applied once
to `activeStartups`, so both the hiring list and the fallback snapshot inherit it. Note it sorts
on `name`, not slug, so Preman (slug `openflow`) sorts under P. The `.filter()` before it returns
a fresh array, so the `.sort()` never mutates the memoised result inside `loadAllStartups()`.

`parseJobs` splits on blank lines (`/\n\s*\n/`), **not** single newlines. An earlier
line-based version turned each prose paragraph and each `- trait` bullet into its own bogus job
whose `title` was the whole paragraph and whose `url` was empty. If you change this parser,
re-check that a multi-paragraph posting still yields exactly one job.

All six postings share one apply URL — `https://forms.gle/E3ov8Um1dS3oCfdu5`, the respondent-
facing short link (it 302s to the same form with `?usp=send_form`). An earlier revision used that
form's `?usp=publish-editor` URL, which is the editor's post-publish artifact and not shareable;
don't reintroduce it. Remaining known gap: every `location` field is empty, so `jobMeta()` renders
just the type ("Internship").

Each posting also renders an **"Apply for this role"** button at the bottom of its expanded
dropdown, in addition to the compact Apply link in the summary row — on a long posting the
summary link has scrolled out of reach by the time you have read the description. Both are
guarded on `job.url`.

### Previewing the jobs feature

`jobs-live-test` is a long-lived branch off `main` whose **only** difference is
`JOBS_LIVE = true` in `src/lib/flags.ts`. It exists so the feature can be reviewed on a Vercel
preview deploy while production stays in its pre-launch state. When `main` moves, rebase or
re-cut the branch rather than letting it accumulate unrelated changes — the whole point is that
the diff stays one line.

### Pills

`src/components/Pill.tsx` is the small uppercase chip used for cohort labels, the Active/Inactive
status badge, `backers:` tags, the jobs-count badge and the per-role "N open spots" label — six
hand-copied class strings before it was extracted. Tones: `accent` (blue), `muted` (grey
outline), `success` (green). Note the `border-[#0165fc]/40` inside it keeps a raw hex on purpose:
Tailwind's `/40` opacity modifier can't be applied to a `var()` color.

### `backers:` frontmatter

Comma-separated (e.g. `backers: YC`). Rendered as pills by
`src/components/BackerPills.tsx` on both the portfolio card and the detail page. A backer with
an entry in `BACKER_LOGOS` (`src/lib/backers.ts`) gets its logo; everything else renders as a
text pill. Currently set on `peer` (YC) and `openflow` (a16z).

Note `peer.md` has `website: https://example.com` — a placeholder. Both startup views guard with
`!startup.website.includes("example.com")`, so the link is suppressed until there is a real URL.
That sentinel is load-bearing, not dead code.

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
  `mailto:` to `cwitzansky29@cmc.edu` with the subject pre-filled. The real Google Form now
  lives in `src/lib/links.ts` as `FOUNDER_APPLICATION_URL_EDIT_ONLY` — deliberately named that
  way because it is an owner-only `/edit` link and is NOT safe to link publicly; it needs its
  `viewform` equivalent first. It is referenced nowhere.
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
`/found` cards, and the numbers come from `ACCELERATOR_FUNDING` / `STUDIO_FUNDING` in
`src/lib/program.ts` — they used to be literals and had drifted into three spellings
("$15K" / "$15,000" / "up to $15k"). `MENTOR_COUNT` ("100+") and the `MISSION` sentence live
there for the same reason: the homepage said "100+" mentors while `/found` said "40+".
CA Studio's team-eligibility copy reads "Teams and solo participants welcome" (was
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
| `--border` | Subtle borders |
| `--muted` | Dim text |
| `--muted-light` | Secondary body text |
| `--accent` | `#0165fc` — primary blue |

Blue tones used directly as hex: `#0165fc` (solid), `#3385fd` (hover/highlight), `#0165fc/40` (border opacity).

Note: `--surface`, `--surface-elevated` and `--border` have been **removed**. They were the
last pre-redesign holdouts and read muddy against glass. Use `white/[0.02]` for a faint section
band, `white/[0.07]` for dividers/card borders, and `white/15` for chips.

`--accent-soft` (`#a5b4fc`) is the periwinkle used for program-card eyebrows. Brand colors are
referenced as `var(--accent)` / `var(--accent-light)` rather than raw hex, **except** where a
Tailwind opacity modifier is involved (`border-[#0165fc]/40`) — those stay hex, because the
`/40` shorthand relies on it.

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

**Glass needs a ground.** `backdrop-filter` has nothing to blur, but a solid fill is fine —
it blurs to that flat color. Pages now use pure black and no atmosphere layer:

```tsx
<div className="relative min-h-screen bg-black flat-cards">
  <div className="relative z-10">{/* content */}</div>
</div>
```

`PageAtmosphere` (blooms + grain) and its CSS (`.bloom`, `.grain-layer`, `@keyframes
bloom-drift`) have been **deleted** — it was unmounted on every page, so both the component and
~30 lines of CSS were dead. Recover from git history if the texture is ever wanted back.
Sections inside must NOT have opaque fills or the ground is hidden — `/mentor` and `/support`
were violating this with `bg-[var(--surface)]` and now use `bg-white/[0.02]`.

There is currently **no `prefers-reduced-motion` guard**. The old one only disabled `.bloom`
(dead), so removing it changed nothing — but `animate-fade-up`, the logo marquee and `.sheen`
all still animate unguarded. Note that a naive guard would make content INVISIBLE: elements
carry `animate-fade-up opacity-0` and rely on the animation to reach `opacity: 1`, so any
`animation: none` rule must also force `opacity: 1`.

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

`/l/[slug]` reads **`links.json` at the repo root** (NOT `public/` — it is a build-time
`import`, so adding a link needs a redeploy). `next.config.ts` keeps one legacy `/mailme`
redirect that now forwards to `/l/mailme`; add all new vanity URLs to `links.json` only.

## Cohort 5

Cohort 5's first four startups are live: `whistle-labs`, `chalk`, `immify-ai`, `hedgehawk-industries`.
Cohort 4 has five entries (`peer` was added alongside the jobs work), so the portfolio is 23.
The "Cohort N is coming soon" empty state in `StartupsClient.tsx` only renders when a cohort filter
has zero matches, so it's dormant now but still there for whenever `SLUG_ORDER[5]` outgrows the
cohort again (or a future cohort starts empty).

On `/startups`, the cohort filter pills render **descending** — `All, Cohort 5, Cohort 4, …,
Cohort 1` — via `[0, ...[...allCohorts].sort((a, b) => b - a)]` in `StartupsClient.tsx`, so a new
`COHORT_ORDER` entry doesn't need manual reordering there.

## Hero Section Convention

Sub-pages (e.g. `/team`, `/intern`, `/found`) share a hero pattern for visual consistency:

- Section: `relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[...] border-b border-white/[0.13]` — `pt`, not `mt`, so the full-bleed `absolute inset-0` background image starts at the top of the viewport and only the text clears the navbar.
- The hero is now **one component**: `src/components/PageHero.tsx` (`image`, `title`,
  `subtitle`, `paddingTop`, `tightTitle`, `spacedSubtitle`, optional `children` for a CTA).
  It replaced five hand-copied blocks with byte-identical scrim/`h1`/`p` class strings.
- `paddingTop` stays a **per-page prop**, not a constant (the text is `items-center`-centered,
  so shrinking it nudges the block up rather than closing a fixed gap). Current values:
  `/found`, `/intern`, `/mentor`, `/support` `79`, `/team` `64`. `/startups` has its own
  non-PageHero header at `pt-[151px]`. `/mentor` and `/support` were retuned from the old
  pre-flush-navbar `131px` to match their siblings.
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

`sharp` is now a declared devDependency (it was only present transitively via `next`).

Both long-standing weight problems are fixed:
- `/team` photos were 5.3 MB total (one 1.8 MB JPEG, one 1.7 MB photo stored as PNG). Now webp
  at <=600px long edge, **217 KB total**. They render via `fill` + `object-cover` in a square
  container, so they are resized WITHOUT pre-cropping — CSS still does the cropping, keeping
  the original framing.
- Aileron is **self-hosted** via `next/font/local` (`src/app/fonts/Aileron-{Bold,Black}.woff`,
  exposed as `--font-aileron`). It used to load from `fonts.cdnfonts.com` through a
  hand-written render-blocking `<link>`, putting a third-party round-trip in front of every
  heading on every route. Only 700 and 900 are shipped — every `h1`–`h6` in `src/` carries an
  explicit `font-bold` or `font-black`, so no other weight is reachable. Note the navbar
  wordmark is a `<span>`, so it sets `font-family` inline and is NOT covered by the `h1`–`h6`
  rule — update both together.

`src/app/icon.png` is served raw by Next's file convention (NOT through the image optimizer),
so its byte size ships to every visitor — it was a 4000x4000 / 558 KB PNG, now 512x512 / 7 KB.
Keep it small.

All images go through `next/image`; there are no raw `<img>` tags and no
`@next/next/no-img-element` suppressions left. Every `fill` image sets `sizes` — without it
Next assumes `100vw` and picks a viewport-width variant for a 28px logo.

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

### Removing a logo's background

For a source logo with a solid (often white) background that needs to become a transparent
cutout (e.g. for the homepage marquee, see **Adding a Startup** step 4): don't chroma-key by
color distance across the whole image — if the artwork itself has white/near-white interior
details (strokes, highlights), a distance-based key erases those along with the real background.
Instead flood-fill transparency starting from the four image edges/corners inward, stopping at
non-background-colored pixels, so only the background pixels *connected to the border* become
transparent and any white/light pixels fully enclosed by the artwork survive. Then compute the
bounding box of the surviving (non-transparent) pixels directly and `.extract()` to it — `sharp`'s
built-in `.trim()` was unreliable on these flood-filled buffers (returned unflipped/untrimmed
output in testing), so prefer manual bbox + `.extract()` over `.trim()`. If a source background is
textured/noisy (not a flat color) rather than being removed, it can instead be flattened to a flat
color by the same flood-fill mask (paint the filled region a solid RGB instead of alpha 0) — use
`.webp({ lossless: true })` rather than the default lossy quality setting if the destination needs
to match an exact RGB value, since lossy compression can shift it by a value or two.
