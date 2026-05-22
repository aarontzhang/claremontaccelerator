import fs from "fs";
import path from "path";

export const COHORT_ORDER = [1, 2, 3, 4, 5];
export const LATEST_COHORT = 5;

export interface Job {
  title: string;
  type: string;
  location: string;
  url: string;
}

export interface Startup {
  slug: string;
  name: string;
  tagline: string;
  cohort: number;
  logo: string;
  logoExists: boolean;
  website: string;
  founders: string[];
  status: string;
  body: string;
  jobs: Job[];
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

function parseJobs(jobsSection: string): Job[] {
  return jobsSection
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      return {
        title: parts[0] ?? "",
        type: parts[1] ?? "",
        location: parts[2] ?? "",
        url: parts[3] ?? "",
      };
    })
    .filter((j) => j.title);
}

const SLUG_ORDER: Record<number, string[]> = {
  1: ["teacher-ai", "glamup", "arthub", "stratos-vanguard"],
  2: ["atrade", "stag", "pheratech", "musicdb", "exploravist", "sokhil"],
  3: ["toxsight", "cashbff", "openflow", "openbill"],
  4: ["lintel", "vorpal", "flash-biometrics", "kandor-ai"],
  5: [],
};

export function loadAllStartups(): Startup[] {
  const baseDir = path.join(process.cwd(), "content", "startups");
  const results: Startup[] = [];

  for (const cohort of COHORT_ORDER) {
    const dir = path.join(baseDir, `cohort-${cohort}`);
    for (const slug of SLUG_ORDER[cohort]) {
      const filePath = path.join(dir, `${slug}.md`);
      if (!fs.existsSync(filePath)) continue;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, body } = parseFrontmatter(raw);

      const jobsSplit = body.split(/^## Jobs\s*$/m);
      const description = jobsSplit[0].trim();
      const jobs = jobsSplit[1] ? parseJobs(jobsSplit[1]) : [];

      const logo = data.logo?.trim() ?? "";
      const logoExists =
        !!logo && fs.existsSync(path.join(process.cwd(), "public", logo.replace(/^\//, "")));

      results.push({
        slug,
        name: data.name ?? slug,
        tagline: data.tagline ?? "",
        cohort,
        logo,
        logoExists,
        website: data.website?.trim() ?? "",
        founders: data.founders
          ? data.founders.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
        status: data.status?.trim() ?? "",
        body: description,
        jobs,
      });
    }
  }

  return results;
}
