import fs from "fs";
import path from "path";

interface Startup {
  name: string;
  tagline: string;
  logo: string;
  logoExists: boolean;
  website: string;
  description: string;
  slug: string;
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

function loadStartups(): Startup[] {
  const contentDir = path.join(process.cwd(), "content", "cohort4");
  const order = ["lintel", "vorpal", "flash-biometrics", "kandor-ai"];
  return order.map((slug) => {
    const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf-8");
    const { data, body } = parseFrontmatter(raw);
    const logo = data.logo ?? "";
    const logoExists = !!logo && fs.existsSync(path.join(process.cwd(), "public", logo));
    return {
      slug,
      name: data.name ?? slug,
      tagline: data.tagline ?? "",
      logo,
      logoExists,
      website: data.website ?? "",
      description: body,
    };
  });
}

export default function Cohort4Page() {
  const startups = loadStartups();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#3385fd] font-semibold text-sm uppercase tracking-widest mb-3">
            Current Cohort
          </p>
          <h1 className="font-black text-5xl md:text-7xl text-white mb-6">
            Cohort 4
          </h1>
          <p className="text-[var(--muted-light)] text-lg max-w-2xl mx-auto">
            Meet the startups in our fourth cohort — four ambitious teams building the next generation of companies at the Claremont Colleges.
          </p>
        </div>

        {/* Startup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {startups.map((startup) => (
            <div
              key={startup.slug}
              className="bg-[var(--surface-elevated)] rounded-2xl border border-[var(--border)] p-8 flex flex-col gap-5 hover:border-white/20 transition-all"
            >
              {/* Logo or name badge */}
              <div className="flex items-center gap-4">
                {startup.logoExists ? (
                  <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={startup.logo}
                      alt={startup.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-xl">
                      {startup.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="font-black text-2xl text-white">{startup.name}</h2>
                  {startup.tagline && !startup.tagline.startsWith("Replace") && (
                    <p className="text-[#3385fd] text-sm font-medium mt-0.5">{startup.tagline}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="flex-1">
                {startup.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[var(--muted-light)] text-sm leading-relaxed mb-3 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              {/* Website link */}
              {startup.website && !startup.website.includes("example.com") && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-white transition-colors mt-auto"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
