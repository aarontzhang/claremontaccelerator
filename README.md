# Claremont Accelerator

Marketing site for the [Claremont Accelerator](https://www.claremontaccelerator.com), a
student startup program at the Claremont Colleges.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript. Statically generated —
no database, no auth, no API routes. Startup content lives in markdown under `content/`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (prerenders every page) |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Adding a startup

1. Create `content/startups/cohort-N/<slug>.md`:

```markdown
---
name: Company Name
tagline: One-line description
cohort: N
logo: /startups/logos/<slug>.webp
website: https://...
founders: Name|https://linkedin.com/in/...|/startups/founders/name.webp, Second Founder
status: active
---

Description paragraphs here.
```

2. Add the slug to `SLUG_ORDER` in `src/lib/startups.ts` under that cohort. **A markdown file
   not listed there is never rendered** — the loader iterates `SLUG_ORDER`, not the directory.
3. Drop the logo in `public/startups/logos/` and founder headshots in
   `public/startups/founders/`.

Optional frontmatter: `logoBg` (any CSS color, for logos that need a specific plate),
`logoScale` (percentage, to shrink a logo that reads too large), `backers` (comma-separated,
e.g. `YC`).

## The jobs / internship feature

Job postings are authored in a `## Jobs` section at the end of a startup's markdown file and
are **gated behind a single switch**: `JOBS_LIVE` in `src/lib/flags.ts`.

While `JOBS_LIVE` is `false`, `loadAllStartups()` returns every startup with `jobs: []`, so no
job text reaches the build output at all — `/intern` shows the portfolio snapshot and detail
pages read "No open roles right now." Set it to `true` and rebuild to publish everything at once
— that also promotes "Intern at a startup" to the homepage hero's primary button (hiding
"Join us") and switches the navbar pill from the mailing-list signup to `/intern`.

Job format — blank-line-separated blocks, each a header line then description paragraphs then
`- trait` bullets:

```markdown
## Jobs

Software Engineer | Internship | Remote | https://apply-url.com | 2
One paragraph about the role.
Another paragraph.
- An ideal-candidate trait
- Another trait
```

The trailing `| 2` is `spots` — how many people the role is hiring. Optional, defaults to `1`,
and shows as an "N OPEN SPOTS" pill next to the role title.

## Short links

`/l/<slug>` redirects via `links.json` at the **repo root** (not `public/`). It's imported at
build time, so adding a link requires a redeploy.

## Docs

`CLAUDE.md` holds the detailed architecture, design-system and gotcha notes.
