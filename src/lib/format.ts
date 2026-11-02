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
