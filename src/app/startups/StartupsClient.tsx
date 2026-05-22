"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { Startup, Job } from "@/lib/startups";

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

function JobCount({ count }: { count: number }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-widest rounded px-2 py-0.5 self-start border ${
        count > 0
          ? "text-[#3385fd] border-[#0165fc]/40"
          : "text-[var(--muted)] border-[var(--border)]"
      }`}
    >
      {count === 0 ? "0 jobs" : count === 1 ? "1 job" : `${count} jobs`}
    </span>
  );
}

function StartupCard({
  startup,
  selected,
  onClick,
}: {
  startup: Startup;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group text-left w-full bg-[var(--surface)] border rounded-xl p-5 flex flex-col gap-3 transition-all ${
        selected
          ? "border-[#0165fc] bg-[var(--surface-elevated)]"
          : "border-[var(--border)] hover:border-white/25 hover:bg-[var(--surface-elevated)]"
      }`}
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
        {startup.logoExists ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain p-1" />
        ) : (
          <div className="w-full h-full bg-[var(--surface-elevated)] flex items-center justify-center">
            <span className="text-white font-black text-lg">{startup.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h2
            className={`font-black text-base leading-tight transition-colors ${
              selected ? "text-[#3385fd]" : "text-white group-hover:text-[#3385fd]"
            }`}
          >
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
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
        {startup.tagline && (
          <p className="text-[var(--muted)] text-xs mt-1 leading-relaxed line-clamp-2">
            {startup.tagline}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] border border-[var(--border)] rounded px-2 py-0.5">
          Cohort {startup.cohort}
        </span>
        <StatusBadge status={startup.status} />
        <JobCount count={startup.jobs.length} />
      </div>
    </button>
  );
}

function DetailPanel({ startup, onClose }: { startup: Startup; onClose: () => void }) {
  const paragraphs = startup.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Close */}
      <div className="flex justify-end p-4 pb-0 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 pb-8 pt-4 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
            {startup.logoExists ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain p-1.5" />
            ) : (
              <div className="w-full h-full bg-[var(--surface-elevated)] flex items-center justify-center">
                <span className="text-white font-black text-2xl">{startup.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-black text-2xl text-white mb-2">{startup.name}</h2>
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
          <p className="text-[var(--muted-light)] text-base font-medium leading-relaxed border-l-2 border-[#0165fc] pl-4">
            {startup.tagline}
          </p>
        )}

        {/* Description */}
        {paragraphs.length > 0 && (
          <div className="space-y-3">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[var(--muted-light)] text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}

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
                    <svg className="w-3.5 h-3.5 text-[var(--muted)] group-hover/job:text-white flex-shrink-0 ml-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}

export default function StartupsClient({ startups, latestCohort, allCohorts }: Props) {
  const [activeCohort, setActiveCohort] = useState<number>(latestCohort);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Startup | null>(null);

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

  const handleClose = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const panelOpen = !!selected;
  const cohortTabs = [0, ...allCohorts];

  return (
    <div className="min-h-screen pt-36 pb-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#3385fd] font-semibold text-sm uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1 className="font-black text-5xl md:text-7xl text-white mb-4">Our Startups</h1>
          <p className="text-[var(--muted-light)] text-lg max-w-2xl">
            {startups.length} companies across {allCohorts.length} cohorts — all built by students at the Claremont Colleges.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search startups…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2.5 text-white placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cohortTabs.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCohort(c); setSelected(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeCohort === c
                    ? "bg-[#0165fc] text-white"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-white/30"
                }`}
              >
                {c === 0 ? "All" : `Cohort ${c}`}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[var(--muted)] text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "company" : "companies"}
        </p>

        {/* Main layout: grid + panel */}
        <div className="flex gap-6 items-start">
          <div
            className={`grid gap-4 transition-all duration-300 flex-1 min-w-0 ${
              panelOpen
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filtered.map((startup) => (
              <StartupCard
                key={startup.slug}
                startup={startup}
                selected={selected?.slug === startup.slug}
                onClick={() =>
                  setSelected((prev) => (prev?.slug === startup.slug ? null : startup))
                }
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

          {/* Detail panel */}
          {panelOpen && selected && (
            <div className="w-full max-w-sm xl:max-w-md flex-shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <DetailPanel startup={selected} onClose={handleClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
