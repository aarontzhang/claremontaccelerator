import { notFound } from "next/navigation";
import Link from "next/link";
import { loadAllStartups } from "@/lib/startups";
import type { Job } from "@/lib/startups";

export async function generateStaticParams() {
  const startups = loadAllStartups();
  return startups.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startup = loadAllStartups().find((s) => s.slug === slug);
  if (!startup) return {};
  return {
    title: `${startup.name} — Claremont Accelerator`,
    description: startup.tagline,
  };
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded px-2 py-0.5 border ${
        active
          ? "text-emerald-400 border-emerald-500/40"
          : "text-[var(--muted)] border-[var(--border)]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          active ? "bg-emerald-400" : "bg-[var(--muted)]"
        }`}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export default async function StartupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startup = loadAllStartups().find((s) => s.slug === slug);
  if (!startup) notFound();

  const paragraphs = startup.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen pt-36 pb-20 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/startups"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-white text-sm font-medium transition-colors mb-10 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Startups
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
              startup.cohort >= 4 ? "bg-white" : "bg-[var(--surface-elevated)]"
            }`}
          >
            {startup.logoExists ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-white font-black text-3xl">{startup.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-black text-4xl md:text-5xl text-white mb-3">{startup.name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3385fd] border border-[#0165fc]/40 rounded px-2 py-0.5">
                Cohort {startup.cohort}
              </span>
              <StatusBadge status={startup.status} />
            </div>
          </div>
        </div>

        {/* Tagline */}
        {startup.tagline && (
          <p className="text-[var(--muted-light)] text-xl font-medium leading-relaxed border-l-2 border-[#0165fc] pl-5 mb-8">
            {startup.tagline}
          </p>
        )}

        {/* Description */}
        {paragraphs.length > 0 && (
          <div className="space-y-4 mb-10">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[var(--muted-light)] text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}

        <div className="border-t border-[var(--border)] pt-8 flex flex-col gap-8">
          {/* Founders */}
          {startup.founders.length > 0 && (
            <div>
              <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-3">
                Founders
              </p>
              <div className="flex flex-wrap gap-2">
                {startup.founders.map((founder) => (
                  <div
                    key={founder}
                    className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0165fc]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#3385fd] font-black text-xs">{founder.charAt(0)}</span>
                    </div>
                    <span className="text-white text-sm font-medium">{founder}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs */}
          <div>
            <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest mb-3">
              Open Roles
            </p>
            {startup.jobs.length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No open roles right now.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {startup.jobs.map((job: Job, i: number) => (
                  <a
                    key={i}
                    href={job.url || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 hover:border-white/25 transition-colors group/job"
                  >
                    <div>
                      <p className="text-white text-sm font-semibold group-hover/job:text-[#3385fd] transition-colors">
                        {job.title}
                      </p>
                      <p className="text-[var(--muted)] text-xs mt-0.5">
                        {[job.type, job.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {job.url && (
                      <svg
                        className="w-3.5 h-3.5 text-[var(--muted)] group-hover/job:text-white flex-shrink-0 ml-3 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Website */}
          {startup.website && !startup.website.includes("example.com") && (
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0165fc] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:scale-105 transition-transform self-start"
            >
              Visit Website
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
