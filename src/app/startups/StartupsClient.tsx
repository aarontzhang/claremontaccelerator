"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Startup } from "@/lib/startups";
import { IconExternalLink, IconSearch } from "@tabler/icons-react";

interface Props {
  startups: Startup[];
  latestCohort: number;
  allCohorts: number[];
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded px-2 py-0.5 border ${
        active
          ? "text-emerald-400 border-emerald-500/40"
          : "text-[var(--muted)] border-white/15"
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

// Only rendered when count > 0 — StartupCard omits the badge entirely at zero.
function JobCount({ count }: { count: number }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest rounded px-2 py-0.5 self-start border text-[#3385fd] border-[#0165fc]/40">
      {count === 1 ? "1 job" : `${count} jobs`}
    </span>
  );
}

function StartupCard({ startup, onClick }: { startup: Startup; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="glass glass-flat glass-hover group text-left w-full rounded-xl p-5 flex flex-col gap-3"
    >
      {/* Logo */}
      <div className={`relative z-10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${startup.cohort >= 4 ? "bg-white" : "bg-white/[0.07]"}`}>
        {startup.logoExists ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain p-0.5 rounded-md" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white font-black text-lg">{startup.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h2 className="font-black text-base leading-tight text-white group-hover:text-[#3385fd] transition-colors">
            {startup.name}
          </h2>
          {startup.website && !startup.website.includes("example.com") && (
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 text-[var(--muted)] hover:text-white transition-colors"
              aria-label={`Visit ${startup.name} website`}
            >
              <IconExternalLink className="w-3 h-3" stroke={2} />
            </a>
          )}
        </div>
        {startup.tagline && (
          <p className="text-[var(--muted)] text-xs mt-1 leading-relaxed line-clamp-2">
            {startup.tagline}
          </p>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] border border-white/15 rounded px-2 py-0.5">
          Cohort {startup.cohort}
        </span>
        <StatusBadge status={startup.status} />
        {startup.jobs.length > 0 && <JobCount count={startup.jobs.length} />}
      </div>
    </button>
  );
}

export default function StartupsClient({ startups, latestCohort, allCohorts }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCohort = Number(searchParams.get("cohort") ?? 0);

  const [activeCohort, setActiveCohort] = useState<number>(initialCohort);
  const [query, setQuery] = useState("");

  const updateParams = useCallback(
    (cohort: number) => {
      const params = new URLSearchParams();
      if (cohort !== 0) params.set("cohort", String(cohort));
      const qs = params.toString();
      router.replace(`/startups${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  const handleSetCohort = useCallback(
    (c: number) => {
      setActiveCohort(c);
      updateParams(c);
    },
    [updateParams]
  );

  const filtered = useMemo(() => {
    const results = startups.filter((s) => {
      const matchesCohort = activeCohort === 0 || s.cohort === activeCohort;
      const q = query.toLowerCase();
      const matchesQuery =
        !q || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q);
      return matchesCohort && matchesQuery;
    });
    return results.sort((a, b) => {
      const aActive = a.status === "active" ? 0 : 1;
      const bActive = b.status === "active" ? 0 : 1;
      if (aActive !== bActive) return aActive - bActive;
      if (b.cohort !== a.cohort) return b.cohort - a.cohort;
      return a.name.localeCompare(b.name);
    });
  }, [activeCohort, query, startups]);

  const cohortTabs = [0, ...allCohorts];

  return (
    // Page wrapper, atmosphere and header live in page.tsx so they render
    // statically; this component owns only the interactive list.
    <>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <IconSearch
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
              stroke={2}
            />
            <input
              type="text"
              placeholder="Search startups…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="glass glass-flat w-full rounded-lg pl-9 pr-4 py-2.5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cohortTabs.map((c) => (
              <button
                key={c}
                onClick={() => handleSetCohort(c)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeCohort === c
                    ? "bg-[#0165fc] text-white"
                    : "glass glass-flat text-white/60 hover:text-white"
                }`}
                style={
                  activeCohort === c
                    ? {
                        boxShadow:
                          "inset 0 1px 0 0 rgba(255,255,255,0.3), 0 8px 20px -8px rgba(1,101,252,0.65)",
                      }
                    : undefined
                }
              >
                {c === 0 ? "All" : `Cohort ${c}`}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[var(--muted)] text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "company" : "companies"}
        </p>

        {/* Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((startup) => (
            <StartupCard
              key={startup.slug}
              startup={startup}
              onClick={() => router.push(`/startups/${startup.slug}`)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20">
              {activeCohort === latestCohort && !query ? (
                <div>
                  <p className="text-white font-black text-2xl mb-2">Cohort {latestCohort} is coming soon.</p>
                  <p className="text-[var(--muted)]">Check back in August 2026.</p>
                </div>
              ) : (
                <p className="text-[var(--muted)]">No startups match your search.</p>
              )}
            </div>
          )}
        </div>
    </>
  );
}
