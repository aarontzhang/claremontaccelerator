// Logo to pair with a backer badge, keyed by the lowercased `backers` value
// in frontmatter. Backers without an asset here just render as a text pill.
// Kept separate from startups.ts (which imports `fs`/`path`) so client
// components can import this without pulling server-only code into the bundle.
export const BACKER_LOGOS: Record<string, string> = {
  yc: "/logos/partners/yc.png",
};
