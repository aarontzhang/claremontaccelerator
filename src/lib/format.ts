import type { Job } from "@/lib/startups";

// Pure presentation helpers, deliberately free of `fs`/`path` imports so client
// components (StartupsClient, StartupLogoTile) can use them without pulling
// server-only code from startups.ts into the browser bundle. Same reasoning as
// backers.ts. Importing TYPES from startups.ts is fine — those erase at compile.

export function jobMeta(job: Job): string {
  return [job.type, job.location].filter(Boolean).join(" · ");
}

export function initials(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

// Whether a hex color is dark enough that a logo tile sitting on it needs a
// hairline border to stay visible against the page's own black ground (e.g.
// a custom `logoBg` override). Any #rrggbb hex; non-hex input is treated as
// not dark.
export function isDarkHex(hex: string): boolean {
  const match = hex.trim().match(/^#?([0-9a-fA-F]{6})$/);
  if (!match) return false;
  const value = match[1];
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.4;
}
