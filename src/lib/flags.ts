// Feature flags. This module must stay free of `fs`/`path` imports: the navbar
// is a client component and reads JOBS_LIVE, so anything server-only in here
// would be dragged into the browser bundle and fail the build.

/**
 * Master switch for the internship/jobs feature.
 *
 * While false, `loadAllStartups()` returns every startup with `jobs: []`, so no
 * job text reaches the build output at all, and the site's primary CTAs stay in
 * their "nothing to apply to yet" state (mailing-list signup).
 *
 * Flipping this to true and rebuilding changes three things at once:
 *   1. Job postings render on /startups/[slug], /intern and the portfolio badges
 *   2. The homepage hero promotes "Intern at a startup" to the primary button
 *      and drops "Join us"
 *   3. The navbar pill switches from "Join our mailing list!" to the internship
 *      application
 */
export const JOBS_LIVE = true;

/** Label + destination for the navbar pill and promoted homepage CTA. */
export const INTERN_CTA_LABEL = "Intern at a startup";
export const INTERN_CTA_HREF = "/intern";
