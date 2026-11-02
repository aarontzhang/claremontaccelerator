import fs from "fs";
import path from "path";
import { JOBS_LIVE } from "@/lib/flags";

export { JOBS_LIVE };

export interface Job {
  title: string;
  type: string;
  location: string;
  url: string;
  /** How many people this role is hiring. Defaults to 1. */
  spots: number;
  description: string[];
  traits: string[];
}

export interface Founder {
  name: string;
  linkedin: string;
  photo: string;
  photoExists: boolean;
}

export interface Startup {
  slug: string;
  name: string;
  tagline: string;
  cohort: number;
  logo: string;
  logoExists: boolean;
  logoBg: string;
  logoScale: number;
  website: string;
  founders: Founder[];
  status: string;
  backers: string[];
  body: string;
  jobs: Job[];
}

// Curation order within each cohort. This is the single source of truth for
// WHICH startups render — a .md file not listed here is never discovered, and
// COHORT_ORDER / LATEST_COHORT are derived from these keys.
export const SLUG_ORDER: Record<number, string[]> = {
  1: ["glamup", "arthub"],
  2: ["atrade", "stag", "pheratech", "musicdb", "exploravist", "sokhil"],
  3: ["toxsight", "cashbff", "openflow"],
  4: ["lintel", "vorpal", "flash-biometrics", "kandor-ai", "peer"],
  5: ["whistle-labs", "chalk", "immify-ai", "hedgehawk-industries"],
};

export const COHORT_ORDER: number[] = Object.keys(SLUG_ORDER)
  .map(Number)
  .sort((a, b) => a - b);

export const LATEST_COHORT: number = COHORT_ORDER[COHORT_ORDER.length - 1];


function parseFounders(raw: string): Founder[] {
  return raw
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, linkedin, photo] = entry.split("|").map((p) => p.trim());
      const photoExists =
        !!photo && fs.existsSync(path.join(process.cwd(), "public", photo.replace(/^\//, "")));
      return { name: name ?? entry, linkedin: linkedin ?? "", photo: photo ?? "", photoExists };
    });
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };
  const data: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const colon = line.indexOf(":");
    if (colon > -1) {
      data[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    }
  });
  return { data, body: match[2].trim() };
}

// Each job is a blank-line-separated block: a
// `title | type | location | url | spots` header line (spots optional, default
// 1), then description lines (one paragraph per line), then `- trait` lines for
// the ideal-candidate list.
function parseJobs(jobsSection: string): Job[] {
  return jobsSection
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [header, ...rest] = block.split("\n").map((l) => l.trim()).filter(Boolean);
      const parts = (header ?? "").split("|").map((p) => p.trim());
      const description: string[] = [];
      const traits: string[] = [];
      rest.forEach((line) => {
        if (line.startsWith("- ")) {
          traits.push(line.slice(2).trim());
        } else {
          description.push(line);
        }
      });
      const spotsRaw = parts[4] ? parseInt(parts[4], 10) : NaN;
      return {
        title: parts[0] ?? "",
        type: parts[1] ?? "",
        location: parts[2] ?? "",
        url: parts[3] ?? "",
        spots: Number.isFinite(spotsRaw) && spotsRaw > 0 ? spotsRaw : 1,
        description,
        traits,
      };
    })
    .filter((j) => j.title);
}

// Content is immutable for the life of the process, and `loadAllStartups` is
// called once per static page (plus generateMetadata/generateStaticParams), so
// without this the same 23 files get re-read and re-stat'd dozens of times per
// build.
let cache: Startup[] | null = null;

export function loadAllStartups(): Startup[] {
  if (cache) return cache;

  const baseDir = path.join(process.cwd(), "content", "startups");
  const results: Startup[] = [];

  for (const cohort of COHORT_ORDER) {
    for (const slug of SLUG_ORDER[cohort] ?? []) {
      const filePath = path.join(baseDir, `cohort-${cohort}`, `${slug}.md`);
      if (!fs.existsSync(filePath)) continue;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, body } = parseFrontmatter(raw);

      const jobsSplit = body.split(/^## Jobs\s*$/m);
      const description = jobsSplit[0].trim();
      const jobs = jobsSplit[1] ? parseJobs(jobsSplit[1]) : [];

      const logo = data.logo?.trim() ?? "";
      const logoExists =
        !!logo && fs.existsSync(path.join(process.cwd(), "public", logo.replace(/^\//, "")));
      const logoScaleRaw = data.logoScale ? parseInt(data.logoScale, 10) : NaN;

      results.push({
        slug,
        name: data.name ?? slug,
        tagline: data.tagline ?? "",
        cohort,
        logo,
        logoExists,
        logoBg: data.logoBg?.trim() ?? "",
        logoScale: Number.isFinite(logoScaleRaw) ? logoScaleRaw : 100,
        website: data.website?.trim() ?? "",
        founders: data.founders ? parseFounders(data.founders) : [],
        status: data.status?.trim() ?? "",
        backers: data.backers
          ? data.backers.split(",").map((b) => b.trim()).filter(Boolean)
          : [],
        body: description,
        jobs: JOBS_LIVE ? jobs : [],
      });
    }
  }

  cache = results;
  return results;
}

export function getStartupBySlug(slug: string): Startup | undefined {
  return loadAllStartups().find((s) => s.slug === slug);
}

// Slug list for generateStaticParams — avoids parsing every markdown file just
// to read back the keys we already have.
export function allStartupSlugs(): string[] {
  return COHORT_ORDER.flatMap((cohort) => SLUG_ORDER[cohort] ?? []);
}
